(function () {
  'use strict';

  /**
  * vue v3.4.23
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  window.Vue=function(e){/*! #__NO_SIDE_EFFECTS__ */function t(e,t){const n=new Set(e.split(","));return t?e=>n.has(e.toLowerCase()):e=>n.has(e)}const n={},s=[],o=()=>{},r=()=>!1,i=e=>111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),l=e=>e.startsWith("onUpdate:"),c=Object.assign,a=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1);},u=Object.prototype.hasOwnProperty,d=(e,t)=>u.call(e,t),p=Array.isArray,h=e=>"[object Map]"===x(e),f=e=>"[object Set]"===x(e),m=e=>"[object Date]"===x(e),g=e=>"function"==typeof e,v=e=>"string"==typeof e,y=e=>"symbol"==typeof e,b=e=>null!==e&&"object"==typeof e,_=e=>(b(e)||g(e))&&g(e.then)&&g(e.catch),S=Object.prototype.toString,x=e=>S.call(e),C=e=>x(e).slice(8,-1),k=e=>"[object Object]"===x(e),T=e=>v(e)&&"NaN"!==e&&"-"!==e[0]&&""+parseInt(e,10)===e,w=t(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),A=t("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"),E=e=>{const t=Object.create(null);return n=>t[n]||(t[n]=e(n))},N=/-(\w)/g,I=E((e=>e.replace(N,((e,t)=>t?t.toUpperCase():"")))),R=/\B([A-Z])/g,O=E((e=>e.replace(R,"-$1").toLowerCase())),L=E((e=>e.charAt(0).toUpperCase()+e.slice(1))),F=E((e=>e?`on${L(e)}`:"")),M=(e,t)=>!Object.is(e,t),P=(e,t)=>{for(let n=0;n<e.length;n++)e[n](t);},$=(e,t,n)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:n});},B=e=>{const t=parseFloat(e);return isNaN(t)?e:t},V=e=>{const t=v(e)?Number(e):NaN;return isNaN(t)?e:t};let D;const U=()=>D||(D="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}),j=t("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error");function H(e){if(p(e)){const t={};for(let n=0;n<e.length;n++){const s=e[n],o=v(s)?z(s):H(s);if(o)for(const e in o)t[e]=o[e];}return t}if(v(e)||b(e))return e}const q=/;(?![^(]*\))/g,W=/:([^]+)/,K=/\/\*[^]*?\*\//g;function z(e){const t={};return e.replace(K,"").split(q).forEach((e=>{if(e){const n=e.split(W);n.length>1&&(t[n[0].trim()]=n[1].trim());}})),t}function G(e){let t="";if(v(e))t=e;else if(p(e))for(let n=0;n<e.length;n++){const s=G(e[n]);s&&(t+=s+" ");}else if(b(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const J=t("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot"),X=t("svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view"),Q=t("annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics"),Z=t("area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr"),Y=t("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");function ee(e){return !!e||""===e}function te(e,t){if(e===t)return !0;let n=m(e),s=m(t);if(n||s)return !(!n||!s)&&e.getTime()===t.getTime();if(n=y(e),s=y(t),n||s)return e===t;if(n=p(e),s=p(t),n||s)return !(!n||!s)&&function(e,t){if(e.length!==t.length)return !1;let n=!0;for(let s=0;n&&s<e.length;s++)n=te(e[s],t[s]);return n}(e,t);if(n=b(e),s=b(t),n||s){if(!n||!s)return !1;if(Object.keys(e).length!==Object.keys(t).length)return !1;for(const n in e){const s=e.hasOwnProperty(n),o=t.hasOwnProperty(n);if(s&&!o||!s&&o||!te(e[n],t[n]))return !1}}return String(e)===String(t)}function ne(e,t){return e.findIndex((e=>te(e,t)))}const se=(e,t)=>t&&t.__v_isRef?se(e,t.value):h(t)?{[`Map(${t.size})`]:[...t.entries()].reduce(((e,[t,n],s)=>(e[oe(t,s)+" =>"]=n,e)),{})}:f(t)?{[`Set(${t.size})`]:[...t.values()].map((e=>oe(e)))}:y(t)?oe(t):!b(t)||p(t)||k(t)?t:String(t),oe=(e,t="")=>{var n;return y(e)?`Symbol(${null!=(n=e.description)?n:t})`:e};let re,ie;class le{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this.parent=re,!e&&re&&(this.index=(re.scopes||(re.scopes=[])).push(this)-1);}get active(){return this._active}run(e){if(this._active){const t=re;try{return re=this,e()}finally{re=t;}}}on(){re=this;}off(){re=this.parent;}stop(e){if(this._active){let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);if(!this.detached&&this.parent&&!e){const e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index);}this.parent=void 0,this._active=!1;}}}function ce(e,t=re){t&&t.active&&t.effects.push(e);}function ae(){return re}class ue{constructor(e,t,n,s){this.fn=e,this.trigger=t,this.scheduler=n,this.active=!0,this.deps=[],this._dirtyLevel=4,this._trackId=0,this._runnings=0,this._shouldSchedule=!1,this._depsLength=0,ce(this,s);}get dirty(){if(2===this._dirtyLevel||3===this._dirtyLevel){this._dirtyLevel=1,ye();for(let e=0;e<this._depsLength;e++){const t=this.deps[e];if(t.computed&&(de(t.computed),this._dirtyLevel>=4))break}1===this._dirtyLevel&&(this._dirtyLevel=0),be();}return this._dirtyLevel>=4}set dirty(e){this._dirtyLevel=e?4:0;}run(){if(this._dirtyLevel=0,!this.active)return this.fn();let e=me,t=ie;try{return me=!0,ie=this,this._runnings++,pe(this),this.fn()}finally{he(this),this._runnings--,ie=t,me=e;}}stop(){var e;this.active&&(pe(this),he(this),null==(e=this.onStop)||e.call(this),this.active=!1);}}function de(e){return e.value}function pe(e){e._trackId++,e._depsLength=0;}function he(e){if(e.deps.length>e._depsLength){for(let t=e._depsLength;t<e.deps.length;t++)fe(e.deps[t],e);e.deps.length=e._depsLength;}}function fe(e,t){const n=e.get(t);void 0!==n&&t._trackId!==n&&(e.delete(t),0===e.size&&e.cleanup());}let me=!0,ge=0;const ve=[];function ye(){ve.push(me),me=!1;}function be(){const e=ve.pop();me=void 0===e||e;}function _e(){ge++;}function Se(){for(ge--;!ge&&Ce.length;)Ce.shift()();}function xe(e,t,n){if(t.get(e)!==e._trackId){t.set(e,e._trackId);const n=e.deps[e._depsLength];n!==t?(n&&fe(n,e),e.deps[e._depsLength++]=t):e._depsLength++;}}const Ce=[];function ke(e,t,n){_e();for(const s of e.keys()){let n;s._dirtyLevel<t&&(null!=n?n:n=e.get(s)===s._trackId)&&(s._shouldSchedule||(s._shouldSchedule=0===s._dirtyLevel),s._dirtyLevel=t),s._shouldSchedule&&(null!=n?n:n=e.get(s)===s._trackId)&&(s.trigger(),s._runnings&&!s.allowRecurse||2===s._dirtyLevel||(s._shouldSchedule=!1,s.scheduler&&Ce.push(s.scheduler)));}Se();}const Te=(e,t)=>{const n=new Map;return n.cleanup=e,n.computed=t,n},we=new WeakMap,Ae=Symbol(""),Ee=Symbol("");function Ne(e,t,n){if(me&&ie){let t=we.get(e);t||we.set(e,t=new Map);let s=t.get(n);s||t.set(n,s=Te((()=>t.delete(n)))),xe(ie,s);}}function Ie(e,t,n,s,o,r){const i=we.get(e);if(!i)return;let l=[];if("clear"===t)l=[...i.values()];else if("length"===n&&p(e)){const e=Number(s);i.forEach(((t,n)=>{("length"===n||!y(n)&&n>=e)&&l.push(t);}));}else switch(void 0!==n&&l.push(i.get(n)),t){case"add":p(e)?T(n)&&l.push(i.get("length")):(l.push(i.get(Ae)),h(e)&&l.push(i.get(Ee)));break;case"delete":p(e)||(l.push(i.get(Ae)),h(e)&&l.push(i.get(Ee)));break;case"set":h(e)&&l.push(i.get(Ae));}_e();for(const c of l)c&&ke(c,4);Se();}const Re=t("__proto__,__v_isRef,__isVue"),Oe=new Set(Object.getOwnPropertyNames(Symbol).filter((e=>"arguments"!==e&&"caller"!==e)).map((e=>Symbol[e])).filter(y)),Le=Fe();function Fe(){const e={};return ["includes","indexOf","lastIndexOf"].forEach((t=>{e[t]=function(...e){const n=Ct(this);for(let t=0,o=this.length;t<o;t++)Ne(n,0,t+"");const s=n[t](...e);return -1===s||!1===s?n[t](...e.map(Ct)):s};})),["push","pop","shift","unshift","splice"].forEach((t=>{e[t]=function(...e){ye(),_e();const n=Ct(this)[t].apply(this,e);return Se(),be(),n};})),e}function Me(e){y(e)||(e=String(e));const t=Ct(this);return Ne(t,0,e),t.hasOwnProperty(e)}class Pe{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t;}get(e,t,n){const s=this._isReadonly,o=this._isShallow;if("__v_isReactive"===t)return !s;if("__v_isReadonly"===t)return s;if("__v_isShallow"===t)return o;if("__v_raw"===t)return n===(s?o?ft:ht:o?pt:dt).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;const r=p(e);if(!s){if(r&&d(Le,t))return Reflect.get(Le,t,n);if("hasOwnProperty"===t)return Me}const i=Reflect.get(e,t,n);return (y(t)?Oe.has(t):Re(t))?i:(s||Ne(e,0,t),o?i:It(i)?r&&T(t)?i:i.value:b(i)?s?vt(i):mt(i):i)}}class $e extends Pe{constructor(e=!1){super(!1,e);}set(e,t,n,s){let o=e[t];if(!this._isShallow){const t=_t(o);if(St(n)||_t(n)||(o=Ct(o),n=Ct(n)),!p(e)&&It(o)&&!It(n))return !t&&(o.value=n,!0)}const r=p(e)&&T(t)?Number(t)<e.length:d(e,t),i=Reflect.set(e,t,n,s);return e===Ct(s)&&(r?M(n,o)&&Ie(e,"set",t,n):Ie(e,"add",t,n)),i}deleteProperty(e,t){const n=d(e,t),s=Reflect.deleteProperty(e,t);return s&&n&&Ie(e,"delete",t,void 0),s}has(e,t){const n=Reflect.has(e,t);return y(t)&&Oe.has(t)||Ne(e,0,t),n}ownKeys(e){return Ne(e,0,p(e)?"length":Ae),Reflect.ownKeys(e)}}class Be extends Pe{constructor(e=!1){super(!0,e);}set(e,t){return !0}deleteProperty(e,t){return !0}}const Ve=new $e,De=new Be,Ue=new $e(!0),je=new Be(!0),He=e=>e,qe=e=>Reflect.getPrototypeOf(e);function We(e,t,n=!1,s=!1){const o=Ct(e=e.__v_raw),r=Ct(t);n||(M(t,r)&&Ne(o,0,t),Ne(o,0,r));const{has:i}=qe(o),l=s?He:n?wt:Tt;return i.call(o,t)?l(e.get(t)):i.call(o,r)?l(e.get(r)):void(e!==o&&e.get(t))}function Ke(e,t=!1){const n=this.__v_raw,s=Ct(n),o=Ct(e);return t||(M(e,o)&&Ne(s,0,e),Ne(s,0,o)),e===o?n.has(e):n.has(e)||n.has(o)}function ze(e,t=!1){return e=e.__v_raw,!t&&Ne(Ct(e),0,Ae),Reflect.get(e,"size",e)}function Ge(e){e=Ct(e);const t=Ct(this);return qe(t).has.call(t,e)||(t.add(e),Ie(t,"add",e,e)),this}function Je(e,t){t=Ct(t);const n=Ct(this),{has:s,get:o}=qe(n);let r=s.call(n,e);r||(e=Ct(e),r=s.call(n,e));const i=o.call(n,e);return n.set(e,t),r?M(t,i)&&Ie(n,"set",e,t):Ie(n,"add",e,t),this}function Xe(e){const t=Ct(this),{has:n,get:s}=qe(t);let o=n.call(t,e);o||(e=Ct(e),o=n.call(t,e)),s&&s.call(t,e);const r=t.delete(e);return o&&Ie(t,"delete",e,void 0),r}function Qe(){const e=Ct(this),t=0!==e.size,n=e.clear();return t&&Ie(e,"clear",void 0,void 0),n}function Ze(e,t){return function(n,s){const o=this,r=o.__v_raw,i=Ct(r),l=t?He:e?wt:Tt;return !e&&Ne(i,0,Ae),r.forEach(((e,t)=>n.call(s,l(e),l(t),o)))}}function Ye(e,t,n){return function(...s){const o=this.__v_raw,r=Ct(o),i=h(r),l="entries"===e||e===Symbol.iterator&&i,c="keys"===e&&i,a=o[e](...s),u=n?He:t?wt:Tt;return !t&&Ne(r,0,c?Ee:Ae),{next(){const{value:e,done:t}=a.next();return t?{value:e,done:t}:{value:l?[u(e[0]),u(e[1])]:u(e),done:t}},[Symbol.iterator](){return this}}}}function et(e){return function(...t){return "delete"!==e&&("clear"===e?void 0:this)}}function tt(){const e={get(e){return We(this,e)},get size(){return ze(this)},has:Ke,add:Ge,set:Je,delete:Xe,clear:Qe,forEach:Ze(!1,!1)},t={get(e){return We(this,e,!1,!0)},get size(){return ze(this)},has:Ke,add:Ge,set:Je,delete:Xe,clear:Qe,forEach:Ze(!1,!0)},n={get(e){return We(this,e,!0)},get size(){return ze(this,!0)},has(e){return Ke.call(this,e,!0)},add:et("add"),set:et("set"),delete:et("delete"),clear:et("clear"),forEach:Ze(!0,!1)},s={get(e){return We(this,e,!0,!0)},get size(){return ze(this,!0)},has(e){return Ke.call(this,e,!0)},add:et("add"),set:et("set"),delete:et("delete"),clear:et("clear"),forEach:Ze(!0,!0)};return ["keys","values","entries",Symbol.iterator].forEach((o=>{e[o]=Ye(o,!1,!1),n[o]=Ye(o,!0,!1),t[o]=Ye(o,!1,!0),s[o]=Ye(o,!0,!0);})),[e,n,t,s]}const[nt,st,ot,rt]=tt();function it(e,t){const n=t?e?rt:ot:e?st:nt;return (t,s,o)=>"__v_isReactive"===s?!e:"__v_isReadonly"===s?e:"__v_raw"===s?t:Reflect.get(d(n,s)&&s in t?n:t,s,o)}const lt={get:it(!1,!1)},ct={get:it(!1,!0)},at={get:it(!0,!1)},ut={get:it(!0,!0)},dt=new WeakMap,pt=new WeakMap,ht=new WeakMap,ft=new WeakMap;function mt(e){return _t(e)?e:yt(e,!1,Ve,lt,dt)}function gt(e){return yt(e,!1,Ue,ct,pt)}function vt(e){return yt(e,!0,De,at,ht)}function yt(e,t,n,s,o){if(!b(e))return e;if(e.__v_raw&&(!t||!e.__v_isReactive))return e;const r=o.get(e);if(r)return r;const i=(l=e).__v_skip||!Object.isExtensible(l)?0:function(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}(C(l));var l;if(0===i)return e;const c=new Proxy(e,2===i?s:n);return o.set(e,c),c}function bt(e){return _t(e)?bt(e.__v_raw):!(!e||!e.__v_isReactive)}function _t(e){return !(!e||!e.__v_isReadonly)}function St(e){return !(!e||!e.__v_isShallow)}function xt(e){return !!e&&!!e.__v_raw}function Ct(e){const t=e&&e.__v_raw;return t?Ct(t):e}function kt(e){return Object.isExtensible(e)&&$(e,"__v_skip",!0),e}const Tt=e=>b(e)?mt(e):e,wt=e=>b(e)?vt(e):e;class At{constructor(e,t,n,s){this.getter=e,this._setter=t,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this.effect=new ue((()=>e(this._value)),(()=>Nt(this,2===this.effect._dirtyLevel?2:3))),this.effect.computed=this,this.effect.active=this._cacheable=!s,this.__v_isReadonly=n;}get value(){const e=Ct(this);return e._cacheable&&!e.effect.dirty||!M(e._value,e._value=e.effect.run())||Nt(e,4),Et(e),e.effect._dirtyLevel>=2&&Nt(e,2),e._value}set value(e){this._setter(e);}get _dirty(){return this.effect.dirty}set _dirty(e){this.effect.dirty=e;}}function Et(e){var t;me&&ie&&(e=Ct(e),xe(ie,null!=(t=e.dep)?t:e.dep=Te((()=>e.dep=void 0),e instanceof At?e:void 0)));}function Nt(e,t=4,n){const s=(e=Ct(e)).dep;s&&ke(s,t);}function It(e){return !(!e||!0!==e.__v_isRef)}function Rt(e){return Ot(e,!1)}function Ot(e,t){return It(e)?e:new Lt(e,t)}class Lt{constructor(e,t){this.__v_isShallow=t,this.dep=void 0,this.__v_isRef=!0,this._rawValue=t?e:Ct(e),this._value=t?e:Tt(e);}get value(){return Et(this),this._value}set value(e){const t=this.__v_isShallow||St(e)||_t(e);e=t?e:Ct(e),M(e,this._rawValue)&&(this._rawValue=e,this._value=t?e:Tt(e),Nt(this,4));}}function Ft(e){return It(e)?e.value:e}const Mt={get:(e,t,n)=>Ft(Reflect.get(e,t,n)),set:(e,t,n,s)=>{const o=e[t];return It(o)&&!It(n)?(o.value=n,!0):Reflect.set(e,t,n,s)}};function Pt(e){return bt(e)?e:new Proxy(e,Mt)}class $t{constructor(e){this.dep=void 0,this.__v_isRef=!0;const{get:t,set:n}=e((()=>Et(this)),(()=>Nt(this)));this._get=t,this._set=n;}get value(){return this._get()}set value(e){this._set(e);}}function Bt(e){return new $t(e)}class Vt{constructor(e,t,n){this._object=e,this._key=t,this._defaultValue=n,this.__v_isRef=!0;}get value(){const e=this._object[this._key];return void 0===e?this._defaultValue:e}set value(e){this._object[this._key]=e;}get dep(){return e=Ct(this._object),t=this._key,null==(n=we.get(e))?void 0:n.get(t);var e,t,n;}}class Dt{constructor(e){this._getter=e,this.__v_isRef=!0,this.__v_isReadonly=!0;}get value(){return this._getter()}}function Ut(e,t,n){const s=e[t];return It(s)?s:new Vt(e,t,n)}function jt(e,t,n,s){try{return s?e(...s):e()}catch(o){qt(o,t,n);}}function Ht(e,t,n,s){if(g(e)){const o=jt(e,t,n,s);return o&&_(o)&&o.catch((e=>{qt(e,t,n);})),o}if(p(e)){const o=[];for(let r=0;r<e.length;r++)o.push(Ht(e[r],t,n,s));return o}}function qt(e,t,n,s=!0){if(t){let s=t.parent;const o=t.proxy,r=`https://vuejs.org/error-reference/#runtime-${n}`;for(;s;){const t=s.ec;if(t)for(let n=0;n<t.length;n++)if(!1===t[n](e,o,r))return;s=s.parent;}const i=t.appContext.config.errorHandler;if(i)return ye(),jt(i,null,10,[e,o,r]),void be()}!function(e,t,n,s=!0){console.error(e);}(e,0,0,s);}let Wt=!1,Kt=!1;const zt=[];let Gt=0;const Jt=[];let Xt=null,Qt=0;const Zt=Promise.resolve();let Yt=null;function en(e){const t=Yt||Zt;return e?t.then(this?e.bind(this):e):t}function tn(e){zt.length&&zt.includes(e,Wt&&e.allowRecurse?Gt+1:Gt)||(null==e.id?zt.push(e):zt.splice(function(e){let t=Gt+1,n=zt.length;for(;t<n;){const s=t+n>>>1,o=zt[s],r=ln(o);r<e||r===e&&o.pre?t=s+1:n=s;}return t}(e.id),0,e),nn());}function nn(){Wt||Kt||(Kt=!0,Yt=Zt.then(an));}function sn(e){p(e)?Jt.push(...e):Xt&&Xt.includes(e,e.allowRecurse?Qt+1:Qt)||Jt.push(e),nn();}function on(e,t,n=(Wt?Gt+1:0)){for(;n<zt.length;n++){const t=zt[n];if(t&&t.pre){if(e&&t.id!==e.uid)continue;zt.splice(n,1),n--,t();}}}function rn(e){if(Jt.length){const e=[...new Set(Jt)].sort(((e,t)=>ln(e)-ln(t)));if(Jt.length=0,Xt)return void Xt.push(...e);for(Xt=e,Qt=0;Qt<Xt.length;Qt++)Xt[Qt]();Xt=null,Qt=0;}}const ln=e=>null==e.id?1/0:e.id,cn=(e,t)=>{const n=ln(e)-ln(t);if(0===n){if(e.pre&&!t.pre)return -1;if(t.pre&&!e.pre)return 1}return n};function an(e){Kt=!1,Wt=!0,zt.sort(cn);try{for(Gt=0;Gt<zt.length;Gt++){const e=zt[Gt];e&&!1!==e.active&&jt(e,null,14);}}finally{Gt=0,zt.length=0,rn(),Wt=!1,Yt=null,(zt.length||Jt.length)&&an();}}function un(e,t,...s){if(e.isUnmounted)return;const o=e.vnode.props||n;let r=s;const i=t.startsWith("update:"),l=i&&t.slice(7);if(l&&l in o){const e=`${"modelValue"===l?"model":l}Modifiers`,{number:t,trim:i}=o[e]||n;i&&(r=s.map((e=>v(e)?e.trim():e))),t&&(r=s.map(B));}let c,a=o[c=F(t)]||o[c=F(I(t))];!a&&i&&(a=o[c=F(O(t))]),a&&Ht(a,e,6,r);const u=o[c+"Once"];if(u){if(e.emitted){if(e.emitted[c])return}else e.emitted={};e.emitted[c]=!0,Ht(u,e,6,r);}}function dn(e,t,n=!1){const s=t.emitsCache,o=s.get(e);if(void 0!==o)return o;const r=e.emits;let i={},l=!1;if(!g(e)){const s=e=>{const n=dn(e,t,!0);n&&(l=!0,c(i,n));};!n&&t.mixins.length&&t.mixins.forEach(s),e.extends&&s(e.extends),e.mixins&&e.mixins.forEach(s);}return r||l?(p(r)?r.forEach((e=>i[e]=null)):c(i,r),b(e)&&s.set(e,i),i):(b(e)&&s.set(e,null),null)}function pn(e,t){return !(!e||!i(t))&&(t=t.slice(2).replace(/Once$/,""),d(e,t[0].toLowerCase()+t.slice(1))||d(e,O(t))||d(e,t))}let hn=null,fn=null;function mn(e){const t=hn;return hn=e,fn=e&&e.type.__scopeId||null,t}function gn(e,t=hn,n){if(!t)return e;if(e._n)return e;const s=(...n)=>{s._d&&Ko(-1);const o=mn(t);let r;try{r=e(...n);}finally{mn(o),s._d&&Ko(1);}return r};return s._n=!0,s._c=!0,s._d=!0,s}function vn(e){const{type:t,vnode:n,proxy:s,withProxy:o,props:r,propsOptions:[i],slots:c,attrs:a,emit:u,render:d,renderCache:p,data:h,setupState:f,ctx:m,inheritAttrs:g}=e;let v,y;const b=mn(e);try{if(4&n.shapeFlag){const e=o||s;v=or(d.call(e,e,p,r,f,h,m)),y=a;}else {const e=t;0,v=or(e(r,e.length>1?{attrs:a,slots:c,emit:u}:null)),y=t.props?a:yn(a);}}catch(S){Uo.length=0,qt(S,e,1),v=er(Vo);}let _=v;if(y&&!1!==g){const e=Object.keys(y),{shapeFlag:t}=_;e.length&&7&t&&(i&&e.some(l)&&(y=bn(y,i)),_=nr(_,y));}return n.dirs&&(_=nr(_),_.dirs=_.dirs?_.dirs.concat(n.dirs):n.dirs),n.transition&&(_.transition=n.transition),v=_,mn(b),v}const yn=e=>{let t;for(const n in e)("class"===n||"style"===n||i(n))&&((t||(t={}))[n]=e[n]);return t},bn=(e,t)=>{const n={};for(const s in e)l(s)&&s.slice(9)in t||(n[s]=e[s]);return n};function _n(e,t,n){const s=Object.keys(t);if(s.length!==Object.keys(e).length)return !0;for(let o=0;o<s.length;o++){const r=s[o];if(t[r]!==e[r]&&!pn(n,r))return !0}return !1}function Sn({vnode:e,parent:t},n){for(;t;){const s=t.subTree;if(s.suspense&&s.suspense.activeBranch===e&&(s.el=e.el),s!==e)break;(e=t.vnode).el=n,t=t.parent;}}const xn="components";const Cn=Symbol.for("v-ndc");function kn(e,t,n=!0,s=!1){const o=hn||dr;if(o){const n=o.type;if(e===xn){const e=Ar(n,!1);if(e&&(e===t||e===I(t)||e===L(I(t))))return n}const r=Tn(o[e]||n[e],t)||Tn(o.appContext[e],t);return !r&&s?n:r}}function Tn(e,t){return e&&(e[t]||e[I(t)]||e[L(I(t))])}const wn=e=>e.__isSuspense;let An=0;const En={name:"Suspense",__isSuspense:!0,process(e,t,n,s,o,r,i,l,c,a){if(null==e)!function(e,t,n,s,o,r,i,l,c){const{p:a,o:{createElement:u}}=c,d=u("div"),p=e.suspense=In(e,o,s,t,d,n,r,i,l,c);a(null,p.pendingBranch=e.ssContent,d,null,s,p,r,i),p.deps>0?(Nn(e,"onPending"),Nn(e,"onFallback"),a(null,e.ssFallback,t,n,s,null,r,i),Ln(p,e.ssFallback)):p.resolve(!1,!0);}(t,n,s,o,r,i,l,c,a);else {if(r&&r.deps>0&&!e.suspense.isInFallback)return t.suspense=e.suspense,t.suspense.vnode=t,void(t.el=e.el);!function(e,t,n,s,o,r,i,l,{p:c,um:a,o:{createElement:u}}){const d=t.suspense=e.suspense;d.vnode=t,t.el=e.el;const p=t.ssContent,h=t.ssFallback,{activeBranch:f,pendingBranch:m,isInFallback:g,isHydrating:v}=d;if(m)d.pendingBranch=p,Xo(p,m)?(c(m,p,d.hiddenContainer,null,o,d,r,i,l),d.deps<=0?d.resolve():g&&(v||(c(f,h,n,s,o,null,r,i,l),Ln(d,h)))):(d.pendingId=An++,v?(d.isHydrating=!1,d.activeBranch=m):a(m,o,d),d.deps=0,d.effects.length=0,d.hiddenContainer=u("div"),g?(c(null,p,d.hiddenContainer,null,o,d,r,i,l),d.deps<=0?d.resolve():(c(f,h,n,s,o,null,r,i,l),Ln(d,h))):f&&Xo(p,f)?(c(f,p,n,s,o,d,r,i,l),d.resolve(!0)):(c(null,p,d.hiddenContainer,null,o,d,r,i,l),d.deps<=0&&d.resolve()));else if(f&&Xo(p,f))c(f,p,n,s,o,d,r,i,l),Ln(d,p);else if(Nn(t,"onPending"),d.pendingBranch=p,d.pendingId=512&p.shapeFlag?p.component.suspenseId:An++,c(null,p,d.hiddenContainer,null,o,d,r,i,l),d.deps<=0)d.resolve();else {const{timeout:e,pendingId:t}=d;e>0?setTimeout((()=>{d.pendingId===t&&d.fallback(h);}),e):0===e&&d.fallback(h);}}(e,t,n,s,o,i,l,c,a);}},hydrate:function(e,t,n,s,o,r,i,l,c){const a=t.suspense=In(t,s,n,e.parentNode,document.createElement("div"),null,o,r,i,l,!0),u=c(e,a.pendingBranch=t.ssContent,n,a,r,i);0===a.deps&&a.resolve(!1,!0);return u},create:In,normalize:function(e){const{shapeFlag:t,children:n}=e,s=32&t;e.ssContent=Rn(s?n.default:n),e.ssFallback=s?Rn(n.fallback):er(Vo);}};function Nn(e,t){const n=e.props&&e.props[t];g(n)&&n();}function In(e,t,n,s,o,r,i,l,c,a,u=!1){const{p:d,m:p,um:h,n:f,o:{parentNode:m,remove:g}}=a;let v;const y=function(e){var t;return null!=(null==(t=e.props)?void 0:t.suspensible)&&!1!==e.props.suspensible}(e);y&&(null==t?void 0:t.pendingBranch)&&(v=t.pendingId,t.deps++);const b=e.props?V(e.props.timeout):void 0,_=r,S={vnode:e,parent:t,parentComponent:n,namespace:i,container:s,hiddenContainer:o,deps:0,pendingId:An++,timeout:"number"==typeof b?b:-1,activeBranch:null,pendingBranch:null,isInFallback:!u,isHydrating:u,isUnmounted:!1,effects:[],resolve(e=!1,n=!1){const{vnode:s,activeBranch:o,pendingBranch:i,pendingId:l,effects:c,parentComponent:a,container:u}=S;let d=!1;S.isHydrating?S.isHydrating=!1:e||(d=o&&i.transition&&"out-in"===i.transition.mode,d&&(o.transition.afterLeave=()=>{l===S.pendingId&&(p(i,u,r===_?f(o):r,0),sn(c));}),o&&(m(o.el)!==S.hiddenContainer&&(r=f(o)),h(o,a,S,!0)),d||p(i,u,r,0)),Ln(S,i),S.pendingBranch=null,S.isInFallback=!1;let g=S.parent,b=!1;for(;g;){if(g.pendingBranch){g.effects.push(...c),b=!0;break}g=g.parent;}b||d||sn(c),S.effects=[],y&&t&&t.pendingBranch&&v===t.pendingId&&(t.deps--,0!==t.deps||n||t.resolve()),Nn(s,"onResolve");},fallback(e){if(!S.pendingBranch)return;const{vnode:t,activeBranch:n,parentComponent:s,container:o,namespace:r}=S;Nn(t,"onFallback");const i=f(n),a=()=>{S.isInFallback&&(d(null,e,o,i,s,null,r,l,c),Ln(S,e));},u=e.transition&&"out-in"===e.transition.mode;u&&(n.transition.afterLeave=a),S.isInFallback=!0,h(n,s,null,!0),u||a();},move(e,t,n){S.activeBranch&&p(S.activeBranch,e,t,n),S.container=e;},next:()=>S.activeBranch&&f(S.activeBranch),registerDep(e,t){const n=!!S.pendingBranch;n&&S.deps++;const s=e.vnode.el;e.asyncDep.catch((t=>{qt(t,e,0);})).then((o=>{if(e.isUnmounted||S.isUnmounted||S.pendingId!==e.suspenseId)return;e.asyncResolved=!0;const{vnode:r}=e;Sr(e,o,!1),s&&(r.el=s);const l=!s&&e.subTree.el;t(e,r,m(s||e.subTree.el),s?null:f(e.subTree),S,i,c),l&&g(l),Sn(e,r.el),n&&0==--S.deps&&S.resolve();}));},unmount(e,t){S.isUnmounted=!0,S.activeBranch&&h(S.activeBranch,n,e,t),S.pendingBranch&&h(S.pendingBranch,n,e,t);}};return S}function Rn(e){let t;if(g(e)){const n=Wo&&e._c;n&&(e._d=!1,Ho()),e=e(),n&&(e._d=!0,t=jo,qo());}if(p(e)){const t=function(e,t=!0){let n;for(let s=0;s<e.length;s++){const t=e[s];if(!Jo(t))return;if(t.type!==Vo||"v-if"===t.children){if(n)return;n=t;}}return n}(e);e=t;}return e=or(e),t&&!e.dynamicChildren&&(e.dynamicChildren=t.filter((t=>t!==e))),e}function On(e,t){t&&t.pendingBranch?p(e)?t.effects.push(...e):t.effects.push(e):sn(e);}function Ln(e,t){e.activeBranch=t;const{vnode:n,parentComponent:s}=e;let o=t.el;for(;!o&&t.component;)o=(t=t.component.subTree).el;n.el=o,s&&s.subTree===n&&(s.vnode.el=o,Sn(s,o));}const Fn=Symbol.for("v-scx");function Mn(e,t){return Vn(e,null,{flush:"post"})}function Pn(e,t){return Vn(e,null,{flush:"sync"})}const $n={};function Bn(e,t,n){return Vn(e,t,n)}function Vn(e,t,{immediate:s,deep:r,flush:i,once:l}=n){if(t&&l){const e=t;t=(...t)=>{e(...t),C();};}const c=dr,u=e=>!0===r?e:jn(e,!1===r?1:void 0);let d,h,f=!1,m=!1;if(It(e)?(d=()=>e.value,f=St(e)):bt(e)?(d=()=>u(e),f=!0):p(e)?(m=!0,f=e.some((e=>bt(e)||St(e))),d=()=>e.map((e=>It(e)?e.value:bt(e)?u(e):g(e)?jt(e,c,2):void 0))):d=g(e)?t?()=>jt(e,c,2):()=>(h&&h(),Ht(e,c,3,[v])):o,t&&r){const e=d;d=()=>jn(e());}let v=e=>{h=S.onStop=()=>{jt(e,c,4),h=S.onStop=void 0;};},y=m?new Array(e.length).fill($n):$n;const b=()=>{if(S.active&&S.dirty)if(t){const e=S.run();(r||f||(m?e.some(((e,t)=>M(e,y[t]))):M(e,y)))&&(h&&h(),Ht(t,c,3,[e,y===$n?void 0:m&&y[0]===$n?[]:y,v]),y=e);}else S.run();};let _;b.allowRecurse=!!t,"sync"===i?_=b:"post"===i?_=()=>So(b,c&&c.suspense):(b.pre=!0,c&&(b.id=c.uid),_=()=>tn(b));const S=new ue(d,o,_),x=ae(),C=()=>{S.stop(),x&&a(x.effects,S);};return t?s?b():y=S.run():"post"===i?So(S.run.bind(S),c&&c.suspense):S.run(),C}function Dn(e,t,n){const s=this.proxy,o=v(e)?e.includes(".")?Un(s,e):()=>s[e]:e.bind(s,s);let r;g(t)?r=t:(r=t.handler,n=t);const i=mr(this),l=Vn(o,r.bind(s),n);return i(),l}function Un(e,t){const n=t.split(".");return ()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}function jn(e,t,n=0,s){if(!b(e)||e.__v_skip)return e;if(t&&t>0){if(n>=t)return e;n++;}if((s=s||new Set).has(e))return e;if(s.add(e),It(e))jn(e.value,t,n,s);else if(p(e))for(let o=0;o<e.length;o++)jn(e[o],t,n,s);else if(f(e)||h(e))e.forEach((e=>{jn(e,t,n,s);}));else if(k(e))for(const o in e)jn(e[o],t,n,s);return e}function Hn(e,t,n,s){const o=e.dirs,r=t&&t.dirs;for(let i=0;i<o.length;i++){const l=o[i];r&&(l.oldValue=r[i].value);let c=l.dir[s];c&&(ye(),Ht(c,n,8,[e.el,l,e,t]),be());}}const qn=Symbol("_leaveCb"),Wn=Symbol("_enterCb");function Kn(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return vs((()=>{e.isMounted=!0;})),_s((()=>{e.isUnmounting=!0;})),e}const zn=[Function,Array],Gn={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:zn,onEnter:zn,onAfterEnter:zn,onEnterCancelled:zn,onBeforeLeave:zn,onLeave:zn,onAfterLeave:zn,onLeaveCancelled:zn,onBeforeAppear:zn,onAppear:zn,onAfterAppear:zn,onAppearCancelled:zn},Jn={name:"BaseTransition",props:Gn,setup(e,{slots:t}){const n=pr(),s=Kn();return ()=>{const o=t.default&&ts(t.default(),!0);if(!o||!o.length)return;let r=o[0];if(o.length>1)for(const e of o)if(e.type!==Vo){r=e;break}const i=Ct(e),{mode:l}=i;if(s.isLeaving)return Zn(r);const c=Yn(r);if(!c)return Zn(r);const a=Qn(c,i,s,n);es(c,a);const u=n.subTree,d=u&&Yn(u);if(d&&d.type!==Vo&&!Xo(c,d)){const e=Qn(d,i,s,n);if(es(d,e),"out-in"===l)return s.isLeaving=!0,e.afterLeave=()=>{s.isLeaving=!1,!1!==n.update.active&&(n.effect.dirty=!0,n.update());},Zn(r);"in-out"===l&&c.type!==Vo&&(e.delayLeave=(e,t,n)=>{Xn(s,d)[String(d.key)]=d,e[qn]=()=>{t(),e[qn]=void 0,delete a.delayedLeave;},a.delayedLeave=n;});}return r}}};function Xn(e,t){const{leavingVNodes:n}=e;let s=n.get(t.type);return s||(s=Object.create(null),n.set(t.type,s)),s}function Qn(e,t,n,s){const{appear:o,mode:r,persisted:i=!1,onBeforeEnter:l,onEnter:c,onAfterEnter:a,onEnterCancelled:u,onBeforeLeave:d,onLeave:h,onAfterLeave:f,onLeaveCancelled:m,onBeforeAppear:g,onAppear:v,onAfterAppear:y,onAppearCancelled:b}=t,_=String(e.key),S=Xn(n,e),x=(e,t)=>{e&&Ht(e,s,9,t);},C=(e,t)=>{const n=t[1];x(e,t),p(e)?e.every((e=>e.length<=1))&&n():e.length<=1&&n();},k={mode:r,persisted:i,beforeEnter(t){let s=l;if(!n.isMounted){if(!o)return;s=g||l;}t[qn]&&t[qn](!0);const r=S[_];r&&Xo(e,r)&&r.el[qn]&&r.el[qn](),x(s,[t]);},enter(e){let t=c,s=a,r=u;if(!n.isMounted){if(!o)return;t=v||c,s=y||a,r=b||u;}let i=!1;const l=e[Wn]=t=>{i||(i=!0,x(t?r:s,[e]),k.delayedLeave&&k.delayedLeave(),e[Wn]=void 0);};t?C(t,[e,l]):l();},leave(t,s){const o=String(e.key);if(t[Wn]&&t[Wn](!0),n.isUnmounting)return s();x(d,[t]);let r=!1;const i=t[qn]=n=>{r||(r=!0,s(),x(n?m:f,[t]),t[qn]=void 0,S[o]===e&&delete S[o]);};S[o]=e,h?C(h,[t,i]):i();},clone:e=>Qn(e,t,n,s)};return k}function Zn(e){if(rs(e))return (e=nr(e)).children=null,e}function Yn(e){return rs(e)?e.children?e.children[0]:void 0:e}function es(e,t){6&e.shapeFlag&&e.component?es(e.component.subTree,t):128&e.shapeFlag?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t;}function ts(e,t=!1,n){let s=[],o=0;for(let r=0;r<e.length;r++){let i=e[r];const l=null==n?i.key:String(n)+String(null!=i.key?i.key:r);i.type===$o?(128&i.patchFlag&&o++,s=s.concat(ts(i.children,t,l))):(t||i.type!==Vo)&&s.push(null!=l?nr(i,{key:l}):i);}if(o>1)for(let r=0;r<s.length;r++)s[r].patchFlag=-2;return s}
  /*! #__NO_SIDE_EFFECTS__ */function ns(e,t){return g(e)?(()=>c({name:e.name},t,{setup:e}))():e}const ss=e=>!!e.type.__asyncLoader
  /*! #__NO_SIDE_EFFECTS__ */;function os(e,t){const{ref:n,props:s,children:o,ce:r}=t.vnode,i=er(e,s,o);return i.ref=n,i.ce=r,delete t.vnode.ce,i}const rs=e=>e.type.__isKeepAlive,is={name:"KeepAlive",__isKeepAlive:!0,props:{include:[String,RegExp,Array],exclude:[String,RegExp,Array],max:[String,Number]},setup(e,{slots:t}){const n=pr(),s=n.ctx,o=new Map,r=new Set;let i=null;const l=n.suspense,{renderer:{p:c,m:a,um:u,o:{createElement:d}}}=s,p=d("div");function h(e){ps(e),u(e,n,l,!0);}function f(e){o.forEach(((t,n)=>{const s=Ar(t.type);!s||e&&e(s)||m(n);}));}function m(e){const t=o.get(e);i&&Xo(t,i)?i&&ps(i):h(t),o.delete(e),r.delete(e);}s.activate=(e,t,n,s,o)=>{const r=e.component;a(e,t,n,0,l),c(r.vnode,e,t,n,r,l,s,e.slotScopeIds,o),So((()=>{r.isDeactivated=!1,r.a&&P(r.a);const t=e.props&&e.props.onVnodeMounted;t&&cr(t,r.parent,e);}),l);},s.deactivate=e=>{const t=e.component;a(e,p,null,1,l),So((()=>{t.da&&P(t.da);const n=e.props&&e.props.onVnodeUnmounted;n&&cr(n,t.parent,e),t.isDeactivated=!0;}),l);},Bn((()=>[e.include,e.exclude]),(([e,t])=>{e&&f((t=>ls(e,t))),t&&f((e=>!ls(t,e)));}),{flush:"post",deep:!0});let g=null;const v=()=>{null!=g&&o.set(g,hs(n.subTree));};return vs(v),bs(v),_s((()=>{o.forEach((e=>{const{subTree:t,suspense:s}=n,o=hs(t);if(e.type!==o.type||e.key!==o.key)h(e);else {ps(o);const e=o.component.da;e&&So(e,s);}}));})),()=>{if(g=null,!t.default)return i=null;const n=t.default(),s=n[0];if(n.length>1)return i=null,n;if(!(Jo(s)&&(4&s.shapeFlag||128&s.shapeFlag)))return i=null,s;let l=hs(s);const c=l.type,a=Ar(ss(l)?l.type.__asyncResolved||{}:c),{include:u,exclude:d,max:p}=e;if(u&&(!a||!ls(u,a))||d&&a&&ls(d,a))return i=l,s;const h=null==l.key?c:l.key,f=o.get(h);return l.el&&(l=nr(l),128&s.shapeFlag&&(s.ssContent=l)),g=h,f?(l.el=f.el,l.component=f.component,l.transition&&es(l,l.transition),l.shapeFlag|=512,r.delete(h),r.add(h)):(r.add(h),p&&r.size>parseInt(p,10)&&m(r.values().next().value)),l.shapeFlag|=256,i=l,wn(s.type)?s:l}}};function ls(e,t){return p(e)?e.some((e=>ls(e,t))):v(e)?e.split(",").includes(t):"[object RegExp]"===x(e)&&e.test(t)}function cs(e,t){us(e,"a",t);}function as(e,t){us(e,"da",t);}function us(e,t,n=dr){const s=e.__wdc||(e.__wdc=()=>{let t=n;for(;t;){if(t.isDeactivated)return;t=t.parent;}return e()});if(fs(t,s,n),n){let e=n.parent;for(;e&&e.parent;)rs(e.parent.vnode)&&ds(s,t,n,e),e=e.parent;}}function ds(e,t,n,s){const o=fs(t,e,s,!0);Ss((()=>{a(s[t],o);}),n);}function ps(e){e.shapeFlag&=-257,e.shapeFlag&=-513;}function hs(e){return 128&e.shapeFlag?e.ssContent:e}function fs(e,t,n=dr,s=!1){if(n){const o=n[e]||(n[e]=[]),r=t.__weh||(t.__weh=(...s)=>{if(n.isUnmounted)return;ye();const o=mr(n),r=Ht(t,n,e,s);return o(),be(),r});return s?o.unshift(r):o.push(r),r}}const ms=e=>(t,n=dr)=>(!_r||"sp"===e)&&fs(e,((...e)=>t(...e)),n),gs=ms("bm"),vs=ms("m"),ys=ms("bu"),bs=ms("u"),_s=ms("bum"),Ss=ms("um"),xs=ms("sp"),Cs=ms("rtg"),ks=ms("rtc");function Ts(e,t=dr){fs("ec",e,t);}function ws(e){return e.some((e=>!Jo(e)||e.type!==Vo&&!(e.type===$o&&!ws(e.children))))?e:null}const As=e=>e?vr(e)?wr(e)||e.proxy:As(e.parent):null,Es=c(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>As(e.parent),$root:e=>As(e.root),$emit:e=>e.emit,$options:e=>Bs(e),$forceUpdate:e=>e.f||(e.f=()=>{e.effect.dirty=!0,tn(e.update);}),$nextTick:e=>e.n||(e.n=en.bind(e.proxy)),$watch:e=>Dn.bind(e)}),Ns=(e,t)=>e!==n&&!e.__isScriptSetup&&d(e,t),Is={get({_:e},t){if("__v_skip"===t)return !0;const{ctx:s,setupState:o,data:r,props:i,accessCache:l,type:c,appContext:a}=e;let u;if("$"!==t[0]){const c=l[t];if(void 0!==c)switch(c){case 1:return o[t];case 2:return r[t];case 4:return s[t];case 3:return i[t]}else {if(Ns(o,t))return l[t]=1,o[t];if(r!==n&&d(r,t))return l[t]=2,r[t];if((u=e.propsOptions[0])&&d(u,t))return l[t]=3,i[t];if(s!==n&&d(s,t))return l[t]=4,s[t];Fs&&(l[t]=0);}}const p=Es[t];let h,f;return p?("$attrs"===t&&Ne(e.attrs,0,""),p(e)):(h=c.__cssModules)&&(h=h[t])?h:s!==n&&d(s,t)?(l[t]=4,s[t]):(f=a.config.globalProperties,d(f,t)?f[t]:void 0)},set({_:e},t,s){const{data:o,setupState:r,ctx:i}=e;return Ns(r,t)?(r[t]=s,!0):o!==n&&d(o,t)?(o[t]=s,!0):!d(e.props,t)&&(("$"!==t[0]||!(t.slice(1)in e))&&(i[t]=s,!0))},has({_:{data:e,setupState:t,accessCache:s,ctx:o,appContext:r,propsOptions:i}},l){let c;return !!s[l]||e!==n&&d(e,l)||Ns(t,l)||(c=i[0])&&d(c,l)||d(o,l)||d(Es,l)||d(r.config.globalProperties,l)},defineProperty(e,t,n){return null!=n.get?e._.accessCache[t]=0:d(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}},Rs=c({},Is,{get(e,t){if(t!==Symbol.unscopables)return Is.get(e,t,e)},has:(e,t)=>"_"!==t[0]&&!j(t)});function Os(){const e=pr();return e.setupContext||(e.setupContext=Tr(e))}function Ls(e){return p(e)?e.reduce(((e,t)=>(e[t]=null,e)),{}):e}let Fs=!0;function Ms(e){const t=Bs(e),n=e.proxy,s=e.ctx;Fs=!1,t.beforeCreate&&Ps(t.beforeCreate,e,"bc");const{data:r,computed:i,methods:l,watch:c,provide:a,inject:u,created:d,beforeMount:h,mounted:f,beforeUpdate:m,updated:v,activated:y,deactivated:_,beforeUnmount:S,unmounted:x,render:C,renderTracked:k,renderTriggered:T,errorCaptured:w,serverPrefetch:A,expose:E,inheritAttrs:N,components:I,directives:R}=t;if(u&&function(e,t,n=o){p(e)&&(e=js(e));for(const s in e){const n=e[s];let o;o=b(n)?"default"in n?Qs(n.from||s,n.default,!0):Qs(n.from||s):Qs(n),It(o)?Object.defineProperty(t,s,{enumerable:!0,configurable:!0,get:()=>o.value,set:e=>o.value=e}):t[s]=o;}}(u,s,null),l)for(const o in l){const e=l[o];g(e)&&(s[o]=e.bind(n));}if(r){const t=r.call(n,n);b(t)&&(e.data=mt(t));}if(Fs=!0,i)for(const p in i){const e=i[p],t=g(e)?e.bind(n,n):g(e.get)?e.get.bind(n,n):o,r=!g(e)&&g(e.set)?e.set.bind(n):o,l=Er({get:t,set:r});Object.defineProperty(s,p,{enumerable:!0,configurable:!0,get:()=>l.value,set:e=>l.value=e});}if(c)for(const o in c)$s(c[o],s,n,o);if(a){const e=g(a)?a.call(n):a;Reflect.ownKeys(e).forEach((t=>{Xs(t,e[t]);}));}function O(e,t){p(t)?t.forEach((t=>e(t.bind(n)))):t&&e(t.bind(n));}if(d&&Ps(d,e,"c"),O(gs,h),O(vs,f),O(ys,m),O(bs,v),O(cs,y),O(as,_),O(Ts,w),O(ks,k),O(Cs,T),O(_s,S),O(Ss,x),O(xs,A),p(E))if(E.length){const t=e.exposed||(e.exposed={});E.forEach((e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t});}));}else e.exposed||(e.exposed={});C&&e.render===o&&(e.render=C),null!=N&&(e.inheritAttrs=N),I&&(e.components=I),R&&(e.directives=R);}function Ps(e,t,n){Ht(p(e)?e.map((e=>e.bind(t.proxy))):e.bind(t.proxy),t,n);}function $s(e,t,n,s){const o=s.includes(".")?Un(n,s):()=>n[s];if(v(e)){const n=t[e];g(n)&&Bn(o,n);}else if(g(e))Bn(o,e.bind(n));else if(b(e))if(p(e))e.forEach((e=>$s(e,t,n,s)));else {const s=g(e.handler)?e.handler.bind(n):t[e.handler];g(s)&&Bn(o,s,e);}}function Bs(e){const t=e.type,{mixins:n,extends:s}=t,{mixins:o,optionsCache:r,config:{optionMergeStrategies:i}}=e.appContext,l=r.get(t);let c;return l?c=l:o.length||n||s?(c={},o.length&&o.forEach((e=>Vs(c,e,i,!0))),Vs(c,t,i)):c=t,b(t)&&r.set(t,c),c}function Vs(e,t,n,s=!1){const{mixins:o,extends:r}=t;r&&Vs(e,r,n,!0),o&&o.forEach((t=>Vs(e,t,n,!0)));for(const i in t)if(s&&"expose"===i);else {const s=Ds[i]||n&&n[i];e[i]=s?s(e[i],t[i]):t[i];}return e}const Ds={data:Us,props:Ws,emits:Ws,methods:qs,computed:qs,beforeCreate:Hs,created:Hs,beforeMount:Hs,mounted:Hs,beforeUpdate:Hs,updated:Hs,beforeDestroy:Hs,beforeUnmount:Hs,destroyed:Hs,unmounted:Hs,activated:Hs,deactivated:Hs,errorCaptured:Hs,serverPrefetch:Hs,components:qs,directives:qs,watch:function(e,t){if(!e)return t;if(!t)return e;const n=c(Object.create(null),e);for(const s in t)n[s]=Hs(e[s],t[s]);return n},provide:Us,inject:function(e,t){return qs(js(e),js(t))}};function Us(e,t){return t?e?function(){return c(g(e)?e.call(this,this):e,g(t)?t.call(this,this):t)}:t:e}function js(e){if(p(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function Hs(e,t){return e?[...new Set([].concat(e,t))]:t}function qs(e,t){return e?c(Object.create(null),e,t):t}function Ws(e,t){return e?p(e)&&p(t)?[...new Set([...e,...t])]:c(Object.create(null),Ls(e),Ls(null!=t?t:{})):t}function Ks(){return {app:null,config:{isNativeTag:r,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let zs=0;function Gs(e,t){return function(n,s=null){g(n)||(n=c({},n)),null==s||b(s)||(s=null);const o=Ks(),r=new WeakSet;let i=!1;const l=o.app={_uid:zs++,_component:n,_props:s,_container:null,_context:o,_instance:null,version:Rr,get config(){return o.config},set config(e){},use:(e,...t)=>(r.has(e)||(e&&g(e.install)?(r.add(e),e.install(l,...t)):g(e)&&(r.add(e),e(l,...t))),l),mixin:e=>(o.mixins.includes(e)||o.mixins.push(e),l),component:(e,t)=>t?(o.components[e]=t,l):o.components[e],directive:(e,t)=>t?(o.directives[e]=t,l):o.directives[e],mount(r,c,a){if(!i){const u=er(n,s);return u.appContext=o,!0===a?a="svg":!1===a&&(a=void 0),c&&t?t(u,r):e(u,r,a),i=!0,l._container=r,r.__vue_app__=l,wr(u.component)||u.component.proxy}},unmount(){i&&(e(null,l._container),delete l._container.__vue_app__);},provide:(e,t)=>(o.provides[e]=t,l),runWithContext(e){const t=Js;Js=l;try{return e()}finally{Js=t;}}};return l}}let Js=null;function Xs(e,t){if(dr){let n=dr.provides;const s=dr.parent&&dr.parent.provides;s===n&&(n=dr.provides=Object.create(s)),n[e]=t;}}function Qs(e,t,n=!1){const s=dr||hn;if(s||Js){const o=s?null==s.parent?s.vnode.appContext&&s.vnode.appContext.provides:s.parent.provides:Js._context.provides;if(o&&e in o)return o[e];if(arguments.length>1)return n&&g(t)?t.call(s&&s.proxy):t}}const Zs=Object.create(null),Ys=()=>Object.create(Zs),eo=e=>Object.getPrototypeOf(e)===Zs;function to(e,t,s,o){const[r,i]=e.propsOptions;let l,c=!1;if(t)for(let n in t){if(w(n))continue;const a=t[n];let u;r&&d(r,u=I(n))?i&&i.includes(u)?(l||(l={}))[u]=a:s[u]=a:pn(e.emitsOptions,n)||n in o&&a===o[n]||(o[n]=a,c=!0);}if(i){const t=Ct(s),o=l||n;for(let n=0;n<i.length;n++){const l=i[n];s[l]=no(r,t,l,o[l],e,!d(o,l));}}return c}function no(e,t,n,s,o,r){const i=e[n];if(null!=i){const e=d(i,"default");if(e&&void 0===s){const e=i.default;if(i.type!==Function&&!i.skipFactory&&g(e)){const{propsDefaults:r}=o;if(n in r)s=r[n];else {const i=mr(o);s=r[n]=e.call(null,t),i();}}else s=e;}i[0]&&(r&&!e?s=!1:!i[1]||""!==s&&s!==O(n)||(s=!0));}return s}function so(e,t,o=!1){const r=t.propsCache,i=r.get(e);if(i)return i;const l=e.props,a={},u=[];let h=!1;if(!g(e)){const n=e=>{h=!0;const[n,s]=so(e,t,!0);c(a,n),s&&u.push(...s);};!o&&t.mixins.length&&t.mixins.forEach(n),e.extends&&n(e.extends),e.mixins&&e.mixins.forEach(n);}if(!l&&!h)return b(e)&&r.set(e,s),s;if(p(l))for(let s=0;s<l.length;s++){const e=I(l[s]);oo(e)&&(a[e]=n);}else if(l)for(const n in l){const e=I(n);if(oo(e)){const t=l[n],s=a[e]=p(t)||g(t)?{type:t}:c({},t);if(s){const t=lo(Boolean,s.type),n=lo(String,s.type);s[0]=t>-1,s[1]=n<0||t<n,(t>-1||d(s,"default"))&&u.push(e);}}}const f=[a,u];return b(e)&&r.set(e,f),f}function oo(e){return "$"!==e[0]&&!w(e)}function ro(e){if(null===e)return "null";if("function"==typeof e)return e.name||"";if("object"==typeof e){return e.constructor&&e.constructor.name||""}return ""}function io(e,t){return ro(e)===ro(t)}function lo(e,t){return p(t)?t.findIndex((t=>io(t,e))):g(t)&&io(t,e)?0:-1}const co=e=>"_"===e[0]||"$stable"===e,ao=e=>p(e)?e.map(or):[or(e)],uo=(e,t,n)=>{if(t._n)return t;const s=gn(((...e)=>ao(t(...e))),n);return s._c=!1,s},po=(e,t,n)=>{const s=e._ctx;for(const o in e){if(co(o))continue;const n=e[o];if(g(n))t[o]=uo(0,n,s);else if(null!=n){const e=ao(n);t[o]=()=>e;}}},ho=(e,t)=>{const n=ao(t);e.slots.default=()=>n;},fo=(e,t)=>{if(32&e.vnode.shapeFlag){const n=t._;n?(e.slots=Ct(t),$(e.slots,"_",n)):po(t,e.slots=Ys());}else e.slots=Ys(),t&&ho(e,t);},mo=(e,t,s)=>{const{vnode:o,slots:r}=e;let i=!0,l=n;if(32&o.shapeFlag){const e=t._;e?s&&1===e?i=!1:(c(r,t),s||1!==e||delete r._):(i=!t.$stable,po(t,r)),l=t;}else t&&(ho(e,t),l={default:1});if(i)for(const n in r)co(n)||null!=l[n]||delete r[n];};function go(e,t,s,o,r=!1){if(p(e))return void e.forEach(((e,n)=>go(e,t&&(p(t)?t[n]:t),s,o,r)));if(ss(o)&&!r)return;const i=4&o.shapeFlag?wr(o.component)||o.component.proxy:o.el,l=r?null:i,{i:c,r:u}=e,h=t&&t.r,f=c.refs===n?c.refs={}:c.refs,m=c.setupState;if(null!=h&&h!==u&&(v(h)?(f[h]=null,d(m,h)&&(m[h]=null)):It(h)&&(h.value=null)),g(u))jt(u,c,12,[l,f]);else {const t=v(u),n=It(u);if(t||n){const o=()=>{if(e.f){const n=t?d(m,u)?m[u]:f[u]:u.value;r?p(n)&&a(n,i):p(n)?n.includes(i)||n.push(i):t?(f[u]=[i],d(m,u)&&(m[u]=f[u])):(u.value=[i],e.k&&(f[e.k]=u.value));}else t?(f[u]=l,d(m,u)&&(m[u]=l)):n&&(u.value=l,e.k&&(f[e.k]=l));};l?(o.id=-1,So(o,s)):o();}}}let vo=!1;const yo=e=>(e=>e.namespaceURI.includes("svg")&&"foreignObject"!==e.tagName)(e)?"svg":(e=>e.namespaceURI.includes("MathML"))(e)?"mathml":void 0,bo=e=>8===e.nodeType;function _o(e){const{mt:t,p:n,o:{patchProp:s,createText:o,nextSibling:r,parentNode:l,remove:c,insert:a,createComment:u}}=e,d=(n,s,i,c,u,b=!1)=>{b=b||!!s.dynamicChildren;const _=bo(n)&&"["===n.data,S=()=>m(n,s,i,c,u,_),{type:x,ref:C,shapeFlag:k,patchFlag:T}=s;let w=n.nodeType;s.el=n,-2===T&&(b=!1,s.dynamicChildren=null);let A=null;switch(x){case Bo:3!==w?""===s.children?(a(s.el=o(""),l(n),n),A=n):A=S():(n.data!==s.children&&(vo=!0,n.data=s.children),A=r(n));break;case Vo:y(n)?(A=r(n),v(s.el=n.content.firstChild,n,i)):A=8!==w||_?S():r(n);break;case Do:if(_&&(w=(n=r(n)).nodeType),1===w||3===w){A=n;const e=!s.children.length;for(let t=0;t<s.staticCount;t++)e&&(s.children+=1===A.nodeType?A.outerHTML:A.data),t===s.staticCount-1&&(s.anchor=A),A=r(A);return _?r(A):A}S();break;case $o:A=_?f(n,s,i,c,u,b):S();break;default:if(1&k)A=1===w&&s.type.toLowerCase()===n.tagName.toLowerCase()||y(n)?p(n,s,i,c,u,b):S();else if(6&k){s.slotScopeIds=u;const e=l(n);if(A=_?g(n):bo(n)&&"teleport start"===n.data?g(n,n.data,"teleport end"):r(n),t(s,e,null,i,c,yo(e),b),ss(s)){let t;_?(t=er($o),t.anchor=A?A.previousSibling:e.lastChild):t=3===n.nodeType?sr(""):er("div"),t.el=n,s.component.subTree=t;}}else 64&k?A=8!==w?S():s.type.hydrate(n,s,i,c,u,b,e,h):128&k&&(A=s.type.hydrate(n,s,i,c,yo(l(n)),u,b,e,d));}return null!=C&&go(C,null,c,s),A},p=(e,t,n,o,r,l)=>{l=l||!!t.dynamicChildren;const{type:a,props:u,patchFlag:d,shapeFlag:p,dirs:f,transition:m}=t,g="input"===a||"option"===a;if(g||-1!==d){f&&Hn(t,null,n,"created");let a,b=!1;if(y(e)){b=Ao(o,m)&&n&&n.vnode.props&&n.vnode.props.appear;const s=e.content.firstChild;b&&m.beforeEnter(s),v(s,e,n),t.el=e=s;}if(16&p&&(!u||!u.innerHTML&&!u.textContent)){let s=h(e.firstChild,t,e,n,o,r,l);for(;s;){vo=!0;const e=s;s=s.nextSibling,c(e);}}else 8&p&&e.textContent!==t.children&&(vo=!0,e.textContent=t.children);if(u)if(g||!l||48&d)for(const t in u)(g&&(t.endsWith("value")||"indeterminate"===t)||i(t)&&!w(t)||"."===t[0])&&s(e,t,null,u[t],void 0,void 0,n);else u.onClick&&s(e,"onClick",null,u.onClick,void 0,void 0,n);(a=u&&u.onVnodeBeforeMount)&&cr(a,n,t),f&&Hn(t,null,n,"beforeMount"),((a=u&&u.onVnodeMounted)||f||b)&&On((()=>{a&&cr(a,n,t),b&&m.enter(e),f&&Hn(t,null,n,"mounted");}),o);}return e.nextSibling},h=(e,t,s,o,r,i,l)=>{l=l||!!t.dynamicChildren;const c=t.children,a=c.length;for(let u=0;u<a;u++){const t=l?c[u]:c[u]=or(c[u]);if(e)e=d(e,t,o,r,i,l);else {if(t.type===Bo&&!t.children)continue;vo=!0,n(null,t,s,null,o,r,yo(s),i);}}return e},f=(e,t,n,s,o,i)=>{const{slotScopeIds:c}=t;c&&(o=o?o.concat(c):c);const d=l(e),p=h(r(e),t,d,n,s,o,i);return p&&bo(p)&&"]"===p.data?r(t.anchor=p):(vo=!0,a(t.anchor=u("]"),d,p),p)},m=(e,t,s,o,i,a)=>{if(vo=!0,t.el=null,a){const t=g(e);for(;;){const n=r(e);if(!n||n===t)break;c(n);}}const u=r(e),d=l(e);return c(e),n(null,t,d,u,s,o,yo(d),i),u},g=(e,t="[",n="]")=>{let s=0;for(;e;)if((e=r(e))&&bo(e)&&(e.data===t&&s++,e.data===n)){if(0===s)return r(e);s--;}return e},v=(e,t,n)=>{const s=t.parentNode;s&&s.replaceChild(e,t);let o=n;for(;o;)o.vnode.el===t&&(o.vnode.el=o.subTree.el=e),o=o.parent;},y=e=>1===e.nodeType&&"template"===e.tagName.toLowerCase();return [(e,t)=>{if(!t.hasChildNodes())return n(null,e,t),rn(),void(t._vnode=e);vo=!1,d(t.firstChild,e,null,null,null),rn(),t._vnode=e,vo&&console.error("Hydration completed but contains mismatches.");},d]}const So=On;function xo(e){return ko(e)}function Co(e){return ko(e,_o)}function ko(e,t){U().__VUE__=!0;const{insert:r,remove:i,patchProp:l,createElement:c,createText:a,createComment:u,setText:p,setElementText:h,parentNode:f,nextSibling:m,setScopeId:g=o,insertStaticContent:v}=e,y=(e,t,n,s=null,o=null,r=null,i=void 0,l=null,c=!!t.dynamicChildren)=>{if(e===t)return;e&&!Xo(e,t)&&(s=X(e),W(e,o,r,!0),e=null),-2===t.patchFlag&&(c=!1,t.dynamicChildren=null);const{type:a,ref:u,shapeFlag:d}=t;switch(a){case Bo:b(e,t,n,s);break;case Vo:S(e,t,n,s);break;case Do:null==e&&x(t,n,s,i);break;case $o:L(e,t,n,s,o,r,i,l,c);break;default:1&d?C(e,t,n,s,o,r,i,l,c):6&d?F(e,t,n,s,o,r,i,l,c):(64&d||128&d)&&a.process(e,t,n,s,o,r,i,l,c,Y);}null!=u&&o&&go(u,e&&e.ref,r,t||e,!t);},b=(e,t,n,s)=>{if(null==e)r(t.el=a(t.children),n,s);else {const n=t.el=e.el;t.children!==e.children&&p(n,t.children);}},S=(e,t,n,s)=>{null==e?r(t.el=u(t.children||""),n,s):t.el=e.el;},x=(e,t,n,s)=>{[e.el,e.anchor]=v(e.children,t,n,s,e.el,e.anchor);},C=(e,t,n,s,o,r,i,l,c)=>{"svg"===t.type?i="svg":"math"===t.type&&(i="mathml"),null==e?k(t,n,s,o,r,i,l,c):E(e,t,o,r,i,l,c);},k=(e,t,n,s,o,i,a,u)=>{let d,p;const{props:f,shapeFlag:m,transition:g,dirs:v}=e;if(d=e.el=c(e.type,i,f&&f.is,f),8&m?h(d,e.children):16&m&&A(e.children,d,null,s,o,To(e,i),a,u),v&&Hn(e,null,s,"created"),T(d,e,e.scopeId,a,s),f){for(const t in f)"value"===t||w(t)||l(d,t,null,f[t],i,e.children,s,o,J);"value"in f&&l(d,"value",null,f.value,i),(p=f.onVnodeBeforeMount)&&cr(p,s,e);}v&&Hn(e,null,s,"beforeMount");const y=Ao(o,g);y&&g.beforeEnter(d),r(d,t,n),((p=f&&f.onVnodeMounted)||y||v)&&So((()=>{p&&cr(p,s,e),y&&g.enter(d),v&&Hn(e,null,s,"mounted");}),o);},T=(e,t,n,s,o)=>{if(n&&g(e,n),s)for(let r=0;r<s.length;r++)g(e,s[r]);if(o){if(t===o.subTree){const t=o.vnode;T(e,t,t.scopeId,t.slotScopeIds,o.parent);}}},A=(e,t,n,s,o,r,i,l,c=0)=>{for(let a=c;a<e.length;a++){const c=e[a]=l?rr(e[a]):or(e[a]);y(null,c,t,n,s,o,r,i,l);}},E=(e,t,s,o,r,i,c)=>{const a=t.el=e.el;let{patchFlag:u,dynamicChildren:d,dirs:p}=t;u|=16&e.patchFlag;const f=e.props||n,m=t.props||n;let g;if(s&&wo(s,!1),(g=m.onVnodeBeforeUpdate)&&cr(g,s,t,e),p&&Hn(t,e,s,"beforeUpdate"),s&&wo(s,!0),d?N(e.dynamicChildren,d,a,s,o,To(t,r),i):c||D(e,t,a,null,s,o,To(t,r),i,!1),u>0){if(16&u)R(a,t,f,m,s,o,r);else if(2&u&&f.class!==m.class&&l(a,"class",null,m.class,r),4&u&&l(a,"style",f.style,m.style,r),8&u){const n=t.dynamicProps;for(let t=0;t<n.length;t++){const i=n[t],c=f[i],u=m[i];u===c&&"value"!==i||l(a,i,c,u,r,e.children,s,o,J);}}1&u&&e.children!==t.children&&h(a,t.children);}else c||null!=d||R(a,t,f,m,s,o,r);((g=m.onVnodeUpdated)||p)&&So((()=>{g&&cr(g,s,t,e),p&&Hn(t,e,s,"updated");}),o);},N=(e,t,n,s,o,r,i)=>{for(let l=0;l<t.length;l++){const c=e[l],a=t[l],u=c.el&&(c.type===$o||!Xo(c,a)||70&c.shapeFlag)?f(c.el):n;y(c,a,u,null,s,o,r,i,!0);}},R=(e,t,s,o,r,i,c)=>{if(s!==o){if(s!==n)for(const n in s)w(n)||n in o||l(e,n,s[n],null,c,t.children,r,i,J);for(const n in o){if(w(n))continue;const a=o[n],u=s[n];a!==u&&"value"!==n&&l(e,n,u,a,c,t.children,r,i,J);}"value"in o&&l(e,"value",s.value,o.value,c);}},L=(e,t,n,s,o,i,l,c,u)=>{const d=t.el=e?e.el:a(""),p=t.anchor=e?e.anchor:a("");let{patchFlag:h,dynamicChildren:f,slotScopeIds:m}=t;m&&(c=c?c.concat(m):m),null==e?(r(d,n,s),r(p,n,s),A(t.children||[],n,p,o,i,l,c,u)):h>0&&64&h&&f&&e.dynamicChildren?(N(e.dynamicChildren,f,n,o,i,l,c),(null!=t.key||o&&t===o.subTree)&&Eo(e,t,!0)):D(e,t,n,p,o,i,l,c,u);},F=(e,t,n,s,o,r,i,l,c)=>{t.slotScopeIds=l,null==e?512&t.shapeFlag?o.ctx.activate(t,n,s,i,c):M(t,n,s,o,r,i,c):$(e,t,c);},M=(e,t,s,o,r,i,l)=>{const c=e.component=function(e,t,s){const o=e.type,r=(t?t.appContext:e.appContext)||ar,i={uid:ur++,vnode:e,type:o,parent:t,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,scope:new le(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(r.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:so(o,r),emitsOptions:dn(o,r),emit:null,emitted:null,propsDefaults:n,inheritAttrs:o.inheritAttrs,ctx:n,data:n,props:n,attrs:n,slots:n,refs:n,setupState:n,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:s,suspenseId:s?s.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};i.ctx={_:i},i.root=t?t.root:i,i.emit=un.bind(null,i),e.ce&&e.ce(i);return i}(e,o,r);if(rs(e)&&(c.ctx.renderer=Y),function(e,t=!1){t&&fr(t);const{props:n,children:s}=e.vnode,o=vr(e);(function(e,t,n,s=!1){const o={},r=Ys();e.propsDefaults=Object.create(null),to(e,t,o,r);for(const i in e.propsOptions[0])i in o||(o[i]=void 0);e.props=n?s?o:gt(o):e.type.props?o:r,e.attrs=r;})(e,n,o,t),fo(e,s);o?function(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,Is);const{setup:s}=n;if(s){const n=e.setupContext=s.length>1?Tr(e):null,o=mr(e);ye();const r=jt(s,e,0,[e.props,n]);if(be(),o(),_(r)){if(r.then(gr,gr),t)return r.then((n=>{Sr(e,n,t);})).catch((t=>{qt(t,e,0);}));e.asyncDep=r;}else Sr(e,r,t);}else Cr(e,t);}(e,t):void 0;t&&fr(!1);}(c),c.asyncDep){if(r&&r.registerDep(c,B),!e.el){const e=c.subTree=er(Vo);S(null,e,t,s);}}else B(c,e,t,s,r,i,l);},$=(e,t,n)=>{const s=t.component=e.component;if(function(e,t,n){const{props:s,children:o,component:r}=e,{props:i,children:l,patchFlag:c}=t,a=r.emitsOptions;if(t.dirs||t.transition)return !0;if(!(n&&c>=0))return !(!o&&!l||l&&l.$stable)||s!==i&&(s?!i||_n(s,i,a):!!i);if(1024&c)return !0;if(16&c)return s?_n(s,i,a):!!i;if(8&c){const e=t.dynamicProps;for(let t=0;t<e.length;t++){const n=e[t];if(i[n]!==s[n]&&!pn(a,n))return !0}}return !1}(e,t,n)){if(s.asyncDep&&!s.asyncResolved)return void V(s,t,n);s.next=t,function(e){const t=zt.indexOf(e);t>Gt&&zt.splice(t,1);}(s.update),s.effect.dirty=!0,s.update();}else t.el=e.el,s.vnode=t;},B=(e,t,n,s,r,i,l)=>{const c=()=>{if(e.isMounted){let{next:t,bu:n,u:s,parent:o,vnode:a}=e;{const n=No(e);if(n)return t&&(t.el=a.el,V(e,t,l)),void n.asyncDep.then((()=>{e.isUnmounted||c();}))}let u,d=t;wo(e,!1),t?(t.el=a.el,V(e,t,l)):t=a,n&&P(n),(u=t.props&&t.props.onVnodeBeforeUpdate)&&cr(u,o,t,a),wo(e,!0);const p=vn(e),h=e.subTree;e.subTree=p,y(h,p,f(h.el),X(h),e,r,i),t.el=p.el,null===d&&Sn(e,p.el),s&&So(s,r),(u=t.props&&t.props.onVnodeUpdated)&&So((()=>cr(u,o,t,a)),r);}else {let o;const{el:l,props:c}=t,{bm:a,m:u,parent:d}=e,p=ss(t);if(wo(e,!1),a&&P(a),!p&&(o=c&&c.onVnodeBeforeMount)&&cr(o,d,t),wo(e,!0),l&&te){const n=()=>{e.subTree=vn(e),te(l,e.subTree,e,r,null);};p?t.type.__asyncLoader().then((()=>!e.isUnmounted&&n())):n();}else {const o=e.subTree=vn(e);y(null,o,n,s,e,r,i),t.el=o.el;}if(u&&So(u,r),!p&&(o=c&&c.onVnodeMounted)){const e=t;So((()=>cr(o,d,e)),r);}(256&t.shapeFlag||d&&ss(d.vnode)&&256&d.vnode.shapeFlag)&&e.a&&So(e.a,r),e.isMounted=!0,t=n=s=null;}},a=e.effect=new ue(c,o,(()=>tn(u)),e.scope),u=e.update=()=>{a.dirty&&a.run();};u.id=e.uid,wo(e,!0),u();},V=(e,t,n)=>{t.component=e;const s=e.vnode.props;e.vnode=t,e.next=null,function(e,t,n,s){const{props:o,attrs:r,vnode:{patchFlag:i}}=e,l=Ct(o),[c]=e.propsOptions;let a=!1;if(!(s||i>0)||16&i){let s;to(e,t,o,r)&&(a=!0);for(const r in l)t&&(d(t,r)||(s=O(r))!==r&&d(t,s))||(c?!n||void 0===n[r]&&void 0===n[s]||(o[r]=no(c,l,r,void 0,e,!0)):delete o[r]);if(r!==l)for(const e in r)t&&d(t,e)||(delete r[e],a=!0);}else if(8&i){const n=e.vnode.dynamicProps;for(let s=0;s<n.length;s++){let i=n[s];if(pn(e.emitsOptions,i))continue;const u=t[i];if(c)if(d(r,i))u!==r[i]&&(r[i]=u,a=!0);else {const t=I(i);o[t]=no(c,l,t,u,e,!1);}else u!==r[i]&&(r[i]=u,a=!0);}}a&&Ie(e.attrs,"set","");}(e,t.props,s,n),mo(e,t.children,n),ye(),on(e),be();},D=(e,t,n,s,o,r,i,l,c=!1)=>{const a=e&&e.children,u=e?e.shapeFlag:0,d=t.children,{patchFlag:p,shapeFlag:f}=t;if(p>0){if(128&p)return void H(a,d,n,s,o,r,i,l,c);if(256&p)return void j(a,d,n,s,o,r,i,l,c)}8&f?(16&u&&J(a,o,r),d!==a&&h(n,d)):16&u?16&f?H(a,d,n,s,o,r,i,l,c):J(a,o,r,!0):(8&u&&h(n,""),16&f&&A(d,n,s,o,r,i,l,c));},j=(e,t,n,o,r,i,l,c,a)=>{const u=(e=e||s).length,d=(t=t||s).length,p=Math.min(u,d);let h;for(h=0;h<p;h++){const s=t[h]=a?rr(t[h]):or(t[h]);y(e[h],s,n,null,r,i,l,c,a);}u>d?J(e,r,i,!0,!1,p):A(t,n,o,r,i,l,c,a,p);},H=(e,t,n,o,r,i,l,c,a)=>{let u=0;const d=t.length;let p=e.length-1,h=d-1;for(;u<=p&&u<=h;){const s=e[u],o=t[u]=a?rr(t[u]):or(t[u]);if(!Xo(s,o))break;y(s,o,n,null,r,i,l,c,a),u++;}for(;u<=p&&u<=h;){const s=e[p],o=t[h]=a?rr(t[h]):or(t[h]);if(!Xo(s,o))break;y(s,o,n,null,r,i,l,c,a),p--,h--;}if(u>p){if(u<=h){const e=h+1,s=e<d?t[e].el:o;for(;u<=h;)y(null,t[u]=a?rr(t[u]):or(t[u]),n,s,r,i,l,c,a),u++;}}else if(u>h)for(;u<=p;)W(e[u],r,i,!0),u++;else {const f=u,m=u,g=new Map;for(u=m;u<=h;u++){const e=t[u]=a?rr(t[u]):or(t[u]);null!=e.key&&g.set(e.key,u);}let v,b=0;const _=h-m+1;let S=!1,x=0;const C=new Array(_);for(u=0;u<_;u++)C[u]=0;for(u=f;u<=p;u++){const s=e[u];if(b>=_){W(s,r,i,!0);continue}let o;if(null!=s.key)o=g.get(s.key);else for(v=m;v<=h;v++)if(0===C[v-m]&&Xo(s,t[v])){o=v;break}void 0===o?W(s,r,i,!0):(C[o-m]=u+1,o>=x?x=o:S=!0,y(s,t[o],n,null,r,i,l,c,a),b++);}const k=S?function(e){const t=e.slice(),n=[0];let s,o,r,i,l;const c=e.length;for(s=0;s<c;s++){const c=e[s];if(0!==c){if(o=n[n.length-1],e[o]<c){t[s]=o,n.push(s);continue}for(r=0,i=n.length-1;r<i;)l=r+i>>1,e[n[l]]<c?r=l+1:i=l;c<e[n[r]]&&(r>0&&(t[s]=n[r-1]),n[r]=s);}}r=n.length,i=n[r-1];for(;r-- >0;)n[r]=i,i=t[i];return n}(C):s;for(v=k.length-1,u=_-1;u>=0;u--){const e=m+u,s=t[e],p=e+1<d?t[e+1].el:o;0===C[u]?y(null,s,n,p,r,i,l,c,a):S&&(v<0||u!==k[v]?q(s,n,p,2):v--);}}},q=(e,t,n,s,o=null)=>{const{el:i,type:l,transition:c,children:a,shapeFlag:u}=e;if(6&u)return void q(e.component.subTree,t,n,s);if(128&u)return void e.suspense.move(t,n,s);if(64&u)return void l.move(e,t,n,Y);if(l===$o){r(i,t,n);for(let e=0;e<a.length;e++)q(a[e],t,n,s);return void r(e.anchor,t,n)}if(l===Do)return void(({el:e,anchor:t},n,s)=>{let o;for(;e&&e!==t;)o=m(e),r(e,n,s),e=o;r(t,n,s);})(e,t,n);if(2!==s&&1&u&&c)if(0===s)c.beforeEnter(i),r(i,t,n),So((()=>c.enter(i)),o);else {const{leave:e,delayLeave:s,afterLeave:o}=c,l=()=>r(i,t,n),a=()=>{e(i,(()=>{l(),o&&o();}));};s?s(i,l,a):a();}else r(i,t,n);},W=(e,t,n,s=!1,o=!1)=>{const{type:r,props:i,ref:l,children:c,dynamicChildren:a,shapeFlag:u,patchFlag:d,dirs:p}=e;if(null!=l&&go(l,null,n,e,!0),256&u)return void t.ctx.deactivate(e);const h=1&u&&p,f=!ss(e);let m;if(f&&(m=i&&i.onVnodeBeforeUnmount)&&cr(m,t,e),6&u)G(e.component,n,s);else {if(128&u)return void e.suspense.unmount(n,s);h&&Hn(e,null,t,"beforeUnmount"),64&u?e.type.remove(e,t,n,o,Y,s):a&&(r!==$o||d>0&&64&d)?J(a,t,n,!1,!0):(r===$o&&384&d||!o&&16&u)&&J(c,t,n),s&&K(e);}(f&&(m=i&&i.onVnodeUnmounted)||h)&&So((()=>{m&&cr(m,t,e),h&&Hn(e,null,t,"unmounted");}),n);},K=e=>{const{type:t,el:n,anchor:s,transition:o}=e;if(t===$o)return void z(n,s);if(t===Do)return void(({el:e,anchor:t})=>{let n;for(;e&&e!==t;)n=m(e),i(e),e=n;i(t);})(e);const r=()=>{i(n),o&&!o.persisted&&o.afterLeave&&o.afterLeave();};if(1&e.shapeFlag&&o&&!o.persisted){const{leave:t,delayLeave:s}=o,i=()=>t(n,r);s?s(e.el,r,i):i();}else r();},z=(e,t)=>{let n;for(;e!==t;)n=m(e),i(e),e=n;i(t);},G=(e,t,n)=>{const{bum:s,scope:o,update:r,subTree:i,um:l}=e;s&&P(s),o.stop(),r&&(r.active=!1,W(i,e,t,n)),l&&So(l,t),So((()=>{e.isUnmounted=!0;}),t),t&&t.pendingBranch&&!t.isUnmounted&&e.asyncDep&&!e.asyncResolved&&e.suspenseId===t.pendingId&&(t.deps--,0===t.deps&&t.resolve());},J=(e,t,n,s=!1,o=!1,r=0)=>{for(let i=r;i<e.length;i++)W(e[i],t,n,s,o);},X=e=>6&e.shapeFlag?X(e.component.subTree):128&e.shapeFlag?e.suspense.next():m(e.anchor||e.el);let Q=!1;const Z=(e,t,n)=>{null==e?t._vnode&&W(t._vnode,null,null,!0):y(t._vnode||null,e,t,null,null,null,n),Q||(Q=!0,on(),rn(),Q=!1),t._vnode=e;},Y={p:y,um:W,m:q,r:K,mt:M,mc:A,pc:D,pbc:N,n:X,o:e};let ee,te;return t&&([ee,te]=t(Y)),{render:Z,hydrate:ee,createApp:Gs(Z,ee)}}function To({type:e,props:t},n){return "svg"===n&&"foreignObject"===e||"mathml"===n&&"annotation-xml"===e&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function wo({effect:e,update:t},n){e.allowRecurse=t.allowRecurse=n;}function Ao(e,t){return (!e||e&&!e.pendingBranch)&&t&&!t.persisted}function Eo(e,t,n=!1){const s=e.children,o=t.children;if(p(s)&&p(o))for(let r=0;r<s.length;r++){const e=s[r];let t=o[r];1&t.shapeFlag&&!t.dynamicChildren&&((t.patchFlag<=0||32===t.patchFlag)&&(t=o[r]=rr(o[r]),t.el=e.el),n||Eo(e,t)),t.type===Bo&&(t.el=e.el);}}function No(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:No(t)}const Io=e=>e&&(e.disabled||""===e.disabled),Ro=e=>"undefined"!=typeof SVGElement&&e instanceof SVGElement,Oo=e=>"function"==typeof MathMLElement&&e instanceof MathMLElement,Lo=(e,t)=>{const n=e&&e.to;if(v(n)){if(t){return t(n)}return null}return n};function Fo(e,t,n,{o:{insert:s},m:o},r=2){0===r&&s(e.targetAnchor,t,n);const{el:i,anchor:l,shapeFlag:c,children:a,props:u}=e,d=2===r;if(d&&s(i,t,n),(!d||Io(u))&&16&c)for(let p=0;p<a.length;p++)o(a[p],t,n,2);d&&s(l,t,n);}const Mo={name:"Teleport",__isTeleport:!0,process(e,t,n,s,o,r,i,l,c,a){const{mc:u,pc:d,pbc:p,o:{insert:h,querySelector:f,createText:m}}=a,g=Io(t.props);let{shapeFlag:v,children:y,dynamicChildren:b}=t;if(null==e){const e=t.el=m(""),a=t.anchor=m("");h(e,n,s),h(a,n,s);const d=t.target=Lo(t.props,f),p=t.targetAnchor=m("");d&&(h(p,d),"svg"===i||Ro(d)?i="svg":("mathml"===i||Oo(d))&&(i="mathml"));const b=(e,t)=>{16&v&&u(y,e,t,o,r,i,l,c);};g?b(n,a):d&&b(d,p);}else {t.el=e.el;const s=t.anchor=e.anchor,u=t.target=e.target,h=t.targetAnchor=e.targetAnchor,m=Io(e.props),v=m?n:u,y=m?s:h;if("svg"===i||Ro(u)?i="svg":("mathml"===i||Oo(u))&&(i="mathml"),b?(p(e.dynamicChildren,b,v,o,r,i,l),Eo(e,t,!0)):c||d(e,t,v,y,o,r,i,l,!1),g)m?t.props&&e.props&&t.props.to!==e.props.to&&(t.props.to=e.props.to):Fo(t,n,s,a,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){const e=t.target=Lo(t.props,f);e&&Fo(t,e,null,a,0);}else m&&Fo(t,u,h,a,1);}Po(t);},remove(e,t,n,s,{um:o,o:{remove:r}},i){const{shapeFlag:l,children:c,anchor:a,targetAnchor:u,target:d,props:p}=e;if(d&&r(u),i&&r(a),16&l){const e=i||!Io(p);for(let s=0;s<c.length;s++){const r=c[s];o(r,t,n,e,!!r.dynamicChildren);}}},move:Fo,hydrate:function(e,t,n,s,o,r,{o:{nextSibling:i,parentNode:l,querySelector:c}},a){const u=t.target=Lo(t.props,c);if(u){const c=u._lpa||u.firstChild;if(16&t.shapeFlag)if(Io(t.props))t.anchor=a(i(e),t,l(e),n,s,o,r),t.targetAnchor=c;else {t.anchor=i(e);let l=c;for(;l;)if(l=i(l),l&&8===l.nodeType&&"teleport anchor"===l.data){t.targetAnchor=l,u._lpa=t.targetAnchor&&i(t.targetAnchor);break}a(c,t,u,n,s,o,r);}Po(t);}return t.anchor&&i(t.anchor)}};function Po(e){const t=e.ctx;if(t&&t.ut){let n=e.children[0].el;for(;n&&n!==e.targetAnchor;)1===n.nodeType&&n.setAttribute("data-v-owner",t.uid),n=n.nextSibling;t.ut();}}const $o=Symbol.for("v-fgt"),Bo=Symbol.for("v-txt"),Vo=Symbol.for("v-cmt"),Do=Symbol.for("v-stc"),Uo=[];let jo=null;function Ho(e=!1){Uo.push(jo=e?null:[]);}function qo(){Uo.pop(),jo=Uo[Uo.length-1]||null;}let Wo=1;function Ko(e){Wo+=e;}function zo(e){return e.dynamicChildren=Wo>0?jo||s:null,qo(),Wo>0&&jo&&jo.push(e),e}function Go(e,t,n,s,o){return zo(er(e,t,n,s,o,!0))}function Jo(e){return !!e&&!0===e.__v_isVNode}function Xo(e,t){return e.type===t.type&&e.key===t.key}const Qo=({key:e})=>null!=e?e:null,Zo=({ref:e,ref_key:t,ref_for:n})=>("number"==typeof e&&(e=""+e),null!=e?v(e)||It(e)||g(e)?{i:hn,r:e,k:t,f:!!n}:e:null);function Yo(e,t=null,n=null,s=0,o=null,r=(e===$o?0:1),i=!1,l=!1){const c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Qo(t),ref:t&&Zo(t),scopeId:fn,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:s,dynamicProps:o,dynamicChildren:null,appContext:null,ctx:hn};return l?(ir(c,n),128&r&&e.normalize(c)):n&&(c.shapeFlag|=v(n)?8:16),Wo>0&&!i&&jo&&(c.patchFlag>0||6&r)&&32!==c.patchFlag&&jo.push(c),c}const er=function(e,t=null,n=null,s=0,o=null,r=!1){e&&e!==Cn||(e=Vo);if(Jo(e)){const s=nr(e,t,!0);return n&&ir(s,n),Wo>0&&!r&&jo&&(6&s.shapeFlag?jo[jo.indexOf(e)]=s:jo.push(s)),s.patchFlag|=-2,s}i=e,g(i)&&"__vccOpts"in i&&(e=e.__vccOpts);var i;if(t){t=tr(t);let{class:e,style:n}=t;e&&!v(e)&&(t.class=G(e)),b(n)&&(xt(n)&&!p(n)&&(n=c({},n)),t.style=H(n));}const l=v(e)?1:wn(e)?128:(e=>e.__isTeleport)(e)?64:b(e)?4:g(e)?2:0;return Yo(e,t,n,s,o,l,r,!0)};function tr(e){return e?xt(e)||eo(e)?c({},e):e:null}function nr(e,t,n=!1){const{props:s,ref:o,patchFlag:r,children:i}=e,l=t?lr(s||{},t):s;return {__v_isVNode:!0,__v_skip:!0,type:e.type,props:l,key:l&&Qo(l),ref:t&&t.ref?n&&o?p(o)?o.concat(Zo(t)):[o,Zo(t)]:Zo(t):o,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:i,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==$o?-1===r?16:16|r:r,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&nr(e.ssContent),ssFallback:e.ssFallback&&nr(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce}}function sr(e=" ",t=0){return er(Bo,null,e,t)}function or(e){return null==e||"boolean"==typeof e?er(Vo):p(e)?er($o,null,e.slice()):"object"==typeof e?rr(e):er(Bo,null,String(e))}function rr(e){return null===e.el&&-1!==e.patchFlag||e.memo?e:nr(e)}function ir(e,t){let n=0;const{shapeFlag:s}=e;if(null==t)t=null;else if(p(t))n=16;else if("object"==typeof t){if(65&s){const n=t.default;return void(n&&(n._c&&(n._d=!1),ir(e,n()),n._c&&(n._d=!0)))}{n=32;const s=t._;s||eo(t)?3===s&&hn&&(1===hn.slots._?t._=1:(t._=2,e.patchFlag|=1024)):t._ctx=hn;}}else g(t)?(t={default:t,_ctx:hn},n=32):(t=String(t),64&s?(n=16,t=[sr(t)]):n=8);e.children=t,e.shapeFlag|=n;}function lr(...e){const t={};for(let n=0;n<e.length;n++){const s=e[n];for(const e in s)if("class"===e)t.class!==s.class&&(t.class=G([t.class,s.class]));else if("style"===e)t.style=H([t.style,s.style]);else if(i(e)){const n=t[e],o=s[e];!o||n===o||p(n)&&n.includes(o)||(t[e]=n?[].concat(n,o):o);}else ""!==e&&(t[e]=s[e]);}return t}function cr(e,t,n,s=null){Ht(e,t,7,[n,s]);}const ar=Ks();let ur=0;let dr=null;const pr=()=>dr||hn;let hr,fr;hr=e=>{dr=e;},fr=e=>{_r=e;};const mr=e=>{const t=dr;return hr(e),e.scope.on(),()=>{e.scope.off(),hr(t);}},gr=()=>{dr&&dr.scope.off(),hr(null);};function vr(e){return 4&e.vnode.shapeFlag}let yr,br,_r=!1;function Sr(e,t,n){g(t)?e.render=t:b(t)&&(e.setupState=Pt(t)),Cr(e,n);}function xr(e){yr=e,br=e=>{e.render._rc&&(e.withProxy=new Proxy(e.ctx,Rs));};}function Cr(e,t,n){const s=e.type;if(!e.render){if(!t&&yr&&!s.render){const t=s.template||Bs(e).template;if(t){const{isCustomElement:n,compilerOptions:o}=e.appContext.config,{delimiters:r,compilerOptions:i}=s,l=c(c({isCustomElement:n,delimiters:r},o),i);s.render=yr(t,l);}}e.render=s.render||o,br&&br(e);}{const t=mr(e);ye();try{Ms(e);}finally{be(),t();}}}const kr={get:(e,t)=>(Ne(e,0,""),e[t])};function Tr(e){const t=t=>{e.exposed=t||{};};return {attrs:new Proxy(e.attrs,kr),slots:e.slots,emit:e.emit,expose:t}}function wr(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy(Pt(kt(e.exposed)),{get:(t,n)=>n in t?t[n]:n in Es?Es[n](e):void 0,has:(e,t)=>t in e||t in Es}))}function Ar(e,t=!0){return g(e)?e.displayName||e.name:e.name||t&&e.__name}const Er=(e,t)=>{const n=function(e,t,n=!1){let s,r;const i=g(e);return i?(s=e,r=o):(s=e.get,r=e.set),new At(s,r,i||!r,n)}(e,0,_r);return n};function Nr(e,t,n){const s=arguments.length;return 2===s?b(t)&&!p(t)?Jo(t)?er(e,null,[t]):er(e,t):er(e,null,t):(s>3?n=Array.prototype.slice.call(arguments,2):3===s&&Jo(n)&&(n=[n]),er(e,t,n))}function Ir(e,t){const n=e.memo;if(n.length!=t.length)return !1;for(let s=0;s<n.length;s++)if(M(n[s],t[s]))return !1;return Wo>0&&jo&&jo.push(e),!0}const Rr="3.4.23",Or=o,Lr=o,Fr="undefined"!=typeof document?document:null,Mr=Fr&&Fr.createElement("template"),Pr={insert:(e,t,n)=>{t.insertBefore(e,n||null);},remove:e=>{const t=e.parentNode;t&&t.removeChild(e);},createElement:(e,t,n,s)=>{const o="svg"===t?Fr.createElementNS("http://www.w3.org/2000/svg",e):"mathml"===t?Fr.createElementNS("http://www.w3.org/1998/Math/MathML",e):Fr.createElement(e,n?{is:n}:void 0);return "select"===e&&s&&null!=s.multiple&&o.setAttribute("multiple",s.multiple),o},createText:e=>Fr.createTextNode(e),createComment:e=>Fr.createComment(e),setText:(e,t)=>{e.nodeValue=t;},setElementText:(e,t)=>{e.textContent=t;},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>Fr.querySelector(e),setScopeId(e,t){e.setAttribute(t,"");},insertStaticContent(e,t,n,s,o,r){const i=n?n.previousSibling:t.lastChild;if(o&&(o===r||o.nextSibling))for(;t.insertBefore(o.cloneNode(!0),n),o!==r&&(o=o.nextSibling););else {Mr.innerHTML="svg"===s?`<svg>${e}</svg>`:"mathml"===s?`<math>${e}</math>`:e;const o=Mr.content;if("svg"===s||"mathml"===s){const e=o.firstChild;for(;e.firstChild;)o.appendChild(e.firstChild);o.removeChild(e);}t.insertBefore(o,n);}return [i?i.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},$r="transition",Br="animation",Vr=Symbol("_vtc"),Dr=(e,{slots:t})=>Nr(Jn,Wr(e),t);Dr.displayName="Transition";const Ur={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},jr=Dr.props=c({},Gn,Ur),Hr=(e,t=[])=>{p(e)?e.forEach((e=>e(...t))):e&&e(...t);},qr=e=>!!e&&(p(e)?e.some((e=>e.length>1)):e.length>1);function Wr(e){const t={};for(const c in e)c in Ur||(t[c]=e[c]);if(!1===e.css)return t;const{name:n="v",type:s,duration:o,enterFromClass:r=`${n}-enter-from`,enterActiveClass:i=`${n}-enter-active`,enterToClass:l=`${n}-enter-to`,appearFromClass:a=r,appearActiveClass:u=i,appearToClass:d=l,leaveFromClass:p=`${n}-leave-from`,leaveActiveClass:h=`${n}-leave-active`,leaveToClass:f=`${n}-leave-to`}=e,m=function(e){if(null==e)return null;if(b(e))return [Kr(e.enter),Kr(e.leave)];{const t=Kr(e);return [t,t]}}(o),g=m&&m[0],v=m&&m[1],{onBeforeEnter:y,onEnter:_,onEnterCancelled:S,onLeave:x,onLeaveCancelled:C,onBeforeAppear:k=y,onAppear:T=_,onAppearCancelled:w=S}=t,A=(e,t,n)=>{Gr(e,t?d:l),Gr(e,t?u:i),n&&n();},E=(e,t)=>{e._isLeaving=!1,Gr(e,p),Gr(e,f),Gr(e,h),t&&t();},N=e=>(t,n)=>{const o=e?T:_,i=()=>A(t,e,n);Hr(o,[t,i]),Jr((()=>{Gr(t,e?a:r),zr(t,e?d:l),qr(o)||Qr(t,s,g,i);}));};return c(t,{onBeforeEnter(e){Hr(y,[e]),zr(e,r),zr(e,i);},onBeforeAppear(e){Hr(k,[e]),zr(e,a),zr(e,u);},onEnter:N(!1),onAppear:N(!0),onLeave(e,t){e._isLeaving=!0;const n=()=>E(e,t);zr(e,p),ti(),zr(e,h),Jr((()=>{e._isLeaving&&(Gr(e,p),zr(e,f),qr(x)||Qr(e,s,v,n));})),Hr(x,[e,n]);},onEnterCancelled(e){A(e,!1),Hr(S,[e]);},onAppearCancelled(e){A(e,!0),Hr(w,[e]);},onLeaveCancelled(e){E(e),Hr(C,[e]);}})}function Kr(e){return V(e)}function zr(e,t){t.split(/\s+/).forEach((t=>t&&e.classList.add(t))),(e[Vr]||(e[Vr]=new Set)).add(t);}function Gr(e,t){t.split(/\s+/).forEach((t=>t&&e.classList.remove(t)));const n=e[Vr];n&&(n.delete(t),n.size||(e[Vr]=void 0));}function Jr(e){requestAnimationFrame((()=>{requestAnimationFrame(e);}));}let Xr=0;function Qr(e,t,n,s){const o=e._endId=++Xr,r=()=>{o===e._endId&&s();};if(n)return setTimeout(r,n);const{type:i,timeout:l,propCount:c}=Zr(e,t);if(!i)return s();const a=i+"end";let u=0;const d=()=>{e.removeEventListener(a,p),r();},p=t=>{t.target===e&&++u>=c&&d();};setTimeout((()=>{u<c&&d();}),l+1),e.addEventListener(a,p);}function Zr(e,t){const n=window.getComputedStyle(e),s=e=>(n[e]||"").split(", "),o=s(`${$r}Delay`),r=s(`${$r}Duration`),i=Yr(o,r),l=s(`${Br}Delay`),c=s(`${Br}Duration`),a=Yr(l,c);let u=null,d=0,p=0;t===$r?i>0&&(u=$r,d=i,p=r.length):t===Br?a>0&&(u=Br,d=a,p=c.length):(d=Math.max(i,a),u=d>0?i>a?$r:Br:null,p=u?u===$r?r.length:c.length:0);return {type:u,timeout:d,propCount:p,hasTransform:u===$r&&/\b(transform|all)(,|$)/.test(s(`${$r}Property`).toString())}}function Yr(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map(((t,n)=>ei(t)+ei(e[n]))))}function ei(e){return "auto"===e?0:1e3*Number(e.slice(0,-1).replace(",","."))}function ti(){return document.body.offsetHeight}const ni=Symbol("_vod"),si=Symbol("_vsh"),oi={beforeMount(e,{value:t},{transition:n}){e[ni]="none"===e.style.display?"":e.style.display,n&&t?n.beforeEnter(e):ri(e,t);},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e);},updated(e,{value:t,oldValue:n},{transition:s}){!t!=!n&&(s?t?(s.beforeEnter(e),ri(e,!0),s.enter(e)):s.leave(e,(()=>{ri(e,!1);})):ri(e,t));},beforeUnmount(e,{value:t}){ri(e,t);}};function ri(e,t){e.style.display=t?e[ni]:"none",e[si]=!t;}const ii=Symbol("");function li(e,t){if(128&e.shapeFlag){const n=e.suspense;e=n.activeBranch,n.pendingBranch&&!n.isHydrating&&n.effects.push((()=>{li(n.activeBranch,t);}));}for(;e.component;)e=e.component.subTree;if(1&e.shapeFlag&&e.el)ci(e.el,t);else if(e.type===$o)e.children.forEach((e=>li(e,t)));else if(e.type===Do){let{el:n,anchor:s}=e;for(;n&&(ci(n,t),n!==s);)n=n.nextSibling;}}function ci(e,t){if(1===e.nodeType){const n=e.style;let s="";for(const e in t)n.setProperty(`--${e}`,t[e]),s+=`--${e}: ${t[e]};`;n[ii]=s;}}const ai=/(^|;)\s*display\s*:/;const ui=/\s*!important$/;function di(e,t,n){if(p(n))n.forEach((n=>di(e,t,n)));else if(null==n&&(n=""),t.startsWith("--"))e.setProperty(t,n);else {const s=function(e,t){const n=hi[t];if(n)return n;let s=I(t);if("filter"!==s&&s in e)return hi[t]=s;s=L(s);for(let o=0;o<pi.length;o++){const n=pi[o]+s;if(n in e)return hi[t]=n}return t}(e,t);ui.test(n)?e.setProperty(O(s),n.replace(ui,""),"important"):e[s]=n;}}const pi=["Webkit","Moz","ms"],hi={};const fi="http://www.w3.org/1999/xlink";function mi(e,t,n,s){e.addEventListener(t,n,s);}const gi=Symbol("_vei");function vi(e,t,n,s,o=null){const r=e[gi]||(e[gi]={}),i=r[t];if(s&&i)i.value=s;else {const[n,l]=function(e){let t;if(yi.test(e)){let n;for(t={};n=e.match(yi);)e=e.slice(0,e.length-n[0].length),t[n[0].toLowerCase()]=!0;}const n=":"===e[2]?e.slice(3):O(e.slice(2));return [n,t]}(t);if(s){const i=r[t]=function(e,t){const n=e=>{if(e._vts){if(e._vts<=n.attached)return}else e._vts=Date.now();Ht(function(e,t){if(p(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0;},t.map((e=>t=>!t._stopped&&e&&e(t)))}return t}(e,n.value),t,5,[e]);};return n.value=e,n.attached=Si(),n}(s,o);mi(e,n,i,l);}else i&&(!function(e,t,n,s){e.removeEventListener(t,n,s);}(e,n,i,l),r[t]=void 0);}}const yi=/(?:Once|Passive|Capture)$/;let bi=0;const _i=Promise.resolve(),Si=()=>bi||(_i.then((()=>bi=0)),bi=Date.now());const xi=e=>111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123;
  /*! #__NO_SIDE_EFFECTS__ */
  function Ci(e,t){const n=ns(e);class s extends Ti{constructor(e){super(n,e,t);}}return s.def=n,s}
  /*! #__NO_SIDE_EFFECTS__ */const ki="undefined"!=typeof HTMLElement?HTMLElement:class{};class Ti extends ki{constructor(e,t={},n){super(),this._def=e,this._props=t,this._instance=null,this._connected=!1,this._resolved=!1,this._numberProps=null,this._ob=null,this.shadowRoot&&n?n(this._createVNode(),this.shadowRoot):(this.attachShadow({mode:"open"}),this._def.__asyncLoader||this._resolveProps(this._def));}connectedCallback(){this._connected=!0,this._instance||(this._resolved?this._update():this._resolveDef());}disconnectedCallback(){this._connected=!1,this._ob&&(this._ob.disconnect(),this._ob=null),en((()=>{this._connected||(sl(null,this.shadowRoot),this._instance=null);}));}_resolveDef(){this._resolved=!0;for(let n=0;n<this.attributes.length;n++)this._setAttr(this.attributes[n].name);this._ob=new MutationObserver((e=>{for(const t of e)this._setAttr(t.attributeName);})),this._ob.observe(this,{attributes:!0});const e=(e,t=!1)=>{const{props:n,styles:s}=e;let o;if(n&&!p(n))for(const r in n){const e=n[r];(e===Number||e&&e.type===Number)&&(r in this._props&&(this._props[r]=V(this._props[r])),(o||(o=Object.create(null)))[I(r)]=!0);}this._numberProps=o,t&&this._resolveProps(e),this._applyStyles(s),this._update();},t=this._def.__asyncLoader;t?t().then((t=>e(t,!0))):e(this._def);}_resolveProps(e){const{props:t}=e,n=p(t)?t:Object.keys(t||{});for(const s of Object.keys(this))"_"!==s[0]&&n.includes(s)&&this._setProp(s,this[s],!0,!1);for(const s of n.map(I))Object.defineProperty(this,s,{get(){return this._getProp(s)},set(e){this._setProp(s,e);}});}_setAttr(e){let t=this.hasAttribute(e)?this.getAttribute(e):void 0;const n=I(e);this._numberProps&&this._numberProps[n]&&(t=V(t)),this._setProp(n,t,!1);}_getProp(e){return this._props[e]}_setProp(e,t,n=!0,s=!0){t!==this._props[e]&&(this._props[e]=t,s&&this._instance&&this._update(),n&&(!0===t?this.setAttribute(O(e),""):"string"==typeof t||"number"==typeof t?this.setAttribute(O(e),t+""):t||this.removeAttribute(O(e))));}_update(){sl(this._createVNode(),this.shadowRoot);}_createVNode(){const e=er(this._def,c({},this._props));return this._instance||(e.ce=e=>{this._instance=e,e.isCE=!0;const t=(e,t)=>{this.dispatchEvent(new CustomEvent(e,{detail:t}));};e.emit=(e,...n)=>{t(e,n),O(e)!==e&&t(O(e),n);};let n=this;for(;n=n&&(n.parentNode||n.host);)if(n instanceof Ti){e.parent=n._instance,e.provides=n._instance.provides;break}}),e}_applyStyles(e){e&&e.forEach((e=>{const t=document.createElement("style");t.textContent=e,this.shadowRoot.appendChild(t);}));}}const wi=new WeakMap,Ai=new WeakMap,Ei=Symbol("_moveCb"),Ni=Symbol("_enterCb"),Ii={name:"TransitionGroup",props:c({},jr,{tag:String,moveClass:String}),setup(e,{slots:t}){const n=pr(),s=Kn();let o,r;return bs((()=>{if(!o.length)return;const t=e.moveClass||`${e.name||"v"}-move`;if(!function(e,t,n){const s=e.cloneNode(),o=e[Vr];o&&o.forEach((e=>{e.split(/\s+/).forEach((e=>e&&s.classList.remove(e)));}));n.split(/\s+/).forEach((e=>e&&s.classList.add(e))),s.style.display="none";const r=1===t.nodeType?t:t.parentNode;r.appendChild(s);const{hasTransform:i}=Zr(s);return r.removeChild(s),i}(o[0].el,n.vnode.el,t))return;o.forEach(Oi),o.forEach(Li);const s=o.filter(Fi);ti(),s.forEach((e=>{const n=e.el,s=n.style;zr(n,t),s.transform=s.webkitTransform=s.transitionDuration="";const o=n[Ei]=e=>{e&&e.target!==n||e&&!/transform$/.test(e.propertyName)||(n.removeEventListener("transitionend",o),n[Ei]=null,Gr(n,t));};n.addEventListener("transitionend",o);}));})),()=>{const i=Ct(e),l=Wr(i);let c=i.tag||$o;if(o=[],r)for(let e=0;e<r.length;e++){const t=r[e];t.el&&t.el instanceof Element&&(o.push(t),es(t,Qn(t,l,s,n)),wi.set(t,t.el.getBoundingClientRect()));}r=t.default?ts(t.default()):[];for(let e=0;e<r.length;e++){const t=r[e];null!=t.key&&es(t,Qn(t,l,s,n));}return er(c,null,r)}}},Ri=Ii;function Oi(e){const t=e.el;t[Ei]&&t[Ei](),t[Ni]&&t[Ni]();}function Li(e){Ai.set(e,e.el.getBoundingClientRect());}function Fi(e){const t=wi.get(e),n=Ai.get(e),s=t.left-n.left,o=t.top-n.top;if(s||o){const t=e.el.style;return t.transform=t.webkitTransform=`translate(${s}px,${o}px)`,t.transitionDuration="0s",e}}const Mi=e=>{const t=e.props["onUpdate:modelValue"]||!1;return p(t)?e=>P(t,e):t};function Pi(e){e.target.composing=!0;}function $i(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")));}const Bi=Symbol("_assign"),Vi={created(e,{modifiers:{lazy:t,trim:n,number:s}},o){e[Bi]=Mi(o);const r=s||o.props&&"number"===o.props.type;mi(e,t?"change":"input",(t=>{if(t.target.composing)return;let s=e.value;n&&(s=s.trim()),r&&(s=B(s)),e[Bi](s);})),n&&mi(e,"change",(()=>{e.value=e.value.trim();})),t||(mi(e,"compositionstart",Pi),mi(e,"compositionend",$i),mi(e,"change",$i));},mounted(e,{value:t}){e.value=null==t?"":t;},beforeUpdate(e,{value:t,modifiers:{lazy:n,trim:s,number:o}},r){if(e[Bi]=Mi(r),e.composing)return;const i=null==t?"":t;if((!o&&"number"!==e.type||/^0\d/.test(e.value)?e.value:B(e.value))!==i){if(document.activeElement===e&&"range"!==e.type){if(n)return;if(s&&e.value.trim()===i)return}e.value=i;}}},Di={deep:!0,created(e,t,n){e[Bi]=Mi(n),mi(e,"change",(()=>{const t=e._modelValue,n=Wi(e),s=e.checked,o=e[Bi];if(p(t)){const e=ne(t,n),r=-1!==e;if(s&&!r)o(t.concat(n));else if(!s&&r){const n=[...t];n.splice(e,1),o(n);}}else if(f(t)){const e=new Set(t);s?e.add(n):e.delete(n),o(e);}else o(Ki(e,s));}));},mounted:Ui,beforeUpdate(e,t,n){e[Bi]=Mi(n),Ui(e,t,n);}};function Ui(e,{value:t,oldValue:n},s){e._modelValue=t,p(t)?e.checked=ne(t,s.props.value)>-1:f(t)?e.checked=t.has(s.props.value):t!==n&&(e.checked=te(t,Ki(e,!0)));}const ji={created(e,{value:t},n){e.checked=te(t,n.props.value),e[Bi]=Mi(n),mi(e,"change",(()=>{e[Bi](Wi(e));}));},beforeUpdate(e,{value:t,oldValue:n},s){e[Bi]=Mi(s),t!==n&&(e.checked=te(t,s.props.value));}},Hi={deep:!0,created(e,{value:t,modifiers:{number:n}},s){const o=f(t);mi(e,"change",(()=>{const t=Array.prototype.filter.call(e.options,(e=>e.selected)).map((e=>n?B(Wi(e)):Wi(e)));e[Bi](e.multiple?o?new Set(t):t:t[0]),e._assigning=!0,en((()=>{e._assigning=!1;}));})),e[Bi]=Mi(s);},mounted(e,{value:t,modifiers:{}}){qi(e,t);},beforeUpdate(e,t,n){e[Bi]=Mi(n);},updated(e,{value:t,modifiers:{}}){e._assigning||qi(e,t);}};function qi(e,t,n){const s=e.multiple,o=p(t);if(!s||o||f(t)){for(let n=0,r=e.options.length;n<r;n++){const r=e.options[n],i=Wi(r);if(s)if(o){const e=typeof i;r.selected="string"===e||"number"===e?t.some((e=>String(e)===String(i))):ne(t,i)>-1;}else r.selected=t.has(i);else if(te(Wi(r),t))return void(e.selectedIndex!==n&&(e.selectedIndex=n))}s||-1===e.selectedIndex||(e.selectedIndex=-1);}}function Wi(e){return "_value"in e?e._value:e.value}function Ki(e,t){const n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}const zi={created(e,t,n){Gi(e,t,n,null,"created");},mounted(e,t,n){Gi(e,t,n,null,"mounted");},beforeUpdate(e,t,n,s){Gi(e,t,n,s,"beforeUpdate");},updated(e,t,n,s){Gi(e,t,n,s,"updated");}};function Gi(e,t,n,s,o){const r=function(e,t){switch(e){case"SELECT":return Hi;case"TEXTAREA":return Vi;default:switch(t){case"checkbox":return Di;case"radio":return ji;default:return Vi}}}(e.tagName,n.props&&n.props.type)[o];r&&r(e,t,n,s);}const Ji=["ctrl","shift","alt","meta"],Xi={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&0!==e.button,middle:e=>"button"in e&&1!==e.button,right:e=>"button"in e&&2!==e.button,exact:(e,t)=>Ji.some((n=>e[`${n}Key`]&&!t.includes(n)))},Qi={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},Zi=c({patchProp:(e,t,n,s,o,r,c,a,u)=>{const d="svg"===o;"class"===t?function(e,t,n){const s=e[Vr];s&&(t=(t?[t,...s]:[...s]).join(" ")),null==t?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t;}(e,s,d):"style"===t?function(e,t,n){const s=e.style,o=v(n);let r=!1;if(n&&!o){if(t)if(v(t))for(const e of t.split(";")){const t=e.slice(0,e.indexOf(":")).trim();null==n[t]&&di(s,t,"");}else for(const e in t)null==n[e]&&di(s,e,"");for(const e in n)"display"===e&&(r=!0),di(s,e,n[e]);}else if(o){if(t!==n){const e=s[ii];e&&(n+=";"+e),s.cssText=n,r=ai.test(n);}}else t&&e.removeAttribute("style");ni in e&&(e[ni]=r?s.display:"",e[si]&&(s.display="none"));}(e,n,s):i(t)?l(t)||vi(e,t,0,s,c):("."===t[0]?(t=t.slice(1),1):"^"===t[0]?(t=t.slice(1),0):function(e,t,n,s){if(s)return "innerHTML"===t||"textContent"===t||!!(t in e&&xi(t)&&g(n));if("spellcheck"===t||"draggable"===t||"translate"===t)return !1;if("form"===t)return !1;if("list"===t&&"INPUT"===e.tagName)return !1;if("type"===t&&"TEXTAREA"===e.tagName)return !1;if("width"===t||"height"===t){const t=e.tagName;if("IMG"===t||"VIDEO"===t||"CANVAS"===t||"SOURCE"===t)return !1}if(xi(t)&&v(n))return !1;return t in e}(e,t,s,d))?function(e,t,n,s,o,r,i){if("innerHTML"===t||"textContent"===t)return s&&i(s,o,r),void(e[t]=null==n?"":n);const l=e.tagName;if("value"===t&&"PROGRESS"!==l&&!l.includes("-")){const s=null==n?"":n;return ("OPTION"===l?e.getAttribute("value")||"":e.value)===s&&"_value"in e||(e.value=s),null==n&&e.removeAttribute(t),void(e._value=n)}let c=!1;if(""===n||null==n){const s=typeof e[t];"boolean"===s?n=ee(n):null==n&&"string"===s?(n="",c=!0):"number"===s&&(n=0,c=!0);}try{e[t]=n;}catch(a){}c&&e.removeAttribute(t);}(e,t,s,r,c,a,u):("true-value"===t?e._trueValue=s:"false-value"===t&&(e._falseValue=s),function(e,t,n,s,o){if(s&&t.startsWith("xlink:"))null==n?e.removeAttributeNS(fi,t.slice(6,t.length)):e.setAttributeNS(fi,t,n);else {const s=Y(t);null==n||s&&!ee(n)?e.removeAttribute(t):e.setAttribute(t,s?"":n);}}(e,t,s,d));}},Pr);let Yi,el=!1;function tl(){return Yi||(Yi=xo(Zi))}function nl(){return Yi=el?Yi:Co(Zi),el=!0,Yi}const sl=(...e)=>{tl().render(...e);},ol=(...e)=>{nl().hydrate(...e);};function rl(e){return e instanceof SVGElement?"svg":"function"==typeof MathMLElement&&e instanceof MathMLElement?"mathml":void 0}function il(e){if(v(e)){return document.querySelector(e)}return e}const ll=o,cl=Symbol(""),al=Symbol(""),ul=Symbol(""),dl=Symbol(""),pl=Symbol(""),hl=Symbol(""),fl=Symbol(""),ml=Symbol(""),gl=Symbol(""),vl=Symbol(""),yl=Symbol(""),bl=Symbol(""),_l=Symbol(""),Sl=Symbol(""),xl=Symbol(""),Cl=Symbol(""),kl=Symbol(""),Tl=Symbol(""),wl=Symbol(""),Al=Symbol(""),El=Symbol(""),Nl=Symbol(""),Il=Symbol(""),Rl=Symbol(""),Ol=Symbol(""),Ll=Symbol(""),Fl=Symbol(""),Ml=Symbol(""),Pl=Symbol(""),$l=Symbol(""),Bl=Symbol(""),Vl=Symbol(""),Dl=Symbol(""),Ul=Symbol(""),jl=Symbol(""),Hl=Symbol(""),ql=Symbol(""),Wl=Symbol(""),Kl=Symbol(""),zl={[cl]:"Fragment",[al]:"Teleport",[ul]:"Suspense",[dl]:"KeepAlive",[pl]:"BaseTransition",[hl]:"openBlock",[fl]:"createBlock",[ml]:"createElementBlock",[gl]:"createVNode",[vl]:"createElementVNode",[yl]:"createCommentVNode",[bl]:"createTextVNode",[_l]:"createStaticVNode",[Sl]:"resolveComponent",[xl]:"resolveDynamicComponent",[Cl]:"resolveDirective",[kl]:"resolveFilter",[Tl]:"withDirectives",[wl]:"renderList",[Al]:"renderSlot",[El]:"createSlots",[Nl]:"toDisplayString",[Il]:"mergeProps",[Rl]:"normalizeClass",[Ol]:"normalizeStyle",[Ll]:"normalizeProps",[Fl]:"guardReactiveProps",[Ml]:"toHandlers",[Pl]:"camelize",[$l]:"capitalize",[Bl]:"toHandlerKey",[Vl]:"setBlockTracking",[Dl]:"pushScopeId",[Ul]:"popScopeId",[jl]:"withCtx",[Hl]:"unref",[ql]:"isRef",[Wl]:"withMemo",[Kl]:"isMemoSame"};const Gl={start:{line:1,column:1,offset:0},end:{line:1,column:1,offset:0},source:""};function Jl(e,t,n,s,o,r,i,l=!1,c=!1,a=!1,u=Gl){return e&&(l?(e.helper(hl),e.helper(rc(e.inSSR,a))):e.helper(oc(e.inSSR,a)),i&&e.helper(Tl)),{type:13,tag:t,props:n,children:s,patchFlag:o,dynamicProps:r,directives:i,isBlock:l,disableTracking:c,isComponent:a,loc:u}}function Xl(e,t=Gl){return {type:17,loc:t,elements:e}}function Ql(e,t=Gl){return {type:15,loc:t,properties:e}}function Zl(e,t){return {type:16,loc:Gl,key:v(e)?Yl(e,!0):e,value:t}}function Yl(e,t=!1,n=Gl,s=0){return {type:4,loc:n,content:e,isStatic:t,constType:t?3:s}}function ec(e,t=Gl){return {type:8,loc:t,children:e}}function tc(e,t=[],n=Gl){return {type:14,loc:n,callee:e,arguments:t}}function nc(e,t=void 0,n=!1,s=!1,o=Gl){return {type:18,params:e,returns:t,newline:n,isSlot:s,loc:o}}function sc(e,t,n,s=!0){return {type:19,test:e,consequent:t,alternate:n,newline:s,loc:Gl}}function oc(e,t){return e||t?gl:vl}function rc(e,t){return e||t?fl:ml}function ic(e,{helper:t,removeHelper:n,inSSR:s}){e.isBlock||(e.isBlock=!0,n(oc(s,e.isComponent)),t(hl),t(rc(s,e.isComponent)));}const lc=new Uint8Array([123,123]),cc=new Uint8Array([125,125]);function ac(e){return e>=97&&e<=122||e>=65&&e<=90}function uc(e){return 32===e||10===e||9===e||12===e||13===e}function dc(e){return 47===e||62===e||uc(e)}function pc(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}const hc={Cdata:new Uint8Array([67,68,65,84,65,91]),CdataEnd:new Uint8Array([93,93,62]),CommentEnd:new Uint8Array([45,45,62]),ScriptEnd:new Uint8Array([60,47,115,99,114,105,112,116]),StyleEnd:new Uint8Array([60,47,115,116,121,108,101]),TitleEnd:new Uint8Array([60,47,116,105,116,108,101]),TextareaEnd:new Uint8Array([60,47,116,101,120,116,97,114,101,97])};function fc(e){throw e}function mc(e){}function gc(e,t,n,s){const o=new SyntaxError(String(`https://vuejs.org/error-reference/#compiler-${e}`));return o.code=e,o.loc=t,o}const vc=e=>4===e.type&&e.isStatic;function yc(e){switch(e){case"Teleport":case"teleport":return al;case"Suspense":case"suspense":return ul;case"KeepAlive":case"keep-alive":return dl;case"BaseTransition":case"base-transition":return pl}}const bc=/^\d|[^\$\w]/,_c=e=>!bc.test(e),Sc=/[A-Za-z_$\xA0-\uFFFF]/,xc=/[\.\?\w$\xA0-\uFFFF]/,Cc=/\s+[.[]\s*|\s*[.[]\s+/g,kc=e=>{e=e.trim().replace(Cc,(e=>e.trim()));let t=0,n=[],s=0,o=0,r=null;for(let i=0;i<e.length;i++){const l=e.charAt(i);switch(t){case 0:if("["===l)n.push(t),t=1,s++;else if("("===l)n.push(t),t=2,o++;else if(!(0===i?Sc:xc).test(l))return !1;break;case 1:"'"===l||'"'===l||"`"===l?(n.push(t),t=3,r=l):"["===l?s++:"]"===l&&(--s||(t=n.pop()));break;case 2:if("'"===l||'"'===l||"`"===l)n.push(t),t=3,r=l;else if("("===l)o++;else if(")"===l){if(i===e.length-1)return !1;--o||(t=n.pop());}break;case 3:l===r&&(t=n.pop(),r=null);}}return !s&&!o};function Tc(e,t,n=!1){for(let s=0;s<e.props.length;s++){const o=e.props[s];if(7===o.type&&(n||o.exp)&&(v(t)?o.name===t:t.test(o.name)))return o}}function wc(e,t,n=!1,s=!1){for(let o=0;o<e.props.length;o++){const r=e.props[o];if(6===r.type){if(n)continue;if(r.name===t&&(r.value||s))return r}else if("bind"===r.name&&(r.exp||s)&&Ac(r.arg,t))return r}}function Ac(e,t){return !(!e||!vc(e)||e.content!==t)}function Ec(e){return 5===e.type||2===e.type}function Nc(e){return 7===e.type&&"slot"===e.name}function Ic(e){return 1===e.type&&3===e.tagType}function Rc(e){return 1===e.type&&2===e.tagType}const Oc=new Set([Ll,Fl]);function Lc(e,t=[]){if(e&&!v(e)&&14===e.type){const n=e.callee;if(!v(n)&&Oc.has(n))return Lc(e.arguments[0],t.concat(e))}return [e,t]}function Fc(e,t,n){let s,o,r=13===e.type?e.props:e.arguments[2],i=[];if(r&&!v(r)&&14===r.type){const e=Lc(r);r=e[0],i=e[1],o=i[i.length-1];}if(null==r||v(r))s=Ql([t]);else if(14===r.type){const e=r.arguments[0];v(e)||15!==e.type?r.callee===Ml?s=tc(n.helper(Il),[Ql([t]),r]):r.arguments.unshift(Ql([t])):Mc(t,e)||e.properties.unshift(t),!s&&(s=r);}else 15===r.type?(Mc(t,r)||r.properties.unshift(t),s=r):(s=tc(n.helper(Il),[Ql([t]),r]),o&&o.callee===Fl&&(o=i[i.length-2]));13===e.type?o?o.arguments[0]=s:e.props=s:o?o.arguments[0]=s:e.arguments[2]=s;}function Mc(e,t){let n=!1;if(4===e.key.type){const s=e.key.content;n=t.properties.some((e=>4===e.key.type&&e.key.content===s));}return n}function Pc(e,t){return `_${t}_${e.replace(/[^\w]/g,((t,n)=>"-"===t?"_":e.charCodeAt(n).toString()))}`}const $c=/([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,Bc={parseMode:"base",ns:0,delimiters:["{{","}}"],getNamespace:()=>0,isVoidTag:r,isPreTag:r,isCustomElement:r,onError:fc,onWarn:mc,comments:!1,prefixIdentifiers:!1};let Vc=Bc,Dc=null,Uc="",jc=null,Hc=null,qc="",Wc=-1,Kc=-1,zc=0,Gc=!1,Jc=null;const Xc=[],Qc=new class{constructor(e,t){this.stack=e,this.cbs=t,this.state=1,this.buffer="",this.sectionStart=0,this.index=0,this.entityStart=0,this.baseState=1,this.inRCDATA=!1,this.inXML=!1,this.inVPre=!1,this.newlines=[],this.mode=0,this.delimiterOpen=lc,this.delimiterClose=cc,this.delimiterIndex=-1,this.currentSequence=void 0,this.sequenceIndex=0;}get inSFCRoot(){return 2===this.mode&&0===this.stack.length}reset(){this.state=1,this.mode=0,this.buffer="",this.sectionStart=0,this.index=0,this.baseState=1,this.inRCDATA=!1,this.currentSequence=void 0,this.newlines.length=0,this.delimiterOpen=lc,this.delimiterClose=cc;}getPos(e){let t=1,n=e+1;for(let s=this.newlines.length-1;s>=0;s--){const o=this.newlines[s];if(e>o){t=s+2,n=e-o;break}}return {column:n,line:t,offset:e}}peek(){return this.buffer.charCodeAt(this.index+1)}stateText(e){60===e?(this.index>this.sectionStart&&this.cbs.ontext(this.sectionStart,this.index),this.state=5,this.sectionStart=this.index):this.inVPre||e!==this.delimiterOpen[0]||(this.state=2,this.delimiterIndex=0,this.stateInterpolationOpen(e));}stateInterpolationOpen(e){if(e===this.delimiterOpen[this.delimiterIndex])if(this.delimiterIndex===this.delimiterOpen.length-1){const e=this.index+1-this.delimiterOpen.length;e>this.sectionStart&&this.cbs.ontext(this.sectionStart,e),this.state=3,this.sectionStart=e;}else this.delimiterIndex++;else this.inRCDATA?(this.state=32,this.stateInRCDATA(e)):(this.state=1,this.stateText(e));}stateInterpolation(e){e===this.delimiterClose[0]&&(this.state=4,this.delimiterIndex=0,this.stateInterpolationClose(e));}stateInterpolationClose(e){e===this.delimiterClose[this.delimiterIndex]?this.delimiterIndex===this.delimiterClose.length-1?(this.cbs.oninterpolation(this.sectionStart,this.index+1),this.state=this.inRCDATA?32:1,this.sectionStart=this.index+1):this.delimiterIndex++:(this.state=3,this.stateInterpolation(e));}stateSpecialStartSequence(e){const t=this.sequenceIndex===this.currentSequence.length;if(t?dc(e):(32|e)===this.currentSequence[this.sequenceIndex]){if(!t)return void this.sequenceIndex++}else this.inRCDATA=!1;this.sequenceIndex=0,this.state=6,this.stateInTagName(e);}stateInRCDATA(e){if(this.sequenceIndex===this.currentSequence.length){if(62===e||uc(e)){const t=this.index-this.currentSequence.length;if(this.sectionStart<t){const e=this.index;this.index=t,this.cbs.ontext(this.sectionStart,t),this.index=e;}return this.sectionStart=t+2,this.stateInClosingTagName(e),void(this.inRCDATA=!1)}this.sequenceIndex=0;}(32|e)===this.currentSequence[this.sequenceIndex]?this.sequenceIndex+=1:0===this.sequenceIndex?this.currentSequence===hc.TitleEnd||this.currentSequence===hc.TextareaEnd&&!this.inSFCRoot?e===this.delimiterOpen[0]&&(this.state=2,this.delimiterIndex=0,this.stateInterpolationOpen(e)):this.fastForwardTo(60)&&(this.sequenceIndex=1):this.sequenceIndex=Number(60===e);}stateCDATASequence(e){e===hc.Cdata[this.sequenceIndex]?++this.sequenceIndex===hc.Cdata.length&&(this.state=28,this.currentSequence=hc.CdataEnd,this.sequenceIndex=0,this.sectionStart=this.index+1):(this.sequenceIndex=0,this.state=23,this.stateInDeclaration(e));}fastForwardTo(e){for(;++this.index<this.buffer.length;){const t=this.buffer.charCodeAt(this.index);if(10===t&&this.newlines.push(this.index),t===e)return !0}return this.index=this.buffer.length-1,!1}stateInCommentLike(e){e===this.currentSequence[this.sequenceIndex]?++this.sequenceIndex===this.currentSequence.length&&(this.currentSequence===hc.CdataEnd?this.cbs.oncdata(this.sectionStart,this.index-2):this.cbs.oncomment(this.sectionStart,this.index-2),this.sequenceIndex=0,this.sectionStart=this.index+1,this.state=1):0===this.sequenceIndex?this.fastForwardTo(this.currentSequence[0])&&(this.sequenceIndex=1):e!==this.currentSequence[this.sequenceIndex-1]&&(this.sequenceIndex=0);}startSpecial(e,t){this.enterRCDATA(e,t),this.state=31;}enterRCDATA(e,t){this.inRCDATA=!0,this.currentSequence=e,this.sequenceIndex=t;}stateBeforeTagName(e){33===e?(this.state=22,this.sectionStart=this.index+1):63===e?(this.state=24,this.sectionStart=this.index+1):ac(e)?(this.sectionStart=this.index,this.state=0===this.mode?6:this.inSFCRoot?34:this.inXML?6:116===e?30:115===e?29:6):47===e?this.state=8:(this.state=1,this.stateText(e));}stateInTagName(e){dc(e)&&this.handleTagName(e);}stateInSFCRootTagName(e){if(dc(e)){const t=this.buffer.slice(this.sectionStart,this.index);"template"!==t&&this.enterRCDATA(pc("</"+t),0),this.handleTagName(e);}}handleTagName(e){this.cbs.onopentagname(this.sectionStart,this.index),this.sectionStart=-1,this.state=11,this.stateBeforeAttrName(e);}stateBeforeClosingTagName(e){uc(e)||(62===e?(this.state=1,this.sectionStart=this.index+1):(this.state=ac(e)?9:27,this.sectionStart=this.index));}stateInClosingTagName(e){(62===e||uc(e))&&(this.cbs.onclosetag(this.sectionStart,this.index),this.sectionStart=-1,this.state=10,this.stateAfterClosingTagName(e));}stateAfterClosingTagName(e){62===e&&(this.state=1,this.sectionStart=this.index+1);}stateBeforeAttrName(e){62===e?(this.cbs.onopentagend(this.index),this.state=this.inRCDATA?32:1,this.sectionStart=this.index+1):47===e?this.state=7:60===e&&47===this.peek()?(this.cbs.onopentagend(this.index),this.state=5,this.sectionStart=this.index):uc(e)||this.handleAttrStart(e);}handleAttrStart(e){118===e&&45===this.peek()?(this.state=13,this.sectionStart=this.index):46===e||58===e||64===e||35===e?(this.cbs.ondirname(this.index,this.index+1),this.state=14,this.sectionStart=this.index+1):(this.state=12,this.sectionStart=this.index);}stateInSelfClosingTag(e){62===e?(this.cbs.onselfclosingtag(this.index),this.state=1,this.sectionStart=this.index+1,this.inRCDATA=!1):uc(e)||(this.state=11,this.stateBeforeAttrName(e));}stateInAttrName(e){(61===e||dc(e))&&(this.cbs.onattribname(this.sectionStart,this.index),this.handleAttrNameEnd(e));}stateInDirName(e){61===e||dc(e)?(this.cbs.ondirname(this.sectionStart,this.index),this.handleAttrNameEnd(e)):58===e?(this.cbs.ondirname(this.sectionStart,this.index),this.state=14,this.sectionStart=this.index+1):46===e&&(this.cbs.ondirname(this.sectionStart,this.index),this.state=16,this.sectionStart=this.index+1);}stateInDirArg(e){61===e||dc(e)?(this.cbs.ondirarg(this.sectionStart,this.index),this.handleAttrNameEnd(e)):91===e?this.state=15:46===e&&(this.cbs.ondirarg(this.sectionStart,this.index),this.state=16,this.sectionStart=this.index+1);}stateInDynamicDirArg(e){93===e?this.state=14:(61===e||dc(e))&&(this.cbs.ondirarg(this.sectionStart,this.index+1),this.handleAttrNameEnd(e));}stateInDirModifier(e){61===e||dc(e)?(this.cbs.ondirmodifier(this.sectionStart,this.index),this.handleAttrNameEnd(e)):46===e&&(this.cbs.ondirmodifier(this.sectionStart,this.index),this.sectionStart=this.index+1);}handleAttrNameEnd(e){this.sectionStart=this.index,this.state=17,this.cbs.onattribnameend(this.index),this.stateAfterAttrName(e);}stateAfterAttrName(e){61===e?this.state=18:47===e||62===e?(this.cbs.onattribend(0,this.sectionStart),this.sectionStart=-1,this.state=11,this.stateBeforeAttrName(e)):uc(e)||(this.cbs.onattribend(0,this.sectionStart),this.handleAttrStart(e));}stateBeforeAttrValue(e){34===e?(this.state=19,this.sectionStart=this.index+1):39===e?(this.state=20,this.sectionStart=this.index+1):uc(e)||(this.sectionStart=this.index,this.state=21,this.stateInAttrValueNoQuotes(e));}handleInAttrValue(e,t){(e===t||this.fastForwardTo(t))&&(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(34===t?3:2,this.index+1),this.state=11);}stateInAttrValueDoubleQuotes(e){this.handleInAttrValue(e,34);}stateInAttrValueSingleQuotes(e){this.handleInAttrValue(e,39);}stateInAttrValueNoQuotes(e){uc(e)||62===e?(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(1,this.index),this.state=11,this.stateBeforeAttrName(e)):39!==e&&60!==e&&61!==e&&96!==e||this.cbs.onerr(18,this.index);}stateBeforeDeclaration(e){91===e?(this.state=26,this.sequenceIndex=0):this.state=45===e?25:23;}stateInDeclaration(e){(62===e||this.fastForwardTo(62))&&(this.state=1,this.sectionStart=this.index+1);}stateInProcessingInstruction(e){(62===e||this.fastForwardTo(62))&&(this.cbs.onprocessinginstruction(this.sectionStart,this.index),this.state=1,this.sectionStart=this.index+1);}stateBeforeComment(e){45===e?(this.state=28,this.currentSequence=hc.CommentEnd,this.sequenceIndex=2,this.sectionStart=this.index+1):this.state=23;}stateInSpecialComment(e){(62===e||this.fastForwardTo(62))&&(this.cbs.oncomment(this.sectionStart,this.index),this.state=1,this.sectionStart=this.index+1);}stateBeforeSpecialS(e){e===hc.ScriptEnd[3]?this.startSpecial(hc.ScriptEnd,4):e===hc.StyleEnd[3]?this.startSpecial(hc.StyleEnd,4):(this.state=6,this.stateInTagName(e));}stateBeforeSpecialT(e){e===hc.TitleEnd[3]?this.startSpecial(hc.TitleEnd,4):e===hc.TextareaEnd[3]?this.startSpecial(hc.TextareaEnd,4):(this.state=6,this.stateInTagName(e));}startEntity(){}stateInEntity(){}parse(e){for(this.buffer=e;this.index<this.buffer.length;){const e=this.buffer.charCodeAt(this.index);switch(10===e&&this.newlines.push(this.index),this.state){case 1:this.stateText(e);break;case 2:this.stateInterpolationOpen(e);break;case 3:this.stateInterpolation(e);break;case 4:this.stateInterpolationClose(e);break;case 31:this.stateSpecialStartSequence(e);break;case 32:this.stateInRCDATA(e);break;case 26:this.stateCDATASequence(e);break;case 19:this.stateInAttrValueDoubleQuotes(e);break;case 12:this.stateInAttrName(e);break;case 13:this.stateInDirName(e);break;case 14:this.stateInDirArg(e);break;case 15:this.stateInDynamicDirArg(e);break;case 16:this.stateInDirModifier(e);break;case 28:this.stateInCommentLike(e);break;case 27:this.stateInSpecialComment(e);break;case 11:this.stateBeforeAttrName(e);break;case 6:this.stateInTagName(e);break;case 34:this.stateInSFCRootTagName(e);break;case 9:this.stateInClosingTagName(e);break;case 5:this.stateBeforeTagName(e);break;case 17:this.stateAfterAttrName(e);break;case 20:this.stateInAttrValueSingleQuotes(e);break;case 18:this.stateBeforeAttrValue(e);break;case 8:this.stateBeforeClosingTagName(e);break;case 10:this.stateAfterClosingTagName(e);break;case 29:this.stateBeforeSpecialS(e);break;case 30:this.stateBeforeSpecialT(e);break;case 21:this.stateInAttrValueNoQuotes(e);break;case 7:this.stateInSelfClosingTag(e);break;case 23:this.stateInDeclaration(e);break;case 22:this.stateBeforeDeclaration(e);break;case 25:this.stateBeforeComment(e);break;case 24:this.stateInProcessingInstruction(e);break;case 33:this.stateInEntity();}this.index++;}this.cleanup(),this.finish();}cleanup(){this.sectionStart!==this.index&&(1===this.state||32===this.state&&0===this.sequenceIndex?(this.cbs.ontext(this.sectionStart,this.index),this.sectionStart=this.index):19!==this.state&&20!==this.state&&21!==this.state||(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=this.index));}finish(){this.handleTrailingData(),this.cbs.onend();}handleTrailingData(){const e=this.buffer.length;this.sectionStart>=e||(28===this.state?this.currentSequence===hc.CdataEnd?this.cbs.oncdata(this.sectionStart,e):this.cbs.oncomment(this.sectionStart,e):6===this.state||11===this.state||18===this.state||17===this.state||12===this.state||13===this.state||14===this.state||15===this.state||16===this.state||20===this.state||19===this.state||21===this.state||9===this.state||this.cbs.ontext(this.sectionStart,e));}emitCodePoint(e,t){}}(Xc,{onerr:ga,ontext(e,t){na(ea(e,t),e,t);},ontextentity(e,t,n){na(e,t,n);},oninterpolation(e,t){if(Gc)return na(ea(e,t),e,t);let n=e+Qc.delimiterOpen.length,s=t-Qc.delimiterClose.length;for(;uc(Uc.charCodeAt(n));)n++;for(;uc(Uc.charCodeAt(s-1));)s--;let o=ea(n,s);o.includes("&")&&(o=Vc.decodeEntities(o,!1)),da({type:5,content:ma(o,!1,pa(n,s)),loc:pa(e,t)});},onopentagname(e,t){const n=ea(e,t);jc={type:1,tag:n,ns:Vc.getNamespace(n,Xc[0],Vc.ns),tagType:0,props:[],children:[],loc:pa(e-1,t),codegenNode:void 0};},onopentagend(e){ta(e);},onclosetag(e,t){const n=ea(e,t);if(!Vc.isVoidTag(n)){let s=!1;for(let e=0;e<Xc.length;e++){if(Xc[e].tag.toLowerCase()===n.toLowerCase()){s=!0;for(let n=0;n<=e;n++){sa(Xc.shift(),t,n<e);}break}}s||oa(e,60);}},onselfclosingtag(e){var t;const n=jc.tag;jc.isSelfClosing=!0,ta(e),(null==(t=Xc[0])?void 0:t.tag)===n&&sa(Xc.shift(),e);},onattribname(e,t){Hc={type:6,name:ea(e,t),nameLoc:pa(e,t),value:void 0,loc:pa(e)};},ondirname(e,t){const n=ea(e,t),s="."===n||":"===n?"bind":"@"===n?"on":"#"===n?"slot":n.slice(2);if(Gc||""===s)Hc={type:6,name:n,nameLoc:pa(e,t),value:void 0,loc:pa(e)};else if(Hc={type:7,name:s,rawName:n,exp:void 0,arg:void 0,modifiers:"."===n?["prop"]:[],loc:pa(e)},"pre"===s){Gc=Qc.inVPre=!0,Jc=jc;const e=jc.props;for(let t=0;t<e.length;t++)7===e[t].type&&(e[t]=fa(e[t]));}},ondirarg(e,t){if(e===t)return;const n=ea(e,t);if(Gc)Hc.name+=n,ha(Hc.nameLoc,t);else {const s="["!==n[0];Hc.arg=ma(s?n:n.slice(1,-1),s,pa(e,t),s?3:0);}},ondirmodifier(e,t){const n=ea(e,t);if(Gc)Hc.name+="."+n,ha(Hc.nameLoc,t);else if("slot"===Hc.name){const e=Hc.arg;e&&(e.content+="."+n,ha(e.loc,t));}else Hc.modifiers.push(n);},onattribdata(e,t){qc+=ea(e,t),Wc<0&&(Wc=e),Kc=t;},onattribentity(e,t,n){qc+=e,Wc<0&&(Wc=t),Kc=n;},onattribnameend(e){const t=ea(Hc.loc.start.offset,e);7===Hc.type&&(Hc.rawName=t),jc.props.some((e=>(7===e.type?e.rawName:e.name)===t));},onattribend(e,t){if(jc&&Hc){if(ha(Hc.loc,t),0!==e)if(qc.includes("&")&&(qc=Vc.decodeEntities(qc,!0)),6===Hc.type)"class"===Hc.name&&(qc=ua(qc).trim()),Hc.value={type:2,content:qc,loc:1===e?pa(Wc,Kc):pa(Wc-1,Kc+1)},Qc.inSFCRoot&&"template"===jc.tag&&"lang"===Hc.name&&qc&&"html"!==qc&&Qc.enterRCDATA(pc("</template"),0);else {let e=0;Hc.exp=ma(qc,!1,pa(Wc,Kc),0,e),"for"===Hc.name&&(Hc.forParseResult=function(e){const t=e.loc,n=e.content,s=n.match($c);if(!s)return;const[,o,r]=s,i=(e,n,s=!1)=>{const o=t.start.offset+n;return ma(e,!1,pa(o,o+e.length),0,s?1:0)},l={source:i(r.trim(),n.indexOf(r,o.length)),value:void 0,key:void 0,index:void 0,finalized:!1};let c=o.trim().replace(Yc,"").trim();const a=o.indexOf(c),u=c.match(Zc);if(u){c=c.replace(Zc,"").trim();const e=u[1].trim();let t;if(e&&(t=n.indexOf(e,a+c.length),l.key=i(e,t,!0)),u[2]){const s=u[2].trim();s&&(l.index=i(s,n.indexOf(s,l.key?t+e.length:a+c.length),!0));}}c&&(l.value=i(c,a,!0));return l}(Hc.exp));}7===Hc.type&&"pre"===Hc.name||jc.props.push(Hc);}qc="",Wc=Kc=-1;},oncomment(e,t){Vc.comments&&da({type:3,content:ea(e,t),loc:pa(e-4,t+3)});},onend(){const e=Uc.length;for(let t=0;t<Xc.length;t++)sa(Xc[t],e-1);},oncdata(e,t){0!==Xc[0].ns&&na(ea(e,t),e,t);},onprocessinginstruction(e){0===(Xc[0]?Xc[0].ns:Vc.ns)&&ga(21,e-1);}}),Zc=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,Yc=/^\(|\)$/g;function ea(e,t){return Uc.slice(e,t)}function ta(e){Qc.inSFCRoot&&(jc.innerLoc=pa(e+1,e+1)),da(jc);const{tag:t,ns:n}=jc;0===n&&Vc.isPreTag(t)&&zc++,Vc.isVoidTag(t)?sa(jc,e):(Xc.unshift(jc),1!==n&&2!==n||(Qc.inXML=!0)),jc=null;}function na(e,t,n){var s;{const t=null==(s=Xc[0])?void 0:s.tag;"script"!==t&&"style"!==t&&e.includes("&")&&(e=Vc.decodeEntities(e,!1));}const o=Xc[0]||Dc,r=o.children[o.children.length-1];2===(null==r?void 0:r.type)?(r.content+=e,ha(r.loc,n)):o.children.push({type:2,content:e,loc:pa(t,n)});}function sa(e,t,n=!1){ha(e.loc,n?oa(t,60):function(e,t){let n=e;for(;Uc.charCodeAt(n)!==t&&n<Uc.length-1;)n++;return n}(t,62)+1),Qc.inSFCRoot&&(e.innerLoc.end=c({},e.children.length?e.children[e.children.length-1].loc.end:e.innerLoc.start),e.innerLoc.source=ea(e.innerLoc.start.offset,e.innerLoc.end.offset));const{tag:s,ns:o}=e;Gc||("slot"===s?e.tagType=2:!function({tag:e,props:t}){if("template"===e)for(let n=0;n<t.length;n++)if(7===t[n].type&&ra.has(t[n].name))return !0;return !1}(e)?function({tag:e,props:t}){var n;if(Vc.isCustomElement(e))return !1;if("component"===e||(s=e.charCodeAt(0),s>64&&s<91)||yc(e)||(null==(n=Vc.isBuiltInComponent)?void 0:n.call(Vc,e))||Vc.isNativeTag&&!Vc.isNativeTag(e))return !0;var s;for(let o=0;o<t.length;o++){const e=t[o];if(6===e.type&&"is"===e.name&&e.value&&e.value.content.startsWith("vue:"))return !0}return !1}(e)&&(e.tagType=1):e.tagType=3),Qc.inRCDATA||(e.children=la(e.children,e.tag)),0===o&&Vc.isPreTag(s)&&zc--,Jc===e&&(Gc=Qc.inVPre=!1,Jc=null),Qc.inXML&&0===(Xc[0]?Xc[0].ns:Vc.ns)&&(Qc.inXML=!1);}function oa(e,t){let n=e;for(;Uc.charCodeAt(n)!==t&&n>=0;)n--;return n}const ra=new Set(["if","else","else-if","for","slot"]);const ia=/\r\n/g;function la(e,t){var n,s;const o="preserve"!==Vc.whitespace;let r=!1;for(let i=0;i<e.length;i++){const t=e[i];if(2===t.type)if(zc)t.content=t.content.replace(ia,"\n");else if(ca(t.content)){const l=null==(n=e[i-1])?void 0:n.type,c=null==(s=e[i+1])?void 0:s.type;!l||!c||o&&(3===l&&(3===c||1===c)||1===l&&(3===c||1===c&&aa(t.content)))?(r=!0,e[i]=null):t.content=" ";}else o&&(t.content=ua(t.content));}if(zc&&t&&Vc.isPreTag(t)){const t=e[0];t&&2===t.type&&(t.content=t.content.replace(/^\r?\n/,""));}return r?e.filter(Boolean):e}function ca(e){for(let t=0;t<e.length;t++)if(!uc(e.charCodeAt(t)))return !1;return !0}function aa(e){for(let t=0;t<e.length;t++){const n=e.charCodeAt(t);if(10===n||13===n)return !0}return !1}function ua(e){let t="",n=!1;for(let s=0;s<e.length;s++)uc(e.charCodeAt(s))?n||(t+=" ",n=!0):(t+=e[s],n=!1);return t}function da(e){(Xc[0]||Dc).children.push(e);}function pa(e,t){return {start:Qc.getPos(e),end:null==t?t:Qc.getPos(t),source:null==t?t:ea(e,t)}}function ha(e,t){e.end=Qc.getPos(t),e.source=ea(e.start.offset,t);}function fa(e){const t={type:6,name:e.rawName,nameLoc:pa(e.loc.start.offset,e.loc.start.offset+e.rawName.length),value:void 0,loc:e.loc};if(e.exp){const n=e.exp.loc;n.end.offset<e.loc.end.offset&&(n.start.offset--,n.start.column--,n.end.offset++,n.end.column++),t.value={type:2,content:e.exp.content,loc:n};}return t}function ma(e,t=!1,n,s=0,o=0){return Yl(e,t,n,s)}function ga(e,t,n){Vc.onError(gc(e,pa(t,t)));}function va(e,t){if(Qc.reset(),jc=null,Hc=null,qc="",Wc=-1,Kc=-1,Xc.length=0,Uc=e,Vc=c({},Bc),t){let e;for(e in t)null!=t[e]&&(Vc[e]=t[e]);}Qc.mode="html"===Vc.parseMode?1:"sfc"===Vc.parseMode?2:0,Qc.inXML=1===Vc.ns||2===Vc.ns;const n=null==t?void 0:t.delimiters;n&&(Qc.delimiterOpen=pc(n[0]),Qc.delimiterClose=pc(n[1]));const s=Dc=function(e,t=""){return {type:0,source:t,children:e,helpers:new Set,components:[],directives:[],hoists:[],imports:[],cached:0,temps:0,codegenNode:void 0,loc:Gl}}([],e);return Qc.parse(Uc),s.loc=pa(0,e.length),s.children=la(s.children),Dc=null,s}function ya(e,t){_a(e,t,ba(e,e.children[0]));}function ba(e,t){const{children:n}=e;return 1===n.length&&1===t.type&&!Rc(t)}function _a(e,t,n=!1){const{children:s}=e,o=s.length;let r=0;for(let i=0;i<s.length;i++){const e=s[i];if(1===e.type&&0===e.tagType){const s=n?0:Sa(e,t);if(s>0){if(s>=2){e.codegenNode.patchFlag="-1",e.codegenNode=t.hoist(e.codegenNode),r++;continue}}else {const n=e.codegenNode;if(13===n.type){const s=wa(n);if((!s||512===s||1===s)&&ka(e,t)>=2){const s=Ta(e);s&&(n.props=t.hoist(s));}n.dynamicProps&&(n.dynamicProps=t.hoist(n.dynamicProps));}}}if(1===e.type){const n=1===e.tagType;n&&t.scopes.vSlot++,_a(e,t),n&&t.scopes.vSlot--;}else if(11===e.type)_a(e,t,1===e.children.length);else if(9===e.type)for(let n=0;n<e.branches.length;n++)_a(e.branches[n],t,1===e.branches[n].children.length);}if(r&&t.transformHoist&&t.transformHoist(s,t,e),r&&r===o&&1===e.type&&0===e.tagType&&e.codegenNode&&13===e.codegenNode.type&&p(e.codegenNode.children)){const n=t.hoist(Xl(e.codegenNode.children));t.hmr&&(n.content=`[...${n.content}]`),e.codegenNode.children=n;}}function Sa(e,t){const{constantCache:n}=t;switch(e.type){case 1:if(0!==e.tagType)return 0;const s=n.get(e);if(void 0!==s)return s;const o=e.codegenNode;if(13!==o.type)return 0;if(o.isBlock&&"svg"!==e.tag&&"foreignObject"!==e.tag)return 0;if(wa(o))return n.set(e,0),0;{let s=3;const r=ka(e,t);if(0===r)return n.set(e,0),0;r<s&&(s=r);for(let o=0;o<e.children.length;o++){const r=Sa(e.children[o],t);if(0===r)return n.set(e,0),0;r<s&&(s=r);}if(s>1)for(let o=0;o<e.props.length;o++){const r=e.props[o];if(7===r.type&&"bind"===r.name&&r.exp){const o=Sa(r.exp,t);if(0===o)return n.set(e,0),0;o<s&&(s=o);}}if(o.isBlock){for(let t=0;t<e.props.length;t++){if(7===e.props[t].type)return n.set(e,0),0}t.removeHelper(hl),t.removeHelper(rc(t.inSSR,o.isComponent)),o.isBlock=!1,t.helper(oc(t.inSSR,o.isComponent));}return n.set(e,s),s}case 2:case 3:return 3;case 9:case 11:case 10:default:return 0;case 5:case 12:return Sa(e.content,t);case 4:return e.constType;case 8:let r=3;for(let n=0;n<e.children.length;n++){const s=e.children[n];if(v(s)||y(s))continue;const o=Sa(s,t);if(0===o)return 0;o<r&&(r=o);}return r}}const xa=new Set([Rl,Ol,Ll,Fl]);function Ca(e,t){if(14===e.type&&!v(e.callee)&&xa.has(e.callee)){const n=e.arguments[0];if(4===n.type)return Sa(n,t);if(14===n.type)return Ca(n,t)}return 0}function ka(e,t){let n=3;const s=Ta(e);if(s&&15===s.type){const{properties:e}=s;for(let s=0;s<e.length;s++){const{key:o,value:r}=e[s],i=Sa(o,t);if(0===i)return i;let l;if(i<n&&(n=i),l=4===r.type?Sa(r,t):14===r.type?Ca(r,t):0,0===l)return l;l<n&&(n=l);}}return n}function Ta(e){const t=e.codegenNode;if(13===t.type)return t.props}function wa(e){const t=e.patchFlag;return t?parseInt(t,10):void 0}function Aa(e,{filename:t="",prefixIdentifiers:s=!1,hoistStatic:r=!1,hmr:i=!1,cacheHandlers:l=!1,nodeTransforms:c=[],directiveTransforms:a={},transformHoist:u=null,isBuiltInComponent:d=o,isCustomElement:p=o,expressionPlugins:h=[],scopeId:f=null,slotted:m=!0,ssr:g=!1,inSSR:y=!1,ssrCssVars:b="",bindingMetadata:_=n,inline:S=!1,isTS:x=!1,onError:C=fc,onWarn:k=mc,compatConfig:T}){const w=t.replace(/\?.*$/,"").match(/([^/\\]+)\.\w+$/),A={filename:t,selfName:w&&L(I(w[1])),prefixIdentifiers:s,hoistStatic:r,hmr:i,cacheHandlers:l,nodeTransforms:c,directiveTransforms:a,transformHoist:u,isBuiltInComponent:d,isCustomElement:p,expressionPlugins:h,scopeId:f,slotted:m,ssr:g,inSSR:y,ssrCssVars:b,bindingMetadata:_,inline:S,isTS:x,onError:C,onWarn:k,compatConfig:T,root:e,helpers:new Map,components:new Set,directives:new Set,hoists:[],imports:[],constantCache:new WeakMap,temps:0,cached:0,identifiers:Object.create(null),scopes:{vFor:0,vSlot:0,vPre:0,vOnce:0},parent:null,currentNode:e,childIndex:0,inVOnce:!1,helper(e){const t=A.helpers.get(e)||0;return A.helpers.set(e,t+1),e},removeHelper(e){const t=A.helpers.get(e);if(t){const n=t-1;n?A.helpers.set(e,n):A.helpers.delete(e);}},helperString:e=>`_${zl[A.helper(e)]}`,replaceNode(e){A.parent.children[A.childIndex]=A.currentNode=e;},removeNode(e){const t=e?A.parent.children.indexOf(e):A.currentNode?A.childIndex:-1;e&&e!==A.currentNode?A.childIndex>t&&(A.childIndex--,A.onNodeRemoved()):(A.currentNode=null,A.onNodeRemoved()),A.parent.children.splice(t,1);},onNodeRemoved:o,addIdentifiers(e){},removeIdentifiers(e){},hoist(e){v(e)&&(e=Yl(e)),A.hoists.push(e);const t=Yl(`_hoisted_${A.hoists.length}`,!1,e.loc,2);return t.hoisted=e,t},cache:(e,t=!1)=>function(e,t,n=!1){return {type:20,index:e,value:t,isVNode:n,loc:Gl}}(A.cached++,e,t)};return A}function Ea(e,t){const n=Aa(e,t);Na(e,n),t.hoistStatic&&ya(e,n),t.ssr||function(e,t){const{helper:n}=t,{children:s}=e;if(1===s.length){const n=s[0];if(ba(e,n)&&n.codegenNode){const s=n.codegenNode;13===s.type&&ic(s,t),e.codegenNode=s;}else e.codegenNode=n;}else if(s.length>1){let s=64;e.codegenNode=Jl(t,n(cl),void 0,e.children,s+"",void 0,void 0,!0,void 0,!1);}}(e,n),e.helpers=new Set([...n.helpers.keys()]),e.components=[...n.components],e.directives=[...n.directives],e.imports=n.imports,e.hoists=n.hoists,e.temps=n.temps,e.cached=n.cached,e.transformed=!0;}function Na(e,t){t.currentNode=e;const{nodeTransforms:n}=t,s=[];for(let r=0;r<n.length;r++){const o=n[r](e,t);if(o&&(p(o)?s.push(...o):s.push(o)),!t.currentNode)return;e=t.currentNode;}switch(e.type){case 3:t.ssr||t.helper(yl);break;case 5:t.ssr||t.helper(Nl);break;case 9:for(let n=0;n<e.branches.length;n++)Na(e.branches[n],t);break;case 10:case 11:case 1:case 0:!function(e,t){let n=0;const s=()=>{n--;};for(;n<e.children.length;n++){const o=e.children[n];v(o)||(t.parent=e,t.childIndex=n,t.onNodeRemoved=s,Na(o,t));}}(e,t);}t.currentNode=e;let o=s.length;for(;o--;)s[o]();}function Ia(e,t){const n=v(e)?t=>t===e:t=>e.test(t);return (e,s)=>{if(1===e.type){const{props:o}=e;if(3===e.tagType&&o.some(Nc))return;const r=[];for(let i=0;i<o.length;i++){const l=o[i];if(7===l.type&&n(l.name)){o.splice(i,1),i--;const n=t(e,l,s);n&&r.push(n);}}return r}}}const Ra="/*#__PURE__*/",Oa=e=>`${zl[e]}: _${zl[e]}`;function La(e,t={}){const n=function(e,{mode:t="function",prefixIdentifiers:n="module"===t,sourceMap:s=!1,filename:o="template.vue.html",scopeId:r=null,optimizeImports:i=!1,runtimeGlobalName:l="Vue",runtimeModuleName:c="vue",ssrRuntimeModuleName:a="vue/server-renderer",ssr:u=!1,isTS:d=!1,inSSR:p=!1}){const h={mode:t,prefixIdentifiers:n,sourceMap:s,filename:o,scopeId:r,optimizeImports:i,runtimeGlobalName:l,runtimeModuleName:c,ssrRuntimeModuleName:a,ssr:u,isTS:d,inSSR:p,source:e.source,code:"",column:1,line:1,offset:0,indentLevel:0,pure:!1,map:void 0,helper:e=>`_${zl[e]}`,push(e,t=-2,n){h.code+=e;},indent(){f(++h.indentLevel);},deindent(e=!1){e?--h.indentLevel:f(--h.indentLevel);},newline(){f(h.indentLevel);}};function f(e){h.push("\n"+"  ".repeat(e),0);}return h}(e,t);t.onContextCreated&&t.onContextCreated(n);const{mode:s,push:o,prefixIdentifiers:r,indent:i,deindent:l,newline:c,ssr:a}=n,u=Array.from(e.helpers),d=u.length>0,p=!r&&"module"!==s;!function(e,t){const{push:n,newline:s,runtimeGlobalName:o}=t,r=o,i=Array.from(e.helpers);if(i.length>0&&(n(`const _Vue = ${r}\n`,-1),e.hoists.length)){n(`const { ${[gl,vl,yl,bl,_l].filter((e=>i.includes(e))).map(Oa).join(", ")} } = _Vue\n`,-1);}(function(e,t){if(!e.length)return;t.pure=!0;const{push:n,newline:s}=t;s();for(let o=0;o<e.length;o++){const r=e[o];r&&(n(`const _hoisted_${o+1} = `),$a(r,t),s());}t.pure=!1;})(e.hoists,t),s(),n("return ");}(e,n);if(o(`function ${a?"ssrRender":"render"}(${(a?["_ctx","_push","_parent","_attrs"]:["_ctx","_cache"]).join(", ")}) {`),i(),p&&(o("with (_ctx) {"),i(),d&&(o(`const { ${u.map(Oa).join(", ")} } = _Vue\n`,-1),c())),e.components.length&&(Fa(e.components,"component",n),(e.directives.length||e.temps>0)&&c()),e.directives.length&&(Fa(e.directives,"directive",n),e.temps>0&&c()),e.temps>0){o("let ");for(let t=0;t<e.temps;t++)o(`${t>0?", ":""}_temp${t}`);}return (e.components.length||e.directives.length||e.temps)&&(o("\n",0),c()),a||o("return "),e.codegenNode?$a(e.codegenNode,n):o("null"),p&&(l(),o("}")),l(),o("}"),{ast:e,code:n.code,preamble:"",map:n.map?n.map.toJSON():void 0}}function Fa(e,t,{helper:n,push:s,newline:o,isTS:r}){const i=n("component"===t?Sl:Cl);for(let l=0;l<e.length;l++){let n=e[l];const c=n.endsWith("__self");c&&(n=n.slice(0,-6)),s(`const ${Pc(n,t)} = ${i}(${JSON.stringify(n)}${c?", true":""})${r?"!":""}`),l<e.length-1&&o();}}function Ma(e,t){const n=e.length>3||!1;t.push("["),n&&t.indent(),Pa(e,t,n),n&&t.deindent(),t.push("]");}function Pa(e,t,n=!1,s=!0){const{push:o,newline:r}=t;for(let i=0;i<e.length;i++){const l=e[i];v(l)?o(l,-3):p(l)?Ma(l,t):$a(l,t),i<e.length-1&&(n?(s&&o(","),r()):s&&o(", "));}}function $a(e,t){if(v(e))t.push(e,-3);else if(y(e))t.push(t.helper(e));else switch(e.type){case 1:case 9:case 11:case 12:$a(e.codegenNode,t);break;case 2:!function(e,t){t.push(JSON.stringify(e.content),-3,e);}(e,t);break;case 4:Ba(e,t);break;case 5:!function(e,t){const{push:n,helper:s,pure:o}=t;o&&n(Ra);n(`${s(Nl)}(`),$a(e.content,t),n(")");}(e,t);break;case 8:Va(e,t);break;case 3:!function(e,t){const{push:n,helper:s,pure:o}=t;o&&n(Ra);n(`${s(yl)}(${JSON.stringify(e.content)})`,-3,e);}(e,t);break;case 13:!function(e,t){const{push:n,helper:s,pure:o}=t,{tag:r,props:i,children:l,patchFlag:c,dynamicProps:a,directives:u,isBlock:d,disableTracking:p,isComponent:h}=e;u&&n(s(Tl)+"(");d&&n(`(${s(hl)}(${p?"true":""}), `);o&&n(Ra);const f=d?rc(t.inSSR,h):oc(t.inSSR,h);n(s(f)+"(",-2,e),Pa(function(e){let t=e.length;for(;t--&&null==e[t];);return e.slice(0,t+1).map((e=>e||"null"))}([r,i,l,c,a]),t),n(")"),d&&n(")");u&&(n(", "),$a(u,t),n(")"));}(e,t);break;case 14:!function(e,t){const{push:n,helper:s,pure:o}=t,r=v(e.callee)?e.callee:s(e.callee);o&&n(Ra);n(r+"(",-2,e),Pa(e.arguments,t),n(")");}(e,t);break;case 15:!function(e,t){const{push:n,indent:s,deindent:o,newline:r}=t,{properties:i}=e;if(!i.length)return void n("{}",-2,e);const l=i.length>1||!1;n(l?"{":"{ "),l&&s();for(let c=0;c<i.length;c++){const{key:e,value:s}=i[c];Da(e,t),n(": "),$a(s,t),c<i.length-1&&(n(","),r());}l&&o(),n(l?"}":" }");}(e,t);break;case 17:!function(e,t){Ma(e.elements,t);}(e,t);break;case 18:!function(e,t){const{push:n,indent:s,deindent:o}=t,{params:r,returns:i,body:l,newline:c,isSlot:a}=e;a&&n(`_${zl[jl]}(`);n("(",-2,e),p(r)?Pa(r,t):r&&$a(r,t);n(") => "),(c||l)&&(n("{"),s());i?(c&&n("return "),p(i)?Ma(i,t):$a(i,t)):l&&$a(l,t);(c||l)&&(o(),n("}"));a&&n(")");}(e,t);break;case 19:!function(e,t){const{test:n,consequent:s,alternate:o,newline:r}=e,{push:i,indent:l,deindent:c,newline:a}=t;if(4===n.type){const e=!_c(n.content);e&&i("("),Ba(n,t),e&&i(")");}else i("("),$a(n,t),i(")");r&&l(),t.indentLevel++,r||i(" "),i("? "),$a(s,t),t.indentLevel--,r&&a(),r||i(" "),i(": ");const u=19===o.type;u||t.indentLevel++;$a(o,t),u||t.indentLevel--;r&&c(!0);}(e,t);break;case 20:!function(e,t){const{push:n,helper:s,indent:o,deindent:r,newline:i}=t;n(`_cache[${e.index}] || (`),e.isVNode&&(o(),n(`${s(Vl)}(-1),`),i());n(`_cache[${e.index}] = `),$a(e.value,t),e.isVNode&&(n(","),i(),n(`${s(Vl)}(1),`),i(),n(`_cache[${e.index}]`),r());n(")");}(e,t);break;case 21:Pa(e.body,t,!0,!1);}}function Ba(e,t){const{content:n,isStatic:s}=e;t.push(s?JSON.stringify(n):n,-3,e);}function Va(e,t){for(let n=0;n<e.children.length;n++){const s=e.children[n];v(s)?t.push(s,-3):$a(s,t);}}function Da(e,t){const{push:n}=t;if(8===e.type)n("["),Va(e,t),n("]");else if(e.isStatic){n(_c(e.content)?e.content:JSON.stringify(e.content),-2,e);}else n(`[${e.content}]`,-3,e);}const Ua=Ia(/^(if|else|else-if)$/,((e,t,n)=>function(e,t,n,s){if(!("else"===t.name||t.exp&&t.exp.content.trim())){const s=t.exp?t.exp.loc:e.loc;n.onError(gc(28,t.loc)),t.exp=Yl("true",!1,s);}if("if"===t.name){const o=ja(e,t),r={type:9,loc:e.loc,branches:[o]};if(n.replaceNode(r),s)return s(r,o,!0)}else {const o=n.parent.children;let r=o.indexOf(e);for(;r-- >=-1;){const i=o[r];if(i&&3===i.type)n.removeNode(i);else {if(!i||2!==i.type||i.content.trim().length){if(i&&9===i.type){"else-if"===t.name&&void 0===i.branches[i.branches.length-1].condition&&n.onError(gc(30,e.loc)),n.removeNode();const o=ja(e,t);i.branches.push(o);const r=s&&s(i,o,!1);Na(o,n),r&&r(),n.currentNode=null;}else n.onError(gc(30,e.loc));break}n.removeNode(i);}}}}(e,t,n,((e,t,s)=>{const o=n.parent.children;let r=o.indexOf(e),i=0;for(;r-- >=0;){const e=o[r];e&&9===e.type&&(i+=e.branches.length);}return ()=>{if(s)e.codegenNode=Ha(t,i,n);else {const s=function(e){for(;;)if(19===e.type){if(19!==e.alternate.type)return e;e=e.alternate;}else 20===e.type&&(e=e.value);}(e.codegenNode);s.alternate=Ha(t,i+e.branches.length-1,n);}}}))));function ja(e,t){const n=3===e.tagType;return {type:10,loc:e.loc,condition:"else"===t.name?void 0:t.exp,children:n&&!Tc(e,"for")?e.children:[e],userKey:wc(e,"key"),isTemplateIf:n}}function Ha(e,t,n){return e.condition?sc(e.condition,qa(e,t,n),tc(n.helper(yl),['""',"true"])):qa(e,t,n)}function qa(e,t,n){const{helper:s}=n,o=Zl("key",Yl(`${t}`,!1,Gl,2)),{children:r}=e,i=r[0];if(1!==r.length||1!==i.type){if(1===r.length&&11===i.type){const e=i.codegenNode;return Fc(e,o,n),e}{let t=64;return Jl(n,s(cl),Ql([o]),r,t+"",void 0,void 0,!0,!1,!1,e.loc)}}{const e=i.codegenNode,t=14===(l=e).type&&l.callee===Wl?l.arguments[1].returns:l;return 13===t.type&&ic(t,n),Fc(t,o,n),e}var l;}const Wa=Ia("for",((e,t,n)=>{const{helper:s,removeHelper:o}=n;return function(e,t,n,s){if(!t.exp)return void n.onError(gc(31,t.loc));const o=t.forParseResult;if(!o)return void n.onError(gc(32,t.loc));Ka(o);const{scopes:r}=n,{source:i,value:l,key:c,index:a}=o,u={type:11,loc:t.loc,source:i,valueAlias:l,keyAlias:c,objectIndexAlias:a,parseResult:o,children:Ic(e)?e.children:[e]};n.replaceNode(u),r.vFor++;const d=s&&s(u);return ()=>{r.vFor--,d&&d();}}(e,t,n,(t=>{const r=tc(s(wl),[t.source]),i=Ic(e),l=Tc(e,"memo"),c=wc(e,"key"),a=c&&(6===c.type?Yl(c.value.content,!0):c.exp),u=c?Zl("key",a):null,d=4===t.source.type&&t.source.constType>0,p=d?64:c?128:256;return t.codegenNode=Jl(n,s(cl),void 0,r,p+"",void 0,void 0,!0,!d,!1,e.loc),()=>{let c;const{children:p}=t,h=1!==p.length||1!==p[0].type,f=Rc(e)?e:i&&1===e.children.length&&Rc(e.children[0])?e.children[0]:null;if(f?(c=f.codegenNode,i&&u&&Fc(c,u,n)):h?c=Jl(n,s(cl),u?Ql([u]):void 0,e.children,"64",void 0,void 0,!0,void 0,!1):(c=p[0].codegenNode,i&&u&&Fc(c,u,n),c.isBlock!==!d&&(c.isBlock?(o(hl),o(rc(n.inSSR,c.isComponent))):o(oc(n.inSSR,c.isComponent))),c.isBlock=!d,c.isBlock?(s(hl),s(rc(n.inSSR,c.isComponent))):s(oc(n.inSSR,c.isComponent))),l){const e=nc(za(t.parseResult,[Yl("_cached")]));e.body={type:21,body:[ec(["const _memo = (",l.exp,")"]),ec(["if (_cached",...a?[" && _cached.key === ",a]:[],` && ${n.helperString(Kl)}(_cached, _memo)) return _cached`]),ec(["const _item = ",c]),Yl("_item.memo = _memo"),Yl("return _item")],loc:Gl},r.arguments.push(e,Yl("_cache"),Yl(String(n.cached++)));}else r.arguments.push(nc(za(t.parseResult),c,!0));}}))}));function Ka(e,t){e.finalized||(e.finalized=!0);}function za({value:e,key:t,index:n},s=[]){return function(e){let t=e.length;for(;t--&&!e[t];);return e.slice(0,t+1).map(((e,t)=>e||Yl("_".repeat(t+1),!1)))}([e,t,n,...s])}const Ga=Yl("undefined",!1),Ja=(e,t)=>{if(1===e.type&&(1===e.tagType||3===e.tagType)){const n=Tc(e,"slot");if(n)return t.scopes.vSlot++,()=>{t.scopes.vSlot--;}}},Xa=(e,t,n,s)=>nc(e,n,!1,!0,n.length?n[0].loc:s);function Qa(e,t,n=Xa){t.helper(jl);const{children:s,loc:o}=e,r=[],i=[];let l=t.scopes.vSlot>0||t.scopes.vFor>0;const c=Tc(e,"slot",!0);if(c){const{arg:e,exp:t}=c;e&&!vc(e)&&(l=!0),r.push(Zl(e||Yl("default",!0),n(t,void 0,s,o)));}let a=!1,u=!1;const d=[],p=new Set;let h=0;for(let g=0;g<s.length;g++){const e=s[g];let o;if(!Ic(e)||!(o=Tc(e,"slot",!0))){3!==e.type&&d.push(e);continue}if(c){t.onError(gc(37,o.loc));break}a=!0;const{children:f,loc:m}=e,{arg:v=Yl("default",!0),exp:y,loc:b}=o;let _;vc(v)?_=v?v.content:"default":l=!0;const S=Tc(e,"for"),x=n(y,S,f,m);let C,k;if(C=Tc(e,"if"))l=!0,i.push(sc(C.exp,Za(v,x,h++),Ga));else if(k=Tc(e,/^else(-if)?$/,!0)){let e,n=g;for(;n--&&(e=s[n],3===e.type););if(e&&Ic(e)&&Tc(e,"if")){s.splice(g,1),g--;let e=i[i.length-1];for(;19===e.alternate.type;)e=e.alternate;e.alternate=k.exp?sc(k.exp,Za(v,x,h++),Ga):Za(v,x,h++);}else t.onError(gc(30,k.loc));}else if(S){l=!0;const e=S.forParseResult;e?(Ka(e),i.push(tc(t.helper(wl),[e.source,nc(za(e),Za(v,x),!0)]))):t.onError(gc(32,S.loc));}else {if(_){if(p.has(_)){t.onError(gc(38,b));continue}p.add(_),"default"===_&&(u=!0);}r.push(Zl(v,x));}}if(!c){const e=(e,t)=>Zl("default",n(e,void 0,t,o));a?d.length&&d.some((e=>eu(e)))&&(u?t.onError(gc(39,d[0].loc)):r.push(e(void 0,d))):r.push(e(void 0,s));}const f=l?2:Ya(e.children)?3:1;let m=Ql(r.concat(Zl("_",Yl(f+"",!1))),o);return i.length&&(m=tc(t.helper(El),[m,Xl(i)])),{slots:m,hasDynamicSlots:l}}function Za(e,t,n){const s=[Zl("name",e),Zl("fn",t)];return null!=n&&s.push(Zl("key",Yl(String(n),!0))),Ql(s)}function Ya(e){for(let t=0;t<e.length;t++){const n=e[t];switch(n.type){case 1:if(2===n.tagType||Ya(n.children))return !0;break;case 9:if(Ya(n.branches))return !0;break;case 10:case 11:if(Ya(n.children))return !0}}return !1}function eu(e){return 2!==e.type&&12!==e.type||(2===e.type?!!e.content.trim():eu(e.content))}const tu=new WeakMap,nu=(e,t)=>function(){if(1!==(e=t.currentNode).type||0!==e.tagType&&1!==e.tagType)return;const{tag:n,props:s}=e,o=1===e.tagType;let r=o?function(e,t,n=!1){let{tag:s}=e;const o=iu(s),r=wc(e,"is",!1,!0);if(r)if(o){let e;if(6===r.type?e=r.value&&Yl(r.value.content,!0):(e=r.exp,e||(e=Yl("is",!1,r.loc))),e)return tc(t.helper(xl),[e])}else 6===r.type&&r.value.content.startsWith("vue:")&&(s=r.value.content.slice(4));const i=yc(s)||t.isBuiltInComponent(s);if(i)return n||t.helper(i),i;return t.helper(Sl),t.components.add(s),Pc(s,"component")}(e,t):`"${n}"`;const i=b(r)&&r.callee===xl;let l,c,a,u,d,p,h=0,f=i||r===al||r===ul||!o&&("svg"===n||"foreignObject"===n);if(s.length>0){const n=su(e,t,void 0,o,i);l=n.props,h=n.patchFlag,d=n.dynamicPropNames;const s=n.directives;p=s&&s.length?Xl(s.map((e=>function(e,t){const n=[],s=tu.get(e);s?n.push(t.helperString(s)):(t.helper(Cl),t.directives.add(e.name),n.push(Pc(e.name,"directive")));const{loc:o}=e;e.exp&&n.push(e.exp);e.arg&&(e.exp||n.push("void 0"),n.push(e.arg));if(Object.keys(e.modifiers).length){e.arg||(e.exp||n.push("void 0"),n.push("void 0"));const t=Yl("true",!1,o);n.push(Ql(e.modifiers.map((e=>Zl(e,t))),o));}return Xl(n,e.loc)}(e,t)))):void 0,n.shouldUseBlock&&(f=!0);}if(e.children.length>0){r===dl&&(f=!0,h|=1024);if(o&&r!==al&&r!==dl){const{slots:n,hasDynamicSlots:s}=Qa(e,t);c=n,s&&(h|=1024);}else if(1===e.children.length&&r!==al){const n=e.children[0],s=n.type,o=5===s||8===s;o&&0===Sa(n,t)&&(h|=1),c=o||2===s?n:e.children;}else c=e.children;}0!==h&&(a=String(h),d&&d.length&&(u=function(e){let t="[";for(let n=0,s=e.length;n<s;n++)t+=JSON.stringify(e[n]),n<s-1&&(t+=", ");return t+"]"}(d))),e.codegenNode=Jl(t,r,l,c,a,u,p,!!f,!1,o,e.loc);};function su(e,t,n=e.props,s,o,r=!1){const{tag:l,loc:c,children:a}=e;let u=[];const d=[],p=[],h=a.length>0;let f=!1,m=0,g=!1,v=!1,b=!1,_=!1,S=!1,x=!1;const C=[],k=e=>{u.length&&(d.push(Ql(ou(u),c)),u=[]),e&&d.push(e);},T=({key:e,value:n})=>{if(vc(e)){const r=e.content,l=i(r);if(!l||s&&!o||"onclick"===r.toLowerCase()||"onUpdate:modelValue"===r||w(r)||(_=!0),l&&w(r)&&(x=!0),l&&14===n.type&&(n=n.arguments[0]),20===n.type||(4===n.type||8===n.type)&&Sa(n,t)>0)return;"ref"===r?g=!0:"class"===r?v=!0:"style"===r?b=!0:"key"===r||C.includes(r)||C.push(r),!s||"class"!==r&&"style"!==r||C.includes(r)||C.push(r);}else S=!0;};for(let i=0;i<n.length;i++){const o=n[i];if(6===o.type){const{loc:e,name:n,nameLoc:s,value:r}=o;let i=!0;if("ref"===n&&(g=!0,t.scopes.vFor>0&&u.push(Zl(Yl("ref_for",!0),Yl("true")))),"is"===n&&(iu(l)||r&&r.content.startsWith("vue:")))continue;u.push(Zl(Yl(n,!0,s),Yl(r?r.content:"",i,r?r.loc:e)));}else {const{name:n,arg:i,exp:a,loc:g,modifiers:v}=o,b="bind"===n,_="on"===n;if("slot"===n){s||t.onError(gc(40,g));continue}if("once"===n||"memo"===n)continue;if("is"===n||b&&Ac(i,"is")&&iu(l))continue;if(_&&r)continue;if((b&&Ac(i,"key")||_&&h&&Ac(i,"vue:before-update"))&&(f=!0),b&&Ac(i,"ref")&&t.scopes.vFor>0&&u.push(Zl(Yl("ref_for",!0),Yl("true"))),!i&&(b||_)){S=!0,a?b?(k(),d.push(a)):k({type:14,loc:g,callee:t.helper(Ml),arguments:s?[a]:[a,"true"]}):t.onError(gc(b?34:35,g));continue}b&&v.includes("prop")&&(m|=32);const x=t.directiveTransforms[n];if(x){const{props:n,needRuntime:s}=x(o,e,t);!r&&n.forEach(T),_&&i&&!vc(i)?k(Ql(n,c)):u.push(...n),s&&(p.push(o),y(s)&&tu.set(o,s));}else A(n)||(p.push(o),h&&(f=!0));}}let E;if(d.length?(k(),E=d.length>1?tc(t.helper(Il),d,c):d[0]):u.length&&(E=Ql(ou(u),c)),S?m|=16:(v&&!s&&(m|=2),b&&!s&&(m|=4),C.length&&(m|=8),_&&(m|=32)),f||0!==m&&32!==m||!(g||x||p.length>0)||(m|=512),!t.inSSR&&E)switch(E.type){case 15:let e=-1,n=-1,s=!1;for(let t=0;t<E.properties.length;t++){const o=E.properties[t].key;vc(o)?"class"===o.content?e=t:"style"===o.content&&(n=t):o.isHandlerKey||(s=!0);}const o=E.properties[e],r=E.properties[n];s?E=tc(t.helper(Ll),[E]):(o&&!vc(o.value)&&(o.value=tc(t.helper(Rl),[o.value])),r&&(b||4===r.value.type&&"["===r.value.content.trim()[0]||17===r.value.type)&&(r.value=tc(t.helper(Ol),[r.value])));break;case 14:break;default:E=tc(t.helper(Ll),[tc(t.helper(Fl),[E])]);}return {props:E,directives:p,patchFlag:m,dynamicPropNames:C,shouldUseBlock:f}}function ou(e){const t=new Map,n=[];for(let s=0;s<e.length;s++){const o=e[s];if(8===o.key.type||!o.key.isStatic){n.push(o);continue}const r=o.key.content,l=t.get(r);l?("style"===r||"class"===r||i(r))&&ru(l,o):(t.set(r,o),n.push(o));}return n}function ru(e,t){17===e.value.type?e.value.elements.push(t.value):e.value=Xl([e.value,t.value],e.loc);}function iu(e){return "component"===e||"Component"===e}const lu=(e,t)=>{if(Rc(e)){const{children:n,loc:s}=e,{slotName:o,slotProps:r}=function(e,t){let n,s='"default"';const o=[];for(let r=0;r<e.props.length;r++){const t=e.props[r];if(6===t.type)t.value&&("name"===t.name?s=JSON.stringify(t.value.content):(t.name=I(t.name),o.push(t)));else if("bind"===t.name&&Ac(t.arg,"name")){if(t.exp)s=t.exp;else if(t.arg&&4===t.arg.type){const e=I(t.arg.content);s=t.exp=Yl(e,!1,t.arg.loc);}}else "bind"===t.name&&t.arg&&vc(t.arg)&&(t.arg.content=I(t.arg.content)),o.push(t);}if(o.length>0){const{props:s,directives:r}=su(e,t,o,!1,!1);n=s,r.length&&t.onError(gc(36,r[0].loc));}return {slotName:s,slotProps:n}}(e,t),i=[t.prefixIdentifiers?"_ctx.$slots":"$slots",o,"{}","undefined","true"];let l=2;r&&(i[2]=r,l=3),n.length&&(i[3]=nc([],n,!1,!1,s),l=4),t.scopeId&&!t.slotted&&(l=5),i.splice(l),e.codegenNode=tc(t.helper(Al),i,s);}};const cu=/^\s*([\w$_]+|(async\s*)?\([^)]*?\))\s*(:[^=]+)?=>|^\s*(async\s+)?function(?:\s+[\w$]+)?\s*\(/,au=(e,t,n,s)=>{const{loc:o,modifiers:r,arg:i}=e;let l;if(4===i.type)if(i.isStatic){let e=i.content;e.startsWith("vue:")&&(e=`vnode-${e.slice(4)}`);l=Yl(0!==t.tagType||e.startsWith("vnode")||!/[A-Z]/.test(e)?F(I(e)):`on:${e}`,!0,i.loc);}else l=ec([`${n.helperString(Bl)}(`,i,")"]);else l=i,l.children.unshift(`${n.helperString(Bl)}(`),l.children.push(")");let c=e.exp;c&&!c.content.trim()&&(c=void 0);let a=n.cacheHandlers&&!c&&!n.inVOnce;if(c){const e=kc(c.content),t=!(e||cu.test(c.content)),n=c.content.includes(";");(t||a&&e)&&(c=ec([`${t?"$event":"(...args)"} => ${n?"{":"("}`,c,n?"}":")"]));}let u={props:[Zl(l,c||Yl("() => {}",!1,o))]};return s&&(u=s(u)),a&&(u.props[0].value=n.cache(u.props[0].value)),u.props.forEach((e=>e.key.isHandlerKey=!0)),u},uu=(e,t,n)=>{const{modifiers:s,loc:o}=e,r=e.arg;let{exp:i}=e;if(i&&4===i.type&&!i.content.trim()&&(i=void 0),!i){if(4!==r.type||!r.isStatic)return n.onError(gc(52,r.loc)),{props:[Zl(r,Yl("",!0,o))]};const t=I(r.content);i=e.exp=Yl(t,!1,r.loc);}return 4!==r.type?(r.children.unshift("("),r.children.push(') || ""')):r.isStatic||(r.content=`${r.content} || ""`),s.includes("camel")&&(4===r.type?r.content=r.isStatic?I(r.content):`${n.helperString(Pl)}(${r.content})`:(r.children.unshift(`${n.helperString(Pl)}(`),r.children.push(")"))),n.inSSR||(s.includes("prop")&&du(r,"."),s.includes("attr")&&du(r,"^")),{props:[Zl(r,i)]}},du=(e,t)=>{4===e.type?e.content=e.isStatic?t+e.content:`\`${t}\${${e.content}}\``:(e.children.unshift(`'${t}' + (`),e.children.push(")"));},pu=(e,t)=>{if(0===e.type||1===e.type||11===e.type||10===e.type)return ()=>{const n=e.children;let s,o=!1;for(let e=0;e<n.length;e++){const t=n[e];if(Ec(t)){o=!0;for(let o=e+1;o<n.length;o++){const r=n[o];if(!Ec(r)){s=void 0;break}s||(s=n[e]=ec([t],t.loc)),s.children.push(" + ",r),n.splice(o,1),o--;}}}if(o&&(1!==n.length||0!==e.type&&(1!==e.type||0!==e.tagType||e.props.find((e=>7===e.type&&!t.directiveTransforms[e.name])))))for(let e=0;e<n.length;e++){const s=n[e];if(Ec(s)||8===s.type){const o=[];2===s.type&&" "===s.content||o.push(s),t.ssr||0!==Sa(s,t)||o.push("1"),n[e]={type:12,content:s,loc:s.loc,codegenNode:tc(t.helper(bl),o)};}}}},hu=new WeakSet,fu=(e,t)=>{if(1===e.type&&Tc(e,"once",!0)){if(hu.has(e)||t.inVOnce||t.inSSR)return;return hu.add(e),t.inVOnce=!0,t.helper(Vl),()=>{t.inVOnce=!1;const e=t.currentNode;e.codegenNode&&(e.codegenNode=t.cache(e.codegenNode,!0));}}},mu=(e,t,n)=>{const{exp:s,arg:o}=e;if(!s)return n.onError(gc(41,e.loc)),gu();const r=s.loc.source,i=4===s.type?s.content:r,l=n.bindingMetadata[r];if("props"===l||"props-aliased"===l)return gu();if(!i.trim()||!kc(i))return n.onError(gc(42,s.loc)),gu();const c=o||Yl("modelValue",!0),a=o?vc(o)?`onUpdate:${I(o.content)}`:ec(['"onUpdate:" + ',o]):"onUpdate:modelValue";let u;u=ec([`${n.isTS?"($event: any)":"$event"} => ((`,s,") = $event)"]);const d=[Zl(c,e.exp),Zl(a,u)];if(e.modifiers.length&&1===t.tagType){const t=e.modifiers.map((e=>(_c(e)?e:JSON.stringify(e))+": true")).join(", "),n=o?vc(o)?`${o.content}Modifiers`:ec([o,' + "Modifiers"']):"modelModifiers";d.push(Zl(n,Yl(`{ ${t} }`,!1,e.loc,2)));}return gu(d)};function gu(e=[]){return {props:e}}const vu=new WeakSet,yu=(e,t)=>{if(1===e.type){const n=Tc(e,"memo");if(!n||vu.has(e))return;return vu.add(e),()=>{const s=e.codegenNode||t.currentNode.codegenNode;s&&13===s.type&&(1!==e.tagType&&ic(s,t),e.codegenNode=tc(t.helper(Wl),[n.exp,nc(void 0,s),"_cache",String(t.cached++)]));}}};function bu(e,t={}){const n=t.onError||fc,s="module"===t.mode;!0===t.prefixIdentifiers?n(gc(47)):s&&n(gc(48));t.cacheHandlers&&n(gc(49)),t.scopeId&&!s&&n(gc(50));const o=c({},t,{prefixIdentifiers:!1}),r=v(e)?va(e,o):e,[i,l]=[[fu,Ua,yu,Wa,lu,nu,Ja,pu],{on:au,bind:uu,model:mu}];return Ea(r,c({},o,{nodeTransforms:[...i,...t.nodeTransforms||[]],directiveTransforms:c({},l,t.directiveTransforms||{})})),La(r,o)}const _u=Symbol(""),Su=Symbol(""),xu=Symbol(""),Cu=Symbol(""),ku=Symbol(""),Tu=Symbol(""),wu=Symbol(""),Au=Symbol(""),Eu=Symbol(""),Nu=Symbol("");var Iu;let Ru;Iu={[_u]:"vModelRadio",[Su]:"vModelCheckbox",[xu]:"vModelText",[Cu]:"vModelSelect",[ku]:"vModelDynamic",[Tu]:"withModifiers",[wu]:"withKeys",[Au]:"vShow",[Eu]:"Transition",[Nu]:"TransitionGroup"},Object.getOwnPropertySymbols(Iu).forEach((e=>{zl[e]=Iu[e];}));const Ou={parseMode:"html",isVoidTag:Z,isNativeTag:e=>J(e)||X(e)||Q(e),isPreTag:e=>"pre"===e,decodeEntities:function(e,t=!1){return Ru||(Ru=document.createElement("div")),t?(Ru.innerHTML=`<div foo="${e.replace(/"/g,"&quot;")}">`,Ru.children[0].getAttribute("foo")):(Ru.innerHTML=e,Ru.textContent)},isBuiltInComponent:e=>"Transition"===e||"transition"===e?Eu:"TransitionGroup"===e||"transition-group"===e?Nu:void 0,getNamespace(e,t,n){let s=t?t.ns:n;if(t&&2===s)if("annotation-xml"===t.tag){if("svg"===e)return 1;t.props.some((e=>6===e.type&&"encoding"===e.name&&null!=e.value&&("text/html"===e.value.content||"application/xhtml+xml"===e.value.content)))&&(s=0);}else /^m(?:[ions]|text)$/.test(t.tag)&&"mglyph"!==e&&"malignmark"!==e&&(s=0);else t&&1===s&&("foreignObject"!==t.tag&&"desc"!==t.tag&&"title"!==t.tag||(s=0));if(0===s){if("svg"===e)return 1;if("math"===e)return 2}return s}},Lu=(e,t)=>{const n=z(e);return Yl(JSON.stringify(n),!1,t,3)};function Fu(e,t){return gc(e,t)}const Mu=t("passive,once,capture"),Pu=t("stop,prevent,self,ctrl,shift,alt,meta,exact,middle"),$u=t("left,right"),Bu=t("onkeyup,onkeydown,onkeypress",!0),Vu=(e,t)=>vc(e)&&"onclick"===e.content.toLowerCase()?Yl(t,!0):4!==e.type?ec(["(",e,`) === "onClick" ? "${t}" : (`,e,")"]):e,Du=(e,t)=>{1!==e.type||0!==e.tagType||"script"!==e.tag&&"style"!==e.tag||t.removeNode();},Uu=[e=>{1===e.type&&e.props.forEach(((t,n)=>{6===t.type&&"style"===t.name&&t.value&&(e.props[n]={type:7,name:"bind",arg:Yl("style",!0,t.loc),exp:Lu(t.value.content,t.loc),modifiers:[],loc:t.loc});}));}],ju={cloak:()=>({props:[]}),html:(e,t,n)=>{const{exp:s,loc:o}=e;return s||n.onError(Fu(53,o)),t.children.length&&(n.onError(Fu(54,o)),t.children.length=0),{props:[Zl(Yl("innerHTML",!0,o),s||Yl("",!0))]}},text:(e,t,n)=>{const{exp:s,loc:o}=e;return s||n.onError(Fu(55,o)),t.children.length&&(n.onError(Fu(56,o)),t.children.length=0),{props:[Zl(Yl("textContent",!0),s?Sa(s,n)>0?s:tc(n.helperString(Nl),[s],o):Yl("",!0))]}},model:(e,t,n)=>{const s=mu(e,t,n);if(!s.props.length||1===t.tagType)return s;e.arg&&n.onError(Fu(58,e.arg.loc));const{tag:o}=t,r=n.isCustomElement(o);if("input"===o||"textarea"===o||"select"===o||r){let i=xu,l=!1;if("input"===o||r){const s=wc(t,"type");if(s){if(7===s.type)i=ku;else if(s.value)switch(s.value.content){case"radio":i=_u;break;case"checkbox":i=Su;break;case"file":l=!0,n.onError(Fu(59,e.loc));}}else (function(e){return e.props.some((e=>!(7!==e.type||"bind"!==e.name||e.arg&&4===e.arg.type&&e.arg.isStatic)))})(t)&&(i=ku);}else "select"===o&&(i=Cu);l||(s.needRuntime=n.helper(i));}else n.onError(Fu(57,e.loc));return s.props=s.props.filter((e=>!(4===e.key.type&&"modelValue"===e.key.content))),s},on:(e,t,n)=>au(e,t,n,(t=>{const{modifiers:s}=e;if(!s.length)return t;let{key:o,value:r}=t.props[0];const{keyModifiers:i,nonKeyModifiers:l,eventOptionModifiers:c}=((e,t,n,s)=>{const o=[],r=[],i=[];for(let l=0;l<t.length;l++){const n=t[l];Mu(n)?i.push(n):$u(n)?vc(e)?Bu(e.content)?o.push(n):r.push(n):(o.push(n),r.push(n)):Pu(n)?r.push(n):o.push(n);}return {keyModifiers:o,nonKeyModifiers:r,eventOptionModifiers:i}})(o,s);if(l.includes("right")&&(o=Vu(o,"onContextmenu")),l.includes("middle")&&(o=Vu(o,"onMouseup")),l.length&&(r=tc(n.helper(Tu),[r,JSON.stringify(l)])),!i.length||vc(o)&&!Bu(o.content)||(r=tc(n.helper(wu),[r,JSON.stringify(i)])),c.length){const e=c.map(L).join("");o=vc(o)?Yl(`${o.content}${e}`,!0):ec(["(",o,`) + "${e}"`]);}return {props:[Zl(o,r)]}})),show:(e,t,n)=>{const{exp:s,loc:o}=e;return s||n.onError(Fu(61,o)),{props:[],needRuntime:n.helper(Au)}}};const Hu=new WeakMap;function qu(e,t){if(!v(e)){if(!e.nodeType)return o;e=e.innerHTML;}const s=e,r=function(e){let t=Hu.get(null!=e?e:n);return t||(t=Object.create(null),Hu.set(null!=e?e:n,t)),t}(t),i=r[s];if(i)return i;if("#"===e[0]){const t=document.querySelector(e);e=t?t.innerHTML:"";}const l=c({hoistStatic:!0,onError:void 0,onWarn:o},t);l.isCustomElement||"undefined"==typeof customElements||(l.isCustomElement=e=>!!customElements.get(e));const{code:a}=function(e,t={}){return bu(e,c({},Ou,t,{nodeTransforms:[Du,...Uu,...t.nodeTransforms||[]],directiveTransforms:c({},ju,t.directiveTransforms||{}),transformHoist:null}))}(e,l),u=new Function(a)();return u._rc=!0,r[s]=u}return xr(qu),e.BaseTransition=Jn,e.BaseTransitionPropsValidators=Gn,e.Comment=Vo,e.DeprecationTypes=null,e.EffectScope=le,e.ErrorCodes={SETUP_FUNCTION:0,0:"SETUP_FUNCTION",RENDER_FUNCTION:1,1:"RENDER_FUNCTION",WATCH_GETTER:2,2:"WATCH_GETTER",WATCH_CALLBACK:3,3:"WATCH_CALLBACK",WATCH_CLEANUP:4,4:"WATCH_CLEANUP",NATIVE_EVENT_HANDLER:5,5:"NATIVE_EVENT_HANDLER",COMPONENT_EVENT_HANDLER:6,6:"COMPONENT_EVENT_HANDLER",VNODE_HOOK:7,7:"VNODE_HOOK",DIRECTIVE_HOOK:8,8:"DIRECTIVE_HOOK",TRANSITION_HOOK:9,9:"TRANSITION_HOOK",APP_ERROR_HANDLER:10,10:"APP_ERROR_HANDLER",APP_WARN_HANDLER:11,11:"APP_WARN_HANDLER",FUNCTION_REF:12,12:"FUNCTION_REF",ASYNC_COMPONENT_LOADER:13,13:"ASYNC_COMPONENT_LOADER",SCHEDULER:14,14:"SCHEDULER"},e.ErrorTypeStrings=null,e.Fragment=$o,e.KeepAlive=is,e.ReactiveEffect=ue,e.Static=Do,e.Suspense=En,e.Teleport=Mo,e.Text=Bo,e.TrackOpTypes={GET:"get",HAS:"has",ITERATE:"iterate"},e.Transition=Dr,e.TransitionGroup=Ri,e.TriggerOpTypes={SET:"set",ADD:"add",DELETE:"delete",CLEAR:"clear"},e.VueElement=Ti,e.assertNumber=function(e,t){},e.callWithAsyncErrorHandling=Ht,e.callWithErrorHandling=jt,e.camelize=I,e.capitalize=L,e.cloneVNode=nr,e.compatUtils=null,e.compile=qu,e.computed=Er,e.createApp=(...e)=>{const t=tl().createApp(...e),{mount:n}=t;return t.mount=e=>{const s=il(e);if(!s)return;const o=t._component;g(o)||o.render||o.template||(o.template=s.innerHTML),s.innerHTML="";const r=n(s,!1,rl(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),r},t},e.createBlock=Go,e.createCommentVNode=function(e="",t=!1){return t?(Ho(),Go(Vo,null,e)):er(Vo,null,e)},e.createElementBlock=function(e,t,n,s,o,r){return zo(Yo(e,t,n,s,o,r,!0))},e.createElementVNode=Yo,e.createHydrationRenderer=Co,e.createPropsRestProxy=function(e,t){const n={};for(const s in e)t.includes(s)||Object.defineProperty(n,s,{enumerable:!0,get:()=>e[s]});return n},e.createRenderer=xo,e.createSSRApp=(...e)=>{const t=nl().createApp(...e),{mount:n}=t;return t.mount=e=>{const t=il(e);if(t)return n(t,!0,rl(t))},t},e.createSlots=function(e,t){for(let n=0;n<t.length;n++){const s=t[n];if(p(s))for(let t=0;t<s.length;t++)e[s[t].name]=s[t].fn;else s&&(e[s.name]=s.key?(...e)=>{const t=s.fn(...e);return t&&(t.key=s.key),t}:s.fn);}return e},e.createStaticVNode=function(e,t){const n=er(Do,null,e);return n.staticCount=t,n},e.createTextVNode=sr,e.createVNode=er,e.customRef=Bt,e.defineAsyncComponent=function(e){g(e)&&(e={loader:e});const{loader:t,loadingComponent:n,errorComponent:s,delay:o=200,timeout:r,suspensible:i=!0,onError:l}=e;let c,a=null,u=0;const d=()=>{let e;return a||(e=a=t().catch((e=>{if(e=e instanceof Error?e:new Error(String(e)),l)return new Promise(((t,n)=>{l(e,(()=>t((u++,a=null,d()))),(()=>n(e)),u+1);}));throw e})).then((t=>e!==a&&a?a:(t&&(t.__esModule||"Module"===t[Symbol.toStringTag])&&(t=t.default),c=t,t))))};return ns({name:"AsyncComponentWrapper",__asyncLoader:d,get __asyncResolved(){return c},setup(){const e=dr;if(c)return ()=>os(c,e);const t=t=>{a=null,qt(t,e,13,!s);};if(i&&e.suspense)return d().then((t=>()=>os(t,e))).catch((e=>(t(e),()=>s?er(s,{error:e}):null)));const l=Rt(!1),u=Rt(),p=Rt(!!o);return o&&setTimeout((()=>{p.value=!1;}),o),null!=r&&setTimeout((()=>{if(!l.value&&!u.value){const e=new Error(`Async component timed out after ${r}ms.`);t(e),u.value=e;}}),r),d().then((()=>{l.value=!0,e.parent&&rs(e.parent.vnode)&&(e.parent.effect.dirty=!0,tn(e.parent.update));})).catch((e=>{t(e),u.value=e;})),()=>l.value&&c?os(c,e):u.value&&s?er(s,{error:u.value}):n&&!p.value?er(n):void 0}})},e.defineComponent=ns,e.defineCustomElement=Ci,e.defineEmits=function(){return null},e.defineExpose=function(e){},e.defineModel=function(){},e.defineOptions=function(e){},e.defineProps=function(){return null},e.defineSSRCustomElement=e=>Ci(e,ol),e.defineSlots=function(){return null},e.devtools=void 0,e.effect=function(e,t){e.effect instanceof ue&&(e=e.effect.fn);const n=new ue(e,o,(()=>{n.dirty&&n.run();}));t&&(c(n,t),t.scope&&ce(n,t.scope)),t&&t.lazy||n.run();const s=n.run.bind(n);return s.effect=n,s},e.effectScope=function(e){return new le(e)},e.getCurrentInstance=pr,e.getCurrentScope=ae,e.getTransitionRawChildren=ts,e.guardReactiveProps=tr,e.h=Nr,e.handleError=qt,e.hasInjectionContext=function(){return !!(dr||hn||Js)},e.hydrate=ol,e.initCustomFormatter=function(){},e.initDirectivesForSSR=ll,e.inject=Qs,e.isMemoSame=Ir,e.isProxy=xt,e.isReactive=bt,e.isReadonly=_t,e.isRef=It,e.isRuntimeOnly=()=>!yr,e.isShallow=St,e.isVNode=Jo,e.markRaw=kt,e.mergeDefaults=function(e,t){const n=Ls(e);for(const s in t){if(s.startsWith("__skip"))continue;let e=n[s];e?p(e)||g(e)?e=n[s]={type:e,default:t[s]}:e.default=t[s]:null===e&&(e=n[s]={default:t[s]}),e&&t[`__skip_${s}`]&&(e.skipFactory=!0);}return n},e.mergeModels=function(e,t){return e&&t?p(e)&&p(t)?e.concat(t):c({},Ls(e),Ls(t)):e||t},e.mergeProps=lr,e.nextTick=en,e.normalizeClass=G,e.normalizeProps=function(e){if(!e)return null;let{class:t,style:n}=e;return t&&!v(t)&&(e.class=G(t)),n&&(e.style=H(n)),e},e.normalizeStyle=H,e.onActivated=cs,e.onBeforeMount=gs,e.onBeforeUnmount=_s,e.onBeforeUpdate=ys,e.onDeactivated=as,e.onErrorCaptured=Ts,e.onMounted=vs,e.onRenderTracked=ks,e.onRenderTriggered=Cs,e.onScopeDispose=function(e){re&&re.cleanups.push(e);},e.onServerPrefetch=xs,e.onUnmounted=Ss,e.onUpdated=bs,e.openBlock=Ho,e.popScopeId=function(){fn=null;},e.provide=Xs,e.proxyRefs=Pt,e.pushScopeId=function(e){fn=e;},e.queuePostFlushCb=sn,e.reactive=mt,e.readonly=vt,e.ref=Rt,e.registerRuntimeCompiler=xr,e.render=sl,e.renderList=function(e,t,n,s){let o;const r=n&&n[s];if(p(e)||v(e)){o=new Array(e.length);for(let n=0,s=e.length;n<s;n++)o[n]=t(e[n],n,void 0,r&&r[n]);}else if("number"==typeof e){o=new Array(e);for(let n=0;n<e;n++)o[n]=t(n+1,n,void 0,r&&r[n]);}else if(b(e))if(e[Symbol.iterator])o=Array.from(e,((e,n)=>t(e,n,void 0,r&&r[n])));else {const n=Object.keys(e);o=new Array(n.length);for(let s=0,i=n.length;s<i;s++){const i=n[s];o[s]=t(e[i],i,s,r&&r[s]);}}else o=[];return n&&(n[s]=o),o},e.renderSlot=function(e,t,n={},s,o){if(hn.isCE||hn.parent&&ss(hn.parent)&&hn.parent.isCE)return "default"!==t&&(n.name=t),er("slot",n,s&&s());let r=e[t];r&&r._c&&(r._d=!1),Ho();const i=r&&ws(r(n)),l=Go($o,{key:n.key||i&&i.key||`_${t}`},i||(s?s():[]),i&&1===e._?64:-2);return !o&&l.scopeId&&(l.slotScopeIds=[l.scopeId+"-s"]),r&&r._c&&(r._d=!0),l},e.resolveComponent=function(e,t){return kn(xn,e,!0,t)||e},e.resolveDirective=function(e){return kn("directives",e)},e.resolveDynamicComponent=function(e){return v(e)?kn(xn,e,!1)||e:e||Cn},e.resolveFilter=null,e.resolveTransitionHooks=Qn,e.setBlockTracking=Ko,e.setDevtoolsHook=Lr,e.setTransitionHooks=es,e.shallowReactive=gt,e.shallowReadonly=function(e){return yt(e,!0,je,ut,ft)},e.shallowRef=function(e){return Ot(e,!0)},e.ssrContextKey=Fn,e.ssrUtils=null,e.stop=function(e){e.effect.stop();},e.toDisplayString=e=>v(e)?e:null==e?"":p(e)||b(e)&&(e.toString===S||!g(e.toString))?JSON.stringify(e,se,2):String(e),e.toHandlerKey=F,e.toHandlers=function(e,t){const n={};for(const s in e)n[t&&/[A-Z]/.test(s)?`on:${s}`:F(s)]=e[s];return n},e.toRaw=Ct,e.toRef=function(e,t,n){return It(e)?e:g(e)?new Dt(e):b(e)&&arguments.length>1?Ut(e,t,n):Rt(e)},e.toRefs=function(e){const t=p(e)?new Array(e.length):{};for(const n in e)t[n]=Ut(e,n);return t},e.toValue=function(e){return g(e)?e():Ft(e)},e.transformVNodeArgs=function(e){},e.triggerRef=function(e){Nt(e,4);},e.unref=Ft,e.useAttrs=function(){return Os().attrs},e.useCssModule=function(e="$style"){return n},e.useCssVars=function(e){const t=pr();if(!t)return;const n=t.ut=(n=e(t.proxy))=>{Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach((e=>ci(e,n)));},s=()=>{const s=e(t.proxy);li(t.subTree,s),n(s);};vs((()=>{Mn(s);const e=new MutationObserver(s);e.observe(t.subTree.el.parentNode,{childList:!0}),Ss((()=>e.disconnect()));}));},e.useModel=function(e,t,s=n){const o=pr(),r=I(t),i=O(t),l=Bt(((n,l)=>{let c;return Pn((()=>{const n=e[t];M(c,n)&&(c=n,l());})),{get:()=>(n(),s.get?s.get(c):c),set(e){const n=o.vnode.props;n&&(t in n||r in n||i in n)&&(`onUpdate:${t}`in n||`onUpdate:${r}`in n||`onUpdate:${i}`in n)||!M(e,c)||(c=e,l()),o.emit(`update:${t}`,s.set?s.set(e):e);}}})),c="modelValue"===t?"modelModifiers":`${t}Modifiers`;return l[Symbol.iterator]=()=>{let t=0;return {next:()=>t<2?{value:t++?e[c]||{}:l,done:!1}:{done:!0}}},l},e.useSSRContext=()=>{},e.useSlots=function(){return Os().slots},e.useTransitionState=Kn,e.vModelCheckbox=Di,e.vModelDynamic=zi,e.vModelRadio=ji,e.vModelSelect=Hi,e.vModelText=Vi,e.vShow=oi,e.version=Rr,e.warn=Or,e.watch=Bn,e.watchEffect=function(e,t){return Vn(e,null,t)},e.watchPostEffect=Mn,e.watchSyncEffect=Pn,e.withAsyncContext=function(e){const t=pr();let n=e();return gr(),_(n)&&(n=n.catch((e=>{throw mr(t),e}))),[n,()=>mr(t)]},e.withCtx=gn,e.withDefaults=function(e,t){return null},e.withDirectives=function(e,t){if(null===hn)return e;const s=wr(hn)||hn.proxy,o=e.dirs||(e.dirs=[]);for(let r=0;r<t.length;r++){let[e,i,l,c=n]=t[r];e&&(g(e)&&(e={mounted:e,updated:e}),e.deep&&jn(i),o.push({dir:e,instance:s,value:i,oldValue:void 0,arg:l,modifiers:c}));}return e},e.withKeys=(e,t)=>{const n=e._withKeys||(e._withKeys={}),s=t.join(".");return n[s]||(n[s]=n=>{if(!("key"in n))return;const s=O(n.key);return t.some((e=>e===s||Qi[e]===s))?e(n):void 0})},e.withMemo=function(e,t,n,s){const o=n[s];if(o&&Ir(o,e))return o;const r=t();return r.memo=e.slice(),n[s]=r},e.withModifiers=(e,t)=>{const n=e._withMods||(e._withMods={}),s=t.join(".");return n[s]||(n[s]=(n,...s)=>{for(let e=0;e<t.length;e++){const s=Xi[t[e]];if(s&&s(n,t))return}return e(n,...s)})},e.withScopeId=e=>gn,e}({});

  /*!
    * vue-router v4.3.0
    * (c) 2024 Eduardo San Martin Morote
    * @license MIT
    */
  window.VueRouter=function(e,t){const n="undefined"!=typeof document;function r(e){return e.__esModule||"Module"===e[Symbol.toStringTag]}const o=Object.assign;function c(e,t){const n={};for(const r in t){const o=t[r];n[r]=s(o)?o.map(e):e(o);}return n}const a=()=>{},s=Array.isArray,i=/#/g,l=/&/g,u=/\//g,f=/=/g,p=/\?/g,h=/\+/g,d=/%5B/g,m=/%5D/g,g=/%5E/g,v=/%60/g,y=/%7B/g,b=/%7C/g,w=/%7D/g,E=/%20/g;function R(e){return encodeURI(""+e).replace(b,"|").replace(d,"[").replace(m,"]")}function k(e){return R(e).replace(h,"%2B").replace(E,"+").replace(i,"%23").replace(l,"%26").replace(v,"`").replace(y,"{").replace(w,"}").replace(g,"^")}function O(e){return null==e?"":function(e){return R(e).replace(i,"%23").replace(p,"%3F")}(e).replace(u,"%2F")}function j(e){try{return decodeURIComponent(""+e)}catch(e){}return ""+e}const P=/\/$/,C=e=>e.replace(P,"");function x(e,t,n="/"){let r,o={},c="",a="";const s=t.indexOf("#");let i=t.indexOf("?");return s<i&&s>=0&&(i=-1),i>-1&&(r=t.slice(0,i),c=t.slice(i+1,s>-1?s:t.length),o=e(c)),s>-1&&(r=r||t.slice(0,s),a=t.slice(s,t.length)),r=function(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/"),o=r[r.length-1];".."!==o&&"."!==o||r.push("");let c,a,s=n.length-1;for(c=0;c<r.length;c++)if(a=r[c],"."!==a){if(".."!==a)break;s>1&&s--;}return n.slice(0,s).join("/")+"/"+r.slice(c).join("/")}(null!=r?r:t,n),{fullPath:r+(c&&"?")+c+a,path:r,query:o,hash:j(a)}}function $(e,t){return t&&e.toLowerCase().startsWith(t.toLowerCase())?e.slice(t.length)||"/":e}function S(e,t){return (e.aliasOf||e)===(t.aliasOf||t)}function A(e,t){if(Object.keys(e).length!==Object.keys(t).length)return !1;for(const n in e)if(!L(e[n],t[n]))return !1;return !0}function L(e,t){return s(e)?M(e,t):s(t)?M(t,e):e===t}function M(e,t){return s(t)?e.length===t.length&&e.every(((e,n)=>e===t[n])):1===e.length&&e[0]===t}var q,B;!function(e){e.pop="pop",e.push="push";}(q||(q={})),function(e){e.back="back",e.forward="forward",e.unknown="";}(B||(B={}));function T(e){if(!e)if(n){const t=document.querySelector("base");e=(e=t&&t.getAttribute("href")||"/").replace(/^\w+:\/\/[^\/]+/,"");}else e="/";return "/"!==e[0]&&"#"!==e[0]&&(e="/"+e),C(e)}const G=/^[^#]+#/;function _(e,t){return e.replace(G,"#")+t}const F=()=>({left:window.scrollX,top:window.scrollY});function W(e){let t;if("el"in e){const n=e.el,r="string"==typeof n&&n.startsWith("#"),o="string"==typeof n?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!o)return;t=function(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return {behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}(o,e);}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(null!=t.left?t.left:window.scrollX,null!=t.top?t.top:window.scrollY);}function D(e,t){return (history.state?history.state.position-t:-1)+e}const I=new Map;let K=()=>location.protocol+"//"+location.host;function U(e,t){const{pathname:n,search:r,hash:o}=t,c=e.indexOf("#");if(c>-1){let t=o.includes(e.slice(c))?e.slice(c).length:1,n=o.slice(t);return "/"!==n[0]&&(n="/"+n),$(n,"")}return $(n,e)+r+o}function V(e,t,n,r=!1,o=!1){return {back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:o?F():null}}function H(e){const t=function(e){const{history:t,location:n}=window,r={value:U(e,n)},c={value:t.state};function a(r,o,a){const s=e.indexOf("#"),i=s>-1?(n.host&&document.querySelector("base")?e:e.slice(s))+r:K()+e+r;try{t[a?"replaceState":"pushState"](o,"",i),c.value=o;}catch(e){console.error(e),n[a?"replace":"assign"](i);}}return c.value||a(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0),{location:r,state:c,push:function(e,n){const s=o({},c.value,t.state,{forward:e,scroll:F()});a(s.current,s,!0),a(e,o({},V(r.value,e,null),{position:s.position+1},n),!1),r.value=e;},replace:function(e,n){a(e,o({},t.state,V(c.value.back,e,c.value.forward,!0),n,{position:c.value.position}),!0),r.value=e;}}}(e=T(e)),n=function(e,t,n,r){let c=[],a=[],s=null;const i=({state:o})=>{const a=U(e,location),i=n.value,l=t.value;let u=0;if(o){if(n.value=a,t.value=o,s&&s===i)return void(s=null);u=l?o.position-l.position:0;}else r(a);c.forEach((e=>{e(n.value,i,{delta:u,type:q.pop,direction:u?u>0?B.forward:B.back:B.unknown});}));};function l(){const{history:e}=window;e.state&&e.replaceState(o({},e.state,{scroll:F()}),"");}return window.addEventListener("popstate",i),window.addEventListener("beforeunload",l,{passive:!0}),{pauseListeners:function(){s=n.value;},listen:function(e){c.push(e);const t=()=>{const t=c.indexOf(e);t>-1&&c.splice(t,1);};return a.push(t),t},destroy:function(){for(const e of a)e();a=[],window.removeEventListener("popstate",i),window.removeEventListener("beforeunload",l);}}}(e,t.state,t.location,t.replace);const r=o({location:"",base:e,go:function(e,t=!0){t||n.pauseListeners(),history.go(e);},createHref:_.bind(null,e)},t,n);return Object.defineProperty(r,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(r,"state",{enumerable:!0,get:()=>t.state.value}),r}function N(e){return "string"==typeof e||"symbol"==typeof e}const z={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},Q=Symbol("");var X;function Y(e,t){return o(new Error,{type:e,[Q]:!0},t)}function Z(e,t){return e instanceof Error&&Q in e&&(null==t||!!(e.type&t))}e.NavigationFailureType=void 0,(X=e.NavigationFailureType||(e.NavigationFailureType={}))[X.aborted=4]="aborted",X[X.cancelled=8]="cancelled",X[X.duplicated=16]="duplicated";const J="[^/]+?",ee={sensitive:!1,strict:!1,start:!0,end:!0},te=/[.+*?^${}()[\]/\\]/g;function ne(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++;}return e.length<t.length?1===e.length&&80===e[0]?-1:1:e.length>t.length?1===t.length&&80===t[0]?1:-1:0}function re(e,t){let n=0;const r=e.score,o=t.score;for(;n<r.length&&n<o.length;){const e=ne(r[n],o[n]);if(e)return e;n++;}if(1===Math.abs(o.length-r.length)){if(oe(r))return 1;if(oe(o))return -1}return o.length-r.length}function oe(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const ce={type:0,value:""},ae=/[a-zA-Z0-9_]/;function se(e,t,n){const r=function(e,t){const n=o({},ee,t),r=[];let c=n.start?"^":"";const a=[];for(const t of e){const e=t.length?[]:[90];n.strict&&!t.length&&(c+="/");for(let r=0;r<t.length;r++){const o=t[r];let s=40+(n.sensitive?.25:0);if(0===o.type)r||(c+="/"),c+=o.value.replace(te,"\\$&"),s+=40;else if(1===o.type){const{value:e,repeatable:n,optional:i,regexp:l}=o;a.push({name:e,repeatable:n,optional:i});const u=l||J;if(u!==J){s+=10;try{new RegExp(`(${u})`);}catch(t){throw new Error(`Invalid custom RegExp for param "${e}" (${u}): `+t.message)}}let f=n?`((?:${u})(?:/(?:${u}))*)`:`(${u})`;r||(f=i&&t.length<2?`(?:/${f})`:"/"+f),i&&(f+="?"),c+=f,s+=20,i&&(s+=-8),n&&(s+=-20),".*"===u&&(s+=-50);}e.push(s);}r.push(e);}if(n.strict&&n.end){const e=r.length-1;r[e][r[e].length-1]+=.7000000000000001;}n.strict||(c+="/?"),n.end?c+="$":n.strict&&(c+="(?:/|$)");const i=new RegExp(c,n.sensitive?"":"i");return {re:i,score:r,keys:a,parse:function(e){const t=e.match(i),n={};if(!t)return null;for(let e=1;e<t.length;e++){const r=t[e]||"",o=a[e-1];n[o.name]=r&&o.repeatable?r.split("/"):r;}return n},stringify:function(t){let n="",r=!1;for(const o of e){r&&n.endsWith("/")||(n+="/"),r=!1;for(const e of o)if(0===e.type)n+=e.value;else if(1===e.type){const{value:c,repeatable:a,optional:i}=e,l=c in t?t[c]:"";if(s(l)&&!a)throw new Error(`Provided param "${c}" is an array but it is not repeatable (* or + modifiers)`);const u=s(l)?l.join("/"):l;if(!u){if(!i)throw new Error(`Missing required param "${c}"`);o.length<2&&(n.endsWith("/")?n=n.slice(0,-1):r=!0);}n+=u;}}return n||"/"}}}(function(e){if(!e)return [[]];if("/"===e)return [[ce]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(e){throw new Error(`ERR (${n})/"${l}": ${e}`)}let n=0,r=n;const o=[];let c;function a(){c&&o.push(c),c=[];}let s,i=0,l="",u="";function f(){l&&(0===n?c.push({type:0,value:l}):1===n||2===n||3===n?(c.length>1&&("*"===s||"+"===s)&&t(`A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`),c.push({type:1,value:l,regexp:u,repeatable:"*"===s||"+"===s,optional:"*"===s||"?"===s})):t("Invalid state to consume buffer"),l="");}function p(){l+=s;}for(;i<e.length;)if(s=e[i++],"\\"!==s||2===n)switch(n){case 0:"/"===s?(l&&f(),a()):":"===s?(f(),n=1):p();break;case 4:p(),n=r;break;case 1:"("===s?n=2:ae.test(s)?p():(f(),n=0,"*"!==s&&"?"!==s&&"+"!==s&&i--);break;case 2:")"===s?"\\"==u[u.length-1]?u=u.slice(0,-1)+s:n=3:u+=s;break;case 3:f(),n=0,"*"!==s&&"?"!==s&&"+"!==s&&i--,u="";break;default:t("Unknown state");}else r=n,n=4;return 2===n&&t(`Unfinished custom RegExp for param "${l}"`),f(),a(),o}(e.path),n),c=o(r,{record:e,parent:t,children:[],alias:[]});return t&&!c.record.aliasOf==!t.record.aliasOf&&t.children.push(c),c}function ie(e,t){const n=[],r=new Map;function c(e,n,r){const l=!r,u=function(e){return {path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:ue(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}}}(e);u.aliasOf=r&&r.record;const f=he(t,e),p=[u];if("alias"in e){const t="string"==typeof e.alias?[e.alias]:e.alias;for(const e of t)p.push(o({},u,{components:r?r.record.components:u.components,path:e,aliasOf:r?r.record:u}));}let h,d;for(const t of p){const{path:o}=t;if(n&&"/"!==o[0]){const e=n.record.path;t.path=n.record.path+(o&&("/"===e[e.length-1]?"":"/")+o);}if(h=se(t,n,f),r?r.alias.push(h):(d=d||h,d!==h&&d.alias.push(h),l&&e.name&&!fe(h)&&s(e.name)),u.children){const e=u.children;for(let t=0;t<e.length;t++)c(e[t],h,r&&r.children[t]);}r=r||h,(h.record.components&&Object.keys(h.record.components).length||h.record.name||h.record.redirect)&&i(h);}return d?()=>{s(d);}:a}function s(e){if(N(e)){const t=r.get(e);t&&(r.delete(e),n.splice(n.indexOf(t),1),t.children.forEach(s),t.alias.forEach(s));}else {const t=n.indexOf(e);t>-1&&(n.splice(t,1),e.record.name&&r.delete(e.record.name),e.children.forEach(s),e.alias.forEach(s));}}function i(e){let t=0;for(;t<n.length&&re(e,n[t])>=0&&(e.record.path!==n[t].record.path||!de(e,n[t]));)t++;n.splice(t,0,e),e.record.name&&!fe(e)&&r.set(e.record.name,e);}return t=he({strict:!1,end:!0,sensitive:!1},t),e.forEach((e=>c(e))),{addRoute:c,resolve:function(e,t){let c,a,s,i={};if("name"in e&&e.name){if(c=r.get(e.name),!c)throw Y(1,{location:e});s=c.record.name,i=o(le(t.params,c.keys.filter((e=>!e.optional)).concat(c.parent?c.parent.keys.filter((e=>e.optional)):[]).map((e=>e.name))),e.params&&le(e.params,c.keys.map((e=>e.name)))),a=c.stringify(i);}else if(null!=e.path)a=e.path,c=n.find((e=>e.re.test(a))),c&&(i=c.parse(a),s=c.record.name);else {if(c=t.name?r.get(t.name):n.find((e=>e.re.test(t.path))),!c)throw Y(1,{location:e,currentLocation:t});s=c.record.name,i=o({},t.params,e.params),a=c.stringify(i);}const l=[];let u=c;for(;u;)l.unshift(u.record),u=u.parent;return {name:s,path:a,params:i,matched:l,meta:pe(l)}},removeRoute:s,getRoutes:function(){return n},getRecordMatcher:function(e){return r.get(e)}}}function le(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function ue(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]="object"==typeof n?n[r]:n;return t}function fe(e){for(;e;){if(e.record.aliasOf)return !0;e=e.parent;}return !1}function pe(e){return e.reduce(((e,t)=>o(e,t.meta)),{})}function he(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}function de(e,t){return t.children.some((t=>t===e||de(e,t)))}function me(e){const t={};if(""===e||"?"===e)return t;const n=("?"===e[0]?e.slice(1):e).split("&");for(let e=0;e<n.length;++e){const r=n[e].replace(h," "),o=r.indexOf("="),c=j(o<0?r:r.slice(0,o)),a=o<0?null:j(r.slice(o+1));if(c in t){let e=t[c];s(e)||(e=t[c]=[e]),e.push(a);}else t[c]=a;}return t}function ge(e){let t="";for(let n in e){const r=e[n];if(n=k(n).replace(f,"%3D"),null==r){void 0!==r&&(t+=(t.length?"&":"")+n);continue}(s(r)?r.map((e=>e&&k(e))):[r&&k(r)]).forEach((e=>{void 0!==e&&(t+=(t.length?"&":"")+n,null!=e&&(t+="="+e));}));}return t}function ve(e){const t={};for(const n in e){const r=e[n];void 0!==r&&(t[n]=s(r)?r.map((e=>null==e?null:""+e)):null==r?r:""+r);}return t}const ye=Symbol(""),be=Symbol(""),we=Symbol(""),Ee=Symbol(""),Re=Symbol("");function ke(){let e=[];return {add:function(t){return e.push(t),()=>{const n=e.indexOf(t);n>-1&&e.splice(n,1);}},list:()=>e.slice(),reset:function(){e=[];}}}function Oe(e,n,r){const o=()=>{e[n].delete(r);};t.onUnmounted(o),t.onDeactivated(o),t.onActivated((()=>{e[n].add(r);})),e[n].add(r);}function je(e,t,n,r,o,c=(e=>e())){const a=r&&(r.enterCallbacks[o]=r.enterCallbacks[o]||[]);return ()=>new Promise(((s,i)=>{const l=e=>{var c;!1===e?i(Y(4,{from:n,to:t})):e instanceof Error?i(e):"string"==typeof(c=e)||c&&"object"==typeof c?i(Y(2,{from:t,to:e})):(a&&r.enterCallbacks[o]===a&&"function"==typeof e&&a.push(e),s());},u=c((()=>e.call(r&&r.instances[o],t,n,l)));let f=Promise.resolve(u);e.length<3&&(f=f.then(l)),f.catch((e=>i(e)));}))}function Pe(e,t,n,o,c=(e=>e())){const a=[];for(const i of e)for(const e in i.components){let l=i.components[e];if("beforeRouteEnter"===t||i.instances[e])if("object"==typeof(s=l)||"displayName"in s||"props"in s||"__vccOpts"in s){const r=(l.__vccOpts||l)[t];r&&a.push(je(r,n,o,i,e,c));}else {let s=l();a.push((()=>s.then((a=>{if(!a)return Promise.reject(new Error(`Couldn't resolve component "${e}" at "${i.path}"`));const s=r(a)?a.default:a;i.components[e]=s;const l=(s.__vccOpts||s)[t];return l&&je(l,n,o,i,e,c)()}))));}}var s;return a}function Ce(e){const n=t.inject(we),r=t.inject(Ee),o=t.computed((()=>n.resolve(t.unref(e.to)))),c=t.computed((()=>{const{matched:e}=o.value,{length:t}=e,n=e[t-1],c=r.matched;if(!n||!c.length)return -1;const a=c.findIndex(S.bind(null,n));if(a>-1)return a;const s=$e(e[t-2]);return t>1&&$e(n)===s&&c[c.length-1].path!==s?c.findIndex(S.bind(null,e[t-2])):a})),i=t.computed((()=>c.value>-1&&function(e,t){for(const n in t){const r=t[n],o=e[n];if("string"==typeof r){if(r!==o)return !1}else if(!s(o)||o.length!==r.length||r.some(((e,t)=>e!==o[t])))return !1}return !0}(r.params,o.value.params))),l=t.computed((()=>c.value>-1&&c.value===r.matched.length-1&&A(r.params,o.value.params)));return {route:o,href:t.computed((()=>o.value.href)),isActive:i,isExactActive:l,navigate:function(r={}){return function(e){if(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)return;if(e.defaultPrevented)return;if(void 0!==e.button&&0!==e.button)return;if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}e.preventDefault&&e.preventDefault();return !0}(r)?n[t.unref(e.replace)?"replace":"push"](t.unref(e.to)).catch(a):Promise.resolve()}}}const xe=t.defineComponent({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:Ce,setup(e,{slots:n}){const r=t.reactive(Ce(e)),{options:o}=t.inject(we),c=t.computed((()=>({[Se(e.activeClass,o.linkActiveClass,"router-link-active")]:r.isActive,[Se(e.exactActiveClass,o.linkExactActiveClass,"router-link-exact-active")]:r.isExactActive})));return ()=>{const o=n.default&&n.default(r);return e.custom?o:t.h("a",{"aria-current":r.isExactActive?e.ariaCurrentValue:null,href:r.href,onClick:r.navigate,class:c.value},o)}}});function $e(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const Se=(e,t,n)=>null!=e?e:null!=t?t:n;function Ae(e,t){if(!e)return null;const n=e(t);return 1===n.length?n[0]:n}const Le=t.defineComponent({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:n,slots:r}){const c=t.inject(Re),a=t.computed((()=>e.route||c.value)),s=t.inject(be,0),i=t.computed((()=>{let e=t.unref(s);const{matched:n}=a.value;let r;for(;(r=n[e])&&!r.components;)e++;return e})),l=t.computed((()=>a.value.matched[i.value]));t.provide(be,t.computed((()=>i.value+1))),t.provide(ye,l),t.provide(Re,a);const u=t.ref();return t.watch((()=>[u.value,l.value,e.name]),(([e,t,n],[r,o,c])=>{t&&(t.instances[n]=e,o&&o!==t&&e&&e===r&&(t.leaveGuards.size||(t.leaveGuards=o.leaveGuards),t.updateGuards.size||(t.updateGuards=o.updateGuards))),!e||!t||o&&S(t,o)&&r||(t.enterCallbacks[n]||[]).forEach((t=>t(e)));}),{flush:"post"}),()=>{const c=a.value,s=e.name,i=l.value,f=i&&i.components[s];if(!f)return Ae(r.default,{Component:f,route:c});const p=i.props[s],h=p?!0===p?c.params:"function"==typeof p?p(c):p:null,d=t.h(f,o({},h,n,{onVnodeUnmounted:e=>{e.component.isUnmounted&&(i.instances[s]=null);},ref:u}));return Ae(r.default,{Component:d,route:c})||d}}});return e.RouterLink=xe,e.RouterView=Le,e.START_LOCATION=z,e.createMemoryHistory=function(e=""){let t=[],n=[""],r=0;function o(e){r++,r!==n.length&&n.splice(r),n.push(e);}const c={location:"",state:{},base:e=T(e),createHref:_.bind(null,e),replace(e){n.splice(r--,1),o(e);},push(e,t){o(e);},listen:e=>(t.push(e),()=>{const n=t.indexOf(e);n>-1&&t.splice(n,1);}),destroy(){t=[],n=[""],r=0;},go(e,o=!0){const c=this.location,a=e<0?B.back:B.forward;r=Math.max(0,Math.min(r+e,n.length-1)),o&&function(e,n,{direction:r,delta:o}){const c={direction:r,delta:o,type:q.pop};for(const r of t)r(e,n,c);}(this.location,c,{direction:a,delta:e});}};return Object.defineProperty(c,"location",{enumerable:!0,get:()=>n[r]}),c},e.createRouter=function(e){const r=ie(e.routes,e),i=e.parseQuery||me,l=e.stringifyQuery||ge,u=e.history,f=ke(),p=ke(),h=ke(),d=t.shallowRef(z);let m=z;n&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const v=c.bind(null,(e=>""+e)),b=c.bind(null,O),E=c.bind(null,j);function k(e,t){if(t=o({},t||d.value),"string"==typeof e){const n=x(i,e,t.path),c=r.resolve({path:n.path},t),a=u.createHref(n.fullPath);return o(n,c,{params:E(c.params),hash:j(n.hash),redirectedFrom:void 0,href:a})}let n;if(null!=e.path)n=o({},e,{path:x(i,e.path,t.path).path});else {const r=o({},e.params);for(const e in r)null==r[e]&&delete r[e];n=o({},e,{params:b(r)}),t.params=b(t.params);}const c=r.resolve(n,t),a=e.hash||"";c.params=v(E(c.params));const s=function(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}(l,o({},e,{hash:(f=a,R(f).replace(y,"{").replace(w,"}").replace(g,"^")),path:c.path}));var f;const p=u.createHref(s);return o({fullPath:s,hash:a,query:l===ge?ve(e.query):e.query||{}},c,{redirectedFrom:void 0,href:p})}function P(e){return "string"==typeof e?x(i,e,d.value.path):o({},e)}function C(e,t){if(m!==e)return Y(8,{from:t,to:e})}function $(e){return M(e)}function L(e){const t=e.matched[e.matched.length-1];if(t&&t.redirect){const{redirect:n}=t;let r="function"==typeof n?n(e):n;return "string"==typeof r&&(r=r.includes("?")||r.includes("#")?r=P(r):{path:r},r.params={}),o({query:e.query,hash:e.hash,params:null!=r.path?{}:e.params},r)}}function M(e,t){const n=m=k(e),r=d.value,c=e.state,a=e.force,s=!0===e.replace,i=L(n);if(i)return M(o(P(i),{state:"object"==typeof i?o({},c,i.state):c,force:a,replace:s}),t||n);const u=n;let f;return u.redirectedFrom=t,!a&&function(e,t,n){const r=t.matched.length-1,o=n.matched.length-1;return r>-1&&r===o&&S(t.matched[r],n.matched[o])&&A(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}(l,r,n)&&(f=Y(16,{to:u,from:r}),te(r,r,!0,!1)),(f?Promise.resolve(f):G(u,r)).catch((e=>Z(e)?Z(e,2)?e:ee(e):J(e,u,r))).then((e=>{if(e){if(Z(e,2))return M(o({replace:s},P(e.to),{state:"object"==typeof e.to?o({},c,e.to.state):c,force:a}),t||u)}else e=K(u,r,!0,s,c);return _(u,r,e),e}))}function B(e,t){const n=C(e,t);return n?Promise.reject(n):Promise.resolve()}function T(e){const t=oe.values().next().value;return t&&"function"==typeof t.runWithContext?t.runWithContext(e):e()}function G(e,t){let n;const[r,o,c]=function(e,t){const n=[],r=[],o=[],c=Math.max(t.matched.length,e.matched.length);for(let a=0;a<c;a++){const c=t.matched[a];c&&(e.matched.find((e=>S(e,c)))?r.push(c):n.push(c));const s=e.matched[a];s&&(t.matched.find((e=>S(e,s)))||o.push(s));}return [n,r,o]}(e,t);n=Pe(r.reverse(),"beforeRouteLeave",e,t);for(const o of r)o.leaveGuards.forEach((r=>{n.push(je(r,e,t));}));const a=B.bind(null,e,t);return n.push(a),ae(n).then((()=>{n=[];for(const r of f.list())n.push(je(r,e,t));return n.push(a),ae(n)})).then((()=>{n=Pe(o,"beforeRouteUpdate",e,t);for(const r of o)r.updateGuards.forEach((r=>{n.push(je(r,e,t));}));return n.push(a),ae(n)})).then((()=>{n=[];for(const r of c)if(r.beforeEnter)if(s(r.beforeEnter))for(const o of r.beforeEnter)n.push(je(o,e,t));else n.push(je(r.beforeEnter,e,t));return n.push(a),ae(n)})).then((()=>(e.matched.forEach((e=>e.enterCallbacks={})),n=Pe(c,"beforeRouteEnter",e,t,T),n.push(a),ae(n)))).then((()=>{n=[];for(const r of p.list())n.push(je(r,e,t));return n.push(a),ae(n)})).catch((e=>Z(e,8)?e:Promise.reject(e)))}function _(e,t,n){h.list().forEach((r=>T((()=>r(e,t,n)))));}function K(e,t,r,c,a){const s=C(e,t);if(s)return s;const i=t===z,l=n?history.state:{};r&&(c||i?u.replace(e.fullPath,o({scroll:i&&l&&l.scroll},a)):u.push(e.fullPath,a)),d.value=e,te(e,t,r,i),ee();}let U;function V(){U||(U=u.listen(((e,t,r)=>{if(!ce.listening)return;const c=k(e),s=L(c);if(s)return void M(o(s,{replace:!0}),c).catch(a);m=c;const i=d.value;var l,f;n&&(l=D(i.fullPath,r.delta),f=F(),I.set(l,f)),G(c,i).catch((e=>Z(e,12)?e:Z(e,2)?(M(e.to,c).then((e=>{Z(e,20)&&!r.delta&&r.type===q.pop&&u.go(-1,!1);})).catch(a),Promise.reject()):(r.delta&&u.go(-r.delta,!1),J(e,c,i)))).then((e=>{(e=e||K(c,i,!1))&&(r.delta&&!Z(e,8)?u.go(-r.delta,!1):r.type===q.pop&&Z(e,20)&&u.go(-1,!1)),_(c,i,e);})).catch(a);})));}let H,Q=ke(),X=ke();function J(e,t,n){ee(e);const r=X.list();return r.length?r.forEach((r=>r(e,t,n))):console.error(e),Promise.reject(e)}function ee(e){return H||(H=!e,V(),Q.list().forEach((([t,n])=>e?n(e):t())),Q.reset()),e}function te(r,o,c,a){const{scrollBehavior:s}=e;if(!n||!s)return Promise.resolve();const i=!c&&function(e){const t=I.get(e);return I.delete(e),t}(D(r.fullPath,0))||(a||!c)&&history.state&&history.state.scroll||null;return t.nextTick().then((()=>s(r,o,i))).then((e=>e&&W(e))).catch((e=>J(e,r,o)))}const ne=e=>u.go(e);let re;const oe=new Set,ce={currentRoute:d,listening:!0,addRoute:function(e,t){let n,o;return N(e)?(n=r.getRecordMatcher(e),o=t):o=e,r.addRoute(o,n)},removeRoute:function(e){const t=r.getRecordMatcher(e);t&&r.removeRoute(t);},hasRoute:function(e){return !!r.getRecordMatcher(e)},getRoutes:function(){return r.getRoutes().map((e=>e.record))},resolve:k,options:e,push:$,replace:function(e){return $(o(P(e),{replace:!0}))},go:ne,back:()=>ne(-1),forward:()=>ne(1),beforeEach:f.add,beforeResolve:p.add,afterEach:h.add,onError:X.add,isReady:function(){return H&&d.value!==z?Promise.resolve():new Promise(((e,t)=>{Q.add([e,t]);}))},install(e){e.component("RouterLink",xe),e.component("RouterView",Le),e.config.globalProperties.$router=this,Object.defineProperty(e.config.globalProperties,"$route",{enumerable:!0,get:()=>t.unref(d)}),n&&!re&&d.value===z&&(re=!0,$(u.location).catch((e=>{})));const r={};for(const e in z)Object.defineProperty(r,e,{get:()=>d.value[e],enumerable:!0});e.provide(we,this),e.provide(Ee,t.shallowReactive(r)),e.provide(Re,d);const o=e.unmount;oe.add(e),e.unmount=function(){oe.delete(e),oe.size<1&&(m=z,U&&U(),U=null,d.value=z,re=!1,H=!1),o();};}};function ae(e){return e.reduce(((e,t)=>e.then((()=>T(t)))),Promise.resolve())}return ce},e.createRouterMatcher=ie,e.createWebHashHistory=function(e){return (e=location.host?e||location.pathname+location.search:"").includes("#")||(e+="#"),H(e)},e.createWebHistory=H,e.isNavigationFailure=Z,e.loadRouteLocation=function(e){return e.matched.every((e=>e.redirect))?Promise.reject(new Error("Cannot load a route that redirects.")):Promise.all(e.matched.map((e=>e.components&&Promise.all(Object.keys(e.components).reduce(((t,n)=>{const o=e.components[n];return "function"!=typeof o||"displayName"in o||t.push(o().then((t=>{if(!t)return Promise.reject(new Error(`Couldn't resolve component "${n}" at "${e.path}". Ensure you passed a function that returns a promise.`));const o=r(t)?t.default:t;e.components[n]=o;}))),t}),[]))))).then((()=>e))},e.matchedRouteKey=ye,e.onBeforeRouteLeave=function(e){const n=t.inject(ye,{}).value;n&&Oe(n,"leaveGuards",e);},e.onBeforeRouteUpdate=function(e){const n=t.inject(ye,{}).value;n&&Oe(n,"updateGuards",e);},e.parseQuery=me,e.routeLocationKey=Ee,e.routerKey=we,e.routerViewLocationKey=Re,e.stringifyQuery=ge,e.useLink=Ce,e.useRoute=function(){return t.inject(Ee)},e.useRouter=function(){return t.inject(we)},e.viewDepthKey=be,e}({},Vue);

  var ui$1 = {

      offcanvas(component, data, callbacks, options) {

          let offcanvas;

          data = data || {};
          callbacks = callbacks || {};

          let def = {

              $viewSetup(app) {

                  app.mixin({
                      methods: {
                          $close() {

                              if (this.$el.closest) {
                                  this.$el.closest('kiss-offcanvas').close();
                              } else {
                                  this.$el.parentNode.closest('kiss-offcanvas').close();
                              }
                          },
                          $call(name, ...args) {
                              if (callbacks[name]) {
                                  callbacks[name](...args);
                              }
                          }
                      }
                  });
              },

              data() {
                  return  {
                      data
                  }
              },

              components: {
                  'vue-offcanvas-content': component
              }
          };

          offcanvas = App.ui.offcanvas(/*html*/`
            <div class="vue-offcanvas">
                <vue-offcanvas-content v-bind="data"></vue-offcanvas-content>
            </div>
        `, options || {});

          offcanvas.$view = offcanvas.querySelector('.vue-offcanvas');

          VueView.compile(offcanvas.$view, def);
          setTimeout(() => offcanvas.show(), 50);

          return offcanvas;
      },

      modal(url, data, callbacks, options, modaltype) {

          data = data || {};
          callbacks = callbacks || {};

          let def = {

              $viewSetup(app) {

                  app.mixin({
                      methods: {
                          $close() {

                              if (this.$el.closest) {
                                  this.$el.closest('kiss-dialog').close();
                              } else {
                                  this.$el.parentNode.closest('kiss-dialog').close();
                              }
                          },
                          $call(name, ...args) {
                              if (callbacks[name]) {
                                  callbacks[name](...args);
                              }
                          }
                      }
                  });
              },

              data() {

                  return  {
                      data
                  }
              },

              components: {
                  'vue-dialog-content':  url
              }
          };

          let dialog = App.ui.dialog(/*html*/`
            <div class="vue-modal">
                <vue-dialog-content v-bind="data"></vue-dialog-content>
            </div>
        `, options || {}, modaltype);

          dialog.$view = dialog.querySelector('.vue-modal');

          VueView.compile(dialog.$view, def);
          setTimeout(() => dialog.show(), 100);

          return dialog;
      },

      popout(component, data, callbacks, options) {

          let popout;

          data = data || {};
          callbacks = callbacks || {};

          let def = {

              $viewSetup(app) {

                  app.mixin({
                      methods: {
                          $close() {

                              if (this.$el.closest) {
                                  this.$el.closest('kiss-popout').close();
                              } else {
                                  this.$el.parentNode.closest('kiss-popout').close();
                              }
                          },
                          $call(name, ...args) {
                              if (callbacks[name]) {
                                  callbacks[name](...args);
                              }
                          }
                      }
                  });
              },

              data() {
                  return  {
                      data
                  }
              },

              components: {
                  'vue-popout-content': component
              }
          };

          popout = App.ui.popout(/*html*/`
            <div class="vue-popout">
                <vue-popout-content v-bind="data"></vue-popout-content>
            </div>
        `, options || {});

          popout.$view = popout.querySelector('.vue-popout');

          VueView.compile(popout.$view, def);
          setTimeout(() => popout.show(), 50);

          return popout;
      },
  };

  /**
   * Dynamic vue template (Vue 3.x)
   */
  (function() {

      let VueView = {

          ready: new Promise(function(resolve) {
              document.addEventListener('DOMContentLoaded', e => resolve());
          }),

          components: {},

          component(name, def) {
              this.components[name] = def;
          },

          compile(el, def) {
              this.ready.then(() => {
                  this._compile(el, def);
              });
          },

          _compile: async function(el, definition) {

              let script = definition ? null : el.querySelector('script');
              let template = definition ? null : el.querySelector('template');
              let def = definition || {}, app;

              if (script) {
                  let module = await import(`data:text/javascript;charset=utf-8,${encodeURIComponent(script.innerHTML)}`);
                  def = module.default;
                  script.parentNode.removeChild(script);
              }

              if (template) {
                  def.template = template.innerHTML;
                  template.parentNode.removeChild(template);
              }

              def = Object.assign({}, def || {});

              def.components = def.components || {};

              Object.keys(def.components).forEach(name => {

                  if (typeof(def.components[name]) === 'string') {
                      def.components[name] = (function(url) {
                          return Vue.defineAsyncComponent(() => App.utils.import(url));
                      })(def.components[name]);
                  }
              });

              app = Vue.createApp(def);

              Object.keys(VueView.components).forEach(name => {

                  if (typeof(VueView.components[name]) === 'string') {
                      app.component(name, Vue.defineAsyncComponent(() => App.utils.import(VueView.components[name])));
                  } else {
                      app.component(name, VueView.components[name]);
                  }
              });

              app.mixin({
                  data() {
                      return {
                          App: window.App
                      }
                  },

                  methods: {
                      t(key) {
                          return App.i18n.get(key);
                      },

                      $route(url) {
                          return App.route(url);
                      },

                      $base(url) {
                          return App.base(url);
                      },

                      $request(url, data, type) {
                          return App.request(url, data, type);
                      },

                      $dialog: VueView.ui.modal,
                      $offcanvas: VueView.ui.offcanvas,
                  }
              });

              // view router
              if (def.$router && window.VueRouter) {

                  def.$router = Object.assign({
                      history: VueRouter.createWebHashHistory(),
                      routes: []
                  }, def.$router);

                  def.$router.routes.forEach(route => {

                      if (typeof(route.component) === 'string') {
                          route.component = (function(url) {
                              return Vue.defineAsyncComponent(() => App.utils.import(url));
                          })(route.component);
                      }
                  });

                  app.use(new VueRouter.createRouter(def.$router));
              }

              if (def.$viewSetup) {
                  def.$viewSetup(app);
              }

              app.mount(el);
              el.setAttribute('init', true);

              return app;
          }
      };

      class VueElement extends HTMLElement {
          connectedCallback() {
              VueView.compile(this);
          }
      }

      customElements.define('vue-view', VueElement);

      VueView.ui = ui$1;

      window.VueView = VueView;

  })();

  customElements.define('kiss-accordion', class extends HTMLElement {

      static get observedAttributes() {
          return [];
      }

      constructor() {
          super();
      }

      connectedCallback() {


          this.addEventListener('click', e => {

              let trigger = e.target.matches('kiss-accordion-trigger') ? e.target : e.target.closest('kiss-accordion-trigger');

              if (trigger) {
                  e.preventDefault();
                  this.toggle(this.triggerElements().indexOf(trigger));
              }
          });
      }

      triggerElements() {

          return Array.from(this.children).filter(c => {
              return c.matches('kiss-accordion-trigger');
          });
      }

      toggle(index = 0) {

          let triggers = this.triggerElements(),
              multiple = this.getAttribute('multiple') !== null;

          triggers.forEach((t, idx) => {

              if (idx == index) {
                  t.setAttribute('active', (!t.getAttribute('active') || t.getAttribute('active') == 'false') ? 'true' : 'false');
              } else if(!multiple) {
                  t.setAttribute('active', 'false');
              }
          });
      }
  });

  // WebReflection / element-notifier
  function onMutation(callback, root) {

      let loop = function loop(nodes, added, removed, connected, pass) {

          for (let i = 0, length = nodes.length; i < length; i++) {

              let node = nodes[i];

              if (pass || 'querySelectorAll' in node) {

                  if (connected) {
                      if (!added.has(node)) {
                          added.add(node);
                          removed["delete"](node);
                          callback(node, connected);
                      }
                  } else if (!removed.has(node)) {
                      removed.add(node);
                      added["delete"](node);
                      callback(node, connected);
                  }

                  if (!pass) loop((node.shadowRoot || node)['querySelectorAll']('*'), added, removed, connected, true);
              }
          }
      };

      let observer = new MutationObserver(records => {
          for (let added = new Set(), removed = new Set(), i = 0, length = records.length; i < length; i++) {
              let _records$i = records[i],
                  addedNodes = _records$i.addedNodes,
                  removedNodes = _records$i.removedNodes;
              loop(removedNodes, added, removed, false, false);
              loop(addedNodes, added, removed, true, false);
          }
      });

      observer.observe(root || document, {
          subtree: true,
          childList: true
      });

      return observer;
  }

  function on$1(element, name, delegate, fn) {

      if (!fn) {
         element.addEventListener(name, arguments[2]);
      } else {
          element.addEventListener(name, function (e) {

              let target = e.target;

              while (target !== element) {

                  if (!target) {
                      break;
                  }

                  if (target.matches(delegate)){
                      return fn.apply(target, arguments);
                  }

                  target = target.parentNode;
              }
          }, true);
      }

      return element;
  }

  function trigger(ele, name, data = {}) {
      ele.dispatchEvent(new CustomEvent(name, Object.assign({bubbles: true}, data)));
  }

  var events = {
      onMutation,
      on: on$1,
      trigger,
  };

  let Animations = {
      default(resolve, current, next) {
          resolve();
      },

      fade(resolve, current, next) {

          current.animate([
              {opacity: 1},
              {opacity: 0}
          ], {
              duration: 250,
          });

          next.animate([
              {opacity: 0},
              {opacity: 1}
          ], {
              duration: 250,
          }).addEventListener('finish', function(e) {
              resolve();
          }, false);
      },

      slide(resolve, current, next) {

          let slides = [...current.parentElement.children],
              dir = slides.indexOf(next) > slides.indexOf(current) ? 1 : -1;

          next.classList.add('visible');

          current.animate([
              {transform: `translateX(${-1 * dir * 100}%)`},
          ], {
              duration: 250,
              easing: 'ease-in-out',
          });

          next.animate([
              {transform: `translateX(${dir * 100}%)`},
              {transform: 'translateX(0)'},
          ], {
              duration: 250,
              easing: 'ease-in-out',
          }).addEventListener('finish', function(e) {
              resolve();
              next.classList.remove('visible');
          }, false);

      }
  };

  function animate(animation, current, next) {

      return new Promise((resolve, reject) => {
          (Animations[animation] || Animations.default)(resolve, current, next);
      });
  }

  customElements.define('kiss-carousel', class extends HTMLElement {

      static get observedAttributes() {
          return ['animation'];
      }

      attributeChangedCallback(attrName, oldVal, newVal) {

          switch (attrName) {
              case 'animation':
                  this.animation = newVal;
                  break;
          }
      }

      connectedCallback() {

          const $this = this;

          this.wrapper = this.querySelector(':scope > kiss-slides') || this;
          this.animation = this.getAttribute('animation') || 'slide';
          this.swipe = this.getAttribute('swipe') === 'false' ? false : true;

          this.setActive(0);

          // events
          on$1(this, 'click', '[kiss-slide]', function(e) {

              const goto = this.getAttribute('kiss-slide');

              switch(goto) {
                  case 'next':
                      $this.nextSlide();
                      break;
                  case 'prev':
                      $this.prevSlide();
                      break;
                  default:
                      const isNumeric = !isNaN(parseFloat(goto)) && isFinite(goto);

                      if (isNumeric && $this.slides()[Number(goto) - 1]) {
                          $this.setActive(Number(goto) - 1);
                      }
              }
          });

          let pointerStart = null;

          const exclude = 'a, input, textarea, select, button, video, audio';

          on$1(this.wrapper, 'pointerdown', e => {

              if (!this.swipe ||
                  e.target.matches(exclude) ||
                  e.target.closest(exclude)
              ) {
                  return;
              }

              e.preventDefault();
              pointerStart = e;

          });

          on$1(this.wrapper, 'pointermove', e => {

              if (!pointerStart) {
                  return;
              }

              e.preventDefault();
          });

          on$1(this.wrapper, 'pointerup', e => {

              if (!pointerStart) return;

              if (pointerStart.clientX < e.clientX) {
                  this.prevSlide();
              } else if(pointerStart.clientX > e.clientX) {
                  this.nextSlide();
              }

              pointerStart = null;
          });

          document.addEventListener('DOMContentLoaded', () => {
              this.normalize();
          });

          window.addEventListener('resize', () => {
              this.normalize();
          });
      }

      normalize() {

          let height = 0;
          let slides = this.slides();

          slides.forEach(slide => {
              slide.style.height = '';
              height = Math.max(height, slide.offsetHeight);
          });

          [this.wrapper, ...slides].forEach(slide => slide.style.height = `${height}px`);
      }

      slides() {
          return this.wrapper.querySelectorAll(':scope > kiss-slide');
      }

      nextSlide() {

          if (!this.activeSlide) return;

          let slides = this.slides();

          const index = [...slides].indexOf(this.activeSlide);

          this.setActive(slides[index + 1] ? index + 1 : 0);
      }

      prevSlide() {

          if (!this.activeSlide) return;

          let slides = this.slides();

          const index = [...slides].indexOf(this.activeSlide);

          this.setActive(slides[index - 1] ? index - 1 : slides.length - 1);
      }

      setActive(idx) {

          if (this.isAnimating) return;

          const slide = this.slides()[idx] || null;

          if (!slide) {
              return;
          }

          // initial
          if (!this.activeSlide && !idx) {
              slide.classList.add('active');
              this.activeSlide = slide;
              trigger(this, 'carouselenter', {
                  detail: {slide: this.activeSlide}
              });
              return;
          }

          this.isAnimating = true;

          trigger(this, 'carouselleave', {
              detail: {slide: this.activeSlide}
          });

          animate(this.animation, this.activeSlide, slide).then(() => {

              this.activeSlide.classList.remove('active');
              slide.classList.add('active');

              // update active triggers
              this.querySelectorAll('[kiss-slide]').forEach(item => {

                  item.classList.remove('active');

                  if (item.getAttribute('kiss-slide') == String(idx + 1)) {
                      item.classList.add('active');
                  }
              });

              this.activeSlide = slide;
              this.isAnimating = false;

              trigger(this, 'carouselenter', {
                  detail: {slide: this.activeSlide}
              });
          });
      }
  });

  on$1(document.documentElement, 'click', function(e) {

      let dropdowns = document.body.querySelectorAll('kiss-dropdown[open="true"]'),
          dp = e.target.closest('kiss-dropdown');

      for (let i=0;i<dropdowns.length;i++) {
          if (!dp || dp!==dropdowns[i]) dropdowns[i].close();
      }

  });

  customElements.define('kiss-dropdown', class extends HTMLElement {

      connectedCallback() {

          this.addEventListener('click', (e) => {

              if (e.target.matches('input,select,textarea')) {
                  return;
              }

              if (this.getAttribute('open') == 'true') {

                  if (this.getAttribute('autohide') == 'false') {
                      return
                  }

                  this.close();
              } else {
                  this.open();
              }
          });
      }

      open() {
          this.setAttribute('open', 'true');
      }

      close() {
          this.removeAttribute('open');
      }
  });

  function debounce(func, wait, immediate) {

      let timeout;

      return function () {
          let context = this, args = arguments;
          let later = () => {
              timeout = null;
              if (!immediate) func.apply(context, args);
          };
          let callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
      };
  }
  function isInViewport(element, partly = false) {

      let rect = element.getBoundingClientRect();

      // If partly is false, check if the element is fully in the viewport
      if (partly === false) {
          return (
              rect.top >= 0 &&
              rect.left >= 0 &&
              rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
              rect.right <= (window.innerWidth || document.documentElement.clientWidth)
          );
      }

      // Calculate the visible percentage of the element
      let visibleHeight = Math.min(rect.bottom, window.innerHeight || document.documentElement.clientHeight) -
          Math.max(rect.top, 0);
      let visibleWidth = Math.min(rect.right, window.innerWidth || document.documentElement.clientWidth) -
          Math.max(rect.left, 0);

      // Ensure that the dimensions are not negative
      visibleHeight = Math.max(visibleHeight, 0);
      visibleWidth = Math.max(visibleWidth, 0);

      // Calculate the percentage of the element that is visible
      let visiblePercentage = (visibleHeight * visibleWidth) / (rect.height * rect.width) * 100;

      // If partly is between 0 and 100, check if the visible percentage of the element is >= partly
      return (partly > 0 && partly <= 100) && visiblePercentage >= partly;
  }

  function isElementOnTop(element) {
      const rect = element.getBoundingClientRect();
      let topElement = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
      while (topElement && topElement.parentElement) {
          if (topElement === element) {
              return true;
          }
          topElement = topElement.parentElement;
      }
      return false;
  }


  var utils$1 = {
      debounce,
      isInViewport,
      isElementOnTop,
  };

  on$1(document.documentElement, 'keyup', function (e) {

      if (!['Esc', 'Escape'].includes(e.key)) {
          return;
      }

      let elements = document.querySelectorAll('kiss-dialog[open="true"][esc="true"]'), ele;

      for (let i = 0; i < elements.length; i++) {

          ele = elements[i];

          if (isElementOnTop(ele)) {
              e.stopImmediatePropagation();
              ele.close();
              break;
          }
      }
  });

  customElements.define('kiss-dialog', class extends HTMLElement {

      connectedCallback() {

          on$1(this, 'click', '[kiss-dialog-close]', e => {
              e.preventDefault();
              this.close();
          });
      }

      show() {

          this.setAttribute('open', 'true');

          setTimeout(() => {

              const focusElement = this.querySelector('[autofocus]') ||
                                   this.querySelector('a[href]:not([target="_blank"]),button:not([disabled])');

              if (focusElement) {
                  focusElement.focus();
              }

              this.scroll(0, 0);

          }, 100);
      }

      close() {
          this.removeAttribute('open');
      }
  });

  on$1(document.documentElement, 'click', '[kiss-offcanvas]', function (e) {

      e.preventDefault();

      let offcanvas = document.querySelector(this.getAttribute('kiss-offcanvas') || this.getAttribute('href'));

      if (offcanvas && offcanvas.show) {
          offcanvas.show();
      }
  });

  on$1(document.documentElement, 'keyup', function (e) {

      if (!['Esc', 'Escape'].includes(e.key)) {
          return;
      }

      let elements = document.querySelectorAll('kiss-offcanvas[open="true"]'), ele;

      for (let i = 0; i < elements.length; i++) {

          ele = elements[i];

          if (isElementOnTop(ele)) {
              e.stopImmediatePropagation();
              ele.close();
              break;
          }
      }

  });

  customElements.define('kiss-offcanvas', class extends HTMLElement {

      connectedCallback() {

          let $self = this, pointerStart = null;

          on$1(this, 'pointerdown', e => pointerStart = e.target);
          on$1(this, 'pointerup', e => {

              if (e.target == this && pointerStart == this) {

                  e.preventDefault();

                  if (!this.matches('[modal="true"]')) {
                      this.close();
                  }
              }
          });


          on$1(this, 'click', '[kiss-offcanvas-close]', function(e){

              if (this.getAttribute('kiss-offcanvas-close') != 'no-prevent') {
                  e.preventDefault();
              }

              $self.close();
          });

      }

      show() {
          this.setAttribute('open', 'true');
      }

      close() {
          this.removeAttribute('open');
      }
  });

  on$1(document.documentElement, 'click', '[kiss-popout]', function (e) {

      e.preventDefault();

      let menu = document.querySelector(this.getAttribute('kiss-popout') || this.getAttribute('href'));

      if (menu && menu.show) {

          let position = this.getAttribute('kiss-popout-pos');

          menu.show(position ? this : null, position);
      }
  });

  on$1(document.documentElement, 'keyup', function (e) {

      if (!['Esc', 'Escape'].includes(e.key)) {
          return;
      }

      let elements = document.querySelectorAll('kiss-popout[open="true"]'), ele;

      for (let i = 0; i < elements.length; i++) {

          ele = elements[i];

          if (isElementOnTop(ele)) {
              e.stopImmediatePropagation();
              ele.close();
              break;
          }
      }
  });

  customElements.define('kiss-popout', class extends HTMLElement {

      connectedCallback() {

          on$1(this, 'click', e => {

              if (e.target.matches('[kiss-popout-close]') || e.target.closest('[kiss-popout-close]')) {
                  return this.close();
              }

              if (this.getAttribute('modal') !== 'true') {
                  this.close();
              }
          });
      }

      show(ele, position = 'left') {

          let content = this.querySelector('kiss-content');

          if (content) {
              content.style.position = '';
              content.style.top = '';
              content.style.left = '';
          }

          if (content && ele) {

              let rect = ele.getBoundingClientRect(),
                  left = rect.left,
                  top = rect.top + ele.offsetHeight;

              switch (position) {
                  case 'right':
                      left = rect.right - content.offsetWidth;
                      break;

                  case 'center':
                      left = (rect.right - ele.offsetWidth/2) - content.offsetWidth / 2;
                      break;

                  case 'left':
                  default:
                      left = rect.left;
                      break;
              }

              if (left + content.offsetWidth > this.offsetWidth) {
                  left = rect.right - content.offsetWidth;
              }

              content.style.position = 'absolute';
              content.style.top = `${top}px`;
              content.style.left = `${left}px`;

              if (!isInViewport(content)) {
                  content.style.position = '';
                  content.style.top = '';
                  content.style.left = '';
              }
          }

          this.setAttribute('open', 'true');
      }

      close() {
          this.removeAttribute('open');
          trigger(this, 'popoutclose');
      }
  });

  customElements.define('kiss-parallax', class extends HTMLElement {

      connectedCallback() {

          let $this = this;

          this.speed = .3;
          this.mobilePx = 450;
          this.mobileDisable = this.getAttribute('mobile') == 'false';
          this.conditions = [];
          this.active = true;

          this.transform = this.getAttribute('transform') || 'translateY';

          this.winHeight = window.innerHeight;
          this.accumulated = 0;
          this.getRect();

          this.startScroll = this.targetR.top - this.winHeight > 0
            ? this.targetR.top - this.winHeight
            : 0;

          window.addEventListener('scroll', event => {
              requestAnimationFrame(() => {
                  if ($this.mobileDisable && window.innerWidth < this.mobilePx) return

                  if ($this.active) {
                    $this.update();
                  }
              });
          });
      }

      // HELPERS
      scrollY() {
          return window.scrollY || window.pageYOffset;
      }

      getTranslation() {
          const dist = this.scrollY() - this.startScroll;
          const translation = (dist * this.speed) + this.accumulated;
          return translation >= 0 ? translation : 0;
      }

      getRect() {
          this.targetR = this.getBoundingClientRect();
          return this.targetR;
      }

      inWindow() {
          this.getRect();

          const top = this.targetR.top;
          const bottom = this.targetR.bottom;

          return top < this.winHeight && bottom > 0;
      }

      update() {

          if (this._isHidden()) {
              return;
          }

          let translate = this.getTranslation();
          let percent = ((translate / this.speed)/this.winHeight) * 100;

          if (percent < 0) percent = 0;
          if (percent > 100) percent = 100;

          let style = {transform : '', filter: ''}, mod;

          this.transform.split(' ').forEach(prop => {

              mod = prop.split('*');
              prop = mod[0];
              mod = Number(mod[1] || 1);

              switch (prop) {
                  case 'translateX':
                  case 'translateY':
                      style.transform += ` ${prop}(${(translate * mod)}px)`;
                      break;

                  case 'rotate':
                  case 'rotateX':
                  case 'rotateY':
                      style.transform += ` ${prop}(${(translate * mod)}deg)`;
                      break;

                  case 'opacity':
                      style.opacity = (mod < 0 ?  (percent/100) : 1 - (percent/100)) * Math.abs(mod);
                      break;
              }
          });

          Object.assign(this.style, style);
      }

      _isHidden() {
          return (this.offsetTop === null)
      }
  });

  let register = [];

  document.addEventListener('scroll', () => {

      if (!register.length) return;

      const stickies = document.querySelectorAll('kiss-sticky, [data-sticky="true"]');
      let stickyHeight = 0;

      stickies.forEach((sticky, idx) => {

          const offset = parseInt(sticky.getAttribute('data-offset')) || 0;

          sticky.style.top = (stickyHeight + offset) + 'px';

          if (sticky.getBoundingClientRect().top <= stickyHeight + offset) {
              sticky.style.zIndex = stickies.length - idx;
          } else {
              sticky.style.zIndex = 0;
          }

          stickyHeight += sticky.offsetHeight + offset;
      });
  });

  customElements.define('kiss-sticky', class extends HTMLElement {

      connectedCallback() {
          register.push(this);
      }

      disconnectedCallback() {
      }
  });

  let svgCache = {};

  customElements.define('kiss-svg', class extends HTMLElement {

      static get observedAttributes() {
          return ['src'];
      }

      connectedCallback() {
          this.update();
      }

      attributeChangedCallback(attrName, oldVal, newVal) {
          if (attrName == 'src') this.update();
      }

      update() {

          let url = this.getAttribute('src');
          let width = this.getAttribute('width');
          let height = this.getAttribute('height');

          if (!url || !url.trim()) {
              this.innerHTML = '';
              return;
          }

          if (width && height) {
              this.innerHTML = `<canvas width="${width}" height="${height}"></canvas>`;
          }

          const mutate = (content) => {

              let attrs = {
                  width: this.getAttribute('width') || '',
                  height: this.getAttribute('height') || ''
              };

              let svgStart = content.indexOf('<svg');

              if (svgStart === -1) {
                  this.innerHTML = '';
                  return;
              }

              this.innerHTML = content.substr(svgStart);

              let svg = this.children[0];

              Object.keys(attrs).forEach(attr => attrs[attr] && svg.setAttribute(attr, attrs[attr]));
          };

          if (!svgCache[url]) {
              svgCache[url] = fetch(url).then(response => response.text());
          }

          svgCache[url].then(content => {
              mutate(content.trim());
          }).catch(() => {
              this.innerHTML = '';
          });
      }

  });

  customElements.define('kiss-tabs', class extends HTMLElement {

      static get observedAttributes() {
          return [];
      }

      constructor() {
          super();
      }

      connectedCallback() {

          if (this.getAttribute('static') == 'true') {
              return;
          }

          this.activeIndex = Number(this.getAttribute('index') || 0);

          this.nav = document.createElement("ul");

          this.nav.classList.add('kiss-tabs-nav');
          this.prepend(this.nav);

          this.render();

          this.addEventListener('click', e => {
              if (!e.target.classList.contains('kiss-tabs-nav-link')) return;
              this.setIndex(e.target.getAttribute('index'));
              e.preventDefault();
          });
      }

      attributeChangedCallback(oldvalue, newvalue) {
          if (oldvalue != newvalue) this.render();
      }

      setIndex(index) {

          this.activeIndex = Number(index);

          this.tabs.forEach((tab, idx) => {

              this.nav.children[idx].setAttribute('active', this.activeIndex == idx ? 'true' : 'false');
              tab.setAttribute('active', this.activeIndex == idx ? 'true' : 'false');
          });
      }

      render() {

          if (this.getAttribute('static') == 'true') {
              return;
          }

          this.tabs = [];

          this.nav.innerHTML = '';

          let item;

          for (let i = 0; i < this.children.length; i++) {

              if (this.children[i].tagName.toLowerCase() == 'tab') {

                  item = document.createElement("li");
                  item.innerHTML = `<a class="kiss-tabs-nav-link" index="${this.tabs.length}">${this.children[i].getAttribute('caption') || 'Tab'}</a>`;
                  this.nav.append(item);

                  this.tabs.push(this.children[i]);

                  this.children[i].setAttribute('active', 'false');
                  item.setAttribute('active', 'false');
              }
          }

          this.setIndex(this.activeIndex);
      }
  });

  let tooltipContainer = null;

  on$1(document.documentElement, 'mouseenter', '[kiss-tooltip]', function(e) {

      e.preventDefault();

      if (!tooltipContainer) {

          tooltipContainer = document.createElement('kiss-tooltip');
          document.body.appendChild(tooltipContainer);

      }

      tooltipContainer.show(this.getAttribute('aria-label'), this, this.getAttribute('kiss-tooltip'));
  });


  customElements.define('kiss-tooltip', class extends HTMLElement {

      connectedCallback() {

      }

      show(text, ele, position = 'bottom') {

          this.innerText = text;
          this.setAttribute('show', 'true');

          if (ele) {
              let rect = ele.getBoundingClientRect(),
              left = null,
              top = null,
              offset = 5;

              switch (position) {
                  case "right":
                      top = (rect.top + rect.height / 2) - this.offsetHeight / 2;
                      left = rect.right + offset;
                      break;

                  case "bottom":
                      top = rect.bottom + offset;
                      left = rect.left;
                      break;
                  default:
                      left = rect.left;
                      break;
              }

              Object.assign(this.style, {
                  top: `${top}px`,
                  left: `${left}px`
              });

              this.$element = ele;

              if (!ele.__tooltiped) {

                  on$1(ele, 'mouseleave', e => {
                      tooltipContainer.hide();
                  });

                  ele.__tooltiped = true;
              }

          }
      }

      hide() {
          this.setAttribute('show', 'false');
      }

      isActive() {
          return this.getAttribute('show') == 'true';
      }
  });

  HTMLElement.prototype.on = function(event, selector, handler) {
      return events.on(this, event, selector, handler)
  };

  HTMLElement.prototype.onMutation = function(callback) {
      return events.onMutation(callback, this)
  };

  window.KISS = Object.assign(window.KISS || {}, {
      events,
      utils: utils$1,
  });

  /**
   * JSONStorage - a simple storage helper inspired by the redis api.
   *
   * @author     Artur Heinze
   * @copyright  (c) since 2012 Artur Heinze
   * @license    MIT - http://opensource.org/licenses/MIT
   * @url        https://github.com/aheinze/JSONStorage
   */
  (function (global) {

      function Store(name, adapter) {

          var $this = this;

          this.name = name;
          this.adapter = adapter;
          this.data = adapter.load(name);
          this.data.__ex = this.data.__ex || {}; // expires data container

          // cleanup expires data
          (function () {

              var time = (new Date()).getTime();

              for (var key in $this.data.__ex) {
                  if ($this.data.__ex[key] < time) {
                      delete $this.data[key];
                      delete $this.data.__ex[key];
                  }
              }

          })();
      }

      Store.prototype.store = function () {
          try {
              this.adapter.store(this.name, this.data);
          } catch (e) { }
      };

      Store.prototype.toString = function () {
          return JSON.stringify(this.data);
      };

      Store.prototype.flushdb = function () {

          var $this = this;

          this.data = {};
          this.data.__ex = {};

          setTimeout(function () {
              $this.store();
          }, 0); // async saving!?

          return true;
      };

      Store.prototype.get = function (key, def) {

          if (this.data.__ex[key] && this.data.__ex[key] < (new Date()).getTime()) {
              delete this.data[key];
              delete this.data.__ex[key];
          }

          return this.data[key] !== undefined ? this.data[key] : def;
      };

      Store.prototype.set = function (key, value) {
          this.data[key] = value;
          this.store();
      };

      Store.prototype.setex = function (key, seconds, value) {
          this.set(key, value);
          this.expire(key, seconds);
      };

      Store.prototype.expire = function (key, seconds) {
          if (this.data[key]) this.data.__ex[key] = (new Date()).getTime() + (seconds * 1000);
      };

      Store.prototype.exists = function (key) {
          return this.get(key, "___no___") !== "___no___";
      };

      Store.prototype.del = function () {

          var keys = arguments,
              key = null,
              removed = 0;

          for (var i = 0; i < keys.length; i++) {

              key = keys[i];

              if (this.exists(key)) {
                  delete this.data[key];

                  if (this.data.__ex[key]) {
                      delete this.data.__ex[key];
                  }

                  removed++;
              }
          }

          this.store();

          return removed;
      };

      Store.prototype.type = function (key) {

          key = this.get(key);

          if (typeof (key) === 'object') {
              return JSON.stringify(key)[0] === "[" ? "list" : "set";
          }

          return typeof (key);
      };

      Store.prototype.append = function (key, value) {

          value = String(value);

          var current = String(this.get(key, "")),
              newone = current + value;

          this.set(key, newone);

          return newone.length;
      };

      Store.prototype.incr = function (key, by) {

          by = by || 1;

          var current = Number(this.get(key, 0)),
              newone = current + by;

          this.set(key, newone);

          return newone;
      };

      Store.prototype.decr = function (key, by) {
          by = by || 1;
          return this.incr(key, (by * -1));
      };

      /* List methods */

      Store.prototype.llen = function (key) {
          return this.get(key, []).length;
      };

      Store.prototype.lpush = function (key, value) {
          var list = this.get(key, []),
              ret = list.unshift(value);

          this.set(key, list);
          return ret;
      };

      Store.prototype.rpush = function (key, value) {
          var list = this.get(key, []),
              ret = list.push(value);

          this.set(key, list);
          return ret;
      };

      Store.prototype.lset = function (key, index, value) {
          var list = this.get(key, []);

          if (index < 0) {
              index = list.length - Math.abs(index);
          }

          if (list[index]) {
              list[index] = value;
              this.set(key, list);
              return true;
          }

          return false;
      };

      Store.prototype.lindex = function (key, index) {
          var list = this.get(key, []);

          if (index < 0) {
              index = list.length - Math.abs(index);
          }

          return list[index] ? list[index] : null;
      };

      /* Hash methods */

      Store.prototype.hset = function (key, field, value) {
          var set = this.get(key, {});

          set[field] = value;
          this.set(key, set);
      };

      Store.prototype.hget = function (key, field, def) {
          var set = this.get(key, {});

          return set[field] !== undefined ? set[field] : def;
      };

      Store.prototype.hgetall = function (key) {
          return this.get(key, {});
      };

      Store.prototype.hexists = function (key, field) {
          var set = this.get(key, {});

          return (set[field] !== undefined);
      };

      Store.prototype.hkeys = function (key) {
          var set = this.get(key, {}),
              keys = [],
              name = null;

          for (name in set) {
              if (set.hasOwnProperty(name)) {
                  keys.push(name);
              }
          }

          return keys;
      };

      Store.prototype.hvals = function (key) {
          var set = this.get(key, {}),
              vals = [],
              name = null;

          for (name in set) {
              if (set.hasOwnProperty(name)) {
                  vals.push(keys[name]);
              }
          }

          return vals;
      };

      Store.prototype.hlen = function (key) {
          return this.hkeys(key).length;
      };

      Store.prototype.hdel = function (key) {

          if (!this.exists(key)) return 0;

          var set = this.get(key, {}),
              field = null,
              removed = 0;

          for (var i = 1; i < arguments.length; i++) {

              field = arguments[i];

              if (set[field] !== undefined) {
                  delete set[field];
                  removed++;
              }
          }

          this.set(key, set);

          return removed;
      };

      Store.prototype.hincrby = function (key, field, by) {
          by = by || 1;
          var current = Number(this.hget(key, field, 0)),
              newone = current + by;

          this.hset(key, field, newone);

          return newone;
      };

      Store.prototype.hmget = function (key) {
          var set = this.get(key, {}),
              field = null,
              values = [];

          for (var i = 1; i < arguments.length; i++) {
              field = arguments[i];
              values.push(set[field] !== undefined ? set[field] : null);
          }

          return values;
      };

      Store.prototype.hmset = function (key) {
          var set = this.get(key, {}),
              field = null,
              value = null;

          for (var i = 1; i < arguments.length; i++) {
              field = arguments[i];
              value = arguments[(i + 1)] ? arguments[(i + 1)] : null;
              set[field] = value;
              i = i + 1;
          }

          this.set(key, set);
      };

      var JSONStorage = {

          select: function (name, adapter) {
              return (new Store(name, typeof (adapter) == 'object' ? adapter : (this.adapters[adapter] || this.adapters['memory'])));
          },

          adapters: {

              memory: (function () {
                  var dbs = {};

                  return {
                      load: function (name) {
                          return dbs[name] || {};
                      },
                      store: function (name, data) {
                          dbs[name] = data;
                      }
                  }
              })(),

              local: {
                  load: function (name) {
                      return global.localStorage["jsonstorage." + name] ? JSON.parse(global.localStorage["jsonstorage." + name]) : {};
                  },
                  store: function (name, data) {
                      global.localStorage["jsonstorage." + name] = JSON.stringify(data);
                  }
              },

              session: {
                  load: function (name) {
                      return global.sessionStorage["jsonstorage." + name] ? JSON.parse(global.sessionStorage["jsonstorage." + name]) : {};
                  },
                  store: function (name, data) {
                      global.sessionStorage["jsonstorage." + name] = JSON.stringify(data);
                  }
              }
          }
      };

      // AMD support
      if (typeof define === 'function' && define.amd) {
          define(function () {
              return JSONStorage;
          });
          // CommonJS and Node.js module support.
      } else if (typeof exports !== 'undefined') {
          // Support Node.js specific `module.exports` (which can be a function)
          if (typeof module != 'undefined' && module.exports) {
              exports = module.exports = JSONStorage;
          }
          // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
          exports.JSONStorage = JSONStorage;
      } else {
          global.JSONStorage = JSONStorage;
      }

  })(typeof window === 'undefined' ? {} : window);

  /**
   * Translation tool
   */
  (function(global){

          function extend(destination, source) {

              if (!destination || !source) return destination;

              for (var field in source) {
                  if (destination[field] === source[field]) continue;
                  destination[field] = source[field];
              }

              return destination;
          }


          var i18n = {

                  __data : {},

                  register: function(key, data){

                      switch(arguments.length) {
                          case 1:
                              extend(this.__data, key);
                              break;
                          case 2:
                              this.__data[key] = data;
                              break;
                      }
                  },
                  get: function(key){

                      var args = arguments.length ==1 ? [] : Array.prototype.slice.call(arguments, 1);

                      if (!this.__data[key]) {
                          return this.printf(key, args);
                      }

                      return this.printf(String(this.__data[key]), args);
                  },

                  key: function(key) {
                    return this.__data[key] ? this.__data[key] : null;
                  },

                  printf: function() {
                      // From: http://phpjs.org/functions
                        // +   original by: Ash Searle (http://hexmen.com/blog/)
                        // + namespaced by: Michael White (http://getsprink.com)
                        // +    tweaked by: Jack
                        // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
                        // +      input by: Paulo Freitas
                        // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
                        // +      input by: Brett Zamir (http://brett-zamir.me)
                        // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
                        // +   improved by: Dj
                        // +   improved by: Allidylls
                        // *     example 1: sprintf("%01.2f", 123.1);
                        // *     returns 1: 123.10
                        // *     example 2: sprintf("[%10s]", 'monkey');
                        // *     returns 2: '[    monkey]'
                        // *     example 3: sprintf("[%'#10s]", 'monkey');
                        // *     returns 3: '[####monkey]'
                        // *     example 4: sprintf("%d", 123456789012345);
                        // *     returns 4: '123456789012345'
                        var regex = /%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuideEfFgG])/g;
                        var a = arguments,
                          i = 0,
                          format = a[i++];

                        // pad()
                        var pad = function (str, len, chr, leftJustify) {
                          if (!chr) {
                            chr = ' ';
                          }
                          var padding = (str.length >= len) ? '' : Array(1 + len - str.length >>> 0).join(chr);
                          return leftJustify ? str + padding : padding + str;
                        };

                        // justify()
                        var justify = function (value, prefix, leftJustify, minWidth, zeroPad, customPadChar) {
                          var diff = minWidth - value.length;
                          if (diff > 0) {
                            if (leftJustify || !zeroPad) {
                              value = pad(value, minWidth, customPadChar, leftJustify);
                            } else {
                              value = value.slice(0, prefix.length) + pad('', diff, '0', true) + value.slice(prefix.length);
                            }
                          }
                          return value;
                        };

                        // formatBaseX()
                        var formatBaseX = function (value, base, prefix, leftJustify, minWidth, precision, zeroPad) {
                          // Note: casts negative numbers to positive ones
                          var number = value >>> 0;
                          prefix = prefix && number && {
                            '2': '0b',
                            '8': '0',
                            '16': '0x'
                          }[base] || '';
                          value = prefix + pad(number.toString(base), precision || 0, '0', false);
                          return justify(value, prefix, leftJustify, minWidth, zeroPad);
                        };

                        // formatString()
                        var formatString = function (value, leftJustify, minWidth, precision, zeroPad, customPadChar) {
                          if (precision != null) {
                            value = value.slice(0, precision);
                          }
                          return justify(value, '', leftJustify, minWidth, zeroPad, customPadChar);
                        };

                        // doFormat()
                        var doFormat = function (substring, valueIndex, flags, minWidth, _, precision, type) {
                          var number;
                          var prefix;
                          var method;
                          var textTransform;
                          var value;

                          if (substring === '%%') {
                            return '%';
                          }

                          // parse flags
                          var leftJustify = false,
                            positivePrefix = '',
                            zeroPad = false,
                            prefixBaseX = false,
                            customPadChar = ' ';
                          var flagsl = flags.length;
                          for (var j = 0; flags && j < flagsl; j++) {
                            switch (flags.charAt(j)) {
                            case ' ':
                              positivePrefix = ' ';
                              break;
                            case '+':
                              positivePrefix = '+';
                              break;
                            case '-':
                              leftJustify = true;
                              break;
                            case "'":
                              customPadChar = flags.charAt(j + 1);
                              break;
                            case '0':
                              zeroPad = true;
                              break;
                            case '#':
                              prefixBaseX = true;
                              break;
                            }
                          }

                          // parameters may be null, undefined, empty-string or real valued
                          // we want to ignore null, undefined and empty-string values
                          if (!minWidth) {
                            minWidth = 0;
                          } else if (minWidth === '*') {
                            minWidth = +a[i++];
                          } else if (minWidth.charAt(0) == '*') {
                            minWidth = +a[minWidth.slice(1, -1)];
                          } else {
                            minWidth = +minWidth;
                          }

                          // Note: undocumented perl feature:
                          if (minWidth < 0) {
                            minWidth = -minWidth;
                            leftJustify = true;
                          }

                          if (!isFinite(minWidth)) {
                            throw new Error('sprintf: (minimum-)width must be finite');
                          }

                          if (!precision) {
                            precision = 'fFeE'.indexOf(type) > -1 ? 6 : (type === 'd') ? 0 : undefined;
                          } else if (precision === '*') {
                            precision = +a[i++];
                          } else if (precision.charAt(0) == '*') {
                            precision = +a[precision.slice(1, -1)];
                          } else {
                            precision = +precision;
                          }

                          // grab value using valueIndex if required?
                          value = valueIndex ? a[valueIndex.slice(0, -1)] : a[i++];

                          switch (type) {
                          case 's':
                            return formatString(String(value), leftJustify, minWidth, precision, zeroPad, customPadChar);
                          case 'c':
                            return formatString(String.fromCharCode(+value), leftJustify, minWidth, precision, zeroPad);
                          case 'b':
                            return formatBaseX(value, 2, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
                          case 'o':
                            return formatBaseX(value, 8, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
                          case 'x':
                            return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
                          case 'X':
                            return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad).toUpperCase();
                          case 'u':
                            return formatBaseX(value, 10, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
                          case 'i':
                          case 'd':
                            number = +value || 0;
                            number = Math.round(number - number % 1); // Plain Math.round doesn't just truncate
                            prefix = number < 0 ? '-' : positivePrefix;
                            value = prefix + pad(String(Math.abs(number)), precision, '0', false);
                            return justify(value, prefix, leftJustify, minWidth, zeroPad);
                          case 'e':
                          case 'E':
                          case 'f': // Should handle locales (as per setlocale)
                          case 'F':
                          case 'g':
                          case 'G':
                            number = +value;
                            prefix = number < 0 ? '-' : positivePrefix;
                            method = ['toExponential', 'toFixed', 'toPrecision']['efg'.indexOf(type.toLowerCase())];
                            textTransform = ['toString', 'toUpperCase']['eEfFgG'.indexOf(type) % 2];
                            value = prefix + Math.abs(number)[method](precision);
                            return justify(value, prefix, leftJustify, minWidth, zeroPad)[textTransform]();
                          default:
                            return substring;
                          }
                        };

                        return format.replace(regex, doFormat);
                  }

          };

          // AMD support
          if (typeof define === 'function' && define.amd) {
              define(function () { return i18n; });

          // CommonJS and Node.js module support.
          } else if (typeof exports !== 'undefined') {
              // Support Node.js specific `module.exports` (which can be a function)
              if (typeof module != 'undefined' && module.exports) {
               exports = module.exports = i18n;
              }
              // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
              exports.i18n = i18n;
          } else {
              // browser client
              window.i18n = i18n;
          }

  })();

  /*! @license DOMPurify 3.0.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.0/LICENSE */
  !function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).DOMPurify=t();}(undefined,(function(){function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e,n){return t=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},t(e,n)}function n(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}function r(e,o,a){return r=n()?Reflect.construct:function(e,n,r){var o=[null];o.push.apply(o,n);var a=new(Function.bind.apply(e,o));return r&&t(a,r.prototype),a},r.apply(null,arguments)}function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,o,a=[],i=!0,l=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);i=!0);}catch(e){l=!0,o=e;}finally{try{i||null==n.return||n.return();}finally{if(l)throw o}}return a}(e,t)||i(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e){return function(e){if(Array.isArray(e))return l(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||i(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,t){if(e){if("string"==typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return "Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(e,t):void 0}}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var c=Object.entries,u=Object.setPrototypeOf,s=Object.isFrozen,f=Object.getPrototypeOf,m=Object.getOwnPropertyDescriptor,p=Object.freeze,d=Object.seal,h=Object.create,y="undefined"!=typeof Reflect&&Reflect,g=y.apply,b=y.construct;g||(g=function(e,t,n){return e.apply(t,n)}),p||(p=function(e){return e}),d||(d=function(e){return e}),b||(b=function(e,t){return r(e,a(t))});var v,T=R(Array.prototype.forEach),N=R(Array.prototype.pop),A=R(Array.prototype.push),E=R(String.prototype.toLowerCase),w=R(String.prototype.toString),S=R(String.prototype.match),x=R(String.prototype.replace),_=R(String.prototype.indexOf),k=R(String.prototype.trim),O=R(RegExp.prototype.test),D=(v=TypeError,function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return b(v,t)});function R(e){return function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return g(e,t,r)}}function C(e,t,n){n=n||E,u&&u(e,null);for(var r=t.length;r--;){var o=t[r];if("string"==typeof o){var a=n(o);a!==o&&(s(t)||(t[r]=a),o=a);}e[o]=!0;}return e}function L(e){var t,n=h(null),r=function(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=i(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return {s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,l=!0,c=!1;return {s:function(){n=n.call(e);},n:function(){var e=n.next();return l=e.done,e},e:function(e){c=!0,a=e;},f:function(){try{l||null==n.return||n.return();}finally{if(c)throw a}}}}(c(e));try{for(r.s();!(t=r.n()).done;){var a=o(t.value,2),l=a[0],u=a[1];n[l]=u;}}catch(e){r.e(e);}finally{r.f();}return n}function M(e,t){for(;null!==e;){var n=m(e,t);if(n){if(n.get)return R(n.get);if("function"==typeof n.value)return R(n.value)}e=f(e);}return function(e){return console.warn("fallback value for",e),null}}var I=p(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),F=p(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),U=p(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),z=p(["animate","color-profile","cursor","discard","fedropshadow","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),H=p(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover"]),j=p(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),P=p(["#text"]),B=p(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","xmlns","slot"]),G=p(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),W=p(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),q=p(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Y=d(/\{\{[\w\W]*|[\w\W]*\}\}/gm),$=d(/<%[\w\W]*|[\w\W]*%>/gm),K=d(/\${[\w\W]*}/gm),V=d(/^data-[\-\w.\u00B7-\uFFFF]/),X=d(/^aria-[\-\w]+$/),Z=d(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),J=d(/^(?:\w+script|data):/i),Q=d(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),ee=d(/^html$/i),te=function(){return "undefined"==typeof window?null:window},ne=function(t,n){if("object"!==e(t)||"function"!=typeof t.createPolicy)return null;var r=null,o="data-tt-policy-suffix";n.currentScript&&n.currentScript.hasAttribute(o)&&(r=n.currentScript.getAttribute(o));var a="dompurify"+(r?"#"+r:"");try{return t.createPolicy(a,{createHTML:function(e){return e},createScriptURL:function(e){return e}})}catch(e){return console.warn("TrustedTypes policy "+a+" could not be created."),null}};var re=function t(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:te(),r=function(e){return t(e)};if(r.version="3.0.0",r.removed=[],!n||!n.document||9!==n.document.nodeType)return r.isSupported=!1,r;var o=n.document,i=n.document,l=n.DocumentFragment,u=n.HTMLTemplateElement,s=n.Node,f=n.Element,m=n.NodeFilter,d=n.NamedNodeMap,h=void 0===d?n.NamedNodeMap||n.MozNamedAttrMap:d,y=n.HTMLFormElement,g=n.DOMParser,b=n.trustedTypes,v=f.prototype,R=M(v,"cloneNode"),re=M(v,"nextSibling"),oe=M(v,"childNodes"),ae=M(v,"parentNode");if("function"==typeof u){var ie=i.createElement("template");ie.content&&ie.content.ownerDocument&&(i=ie.content.ownerDocument);}var le=ne(b,o),ce=le?le.createHTML(""):"",ue=i,se=ue.implementation,fe=ue.createNodeIterator,me=ue.createDocumentFragment,pe=ue.getElementsByTagName,de=o.importNode,he={};r.isSupported="function"==typeof c&&"function"==typeof ae&&se&&void 0!==se.createHTMLDocument;var ye,ge,be=Y,ve=$,Te=K,Ne=V,Ae=X,Ee=J,we=Q,Se=Z,xe=null,_e=C({},[].concat(a(I),a(F),a(U),a(H),a(P))),ke=null,Oe=C({},[].concat(a(B),a(G),a(W),a(q))),De=Object.seal(Object.create(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Re=null,Ce=null,Le=!0,Me=!0,Ie=!1,Fe=!0,Ue=!1,ze=!1,He=!1,je=!1,Pe=!1,Be=!1,Ge=!1,We=!0,qe=!1,Ye="user-content-",$e=!0,Ke=!1,Ve={},Xe=null,Ze=C({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Je=null,Qe=C({},["audio","video","img","source","image","track"]),et=null,tt=C({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),nt="http://www.w3.org/1998/Math/MathML",rt="http://www.w3.org/2000/svg",ot="http://www.w3.org/1999/xhtml",at=ot,it=!1,lt=null,ct=C({},[nt,rt,ot],w),ut=["application/xhtml+xml","text/html"],st="text/html",ft=null,mt=i.createElement("form"),pt=function(e){return e instanceof RegExp||e instanceof Function},dt=function(t){ft&&ft===t||(t&&"object"===e(t)||(t={}),t=L(t),ye=ye=-1===ut.indexOf(t.PARSER_MEDIA_TYPE)?st:t.PARSER_MEDIA_TYPE,ge="application/xhtml+xml"===ye?w:E,xe="ALLOWED_TAGS"in t?C({},t.ALLOWED_TAGS,ge):_e,ke="ALLOWED_ATTR"in t?C({},t.ALLOWED_ATTR,ge):Oe,lt="ALLOWED_NAMESPACES"in t?C({},t.ALLOWED_NAMESPACES,w):ct,et="ADD_URI_SAFE_ATTR"in t?C(L(tt),t.ADD_URI_SAFE_ATTR,ge):tt,Je="ADD_DATA_URI_TAGS"in t?C(L(Qe),t.ADD_DATA_URI_TAGS,ge):Qe,Xe="FORBID_CONTENTS"in t?C({},t.FORBID_CONTENTS,ge):Ze,Re="FORBID_TAGS"in t?C({},t.FORBID_TAGS,ge):{},Ce="FORBID_ATTR"in t?C({},t.FORBID_ATTR,ge):{},Ve="USE_PROFILES"in t&&t.USE_PROFILES,Le=!1!==t.ALLOW_ARIA_ATTR,Me=!1!==t.ALLOW_DATA_ATTR,Ie=t.ALLOW_UNKNOWN_PROTOCOLS||!1,Fe=!1!==t.ALLOW_SELF_CLOSE_IN_ATTR,Ue=t.SAFE_FOR_TEMPLATES||!1,ze=t.WHOLE_DOCUMENT||!1,Pe=t.RETURN_DOM||!1,Be=t.RETURN_DOM_FRAGMENT||!1,Ge=t.RETURN_TRUSTED_TYPE||!1,je=t.FORCE_BODY||!1,We=!1!==t.SANITIZE_DOM,qe=t.SANITIZE_NAMED_PROPS||!1,$e=!1!==t.KEEP_CONTENT,Ke=t.IN_PLACE||!1,Se=t.ALLOWED_URI_REGEXP||Se,at=t.NAMESPACE||ot,t.CUSTOM_ELEMENT_HANDLING&&pt(t.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(De.tagNameCheck=t.CUSTOM_ELEMENT_HANDLING.tagNameCheck),t.CUSTOM_ELEMENT_HANDLING&&pt(t.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(De.attributeNameCheck=t.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),t.CUSTOM_ELEMENT_HANDLING&&"boolean"==typeof t.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements&&(De.allowCustomizedBuiltInElements=t.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ue&&(Me=!1),Be&&(Pe=!0),Ve&&(xe=C({},a(P)),ke=[],!0===Ve.html&&(C(xe,I),C(ke,B)),!0===Ve.svg&&(C(xe,F),C(ke,G),C(ke,q)),!0===Ve.svgFilters&&(C(xe,U),C(ke,G),C(ke,q)),!0===Ve.mathMl&&(C(xe,H),C(ke,W),C(ke,q))),t.ADD_TAGS&&(xe===_e&&(xe=L(xe)),C(xe,t.ADD_TAGS,ge)),t.ADD_ATTR&&(ke===Oe&&(ke=L(ke)),C(ke,t.ADD_ATTR,ge)),t.ADD_URI_SAFE_ATTR&&C(et,t.ADD_URI_SAFE_ATTR,ge),t.FORBID_CONTENTS&&(Xe===Ze&&(Xe=L(Xe)),C(Xe,t.FORBID_CONTENTS,ge)),$e&&(xe["#text"]=!0),ze&&C(xe,["html","head","body"]),xe.table&&(C(xe,["tbody"]),delete Re.tbody),p&&p(t),ft=t);},ht=C({},["mi","mo","mn","ms","mtext"]),yt=C({},["foreignobject","desc","title","annotation-xml"]),gt=C({},["title","style","font","a","script"]),bt=C({},F);C(bt,U),C(bt,z);var vt=C({},H);C(vt,j);var Tt=function(e){var t=ae(e);t&&t.tagName||(t={namespaceURI:at,tagName:"template"});var n=E(e.tagName),r=E(t.tagName);return !!lt[e.namespaceURI]&&(e.namespaceURI===rt?t.namespaceURI===ot?"svg"===n:t.namespaceURI===nt?"svg"===n&&("annotation-xml"===r||ht[r]):Boolean(bt[n]):e.namespaceURI===nt?t.namespaceURI===ot?"math"===n:t.namespaceURI===rt?"math"===n&&yt[r]:Boolean(vt[n]):e.namespaceURI===ot?!(t.namespaceURI===rt&&!yt[r])&&(!(t.namespaceURI===nt&&!ht[r])&&(!vt[n]&&(gt[n]||!bt[n]))):!("application/xhtml+xml"!==ye||!lt[e.namespaceURI]))},Nt=function(e){A(r.removed,{element:e});try{e.parentNode.removeChild(e);}catch(t){e.remove();}},At=function(e,t){try{A(r.removed,{attribute:t.getAttributeNode(e),from:t});}catch(e){A(r.removed,{attribute:null,from:t});}if(t.removeAttribute(e),"is"===e&&!ke[e])if(Pe||Be)try{Nt(t);}catch(e){}else try{t.setAttribute(e,"");}catch(e){}},Et=function(e){var t,n;if(je)e="<remove></remove>"+e;else {var r=S(e,/^[\r\n\t ]+/);n=r&&r[0];}"application/xhtml+xml"===ye&&at===ot&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");var o=le?le.createHTML(e):e;if(at===ot)try{t=(new g).parseFromString(o,ye);}catch(e){}if(!t||!t.documentElement){t=se.createDocument(at,"template",null);try{t.documentElement.innerHTML=it?ce:o;}catch(e){}}var a=t.body||t.documentElement;return e&&n&&a.insertBefore(i.createTextNode(n),a.childNodes[0]||null),at===ot?pe.call(t,ze?"html":"body")[0]:ze?t.documentElement:a},wt=function(e){return fe.call(e.ownerDocument||e,e,m.SHOW_ELEMENT|m.SHOW_COMMENT|m.SHOW_TEXT,null,!1)},St=function(e){return e instanceof y&&("string"!=typeof e.nodeName||"string"!=typeof e.textContent||"function"!=typeof e.removeChild||!(e.attributes instanceof h)||"function"!=typeof e.removeAttribute||"function"!=typeof e.setAttribute||"string"!=typeof e.namespaceURI||"function"!=typeof e.insertBefore||"function"!=typeof e.hasChildNodes)},xt=function(t){return "object"===e(s)?t instanceof s:t&&"object"===e(t)&&"number"==typeof t.nodeType&&"string"==typeof t.nodeName},_t=function(e,t,n){he[e]&&T(he[e],(function(e){e.call(r,t,n,ft);}));},kt=function(e){var t;if(_t("beforeSanitizeElements",e,null),St(e))return Nt(e),!0;var n=ge(e.nodeName);if(_t("uponSanitizeElement",e,{tagName:n,allowedTags:xe}),e.hasChildNodes()&&!xt(e.firstElementChild)&&(!xt(e.content)||!xt(e.content.firstElementChild))&&O(/<[/\w]/g,e.innerHTML)&&O(/<[/\w]/g,e.textContent))return Nt(e),!0;if(!xe[n]||Re[n]){if(!Re[n]&&Dt(n)){if(De.tagNameCheck instanceof RegExp&&O(De.tagNameCheck,n))return !1;if(De.tagNameCheck instanceof Function&&De.tagNameCheck(n))return !1}if($e&&!Xe[n]){var o=ae(e)||e.parentNode,a=oe(e)||e.childNodes;if(a&&o)for(var i=a.length-1;i>=0;--i)o.insertBefore(R(a[i],!0),re(e));}return Nt(e),!0}return e instanceof f&&!Tt(e)?(Nt(e),!0):"noscript"!==n&&"noembed"!==n||!O(/<\/no(script|embed)/i,e.innerHTML)?(Ue&&3===e.nodeType&&(t=e.textContent,t=x(t,be," "),t=x(t,ve," "),t=x(t,Te," "),e.textContent!==t&&(A(r.removed,{element:e.cloneNode()}),e.textContent=t)),_t("afterSanitizeElements",e,null),!1):(Nt(e),!0)},Ot=function(e,t,n){if(We&&("id"===t||"name"===t)&&(n in i||n in mt))return !1;if(Me&&!Ce[t]&&O(Ne,t));else if(Le&&O(Ae,t));else if(!ke[t]||Ce[t]){if(!(Dt(e)&&(De.tagNameCheck instanceof RegExp&&O(De.tagNameCheck,e)||De.tagNameCheck instanceof Function&&De.tagNameCheck(e))&&(De.attributeNameCheck instanceof RegExp&&O(De.attributeNameCheck,t)||De.attributeNameCheck instanceof Function&&De.attributeNameCheck(t))||"is"===t&&De.allowCustomizedBuiltInElements&&(De.tagNameCheck instanceof RegExp&&O(De.tagNameCheck,n)||De.tagNameCheck instanceof Function&&De.tagNameCheck(n))))return !1}else if(et[t]);else if(O(Se,x(n,we,"")));else if("src"!==t&&"xlink:href"!==t&&"href"!==t||"script"===e||0!==_(n,"data:")||!Je[e]){if(Ie&&!O(Ee,x(n,we,"")));else if(n)return !1}else;return !0},Dt=function(e){return e.indexOf("-")>0},Rt=function(t){var n,o,a,i;_t("beforeSanitizeAttributes",t,null);var l=t.attributes;if(l){var c={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ke};for(i=l.length;i--;){var u=n=l[i],s=u.name,f=u.namespaceURI;if(o="value"===s?n.value:k(n.value),a=ge(s),c.attrName=a,c.attrValue=o,c.keepAttr=!0,c.forceKeepAttr=void 0,_t("uponSanitizeAttribute",t,c),o=c.attrValue,!c.forceKeepAttr&&(At(s,t),c.keepAttr))if(Fe||!O(/\/>/i,o)){Ue&&(o=x(o,be," "),o=x(o,ve," "),o=x(o,Te," "));var m=ge(t.nodeName);if(Ot(m,a,o)){if(!qe||"id"!==a&&"name"!==a||(At(s,t),o=Ye+o),le&&"object"===e(b)&&"function"==typeof b.getAttributeType)if(f);else switch(b.getAttributeType(m,a)){case"TrustedHTML":o=le.createHTML(o);break;case"TrustedScriptURL":o=le.createScriptURL(o);}try{f?t.setAttributeNS(f,s,o):t.setAttribute(s,o),N(r.removed);}catch(e){}}}else At(s,t);}_t("afterSanitizeAttributes",t,null);}},Ct=function e(t){var n,r=wt(t);for(_t("beforeSanitizeShadowDOM",t,null);n=r.nextNode();)_t("uponSanitizeShadowNode",n,null),kt(n)||(n.content instanceof l&&e(n.content),Rt(n));_t("afterSanitizeShadowDOM",t,null);};return r.sanitize=function(e){var t,n,a,i,c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if((it=!e)&&(e="\x3c!--\x3e"),"string"!=typeof e&&!xt(e)){if("function"!=typeof e.toString)throw D("toString is not a function");if("string"!=typeof(e=e.toString()))throw D("dirty is not a string, aborting")}if(!r.isSupported)return e;if(He||dt(c),r.removed=[],"string"==typeof e&&(Ke=!1),Ke){if(e.nodeName){var u=ge(e.nodeName);if(!xe[u]||Re[u])throw D("root node is forbidden and cannot be sanitized in-place")}}else if(e instanceof s)1===(n=(t=Et("\x3c!----\x3e")).ownerDocument.importNode(e,!0)).nodeType&&"BODY"===n.nodeName||"HTML"===n.nodeName?t=n:t.appendChild(n);else {if(!Pe&&!Ue&&!ze&&-1===e.indexOf("<"))return le&&Ge?le.createHTML(e):e;if(!(t=Et(e)))return Pe?null:Ge?ce:""}t&&je&&Nt(t.firstChild);for(var f=wt(Ke?e:t);a=f.nextNode();)kt(a)||(a.content instanceof l&&Ct(a.content),Rt(a));if(Ke)return e;if(Pe){if(Be)for(i=me.call(t.ownerDocument);t.firstChild;)i.appendChild(t.firstChild);else i=t;return (ke.shadowroot||ke.shadowrootmod)&&(i=de.call(o,i,!0)),i}var m=ze?t.outerHTML:t.innerHTML;return ze&&xe["!doctype"]&&t.ownerDocument&&t.ownerDocument.doctype&&t.ownerDocument.doctype.name&&O(ee,t.ownerDocument.doctype.name)&&(m="<!DOCTYPE "+t.ownerDocument.doctype.name+">\n"+m),Ue&&(m=x(m,be," "),m=x(m,ve," "),m=x(m,Te," ")),le&&Ge?le.createHTML(m):m},r.setConfig=function(e){dt(e),He=!0;},r.clearConfig=function(){ft=null,He=!1;},r.isValidAttribute=function(e,t,n){ft||dt({});var r=ge(e),o=ge(t);return Ot(r,o,n)},r.addHook=function(e,t){"function"==typeof t&&(he[e]=he[e]||[],A(he[e],t));},r.removeHook=function(e){if(he[e])return N(he[e])},r.removeHooks=function(e){he[e]&&(he[e]=[]);},r.removeAllHooks=function(){he={};},r}();return re}));

  /*global define:false */
  /**
   * Copyright 2012-2017 Craig Campbell
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
   * Mousetrap is a simple keyboard shortcut library for Javascript with
   * no external dependencies
   *
   * @version 1.6.5
   * @url craig.is/killing/mice
   */
   (function(window, document, undefined$1) {

      // Check if mousetrap is used inside browser, if not, return
      if (!window) {
          return;
      }

      /**
       * mapping of special keycodes to their corresponding keys
       *
       * everything in this dictionary cannot use keypress events
       * so it has to be here to map to the correct keycodes for
       * keyup/keydown events
       *
       * @type {Object}
       */
      var _MAP = {
          8: 'backspace',
          9: 'tab',
          13: 'enter',
          16: 'shift',
          17: 'ctrl',
          18: 'alt',
          20: 'capslock',
          27: 'esc',
          32: 'space',
          33: 'pageup',
          34: 'pagedown',
          35: 'end',
          36: 'home',
          37: 'left',
          38: 'up',
          39: 'right',
          40: 'down',
          45: 'ins',
          46: 'del',
          91: 'meta',
          93: 'meta',
          224: 'meta'
      };

      /**
       * mapping for special characters so they can support
       *
       * this dictionary is only used incase you want to bind a
       * keyup or keydown event to one of these keys
       *
       * @type {Object}
       */
      var _KEYCODE_MAP = {
          106: '*',
          107: '+',
          109: '-',
          110: '.',
          111 : '/',
          186: ';',
          187: '=',
          188: ',',
          189: '-',
          190: '.',
          191: '/',
          192: '`',
          219: '[',
          220: '\\',
          221: ']',
          222: '\''
      };

      /**
       * this is a mapping of keys that require shift on a US keypad
       * back to the non shift equivelents
       *
       * this is so you can use keyup events with these keys
       *
       * note that this will only work reliably on US keyboards
       *
       * @type {Object}
       */
      var _SHIFT_MAP = {
          '~': '`',
          '!': '1',
          '@': '2',
          '#': '3',
          '$': '4',
          '%': '5',
          '^': '6',
          '&': '7',
          '*': '8',
          '(': '9',
          ')': '0',
          '_': '-',
          '+': '=',
          ':': ';',
          '\"': '\'',
          '<': ',',
          '>': '.',
          '?': '/',
          '|': '\\'
      };

      /**
       * this is a list of special strings you can use to map
       * to modifier keys when you specify your keyboard shortcuts
       *
       * @type {Object}
       */
      var _SPECIAL_ALIASES = {
          'option': 'alt',
          'command': 'meta',
          'return': 'enter',
          'escape': 'esc',
          'plus': '+',
          'mod': /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'meta' : 'ctrl'
      };

      /**
       * variable to store the flipped version of _MAP from above
       * needed to check if we should use keypress or not when no action
       * is specified
       *
       * @type {Object|undefined}
       */
      var _REVERSE_MAP;

      /**
       * loop through the f keys, f1 to f19 and add them to the map
       * programatically
       */
      for (var i = 1; i < 20; ++i) {
          _MAP[111 + i] = 'f' + i;
      }

      /**
       * loop through to map numbers on the numeric keypad
       */
      for (i = 0; i <= 9; ++i) {

          // This needs to use a string cause otherwise since 0 is falsey
          // mousetrap will never fire for numpad 0 pressed as part of a keydown
          // event.
          //
          // @see https://github.com/ccampbell/mousetrap/pull/258
          _MAP[i + 96] = i.toString();
      }

      /**
       * cross browser add event method
       *
       * @param {Element|HTMLDocument} object
       * @param {string} type
       * @param {Function} callback
       * @returns void
       */
      function _addEvent(object, type, callback) {
          if (object.addEventListener) {
              object.addEventListener(type, callback, false);
              return;
          }

          object.attachEvent('on' + type, callback);
      }

      /**
       * takes the event and returns the key character
       *
       * @param {Event} e
       * @return {string}
       */
      function _characterFromEvent(e) {

          // for keypress events we should return the character as is
          if (e.type == 'keypress') {
              var character = String.fromCharCode(e.which);

              // if the shift key is not pressed then it is safe to assume
              // that we want the character to be lowercase.  this means if
              // you accidentally have caps lock on then your key bindings
              // will continue to work
              //
              // the only side effect that might not be desired is if you
              // bind something like 'A' cause you want to trigger an
              // event when capital A is pressed caps lock will no longer
              // trigger the event.  shift+a will though.
              if (!e.shiftKey) {
                  character = character.toLowerCase();
              }

              return character;
          }

          // for non keypress events the special maps are needed
          if (_MAP[e.which]) {
              return _MAP[e.which];
          }

          if (_KEYCODE_MAP[e.which]) {
              return _KEYCODE_MAP[e.which];
          }

          // if it is not in the special map

          // with keydown and keyup events the character seems to always
          // come in as an uppercase character whether you are pressing shift
          // or not.  we should make sure it is always lowercase for comparisons
          return String.fromCharCode(e.which).toLowerCase();
      }

      /**
       * checks if two arrays are equal
       *
       * @param {Array} modifiers1
       * @param {Array} modifiers2
       * @returns {boolean}
       */
      function _modifiersMatch(modifiers1, modifiers2) {
          return modifiers1.sort().join(',') === modifiers2.sort().join(',');
      }

      /**
       * takes a key event and figures out what the modifiers are
       *
       * @param {Event} e
       * @returns {Array}
       */
      function _eventModifiers(e) {
          var modifiers = [];

          if (e.shiftKey) {
              modifiers.push('shift');
          }

          if (e.altKey) {
              modifiers.push('alt');
          }

          if (e.ctrlKey) {
              modifiers.push('ctrl');
          }

          if (e.metaKey) {
              modifiers.push('meta');
          }

          return modifiers;
      }

      /**
       * prevents default for this event
       *
       * @param {Event} e
       * @returns void
       */
      function _preventDefault(e) {
          if (e.preventDefault) {
              e.preventDefault();
              return;
          }

          e.returnValue = false;
      }

      /**
       * stops propogation for this event
       *
       * @param {Event} e
       * @returns void
       */
      function _stopPropagation(e) {
          if (e.stopPropagation) {
              e.stopPropagation();
              return;
          }

          e.cancelBubble = true;
      }

      /**
       * determines if the keycode specified is a modifier key or not
       *
       * @param {string} key
       * @returns {boolean}
       */
      function _isModifier(key) {
          return key == 'shift' || key == 'ctrl' || key == 'alt' || key == 'meta';
      }

      /**
       * reverses the map lookup so that we can look for specific keys
       * to see what can and can't use keypress
       *
       * @return {Object}
       */
      function _getReverseMap() {
          if (!_REVERSE_MAP) {
              _REVERSE_MAP = {};
              for (var key in _MAP) {

                  // pull out the numeric keypad from here cause keypress should
                  // be able to detect the keys from the character
                  if (key > 95 && key < 112) {
                      continue;
                  }

                  if (_MAP.hasOwnProperty(key)) {
                      _REVERSE_MAP[_MAP[key]] = key;
                  }
              }
          }
          return _REVERSE_MAP;
      }

      /**
       * picks the best action based on the key combination
       *
       * @param {string} key - character for key
       * @param {Array} modifiers
       * @param {string=} action passed in
       */
      function _pickBestAction(key, modifiers, action) {

          // if no action was picked in we should try to pick the one
          // that we think would work best for this key
          if (!action) {
              action = _getReverseMap()[key] ? 'keydown' : 'keypress';
          }

          // modifier keys don't work as expected with keypress,
          // switch to keydown
          if (action == 'keypress' && modifiers.length) {
              action = 'keydown';
          }

          return action;
      }

      /**
       * Converts from a string key combination to an array
       *
       * @param  {string} combination like "command+shift+l"
       * @return {Array}
       */
      function _keysFromString(combination) {
          if (combination === '+') {
              return ['+'];
          }

          combination = combination.replace(/\+{2}/g, '+plus');
          return combination.split('+');
      }

      /**
       * Gets info for a specific key combination
       *
       * @param  {string} combination key combination ("command+s" or "a" or "*")
       * @param  {string=} action
       * @returns {Object}
       */
      function _getKeyInfo(combination, action) {
          var keys;
          var key;
          var i;
          var modifiers = [];

          // take the keys from this pattern and figure out what the actual
          // pattern is all about
          keys = _keysFromString(combination);

          for (i = 0; i < keys.length; ++i) {
              key = keys[i];

              // normalize key names
              if (_SPECIAL_ALIASES[key]) {
                  key = _SPECIAL_ALIASES[key];
              }

              // if this is not a keypress event then we should
              // be smart about using shift keys
              // this will only work for US keyboards however
              if (action && action != 'keypress' && _SHIFT_MAP[key]) {
                  key = _SHIFT_MAP[key];
                  modifiers.push('shift');
              }

              // if this key is a modifier then add it to the list of modifiers
              if (_isModifier(key)) {
                  modifiers.push(key);
              }
          }

          // depending on what the key combination is
          // we will try to pick the best event for it
          action = _pickBestAction(key, modifiers, action);

          return {
              key: key,
              modifiers: modifiers,
              action: action
          };
      }

      function _belongsTo(element, ancestor) {
          if (element === null || element === document) {
              return false;
          }

          if (element === ancestor) {
              return true;
          }

          return _belongsTo(element.parentNode, ancestor);
      }

      function Mousetrap(targetElement) {
          var self = this;

          targetElement = targetElement || document;

          if (!(self instanceof Mousetrap)) {
              return new Mousetrap(targetElement);
          }

          /**
           * element to attach key events to
           *
           * @type {Element}
           */
          self.target = targetElement;

          /**
           * a list of all the callbacks setup via Mousetrap.bind()
           *
           * @type {Object}
           */
          self._callbacks = {};

          /**
           * direct map of string combinations to callbacks used for trigger()
           *
           * @type {Object}
           */
          self._directMap = {};

          /**
           * keeps track of what level each sequence is at since multiple
           * sequences can start out with the same sequence
           *
           * @type {Object}
           */
          var _sequenceLevels = {};

          /**
           * variable to store the setTimeout call
           *
           * @type {null|number}
           */
          var _resetTimer;

          /**
           * temporary state where we will ignore the next keyup
           *
           * @type {boolean|string}
           */
          var _ignoreNextKeyup = false;

          /**
           * temporary state where we will ignore the next keypress
           *
           * @type {boolean}
           */
          var _ignoreNextKeypress = false;

          /**
           * are we currently inside of a sequence?
           * type of action ("keyup" or "keydown" or "keypress") or false
           *
           * @type {boolean|string}
           */
          var _nextExpectedAction = false;

          /**
           * resets all sequence counters except for the ones passed in
           *
           * @param {Object} doNotReset
           * @returns void
           */
          function _resetSequences(doNotReset) {
              doNotReset = doNotReset || {};

              var activeSequences = false,
                  key;

              for (key in _sequenceLevels) {
                  if (doNotReset[key]) {
                      activeSequences = true;
                      continue;
                  }
                  _sequenceLevels[key] = 0;
              }

              if (!activeSequences) {
                  _nextExpectedAction = false;
              }
          }

          /**
           * finds all callbacks that match based on the keycode, modifiers,
           * and action
           *
           * @param {string} character
           * @param {Array} modifiers
           * @param {Event|Object} e
           * @param {string=} sequenceName - name of the sequence we are looking for
           * @param {string=} combination
           * @param {number=} level
           * @returns {Array}
           */
          function _getMatches(character, modifiers, e, sequenceName, combination, level) {
              var i;
              var callback;
              var matches = [];
              var action = e.type;

              // if there are no events related to this keycode
              if (!self._callbacks[character]) {
                  return [];
              }

              // if a modifier key is coming up on its own we should allow it
              if (action == 'keyup' && _isModifier(character)) {
                  modifiers = [character];
              }

              // loop through all callbacks for the key that was pressed
              // and see if any of them match
              for (i = 0; i < self._callbacks[character].length; ++i) {
                  callback = self._callbacks[character][i];

                  // if a sequence name is not specified, but this is a sequence at
                  // the wrong level then move onto the next match
                  if (!sequenceName && callback.seq && _sequenceLevels[callback.seq] != callback.level) {
                      continue;
                  }

                  // if the action we are looking for doesn't match the action we got
                  // then we should keep going
                  if (action != callback.action) {
                      continue;
                  }

                  // if this is a keypress event and the meta key and control key
                  // are not pressed that means that we need to only look at the
                  // character, otherwise check the modifiers as well
                  //
                  // chrome will not fire a keypress if meta or control is down
                  // safari will fire a keypress if meta or meta+shift is down
                  // firefox will fire a keypress if meta or control is down
                  if ((action == 'keypress' && !e.metaKey && !e.ctrlKey) || _modifiersMatch(modifiers, callback.modifiers)) {

                      // when you bind a combination or sequence a second time it
                      // should overwrite the first one.  if a sequenceName or
                      // combination is specified in this call it does just that
                      //
                      // @todo make deleting its own method?
                      var deleteCombo = !sequenceName && callback.combo == combination;
                      var deleteSequence = sequenceName && callback.seq == sequenceName && callback.level == level;
                      if (deleteCombo || deleteSequence) {
                          self._callbacks[character].splice(i, 1);
                      }

                      matches.push(callback);
                  }
              }

              return matches;
          }

          /**
           * actually calls the callback function
           *
           * if your callback function returns false this will use the jquery
           * convention - prevent default and stop propogation on the event
           *
           * @param {Function} callback
           * @param {Event} e
           * @returns void
           */
          function _fireCallback(callback, e, combo, sequence) {

              // if this event should not happen stop here
              if (self.stopCallback(e, e.target || e.srcElement, combo, sequence)) {
                  return;
              }

              if (callback(e, combo) === false) {
                  _preventDefault(e);
                  _stopPropagation(e);
              }
          }

          /**
           * handles a character key event
           *
           * @param {string} character
           * @param {Array} modifiers
           * @param {Event} e
           * @returns void
           */
          self._handleKey = function(character, modifiers, e) {
              var callbacks = _getMatches(character, modifiers, e);
              var i;
              var doNotReset = {};
              var maxLevel = 0;
              var processedSequenceCallback = false;

              // Calculate the maxLevel for sequences so we can only execute the longest callback sequence
              for (i = 0; i < callbacks.length; ++i) {
                  if (callbacks[i].seq) {
                      maxLevel = Math.max(maxLevel, callbacks[i].level);
                  }
              }

              // loop through matching callbacks for this key event
              for (i = 0; i < callbacks.length; ++i) {

                  // fire for all sequence callbacks
                  // this is because if for example you have multiple sequences
                  // bound such as "g i" and "g t" they both need to fire the
                  // callback for matching g cause otherwise you can only ever
                  // match the first one
                  if (callbacks[i].seq) {

                      // only fire callbacks for the maxLevel to prevent
                      // subsequences from also firing
                      //
                      // for example 'a option b' should not cause 'option b' to fire
                      // even though 'option b' is part of the other sequence
                      //
                      // any sequences that do not match here will be discarded
                      // below by the _resetSequences call
                      if (callbacks[i].level != maxLevel) {
                          continue;
                      }

                      processedSequenceCallback = true;

                      // keep a list of which sequences were matches for later
                      doNotReset[callbacks[i].seq] = 1;
                      _fireCallback(callbacks[i].callback, e, callbacks[i].combo, callbacks[i].seq);
                      continue;
                  }

                  // if there were no sequence matches but we are still here
                  // that means this is a regular match so we should fire that
                  if (!processedSequenceCallback) {
                      _fireCallback(callbacks[i].callback, e, callbacks[i].combo);
                  }
              }

              // if the key you pressed matches the type of sequence without
              // being a modifier (ie "keyup" or "keypress") then we should
              // reset all sequences that were not matched by this event
              //
              // this is so, for example, if you have the sequence "h a t" and you
              // type "h e a r t" it does not match.  in this case the "e" will
              // cause the sequence to reset
              //
              // modifier keys are ignored because you can have a sequence
              // that contains modifiers such as "enter ctrl+space" and in most
              // cases the modifier key will be pressed before the next key
              //
              // also if you have a sequence such as "ctrl+b a" then pressing the
              // "b" key will trigger a "keypress" and a "keydown"
              //
              // the "keydown" is expected when there is a modifier, but the
              // "keypress" ends up matching the _nextExpectedAction since it occurs
              // after and that causes the sequence to reset
              //
              // we ignore keypresses in a sequence that directly follow a keydown
              // for the same character
              var ignoreThisKeypress = e.type == 'keypress' && _ignoreNextKeypress;
              if (e.type == _nextExpectedAction && !_isModifier(character) && !ignoreThisKeypress) {
                  _resetSequences(doNotReset);
              }

              _ignoreNextKeypress = processedSequenceCallback && e.type == 'keydown';
          };

          /**
           * handles a keydown event
           *
           * @param {Event} e
           * @returns void
           */
          function _handleKeyEvent(e) {

              // normalize e.which for key events
              // @see http://stackoverflow.com/questions/4285627/javascript-keycode-vs-charcode-utter-confusion
              if (typeof e.which !== 'number') {
                  e.which = e.keyCode;
              }

              var character = _characterFromEvent(e);

              // no character found then stop
              if (!character) {
                  return;
              }

              // need to use === for the character check because the character can be 0
              if (e.type == 'keyup' && _ignoreNextKeyup === character) {
                  _ignoreNextKeyup = false;
                  return;
              }

              self.handleKey(character, _eventModifiers(e), e);
          }

          /**
           * called to set a 1 second timeout on the specified sequence
           *
           * this is so after each key press in the sequence you have 1 second
           * to press the next key before you have to start over
           *
           * @returns void
           */
          function _resetSequenceTimer() {
              clearTimeout(_resetTimer);
              _resetTimer = setTimeout(_resetSequences, 1000);
          }

          /**
           * binds a key sequence to an event
           *
           * @param {string} combo - combo specified in bind call
           * @param {Array} keys
           * @param {Function} callback
           * @param {string=} action
           * @returns void
           */
          function _bindSequence(combo, keys, callback, action) {

              // start off by adding a sequence level record for this combination
              // and setting the level to 0
              _sequenceLevels[combo] = 0;

              /**
               * callback to increase the sequence level for this sequence and reset
               * all other sequences that were active
               *
               * @param {string} nextAction
               * @returns {Function}
               */
              function _increaseSequence(nextAction) {
                  return function() {
                      _nextExpectedAction = nextAction;
                      ++_sequenceLevels[combo];
                      _resetSequenceTimer();
                  };
              }

              /**
               * wraps the specified callback inside of another function in order
               * to reset all sequence counters as soon as this sequence is done
               *
               * @param {Event} e
               * @returns void
               */
              function _callbackAndReset(e) {
                  _fireCallback(callback, e, combo);

                  // we should ignore the next key up if the action is key down
                  // or keypress.  this is so if you finish a sequence and
                  // release the key the final key will not trigger a keyup
                  if (action !== 'keyup') {
                      _ignoreNextKeyup = _characterFromEvent(e);
                  }

                  // weird race condition if a sequence ends with the key
                  // another sequence begins with
                  setTimeout(_resetSequences, 10);
              }

              // loop through keys one at a time and bind the appropriate callback
              // function.  for any key leading up to the final one it should
              // increase the sequence. after the final, it should reset all sequences
              //
              // if an action is specified in the original bind call then that will
              // be used throughout.  otherwise we will pass the action that the
              // next key in the sequence should match.  this allows a sequence
              // to mix and match keypress and keydown events depending on which
              // ones are better suited to the key provided
              for (var i = 0; i < keys.length; ++i) {
                  var isFinal = i + 1 === keys.length;
                  var wrappedCallback = isFinal ? _callbackAndReset : _increaseSequence(action || _getKeyInfo(keys[i + 1]).action);
                  _bindSingle(keys[i], wrappedCallback, action, combo, i);
              }
          }

          /**
           * binds a single keyboard combination
           *
           * @param {string} combination
           * @param {Function} callback
           * @param {string=} action
           * @param {string=} sequenceName - name of sequence if part of sequence
           * @param {number=} level - what part of the sequence the command is
           * @returns void
           */
          function _bindSingle(combination, callback, action, sequenceName, level) {

              // store a direct mapped reference for use with Mousetrap.trigger
              self._directMap[combination + ':' + action] = callback;

              // make sure multiple spaces in a row become a single space
              combination = combination.replace(/\s+/g, ' ');

              var sequence = combination.split(' ');
              var info;

              // if this pattern is a sequence of keys then run through this method
              // to reprocess each pattern one key at a time
              if (sequence.length > 1) {
                  _bindSequence(combination, sequence, callback, action);
                  return;
              }

              info = _getKeyInfo(combination, action);

              // make sure to initialize array if this is the first time
              // a callback is added for this key
              self._callbacks[info.key] = self._callbacks[info.key] || [];

              // remove an existing match if there is one
              _getMatches(info.key, info.modifiers, {type: info.action}, sequenceName, combination, level);

              // add this call back to the array
              // if it is a sequence put it at the beginning
              // if not put it at the end
              //
              // this is important because the way these are processed expects
              // the sequence ones to come first
              self._callbacks[info.key][sequenceName ? 'unshift' : 'push']({
                  callback: callback,
                  modifiers: info.modifiers,
                  action: info.action,
                  seq: sequenceName,
                  level: level,
                  combo: combination
              });
          }

          /**
           * binds multiple combinations to the same callback
           *
           * @param {Array} combinations
           * @param {Function} callback
           * @param {string|undefined} action
           * @returns void
           */
          self._bindMultiple = function(combinations, callback, action) {
              for (var i = 0; i < combinations.length; ++i) {
                  _bindSingle(combinations[i], callback, action);
              }
          };

          // start!
          _addEvent(targetElement, 'keypress', _handleKeyEvent);
          _addEvent(targetElement, 'keydown', _handleKeyEvent);
          _addEvent(targetElement, 'keyup', _handleKeyEvent);
      }

      /**
       * binds an event to mousetrap
       *
       * can be a single key, a combination of keys separated with +,
       * an array of keys, or a sequence of keys separated by spaces
       *
       * be sure to list the modifier keys first to make sure that the
       * correct key ends up getting bound (the last key in the pattern)
       *
       * @param {string|Array} keys
       * @param {Function} callback
       * @param {string=} action - 'keypress', 'keydown', or 'keyup'
       * @returns void
       */
      Mousetrap.prototype.bind = function(keys, callback, action) {
          var self = this;
          keys = keys instanceof Array ? keys : [keys];
          self._bindMultiple.call(self, keys, callback, action);
          return self;
      };

      /**
       * unbinds an event to mousetrap
       *
       * the unbinding sets the callback function of the specified key combo
       * to an empty function and deletes the corresponding key in the
       * _directMap dict.
       *
       * TODO: actually remove this from the _callbacks dictionary instead
       * of binding an empty function
       *
       * the keycombo+action has to be exactly the same as
       * it was defined in the bind method
       *
       * @param {string|Array} keys
       * @param {string} action
       * @returns void
       */
      Mousetrap.prototype.unbind = function(keys, action) {
          var self = this;
          return self.bind.call(self, keys, function() {}, action);
      };

      /**
       * triggers an event that has already been bound
       *
       * @param {string} keys
       * @param {string=} action
       * @returns void
       */
      Mousetrap.prototype.trigger = function(keys, action) {
          var self = this;
          if (self._directMap[keys + ':' + action]) {
              self._directMap[keys + ':' + action]({}, keys);
          }
          return self;
      };

      /**
       * resets the library back to its initial state.  this is useful
       * if you want to clear out the current keyboard shortcuts and bind
       * new ones - for example if you switch to another page
       *
       * @returns void
       */
      Mousetrap.prototype.reset = function() {
          var self = this;
          self._callbacks = {};
          self._directMap = {};
          return self;
      };

      /**
       * should we stop this event before firing off callbacks
       *
       * @param {Event} e
       * @param {Element} element
       * @return {boolean}
       */
      Mousetrap.prototype.stopCallback = function(e, element) {
          var self = this;

          // if the element has the class "mousetrap" then no need to stop
          if ((' ' + element.className + ' ').indexOf(' mousetrap ') > -1) {
              return false;
          }

          if (_belongsTo(element, self.target)) {
              return false;
          }

          // Events originating from a shadow DOM are re-targetted and `e.target` is the shadow host,
          // not the initial event target in the shadow tree. Note that not all events cross the
          // shadow boundary.
          // For shadow trees with `mode: 'open'`, the initial event target is the first element in
          // the event’s composed path. For shadow trees with `mode: 'closed'`, the initial event
          // target cannot be obtained.
          if ('composedPath' in e && typeof e.composedPath === 'function') {
              // For open shadow trees, update `element` so that the following check works.
              var initialEventTarget = e.composedPath()[0];
              if (initialEventTarget !== e.target) {
                  element = initialEventTarget;
              }
          }

          // stop for input, select, and textarea
          return element.tagName == 'INPUT' || element.tagName == 'SELECT' || element.tagName == 'TEXTAREA' || element.isContentEditable;
      };

      /**
       * exposes _handleKey publicly so it can be overwritten by extensions
       */
      Mousetrap.prototype.handleKey = function() {
          var self = this;
          return self._handleKey.apply(self, arguments);
      };

      /**
       * allow custom key mappings
       */
      Mousetrap.addKeycodes = function(object) {
          for (var key in object) {
              if (object.hasOwnProperty(key)) {
                  _MAP[key] = object[key];
              }
          }
          _REVERSE_MAP = null;
      };

      /**
       * Init the global mousetrap functions
       *
       * This method is needed to allow the global mousetrap functions to work
       * now that mousetrap is a constructor function.
       */
      Mousetrap.init = function() {
          var documentMousetrap = Mousetrap(document);
          for (var method in documentMousetrap) {
              if (method.charAt(0) !== '_') {
                  Mousetrap[method] = (function(method) {
                      return function() {
                          return documentMousetrap[method].apply(documentMousetrap, arguments);
                      };
                  } (method));
              }
          }
      };

      Mousetrap.init();

      // expose mousetrap to the global object
      window.Mousetrap = Mousetrap;

      // expose as a common js module
      if (typeof module !== 'undefined' && module.exports) {
          module.exports = Mousetrap;
      }

      // expose mousetrap as an AMD module
      if (typeof define === 'function' && define.amd) {
          define(function() {
              return Mousetrap;
          });
      }
  }) (typeof window !== 'undefined' ? window : null, typeof  window !== 'undefined' ? document : null);

  let formatSize = function(bytes) {
      if (bytes == 0) { return "0.00 B"; }
      let e = Math.floor(Math.log(bytes) / Math.log(1024));
      return ((bytes / Math.pow(1024, e)).toFixed(2) + ' ' + ' KMGTP'.charAt(e) + 'B').replace('.00', '');
  };

  let formatNumber = function(num, round = 2) {
      return (new Intl.NumberFormat(navigator.language, { style: 'decimal', maximumFractionDigits: round})).format(num);
  };

  let formatDuration = function(time) {
      // Hours, minutes and seconds
      let hrs = ~~(time / 3600);
      let mins = ~~((time % 3600) / 60);
      let secs = ~~time % 60;

      // Output like "1:01" or "4:03:59" or "123:03:59"
      let ret = '';

      if (hrs > 0) {
          ret += `${hrs}:${(mins < 10 ? '0' : '')}`;
      }

      ret += `${mins}:${(secs < 10 ? '0' : '')}`;
      ret += `${secs}`;
      return ret;
  };

  let isNumeric = function(n) { return !isNaN(parseFloat(n)) && isFinite(n); };

  let on = function(element, name, delegate, fn) {

      if (!fn) {
          element.addEventListener(name, arguments[2]);
      } else {
          element.addEventListener(name, function(e) {

              let target = e.target;

              while (target !== element) {

                  if (!target) {
                      break;
                  }

                  if (target.matches(delegate)) {
                      return fn.apply(target, arguments);
                  }

                  target = target.parentNode;
              }
          });
      }

      return element;
  };

  let toKebabCase = function(str) {
      return str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();
  };

  let copyText = function(text, cb) {
      let inp = document.createElement('textarea');
      document.body.appendChild(inp);
      inp.value = text;
      inp.select();
      try { document.execCommand('copy', false); } catch (e) { }
      inp.remove();
      if (cb) cb();
  };

  let interpolate = function(str, params) {
      const names = Object.keys(params);
      const vals = Object.values(params);
      return new Function(...names, `return \`${str}\`;`)(...vals);
  };

  let uuid$1 = function() {

      if (typeof(crypto.randomUUID) === 'function') {
          return crypto.randomUUID();
      }

      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
  };

  let nanoid = function(size = 10) {

      const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      let id = '';

      if (typeof (crypto.getRandomValues) === 'function') {
          const bytes = new Uint8Array(size);
          crypto.getRandomValues(bytes);
          for (let i = 0; i < size; i++) id += alphabet[bytes[i] % alphabet.length];
          return id;
      }

      for (let i = 0; i < size; i++) id += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      return id;
  };


  let truncate = function(text, length, clamp = '...') {
      let content = text || '';
      return content.length > length ? content.slice(0, length) + clamp : content;
  };

  let stripTags = function(input, allowed) {

      if (Array.isArray(allowed)) {
          let tags = '';
          allowed.forEach(tag => tags += `<${tag}>`);
          allowed = tags;
      }

      // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
      allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9\-]*>/g) || []).join('');
      const tags = /<\/?([a-z0-9\-]*)\b[^>]*>?/gi;
      const commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
      let after = input;

      after = (after.substring(after.length - 1) === '<') ? after.substring(0, after.length - 1) : after;

      while (true) {
          const before = after;
          after = before.replace(commentsAndPhpTags, '').replace(tags, ($0, $1) => {
              return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : ''
          });
          if (before === after) {
              return after
          }
      }
  };

  let base64encode = function(str) {
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) =>  String.fromCharCode('0x' + p1)));
  };

  let base64decode = function(str) {
      return decodeURIComponent(atob(str).split('').map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      }).join(''));
  };

  var utils = {
      base64encode,
      base64decode,
      copyText,
      formatSize,
      formatDuration,
      formatNumber,
      interpolate,
      isNumeric,
      nanoid,
      on,
      toKebabCase,
      uuid: uuid$1,
      truncate,
      stripTags
  };

  let uuid = 0;

  function setHighestZindex(element) {

      let highestZindex = parseInt(window.getComputedStyle(element).zIndex),
          offsetParent = element.offsetParent || document.body,
          zIndex;

      Array.from(offsetParent.children).forEach((node) => {
          zIndex = parseInt(window.getComputedStyle(node).zIndex) || 0;
          if (zIndex > highestZindex) highestZindex = zIndex;
      });

      element.style.zIndex = highestZindex + 1;
  }

  window.setHighestZindex = setHighestZindex;

  var ui = {

      notify: function (message, status, timeout) {

          if (timeout !== false && !timeout) {
              timeout = 2500;
          }

          new Noty({
              type: status || 'info',
              text: message,
              timeout: timeout,
              layout: 'topCenter',
              theme: 'app',
              progressBar: true
          }).show();
      },

      block: function (info='', context = 'ui-block') {

          document.body.insertAdjacentHTML('beforeend', `
            <app-loader-cover class="${context}" label="${info}"></app-loader-cover>
        `);
      },

      unblock: function (context = 'ui-block') {
          document.querySelectorAll(`.${context}`).forEach(node => node.parentNode.removeChild(node));
      },

      offcanvas: function (content, options) {

          let id = `offcanvas-${uuid++}`,
              size = '';

          options = options || {};

          switch (options.size) {
              case 'large':
                  size = 'kiss-width-1-3@m kiss-width-1-4@xl';
                  break;
              case 'xlarge':
                  size = 'kiss-width-2-3@m kiss-width-1-2@xl';
                  break;
              case 'xxlarge':
                  size = 'kiss-width-3-4';
                  break;
              case 'screen':
                  size = 'kiss-width-1-1';
                  break;
          }

          document.body.insertAdjacentHTML('beforeend', `
            <kiss-offcanvas id="offcanvas-${id}" flip="${(options.flip && 'true') || ''}">
                <kiss-content class="${size}">
                    ${content}
                </kiss-content>
            </kiss-offcanvas>
        `);

          let offcanvas = document.getElementById(`offcanvas-${id}`);

          if (options && options.zIndex) {
              offcanvas.style.zIndex = options.zIndex;
          }

          offcanvas.__close = offcanvas.close;
          offcanvas.__show = offcanvas.show;

          offcanvas.close = function() {
              offcanvas.__close();
              setTimeout(() => {
                  offcanvas.parentNode.removeChild(offcanvas);
              }, 300);
          };

          offcanvas.show = function() {
              offcanvas.__show();

              setTimeout(() => {

                  setHighestZindex(offcanvas);

                  let ele = offcanvas.querySelector('[autofocus]');

                  if (ele) {
                      ele.focus();
                  }
              }, 300);
          };

          return offcanvas;
      },


      dialog: function (content, options, dialogtype) {

          let id = `dialog-${uuid++}`;

          document.body.insertAdjacentHTML('beforeend', `
            <kiss-dialog id="dialog-${id}" size="${(options && options.size) || ''}" type="${dialogtype}" esc="${(options && options.escape) ? 'true':'false'}">
                <kiss-content class="animated fadeIn fast">
                    ${content}
                </kiss-content>
            </kiss-dialog>
        `);

          let dialog = document.getElementById(`dialog-${id}`);

          if (options && options.zIndex) {
              dialog.style.zIndex = options.zIndex;
          }

          dialog.__close = dialog.close;
          dialog.__show = dialog.show;

          dialog.close = function() {
              dialog.__close();
              dialog.parentNode.removeChild(dialog);
          };

          dialog.show = function() {
              dialog.__show();

              setTimeout(() => {

                  setHighestZindex(dialog);

                  let ele = dialog.querySelector('[autofocus]');

                  if (ele) {
                      ele.focus();
                  }
              }, 300);
          };

          return dialog;
      },

      alert: function (content, options) {

          options = Object.assign({escape:true}, options || {});

          let dialog = this.dialog(/*html*/`
            <div class="kiss-margin kiss-dialog-alert-message">
                ${content}
            </div>
            <div class="kiss-margin-top kiss-flex kiss-flex-middle">
                <button type="button" class="kiss-button kiss-button-large kiss-button-primary kiss-flex-1" kiss-dialog-close>${App.i18n.get('Ok')}</button>
            </div>
        `, options, 'alert');

          dialog.show();
      },

      confirm: function (text, onconfirm, oncancel, options) {

          options = Object.assign({escape:true}, options || {});

          let dialog = this.dialog(/*html*/`
            <div class="kiss-margin-bottom kiss-dialog-confirm-message">
                ${text}
            </div>
            <div class="kiss-margin-top kiss-flex kiss-flex-middle kiss-button-group">
                <button type="button" class="kiss-button-cancel kiss-button kiss-button-large kiss-flex-1">${App.i18n.get('Cancel')}</button>
                <button type="button" class="kiss-button-confirm kiss-button kiss-button-large kiss-button-primary kiss-flex-1">${App.i18n.get('Ok')}</button>
            </div>
        `, options, 'confirm');

          App.utils.on(dialog, 'click', '.kiss-button-confirm', () => {
              if (onconfirm) onconfirm();
              dialog.close();
          });

          App.utils.on(dialog, 'click', '.kiss-button-cancel', () => {
              if (oncancel) oncancel();
              dialog.close();
          });

          dialog.show();
      },

      prompt: function (text, value = '', clb, options) {

          options = Object.assign({
              type: 'text',
              info: null,
              escape: true
          }, options || {});

          const info = options.info ? `<div class="kiss-margin kiss-color-muted kiss-dialog-prompt-info">${options.info}</div>` : '';

          let dialog = this.dialog(/*html*/`
            <form>
                <div class="kiss-margin kiss-dialog-prompt-message">${text}</div>
                ${info}
                <div class="kiss-margin-bottom">
                    <input class="kiss-width-1-1 kiss-input" type="${options.type}" required>
                </div>
                <div class="kiss-margin-top kiss-flex kiss-flex-middle kiss-button-group">
                    <button type="button" class="kiss-button-cancel kiss-button kiss-flex-1">${App.i18n.get('Cancel')}</button>
                    <button type="submit" class="kiss-button-confirm kiss-button kiss-button-primary kiss-flex-1">${App.i18n.get('Ok')}</button>
                </div>
            </form>
        `, options, 'prompt');

          let input = dialog.querySelector('.kiss-input');

          input.value = value;

          App.utils.on(dialog, 'submit', (e) => {
              e.preventDefault();
              if (clb) clb(input.value);
              dialog.close();
          });

          App.utils.on(dialog, 'click', '.kiss-button-cancel', () => {
              dialog.close();
          });

          dialog.show();

          setTimeout(() => input.focus(), 300);
      },

      popout: function (content, options) {

          let id = `popout-${uuid++}`,
          size = '';

          options = options || {};

          document.body.insertAdjacentHTML('beforeend', `
            <kiss-popout id="popout-${id}" size="${options.size || ''}">
                <kiss-content class="${size}">
                    ${content}
                </kiss-content>
            </kiss-popout>
        `);

          let popout = document.getElementById(`popout-${id}`);

          if (options && options.zIndex) {
              popout.style.zIndex = options.zIndex;
          }

          popout.__close = popout.close;
          popout.__show = popout.show;

          popout.close = function() {
              popout.__close();
              setTimeout(() => {
                  popout.parentNode.removeChild(popout);
              }, 300);
          };

          popout.show = function() {
              popout.__show();

              setTimeout(() => {

                  setHighestZindex(popout);

                  let ele = popout.querySelector('[autofocus]');

                  if (ele) {
                      ele.focus();
                  }
              }, 300);
          };

          return popout;
      }
  };

  var assets = {

      _ress: {},

      require: function (ress, onSuccess, onError) {

          onSuccess = onSuccess || function () { };
          onError = onError || function () { };

          let req = [];

          ress = Array.isArray(ress) ? ress : [ress];

          for (let i = 0, len = ress.length; i < len; i++) {

              if (!ress[i]) continue;

              if (!this._ress[ress[i]]) {

                  if (ress[i].match(/\.js$/i)) {
                      this._ress[ress[i]] = this.getScript(ress[i]);
                  } else if (ress[i].match(/\.(jpg|jpeg|gif|png)$/i)) {
                      this._ress[ress[i]] = this.getImage(ress[i]);
                  } else if (ress[i].match(/\.css$/i)) {
                      this._ress[ress[i]] = this.getCss(ress[i]);
                  } else {
                      continue;
                  }
              }

              req.push(this._ress[ress[i]]);
          }

          return Promise.all(req).then(onSuccess).catch(function (e) {
              onError.apply(self, [e]);
          });
      },

      getScript: function (url) {

          return new Promise(function (resolve, reject) {

              let script = document.createElement('script');

              script.async = true;

              script.onload = function () {
                  resolve(url);
              };

              script.onerror = function () {
                  reject(url);
              };

              script.src = (/^(\/\/|http)/.test(url) ? url : App.base(url)) + '?v=' + App.version;

              document.getElementsByTagName('head')[0].appendChild(script);

          });
      },

      getCss: function (url) {

          return new Promise(function (resolve, reject) {

              let link = document.createElement('link');
              link.type = 'text/css';
              link.rel = 'stylesheet';
              link.href = (/^(\/\/|http)/.test(url) ? url : App.base(url)) + '?v=' + App.version;

              document.getElementsByTagName('head')[0].appendChild(link);

              let img = document.createElement('img');
              img.onerror = function () {
                  resolve(url);
              };
              img.src = link.href + '?v=' + App.version;
          });
      },

      getImage: function (url) {

          return new Promise(function (resolve, reject) {

              let img = document.createElement('img');

              img.onload = function () { resolve(url); };
              img.onerror = function () { reject(url); };

              img.src = (url.match(/^(\/\/|http)/) ? url : App.base(url)) + '?v=' + App.version;
          });
      }
  };

  let html = document.documentElement;
  let baseUrl = (html.getAttribute('data-base') || '').replace(/\/$/, '');
  let routeUrl = (html.getAttribute('data-route') || '').replace(/\/$/, '');

  let App$1 = {

      base_url: baseUrl,
      route_url: routeUrl,
      csrf: (html.getAttribute("data-csrf") || undefined),
      version: (html.getAttribute("data-version") || '0.0.1'),

      _events: {},
      _paths: {},

      base(url) {

          let path = url.match(/^(.*?)\:/);

          if (path && this._paths[path[1]]) {
              return url.replace(path[0], this._paths[path[1]]);
          }

          return this.base_url + url;
      },

      route(url) {
          return this.route_url + url;
      },

      reroute(url) {
          location.href = /^http/.test(url) ? url : this.route(url);
      },

      request(url, data, type) {

          url = this.route(url);
          type = type || 'json';

          let csrf = this.csrf;

          return new Promise(function (fulfill, reject) {

              let xhr = new XMLHttpRequest();

              xhr.open('post', url, true);
              xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

              url += (url.indexOf('?') !== -1 ? '&' : '?') + 'nc=' + Math.random().toString(36).substr(2);

              data = data || {};

              if (data) {

                  if (typeof (data) === 'object' && data instanceof HTMLFormElement) {
                      data = new FormData(data);
                  } else if (typeof (data) === 'object' && data instanceof FormData) ; else if (typeof (data) === 'object') {

                      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
                      data = JSON.stringify(data || {});
                  }
              }

              if (csrf) {
                  xhr.setRequestHeader('X-CSRF-TOKEN', csrf);
              }

              xhr.onloadend = function () {

                  let resdata = xhr.responseText;

                  if (type === 'json') {
                      try {
                          resdata = JSON.parse(xhr.responseText);
                      } catch (e) {
                          resdata = null;
                      }
                  }

                  if (this.status === 200) {
                      fulfill(resdata);
                  } else {
                      reject(resdata);
                  }
              };

              // send the collected data as JSON
              xhr.send(data);
          });
      },

      on(name, fn) {
          if (!this._events[name]) this._events[name] = [];
          this._events[name].push(fn);
      },

      off(name, fn) {
          if (!this._events[name]) return;

          if (!fn) {
              this._events[name] = [];
          } else {

              for (let i = 0; i < this._events[name].length; i++) {
                  if (this._events[name][i] === fn) {
                      this._events[name].splice(i, 1);
                      break;
                  }
              }
          }
      },

      trigger(name, params) {

          if (!this._events[name]) return;

          let event = { name, params };

          for (let i = 0; i < this._events[name].length; i++) {
              this._events[name][i].apply(App$1, [event]);
          }
      },

      deferred() {

          let resolve, fail;

          let d = new Promise(function (fullfill, reject) {
              resolve = fullfill;
              fail = reject;
          });

          d.resolve = function (data) {
              resolve(data);
          };

          d.reject = function (data) {
              fail(data);
          };

          return d;
      }
  };

  // general services
  App$1.session = window.JSONStorage ? window.JSONStorage.select('app', 'session') : null;
  App$1.storage = window.JSONStorage ? window.JSONStorage.select('app', 'local') : null;
  App$1.memory = window.JSONStorage ? window.JSONStorage.select('app', 'memory') : null;
  App$1.i18n = window.i18n || null;
  App$1.assets = assets;
  App$1.ui = ui;
  App$1.utils = utils;

  App$1.utils.import = function (uri) {
      return import(`${App$1.base(uri)}?v=${App$1.version}`);
  };


  window.App = App$1;

  customElements.define('app-avatar', class extends HTMLElement {

      static get observedAttributes() {
          return ['name', 'size', 'color'];
      }

      constructor() {
          super();
      }

      connectedCallback() {
          setTimeout(() => this.draw(), 0);
      }

      attributeChangedCallback(name, oldValue, newValue) {
          this.draw();
      }

      disconnectedCallback() {

      }

      draw() {

          this.innerHTML = '<canvas></canvas>';

          let name = this.getAttribute('name') || '';
          let size = this.getAttribute('size') || 60;
          let color = this.getAttribute('color') || null;

          let canvas = this.querySelector('canvas');

          let colours = [
              "#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50",
              "#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"
          ];

          let nameSplit = String(name).toUpperCase().split(' ');
          let initials, charIndex, colourIndex, context, dataURI;


          if (nameSplit.length == 1) {
              initials = nameSplit[0] ? nameSplit[0].charAt(0) : '?';
          } else {
              initials = nameSplit[0].charAt(0) + nameSplit[1].charAt(0);
          }

          charIndex = (initials == '?' ? 72 : initials.charCodeAt(0)) - 64;
          colourIndex = charIndex % 20;
          canvas.width = size;
          canvas.height = size;
          context = canvas.getContext("2d");

          context.fillStyle = color ? color : colours[colourIndex - 1];
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.font = Math.round(canvas.width / 2) + "px Arial";
          context.textAlign = "center";
          context.fillStyle = "#FFF";
          context.fillText(initials, size / 2, size / 1.5);

          dataURI = canvas.toDataURL();

          this.canvas = canvas;

          return dataURI;
      }
  });

  customElements.define('app-actionbar', class extends HTMLElement {

      constructor() {
          super();
      }

      connectedCallback() {

          let idle = setInterval(() => {

              if (this.offsetHeight) {
                  clearInterval(idle);
                  this.update();
              }
          }, 10);

          // just to be sure
          window.addEventListener("load", evt => {
              this.update();
          });
      }

      disconnectedCallback() {
          document.body.style.paddingBottom = '';
      }

      update() {

          if (this.getAttribute('space') !== 'false') {
              document.body.style.paddingBottom = `calc(2rem + ${this.offsetHeight}px)`;
          }
      }
  });

  const fn = e => {

      let element = e.target, closest = e.target.matches('app-fieldcontainer') ? e.target : null;

      while ((element = element.parentElement)) {
          if (element.matches('app-fieldcontainer')) {
              closest = element;
          }
      }

      let containers = document.querySelectorAll('app-fieldcontainer[active="true"]');

      containers.forEach(container => {

          if (container !== closest) {
              container.removeAttribute('active');
          }
      });
  };


  document.addEventListener('click', fn);
  document.addEventListener('focusin', fn);

  customElements.define('app-fieldcontainer', class extends HTMLElement {

      constructor() {
          super();
      }

      connectedCallback() {

          this.addEventListener('click', e => this.focus());
          this.addEventListener('focusin', e => this.focus());
      }

      disconnectedCallback() {

      }

      focus() {

          if (this.getAttribute('active') === 'true') {
              return;
          }

          this.setAttribute('active', 'true');
          fn({target: this});
          trigger(this, 'fieldcontainer:focus');
      }
  });

  customElements.define('app-frame', class extends HTMLElement {

      static get observedAttributes() {
          return ['src'];
      }

      constructor() {
          super();
      }

      connectedCallback() {

          this.innerHTML = '<iframe></iframe>';

          setTimeout(() => {

              this.iframe = this.querySelector('iframe');

              if (this.getAttribute('seamless') == 'true') {
                  this.iframe.style.height = '0px';
                  setInterval(() => this.resize(), 150);
              }

              this.update();

          }, 0);
      }

      disconnectedCallback() {
          this.observer.disconnect();
      }

      attributeChangedCallback(name, oldValue, newValue) {

          if (!this.iframe) {
              return;
          }

          this.update();
      }

      update() {
          this.iframe.src = this.getAttribute('src') || '';
      }

      resize() {

          if (!this.iframe.contentDocument.body) {
              return;
          }

          if (this._offsetHeight == this.iframe.contentDocument.body.offsetHeight) {
              return;
          }

          this._offsetHeight = this.iframe.contentDocument.body.offsetHeight;

          this.iframe.style.height = this._offsetHeight+'px';

      }
  });

  customElements.define('app-loader', class extends HTMLElement {

      static get observedAttributes() {
          return ['label', 'mode'];
      }

      constructor() {
          super();
      }

      connectedCallback() {
          this.render();
      }

      attributeChangedCallback(oldvalue, newvalue) {
          if (oldvalue != newvalue) this.render();
      }

      render() {

          let template;
          let mode = this.getAttribute('mode');

          switch (mode) {
              case 'dots':
                  template = '<div></div><div></div><div></div><div></div>';
                  break;
              default:

                  if (mode !== 'orbit') {
                      this.setAttribute('mode', 'orbit');
                  }

                  template = '<div><div></div><div></div><div></div></div>';
          }

          this.innerHTML = template;
      }
  });

  customElements.define('app-loader-cover', class extends HTMLElement {

      static get observedAttributes() {
          return ['label', 'mode'];
      }

      constructor() {
          super();
      }

      connectedCallback() {
          this.innerHTML = `
        <div>
            <app-loader></app-loader>
            <div class="app-loader-cover-label"></div>
        </div>
        `;

          this.labelElement = this.querySelector('.app-loader-cover-label');
          this.loaderElement = this.querySelector('app-loader');

          this.render();
      }

      attributeChangedCallback() {
          this.render();
      }

      render() {

          if (!this.labelElement) return;

          this.labelElement.innerText = this.getAttribute('label') || '';
          this.loaderElement.setAttribute('mode', this.getAttribute('mode'));
      }
  });

  customElements.define('app-scrollcontainer', class extends HTMLElement {

      static get observedAttributes() {
          return ['boundary'];
      }

      constructor() {
          super();
      }

      connectedCallback() {

          document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(() => {
              setTimeout(() => this.expand());
          }));

          window.addEventListener('resize',  () => requestAnimationFrame(() => {
              setTimeout(() => this.expand());
          }));

          window.addEventListener('load',  () => requestAnimationFrame(() => {
              setTimeout(() => this.expand());
          }));
      }

      attributeChangedCallback(oldvalue, newvalue) {
          if (oldvalue != newvalue)this.expand();
      }

      expand() {

          this.style.maxHeight = '';

          let rect = this.getBoundingClientRect();
          let mode = this.getAttribute('mode');

          if (rect.top > window.innerHeight) {
              return;
          }

          let maxHeight = window.innerHeight - rect.top;

          switch (mode) {
              case 'boundary':

                  let boundary = this.getAttribute('boundary');

                  if (boundary) {
                      boundary = document.querySelector(boundary);

                      if (boundary) {
                          maxHeight = boundary.getBoundingClientRect().top - rect.top;
                      }
                  }

                  if (maxHeight > window.innerHeight) {
                      return;
                  }

                  break;
          }


          this.style.maxHeight = `${maxHeight}px`;
      }
  });

  // this file gets auto imported in app:assets/js/components.js
  VueView.component('fields-manager', 'system:assets/vue-components/fields/manager.js');
  VueView.component('fields-renderer', 'system:assets/vue-components/fields/renderer.js');
  VueView.component('icon-picker', 'system:assets/vue-components/icon-picker.js');

  // General
  VueView.component('vue-draggable', Vue.defineAsyncComponent(() => {
      return new Promise(resolve => {
          App.assets.require(['app:assets/vendor/Sortable.js']).then(() => {
              App.assets.require(['app:assets/vendor/vue/components/vue-draggable.js']).then(() => resolve(window.vuedraggable));
          });
      })
  }));

  VueView.component('vue-table', Vue.defineAsyncComponent(() => {
      return new Promise(resolve => {
          App.assets.require([
              'app:assets/vendor/ag-grid/ag-grid.js',
              'app:assets/css/vendor/ag-grid-theme.css'
          ]).then(() => {
              App.utils.import('app:assets/vendor/ag-grid/ag-grid-vue3.js').then((m) => resolve(m));
          });
      })
  }));

  VueView.component('revisions-widget', 'system:assets/vue-components/revisions/widget.js');
  VueView.component('user-info', 'app:assets/vue-components/user-info.js');

  // Fields
  VueView.component('field-boolean', 'app:assets/vue-components/fields/field-boolean.js');
  VueView.component('field-code', 'app:assets/vue-components/fields/field-code.js');
  VueView.component('field-color', 'app:assets/vue-components/fields/field-color.js');
  VueView.component('field-date', 'app:assets/vue-components/fields/field-date.js');
  VueView.component('field-datetime', 'app:assets/vue-components/fields/field-datetime.js');
  VueView.component('field-nav', 'app:assets/vue-components/fields/field-nav.js');
  VueView.component('field-number', 'app:assets/vue-components/fields/field-number.js');
  VueView.component('field-object', 'app:assets/vue-components/fields/field-object.js');
  VueView.component('field-select', 'app:assets/vue-components/fields/field-select.js');
  VueView.component('field-set', 'app:assets/vue-components/fields/field-set.js');
  VueView.component('field-table', 'app:assets/vue-components/fields/field-table.js');
  VueView.component('field-tags', 'app:assets/vue-components/fields/field-tags.js');
  VueView.component('field-text', 'app:assets/vue-components/fields/field-text.js');
  VueView.component('field-time', 'app:assets/vue-components/fields/field-time.js');
  VueView.component('field-wysiwyg', 'app:assets/vue-components/fields/field-wysiwyg.js');

  App.utils.$interpolate = function (str, data) {

      data = Object.assign({}, App.utils.$interpolate.fns, data);

      return App.utils.interpolate(str, data);
  };

  App.utils.$interpolate.fns = {};

  window.App = App;

}());
