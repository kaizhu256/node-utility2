/*
file https://github.com/CSSLint/csslint/blob/v1.0.5/dist/csslint.js
shGithubDateCommitted https://github.com/CSSLint/csslint/commits/v1.0.5 # 2016-12-06T08:50:07Z
utility2-uglifyjs https://raw.githubusercontent.com/CSSLint/csslint/v1.0.5/dist/csslint.js > /tmp/aa.js
*/
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



/*
file https://github.com/douglascrockford/JSLint/blob/ea8401c6a72e21d66f49766af692b09e81d7a79f/jslint.js
shGithubDateCommitted https://github.com/douglascrockford/JSLint/commits/ea8401c6a72e21d66f49766af692b09e81d7a79f # 2018-11-14T03:04:33Z
curl https://raw.githubusercontent.com/douglascrockford/JSLint/ea8401c6a72e21d66f49766af692b09e81d7a79f/jslint.js > /tmp/aa.js
node -e '
"use strict";
var aa;
aa = require("fs").readFileSync("/tmp/aa.js", "utf8");
process.argv[1].replace((
    /\\u002f/gm
), "\u002f").replace((
    /^(-[\S\s]*?\n)(\+[\S\s]*?\n)\n/gm
), function (ignore, match1, match2) {
    aa = aa.replace(
        match1.replace((
            /^-/gm
        ), ""),
        match2.replace((
            /^\+/gm
        ), "")
    );
});
aa = aa.replace((
    /(\n\u0020*?)throw\u0020/g
), "$1// jslint-hack - early_stop = true$1early_stop = true;$&").replace((
    /(\n\u0020*?)if\u0020\(right.from\u0020\S+/g
), "$1// jslint-hack - expected_at$1if (right.from !==").replace((
    /\bconst\u0020|\blet\u0020/g
), "var ");
require("fs").writeFileSync("/tmp/aa.js", aa);
' '
-// jslint.js
+\u002f* jslint utility2:true *\u002f
+var next_line_extra = null;
+var warn_at_extra = null;
+// jslint.js

-\u002f*property
+// jslint-hack - property
+\u002f*\property

-    warnings.push(warning);
+    // jslint-hack - warn_at_extra
+    warn_at_extra(warning, warnings);

-            d
+            // jslint-hack - the_token
+            d || the_token

-        if (source_line !== undefined) {
+        if (source_line !== undefined) {
+            // jslint-hack - next_line_extra
+            source_line = next_line_extra(source_line, line);

-        if (!source_line) {
-            source_line = next_line();
-            from = 0;
-            return (
-                source_line === undefined
-                ? (
-                    mega_mode
-                    ? stop_at("unclosed_mega", mega_line, mega_from)
-                    : make("(end)")
-                )
-                : lex()
-            );
-        }
+        // jslint-hack - un-recurse
+        while (!source_line) {
+            source_line = next_line();
+            from = 0;
+            if (source_line === undefined) {
+                return (
+                    mega_mode
+                    ? stop_at("unclosed_mega", mega_line, mega_from)
+                    : make("(end)")
+                );
+            }
+        }

-        if (snippet === "//") {
+        if (snippet === "//") {
+            // jslint-hack - too_long
+            if (option.utility2 && (
+                /^!!|^\u0020https:\/\//m
+            ).test(source_line)) {
+                regexp_seen = true;
+            }

-                array.push(source_line);
+                array.push(source_line);
+                // jslint-hack - too_long
+                if (option.utility2 && (
+                    /^\S|^\u0020{2}|\u0020https:\/\/|\u0020this\u0020.*?\u0020package\u0020will\u0020/m
+                ).test(source_line)) {
+                    regexp_seen = true;
+                }

-        warn("unexpected_a", right);
+        // jslint-hack - unexpected_a
+        warn("unexpected_a", right, null, null, left, right);

-                        margin += 4;
+                        // jslint-hack - conditional-margin
+                        if (
+                            !option.utility2
+                            || lines[right.line].startsWith(" ")
+                        ) {
+                            margin += 4;
+                        }

-                    } else if (right.id === "." || right.id === "?.") {
-                        no_space_only();
+                    } else if (right.id === "." || right.id === "?.") {
+                        // jslint-hack - method-chain
+                        // https://github.com/douglascrockford/JSLint/commit/752c82d860ac14d35d492dc5c6ad0a0ed8227e76#diff-01d3d81a6eb6d82af3c377b55dc4fa28L4692
+                        if (left.line === right.line) {
+                            no_space();
+                        } else {
+                            at_margin(0);
+                        }

-        early_stop = true;
+        // jslint-hack - early_stop = false
+        early_stop = false;

-            if (warnings.length === 0) {
+            // jslint-hack - !early_stop
+            if (!early_stop) {

-    } catch (e) {
+    } catch (e) {
+        // jslint-hack - e.early_stop = true
+        e.early_stop = true;

' && utility2-jslint --autofix /tmp/aa.js
*/
/* jslint utility2:true */
var next_line_extra = null;
var warn_at_extra = null;
// jslint.js
// 2019-01-31
// Copyright (c) 2015 Douglas Crockford  (www.JSLint.com)

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

// jslint(source, option_object, global_array) is a function that takes 3
// arguments. The second two arguments are optional.

//      source          A text to analyze, a string or an array of strings.
//      option_object   An object whose keys correspond to option names.
//      global_array    An array of strings containing global variables that
//                      the file is allowed readonly access.

// jslint returns an object containing its results. The object contains a lot
// of valuable information. It can be used to generate reports. The object
// contains:

//      directives: an array of directive comment tokens.
//      edition: the version of JSLint that did the analysis.
//      exports: the names exported from the module.
//      froms: an array of strings representing each of the imports.
//      functions: an array of objects that represent all of the functions
//              declared in the file.
//      global: an object representing the global object. Its .context property
//              is an object containing a property for each global variable.
//      id: "(JSLint)"
//      json: true if the file is a JSON text.
//      lines: an array of strings, the source.
//      module: true if an import or export statement was used.
//      ok: true if no warnings were generated. This is what you want.
//      option: the option argument.
//      property: a property object.
//      stop: true if JSLint was unable to finish. You don't want this.
//      tokens: an array of objects representing the tokens in the file.
//      tree: the token objects arranged in a tree.
//      warnings: an array of warning objects. A warning object can contain:
//          name: "JSLintError"
//          column: A column number in the file.
//          line: A line number in the file.
//          code: A warning code string.
//          message: The warning message string.
//          a: Exhibit A.
//          b: Exhibit B.
//          c: Exhibit C.
//          d: Exhibit D.

// jslint works in several phases. In any of these phases, errors might be
// found. Sometimes JSLint is able to recover from an error and continue
// parsing. In some cases, it cannot and will stop early. If that should happen,
// repair your code and try again.

// Phases:

//      1. If the source is a single string, split it into an array of strings.
//      2. Turn the source into an array of tokens.
//      3. Furcate the tokens into a parse tree.
//      4. Walk the tree, traversing all of the nodes of the tree. It is a
//          recursive traversal. Each node may be processed on the way down
//          (preaction) and on the way up (postaction).
//      5. Check the whitespace between the tokens.

// jslint can also examine JSON text. It decides that a file is JSON text if
// the first token is "[" or "{". Processing of JSON text is much simpler than
// the processing of JavaScript programs. Only the first three phases are
// required.

// WARNING: JSLint will hurt your feelings.

// jslint-hack - property
/*\property
    a, and, arity, assign, b, bad_assignment_a, bad_directive_a, bad_get,
    bad_module_name_a, bad_option_a, bad_property_a, bad_set, bitwise, block,
    body, browser, c, calls, catch, charCodeAt, closer, closure, code, column,
    concat, constant, context, convert, couch, create, d, dead, default, devel,
    directive, directives, disrupt, dot, duplicate_a, edition, ellipsis, else,
    empty_block, escape_mega, eval, every, expected_a, expected_a_at_b_c,
    expected_a_b, expected_a_b_from_c_d, expected_a_before_b,
    expected_a_next_at_b, expected_digits_after_a, expected_four_digits,
    expected_identifier_a, expected_line_break_a_b, expected_regexp_factor_a,
    expected_space_a_b, expected_statements_a, expected_string_a,
    expected_type_string_a, exports, expression, extra, finally, flag, for,
    forEach, free, freeze, freeze_exports, from, froms, fud, fudge,
    function_in_loop, functions, g, getset, global, i, id, identifier, import,
    inc, indexOf, infix_in, init, initial, isArray, isNaN, join, json, keys,
    label, label_a, lbp, led, length, level, line, lines, live, long, loop, m,
    margin, match, message, misplaced_a, misplaced_directive_a, missing_browser,
    missing_m, module, naked_block, name, names, nested_comment, new, node,
    not_label_a, nr, nud, number_isNaN, ok, open, opening, option,
    out_of_scope_a, parameters, parent, pop, property, push, quote,
    redefinition_a_b, replace, required_a_optional_b, reserved_a, role, search,
    shebang, signature, single, slice, some, sort, split, startsWith, statement,
    stop, subscript_a, switch, test, this, thru, toString, todo_comment,
    tokens, too_long, too_many_digits, tree, try, type, u, unclosed_comment,
    unclosed_mega, unclosed_string, undeclared_a, unexpected_a,
    unexpected_a_after_b, unexpected_a_before_b, unexpected_at_top_level_a,
    unexpected_char_a, unexpected_comment, unexpected_directive_a,
    unexpected_expression_a, unexpected_label_a, unexpected_parens,
    unexpected_space_a_b, unexpected_statement_a, unexpected_trailing_space,
    unexpected_typeof_a, uninitialized_a, unreachable_a,
    unregistered_property_a, unsafe, unused_a, use_double, use_open, use_spaces,
    used, value, var_loop, var_switch, variable, warning, warnings,
    weird_condition_a, weird_expression_a, weird_loop, weird_relation_a, white,
    wrap_condition, wrap_immediate, wrap_parameter, wrap_regexp, wrap_unary,
    wrapped, writable, y
*/

function empty() {

// The empty function produces a new empty object that inherits nothing. This is
// much better than '{}' because confusions around accidental method names like
// 'constructor' are completely avoided.

    return Object.create(null);
}

function populate(array, object = empty(), value = true) {

// Augment an object by taking property names from an array of strings.

    array.forEach(function (name) {
        object[name] = value;
    });
    return object;
}

var allowed_option = {

// These are the options that are recognized in the option object or that may
// appear in a /*jslint*/ directive. Most options will have a boolean value,
// usually true. Some options will also predefine some number of global
// variables.

    bitwise: true,
    browser: [
        "caches", "clearInterval", "clearTimeout", "document", "DOMException",
        "Element", "Event", "event", "FileReader", "FormData", "history",
        "localStorage", "location", "MutationObserver", "name", "navigator",
        "screen", "sessionStorage", "setInterval", "setTimeout", "Storage",
        "TextDecoder", "TextEncoder", "URL", "window", "Worker",
        "XMLHttpRequest"
    ],
    couch: [
        "emit", "getRow", "isArray", "log", "provides", "registerType",
        "require", "send", "start", "sum", "toJSON"
    ],
    convert: true,
    devel: [
        "alert", "confirm", "console", "prompt"
    ],
    eval: true,
    for: true,
    fudge: true,
    getset: true,
    long: true,
    node: [
        "Buffer", "clearImmediate", "clearInterval", "clearTimeout",
        "console", "exports", "module", "process", "require",
        "setImmediate", "setInterval", "setTimeout", "TextDecoder",
        "TextEncoder", "URL", "URLSearchParams", "__dirname", "__filename"
    ],
    single: true,
    this: true,
    white: true
};

var anticondition = populate([
    "?", "~", "&", "|", "^", "<<", ">>", ">>>", "+", "-", "*", "/", "%",
    "typeof", "(number)", "(string)"
]);

// These are the bitwise operators.

var bitwiseop = populate([
    "~", "^", "^=", "&", "&=", "|", "|=", "<<", "<<=", ">>", ">>=",
    ">>>", ">>>="
]);

var escapeable = populate([
    "\\", "/", "`", "b", "f", "n", "r", "t"
]);

var opener = {

// The open and close pairs.

    "(": ")", // paren
    "[": "]", // bracket
    "{": "}", // brace
    "${": "}" // mega
};

// The relational operators.

var relationop = populate([
    "!=", "!==", "==", "===", "<", "<=", ">", ">="
]);

// This is the set of infix operators that require a space on each side.

var spaceop = populate([
    "!=", "!==", "%", "%=", "&", "&=", "&&", "*", "*=", "+=", "-=", "/",
    "/=", "<", "<=", "<<", "<<=", "=", "==", "===", "=>", ">", ">=",
    ">>", ">>=", ">>>", ">>>=", "^", "^=", "|", "|=", "||"
]);

var standard = [

// These are the globals that are provided by the language standard.

    "Array", "ArrayBuffer", "Boolean", "DataView", "Date", "decodeURI",
    "decodeURIComponent", "encodeURI", "encodeURIComponent", "Error",
    "EvalError", "Float32Array", "Float64Array", "Generator",
    "GeneratorFunction", "Int8Array", "Int16Array", "Int32Array", "Intl",
    "JSON", "Map", "Math", "Number", "Object", "parseInt", "parseFloat",
    "Promise", "Proxy", "RangeError", "ReferenceError", "Reflect", "RegExp",
    "Set", "String", "Symbol", "SyntaxError", "System", "TypeError",
    "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array",
    "URIError", "WeakMap", "WeakSet"
];

