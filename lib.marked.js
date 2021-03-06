#!/usr/bin/env node


/* istanbul instrument in package marked */
// assets.utility2.header.js - start
/* jslint utility2:true */
/* istanbul ignore next */
// run shared js-env code - init-local
(function () {
    "use strict";
    let isBrowser;
    let isWebWorker;
    let local;
    // polyfill globalThis
    if (!(typeof globalThis === "object" && globalThis)) {
        if (typeof window === "object" && window && window.window === window) {
            window.globalThis = window;
        }
        if (typeof global === "object" && global && global.global === global) {
            global.globalThis = global;
        }
    }
    // init debugInline
    if (!globalThis.debugInline) {
        let consoleError;
        consoleError = console.error;
        globalThis.debugInline = function (...argList) {
        /*
         * this function will both print <argList> to stderr
         * and return <argList>[0]
         */
            consoleError("\n\ndebugInline");
            consoleError(...argList);
            consoleError("\n");
            return argList[0];
        };
    }
    // init isBrowser
    isBrowser = (
        typeof globalThis.XMLHttpRequest === "function" &&
        globalThis.navigator &&
        typeof globalThis.navigator.userAgent === "string"
    );
    // init isWebWorker
    isWebWorker = (
        isBrowser && typeof globalThis.importScripts === "function"
    );
    // init function
    function objectDeepCopyWithKeysSorted(obj) {
    /*
     * this function will recursively deep-copy <obj> with keys sorted
     */
        let sorted;
        if (typeof obj !== "object" || !obj) {
            return obj;
        }
        // recursively deep-copy list with child-keys sorted
        if (Array.isArray(obj)) {
            return obj.map(objectDeepCopyWithKeysSorted);
        }
        // recursively deep-copy obj with keys sorted
        sorted = {};
        Object.keys(obj).sort().forEach(function (key) {
            sorted[key] = objectDeepCopyWithKeysSorted(obj[key]);
        });
        return sorted;
    }
    function assertJsonEqual(aa, bb) {
    /*
     * this function will assert JSON.stringify(<aa>) === JSON.stringify(<bb>)
     */
        aa = JSON.stringify(objectDeepCopyWithKeysSorted(aa));
        bb = JSON.stringify(objectDeepCopyWithKeysSorted(bb));
        if (aa !== bb) {
            throw new Error(JSON.stringify(aa) + " !== " + JSON.stringify(bb));
        }
    }
    function assertOrThrow(passed, msg) {
    /*
     * this function will throw <msg> if <passed> is falsy
     */
        if (passed) {
            return;
        }
        throw (
            (
                msg &&
                typeof msg.message === "string" &&
                typeof msg.stack === "string"
            )
            // if msg is err, then leave as is
            ? msg
            : new Error(
                typeof msg === "string"
                // if msg is string, then leave as is
                ? msg
                // else JSON.stringify(msg)
                : JSON.stringify(msg, undefined, 4)
            )
        );
    }
    function identity(val) {
    /*
     * this function will return <val>
     */
        return val;
    }
    function noop() {
    /*
     * this function will do nothing
     */
        return;
    }
    function objectAssignDefault(tgt = {}, src = {}, depth = 0) {
    /*
     * this function will if items from <tgt> are null, undefined, or "",
     * then overwrite them with items from <src>
     */
        let recurse;
        recurse = function (tgt, src, depth) {
            Object.entries(src).forEach(function ([
                key, bb
            ]) {
                let aa;
                aa = tgt[key];
                if (aa === undefined || aa === null || aa === "") {
                    tgt[key] = bb;
                    return;
                }
                if (
                    depth !== 0 &&
                    typeof aa === "object" && aa && !Array.isArray(aa) &&
                    typeof bb === "object" && bb && !Array.isArray(bb)
                ) {
                    recurse(aa, bb, depth - 1);
                }
            });
        };
        recurse(tgt, src, depth | 0);
        return tgt;
    }
    function onErrorThrow(err) {
    /*
     * this function will throw <err> if exists
     */
        if (err) {
            throw err;
        }
    }
    // bug-workaround - throw unhandledRejections in node-process
    if (
        typeof process === "object" && process &&
        typeof process.on === "function" &&
        process.unhandledRejections !== "strict"
    ) {
        process.unhandledRejections = "strict";
        process.on("unhandledRejection", function (err) {
            throw err;
        });
    }
    // init local
    local = {
        assertJsonEqual,
        assertOrThrow,
        identity,
        isBrowser,
        isWebWorker,
        local,
        noop,
        objectAssignDefault,
        objectDeepCopyWithKeysSorted,
        onErrorThrow
    };
    globalThis.globalLocal = local;
}());
// assets.utility2.header.js - end


