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
        local = local.global.utility2_rollup || local;



// init lib sjcl
/* jslint-ignore-begin */
// https://github.com/bitwiseshiftleft/sjcl/blob/1.0.3/sjcl.js
// utility2-uglify https://raw.githubusercontent.com/bitwiseshiftleft/sjcl/1.0.3/sjcl.js
(function () { var module;
"use strict";function q(e){throw e}function w(e,t,n){4!==t.length&&q(new sjcl.exception
.invalid("invalid aes block size"));var r=e.b[n],i=t[0]^r[0],s=t[n?3:1]^r[1],o=t
[2]^r[2];t=t[n?1:3]^r[3];var u,a,f,l=r.length/4-2,c,h=4,p=[0,0,0,0];u=e.k[n],e=u
[0];var d=u[1],v=u[2],m=u[3],g=u[4];for(c=0;c<l;c++)u=e[i>>>24]^d[s>>16&255]^v[o>>8&255
]^m[t&255]^r[h],a=e[s>>>24]^d[o>>16&255]^v[t>>8&255]^m[i&255]^r[h+1],f=e[o>>>24]^
d[t>>16&255]^v[i>>8&255]^m[s&255]^r[h+2],t=e[t>>>24]^d[i>>16&255]^v[s>>8&255]^m[
o&255]^r[h+3],h+=4,i=u,s=a,o=f;for(c=0;4>c;c++)p[n?3&-c:c]=g[i>>>24]<<24^g[s>>16&255
]<<16^g[o>>8&255]<<8^g[t&255]^r[h++],u=i,i=s,s=o,o=t,t=u;return p}function x(e,t
){var n,r,i,s=t.slice(0),o=e.r,u=e.b,a=o[0],f=o[1],l=o[2],c=o[3],h=o[4],p=o[5],d=
o[6],v=o[7];for(n=0;64>n;n++)16>n?r=s[n]:(r=s[n+1&15],i=s[n+14&15],r=s[n&15]=(r>>>7^
r>>>18^r>>>3^r<<25^r<<14)+(i>>>17^i>>>19^i>>>10^i<<15^i<<13)+s[n&15]+s[n+9&15]|0
),r=r+v+(h>>>6^h>>>11^h>>>25^h<<26^h<<21^h<<7)+(d^h&(p^d))+u[n],v=d,d=p,p=h,h=c+
r|0,c=l,l=f,f=a,a=r+(f&l^c&(f^l))+(f>>>2^f>>>13^f>>>22^f<<30^f<<19^f<<10)|0;o[0]=
o[0]+a|0,o[1]=o[1]+f|0,o[2]=o[2]+l|0,o[3]=o[3]+c|0,o[4]=o[4]+h|0,o[5]=o[5]+p|0,o
[6]=o[6]+d|0,o[7]=o[7]+v|0}function C(e,t){var n,r=sjcl.random.w[e],i=[];for(n in
r)r.hasOwnProperty(n)&&i.push(r[n]);for(n=0;n<i.length;n++)i[n](t)}function E(e)
{"undefined"!=typeof window&&window.performance&&"function"==typeof window.performance
.now?sjcl.random.addEntropy(window.performance.now(),e,"loadtime"):sjcl.random.addEntropy
((new Date).valueOf(),e,"loadtime")}function A(e){e.b=B(e).concat(B(e)),e.A=new
sjcl.cipher.aes(e.b)}function B(e){for(var t=0;4>t&&(e.f[t]=e.f[t]+1|0,!e.f[t]);
t++);return e.A.encrypt(e.f)}function D(e,t){return function(){t.apply(e,arguments
)}}var s=void 0,u=!1,sjcl={cipher:{},hash:{},keyexchange:{},mode:{},misc:{},codec
:{},exception:{corrupt:function(e){this.toString=function(){return"CORRUPT: "+this
.message},this.message=e},invalid:function(e){this.toString=function(){return"INVALID: "+
this.message},this.message=e},bug:function(e){this.toString=function(){return"BUG: "+
this.message},this.message=e},notReady:function(e){this.toString=function(){return"NOT READY: "+
this.message},this.message=e}}};"undefined"!=typeof module&&module.exports&&(module
.exports=sjcl),"function"==typeof define&&define([],function(){return sjcl}),sjcl
.cipher.aes=function(e){this.k[0][0][0]||this.D();var t,n,r,i,s=this.k[0][4],o=this
.k[1];t=e.length;var u=1;4!==t&&6!==t&&8!==t&&q(new sjcl.exception.invalid("invalid aes key size"
)),this.b=[r=e.slice(0),i=[]];for(e=t;e<4*t+28;e++){n=r[e-1];if(0===e%t||8===t&&4===
e%t)n=s[n>>>24]<<24^s[n>>16&255]<<16^s[n>>8&255]<<8^s[n&255],0===e%t&&(n=n<<8^n>>>24^
u<<24,u=u<<1^283*(u>>7));r[e]=r[e-t]^n}for(t=0;e;t++,e--)n=r[t&3?e:e-4],i[t]=4>=
e||4>t?n:o[0][s[n>>>24]]^o[1][s[n>>16&255]]^o[2][s[n>>8&255]]^o[3][s[n&255]]},sjcl
.cipher.aes.prototype={encrypt:function(e){return w(this,e,0)},decrypt:function(
e){return w(this,e,1)},k:[[[],[],[],[],[]],[[],[],[],[],[]]],D:function(){var e=
this.k[0],t=this.k[1],n=e[4],r=t[4],i,s,o,u=[],a=[],f,l,c,h;for(i=0;256>i;i++)a[
(u[i]=i<<1^283*(i>>7))^i]=i;for(s=o=0;!n[s];s^=f||1,o=a[o]||1){c=o^o<<1^o<<2^o<<3^
o<<4,c=c>>8^c&255^99,n[s]=c,r[c]=s,l=u[i=u[f=u[s]]],h=16843009*l^65537*i^257*f^16843008*
s,l=257*u[c]^16843008*c;for(i=0;4>i;i++)e[i][s]=l=l<<24^l>>>8,t[i][c]=h=h<<24^h>>>8
}for(i=0;5>i;i++)e[i]=e[i].slice(0),t[i]=t[i].slice(0)}},sjcl.bitArray={bitSlice
:function(e,t,n){return e=sjcl.bitArray.P(e.slice(t/32),32-(t&31)).slice(1),n===
s?e:sjcl.bitArray.clamp(e,n-t)},extract:function(e,t,n){var r=Math.floor(-t-n&31
);return((t+n-1^t)&-32?e[t/32|0]<<32-r^e[t/32+1|0]>>>r:e[t/32|0]>>>r)&(1<<n)-1},
concat:function(e,t){if(0===e.length||0===t.length)return e.concat(t);var n=e[e.
length-1],r=sjcl.bitArray.getPartial(n);return 32===r?e.concat(t):sjcl.bitArray.
P(t,r,n|0,e.slice(0,e.length-1))},bitLength:function(e){var t=e.length;return 0===
t?0:32*(t-1)+sjcl.bitArray.getPartial(e[t-1])},clamp:function(e,t){if(32*e.length<
t)return e;e=e.slice(0,Math.ceil(t/32));var n=e.length;return t&=31,0<n&&t&&(e[n-1
]=sjcl.bitArray.partial(t,e[n-1]&2147483648>>t-1,1)),e},partial:function(e,t,n){
return 32===e?t:(n?t|0:t<<32-e)+1099511627776*e},getPartial:function(e){return Math
.round(e/1099511627776)||32},equal:function(e,t){if(sjcl.bitArray.bitLength(e)!==
sjcl.bitArray.bitLength(t))return u;var n=0,r;for(r=0;r<e.length;r++)n|=e[r]^t[r
];return 0===n},P:function(e,t,n,r){var i;i=0;for(r===s&&(r=[]);32<=t;t-=32)r.push
(n),n=0;if(0===t)return r.concat(e);for(i=0;i<e.length;i++)r.push(n|e[i]>>>t),n=
e[i]<<32-t;return i=e.length?e[e.length-1]:0,e=sjcl.bitArray.getPartial(i),r.push
(sjcl.bitArray.partial(t+e&31,32<t+e?n:r.pop(),1)),r},l:function(e,t){return[e[0
]^t[0],e[1]^t[1],e[2]^t[2],e[3]^t[3]]},byteswapM:function(e){var t,n;for(t=0;t<e
.length;++t)n=e[t],e[t]=n>>>24|n>>>8&65280|(n&65280)<<8|n<<24;return e}},sjcl.codec
.utf8String={fromBits:function(e){var t="",n=sjcl.bitArray.bitLength(e),r,i;for(
r=0;r<n/8;r++)0===(r&3)&&(i=e[r/4]),t+=String.fromCharCode(i>>>24),i<<=8;return decodeURIComponent
(escape(t))},toBits:function(e){e=unescape(encodeURIComponent(e));var t=[],n,r=0
;for(n=0;n<e.length;n++)r=r<<8|e.charCodeAt(n),3===(n&3)&&(t.push(r),r=0);return n&3&&
t.push(sjcl.bitArray.partial(8*(n&3),r)),t}},sjcl.codec.hex={fromBits:function(e
){var t="",n;for(n=0;n<e.length;n++)t+=((e[n]|0)+0xf00000000000).toString(16).substr
(4);return t.substr(0,sjcl.bitArray.bitLength(e)/4)},toBits:function(e){var t,n=
[],r;e=e.replace(/\s|0x/g,""),r=e.length,e+="00000000";for(t=0;t<e.length;t+=8)n
.push(parseInt(e.substr(t,8),16)^0);return sjcl.bitArray.clamp(n,4*r)}},sjcl.codec
.base64={J:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",fromBits
:function(e,t,n){var r="",i=0,s=sjcl.codec.base64.J,o=0,u=sjcl.bitArray.bitLength
(e);n&&(s=s.substr(0,62)+"-_");for(n=0;6*r.length<u;)r+=s.charAt((o^e[n]>>>i)>>>26
),6>i?(o=e[n]<<6-i,i+=26,n++):(o<<=6,i-=6);for(;r.length&3&&!t;)r+="=";return r}
,toBits:function(e,t){e=e.replace(/\s|=/g,"");var n=[],r,i=0,s=sjcl.codec.base64
.J,o=0,u;t&&(s=s.substr(0,62)+"-_");for(r=0;r<e.length;r++)u=s.indexOf(e.charAt(
r)),0>u&&q(new sjcl.exception.invalid("this isn't base64!")),26<i?(i-=26,n.push(
o^u>>>i),o=u<<32-i):(i+=6,o^=u<<32-i);return i&56&&n.push(sjcl.bitArray.partial(
i&56,o,1)),n}},sjcl.codec.base64url={fromBits:function(e){return sjcl.codec.base64
.fromBits(e,1,1)},toBits:function(e){return sjcl.codec.base64.toBits(e,1)}},sjcl
.hash.sha256=function(e){this.b[0]||this.D(),e?(this.r=e.r.slice(0),this.o=e.o.slice
(0),this.h=e.h):this.reset()},sjcl.hash.sha256.hash=function(e){return(new sjcl.
hash.sha256).update(e).finalize()},sjcl.hash.sha256.prototype={blockSize:512,reset
:function(){return this.r=this.N.slice(0),this.o=[],this.h=0,this},update:function(
e){"string"==typeof e&&(e=sjcl.codec.utf8String.toBits(e));var t,n=this.o=sjcl.bitArray
.concat(this.o,e);t=this.h,e=this.h=t+sjcl.bitArray.bitLength(e);for(t=512+t&-512
;t<=e;t+=512)x(this,n.splice(0,16));return this},finalize:function(){var e,t=this
.o,n=this.r,t=sjcl.bitArray.concat(t,[sjcl.bitArray.partial(1,1)]);for(e=t.length+2
;e&15;e++)t.push(0);t.push(Math.floor(this.h/4294967296));for(t.push(this.h|0);t
.length;)x(this,t.splice(0,16));return this.reset(),n},N:[],b:[],D:function(){function e
(e){return 4294967296*(e-Math.floor(e))|0}var t=0,n=2,r;e:for(;64>t;n++){for(r=2
;r*r<=n;r++)if(0===n%r)continue e;8>t&&(this.N[t]=e(Math.pow(n,.5))),this.b[t]=e
(Math.pow(n,1/3)),t++}}},sjcl.mode.ccm={name:"ccm",encrypt:function(e,t,n,r,i){var s
,o=t.slice(0),u=sjcl.bitArray,a=u.bitLength(n)/8,f=u.bitLength(o)/8;i=i||64,r=r||
[],7>a&&q(new sjcl.exception.invalid("ccm: iv must be at least 7 bytes"));for(s=2
;4>s&&f>>>8*s;s++);return s<15-a&&(s=15-a),n=u.clamp(n,8*(15-s)),t=sjcl.mode.ccm
.L(e,t,n,r,i,s),o=sjcl.mode.ccm.p(e,o,n,t,i,s),u.concat(o.data,o.tag)},decrypt:function(
e,t,n,r,i){i=i||64,r=r||[];var s=sjcl.bitArray,o=s.bitLength(n)/8,u=s.bitLength(
t),a=s.clamp(t,u-i),f=s.bitSlice(t,u-i),u=(u-i)/8;7>o&&q(new sjcl.exception.invalid
("ccm: iv must be at least 7 bytes"));for(t=2;4>t&&u>>>8*t;t++);return t<15-o&&(
t=15-o),n=s.clamp(n,8*(15-t)),a=sjcl.mode.ccm.p(e,a,n,f,i,t),e=sjcl.mode.ccm.L(e
,a.data,n,r,i,t),s.equal(a.tag,e)||q(new sjcl.exception.corrupt("ccm: tag doesn't match"
)),a.data},L:function(e,t,n,r,i,s){var o=[],u=sjcl.bitArray,a=u.l;i/=8,(i%2||4>i||16<
i)&&q(new sjcl.exception.invalid("ccm: invalid tag length")),(4294967295<r.length||4294967295<
t.length)&&q(new sjcl.exception.bug("ccm: can't deal with 4GiB or more data")),s=
[u.partial(8,(r.length?64:0)|i-2<<2|s-1)],s=u.concat(s,n),s[3]|=u.bitLength(t)/8
,s=e.encrypt(s);if(r.length){n=u.bitLength(r)/8,65279>=n?o=[u.partial(16,n)]:4294967295>=
n&&(o=u.concat([u.partial(16,65534)],[n])),o=u.concat(o,r);for(r=0;r<o.length;r+=4
)s=e.encrypt(a(s,o.slice(r,r+4).concat([0,0,0])))}for(r=0;r<t.length;r+=4)s=e.encrypt
(a(s,t.slice(r,r+4).concat([0,0,0])));return u.clamp(s,8*i)},p:function(e,t,n,r,
i,s){var o,u=sjcl.bitArray;o=u.l;var a=t.length,f=u.bitLength(t);n=u.concat([u.partial
(8,s-1)],n).concat([0,0,0]).slice(0,4),r=u.bitSlice(o(r,e.encrypt(n)),0,i);if(!a
)return{tag:r,data:[]};for(o=0;o<a;o+=4)n[3]++,i=e.encrypt(n),t[o]^=i[0],t[o+1]^=
i[1],t[o+2]^=i[2],t[o+3]^=i[3];return{tag:r,data:u.clamp(t,f)}}},sjcl.mode.ocb2=
{name:"ocb2",encrypt:function(e,t,n,r,i,s){128!==sjcl.bitArray.bitLength(n)&&q(new
sjcl.exception.invalid("ocb iv must be 128 bits"));var o,u=sjcl.mode.ocb2.H,a=sjcl
.bitArray,f=a.l,l=[0,0,0,0];n=u(e.encrypt(n));var c,h=[];r=r||[],i=i||64;for(o=0
;o+4<t.length;o+=4)c=t.slice(o,o+4),l=f(l,c),h=h.concat(f(n,e.encrypt(f(n,c)))),
n=u(n);return c=t.slice(o),t=a.bitLength(c),o=e.encrypt(f(n,[0,0,0,t])),c=a.clamp
(f(c.concat([0,0,0]),o),t),l=f(l,f(c.concat([0,0,0]),o)),l=e.encrypt(f(l,f(n,u(n
)))),r.length&&(l=f(l,s?r:sjcl.mode.ocb2.pmac(e,r))),h.concat(a.concat(c,a.clamp
(l,i)))},decrypt:function(e,t,n,r,i,s){128!==sjcl.bitArray.bitLength(n)&&q(new sjcl
.exception.invalid("ocb iv must be 128 bits")),i=i||64;var o=sjcl.mode.ocb2.H,u=
sjcl.bitArray,a=u.l,f=[0,0,0,0],l=o(e.encrypt(n)),c,h,p=sjcl.bitArray.bitLength(
t)-i,d=[];r=r||[];for(n=0;n+4<p/32;n+=4)c=a(l,e.decrypt(a(l,t.slice(n,n+4)))),f=
a(f,c),d=d.concat(c),l=o(l);return h=p-32*n,c=e.encrypt(a(l,[0,0,0,h])),c=a(c,u.
clamp(t.slice(n),h).concat([0,0,0])),f=a(f,c),f=e.encrypt(a(f,a(l,o(l)))),r.length&&
(f=a(f,s?r:sjcl.mode.ocb2.pmac(e,r))),u.equal(u.clamp(f,i),u.bitSlice(t,p))||q(new
sjcl.exception.corrupt("ocb: tag doesn't match")),d.concat(u.clamp(c,h))},pmac:function(
e,t){var n,r=sjcl.mode.ocb2.H,i=sjcl.bitArray,s=i.l,o=[0,0,0,0],u=e.encrypt([0,0
,0,0]),u=s(u,r(r(u)));for(n=0;n+4<t.length;n+=4)u=r(u),o=s(o,e.encrypt(s(u,t.slice
(n,n+4))));return n=t.slice(n),128>i.bitLength(n)&&(u=s(u,r(u)),n=i.concat(n,[-2147483648
,0,0,0])),o=s(o,n),e.encrypt(s(r(s(u,r(u))),o))},H:function(e){return[e[0]<<1^e[1
]>>>31,e[1]<<1^e[2]>>>31,e[2]<<1^e[3]>>>31,e[3]<<1^135*(e[0]>>>31)]}},sjcl.mode.
gcm={name:"gcm",encrypt:function(e,t,n,r,i){var s=t.slice(0);return t=sjcl.bitArray
,r=r||[],e=sjcl.mode.gcm.p(!0,e,s,r,n,i||128),t.concat(e.data,e.tag)},decrypt:function(
e,t,n,r,i){var s=t.slice(0),o=sjcl.bitArray,a=o.bitLength(s);return i=i||128,r=r||
[],i<=a?(t=o.bitSlice(s,a-i),s=o.bitSlice(s,0,a-i)):(t=s,s=[]),e=sjcl.mode.gcm.p
(u,e,s,r,n,i),o.equal(e.tag,t)||q(new sjcl.exception.corrupt("gcm: tag doesn't match"
)),e.data},Z:function(e,t){var n,r,i,s,o,u=sjcl.bitArray.l;i=[0,0,0,0],s=t.slice
(0);for(n=0;128>n;n++){(r=0!==(e[Math.floor(n/32)]&1<<31-n%32))&&(i=u(i,s)),o=0!==
(s[3]&1);for(r=3;0<r;r--)s[r]=s[r]>>>1|(s[r-1]&1)<<31;s[0]>>>=1,o&&(s[0]^=-520093696
)}return i},g:function(e,t,n){var r,i=n.length;t=t.slice(0);for(r=0;r<i;r+=4)t[0
]^=4294967295&n[r],t[1]^=4294967295&n[r+1],t[2]^=4294967295&n[r+2],t[3]^=4294967295&
n[r+3],t=sjcl.mode.gcm.Z(t,e);return t},p:function(e,t,n,r,i,s){var o,u,a,f,l,c,
h,p,d=sjcl.bitArray;c=n.length,h=d.bitLength(n),p=d.bitLength(r),u=d.bitLength(i
),o=t.encrypt([0,0,0,0]),96===u?(i=i.slice(0),i=d.concat(i,[1])):(i=sjcl.mode.gcm
.g(o,[0,0,0,0],i),i=sjcl.mode.gcm.g(o,i,[0,0,Math.floor(u/4294967296),u&4294967295
])),u=sjcl.mode.gcm.g(o,[0,0,0,0],r),l=i.slice(0),r=u.slice(0),e||(r=sjcl.mode.gcm
.g(o,u,n));for(f=0;f<c;f+=4)l[3]++,a=t.encrypt(l),n[f]^=a[0],n[f+1]^=a[1],n[f+2]^=
a[2],n[f+3]^=a[3];return n=d.clamp(n,h),e&&(r=sjcl.mode.gcm.g(o,u,n)),e=[Math.floor
(p/4294967296),p&4294967295,Math.floor(h/4294967296),h&4294967295],r=sjcl.mode.gcm
.g(o,r,e),a=t.encrypt(i),r[0]^=a[0],r[1]^=a[1],r[2]^=a[2],r[3]^=a[3],{tag:d.bitSlice
(r,0,s),data:n}}},sjcl.misc.hmac=function(e,t){this.M=t=t||sjcl.hash.sha256;var n=
[[],[]],r,i=t.prototype.blockSize/32;this.n=[new t,new t],e.length>i&&(e=t.hash(
e));for(r=0;r<i;r++)n[0][r]=e[r]^909522486,n[1][r]=e[r]^1549556828;this.n[0].update
(n[0]),this.n[1].update(n[1]),this.G=new t(this.n[0])},sjcl.misc.hmac.prototype.
encrypt=sjcl.misc.hmac.prototype.mac=function(e){return this.Q&&q(new sjcl.exception
.invalid("encrypt on already updated hmac called!")),this.update(e),this.digest(
e)},sjcl.misc.hmac.prototype.reset=function(){this.G=new this.M(this.n[0]),this.
Q=u},sjcl.misc.hmac.prototype.update=function(e){this.Q=!0,this.G.update(e)},sjcl
.misc.hmac.prototype.digest=function(){var e=this.G.finalize(),e=(new this.M(this
.n[1])).update(e).finalize();return this.reset(),e},sjcl.misc.pbkdf2=function(e,
t,n,r,i){n=n||1e3,(0>r||0>n)&&q(sjcl.exception.invalid("invalid params to pbkdf2"
)),"string"==typeof e&&(e=sjcl.codec.utf8String.toBits(e)),"string"==typeof t&&(
t=sjcl.codec.utf8String.toBits(t)),i=i||sjcl.misc.hmac,e=new i(e);var s,o,u,a,f=
[],l=sjcl.bitArray;for(a=1;32*f.length<(r||1);a++){i=s=e.encrypt(l.concat(t,[a])
);for(o=1;o<n;o++){s=e.encrypt(s);for(u=0;u<s.length;u++)i[u]^=s[u]}f=f.concat(i
)}return r&&(f=l.clamp(f,r)),f},sjcl.prng=function(e){this.c=[new sjcl.hash.sha256
],this.i=[0],this.F=0,this.s={},this.C=0,this.K={},this.O=this.d=this.j=this.W=0
,this.b=[0,0,0,0,0,0,0,0],this.f=[0,0,0,0],this.A=s,this.B=e,this.q=u,this.w={progress
:{},seeded:{}},this.m=this.V=0,this.t=1,this.u=2,this.S=65536,this.I=[0,48,64,96
,128,192,256,384,512,768,1024],this.T=3e4,this.R=80},sjcl.prng.prototype={randomWords
:function(e,t){var n=[],r;r=this.isReady(t);var i;r===this.m&&q(new sjcl.exception
.notReady("generator isn't seeded"));if(r&this.u){r=!(r&this.t),i=[];var s=0,o;this
.O=i[0]=(new Date).valueOf()+this.T;for(o=0;16>o;o++)i.push(4294967296*Math.random
()|0);for(o=0;o<this.c.length&&!(i=i.concat(this.c[o].finalize()),s+=this.i[o],this
.i[o]=0,!r&&this.F&1<<o);o++);this.F>=1<<this.c.length&&(this.c.push(new sjcl.hash
.sha256),this.i.push(0)),this.d-=s,s>this.j&&(this.j=s),this.F++,this.b=sjcl.hash
.sha256.hash(this.b.concat(i)),this.A=new sjcl.cipher.aes(this.b);for(r=0;4>r&&(
this.f[r]=this.f[r]+1|0,!this.f[r]);r++);}for(r=0;r<e;r+=4)0===(r+1)%this.S&&A(this
),i=B(this),n.push(i[0],i[1],i[2],i[3]);return A(this),n.slice(0,e)},setDefaultParanoia
:function(e,t){0===e&&"Setting paranoia=0 will ruin your security; use it only for testing"!==
t&&q("Setting paranoia=0 will ruin your security; use it only for testing"),this
.B=e},addEntropy:function(e,t,n){n=n||"user";var r,i,o=(new Date).valueOf(),u=this
.s[n],a=this.isReady(),f=0;r=this.K[n],r===s&&(r=this.K[n]=this.W++),u===s&&(u=this
.s[n]=0),this.s[n]=(this.s[n]+1)%this.c.length;switch(typeof e){case"number":t===
s&&(t=1),this.c[u].update([r,this.C++,1,t,o,1,e|0]);break;case"object":n=Object.
prototype.toString.call(e);if("[object Uint32Array]"===n){i=[];for(n=0;n<e.length
;n++)i.push(e[n]);e=i}else{"[object Array]"!==n&&(f=1);for(n=0;n<e.length&&!f;n++
)"number"!=typeof e[n]&&(f=1)}if(!f){if(t===s)for(n=t=0;n<e.length;n++)for(i=e[n
];0<i;)t++,i>>>=1;this.c[u].update([r,this.C++,2,t,o,e.length].concat(e))}break;
case"string":t===s&&(t=e.length),this.c[u].update([r,this.C++,3,t,o,e.length]),this
.c[u].update(e);break;default:f=1}f&&q(new sjcl.exception.bug("random: addEntropy only supports number, array of numbers or string"
)),this.i[u]+=t,this.d+=t,a===this.m&&(this.isReady()!==this.m&&C("seeded",Math.
max(this.j,this.d)),C("progress",this.getProgress()))},isReady:function(e){return e=
this.I[e!==s?e:this.B],this.j&&this.j>=e?this.i[0]>this.R&&(new Date).valueOf()>
this.O?this.u|this.t:this.t:this.d>=e?this.u|this.m:this.m},getProgress:function(
e){return e=this.I[e?e:this.B],this.j>=e?1:this.d>e?1:this.d/e},startCollectors:
function(){this.q||(this.a={loadTimeCollector:D(this,this.aa),mouseCollector:D(this
,this.ba),keyboardCollector:D(this,this.$),accelerometerCollector:D(this,this.U)
,touchCollector:D(this,this.da)},window.addEventListener?(window.addEventListener
("load",this.a.loadTimeCollector,u),window.addEventListener("mousemove",this.a.mouseCollector
,u),window.addEventListener("keypress",this.a.keyboardCollector,u),window.addEventListener
("devicemotion",this.a.accelerometerCollector,u),window.addEventListener("touchmove"
,this.a.touchCollector,u)):document.attachEvent?(document.attachEvent("onload",this
.a.loadTimeCollector),document.attachEvent("onmousemove",this.a.mouseCollector),
document.attachEvent("keypress",this.a.keyboardCollector)):q(new sjcl.exception.
bug("can't attach event")),this.q=!0)},stopCollectors:function(){this.q&&(window
.removeEventListener?(window.removeEventListener("load",this.a.loadTimeCollector
,u),window.removeEventListener("mousemove",this.a.mouseCollector,u),window.removeEventListener
("keypress",this.a.keyboardCollector,u),window.removeEventListener("devicemotion"
,this.a.accelerometerCollector,u),window.removeEventListener("touchmove",this.a.
touchCollector,u)):document.detachEvent&&(document.detachEvent("onload",this.a.loadTimeCollector
),document.detachEvent("onmousemove",this.a.mouseCollector),document.detachEvent
("keypress",this.a.keyboardCollector)),this.q=u)},addEventListener:function(e,t)
{this.w[e][this.V++]=t},removeEventListener:function(e,t){var n,r,i=this.w[e],s=
[];for(r in i)i.hasOwnProperty(r)&&i[r]===t&&s.push(r);for(n=0;n<s.length;n++)r=
s[n],delete i[r]},$:function(){E(1)},ba:function(e){var t,n;try{t=e.x||e.clientX||
e.offsetX||0,n=e.y||e.clientY||e.offsetY||0}catch(r){n=t=0}0!=t&&0!=n&&sjcl.random
.addEntropy([t,n],2,"mouse"),E(0)},da:function(e){e=e.touches[0]||e.changedTouches
[0],sjcl.random.addEntropy([e.pageX||e.clientX,e.pageY||e.clientY],1,"touch"),E(0
)},aa:function(){E(2)},U:function(e){e=e.accelerationIncludingGravity.x||e.accelerationIncludingGravity
.y||e.accelerationIncludingGravity.z;if(window.orientation){var t=window.orientation
;"number"==typeof t&&sjcl.random.addEntropy(t,1,"accelerometer")}e&&sjcl.random.
addEntropy(e,2,"accelerometer"),E(0)}},sjcl.random=new sjcl.prng(6);e:try{var F,
G,H,I;if(I="undefined"!=typeof module){var J;if(J=module.exports){var K;try{K=require
("crypto")}catch(L){K=null}J=(G=K)&&G.randomBytes}I=J}if(I)F=G.randomBytes(128),
F=new Uint32Array((new Uint8Array(F)).buffer),sjcl.random.addEntropy(F,1024,"crypto['randomBytes']"
);else if("undefined"!=typeof window&&"undefined"!=typeof Uint32Array){H=new Uint32Array
(32);if(window.crypto&&window.crypto.getRandomValues)window.crypto.getRandomValues
(H);else{if(!window.msCrypto||!window.msCrypto.getRandomValues)break e;window.msCrypto
.getRandomValues(H)}sjcl.random.addEntropy(H,1024,"crypto['getRandomValues']")}}
catch(M){"undefined"!=typeof window&&window.console&&(console.log("There was an error collecting entropy from the browser:"
),console.log(M))}sjcl.json={defaults:{v:1,iter:1e3,ks:128,ts:64,mode:"ccm",adata
:"",cipher:"aes"},Y:function(e,t,n,r){n=n||{},r=r||{};var i=sjcl.json,s=i.e({iv:
sjcl.random.randomWords(4,0)},i.defaults),o;return i.e(s,n),n=s.adata,"string"==typeof
s.salt&&(s.salt=sjcl.codec.base64.toBits(s.salt)),"string"==typeof s.iv&&(s.iv=sjcl
.codec.base64.toBits(s.iv)),(!sjcl.mode[s.mode]||!sjcl.cipher[s.cipher]||"string"==typeof
e&&100>=s.iter||64!==s.ts&&96!==s.ts&&128!==s.ts||128!==s.ks&&192!==s.ks&&256!==
s.ks||2>s.iv.length||4<s.iv.length)&&q(new sjcl.exception.invalid("json encrypt: invalid parameters"
)),"string"==typeof e?(o=sjcl.misc.cachedPbkdf2(e,s),e=o.key.slice(0,s.ks/32),s.
salt=o.salt):sjcl.ecc&&e instanceof sjcl.ecc.elGamal.publicKey&&(o=e.kem(),s.kemtag=
o.tag,e=o.key.slice(0,s.ks/32)),"string"==typeof t&&(t=sjcl.codec.utf8String.toBits
(t)),"string"==typeof n&&(s.adata=n=sjcl.codec.utf8String.toBits(n)),o=new sjcl.
cipher[s.cipher](e),i.e(r,s),r.key=e,s.ct=sjcl.mode[s.mode].encrypt(o,t,s.iv,n,s
.ts),s},encrypt:function(e,t,n,r){var i=sjcl.json,s=i.Y.apply(i,arguments);return i
.encode(s)},X:function(e,t,n,r){n=n||{},r=r||{};var i=sjcl.json;t=i.e(i.e(i.e({}
,i.defaults),t),n,!0);var s,o;return s=t.adata,"string"==typeof t.salt&&(t.salt=
sjcl.codec.base64.toBits(t.salt)),"string"==typeof t.iv&&(t.iv=sjcl.codec.base64
.toBits(t.iv)),(!sjcl.mode[t.mode]||!sjcl.cipher[t.cipher]||"string"==typeof e&&100>=
t.iter||64!==t.ts&&96!==t.ts&&128!==t.ts||128!==t.ks&&192!==t.ks&&256!==t.ks||!t
.iv||2>t.iv.length||4<t.iv.length)&&q(new sjcl.exception.invalid("json decrypt: invalid parameters"
)),"string"==typeof e?(o=sjcl.misc.cachedPbkdf2(e,t),e=o.key.slice(0,t.ks/32),t.
salt=o.salt):sjcl.ecc&&e instanceof sjcl.ecc.elGamal.secretKey&&(e=e.unkem(sjcl.
codec.base64.toBits(t.kemtag)).slice(0,t.ks/32)),"string"==typeof s&&(s=sjcl.codec
.utf8String.toBits(s)),o=new sjcl.cipher[t.cipher](e),s=sjcl.mode[t.mode].decrypt
(o,t.ct,t.iv,s,t.ts),i.e(r,t),r.key=e,1===n.raw?s:sjcl.codec.utf8String.fromBits
(s)},decrypt:function(e,t,n,r){var i=sjcl.json;return i.X(e,i.decode(t),n,r)},encode
:function(e){var t,n="{",r="";for(t in e)if(e.hasOwnProperty(t))switch(t.match(/^[a-z0-9]+$/i
)||q(new sjcl.exception.invalid("json encode: invalid property name")),n+=r+'"'+
t+'":',r=",",typeof e[t]){case"number":case"boolean":n+=e[t];break;case"string":
n+='"'+escape(e[t])+'"';break;case"object":n+='"'+sjcl.codec.base64.fromBits(e[t
],0)+'"';break;default:q(new sjcl.exception.bug("json encode: unsupported type")
)}return n+"}"},decode:function(e){e=e.replace(/\s/g,""),e.match(/^\{.*\}$/)||q(new
sjcl.exception.invalid("json decode: this isn't json!")),e=e.replace(/^\{|\}$/g,""
).split(/,/);var t={},n,r;for(n=0;n<e.length;n++)(r=e[n].match(/^\s*(?:(["']?)([a-z][a-z0-9]*)\1)\s*:\s*(?:(-?\d+)|"([a-z0-9+\/%*_.@=\-]*)"|(true|false))$/i
))||q(new sjcl.exception.invalid("json decode: this isn't json!")),r[3]?t[r[2]]=
parseInt(r[3],10):r[4]?t[r[2]]=r[2].match(/^(ct|adata|salt|iv)$/)?sjcl.codec.base64
.toBits(r[4]):unescape(r[4]):r[5]&&(t[r[2]]="true"===r[5]);return t},e:function(
e,t,n){e===s&&(e={});if(t===s)return e;for(var r in t)t.hasOwnProperty(r)&&(n&&e
[r]!==s&&e[r]!==t[r]&&q(new sjcl.exception.invalid("required parameter overridden"
)),e[r]=t[r]);return e},fa:function(e,t){var n={},r;for(r in e)e.hasOwnProperty(
r)&&e[r]!==t[r]&&(n[r]=e[r]);return n},ea:function(e,t){var n={},r;for(r=0;r<t.length
;r++)e[t[r]]!==s&&(n[t[r]]=e[t[r]]);return n}},sjcl.encrypt=sjcl.json.encrypt,sjcl
.decrypt=sjcl.json.decrypt,sjcl.misc.ca={},sjcl.misc.cachedPbkdf2=function(e,t){
var n=sjcl.misc.ca,r;return t=t||{},r=t.iter||1e3,n=n[e]=n[e]||{},r=n[r]=n[r]||{
firstSalt:t.salt&&t.salt.length?t.salt.slice(0):sjcl.random.randomWords(2,0)},n=
t.salt===s?r.firstSalt:t.salt,r[n]=r[n]||sjcl.misc.pbkdf2(e,n,t.iter),{key:r[n].
slice(0),salt:n.slice(0)}}
local.sjcl = sjcl; }());
/* jslint-ignore-end */



// init lib sjcl.misc.scrypt
/* jslint-ignore-begin */
// https://github.com/bitwiseshiftleft/sjcl/blob/97be4f7d541c6ddbc7eafcb610b4a23a6c551d81/core/scrypt.js
(function () { var sjcl; sjcl = local.sjcl;
/** scrypt Password-Based Key-Derivation Function.
 *
 * @param {bitArray|String} password  The password.
 * @param {bitArray|String} salt      The salt.  Should have lots of entropy.
 *
 * @param {Number} [N=16384] CPU/Memory cost parameter.
 * @param {Number} [r=8]     Block size parameter.
 * @param {Number} [p=1]     Parallelization parameter.
 *
 * @param {Number} [length] The length of the derived key.  Defaults to the
 *                          output size of the hash function.
 * @param {Object} [Prff=sjcl.misc.hmac] The pseudorandom function family.
 *
 * @return {bitArray} The derived key.
 */
sjcl.misc.scrypt = function (password, salt, N, r, p, length, Prff) {
  var SIZE_MAX = Math.pow(2, 32) - 1,
      self = sjcl.misc.scrypt;

  N = N || 16384;
  r = r || 8;
  p = p || 1;

  if (r * p >= Math.pow(2, 30)) {
    throw sjcl.exception.invalid("The parameters r, p must satisfy r * p < 2^30");
  }

  if ((N < 2) || (N & (N - 1) != 0)) {
    throw sjcl.exception.invalid("The parameter N must be a power of 2.");
  }

  if (N > SIZE_MAX / 128 / r) {
    throw sjcl.exception.invalid("N too big.");
  }

  if (r > SIZE_MAX / 128 / p) {
    throw sjcl.exception.invalid("r too big.");
  }

  var blocks = sjcl.misc.pbkdf2(password, salt, 1, p * 128 * r * 8, Prff),
      len = blocks.length / p;

  self.reverse(blocks);

  for (var i = 0; i < p; i++) {
    var block = blocks.slice(i * len, (i + 1) * len);
    self.blockcopy(self.ROMix(block, N), 0, blocks, i * len);
  }

  self.reverse(blocks);

  return sjcl.misc.pbkdf2(password, blocks, 1, length, Prff);
};

sjcl.misc.scrypt.salsa20Core = function (word, rounds) {
  var R = function(a, b) { return (a << b) | (a >>> (32 - b)); };
  var x = word.slice(0);

  for (var i = rounds; i > 0; i -= 2) {
    x[ 4] ^= R(x[ 0]+x[12], 7);  x[ 8] ^= R(x[ 4]+x[ 0], 9);
    x[12] ^= R(x[ 8]+x[ 4],13);  x[ 0] ^= R(x[12]+x[ 8],18);
    x[ 9] ^= R(x[ 5]+x[ 1], 7);  x[13] ^= R(x[ 9]+x[ 5], 9);
    x[ 1] ^= R(x[13]+x[ 9],13);  x[ 5] ^= R(x[ 1]+x[13],18);
    x[14] ^= R(x[10]+x[ 6], 7);  x[ 2] ^= R(x[14]+x[10], 9);
    x[ 6] ^= R(x[ 2]+x[14],13);  x[10] ^= R(x[ 6]+x[ 2],18);
    x[ 3] ^= R(x[15]+x[11], 7);  x[ 7] ^= R(x[ 3]+x[15], 9);
    x[11] ^= R(x[ 7]+x[ 3],13);  x[15] ^= R(x[11]+x[ 7],18);
    x[ 1] ^= R(x[ 0]+x[ 3], 7);  x[ 2] ^= R(x[ 1]+x[ 0], 9);
    x[ 3] ^= R(x[ 2]+x[ 1],13);  x[ 0] ^= R(x[ 3]+x[ 2],18);
    x[ 6] ^= R(x[ 5]+x[ 4], 7);  x[ 7] ^= R(x[ 6]+x[ 5], 9);
    x[ 4] ^= R(x[ 7]+x[ 6],13);  x[ 5] ^= R(x[ 4]+x[ 7],18);
    x[11] ^= R(x[10]+x[ 9], 7);  x[ 8] ^= R(x[11]+x[10], 9);
    x[ 9] ^= R(x[ 8]+x[11],13);  x[10] ^= R(x[ 9]+x[ 8],18);
    x[12] ^= R(x[15]+x[14], 7);  x[13] ^= R(x[12]+x[15], 9);
    x[14] ^= R(x[13]+x[12],13);  x[15] ^= R(x[14]+x[13],18);
  }

  for (i = 0; i < 16; i++) word[i] = x[i]+word[i];
};

sjcl.misc.scrypt.blockMix = function(blocks) {
  var X = blocks.slice(-16),
      out = [],
      len = blocks.length / 16,
      self = sjcl.misc.scrypt;

  for (var i = 0; i < len; i++) {
    self.blockxor(blocks, 16 * i, X, 0, 16);
    self.salsa20Core(X, 8);

    if ((i & 1) == 0) {
      self.blockcopy(X, 0, out, 8 * i);
    } else {
      self.blockcopy(X, 0, out, 8 * (i^1 + len));
    }
  }

  return out;
};

sjcl.misc.scrypt.ROMix = function(block, N) {
  var X = block.slice(0),
      V = [],
      self = sjcl.misc.scrypt;

  for (var i = 0; i < N; i++) {
    V.push(X.slice(0));
    X = self.blockMix(X);
  }

  for (i = 0; i < N; i++) {
    var j = X[X.length - 16] & (N - 1);

    self.blockxor(V[j], 0, X, 0);
    X = self.blockMix(X);
  }

  return X;
};

sjcl.misc.scrypt.reverse = function (words) { // Converts Big <-> Little Endian words
  for (var i in words) {
    var out = words[i] &  0xFF;
    out = (out << 8) | (words[i] >>>  8) & 0xFF;
    out = (out << 8) | (words[i] >>> 16) & 0xFF;
    out = (out << 8) | (words[i] >>> 24) & 0xFF;

    words[i] = out;
  }
};

sjcl.misc.scrypt.blockcopy = function (S, Si, D, Di, len) {
  var i;

  len = len || (S.length - Si);

  for (i = 0; i < len; i++) D[Di + i] = S[Si + i] | 0;
};

sjcl.misc.scrypt.blockxor = function(S, Si, D, Di, len) {
  var i;

  len = len || (S.length - Si);

  for (i = 0; i < len; i++) D[Di + i] = (D[Di + i] ^ S[Si + i]) | 0;
};
}());
/* jslint-ignore-end */
    }());
    switch (local.modeJs) {



    // run browser js-env code - post-init
    case 'browser':
        // init exports
        local.global.utility2_sjcl = local.sjcl;
        break;



    // run node js-env code - post-init
    case 'node':
        // init exports
        module.exports = module['./lib.sjcl.js'] = local.sjcl;
        break;
    }
}());