var bundle = {

// The bundle contains the raw text messages that are generated by jslint. It
// seems that they are all error messages and warnings. There are no "Atta
// boy!" or "You are so awesome!" messages. There is no positive reinforcement
// or encouragement. This relentless negativity can undermine self-esteem and
// wound the inner child. But if you accept it as sound advice rather than as
// personal criticism, it can make your programs better.

    and: "The '&&' subexpression should be wrapped in parens.",
    bad_assignment_a: "Bad assignment to '{a}'.",
    bad_directive_a: "Bad directive '{a}'.",
    bad_get: "A get function takes no parameters.",
    bad_module_name_a: "Bad module name '{a}'.",
    bad_option_a: "Bad option '{a}'.",
    bad_property_a: "Bad property name '{a}'.",
    bad_set: "A set function takes one parameter.",
    duplicate_a: "Duplicate '{a}'.",
    empty_block: "Empty block.",
    escape_mega: "Unexpected escapement in mega literal.",
    expected_a: "Expected '{a}'.",
    expected_a_at_b_c: "Expected '{a}' at column {b}, not column {c}.",
    expected_a_b: "Expected '{a}' and instead saw '{b}'.",
    expected_a_b_from_c_d: (
        "Expected '{a}' to match '{b}' from line {c} and instead saw '{d}'."
    ),
    expected_a_before_b: "Expected '{a}' before '{b}'.",
    expected_a_next_at_b: "Expected '{a}' at column {b} on the next line.",
    expected_digits_after_a: "Expected digits after '{a}'.",
    expected_four_digits: "Expected four digits after '\\u'.",
    expected_identifier_a: "Expected an identifier and instead saw '{a}'.",
    expected_line_break_a_b: "Expected a line break between '{a}' and '{b}'.",
    expected_regexp_factor_a: "Expected a regexp factor and instead saw '{a}'.",
    expected_space_a_b: "Expected one space between '{a}' and '{b}'.",
    expected_statements_a: "Expected statements before '{a}'.",
    expected_string_a: "Expected a string and instead saw '{a}'.",
    expected_type_string_a: "Expected a type string and instead saw '{a}'.",
    freeze_exports: (
        "Expected 'Object.freeze('. All export values should be frozen."
    ),
    function_in_loop: "Don't make functions within a loop.",
    infix_in: (
        "Unexpected 'in'. Compare with undefined, "
        + "or use the hasOwnProperty method instead."
    ),
    label_a: "'{a}' is a statement label.",
    misplaced_a: "Place '{a}' at the outermost level.",
    misplaced_directive_a: (
        "Place the '/*{a}*/' directive before the first statement."
    ),
    missing_browser: "/*global*/ requires the Assume a browser option.",
    missing_m: "Expected 'm' flag on a multiline regular expression.",
    naked_block: "Naked block.",
    nested_comment: "Nested comment.",
    not_label_a: "'{a}' is not a label.",
    number_isNaN: "Use Number.isNaN function to compare with NaN.",
    out_of_scope_a: "'{a}' is out of scope.",
    redefinition_a_b: "Redefinition of '{a}' from line {b}.",
    required_a_optional_b: (
        "Required parameter '{a}' after optional parameter '{b}'."
    ),
    reserved_a: "Reserved name '{a}'.",
    subscript_a: "['{a}'] is better written in dot notation.",
    todo_comment: "Unexpected TODO comment.",
    too_long: "Line is longer than 80 characters.",
    too_many_digits: "Too many digits.",
    unclosed_comment: "Unclosed comment.",
    unclosed_mega: "Unclosed mega literal.",
    unclosed_string: "Unclosed string.",
    undeclared_a: "Undeclared '{a}'.",
    unexpected_a: "Unexpected '{a}'.",
    unexpected_a_after_b: "Unexpected '{a}' after '{b}'.",
    unexpected_a_before_b: "Unexpected '{a}' before '{b}'.",
    unexpected_at_top_level_a: "Expected '{a}' to be in a function.",
    unexpected_char_a: "Unexpected character '{a}'.",
    unexpected_comment: "Unexpected comment.",
    unexpected_directive_a: "When using modules, don't use directive '/*{a}'.",
    unexpected_expression_a: (
        "Unexpected expression '{a}' in statement position."
    ),
    unexpected_label_a: "Unexpected label '{a}'.",
    unexpected_parens: "Don't wrap function literals in parens.",
    unexpected_space_a_b: "Unexpected space between '{a}' and '{b}'.",
    unexpected_statement_a: (
        "Unexpected statement '{a}' in expression position."
    ),
    unexpected_trailing_space: "Unexpected trailing space.",
    unexpected_typeof_a: (
        "Unexpected 'typeof'. Use '===' to compare directly with {a}."
    ),
    uninitialized_a: "Uninitialized '{a}'.",
    unreachable_a: "Unreachable '{a}'.",
    unregistered_property_a: "Unregistered property name '{a}'.",
    unsafe: "Unsafe character '{a}'.",
    unused_a: "Unused '{a}'.",
    use_double: "Use double quotes, not single quotes.",
    use_open: (
        "Wrap a ternary expression in parens, "
        + "with a line break after the left paren."
    ),
    use_spaces: "Use spaces, not tabs.",
    var_loop: "Don't declare variables in a loop.",
    var_switch: "Don't declare variables in a switch.",
    weird_condition_a: "Weird condition '{a}'.",
    weird_expression_a: "Weird expression '{a}'.",
    weird_loop: "Weird loop.",
    weird_relation_a: "Weird relation '{a}'.",
    wrap_condition: "Wrap the condition in parens.",
    wrap_immediate: (
        "Wrap an immediate function invocation in parentheses to assist "
        + "the reader in understanding that the expression is the result "
        + "of a function, and not the function itself."
    ),
    wrap_parameter: "Wrap the parameter in parens.",
    wrap_regexp: "Wrap this regexp in parens to avoid confusion.",
    wrap_unary: "Wrap the unary expression in parens."
};

// Regular expression literals:

