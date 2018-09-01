#!/usr/bin/env node
/* istanbul instrument in package jslint */
/* jslint-utility2 */
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 4,
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
    /* istanbul ignore next */
    (function () {
        // init debug_inline
        (function () {
            var consoleError, context, key;
            consoleError = console.error;
            context = (typeof window === 'object' && window) || global;
            key = 'debug_inline'.replace('_i', 'I');
            context[key] = context[key] || function (arg0) {
            /*
             * this function will both print arg0 to stderr and return it
             */
                // debug arguments
                context['_' + key + 'Arguments'] = arguments;
                consoleError('\n\n' + key);
                consoleError.apply(console, arguments);
                consoleError(new Error().stack + '\n');
                // return arg0 for inspection
                return arg0;
            };
        }());
        // init local
        local = {};
        // init isBrowser
        local.isBrowser = typeof window === 'object' &&
            typeof window.XMLHttpRequest === 'function' &&
            window.document &&
            typeof window.document.querySelectorAll === 'function';
        // init global
        local.global = local.isBrowser
            ? window
            : global;
        // re-init local
        local = local.global.utility2_rollup ||
            // local.global.utility2_rollup_old || require('./assets.utility2.rollup.js') ||
            local;
        // init exports
        if (local.isBrowser) {
            local.global.utility2_jslint = local;
        } else {
            // require builtins
            // local.assert = require('assert');
            local.buffer = require('buffer');
            local.child_process = require('child_process');
            local.cluster = require('cluster');
            local.crypto = require('crypto');
            local.dgram = require('dgram');
            local.dns = require('dns');
            local.domain = require('domain');
            local.events = require('events');
            local.fs = require('fs');
            local.http = require('http');
            local.https = require('https');
            local.net = require('net');
            local.os = require('os');
            local.path = require('path');
            local.querystring = require('querystring');
            local.readline = require('readline');
            local.repl = require('repl');
            local.stream = require('stream');
            local.string_decoder = require('string_decoder');
            local.timers = require('timers');
            local.tls = require('tls');
            local.tty = require('tty');
            local.url = require('url');
            local.util = require('util');
            local.vm = require('vm');
            local.zlib = require('zlib');
            module.exports = local;
            module.exports.__dirname = __dirname;
        }
        // init lib main
        local.local = local.jslint = local;



        /* validateLineSortedReset */
        local.cliRun = function (fnc) {
        /*
         * this function will run the cli
         */
            var nop;
            nop = function () {
            /*
             * this function will do nothing
             */
                return;
            };
            local.cliDict._eval = local.cliDict._eval || function () {
            /*
             * <code>
             * will eval <code>
             */
                local.global.local = local;
                require('vm').runInThisContext(process.argv[3]);
            };
            local.cliDict['--eval'] = local.cliDict['--eval'] || local.cliDict._eval;
            local.cliDict['-e'] = local.cliDict['-e'] || local.cliDict._eval;
            local.cliDict._help = local.cliDict._help || function (options) {
            /*
             *
             * will print help
             */
                var commandList, file, packageJson, text, textDict;
                commandList = [{
                    argList: '<arg2>  ...',
                    description: 'usage:',
                    command: ['<arg1>']
                }, {
                    argList: '\'console.log("hello world")\'',
                    description: 'example:',
                    command: ['--eval']
                }];
                file = __filename.replace((/.*\//), '');
                packageJson = require('./package.json');
                textDict = {};
                Object.keys(local.cliDict).sort().forEach(function (key, ii) {
                    if (key[0] === '_' && key !== '_default') {
                        return;
                    }
                    text = String(local.cliDict[key]);
                    if (key === '_default') {
                        key = '';
                    }
                    ii = textDict[text] = textDict[text] || (ii + 2);
                    if (commandList[ii]) {
                        commandList[ii].command.push(key);
                    } else {
                        commandList[ii] = (/\n +?\*(.*?)\n +?\*(.*?)\n/).exec(text);
                        // coverage-hack - ignore else-statement
                        nop(local.global.__coverage__ && (function () {
                            commandList[ii] = commandList[ii] || ['', '', ''];
                        }()));
                        commandList[ii] = {
                            argList: commandList[ii][1].trim(),
                            command: [key],
                            description: commandList[ii][2].trim()
                        };
                    }
                });
                (options && options.modeError
                    ? console.error
                    : console.log)(
                    (options && options.modeError
                    ? '\u001b[31merror: missing <arg1>\u001b[39m\n\n'
                    : '') +
                        packageJson.name + ' (' + packageJson.version + ')\n\n' +
                        commandList
                        .filter(function (element) {
                            return element;
                        })
                        .map(function (element, ii) {
                            element.command = element.command.filter(function (element) {
                                return element;
                            });
                            switch (ii) {
                            case 0:
                            case 1:
                                element.argList = [element.argList];
                                break;
                            default:
                                element.argList = element.argList.split(' ');
                                element.description = '# COMMAND ' +
                                    (element.command[0] || '<none>') + '\n# ' +
                                    element.description;
                            }
                            return element.description + '\n  ' + file +
                                ('  ' + element.command.sort().join('|') + '  ')
                                .replace((/^ {4}$/), '  ') +
                                element.argList.join('  ');
                        })
                        .join('\n\n')
                );
            };
            local.cliDict['--help'] = local.cliDict['--help'] || local.cliDict._help;
            local.cliDict['-h'] = local.cliDict['-h'] || local.cliDict._help;
            local.cliDict._default = local.cliDict._default || local.cliDict._help;
            local.cliDict.help = local.cliDict.help || local.cliDict._help;
            local.cliDict._interactive = local.cliDict._interactive || function () {
            /*
             *
             * will start interactive-mode
             */
                local.global.local = local;
                local.replStart();
            };
            if (typeof local.replStart === 'function') {
                local.cliDict['--interactive'] = local.cliDict['--interactive'] ||
                    local.cliDict._interactive;
                local.cliDict['-i'] = local.cliDict['-i'] || local.cliDict._interactive;
            }
            local.cliDict._version = local.cliDict._version || function () {
            /*
             *
             * will print version
             */
                console.log(require(__dirname + '/package.json').version);
            };
            local.cliDict['--version'] = local.cliDict['--version'] || local.cliDict._version;
            local.cliDict['-v'] = local.cliDict['-v'] || local.cliDict._version;
            // run fnc()
            fnc = fnc || function () {
                // default to --help command if no arguments are given
                if (process.argv.length <= 2 && !local.cliDict._default.modeNoCommand) {
                    local.cliDict._help({ modeError: true });
                    process.exit(1);
                    return;
                }
                if (local.cliDict[process.argv[2]]) {
                    local.cliDict[process.argv[2]]();
                    return;
                }
                local.cliDict._default();
            };
            fnc();
        };
    }());



// init lib csslint
// 2013-08-15T10:18:30Z
// https://github.com/CSSLint/csslint/blob/v1.0.5/dist/csslint.js
// utility2-uglifyjs https://raw.githubusercontent.com/CSSLint/csslint/v1.0.5/dist/csslint.js
/* istanbul ignore next */
/* jslint-ignore-begin */
(function () {
var CSSLint=function(){function s(e,t,n,r){"use strict";this.messages=[],this.stats=
[],this.lines=e,this.ruleset=t,this.allow=n,this.allow||(this.allow={}),this.ignore=
r,this.ignore||(this.ignore=[])}var e=e||{},t=t||{},n=function(){var e;return e=
function t(n,r,i){function s(u,a){if(!r[u]){if(!n[u]){var f=typeof e=="function"&&
e;if(!a&&f)return f(u,!0);if(o)return o(u,!0);var l=new Error("Cannot find module '"+
u+"'");throw l.code="MODULE_NOT_FOUND",l}var c=r[u]={exports:{}};n[u][0].call(c.
exports,function(e){var t=n[u][1][e];return s(t?t:e)},c,c.exports,t,n,r,i)}return r
[u].exports}var o=typeof e=="function"&&e;for(var u=0;u<i.length;u++)s(i[u]);return s
}({1:[function(e,t,n){"use strict";var r=t.exports={__proto__:null,aliceblue:"#f0f8ff"
,antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige
:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff"
,blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse
:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk
:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b"
,darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgrey:"#a9a9a9",darkgreen:"#006400"
,darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00"
,darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f"
,darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise
:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray
:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite
:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite
:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",grey:"#808080",green
:"#008000",greenyellow:"#adff2f",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c"
,indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush
:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral
:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3"
,lightgrey:"#d3d3d3",lightgreen:"#90ee90",lightpink:"#ffb6c1",lightsalmon:"#ffa07a"
,lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey
:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen
:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa"
,mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370d8",mediumseagreen
:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise
:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",
mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace
:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500"
,orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee"
,palevioletred:"#d87093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f"
,pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000"
,rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",
sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver
:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090"
,snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080"
,thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3"
,white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32",currentColor
:"The value of the 'color' property.",activeBorder:"Active window border.",activecaption
:"Active window caption.",appworkspace:"Background color of multiple document interface."
,background:"Desktop background.",buttonface:"The face background color for 3-D elements that appear 3-D due to one layer of surrounding border."
,buttonhighlight:"The color of the border facing the light source for 3-D elements that appear 3-D due to one layer of surrounding border."
,buttonshadow:"The color of the border away from the light source for 3-D elements that appear 3-D due to one layer of surrounding border."
,buttontext:"Text on push buttons.",captiontext:"Text in caption, size box, and scrollbar arrow box."
,graytext:"Grayed (disabled) text. This color is set to #000 if the current display driver does not support a solid gray color."
,greytext:"Greyed (disabled) text. This color is set to #000 if the current display driver does not support a solid grey color."
,highlight:"Item(s) selected in a control.",highlighttext:"Text of item(s) selected in a control."
,inactiveborder:"Inactive window border.",inactivecaption:"Inactive window caption."
,inactivecaptiontext:"Color of text in an inactive caption.",infobackground:"Background color for tooltip controls."
,infotext:"Text color for tooltip controls.",menu:"Menu background.",menutext:"Text in menus."
,scrollbar:"Scroll bar gray area.",threeddarkshadow:"The color of the darker (generally outer) of the two borders away from the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border."
,threedface:"The face background color for 3-D elements that appear 3-D due to two concentric layers of surrounding border."
,threedhighlight:"The color of the lighter (generally outer) of the two borders facing the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border."
,threedlightshadow:"The color of the darker (generally inner) of the two borders facing the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border."
,threedshadow:"The color of the lighter (generally inner) of the two borders away from the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border."
,window:"Window background.",windowframe:"Window frame.",windowtext:"Text in windows."
}},{}],2:[function(e,t,n){"use strict";function s(e,t,n){r.call(this,e,t,n,i.COMBINATOR_TYPE
),this.type="unknown",/^\s+$/.test(e)?this.type="descendant":e===">"?this.type="child"
:e==="+"?this.type="adjacent-sibling":e==="~"&&(this.type="sibling")}t.exports=s
;var r=e("../util/SyntaxUnit"),i=e("./Parser");s.prototype=new r,s.prototype.constructor=
s},{"../util/SyntaxUnit":26,"./Parser":6}],3:[function(e,t,n){"use strict";function s
(e,t){this.match=function(t){var n;return t.mark(),n=e(t),n?t.drop():t.restore()
,n},this.toString=typeof t=="function"?t:function(){return t}}t.exports=s;var r=
e("../util/StringReader"),i=e("../util/SyntaxError");s.prec={MOD:5,SEQ:4,ANDAND:3
,OROR:2,ALT:1},s.parse=function(e){var t,n,o,u,a,f,l,c,h;t=new r(e),n=function(e
){var n=t.readMatch(e);if(n===null)throw new i("Expected "+e,t.getLine(),t.getCol
());return n},o=function(){var e=[u()];while(t.readMatch(" | ")!==null)e.push(u(
));return e.length===1?e[0]:s.alt.apply(s,e)},u=function(){var e=[a()];while(t.readMatch
(" || ")!==null)e.push(a());return e.length===1?e[0]:s.oror.apply(s,e)},a=function(
){var e=[f()];while(t.readMatch(" && ")!==null)e.push(f());return e.length===1?e
[0]:s.andand.apply(s,e)},f=function(){var e=[l()];while(t.readMatch(/^ (?![&|\]])/
)!==null)e.push(l());return e.length===1?e[0]:s.seq.apply(s,e)},l=function(){var e=
c();if(t.readMatch("?")!==null)return e.question();if(t.readMatch("*")!==null)return e
.star();if(t.readMatch("+")!==null)return e.plus();if(t.readMatch("#")!==null)return e
.hash();if(t.readMatch(/^\{\s*/)!==null){var r=n(/^\d+/);n(/^\s*,\s*/);var i=n(/^\d+/
);return n(/^\s*\}/),e.braces(+r,+i)}return e},c=function(){if(t.readMatch("[ ")!==
null){var e=o();return n(" ]"),e}return s.fromType(n(/^[^ ?*+#{]+/))},h=o();if(!
t.eof())throw new i("Expected end of string",t.getLine(),t.getCol());return h},s
.cast=function(e){return e instanceof s?e:s.parse(e)},s.fromType=function(t){var n=
e("./ValidationTypes");return new s(function(e){return e.hasNext()&&n.isType(e,t
)},t)},s.seq=function(){var e=Array.prototype.slice.call(arguments).map(s.cast);
return e.length===1?e[0]:new s(function(t){var n,r=!0;for(n=0;r&&n<e.length;n++)
r=e[n].match(t);return r},function(t){var n=s.prec.SEQ,r=e.map(function(e){return e
.toString(n)}).join(" ");return t>n&&(r="[ "+r+" ]"),r})},s.alt=function(){var e=
Array.prototype.slice.call(arguments).map(s.cast);return e.length===1?e[0]:new s
(function(t){var n,r=!1;for(n=0;!r&&n<e.length;n++)r=e[n].match(t);return r},function(
t){var n=s.prec.ALT,r=e.map(function(e){return e.toString(n)}).join(" | ");return t>
n&&(r="[ "+r+" ]"),r})},s.many=function(t){var n=Array.prototype.slice.call(arguments
,1).reduce(function(t,n){if(n.expand){var r=e("./ValidationTypes");t.push.apply(
t,r.complex[n.expand].options)}else t.push(s.cast(n));return t},[]);t===!0&&(t=n
.map(function(){return!0}));var r=new s(function(e){var r=[],i=0,s=0,o=function(
e){return s===0?(i=Math.max(e,i),e===n.length):e===i},u=function(i){for(var s=0;
s<n.length;s++){if(r[s])continue;e.mark();if(n[s].match(e)){r[s]=!0;if(u(i+(t===!1||
t[s]?1:0)))return e.drop(),!0;e.restore(),r[s]=!1}else e.drop()}return o(i)};u(0
)||(s++,u(0));if(t===!1)return i>0;for(var a=0;a<n.length;a++)if(t[a]&&!r[a])return!1
;return!0},function(e){var r=t===!1?s.prec.OROR:s.prec.ANDAND,i=n.map(function(e
,n){return t!==!1&&!t[n]?e.toString(s.prec.MOD)+"?":e.toString(r)}).join(t===!1?" || "
:" && ");return e>r&&(i="[ "+i+" ]"),i});return r.options=n,r},s.andand=function(
){var e=Array.prototype.slice.call(arguments);return e.unshift(!0),s.many.apply(
s,e)},s.oror=function(){var e=Array.prototype.slice.call(arguments);return e.unshift
(!1),s.many.apply(s,e)},s.prototype={constructor:s,match:function(){throw new Error
("unimplemented")},toString:function(){throw new Error("unimplemented")},func:function(
){return this.match.bind(this)},then:function(e){return s.seq(this,e)},or:function(
e){return s.alt(this,e)},andand:function(e){return s.many(!0,this,e)},oror:function(
e){return s.many(!1,this,e)},star:function(){return this.braces(0,Infinity,"*")}
,plus:function(){return this.braces(1,Infinity,"+")},question:function(){return this
.braces(0,1,"?")},hash:function(){return this.braces(1,Infinity,"#",s.cast(","))
},braces:function(e,t,n,r){var i=this,o=r?r.then(this):this;return n||(n="{"+e+","+
t+"}"),new s(function(n){var s=!0,u;for(u=0;u<t;u++){u>0&&r?s=o.match(n):s=i.match
(n);if(!s)break}return u>=e},function(){return i.toString(s.prec.MOD)+n})}}},{"../util/StringReader"
:24,"../util/SyntaxError":25,"./ValidationTypes":21}],4:[function(e,t,n){"use strict"
;function s(e,t){r.call(this,"("+e+(t!==null?":"+t:"")+")",e.startLine,e.startCol
,i.MEDIA_FEATURE_TYPE),this.name=e,this.value=t}t.exports=s;var r=e("../util/SyntaxUnit"
),i=e("./Parser");s.prototype=new r,s.prototype.constructor=s},{"../util/SyntaxUnit"
:26,"./Parser":6}],5:[function(e,t,n){"use strict";function s(e,t,n,s,o){r.call(
this,(e?e+" ":"")+(t?t:"")+(t&&n.length>0?" and ":"")+n.join(" and "),s,o,i.MEDIA_QUERY_TYPE
),this.modifier=e,this.mediaType=t,this.features=n}t.exports=s;var r=e("../util/SyntaxUnit"
),i=e("./Parser");s.prototype=new r,s.prototype.constructor=s},{"../util/SyntaxUnit"
:26,"./Parser":6}],6:[function(e,t,n){"use strict";function y(e){r.call(this),this
.options=e||{},this._tokenStream=null}t.exports=y;var r=e("../util/EventTarget")
,i=e("../util/SyntaxError"),s=e("../util/SyntaxUnit"),o=e("./Combinator"),u=e("./MediaFeature"
),a=e("./MediaQuery"),f=e("./PropertyName"),l=e("./PropertyValue"),c=e("./PropertyValuePart"
),h=e("./Selector"),p=e("./SelectorPart"),d=e("./SelectorSubPart"),v=e("./TokenStream"
),m=e("./Tokens"),g=e("./Validation");y.DEFAULT_TYPE=0,y.COMBINATOR_TYPE=1,y.MEDIA_FEATURE_TYPE=2
,y.MEDIA_QUERY_TYPE=3,y.PROPERTY_NAME_TYPE=4,y.PROPERTY_VALUE_TYPE=5,y.PROPERTY_VALUE_PART_TYPE=6
,y.SELECTOR_TYPE=7,y.SELECTOR_PART_TYPE=8,y.SELECTOR_SUB_PART_TYPE=9,y.prototype=
function(){var e=new r,t,n={__proto__:null,constructor:y,DEFAULT_TYPE:0,COMBINATOR_TYPE
:1,MEDIA_FEATURE_TYPE:2,MEDIA_QUERY_TYPE:3,PROPERTY_NAME_TYPE:4,PROPERTY_VALUE_TYPE
:5,PROPERTY_VALUE_PART_TYPE:6,SELECTOR_TYPE:7,SELECTOR_PART_TYPE:8,SELECTOR_SUB_PART_TYPE
:9,_stylesheet:function(){var e=this._tokenStream,t,n,r;this.fire("startstylesheet"
),this._charset(),this._skipCruft();while(e.peek()===m.IMPORT_SYM)this._import()
,this._skipCruft();while(e.peek()===m.NAMESPACE_SYM)this._namespace(),this._skipCruft
();r=e.peek();while(r>m.EOF){try{switch(r){case m.MEDIA_SYM:this._media(),this._skipCruft
();break;case m.PAGE_SYM:this._page(),this._skipCruft();break;case m.FONT_FACE_SYM
:this._font_face(),this._skipCruft();break;case m.KEYFRAMES_SYM:this._keyframes(
),this._skipCruft();break;case m.VIEWPORT_SYM:this._viewport(),this._skipCruft()
;break;case m.DOCUMENT_SYM:this._document(),this._skipCruft();break;case m.SUPPORTS_SYM
:this._supports(),this._skipCruft();break;case m.UNKNOWN_SYM:e.get();if(!!this.options
.strict)throw new i("Unknown @ rule.",e.LT(0).startLine,e.LT(0).startCol);this.fire
({type:"error",error:null,message:"Unknown @ rule: "+e.LT(0).value+".",line:e.LT
(0).startLine,col:e.LT(0).startCol}),t=0;while(e.advance([m.LBRACE,m.RBRACE])===
m.LBRACE)t++;while(t)e.advance([m.RBRACE]),t--;break;case m.S:this._readWhitespace
();break;default:if(!this._ruleset())switch(r){case m.CHARSET_SYM:throw n=e.LT(1
),this._charset(!1),new i("@charset not allowed here.",n.startLine,n.startCol);case m
.IMPORT_SYM:throw n=e.LT(1),this._import(!1),new i("@import not allowed here.",n
.startLine,n.startCol);case m.NAMESPACE_SYM:throw n=e.LT(1),this._namespace(!1),new
i("@namespace not allowed here.",n.startLine,n.startCol);default:e.get(),this._unexpectedToken
(e.token())}}}catch(s){if(!(s instanceof i&&!this.options.strict))throw s;this.fire
({type:"error",error:s,message:s.message,line:s.line,col:s.col})}r=e.peek()}r!==
m.EOF&&this._unexpectedToken(e.token()),this.fire("endstylesheet")},_charset:function(
e){var t=this._tokenStream,n,r,i,s;t.match(m.CHARSET_SYM)&&(i=t.token().startLine
,s=t.token().startCol,this._readWhitespace(),t.mustMatch(m.STRING),r=t.token(),n=
r.value,this._readWhitespace(),t.mustMatch(m.SEMICOLON),e!==!1&&this.fire({type:"charset"
,charset:n,line:i,col:s}))},_import:function(e){var t=this._tokenStream,n,r,i=[]
;t.mustMatch(m.IMPORT_SYM),r=t.token(),this._readWhitespace(),t.mustMatch([m.STRING
,m.URI]),n=t.token().value.replace(/^(?:url\()?["']?([^"']+?)["']?\)?$/,"$1"),this
._readWhitespace(),i=this._media_query_list(),t.mustMatch(m.SEMICOLON),this._readWhitespace
(),e!==!1&&this.fire({type:"import",uri:n,media:i,line:r.startLine,col:r.startCol
})},_namespace:function(e){var t=this._tokenStream,n,r,i,s;t.mustMatch(m.NAMESPACE_SYM
),n=t.token().startLine,r=t.token().startCol,this._readWhitespace(),t.match(m.IDENT
)&&(i=t.token().value,this._readWhitespace()),t.mustMatch([m.STRING,m.URI]),s=t.
token().value.replace(/(?:url\()?["']([^"']+)["']\)?/,"$1"),this._readWhitespace
(),t.mustMatch(m.SEMICOLON),this._readWhitespace(),e!==!1&&this.fire({type:"namespace"
,prefix:i,uri:s,line:n,col:r})},_supports:function(e){var t=this._tokenStream,n,
r;if(t.match(m.SUPPORTS_SYM)){n=t.token().startLine,r=t.token().startCol,this._readWhitespace
(),this._supports_condition(),this._readWhitespace(),t.mustMatch(m.LBRACE),this.
_readWhitespace(),e!==!1&&this.fire({type:"startsupports",line:n,col:r});for(;;)
if(!this._ruleset())break;t.mustMatch(m.RBRACE),this._readWhitespace(),this.fire
({type:"endsupports",line:n,col:r})}},_supports_condition:function(){var e=this.
_tokenStream,t;if(e.match(m.IDENT))t=e.token().value.toLowerCase(),t==="not"?(e.
mustMatch(m.S),this._supports_condition_in_parens()):e.unget();else{this._supports_condition_in_parens
(),this._readWhitespace();while(e.peek()===m.IDENT){t=e.LT(1).value.toLowerCase(
);if(t==="and"||t==="or")e.mustMatch(m.IDENT),this._readWhitespace(),this._supports_condition_in_parens
(),this._readWhitespace()}}},_supports_condition_in_parens:function(){var e=this
._tokenStream,t;e.match(m.LPAREN)?(this._readWhitespace(),e.match(m.IDENT)?(t=e.
token().value.toLowerCase(),t==="not"?(this._readWhitespace(),this._supports_condition
(),this._readWhitespace(),e.mustMatch(m.RPAREN)):(e.unget(),this._supports_declaration_condition
(!1))):(this._supports_condition(),this._readWhitespace(),e.mustMatch(m.RPAREN))
):this._supports_declaration_condition()},_supports_declaration_condition:function(
e){var t=this._tokenStream;e!==!1&&t.mustMatch(m.LPAREN),this._readWhitespace(),
this._declaration(),t.mustMatch(m.RPAREN)},_media:function(){var e=this._tokenStream
,t,n,r;e.mustMatch(m.MEDIA_SYM),t=e.token().startLine,n=e.token().startCol,this.
_readWhitespace(),r=this._media_query_list(),e.mustMatch(m.LBRACE),this._readWhitespace
(),this.fire({type:"startmedia",media:r,line:t,col:n});for(;;)if(e.peek()===m.PAGE_SYM
)this._page();else if(e.peek()===m.FONT_FACE_SYM)this._font_face();else if(e.peek
()===m.VIEWPORT_SYM)this._viewport();else if(e.peek()===m.DOCUMENT_SYM)this._document
();else if(e.peek()===m.SUPPORTS_SYM)this._supports();else if(e.peek()===m.MEDIA_SYM
)this._media();else if(!this._ruleset())break;e.mustMatch(m.RBRACE),this._readWhitespace
(),this.fire({type:"endmedia",media:r,line:t,col:n})},_media_query_list:function(
){var e=this._tokenStream,t=[];this._readWhitespace(),(e.peek()===m.IDENT||e.peek
()===m.LPAREN)&&t.push(this._media_query());while(e.match(m.COMMA))this._readWhitespace
(),t.push(this._media_query());return t},_media_query:function(){var e=this._tokenStream
,t=null,n=null,r=null,i=[];e.match(m.IDENT)&&(n=e.token().value.toLowerCase(),n!=="only"&&
n!=="not"?(e.unget(),n=null):r=e.token()),this._readWhitespace(),e.peek()===m.IDENT?
(t=this._media_type(),r===null&&(r=e.token())):e.peek()===m.LPAREN&&(r===null&&(
r=e.LT(1)),i.push(this._media_expression()));if(t===null&&i.length===0)return null
;this._readWhitespace();while(e.match(m.IDENT))e.token().value.toLowerCase()!=="and"&&
this._unexpectedToken(e.token()),this._readWhitespace(),i.push(this._media_expression
());return new a(n,t,i,r.startLine,r.startCol)},_media_type:function(){return this
._media_feature()},_media_expression:function(){var e=this._tokenStream,t=null,n
,r=null;return e.mustMatch(m.LPAREN),t=this._media_feature(),this._readWhitespace
(),e.match(m.COLON)&&(this._readWhitespace(),n=e.LT(1),r=this._expression()),e.mustMatch
(m.RPAREN),this._readWhitespace(),new u(t,r?new s(r,n.startLine,n.startCol):null
)},_media_feature:function(){var e=this._tokenStream;return this._readWhitespace
(),e.mustMatch(m.IDENT),s.fromToken(e.token())},_page:function(){var e=this._tokenStream
,t,n,r=null,i=null;e.mustMatch(m.PAGE_SYM),t=e.token().startLine,n=e.token().startCol
,this._readWhitespace(),e.match(m.IDENT)&&(r=e.token().value,r.toLowerCase()==="auto"&&
this._unexpectedToken(e.token())),e.peek()===m.COLON&&(i=this._pseudo_page()),this
._readWhitespace(),this.fire({type:"startpage",id:r,pseudo:i,line:t,col:n}),this
._readDeclarations(!0,!0),this.fire({type:"endpage",id:r,pseudo:i,line:t,col:n})
},_margin:function(){var e=this._tokenStream,t,n,r=this._margin_sym();return r?(
t=e.token().startLine,n=e.token().startCol,this.fire({type:"startpagemargin",margin
:r,line:t,col:n}),this._readDeclarations(!0),this.fire({type:"endpagemargin",margin
:r,line:t,col:n}),!0):!1},_margin_sym:function(){var e=this._tokenStream;return e
.match([m.TOPLEFTCORNER_SYM,m.TOPLEFT_SYM,m.TOPCENTER_SYM,m.TOPRIGHT_SYM,m.TOPRIGHTCORNER_SYM
,m.BOTTOMLEFTCORNER_SYM,m.BOTTOMLEFT_SYM,m.BOTTOMCENTER_SYM,m.BOTTOMRIGHT_SYM,m.
BOTTOMRIGHTCORNER_SYM,m.LEFTTOP_SYM,m.LEFTMIDDLE_SYM,m.LEFTBOTTOM_SYM,m.RIGHTTOP_SYM
,m.RIGHTMIDDLE_SYM,m.RIGHTBOTTOM_SYM])?s.fromToken(e.token()):null},_pseudo_page
:function(){var e=this._tokenStream;return e.mustMatch(m.COLON),e.mustMatch(m.IDENT
),e.token().value},_font_face:function(){var e=this._tokenStream,t,n;e.mustMatch
(m.FONT_FACE_SYM),t=e.token().startLine,n=e.token().startCol,this._readWhitespace
(),this.fire({type:"startfontface",line:t,col:n}),this._readDeclarations(!0),this
.fire({type:"endfontface",line:t,col:n})},_viewport:function(){var e=this._tokenStream
,t,n;e.mustMatch(m.VIEWPORT_SYM),t=e.token().startLine,n=e.token().startCol,this
._readWhitespace(),this.fire({type:"startviewport",line:t,col:n}),this._readDeclarations
(!0),this.fire({type:"endviewport",line:t,col:n})},_document:function(){var e=this
._tokenStream,t,n=[],r="";e.mustMatch(m.DOCUMENT_SYM),t=e.token(),/^@\-([^\-]+)\-/
.test(t.value)&&(r=RegExp.$1),this._readWhitespace(),n.push(this._document_function
());while(e.match(m.COMMA))this._readWhitespace(),n.push(this._document_function
());e.mustMatch(m.LBRACE),this._readWhitespace(),this.fire({type:"startdocument"
,functions:n,prefix:r,line:t.startLine,col:t.startCol});var i=!0;while(i)switch(
e.peek()){case m.PAGE_SYM:this._page();break;case m.FONT_FACE_SYM:this._font_face
();break;case m.VIEWPORT_SYM:this._viewport();break;case m.MEDIA_SYM:this._media
();break;case m.KEYFRAMES_SYM:this._keyframes();break;case m.DOCUMENT_SYM:this._document
();break;default:i=Boolean(this._ruleset())}e.mustMatch(m.RBRACE),t=e.token(),this
._readWhitespace(),this.fire({type:"enddocument",functions:n,prefix:r,line:t.startLine
,col:t.startCol})},_document_function:function(){var e=this._tokenStream,t;return e
.match(m.URI)?(t=e.token().value,this._readWhitespace()):t=this._function(),t},_operator
:function(e){var t=this._tokenStream,n=null;if(t.match([m.SLASH,m.COMMA])||e&&t.
match([m.PLUS,m.STAR,m.MINUS]))n=t.token(),this._readWhitespace();return n?c.fromToken
(n):null},_combinator:function(){var e=this._tokenStream,t=null,n;return e.match
([m.PLUS,m.GREATER,m.TILDE])&&(n=e.token(),t=new o(n.value,n.startLine,n.startCol
),this._readWhitespace()),t},_unary_operator:function(){var e=this._tokenStream;
return e.match([m.MINUS,m.PLUS])?e.token().value:null},_property:function(){var e=
this._tokenStream,t=null,n=null,r,i,s,o;return e.peek()===m.STAR&&this.options.starHack&&
(e.get(),i=e.token(),n=i.value,s=i.startLine,o=i.startCol),e.match(m.IDENT)&&(i=
e.token(),r=i.value,r.charAt(0)==="_"&&this.options.underscoreHack&&(n="_",r=r.substring
(1)),t=new f(r,n,s||i.startLine,o||i.startCol),this._readWhitespace()),t},_ruleset
:function(){var e=this._tokenStream,t,n;try{n=this._selectors_group()}catch(r){if(
r instanceof i&&!this.options.strict){this.fire({type:"error",error:r,message:r.
message,line:r.line,col:r.col}),t=e.advance([m.RBRACE]);if(t!==m.RBRACE)throw r;
return!0}throw r}return n&&(this.fire({type:"startrule",selectors:n,line:n[0].line
,col:n[0].col}),this._readDeclarations(!0),this.fire({type:"endrule",selectors:n
,line:n[0].line,col:n[0].col})),n},_selectors_group:function(){var e=this._tokenStream
,t=[],n;n=this._selector();if(n!==null){t.push(n);while(e.match(m.COMMA))this._readWhitespace
(),n=this._selector(),n!==null?t.push(n):this._unexpectedToken(e.LT(1))}return t
.length?t:null},_selector:function(){var e=this._tokenStream,t=[],n=null,r=null,
i=null;n=this._simple_selector_sequence();if(n===null)return null;t.push(n);do{r=
this._combinator();if(r!==null)t.push(r),n=this._simple_selector_sequence(),n===
null?this._unexpectedToken(e.LT(1)):t.push(n);else{if(!this._readWhitespace())break;
i=new o(e.token().value,e.token().startLine,e.token().startCol),r=this._combinator
(),n=this._simple_selector_sequence(),n===null?r!==null&&this._unexpectedToken(e
.LT(1)):(r!==null?t.push(r):t.push(i),t.push(n))}}while(!0);return new h(t,t[0].
line,t[0].col)},_simple_selector_sequence:function(){var e=this._tokenStream,t=null
,n=[],r="",i=[function(){return e.match(m.HASH)?new d(e.token().value,"id",e.token
().startLine,e.token().startCol):null},this._class,this._attrib,this._pseudo,this
._negation],s=0,o=i.length,u=null,a,f;a=e.LT(1).startLine,f=e.LT(1).startCol,t=this
._type_selector(),t||(t=this._universal()),t!==null&&(r+=t);for(;;){if(e.peek()===
m.S)break;while(s<o&&u===null)u=i[s++].call(this);if(u===null){if(r==="")return null
;break}s=0,n.push(u),r+=u.toString(),u=null}return r!==""?new p(t,n,r,a,f):null}
,_type_selector:function(){var e=this._tokenStream,t=this._namespace_prefix(),n=
this._element_name();return n?(t&&(n.text=t+n.text,n.col-=t.length),n):(t&&(e.unget
(),t.length>1&&e.unget()),null)},_class:function(){var e=this._tokenStream,t;return e
.match(m.DOT)?(e.mustMatch(m.IDENT),t=e.token(),new d("."+t.value,"class",t.startLine
,t.startCol-1)):null},_element_name:function(){var e=this._tokenStream,t;return e
.match(m.IDENT)?(t=e.token(),new d(t.value,"elementName",t.startLine,t.startCol)
):null},_namespace_prefix:function(){var e=this._tokenStream,t="";if(e.LA(1)===m
.PIPE||e.LA(2)===m.PIPE)e.match([m.IDENT,m.STAR])&&(t+=e.token().value),e.mustMatch
(m.PIPE),t+="|";return t.length?t:null},_universal:function(){var e=this._tokenStream
,t="",n;return n=this._namespace_prefix(),n&&(t+=n),e.match(m.STAR)&&(t+="*"),t.
length?t:null},_attrib:function(){var e=this._tokenStream,t=null,n,r;return e.match
(m.LBRACKET)?(r=e.token(),t=r.value,t+=this._readWhitespace(),n=this._namespace_prefix
(),n&&(t+=n),e.mustMatch(m.IDENT),t+=e.token().value,t+=this._readWhitespace(),e
.match([m.PREFIXMATCH,m.SUFFIXMATCH,m.SUBSTRINGMATCH,m.EQUALS,m.INCLUDES,m.DASHMATCH
])&&(t+=e.token().value,t+=this._readWhitespace(),e.mustMatch([m.IDENT,m.STRING]
),t+=e.token().value,t+=this._readWhitespace()),e.mustMatch(m.RBRACKET),new d(t+"]"
,"attribute",r.startLine,r.startCol)):null},_pseudo:function(){var e=this._tokenStream
,t=null,n=":",r,s;if(e.match(m.COLON)){e.match(m.COLON)&&(n+=":"),e.match(m.IDENT
)?(t=e.token().value,r=e.token().startLine,s=e.token().startCol-n.length):e.peek
()===m.FUNCTION&&(r=e.LT(1).startLine,s=e.LT(1).startCol-n.length,t=this._functional_pseudo
());if(!t){var o=e.LT(1).startLine,u=e.LT(0).startCol;throw new i("Expected a `FUNCTION` or `IDENT` after colon at line "+
o+", col "+u+".",o,u)}t=new d(n+t,"pseudo",r,s)}return t},_functional_pseudo:function(
){var e=this._tokenStream,t=null;return e.match(m.FUNCTION)&&(t=e.token().value,
t+=this._readWhitespace(),t+=this._expression(),e.mustMatch(m.RPAREN),t+=")"),t}
,_expression:function(){var e=this._tokenStream,t="";while(e.match([m.PLUS,m.MINUS
,m.DIMENSION,m.NUMBER,m.STRING,m.IDENT,m.LENGTH,m.FREQ,m.ANGLE,m.TIME,m.RESOLUTION
,m.SLASH]))t+=e.token().value,t+=this._readWhitespace();return t.length?t:null},
_negation:function(){var e=this._tokenStream,t,n,r="",i,s=null;return e.match(m.
NOT)&&(r=e.token().value,t=e.token().startLine,n=e.token().startCol,r+=this._readWhitespace
(),i=this._negation_arg(),r+=i,r+=this._readWhitespace(),e.match(m.RPAREN),r+=e.
token().value,s=new d(r,"not",t,n),s.args.push(i)),s},_negation_arg:function(){var e=
this._tokenStream,t=[this._type_selector,this._universal,function(){return e.match
(m.HASH)?new d(e.token().value,"id",e.token().startLine,e.token().startCol):null
},this._class,this._attrib,this._pseudo],n=null,r=0,i=t.length,s,o,u;s=e.LT(1).startLine
,o=e.LT(1).startCol;while(r<i&&n===null)n=t[r].call(this),r++;return n===null&&this
._unexpectedToken(e.LT(1)),n.type==="elementName"?u=new p(n,[],n.toString(),s,o)
:u=new p(null,[n],n.toString(),s,o),u},_declaration:function(){var e=this._tokenStream
,t=null,n=null,r=null,i=null,s="";t=this._property();if(t!==null){e.mustMatch(m.
COLON),this._readWhitespace(),n=this._expr(),(!n||n.length===0)&&this._unexpectedToken
(e.LT(1)),r=this._prio(),s=t.toString();if(this.options.starHack&&t.hack==="*"||
this.options.underscoreHack&&t.hack==="_")s=t.text;try{this._validateProperty(s,
n)}catch(o){i=o}return this.fire({type:"property",property:t,value:n,important:r
,line:t.line,col:t.col,invalid:i}),!0}return!1},_prio:function(){var e=this._tokenStream
,t=e.match(m.IMPORTANT_SYM);return this._readWhitespace(),t},_expr:function(e){var t=
[],n=null,r=null;n=this._term(e);if(n!==null){t.push(n);do{r=this._operator(e),r&&
t.push(r),n=this._term(e);if(n===null)break;t.push(n)}while(!0)}return t.length>0?new
l(t,t[0].line,t[0].col):null},_term:function(e){var t=this._tokenStream,n=null,r=
null,i=null,s=null,o,u,a;return n=this._unary_operator(),n!==null&&(u=t.token().
startLine,a=t.token().startCol),t.peek()===m.IE_FUNCTION&&this.options.ieFilters?
(r=this._ie_function(),n===null&&(u=t.token().startLine,a=t.token().startCol)):e&&
t.match([m.LPAREN,m.LBRACE,m.LBRACKET])?(o=t.token(),i=o.endChar,r=o.value+this.
_expr(e).text,n===null&&(u=t.token().startLine,a=t.token().startCol),t.mustMatch
(m.type(i)),r+=i,this._readWhitespace()):t.match([m.NUMBER,m.PERCENTAGE,m.LENGTH
,m.ANGLE,m.TIME,m.FREQ,m.STRING,m.IDENT,m.URI,m.UNICODE_RANGE])?(r=t.token().value
,n===null&&(u=t.token().startLine,a=t.token().startCol,s=c.fromToken(t.token()))
,this._readWhitespace()):(o=this._hexcolor(),o===null?(n===null&&(u=t.LT(1).startLine
,a=t.LT(1).startCol),r===null&&(t.LA(3)===m.EQUALS&&this.options.ieFilters?r=this
._ie_function():r=this._function())):(r=o.value,n===null&&(u=o.startLine,a=o.startCol
))),s!==null?s:r!==null?new c(n!==null?n+r:r,u,a):null},_function:function(){var e=
this._tokenStream,t=null,n=null,r;if(e.match(m.FUNCTION)){t=e.token().value,this
._readWhitespace(),n=this._expr(!0),t+=n;if(this.options.ieFilters&&e.peek()===m
.EQUALS)do{this._readWhitespace()&&(t+=e.token().value),e.LA(0)===m.COMMA&&(t+=e
.token().value),e.match(m.IDENT),t+=e.token().value,e.match(m.EQUALS),t+=e.token
().value,r=e.peek();while(r!==m.COMMA&&r!==m.S&&r!==m.RPAREN)e.get(),t+=e.token(
).value,r=e.peek()}while(e.match([m.COMMA,m.S]));e.match(m.RPAREN),t+=")",this._readWhitespace
()}return t},_ie_function:function(){var e=this._tokenStream,t=null,n;if(e.match
([m.IE_FUNCTION,m.FUNCTION])){t=e.token().value;do{this._readWhitespace()&&(t+=e
.token().value),e.LA(0)===m.COMMA&&(t+=e.token().value),e.match(m.IDENT),t+=e.token
().value,e.match(m.EQUALS),t+=e.token().value,n=e.peek();while(n!==m.COMMA&&n!==
m.S&&n!==m.RPAREN)e.get(),t+=e.token().value,n=e.peek()}while(e.match([m.COMMA,m
.S]));e.match(m.RPAREN),t+=")",this._readWhitespace()}return t},_hexcolor:function(
){var e=this._tokenStream,t=null,n;if(e.match(m.HASH)){t=e.token(),n=t.value;if(!/#[a-f0-9]{3,6}/i
.test(n))throw new i("Expected a hex color but found '"+n+"' at line "+t.startLine+", col "+
t.startCol+".",t.startLine,t.startCol);this._readWhitespace()}return t},_keyframes
:function(){var e=this._tokenStream,t,n,r,i="";e.mustMatch(m.KEYFRAMES_SYM),t=e.
token(),/^@\-([^\-]+)\-/.test(t.value)&&(i=RegExp.$1),this._readWhitespace(),r=this
._keyframe_name(),this._readWhitespace(),e.mustMatch(m.LBRACE),this.fire({type:"startkeyframes"
,name:r,prefix:i,line:t.startLine,col:t.startCol}),this._readWhitespace(),n=e.peek
();while(n===m.IDENT||n===m.PERCENTAGE)this._keyframe_rule(),this._readWhitespace
(),n=e.peek();this.fire({type:"endkeyframes",name:r,prefix:i,line:t.startLine,col
:t.startCol}),this._readWhitespace(),e.mustMatch(m.RBRACE),this._readWhitespace(
)},_keyframe_name:function(){var e=this._tokenStream;return e.mustMatch([m.IDENT
,m.STRING]),s.fromToken(e.token())},_keyframe_rule:function(){var e=this._key_list
();this.fire({type:"startkeyframerule",keys:e,line:e[0].line,col:e[0].col}),this
._readDeclarations(!0),this.fire({type:"endkeyframerule",keys:e,line:e[0].line,col
:e[0].col})},_key_list:function(){var e=this._tokenStream,t=[];t.push(this._key(
)),this._readWhitespace();while(e.match(m.COMMA))this._readWhitespace(),t.push(this
._key()),this._readWhitespace();return t},_key:function(){var e=this._tokenStream
,t;if(e.match(m.PERCENTAGE))return s.fromToken(e.token());if(e.match(m.IDENT)){t=
e.token();if(/from|to/i.test(t.value))return s.fromToken(t);e.unget()}this._unexpectedToken
(e.LT(1))},_skipCruft:function(){while(this._tokenStream.match([m.S,m.CDO,m.CDC]
));},_readDeclarations:function(e,t){var n=this._tokenStream,r;this._readWhitespace
(),e&&n.mustMatch(m.LBRACE),this._readWhitespace();try{for(;;){if(!(n.match(m.SEMICOLON
)||t&&this._margin())){if(!this._declaration())break;if(!n.match(m.SEMICOLON))break}
this._readWhitespace()}n.mustMatch(m.RBRACE),this._readWhitespace()}catch(s){if(!
(s instanceof i&&!this.options.strict))throw s;this.fire({type:"error",error:s,message
:s.message,line:s.line,col:s.col}),r=n.advance([m.SEMICOLON,m.RBRACE]);if(r===m.
SEMICOLON)this._readDeclarations(!1,t);else if(r!==m.RBRACE)throw s}},_readWhitespace
:function(){var e=this._tokenStream,t="";while(e.match(m.S))t+=e.token().value;return t
},_unexpectedToken:function(e){throw new i("Unexpected token '"+e.value+"' at line "+
e.startLine+", col "+e.startCol+".",e.startLine,e.startCol)},_verifyEnd:function(
){this._tokenStream.LA(1)!==m.EOF&&this._unexpectedToken(this._tokenStream.LT(1)
)},_validateProperty:function(e,t){g.validate(e,t)},parse:function(e){this._tokenStream=new
v(e,m),this._stylesheet()},parseStyleSheet:function(e){return this.parse(e)},parseMediaQuery
:function(e){this._tokenStream=new v(e,m);var t=this._media_query();return this.
_verifyEnd(),t},parsePropertyValue:function(e){this._tokenStream=new v(e,m),this
._readWhitespace();var t=this._expr();return this._readWhitespace(),this._verifyEnd
(),t},parseRule:function(e){this._tokenStream=new v(e,m),this._readWhitespace();
var t=this._ruleset();return this._readWhitespace(),this._verifyEnd(),t},parseSelector
:function(e){this._tokenStream=new v(e,m),this._readWhitespace();var t=this._selector
();return this._readWhitespace(),this._verifyEnd(),t},parseStyleAttribute:function(
e){e+="}",this._tokenStream=new v(e,m),this._readDeclarations()}};for(t in n)Object
.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t]);return e}()},{"../util/EventTarget"
:23,"../util/SyntaxError":25,"../util/SyntaxUnit":26,"./Combinator":2,"./MediaFeature"
:4,"./MediaQuery":5,"./PropertyName":8,"./PropertyValue":9,"./PropertyValuePart"
:11,"./Selector":13,"./SelectorPart":14,"./SelectorSubPart":15,"./TokenStream":17
,"./Tokens":18,"./Validation":19}],7:[function(e,t,n){"use strict";var r=t.exports=
{__proto__:null,"align-items":"flex-start | flex-end | center | baseline | stretch"
,"align-content":"flex-start | flex-end | center | space-between | space-around | stretch"
,"align-self":"auto | flex-start | flex-end | center | baseline | stretch",all:"initial | inherit | unset"
,"-webkit-align-items":"flex-start | flex-end | center | baseline | stretch","-webkit-align-content"
:"flex-start | flex-end | center | space-between | space-around | stretch","-webkit-align-self"
:"auto | flex-start | flex-end | center | baseline | stretch","alignment-adjust"
:"auto | baseline | before-edge | text-before-edge | middle | central | after-edge | text-after-edge | ideographic | alphabetic | hanging | mathematical | <percentage> | <length>"
,"alignment-baseline":"auto | baseline | use-script | before-edge | text-before-edge | after-edge | text-after-edge | central | middle | ideographic | alphabetic | hanging | mathematical"
,animation:1,"animation-delay":"<time>#","animation-direction":"<single-animation-direction>#"
,"animation-duration":"<time>#","animation-fill-mode":"[ none | forwards | backwards | both ]#"
,"animation-iteration-count":"[ <number> | infinite ]#","animation-name":"[ none | <single-animation-name> ]#"
,"animation-play-state":"[ running | paused ]#","animation-timing-function":1,"-moz-animation-delay"
:"<time>#","-moz-animation-direction":"[ normal | alternate ]#","-moz-animation-duration"
:"<time>#","-moz-animation-iteration-count":"[ <number> | infinite ]#","-moz-animation-name"
:"[ none | <single-animation-name> ]#","-moz-animation-play-state":"[ running | paused ]#"
,"-ms-animation-delay":"<time>#","-ms-animation-direction":"[ normal | alternate ]#"
,"-ms-animation-duration":"<time>#","-ms-animation-iteration-count":"[ <number> | infinite ]#"
,"-ms-animation-name":"[ none | <single-animation-name> ]#","-ms-animation-play-state"
:"[ running | paused ]#","-webkit-animation-delay":"<time>#","-webkit-animation-direction"
:"[ normal | alternate ]#","-webkit-animation-duration":"<time>#","-webkit-animation-fill-mode"
:"[ none | forwards | backwards | both ]#","-webkit-animation-iteration-count":"[ <number> | infinite ]#"
,"-webkit-animation-name":"[ none | <single-animation-name> ]#","-webkit-animation-play-state"
:"[ running | paused ]#","-o-animation-delay":"<time>#","-o-animation-direction"
:"[ normal | alternate ]#","-o-animation-duration":"<time>#","-o-animation-iteration-count"
:"[ <number> | infinite ]#","-o-animation-name":"[ none | <single-animation-name> ]#"
,"-o-animation-play-state":"[ running | paused ]#",appearance:"none | auto","-moz-appearance"
:"none | button | button-arrow-down | button-arrow-next | button-arrow-previous | button-arrow-up | button-bevel | button-focus | caret | checkbox | checkbox-container | checkbox-label | checkmenuitem | dualbutton | groupbox | listbox | listitem | menuarrow | menubar | menucheckbox | menuimage | menuitem | menuitemtext | menulist | menulist-button | menulist-text | menulist-textfield | menupopup | menuradio | menuseparator | meterbar | meterchunk | progressbar | progressbar-vertical | progresschunk | progresschunk-vertical | radio | radio-container | radio-label | radiomenuitem | range | range-thumb | resizer | resizerpanel | scale-horizontal | scalethumbend | scalethumb-horizontal | scalethumbstart | scalethumbtick | scalethumb-vertical | scale-vertical | scrollbarbutton-down | scrollbarbutton-left | scrollbarbutton-right | scrollbarbutton-up | scrollbarthumb-horizontal | scrollbarthumb-vertical | scrollbartrack-horizontal | scrollbartrack-vertical | searchfield | separator | sheet | spinner | spinner-downbutton | spinner-textfield | spinner-upbutton | splitter | statusbar | statusbarpanel | tab | tabpanel | tabpanels | tab-scroll-arrow-back | tab-scroll-arrow-forward | textfield | textfield-multiline | toolbar | toolbarbutton | toolbarbutton-dropdown | toolbargripper | toolbox | tooltip | treeheader | treeheadercell | treeheadersortarrow | treeitem | treeline | treetwisty | treetwistyopen | treeview | -moz-mac-unified-toolbar | -moz-win-borderless-glass | -moz-win-browsertabbar-toolbox | -moz-win-communicationstext | -moz-win-communications-toolbox | -moz-win-exclude-glass | -moz-win-glass | -moz-win-mediatext | -moz-win-media-toolbox | -moz-window-button-box | -moz-window-button-box-maximized | -moz-window-button-close | -moz-window-button-maximize | -moz-window-button-minimize | -moz-window-button-restore | -moz-window-frame-bottom | -moz-window-frame-left | -moz-window-frame-right | -moz-window-titlebar | -moz-window-titlebar-maximized"
,"-ms-appearance":"none | icon | window | desktop | workspace | document | tooltip | dialog | button | push-button | hyperlink | radio | radio-button | checkbox | menu-item | tab | menu | menubar | pull-down-menu | pop-up-menu | list-menu | radio-group | checkbox-group | outline-tree | range | field | combo-box | signature | password | normal"
,"-webkit-appearance":"none | button | button-bevel | caps-lock-indicator | caret | checkbox | default-button | listbox\t| listitem | media-fullscreen-button | media-mute-button | media-play-button | media-seek-back-button\t| media-seek-forward-button\t| media-slider | media-sliderthumb | menulist\t| menulist-button\t| menulist-text\t| menulist-textfield | push-button\t| radio\t| searchfield\t| searchfield-cancel-button\t| searchfield-decoration | searchfield-results-button | searchfield-results-decoration | slider-horizontal | slider-vertical | sliderthumb-horizontal | sliderthumb-vertical\t| square-button\t| textarea\t| textfield\t| scrollbarbutton-down | scrollbarbutton-left | scrollbarbutton-right | scrollbarbutton-up | scrollbargripper-horizontal | scrollbargripper-vertical | scrollbarthumb-horizontal | scrollbarthumb-vertical | scrollbartrack-horizontal | scrollbartrack-vertical"
,"-o-appearance":"none | window | desktop | workspace | document | tooltip | dialog | button | push-button | hyperlink | radio | radio-button | checkbox | menu-item | tab | menu | menubar | pull-down-menu | pop-up-menu | list-menu | radio-group | checkbox-group | outline-tree | range | field | combo-box | signature | password | normal"
,azimuth:"<azimuth>","backface-visibility":"visible | hidden",background:1,"background-attachment"
:"<attachment>#","background-clip":"<box>#","background-color":"<color>","background-image"
:"<bg-image>#","background-origin":"<box>#","background-position":"<bg-position>"
,"background-repeat":"<repeat-style>#","background-size":"<bg-size>#","baseline-shift"
:"baseline | sub | super | <percentage> | <length>",behavior:1,binding:1,bleed:"<length>"
,"bookmark-label":"<content> | <attr> | <string>","bookmark-level":"none | <integer>"
,"bookmark-state":"open | closed","bookmark-target":"none | <uri> | <attr>",border
:"<border-width> || <border-style> || <color>","border-bottom":"<border-width> || <border-style> || <color>"
,"border-bottom-color":"<color>","border-bottom-left-radius":"<x-one-radius>","border-bottom-right-radius"
:"<x-one-radius>","border-bottom-style":"<border-style>","border-bottom-width":"<border-width>"
,"border-collapse":"collapse | separate","border-color":"<color>{1,4}","border-image"
:1,"border-image-outset":"[ <length> | <number> ]{1,4}","border-image-repeat":"[ stretch | repeat | round ]{1,2}"
,"border-image-slice":"<border-image-slice>","border-image-source":"<image> | none"
,"border-image-width":"[ <length> | <percentage> | <number> | auto ]{1,4}","border-left"
:"<border-width> || <border-style> || <color>","border-left-color":"<color>","border-left-style"
:"<border-style>","border-left-width":"<border-width>","border-radius":"<border-radius>"
,"border-right":"<border-width> || <border-style> || <color>","border-right-color"
:"<color>","border-right-style":"<border-style>","border-right-width":"<border-width>"
,"border-spacing":"<length>{1,2}","border-style":"<border-style>{1,4}","border-top"
:"<border-width> || <border-style> || <color>","border-top-color":"<color>","border-top-left-radius"
:"<x-one-radius>","border-top-right-radius":"<x-one-radius>","border-top-style":"<border-style>"
,"border-top-width":"<border-width>","border-width":"<border-width>{1,4}",bottom
:"<margin-width>","-moz-box-align":"start | end | center | baseline | stretch","-moz-box-decoration-break"
:"slice | clone","-moz-box-direction":"normal | reverse","-moz-box-flex":"<number>"
,"-moz-box-flex-group":"<integer>","-moz-box-lines":"single | multiple","-moz-box-ordinal-group"
:"<integer>","-moz-box-orient":"horizontal | vertical | inline-axis | block-axis"
,"-moz-box-pack":"start | end | center | justify","-o-box-decoration-break":"slice | clone"
,"-webkit-box-align":"start | end | center | baseline | stretch","-webkit-box-decoration-break"
:"slice | clone","-webkit-box-direction":"normal | reverse","-webkit-box-flex":"<number>"
,"-webkit-box-flex-group":"<integer>","-webkit-box-lines":"single | multiple","-webkit-box-ordinal-group"
:"<integer>","-webkit-box-orient":"horizontal | vertical | inline-axis | block-axis"
,"-webkit-box-pack":"start | end | center | justify","box-decoration-break":"slice | clone"
,"box-shadow":"<box-shadow>","box-sizing":"content-box | border-box","break-after"
:"auto | always | avoid | left | right | page | column | avoid-page | avoid-column"
,"break-before":"auto | always | avoid | left | right | page | column | avoid-page | avoid-column"
,"break-inside":"auto | avoid | avoid-page | avoid-column","caption-side":"top | bottom"
,clear:"none | right | left | both",clip:"<shape> | auto","-webkit-clip-path":"<clip-source> | <clip-path> | none"
,"clip-path":"<clip-source> | <clip-path> | none","clip-rule":"nonzero | evenodd"
,color:"<color>","color-interpolation":"auto | sRGB | linearRGB","color-interpolation-filters"
:"auto | sRGB | linearRGB","color-profile":1,"color-rendering":"auto | optimizeSpeed | optimizeQuality"
,"column-count":"<integer> | auto","column-fill":"auto | balance","column-gap":"<length> | normal"
,"column-rule":"<border-width> || <border-style> || <color>","column-rule-color"
:"<color>","column-rule-style":"<border-style>","column-rule-width":"<border-width>"
,"column-span":"none | all","column-width":"<length> | auto",columns:1,content:1
,"counter-increment":1,"counter-reset":1,crop:"<shape> | auto",cue:"cue-after | cue-before"
,"cue-after":1,"cue-before":1,cursor:1,direction:"ltr | rtl",display:"inline | block | list-item | inline-block | table | inline-table | table-row-group | table-header-group | table-footer-group | table-row | table-column-group | table-column | table-cell | table-caption | grid | inline-grid | run-in | ruby | ruby-base | ruby-text | ruby-base-container | ruby-text-container | contents | none | -moz-box | -moz-inline-block | -moz-inline-box | -moz-inline-grid | -moz-inline-stack | -moz-inline-table | -moz-grid | -moz-grid-group | -moz-grid-line | -moz-groupbox | -moz-deck | -moz-popup | -moz-stack | -moz-marker | -webkit-box | -webkit-inline-box | -ms-flexbox | -ms-inline-flexbox | flex | -webkit-flex | inline-flex | -webkit-inline-flex"
,"dominant-baseline":"auto | use-script | no-change | reset-size | ideographic | alphabetic | hanging | mathematical | central | middle | text-after-edge | text-before-edge"
,"drop-initial-after-adjust":"central | middle | after-edge | text-after-edge | ideographic | alphabetic | mathematical | <percentage> | <length>"
,"drop-initial-after-align":"baseline | use-script | before-edge | text-before-edge | after-edge | text-after-edge | central | middle | ideographic | alphabetic | hanging | mathematical"
,"drop-initial-before-adjust":"before-edge | text-before-edge | central | middle | hanging | mathematical | <percentage> | <length>"
,"drop-initial-before-align":"caps-height | baseline | use-script | before-edge | text-before-edge | after-edge | text-after-edge | central | middle | ideographic | alphabetic | hanging | mathematical"
,"drop-initial-size":"auto | line | <length> | <percentage>","drop-initial-value"
:"<integer>",elevation:"<angle> | below | level | above | higher | lower","empty-cells"
:"show | hide","enable-background":1,fill:"<paint>","fill-opacity":"<opacity-value>"
,"fill-rule":"nonzero | evenodd",filter:"<filter-function-list> | none",fit:"fill | hidden | meet | slice"
,"fit-position":1,flex:"<flex>","flex-basis":"<width>","flex-direction":"row | row-reverse | column | column-reverse"
,"flex-flow":"<flex-direction> || <flex-wrap>","flex-grow":"<number>","flex-shrink"
:"<number>","flex-wrap":"nowrap | wrap | wrap-reverse","-webkit-flex":"<flex>","-webkit-flex-basis"
:"<width>","-webkit-flex-direction":"row | row-reverse | column | column-reverse"
,"-webkit-flex-flow":"<flex-direction> || <flex-wrap>","-webkit-flex-grow":"<number>"
,"-webkit-flex-shrink":"<number>","-webkit-flex-wrap":"nowrap | wrap | wrap-reverse"
,"-ms-flex":"<flex>","-ms-flex-align":"start | end | center | stretch | baseline"
,"-ms-flex-direction":"row | row-reverse | column | column-reverse","-ms-flex-order"
:"<number>","-ms-flex-pack":"start | end | center | justify","-ms-flex-wrap":"nowrap | wrap | wrap-reverse"
,"float":"left | right | none","float-offset":1,"flood-color":1,"flood-opacity":"<opacity-value>"
,font:"<font-shorthand> | caption | icon | menu | message-box | small-caption | status-bar"
,"font-family":"<font-family>","font-feature-settings":"<feature-tag-value> | normal"
,"font-kerning":"auto | normal | none","font-size":"<font-size>","font-size-adjust"
:"<number> | none","font-stretch":"<font-stretch>","font-style":"<font-style>","font-variant"
:"<font-variant> | normal | none","font-variant-alternates":"<font-variant-alternates> | normal"
,"font-variant-caps":"<font-variant-caps> | normal","font-variant-east-asian":"<font-variant-east-asian> | normal"
,"font-variant-ligatures":"<font-variant-ligatures> | normal | none","font-variant-numeric"
:"<font-variant-numeric> | normal","font-variant-position":"normal | sub | super"
,"font-weight":"<font-weight>","glyph-orientation-horizontal":"<glyph-angle>","glyph-orientation-vertical"
:"auto | <glyph-angle>",grid:1,"grid-area":1,"grid-auto-columns":1,"grid-auto-flow"
:1,"grid-auto-position":1,"grid-auto-rows":1,"grid-cell-stacking":"columns | rows | layer"
,"grid-column":1,"grid-columns":1,"grid-column-align":"start | end | center | stretch"
,"grid-column-sizing":1,"grid-column-start":1,"grid-column-end":1,"grid-column-span"
:"<integer>","grid-flow":"none | rows | columns","grid-layer":"<integer>","grid-row"
:1,"grid-rows":1,"grid-row-align":"start | end | center | stretch","grid-row-start"
:1,"grid-row-end":1,"grid-row-span":"<integer>","grid-row-sizing":1,"grid-template"
:1,"grid-template-areas":1,"grid-template-columns":1,"grid-template-rows":1,"hanging-punctuation"
:1,height:"<margin-width> | <content-sizing>","hyphenate-after":"<integer> | auto"
,"hyphenate-before":"<integer> | auto","hyphenate-character":"<string> | auto","hyphenate-lines"
:"no-limit | <integer>","hyphenate-resource":1,hyphens:"none | manual | auto",icon
:1,"image-orientation":"angle | auto","image-rendering":"auto | optimizeSpeed | optimizeQuality"
,"image-resolution":1,"ime-mode":"auto | normal | active | inactive | disabled","inline-box-align"
:"last | <integer>","justify-content":"flex-start | flex-end | center | space-between | space-around"
,"-webkit-justify-content":"flex-start | flex-end | center | space-between | space-around"
,kerning:"auto | <length>",left:"<margin-width>","letter-spacing":"<length> | normal"
,"line-height":"<line-height>","line-break":"auto | loose | normal | strict","line-stacking"
:1,"line-stacking-ruby":"exclude-ruby | include-ruby","line-stacking-shift":"consider-shifts | disregard-shifts"
,"line-stacking-strategy":"inline-line-height | block-line-height | max-height | grid-height"
,"list-style":1,"list-style-image":"<uri> | none","list-style-position":"inside | outside"
,"list-style-type":"disc | circle | square | decimal | decimal-leading-zero | lower-roman | upper-roman | lower-greek | lower-latin | upper-latin | armenian | georgian | lower-alpha | upper-alpha | none"
,margin:"<margin-width>{1,4}","margin-bottom":"<margin-width>","margin-left":"<margin-width>"
,"margin-right":"<margin-width>","margin-top":"<margin-width>",mark:1,"mark-after"
:1,"mark-before":1,marker:1,"marker-end":1,"marker-mid":1,"marker-start":1,marks
:1,"marquee-direction":1,"marquee-play-count":1,"marquee-speed":1,"marquee-style"
:1,mask:1,"max-height":"<length> | <percentage> | <content-sizing> | none","max-width"
:"<length> | <percentage> | <content-sizing> | none","min-height":"<length> | <percentage> | <content-sizing> | contain-floats | -moz-contain-floats | -webkit-contain-floats"
,"min-width":"<length> | <percentage> | <content-sizing> | contain-floats | -moz-contain-floats | -webkit-contain-floats"
,"move-to":1,"nav-down":1,"nav-index":1,"nav-left":1,"nav-right":1,"nav-up":1,"object-fit"
:"fill | contain | cover | none | scale-down","object-position":"<position>",opacity
:"<opacity-value>",order:"<integer>","-webkit-order":"<integer>",orphans:"<integer>"
,outline:1,"outline-color":"<color> | invert","outline-offset":1,"outline-style"
:"<border-style>","outline-width":"<border-width>",overflow:"visible | hidden | scroll | auto"
,"overflow-style":1,"overflow-wrap":"normal | break-word","overflow-x":1,"overflow-y"
:1,padding:"<padding-width>{1,4}","padding-bottom":"<padding-width>","padding-left"
:"<padding-width>","padding-right":"<padding-width>","padding-top":"<padding-width>"
,page:1,"page-break-after":"auto | always | avoid | left | right","page-break-before"
:"auto | always | avoid | left | right","page-break-inside":"auto | avoid","page-policy"
:1,pause:1,"pause-after":1,"pause-before":1,perspective:1,"perspective-origin":1
,phonemes:1,pitch:1,"pitch-range":1,"play-during":1,"pointer-events":"auto | none | visiblePainted | visibleFill | visibleStroke | visible | painted | fill | stroke | all"
,position:"static | relative | absolute | fixed","presentation-level":1,"punctuation-trim"
:1,quotes:1,"rendering-intent":1,resize:1,rest:1,"rest-after":1,"rest-before":1,
richness:1,right:"<margin-width>",rotation:1,"rotation-point":1,"ruby-align":1,"ruby-overhang"
:1,"ruby-position":1,"ruby-span":1,"shape-rendering":"auto | optimizeSpeed | crispEdges | geometricPrecision"
,size:1,speak:"normal | none | spell-out","speak-header":"once | always","speak-numeral"
:"digits | continuous","speak-punctuation":"code | none","speech-rate":1,src:1,"stop-color"
:1,"stop-opacity":"<opacity-value>",stress:1,"string-set":1,stroke:"<paint>","stroke-dasharray"
:"none | <dasharray>","stroke-dashoffset":"<percentage> | <length>","stroke-linecap"
:"butt | round | square","stroke-linejoin":"miter | round | bevel","stroke-miterlimit"
:"<miterlimit>","stroke-opacity":"<opacity-value>","stroke-width":"<percentage> | <length>"
,"table-layout":"auto | fixed","tab-size":"<integer> | <length>",target:1,"target-name"
:1,"target-new":1,"target-position":1,"text-align":"left | right | center | justify | match-parent | start | end"
,"text-align-last":1,"text-anchor":"start | middle | end","text-decoration":"<text-decoration-line> || <text-decoration-style> || <text-decoration-color>"
,"text-decoration-color":"<text-decoration-color>","text-decoration-line":"<text-decoration-line>"
,"text-decoration-style":"<text-decoration-style>","text-emphasis":1,"text-height"
:1,"text-indent":"<length> | <percentage>","text-justify":"auto | none | inter-word | inter-ideograph | inter-cluster | distribute | kashida"
,"text-outline":1,"text-overflow":1,"text-rendering":"auto | optimizeSpeed | optimizeLegibility | geometricPrecision"
,"text-shadow":1,"text-transform":"capitalize | uppercase | lowercase | none","text-wrap"
:"normal | none | avoid",top:"<margin-width>","-ms-touch-action":"auto | none | pan-x | pan-y | pan-left | pan-right | pan-up | pan-down | manipulation"
,"touch-action":"auto | none | pan-x | pan-y | pan-left | pan-right | pan-up | pan-down | manipulation"
,transform:1,"transform-origin":1,"transform-style":1,transition:1,"transition-delay"
:1,"transition-duration":1,"transition-property":1,"transition-timing-function":1
,"unicode-bidi":"normal | embed | isolate | bidi-override | isolate-override | plaintext"
,"user-modify":"read-only | read-write | write-only","user-select":"none | text | toggle | element | elements | all"
,"vertical-align":"auto | use-script | baseline | sub | super | top | text-top | central | middle | bottom | text-bottom | <percentage> | <length>"
,visibility:"visible | hidden | collapse","voice-balance":1,"voice-duration":1,"voice-family"
:1,"voice-pitch":1,"voice-pitch-range":1,"voice-rate":1,"voice-stress":1,"voice-volume"
:1,volume:1,"white-space":"normal | pre | nowrap | pre-wrap | pre-line | -pre-wrap | -o-pre-wrap | -moz-pre-wrap | -hp-pre-wrap"
,"white-space-collapse":1,widows:"<integer>",width:"<length> | <percentage> | <content-sizing> | auto"
,"will-change":"<will-change>","word-break":"normal | keep-all | break-all","word-spacing"
:"<length> | normal","word-wrap":"normal | break-word","writing-mode":"horizontal-tb | vertical-rl | vertical-lr | lr-tb | rl-tb | tb-rl | bt-rl | tb-lr | bt-lr | lr-bt | rl-bt | lr | rl | tb"
,"z-index":"<integer> | auto",zoom:"<number> | <percentage> | normal"}},{}],8:[function(
e,t,n){"use strict";function s(e,t,n,s){r.call(this,e,n,s,i.PROPERTY_NAME_TYPE),
this.hack=t}t.exports=s;var r=e("../util/SyntaxUnit"),i=e("./Parser");s.prototype=new
r,s.prototype.constructor=s,s.prototype.toString=function(){return(this.hack?this
.hack:"")+this.text}},{"../util/SyntaxUnit":26,"./Parser":6}],9:[function(e,t,n)
{"use strict";function s(e,t,n){r.call(this,e.join(" "),t,n,i.PROPERTY_VALUE_TYPE
),this.parts=e}t.exports=s;var r=e("../util/SyntaxUnit"),i=e("./Parser");s.prototype=new
r,s.prototype.constructor=s},{"../util/SyntaxUnit":26,"./Parser":6}],10:[function(
e,t,n){"use strict";function r(e){this._i=0,this._parts=e.parts,this._marks=[],this
.value=e}t.exports=r,r.prototype.count=function(){return this._parts.length},r.prototype
.isFirst=function(){return this._i===0},r.prototype.hasNext=function(){return this
._i<this._parts.length},r.prototype.mark=function(){this._marks.push(this._i)},r
.prototype.peek=function(e){return this.hasNext()?this._parts[this._i+(e||0)]:null
},r.prototype.next=function(){return this.hasNext()?this._parts[this._i++]:null}
,r.prototype.previous=function(){return this._i>0?this._parts[--this._i]:null},r
.prototype.restore=function(){this._marks.length&&(this._i=this._marks.pop())},r
.prototype.drop=function(){this._marks.pop()}},{}],11:[function(e,t,n){"use strict"
;function u(e,t,n,o){var a=o||{};r.call(this,e,t,n,s.PROPERTY_VALUE_PART_TYPE),this
.type="unknown";var f;if(/^([+\-]?[\d\.]+)([a-z]+)$/i.test(e)){this.type="dimension"
,this.value=+RegExp.$1,this.units=RegExp.$2;switch(this.units.toLowerCase()){case"em"
:case"rem":case"ex":case"px":case"cm":case"mm":case"in":case"pt":case"pc":case"ch"
:case"vh":case"vw":case"vmax":case"vmin":this.type="length";break;case"fr":this.
type="grid";break;case"deg":case"rad":case"grad":case"turn":this.type="angle";break;
case"ms":case"s":this.type="time";break;case"hz":case"khz":this.type="frequency"
;break;case"dpi":case"dpcm":this.type="resolution"}}else/^([+\-]?[\d\.]+)%$/i.test
(e)?(this.type="percentage",this.value=+RegExp.$1):/^([+\-]?\d+)$/i.test(e)?(this
.type="integer",this.value=+RegExp.$1):/^([+\-]?[\d\.]+)$/i.test(e)?(this.type="number"
,this.value=+RegExp.$1):/^#([a-f0-9]{3,6})/i.test(e)?(this.type="color",f=RegExp
.$1,f.length===3?(this.red=parseInt(f.charAt(0)+f.charAt(0),16),this.green=parseInt
(f.charAt(1)+f.charAt(1),16),this.blue=parseInt(f.charAt(2)+f.charAt(2),16)):(this
.red=parseInt(f.substring(0,2),16),this.green=parseInt(f.substring(2,4),16),this
.blue=parseInt(f.substring(4,6),16))):/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i
.test(e)?(this.type="color",this.red=+RegExp.$1,this.green=+RegExp.$2,this.blue=+
RegExp.$3):/^rgb\(\s*(\d+)%\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/i.test(e)?(this.type="color"
,this.red=+RegExp.$1*255/100,this.green=+RegExp.$2*255/100,this.blue=+RegExp.$3*255/100
):/^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d\.]+)\s*\)/i.test(e)?(this.
type="color",this.red=+RegExp.$1,this.green=+RegExp.$2,this.blue=+RegExp.$3,this
.alpha=+RegExp.$4):/^rgba\(\s*(\d+)%\s*,\s*(\d+)%\s*,\s*(\d+)%\s*,\s*([\d\.]+)\s*\)/i
.test(e)?(this.type="color",this.red=+RegExp.$1*255/100,this.green=+RegExp.$2*255/100
,this.blue=+RegExp.$3*255/100,this.alpha=+RegExp.$4):/^hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/i
.test(e)?(this.type="color",this.hue=+RegExp.$1,this.saturation=+RegExp.$2/100,this
.lightness=+RegExp.$3/100):/^hsla\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*,\s*([\d\.]+)\s*\)/i
.test(e)?(this.type="color",this.hue=+RegExp.$1,this.saturation=+RegExp.$2/100,this
.lightness=+RegExp.$3/100,this.alpha=+RegExp.$4):/^url\(("([^\\"]|\\.)*")\)/i.test
(e)?(this.type="uri",this.uri=u.parseString(RegExp.$1)):/^([^\(]+)\(/i.test(e)?(
this.type="function",this.name=RegExp.$1,this.value=e):/^"([^\n\r\f\\"]|\\\r\n|\\[^\r0-9a-f]|\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)*"/i
.test(e)?(this.type="string",this.value=u.parseString(e)):/^'([^\n\r\f\\']|\\\r\n|\\[^\r0-9a-f]|\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)*'/i
.test(e)?(this.type="string",this.value=u.parseString(e)):i[e.toLowerCase()]?(this
.type="color",f=i[e.toLowerCase()].substring(1),this.red=parseInt(f.substring(0,2
),16),this.green=parseInt(f.substring(2,4),16),this.blue=parseInt(f.substring(4,6
),16)):/^[,\/]$/.test(e)?(this.type="operator",this.value=e):/^-?[a-z_\u00A0-\uFFFF][a-z0-9\-_\u00A0-\uFFFF]*$/i
.test(e)&&(this.type="identifier",this.value=e);this.wasIdent=Boolean(a.ident)}t
.exports=u;var r=e("../util/SyntaxUnit"),i=e("./Colors"),s=e("./Parser"),o=e("./Tokens"
);u.prototype=new r,u.prototype.constructor=u,u.parseString=function(e){e=e.slice
(1,-1);var t=function(e,t){if(/^(\n|\r\n|\r|\f)$/.test(t))return"";var n=/^[0-9a-f]{1,6}/i
.exec(t);if(n){var r=parseInt(n[0],16);return String.fromCodePoint?String.fromCodePoint
(r):String.fromCharCode(r)}return t};return e.replace(/\\(\r\n|[^\r0-9a-f]|[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)/ig
,t)},u.serializeString=function(e){var t=function(e,t){if(t==='"')return"\\"+t;var n=
String.codePointAt?String.codePointAt(0):String.charCodeAt(0);return"\\"+n.toString
(16)+" "};return'"'+e.replace(/["\r\n\f]/g,t)+'"'},u.fromToken=function(e){var t=new
u(e.value,e.startLine,e.startCol,{ident:e.type===o.IDENT});return t}},{"../util/SyntaxUnit"
:26,"./Colors":1,"./Parser":6,"./Tokens":18}],12:[function(e,t,n){"use strict";var r=
t.exports={__proto__:null,":first-letter":1,":first-line":1,":before":1,":after"
:1};r.ELEMENT=1,r.CLASS=2,r.isElement=function(e){return e.indexOf("::")===0||r[
e.toLowerCase()]===r.ELEMENT}},{}],13:[function(e,t,n){"use strict";function o(e
,t,n){r.call(this,e.join(" "),t,n,i.SELECTOR_TYPE),this.parts=e,this.specificity=
s.calculate(this)}t.exports=o;var r=e("../util/SyntaxUnit"),i=e("./Parser"),s=e("./Specificity"
);o.prototype=new r,o.prototype.constructor=o},{"../util/SyntaxUnit":26,"./Parser"
:6,"./Specificity":16}],14:[function(e,t,n){"use strict";function s(e,t,n,s,o){r
.call(this,n,s,o,i.SELECTOR_PART_TYPE),this.elementName=e,this.modifiers=t}t.exports=
s;var r=e("../util/SyntaxUnit"),i=e("./Parser");s.prototype=new r,s.prototype.constructor=
s},{"../util/SyntaxUnit":26,"./Parser":6}],15:[function(e,t,n){"use strict";function s
(e,t,n,s){r.call(this,e,n,s,i.SELECTOR_SUB_PART_TYPE),this.type=t,this.args=[]}t
.exports=s;var r=e("../util/SyntaxUnit"),i=e("./Parser");s.prototype=new r,s.prototype
.constructor=s},{"../util/SyntaxUnit":26,"./Parser":6}],16:[function(e,t,n){"use strict"
;function s(e,t,n,r){this.a=e,this.b=t,this.c=n,this.d=r}t.exports=s;var r=e("./Pseudos"
),i=e("./SelectorPart");s.prototype={constructor:s,compare:function(e){var t=["a"
,"b","c","d"],n,r;for(n=0,r=t.length;n<r;n++){if(this[t[n]]<e[t[n]])return-1;if(
this[t[n]]>e[t[n]])return 1}return 0},valueOf:function(){return this.a*1e3+this.
b*100+this.c*10+this.d},toString:function(){return this.a+","+this.b+","+this.c+","+
this.d}},s.calculate=function(e){function l(e){var t,n,i,s,o=e.elementName?e.elementName
.text:"",h;o&&o.charAt(o.length-1)!=="*"&&f++;for(t=0,i=e.modifiers.length;t<i;t++
){h=e.modifiers[t];switch(h.type){case"class":case"attribute":a++;break;case"id"
:u++;break;case"pseudo":r.isElement(h.text)?f++:a++;break;case"not":for(n=0,s=h.
args.length;n<s;n++)l(h.args[n])}}}var t,n,o,u=0,a=0,f=0;for(t=0,n=e.parts.length
;t<n;t++)o=e.parts[t],o instanceof i&&l(o);return new s(0,u,a,f)}},{"./Pseudos":12
,"./SelectorPart":14}],17:[function(e,t,n){"use strict";function l(e){return e!==
null&&o.test(e)}function c(e){return e!==null&&/\d/.test(e)}function h(e){return e!==
null&&f.test(e)}function p(e){return e!==null&&a.test(e)}function d(e){return e!==
null&&/[a-z_\u00A0-\uFFFF\\]/i.test(e)}function v(e){return e!==null&&(d(e)||/[0-9\-\\]/
.test(e))}function m(e){return e!==null&&(d(e)||/\-\\/.test(e))}function g(e,t){
for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}function y
(e){r.call(this,e,s)}t.exports=y;var r=e("../util/TokenStreamBase"),i=e("./PropertyValuePart"
),s=e("./Tokens"),o=/^[0-9a-fA-F]$/,u=/^[\u00A0-\uFFFF]$/,a=/\n|\r\n|\r|\f/,f=/\u0009|\u000a|\u000c|\u000d|\u0020/
;y.prototype=g(new r,{_getToken:function(){var e,t=this._reader,n=null,r=t.getLine
(),i=t.getCol();e=t.read();while(e){switch(e){case"/":t.peek()==="*"?n=this.commentToken
(e,r,i):n=this.charToken(e,r,i);break;case"|":case"~":case"^":case"$":case"*":t.
peek()==="="?n=this.comparisonToken(e,r,i):n=this.charToken(e,r,i);break;case'"'
:case"'":n=this.stringToken(e,r,i);break;case"#":v(t.peek())?n=this.hashToken(e,
r,i):n=this.charToken(e,r,i);break;case".":c(t.peek())?n=this.numberToken(e,r,i)
:n=this.charToken(e,r,i);break;case"-":t.peek()==="-"?n=this.htmlCommentEndToken
(e,r,i):d(t.peek())?n=this.identOrFunctionToken(e,r,i):n=this.charToken(e,r,i);break;
case"!":n=this.importantToken(e,r,i);break;case"@":n=this.atRuleToken(e,r,i);break;
case":":n=this.notToken(e,r,i);break;case"<":n=this.htmlCommentStartToken(e,r,i)
;break;case"\\":/[^\r\n\f]/.test(t.peek())?n=this.identOrFunctionToken(this.readEscape
(e,!0),r,i):n=this.charToken(e,r,i);break;case"U":case"u":if(t.peek()==="+"){n=this
.unicodeRangeToken(e,r,i);break};default:c(e)?n=this.numberToken(e,r,i):h(e)?n=this
.whitespaceToken(e,r,i):m(e)?n=this.identOrFunctionToken(e,r,i):n=this.charToken
(e,r,i)}break}return!n&&e===null&&(n=this.createToken(s.EOF,null,r,i)),n},createToken
:function(e,t,n,r,i){var s=this._reader;return i=i||{},{value:t,type:e,channel:i
.channel,endChar:i.endChar,hide:i.hide||!1,startLine:n,startCol:r,endLine:s.getLine
(),endCol:s.getCol()}},atRuleToken:function(e,t,n){var r=e,i=this._reader,o=s.CHAR
,u;i.mark(),u=this.readName(),r=e+u,o=s.type(r.toLowerCase());if(o===s.CHAR||o===
s.UNKNOWN)r.length>1?o=s.UNKNOWN_SYM:(o=s.CHAR,r=e,i.reset());return this.createToken
(o,r,t,n)},charToken:function(e,t,n){var r=s.type(e),i={};return r===-1?r=s.CHAR
:i.endChar=s[r].endChar,this.createToken(r,e,t,n,i)},commentToken:function(e,t,n
){var r=this.readComment(e);return this.createToken(s.COMMENT,r,t,n)},comparisonToken
:function(e,t,n){var r=this._reader,i=e+r.read(),o=s.type(i)||s.CHAR;return this
.createToken(o,i,t,n)},hashToken:function(e,t,n){var r=this.readName(e);return this
.createToken(s.HASH,r,t,n)},htmlCommentStartToken:function(e,t,n){var r=this._reader
,i=e;return r.mark(),i+=r.readCount(3),i==="<!--"?this.createToken(s.CDO,i,t,n):
(r.reset(),this.charToken(e,t,n))},htmlCommentEndToken:function(e,t,n){var r=this
._reader,i=e;return r.mark(),i+=r.readCount(2),i==="-->"?this.createToken(s.CDC,
i,t,n):(r.reset(),this.charToken(e,t,n))},identOrFunctionToken:function(e,t,n){var r=
this._reader,i=this.readName(e),o=s.IDENT,u=["url(","url-prefix(","domain("],a;return r
.peek()==="("?(i+=r.read(),u.indexOf(i.toLowerCase())>-1?(r.mark(),a=this.readURI
(i),a===null?(r.reset(),o=s.FUNCTION):(o=s.URI,i=a)):o=s.FUNCTION):r.peek()===":"&&
i.toLowerCase()==="progid"&&(i+=r.readTo("("),o=s.IE_FUNCTION),this.createToken(
o,i,t,n)},importantToken:function(e,t,n){var r=this._reader,i=e,o=s.CHAR,u,a;r.mark
(),a=r.read();while(a){if(a==="/"){if(r.peek()!=="*")break;u=this.readComment(a)
;if(u==="")break}else{if(!h(a)){if(/i/i.test(a)){u=r.readCount(8),/mportant/i.test
(u)&&(i+=a+u,o=s.IMPORTANT_SYM);break}break}i+=a+this.readWhitespace()}a=r.read(
)}return o===s.CHAR?(r.reset(),this.charToken(e,t,n)):this.createToken(o,i,t,n)}
,notToken:function(e,t,n){var r=this._reader,i=e;return r.mark(),i+=r.readCount(4
),i.toLowerCase()===":not("?this.createToken(s.NOT,i,t,n):(r.reset(),this.charToken
(e,t,n))},numberToken:function(e,t,n){var r=this._reader,i=this.readNumber(e),o,
u=s.NUMBER,a=r.peek();return m(a)?(o=this.readName(r.read()),i+=o,/^em$|^ex$|^px$|^gd$|^rem$|^vw$|^vh$|^vmax$|^vmin$|^ch$|^cm$|^mm$|^in$|^pt$|^pc$/i
.test(o)?u=s.LENGTH:/^deg|^rad$|^grad$|^turn$/i.test(o)?u=s.ANGLE:/^ms$|^s$/i.test
(o)?u=s.TIME:/^hz$|^khz$/i.test(o)?u=s.FREQ:/^dpi$|^dpcm$/i.test(o)?u=s.RESOLUTION
:u=s.DIMENSION):a==="%"&&(i+=r.read(),u=s.PERCENTAGE),this.createToken(u,i,t,n)}
,stringToken:function(e,t,n){var r=e,i=e,o=this._reader,u=s.STRING,a=o.read(),f;
while(a){i+=a;if(a==="\\"){a=o.read();if(a===null)break;if(/[^\r\n\f0-9a-f]/i.test
(a))i+=a;else{for(f=0;l(a)&&f<6;f++)i+=a,a=o.read();a==="\r"&&o.peek()==="\n"&&(
i+=a,a=o.read());if(!h(a))continue;i+=a}}else{if(a===r)break;if(p(o.peek())){u=s
.INVALID;break}}a=o.read()}return a===null&&(u=s.INVALID),this.createToken(u,i,t
,n)},unicodeRangeToken:function(e,t,n){var r=this._reader,i=e,o,u=s.CHAR;return r
.peek()==="+"&&(r.mark(),i+=r.read(),i+=this.readUnicodeRangePart(!0),i.length===2?
r.reset():(u=s.UNICODE_RANGE,i.indexOf("?")===-1&&r.peek()==="-"&&(r.mark(),o=r.
read(),o+=this.readUnicodeRangePart(!1),o.length===1?r.reset():i+=o))),this.createToken
(u,i,t,n)},whitespaceToken:function(e,t,n){var r=e+this.readWhitespace();return this
.createToken(s.S,r,t,n)},readUnicodeRangePart:function(e){var t=this._reader,n=""
,r=t.peek();while(l(r)&&n.length<6)t.read(),n+=r,r=t.peek();if(e)while(r==="?"&&
n.length<6)t.read(),n+=r,r=t.peek();return n},readWhitespace:function(){var e=this
._reader,t="",n=e.peek();while(h(n))e.read(),t+=n,n=e.peek();return t},readNumber
:function(e){var t=this._reader,n=e,r=e===".",i=t.peek();while(i){if(c(i))n+=t.read
();else{if(i!==".")break;if(r)break;r=!0,n+=t.read()}i=t.peek()}return n},readString
:function(){var e=this.stringToken(this._reader.read(),0,0);return e.type===s.INVALID?
null:e.value},readURI:function(e){var t=this._reader,n=e,r="",s=t.peek();while(s&&
h(s))t.read(),s=t.peek();s==="'"||s==='"'?(r=this.readString(),r!==null&&(r=i.parseString
(r))):r=this.readUnquotedURL(),s=t.peek();while(s&&h(s))t.read(),s=t.peek();return r===
null||s!==")"?n=null:n+=i.serializeString(r)+t.read(),n},readUnquotedURL:function(
e){var t=this._reader,n=e||"",r;for(r=t.peek();r;r=t.peek())if(u.test(r)||/^[\-!#$%&*-\[\]-~]$/
.test(r))n+=r,t.read();else{if(r!=="\\")break;if(!/^[^\r\n\f]$/.test(t.peek(2)))
break;n+=this.readEscape(t.read(),!0)}return n},readName:function(e){var t=this.
_reader,n=e||"",r;for(r=t.peek();r;r=t.peek())if(r==="\\"){if(!/^[^\r\n\f]$/.test
(t.peek(2)))break;n+=this.readEscape(t.read(),!0)}else{if(!v(r))break;n+=t.read(
)}return n},readEscape:function(e,t){var n=this._reader,r=e||"",i=0,s=n.peek();if(
l(s))do r+=n.read(),s=n.peek();while(s&&l(s)&&++i<6);if(r.length===1){if(!/^[^\r\n\f0-9a-f]$/
.test(s))throw new Error("Bad escape sequence.");n.read();if(t)return s}else s==="\r"?
(n.read(),n.peek()==="\n"&&(s+=n.read())):/^[ \t\n\f]$/.test(s)?n.read():s="";if(
t){var o=parseInt(r.slice(e.length),16);return String.fromCodePoint?String.fromCodePoint
(o):String.fromCharCode(o)}return r+s},readComment:function(e){var t=this._reader
,n=e||"",r=t.read();if(r==="*"){while(r){n+=r;if(n.length>2&&r==="*"&&t.peek()==="/"
){n+=t.read();break}r=t.read()}return n}return""}})},{"../util/TokenStreamBase":27
,"./PropertyValuePart":11,"./Tokens":18}],18:[function(e,t,n){"use strict";var r=
t.exports=[{name:"CDO"},{name:"CDC"},{name:"S",whitespace:!0},{name:"COMMENT",comment
:!0,hide:!0,channel:"comment"},{name:"INCLUDES",text:"~="},{name:"DASHMATCH",text
:"|="},{name:"PREFIXMATCH",text:"^="},{name:"SUFFIXMATCH",text:"$="},{name:"SUBSTRINGMATCH"
,text:"*="},{name:"STRING"},{name:"IDENT"},{name:"HASH"},{name:"IMPORT_SYM",text
:"@import"},{name:"PAGE_SYM",text:"@page"},{name:"MEDIA_SYM",text:"@media"},{name
:"FONT_FACE_SYM",text:"@font-face"},{name:"CHARSET_SYM",text:"@charset"},{name:"NAMESPACE_SYM"
,text:"@namespace"},{name:"SUPPORTS_SYM",text:"@supports"},{name:"VIEWPORT_SYM",
text:["@viewport","@-ms-viewport","@-o-viewport"]},{name:"DOCUMENT_SYM",text:["@document"
,"@-moz-document"]},{name:"UNKNOWN_SYM"},{name:"KEYFRAMES_SYM",text:["@keyframes"
,"@-webkit-keyframes","@-moz-keyframes","@-o-keyframes"]},{name:"IMPORTANT_SYM"}
,{name:"LENGTH"},{name:"ANGLE"},{name:"TIME"},{name:"FREQ"},{name:"DIMENSION"},{
name:"PERCENTAGE"},{name:"NUMBER"},{name:"URI"},{name:"FUNCTION"},{name:"UNICODE_RANGE"
},{name:"INVALID"},{name:"PLUS",text:"+"},{name:"GREATER",text:">"},{name:"COMMA"
,text:","},{name:"TILDE",text:"~"},{name:"NOT"},{name:"TOPLEFTCORNER_SYM",text:"@top-left-corner"
},{name:"TOPLEFT_SYM",text:"@top-left"},{name:"TOPCENTER_SYM",text:"@top-center"
},{name:"TOPRIGHT_SYM",text:"@top-right"},{name:"TOPRIGHTCORNER_SYM",text:"@top-right-corner"
},{name:"BOTTOMLEFTCORNER_SYM",text:"@bottom-left-corner"},{name:"BOTTOMLEFT_SYM"
,text:"@bottom-left"},{name:"BOTTOMCENTER_SYM",text:"@bottom-center"},{name:"BOTTOMRIGHT_SYM"
,text:"@bottom-right"},{name:"BOTTOMRIGHTCORNER_SYM",text:"@bottom-right-corner"
},{name:"LEFTTOP_SYM",text:"@left-top"},{name:"LEFTMIDDLE_SYM",text:"@left-middle"
},{name:"LEFTBOTTOM_SYM",text:"@left-bottom"},{name:"RIGHTTOP_SYM",text:"@right-top"
},{name:"RIGHTMIDDLE_SYM",text:"@right-middle"},{name:"RIGHTBOTTOM_SYM",text:"@right-bottom"
},{name:"RESOLUTION",state:"media"},{name:"IE_FUNCTION"},{name:"CHAR"},{name:"PIPE"
,text:"|"},{name:"SLASH",text:"/"},{name:"MINUS",text:"-"},{name:"STAR",text:"*"
},{name:"LBRACE",endChar:"}",text:"{"},{name:"RBRACE",text:"}"},{name:"LBRACKET"
,endChar:"]",text:"["},{name:"RBRACKET",text:"]"},{name:"EQUALS",text:"="},{name
:"COLON",text:":"},{name:"SEMICOLON",text:";"},{name:"LPAREN",endChar:")",text:"("
},{name:"RPAREN",text:")"},{name:"DOT",text:"."}];(function(){var e=[],t=Object.
create(null);r.UNKNOWN=-1,r.unshift({name:"EOF"});for(var n=0,i=r.length;n<i;n++
){e.push(r[n].name),r[r[n].name]=n;if(r[n].text)if(r[n].text instanceof Array)for(
var s=0;s<r[n].text.length;s++)t[r[n].text[s]]=n;else t[r[n].text]=n}r.name=function(
t){return e[t]},r.type=function(e){return t[e]||-1}})()},{}],19:[function(e,t,n)
{"use strict";var r=e("./Matcher"),i=e("./Properties"),s=e("./ValidationTypes"),
o=e("./ValidationError"),u=e("./PropertyValueIterator"),a=t.exports={validate:function(
e,t){var n=e.toString().toLowerCase(),r=new u(t),a=i[n],f;if(!a){if(n.indexOf("-"
)!==0)throw new o("Unknown property '"+e+"'.",e.line,e.col)}else if(typeof a!="number"
){if(s.isAny(r,"inherit | initial | unset")){if(r.hasNext())throw f=r.next(),new
o("Expected end of value but found '"+f+"'.",f.line,f.col);return}this.singleProperty
(a,r)}},singleProperty:function(e,t){var n=!1,i=t.value,u;n=r.parse(e).match(t);
if(!n)throw t.hasNext()&&!t.isFirst()?(u=t.peek(),new o("Expected end of value but found '"+
u+"'.",u.line,u.col)):new o("Expected ("+s.describe(e)+") but found '"+i+"'.",i.
line,i.col);if(t.hasNext())throw u=t.next(),new o("Expected end of value but found '"+
u+"'.",u.line,u.col)}}},{"./Matcher":3,"./Properties":7,"./PropertyValueIterator"
:10,"./ValidationError":20,"./ValidationTypes":21}],20:[function(e,t,n){"use strict"
;function r(e,t,n){this.col=n,this.line=t,this.message=e}t.exports=r,r.prototype=new
Error},{}],21:[function(e,t,n){"use strict";function s(e,t){Object.keys(t).forEach
(function(n){e[n]=t[n]})}var r=t.exports,i=e("./Matcher");s(r,{isLiteral:function(
e,t){var n=e.text.toString().toLowerCase(),r=t.split(" | "),i,s,o=!1;for(i=0,s=r
.length;i<s&&!o;i++)r[i].charAt(0)==="<"?o=this.simple[r[i]](e):r[i].slice(-2)==="()"?
o=e.type==="function"&&e.name===r[i].slice(0,-2):n===r[i].toLowerCase()&&(o=!0);
return o},isSimple:function(e){return Boolean(this.simple[e])},isComplex:function(
e){return Boolean(this.complex[e])},describe:function(e){return this.complex[e]instanceof
i?this.complex[e].toString(0):e},isAny:function(e,t){var n=t.split(" | "),r,i,s=!1
;for(r=0,i=n.length;r<i&&!s&&e.hasNext();r++)s=this.isType(e,n[r]);return s},isAnyOfGroup
:function(e,t){var n=t.split(" || "),r,i,s=!1;for(r=0,i=n.length;r<i&&!s;r++)s=this
.isType(e,n[r]);return s?n[r-1]:!1},isType:function(e,t){var n=e.peek(),r=!1;return t
.charAt(0)!=="<"?(r=this.isLiteral(n,t),r&&e.next()):this.simple[t]?(r=this.simple
[t](n),r&&e.next()):this.complex[t]instanceof i?r=this.complex[t].match(e):r=this
.complex[t](e),r},simple:{__proto__:null,"<absolute-size>":"xx-small | x-small | small | medium | large | x-large | xx-large"
,"<animateable-feature>":"scroll-position | contents | <animateable-feature-name>"
,"<animateable-feature-name>":function(e){return this["<ident>"](e)&&!/^(unset|initial|inherit|will-change|auto|scroll-position|contents)$/i
.test(e)},"<angle>":function(e){return e.type==="angle"},"<attachment>":"scroll | fixed | local"
,"<attr>":"attr()","<basic-shape>":"inset() | circle() | ellipse() | polygon()","<bg-image>"
:"<image> | <gradient> | none","<border-style>":"none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset"
,"<border-width>":"<length> | thin | medium | thick","<box>":"padding-box | border-box | content-box"
,"<clip-source>":"<uri>","<color>":function(e){return e.type==="color"||String(e
)==="transparent"||String(e)==="currentColor"},"<color-svg>":function(e){return e
.type==="color"},"<content>":"content()","<content-sizing>":"fill-available | -moz-available | -webkit-fill-available | max-content | -moz-max-content | -webkit-max-content | min-content | -moz-min-content | -webkit-min-content | fit-content | -moz-fit-content | -webkit-fit-content"
,"<feature-tag-value>":function(e){return e.type==="function"&&/^[A-Z0-9]{4}$/i.
test(e)},"<filter-function>":"blur() | brightness() | contrast() | custom() | drop-shadow() | grayscale() | hue-rotate() | invert() | opacity() | saturate() | sepia()"
,"<flex-basis>":"<width>","<flex-direction>":"row | row-reverse | column | column-reverse"
,"<flex-grow>":"<number>","<flex-shrink>":"<number>","<flex-wrap>":"nowrap | wrap | wrap-reverse"
,"<font-size>":"<absolute-size> | <relative-size> | <length> | <percentage>","<font-stretch>"
:"normal | ultra-condensed | extra-condensed | condensed | semi-condensed | semi-expanded | expanded | extra-expanded | ultra-expanded"
,"<font-style>":"normal | italic | oblique","<font-variant-caps>":"small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps"
,"<font-variant-css21>":"normal | small-caps","<font-weight>":"normal | bold | bolder | lighter | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900"
,"<generic-family>":"serif | sans-serif | cursive | fantasy | monospace","<geometry-box>"
:"<shape-box> | fill-box | stroke-box | view-box","<glyph-angle>":function(e){return e
.type==="angle"&&e.units==="deg"},"<gradient>":function(e){return e.type==="function"&&/^(?:\-(?:ms|moz|o|webkit)\-)?(?:repeating\-)?(?:radial\-|linear\-)?gradient/i
.test(e)},"<icccolor>":"cielab() | cielch() | cielchab() | icc-color() | icc-named-color()"
,"<ident>":function(e){return e.type==="identifier"||e.wasIdent},"<ident-not-generic-family>"
:function(e){return this["<ident>"](e)&&!this["<generic-family>"](e)},"<image>":"<uri>"
,"<integer>":function(e){return e.type==="integer"},"<length>":function(e){return e
.type==="function"&&/^(?:\-(?:ms|moz|o|webkit)\-)?calc/i.test(e)?!0:e.type==="length"||
e.type==="number"||e.type==="integer"||String(e)==="0"},"<line>":function(e){return e
.type==="integer"},"<line-height>":"<number> | <length> | <percentage> | normal"
,"<margin-width>":"<length> | <percentage> | auto","<miterlimit>":function(e){return this
["<number>"](e)&&e.value>=1},"<nonnegative-length-or-percentage>":function(e){return(
this["<length>"](e)||this["<percentage>"](e))&&(String(e)==="0"||e.type==="function"||
e.value>=0)},"<nonnegative-number-or-percentage>":function(e){return(this["<number>"
](e)||this["<percentage>"](e))&&(String(e)==="0"||e.type==="function"||e.value>=0
)},"<number>":function(e){return e.type==="number"||this["<integer>"](e)},"<opacity-value>"
:function(e){return this["<number>"](e)&&e.value>=0&&e.value<=1},"<padding-width>"
:"<nonnegative-length-or-percentage>","<percentage>":function(e){return e.type==="percentage"||
String(e)==="0"},"<relative-size>":"smaller | larger","<shape>":"rect() | inset-rect()"
,"<shape-box>":"<box> | margin-box","<single-animation-direction>":"normal | reverse | alternate | alternate-reverse"
,"<single-animation-name>":function(e){return this["<ident>"](e)&&/^-?[a-z_][-a-z0-9_]+$/i
.test(e)&&!/^(none|unset|initial|inherit)$/i.test(e)},"<string>":function(e){return e
.type==="string"},"<time>":function(e){return e.type==="time"},"<uri>":function(
e){return e.type==="uri"},"<width>":"<margin-width>"},complex:{__proto__:null,"<azimuth>"
:"<angle> | [ [ left-side | far-left | left | center-left | center | center-right | right | far-right | right-side ] || behind ] | leftwards | rightwards"
,"<bg-position>":"<position>#","<bg-size>":"[ <length> | <percentage> | auto ]{1,2} | cover | contain"
,"<border-image-slice>":i.many([!0],i.cast("<nonnegative-number-or-percentage>")
,i.cast("<nonnegative-number-or-percentage>"),i.cast("<nonnegative-number-or-percentage>"
),i.cast("<nonnegative-number-or-percentage>"),"fill"),"<border-radius>":"<nonnegative-length-or-percentage>{1,4} [ / <nonnegative-length-or-percentage>{1,4} ]?"
,"<box-shadow>":"none | <shadow>#","<clip-path>":"<basic-shape> || <geometry-box>"
,"<dasharray>":i.cast("<nonnegative-length-or-percentage>").braces(1,Infinity,"#"
,i.cast(",").question()),"<family-name>":"<string> | <ident-not-generic-family> <ident>*"
,"<filter-function-list>":"[ <filter-function> | <uri> ]+","<flex>":"none | [ <flex-grow> <flex-shrink>? || <flex-basis> ]"
,"<font-family>":"[ <generic-family> | <family-name> ]#","<font-shorthand>":"[ <font-style> || <font-variant-css21> || <font-weight> || <font-stretch> ]? <font-size> [ / <line-height> ]? <font-family>"
,"<font-variant-alternates>":"stylistic() || historical-forms || styleset() || character-variant() || swash() || ornaments() || annotation()"
,"<font-variant-ligatures>":"[ common-ligatures | no-common-ligatures ] || [ discretionary-ligatures | no-discretionary-ligatures ] || [ historical-ligatures | no-historical-ligatures ] || [ contextual | no-contextual ]"
,"<font-variant-numeric>":"[ lining-nums | oldstyle-nums ] || [ proportional-nums | tabular-nums ] || [ diagonal-fractions | stacked-fractions ] || ordinal || slashed-zero"
,"<font-variant-east-asian>":"[ jis78 | jis83 | jis90 | jis04 | simplified | traditional ] || [ full-width | proportional-width ] || ruby"
,"<paint>":"<paint-basic> | <uri> <paint-basic>?","<paint-basic>":"none | currentColor | <color-svg> <icccolor>?"
,"<position>":"[ center | [ left | right ] [ <percentage> | <length> ]? ] && [ center | [ top | bottom ] [ <percentage> | <length> ]? ] | [ left | center | right | <percentage> | <length> ] [ top | center | bottom | <percentage> | <length> ] | [ left | center | right | top | bottom | <percentage> | <length> ]"
,"<repeat-style>":"repeat-x | repeat-y | [ repeat | space | round | no-repeat ]{1,2}"
,"<shadow>":i.many([!0],i.cast("<length>").braces(2,4),"inset","<color>"),"<text-decoration-color>"
:"<color>","<text-decoration-line>":"none | [ underline || overline || line-through || blink ]"
,"<text-decoration-style>":"solid | double | dotted | dashed | wavy","<will-change>"
:"auto | <animateable-feature>#","<x-one-radius>":"[ <length> | <percentage> ]{1,2}"
}}),Object.keys(r.simple).forEach(function(e){var t=r.simple[e];typeof t=="string"&&
(r.simple[e]=function(e){return r.isLiteral(e,t)})}),Object.keys(r.complex).forEach
(function(e){var t=r.complex[e];typeof t=="string"&&(r.complex[e]=i.parse(t))}),
r.complex["<font-variant>"]=i.oror({expand:"<font-variant-ligatures>"},{expand:"<font-variant-alternates>"
},"<font-variant-caps>",{expand:"<font-variant-numeric>"},{expand:"<font-variant-east-asian>"
})},{"./Matcher":3}],22:[function(e,t,n){"use strict";t.exports={Colors:e("./Colors"
),Combinator:e("./Combinator"),Parser:e("./Parser"),PropertyName:e("./PropertyName"
),PropertyValue:e("./PropertyValue"),PropertyValuePart:e("./PropertyValuePart"),
Matcher:e("./Matcher"),MediaFeature:e("./MediaFeature"),MediaQuery:e("./MediaQuery"
),Selector:e("./Selector"),SelectorPart:e("./SelectorPart"),SelectorSubPart:e("./SelectorSubPart"
),Specificity:e("./Specificity"),TokenStream:e("./TokenStream"),Tokens:e("./Tokens"
),ValidationError:e("./ValidationError")}},{"./Colors":1,"./Combinator":2,"./Matcher"
:3,"./MediaFeature":4,"./MediaQuery":5,"./Parser":6,"./PropertyName":8,"./PropertyValue"
:9,"./PropertyValuePart":11,"./Selector":13,"./SelectorPart":14,"./SelectorSubPart"
:15,"./Specificity":16,"./TokenStream":17,"./Tokens":18,"./ValidationError":20}]
,23:[function(e,t,n){"use strict";function r(){this._listeners=Object.create(null
)}t.exports=r,r.prototype={constructor:r,addListener:function(e,t){this._listeners
[e]||(this._listeners[e]=[]),this._listeners[e].push(t)},fire:function(e){typeof
e=="string"&&(e={type:e}),typeof e.target!="undefined"&&(e.target=this);if(typeof
e.type=="undefined")throw new Error("Event object missing 'type' property.");if(
this._listeners[e.type]){var t=this._listeners[e.type].concat();for(var n=0,r=t.
length;n<r;n++)t[n].call(this,e)}},removeListener:function(e,t){if(this._listeners
[e]){var n=this._listeners[e];for(var r=0,i=n.length;r<i;r++)if(n[r]===t){n.splice
(r,1);break}}}}},{}],24:[function(e,t,n){"use strict";function r(e){this._input=
e.replace(/(\r\n?|\n)/g,"\n"),this._line=1,this._col=1,this._cursor=0}t.exports=
r,r.prototype={constructor:r,getCol:function(){return this._col},getLine:function(
){return this._line},eof:function(){return this._cursor===this._input.length},peek
:function(e){var t=null;return e=typeof e=="undefined"?1:e,this._cursor<this._input
.length&&(t=this._input.charAt(this._cursor+e-1)),t},read:function(){var e=null;
return this._cursor<this._input.length&&(this._input.charAt(this._cursor)==="\n"?
(this._line++,this._col=1):this._col++,e=this._input.charAt(this._cursor++)),e},
mark:function(){this._bookmark={cursor:this._cursor,line:this._line,col:this._col
}},reset:function(){this._bookmark&&(this._cursor=this._bookmark.cursor,this._line=
this._bookmark.line,this._col=this._bookmark.col,delete this._bookmark)},readTo:
function(e){var t="",n;while(t.length<e.length||t.lastIndexOf(e)!==t.length-e.length
){n=this.read();if(!n)throw new Error('Expected "'+e+'" at line '+this._line+", col "+
this._col+".");t+=n}return t},readWhile:function(e){var t="",n=this.peek();while(
n!==null&&e(n))t+=this.read(),n=this.peek();return t},readMatch:function(e){var t=
this._input.substring(this._cursor),n=null;return typeof e=="string"?t.slice(0,e
.length)===e&&(n=this.readCount(e.length)):e instanceof RegExp&&e.test(t)&&(n=this
.readCount(RegExp.lastMatch.length)),n},readCount:function(e){var t="";while(e--
)t+=this.read();return t}}},{}],25:[function(e,t,n){"use strict";function r(e,t,
n){Error.call(this),this.name=this.constructor.name,this.col=n,this.line=t,this.
message=e}t.exports=r,r.prototype=Object.create(Error.prototype),r.prototype.constructor=
r},{}],26:[function(e,t,n){"use strict";function r(e,t,n,r){this.col=n,this.line=
t,this.text=e,this.type=r}t.exports=r,r.fromToken=function(e){return new r(e.value
,e.startLine,e.startCol)},r.prototype={constructor:r,valueOf:function(){return this
.toString()},toString:function(){return this.text}}},{}],27:[function(e,t,n){"use strict"
;function s(e,t){this._reader=new r(e?e.toString():""),this._token=null,this._tokenData=
t,this._lt=[],this._ltIndex=0,this._ltIndexCache=[]}t.exports=s;var r=e("./StringReader"
),i=e("./SyntaxError");s.createTokenData=function(e){var t=[],n=Object.create(null
),r=e.concat([]),i=0,s=r.length+1;r.UNKNOWN=-1,r.unshift({name:"EOF"});for(;i<s;
i++)t.push(r[i].name),r[r[i].name]=i,r[i].text&&(n[r[i].text]=i);return r.name=function(
e){return t[e]},r.type=function(e){return n[e]},r},s.prototype={constructor:s,match
:function(e,t){e instanceof Array||(e=[e]);var n=this.get(t),r=0,i=e.length;while(
r<i)if(n===e[r++])return!0;return this.unget(),!1},mustMatch:function(e){var t;e instanceof
Array||(e=[e]);if(!this.match.apply(this,arguments))throw t=this.LT(1),new i("Expected "+
this._tokenData[e[0]].name+" at line "+t.startLine+", col "+t.startCol+".",t.startLine
,t.startCol)},advance:function(e,t){while(this.LA(0)!==0&&!this.match(e,t))this.
get();return this.LA(0)},get:function(e){var t=this._tokenData,n=0,r,i;if(this._lt
.length&&this._ltIndex>=0&&this._ltIndex<this._lt.length){n++,this._token=this._lt
[this._ltIndex++],i=t[this._token.type];while(i.channel!==undefined&&e!==i.channel&&
this._ltIndex<this._lt.length)this._token=this._lt[this._ltIndex++],i=t[this._token
.type],n++;if((i.channel===undefined||e===i.channel)&&this._ltIndex<=this._lt.length
)return this._ltIndexCache.push(n),this._token.type}return r=this._getToken(),r.
type>-1&&!t[r.type].hide&&(r.channel=t[r.type].channel,this._token=r,this._lt.push
(r),this._ltIndexCache.push(this._lt.length-this._ltIndex+n),this._lt.length>5&&
this._lt.shift(),this._ltIndexCache.length>5&&this._ltIndexCache.shift(),this._ltIndex=
this._lt.length),i=t[r.type],i&&(i.hide||i.channel!==undefined&&e!==i.channel)?this
.get(e):r.type},LA:function(e){var t=e,n;if(e>0){if(e>5)throw new Error("Too much lookahead."
);while(t)n=this.get(),t--;while(t<e)this.unget(),t++}else if(e<0){if(!this._lt[
this._ltIndex+e])throw new Error("Too much lookbehind.");n=this._lt[this._ltIndex+
e].type}else n=this._token.type;return n},LT:function(e){return this.LA(e),this.
_lt[this._ltIndex+e-1]},peek:function(){return this.LA(1)},token:function(){return this
._token},tokenName:function(e){return e<0||e>this._tokenData.length?"UNKNOWN_TOKEN"
:this._tokenData[e].name},tokenType:function(e){return this._tokenData[e]||-1},unget
:function(){if(!this._ltIndexCache.length)throw new Error("Too much lookahead.")
;this._ltIndex-=this._ltIndexCache.pop(),this._token=this._lt[this._ltIndex-1]}}
},{"./StringReader":24,"./SyntaxError":25}],28:[function(e,t,n){"use strict";t.exports=
{StringReader:e("./StringReader"),SyntaxError:e("./SyntaxError"),SyntaxUnit:e("./SyntaxUnit"
),EventTarget:e("./EventTarget"),TokenStreamBase:e("./TokenStreamBase")}},{"./EventTarget"
:23,"./StringReader":24,"./SyntaxError":25,"./SyntaxUnit":26,"./TokenStreamBase"
:27}],parserlib:[function(e,t,n){"use strict";t.exports={css:e("./css"),util:e("./util"
)}},{"./css":22,"./util":28}]},{},[]),e("parserlib")}(),r=function(){"use strict"
;function i(t,s,o,u,a){function p(t,o){if(t===null)return null;if(o===0)return t
;var d,v;if(typeof t!="object")return t;if(t instanceof e)d=new e;else if(t instanceof
n)d=new n;else if(t instanceof r)d=new r(function(e,n){t.then(function(t){e(p(t,
o-1))},function(e){n(p(e,o-1))})});else if(i.__isArray(t))d=[];else if(i.__isRegExp
(t))d=new RegExp(t.source,f(t)),t.lastIndex&&(d.lastIndex=t.lastIndex);else if(i
.__isDate(t))d=new Date(t.getTime());else{if(h&&Buffer.isBuffer(t))return d=new
Buffer(t.length),t.copy(d),d;t instanceof Error?d=Object.create(t):typeof u=="undefined"?
(v=Object.getPrototypeOf(t),d=Object.create(v)):(d=Object.create(u),v=u)}if(s){var m=
l.indexOf(t);if(m!=-1)return c[m];l.push(t),c.push(d)}if(t instanceof e){var g=t
.keys();for(;;){var y=g.next();if(y.done)break;var b=p(y.value,o-1),w=p(t.get(y.
value),o-1);d.set(b,w)}}if(t instanceof n){var E=t.keys();for(;;){var y=E.next()
;if(y.done)break;var S=p(y.value,o-1);d.add(S)}}for(var x in t){var T;v&&(T=Object
.getOwnPropertyDescriptor(v,x));if(T&&T.set==null)continue;d[x]=p(t[x],o-1)}if(Object
.getOwnPropertySymbols){var N=Object.getOwnPropertySymbols(t);for(var x=0;x<N.length
;x++){var C=N[x],k=Object.getOwnPropertyDescriptor(t,C);if(k&&!k.enumerable&&!a)
continue;d[C]=p(t[C],o-1),k.enumerable||Object.defineProperty(d,C,{enumerable:!1
})}}if(a){var L=Object.getOwnPropertyNames(t);for(var x=0;x<L.length;x++){var A=
L[x],k=Object.getOwnPropertyDescriptor(t,A);if(k&&k.enumerable)continue;d[A]=p(t
[A],o-1),Object.defineProperty(d,A,{enumerable:!1})}}return d}typeof s=="object"&&
(o=s.depth,u=s.prototype,a=s.includeNonEnumerable,s=s.circular);var l=[],c=[],h=typeof
Buffer!="undefined";return typeof s=="undefined"&&(s=!0),typeof o=="undefined"&&
(o=Infinity),p(t,o)}function s(e){return Object.prototype.toString.call(e)}function o
(e){return typeof e=="object"&&s(e)==="[object Date]"}function u(e){return typeof
e=="object"&&s(e)==="[object Array]"}function a(e){return typeof e=="object"&&s(
e)==="[object RegExp]"}function f(e){var t="";return e.global&&(t+="g"),e.ignoreCase&&
(t+="i"),e.multiline&&(t+="m"),t}var e;try{e=Map}catch(t){e=function(){}}var n;try{
n=Set}catch(t){n=function(){}}var r;try{r=Promise}catch(t){r=function(){}}return i
.clonePrototype=function(t){if(t===null)return null;var n=function(){};return n.
prototype=t,new n},i.__objToStr=s,i.__isDate=o,i.__isArray=u,i.__isRegExp=a,i.__getRegExpFlags=
f,i}();typeof e=="object"&&e.exports&&(e.exports=r);var i=function(){"use strict"
;function a(e,t){var n,r=e&&e.match(o),i=r&&r[1];return i&&(n={"true":2,"":1,"false"
:0,2:2,1:1,0:0},i.toLowerCase().split(",").forEach(function(e){var r=e.split(":"
),i=r[0]||"",s=r[1]||"";t[i.trim()]=n[s.trim()]})),t}var e=[],t=[],o=/\/\*\s*csslint([^\*]*)\*\//
,u=new n.util.EventTarget;return u.version="1.0.4",u.addRule=function(t){e.push(
t),e[t.id]=t},u.clearRules=function(){e=[]},u.getRules=function(){return[].concat
(e).sort(function(e,t){return e.id>t.id?1:0})},u.getRuleset=function(){var t={},
n=0,r=e.length;while(n<r)t[e[n++].id]=1;return t},u.addFormatter=function(e){t[e
.id]=e},u.getFormatter=function(e){return t[e]},u.format=function(e,t,n,r){var i=
this.getFormatter(n),s=null;return i&&(s=i.startFormat(),s+=i.formatResults(e,t,
r||{}),s+=i.endFormat()),s},u.hasFormat=function(e){return t.hasOwnProperty(e)},
u.verify=function(t,u){var f=0,l,c,h={},p=[],d,v=new n.css.Parser({starHack:!0,ieFilters
:!0,underscoreHack:!0,strict:!1});c=t.replace(/\n\r?/g,"$split$").split("$split$"
),i.Util.forEach(c,function(e,t){var n=e&&e.match(/\/\*[ \t]*csslint[ \t]+allow:[ \t]*([^\*]*)\*\//i
),r=n&&n[1],i={};r&&(r.toLowerCase().split(",").forEach(function(e){i[e.trim()]=!0
}),Object.keys(i).length>0&&(h[t+1]=i))});var m=null,g=null;i.Util.forEach(c,function(
e,t){m===null&&e.match(/\/\*[ \t]*csslint[ \t]+ignore:start[ \t]*\*\//i)&&(m=t),
e.match(/\/\*[ \t]*csslint[ \t]+ignore:end[ \t]*\*\//i)&&(g=t),m!==null&&g!==null&&
(p.push([m,g]),m=g=null)}),m!==null&&p.push([m,c.length]),u||(u=this.getRuleset(
)),o.test(t)&&(u=r(u),u=a(t,u)),l=new s(c,u,h,p),u.errors=2;for(f in u)u.hasOwnProperty
(f)&&u[f]&&e[f]&&e[f].init(v,l);try{v.parse(t)}catch(y){l.error("Fatal error, cannot continue: "+
y.message,y.line,y.col,{})}return d={messages:l.messages,stats:l.stats,ruleset:l
.ruleset,allow:l.allow,ignore:l.ignore},d.messages.sort(function(e,t){return e.rollup&&!
t.rollup?1:!e.rollup&&t.rollup?-1:e.line-t.line}),d},u}();return s.prototype={constructor
:s,error:function(e,t,n,r){"use strict";this.messages.push({type:"error",line:t,
col:n,message:e,evidence:this.lines[t-1],rule:r||{}})},warn:function(e,t,n,r){"use strict"
;this.report(e,t,n,r)},report:function(e,t,n,r){"use strict";if(this.allow.hasOwnProperty
(t)&&this.allow[t].hasOwnProperty(r.id))return;var s=!1;i.Util.forEach(this.ignore
,function(e){e[0]<=t&&t<=e[1]&&(s=!0)});if(s)return;this.messages.push({type:this
.ruleset[r.id]===2?"error":"warning",line:t,col:n,message:e,evidence:this.lines[
t-1],rule:r})},info:function(e,t,n,r){"use strict";this.messages.push({type:"info"
,line:t,col:n,message:e,evidence:this.lines[t-1],rule:r})},rollupError:function(
e,t){"use strict";this.messages.push({type:"error",rollup:!0,message:e,rule:t})}
,rollupWarn:function(e,t){"use strict";this.messages.push({type:"warning",rollup
:!0,message:e,rule:t})},stat:function(e,t){"use strict";this.stats[e]=t}},i._Reporter=
s,i.Util={mix:function(e,t){"use strict";var n;for(n in t)t.hasOwnProperty(n)&&(
e[n]=t[n]);return n},indexOf:function(e,t){"use strict";if(e.indexOf)return e.indexOf
(t);for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},forEach:function(
e,t){"use strict";if(e.forEach)return e.forEach(t);for(var n=0,r=e.length;n<r;n++
)t(e[n],n,e)}},i.addRule({id:"adjoining-classes",name:"Disallow adjoining classes"
,desc:"Don't use adjoining classes.",url:"https://github.com/CSSLint/csslint/wiki/Disallow-adjoining-classes"
,browsers:"IE6",init:function(e,t){"use strict";var n=this;e.addListener("startrule"
,function(r){var i=r.selectors,s,o,u,a,f,l,c;for(f=0;f<i.length;f++){s=i[f];for(
l=0;l<s.parts.length;l++){o=s.parts[l];if(o.type===e.SELECTOR_PART_TYPE){a=0;for(
c=0;c<o.modifiers.length;c++)u=o.modifiers[c],u.type==="class"&&a++,a>1&&t.report
("Adjoining classes: "+i[f].text,o.line,o.col,n)}}}})}}),i.addRule({id:"box-model"
,name:"Beware of broken box size",desc:"Don't use width or height when using padding or border."
,url:"https://github.com/CSSLint/csslint/wiki/Beware-of-box-model-size",browsers
:"All",init:function(e,t){"use strict";function u(){s={},o=!1}function a(){var e
,u;if(!o){if(s.height)for(e in i)i.hasOwnProperty(e)&&s[e]&&(u=s[e].value,(e!=="padding"||
u.parts.length!==2||u.parts[0].value!==0)&&t.report("Using height with "+e+" can sometimes make elements larger than you expect."
,s[e].line,s[e].col,n));if(s.width)for(e in r)r.hasOwnProperty(e)&&s[e]&&(u=s[e]
.value,(e!=="padding"||u.parts.length!==2||u.parts[1].value!==0)&&t.report("Using width with "+
e+" can sometimes make elements larger than you expect.",s[e].line,s[e].col,n))}
}var n=this,r={border:1,"border-left":1,"border-right":1,padding:1,"padding-left"
:1,"padding-right":1},i={border:1,"border-bottom":1,"border-top":1,padding:1,"padding-bottom"
:1,"padding-top":1},s,o=!1;e.addListener("startrule",u),e.addListener("startfontface"
,u),e.addListener("startpage",u),e.addListener("startpagemargin",u),e.addListener
("startkeyframerule",u),e.addListener("startviewport",u),e.addListener("property"
,function(e){var t=e.property.text.toLowerCase();i[t]||r[t]?!/^0\S*$/.test(e.value
)&&(t!=="border"||e.value.toString()!=="none")&&(s[t]={line:e.property.line,col:
e.property.col,value:e.value}):/^(width|height)/i.test(t)&&/^(length|percentage)/
.test(e.value.parts[0].type)?s[t]=1:t==="box-sizing"&&(o=!0)}),e.addListener("endrule"
,a),e.addListener("endfontface",a),e.addListener("endpage",a),e.addListener("endpagemargin"
,a),e.addListener("endkeyframerule",a),e.addListener("endviewport",a)}}),i.addRule
({id:"box-sizing",name:"Disallow use of box-sizing",desc:"The box-sizing properties isn't supported in IE6 and IE7."
,url:"https://github.com/CSSLint/csslint/wiki/Disallow-box-sizing",browsers:"IE6, IE7"
,tags:["Compatibility"],init:function(e,t){"use strict";var n=this;e.addListener
("property",function(e){var r=e.property.text.toLowerCase();r==="box-sizing"&&t.
report("The box-sizing property isn't supported in IE6 and IE7.",e.line,e.col,n)
})}}),i.addRule({id:"bulletproof-font-face",name:"Use the bulletproof @font-face syntax"
,desc:"Use the bulletproof @font-face syntax to avoid 404's in old IE (http://www.fontspring.com/blog/the-new-bulletproof-font-face-syntax)."
,url:"https://github.com/CSSLint/csslint/wiki/Bulletproof-font-face",browsers:"All"
,init:function(e,t){"use strict";var n=this,r=!1,i=!0,s=!1,o,u;e.addListener("startfontface"
,function(){r=!0}),e.addListener("property",function(e){if(!r)return;var t=e.property
.toString().toLowerCase(),n=e.value.toString();o=e.line,u=e.col;if(t==="src"){var a=/^\s?url\(['"].+\.eot\?.*['"]\)\s*format\(['"]embedded-opentype['"]\).*$/i
;!n.match(a)&&i?(s=!0,i=!1):n.match(a)&&!i&&(s=!1)}}),e.addListener("endfontface"
,function(){r=!1,s&&t.report("@font-face declaration doesn't follow the fontspring bulletproof syntax."
,o,u,n)})}}),i.addRule({id:"compatible-vendor-prefixes",name:"Require compatible vendor prefixes"
,desc:"Include all compatible vendor prefixes to reach a wider range of users.",
url:"https://github.com/CSSLint/csslint/wiki/Require-compatible-vendor-prefixes"
,browsers:"All",init:function(e,t){"use strict";var n=this,r,s,o,u,a,f,l,c=!1,h=
Array.prototype.push,p=[];r={animation:"webkit","animation-delay":"webkit","animation-direction"
:"webkit","animation-duration":"webkit","animation-fill-mode":"webkit","animation-iteration-count"
:"webkit","animation-name":"webkit","animation-play-state":"webkit","animation-timing-function"
:"webkit",appearance:"webkit moz","border-end":"webkit moz","border-end-color":"webkit moz"
,"border-end-style":"webkit moz","border-end-width":"webkit moz","border-image":"webkit moz o"
,"border-radius":"webkit","border-start":"webkit moz","border-start-color":"webkit moz"
,"border-start-style":"webkit moz","border-start-width":"webkit moz","box-align"
:"webkit moz ms","box-direction":"webkit moz ms","box-flex":"webkit moz ms","box-lines"
:"webkit ms","box-ordinal-group":"webkit moz ms","box-orient":"webkit moz ms","box-pack"
:"webkit moz ms","box-sizing":"","box-shadow":"","column-count":"webkit moz ms","column-gap"
:"webkit moz ms","column-rule":"webkit moz ms","column-rule-color":"webkit moz ms"
,"column-rule-style":"webkit moz ms","column-rule-width":"webkit moz ms","column-width"
:"webkit moz ms",hyphens:"epub moz","line-break":"webkit ms","margin-end":"webkit moz"
,"margin-start":"webkit moz","marquee-speed":"webkit wap","marquee-style":"webkit wap"
,"padding-end":"webkit moz","padding-start":"webkit moz","tab-size":"moz o","text-size-adjust"
:"webkit ms",transform:"webkit ms","transform-origin":"webkit ms",transition:"","transition-delay"
:"","transition-duration":"","transition-property":"","transition-timing-function"
:"","user-modify":"webkit moz","user-select":"webkit moz ms","word-break":"epub ms"
,"writing-mode":"epub ms"};for(o in r)if(r.hasOwnProperty(o)){u=[],a=r[o].split(" "
);for(f=0,l=a.length;f<l;f++)u.push("-"+a[f]+"-"+o);r[o]=u,h.apply(p,u)}e.addListener
("startrule",function(){s=[]}),e.addListener("startkeyframes",function(e){c=e.prefix||!0
}),e.addListener("endkeyframes",function(){c=!1}),e.addListener("property",function(
e){var t=e.property;i.Util.indexOf(p,t.text)>-1&&(!c||typeof c!="string"||t.text
.indexOf("-"+c+"-")!==0)&&s.push(t)}),e.addListener("endrule",function(){if(!s.length
)return;var e={},o,u,a,f,l,c,h,p,d,v;for(o=0,u=s.length;o<u;o++){a=s[o];for(f in
r)r.hasOwnProperty(f)&&(l=r[f],i.Util.indexOf(l,a.text)>-1&&(e[f]||(e[f]={full:l
.slice(0),actual:[],actualNodes:[]}),i.Util.indexOf(e[f].actual,a.text)===-1&&(e
[f].actual.push(a.text),e[f].actualNodes.push(a))))}for(f in e)if(e.hasOwnProperty
(f)){c=e[f],h=c.full,p=c.actual;if(h.length>p.length)for(o=0,u=h.length;o<u;o++)
d=h[o],i.Util.indexOf(p,d)===-1&&(v=p.length===1?p[0]:p.length===2?p.join(" and "
):p.join(", "),t.report("The property "+d+" is compatible with "+v+" and should be included as well."
,c.actualNodes[0].line,c.actualNodes[0].col,n))}})}}),i.addRule({id:"display-property-grouping"
,name:"Require properties appropriate for display",desc:"Certain properties shouldn't be used with certain display property values."
,url:"https://github.com/CSSLint/csslint/wiki/Require-properties-appropriate-for-display"
,browsers:"All",init:function(e,t){"use strict";function s(e,s,o){i[e]&&(typeof
r[e]!="string"||i[e].value.toLowerCase()!==r[e])&&t.report(o||e+" can't be used with display: "+
s+".",i[e].line,i[e].col,n)}function o(){i={}}function u(){var e=i.display?i.display
.value:null;if(e)switch(e){case"inline":s("height",e),s("width",e),s("margin",e)
,s("margin-top",e),s("margin-bottom",e),s("float",e,"display:inline has no effect on floated elements (but may be used to fix the IE6 double-margin bug)."
);break;case"block":s("vertical-align",e);break;case"inline-block":s("float",e);
break;default:e.indexOf("table-")===0&&(s("margin",e),s("margin-left",e),s("margin-right"
,e),s("margin-top",e),s("margin-bottom",e),s("float",e))}}var n=this,r={display:1
,"float":"none",height:1,width:1,margin:1,"margin-left":1,"margin-right":1,"margin-bottom"
:1,"margin-top":1,padding:1,"padding-left":1,"padding-right":1,"padding-bottom":1
,"padding-top":1,"vertical-align":1},i;e.addListener("startrule",o),e.addListener
("startfontface",o),e.addListener("startkeyframerule",o),e.addListener("startpagemargin"
,o),e.addListener("startpage",o),e.addListener("startviewport",o),e.addListener("property"
,function(e){var t=e.property.text.toLowerCase();r[t]&&(i[t]={value:e.value.text
,line:e.property.line,col:e.property.col})}),e.addListener("endrule",u),e.addListener
("endfontface",u),e.addListener("endkeyframerule",u),e.addListener("endpagemargin"
,u),e.addListener("endpage",u),e.addListener("endviewport",u)}}),i.addRule({id:"duplicate-background-images"
,name:"Disallow duplicate background images",desc:"Every background-image should be unique. Use a common class for e.g. sprites."
,url:"https://github.com/CSSLint/csslint/wiki/Disallow-duplicate-background-images"
,browsers:"All",init:function(e,t){"use strict";var n=this,r={};e.addListener("property"
,function(e){var i=e.property.text,s=e.value,o,u;if(i.match(/background/i))for(o=0
,u=s.parts.length;o<u;o++)s.parts[o].type==="uri"&&(typeof r[s.parts[o].uri]=="undefined"?
r[s.parts[o].uri]=e:t.report("Background image '"+s.parts[o].uri+"' was used multiple times, first declared at line "+
r[s.parts[o].uri].line+", col "+r[s.parts[o].uri].col+".",e.line,e.col,n))})}}),
i.addRule({id:"duplicate-properties",name:"Disallow duplicate properties",desc:"Duplicate properties must appear one after the other."
,url:"https://github.com/CSSLint/csslint/wiki/Disallow-duplicate-properties",browsers
:"All",init:function(e,t){"use strict";function s(){r={}}var n=this,r,i;e.addListener
("startrule",s),e.addListener("startfontface",s),e.addListener("startpage",s),e.
addListener("startpagemargin",s),e.addListener("startkeyframerule",s),e.addListener
("startviewport",s),e.addListener("property",function(e){var s=e.property,o=s.text
.toLowerCase();r[o]&&(i!==o||r[o]===e.value.text)&&t.report("Duplicate property '"+
e.property+"' found.",e.line,e.col,n),r[o]=e.value.text,i=o})}}),i.addRule({id:"empty-rules"
,name:"Disallow empty rules",desc:"Rules without any properties specified should be removed."
,url:"https://github.com/CSSLint/csslint/wiki/Disallow-empty-rules",browsers:"All"
,init:function(e,t){"use strict";var n=this,r=0;e.addListener("startrule",function(
){r=0}),e.addListener("property",function(){r++}),e.addListener("endrule",function(
e){var i=e.selectors;r===0&&t.report("Rule is empty.",i[0].line,i[0].col,n)})}})
,i.addRule({id:"errors",name:"Parsing Errors",desc:"This rule looks for recoverable syntax errors."
,browsers:"All",init:function(e,t){"use strict";var n=this;e.addListener("error"
,function(e){t.error(e.message,e.line,e.col,n)})}}),i.addRule({id:"fallback-colors"
,name:"Require fallback colors",desc:"For older browsers that don't support RGBA, HSL, or HSLA, provide a fallback color."
,url:"https://github.com/CSSLint/csslint/wiki/Require-fallback-colors",browsers:"IE6,IE7,IE8"
,init:function(e,t){"use strict";function s(){r=null}var n=this,r,i={color:1,background
:1,"border-color":1,"border-top-color":1,"border-right-color":1,"border-bottom-color"
:1,"border-left-color":1,border:1,"border-top":1,"border-right":1,"border-bottom"
:1,"border-left":1,"background-color":1};e.addListener("startrule",s),e.addListener
("startfontface",s),e.addListener("startpage",s),e.addListener("startpagemargin"
,s),e.addListener("startkeyframerule",s),e.addListener("startviewport",s),e.addListener
("property",function(e){var s=e.property,o=s.text.toLowerCase(),u=e.value.parts,
a=0,f="",l=u.length;if(i[o])while(a<l)u[a].type==="color"&&("alpha"in u[a]||"hue"in
u[a]?(/([^\)]+)\(/.test(u[a])&&(f=RegExp.$1.toUpperCase()),(!r||r.property.text.
toLowerCase()!==o||r.colorType!=="compat")&&t.report("Fallback "+o+" (hex or RGB) should precede "+
f+" "+o+".",e.line,e.col,n)):e.colorType="compat"),a++;r=e})}}),i.addRule({id:"floats"
,name:"Disallow too many floats",desc:"This rule tests if the float property is used too many times"
,url:"https://github.com/CSSLint/csslint/wiki/Disallow-too-many-floats",browsers
:"All",init:function(e,t){"use strict";var n=this,r=0;e.addListener("property",function(
e){e.property.text.toLowerCase()==="float"&&e.value.text.toLowerCase()!=="none"&&
r++}),e.addListener("endstylesheet",function(){t.stat("floats",r),r>=10&&t.rollupWarn
("Too many floats ("+r+"), you're probably using them for layout. Consider using a grid system instead."
,n)})}}),i.addRule({id:"font-faces",name:"Don't use too many web fonts",desc:"Too many different web fonts in the same stylesheet."
,url:"https://github.com/CSSLint/csslint/wiki/Don%27t-use-too-many-web-fonts",browsers
:"All",init:function(e,t){"use strict";var n=this,r=0;e.addListener("startfontface"
,function(){r++}),e.addListener("endstylesheet",function(){r>5&&t.rollupWarn("Too many @font-face declarations ("+
r+").",n)})}}),i.addRule({id:"font-sizes",name:"Disallow too many font sizes",desc
:"Checks the number of font-size declarations.",url:"https://github.com/CSSLint/csslint/wiki/Don%27t-use-too-many-font-size-declarations"
,browsers:"All",init:function(e,t){"use strict";var n=this,r=0;e.addListener("property"
,function(e){e.property.toString()==="font-size"&&r++}),e.addListener("endstylesheet"
,function(){t.stat("font-sizes",r),r>=10&&t.rollupWarn("Too many font-size declarations ("+
r+"), abstraction needed.",n)})}}),i.addRule({id:"gradients",name:"Require all gradient definitions"
,desc:"When using a vendor-prefixed gradient, make sure to use them all.",url:"https://github.com/CSSLint/csslint/wiki/Require-all-gradient-definitions"
,browsers:"All",init:function(e,t){"use strict";var n=this,r;e.addListener("startrule"
,function(){r={moz:0,webkit:0,oldWebkit:0,o:0}}),e.addListener("property",function(
e){/\-(moz|o|webkit)(?:\-(?:linear|radial))\-gradient/i.test(e.value)?r[RegExp.$1
]=1:/\-webkit\-gradient/i.test(e.value)&&(r.oldWebkit=1)}),e.addListener("endrule"
,function(e){var i=[];r.moz||i.push("Firefox 3.6+"),r.webkit||i.push("Webkit (Safari 5+, Chrome)"
),r.oldWebkit||i.push("Old Webkit (Safari 4+, Chrome)"),r.o||i.push("Opera 11.1+"
),i.length&&i.length<4&&t.report("Missing vendor-prefixed CSS gradients for "+i.
join(", ")+".",e.selectors[0].line,e.selectors[0].col,n)})}}),i.addRule({id:"ids"
,name:"Disallow IDs in selectors",desc:"Selectors should not contain IDs.",url:"https://github.com/CSSLint/csslint/wiki/Disallow-IDs-in-selectors"
,browsers:"All",init:function(e,t){"use strict";var n=this;e.addListener("startrule"
,function(r){var i=r.selectors,s,o,u,a,f,l,c;for(f=0;f<i.length;f++){s=i[f],a=0;
for(l=0;l<s.parts.length;l++){o=s.parts[l];if(o.type===e.SELECTOR_PART_TYPE)for(
c=0;c<o.modifiers.length;c++)u=o.modifiers[c],u.type==="id"&&a++}a===1?t.report("Don't use IDs in selectors."
,s.line,s.col,n):a>1&&t.report(a+" IDs in the selector, really?",s.line,s.col,n)
}})}}),i.addRule({id:"import-ie-limit",name:"@import limit on IE6-IE9",desc:"IE6-9 supports up to 31 @import per stylesheet"
,browsers:"IE6, IE7, IE8, IE9",init:function(e,t){"use strict";function s(){i=0}
var n=this,r=31,i=0;e.addListener("startpage",s),e.addListener("import",function(
){i++}),e.addListener("endstylesheet",function(){i>r&&t.rollupError("Too many @import rules ("+
i+"). IE6-9 supports up to 31 import per stylesheet.",n)})}}),i.addRule({id:"import"
,name:"Disallow @import",desc:"Don't use @import, use <link> instead.",url:"https://github.com/CSSLint/csslint/wiki/Disallow-%40import"
,browsers:"All",init:function(e,t){"use strict";var n=this;e.addListener("import"
,function(e){t.report("@import prevents parallel downloads, use <link> instead."
,e.line,e.col,n)})}}),i.addRule({id:"important",name:"Disallow !important",desc:"Be careful when using !important declaration"
,url:"https://github.com/CSSLint/csslint/wiki/Disallow-%21important",browsers:"All"
,init:function(e,t){"use strict";var n=this,r=0;e.addListener("property",function(
e){e.important===!0&&(r++,t.report("Use of !important",e.line,e.col,n))}),e.addListener
("endstylesheet",function(){t.stat("important",r),r>=10&&t.rollupWarn("Too many !important declarations ("+
r+"), try to use less than 10 to avoid specificity issues.",n)})}}),i.addRule({id
:"known-properties",name:"Require use of known properties",desc:"Properties should be known (listed in CSS3 specification) or be a vendor-prefixed property."
,url:"https://github.com/CSSLint/csslint/wiki/Require-use-of-known-properties",browsers
:"All",init:function(e,t){"use strict";var n=this;e.addListener("property",function(
e){e.invalid&&t.report(e.invalid.message,e.line,e.col,n)})}}),i.addRule({id:"order-alphabetical"
,name:"Alphabetical order",desc:"Assure properties are in alphabetical order",browsers
:"All",init:function(e,t){"use strict";var n=this,r,i=function(){r=[]},s=function(
e){var i=r.join(","),s=r.sort().join(",");i!==s&&t.report("Rule doesn't have all its properties in alphabetical order."
,e.line,e.col,n)};e.addListener("startrule",i),e.addListener("startfontface",i),
e.addListener("startpage",i),e.addListener("startpagemargin",i),e.addListener("startkeyframerule"
,i),e.addListener("startviewport",i),e.addListener("property",function(e){var t=
e.property.text,n=t.toLowerCase().replace(/^-.*?-/,"");r.push(n)}),e.addListener
("endrule",s),e.addListener("endfontface",s),e.addListener("endpage",s),e.addListener
("endpagemargin",s),e.addListener("endkeyframerule",s),e.addListener("endviewport"
,s)}}),i.addRule({id:"outline-none",name:"Disallow outline: none",desc:"Use of outline: none or outline: 0 should be limited to :focus rules."
,url:"https://github.com/CSSLint/csslint/wiki/Disallow-outline%3Anone",browsers:"All"
,tags:["Accessibility"],init:function(e,t){"use strict";function i(e){e.selectors?
r={line:e.line,col:e.col,selectors:e.selectors,propCount:0,outline:!1}:r=null}function s
(){r&&r.outline&&(r.selectors.toString().toLowerCase().indexOf(":focus")===-1?t.
report("Outlines should only be modified using :focus.",r.line,r.col,n):r.propCount===1&&
t.report("Outlines shouldn't be hidden unless other visual changes are made.",r.
line,r.col,n))}var n=this,r;e.addListener("startrule",i),e.addListener("startfontface"
,i),e.addListener("startpage",i),e.addListener("startpagemargin",i),e.addListener
("startkeyframerule",i),e.addListener("startviewport",i),e.addListener("property"
,function(e){var t=e.property.text.toLowerCase(),n=e.value;r&&(r.propCount++,t==="outline"&&
(n.toString()==="none"||n.toString()==="0")&&(r.outline=!0))}),e.addListener("endrule"
,s),e.addListener("endfontface",s),e.addListener("endpage",s),e.addListener("endpagemargin"
,s),e.addListener("endkeyframerule",s),e.addListener("endviewport",s)}}),i.addRule
({id:"overqualified-elements",name:"Disallow overqualified elements",desc:"Don't use classes or IDs with elements (a.foo or a#foo)."
,url:"https://github.com/CSSLint/csslint/wiki/Disallow-overqualified-elements",browsers
:"All",init:function(e,t){"use strict";var n=this,r={};e.addListener("startrule"
,function(i){var s=i.selectors,o,u,a,f,l,c;for(f=0;f<s.length;f++){o=s[f];for(l=0
;l<o.parts.length;l++){u=o.parts[l];if(u.type===e.SELECTOR_PART_TYPE)for(c=0;c<u
.modifiers.length;c++)a=u.modifiers[c],u.elementName&&a.type==="id"?t.report("Element ("+
u+") is overqualified, just use "+a+" without element name.",u.line,u.col,n):a.type==="class"&&
(r[a]||(r[a]=[]),r[a].push({modifier:a,part:u}))}}}),e.addListener("endstylesheet"
,function(){var e;for(e in r)r.hasOwnProperty(e)&&r[e].length===1&&r[e][0].part.
elementName&&t.report("Element ("+r[e][0].part+") is overqualified, just use "+r
[e][0].modifier+" without element name.",r[e][0].part.line,r[e][0].part.col,n)})
}}),i.addRule({id:"qualified-headings",name:"Disallow qualified headings",desc:"Headings should not be qualified (namespaced)."
,url:"https://github.com/CSSLint/csslint/wiki/Disallow-qualified-headings",browsers
:"All",init:function(e,t){"use strict";var n=this;e.addListener("startrule",function(
r){var i=r.selectors,s,o,u,a;for(u=0;u<i.length;u++){s=i[u];for(a=0;a<s.parts.length
;a++)o=s.parts[a],o.type===e.SELECTOR_PART_TYPE&&o.elementName&&/h[1-6]/.test(o.
elementName.toString())&&a>0&&t.report("Heading ("+o.elementName+") should not be qualified."
,o.line,o.col,n)}})}}),i.addRule({id:"regex-selectors",name:"Disallow selectors that look like regexs"
,desc:"Selectors that look like regular expressions are slow and should be avoided."
,url:"https://github.com/CSSLint/csslint/wiki/Disallow-selectors-that-look-like-regular-expressions"
,browsers:"All",init:function(e,t){"use strict";var n=this;e.addListener("startrule"
,function(r){var i=r.selectors,s,o,u,a,f,l;for(a=0;a<i.length;a++){s=i[a];for(f=0
;f<s.parts.length;f++){o=s.parts[f];if(o.type===e.SELECTOR_PART_TYPE)for(l=0;l<o
.modifiers.length;l++)u=o.modifiers[l],u.type==="attribute"&&/([~\|\^\$\*]=)/.test
(u)&&t.report("Attribute selectors with "+RegExp.$1+" are slow!",u.line,u.col,n)
}}})}}),i.addRule({id:"rules-count",name:"Rules Count",desc:"Track how many rules there are."
,browsers:"All",init:function(e,t){"use strict";var n=0;e.addListener("startrule"
,function(){n++}),e.addListener("endstylesheet",function(){t.stat("rule-count",n
)})}}),i.addRule({id:"selector-max-approaching",name:"Warn when approaching the 4095 selector limit for IE"
,desc:"Will warn when selector count is >= 3800 selectors.",browsers:"IE",init:function(
e,t){"use strict";var n=this,r=0;e.addListener("startrule",function(e){r+=e.selectors
.length}),e.addListener("endstylesheet",function(){r>=3800&&t.report("You have "+
r+" selectors. Internet Explorer supports a maximum of 4095 selectors per stylesheet. Consider refactoring."
,0,0,n)})}}),i.addRule({id:"selector-max",name:"Error when past the 4095 selector limit for IE"
,desc:"Will error when selector count is > 4095.",browsers:"IE",init:function(e,
t){"use strict";var n=this,r=0;e.addListener("startrule",function(e){r+=e.selectors
.length}),e.addListener("endstylesheet",function(){r>4095&&t.report("You have "+
r+" selectors. Internet Explorer supports a maximum of 4095 selectors per stylesheet. Consider refactoring."
,0,0,n)})}}),i.addRule({id:"selector-newline",name:"Disallow new-line characters in selectors"
,desc:"New-line characters in selectors are usually a forgotten comma and not a descendant combinator."
,browsers:"All",init:function(e,t){"use strict";function r(e){var r,i,s,o,u,a,f,
l,c,h,p,d=e.selectors;for(r=0,i=d.length;r<i;r++){s=d[r];for(o=0,a=s.parts.length
;o<a;o++)for(u=o+1;u<a;u++)f=s.parts[o],l=s.parts[u],c=f.type,h=f.line,p=l.line,
c==="descendant"&&p>h&&t.report("newline character found in selector (forgot a comma?)"
,h,d[r].parts[0].col,n)}}var n=this;e.addListener("startrule",r)}}),i.addRule({id
:"shorthand",name:"Require shorthand properties",desc:"Use shorthand properties where possible."
,url:"https://github.com/CSSLint/csslint/wiki/Require-shorthand-properties",browsers
:"All",init:function(e,t){"use strict";function f(){u={}}function l(e){var r,i,s
,o;for(r in a)if(a.hasOwnProperty(r)){o=0;for(i=0,s=a[r].length;i<s;i++)o+=u[a[r
][i]]?1:0;o===a[r].length&&t.report("The properties "+a[r].join(", ")+" can be replaced by "+
r+".",e.line,e.col,n)}}var n=this,r,i,s,o={},u,a={margin:["margin-top","margin-bottom"
,"margin-left","margin-right"],padding:["padding-top","padding-bottom","padding-left"
,"padding-right"]};for(r in a)if(a.hasOwnProperty(r))for(i=0,s=a[r].length;i<s;i++
)o[a[r][i]]=r;e.addListener("startrule",f),e.addListener("startfontface",f),e.addListener
("property",function(e){var t=e.property.toString().toLowerCase();o[t]&&(u[t]=1)
}),e.addListener("endrule",l),e.addListener("endfontface",l)}}),i.addRule({id:"star-property-hack"
,name:"Disallow properties with a star prefix",desc:"Checks for the star property hack (targets IE6/7)"
,url:"https://github.com/CSSLint/csslint/wiki/Disallow-star-hack",browsers:"All"
,init:function(e,t){"use strict";var n=this;e.addListener("property",function(e)
{var r=e.property;r.hack==="*"&&t.report("Property with star prefix found.",e.property
.line,e.property.col,n)})}}),i.addRule({id:"text-indent",name:"Disallow negative text-indent"
,desc:"Checks for text indent less than -99px",url:"https://github.com/CSSLint/csslint/wiki/Disallow-negative-text-indent"
,browsers:"All",init:function(e,t){"use strict";function s(){r=!1,i="inherit"}function o
(){r&&i!=="ltr"&&t.report("Negative text-indent doesn't work well with RTL. If you use text-indent for image replacement explicitly set direction for that item to ltr."
,r.line,r.col,n)}var n=this,r,i;e.addListener("startrule",s),e.addListener("startfontface"
,s),e.addListener("property",function(e){var t=e.property.toString().toLowerCase
(),n=e.value;t==="text-indent"&&n.parts[0].value<-99?r=e.property:t==="direction"&&
n.toString()==="ltr"&&(i="ltr")}),e.addListener("endrule",o),e.addListener("endfontface"
,o)}}),i.addRule({id:"underscore-property-hack",name:"Disallow properties with an underscore prefix"
,desc:"Checks for the underscore property hack (targets IE6)",url:"https://github.com/CSSLint/csslint/wiki/Disallow-underscore-hack"
,browsers:"All",init:function(e,t){"use strict";var n=this;e.addListener("property"
,function(e){var r=e.property;r.hack==="_"&&t.report("Property with underscore prefix found."
,e.property.line,e.property.col,n)})}}),i.addRule({id:"unique-headings",name:"Headings should only be defined once"
,desc:"Headings should be defined only once.",url:"https://github.com/CSSLint/csslint/wiki/Headings-should-only-be-defined-once"
,browsers:"All",init:function(e,t){"use strict";var n=this,r={h1:0,h2:0,h3:0,h4:0
,h5:0,h6:0};e.addListener("startrule",function(e){var i=e.selectors,s,o,u,a,f;for(
a=0;a<i.length;a++){s=i[a],o=s.parts[s.parts.length-1];if(o.elementName&&/(h[1-6])/i
.test(o.elementName.toString())){for(f=0;f<o.modifiers.length;f++)if(o.modifiers
[f].type==="pseudo"){u=!0;break}u||(r[RegExp.$1]++,r[RegExp.$1]>1&&t.report("Heading ("+
o.elementName+") has already been defined.",o.line,o.col,n))}}}),e.addListener("endstylesheet"
,function(){var e,i=[];for(e in r)r.hasOwnProperty(e)&&r[e]>1&&i.push(r[e]+" "+e+"s"
);i.length&&t.rollupWarn("You have "+i.join(", ")+" defined in this stylesheet."
,n)})}}),i.addRule({id:"universal-selector",name:"Disallow universal selector",desc
:"The universal selector (*) is known to be slow.",url:"https://github.com/CSSLint/csslint/wiki/Disallow-universal-selector"
,browsers:"All",init:function(e,t){"use strict";var n=this;e.addListener("startrule"
,function(e){var r=e.selectors,i,s,o;for(o=0;o<r.length;o++)i=r[o],s=i.parts[i.parts
.length-1],s.elementName==="*"&&t.report(n.desc,s.line,s.col,n)})}}),i.addRule({
id:"unqualified-attributes",name:"Disallow unqualified attribute selectors",desc
:"Unqualified attribute selectors are known to be slow.",url:"https://github.com/CSSLint/csslint/wiki/Disallow-unqualified-attribute-selectors"
,browsers:"All",init:function(e,t){"use strict";var n=this;e.addListener("startrule"
,function(r){var i=r.selectors,s=!1,o,u,a,f,l;for(f=0;f<i.length;f++){o=i[f],u=o
.parts[o.parts.length-1];if(u.type===e.SELECTOR_PART_TYPE){for(l=0;l<u.modifiers
.length;l++){a=u.modifiers[l];if(a.type==="class"||a.type==="id"){s=!0;break}}if(!
s)for(l=0;l<u.modifiers.length;l++)a=u.modifiers[l],a.type==="attribute"&&(!u.elementName||
u.elementName==="*")&&t.report(n.desc,u.line,u.col,n)}}})}}),i.addRule({id:"vendor-prefix"
,name:"Require standard property with vendor prefix",desc:"When using a vendor-prefixed property, make sure to include the standard one."
,url:"https://github.com/CSSLint/csslint/wiki/Require-standard-property-with-vendor-prefix"
,browsers:"All",init:function(e,t){"use strict";function o(){r={},i=1}function u
(){var e,i,o,u,a,f=[];for(e in r)s[e]&&f.push({actual:e,needed:s[e]});for(i=0,o=
f.length;i<o;i++)u=f[i].needed,a=f[i].actual,r[u]?r[u][0].pos<r[a][0].pos&&t.report
("Standard property '"+u+"' should come after vendor-prefixed property '"+a+"'."
,r[a][0].name.line,r[a][0].name.col,n):t.report("Missing standard property '"+u+"' to go along with '"+
a+"'.",r[a][0].name.line,r[a][0].name.col,n)}var n=this,r,i,s={"-webkit-border-radius"
:"border-radius","-webkit-border-top-left-radius":"border-top-left-radius","-webkit-border-top-right-radius"
:"border-top-right-radius","-webkit-border-bottom-left-radius":"border-bottom-left-radius"
,"-webkit-border-bottom-right-radius":"border-bottom-right-radius","-o-border-radius"
:"border-radius","-o-border-top-left-radius":"border-top-left-radius","-o-border-top-right-radius"
:"border-top-right-radius","-o-border-bottom-left-radius":"border-bottom-left-radius"
,"-o-border-bottom-right-radius":"border-bottom-right-radius","-moz-border-radius"
:"border-radius","-moz-border-radius-topleft":"border-top-left-radius","-moz-border-radius-topright"
:"border-top-right-radius","-moz-border-radius-bottomleft":"border-bottom-left-radius"
,"-moz-border-radius-bottomright":"border-bottom-right-radius","-moz-column-count"
:"column-count","-webkit-column-count":"column-count","-moz-column-gap":"column-gap"
,"-webkit-column-gap":"column-gap","-moz-column-rule":"column-rule","-webkit-column-rule"
:"column-rule","-moz-column-rule-style":"column-rule-style","-webkit-column-rule-style"
:"column-rule-style","-moz-column-rule-color":"column-rule-color","-webkit-column-rule-color"
:"column-rule-color","-moz-column-rule-width":"column-rule-width","-webkit-column-rule-width"
:"column-rule-width","-moz-column-width":"column-width","-webkit-column-width":"column-width"
,"-webkit-column-span":"column-span","-webkit-columns":"columns","-moz-box-shadow"
:"box-shadow","-webkit-box-shadow":"box-shadow","-moz-transform":"transform","-webkit-transform"
:"transform","-o-transform":"transform","-ms-transform":"transform","-moz-transform-origin"
:"transform-origin","-webkit-transform-origin":"transform-origin","-o-transform-origin"
:"transform-origin","-ms-transform-origin":"transform-origin","-moz-box-sizing":"box-sizing"
,"-webkit-box-sizing":"box-sizing"};e.addListener("startrule",o),e.addListener("startfontface"
,o),e.addListener("startpage",o),e.addListener("startpagemargin",o),e.addListener
("startkeyframerule",o),e.addListener("startviewport",o),e.addListener("property"
,function(e){var t=e.property.text.toLowerCase();r[t]||(r[t]=[]),r[t].push({name
:e.property,value:e.value,pos:i++})}),e.addListener("endrule",u),e.addListener("endfontface"
,u),e.addListener("endpage",u),e.addListener("endpagemargin",u),e.addListener("endkeyframerule"
,u),e.addListener("endviewport",u)}}),i.addRule({id:"zero-units",name:"Disallow units for 0 values"
,desc:"You don't need to specify units when a value is 0.",url:"https://github.com/CSSLint/csslint/wiki/Disallow-units-for-zero-values"
,browsers:"All",init:function(e,t){"use strict";var n=this;e.addListener("property"
,function(e){var r=e.value.parts,i=0,s=r.length;while(i<s)(r[i].units||r[i].type==="percentage"
)&&r[i].value===0&&r[i].type!=="time"&&t.report("Values of 0 shouldn't have units specified."
,r[i].line,r[i].col,n),i++})}}),function(){"use strict";var e=function(e){return!
e||e.constructor!==String?"":e.replace(/["&><]/g,function(e){switch(e){case'"':return"&quot;"
;case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;"}})};i.addFormatter
({id:"checkstyle-xml",name:"Checkstyle XML format",startFormat:function(){return'<?xml version="1.0" encoding="utf-8"?><checkstyle>'
},endFormat:function(){return"</checkstyle>"},readError:function(t,n){return'<file name="'+
e(t)+'"><error line="0" column="0" severty="error" message="'+e(n)+'"></error></file>'
},formatResults:function(t,n){var r=t.messages,s=[],o=function(e){return!!e&&"name"in
e?"net.csslint."+e.name.replace(/\s/g,""):""};return r.length>0&&(s.push('<file name="'+
n+'">'),i.Util.forEach(r,function(t){t.rollup||s.push('<error line="'+t.line+'" column="'+
t.col+'" severity="'+t.type+'"'+' message="'+e(t.message)+'" source="'+o(t.rule)+'"/>'
)}),s.push("</file>")),s.join("")}})}(),i.addFormatter({id:"compact",name:"Compact, 'porcelain' format"
,startFormat:function(){"use strict";return""},endFormat:function(){"use strict"
;return""},formatResults:function(e,t,n){"use strict";var r=e.messages,s="";n=n||
{};var o=function(e){return e.charAt(0).toUpperCase()+e.slice(1)};return r.length===0?
n.quiet?"":t+": Lint Free!":(i.Util.forEach(r,function(e){e.rollup?s+=t+": "+o(e
.type)+" - "+e.message+" ("+e.rule.id+")\n":s+=t+": line "+e.line+", col "+e.col+", "+
o(e.type)+" - "+e.message+" ("+e.rule.id+")\n"}),s)}}),i.addFormatter({id:"csslint-xml"
,name:"CSSLint XML format",startFormat:function(){"use strict";return'<?xml version="1.0" encoding="utf-8"?><csslint>'
},endFormat:function(){"use strict";return"</csslint>"},formatResults:function(e
,t){"use strict";var n=e.messages,r=[],s=function(e){return!e||e.constructor!==String?""
:e.replace(/"/g,"'").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"
)};return n.length>0&&(r.push('<file name="'+t+'">'),i.Util.forEach(n,function(e
){e.rollup?r.push('<issue severity="'+e.type+'" reason="'+s(e.message)+'" evidence="'+
s(e.evidence)+'"/>'):r.push('<issue line="'+e.line+'" char="'+e.col+'" severity="'+
e.type+'"'+' reason="'+s(e.message)+'" evidence="'+s(e.evidence)+'"/>')}),r.push
("</file>")),r.join("")}}),i.addFormatter({id:"json",name:"JSON",startFormat:function(
){"use strict";return this.json=[],""},endFormat:function(){"use strict";var e=""
;return this.json.length>0&&(this.json.length===1?e=JSON.stringify(this.json[0])
:e=JSON.stringify(this.json)),e},formatResults:function(e,t,n){"use strict";return(
e.messages.length>0||!n.quiet)&&this.json.push({filename:t,messages:e.messages,stats
:e.stats}),""}}),i.addFormatter({id:"junit-xml",name:"JUNIT XML format",startFormat
:function(){"use strict";return'<?xml version="1.0" encoding="utf-8"?><testsuites>'
},endFormat:function(){"use strict";return"</testsuites>"},formatResults:function(
e,t){"use strict";var n=e.messages,r=[],i={error:0,failure:0},s=function(e){return!!
e&&"name"in e?"net.csslint."+e.name.replace(/\s/g,""):""},o=function(e){return!e||
e.constructor!==String?"":e.replace(/"/g,"'").replace(/</g,"&lt;").replace(/>/g,"&gt;"
)};return n.length>0&&(n.forEach(function(e){var t=e.type==="warning"?"error":e.
type;e.rollup||(r.push('<testcase time="0" name="'+s(e.rule)+'">'),r.push("<"+t+' message="'+
o(e.message)+'"><![CDATA['+e.line+":"+e.col+":"+o(e.evidence)+"]]></"+t+">"),r.push
("</testcase>"),i[t]+=1)}),r.unshift('<testsuite time="0" tests="'+n.length+'" skipped="0" errors="'+
i.error+'" failures="'+i.failure+'" package="net.csslint" name="'+t+'">'),r.push
("</testsuite>")),r.join("")}}),i.addFormatter({id:"lint-xml",name:"Lint XML format"
,startFormat:function(){"use strict";return'<?xml version="1.0" encoding="utf-8"?><lint>'
},endFormat:function(){"use strict";return"</lint>"},formatResults:function(e,t)
{"use strict";var n=e.messages,r=[],s=function(e){return!e||e.constructor!==String?""
:e.replace(/"/g,"'").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"
)};return n.length>0&&(r.push('<file name="'+t+'">'),i.Util.forEach(n,function(e
){if(e.rollup)r.push('<issue severity="'+e.type+'" reason="'+s(e.message)+'" evidence="'+
s(e.evidence)+'"/>');else{var t="";e.rule&&e.rule.id&&(t='rule="'+s(e.rule.id)+'" '
),r.push("<issue "+t+'line="'+e.line+'" char="'+e.col+'" severity="'+e.type+'"'+' reason="'+
s(e.message)+'" evidence="'+s(e.evidence)+'"/>')}}),r.push("</file>")),r.join(""
)}}),i.addFormatter({id:"text",name:"Plain Text",startFormat:function(){"use strict"
;return""},endFormat:function(){"use strict";return""},formatResults:function(e,
t,n){"use strict";var r=e.messages,s="";n=n||{};if(r.length===0)return n.quiet?""
:"\n\ncsslint: No errors in "+t+".";s="\n\ncsslint: There ",r.length===1?s+="is 1 problem"
:s+="are "+r.length+" problems",s+=" in "+t+".";var o=t.lastIndexOf("/"),u=t;return o===-1&&
(o=t.lastIndexOf("\\")),o>-1&&(u=t.substring(o+1)),i.Util.forEach(r,function(e,t
){s=s+"\n\n"+u,e.rollup?(s+="\n"+(t+1)+": "+e.type,s+="\n"+e.message):(s+="\n"+(
t+1)+": "+e.type+" at line "+e.line+", col "+e.col,s+="\n"+e.message,s+="\n"+e.evidence
)}),s}}),i}()



// init lib jslint
// 2014-07-08T19:15:40Z
// https://github.com/douglascrockford/JSLint/blob/394bf291bfa3881bb9827b9fc7b7d1112d83f313/jslint.js
/* istanbul ignore next */
// jslint.js
// 2014-07-08

// Copyright (c) 2002 Douglas Crockford  (www.JSLint.com)

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// The Software shall be used for Good, not Evil.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// WARNING: JSLint will hurt your feelings.

// JSLINT is a global function. It takes two parameters.

//     var myResult = JSLINT(source, option);

// The first parameter is either a string or an array of strings. If it is a
// string, it will be split on '\n' or '\r'. If it is an array of strings, it
// is assumed that each string represents one line. The source can be a
// JavaScript text or a JSON text.

// The second parameter is an optional object of options that control the
// operation of JSLINT. Most of the options are booleans: They are all
// optional and have a default value of false. One of the options, predef,
// can be an array of names, which will be used to declare global variables,
// or an object whose keys are used as global names, with a boolean value
// that determines if they are assignable.

// If it checks out, JSLINT returns true. Otherwise, it returns false.

// If false, you can inspect JSLINT.errors to find out the problems.
// JSLINT.errors is an array of objects containing these properties:

//  {
//      line      : The line (relative to 0) at which the lint was found
//      character : The character (relative to 0) at which the lint was found
//      reason    : The problem
//      evidence  : The text line in which the problem occurred
//      raw       : The raw message before the details were inserted
//      a         : The first detail
//      b         : The second detail
//      c         : The third detail
//      d         : The fourth detail
//  }

// If a stopping error was found, a null will be the last element of the
// JSLINT.errors array. A stopping error means that JSLint was not confident
// enough to continue. It does not necessarily mean that the error was
// especially heinous.

// You can request a data structure that contains JSLint's results.

//     var myData = JSLINT.data();

// It returns a structure with this form:

//     {
//         errors: [
//             {
//                 line: NUMBER,
//                 character: NUMBER,
//                 reason: STRING,
//                 evidence: STRING
//             }
//         ],
//         functions: [
//             {
//                 name: STRING,
//                 line: NUMBER,
//                 level: NUMBER,
//                 parameter: [
//                     STRING
//                 ],
//                 var: [
//                     STRING
//                 ],
//                 exception: [
//                     STRING
//                 ],
//                 closure: [
//                     STRING
//                 ],
//                 outer: [
//                     STRING
//                 ],
//                 global: [
//                     STRING
//                 ],
//                 label: [
//                     STRING
//                 ]
//             }
//         ],
//         global: [
//             STRING
//         ],
//         member: {
//             STRING: NUMBER
//         },
//         json: BOOLEAN
//     }

// You can request a Function Report, which shows all of the functions
// and the parameters and vars that they use. This can be used to find
// implied global variables and other problems. The report is in HTML and
// can be inserted into an HTML <body>. It should be given the result of the
// JSLINT.data function.

//     var myReport = JSLINT.report(data);

// You can request an HTML error report.

//     var myErrorReport = JSLINT.error_report(data);

// You can obtain an object containing all of the properties found in the
// file. JSLINT.property contains an object containing a key for each
// property used in the program, the value being the number of times that
// property name was used in the file.

// You can request a properties report, which produces a list of the program's
// properties in the form of a /*properties*/ declaration.

//      var myPropertyReport = JSLINT.properties_report(JSLINT.property);

// You can obtain the parse tree that JSLint constructed while parsing. The
// latest tree is kept in JSLINT.tree. A nice stringification can be produced
// with

//     JSON.stringify(JSLINT.tree, [
//         'string',  'arity', 'name',  'first',
//         'second', 'third', 'block', 'else'
//     ], 4));

// You can request a context coloring table. It contains information that can be
// applied to the file that was analyzed. Context coloring colors functions
// based on their nesting level, and variables on the color of the functions
// in which they are defined.

//      var myColorization = JSLINT.color(data);

// It returns an array containing objects of this form:

//      {
//          from: COLUMN,
//          thru: COLUMN,
//          line: ROW,
//          level: 0 or higher
//      }

// JSLint provides three inline directives. They look like slashstar comments,
// and allow for setting options, declaring global variables, and establishing a
// set of allowed property names.

// These directives respect function scope.

// The jslint directive is a special comment that can set one or more options.
// For example:

/*jslint
    evil: true, nomen: true, regexp: true, todo: true
*/

// The current option set is

//     ass        true, if assignment expressions should be allowed
//     bitwise    true, if bitwise operators should be allowed
//     browser    true, if the standard browser globals should be predefined
//     closure    true, if Google Closure idioms should be tolerated
//     continue   true, if the continuation statement should be tolerated
//     debug      true, if debugger statements should be allowed
//     devel      true, if logging should be allowed (console, alert, etc.)
//     eqeq       true, if == should be allowed
//     evil       true, if eval should be allowed
//     forin      true, if for in statements need not filter
//     indent     the indentation factor
//     maxerr     the maximum number of errors to allow
//     maxlen     the maximum length of a source line
//     newcap     true, if constructor names capitalization is ignored
//     node       true, if Node.js globals should be predefined
//     nomen      true, if names may have dangling _
//     passfail   true, if the scan should stop on first error
//     plusplus   true, if increment/decrement should be allowed
//     properties true, if all property names must be declared with /*properties*/
//     regexp     true, if the . should be allowed in regexp literals
//     rhino      true, if the Rhino environment globals should be predefined
//     unparam    true, if unused parameters should be tolerated
//     sloppy     true, if the 'use strict'; pragma is optional
//     stupid     true, if really stupid practices are tolerated
//     sub        true, if all forms of subscript notation are tolerated
//     todo       true, if TODO comments are tolerated
//     vars       true, if multiple var statements per function should be allowed
//     white      true, if sloppy whitespace is tolerated

// The properties directive declares an exclusive list of property names.
// Any properties named in the program that are not in the list will
// produce a warning.

// For example:

/*properties
    '\b', '\t', '\n', '\f', '\r', '!', '!=', '!==', '"', '%', '\'', '(begin)',
    '(error)', '*', '+', '-', '/', '<', '<=', '==', '===', '>', '>=', '\\', a,
    a_label, a_scope, already_defined, and, apply, arguments, arity, ass,
    assign, assignment_expression, assignment_function_expression, at, avoid_a,
    b, bad_assignment, bad_constructor, bad_in_a, bad_invocation, bad_new,
    bad_number, bad_operand, bad_wrap, bitwise, block, break, breakage, browser,
    c, call, charAt, charCodeAt, character, closure, code, color, combine_var,
    comments, conditional_assignment, confusing_a, confusing_regexp,
    constructor_name_a, continue, control_a, couch, create, d, dangling_a, data,
    dead, debug, deleted, devel, disrupt, duplicate_a, edge, edition, elif,
    else, empty_block, empty_case, empty_class, entityify, eqeq, error_report,
    errors, evidence, evil, exception, exec, expected_a_at_b_c, expected_a_b,
    expected_a_b_from_c_d, expected_id_a, expected_identifier_a,
    expected_identifier_a_reserved, expected_number_a, expected_operator_a,
    expected_positive_a, expected_small_a, expected_space_a_b,
    expected_string_a, f, first, flag, floor, forEach, for_if, forin, from,
    fromCharCode, fud, function, function_block, function_eval, function_loop,
    function_statement, function_strict, functions, global, hasOwnProperty, id,
    identifier, identifier_function, immed, implied_evil, indent, indexOf,
    infix_in, init, insecure_a, isAlpha, isArray, isDigit, isNaN, join, jslint,
    json, keys, kind, label, labeled, lbp, leading_decimal_a, led, left, length,
    level, line, loopage, master, match, maxerr, maxlen, message, missing_a,
    missing_a_after_b, missing_property, missing_space_a_b, missing_use_strict,
    mode, move_invocation, move_var, n, name, name_function, nested_comment,
    newcap, node, nomen, not, not_a_constructor, not_a_defined, not_a_function,
    not_a_label, not_a_scope, not_greater, nud, number, octal_a, open, outer,
    parameter, parameter_a_get_b, parameter_arguments_a, parameter_set_a,
    params, paren, passfail, plusplus, pop, postscript, predef, properties,
    properties_report, property, prototype, push, quote, r, radix, raw,
    read_only, reason, redefinition_a_b, regexp, relation, replace, report,
    reserved, reserved_a, rhino, right, scanned_a_b, scope, search, second,
    shift, slash_equal, slice, sloppy, sort, split, statement, statement_block,
    stop, stopping, strange_loop, strict, string, stupid, sub, subscript,
    substr, supplant, sync_a, t, tag_a_in_b, test, third, thru, toString, todo,
    todo_comment, token, tokens, too_long, too_many, trailing_decimal_a, tree,
    unclosed, unclosed_comment, unclosed_regexp, unescaped_a, unexpected_a,
    unexpected_char_a, unexpected_comment, unexpected_label_a,
    unexpected_property_a, unexpected_space_a_b, unexpected_typeof_a,
    uninitialized_a, unnecessary_else, unnecessary_initialize, unnecessary_use,
    unparam, unreachable_a_b, unsafe, unused_a, url, use_array, use_braces,
    use_nested_if, use_object, use_or, use_param, use_spaces, used,
    used_before_a, var, var_a_not, var_loop, vars, varstatement, warn, warning,
    was, weird_assignment, weird_condition, weird_new, weird_program,
    weird_relation, weird_ternary, white, wrap, wrap_immediate, wrap_regexp,
    write_is_wrong, writeable
*/

// The global directive is used to declare global variables that can
// be accessed by the program. If a declaration is true, then the variable
// is writeable. Otherwise, it is read-only.

// We build the application inside a function so that we produce only a single
// global variable. That function will be invoked immediately, and its return
// value is the JSLINT function itself. That function is also an object that
// can contain data and other functions.

var JSLINT = (function () {
    'use strict';

    function array_to_object(array, value) {

// Make an object from an array of keys and a common value.

        var i, length = array.length, object = Object.create(null);
        for (i = 0; i < length; i += 1) {
            object[array[i]] = value;
        }
        return object;
    }


    var allowed_option = {
            ass       : true,
            bitwise   : true,
            browser   : true,
            closure   : true,
            continue  : true,
            couch     : true,
            debug     : true,
            devel     : true,
            eqeq      : true,
            evil      : true,
            forin     : true,
            indent    :   10,
            maxerr    : 1000,
            maxlen    :  256,
            newcap    : true,
            node      : true,
            nomen     : true,
            passfail  : true,
            plusplus  : true,
            properties: true,
            regexp    : true,
            rhino     : true,
            unparam   : true,
            sloppy    : true,
            stupid    : true,
            sub       : true,
            todo      : true,
            vars      : true,
            white     : true
        },
        anonname,       // The guessed name for anonymous functions.

// These are operators that should not be used with the ! operator.

        bang = {
            '<'  : true,
            '<=' : true,
            '==' : true,
            '===': true,
            '!==': true,
            '!=' : true,
            '>'  : true,
            '>=' : true,
            '+'  : true,
            '-'  : true,
            '*'  : true,
            '/'  : true,
            '%'  : true
        },
        begin,          // The root token
        block_var,     // vars defined in the current block

// browser contains a set of global names that are commonly provided by a
// web browser environment.

        browser = array_to_object([
            'clearInterval', 'clearTimeout', 'document', 'event', 'FormData',
            'frames', 'history', 'Image', 'localStorage', 'location', 'name',
            'navigator', 'Option', 'parent', 'screen', 'sessionStorage',
            // 'setInterval', 'setTimeout', 'Storage', 'window', 'XMLHttpRequest'
            'setInterval', 'setTimeout', 'Storage', 'window', 'XMLHttpRequest',
            'ArrayBuffer', 'Uint8Array'
        ], false),

// bundle contains the text messages.

        bundle = {
            a_label: "'{a}' is a statement label.",
            a_scope: "'{a}' used out of scope.",
            already_defined: "'{a}' is already defined.",
            and: "The '&&' subexpression should be wrapped in parens.",
            assignment_expression: "Unexpected assignment expression.",
            assignment_function_expression: "Expected an assignment or " +
                "function call and instead saw an expression.",
            avoid_a: "Avoid '{a}'.",
            bad_assignment: "Bad assignment.",
            bad_constructor: "Bad constructor.",
            bad_in_a: "Bad for in variable '{a}'.",
            bad_invocation: "Bad invocation.",
            bad_new: "Do not use 'new' for side effects.",
            bad_number: "Bad number '{a}'.",
            bad_operand: "Bad operand.",
            bad_wrap: "Do not wrap function literals in parens unless they " +
                "are to be immediately invoked.",
            combine_var: "Combine this with the previous 'var' statement.",
            conditional_assignment: "Expected a conditional expression and " +
                "instead saw an assignment.",
            confusing_a: "Confusing use of '{a}'.",
            confusing_regexp: "Confusing regular expression.",
            constructor_name_a: "A constructor name '{a}' should start with " +
                "an uppercase letter.",
            control_a: "Unexpected control character '{a}'.",
            dangling_a: "Unexpected dangling '_' in '{a}'.",
            deleted: "Only properties should be deleted.",
            duplicate_a: "Duplicate '{a}'.",
            empty_block: "Empty block.",
            empty_case: "Empty case.",
            empty_class: "Empty class.",
            evil: "eval is evil.",
            expected_a_b: "Expected '{a}' and instead saw '{b}'.",
            expected_a_b_from_c_d: "Expected '{a}' to match '{b}' from line " +
                "{c} and instead saw '{d}'.",
            expected_a_at_b_c: "Expected '{a}' at column {b}, not column {c}.",
            expected_id_a: "Expected an id, and instead saw #{a}.",
            expected_identifier_a: "Expected an identifier and instead saw '{a}'.",
            expected_identifier_a_reserved: "Expected an identifier and " +
                "instead saw '{a}' (a reserved word).",
            expected_number_a: "Expected a number and instead saw '{a}'.",
            expected_operator_a: "Expected an operator and instead saw '{a}'.",
            expected_positive_a: "Expected a positive number and instead saw '{a}'",
            expected_small_a: "Expected a small positive integer and instead saw '{a}'",
            expected_space_a_b: "Expected exactly one space between '{a}' and '{b}'.",
            expected_string_a: "Expected a string and instead saw '{a}'.",
            for_if: "The body of a for in should be wrapped in an if " +
                "statement to filter unwanted properties from the prototype.",
            function_block: "Function statements should not be placed in blocks." +
                "Use a function expression or move the statement to the top of " +
                "the outer function.",
            function_eval: "The Function constructor is eval.",
            function_loop: "Don't make functions within a loop.",
            function_statement: "Function statements are not invocable. " +
                "Wrap the whole function invocation in parens.",
            function_strict: "Use the function form of 'use strict'.",
            identifier_function: "Expected an identifier in an assignment " +
                "and instead saw a function invocation.",
            implied_evil: "Implied eval is evil. Pass a function instead of a string.",
            infix_in: "Unexpected 'in'. Compare with undefined, or use the " +
                "hasOwnProperty method instead.",
            insecure_a: "Insecure '{a}'.",
            isNaN: "Use the isNaN function to compare with NaN.",
            leading_decimal_a: "A leading decimal point can be confused with a dot: '.{a}'.",
            missing_a: "Missing '{a}'.",
            missing_a_after_b: "Missing '{a}' after '{b}'.",
            missing_property: "Missing property name.",
            missing_space_a_b: "Missing space between '{a}' and '{b}'.",
            missing_use_strict: "Missing 'use strict' statement.",
            move_invocation: "Move the invocation into the parens that " +
                "contain the function.",
            move_var: "Move 'var' declarations to the top of the function.",
            name_function: "Missing name in function statement.",
            nested_comment: "Nested comment.",
            not: "Nested not.",
            not_a_constructor: "Do not use {a} as a constructor.",
            not_a_defined: "'{a}' has not been fully defined yet.",
            not_a_function: "'{a}' is not a function.",
            not_a_label: "'{a}' is not a label.",
            not_a_scope: "'{a}' is out of scope.",
            not_greater: "'{a}' should not be greater than '{b}'.",
            octal_a: "Don't use octal: '{a}'. Use '\\u....' instead.",
            parameter_arguments_a: "Do not mutate parameter '{a}' when using 'arguments'.",
            parameter_a_get_b: "Unexpected parameter '{a}' in get {b} function.",
            parameter_set_a: "Expected parameter (value) in set {a} function.",
            radix: "Missing radix parameter.",
            read_only: "Read only.",
            redefinition_a_b: "Redefinition of '{a}' from line {b}.",
            reserved_a: "Reserved name '{a}'.",
            scanned_a_b: "{a} ({b}% scanned).",
            slash_equal: "A regular expression literal can be confused with '/='.",
            statement_block: "Expected to see a statement and instead saw a block.",
            stopping: "Stopping.",
            strange_loop: "Strange loop.",
            strict: "Strict violation.",
            subscript: "['{a}'] is better written in dot notation.",
            sync_a: "Unexpected sync method: '{a}'.",
            tag_a_in_b: "A '<{a}>' must be within '<{b}>'.",
            todo_comment: "Unexpected TODO comment.",
            too_long: "Line too long.",
            too_many: "Too many errors.",
            trailing_decimal_a: "A trailing decimal point can be confused " +
                "with a dot: '.{a}'.",
            unclosed: "Unclosed string.",
            unclosed_comment: "Unclosed comment.",
            unclosed_regexp: "Unclosed regular expression.",
            unescaped_a: "Unescaped '{a}'.",
            unexpected_a: "Unexpected '{a}'.",
            unexpected_char_a: "Unexpected character '{a}'.",
            unexpected_comment: "Unexpected comment.",
            unexpected_label_a: "Unexpected label '{a}'.",
            unexpected_property_a: "Unexpected /*property*/ '{a}'.",
            unexpected_space_a_b: "Unexpected space between '{a}' and '{b}'.",
            unexpected_typeof_a: "Unexpected 'typeof'. " +
                "Use '===' to compare directly with {a}.",
            uninitialized_a: "Uninitialized '{a}'.",
            unnecessary_else: "Unnecessary 'else' after disruption.",
            unnecessary_initialize: "It is not necessary to initialize '{a}' " +
                "to 'undefined'.",
            unnecessary_use: "Unnecessary 'use strict'.",
            unreachable_a_b: "Unreachable '{a}' after '{b}'.",
            unsafe: "Unsafe character.",
            unused_a: "Unused '{a}'.",
            url: "JavaScript URL.",
            use_array: "Use the array literal notation [].",
            use_braces: "Spaces are hard to count. Use {{a}}.",
            use_nested_if: "Expected 'else { if' and instead saw 'else if'.",
            use_object: "Use the object literal notation {} or Object.create(null).",
            use_or: "Use the || operator.",
            use_param: "Use a named parameter.",
            use_spaces: "Use spaces, not tabs.",
            used_before_a: "'{a}' was used before it was defined.",
            var_a_not: "Variable {a} was not declared correctly.",
            var_loop: "Don't declare variables in a loop.",
            weird_assignment: "Weird assignment.",
            weird_condition: "Weird condition.",
            weird_new: "Weird construction. Delete 'new'.",
            weird_program: "Weird program.",
            weird_relation: "Weird relation.",
            weird_ternary: "Weird ternary.",
            wrap_immediate: "Wrap an immediate function invocation in " +
                "parentheses to assist the reader in understanding that the " +
                "expression is the result of a function, and not the " +
                "function itself.",
            wrap_regexp: "Wrap the /regexp/ literal in parens to " +
                "disambiguate the slash operator.",
            write_is_wrong: "document.write can be a form of eval."
        },
        closure = array_to_object([
            'goog'
        ], false),
        comments,
        comments_off,
        couch = array_to_object([
            'emit', 'getRow', 'isArray', 'log', 'provides', 'registerType',
            'require', 'send', 'start', 'sum', 'toJSON'
        ], false),

        descapes = {
            'b': '\b',
            't': '\t',
            'n': '\n',
            'f': '\f',
            'r': '\r',
            '"': '"',
            '/': '/',
            '\\': '\\',
            '!': '!'
        },

        devel = array_to_object([
            'alert', 'confirm', 'console', 'Debug', 'opera', 'prompt', 'WSH'
        ], false),
        directive,
        escapes = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '\'': '\\\'',
            '"' : '\\"',
            '/' : '\\/',
            '\\': '\\\\'
        },

        funct,          // The current function

        functions,      // All of the functions
        global_funct,   // The global body
        global_scope,   // The global scope
        in_block,       // Where function statements are not allowed
        indent,
        itself,         // JSLINT itself
        json_mode,
        lex,            // the tokenizer
        lines,
        lookahead,
        node = array_to_object([
            'Buffer', 'clearImmediate', 'clearInterval', 'clearTimeout',
            'console', 'exports', 'global', 'module', 'process',
            'require', 'setImmediate', 'setInterval', 'setTimeout',
            // '__dirname', '__filename'
            '__dirname', '__filename',
            'ArrayBuffer', 'Uint8Array'
        ], false),
        node_js,
        numbery = array_to_object(['indexOf', 'lastIndexOf', 'search'], true),
        next_token,
        option,
        predefined,     // Global variables defined by option
        prereg,
        prev_token,
        property,
        protosymbol,
        // regexp_flag = array_to_object(['g', 'i', 'm'], true),
        regexp_flag = array_to_object(['g', 'i', 'm', 'u', 'y'], true),
        return_this = function return_this() {
            return this;
        },
        rhino = array_to_object([
            'defineClass', 'deserialize', 'gc', 'help', 'load', 'loadClass',
            'print', 'quit', 'readFile', 'readUrl', 'runCommand', 'seal',
            'serialize', 'spawn', 'sync', 'toint32', 'version'
        ], false),

        scope,      // An object containing an object for each variable in scope
        semicolon_coda = array_to_object([';', '"', '\'', ')'], true),

// standard contains the global names that are provided by the
// ECMAScript standard.

        standard = array_to_object([
            'Array', 'Boolean', 'Date', 'decodeURI', 'decodeURIComponent',
            'encodeURI', 'encodeURIComponent', 'Error', 'eval', 'EvalError',
            'Function', 'isFinite', 'isNaN', 'JSON', 'Map', 'Math', 'Number',
            'Object', 'parseInt', 'parseFloat', 'Promise', 'Proxy',
            'RangeError', 'ReferenceError', 'Reflect', 'RegExp', 'Set',
            'String', 'Symbol', 'SyntaxError', 'System', 'TypeError',
            'URIError', 'WeakMap', 'WeakSet'
        ], false),

        strict_mode,
        syntax = Object.create(null),
        token,
        tokens,
        var_mode,
        warnings,

// Regular expressions. Some of these are stupidly long.

// carriage return, carriage return linefeed, or linefeed
        crlfx = /\r\n?|\n/,
// unsafe characters that are silently deleted by one or more browsers
        cx = /[\u0000-\u0008\u000a-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/,
// identifier
        ix = /^([a-zA-Z_$][a-zA-Z0-9_$]*)$/,
// javascript url
        jx = /^(?:javascript|jscript|ecmascript|vbscript)\s*:/i,
// star slash
        lx = /\*\/|\/\*/,
// characters in strings that need escapement
        nx = /[\u0000-\u001f'\\\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
// sync
        syx = /Sync$/,
// comment todo
        tox = /^\W*to\s*do(?:\W|$)/i,
// token
        // tx = /^\s*([(){}\[\]\?.,:;'"~#@`]|={1,3}|\/(\*(jslint|properties|property|members?|globals?)?|=|\/)?|\*[\/=]?|\+(?:=|\++)?|-(?:=|-+)?|[\^%]=?|&[&=]?|\|[|=]?|>{1,3}=?|<(?:[\/=!]|\!(\[|--)?|<=?)?|\!(\!|==?)?|[a-zA-Z_$][a-zA-Z0-9_$]*|[0-9]+(?:[xX][0-9a-fA-F]+|\.[0-9]*)?(?:[eE][+\-]?[0-9]+)?)/;
        tx = /^\s*([(){}\[\]\?.,:;'"~#@`]|={1,3}|\/(\*(jslint|properties|property|members?|globals?)?|=|\/)?|\*[\/=]?|\+(?:=|\++)?|-(?:=|-+)?|[\^%]=?|&[&=]?|\|[|=]?|>{1,3}=?|<(?:[\/=!]|\!(\[|--)?|<=?)?|\!(\!|==?)?|[a-zA-Z_$][a-zA-Z0-9_$]*|[0-9]+(?:[xX][0-9a-fA-F]+|\.[0-9]*)?(?:[eE][+\-]?[0-9]+)?n?)/; // BigInt


    if (typeof String.prototype.entityify !== 'function') {
        String.prototype.entityify = function () {
            return this
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
        };
    }

    if (typeof String.prototype.isAlpha !== 'function') {
        String.prototype.isAlpha = function () {
            return (this >= 'a' && this <= 'z\uffff') ||
                (this >= 'A' && this <= 'Z\uffff');
        };
    }

    if (typeof String.prototype.isDigit !== 'function') {
        String.prototype.isDigit = function () {
            return (this >= '0' && this <= '9');
        };
    }

    if (typeof String.prototype.supplant !== 'function') {
        String.prototype.supplant = function (o) {
            return this.replace(/\{([^{}]*)\}/g, function (a, b) {
                var replacement = o[b];
                return typeof replacement === 'string' ||
                    typeof replacement === 'number' ? replacement : a;
            });
        };
    }


    function sanitize(a) {

//  Escapify a troublesome character.

        return escapes[a] ||
            '\\u' + ('0000' + a.charCodeAt().toString(16)).slice(-4);
    }


    function add_to_predefined(group) {
        Object.keys(group).forEach(function (name) {
            predefined[name] = group[name];
        });
    }


    function assume() {
        if (option.browser) {
            add_to_predefined(browser);
            option.browser = false;
        }
        if (option.closure) {
            add_to_predefined(closure);
        }
        if (option.couch) {
            add_to_predefined(couch);
            option.couch = false;
        }
        if (option.devel) {
            add_to_predefined(devel);
            option.devel = false;
        }
        if (option.node) {
            add_to_predefined(node);
            option.node = false;
            node_js = true;
        }
        if (option.rhino) {
            add_to_predefined(rhino);
            option.rhino = false;
        }
    }


// Produce an error warning.

    function artifact(tok) {
        if (!tok) {
            tok = next_token;
        }
        return tok.id === '(number)' ? tok.number : tok.string;
    }

    function quit(message, line, character) {
        throw {
            name: 'JSLintError',
            line: line,
            character: character,
            message: bundle.scanned_a_b.supplant({
                a: bundle[message] || message,
                b: Math.floor((line / lines.length) * 100)
            })
        };
    }

    function warn(code, line, character, a, b, c, d) {
        var warning = {         // ~~
            id: '(error)',
            raw: bundle[code] || code,
            code: code,
            evidence: lines[line - 1] || '',
            line: line,
            character: character,
            a: a || artifact(this),
            b: b,
            c: c,
            d: d
        };
        warning.reason = warning.raw.supplant(warning);
        itself.errors.push(warning);
        if (option.passfail) {
            quit('stopping', line, character);
        }
        warnings += 1;
        if (warnings >= option.maxerr) {
            quit('too_many', line, character);
        }
        return warning;
    }

    function stop(code, line, character, a, b, c, d) {
        var warning = warn(code, line, character, a, b, c, d);
        quit('stopping', warning.line, warning.character);
    }

    function expected_at(at) {
        if (!option.white && next_token.from !== at) {
            next_token.warn('expected_a_at_b_c', '', at, next_token.from);
        }
    }

// lexical analysis and token construction

    lex = (function lex() {
        var character, c, from, length, line, pos, source_row;

// Private lex methods

        function next_line() {
            var at;
            character = 1;
            source_row = lines[line];
            line += 1;
            if (source_row === undefined) {
                return false;
            }
            at = source_row.search(/\t/);
            if (at >= 0) {
                if (option.white) {
                    source_row = source_row.replace(/\t/g, ' ');
                } else {
                    warn('use_spaces', line, at + 1);
                }
            }
            at = source_row.search(cx);
            if (at >= 0) {
                warn('unsafe', line, at);
            }
            if (option.maxlen && option.maxlen < source_row.length) {
                warn('too_long', line, source_row.length);
            }
            return true;
        }

// Produce a token object.  The token inherits from a syntax symbol.

        function it(type, value) {
            var id, the_token;
            if (type === '(string)') {
                if (jx.test(value)) {
                    warn('url', line, from);
                }
            }
            the_token = Object.create(syntax[(
                type === '(punctuator)' || (type === '(identifier)' &&
                        Object.prototype.hasOwnProperty.call(syntax, value))
                    ? value
                    : type
            )] || syntax['(error)']);
            if (type === '(identifier)') {
                the_token.identifier = true;
                if (value === '__iterator__' || value === '__proto__') {
                    stop('reserved_a', line, from, value);
                } else if (!option.nomen &&
                        (value.charAt(0) === '_' ||
                        value.charAt(value.length - 1) === '_')) {
                    warn('dangling_a', line, from, value);
                }
            }
            if (type === '(number)') {
                the_token.number = +value;
            } else if (value !== undefined) {
                the_token.string = String(value);
            }
            the_token.line = line;
            the_token.from = from;
            the_token.thru = character;
            if (comments.length) {
                the_token.comments = comments;
                comments = [];
            }
            id = the_token.id;
            prereg = id && (
                ('(,=:[!&|?{};~+-*%^<>'.indexOf(id.charAt(id.length - 1)) >= 0) ||
                id === 'return' || id === 'case'
            );
            return the_token;
        }

        function match(x) {
            var exec = x.exec(source_row), first;
            if (exec) {
                length = exec[0].length;
                first = exec[1];
                c = first.charAt(0);
                source_row = source_row.slice(length);
                from = character + length - first.length;
                character += length;
                return first;
            }
            for (;;) {
                if (!source_row) {
                    if (!option.white) {
                        warn('unexpected_char_a', line, character - 1, '(space)');
                    }
                    return;
                }
                c = source_row.charAt(0);
                if (c !== ' ') {
                    break;
                }
                source_row = source_row.slice(1);
                character += 1;
            }
            stop('unexpected_char_a', line, character, c);

        }

        function string(x) {
            var ch, at = 0, r = '', result;

            function hex(n) {
                var i = parseInt(source_row.substr(at + 1, n), 16);
                at += n;
                if (i >= 32 && i <= 126 &&
                        i !== 34 && i !== 92 && i !== 39) {
                    warn('unexpected_a', line, character, '\\');
                }
                character += n;
                ch = String.fromCharCode(i);
            }

            if (json_mode && x !== '"') {
                warn('expected_a_b', line, character, '"', x);
            }

            for (;;) {
                while (at >= source_row.length) {
                    at = 0;
                    if (!next_line()) {
                        stop('unclosed', line - 1, from);
                    }
                }
                ch = source_row.charAt(at);
                if (ch === x) {
                    character += 1;
                    source_row = source_row.slice(at + 1);
                    result = it('(string)', r);
                    result.quote = x;
                    return result;
                }
                if (ch < ' ') {
                    if (ch === '\n' || ch === '\r') {
                        break;
                    }
                    warn('control_a', line, character + at,
                        source_row.slice(0, at));
                } else if (ch === '\\') {
                    at += 1;
                    character += 1;
                    ch = source_row.charAt(at);
                    switch (ch) {
                    case '':
                        warn('unexpected_a', line, character, '\\');
                        next_line();
                        at = -1;
                        break;
                    case '\'':
                        if (json_mode) {
                            warn('unexpected_a', line, character, '\\\'');
                        }
                        break;
                    case 'u':
                        hex(4);
                        break;
                    case 'v':
                        if (json_mode) {
                            warn('unexpected_a', line, character, '\\v');
                        }
                        ch = '\v';
                        break;
                    case 'x':
                        if (json_mode) {
                            warn('unexpected_a', line, character, '\\x');
                        }
                        hex(2);
                        break;
                    default:
                        if (typeof descapes[ch] !== 'string') {
                            warn(ch >= '0' && ch <= '7' ? 'octal_a' : 'unexpected_a',
                                line, character, '\\' + ch);
                        } else {
                            ch = descapes[ch];
                        }
                    }
                }
                r += ch;
                character += 1;
                at += 1;
            }
        }

        function number(snippet) {
            var digit;
            if (source_row.charAt(0).isAlpha()) {
                warn('expected_space_a_b',
                    line, character, c, source_row.charAt(0));
            }
            if (c === '0') {
                digit = snippet.charAt(1);
                if (digit.isDigit()) {
                    if (token.id !== '.') {
                        warn('unexpected_a', line, character, snippet);
                    }
                } else if (json_mode && (digit === 'x' || digit === 'X')) {
                    warn('unexpected_a', line, character, '0x');
                }
            }
            if (snippet.slice(snippet.length - 1) === '.') {
                warn('trailing_decimal_a', line, character, snippet);
            }
            digit = +snippet;
            // if (!isFinite(digit)) {
            if (!isFinite(digit) && !(/^[0-9]+n$/).test(snippet)) {
                warn('bad_number', line, character, snippet);
            }
            snippet = digit;
            return it('(number)', snippet);
        }

        function comment(snippet, type) {
            if (comments_off) {
                warn('unexpected_comment', line, character);
            } else if (!option.todo && tox.test(snippet)) {
                warn('todo_comment', line, character);
            }
            comments.push({
                id: type,
                from: from,
                thru: character,
                line: line,
                string: snippet
            });
        }

        function regexp() {
            var at = 0,
                b,
                bit,
                depth = 0,
                flag = '',
                high,
                letter,
                low,
                potential,
                quote,
                result;
            for (;;) {
                b = true;
                c = source_row.charAt(at);
                at += 1;
                switch (c) {
                case '':
                    stop('unclosed_regexp', line, from);
                    return;
                case '/':
                    if (depth > 0) {
                        warn('unescaped_a', line, from + at, '/');
                    }
                    c = source_row.slice(0, at - 1);
                    potential = Object.create(regexp_flag);
                    for (;;) {
                        letter = source_row.charAt(at);
                        if (potential[letter] !== true) {
                            break;
                        }
                        potential[letter] = false;
                        at += 1;
                        flag += letter;
                    }
                    if (source_row.charAt(at).isAlpha()) {
                        stop('unexpected_a', line, from, source_row.charAt(at));
                    }
                    character += at;
                    source_row = source_row.slice(at);
                    quote = source_row.charAt(0);
                    if (quote === '/' || quote === '*') {
                        stop('confusing_regexp', line, from);
                    }
                    result = it('(regexp)', c);
                    result.flag = flag;
                    return result;
                case '\\':
                    c = source_row.charAt(at);
                    if (c < ' ') {
                        warn('control_a', line, from + at, String(c));
                    } else if (c === '<') {
                        warn('unexpected_a', line, from + at, '\\');
                    }
                    at += 1;
                    break;
                case '(':
                    depth += 1;
                    b = false;
                    if (source_row.charAt(at) === '?') {
                        at += 1;
                        switch (source_row.charAt(at)) {
                        case ':':
                        case '=':
                        case '!':
                            at += 1;
                            break;
                        default:
                            warn('expected_a_b', line, from + at,
                                ':', source_row.charAt(at));
                        }
                    }
                    break;
                case '|':
                    b = false;
                    break;
                case ')':
                    if (depth === 0) {
                        warn('unescaped_a', line, from + at, ')');
                    } else {
                        depth -= 1;
                    }
                    break;
                case ' ':
                    pos = 1;
                    while (source_row.charAt(at) === ' ') {
                        at += 1;
                        pos += 1;
                    }
                    if (pos > 1) {
                        warn('use_braces', line, from + at, pos);
                    }
                    break;
                case '[':
                    c = source_row.charAt(at);
                    if (c === '^') {
                        at += 1;
                        if (!option.regexp) {
                            warn('insecure_a', line, from + at, c);
                        } else if (source_row.charAt(at) === ']') {
                            stop('unescaped_a', line, from + at, '^');
                        }
                    }
                    bit = false;
                    if (c === ']') {
                        warn('empty_class', line, from + at - 1);
                        bit = true;
                    }
klass:              do {
                        c = source_row.charAt(at);
                        at += 1;
                        switch (c) {
                        case '[':
                        case '^':
                            warn('unescaped_a', line, from + at, c);
                            bit = true;
                            break;
                        case '-':
                            if (bit) {
                                bit = false;
                            } else {
                                warn('unescaped_a', line, from + at, '-');
                                bit = true;
                            }
                            break;
                        case ']':
                            if (!bit) {
                                warn('unescaped_a', line, from + at - 1, '-');
                            }
                            break klass;
                        case '\\':
                            c = source_row.charAt(at);
                            if (c < ' ') {
                                warn('control_a', line, from + at, String(c));
                            } else if (c === '<') {
                                warn('unexpected_a', line, from + at, '\\');
                            }
                            at += 1;
                            bit = true;
                            break;
                        case '/':
                            warn('unescaped_a', line, from + at - 1, '/');
                            bit = true;
                            break;
                        default:
                            bit = true;
                        }
                    } while (c);
                    break;
                case '.':
                    if (!option.regexp) {
                        warn('insecure_a', line, from + at, c);
                    }
                    break;
                case ']':
                case '?':
                case '{':
                case '}':
                case '+':
                case '*':
                    warn('unescaped_a', line, from + at, c);
                    break;
                }
                if (b) {
                    switch (source_row.charAt(at)) {
                    case '?':
                    case '+':
                    case '*':
                        at += 1;
                        if (source_row.charAt(at) === '?') {
                            at += 1;
                        }
                        break;
                    case '{':
                        at += 1;
                        c = source_row.charAt(at);
                        if (c < '0' || c > '9') {
                            warn('expected_number_a', line,
                                from + at, c);
                        }
                        at += 1;
                        low = +c;
                        for (;;) {
                            c = source_row.charAt(at);
                            if (c < '0' || c > '9') {
                                break;
                            }
                            at += 1;
                            low = +c + (low * 10);
                        }
                        high = low;
                        if (c === ',') {
                            at += 1;
                            high = Infinity;
                            c = source_row.charAt(at);
                            if (c >= '0' && c <= '9') {
                                at += 1;
                                high = +c;
                                for (;;) {
                                    c = source_row.charAt(at);
                                    if (c < '0' || c > '9') {
                                        break;
                                    }
                                    at += 1;
                                    high = +c + (high * 10);
                                }
                            }
                        }
                        if (source_row.charAt(at) !== '}') {
                            warn('expected_a_b', line, from + at,
                                '}', c);
                        } else {
                            at += 1;
                        }
                        if (source_row.charAt(at) === '?') {
                            at += 1;
                        }
                        if (low > high) {
                            warn('not_greater', line, from + at,
                                low, high);
                        }
                        break;
                    }
                }
            }
            c = source_row.slice(0, at - 1);
            character += at;
            source_row = source_row.slice(at);
            return it('(regexp)', c);
        }

// Public lex methods

        return {
            init: function (source) {
                if (typeof source === 'string') {
                    lines = source.split(crlfx);
                } else {
                    lines = source;
                }
                line = 0;
                next_line();
                from = 1;
            },

// token -- this is called by advance to get the next token.

            token: function () {
                var first, i, snippet;

                for (;;) {
                    while (!source_row) {
                        if (!next_line()) {
                            return it('(end)');
                        }
                    }
                    snippet = match(tx);
                    if (snippet) {

//      identifier

                        first = snippet.charAt(0);
                        if (first.isAlpha() || first === '_' || first === '$') {
                            return it('(identifier)', snippet);
                        }

//      number

                        if (first.isDigit()) {
                            return number(snippet);
                        }
                        switch (snippet) {

//      string

                        case '"':
                        case "'":
                            return string(snippet);

//      // comment

                        case '//':
                            comment(source_row, '//');
                            source_row = '';
                            break;

//      /* comment

                        case '/*':
                            for (;;) {
                                i = source_row.search(lx);
                                if (i >= 0) {
                                    break;
                                }
                                character = source_row.length;
                                comment(source_row);
                                from = 0;
                                if (!next_line()) {
                                    stop('unclosed_comment', line, character);
                                }
                            }
                            comment(source_row.slice(0, i), '/*');
                            character += i + 2;
                            if (source_row.charAt(i) === '/') {
                                stop('nested_comment', line, character);
                            }
                            source_row = source_row.slice(i + 2);
                            break;

                        case '':
                            break;
//      /
                        case '/':
                            if (token.id === '/=') {
                                stop('slash_equal', line, from);
                            }
                            return prereg
                                ? regexp()
                                : it('(punctuator)', snippet);

//      punctuator
                        default:
                            return it('(punctuator)', snippet);
                        }
                    }
                }
            }
        };
    }());

    function define(kind, token) {

// Define a name.

        var name = token.string,
            master = scope[name];       // The current definition of the name

// vars are created with a deadzone, so that the expression that initializes
// the var cannot access the var. Functions are not writeable.

        token.dead = false;
        token.init = false;
        token.kind = kind;
        token.master = master;
        token.used = 0;
        token.writeable = true;

// Global variables are a little weird. They can be defined multiple times.
// Some predefined global vars are (or should) not be writeable.

        if (kind === 'var' && funct === global_funct) {
            if (!master) {
                if (predefined[name] === false) {
                    token.writeable = false;
                }
                global_scope[name] = token;
            }
        } else {

// It is an error if the name has already been defined in this scope, except
// when reusing an exception variable name.

            if (master) {
                if (master.function === funct) {
                    if (master.kind !== 'exception' || kind !== 'exception' ||
                            !master.dead) {
                        token.warn('already_defined', name);
                    }
                } else if (master.function !== global_funct) {
                    if (kind === 'var') {
                        token.warn('redefinition_a_b', name, master.line);
                    }
                }
            }
            scope[name] = token;
            if (kind === 'var') {
                block_var.push(name);
            }
        }
    }

    function peek(distance) {

// Peek ahead to a future token. The distance is how far ahead to look. The
// default is the next token.

        var found, slot = 0;

        distance = distance || 0;
        while (slot <= distance) {
            found = lookahead[slot];
            if (!found) {
                found = lookahead[slot] = lex.token();
            }
            slot += 1;
        }
        return found;
    }


    function advance(id, match) {

// Produce the next token, also looking for programming errors.

        if (indent) {

// If indentation checking was requested, then inspect all of the line breakings.
// The var statement is tricky because the names might be aligned or not. We
// look at the first line break after the var to determine the programmer's
// intention.

            if (var_mode && next_token.line !== token.line) {
                if ((var_mode !== indent || !next_token.edge) &&
                        next_token.from === indent.at -
                        (next_token.edge ? option.indent : 0)) {
                    var dent = indent;
                    for (;;) {
                        dent.at -= option.indent;
                        if (dent === var_mode) {
                            break;
                        }
                        dent = dent.was;
                    }
                    dent.open = false;
                }
                var_mode = null;
            }
            if (next_token.id === '?' && indent.mode === ':' &&
                    token.line !== next_token.line) {
                indent.at -= option.indent;
            }
            if (indent.open) {

// If the token is an edge.

                if (next_token.edge) {
                    if (next_token.edge === 'label') {
                        expected_at(1);
                    } else if (next_token.edge === 'case' || indent.mode === 'statement') {
                        expected_at(indent.at - option.indent);
                    } else if (indent.mode !== 'array' || next_token.line !== token.line) {
                        expected_at(indent.at);
                    }

// If the token is not an edge, but is the first token on the line.

                } else if (next_token.line !== token.line) {
                    if (next_token.from < indent.at + (indent.mode ===
                            'expression' ? 0 : option.indent)) {
                        expected_at(indent.at + option.indent);
                    }
                    indent.wrap = true;
                }
            } else if (next_token.line !== token.line) {
                if (next_token.edge) {
                    expected_at(indent.at);
                } else {
                    indent.wrap = true;
                    if (indent.mode === 'statement' || indent.mode === 'var') {
                        expected_at(indent.at + option.indent);
                    } else if (next_token.from < indent.at + (indent.mode ===
                            'expression' ? 0 : option.indent)) {
                        expected_at(indent.at + option.indent);
                    }
                }
            }
        }

        switch (token.id) {
        case '(number)':
            if (next_token.id === '.') {
                next_token.warn('trailing_decimal_a');
            }
            break;
        case '-':
            if (next_token.id === '-' || next_token.id === '--') {
                next_token.warn('confusing_a');
            }
            break;
        case '+':
            if (next_token.id === '+' || next_token.id === '++') {
                next_token.warn('confusing_a');
            }
            break;
        }
        if (token.id === '(string)' || token.identifier) {
            anonname = token.string;
        }

        if (id && next_token.id !== id) {
            if (match) {
                next_token.warn('expected_a_b_from_c_d', id,
                    match.id, match.line, artifact());
            } else if (!next_token.identifier || next_token.string !== id) {
                next_token.warn('expected_a_b', id, artifact());
            }
        }
        prev_token = token;
        token = next_token;
        next_token = lookahead.shift() || lex.token();
        next_token.function = funct;
        tokens.push(next_token);
    }


    function do_globals() {
        var name, writeable;
        for (;;) {
            if (next_token.id !== '(string)' && !next_token.identifier) {
                return;
            }
            name = next_token.string;
            advance();
            writeable = false;
            if (next_token.id === ':') {
                advance(':');
                switch (next_token.id) {
                case 'true':
                    writeable = predefined[name] !== false;
                    advance('true');
                    break;
                case 'false':
                    advance('false');
                    break;
                default:
                    next_token.stop('unexpected_a');
                }
            }
            predefined[name] = writeable;
            if (next_token.id !== ',') {
                return;
            }
            advance(',');
        }
    }


    function do_jslint() {
        var name, value;
        while (next_token.id === '(string)' || next_token.identifier) {
            name = next_token.string;
            if (!allowed_option[name]) {
                next_token.stop('unexpected_a');
            }
            advance();
            if (next_token.id !== ':') {
                next_token.stop('expected_a_b', ':', artifact());
            }
            advance(':');
            if (typeof allowed_option[name] === 'number') {
                value = next_token.number;
                if (value > allowed_option[name] || value <= 0 ||
                        Math.floor(value) !== value) {
                    next_token.stop('expected_small_a');
                }
                option[name] = value;
            } else {
                if (next_token.id === 'true') {
                    option[name] = true;
                } else if (next_token.id === 'false') {
                    option[name] = false;
                } else {
                    next_token.stop('unexpected_a');
                }
            }
            advance();
            if (next_token.id === ',') {
                advance(',');
            }
        }
        assume();
    }


    function do_properties() {
        var name;
        option.properties = true;
        for (;;) {
            if (next_token.id !== '(string)' && !next_token.identifier) {
                return;
            }
            name = next_token.string;
            advance();
            if (next_token.id === ':') {
                for (;;) {
                    advance();
                    if (next_token.id !== '(string)' && !next_token.identifier) {
                        break;
                    }
                }
            }
            property[name] = 0;
            if (next_token.id !== ',') {
                return;
            }
            advance(',');
        }
    }


    directive = function directive() {
        var command = this.id,
            old_comments_off = comments_off,
            old_indent = indent;
        comments_off = true;
        indent = null;
        if (next_token.line === token.line && next_token.from === token.thru) {
            next_token.warn('missing_space_a_b', artifact(token), artifact());
        }
        if (lookahead.length > 0) {
            this.warn('unexpected_a');
        }
        switch (command) {
        case '/*properties':
        case '/*property':
        case '/*members':
        case '/*member':
            do_properties();
            break;
        case '/*jslint':
            do_jslint();
            break;
        case '/*globals':
        case '/*global':
            do_globals();
            break;
        default:
            this.stop('unexpected_a');
        }
        comments_off = old_comments_off;
        advance('*/');
        indent = old_indent;
    };


// Indentation intention

    function edge(mode) {
        next_token.edge = indent ? indent.open && (mode || 'edge') : '';
    }


    function step_in(mode) {
        var open;
        if (typeof mode === 'number') {
            indent = {
                at: +mode,
                open: true,
                was: indent
            };
        } else if (!indent) {
            indent = {
                at: 1,
                mode: 'statement',
                open: true
            };
        } else if (mode === 'statement') {
            indent = {
                at: indent.at,
                open: true,
                was: indent
            };
        } else {
            open = mode === 'var' || next_token.line !== token.line;
            indent = {
                at: (open || mode === 'control'
                    ? indent.at + option.indent
                    : indent.at) + (indent.wrap ? option.indent : 0),
                mode: mode,
                open: open,
                was: indent
            };
            if (mode === 'var' && open) {
                var_mode = indent;
            }
        }
    }

    function step_out(id, symbol) {
        if (id) {
            if (indent && indent.open) {
                indent.at -= option.indent;
                edge();
            }
            advance(id, symbol);
        }
        if (indent) {
            indent = indent.was;
        }
    }

// Functions for conformance of whitespace.

    function one_space(left, right) {
        left = left || token;
        right = right || next_token;
        if (right.id !== '(end)' && !option.white &&
                (token.line !== right.line ||
                token.thru + 1 !== right.from)) {
            right.warn('expected_space_a_b', artifact(token), artifact(right));
        }
    }

    function one_space_only(left, right) {
        left = left || token;
        right = right || next_token;
        if (right.id !== '(end)' && (left.line !== right.line ||
                (!option.white && left.thru + 1 !== right.from))) {
            right.warn('expected_space_a_b', artifact(left), artifact(right));
        }
    }

    function no_space(left, right) {
        left = left || token;
        right = right || next_token;
        if ((!option.white) &&
                left.thru !== right.from && left.line === right.line) {
            right.warn('unexpected_space_a_b', artifact(left), artifact(right));
        }
    }

    function no_space_only(left, right) {
        left = left || token;
        right = right || next_token;
        if (right.id !== '(end)' && (left.line !== right.line ||
                (!option.white && left.thru !== right.from))) {
            right.warn('unexpected_space_a_b', artifact(left), artifact(right));
        }
    }

    function spaces(left, right) {
        if (!option.white) {
            left = left || token;
            right = right || next_token;
            if (left.thru === right.from && left.line === right.line) {
                right.warn('missing_space_a_b', artifact(left), artifact(right));
            }
        }
    }

    function comma() {
        if (next_token.id !== ',') {
            warn('expected_a_b', token.line, token.thru, ',', artifact());
        } else {
            if (!option.white) {
                no_space_only();
            }
            advance(',');
            spaces();
        }
    }


    function semicolon() {
        if (next_token.id !== ';') {
            warn('expected_a_b', token.line, token.thru, ';', artifact());
        } else {
            if (!option.white) {
                no_space_only();
            }
            advance(';');
            if (semicolon_coda[next_token.id] !== true) {
                spaces();
            }
        }
    }

    function use_strict() {
        if (next_token.string === 'use strict') {
            if (strict_mode) {
                next_token.warn('unnecessary_use');
            }
            edge();
            advance();
            semicolon();
            strict_mode = true;
            return true;
        }
        return false;
    }


    function are_similar(a, b) {
        if (a === b) {
            return true;
        }
        if (Array.isArray(a)) {
            if (Array.isArray(b) && a.length === b.length) {
                var i;
                for (i = 0; i < a.length; i += 1) {
                    if (!are_similar(a[i], b[i])) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        }
        if (Array.isArray(b)) {
            return false;
        }
        if (a.id === '(number)' && b.id === '(number)') {
            return a.number === b.number;
        }
        if (a.arity === b.arity && a.string === b.string) {
            switch (a.arity) {
            case undefined:
                return a.string === b.string;
            case 'prefix':
            case 'suffix':
                return a.id === b.id && are_similar(a.first, b.first) &&
                    a.id !== '{' && a.id !== '[';
            case 'infix':
                return are_similar(a.first, b.first) &&
                    are_similar(a.second, b.second);
            case 'ternary':
                return are_similar(a.first, b.first) &&
                    are_similar(a.second, b.second) &&
                    are_similar(a.third, b.third);
            case 'function':
            case 'regexp':
                return false;
            default:
                return true;
            }
        }
        if (a.id === '.' && b.id === '[' && b.arity === 'infix') {
            return a.second.string === b.second.string && b.second.id === '(string)';
        }
        if (a.id === '[' && a.arity === 'infix' && b.id === '.') {
            return a.second.string === b.second.string && a.second.id === '(string)';
        }
        return false;
    }


// This is the heart of JSLINT, the Pratt parser. In addition to parsing, it
// is looking for ad hoc lint patterns. We add .fud to Pratt's model, which is
// like .nud except that it is only used on the first token of a statement.
// Having .fud makes it much easier to define statement-oriented languages like
// JavaScript. I retained Pratt's nomenclature.

// .nud     Null denotation
// .fud     First null denotation
// .led     Left denotation
//  lbp     Left binding power
//  rbp     Right binding power

// They are elements of the parsing method called Top Down Operator Precedence.

    function expression(rbp, initial) {

// rbp is the right binding power.
// initial indicates that this is the first expression of a statement.

        var left;
        if (next_token.id === '(end)') {
            token.stop('unexpected_a', next_token.id);
        }
        advance();
        if (initial) {
            anonname = 'anonymous';
        }
        if (initial === true && token.fud) {
            left = token.fud();
        } else {
            if (token.nud) {
                left = token.nud();
            } else {
                if (next_token.id === '(number)' && token.id === '.') {
                    token.warn('leading_decimal_a', artifact());
                    advance();
                    return token;
                }
                token.stop('expected_identifier_a', artifact(token));
            }
            while (rbp < next_token.lbp) {
                advance();
                left = token.led(left);
            }
        }
        if (left && left.assign && !initial) {
            if (!option.ass) {
                left.warn('assignment_expression');
            }
            if (left.id !== '=' && left.first.master) {
                left.first.master.used = true;
            }
        }
        return left;
    }

    protosymbol = {
        nud: function () {
            this.stop('unexpected_a');
        },
        led: function () {
            this.stop('expected_operator_a');
        },
        warn: function (code, a, b, c, d) {
            if (!this.warning) {
                this.warning = warn(code, this.line || 0, this.from || 0,
                    a || artifact(this), b, c, d);
            }
        },
        stop: function (code, a, b, c, d) {
            this.warning = undefined;
            this.warn(code, a, b, c, d);
            return quit('stopping', this.line, this.character);
        },
        lbp: 0
    };

// Functional constructors for making the symbols that will be inherited by
// tokens.

    function symbol(s, bp) {
        var x = syntax[s];
        if (!x) {
            x = Object.create(protosymbol);
            x.id = x.string = s;
            x.lbp = bp || 0;
            syntax[s] = x;
        }
        return x;
    }

    function postscript(x) {
        x.postscript = true;
        return x;
    }

    function ultimate(s) {
        var x = symbol(s, 0);
        x.from = 1;
        x.thru = 1;
        x.line = 0;
        x.edge = 'edge';
        x.string = s;
        return postscript(x);
    }

    function reserve_name(x) {
        var c = x.id.charAt(0);
        if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
            x.identifier = x.reserved = true;
        }
        return x;
    }

    function stmt(s, f) {
        var x = symbol(s);
        x.fud = f;
        return reserve_name(x);
    }

    function disrupt_stmt(s, f) {
        var x = stmt(s, f);
        x.disrupt = true;
    }

    function labeled_stmt(s, f) {
        var x = stmt(s, function labeled() {
            var the_statement;
            if (funct.breakage) {
                funct.breakage.push(this);
            } else {
                funct.breakage = [this];
            }
            the_statement = f.apply(this);
            if (funct.breakage.length > 1) {
                funct.breakage.pop();
            } else {
                delete funct.breakage;
            }
            return the_statement;
        });
        x.labeled = true;
    }

    function prefix(s, f) {
        var x = symbol(s, 150);
        reserve_name(x);
        x.nud = function () {
            var that = this;
            that.arity = 'prefix';
            if (typeof f === 'function') {
                that = f(that);
                if (that.arity !== 'prefix') {
                    return that;
                }
            } else {
                if (s === 'typeof') {
                    one_space();
                } else {
                    no_space_only();
                }
                that.first = expression(150);
            }
            switch (that.id) {
            case '++':
            case '--':
                if (!option.plusplus) {
                    that.warn('unexpected_a');
                } else if ((!that.first.identifier || that.first.reserved) &&
                        that.first.id !== '.' && that.first.id !== '[') {
                    that.warn('bad_operand');
                }
                break;
            default:
                if (that.first.arity === 'prefix' ||
                        that.first.arity === 'function') {
                    that.warn('unexpected_a');
                }
            }
            return that;
        };
        return x;
    }


    function type(s, t, nud) {
        var x = symbol(s);
        x.arity = t;
        if (nud) {
            x.nud = nud;
        }
        return x;
    }


    function reserve(s, f) {
        var x = symbol(s);
        x.identifier = x.reserved = true;
        if (typeof f === 'function') {
            x.nud = f;
        }
        return x;
    }


    function constant(name) {
        var x = reserve(name);
        x.string = name;
        x.nud = return_this;
        return x;
    }


    function reservevar(s, v) {
        return reserve(s, function () {
            if (typeof v === 'function') {
                v(this);
            }
            return this;
        });
    }


    function infix(s, p, f, w) {
        var x = symbol(s, p);
        reserve_name(x);
        x.led = function (left) {
            this.arity = 'infix';
            if (!w) {
                spaces(prev_token, token);
                spaces();
            }
            if (!option.bitwise && this.bitwise) {
                this.warn('unexpected_a');
            }
            if (typeof f === 'function') {
                return f(left, this);
            }
            this.first = left;
            this.second = expression(p);
            return this;
        };
        return x;
    }

    function expected_relation(node, message) {
        if (node.assign) {
            node.warn(message || 'conditional_assignment');
        }
        return node;
    }

    function expected_condition(node, message) {
        switch (node.id) {
        case '[':
        case '-':
            if (node.arity !== 'infix') {
                node.warn(message || 'weird_condition');
            }
            break;
        case 'false':
        case 'function':
        case 'Infinity':
        case 'NaN':
        case 'null':
        case 'true':
        case 'undefined':
        case 'void':
        case '(number)':
        case '(regexp)':
        case '(string)':
        case '{':
        case '?':
        case '~':
            node.warn(message || 'weird_condition');
            break;
        case '(':
            if (node.first.id === 'new' ||
                    (node.first.string === 'Boolean') ||
                    (node.first.id === '.' &&
                        numbery[node.first.second.string] === true)) {
                node.warn(message || 'weird_condition');
            }
            break;
        }
        return node;
    }

    function check_relation(node) {
        switch (node.arity) {
        case 'prefix':
            switch (node.id) {
            case '{':
            case '[':
                node.warn('unexpected_a');
                break;
            case '!':
                node.warn('confusing_a');
                break;
            }
            break;
        case 'function':
        case 'regexp':
            node.warn('unexpected_a');
            break;
        default:
            if (node.id  === 'NaN') {
                node.warn('isNaN');
            } else if (node.relation) {
                node.warn('weird_relation');
            }
        }
        return node;
    }


    function relation(s, eqeq) {
        var x = infix(s, 100, function (left, that) {
            check_relation(left);
            if (eqeq && !option.eqeq) {
                that.warn('expected_a_b', eqeq, that.id);
            }
            var right = expression(100);
            if (are_similar(left, right) ||
                    ((left.id === '(string)' || left.id === '(number)') &&
                    (right.id === '(string)' || right.id === '(number)'))) {
                that.warn('weird_relation');
            } else if (left.id === 'typeof') {
                if (right.id !== '(string)') {
                    right.warn("expected_string_a", artifact(right));
                } else if (right.string === 'undefined' ||
                        right.string === 'null') {
                    left.warn("unexpected_typeof_a", right.string);
                }
            } else if (right.id === 'typeof') {
                if (left.id !== '(string)') {
                    left.warn("expected_string_a", artifact(left));
                } else if (left.string === 'undefined' ||
                        left.string === 'null') {
                    right.warn("unexpected_typeof_a", left.string);
                }
            }
            that.first = left;
            that.second = check_relation(right);
            return that;
        });
        x.relation = true;
        return x;
    }

    function lvalue(that, s) {
        var master;
        if (that.identifier) {
            master = scope[that.string];
            if (master) {
                if (scope[that.string].writeable !== true) {
                    that.warn('read_only');
                }
                master.used -= 1;
                if (s === '=') {
                    master.init = true;
                }
            } else if (that.reserved) {
                that.warn('expected_identifier_a_reserved');
            }
        } else if (that.id === '.' || that.id === '[') {
            if (!that.first || that.first.string === 'arguments') {
                that.warn('bad_assignment');
            }
        } else {
            that.warn('bad_assignment');
        }
    }


    function assignop(s, op) {
        var x = infix(s, 20, function (left, that) {
            var next;
            that.first = left;
            lvalue(left, s);
            that.second = expression(20);
            if (that.id === '=' && are_similar(that.first, that.second)) {
                that.warn('weird_assignment');
            }
            next = that;
            while (next_token.id === '=') {
                lvalue(next.second, '=');
                next_token.first = next.second;
                next.second = next_token;
                next = next_token;
                advance('=');
                next.second = expression(20);
            }
            return that;
        });
        x.assign = true;
        if (op) {
            if (syntax[op].bitwise) {
                x.bitwise = true;
            }
        }
        return x;
    }


    function bitwise(s, p) {
        var x = infix(s, p, 'number');
        x.bitwise = true;
        return x;
    }


    function suffix(s) {
        var x = symbol(s, 150);
        x.led = function (left) {
            no_space_only(prev_token, token);
            if (!option.plusplus) {
                this.warn('unexpected_a');
            } else if ((!left.identifier || left.reserved) &&
                    left.id !== '.' && left.id !== '[') {
                this.warn('bad_operand');
            }
            this.first = left;
            this.arity = 'suffix';
            return this;
        };
        return x;
    }


    function optional_identifier(variable) {
        if (next_token.identifier) {
            advance();
            if (token.reserved && variable) {
                token.warn('expected_identifier_a_reserved');
            }
            return token.string;
        }
    }


    function identifier(variable) {
        var i = optional_identifier(variable);
        if (!i) {
            next_token.stop(token.id === 'function' && next_token.id === '('
                ? 'name_function'
                : 'expected_identifier_a');
        }
        return i;
    }


    function statement() {

        var label, preamble, the_statement;

// We don't like the empty statement.

        if (next_token.id === ';') {
            next_token.warn('unexpected_a');
            semicolon();
            return;
        }

// Is this a labeled statement?

        if (next_token.identifier && !next_token.reserved && peek().id === ':') {
            edge('label');
            label = next_token;
            advance();
            advance(':');
            define('label', label);
            if (next_token.labeled !== true || funct === global_funct) {
                label.stop('unexpected_label_a');
            } else if (jx.test(label.string + ':')) {
                label.warn('url');
            }
            next_token.label = label;
            label.init = true;
            label.statement = next_token;
        }

// Parse the statement.

        preamble = next_token;
        if (token.id !== 'else') {
            edge();
        }
        step_in('statement');
        the_statement = expression(0, true);
        if (the_statement) {

// Look for the final semicolon.

            if (the_statement.arity === 'statement') {
                if (the_statement.id === 'switch' ||
                        (the_statement.block && the_statement.id !== 'do')) {
                    spaces();
                } else {
                    semicolon();
                }
            } else {

// If this is an expression statement, determine if it is acceptable.
// We do not like
//      new Blah;
// statements. If it is to be used at all, new should only be used to make
// objects, not side effects. The expression statements we do like do
// assignment or invocation or delete.

                if (the_statement.id === '(') {
                    if (the_statement.first.id === 'new') {
                        next_token.warn('bad_new');
                    }
                } else if (the_statement.id === '++' ||
                        the_statement.id === '--') {
                    lvalue(the_statement.first);
                } else if (!the_statement.assign &&
                        the_statement.id !== 'delete') {
                    if (!option.closure || !preamble.comments) {
                        preamble.warn('assignment_function_expression');
                    }
                }
                semicolon();
            }
        }
        step_out();
        if (label) {
            label.dead = true;
        }
        return the_statement;
    }


    function statements() {
        var array = [], disruptor, the_statement;

// A disrupt statement may not be followed by any other statement.
// If the last statement is disrupt, then the sequence is disrupt.

        while (next_token.postscript !== true) {
            if (next_token.id === ';') {
                next_token.warn('unexpected_a');
                semicolon();
            } else {
                if (next_token.string === 'use strict') {
                    if ((!node_js) || funct !== global_funct || array.length > 0) {
                        next_token.warn('function_strict');
                    }
                    use_strict();
                }
                if (disruptor) {
                    next_token.warn('unreachable_a_b', next_token.string,
                        disruptor.string);
                    disruptor = null;
                }
                the_statement = statement();
                if (the_statement) {
                    array.push(the_statement);
                    if (the_statement.disrupt) {
                        disruptor = the_statement;
                        array.disrupt = true;
                    }
                }
            }
        }
        return array;
    }


    function block(kind) {

// A block is a sequence of statements wrapped in braces.

        var array,
            curly = next_token,
            old_block_var = block_var,
            old_in_block = in_block,
            old_strict_mode = strict_mode;

        in_block = kind !== 'function' && kind !== 'try' && kind !== 'catch';
        block_var = [];
        if (curly.id === '{') {
            spaces();
            advance('{');
            step_in();
            if (kind === 'function' && !use_strict() && !old_strict_mode &&
                    !option.sloppy && funct.level === 1) {
                next_token.warn('missing_use_strict');
            }
            array = statements();
            strict_mode = old_strict_mode;
            step_out('}', curly);
        } else if (in_block) {
            curly.stop('expected_a_b', '{', artifact());
        } else {
            curly.warn('expected_a_b', '{', artifact());
            array = [statement()];
            array.disrupt = array[0].disrupt;
        }
        if (kind !== 'catch' && array.length === 0 && !option.debug) {
            curly.warn('empty_block');
        }
        block_var.forEach(function (name) {
            scope[name].dead = true;
        });
        block_var = old_block_var;
        in_block = old_in_block;
        return array;
    }


    function tally_property(name) {
        if (option.properties && typeof property[name] !== 'number') {
            token.warn('unexpected_property_a', name);
        }
        if (property[name]) {
            property[name] += 1;
        } else {
            property[name] = 1;
        }
    }


// ECMAScript parser

    (function () {
        var x = symbol('(identifier)');
        x.nud = function () {
            var name = this.string,
                master = scope[name],
                writeable;

// If the master is not in scope, then we may have an undeclared variable.
// Check the predefined list. If it was predefined, create the global
// variable.

            if (!master) {
                writeable = predefined[name];
                if (typeof writeable === 'boolean') {
                    global_scope[name] = master = {
                        dead: false,
                        function: global_funct,
                        kind: 'var',
                        string: name,
                        writeable: writeable
                    };

// But if the variable is not in scope, and is not predefined, and if we are not
// in the global scope, then we have an undefined variable error.

                } else {
                    token.warn('used_before_a');
                }
            } else {
                this.master = master;
            }

// Annotate uses that cross scope boundaries.

            if (master) {
                if (master.kind === 'label') {
                    this.warn('a_label');
                } else {
                    if (master.dead === true || master.dead === funct) {
                        this.warn('a_scope');
                    }
                    master.used += 1;
                    if (master.function !== funct) {
                        if (master.function === global_funct) {
                            funct.global.push(name);
                        } else {
                            master.function.closure.push(name);
                            funct.outer.push(name);
                        }
                    }
                }
            }
            return this;
        };
        x.identifier = true;
    }());


// Build the syntax table by declaring the syntactic elements.

    type('(array)', 'array');
    type('(function)', 'function');
    type('(number)', 'number', return_this);
    type('(object)', 'object');
    type('(string)', 'string', return_this);
    type('(boolean)', 'boolean', return_this);
    type('(regexp)', 'regexp', return_this);

    ultimate('(begin)');
    ultimate('(end)');
    ultimate('(error)');
    postscript(symbol('}'));
    symbol(')');
    symbol(']');
    postscript(symbol('"'));
    postscript(symbol('\''));
    symbol(';');
    symbol(':');
    symbol(',');
    symbol('#');
    symbol('@');
    symbol('*/');
    postscript(reserve('case'));
    reserve('catch');
    postscript(reserve('default'));
    reserve('else');
    reserve('finally');

    reservevar('arguments', function (x) {
        if (strict_mode && funct === global_funct) {
            x.warn('strict');
        }
        funct.arguments = true;
    });
    reservevar('eval');
    constant('false', 'boolean');
    constant('Infinity', 'number');
    constant('NaN', 'number');
    constant('null', '');
    reservevar('this', function (x) {
        if (strict_mode && funct.statement && funct.name.charAt(0) > 'Z') {
            x.warn('strict');
        }
    });
    constant('true', 'boolean');
    constant('undefined', '');

    infix('?', 30, function (left, that) {
        step_in('?');
        that.first = expected_condition(expected_relation(left));
        that.second = expression(0);
        spaces();
        step_out();
        var colon = next_token;
        advance(':');
        step_in(':');
        spaces();
        that.third = expression(10);
        that.arity = 'ternary';
        if (are_similar(that.second, that.third)) {
            colon.warn('weird_ternary');
        } else if (are_similar(that.first, that.second)) {
            that.warn('use_or');
        }
        step_out();
        return that;
    });

    infix('||', 40, function (left, that) {
        function paren_check(that) {
            if (that.id === '&&' && !that.paren) {
                that.warn('and');
            }
            return that;
        }

        that.first = paren_check(expected_condition(expected_relation(left)));
        that.second = paren_check(expected_relation(expression(40)));
        if (are_similar(that.first, that.second)) {
            that.warn('weird_condition');
        }
        return that;
    });

    infix('&&', 50, function (left, that) {
        that.first = expected_condition(expected_relation(left));
        that.second = expected_relation(expression(50));
        if (are_similar(that.first, that.second)) {
            that.warn('weird_condition');
        }
        return that;
    });

    prefix('void', function (that) {
        that.first = expression(0);
        that.warn('expected_a_b', 'undefined', 'void');
        return that;
    });

    bitwise('|', 70);
    bitwise('^', 80);
    bitwise('&', 90);

    relation('==', '===');
    relation('===');
    relation('!=', '!==');
    relation('!==');
    relation('<');
    relation('>');
    relation('<=');
    relation('>=');

    bitwise('<<', 120);
    bitwise('>>', 120);
    bitwise('>>>', 120);

    infix('in', 120, function (left, that) {
        that.warn('infix_in');
        that.left = left;
        that.right = expression(130);
        return that;
    });
    infix('instanceof', 120);
    infix('+', 130, function (left, that) {
        if (left.id === '(number)') {
            if (left.number === 0) {
                left.warn('unexpected_a', '0');
            }
        } else if (left.id === '(string)') {
            if (left.string === '') {
                left.warn('expected_a_b', 'String', '\'\'');
            }
        }
        var right = expression(130);
        if (right.id === '(number)') {
            if (right.number === 0) {
                right.warn('unexpected_a', '0');
            }
        } else if (right.id === '(string)') {
            if (right.string === '') {
                right.warn('expected_a_b', 'String', '\'\'');
            }
        }
        if (left.id === right.id) {
            if (left.id === '(string)' || left.id === '(number)') {
                if (left.id === '(string)') {
                    left.string += right.string;
                    if (jx.test(left.string)) {
                        left.warn('url');
                    }
                } else {
                    left.number += right.number;
                }
                left.thru = right.thru;
                return left;
            }
        }
        that.first = left;
        that.second = right;
        return that;
    });
    prefix('+');
    prefix('+++', function () {
        token.warn('confusing_a');
        this.first = expression(150);
        this.arity = 'prefix';
        return this;
    });
    infix('+++', 130, function (left) {
        token.warn('confusing_a');
        this.first = left;
        this.second = expression(130);
        return this;
    });
    infix('-', 130, function (left, that) {
        if ((left.id === '(number)' && left.number === 0) || left.id === '(string)') {
            left.warn('unexpected_a');
        }
        var right = expression(130);
        if ((right.id === '(number)' && right.number === 0) || right.id === '(string)') {
            right.warn('unexpected_a');
        }
        if (left.id === right.id && left.id === '(number)') {
            left.number -= right.number;
            left.thru = right.thru;
            return left;
        }
        that.first = left;
        that.second = right;
        return that;
    });
    prefix('-');
    prefix('---', function () {
        token.warn('confusing_a');
        this.first = expression(150);
        this.arity = 'prefix';
        return this;
    });
    infix('---', 130, function (left) {
        token.warn('confusing_a');
        this.first = left;
        this.second = expression(130);
        return this;
    });
    infix('*', 140, function (left, that) {
        if ((left.id === '(number)' && (left.number === 0 || left.number === 1)) || left.id === '(string)') {
            left.warn('unexpected_a');
        }
        var right = expression(140);
        if ((right.id === '(number)' && (right.number === 0 || right.number === 1)) || right.id === '(string)') {
            right.warn('unexpected_a');
        }
        if (left.id === right.id && left.id === '(number)') {
            left.number *= right.number;
            left.thru = right.thru;
            return left;
        }
        that.first = left;
        that.second = right;
        return that;
    });
    infix('/', 140, function (left, that) {
        if ((left.id === '(number)' && left.number === 0) || left.id === '(string)') {
            left.warn('unexpected_a');
        }
        var right = expression(140);
        if ((right.id === '(number)' && (right.number === 0 || right.number === 1)) || right.id === '(string)') {
            right.warn('unexpected_a');
        }
        if (left.id === right.id && left.id === '(number)') {
            left.number /= right.number;
            left.thru = right.thru;
            return left;
        }
        that.first = left;
        that.second = right;
        return that;
    });
    infix('%', 140, function (left, that) {
        if ((left.id === '(number)' && (left.number === 0 || left.number === 1)) || left.id === '(string)') {
            left.warn('unexpected_a');
        }
        var right = expression(140);
        if ((right.id === '(number)' && right.number === 0) || right.id === '(string)') {
            right.warn('unexpected_a');
        }
        if (left.id === right.id && left.id === '(number)') {
            left.number %= right.number;
            left.thru = right.thru;
            return left;
        }
        that.first = left;
        that.second = right;
        return that;
    });

    suffix('++');
    prefix('++');

    suffix('--');
    prefix('--');
    prefix('delete', function (that) {
        one_space();
        var p = expression(0);
        if (!p || (p.id !== '.' && p.id !== '[')) {
            next_token.warn('deleted');
        }
        that.first = p;
        return that;
    });


    prefix('~', function (that) {
        no_space_only();
        if (!option.bitwise) {
            that.warn('unexpected_a');
        }
        that.first = expression(150);
        return that;
    });
    function banger(that) {
        no_space_only();
        that.first = expected_condition(expression(150));
        if (bang[that.first.id] === that || that.first.assign) {
            that.warn('confusing_a');
        }
        return that;
    }
    prefix('!', banger);
    prefix('!!', banger);
    prefix('typeof');
    prefix('new', function (that) {
        one_space();
        var c = expression(160), n, p, v;
        that.first = c;
        if (c.id !== 'function') {
            if (c.identifier) {
                switch (c.string) {
                case 'Object':
                    token.warn('use_object');
                    break;
                case 'Array':
                    if (next_token.id === '(') {
                        p = next_token;
                        p.first = this;
                        advance('(');
                        if (next_token.id !== ')') {
                            n = expression(0);
                            p.second = [n];
                            if (n.id === '(string)' || next_token.id === ',') {
                                p.warn('use_array');
                            }
                            while (next_token.id === ',') {
                                advance(',');
                                p.second.push(expression(0));
                            }
                        } else {
                            token.warn('use_array');
                        }
                        advance(')', p);
                        return p;
                    }
                    token.warn('use_array');
                    break;
                case 'Number':
                case 'String':
                case 'Boolean':
                case 'Math':
                case 'JSON':
                    c.warn('not_a_constructor');
                    break;
                case 'Function':
                    if (!option.evil) {
                        next_token.warn('function_eval');
                    }
                    break;
                case 'Date':
                case 'RegExp':
                case 'this':
                    break;
                default:
                    if (c.id !== 'function') {
                        v = c.string.charAt(0);
                        if (!option.newcap && (v < 'A' || v > 'Z')) {
                            token.warn('constructor_name_a');
                        }
                    }
                }
            } else {
                if (c.id !== '.' && c.id !== '[' && c.id !== '(') {
                    token.warn('bad_constructor');
                }
            }
        } else {
            that.warn('weird_new');
        }
        if (next_token.id !== '(') {
            next_token.warn('missing_a', '()');
        }
        return that;
    });

    infix('(', 160, function (left, that) {
        var e, p;
        if (indent && indent.mode === 'expression') {
            no_space(prev_token, token);
        } else {
            no_space_only(prev_token, token);
        }
        if (!left.immed && left.id === 'function') {
            next_token.warn('wrap_immediate');
        }
        p = [];
        if (left.identifier) {
            if (left.string.match(/^[A-Z]([A-Z0-9_$]*[a-z][A-Za-z0-9_$]*)?$/)) {
                if (left.string !== 'Number' && left.string !== 'String' &&
                        // left.string !== 'Boolean' && left.string !== 'Date') {
                        left.string !== 'Boolean' && left.string !== 'Date' &&
                        left.string !== 'Symbol' && left.string !== 'BigInt') {
                    if (left.string === 'Math') {
                        left.warn('not_a_function');
                    } else if (left.string === 'Object') {
                        token.warn('use_object');
                    } else if (left.string === 'Array' || !option.newcap) {
                        left.warn('missing_a', 'new');
                    }
                }
            } else if (left.string === 'JSON') {
                left.warn('not_a_function');
            }
        } else if (left.id === '.') {
            if (left.second.string === 'split' &&
                    left.first.id === '(string)') {
                left.second.warn('use_array');
            }
        }
        step_in();
        if (next_token.id !== ')') {
            no_space();
            for (;;) {
                edge();
                e = expression(10);
                if (left.string === 'Boolean' && (e.id === '!' || e.id === '~')) {
                    e.warn('weird_condition');
                }
                p.push(e);
                if (next_token.id !== ',') {
                    break;
                }
                comma();
            }
        }
        no_space();
        step_out(')', that);
        if (typeof left === 'object') {
            if (left.string === 'parseInt' && p.length === 1) {
                left.warn('radix');
            } else if (left.string === 'String' && p.length >= 1 && p[0].id === '(string)') {
                left.warn('unexpected_a');
            }
            if (!option.evil) {
                if (left.string === 'eval' || left.string === 'Function' ||
                        left.string === 'execScript') {
                    left.warn('evil');
                } else if (p[0] && p[0].id === '(string)' &&
                        (left.string === 'setTimeout' ||
                        left.string === 'setInterval')) {
                    left.warn('implied_evil');
                }
            }
            if (!left.identifier && left.id !== '.' && left.id !== '[' &&
                    left.id !== '(' && left.id !== '&&' && left.id !== '||' &&
                    left.id !== '?') {
                left.warn('bad_invocation');
            }
            if (left.id === '.') {
                if (p.length > 0 &&
                        left.first && left.first.first &&
                        are_similar(p[0], left.first.first)) {
                    if (left.second.string === 'call' ||
                            (left.second.string === 'apply' && (p.length === 1 ||
                            (p[1].arity === 'prefix' && p[1].id === '[')))) {
                        left.second.warn('unexpected_a');
                    }
                }
                if (left.second.string === 'toString') {
                    if (left.first.id === '(string)' || left.first.id === '(number)') {
                        left.second.warn('unexpected_a');
                    }
                }
            }
        }
        that.first = left;
        that.second = p;
        return that;
    }, true);

    prefix('(', function (that) {
        step_in('expression');
        no_space();
        edge();
        if (next_token.id === 'function') {
            next_token.immed = true;
        }
        var value = expression(0);
        value.paren = true;
        no_space();
        step_out(')', that);
        if (value.id === 'function') {
            switch (next_token.id) {
            case '(':
                next_token.warn('move_invocation');
                break;
            case '.':
            case '[':
                next_token.warn('unexpected_a');
                break;
            default:
                that.warn('bad_wrap');
            }
        } else if (!value.arity) {
            if (!option.closure || !that.comments) {
                that.warn('unexpected_a');
            }
        }
        return value;
    });

    infix('.', 170, function (left, that) {
        no_space(prev_token, token);
        no_space();
        var name = identifier();
        if (typeof name === 'string') {
            tally_property(name);
        }
        that.first = left;
        that.second = token;
        if (left && left.string === 'arguments' &&
                (name === 'callee' || name === 'caller')) {
            left.warn('avoid_a', 'arguments.' + name);
        } else if (!option.evil && left && left.string === 'document' &&
                (name === 'write' || name === 'writeln')) {
            left.warn('write_is_wrong');
        } else if (!option.stupid && syx.test(name)) {
            token.warn('sync_a');
        } else if (left && left.id === '{') {
            that.warn('unexpected_a');
        }
        if (!option.evil && (name === 'eval' || name === 'execScript')) {
            next_token.warn('evil');
        }
        return that;
    }, true);

    infix('[', 170, function (left, that) {
        var e, s;
        no_space_only(prev_token, token);
        no_space();
        step_in();
        edge();
        e = expression(0);
        switch (e.id) {
        case '(number)':
            if (e.id === '(number)' && left.id === 'arguments') {
                left.warn('use_param');
            }
            break;
        case '(string)':
            if (!option.evil &&
                    (e.string === 'eval' || e.string === 'execScript')) {
                e.warn('evil');
            } else if (!option.sub && ix.test(e.string)) {
                s = syntax[e.string];
                if (!s || !s.reserved) {
                    e.warn('subscript');
                }
            }
            tally_property(e.string);
            break;
        }
        if (left && (left.id === '{' || (left.id === '[' && left.arity === 'prefix'))) {
            that.warn('unexpected_a');
        }
        step_out(']', that);
        no_space(prev_token, token);
        that.first = left;
        that.second = e;
        return that;
    }, true);

    prefix('[', function (that) {
        that.first = [];
        step_in('array');
        while (next_token.id !== '(end)') {
            while (next_token.id === ',') {
                next_token.warn('unexpected_a');
                advance(',');
            }
            if (next_token.id === ']') {
                break;
            }
            indent.wrap = false;
            edge();
            that.first.push(expression(10));
            if (next_token.id === ',') {
                comma();
                if (next_token.id === ']') {
                    token.warn('unexpected_a');
                    break;
                }
            } else {
                break;
            }
        }
        step_out(']', that);
        return that;
    }, 170);


    function property_name() {
        var id = optional_identifier();
        if (!id) {
            if (next_token.id === '(string)') {
                id = next_token.string;
                advance();
            } else if (next_token.id === '(number)') {
                id = next_token.number.toString();
                advance();
            }
        }
        return id;
    }



    assignop('=');
    assignop('+=', '+');
    assignop('-=', '-');
    assignop('*=', '*');
    assignop('/=', '/').nud = function () {
        next_token.stop('slash_equal');
    };
    assignop('%=', '%');
    assignop('&=', '&');
    assignop('|=', '|');
    assignop('^=', '^');
    assignop('<<=', '<<');
    assignop('>>=', '>>');
    assignop('>>>=', '>>>');

    function function_parameters() {
        var id, parameters = [], paren = next_token;
        advance('(');
        token.function = funct;
        step_in();
        no_space();
        if (next_token.id !== ')') {
            for (;;) {
                edge();
                id = identifier();
                if (token.reserved) {
                    token.warn('expected_identifier_a_reserved');
                }
                define('parameter', token);
                parameters.push(id);
                token.init = true;
                token.writeable = true;
                if (next_token.id !== ',') {
                    break;
                }
                comma();
            }
        }
        no_space();
        step_out(')', paren);
        return parameters;
    }

    function do_function(func, name) {
        var old_funct = funct,
            old_option = option,
            old_scope = scope;
        scope = Object.create(old_scope);
        funct = {
            closure: [],
            global: [],
            level: old_funct.level + 1,
            line: next_token.line,
            loopage: 0,
            name: name || '\'' + (anonname || '').replace(nx, sanitize) + '\'',
            outer: [],
            scope: scope
        };
        funct.parameter = function_parameters();
        func.function = funct;
        option = Object.create(old_option);
        functions.push(funct);
        if (name) {
            func.name = name;
            func.string = name;
            define('function', func);
            func.init = true;
            func.used += 1;
        }
        func.writeable = false;
        one_space();
        func.block = block('function');
        Object.keys(scope).forEach(function (name) {
            var master = scope[name];
            if (!master.used && master.kind !== 'exception' &&
                    (master.kind !== 'parameter' || !option.unparam)) {
                master.warn('unused_a');
            } else if (!master.init) {
                master.warn('uninitialized_a');
            }
        });
        funct = old_funct;
        option = old_option;
        scope = old_scope;
    }

    prefix('{', function (that) {
        var get, i, j, name, set, seen = Object.create(null);
        that.first = [];
        step_in();
        while (next_token.id !== '}') {
            indent.wrap = false;

// JSLint recognizes the ES5 extension for get/set in object literals,
// but requires that they be used in pairs.

            edge();
            if (next_token.string === 'get' && peek().id !== ':') {
                get = next_token;
                advance('get');
                one_space_only();
                name = next_token;
                i = property_name();
                if (!i) {
                    next_token.stop('missing_property');
                }
                get.string = '';
                do_function(get);
                if (funct.loopage) {
                    get.warn('function_loop');
                }
                if (get.function.parameter.length) {
                    get.warn('parameter_a_get_b', get.function.parameter[0], i);
                }
                comma();
                set = next_token;
                spaces();
                edge();
                advance('set');
                set.string = '';
                one_space_only();
                j = property_name();
                if (i !== j) {
                    token.stop('expected_a_b', i, j || next_token.string);
                }
                do_function(set);
                if (set.block.length === 0) {
                    token.warn('missing_a', 'throw');
                }
                if (set.function.parameter.length === 0) {
                    set.stop('parameter_set_a', 'value');
                } else if (set.function.parameter[0] !== 'value') {
                    set.stop('expected_a_b', 'value',
                        set.function.parameter[0]);
                }
                name.first = [get, set];
            } else {
                name = next_token;
                i = property_name();
                if (typeof i !== 'string') {
                    next_token.stop('missing_property');
                }
                advance(':');
                spaces();
                name.first = expression(10);
            }
            that.first.push(name);
            if (seen[i] === true) {
                next_token.warn('duplicate_a', i);
            }
            seen[i] = true;
            tally_property(i);
            if (next_token.id !== ',') {
                break;
            }
            for (;;) {
                comma();
                if (next_token.id !== ',') {
                    break;
                }
                next_token.warn('unexpected_a');
            }
            if (next_token.id === '}') {
                token.warn('unexpected_a');
            }
        }
        step_out('}', that);
        return that;
    });

    stmt('{', function () {
        next_token.warn('statement_block');
        this.arity = 'statement';
        this.block = statements();
        this.disrupt = this.block.disrupt;
        advance('}', this);
        return this;
    });

    stmt('/*global', directive);
    stmt('/*globals', directive);
    stmt('/*jslint', directive);
    stmt('/*member', directive);
    stmt('/*members', directive);
    stmt('/*property', directive);
    stmt('/*properties', directive);

    stmt('var', function () {

// JavaScript does not have block scope. It only has function scope. So,
// declaring a variable in a block can have unexpected consequences.

// var.first will contain an array, the array containing name tokens
// and assignment tokens.

        var assign, id, name;

        if (funct.loopage) {
            next_token.warn('var_loop');
        } else if (funct.varstatement && !option.vars) {
            next_token.warn('combine_var');
        }
        if (funct !== global_funct) {
            funct.varstatement = true;
        }
        this.arity = 'statement';
        this.first = [];
        step_in('var');
        for (;;) {
            name = next_token;
            id = identifier(true);
            define('var', name);
            name.dead = funct;
            if (next_token.id === '=') {
                if (funct === global_funct && !name.writeable) {
                    name.warn('read_only');
                }
                assign = next_token;
                assign.first = name;
                spaces();
                advance('=');
                spaces();
                if (next_token.id === 'undefined') {
                    token.warn('unnecessary_initialize', id);
                }
                if (peek(0).id === '=' && next_token.identifier) {
                    next_token.stop('var_a_not');
                }
                assign.second = expression(0);
                assign.arity = 'infix';
                name.init = true;
                this.first.push(assign);
            } else {
                this.first.push(name);
            }
            name.dead = false;
            name.writeable = true;
            if (next_token.id !== ',') {
                break;
            }
            comma();
            indent.wrap = false;
            if (var_mode && next_token.line === token.line &&
                    this.first.length === 1) {
                var_mode = null;
                indent.open = false;
                indent.at -= option.indent;
            }
            spaces();
            edge();
        }
        var_mode = null;
        step_out();
        return this;
    });

    stmt('function', function () {
        one_space();
        if (in_block) {
            token.warn('function_block');
        }
        var name = next_token,
            id = identifier(true);
        define('var', name);
        if (!name.writeable) {
            name.warn('read_only');
        }
        name.init = true;
        name.statement = true;
        no_space();
        this.arity = 'statement';
        do_function(this, id);
        if (next_token.id === '(' && next_token.line === token.line) {
            next_token.stop('function_statement');
        }
        return this;
    });

    prefix('function', function (that) {
        var id = optional_identifier(true), name;
        if (id) {
            name = token;
            no_space();
        } else {
            id = '';
            one_space();
        }
        do_function(that, id);
        if (name) {
            name.function = that.function;
        }
        if (funct.loopage) {
            that.warn('function_loop');
        }
        switch (next_token.id) {
        case ';':
        case '(':
        case ')':
        case ',':
        case ']':
        case '}':
        case ':':
        case '(end)':
            break;
        case '.':
            if (peek().string !== 'bind' || peek(1).id !== '(') {
                next_token.warn('unexpected_a');
            }
            break;
        default:
            next_token.stop('unexpected_a');
        }
        that.arity = 'function';
        return that;
    });

    stmt('if', function () {
        var paren = next_token;
        one_space();
        advance('(');
        step_in('control');
        no_space();
        edge();
        this.arity = 'statement';
        this.first = expected_condition(expected_relation(expression(0)));
        no_space();
        step_out(')', paren);
        one_space();
        this.block = block('if');
        if (next_token.id === 'else') {
            if (this.block.disrupt) {
                next_token.warn(this.elif ? 'use_nested_if' : 'unnecessary_else');
            }
            one_space();
            advance('else');
            one_space();
            if (next_token.id === 'if') {
                next_token.elif = true;
                this.else = statement(true);
            } else {
                this.else = block('else');
            }
            if (this.else.disrupt && this.block.disrupt) {
                this.disrupt = true;
            }
        }
        return this;
    });

    stmt('try', function () {

// try.first    The catch variable
// try.second   The catch clause
// try.third    The finally clause
// try.block    The try block

        var exception_variable, paren;
        one_space();
        this.arity = 'statement';
        this.block = block('try');
        if (next_token.id === 'catch') {
            one_space();
            advance('catch');
            one_space();
            paren = next_token;
            advance('(');
            step_in('control');
            no_space();
            edge();
            exception_variable = next_token;
            this.first = identifier();
            define('exception', exception_variable);
            exception_variable.init = true;
            no_space();
            step_out(')', paren);
            one_space();
            this.second = block('catch');
            if (this.second.length) {
                if (this.first === 'ignore') {
                    exception_variable.warn('unexpected_a');
                }
            } else {
                if (this.first !== 'ignore') {
                    exception_variable.warn('expected_a_b', 'ignore',
                        exception_variable.string);
                }
            }
            exception_variable.dead = true;
        }
        if (next_token.id === 'finally') {
            one_space();
            advance('finally');
            one_space();
            this.third = block('finally');
        } else if (!this.second) {
            next_token.stop('expected_a_b', 'catch', artifact());
        }
        return this;
    });

    labeled_stmt('while', function () {
        one_space();
        var paren = next_token;
        funct.loopage += 1;
        advance('(');
        step_in('control');
        no_space();
        edge();
        this.arity = 'statement';
        this.first = expected_relation(expression(0));
        if (this.first.id !== 'true') {
            expected_condition(this.first, 'unexpected_a');
        }
        no_space();
        step_out(')', paren);
        one_space();
        this.block = block('while');
        if (this.block.disrupt) {
            prev_token.warn('strange_loop');
        }
        funct.loopage -= 1;
        return this;
    });

    reserve('with');

    labeled_stmt('switch', function () {

// switch.first         the switch expression
// switch.second        the array of cases. A case is 'case' or 'default' token:
//    case.first        the array of case expressions
//    case.second       the array of statements
// If all of the arrays of statements are disrupt, then the switch is disrupt.

        var cases = [],
            old_in_block = in_block,
            particular,
            that = token,
            the_case = next_token;

        function find_duplicate_case(value) {
            if (are_similar(particular, value)) {
                value.warn('duplicate_a');
            }
        }

        one_space();
        advance('(');
        no_space();
        step_in();
        this.arity = 'statement';
        this.first = expected_condition(expected_relation(expression(0)));
        no_space();
        step_out(')', the_case);
        one_space();
        advance('{');
        step_in();
        in_block = true;
        this.second = [];
        if (that.from !== next_token.from && !option.white) {
            next_token.warn('expected_a_at_b_c', next_token.string, that.from, next_token.from);
        }
        while (next_token.id === 'case') {
            the_case = next_token;
            the_case.first = [];
            the_case.arity = 'case';
            for (;;) {
                spaces();
                edge('case');
                advance('case');
                one_space();
                particular = expression(0);
                cases.forEach(find_duplicate_case);
                cases.push(particular);
                the_case.first.push(particular);
                if (particular.id === 'NaN') {
                    particular.warn('unexpected_a');
                }
                no_space_only();
                advance(':');
                if (next_token.id !== 'case') {
                    break;
                }
            }
            spaces();
            the_case.second = statements();
            if (the_case.second && the_case.second.length > 0) {
                if (!the_case.second[the_case.second.length - 1].disrupt) {
                    next_token.warn('missing_a_after_b', 'break', 'case');
                }
            } else {
                next_token.warn('empty_case');
            }
            this.second.push(the_case);
        }
        if (this.second.length === 0) {
            next_token.warn('missing_a', 'case');
        }
        if (next_token.id === 'default') {
            spaces();
            the_case = next_token;
            the_case.arity = 'case';
            edge('case');
            advance('default');
            no_space_only();
            advance(':');
            spaces();
            the_case.second = statements();
            if (the_case.second && the_case.second.length > 0) {
                this.disrupt = the_case.second[the_case.second.length - 1].disrupt;
            } else {
                the_case.warn('empty_case');
            }
            this.second.push(the_case);
        }
        if (this.break) {
            this.disrupt = false;
        }
        spaces();
        step_out('}', this);
        in_block = old_in_block;
        return this;
    });

    stmt('debugger', function () {
        if (!option.debug) {
            this.warn('unexpected_a');
        }
        this.arity = 'statement';
        return this;
    });

    labeled_stmt('do', function () {
        funct.loopage += 1;
        one_space();
        this.arity = 'statement';
        this.block = block('do');
        if (this.block.disrupt) {
            prev_token.warn('strange_loop');
        }
        one_space();
        advance('while');
        var paren = next_token;
        one_space();
        advance('(');
        step_in();
        no_space();
        edge();
        this.first = expected_condition(expected_relation(expression(0)), 'unexpected_a');
        no_space();
        step_out(')', paren);
        funct.loopage -= 1;
        return this;
    });

    labeled_stmt('for', function () {

        var blok, filter, master, ok = false, paren = next_token, value;
        this.arity = 'statement';
        funct.loopage += 1;
        advance('(');
        if (next_token.id === ';') {
            no_space();
            advance(';');
            no_space();
            advance(';');
            no_space();
            advance(')');
            blok = block('for');
        } else {
            step_in('control');
            spaces(this, paren);
            no_space();
            if (next_token.id === 'var') {
                next_token.stop('move_var');
            }
            edge();
            if (peek(0).id === 'in') {
                this.forin = true;
                value = expression(1000);
                master = value.master;
                if (!master) {
                    value.stop('bad_in_a');
                }
                if (master.kind !== 'var' || master.function !== funct ||
                        !master.writeable || master.dead) {
                    value.warn('bad_in_a');
                }
                master.init = true;
                master.used -= 1;
                this.first = value;
                advance('in');
                this.second = expression(20);
                step_out(')', paren);
                blok = block('for');
                if (!option.forin) {
                    if (blok.length === 1 && typeof blok[0] === 'object') {
                        if (blok[0].id === 'if' && !blok[0].else) {
                            filter = blok[0].first;
                            while (filter.id === '&&') {
                                filter = filter.first;
                            }
                            switch (filter.id) {
                            case '===':
                            case '!==':
                                ok = filter.first.id === '['
                                    ? are_similar(filter.first.first, this.second) &&
                                        are_similar(filter.first.second, this.first)
                                    : filter.first.id === 'typeof' &&
                                        filter.first.first.id === '[' &&
                                        are_similar(filter.first.first.first, this.second) &&
                                        are_similar(filter.first.first.second, this.first);
                                break;
                            case '(':
                                ok = filter.first.id === '.' && ((
                                    are_similar(filter.first.first, this.second) &&
                                    filter.first.second.string === 'hasOwnProperty' &&
                                    are_similar(filter.second[0], this.first)
                                ) || (
                                    filter.first.first.id === '.' &&
                                    filter.first.first.first.first &&
                                    filter.first.first.first.first.string === 'Object' &&
                                    filter.first.first.first.id === '.' &&
                                    filter.first.first.first.second.string === 'prototype' &&
                                    filter.first.first.second.string === 'hasOwnProperty' &&
                                    filter.first.second.string === 'call' &&
                                    are_similar(filter.second[0], this.second) &&
                                    are_similar(filter.second[1], this.first)
                                ));
                                break;
                            }
                        } else if (blok[0].id === 'switch') {
                            ok = blok[0].id === 'switch' &&
                                blok[0].first.id === 'typeof' &&
                                blok[0].first.first.id === '[' &&
                                are_similar(blok[0].first.first.first, this.second) &&
                                are_similar(blok[0].first.first.second, this.first);
                        }
                    }
                    if (!ok) {
                        this.warn('for_if');
                    }
                }
            } else {
                edge();
                this.first = [];
                for (;;) {
                    this.first.push(expression(0, 'for'));
                    if (next_token.id !== ',') {
                        break;
                    }
                    comma();
                }
                semicolon();
                edge();
                this.second = expected_relation(expression(0));
                if (this.second.id !== 'true') {
                    expected_condition(this.second, 'unexpected_a');
                }
                semicolon(token);
                if (next_token.id === ';') {
                    next_token.stop('expected_a_b', ')', ';');
                }
                this.third = [];
                edge();
                for (;;) {
                    this.third.push(expression(0, 'for'));
                    if (next_token.id !== ',') {
                        break;
                    }
                    comma();
                }
                no_space();
                step_out(')', paren);
                one_space();
                blok = block('for');
            }
        }
        if (blok.disrupt) {
            prev_token.warn('strange_loop');
        }
        this.block = blok;
        funct.loopage -= 1;
        return this;
    });

    function optional_label(that) {
        var label = next_token.string,
            master;
        that.arity = 'statement';
        if (!funct.breakage || (!option.continue && that.id === 'continue')) {
            that.warn('unexpected_a');
        } else if (next_token.identifier && token.line === next_token.line) {
            one_space_only();
            master = scope[label];
            if (!master || master.kind !== 'label') {
                next_token.warn('not_a_label');
            } else if (master.dead || master.function !== funct) {
                next_token.warn('not_a_scope');
            } else {
                master.used += 1;
                if (that.id === 'break') {
                    master.statement.break = true;
                }
                if (funct.breakage[funct.breakage.length - 1] === master.statement) {
                    next_token.warn('unexpected_a');
                }
            }
            that.first = next_token;
            advance();
        } else {
            if (that.id === 'break') {
                funct.breakage[funct.breakage.length - 1].break = true;
            }
        }
        return that;

    }

    disrupt_stmt('break', function () {
        return optional_label(this);
    });

    disrupt_stmt('continue', function () {
        return optional_label(this);
    });

    disrupt_stmt('return', function () {
        if (funct === global_funct) {
            this.warn('unexpected_a');
        }
        this.arity = 'statement';
        if (next_token.id !== ';' && next_token.line === token.line) {
            if (option.closure) {
                spaces();
            } else {
                one_space_only();
            }
            if (next_token.id === '/' || next_token.id === '(regexp)') {
                next_token.warn('wrap_regexp');
            }
            this.first = expression(0);
            if (this.first.assign) {
                this.first.warn('unexpected_a');
            }
        }
        return this;
    });

    disrupt_stmt('throw', function () {
        this.arity = 'statement';
        one_space_only();
        this.first = expression(20);
        return this;
    });


//  Superfluous reserved words

    reserve('class');
    reserve('const');
    reserve('enum');
    reserve('export');
    reserve('extends');
    reserve('import');
    reserve('super');

// Harmony reserved words

    reserve('implements');
    reserve('interface');
    reserve('let');
    reserve('package');
    reserve('private');
    reserve('protected');
    reserve('public');
    reserve('static');
    reserve('yield');


// Parse JSON

    function json_value() {

        function json_object() {
            var brace = next_token, object = Object.create(null);
            advance('{');
            if (next_token.id !== '}') {
                while (next_token.id !== '(end)') {
                    while (next_token.id === ',') {
                        next_token.warn('unexpected_a');
                        advance(',');
                    }
                    if (next_token.id !== '(string)') {
                        next_token.warn('expected_string_a');
                    }
                    if (object[next_token.string] === true) {
                        next_token.warn('duplicate_a');
                    } else if (next_token.string === '__proto__') {
                        next_token.warn('dangling_a');
                    } else {
                        object[next_token.string] = true;
                    }
                    advance();
                    advance(':');
                    json_value();
                    if (next_token.id !== ',') {
                        break;
                    }
                    advance(',');
                    if (next_token.id === '}') {
                        token.warn('unexpected_a');
                        break;
                    }
                }
            }
            advance('}', brace);
        }

        function json_array() {
            var bracket = next_token;
            advance('[');
            if (next_token.id !== ']') {
                while (next_token.id !== '(end)') {
                    while (next_token.id === ',') {
                        next_token.warn('unexpected_a');
                        advance(',');
                    }
                    json_value();
                    if (next_token.id !== ',') {
                        break;
                    }
                    advance(',');
                    if (next_token.id === ']') {
                        token.warn('unexpected_a');
                        break;
                    }
                }
            }
            advance(']', bracket);
        }

        switch (next_token.id) {
        case '{':
            json_object();
            break;
        case '[':
            json_array();
            break;
        case 'true':
        case 'false':
        case 'null':
        case '(number)':
        case '(string)':
            advance();
            break;
        case '-':
            advance('-');
            no_space_only();
            advance('(number)');
            break;
        default:
            next_token.stop('unexpected_a');
        }
    }


// The actual JSLINT function itself.

    itself = function JSLint(the_source, the_option) {

        var i, predef, tree;
        itself.errors = [];
        itself.tree = '';
        itself.properties = '';
        begin = prev_token = token = next_token =
            Object.create(syntax['(begin)']);
        tokens = [];
        predefined = Object.create(null);
        add_to_predefined(standard);
        property = Object.create(null);
        if (the_option) {
            option = Object.create(the_option);
            predef = option.predef;
            if (predef) {
                if (Array.isArray(predef)) {
                    for (i = 0; i < predef.length; i += 1) {
                        predefined[predef[i]] = true;
                    }
                } else if (typeof predef === 'object') {
                    add_to_predefined(predef);
                }
            }
        } else {
            option = Object.create(null);
        }
        option.indent = +option.indent || 4;
        option.maxerr = +option.maxerr || 50;
        global_scope = scope = Object.create(null);
        global_funct = funct = {
            scope: scope,
            loopage: 0,
            level: 0
        };
        functions = [funct];
        block_var = [];

        comments = [];
        comments_off = false;
        in_block = false;
        indent = null;
        json_mode = false;
        lookahead = [];
        node_js = false;
        prereg = true;
        strict_mode = false;
        var_mode = null;
        warnings = 0;
        lex.init(the_source);

        assume();

        try {
            advance();
            if (next_token.id === '(number)') {
                next_token.stop('unexpected_a');
            } else {
                switch (next_token.id) {
                case '{':
                case '[':
                    comments_off = true;
                    json_mode = true;
                    json_value();
                    break;
                default:

// If the first token is a semicolon, ignore it. This is sometimes used when
// files are intended to be appended to files that may be sloppy. A sloppy
// file may be depending on semicolon insertion on its last line.

                    step_in(1);
                    if (next_token.id === ';' && !node_js) {
                        next_token.edge = true;
                        advance(';');
                    }
                    tree = statements();
                    begin.first = tree;
                    itself.tree = begin;
                    if (tree.disrupt) {
                        prev_token.warn('weird_program');
                    }
                }
            }
            indent = null;
            advance('(end)');
            itself.property = property;
        } catch (e) {
            if (e) {        // ~~
                itself.errors.push({
                    reason    : e.message,
                    line      : e.line || next_token.line,
                    character : e.character || next_token.from
                }, null);
            }
        }
        return itself.errors.length === 0;
    };

    function unique(array) {
        array = array.sort();
        var i, length = 0, previous, value;
        for (i = 0; i < array.length; i += 1) {
            value = array[i];
            if (value !== previous) {
                array[length] = value;
                previous = value;
                length += 1;
            }
        }
        array.length = length;
        return array;
    }

// Data summary.

    itself.data = function () {
        var data = {functions: []},
            function_data,
            i,
            the_function,
            the_scope;
        data.errors = itself.errors;
        data.json = json_mode;
        data.global = unique(Object.keys(global_scope));

        function selects(name) {
            var kind = the_scope[name].kind;
            switch (kind) {
            case 'var':
            case 'exception':
            case 'label':
                function_data[kind].push(name);
                break;
            }
        }

        for (i = 1; i < functions.length; i += 1) {
            the_function = functions[i];
            function_data = {
                name: the_function.name,
                line: the_function.line,
                level: the_function.level,
                parameter: the_function.parameter,
                var: [],
                exception: [],
                closure: unique(the_function.closure),
                outer: unique(the_function.outer),
                global: unique(the_function.global),
                label: []
            };
            the_scope = the_function.scope;
            Object.keys(the_scope).forEach(selects);
            function_data.var.sort();
            function_data.exception.sort();
            function_data.label.sort();
            data.functions.push(function_data);
        }
        data.tokens = tokens;
        return data;
    };

    itself.error_report = function (data) {
        var evidence, i, output = [], warning;
        if (data.errors.length) {
            if (data.json) {
                output.push('<cite>JSON: bad.</cite><br>');
            }
            for (i = 0; i < data.errors.length; i += 1) {
                warning = data.errors[i];
                if (warning) {
                    evidence = warning.evidence || '';
                    output.push('<cite>');
                    if (isFinite(warning.line)) {
                        output.push('<address>line ' +
                            String(warning.line) +
                            ' character ' + String(warning.character) +
                            '</address>');
                    }
                    output.push(warning.reason.entityify() + '</cite>');
                    if (evidence) {
                        output.push('<pre>' + evidence.entityify() + '</pre>');
                    }
                }
            }
        }
        return output.join('');
    };


    itself.report = function (data) {
        var dl, i, j, names, output = [], the_function;

        function detail(h, array) {
            var comma_needed = false;
            if (array.length) {
                output.push("<dt>" + h + "</dt><dd>");
                array.forEach(function (item) {
                    output.push((comma_needed ? ', ' : '') + item);
                    comma_needed = true;
                });
                output.push("</dd>");
            }
        }

        output.push('<dl class=level0>');
        if (data.global.length) {
            detail('global', data.global);
            dl = true;
        } else if (data.json) {
            if (!data.errors.length) {
                output.push("<dt>JSON: good.</dt>");
            }
        } else {
            output.push("<dt><i>No new global variables introduced.</i></dt>");
        }
        if (dl) {
            output.push("</dl>");
        } else {
            output[0] = '';
        }

        if (data.functions) {
            for (i = 0; i < data.functions.length; i += 1) {
                the_function = data.functions[i];
                names = [];
                if (the_function.params) {
                    for (j = 0; j < the_function.params.length; j += 1) {
                        names[j] = the_function.params[j].string;
                    }
                }
                output.push('<dl class=level' + the_function.level +
                    '><address>line ' + String(the_function.line) +
                    '</address>' + the_function.name.entityify());
                detail('parameter', the_function.parameter);
                detail('variable', the_function.var);
                detail('exception', the_function.exception);
                detail('closure', the_function.closure);
                detail('outer', the_function.outer);
                detail('global', the_function.global);
                detail('label', the_function.label);
                output.push('</dl>');
            }
        }
        return output.join('');
    };

    itself.properties_report = function (property) {
        if (!property) {
            return '';
        }
        var i,
            key,
            keys = Object.keys(property).sort(),
            mem = '   ',
            name,
            not_first = false,
            output = ['/*properties'];
        for (i = 0; i < keys.length; i += 1) {
            key = keys[i];
            if (property[key] > 0) {
                if (not_first) {
                    mem += ',';
                }
                name = ix.test(key)
                    ? key
                    : '\'' + key.replace(nx, sanitize) + '\'';
                if (mem.length + name.length >= 80) {
                    output.push(mem);
                    mem = '    ';
                } else {
                    mem += ' ';
                }
                mem += name;
                not_first = true;
            }
        }
        output.push(mem, '*/\n');
        return output.join('\n');
    };

    itself.color = function (data) {
        var from,
            i = 1,
            level,
            line,
            result = [],
            thru,
            data_token = data.tokens[0];
        while (data_token && data_token.id !== '(end)') {
            from = data_token.from;
            line = data_token.line;
            thru = data_token.thru;
            level = data_token.function.level;
            do {
                thru = data_token.thru;
                data_token = data.tokens[i];
                i += 1;
            } while (data_token && data_token.line === line &&
                    data_token.from - thru < 5 &&
                    level === data_token.function.level);
            result.push({
                line: line,
                level: level,
                from: from,
                thru: thru
            });
        }
        return result;
    };

    itself.jslint = itself;

    itself.edition = '2014-07-08';

    return itself;
}());



// init lib jslintEs6
// 2016-10-24T18:30:02Z
// https://github.com/douglascrockford/JSLint/blob/4075c9955e6eefdfafc1a6d9c1183e6147cd73f1/jslint.js
// utility2-uglifyjs https://raw.githubusercontent.com/douglascrockford/JSLint/4075c9955e6eefdfafc1a6d9c1183e6147cd73f1/jslint.js
/* istanbul ignore next */
var jslint=function(){"use strict";function t(){return Object.create(null)}function n
(e,t,n){t.forEach(function(t){e[t]=n})}function D(e){return e>="a"&&e<="z\uffff"||
e>="A"&&e<="Z\uffff"}function P(e,t){return e.replace(l,function(e,n){var r=t[n]
;return r!==undefined?r:e})}function lt(e){return e===undefined&&(e=G),e.id==="(string)"||
e.id==="(number)"?String(e.value):e.id}function ct(e){return e===undefined&&(e=G
),e.line+W}function ht(e){return e===undefined&&(e=G),e.from+W}function pt(e,t,n
,r,i,s,o){var u={name:"JSLintError",column:n,line:t,code:e};return r!==undefined&&
(u.a=r),i!==undefined&&(u.b=i),s!==undefined&&(u.c=s),o!==undefined&&(u.d=o),u.message=
P(f[e]||e,u),ft.push(u),typeof Y.maxerr=="number"&&ft.length===Y.maxerr?dt("too_many"
,t,n):u}function dt(e,t,n,r,i,s,o){throw pt(e,t,n,r,i,s,o)}function vt(e,t,n,r,i
,s){t===undefined&&(t=G);if(t.warning===undefined)return t.warning=pt(e,t.line,t
.from,n||lt(t),r,i,s),t.warning}function mt(e,t,n,r,i,s){throw t===undefined&&(t=
G),delete t.warning,vt(e,t,n,r,i,s)}function gt(e){function M(){var e;return s=0
,a+=1,O=K[a],O!==undefined&&(e=O.search(w),e>=0&&(Y.white||pt("use_spaces",a,e+1
),O=O.replace(w," ")),e=O.search(h),e>=0&&pt("unsafe",a,s+e,"U+"+O.charCodeAt(e)
.toString(16)),Y.maxlen&&Y.maxlen<O.length?pt("too_long",a,O.length):!Y.white&&O
.slice(-1)===" "&&pt("unexpected_trailing_space",a,O.length-1)),O}function _(){A=
A.slice(0,-1)}function P(e){return e!==undefined&&i!==e?dt(i===""?"expected_a":"expected_a_b"
,a,s-1,e,i):(O?(i=O.charAt(0),O=O.slice(1),A+=i):(i="",A+=" "),s+=1,i)}function H
(){return A?(i=A.slice(-1),O=i+O,s-=1,_()):i="",i}function B(e,t){var n=O.match(
e);return n?(i=n[1],s+=i.length,O=n[2],A+=i):(i="",t||pt("expected_digits_after_a"
,a,s,A)),i.length}function j(e){switch(P("\\")){case"\\":case"/":case"b":case"f"
:case"n":case"r":case"t":break;case"u":if(P("u")==="{"){J&&pt("unexpected_a",a,s-1
,i),B(N)>5&&pt("too_many_digits",a,s-1),Y.es6||pt("es6",a,s,"u{"),P()!=="}"&&dt("expected_a_before_b"
,a,s,"}",i),P();return}H(),B(N,!0)<4&&pt("expected_four_digits",a,s-1);break;case""
:return dt("unclosed_string",a,s);default:(!e||e.indexOf(i)<0)&&pt("unexpected_a_before_b"
,a,s-2,"\\",i)}P()}function R(e,t,n){var r={from:u,id:e,identifier:!!n,line:a,nr
:f,thru:s};return st[f]=r,f+=1,e!=="(comment)"&&e!==";"&&(q=!1),t!==undefined&&(
r.value=t),l.line===a&&l.thru===u&&(e==="(comment)"||e==="(regexp)"||e==="/")&&(
l.id==="(comment)"||l.id==="(regexp)")&&vt("expected_space_a_b",r,lt(l),lt(r)),l
.id==="."&&e==="(number)"&&vt("expected_a_before_b",l,"0","."),p.id==="."&&r.identifier&&
(r.dot=!0),l=r,l.id!=="(comment)"&&(p=l),r}function U(e,i){var s=i.match(S);if(s
){var o,u=s[1],a=s[2];switch(e.directive){case"jslint":o=r[u];switch(typeof o){case"boolean"
:case"object":switch(a){case"true":case"":case undefined:Y[u]=!0,Array.isArray(o
)&&n(F,o,!1);break;case"false":Y[u]=!1;break;default:vt("bad_option_a",e,u+":"+a
)}break;case"number":isFinite(+a)?Y[u]=+a:vt("bad_option_a",e,u+":"+a);break;default:
vt("bad_option_a",e,u)}break;case"property":ot===undefined&&(ot=t()),ot[u]=!0;break;
case"global":a&&vt("bad_option_a",e,u+":"+a),F[u]=!1,Q=e}return U(e,s[3])}if(i)return mt
("bad_directive_a",e,i)}function z(e){var t=R("(comment)",e);Array.isArray(e)&&(
e=e.join(" ")),!Y.devel&&b.test(e)&&vt("todo_comment",t);var n=e.match(E);return n&&
(q?(t.directive=n[1],U(t,n[2])):pt("misplaced_directive_a",a,u,n[1]),I.push(t)),
t}function W(){function o(){switch(i){case"?":case"*":case"+":P();break;case"{":
B(T,!0)===0&&pt("expected_a",a,s,"0"),P()===","&&(B(T,!0),P()),P("}");break;default:
return}i==="?"&&P("?")}function f(){switch(i){case"\\":return j("BbDdSsWw-[]^"),!0
;case"[":case"]":case"/":case"^":case"-":case"":return!1;case"`":return et&&pt("unexpected_a"
,a,s,"`"),P(),!0;case" ":return pt("expected_a_before_b",a,s,"\\"," "),P(),!0;default:
return P(),!0}}function l(){if(f()){if(i==="-"){P("-");if(!f())return dt("unexpected_a"
,a,s-1,"-")}return l()}}function c(){P("["),i==="^"&&P("^"),function e(){l();if(
i!=="]"&&i!=="")return pt("expected_a_before_b",a,s,"\\",i),P(),e()}(),P("]")}function h
(){function t(){P("(");if(i==="?"){P("?");switch(i){case":":case"=":case"!":P();
break;default:P(":")}}else i===":"&&pt("expected_a_before_b",a,s,"?",":");h(),P(")"
)}function n(){switch(i){case"[":return c(),!0;case"\\":return j("BbDdSsWw^${}[]():=!.-|*+?"
),!0;case"(":return t(),!0;case"/":case"|":case"]":case")":case"}":case"{":case"?"
:case"+":case"*":case"":return!1;case"`":et&&pt("unexpected_a",a,s-1,"`");break;
case" ":pt("expected_a_b",a,s-1,"\\s"," ");break;case"$":O.charAt(0)!=="/"&&(e=!0
);break;case"^":A!=="^"&&(e=!0)}return P(),!0}function r(e){if(n())return o(),r(!0
);e||pt("expected_regexp_factor_a",a,s,i)}r();if(i==="|")return P("|"),h()}var e=!1
,n,r;A="",P(),i==="="&&pt("expected_a_before_b",a,s,"\\","="),h(),_(),r=A,P("/")
;var p={g:!0,i:!0,m:!0,u:6,y:6},d=t();return function v(){if(D(i)){switch(p[i]){
case!0:break;case 6:Y.es6||pt("es6",a,s,i);break;default:pt("unexpected_a",a,s,i
)}return p[i]=!1,d[i]=!0,P(),v()}}(),H(),i==="/"||i==="*"?dt("unexpected_a",a,u,
i):(n=R("(regexp)",i),n.flag=d,n.value=r,e&&!d.m&&pt("missing_m",a,s),n)}function X
(e){var t;return A="",P(),function n(){switch(i){case e:return _(),t=R("(string)"
,A),t.quote=e,t;case"\\":j(e);break;case"":return dt("unclosed_string",a,s);case"`"
:et&&pt("unexpected_a",a,s,"`"),P("`");break;default:P()}return n()}()}function V
(){i==="."&&(B(T),P());if(i==="E"||i==="e")P(),i!=="+"&&i!=="-"&&H(),B(T),P()}function G
(){if(A==="0")switch(P()){case".":V();break;case"b":B(k),P();break;case"o":B(C),
P();break;case"x":B(N),P()}else P(),V();return i>="0"&&i<="9"||i>="a"&&i<="z"||i>="A"&&
i<="Z"?dt("unexpected_a_after_b",a,s-1,A.slice(-1),A.slice(0,-1)):(H(),R("(number)"
,A))}function Z(){var e,t=0,n=0,r,i,o;if(!O)return O=M(),u=0,O===undefined?et?dt
("unclosed_mega",v,d):R("(end)"):Z();u=s,i=O.match(x);if(!i)return dt("unexpected_char_a"
,a,s,O.charAt(0));A=i[1],s+=A.length,O=i[5];if(i[2])return Z();if(i[3])return R(
A,undefined,!0);if(i[4])return G(A);switch(A){case'"':return X(A);case"'":return Y
.single||pt("use_double",a,s),X(A);case"`":if(et)return dt("expected_a_b",a,s,"}"
,"`");return A="",d=u,v=a,et=!0,R("`"),u+=1,function f(){var e=O.search(L);if(e<0
)return A+=O+"\n",M()===undefined?dt("unclosed_mega",v,d):f();A+=O.slice(0,e),s+=
e,O=O.slice(e),O.charAt(0)==="\\"&&dt("escape_mega",a,e),R("(string)",A).quote="`"
,A="";if(O.charAt(0)==="$")return s+=2,R("${"),O=O.slice(2),function t(){var e=Z
().id;if(e==="{")return dt("expected_a_b",a,s,"}","{");if(e!=="}")return t()}(),
f()}(),O=O.slice(1),s+=1,et=!1,R("`");case"//":return A=O,O="",o=z(A),et&&vt("unexpected_comment"
,o,"`"),o;case"/*":return e=[],O.charAt(0)==="/"&&pt("unexpected_a",a,s+t,"/"),function l
(){if(O>""){t=O.search(m);if(t>=0)return;n=O.search(g),n>=0&&pt("nested_comment"
,a,s+n)}return e.push(O),O=M(),O===undefined?dt("unclosed_comment",a,s):l()}(),A=
O.slice(0,t),n=A.search(y),n>=0&&pt("nested_comment",a,s+n),e.push(A),s+=t+2,O=O
.slice(t+2),z(e);case"/":if(p.identifier){if(!p.dot)switch(p.id){case"return":return W
();case"(begin)":case"case":case"delete":case"in":case"instanceof":case"new":case"typeof"
:case"void":case"yield":return o=W(),mt("unexpected_a",o)}}else{r=p.id.charAt(p.
id.length-1);if("(,=:?[".indexOf(r)>=0)return W();if("!&|{};~+-*%/^<>".indexOf(r
)>=0)return o=W(),vt("wrap_regexp",o),o}O.charAt(0)==="/"&&(s+=1,O=O.slice(1),A="/="
,pt("unexpected_a",a,s,"/="))}return R(A)}K=Array.isArray(e)?e:e.split(c),st=[];
var i,s=0,o,u,a=-1,f=0,l=$,p=$,d,v,A,O;o=Z(),J=o.id==="{"||o.id==="[";for(;;)if(
Z().id==="(end)")break}function yt(e){var t=e.id;if(t==="(string)"){t=e.value;if(!
p.test(t))return t}else if(t==="`"){if(e.value.length===1){t=e.value[0].value;if(!
p.test(t))return t}}else if(!e.identifier)return mt("expected_identifier_a",e);return typeof
Z[t]=="number"?Z[t]+=1:(ot!==undefined?ot[t]!==!0&&vt("unregistered_property_a",
e):e.identifier&&v.test(t)&&vt("bad_property_a",e),Z[t]=1),t}function bt(){var e=
st[it];return it+=1,e.id==="(comment)"?(J&&vt("unexpected_a",e),bt()):e}function wt
(){var e=it,t=bt(!0);return it=e,t}function Et(e,t){rt.identifier&&rt.id!=="function"?
H=rt.id:rt.id==="(string)"&&p.test(rt.value)&&(H=rt.value);if(e!==undefined&&G.id!==
e)return t===undefined?mt("expected_a_b",G,e,lt()):mt("expected_a_b_from_c_d",G,
e,lt(t),ct(t),lt(G));rt=G,G=bt(),G.id==="(end)"&&(it-=1)}function St(){function n
(){var e=G,n=t(),r=[];return e.expression=r,Et("{"),G.id!=="}"&&function i(){var e
,t;G.quote!=='"'&&vt("unexpected_a",G,G.quote),e=G,Et("(string)"),n[rt.value]!==
undefined?vt("duplicate_a",rt):rt.value==="__proto__"?vt("bad_property_a",rt):n[
rt.value]=rt,Et(":"),t=St(),t.label=e,r.push(t);if(G.id===",")return Et(","),i()
}(),Et("}",e),e}function r(){var e=G,t=[];return e.expression=t,Et("["),G.id!=="]"&&
function n(){t.push(St());if(G.id===",")return Et(","),n()}(),Et("]",e),e}var e;
switch(G.id){case"{":return n();case"[":return r();case"true":case"false":case"null"
:return Et(),rt;case"(number)":return M.test(G.value)||vt("unexpected_a"),Et(),rt
;case"(string)":return G.quote!=='"'&&vt("unexpected_a",G,G.quote),Et(),rt;case"-"
:return e=G,e.arity="unary",Et("-"),Et("(number)"),e.expression=rt,e;default:mt("unexpected_a"
)}}function xt(e,t,n){var r=e.id;if(nt[r]!==undefined&&r!=="ignore")vt("reserved_a"
,e);else{var i=X.context[r];i?vt("redefinition_a_b",e,e.id,i.line+W):(tt.forEach
(function(e){var t=e.context[r];t!==undefined&&(i=t)}),i&&(r==="ignore"?i.role==="variable"&&
vt("unexpected_a",e):(t!=="exception"||i.role!=="exception")&&t!=="parameter"&&vt
("redefinition_a_b",e,e.id,i.line+W)),X.context[r]=e,e.dead=!0,e.function=X,e.init=!1
,e.role=t,e.used=0,e.writable=!n)}}function Tt(e,t){var n,r;t||Et(),r=nt[rt.id];
if(r!==undefined&&r.nud!==undefined)n=r.nud();else{if(!rt.identifier)return mt("unexpected_a"
,rt);n=rt,n.arity="variable"}return function i(){r=nt[G.id];if(r!==undefined&&r.
led!==undefined&&e<r.lbp)return Et(),n=r.led(n),i()}(),n}function Nt(){var e=G,t
;e.free=!0,Et("("),t=Tt(0),Et(")"),t.wrapped===!0&&vt("unexpected_a",e);switch(t
.id){case"?":case"~":case"&":case"|":case"^":case"<<":case">>":case">>>":case"+"
:case"-":case"*":case"/":case"%":case"typeof":case"(number)":case"(string)":vt("unexpected_a"
,t)}return t}function Ct(e){return e.id==="(regexp)"||e.id==="{"||e.id==="=>"||e
.id==="function"||e.id==="["&&e.arity==="unary"}function kt(e,t){if(e===t)return!0
;if(Array.isArray(e))return Array.isArray(t)&&e.length===t.length&&e.every(function(
e,n){return kt(e,t[n])});if(Array.isArray(t))return!1;if(e.id==="(number)"&&t.id==="(number)"
)return e.value===t.value;var n,r;e.id==="(string)"?n=e.value:e.id==="`"&&e.constant&&
(n=e.value[0]),t.id==="(string)"?r=t.value:t.id==="`"&&t.constant&&(r=t.value[0]
);if(typeof n=="string")return n===r;if(Ct(e)||Ct(t))return!1;if(e.arity===t.arity&&
e.id===t.id){if(e.id===".")return kt(e.expression,t.expression)&&kt(e.name,t.name
);switch(e.arity){case"unary":return kt(e.expression,t.expression);case"binary":
return e.id!=="("&&kt(e.expression[0],t.expression[0])&&kt(e.expression[1],t.expression
[1]);case"ternary":return kt(e.expression[0],t.expression[0])&&kt(e.expression[1
],t.expression[1])&&kt(e.expression[2],t.expression[2]);case"function":case"regexp"
:return!1;default:return!0}}return!1}function Lt(){G.id===";"?Et(";"):pt("expected_a_b"
,rt.line,rt.thru,";",lt(G)),H="anonymous"}function At(){var e,t,n,r;Et();if(rt.identifier&&
G.id===":"){t=rt,t.id==="ignore"&&vt("unexpected_a",t),Et(":");switch(G.id){case"do"
:case"for":case"switch":case"while":return xt(t,"label",!0),t.init=!0,t.dead=!1,
n=At(),n.label=t,n.statement=!0,n;default:Et(),vt("unexpected_label_a",t)}}return e=
rt,e.statement=!0,r=nt[e.id],r!==undefined&&r.fud!==undefined?(r.disrupt=!1,r.statement=!0
,n=r.fud()):(n=Tt(0,!0),n.wrapped&&n.id!=="("&&vt("unexpected_a",e),Lt()),t!==undefined&&
(t.dead=!0),n}function Ot(){var e=[];return function t(n){var r;switch(G.id){case"}"
:case"case":case"default":case"else":case"(end)":break;default:return r=At(),e.push
(r),n&&vt("unreachable_a",r),t(r.disrupt)}}(!1),e}function Mt(e){X===$&&vt("unexpected_at_top_level_a"
,e)}function _t(e){B!==$&&vt("misplaced_a",e)}function Dt(e){var t,n;return e!=="naked"&&
Et("{"),n=rt,n.arity="statement",n.body=e==="body",e==="body"&&tt.length===1&&G.
value==="use strict"&&(n.strict=G,G.statement=!0,Et("(string)"),Et(";")),t=Ot(),
n.block=t,t.length===0?(!Y.devel&&e!=="ignore"&&vt("empty_block",n),n.disrupt=!1
):n.disrupt=t[t.length-1].disrupt,Et("}"),n}function Pt(e){return e.id==="."||e.
arity==="variable"||e.id==="["&&e.arity==="binary"?!0:(vt("bad_assignment_a",e),!1
)}function Ht(e,t){var n=e.id;return!e.identifier&&(e.arity!=="binary"||n!=="."&&
n!=="("&&n!=="[")?(vt("unexpected_a",t),!1):!0}function Bt(e,n){var r=nt[e];return r===
undefined&&(r=t(),r.id=e,r.lbp=n||0,nt[e]=r),r}function jt(e){var t=Bt(e,20);return t
.led=function(t){var n=rt,r;n.arity="assignment",r=Tt(19),e==="="&&t.arity==="variable"?
(n.names=t,n.expression=r):n.expression=[t,r];switch(r.arity){case"assignment":case"pre"
:case"post":vt("unexpected_a",r)}return!Y.es6||t.arity!=="unary"||t.id!=="["&&t.
id!=="{"?Pt(t):vt("expected_a_before_b",t,"const",t.id),n},t}function Ft(e,t,n){
var r=Bt(e);return r.constant=!0,r.nud=typeof n=="function"?n:function(){return rt
.constant=!0,n!==undefined&&(rt.value=n),rt},r.type=t,r.value=n,r}function It(e,
t,n){var r=Bt(e,t);return r.led=function(e){var r=rt;return r.arity="binary",n!==
undefined?n(e):(r.expression=[e,Tt(t)],r)},r}function qt(e){var t=Bt(e,150);return t
.led=function(e){return rt.expression=e,rt.arity="post",Pt(rt.expression),rt},t}
function Rt(e){var t=Bt(e);return t.nud=function(){var e=rt;return e.arity="pre"
,e.expression=Tt(150),Pt(e.expression),e},t}function Ut(e,t){var n=Bt(e);return n
.nud=function(){var e=rt;return e.arity="unary",typeof t=="function"?t():(e.expression=
Tt(150),e)},n}function zt(e,t){var n=Bt(e);return n.fud=function(){return rt.arity="statement"
,t()},n}function Wt(e,t){var n=Bt(e,30);return n.led=function(e){var n=rt,r=Tt(20
);return Et(t),rt.arity="ternary",n.arity="ternary",n.expression=[e,r,Tt(10)],n}
,n}function Xt(){var e=rt;return Y.es6||vt("es6",e),e.value=[],e.expression=[],G
.id!=="`"&&function t(){Et("(string)"),e.value.push(rt);if(G.id==="${")return Et
("${"),e.expression.push(Tt(0)),Et("}"),t()}(),Et("`"),e}function Vt(){var e=!1,
t=[],n=["("];return G.id!==")"&&G.id!=="(end)"&&function r(){var i=!1,s;if(G.id==="{"
){e=!0,Y.es6||vt("es6"),s=G,s.names=[],Et("{"),n.push("{"),function o(){var e=G;
if(!e.identifier)return mt("expected_identifier_a");yt(e),Et(),n.push(e.id);if(G
.id===":"){Et(":"),Et(),rt.label=e,e=rt;if(!e.identifier)return mt("expected_identifier_a"
)}s.names.push(e);if(G.id===",")return Et(","),n.push(", "),o()}(),t.push(s),Et("}"
),n.push("}");if(G.id===",")return Et(","),n.push(", "),r()}else if(G.id==="["){
e=!0,Y.es6||vt("es6"),s=G,s.names=[],Et("["),n.push("[]"),function u(){var e=G;if(!
e.identifier)return mt("expected_identifier_a");Et(),s.names.push(e);if(G.id===","
)return Et(","),u()}(),t.push(s),Et("]");if(G.id===",")return Et(","),n.push(", "
),r()}else{G.id==="..."&&(e=!0,Y.es6||vt("es6"),i=!0,n.push("..."),Et("..."));if(!
G.identifier)return mt("expected_identifier_a");s=G,t.push(s),Et(),n.push(s.id);
if(i)s.ellipsis=!0;else{G.id==="="&&(e=!0,Y.es6||mt("unexpected_statement_a"),Et
("="),s.expression=Tt(0));if(G.id===",")return Et(","),n.push(", "),r()}}}(),Et(")"
),n.push(")"),[t,n.join(""),e]}function $t(e){var n;if(e===undefined){e=rt;if(e.
arity==="statement"){if(!G.identifier)return mt("expected_identifier_a",G);n=G,xt
(n,"variable",!0),e.name=n,n.init=!0,n.calls=t(),Et()}else n===undefined&&(G.identifier?
(n=G,e.name=n,Et()):e.name=H)}else n=e.name;e.level=X.level+1,et&&vt("unexpected_a"
,e),X.loop>0&&vt("function_in_loop",e),e.context=t(),e.finally=0,e.loop=0,e.switch=0
,e.try=0,tt.push(X),V.push(e),X=e,e.arity!=="statement"&&typeof n=="object"&&(xt
(n,"function",!0),n.dead=!1,n.init=!0,n.used=1),Et("("),rt.free=!1,rt.arity="function"
;var r=Vt();return X.parameters=r[0],X.signature=r[1],X.complex=r[2],X.parameters
.forEach(function i(e){e.identifier?xt(e,"parameter",!1):e.names.forEach(i)}),e.
block=Dt("body"),e.arity==="statement"&&G.line===rt.line?mt("unexpected_a",G):((
G.id==="."||G.id==="[")&&vt("unexpected_a"),X=tt.pop(),e)}function Jt(e){G.id===";"&&
mt("wrap_assignment",rt),Et("=>");var n=rt;return n.arity="binary",n.name="=>",n
.level=X.level+1,V.push(n),X.loop>0&&vt("function_in_loop",n),n.context=t(),n.finally=0
,n.loop=0,n.switch=0,n.try=0,tt.push(X),X=n,n.parameters=e[0],n.signature=e[1],n
.complex=!0,n.parameters.forEach(function(e){xt(e,"parameter",!0)}),Y.es6||vt("es6"
,n),G.id==="{"?(vt("expected_a_b",n,"function","=>"),n.block=Dt("body")):n.expression=
Tt(0),X=tt.pop(),n}function Kt(){var e=rt,t=e.id==="const";return e.names=[],t?Y
.es6||vt("es6",e):at===undefined?(at=e.id,!Y.es6&&at!=="var"&&vt("es6",e)):e.id!==
at&&vt("expected_a_b",e,at,e.id),X.switch>0&&vt("var_switch",e),X.loop>0&&e.id==="var"&&
vt("var_loop",e),function n(){if(G.id==="{"&&e.id!=="var"){var r=G;r.names=[],Et
("{"),function o(){if(!G.identifier)return mt("expected_identifier_a",G);var e=G
;yt(e),Et();if(G.id===":"){Et(":");if(!G.identifier)return mt("expected_identifier_a"
,G);G.label=e,r.names.push(G),xt(G,"variable",t),Et()}else r.names.push(e),xt(e,"variable"
,t);if(G.id===",")return Et(","),o()}(),Et("}"),Et("="),r.expression=Tt(0),e.names
.push(r)}else if(G.id==="["&&e.id!=="var"){var i=G;i.names=[],Et("["),function u
(){var t;G.id==="..."&&(t=!0,Et("..."));if(!G.identifier)return mt("expected_identifier_a"
,G);var n=G;Et(),i.names.push(n),xt(n,"variable",e.id==="const");if(t)n.ellipsis=!0
;else if(G.id===",")return Et(","),u()}(),Et("]"),Et("="),i.expression=Tt(0),e.names
.push(i)}else{if(!G.identifier)return mt("expected_identifier_a",G);var s=G;Et()
,s.id==="ignore"&&vt("unexpected_a",s),xt(s,"variable",t);if(G.id==="="||t)Et("="
),s.expression=Tt(0),s.init=!0;e.names.push(s)}if(G.id===",")return Y.multivar||
vt("expected_a_b",G,";",","),Et(","),n()}(),e.open=e.names.length>1&&e.line!==e.
names[1].line,Lt(),e}function Qt(e){return function(n,r,i){var s=e[n],o;typeof r!="string"&&
(i=r,r="(all)"),s===undefined&&(s=t(),e[n]=s),o=s[r],o===undefined&&(o=[],s[r]=o
),o.push(i)}}function Gt(e){return function(t){var n=e[t.arity],r;n!==undefined&&
(r=n[t.id],r!==undefined&&r.forEach(function(e){return e(t)}),r=n["(all)"],r!==undefined&&
r.forEach(function(e){return e(t)}))}}function sn(e){if(e)if(Array.isArray(e))e.
forEach(sn);else{nn(e),sn(e.expression),e.id==="function"&&on(e.block);switch(e.
arity){case"post":case"pre":vt("unexpected_a",e);break;case"statement":case"assignment"
:vt("unexpected_statement_a",e)}rn(e)}}function on(e){if(e)if(Array.isArray(e))e
.forEach(on);else{nn(e),sn(e.expression);switch(e.arity){case"statement":case"assignment"
:break;case"binary":e.id!=="("&&vt("unexpected_expression_a",e);break;default:vt
(e.id==="(string)"&&e.value==="use strict"?"unexpected_a":"unexpected_expression_a"
,e)}on(e.block),on(e.else),rn(e)}}function un(e){if(e.arity==="variable"){var t=
X.context[e.id];if(t===undefined){tt.forEach(function(n){var r=n.context[e.id];r!==
undefined&&r.role!=="label"&&(t=r)});if(t===undefined){if(F[e.id]===undefined){vt
("undeclared_a",e);return}t={dead:!1,"function":$,id:e.id,init:!0,role:"variable"
,used:0,writable:!1},$.context[e.id]=t}t.closure=!0,X.context[e.id]=t}else t.role==="label"&&
vt("label_a",e);return t.dead&&vt("out_of_scope_a",e),t}}function an(e){e.init=!0
,e.dead=!1,B.live.push(e)}function fn(e){e.arity==="statement"&&B.body!==!0&&vt("unexpected_a"
,e),e.level===1&&(Q===!0||$.strict!==undefined||e.complex?e.id!=="=>"&&e.block.strict!==
undefined&&vt("unexpected_a",e.block.strict):e.block.strict===undefined&&vt("use_strict"
,e)),tt.push(X),j.push(B),X=e,B=e,e.live=[],typeof e.name=="object"&&(e.name.dead=!1
,e.name.init=!0);switch(e.extra){case"get":e.parameters.length!==0&&vt("bad_get"
,e);break;case"set":e.parameters.length!==1&&vt("bad_set",e)}e.parameters.forEach
(function(e){sn(e.expression),e.id==="{"||e.id==="["?e.names.forEach(an):(e.dead=!1
,e.init=!0)})}function ln(e){!Y.bitwise&&s[e.id]===!0&&vt("unexpected_a",e),e.id!=="("&&
e.id!=="&&"&&e.id!=="||"&&e.id!=="="&&Array.isArray(e.expression)&&e.expression.
length===2&&(u[e.expression[0].id]===!0||u[e.expression[1].id]===!0)&&vt("unexpected_a"
,e)}function cn(){B.live.forEach(function(e){e.dead=!0}),delete B.live,B=j.pop()
}function hn(e){e.expression!==undefined&&(sn(e.expression),e.id==="{"||e.id==="["?
e.names.forEach(an):e.init=!0),e.dead=!1,B.live.push(e)}function pn(e){e.names.forEach
(hn)}function dn(e){var t=un(e);if(t!==undefined&&t.writable){t.init=!0;return}vt
("bad_assignment_a",e)}function vn(e){return delete X.finally,delete X.loop,delete
X.switch,delete X.try,X=tt.pop(),e.wrapped&&vt("unexpected_parens",e),cn()}function mn
(e){Object.keys(e.context).forEach(function(t){if(t!=="ignore"){var n=e.context[
t];n.function===e&&(n.used!==0||n.role==="function"&&n.function.arity==="unary"?
n.init||vt("uninitialized_a",n):vt("unused_a",n))}})}function gn(){(Q===!0||Y.node
)&&mn($),V.forEach(mn)}function yn(){function c(e){vt("expected_a_at_b_c",l,lt(l
),W+e,ht(l))}function h(e){var t=r+e;if(l.from!==t)return c(t)}function p(){n.id!=="(global)"&&
n.nr+1===l.nr&&(n.line!==l.line||n.thru!==l.from)&&vt("unexpected_space_a_b",l,lt
(n),lt(l))}function d(){if(n.line===l.line)n.thru!==l.from&&s===0&&vt("unexpected_space_a_b"
,l,lt(n),lt(l));else if(u){var e=t?r:r+8;l.from<e&&c(e)}else l.from!==r+8&&c(r+8
)}function v(){(n.line!==l.line||n.thru+1!==l.from)&&vt("expected_space_a_b",l,lt
(n),lt(l))}function m(){n.line===l.line?n.thru+1!==l.from&&s===0&&vt("expected_space_a_b"
,l,lt(n),lt(l)):t?l.from<r&&c(r):l.from!==r+8&&c(r+8)}function g(){var e=a.length
;e>0&&(r-=e*4),a=""}var e="(end)",t=!1,n=$,r=0,s=0,u=!0,a="",f,l;tt=[],st.forEach
(function(y){l=y;if(l.id==="(comment)"||l.id==="(end)")s+=1;else{var b=o[n.id];if(typeof
b=="string")b!==l.id?(tt.push({closer:e,free:t,margin:r,open:u,qmark:a}),a="",e=
b,n.line!==l.line?(t=e===")"&&n.free,u=!0,r+=4,l.role==="label"?l.from!==0&&c(0)
:l.switch?(g(),h(-4)):h(0)):((l.statement||l.role==="label")&&vt("expected_line_break_a_b"
,l,lt(n),lt(l)),t=!1,u=!1,p())):n.line===l.line?d():h(0);else if(l.id===e){var w=
tt.pop();r=w.margin,u&&l.id!==";"?h(0):p(),e=w.closer,t=w.free,u=w.open,a=w.qmark
}else l.switch?(g(),h(-4)):l.role==="label"?l.from!==0&&c(0):n.id===","?(g(),!u||
(t||e==="]")&&n.line===l.line?m():h(0)):l.arity==="ternary"?(l.id==="?"?(r+=4,a+="?"
):(f=a.match(A),a=f[1]+":",r-=4*f[2].length),h(0)):l.arity==="binary"&&l.id==="("&&
t?d():n.id==="."||n.id==="..."||l.id===","||l.id===";"||l.id===":"||l.arity==="binary"&&
(l.id==="("||l.id==="[")||l.arity==="function"&&n.id!=="function"?p():l.id==="."?
n.line===l.line?d():(O.test(a)||(a+=".",r+=4),h(0)):n.id===";"?(g(),u?h(0):m()):
n.arity==="ternary"||n.id==="case"||n.id==="catch"||n.id==="else"||n.id==="finally"||
n.id==="while"||l.id==="catch"||l.id==="else"||l.id==="finally"||l.id==="while"&&!
l.statement||n.id===")"&&l.id==="{"?v():l.statement===!0?u?h(0):m():n.id==="var"||
n.id==="const"||n.id==="let"?(tt.push({closer:e,free:t,margin:r,open:u,qmark:a})
,e=";",t=!1,u=n.open,a="",u?(r+=4,h(0)):v()):i[n.id]===!0||i[l.id]===!0||n.arity==="binary"&&
(n.id==="+"||n.id==="-")||l.arity==="binary"&&(l.id==="+"||l.id==="-")||n.id==="function"||
n.id===":"||(n.identifier||n.id==="(string)"||n.id==="(number)")&&(l.identifier||
l.id==="(string)"||l.id==="(number)")||n.arity==="statement"&&l.id!==";"?m():n.arity==="unary"&&
n.id!=="`"&&p();s=0,delete n.calls,delete n.dead,delete n.free,delete n.init,delete
n.open,delete n.used,n=l}})}var r={bitwise:!0,browser:["Audio","clearInterval","clearTimeout"
,"document","event","FormData","history","Image","localStorage","location","name"
,"navigator","Option","screen","sessionStorage","setInterval","setTimeout","Storage"
,"XMLHttpRequest"],couch:["emit","getRow","isArray","log","provides","registerType"
,"require","send","start","sum","toJSON"],devel:["alert","confirm","console","prompt"
],es6:["ArrayBuffer","DataView","Float32Array","Float64Array","Generator","GeneratorFunction"
,"Int8Array","Int16Array","Int32Array","Intl","Map","Promise","Proxy","Reflect","Set"
,"Symbol","System","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","WeakMap"
,"WeakSet"],eval:!0,"for":!0,fudge:!0,maxerr:1e4,maxlen:1e4,multivar:!0,node:["Buffer"
,"clearImmediate","clearInterval","clearTimeout","console","exports","global","module"
,"process","querystring","require","setImmediate","setInterval","setTimeout","__dirname"
,"__filename"],single:!0,"this":!0,white:!0},i={"!=":!0,"!==":!0,"%":!0,"%=":!0,"&"
:!0,"&=":!0,"&&":!0,"*":!0,"*=":!0,"+=":!0,"-=":!0,"/":!0,"/=":!0,"<":!0,"<=":!0
,"<<":!0,"<<=":!0,"=":!0,"==":!0,"===":!0,"=>":!0,">":!0,">=":!0,">>":!0,">>=":!0
,">>>":!0,">>>=":!0,"^":!0,"^=":!0,"|":!0,"|=":!0,"||":!0},s={"~":!0,"^":!0,"^="
:!0,"&":!0,"&=":!0,"|":!0,"|=":!0,"<<":!0,"<<=":!0,">>":!0,">>=":!0,">>>":!0,">>>="
:!0},o={"(":")","[":"]","{":"}","${":"}"},u={"!=":!0,"!==":!0,"==":!0,"===":!0,"<"
:!0,"<=":!0,">":!0,">=":!0},a=["Array","Boolean","Date","decodeURI","decodeURIComponent"
,"encodeURI","encodeURIComponent","Error","EvalError","isFinite","JSON","Math","Number"
,"Object","parseInt","parseFloat","RangeError","ReferenceError","RegExp","String"
,"SyntaxError","TypeError","URIError"],f={and:"The '&&' subexpression should be wrapped in parens."
,bad_assignment_a:"Bad assignment to '{a}'.",bad_directive_a:"Bad directive '{a}'."
,bad_get:"A get function takes no parameters.",bad_module_name_a:"Bad module name '{a}'."
,bad_option_a:"Bad option '{a}'.",bad_property_a:"Bad property name '{a}'.",bad_set
:"A set function takes one parameter.",duplicate_a:"Duplicate '{a}'.",empty_block
:"Empty block.",es6:"Unexpected ES6 feature '{a}'.",escape_mega:"Unexpected escapement in mega literal."
,expected_a:"Expected '{a}'.",expected_a_at_b_c:"Expected '{a}' at column {b}, not column {c}."
,expected_a_b:"Expected '{a}' and instead saw '{b}'.",expected_a_b_from_c_d:"Expected '{a}' to match '{b}' from line {c} and instead saw '{d}'."
,expected_a_before_b:"Expected '{a}' before '{b}'.",expected_digits_after_a:"Expected digits after '{a}'."
,expected_four_digits:"Expected four digits after '\\u'.",expected_identifier_a:"Expected an identifier and instead saw '{a}'."
,expected_line_break_a_b:"Expected a line break between '{a}' and '{b}'.",expected_regexp_factor_a
:"Expected a regexp factor and instead saw '{a}'.",expected_space_a_b:"Expected one space between '{a}' and '{b}'."
,expected_statements_a:"Expected statements before '{a}'.",expected_string_a:"Expected a string and instead saw '{a}'."
,expected_type_string_a:"Expected a type string and instead saw '{a}'.",function_in_loop
:"Don't make functions within a loop.",infix_in:"Unexpected 'in'. Compare with undefined, or use the hasOwnProperty method instead."
,isNaN:"Use the isNaN function to compare with NaN.",label_a:"'{a}' is a statement label."
,misplaced_a:"Place '{a}' at the outermost level.",misplaced_directive_a:"Place the '/*{a}*/' directive before the first statement."
,missing_browser:"/*global*/ requires the Assume a browser option.",missing_m:"Expected 'm' flag on a multiline regular expression."
,naked_block:"Naked block.",nested_comment:"Nested comment.",not_label_a:"'{a}' is not a label."
,number_isNaN:"Use Number.isNaN function to compare with NaN.",out_of_scope_a:"'{a}' is out of scope."
,redefinition_a_b:"Redefinition of '{a}' from line {b}.",reserved_a:"Reserved name '{a}'."
,subscript_a:"['{a}'] is better written in dot notation.",todo_comment:"Unexpected TODO comment."
,too_long:"Line too long.",too_many:"Too many warnings.",too_many_digits:"Too many digits."
,unclosed_comment:"Unclosed comment.",unclosed_mega:"Unclosed mega literal.",unclosed_string
:"Unclosed string.",undeclared_a:"Undeclared '{a}'.",unexpected_a:"Unexpected '{a}'."
,unexpected_a_after_b:"Unexpected '{a}' after '{b}'.",unexpected_a_before_b:"Unexpected '{a}' before '{b}'."
,unexpected_at_top_level_a:"Expected '{a}' to be in a function.",unexpected_char_a
:"Unexpected character '{a}'.",unexpected_comment:"Unexpected comment.",unexpected_directive_a
:"When using modules, don't use directive '/*{a}'.",unexpected_expression_a:"Unexpected expression '{a}' in statement position."
,unexpected_label_a:"Unexpected label '{a}'.",unexpected_parens:"Don't wrap function literals in parens."
,unexpected_space_a_b:"Unexpected space between '{a}' and '{b}'.",unexpected_statement_a
:"Unexpected statement '{a}' in expression position.",unexpected_trailing_space:"Unexpected trailing space."
,unexpected_typeof_a:"Unexpected 'typeof'. Use '===' to compare directly with {a}."
,uninitialized_a:"Uninitialized '{a}'.",unreachable_a:"Unreachable '{a}'.",unregistered_property_a
:"Unregistered property name '{a}'.",unsafe:"Unsafe character '{a}'.",unused_a:"Unused '{a}'."
,use_double:"Use double quotes, not single quotes.",use_spaces:"Use spaces, not tabs."
,use_strict:'This function needs a "use strict" pragma.',var_loop:"Don't declare variables in a loop."
,var_switch:"Don't declare variables in a switch.",weird_condition_a:"Weird condition '{a}'."
,weird_expression_a:"Weird expression '{a}'.",weird_loop:"Weird loop.",weird_relation_a
:"Weird relation '{a}'.",wrap_assignment:"Don't wrap assignment statements in parens."
,wrap_condition:"Wrap the condition in parens.",wrap_immediate:"Wrap an immediate function invocation in parentheses to assist the reader in understanding that the expression is the result of a function, and not the function itself."
,wrap_parameter:"Wrap the parameter in parens.",wrap_regexp:"Wrap this regexp in parens to avoid confusion."
,wrap_unary:"Wrap the unary expression in parens."},l=/\{([^{}]*)\}/g,c=/\n|\r\n?/
,h=/[\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/
,p=/^([a-zA-Z_$][a-zA-Z0-9_$]*)$/,d=/^[a-zA-Z0-9_$:.@\-\/]+$/,v=/Sync\$/
,m=/\*\//,g=/\/\*/,y=/\/\*|\/$/,b=/\b(?:todo|TO\s?DO|HACK)\b/,w=/\t/g,E=/^(jslint|property|global)\s+(.*)$/
,S=/^([a-zA-Z$_][a-zA-Z0-9$_]*)\s*(?::\s*(true|false|[0-9]+)\s*)?(?:,\s*)?(.*)$/
,x=/^((\s+)|([a-zA-Z_$][a-zA-Z0-9_$]*)|[(){}\[\]?,:;'"~`]|=(?:==?|>)?|\.+|\/[=*\/]?|\*[\/=]?|\+(?:=|\++)?|-(?:=|-+)?|[\^%]=?|&[&=]?|\|[|=]?|>{1,3}=?|<<?=?|!={0,2}|(0|[1-9][0-9]*))(.*)$/
,T=/^([0-9]+)(.*)$/,N=/^([0-9a-fA-F]+)(.*)$/,C=/^([0-7]+)(.*)$/,k=/^([01]+)(.*)$/
,L=/[`\\]|\$\{/,A=/^(.*)\?([:.]*)$/,O=/\.$/,M=/^-?\d+(?:\.\d*)?(?:e[\-+]?\d+)?$/i
,_=/^[A-Z]/,H="anonymous",B,j,F,I,q,R,U,z,W,X,V,$,J,K,Q,G,Y,Z,et,tt,nt,rt,it,st,
ot,ut,at,ft;nt=t(),Bt("}"),Bt(")"),Bt("]"),Bt(","),Bt(";"),Bt(":"),Bt("*/"),Bt("await"
),Bt("case"),Bt("catch"),Bt("class"),Bt("default"),Bt("else"),Bt("enum"),Bt("finally"
),Bt("implements"),Bt("interface"),Bt("package"),Bt("private"),Bt("protected"),Bt
("public"),Bt("static"),Bt("super"),Bt("void"),Bt("yield"),Ft("(number)","number"
),Ft("(regexp)","regexp"),Ft("(string)","string"),Ft("arguments","object",function(
){return Y.es6&&vt("unexpected_a",rt),rt}),Ft("eval","function",function(){return Y
.eval?G.id!=="("&&vt("expected_a_before_b",G,"(",lt()):vt("unexpected_a",rt),rt}
),Ft("false","boolean",!1),Ft("Function","function",function(){return Y.eval?G.id!=="("&&
vt("expected_a_before_b",G,"(",lt()):vt("unexpected_a",rt),rt}),Ft("ignore","undefined"
,function(){return vt("unexpected_a",rt),rt}),Ft("Infinity","number",Infinity),Ft
("isNaN","function",function(){return Y.es6&&vt("expected_a_b",rt,"Number.isNaN"
,"isNaN"),rt}),Ft("NaN","number",NaN),Ft("null","null",null),Ft("this","object",
function(){return Y.this||vt("unexpected_a",rt),rt}),Ft("true","boolean",!0),Ft("undefined"
,"undefined"),jt("="),jt("+="),jt("-="),jt("*="),jt("/="),jt("%="),jt("&="),jt("|="
),jt("^="),jt("<<="),jt(">>="),jt(">>>="),It("||",40),It("&&",50),It("|",70),It("^"
,80),It("&",90),It("==",100),It("===",100),It("!=",100),It("!==",100),It("<",110
),It(">",110),It("<=",110),It(">=",110),It("in",110),It("instanceof",110),It("<<"
,120),It(">>",120),It(">>>",120),It("+",130),It("-",130),It("*",140),It("/",140)
,It("%",140),It("(",160,function(e){var t=rt,n;return e.id!=="function"&&Ht(e,t)
,X.arity==="statement"&&e.identifier&&(X.name.calls[e.id]=e),t.expression=[e],G.
id!==")"&&function r(){var e;G.id==="..."&&(Y.es6||vt("es6"),e=!0,Et("...")),n=Tt
(10),e&&(n.ellipsis=!0),t.expression.push(n);if(G.id===",")return Et(","),r()}()
,Et(")",t),t.expression.length===2?(t.free=!0,n.wrapped===!0&&vt("unexpected_a",
t),n.id==="("&&(n.wrapped=!0)):t.free=!1,t}),It(".",170,function(e){var t=rt,n=G
;return(e.id!=="(string)"||n.id!=="indexOf")&&(e.id!=="["||n.id!=="concat"&&n.id!=="forEach"
)&&(e.id!=="+"||n.id!=="slice")&&(e.id!=="(regexp)"||n.id!=="exec"&&n.id!=="test"
)&&Ht(e,t),n.identifier||mt("expected_identifier_a"),Et(),yt(n),t.name=n,t.expression=
e,t}),It("[",170,function(e){var t=rt,n=Tt(0);if(n.id==="(string)"||n.id==="`"){
var r=yt(n);p.test(r)&&vt("subscript_a",n,r)}return Ht(e,t),t.expression=[e,n],Et
("]"),t}),It("=>",170,function(e){return mt("wrap_parameter",e)}),It("`",160,function(
e){var t=Xt();return Ht(e,t),t.expression=[e].concat(t.expression),t}),qt("++"),
qt("--"),Rt("++"),Rt("--"),Ut("+"),Ut("-"),Ut("~"),Ut("!"),Ut("!!"),Ut("[",function(
){var e=rt;return e.expression=[],G.id!=="]"&&function t(){var n,r=!1;G.id==="..."&&
(r=!0,Y.es6||vt("es6"),Et("...")),n=Tt(10),r&&(n.ellipsis=!0),e.expression.push(
n);if(G.id===",")return Et(","),t()}(),Et("]"),e}),Ut("/=",function(){mt("expected_a_b"
,rt,"/\\=","/=")}),Ut("=>",function(){return mt("expected_a_before_b",rt,"()","=>"
)}),Ut("new",function(){var e=rt,t=Tt(160);return G.id!=="("&&vt("expected_a_before_b"
,G,"()",lt(G)),e.expression=t,e}),Ut("typeof"),Ut("void",function(){var e=rt;return vt
("unexpected_a",e),e.expression=Tt(0),e}),Ut("function",$t),Ut("(",function(){var e=
rt,t,n=wt().id;if(G.id===")"||G.id==="..."||G.identifier&&(n===","||n==="="))return e
.free=!1,Jt(Vt());e.free=!0,t=Tt(0),t.wrapped===!0&&vt("unexpected_a",e),t.wrapped=!0
,Et(")",e);if(G.id==="=>")return t.arity!=="variable"?t.id==="{"||t.id==="["?(vt
("expected_a_before_b",e,"function","("),mt("expected_a_b",G,"{","=>")):mt("expected_identifier_a"
,t):(e.expression=[t],Jt([e.expression,"("+t.id+")"]));return t}),Ut("`",Xt),Ut("{"
,function(){var e=rt,n=t();return e.expression=[],G.id!=="}"&&function r(){var t
,i,s=G,o;Et(),s.id!=="get"&&s.id!=="set"||!G.identifier?(i=yt(s),typeof n[i]=="boolean"&&
vt("duplicate_a",s),n[i]=!0):(t=s.id+" "+G.id,s=G,Et(),i=yt(s),(n[t]===!0||n[i]===!0
)&&vt("duplicate_a",s),n[i]=!1,n[t]=!0);if(s.identifier){switch(G.id){case"}":case","
:Y.es6||vt("es6"),typeof t=="string"&&Et("("),o=Tt(Infinity,!0);break;case"(":!Y
.es6&&typeof t!="string"&&vt("es6"),o=$t({arity:"unary",from:s.from,id:"function"
,line:s.line,name:typeof t=="string"?t:i,thru:s.from});break;default:typeof t=="string"&&
Et("("),Et(":"),o=Tt(0)}o.label=s,typeof t=="string"&&(o.extra=t),e.expression.push
(o)}else Et(":"),o=Tt(0),o.label=s,e.expression.push(o);if(G.id===",")return Et(","
),r()}(),Et("}"),e}),zt(";",function(){return vt("unexpected_a",rt),rt}),zt("{",
function(){return vt("naked_block",rt),Dt("naked")}),zt("break",function(){var e=
rt,t;return(X.loop<1&&X.switch<1||X.finally>0)&&vt("unexpected_a",e),e.disrupt=!0
,G.identifier&&rt.line===G.line&&(t=X.context[G.id],t===undefined||t.role!=="label"||
t.dead?vt(t!==undefined&&t.dead?"out_of_scope_a":"not_label_a"):t.used+=1,e.label=
G,Et()),Et(";"),e}),zt("const",Kt),zt("continue",function(){var e=rt;return(X.loop<1||
X.finally>0)&&vt("unexpected_a",e),Mt(e),e.disrupt=!0,vt("unexpected_a",e),Et(";"
),e}),zt("debugger",function(){var e=rt;return Y.devel||vt("unexpected_a",e),Lt(
),e}),zt("delete",function(){var e=rt,t=Tt(0);return(t.id!=="."&&t.id!=="["||t.arity!=="binary"
)&&mt("expected_a_b",t,".",lt(t)),e.expression=t,Lt(),e}),zt("do",function(){var e=
rt;return Mt(e),X.loop+=1,e.block=Dt(),Et("while"),e.expression=Nt(),Lt(),e.block
.disrupt===!0&&vt("weird_loop",e),X.loop-=1,e}),zt("export",function(){function i
(){G.identifier||mt("expected_identifier_a"),t=G.id,n=$.context[t],n===undefined?
vt("unexpected_a"):(n.used+=1,U[t]!==undefined&&vt("duplicate_a"),U[t]=n),Et(),e
.expression.push(r)}var e=rt,t,n,r;Y.es6||vt("es6",e),e.expression=[];if(G.id==="default"
)U.default!==undefined&&vt("duplicate_a"),Et("default"),r=Tt(),r.id!=="function"&&
Lt(),U.default=r,e.expression.push(r);else switch(G.id){case"function":r=At(),n=
r.name,t=n.id,n.used+=1,U[t]!==undefined&&vt("duplicate_a",n),U[t]=r,e.expression
.push(r),r.statement=!1,r.arity="unary";break;case"var":case"let":case"const":vt
("unexpeted_a");break;case"{":Et("{"),function s(){i();if(G.id===",")return Et(","
),s()}(),Et("}"),Lt();break;default:i(),Lt()}return Q=!0,e}),zt("for",function()
{var e,t=rt;return Y.for||vt("unexpected_a",t),Mt(t),X.loop+=1,Et("("),rt.free=!0
,G.id===";"?mt("expected_a_b",t,"while (","for (;"):G.id==="var"||G.id==="let"||
G.id==="const"?mt("unexpected_a"):(e=Tt(0),e.id==="in"?(e.expression[0].arity!=="variable"&&
vt("bad_assignment_a",e.expression[0]),t.name=e.expression[0],t.expression=e.expression
[1],vt("expected_a_b",t,"Object.keys","for in")):(t.initial=e,Et(";"),t.expression=
Tt(0),Et(";"),t.inc=Tt(0),t.inc.id==="++"&&vt("expected_a_b",t.inc,"+= 1","++"))
,Et(")"),t.block=Dt(),t.block.disrupt===!0&&vt("weird_loop",t),X.loop-=1,t)}),zt
("function",$t),zt("if",function(){var e,t=rt;return t.expression=Nt(),t.block=Dt
(),G.id==="else"&&(Et("else"),e=rt,t.else=G.id==="if"?At():Dt(),t.block.disrupt===!0&&
(t.else.disrupt===!0?t.disrupt=!0:vt("unexpected_a",e))),t}),zt("import",function(
){var e=rt,t;Y.es6?typeof Q=="object"&&vt("unexpected_directive_a",Q,Q.directive
):vt("es6",e),Q=!0;if(G.identifier)t=G,Et(),t.id==="ignore"&&vt("unexpected_a",t
),xt(t,"variable",!0),e.name=t;else{var n=[];Et("{");if(G.id!=="}")for(;;){G.identifier||
mt("expected_identifier_a"),t=G,Et(),t.id==="ignore"&&vt("unexpected_a",t),xt(t,"variable"
,!0),n.push(t);if(G.id!==",")break;Et(",")}Et("}"),e.name=n}return Et("from"),Et
("(string)"),e.import=rt,d.test(rt.value)||vt("bad_module_name_a",rt),z.push(rt.
value),Lt(),e}),zt("let",Kt),zt("return",function(){var e=rt;return Mt(e),X.finally>0&&
vt("unexpected_a",e),e.disrupt=!0,G.id!==";"&&e.line===G.line&&(e.expression=Tt(10
)),Et(";"),e}),zt("switch",function(){var e=[],t,n,r=[],i=!0,s=rt;Mt(s),X.finally>0&&
vt("unexpected_a",s),X.switch+=1,Et("("),rt.free=!0,s.expression=Tt(0),s.block=r
,Et(")"),Et("{"),function a(){var s=G;s.arity="statement",s.expression=[],function o
(){Et("case"),rt.switch=!0;var t=Tt(0);e.some(function(e){return kt(e,t)})&&vt("unexpected_a"
,t),e.push(t),s.expression.push(t),Et(":");if(G.id==="case")return o()}(),n=Ot()
;if(n.length<1){vt("expected_statements_a");return}s.block=n,r.push(s),t=n[n.length-1
],t.disrupt?t.id==="break"&&t.label===undefined&&(i=!1):vt("expected_a_before_b"
,G,"break;",lt(G));if(G.id==="case")return a()}(),e=undefined;if(G.id==="default"
){var o=G;Et("default"),rt.switch=!0,Et(":"),s.else=Ot();if(s.else.length<1)vt("unexpected_a"
,o),i=!1;else{var u=s.else[s.else.length-1];u.id==="break"&&u.label===undefined&&
(vt("unexpected_a",u),u.disrupt=!1),i=i&&u.disrupt}}else i=!1;return Et("}",s),X
.switch-=1,s.disrupt=i,s}),zt("throw",function(){var e=rt;return e.disrupt=!0,e.
expression=Tt(10),Lt(),e}),zt("try",function(){var e,t,n=rt;X.try>0&&vt("unexpected_a"
,n),X.try+=1,n.block=Dt(),t=n.block.disrupt;if(G.id==="catch"){var r="ignore";e=
G,n.catch=e,Et("catch"),Et("(");if(!G.identifier)return mt("expected_identifier_a"
,G);G.id!=="ignore"&&(r=undefined,e.name=G,xt(G,"exception",!0)),Et(),Et(")"),e.
block=Dt(r),e.block.disrupt!==!0&&(t=!1)}else vt("expected_a_before_b",G,"catch"
,lt(G));return G.id==="finally"&&(X.finally+=1,Et("finally"),n.else=Dt(),t=n.else.
disrupt,X.finally-=1),n.disrupt=t,X.try-=1,n}),zt("var",Kt),zt("while",function(
){var e=rt;return Mt(e),X.loop+=1,e.expression=Nt(),e.block=Dt(),e.block.disrupt===!0&&
vt("weird_loop",e),X.loop-=1,e}),zt("with",function(){mt("unexpected_a",rt)}),Wt
("?",":");var Yt=t(),Zt=t(),en=Qt(Zt),tn=Qt(Yt),nn=Gt(Zt),rn=Gt(Yt);return en("assignment"
,ln),en("binary",ln),en("binary",function(e){if(u[e.id]===!0){var t=e.expression
[0],n=e.expression[1];if(t.id==="NaN"||n.id==="NaN")Y.es6?vt("number_isNaN",e):vt
("isNaN",e);else if(t.id==="typeof")if(n.id!=="(string)")n.id!=="typeof"&&vt("expected_string_a"
,n);else{var r=n.value;r==="symbol"?Y.es6||vt("es6",n,r):r==="null"||r==="undefined"?
vt("unexpected_typeof_a",n,r):r!=="boolean"&&r!=="function"&&r!=="number"&&r!=="object"&&
r!=="string"&&vt("expected_type_string_a",n,r)}}}),en("binary","==",function(e){
vt("expected_a_b",e,"===","==")}),en("binary","!=",function(e){vt("expected_a_b"
,e,"!==","!=")}),en("binary","=>",fn),en("binary","||",function(e){e.expression.
forEach(function(e){e.id==="&&"&&!e.wrapped&&vt("and",e)})}),en("binary","(",function(
e){var t=e.expression[0];if(t.identifier&&X.context[t.id]===undefined&&typeof X.
name=="object"){var n=X.name.function;if(n){var r=n.context[t.id];r!==undefined&&
r.dead&&r.function===n&&r.calls!==undefined&&r.calls[X.name.id]!==undefined&&(r.
dead=!1)}}}),en("binary","in",function(e){vt("infix_in",e)}),en("binary","instanceof"
,function(e){vt("unexpected_a",e)}),en("binary",".",function(e){e.expression.new&&
(e.new=!0)}),en("statement","{",function(e){j.push(B),B=e,e.live=[]}),en("statement"
,"for",function(e){if(e.name!==undefined){var t=un(e.name);t!==undefined&&(t.init=!0
,t.writable||vt("bad_assignment_a",e.name))}on(e.initial)}),en("statement","function"
,fn),en("unary","~",ln),en("unary","function",fn),en("variable",function(e){var t=
un(e);t!==undefined&&(e.variable=t,t.used+=1)}),tn("assignment",function(e){var t=
e.expression[0];if(e.id==="=")e.names!==undefined?Array.isArray(e.names)?e.names
.forEach(dn):dn(e.names):t.id==="."&&e.expression[1].id==="undefined"&&vt("expected_a_b"
,t.expression,"delete","undefined");else{t.arity==="variable"&&(!t.variable||t.variable
.writable!==!0)&&vt("bad_assignment_a",t);var n=nt[e.expression[1].id];n!==undefined&&
(n.id==="function"||n.id==="=>"||n.constant&&n.id!=="(number)"&&(n.id!=="(string)"||
e.id!=="+="))&&vt("unexpected_a",e.expression[1])}}),tn("binary",function(e){var t
;u[e.id]&&(Ct(e.expression[0])||Ct(e.expression[1])||kt(e.expression[0],e.expression
[1])||e.expression[0].constant===!0&&e.expression[1].constant===!0)&&vt("weird_relation_a"
,e);switch(e.id){case"+":case"-":t=e.expression[1],t.id===e.id&&t.arity==="unary"&&!
t.wrapped&&vt("wrap_unary",t);break;case"=>":case"(":break;case".":e.expression.
id==="RegExp"&&vt("weird_expression_a",e);break;default:e.expression[0].constant===!0&&
e.expression[1].constant===!0&&(e.constant=!0)}}),tn("binary","&&",function(e){(
Ct(e.expression[0])||kt(e.expression[0],e.expression[1])||e.expression[0].constant===!0||
e.expression[1].constant===!0)&&vt("weird_condition_a",e)}),tn("binary","||",function(
e){(Ct(e.expression[0])||kt(e.expression[0],e.expression[1])||e.expression[0].constant===!0
)&&vt("weird_condition_a",e)}),tn("binary","=>",vn),tn("binary","(",function(e){
var t=e.expression[0],n;t.id==="new"&&(n=t,t=t.expression);if(t.id==="function")
e.wrapped||vt("wrap_immediate",e);else if(t.identifier)n!==undefined?t.id.charAt
(0)>"Z"||t.id==="Boolean"||t.id==="Number"||t.id==="String"||t.id==="Symbol"&&Y.
es6?vt("unexpected_a",n):t.id==="Function"?Y.eval||vt("unexpected_a",t,"new Function"
):t.id==="Array"?vt("expected_a_b",t,"[]","new Array"):t.id==="Object"&&vt("expected_a_b"
,t,"Object.create(null)","new Object"):t.id.charAt(0)>="A"&&t.id.charAt(0)<="Z"&&
t.id!=="Boolean"&&t.id!=="Number"&&t.id!=="String"&&t.id!=="Symbol"&&vt("expected_a_before_b"
,t,"new",lt(t));else if(t.id==="."){var r=n!==undefined;t.expression.id==="Date"&&
t.name.id==="UTC"&&(r=!r),_.test(t.name.id)!==r&&(n!==undefined?vt("unexpected_a"
,n):vt("expected_a_before_b",t.expression,"new",t.name.id));if(t.name.id==="getTime"
){var i=t.expression;if(i.id==="("){var s=i.expression;if(s.length===1){var o=s[0
];o.id==="new"&&o.expression.id==="Date"&&vt("expected_a_b",o,"Date.now()","new Date().getTime()"
)}}}}}),tn("binary","[",function(e){e.expression[0].id==="RegExp"&&vt("weird_expression_a"
,e),Ct(e.expression[1])&&vt("weird_expression_a",e.expression[1])}),tn("statement"
,"{",cn),tn("statement","const",pn),tn("statement","export",_t),tn("statement","for"
,function(e){on(e.inc)}),tn("statement","function",vn),tn("statement","import",function(
e){var t=e.name;return Array.isArray(t)?t.forEach(function(e){e.dead=!1,e.init=!0
,B.live.push(e)}):(t.dead=!1,t.init=!0,B.live.push(t)),_t(e)}),tn("statement","let"
,pn),tn("statement","try",function(e){if(e.catch!==undefined){var t=e.catch.name
;if(t!==undefined){var n=X.context[t.id];n.dead=!1,n.init=!0}on(e.catch.block)}}
),tn("statement","var",pn),tn("ternary",function(e){Ct(e.expression[0])||e.expression
[0].constant===!0||kt(e.expression[1],e.expression[2])?vt("unexpected_a",e):kt(e
.expression[0],e.expression[1])?vt("expected_a_b",e,"||","?"):kt(e.expression[0]
,e.expression[2])?vt("expected_a_b",e,"&&","?"):e.expression[1].id==="true"&&e.expression
[2].id==="false"?vt("expected_a_b",e,"!!","?"):e.expression[1].id==="false"&&e.expression
[2].id==="true"?vt("expected_a_b",e,"!","?"):e.expression[0].wrapped!==!0&&(e.expression
[0].id==="||"||e.expression[0].id==="&&")&&vt("wrap_condition",e.expression[0])}
),tn("unary",function(e){switch(e.id){case"[":case"{":case"function":case"new":break;
case"`":e.expression.every(function(e){return e.constant})&&(e.constant=!0);break;
default:e.expression.constant===!0&&(e.constant=!0)}}),tn("unary","function",vn)
,function(e,i,s){try{ft=[],Y=i||t(),H="anonymous",j=[],F=t(),q=!0,I=[],R=!0,U=t(
),z=[],W=Y.fudge?1:0,V=[],$={id:"(global)",body:!0,context:t(),from:0,level:0,line
:0,live:[],loop:0,"switch":0,thru:0},B=$,X=$,J=!1,et=!1,Q=!1,G=$,Z=t(),tt=[],ot=
undefined,rt=$,it=0,at=undefined,n(F,a,!1),s!==undefined&&n(F,s,!1),Object.keys(
Y).forEach(function(e){if(Y[e]===!0){var t=r[e];Array.isArray(t)&&n(F,t,!1)}}),gt
(e),Et(),J?(ut=St(),Et("(end)")):(Y.browser?G.id===";"&&Et(";"):G.value==="use strict"&&
($.strict=G,Et("(string)"),Et(";")),ut=Ot(),Et("(end)"),X=$,on(ut),Q&&$.strict!==
undefined&&vt("unexpected_a",$.strict),gn(),Y.white||yn()),Y.browser||I.forEach(
function(e){e.directive==="global"&&vt("missing_browser",e)}),R=!1}catch(o){o.name!=="JSLintError"&&
ft.push(o)}return{directives:I,edition:"2016-10-24",exports:U,froms:z,functions:
V,global:$,id:"(JSLint)",json:J,lines:K,module:Q===!0,ok:ft.length===0&&!R,option
:Y,property:Z,stop:R,tokens:st,tree:ut,warnings:ft.sort(function(e,t){return e.line-
t.line||e.column-t.column})}}}()
local.CSSLint = CSSLint; local.JSLINT = JSLINT, local.jslintEs6 = jslint; }());
/* jslint-ignore-end */



    // run shared js-env code - function
    (function () {
        local.csslintUtility2 = function (script) {
        /*
         * this function will csslint the script with utiity2-specific rules
         */
            var current1, current2, ii, jj, message, previous1, previous2;
            // ignore comments
            script = script.replace((/^ *?\/\*[\S\s]*?\*\/ *?$/gm), function (match0) {
                if (match0 === '/* validateLineSortedReset */') {
                    return match0;
                }
                // preserve lineno
                return match0.replace((/^.*?$/gm), '');
            });
            ii = 0;
            current1 = '';
            current2 = '';
            previous1 = '';
            previous2 = '';
            script.replace((/^.*?$/gm), function (line) {
                current1 = line;
                ii += 1;
                jj = 0;
                message = '';
                if (!current1) {
                    return;
                }
                // validate whitespace-before-comma
                if ((/ ,/).test(current1)) {
                    jj = jj || ((/ ,/).exec(current1).index + 2);
                    message = message || 'whitespace-before-comma';
                }
                // validate double-whitespace
                if ((/\S {2}/).test(current1)) {
                    jj = jj || ((/\S {2}/).exec(current1).index + 2);
                    message = message || 'double-whitespace';
                }
                // ignore indent
                if (!message && current1[0] === ' ') {
                    return;
                }
                // validate multi-line-statement
                if ((/[,;\{\}]./).test(current1)) {
                    jj = jj || ((/[,;\{\}]./).exec(current1).index + 1);
                    message = message || 'multi-line-statement';
                }
                // validateLineSortedReset
                if (current1 === '/* validateLineSortedReset */') {
                    current1 = '';
                    current2 = '';
                    previous1 = '';
                    previous2 = '';
                    return;
                }
                // validate previous1 < current1
                current1 = current1
                    .replace((/^#/gm), '|')
                    .replace((/,$/gm), '   ,')
                    .replace((/( \{$|:)/gm), '  $1')
                    .replace((/(^[\w*@]| \w)/gm), ' $1');
                if (!(previous1 < current1)) {
                    jj = jj || 1;
                    message = message ||
                        ('lines not sorted\n' + previous1 + '\n' + current1).trim();
                }
                previous1 = current1;
                // validate previous2 < current2
                current2 += current1 + '\n';
                if (current1 === '}') {
                    current2 = current2.slice(0, -3);
                    if (!(previous2 < current2)) {
                        jj = jj || 1;
                        message = message ||
                            ('lines not sorted\n' + previous2 + '\n' + current2)
                                .replace((/\n\|/g), '\n#')
                                .trim();
                    }
                    previous1 = '';
                    previous2 = current2;
                    current2 = '';
                }
                if (!message) {
                    return;
                }
                local.errorList.push({
                    col: jj,
                    line: ii,
                    message: message,
                    value: line
                });
            });
        };

        local.jslintAndPrint = function (script, file) {
        /*
         * this function will jslint / csslint the script and print any errors to stderr
         */
            var ii, jj, lintType, message, scriptParsed;
            // cleanup errors
            local.errorList = [];
            local.errorText = '';
            // do nothing for empty script
            if (!(script && script.length)) {
                return script;
            }
            scriptParsed = script;
            if ((/^\/\* jslint-utility2 \*\/$|^# jslint-utility2$/m).test(scriptParsed)) {
                scriptParsed = scriptParsed
                    // ignore shebang
                    .replace((/^#!\/.*/), '')
                    // ignore comment
                    .replace((
                        /^ *?(?:#!! |\/\/!! |(?: \*|\/\/) (?:utility2-uglifyjs )?https?:\/\/).*?$/gm
                    ), '')
                    // ignore text-block
                    .replace(
/* jslint-ignore-begin */
(/^ *?\/\* jslint-ignore-begin \*\/$[\S\s]+?^ *?\/\* jslint-ignore-end \*\/$/gm),
/* jslint-ignore-end */
                        function (match0) {
                            return match0.replace((/^.*?$/gm), '');
                        }
                    )
                    // ignore next-line
                    .replace(
/* jslint-ignore-next-line */
(/^ *?\/\* jslint-ignore-next-line \*\/\n.*/gm),
                        function (match0) {
                            return match0.replace((/^.*?$/gm), '');
                        }
                    );
            }
            switch (file.replace((/^.*\./), '.')) {
            // csslint script
            case '.css':
                lintType = 'csslint';
                local.CSSLint.errors = local.CSSLint.verify(scriptParsed).messages;
                local.CSSLint.errors.forEach(function (error) {
                    local.errorList.push(error && {
                        col: error.col,
                        line: error.line,
                        message: error.type + ' - ' + error.rule.id + ' - ' + error.message +
                            '\n    ' + error.rule.desc,
                        value: error.evidence
                    });
                });
                break;
            // shlint script
            case '.sh':
                lintType = 'shlint';
                break;
            // jslint script
            default:
                // jslint es6-script
                if ((/^\/\*jslint\b[\s\w,:]*?\bes6: true\b/m)
                        .test(scriptParsed.slice(0, 0x1000))) {
                    local.jslintEs6.errors = local.jslintEs6(scriptParsed).warnings;
                    local.jslintEs6.errors.forEach(function (error) {
                        local.errorList.push(error && {
                            col: error.column + 1,
                            line: error.line + 1,
                            message: error.message,
                            value: error.a
                        });
                    });
                    break;
                }
                // jslint es5 script
                local.JSLINT(scriptParsed);
                local.JSLINT.errors.forEach(function (error) {
                    local.errorList.push(error && {
                        col: error.character,
                        line: error.line,
                        message: error.reason,
                        value: error.evidence
                    });
                });
            }
            // jslint the script with utiity2-specific rules
            local.errorList = local.errorList.filter(function (error) {
                return error && error.message;
            });
            if (!local.errorList.length &&
                    (/^\/\* jslint-utility2 \*\/$|^# jslint-utility2$/m).test(script)) {
                ii = 0;
                scriptParsed.replace((/^.*?$/gm), function (line) {
                    ii += 1;
                    jj = 0;
                    message = '';
                    // validate 4-space indent
                    if (!(/^ +(?:\*|\/\/!!)/).test(line) &&
                            ((/^ */).exec(line)[0].length % 4 !== 0)) {
                        jj = jj || 1;
                        message = message || 'non 4-space indent';
                    }
                    // validate trailing-whitespace
                    if ((/ $| \\n\\$/).test(line)) {
                        jj = jj || line.length;
                        message = message || 'trailing whitespace';
                    }
                    // validate tab
                    if (line.indexOf('\t') >= 0) {
                        jj = jj || (line.indexOf('\t') + 1);
                        message = message || 'tab detected';
                    }
                    if (message) {
                        local.errorList.push({
                            col: jj,
                            line: ii,
                            message: message,
                            value: JSON.stringify(line)
                        });
                    }
                });
                switch (file.replace((/^.*\./), '.')) {
                case '.css':
                    local.csslintUtility2(script);
                    break;
                case '.sh':
                    local.shlintUtility2(script);
                    break;
                default:
                    local.jslintUtility2(script);
                }
            }
            // if error occurred, then print colorized error messages
            local.errorList = local.errorList.filter(function (error) {
                return error && error.message;
            });
            if (!local.errorList.length) {
                return script;
            }
            local.errorText = '\u001b[1m' + (lintType || 'jslint') + ' ' +  file + '\u001b[22m\n';
            local.errorList.forEach(function (error, ii) {
                local.errorText += (' #' + String(ii + 1) + ' ').slice(-4) +
                    '\u001b[31m' + error.message + '\u001b[39m\n' +
                    '    ' + String(error.value).trim() +
                    '\u001b[90m \/\/ line ' + error.line + ', col ' + (error.col) + '\u001b[39m\n';
            });
            local.errorText = local.errorText.trim();
            // print error to stderr
            console.error(local.errorText);
            return script;
        };

        local.jslintUtility2 = function (script) {
        /*
         * this function will jslint the script with utiity2-specific rules
         */
            var ii, current, previous, rgx, tmp;
            ii = 0;
            rgx = new RegExp('^ *?\\/\\* validateLineSortedReset \\*\\/$|' +
                '^ {4}\\/\\/ run .*?\\bjs\\\\?-env code\\b|' +
                '^\\/\\/ init lib ');
            previous = '';
            script.replace((/^.*?$/gm), function (line) {
                current = line.trim();
                ii += 1;
                // validate domElement.classList sorted
                tmp = (/class=\\?"([^"]+?)\\?"/g).exec(current);
                tmp = JSON.stringify((tmp && tmp[1].replace((/^ /), 'zSpace').match(
                    / {2}| $|\w\S*?\{\{[^}]*?\}\}|\w\S*|\{\{[^}]*?\}\}/g
                )) || []);
                if (JSON.stringify(JSON.parse(tmp).sort()) !== tmp) {
                    local.errorList.push({
                        col: 0,
                        line: ii,
                        message: '<domElement>.classList not sorted - ' + tmp,
                        value: line
                    });
                }
                // validate line-sorted
                if (rgx.test(line)) {
                    previous = '';
                    return;
                }
                if (!(/^(?:| {4}| {8})local\.\S*? =(?: |$)/m).test(line) ||
                        (/^local\.(?:global|isBrowser|local|tmp)\b|\\n\\$/).test(current)) {
                    return;
                }
                // validate previous < current
                if (!(previous < current || (/ =$/).test(previous))) {
                    local.errorList.push({
                        col: 0,
                        line: ii,
                        message: 'lines not sorted\n' + previous + '\n' + current,
                        value: line
                    });
                }
                previous = current;
            });
        };

        local.shlintUtility2 = function (script) {
        /*
         * this function will shlint the script with utiity2-specific rules
         */
            var ii, previous;
            ii = 0;
            previous = '';
            script.replace((/^.*?$/gm), function (line) {
                ii += 1;
                if (!(/^sh\w+? \(\) \{/).test(line)) {
                    return;
                }
                // validate previous < line
                if (!(previous < line)) {
                    local.errorList.push({
                        col: 0,
                        line: ii,
                        message: 'lines not sorted\n' + previous + '\n' + line,
                        value: line
                    });
                }
                previous = line;
            });
        };
    }());



    // run node js-env code - init-after
    /* istanbul ignore next */
    (function () {
        if (local.isBrowser) {
            return;
        }
        // init cli
        if (module !== require.main || local.global.utility2_rollup) {
            return;
        }
        local.cliDict = {};
        local.cliDict._default = function () {
        /*
         * <file1> <file2> ...
         * # jslint <file1> <file2> ... and print result to stdout
         */
            // jslint files
            process.argv.slice(2).forEach(function (argList) {
                if (argList[0] !== '-') {
                    local.jslintAndPrint(
                        local.fs.readFileSync(local.path.resolve(argList), 'utf8'),
                        argList
                    );
                }
            });
            // if error occurred, then exit with non-zero code
            process.exit(!!local.errorList.length);
        };
        local.cliRun();
    }());
}());
