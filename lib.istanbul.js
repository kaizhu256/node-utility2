#!/usr/bin/env node
/*jslint
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
    var __dirname, process, require;
    __dirname = '';
    // jslint-hack
    local.nop(__dirname);
    process = local.process;
    require = function (key) {
        try {
            return local[key] || local.require(key);
        } catch (ignore) {
        }
    };



    /* istanbul ignore next */
    // init lib esprima
    (function () {
        var exports;
        // jslint-hack
        local.nop(exports);
        exports = local.esprima = {};
/* jslint-ignore-begin */
// https://github.com/jquery/esprima/blob/1.2/esprima.js
// utility2-uglifyjs https://raw.githubusercontent.com/jquery/esprima/1.2/esprima.js
(function(e,t){"use strict";typeof define=="function"&&define.amd?define(["exports"],t):typeof exports!="undefined"?t(exports):t(e.esprima={})})(this,function(e){"use strict";function b(e,t){if(!e)throw new Error("ASSERT: "+t)}function w(e){return e>=48&&e<=57
}function E(e){return"0123456789abcdefABCDEF".indexOf(e)>=0}function S(e){return"01234567".indexOf(e)>=0}function x(e){return e===32||e===9||e===11||e===12||e===160||e>=5760&&[5760,6158,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8239,8287,12288,65279
].indexOf(e)>=0}function T(e){return e===10||e===13||e===8232||e===8233}function N(e){return e===36||e===95||e>=65&&e<=90||e>=97&&e<=122||e===92||e>=128&&u.NonAsciiIdentifierStart.test(String.fromCharCode(e))}function C(e){return e===36||e===95||e>=65&&e<=90||
e>=97&&e<=122||e>=48&&e<=57||e===92||e>=128&&u.NonAsciiIdentifierPart.test(String.fromCharCode(e))}function k(e){switch(e){case"class":case"enum":case"export":case"extends":case"import":case"super":return!0;default:return!1}}function L(e){switch(e){case"implements"
:case"interface":case"package":case"private":case"protected":case"public":case"static":case"yield":case"let":return!0;default:return!1}}function A(e){return e==="eval"||e==="arguments"}function O(e){if(l&&L(e))return!0;switch(e.length){case 2:return e==="if"||
e==="in"||e==="do";case 3:return e==="var"||e==="for"||e==="new"||e==="try"||e==="let";case 4:return e==="this"||e==="else"||e==="case"||e==="void"||e==="with"||e==="enum";case 5:return e==="while"||e==="break"||e==="catch"||e==="throw"||e==="const"||e==="yield"||
e==="class"||e==="super";case 6:return e==="return"||e==="typeof"||e==="delete"||e==="switch"||e==="export"||e==="import";case 7:return e==="default"||e==="finally"||e==="extends";case 8:return e==="function"||e==="continue"||e==="debugger";case 10:return e==="instanceof"
;default:return!1}}function M(e,t,n,r,i){var s,o;b(typeof n=="number","Comment must have valid position");if(g.lastCommentStart>=n)return;g.lastCommentStart=n,s={type:e,value:t},y.range&&(s.range=[n,r]),y.loc&&(s.loc=i),y.comments.push(s),y.attachComment&&(
y.leadingComments.push(s),y.trailingComments.push(s))}function _(e){var t,n,r,i;t=c-e,n={start:{line:h,column:c-p-e}};while(c<d){r=f.charCodeAt(c),++c;if(T(r)){y.comments&&(i=f.slice(t+e,c-1),n.end={line:h,column:c-p-1},M("Line",i,t,c-1,n)),r===13&&f.charCodeAt
(c)===10&&++c,++h,p=c;return}}y.comments&&(i=f.slice(t+e,c),n.end={line:h,column:c-p},M("Line",i,t,c,n))}function D(){var e,t,n,r;y.comments&&(e=c-2,t={start:{line:h,column:c-p-2}});while(c<d){n=f.charCodeAt(c);if(T(n))n===13&&f.charCodeAt(c+1)===10&&++c,++
h,++c,p=c,c>=d&&st({},o.UnexpectedToken,"ILLEGAL");else if(n===42){if(f.charCodeAt(c+1)===47){++c,++c,y.comments&&(r=f.slice(e+2,c-2),t.end={line:h,column:c-p},M("Block",r,e,c,t));return}++c}else++c}st({},o.UnexpectedToken,"ILLEGAL")}function P(){var e,t;t=
c===0;while(c<d){e=f.charCodeAt(c);if(x(e))++c;else if(T(e))++c,e===13&&f.charCodeAt(c)===10&&++c,++h,p=c,t=!0;else if(e===47){e=f.charCodeAt(c+1);if(e===47)++c,++c,_(2),t=!0;else{if(e!==42)break;++c,++c,D()}}else if(t&&e===45){if(f.charCodeAt(c+1)!==45||f.
charCodeAt(c+2)!==62)break;c+=3,_(3)}else{if(e!==60)break;if(f.slice(c+1,c+4)!=="!--")break;++c,++c,++c,++c,_(4)}}}function H(e){var t,n,r,i=0;n=e==="u"?4:2;for(t=0;t<n;++t){if(!(c<d&&E(f[c])))return"";r=f[c++],i=i*16+"0123456789abcdef".indexOf(r.toLowerCase
())}return String.fromCharCode(i)}function B(){var e,t;e=f.charCodeAt(c++),t=String.fromCharCode(e),e===92&&(f.charCodeAt(c)!==117&&st({},o.UnexpectedToken,"ILLEGAL"),++c,e=H("u"),(!e||e==="\\"||!N(e.charCodeAt(0)))&&st({},o.UnexpectedToken,"ILLEGAL"),t=e);
while(c<d){e=f.charCodeAt(c);if(!C(e))break;++c,t+=String.fromCharCode(e),e===92&&(t=t.substr(0,t.length-1),f.charCodeAt(c)!==117&&st({},o.UnexpectedToken,"ILLEGAL"),++c,e=H("u"),(!e||e==="\\"||!C(e.charCodeAt(0)))&&st({},o.UnexpectedToken,"ILLEGAL"),t+=e)}
return t}function j(){var e,t;e=c++;while(c<d){t=f.charCodeAt(c);if(t===92)return c=e,B();if(!C(t))break;++c}return f.slice(e,c)}function F(){var e,n,r;return e=c,n=f.charCodeAt(c)===92?B():j(),n.length===1?r=t.Identifier:O(n)?r=t.Keyword:n==="null"?r=t.NullLiteral
:n==="true"||n==="false"?r=t.BooleanLiteral:r=t.Identifier,{type:r,value:n,lineNumber:h,lineStart:p,start:e,end:c}}function I(){var e=c,n=f.charCodeAt(c),r,i=f[c],s,u,a;switch(n){case 46:case 40:case 41:case 59:case 44:case 123:case 125:case 91:case 93:case 58
:case 63:case 126:return++c,y.tokenize&&(n===40?y.openParenToken=y.tokens.length:n===123&&(y.openCurlyToken=y.tokens.length)),{type:t.Punctuator,value:String.fromCharCode(n),lineNumber:h,lineStart:p,start:e,end:c};default:r=f.charCodeAt(c+1);if(r===61)switch(
n){case 43:case 45:case 47:case 60:case 62:case 94:case 124:case 37:case 38:case 42:return c+=2,{type:t.Punctuator,value:String.fromCharCode(n)+String.fromCharCode(r),lineNumber:h,lineStart:p,start:e,end:c};case 33:case 61:return c+=2,f.charCodeAt(c)===61&&++
c,{type:t.Punctuator,value:f.slice(e,c),lineNumber:h,lineStart:p,start:e,end:c}}}a=f.substr(c,4);if(a===">>>=")return c+=4,{type:t.Punctuator,value:a,lineNumber:h,lineStart:p,start:e,end:c};u=a.substr(0,3);if(u===">>>"||u==="<<="||u===">>=")return c+=3,{type
:t.Punctuator,value:u,lineNumber:h,lineStart:p,start:e,end:c};s=u.substr(0,2);if(i===s[1]&&"+-<>&|".indexOf(i)>=0||s==="=>")return c+=2,{type:t.Punctuator,value:s,lineNumber:h,lineStart:p,start:e,end:c};if("<>=!+-*%&|^/".indexOf(i)>=0)return++c,{type:t.Punctuator
,value:i,lineNumber:h,lineStart:p,start:e,end:c};st({},o.UnexpectedToken,"ILLEGAL")}function q(e){var n="";while(c<d){if(!E(f[c]))break;n+=f[c++]}return n.length===0&&st({},o.UnexpectedToken,"ILLEGAL"),N(f.charCodeAt(c))&&st({},o.UnexpectedToken,"ILLEGAL"),
{type:t.NumericLiteral,value:parseInt("0x"+n,16),lineNumber:h,lineStart:p,start:e,end:c}}function R(e){var n="0"+f[c++];while(c<d){if(!S(f[c]))break;n+=f[c++]}return(N(f.charCodeAt(c))||w(f.charCodeAt(c)))&&st({},o.UnexpectedToken,"ILLEGAL"),{type:t.NumericLiteral
,value:parseInt(n,8),octal:!0,lineNumber:h,lineStart:p,start:e,end:c}}function U(){var e,t;for(e=c+1;e<d;++e){t=f[e];if(t==="8"||t==="9")return!1;if(!S(t))return!0}return!0}function z(){var e,n,r;r=f[c],b(w(r.charCodeAt(0))||r===".","Numeric literal must start with a decimal digit or a decimal point"
),n=c,e="";if(r!=="."){e=f[c++],r=f[c];if(e==="0"){if(r==="x"||r==="X")return++c,q(n);if(S(r)&&U())return R(n)}while(w(f.charCodeAt(c)))e+=f[c++];r=f[c]}if(r==="."){e+=f[c++];while(w(f.charCodeAt(c)))e+=f[c++];r=f[c]}if(r==="e"||r==="E"){e+=f[c++],r=f[c];if(
r==="+"||r==="-")e+=f[c++];if(w(f.charCodeAt(c)))while(w(f.charCodeAt(c)))e+=f[c++];else st({},o.UnexpectedToken,"ILLEGAL")}return N(f.charCodeAt(c))&&st({},o.UnexpectedToken,"ILLEGAL"),{type:t.NumericLiteral,value:parseFloat(e),lineNumber:h,lineStart:p,start
:n,end:c}}function W(){var e="",n,r,i,s,u,a,l=!1,v,m;v=h,m=p,n=f[c],b(n==="'"||n==='"',"String literal must starts with a quote"),r=c,++c;while(c<d){i=f[c++];if(i===n){n="";break}if(i==="\\"){i=f[c++];if(!i||!T(i.charCodeAt(0)))switch(i){case"u":case"x":a=c
,u=H(i),u?e+=u:(c=a,e+=i);break;case"n":e+="\n";break;case"r":e+="\r";break;case"t":e+="	";break;case"b":e+="\b";break;case"f":e+="\f";break;case"v":e+="";break;default:S(i)?(s="01234567".indexOf(i),s!==0&&(l=!0),c<d&&S(f[c])&&(l=!0,s=s*8+"01234567".indexOf
(f[c++]),"0123".indexOf(i)>=0&&c<d&&S(f[c])&&(s=s*8+"01234567".indexOf(f[c++]))),e+=String.fromCharCode(s)):e+=i}else++h,i==="\r"&&f[c]==="\n"&&++c,p=c}else{if(T(i.charCodeAt(0)))break;e+=i}}return n!==""&&st({},o.UnexpectedToken,"ILLEGAL"),{type:t.StringLiteral
,value:e,octal:l,startLineNumber:v,startLineStart:m,lineNumber:h,lineStart:p,start:r,end:c}}function X(e,t){var n;try{n=new RegExp(e,t)}catch(r){st({},o.InvalidRegExp)}return n}function V(){var e,t,n,r,i;e=f[c],b(e==="/","Regular expression literal must start with a slash"
),t=f[c++],n=!1,r=!1;while(c<d){e=f[c++],t+=e;if(e==="\\")e=f[c++],T(e.charCodeAt(0))&&st({},o.UnterminatedRegExp),t+=e;else if(T(e.charCodeAt(0)))st({},o.UnterminatedRegExp);else if(n)e==="]"&&(n=!1);else{if(e==="/"){r=!0;break}e==="["&&(n=!0)}}return r||st
({},o.UnterminatedRegExp),i=t.substr(1,t.length-2),{value:i,literal:t}}function $(){var e,t,n,r;t="",n="";while(c<d){e=f[c];if(!C(e.charCodeAt(0)))break;++c;if(e==="\\"&&c<d){e=f[c];if(e==="u"){++c,r=c,e=H("u");if(e){n+=e;for(t+="\\u";r<c;++r)t+=f[r]}else c=
r,n+="u",t+="\\u";ot({},o.UnexpectedToken,"ILLEGAL")}else t+="\\",ot({},o.UnexpectedToken,"ILLEGAL")}else n+=e,t+=e}return{value:n,literal:t}}function J(){var e,n,r,i,s;return m=null,P(),e=c,n=V(),r=$(),s=X(n.value,r.value),y.tokenize?{type:t.RegularExpression
,value:s,lineNumber:h,lineStart:p,start:e,end:c}:{literal:n.literal+r.literal,value:s,start:e,end:c}}function K(){var e,t,n,r;return P(),e=c,t={start:{line:h,column:c-p}},n=J(),t.end={line:h,column:c-p},y.tokenize||(y.tokens.length>0&&(r=y.tokens[y.tokens.length-1
],r.range[0]===e&&r.type==="Punctuator"&&(r.value==="/"||r.value==="/=")&&y.tokens.pop()),y.tokens.push({type:"RegularExpression",value:n.literal,range:[e,c],loc:t})),n}function Q(e){return e.type===t.Identifier||e.type===t.Keyword||e.type===t.BooleanLiteral||
e.type===t.NullLiteral}function G(){var e,t;e=y.tokens[y.tokens.length-1];if(!e)return K();if(e.type==="Punctuator"){if(e.value==="]")return I();if(e.value===")")return t=y.tokens[y.openParenToken-1],!t||t.type!=="Keyword"||t.value!=="if"&&t.value!=="while"&&
t.value!=="for"&&t.value!=="with"?I():K();if(e.value==="}"){if(y.tokens[y.openCurlyToken-3]&&y.tokens[y.openCurlyToken-3].type==="Keyword"){t=y.tokens[y.openCurlyToken-4];if(!t)return I()}else{if(!y.tokens[y.openCurlyToken-4]||y.tokens[y.openCurlyToken-4].type!=="Keyword"
)return I();t=y.tokens[y.openCurlyToken-5];if(!t)return K()}return r.indexOf(t.value)>=0?I():K()}return K()}return e.type==="Keyword"&&e.value!=="this"?K():I()}function Y(){var e;return P(),c>=d?{type:t.EOF,lineNumber:h,lineStart:p,start:c,end:c}:(e=f.charCodeAt
(c),N(e)?F():e===40||e===41||e===59?I():e===39||e===34?W():e===46?w(f.charCodeAt(c+1))?z():I():w(e)?z():y.tokenize&&e===47?G():I())}function Z(){var e,r,i,s;return P(),e={start:{line:h,column:c-p}},r=Y(),e.end={line:h,column:c-p},r.type!==t.EOF&&(s=f.slice(
r.start,r.end),y.tokens.push({type:n[r.type],value:s,range:[r.start,r.end],loc:e})),r}function et(){var e;return e=m,c=e.end,h=e.lineNumber,p=e.lineStart,m=typeof y.tokens!="undefined"?Z():Y(),c=e.end,h=e.lineNumber,p=e.lineStart,e}function tt(){var e,t,n;e=
c,t=h,n=p,m=typeof y.tokens!="undefined"?Z():Y(),c=e,h=t,p=n}function nt(e,t){this.line=e,this.column=t}function rt(e,t,n,r){this.start=new nt(e,t),this.end=new nt(n,r)}function it(){var e,t,n,r;return e=c,t=h,n=p,P(),r=h!==t,c=e,h=t,p=n,r}function st(e,t){
var n,r=Array.prototype.slice.call(arguments,2),i=t.replace(/%(\d)/g,function(e,t){return b(t<r.length,"Message reference must be in range"),r[t]});throw typeof e.lineNumber=="number"?(n=new Error("Line "+e.lineNumber+": "+i),n.index=e.start,n.lineNumber=e.
lineNumber,n.column=e.start-p+1):(n=new Error("Line "+h+": "+i),n.index=c,n.lineNumber=h,n.column=c-p+1),n.description=i,n}function ot(){try{st.apply(null,arguments)}catch(e){if(!y.errors)throw e;y.errors.push(e)}}function ut(e){e.type===t.EOF&&st(e,o.UnexpectedEOS
),e.type===t.NumericLiteral&&st(e,o.UnexpectedNumber),e.type===t.StringLiteral&&st(e,o.UnexpectedString),e.type===t.Identifier&&st(e,o.UnexpectedIdentifier);if(e.type===t.Keyword){if(k(e.value))st(e,o.UnexpectedReserved);else if(l&&L(e.value)){ot(e,o.StrictReservedWord
);return}st(e,o.UnexpectedToken,e.value)}st(e,o.UnexpectedToken,e.value)}function at(e){var n=et();(n.type!==t.Punctuator||n.value!==e)&&ut(n)}function ft(e){var n=et();(n.type!==t.Keyword||n.value!==e)&&ut(n)}function lt(e){return m.type===t.Punctuator&&m.
value===e}function ct(e){return m.type===t.Keyword&&m.value===e}function ht(){var e;return m.type!==t.Punctuator?!1:(e=m.value,e==="="||e==="*="||e==="/="||e==="%="||e==="+="||e==="-="||e==="<<="||e===">>="||e===">>>="||e==="&="||e==="^="||e==="|=")}function pt
(){var e,n=c,r=h,i=p,s=m;if(f.charCodeAt(c)===59||lt(";")){et();return}e=h,P();if(h!==e){c=n,h=r,p=i,m=s;return}m.type!==t.EOF&&!lt("}")&&ut(m)}function dt(e){return e.type===i.Identifier||e.type===i.MemberExpression}function vt(){var e=[],t;t=m,at("[");while(!
lt("]"))lt(",")?(et(),e.push(null)):(e.push(Pt()),lt("]")||at(","));return et(),v.markEnd(v.createArrayExpression(e),t)}function mt(e,t){var n,r,i;return n=l,i=m,r=an(),t&&l&&A(e[0].name)&&ot(t,o.StrictParamName),l=n,v.markEnd(v.createFunctionExpression(null
,e,[],r),i)}function gt(){var e,n;return n=m,e=et(),e.type===t.StringLiteral||e.type===t.NumericLiteral?(l&&e.octal&&ot(e,o.StrictOctalLiteral),v.markEnd(v.createLiteral(e),n)):v.markEnd(v.createIdentifier(e.value),n)}function yt(){var e,n,r,i,s,u;e=m,u=m;if(
e.type===t.Identifier)return r=gt(),e.value==="get"&&!lt(":")?(n=gt(),at("("),at(")"),i=mt([]),v.markEnd(v.createProperty("get",n,i),u)):e.value==="set"&&!lt(":")?(n=gt(),at("("),e=m,e.type!==t.Identifier?(at(")"),ot(e,o.UnexpectedToken,e.value),i=mt([])):(
s=[Ft()],at(")"),i=mt(s,e)),v.markEnd(v.createProperty("set",n,i),u)):(at(":"),i=Pt(),v.markEnd(v.createProperty("init",r,i),u));if(e.type!==t.EOF&&e.type!==t.Punctuator)return n=gt(),at(":"),i=Pt(),v.markEnd(v.createProperty("init",n,i),u);ut(e)}function bt
(){var e=[],t,n,r,u,a={},f=String,c;c=m,at("{");while(!lt("}"))t=yt(),t.key.type===i.Identifier?n=t.key.name:n=f(t.key.value),u=t.kind==="init"?s.Data:t.kind==="get"?s.Get:s.Set,r="$"+n,Object.prototype.hasOwnProperty.call(a,r)?(a[r]===s.Data?l&&u===s.Data?
ot({},o.StrictDuplicateProperty):u!==s.Data&&ot({},o.AccessorDataProperty):u===s.Data?ot({},o.AccessorDataProperty):a[r]&u&&ot({},o.AccessorGetSet),a[r]|=u):a[r]=u,e.push(t),lt("}")||at(",");return at("}"),v.markEnd(v.createObjectExpression(e),c)}function wt
(){var e;return at("("),e=Ht(),at(")"),e}function Et(){var e,n,r,i;if(lt("("))return wt();if(lt("["))return vt();if(lt("{"))return bt();e=m.type,i=m;if(e===t.Identifier)r=v.createIdentifier(et().value);else if(e===t.StringLiteral||e===t.NumericLiteral)l&&m.
octal&&ot(m,o.StrictOctalLiteral),r=v.createLiteral(et());else if(e===t.Keyword){if(ct("function"))return cn();ct("this")?(et(),r=v.createThisExpression()):ut(et())}else e===t.BooleanLiteral?(n=et(),n.value=n.value==="true",r=v.createLiteral(n)):e===t.NullLiteral?
(n=et(),n.value=null,r=v.createLiteral(n)):lt("/")||lt("/=")?(typeof y.tokens!="undefined"?r=v.createLiteral(K()):r=v.createLiteral(J()),tt()):ut(et());return v.markEnd(r,i)}function St(){var e=[];at("(");if(!lt(")"))while(c<d){e.push(Pt());if(lt(")"))break;
at(",")}return at(")"),e}function xt(){var e,t;return t=m,e=et(),Q(e)||ut(e),v.markEnd(v.createIdentifier(e.value),t)}function Tt(){return at("."),xt()}function Nt(){var e;return at("["),e=Ht(),at("]"),e}function Ct(){var e,t,n;return n=m,ft("new"),e=Lt(),t=
lt("(")?St():[],v.markEnd(v.createNewExpression(e,t),n)}function kt(){var e,t,n,r,i=g.allowIn;r=m,g.allowIn=!0,e=ct("new")?Ct():Et();for(;;){if(lt("."))n=Tt(),e=v.createMemberExpression(".",e,n);else if(lt("("))t=St(),e=v.createCallExpression(e,t);else{if(!
lt("["))break;n=Nt(),e=v.createMemberExpression("[",e,n)}v.markEnd(e,r)}return g.allowIn=i,e}function Lt(){var e,t,n;b(g.allowIn,"callee of new expression always allow in keyword."),n=m,e=ct("new")?Ct():Et();while(lt(".")||lt("["))lt("[")?(t=Nt(),e=v.createMemberExpression
("[",e,t)):(t=Tt(),e=v.createMemberExpression(".",e,t)),v.markEnd(e,n);return e}function At(){var e,n,r=m;return e=kt(),m.type===t.Punctuator&&(lt("++")||lt("--"))&&!it()&&(l&&e.type===i.Identifier&&A(e.name)&&ot({},o.StrictLHSPostfix),dt(e)||ot({},o.InvalidLHSInAssignment
),n=et(),e=v.markEnd(v.createPostfixExpression(n.value,e),r)),e}function Ot(){var e,n,r;return m.type!==t.Punctuator&&m.type!==t.Keyword?n=At():lt("++")||lt("--")?(r=m,e=et(),n=Ot(),l&&n.type===i.Identifier&&A(n.name)&&ot({},o.StrictLHSPrefix),dt(n)||ot({},
o.InvalidLHSInAssignment),n=v.createUnaryExpression(e.value,n),n=v.markEnd(n,r)):lt("+")||lt("-")||lt("~")||lt("!")?(r=m,e=et(),n=Ot(),n=v.createUnaryExpression(e.value,n),n=v.markEnd(n,r)):ct("delete")||ct("void")||ct("typeof")?(r=m,e=et(),n=Ot(),n=v.createUnaryExpression
(e.value,n),n=v.markEnd(n,r),l&&n.operator==="delete"&&n.argument.type===i.Identifier&&ot({},o.StrictDelete)):n=At(),n}function Mt(e,n){var r=0;if(e.type!==t.Punctuator&&e.type!==t.Keyword)return 0;switch(e.value){case"||":r=1;break;case"&&":r=2;break;case"|"
:r=3;break;case"^":r=4;break;case"&":r=5;break;case"==":case"!=":case"===":case"!==":r=6;break;case"<":case">":case"<=":case">=":case"instanceof":r=7;break;case"in":r=n?7:0;break;case"<<":case">>":case">>>":r=8;break;case"+":case"-":r=9;break;case"*":case"/"
:case"%":r=11;break;default:}return r}function _t(){var e,t,n,r,i,s,o,u,a,f;e=m,a=Ot(),r=m,i=Mt(r,g.allowIn);if(i===0)return a;r.prec=i,et(),t=[e,m],o=Ot(),s=[a,r,o];while((i=Mt(m,g.allowIn))>0){while(s.length>2&&i<=s[s.length-2].prec)o=s.pop(),u=s.pop().value
,a=s.pop(),n=v.createBinaryExpression(u,a,o),t.pop(),e=t[t.length-1],v.markEnd(n,e),s.push(n);r=et(),r.prec=i,s.push(r),t.push(m),n=Ot(),s.push(n)}f=s.length-1,n=s[f],t.pop();while(f>1)n=v.createBinaryExpression(s[f-1].value,s[f-2],n),f-=2,e=t.pop(),v.markEnd
(n,e);return n}function Dt(){var e,t,n,r,i;return i=m,e=_t(),lt("?")&&(et(),t=g.allowIn,g.allowIn=!0,n=Pt(),g.allowIn=t,at(":"),r=Pt(),e=v.createConditionalExpression(e,n,r),v.markEnd(e,i)),e}function Pt(){var e,t,n,r,s;return e=m,s=m,r=t=Dt(),ht()&&(dt(t)||
ot({},o.InvalidLHSInAssignment),l&&t.type===i.Identifier&&A(t.name)&&ot(e,o.StrictLHSAssignment),e=et(),n=Pt(),r=v.markEnd(v.createAssignmentExpression(e.value,t,n),s)),r}function Ht(){var e,t=m;e=Pt();if(lt(",")){e=v.createSequenceExpression([e]);while(c<d
){if(!lt(","))break;et(),e.expressions.push(Pt())}v.markEnd(e,t)}return e}function Bt(){var e=[],t;while(c<d){if(lt("}"))break;t=hn();if(typeof t=="undefined")break;e.push(t)}return e}function jt(){var e,t;return t=m,at("{"),e=Bt(),at("}"),v.markEnd(v.createBlockStatement
(e),t)}function Ft(){var e,n;return n=m,e=et(),e.type!==t.Identifier&&ut(e),v.markEnd(v.createIdentifier(e.value),n)}function It(e){var t=null,n,r;return r=m,n=Ft(),l&&A(n.name)&&ot({},o.StrictVarName),e==="const"?(at("="),t=Pt()):lt("=")&&(et(),t=Pt()),v.markEnd
(v.createVariableDeclarator(n,t),r)}function qt(e){var t=[];do{t.push(It(e));if(!lt(","))break;et()}while(c<d);return t}function Rt(){var e;return ft("var"),e=qt(),pt(),v.createVariableDeclaration(e,"var")}function Ut(e){var t,n;return n=m,ft(e),t=qt(e),pt(
),v.markEnd(v.createVariableDeclaration(t,e),n)}function zt(){return at(";"),v.createEmptyStatement()}function Wt(){var e=Ht();return pt(),v.createExpressionStatement(e)}function Xt(){var e,t,n;return ft("if"),at("("),e=Ht(),at(")"),t=un(),ct("else")?(et(),
n=un()):n=null,v.createIfStatement(e,t,n)}function Vt(){var e,t,n;return ft("do"),n=g.inIteration,g.inIteration=!0,e=un(),g.inIteration=n,ft("while"),at("("),t=Ht(),at(")"),lt(";")&&et(),v.createDoWhileStatement(e,t)}function $t(){var e,t,n;return ft("while"
),at("("),e=Ht(),at(")"),n=g.inIteration,g.inIteration=!0,t=un(),g.inIteration=n,v.createWhileStatement(e,t)}function Jt(){var e,t,n;return n=m,e=et(),t=qt(),v.markEnd(v.createVariableDeclaration(t,e.value),n)}function Kt(){var e,t,n,r,i,s,u,a=g.allowIn;return e=
t=n=null,ft("for"),at("("),lt(";")?et():(ct("var")||ct("let")?(g.allowIn=!1,e=Jt(),g.allowIn=a,e.declarations.length===1&&ct("in")&&(et(),r=e,i=Ht(),e=null)):(g.allowIn=!1,e=Ht(),g.allowIn=a,ct("in")&&(dt(e)||ot({},o.InvalidLHSInForIn),et(),r=e,i=Ht(),e=null
)),typeof r=="undefined"&&at(";")),typeof r=="undefined"&&(lt(";")||(t=Ht()),at(";"),lt(")")||(n=Ht())),at(")"),u=g.inIteration,g.inIteration=!0,s=un(),g.inIteration=u,typeof r=="undefined"?v.createForStatement(e,t,n,s):v.createForInStatement(r,i,s)}function Qt
(){var e=null,n;return ft("continue"),f.charCodeAt(c)===59?(et(),g.inIteration||st({},o.IllegalContinue),v.createContinueStatement(null)):it()?(g.inIteration||st({},o.IllegalContinue),v.createContinueStatement(null)):(m.type===t.Identifier&&(e=Ft(),n="$"+e.
name,Object.prototype.hasOwnProperty.call(g.labelSet,n)||st({},o.UnknownLabel,e.name)),pt(),e===null&&!g.inIteration&&st({},o.IllegalContinue),v.createContinueStatement(e))}function Gt(){var e=null,n;return ft("break"),f.charCodeAt(c)===59?(et(),!g.inIteration&&!
g.inSwitch&&st({},o.IllegalBreak),v.createBreakStatement(null)):it()?(!g.inIteration&&!g.inSwitch&&st({},o.IllegalBreak),v.createBreakStatement(null)):(m.type===t.Identifier&&(e=Ft(),n="$"+e.name,Object.prototype.hasOwnProperty.call(g.labelSet,n)||st({},o.UnknownLabel
,e.name)),pt(),e===null&&!g.inIteration&&!g.inSwitch&&st({},o.IllegalBreak),v.createBreakStatement(e))}function Yt(){var e=null;return ft("return"),g.inFunctionBody||ot({},o.IllegalReturn),f.charCodeAt(c)===32&&N(f.charCodeAt(c+1))?(e=Ht(),pt(),v.createReturnStatement
(e)):it()?v.createReturnStatement(null):(lt(";")||!lt("}")&&m.type!==t.EOF&&(e=Ht()),pt(),v.createReturnStatement(e))}function Zt(){var e,t;return l&&(P(),ot({},o.StrictModeWith)),ft("with"),at("("),e=Ht(),at(")"),t=un(),v.createWithStatement(e,t)}function en
(){var e,t=[],n,r;r=m,ct("default")?(et(),e=null):(ft("case"),e=Ht()),at(":");while(c<d){if(lt("}")||ct("default")||ct("case"))break;n=un(),t.push(n)}return v.markEnd(v.createSwitchCase(e,t),r)}function tn(){var e,t,n,r,i;ft("switch"),at("("),e=Ht(),at(")")
,at("{"),t=[];if(lt("}"))return et(),v.createSwitchStatement(e,t);r=g.inSwitch,g.inSwitch=!0,i=!1;while(c<d){if(lt("}"))break;n=en(),n.test===null&&(i&&st({},o.MultipleDefaultsInSwitch),i=!0),t.push(n)}return g.inSwitch=r,at("}"),v.createSwitchStatement(e,t
)}function nn(){var e;return ft("throw"),it()&&st({},o.NewlineAfterThrow),e=Ht(),pt(),v.createThrowStatement(e)}function rn(){var e,t,n;return n=m,ft("catch"),at("("),lt(")")&&ut(m),e=Ft(),l&&A(e.name)&&ot({},o.StrictCatchVariable),at(")"),t=jt(),v.markEnd(
v.createCatchClause(e,t),n)}function sn(){var e,t=[],n=null;return ft("try"),e=jt(),ct("catch")&&t.push(rn()),ct("finally")&&(et(),n=jt()),t.length===0&&!n&&st({},o.NoCatchOrFinally),v.createTryStatement(e,[],t,n)}function on(){return ft("debugger"),pt(),v.
createDebuggerStatement()}function un(){var e=m.type,n,r,s,u;e===t.EOF&&ut(m);if(e===t.Punctuator&&m.value==="{")return jt();u=m;if(e===t.Punctuator)switch(m.value){case";":return v.markEnd(zt(),u);case"(":return v.markEnd(Wt(),u);default:}if(e===t.Keyword)
switch(m.value){case"break":return v.markEnd(Gt(),u);case"continue":return v.markEnd(Qt(),u);case"debugger":return v.markEnd(on(),u);case"do":return v.markEnd(Vt(),u);case"for":return v.markEnd(Kt(),u);case"function":return v.markEnd(ln(),u);case"if":return v
.markEnd(Xt(),u);case"return":return v.markEnd(Yt(),u);case"switch":return v.markEnd(tn(),u);case"throw":return v.markEnd(nn(),u);case"try":return v.markEnd(sn(),u);case"var":return v.markEnd(Rt(),u);case"while":return v.markEnd($t(),u);case"with":return v.
markEnd(Zt(),u);default:}return n=Ht(),n.type===i.Identifier&&lt(":")?(et(),s="$"+n.name,Object.prototype.hasOwnProperty.call(g.labelSet,s)&&st({},o.Redeclaration,"Label",n.name),g.labelSet[s]=!0,r=un(),delete g.labelSet[s],v.markEnd(v.createLabeledStatement
(n,r),u)):(pt(),v.markEnd(v.createExpressionStatement(n),u))}function an(){var e,n=[],r,s,u,a,h,p,y,b;b=m,at("{");while(c<d){if(m.type!==t.StringLiteral)break;r=m,e=hn(),n.push(e);if(e.expression.type!==i.Literal)break;s=f.slice(r.start+1,r.end-1),s==="use strict"?
(l=!0,u&&ot(u,o.StrictOctalLiteral)):!u&&r.octal&&(u=r)}a=g.labelSet,h=g.inIteration,p=g.inSwitch,y=g.inFunctionBody,g.labelSet={},g.inIteration=!1,g.inSwitch=!1,g.inFunctionBody=!0;while(c<d){if(lt("}"))break;e=hn();if(typeof e=="undefined")break;n.push(e)
}return at("}"),g.labelSet=a,g.inIteration=h,g.inSwitch=p,g.inFunctionBody=y,v.markEnd(v.createBlockStatement(n),b)}function fn(e){var t,n=[],r,i,s,u,a;at("(");if(!lt(")")){s={};while(c<d){r=m,t=Ft(),u="$"+r.value,l?(A(r.value)&&(i=r,a=o.StrictParamName),Object
.prototype.hasOwnProperty.call(s,u)&&(i=r,a=o.StrictParamDupe)):e||(A(r.value)?(e=r,a=o.StrictParamName):L(r.value)?(e=r,a=o.StrictReservedWord):Object.prototype.hasOwnProperty.call(s,u)&&(e=r,a=o.StrictParamDupe)),n.push(t),s[u]=!0;if(lt(")"))break;at(",")
}}return at(")"),{params:n,stricted:i,firstRestricted:e,message:a}}function ln(){var e,t=[],n,r,i,s,u,a,f,c;return c=m,ft("function"),r=m,e=Ft(),l?A(r.value)&&ot(r,o.StrictFunctionName):A(r.value)?(u=r,a=o.StrictFunctionName):L(r.value)&&(u=r,a=o.StrictReservedWord
),s=fn(u),t=s.params,i=s.stricted,u=s.firstRestricted,s.message&&(a=s.message),f=l,n=an(),l&&u&&st(u,a),l&&i&&ot(i,a),l=f,v.markEnd(v.createFunctionDeclaration(e,t,[],n),c)}function cn(){var e,t=null,n,r,i,s,u=[],a,f,c;return c=m,ft("function"),lt("(")||(e=
m,t=Ft(),l?A(e.value)&&ot(e,o.StrictFunctionName):A(e.value)?(r=e,i=o.StrictFunctionName):L(e.value)&&(r=e,i=o.StrictReservedWord)),s=fn(r),u=s.params,n=s.stricted,r=s.firstRestricted,s.message&&(i=s.message),f=l,a=an(),l&&r&&st(r,i),l&&n&&ot(n,i),l=f,v.markEnd
(v.createFunctionExpression(t,u,[],a),c)}function hn(){if(m.type===t.Keyword)switch(m.value){case"const":case"let":return Ut(m.value);case"function":return ln();default:return un()}if(m.type!==t.EOF)return un()}function pn(){var e,n=[],r,s,u;while(c<d){r=m;
if(r.type!==t.StringLiteral)break;e=hn(),n.push(e);if(e.expression.type!==i.Literal)break;s=f.slice(r.start+1,r.end-1),s==="use strict"?(l=!0,u&&ot(u,o.StrictOctalLiteral)):!u&&r.octal&&(u=r)}while(c<d){e=hn();if(typeof e=="undefined")break;n.push(e)}return n
}function dn(){var e,t;return P(),tt(),t=m,l=!1,e=pn(),v.markEnd(v.createProgram(e),t)}function vn(){var e,t,n,r=[];for(e=0;e<y.tokens.length;++e)t=y.tokens[e],n={type:t.type,value:t.value},y.range&&(n.range=t.range),y.loc&&(n.loc=t.loc),r.push(n);y.tokens=
r}function mn(e,n){var r,i,s;r=String,typeof e!="string"&&!(e instanceof String)&&(e=r(e)),v=a,f=e,c=0,h=f.length>0?1:0,p=0,d=f.length,m=null,g={allowIn:!0,labelSet:{},inFunctionBody:!1,inIteration:!1,inSwitch:!1,lastCommentStart:-1},y={},n=n||{},n.tokens=!0
,y.tokens=[],y.tokenize=!0,y.openParenToken=-1,y.openCurlyToken=-1,y.range=typeof n.range=="boolean"&&n.range,y.loc=typeof n.loc=="boolean"&&n.loc,typeof n.comment=="boolean"&&n.comment&&(y.comments=[]),typeof n.tolerant=="boolean"&&n.tolerant&&(y.errors=[]
);try{tt();if(m.type===t.EOF)return y.tokens;i=et();while(m.type!==t.EOF)try{i=et()}catch(o){i=m;if(y.errors){y.errors.push(o);break}throw o}vn(),s=y.tokens,typeof y.comments!="undefined"&&(s.comments=y.comments),typeof y.errors!="undefined"&&(s.errors=y.errors
)}catch(u){throw u}finally{y={}}return s}function gn(e,t){var n,r;r=String,typeof e!="string"&&!(e instanceof String)&&(e=r(e)),v=a,f=e,c=0,h=f.length>0?1:0,p=0,d=f.length,m=null,g={allowIn:!0,labelSet:{},inFunctionBody:!1,inIteration:!1,inSwitch:!1,lastCommentStart
:-1},y={},typeof t!="undefined"&&(y.range=typeof t.range=="boolean"&&t.range,y.loc=typeof t.loc=="boolean"&&t.loc,y.attachComment=typeof t.attachComment=="boolean"&&t.attachComment,y.loc&&t.source!==null&&t.source!==undefined&&(y.source=r(t.source)),typeof
t.tokens=="boolean"&&t.tokens&&(y.tokens=[]),typeof t.comment=="boolean"&&t.comment&&(y.comments=[]),typeof t.tolerant=="boolean"&&t.tolerant&&(y.errors=[]),y.attachComment&&(y.range=!0,y.comments=[],y.bottomRightStack=[],y.trailingComments=[],y.leadingComments=
[]));try{n=dn(),typeof y.comments!="undefined"&&(n.comments=y.comments),typeof y.tokens!="undefined"&&(vn(),n.tokens=y.tokens),typeof y.errors!="undefined"&&(n.errors=y.errors)}catch(i){throw i}finally{y={}}return n}var t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y;t=
{BooleanLiteral:1,EOF:2,Identifier:3,Keyword:4,NullLiteral:5,NumericLiteral:6,Punctuator:7,StringLiteral:8,RegularExpression:9},n={},n[t.BooleanLiteral]="Boolean",n[t.EOF]="<end>",n[t.Identifier]="Identifier",n[t.Keyword]="Keyword",n[t.NullLiteral]="Null",n
[t.NumericLiteral]="Numeric",n[t.Punctuator]="Punctuator",n[t.StringLiteral]="String",n[t.RegularExpression]="RegularExpression",r=["(","{","[","in","typeof","instanceof","new","return","case","delete","throw","void","=","+=","-=","*=","/=","%=","<<=",">>="
,">>>=","&=","|=","^=",",","+","-","*","/","%","++","--","<<",">>",">>>","&","|","^","!","~","&&","||","?",":","===","==",">=","<=","<",">","!=","!=="],i={AssignmentExpression:"AssignmentExpression",ArrayExpression:"ArrayExpression",BlockStatement:"BlockStatement"
,BinaryExpression:"BinaryExpression",BreakStatement:"BreakStatement",CallExpression:"CallExpression",CatchClause:"CatchClause",ConditionalExpression:"ConditionalExpression",ContinueStatement:"ContinueStatement",DoWhileStatement:"DoWhileStatement",DebuggerStatement
:"DebuggerStatement",EmptyStatement:"EmptyStatement",ExpressionStatement:"ExpressionStatement",ForStatement:"ForStatement",ForInStatement:"ForInStatement",FunctionDeclaration:"FunctionDeclaration",FunctionExpression:"FunctionExpression",Identifier:"Identifier"
,IfStatement:"IfStatement",Literal:"Literal",LabeledStatement:"LabeledStatement",LogicalExpression:"LogicalExpression",MemberExpression:"MemberExpression",NewExpression:"NewExpression",ObjectExpression:"ObjectExpression",Program:"Program",Property:"Property"
,ReturnStatement:"ReturnStatement",SequenceExpression:"SequenceExpression",SwitchStatement:"SwitchStatement",SwitchCase:"SwitchCase",ThisExpression:"ThisExpression",ThrowStatement:"ThrowStatement",TryStatement:"TryStatement",UnaryExpression:"UnaryExpression"
,UpdateExpression:"UpdateExpression",VariableDeclaration:"VariableDeclaration",VariableDeclarator:"VariableDeclarator",WhileStatement:"WhileStatement",WithStatement:"WithStatement"},s={Data:1,Get:2,Set:4},o={UnexpectedToken:"Unexpected token %0",UnexpectedNumber
:"Unexpected number",UnexpectedString:"Unexpected string",UnexpectedIdentifier:"Unexpected identifier",UnexpectedReserved:"Unexpected reserved word",UnexpectedEOS:"Unexpected end of input",NewlineAfterThrow:"Illegal newline after throw",InvalidRegExp:"Invalid regular expression"
,UnterminatedRegExp:"Invalid regular expression: missing /",InvalidLHSInAssignment:"Invalid left-hand side in assignment",InvalidLHSInForIn:"Invalid left-hand side in for-in",MultipleDefaultsInSwitch:"More than one default clause in switch statement",NoCatchOrFinally
:"Missing catch or finally after try",UnknownLabel:"Undefined label '%0'",Redeclaration:"%0 '%1' has already been declared",IllegalContinue:"Illegal continue statement",IllegalBreak:"Illegal break statement",IllegalReturn:"Illegal return statement",StrictModeWith
:"Strict mode code may not include a with statement",StrictCatchVariable:"Catch variable may not be eval or arguments in strict mode",StrictVarName:"Variable name may not be eval or arguments in strict mode",StrictParamName:"Parameter name eval or arguments is not allowed in strict mode"
,StrictParamDupe:"Strict mode function may not have duplicate parameter names",StrictFunctionName:"Function name may not be eval or arguments in strict mode",StrictOctalLiteral:"Octal literals are not allowed in strict mode.",StrictDelete:"Delete of an unqualified identifier in strict mode."
,StrictDuplicateProperty:"Duplicate data property in object literal not allowed in strict mode",AccessorDataProperty:"Object literal may not have data and accessor property with the same name",AccessorGetSet:"Object literal may not have multiple get/set accessors with the same name"
,StrictLHSAssignment:"Assignment to eval or arguments is not allowed in strict mode",StrictLHSPostfix:"Postfix increment/decrement may not have eval or arguments operand in strict mode",StrictLHSPrefix:"Prefix increment/decrement may not have eval or arguments operand in strict mode"
,StrictReservedWord:"Use of future reserved word in strict mode"},u={NonAsciiIdentifierStart:new RegExp("[\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]"
),NonAsciiIdentifierPart:new RegExp("[\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0300-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u0483-\u0487\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u05d0-\u05ea\u05f0-\u05f2\u0610-\u061a\u0620-\u0669\u066e-\u06d3\u06d5-\u06dc\u06df-\u06e8\u06ea-\u06fc\u06ff\u0710-\u074a\u074d-\u07b1\u07c0-\u07f5\u07fa\u0800-\u082d\u0840-\u085b\u08a0\u08a2-\u08ac\u08e4-\u08fe\u0900-\u0963\u0966-\u096f\u0971-\u0977\u0979-\u097f\u0981-\u0983\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bc-\u09c4\u09c7\u09c8\u09cb-\u09ce\u09d7\u09dc\u09dd\u09df-\u09e3\u09e6-\u09f1\u0a01-\u0a03\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a59-\u0a5c\u0a5e\u0a66-\u0a75\u0a81-\u0a83\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abc-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ad0\u0ae0-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3c-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5c\u0b5d\u0b5f-\u0b63\u0b66-\u0b6f\u0b71\u0b82\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd0\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c58\u0c59\u0c60-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbc-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0cde\u0ce0-\u0ce3\u0ce6-\u0cef\u0cf1\u0cf2\u0d02\u0d03\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d-\u0d44\u0d46-\u0d48\u0d4a-\u0d4e\u0d57\u0d60-\u0d63\u0d66-\u0d6f\u0d7a-\u0d7f\u0d82\u0d83\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e01-\u0e3a\u0e40-\u0e4e\u0e50-\u0e59\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb9\u0ebb-\u0ebd\u0ec0-\u0ec4\u0ec6\u0ec8-\u0ecd\u0ed0-\u0ed9\u0edc-\u0edf\u0f00\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e-\u0f47\u0f49-\u0f6c\u0f71-\u0f84\u0f86-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1049\u1050-\u109d\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u135d-\u135f\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176c\u176e-\u1770\u1772\u1773\u1780-\u17d3\u17d7\u17dc\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1820-\u1877\u1880-\u18aa\u18b0-\u18f5\u1900-\u191c\u1920-\u192b\u1930-\u193b\u1946-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u19d0-\u19d9\u1a00-\u1a1b\u1a20-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1aa7\u1b00-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1bf3\u1c00-\u1c37\u1c40-\u1c49\u1c4d-\u1c7d\u1cd0-\u1cd2\u1cd4-\u1cf6\u1d00-\u1de6\u1dfc-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u200c\u200d\u203f\u2040\u2054\u2071\u207f\u2090-\u209c\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d7f-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2de0-\u2dff\u2e2f\u3005-\u3007\u3021-\u302f\u3031-\u3035\u3038-\u303c\u3041-\u3096\u3099\u309a\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua62b\ua640-\ua66f\ua674-\ua67d\ua67f-\ua697\ua69f-\ua6f1\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua827\ua840-\ua873\ua880-\ua8c4\ua8d0-\ua8d9\ua8e0-\ua8f7\ua8fb\ua900-\ua92d\ua930-\ua953\ua960-\ua97c\ua980-\ua9c0\ua9cf-\ua9d9\uaa00-\uaa36\uaa40-\uaa4d\uaa50-\uaa59\uaa60-\uaa76\uaa7a\uaa7b\uaa80-\uaac2\uaadb-\uaadd\uaae0-\uaaef\uaaf2-\uaaf6\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabea\uabec\uabed\uabf0-\uabf9\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\ufe70-\ufe74\ufe76-\ufefc\uff10-\uff19\uff21-\uff3a\uff3f\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]"
)},a={name:"SyntaxTree",processComment:function(e){var t,n;if(e.type===i.Program&&e.body.length>0)return;y.trailingComments.length>0?y.trailingComments[0].range[0]>=e.range[1]?(n=y.trailingComments,y.trailingComments=[]):y.trailingComments.length=0:y.bottomRightStack
.length>0&&y.bottomRightStack[y.bottomRightStack.length-1].trailingComments&&y.bottomRightStack[y.bottomRightStack.length-1].trailingComments[0].range[0]>=e.range[1]&&(n=y.bottomRightStack[y.bottomRightStack.length-1].trailingComments,delete y.bottomRightStack
[y.bottomRightStack.length-1].trailingComments);while(y.bottomRightStack.length>0&&y.bottomRightStack[y.bottomRightStack.length-1].range[0]>=e.range[0])t=y.bottomRightStack.pop();t?t.leadingComments&&t.leadingComments[t.leadingComments.length-1].range[1]<=e
.range[0]&&(e.leadingComments=t.leadingComments,delete t.leadingComments):y.leadingComments.length>0&&y.leadingComments[y.leadingComments.length-1].range[1]<=e.range[0]&&(e.leadingComments=y.leadingComments,y.leadingComments=[]),n&&(e.trailingComments=n),y.
bottomRightStack.push(e)},markEnd:function(e,t){return y.range&&(e.range=[t.start,c]),y.loc&&(e.loc=new rt(t.startLineNumber===undefined?t.lineNumber:t.startLineNumber,t.start-(t.startLineStart===undefined?t.lineStart:t.startLineStart),h,c-p),this.postProcess
(e)),y.attachComment&&this.processComment(e),e},postProcess:function(e){return y.source&&(e.loc.source=y.source),e},createArrayExpression:function(e){return{type:i.ArrayExpression,elements:e}},createAssignmentExpression:function(e,t,n){return{type:i.AssignmentExpression
,operator:e,left:t,right:n}},createBinaryExpression:function(e,t,n){var r=e==="||"||e==="&&"?i.LogicalExpression:i.BinaryExpression;return{type:r,operator:e,left:t,right:n}},createBlockStatement:function(e){return{type:i.BlockStatement,body:e}},createBreakStatement
:function(e){return{type:i.BreakStatement,label:e}},createCallExpression:function(e,t){return{type:i.CallExpression,callee:e,arguments:t}},createCatchClause:function(e,t){return{type:i.CatchClause,param:e,body:t}},createConditionalExpression:function(e,t,n)
{return{type:i.ConditionalExpression,test:e,consequent:t,alternate:n}},createContinueStatement:function(e){return{type:i.ContinueStatement,label:e}},createDebuggerStatement:function(){return{type:i.DebuggerStatement}},createDoWhileStatement:function(e,t){return{
type:i.DoWhileStatement,body:e,test:t}},createEmptyStatement:function(){return{type:i.EmptyStatement}},createExpressionStatement:function(e){return{type:i.ExpressionStatement,expression:e}},createForStatement:function(e,t,n,r){return{type:i.ForStatement,init
:e,test:t,update:n,body:r}},createForInStatement:function(e,t,n){return{type:i.ForInStatement,left:e,right:t,body:n,each:!1}},createFunctionDeclaration:function(e,t,n,r){return{type:i.FunctionDeclaration,id:e,params:t,defaults:n,body:r,rest:null,generator:!1
,expression:!1}},createFunctionExpression:function(e,t,n,r){return{type:i.FunctionExpression,id:e,params:t,defaults:n,body:r,rest:null,generator:!1,expression:!1}},createIdentifier:function(e){return{type:i.Identifier,name:e}},createIfStatement:function(e,t
,n){return{type:i.IfStatement,test:e,consequent:t,alternate:n}},createLabeledStatement:function(e,t){return{type:i.LabeledStatement,label:e,body:t}},createLiteral:function(e){return{type:i.Literal,value:e.value,raw:f.slice(e.start,e.end)}},createMemberExpression
:function(e,t,n){return{type:i.MemberExpression,computed:e==="[",object:t,property:n}},createNewExpression:function(e,t){return{type:i.NewExpression,callee:e,arguments:t}},createObjectExpression:function(e){return{type:i.ObjectExpression,properties:e}},createPostfixExpression
:function(e,t){return{type:i.UpdateExpression,operator:e,argument:t,prefix:!1}},createProgram:function(e){return{type:i.Program,body:e}},createProperty:function(e,t,n){return{type:i.Property,key:t,value:n,kind:e}},createReturnStatement:function(e){return{type
:i.ReturnStatement,argument:e}},createSequenceExpression:function(e){return{type:i.SequenceExpression,expressions:e}},createSwitchCase:function(e,t){return{type:i.SwitchCase,test:e,consequent:t}},createSwitchStatement:function(e,t){return{type:i.SwitchStatement
,discriminant:e,cases:t}},createThisExpression:function(){return{type:i.ThisExpression}},createThrowStatement:function(e){return{type:i.ThrowStatement,argument:e}},createTryStatement:function(e,t,n,r){return{type:i.TryStatement,block:e,guardedHandlers:t,handlers
:n,finalizer:r}},createUnaryExpression:function(e,t){return e==="++"||e==="--"?{type:i.UpdateExpression,operator:e,argument:t,prefix:!0}:{type:i.UnaryExpression,operator:e,argument:t,prefix:!0}},createVariableDeclaration:function(e,t){return{type:i.VariableDeclaration
,declarations:e,kind:t}},createVariableDeclarator:function(e,t){return{type:i.VariableDeclarator,id:e,init:t}},createWhileStatement:function(e,t){return{type:i.WhileStatement,test:e,body:t}},createWithStatement:function(e,t){return{type:i.WithStatement,object
:e,body:t}}},e.version="1.2.5",e.tokenize=mn,e.parse=gn,e.Syntax=function(){var e,t={};typeof Object.create=="function"&&(t=Object.create(null));for(e in i)i.hasOwnProperty(e)&&(t[e]=i[e]);return typeof Object.freeze=="function"&&Object.freeze(t),t}()})
/* jslint-ignore-end */
    }());



    /* istanbul ignore next */
    // init lib estraverse
    (function () {
        var exports;
        // jslint-hack
        local.nop(exports);
        exports = local.estraverse = {};
/* jslint-ignore-begin */
// https://github.com/estools/estraverse/blob/1.9.3/estraverse.js
// utility2-uglifyjs https://raw.githubusercontent.com/estools/estraverse/1.9.3/estraverse.js
(function(e,t){"use strict";typeof define=="function"&&define.amd?define(["exports"],t):typeof exports!="undefined"?t(exports):t(e.estraverse={})})(this,function e(t){"use strict";function c(){}function h(e){var t={},n,r;for(n in e)e.hasOwnProperty(n)&&(r=e
[n],typeof r=="object"&&r!==null?t[n]=h(r):t[n]=r);return t}function p(e){var t={},n;for(n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}function d(e,t){var n,r,i,s;r=e.length,i=0;while(r)n=r>>>1,s=i+n,t(e[s])?r=n:(i=s+1,r-=n+1);return i}function v(e,t){var n
,r,i,s;r=e.length,i=0;while(r)n=r>>>1,s=i+n,t(e[s])?(i=s+1,r-=n+1):r=n;return i}function m(e,t){var n=u(t),r,i,s;for(i=0,s=n.length;i<s;i+=1)r=n[i],e[r]=t[r];return e}function g(e,t){this.parent=e,this.key=t}function y(e,t,n,r){this.node=e,this.path=t,this.
wrap=n,this.ref=r}function b(){}function w(e){return e==null?!1:typeof e=="object"&&typeof e.type=="string"}function E(e,t){return(e===n.ObjectExpression||e===n.ObjectPattern)&&"properties"===t}function S(e,t){var n=new b;return n.traverse(e,t)}function x(e
,t){var n=new b;return n.replace(e,t)}function T(e,t){var n;return n=d(t,function(n){return n.range[0]>e.range[0]}),e.extendedRange=[e.range[0],e.range[1]],n!==t.length&&(e.extendedRange[1]=t[n].range[0]),n-=1,n>=0&&(e.extendedRange[0]=t[n].range[1]),e}function N
(e,t,n){var r=[],s,o,u,a;if(!e.range)throw new Error("attachComments needs range information");if(!n.length){if(t.length){for(u=0,o=t.length;u<o;u+=1)s=h(t[u]),s.extendedRange=[0,e.range[0]],r.push(s);e.leadingComments=r}return e}for(u=0,o=t.length;u<o;u+=1
)r.push(T(h(t[u]),n));return a=0,S(e,{enter:function(e){var t;while(a<r.length){t=r[a];if(t.extendedRange[1]>e.range[0])break;t.extendedRange[1]===e.range[0]?(e.leadingComments||(e.leadingComments=[]),e.leadingComments.push(t),r.splice(a,1)):a+=1}if(a===r.length
)return i.Break;if(r[a].extendedRange[0]>e.range[1])return i.Skip}}),a=0,S(e,{leave:function(e){var t;while(a<r.length){t=r[a];if(e.range[1]<t.extendedRange[0])break;e.range[1]===t.extendedRange[0]?(e.trailingComments||(e.trailingComments=[]),e.trailingComments
.push(t),r.splice(a,1)):a+=1}if(a===r.length)return i.Break;if(r[a].extendedRange[0]>e.range[1])return i.Skip}}),e}var n,r,i,s,o,u,a,f,l;return r=Array.isArray,r||(r=function(t){return Object.prototype.toString.call(t)==="[object Array]"}),c(p),c(v),o=Object
.create||function(){function e(){}return function(t){return e.prototype=t,new e}}(),u=Object.keys||function(e){var t=[],n;for(n in e)t.push(n);return t},n={AssignmentExpression:"AssignmentExpression",ArrayExpression:"ArrayExpression",ArrayPattern:"ArrayPattern"
,ArrowFunctionExpression:"ArrowFunctionExpression",AwaitExpression:"AwaitExpression",BlockStatement:"BlockStatement",BinaryExpression:"BinaryExpression",BreakStatement:"BreakStatement",CallExpression:"CallExpression",CatchClause:"CatchClause",ClassBody:"ClassBody"
,ClassDeclaration:"ClassDeclaration",ClassExpression:"ClassExpression",ComprehensionBlock:"ComprehensionBlock",ComprehensionExpression:"ComprehensionExpression",ConditionalExpression:"ConditionalExpression",ContinueStatement:"ContinueStatement",DebuggerStatement
:"DebuggerStatement",DirectiveStatement:"DirectiveStatement",DoWhileStatement:"DoWhileStatement",EmptyStatement:"EmptyStatement",ExportBatchSpecifier:"ExportBatchSpecifier",ExportDeclaration:"ExportDeclaration",ExportSpecifier:"ExportSpecifier",ExpressionStatement
:"ExpressionStatement",ForStatement:"ForStatement",ForInStatement:"ForInStatement",ForOfStatement:"ForOfStatement",FunctionDeclaration:"FunctionDeclaration",FunctionExpression:"FunctionExpression",GeneratorExpression:"GeneratorExpression",Identifier:"Identifier"
,IfStatement:"IfStatement",ImportDeclaration:"ImportDeclaration",ImportDefaultSpecifier:"ImportDefaultSpecifier",ImportNamespaceSpecifier:"ImportNamespaceSpecifier",ImportSpecifier:"ImportSpecifier",Literal:"Literal",LabeledStatement:"LabeledStatement",LogicalExpression
:"LogicalExpression",MemberExpression:"MemberExpression",MethodDefinition:"MethodDefinition",ModuleSpecifier:"ModuleSpecifier",NewExpression:"NewExpression",ObjectExpression:"ObjectExpression",ObjectPattern:"ObjectPattern",Program:"Program",Property:"Property"
,ReturnStatement:"ReturnStatement",SequenceExpression:"SequenceExpression",SpreadElement:"SpreadElement",SwitchStatement:"SwitchStatement",SwitchCase:"SwitchCase",TaggedTemplateExpression:"TaggedTemplateExpression",TemplateElement:"TemplateElement",TemplateLiteral
:"TemplateLiteral",ThisExpression:"ThisExpression",ThrowStatement:"ThrowStatement",TryStatement:"TryStatement",UnaryExpression:"UnaryExpression",UpdateExpression:"UpdateExpression",VariableDeclaration:"VariableDeclaration",VariableDeclarator:"VariableDeclarator"
,WhileStatement:"WhileStatement",WithStatement:"WithStatement",YieldExpression:"YieldExpression"},s={AssignmentExpression:["left","right"],ArrayExpression:["elements"],ArrayPattern:["elements"],ArrowFunctionExpression:["params","defaults","rest","body"],AwaitExpression
:["argument"],BlockStatement:["body"],BinaryExpression:["left","right"],BreakStatement:["label"],CallExpression:["callee","arguments"],CatchClause:["param","body"],ClassBody:["body"],ClassDeclaration:["id","body","superClass"],ClassExpression:["id","body","superClass"
],ComprehensionBlock:["left","right"],ComprehensionExpression:["blocks","filter","body"],ConditionalExpression:["test","consequent","alternate"],ContinueStatement:["label"],DebuggerStatement:[],DirectiveStatement:[],DoWhileStatement:["body","test"],EmptyStatement
:[],ExportBatchSpecifier:[],ExportDeclaration:["declaration","specifiers","source"],ExportSpecifier:["id","name"],ExpressionStatement:["expression"],ForStatement:["init","test","update","body"],ForInStatement:["left","right","body"],ForOfStatement:["left","right"
,"body"],FunctionDeclaration:["id","params","defaults","rest","body"],FunctionExpression:["id","params","defaults","rest","body"],GeneratorExpression:["blocks","filter","body"],Identifier:[],IfStatement:["test","consequent","alternate"],ImportDeclaration:["specifiers"
,"source"],ImportDefaultSpecifier:["id"],ImportNamespaceSpecifier:["id"],ImportSpecifier:["id","name"],Literal:[],LabeledStatement:["label","body"],LogicalExpression:["left","right"],MemberExpression:["object","property"],MethodDefinition:["key","value"],ModuleSpecifier
:[],NewExpression:["callee","arguments"],ObjectExpression:["properties"],ObjectPattern:["properties"],Program:["body"],Property:["key","value"],ReturnStatement:["argument"],SequenceExpression:["expressions"],SpreadElement:["argument"],SwitchStatement:["discriminant"
,"cases"],SwitchCase:["test","consequent"],TaggedTemplateExpression:["tag","quasi"],TemplateElement:[],TemplateLiteral:["quasis","expressions"],ThisExpression:[],ThrowStatement:["argument"],TryStatement:["block","handlers","handler","guardedHandlers","finalizer"
],UnaryExpression:["argument"],UpdateExpression:["argument"],VariableDeclaration:["declarations"],VariableDeclarator:["id","init"],WhileStatement:["test","body"],WithStatement:["object","body"],YieldExpression:["argument"]},a={},f={},l={},i={Break:a,Skip:f,
Remove:l},g.prototype.replace=function(t){this.parent[this.key]=t},g.prototype.remove=function(){return r(this.parent)?(this.parent.splice(this.key,1),!0):(this.replace(null),!1)},b.prototype.path=function(){function a(e,t){if(r(t))for(i=0,s=t.length;i<s;++
i)e.push(t[i]);else e.push(t)}var t,n,i,s,o,u;if(!this.__current.path)return null;o=[];for(t=2,n=this.__leavelist.length;t<n;++t)u=this.__leavelist[t],a(o,u.path);return a(o,this.__current.path),o},b.prototype.type=function(){var e=this.current();return e.type||
this.__current.wrap},b.prototype.parents=function(){var t,n,r;r=[];for(t=1,n=this.__leavelist.length;t<n;++t)r.push(this.__leavelist[t].node);return r},b.prototype.current=function(){return this.__current.node},b.prototype.__execute=function(t,n){var r,i;return i=
undefined,r=this.__current,this.__current=n,this.__state=null,t&&(i=t.call(this,n.node,this.__leavelist[this.__leavelist.length-1].node)),this.__current=r,i},b.prototype.notify=function(t){this.__state=t},b.prototype.skip=function(){this.notify(f)},b.prototype
["break"]=function(){this.notify(a)},b.prototype.remove=function(){this.notify(l)},b.prototype.__initialize=function(e,t){this.visitor=t,this.root=e,this.__worklist=[],this.__leavelist=[],this.__current=null,this.__state=null,this.__fallback=t.fallback==="iteration"
,this.__keys=s,t.keys&&(this.__keys=m(o(this.__keys),t.keys))},b.prototype.traverse=function(t,n){var i,s,o,l,c,h,p,d,v,m,g,b;this.__initialize(t,n),b={},i=this.__worklist,s=this.__leavelist,i.push(new y(t,null,null,null)),s.push(new y(null,null,null,null))
;while(i.length){o=i.pop();if(o===b){o=s.pop(),h=this.__execute(n.leave,o);if(this.__state===a||h===a)return;continue}if(o.node){h=this.__execute(n.enter,o);if(this.__state===a||h===a)return;i.push(b),s.push(o);if(this.__state===f||h===f)continue;l=o.node,c=
o.wrap||l.type,m=this.__keys[c];if(!m){if(!this.__fallback)throw new Error("Unknown node type "+c+".");m=u(l)}d=m.length;while((d-=1)>=0){p=m[d],g=l[p];if(!g)continue;if(r(g)){v=g.length;while((v-=1)>=0){if(!g[v])continue;if(E(c,m[d]))o=new y(g[v],[p,v],"Property"
,null);else{if(!w(g[v]))continue;o=new y(g[v],[p,v],null,null)}i.push(o)}}else w(g)&&i.push(new y(g,p,null,null))}}}},b.prototype.replace=function(t,n){function i(e){var t,n,r,i;if(e.ref.remove()){n=e.ref.key,i=e.ref.parent,t=s.length;while(t--){r=s[t];if(r
.ref&&r.ref.parent===i){if(r.ref.key<n)break;--r.ref.key}}}}var s,o,c,h,p,d,v,m,b,S,x,T,N;this.__initialize(t,n),x={},s=this.__worklist,o=this.__leavelist,T={root:t},d=new y(t,null,null,new g(T,"root")),s.push(d),o.push(d);while(s.length){d=s.pop();if(d===x
){d=o.pop(),p=this.__execute(n.leave,d),p!==undefined&&p!==a&&p!==f&&p!==l&&d.ref.replace(p),(this.__state===l||p===l)&&i(d);if(this.__state===a||p===a)return T.root;continue}p=this.__execute(n.enter,d),p!==undefined&&p!==a&&p!==f&&p!==l&&(d.ref.replace(p),
d.node=p);if(this.__state===l||p===l)i(d),d.node=null;if(this.__state===a||p===a)return T.root;c=d.node;if(!c)continue;s.push(x),o.push(d);if(this.__state===f||p===f)continue;h=d.wrap||c.type,b=this.__keys[h];if(!b){if(!this.__fallback)throw new Error("Unknown node type "+
h+".");b=u(c)}v=b.length;while((v-=1)>=0){N=b[v],S=c[N];if(!S)continue;if(r(S)){m=S.length;while((m-=1)>=0){if(!S[m])continue;if(E(h,b[v]))d=new y(S[m],[N,m],"Property",new g(S,m));else{if(!w(S[m]))continue;d=new y(S[m],[N,m],null,new g(S,m))}s.push(d)}}else w
(S)&&s.push(new y(S,N,null,new g(c,N)))}}return T.root},t.version="1.8.1-dev",t.Syntax=n,t.traverse=S,t.replace=x,t.attachComments=N,t.VisitorKeys=s,t.VisitorOption=i,t.Controller=b,t.cloneEnvironment=function(){return e({})},t})
/* jslint-ignore-end */
    }());



    /* istanbul ignore next */
    // init lib esutils.code
    (function () {
        var module;
        module = {};
/* jslint-ignore-begin */
// https://github.com/estools/esutils/blob/1.1.6/lib/code.js
// utility2-uglifyjs https://raw.githubusercontent.com/estools/esutils/1.1.6/lib/code.js
(function(){"use strict";function n(e){return e>=48&&e<=57}function r(e){return n(e)||97<=e&&e<=102||65<=e&&e<=70}function i(e){return e>=48&&e<=55}function s(e){return e===32||e===9||e===11||e===12||e===160||e>=5760&&t.indexOf(e)>=0}function o(e){return e===10||
e===13||e===8232||e===8233}function u(t){return t>=97&&t<=122||t>=65&&t<=90||t===36||t===95||t===92||t>=128&&e.NonAsciiIdentifierStart.test(String.fromCharCode(t))}function a(t){return t>=97&&t<=122||t>=65&&t<=90||t>=48&&t<=57||t===36||t===95||t===92||t>=128&&
e.NonAsciiIdentifierPart.test(String.fromCharCode(t))}var e,t;e={NonAsciiIdentifierStart:new RegExp("[\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]"
),NonAsciiIdentifierPart:new RegExp("[\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0300-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u0483-\u0487\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u05d0-\u05ea\u05f0-\u05f2\u0610-\u061a\u0620-\u0669\u066e-\u06d3\u06d5-\u06dc\u06df-\u06e8\u06ea-\u06fc\u06ff\u0710-\u074a\u074d-\u07b1\u07c0-\u07f5\u07fa\u0800-\u082d\u0840-\u085b\u08a0\u08a2-\u08ac\u08e4-\u08fe\u0900-\u0963\u0966-\u096f\u0971-\u0977\u0979-\u097f\u0981-\u0983\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bc-\u09c4\u09c7\u09c8\u09cb-\u09ce\u09d7\u09dc\u09dd\u09df-\u09e3\u09e6-\u09f1\u0a01-\u0a03\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a59-\u0a5c\u0a5e\u0a66-\u0a75\u0a81-\u0a83\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abc-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ad0\u0ae0-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3c-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5c\u0b5d\u0b5f-\u0b63\u0b66-\u0b6f\u0b71\u0b82\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd0\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c58\u0c59\u0c60-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbc-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0cde\u0ce0-\u0ce3\u0ce6-\u0cef\u0cf1\u0cf2\u0d02\u0d03\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d-\u0d44\u0d46-\u0d48\u0d4a-\u0d4e\u0d57\u0d60-\u0d63\u0d66-\u0d6f\u0d7a-\u0d7f\u0d82\u0d83\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e01-\u0e3a\u0e40-\u0e4e\u0e50-\u0e59\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb9\u0ebb-\u0ebd\u0ec0-\u0ec4\u0ec6\u0ec8-\u0ecd\u0ed0-\u0ed9\u0edc-\u0edf\u0f00\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e-\u0f47\u0f49-\u0f6c\u0f71-\u0f84\u0f86-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1049\u1050-\u109d\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u135d-\u135f\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176c\u176e-\u1770\u1772\u1773\u1780-\u17d3\u17d7\u17dc\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1820-\u1877\u1880-\u18aa\u18b0-\u18f5\u1900-\u191c\u1920-\u192b\u1930-\u193b\u1946-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u19d0-\u19d9\u1a00-\u1a1b\u1a20-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1aa7\u1b00-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1bf3\u1c00-\u1c37\u1c40-\u1c49\u1c4d-\u1c7d\u1cd0-\u1cd2\u1cd4-\u1cf6\u1d00-\u1de6\u1dfc-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u200c\u200d\u203f\u2040\u2054\u2071\u207f\u2090-\u209c\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d7f-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2de0-\u2dff\u2e2f\u3005-\u3007\u3021-\u302f\u3031-\u3035\u3038-\u303c\u3041-\u3096\u3099\u309a\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua62b\ua640-\ua66f\ua674-\ua67d\ua67f-\ua697\ua69f-\ua6f1\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua827\ua840-\ua873\ua880-\ua8c4\ua8d0-\ua8d9\ua8e0-\ua8f7\ua8fb\ua900-\ua92d\ua930-\ua953\ua960-\ua97c\ua980-\ua9c0\ua9cf-\ua9d9\uaa00-\uaa36\uaa40-\uaa4d\uaa50-\uaa59\uaa60-\uaa76\uaa7a\uaa7b\uaa80-\uaac2\uaadb-\uaadd\uaae0-\uaaef\uaaf2-\uaaf6\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabea\uabec\uabed\uabf0-\uabf9\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\ufe70-\ufe74\ufe76-\ufefc\uff10-\uff19\uff21-\uff3a\uff3f\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]"
)},t=[5760,6158,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8239,8287,12288,65279],module.exports={isDecimalDigit:n,isHexDigit:r,isOctalDigit:i,isWhiteSpace:s,isLineTerminator:o,isIdentifierStart:u,isIdentifierPart:a}})()
/* jslint-ignore-end */
        local.esutils = { code: module.exports };
    }());



    /* istanbul ignore next */
    // init lib escodegen
    (function () {
        var exports;
        // jslint-hack
        local.nop(exports);
        exports = local.escodegen = {};
/* jslint-ignore-begin */
// https://github.com/estools/escodegen/blob/1.0.1/escodegen.js
// utility2-uglifyjs https://raw.githubusercontent.com/estools/escodegen/1.0.1/escodegen.js
(function(){"use strict";function N(){return{indent:null,base:null,parse:null,comment:!1,format:{indent:{style:"    ",base:0,adjustMultilineComment:!1},newline:"\n",space:" ",json:!1,renumber:!1,hexadecimal:!1,quotes:"single",escapeless:!1,compact:!1,parentheses
:!0,semicolons:!0,safeConcatenation:!1},moz:{starlessGenerator:!1,parenthesizedComprehensionBlock:!1},sourceMap:null,sourceMapRoot:null,sourceMapWithCode:!1,directive:!1,verbatim:null}}function C(e,t){var n="";for(t|=0;t>0;t>>>=1,e+=e)t&1&&(n+=e);return n}function k
(e,t,n,r){function s(e){var t,n;if(o(e))for(t=0,n=e.length;t<n;++t)s(e[t]);else e instanceof k?i.push(e):typeof e=="string"&&e&&i.push(e)}var i=[];s(r),this.children=i}function L(e){return/[\r\n]/g.test(e)}function A(e){var t=e.length;return t&&s.code.isLineTerminator
(e.charCodeAt(t-1))}function O(e,t){function i(e){return typeof e=="object"&&e instanceof Object&&!(e instanceof RegExp)}var n,r;for(n in t)t.hasOwnProperty(n)&&(r=t[n],i(r)?i(e[n])?O(e[n],r):e[n]=O({},r):e[n]=r);return e}function M(e){var t,n,r,i,s;if(e!==
e)throw new Error("Numeric literal whose value is NaN");if(e<0||e===0&&1/e<0)throw new Error("Numeric literal whose value is negative");if(e===1/0)return f?"null":l?"1e400":"1e+400";t=""+e;if(!l||t.length<3)return t;n=t.indexOf("."),!f&&t.charCodeAt(0)===48&&
n===1&&(n=0,t=t.slice(1)),r=t,t=t.replace("e+","e"),i=0,(s=r.indexOf("e"))>0&&(i=+r.slice(s+1),r=r.slice(0,s)),n>=0&&(i-=r.length-n-1,r=+(r.slice(0,n)+r.slice(n+1))+""),s=0;while(r.charCodeAt(r.length+s-1)===48)--s;return s!==0&&(i-=s,r=r.slice(0,s)),i!==0&&
(r+="e"+i),(r.length<t.length||c&&e>1e12&&Math.floor(e)===e&&(r="0x"+e.toString(16)).length<t.length)&&+r===e&&(t=r),t}function _(e,t){return(e&-2)===8232?(t?"u":"\\u")+(e===8232?"2028":"2029"):e===10||e===13?(t?"":"\\")+(e===10?"n":"r"):String.fromCharCode
(e)}function D(e){var t,n,r,i,s,o,u,a;n=e.toString();if(e.source){t=n.match(/\/([^/]*)$/);if(!t)return n;r=t[1],n="",u=!1,a=!1;for(i=0,s=e.source.length;i<s;++i)o=e.source.charCodeAt(i),a?(n+=_(o,a),a=!1):(u?o===93&&(u=!1):o===47?n+="\\":o===91&&(u=!0),n+=_
(o,a),a=o===92);return"/"+n+"/"+r}return n}function P(e,t){var n,r="\\";switch(e){case 8:r+="b";break;case 12:r+="f";break;case 9:r+="t";break;default:n=e.toString(16),f||e>255?r+="u"+"0000".slice(n.length)+n:e===0&&!s.code.isDecimalDigit(t)?r+="0":e===11?r+="x0B"
:r+="x"+"00".slice(n.length)+n}return r}function H(e){var t="\\";switch(e){case 92:t+="\\";break;case 10:t+="n";break;case 13:t+="r";break;case 8232:t+="u2028";break;case 8233:t+="u2029";break;default:throw new Error("Incorrectly classified character")}return t
}function B(e){var t,n,r,i;i=h==="double"?'"':"'";for(t=0,n=e.length;t<n;++t){r=e.charCodeAt(t);if(r===39){i='"';break}if(r===34){i="'";break}r===92&&++t}return i+e+i}function j(e){var t="",n,r,i,o=0,u=0,a,l;for(n=0,r=e.length;n<r;++n){i=e.charCodeAt(n);if(
i===39)++o;else if(i===34)++u;else if(i===47&&f)t+="\\";else{if(s.code.isLineTerminator(i)||i===92){t+=H(i);continue}if(f&&i<32||!(f||p||i>=32&&i<=126)){t+=P(i,e.charCodeAt(n+1));continue}}t+=String.fromCharCode(i)}a=!(h==="double"||h==="auto"&&u<o),l=a?"'"
:'"';if(a?!o:!u)return l+t+l;e=t,t=l;for(n=0,r=e.length;n<r;++n){i=e.charCodeAt(n);if(i===39&&a||i===34&&!a)t+="\\";t+=String.fromCharCode(i)}return t+l}function F(e,t){if(t==null){if(e instanceof r)return e;t={}}return t.loc==null?new r(null,null,S,e,t.name||
null):new r(t.loc.start.line,t.loc.start.column,S===!0?t.loc.source||null:S,e,t.name||null)}function I(){return v?v:" "}function q(e,t){var n=F(e).toString(),r=F(t).toString(),i=n.charCodeAt(n.length-1),o=r.charCodeAt(0);return(i===43||i===45)&&i===o||s.code
.isIdentifierPart(i)&&s.code.isIdentifierPart(o)||i===47&&o===105?[e,I(),t]:s.code.isWhiteSpace(i)||s.code.isLineTerminator(i)||s.code.isWhiteSpace(o)||s.code.isLineTerminator(o)?[e,t]:[e,v,t]}function R(e){return[u,e]}function U(e){var t,n;return t=u,u+=a,
n=e.call(this,u),u=t,n}function z(e){var t;for(t=e.length-1;t>=0;--t)if(s.code.isLineTerminator(e.charCodeAt(t)))break;return e.length-1-t}function W(e,t){var n,r,i,o,a,f,l;n=e.split(/\r\n|[\r\n]/),f=Number.MAX_VALUE;for(r=1,i=n.length;r<i;++r){o=n[r],a=0;while(
a<o.length&&s.code.isWhiteSpace(o.charCodeAt(a)))++a;f>a&&(f=a)}typeof t!="undefined"?(l=u,n[1][f]==="*"&&(t+=" "),u=t):(f&1&&--f,l=u);for(r=1,i=n.length;r<i;++r)n[r]=F(R(n[r].slice(f))).join("");return u=l,n.join("\n")}function X(e,t){return e.type==="Line"?
A(e.value)?"//"+e.value:"//"+e.value+"\n":w.format.indent.adjustMultilineComment&&/[\n\r]/.test(e.value)?W("/*"+e.value+"*/",t):"/*"+e.value+"*/"}function V(t,n){var r,i,s,o,f,l,c;if(t.leadingComments&&t.leadingComments.length>0){o=n,s=t.leadingComments[0],
n=[],y&&t.type===e.Program&&t.body.length===0&&n.push("\n"),n.push(X(s)),A(F(n).toString())||n.push("\n");for(r=1,i=t.leadingComments.length;r<i;++r)s=t.leadingComments[r],c=[X(s)],A(F(c).toString())||c.push("\n"),n.push(R(c));n.push(R(o))}if(t.trailingComments
){f=!A(F(n).toString()),l=C(" ",z(F([u,n,a]).toString()));for(r=0,i=t.trailingComments.length;r<i;++r)s=t.trailingComments[r],f?(r===0?n=[n,a]:n=[n,l],n.push(X(s,l))):n=[n,R(X(s))],r!==i-1&&!A(F(n).toString())&&(n=[n,"\n"])}return n}function $(e,t,n){return t<
n?["(",e,")"]:e}function J(t,n,r){var i,s;return s=!w.comment||!t.leadingComments,t.type===e.BlockStatement&&s?[v,et(t,{functionBody:r})]:t.type===e.EmptyStatement&&s?";":(U(function(){i=[d,R(et(t,{semicolonOptional:n,functionBody:r}))]}),i)}function K(t,n)
{var r=A(F(n).toString());return t.type===e.BlockStatement&&(!w.comment||!t.leadingComments)&&!r?[n,v]:r?[n,u]:[n,d,u]}function Q(e,n){var r,i;i=e[w.verbatim].split(/\r\n|\n/);for(r=1;r<i.length;r++)i[r]=d+u+i[r];return i=$(i,t.Sequence,n.precedence),F(i,e)
}function G(e){return F(e.name,e)}function Y(n){var r,i,s,o,u;u=n.type===e.ArrowFunctionExpression;if(u&&n.params.length===1&&n.params[0].type===e.Identifier)r=[G(n.params[0])];else{r=["("];for(i=0,s=n.params.length;i<s;++i)r.push(G(n.params[i])),i+1<s&&r.push
(","+v);r.push(")")}return u&&r.push(v,"=>"),n.expression?(r.push(v),o=Z(n.body,{precedence:t.Assignment,allowIn:!0,allowCall:!0}),o.toString().charAt(0)==="{"&&(o=["(",o,")"]),r.push(o)):r.push(J(n.body,!1,!0)),r}function Z(r,i){var o,a,f,l,c,h,p,g,y,b,S,x
,T,N,C,k;a=i.precedence,T=i.allowIn,N=i.allowCall,f=r.type||i.type;if(w.verbatim&&r.hasOwnProperty(w.verbatim))return Q(r,i);switch(f){case e.SequenceExpression:o=[],T|=t.Sequence<a;for(c=0,h=r.expressions.length;c<h;++c)o.push(Z(r.expressions[c],{precedence
:t.Assignment,allowIn:T,allowCall:!0})),c+1<h&&o.push(","+v);o=$(o,t.Sequence,a);break;case e.AssignmentExpression:T|=t.Assignment<a,o=$([Z(r.left,{precedence:t.Call,allowIn:T,allowCall:!0}),v+r.operator+v,Z(r.right,{precedence:t.Assignment,allowIn:T,allowCall
:!0})],t.Assignment,a);break;case e.ArrowFunctionExpression:T|=t.ArrowFunction<a,o=$(Y(r),t.ArrowFunction,a);break;case e.ConditionalExpression:T|=t.Conditional<a,o=$([Z(r.test,{precedence:t.LogicalOR,allowIn:T,allowCall:!0}),v+"?"+v,Z(r.consequent,{precedence
:t.Assignment,allowIn:T,allowCall:!0}),v+":"+v,Z(r.alternate,{precedence:t.Assignment,allowIn:T,allowCall:!0})],t.Conditional,a);break;case e.LogicalExpression:case e.BinaryExpression:l=n[r.operator],T|=l<a,g=Z(r.left,{precedence:l,allowIn:T,allowCall:!0}),
S=g.toString(),S.charCodeAt(S.length-1)===47&&s.code.isIdentifierPart(r.operator.charCodeAt(0))?o=[g,I(),r.operator]:o=q(g,r.operator),g=Z(r.right,{precedence:l+1,allowIn:T,allowCall:!0}),r.operator==="/"&&g.toString().charAt(0)==="/"||r.operator.slice(-1)==="<"&&
g.toString().slice(0,3)==="!--"?o.push(I(),g):o=q(o,g),r.operator==="in"&&!T?o=["(",o,")"]:o=$(o,l,a);break;case e.CallExpression:o=[Z(r.callee,{precedence:t.Call,allowIn:!0,allowCall:!0,allowUnparenthesizedNew:!1})],o.push("(");for(c=0,h=r.arguments.length
;c<h;++c)o.push(Z(r.arguments[c],{precedence:t.Assignment,allowIn:!0,allowCall:!0})),c+1<h&&o.push(","+v);o.push(")"),N?o=$(o,t.Call,a):o=["(",o,")"];break;case e.NewExpression:h=r.arguments.length,C=i.allowUnparenthesizedNew===undefined||i.allowUnparenthesizedNew
,o=q("new",Z(r.callee,{precedence:t.New,allowIn:!0,allowCall:!1,allowUnparenthesizedNew:C&&!m&&h===0}));if(!C||m||h>0){o.push("(");for(c=0;c<h;++c)o.push(Z(r.arguments[c],{precedence:t.Assignment,allowIn:!0,allowCall:!0})),c+1<h&&o.push(","+v);o.push(")")}o=
$(o,t.New,a);break;case e.MemberExpression:o=[Z(r.object,{precedence:t.Call,allowIn:!0,allowCall:N,allowUnparenthesizedNew:!1})],r.computed?o.push("[",Z(r.property,{precedence:t.Sequence,allowIn:!0,allowCall:N}),"]"):(r.object.type===e.Literal&&typeof r.object
.value=="number"&&(g=F(o).toString(),g.indexOf(".")<0&&!/[eExX]/.test(g)&&s.code.isDecimalDigit(g.charCodeAt(g.length-1))&&!(g.length>=2&&g.charCodeAt(0)===48)&&o.push(".")),o.push(".",G(r.property))),o=$(o,t.Member,a);break;case e.UnaryExpression:g=Z(r.argument
,{precedence:t.Unary,allowIn:!0,allowCall:!0}),v===""?o=q(r.operator,g):(o=[r.operator],r.operator.length>2?o=q(o,g):(S=F(o).toString(),b=S.charCodeAt(S.length-1),x=g.toString().charCodeAt(0),(b===43||b===45)&&b===x||s.code.isIdentifierPart(b)&&s.code.isIdentifierPart
(x)?o.push(I(),g):o.push(g))),o=$(o,t.Unary,a);break;case e.YieldExpression:r.delegate?o="yield*":o="yield",r.argument&&(o=q(o,Z(r.argument,{precedence:t.Yield,allowIn:!0,allowCall:!0}))),o=$(o,t.Yield,a);break;case e.UpdateExpression:r.prefix?o=$([r.operator
,Z(r.argument,{precedence:t.Unary,allowIn:!0,allowCall:!0})],t.Unary,a):o=$([Z(r.argument,{precedence:t.Postfix,allowIn:!0,allowCall:!0}),r.operator],t.Postfix,a);break;case e.FunctionExpression:o="function",r.id?o=[o,I(),G(r.id),Y(r)]:o=[o+v,Y(r)];break;case e
.ArrayPattern:case e.ArrayExpression:if(!r.elements.length){o="[]";break}y=r.elements.length>1,o=["[",y?d:""],U(function(e){for(c=0,h=r.elements.length;c<h;++c)r.elements[c]?o.push(y?e:"",Z(r.elements[c],{precedence:t.Assignment,allowIn:!0,allowCall:!0})):(
y&&o.push(e),c+1===h&&o.push(",")),c+1<h&&o.push(","+(y?d:v))}),y&&!A(F(o).toString())&&o.push(d),o.push(y?u:"","]");break;case e.Property:r.kind==="get"||r.kind==="set"?o=[r.kind,I(),Z(r.key,{precedence:t.Sequence,allowIn:!0,allowCall:!0}),Y(r.value)]:r.shorthand?
o=Z(r.key,{precedence:t.Sequence,allowIn:!0,allowCall:!0}):r.method?(o=[],r.value.generator&&o.push("*"),o.push(Z(r.key,{precedence:t.Sequence,allowIn:!0,allowCall:!0}),Y(r.value))):o=[Z(r.key,{precedence:t.Sequence,allowIn:!0,allowCall:!0}),":"+v,Z(r.value
,{precedence:t.Assignment,allowIn:!0,allowCall:!0})];break;case e.ObjectExpression:if(!r.properties.length){o="{}";break}y=r.properties.length>1,U(function(){g=Z(r.properties[0],{precedence:t.Sequence,allowIn:!0,allowCall:!0,type:e.Property})});if(!y&&!L(F(
g).toString())){o=["{",v,g,v,"}"];break}U(function(n){o=["{",d,n,g];if(y){o.push(","+d);for(c=1,h=r.properties.length;c<h;++c)o.push(n,Z(r.properties[c],{precedence:t.Sequence,allowIn:!0,allowCall:!0,type:e.Property})),c+1<h&&o.push(","+d)}}),A(F(o).toString
())||o.push(d),o.push(u,"}");break;case e.ObjectPattern:if(!r.properties.length){o="{}";break}y=!1;if(r.properties.length===1)k=r.properties[0],k.value.type!==e.Identifier&&(y=!0);else for(c=0,h=r.properties.length;c<h;++c){k=r.properties[c];if(!k.shorthand
){y=!0;break}}o=["{",y?d:""],U(function(e){for(c=0,h=r.properties.length;c<h;++c)o.push(y?e:"",Z(r.properties[c],{precedence:t.Sequence,allowIn:!0,allowCall:!0})),c+1<h&&o.push(","+(y?d:v))}),y&&!A(F(o).toString())&&o.push(d),o.push(y?u:"","}");break;case e
.ThisExpression:o="this";break;case e.Identifier:o=G(r);break;case e.Literal:if(r.hasOwnProperty("raw")&&E)try{p=E(r.raw).body[0].expression;if(p.type===e.Literal&&p.value===r.value){o=r.raw;break}}catch(O){}if(r.value===null){o="null";break}if(typeof r.value=="string"
){o=j(r.value);break}if(typeof r.value=="number"){o=M(r.value);break}if(typeof r.value=="boolean"){o=r.value?"true":"false";break}o=D(r.value);break;case e.ComprehensionExpression:o=["[",Z(r.body,{precedence:t.Assignment,allowIn:!0,allowCall:!0})];if(r.blocks
)for(c=0,h=r.blocks.length;c<h;++c)g=Z(r.blocks[c],{precedence:t.Sequence,allowIn:!0,allowCall:!0}),o=q(o,g);r.filter&&(o=q(o,"if"+v),g=Z(r.filter,{precedence:t.Sequence,allowIn:!0,allowCall:!0}),w.moz.parenthesizedComprehensionBlock?o=q(o,["(",g,")"]):o=q(
o,g)),o.push("]");break;case e.ComprehensionBlock:r.left.type===e.VariableDeclaration?g=[r.left.kind,I(),et(r.left.declarations[0],{allowIn:!1})]:g=Z(r.left,{precedence:t.Call,allowIn:!0,allowCall:!0}),g=q(g,r.of?"of":"in"),g=q(g,Z(r.right,{precedence:t.Sequence
,allowIn:!0,allowCall:!0})),w.moz.parenthesizedComprehensionBlock?o=["for"+v+"(",g,")"]:o=q("for"+v,g);break;default:throw new Error("Unknown expression type: "+r.type)}return F(o,r)}function et(n,r){var i,s,o,u,a,f,l,c,h;a=!0,h=";",f=!1,l=!1,r&&(a=r.allowIn===
undefined||r.allowIn,!g&&r.semicolonOptional===!0&&(h=""),f=r.functionBody,l=r.directiveContext);switch(n.type){case e.BlockStatement:o=["{",d],U(function(){for(i=0,s=n.body.length;i<s;++i)c=R(et(n.body[i],{semicolonOptional:i===s-1,directiveContext:f})),o.
push(c),A(F(c).toString())||o.push(d)}),o.push(R("}"));break;case e.BreakStatement:n.label?o="break "+n.label.name+h:o="break"+h;break;case e.ContinueStatement:n.label?o="continue "+n.label.name+h:o="continue"+h;break;case e.DirectiveStatement:n.raw?o=n.raw+
h:o=B(n.directive)+h;break;case e.DoWhileStatement:o=q("do",J(n.body)),o=K(n.body,o),o=q(o,["while"+v+"(",Z(n.test,{precedence:t.Sequence,allowIn:!0,allowCall:!0}),")"+h]);break;case e.CatchClause:U(function(){o=["catch"+v+"(",Z(n.param,{precedence:t.Sequence
,allowIn:!0,allowCall:!0}),")"]}),o.push(J(n.body));break;case e.DebuggerStatement:o="debugger"+h;break;case e.EmptyStatement:o=";";break;case e.ExpressionStatement:o=[Z(n.expression,{precedence:t.Sequence,allowIn:!0,allowCall:!0})],c=F(o).toString(),c.charAt
(0)==="{"||c.slice(0,8)==="function"&&" (".indexOf(c.charAt(8))>=0||b&&l&&n.expression.type===e.Literal&&typeof n.expression.value=="string"?o=["(",o,")"+h]:o.push(h);break;case e.VariableDeclarator:n.init?o=[Z(n.id,{precedence:t.Assignment,allowIn:a,allowCall
:!0}),v,"=",v,Z(n.init,{precedence:t.Assignment,allowIn:a,allowCall:!0})]:o=G(n.id);break;case e.VariableDeclaration:o=[n.kind],n.declarations.length===1&&n.declarations[0].init&&n.declarations[0].init.type===e.FunctionExpression?o.push(I(),et(n.declarations
[0],{allowIn:a})):U(function(){u=n.declarations[0],w.comment&&u.leadingComments?o.push("\n",R(et(u,{allowIn:a}))):o.push(I(),et(u,{allowIn:a}));for(i=1,s=n.declarations.length;i<s;++i)u=n.declarations[i],w.comment&&u.leadingComments?o.push(","+d,R(et(u,{allowIn
:a}))):o.push(","+v,et(u,{allowIn:a}))}),o.push(h);break;case e.ThrowStatement:o=[q("throw",Z(n.argument,{precedence:t.Sequence,allowIn:!0,allowCall:!0})),h];break;case e.TryStatement:o=["try",J(n.block)],o=K(n.block,o);if(n.handlers)for(i=0,s=n.handlers.length
;i<s;++i){o=q(o,et(n.handlers[i]));if(n.finalizer||i+1!==s)o=K(n.handlers[i].body,o)}else{if(n.handler){o=q(o,et(n.handler));if(n.finalizer||n.guardedHandlers.length>0)o=K(n.handler.body,o)}for(i=0,s=n.guardedHandlers.length;i<s;++i){o=q(o,et(n.guardedHandlers
[i]));if(n.finalizer||i+1!==s)o=K(n.guardedHandlers[i].body,o)}}n.finalizer&&(o=q(o,["finally",J(n.finalizer)]));break;case e.SwitchStatement:U(function(){o=["switch"+v+"(",Z(n.discriminant,{precedence:t.Sequence,allowIn:!0,allowCall:!0}),")"+v+"{"+d]});if(
n.cases)for(i=0,s=n.cases.length;i<s;++i)c=R(et(n.cases[i],{semicolonOptional:i===s-1})),o.push(c),A(F(c).toString())||o.push(d);o.push(R("}"));break;case e.SwitchCase:U(function(){n.test?o=[q("case",Z(n.test,{precedence:t.Sequence,allowIn:!0,allowCall:!0})
),":"]:o=["default:"],i=0,s=n.consequent.length,s&&n.consequent[0].type===e.BlockStatement&&(c=J(n.consequent[0]),o.push(c),i=1),i!==s&&!A(F(o).toString())&&o.push(d);for(;i<s;++i)c=R(et(n.consequent[i],{semicolonOptional:i===s-1&&h===""})),o.push(c),i+1!==
s&&!A(F(c).toString())&&o.push(d)});break;case e.IfStatement:U(function(){o=["if"+v+"(",Z(n.test,{precedence:t.Sequence,allowIn:!0,allowCall:!0}),")"]}),n.alternate?(o.push(J(n.consequent)),o=K(n.consequent,o),n.alternate.type===e.IfStatement?o=q(o,["else "
,et(n.alternate,{semicolonOptional:h===""})]):o=q(o,q("else",J(n.alternate,h==="")))):o.push(J(n.consequent,h===""));break;case e.ForStatement:U(function(){o=["for"+v+"("],n.init?n.init.type===e.VariableDeclaration?o.push(et(n.init,{allowIn:!1})):o.push(Z(n
.init,{precedence:t.Sequence,allowIn:!1,allowCall:!0}),";"):o.push(";"),n.test?o.push(v,Z(n.test,{precedence:t.Sequence,allowIn:!0,allowCall:!0}),";"):o.push(";"),n.update?o.push(v,Z(n.update,{precedence:t.Sequence,allowIn:!0,allowCall:!0}),")"):o.push(")")
}),o.push(J(n.body,h===""));break;case e.ForInStatement:o=["for"+v+"("],U(function(){n.left.type===e.VariableDeclaration?U(function(){o.push(n.left.kind+I(),et(n.left.declarations[0],{allowIn:!1}))}):o.push(Z(n.left,{precedence:t.Call,allowIn:!0,allowCall:!0
})),o=q(o,"in"),o=[q(o,Z(n.right,{precedence:t.Sequence,allowIn:!0,allowCall:!0})),")"]}),o.push(J(n.body,h===""));break;case e.LabeledStatement:o=[n.label.name+":",J(n.body,h==="")];break;case e.Program:s=n.body.length,o=[y&&s>0?"\n":""];for(i=0;i<s;++i)c=
R(et(n.body[i],{semicolonOptional:!y&&i===s-1,directiveContext:!0})),o.push(c),i+1<s&&!A(F(c).toString())&&o.push(d);break;case e.FunctionDeclaration:o=[n.generator&&!w.moz.starlessGenerator?"function* ":"function ",G(n.id),Y(n)];break;case e.ReturnStatement
:n.argument?o=[q("return",Z(n.argument,{precedence:t.Sequence,allowIn:!0,allowCall:!0})),h]:o=["return"+h];break;case e.WhileStatement:U(function(){o=["while"+v+"(",Z(n.test,{precedence:t.Sequence,allowIn:!0,allowCall:!0}),")"]}),o.push(J(n.body,h===""));break;
case e.WithStatement:U(function(){o=["with"+v+"(",Z(n.object,{precedence:t.Sequence,allowIn:!0,allowCall:!0}),")"]}),o.push(J(n.body,h===""));break;default:throw new Error("Unknown statement type: "+n.type)}return w.comment&&(o=V(n,o)),c=F(o).toString(),n.type===
e.Program&&!y&&d===""&&c.charAt(c.length-1)==="\n"&&(o=F(o).replaceRight(/\s+$/,"")),F(o,n)}function tt(n,i){var s=N(),o,x;i!=null?(typeof i.indent=="string"&&(s.format.indent.style=i.indent),typeof i.base=="number"&&(s.format.indent.base=i.base),i=O(s,i),a=
i.format.indent.style,typeof i.base=="string"?u=i.base:u=C(a,i.format.indent.base)):(i=s,a=i.format.indent.style,u=C(a,i.format.indent.base)),f=i.format.json,l=i.format.renumber,c=f?!1:i.format.hexadecimal,h=f?"double":i.format.quotes,p=i.format.escapeless,
d=i.format.newline,v=i.format.space,i.format.compact&&(d=v=a=u=""),m=i.format.parentheses,g=i.format.semicolons,y=i.format.safeConcatenation,b=i.directive,E=f?null:i.parse,S=i.sourceMap,w=i,S?exports.browser?r=global.sourceMap.SourceNode:r=require("source-map"
).SourceNode:r=k;switch(n.type){case e.BlockStatement:case e.BreakStatement:case e.CatchClause:case e.ContinueStatement:case e.DirectiveStatement:case e.DoWhileStatement:case e.DebuggerStatement:case e.EmptyStatement:case e.ExpressionStatement:case e.ForStatement
:case e.ForInStatement:case e.FunctionDeclaration:case e.IfStatement:case e.LabeledStatement:case e.Program:case e.ReturnStatement:case e.SwitchStatement:case e.SwitchCase:case e.ThrowStatement:case e.TryStatement:case e.VariableDeclaration:case e.VariableDeclarator
:case e.WhileStatement:case e.WithStatement:o=et(n);break;case e.AssignmentExpression:case e.ArrayExpression:case e.ArrayPattern:case e.BinaryExpression:case e.CallExpression:case e.ConditionalExpression:case e.FunctionExpression:case e.Identifier:case e.Literal
:case e.LogicalExpression:case e.MemberExpression:case e.NewExpression:case e.ObjectExpression:case e.ObjectPattern:case e.Property:case e.SequenceExpression:case e.ThisExpression:case e.UnaryExpression:case e.UpdateExpression:case e.YieldExpression:o=Z(n,{
precedence:t.Sequence,allowIn:!0,allowCall:!0});break;default:throw new Error("Unknown node type: "+n.type)}return S?(x=o.toStringWithSourceMap({file:i.file,sourceRoot:i.sourceMapRoot}),i.sourceContent&&x.map.setSourceContent(i.sourceMap,i.sourceContent),i.
sourceMapWithCode?x:x.map.toString()):o.toString()}var e,t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T;i=require("estraverse"),s=require("esutils"),e={AssignmentExpression:"AssignmentExpression",ArrayExpression:"ArrayExpression",ArrayPattern:"ArrayPattern"
,ArrowFunctionExpression:"ArrowFunctionExpression",BlockStatement:"BlockStatement",BinaryExpression:"BinaryExpression",BreakStatement:"BreakStatement",CallExpression:"CallExpression",CatchClause:"CatchClause",ComprehensionBlock:"ComprehensionBlock",ComprehensionExpression
:"ComprehensionExpression",ConditionalExpression:"ConditionalExpression",ContinueStatement:"ContinueStatement",DirectiveStatement:"DirectiveStatement",DoWhileStatement:"DoWhileStatement",DebuggerStatement:"DebuggerStatement",EmptyStatement:"EmptyStatement",
ExpressionStatement:"ExpressionStatement",ForStatement:"ForStatement",ForInStatement:"ForInStatement",FunctionDeclaration:"FunctionDeclaration",FunctionExpression:"FunctionExpression",Identifier:"Identifier",IfStatement:"IfStatement",Literal:"Literal",LabeledStatement
:"LabeledStatement",LogicalExpression:"LogicalExpression",MemberExpression:"MemberExpression",NewExpression:"NewExpression",ObjectExpression:"ObjectExpression",ObjectPattern:"ObjectPattern",Program:"Program",Property:"Property",ReturnStatement:"ReturnStatement"
,SequenceExpression:"SequenceExpression",SwitchStatement:"SwitchStatement",SwitchCase:"SwitchCase",ThisExpression:"ThisExpression",ThrowStatement:"ThrowStatement",TryStatement:"TryStatement",UnaryExpression:"UnaryExpression",UpdateExpression:"UpdateExpression"
,VariableDeclaration:"VariableDeclaration",VariableDeclarator:"VariableDeclarator",WhileStatement:"WhileStatement",WithStatement:"WithStatement",YieldExpression:"YieldExpression"},t={Sequence:0,Yield:1,Assignment:1,Conditional:2,ArrowFunction:2,LogicalOR:3,
LogicalAND:4,BitwiseOR:5,BitwiseXOR:6,BitwiseAND:7,Equality:8,Relational:9,BitwiseSHIFT:10,Additive:11,Multiplicative:12,Unary:13,Postfix:14,Call:15,New:16,Member:17,Primary:18},n={"||":t.LogicalOR,"&&":t.LogicalAND,"|":t.BitwiseOR,"^":t.BitwiseXOR,"&":t.BitwiseAND
,"==":t.Equality,"!=":t.Equality,"===":t.Equality,"!==":t.Equality,is:t.Equality,isnt:t.Equality,"<":t.Relational,">":t.Relational,"<=":t.Relational,">=":t.Relational,"in":t.Relational,"instanceof":t.Relational,"<<":t.BitwiseSHIFT,">>":t.BitwiseSHIFT,">>>":
t.BitwiseSHIFT,"+":t.Additive,"-":t.Additive,"*":t.Multiplicative,"%":t.Multiplicative,"/":t.Multiplicative},o=Array.isArray,o||(o=function(t){return Object.prototype.toString.call(t)==="[object Array]"}),k.prototype.toString=function nt(){var e="",t,n,r;for(
t=0,n=this.children.length;t<n;++t)r=this.children[t],r instanceof k?e+=r.toString():e+=r;return e},k.prototype.replaceRight=function(t,n){var r=this.children[this.children.length-1];return r instanceof k?r.replaceRight(t,n):typeof r=="string"?this.children
[this.children.length-1]=r.replace(t,n):this.children.push("".replace(t,n)),this},k.prototype.join=function(t){var n,r,i;i=[],r=this.children.length;if(r>0){--r;for(n=0;n<r;++n)i.push(this.children[n],t);i.push(this.children[r]),this.children=i}return this}
,x={indent:{style:"",base:0},renumber:!0,hexadecimal:!0,quotes:"auto",escapeless:!0,compact:!0,parentheses:!1,semicolons:!1},T=N().format,exports.version=require("./package.json").version,exports.generate=tt,exports.attachComments=i.attachComments,exports.browser=!1
,exports.FORMAT_MINIFY=x,exports.FORMAT_DEFAULTS=T})()
/* jslint-ignore-end */
    }());



    // init lib handlebars
    (function () {
        // https://github.com/components/handlebars.js/blob/v1.2.1/handlebars.js
        local.handlebars = {};
        local.handlebars.compile = function (template) {
            return function (dict) {
                var result;
                result = template;
                // render triple-curly-brace
                result = result.replace((/\{\{\{/g), '{{').replace((/\}\}\}/g), '}}');
                // render with-statement
                result = result.replace(
                    (/\{\{#with (.+?)\}\}([\S\s]+?)\{\{\/with\}\}/g),
                    function (match0, match1, match2) {
                        // jslint-hack
                        local.nop(match0);
                        return local.handlebars.replace(match2, dict, match1 + '.');
                    }
                );
                // render helper
                result = result.replace(
                    '{{#show_ignores metrics}}{{/show_ignores}}',
                    function () {
                        return local.handlebars.show_ignores(dict.metrics);
                    }
                );
                result = result.replace('{{#show_line_execution_counts fileCoverage}}' +
                    '{{maxLines}}{{/show_line_execution_counts}}', function () {
                        return local.handlebars.show_line_execution_counts(
                            dict.fileCoverage,
                            { fn: function () {
                                return dict.maxLines;
                            } }
                        );
                    });
                result = result.replace(
                    '{{#show_lines}}{{maxLines}}{{/show_lines}}',
                    function () {
                        return local.handlebars.show_lines({ fn: function () {
                            return dict.maxLines;
                        } });
                    }
                );
                result = result.replace(
                    '{{#show_picture}}{{metrics.statements.pct}}{{/show_picture}}',
                    function () {
                        return local.handlebars.show_picture({ fn: function () {
                            return dict.metrics.statements.pct;
                        } });
                    }
                );
                result = local.handlebars.replace(result, dict, '');
                // show code last
                result = result.replace(
                    '{{#show_code structured}}{{/show_code}}',
                    function () {
                        return local.handlebars.show_code(dict.structured);
                    }
                );
                return result;
            };
        };
        local.handlebars.registerHelper = function (key, helper) {
            local.handlebars[key] = function () {
                try {
                    return helper.apply(null, arguments);
                } catch (ignore) {
                }
            };
        };
        local.handlebars.replace = function (template, dict, withPrefix) {
            /*
             * this function will replace the keys in the template with the dict's key / value
             */
            var value;
            // search for keys in the template
            return template.replace((/\{\{.+?\}\}/g), function (match0) {
                value = dict;
                // iteratively lookup nested values in the dict
                (withPrefix + match0.slice(2, -2)).split('.').forEach(function (key) {
                    value = value && value[key];
                });
                return value === undefined
                    ? match0
                    : String(value);
            });
        };
    }());



    // init lib istanbul.collector
    (function () {
        // https://github.com/gotwarlost/istanbul/blob/v0.2.16/lib/collector.js
        local.collectorCreate = function (options) {
            return {
                fileCoverageFor: function (file) {
                    return options.coverage[file];
                },
                files: function () {
                    return Object.keys(options.coverage).filter(function (key) {
                        return local.codeDict[key];
                    });
                }
            };
        };
    }());



    /* istanbul ignore next */
    // init lib istanbul.insertion-text
    (function () {
        var module;
        module = {};
/* jslint-ignore-begin */
// https://github.com/gotwarlost/istanbul/blob/v0.2.16/lib/util/insertion-text.js
// utility2-uglifyjs https://raw.githubusercontent.com/gotwarlost/istanbul/v0.2.16/lib/util/insertion-text.js
function InsertionText(e,t){this.text=e,this.origLength=e.length,this.offsets=[],this.consumeBlanks=t,this.startPos=this.findFirstNonBlank(),this.endPos=this.findLastNonBlank()}var WHITE_RE=/[ \f\n\r\t\v\u00A0\u2028\u2029]/;InsertionText.prototype={findFirstNonBlank
:function(){var e=-1,t=this.text,n=t.length,r;for(r=0;r<n;r+=1)if(!t.charAt(r).match(WHITE_RE)){e=r;break}return e},findLastNonBlank:function(){var e=this.text,t=e.length,n=e.length+1,r;for(r=t-1;r>=0;r-=1)if(!e.charAt(r).match(WHITE_RE)){n=r;break}return n
},originalLength:function(){return this.origLength},insertAt:function(e,t,n,r){r=typeof r=="undefined"?this.consumeBlanks:r,e=e>this.originalLength()?this.originalLength():e,e=e<0?0:e,r&&(e<=this.startPos&&(e=0),e>this.endPos&&(e=this.origLength));var i=t.length
,s=this.findOffset(e,i,n),o=e+s,u=this.text;return this.text=u.substring(0,o)+t+u.substring(o),this},findOffset:function(e,t,n){var r=this.offsets,i,s=0,o;for(o=0;o<r.length;o+=1){i=r[o];if(i.pos<e||i.pos===e&&!n)s+=i.len;if(i.pos>=e)break}return i&&i.pos===
e?i.len+=t:r.splice(o,0,{pos:e,len:t}),s},wrap:function(e,t,n,r,i){return this.insertAt(e,t,!0,i),this.insertAt(n,r,!1,i),this},wrapLine:function(e,t){this.wrap(0,e,this.originalLength(),t)},toString:function(){return this.text}},module.exports=InsertionText
/* jslint-ignore-end */
        local['../util/insertion-text'] = module.exports;
    }());



    /* istanbul ignore next */
    // init lib istanbul.instrumenter
    (function () {
        var escodegen, esprima, module, window;
        // jslint-hack
        local.nop(escodegen, esprima, module, window);
        escodegen = local.escodegen;
        esprima = local.esprima;
        module = undefined;
        window = local;
/* jslint-ignore-begin */
// https://github.com/gotwarlost/istanbul/blob/v0.2.16/lib/instrumenter.js
// utility2-uglifyjs https://raw.githubusercontent.com/gotwarlost/istanbul/v0.2.16/lib/instrumenter.js
(function(e){"use strict";function p(e,t){var n,r;return s!==null?(n=s.createHash("md5"),n.update(e),r=n.digest("base64"),r=r.replace(new RegExp("=","g"),"").replace(new RegExp("\\+","g"),"_").replace(new RegExp("/","g"),"$")):(window.__cov_seq=window.__cov_seq||0
,window.__cov_seq+=1,r=window.__cov_seq),"__cov_"+(t?"":r)}function d(e,t){h(t)||(t=[t]),Array.prototype.push.apply(e,t)}function v(e,t,n,r){this.walkMap=e,this.preprocessor=t,this.scope=n,this.debug=r,this.debug&&(this.level=0,this.seq=!0)}function m(e,n){
var r=e.type,i,s,o=t[r].children,u=!!e.loc||e.type===t.Program.name,a=u?n.walkMap[r]:null,f,l,c,p,v,m,g,y,b,w,E;if(e.walking)throw new Error("Infinite regress: Custom walkers may NOT call walker.apply(node)");e.walking=!0,m=n.apply(e,n.preprocessor),i=m.preprocessor
,i&&(delete m.preprocessor,m=n.apply(e,i));if(h(a))for(c=0;c<a.length;c+=1){E=c===a.length-1,m=n.apply(m,a[c]);if(m.type!==r&&!E)throw new Error("Only the last walker is allowed to change the node type: [type was: "+r+" ]")}else a&&(m=n.apply(e,a));for(f=0;
f<o.length;f+=1){p=o[f],v=e[p];if(v&&!v.skipWalk){b={node:e,property:p};if(h(v)){g=[];for(l=0;l<v.length;l+=1)y=v[l],b.index=l,y&&(w=n.apply(y,null,b),h(w.prepend)&&(d(g,w.prepend),delete w.prepend)),d(g,w);e[p]=g}else{w=n.apply(v,null,b);if(h(w.prepend))throw new
Error("Internal error: attempt to prepend statements in disallowed (non-array) context");e[p]=w}}}return s=m.postprocessor,s&&(delete m.postprocessor,m=n.apply(m,s)),delete e.walking,m}function g(e){this.opts=e||{debug:!1,walkDebug:!1,coverageVariable:"__coverage__"
,codeGenerationOptions:undefined,noAutoWrap:!1,noCompact:!1,embedSource:!1,preserveComments:!1},this.walker=new v({ExpressionStatement:this.coverStatement,BreakStatement:this.coverStatement,ContinueStatement:this.coverStatement,DebuggerStatement:this.coverStatement
,ReturnStatement:this.coverStatement,ThrowStatement:this.coverStatement,TryStatement:this.coverStatement,VariableDeclaration:this.coverStatement,IfStatement:[this.ifBlockConverter,this.coverStatement,this.ifBranchInjector],ForStatement:[this.skipInit,this.loopBlockConverter
,this.coverStatement],ForInStatement:[this.skipLeft,this.loopBlockConverter,this.coverStatement],WhileStatement:[this.loopBlockConverter,this.coverStatement],DoWhileStatement:[this.loopBlockConverter,this.coverStatement],SwitchStatement:[this.coverStatement
,this.switchBranchInjector],SwitchCase:[this.switchCaseInjector],WithStatement:[this.withBlockConverter,this.coverStatement],FunctionDeclaration:[this.coverFunction,this.coverStatement],FunctionExpression:this.coverFunction,LabeledStatement:this.coverStatement
,ConditionalExpression:this.conditionalBranchInjector,LogicalExpression:this.logicalExpressionBranchInjector,ObjectExpression:this.maybeAddType},this.extractCurrentHint,this,this.opts.walkDebug),this.opts.backdoor&&this.opts.backdoor.omitTrackerSuffix&&(this
.omitTrackerSuffix=!0)}var t,n,r=e?require("esprima"):esprima,i=e?require("escodegen"):escodegen,s=e?require("crypto"):null,o="(function () { ",u="\n}());",a=/^\s*istanbul\s+ignore\s+(if|else|next)(?=\W|$)/,f,l,c,h=Array.isArray;h||(h=function(e){return e&&
Object.prototype.toString.call(e)==="[object Array]"});if(!e){l={"Could not find esprima":r,"Could not find escodegen":i,"JSON object not in scope":JSON,"Array does not implement push":[].push,"Array does not implement unshift":[].unshift};for(c in l)if(l.hasOwnProperty
(c)&&!l[c])throw new Error(c)}t={ArrayExpression:["elements"],AssignmentExpression:["left","right"],BinaryExpression:["left","right"],BlockStatement:["body"],BreakStatement:["label"],CallExpression:["callee","arguments"],CatchClause:["param","body"],ConditionalExpression
:["test","consequent","alternate"],ContinueStatement:["label"],DebuggerStatement:[],DoWhileStatement:["test","body"],EmptyStatement:[],ExpressionStatement:["expression"],ForInStatement:["left","right","body"],ForStatement:["init","test","update","body"],FunctionDeclaration
:["id","params","body"],FunctionExpression:["id","params","defaults","body"],Identifier:[],IfStatement:["test","consequent","alternate"],LabeledStatement:["label","body"],Literal:[],LogicalExpression:["left","right"],MemberExpression:["object","property"],NewExpression
:["callee","arguments"],ObjectExpression:["properties"],Program:["body"],Property:["key","value"],ReturnStatement:["argument"],SequenceExpression:["expressions"],SwitchCase:["test","consequent"],SwitchStatement:["discriminant","cases"],ThisExpression:[],ThrowStatement
:["argument"],TryStatement:["block","handlers","finalizer"],UnaryExpression:["argument"],UpdateExpression:["argument"],VariableDeclaration:["declarations"],VariableDeclarator:["id","init"],WhileStatement:["test","body"],WithStatement:["object","body"]};for(
n in t)t.hasOwnProperty(n)&&(t[n]={name:n,children:t[n]});f={variable:function(e){return{type:t.Identifier.name,name:e}},stringLiteral:function(e){return{type:t.Literal.name,value:String(e)}},numericLiteral:function(e){return{type:t.Literal.name,value:Number
(e)}},statement:function(e){return{type:t.ExpressionStatement.name,expression:e}},dot:function(e,n){return{type:t.MemberExpression.name,computed:!1,object:e,property:n}},subscript:function(e,n){return{type:t.MemberExpression.name,computed:!0,object:e,property
:n}},postIncrement:function(e){return{type:t.UpdateExpression.name,operator:"++",prefix:!1,argument:e}},sequence:function(e,n){return{type:t.SequenceExpression.name,expressions:[e,n]}}},v.prototype={startWalk:function(e){this.path=[],this.apply(e)},apply:function(
e,t,n){var r,i,s,o;t=t||m;if(this.debug){this.seq+=1,this.level+=1,s=this.seq,o="";for(i=0;i<this.level;i+=1)o+="    ";console.log(o+"Enter ("+s+"):"+e.type)}return n&&this.path.push(n),r=t.call(this.scope,e,this),n&&this.path.pop(),this.debug&&(this.level-=1
,console.log(o+"Return ("+s+"):"+e.type)),r||e},startLineForNode:function(e){return e&&e.loc&&e.loc.start?e.loc.start.line:null},ancestor:function(e){return this.path.length>e-1?this.path[this.path.length-e]:null},parent:function(){return this.ancestor(1)},
isLabeled:function(){var e=this.parent();return e&&e.node.type===t.LabeledStatement.name}},g.prototype={instrumentSync:function(e,n){var s;if(typeof e!="string")throw new Error("Code must be string");return e.charAt(0)==="#"&&(e="//"+e),this.opts.noAutoWrap||
(e=o+e+u),s=r.parse(e,{loc:!0,range:!0,tokens:this.opts.preserveComments,comment:!0}),this.opts.preserveComments&&(s=i.attachComments(s,s.comments,s.tokens)),this.opts.noAutoWrap||(s={type:t.Program.name,body:s.body[0].expression.callee.body.body,comments:s
.comments}),this.instrumentASTSync(s,n,e)},filterHints:function(e){var t=[],n,r,i;if(!e||!h(e))return t;for(n=0;n<e.length;n+=1)r=e[n],r&&r.value&&r.range&&h(r.range)&&(i=String(r.value).match(a),i&&t.push({type:i[1],start:r.range[0],end:r.range[1]}));return t
},extractCurrentHint:function(e){if(!e.range)return;var t=this.currentState.lastHintPosition+1,n=this.currentState.hints,r=e.range[0],i;this.currentState.currentHint=null;while(t<n.length){i=n[t];if(!(i.end<r))break;this.currentState.currentHint=i,this.currentState
.lastHintPosition=t,t+=1}},instrumentASTSync:function(e,t,n){var r=!1,s,o,u,a,f;t=t||String((new Date).getTime())+".js",this.sourceMap=null,this.coverState={path:t,s:{},b:{},f:{},fnMap:{},statementMap:{},branchMap:{}},this.currentState={trackerVar:p(t,this.
omitTrackerSuffix),func:0,branch:0,variable:0,statement:0,hints:this.filterHints(e.comments),currentHint:null,lastHintPosition:-1,ignoring:0},e.body&&e.body.length>0&&this.isUseStrictExpression(e.body[0])&&(e.body.shift(),r=!0),this.walker.startWalk(e),s=this
.opts.codeGenerationOptions||{format:{compact:!this.opts.noCompact}},s.comment=this.opts.preserveComments,o=i.generate(e,s),u=this.getPreamble(n||"",r);if(o.map&&o.code){a=u.split(/\r\n|\r|\n/).length;for(f=0;f<o.map._mappings.length;f+=1)o.map._mappings[f]
.generatedLine+=a;this.sourceMap=o.map,o=o.code}return u+"\n"+o+"\n"},instrument:function(e,t,n){!n&&typeof t=="function"&&(n=t,t=null);try{n(null,this.instrumentSync(e,t))}catch(r){n(r)}},lastFileCoverage:function(){return this.coverState},lastSourceMap:function(
){return this.sourceMap},fixColumnPositions:function(e){var t=o.length,n=function(e){e.start.line===1&&(e.start.column-=t),e.end.line===1&&(e.end.column-=t)},r,i,s,u;i=e.statementMap;for(r in i)i.hasOwnProperty(r)&&n(i[r]);i=e.fnMap;for(r in i)i.hasOwnProperty
(r)&&n(i[r].loc);i=e.branchMap;for(r in i)if(i.hasOwnProperty(r)){u=i[r].locations;for(s=0;s<u.length;s+=1)n(u[s])}},getPreamble:function(e,t){var n=this.opts.coverageVariable||"__coverage__",r=this.coverState.path.replace(/\\/g,"\\\\"),i=this.currentState.
trackerVar,s,o=t?'"use strict";':"",u=function(e){return function(){return e}},a;return this.opts.noAutoWrap||this.fixColumnPositions(this.coverState),this.opts.embedSource&&(this.coverState.code=e.split(/(?:\r?\n)|\r/)),s=this.opts.debug?JSON.stringify(this
.coverState,undefined,4):JSON.stringify(this.coverState),a=["%STRICT%","var %VAR% = (Function('return this'))();","if (!%VAR%.%GLOBAL%) { %VAR%.%GLOBAL% = {}; }","%VAR% = %VAR%.%GLOBAL%;","if (!(%VAR%['%FILE%'])) {","   %VAR%['%FILE%'] = %OBJECT%;","}","%VAR% = %VAR%['%FILE%'];"
].join("\n").replace(/%STRICT%/g,u(o)).replace(/%VAR%/g,u(i)).replace(/%GLOBAL%/g,u(n)).replace(/%FILE%/g,u(r)).replace(/%OBJECT%/g,u(s)),a},startIgnore:function(){this.currentState.ignoring+=1},endIgnore:function(){this.currentState.ignoring-=1},convertToBlock
:function(e){return e?e.type==="BlockStatement"?e:{type:"BlockStatement",body:[e]}:{type:"BlockStatement",body:[]}},ifBlockConverter:function(e){e.consequent=this.convertToBlock(e.consequent),e.alternate=this.convertToBlock(e.alternate)},loopBlockConverter:
function(e){e.body=this.convertToBlock(e.body)},withBlockConverter:function(e){e.body=this.convertToBlock(e.body)},statementName:function(e,t){var n,r=!!this.currentState.ignoring;return e.skip=r||undefined,t=t||0,this.currentState.statement+=1,n=this.currentState
.statement,this.coverState.statementMap[n]=e,this.coverState.s[n]=t,n},skipInit:function(e){e.init&&(e.init.skipWalk=!0)},skipLeft:function(e){e.left.skipWalk=!0},isUseStrictExpression:function(e){return e&&e.type===t.ExpressionStatement.name&&e.expression&&
e.expression.type===t.Literal.name&&e.expression.value==="use strict"},maybeSkipNode:function(e,t){var n=!!this.currentState.ignoring,r=this.currentState.currentHint,i=!n&&r&&r.type===t;return i?(this.startIgnore(),e.postprocessor=this.endIgnore,!0):!1},coverStatement
:function(e,n){var r,i,s;this.maybeSkipNode(e,"next");if(this.isUseStrictExpression(e)){s=n.ancestor(2);if(s&&(s.node.type===t.FunctionExpression.name||s.node.type===t.FunctionDeclaration.name)&&n.parent().node.body[0]===e)return}e.type===t.FunctionDeclaration
.name?r=this.statementName(e.loc,1):(r=this.statementName(e.loc),i=f.statement(f.postIncrement(f.subscript(f.dot(f.variable(this.currentState.trackerVar),f.variable("s")),f.stringLiteral(r)))),this.splice(i,e,n))},splice:function(e,t,n){var r=n.isLabeled()?
n.parent().node:t;r.prepend=r.prepend||[],d(r.prepend,e)},functionName:function(e,t,n){this.currentState.func+=1;var r=this.currentState.func,i=!!this.currentState.ignoring,s=e.id?e.id.name:"(anonymous_"+r+")";return this.coverState.fnMap[r]={name:s,line:t,
loc:n,skip:i||undefined},this.coverState.f[r]=0,r},coverFunction:function(e,t){var n,r=e.body,i=r.body,s;this.maybeSkipNode(e,"next"),n=this.functionName(e,t.startLineForNode(e),{start:e.loc.start,end:{line:e.body.loc.start.line,column:e.body.loc.start.column
}}),i.length>0&&this.isUseStrictExpression(i[0])&&(s=i.shift()),i.unshift(f.statement(f.postIncrement(f.subscript(f.dot(f.variable(this.currentState.trackerVar),f.variable("f")),f.stringLiteral(n))))),s&&i.unshift(s)},branchName:function(e,t,n){var r,i=[],s=
[],o,u=!!this.currentState.ignoring;this.currentState.branch+=1,r=this.currentState.branch;for(o=0;o<n.length;o+=1)n[o].skip=n[o].skip||u||undefined,s.push(n[o]),i.push(0);return this.coverState.b[r]=i,this.coverState.branchMap[r]={line:t,type:e,locations:s
},r},branchIncrementExprAst:function(e,t,n){var r=f.postIncrement(f.subscript(f.subscript(f.dot(f.variable(this.currentState.trackerVar),f.variable("b")),f.stringLiteral(e)),f.numericLiteral(t)),n);return r},locationsForNodes:function(e){var t=[],n;for(n=0;
n<e.length;n+=1)t.push(e[n].loc);return t},ifBranchInjector:function(e,t){var n=!!this.currentState.ignoring,r=this.currentState.currentHint,i=!n&&r&&r.type==="if",s=!n&&r&&r.type==="else",o=e.loc.start.line,u=e.loc.start.column,a={line:o,column:u},l={line:
o,column:u},c=this.branchName("if",t.startLineForNode(e),[{start:a,end:l,skip:i||undefined},{start:a,end:l,skip:s||undefined}]),h=e.consequent.body,p=e.alternate.body,d;h.unshift(f.statement(this.branchIncrementExprAst(c,0))),p.unshift(f.statement(this.branchIncrementExprAst
(c,1))),i&&(d=e.consequent,d.preprocessor=this.startIgnore,d.postprocessor=this.endIgnore),s&&(d=e.alternate,d.preprocessor=this.startIgnore,d.postprocessor=this.endIgnore)},branchLocationFor:function(e,t){return this.coverState.branchMap[e].locations[t]},switchBranchInjector
:function(e,t){var n=e.cases,r,i;if(!(n&&n.length>0))return;r=this.branchName("switch",t.startLineForNode(e),this.locationsForNodes(n));for(i=0;i<n.length;i+=1)n[i].branchLocation=this.branchLocationFor(r,i),n[i].consequent.unshift(f.statement(this.branchIncrementExprAst
(r,i)))},switchCaseInjector:function(e){var t=e.branchLocation;delete e.branchLocation,this.maybeSkipNode(e,"next")&&(t.skip=!0)},conditionalBranchInjector:function(e,t){var n=this.branchName("cond-expr",t.startLineForNode(e),this.locationsForNodes([e.consequent
,e.alternate])),r=this.branchIncrementExprAst(n,0),i=this.branchIncrementExprAst(n,1);e.consequent.preprocessor=this.maybeAddSkip(this.branchLocationFor(n,0)),e.alternate.preprocessor=this.maybeAddSkip(this.branchLocationFor(n,1)),e.consequent=f.sequence(r,
e.consequent),e.alternate=f.sequence(i,e.alternate)},maybeAddSkip:function(e){return function(t){var n=!!this.currentState.ignoring,r=this.currentState.currentHint,i=!n&&r&&r.type==="next";i&&(this.startIgnore(),t.postprocessor=this.endIgnore);if(i||n)e.skip=!0
}},logicalExpressionBranchInjector:function(e,n){var r=n.parent(),i=[],s,o,u;this.maybeSkipNode(e,"next");if(r&&r.node.type===t.LogicalExpression.name)return;this.findLeaves(e,i),s=this.branchName("binary-expr",n.startLineForNode(e),this.locationsForNodes(i
.map(function(e){return e.node})));for(u=0;u<i.length;u+=1)o=i[u],o.parent[o.property]=f.sequence(this.branchIncrementExprAst(s,u),o.node),o.node.preprocessor=this.maybeAddSkip(this.branchLocationFor(s,u))},findLeaves:function(e,n,r,i){e.type===t.LogicalExpression
.name?(this.findLeaves(e.left,n,e,"left"),this.findLeaves(e.right,n,e,"right")):n.push({node:e,parent:r,property:i})},maybeAddType:function(e){var n=e.properties,r,i;for(r=0;r<n.length;r+=1)i=n[r],i.type||(i.type=t.Property.name)}},e?module.exports=g:window
.Instrumenter=g})(typeof module!="undefined"&&typeof module.exports!="undefined"&&typeof exports!="undefined")
/* jslint-ignore-end */
    }());



    /* istanbul ignore next */
    // init lib istanbul.object-utils
    (function () {
        var module, window;
        // jslint-hack
        local.nop(module);
        module = undefined;
        window = local;
/* jslint-ignore-begin */
// https://github.com/gotwarlost/istanbul/blob/v0.2.16/lib/object-utils.js
// utility2-uglifyjs https://raw.githubusercontent.com/gotwarlost/istanbul/v0.2.16/lib/object-utils.js
(function(e){function t(e){var t=e.statementMap,n=e.s,r;e.l||(e.l=r={},Object.keys(n).forEach(function(e){var i=t[e].start.line,s=n[e],o=r[i];s===0&&t[e].skip&&(s=1);if(typeof o=="undefined"||o<s)r[i]=s}))}function n(e){Object.keys(e).forEach(function(n){t(
e[n])})}function r(e){Object.keys(e).forEach(function(t){delete e[t].l})}function i(e,t){var n;return t>0?(n=1e5*e/t+5,Math.floor(n/10)/100):100}function s(e,t,n){var r=e[t],s=n?e[n]:null,o={total:0,covered:0,skipped:0};return Object.keys(r).forEach(function(
e){var t=!!r[e],n=s&&s[e].skip;o.total+=1;if(t||n)o.covered+=1;!t&&n&&(o.skipped+=1)}),o.pct=i(o.covered,o.total),o}function o(e){var t=e.b,n=e.branchMap,r={total:0,covered:0,skipped:0};return Object.keys(t).forEach(function(e){var i=t[e],s=n[e],o,u,a;for(a=0
;a<i.length;a+=1){o=i[a]>0,u=s.locations&&s.locations[a]&&s.locations[a].skip;if(o||u)r.covered+=1;!o&&u&&(r.skipped+=1)}r.total+=i.length}),r.pct=i(r.covered,r.total),r}function u(){return{lines:{total:0,covered:0,skipped:0,pct:"Unknown"},statements:{total
:0,covered:0,skipped:0,pct:"Unknown"},functions:{total:0,covered:0,skipped:0,pct:"Unknown"},branches:{total:0,covered:0,skipped:0,pct:"Unknown"}}}function a(e){var n=u();return t(e),n.lines=s(e,"l"),n.functions=s(e,"f","fnMap"),n.statements=s(e,"s","statementMap"
),n.branches=o(e),n}function f(e,t){var n=JSON.parse(JSON.stringify(e)),r;return delete n.l,Object.keys(t.s).forEach(function(e){n.s[e]+=t.s[e]}),Object.keys(t.f).forEach(function(e){n.f[e]+=t.f[e]}),Object.keys(t.b).forEach(function(e){var i=n.b[e],s=t.b[e
];for(r=0;r<i.length;r+=1)i[r]+=s[r]}),n}function l(){var e=u(),t=Array.prototype.slice.call(arguments),n=["lines","statements","branches","functions"],r=function(t){t&&n.forEach(function(n){e[n].total+=t[n].total,e[n].covered+=t[n].covered,e[n].skipped+=t[
n].skipped})};return t.forEach(function(e){r(e)}),n.forEach(function(t){e[t].pct=i(e[t].covered,e[t].total)}),e}function c(e){var t=[];return Object.keys(e).forEach(function(n){t.push(a(e[n]))}),l.apply(null,t)}function h(e){var t={};return n(e),Object.keys
(e).forEach(function(n){var r=e[n],i=r.l,s=r.f,o=r.fnMap,u;u=t[n]={lines:{},calledLines:0,coveredLines:0,functions:{},calledFunctions:0,coveredFunctions:0},Object.keys(i).forEach(function(e){u.lines[e]=i[e],u.coveredLines+=1,i[e]>0&&(u.calledLines+=1)}),Object
.keys(s).forEach(function(e){var t=o[e].name+":"+o[e].line;u.functions[t]=s[e],u.coveredFunctions+=1,s[e]>0&&(u.calledFunctions+=1)})}),t}var p={addDerivedInfo:n,addDerivedInfoForFile:t,removeDerivedInfo:r,blankSummary:u,summarizeFileCoverage:a,summarizeCoverage
:c,mergeFileCoverage:f,mergeSummaryObjects:l,toYUICoverage:h};e?module.exports=p:window.coverageUtils=p})(typeof module!="undefined"&&typeof module.exports!="undefined"&&typeof exports!="undefined")
/* jslint-ignore-end */
        local['../object-utils'] = window.coverageUtils;
    }());



    /* istanbul ignore next */
    // init lib istanbul.report.common.defaults
    (function () {
        var module;
        module = {};
/* jslint-ignore-begin */
// https://github.com/gotwarlost/istanbul/blob/v0.2.16/lib/report/common/defaults.js
// utility2-uglifyjs https://raw.githubusercontent.com/gotwarlost/istanbul/v0.2.16/lib/report/common/defaults.js
module.exports={watermarks:function(){return{statements:[50,80],lines:[50,80],functions:[50,80],branches:[50,80]}},classFor:function(e,t,n){var r=n[e],i=t[e].pct;return i>=r[1]?"high":i>=r[0]?"medium":"low"},colorize:function(e,t){if(process.stdout.isTTY)switch(
t){case"low":e=""+e+"";break;case"medium":e=""+e+"";break;case"high":e=""+e+""}return e}}
/* jslint-ignore-end */
        local['./common/defaults'] = module.exports;
    }());



    // init lib istanbul.report.index
    (function () {
        // https://github.com/gotwarlost/istanbul/blob/v0.2.16/lib/report/index.js
        local['./index'] = {
            call: local.nop,
            mix: function (klass, prototype) {
                klass.prototype = prototype;
            }
        };
    }());



// init lib istanbul.report.templates.foot
/* jslint-ignore-begin */
// https://github.com/gotwarlost/istanbul/blob/v0.2.16/lib/report/templates/foot.txt
local['foot.txt'] = '\
</div>\n\
<div class="footer">\n\
    <div class="meta">Generated by <a href="http://istanbul-js.org/" target="_blank">istanbul</a> at {{datetime}}</div>\n\
</div>\n\
</body>\n\
</html>\n\
';



// init lib istanbul.report.templates.head
// https://github.com/gotwarlost/istanbul/blob/v0.2.16/lib/report/templates/head.txt
local['head.txt'] = '\
<!doctype html>\n\
<html lang="en">\n\
<head>\n\
    <title>Code coverage report for {{entity}}</title>\n\
    <meta charset="utf-8">\n\
    <style>\n\
        body, html {\n\
            margin:0; padding: 0;\n\
        }\n\
        body {\n\
            font-family: Helvetica Neue, Helvetica,Arial;\n\
            font-size: 10pt;\n\
        }\n\
        div.header, div.footer {\n\
            background: #eee;\n\
            padding: 1em;\n\
        }\n\
        div.header {\n\
            z-index: 100;\n\
            position: static;\n\
            top: 0;\n\
            border-bottom: 1px solid #666;\n\
            width: 100%;\n\
        }\n\
        div.footer {\n\
            border-top: 1px solid #666;\n\
        }\n\
        div.body {\n\
            margin-top: 0;\n\
        }\n\
        div.meta {\n\
            font-size: 90%;\n\
            text-align: center;\n\
        }\n\
        h1, h2, h3 {\n\
            font-weight: normal;\n\
        }\n\
        h1 {\n\
            font-size: 12pt;\n\
        }\n\
        h2 {\n\
            font-size: 10pt;\n\
        }\n\
        pre {\n\
            font-family: Consolas, Menlo, Monaco, monospace;\n\
            margin: 0;\n\
            padding: 0;\n\
            line-height: 14px;\n\
            font-size: 14px;\n\
            -moz-tab-size: 2;\n\
            -o-tab-size:  2;\n\
            tab-size: 2;\n\
        }\n\
\n\
        div.path { font-size: 110%; }\n\
        div.path a:link, div.path a:visited { color: #000; }\n\
        table.coverage { border-collapse: collapse; margin:0; padding: 0 }\n\
\n\
        table.coverage td {\n\
            margin: 0;\n\
            padding: 0;\n\
            color: #111;\n\
            vertical-align: top;\n\
        }\n\
        table.coverage td.line-count {\n\
            width: 50px;\n\
            text-align: right;\n\
            padding-right: 5px;\n\
        }\n\
        table.coverage td.line-coverage {\n\
            color: #777 !important;\n\
            text-align: right;\n\
            border-left: 1px solid #666;\n\
            border-right: 1px solid #666;\n\
        }\n\
\n\
        table.coverage td.text {\n\
        }\n\
\n\
        table.coverage td span.cline-any {\n\
            display: inline-block;\n\
            padding: 0 5px;\n\
            width: 40px;\n\
        }\n\
        table.coverage td span.cline-neutral {\n\
            background: #eee;\n\
        }\n\
        table.coverage td span.cline-yes {\n\
            background: #b5d592;\n\
            color: #999;\n\
        }\n\
        table.coverage td span.cline-no {\n\
            background: #fc8c84;\n\
        }\n\
\n\
        .cstat-yes { color: #111; }\n\
        .cstat-no { background: #fc8c84; color: #111; }\n\
        .fstat-no { background: #ffc520; color: #111 !important; }\n\
        .cbranch-no { background:  yellow !important; color: #111; }\n\
\n\
        .cstat-skip { background: #ddd; color: #111; }\n\
        .fstat-skip { background: #ddd; color: #111 !important; }\n\
        .cbranch-skip { background: #ddd !important; color: #111; }\n\
\n\
        .missing-if-branch {\n\
            display: inline-block;\n\
            margin-right: 10px;\n\
            position: relative;\n\
            padding: 0 4px;\n\
            background: black;\n\
            color: yellow;\n\
        }\n\
\n\
        .skip-if-branch {\n\
            display: none;\n\
            margin-right: 10px;\n\
            position: relative;\n\
            padding: 0 4px;\n\
            background: #ccc;\n\
            color: white;\n\
        }\n\
\n\
        .missing-if-branch .typ, .skip-if-branch .typ {\n\
            color: inherit !important;\n\
        }\n\
\n\
        .entity, .metric { font-weight: bold; }\n\
        .metric { display: inline-block; border: 1px solid #333; padding: 0.3em; background: white; }\n\
        .metric small { font-size: 80%; font-weight: normal; color: #666; }\n\
\n\
        div.coverage-summary table { border-collapse: collapse; margin: 3em; font-size: 110%; }\n\
        div.coverage-summary td, div.coverage-summary table  th { margin: 0; padding: 0.25em 1em; border-top: 1px solid #666; border-bottom: 1px solid #666; }\n\
        div.coverage-summary th { text-align: left; border: 1px solid #666; background: #eee; font-weight: normal; }\n\
        div.coverage-summary th.file { border-right: none !important; }\n\
        div.coverage-summary th.pic { border-left: none !important; text-align: right; }\n\
        div.coverage-summary th.pct { border-right: none !important; }\n\
        div.coverage-summary th.abs { border-left: none !important; text-align: right; }\n\
        div.coverage-summary td.pct { text-align: right; border-left: 1px solid #666; }\n\
        div.coverage-summary td.abs { text-align: right; font-size: 90%; color: #444; border-right: 1px solid #666; }\n\
        div.coverage-summary td.file { text-align: right; border-left: 1px solid #666; white-space: nowrap;  }\n\
        div.coverage-summary td.pic { min-width: 120px !important;  }\n\
        div.coverage-summary a:link { text-decoration: none; color: #000; }\n\
        div.coverage-summary a:visited { text-decoration: none; color: #333; }\n\
        div.coverage-summary a:hover { text-decoration: underline; }\n\
        div.coverage-summary tfoot td { border-top: 1px solid #666; }\n\
\n\
        div.coverage-summary .yui3-datatable-sort-indicator, div.coverage-summary .dummy-sort-indicator {\n\
            height: 10px;\n\
            width: 7px;\n\
            display: inline-block;\n\
            margin-left: 0.5em;\n\
        }\n\
        div.coverage-summary .yui3-datatable-sort-indicator {\n\
            background: url("https://yui-s.yahooapis.com/3.6.0/build/datatable-sort/assets/skins/sam/sort-arrow-sprite.png") no-repeat scroll 0 0 transparent;\n\
        }\n\
        div.coverage-summary .yui3-datatable-sorted .yui3-datatable-sort-indicator {\n\
            background-position: 0 -20px;\n\
        }\n\
        div.coverage-summary .yui3-datatable-sorted-desc .yui3-datatable-sort-indicator {\n\
            background-position: 0 -10px;\n\
        }\n\
\n\
        .high { background: #b5d592 !important; }\n\
        .medium { background: #ffe87c !important; }\n\
        .low { background: #fc8c84 !important; }\n\
\n\
        span.cover-fill, span.cover-empty {\n\
            display:inline-block;\n\
            border:1px solid #444;\n\
            background: white;\n\
            height: 12px;\n\
        }\n\
        span.cover-fill {\n\
            background: #ccc;\n\
            border-right: 1px solid #444;\n\
        }\n\
        span.cover-empty {\n\
            background: white;\n\
            border-left: none;\n\
        }\n\
        span.cover-full {\n\
            border-right: none !important;\n\
        }\n\
        pre.prettyprint {\n\
            border: none !important;\n\
            padding: 0 !important;\n\
            margin: 0 !important;\n\
        }\n\
        .com { color: #999 !important; }\n\
        .ignore-none { color: #999; font-weight: normal; }\n\
\n\
    </style>\n\
</head>\n\
<body>\n\
<div class="header {{reportClass}}">\n\
    <h1>Code coverage report for <span class="entity">{{entity}}</span></h1>\n\
    <h2>\n\
        {{#with metrics.statements}}\n\
        Statements: <span class="metric">{{pct}}% <small>({{covered}} / {{total}})</small></span> &nbsp;&nbsp;&nbsp;&nbsp;\n\
        {{/with}}\n\
        {{#with metrics.branches}}\n\
        Branches: <span class="metric">{{pct}}% <small>({{covered}} / {{total}})</small></span> &nbsp;&nbsp;&nbsp;&nbsp;\n\
        {{/with}}\n\
        {{#with metrics.functions}}\n\
        Functions: <span class="metric">{{pct}}% <small>({{covered}} / {{total}})</small></span> &nbsp;&nbsp;&nbsp;&nbsp;\n\
        {{/with}}\n\
        {{#with metrics.lines}}\n\
        Lines: <span class="metric">{{pct}}% <small>({{covered}} / {{total}})</small></span> &nbsp;&nbsp;&nbsp;&nbsp;\n\
        {{/with}}\n\
        Ignored: <span class="metric">{{#show_ignores metrics}}{{/show_ignores}}</span> &nbsp;&nbsp;&nbsp;&nbsp;\n\
    </h2>\n\
    {{{pathHtml}}}\n\
</div>\n\
<div class="body">\n\
';
/* jslint-ignore-end */



    /* istanbul ignore next */
    // init lib istanbul.util.file-writer
    (function () {
        // https://github.com/gotwarlost/istanbul/blob/v0.2.16/lib/util/file-writer.js
        local.writerCreate = function (options) {
            options.coverageReportHtml = '';
            options.writerData = '';
            return {
                write: function (data) {
                    options.writerData += data;
                },
                writeFile: function (file, onError) {
                    options.coverageReportHtml += options.writerData + '\n\n';
                    local.fsWriteFileWithMkdirpSync(options.writerFile, options.writerData);
                    options.writerData = '';
                    options.writerFile = file;
                    onError(options.writer);
                }
            };
        };
    }());



    /* istanbul ignore next */
    // init lib istanbul.util.tree-summarizer
    (function () {
        var module;
        module = {};
/* jslint-ignore-begin */
// https://github.com/gotwarlost/istanbul/blob/v0.2.16/lib/util/tree-summarizer.js
// utility2-uglifyjs https://raw.githubusercontent.com/gotwarlost/istanbul/v0.2.16/lib/util/tree-summarizer.js
function commonArrayPrefix(e,t){var n=e.length<t.length?e.length:t.length,r,i=[];for(r=0;r<n;r+=1){if(e[r]!==t[r])break;i.push(e[r])}return i}function findCommonArrayPrefix(e){if(e.length===0)return[];var t=e.map(function(e){return e.split(SEP)}),n=t.pop();
return t.length===0?n.slice(0,n.length-1):t.reduce(commonArrayPrefix,n)}function Node(e,t,n){this.name=e,this.fullName=e,this.kind=t,this.metrics=n||null,this.parent=null,this.children=[]}function TreeSummary(e,t){this.prefix=t,this.convertToTree(e,t)}function TreeSummarizer
(){this.summaryMap={}}var path=require("path"),SEP=path.sep||"/",utils=require("../object-utils");Node.prototype={displayShortName:function(){return this.relativeName},fullPath:function(){return this.fullName},addChild:function(e){this.children.push(e),e.parent=
this},toJSON:function(){return{name:this.name,relativeName:this.relativeName,fullName:this.fullName,kind:this.kind,metrics:this.metrics,parent:this.parent===null?null:this.parent.name,children:this.children.map(function(e){return e.toJSON()})}}},TreeSummary
.prototype={getNode:function(e){return this.map[e]},convertToTree:function(e,t){var n=[],r=t.join(SEP)+SEP,i=new Node(r,"dir"),s,o,u={},a=!1;u[r]=i,Object.keys(e).forEach(function(t){var r=e[t],s,o,f;s=new Node(t,"file",r),u[t]=s,n.push(s),o=path.dirname(t)+
SEP,o===SEP+SEP&&(o=SEP+"__root__"+SEP),f=u[o],f||(f=new Node(o,"dir"),i.addChild(f),u[o]=f),f.addChild(s),f===i&&(a=!0)}),a&&t.length>0&&(t.pop(),s=i,o=s.children,s.children=[],i=new Node(t.join(SEP)+SEP,"dir"),i.addChild(s),o.forEach(function(e){e.kind==="dir"?
i.addChild(e):s.addChild(e)})),this.fixupNodes(i,t.join(SEP)+SEP),this.calculateMetrics(i),this.root=i,this.map={},this.indexAndSortTree(i,this.map)},fixupNodes:function(e,t,n){var r=this;e.name.indexOf(t)===0&&(e.name=e.name.substring(t.length)),e.name.charAt
(0)===SEP&&(e.name=e.name.substring(1)),n?n.name!=="__root__/"?e.relativeName=e.name.substring(n.name.length):e.relativeName=e.name:e.relativeName=e.name.substring(t.length),e.children.forEach(function(n){r.fixupNodes(n,t,e)})},calculateMetrics:function(e){
var t=this,n;if(e.kind!=="dir")return;e.children.forEach(function(e){t.calculateMetrics(e)}),e.metrics=utils.mergeSummaryObjects.apply(null,e.children.map(function(e){return e.metrics})),n=e.children.filter(function(e){return e.kind!=="dir"}),n.length>0?e.packageMetrics=
utils.mergeSummaryObjects.apply(null,n.map(function(e){return e.metrics})):e.packageMetrics=null},indexAndSortTree:function(e,t){var n=this;t[e.name]=e,e.children.sort(function(e,t){return e=e.relativeName,t=t.relativeName,e<t?-1:e>t?1:0}),e.children.forEach
(function(e){n.indexAndSortTree(e,t)})},toJSON:function(){return{prefix:this.prefix,root:this.root.toJSON()}}},TreeSummarizer.prototype={addFileCoverageSummary:function(e,t){this.summaryMap[e]=t},getTreeSummary:function(){var e=findCommonArrayPrefix(Object.
keys(this.summaryMap));return new TreeSummary(this.summaryMap,e)}},module.exports=TreeSummarizer
/* jslint-ignore-end */
        local['../util/tree-summarizer'] = module.exports;
        module.exports.prototype._getTreeSummary = module.exports.prototype.getTreeSummary;
        module.exports.prototype.getTreeSummary = function () {
            local.coverageReportSummary = this._getTreeSummary();
            return local.coverageReportSummary;
        };
    }());



    /* istanbul ignore next */
    // init lib istanbul.report.html
    (function () {
        var module;
        module = {};
/* jslint-ignore-begin */
// https://github.com/gotwarlost/istanbul/blob/v0.2.16/lib/report/html.js
// utility2-uglifyjs https://raw.githubusercontent.com/gotwarlost/istanbul/v0.2.16/lib/report/html.js
function customEscape(e){return e=e.toString(),e.replace(RE_AMP,"&amp;").replace(RE_LT,"&lt;").replace(RE_GT,"&gt;").replace(RE_lt,"<").replace(RE_gt,">")}function title(e){return' title="'+e+'" '}function annotateLines(e,t){var n=e.l;if(!n)return;Object.keys
(n).forEach(function(e){var r=n[e];t[e].covered=r>0?"yes":"no"}),t.forEach(function(e){e.covered===null&&(e.covered="neutral")})}function annotateStatements(e,t){var n=e.s,r=e.statementMap;Object.keys(n).forEach(function(e){var i=n[e],s=r[e],o=i>0?"yes":"no"
,u=s.start.column,a=s.end.column+1,f=s.start.line,l=s.end.line,c=lt+'span class="'+(s.skip?"cstat-skip":"cstat-no")+'"'+title("statement not covered")+gt,h=lt+"/span"+gt,p;o==="no"&&(l!==f&&(l=f,a=t[f].text.originalLength()),p=t[f].text,p.wrap(u,c,f===l?a:p
.originalLength(),h))})}function annotateFunctions(e,t){var n=e.f,r=e.fnMap;if(!n)return;Object.keys(n).forEach(function(e){var i=n[e],s=r[e],o=i>0?"yes":"no",u=s.loc.start.column,a=s.loc.end.column+1,f=s.loc.start.line,l=s.loc.end.line,c=lt+'span class="'+
(s.skip?"fstat-skip":"fstat-no")+'"'+title("function not covered")+gt,h=lt+"/span"+gt,p;o==="no"&&(l!==f&&(l=f,a=t[f].text.originalLength()),p=t[f].text,p.wrap(u,c,f===l?a:p.originalLength(),h))})}function annotateBranches(e,t){var n=e.b,r=e.branchMap;if(!n
)return;Object.keys(n).forEach(function(e){var i=n[e],s=i.reduce(function(e,t){return e+t},0),o=r[e].locations,u,a,f,l,c,h,p,d,v,m,g;if(s>0)for(u=0;u<i.length;u+=1)a=i[u],f=o[u],l=a>0?"yes":"no",c=f.start.column,h=f.end.column+1,p=f.start.line,d=f.end.line,
v=lt+'span class="branch-'+u+" "+(f.skip?"cbranch-skip":"cbranch-no")+'"'+title("branch not covered")+gt,m=lt+"/span"+gt,a===0&&(d!==p&&(d=p,h=t[p].text.originalLength()),g=t[p].text,r[e].type==="if"?g.insertAt(c,lt+'span class="'+(f.skip?"skip-if-branch":"missing-if-branch"
)+'"'+title((u===0?"if":"else")+" path not taken")+gt+(u===0?"I":"E")+lt+"/span"+gt,!0,!1):g.wrap(c,v,p===d?h:g.originalLength(),m))})}function getReportClass(e,t){var n=e.pct,r=1;return n*r===n?n>=t[1]?"high":n>=t[0]?"medium":"low":""}function HtmlReport(e
){Report.call(this),this.opts=e||{},this.opts.dir=this.opts.dir||path.resolve(process.cwd(),"html-report"),this.opts.sourceStore=this.opts.sourceStore||Store.create("fslookup"),this.opts.linkMapper=this.opts.linkMapper||this.standardLinkMapper(),this.opts.writer=
this.opts.writer||null,this.opts.templateData={datetime:Date()},this.opts.watermarks=this.opts.watermarks||defaults.watermarks()}var handlebars=require("handlebars"),defaults=require("./common/defaults"),path=require("path"),SEP=path.sep||"/",fs=require("fs"
),util=require("util"),FileWriter=require("../util/file-writer"),Report=require("./index"),Store=require("../store"),InsertionText=require("../util/insertion-text"),TreeSummarizer=require("../util/tree-summarizer"),utils=require("../object-utils"),templateFor=
function(e){return handlebars.compile(fs.readFileSync(path.resolve(__dirname,"templates",e+".txt"),"utf8"))},headerTemplate=templateFor("head"),footerTemplate=templateFor("foot"),pathTemplate=handlebars.compile('<div class="path">{{{html}}}</div>'),detailTemplate=
handlebars.compile(["<tr>",'<td class="line-count">{{#show_lines}}{{maxLines}}{{/show_lines}}</td>','<td class="line-coverage">{{#show_line_execution_counts fileCoverage}}{{maxLines}}{{/show_line_execution_counts}}</td>','<td class="text"><pre class="prettyprint lang-js">{{#show_code structured}}{{/show_code}}</pre></td>'
,"</tr>\n"].join("")),summaryTableHeader=['<div class="coverage-summary">',"<table>","<thead>","<tr>",'   <th data-col="file" data-fmt="html" data-html="true" class="file">File</th>','   <th data-col="pic" data-type="number" data-fmt="html" data-html="true" class="pic"></th>'
,'   <th data-col="statements" data-type="number" data-fmt="pct" class="pct">Statements</th>','   <th data-col="statements_raw" data-type="number" data-fmt="html" class="abs"></th>','   <th data-col="branches" data-type="number" data-fmt="pct" class="pct">Branches</th>'
,'   <th data-col="branches_raw" data-type="number" data-fmt="html" class="abs"></th>','   <th data-col="functions" data-type="number" data-fmt="pct" class="pct">Functions</th>','   <th data-col="functions_raw" data-type="number" data-fmt="html" class="abs"></th>'
,'   <th data-col="lines" data-type="number" data-fmt="pct" class="pct">Lines</th>','   <th data-col="lines_raw" data-type="number" data-fmt="html" class="abs"></th>',"</tr>","</thead>","<tbody>"].join("\n"),summaryLineTemplate=handlebars.compile(["<tr>",'<td class="file {{reportClasses.statements}}" data-value="{{file}}"><a href="{{output}}">{{file}}</a></td>'
,'<td data-value="{{metrics.statements.pct}}" class="pic {{reportClasses.statements}}">{{#show_picture}}{{metrics.statements.pct}}{{/show_picture}}</td>','<td data-value="{{metrics.statements.pct}}" class="pct {{reportClasses.statements}}">{{metrics.statements.pct}}%</td>'
,'<td data-value="{{metrics.statements.total}}" class="abs {{reportClasses.statements}}">({{metrics.statements.covered}}&nbsp;/&nbsp;{{metrics.statements.total}})</td>','<td data-value="{{metrics.branches.pct}}" class="pct {{reportClasses.branches}}">{{metrics.branches.pct}}%</td>'
,'<td data-value="{{metrics.branches.total}}" class="abs {{reportClasses.branches}}">({{metrics.branches.covered}}&nbsp;/&nbsp;{{metrics.branches.total}})</td>','<td data-value="{{metrics.functions.pct}}" class="pct {{reportClasses.functions}}">{{metrics.functions.pct}}%</td>'
,'<td data-value="{{metrics.functions.total}}" class="abs {{reportClasses.functions}}">({{metrics.functions.covered}}&nbsp;/&nbsp;{{metrics.functions.total}})</td>','<td data-value="{{metrics.lines.pct}}" class="pct {{reportClasses.lines}}">{{metrics.lines.pct}}%</td>'
,'<td data-value="{{metrics.lines.total}}" class="abs {{reportClasses.lines}}">({{metrics.lines.covered}}&nbsp;/&nbsp;{{metrics.lines.total}})</td>',"</tr>\n"].join("\n	")),summaryTableFooter=["</tbody>","</table>","</div>"].join("\n"),lt="",gt="",RE_LT=/</g
,RE_GT=/>/g,RE_AMP=/&/g,RE_lt=/\u0001/g,RE_gt=/\u0002/g;handlebars.registerHelper("show_picture",function(e){var t=Number(e.fn(this)),n,r="";return isFinite(t)?(t===100&&(r=" cover-full"),t=Math.floor(t),n=100-t,'<span class="cover-fill'+r+'" style="width: '+
t+'px;"></span>'+'<span class="cover-empty" style="width:'+n+'px;"></span>'):""}),handlebars.registerHelper("show_ignores",function(e){var t=e.statements.skipped,n=e.functions.skipped,r=e.branches.skipped,i;return t===0&&n===0&&r===0?'<span class="ignore-none">none</span>'
:(i=[],t>0&&i.push(t===1?"1 statement":t+" statements"),n>0&&i.push(n===1?"1 function":n+" functions"),r>0&&i.push(r===1?"1 branch":r+" branches"),i.join(", "))}),handlebars.registerHelper("show_lines",function(e){var t=Number(e.fn(this)),n,r=[];for(n=0;n<t
;n+=1)r[n]=n+1;return r.join("\n")}),handlebars.registerHelper("show_line_execution_counts",function(e,t){var n=e.l,r=Number(t.fn(this)),i,s,o=[],u,a="";for(i=0;i<r;i+=1)s=i+1,a="&nbsp;",u="neutral",n.hasOwnProperty(s)&&(n[s]>0?(u="yes",a=n[s]):u="no"),o.push
('<span class="cline-any cline-'+u+'">'+a+"</span>");return o.join("\n")}),handlebars.registerHelper("show_code",function(e){var t=[];return e.forEach(function(e){t.push(customEscape(e.text)||"&nbsp;")}),t.join("\n")}),HtmlReport.TYPE="html",util.inherits(HtmlReport
,Report),Report.mix(HtmlReport,{getPathHtml:function(e,t){var n=e.parent,r=[],i=[],s;while(n)r.push(n),n=n.parent;for(s=0;s<r.length;s+=1)i.push('<a href="'+t.ancestor(e,s+1)+'">'+(r[s].relativeName||"All files")+"</a>");return i.reverse(),i.length>0?i.join
(" &#187; ")+" &#187; "+e.displayShortName():""},fillTemplate:function(e,t){var n=this.opts,r=n.linkMapper;t.entity=e.name||"All files",t.metrics=e.metrics,t.reportClass=getReportClass(e.metrics.statements,n.watermarks.statements),t.pathHtml=pathTemplate({html
:this.getPathHtml(e,r)}),t.prettify={js:r.asset(e,"prettify.js"),css:r.asset(e,"prettify.css")}},writeDetailPage:function(e,t,n){var r=this.opts,i=r.sourceStore,s=r.templateData,o=n.code&&Array.isArray(n.code)?n.code.join("\n")+"\n":i.get(n.path),u=o.split(/(?:\r?\n)|\r/
),a=0,f=u.map(function(e){return a+=1,{line:a,covered:null,text:new InsertionText(e,!0)}}),l;f.unshift({line:0,covered:null,text:new InsertionText("")}),this.fillTemplate(t,s),e.write(headerTemplate(s)),e.write('<pre><table class="coverage">\n'),annotateLines
(n,f),annotateBranches(n,f),annotateFunctions(n,f),annotateStatements(n,f),f.shift(),l={structured:f,maxLines:f.length,fileCoverage:n},e.write(detailTemplate(l)),e.write("</table></pre>\n"),e.write(footerTemplate(s))},writeIndexPage:function(e,t){var n=this
.opts.linkMapper,r=this.opts.templateData,i=Array.prototype.slice.apply(t.children),s=this.opts.watermarks;i.sort(function(e,t){return e.name<t.name?-1:1}),this.fillTemplate(t,r),e.write(headerTemplate(r)),e.write(summaryTableHeader),i.forEach(function(t){var r=
t.metrics,i={statements:getReportClass(r.statements,s.statements),lines:getReportClass(r.lines,s.lines),functions:getReportClass(r.functions,s.functions),branches:getReportClass(r.branches,s.branches)},o={metrics:r,reportClasses:i,file:t.displayShortName(),
output:n.fromParent(t)};e.write(summaryLineTemplate(o)+"\n")}),e.write(summaryTableFooter),e.write(footerTemplate(r))},writeFiles:function(e,t,n,r){var i=this,s=path.resolve(n,"index.html"),o;this.opts.verbose&&console.error("Writing "+s),e.writeFile(s,function(
e){i.writeIndexPage(e,t)}),t.children.forEach(function(t){t.kind==="dir"?i.writeFiles(e,t,path.resolve(n,t.relativeName),r):(o=path.resolve(n,t.relativeName+".html"),i.opts.verbose&&console.error("Writing "+o),e.writeFile(o,function(e){i.writeDetailPage(e,t
,r.fileCoverageFor(t.fullPath()))}))})},standardLinkMapper:function(){return{fromParent:function(e){var t=0,n=e.relativeName,r;if(SEP!=="/"){n="";for(t=0;t<e.relativeName.length;t+=1)r=e.relativeName.charAt(t),r===SEP?n+="/":n+=r}return e.kind==="dir"?n+"index.html"
:n+".html"},ancestorHref:function(e,t){var n="",r,i,s,o;for(s=0;s<t;s+=1){r=e.relativeName.split(SEP),i=r.length-1;for(o=0;o<i;o+=1)n+="../";e=e.parent}return n},ancestor:function(e,t){return this.ancestorHref(e,t)+"index.html"},asset:function(e,t){var n=0,
r=e.parent;while(r)n+=1,r=r.parent;return this.ancestorHref(e,n)+t}}},writeReport:function(e,t){var n=this.opts,r=n.dir,i=new TreeSummarizer,s=n.writer||new FileWriter(t),o;e.files().forEach(function(t){i.addFileCoverageSummary(t,utils.summarizeFileCoverage
(e.fileCoverageFor(t)))}),o=i.getTreeSummary(),fs.readdirSync(path.resolve(__dirname,"..","vendor")).forEach(function(e){var t=path.resolve(__dirname,"..","vendor",e),i=path.resolve(r,e),o=fs.statSync(t);o.isFile()&&(n.verbose&&console.log("Write asset: "+i
),s.copyFile(t,i))}),this.writeFiles(s,o.root,r,e)}}),module.exports=HtmlReport
/* jslint-ignore-end */
        local.HtmlReport = module.exports;
    }());



    /* istanbul ignore next */
    // init lib istanbul.report.text
    (function () {
        var module;
        module = {};
/* jslint-ignore-begin */
// https://github.com/gotwarlost/istanbul/blob/v0.2.16/lib/report/text.js
// utility2-uglifyjs https://raw.githubusercontent.com/gotwarlost/istanbul/v0.2.16/lib/report/text.js
function TextReport(e){Report.call(this),e=e||{},this.dir=e.dir||process.cwd(),this.file=e.file,this.summary=e.summary,this.maxCols=e.maxCols||0,this.watermarks=e.watermarks||defaults.watermarks()}function padding(e,t){var n="",r;t=t||" ";for(r=0;r<e;r+=1)n+=
t;return n}function fill(e,t,n,r,i){r=r||0,e=String(e);var s=r*TAB_SIZE,o=t-s,u=padding(s),a="",f,l=e.length;return o>0&&(o>=l?(f=padding(o-l),a=n?f+e:e+f):(a=e.substring(l-o),a="... "+a.substring(4))),a=defaults.colorize(a,i),u+a}function formatName(e,t,n,
r){return fill(e,t,!1,n,r)}function formatPct(e,t){return fill(e,PCT_COLS,!0,0,t)}function nodeName(e){return e.displayShortName()||"All files"}function tableHeader(e){var t=[];return t.push(formatName("File",e,0)),t.push(formatPct("% Stmts")),t.push(formatPct
("% Branches")),t.push(formatPct("% Funcs")),t.push(formatPct("% Lines")),t.join(" |")+" |"}function tableRow(e,t,n,r){var i=nodeName(e),s=e.metrics.statements.pct,o=e.metrics.branches.pct,u=e.metrics.functions.pct,a=e.metrics.lines.pct,f=[];return f.push(formatName
(i,t,n,defaults.classFor("statements",e.metrics,r))),f.push(formatPct(s,defaults.classFor("statements",e.metrics,r))),f.push(formatPct(o,defaults.classFor("branches",e.metrics,r))),f.push(formatPct(u,defaults.classFor("functions",e.metrics,r))),f.push(formatPct
(a,defaults.classFor("lines",e.metrics,r))),f.join(DELIM)+DELIM}function findNameWidth(e,t,n){n=n||0,t=t||0;var r=TAB_SIZE*t+nodeName(e).length;return r>n&&(n=r),e.children.forEach(function(e){n=findNameWidth(e,t+1,n)}),n}function makeLine(e){var t=padding(
e,"-"),n=padding(PCT_COLS,"-"),r=[];return r.push(t),r.push(n),r.push(n),r.push(n),r.push(n),r.join(COL_DELIM)+COL_DELIM}function walk(e,t,n,r,i){var s;r===0?(s=makeLine(t),n.push(s),n.push(tableHeader(t)),n.push(s)):n.push(tableRow(e,t,r,i)),e.children.forEach
(function(e){walk(e,t,n,r+1,i)}),r===0&&(n.push(s),n.push(tableRow(e,t,r,i)),n.push(s))}var path=require("path"),mkdirp=require("mkdirp"),fs=require("fs"),defaults=require("./common/defaults"),Report=require("./index"),TreeSummarizer=require("../util/tree-summarizer"
),utils=require("../object-utils"),PCT_COLS=10,TAB_SIZE=3,DELIM=" |",COL_DELIM="-|";TextReport.TYPE="text",Report.mix(TextReport,{writeReport:function(e){var t=new TreeSummarizer,n,r,i,s=4*(PCT_COLS+2),o,u=[],a;e.files().forEach(function(n){t.addFileCoverageSummary
(n,utils.summarizeFileCoverage(e.fileCoverageFor(n)))}),n=t.getTreeSummary(),r=n.root,i=findNameWidth(r),this.maxCols>0&&(o=this.maxCols-s-2,i>o&&(i=o)),walk(r,i,u,0,this.watermarks),a=u.join("\n")+"\n",this.file?(mkdirp.sync(this.dir),fs.writeFileSync(path
.join(this.dir,this.file),a,"utf8")):console.log(a)}}),module.exports=TextReport
/* jslint-ignore-end */
        local.TextReport = module.exports;
    }());



/* jslint-ignore-begin */
// https://img.shields.io/badge/coverage-100.0%-00dd00.svg?style=flat
local['coverage.badge.svg'] = '<svg xmlns="http://www.w3.org/2000/svg" width="117" height="20"><linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><rect rx="0" width="117" height="20" fill="#555"/><rect rx="0" x="63" width="54" height="20" fill="#0d0"/><path fill="#0d0" d="M63 0h4v20h-4z"/><rect rx="0" width="117" height="20" fill="url(#a)"/><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="32.5" y="15" fill="#010101" fill-opacity=".3">coverage</text><text x="32.5" y="14">coverage</text><text x="89" y="15" fill="#010101" fill-opacity=".3">100.0%</text><text x="89" y="14">100.0%</text></g></svg>';
/* jslint-ignore-end */
    switch (local.modeJs) {



    // run node js-env code
    case 'node':
        /* istanbul ignore next */
        // run the cli
        local.cliRun = function () {
            /*
             * this function will run the cli
             */
            if (module !== local.require.main) {
                return;
            }
            switch (process.argv[2]) {
            // transparently adds coverage information to a node command
            case 'cover':
                local.module = require('module');
                // add coverage hook to require
                local._moduleExtensionsJs = local.module._extensions['.js'];
                local.module._extensions['.js'] = function (module, file) {
                    if (typeof file === 'string' &&
                            file.indexOf(process.cwd()) === 0 &&
                            file.indexOf(process.cwd() + '/node_modules/') !== 0 &&
                            !new RegExp(process.env.npm_config_mode_cover_regexp_exclude ||
                                '[^\\S\\s]').test(file) &&
                            new RegExp(process.env.npm_config_mode_cover_regexp_include)
                                .test(file)) {
                        module._compile(local.instrumentSync(local._fs
                            .readFileSync(file, 'utf8'), file), file);
                    } else {
                        local._moduleExtensionsJs(module, file);
                    }
                };
                // init process.argv
                process.argv.splice(1, 2);
                process.argv[1] = local.path.resolve(process.cwd(), process.argv[1]);
                console.log('\ncovering $ ' + process.argv.join(' '));
                // create coverage on exit
                process.on('exit', function () {
                    local.coverageReportCreate({ coverage: local.global.__coverage__ });
                });
                local.module.runMain();
                break;
            // instrument a file and print result to stdout
            case 'instrument':
                process.argv[3] = local.path.resolve(process.cwd(), process.argv[3]);
                process.stdout.write(local.instrumentSync(local._fs
                    .readFileSync(process.argv[3], 'utf8'), process.argv[3]));
                break;
            }
        };
        local.cliRun();
        break;
    }
}((function () {
    'use strict';
    var local;



    // run shared js-env code
    (function () {
        // init local
        local = {};
        local.modeJs = (function () {
            try {
                return typeof navigator.userAgent === 'string' &&
                    typeof document.querySelector('body') === 'object' &&
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
        // init local properties
        local['./package.json'] = {};
        local.codeDict = local.codeDict || {};
        local.coverageReportCreate = function (options) {
            /*
             * this function will
             * 1. print coverage in text-format to stdout
             * 2. write coverage in html-format to filesystem
             * 3. return coverage in html-format as single document
             */
            if (!options.coverage) {
                return '';
            }
            options.collector = local.collectorCreate(options);
            options.dir = local.process.cwd() + '/tmp/build/coverage.html';
            options.sourceStore = {};
            options.writer = local.writerCreate(options);
            // 1. print coverage in text-format to stdout
            if (local.modeJs === 'node') {
                new local.TextReport(options).writeReport(options.collector);
            }
            // 2. write coverage in html-format to filesystem
            new local.HtmlReport(options).writeReport(options.collector);
            options.writer.writeFile('', local.nop);
            // write coverage-summary.json
            local.fsWriteFileWithMkdirpSync(options.dir +
                '/coverage-summary.json', JSON.stringify(local.coverageReportSummary, null, 4));
            // write coverage.json
            local.fsWriteFileWithMkdirpSync(options.dir +
                '/coverage.json', JSON.stringify(options.coverage));
            // write coverage.badge.svg
            options.pct = local.coverageReportSummary.root.metrics.lines.pct;
            local.fsWriteFileWithMkdirpSync(local.path.dirname(options.dir) +
                '/coverage.badge.svg', local['coverage.badge.svg']
                // edit coverage badge percent
                .replace((/100.0/g), options.pct)
                // edit coverage badge color
                .replace(
                    (/0d0/g),
                    ('0' + Math.round((100 - options.pct) * 2.21).toString(16)).slice(-2) +
                        ('0' + Math.round(options.pct * 2.21).toString(16)).slice(-2) + '00'
                ));
            console.log('created coverage file://' + options.dir + '/index.html');
            // 3. return coverage in html-format as a single document
            // update coverageReport
            if (local.modeJs === 'browser') {
                try {
                    document.querySelector('.istanbulCoverageDiv').innerHTML = options
                        .coverageReportHtml;
                } catch (ignore) {
                }
            }
            return options.coverageReportHtml;
        };
        local.fs = {
            readFileSync: function (file) {
                // return head.txt or foot.txt
                file = local[file.slice(-8)];
                if (local.modeJs === 'browser') {
                    file = file
                        .replace((/\bhtml\b/g), 'x-istanbul-html')
                        .replace((/<style>[\S\s]+?<\/style>/), function (match0) {
                            return match0
                                .replace((/\S.*?\{/g), function (match0) {
                                    return 'x-istanbul-html ' + match0
                                        .replace((/,/g), ', x-istanbul-html ');
                                });
                        });
                }
                return file;
            },
            readdirSync: function () {
                return [];
            }
        };
        local.fsWriteFileWithMkdirpSync = function (file, data) {
            /*
             * this function will synchronously 'mkdir -p' and write the data to file
             */
            if (!local._fs || !file) {
                return;
            }
            try {
                local._fs.writeFileSync(file, data);
            } catch (errorCaught) {
                require('child_process').spawnSync(
                    'mkdir',
                    ['-p', local.path.dirname(file)],
                    { stdio: ['ignore', 1, 2] }
                );
                local._fs.writeFileSync(file, data);
            }
        };
        local.instrumentSync = function (code, file, coverageVariable) {
            /*
             * this function will
             * 1. normalize the file
             * 2. save code to codeDict[file] for future html-report
             * 3. return instrumented code
             */
            // 1. normalize the file
            file = local.path.resolve('/', file);
            // 2. save code to codeDict[file] for future html-report
            local.codeDict[file] = code;
            // 3. return instrumented code
            return new local.Instrumenter({
                coverageVariable: coverageVariable,
                embedSource: true,
                noAutoWrap: true
            })
                .instrumentSync(code, file);
        };
        local.nop = function () {
            /*
             * this function will run no operation - nop
             */
            return;
        };
        local.util = { inherits: local.nop };
    }());
    switch (local.modeJs) {



    // run browser js-env code
    case 'browser':
        // export istanbul
        local.global.utility2_istanbul = local;
        // init local properties
        local.path = {
            dirname: function (file) {
                return file.replace((/\/[\w\-\.]+?$/), '');
            },
            resolve: function () {
                return arguments[arguments.length - 1];
            }
        };
        local.process = {
            cwd: function () {
                return '';
            },
            stdout: {}
        };
        break;



    // run node js-env code
    case 'node':
        // export istanbul
        module.exports = local;
        // init local properties
        local._fs = require('fs');
        local.path = require('path');
        local.process = process;
        local.require = require;
        break;
    }
    return local;
}())));
