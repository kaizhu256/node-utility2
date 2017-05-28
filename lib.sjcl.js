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



/* jslint-ignore-begin */
// init lib sjcl
// 2016-09-10T10:34:50Z
// https://github.com/bitwiseshiftleft/sjcl/blob/1.0.6/sjcl.js
// utility2-uglify https://raw.githubusercontent.com/bitwiseshiftleft/sjcl/1.0.6/sjcl.js
(function () { var module;
"use strict";function t(e,t,n){if(4!==t.length)throw new sjcl.exception.invalid("invalid aes block size"
);var r=e.b[n],i=t[0]^r[0],s=t[n?3:1]^r[1],o=t[2]^r[2];t=t[n?1:3]^r[3];var u,a,f
,l=r.length/4-2,c,h=4,p=[0,0,0,0];u=e.s[n],e=u[0];var d=u[1],v=u[2],m=u[3],g=u[4
];for(c=0;c<l;c++)u=e[i>>>24]^d[s>>16&255]^v[o>>8&255]^m[t&255]^r[h],a=e[s>>>24]^
d[o>>16&255]^v[t>>8&255]^m[i&255]^r[h+1],f=e[o>>>24]^d[t>>16&255]^v[i>>8&255]^m[
s&255]^r[h+2],t=e[t>>>24]^d[i>>16&255]^v[s>>8&255]^m[o&255]^r[h+3],h+=4,i=u,s=a,
o=f;for(c=0;4>c;c++)p[n?3&-c:c]=g[i>>>24]<<24^g[s>>16&255]<<16^g[o>>8&255]<<8^g[
t&255]^r[h++],u=i,i=s,s=o,o=t,t=u;return p}function u(e,t){var n,r,i,s=e.F,o=e.b
,u=s[0],a=s[1],f=s[2],l=s[3],c=s[4],h=s[5],p=s[6],d=s[7];for(n=0;64>n;n++)16>n?r=
t[n]:(r=t[n+1&15],i=t[n+14&15],r=t[n&15]=(r>>>7^r>>>18^r>>>3^r<<25^r<<14)+(i>>>17^
i>>>19^i>>>10^i<<15^i<<13)+t[n&15]+t[n+9&15]|0),r=r+d+(c>>>6^c>>>11^c>>>25^c<<26^
c<<21^c<<7)+(p^c&(h^p))+o[n],d=p,p=h,h=c,c=l+r|0,l=f,f=a,a=u,u=r+(a&f^l&(a^f))+(
a>>>2^a>>>13^a>>>22^a<<30^a<<19^a<<10)|0;s[0]=s[0]+u|0,s[1]=s[1]+a|0,s[2]=s[2]+f|0
,s[3]=s[3]+l|0,s[4]=s[4]+c|0,s[5]=s[5]+h|0,s[6]=s[6]+p|0,s[7]=s[7]+d|0}function A
(e,t){var n,r=sjcl.random.K[e],i=[];for(n in r)r.hasOwnProperty(n)&&i.push(r[n])
;for(n=0;n<i.length;n++)i[n](t)}function C(e,t){"undefined"!=typeof window&&window
.performance&&"function"==typeof window.performance.now?e.addEntropy(window.performance
.now(),t,"loadtime"):e.addEntropy((new Date).valueOf(),t,"loadtime")}function y(
e){e.b=z(e).concat(z(e)),e.L=new sjcl.cipher.aes(e.b)}function z(e){for(var t=0;4>
t&&(e.h[t]=e.h[t]+1|0,!e.h[t]);t++);return e.L.encrypt(e.h)}function B(e,t){return function(
){t.apply(e,arguments)}}var sjcl={cipher:{},hash:{},keyexchange:{},mode:{},misc:
{},codec:{},exception:{corrupt:function(e){this.toString=function(){return"CORRUPT: "+
this.message},this.message=e},invalid:function(e){this.toString=function(){return"INVALID: "+
this.message},this.message=e},bug:function(e){this.toString=function(){return"BUG: "+
this.message},this.message=e},notReady:function(e){this.toString=function(){return"NOT READY: "+
this.message},this.message=e}}};sjcl.cipher.aes=function(e){this.s[0][0][0]||this
.O();var t,n,r,i,s=this.s[0][4],o=this.s[1];t=e.length;var u=1;if(4!==t&&6!==t&&8!==
t)throw new sjcl.exception.invalid("invalid aes key size");this.b=[r=e.slice(0),
i=[]];for(e=t;e<4*t+28;e++){n=r[e-1];if(0===e%t||8===t&&4===e%t)n=s[n>>>24]<<24^
s[n>>16&255]<<16^s[n>>8&255]<<8^s[n&255],0===e%t&&(n=n<<8^n>>>24^u<<24,u=u<<1^283*
(u>>7));r[e]=r[e-t]^n}for(t=0;e;t++,e--)n=r[t&3?e:e-4],i[t]=4>=e||4>t?n:o[0][s[n>>>24
]]^o[1][s[n>>16&255]]^o[2][s[n>>8&255]]^o[3][s[n&255]]},sjcl.cipher.aes.prototype=
{encrypt:function(e){return t(this,e,0)},decrypt:function(e){return t(this,e,1)}
,s:[[[],[],[],[],[]],[[],[],[],[],[]]],O:function(){var e=this.s[0],t=this.s[1],
n=e[4],r=t[4],i,s,o,u=[],a=[],f,l,c,h;for(i=0;256>i;i++)a[(u[i]=i<<1^283*(i>>7))^
i]=i;for(s=o=0;!n[s];s^=f||1,o=a[o]||1)for(c=o^o<<1^o<<2^o<<3^o<<4,c=c>>8^c&255^99
,n[s]=c,r[c]=s,l=u[i=u[f=u[s]]],h=16843009*l^65537*i^257*f^16843008*s,l=257*u[c]^16843008*
c,i=0;4>i;i++)e[i][s]=l=l<<24^l>>>8,t[i][c]=h=h<<24^h>>>8;for(i=0;5>i;i++)e[i]=e
[i].slice(0),t[i]=t[i].slice(0)}},sjcl.bitArray={bitSlice:function(e,t,n){return e=
sjcl.bitArray.$(e.slice(t/32),32-(t&31)).slice(1),void 0===n?e:sjcl.bitArray.clamp
(e,n-t)},extract:function(e,t,n){var r=Math.floor(-t-n&31);return((t+n-1^t)&-32?
e[t/32|0]<<32-r^e[t/32+1|0]>>>r:e[t/32|0]>>>r)&(1<<n)-1},concat:function(e,t){if(0===
e.length||0===t.length)return e.concat(t);var n=e[e.length-1],r=sjcl.bitArray.getPartial
(n);return 32===r?e.concat(t):sjcl.bitArray.$(t,r,n|0,e.slice(0,e.length-1))},bitLength
:function(e){var t=e.length;return 0===t?0:32*(t-1)+sjcl.bitArray.getPartial(e[t-1
])},clamp:function(e,t){if(32*e.length<t)return e;e=e.slice(0,Math.ceil(t/32));var n=
e.length;return t&=31,0<n&&t&&(e[n-1]=sjcl.bitArray.partial(t,e[n-1]&2147483648>>
t-1,1)),e},partial:function(e,t,n){return 32===e?t:(n?t|0:t<<32-e)+1099511627776*
e},getPartial:function(e){return Math.round(e/1099511627776)||32},equal:function(
e,t){if(sjcl.bitArray.bitLength(e)!==sjcl.bitArray.bitLength(t))return!1;var n=0
,r;for(r=0;r<e.length;r++)n|=e[r]^t[r];return 0===n},$:function(e,t,n,r){var i;i=0
;for(void 0===r&&(r=[]);32<=t;t-=32)r.push(n),n=0;if(0===t)return r.concat(e);for(
i=0;i<e.length;i++)r.push(n|e[i]>>>t),n=e[i]<<32-t;return i=e.length?e[e.length-1
]:0,e=sjcl.bitArray.getPartial(i),r.push(sjcl.bitArray.partial(t+e&31,32<t+e?n:r
.pop(),1)),r},i:function(e,t){return[e[0]^t[0],e[1]^t[1],e[2]^t[2],e[3]^t[3]]},byteswapM
:function(e){var t,n;for(t=0;t<e.length;++t)n=e[t],e[t]=n>>>24|n>>>8&65280|(n&65280
)<<8|n<<24;return e}},sjcl.codec.utf8String={fromBits:function(e){var t="",n=sjcl
.bitArray.bitLength(e),r,i;for(r=0;r<n/8;r++)0===(r&3)&&(i=e[r/4]),t+=String.fromCharCode
(i>>>24),i<<=8;return decodeURIComponent(escape(t))},toBits:function(e){e=unescape
(encodeURIComponent(e));var t=[],n,r=0;for(n=0;n<e.length;n++)r=r<<8|e.charCodeAt
(n),3===(n&3)&&(t.push(r),r=0);return n&3&&t.push(sjcl.bitArray.partial(8*(n&3),
r)),t}},sjcl.codec.hex={fromBits:function(e){var t="",n;for(n=0;n<e.length;n++)t+=
((e[n]|0)+0xf00000000000).toString(16).substr(4);return t.substr(0,sjcl.bitArray
.bitLength(e)/4)},toBits:function(e){var t,n=[],r;e=e.replace(/\s|0x/g,""),r=e.length
,e+="00000000";for(t=0;t<e.length;t+=8)n.push(parseInt(e.substr(t,8),16)^0);return sjcl
.bitArray.clamp(n,4*r)}},sjcl.codec.base32={B:"ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
,X:"0123456789ABCDEFGHIJKLMNOPQRSTUV",BITS:32,BASE:5,REMAINING:27,fromBits:function(
e,t,n){var r=sjcl.codec.base32.BASE,i=sjcl.codec.base32.REMAINING,s="",o=0,u=sjcl
.codec.base32.B,a=0,f=sjcl.bitArray.bitLength(e);n&&(u=sjcl.codec.base32.X);for(
n=0;s.length*r<f;)s+=u.charAt((a^e[n]>>>o)>>>i),o<r?(a=e[n]<<r-o,o+=i,n++):(a<<=
r,o-=r);for(;s.length&7&&!t;)s+="=";return s},toBits:function(e,t){e=e.replace(/\s|=/g
,"").toUpperCase();var n=sjcl.codec.base32.BITS,r=sjcl.codec.base32.BASE,i=sjcl.
codec.base32.REMAINING,s=[],o,u=0,a=sjcl.codec.base32.B,f=0,l,c="base32";t&&(a=sjcl
.codec.base32.X,c="base32hex");for(o=0;o<e.length;o++){l=a.indexOf(e.charAt(o));
if(0>l){if(!t)try{return sjcl.codec.base32hex.toBits(e)}catch(h){}throw new sjcl
.exception.invalid("this isn't "+c+"!")}u>i?(u-=i,s.push(f^l>>>u),f=l<<n-u):(u+=
r,f^=l<<n-u)}return u&56&&s.push(sjcl.bitArray.partial(u&56,f,1)),s}},sjcl.codec
.base32hex={fromBits:function(e,t){return sjcl.codec.base32.fromBits(e,t,1)},toBits
:function(e){return sjcl.codec.base32.toBits(e,1)}},sjcl.codec.base64={B:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
,fromBits:function(e,t,n){var r="",i=0,s=sjcl.codec.base64.B,o=0,u=sjcl.bitArray
.bitLength(e);n&&(s=s.substr(0,62)+"-_");for(n=0;6*r.length<u;)r+=s.charAt((o^e[
n]>>>i)>>>26),6>i?(o=e[n]<<6-i,i+=26,n++):(o<<=6,i-=6);for(;r.length&3&&!t;)r+="="
;return r},toBits:function(e,t){e=e.replace(/\s|=/g,"");var n=[],r,i=0,s=sjcl.codec
.base64.B,o=0,u;t&&(s=s.substr(0,62)+"-_");for(r=0;r<e.length;r++){u=s.indexOf(e
.charAt(r));if(0>u)throw new sjcl.exception.invalid("this isn't base64!");26<i?(
i-=26,n.push(o^u>>>i),o=u<<32-i):(i+=6,o^=u<<32-i)}return i&56&&n.push(sjcl.bitArray
.partial(i&56,o,1)),n}},sjcl.codec.base64url={fromBits:function(e){return sjcl.codec
.base64.fromBits(e,1,1)},toBits:function(e){return sjcl.codec.base64.toBits(e,1)
}},sjcl.hash.sha256=function(e){this.b[0]||this.O(),e?(this.F=e.F.slice(0),this.
A=e.A.slice(0),this.l=e.l):this.reset()},sjcl.hash.sha256.hash=function(e){return(new
sjcl.hash.sha256).update(e).finalize()},sjcl.hash.sha256.prototype={blockSize:512
,reset:function(){return this.F=this.Y.slice(0),this.A=[],this.l=0,this},update:
function(e){"string"==typeof e&&(e=sjcl.codec.utf8String.toBits(e));var t,n=this
.A=sjcl.bitArray.concat(this.A,e);t=this.l,e=this.l=t+sjcl.bitArray.bitLength(e)
;if(9007199254740991<e)throw new sjcl.exception.invalid("Cannot hash more than 2^53 - 1 bits"
);if("undefined"!=typeof Uint32Array){var r=new Uint32Array(n),i=0;for(t=512+t-(512+
t&511);t<=e;t+=512)u(this,r.subarray(16*i,16*(i+1))),i+=1;n.splice(0,16*i)}else for(
t=512+t-(512+t&511);t<=e;t+=512)u(this,n.splice(0,16));return this},finalize:function(
){var e,t=this.A,n=this.F,t=sjcl.bitArray.concat(t,[sjcl.bitArray.partial(1,1)])
;for(e=t.length+2;e&15;e++)t.push(0);t.push(Math.floor(this.l/4294967296));for(t
.push(this.l|0);t.length;)u(this,t.splice(0,16));return this.reset(),n},Y:[],b:[
],O:function(){function e(e){return 4294967296*(e-Math.floor(e))|0}for(var t=0,n=2
,r,i;64>t;n++){i=!0;for(r=2;r*r<=n;r++)if(0===n%r){i=!1;break}i&&(8>t&&(this.Y[t
]=e(Math.pow(n,.5))),this.b[t]=e(Math.pow(n,1/3)),t++)}}},sjcl.mode.ccm={name:"ccm"
,G:[],listenProgress:function(e){sjcl.mode.ccm.G.push(e)},unListenProgress:function(
e){e=sjcl.mode.ccm.G.indexOf(e),-1<e&&sjcl.mode.ccm.G.splice(e,1)},fa:function(e
){var t=sjcl.mode.ccm.G.slice(),n;for(n=0;n<t.length;n+=1)t[n](e)},encrypt:function(
e,t,n,r,i){var s,o=t.slice(0),u=sjcl.bitArray,a=u.bitLength(n)/8,f=u.bitLength(o
)/8;i=i||64,r=r||[];if(7>a)throw new sjcl.exception.invalid("ccm: iv must be at least 7 bytes"
);for(s=2;4>s&&f>>>8*s;s++);return s<15-a&&(s=15-a),n=u.clamp(n,8*(15-s)),t=sjcl
.mode.ccm.V(e,t,n,r,i,s),o=sjcl.mode.ccm.C(e,o,n,t,i,s),u.concat(o.data,o.tag)},
decrypt:function(e,t,n,r,i){i=i||64,r=r||[];var s=sjcl.bitArray,o=s.bitLength(n)/8
,u=s.bitLength(t),a=s.clamp(t,u-i),f=s.bitSlice(t,u-i),u=(u-i)/8;if(7>o)throw new
sjcl.exception.invalid("ccm: iv must be at least 7 bytes");for(t=2;4>t&&u>>>8*t;
t++);t<15-o&&(t=15-o),n=s.clamp(n,8*(15-t)),a=sjcl.mode.ccm.C(e,a,n,f,i,t),e=sjcl
.mode.ccm.V(e,a.data,n,r,i,t);if(!s.equal(a.tag,e))throw new sjcl.exception.corrupt
("ccm: tag doesn't match");return a.data},na:function(e,t,n,r,i,s){var o=[],u=sjcl
.bitArray,a=u.i;r=[u.partial(8,(t.length?64:0)|r-2<<2|s-1)],r=u.concat(r,n),r[3]|=
i,r=e.encrypt(r);if(t.length)for(n=u.bitLength(t)/8,65279>=n?o=[u.partial(16,n)]
:4294967295>=n&&(o=u.concat([u.partial(16,65534)],[n])),o=u.concat(o,t),t=0;t<o.
length;t+=4)r=e.encrypt(a(r,o.slice(t,t+4).concat([0,0,0])));return r},V:function(
e,t,n,r,i,s){var o=sjcl.bitArray,u=o.i;i/=8;if(i%2||4>i||16<i)throw new sjcl.exception
.invalid("ccm: invalid tag length");if(4294967295<r.length||4294967295<t.length)
throw new sjcl.exception.bug("ccm: can't deal with 4GiB or more data");n=sjcl.mode
.ccm.na(e,r,n,i,o.bitLength(t)/8,s);for(r=0;r<t.length;r+=4)n=e.encrypt(u(n,t.slice
(r,r+4).concat([0,0,0])));return o.clamp(n,8*i)},C:function(e,t,n,r,i,s){var o,u=
sjcl.bitArray;o=u.i;var a=t.length,f=u.bitLength(t),l=a/50,c=l;n=u.concat([u.partial
(8,s-1)],n).concat([0,0,0]).slice(0,4),r=u.bitSlice(o(r,e.encrypt(n)),0,i);if(!a
)return{tag:r,data:[]};for(o=0;o<a;o+=4)o>l&&(sjcl.mode.ccm.fa(o/a),l+=c),n[3]++
,i=e.encrypt(n),t[o]^=i[0],t[o+1]^=i[1],t[o+2]^=i[2],t[o+3]^=i[3];return{tag:r,data
:u.clamp(t,f)}}},sjcl.mode.ocb2={name:"ocb2",encrypt:function(e,t,n,r,i,s){if(128!==
sjcl.bitArray.bitLength(n))throw new sjcl.exception.invalid("ocb iv must be 128 bits"
);var o,u=sjcl.mode.ocb2.S,a=sjcl.bitArray,f=a.i,l=[0,0,0,0];n=u(e.encrypt(n));var c
,h=[];r=r||[],i=i||64;for(o=0;o+4<t.length;o+=4)c=t.slice(o,o+4),l=f(l,c),h=h.concat
(f(n,e.encrypt(f(n,c)))),n=u(n);return c=t.slice(o),t=a.bitLength(c),o=e.encrypt
(f(n,[0,0,0,t])),c=a.clamp(f(c.concat([0,0,0]),o),t),l=f(l,f(c.concat([0,0,0]),o
)),l=e.encrypt(f(l,f(n,u(n)))),r.length&&(l=f(l,s?r:sjcl.mode.ocb2.pmac(e,r))),h
.concat(a.concat(c,a.clamp(l,i)))},decrypt:function(e,t,n,r,i,s){if(128!==sjcl.bitArray
.bitLength(n))throw new sjcl.exception.invalid("ocb iv must be 128 bits");i=i||64
;var o=sjcl.mode.ocb2.S,u=sjcl.bitArray,a=u.i,f=[0,0,0,0],l=o(e.encrypt(n)),c,h,
p=sjcl.bitArray.bitLength(t)-i,d=[];r=r||[];for(n=0;n+4<p/32;n+=4)c=a(l,e.decrypt
(a(l,t.slice(n,n+4)))),f=a(f,c),d=d.concat(c),l=o(l);h=p-32*n,c=e.encrypt(a(l,[0
,0,0,h])),c=a(c,u.clamp(t.slice(n),h).concat([0,0,0])),f=a(f,c),f=e.encrypt(a(f,
a(l,o(l)))),r.length&&(f=a(f,s?r:sjcl.mode.ocb2.pmac(e,r)));if(!u.equal(u.clamp(
f,i),u.bitSlice(t,p)))throw new sjcl.exception.corrupt("ocb: tag doesn't match")
;return d.concat(u.clamp(c,h))},pmac:function(e,t){var n,r=sjcl.mode.ocb2.S,i=sjcl
.bitArray,s=i.i,o=[0,0,0,0],u=e.encrypt([0,0,0,0]),u=s(u,r(r(u)));for(n=0;n+4<t.
length;n+=4)u=r(u),o=s(o,e.encrypt(s(u,t.slice(n,n+4))));return n=t.slice(n),128>
i.bitLength(n)&&(u=s(u,r(u)),n=i.concat(n,[-2147483648,0,0,0])),o=s(o,n),e.encrypt
(s(r(s(u,r(u))),o))},S:function(e){return[e[0]<<1^e[1]>>>31,e[1]<<1^e[2]>>>31,e[2
]<<1^e[3]>>>31,e[3]<<1^135*(e[0]>>>31)]}},sjcl.mode.gcm={name:"gcm",encrypt:function(
e,t,n,r,i){var s=t.slice(0);return t=sjcl.bitArray,r=r||[],e=sjcl.mode.gcm.C(!0,
e,s,r,n,i||128),t.concat(e.data,e.tag)},decrypt:function(e,t,n,r,i){var s=t.slice
(0),o=sjcl.bitArray,u=o.bitLength(s);i=i||128,r=r||[],i<=u?(t=o.bitSlice(s,u-i),
s=o.bitSlice(s,0,u-i)):(t=s,s=[]),e=sjcl.mode.gcm.C(!1,e,s,r,n,i);if(!o.equal(e.
tag,t))throw new sjcl.exception.corrupt("gcm: tag doesn't match");return e.data}
,ka:function(e,t){var n,r,i,s,o,u=sjcl.bitArray.i;i=[0,0,0,0],s=t.slice(0);for(n=0
;128>n;n++){(r=0!==(e[Math.floor(n/32)]&1<<31-n%32))&&(i=u(i,s)),o=0!==(s[3]&1);
for(r=3;0<r;r--)s[r]=s[r]>>>1|(s[r-1]&1)<<31;s[0]>>>=1,o&&(s[0]^=-520093696)}return i
},j:function(e,t,n){var r,i=n.length;t=t.slice(0);for(r=0;r<i;r+=4)t[0]^=4294967295&
n[r],t[1]^=4294967295&n[r+1],t[2]^=4294967295&n[r+2],t[3]^=4294967295&n[r+3],t=sjcl
.mode.gcm.ka(t,e);return t},C:function(e,t,n,r,i,s){var o,u,a,f,l,c,h,p,d=sjcl.bitArray
;c=n.length,h=d.bitLength(n),p=d.bitLength(r),u=d.bitLength(i),o=t.encrypt([0,0,0
,0]),96===u?(i=i.slice(0),i=d.concat(i,[1])):(i=sjcl.mode.gcm.j(o,[0,0,0,0],i),i=
sjcl.mode.gcm.j(o,i,[0,0,Math.floor(u/4294967296),u&4294967295])),u=sjcl.mode.gcm
.j(o,[0,0,0,0],r),l=i.slice(0),r=u.slice(0),e||(r=sjcl.mode.gcm.j(o,u,n));for(f=0
;f<c;f+=4)l[3]++,a=t.encrypt(l),n[f]^=a[0],n[f+1]^=a[1],n[f+2]^=a[2],n[f+3]^=a[3
];return n=d.clamp(n,h),e&&(r=sjcl.mode.gcm.j(o,u,n)),e=[Math.floor(p/4294967296
),p&4294967295,Math.floor(h/4294967296),h&4294967295],r=sjcl.mode.gcm.j(o,r,e),a=
t.encrypt(i),r[0]^=a[0],r[1]^=a[1],r[2]^=a[2],r[3]^=a[3],{tag:d.bitSlice(r,0,s),
data:n}}},sjcl.misc.hmac=function(e,t){this.W=t=t||sjcl.hash.sha256;var n=[[],[]
],r,i=t.prototype.blockSize/32;this.w=[new t,new t],e.length>i&&(e=t.hash(e));for(
r=0;r<i;r++)n[0][r]=e[r]^909522486,n[1][r]=e[r]^1549556828;this.w[0].update(n[0]
),this.w[1].update(n[1]),this.R=new t(this.w[0])},sjcl.misc.hmac.prototype.encrypt=
sjcl.misc.hmac.prototype.mac=function(e){if(this.aa)throw new sjcl.exception.invalid
("encrypt on already updated hmac called!");return this.update(e),this.digest(e)
},sjcl.misc.hmac.prototype.reset=function(){this.R=new this.W(this.w[0]),this.aa=!1
},sjcl.misc.hmac.prototype.update=function(e){this.aa=!0,this.R.update(e)},sjcl.
misc.hmac.prototype.digest=function(){var e=this.R.finalize(),e=(new this.W(this
.w[1])).update(e).finalize();return this.reset(),e},sjcl.misc.pbkdf2=function(e,
t,n,r,i){n=n||1e4;if(0>r||0>n)throw new sjcl.exception.invalid("invalid params to pbkdf2"
);"string"==typeof e&&(e=sjcl.codec.utf8String.toBits(e)),"string"==typeof t&&(t=
sjcl.codec.utf8String.toBits(t)),i=i||sjcl.misc.hmac,e=new i(e);var s,o,u,a,f=[]
,l=sjcl.bitArray;for(a=1;32*f.length<(r||1);a++){i=s=e.encrypt(l.concat(t,[a]));
for(o=1;o<n;o++)for(s=e.encrypt(s),u=0;u<s.length;u++)i[u]^=s[u];f=f.concat(i)}return r&&
(f=l.clamp(f,r)),f},sjcl.prng=function(e){this.c=[new sjcl.hash.sha256],this.m=[0
],this.P=0,this.H={},this.N=0,this.U={},this.Z=this.f=this.o=this.ha=0,this.b=[0
,0,0,0,0,0,0,0],this.h=[0,0,0,0],this.L=void 0,this.M=e,this.D=!1,this.K={progress
:{},seeded:{}},this.u=this.ga=0,this.I=1,this.J=2,this.ca=65536,this.T=[0,48,64,96
,128,192,256,384,512,768,1024],this.da=3e4,this.ba=80},sjcl.prng.prototype={randomWords
:function(e,t){var n=[],r;r=this.isReady(t);var i;if(r===this.u)throw new sjcl.exception
.notReady("generator isn't seeded");if(r&this.J){r=!(r&this.I),i=[];var s=0,o;this
.Z=i[0]=(new Date).valueOf()+this.da;for(o=0;16>o;o++)i.push(4294967296*Math.random
()|0);for(o=0;o<this.c.length&&(i=i.concat(this.c[o].finalize()),s+=this.m[o],this
.m[o]=0,r||!(this.P&1<<o));o++);this.P>=1<<this.c.length&&(this.c.push(new sjcl.
hash.sha256),this.m.push(0)),this.f-=s,s>this.o&&(this.o=s),this.P++,this.b=sjcl
.hash.sha256.hash(this.b.concat(i)),this.L=new sjcl.cipher.aes(this.b);for(r=0;4>
r&&(this.h[r]=this.h[r]+1|0,!this.h[r]);r++);}for(r=0;r<e;r+=4)0===(r+1)%this.ca&&
y(this),i=z(this),n.push(i[0],i[1],i[2],i[3]);return y(this),n.slice(0,e)},setDefaultParanoia
:function(e,t){if(0===e&&"Setting paranoia=0 will ruin your security; use it only for testing"!==
t)throw new sjcl.exception.invalid("Setting paranoia=0 will ruin your security; use it only for testing"
);this.M=e},addEntropy:function(e,t,n){n=n||"user";var r,i,s=(new Date).valueOf(
),o=this.H[n],u=this.isReady(),a=0;r=this.U[n],void 0===r&&(r=this.U[n]=this.ha++
),void 0===o&&(o=this.H[n]=0),this.H[n]=(this.H[n]+1)%this.c.length;switch(typeof
e){case"number":void 0===t&&(t=1),this.c[o].update([r,this.N++,1,t,s,1,e|0]);break;
case"object":n=Object.prototype.toString.call(e);if("[object Uint32Array]"===n){
i=[];for(n=0;n<e.length;n++)i.push(e[n]);e=i}else for("[object Array]"!==n&&(a=1
),n=0;n<e.length&&!a;n++)"number"!=typeof e[n]&&(a=1);if(!a){if(void 0===t)for(n=
t=0;n<e.length;n++)for(i=e[n];0<i;)t++,i>>>=1;this.c[o].update([r,this.N++,2,t,s
,e.length].concat(e))}break;case"string":void 0===t&&(t=e.length),this.c[o].update
([r,this.N++,3,t,s,e.length]),this.c[o].update(e);break;default:a=1}if(a)throw new
sjcl.exception.bug("random: addEntropy only supports number, array of numbers or string"
);this.m[o]+=t,this.f+=t,u===this.u&&(this.isReady()!==this.u&&A("seeded",Math.max
(this.o,this.f)),A("progress",this.getProgress()))},isReady:function(e){return e=
this.T[void 0!==e?e:this.M],this.o&&this.o>=e?this.m[0]>this.ba&&(new Date).valueOf
()>this.Z?this.J|this.I:this.I:this.f>=e?this.J|this.u:this.u},getProgress:function(
e){return e=this.T[e?e:this.M],this.o>=e?1:this.f>e?1:this.f/e},startCollectors:
function(){if(!this.D){this.a={loadTimeCollector:B(this,this.ma),mouseCollector:
B(this,this.oa),keyboardCollector:B(this,this.la),accelerometerCollector:B(this,
this.ea),touchCollector:B(this,this.qa)};if(window.addEventListener)window.addEventListener
("load",this.a.loadTimeCollector,!1),window.addEventListener("mousemove",this.a.
mouseCollector,!1),window.addEventListener("keypress",this.a.keyboardCollector,!1
),window.addEventListener("devicemotion",this.a.accelerometerCollector,!1),window
.addEventListener("touchmove",this.a.touchCollector,!1);else{if(!document.attachEvent
)throw new sjcl.exception.bug("can't attach event");document.attachEvent("onload"
,this.a.loadTimeCollector),document.attachEvent("onmousemove",this.a.mouseCollector
),document.attachEvent("keypress",this.a.keyboardCollector)}this.D=!0}},stopCollectors
:function(){this.D&&(window.removeEventListener?(window.removeEventListener("load"
,this.a.loadTimeCollector,!1),window.removeEventListener("mousemove",this.a.mouseCollector
,!1),window.removeEventListener("keypress",this.a.keyboardCollector,!1),window.removeEventListener
("devicemotion",this.a.accelerometerCollector,!1),window.removeEventListener("touchmove"
,this.a.touchCollector,!1)):document.detachEvent&&(document.detachEvent("onload"
,this.a.loadTimeCollector),document.detachEvent("onmousemove",this.a.mouseCollector
),document.detachEvent("keypress",this.a.keyboardCollector)),this.D=!1)},addEventListener
:function(e,t){this.K[e][this.ga++]=t},removeEventListener:function(e,t){var n,r
,i=this.K[e],s=[];for(r in i)i.hasOwnProperty(r)&&i[r]===t&&s.push(r);for(n=0;n<
s.length;n++)r=s[n],delete i[r]},la:function(){C(this,1)},oa:function(e){var t,n
;try{t=e.x||e.clientX||e.offsetX||0,n=e.y||e.clientY||e.offsetY||0}catch(r){n=t=0
}0!=t&&0!=n&&this.addEntropy([t,n],2,"mouse"),C(this,0)},qa:function(e){e=e.touches
[0]||e.changedTouches[0],this.addEntropy([e.pageX||e.clientX,e.pageY||e.clientY]
,1,"touch"),C(this,0)},ma:function(){C(this,2)},ea:function(e){e=e.accelerationIncludingGravity
.x||e.accelerationIncludingGravity.y||e.accelerationIncludingGravity.z;if(window
.orientation){var t=window.orientation;"number"==typeof t&&this.addEntropy(t,1,"accelerometer"
)}e&&this.addEntropy(e,2,"accelerometer"),C(this,0)}},sjcl.random=new sjcl.prng(6
);e:try{var D,E,F,G;if(G="undefined"!=typeof module&&module.exports){var H;try{H=
require("crypto")}catch(a){H=null}G=E=H}if(G&&E.randomBytes)D=E.randomBytes(128)
,D=new Uint32Array((new Uint8Array(D)).buffer),sjcl.random.addEntropy(D,1024,"crypto['randomBytes']"
);else if("undefined"!=typeof window&&"undefined"!=typeof Uint32Array){F=new Uint32Array
(32);if(window.crypto&&window.crypto.getRandomValues)window.crypto.getRandomValues
(F);else{if(!window.msCrypto||!window.msCrypto.getRandomValues)break e;window.msCrypto
.getRandomValues(F)}sjcl.random.addEntropy(F,1024,"crypto['getRandomValues']")}}
catch(a){"undefined"!=typeof window&&window.console&&(console.log("There was an error collecting entropy from the browser:"
),console.log(a))}sjcl.json={defaults:{v:1,iter:1e4,ks:128,ts:64,mode:"ccm",adata
:"",cipher:"aes"},ja:function(e,t,n,r){n=n||{},r=r||{};var i=sjcl.json,s=i.g({iv
:sjcl.random.randomWords(4,0)},i.defaults),o;i.g(s,n),n=s.adata,"string"==typeof
s.salt&&(s.salt=sjcl.codec.base64.toBits(s.salt)),"string"==typeof s.iv&&(s.iv=sjcl
.codec.base64.toBits(s.iv));if(!sjcl.mode[s.mode]||!sjcl.cipher[s.cipher]||"string"==typeof
e&&100>=s.iter||64!==s.ts&&96!==s.ts&&128!==s.ts||128!==s.ks&&192!==s.ks&&256!==
s.ks||2>s.iv.length||4<s.iv.length)throw new sjcl.exception.invalid("json encrypt: invalid parameters"
);return"string"==typeof e?(o=sjcl.misc.cachedPbkdf2(e,s),e=o.key.slice(0,s.ks/32
),s.salt=o.salt):sjcl.ecc&&e instanceof sjcl.ecc.elGamal.publicKey&&(o=e.kem(),s
.kemtag=o.tag,e=o.key.slice(0,s.ks/32)),"string"==typeof t&&(t=sjcl.codec.utf8String
.toBits(t)),"string"==typeof n&&(s.adata=n=sjcl.codec.utf8String.toBits(n)),o=new
sjcl.cipher[s.cipher](e),i.g(r,s),r.key=e,s.ct="ccm"===s.mode&&sjcl.arrayBuffer&&
sjcl.arrayBuffer.ccm&&t instanceof ArrayBuffer?sjcl.arrayBuffer.ccm.encrypt(o,t,
s.iv,n,s.ts):sjcl.mode[s.mode].encrypt(o,t,s.iv,n,s.ts),s},encrypt:function(e,t,
n,r){var i=sjcl.json,s=i.ja.apply(i,arguments);return i.encode(s)},ia:function(e
,t,n,r){n=n||{},r=r||{};var i=sjcl.json;t=i.g(i.g(i.g({},i.defaults),t),n,!0);var s
,o;s=t.adata,"string"==typeof t.salt&&(t.salt=sjcl.codec.base64.toBits(t.salt)),"string"==typeof
t.iv&&(t.iv=sjcl.codec.base64.toBits(t.iv));if(!sjcl.mode[t.mode]||!sjcl.cipher[
t.cipher]||"string"==typeof e&&100>=t.iter||64!==t.ts&&96!==t.ts&&128!==t.ts||128!==
t.ks&&192!==t.ks&&256!==t.ks||!t.iv||2>t.iv.length||4<t.iv.length)throw new sjcl
.exception.invalid("json decrypt: invalid parameters");return"string"==typeof e?
(o=sjcl.misc.cachedPbkdf2(e,t),e=o.key.slice(0,t.ks/32),t.salt=o.salt):sjcl.ecc&&
e instanceof sjcl.ecc.elGamal.secretKey&&(e=e.unkem(sjcl.codec.base64.toBits(t.kemtag
)).slice(0,t.ks/32)),"string"==typeof s&&(s=sjcl.codec.utf8String.toBits(s)),o=new
sjcl.cipher[t.cipher](e),s="ccm"===t.mode&&sjcl.arrayBuffer&&sjcl.arrayBuffer.ccm&&
t.ct instanceof ArrayBuffer?sjcl.arrayBuffer.ccm.decrypt(o,t.ct,t.iv,t.tag,s,t.ts
):sjcl.mode[t.mode].decrypt(o,t.ct,t.iv,s,t.ts),i.g(r,t),r.key=e,1===n.raw?s:sjcl
.codec.utf8String.fromBits(s)},decrypt:function(e,t,n,r){var i=sjcl.json;return i
.ia(e,i.decode(t),n,r)},encode:function(e){var t,n="{",r="";for(t in e)if(e.hasOwnProperty
(t)){if(!t.match(/^[a-z0-9]+$/i))throw new sjcl.exception.invalid("json encode: invalid property name"
);n+=r+'"'+t+'":',r=",";switch(typeof e[t]){case"number":case"boolean":n+=e[t];break;
case"string":n+='"'+escape(e[t])+'"';break;case"object":n+='"'+sjcl.codec.base64
.fromBits(e[t],0)+'"';break;default:throw new sjcl.exception.bug("json encode: unsupported type"
)}}return n+"}"},decode:function(e){e=e.replace(/\s/g,"");if(!e.match(/^\{.*\}$/
))throw new sjcl.exception.invalid("json decode: this isn't json!");e=e.replace(/^\{|\}$/g
,"").split(/,/);var t={},n,r;for(n=0;n<e.length;n++){if(!(r=e[n].match(/^\s*(?:(["']?)([a-z][a-z0-9]*)\1)\s*:\s*(?:(-?\d+)|"([a-z0-9+\/%*_.@=\-]*)"|(true|false))$/i
)))throw new sjcl.exception.invalid("json decode: this isn't json!");null!=r[3]?
t[r[2]]=parseInt(r[3],10):null!=r[4]?t[r[2]]=r[2].match(/^(ct|adata|salt|iv)$/)?
sjcl.codec.base64.toBits(r[4]):unescape(r[4]):null!=r[5]&&(t[r[2]]="true"===r[5]
)}return t},g:function(e,t,n){void 0===e&&(e={});if(void 0===t)return e;for(var r in
t)if(t.hasOwnProperty(r)){if(n&&void 0!==e[r]&&e[r]!==t[r])throw new sjcl.exception
.invalid("required parameter overridden");e[r]=t[r]}return e},sa:function(e,t){var n=
{},r;for(r in e)e.hasOwnProperty(r)&&e[r]!==t[r]&&(n[r]=e[r]);return n},ra:function(
e,t){var n={},r;for(r=0;r<t.length;r++)void 0!==e[t[r]]&&(n[t[r]]=e[t[r]]);return n
}},sjcl.encrypt=sjcl.json.encrypt,sjcl.decrypt=sjcl.json.decrypt,sjcl.misc.pa={}
,sjcl.misc.cachedPbkdf2=function(e,t){var n=sjcl.misc.pa,r;return t=t||{},r=t.iter||1e3
,n=n[e]=n[e]||{},r=n[r]=n[r]||{firstSalt:t.salt&&t.salt.length?t.salt.slice(0):sjcl
.random.randomWords(2,0)},n=void 0===t.salt?r.firstSalt:t.salt,r[n]=r[n]||sjcl.misc
.pbkdf2(e,n,t.iter),{key:r[n].slice(0),salt:n.slice(0)}},"undefined"!=typeof module&&
module.exports&&(module.exports=sjcl),"function"==typeof define&&define([],function(
){return sjcl})
local.sjcl = sjcl; }());



// init lib sjcl.misc.scrypt
// 2016-05-31T18:10:00Z
// https://github.com/bitwiseshiftleft/sjcl/blob/1.0.6/core/scrypt.js
// utility2-uglify https://raw.githubusercontent.com/bitwiseshiftleft/sjcl/1.0.6/core/scrypt.js
(function () { var sjcl; sjcl = local.sjcl;
sjcl.misc.scrypt=function(e,t,n,r,i,s,o){var u=Math.pow(2,32)-1,a=sjcl.misc.scrypt
;n=n||16384,r=r||8,i=i||1;if(r*i>=Math.pow(2,30))throw sjcl.exception.invalid("The parameters r, p must satisfy r * p < 2^30"
);if(n<2||n&n-1!=0)throw sjcl.exception.invalid("The parameter N must be a power of 2."
);if(n>u/128/r)throw sjcl.exception.invalid("N too big.");if(r>u/128/i)throw sjcl
.exception.invalid("r too big.");var f=sjcl.misc.pbkdf2(e,t,1,i*128*r*8,o),l=f.length/
i;a.reverse(f);for(var c=0;c<i;c++){var h=f.slice(c*l,(c+1)*l);a.blockcopy(a.ROMix
(h,n),0,f,c*l)}return a.reverse(f),sjcl.misc.pbkdf2(e,f,1,s,o)},sjcl.misc.scrypt
.salsa20Core=function(e,t){var n=function(e,t){return e<<t|e>>>32-t},r=e.slice(0
);for(var i=t;i>0;i-=2)r[4]^=n(r[0]+r[12],7),r[8]^=n(r[4]+r[0],9),r[12]^=n(r[8]+
r[4],13),r[0]^=n(r[12]+r[8],18),r[9]^=n(r[5]+r[1],7),r[13]^=n(r[9]+r[5],9),r[1]^=
n(r[13]+r[9],13),r[5]^=n(r[1]+r[13],18),r[14]^=n(r[10]+r[6],7),r[2]^=n(r[14]+r[10
],9),r[6]^=n(r[2]+r[14],13),r[10]^=n(r[6]+r[2],18),r[3]^=n(r[15]+r[11],7),r[7]^=
n(r[3]+r[15],9),r[11]^=n(r[7]+r[3],13),r[15]^=n(r[11]+r[7],18),r[1]^=n(r[0]+r[3]
,7),r[2]^=n(r[1]+r[0],9),r[3]^=n(r[2]+r[1],13),r[0]^=n(r[3]+r[2],18),r[6]^=n(r[5
]+r[4],7),r[7]^=n(r[6]+r[5],9),r[4]^=n(r[7]+r[6],13),r[5]^=n(r[4]+r[7],18),r[11]^=
n(r[10]+r[9],7),r[8]^=n(r[11]+r[10],9),r[9]^=n(r[8]+r[11],13),r[10]^=n(r[9]+r[8]
,18),r[12]^=n(r[15]+r[14],7),r[13]^=n(r[12]+r[15],9),r[14]^=n(r[13]+r[12],13),r[15
]^=n(r[14]+r[13],18);for(i=0;i<16;i++)e[i]=r[i]+e[i]},sjcl.misc.scrypt.blockMix=
function(e){var t=e.slice(-16),n=[],r=e.length/16,i=sjcl.misc.scrypt;for(var s=0
;s<r;s++)i.blockxor(e,16*s,t,0,16),i.salsa20Core(t,8),(s&1)==0?i.blockcopy(t,0,n
,8*s):i.blockcopy(t,0,n,8*(s^1+r));return n},sjcl.misc.scrypt.ROMix=function(e,t
){var n=e.slice(0),r=[],i=sjcl.misc.scrypt;for(var s=0;s<t;s++)r.push(n.slice(0)
),n=i.blockMix(n);for(s=0;s<t;s++){var o=n[n.length-16]&t-1;i.blockxor(r[o],0,n,0
),n=i.blockMix(n)}return n},sjcl.misc.scrypt.reverse=function(e){for(var t in e)
{var n=e[t]&255;n=n<<8|e[t]>>>8&255,n=n<<8|e[t]>>>16&255,n=n<<8|e[t]>>>24&255,e[
t]=n}},sjcl.misc.scrypt.blockcopy=function(e,t,n,r,i){var s;i=i||e.length-t;for(
s=0;s<i;s++)n[r+s]=e[t+s]|0},sjcl.misc.scrypt.blockxor=function(e,t,n,r,i){var s
;i=i||e.length-t;for(s=0;s<i;s++)n[r+s]=n[r+s]^e[t+s]|0}
}());
/* jslint-ignore-end */
        // init exports
        if (local.modeJs === 'browser') {
            local.global.utility2_sjcl = local.sjcl;
        } else {
            module.exports = local.sjcl;
            module.exports.__dirname = __dirname;
        }
    }());
}());