(function (local) {
"use strict";


/* istanbul ignore next */
// run shared js-env code - init-before
(function () {
// init local
local = (
    globalThis.utility2_rollup ||
    // globalThis.utility2_rollup_old ||
    // require("./assets.utility2.rollup.js") ||
    globalThis.globalLocal
);
// init exports
if (local.isBrowser) {
    globalThis.utility2_marked = local;
} else {
    module.exports = local;
    module.exports.__dirname = __dirname;
}
// init lib main
local.marked = local;


/* validateLineSortedReset */
return;
}());


/* jslint ignore:start */
(function () { var exports, module; exports = module = {};
// rollup-file marked.js
// 2017-01-19T23:03:37Z
// https://github.com/markedjs/marked/blob/v0.3.7/lib/marked.js
// utility2-uglifyjs https://raw.githubusercontent.com/chjj/marked/v0.3.7/lib/marked.js > /tmp/out.js
(function(){function t(t){this.tokens=[],this.tokens.links={},this.options=t||c.
defaults,this.rules=e.normal,this.options.gfm&&(this.options.tables?this.rules=e
.tables:this.rules=e.gfm)}function r(e,t){this.options=t||c.defaults,this.links=
e,this.rules=n.normal,this.renderer=this.options.renderer||new i,this.renderer.options=
this.options;if(!this.links)throw new Error("Tokens array requires a `links` property."
);this.options.gfm?this.options.breaks?this.rules=n.breaks:this.rules=n.gfm:this
.options.pedantic&&(this.rules=n.pedantic)}function i(e){this.options=e||{}}function s
(e){this.tokens=[],this.token=null,this.options=e||c.defaults,this.options.renderer=
this.options.renderer||new i,this.renderer=this.options.renderer,this.renderer.options=
this.options}function o(e,t){return e.replace(t?/&/g:/&(?!#?\w+;)/g,"&amp;").replace
(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}
function u(e){return e.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g,function(
e,t){return t=t.toLowerCase(),t==="colon"?":":t.charAt(0)==="#"?t.charAt(1)==="x"?
String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring
(1)):""})}function a(e,t){return e=e.source,t=t||"",function n(r,i){return r?(i=
i.source||i,i=i.replace(/(^|[^\[])\^/g,"$1"),e=e.replace(r,i),n):new RegExp(e,t)
}}function f(){}function l(e){var t=1,n,r;for(;t<arguments.length;t++){n=arguments
[t];for(r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}function c
(e,n,r){if(r||typeof n=="function"){r||(r=n,n=null),n=l({},c.defaults,n||{});var i=
n.highlight,u,a,f=0;try{u=t.lex(e,n)}catch(h){return r(h)}a=u.length;var p=function(
e){if(e)return n.highlight=i,r(e);var t;try{t=s.parse(u,n)}catch(o){e=o}return n
.highlight=i,e?r(e):r(null,t)};if(!i||i.length<3)return p();delete n.highlight;if(!
a)return p();for(;f<u.length;f++)(function(e){return e.type!=="code"?--a||p():i(
e.text,e.lang,function(t,n){if(t)return p(t);if(n==null||n===e.text)return--a||p
();e.text=n,e.escaped=!0,--a||p()})})(u[f]);return}try{return n&&(n=l({},c.defaults
,n)),s.parse(t.lex(e,n),n)}catch(h){h.message+="\nPlease report this to https://github.com/chjj/marked."
;if((n||c.defaults).silent)return"<p>An error occured:</p><pre>"+o(h.message+"",!0
)+"</pre>";throw h}}var e={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:f,hr:/^( *[-*_]){3,} *(?:\n+|$)/
,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:f,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/
,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/
,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/
,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:f
,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text
:/^[^\n]+/};e.bullet=/(?:[*+-]|\d+\.)/,e.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/
,e.item=a(e.item,"gm")(/bull/g,e.bullet)(),e.list=a(e.list)(/bull/g,e.bullet)("hr"
,"\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+e.def.source+")")(),e.
blockquote=a(e.blockquote)("def",e.def)(),e._tag="(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b"
,e.html=a(e.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing"
,/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,e._tag)(),e.paragraph=a(e.paragraph
)("hr",e.hr)("heading",e.heading)("lheading",e.lheading)("blockquote",e.blockquote
)("tag","<"+e._tag)("def",e.def)(),e.normal=l({},e),e.gfm=l({},e.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/
,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/}),e.gfm.paragraph=
a(e.paragraph)("(?!","(?!"+e.gfm.fences.source.replace("\\1","\\2")+"|"+e.list.source
.replace("\\1","\\3")+"|")(),e.tables=l({},e.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/
,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/}),t.rules=e,t
.lex=function(e,n){var r=new t(n);return r.lex(e)},t.prototype.lex=function(e){return e=
e.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g
,"\n"),this.token(e,!0)},t.prototype.token=function(t,n,r){var t=t.replace(/^ +$/gm
,""),i,s,o,u,a,f,l,c,h;while(t){if(o=this.rules.newline.exec(t))t=t.substring(o[0
].length),o[0].length>1&&this.tokens.push({type:"space"});if(o=this.rules.code.exec
(t)){t=t.substring(o[0].length),o=o[0].replace(/^ {4}/gm,""),this.tokens.push({type
:"code",text:this.options.pedantic?o:o.replace(/\n+$/,"")});continue}if(o=this.rules
.fences.exec(t)){t=t.substring(o[0].length),this.tokens.push({type:"code",lang:o
[2],text:o[3]||""});continue}if(o=this.rules.heading.exec(t)){t=t.substring(o[0]
.length),this.tokens.push({type:"heading",depth:o[1].length,text:o[2]});continue}
if(n&&(o=this.rules.nptable.exec(t))){t=t.substring(o[0].length),f={type:"table"
,header:o[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:o[2].replace(/^ *|\| *$/g
,"").split(/ *\| */),cells:o[3].replace(/\n$/,"").split("\n")};for(c=0;c<f.align
.length;c++)/^ *-+: *$/.test(f.align[c])?f.align[c]="right":/^ *:-+: *$/.test(f.
align[c])?f.align[c]="center":/^ *:-+ *$/.test(f.align[c])?f.align[c]="left":f.align
[c]=null;for(c=0;c<f.cells.length;c++)f.cells[c]=f.cells[c].split(/ *\| */);this
.tokens.push(f);continue}if(o=this.rules.lheading.exec(t)){t=t.substring(o[0].length
),this.tokens.push({type:"heading",depth:o[2]==="="?1:2,text:o[1]});continue}if(
o=this.rules.hr.exec(t)){t=t.substring(o[0].length),this.tokens.push({type:"hr"}
);continue}if(o=this.rules.blockquote.exec(t)){t=t.substring(o[0].length),this.tokens
.push({type:"blockquote_start"}),o=o[0].replace(/^ *> ?/gm,""),this.token(o,n,!0
),this.tokens.push({type:"blockquote_end"});continue}if(o=this.rules.list.exec(t
)){t=t.substring(o[0].length),u=o[2],this.tokens.push({type:"list_start",ordered
:u.length>1}),o=o[0].match(this.rules.item),i=!1,h=o.length,c=0;for(;c<h;c++)f=o
[c],l=f.length,f=f.replace(/^ *([*+-]|\d+\.) +/,""),~f.indexOf("\n ")&&(l-=f.length
,f=this.options.pedantic?f.replace(/^ {1,4}/gm,""):f.replace(new RegExp("^ {1,"+
l+"}","gm"),"")),this.options.smartLists&&c!==h-1&&(a=e.bullet.exec(o[c+1])[0],u!==
a&&!(u.length>1&&a.length>1)&&(t=o.slice(c+1).join("\n")+t,c=h-1)),s=i||/\n\n(?!\s*$)/
.test(f),c!==h-1&&(i=f.charAt(f.length-1)==="\n",s||(s=i)),this.tokens.push({type
:s?"loose_item_start":"list_item_start"}),this.token(f,!1,r),this.tokens.push({type
:"list_item_end"});this.tokens.push({type:"list_end"});continue}if(o=this.rules.
html.exec(t)){t=t.substring(o[0].length),this.tokens.push({type:this.options.sanitize?"paragraph"
:"html",pre:!this.options.sanitizer&&(o[1]==="pre"||o[1]==="script"||o[1]==="style"
),text:o[0]});continue}if(!r&&n&&(o=this.rules.def.exec(t))){t=t.substring(o[0].
length),this.tokens.links[o[1].toLowerCase()]={href:o[2],title:o[3]};continue}if(
n&&(o=this.rules.table.exec(t))){t=t.substring(o[0].length),f={type:"table",header
:o[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:o[2].replace(/^ *|\| *$/g
,"").split(/ *\| */),cells:o[3].replace(/(?: *\| *)?\n$/,"").split("\n")};for(c=0
;c<f.align.length;c++)/^ *-+: *$/.test(f.align[c])?f.align[c]="right":/^ *:-+: *$/
.test(f.align[c])?f.align[c]="center":/^ *:-+ *$/.test(f.align[c])?f.align[c]="left"
:f.align[c]=null;for(c=0;c<f.cells.length;c++)f.cells[c]=f.cells[c].replace(/^ *\| *| *\| *$/g
,"").split(/ *\| */);this.tokens.push(f);continue}if(n&&(o=this.rules.paragraph.
exec(t))){t=t.substring(o[0].length),this.tokens.push({type:"paragraph",text:o[1
].charAt(o[1].length-1)==="\n"?o[1].slice(0,-1):o[1]});continue}if(o=this.rules.
text.exec(t)){t=t.substring(o[0].length),this.tokens.push({type:"text",text:o[0]
});continue}if(t)throw new Error("Infinite loop on byte: "+t.charCodeAt(0))}return this
.tokens};var n={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/
,url:f,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/
,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/
,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/
,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:f,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
};n._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/,n._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/
,n.link=a(n.link)("inside",n._inside)("href",n._href)(),n.reflink=a(n.reflink)("inside"
,n._inside)(),n.normal=l({},n),n.pedantic=l({},n.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/
,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/}),n.gfm=l({},n.normal
,{escape:a(n.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del
:/^~~(?=\S)([\s\S]*?\S)~~/,text:a(n.text)("]|","~]|")("|","|https?://|")()}),n.breaks=
l({},n.gfm,{br:a(n.br)("{2,}","*")(),text:a(n.gfm.text)("{2,}","*")()}),r.rules=
n,r.output=function(e,t,n){var i=new r(t,n);return i.output(e)},r.prototype.output=
function(e){var t="",n,r,i,s;while(e){if(s=this.rules.escape.exec(e)){e=e.substring
(s[0].length),t+=s[1];continue}if(s=this.rules.autolink.exec(e)){e=e.substring(s
[0].length),s[2]==="@"?(r=s[1].charAt(6)===":"?this.mangle(s[1].substring(7)):this
.mangle(s[1]),i=this.mangle("mailto:")+r):(r=o(s[1]),i=r),t+=this.renderer.link(
i,null,r);continue}if(!this.inLink&&(s=this.rules.url.exec(e))){e=e.substring(s[0
].length),r=o(s[1]),i=r,t+=this.renderer.link(i,null,r);continue}if(s=this.rules
.tag.exec(e)){!this.inLink&&/^<a /i.test(s[0])?this.inLink=!0:this.inLink&&/^<\/a>/i
.test(s[0])&&(this.inLink=!1),e=e.substring(s[0].length),t+=this.options.sanitize?
this.options.sanitizer?this.options.sanitizer(s[0]):o(s[0]):s[0];continue}if(s=this
.rules.link.exec(e)){e=e.substring(s[0].length),this.inLink=!0,t+=this.outputLink
(s,{href:s[2],title:s[3]}),this.inLink=!1;continue}if((s=this.rules.reflink.exec
(e))||(s=this.rules.nolink.exec(e))){e=e.substring(s[0].length),n=(s[2]||s[1]).replace
(/\s+/g," "),n=this.links[n.toLowerCase()];if(!n||!n.href){t+=s[0].charAt(0),e=s
[0].substring(1)+e;continue}this.inLink=!0,t+=this.outputLink(s,n),this.inLink=!1
;continue}if(s=this.rules.strong.exec(e)){e=e.substring(s[0].length),t+=this.renderer
.strong(this.output(s[2]||s[1]));continue}if(s=this.rules.em.exec(e)){e=e.substring
(s[0].length),t+=this.renderer.em(this.output(s[2]||s[1]));continue}if(s=this.rules
.code.exec(e)){e=e.substring(s[0].length),t+=this.renderer.codespan(o(s[2],!0));
continue}if(s=this.rules.br.exec(e)){e=e.substring(s[0].length),t+=this.renderer
.br();continue}if(s=this.rules.del.exec(e)){e=e.substring(s[0].length),t+=this.renderer
.del(this.output(s[1]));continue}if(s=this.rules.text.exec(e)){e=e.substring(s[0
].length),t+=this.renderer.text(o(this.smartypants(s[0])));continue}if(e)throw new
Error("Infinite loop on byte: "+e.charCodeAt(0))}return t},r.prototype.outputLink=
function(e,t){var n=o(t.href),r=t.title?o(t.title):null;return e[0].charAt(0)!=="!"?
this.renderer.link(n,r,this.output(e[1])):this.renderer.image(n,r,o(e[1]))},r.prototype
.smartypants=function(e){return this.options.smartypants?e.replace(/---/g,"\u2014"
).replace(/--/g,"\u2013").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1\u2018").replace(/'/g
,"\u2019").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1\u201c").replace(/"/g,"\u201d"
).replace(/\.{3}/g,"\u2026"):e},r.prototype.mangle=function(e){if(!this.options.
mangle)return e;var t="",n=e.length,r=0,i;for(;r<n;r++)i=e.charCodeAt(r),Math.random
()>.5&&(i="x"+i.toString(16)),t+="&#"+i+";";return t},i.prototype.code=function(
e,t,n){if(this.options.highlight){var r=this.options.highlight(e,t);r!=null&&r!==
e&&(n=!0,e=r)}return t?'<pre><code class="'+this.options.langPrefix+o(t,!0)+'">'+
(n?e:o(e,!0))+"\n</code></pre>\n":"<pre><code>"+(n?e:o(e,!0))+"\n</code></pre>"}
,i.prototype.blockquote=function(e){return"<blockquote>\n"+e+"</blockquote>\n"},
i.prototype.html=function(e){return e},i.prototype.heading=function(e,t,n){return"<h"+
t+' id="'+this.options.headerPrefix+n.toLowerCase().replace(/[^\w]+/g,"-")+'">'+
e+"</h"+t+">\n"},i.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"
},i.prototype.list=function(e,t){var n=t?"ol":"ul";return"<"+n+">\n"+e+"</"+n+">\n"
},i.prototype.listitem=function(e){return"<li>"+e+"</li>\n"},i.prototype.paragraph=
function(e){return"<p>"+e+"</p>\n"},i.prototype.table=function(e,t){return"<table>\n<thead>\n"+
e+"</thead>\n"+"<tbody>\n"+t+"</tbody>\n"+"</table>\n"},i.prototype.tablerow=function(
e){return"<tr>\n"+e+"</tr>\n"},i.prototype.tablecell=function(e,t){var n=t.header?"th"
:"td",r=t.align?"<"+n+' style="text-align:'+t.align+'">':"<"+n+">";return r+e+"</"+
n+">\n"},i.prototype.strong=function(e){return"<strong>"+e+"</strong>"},i.prototype
.em=function(e){return"<em>"+e+"</em>"},i.prototype.codespan=function(e){return"<code>"+
e+"</code>"},i.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"}
,i.prototype.del=function(e){return"<del>"+e+"</del>"},i.prototype.link=function(
e,t,n){if(this.options.sanitize){try{var r=decodeURIComponent(u(e)).replace(/[^\w:]/g
,"").toLowerCase()}catch(i){return""}if(r.indexOf("javascript:")===0||r.indexOf("vbscript:"
)===0||r.indexOf("data:")===0)return""}var s='<a href="'+e+'"';return t&&(s+=' title="'+
t+'"'),s+=">"+n+"</a>",s},i.prototype.image=function(e,t,n){var r='<img src="'+e+'" alt="'+
n+'"';return t&&(r+=' title="'+t+'"'),r+=this.options.xhtml?"/>":">",r},i.prototype
.text=function(e){return e},s.parse=function(e,t,n){var r=new s(t,n);return r.parse
(e)},s.prototype.parse=function(e){this.inline=new r(e.links,this.options,this.renderer
),this.tokens=e.reverse();var t="";while(this.next())t+=this.tok();return t},s.prototype
.next=function(){return this.token=this.tokens.pop()},s.prototype.peek=function(
){return this.tokens[this.tokens.length-1]||0},s.prototype.parseText=function(){
var e=this.token.text;while(this.peek().type==="text")e+="\n"+this.next().text;return this
.inline.output(e)},s.prototype.tok=function(){switch(this.token.type){case"space"
:return"";case"hr":return this.renderer.hr();case"heading":return this.renderer.
heading(this.inline.output(this.token.text),this.token.depth,this.token.text);case"code"
:return this.renderer.code(this.token.text,this.token.lang,this.token.escaped);case"table"
:var e="",t="",n,r,i,s,o;i="";for(n=0;n<this.token.header.length;n++)s={header:!0
,align:this.token.align[n]},i+=this.renderer.tablecell(this.inline.output(this.token
.header[n]),{header:!0,align:this.token.align[n]});e+=this.renderer.tablerow(i);
for(n=0;n<this.token.cells.length;n++){r=this.token.cells[n],i="";for(o=0;o<r.length
;o++)i+=this.renderer.tablecell(this.inline.output(r[o]),{header:!1,align:this.token
.align[o]});t+=this.renderer.tablerow(i)}return this.renderer.table(e,t);case"blockquote_start"
:var t="";while(this.next().type!=="blockquote_end")t+=this.tok();return this.renderer
.blockquote(t);case"list_start":var t="",u=this.token.ordered;while(this.next().
type!=="list_end")t+=this.tok();return this.renderer.list(t,u);case"list_item_start"
:var t="";while(this.next().type!=="list_item_end")t+=this.token.type==="text"?this
.parseText():this.tok();return this.renderer.listitem(t);case"loose_item_start":
var t="";while(this.next().type!=="list_item_end")t+=this.tok();return this.renderer
.listitem(t);case"html":var a=!this.token.pre&&!this.options.pedantic?this.inline
.output(this.token.text):this.token.text;return this.renderer.html(a);case"paragraph"
:return this.renderer.paragraph(this.inline.output(this.token.text));case"text":
return this.renderer.paragraph(this.parseText())}},f.exec=f,c.options=c.setOptions=
function(e){return l(c.defaults,e),c},c.defaults={gfm:!0,tables:!0,breaks:!1,pedantic
:!1,sanitize:!1,sanitizer:null,mangle:!0,smartLists:!1,silent:!1,highlight:null,
langPrefix:"lang-",smartypants:!1,headerPrefix:"",renderer:new i,xhtml:!1},c.Parser=
s,c.parser=s.parse,c.Renderer=i,c.Lexer=t,c.lexer=t.lex,c.InlineLexer=r,c.inlineLexer=
r.output,c.parse=c,typeof module!="undefined"&&typeof exports=="object"?module.exports=
c:typeof define=="function"&&define.amd?define(function(){return c}):this.marked=
c}).call(function(){return this||(typeof window!="undefined"?window:global)}())
local.marked = module.exports; }());
/* jslint ignore:end */
// init exports
if (local.isBrowser) {
    globalThis.utility2_marked = local.marked;
} else {
    module.exports = local.marked;
}
}());
