(function () {
  'use strict';

  /**
  * vue v3.4.18
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  window.Vue=function(e){function t(e,t){const n=new Set(e.split(","));return t?e=>n.has(e.toLowerCase()):e=>n.has(e)}const n={},s=[],o=()=>{},r=()=>!1,i=e=>111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),l=e=>e.startsWith("onUpdate:"),c=Object.assign,a=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1);},u=Object.prototype.hasOwnProperty,d=(e,t)=>u.call(e,t),p=Array.isArray,h=e=>"[object Map]"===x(e),f=e=>"[object Set]"===x(e),m=e=>"[object Date]"===x(e),g=e=>"function"==typeof e,y=e=>"string"==typeof e,v=e=>"symbol"==typeof e,b=e=>null!==e&&"object"==typeof e,_=e=>(b(e)||g(e))&&g(e.then)&&g(e.catch),S=Object.prototype.toString,x=e=>S.call(e),C=e=>x(e).slice(8,-1),k=e=>"[object Object]"===x(e),T=e=>y(e)&&"NaN"!==e&&"-"!==e[0]&&""+parseInt(e,10)===e,w=t(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),E=t("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"),N=e=>{const t=Object.create(null);return n=>t[n]||(t[n]=e(n))},A=/-(\w)/g,I=N((e=>e.replace(A,((e,t)=>t?t.toUpperCase():"")))),R=/\B([A-Z])/g,O=N((e=>e.replace(R,"-$1").toLowerCase())),L=N((e=>e.charAt(0).toUpperCase()+e.slice(1))),F=N((e=>e?`on${L(e)}`:"")),M=(e,t)=>!Object.is(e,t),P=(e,t)=>{for(let n=0;n<e.length;n++)e[n](t);},$=(e,t,n)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:n});},B=e=>{const t=parseFloat(e);return isNaN(t)?e:t},V=e=>{const t=y(e)?Number(e):NaN;return isNaN(t)?e:t};let D;const U=()=>D||(D="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}),j=t("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error");function H(e){if(p(e)){const t={};for(let n=0;n<e.length;n++){const s=e[n],o=y(s)?z(s):H(s);if(o)for(const e in o)t[e]=o[e];}return t}if(y(e)||b(e))return e}const q=/;(?![^(]*\))/g,W=/:([^]+)/,K=/\/\*[^]*?\*\//g;function z(e){const t={};return e.replace(K,"").split(q).forEach((e=>{if(e){const n=e.split(W);n.length>1&&(t[n[0].trim()]=n[1].trim());}})),t}function G(e){let t="";if(y(e))t=e;else if(p(e))for(let n=0;n<e.length;n++){const s=G(e[n]);s&&(t+=s+" ");}else if(b(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const J=t("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot"),X=t("svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view"),Q=t("annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics"),Z=t("area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr"),Y=t("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");function ee(e){return !!e||""===e}function te(e,t){if(e===t)return !0;let n=m(e),s=m(t);if(n||s)return !(!n||!s)&&e.getTime()===t.getTime();if(n=v(e),s=v(t),n||s)return e===t;if(n=p(e),s=p(t),n||s)return !(!n||!s)&&function(e,t){if(e.length!==t.length)return !1;let n=!0;for(let s=0;n&&s<e.length;s++)n=te(e[s],t[s]);return n}(e,t);if(n=b(e),s=b(t),n||s){if(!n||!s)return !1;if(Object.keys(e).length!==Object.keys(t).length)return !1;for(const n in e){const s=e.hasOwnProperty(n),o=t.hasOwnProperty(n);if(s&&!o||!s&&o||!te(e[n],t[n]))return !1}}return String(e)===String(t)}function ne(e,t){return e.findIndex((e=>te(e,t)))}const se=(e,t)=>t&&t.__v_isRef?se(e,t.value):h(t)?{[`Map(${t.size})`]:[...t.entries()].reduce(((e,[t,n],s)=>(e[oe(t,s)+" =>"]=n,e)),{})}:f(t)?{[`Set(${t.size})`]:[...t.values()].map((e=>oe(e)))}:v(t)?oe(t):!b(t)||p(t)||k(t)?t:String(t),oe=(e,t="")=>{var n;return v(e)?`Symbol(${null!=(n=e.description)?n:t})`:e};let re,ie;class le{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this.parent=re,!e&&re&&(this.index=(re.scopes||(re.scopes=[])).push(this)-1);}get active(){return this._active}run(e){if(this._active){const t=re;try{return re=this,e()}finally{re=t;}}}on(){re=this;}off(){re=this.parent;}stop(e){if(this._active){let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);if(!this.detached&&this.parent&&!e){const e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index);}this.parent=void 0,this._active=!1;}}}function ce(e,t=re){t&&t.active&&t.effects.push(e);}function ae(){return re}class ue{constructor(e,t,n,s){this.fn=e,this.trigger=t,this.scheduler=n,this.active=!0,this.deps=[],this._dirtyLevel=4,this._trackId=0,this._runnings=0,this._shouldSchedule=!1,this._depsLength=0,ce(this,s);}get dirty(){if(2===this._dirtyLevel||3===this._dirtyLevel){this._dirtyLevel=1,ve();for(let e=0;e<this._depsLength;e++){const t=this.deps[e];if(t.computed&&(de(t.computed),this._dirtyLevel>=4))break}1===this._dirtyLevel&&(this._dirtyLevel=0),be();}return this._dirtyLevel>=4}set dirty(e){this._dirtyLevel=e?4:0;}run(){if(this._dirtyLevel=0,!this.active)return this.fn();let e=me,t=ie;try{return me=!0,ie=this,this._runnings++,pe(this),this.fn()}finally{he(this),this._runnings--,ie=t,me=e;}}stop(){var e;this.active&&(pe(this),he(this),null==(e=this.onStop)||e.call(this),this.active=!1);}}function de(e){return e.value}function pe(e){e._trackId++,e._depsLength=0;}function he(e){if(e.deps.length>e._depsLength){for(let t=e._depsLength;t<e.deps.length;t++)fe(e.deps[t],e);e.deps.length=e._depsLength;}}function fe(e,t){const n=e.get(t);void 0!==n&&t._trackId!==n&&(e.delete(t),0===e.size&&e.cleanup());}let me=!0,ge=0;const ye=[];function ve(){ye.push(me),me=!1;}function be(){const e=ye.pop();me=void 0===e||e;}function _e(){ge++;}function Se(){for(ge--;!ge&&Ce.length;)Ce.shift()();}function xe(e,t,n){if(t.get(e)!==e._trackId){t.set(e,e._trackId);const n=e.deps[e._depsLength];n!==t?(n&&fe(n,e),e.deps[e._depsLength++]=t):e._depsLength++;}}const Ce=[];function ke(e,t,n){_e();for(const s of e.keys()){let n;s._dirtyLevel<t&&(null!=n?n:n=e.get(s)===s._trackId)&&(s._shouldSchedule||(s._shouldSchedule=0===s._dirtyLevel),s._dirtyLevel=t),s._shouldSchedule&&(null!=n?n:n=e.get(s)===s._trackId)&&(s.trigger(),s._runnings&&!s.allowRecurse||2===s._dirtyLevel||(s._shouldSchedule=!1,s.scheduler&&Ce.push(s.scheduler)));}Se();}const Te=(e,t)=>{const n=new Map;return n.cleanup=e,n.computed=t,n},we=new WeakMap,Ee=Symbol(""),Ne=Symbol("");function Ae(e,t,n){if(me&&ie){let t=we.get(e);t||we.set(e,t=new Map);let s=t.get(n);s||t.set(n,s=Te((()=>t.delete(n)))),xe(ie,s);}}function Ie(e,t,n,s,o,r){const i=we.get(e);if(!i)return;let l=[];if("clear"===t)l=[...i.values()];else if("length"===n&&p(e)){const e=Number(s);i.forEach(((t,n)=>{("length"===n||!v(n)&&n>=e)&&l.push(t);}));}else switch(void 0!==n&&l.push(i.get(n)),t){case"add":p(e)?T(n)&&l.push(i.get("length")):(l.push(i.get(Ee)),h(e)&&l.push(i.get(Ne)));break;case"delete":p(e)||(l.push(i.get(Ee)),h(e)&&l.push(i.get(Ne)));break;case"set":h(e)&&l.push(i.get(Ee));}_e();for(const c of l)c&&ke(c,4);Se();}const Re=t("__proto__,__v_isRef,__isVue"),Oe=new Set(Object.getOwnPropertyNames(Symbol).filter((e=>"arguments"!==e&&"caller"!==e)).map((e=>Symbol[e])).filter(v)),Le=Fe();function Fe(){const e={};return ["includes","indexOf","lastIndexOf"].forEach((t=>{e[t]=function(...e){const n=Ct(this);for(let t=0,o=this.length;t<o;t++)Ae(n,0,t+"");const s=n[t](...e);return -1===s||!1===s?n[t](...e.map(Ct)):s};})),["push","pop","shift","unshift","splice"].forEach((t=>{e[t]=function(...e){ve(),_e();const n=Ct(this)[t].apply(this,e);return Se(),be(),n};})),e}function Me(e){const t=Ct(this);return Ae(t,0,e),t.hasOwnProperty(e)}class Pe{constructor(e=!1,t=!1){this._isReadonly=e,this._shallow=t;}get(e,t,n){const s=this._isReadonly,o=this._shallow;if("__v_isReactive"===t)return !s;if("__v_isReadonly"===t)return s;if("__v_isShallow"===t)return o;if("__v_raw"===t)return n===(s?o?ft:ht:o?pt:dt).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;const r=p(e);if(!s){if(r&&d(Le,t))return Reflect.get(Le,t,n);if("hasOwnProperty"===t)return Me}const i=Reflect.get(e,t,n);return (v(t)?Oe.has(t):Re(t))?i:(s||Ae(e,0,t),o?i:It(i)?r&&T(t)?i:i.value:b(i)?s?yt(i):mt(i):i)}}class $e extends Pe{constructor(e=!1){super(!1,e);}set(e,t,n,s){let o=e[t];if(!this._shallow){const t=_t(o);if(St(n)||_t(n)||(o=Ct(o),n=Ct(n)),!p(e)&&It(o)&&!It(n))return !t&&(o.value=n,!0)}const r=p(e)&&T(t)?Number(t)<e.length:d(e,t),i=Reflect.set(e,t,n,s);return e===Ct(s)&&(r?M(n,o)&&Ie(e,"set",t,n):Ie(e,"add",t,n)),i}deleteProperty(e,t){const n=d(e,t),s=Reflect.deleteProperty(e,t);return s&&n&&Ie(e,"delete",t,void 0),s}has(e,t){const n=Reflect.has(e,t);return v(t)&&Oe.has(t)||Ae(e,0,t),n}ownKeys(e){return Ae(e,0,p(e)?"length":Ee),Reflect.ownKeys(e)}}class Be extends Pe{constructor(e=!1){super(!0,e);}set(e,t){return !0}deleteProperty(e,t){return !0}}const Ve=new $e,De=new Be,Ue=new $e(!0),je=new Be(!0),He=e=>e,qe=e=>Reflect.getPrototypeOf(e);function We(e,t,n=!1,s=!1){const o=Ct(e=e.__v_raw),r=Ct(t);n||(M(t,r)&&Ae(o,0,t),Ae(o,0,r));const{has:i}=qe(o),l=s?He:n?wt:Tt;return i.call(o,t)?l(e.get(t)):i.call(o,r)?l(e.get(r)):void(e!==o&&e.get(t))}function Ke(e,t=!1){const n=this.__v_raw,s=Ct(n),o=Ct(e);return t||(M(e,o)&&Ae(s,0,e),Ae(s,0,o)),e===o?n.has(e):n.has(e)||n.has(o)}function ze(e,t=!1){return e=e.__v_raw,!t&&Ae(Ct(e),0,Ee),Reflect.get(e,"size",e)}function Ge(e){e=Ct(e);const t=Ct(this);return qe(t).has.call(t,e)||(t.add(e),Ie(t,"add",e,e)),this}function Je(e,t){t=Ct(t);const n=Ct(this),{has:s,get:o}=qe(n);let r=s.call(n,e);r||(e=Ct(e),r=s.call(n,e));const i=o.call(n,e);return n.set(e,t),r?M(t,i)&&Ie(n,"set",e,t):Ie(n,"add",e,t),this}function Xe(e){const t=Ct(this),{has:n,get:s}=qe(t);let o=n.call(t,e);o||(e=Ct(e),o=n.call(t,e)),s&&s.call(t,e);const r=t.delete(e);return o&&Ie(t,"delete",e,void 0),r}function Qe(){const e=Ct(this),t=0!==e.size,n=e.clear();return t&&Ie(e,"clear",void 0,void 0),n}function Ze(e,t){return function(n,s){const o=this,r=o.__v_raw,i=Ct(r),l=t?He:e?wt:Tt;return !e&&Ae(i,0,Ee),r.forEach(((e,t)=>n.call(s,l(e),l(t),o)))}}function Ye(e,t,n){return function(...s){const o=this.__v_raw,r=Ct(o),i=h(r),l="entries"===e||e===Symbol.iterator&&i,c="keys"===e&&i,a=o[e](...s),u=n?He:t?wt:Tt;return !t&&Ae(r,0,c?Ne:Ee),{next(){const{value:e,done:t}=a.next();return t?{value:e,done:t}:{value:l?[u(e[0]),u(e[1])]:u(e),done:t}},[Symbol.iterator](){return this}}}}function et(e){return function(...t){return "delete"!==e&&("clear"===e?void 0:this)}}function tt(){const e={get(e){return We(this,e)},get size(){return ze(this)},has:Ke,add:Ge,set:Je,delete:Xe,clear:Qe,forEach:Ze(!1,!1)},t={get(e){return We(this,e,!1,!0)},get size(){return ze(this)},has:Ke,add:Ge,set:Je,delete:Xe,clear:Qe,forEach:Ze(!1,!0)},n={get(e){return We(this,e,!0)},get size(){return ze(this,!0)},has(e){return Ke.call(this,e,!0)},add:et("add"),set:et("set"),delete:et("delete"),clear:et("clear"),forEach:Ze(!0,!1)},s={get(e){return We(this,e,!0,!0)},get size(){return ze(this,!0)},has(e){return Ke.call(this,e,!0)},add:et("add"),set:et("set"),delete:et("delete"),clear:et("clear"),forEach:Ze(!0,!0)};return ["keys","values","entries",Symbol.iterator].forEach((o=>{e[o]=Ye(o,!1,!1),n[o]=Ye(o,!0,!1),t[o]=Ye(o,!1,!0),s[o]=Ye(o,!0,!0);})),[e,n,t,s]}const[nt,st,ot,rt]=tt();function it(e,t){const n=t?e?rt:ot:e?st:nt;return (t,s,o)=>"__v_isReactive"===s?!e:"__v_isReadonly"===s?e:"__v_raw"===s?t:Reflect.get(d(n,s)&&s in t?n:t,s,o)}const lt={get:it(!1,!1)},ct={get:it(!1,!0)},at={get:it(!0,!1)},ut={get:it(!0,!0)},dt=new WeakMap,pt=new WeakMap,ht=new WeakMap,ft=new WeakMap;function mt(e){return _t(e)?e:vt(e,!1,Ve,lt,dt)}function gt(e){return vt(e,!1,Ue,ct,pt)}function yt(e){return vt(e,!0,De,at,ht)}function vt(e,t,n,s,o){if(!b(e))return e;if(e.__v_raw&&(!t||!e.__v_isReactive))return e;const r=o.get(e);if(r)return r;const i=(l=e).__v_skip||!Object.isExtensible(l)?0:function(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}(C(l));var l;if(0===i)return e;const c=new Proxy(e,2===i?s:n);return o.set(e,c),c}function bt(e){return _t(e)?bt(e.__v_raw):!(!e||!e.__v_isReactive)}function _t(e){return !(!e||!e.__v_isReadonly)}function St(e){return !(!e||!e.__v_isShallow)}function xt(e){return bt(e)||_t(e)}function Ct(e){const t=e&&e.__v_raw;return t?Ct(t):e}function kt(e){return Object.isExtensible(e)&&$(e,"__v_skip",!0),e}const Tt=e=>b(e)?mt(e):e,wt=e=>b(e)?yt(e):e;class Et{constructor(e,t,n,s){this._setter=t,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this.effect=new ue((()=>e(this._value)),(()=>At(this,2===this.effect._dirtyLevel?2:3))),this.effect.computed=this,this.effect.active=this._cacheable=!s,this.__v_isReadonly=n;}get value(){const e=Ct(this);return e._cacheable&&!e.effect.dirty||!M(e._value,e._value=e.effect.run())||At(e,4),Nt(e),e.effect._dirtyLevel>=2&&At(e,2),e._value}set value(e){this._setter(e);}get _dirty(){return this.effect.dirty}set _dirty(e){this.effect.dirty=e;}}function Nt(e){var t;me&&ie&&(e=Ct(e),xe(ie,null!=(t=e.dep)?t:e.dep=Te((()=>e.dep=void 0),e instanceof Et?e:void 0)));}function At(e,t=4,n){const s=(e=Ct(e)).dep;s&&ke(s,t);}function It(e){return !(!e||!0!==e.__v_isRef)}function Rt(e){return Ot(e,!1)}function Ot(e,t){return It(e)?e:new Lt(e,t)}class Lt{constructor(e,t){this.__v_isShallow=t,this.dep=void 0,this.__v_isRef=!0,this._rawValue=t?e:Ct(e),this._value=t?e:Tt(e);}get value(){return Nt(this),this._value}set value(e){const t=this.__v_isShallow||St(e)||_t(e);e=t?e:Ct(e),M(e,this._rawValue)&&(this._rawValue=e,this._value=t?e:Tt(e),At(this,4));}}function Ft(e){return It(e)?e.value:e}const Mt={get:(e,t,n)=>Ft(Reflect.get(e,t,n)),set:(e,t,n,s)=>{const o=e[t];return It(o)&&!It(n)?(o.value=n,!0):Reflect.set(e,t,n,s)}};function Pt(e){return bt(e)?e:new Proxy(e,Mt)}class $t{constructor(e){this.dep=void 0,this.__v_isRef=!0;const{get:t,set:n}=e((()=>Nt(this)),(()=>At(this)));this._get=t,this._set=n;}get value(){return this._get()}set value(e){this._set(e);}}function Bt(e){return new $t(e)}class Vt{constructor(e,t,n){this._object=e,this._key=t,this._defaultValue=n,this.__v_isRef=!0;}get value(){const e=this._object[this._key];return void 0===e?this._defaultValue:e}set value(e){this._object[this._key]=e;}get dep(){return e=Ct(this._object),t=this._key,null==(n=we.get(e))?void 0:n.get(t);var e,t,n;}}class Dt{constructor(e){this._getter=e,this.__v_isRef=!0,this.__v_isReadonly=!0;}get value(){return this._getter()}}function Ut(e,t,n){const s=e[t];return It(s)?s:new Vt(e,t,n)}function jt(e,t,n,s){let o;try{o=s?e(...s):e();}catch(r){qt(r,t,n);}return o}function Ht(e,t,n,s){if(g(e)){const o=jt(e,t,n,s);return o&&_(o)&&o.catch((e=>{qt(e,t,n);})),o}const o=[];for(let r=0;r<e.length;r++)o.push(Ht(e[r],t,n,s));return o}function qt(e,t,n,s=!0){if(t){let s=t.parent;const o=t.proxy,r=`https://vuejs.org/error-reference/#runtime-${n}`;for(;s;){const t=s.ec;if(t)for(let n=0;n<t.length;n++)if(!1===t[n](e,o,r))return;s=s.parent;}const i=t.appContext.config.errorHandler;if(i)return void jt(i,null,10,[e,o,r])}!function(e,t,n,s=!0){console.error(e);}(e,0,0,s);}let Wt=!1,Kt=!1;const zt=[];let Gt=0;const Jt=[];let Xt=null,Qt=0;const Zt=Promise.resolve();let Yt=null;function en(e){const t=Yt||Zt;return e?t.then(this?e.bind(this):e):t}function tn(e){zt.length&&zt.includes(e,Wt&&e.allowRecurse?Gt+1:Gt)||(null==e.id?zt.push(e):zt.splice(function(e){let t=Gt+1,n=zt.length;for(;t<n;){const s=t+n>>>1,o=zt[s],r=ln(o);r<e||r===e&&o.pre?t=s+1:n=s;}return t}(e.id),0,e),nn());}function nn(){Wt||Kt||(Kt=!0,Yt=Zt.then(an));}function sn(e){p(e)?Jt.push(...e):Xt&&Xt.includes(e,e.allowRecurse?Qt+1:Qt)||Jt.push(e),nn();}function on(e,t,n=(Wt?Gt+1:0)){for(;n<zt.length;n++){const t=zt[n];if(t&&t.pre){if(e&&t.id!==e.uid)continue;zt.splice(n,1),n--,t();}}}function rn(e){if(Jt.length){const e=[...new Set(Jt)].sort(((e,t)=>ln(e)-ln(t)));if(Jt.length=0,Xt)return void Xt.push(...e);for(Xt=e,Qt=0;Qt<Xt.length;Qt++)Xt[Qt]();Xt=null,Qt=0;}}const ln=e=>null==e.id?1/0:e.id,cn=(e,t)=>{const n=ln(e)-ln(t);if(0===n){if(e.pre&&!t.pre)return -1;if(t.pre&&!e.pre)return 1}return n};function an(e){Kt=!1,Wt=!0,zt.sort(cn);try{for(Gt=0;Gt<zt.length;Gt++){const e=zt[Gt];e&&!1!==e.active&&jt(e,null,14);}}finally{Gt=0,zt.length=0,rn(),Wt=!1,Yt=null,(zt.length||Jt.length)&&an();}}function un(e,t,...s){if(e.isUnmounted)return;const o=e.vnode.props||n;let r=s;const i=t.startsWith("update:"),l=i&&t.slice(7);if(l&&l in o){const e=`${"modelValue"===l?"model":l}Modifiers`,{number:t,trim:i}=o[e]||n;i&&(r=s.map((e=>y(e)?e.trim():e))),t&&(r=s.map(B));}let c,a=o[c=F(t)]||o[c=F(I(t))];!a&&i&&(a=o[c=F(O(t))]),a&&Ht(a,e,6,r);const u=o[c+"Once"];if(u){if(e.emitted){if(e.emitted[c])return}else e.emitted={};e.emitted[c]=!0,Ht(u,e,6,r);}}function dn(e,t,n=!1){const s=t.emitsCache,o=s.get(e);if(void 0!==o)return o;const r=e.emits;let i={},l=!1;if(!g(e)){const s=e=>{const n=dn(e,t,!0);n&&(l=!0,c(i,n));};!n&&t.mixins.length&&t.mixins.forEach(s),e.extends&&s(e.extends),e.mixins&&e.mixins.forEach(s);}return r||l?(p(r)?r.forEach((e=>i[e]=null)):c(i,r),b(e)&&s.set(e,i),i):(b(e)&&s.set(e,null),null)}function pn(e,t){return !(!e||!i(t))&&(t=t.slice(2).replace(/Once$/,""),d(e,t[0].toLowerCase()+t.slice(1))||d(e,O(t))||d(e,t))}let hn=null,fn=null;function mn(e){const t=hn;return hn=e,fn=e&&e.type.__scopeId||null,t}function gn(e,t=hn,n){if(!t)return e;if(e._n)return e;const s=(...n)=>{s._d&&Ho(-1);const o=mn(t);let r;try{r=e(...n);}finally{mn(o),s._d&&Ho(1);}return r};return s._n=!0,s._c=!0,s._d=!0,s}function yn(e){const{type:t,vnode:n,proxy:s,withProxy:o,props:r,propsOptions:[i],slots:c,attrs:a,emit:u,render:d,renderCache:p,data:h,setupState:f,ctx:m,inheritAttrs:g}=e;let y,v;const b=mn(e);try{if(4&n.shapeFlag){const e=o||s;y=nr(d.call(e,e,p,r,f,h,m)),v=a;}else {const e=t;0,y=nr(e(r,e.length>1?{attrs:a,slots:c,emit:u}:null)),v=t.props?a:vn(a);}}catch(S){Bo.length=0,qt(S,e,1),y=Zo(Po);}let _=y;if(v&&!1!==g){const e=Object.keys(v),{shapeFlag:t}=_;e.length&&7&t&&(i&&e.some(l)&&(v=bn(v,i)),_=er(_,v));}return n.dirs&&(_=er(_),_.dirs=_.dirs?_.dirs.concat(n.dirs):n.dirs),n.transition&&(_.transition=n.transition),y=_,mn(b),y}const vn=e=>{let t;for(const n in e)("class"===n||"style"===n||i(n))&&((t||(t={}))[n]=e[n]);return t},bn=(e,t)=>{const n={};for(const s in e)l(s)&&s.slice(9)in t||(n[s]=e[s]);return n};function _n(e,t,n){const s=Object.keys(t);if(s.length!==Object.keys(e).length)return !0;for(let o=0;o<s.length;o++){const r=s[o];if(t[r]!==e[r]&&!pn(n,r))return !0}return !1}function Sn({vnode:e,parent:t},n){for(;t;){const s=t.subTree;if(s.suspense&&s.suspense.activeBranch===e&&(s.el=e.el),s!==e)break;(e=t.vnode).el=n,t=t.parent;}}const xn="components";const Cn=Symbol.for("v-ndc");function kn(e,t,n=!0,s=!1){const o=hn||ar;if(o){const n=o.type;if(e===xn){const e=kr(n,!1);if(e&&(e===t||e===I(t)||e===L(I(t))))return n}const r=Tn(o[e]||n[e],t)||Tn(o.appContext[e],t);return !r&&s?n:r}}function Tn(e,t){return e&&(e[t]||e[I(t)]||e[L(I(t))])}const wn=e=>e.__isSuspense;let En=0;const Nn={name:"Suspense",__isSuspense:!0,process(e,t,n,s,o,r,i,l,c,a){if(null==e)!function(e,t,n,s,o,r,i,l,c){const{p:a,o:{createElement:u}}=c,d=u("div"),p=e.suspense=In(e,o,s,t,d,n,r,i,l,c);a(null,p.pendingBranch=e.ssContent,d,null,s,p,r,i),p.deps>0?(An(e,"onPending"),An(e,"onFallback"),a(null,e.ssFallback,t,n,s,null,r,i),Ln(p,e.ssFallback)):p.resolve(!1,!0);}(t,n,s,o,r,i,l,c,a);else {if(r&&r.deps>0)return void(t.suspense=e.suspense);!function(e,t,n,s,o,r,i,l,{p:c,um:a,o:{createElement:u}}){const d=t.suspense=e.suspense;d.vnode=t,t.el=e.el;const p=t.ssContent,h=t.ssFallback,{activeBranch:f,pendingBranch:m,isInFallback:g,isHydrating:y}=d;if(m)d.pendingBranch=p,zo(p,m)?(c(m,p,d.hiddenContainer,null,o,d,r,i,l),d.deps<=0?d.resolve():g&&(y||(c(f,h,n,s,o,null,r,i,l),Ln(d,h)))):(d.pendingId=En++,y?(d.isHydrating=!1,d.activeBranch=m):a(m,o,d),d.deps=0,d.effects.length=0,d.hiddenContainer=u("div"),g?(c(null,p,d.hiddenContainer,null,o,d,r,i,l),d.deps<=0?d.resolve():(c(f,h,n,s,o,null,r,i,l),Ln(d,h))):f&&zo(p,f)?(c(f,p,n,s,o,d,r,i,l),d.resolve(!0)):(c(null,p,d.hiddenContainer,null,o,d,r,i,l),d.deps<=0&&d.resolve()));else if(f&&zo(p,f))c(f,p,n,s,o,d,r,i,l),Ln(d,p);else if(An(t,"onPending"),d.pendingBranch=p,d.pendingId=512&p.shapeFlag?p.component.suspenseId:En++,c(null,p,d.hiddenContainer,null,o,d,r,i,l),d.deps<=0)d.resolve();else {const{timeout:e,pendingId:t}=d;e>0?setTimeout((()=>{d.pendingId===t&&d.fallback(h);}),e):0===e&&d.fallback(h);}}(e,t,n,s,o,i,l,c,a);}},hydrate:function(e,t,n,s,o,r,i,l,c){const a=t.suspense=In(t,s,n,e.parentNode,document.createElement("div"),null,o,r,i,l,!0),u=c(e,a.pendingBranch=t.ssContent,n,a,r,i);0===a.deps&&a.resolve(!1,!0);return u},create:In,normalize:function(e){const{shapeFlag:t,children:n}=e,s=32&t;e.ssContent=Rn(s?n.default:n),e.ssFallback=s?Rn(n.fallback):Zo(Po);}};function An(e,t){const n=e.props&&e.props[t];g(n)&&n();}function In(e,t,n,s,o,r,i,l,c,a,u=!1){const{p:d,m:p,um:h,n:f,o:{parentNode:m,remove:g}}=a;let y;const v=function(e){var t;return null!=(null==(t=e.props)?void 0:t.suspensible)&&!1!==e.props.suspensible}(e);v&&(null==t?void 0:t.pendingBranch)&&(y=t.pendingId,t.deps++);const b=e.props?V(e.props.timeout):void 0,_=r,S={vnode:e,parent:t,parentComponent:n,namespace:i,container:s,hiddenContainer:o,deps:0,pendingId:En++,timeout:"number"==typeof b?b:-1,activeBranch:null,pendingBranch:null,isInFallback:!u,isHydrating:u,isUnmounted:!1,effects:[],resolve(e=!1,n=!1){const{vnode:s,activeBranch:o,pendingBranch:i,pendingId:l,effects:c,parentComponent:a,container:u}=S;let d=!1;S.isHydrating?S.isHydrating=!1:e||(d=o&&i.transition&&"out-in"===i.transition.mode,d&&(o.transition.afterLeave=()=>{l===S.pendingId&&(p(i,u,r===_?f(o):r,0),sn(c));}),o&&(m(o.el)!==S.hiddenContainer&&(r=f(o)),h(o,a,S,!0)),d||p(i,u,r,0)),Ln(S,i),S.pendingBranch=null,S.isInFallback=!1;let g=S.parent,b=!1;for(;g;){if(g.pendingBranch){g.effects.push(...c),b=!0;break}g=g.parent;}b||d||sn(c),S.effects=[],v&&t&&t.pendingBranch&&y===t.pendingId&&(t.deps--,0!==t.deps||n||t.resolve()),An(s,"onResolve");},fallback(e){if(!S.pendingBranch)return;const{vnode:t,activeBranch:n,parentComponent:s,container:o,namespace:r}=S;An(t,"onFallback");const i=f(n),a=()=>{S.isInFallback&&(d(null,e,o,i,s,null,r,l,c),Ln(S,e));},u=e.transition&&"out-in"===e.transition.mode;u&&(n.transition.afterLeave=a),S.isInFallback=!0,h(n,s,null,!0),u||a();},move(e,t,n){S.activeBranch&&p(S.activeBranch,e,t,n),S.container=e;},next:()=>S.activeBranch&&f(S.activeBranch),registerDep(e,t){const n=!!S.pendingBranch;n&&S.deps++;const s=e.vnode.el;e.asyncDep.catch((t=>{qt(t,e,0);})).then((o=>{if(e.isUnmounted||S.isUnmounted||S.pendingId!==e.suspenseId)return;e.asyncResolved=!0;const{vnode:r}=e;br(e,o,!1),s&&(r.el=s);const l=!s&&e.subTree.el;t(e,r,m(s||e.subTree.el),s?null:f(e.subTree),S,i,c),l&&g(l),Sn(e,r.el),n&&0==--S.deps&&S.resolve();}));},unmount(e,t){S.isUnmounted=!0,S.activeBranch&&h(S.activeBranch,n,e,t),S.pendingBranch&&h(S.pendingBranch,n,e,t);}};return S}function Rn(e){let t;if(g(e)){const n=jo&&e._c;n&&(e._d=!1,Do()),e=e(),n&&(e._d=!0,t=Vo,Uo());}if(p(e)){const t=function(e,t=!0){let n;for(let s=0;s<e.length;s++){const t=e[s];if(!Ko(t))return;if(t.type!==Po||"v-if"===t.children){if(n)return;n=t;}}return n}(e);e=t;}return e=nr(e),t&&!e.dynamicChildren&&(e.dynamicChildren=t.filter((t=>t!==e))),e}function On(e,t){t&&t.pendingBranch?p(e)?t.effects.push(...e):t.effects.push(e):sn(e);}function Ln(e,t){e.activeBranch=t;const{vnode:n,parentComponent:s}=e;let o=t.el;for(;!o&&t.component;)o=(t=t.component.subTree).el;n.el=o,s&&s.subTree===n&&(s.vnode.el=o,Sn(s,o));}const Fn=Symbol.for("v-scx");function Mn(e,t){return Vn(e,null,{flush:"post"})}function Pn(e,t){return Vn(e,null,{flush:"sync"})}const $n={};function Bn(e,t,n){return Vn(e,t,n)}function Vn(e,t,{immediate:s,deep:r,flush:i,once:l}=n){if(t&&l){const e=t;t=(...t)=>{e(...t),C();};}const c=ar,u=e=>!0===r?e:jn(e,!1===r?1:void 0);let d,h,f=!1,m=!1;if(It(e)?(d=()=>e.value,f=St(e)):bt(e)?(d=()=>u(e),f=!0):p(e)?(m=!0,f=e.some((e=>bt(e)||St(e))),d=()=>e.map((e=>It(e)?e.value:bt(e)?u(e):g(e)?jt(e,c,2):void 0))):d=g(e)?t?()=>jt(e,c,2):()=>(h&&h(),Ht(e,c,3,[y])):o,t&&r){const e=d;d=()=>jn(e());}let y=e=>{h=S.onStop=()=>{jt(e,c,4),h=S.onStop=void 0;};},v=m?new Array(e.length).fill($n):$n;const b=()=>{if(S.active&&S.dirty)if(t){const e=S.run();(r||f||(m?e.some(((e,t)=>M(e,v[t]))):M(e,v)))&&(h&&h(),Ht(t,c,3,[e,v===$n?void 0:m&&v[0]===$n?[]:v,y]),v=e);}else S.run();};let _;b.allowRecurse=!!t,"sync"===i?_=b:"post"===i?_=()=>vo(b,c&&c.suspense):(b.pre=!0,c&&(b.id=c.uid),_=()=>tn(b));const S=new ue(d,o,_),x=ae(),C=()=>{S.stop(),x&&a(x.effects,S);};return t?s?b():v=S.run():"post"===i?vo(S.run.bind(S),c&&c.suspense):S.run(),C}function Dn(e,t,n){const s=this.proxy,o=y(e)?e.includes(".")?Un(s,e):()=>s[e]:e.bind(s,s);let r;g(t)?r=t:(r=t.handler,n=t);const i=hr(this),l=Vn(o,r.bind(s),n);return i(),l}function Un(e,t){const n=t.split(".");return ()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}function jn(e,t,n=0,s){if(!b(e)||e.__v_skip)return e;if(t&&t>0){if(n>=t)return e;n++;}if((s=s||new Set).has(e))return e;if(s.add(e),It(e))jn(e.value,t,n,s);else if(p(e))for(let o=0;o<e.length;o++)jn(e[o],t,n,s);else if(f(e)||h(e))e.forEach((e=>{jn(e,t,n,s);}));else if(k(e))for(const o in e)jn(e[o],t,n,s);return e}function Hn(e,t,n,s){const o=e.dirs,r=t&&t.dirs;for(let i=0;i<o.length;i++){const l=o[i];r&&(l.oldValue=r[i].value);let c=l.dir[s];c&&(ve(),Ht(c,n,8,[e.el,l,e,t]),be());}}const qn=Symbol("_leaveCb"),Wn=Symbol("_enterCb");function Kn(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return ys((()=>{e.isMounted=!0;})),_s((()=>{e.isUnmounting=!0;})),e}const zn=[Function,Array],Gn={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:zn,onEnter:zn,onAfterEnter:zn,onEnterCancelled:zn,onBeforeLeave:zn,onLeave:zn,onAfterLeave:zn,onLeaveCancelled:zn,onBeforeAppear:zn,onAppear:zn,onAfterAppear:zn,onAppearCancelled:zn},Jn={name:"BaseTransition",props:Gn,setup(e,{slots:t}){const n=ur(),s=Kn();let o;return ()=>{const r=t.default&&ts(t.default(),!0);if(!r||!r.length)return;let i=r[0];if(r.length>1)for(const e of r)if(e.type!==Po){i=e;break}const l=Ct(e),{mode:c}=l;if(s.isLeaving)return Zn(i);const a=Yn(i);if(!a)return Zn(i);const u=Qn(a,l,s,n);es(a,u);const d=n.subTree,p=d&&Yn(d);let h=!1;const{getTransitionKey:f}=a.type;if(f){const e=f();void 0===o?o=e:e!==o&&(o=e,h=!0);}if(p&&p.type!==Po&&(!zo(a,p)||h)){const e=Qn(p,l,s,n);if(es(p,e),"out-in"===c)return s.isLeaving=!0,e.afterLeave=()=>{s.isLeaving=!1,!1!==n.update.active&&(n.effect.dirty=!0,n.update());},Zn(i);"in-out"===c&&a.type!==Po&&(e.delayLeave=(e,t,n)=>{Xn(s,p)[String(p.key)]=p,e[qn]=()=>{t(),e[qn]=void 0,delete u.delayedLeave;},u.delayedLeave=n;});}return i}}};function Xn(e,t){const{leavingVNodes:n}=e;let s=n.get(t.type);return s||(s=Object.create(null),n.set(t.type,s)),s}function Qn(e,t,n,s){const{appear:o,mode:r,persisted:i=!1,onBeforeEnter:l,onEnter:c,onAfterEnter:a,onEnterCancelled:u,onBeforeLeave:d,onLeave:h,onAfterLeave:f,onLeaveCancelled:m,onBeforeAppear:g,onAppear:y,onAfterAppear:v,onAppearCancelled:b}=t,_=String(e.key),S=Xn(n,e),x=(e,t)=>{e&&Ht(e,s,9,t);},C=(e,t)=>{const n=t[1];x(e,t),p(e)?e.every((e=>e.length<=1))&&n():e.length<=1&&n();},k={mode:r,persisted:i,beforeEnter(t){let s=l;if(!n.isMounted){if(!o)return;s=g||l;}t[qn]&&t[qn](!0);const r=S[_];r&&zo(e,r)&&r.el[qn]&&r.el[qn](),x(s,[t]);},enter(e){let t=c,s=a,r=u;if(!n.isMounted){if(!o)return;t=y||c,s=v||a,r=b||u;}let i=!1;const l=e[Wn]=t=>{i||(i=!0,x(t?r:s,[e]),k.delayedLeave&&k.delayedLeave(),e[Wn]=void 0);};t?C(t,[e,l]):l();},leave(t,s){const o=String(e.key);if(t[Wn]&&t[Wn](!0),n.isUnmounting)return s();x(d,[t]);let r=!1;const i=t[qn]=n=>{r||(r=!0,s(),x(n?m:f,[t]),t[qn]=void 0,S[o]===e&&delete S[o]);};S[o]=e,h?C(h,[t,i]):i();},clone:e=>Qn(e,t,n,s)};return k}function Zn(e){if(rs(e))return (e=er(e)).children=null,e}function Yn(e){return rs(e)?e.children?e.children[0]:void 0:e}function es(e,t){6&e.shapeFlag&&e.component?es(e.component.subTree,t):128&e.shapeFlag?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t;}function ts(e,t=!1,n){let s=[],o=0;for(let r=0;r<e.length;r++){let i=e[r];const l=null==n?i.key:String(n)+String(null!=i.key?i.key:r);i.type===Fo?(128&i.patchFlag&&o++,s=s.concat(ts(i.children,t,l))):(t||i.type!==Po)&&s.push(null!=l?er(i,{key:l}):i);}if(o>1)for(let r=0;r<s.length;r++)s[r].patchFlag=-2;return s}
  /*! #__NO_SIDE_EFFECTS__ */function ns(e,t){return g(e)?(()=>c({name:e.name},t,{setup:e}))():e}const ss=e=>!!e.type.__asyncLoader
  /*! #__NO_SIDE_EFFECTS__ */;function os(e,t){const{ref:n,props:s,children:o,ce:r}=t.vnode,i=Zo(e,s,o);return i.ref=n,i.ce=r,delete t.vnode.ce,i}const rs=e=>e.type.__isKeepAlive,is={name:"KeepAlive",__isKeepAlive:!0,props:{include:[String,RegExp,Array],exclude:[String,RegExp,Array],max:[String,Number]},setup(e,{slots:t}){const n=ur(),s=n.ctx,o=new Map,r=new Set;let i=null;const l=n.suspense,{renderer:{p:c,m:a,um:u,o:{createElement:d}}}=s,p=d("div");function h(e){ps(e),u(e,n,l,!0);}function f(e){o.forEach(((t,n)=>{const s=kr(t.type);!s||e&&e(s)||m(n);}));}function m(e){const t=o.get(e);i&&zo(t,i)?i&&ps(i):h(t),o.delete(e),r.delete(e);}s.activate=(e,t,n,s,o)=>{const r=e.component;a(e,t,n,0,l),c(r.vnode,e,t,n,r,l,s,e.slotScopeIds,o),vo((()=>{r.isDeactivated=!1,r.a&&P(r.a);const t=e.props&&e.props.onVnodeMounted;t&&ir(t,r.parent,e);}),l);},s.deactivate=e=>{const t=e.component;a(e,p,null,1,l),vo((()=>{t.da&&P(t.da);const n=e.props&&e.props.onVnodeUnmounted;n&&ir(n,t.parent,e),t.isDeactivated=!0;}),l);},Bn((()=>[e.include,e.exclude]),(([e,t])=>{e&&f((t=>ls(e,t))),t&&f((e=>!ls(t,e)));}),{flush:"post",deep:!0});let g=null;const y=()=>{null!=g&&o.set(g,hs(n.subTree));};return ys(y),bs(y),_s((()=>{o.forEach((e=>{const{subTree:t,suspense:s}=n,o=hs(t);if(e.type!==o.type||e.key!==o.key)h(e);else {ps(o);const e=o.component.da;e&&vo(e,s);}}));})),()=>{if(g=null,!t.default)return null;const n=t.default(),s=n[0];if(n.length>1)return i=null,n;if(!(Ko(s)&&(4&s.shapeFlag||128&s.shapeFlag)))return i=null,s;let l=hs(s);const c=l.type,a=kr(ss(l)?l.type.__asyncResolved||{}:c),{include:u,exclude:d,max:p}=e;if(u&&(!a||!ls(u,a))||d&&a&&ls(d,a))return i=l,s;const h=null==l.key?c:l.key,f=o.get(h);return l.el&&(l=er(l),128&s.shapeFlag&&(s.ssContent=l)),g=h,f?(l.el=f.el,l.component=f.component,l.transition&&es(l,l.transition),l.shapeFlag|=512,r.delete(h),r.add(h)):(r.add(h),p&&r.size>parseInt(p,10)&&m(r.values().next().value)),l.shapeFlag|=256,i=l,wn(s.type)?s:l}}};function ls(e,t){return p(e)?e.some((e=>ls(e,t))):y(e)?e.split(",").includes(t):"[object RegExp]"===x(e)&&e.test(t)}function cs(e,t){us(e,"a",t);}function as(e,t){us(e,"da",t);}function us(e,t,n=ar){const s=e.__wdc||(e.__wdc=()=>{let t=n;for(;t;){if(t.isDeactivated)return;t=t.parent;}return e()});if(fs(t,s,n),n){let e=n.parent;for(;e&&e.parent;)rs(e.parent.vnode)&&ds(s,t,n,e),e=e.parent;}}function ds(e,t,n,s){const o=fs(t,e,s,!0);Ss((()=>{a(s[t],o);}),n);}function ps(e){e.shapeFlag&=-257,e.shapeFlag&=-513;}function hs(e){return 128&e.shapeFlag?e.ssContent:e}function fs(e,t,n=ar,s=!1){if(n){const o=n[e]||(n[e]=[]),r=t.__weh||(t.__weh=(...s)=>{if(n.isUnmounted)return;ve();const o=hr(n),r=Ht(t,n,e,s);return o(),be(),r});return s?o.unshift(r):o.push(r),r}}const ms=e=>(t,n=ar)=>(!vr||"sp"===e)&&fs(e,((...e)=>t(...e)),n),gs=ms("bm"),ys=ms("m"),vs=ms("bu"),bs=ms("u"),_s=ms("bum"),Ss=ms("um"),xs=ms("sp"),Cs=ms("rtg"),ks=ms("rtc");function Ts(e,t=ar){fs("ec",e,t);}function ws(e){return e.some((e=>!Ko(e)||e.type!==Po&&!(e.type===Fo&&!ws(e.children))))?e:null}const Es=e=>e?mr(e)?Cr(e)||e.proxy:Es(e.parent):null,Ns=c(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Es(e.parent),$root:e=>Es(e.root),$emit:e=>e.emit,$options:e=>Bs(e),$forceUpdate:e=>e.f||(e.f=()=>{e.effect.dirty=!0,tn(e.update);}),$nextTick:e=>e.n||(e.n=en.bind(e.proxy)),$watch:e=>Dn.bind(e)}),As=(e,t)=>e!==n&&!e.__isScriptSetup&&d(e,t),Is={get({_:e},t){const{ctx:s,setupState:o,data:r,props:i,accessCache:l,type:c,appContext:a}=e;let u;if("$"!==t[0]){const c=l[t];if(void 0!==c)switch(c){case 1:return o[t];case 2:return r[t];case 4:return s[t];case 3:return i[t]}else {if(As(o,t))return l[t]=1,o[t];if(r!==n&&d(r,t))return l[t]=2,r[t];if((u=e.propsOptions[0])&&d(u,t))return l[t]=3,i[t];if(s!==n&&d(s,t))return l[t]=4,s[t];Fs&&(l[t]=0);}}const p=Ns[t];let h,f;return p?("$attrs"===t&&Ae(e,0,t),p(e)):(h=c.__cssModules)&&(h=h[t])?h:s!==n&&d(s,t)?(l[t]=4,s[t]):(f=a.config.globalProperties,d(f,t)?f[t]:void 0)},set({_:e},t,s){const{data:o,setupState:r,ctx:i}=e;return As(r,t)?(r[t]=s,!0):o!==n&&d(o,t)?(o[t]=s,!0):!d(e.props,t)&&(("$"!==t[0]||!(t.slice(1)in e))&&(i[t]=s,!0))},has({_:{data:e,setupState:t,accessCache:s,ctx:o,appContext:r,propsOptions:i}},l){let c;return !!s[l]||e!==n&&d(e,l)||As(t,l)||(c=i[0])&&d(c,l)||d(o,l)||d(Ns,l)||d(r.config.globalProperties,l)},defineProperty(e,t,n){return null!=n.get?e._.accessCache[t]=0:d(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}},Rs=c({},Is,{get(e,t){if(t!==Symbol.unscopables)return Is.get(e,t,e)},has:(e,t)=>"_"!==t[0]&&!j(t)});function Os(){const e=ur();return e.setupContext||(e.setupContext=xr(e))}function Ls(e){return p(e)?e.reduce(((e,t)=>(e[t]=null,e)),{}):e}let Fs=!0;function Ms(e){const t=Bs(e),n=e.proxy,s=e.ctx;Fs=!1,t.beforeCreate&&Ps(t.beforeCreate,e,"bc");const{data:r,computed:i,methods:l,watch:c,provide:a,inject:u,created:d,beforeMount:h,mounted:f,beforeUpdate:m,updated:y,activated:v,deactivated:_,beforeUnmount:S,unmounted:x,render:C,renderTracked:k,renderTriggered:T,errorCaptured:w,serverPrefetch:E,expose:N,inheritAttrs:A,components:I,directives:R}=t;if(u&&function(e,t,n=o){p(e)&&(e=js(e));for(const s in e){const n=e[s];let o;o=b(n)?"default"in n?Qs(n.from||s,n.default,!0):Qs(n.from||s):Qs(n),It(o)?Object.defineProperty(t,s,{enumerable:!0,configurable:!0,get:()=>o.value,set:e=>o.value=e}):t[s]=o;}}(u,s,null),l)for(const o in l){const e=l[o];g(e)&&(s[o]=e.bind(n));}if(r){const t=r.call(n,n);b(t)&&(e.data=mt(t));}if(Fs=!0,i)for(const p in i){const e=i[p],t=g(e)?e.bind(n,n):g(e.get)?e.get.bind(n,n):o,r=!g(e)&&g(e.set)?e.set.bind(n):o,l=Tr({get:t,set:r});Object.defineProperty(s,p,{enumerable:!0,configurable:!0,get:()=>l.value,set:e=>l.value=e});}if(c)for(const o in c)$s(c[o],s,n,o);if(a){const e=g(a)?a.call(n):a;Reflect.ownKeys(e).forEach((t=>{Xs(t,e[t]);}));}function O(e,t){p(t)?t.forEach((t=>e(t.bind(n)))):t&&e(t.bind(n));}if(d&&Ps(d,e,"c"),O(gs,h),O(ys,f),O(vs,m),O(bs,y),O(cs,v),O(as,_),O(Ts,w),O(ks,k),O(Cs,T),O(_s,S),O(Ss,x),O(xs,E),p(N))if(N.length){const t=e.exposed||(e.exposed={});N.forEach((e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t});}));}else e.exposed||(e.exposed={});C&&e.render===o&&(e.render=C),null!=A&&(e.inheritAttrs=A),I&&(e.components=I),R&&(e.directives=R);}function Ps(e,t,n){Ht(p(e)?e.map((e=>e.bind(t.proxy))):e.bind(t.proxy),t,n);}function $s(e,t,n,s){const o=s.includes(".")?Un(n,s):()=>n[s];if(y(e)){const n=t[e];g(n)&&Bn(o,n);}else if(g(e))Bn(o,e.bind(n));else if(b(e))if(p(e))e.forEach((e=>$s(e,t,n,s)));else {const s=g(e.handler)?e.handler.bind(n):t[e.handler];g(s)&&Bn(o,s,e);}}function Bs(e){const t=e.type,{mixins:n,extends:s}=t,{mixins:o,optionsCache:r,config:{optionMergeStrategies:i}}=e.appContext,l=r.get(t);let c;return l?c=l:o.length||n||s?(c={},o.length&&o.forEach((e=>Vs(c,e,i,!0))),Vs(c,t,i)):c=t,b(t)&&r.set(t,c),c}function Vs(e,t,n,s=!1){const{mixins:o,extends:r}=t;r&&Vs(e,r,n,!0),o&&o.forEach((t=>Vs(e,t,n,!0)));for(const i in t)if(s&&"expose"===i);else {const s=Ds[i]||n&&n[i];e[i]=s?s(e[i],t[i]):t[i];}return e}const Ds={data:Us,props:Ws,emits:Ws,methods:qs,computed:qs,beforeCreate:Hs,created:Hs,beforeMount:Hs,mounted:Hs,beforeUpdate:Hs,updated:Hs,beforeDestroy:Hs,beforeUnmount:Hs,destroyed:Hs,unmounted:Hs,activated:Hs,deactivated:Hs,errorCaptured:Hs,serverPrefetch:Hs,components:qs,directives:qs,watch:function(e,t){if(!e)return t;if(!t)return e;const n=c(Object.create(null),e);for(const s in t)n[s]=Hs(e[s],t[s]);return n},provide:Us,inject:function(e,t){return qs(js(e),js(t))}};function Us(e,t){return t?e?function(){return c(g(e)?e.call(this,this):e,g(t)?t.call(this,this):t)}:t:e}function js(e){if(p(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function Hs(e,t){return e?[...new Set([].concat(e,t))]:t}function qs(e,t){return e?c(Object.create(null),e,t):t}function Ws(e,t){return e?p(e)&&p(t)?[...new Set([...e,...t])]:c(Object.create(null),Ls(e),Ls(null!=t?t:{})):t}function Ks(){return {app:null,config:{isNativeTag:r,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let zs=0;function Gs(e,t){return function(n,s=null){g(n)||(n=c({},n)),null==s||b(s)||(s=null);const o=Ks(),r=new WeakSet;let i=!1;const l=o.app={_uid:zs++,_component:n,_props:s,_container:null,_context:o,_instance:null,version:Nr,get config(){return o.config},set config(e){},use:(e,...t)=>(r.has(e)||(e&&g(e.install)?(r.add(e),e.install(l,...t)):g(e)&&(r.add(e),e(l,...t))),l),mixin:e=>(o.mixins.includes(e)||o.mixins.push(e),l),component:(e,t)=>t?(o.components[e]=t,l):o.components[e],directive:(e,t)=>t?(o.directives[e]=t,l):o.directives[e],mount(r,c,a){if(!i){const u=Zo(n,s);return u.appContext=o,!0===a?a="svg":!1===a&&(a=void 0),c&&t?t(u,r):e(u,r,a),i=!0,l._container=r,r.__vue_app__=l,Cr(u.component)||u.component.proxy}},unmount(){i&&(e(null,l._container),delete l._container.__vue_app__);},provide:(e,t)=>(o.provides[e]=t,l),runWithContext(e){const t=Js;Js=l;try{return e()}finally{Js=t;}}};return l}}let Js=null;function Xs(e,t){if(ar){let n=ar.provides;const s=ar.parent&&ar.parent.provides;s===n&&(n=ar.provides=Object.create(s)),n[e]=t;}}function Qs(e,t,n=!1){const s=ar||hn;if(s||Js){const o=s?null==s.parent?s.vnode.appContext&&s.vnode.appContext.provides:s.parent.provides:Js._context.provides;if(o&&e in o)return o[e];if(arguments.length>1)return n&&g(t)?t.call(s&&s.proxy):t}}function Zs(e,t,s,o){const[r,i]=e.propsOptions;let l,c=!1;if(t)for(let n in t){if(w(n))continue;const a=t[n];let u;r&&d(r,u=I(n))?i&&i.includes(u)?(l||(l={}))[u]=a:s[u]=a:pn(e.emitsOptions,n)||n in o&&a===o[n]||(o[n]=a,c=!0);}if(i){const t=Ct(s),o=l||n;for(let n=0;n<i.length;n++){const l=i[n];s[l]=Ys(r,t,l,o[l],e,!d(o,l));}}return c}function Ys(e,t,n,s,o,r){const i=e[n];if(null!=i){const e=d(i,"default");if(e&&void 0===s){const e=i.default;if(i.type!==Function&&!i.skipFactory&&g(e)){const{propsDefaults:r}=o;if(n in r)s=r[n];else {const i=hr(o);s=r[n]=e.call(null,t),i();}}else s=e;}i[0]&&(r&&!e?s=!1:!i[1]||""!==s&&s!==O(n)||(s=!0));}return s}function eo(e,t,o=!1){const r=t.propsCache,i=r.get(e);if(i)return i;const l=e.props,a={},u=[];let h=!1;if(!g(e)){const n=e=>{h=!0;const[n,s]=eo(e,t,!0);c(a,n),s&&u.push(...s);};!o&&t.mixins.length&&t.mixins.forEach(n),e.extends&&n(e.extends),e.mixins&&e.mixins.forEach(n);}if(!l&&!h)return b(e)&&r.set(e,s),s;if(p(l))for(let s=0;s<l.length;s++){const e=I(l[s]);to(e)&&(a[e]=n);}else if(l)for(const n in l){const e=I(n);if(to(e)){const t=l[n],s=a[e]=p(t)||g(t)?{type:t}:c({},t);if(s){const t=oo(Boolean,s.type),n=oo(String,s.type);s[0]=t>-1,s[1]=n<0||t<n,(t>-1||d(s,"default"))&&u.push(e);}}}const f=[a,u];return b(e)&&r.set(e,f),f}function to(e){return "$"!==e[0]&&!w(e)}function no(e){const t=e&&e.toString().match(/^\s*(function|class) (\w+)/);return t?t[2]:null===e?"null":""}function so(e,t){return no(e)===no(t)}function oo(e,t){return p(t)?t.findIndex((t=>so(t,e))):g(t)&&so(t,e)?0:-1}const ro=e=>"_"===e[0]||"$stable"===e,io=e=>p(e)?e.map(nr):[nr(e)],lo=(e,t,n)=>{if(t._n)return t;const s=gn(((...e)=>io(t(...e))),n);return s._c=!1,s},co=(e,t,n)=>{const s=e._ctx;for(const o in e){if(ro(o))continue;const n=e[o];if(g(n))t[o]=lo(0,n,s);else if(null!=n){const e=io(n);t[o]=()=>e;}}},ao=(e,t)=>{const n=io(t);e.slots.default=()=>n;},uo=(e,t)=>{if(32&e.vnode.shapeFlag){const n=t._;n?(e.slots=Ct(t),$(t,"_",n)):co(t,e.slots={});}else e.slots={},t&&ao(e,t);$(e.slots,Go,1);},po=(e,t,s)=>{const{vnode:o,slots:r}=e;let i=!0,l=n;if(32&o.shapeFlag){const e=t._;e?s&&1===e?i=!1:(c(r,t),s||1!==e||delete r._):(i=!t.$stable,co(t,r)),l=t;}else t&&(ao(e,t),l={default:1});if(i)for(const n in r)ro(n)||null!=l[n]||delete r[n];};function ho(e,t,s,o,r=!1){if(p(e))return void e.forEach(((e,n)=>ho(e,t&&(p(t)?t[n]:t),s,o,r)));if(ss(o)&&!r)return;const i=4&o.shapeFlag?Cr(o.component)||o.component.proxy:o.el,l=r?null:i,{i:c,r:u}=e,h=t&&t.r,f=c.refs===n?c.refs={}:c.refs,m=c.setupState;if(null!=h&&h!==u&&(y(h)?(f[h]=null,d(m,h)&&(m[h]=null)):It(h)&&(h.value=null)),g(u))jt(u,c,12,[l,f]);else {const t=y(u),n=It(u);if(t||n){const o=()=>{if(e.f){const n=t?d(m,u)?m[u]:f[u]:u.value;r?p(n)&&a(n,i):p(n)?n.includes(i)||n.push(i):t?(f[u]=[i],d(m,u)&&(m[u]=f[u])):(u.value=[i],e.k&&(f[e.k]=u.value));}else t?(f[u]=l,d(m,u)&&(m[u]=l)):n&&(u.value=l,e.k&&(f[e.k]=l));};l?(o.id=-1,vo(o,s)):o();}}}let fo=!1;const mo=e=>(e=>e.namespaceURI.includes("svg")&&"foreignObject"!==e.tagName)(e)?"svg":(e=>e.namespaceURI.includes("MathML"))(e)?"mathml":void 0,go=e=>8===e.nodeType;function yo(e){const{mt:t,p:n,o:{patchProp:s,createText:o,nextSibling:r,parentNode:l,remove:c,insert:a,createComment:u}}=e,d=(n,s,i,c,u,b=!1)=>{const _=go(n)&&"["===n.data,S=()=>m(n,s,i,c,u,_),{type:x,ref:C,shapeFlag:k,patchFlag:T}=s;let w=n.nodeType;s.el=n,-2===T&&(b=!1,s.dynamicChildren=null);let E=null;switch(x){case Mo:3!==w?""===s.children?(a(s.el=o(""),l(n),n),E=n):E=S():(n.data!==s.children&&(fo=!0,n.data=s.children),E=r(n));break;case Po:v(n)?(E=r(n),y(s.el=n.content.firstChild,n,i)):E=8!==w||_?S():r(n);break;case $o:if(_&&(w=(n=r(n)).nodeType),1===w||3===w){E=n;const e=!s.children.length;for(let t=0;t<s.staticCount;t++)e&&(s.children+=1===E.nodeType?E.outerHTML:E.data),t===s.staticCount-1&&(s.anchor=E),E=r(E);return _?r(E):E}S();break;case Fo:E=_?f(n,s,i,c,u,b):S();break;default:if(1&k)E=1===w&&s.type.toLowerCase()===n.tagName.toLowerCase()||v(n)?p(n,s,i,c,u,b):S();else if(6&k){s.slotScopeIds=u;const e=l(n);if(E=_?g(n):go(n)&&"teleport start"===n.data?g(n,n.data,"teleport end"):r(n),t(s,e,null,i,c,mo(e),b),ss(s)){let t;_?(t=Zo(Fo),t.anchor=E?E.previousSibling:e.lastChild):t=3===n.nodeType?tr(""):Zo("div"),t.el=n,s.component.subTree=t;}}else 64&k?E=8!==w?S():s.type.hydrate(n,s,i,c,u,b,e,h):128&k&&(E=s.type.hydrate(n,s,i,c,mo(l(n)),u,b,e,d));}return null!=C&&ho(C,null,c,s),E},p=(e,t,n,o,r,l)=>{l=l||!!t.dynamicChildren;const{type:a,props:u,patchFlag:d,shapeFlag:p,dirs:f,transition:m}=t,g="input"===a||"option"===a;if(g||-1!==d){f&&Hn(t,null,n,"created");let a,b=!1;if(v(e)){b=ko(o,m)&&n&&n.vnode.props&&n.vnode.props.appear;const s=e.content.firstChild;b&&m.beforeEnter(s),y(s,e,n),t.el=e=s;}if(16&p&&(!u||!u.innerHTML&&!u.textContent)){let s=h(e.firstChild,t,e,n,o,r,l);for(;s;){fo=!0;const e=s;s=s.nextSibling,c(e);}}else 8&p&&e.textContent!==t.children&&(fo=!0,e.textContent=t.children);if(u)if(g||!l||48&d)for(const t in u)(g&&(t.endsWith("value")||"indeterminate"===t)||i(t)&&!w(t)||"."===t[0])&&s(e,t,null,u[t],void 0,void 0,n);else u.onClick&&s(e,"onClick",null,u.onClick,void 0,void 0,n);(a=u&&u.onVnodeBeforeMount)&&ir(a,n,t),f&&Hn(t,null,n,"beforeMount"),((a=u&&u.onVnodeMounted)||f||b)&&On((()=>{a&&ir(a,n,t),b&&m.enter(e),f&&Hn(t,null,n,"mounted");}),o);}return e.nextSibling},h=(e,t,s,o,r,i,l)=>{l=l||!!t.dynamicChildren;const c=t.children,a=c.length;for(let u=0;u<a;u++){const t=l?c[u]:c[u]=nr(c[u]);if(e)e=d(e,t,o,r,i,l);else {if(t.type===Mo&&!t.children)continue;fo=!0,n(null,t,s,null,o,r,mo(s),i);}}return e},f=(e,t,n,s,o,i)=>{const{slotScopeIds:c}=t;c&&(o=o?o.concat(c):c);const d=l(e),p=h(r(e),t,d,n,s,o,i);return p&&go(p)&&"]"===p.data?r(t.anchor=p):(fo=!0,a(t.anchor=u("]"),d,p),p)},m=(e,t,s,o,i,a)=>{if(fo=!0,t.el=null,a){const t=g(e);for(;;){const n=r(e);if(!n||n===t)break;c(n);}}const u=r(e),d=l(e);return c(e),n(null,t,d,u,s,o,mo(d),i),u},g=(e,t="[",n="]")=>{let s=0;for(;e;)if((e=r(e))&&go(e)&&(e.data===t&&s++,e.data===n)){if(0===s)return r(e);s--;}return e},y=(e,t,n)=>{const s=t.parentNode;s&&s.replaceChild(e,t);let o=n;for(;o;)o.vnode.el===t&&(o.vnode.el=o.subTree.el=e),o=o.parent;},v=e=>1===e.nodeType&&"template"===e.tagName.toLowerCase();return [(e,t)=>{if(!t.hasChildNodes())return n(null,e,t),rn(),void(t._vnode=e);fo=!1,d(t.firstChild,e,null,null,null),rn(),t._vnode=e,fo&&console.error("Hydration completed but contains mismatches.");},d]}const vo=On;function bo(e){return So(e)}function _o(e){return So(e,yo)}function So(e,t){U().__VUE__=!0;const{insert:r,remove:i,patchProp:l,createElement:c,createText:a,createComment:u,setText:p,setElementText:h,parentNode:f,nextSibling:m,setScopeId:g=o,insertStaticContent:y}=e,v=(e,t,n,s=null,o=null,r=null,i=void 0,l=null,c=!!t.dynamicChildren)=>{if(e===t)return;e&&!zo(e,t)&&(s=Q(e),K(e,o,r,!0),e=null),-2===t.patchFlag&&(c=!1,t.dynamicChildren=null);const{type:a,ref:u,shapeFlag:d}=t;switch(a){case Mo:b(e,t,n,s);break;case Po:S(e,t,n,s);break;case $o:null==e&&x(t,n,s,i);break;case Fo:L(e,t,n,s,o,r,i,l,c);break;default:1&d?C(e,t,n,s,o,r,i,l,c):6&d?F(e,t,n,s,o,r,i,l,c):(64&d||128&d)&&a.process(e,t,n,s,o,r,i,l,c,ee);}null!=u&&o&&ho(u,e&&e.ref,r,t||e,!t);},b=(e,t,n,s)=>{if(null==e)r(t.el=a(t.children),n,s);else {const n=t.el=e.el;t.children!==e.children&&p(n,t.children);}},S=(e,t,n,s)=>{null==e?r(t.el=u(t.children||""),n,s):t.el=e.el;},x=(e,t,n,s)=>{[e.el,e.anchor]=y(e.children,t,n,s,e.el,e.anchor);},C=(e,t,n,s,o,r,i,l,c)=>{"svg"===t.type?i="svg":"math"===t.type&&(i="mathml"),null==e?k(t,n,s,o,r,i,l,c):N(e,t,o,r,i,l,c);},k=(e,t,n,s,o,i,a,u)=>{let d,p;const{props:f,shapeFlag:m,transition:g,dirs:y}=e;if(d=e.el=c(e.type,i,f&&f.is,f),8&m?h(d,e.children):16&m&&E(e.children,d,null,s,o,xo(e,i),a,u),y&&Hn(e,null,s,"created"),T(d,e,e.scopeId,a,s),f){for(const t in f)"value"===t||w(t)||l(d,t,null,f[t],i,e.children,s,o,X);"value"in f&&l(d,"value",null,f.value,i),(p=f.onVnodeBeforeMount)&&ir(p,s,e);}y&&Hn(e,null,s,"beforeMount");const v=ko(o,g);v&&g.beforeEnter(d),r(d,t,n),((p=f&&f.onVnodeMounted)||v||y)&&vo((()=>{p&&ir(p,s,e),v&&g.enter(d),y&&Hn(e,null,s,"mounted");}),o);},T=(e,t,n,s,o)=>{if(n&&g(e,n),s)for(let r=0;r<s.length;r++)g(e,s[r]);if(o){if(t===o.subTree){const t=o.vnode;T(e,t,t.scopeId,t.slotScopeIds,o.parent);}}},E=(e,t,n,s,o,r,i,l,c=0)=>{for(let a=c;a<e.length;a++){const c=e[a]=l?sr(e[a]):nr(e[a]);v(null,c,t,n,s,o,r,i,l);}},N=(e,t,s,o,r,i,c)=>{const a=t.el=e.el;let{patchFlag:u,dynamicChildren:d,dirs:p}=t;u|=16&e.patchFlag;const f=e.props||n,m=t.props||n;let g;if(s&&Co(s,!1),(g=m.onVnodeBeforeUpdate)&&ir(g,s,t,e),p&&Hn(t,e,s,"beforeUpdate"),s&&Co(s,!0),d?A(e.dynamicChildren,d,a,s,o,xo(t,r),i):c||j(e,t,a,null,s,o,xo(t,r),i,!1),u>0){if(16&u)R(a,t,f,m,s,o,r);else if(2&u&&f.class!==m.class&&l(a,"class",null,m.class,r),4&u&&l(a,"style",f.style,m.style,r),8&u){const n=t.dynamicProps;for(let t=0;t<n.length;t++){const i=n[t],c=f[i],u=m[i];u===c&&"value"!==i||l(a,i,c,u,r,e.children,s,o,X);}}1&u&&e.children!==t.children&&h(a,t.children);}else c||null!=d||R(a,t,f,m,s,o,r);((g=m.onVnodeUpdated)||p)&&vo((()=>{g&&ir(g,s,t,e),p&&Hn(t,e,s,"updated");}),o);},A=(e,t,n,s,o,r,i)=>{for(let l=0;l<t.length;l++){const c=e[l],a=t[l],u=c.el&&(c.type===Fo||!zo(c,a)||70&c.shapeFlag)?f(c.el):n;v(c,a,u,null,s,o,r,i,!0);}},R=(e,t,s,o,r,i,c)=>{if(s!==o){if(s!==n)for(const n in s)w(n)||n in o||l(e,n,s[n],null,c,t.children,r,i,X);for(const n in o){if(w(n))continue;const a=o[n],u=s[n];a!==u&&"value"!==n&&l(e,n,u,a,c,t.children,r,i,X);}"value"in o&&l(e,"value",s.value,o.value,c);}},L=(e,t,n,s,o,i,l,c,u)=>{const d=t.el=e?e.el:a(""),p=t.anchor=e?e.anchor:a("");let{patchFlag:h,dynamicChildren:f,slotScopeIds:m}=t;m&&(c=c?c.concat(m):m),null==e?(r(d,n,s),r(p,n,s),E(t.children||[],n,p,o,i,l,c,u)):h>0&&64&h&&f&&e.dynamicChildren?(A(e.dynamicChildren,f,n,o,i,l,c),(null!=t.key||o&&t===o.subTree)&&To(e,t,!0)):j(e,t,n,p,o,i,l,c,u);},F=(e,t,n,s,o,r,i,l,c)=>{t.slotScopeIds=l,null==e?512&t.shapeFlag?o.ctx.activate(t,n,s,i,c):M(t,n,s,o,r,i,c):B(e,t,c);},M=(e,t,s,o,r,i,l)=>{const c=e.component=function(e,t,s){const o=e.type,r=(t?t.appContext:e.appContext)||lr,i={uid:cr++,vnode:e,type:o,parent:t,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,scope:new le(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(r.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:eo(o,r),emitsOptions:dn(o,r),emit:null,emitted:null,propsDefaults:n,inheritAttrs:o.inheritAttrs,ctx:n,data:n,props:n,attrs:n,slots:n,refs:n,setupState:n,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:s,suspenseId:s?s.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};i.ctx={_:i},i.root=t?t.root:i,i.emit=un.bind(null,i),e.ce&&e.ce(i);return i}(e,o,r);if(rs(e)&&(c.ctx.renderer=ee),function(e,t=!1){t&&pr(t);const{props:n,children:s}=e.vnode,o=mr(e);(function(e,t,n,s=!1){const o={},r={};$(r,Go,1),e.propsDefaults=Object.create(null),Zs(e,t,o,r);for(const i in e.propsOptions[0])i in o||(o[i]=void 0);e.props=n?s?o:gt(o):e.type.props?o:r,e.attrs=r;})(e,n,o,t),uo(e,s);o?function(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=kt(new Proxy(e.ctx,Is));const{setup:s}=n;if(s){const n=e.setupContext=s.length>1?xr(e):null,o=hr(e);ve();const r=jt(s,e,0,[e.props,n]);if(be(),o(),_(r)){if(r.then(fr,fr),t)return r.then((n=>{br(e,n,t);})).catch((t=>{qt(t,e,0);}));e.asyncDep=r;}else br(e,r,t);}else Sr(e,t);}(e,t):void 0;t&&pr(!1);}(c),c.asyncDep){if(r&&r.registerDep(c,V),!e.el){const e=c.subTree=Zo(Po);S(null,e,t,s);}}else V(c,e,t,s,r,i,l);},B=(e,t,n)=>{const s=t.component=e.component;if(function(e,t,n){const{props:s,children:o,component:r}=e,{props:i,children:l,patchFlag:c}=t,a=r.emitsOptions;if(t.dirs||t.transition)return !0;if(!(n&&c>=0))return !(!o&&!l||l&&l.$stable)||s!==i&&(s?!i||_n(s,i,a):!!i);if(1024&c)return !0;if(16&c)return s?_n(s,i,a):!!i;if(8&c){const e=t.dynamicProps;for(let t=0;t<e.length;t++){const n=e[t];if(i[n]!==s[n]&&!pn(a,n))return !0}}return !1}(e,t,n)){if(s.asyncDep&&!s.asyncResolved)return void D(s,t,n);s.next=t,function(e){const t=zt.indexOf(e);t>Gt&&zt.splice(t,1);}(s.update),s.effect.dirty=!0,s.update();}else t.el=e.el,s.vnode=t;},V=(e,t,n,s,r,i,l)=>{const c=()=>{if(e.isMounted){let{next:t,bu:n,u:s,parent:o,vnode:a}=e;{const n=wo(e);if(n)return t&&(t.el=a.el,D(e,t,l)),void n.asyncDep.then((()=>{e.isUnmounted||c();}))}let u,d=t;Co(e,!1),t?(t.el=a.el,D(e,t,l)):t=a,n&&P(n),(u=t.props&&t.props.onVnodeBeforeUpdate)&&ir(u,o,t,a),Co(e,!0);const p=yn(e),h=e.subTree;e.subTree=p,v(h,p,f(h.el),Q(h),e,r,i),t.el=p.el,null===d&&Sn(e,p.el),s&&vo(s,r),(u=t.props&&t.props.onVnodeUpdated)&&vo((()=>ir(u,o,t,a)),r);}else {let o;const{el:l,props:c}=t,{bm:a,m:u,parent:d}=e,p=ss(t);if(Co(e,!1),a&&P(a),!p&&(o=c&&c.onVnodeBeforeMount)&&ir(o,d,t),Co(e,!0),l&&ne){const n=()=>{e.subTree=yn(e),ne(l,e.subTree,e,r,null);};p?t.type.__asyncLoader().then((()=>!e.isUnmounted&&n())):n();}else {const o=e.subTree=yn(e);v(null,o,n,s,e,r,i),t.el=o.el;}if(u&&vo(u,r),!p&&(o=c&&c.onVnodeMounted)){const e=t;vo((()=>ir(o,d,e)),r);}(256&t.shapeFlag||d&&ss(d.vnode)&&256&d.vnode.shapeFlag)&&e.a&&vo(e.a,r),e.isMounted=!0,t=n=s=null;}},a=e.effect=new ue(c,o,(()=>tn(u)),e.scope),u=e.update=()=>{a.dirty&&a.run();};u.id=e.uid,Co(e,!0),u();},D=(e,t,n)=>{t.component=e;const s=e.vnode.props;e.vnode=t,e.next=null,function(e,t,n,s){const{props:o,attrs:r,vnode:{patchFlag:i}}=e,l=Ct(o),[c]=e.propsOptions;let a=!1;if(!(s||i>0)||16&i){let s;Zs(e,t,o,r)&&(a=!0);for(const r in l)t&&(d(t,r)||(s=O(r))!==r&&d(t,s))||(c?!n||void 0===n[r]&&void 0===n[s]||(o[r]=Ys(c,l,r,void 0,e,!0)):delete o[r]);if(r!==l)for(const e in r)t&&d(t,e)||(delete r[e],a=!0);}else if(8&i){const n=e.vnode.dynamicProps;for(let s=0;s<n.length;s++){let i=n[s];if(pn(e.emitsOptions,i))continue;const u=t[i];if(c)if(d(r,i))u!==r[i]&&(r[i]=u,a=!0);else {const t=I(i);o[t]=Ys(c,l,t,u,e,!1);}else u!==r[i]&&(r[i]=u,a=!0);}}a&&Ie(e,"set","$attrs");}(e,t.props,s,n),po(e,t.children,n),ve(),on(e),be();},j=(e,t,n,s,o,r,i,l,c=!1)=>{const a=e&&e.children,u=e?e.shapeFlag:0,d=t.children,{patchFlag:p,shapeFlag:f}=t;if(p>0){if(128&p)return void q(a,d,n,s,o,r,i,l,c);if(256&p)return void H(a,d,n,s,o,r,i,l,c)}8&f?(16&u&&X(a,o,r),d!==a&&h(n,d)):16&u?16&f?q(a,d,n,s,o,r,i,l,c):X(a,o,r,!0):(8&u&&h(n,""),16&f&&E(d,n,s,o,r,i,l,c));},H=(e,t,n,o,r,i,l,c,a)=>{const u=(e=e||s).length,d=(t=t||s).length,p=Math.min(u,d);let h;for(h=0;h<p;h++){const s=t[h]=a?sr(t[h]):nr(t[h]);v(e[h],s,n,null,r,i,l,c,a);}u>d?X(e,r,i,!0,!1,p):E(t,n,o,r,i,l,c,a,p);},q=(e,t,n,o,r,i,l,c,a)=>{let u=0;const d=t.length;let p=e.length-1,h=d-1;for(;u<=p&&u<=h;){const s=e[u],o=t[u]=a?sr(t[u]):nr(t[u]);if(!zo(s,o))break;v(s,o,n,null,r,i,l,c,a),u++;}for(;u<=p&&u<=h;){const s=e[p],o=t[h]=a?sr(t[h]):nr(t[h]);if(!zo(s,o))break;v(s,o,n,null,r,i,l,c,a),p--,h--;}if(u>p){if(u<=h){const e=h+1,s=e<d?t[e].el:o;for(;u<=h;)v(null,t[u]=a?sr(t[u]):nr(t[u]),n,s,r,i,l,c,a),u++;}}else if(u>h)for(;u<=p;)K(e[u],r,i,!0),u++;else {const f=u,m=u,g=new Map;for(u=m;u<=h;u++){const e=t[u]=a?sr(t[u]):nr(t[u]);null!=e.key&&g.set(e.key,u);}let y,b=0;const _=h-m+1;let S=!1,x=0;const C=new Array(_);for(u=0;u<_;u++)C[u]=0;for(u=f;u<=p;u++){const s=e[u];if(b>=_){K(s,r,i,!0);continue}let o;if(null!=s.key)o=g.get(s.key);else for(y=m;y<=h;y++)if(0===C[y-m]&&zo(s,t[y])){o=y;break}void 0===o?K(s,r,i,!0):(C[o-m]=u+1,o>=x?x=o:S=!0,v(s,t[o],n,null,r,i,l,c,a),b++);}const k=S?function(e){const t=e.slice(),n=[0];let s,o,r,i,l;const c=e.length;for(s=0;s<c;s++){const c=e[s];if(0!==c){if(o=n[n.length-1],e[o]<c){t[s]=o,n.push(s);continue}for(r=0,i=n.length-1;r<i;)l=r+i>>1,e[n[l]]<c?r=l+1:i=l;c<e[n[r]]&&(r>0&&(t[s]=n[r-1]),n[r]=s);}}r=n.length,i=n[r-1];for(;r-- >0;)n[r]=i,i=t[i];return n}(C):s;for(y=k.length-1,u=_-1;u>=0;u--){const e=m+u,s=t[e],p=e+1<d?t[e+1].el:o;0===C[u]?v(null,s,n,p,r,i,l,c,a):S&&(y<0||u!==k[y]?W(s,n,p,2):y--);}}},W=(e,t,n,s,o=null)=>{const{el:i,type:l,transition:c,children:a,shapeFlag:u}=e;if(6&u)return void W(e.component.subTree,t,n,s);if(128&u)return void e.suspense.move(t,n,s);if(64&u)return void l.move(e,t,n,ee);if(l===Fo){r(i,t,n);for(let e=0;e<a.length;e++)W(a[e],t,n,s);return void r(e.anchor,t,n)}if(l===$o)return void(({el:e,anchor:t},n,s)=>{let o;for(;e&&e!==t;)o=m(e),r(e,n,s),e=o;r(t,n,s);})(e,t,n);if(2!==s&&1&u&&c)if(0===s)c.beforeEnter(i),r(i,t,n),vo((()=>c.enter(i)),o);else {const{leave:e,delayLeave:s,afterLeave:o}=c,l=()=>r(i,t,n),a=()=>{e(i,(()=>{l(),o&&o();}));};s?s(i,l,a):a();}else r(i,t,n);},K=(e,t,n,s=!1,o=!1)=>{const{type:r,props:i,ref:l,children:c,dynamicChildren:a,shapeFlag:u,patchFlag:d,dirs:p}=e;if(null!=l&&ho(l,null,n,e,!0),256&u)return void t.ctx.deactivate(e);const h=1&u&&p,f=!ss(e);let m;if(f&&(m=i&&i.onVnodeBeforeUnmount)&&ir(m,t,e),6&u)J(e.component,n,s);else {if(128&u)return void e.suspense.unmount(n,s);h&&Hn(e,null,t,"beforeUnmount"),64&u?e.type.remove(e,t,n,o,ee,s):a&&(r!==Fo||d>0&&64&d)?X(a,t,n,!1,!0):(r===Fo&&384&d||!o&&16&u)&&X(c,t,n),s&&z(e);}(f&&(m=i&&i.onVnodeUnmounted)||h)&&vo((()=>{m&&ir(m,t,e),h&&Hn(e,null,t,"unmounted");}),n);},z=e=>{const{type:t,el:n,anchor:s,transition:o}=e;if(t===Fo)return void G(n,s);if(t===$o)return void(({el:e,anchor:t})=>{let n;for(;e&&e!==t;)n=m(e),i(e),e=n;i(t);})(e);const r=()=>{i(n),o&&!o.persisted&&o.afterLeave&&o.afterLeave();};if(1&e.shapeFlag&&o&&!o.persisted){const{leave:t,delayLeave:s}=o,i=()=>t(n,r);s?s(e.el,r,i):i();}else r();},G=(e,t)=>{let n;for(;e!==t;)n=m(e),i(e),e=n;i(t);},J=(e,t,n)=>{const{bum:s,scope:o,update:r,subTree:i,um:l}=e;s&&P(s),o.stop(),r&&(r.active=!1,K(i,e,t,n)),l&&vo(l,t),vo((()=>{e.isUnmounted=!0;}),t),t&&t.pendingBranch&&!t.isUnmounted&&e.asyncDep&&!e.asyncResolved&&e.suspenseId===t.pendingId&&(t.deps--,0===t.deps&&t.resolve());},X=(e,t,n,s=!1,o=!1,r=0)=>{for(let i=r;i<e.length;i++)K(e[i],t,n,s,o);},Q=e=>6&e.shapeFlag?Q(e.component.subTree):128&e.shapeFlag?e.suspense.next():m(e.anchor||e.el);let Z=!1;const Y=(e,t,n)=>{null==e?t._vnode&&K(t._vnode,null,null,!0):v(t._vnode||null,e,t,null,null,null,n),Z||(Z=!0,on(),rn(),Z=!1),t._vnode=e;},ee={p:v,um:K,m:W,r:z,mt:M,mc:E,pc:j,pbc:A,n:Q,o:e};let te,ne;return t&&([te,ne]=t(ee)),{render:Y,hydrate:te,createApp:Gs(Y,te)}}function xo({type:e,props:t},n){return "svg"===n&&"foreignObject"===e||"mathml"===n&&"annotation-xml"===e&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function Co({effect:e,update:t},n){e.allowRecurse=t.allowRecurse=n;}function ko(e,t){return (!e||e&&!e.pendingBranch)&&t&&!t.persisted}function To(e,t,n=!1){const s=e.children,o=t.children;if(p(s)&&p(o))for(let r=0;r<s.length;r++){const e=s[r];let t=o[r];1&t.shapeFlag&&!t.dynamicChildren&&((t.patchFlag<=0||32===t.patchFlag)&&(t=o[r]=sr(o[r]),t.el=e.el),n||To(e,t)),t.type===Mo&&(t.el=e.el);}}function wo(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:wo(t)}const Eo=e=>e&&(e.disabled||""===e.disabled),No=e=>"undefined"!=typeof SVGElement&&e instanceof SVGElement,Ao=e=>"function"==typeof MathMLElement&&e instanceof MathMLElement,Io=(e,t)=>{const n=e&&e.to;if(y(n)){if(t){return t(n)}return null}return n};function Ro(e,t,n,{o:{insert:s},m:o},r=2){0===r&&s(e.targetAnchor,t,n);const{el:i,anchor:l,shapeFlag:c,children:a,props:u}=e,d=2===r;if(d&&s(i,t,n),(!d||Eo(u))&&16&c)for(let p=0;p<a.length;p++)o(a[p],t,n,2);d&&s(l,t,n);}const Oo={name:"Teleport",__isTeleport:!0,process(e,t,n,s,o,r,i,l,c,a){const{mc:u,pc:d,pbc:p,o:{insert:h,querySelector:f,createText:m}}=a,g=Eo(t.props);let{shapeFlag:y,children:v,dynamicChildren:b}=t;if(null==e){const e=t.el=m(""),a=t.anchor=m("");h(e,n,s),h(a,n,s);const d=t.target=Io(t.props,f),p=t.targetAnchor=m("");d&&(h(p,d),"svg"===i||No(d)?i="svg":("mathml"===i||Ao(d))&&(i="mathml"));const b=(e,t)=>{16&y&&u(v,e,t,o,r,i,l,c);};g?b(n,a):d&&b(d,p);}else {t.el=e.el;const s=t.anchor=e.anchor,u=t.target=e.target,h=t.targetAnchor=e.targetAnchor,m=Eo(e.props),y=m?n:u,v=m?s:h;if("svg"===i||No(u)?i="svg":("mathml"===i||Ao(u))&&(i="mathml"),b?(p(e.dynamicChildren,b,y,o,r,i,l),To(e,t,!0)):c||d(e,t,y,v,o,r,i,l,!1),g)m?t.props&&e.props&&t.props.to!==e.props.to&&(t.props.to=e.props.to):Ro(t,n,s,a,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){const e=t.target=Io(t.props,f);e&&Ro(t,e,null,a,0);}else m&&Ro(t,u,h,a,1);}Lo(t);},remove(e,t,n,s,{um:o,o:{remove:r}},i){const{shapeFlag:l,children:c,anchor:a,targetAnchor:u,target:d,props:p}=e;if(d&&r(u),i&&r(a),16&l){const e=i||!Eo(p);for(let s=0;s<c.length;s++){const r=c[s];o(r,t,n,e,!!r.dynamicChildren);}}},move:Ro,hydrate:function(e,t,n,s,o,r,{o:{nextSibling:i,parentNode:l,querySelector:c}},a){const u=t.target=Io(t.props,c);if(u){const c=u._lpa||u.firstChild;if(16&t.shapeFlag)if(Eo(t.props))t.anchor=a(i(e),t,l(e),n,s,o,r),t.targetAnchor=c;else {t.anchor=i(e);let l=c;for(;l;)if(l=i(l),l&&8===l.nodeType&&"teleport anchor"===l.data){t.targetAnchor=l,u._lpa=t.targetAnchor&&i(t.targetAnchor);break}a(c,t,u,n,s,o,r);}Lo(t);}return t.anchor&&i(t.anchor)}};function Lo(e){const t=e.ctx;if(t&&t.ut){let n=e.children[0].el;for(;n&&n!==e.targetAnchor;)1===n.nodeType&&n.setAttribute("data-v-owner",t.uid),n=n.nextSibling;t.ut();}}const Fo=Symbol.for("v-fgt"),Mo=Symbol.for("v-txt"),Po=Symbol.for("v-cmt"),$o=Symbol.for("v-stc"),Bo=[];let Vo=null;function Do(e=!1){Bo.push(Vo=e?null:[]);}function Uo(){Bo.pop(),Vo=Bo[Bo.length-1]||null;}let jo=1;function Ho(e){jo+=e;}function qo(e){return e.dynamicChildren=jo>0?Vo||s:null,Uo(),jo>0&&Vo&&Vo.push(e),e}function Wo(e,t,n,s,o){return qo(Zo(e,t,n,s,o,!0))}function Ko(e){return !!e&&!0===e.__v_isVNode}function zo(e,t){return e.type===t.type&&e.key===t.key}const Go="__vInternal",Jo=({key:e})=>null!=e?e:null,Xo=({ref:e,ref_key:t,ref_for:n})=>("number"==typeof e&&(e=""+e),null!=e?y(e)||It(e)||g(e)?{i:hn,r:e,k:t,f:!!n}:e:null);function Qo(e,t=null,n=null,s=0,o=null,r=(e===Fo?0:1),i=!1,l=!1){const c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Jo(t),ref:t&&Xo(t),scopeId:fn,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:s,dynamicProps:o,dynamicChildren:null,appContext:null,ctx:hn};return l?(or(c,n),128&r&&e.normalize(c)):n&&(c.shapeFlag|=y(n)?8:16),jo>0&&!i&&Vo&&(c.patchFlag>0||6&r)&&32!==c.patchFlag&&Vo.push(c),c}const Zo=function(e,t=null,n=null,s=0,o=null,r=!1){e&&e!==Cn||(e=Po);if(Ko(e)){const s=er(e,t,!0);return n&&or(s,n),jo>0&&!r&&Vo&&(6&s.shapeFlag?Vo[Vo.indexOf(e)]=s:Vo.push(s)),s.patchFlag|=-2,s}i=e,g(i)&&"__vccOpts"in i&&(e=e.__vccOpts);var i;if(t){t=Yo(t);let{class:e,style:n}=t;e&&!y(e)&&(t.class=G(e)),b(n)&&(xt(n)&&!p(n)&&(n=c({},n)),t.style=H(n));}const l=y(e)?1:wn(e)?128:(e=>e.__isTeleport)(e)?64:b(e)?4:g(e)?2:0;return Qo(e,t,n,s,o,l,r,!0)};function Yo(e){return e?xt(e)||Go in e?c({},e):e:null}function er(e,t,n=!1){const{props:s,ref:o,patchFlag:r,children:i}=e,l=t?rr(s||{},t):s;return {__v_isVNode:!0,__v_skip:!0,type:e.type,props:l,key:l&&Jo(l),ref:t&&t.ref?n&&o?p(o)?o.concat(Xo(t)):[o,Xo(t)]:Xo(t):o,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:i,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Fo?-1===r?16:16|r:r,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&er(e.ssContent),ssFallback:e.ssFallback&&er(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce}}function tr(e=" ",t=0){return Zo(Mo,null,e,t)}function nr(e){return null==e||"boolean"==typeof e?Zo(Po):p(e)?Zo(Fo,null,e.slice()):"object"==typeof e?sr(e):Zo(Mo,null,String(e))}function sr(e){return null===e.el&&-1!==e.patchFlag||e.memo?e:er(e)}function or(e,t){let n=0;const{shapeFlag:s}=e;if(null==t)t=null;else if(p(t))n=16;else if("object"==typeof t){if(65&s){const n=t.default;return void(n&&(n._c&&(n._d=!1),or(e,n()),n._c&&(n._d=!0)))}{n=32;const s=t._;s||Go in t?3===s&&hn&&(1===hn.slots._?t._=1:(t._=2,e.patchFlag|=1024)):t._ctx=hn;}}else g(t)?(t={default:t,_ctx:hn},n=32):(t=String(t),64&s?(n=16,t=[tr(t)]):n=8);e.children=t,e.shapeFlag|=n;}function rr(...e){const t={};for(let n=0;n<e.length;n++){const s=e[n];for(const e in s)if("class"===e)t.class!==s.class&&(t.class=G([t.class,s.class]));else if("style"===e)t.style=H([t.style,s.style]);else if(i(e)){const n=t[e],o=s[e];!o||n===o||p(n)&&n.includes(o)||(t[e]=n?[].concat(n,o):o);}else ""!==e&&(t[e]=s[e]);}return t}function ir(e,t,n,s=null){Ht(e,t,7,[n,s]);}const lr=Ks();let cr=0;let ar=null;const ur=()=>ar||hn;let dr,pr;dr=e=>{ar=e;},pr=e=>{vr=e;};const hr=e=>{const t=ar;return dr(e),e.scope.on(),()=>{e.scope.off(),dr(t);}},fr=()=>{ar&&ar.scope.off(),dr(null);};function mr(e){return 4&e.vnode.shapeFlag}let gr,yr,vr=!1;function br(e,t,n){g(t)?e.render=t:b(t)&&(e.setupState=Pt(t)),Sr(e,n);}function _r(e){gr=e,yr=e=>{e.render._rc&&(e.withProxy=new Proxy(e.ctx,Rs));};}function Sr(e,t,n){const s=e.type;if(!e.render){if(!t&&gr&&!s.render){const t=s.template||Bs(e).template;if(t){const{isCustomElement:n,compilerOptions:o}=e.appContext.config,{delimiters:r,compilerOptions:i}=s,l=c(c({isCustomElement:n,delimiters:r},o),i);s.render=gr(t,l);}}e.render=s.render||o,yr&&yr(e);}{const t=hr(e);ve();try{Ms(e);}finally{be(),t();}}}function xr(e){const t=t=>{e.exposed=t||{};};return {get attrs(){return function(e){return e.attrsProxy||(e.attrsProxy=new Proxy(e.attrs,{get:(t,n)=>(Ae(e,0,"$attrs"),t[n])}))}(e)},slots:e.slots,emit:e.emit,expose:t}}function Cr(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy(Pt(kt(e.exposed)),{get:(t,n)=>n in t?t[n]:n in Ns?Ns[n](e):void 0,has:(e,t)=>t in e||t in Ns}))}function kr(e,t=!0){return g(e)?e.displayName||e.name:e.name||t&&e.__name}const Tr=(e,t)=>function(e,t,n=!1){let s,r;const i=g(e);return i?(s=e,r=o):(s=e.get,r=e.set),new Et(s,r,i||!r,n)}(e,0,vr);function wr(e,t,n){const s=arguments.length;return 2===s?b(t)&&!p(t)?Ko(t)?Zo(e,null,[t]):Zo(e,t):Zo(e,null,t):(s>3?n=Array.prototype.slice.call(arguments,2):3===s&&Ko(n)&&(n=[n]),Zo(e,t,n))}function Er(e,t){const n=e.memo;if(n.length!=t.length)return !1;for(let s=0;s<n.length;s++)if(M(n[s],t[s]))return !1;return jo>0&&Vo&&Vo.push(e),!0}const Nr="3.4.18",Ar=o,Ir=o,Rr="undefined"!=typeof document?document:null,Or=Rr&&Rr.createElement("template"),Lr={insert:(e,t,n)=>{t.insertBefore(e,n||null);},remove:e=>{const t=e.parentNode;t&&t.removeChild(e);},createElement:(e,t,n,s)=>{const o="svg"===t?Rr.createElementNS("http://www.w3.org/2000/svg",e):"mathml"===t?Rr.createElementNS("http://www.w3.org/1998/Math/MathML",e):Rr.createElement(e,n?{is:n}:void 0);return "select"===e&&s&&null!=s.multiple&&o.setAttribute("multiple",s.multiple),o},createText:e=>Rr.createTextNode(e),createComment:e=>Rr.createComment(e),setText:(e,t)=>{e.nodeValue=t;},setElementText:(e,t)=>{e.textContent=t;},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>Rr.querySelector(e),setScopeId(e,t){e.setAttribute(t,"");},insertStaticContent(e,t,n,s,o,r){const i=n?n.previousSibling:t.lastChild;if(o&&(o===r||o.nextSibling))for(;t.insertBefore(o.cloneNode(!0),n),o!==r&&(o=o.nextSibling););else {Or.innerHTML="svg"===s?`<svg>${e}</svg>`:"mathml"===s?`<math>${e}</math>`:e;const o=Or.content;if("svg"===s||"mathml"===s){const e=o.firstChild;for(;e.firstChild;)o.appendChild(e.firstChild);o.removeChild(e);}t.insertBefore(o,n);}return [i?i.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},Fr="transition",Mr="animation",Pr=Symbol("_vtc"),$r=(e,{slots:t})=>wr(Jn,jr(e),t);$r.displayName="Transition";const Br={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},Vr=$r.props=c({},Gn,Br),Dr=(e,t=[])=>{p(e)?e.forEach((e=>e(...t))):e&&e(...t);},Ur=e=>!!e&&(p(e)?e.some((e=>e.length>1)):e.length>1);function jr(e){const t={};for(const c in e)c in Br||(t[c]=e[c]);if(!1===e.css)return t;const{name:n="v",type:s,duration:o,enterFromClass:r=`${n}-enter-from`,enterActiveClass:i=`${n}-enter-active`,enterToClass:l=`${n}-enter-to`,appearFromClass:a=r,appearActiveClass:u=i,appearToClass:d=l,leaveFromClass:p=`${n}-leave-from`,leaveActiveClass:h=`${n}-leave-active`,leaveToClass:f=`${n}-leave-to`}=e,m=function(e){if(null==e)return null;if(b(e))return [Hr(e.enter),Hr(e.leave)];{const t=Hr(e);return [t,t]}}(o),g=m&&m[0],y=m&&m[1],{onBeforeEnter:v,onEnter:_,onEnterCancelled:S,onLeave:x,onLeaveCancelled:C,onBeforeAppear:k=v,onAppear:T=_,onAppearCancelled:w=S}=t,E=(e,t,n)=>{Wr(e,t?d:l),Wr(e,t?u:i),n&&n();},N=(e,t)=>{e._isLeaving=!1,Wr(e,p),Wr(e,f),Wr(e,h),t&&t();},A=e=>(t,n)=>{const o=e?T:_,i=()=>E(t,e,n);Dr(o,[t,i]),Kr((()=>{Wr(t,e?a:r),qr(t,e?d:l),Ur(o)||Gr(t,s,g,i);}));};return c(t,{onBeforeEnter(e){Dr(v,[e]),qr(e,r),qr(e,i);},onBeforeAppear(e){Dr(k,[e]),qr(e,a),qr(e,u);},onEnter:A(!1),onAppear:A(!0),onLeave(e,t){e._isLeaving=!0;const n=()=>N(e,t);qr(e,p),Zr(),qr(e,h),Kr((()=>{e._isLeaving&&(Wr(e,p),qr(e,f),Ur(x)||Gr(e,s,y,n));})),Dr(x,[e,n]);},onEnterCancelled(e){E(e,!1),Dr(S,[e]);},onAppearCancelled(e){E(e,!0),Dr(w,[e]);},onLeaveCancelled(e){N(e),Dr(C,[e]);}})}function Hr(e){return V(e)}function qr(e,t){t.split(/\s+/).forEach((t=>t&&e.classList.add(t))),(e[Pr]||(e[Pr]=new Set)).add(t);}function Wr(e,t){t.split(/\s+/).forEach((t=>t&&e.classList.remove(t)));const n=e[Pr];n&&(n.delete(t),n.size||(e[Pr]=void 0));}function Kr(e){requestAnimationFrame((()=>{requestAnimationFrame(e);}));}let zr=0;function Gr(e,t,n,s){const o=e._endId=++zr,r=()=>{o===e._endId&&s();};if(n)return setTimeout(r,n);const{type:i,timeout:l,propCount:c}=Jr(e,t);if(!i)return s();const a=i+"end";let u=0;const d=()=>{e.removeEventListener(a,p),r();},p=t=>{t.target===e&&++u>=c&&d();};setTimeout((()=>{u<c&&d();}),l+1),e.addEventListener(a,p);}function Jr(e,t){const n=window.getComputedStyle(e),s=e=>(n[e]||"").split(", "),o=s(`${Fr}Delay`),r=s(`${Fr}Duration`),i=Xr(o,r),l=s(`${Mr}Delay`),c=s(`${Mr}Duration`),a=Xr(l,c);let u=null,d=0,p=0;t===Fr?i>0&&(u=Fr,d=i,p=r.length):t===Mr?a>0&&(u=Mr,d=a,p=c.length):(d=Math.max(i,a),u=d>0?i>a?Fr:Mr:null,p=u?u===Fr?r.length:c.length:0);return {type:u,timeout:d,propCount:p,hasTransform:u===Fr&&/\b(transform|all)(,|$)/.test(s(`${Fr}Property`).toString())}}function Xr(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map(((t,n)=>Qr(t)+Qr(e[n]))))}function Qr(e){return "auto"===e?0:1e3*Number(e.slice(0,-1).replace(",","."))}function Zr(){return document.body.offsetHeight}const Yr=Symbol("_vod"),ei={beforeMount(e,{value:t},{transition:n}){e[Yr]="none"===e.style.display?"":e.style.display,n&&t?n.beforeEnter(e):ti(e,t);},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e);},updated(e,{value:t,oldValue:n},{transition:s}){!t==!n&&e.style.display===e[Yr]||(s?t?(s.beforeEnter(e),ti(e,!0),s.enter(e)):s.leave(e,(()=>{ti(e,!1);})):ti(e,t));},beforeUnmount(e,{value:t}){ti(e,t);}};function ti(e,t){e.style.display=t?e[Yr]:"none";}const ni=Symbol("");function si(e,t){if(128&e.shapeFlag){const n=e.suspense;e=n.activeBranch,n.pendingBranch&&!n.isHydrating&&n.effects.push((()=>{si(n.activeBranch,t);}));}for(;e.component;)e=e.component.subTree;if(1&e.shapeFlag&&e.el)oi(e.el,t);else if(e.type===Fo)e.children.forEach((e=>si(e,t)));else if(e.type===$o){let{el:n,anchor:s}=e;for(;n&&(oi(n,t),n!==s);)n=n.nextSibling;}}function oi(e,t){if(1===e.nodeType){const n=e.style;let s="";for(const e in t)n.setProperty(`--${e}`,t[e]),s+=`--${e}: ${t[e]};`;n[ni]=s;}}const ri=/(^|;)\s*display\s*:/;const ii=/\s*!important$/;function li(e,t,n){if(p(n))n.forEach((n=>li(e,t,n)));else if(null==n&&(n=""),t.startsWith("--"))e.setProperty(t,n);else {const s=function(e,t){const n=ai[t];if(n)return n;let s=I(t);if("filter"!==s&&s in e)return ai[t]=s;s=L(s);for(let o=0;o<ci.length;o++){const n=ci[o]+s;if(n in e)return ai[t]=n}return t}(e,t);ii.test(n)?e.setProperty(O(s),n.replace(ii,""),"important"):e[s]=n;}}const ci=["Webkit","Moz","ms"],ai={};const ui="http://www.w3.org/1999/xlink";function di(e,t,n,s){e.addEventListener(t,n,s);}const pi=Symbol("_vei");function hi(e,t,n,s,o=null){const r=e[pi]||(e[pi]={}),i=r[t];if(s&&i)i.value=s;else {const[n,l]=function(e){let t;if(fi.test(e)){let n;for(t={};n=e.match(fi);)e=e.slice(0,e.length-n[0].length),t[n[0].toLowerCase()]=!0;}const n=":"===e[2]?e.slice(3):O(e.slice(2));return [n,t]}(t);if(s){const i=r[t]=function(e,t){const n=e=>{if(e._vts){if(e._vts<=n.attached)return}else e._vts=Date.now();Ht(function(e,t){if(p(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0;},t.map((e=>t=>!t._stopped&&e&&e(t)))}return t}(e,n.value),t,5,[e]);};return n.value=e,n.attached=yi(),n}(s,o);di(e,n,i,l);}else i&&(!function(e,t,n,s){e.removeEventListener(t,n,s);}(e,n,i,l),r[t]=void 0);}}const fi=/(?:Once|Passive|Capture)$/;let mi=0;const gi=Promise.resolve(),yi=()=>mi||(gi.then((()=>mi=0)),mi=Date.now());const vi=e=>111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123;
  /*! #__NO_SIDE_EFFECTS__ */
  function bi(e,t){const n=ns(e);class s extends Si{constructor(e){super(n,e,t);}}return s.def=n,s}
  /*! #__NO_SIDE_EFFECTS__ */const _i="undefined"!=typeof HTMLElement?HTMLElement:class{};class Si extends _i{constructor(e,t={},n){super(),this._def=e,this._props=t,this._instance=null,this._connected=!1,this._resolved=!1,this._numberProps=null,this._ob=null,this.shadowRoot&&n?n(this._createVNode(),this.shadowRoot):(this.attachShadow({mode:"open"}),this._def.__asyncLoader||this._resolveProps(this._def));}connectedCallback(){this._connected=!0,this._instance||(this._resolved?this._update():this._resolveDef());}disconnectedCallback(){this._connected=!1,this._ob&&(this._ob.disconnect(),this._ob=null),en((()=>{this._connected||(Yi(null,this.shadowRoot),this._instance=null);}));}_resolveDef(){this._resolved=!0;for(let n=0;n<this.attributes.length;n++)this._setAttr(this.attributes[n].name);this._ob=new MutationObserver((e=>{for(const t of e)this._setAttr(t.attributeName);})),this._ob.observe(this,{attributes:!0});const e=(e,t=!1)=>{const{props:n,styles:s}=e;let o;if(n&&!p(n))for(const r in n){const e=n[r];(e===Number||e&&e.type===Number)&&(r in this._props&&(this._props[r]=V(this._props[r])),(o||(o=Object.create(null)))[I(r)]=!0);}this._numberProps=o,t&&this._resolveProps(e),this._applyStyles(s),this._update();},t=this._def.__asyncLoader;t?t().then((t=>e(t,!0))):e(this._def);}_resolveProps(e){const{props:t}=e,n=p(t)?t:Object.keys(t||{});for(const s of Object.keys(this))"_"!==s[0]&&n.includes(s)&&this._setProp(s,this[s],!0,!1);for(const s of n.map(I))Object.defineProperty(this,s,{get(){return this._getProp(s)},set(e){this._setProp(s,e);}});}_setAttr(e){let t=this.getAttribute(e);const n=I(e);this._numberProps&&this._numberProps[n]&&(t=V(t)),this._setProp(n,t,!1);}_getProp(e){return this._props[e]}_setProp(e,t,n=!0,s=!0){t!==this._props[e]&&(this._props[e]=t,s&&this._instance&&this._update(),n&&(!0===t?this.setAttribute(O(e),""):"string"==typeof t||"number"==typeof t?this.setAttribute(O(e),t+""):t||this.removeAttribute(O(e))));}_update(){Yi(this._createVNode(),this.shadowRoot);}_createVNode(){const e=Zo(this._def,c({},this._props));return this._instance||(e.ce=e=>{this._instance=e,e.isCE=!0;const t=(e,t)=>{this.dispatchEvent(new CustomEvent(e,{detail:t}));};e.emit=(e,...n)=>{t(e,n),O(e)!==e&&t(O(e),n);};let n=this;for(;n=n&&(n.parentNode||n.host);)if(n instanceof Si){e.parent=n._instance,e.provides=n._instance.provides;break}}),e}_applyStyles(e){e&&e.forEach((e=>{const t=document.createElement("style");t.textContent=e,this.shadowRoot.appendChild(t);}));}}const xi=new WeakMap,Ci=new WeakMap,ki=Symbol("_moveCb"),Ti=Symbol("_enterCb"),wi={name:"TransitionGroup",props:c({},Vr,{tag:String,moveClass:String}),setup(e,{slots:t}){const n=ur(),s=Kn();let o,r;return bs((()=>{if(!o.length)return;const t=e.moveClass||`${e.name||"v"}-move`;if(!function(e,t,n){const s=e.cloneNode(),o=e[Pr];o&&o.forEach((e=>{e.split(/\s+/).forEach((e=>e&&s.classList.remove(e)));}));n.split(/\s+/).forEach((e=>e&&s.classList.add(e))),s.style.display="none";const r=1===t.nodeType?t:t.parentNode;r.appendChild(s);const{hasTransform:i}=Jr(s);return r.removeChild(s),i}(o[0].el,n.vnode.el,t))return;o.forEach(Ni),o.forEach(Ai);const s=o.filter(Ii);Zr(),s.forEach((e=>{const n=e.el,s=n.style;qr(n,t),s.transform=s.webkitTransform=s.transitionDuration="";const o=n[ki]=e=>{e&&e.target!==n||e&&!/transform$/.test(e.propertyName)||(n.removeEventListener("transitionend",o),n[ki]=null,Wr(n,t));};n.addEventListener("transitionend",o);}));})),()=>{const i=Ct(e),l=jr(i);let c=i.tag||Fo;o=r,r=t.default?ts(t.default()):[];for(let e=0;e<r.length;e++){const t=r[e];null!=t.key&&es(t,Qn(t,l,s,n));}if(o)for(let e=0;e<o.length;e++){const t=o[e];es(t,Qn(t,l,s,n)),xi.set(t,t.el.getBoundingClientRect());}return Zo(c,null,r)}}},Ei=wi;function Ni(e){const t=e.el;t[ki]&&t[ki](),t[Ti]&&t[Ti]();}function Ai(e){Ci.set(e,e.el.getBoundingClientRect());}function Ii(e){const t=xi.get(e),n=Ci.get(e),s=t.left-n.left,o=t.top-n.top;if(s||o){const t=e.el.style;return t.transform=t.webkitTransform=`translate(${s}px,${o}px)`,t.transitionDuration="0s",e}}const Ri=e=>{const t=e.props["onUpdate:modelValue"]||!1;return p(t)?e=>P(t,e):t};function Oi(e){e.target.composing=!0;}function Li(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")));}const Fi=Symbol("_assign"),Mi={created(e,{modifiers:{lazy:t,trim:n,number:s}},o){e[Fi]=Ri(o);const r=s||o.props&&"number"===o.props.type;di(e,t?"change":"input",(t=>{if(t.target.composing)return;let s=e.value;n&&(s=s.trim()),r&&(s=B(s)),e[Fi](s);})),n&&di(e,"change",(()=>{e.value=e.value.trim();})),t||(di(e,"compositionstart",Oi),di(e,"compositionend",Li),di(e,"change",Li));},mounted(e,{value:t}){e.value=null==t?"":t;},beforeUpdate(e,{value:t,modifiers:{lazy:n,trim:s,number:o}},r){if(e[Fi]=Ri(r),e.composing)return;const i=null==t?"":t;if((o||"number"===e.type?B(e.value):e.value)!==i){if(document.activeElement===e&&"range"!==e.type){if(n)return;if(s&&e.value.trim()===i)return}e.value=i;}}},Pi={deep:!0,created(e,t,n){e[Fi]=Ri(n),di(e,"change",(()=>{const t=e._modelValue,n=Ui(e),s=e.checked,o=e[Fi];if(p(t)){const e=ne(t,n),r=-1!==e;if(s&&!r)o(t.concat(n));else if(!s&&r){const n=[...t];n.splice(e,1),o(n);}}else if(f(t)){const e=new Set(t);s?e.add(n):e.delete(n),o(e);}else o(ji(e,s));}));},mounted:$i,beforeUpdate(e,t,n){e[Fi]=Ri(n),$i(e,t,n);}};function $i(e,{value:t,oldValue:n},s){e._modelValue=t,p(t)?e.checked=ne(t,s.props.value)>-1:f(t)?e.checked=t.has(s.props.value):t!==n&&(e.checked=te(t,ji(e,!0)));}const Bi={created(e,{value:t},n){e.checked=te(t,n.props.value),e[Fi]=Ri(n),di(e,"change",(()=>{e[Fi](Ui(e));}));},beforeUpdate(e,{value:t,oldValue:n},s){e[Fi]=Ri(s),t!==n&&(e.checked=te(t,s.props.value));}},Vi={deep:!0,created(e,{value:t,modifiers:{number:n}},s){const o=f(t);di(e,"change",(()=>{const t=Array.prototype.filter.call(e.options,(e=>e.selected)).map((e=>n?B(Ui(e)):Ui(e)));e[Fi](e.multiple?o?new Set(t):t:t[0]),e._assigning=!0,en((()=>{e._assigning=!1;}));})),e[Fi]=Ri(s);},mounted(e,{value:t,oldValue:n,modifiers:{number:s}}){Di(e,t,n,s);},beforeUpdate(e,t,n){e[Fi]=Ri(n);},updated(e,{value:t,oldValue:n,modifiers:{number:s}}){e._assigning||Di(e,t,n,s);}};function Di(e,t,n,s){const o=e.multiple,r=p(t);if(!o||r||f(t)){for(let n=0,i=e.options.length;n<i;n++){const i=e.options[n],l=Ui(i);if(o)if(r){const e=typeof l;i.selected="string"===e||"number"===e?t.includes(s?B(l):l):ne(t,l)>-1;}else i.selected=t.has(l);else if(te(Ui(i),t))return void(e.selectedIndex!==n&&(e.selectedIndex=n))}o||-1===e.selectedIndex||(e.selectedIndex=-1);}}function Ui(e){return "_value"in e?e._value:e.value}function ji(e,t){const n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}const Hi={created(e,t,n){qi(e,t,n,null,"created");},mounted(e,t,n){qi(e,t,n,null,"mounted");},beforeUpdate(e,t,n,s){qi(e,t,n,s,"beforeUpdate");},updated(e,t,n,s){qi(e,t,n,s,"updated");}};function qi(e,t,n,s,o){const r=function(e,t){switch(e){case"SELECT":return Vi;case"TEXTAREA":return Mi;default:switch(t){case"checkbox":return Pi;case"radio":return Bi;default:return Mi}}}(e.tagName,n.props&&n.props.type)[o];r&&r(e,t,n,s);}const Wi=["ctrl","shift","alt","meta"],Ki={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&0!==e.button,middle:e=>"button"in e&&1!==e.button,right:e=>"button"in e&&2!==e.button,exact:(e,t)=>Wi.some((n=>e[`${n}Key`]&&!t.includes(n)))},zi={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},Gi=c({patchProp:(e,t,n,s,o,r,c,a,u)=>{const d="svg"===o;"class"===t?function(e,t,n){const s=e[Pr];s&&(t=(t?[t,...s]:[...s]).join(" ")),null==t?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t;}(e,s,d):"style"===t?function(e,t,n){const s=e.style,o=y(n),r=s.display;let i=!1;if(n&&!o){if(t&&!y(t))for(const e in t)null==n[e]&&li(s,e,"");for(const e in n)"display"===e&&(i=!0),li(s,e,n[e]);}else if(o){if(t!==n){const e=s[ni];e&&(n+=";"+e),s.cssText=n,i=ri.test(n);}}else t&&e.removeAttribute("style");Yr in e&&(e[Yr]=i?s.display:"",s.display=r);}(e,n,s):i(t)?l(t)||hi(e,t,0,s,c):("."===t[0]?(t=t.slice(1),1):"^"===t[0]?(t=t.slice(1),0):function(e,t,n,s){if(s)return "innerHTML"===t||"textContent"===t||!!(t in e&&vi(t)&&g(n));if("spellcheck"===t||"draggable"===t||"translate"===t)return !1;if("form"===t)return !1;if("list"===t&&"INPUT"===e.tagName)return !1;if("type"===t&&"TEXTAREA"===e.tagName)return !1;if("width"===t||"height"===t){const t=e.tagName;if("IMG"===t||"VIDEO"===t||"CANVAS"===t||"SOURCE"===t)return !1}if(vi(t)&&y(n))return !1;return t in e}(e,t,s,d))?function(e,t,n,s,o,r,i){if("innerHTML"===t||"textContent"===t)return s&&i(s,o,r),void(e[t]=null==n?"":n);const l=e.tagName;if("value"===t&&"PROGRESS"!==l&&!l.includes("-")){e._value=n;const s=null==n?"":n;return ("OPTION"===l?e.getAttribute("value"):e.value)!==s&&(e.value=s),void(null==n&&e.removeAttribute(t))}let c=!1;if(""===n||null==n){const s=typeof e[t];"boolean"===s?n=ee(n):null==n&&"string"===s?(n="",c=!0):"number"===s&&(n=0,c=!0);}try{e[t]=n;}catch(a){}c&&e.removeAttribute(t);}(e,t,s,r,c,a,u):("true-value"===t?e._trueValue=s:"false-value"===t&&(e._falseValue=s),function(e,t,n,s,o){if(s&&t.startsWith("xlink:"))null==n?e.removeAttributeNS(ui,t.slice(6,t.length)):e.setAttributeNS(ui,t,n);else {const s=Y(t);null==n||s&&!ee(n)?e.removeAttribute(t):e.setAttribute(t,s?"":n);}}(e,t,s,d));}},Lr);let Ji,Xi=!1;function Qi(){return Ji||(Ji=bo(Gi))}function Zi(){return Ji=Xi?Ji:_o(Gi),Xi=!0,Ji}const Yi=(...e)=>{Qi().render(...e);},el=(...e)=>{Zi().hydrate(...e);};function tl(e){return e instanceof SVGElement?"svg":"function"==typeof MathMLElement&&e instanceof MathMLElement?"mathml":void 0}function nl(e){if(y(e)){return document.querySelector(e)}return e}const sl=o,ol=Symbol(""),rl=Symbol(""),il=Symbol(""),ll=Symbol(""),cl=Symbol(""),al=Symbol(""),ul=Symbol(""),dl=Symbol(""),pl=Symbol(""),hl=Symbol(""),fl=Symbol(""),ml=Symbol(""),gl=Symbol(""),yl=Symbol(""),vl=Symbol(""),bl=Symbol(""),_l=Symbol(""),Sl=Symbol(""),xl=Symbol(""),Cl=Symbol(""),kl=Symbol(""),Tl=Symbol(""),wl=Symbol(""),El=Symbol(""),Nl=Symbol(""),Al=Symbol(""),Il=Symbol(""),Rl=Symbol(""),Ol=Symbol(""),Ll=Symbol(""),Fl=Symbol(""),Ml=Symbol(""),Pl=Symbol(""),$l=Symbol(""),Bl=Symbol(""),Vl=Symbol(""),Dl=Symbol(""),Ul=Symbol(""),jl=Symbol(""),Hl={[ol]:"Fragment",[rl]:"Teleport",[il]:"Suspense",[ll]:"KeepAlive",[cl]:"BaseTransition",[al]:"openBlock",[ul]:"createBlock",[dl]:"createElementBlock",[pl]:"createVNode",[hl]:"createElementVNode",[fl]:"createCommentVNode",[ml]:"createTextVNode",[gl]:"createStaticVNode",[yl]:"resolveComponent",[vl]:"resolveDynamicComponent",[bl]:"resolveDirective",[_l]:"resolveFilter",[Sl]:"withDirectives",[xl]:"renderList",[Cl]:"renderSlot",[kl]:"createSlots",[Tl]:"toDisplayString",[wl]:"mergeProps",[El]:"normalizeClass",[Nl]:"normalizeStyle",[Al]:"normalizeProps",[Il]:"guardReactiveProps",[Rl]:"toHandlers",[Ol]:"camelize",[Ll]:"capitalize",[Fl]:"toHandlerKey",[Ml]:"setBlockTracking",[Pl]:"pushScopeId",[$l]:"popScopeId",[Bl]:"withCtx",[Vl]:"unref",[Dl]:"isRef",[Ul]:"withMemo",[jl]:"isMemoSame"};const ql={start:{line:1,column:1,offset:0},end:{line:1,column:1,offset:0},source:""};function Wl(e,t,n,s,o,r,i,l=!1,c=!1,a=!1,u=ql){return e&&(l?(e.helper(al),e.helper(tc(e.inSSR,a))):e.helper(ec(e.inSSR,a)),i&&e.helper(Sl)),{type:13,tag:t,props:n,children:s,patchFlag:o,dynamicProps:r,directives:i,isBlock:l,disableTracking:c,isComponent:a,loc:u}}function Kl(e,t=ql){return {type:17,loc:t,elements:e}}function zl(e,t=ql){return {type:15,loc:t,properties:e}}function Gl(e,t){return {type:16,loc:ql,key:y(e)?Jl(e,!0):e,value:t}}function Jl(e,t=!1,n=ql,s=0){return {type:4,loc:n,content:e,isStatic:t,constType:t?3:s}}function Xl(e,t=ql){return {type:8,loc:t,children:e}}function Ql(e,t=[],n=ql){return {type:14,loc:n,callee:e,arguments:t}}function Zl(e,t=void 0,n=!1,s=!1,o=ql){return {type:18,params:e,returns:t,newline:n,isSlot:s,loc:o}}function Yl(e,t,n,s=!0){return {type:19,test:e,consequent:t,alternate:n,newline:s,loc:ql}}function ec(e,t){return e||t?pl:hl}function tc(e,t){return e||t?ul:dl}function nc(e,{helper:t,removeHelper:n,inSSR:s}){e.isBlock||(e.isBlock=!0,n(ec(s,e.isComponent)),t(al),t(tc(s,e.isComponent)));}const sc=new Uint8Array([123,123]),oc=new Uint8Array([125,125]);function rc(e){return e>=97&&e<=122||e>=65&&e<=90}function ic(e){return 32===e||10===e||9===e||12===e||13===e}function lc(e){return 47===e||62===e||ic(e)}function cc(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}const ac={Cdata:new Uint8Array([67,68,65,84,65,91]),CdataEnd:new Uint8Array([93,93,62]),CommentEnd:new Uint8Array([45,45,62]),ScriptEnd:new Uint8Array([60,47,115,99,114,105,112,116]),StyleEnd:new Uint8Array([60,47,115,116,121,108,101]),TitleEnd:new Uint8Array([60,47,116,105,116,108,101]),TextareaEnd:new Uint8Array([60,47,116,101,120,116,97,114,101,97])};function uc(e){throw e}function dc(e){}function pc(e,t,n,s){const o=new SyntaxError(String(`https://vuejs.org/error-reference/#compiler-${e}`));return o.code=e,o.loc=t,o}const hc=e=>4===e.type&&e.isStatic;function fc(e){switch(e){case"Teleport":case"teleport":return rl;case"Suspense":case"suspense":return il;case"KeepAlive":case"keep-alive":return ll;case"BaseTransition":case"base-transition":return cl}}const mc=/^\d|[^\$\w]/,gc=e=>!mc.test(e),yc=/[A-Za-z_$\xA0-\uFFFF]/,vc=/[\.\?\w$\xA0-\uFFFF]/,bc=/\s+[.[]\s*|\s*[.[]\s+/g,_c=e=>{e=e.trim().replace(bc,(e=>e.trim()));let t=0,n=[],s=0,o=0,r=null;for(let i=0;i<e.length;i++){const l=e.charAt(i);switch(t){case 0:if("["===l)n.push(t),t=1,s++;else if("("===l)n.push(t),t=2,o++;else if(!(0===i?yc:vc).test(l))return !1;break;case 1:"'"===l||'"'===l||"`"===l?(n.push(t),t=3,r=l):"["===l?s++:"]"===l&&(--s||(t=n.pop()));break;case 2:if("'"===l||'"'===l||"`"===l)n.push(t),t=3,r=l;else if("("===l)o++;else if(")"===l){if(i===e.length-1)return !1;--o||(t=n.pop());}break;case 3:l===r&&(t=n.pop(),r=null);}}return !s&&!o};function Sc(e,t,n=!1){for(let s=0;s<e.props.length;s++){const o=e.props[s];if(7===o.type&&(n||o.exp)&&(y(t)?o.name===t:t.test(o.name)))return o}}function xc(e,t,n=!1,s=!1){for(let o=0;o<e.props.length;o++){const r=e.props[o];if(6===r.type){if(n)continue;if(r.name===t&&(r.value||s))return r}else if("bind"===r.name&&(r.exp||s)&&Cc(r.arg,t))return r}}function Cc(e,t){return !(!e||!hc(e)||e.content!==t)}function kc(e){return 5===e.type||2===e.type}function Tc(e){return 7===e.type&&"slot"===e.name}function wc(e){return 1===e.type&&3===e.tagType}function Ec(e){return 1===e.type&&2===e.tagType}const Nc=new Set([Al,Il]);function Ac(e,t=[]){if(e&&!y(e)&&14===e.type){const n=e.callee;if(!y(n)&&Nc.has(n))return Ac(e.arguments[0],t.concat(e))}return [e,t]}function Ic(e,t,n){let s,o,r=13===e.type?e.props:e.arguments[2],i=[];if(r&&!y(r)&&14===r.type){const e=Ac(r);r=e[0],i=e[1],o=i[i.length-1];}if(null==r||y(r))s=zl([t]);else if(14===r.type){const e=r.arguments[0];y(e)||15!==e.type?r.callee===Rl?s=Ql(n.helper(wl),[zl([t]),r]):r.arguments.unshift(zl([t])):Rc(t,e)||e.properties.unshift(t),!s&&(s=r);}else 15===r.type?(Rc(t,r)||r.properties.unshift(t),s=r):(s=Ql(n.helper(wl),[zl([t]),r]),o&&o.callee===Il&&(o=i[i.length-2]));13===e.type?o?o.arguments[0]=s:e.props=s:o?o.arguments[0]=s:e.arguments[2]=s;}function Rc(e,t){let n=!1;if(4===e.key.type){const s=e.key.content;n=t.properties.some((e=>4===e.key.type&&e.key.content===s));}return n}function Oc(e,t){return `_${t}_${e.replace(/[^\w]/g,((t,n)=>"-"===t?"_":e.charCodeAt(n).toString()))}`}const Lc=/([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,Fc={parseMode:"base",ns:0,delimiters:["{{","}}"],getNamespace:()=>0,isVoidTag:r,isPreTag:r,isCustomElement:r,onError:uc,onWarn:dc,comments:!1,prefixIdentifiers:!1};let Mc=Fc,Pc=null,$c="",Bc=null,Vc=null,Dc="",Uc=-1,jc=-1,Hc=0,qc=!1,Wc=null;const Kc=[],zc=new class{constructor(e,t){this.stack=e,this.cbs=t,this.state=1,this.buffer="",this.sectionStart=0,this.index=0,this.entityStart=0,this.baseState=1,this.inRCDATA=!1,this.inXML=!1,this.inVPre=!1,this.newlines=[],this.mode=0,this.delimiterOpen=sc,this.delimiterClose=oc,this.delimiterIndex=-1,this.currentSequence=void 0,this.sequenceIndex=0;}get inSFCRoot(){return 2===this.mode&&0===this.stack.length}reset(){this.state=1,this.mode=0,this.buffer="",this.sectionStart=0,this.index=0,this.baseState=1,this.inRCDATA=!1,this.currentSequence=void 0,this.newlines.length=0,this.delimiterOpen=sc,this.delimiterClose=oc;}getPos(e){let t=1,n=e+1;for(let s=this.newlines.length-1;s>=0;s--){const o=this.newlines[s];if(e>o){t=s+2,n=e-o;break}}return {column:n,line:t,offset:e}}peek(){return this.buffer.charCodeAt(this.index+1)}stateText(e){60===e?(this.index>this.sectionStart&&this.cbs.ontext(this.sectionStart,this.index),this.state=5,this.sectionStart=this.index):this.inVPre||e!==this.delimiterOpen[0]||(this.state=2,this.delimiterIndex=0,this.stateInterpolationOpen(e));}stateInterpolationOpen(e){if(e===this.delimiterOpen[this.delimiterIndex])if(this.delimiterIndex===this.delimiterOpen.length-1){const e=this.index+1-this.delimiterOpen.length;e>this.sectionStart&&this.cbs.ontext(this.sectionStart,e),this.state=3,this.sectionStart=e;}else this.delimiterIndex++;else this.inRCDATA?(this.state=32,this.stateInRCDATA(e)):(this.state=1,this.stateText(e));}stateInterpolation(e){e===this.delimiterClose[0]&&(this.state=4,this.delimiterIndex=0,this.stateInterpolationClose(e));}stateInterpolationClose(e){e===this.delimiterClose[this.delimiterIndex]?this.delimiterIndex===this.delimiterClose.length-1?(this.cbs.oninterpolation(this.sectionStart,this.index+1),this.state=this.inRCDATA?32:1,this.sectionStart=this.index+1):this.delimiterIndex++:(this.state=3,this.stateInterpolation(e));}stateSpecialStartSequence(e){const t=this.sequenceIndex===this.currentSequence.length;if(t?lc(e):(32|e)===this.currentSequence[this.sequenceIndex]){if(!t)return void this.sequenceIndex++}else this.inRCDATA=!1;this.sequenceIndex=0,this.state=6,this.stateInTagName(e);}stateInRCDATA(e){if(this.sequenceIndex===this.currentSequence.length){if(62===e||ic(e)){const t=this.index-this.currentSequence.length;if(this.sectionStart<t){const e=this.index;this.index=t,this.cbs.ontext(this.sectionStart,t),this.index=e;}return this.sectionStart=t+2,this.stateInClosingTagName(e),void(this.inRCDATA=!1)}this.sequenceIndex=0;}(32|e)===this.currentSequence[this.sequenceIndex]?this.sequenceIndex+=1:0===this.sequenceIndex?this.currentSequence===ac.TitleEnd||this.currentSequence===ac.TextareaEnd&&!this.inSFCRoot?e===this.delimiterOpen[0]&&(this.state=2,this.delimiterIndex=0,this.stateInterpolationOpen(e)):this.fastForwardTo(60)&&(this.sequenceIndex=1):this.sequenceIndex=Number(60===e);}stateCDATASequence(e){e===ac.Cdata[this.sequenceIndex]?++this.sequenceIndex===ac.Cdata.length&&(this.state=28,this.currentSequence=ac.CdataEnd,this.sequenceIndex=0,this.sectionStart=this.index+1):(this.sequenceIndex=0,this.state=23,this.stateInDeclaration(e));}fastForwardTo(e){for(;++this.index<this.buffer.length;){const t=this.buffer.charCodeAt(this.index);if(10===t&&this.newlines.push(this.index),t===e)return !0}return this.index=this.buffer.length-1,!1}stateInCommentLike(e){e===this.currentSequence[this.sequenceIndex]?++this.sequenceIndex===this.currentSequence.length&&(this.currentSequence===ac.CdataEnd?this.cbs.oncdata(this.sectionStart,this.index-2):this.cbs.oncomment(this.sectionStart,this.index-2),this.sequenceIndex=0,this.sectionStart=this.index+1,this.state=1):0===this.sequenceIndex?this.fastForwardTo(this.currentSequence[0])&&(this.sequenceIndex=1):e!==this.currentSequence[this.sequenceIndex-1]&&(this.sequenceIndex=0);}startSpecial(e,t){this.enterRCDATA(e,t),this.state=31;}enterRCDATA(e,t){this.inRCDATA=!0,this.currentSequence=e,this.sequenceIndex=t;}stateBeforeTagName(e){if(33===e)this.state=22,this.sectionStart=this.index+1;else if(63===e)this.state=24,this.sectionStart=this.index+1;else if(rc(e))if(this.sectionStart=this.index,0===this.mode)this.state=6;else if(this.inSFCRoot)this.state=34;else if(this.inXML)this.state=6;else {const t=32|e;this.state=116===t?30:115===t?29:6;}else 47===e?this.state=8:(this.state=1,this.stateText(e));}stateInTagName(e){lc(e)&&this.handleTagName(e);}stateInSFCRootTagName(e){if(lc(e)){const t=this.buffer.slice(this.sectionStart,this.index);"template"!==t&&this.enterRCDATA(cc("</"+t),0),this.handleTagName(e);}}handleTagName(e){this.cbs.onopentagname(this.sectionStart,this.index),this.sectionStart=-1,this.state=11,this.stateBeforeAttrName(e);}stateBeforeClosingTagName(e){ic(e)||(62===e?(this.state=1,this.sectionStart=this.index+1):(this.state=rc(e)?9:27,this.sectionStart=this.index));}stateInClosingTagName(e){(62===e||ic(e))&&(this.cbs.onclosetag(this.sectionStart,this.index),this.sectionStart=-1,this.state=10,this.stateAfterClosingTagName(e));}stateAfterClosingTagName(e){62===e&&(this.state=1,this.sectionStart=this.index+1);}stateBeforeAttrName(e){62===e?(this.cbs.onopentagend(this.index),this.state=this.inRCDATA?32:1,this.sectionStart=this.index+1):47===e?this.state=7:60===e&&47===this.peek()?(this.cbs.onopentagend(this.index),this.state=5,this.sectionStart=this.index):ic(e)||this.handleAttrStart(e);}handleAttrStart(e){118===e&&45===this.peek()?(this.state=13,this.sectionStart=this.index):46===e||58===e||64===e||35===e?(this.cbs.ondirname(this.index,this.index+1),this.state=14,this.sectionStart=this.index+1):(this.state=12,this.sectionStart=this.index);}stateInSelfClosingTag(e){62===e?(this.cbs.onselfclosingtag(this.index),this.state=1,this.sectionStart=this.index+1,this.inRCDATA=!1):ic(e)||(this.state=11,this.stateBeforeAttrName(e));}stateInAttrName(e){(61===e||lc(e))&&(this.cbs.onattribname(this.sectionStart,this.index),this.handleAttrNameEnd(e));}stateInDirName(e){61===e||lc(e)?(this.cbs.ondirname(this.sectionStart,this.index),this.handleAttrNameEnd(e)):58===e?(this.cbs.ondirname(this.sectionStart,this.index),this.state=14,this.sectionStart=this.index+1):46===e&&(this.cbs.ondirname(this.sectionStart,this.index),this.state=16,this.sectionStart=this.index+1);}stateInDirArg(e){61===e||lc(e)?(this.cbs.ondirarg(this.sectionStart,this.index),this.handleAttrNameEnd(e)):91===e?this.state=15:46===e&&(this.cbs.ondirarg(this.sectionStart,this.index),this.state=16,this.sectionStart=this.index+1);}stateInDynamicDirArg(e){93===e?this.state=14:(61===e||lc(e))&&(this.cbs.ondirarg(this.sectionStart,this.index+1),this.handleAttrNameEnd(e));}stateInDirModifier(e){61===e||lc(e)?(this.cbs.ondirmodifier(this.sectionStart,this.index),this.handleAttrNameEnd(e)):46===e&&(this.cbs.ondirmodifier(this.sectionStart,this.index),this.sectionStart=this.index+1);}handleAttrNameEnd(e){this.sectionStart=this.index,this.state=17,this.cbs.onattribnameend(this.index),this.stateAfterAttrName(e);}stateAfterAttrName(e){61===e?this.state=18:47===e||62===e?(this.cbs.onattribend(0,this.sectionStart),this.sectionStart=-1,this.state=11,this.stateBeforeAttrName(e)):ic(e)||(this.cbs.onattribend(0,this.sectionStart),this.handleAttrStart(e));}stateBeforeAttrValue(e){34===e?(this.state=19,this.sectionStart=this.index+1):39===e?(this.state=20,this.sectionStart=this.index+1):ic(e)||(this.sectionStart=this.index,this.state=21,this.stateInAttrValueNoQuotes(e));}handleInAttrValue(e,t){(e===t||this.fastForwardTo(t))&&(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(34===t?3:2,this.index+1),this.state=11);}stateInAttrValueDoubleQuotes(e){this.handleInAttrValue(e,34);}stateInAttrValueSingleQuotes(e){this.handleInAttrValue(e,39);}stateInAttrValueNoQuotes(e){ic(e)||62===e?(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(1,this.index),this.state=11,this.stateBeforeAttrName(e)):39!==e&&60!==e&&61!==e&&96!==e||this.cbs.onerr(18,this.index);}stateBeforeDeclaration(e){91===e?(this.state=26,this.sequenceIndex=0):this.state=45===e?25:23;}stateInDeclaration(e){(62===e||this.fastForwardTo(62))&&(this.state=1,this.sectionStart=this.index+1);}stateInProcessingInstruction(e){(62===e||this.fastForwardTo(62))&&(this.cbs.onprocessinginstruction(this.sectionStart,this.index),this.state=1,this.sectionStart=this.index+1);}stateBeforeComment(e){45===e?(this.state=28,this.currentSequence=ac.CommentEnd,this.sequenceIndex=2,this.sectionStart=this.index+1):this.state=23;}stateInSpecialComment(e){(62===e||this.fastForwardTo(62))&&(this.cbs.oncomment(this.sectionStart,this.index),this.state=1,this.sectionStart=this.index+1);}stateBeforeSpecialS(e){const t=32|e;t===ac.ScriptEnd[3]?this.startSpecial(ac.ScriptEnd,4):t===ac.StyleEnd[3]?this.startSpecial(ac.StyleEnd,4):(this.state=6,this.stateInTagName(e));}stateBeforeSpecialT(e){const t=32|e;t===ac.TitleEnd[3]?this.startSpecial(ac.TitleEnd,4):t===ac.TextareaEnd[3]?this.startSpecial(ac.TextareaEnd,4):(this.state=6,this.stateInTagName(e));}startEntity(){}stateInEntity(){}parse(e){for(this.buffer=e;this.index<this.buffer.length;){const e=this.buffer.charCodeAt(this.index);switch(10===e&&this.newlines.push(this.index),this.state){case 1:this.stateText(e);break;case 2:this.stateInterpolationOpen(e);break;case 3:this.stateInterpolation(e);break;case 4:this.stateInterpolationClose(e);break;case 31:this.stateSpecialStartSequence(e);break;case 32:this.stateInRCDATA(e);break;case 26:this.stateCDATASequence(e);break;case 19:this.stateInAttrValueDoubleQuotes(e);break;case 12:this.stateInAttrName(e);break;case 13:this.stateInDirName(e);break;case 14:this.stateInDirArg(e);break;case 15:this.stateInDynamicDirArg(e);break;case 16:this.stateInDirModifier(e);break;case 28:this.stateInCommentLike(e);break;case 27:this.stateInSpecialComment(e);break;case 11:this.stateBeforeAttrName(e);break;case 6:this.stateInTagName(e);break;case 34:this.stateInSFCRootTagName(e);break;case 9:this.stateInClosingTagName(e);break;case 5:this.stateBeforeTagName(e);break;case 17:this.stateAfterAttrName(e);break;case 20:this.stateInAttrValueSingleQuotes(e);break;case 18:this.stateBeforeAttrValue(e);break;case 8:this.stateBeforeClosingTagName(e);break;case 10:this.stateAfterClosingTagName(e);break;case 29:this.stateBeforeSpecialS(e);break;case 30:this.stateBeforeSpecialT(e);break;case 21:this.stateInAttrValueNoQuotes(e);break;case 7:this.stateInSelfClosingTag(e);break;case 23:this.stateInDeclaration(e);break;case 22:this.stateBeforeDeclaration(e);break;case 25:this.stateBeforeComment(e);break;case 24:this.stateInProcessingInstruction(e);break;case 33:this.stateInEntity();}this.index++;}this.cleanup(),this.finish();}cleanup(){this.sectionStart!==this.index&&(1===this.state||32===this.state&&0===this.sequenceIndex?(this.cbs.ontext(this.sectionStart,this.index),this.sectionStart=this.index):19!==this.state&&20!==this.state&&21!==this.state||(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=this.index));}finish(){this.handleTrailingData(),this.cbs.onend();}handleTrailingData(){const e=this.buffer.length;this.sectionStart>=e||(28===this.state?this.currentSequence===ac.CdataEnd?this.cbs.oncdata(this.sectionStart,e):this.cbs.oncomment(this.sectionStart,e):6===this.state||11===this.state||18===this.state||17===this.state||12===this.state||13===this.state||14===this.state||15===this.state||16===this.state||20===this.state||19===this.state||21===this.state||9===this.state||this.cbs.ontext(this.sectionStart,e));}emitCodePoint(e,t){}}(Kc,{onerr:pa,ontext(e,t){Zc(Xc(e,t),e,t);},ontextentity(e,t,n){Zc(e,t,n);},oninterpolation(e,t){if(qc)return Zc(Xc(e,t),e,t);let n=e+zc.delimiterOpen.length,s=t-zc.delimiterClose.length;for(;ic($c.charCodeAt(n));)n++;for(;ic($c.charCodeAt(s-1));)s--;let o=Xc(n,s);o.includes("&")&&(o=Mc.decodeEntities(o,!1)),la({type:5,content:da(o,!1,ca(n,s)),loc:ca(e,t)});},onopentagname(e,t){const n=Xc(e,t);Bc={type:1,tag:n,ns:Mc.getNamespace(n,Kc[0],Mc.ns),tagType:0,props:[],children:[],loc:ca(e-1,t),codegenNode:void 0};},onopentagend(e){Qc(e);},onclosetag(e,t){const n=Xc(e,t);if(!Mc.isVoidTag(n)){let s=!1;for(let e=0;e<Kc.length;e++){if(Kc[e].tag.toLowerCase()===n.toLowerCase()){s=!0;for(let n=0;n<=e;n++){Yc(Kc.shift(),t,n<e);}break}}s||ea(e,60);}},onselfclosingtag(e){var t;const n=Bc.tag;Bc.isSelfClosing=!0,Qc(e),(null==(t=Kc[0])?void 0:t.tag)===n&&Yc(Kc.shift(),e);},onattribname(e,t){Vc={type:6,name:Xc(e,t),nameLoc:ca(e,t),value:void 0,loc:ca(e)};},ondirname(e,t){const n=Xc(e,t),s="."===n||":"===n?"bind":"@"===n?"on":"#"===n?"slot":n.slice(2);if(qc||""===s)Vc={type:6,name:n,nameLoc:ca(e,t),value:void 0,loc:ca(e)};else if(Vc={type:7,name:s,rawName:n,exp:void 0,arg:void 0,modifiers:"."===n?["prop"]:[],loc:ca(e)},"pre"===s){qc=zc.inVPre=!0,Wc=Bc;const e=Bc.props;for(let t=0;t<e.length;t++)7===e[t].type&&(e[t]=ua(e[t]));}},ondirarg(e,t){if(e===t)return;const n=Xc(e,t);if(qc)Vc.name+=n,aa(Vc.nameLoc,t);else {const s="["!==n[0];Vc.arg=da(s?n:n.slice(1,-1),s,ca(e,t),s?3:0);}},ondirmodifier(e,t){const n=Xc(e,t);if(qc)Vc.name+="."+n,aa(Vc.nameLoc,t);else if("slot"===Vc.name){const e=Vc.arg;e&&(e.content+="."+n,aa(e.loc,t));}else Vc.modifiers.push(n);},onattribdata(e,t){Dc+=Xc(e,t),Uc<0&&(Uc=e),jc=t;},onattribentity(e,t,n){Dc+=e,Uc<0&&(Uc=t),jc=n;},onattribnameend(e){const t=Xc(Vc.loc.start.offset,e);7===Vc.type&&(Vc.rawName=t),Bc.props.some((e=>(7===e.type?e.rawName:e.name)===t));},onattribend(e,t){if(Bc&&Vc){if(aa(Vc.loc,t),0!==e)if(Dc.includes("&")&&(Dc=Mc.decodeEntities(Dc,!0)),6===Vc.type)"class"===Vc.name&&(Dc=ia(Dc).trim()),Vc.value={type:2,content:Dc,loc:1===e?ca(Uc,jc):ca(Uc-1,jc+1)},zc.inSFCRoot&&"template"===Bc.tag&&"lang"===Vc.name&&Dc&&"html"!==Dc&&zc.enterRCDATA(cc("</template"),0);else {let e=0;Vc.exp=da(Dc,!1,ca(Uc,jc),0,e),"for"===Vc.name&&(Vc.forParseResult=function(e){const t=e.loc,n=e.content,s=n.match(Lc);if(!s)return;const[,o,r]=s,i=(e,n,s=!1)=>{const o=t.start.offset+n;return da(e,!1,ca(o,o+e.length),0,s?1:0)},l={source:i(r.trim(),n.indexOf(r,o.length)),value:void 0,key:void 0,index:void 0,finalized:!1};let c=o.trim().replace(Jc,"").trim();const a=o.indexOf(c),u=c.match(Gc);if(u){c=c.replace(Gc,"").trim();const e=u[1].trim();let t;if(e&&(t=n.indexOf(e,a+c.length),l.key=i(e,t,!0)),u[2]){const s=u[2].trim();s&&(l.index=i(s,n.indexOf(s,l.key?t+e.length:a+c.length),!0));}}c&&(l.value=i(c,a,!0));return l}(Vc.exp));}7===Vc.type&&"pre"===Vc.name||Bc.props.push(Vc);}Dc="",Uc=jc=-1;},oncomment(e,t){Mc.comments&&la({type:3,content:Xc(e,t),loc:ca(e-4,t+3)});},onend(){const e=$c.length;for(let t=0;t<Kc.length;t++)Yc(Kc[t],e-1);},oncdata(e,t){0!==Kc[0].ns&&Zc(Xc(e,t),e,t);},onprocessinginstruction(e){0===(Kc[0]?Kc[0].ns:Mc.ns)&&pa(21,e-1);}}),Gc=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,Jc=/^\(|\)$/g;function Xc(e,t){return $c.slice(e,t)}function Qc(e){zc.inSFCRoot&&(Bc.innerLoc=ca(e+1,e+1)),la(Bc);const{tag:t,ns:n}=Bc;0===n&&Mc.isPreTag(t)&&Hc++,Mc.isVoidTag(t)?Yc(Bc,e):(Kc.unshift(Bc),1!==n&&2!==n||(zc.inXML=!0)),Bc=null;}function Zc(e,t,n){var s;{const t=null==(s=Kc[0])?void 0:s.tag;"script"!==t&&"style"!==t&&e.includes("&")&&(e=Mc.decodeEntities(e,!1));}const o=Kc[0]||Pc,r=o.children[o.children.length-1];2===(null==r?void 0:r.type)?(r.content+=e,aa(r.loc,n)):o.children.push({type:2,content:e,loc:ca(t,n)});}function Yc(e,t,n=!1){aa(e.loc,n?ea(t,60):t+1),zc.inSFCRoot&&(e.innerLoc.end=c({},e.children.length?e.children[e.children.length-1].loc.end:e.innerLoc.start),e.innerLoc.source=Xc(e.innerLoc.start.offset,e.innerLoc.end.offset));const{tag:s,ns:o}=e;qc||("slot"===s?e.tagType=2:!function({tag:e,props:t}){if("template"===e)for(let n=0;n<t.length;n++)if(7===t[n].type&&ta.has(t[n].name))return !0;return !1}(e)?function({tag:e,props:t}){var n;if(Mc.isCustomElement(e))return !1;if("component"===e||(s=e.charCodeAt(0),s>64&&s<91)||fc(e)||(null==(n=Mc.isBuiltInComponent)?void 0:n.call(Mc,e))||Mc.isNativeTag&&!Mc.isNativeTag(e))return !0;var s;for(let o=0;o<t.length;o++){const e=t[o];if(6===e.type&&"is"===e.name&&e.value&&e.value.content.startsWith("vue:"))return !0}return !1}(e)&&(e.tagType=1):e.tagType=3),zc.inRCDATA||(e.children=sa(e.children,e.tag)),0===o&&Mc.isPreTag(s)&&Hc--,Wc===e&&(qc=zc.inVPre=!1,Wc=null),zc.inXML&&0===(Kc[0]?Kc[0].ns:Mc.ns)&&(zc.inXML=!1);}function ea(e,t){let n=e;for(;$c.charCodeAt(n)!==t&&n>=0;)n--;return n}const ta=new Set(["if","else","else-if","for","slot"]);const na=/\r\n/g;function sa(e,t){var n,s;const o="preserve"!==Mc.whitespace;let r=!1;for(let i=0;i<e.length;i++){const t=e[i];if(2===t.type)if(Hc)t.content=t.content.replace(na,"\n");else if(oa(t.content)){const l=null==(n=e[i-1])?void 0:n.type,c=null==(s=e[i+1])?void 0:s.type;!l||!c||o&&(3===l&&(3===c||1===c)||1===l&&(3===c||1===c&&ra(t.content)))?(r=!0,e[i]=null):t.content=" ";}else o&&(t.content=ia(t.content));}if(Hc&&t&&Mc.isPreTag(t)){const t=e[0];t&&2===t.type&&(t.content=t.content.replace(/^\r?\n/,""));}return r?e.filter(Boolean):e}function oa(e){for(let t=0;t<e.length;t++)if(!ic(e.charCodeAt(t)))return !1;return !0}function ra(e){for(let t=0;t<e.length;t++){const n=e.charCodeAt(t);if(10===n||13===n)return !0}return !1}function ia(e){let t="",n=!1;for(let s=0;s<e.length;s++)ic(e.charCodeAt(s))?n||(t+=" ",n=!0):(t+=e[s],n=!1);return t}function la(e){(Kc[0]||Pc).children.push(e);}function ca(e,t){return {start:zc.getPos(e),end:null==t?t:zc.getPos(t),source:null==t?t:Xc(e,t)}}function aa(e,t){e.end=zc.getPos(t),e.source=Xc(e.start.offset,t);}function ua(e){const t={type:6,name:e.rawName,nameLoc:ca(e.loc.start.offset,e.loc.start.offset+e.rawName.length),value:void 0,loc:e.loc};if(e.exp){const n=e.exp.loc;n.end.offset<e.loc.end.offset&&(n.start.offset--,n.start.column--,n.end.offset++,n.end.column++),t.value={type:2,content:e.exp.content,loc:n};}return t}function da(e,t=!1,n,s=0,o=0){return Jl(e,t,n,s)}function pa(e,t,n){Mc.onError(pc(e,ca(t,t)));}function ha(e,t){if(zc.reset(),Bc=null,Vc=null,Dc="",Uc=-1,jc=-1,Kc.length=0,$c=e,Mc=c({},Fc),t){let e;for(e in t)null!=t[e]&&(Mc[e]=t[e]);}zc.mode="html"===Mc.parseMode?1:"sfc"===Mc.parseMode?2:0,zc.inXML=1===Mc.ns||2===Mc.ns;const n=null==t?void 0:t.delimiters;n&&(zc.delimiterOpen=cc(n[0]),zc.delimiterClose=cc(n[1]));const s=Pc=function(e,t=""){return {type:0,source:t,children:e,helpers:new Set,components:[],directives:[],hoists:[],imports:[],cached:0,temps:0,codegenNode:void 0,loc:ql}}([],e);return zc.parse($c),s.loc=ca(0,e.length),s.children=sa(s.children),Pc=null,s}function fa(e,t){ga(e,t,ma(e,e.children[0]));}function ma(e,t){const{children:n}=e;return 1===n.length&&1===t.type&&!Ec(t)}function ga(e,t,n=!1){const{children:s}=e,o=s.length;let r=0;for(let i=0;i<s.length;i++){const e=s[i];if(1===e.type&&0===e.tagType){const s=n?0:ya(e,t);if(s>0){if(s>=2){e.codegenNode.patchFlag="-1",e.codegenNode=t.hoist(e.codegenNode),r++;continue}}else {const n=e.codegenNode;if(13===n.type){const s=xa(n);if((!s||512===s||1===s)&&_a(e,t)>=2){const s=Sa(e);s&&(n.props=t.hoist(s));}n.dynamicProps&&(n.dynamicProps=t.hoist(n.dynamicProps));}}}if(1===e.type){const n=1===e.tagType;n&&t.scopes.vSlot++,ga(e,t),n&&t.scopes.vSlot--;}else if(11===e.type)ga(e,t,1===e.children.length);else if(9===e.type)for(let n=0;n<e.branches.length;n++)ga(e.branches[n],t,1===e.branches[n].children.length);}if(r&&t.transformHoist&&t.transformHoist(s,t,e),r&&r===o&&1===e.type&&0===e.tagType&&e.codegenNode&&13===e.codegenNode.type&&p(e.codegenNode.children)){const n=t.hoist(Kl(e.codegenNode.children));t.hmr&&(n.content=`[...${n.content}]`),e.codegenNode.children=n;}}function ya(e,t){const{constantCache:n}=t;switch(e.type){case 1:if(0!==e.tagType)return 0;const s=n.get(e);if(void 0!==s)return s;const o=e.codegenNode;if(13!==o.type)return 0;if(o.isBlock&&"svg"!==e.tag&&"foreignObject"!==e.tag)return 0;if(xa(o))return n.set(e,0),0;{let s=3;const r=_a(e,t);if(0===r)return n.set(e,0),0;r<s&&(s=r);for(let o=0;o<e.children.length;o++){const r=ya(e.children[o],t);if(0===r)return n.set(e,0),0;r<s&&(s=r);}if(s>1)for(let o=0;o<e.props.length;o++){const r=e.props[o];if(7===r.type&&"bind"===r.name&&r.exp){const o=ya(r.exp,t);if(0===o)return n.set(e,0),0;o<s&&(s=o);}}if(o.isBlock){for(let t=0;t<e.props.length;t++){if(7===e.props[t].type)return n.set(e,0),0}t.removeHelper(al),t.removeHelper(tc(t.inSSR,o.isComponent)),o.isBlock=!1,t.helper(ec(t.inSSR,o.isComponent));}return n.set(e,s),s}case 2:case 3:return 3;case 9:case 11:case 10:default:return 0;case 5:case 12:return ya(e.content,t);case 4:return e.constType;case 8:let r=3;for(let n=0;n<e.children.length;n++){const s=e.children[n];if(y(s)||v(s))continue;const o=ya(s,t);if(0===o)return 0;o<r&&(r=o);}return r}}const va=new Set([El,Nl,Al,Il]);function ba(e,t){if(14===e.type&&!y(e.callee)&&va.has(e.callee)){const n=e.arguments[0];if(4===n.type)return ya(n,t);if(14===n.type)return ba(n,t)}return 0}function _a(e,t){let n=3;const s=Sa(e);if(s&&15===s.type){const{properties:e}=s;for(let s=0;s<e.length;s++){const{key:o,value:r}=e[s],i=ya(o,t);if(0===i)return i;let l;if(i<n&&(n=i),l=4===r.type?ya(r,t):14===r.type?ba(r,t):0,0===l)return l;l<n&&(n=l);}}return n}function Sa(e){const t=e.codegenNode;if(13===t.type)return t.props}function xa(e){const t=e.patchFlag;return t?parseInt(t,10):void 0}function Ca(e,{filename:t="",prefixIdentifiers:s=!1,hoistStatic:r=!1,hmr:i=!1,cacheHandlers:l=!1,nodeTransforms:c=[],directiveTransforms:a={},transformHoist:u=null,isBuiltInComponent:d=o,isCustomElement:p=o,expressionPlugins:h=[],scopeId:f=null,slotted:m=!0,ssr:g=!1,inSSR:v=!1,ssrCssVars:b="",bindingMetadata:_=n,inline:S=!1,isTS:x=!1,onError:C=uc,onWarn:k=dc,compatConfig:T}){const w=t.replace(/\?.*$/,"").match(/([^/\\]+)\.\w+$/),E={filename:t,selfName:w&&L(I(w[1])),prefixIdentifiers:s,hoistStatic:r,hmr:i,cacheHandlers:l,nodeTransforms:c,directiveTransforms:a,transformHoist:u,isBuiltInComponent:d,isCustomElement:p,expressionPlugins:h,scopeId:f,slotted:m,ssr:g,inSSR:v,ssrCssVars:b,bindingMetadata:_,inline:S,isTS:x,onError:C,onWarn:k,compatConfig:T,root:e,helpers:new Map,components:new Set,directives:new Set,hoists:[],imports:[],constantCache:new WeakMap,temps:0,cached:0,identifiers:Object.create(null),scopes:{vFor:0,vSlot:0,vPre:0,vOnce:0},parent:null,currentNode:e,childIndex:0,inVOnce:!1,helper(e){const t=E.helpers.get(e)||0;return E.helpers.set(e,t+1),e},removeHelper(e){const t=E.helpers.get(e);if(t){const n=t-1;n?E.helpers.set(e,n):E.helpers.delete(e);}},helperString:e=>`_${Hl[E.helper(e)]}`,replaceNode(e){E.parent.children[E.childIndex]=E.currentNode=e;},removeNode(e){const t=e?E.parent.children.indexOf(e):E.currentNode?E.childIndex:-1;e&&e!==E.currentNode?E.childIndex>t&&(E.childIndex--,E.onNodeRemoved()):(E.currentNode=null,E.onNodeRemoved()),E.parent.children.splice(t,1);},onNodeRemoved:o,addIdentifiers(e){},removeIdentifiers(e){},hoist(e){y(e)&&(e=Jl(e)),E.hoists.push(e);const t=Jl(`_hoisted_${E.hoists.length}`,!1,e.loc,2);return t.hoisted=e,t},cache:(e,t=!1)=>function(e,t,n=!1){return {type:20,index:e,value:t,isVNode:n,loc:ql}}(E.cached++,e,t)};return E}function ka(e,t){const n=Ca(e,t);Ta(e,n),t.hoistStatic&&fa(e,n),t.ssr||function(e,t){const{helper:n}=t,{children:s}=e;if(1===s.length){const n=s[0];if(ma(e,n)&&n.codegenNode){const s=n.codegenNode;13===s.type&&nc(s,t),e.codegenNode=s;}else e.codegenNode=n;}else if(s.length>1){let s=64;e.codegenNode=Wl(t,n(ol),void 0,e.children,s+"",void 0,void 0,!0,void 0,!1);}}(e,n),e.helpers=new Set([...n.helpers.keys()]),e.components=[...n.components],e.directives=[...n.directives],e.imports=n.imports,e.hoists=n.hoists,e.temps=n.temps,e.cached=n.cached,e.transformed=!0;}function Ta(e,t){t.currentNode=e;const{nodeTransforms:n}=t,s=[];for(let r=0;r<n.length;r++){const o=n[r](e,t);if(o&&(p(o)?s.push(...o):s.push(o)),!t.currentNode)return;e=t.currentNode;}switch(e.type){case 3:t.ssr||t.helper(fl);break;case 5:t.ssr||t.helper(Tl);break;case 9:for(let n=0;n<e.branches.length;n++)Ta(e.branches[n],t);break;case 10:case 11:case 1:case 0:!function(e,t){let n=0;const s=()=>{n--;};for(;n<e.children.length;n++){const o=e.children[n];y(o)||(t.parent=e,t.childIndex=n,t.onNodeRemoved=s,Ta(o,t));}}(e,t);}t.currentNode=e;let o=s.length;for(;o--;)s[o]();}function wa(e,t){const n=y(e)?t=>t===e:t=>e.test(t);return (e,s)=>{if(1===e.type){const{props:o}=e;if(3===e.tagType&&o.some(Tc))return;const r=[];for(let i=0;i<o.length;i++){const l=o[i];if(7===l.type&&n(l.name)){o.splice(i,1),i--;const n=t(e,l,s);n&&r.push(n);}}return r}}}const Ea="/*#__PURE__*/",Na=e=>`${Hl[e]}: _${Hl[e]}`;function Aa(e,t={}){const n=function(e,{mode:t="function",prefixIdentifiers:n="module"===t,sourceMap:s=!1,filename:o="template.vue.html",scopeId:r=null,optimizeImports:i=!1,runtimeGlobalName:l="Vue",runtimeModuleName:c="vue",ssrRuntimeModuleName:a="vue/server-renderer",ssr:u=!1,isTS:d=!1,inSSR:p=!1}){const h={mode:t,prefixIdentifiers:n,sourceMap:s,filename:o,scopeId:r,optimizeImports:i,runtimeGlobalName:l,runtimeModuleName:c,ssrRuntimeModuleName:a,ssr:u,isTS:d,inSSR:p,source:e.source,code:"",column:1,line:1,offset:0,indentLevel:0,pure:!1,map:void 0,helper:e=>`_${Hl[e]}`,push(e,t=-2,n){h.code+=e;},indent(){f(++h.indentLevel);},deindent(e=!1){e?--h.indentLevel:f(--h.indentLevel);},newline(){f(h.indentLevel);}};function f(e){h.push("\n"+"  ".repeat(e),0);}return h}(e,t);t.onContextCreated&&t.onContextCreated(n);const{mode:s,push:o,prefixIdentifiers:r,indent:i,deindent:l,newline:c,ssr:a}=n,u=Array.from(e.helpers),d=u.length>0,p=!r&&"module"!==s;!function(e,t){const{push:n,newline:s,runtimeGlobalName:o}=t,r=o,i=Array.from(e.helpers);if(i.length>0&&(n(`const _Vue = ${r}\n`,-1),e.hoists.length)){n(`const { ${[pl,hl,fl,ml,gl].filter((e=>i.includes(e))).map(Na).join(", ")} } = _Vue\n`,-1);}(function(e,t){if(!e.length)return;t.pure=!0;const{push:n,newline:s}=t;s();for(let o=0;o<e.length;o++){const r=e[o];r&&(n(`const _hoisted_${o+1} = `),La(r,t),s());}t.pure=!1;})(e.hoists,t),s(),n("return ");}(e,n);if(o(`function ${a?"ssrRender":"render"}(${(a?["_ctx","_push","_parent","_attrs"]:["_ctx","_cache"]).join(", ")}) {`),i(),p&&(o("with (_ctx) {"),i(),d&&(o(`const { ${u.map(Na).join(", ")} } = _Vue\n`,-1),c())),e.components.length&&(Ia(e.components,"component",n),(e.directives.length||e.temps>0)&&c()),e.directives.length&&(Ia(e.directives,"directive",n),e.temps>0&&c()),e.temps>0){o("let ");for(let t=0;t<e.temps;t++)o(`${t>0?", ":""}_temp${t}`);}return (e.components.length||e.directives.length||e.temps)&&(o("\n",0),c()),a||o("return "),e.codegenNode?La(e.codegenNode,n):o("null"),p&&(l(),o("}")),l(),o("}"),{ast:e,code:n.code,preamble:"",map:n.map?n.map.toJSON():void 0}}function Ia(e,t,{helper:n,push:s,newline:o,isTS:r}){const i=n("component"===t?yl:bl);for(let l=0;l<e.length;l++){let n=e[l];const c=n.endsWith("__self");c&&(n=n.slice(0,-6)),s(`const ${Oc(n,t)} = ${i}(${JSON.stringify(n)}${c?", true":""})${r?"!":""}`),l<e.length-1&&o();}}function Ra(e,t){const n=e.length>3||!1;t.push("["),n&&t.indent(),Oa(e,t,n),n&&t.deindent(),t.push("]");}function Oa(e,t,n=!1,s=!0){const{push:o,newline:r}=t;for(let i=0;i<e.length;i++){const l=e[i];y(l)?o(l,-3):p(l)?Ra(l,t):La(l,t),i<e.length-1&&(n?(s&&o(","),r()):s&&o(", "));}}function La(e,t){if(y(e))t.push(e,-3);else if(v(e))t.push(t.helper(e));else switch(e.type){case 1:case 9:case 11:case 12:La(e.codegenNode,t);break;case 2:!function(e,t){t.push(JSON.stringify(e.content),-3,e);}(e,t);break;case 4:Fa(e,t);break;case 5:!function(e,t){const{push:n,helper:s,pure:o}=t;o&&n(Ea);n(`${s(Tl)}(`),La(e.content,t),n(")");}(e,t);break;case 8:Ma(e,t);break;case 3:!function(e,t){const{push:n,helper:s,pure:o}=t;o&&n(Ea);n(`${s(fl)}(${JSON.stringify(e.content)})`,-3,e);}(e,t);break;case 13:!function(e,t){const{push:n,helper:s,pure:o}=t,{tag:r,props:i,children:l,patchFlag:c,dynamicProps:a,directives:u,isBlock:d,disableTracking:p,isComponent:h}=e;u&&n(s(Sl)+"(");d&&n(`(${s(al)}(${p?"true":""}), `);o&&n(Ea);const f=d?tc(t.inSSR,h):ec(t.inSSR,h);n(s(f)+"(",-2,e),Oa(function(e){let t=e.length;for(;t--&&null==e[t];);return e.slice(0,t+1).map((e=>e||"null"))}([r,i,l,c,a]),t),n(")"),d&&n(")");u&&(n(", "),La(u,t),n(")"));}(e,t);break;case 14:!function(e,t){const{push:n,helper:s,pure:o}=t,r=y(e.callee)?e.callee:s(e.callee);o&&n(Ea);n(r+"(",-2,e),Oa(e.arguments,t),n(")");}(e,t);break;case 15:!function(e,t){const{push:n,indent:s,deindent:o,newline:r}=t,{properties:i}=e;if(!i.length)return void n("{}",-2,e);const l=i.length>1||!1;n(l?"{":"{ "),l&&s();for(let c=0;c<i.length;c++){const{key:e,value:s}=i[c];Pa(e,t),n(": "),La(s,t),c<i.length-1&&(n(","),r());}l&&o(),n(l?"}":" }");}(e,t);break;case 17:!function(e,t){Ra(e.elements,t);}(e,t);break;case 18:!function(e,t){const{push:n,indent:s,deindent:o}=t,{params:r,returns:i,body:l,newline:c,isSlot:a}=e;a&&n(`_${Hl[Bl]}(`);n("(",-2,e),p(r)?Oa(r,t):r&&La(r,t);n(") => "),(c||l)&&(n("{"),s());i?(c&&n("return "),p(i)?Ra(i,t):La(i,t)):l&&La(l,t);(c||l)&&(o(),n("}"));a&&n(")");}(e,t);break;case 19:!function(e,t){const{test:n,consequent:s,alternate:o,newline:r}=e,{push:i,indent:l,deindent:c,newline:a}=t;if(4===n.type){const e=!gc(n.content);e&&i("("),Fa(n,t),e&&i(")");}else i("("),La(n,t),i(")");r&&l(),t.indentLevel++,r||i(" "),i("? "),La(s,t),t.indentLevel--,r&&a(),r||i(" "),i(": ");const u=19===o.type;u||t.indentLevel++;La(o,t),u||t.indentLevel--;r&&c(!0);}(e,t);break;case 20:!function(e,t){const{push:n,helper:s,indent:o,deindent:r,newline:i}=t;n(`_cache[${e.index}] || (`),e.isVNode&&(o(),n(`${s(Ml)}(-1),`),i());n(`_cache[${e.index}] = `),La(e.value,t),e.isVNode&&(n(","),i(),n(`${s(Ml)}(1),`),i(),n(`_cache[${e.index}]`),r());n(")");}(e,t);break;case 21:Oa(e.body,t,!0,!1);}}function Fa(e,t){const{content:n,isStatic:s}=e;t.push(s?JSON.stringify(n):n,-3,e);}function Ma(e,t){for(let n=0;n<e.children.length;n++){const s=e.children[n];y(s)?t.push(s,-3):La(s,t);}}function Pa(e,t){const{push:n}=t;if(8===e.type)n("["),Ma(e,t),n("]");else if(e.isStatic){n(gc(e.content)?e.content:JSON.stringify(e.content),-2,e);}else n(`[${e.content}]`,-3,e);}const $a=wa(/^(if|else|else-if)$/,((e,t,n)=>function(e,t,n,s){if(!("else"===t.name||t.exp&&t.exp.content.trim())){const s=t.exp?t.exp.loc:e.loc;n.onError(pc(28,t.loc)),t.exp=Jl("true",!1,s);}if("if"===t.name){const o=Ba(e,t),r={type:9,loc:e.loc,branches:[o]};if(n.replaceNode(r),s)return s(r,o,!0)}else {const o=n.parent.children;let r=o.indexOf(e);for(;r-- >=-1;){const i=o[r];if(i&&3===i.type)n.removeNode(i);else {if(!i||2!==i.type||i.content.trim().length){if(i&&9===i.type){"else-if"===t.name&&void 0===i.branches[i.branches.length-1].condition&&n.onError(pc(30,e.loc)),n.removeNode();const o=Ba(e,t);i.branches.push(o);const r=s&&s(i,o,!1);Ta(o,n),r&&r(),n.currentNode=null;}else n.onError(pc(30,e.loc));break}n.removeNode(i);}}}}(e,t,n,((e,t,s)=>{const o=n.parent.children;let r=o.indexOf(e),i=0;for(;r-- >=0;){const e=o[r];e&&9===e.type&&(i+=e.branches.length);}return ()=>{if(s)e.codegenNode=Va(t,i,n);else {const s=function(e){for(;;)if(19===e.type){if(19!==e.alternate.type)return e;e=e.alternate;}else 20===e.type&&(e=e.value);}(e.codegenNode);s.alternate=Va(t,i+e.branches.length-1,n);}}}))));function Ba(e,t){const n=3===e.tagType;return {type:10,loc:e.loc,condition:"else"===t.name?void 0:t.exp,children:n&&!Sc(e,"for")?e.children:[e],userKey:xc(e,"key"),isTemplateIf:n}}function Va(e,t,n){return e.condition?Yl(e.condition,Da(e,t,n),Ql(n.helper(fl),['""',"true"])):Da(e,t,n)}function Da(e,t,n){const{helper:s}=n,o=Gl("key",Jl(`${t}`,!1,ql,2)),{children:r}=e,i=r[0];if(1!==r.length||1!==i.type){if(1===r.length&&11===i.type){const e=i.codegenNode;return Ic(e,o,n),e}{let t=64;return Wl(n,s(ol),zl([o]),r,t+"",void 0,void 0,!0,!1,!1,e.loc)}}{const e=i.codegenNode,t=14===(l=e).type&&l.callee===Ul?l.arguments[1].returns:l;return 13===t.type&&nc(t,n),Ic(t,o,n),e}var l;}const Ua=wa("for",((e,t,n)=>{const{helper:s,removeHelper:o}=n;return function(e,t,n,s){if(!t.exp)return void n.onError(pc(31,t.loc));const o=t.forParseResult;if(!o)return void n.onError(pc(32,t.loc));ja(o);const{scopes:r}=n,{source:i,value:l,key:c,index:a}=o,u={type:11,loc:t.loc,source:i,valueAlias:l,keyAlias:c,objectIndexAlias:a,parseResult:o,children:wc(e)?e.children:[e]};n.replaceNode(u),r.vFor++;const d=s&&s(u);return ()=>{r.vFor--,d&&d();}}(e,t,n,(t=>{const r=Ql(s(xl),[t.source]),i=wc(e),l=Sc(e,"memo"),c=xc(e,"key"),a=c&&(6===c.type?Jl(c.value.content,!0):c.exp),u=c?Gl("key",a):null,d=4===t.source.type&&t.source.constType>0,p=d?64:c?128:256;return t.codegenNode=Wl(n,s(ol),void 0,r,p+"",void 0,void 0,!0,!d,!1,e.loc),()=>{let c;const{children:p}=t,h=1!==p.length||1!==p[0].type,f=Ec(e)?e:i&&1===e.children.length&&Ec(e.children[0])?e.children[0]:null;if(f?(c=f.codegenNode,i&&u&&Ic(c,u,n)):h?c=Wl(n,s(ol),u?zl([u]):void 0,e.children,"64",void 0,void 0,!0,void 0,!1):(c=p[0].codegenNode,i&&u&&Ic(c,u,n),c.isBlock!==!d&&(c.isBlock?(o(al),o(tc(n.inSSR,c.isComponent))):o(ec(n.inSSR,c.isComponent))),c.isBlock=!d,c.isBlock?(s(al),s(tc(n.inSSR,c.isComponent))):s(ec(n.inSSR,c.isComponent))),l){const e=Zl(Ha(t.parseResult,[Jl("_cached")]));e.body={type:21,body:[Xl(["const _memo = (",l.exp,")"]),Xl(["if (_cached",...a?[" && _cached.key === ",a]:[],` && ${n.helperString(jl)}(_cached, _memo)) return _cached`]),Xl(["const _item = ",c]),Jl("_item.memo = _memo"),Jl("return _item")],loc:ql},r.arguments.push(e,Jl("_cache"),Jl(String(n.cached++)));}else r.arguments.push(Zl(Ha(t.parseResult),c,!0));}}))}));function ja(e,t){e.finalized||(e.finalized=!0);}function Ha({value:e,key:t,index:n},s=[]){return function(e){let t=e.length;for(;t--&&!e[t];);return e.slice(0,t+1).map(((e,t)=>e||Jl("_".repeat(t+1),!1)))}([e,t,n,...s])}const qa=Jl("undefined",!1),Wa=(e,t)=>{if(1===e.type&&(1===e.tagType||3===e.tagType)){const n=Sc(e,"slot");if(n)return t.scopes.vSlot++,()=>{t.scopes.vSlot--;}}},Ka=(e,t,n,s)=>Zl(e,n,!1,!0,n.length?n[0].loc:s);function za(e,t,n=Ka){t.helper(Bl);const{children:s,loc:o}=e,r=[],i=[];let l=t.scopes.vSlot>0||t.scopes.vFor>0;const c=Sc(e,"slot",!0);if(c){const{arg:e,exp:t}=c;e&&!hc(e)&&(l=!0),r.push(Gl(e||Jl("default",!0),n(t,void 0,s,o)));}let a=!1,u=!1;const d=[],p=new Set;let h=0;for(let g=0;g<s.length;g++){const e=s[g];let o;if(!wc(e)||!(o=Sc(e,"slot",!0))){3!==e.type&&d.push(e);continue}if(c){t.onError(pc(37,o.loc));break}a=!0;const{children:f,loc:m}=e,{arg:y=Jl("default",!0),exp:v,loc:b}=o;let _;hc(y)?_=y?y.content:"default":l=!0;const S=Sc(e,"for"),x=n(v,S,f,m);let C,k;if(C=Sc(e,"if"))l=!0,i.push(Yl(C.exp,Ga(y,x,h++),qa));else if(k=Sc(e,/^else(-if)?$/,!0)){let e,n=g;for(;n--&&(e=s[n],3===e.type););if(e&&wc(e)&&Sc(e,"if")){s.splice(g,1),g--;let e=i[i.length-1];for(;19===e.alternate.type;)e=e.alternate;e.alternate=k.exp?Yl(k.exp,Ga(y,x,h++),qa):Ga(y,x,h++);}else t.onError(pc(30,k.loc));}else if(S){l=!0;const e=S.forParseResult;e?(ja(e),i.push(Ql(t.helper(xl),[e.source,Zl(Ha(e),Ga(y,x),!0)]))):t.onError(pc(32,S.loc));}else {if(_){if(p.has(_)){t.onError(pc(38,b));continue}p.add(_),"default"===_&&(u=!0);}r.push(Gl(y,x));}}if(!c){const e=(e,t)=>Gl("default",n(e,void 0,t,o));a?d.length&&d.some((e=>Xa(e)))&&(u?t.onError(pc(39,d[0].loc)):r.push(e(void 0,d))):r.push(e(void 0,s));}const f=l?2:Ja(e.children)?3:1;let m=zl(r.concat(Gl("_",Jl(f+"",!1))),o);return i.length&&(m=Ql(t.helper(kl),[m,Kl(i)])),{slots:m,hasDynamicSlots:l}}function Ga(e,t,n){const s=[Gl("name",e),Gl("fn",t)];return null!=n&&s.push(Gl("key",Jl(String(n),!0))),zl(s)}function Ja(e){for(let t=0;t<e.length;t++){const n=e[t];switch(n.type){case 1:if(2===n.tagType||Ja(n.children))return !0;break;case 9:if(Ja(n.branches))return !0;break;case 10:case 11:if(Ja(n.children))return !0}}return !1}function Xa(e){return 2!==e.type&&12!==e.type||(2===e.type?!!e.content.trim():Xa(e.content))}const Qa=new WeakMap,Za=(e,t)=>function(){if(1!==(e=t.currentNode).type||0!==e.tagType&&1!==e.tagType)return;const{tag:n,props:s}=e,o=1===e.tagType;let r=o?function(e,t,n=!1){let{tag:s}=e;const o=nu(s),r=xc(e,"is");if(r)if(o){const e=6===r.type?r.value&&Jl(r.value.content,!0):r.exp;if(e)return Ql(t.helper(vl),[e])}else 6===r.type&&r.value.content.startsWith("vue:")&&(s=r.value.content.slice(4));const i=fc(s)||t.isBuiltInComponent(s);if(i)return n||t.helper(i),i;return t.helper(yl),t.components.add(s),Oc(s,"component")}(e,t):`"${n}"`;const i=b(r)&&r.callee===vl;let l,c,a,u,d,p,h=0,f=i||r===rl||r===il||!o&&("svg"===n||"foreignObject"===n);if(s.length>0){const n=Ya(e,t,void 0,o,i);l=n.props,h=n.patchFlag,d=n.dynamicPropNames;const s=n.directives;p=s&&s.length?Kl(s.map((e=>function(e,t){const n=[],s=Qa.get(e);s?n.push(t.helperString(s)):(t.helper(bl),t.directives.add(e.name),n.push(Oc(e.name,"directive")));const{loc:o}=e;e.exp&&n.push(e.exp);e.arg&&(e.exp||n.push("void 0"),n.push(e.arg));if(Object.keys(e.modifiers).length){e.arg||(e.exp||n.push("void 0"),n.push("void 0"));const t=Jl("true",!1,o);n.push(zl(e.modifiers.map((e=>Gl(e,t))),o));}return Kl(n,e.loc)}(e,t)))):void 0,n.shouldUseBlock&&(f=!0);}if(e.children.length>0){r===ll&&(f=!0,h|=1024);if(o&&r!==rl&&r!==ll){const{slots:n,hasDynamicSlots:s}=za(e,t);c=n,s&&(h|=1024);}else if(1===e.children.length&&r!==rl){const n=e.children[0],s=n.type,o=5===s||8===s;o&&0===ya(n,t)&&(h|=1),c=o||2===s?n:e.children;}else c=e.children;}0!==h&&(a=String(h),d&&d.length&&(u=function(e){let t="[";for(let n=0,s=e.length;n<s;n++)t+=JSON.stringify(e[n]),n<s-1&&(t+=", ");return t+"]"}(d))),e.codegenNode=Wl(t,r,l,c,a,u,p,!!f,!1,o,e.loc);};function Ya(e,t,n=e.props,s,o,r=!1){const{tag:l,loc:c,children:a}=e;let u=[];const d=[],p=[],h=a.length>0;let f=!1,m=0,g=!1,y=!1,b=!1,_=!1,S=!1,x=!1;const C=[],k=e=>{u.length&&(d.push(zl(eu(u),c)),u=[]),e&&d.push(e);},T=({key:e,value:n})=>{if(hc(e)){const r=e.content,l=i(r);if(!l||s&&!o||"onclick"===r.toLowerCase()||"onUpdate:modelValue"===r||w(r)||(_=!0),l&&w(r)&&(x=!0),l&&14===n.type&&(n=n.arguments[0]),20===n.type||(4===n.type||8===n.type)&&ya(n,t)>0)return;"ref"===r?g=!0:"class"===r?y=!0:"style"===r?b=!0:"key"===r||C.includes(r)||C.push(r),!s||"class"!==r&&"style"!==r||C.includes(r)||C.push(r);}else S=!0;};for(let i=0;i<n.length;i++){const o=n[i];if(6===o.type){const{loc:e,name:n,nameLoc:s,value:r}=o;let i=!0;if("ref"===n&&(g=!0,t.scopes.vFor>0&&u.push(Gl(Jl("ref_for",!0),Jl("true")))),"is"===n&&(nu(l)||r&&r.content.startsWith("vue:")))continue;u.push(Gl(Jl(n,!0,s),Jl(r?r.content:"",i,r?r.loc:e)));}else {const{name:n,arg:i,exp:a,loc:g,modifiers:y}=o,b="bind"===n,_="on"===n;if("slot"===n){s||t.onError(pc(40,g));continue}if("once"===n||"memo"===n)continue;if("is"===n||b&&Cc(i,"is")&&nu(l))continue;if(_&&r)continue;if((b&&Cc(i,"key")||_&&h&&Cc(i,"vue:before-update"))&&(f=!0),b&&Cc(i,"ref")&&t.scopes.vFor>0&&u.push(Gl(Jl("ref_for",!0),Jl("true"))),!i&&(b||_)){S=!0,a?b?(k(),d.push(a)):k({type:14,loc:g,callee:t.helper(Rl),arguments:s?[a]:[a,"true"]}):t.onError(pc(b?34:35,g));continue}b&&y.includes("prop")&&(m|=32);const x=t.directiveTransforms[n];if(x){const{props:n,needRuntime:s}=x(o,e,t);!r&&n.forEach(T),_&&i&&!hc(i)?k(zl(n,c)):u.push(...n),s&&(p.push(o),v(s)&&Qa.set(o,s));}else E(n)||(p.push(o),h&&(f=!0));}}let N;if(d.length?(k(),N=d.length>1?Ql(t.helper(wl),d,c):d[0]):u.length&&(N=zl(eu(u),c)),S?m|=16:(y&&!s&&(m|=2),b&&!s&&(m|=4),C.length&&(m|=8),_&&(m|=32)),f||0!==m&&32!==m||!(g||x||p.length>0)||(m|=512),!t.inSSR&&N)switch(N.type){case 15:let e=-1,n=-1,s=!1;for(let t=0;t<N.properties.length;t++){const o=N.properties[t].key;hc(o)?"class"===o.content?e=t:"style"===o.content&&(n=t):o.isHandlerKey||(s=!0);}const o=N.properties[e],r=N.properties[n];s?N=Ql(t.helper(Al),[N]):(o&&!hc(o.value)&&(o.value=Ql(t.helper(El),[o.value])),r&&(b||4===r.value.type&&"["===r.value.content.trim()[0]||17===r.value.type)&&(r.value=Ql(t.helper(Nl),[r.value])));break;case 14:break;default:N=Ql(t.helper(Al),[Ql(t.helper(Il),[N])]);}return {props:N,directives:p,patchFlag:m,dynamicPropNames:C,shouldUseBlock:f}}function eu(e){const t=new Map,n=[];for(let s=0;s<e.length;s++){const o=e[s];if(8===o.key.type||!o.key.isStatic){n.push(o);continue}const r=o.key.content,l=t.get(r);l?("style"===r||"class"===r||i(r))&&tu(l,o):(t.set(r,o),n.push(o));}return n}function tu(e,t){17===e.value.type?e.value.elements.push(t.value):e.value=Kl([e.value,t.value],e.loc);}function nu(e){return "component"===e||"Component"===e}const su=(e,t)=>{if(Ec(e)){const{children:n,loc:s}=e,{slotName:o,slotProps:r}=function(e,t){let n,s='"default"';const o=[];for(let r=0;r<e.props.length;r++){const t=e.props[r];if(6===t.type)t.value&&("name"===t.name?s=JSON.stringify(t.value.content):(t.name=I(t.name),o.push(t)));else if("bind"===t.name&&Cc(t.arg,"name")){if(t.exp)s=t.exp;else if(t.arg&&4===t.arg.type){const e=I(t.arg.content);s=t.exp=Jl(e,!1,t.arg.loc);}}else "bind"===t.name&&t.arg&&hc(t.arg)&&(t.arg.content=I(t.arg.content)),o.push(t);}if(o.length>0){const{props:s,directives:r}=Ya(e,t,o,!1,!1);n=s,r.length&&t.onError(pc(36,r[0].loc));}return {slotName:s,slotProps:n}}(e,t),i=[t.prefixIdentifiers?"_ctx.$slots":"$slots",o,"{}","undefined","true"];let l=2;r&&(i[2]=r,l=3),n.length&&(i[3]=Zl([],n,!1,!1,s),l=4),t.scopeId&&!t.slotted&&(l=5),i.splice(l),e.codegenNode=Ql(t.helper(Cl),i,s);}};const ou=/^\s*([\w$_]+|(async\s*)?\([^)]*?\))\s*(:[^=]+)?=>|^\s*(async\s+)?function(?:\s+[\w$]+)?\s*\(/,ru=(e,t,n,s)=>{const{loc:o,modifiers:r,arg:i}=e;let l;if(4===i.type)if(i.isStatic){let e=i.content;e.startsWith("vue:")&&(e=`vnode-${e.slice(4)}`);l=Jl(0!==t.tagType||e.startsWith("vnode")||!/[A-Z]/.test(e)?F(I(e)):`on:${e}`,!0,i.loc);}else l=Xl([`${n.helperString(Fl)}(`,i,")"]);else l=i,l.children.unshift(`${n.helperString(Fl)}(`),l.children.push(")");let c=e.exp;c&&!c.content.trim()&&(c=void 0);let a=n.cacheHandlers&&!c&&!n.inVOnce;if(c){const e=_c(c.content),t=!(e||ou.test(c.content)),n=c.content.includes(";");(t||a&&e)&&(c=Xl([`${t?"$event":"(...args)"} => ${n?"{":"("}`,c,n?"}":")"]));}let u={props:[Gl(l,c||Jl("() => {}",!1,o))]};return s&&(u=s(u)),a&&(u.props[0].value=n.cache(u.props[0].value)),u.props.forEach((e=>e.key.isHandlerKey=!0)),u},iu=(e,t,n)=>{const{modifiers:s,loc:o}=e,r=e.arg;let{exp:i}=e;if(i&&4===i.type&&!i.content.trim()&&(i=void 0),!i){if(4!==r.type||!r.isStatic)return n.onError(pc(52,r.loc)),{props:[Gl(r,Jl("",!0,o))]};const t=I(r.content);i=e.exp=Jl(t,!1,r.loc);}return 4!==r.type?(r.children.unshift("("),r.children.push(') || ""')):r.isStatic||(r.content=`${r.content} || ""`),s.includes("camel")&&(4===r.type?r.content=r.isStatic?I(r.content):`${n.helperString(Ol)}(${r.content})`:(r.children.unshift(`${n.helperString(Ol)}(`),r.children.push(")"))),n.inSSR||(s.includes("prop")&&lu(r,"."),s.includes("attr")&&lu(r,"^")),{props:[Gl(r,i)]}},lu=(e,t)=>{4===e.type?e.content=e.isStatic?t+e.content:`\`${t}\${${e.content}}\``:(e.children.unshift(`'${t}' + (`),e.children.push(")"));},cu=(e,t)=>{if(0===e.type||1===e.type||11===e.type||10===e.type)return ()=>{const n=e.children;let s,o=!1;for(let e=0;e<n.length;e++){const t=n[e];if(kc(t)){o=!0;for(let o=e+1;o<n.length;o++){const r=n[o];if(!kc(r)){s=void 0;break}s||(s=n[e]=Xl([t],t.loc)),s.children.push(" + ",r),n.splice(o,1),o--;}}}if(o&&(1!==n.length||0!==e.type&&(1!==e.type||0!==e.tagType||e.props.find((e=>7===e.type&&!t.directiveTransforms[e.name])))))for(let e=0;e<n.length;e++){const s=n[e];if(kc(s)||8===s.type){const o=[];2===s.type&&" "===s.content||o.push(s),t.ssr||0!==ya(s,t)||o.push("1"),n[e]={type:12,content:s,loc:s.loc,codegenNode:Ql(t.helper(ml),o)};}}}},au=new WeakSet,uu=(e,t)=>{if(1===e.type&&Sc(e,"once",!0)){if(au.has(e)||t.inVOnce||t.inSSR)return;return au.add(e),t.inVOnce=!0,t.helper(Ml),()=>{t.inVOnce=!1;const e=t.currentNode;e.codegenNode&&(e.codegenNode=t.cache(e.codegenNode,!0));}}},du=(e,t,n)=>{const{exp:s,arg:o}=e;if(!s)return n.onError(pc(41,e.loc)),pu();const r=s.loc.source,i=4===s.type?s.content:r,l=n.bindingMetadata[r];if("props"===l||"props-aliased"===l)return pu();if(!i.trim()||!_c(i))return n.onError(pc(42,s.loc)),pu();const c=o||Jl("modelValue",!0),a=o?hc(o)?`onUpdate:${I(o.content)}`:Xl(['"onUpdate:" + ',o]):"onUpdate:modelValue";let u;u=Xl([`${n.isTS?"($event: any)":"$event"} => ((`,s,") = $event)"]);const d=[Gl(c,e.exp),Gl(a,u)];if(e.modifiers.length&&1===t.tagType){const t=e.modifiers.map((e=>(gc(e)?e:JSON.stringify(e))+": true")).join(", "),n=o?hc(o)?`${o.content}Modifiers`:Xl([o,' + "Modifiers"']):"modelModifiers";d.push(Gl(n,Jl(`{ ${t} }`,!1,e.loc,2)));}return pu(d)};function pu(e=[]){return {props:e}}const hu=new WeakSet,fu=(e,t)=>{if(1===e.type){const n=Sc(e,"memo");if(!n||hu.has(e))return;return hu.add(e),()=>{const s=e.codegenNode||t.currentNode.codegenNode;s&&13===s.type&&(1!==e.tagType&&nc(s,t),e.codegenNode=Ql(t.helper(Ul),[n.exp,Zl(void 0,s),"_cache",String(t.cached++)]));}}};function mu(e,t={}){const n=t.onError||uc,s="module"===t.mode;!0===t.prefixIdentifiers?n(pc(47)):s&&n(pc(48));t.cacheHandlers&&n(pc(49)),t.scopeId&&!s&&n(pc(50));const o=c({},t,{prefixIdentifiers:!1}),r=y(e)?ha(e,o):e,[i,l]=[[uu,$a,fu,Ua,su,Za,Wa,cu],{on:ru,bind:iu,model:du}];return ka(r,c({},o,{nodeTransforms:[...i,...t.nodeTransforms||[]],directiveTransforms:c({},l,t.directiveTransforms||{})})),Aa(r,o)}const gu=Symbol(""),yu=Symbol(""),vu=Symbol(""),bu=Symbol(""),_u=Symbol(""),Su=Symbol(""),xu=Symbol(""),Cu=Symbol(""),ku=Symbol(""),Tu=Symbol("");var wu;let Eu;wu={[gu]:"vModelRadio",[yu]:"vModelCheckbox",[vu]:"vModelText",[bu]:"vModelSelect",[_u]:"vModelDynamic",[Su]:"withModifiers",[xu]:"withKeys",[Cu]:"vShow",[ku]:"Transition",[Tu]:"TransitionGroup"},Object.getOwnPropertySymbols(wu).forEach((e=>{Hl[e]=wu[e];}));const Nu={parseMode:"html",isVoidTag:Z,isNativeTag:e=>J(e)||X(e)||Q(e),isPreTag:e=>"pre"===e,decodeEntities:function(e,t=!1){return Eu||(Eu=document.createElement("div")),t?(Eu.innerHTML=`<div foo="${e.replace(/"/g,"&quot;")}">`,Eu.children[0].getAttribute("foo")):(Eu.innerHTML=e,Eu.textContent)},isBuiltInComponent:e=>"Transition"===e||"transition"===e?ku:"TransitionGroup"===e||"transition-group"===e?Tu:void 0,getNamespace(e,t,n){let s=t?t.ns:n;if(t&&2===s)if("annotation-xml"===t.tag){if("svg"===e)return 1;t.props.some((e=>6===e.type&&"encoding"===e.name&&null!=e.value&&("text/html"===e.value.content||"application/xhtml+xml"===e.value.content)))&&(s=0);}else /^m(?:[ions]|text)$/.test(t.tag)&&"mglyph"!==e&&"malignmark"!==e&&(s=0);else t&&1===s&&("foreignObject"!==t.tag&&"desc"!==t.tag&&"title"!==t.tag||(s=0));if(0===s){if("svg"===e)return 1;if("math"===e)return 2}return s}},Au=(e,t)=>{const n=z(e);return Jl(JSON.stringify(n),!1,t,3)};function Iu(e,t){return pc(e,t)}const Ru=t("passive,once,capture"),Ou=t("stop,prevent,self,ctrl,shift,alt,meta,exact,middle"),Lu=t("left,right"),Fu=t("onkeyup,onkeydown,onkeypress",!0),Mu=(e,t)=>hc(e)&&"onclick"===e.content.toLowerCase()?Jl(t,!0):4!==e.type?Xl(["(",e,`) === "onClick" ? "${t}" : (`,e,")"]):e,Pu=(e,t)=>{1!==e.type||0!==e.tagType||"script"!==e.tag&&"style"!==e.tag||t.removeNode();},$u=[e=>{1===e.type&&e.props.forEach(((t,n)=>{6===t.type&&"style"===t.name&&t.value&&(e.props[n]={type:7,name:"bind",arg:Jl("style",!0,t.loc),exp:Au(t.value.content,t.loc),modifiers:[],loc:t.loc});}));}],Bu={cloak:()=>({props:[]}),html:(e,t,n)=>{const{exp:s,loc:o}=e;return s||n.onError(Iu(53,o)),t.children.length&&(n.onError(Iu(54,o)),t.children.length=0),{props:[Gl(Jl("innerHTML",!0,o),s||Jl("",!0))]}},text:(e,t,n)=>{const{exp:s,loc:o}=e;return s||n.onError(Iu(55,o)),t.children.length&&(n.onError(Iu(56,o)),t.children.length=0),{props:[Gl(Jl("textContent",!0),s?ya(s,n)>0?s:Ql(n.helperString(Tl),[s],o):Jl("",!0))]}},model:(e,t,n)=>{const s=du(e,t,n);if(!s.props.length||1===t.tagType)return s;e.arg&&n.onError(Iu(58,e.arg.loc));const{tag:o}=t,r=n.isCustomElement(o);if("input"===o||"textarea"===o||"select"===o||r){let i=vu,l=!1;if("input"===o||r){const s=xc(t,"type");if(s){if(7===s.type)i=_u;else if(s.value)switch(s.value.content){case"radio":i=gu;break;case"checkbox":i=yu;break;case"file":l=!0,n.onError(Iu(59,e.loc));}}else (function(e){return e.props.some((e=>!(7!==e.type||"bind"!==e.name||e.arg&&4===e.arg.type&&e.arg.isStatic)))})(t)&&(i=_u);}else "select"===o&&(i=bu);l||(s.needRuntime=n.helper(i));}else n.onError(Iu(57,e.loc));return s.props=s.props.filter((e=>!(4===e.key.type&&"modelValue"===e.key.content))),s},on:(e,t,n)=>ru(e,t,n,(t=>{const{modifiers:s}=e;if(!s.length)return t;let{key:o,value:r}=t.props[0];const{keyModifiers:i,nonKeyModifiers:l,eventOptionModifiers:c}=((e,t,n,s)=>{const o=[],r=[],i=[];for(let l=0;l<t.length;l++){const n=t[l];Ru(n)?i.push(n):Lu(n)?hc(e)?Fu(e.content)?o.push(n):r.push(n):(o.push(n),r.push(n)):Ou(n)?r.push(n):o.push(n);}return {keyModifiers:o,nonKeyModifiers:r,eventOptionModifiers:i}})(o,s);if(l.includes("right")&&(o=Mu(o,"onContextmenu")),l.includes("middle")&&(o=Mu(o,"onMouseup")),l.length&&(r=Ql(n.helper(Su),[r,JSON.stringify(l)])),!i.length||hc(o)&&!Fu(o.content)||(r=Ql(n.helper(xu),[r,JSON.stringify(i)])),c.length){const e=c.map(L).join("");o=hc(o)?Jl(`${o.content}${e}`,!0):Xl(["(",o,`) + "${e}"`]);}return {props:[Gl(o,r)]}})),show:(e,t,n)=>{const{exp:s,loc:o}=e;return s||n.onError(Iu(61,o)),{props:[],needRuntime:n.helper(Cu)}}};const Vu=new WeakMap;function Du(e,t){if(!y(e)){if(!e.nodeType)return o;e=e.innerHTML;}const s=e,r=function(e){let t=Vu.get(null!=e?e:n);return t||(t=Object.create(null),Vu.set(null!=e?e:n,t)),t}(t),i=r[s];if(i)return i;if("#"===e[0]){const t=document.querySelector(e);e=t?t.innerHTML:"";}const l=c({hoistStatic:!0,onError:void 0,onWarn:o},t);l.isCustomElement||"undefined"==typeof customElements||(l.isCustomElement=e=>!!customElements.get(e));const{code:a}=function(e,t={}){return mu(e,c({},Nu,t,{nodeTransforms:[Pu,...$u,...t.nodeTransforms||[]],directiveTransforms:c({},Bu,t.directiveTransforms||{}),transformHoist:null}))}(e,l),u=new Function(a)();return u._rc=!0,r[s]=u}return _r(Du),e.BaseTransition=Jn,e.BaseTransitionPropsValidators=Gn,e.Comment=Po,e.DeprecationTypes=null,e.EffectScope=le,e.ErrorCodes={SETUP_FUNCTION:0,0:"SETUP_FUNCTION",RENDER_FUNCTION:1,1:"RENDER_FUNCTION",WATCH_GETTER:2,2:"WATCH_GETTER",WATCH_CALLBACK:3,3:"WATCH_CALLBACK",WATCH_CLEANUP:4,4:"WATCH_CLEANUP",NATIVE_EVENT_HANDLER:5,5:"NATIVE_EVENT_HANDLER",COMPONENT_EVENT_HANDLER:6,6:"COMPONENT_EVENT_HANDLER",VNODE_HOOK:7,7:"VNODE_HOOK",DIRECTIVE_HOOK:8,8:"DIRECTIVE_HOOK",TRANSITION_HOOK:9,9:"TRANSITION_HOOK",APP_ERROR_HANDLER:10,10:"APP_ERROR_HANDLER",APP_WARN_HANDLER:11,11:"APP_WARN_HANDLER",FUNCTION_REF:12,12:"FUNCTION_REF",ASYNC_COMPONENT_LOADER:13,13:"ASYNC_COMPONENT_LOADER",SCHEDULER:14,14:"SCHEDULER"},e.ErrorTypeStrings=null,e.Fragment=Fo,e.KeepAlive=is,e.ReactiveEffect=ue,e.Static=$o,e.Suspense=Nn,e.Teleport=Oo,e.Text=Mo,e.TrackOpTypes={GET:"get",HAS:"has",ITERATE:"iterate"},e.Transition=$r,e.TransitionGroup=Ei,e.TriggerOpTypes={SET:"set",ADD:"add",DELETE:"delete",CLEAR:"clear"},e.VueElement=Si,e.assertNumber=function(e,t){},e.callWithAsyncErrorHandling=Ht,e.callWithErrorHandling=jt,e.camelize=I,e.capitalize=L,e.cloneVNode=er,e.compatUtils=null,e.compile=Du,e.computed=Tr,e.createApp=(...e)=>{const t=Qi().createApp(...e),{mount:n}=t;return t.mount=e=>{const s=nl(e);if(!s)return;const o=t._component;g(o)||o.render||o.template||(o.template=s.innerHTML),s.innerHTML="";const r=n(s,!1,tl(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),r},t},e.createBlock=Wo,e.createCommentVNode=function(e="",t=!1){return t?(Do(),Wo(Po,null,e)):Zo(Po,null,e)},e.createElementBlock=function(e,t,n,s,o,r){return qo(Qo(e,t,n,s,o,r,!0))},e.createElementVNode=Qo,e.createHydrationRenderer=_o,e.createPropsRestProxy=function(e,t){const n={};for(const s in e)t.includes(s)||Object.defineProperty(n,s,{enumerable:!0,get:()=>e[s]});return n},e.createRenderer=bo,e.createSSRApp=(...e)=>{const t=Zi().createApp(...e),{mount:n}=t;return t.mount=e=>{const t=nl(e);if(t)return n(t,!0,tl(t))},t},e.createSlots=function(e,t){for(let n=0;n<t.length;n++){const s=t[n];if(p(s))for(let t=0;t<s.length;t++)e[s[t].name]=s[t].fn;else s&&(e[s.name]=s.key?(...e)=>{const t=s.fn(...e);return t&&(t.key=s.key),t}:s.fn);}return e},e.createStaticVNode=function(e,t){const n=Zo($o,null,e);return n.staticCount=t,n},e.createTextVNode=tr,e.createVNode=Zo,e.customRef=Bt,e.defineAsyncComponent=function(e){g(e)&&(e={loader:e});const{loader:t,loadingComponent:n,errorComponent:s,delay:o=200,timeout:r,suspensible:i=!0,onError:l}=e;let c,a=null,u=0;const d=()=>{let e;return a||(e=a=t().catch((e=>{if(e=e instanceof Error?e:new Error(String(e)),l)return new Promise(((t,n)=>{l(e,(()=>t((u++,a=null,d()))),(()=>n(e)),u+1);}));throw e})).then((t=>e!==a&&a?a:(t&&(t.__esModule||"Module"===t[Symbol.toStringTag])&&(t=t.default),c=t,t))))};return ns({name:"AsyncComponentWrapper",__asyncLoader:d,get __asyncResolved(){return c},setup(){const e=ar;if(c)return ()=>os(c,e);const t=t=>{a=null,qt(t,e,13,!s);};if(i&&e.suspense)return d().then((t=>()=>os(t,e))).catch((e=>(t(e),()=>s?Zo(s,{error:e}):null)));const l=Rt(!1),u=Rt(),p=Rt(!!o);return o&&setTimeout((()=>{p.value=!1;}),o),null!=r&&setTimeout((()=>{if(!l.value&&!u.value){const e=new Error(`Async component timed out after ${r}ms.`);t(e),u.value=e;}}),r),d().then((()=>{l.value=!0,e.parent&&rs(e.parent.vnode)&&(e.parent.effect.dirty=!0,tn(e.parent.update));})).catch((e=>{t(e),u.value=e;})),()=>l.value&&c?os(c,e):u.value&&s?Zo(s,{error:u.value}):n&&!p.value?Zo(n):void 0}})},e.defineComponent=ns,e.defineCustomElement=bi,e.defineEmits=function(){return null},e.defineExpose=function(e){},e.defineModel=function(){},e.defineOptions=function(e){},e.defineProps=function(){return null},e.defineSSRCustomElement=e=>bi(e,el),e.defineSlots=function(){return null},e.devtools=void 0,e.effect=function(e,t){e.effect instanceof ue&&(e=e.effect.fn);const n=new ue(e,o,(()=>{n.dirty&&n.run();}));t&&(c(n,t),t.scope&&ce(n,t.scope)),t&&t.lazy||n.run();const s=n.run.bind(n);return s.effect=n,s},e.effectScope=function(e){return new le(e)},e.getCurrentInstance=ur,e.getCurrentScope=ae,e.getTransitionRawChildren=ts,e.guardReactiveProps=Yo,e.h=wr,e.handleError=qt,e.hasInjectionContext=function(){return !!(ar||hn||Js)},e.hydrate=el,e.initCustomFormatter=function(){},e.initDirectivesForSSR=sl,e.inject=Qs,e.isMemoSame=Er,e.isProxy=xt,e.isReactive=bt,e.isReadonly=_t,e.isRef=It,e.isRuntimeOnly=()=>!gr,e.isShallow=St,e.isVNode=Ko,e.markRaw=kt,e.mergeDefaults=function(e,t){const n=Ls(e);for(const s in t){if(s.startsWith("__skip"))continue;let e=n[s];e?p(e)||g(e)?e=n[s]={type:e,default:t[s]}:e.default=t[s]:null===e&&(e=n[s]={default:t[s]}),e&&t[`__skip_${s}`]&&(e.skipFactory=!0);}return n},e.mergeModels=function(e,t){return e&&t?p(e)&&p(t)?e.concat(t):c({},Ls(e),Ls(t)):e||t},e.mergeProps=rr,e.nextTick=en,e.normalizeClass=G,e.normalizeProps=function(e){if(!e)return null;let{class:t,style:n}=e;return t&&!y(t)&&(e.class=G(t)),n&&(e.style=H(n)),e},e.normalizeStyle=H,e.onActivated=cs,e.onBeforeMount=gs,e.onBeforeUnmount=_s,e.onBeforeUpdate=vs,e.onDeactivated=as,e.onErrorCaptured=Ts,e.onMounted=ys,e.onRenderTracked=ks,e.onRenderTriggered=Cs,e.onScopeDispose=function(e){re&&re.cleanups.push(e);},e.onServerPrefetch=xs,e.onUnmounted=Ss,e.onUpdated=bs,e.openBlock=Do,e.popScopeId=function(){fn=null;},e.provide=Xs,e.proxyRefs=Pt,e.pushScopeId=function(e){fn=e;},e.queuePostFlushCb=sn,e.reactive=mt,e.readonly=yt,e.ref=Rt,e.registerRuntimeCompiler=_r,e.render=Yi,e.renderList=function(e,t,n,s){let o;const r=n&&n[s];if(p(e)||y(e)){o=new Array(e.length);for(let n=0,s=e.length;n<s;n++)o[n]=t(e[n],n,void 0,r&&r[n]);}else if("number"==typeof e){o=new Array(e);for(let n=0;n<e;n++)o[n]=t(n+1,n,void 0,r&&r[n]);}else if(b(e))if(e[Symbol.iterator])o=Array.from(e,((e,n)=>t(e,n,void 0,r&&r[n])));else {const n=Object.keys(e);o=new Array(n.length);for(let s=0,i=n.length;s<i;s++){const i=n[s];o[s]=t(e[i],i,s,r&&r[s]);}}else o=[];return n&&(n[s]=o),o},e.renderSlot=function(e,t,n={},s,o){if(hn.isCE||hn.parent&&ss(hn.parent)&&hn.parent.isCE)return "default"!==t&&(n.name=t),Zo("slot",n,s&&s());let r=e[t];r&&r._c&&(r._d=!1),Do();const i=r&&ws(r(n)),l=Wo(Fo,{key:n.key||i&&i.key||`_${t}`},i||(s?s():[]),i&&1===e._?64:-2);return !o&&l.scopeId&&(l.slotScopeIds=[l.scopeId+"-s"]),r&&r._c&&(r._d=!0),l},e.resolveComponent=function(e,t){return kn(xn,e,!0,t)||e},e.resolveDirective=function(e){return kn("directives",e)},e.resolveDynamicComponent=function(e){return y(e)?kn(xn,e,!1)||e:e||Cn},e.resolveFilter=null,e.resolveTransitionHooks=Qn,e.setBlockTracking=Ho,e.setDevtoolsHook=Ir,e.setTransitionHooks=es,e.shallowReactive=gt,e.shallowReadonly=function(e){return vt(e,!0,je,ut,ft)},e.shallowRef=function(e){return Ot(e,!0)},e.ssrContextKey=Fn,e.ssrUtils=null,e.stop=function(e){e.effect.stop();},e.toDisplayString=e=>y(e)?e:null==e?"":p(e)||b(e)&&(e.toString===S||!g(e.toString))?JSON.stringify(e,se,2):String(e),e.toHandlerKey=F,e.toHandlers=function(e,t){const n={};for(const s in e)n[t&&/[A-Z]/.test(s)?`on:${s}`:F(s)]=e[s];return n},e.toRaw=Ct,e.toRef=function(e,t,n){return It(e)?e:g(e)?new Dt(e):b(e)&&arguments.length>1?Ut(e,t,n):Rt(e)},e.toRefs=function(e){const t=p(e)?new Array(e.length):{};for(const n in e)t[n]=Ut(e,n);return t},e.toValue=function(e){return g(e)?e():Ft(e)},e.transformVNodeArgs=function(e){},e.triggerRef=function(e){At(e,4);},e.unref=Ft,e.useAttrs=function(){return Os().attrs},e.useCssModule=function(e="$style"){return n},e.useCssVars=function(e){const t=ur();if(!t)return;const n=t.ut=(n=e(t.proxy))=>{Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach((e=>oi(e,n)));},s=()=>{const s=e(t.proxy);si(t.subTree,s),n(s);};Mn(s),ys((()=>{const e=new MutationObserver(s);e.observe(t.subTree.el.parentNode,{childList:!0}),Ss((()=>e.disconnect()));}));},e.useModel=function(e,t,s=n){const o=ur(),r=I(t),i=O(t),l=Bt(((n,l)=>{let c;return Pn((()=>{const n=e[t];M(c,n)&&(c=n,l());})),{get:()=>(n(),s.get?s.get(c):c),set(e){const n=o.vnode.props;n&&(t in n||r in n||i in n)&&(`onUpdate:${t}`in n||`onUpdate:${r}`in n||`onUpdate:${i}`in n)||!M(e,c)||(c=e,l()),o.emit(`update:${t}`,s.set?s.set(e):e);}}})),c="modelValue"===t?"modelModifiers":`${t}Modifiers`;return l[Symbol.iterator]=()=>{let t=0;return {next:()=>t<2?{value:t++?e[c]||{}:l,done:!1}:{done:!0}}},l},e.useSSRContext=()=>{},e.useSlots=function(){return Os().slots},e.useTransitionState=Kn,e.vModelCheckbox=Pi,e.vModelDynamic=Hi,e.vModelRadio=Bi,e.vModelSelect=Vi,e.vModelText=Mi,e.vShow=ei,e.version=Nr,e.warn=Ar,e.watch=Bn,e.watchEffect=function(e,t){return Vn(e,null,t)},e.watchPostEffect=Mn,e.watchSyncEffect=Pn,e.withAsyncContext=function(e){const t=ur();let n=e();return fr(),_(n)&&(n=n.catch((e=>{throw hr(t),e}))),[n,()=>hr(t)]},e.withCtx=gn,e.withDefaults=function(e,t){return null},e.withDirectives=function(e,t){if(null===hn)return e;const s=Cr(hn)||hn.proxy,o=e.dirs||(e.dirs=[]);for(let r=0;r<t.length;r++){let[e,i,l,c=n]=t[r];e&&(g(e)&&(e={mounted:e,updated:e}),e.deep&&jn(i),o.push({dir:e,instance:s,value:i,oldValue:void 0,arg:l,modifiers:c}));}return e},e.withKeys=(e,t)=>{const n=e._withKeys||(e._withKeys={}),s=t.join(".");return n[s]||(n[s]=n=>{if(!("key"in n))return;const s=O(n.key);return t.some((e=>e===s||zi[e]===s))?e(n):void 0})},e.withMemo=function(e,t,n,s){const o=n[s];if(o&&Er(o,e))return o;const r=t();return r.memo=e.slice(),n[s]=r},e.withModifiers=(e,t)=>{const n=e._withMods||(e._withMods={}),s=t.join(".");return n[s]||(n[s]=(n,...s)=>{for(let e=0;e<t.length;e++){const s=Ki[t[e]];if(s&&s(n,t))return}return e(n,...s)})},e.withScopeId=e=>gn,e}({});

  /*!
    * vue-router v4.2.5
    * (c) 2023 Eduardo San Martin Morote
    * @license MIT
    */
  window.VueRouter=function(e,t){const n="undefined"!=typeof window;function r(e){return e.__esModule||"Module"===e[Symbol.toStringTag]}const o=Object.assign;function a(e,t){const n={};for(const r in t){const o=t[r];n[r]=s(o)?o.map(e):e(o);}return n}const c=()=>{},s=Array.isArray,i=/\/$/,l=e=>e.replace(i,"");function u(e,t,n="/"){let r,o={},a="",c="";const s=t.indexOf("#");let i=t.indexOf("?");return s<i&&s>=0&&(i=-1),i>-1&&(r=t.slice(0,i),a=t.slice(i+1,s>-1?s:t.length),o=e(a)),s>-1&&(r=r||t.slice(0,s),c=t.slice(s,t.length)),r=function(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/"),o=r[r.length-1];".."!==o&&"."!==o||r.push("");let a,c,s=n.length-1;for(a=0;a<r.length;a++)if(c=r[a],"."!==c){if(".."!==c)break;s>1&&s--;}return n.slice(0,s).join("/")+"/"+r.slice(a-(a===r.length?1:0)).join("/")}(null!=r?r:t,n),{fullPath:r+(a&&"?")+a+c,path:r,query:o,hash:c}}function f(e,t){return t&&e.toLowerCase().startsWith(t.toLowerCase())?e.slice(t.length)||"/":e}function p(e,t){return (e.aliasOf||e)===(t.aliasOf||t)}function h(e,t){if(Object.keys(e).length!==Object.keys(t).length)return !1;for(const n in e)if(!d(e[n],t[n]))return !1;return !0}function d(e,t){return s(e)?m(e,t):s(t)?m(t,e):e===t}function m(e,t){return s(t)?e.length===t.length&&e.every(((e,n)=>e===t[n])):1===e.length&&e[0]===t}var g,v;!function(e){e.pop="pop",e.push="push";}(g||(g={})),function(e){e.back="back",e.forward="forward",e.unknown="";}(v||(v={}));function y(e){if(!e)if(n){const t=document.querySelector("base");e=(e=t&&t.getAttribute("href")||"/").replace(/^\w+:\/\/[^\/]+/,"");}else e="/";return "/"!==e[0]&&"#"!==e[0]&&(e="/"+e),l(e)}const b=/^[^#]+#/;function w(e,t){return e.replace(b,"#")+t}const E=()=>({left:window.pageXOffset,top:window.pageYOffset});function R(e){let t;if("el"in e){const n=e.el,r="string"==typeof n&&n.startsWith("#"),o="string"==typeof n?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!o)return;t=function(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return {behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}(o,e);}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(null!=t.left?t.left:window.pageXOffset,null!=t.top?t.top:window.pageYOffset);}function O(e,t){return (history.state?history.state.position-t:-1)+e}const k=new Map;let j=()=>location.protocol+"//"+location.host;function P(e,t){const{pathname:n,search:r,hash:o}=t,a=e.indexOf("#");if(a>-1){let t=o.includes(e.slice(a))?e.slice(a).length:1,n=o.slice(t);return "/"!==n[0]&&(n="/"+n),f(n,"")}return f(n,e)+r+o}function C(e,t,n,r=!1,o=!1){return {back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:o?E():null}}function x(e){const t=function(e){const{history:t,location:n}=window,r={value:P(e,n)},a={value:t.state};function c(r,o,c){const s=e.indexOf("#"),i=s>-1?(n.host&&document.querySelector("base")?e:e.slice(s))+r:j()+e+r;try{t[c?"replaceState":"pushState"](o,"",i),a.value=o;}catch(e){console.error(e),n[c?"replace":"assign"](i);}}return a.value||c(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0),{location:r,state:a,push:function(e,n){const s=o({},a.value,t.state,{forward:e,scroll:E()});c(s.current,s,!0),c(e,o({},C(r.value,e,null),{position:s.position+1},n),!1),r.value=e;},replace:function(e,n){c(e,o({},t.state,C(a.value.back,e,a.value.forward,!0),n,{position:a.value.position}),!0),r.value=e;}}}(e=y(e)),n=function(e,t,n,r){let a=[],c=[],s=null;const i=({state:o})=>{const c=P(e,location),i=n.value,l=t.value;let u=0;if(o){if(n.value=c,t.value=o,s&&s===i)return void(s=null);u=l?o.position-l.position:0;}else r(c);a.forEach((e=>{e(n.value,i,{delta:u,type:g.pop,direction:u?u>0?v.forward:v.back:v.unknown});}));};function l(){const{history:e}=window;e.state&&e.replaceState(o({},e.state,{scroll:E()}),"");}return window.addEventListener("popstate",i),window.addEventListener("beforeunload",l,{passive:!0}),{pauseListeners:function(){s=n.value;},listen:function(e){a.push(e);const t=()=>{const t=a.indexOf(e);t>-1&&a.splice(t,1);};return c.push(t),t},destroy:function(){for(const e of c)e();c=[],window.removeEventListener("popstate",i),window.removeEventListener("beforeunload",l);}}}(e,t.state,t.location,t.replace);const r=o({location:"",base:e,go:function(e,t=!0){t||n.pauseListeners(),history.go(e);},createHref:w.bind(null,e)},t,n);return Object.defineProperty(r,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(r,"state",{enumerable:!0,get:()=>t.state.value}),r}function $(e){return "string"==typeof e||"symbol"==typeof e}const S={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},A=Symbol("");var L;function M(e,t){return o(new Error,{type:e,[A]:!0},t)}function q(e,t){return e instanceof Error&&A in e&&(null==t||!!(e.type&t))}e.NavigationFailureType=void 0,(L=e.NavigationFailureType||(e.NavigationFailureType={}))[L.aborted=4]="aborted",L[L.cancelled=8]="cancelled",L[L.duplicated=16]="duplicated";const B="[^/]+?",T={sensitive:!1,strict:!1,start:!0,end:!0},G=/[.+*?^${}()[\]/\\]/g;function _(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++;}return e.length<t.length?1===e.length&&80===e[0]?-1:1:e.length>t.length?1===t.length&&80===t[0]?1:-1:0}function F(e,t){let n=0;const r=e.score,o=t.score;for(;n<r.length&&n<o.length;){const e=_(r[n],o[n]);if(e)return e;n++;}if(1===Math.abs(o.length-r.length)){if(W(r))return 1;if(W(o))return -1}return o.length-r.length}function W(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const D={type:0,value:""},I=/[a-zA-Z0-9_]/;function K(e,t,n){const r=function(e,t){const n=o({},T,t),r=[];let a=n.start?"^":"";const c=[];for(const t of e){const e=t.length?[]:[90];n.strict&&!t.length&&(a+="/");for(let r=0;r<t.length;r++){const o=t[r];let s=40+(n.sensitive?.25:0);if(0===o.type)r||(a+="/"),a+=o.value.replace(G,"\\$&"),s+=40;else if(1===o.type){const{value:e,repeatable:n,optional:i,regexp:l}=o;c.push({name:e,repeatable:n,optional:i});const u=l||B;if(u!==B){s+=10;try{new RegExp(`(${u})`);}catch(t){throw new Error(`Invalid custom RegExp for param "${e}" (${u}): `+t.message)}}let f=n?`((?:${u})(?:/(?:${u}))*)`:`(${u})`;r||(f=i&&t.length<2?`(?:/${f})`:"/"+f),i&&(f+="?"),a+=f,s+=20,i&&(s+=-8),n&&(s+=-20),".*"===u&&(s+=-50);}e.push(s);}r.push(e);}if(n.strict&&n.end){const e=r.length-1;r[e][r[e].length-1]+=.7000000000000001;}n.strict||(a+="/?"),n.end?a+="$":n.strict&&(a+="(?:/|$)");const i=new RegExp(a,n.sensitive?"":"i");return {re:i,score:r,keys:c,parse:function(e){const t=e.match(i),n={};if(!t)return null;for(let e=1;e<t.length;e++){const r=t[e]||"",o=c[e-1];n[o.name]=r&&o.repeatable?r.split("/"):r;}return n},stringify:function(t){let n="",r=!1;for(const o of e){r&&n.endsWith("/")||(n+="/"),r=!1;for(const e of o)if(0===e.type)n+=e.value;else if(1===e.type){const{value:a,repeatable:c,optional:i}=e,l=a in t?t[a]:"";if(s(l)&&!c)throw new Error(`Provided param "${a}" is an array but it is not repeatable (* or + modifiers)`);const u=s(l)?l.join("/"):l;if(!u){if(!i)throw new Error(`Missing required param "${a}"`);o.length<2&&(n.endsWith("/")?n=n.slice(0,-1):r=!0);}n+=u;}}return n||"/"}}}(function(e){if(!e)return [[]];if("/"===e)return [[D]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(e){throw new Error(`ERR (${n})/"${l}": ${e}`)}let n=0,r=n;const o=[];let a;function c(){a&&o.push(a),a=[];}let s,i=0,l="",u="";function f(){l&&(0===n?a.push({type:0,value:l}):1===n||2===n||3===n?(a.length>1&&("*"===s||"+"===s)&&t(`A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`),a.push({type:1,value:l,regexp:u,repeatable:"*"===s||"+"===s,optional:"*"===s||"?"===s})):t("Invalid state to consume buffer"),l="");}function p(){l+=s;}for(;i<e.length;)if(s=e[i++],"\\"!==s||2===n)switch(n){case 0:"/"===s?(l&&f(),c()):":"===s?(f(),n=1):p();break;case 4:p(),n=r;break;case 1:"("===s?n=2:I.test(s)?p():(f(),n=0,"*"!==s&&"?"!==s&&"+"!==s&&i--);break;case 2:")"===s?"\\"==u[u.length-1]?u=u.slice(0,-1)+s:n=3:u+=s;break;case 3:f(),n=0,"*"!==s&&"?"!==s&&"+"!==s&&i--,u="";break;default:t("Unknown state");}else r=n,n=4;return 2===n&&t(`Unfinished custom RegExp for param "${l}"`),f(),c(),o}(e.path),n),a=o(r,{record:e,parent:t,children:[],alias:[]});return t&&!a.record.aliasOf==!t.record.aliasOf&&t.children.push(a),a}function U(e,t){const n=[],r=new Map;function a(e,n,r){const l=!r,u=function(e){return {path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:H(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}}}(e);u.aliasOf=r&&r.record;const f=Q(t,e),p=[u];if("alias"in e){const t="string"==typeof e.alias?[e.alias]:e.alias;for(const e of t)p.push(o({},u,{components:r?r.record.components:u.components,path:e,aliasOf:r?r.record:u}));}let h,d;for(const t of p){const{path:o}=t;if(n&&"/"!==o[0]){const e=n.record.path;t.path=n.record.path+(o&&("/"===e[e.length-1]?"":"/")+o);}if(h=K(t,n,f),r?r.alias.push(h):(d=d||h,d!==h&&d.alias.push(h),l&&e.name&&!N(h)&&s(e.name)),u.children){const e=u.children;for(let t=0;t<e.length;t++)a(e[t],h,r&&r.children[t]);}r=r||h,(h.record.components&&Object.keys(h.record.components).length||h.record.name||h.record.redirect)&&i(h);}return d?()=>{s(d);}:c}function s(e){if($(e)){const t=r.get(e);t&&(r.delete(e),n.splice(n.indexOf(t),1),t.children.forEach(s),t.alias.forEach(s));}else {const t=n.indexOf(e);t>-1&&(n.splice(t,1),e.record.name&&r.delete(e.record.name),e.children.forEach(s),e.alias.forEach(s));}}function i(e){let t=0;for(;t<n.length&&F(e,n[t])>=0&&(e.record.path!==n[t].record.path||!X(e,n[t]));)t++;n.splice(t,0,e),e.record.name&&!N(e)&&r.set(e.record.name,e);}return t=Q({strict:!1,end:!0,sensitive:!1},t),e.forEach((e=>a(e))),{addRoute:a,resolve:function(e,t){let a,c,s,i={};if("name"in e&&e.name){if(a=r.get(e.name),!a)throw M(1,{location:e});s=a.record.name,i=o(V(t.params,a.keys.filter((e=>!e.optional)).map((e=>e.name))),e.params&&V(e.params,a.keys.map((e=>e.name)))),c=a.stringify(i);}else if("path"in e)c=e.path,a=n.find((e=>e.re.test(c))),a&&(i=a.parse(c),s=a.record.name);else {if(a=t.name?r.get(t.name):n.find((e=>e.re.test(t.path))),!a)throw M(1,{location:e,currentLocation:t});s=a.record.name,i=o({},t.params,e.params),c=a.stringify(i);}const l=[];let u=a;for(;u;)l.unshift(u.record),u=u.parent;return {name:s,path:c,params:i,matched:l,meta:z(l)}},removeRoute:s,getRoutes:function(){return n},getRecordMatcher:function(e){return r.get(e)}}}function V(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function H(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]="object"==typeof n?n[r]:n;return t}function N(e){for(;e;){if(e.record.aliasOf)return !0;e=e.parent;}return !1}function z(e){return e.reduce(((e,t)=>o(e,t.meta)),{})}function Q(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}function X(e,t){return t.children.some((t=>t===e||X(e,t)))}const Y=/#/g,Z=/&/g,J=/\//g,ee=/=/g,te=/\?/g,ne=/\+/g,re=/%5B/g,oe=/%5D/g,ae=/%5E/g,ce=/%60/g,se=/%7B/g,ie=/%7C/g,le=/%7D/g,ue=/%20/g;function fe(e){return encodeURI(""+e).replace(ie,"|").replace(re,"[").replace(oe,"]")}function pe(e){return fe(e).replace(ne,"%2B").replace(ue,"+").replace(Y,"%23").replace(Z,"%26").replace(ce,"`").replace(se,"{").replace(le,"}").replace(ae,"^")}function he(e){return null==e?"":function(e){return fe(e).replace(Y,"%23").replace(te,"%3F")}(e).replace(J,"%2F")}function de(e){try{return decodeURIComponent(""+e)}catch(e){}return ""+e}function me(e){const t={};if(""===e||"?"===e)return t;const n=("?"===e[0]?e.slice(1):e).split("&");for(let e=0;e<n.length;++e){const r=n[e].replace(ne," "),o=r.indexOf("="),a=de(o<0?r:r.slice(0,o)),c=o<0?null:de(r.slice(o+1));if(a in t){let e=t[a];s(e)||(e=t[a]=[e]),e.push(c);}else t[a]=c;}return t}function ge(e){let t="";for(let n in e){const r=e[n];if(n=pe(n).replace(ee,"%3D"),null==r){void 0!==r&&(t+=(t.length?"&":"")+n);continue}(s(r)?r.map((e=>e&&pe(e))):[r&&pe(r)]).forEach((e=>{void 0!==e&&(t+=(t.length?"&":"")+n,null!=e&&(t+="="+e));}));}return t}function ve(e){const t={};for(const n in e){const r=e[n];void 0!==r&&(t[n]=s(r)?r.map((e=>null==e?null:""+e)):null==r?r:""+r);}return t}const ye=Symbol(""),be=Symbol(""),we=Symbol(""),Ee=Symbol(""),Re=Symbol("");function Oe(){let e=[];return {add:function(t){return e.push(t),()=>{const n=e.indexOf(t);n>-1&&e.splice(n,1);}},list:()=>e.slice(),reset:function(){e=[];}}}function ke(e,n,r){const o=()=>{e[n].delete(r);};t.onUnmounted(o),t.onDeactivated(o),t.onActivated((()=>{e[n].add(r);})),e[n].add(r);}function je(e,t,n,r,o){const a=r&&(r.enterCallbacks[o]=r.enterCallbacks[o]||[]);return ()=>new Promise(((c,s)=>{const i=e=>{var i;!1===e?s(M(4,{from:n,to:t})):e instanceof Error?s(e):"string"==typeof(i=e)||i&&"object"==typeof i?s(M(2,{from:t,to:e})):(a&&r.enterCallbacks[o]===a&&"function"==typeof e&&a.push(e),c());},l=e.call(r&&r.instances[o],t,n,i);let u=Promise.resolve(l);e.length<3&&(u=u.then(i)),u.catch((e=>s(e)));}))}function Pe(e,t,n,o){const a=[];for(const s of e)for(const e in s.components){let i=s.components[e];if("beforeRouteEnter"===t||s.instances[e])if("object"==typeof(c=i)||"displayName"in c||"props"in c||"__vccOpts"in c){const r=(i.__vccOpts||i)[t];r&&a.push(je(r,n,o,s,e));}else {let c=i();a.push((()=>c.then((a=>{if(!a)return Promise.reject(new Error(`Couldn't resolve component "${e}" at "${s.path}"`));const c=r(a)?a.default:a;s.components[e]=c;const i=(c.__vccOpts||c)[t];return i&&je(i,n,o,s,e)()}))));}}var c;return a}function Ce(e){const n=t.inject(we),r=t.inject(Ee),o=t.computed((()=>n.resolve(t.unref(e.to)))),a=t.computed((()=>{const{matched:e}=o.value,{length:t}=e,n=e[t-1],a=r.matched;if(!n||!a.length)return -1;const c=a.findIndex(p.bind(null,n));if(c>-1)return c;const s=$e(e[t-2]);return t>1&&$e(n)===s&&a[a.length-1].path!==s?a.findIndex(p.bind(null,e[t-2])):c})),i=t.computed((()=>a.value>-1&&function(e,t){for(const n in t){const r=t[n],o=e[n];if("string"==typeof r){if(r!==o)return !1}else if(!s(o)||o.length!==r.length||r.some(((e,t)=>e!==o[t])))return !1}return !0}(r.params,o.value.params))),l=t.computed((()=>a.value>-1&&a.value===r.matched.length-1&&h(r.params,o.value.params)));return {route:o,href:t.computed((()=>o.value.href)),isActive:i,isExactActive:l,navigate:function(r={}){return function(e){if(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)return;if(e.defaultPrevented)return;if(void 0!==e.button&&0!==e.button)return;if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}e.preventDefault&&e.preventDefault();return !0}(r)?n[t.unref(e.replace)?"replace":"push"](t.unref(e.to)).catch(c):Promise.resolve()}}}const xe=t.defineComponent({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:Ce,setup(e,{slots:n}){const r=t.reactive(Ce(e)),{options:o}=t.inject(we),a=t.computed((()=>({[Se(e.activeClass,o.linkActiveClass,"router-link-active")]:r.isActive,[Se(e.exactActiveClass,o.linkExactActiveClass,"router-link-exact-active")]:r.isExactActive})));return ()=>{const o=n.default&&n.default(r);return e.custom?o:t.h("a",{"aria-current":r.isExactActive?e.ariaCurrentValue:null,href:r.href,onClick:r.navigate,class:a.value},o)}}});function $e(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const Se=(e,t,n)=>null!=e?e:null!=t?t:n;function Ae(e,t){if(!e)return null;const n=e(t);return 1===n.length?n[0]:n}const Le=t.defineComponent({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:n,slots:r}){const a=t.inject(Re),c=t.computed((()=>e.route||a.value)),s=t.inject(be,0),i=t.computed((()=>{let e=t.unref(s);const{matched:n}=c.value;let r;for(;(r=n[e])&&!r.components;)e++;return e})),l=t.computed((()=>c.value.matched[i.value]));t.provide(be,t.computed((()=>i.value+1))),t.provide(ye,l),t.provide(Re,c);const u=t.ref();return t.watch((()=>[u.value,l.value,e.name]),(([e,t,n],[r,o,a])=>{t&&(t.instances[n]=e,o&&o!==t&&e&&e===r&&(t.leaveGuards.size||(t.leaveGuards=o.leaveGuards),t.updateGuards.size||(t.updateGuards=o.updateGuards))),!e||!t||o&&p(t,o)&&r||(t.enterCallbacks[n]||[]).forEach((t=>t(e)));}),{flush:"post"}),()=>{const a=c.value,s=e.name,i=l.value,f=i&&i.components[s];if(!f)return Ae(r.default,{Component:f,route:a});const p=i.props[s],h=p?!0===p?a.params:"function"==typeof p?p(a):p:null,d=t.h(f,o({},h,n,{onVnodeUnmounted:e=>{e.component.isUnmounted&&(i.instances[s]=null);},ref:u}));return Ae(r.default,{Component:d,route:a})||d}}});return e.RouterLink=xe,e.RouterView=Le,e.START_LOCATION=S,e.createMemoryHistory=function(e=""){let t=[],n=[""],r=0;function o(e){r++,r!==n.length&&n.splice(r),n.push(e);}const a={location:"",state:{},base:e=y(e),createHref:w.bind(null,e),replace(e){n.splice(r--,1),o(e);},push(e,t){o(e);},listen:e=>(t.push(e),()=>{const n=t.indexOf(e);n>-1&&t.splice(n,1);}),destroy(){t=[],n=[""],r=0;},go(e,o=!0){const a=this.location,c=e<0?v.back:v.forward;r=Math.max(0,Math.min(r+e,n.length-1)),o&&function(e,n,{direction:r,delta:o}){const a={direction:r,delta:o,type:g.pop};for(const r of t)r(e,n,a);}(this.location,a,{direction:c,delta:e});}};return Object.defineProperty(a,"location",{enumerable:!0,get:()=>n[r]}),a},e.createRouter=function(e){const r=U(e.routes,e),i=e.parseQuery||me,l=e.stringifyQuery||ge,f=e.history,d=Oe(),m=Oe(),v=Oe(),y=t.shallowRef(S);let b=S;n&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const w=a.bind(null,(e=>""+e)),j=a.bind(null,he),P=a.bind(null,de);function C(e,t){if(t=o({},t||y.value),"string"==typeof e){const n=u(i,e,t.path),a=r.resolve({path:n.path},t),c=f.createHref(n.fullPath);return o(n,a,{params:P(a.params),hash:de(n.hash),redirectedFrom:void 0,href:c})}let n;if("path"in e)n=o({},e,{path:u(i,e.path,t.path).path});else {const r=o({},e.params);for(const e in r)null==r[e]&&delete r[e];n=o({},e,{params:j(r)}),t.params=j(t.params);}const a=r.resolve(n,t),c=e.hash||"";a.params=w(P(a.params));const s=function(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}(l,o({},e,{hash:(p=c,fe(p).replace(se,"{").replace(le,"}").replace(ae,"^")),path:a.path}));var p;const h=f.createHref(s);return o({fullPath:s,hash:c,query:l===ge?ve(e.query):e.query||{}},a,{redirectedFrom:void 0,href:h})}function x(e){return "string"==typeof e?u(i,e,y.value.path):o({},e)}function A(e,t){if(b!==e)return M(8,{from:t,to:e})}function L(e){return T(e)}function B(e){const t=e.matched[e.matched.length-1];if(t&&t.redirect){const{redirect:n}=t;let r="function"==typeof n?n(e):n;return "string"==typeof r&&(r=r.includes("?")||r.includes("#")?r=x(r):{path:r},r.params={}),o({query:e.query,hash:e.hash,params:"path"in r?{}:e.params},r)}}function T(e,t){const n=b=C(e),r=y.value,a=e.state,c=e.force,s=!0===e.replace,i=B(n);if(i)return T(o(x(i),{state:"object"==typeof i?o({},a,i.state):a,force:c,replace:s}),t||n);const u=n;let f;return u.redirectedFrom=t,!c&&function(e,t,n){const r=t.matched.length-1,o=n.matched.length-1;return r>-1&&r===o&&p(t.matched[r],n.matched[o])&&h(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}(l,r,n)&&(f=M(16,{to:u,from:r}),X(r,r,!0,!1)),(f?Promise.resolve(f):F(u,r)).catch((e=>q(e)?q(e,2)?e:Q(e):z(e,u,r))).then((e=>{if(e){if(q(e,2))return T(o({replace:s},x(e.to),{state:"object"==typeof e.to?o({},a,e.to.state):a,force:c}),t||u)}else e=D(u,r,!0,s,a);return W(u,r,e),e}))}function G(e,t){const n=A(e,t);return n?Promise.reject(n):Promise.resolve()}function _(e){const t=J.values().next().value;return t&&"function"==typeof t.runWithContext?t.runWithContext(e):e()}function F(e,t){let n;const[r,o,a]=function(e,t){const n=[],r=[],o=[],a=Math.max(t.matched.length,e.matched.length);for(let c=0;c<a;c++){const a=t.matched[c];a&&(e.matched.find((e=>p(e,a)))?r.push(a):n.push(a));const s=e.matched[c];s&&(t.matched.find((e=>p(e,s)))||o.push(s));}return [n,r,o]}(e,t);n=Pe(r.reverse(),"beforeRouteLeave",e,t);for(const o of r)o.leaveGuards.forEach((r=>{n.push(je(r,e,t));}));const c=G.bind(null,e,t);return n.push(c),te(n).then((()=>{n=[];for(const r of d.list())n.push(je(r,e,t));return n.push(c),te(n)})).then((()=>{n=Pe(o,"beforeRouteUpdate",e,t);for(const r of o)r.updateGuards.forEach((r=>{n.push(je(r,e,t));}));return n.push(c),te(n)})).then((()=>{n=[];for(const r of a)if(r.beforeEnter)if(s(r.beforeEnter))for(const o of r.beforeEnter)n.push(je(o,e,t));else n.push(je(r.beforeEnter,e,t));return n.push(c),te(n)})).then((()=>(e.matched.forEach((e=>e.enterCallbacks={})),n=Pe(a,"beforeRouteEnter",e,t),n.push(c),te(n)))).then((()=>{n=[];for(const r of m.list())n.push(je(r,e,t));return n.push(c),te(n)})).catch((e=>q(e,8)?e:Promise.reject(e)))}function W(e,t,n){v.list().forEach((r=>_((()=>r(e,t,n)))));}function D(e,t,r,a,c){const s=A(e,t);if(s)return s;const i=t===S,l=n?history.state:{};r&&(a||i?f.replace(e.fullPath,o({scroll:i&&l&&l.scroll},c)):f.push(e.fullPath,c)),y.value=e,X(e,t,r,i),Q();}let I;function K(){I||(I=f.listen(((e,t,r)=>{if(!ee.listening)return;const a=C(e),s=B(a);if(s)return void T(o(s,{replace:!0}),a).catch(c);b=a;const i=y.value;var l,u;n&&(l=O(i.fullPath,r.delta),u=E(),k.set(l,u)),F(a,i).catch((e=>q(e,12)?e:q(e,2)?(T(e.to,a).then((e=>{q(e,20)&&!r.delta&&r.type===g.pop&&f.go(-1,!1);})).catch(c),Promise.reject()):(r.delta&&f.go(-r.delta,!1),z(e,a,i)))).then((e=>{(e=e||D(a,i,!1))&&(r.delta&&!q(e,8)?f.go(-r.delta,!1):r.type===g.pop&&q(e,20)&&f.go(-1,!1)),W(a,i,e);})).catch(c);})));}let V,H=Oe(),N=Oe();function z(e,t,n){Q(e);const r=N.list();return r.length?r.forEach((r=>r(e,t,n))):console.error(e),Promise.reject(e)}function Q(e){return V||(V=!e,K(),H.list().forEach((([t,n])=>e?n(e):t())),H.reset()),e}function X(r,o,a,c){const{scrollBehavior:s}=e;if(!n||!s)return Promise.resolve();const i=!a&&function(e){const t=k.get(e);return k.delete(e),t}(O(r.fullPath,0))||(c||!a)&&history.state&&history.state.scroll||null;return t.nextTick().then((()=>s(r,o,i))).then((e=>e&&R(e))).catch((e=>z(e,r,o)))}const Y=e=>f.go(e);let Z;const J=new Set,ee={currentRoute:y,listening:!0,addRoute:function(e,t){let n,o;return $(e)?(n=r.getRecordMatcher(e),o=t):o=e,r.addRoute(o,n)},removeRoute:function(e){const t=r.getRecordMatcher(e);t&&r.removeRoute(t);},hasRoute:function(e){return !!r.getRecordMatcher(e)},getRoutes:function(){return r.getRoutes().map((e=>e.record))},resolve:C,options:e,push:L,replace:function(e){return L(o(x(e),{replace:!0}))},go:Y,back:()=>Y(-1),forward:()=>Y(1),beforeEach:d.add,beforeResolve:m.add,afterEach:v.add,onError:N.add,isReady:function(){return V&&y.value!==S?Promise.resolve():new Promise(((e,t)=>{H.add([e,t]);}))},install(e){e.component("RouterLink",xe),e.component("RouterView",Le),e.config.globalProperties.$router=this,Object.defineProperty(e.config.globalProperties,"$route",{enumerable:!0,get:()=>t.unref(y)}),n&&!Z&&y.value===S&&(Z=!0,L(f.location).catch((e=>{})));const r={};for(const e in S)Object.defineProperty(r,e,{get:()=>y.value[e],enumerable:!0});e.provide(we,this),e.provide(Ee,t.shallowReactive(r)),e.provide(Re,y);const o=e.unmount;J.add(e),e.unmount=function(){J.delete(e),J.size<1&&(b=S,I&&I(),I=null,y.value=S,Z=!1,V=!1),o();};}};function te(e){return e.reduce(((e,t)=>e.then((()=>_(t)))),Promise.resolve())}return ee},e.createRouterMatcher=U,e.createWebHashHistory=function(e){return (e=location.host?e||location.pathname+location.search:"").includes("#")||(e+="#"),x(e)},e.createWebHistory=x,e.isNavigationFailure=q,e.loadRouteLocation=function(e){return e.matched.every((e=>e.redirect))?Promise.reject(new Error("Cannot load a route that redirects.")):Promise.all(e.matched.map((e=>e.components&&Promise.all(Object.keys(e.components).reduce(((t,n)=>{const o=e.components[n];return "function"!=typeof o||"displayName"in o||t.push(o().then((t=>{if(!t)return Promise.reject(new Error(`Couldn't resolve component "${n}" at "${e.path}". Ensure you passed a function that returns a promise.`));const o=r(t)?t.default:t;e.components[n]=o;}))),t}),[]))))).then((()=>e))},e.matchedRouteKey=ye,e.onBeforeRouteLeave=function(e){const n=t.inject(ye,{}).value;n&&ke(n,"leaveGuards",e);},e.onBeforeRouteUpdate=function(e){const n=t.inject(ye,{}).value;n&&ke(n,"updateGuards",e);},e.parseQuery=me,e.routeLocationKey=Ee,e.routerKey=we,e.routerViewLocationKey=Re,e.stringifyQuery=ge,e.useLink=Ce,e.useRoute=function(){return t.inject(Ee)},e.useRouter=function(){return t.inject(we)},e.viewDepthKey=be,e}({},Vue);

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

          on$1(this.wrapper, 'pointerdown', e => {

              if (e.target.matches('a, input, textarea, select, button')) {
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

  let formatSize = function (bytes) {
      if (bytes == 0) { return "0.00 B"; }
      let e = Math.floor(Math.log(bytes) / Math.log(1024));
      return ((bytes / Math.pow(1024, e)).toFixed(2) + ' ' + ' KMGTP'.charAt(e) + 'B').replace('.00', '');
  };

  let formatNumber = function(num, round = 2) {
      return (new Intl.NumberFormat(navigator.language, { style: 'decimal', maximumFractionDigits: round})).format(num);
  };

  let formatDuration = function (time) {
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

  let on = function (element, name, delegate, fn) {

      if (!fn) {
          element.addEventListener(name, arguments[2]);
      } else {
          element.addEventListener(name, function (e) {

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

  let copyText = function (text, cb) {
      let inp = document.createElement('textarea');
      document.body.appendChild(inp);
      inp.value = text;
      inp.select();
      try { document.execCommand('copy', false); } catch (e) { }
      inp.remove();
      if (cb) cb();
  };

  let interpolate = function (str, params) {
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
      nanoid,
      on,
      toKebabCase,
      uuid: uuid$1,
      truncate,
      stripTags
  };

  let uuid = 0;

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
                      fulfill(resdata, xhr);
                  } else {
                      reject(resdata, xhr);
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