// supplant {variables}
var rx_supplant = (
    /\{([^{}]*)\}/g
);
// carriage return, carriage return linefeed, or linefeed
var rx_crlf = (
    /\n|\r\n?/
);
// unsafe characters that are silently deleted by one or more browsers
var rx_unsafe = (
    /[\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/
);
// identifier
var rx_identifier = (
    /^([a-zA-Z_$][a-zA-Z0-9_$]*)$/
);
var rx_module = (
    /^[a-zA-Z0-9_$:.@\-\/]+$/
);
var rx_bad_property = (
    /^_|\$|Sync\$|_$/
);
// star slash
var rx_star_slash = (
    /\*\//
);
// slash star
var rx_slash_star = (
    /\/\*/
);
// slash star or ending slash
var rx_slash_star_or_slash = (
    /\/\*|\/$/
);
// uncompleted work comment
var rx_todo = (
    /\b(?:todo|TO\s?DO|HACK)\b/
);
// tab
var rx_tab = (
    /\t/g
);
// directive
var rx_directive = (
    /^(jslint|property|global)\s+(.*)$/
);
var rx_directive_part = (
    /^([a-zA-Z$_][a-zA-Z0-9$_]*)(?::\s*(true|false))?,?\s*(.*)$/
);
// token (sorry it is so long)
var rx_token = (
    /^((\s+)|([a-zA-Z_$][a-zA-Z0-9_$]*)|[(){}\[\],:;'"~`]|\?\.?|=(?:==?|>)?|\.+|[*\/][*\/=]?|\+[=+]?|-[=\-]?|[\^%]=?|&[&=]?|\|[|=]?|>{1,3}=?|<<?=?|!(?:!|==?)?|(0|[1-9][0-9]*))(.*)$/
);
var rx_digits = (
    /^([0-9]+)(.*)$/
);
var rx_hexs = (
    /^([0-9a-fA-F]+)(.*)$/
);
var rx_octals = (
    /^([0-7]+)(.*)$/
);
var rx_bits = (
    /^([01]+)(.*)$/
);
// mega
var rx_mega = (
    /[`\\]|\$\{/
);
// JSON number
var rx_JSON_number = (
    /^-?\d+(?:\.\d*)?(?:e[\-+]?\d+)?$/i
);
// initial cap
var rx_cap = (
    /^[A-Z]/
);

function is_letter(string) {
    return (
        (string >= "a" && string <= "z\uffff")
        || (string >= "A" && string <= "Z\uffff")
    );
}

function supplant(string, object) {
    return string.replace(rx_supplant, function (found, filling) {
        var replacement = object[filling];
        return (
            replacement !== undefined
            ? replacement
            : found
        );
    });
}

var anon; // The guessed name for anonymous functions.
var block_stack; // The stack of blocks.
var blockage; // The current block.
var declared_globals; // The object containing the global declarations.
var directive_mode; // true if directives are still allowed.
var directives; // The directive comments.
var early_stop; // true if JSLint cannot finish.
var exports; // The exported names and values.
var froms; // The array collecting all import-from strings.
var fudge; // true if the natural numbers start with 1.
var functionage; // The current function.
var functions; // The array containing all of the functions.
var global; // The global object; the outermost context.
var json_mode; // true if parsing JSON.
var lines; // The array containing source lines.
var mega_mode; // true if currently parsing a megastring literal.
var module_mode; // true if import or export was used.
var next_token; // The next token to be examined in the parse.
var option; // The options parameter.
var property; // The object containing the tallied property names.
var shebang; // true if a #! was seen on the first line.
var stack; // The stack of functions.
var syntax; // The object containing the parser.
var tenure; // The predefined property registry.
var token; // The current token being examined in the parse.
var token_nr; // The number of the next token.
var tokens; // The array of tokens.
var tree; // The abstract parse tree.
var var_mode; // "var" if using var; "let" if using let.
var warnings; // The array collecting all generated warnings.

// Error reportage functions:

function artifact(the_token) {

// Return a string representing an artifact.

    if (the_token === undefined) {
        the_token = next_token;
    }
    return (
        (the_token.id === "(string)" || the_token.id === "(number)")
        ? String(the_token.value)
        : the_token.id
    );
}

function artifact_line(the_token) {

// Return the fudged line number of an artifact.

    if (the_token === undefined) {
        the_token = next_token;
    }
    return the_token.line + fudge;
}

function artifact_column(the_token) {

// Return the fudged column number of an artifact.

    if (the_token === undefined) {
        the_token = next_token;
    }
    return the_token.from + fudge;
}

function warn_at(code, line, column, a, b, c, d) {

// Report an error at some line and column of the program. The warning object
// resembles an exception.

    var warning = { // ~~
        name: "JSLintError",
        column,
        line,
        code
    };
    if (a !== undefined) {
        warning.a = a;
    }
    if (b !== undefined) {
        warning.b = b;
    }
    if (c !== undefined) {
        warning.c = c;
    }
    if (d !== undefined) {
        warning.d = d;
    }
    warning.message = supplant(bundle[code] || code, warning);
    // jslint-hack - warn_at_extra
    warn_at_extra(warning, warnings);
    return warning;
}

function stop_at(code, line, column, a, b, c, d) {

// Same as warn_at, except that it stops the analysis.

    // jslint-hack - early_stop = true
    early_stop = true;
    throw warn_at(code, line, column, a, b, c, d);
}

function warn(code, the_token, a, b, c, d) {

// Same as warn_at, except the warning will be associated with a specific token.
// If there is already a warning on this token, suppress the new one. It is
// likely that the first warning will be the most meaningful.

    if (the_token === undefined) {
        the_token = next_token;
    }
    if (the_token.warning === undefined) {
        the_token.warning = warn_at(
            code,
            the_token.line,
            the_token.from,
            a || artifact(the_token),
            b,
            c,
            // jslint-hack - the_token
            d || the_token
        );
        return the_token.warning;
    }
}

function stop(code, the_token, a, b, c, d) {

// Similar to warn and stop_at. If the token already had a warning, that
// warning will be replaced with this new one. It is likely that the stopping
// warning will be the more meaningful.

    if (the_token === undefined) {
        the_token = next_token;
    }
    delete the_token.warning;
    // jslint-hack - early_stop = true
    early_stop = true;
    throw warn(code, the_token, a, b, c, d);
}

// Tokenize:

function tokenize(source) {

// tokenize takes a source and produces from it an array of token objects.
// JavaScript is notoriously difficult to tokenize because of the horrible
// interactions between automatic semicolon insertion, regular expression
// literals, and now megastring literals. JSLint benefits from eliminating
// automatic semicolon insertion and nested megastring literals, which allows
// full tokenization to precede parsing.

// If the source is not an array, then it is split into lines at the
// carriage return/linefeed.

    lines = (
        Array.isArray(source)
        ? source
        : source.split(rx_crlf)
    );
    tokens = [];

    var char; // a popular character
    var column = 0; // the column number of the next character
    var first; // the first token
    var from; // the starting column number of the token
    var line = -1; // the line number of the next character
    var nr = 0; // the next token number
    var previous = global; // the previous token including comments
    var prior = global; // the previous token excluding comments
    var mega_from; // the starting column of megastring
    var mega_line; // the starting line of megastring
    var regexp_seen; // regular expression literal seen on this line
    var snippet; // a piece of string
    var source_line = ""; // the remaining line source string
    var whole_line = ""; // the whole line source string

    if (lines[0].startsWith("#!")) {
        line = 0;
        shebang = true;
    }

    function next_line() {

// Put the next line of source in source_line. If the line contains tabs,
// replace them with spaces and give a warning. Also warn if the line contains
// unsafe characters or is too damn long.

        var at;
        if (
            !option.long
            && whole_line.length > 80
            && !json_mode
            && first
            && !regexp_seen
        ) {
            warn_at("too_long", line, 80);
        }
        column = 0;
        line += 1;
        regexp_seen = false;
        source_line = lines[line];
        whole_line = source_line || "";
        if (source_line !== undefined) {
            // jslint-hack - next_line_extra
            source_line = next_line_extra(source_line, line);
            at = source_line.search(rx_tab);
            if (at >= 0) {
                if (!option.white) {
                    warn_at("use_spaces", line, at + 1);
                }
                source_line = source_line.replace(rx_tab, " ");
            }
            at = source_line.search(rx_unsafe);
            if (at >= 0) {
                warn_at(
                    "unsafe",
                    line,
                    column + at,
                    "U+" + source_line.charCodeAt(at).toString(16)
                );
            }
            if (!option.white && source_line.slice(-1) === " ") {
                warn_at(
                    "unexpected_trailing_space",
                    line,
                    source_line.length - 1
                );
            }
        }
        return source_line;
    }

// Most tokens, including the identifiers, operators, and punctuators, can be
// found with a regular expression. Regular expressions cannot correctly match
// regular expression literals, so we will match those the hard way. String
// literals and number literals can be matched by regular expressions, but they
// don't provide good warnings. The functions snip, next_char, prev_char,
// some_digits, and escape help in the parsing of literals.

    function snip() {

// Remove the last character from snippet.

        snippet = snippet.slice(0, -1);
    }

    function next_char(match) {

// Get the next character from the source line. Remove it from the source_line,
// and append it to the snippet. Optionally check that the previous character
// matched an expected value.

        if (match !== undefined && char !== match) {
            return stop_at((
                char === ""
                ? "expected_a"
                : "expected_a_b"
            ), line, column - 1, match, char);
        }
        if (source_line) {
            char = source_line[0];
            source_line = source_line.slice(1);
            snippet += char;
        } else {
            char = "";
            snippet += " ";
        }
        column += 1;
        return char;
    }

    function back_char() {

// Back up one character by moving a character from the end of the snippet to
// the front of the source_line.

        if (snippet) {
            char = snippet.slice(-1);
            source_line = char + source_line;
            column -= 1;
            snip();
        } else {
            char = "";
        }
        return char;
    }

    function some_digits(rx, quiet) {
        var result = source_line.match(rx);
        if (result) {
            char = result[1];
            column += char.length;
            source_line = result[2];
            snippet += char;
        } else {
            char = "";
            if (!quiet) {
                warn_at(
                    "expected_digits_after_a",
                    line,
                    column,
                    snippet
                );
            }
        }
        return char.length;
    }

    function escape(extra) {
        next_char("\\");
        if (escapeable[char] === true) {
            return next_char();
        }
        if (char === "") {
            return stop_at("unclosed_string", line, column);
        }
        if (char === "u") {
            if (next_char("u") === "{") {
                if (json_mode) {
                    warn_at("unexpected_a", line, column - 1, char);
                }
                if (some_digits(rx_hexs) > 5) {
                    warn_at("too_many_digits", line, column - 1);
                }
                if (next_char() !== "}") {
                    stop_at("expected_a_before_b", line, column, "}", char);
                }
                return next_char();
            }
            back_char();
            if (some_digits(rx_hexs, true) < 4) {
                warn_at("expected_four_digits", line, column - 1);
            }
            return;
        }
        if (extra && extra.indexOf(char) >= 0) {
            return next_char();
        }
        warn_at("unexpected_a_before_b", line, column - 2, "\\", char);
    }

    function make(id, value, identifier) {

// Make the token object and append it to the tokens list.

        var the_token = {
            from,
            id,
            identifier: Boolean(identifier),
            line,
            nr,
            thru: column
        };
        tokens[nr] = the_token;
        nr += 1;

// Directives must appear before the first statement.

        if (id !== "(comment)" && id !== ";") {
            directive_mode = false;
        }

// If the token is to have a value, give it one.

        if (value !== undefined) {
            the_token.value = value;
        }

// If this token is an identifier that touches a preceding number, or
// a "/", comment, or regular expression literal that touches a preceding
// comment or regular expression literal, then give a missing space warning.
// This warning is not suppressed by option.white.

        if (
            previous.line === line
            && previous.thru === from
            && (id === "(comment)" || id === "(regexp)" || id === "/")
            && (previous.id === "(comment)" || previous.id === "(regexp)")
        ) {
            warn(
                "expected_space_a_b",
                the_token,
                artifact(previous),
                artifact(the_token)
            );
        }
        if (previous.id === "." && id === "(number)") {
            warn("expected_a_before_b", previous, "0", ".");
        }
        if (prior.id === "." && the_token.identifier) {
            the_token.dot = true;
        }

// The previous token is used to detect adjacency problems.

        previous = the_token;

// The prior token is a previous token that was not a comment. The prior token
// is used to disambiguate "/", which can mean division or regular expression
// literal.

        if (previous.id !== "(comment)") {
            prior = previous;
        }
        return the_token;
    }

    function parse_directive(the_comment, body) {

// JSLint recognizes three directives that can be encoded in comments. This
// function processes one item, and calls itself recursively to process the
// next one.

        var result = body.match(rx_directive_part);
        if (result) {
            var allowed;
            var name = result[1];
            var value = result[2];
            if (the_comment.directive === "jslint") {
                allowed = allowed_option[name];
                if (
                    typeof allowed === "boolean"
                    || typeof allowed === "object"
                ) {
                    if (
                        value === ""
                        || value === "true"
                        || value === undefined
                    ) {
                        option[name] = true;
                        if (Array.isArray(allowed)) {
                            populate(allowed, declared_globals, false);
                        }
                    } else if (value === "false") {
                        option[name] = false;
                    } else {
                        warn("bad_option_a", the_comment, name + ":" + value);
                    }
                } else {
                    warn("bad_option_a", the_comment, name);
                }
            } else if (the_comment.directive === "property") {
                if (tenure === undefined) {
                    tenure = empty();
                }
                tenure[name] = true;
            } else if (the_comment.directive === "global") {
                if (value) {
                    warn("bad_option_a", the_comment, name + ":" + value);
                }
                declared_globals[name] = false;
                module_mode = the_comment;
            }
            return parse_directive(the_comment, result[3]);
        }
        if (body) {
            return stop("bad_directive_a", the_comment, body);
        }
    }

    function comment(snippet) {

// Make a comment object. Comments are not allowed in JSON text. Comments can
// include directives and notices of incompletion.

        var the_comment = make("(comment)", snippet);
        if (Array.isArray(snippet)) {
            snippet = snippet.join(" ");
        }
        if (!option.devel && rx_todo.test(snippet)) {
            warn("todo_comment", the_comment);
        }
        var result = snippet.match(rx_directive);
        if (result) {
            if (!directive_mode) {
                warn_at("misplaced_directive_a", line, from, result[1]);
            } else {
                the_comment.directive = result[1];
                parse_directive(the_comment, result[2]);
            }
            directives.push(the_comment);
        }
        return the_comment;
    }

    function regexp() {

// Parse a regular expression literal.

        var multi_mode = false;
        var result;
        var value;
        regexp_seen = true;

        function quantifier() {

// Match an optional quantifier.

            if (char === "?" || char === "*" || char === "+") {
                next_char();
            } else if (char === "{") {
                if (some_digits(rx_digits, true) === 0) {
                    warn_at("expected_a", line, column, "0");
                }
                if (next_char() === ",") {
                    some_digits(rx_digits, true);
                    next_char();
                }
                next_char("}");
            } else {
                return;
            }
            if (char === "?") {
                next_char("?");
            }
        }

        function subklass() {

// Match a character in a character class.

            if (char === "\\") {
                escape("BbDdSsWw-[]^");
                return true;
            }
            if (
                char === ""
                || char === "["
                || char === "]"
                || char === "/"
                || char === "^"
                || char === "-"
            ) {
                return false;
            }
            if (char === " ") {
                warn_at("expected_a_b", line, column, "\\u0020", " ");
            } else if (char === "`" && mega_mode) {
                warn_at("unexpected_a", line, column, "`");
            }
            next_char();
            return true;
        }

        function ranges() {

// Match a range of subclasses.

            if (subklass()) {
                if (char === "-") {
                    next_char("-");
                    if (!subklass()) {
                        return stop_at(
                            "unexpected_a",
                            line,
                            column - 1,
                            "-"
                        );
                    }
                }
                return ranges();
            }
        }

        function klass() {

// Match a class.

            next_char("[");
            if (char === "^") {
                next_char("^");
            }
            (function classy() {
                ranges();
                if (char !== "]" && char !== "") {
                    warn_at(
                        "expected_a_before_b",
                        line,
                        column,
                        "\\",
                        char
                    );
                    next_char();
                    return classy();
                }
            }());
            next_char("]");
        }

        function choice() {

            function group() {

// Match a group that starts with left paren.

                next_char("(");
                if (char === "?") {
                    next_char("?");
                    if (char === "=" || char === "!") {
                        next_char();
                    } else {
                        next_char(":");
                    }
                } else if (char === ":") {
                    warn_at("expected_a_before_b", line, column, "?", ":");
                }
                choice();
                next_char(")");
            }

            function factor() {
                if (
                    char === ""
                    || char === "/"
                    || char === "]"
                    || char === ")"
                ) {
                    return false;
                }
                if (char === "(") {
                    group();
                    return true;
                }
                if (char === "[") {
                    klass();
                    return true;
                }
                if (char === "\\") {
                    escape("BbDdSsWw^${}[]():=!.-|*+?");
                    return true;
                }
                if (
                    char === "?"
                    || char === "+"
                    || char === "*"
                    || char === "}"
                    || char === "{"
                ) {
                    warn_at(
                        "expected_a_before_b",
                        line,
                        column - 1,
                        "\\",
                        char
                    );
                } else if (char === "`") {
                    if (mega_mode) {
                        warn_at("unexpected_a", line, column - 1, "`");
                    }
                } else if (char === " ") {
                    warn_at(
                        "expected_a_b",
                        line,
                        column - 1,
                        "\\s",
                        " "
                    );
                } else if (char === "$") {
                    if (source_line[0] !== "/") {
                        multi_mode = true;
                    }
                } else if (char === "^") {
                    if (snippet !== "^") {
                        multi_mode = true;
                    }
                }
                next_char();
                return true;
            }

            function sequence(follow) {
                if (factor()) {
                    quantifier();
                    return sequence(true);
                }
                if (!follow) {
                    warn_at("expected_regexp_factor_a", line, column, char);
                }
            }

// Match a choice (a sequence that can be followed by | and another choice).

            sequence();
            if (char === "|") {
                next_char("|");
                return choice();
            }
        }

// Scan the regexp literal. Give a warning if the first character is = because
// /= looks like a division assignment operator.

        snippet = "";
        next_char();
        if (char === "=") {
            warn_at("expected_a_before_b", line, column, "\\", "=");
        }
        choice();

// Make sure there is a closing slash.

        snip();
        value = snippet;
        next_char("/");

// Process dangling flag letters.

        var allowed = {
            g: true,
            i: true,
            m: true,
            u: true,
            y: true
        };
        var flag = empty();
        (function make_flag() {
            if (is_letter(char)) {
                if (allowed[char] !== true) {
                    warn_at("unexpected_a", line, column, char);
                }
                allowed[char] = false;
                flag[char] = true;
                next_char();
                return make_flag();
            }
        }());
        back_char();
        if (char === "/" || char === "*") {
            return stop_at("unexpected_a", line, from, char);
        }
        result = make("(regexp)", char);
        result.flag = flag;
        result.value = value;
        if (multi_mode && !flag.m) {
            warn_at("missing_m", line, column);
        }
        return result;
    }

    function string(quote) {

// Make a string token.

        var the_token;
        snippet = "";
        next_char();

        return (function next() {
            if (char === quote) {
                snip();
                the_token = make("(string)", snippet);
                the_token.quote = quote;
                return the_token;
            }
            if (char === "") {
                return stop_at("unclosed_string", line, column);
            }
            if (char === "\\") {
                escape(quote);
            } else if (char === "`") {
                if (mega_mode) {
                    warn_at("unexpected_a", line, column, "`");
                }
                next_char("`");
            } else {
                next_char();
            }
            return next();
        }());
    }

    function frack() {
        if (char === ".") {
            some_digits(rx_digits);
            next_char();
        }
        if (char === "E" || char === "e") {
            next_char();
            if (char !== "+" && char !== "-") {
                back_char();
            }
            some_digits(rx_digits);
            next_char();
        }
    }

    function number() {
        if (snippet === "0") {
            next_char();
            if (char === ".") {
                frack();
            } else if (char === "b") {
                some_digits(rx_bits);
                next_char();
            } else if (char === "o") {
                some_digits(rx_octals);
                next_char();
            } else if (char === "x") {
                some_digits(rx_hexs);
                next_char();
            }
        } else {
            next_char();
            frack();
        }

// If the next character after a number is a digit or letter, then something
// unexpected is going on.

        if (
            (char >= "0" && char <= "9")
            || (char >= "a" && char <= "z")
            || (char >= "A" && char <= "Z")
        ) {
            return stop_at(
                "unexpected_a_after_b",
                line,
                column - 1,
                snippet.slice(-1),
                snippet.slice(0, -1)
            );
        }
        back_char();
        return make("(number)", snippet);
    }

    function lex() {
        var array;
        var i = 0;
        var j = 0;
        var last;
        var result;
        var the_token;
        // jslint-hack - un-recurse
        while (!source_line) {
            source_line = next_line();
            from = 0;
            if (source_line === undefined) {
                return (
                    mega_mode
                    ? stop_at("unclosed_mega", mega_line, mega_from)
                    : make("(end)")
                );
            }
        }
        from = column;
        result = source_line.match(rx_token);

// result[1] token
// result[2] whitespace
// result[3] identifier
// result[4] number
// result[5] rest

        if (!result) {
            return stop_at(
                "unexpected_char_a",
                line,
                column,
                source_line[0]
            );
        }

        snippet = result[1];
        column += snippet.length;
        source_line = result[5];

// Whitespace was matched. Call lex again to get more.

        if (result[2]) {
            return lex();
        }

// The token is an identifier.

        if (result[3]) {
            return make(snippet, undefined, true);
        }

// The token is a number.

        if (result[4]) {
            return number(snippet);
        }

// The token is a string.

        if (snippet === "\"") {
            return string(snippet);
        }
        if (snippet === "'") {
            if (!option.single) {
                warn_at("use_double", line, column);
            }
            return string(snippet);
        }

// The token is a megastring. We don't allow any kind of mega nesting.

        if (snippet === "`") {
            if (mega_mode) {
                return stop_at("expected_a_b", line, column, "}", "`");
            }
            snippet = "";
            mega_from = from;
            mega_line = line;
            mega_mode = true;

// Parsing a mega literal is tricky. First make a ` token.

            make("`");
            from += 1;

// Then loop, building up a string, possibly from many lines, until seeing
// the end of file, a closing `, or a ${ indicting an expression within the
// string.

            (function part() {
                var at = source_line.search(rx_mega);

// If neither ` nor ${ is seen, then the whole line joins the snippet.

                if (at < 0) {
                    snippet += source_line + "\n";
                    return (
                        next_line() === undefined
                        ? stop_at("unclosed_mega", mega_line, mega_from)
                        : part()
                    );
                }

// if either ` or ${ was found, then the preceding joins the snippet to become
// a string token.

                snippet += source_line.slice(0, at);
                column += at;
                source_line = source_line.slice(at);
                if (source_line[0] === "\\") {
                    stop_at("escape_mega", line, at);
                }
                make("(string)", snippet).quote = "`";
                snippet = "";

// If ${, then make tokens that will become part of an expression until
// a } token is made.

                if (source_line[0] === "$") {
                    column += 2;
                    make("${");
                    source_line = source_line.slice(2);
                    (function expr() {
                        var id = lex().id;
                        if (id === "{") {
                            return stop_at(
                                "expected_a_b",
                                line,
                                column,
                                "}",
                                "{"
                            );
                        }
                        if (id !== "}") {
                            return expr();
                        }
                    }());
                    return part();
                }
            }());
            source_line = source_line.slice(1);
            column += 1;
            mega_mode = false;
            return make("`");
        }

// The token is a // comment.

        if (snippet === "//") {
            // jslint-hack - too_long
            if (option.utility2 && (
                /^!!|^\u0020https:\/\//m
            ).test(source_line)) {
                regexp_seen = true;
            }
            snippet = source_line;
            source_line = "";
            the_token = comment(snippet);
            if (mega_mode) {
                warn("unexpected_comment", the_token, "`");
            }
            return the_token;
        }

// The token is a /* comment.

        if (snippet === "/*") {
            array = [];
            if (source_line[0] === "/") {
                warn_at("unexpected_a", line, column + i, "/");
            }
            (function next() {
                if (source_line > "") {
                    i = source_line.search(rx_star_slash);
                    if (i >= 0) {
                        return;
                    }
                    j = source_line.search(rx_slash_star);
                    if (j >= 0) {
                        warn_at("nested_comment", line, column + j);
                    }
                }
                array.push(source_line);
                // jslint-hack - too_long
                if (option.utility2 && (
                    /^\S|^\u0020{2}|\u0020https:\/\/|\u0020this\u0020.*?\u0020package\u0020will\u0020/m
                ).test(source_line)) {
                    regexp_seen = true;
                }
                source_line = next_line();
                if (source_line === undefined) {
                    return stop_at("unclosed_comment", line, column);
                }
                return next();
            }());
            snippet = source_line.slice(0, i);
            j = snippet.search(rx_slash_star_or_slash);
            if (j >= 0) {
                warn_at("nested_comment", line, column + j);
            }
            array.push(snippet);
            column += i + 2;
            source_line = source_line.slice(i + 2);
            return comment(array);
        }

// The token is a slash.

        if (snippet === "/") {

// The / can be a division operator or the beginning of a regular expression
// literal. It is not possible to know which without doing a complete parse.
// We want to complete the tokenization before we begin to parse, so we will
// estimate. This estimator can fail in some cases. For example, it cannot
// know if "}" is ending a block or ending an object literal, so it can
// behave incorrectly in that case; it is not meaningful to divide an
// object, so it is likely that we can get away with it. We avoided the worst
// cases by eliminating automatic semicolon insertion.

            if (prior.identifier) {
                if (!prior.dot) {
                    if (prior.id === "return") {
                        return regexp();
                    }
                    if (
                        prior.id === "(begin)"
                        || prior.id === "case"
                        || prior.id === "delete"
                        || prior.id === "in"
                        || prior.id === "instanceof"
                        || prior.id === "new"
                        || prior.id === "typeof"
                        || prior.id === "void"
                        || prior.id === "yield"
                    ) {
                        the_token = regexp();
                        return stop("unexpected_a", the_token);
                    }
                }
            } else {
                last = prior.id[prior.id.length - 1];
                if ("(,=:?[".indexOf(last) >= 0) {
                    return regexp();
                }
                if ("!&|{};~+-*%/^<>".indexOf(last) >= 0) {
                    the_token = regexp();
                    warn("wrap_regexp", the_token);
                    return the_token;
                }
            }
            if (source_line[0] === "/") {
                column += 1;
                source_line = source_line.slice(1);
                snippet = "/=";
                warn_at("unexpected_a", line, column, "/=");
            }
        }
        return make(snippet);
    }

    first = lex();
    json_mode = first.id === "{" || first.id === "[";

// This is the only loop in JSLint. It will turn into a recursive call to lex
// when ES6 has been finished and widely deployed and adopted.

    while (true) {
        if (lex().id === "(end)") {
            break;
        }
    }
}

// Parsing:

// Parsing weaves the tokens into an abstract syntax tree. During that process,
// a token may be given any of these properties:

//      arity       string
//      label       identifier
//      name        identifier
//      expression  expressions
//      block       statements
//      else        statements (else, default, catch)

// Specialized tokens may have additional properties.

function survey(name) {
    var id = name.id;

// Tally the property name. If it is a string, only tally strings that conform
// to the identifier rules.

    if (id === "(string)") {
        id = name.value;
        if (!rx_identifier.test(id)) {
            return id;
        }
    } else if (id === "`") {
        if (name.value.length === 1) {
            id = name.value[0].value;
            if (!rx_identifier.test(id)) {
                return id;
            }
        }
    } else if (!name.identifier) {
        return stop("expected_identifier_a", name);
    }

// If we have seen this name before, increment its count.

    if (typeof property[id] === "number") {
        property[id] += 1;

// If this is the first time seeing this property name, and if there is a
// tenure list, then it must be on the list. Otherwise, it must conform to
// the rules for good property names.
    } else {
        if (tenure !== undefined) {
            if (tenure[id] !== true) {
                warn("unregistered_property_a", name);
            }
        } else {
            if (name.identifier && rx_bad_property.test(id)) {
                warn("bad_property_a", name);
            }
        }
        property[id] = 1;
    }
    return id;
}

function dispense() {

// Deliver the next token, skipping the comments.

    var cadet = tokens[token_nr];
    token_nr += 1;
    if (cadet.id === "(comment)") {
        if (json_mode) {
            warn("unexpected_a", cadet);
        }
        return dispense();
    } else {
        return cadet;
    }
}

function lookahead() {

// Look ahead one token without advancing.

    var old_token_nr = token_nr;
    var cadet = dispense(true);
    token_nr = old_token_nr;
    return cadet;
}

function advance(id, match) {

// Produce the next token.

// Attempt to give helpful names to anonymous functions.

    if (token.identifier && token.id !== "function") {
        anon = token.id;
    } else if (token.id === "(string)" && rx_identifier.test(token.value)) {
        anon = token.value;
    }

// Attempt to match next_token with an expected id.

    if (id !== undefined && next_token.id !== id) {
        return (
            match === undefined
            ? stop("expected_a_b", next_token, id, artifact())
            : stop(
                "expected_a_b_from_c_d",
                next_token,
                id,
                artifact(match),
                artifact_line(match),
                artifact(next_token)
            )
        );
    }

// Promote the tokens, skipping comments.

    token = next_token;
    next_token = dispense();
    if (next_token.id === "(end)") {
        token_nr -= 1;
    }
}

// Parsing of JSON is simple:

function json_value() {
    var negative;
    if (next_token.id === "{") {
        return (function json_object() {
            var brace = next_token;
            var object = empty();
            var properties = [];
            brace.expression = properties;
            advance("{");
            if (next_token.id !== "}") {
                (function next() {
                    var name;
                    var value;
                    if (next_token.quote !== "\"") {
                        warn(
                            "unexpected_a",
                            next_token,
                            next_token.quote
                        );
                    }
                    name = next_token;
                    advance("(string)");
                    if (object[token.value] !== undefined) {
                        warn("duplicate_a", token);
                    } else if (token.value === "__proto__") {
                        warn("bad_property_a", token);
                    } else {
                        object[token.value] = token;
                    }
                    advance(":");
                    value = json_value();
                    value.label = name;
                    properties.push(value);
                    if (next_token.id === ",") {
                        advance(",");
                        return next();
                    }
                }());
            }
            advance("}", brace);
            return brace;
        }());
    }
    if (next_token.id === "[") {
        return (function json_array() {
            var bracket = next_token;
            var elements = [];
            bracket.expression = elements;
            advance("[");
            if (next_token.id !== "]") {
                (function next() {
                    elements.push(json_value());
                    if (next_token.id === ",") {
                        advance(",");
                        return next();
                    }
                }());
            }
            advance("]", bracket);
            return bracket;
        }());
    }
    if (
        next_token.id === "true"
        || next_token.id === "false"
        || next_token.id === "null"
    ) {
        advance();
        return token;
    }
    if (next_token.id === "(number)") {
        if (!rx_JSON_number.test(next_token.value)) {
            warn("unexpected_a");
        }
        advance();
        return token;
    }
    if (next_token.id === "(string)") {
        if (next_token.quote !== "\"") {
            warn("unexpected_a", next_token, next_token.quote);
        }
        advance();
        return token;
    }
    if (next_token.id === "-") {
        negative = next_token;
        negative.arity = "unary";
        advance("-");
        advance("(number)");
        negative.expression = token;
        return negative;
    }
    stop("unexpected_a");
}

// Now we parse JavaScript.

function enroll(name, role, readonly) {

// Enroll a name into the current function context. The role can be exception,
// function, label, parameter, or variable. We look for variable redefinition
// because it causes confusion.

    var id = name.id;

// Reserved words may not be enrolled.

    if (syntax[id] !== undefined && id !== "ignore") {
        warn("reserved_a", name);
    } else {

// Has the name been enrolled in this context?

        var earlier = functionage.context[id];
        if (earlier) {
            warn(
                "redefinition_a_b",
                name,
                name.id,
                earlier.line + fudge
            );

// Has the name been enrolled in an outer context?
        } else {
            stack.forEach(function (value) {
                var item = value.context[id];
                if (item !== undefined) {
                    earlier = item;
                }
            });
            if (earlier) {
                if (id === "ignore") {
                    if (earlier.role === "variable") {
                        warn("unexpected_a", name);
                    }
                } else {
                    if ((
                        role !== "exception"
                        || earlier.role !== "exception"
                    ) && role !== "parameter" && role !== "function") {
                        warn(
                            "redefinition_a_b",
                            name,
                            name.id,
                            earlier.line + fudge
                        );
                    }
                }
            }

// Enroll it.

            functionage.context[id] = name;
            name.dead = true;
            name.parent = functionage;
            name.init = false;
            name.role = role;
            name.used = 0;
            name.writable = !readonly;
        }
    }
}

function expression(rbp, initial) {

// This is the heart of the Pratt parser. I retained Pratt's nomenclature.
// They are elements of the parsing method called Top Down Operator Precedence.

// nud     Null denotation
// led     Left denotation
// lbp     Left binding power
// rbp     Right binding power

// It processes a nud (variable, constant, prefix operator). It will then
// process leds (infix operators) until the bind powers cause it to stop. It
// returns the expression's parse tree.

    var left;
    var the_symbol;

// Statements will have already advanced, so advance now only if the token is
// not the first of a statement,

    if (!initial) {
        advance();
    }
    the_symbol = syntax[token.id];
    if (the_symbol !== undefined && the_symbol.nud !== undefined) {
        left = the_symbol.nud();
    } else if (token.identifier) {
        left = token;
        left.arity = "variable";
    } else {
        return stop("unexpected_a", token);
    }
    (function right() {
        the_symbol = syntax[next_token.id];
        if (
            the_symbol !== undefined
            && the_symbol.led !== undefined
            && rbp < the_symbol.lbp
        ) {
            advance();
            left = the_symbol.led(left);
            return right();
        }
    }());
    return left;
}

function condition() {

// Parse the condition part of a do, if, while.

    var the_paren = next_token;
    var the_value;
    the_paren.free = true;
    advance("(");
    the_value = expression(0);
    advance(")");
    if (the_value.wrapped === true) {
        warn("unexpected_a", the_paren);
    }
    if (anticondition[the_value.id] === true) {
        warn("unexpected_a", the_value);
    }
    return the_value;
}

function is_weird(thing) {
    return (
        thing.id === "(regexp)"
        || thing.id === "{"
        || thing.id === "=>"
        || thing.id === "function"
        || (thing.id === "[" && thing.arity === "unary")
    );
}

function are_similar(a, b) {
    if (a === b) {
        return true;
    }
    if (Array.isArray(a)) {
        return (
            Array.isArray(b)
            && a.length === b.length
            && a.every(function (value, index) {
                return are_similar(value, b[index]);
            })
        );
    }
    if (Array.isArray(b)) {
        return false;
    }
    if (a.id === "(number)" && b.id === "(number)") {
        return a.value === b.value;
    }
    var a_string;
    var b_string;
    if (a.id === "(string)") {
        a_string = a.value;
    } else if (a.id === "`" && a.constant) {
        a_string = a.value[0];
    }
    if (b.id === "(string)") {
        b_string = b.value;
    } else if (b.id === "`" && b.constant) {
        b_string = b.value[0];
    }
    if (typeof a_string === "string") {
        return a_string === b_string;
    }
    if (is_weird(a) || is_weird(b)) {
        return false;
    }
    if (a.arity === b.arity && a.id === b.id) {
        if (a.id === ".") {
            return (
                are_similar(a.expression, b.expression)
                && are_similar(a.name, b.name)
            );
        }
        if (a.arity === "unary") {
            return are_similar(a.expression, b.expression);
        }
        if (a.arity === "binary") {
            return (
                a.id !== "("
                && are_similar(a.expression[0], b.expression[0])
                && are_similar(a.expression[1], b.expression[1])
            );
        }
        if (a.arity === "ternary") {
            return (
                are_similar(a.expression[0], b.expression[0])
                && are_similar(a.expression[1], b.expression[1])
                && are_similar(a.expression[2], b.expression[2])
            );
        }
        if (a.arity === "function" && a.arity === "regexp") {
            return false;
        }
        return true;
    }
    return false;
}

function semicolon() {

// Try to match a semicolon.

    if (next_token.id === ";") {
        advance(";");
    } else {
        warn_at(
            "expected_a_b",
            token.line,
            token.thru,
            ";",
            artifact(next_token)
        );
    }
    anon = "anonymous";
}

function statement() {

// Parse a statement. Any statement may have a label, but only four statements
// have use for one. A statement can be one of the standard statements, or
// an assignment expression, or an invocation expression.

    var first;
    var the_label;
    var the_statement;
    var the_symbol;
    advance();
    if (token.identifier && next_token.id === ":") {
        the_label = token;
        if (the_label.id === "ignore") {
            warn("unexpected_a", the_label);
        }
        advance(":");
        if (
            next_token.id === "do"
            || next_token.id === "for"
            || next_token.id === "switch"
            || next_token.id === "while"
        ) {
            enroll(the_label, "label", true);
            the_label.init = true;
            the_label.dead = false;
            the_statement = statement();
            the_statement.label = the_label;
            the_statement.statement = true;
            return the_statement;
        }
        advance();
        warn("unexpected_label_a", the_label);
    }

// Parse the statement.

    first = token;
    first.statement = true;
    the_symbol = syntax[first.id];
    if (the_symbol !== undefined && the_symbol.fud !== undefined) {
        the_symbol.disrupt = false;
        the_symbol.statement = true;
        the_statement = the_symbol.fud();
    } else {

// It is an expression statement.

        the_statement = expression(0, true);
        if (the_statement.wrapped && the_statement.id !== "(") {
            warn("unexpected_a", first);
        }
        semicolon();
    }
    if (the_label !== undefined) {
        the_label.dead = true;
    }
    return the_statement;
}

function statements() {

// Parse a list of statements. Give a warning if an unreachable statement
// follows a disruptive statement.

    var array = [];
    (function next(disrupt) {
        if (
            next_token.id !== "}"
            && next_token.id !== "case"
            && next_token.id !== "default"
            && next_token.id !== "else"
            && next_token.id !== "(end)"
        ) {
            var a_statement = statement();
            array.push(a_statement);
            if (disrupt) {
                warn("unreachable_a", a_statement);
            }
            return next(a_statement.disrupt);
        }
    }(false));
    return array;
}

function not_top_level(thing) {

// Some features should not be at the outermost level.

    if (functionage === global) {
        warn("unexpected_at_top_level_a", thing);
    }
}

function top_level_only(the_thing) {

// Some features must be at the most outermost level.

    if (blockage !== global) {
        warn("misplaced_a", the_thing);
    }
}

function block(special) {

// Parse a block, a sequence of statements wrapped in braces.
//  special "body"      The block is a function body.
//          "ignore"    No warning on an empty block.
//          "naked"     No advance.
//          undefined   An ordinary block.

    var stmts;
    var the_block;
    if (special !== "naked") {
        advance("{");
    }
    the_block = token;
    the_block.arity = "statement";
    the_block.body = special === "body";

// Top level function bodies may include the "use strict" pragma.

    if (
        special === "body"
        && stack.length === 1
        && next_token.value === "use strict"
    ) {
        next_token.statement = true;
        advance("(string)");
        advance(";");
    }
    stmts = statements();
    the_block.block = stmts;
    if (stmts.length === 0) {
        if (!option.devel && special !== "ignore") {
            warn("empty_block", the_block);
        }
        the_block.disrupt = false;
    } else {
        the_block.disrupt = stmts[stmts.length - 1].disrupt;
    }
    advance("}");
    return the_block;
}

function mutation_check(the_thing) {

// The only expressions that may be assigned to are
//      e.b
//      e[b]
//      v
//      [destructure]
//      {destructure}

    if (
        the_thing.arity !== "variable"
        && the_thing.id !== "."
        && the_thing.id !== "["
        && the_thing.id !== "{"
    ) {
        warn("bad_assignment_a", the_thing);
        return false;
    }
    return true;
}

function left_check(left, right) {

// Warn if the left is not one of these:
//      e.b
//      e[b]
//      e()
//      ?:
//      identifier

    var id = left.id;
    if (
        !left.identifier
        && (
            left.arity !== "ternary"
            || (
                !left_check(left.expression[1])
                && !left_check(left.expression[2])
            )
        )
        && (
            left.arity !== "binary"
            || (id !== "." && id !== "(" && id !== "[")
        )
    ) {
        // jslint-hack - unexpected_a
        warn("unexpected_a", right, null, null, left, right);
        return false;
    }
    return true;
}

// These functions are used to specify the grammar of our language:

function symbol(id, bp) {

// Make a symbol if it does not already exist in the language's syntax.

    var the_symbol = syntax[id];
    if (the_symbol === undefined) {
        the_symbol = empty();
        the_symbol.id = id;
        the_symbol.lbp = bp || 0;
        syntax[id] = the_symbol;
    }
    return the_symbol;
}

function assignment(id) {

// Make an assignment operator. The one true assignment is different because
// its left side, when it is a variable, is not treated as an expression.
// That case is special because that is when a variable gets initialized. The
// other assignment operators can modify, but they cannot initialize.

    var the_symbol = symbol(id, 20);
    the_symbol.led = function (left) {
        var the_token = token;
        var right;
        the_token.arity = "assignment";
        right = expression(20 - 1);
        if (id === "=" && left.arity === "variable") {
            the_token.names = left;
            the_token.expression = right;
        } else {
            the_token.expression = [left, right];
        }
        if (
            right.arity === "assignment"
            || right.arity === "pre"
            || right.arity === "post"
        ) {
            warn("unexpected_a", right);
        }
        mutation_check(left);
        return the_token;
    };
    return the_symbol;
}

function constant(id, type, value) {

// Make a constant symbol.

    var the_symbol = symbol(id);
    the_symbol.constant = true;
    the_symbol.nud = (
        typeof value === "function"
        ? value
        : function () {
            token.constant = true;
            if (value !== undefined) {
                token.value = value;
            }
            return token;
        }
    );
    the_symbol.type = type;
    the_symbol.value = value;
    return the_symbol;
}

function infix(id, bp, f) {

// Make an infix operator.

    var the_symbol = symbol(id, bp);
    the_symbol.led = function (left) {
        var the_token = token;
        the_token.arity = "binary";
        if (f !== undefined) {
            return f(left);
        }
        the_token.expression = [left, expression(bp)];
        return the_token;
    };
    return the_symbol;
}

function infixr(id, bp) {

// Make a right associative infix operator.

    var the_symbol = symbol(id, bp);
    the_symbol.led = function (left) {
        var the_token = token;
        the_token.arity = "binary";
        the_token.expression = [left, expression(bp - 1)];
        return the_token;
    };
    return the_symbol;
}

function post(id) {

// Make one of the post operators.

    var the_symbol = symbol(id, 150);
    the_symbol.led = function (left) {
        token.expression = left;
        token.arity = "post";
        mutation_check(token.expression);
        return token;
    };
    return the_symbol;
}

function pre(id) {

// Make one of the pre operators.

    var the_symbol = symbol(id);
    the_symbol.nud = function () {
        var the_token = token;
        the_token.arity = "pre";
        the_token.expression = expression(150);
        mutation_check(the_token.expression);
        return the_token;
    };
    return the_symbol;
}

function prefix(id, f) {

// Make a prefix operator.

    var the_symbol = symbol(id);
    the_symbol.nud = function () {
        var the_token = token;
        the_token.arity = "unary";
        if (typeof f === "function") {
            return f();
        }
        the_token.expression = expression(150);
        return the_token;
    };
    return the_symbol;
}

function stmt(id, f) {

// Make a statement.

    var the_symbol = symbol(id);
    the_symbol.fud = function () {
        token.arity = "statement";
        return f();
    };
    return the_symbol;
}

function ternary(id1, id2) {

// Make a ternary operator.

    var the_symbol = symbol(id1, 30);
    the_symbol.led = function (left) {
        var the_token = token;
        var second = expression(20);
        advance(id2);
        token.arity = "ternary";
        the_token.arity = "ternary";
        the_token.expression = [left, second, expression(10)];
        if (next_token.id !== ")") {
            warn("use_open", the_token);
        }
        return the_token;
    };
    return the_symbol;
}

// Begin defining the language.

syntax = empty();

symbol("}");
symbol(")");
symbol("]");
symbol(",");
symbol(";");
symbol(":");
symbol("*/");
symbol("await");
symbol("case");
symbol("catch");
symbol("class");
symbol("default");
symbol("else");
symbol("enum");
symbol("finally");
symbol("implements");
symbol("interface");
symbol("package");
symbol("private");
symbol("protected");
symbol("public");
symbol("static");
symbol("super");
symbol("void");
symbol("yield");

constant("(number)", "number");
constant("(regexp)", "regexp");
constant("(string)", "string");
constant("arguments", "object", function () {
    warn("unexpected_a", token);
    return token;
});
constant("eval", "function", function () {
    if (!option.eval) {
        warn("unexpected_a", token);
    } else if (next_token.id !== "(") {
        warn("expected_a_before_b", next_token, "(", artifact());
    }
    return token;
});
constant("false", "boolean", false);
constant("Function", "function", function () {
    if (!option.eval) {
        warn("unexpected_a", token);
    } else if (next_token.id !== "(") {
        warn("expected_a_before_b", next_token, "(", artifact());
    }
    return token;
});
constant("ignore", "undefined", function () {
    warn("unexpected_a", token);
    return token;
});
constant("Infinity", "number", Infinity);
constant("isFinite", "function", function () {
    warn("expected_a_b", token, "Number.isFinite", "isFinite");
    return token;
});
constant("isNaN", "function", function () {
    warn("number_isNaN", token);
    return token;
});
constant("NaN", "number", NaN);
constant("null", "null", null);
constant("this", "object", function () {
    if (!option.this) {
        warn("unexpected_a", token);
    }
    return token;
});
constant("true", "boolean", true);
constant("undefined", "undefined");

assignment("=");
assignment("+=");
assignment("-=");
assignment("*=");
assignment("/=");
assignment("%=");
assignment("&=");
assignment("|=");
assignment("^=");
assignment("<<=");
assignment(">>=");
assignment(">>>=");

infix("||", 40);
infix("&&", 50);
infix("|", 70);
infix("^", 80);
infix("&", 90);
infix("==", 100);
infix("===", 100);
infix("!=", 100);
infix("!==", 100);
infix("<", 110);
infix(">", 110);
infix("<=", 110);
infix(">=", 110);
infix("in", 110);
infix("instanceof", 110);
infix("<<", 120);
infix(">>", 120);
infix(">>>", 120);
infix("+", 130);
infix("-", 130);
infix("*", 140);
infix("/", 140);
infix("%", 140);
infixr("**", 150);
infix("(", 160, function (left) {
    var the_paren = token;
    var the_argument;
    if (left.id !== "function") {
        left_check(left, the_paren);
    }
    if (functionage.arity === "statement" && left.identifier) {
        functionage.name.calls[left.id] = left;
    }
    the_paren.expression = [left];
    if (next_token.id !== ")") {
        (function next() {
            var ellipsis;
            if (next_token.id === "...") {
                ellipsis = true;
                advance("...");
            }
            the_argument = expression(10);
            if (ellipsis) {
                the_argument.ellipsis = true;
            }
            the_paren.expression.push(the_argument);
            if (next_token.id === ",") {
                advance(",");
                return next();
            }
        }());
    }
    advance(")", the_paren);
    if (the_paren.expression.length === 2) {
        the_paren.free = true;
        if (the_argument.wrapped === true) {
            warn("unexpected_a", the_paren);
        }
        if (the_argument.id === "(") {
            the_argument.wrapped = true;
        }
    } else {
        the_paren.free = false;
    }
    return the_paren;
});
infix(".", 170, function (left) {
    var the_token = token;
    var name = next_token;
    if ((
        left.id !== "(string)"
        || (name.id !== "indexOf" && name.id !== "repeat")
    ) && (
        left.id !== "["
        || (
            name.id !== "concat"
            && name.id !== "forEach"
            && name.id !== "join"
            && name.id !== "map"
        )
    ) && (left.id !== "+" || name.id !== "slice") && (
        left.id !== "(regexp)"
        || (name.id !== "exec" && name.id !== "test")
    )) {
        left_check(left, the_token);
    }
    if (!name.identifier) {
        stop("expected_identifier_a");
    }
    advance();
    survey(name);

// The property name is not an expression.

    the_token.name = name;
    the_token.expression = left;
    return the_token;
});
infix("?.", 170, function (left) {
    var the_token = token;
    var name = next_token;
    if ((
        left.id !== "(string)"
        || (name.id !== "indexOf" && name.id !== "repeat")
    ) && (
        left.id !== "["
        || (
            name.id !== "concat"
            && name.id !== "forEach"
            && name.id !== "join"
            && name.id !== "map"
        )
    ) && (left.id !== "+" || name.id !== "slice") && (
        left.id !== "(regexp)"
        || (name.id !== "exec" && name.id !== "test")
    )) {
        left_check(left, the_token);
    }
    if (!name.identifier) {
        stop("expected_identifier_a");
    }
    advance();
    survey(name);

// The property name is not an expression.

    the_token.name = name;
    the_token.expression = left;
    return the_token;
});
infix("[", 170, function (left) {
    var the_token = token;
    var the_subscript = expression(0);
    if (the_subscript.id === "(string)" || the_subscript.id === "`") {
        var name = survey(the_subscript);
        if (rx_identifier.test(name)) {
            warn("subscript_a", the_subscript, name);
        }
    }
    left_check(left, the_token);
    the_token.expression = [left, the_subscript];
    advance("]");
    return the_token;
});
infix("=>", 170, function (left) {
    return stop("wrap_parameter", left);
});

function do_tick() {
    var the_tick = token;
    the_tick.value = [];
    the_tick.expression = [];
    if (next_token.id !== "`") {
        (function part() {
            advance("(string)");
            the_tick.value.push(token);
            if (next_token.id === "${") {
                advance("${");
                the_tick.expression.push(expression(0));
                advance("}");
                return part();
            }
        }());
    }
    advance("`");
    return the_tick;
}

infix("`", 160, function (left) {
    var the_tick = do_tick();
    left_check(left, the_tick);
    the_tick.expression = [left].concat(the_tick.expression);
    return the_tick;
});

post("++");
post("--");
pre("++");
pre("--");

prefix("+");
prefix("-");
prefix("~");
prefix("!");
prefix("!!");
prefix("[", function () {
    var the_token = token;
    the_token.expression = [];
    if (next_token.id !== "]") {
        (function next() {
            var element;
            var ellipsis = false;
            if (next_token.id === "...") {
                ellipsis = true;
                advance("...");
            }
            element = expression(10);
            if (ellipsis) {
                element.ellipsis = true;
            }
            the_token.expression.push(element);
            if (next_token.id === ",") {
                advance(",");
                return next();
            }
        }());
    }
    advance("]");
    return the_token;
});
prefix("/=", function () {
    stop("expected_a_b", token, "/\\=", "/=");
});
prefix("=>", function () {
    return stop("expected_a_before_b", token, "()", "=>");
});
prefix("new", function () {
    var the_new = token;
    var right = expression(160);
    if (next_token.id !== "(") {
        warn("expected_a_before_b", next_token, "()", artifact(next_token));
    }
    the_new.expression = right;
    return the_new;
});
prefix("typeof");
prefix("void", function () {
    var the_void = token;
    warn("unexpected_a", the_void);
    the_void.expression = expression(0);
    return the_void;
});

function parameter_list() {
    var list = [];
    var optional;
    var signature = ["("];
    if (next_token.id !== ")" && next_token.id !== "(end)") {
        (function parameter() {
            var ellipsis = false;
            var param;
            if (next_token.id === "{") {
                if (optional !== undefined) {
                    warn(
                        "required_a_optional_b",
                        next_token,
                        next_token.id,
                        optional.id
                    );
                }
                param = next_token;
                param.names = [];
                advance("{");
                signature.push("{");
                (function subparameter() {
                    var subparam = next_token;
                    if (!subparam.identifier) {
                        return stop("expected_identifier_a");
                    }
                    survey(subparam);
                    advance();
                    signature.push(subparam.id);
                    if (next_token.id === ":") {
                        advance(":");
                        advance();
                        token.label = subparam;
                        subparam = token;
                        if (!subparam.identifier) {
                            return stop("expected_identifier_a");
                        }
                    }
                    if (next_token.id === "=") {
                        advance("=");
                        subparam.expression = expression();
                        param.open = true;
                    }
                    param.names.push(subparam);
                    if (next_token.id === ",") {
                        advance(",");
                        signature.push(", ");
                        return subparameter();
                    }
                }());
                list.push(param);
                advance("}");
                signature.push("}");
                if (next_token.id === ",") {
                    advance(",");
                    signature.push(", ");
                    return parameter();
                }
            } else if (next_token.id === "[") {
                if (optional !== undefined) {
                    warn(
                        "required_a_optional_b",
                        next_token,
                        next_token.id,
                        optional.id
                    );
                }
                param = next_token;
                param.names = [];
                advance("[");
                signature.push("[]");
                (function subparameter() {
                    var subparam = next_token;
                    if (!subparam.identifier) {
                        return stop("expected_identifier_a");
                    }
                    advance();
                    param.names.push(subparam);
                    if (next_token.id === "=") {
                        advance("=");
                        subparam.expression = expression();
                        param.open = true;
                    }
                    if (next_token.id === ",") {
                        advance(",");
                        return subparameter();
                    }
                }());
                list.push(param);
                advance("]");
                if (next_token.id === ",") {
                    advance(",");
                    signature.push(", ");
                    return parameter();
                }
            } else {
                if (next_token.id === "...") {
                    ellipsis = true;
                    signature.push("...");
                    advance("...");
                    if (optional !== undefined) {
                        warn(
                            "required_a_optional_b",
                            next_token,
                            next_token.id,
                            optional.id
                        );
                    }
                }
                if (!next_token.identifier) {
                    return stop("expected_identifier_a");
                }
                param = next_token;
                list.push(param);
                advance();
                signature.push(param.id);
                if (ellipsis) {
                    param.ellipsis = true;
                } else {
                    if (next_token.id === "=") {
                        optional = param;
                        advance("=");
                        param.expression = expression(0);
                    } else {
                        if (optional !== undefined) {
                            warn(
                                "required_a_optional_b",
                                param,
                                param.id,
                                optional.id
                            );
                        }
                    }
                    if (next_token.id === ",") {
                        advance(",");
                        signature.push(", ");
                        return parameter();
                    }
                }
            }
        }());
    }
    advance(")");
    signature.push(")");
    return [list, signature.join("")];
}

function do_function(the_function) {
    var name;
    if (the_function === undefined) {
        the_function = token;

// A function statement must have a name that will be in the parent's scope.

        if (the_function.arity === "statement") {
            if (!next_token.identifier) {
                return stop("expected_identifier_a", next_token);
            }
            name = next_token;
            enroll(name, "variable", true);
            the_function.name = name;
            name.init = true;
            name.calls = empty();
            advance();
        } else if (name === undefined) {

// A function expression may have an optional name.

            if (next_token.identifier) {
                name = next_token;
                the_function.name = name;
                advance();
            } else {
                the_function.name = anon;
            }
        }
    } else {
        name = the_function.name;
    }
    the_function.level = functionage.level + 1;
    if (mega_mode) {
        warn("unexpected_a", the_function);
    }

// Don't make functions in loops. It is inefficient, and it can lead to scoping
// errors.

    if (functionage.loop > 0) {
        warn("function_in_loop", the_function);
    }

// Give the function properties for storing its names and for observing the
// depth of loops and switches.

    the_function.context = empty();
    the_function.finally = 0;
    the_function.loop = 0;
    the_function.switch = 0;
    the_function.try = 0;

// Push the current function context and establish a new one.

    stack.push(functionage);
    functions.push(the_function);
    functionage = the_function;
    if (the_function.arity !== "statement" && typeof name === "object") {
        enroll(name, "function", true);
        name.dead = false;
        name.init = true;
        name.used = 1;
    }

// Parse the parameter list.

    advance("(");
    token.free = false;
    token.arity = "function";
    [functionage.parameters, functionage.signature] = parameter_list();
    functionage.parameters.forEach(function enroll_parameter(name) {
        if (name.identifier) {
            enroll(name, "parameter", false);
        } else {
            name.names.forEach(enroll_parameter);
        }
    });

// The function's body is a block.

    the_function.block = block("body");
    if (
        the_function.arity === "statement"
        && next_token.line === token.line
    ) {
        return stop("unexpected_a", next_token);
    }
    if (
        next_token.id === "."
        || next_token.id === "?."
        || next_token.id === "["
    ) {
        warn("unexpected_a");
    }

// Restore the previous context.

    functionage = stack.pop();
    return the_function;
}

prefix("function", do_function);

function fart(pl) {
    advance("=>");
    var the_fart = token;
    the_fart.arity = "binary";
    the_fart.name = "=>";
    the_fart.level = functionage.level + 1;
    functions.push(the_fart);
    if (functionage.loop > 0) {
        warn("function_in_loop", the_fart);
    }

// Give the function properties storing its names and for observing the depth
// of loops and switches.

    the_fart.context = empty();
    the_fart.finally = 0;
    the_fart.loop = 0;
    the_fart.switch = 0;
    the_fart.try = 0;

// Push the current function context and establish a new one.

    stack.push(functionage);
    functionage = the_fart;
    the_fart.parameters = pl[0];
    the_fart.signature = pl[1];
    the_fart.parameters.forEach(function (name) {
        enroll(name, "parameter", true);
    });
    if (next_token.id === "{") {
        warn("expected_a_b", the_fart, "function", "=>");
        the_fart.block = block("body");
    } else {
        the_fart.expression = expression(0);
    }
    functionage = stack.pop();
    return the_fart;
}

prefix("(", function () {
    var the_paren = token;
    var the_value;
    var cadet = lookahead().id;

// We can distinguish between a parameter list for => and a wrapped expression
// with one token of lookahead.

    if (
        next_token.id === ")"
        || next_token.id === "..."
        || (next_token.identifier && (cadet === "," || cadet === "="))
    ) {
        the_paren.free = false;
        return fart(parameter_list());
    }
    the_paren.free = true;
    the_value = expression(0);
    if (the_value.wrapped === true) {
        warn("unexpected_a", the_paren);
    }
    the_value.wrapped = true;
    advance(")", the_paren);
    if (next_token.id === "=>") {
        if (the_value.arity !== "variable") {
            if (the_value.id === "{" || the_value.id === "[") {
                warn("expected_a_before_b", the_paren, "function", "(");
                return stop("expected_a_b", next_token, "{", "=>");
            }
            return stop("expected_identifier_a", the_value);
        }
        the_paren.expression = [the_value];
        return fart([the_paren.expression, "(" + the_value.id + ")"]);
    }
    return the_value;
});
prefix("`", do_tick);
prefix("{", function () {
    var the_brace = token;
    var seen = empty();
    the_brace.expression = [];
    if (next_token.id !== "}") {
        (function member() {
            var extra;
            var full;
            var id;
            var name = next_token;
            var value;
            advance();
            if (
                (name.id === "get" || name.id === "set")
                && next_token.identifier
            ) {
                if (!option.getset) {
                    warn("unexpected_a", name);
                }
                extra = name.id;
                full = extra + " " + next_token.id;
                name = next_token;
                advance();
                id = survey(name);
                if (seen[full] === true || seen[id] === true) {
                    warn("duplicate_a", name);
                }
                seen[id] = false;
                seen[full] = true;
            } else {
                id = survey(name);
                if (typeof seen[id] === "boolean") {
                    warn("duplicate_a", name);
                }
                seen[id] = true;
            }
            if (name.identifier) {
                if (next_token.id === "}" || next_token.id === ",") {
                    if (typeof extra === "string") {
                        advance("(");
                    }
                    value = expression(Infinity, true);
                } else if (next_token.id === "(") {
                    value = do_function({
                        arity: "unary",
                        from: name.from,
                        id: "function",
                        line: name.line,
                        name: (
                            typeof extra === "string"
                            ? extra
                            : id
                        ),
                        thru: name.from
                    });
                } else {
                    if (typeof extra === "string") {
                        advance("(");
                    }
                    var the_colon = next_token;
                    advance(":");
                    value = expression(0);
                    if (value.id === name.id) {
                        warn("unexpected_a", the_colon, ": " + name.id);
                    }
                }
                value.label = name;
                if (typeof extra === "string") {
                    value.extra = extra;
                }
                the_brace.expression.push(value);
            } else {
                advance(":");
                value = expression(0);
                value.label = name;
                the_brace.expression.push(value);
            }
            if (next_token.id === ",") {
                advance(",");
                return member();
            }
        }());
    }
    advance("}");
    return the_brace;
});

stmt(";", function () {
    warn("unexpected_a", token);
    return token;
});
stmt("{", function () {
    warn("naked_block", token);
    return block("naked");
});
stmt("break", function () {
    var the_break = token;
    var the_label;
    if (
        (functionage.loop < 1 && functionage.switch < 1)
        || functionage.finally > 0
    ) {
        warn("unexpected_a", the_break);
    }
    the_break.disrupt = true;
    if (next_token.identifier && token.line === next_token.line) {
        the_label = functionage.context[next_token.id];
        if (
            the_label === undefined
            || the_label.role !== "label"
            || the_label.dead
        ) {
            warn(
                (the_label !== undefined && the_label.dead)
                ? "out_of_scope_a"
                : "not_label_a"
            );
        } else {
            the_label.used += 1;
        }
        the_break.label = next_token;
        advance();
    }
    advance(";");
    return the_break;
});

function do_var() {
    var the_statement = token;
    var is_const = the_statement.id === "const";
    the_statement.names = [];

// A program may use var or let, but not both.

    if (!is_const) {
        if (var_mode === undefined) {
            var_mode = the_statement.id;
        } else if (the_statement.id !== var_mode) {
            warn(
                "expected_a_b",
                the_statement,
                var_mode,
                the_statement.id
            );
        }
    }

// We don't expect to see variables created in switch statements.

    if (functionage.switch > 0) {
        warn("var_switch", the_statement);
    }
    if (functionage.loop > 0 && the_statement.id === "var") {
        warn("var_loop", the_statement);
    }
    (function next() {
        if (next_token.id === "{" && the_statement.id !== "var") {
            var the_brace = next_token;
            advance("{");
            (function pair() {
                if (!next_token.identifier) {
                    return stop("expected_identifier_a", next_token);
                }
                var name = next_token;
                survey(name);
                advance();
                if (next_token.id === ":") {
                    advance(":");
                    if (!next_token.identifier) {
                        return stop("expected_identifier_a", next_token);
                    }
                    next_token.label = name;
                    the_statement.names.push(next_token);
                    enroll(next_token, "variable", is_const);
                    advance();
                    the_brace.open = true;
                } else {
                    the_statement.names.push(name);
                    enroll(name, "variable", is_const);
                }
                name.dead = false;
                name.init = true;
                if (next_token.id === "=") {
                    advance("=");
                    name.expression = expression();
                    the_brace.open = true;
                }
                if (next_token.id === ",") {
                    advance(",");
                    return pair();
                }
            }());
            advance("}");
            advance("=");
            the_statement.expression = expression(0);
        } else if (next_token.id === "[" && the_statement.id !== "var") {
            var the_bracket = next_token;
            advance("[");
            (function element() {
                var ellipsis;
                if (next_token.id === "...") {
                    ellipsis = true;
                    advance("...");
                }
                if (!next_token.identifier) {
                    return stop("expected_identifier_a", next_token);
                }
                var name = next_token;
                advance();
                the_statement.names.push(name);
                enroll(name, "variable", is_const);
                name.dead = false;
                name.init = true;
                if (ellipsis) {
                    name.ellipsis = true;
                } else {
                    if (next_token.id === "=") {
                        advance("=");
                        name.expression = expression();
                        the_bracket.open = true;
                    }
                    if (next_token.id === ",") {
                        advance(",");
                        return element();
                    }
                }
            }());
            advance("]");
            advance("=");
            the_statement.expression = expression(0);
        } else if (next_token.identifier) {
            var name = next_token;
            advance();
            if (name.id === "ignore") {
                warn("unexpected_a", name);
            }
            enroll(name, "variable", is_const);
            if (next_token.id === "=" || is_const) {
                advance("=");
                name.dead = false;
                name.init = true;
                name.expression = expression(0);
            }
            the_statement.names.push(name);
        } else {
            return stop("expected_identifier_a", next_token);
        }
    }());
    semicolon();
    return the_statement;
}

stmt("const", do_var);
stmt("continue", function () {
    var the_continue = token;
    if (functionage.loop < 1 || functionage.finally > 0) {
        warn("unexpected_a", the_continue);
    }
    not_top_level(the_continue);
    the_continue.disrupt = true;
    warn("unexpected_a", the_continue);
    advance(";");
    return the_continue;
});
stmt("debugger", function () {
    var the_debug = token;
    if (!option.devel) {
        warn("unexpected_a", the_debug);
    }
    semicolon();
    return the_debug;
});
stmt("delete", function () {
    var the_token = token;
    var the_value = expression(0);
    if (
        (the_value.id !== "." && the_value.id !== "[")
        || the_value.arity !== "binary"
    ) {
        stop("expected_a_b", the_value, ".", artifact(the_value));
    }
    the_token.expression = the_value;
    semicolon();
    return the_token;
});
stmt("do", function () {
    var the_do = token;
    not_top_level(the_do);
    functionage.loop += 1;
    the_do.block = block();
    advance("while");
    the_do.expression = condition();
    semicolon();
    if (the_do.block.disrupt === true) {
        warn("weird_loop", the_do);
    }
    functionage.loop -= 1;
    return the_do;
});
stmt("export", function () {
    var the_export = token;
    var the_id;
    var the_name;
    var the_thing;

    function export_id() {
        if (!next_token.identifier) {
            stop("expected_identifier_a");
        }
        the_id = next_token.id;
        the_name = global.context[the_id];
        if (the_name === undefined) {
            warn("unexpected_a");
        } else {
            the_name.used += 1;
            if (exports[the_id] !== undefined) {
                warn("duplicate_a");
            }
            exports[the_id] = the_name;
        }
        advance();
        the_export.expression.push(the_thing);
    }

    the_export.expression = [];
    if (next_token.id === "default") {
        if (exports.default !== undefined) {
            warn("duplicate_a");
        }
        advance("default");
        the_thing = expression(0);
        if (
            the_thing.id !== "("
            || the_thing.expression[0].id !== "."
            || the_thing.expression[0].expression.id !== "Object"
            || the_thing.expression[0].name.id !== "freeze"
        ) {
            warn("freeze_exports", the_thing);
        }
        if (next_token.id === ";") {
            semicolon();
        }
        exports.default = the_thing;
        the_export.expression.push(the_thing);
    } else {
        if (next_token.id === "function") {
            warn("freeze_exports");
            the_thing = statement();
            the_name = the_thing.name;
            the_id = the_name.id;
            the_name.used += 1;
            if (exports[the_id] !== undefined) {
                warn("duplicate_a", the_name);
            }
            exports[the_id] = the_thing;
            the_export.expression.push(the_thing);
            the_thing.statement = false;
            the_thing.arity = "unary";
        } else if (
            next_token.id === "var"
            || next_token.id === "let"
            || next_token.id === "const"
        ) {
            warn("unexpected_a", next_token);
            statement();
        } else if (next_token.id === "{") {
            advance("{");
            (function loop() {
                export_id();
                if (next_token.id === ",") {
                    advance(",");
                    return loop();
                }
            }());
            advance("}");
            semicolon();
        } else {
            stop("unexpected_a");
        }
    }
    module_mode = true;
    return the_export;
});
stmt("for", function () {
    var first;
    var the_for = token;
    if (!option.for) {
        warn("unexpected_a", the_for);
    }
    not_top_level(the_for);
    functionage.loop += 1;
    advance("(");
    token.free = true;
    if (next_token.id === ";") {
        return stop("expected_a_b", the_for, "while (", "for (;");
    }
    if (
        next_token.id === "var"
        || next_token.id === "let"
        || next_token.id === "const"
    ) {
        return stop("unexpected_a");
    }
    first = expression(0);
    if (first.id === "in") {
        if (first.expression[0].arity !== "variable") {
            warn("bad_assignment_a", first.expression[0]);
        }
        the_for.name = first.expression[0];
        the_for.expression = first.expression[1];
        warn("expected_a_b", the_for, "Object.keys", "for in");
    } else {
        the_for.initial = first;
        advance(";");
        the_for.expression = expression(0);
        advance(";");
        the_for.inc = expression(0);
        if (the_for.inc.id === "++") {
            warn("expected_a_b", the_for.inc, "+= 1", "++");
        }
    }
    advance(")");
    the_for.block = block();
    if (the_for.block.disrupt === true) {
        warn("weird_loop", the_for);
    }
    functionage.loop -= 1;
    return the_for;
});
stmt("function", do_function);
stmt("if", function () {
    var the_else;
    var the_if = token;
    the_if.expression = condition();
    the_if.block = block();
    if (next_token.id === "else") {
        advance("else");
        the_else = token;
        the_if.else = (
            next_token.id === "if"
            ? statement()
            : block()
        );
        if (the_if.block.disrupt === true) {
            if (the_if.else.disrupt === true) {
                the_if.disrupt = true;
            } else {
                warn("unexpected_a", the_else);
            }
        }
    }
    return the_if;
});
stmt("import", function () {
    var the_import = token;
    var name;
    if (typeof module_mode === "object") {
        warn("unexpected_directive_a", module_mode, module_mode.directive);
    }
    module_mode = true;
    if (next_token.identifier) {
        name = next_token;
        advance();
        if (name.id === "ignore") {
            warn("unexpected_a", name);
        }
        enroll(name, "variable", true);
        the_import.name = name;
    } else {
        var names = [];
        advance("{");
        if (next_token.id !== "}") {
            while (true) {
                if (!next_token.identifier) {
                    stop("expected_identifier_a");
                }
                name = next_token;
                advance();
                if (name.id === "ignore") {
                    warn("unexpected_a", name);
                }
                enroll(name, "variable", true);
                names.push(name);
                if (next_token.id !== ",") {
                    break;
                }
                advance(",");
            }
        }
        advance("}");
        the_import.name = names;
    }
    advance("from");
    advance("(string)");
    the_import.import = token;
    if (!rx_module.test(token.value)) {
        warn("bad_module_name_a", token);
    }
    froms.push(token.value);
    semicolon();
    return the_import;
});
stmt("let", do_var);
stmt("return", function () {
    var the_return = token;
    not_top_level(the_return);
    if (functionage.finally > 0) {
        warn("unexpected_a", the_return);
    }
    the_return.disrupt = true;
    if (next_token.id !== ";" && the_return.line === next_token.line) {
        the_return.expression = expression(10);
    }
    advance(";");
    return the_return;
});
stmt("switch", function () {
    var dups = [];
    var last;
    var stmts;
    var the_cases = [];
    var the_disrupt = true;
    var the_switch = token;
    not_top_level(the_switch);
    if (functionage.finally > 0) {
        warn("unexpected_a", the_switch);
    }
    functionage.switch += 1;
    advance("(");
    token.free = true;
    the_switch.expression = expression(0);
    the_switch.block = the_cases;
    advance(")");
    advance("{");
    (function major() {
        var the_case = next_token;
        the_case.arity = "statement";
        the_case.expression = [];
        (function minor() {
            advance("case");
            token.switch = true;
            var exp = expression(0);
            if (dups.some(function (thing) {
                return are_similar(thing, exp);
            })) {
                warn("unexpected_a", exp);
            }
            dups.push(exp);
            the_case.expression.push(exp);
            advance(":");
            if (next_token.id === "case") {
                return minor();
            }
        }());
        stmts = statements();
        if (stmts.length < 1) {
            warn("expected_statements_a");
            return;
        }
        the_case.block = stmts;
        the_cases.push(the_case);
        last = stmts[stmts.length - 1];
        if (last.disrupt) {
            if (last.id === "break" && last.label === undefined) {
                the_disrupt = false;
            }
        } else {
            warn(
                "expected_a_before_b",
                next_token,
                "break;",
                artifact(next_token)
            );
        }
        if (next_token.id === "case") {
            return major();
        }
    }());
    dups = undefined;
    if (next_token.id === "default") {
        var the_default = next_token;
        advance("default");
        token.switch = true;
        advance(":");
        the_switch.else = statements();
        if (the_switch.else.length < 1) {
            warn("unexpected_a", the_default);
            the_disrupt = false;
        } else {
            var the_last = the_switch.else[the_switch.else.length - 1];
            if (the_last.id === "break" && the_last.label === undefined) {
                warn("unexpected_a", the_last);
                the_last.disrupt = false;
            }
            the_disrupt = the_disrupt && the_last.disrupt;
        }
    } else {
        the_disrupt = false;
    }
    advance("}", the_switch);
    functionage.switch -= 1;
    the_switch.disrupt = the_disrupt;
    return the_switch;
});
stmt("throw", function () {
    var the_throw = token;
    the_throw.disrupt = true;
    the_throw.expression = expression(10);
    semicolon();
    if (functionage.try > 0) {
        warn("unexpected_a", the_throw);
    }
    return the_throw;
});
stmt("try", function () {
    var the_catch;
    var the_disrupt;
    var the_try = token;
    if (functionage.try > 0) {
        warn("unexpected_a", the_try);
    }
    functionage.try += 1;
    the_try.block = block();
    the_disrupt = the_try.block.disrupt;
    if (next_token.id === "catch") {
        var ignored = "ignore";
        the_catch = next_token;
        the_try.catch = the_catch;
        advance("catch");
        if (next_token.id === "(") {
            advance("(");
            if (!next_token.identifier) {
                return stop("expected_identifier_a", next_token);
            }
            if (next_token.id !== "ignore") {
                ignored = undefined;
                the_catch.name = next_token;
                enroll(next_token, "exception", true);
            }
            advance();
            advance(")");
        }
        the_catch.block = block(ignored);
        if (the_catch.block.disrupt !== true) {
            the_disrupt = false;
        }
    } else {
        warn(
            "expected_a_before_b",
            next_token,
            "catch",
            artifact(next_token)
        );
    }
    if (next_token.id === "finally") {
        functionage.finally += 1;
        advance("finally");
        the_try.else = block();
        the_disrupt = the_try.else.disrupt;
        functionage.finally -= 1;
    }
    the_try.disrupt = the_disrupt;
    functionage.try -= 1;
    return the_try;
});
stmt("var", do_var);
stmt("while", function () {
    var the_while = token;
    not_top_level(the_while);
    functionage.loop += 1;
    the_while.expression = condition();
    the_while.block = block();
    if (the_while.block.disrupt === true) {
        warn("weird_loop", the_while);
    }
    functionage.loop -= 1;
    return the_while;
});
stmt("with", function () {
    stop("unexpected_a", token);
});

ternary("?", ":");

// Ambulation of the parse tree.

function action(when) {

// Produce a function that will register task functions that will be called as
// the tree is traversed.

    return function (arity, id, task) {
        var a_set = when[arity];
        var i_set;

// The id parameter is optional. If excluded, the task will be applied to all
// ids.

        if (typeof id !== "string") {
            task = id;
            id = "(all)";
        }

// If this arity has no registrations yet, then create a set object to hold
// them.

        if (a_set === undefined) {
            a_set = empty();
            when[arity] = a_set;
        }

// If this id has no registrations yet, then create a set array to hold them.

        i_set = a_set[id];
        if (i_set === undefined) {
            i_set = [];
            a_set[id] = i_set;
        }

// Register the task with the arity and the id.

        i_set.push(task);
    };
}

function amble(when) {

// Produce a function that will act on the tasks registered by an action
// function while walking the tree.

    return function (the_token) {

// Given a task set that was built by an action function, run all of the
// relevant tasks on the token.

        var a_set = when[the_token.arity];
        var i_set;

// If there are tasks associated with the token's arity...

        if (a_set !== undefined) {

// If there are tasks associated with the token's id...

            i_set = a_set[the_token.id];
            if (i_set !== undefined) {
                i_set.forEach(function (task) {
                    return task(the_token);
                });
            }

// If there are tasks for all ids.

            i_set = a_set["(all)"];
            if (i_set !== undefined) {
                i_set.forEach(function (task) {
                    return task(the_token);
                });
            }
        }
    };
}

var posts = empty();
var pres = empty();
var preaction = action(pres);
var postaction = action(posts);
var preamble = amble(pres);
var postamble = amble(posts);

function walk_expression(thing) {
    if (thing) {
        if (Array.isArray(thing)) {
            thing.forEach(walk_expression);
        } else {
            preamble(thing);
            walk_expression(thing.expression);
            if (thing.id === "function") {
                walk_statement(thing.block);
            }
            if (thing.arity === "pre" || thing.arity === "post") {
                warn("unexpected_a", thing);
            } else if (
                thing.arity === "statement"
                || thing.arity === "assignment"
            ) {
                warn("unexpected_statement_a", thing);
            }
            postamble(thing);
        }
    }
}

function walk_statement(thing) {
    if (thing) {
        if (Array.isArray(thing)) {
            thing.forEach(walk_statement);
        } else {
            preamble(thing);
            walk_expression(thing.expression);
            if (thing.arity === "binary") {
                if (thing.id !== "(") {
                    warn("unexpected_expression_a", thing);
                }
            } else if (
                thing.arity !== "statement"
                && thing.arity !== "assignment"
            ) {
                warn("unexpected_expression_a", thing);
            }
            walk_statement(thing.block);
            walk_statement(thing.else);
            postamble(thing);
        }
    }
}

function lookup(thing) {
    if (thing.arity === "variable") {

// Look up the variable in the current context.

        var the_variable = functionage.context[thing.id];

// If it isn't local, search all the other contexts. If there are name
// collisions, take the most recent.

        if (the_variable === undefined) {
            stack.forEach(function (outer) {
                var a_variable = outer.context[thing.id];
                if (
                    a_variable !== undefined
                    && a_variable.role !== "label"
                ) {
                    the_variable = a_variable;
                }
            });

// If it isn't in any of those either, perhaps it is a predefined global.
// If so, add it to the global context.

            if (the_variable === undefined) {
                if (declared_globals[thing.id] === undefined) {
                    warn("undeclared_a", thing);
                    return;
                }
                the_variable = {
                    dead: false,
                    parent: global,
                    id: thing.id,
                    init: true,
                    role: "variable",
                    used: 0,
                    writable: false
                };
                global.context[thing.id] = the_variable;
            }
            the_variable.closure = true;
            functionage.context[thing.id] = the_variable;
        } else if (the_variable.role === "label") {
            warn("label_a", thing);
        }
        if (
            the_variable.dead
            && (
                the_variable.calls === undefined
                || the_variable.calls[functionage.name.id] === undefined
            )
        ) {
            warn("out_of_scope_a", thing);
        }
        return the_variable;
    }
}

function subactivate(name) {
    name.init = true;
    name.dead = false;
    blockage.live.push(name);
}

function preaction_function(thing) {
    if (thing.arity === "statement" && blockage.body !== true) {
        warn("unexpected_a", thing);
    }
    stack.push(functionage);
    block_stack.push(blockage);
    functionage = thing;
    blockage = thing;
    thing.live = [];
    if (typeof thing.name === "object") {
        thing.name.dead = false;
        thing.name.init = true;
    }
    if (thing.extra === "get") {
        if (thing.parameters.length !== 0) {
            warn("bad_get", thing);
        }
    } else if (thing.extra === "set") {
        if (thing.parameters.length !== 1) {
            warn("bad_set", thing);
        }
    }
    thing.parameters.forEach(function (name) {
        walk_expression(name.expression);
        if (name.id === "{" || name.id === "[") {
            name.names.forEach(subactivate);
        } else {
            name.dead = false;
            name.init = true;
        }
    });
}

function bitwise_check(thing) {
    if (!option.bitwise && bitwiseop[thing.id] === true) {
        warn("unexpected_a", thing);
    }
    if (
        thing.id !== "("
        && thing.id !== "&&"
        && thing.id !== "||"
        && thing.id !== "="
        && Array.isArray(thing.expression)
        && thing.expression.length === 2
        && (
            relationop[thing.expression[0].id] === true
            || relationop[thing.expression[1].id] === true
        )
    ) {
        warn("unexpected_a", thing);
    }
}

function pop_block() {
    blockage.live.forEach(function (name) {
        name.dead = true;
    });
    delete blockage.live;
    blockage = block_stack.pop();
}

function activate(name) {
    name.dead = false;
    if (name.expression !== undefined) {
        walk_expression(name.expression);
        if (name.id === "{" || name.id === "[") {
            name.names.forEach(subactivate);
        } else {
            name.init = true;
        }
    }
    blockage.live.push(name);
}

function action_var(thing) {
    thing.names.forEach(activate);
}

preaction("assignment", bitwise_check);
preaction("binary", bitwise_check);
preaction("binary", function (thing) {
    if (relationop[thing.id] === true) {
        var left = thing.expression[0];
        var right = thing.expression[1];
        if (left.id === "NaN" || right.id === "NaN") {
            warn("number_isNaN", thing);
        } else if (left.id === "typeof") {
            if (right.id !== "(string)") {
                if (right.id !== "typeof") {
                    warn("expected_string_a", right);
                }
            } else {
                var value = right.value;
                if (value === "null" || value === "undefined") {
                    warn("unexpected_typeof_a", right, value);
                } else if (
                    value !== "boolean"
                    && value !== "function"
                    && value !== "number"
                    && value !== "object"
                    && value !== "string"
                    && value !== "symbol"
                ) {
                    warn("expected_type_string_a", right, value);
                }
            }
        }
    }
});
preaction("binary", "==", function (thing) {
    warn("expected_a_b", thing, "===", "==");
});
preaction("binary", "!=", function (thing) {
    warn("expected_a_b", thing, "!==", "!=");
});
preaction("binary", "=>", preaction_function);
preaction("binary", "||", function (thing) {
    thing.expression.forEach(function (thang) {
        if (thang.id === "&&" && !thang.wrapped) {
            warn("and", thang);
        }
    });
});
preaction("binary", "(", function (thing) {
    var left = thing.expression[0];
    if (
        left.identifier
        && functionage.context[left.id] === undefined
        && typeof functionage.name === "object"
    ) {
        var parent = functionage.name.parent;
        if (parent) {
            var left_variable = parent.context[left.id];
            if (
                left_variable !== undefined
                && left_variable.dead
                && left_variable.parent === parent
                && left_variable.calls !== undefined
                && left_variable.calls[functionage.name.id] !== undefined
            ) {
                left_variable.dead = false;
            }
        }
    }
});
preaction("binary", "in", function (thing) {
    warn("infix_in", thing);
});
preaction("binary", "instanceof", function (thing) {
    warn("unexpected_a", thing);
});
preaction("binary", ".", function (thing) {
    if (thing.expression.new) {
        thing.new = true;
    }
});
preaction("statement", "{", function (thing) {
    block_stack.push(blockage);
    blockage = thing;
    thing.live = [];
});
preaction("statement", "for", function (thing) {
    if (thing.name !== undefined) {
        var the_variable = lookup(thing.name);
        if (the_variable !== undefined) {
            the_variable.init = true;
            if (!the_variable.writable) {
                warn("bad_assignment_a", thing.name);
            }
        }
    }
    walk_statement(thing.initial);
});
preaction("statement", "function", preaction_function);
preaction("unary", "~", bitwise_check);
preaction("unary", "function", preaction_function);
preaction("variable", function (thing) {
    var the_variable = lookup(thing);
    if (the_variable !== undefined) {
        thing.variable = the_variable;
        the_variable.used += 1;
    }
});

function init_variable(name) {
    var the_variable = lookup(name);
    if (the_variable !== undefined) {
        if (the_variable.writable) {
            the_variable.init = true;
            return;
        }
    }
    warn("bad_assignment_a", name);
}

postaction("assignment", "+=", function (thing) {
    var right = thing.expression[1];
    if (right.constant) {
        if (
            right.value === ""
            || (right.id === "(number)" && right.value === "0")
            || right.id === "(boolean)"
            || right.id === "null"
            || right.id === "undefined"
            || Number.isNaN(right.value)
        ) {
            warn("unexpected_a", right);
        }
    }
});
postaction("assignment", function (thing) {

// Assignment using = sets the init property of a variable. No other assignment
// operator can do this. A = token keeps that variable (or array of variables
// in case of destructuring) in its name property.

    var lvalue = thing.expression[0];
    if (thing.id === "=") {
        if (thing.names !== undefined) {
            if (Array.isArray(thing.names)) {
                thing.names.forEach(init_variable);
            } else {
                init_variable(thing.names);
            }
        } else {
            if (lvalue.id === "[" || lvalue.id === "{") {
                lvalue.expression.forEach(function (thing) {
                    if (thing.variable) {
                        thing.variable.init = true;
                    }
                });
            } else if (
                lvalue.id === "."
                && thing.expression[1].id === "undefined"
            ) {
                warn(
                    "expected_a_b",
                    lvalue.expression,
                    "delete",
                    "undefined"
                );
            }
        }
    } else {
        if (lvalue.arity === "variable") {
            if (!lvalue.variable || lvalue.variable.writable !== true) {
                warn("bad_assignment_a", lvalue);
            }
        }
        var right = syntax[thing.expression[1].id];
        if (
            right !== undefined
            && (
                right.id === "function"
                || right.id === "=>"
                || (
                    right.constant
                    && right.id !== "(number)"
                    && (right.id !== "(string)" || thing.id !== "+=")
                )
            )
        ) {
            warn("unexpected_a", thing.expression[1]);
        }
    }
});

function postaction_function(thing) {
    delete functionage.finally;
    delete functionage.loop;
    delete functionage.switch;
    delete functionage.try;
    functionage = stack.pop();
    if (thing.wrapped) {
        warn("unexpected_parens", thing);
    }
    return pop_block();
}

postaction("binary", function (thing) {
    var right;
    if (relationop[thing.id]) {
        if (
            is_weird(thing.expression[0])
            || is_weird(thing.expression[1])
            || are_similar(thing.expression[0], thing.expression[1])
            || (
                thing.expression[0].constant === true
                && thing.expression[1].constant === true
            )
        ) {
            warn("weird_relation_a", thing);
        }
    }
    if (thing.id === "+") {
        if (!option.convert) {
            if (thing.expression[0].value === "") {
                warn("expected_a_b", thing, "String(...)", "\"\" +");
            } else if (thing.expression[1].value === "") {
                warn("expected_a_b", thing, "String(...)", "+ \"\"");
            }
        }
    } else if (thing.id === "[") {
        if (thing.expression[0].id === "window") {
            warn("weird_expression_a", thing, "window[...]");
        }
        if (thing.expression[0].id === "self") {
            warn("weird_expression_a", thing, "self[...]");
        }
    } else if (thing.id === "." || thing.id === "?.") {
        if (thing.expression.id === "RegExp") {
            warn("weird_expression_a", thing);
        }
    } else if (thing.id !== "=>" && thing.id !== "(") {
        right = thing.expression[1];
        if (
            (thing.id === "+" || thing.id === "-")
            && right.id === thing.id
            && right.arity === "unary"
            && !right.wrapped
        ) {
            warn("wrap_unary", right);
        }
        if (
            thing.expression[0].constant === true
            && right.constant === true
        ) {
            thing.constant = true;
        }
    }
});
postaction("binary", "&&", function (thing) {
    if (
        is_weird(thing.expression[0])
        || are_similar(thing.expression[0], thing.expression[1])
        || thing.expression[0].constant === true
        || thing.expression[1].constant === true
    ) {
        warn("weird_condition_a", thing);
    }
});
postaction("binary", "||", function (thing) {
    if (
        is_weird(thing.expression[0])
        || are_similar(thing.expression[0], thing.expression[1])
        || thing.expression[0].constant === true
    ) {
        warn("weird_condition_a", thing);
    }
});
postaction("binary", "=>", postaction_function);
postaction("binary", "(", function (thing) {
    var left = thing.expression[0];
    var arg;
    var the_new;
    if (left.id === "new") {
        the_new = left;
        left = left.expression;
    }
    if (left.id === "function") {
        if (!thing.wrapped) {
            warn("wrap_immediate", thing);
        }
    } else if (left.identifier) {
        if (the_new !== undefined) {
            if (
                left.id[0] > "Z"
                || left.id === "Boolean"
                || left.id === "Number"
                || left.id === "String"
                || left.id === "Symbol"
            ) {
                warn("unexpected_a", the_new);
            } else if (left.id === "Function") {
                if (!option.eval) {
                    warn("unexpected_a", left, "new Function");
                }
            } else if (left.id === "Array") {
                arg = thing.expression;
                if (arg.length !== 2 || arg[1].id === "(string)") {
                    warn("expected_a_b", left, "[]", "new Array");
                }
            } else if (left.id === "Object") {
                warn(
                    "expected_a_b",
                    left,
                    "Object.create(null)",
                    "new Object"
                );
            }
        } else {
            if (
                left.id[0] >= "A"
                && left.id[0] <= "Z"
                && left.id !== "Boolean"
                && left.id !== "Number"
                && left.id !== "String"
                && left.id !== "Symbol"
            ) {
                warn(
                    "expected_a_before_b",
                    left,
                    "new",
                    artifact(left)
                );
            }
        }
    } else if (left.id === ".") {
        var cack = the_new !== undefined;
        if (left.expression.id === "Date" && left.name.id === "UTC") {
            cack = !cack;
        }
        if (rx_cap.test(left.name.id) !== cack) {
            if (the_new !== undefined) {
                warn("unexpected_a", the_new);
            } else {
                warn(
                    "expected_a_before_b",
                    left.expression,
                    "new",
                    left.name.id
                );
            }
        }
        if (left.name.id === "getTime") {
            var paren = left.expression;
            if (paren.id === "(") {
                var array = paren.expression;
                if (array.length === 1) {
                    var new_date = array[0];
                    if (
                        new_date.id === "new"
                        && new_date.expression.id === "Date"
                    ) {
                        warn(
                            "expected_a_b",
                            new_date,
                            "Date.now()",
                            "new Date().getTime()"
                        );
                    }
                }
            }
        }
    }
});
postaction("binary", "[", function (thing) {
    if (thing.expression[0].id === "RegExp") {
        warn("weird_expression_a", thing);
    }
    if (is_weird(thing.expression[1])) {
        warn("weird_expression_a", thing.expression[1]);
    }
});
postaction("statement", "{", pop_block);
postaction("statement", "const", action_var);
postaction("statement", "export", top_level_only);
postaction("statement", "for", function (thing) {
    walk_statement(thing.inc);
});
postaction("statement", "function", postaction_function);
postaction("statement", "import", function (the_thing) {
    var name = the_thing.name;
    if (Array.isArray(name)) {
        name.forEach(function (name) {
            name.dead = false;
            name.init = true;
            blockage.live.push(name);
        });
    } else {
        name.dead = false;
        name.init = true;
        blockage.live.push(name);
    }
    return top_level_only(the_thing);
});
postaction("statement", "let", action_var);
postaction("statement", "try", function (thing) {
    if (thing.catch !== undefined) {
        var the_name = thing.catch.name;
        if (the_name !== undefined) {
            var the_variable = functionage.context[the_name.id];
            the_variable.dead = false;
            the_variable.init = true;
        }
        walk_statement(thing.catch.block);
    }
});
postaction("statement", "var", action_var);
postaction("ternary", function (thing) {
    if (
        is_weird(thing.expression[0])
        || thing.expression[0].constant === true
        || are_similar(thing.expression[1], thing.expression[2])
    ) {
        warn("unexpected_a", thing);
    } else if (are_similar(thing.expression[0], thing.expression[1])) {
        warn("expected_a_b", thing, "||", "?");
    } else if (are_similar(thing.expression[0], thing.expression[2])) {
        warn("expected_a_b", thing, "&&", "?");
    } else if (
        thing.expression[1].id === "true"
        && thing.expression[2].id === "false"
    ) {
        warn("expected_a_b", thing, "!!", "?");
    } else if (
        thing.expression[1].id === "false"
        && thing.expression[2].id === "true"
    ) {
        warn("expected_a_b", thing, "!", "?");
    } else if (
        thing.expression[0].wrapped !== true
        && (
            thing.expression[0].id === "||"
            || thing.expression[0].id === "&&"
        )
    ) {
        warn("wrap_condition", thing.expression[0]);
    }
});
postaction("unary", function (thing) {
    if (thing.id === "`") {
        if (thing.expression.every(function (thing) {
            return thing.constant;
        })) {
            thing.constant = true;
        }
    } else if (thing.id === "!") {
        if (thing.expression.constant === true) {
            warn("unexpected_a", thing);
        }
    } else if (thing.id === "!!") {
        if (!option.convert) {
            warn("expected_a_b", thing, "Boolean(...)", "!!");
        }
    } else if (
        thing.id !== "["
        && thing.id !== "{"
        && thing.id !== "function"
        && thing.id !== "new"
    ) {
        if (thing.expression.constant === true) {
            thing.constant = true;
        }
    }
});
postaction("unary", "function", postaction_function);
postaction("unary", "+", function (thing) {
    if (!option.convert) {
        warn("expected_a_b", thing, "Number(...)", "+");
    }
    var right = thing.expression;
    if (right.id === "(" && right.expression[0].id === "new") {
        warn("unexpected_a_before_b", thing, "+", "new");
    } else if (
        right.constant
        || right.id === "{"
        || (right.id === "[" && right.arity !== "binary")
    ) {
        warn("unexpected_a", thing, "+");
    }
});

function delve(the_function) {
    Object.keys(the_function.context).forEach(function (id) {
        if (id !== "ignore") {
            var name = the_function.context[id];
            if (name.parent === the_function) {
                if (
                    name.used === 0
                    && (
                        name.role !== "function"
                        || name.parent.arity !== "unary"
                    )
                ) {
                    warn("unused_a", name);
                } else if (!name.init) {
                    warn("uninitialized_a", name);
                }
            }
        }
    });
}

function uninitialized_and_unused() {

// Delve into the functions looking for variables that were not initialized
// or used. If the file imports or exports, then its global object is also
// delved.

    if (module_mode === true || option.node) {
        delve(global);
    }
    functions.forEach(delve);
}

// Go through the token list, looking at usage of whitespace.

function whitage() {
    var closer = "(end)";
    var free = false;
    var left = global;
    var margin = 0;
    var nr_comments_skipped = 0;
    var open = true;
    var opening = true;
    var right;

    function pop() {
        var previous = stack.pop();
        closer = previous.closer;
        free = previous.free;
        margin = previous.margin;
        open = previous.open;
        opening = previous.opening;
    }

    function push() {
        stack.push({
            closer,
            free,
            margin,
            open,
            opening
        });
    }

    function expected_at(at) {
        warn(
            "expected_a_at_b_c",
            right,
            artifact(right),
            fudge + at,
            artifact_column(right)
        );
    }

    function at_margin(fit) {
        var at = margin + fit;
        // jslint-hack - expected_at
        if (right.from !== at) {
            return expected_at(at);
        }
    }

    function no_space_only() {
        if (
            left.id !== "(global)"
            && left.nr + 1 === right.nr
            && (
                left.line !== right.line
                || left.thru !== right.from
            )
        ) {
            warn(
                "unexpected_space_a_b",
                right,
                artifact(left),
                artifact(right)
            );
        }
    }

    function no_space() {
        if (left.line === right.line) {
            if (left.thru !== right.from && nr_comments_skipped === 0) {
                warn(
                    "unexpected_space_a_b",
                    right,
                    artifact(left),
                    artifact(right)
                );
            }
        } else {
            if (open) {
                var at = (
                    free
                    ? margin
                    : margin + 8
                );
                // jslint-hack - expected_at
                if (right.from !== at) {
                    expected_at(at);
                }
            } else {
                // jslint-hack - expected_at
                if (right.from !== margin + 8) {
                    expected_at(margin + 8);
                }
            }
        }
    }

    function one_space_only() {
        if (left.line !== right.line || left.thru + 1 !== right.from) {
            warn(
                "expected_space_a_b",
                right,
                artifact(left),
                artifact(right)
            );
        }
    }

    function one_space() {
        if (left.line === right.line || !open) {
            if (left.thru + 1 !== right.from && nr_comments_skipped === 0) {
                warn(
                    "expected_space_a_b",
                    right,
                    artifact(left),
                    artifact(right)
                );
            }
        } else {
            // jslint-hack - expected_at
            if (right.from !== margin) {
                expected_at(margin);
            }
        }
    }

    stack = [];
    tokens.forEach(function (the_token) {
        right = the_token;
        if (right.id === "(comment)" || right.id === "(end)") {
            nr_comments_skipped += 1;
        } else {

// If left is an opener and right is not the closer, then push the previous
// state. If the token following the opener is on the next line, then this is
// an open form. If the tokens are on the same line, then it is a closed form.
// Open form is more readable, with each item (statement, argument, parameter,
// etc) starting on its own line. Closed form is more compact. Statement blocks
// are always in open form.

            var new_closer = opener[left.id];
            if (typeof new_closer === "string") {
                if (new_closer !== right.id) {
                    opening = left.open || (left.line !== right.line);
                    push();
                    closer = new_closer;
                    if (opening) {
                        free = closer === ")" && left.free;
                        open = true;
                        // jslint-hack - conditional-margin
                        if (
                            !option.utility2
                            || lines[right.line].startsWith(" ")
                        ) {
                            margin += 4;
                        }
                        if (right.role === "label") {
                            // jslint-hack - expected_at
                            if (right.from !== 0) {
                                expected_at(0);
                            }
                        } else if (right.switch) {
                            at_margin(-4);
                        } else {
                            at_margin(0);
                        }
                    } else {
                        if (right.statement || right.role === "label") {
                            warn(
                                "expected_line_break_a_b",
                                right,
                                artifact(left),
                                artifact(right)
                            );
                        }
                        free = false;
                        open = false;
                        no_space_only();
                    }
                } else {

// If left and right are opener and closer, then the placement of right depends
// on the openness. Illegal pairs (like '{]') have already been detected.

                    if (left.line === right.line) {
                        no_space();
                    } else {
                        at_margin(0);
                    }
                }
            } else {
                if (right.statement === true) {
                    if (left.id === "else") {
                        one_space_only();
                    } else {
                        at_margin(0);
                        open = false;
                    }

// If right is a closer, then pop the previous state.
                } else if (right.id === closer) {
                    pop();
                    if (opening && right.id !== ";") {
                        at_margin(0);
                    } else {
                        no_space_only();
                    }
                } else {

// Left is not an opener, and right is not a closer.
// The nature of left and right will determine the space between them.

// If left is ',' or ';' or right is a statement then if open,
// right must go at the margin, or if closed, a space between.

                    if (right.switch) {
                        at_margin(-4);
                    } else if (right.role === "label") {
                        // jslint-hack - expected_at
                        if (right.from !== 0) {
                            expected_at(0);
                        }
                    } else if (left.id === ",") {
                        if (!open || (
                            (free || closer === "]")
                            && left.line === right.line
                        )) {
                            one_space();
                        } else {
                            at_margin(0);
                        }

// If right is a ternary operator, line it up on the margin.
                    } else if (right.arity === "ternary") {
                        if (open) {
                            at_margin(0);
                        } else {
                            warn("use_open", right);
                        }
                    } else if (
                        right.arity === "binary"
                        && right.id === "("
                        && free
                    ) {
                        no_space();
                    } else if (
                        left.id === "."
                        || left.id === "?."
                        || left.id === "..."
                        || right.id === ","
                        || right.id === ";"
                        || right.id === ":"
                        || (
                            right.arity === "binary"
                            && (right.id === "(" || right.id === "[")
                        )
                        || (
                            right.arity === "function"
                            && left.id !== "function"
                        )
                    ) {
                        no_space_only();
                    } else if (right.id === "." || right.id === "?.") {
                        // jslint-hack - method-chain
                        // https://github.com/douglascrockford/JSLint/commit/752c82d860ac14d35d492dc5c6ad0a0ed8227e76#diff-01d3d81a6eb6d82af3c377b55dc4fa28L4692
                        if (left.line === right.line) {
                            no_space();
                        } else {
                            at_margin(0);
                        }
                    } else if (left.id === ";") {
                        if (open) {
                            at_margin(0);
                        } else {
                            one_space();
                        }
                    } else if (
                        left.arity === "ternary"
                        || left.id === "case"
                        || left.id === "catch"
                        || left.id === "else"
                        || left.id === "finally"
                        || left.id === "while"
                        || right.id === "catch"
                        || right.id === "else"
                        || right.id === "finally"
                        || (right.id === "while" && !right.statement)
                        || (left.id === ")" && right.id === "{")
                    ) {
                        one_space_only();
                    } else if (
                        left.id === "var"
                        || left.id === "const"
                        || left.id === "let"
                    ) {
                        push();
                        closer = ";";
                        free = false;
                        open = left.open;
                        if (open) {
                            margin = margin + 4;
                            at_margin(0);
                        } else {
                            one_space_only();
                        }
                    } else if (

// There is a space between left and right.

                        spaceop[left.id] === true
                        || spaceop[right.id] === true
                        || (
                            left.arity === "binary"
                            && (left.id === "+" || left.id === "-")
                        )
                        || (
                            right.arity === "binary"
                            && (right.id === "+" || right.id === "-")
                        )
                        || left.id === "function"
                        || left.id === ":"
                        || ((
                            left.identifier
                            || left.id === "(string)"
                            || left.id === "(number)"
                        ) && (
                            right.identifier
                            || right.id === "(string)"
                            || right.id === "(number)"
                        ))
                        || (left.arity === "statement" && right.id !== ";")
                    ) {
                        one_space();
                    } else if (left.arity === "unary" && left.id !== "`") {
                        no_space_only();
                    }
                }
            }
            nr_comments_skipped = 0;
            delete left.calls;
            delete left.dead;
            delete left.free;
            delete left.init;
            delete left.open;
            delete left.used;
            left = right;
        }
    });
}

// The jslint function itself.

export default Object.freeze(function jslint(
    source = "",
    option_object = empty(),
    global_array = []
) {
    try {
        warnings = [];
        option = Object.assign(empty(), option_object);
        anon = "anonymous";
        block_stack = [];
        declared_globals = empty();
        directive_mode = true;
        directives = [];
        // jslint-hack - early_stop = false
        early_stop = false;
        exports = empty();
        froms = [];
        fudge = (
            option.fudge
            ? 1
            : 0
        );
        functions = [];
        global = {
            id: "(global)",
            body: true,
            context: empty(),
            from: 0,
            level: 0,
            line: 0,
            live: [],
            loop: 0,
            switch: 0,
            thru: 0
        };
        blockage = global;
        functionage = global;
        json_mode = false;
        mega_mode = false;
        module_mode = false;
        next_token = global;
        property = empty();
        shebang = false;
        stack = [];
        tenure = undefined;
        token = global;
        token_nr = 0;
        var_mode = undefined;
        populate(standard, declared_globals, false);
        populate(global_array, declared_globals, false);
        Object.keys(option).forEach(function (name) {
            if (option[name] === true) {
                var allowed = allowed_option[name];
                if (Array.isArray(allowed)) {
                    populate(allowed, declared_globals, false);
                }
            }
        });
        tokenize(source);
        advance();
        if (json_mode) {
            tree = json_value();
            advance("(end)");
        } else {

// Because browsers encourage combining of script files, the first token might
// be a semicolon to defend against a missing semicolon in the preceding file.

            if (option.browser) {
                if (next_token.id === ";") {
                    advance(";");
                }
            } else {

// If we are not in a browser, then the file form of strict pragma may be used.

                if (
                    next_token.value === "use strict"
                ) {
                    advance("(string)");
                    advance(";");
                }
            }
            tree = statements();
            advance("(end)");
            functionage = global;
            walk_statement(tree);
            // jslint-hack - !early_stop
            if (!early_stop) {
                uninitialized_and_unused();
                if (!option.white) {
                    whitage();
                }
            }
        }
        if (!option.browser) {
            directives.forEach(function (comment) {
                if (comment.directive === "global") {
                    warn("missing_browser", comment);
                }
            });
        }
        early_stop = false;
    } catch (e) {
        // jslint-hack - e.early_stop = true
        e.early_stop = true;
        if (e.name !== "JSLintError") {
            warnings.push(e);
        }
    }
    return {
        directives,
        edition: "2019-01-31",
        exports,
        froms,
        functions,
        global,
        id: "(JSLint)",
        json: json_mode,
        lines,
        module: module_mode === true,
        ok: warnings.length === 0 && !early_stop,
        option,
        property,
        shebang: (
            shebang
            ? lines[0]
            : undefined
        ),
        stop: early_stop,
        tokens,
        tree,
        warnings: warnings.sort(function (a, b) {
            return a.line - b.line || a.column - b.column;
        })
    };
});



/*
file none
*/
