(function () {
  'use strict';

  window.Vue=function(e){function t(e,t){const n=Object.create(null),o=e.split(",");for(let r=0;r<o.length;r++)n[o[r]]=!0;return t?e=>!!n[e.toLowerCase()]:e=>!!n[e]}const n={},o=[],r=()=>{},s=()=>!1,i=/^on[^a-z]/,l=e=>i.test(e),c=e=>e.startsWith("onUpdate:"),a=Object.assign,u=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1);},p=Object.prototype.hasOwnProperty,f=(e,t)=>p.call(e,t),d=Array.isArray,h=e=>"[object Map]"===C(e),m=e=>"[object Set]"===C(e),g=e=>"[object Date]"===C(e),v=e=>"function"==typeof e,y=e=>"string"==typeof e,b=e=>"symbol"==typeof e,_=e=>null!==e&&"object"==typeof e,S=e=>(_(e)||v(e))&&v(e.then)&&v(e.catch),x=Object.prototype.toString,C=e=>x.call(e),k=e=>C(e).slice(8,-1),w=e=>"[object Object]"===C(e),T=e=>y(e)&&"NaN"!==e&&"-"!==e[0]&&""+parseInt(e,10)===e,E=t(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),N=t("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"),O=e=>{const t=Object.create(null);return n=>t[n]||(t[n]=e(n))},$=/-(\w)/g,P=O((e=>e.replace($,((e,t)=>t?t.toUpperCase():"")))),R=/\B([A-Z])/g,A=O((e=>e.replace(R,"-$1").toLowerCase())),F=O((e=>e.charAt(0).toUpperCase()+e.slice(1))),M=O((e=>e?`on${F(e)}`:"")),V=(e,t)=>!Object.is(e,t),I=(e,t)=>{for(let n=0;n<e.length;n++)e[n](t);},B=(e,t,n)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:n});},L=e=>{const t=parseFloat(e);return isNaN(t)?e:t},j=e=>{const t=y(e)?Number(e):NaN;return isNaN(t)?e:t};let U;const D=()=>U||(U="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}),H=t("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console");function W(e){if(d(e)){const t={};for(let n=0;n<e.length;n++){const o=e[n],r=y(o)?q(o):W(o);if(r)for(const e in r)t[e]=r[e];}return t}if(y(e)||_(e))return e}const z=/;(?![^(]*\))/g,K=/:([^]+)/,G=/\/\*[^]*?\*\//g;function q(e){const t={};return e.replace(G,"").split(z).forEach((e=>{if(e){const n=e.split(K);n.length>1&&(t[n[0].trim()]=n[1].trim());}})),t}function J(e){let t="";if(y(e))t=e;else if(d(e))for(let n=0;n<e.length;n++){const o=J(e[n]);o&&(t+=o+" ");}else if(_(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const Z=t("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot"),Y=t("svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view"),Q=t("area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr"),X=t("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");function ee(e){return !!e||""===e}function te(e,t){if(e===t)return !0;let n=g(e),o=g(t);if(n||o)return !(!n||!o)&&e.getTime()===t.getTime();if(n=b(e),o=b(t),n||o)return e===t;if(n=d(e),o=d(t),n||o)return !(!n||!o)&&function(e,t){if(e.length!==t.length)return !1;let n=!0;for(let o=0;n&&o<e.length;o++)n=te(e[o],t[o]);return n}(e,t);if(n=_(e),o=_(t),n||o){if(!n||!o)return !1;if(Object.keys(e).length!==Object.keys(t).length)return !1;for(const n in e){const o=e.hasOwnProperty(n),r=t.hasOwnProperty(n);if(o&&!r||!o&&r||!te(e[n],t[n]))return !1}}return String(e)===String(t)}function ne(e,t){return e.findIndex((e=>te(e,t)))}const oe=(e,t)=>t&&t.__v_isRef?oe(e,t.value):h(t)?{[`Map(${t.size})`]:[...t.entries()].reduce(((e,[t,n])=>(e[`${t} =>`]=n,e)),{})}:m(t)?{[`Set(${t.size})`]:[...t.values()]}:!_(t)||d(t)||w(t)?t:String(t);let re;class se{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this.parent=re,!e&&re&&(this.index=(re.scopes||(re.scopes=[])).push(this)-1);}get active(){return this._active}run(e){if(this._active){const t=re;try{return re=this,e()}finally{re=t;}}}on(){re=this;}off(){re=this.parent;}stop(e){if(this._active){let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);if(!this.detached&&this.parent&&!e){const e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index);}this.parent=void 0,this._active=!1;}}}function ie(e,t=re){t&&t.active&&t.effects.push(e);}function le(){return re}const ce=e=>{const t=new Set(e);return t.w=0,t.n=0,t},ae=e=>(e.w&de)>0,ue=e=>(e.n&de)>0,pe=new WeakMap;let fe=0,de=1;const he=30;let me;const ge=Symbol(""),ve=Symbol("");class ye{constructor(e,t=null,n){this.fn=e,this.scheduler=t,this.active=!0,this.deps=[],this.parent=void 0,ie(this,n);}run(){if(!this.active)return this.fn();let e=me,t=_e;for(;e;){if(e===this)return;e=e.parent;}try{return this.parent=me,me=this,_e=!0,de=1<<++fe,fe<=he?(({deps:e})=>{if(e.length)for(let t=0;t<e.length;t++)e[t].w|=de;})(this):be(this),this.fn()}finally{fe<=he&&(e=>{const{deps:t}=e;if(t.length){let n=0;for(let o=0;o<t.length;o++){const r=t[o];ae(r)&&!ue(r)?r.delete(e):t[n++]=r,r.w&=~de,r.n&=~de;}t.length=n;}})(this),de=1<<--fe,me=this.parent,_e=t,this.parent=void 0,this.deferStop&&this.stop();}}stop(){me===this?this.deferStop=!0:this.active&&(be(this),this.onStop&&this.onStop(),this.active=!1);}}function be(e){const{deps:t}=e;if(t.length){for(let n=0;n<t.length;n++)t[n].delete(e);t.length=0;}}let _e=!0;const Se=[];function xe(){Se.push(_e),_e=!1;}function Ce(){const e=Se.pop();_e=void 0===e||e;}function ke(e,t,n){if(_e&&me){let t=pe.get(e);t||pe.set(e,t=new Map);let o=t.get(n);o||t.set(n,o=ce()),we(o);}}function we(e,t){let n=!1;fe<=he?ue(e)||(e.n|=de,n=!ae(e)):n=!e.has(me),n&&(e.add(me),me.deps.push(e));}function Te(e,t,n,o,r,s){const i=pe.get(e);if(!i)return;let l=[];if("clear"===t)l=[...i.values()];else if("length"===n&&d(e)){const e=Number(o);i.forEach(((t,n)=>{("length"===n||!b(n)&&n>=e)&&l.push(t);}));}else switch(void 0!==n&&l.push(i.get(n)),t){case"add":d(e)?T(n)&&l.push(i.get("length")):(l.push(i.get(ge)),h(e)&&l.push(i.get(ve)));break;case"delete":d(e)||(l.push(i.get(ge)),h(e)&&l.push(i.get(ve)));break;case"set":h(e)&&l.push(i.get(ge));}if(1===l.length)l[0]&&Ee(l[0]);else {const e=[];for(const t of l)t&&e.push(...t);Ee(ce(e));}}function Ee(e,t){const n=d(e)?e:[...e];for(const o of n)o.computed&&Ne(o);for(const o of n)o.computed||Ne(o);}function Ne(e,t){(e!==me||e.allowRecurse)&&(e.scheduler?e.scheduler():e.run());}const Oe=t("__proto__,__v_isRef,__isVue"),$e=new Set(Object.getOwnPropertyNames(Symbol).filter((e=>"arguments"!==e&&"caller"!==e)).map((e=>Symbol[e])).filter(b)),Pe=Re();function Re(){const e={};return ["includes","indexOf","lastIndexOf"].forEach((t=>{e[t]=function(...e){const n=St(this);for(let t=0,r=this.length;t<r;t++)ke(n,0,t+"");const o=n[t](...e);return -1===o||!1===o?n[t](...e.map(St)):o};})),["push","pop","shift","unshift","splice"].forEach((t=>{e[t]=function(...e){xe();const n=St(this)[t].apply(this,e);return Ce(),n};})),e}function Ae(e){const t=St(this);return ke(t,0,e),t.hasOwnProperty(e)}class Fe{constructor(e=!1,t=!1){this._isReadonly=e,this._shallow=t;}get(e,t,n){const o=this._isReadonly,r=this._shallow;if("__v_isReactive"===t)return !o;if("__v_isReadonly"===t)return o;if("__v_isShallow"===t)return r;if("__v_raw"===t&&n===(o?r?ft:pt:r?ut:at).get(e))return e;const s=d(e);if(!o){if(s&&f(Pe,t))return Reflect.get(Pe,t,n);if("hasOwnProperty"===t)return Ae}const i=Reflect.get(e,t,n);return (b(t)?$e.has(t):Oe(t))?i:(o||ke(e,0,t),r?i:Et(i)?s&&T(t)?i:i.value:_(i)?o?mt(i):dt(i):i)}}class Me extends Fe{constructor(e=!1){super(!1,e);}set(e,t,n,o){let r=e[t];if(yt(r)&&Et(r)&&!Et(n))return !1;if(!this._shallow&&(bt(n)||yt(n)||(r=St(r),n=St(n)),!d(e)&&Et(r)&&!Et(n)))return r.value=n,!0;const s=d(e)&&T(t)?Number(t)<e.length:f(e,t),i=Reflect.set(e,t,n,o);return e===St(o)&&(s?V(n,r)&&Te(e,"set",t,n):Te(e,"add",t,n)),i}deleteProperty(e,t){const n=f(e,t),o=Reflect.deleteProperty(e,t);return o&&n&&Te(e,"delete",t,void 0),o}has(e,t){const n=Reflect.has(e,t);return b(t)&&$e.has(t)||ke(e,0,t),n}ownKeys(e){return ke(e,0,d(e)?"length":ge),Reflect.ownKeys(e)}}class Ve extends Fe{constructor(e=!1){super(!0,e);}set(e,t){return !0}deleteProperty(e,t){return !0}}const Ie=new Me,Be=new Ve,Le=new Me(!0),je=new Ve(!0),Ue=e=>e,De=e=>Reflect.getPrototypeOf(e);function He(e,t,n=!1,o=!1){const r=St(e=e.__v_raw),s=St(t);n||(V(t,s)&&ke(r,0,t),ke(r,0,s));const{has:i}=De(r),l=o?Ue:n?kt:Ct;return i.call(r,t)?l(e.get(t)):i.call(r,s)?l(e.get(s)):void(e!==r&&e.get(t))}function We(e,t=!1){const n=this.__v_raw,o=St(n),r=St(e);return t||(V(e,r)&&ke(o,0,e),ke(o,0,r)),e===r?n.has(e):n.has(e)||n.has(r)}function ze(e,t=!1){return e=e.__v_raw,!t&&ke(St(e),0,ge),Reflect.get(e,"size",e)}function Ke(e){e=St(e);const t=St(this);return De(t).has.call(t,e)||(t.add(e),Te(t,"add",e,e)),this}function Ge(e,t){t=St(t);const n=St(this),{has:o,get:r}=De(n);let s=o.call(n,e);s||(e=St(e),s=o.call(n,e));const i=r.call(n,e);return n.set(e,t),s?V(t,i)&&Te(n,"set",e,t):Te(n,"add",e,t),this}function qe(e){const t=St(this),{has:n,get:o}=De(t);let r=n.call(t,e);r||(e=St(e),r=n.call(t,e)),o&&o.call(t,e);const s=t.delete(e);return r&&Te(t,"delete",e,void 0),s}function Je(){const e=St(this),t=0!==e.size,n=e.clear();return t&&Te(e,"clear",void 0,void 0),n}function Ze(e,t){return function(n,o){const r=this,s=r.__v_raw,i=St(s),l=t?Ue:e?kt:Ct;return !e&&ke(i,0,ge),s.forEach(((e,t)=>n.call(o,l(e),l(t),r)))}}function Ye(e,t,n){return function(...o){const r=this.__v_raw,s=St(r),i=h(s),l="entries"===e||e===Symbol.iterator&&i,c="keys"===e&&i,a=r[e](...o),u=n?Ue:t?kt:Ct;return !t&&ke(s,0,c?ve:ge),{next(){const{value:e,done:t}=a.next();return t?{value:e,done:t}:{value:l?[u(e[0]),u(e[1])]:u(e),done:t}},[Symbol.iterator](){return this}}}}function Qe(e){return function(...t){return "delete"!==e&&this}}function Xe(){const e={get(e){return He(this,e)},get size(){return ze(this)},has:We,add:Ke,set:Ge,delete:qe,clear:Je,forEach:Ze(!1,!1)},t={get(e){return He(this,e,!1,!0)},get size(){return ze(this)},has:We,add:Ke,set:Ge,delete:qe,clear:Je,forEach:Ze(!1,!0)},n={get(e){return He(this,e,!0)},get size(){return ze(this,!0)},has(e){return We.call(this,e,!0)},add:Qe("add"),set:Qe("set"),delete:Qe("delete"),clear:Qe("clear"),forEach:Ze(!0,!1)},o={get(e){return He(this,e,!0,!0)},get size(){return ze(this,!0)},has(e){return We.call(this,e,!0)},add:Qe("add"),set:Qe("set"),delete:Qe("delete"),clear:Qe("clear"),forEach:Ze(!0,!0)};return ["keys","values","entries",Symbol.iterator].forEach((r=>{e[r]=Ye(r,!1,!1),n[r]=Ye(r,!0,!1),t[r]=Ye(r,!1,!0),o[r]=Ye(r,!0,!0);})),[e,n,t,o]}const[et,tt,nt,ot]=Xe();function rt(e,t){const n=t?e?ot:nt:e?tt:et;return (t,o,r)=>"__v_isReactive"===o?!e:"__v_isReadonly"===o?e:"__v_raw"===o?t:Reflect.get(f(n,o)&&o in t?n:t,o,r)}const st={get:rt(!1,!1)},it={get:rt(!1,!0)},lt={get:rt(!0,!1)},ct={get:rt(!0,!0)},at=new WeakMap,ut=new WeakMap,pt=new WeakMap,ft=new WeakMap;function dt(e){return yt(e)?e:gt(e,!1,Ie,st,at)}function ht(e){return gt(e,!1,Le,it,ut)}function mt(e){return gt(e,!0,Be,lt,pt)}function gt(e,t,n,o,r){if(!_(e))return e;if(e.__v_raw&&(!t||!e.__v_isReactive))return e;const s=r.get(e);if(s)return s;const i=(l=e).__v_skip||!Object.isExtensible(l)?0:function(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}(k(l));var l;if(0===i)return e;const c=new Proxy(e,2===i?o:n);return r.set(e,c),c}function vt(e){return yt(e)?vt(e.__v_raw):!(!e||!e.__v_isReactive)}function yt(e){return !(!e||!e.__v_isReadonly)}function bt(e){return !(!e||!e.__v_isShallow)}function _t(e){return vt(e)||yt(e)}function St(e){const t=e&&e.__v_raw;return t?St(t):e}function xt(e){return B(e,"__v_skip",!0),e}const Ct=e=>_(e)?dt(e):e,kt=e=>_(e)?mt(e):e;function wt(e){_e&&me&&we((e=St(e)).dep||(e.dep=ce()));}function Tt(e,t){const n=(e=St(e)).dep;n&&Ee(n);}function Et(e){return !(!e||!0!==e.__v_isRef)}function Nt(e){return Ot(e,!1)}function Ot(e,t){return Et(e)?e:new $t(e,t)}class $t{constructor(e,t){this.__v_isShallow=t,this.dep=void 0,this.__v_isRef=!0,this._rawValue=t?e:St(e),this._value=t?e:Ct(e);}get value(){return wt(this),this._value}set value(e){const t=this.__v_isShallow||bt(e)||yt(e);e=t?e:St(e),V(e,this._rawValue)&&(this._rawValue=e,this._value=t?e:Ct(e),Tt(this));}}function Pt(e){return Et(e)?e.value:e}const Rt={get:(e,t,n)=>Pt(Reflect.get(e,t,n)),set:(e,t,n,o)=>{const r=e[t];return Et(r)&&!Et(n)?(r.value=n,!0):Reflect.set(e,t,n,o)}};function At(e){return vt(e)?e:new Proxy(e,Rt)}class Ft{constructor(e){this.dep=void 0,this.__v_isRef=!0;const{get:t,set:n}=e((()=>wt(this)),(()=>Tt(this)));this._get=t,this._set=n;}get value(){return this._get()}set value(e){this._set(e);}}class Mt{constructor(e,t,n){this._object=e,this._key=t,this._defaultValue=n,this.__v_isRef=!0;}get value(){const e=this._object[this._key];return void 0===e?this._defaultValue:e}set value(e){this._object[this._key]=e;}get dep(){return e=St(this._object),t=this._key,null==(n=pe.get(e))?void 0:n.get(t);var e,t,n;}}class Vt{constructor(e){this._getter=e,this.__v_isRef=!0,this.__v_isReadonly=!0;}get value(){return this._getter()}}function It(e,t,n){const o=e[t];return Et(o)?o:new Mt(e,t,n)}class Bt{constructor(e,t,n,o){this._setter=t,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this._dirty=!0,this.effect=new ye(e,(()=>{this._dirty||(this._dirty=!0,Tt(this));})),this.effect.computed=this,this.effect.active=this._cacheable=!o,this.__v_isReadonly=n;}get value(){const e=St(this);return wt(e),!e._dirty&&e._cacheable||(e._dirty=!1,e._value=e.effect.run()),e._value}set value(e){this._setter(e);}}function Lt(e,t,n,o){let r;try{r=o?e(...o):e();}catch(s){Ut(s,t,n);}return r}function jt(e,t,n,o){if(v(e)){const r=Lt(e,t,n,o);return r&&S(r)&&r.catch((e=>{Ut(e,t,n);})),r}const r=[];for(let s=0;s<e.length;s++)r.push(jt(e[s],t,n,o));return r}function Ut(e,t,n,o=!0){if(t){let o=t.parent;const r=t.proxy,s=n;for(;o;){const t=o.ec;if(t)for(let n=0;n<t.length;n++)if(!1===t[n](e,r,s))return;o=o.parent;}const i=t.appContext.config.errorHandler;if(i)return void Lt(i,null,10,[e,r,s])}!function(e,t,n,o=!0){console.error(e);}(e,0,0,o);}let Dt=!1,Ht=!1;const Wt=[];let zt=0;const Kt=[];let Gt=null,qt=0;const Jt=Promise.resolve();let Zt=null;function Yt(e){const t=Zt||Jt;return e?t.then(this?e.bind(this):e):t}function Qt(e){Wt.length&&Wt.includes(e,Dt&&e.allowRecurse?zt+1:zt)||(null==e.id?Wt.push(e):Wt.splice(function(e){let t=zt+1,n=Wt.length;for(;t<n;){const o=t+n>>>1,r=Wt[o],s=on(r);s<e||s===e&&r.pre?t=o+1:n=o;}return t}(e.id),0,e),Xt());}function Xt(){Dt||Ht||(Ht=!0,Zt=Jt.then(sn));}function en(e){d(e)?Kt.push(...e):Gt&&Gt.includes(e,e.allowRecurse?qt+1:qt)||Kt.push(e),Xt();}function tn(e,t=(Dt?zt+1:0)){for(;t<Wt.length;t++){const e=Wt[t];e&&e.pre&&(Wt.splice(t,1),t--,e());}}function nn(e){if(Kt.length){const e=[...new Set(Kt)];if(Kt.length=0,Gt)return void Gt.push(...e);for(Gt=e,Gt.sort(((e,t)=>on(e)-on(t))),qt=0;qt<Gt.length;qt++)Gt[qt]();Gt=null,qt=0;}}const on=e=>null==e.id?1/0:e.id,rn=(e,t)=>{const n=on(e)-on(t);if(0===n){if(e.pre&&!t.pre)return -1;if(t.pre&&!e.pre)return 1}return n};function sn(e){Ht=!1,Dt=!0,Wt.sort(rn);try{for(zt=0;zt<Wt.length;zt++){const e=Wt[zt];e&&!1!==e.active&&Lt(e,null,14);}}finally{zt=0,Wt.length=0,nn(),Dt=!1,Zt=null,(Wt.length||Kt.length)&&sn();}}e.devtools=void 0;let ln=[];function cn(e,t,...o){if(e.isUnmounted)return;const r=e.vnode.props||n;let s=o;const i=t.startsWith("update:"),l=i&&t.slice(7);if(l&&l in r){const e=`${"modelValue"===l?"model":l}Modifiers`,{number:t,trim:i}=r[e]||n;i&&(s=o.map((e=>y(e)?e.trim():e))),t&&(s=o.map(L));}let c,a=r[c=M(t)]||r[c=M(P(t))];!a&&i&&(a=r[c=M(A(t))]),a&&jt(a,e,6,s);const u=r[c+"Once"];if(u){if(e.emitted){if(e.emitted[c])return}else e.emitted={};e.emitted[c]=!0,jt(u,e,6,s);}}function an(e,t,n=!1){const o=t.emitsCache,r=o.get(e);if(void 0!==r)return r;const s=e.emits;let i={},l=!1;if(!v(e)){const o=e=>{const n=an(e,t,!0);n&&(l=!0,a(i,n));};!n&&t.mixins.length&&t.mixins.forEach(o),e.extends&&o(e.extends),e.mixins&&e.mixins.forEach(o);}return s||l?(d(s)?s.forEach((e=>i[e]=null)):a(i,s),_(e)&&o.set(e,i),i):(_(e)&&o.set(e,null),null)}function un(e,t){return !(!e||!l(t))&&(t=t.slice(2).replace(/Once$/,""),f(e,t[0].toLowerCase()+t.slice(1))||f(e,A(t))||f(e,t))}let pn=null,fn=null;function dn(e){const t=pn;return pn=e,fn=e&&e.type.__scopeId||null,t}function hn(e,t=pn,n){if(!t)return e;if(e._n)return e;const o=(...n)=>{o._d&&Mr(-1);const r=dn(t);let s;try{s=e(...n);}finally{dn(r),o._d&&Mr(1);}return s};return o._n=!0,o._c=!0,o._d=!0,o}function mn(e){const{type:t,vnode:n,proxy:o,withProxy:r,props:s,propsOptions:[i],slots:l,attrs:a,emit:u,render:p,renderCache:f,data:d,setupState:h,ctx:m,inheritAttrs:g}=e;let v,y;const b=dn(e);try{if(4&n.shapeFlag){const e=r||o;v=qr(p.call(e,e,f,s,h,d,m)),y=a;}else {const e=t;0,v=qr(e(s,e.length>1?{attrs:a,slots:l,emit:u}:null)),y=t.props?a:gn(a);}}catch(S){$r.length=0,Ut(S,e,1),v=Wr(Nr);}let _=v;if(y&&!1!==g){const e=Object.keys(y),{shapeFlag:t}=_;e.length&&7&t&&(i&&e.some(c)&&(y=vn(y,i)),_=Kr(_,y));}return n.dirs&&(_=Kr(_),_.dirs=_.dirs?_.dirs.concat(n.dirs):n.dirs),n.transition&&(_.transition=n.transition),v=_,dn(b),v}const gn=e=>{let t;for(const n in e)("class"===n||"style"===n||l(n))&&((t||(t={}))[n]=e[n]);return t},vn=(e,t)=>{const n={};for(const o in e)c(o)&&o.slice(9)in t||(n[o]=e[o]);return n};function yn(e,t,n){const o=Object.keys(t);if(o.length!==Object.keys(e).length)return !0;for(let r=0;r<o.length;r++){const s=o[r];if(t[s]!==e[s]&&!un(n,s))return !0}return !1}function bn({vnode:e,parent:t},n){for(;t&&t.subTree===e;)(e=t.vnode).el=n,t=t.parent;}const _n="components";const Sn=Symbol.for("v-ndc");function xn(e,t,n=!0,o=!1){const r=pn||ts;if(r){const n=r.type;if(e===_n){const e=ms(n,!1);if(e&&(e===t||e===P(t)||e===F(P(t))))return n}const s=Cn(r[e]||n[e],t)||Cn(r.appContext[e],t);return !s&&o?n:s}}function Cn(e,t){return e&&(e[t]||e[P(t)]||e[F(P(t))])}const kn=e=>e.__isSuspense,wn={name:"Suspense",__isSuspense:!0,process(e,t,n,o,r,s,i,l,c,a){null==e?function(e,t,n,o,r,s,i,l,c){const{p:a,o:{createElement:u}}=c,p=u("div"),f=e.suspense=En(e,r,o,t,p,n,s,i,l,c);a(null,f.pendingBranch=e.ssContent,p,null,o,f,s,i),f.deps>0?(Tn(e,"onPending"),Tn(e,"onFallback"),a(null,e.ssFallback,t,n,o,null,s,i),$n(f,e.ssFallback)):f.resolve(!1,!0);}(t,n,o,r,s,i,l,c,a):function(e,t,n,o,r,s,i,l,{p:c,um:a,o:{createElement:u}}){const p=t.suspense=e.suspense;p.vnode=t,t.el=e.el;const f=t.ssContent,d=t.ssFallback,{activeBranch:h,pendingBranch:m,isInFallback:g,isHydrating:v}=p;if(m)p.pendingBranch=f,Lr(f,m)?(c(m,f,p.hiddenContainer,null,r,p,s,i,l),p.deps<=0?p.resolve():g&&(c(h,d,n,o,r,null,s,i,l),$n(p,d))):(p.pendingId++,v?(p.isHydrating=!1,p.activeBranch=m):a(m,r,p),p.deps=0,p.effects.length=0,p.hiddenContainer=u("div"),g?(c(null,f,p.hiddenContainer,null,r,p,s,i,l),p.deps<=0?p.resolve():(c(h,d,n,o,r,null,s,i,l),$n(p,d))):h&&Lr(f,h)?(c(h,f,n,o,r,p,s,i,l),p.resolve(!0)):(c(null,f,p.hiddenContainer,null,r,p,s,i,l),p.deps<=0&&p.resolve()));else if(h&&Lr(f,h))c(h,f,n,o,r,p,s,i,l),$n(p,f);else if(Tn(t,"onPending"),p.pendingBranch=f,p.pendingId++,c(null,f,p.hiddenContainer,null,r,p,s,i,l),p.deps<=0)p.resolve();else {const{timeout:e,pendingId:t}=p;e>0?setTimeout((()=>{p.pendingId===t&&p.fallback(d);}),e):0===e&&p.fallback(d);}}(e,t,n,o,r,i,l,c,a);},hydrate:function(e,t,n,o,r,s,i,l,c){const a=t.suspense=En(t,o,n,e.parentNode,document.createElement("div"),null,r,s,i,l,!0),u=c(e,a.pendingBranch=t.ssContent,n,a,s,i);0===a.deps&&a.resolve(!1,!0);return u},create:En,normalize:function(e){const{shapeFlag:t,children:n}=e,o=32&t;e.ssContent=Nn(o?n.default:n),e.ssFallback=o?Nn(n.fallback):Wr(Nr);}};function Tn(e,t){const n=e.props&&e.props[t];v(n)&&n();}function En(e,t,n,o,r,s,i,l,c,a,u=!1){const{p:p,m:f,um:d,n:h,o:{parentNode:m,remove:g}}=a;let v;const y=function(e){var t;return null!=(null==(t=e.props)?void 0:t.suspensible)&&!1!==e.props.suspensible}(e);y&&(null==t?void 0:t.pendingBranch)&&(v=t.pendingId,t.deps++);const b=e.props?j(e.props.timeout):void 0,_={vnode:e,parent:t,parentComponent:n,isSVG:i,container:o,hiddenContainer:r,anchor:s,deps:0,pendingId:0,timeout:"number"==typeof b?b:-1,activeBranch:null,pendingBranch:null,isInFallback:!0,isHydrating:u,isUnmounted:!1,effects:[],resolve(e=!1,n=!1){const{vnode:o,activeBranch:r,pendingBranch:s,pendingId:i,effects:l,parentComponent:c,container:a}=_;let u=!1;if(_.isHydrating)_.isHydrating=!1;else if(!e){u=r&&s.transition&&"out-in"===s.transition.mode,u&&(r.transition.afterLeave=()=>{i===_.pendingId&&(f(s,a,e,0),en(l));});let{anchor:e}=_;r&&(e=h(r),d(r,c,_,!0)),u||f(s,a,e,0);}$n(_,s),_.pendingBranch=null,_.isInFallback=!1;let p=_.parent,m=!1;for(;p;){if(p.pendingBranch){p.effects.push(...l),m=!0;break}p=p.parent;}m||u||en(l),_.effects=[],y&&t&&t.pendingBranch&&v===t.pendingId&&(t.deps--,0!==t.deps||n||t.resolve()),Tn(o,"onResolve");},fallback(e){if(!_.pendingBranch)return;const{vnode:t,activeBranch:n,parentComponent:o,container:r,isSVG:s}=_;Tn(t,"onFallback");const i=h(n),a=()=>{_.isInFallback&&(p(null,e,r,i,o,null,s,l,c),$n(_,e));},u=e.transition&&"out-in"===e.transition.mode;u&&(n.transition.afterLeave=a),_.isInFallback=!0,d(n,o,null,!0),u||a();},move(e,t,n){_.activeBranch&&f(_.activeBranch,e,t,n),_.container=e;},next:()=>_.activeBranch&&h(_.activeBranch),registerDep(e,t){const n=!!_.pendingBranch;n&&_.deps++;const o=e.vnode.el;e.asyncDep.catch((t=>{Ut(t,e,0);})).then((r=>{if(e.isUnmounted||_.isUnmounted||_.pendingId!==e.suspenseId)return;e.asyncResolved=!0;const{vnode:s}=e;us(e,r,!1),o&&(s.el=o);const l=!o&&e.subTree.el;t(e,s,m(o||e.subTree.el),o?null:h(e.subTree),_,i,c),l&&g(l),bn(e,s.el),n&&0==--_.deps&&_.resolve();}));},unmount(e,t){_.isUnmounted=!0,_.activeBranch&&d(_.activeBranch,n,e,t),_.pendingBranch&&d(_.pendingBranch,n,e,t);}};return _}function Nn(e){let t;if(v(e)){const n=Fr&&e._c;n&&(e._d=!1,Rr()),e=e(),n&&(e._d=!0,t=Pr,Ar());}if(d(e)){const t=function(e){let t;for(let n=0;n<e.length;n++){const o=e[n];if(!Br(o))return;if(o.type!==Nr||"v-if"===o.children){if(t)return;t=o;}}return t}(e);e=t;}return e=qr(e),t&&!e.dynamicChildren&&(e.dynamicChildren=t.filter((t=>t!==e))),e}function On(e,t){t&&t.pendingBranch?d(e)?t.effects.push(...e):t.effects.push(e):en(e);}function $n(e,t){e.activeBranch=t;const{vnode:n,parentComponent:o}=e,r=n.el=t.el;o&&o.subTree===n&&(o.vnode.el=r,bn(o,r));}function Pn(e,t){return Fn(e,null,{flush:"post"})}const Rn={};function An(e,t,n){return Fn(e,t,n)}function Fn(e,t,{immediate:o,deep:s,flush:i}=n){var l;const c=le()===(null==(l=ts)?void 0:l.scope)?ts:null;let a,p,f=!1,h=!1;if(Et(e)?(a=()=>e.value,f=bt(e)):vt(e)?(a=()=>e,s=!0):d(e)?(h=!0,f=e.some((e=>vt(e)||bt(e))),a=()=>e.map((e=>Et(e)?e.value:vt(e)?In(e):v(e)?Lt(e,c,2):void 0))):a=v(e)?t?()=>Lt(e,c,2):()=>{if(!c||!c.isUnmounted)return p&&p(),jt(e,c,3,[m])}:r,t&&s){const e=a;a=()=>In(e());}let m=e=>{p=_.onStop=()=>{Lt(e,c,4);};},g=h?new Array(e.length).fill(Rn):Rn;const y=()=>{if(_.active)if(t){const e=_.run();(s||f||(h?e.some(((e,t)=>V(e,g[t]))):V(e,g)))&&(p&&p(),jt(t,c,3,[e,g===Rn?void 0:h&&g[0]===Rn?[]:g,m]),g=e);}else _.run();};let b;y.allowRecurse=!!t,"sync"===i?b=y:"post"===i?b=()=>dr(y,c&&c.suspense):(y.pre=!0,c&&(y.id=c.uid),b=()=>Qt(y));const _=new ye(a,b);t?o?y():g=_.run():"post"===i?dr(_.run.bind(_),c&&c.suspense):_.run();return ()=>{_.stop(),c&&c.scope&&u(c.scope.effects,_);}}function Mn(e,t,n){const o=this.proxy,r=y(e)?e.includes(".")?Vn(o,e):()=>o[e]:e.bind(o,o);let s;v(t)?s=t:(s=t.handler,n=t);const i=ts;rs(this);const l=Fn(r,s.bind(o),n);return i?rs(i):ss(),l}function Vn(e,t){const n=t.split(".");return ()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}function In(e,t){if(!_(e)||e.__v_skip)return e;if((t=t||new Set).has(e))return e;if(t.add(e),Et(e))In(e.value,t);else if(d(e))for(let n=0;n<e.length;n++)In(e[n],t);else if(m(e)||h(e))e.forEach((e=>{In(e,t);}));else if(w(e))for(const n in e)In(e[n],t);return e}function Bn(e,t,n,o){const r=e.dirs,s=t&&t.dirs;for(let i=0;i<r.length;i++){const l=r[i];s&&(l.oldValue=s[i].value);let c=l.dir[o];c&&(xe(),jt(c,n,8,[e.el,l,e,t]),Ce());}}const Ln=Symbol("_leaveCb"),jn=Symbol("_enterCb");function Un(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return fo((()=>{e.isMounted=!0;})),go((()=>{e.isUnmounting=!0;})),e}const Dn=[Function,Array],Hn={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:Dn,onEnter:Dn,onAfterEnter:Dn,onEnterCancelled:Dn,onBeforeLeave:Dn,onLeave:Dn,onAfterLeave:Dn,onLeaveCancelled:Dn,onBeforeAppear:Dn,onAppear:Dn,onAfterAppear:Dn,onAppearCancelled:Dn},Wn={name:"BaseTransition",props:Hn,setup(e,{slots:t}){const n=ns(),o=Un();let r;return ()=>{const s=t.default&&Zn(t.default(),!0);if(!s||!s.length)return;let i=s[0];if(s.length>1)for(const e of s)if(e.type!==Nr){i=e;break}const l=St(e),{mode:c}=l;if(o.isLeaving)return Gn(i);const a=qn(i);if(!a)return Gn(i);const u=Kn(a,l,o,n);Jn(a,u);const p=n.subTree,f=p&&qn(p);let d=!1;const{getTransitionKey:h}=a.type;if(h){const e=h();void 0===r?r=e:e!==r&&(r=e,d=!0);}if(f&&f.type!==Nr&&(!Lr(a,f)||d)){const e=Kn(f,l,o,n);if(Jn(f,e),"out-in"===c)return o.isLeaving=!0,e.afterLeave=()=>{o.isLeaving=!1,!1!==n.update.active&&n.update();},Gn(i);"in-out"===c&&a.type!==Nr&&(e.delayLeave=(e,t,n)=>{zn(o,f)[String(f.key)]=f,e[Ln]=()=>{t(),e[Ln]=void 0,delete u.delayedLeave;},u.delayedLeave=n;});}return i}}};function zn(e,t){const{leavingVNodes:n}=e;let o=n.get(t.type);return o||(o=Object.create(null),n.set(t.type,o)),o}function Kn(e,t,n,o){const{appear:r,mode:s,persisted:i=!1,onBeforeEnter:l,onEnter:c,onAfterEnter:a,onEnterCancelled:u,onBeforeLeave:p,onLeave:f,onAfterLeave:h,onLeaveCancelled:m,onBeforeAppear:g,onAppear:v,onAfterAppear:y,onAppearCancelled:b}=t,_=String(e.key),S=zn(n,e),x=(e,t)=>{e&&jt(e,o,9,t);},C=(e,t)=>{const n=t[1];x(e,t),d(e)?e.every((e=>e.length<=1))&&n():e.length<=1&&n();},k={mode:s,persisted:i,beforeEnter(t){let o=l;if(!n.isMounted){if(!r)return;o=g||l;}t[Ln]&&t[Ln](!0);const s=S[_];s&&Lr(e,s)&&s.el[Ln]&&s.el[Ln](),x(o,[t]);},enter(e){let t=c,o=a,s=u;if(!n.isMounted){if(!r)return;t=v||c,o=y||a,s=b||u;}let i=!1;const l=e[jn]=t=>{i||(i=!0,x(t?s:o,[e]),k.delayedLeave&&k.delayedLeave(),e[jn]=void 0);};t?C(t,[e,l]):l();},leave(t,o){const r=String(e.key);if(t[jn]&&t[jn](!0),n.isUnmounting)return o();x(p,[t]);let s=!1;const i=t[Ln]=n=>{s||(s=!0,o(),x(n?m:h,[t]),t[Ln]=void 0,S[r]===e&&delete S[r]);};S[r]=e,f?C(f,[t,i]):i();},clone:e=>Kn(e,t,n,o)};return k}function Gn(e){if(eo(e))return (e=Kr(e)).children=null,e}function qn(e){return eo(e)?e.children?e.children[0]:void 0:e}function Jn(e,t){6&e.shapeFlag&&e.component?Jn(e.component.subTree,t):128&e.shapeFlag?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t;}function Zn(e,t=!1,n){let o=[],r=0;for(let s=0;s<e.length;s++){let i=e[s];const l=null==n?i.key:String(n)+String(null!=i.key?i.key:s);i.type===Tr?(128&i.patchFlag&&r++,o=o.concat(Zn(i.children,t,l))):(t||i.type!==Nr)&&o.push(null!=l?Kr(i,{key:l}):i);}if(r>1)for(let s=0;s<o.length;s++)o[s].patchFlag=-2;return o}
  /*! #__NO_SIDE_EFFECTS__ */function Yn(e,t){return v(e)?(()=>a({name:e.name},t,{setup:e}))():e}const Qn=e=>!!e.type.__asyncLoader
  /*! #__NO_SIDE_EFFECTS__ */;function Xn(e,t){const{ref:n,props:o,children:r,ce:s}=t.vnode,i=Wr(e,o,r);return i.ref=n,i.ce=s,delete t.vnode.ce,i}const eo=e=>e.type.__isKeepAlive,to={name:"KeepAlive",__isKeepAlive:!0,props:{include:[String,RegExp,Array],exclude:[String,RegExp,Array],max:[String,Number]},setup(e,{slots:t}){const n=ns(),o=n.ctx,r=new Map,s=new Set;let i=null;const l=n.suspense,{renderer:{p:c,m:a,um:u,o:{createElement:p}}}=o,f=p("div");function d(e){lo(e),u(e,n,l,!0);}function h(e){r.forEach(((t,n)=>{const o=ms(t.type);!o||e&&e(o)||m(n);}));}function m(e){const t=r.get(e);i&&Lr(t,i)?i&&lo(i):d(t),r.delete(e),s.delete(e);}o.activate=(e,t,n,o,r)=>{const s=e.component;a(e,t,n,0,l),c(s.vnode,e,t,n,s,l,o,e.slotScopeIds,r),dr((()=>{s.isDeactivated=!1,s.a&&I(s.a);const t=e.props&&e.props.onVnodeMounted;t&&Qr(t,s.parent,e);}),l);},o.deactivate=e=>{const t=e.component;a(e,f,null,1,l),dr((()=>{t.da&&I(t.da);const n=e.props&&e.props.onVnodeUnmounted;n&&Qr(n,t.parent,e),t.isDeactivated=!0;}),l);},An((()=>[e.include,e.exclude]),(([e,t])=>{e&&h((t=>no(e,t))),t&&h((e=>!no(t,e)));}),{flush:"post",deep:!0});let g=null;const v=()=>{null!=g&&r.set(g,co(n.subTree));};return fo(v),mo(v),go((()=>{r.forEach((e=>{const{subTree:t,suspense:o}=n,r=co(t);if(e.type!==r.type||e.key!==r.key)d(e);else {lo(r);const e=r.component.da;e&&dr(e,o);}}));})),()=>{if(g=null,!t.default)return null;const n=t.default(),o=n[0];if(n.length>1)return i=null,n;if(!(Br(o)&&(4&o.shapeFlag||128&o.shapeFlag)))return i=null,o;let l=co(o);const c=l.type,a=ms(Qn(l)?l.type.__asyncResolved||{}:c),{include:u,exclude:p,max:f}=e;if(u&&(!a||!no(u,a))||p&&a&&no(p,a))return i=l,o;const d=null==l.key?c:l.key,h=r.get(d);return l.el&&(l=Kr(l),128&o.shapeFlag&&(o.ssContent=l)),g=d,h?(l.el=h.el,l.component=h.component,l.transition&&Jn(l,l.transition),l.shapeFlag|=512,s.delete(d),s.add(d)):(s.add(d),f&&s.size>parseInt(f,10)&&m(s.values().next().value)),l.shapeFlag|=256,i=l,kn(o.type)?o:l}}};function no(e,t){return d(e)?e.some((e=>no(e,t))):y(e)?e.split(",").includes(t):"[object RegExp]"===C(e)&&e.test(t)}function oo(e,t){so(e,"a",t);}function ro(e,t){so(e,"da",t);}function so(e,t,n=ts){const o=e.__wdc||(e.__wdc=()=>{let t=n;for(;t;){if(t.isDeactivated)return;t=t.parent;}return e()});if(ao(t,o,n),n){let e=n.parent;for(;e&&e.parent;)eo(e.parent.vnode)&&io(o,t,n,e),e=e.parent;}}function io(e,t,n,o){const r=ao(t,e,o,!0);vo((()=>{u(o[t],r);}),n);}function lo(e){e.shapeFlag&=-257,e.shapeFlag&=-513;}function co(e){return 128&e.shapeFlag?e.ssContent:e}function ao(e,t,n=ts,o=!1){if(n){const r=n[e]||(n[e]=[]),s=t.__weh||(t.__weh=(...o)=>{if(n.isUnmounted)return;xe(),rs(n);const r=jt(t,n,e,o);return ss(),Ce(),r});return o?r.unshift(s):r.push(s),s}}const uo=e=>(t,n=ts)=>(!as||"sp"===e)&&ao(e,((...e)=>t(...e)),n),po=uo("bm"),fo=uo("m"),ho=uo("bu"),mo=uo("u"),go=uo("bum"),vo=uo("um"),yo=uo("sp"),bo=uo("rtg"),_o=uo("rtc");function So(e,t=ts){ao("ec",e,t);}function xo(e){return e.some((e=>!Br(e)||e.type!==Nr&&!(e.type===Tr&&!xo(e.children))))?e:null}const Co=e=>e?is(e)?hs(e)||e.proxy:Co(e.parent):null,ko=a(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Co(e.parent),$root:e=>Co(e.root),$emit:e=>e.emit,$options:e=>Fo(e),$forceUpdate:e=>e.f||(e.f=()=>Qt(e.update)),$nextTick:e=>e.n||(e.n=Yt.bind(e.proxy)),$watch:e=>Mn.bind(e)}),wo=(e,t)=>e!==n&&!e.__isScriptSetup&&f(e,t),To={get({_:e},t){const{ctx:o,setupState:r,data:s,props:i,accessCache:l,type:c,appContext:a}=e;let u;if("$"!==t[0]){const c=l[t];if(void 0!==c)switch(c){case 1:return r[t];case 2:return s[t];case 4:return o[t];case 3:return i[t]}else {if(wo(r,t))return l[t]=1,r[t];if(s!==n&&f(s,t))return l[t]=2,s[t];if((u=e.propsOptions[0])&&f(u,t))return l[t]=3,i[t];if(o!==n&&f(o,t))return l[t]=4,o[t];$o&&(l[t]=0);}}const p=ko[t];let d,h;return p?("$attrs"===t&&ke(e,0,t),p(e)):(d=c.__cssModules)&&(d=d[t])?d:o!==n&&f(o,t)?(l[t]=4,o[t]):(h=a.config.globalProperties,f(h,t)?h[t]:void 0)},set({_:e},t,o){const{data:r,setupState:s,ctx:i}=e;return wo(s,t)?(s[t]=o,!0):r!==n&&f(r,t)?(r[t]=o,!0):!f(e.props,t)&&(("$"!==t[0]||!(t.slice(1)in e))&&(i[t]=o,!0))},has({_:{data:e,setupState:t,accessCache:o,ctx:r,appContext:s,propsOptions:i}},l){let c;return !!o[l]||e!==n&&f(e,l)||wo(t,l)||(c=i[0])&&f(c,l)||f(r,l)||f(ko,l)||f(s.config.globalProperties,l)},defineProperty(e,t,n){return null!=n.get?e._.accessCache[t]=0:f(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}},Eo=a({},To,{get(e,t){if(t!==Symbol.unscopables)return To.get(e,t,e)},has:(e,t)=>"_"!==t[0]&&!H(t)});function No(){const e=ns();return e.setupContext||(e.setupContext=ds(e))}function Oo(e){return d(e)?e.reduce(((e,t)=>(e[t]=null,e)),{}):e}let $o=!0;function Po(e){const t=Fo(e),n=e.proxy,o=e.ctx;$o=!1,t.beforeCreate&&Ro(t.beforeCreate,e,"bc");const{data:s,computed:i,methods:l,watch:c,provide:a,inject:u,created:p,beforeMount:f,mounted:h,beforeUpdate:m,updated:g,activated:y,deactivated:b,beforeUnmount:S,unmounted:x,render:C,renderTracked:k,renderTriggered:w,errorCaptured:T,serverPrefetch:E,expose:N,inheritAttrs:O,components:$,directives:P}=t;if(u&&function(e,t,n=r){d(e)&&(e=Bo(e));for(const o in e){const n=e[o];let r;r=_(n)?"default"in n?Go(n.from||o,n.default,!0):Go(n.from||o):Go(n),Et(r)?Object.defineProperty(t,o,{enumerable:!0,configurable:!0,get:()=>r.value,set:e=>r.value=e}):t[o]=r;}}(u,o,null),l)for(const r in l){const e=l[r];v(e)&&(o[r]=e.bind(n));}if(s){const t=s.call(n,n);_(t)&&(e.data=dt(t));}if($o=!0,i)for(const d in i){const e=i[d],t=v(e)?e.bind(n,n):v(e.get)?e.get.bind(n,n):r,s=!v(e)&&v(e.set)?e.set.bind(n):r,l=gs({get:t,set:s});Object.defineProperty(o,d,{enumerable:!0,configurable:!0,get:()=>l.value,set:e=>l.value=e});}if(c)for(const r in c)Ao(c[r],o,n,r);if(a){const e=v(a)?a.call(n):a;Reflect.ownKeys(e).forEach((t=>{Ko(t,e[t]);}));}function R(e,t){d(t)?t.forEach((t=>e(t.bind(n)))):t&&e(t.bind(n));}if(p&&Ro(p,e,"c"),R(po,f),R(fo,h),R(ho,m),R(mo,g),R(oo,y),R(ro,b),R(So,T),R(_o,k),R(bo,w),R(go,S),R(vo,x),R(yo,E),d(N))if(N.length){const t=e.exposed||(e.exposed={});N.forEach((e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t});}));}else e.exposed||(e.exposed={});C&&e.render===r&&(e.render=C),null!=O&&(e.inheritAttrs=O),$&&(e.components=$),P&&(e.directives=P);}function Ro(e,t,n){jt(d(e)?e.map((e=>e.bind(t.proxy))):e.bind(t.proxy),t,n);}function Ao(e,t,n,o){const r=o.includes(".")?Vn(n,o):()=>n[o];if(y(e)){const n=t[e];v(n)&&An(r,n);}else if(v(e))An(r,e.bind(n));else if(_(e))if(d(e))e.forEach((e=>Ao(e,t,n,o)));else {const o=v(e.handler)?e.handler.bind(n):t[e.handler];v(o)&&An(r,o,e);}}function Fo(e){const t=e.type,{mixins:n,extends:o}=t,{mixins:r,optionsCache:s,config:{optionMergeStrategies:i}}=e.appContext,l=s.get(t);let c;return l?c=l:r.length||n||o?(c={},r.length&&r.forEach((e=>Mo(c,e,i,!0))),Mo(c,t,i)):c=t,_(t)&&s.set(t,c),c}function Mo(e,t,n,o=!1){const{mixins:r,extends:s}=t;s&&Mo(e,s,n,!0),r&&r.forEach((t=>Mo(e,t,n,!0)));for(const i in t)if(o&&"expose"===i);else {const o=Vo[i]||n&&n[i];e[i]=o?o(e[i],t[i]):t[i];}return e}const Vo={data:Io,props:Uo,emits:Uo,methods:jo,computed:jo,beforeCreate:Lo,created:Lo,beforeMount:Lo,mounted:Lo,beforeUpdate:Lo,updated:Lo,beforeDestroy:Lo,beforeUnmount:Lo,destroyed:Lo,unmounted:Lo,activated:Lo,deactivated:Lo,errorCaptured:Lo,serverPrefetch:Lo,components:jo,directives:jo,watch:function(e,t){if(!e)return t;if(!t)return e;const n=a(Object.create(null),e);for(const o in t)n[o]=Lo(e[o],t[o]);return n},provide:Io,inject:function(e,t){return jo(Bo(e),Bo(t))}};function Io(e,t){return t?e?function(){return a(v(e)?e.call(this,this):e,v(t)?t.call(this,this):t)}:t:e}function Bo(e){if(d(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function Lo(e,t){return e?[...new Set([].concat(e,t))]:t}function jo(e,t){return e?a(Object.create(null),e,t):t}function Uo(e,t){return e?d(e)&&d(t)?[...new Set([...e,...t])]:a(Object.create(null),Oo(e),Oo(null!=t?t:{})):t}function Do(){return {app:null,config:{isNativeTag:s,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Ho=0;function Wo(e,t){return function(n,o=null){v(n)||(n=a({},n)),null==o||_(o)||(o=null);const r=Do(),s=new WeakSet;let i=!1;const l=r.app={_uid:Ho++,_component:n,_props:o,_container:null,_context:r,_instance:null,version:_s,get config(){return r.config},set config(e){},use:(e,...t)=>(s.has(e)||(e&&v(e.install)?(s.add(e),e.install(l,...t)):v(e)&&(s.add(e),e(l,...t))),l),mixin:e=>(r.mixins.includes(e)||r.mixins.push(e),l),component:(e,t)=>t?(r.components[e]=t,l):r.components[e],directive:(e,t)=>t?(r.directives[e]=t,l):r.directives[e],mount(s,c,a){if(!i){const u=Wr(n,o);return u.appContext=r,c&&t?t(u,s):e(u,s,a),i=!0,l._container=s,s.__vue_app__=l,hs(u.component)||u.component.proxy}},unmount(){i&&(e(null,l._container),delete l._container.__vue_app__);},provide:(e,t)=>(r.provides[e]=t,l),runWithContext(e){zo=l;try{return e()}finally{zo=null;}}};return l}}let zo=null;function Ko(e,t){if(ts){let n=ts.provides;const o=ts.parent&&ts.parent.provides;o===n&&(n=ts.provides=Object.create(o)),n[e]=t;}}function Go(e,t,n=!1){const o=ts||pn;if(o||zo){const r=o?null==o.parent?o.vnode.appContext&&o.vnode.appContext.provides:o.parent.provides:zo._context.provides;if(r&&e in r)return r[e];if(arguments.length>1)return n&&v(t)?t.call(o&&o.proxy):t}}function qo(e,t,o,r){const[s,i]=e.propsOptions;let l,c=!1;if(t)for(let n in t){if(E(n))continue;const a=t[n];let u;s&&f(s,u=P(n))?i&&i.includes(u)?(l||(l={}))[u]=a:o[u]=a:un(e.emitsOptions,n)||n in r&&a===r[n]||(r[n]=a,c=!0);}if(i){const t=St(o),r=l||n;for(let n=0;n<i.length;n++){const l=i[n];o[l]=Jo(s,t,l,r[l],e,!f(r,l));}}return c}function Jo(e,t,n,o,r,s){const i=e[n];if(null!=i){const e=f(i,"default");if(e&&void 0===o){const e=i.default;if(i.type!==Function&&!i.skipFactory&&v(e)){const{propsDefaults:s}=r;n in s?o=s[n]:(rs(r),o=s[n]=e.call(null,t),ss());}else o=e;}i[0]&&(s&&!e?o=!1:!i[1]||""!==o&&o!==A(n)||(o=!0));}return o}function Zo(e,t,r=!1){const s=t.propsCache,i=s.get(e);if(i)return i;const l=e.props,c={},u=[];let p=!1;if(!v(e)){const n=e=>{p=!0;const[n,o]=Zo(e,t,!0);a(c,n),o&&u.push(...o);};!r&&t.mixins.length&&t.mixins.forEach(n),e.extends&&n(e.extends),e.mixins&&e.mixins.forEach(n);}if(!l&&!p)return _(e)&&s.set(e,o),o;if(d(l))for(let o=0;o<l.length;o++){const e=P(l[o]);Yo(e)&&(c[e]=n);}else if(l)for(const n in l){const e=P(n);if(Yo(e)){const t=l[n],o=c[e]=d(t)||v(t)?{type:t}:a({},t);if(o){const t=er(Boolean,o.type),n=er(String,o.type);o[0]=t>-1,o[1]=n<0||t<n,(t>-1||f(o,"default"))&&u.push(e);}}}const h=[c,u];return _(e)&&s.set(e,h),h}function Yo(e){return "$"!==e[0]}function Qo(e){const t=e&&e.toString().match(/^\s*(function|class) (\w+)/);return t?t[2]:null===e?"null":""}function Xo(e,t){return Qo(e)===Qo(t)}function er(e,t){return d(t)?t.findIndex((t=>Xo(t,e))):v(t)&&Xo(t,e)?0:-1}const tr=e=>"_"===e[0]||"$stable"===e,nr=e=>d(e)?e.map(qr):[qr(e)],or=(e,t,n)=>{if(t._n)return t;const o=hn(((...e)=>nr(t(...e))),n);return o._c=!1,o},rr=(e,t,n)=>{const o=e._ctx;for(const r in e){if(tr(r))continue;const n=e[r];if(v(n))t[r]=or(0,n,o);else if(null!=n){const e=nr(n);t[r]=()=>e;}}},sr=(e,t)=>{const n=nr(t);e.slots.default=()=>n;},ir=(e,t)=>{if(32&e.vnode.shapeFlag){const n=t._;n?(e.slots=St(t),B(t,"_",n)):rr(t,e.slots={});}else e.slots={},t&&sr(e,t);B(e.slots,jr,1);},lr=(e,t,o)=>{const{vnode:r,slots:s}=e;let i=!0,l=n;if(32&r.shapeFlag){const e=t._;e?o&&1===e?i=!1:(a(s,t),o||1!==e||delete s._):(i=!t.$stable,rr(t,s)),l=t;}else t&&(sr(e,t),l={default:1});if(i)for(const n in s)tr(n)||null!=l[n]||delete s[n];};function cr(e,t,o,r,s=!1){if(d(e))return void e.forEach(((e,n)=>cr(e,t&&(d(t)?t[n]:t),o,r,s)));if(Qn(r)&&!s)return;const i=4&r.shapeFlag?hs(r.component)||r.component.proxy:r.el,l=s?null:i,{i:c,r:a}=e,p=t&&t.r,h=c.refs===n?c.refs={}:c.refs,m=c.setupState;if(null!=p&&p!==a&&(y(p)?(h[p]=null,f(m,p)&&(m[p]=null)):Et(p)&&(p.value=null)),v(a))Lt(a,c,12,[l,h]);else {const t=y(a),n=Et(a);if(t||n){const r=()=>{if(e.f){const n=t?f(m,a)?m[a]:h[a]:a.value;s?d(n)&&u(n,i):d(n)?n.includes(i)||n.push(i):t?(h[a]=[i],f(m,a)&&(m[a]=h[a])):(a.value=[i],e.k&&(h[e.k]=a.value));}else t?(h[a]=l,f(m,a)&&(m[a]=l)):n&&(a.value=l,e.k&&(h[e.k]=l));};l?(r.id=-1,dr(r,o)):r();}}}let ar=!1;const ur=e=>/svg/.test(e.namespaceURI)&&"foreignObject"!==e.tagName,pr=e=>8===e.nodeType;function fr(e){const{mt:t,p:n,o:{patchProp:o,createText:r,nextSibling:s,parentNode:i,remove:c,insert:a,createComment:u}}=e,p=(n,o,l,c,u,b=!1)=>{const _=pr(n)&&"["===n.data,S=()=>m(n,o,l,c,u,_),{type:x,ref:C,shapeFlag:k,patchFlag:w}=o;let T=n.nodeType;o.el=n,-2===w&&(b=!1,o.dynamicChildren=null);let E=null;switch(x){case Er:3!==T?""===o.children?(a(o.el=r(""),i(n),n),E=n):E=S():(n.data!==o.children&&(ar=!0,n.data=o.children),E=s(n));break;case Nr:y(n)?(E=s(n),v(o.el=n.content.firstChild,n,l)):E=8!==T||_?S():s(n);break;case Or:if(_&&(T=(n=s(n)).nodeType),1===T||3===T){E=n;const e=!o.children.length;for(let t=0;t<o.staticCount;t++)e&&(o.children+=1===E.nodeType?E.outerHTML:E.data),t===o.staticCount-1&&(o.anchor=E),E=s(E);return _?s(E):E}S();break;case Tr:E=_?h(n,o,l,c,u,b):S();break;default:if(1&k)E=1===T&&o.type.toLowerCase()===n.tagName.toLowerCase()||y(n)?f(n,o,l,c,u,b):S();else if(6&k){o.slotScopeIds=u;const e=i(n);if(E=_?g(n):pr(n)&&"teleport start"===n.data?g(n,n.data,"teleport end"):s(n),t(o,e,null,l,c,ur(e),b),Qn(o)){let t;_?(t=Wr(Tr),t.anchor=E?E.previousSibling:e.lastChild):t=3===n.nodeType?Gr(""):Wr("div"),t.el=n,o.component.subTree=t;}}else 64&k?E=8!==T?S():o.type.hydrate(n,o,l,c,u,b,e,d):128&k&&(E=o.type.hydrate(n,o,l,c,ur(i(n)),u,b,e,p));}return null!=C&&cr(C,null,c,o),E},f=(e,t,n,r,s,i)=>{i=i||!!t.dynamicChildren;const{type:a,props:u,patchFlag:p,shapeFlag:f,dirs:h,transition:m}=t,g="input"===a&&h||"option"===a;if(g||-1!==p){if(h&&Bn(t,null,n,"created"),u)if(g||!i||48&p)for(const t in u)(g&&t.endsWith("value")||l(t)&&!E(t))&&o(e,t,null,u[t],!1,void 0,n);else u.onClick&&o(e,"onClick",null,u.onClick,!1,void 0,n);let a;(a=u&&u.onVnodeBeforeMount)&&Qr(a,n,t);let b=!1;if(y(e)){b=yr(r,m)&&n&&n.vnode.props&&n.vnode.props.appear;const o=e.content.firstChild;b&&m.beforeEnter(o),v(o,e,n),t.el=e=o;}if(h&&Bn(t,null,n,"beforeMount"),((a=u&&u.onVnodeMounted)||h||b)&&On((()=>{a&&Qr(a,n,t),b&&m.enter(e),h&&Bn(t,null,n,"mounted");}),r),16&f&&(!u||!u.innerHTML&&!u.textContent)){let o=d(e.firstChild,t,e,n,r,s,i);for(;o;){ar=!0;const e=o;o=o.nextSibling,c(e);}}else 8&f&&e.textContent!==t.children&&(ar=!0,e.textContent=t.children);}return e.nextSibling},d=(e,t,o,r,s,i,l)=>{l=l||!!t.dynamicChildren;const c=t.children,a=c.length;for(let u=0;u<a;u++){const t=l?c[u]:c[u]=qr(c[u]);if(e)e=p(e,t,r,s,i,l);else {if(t.type===Er&&!t.children)continue;ar=!0,n(null,t,o,null,r,s,ur(o),i);}}return e},h=(e,t,n,o,r,l)=>{const{slotScopeIds:c}=t;c&&(r=r?r.concat(c):c);const p=i(e),f=d(s(e),t,p,n,o,r,l);return f&&pr(f)&&"]"===f.data?s(t.anchor=f):(ar=!0,a(t.anchor=u("]"),p,f),f)},m=(e,t,o,r,l,a)=>{if(ar=!0,t.el=null,a){const t=g(e);for(;;){const n=s(e);if(!n||n===t)break;c(n);}}const u=s(e),p=i(e);return c(e),n(null,t,p,u,o,r,ur(p),l),u},g=(e,t="[",n="]")=>{let o=0;for(;e;)if((e=s(e))&&pr(e)&&(e.data===t&&o++,e.data===n)){if(0===o)return s(e);o--;}return e},v=(e,t,n)=>{const o=t.parentNode;o&&o.replaceChild(e,t);let r=n;for(;r;)r.vnode.el===t&&(r.vnode.el=r.subTree.el=e),r=r.parent;},y=e=>1===e.nodeType&&"template"===e.tagName.toLowerCase();return [(e,t)=>{if(!t.hasChildNodes())return n(null,e,t),nn(),void(t._vnode=e);ar=!1,p(t.firstChild,e,null,null,null),nn(),t._vnode=e,ar&&console.error("Hydration completed but contains mismatches.");},p]}const dr=On;function hr(e){return gr(e)}function mr(e){return gr(e,fr)}function gr(e,t){D().__VUE__=!0;const{insert:s,remove:i,patchProp:l,createElement:c,createText:a,createComment:u,setText:p,setElementText:d,parentNode:h,nextSibling:m,setScopeId:g=r,insertStaticContent:v}=e,y=(e,t,n,o=null,r=null,s=null,i=!1,l=null,c=!!t.dynamicChildren)=>{if(e===t)return;e&&!Lr(e,t)&&(o=Y(e),K(e,r,s,!0),e=null),-2===t.patchFlag&&(c=!1,t.dynamicChildren=null);const{type:a,ref:u,shapeFlag:p}=t;switch(a){case Er:b(e,t,n,o);break;case Nr:_(e,t,n,o);break;case Or:null==e&&x(t,n,o,i);break;case Tr:R(e,t,n,o,r,s,i,l,c);break;default:1&p?C(e,t,n,o,r,s,i,l,c):6&p?F(e,t,n,o,r,s,i,l,c):(64&p||128&p)&&a.process(e,t,n,o,r,s,i,l,c,X);}null!=u&&r&&cr(u,e&&e.ref,s,t||e,!t);},b=(e,t,n,o)=>{if(null==e)s(t.el=a(t.children),n,o);else {const n=t.el=e.el;t.children!==e.children&&p(n,t.children);}},_=(e,t,n,o)=>{null==e?s(t.el=u(t.children||""),n,o):t.el=e.el;},x=(e,t,n,o)=>{[e.el,e.anchor]=v(e.children,t,n,o,e.el,e.anchor);},C=(e,t,n,o,r,s,i,l,c)=>{i=i||"svg"===t.type,null==e?k(t,n,o,r,s,i,l,c):N(e,t,r,s,i,l,c);},k=(e,t,n,o,r,i,a,u)=>{let p,f;const{type:h,props:m,shapeFlag:g,transition:v,dirs:y}=e;if(p=e.el=c(e.type,i,m&&m.is,m),8&g?d(p,e.children):16&g&&T(e.children,p,null,o,r,i&&"foreignObject"!==h,a,u),y&&Bn(e,null,o,"created"),w(p,e,e.scopeId,a,o),m){for(const t in m)"value"===t||E(t)||l(p,t,null,m[t],i,e.children,o,r,Z);"value"in m&&l(p,"value",null,m.value),(f=m.onVnodeBeforeMount)&&Qr(f,o,e);}y&&Bn(e,null,o,"beforeMount");const b=yr(r,v);b&&v.beforeEnter(p),s(p,t,n),((f=m&&m.onVnodeMounted)||b||y)&&dr((()=>{f&&Qr(f,o,e),b&&v.enter(p),y&&Bn(e,null,o,"mounted");}),r);},w=(e,t,n,o,r)=>{if(n&&g(e,n),o)for(let s=0;s<o.length;s++)g(e,o[s]);if(r){if(t===r.subTree){const t=r.vnode;w(e,t,t.scopeId,t.slotScopeIds,r.parent);}}},T=(e,t,n,o,r,s,i,l,c=0)=>{for(let a=c;a<e.length;a++){const c=e[a]=l?Jr(e[a]):qr(e[a]);y(null,c,t,n,o,r,s,i,l);}},N=(e,t,o,r,s,i,c)=>{const a=t.el=e.el;let{patchFlag:u,dynamicChildren:p,dirs:f}=t;u|=16&e.patchFlag;const h=e.props||n,m=t.props||n;let g;o&&vr(o,!1),(g=m.onVnodeBeforeUpdate)&&Qr(g,o,t,e),f&&Bn(t,e,o,"beforeUpdate"),o&&vr(o,!0);const v=s&&"foreignObject"!==t.type;if(p?O(e.dynamicChildren,p,a,o,r,v,i):c||U(e,t,a,null,o,r,v,i,!1),u>0){if(16&u)$(a,t,h,m,o,r,s);else if(2&u&&h.class!==m.class&&l(a,"class",null,m.class,s),4&u&&l(a,"style",h.style,m.style,s),8&u){const n=t.dynamicProps;for(let t=0;t<n.length;t++){const i=n[t],c=h[i],u=m[i];u===c&&"value"!==i||l(a,i,c,u,s,e.children,o,r,Z);}}1&u&&e.children!==t.children&&d(a,t.children);}else c||null!=p||$(a,t,h,m,o,r,s);((g=m.onVnodeUpdated)||f)&&dr((()=>{g&&Qr(g,o,t,e),f&&Bn(t,e,o,"updated");}),r);},O=(e,t,n,o,r,s,i)=>{for(let l=0;l<t.length;l++){const c=e[l],a=t[l],u=c.el&&(c.type===Tr||!Lr(c,a)||70&c.shapeFlag)?h(c.el):n;y(c,a,u,null,o,r,s,i,!0);}},$=(e,t,o,r,s,i,c)=>{if(o!==r){if(o!==n)for(const n in o)E(n)||n in r||l(e,n,o[n],null,c,t.children,s,i,Z);for(const n in r){if(E(n))continue;const a=r[n],u=o[n];a!==u&&"value"!==n&&l(e,n,u,a,c,t.children,s,i,Z);}"value"in r&&l(e,"value",o.value,r.value);}},R=(e,t,n,o,r,i,l,c,u)=>{const p=t.el=e?e.el:a(""),f=t.anchor=e?e.anchor:a("");let{patchFlag:d,dynamicChildren:h,slotScopeIds:m}=t;m&&(c=c?c.concat(m):m),null==e?(s(p,n,o),s(f,n,o),T(t.children,n,f,r,i,l,c,u)):d>0&&64&d&&h&&e.dynamicChildren?(O(e.dynamicChildren,h,n,r,i,l,c),(null!=t.key||r&&t===r.subTree)&&br(e,t,!0)):U(e,t,n,f,r,i,l,c,u);},F=(e,t,n,o,r,s,i,l,c)=>{t.slotScopeIds=l,null==e?512&t.shapeFlag?r.ctx.activate(t,n,o,i,c):M(t,n,o,r,s,i,c):V(e,t,c);},M=(e,t,o,r,s,i,l)=>{const c=e.component=function(e,t,o){const r=e.type,s=(t?t.appContext:e.appContext)||Xr,i={uid:es++,vnode:e,type:r,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,scope:new se(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Zo(r,s),emitsOptions:an(r,s),emit:null,emitted:null,propsDefaults:n,inheritAttrs:r.inheritAttrs,ctx:n,data:n,props:n,attrs:n,slots:n,refs:n,setupState:n,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:o,suspenseId:o?o.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};i.ctx={_:i},i.root=t?t.root:i,i.emit=cn.bind(null,i),e.ce&&e.ce(i);return i}(e,r,s);if(eo(e)&&(c.ctx.renderer=X),function(e,t=!1){as=t;const{props:n,children:o}=e.vnode,r=is(e);(function(e,t,n,o=!1){const r={},s={};B(s,jr,1),e.propsDefaults=Object.create(null),qo(e,t,r,s);for(const i in e.propsOptions[0])i in r||(r[i]=void 0);e.props=n?o?r:ht(r):e.type.props?r:s,e.attrs=s;})(e,n,r,t),ir(e,o);r?function(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=xt(new Proxy(e.ctx,To));const{setup:o}=n;if(o){const n=e.setupContext=o.length>1?ds(e):null;rs(e),xe();const r=Lt(o,e,0,[e.props,n]);if(Ce(),ss(),S(r)){if(r.then(ss,ss),t)return r.then((n=>{us(e,n,t);})).catch((t=>{Ut(t,e,0);}));e.asyncDep=r;}else us(e,r,t);}else fs(e,t);}(e,t):void 0;as=!1;}(c),c.asyncDep){if(s&&s.registerDep(c,L),!e.el){const e=c.subTree=Wr(Nr);_(null,e,t,o);}}else L(c,e,t,o,s,i,l);},V=(e,t,n)=>{const o=t.component=e.component;if(function(e,t,n){const{props:o,children:r,component:s}=e,{props:i,children:l,patchFlag:c}=t,a=s.emitsOptions;if(t.dirs||t.transition)return !0;if(!(n&&c>=0))return !(!r&&!l||l&&l.$stable)||o!==i&&(o?!i||yn(o,i,a):!!i);if(1024&c)return !0;if(16&c)return o?yn(o,i,a):!!i;if(8&c){const e=t.dynamicProps;for(let t=0;t<e.length;t++){const n=e[t];if(i[n]!==o[n]&&!un(a,n))return !0}}return !1}(e,t,n)){if(o.asyncDep&&!o.asyncResolved)return void j(o,t,n);o.next=t,function(e){const t=Wt.indexOf(e);t>zt&&Wt.splice(t,1);}(o.update),o.update();}else t.el=e.el,o.vnode=t;},L=(e,t,n,o,r,s,i)=>{const l=e.effect=new ye((()=>{if(e.isMounted){let t,{next:n,bu:o,u:l,parent:c,vnode:a}=e,u=n;vr(e,!1),n?(n.el=a.el,j(e,n,i)):n=a,o&&I(o),(t=n.props&&n.props.onVnodeBeforeUpdate)&&Qr(t,c,n,a),vr(e,!0);const p=mn(e),f=e.subTree;e.subTree=p,y(f,p,h(f.el),Y(f),e,r,s),n.el=p.el,null===u&&bn(e,p.el),l&&dr(l,r),(t=n.props&&n.props.onVnodeUpdated)&&dr((()=>Qr(t,c,n,a)),r);}else {let i;const{el:l,props:c}=t,{bm:a,m:u,parent:p}=e,f=Qn(t);if(vr(e,!1),a&&I(a),!f&&(i=c&&c.onVnodeBeforeMount)&&Qr(i,p,t),vr(e,!0),l&&te){const n=()=>{e.subTree=mn(e),te(l,e.subTree,e,r,null);};f?t.type.__asyncLoader().then((()=>!e.isUnmounted&&n())):n();}else {const i=e.subTree=mn(e);y(null,i,n,o,e,r,s),t.el=i.el;}if(u&&dr(u,r),!f&&(i=c&&c.onVnodeMounted)){const e=t;dr((()=>Qr(i,p,e)),r);}(256&t.shapeFlag||p&&Qn(p.vnode)&&256&p.vnode.shapeFlag)&&e.a&&dr(e.a,r),e.isMounted=!0,t=n=o=null;}}),(()=>Qt(c)),e.scope),c=e.update=()=>l.run();c.id=e.uid,vr(e,!0),c();},j=(e,t,n)=>{t.component=e;const o=e.vnode.props;e.vnode=t,e.next=null,function(e,t,n,o){const{props:r,attrs:s,vnode:{patchFlag:i}}=e,l=St(r),[c]=e.propsOptions;let a=!1;if(!(o||i>0)||16&i){let o;qo(e,t,r,s)&&(a=!0);for(const s in l)t&&(f(t,s)||(o=A(s))!==s&&f(t,o))||(c?!n||void 0===n[s]&&void 0===n[o]||(r[s]=Jo(c,l,s,void 0,e,!0)):delete r[s]);if(s!==l)for(const e in s)t&&f(t,e)||(delete s[e],a=!0);}else if(8&i){const n=e.vnode.dynamicProps;for(let o=0;o<n.length;o++){let i=n[o];if(un(e.emitsOptions,i))continue;const u=t[i];if(c)if(f(s,i))u!==s[i]&&(s[i]=u,a=!0);else {const t=P(i);r[t]=Jo(c,l,t,u,e,!1);}else u!==s[i]&&(s[i]=u,a=!0);}}a&&Te(e,"set","$attrs");}(e,t.props,o,n),lr(e,t.children,n),xe(),tn(),Ce();},U=(e,t,n,o,r,s,i,l,c=!1)=>{const a=e&&e.children,u=e?e.shapeFlag:0,p=t.children,{patchFlag:f,shapeFlag:h}=t;if(f>0){if(128&f)return void W(a,p,n,o,r,s,i,l,c);if(256&f)return void H(a,p,n,o,r,s,i,l,c)}8&h?(16&u&&Z(a,r,s),p!==a&&d(n,p)):16&u?16&h?W(a,p,n,o,r,s,i,l,c):Z(a,r,s,!0):(8&u&&d(n,""),16&h&&T(p,n,o,r,s,i,l,c));},H=(e,t,n,r,s,i,l,c,a)=>{const u=(e=e||o).length,p=(t=t||o).length,f=Math.min(u,p);let d;for(d=0;d<f;d++){const o=t[d]=a?Jr(t[d]):qr(t[d]);y(e[d],o,n,null,s,i,l,c,a);}u>p?Z(e,s,i,!0,!1,f):T(t,n,r,s,i,l,c,a,f);},W=(e,t,n,r,s,i,l,c,a)=>{let u=0;const p=t.length;let f=e.length-1,d=p-1;for(;u<=f&&u<=d;){const o=e[u],r=t[u]=a?Jr(t[u]):qr(t[u]);if(!Lr(o,r))break;y(o,r,n,null,s,i,l,c,a),u++;}for(;u<=f&&u<=d;){const o=e[f],r=t[d]=a?Jr(t[d]):qr(t[d]);if(!Lr(o,r))break;y(o,r,n,null,s,i,l,c,a),f--,d--;}if(u>f){if(u<=d){const e=d+1,o=e<p?t[e].el:r;for(;u<=d;)y(null,t[u]=a?Jr(t[u]):qr(t[u]),n,o,s,i,l,c,a),u++;}}else if(u>d)for(;u<=f;)K(e[u],s,i,!0),u++;else {const h=u,m=u,g=new Map;for(u=m;u<=d;u++){const e=t[u]=a?Jr(t[u]):qr(t[u]);null!=e.key&&g.set(e.key,u);}let v,b=0;const _=d-m+1;let S=!1,x=0;const C=new Array(_);for(u=0;u<_;u++)C[u]=0;for(u=h;u<=f;u++){const o=e[u];if(b>=_){K(o,s,i,!0);continue}let r;if(null!=o.key)r=g.get(o.key);else for(v=m;v<=d;v++)if(0===C[v-m]&&Lr(o,t[v])){r=v;break}void 0===r?K(o,s,i,!0):(C[r-m]=u+1,r>=x?x=r:S=!0,y(o,t[r],n,null,s,i,l,c,a),b++);}const k=S?function(e){const t=e.slice(),n=[0];let o,r,s,i,l;const c=e.length;for(o=0;o<c;o++){const c=e[o];if(0!==c){if(r=n[n.length-1],e[r]<c){t[o]=r,n.push(o);continue}for(s=0,i=n.length-1;s<i;)l=s+i>>1,e[n[l]]<c?s=l+1:i=l;c<e[n[s]]&&(s>0&&(t[o]=n[s-1]),n[s]=o);}}s=n.length,i=n[s-1];for(;s-- >0;)n[s]=i,i=t[i];return n}(C):o;for(v=k.length-1,u=_-1;u>=0;u--){const e=m+u,o=t[e],f=e+1<p?t[e+1].el:r;0===C[u]?y(null,o,n,f,s,i,l,c,a):S&&(v<0||u!==k[v]?z(o,n,f,2):v--);}}},z=(e,t,n,o,r=null)=>{const{el:i,type:l,transition:c,children:a,shapeFlag:u}=e;if(6&u)return void z(e.component.subTree,t,n,o);if(128&u)return void e.suspense.move(t,n,o);if(64&u)return void l.move(e,t,n,X);if(l===Tr){s(i,t,n);for(let e=0;e<a.length;e++)z(a[e],t,n,o);return void s(e.anchor,t,n)}if(l===Or)return void(({el:e,anchor:t},n,o)=>{let r;for(;e&&e!==t;)r=m(e),s(e,n,o),e=r;s(t,n,o);})(e,t,n);if(2!==o&&1&u&&c)if(0===o)c.beforeEnter(i),s(i,t,n),dr((()=>c.enter(i)),r);else {const{leave:e,delayLeave:o,afterLeave:r}=c,l=()=>s(i,t,n),a=()=>{e(i,(()=>{l(),r&&r();}));};o?o(i,l,a):a();}else s(i,t,n);},K=(e,t,n,o=!1,r=!1)=>{const{type:s,props:i,ref:l,children:c,dynamicChildren:a,shapeFlag:u,patchFlag:p,dirs:f}=e;if(null!=l&&cr(l,null,n,e,!0),256&u)return void t.ctx.deactivate(e);const d=1&u&&f,h=!Qn(e);let m;if(h&&(m=i&&i.onVnodeBeforeUnmount)&&Qr(m,t,e),6&u)J(e.component,n,o);else {if(128&u)return void e.suspense.unmount(n,o);d&&Bn(e,null,t,"beforeUnmount"),64&u?e.type.remove(e,t,n,r,X,o):a&&(s!==Tr||p>0&&64&p)?Z(a,t,n,!1,!0):(s===Tr&&384&p||!r&&16&u)&&Z(c,t,n),o&&G(e);}(h&&(m=i&&i.onVnodeUnmounted)||d)&&dr((()=>{m&&Qr(m,t,e),d&&Bn(e,null,t,"unmounted");}),n);},G=e=>{const{type:t,el:n,anchor:o,transition:r}=e;if(t===Tr)return void q(n,o);if(t===Or)return void(({el:e,anchor:t})=>{let n;for(;e&&e!==t;)n=m(e),i(e),e=n;i(t);})(e);const s=()=>{i(n),r&&!r.persisted&&r.afterLeave&&r.afterLeave();};if(1&e.shapeFlag&&r&&!r.persisted){const{leave:t,delayLeave:o}=r,i=()=>t(n,s);o?o(e.el,s,i):i();}else s();},q=(e,t)=>{let n;for(;e!==t;)n=m(e),i(e),e=n;i(t);},J=(e,t,n)=>{const{bum:o,scope:r,update:s,subTree:i,um:l}=e;o&&I(o),r.stop(),s&&(s.active=!1,K(i,e,t,n)),l&&dr(l,t),dr((()=>{e.isUnmounted=!0;}),t),t&&t.pendingBranch&&!t.isUnmounted&&e.asyncDep&&!e.asyncResolved&&e.suspenseId===t.pendingId&&(t.deps--,0===t.deps&&t.resolve());},Z=(e,t,n,o=!1,r=!1,s=0)=>{for(let i=s;i<e.length;i++)K(e[i],t,n,o,r);},Y=e=>6&e.shapeFlag?Y(e.component.subTree):128&e.shapeFlag?e.suspense.next():m(e.anchor||e.el),Q=(e,t,n)=>{null==e?t._vnode&&K(t._vnode,null,null,!0):y(t._vnode||null,e,t,null,null,null,n),tn(),nn(),t._vnode=e;},X={p:y,um:K,m:z,r:G,mt:M,mc:T,pc:U,pbc:O,n:Y,o:e};let ee,te;return t&&([ee,te]=t(X)),{render:Q,hydrate:ee,createApp:Wo(Q,ee)}}function vr({effect:e,update:t},n){e.allowRecurse=t.allowRecurse=n;}function yr(e,t){return (!e||e&&!e.pendingBranch)&&t&&!t.persisted}function br(e,t,n=!1){const o=e.children,r=t.children;if(d(o)&&d(r))for(let s=0;s<o.length;s++){const e=o[s];let t=r[s];1&t.shapeFlag&&!t.dynamicChildren&&((t.patchFlag<=0||32===t.patchFlag)&&(t=r[s]=Jr(r[s]),t.el=e.el),n||br(e,t)),t.type===Er&&(t.el=e.el);}}const _r=e=>e&&(e.disabled||""===e.disabled),Sr=e=>"undefined"!=typeof SVGElement&&e instanceof SVGElement,xr=(e,t)=>{const n=e&&e.to;if(y(n)){if(t){return t(n)}return null}return n};function Cr(e,t,n,{o:{insert:o},m:r},s=2){0===s&&o(e.targetAnchor,t,n);const{el:i,anchor:l,shapeFlag:c,children:a,props:u}=e,p=2===s;if(p&&o(i,t,n),(!p||_r(u))&&16&c)for(let f=0;f<a.length;f++)r(a[f],t,n,2);p&&o(l,t,n);}const kr={__isTeleport:!0,process(e,t,n,o,r,s,i,l,c,a){const{mc:u,pc:p,pbc:f,o:{insert:d,querySelector:h,createText:m}}=a,g=_r(t.props);let{shapeFlag:v,children:y,dynamicChildren:b}=t;if(null==e){const e=t.el=m(""),a=t.anchor=m("");d(e,n,o),d(a,n,o);const p=t.target=xr(t.props,h),f=t.targetAnchor=m("");p&&(d(f,p),i=i||Sr(p));const b=(e,t)=>{16&v&&u(y,e,t,r,s,i,l,c);};g?b(n,a):p&&b(p,f);}else {t.el=e.el;const o=t.anchor=e.anchor,u=t.target=e.target,d=t.targetAnchor=e.targetAnchor,m=_r(e.props),v=m?n:u,y=m?o:d;if(i=i||Sr(u),b?(f(e.dynamicChildren,b,v,r,s,i,l),br(e,t,!0)):c||p(e,t,v,y,r,s,i,l,!1),g)m?t.props&&e.props&&t.props.to!==e.props.to&&(t.props.to=e.props.to):Cr(t,n,o,a,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){const e=t.target=xr(t.props,h);e&&Cr(t,e,null,a,0);}else m&&Cr(t,u,d,a,1);}wr(t);},remove(e,t,n,o,{um:r,o:{remove:s}},i){const{shapeFlag:l,children:c,anchor:a,targetAnchor:u,target:p,props:f}=e;if(p&&s(u),i&&s(a),16&l){const e=i||!_r(f);for(let o=0;o<c.length;o++){const s=c[o];r(s,t,n,e,!!s.dynamicChildren);}}},move:Cr,hydrate:function(e,t,n,o,r,s,{o:{nextSibling:i,parentNode:l,querySelector:c}},a){const u=t.target=xr(t.props,c);if(u){const c=u._lpa||u.firstChild;if(16&t.shapeFlag)if(_r(t.props))t.anchor=a(i(e),t,l(e),n,o,r,s),t.targetAnchor=c;else {t.anchor=i(e);let l=c;for(;l;)if(l=i(l),l&&8===l.nodeType&&"teleport anchor"===l.data){t.targetAnchor=l,u._lpa=t.targetAnchor&&i(t.targetAnchor);break}a(c,t,u,n,o,r,s);}wr(t);}return t.anchor&&i(t.anchor)}};function wr(e){const t=e.ctx;if(t&&t.ut){let n=e.children[0].el;for(;n&&n!==e.targetAnchor;)1===n.nodeType&&n.setAttribute("data-v-owner",t.uid),n=n.nextSibling;t.ut();}}const Tr=Symbol.for("v-fgt"),Er=Symbol.for("v-txt"),Nr=Symbol.for("v-cmt"),Or=Symbol.for("v-stc"),$r=[];let Pr=null;function Rr(e=!1){$r.push(Pr=e?null:[]);}function Ar(){$r.pop(),Pr=$r[$r.length-1]||null;}let Fr=1;function Mr(e){Fr+=e;}function Vr(e){return e.dynamicChildren=Fr>0?Pr||o:null,Ar(),Fr>0&&Pr&&Pr.push(e),e}function Ir(e,t,n,o,r){return Vr(Wr(e,t,n,o,r,!0))}function Br(e){return !!e&&!0===e.__v_isVNode}function Lr(e,t){return e.type===t.type&&e.key===t.key}const jr="__vInternal",Ur=({key:e})=>null!=e?e:null,Dr=({ref:e,ref_key:t,ref_for:n})=>("number"==typeof e&&(e=""+e),null!=e?y(e)||Et(e)||v(e)?{i:pn,r:e,k:t,f:!!n}:e:null);function Hr(e,t=null,n=null,o=0,r=null,s=(e===Tr?0:1),i=!1,l=!1){const c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Ur(t),ref:t&&Dr(t),scopeId:fn,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:o,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:pn};return l?(Zr(c,n),128&s&&e.normalize(c)):n&&(c.shapeFlag|=y(n)?8:16),Fr>0&&!i&&Pr&&(c.patchFlag>0||6&s)&&32!==c.patchFlag&&Pr.push(c),c}const Wr=function(e,t=null,n=null,o=0,r=null,s=!1){e&&e!==Sn||(e=Nr);if(Br(e)){const o=Kr(e,t,!0);return n&&Zr(o,n),Fr>0&&!s&&Pr&&(6&o.shapeFlag?Pr[Pr.indexOf(e)]=o:Pr.push(o)),o.patchFlag|=-2,o}i=e,v(i)&&"__vccOpts"in i&&(e=e.__vccOpts);var i;if(t){t=zr(t);let{class:e,style:n}=t;e&&!y(e)&&(t.class=J(e)),_(n)&&(_t(n)&&!d(n)&&(n=a({},n)),t.style=W(n));}const l=y(e)?1:kn(e)?128:(e=>e.__isTeleport)(e)?64:_(e)?4:v(e)?2:0;return Hr(e,t,n,o,r,l,s,!0)};function zr(e){return e?_t(e)||jr in e?a({},e):e:null}function Kr(e,t,n=!1){const{props:o,ref:r,patchFlag:s,children:i}=e,l=t?Yr(o||{},t):o;return {__v_isVNode:!0,__v_skip:!0,type:e.type,props:l,key:l&&Ur(l),ref:t&&t.ref?n&&r?d(r)?r.concat(Dr(t)):[r,Dr(t)]:Dr(t):r,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:i,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Tr?-1===s?16:16|s:s,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Kr(e.ssContent),ssFallback:e.ssFallback&&Kr(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce}}function Gr(e=" ",t=0){return Wr(Er,null,e,t)}function qr(e){return null==e||"boolean"==typeof e?Wr(Nr):d(e)?Wr(Tr,null,e.slice()):"object"==typeof e?Jr(e):Wr(Er,null,String(e))}function Jr(e){return null===e.el&&-1!==e.patchFlag||e.memo?e:Kr(e)}function Zr(e,t){let n=0;const{shapeFlag:o}=e;if(null==t)t=null;else if(d(t))n=16;else if("object"==typeof t){if(65&o){const n=t.default;return void(n&&(n._c&&(n._d=!1),Zr(e,n()),n._c&&(n._d=!0)))}{n=32;const o=t._;o||jr in t?3===o&&pn&&(1===pn.slots._?t._=1:(t._=2,e.patchFlag|=1024)):t._ctx=pn;}}else v(t)?(t={default:t,_ctx:pn},n=32):(t=String(t),64&o?(n=16,t=[Gr(t)]):n=8);e.children=t,e.shapeFlag|=n;}function Yr(...e){const t={};for(let n=0;n<e.length;n++){const o=e[n];for(const e in o)if("class"===e)t.class!==o.class&&(t.class=J([t.class,o.class]));else if("style"===e)t.style=W([t.style,o.style]);else if(l(e)){const n=t[e],r=o[e];!r||n===r||d(n)&&n.includes(r)||(t[e]=n?[].concat(n,r):r);}else ""!==e&&(t[e]=o[e]);}return t}function Qr(e,t,n,o=null){jt(e,t,7,[n,o]);}const Xr=Do();let es=0;let ts=null;const ns=()=>ts||pn;let os;os=e=>{ts=e;};const rs=e=>{os(e),e.scope.on();},ss=()=>{ts&&ts.scope.off(),os(null);};function is(e){return 4&e.vnode.shapeFlag}let ls,cs,as=!1;function us(e,t,n){v(t)?e.render=t:_(t)&&(e.setupState=At(t)),fs(e,n);}function ps(e){ls=e,cs=e=>{e.render._rc&&(e.withProxy=new Proxy(e.ctx,Eo));};}function fs(e,t,n){const o=e.type;if(!e.render){if(!t&&ls&&!o.render){const t=o.template||Fo(e).template;if(t){const{isCustomElement:n,compilerOptions:r}=e.appContext.config,{delimiters:s,compilerOptions:i}=o,l=a(a({isCustomElement:n,delimiters:s},r),i);o.render=ls(t,l);}}e.render=o.render||r,cs&&cs(e);}rs(e),xe();try{Po(e);}finally{Ce(),ss();}}function ds(e){const t=t=>{e.exposed=t||{};};return {get attrs(){return function(e){return e.attrsProxy||(e.attrsProxy=new Proxy(e.attrs,{get:(t,n)=>(ke(e,0,"$attrs"),t[n])}))}(e)},slots:e.slots,emit:e.emit,expose:t}}function hs(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy(At(xt(e.exposed)),{get:(t,n)=>n in t?t[n]:n in ko?ko[n](e):void 0,has:(e,t)=>t in e||t in ko}))}function ms(e,t=!0){return v(e)?e.displayName||e.name:e.name||t&&e.__name}const gs=(e,t)=>function(e,t,n=!1){let o,s;const i=v(e);return i?(o=e,s=r):(o=e.get,s=e.set),new Bt(o,s,i||!s,n)}(e,0,as);function vs(e,t,n){const o=arguments.length;return 2===o?_(t)&&!d(t)?Br(t)?Wr(e,null,[t]):Wr(e,t):Wr(e,null,t):(o>3?n=Array.prototype.slice.call(arguments,2):3===o&&Br(n)&&(n=[n]),Wr(e,t,n))}const ys=Symbol.for("v-scx");function bs(e,t){const n=e.memo;if(n.length!=t.length)return !1;for(let o=0;o<n.length;o++)if(V(n[o],t[o]))return !1;return Fr>0&&Pr&&Pr.push(e),!0}const _s="3.3.8",Ss="undefined"!=typeof document?document:null,xs=Ss&&Ss.createElement("template"),Cs={insert:(e,t,n)=>{t.insertBefore(e,n||null);},remove:e=>{const t=e.parentNode;t&&t.removeChild(e);},createElement:(e,t,n,o)=>{const r=t?Ss.createElementNS("http://www.w3.org/2000/svg",e):Ss.createElement(e,n?{is:n}:void 0);return "select"===e&&o&&null!=o.multiple&&r.setAttribute("multiple",o.multiple),r},createText:e=>Ss.createTextNode(e),createComment:e=>Ss.createComment(e),setText:(e,t)=>{e.nodeValue=t;},setElementText:(e,t)=>{e.textContent=t;},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>Ss.querySelector(e),setScopeId(e,t){e.setAttribute(t,"");},insertStaticContent(e,t,n,o,r,s){const i=n?n.previousSibling:t.lastChild;if(r&&(r===s||r.nextSibling))for(;t.insertBefore(r.cloneNode(!0),n),r!==s&&(r=r.nextSibling););else {xs.innerHTML=o?`<svg>${e}</svg>`:e;const r=xs.content;if(o){const e=r.firstChild;for(;e.firstChild;)r.appendChild(e.firstChild);r.removeChild(e);}t.insertBefore(r,n);}return [i?i.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},ks="transition",ws="animation",Ts=Symbol("_vtc"),Es=(e,{slots:t})=>vs(Wn,Rs(e),t);Es.displayName="Transition";const Ns={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},Os=Es.props=a({},Hn,Ns),$s=(e,t=[])=>{d(e)?e.forEach((e=>e(...t))):e&&e(...t);},Ps=e=>!!e&&(d(e)?e.some((e=>e.length>1)):e.length>1);function Rs(e){const t={};for(const a in e)a in Ns||(t[a]=e[a]);if(!1===e.css)return t;const{name:n="v",type:o,duration:r,enterFromClass:s=`${n}-enter-from`,enterActiveClass:i=`${n}-enter-active`,enterToClass:l=`${n}-enter-to`,appearFromClass:c=s,appearActiveClass:u=i,appearToClass:p=l,leaveFromClass:f=`${n}-leave-from`,leaveActiveClass:d=`${n}-leave-active`,leaveToClass:h=`${n}-leave-to`}=e,m=function(e){if(null==e)return null;if(_(e))return [As(e.enter),As(e.leave)];{const t=As(e);return [t,t]}}(r),g=m&&m[0],v=m&&m[1],{onBeforeEnter:y,onEnter:b,onEnterCancelled:S,onLeave:x,onLeaveCancelled:C,onBeforeAppear:k=y,onAppear:w=b,onAppearCancelled:T=S}=t,E=(e,t,n)=>{Ms(e,t?p:l),Ms(e,t?u:i),n&&n();},N=(e,t)=>{e._isLeaving=!1,Ms(e,f),Ms(e,h),Ms(e,d),t&&t();},O=e=>(t,n)=>{const r=e?w:b,i=()=>E(t,e,n);$s(r,[t,i]),Vs((()=>{Ms(t,e?c:s),Fs(t,e?p:l),Ps(r)||Bs(t,o,g,i);}));};return a(t,{onBeforeEnter(e){$s(y,[e]),Fs(e,s),Fs(e,i);},onBeforeAppear(e){$s(k,[e]),Fs(e,c),Fs(e,u);},onEnter:O(!1),onAppear:O(!0),onLeave(e,t){e._isLeaving=!0;const n=()=>N(e,t);Fs(e,f),Ds(),Fs(e,d),Vs((()=>{e._isLeaving&&(Ms(e,f),Fs(e,h),Ps(x)||Bs(e,o,v,n));})),$s(x,[e,n]);},onEnterCancelled(e){E(e,!1),$s(S,[e]);},onAppearCancelled(e){E(e,!0),$s(T,[e]);},onLeaveCancelled(e){N(e),$s(C,[e]);}})}function As(e){return j(e)}function Fs(e,t){t.split(/\s+/).forEach((t=>t&&e.classList.add(t))),(e[Ts]||(e[Ts]=new Set)).add(t);}function Ms(e,t){t.split(/\s+/).forEach((t=>t&&e.classList.remove(t)));const n=e[Ts];n&&(n.delete(t),n.size||(e[Ts]=void 0));}function Vs(e){requestAnimationFrame((()=>{requestAnimationFrame(e);}));}let Is=0;function Bs(e,t,n,o){const r=e._endId=++Is,s=()=>{r===e._endId&&o();};if(n)return setTimeout(s,n);const{type:i,timeout:l,propCount:c}=Ls(e,t);if(!i)return o();const a=i+"end";let u=0;const p=()=>{e.removeEventListener(a,f),s();},f=t=>{t.target===e&&++u>=c&&p();};setTimeout((()=>{u<c&&p();}),l+1),e.addEventListener(a,f);}function Ls(e,t){const n=window.getComputedStyle(e),o=e=>(n[e]||"").split(", "),r=o(`${ks}Delay`),s=o(`${ks}Duration`),i=js(r,s),l=o(`${ws}Delay`),c=o(`${ws}Duration`),a=js(l,c);let u=null,p=0,f=0;t===ks?i>0&&(u=ks,p=i,f=s.length):t===ws?a>0&&(u=ws,p=a,f=c.length):(p=Math.max(i,a),u=p>0?i>a?ks:ws:null,f=u?u===ks?s.length:c.length:0);return {type:u,timeout:p,propCount:f,hasTransform:u===ks&&/\b(transform|all)(,|$)/.test(o(`${ks}Property`).toString())}}function js(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map(((t,n)=>Us(t)+Us(e[n]))))}function Us(e){return "auto"===e?0:1e3*Number(e.slice(0,-1).replace(",","."))}function Ds(){return document.body.offsetHeight}const Hs=Symbol("_vod"),Ws={beforeMount(e,{value:t},{transition:n}){e[Hs]="none"===e.style.display?"":e.style.display,n&&t?n.beforeEnter(e):zs(e,t);},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e);},updated(e,{value:t,oldValue:n},{transition:o}){!t!=!n&&(o?t?(o.beforeEnter(e),zs(e,!0),o.enter(e)):o.leave(e,(()=>{zs(e,!1);})):zs(e,t));},beforeUnmount(e,{value:t}){zs(e,t);}};function zs(e,t){e.style.display=t?e[Hs]:"none";}const Ks=/\s*!important$/;function Gs(e,t,n){if(d(n))n.forEach((n=>Gs(e,t,n)));else if(null==n&&(n=""),t.startsWith("--"))e.setProperty(t,n);else {const o=function(e,t){const n=Js[t];if(n)return n;let o=P(t);if("filter"!==o&&o in e)return Js[t]=o;o=F(o);for(let r=0;r<qs.length;r++){const n=qs[r]+o;if(n in e)return Js[t]=n}return t}(e,t);Ks.test(n)?e.setProperty(A(o),n.replace(Ks,""),"important"):e[o]=n;}}const qs=["Webkit","Moz","ms"],Js={};const Zs="http://www.w3.org/1999/xlink";function Ys(e,t,n,o){e.addEventListener(t,n,o);}const Qs=Symbol("_vei");function Xs(e,t,n,o,r=null){const s=e[Qs]||(e[Qs]={}),i=s[t];if(o&&i)i.value=o;else {const[n,l]=function(e){let t;if(ei.test(e)){let n;for(t={};n=e.match(ei);)e=e.slice(0,e.length-n[0].length),t[n[0].toLowerCase()]=!0;}const n=":"===e[2]?e.slice(3):A(e.slice(2));return [n,t]}(t);if(o){const i=s[t]=function(e,t){const n=e=>{if(e._vts){if(e._vts<=n.attached)return}else e._vts=Date.now();jt(function(e,t){if(d(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0;},t.map((e=>t=>!t._stopped&&e&&e(t)))}return t}(e,n.value),t,5,[e]);};return n.value=e,n.attached=oi(),n}(o,r);Ys(e,n,i,l);}else i&&(!function(e,t,n,o){e.removeEventListener(t,n,o);}(e,n,i,l),s[t]=void 0);}}const ei=/(?:Once|Passive|Capture)$/;let ti=0;const ni=Promise.resolve(),oi=()=>ti||(ni.then((()=>ti=0)),ti=Date.now());const ri=/^on[a-z]/;
  /*! #__NO_SIDE_EFFECTS__ */
  function si(e,t){const n=Yn(e);class o extends li{constructor(e){super(n,e,t);}}return o.def=n,o}
  /*! #__NO_SIDE_EFFECTS__ */const ii="undefined"!=typeof HTMLElement?HTMLElement:class{};class li extends ii{constructor(e,t={},n){super(),this._def=e,this._props=t,this._instance=null,this._connected=!1,this._resolved=!1,this._numberProps=null,this._ob=null,this.shadowRoot&&n?n(this._createVNode(),this.shadowRoot):(this.attachShadow({mode:"open"}),this._def.__asyncLoader||this._resolveProps(this._def));}connectedCallback(){this._connected=!0,this._instance||(this._resolved?this._update():this._resolveDef());}disconnectedCallback(){this._connected=!1,this._ob&&(this._ob.disconnect(),this._ob=null),Yt((()=>{this._connected||(Ui(null,this.shadowRoot),this._instance=null);}));}_resolveDef(){this._resolved=!0;for(let n=0;n<this.attributes.length;n++)this._setAttr(this.attributes[n].name);this._ob=new MutationObserver((e=>{for(const t of e)this._setAttr(t.attributeName);})),this._ob.observe(this,{attributes:!0});const e=(e,t=!1)=>{const{props:n,styles:o}=e;let r;if(n&&!d(n))for(const s in n){const e=n[s];(e===Number||e&&e.type===Number)&&(s in this._props&&(this._props[s]=j(this._props[s])),(r||(r=Object.create(null)))[P(s)]=!0);}this._numberProps=r,t&&this._resolveProps(e),this._applyStyles(o),this._update();},t=this._def.__asyncLoader;t?t().then((t=>e(t,!0))):e(this._def);}_resolveProps(e){const{props:t}=e,n=d(t)?t:Object.keys(t||{});for(const o of Object.keys(this))"_"!==o[0]&&n.includes(o)&&this._setProp(o,this[o],!0,!1);for(const o of n.map(P))Object.defineProperty(this,o,{get(){return this._getProp(o)},set(e){this._setProp(o,e);}});}_setAttr(e){let t=this.getAttribute(e);const n=P(e);this._numberProps&&this._numberProps[n]&&(t=j(t)),this._setProp(n,t,!1);}_getProp(e){return this._props[e]}_setProp(e,t,n=!0,o=!0){t!==this._props[e]&&(this._props[e]=t,o&&this._instance&&this._update(),n&&(!0===t?this.setAttribute(A(e),""):"string"==typeof t||"number"==typeof t?this.setAttribute(A(e),t+""):t||this.removeAttribute(A(e))));}_update(){Ui(this._createVNode(),this.shadowRoot);}_createVNode(){const e=Wr(this._def,a({},this._props));return this._instance||(e.ce=e=>{this._instance=e,e.isCE=!0;const t=(e,t)=>{this.dispatchEvent(new CustomEvent(e,{detail:t}));};e.emit=(e,...n)=>{t(e,n),A(e)!==e&&t(A(e),n);};let n=this;for(;n=n&&(n.parentNode||n.host);)if(n instanceof li){e.parent=n._instance,e.provides=n._instance.provides;break}}),e}_applyStyles(e){e&&e.forEach((e=>{const t=document.createElement("style");t.textContent=e,this.shadowRoot.appendChild(t);}));}}function ci(e,t){if(128&e.shapeFlag){const n=e.suspense;e=n.activeBranch,n.pendingBranch&&!n.isHydrating&&n.effects.push((()=>{ci(n.activeBranch,t);}));}for(;e.component;)e=e.component.subTree;if(1&e.shapeFlag&&e.el)ai(e.el,t);else if(e.type===Tr)e.children.forEach((e=>ci(e,t)));else if(e.type===Or){let{el:n,anchor:o}=e;for(;n&&(ai(n,t),n!==o);)n=n.nextSibling;}}function ai(e,t){if(1===e.nodeType){const n=e.style;for(const e in t)n.setProperty(`--${e}`,t[e]);}}const ui=new WeakMap,pi=new WeakMap,fi=Symbol("_moveCb"),di=Symbol("_enterCb"),hi={name:"TransitionGroup",props:a({},Os,{tag:String,moveClass:String}),setup(e,{slots:t}){const n=ns(),o=Un();let r,s;return mo((()=>{if(!r.length)return;const t=e.moveClass||`${e.name||"v"}-move`;if(!function(e,t,n){const o=e.cloneNode(),r=e[Ts];r&&r.forEach((e=>{e.split(/\s+/).forEach((e=>e&&o.classList.remove(e)));}));n.split(/\s+/).forEach((e=>e&&o.classList.add(e))),o.style.display="none";const s=1===t.nodeType?t:t.parentNode;s.appendChild(o);const{hasTransform:i}=Ls(o);return s.removeChild(o),i}(r[0].el,n.vnode.el,t))return;r.forEach(gi),r.forEach(vi);const o=r.filter(yi);Ds(),o.forEach((e=>{const n=e.el,o=n.style;Fs(n,t),o.transform=o.webkitTransform=o.transitionDuration="";const r=n[fi]=e=>{e&&e.target!==n||e&&!/transform$/.test(e.propertyName)||(n.removeEventListener("transitionend",r),n[fi]=null,Ms(n,t));};n.addEventListener("transitionend",r);}));})),()=>{const i=St(e),l=Rs(i);let c=i.tag||Tr;r=s,s=t.default?Zn(t.default()):[];for(let e=0;e<s.length;e++){const t=s[e];null!=t.key&&Jn(t,Kn(t,l,o,n));}if(r)for(let e=0;e<r.length;e++){const t=r[e];Jn(t,Kn(t,l,o,n)),ui.set(t,t.el.getBoundingClientRect());}return Wr(c,null,s)}}},mi=hi;function gi(e){const t=e.el;t[fi]&&t[fi](),t[di]&&t[di]();}function vi(e){pi.set(e,e.el.getBoundingClientRect());}function yi(e){const t=ui.get(e),n=pi.get(e),o=t.left-n.left,r=t.top-n.top;if(o||r){const t=e.el.style;return t.transform=t.webkitTransform=`translate(${o}px,${r}px)`,t.transitionDuration="0s",e}}const bi=e=>{const t=e.props["onUpdate:modelValue"]||!1;return d(t)?e=>I(t,e):t};function _i(e){e.target.composing=!0;}function Si(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")));}const xi=Symbol("_assign"),Ci={created(e,{modifiers:{lazy:t,trim:n,number:o}},r){e[xi]=bi(r);const s=o||r.props&&"number"===r.props.type;Ys(e,t?"change":"input",(t=>{if(t.target.composing)return;let o=e.value;n&&(o=o.trim()),s&&(o=L(o)),e[xi](o);})),n&&Ys(e,"change",(()=>{e.value=e.value.trim();})),t||(Ys(e,"compositionstart",_i),Ys(e,"compositionend",Si),Ys(e,"change",Si));},mounted(e,{value:t}){e.value=null==t?"":t;},beforeUpdate(e,{value:t,modifiers:{lazy:n,trim:o,number:r}},s){if(e[xi]=bi(s),e.composing)return;if(document.activeElement===e&&"range"!==e.type){if(n)return;if(o&&e.value.trim()===t)return;if((r||"number"===e.type)&&L(e.value)===t)return}const i=null==t?"":t;e.value!==i&&(e.value=i);}},ki={deep:!0,created(e,t,n){e[xi]=bi(n),Ys(e,"change",(()=>{const t=e._modelValue,n=Oi(e),o=e.checked,r=e[xi];if(d(t)){const e=ne(t,n),s=-1!==e;if(o&&!s)r(t.concat(n));else if(!o&&s){const n=[...t];n.splice(e,1),r(n);}}else if(m(t)){const e=new Set(t);o?e.add(n):e.delete(n),r(e);}else r($i(e,o));}));},mounted:wi,beforeUpdate(e,t,n){e[xi]=bi(n),wi(e,t,n);}};function wi(e,{value:t,oldValue:n},o){e._modelValue=t,d(t)?e.checked=ne(t,o.props.value)>-1:m(t)?e.checked=t.has(o.props.value):t!==n&&(e.checked=te(t,$i(e,!0)));}const Ti={created(e,{value:t},n){e.checked=te(t,n.props.value),e[xi]=bi(n),Ys(e,"change",(()=>{e[xi](Oi(e));}));},beforeUpdate(e,{value:t,oldValue:n},o){e[xi]=bi(o),t!==n&&(e.checked=te(t,o.props.value));}},Ei={deep:!0,created(e,{value:t,modifiers:{number:n}},o){const r=m(t);Ys(e,"change",(()=>{const t=Array.prototype.filter.call(e.options,(e=>e.selected)).map((e=>n?L(Oi(e)):Oi(e)));e[xi](e.multiple?r?new Set(t):t:t[0]);})),e[xi]=bi(o);},mounted(e,{value:t}){Ni(e,t);},beforeUpdate(e,t,n){e[xi]=bi(n);},updated(e,{value:t}){Ni(e,t);}};function Ni(e,t){const n=e.multiple;if(!n||d(t)||m(t)){for(let o=0,r=e.options.length;o<r;o++){const r=e.options[o],s=Oi(r);if(n)r.selected=d(t)?ne(t,s)>-1:t.has(s);else if(te(Oi(r),t))return void(e.selectedIndex!==o&&(e.selectedIndex=o))}n||-1===e.selectedIndex||(e.selectedIndex=-1);}}function Oi(e){return "_value"in e?e._value:e.value}function $i(e,t){const n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}const Pi={created(e,t,n){Ri(e,t,n,null,"created");},mounted(e,t,n){Ri(e,t,n,null,"mounted");},beforeUpdate(e,t,n,o){Ri(e,t,n,o,"beforeUpdate");},updated(e,t,n,o){Ri(e,t,n,o,"updated");}};function Ri(e,t,n,o,r){const s=function(e,t){switch(e){case"SELECT":return Ei;case"TEXTAREA":return Ci;default:switch(t){case"checkbox":return ki;case"radio":return Ti;default:return Ci}}}(e.tagName,n.props&&n.props.type)[r];s&&s(e,t,n,o);}const Ai=["ctrl","shift","alt","meta"],Fi={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&0!==e.button,middle:e=>"button"in e&&1!==e.button,right:e=>"button"in e&&2!==e.button,exact:(e,t)=>Ai.some((n=>e[`${n}Key`]&&!t.includes(n)))},Mi={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},Vi=a({patchProp:(e,t,n,o,r=!1,s,i,a,u)=>{"class"===t?function(e,t,n){const o=e[Ts];o&&(t=(t?[t,...o]:[...o]).join(" ")),null==t?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t;}(e,o,r):"style"===t?function(e,t,n){const o=e.style,r=y(n);if(n&&!r){if(t&&!y(t))for(const e in t)null==n[e]&&Gs(o,e,"");for(const e in n)Gs(o,e,n[e]);}else {const s=o.display;r?t!==n&&(o.cssText=n):t&&e.removeAttribute("style"),Hs in e&&(o.display=s);}}(e,n,o):l(t)?c(t)||Xs(e,t,0,o,i):("."===t[0]?(t=t.slice(1),1):"^"===t[0]?(t=t.slice(1),0):function(e,t,n,o){if(o)return "innerHTML"===t||"textContent"===t||!!(t in e&&ri.test(t)&&v(n));if("spellcheck"===t||"draggable"===t||"translate"===t)return !1;if("form"===t)return !1;if("list"===t&&"INPUT"===e.tagName)return !1;if("type"===t&&"TEXTAREA"===e.tagName)return !1;if(ri.test(t)&&y(n))return !1;return t in e}(e,t,o,r))?function(e,t,n,o,r,s,i){if("innerHTML"===t||"textContent"===t)return o&&i(o,r,s),void(e[t]=null==n?"":n);const l=e.tagName;if("value"===t&&"PROGRESS"!==l&&!l.includes("-")){e._value=n;const o=null==n?"":n;return ("OPTION"===l?e.getAttribute("value"):e.value)!==o&&(e.value=o),void(null==n&&e.removeAttribute(t))}let c=!1;if(""===n||null==n){const o=typeof e[t];"boolean"===o?n=ee(n):null==n&&"string"===o?(n="",c=!0):"number"===o&&(n=0,c=!0);}try{e[t]=n;}catch(a){}c&&e.removeAttribute(t);}(e,t,o,s,i,a,u):("true-value"===t?e._trueValue=o:"false-value"===t&&(e._falseValue=o),function(e,t,n,o,r){if(o&&t.startsWith("xlink:"))null==n?e.removeAttributeNS(Zs,t.slice(6,t.length)):e.setAttributeNS(Zs,t,n);else {const o=X(t);null==n||o&&!ee(n)?e.removeAttribute(t):e.setAttribute(t,o?"":n);}}(e,t,o,r));}},Cs);let Ii,Bi=!1;function Li(){return Ii||(Ii=hr(Vi))}function ji(){return Ii=Bi?Ii:mr(Vi),Bi=!0,Ii}const Ui=(...e)=>{Li().render(...e);},Di=(...e)=>{ji().hydrate(...e);};function Hi(e){if(y(e)){return document.querySelector(e)}return e}const Wi=r;function zi(e){throw e}function Ki(e){}function Gi(e,t,n,o){const r=new SyntaxError(String(e));return r.code=e,r.loc=t,r}const qi=Symbol(""),Ji=Symbol(""),Zi=Symbol(""),Yi=Symbol(""),Qi=Symbol(""),Xi=Symbol(""),el=Symbol(""),tl=Symbol(""),nl=Symbol(""),ol=Symbol(""),rl=Symbol(""),sl=Symbol(""),il=Symbol(""),ll=Symbol(""),cl=Symbol(""),al=Symbol(""),ul=Symbol(""),pl=Symbol(""),fl=Symbol(""),dl=Symbol(""),hl=Symbol(""),ml=Symbol(""),gl=Symbol(""),vl=Symbol(""),yl=Symbol(""),bl=Symbol(""),_l=Symbol(""),Sl=Symbol(""),xl=Symbol(""),Cl=Symbol(""),kl=Symbol(""),wl=Symbol(""),Tl=Symbol(""),El=Symbol(""),Nl=Symbol(""),Ol=Symbol(""),$l=Symbol(""),Pl=Symbol(""),Rl=Symbol(""),Al={[qi]:"Fragment",[Ji]:"Teleport",[Zi]:"Suspense",[Yi]:"KeepAlive",[Qi]:"BaseTransition",[Xi]:"openBlock",[el]:"createBlock",[tl]:"createElementBlock",[nl]:"createVNode",[ol]:"createElementVNode",[rl]:"createCommentVNode",[sl]:"createTextVNode",[il]:"createStaticVNode",[ll]:"resolveComponent",[cl]:"resolveDynamicComponent",[al]:"resolveDirective",[ul]:"resolveFilter",[pl]:"withDirectives",[fl]:"renderList",[dl]:"renderSlot",[hl]:"createSlots",[ml]:"toDisplayString",[gl]:"mergeProps",[vl]:"normalizeClass",[yl]:"normalizeStyle",[bl]:"normalizeProps",[_l]:"guardReactiveProps",[Sl]:"toHandlers",[xl]:"camelize",[Cl]:"capitalize",[kl]:"toHandlerKey",[wl]:"setBlockTracking",[Tl]:"pushScopeId",[El]:"popScopeId",[Nl]:"withCtx",[Ol]:"unref",[$l]:"isRef",[Pl]:"withMemo",[Rl]:"isMemoSame"};const Fl={source:"",start:{line:1,column:1,offset:0},end:{line:1,column:1,offset:0}};function Ml(e,t,n,o,r,s,i,l=!1,c=!1,a=!1,u=Fl){return e&&(l?(e.helper(Xi),e.helper(zl(e.inSSR,a))):e.helper(Wl(e.inSSR,a)),i&&e.helper(pl)),{type:13,tag:t,props:n,children:o,patchFlag:r,dynamicProps:s,directives:i,isBlock:l,disableTracking:c,isComponent:a,loc:u}}function Vl(e,t=Fl){return {type:17,loc:t,elements:e}}function Il(e,t=Fl){return {type:15,loc:t,properties:e}}function Bl(e,t){return {type:16,loc:Fl,key:y(e)?Ll(e,!0):e,value:t}}function Ll(e,t=!1,n=Fl,o=0){return {type:4,loc:n,content:e,isStatic:t,constType:t?3:o}}function jl(e,t=Fl){return {type:8,loc:t,children:e}}function Ul(e,t=[],n=Fl){return {type:14,loc:n,callee:e,arguments:t}}function Dl(e,t=void 0,n=!1,o=!1,r=Fl){return {type:18,params:e,returns:t,newline:n,isSlot:o,loc:r}}function Hl(e,t,n,o=!0){return {type:19,test:e,consequent:t,alternate:n,newline:o,loc:Fl}}function Wl(e,t){return e||t?nl:ol}function zl(e,t){return e||t?el:tl}function Kl(e,{helper:t,removeHelper:n,inSSR:o}){e.isBlock||(e.isBlock=!0,n(Wl(o,e.isComponent)),t(Xi),t(zl(o,e.isComponent)));}const Gl=e=>4===e.type&&e.isStatic,ql=(e,t)=>e===t||e===A(t);function Jl(e){return ql(e,"Teleport")?Ji:ql(e,"Suspense")?Zi:ql(e,"KeepAlive")?Yi:ql(e,"BaseTransition")?Qi:void 0}const Zl=/^\d|[^\$\w]/,Yl=e=>!Zl.test(e),Ql=/[A-Za-z_$\xA0-\uFFFF]/,Xl=/[\.\?\w$\xA0-\uFFFF]/,ec=/\s+[.[]\s*|\s*[.[]\s+/g,tc=e=>{e=e.trim().replace(ec,(e=>e.trim()));let t=0,n=[],o=0,r=0,s=null;for(let i=0;i<e.length;i++){const l=e.charAt(i);switch(t){case 0:if("["===l)n.push(t),t=1,o++;else if("("===l)n.push(t),t=2,r++;else if(!(0===i?Ql:Xl).test(l))return !1;break;case 1:"'"===l||'"'===l||"`"===l?(n.push(t),t=3,s=l):"["===l?o++:"]"===l&&(--o||(t=n.pop()));break;case 2:if("'"===l||'"'===l||"`"===l)n.push(t),t=3,s=l;else if("("===l)r++;else if(")"===l){if(i===e.length-1)return !1;--r||(t=n.pop());}break;case 3:l===s&&(t=n.pop(),s=null);}}return !o&&!r};function nc(e,t,n){const o={source:e.source.slice(t,t+n),start:oc(e.start,e.source,t),end:e.end};return null!=n&&(o.end=oc(e.start,e.source,t+n)),o}function oc(e,t,n=t.length){return rc(a({},e),t,n)}function rc(e,t,n=t.length){let o=0,r=-1;for(let s=0;s<n;s++)10===t.charCodeAt(s)&&(o++,r=s);return e.offset+=n,e.line+=o,e.column=-1===r?e.column+n:n-r,e}function sc(e,t,n=!1){for(let o=0;o<e.props.length;o++){const r=e.props[o];if(7===r.type&&(n||r.exp)&&(y(t)?r.name===t:t.test(r.name)))return r}}function ic(e,t,n=!1,o=!1){for(let r=0;r<e.props.length;r++){const s=e.props[r];if(6===s.type){if(n)continue;if(s.name===t&&(s.value||o))return s}else if("bind"===s.name&&(s.exp||o)&&lc(s.arg,t))return s}}function lc(e,t){return !(!e||!Gl(e)||e.content!==t)}function cc(e){return 5===e.type||2===e.type}function ac(e){return 7===e.type&&"slot"===e.name}function uc(e){return 1===e.type&&3===e.tagType}function pc(e){return 1===e.type&&2===e.tagType}const fc=new Set([bl,_l]);function dc(e,t=[]){if(e&&!y(e)&&14===e.type){const n=e.callee;if(!y(n)&&fc.has(n))return dc(e.arguments[0],t.concat(e))}return [e,t]}function hc(e,t,n){let o,r,s=13===e.type?e.props:e.arguments[2],i=[];if(s&&!y(s)&&14===s.type){const e=dc(s);s=e[0],i=e[1],r=i[i.length-1];}if(null==s||y(s))o=Il([t]);else if(14===s.type){const e=s.arguments[0];y(e)||15!==e.type?s.callee===Sl?o=Ul(n.helper(gl),[Il([t]),s]):s.arguments.unshift(Il([t])):mc(t,e)||e.properties.unshift(t),!o&&(o=s);}else 15===s.type?(mc(t,s)||s.properties.unshift(t),o=s):(o=Ul(n.helper(gl),[Il([t]),s]),r&&r.callee===_l&&(r=i[i.length-2]));13===e.type?r?r.arguments[0]=o:e.props=o:r?r.arguments[0]=o:e.arguments[2]=o;}function mc(e,t){let n=!1;if(4===e.key.type){const o=e.key.content;n=t.properties.some((e=>4===e.key.type&&e.key.content===o));}return n}function gc(e,t){return `_${t}_${e.replace(/[^\w]/g,((t,n)=>"-"===t?"_":e.charCodeAt(n).toString()))}`}const vc=/&(gt|lt|amp|apos|quot);/g,yc={gt:">",lt:"<",amp:"&",apos:"'",quot:'"'},bc={delimiters:["{{","}}"],getNamespace:()=>0,getTextMode:()=>0,isVoidTag:s,isPreTag:s,isCustomElement:s,decodeEntities:e=>e.replace(vc,((e,t)=>yc[t])),onError:zi,onWarn:Ki,comments:!1};function _c(e,t={}){const n=function(e,t){const n=a({},bc);let o;for(o in t)n[o]=void 0===t[o]?bc[o]:t[o];return {options:n,column:1,line:1,offset:0,originalSource:e,source:e,inPre:!1,inVPre:!1,onWarn:n.onWarn}}(e,t),o=Fc(n);return function(e,t=Fl){return {type:0,children:e,helpers:new Set,components:[],directives:[],hoists:[],imports:[],cached:0,temps:0,codegenNode:void 0,loc:t}}(Sc(n,0,[]),Mc(n,o))}function Sc(e,t,n){const o=Vc(n),r=o?o.ns:0,s=[];for(;!Dc(e,t,n);){const i=e.source;let l;if(0===t||1===t)if(!e.inVPre&&Ic(i,e.options.delimiters[0]))l=Pc(e,t);else if(0===t&&"<"===i[0])if(1===i.length);else if("!"===i[1])l=Ic(i,"\x3c!--")?kc(e):Ic(i,"<!DOCTYPE")?wc(e):Ic(i,"<![CDATA[")&&0!==r?Cc(e,n):wc(e);else if("/"===i[1])if(2===i.length);else {if(">"===i[2]){Bc(e,3);continue}if(/[a-z]/i.test(i[2])){Nc(e,1,o);continue}Uc(e,12,2),l=wc(e);}else /[a-z]/i.test(i[1])?l=Tc(e,n):"?"===i[1]&&(Uc(e,21,1),l=wc(e));if(l||(l=Rc(e,t)),d(l))for(let e=0;e<l.length;e++)xc(s,l[e]);else xc(s,l);}let i=!1;if(2!==t&&1!==t){const t="preserve"!==e.options.whitespace;for(let n=0;n<s.length;n++){const o=s[n];if(2===o.type)if(e.inPre)o.content=o.content.replace(/\r\n/g,"\n");else if(/[^\t\r\n\f ]/.test(o.content))t&&(o.content=o.content.replace(/[\t\r\n\f ]+/g," "));else {const e=s[n-1],r=s[n+1];!e||!r||t&&(3===e.type&&3===r.type||3===e.type&&1===r.type||1===e.type&&3===r.type||1===e.type&&1===r.type&&/[\r\n]/.test(o.content))?(i=!0,s[n]=null):o.content=" ";}else 3!==o.type||e.options.comments||(i=!0,s[n]=null);}if(e.inPre&&o&&e.options.isPreTag(o.tag)){const e=s[0];e&&2===e.type&&(e.content=e.content.replace(/^\r?\n/,""));}}return i?s.filter(Boolean):s}function xc(e,t){if(2===t.type){const n=Vc(e);if(n&&2===n.type&&n.loc.end.offset===t.loc.start.offset)return n.content+=t.content,n.loc.end=t.loc.end,void(n.loc.source+=t.loc.source)}e.push(t);}function Cc(e,t){Bc(e,9);const n=Sc(e,3,t);return 0===e.source.length||Bc(e,3),n}function kc(e){const t=Fc(e);let n;const o=/--(\!)?>/.exec(e.source);if(o){n=e.source.slice(4,o.index);const t=e.source.slice(0,o.index);let r=1,s=0;for(;-1!==(s=t.indexOf("\x3c!--",r));)Bc(e,s-r+1),r=s+1;Bc(e,o.index+o[0].length-r+1);}else n=e.source.slice(4),Bc(e,e.source.length);return {type:3,content:n,loc:Mc(e,t)}}function wc(e){const t=Fc(e),n="?"===e.source[1]?1:2;let o;const r=e.source.indexOf(">");return -1===r?(o=e.source.slice(n),Bc(e,e.source.length)):(o=e.source.slice(n,r),Bc(e,r+1)),{type:3,content:o,loc:Mc(e,t)}}function Tc(e,t){const n=e.inPre,o=e.inVPre,r=Vc(t),s=Nc(e,0,r),i=e.inPre&&!n,l=e.inVPre&&!o;if(s.isSelfClosing||e.options.isVoidTag(s.tag))return i&&(e.inPre=!1),l&&(e.inVPre=!1),s;t.push(s);const c=e.options.getTextMode(s,r),a=Sc(e,c,t);if(t.pop(),s.children=a,Hc(e.source,s.tag))Nc(e,1,r);else if(0===e.source.length&&"script"===s.tag.toLowerCase()){const e=a[0];e&&Ic(e.loc.source,"\x3c!--");}return s.loc=Mc(e,s.loc.start),i&&(e.inPre=!1),l&&(e.inVPre=!1),s}const Ec=t("if,else,else-if,for,slot");function Nc(e,t,n){const o=Fc(e),r=/^<\/?([a-z][^\t\r\n\f />]*)/i.exec(e.source),s=r[1],i=e.options.getNamespace(s,n);Bc(e,r[0].length),Lc(e);const l=Fc(e),c=e.source;e.options.isPreTag(s)&&(e.inPre=!0);let u=Oc(e,t);0===t&&!e.inVPre&&u.some((e=>7===e.type&&"pre"===e.name))&&(e.inVPre=!0,a(e,l),e.source=c,u=Oc(e,t).filter((e=>"v-pre"!==e.name)));let p=!1;if(0===e.source.length||(p=Ic(e.source,"/>"),Bc(e,p?2:1)),1===t)return;let f=0;return e.inVPre||("slot"===s?f=2:"template"===s?u.some((e=>7===e.type&&Ec(e.name)))&&(f=3):function(e,t,n){const o=n.options;if(o.isCustomElement(e))return !1;if("component"===e||/^[A-Z]/.test(e)||Jl(e)||o.isBuiltInComponent&&o.isBuiltInComponent(e)||o.isNativeTag&&!o.isNativeTag(e))return !0;for(let r=0;r<t.length;r++){const e=t[r];if(6===e.type){if("is"===e.name&&e.value&&e.value.content.startsWith("vue:"))return !0}else {if("is"===e.name)return !0;"bind"===e.name&&lc(e.arg,"is");}}}(s,u,e)&&(f=1)),{type:1,ns:i,tag:s,tagType:f,props:u,isSelfClosing:p,children:[],loc:Mc(e,o),codegenNode:void 0}}function Oc(e,t){const n=[],o=new Set;for(;e.source.length>0&&!Ic(e.source,">")&&!Ic(e.source,"/>");){if(Ic(e.source,"/")){Bc(e,1),Lc(e);continue}const r=$c(e,o);6===r.type&&r.value&&"class"===r.name&&(r.value.content=r.value.content.replace(/\s+/g," ").trim()),0===t&&n.push(r),/^[^\t\r\n\f />]/.test(e.source),Lc(e);}return n}function $c(e,t){var n;const o=Fc(e),r=/^[^\t\r\n\f />][^\t\r\n\f />=]*/.exec(e.source)[0];t.has(r),t.add(r);{const t=/["'<]/g;let n;for(;n=t.exec(r);)Uc(e,17,n.index);}let s;Bc(e,r.length),/^[\t\r\n\f ]*=/.test(e.source)&&(Lc(e),Bc(e,1),Lc(e),s=function(e){const t=Fc(e);let n;const o=e.source[0],r='"'===o||"'"===o;if(r){Bc(e,1);const t=e.source.indexOf(o);-1===t?n=Ac(e,e.source.length,4):(n=Ac(e,t,4),Bc(e,1));}else {const t=/^[^\t\r\n\f >]+/.exec(e.source);if(!t)return;const o=/["'<=`]/g;let r;for(;r=o.exec(t[0]);)Uc(e,18,r.index);n=Ac(e,t[0].length,4);}return {content:n,isQuoted:r,loc:Mc(e,t)}}(e));const i=Mc(e,o);if(!e.inVPre&&/^(v-[A-Za-z0-9-]|:|\.|@|#)/.test(r)){const t=/(?:^v-([a-z0-9-]+))?(?:(?::|^\.|^@|^#)(\[[^\]]+\]|[^\.]+))?(.+)?$/i.exec(r);let l,c=Ic(r,"."),a=t[1]||(c||Ic(r,":")?"bind":Ic(r,"@")?"on":"slot");if(t[2]){const s="slot"===a,i=r.lastIndexOf(t[2],r.length-((null==(n=t[3])?void 0:n.length)||0)),c=Mc(e,jc(e,o,i),jc(e,o,i+t[2].length+(s&&t[3]||"").length));let u=t[2],p=!0;u.startsWith("[")?(p=!1,u.endsWith("]")?u=u.slice(1,u.length-1):(Uc(e,27),u=u.slice(1))):s&&(u+=t[3]||""),l={type:4,content:u,isStatic:p,constType:p?3:0,loc:c};}if(s&&s.isQuoted){const e=s.loc;e.start.offset++,e.start.column++,e.end=oc(e.start,s.content),e.source=e.source.slice(1,-1);}const u=t[3]?t[3].slice(1).split("."):[];return c&&u.push("prop"),{type:7,name:a,exp:s&&{type:4,content:s.content,isStatic:!1,constType:0,loc:s.loc},arg:l,modifiers:u,loc:i}}return !e.inVPre&&Ic(r,"v-"),{type:6,name:r,value:s&&{type:2,content:s.content,loc:s.loc},loc:i}}function Pc(e,t){const[n,o]=e.options.delimiters,r=e.source.indexOf(o,n.length);if(-1===r)return;const s=Fc(e);Bc(e,n.length);const i=Fc(e),l=Fc(e),c=r-n.length,a=e.source.slice(0,c),u=Ac(e,c,t),p=u.trim(),f=u.indexOf(p);f>0&&rc(i,a,f);return rc(l,a,c-(u.length-p.length-f)),Bc(e,o.length),{type:5,content:{type:4,isStatic:!1,constType:0,content:p,loc:Mc(e,i,l)},loc:Mc(e,s)}}function Rc(e,t){const n=3===t?["]]>"]:["<",e.options.delimiters[0]];let o=e.source.length;for(let s=0;s<n.length;s++){const t=e.source.indexOf(n[s],1);-1!==t&&o>t&&(o=t);}const r=Fc(e);return {type:2,content:Ac(e,o,t),loc:Mc(e,r)}}function Ac(e,t,n){const o=e.source.slice(0,t);return Bc(e,t),2!==n&&3!==n&&o.includes("&")?e.options.decodeEntities(o,4===n):o}function Fc(e){const{column:t,line:n,offset:o}=e;return {column:t,line:n,offset:o}}function Mc(e,t,n){return {start:t,end:n=n||Fc(e),source:e.originalSource.slice(t.offset,n.offset)}}function Vc(e){return e[e.length-1]}function Ic(e,t){return e.startsWith(t)}function Bc(e,t){const{source:n}=e;rc(e,n,t),e.source=n.slice(t);}function Lc(e){const t=/^[\t\r\n\f ]+/.exec(e.source);t&&Bc(e,t[0].length);}function jc(e,t,n){return oc(t,e.originalSource.slice(t.offset,n),n)}function Uc(e,t,n,o=Fc(e)){n&&(o.offset+=n,o.column+=n),e.options.onError(Gi(t,{start:o,end:o,source:""}));}function Dc(e,t,n){const o=e.source;switch(t){case 0:if(Ic(o,"</"))for(let e=n.length-1;e>=0;--e)if(Hc(o,n[e].tag))return !0;break;case 1:case 2:{const e=Vc(n);if(e&&Hc(o,e.tag))return !0;break}case 3:if(Ic(o,"]]>"))return !0}return !o}function Hc(e,t){return Ic(e,"</")&&e.slice(2,2+t.length).toLowerCase()===t.toLowerCase()&&/[\t\r\n\f />]/.test(e[2+t.length]||">")}function Wc(e,t){Kc(e,t,zc(e,e.children[0]));}function zc(e,t){const{children:n}=e;return 1===n.length&&1===t.type&&!pc(t)}function Kc(e,t,n=!1){const{children:o}=e,r=o.length;let s=0;for(let i=0;i<o.length;i++){const e=o[i];if(1===e.type&&0===e.tagType){const o=n?0:Gc(e,t);if(o>0){if(o>=2){e.codegenNode.patchFlag="-1",e.codegenNode=t.hoist(e.codegenNode),s++;continue}}else {const n=e.codegenNode;if(13===n.type){const o=Qc(n);if((!o||512===o||1===o)&&Zc(e,t)>=2){const o=Yc(e);o&&(n.props=t.hoist(o));}n.dynamicProps&&(n.dynamicProps=t.hoist(n.dynamicProps));}}}if(1===e.type){const n=1===e.tagType;n&&t.scopes.vSlot++,Kc(e,t),n&&t.scopes.vSlot--;}else if(11===e.type)Kc(e,t,1===e.children.length);else if(9===e.type)for(let n=0;n<e.branches.length;n++)Kc(e.branches[n],t,1===e.branches[n].children.length);}if(s&&t.transformHoist&&t.transformHoist(o,t,e),s&&s===r&&1===e.type&&0===e.tagType&&e.codegenNode&&13===e.codegenNode.type&&d(e.codegenNode.children)){const n=t.hoist(Vl(e.codegenNode.children));t.hmr&&(n.content=`[...${n.content}]`),e.codegenNode.children=n;}}function Gc(e,t){const{constantCache:n}=t;switch(e.type){case 1:if(0!==e.tagType)return 0;const o=n.get(e);if(void 0!==o)return o;const r=e.codegenNode;if(13!==r.type)return 0;if(r.isBlock&&"svg"!==e.tag&&"foreignObject"!==e.tag)return 0;if(Qc(r))return n.set(e,0),0;{let o=3;const s=Zc(e,t);if(0===s)return n.set(e,0),0;s<o&&(o=s);for(let r=0;r<e.children.length;r++){const s=Gc(e.children[r],t);if(0===s)return n.set(e,0),0;s<o&&(o=s);}if(o>1)for(let r=0;r<e.props.length;r++){const s=e.props[r];if(7===s.type&&"bind"===s.name&&s.exp){const r=Gc(s.exp,t);if(0===r)return n.set(e,0),0;r<o&&(o=r);}}if(r.isBlock){for(let t=0;t<e.props.length;t++){if(7===e.props[t].type)return n.set(e,0),0}t.removeHelper(Xi),t.removeHelper(zl(t.inSSR,r.isComponent)),r.isBlock=!1,t.helper(Wl(t.inSSR,r.isComponent));}return n.set(e,o),o}case 2:case 3:return 3;case 9:case 11:case 10:default:return 0;case 5:case 12:return Gc(e.content,t);case 4:return e.constType;case 8:let s=3;for(let n=0;n<e.children.length;n++){const o=e.children[n];if(y(o)||b(o))continue;const r=Gc(o,t);if(0===r)return 0;r<s&&(s=r);}return s}}const qc=new Set([vl,yl,bl,_l]);function Jc(e,t){if(14===e.type&&!y(e.callee)&&qc.has(e.callee)){const n=e.arguments[0];if(4===n.type)return Gc(n,t);if(14===n.type)return Jc(n,t)}return 0}function Zc(e,t){let n=3;const o=Yc(e);if(o&&15===o.type){const{properties:e}=o;for(let o=0;o<e.length;o++){const{key:r,value:s}=e[o],i=Gc(r,t);if(0===i)return i;let l;if(i<n&&(n=i),l=4===s.type?Gc(s,t):14===s.type?Jc(s,t):0,0===l)return l;l<n&&(n=l);}}return n}function Yc(e){const t=e.codegenNode;if(13===t.type)return t.props}function Qc(e){const t=e.patchFlag;return t?parseInt(t,10):void 0}function Xc(e,{filename:t="",prefixIdentifiers:o=!1,hoistStatic:s=!1,hmr:i=!1,cacheHandlers:l=!1,nodeTransforms:c=[],directiveTransforms:a={},transformHoist:u=null,isBuiltInComponent:p=r,isCustomElement:f=r,expressionPlugins:d=[],scopeId:h=null,slotted:m=!0,ssr:g=!1,inSSR:v=!1,ssrCssVars:b="",bindingMetadata:_=n,inline:S=!1,isTS:x=!1,onError:C=zi,onWarn:k=Ki,compatConfig:w}){const T=t.replace(/\?.*$/,"").match(/([^/\\]+)\.\w+$/),E={selfName:T&&F(P(T[1])),prefixIdentifiers:o,hoistStatic:s,hmr:i,cacheHandlers:l,nodeTransforms:c,directiveTransforms:a,transformHoist:u,isBuiltInComponent:p,isCustomElement:f,expressionPlugins:d,scopeId:h,slotted:m,ssr:g,inSSR:v,ssrCssVars:b,bindingMetadata:_,inline:S,isTS:x,onError:C,onWarn:k,compatConfig:w,root:e,helpers:new Map,components:new Set,directives:new Set,hoists:[],imports:[],constantCache:new WeakMap,temps:0,cached:0,identifiers:Object.create(null),scopes:{vFor:0,vSlot:0,vPre:0,vOnce:0},parent:null,currentNode:e,childIndex:0,inVOnce:!1,helper(e){const t=E.helpers.get(e)||0;return E.helpers.set(e,t+1),e},removeHelper(e){const t=E.helpers.get(e);if(t){const n=t-1;n?E.helpers.set(e,n):E.helpers.delete(e);}},helperString:e=>`_${Al[E.helper(e)]}`,replaceNode(e){E.parent.children[E.childIndex]=E.currentNode=e;},removeNode(e){const t=e?E.parent.children.indexOf(e):E.currentNode?E.childIndex:-1;e&&e!==E.currentNode?E.childIndex>t&&(E.childIndex--,E.onNodeRemoved()):(E.currentNode=null,E.onNodeRemoved()),E.parent.children.splice(t,1);},onNodeRemoved:()=>{},addIdentifiers(e){},removeIdentifiers(e){},hoist(e){y(e)&&(e=Ll(e)),E.hoists.push(e);const t=Ll(`_hoisted_${E.hoists.length}`,!1,e.loc,2);return t.hoisted=e,t},cache:(e,t=!1)=>function(e,t,n=!1){return {type:20,index:e,value:t,isVNode:n,loc:Fl}}(E.cached++,e,t)};return E}function ea(e,t){const n=Xc(e,t);ta(e,n),t.hoistStatic&&Wc(e,n),t.ssr||function(e,t){const{helper:n}=t,{children:o}=e;if(1===o.length){const n=o[0];if(zc(e,n)&&n.codegenNode){const o=n.codegenNode;13===o.type&&Kl(o,t),e.codegenNode=o;}else e.codegenNode=n;}else if(o.length>1){let o=64;e.codegenNode=Ml(t,n(qi),void 0,e.children,o+"",void 0,void 0,!0,void 0,!1);}}(e,n),e.helpers=new Set([...n.helpers.keys()]),e.components=[...n.components],e.directives=[...n.directives],e.imports=n.imports,e.hoists=n.hoists,e.temps=n.temps,e.cached=n.cached;}function ta(e,t){t.currentNode=e;const{nodeTransforms:n}=t,o=[];for(let s=0;s<n.length;s++){const r=n[s](e,t);if(r&&(d(r)?o.push(...r):o.push(r)),!t.currentNode)return;e=t.currentNode;}switch(e.type){case 3:t.ssr||t.helper(rl);break;case 5:t.ssr||t.helper(ml);break;case 9:for(let n=0;n<e.branches.length;n++)ta(e.branches[n],t);break;case 10:case 11:case 1:case 0:!function(e,t){let n=0;const o=()=>{n--;};for(;n<e.children.length;n++){const r=e.children[n];y(r)||(t.parent=e,t.childIndex=n,t.onNodeRemoved=o,ta(r,t));}}(e,t);}t.currentNode=e;let r=o.length;for(;r--;)o[r]();}function na(e,t){const n=y(e)?t=>t===e:t=>e.test(t);return (e,o)=>{if(1===e.type){const{props:r}=e;if(3===e.tagType&&r.some(ac))return;const s=[];for(let i=0;i<r.length;i++){const l=r[i];if(7===l.type&&n(l.name)){r.splice(i,1),i--;const n=t(e,l,o);n&&s.push(n);}}return s}}}const oa="/*#__PURE__*/",ra=e=>`${Al[e]}: _${Al[e]}`;function sa(e,{mode:t="function",prefixIdentifiers:n="module"===t,sourceMap:o=!1,filename:r="template.vue.html",scopeId:s=null,optimizeImports:i=!1,runtimeGlobalName:l="Vue",runtimeModuleName:c="vue",ssrRuntimeModuleName:a="vue/server-renderer",ssr:u=!1,isTS:p=!1,inSSR:f=!1}){const d={mode:t,prefixIdentifiers:n,sourceMap:o,filename:r,scopeId:s,optimizeImports:i,runtimeGlobalName:l,runtimeModuleName:c,ssrRuntimeModuleName:a,ssr:u,isTS:p,inSSR:f,source:e.loc.source,code:"",column:1,line:1,offset:0,indentLevel:0,pure:!1,map:void 0,helper:e=>`_${Al[e]}`,push(e,t){d.code+=e;},indent(){h(++d.indentLevel);},deindent(e=!1){e?--d.indentLevel:h(--d.indentLevel);},newline(){h(d.indentLevel);}};function h(e){d.push("\n"+"  ".repeat(e));}return d}function ia(e,t={}){const n=sa(e,t);t.onContextCreated&&t.onContextCreated(n);const{mode:o,push:r,prefixIdentifiers:s,indent:i,deindent:l,newline:c,ssr:a}=n,u=Array.from(e.helpers),p=u.length>0,f=!s&&"module"!==o,d=n;!function(e,t){const{push:n,newline:o,runtimeGlobalName:r}=t,s=r,i=Array.from(e.helpers);if(i.length>0&&(n(`const _Vue = ${s}\n`),e.hoists.length)){n(`const { ${[nl,ol,rl,sl,il].filter((e=>i.includes(e))).map(ra).join(", ")} } = _Vue\n`);}(function(e,t){if(!e.length)return;t.pure=!0;const{push:n,newline:o}=t;o();for(let r=0;r<e.length;r++){const s=e[r];s&&(n(`const _hoisted_${r+1} = `),ua(s,t),o());}t.pure=!1;})(e.hoists,t),o(),n("return ");}(e,d);if(r(`function ${a?"ssrRender":"render"}(${(a?["_ctx","_push","_parent","_attrs"]:["_ctx","_cache"]).join(", ")}) {`),i(),f&&(r("with (_ctx) {"),i(),p&&(r(`const { ${u.map(ra).join(", ")} } = _Vue`),r("\n"),c())),e.components.length&&(la(e.components,"component",n),(e.directives.length||e.temps>0)&&c()),e.directives.length&&(la(e.directives,"directive",n),e.temps>0&&c()),e.temps>0){r("let ");for(let t=0;t<e.temps;t++)r(`${t>0?", ":""}_temp${t}`);}return (e.components.length||e.directives.length||e.temps)&&(r("\n"),c()),a||r("return "),e.codegenNode?ua(e.codegenNode,n):r("null"),f&&(l(),r("}")),l(),r("}"),{ast:e,code:n.code,preamble:"",map:n.map?n.map.toJSON():void 0}}function la(e,t,{helper:n,push:o,newline:r,isTS:s}){const i=n("component"===t?ll:al);for(let l=0;l<e.length;l++){let n=e[l];const c=n.endsWith("__self");c&&(n=n.slice(0,-6)),o(`const ${gc(n,t)} = ${i}(${JSON.stringify(n)}${c?", true":""})${s?"!":""}`),l<e.length-1&&r();}}function ca(e,t){const n=e.length>3||!1;t.push("["),n&&t.indent(),aa(e,t,n),n&&t.deindent(),t.push("]");}function aa(e,t,n=!1,o=!0){const{push:r,newline:s}=t;for(let i=0;i<e.length;i++){const l=e[i];y(l)?r(l):d(l)?ca(l,t):ua(l,t),i<e.length-1&&(n?(o&&r(","),s()):o&&r(", "));}}function ua(e,t){if(y(e))t.push(e);else if(b(e))t.push(t.helper(e));else switch(e.type){case 1:case 9:case 11:case 12:ua(e.codegenNode,t);break;case 2:!function(e,t){t.push(JSON.stringify(e.content),e);}(e,t);break;case 4:pa(e,t);break;case 5:!function(e,t){const{push:n,helper:o,pure:r}=t;r&&n(oa);n(`${o(ml)}(`),ua(e.content,t),n(")");}(e,t);break;case 8:fa(e,t);break;case 3:!function(e,t){const{push:n,helper:o,pure:r}=t;r&&n(oa);n(`${o(rl)}(${JSON.stringify(e.content)})`,e);}(e,t);break;case 13:!function(e,t){const{push:n,helper:o,pure:r}=t,{tag:s,props:i,children:l,patchFlag:c,dynamicProps:a,directives:u,isBlock:p,disableTracking:f,isComponent:d}=e;u&&n(o(pl)+"(");p&&n(`(${o(Xi)}(${f?"true":""}), `);r&&n(oa);const h=p?zl(t.inSSR,d):Wl(t.inSSR,d);n(o(h)+"(",e),aa(function(e){let t=e.length;for(;t--&&null==e[t];);return e.slice(0,t+1).map((e=>e||"null"))}([s,i,l,c,a]),t),n(")"),p&&n(")");u&&(n(", "),ua(u,t),n(")"));}(e,t);break;case 14:!function(e,t){const{push:n,helper:o,pure:r}=t,s=y(e.callee)?e.callee:o(e.callee);r&&n(oa);n(s+"(",e),aa(e.arguments,t),n(")");}(e,t);break;case 15:!function(e,t){const{push:n,indent:o,deindent:r,newline:s}=t,{properties:i}=e;if(!i.length)return void n("{}",e);const l=i.length>1||!1;n(l?"{":"{ "),l&&o();for(let c=0;c<i.length;c++){const{key:e,value:o}=i[c];da(e,t),n(": "),ua(o,t),c<i.length-1&&(n(","),s());}l&&r(),n(l?"}":" }");}(e,t);break;case 17:!function(e,t){ca(e.elements,t);}(e,t);break;case 18:!function(e,t){const{push:n,indent:o,deindent:r}=t,{params:s,returns:i,body:l,newline:c,isSlot:a}=e;a&&n(`_${Al[Nl]}(`);n("(",e),d(s)?aa(s,t):s&&ua(s,t);n(") => "),(c||l)&&(n("{"),o());i?(c&&n("return "),d(i)?ca(i,t):ua(i,t)):l&&ua(l,t);(c||l)&&(r(),n("}"));a&&n(")");}(e,t);break;case 19:!function(e,t){const{test:n,consequent:o,alternate:r,newline:s}=e,{push:i,indent:l,deindent:c,newline:a}=t;if(4===n.type){const e=!Yl(n.content);e&&i("("),pa(n,t),e&&i(")");}else i("("),ua(n,t),i(")");s&&l(),t.indentLevel++,s||i(" "),i("? "),ua(o,t),t.indentLevel--,s&&a(),s||i(" "),i(": ");const u=19===r.type;u||t.indentLevel++;ua(r,t),u||t.indentLevel--;s&&c(!0);}(e,t);break;case 20:!function(e,t){const{push:n,helper:o,indent:r,deindent:s,newline:i}=t;n(`_cache[${e.index}] || (`),e.isVNode&&(r(),n(`${o(wl)}(-1),`),i());n(`_cache[${e.index}] = `),ua(e.value,t),e.isVNode&&(n(","),i(),n(`${o(wl)}(1),`),i(),n(`_cache[${e.index}]`),s());n(")");}(e,t);break;case 21:aa(e.body,t,!0,!1);}}function pa(e,t){const{content:n,isStatic:o}=e;t.push(o?JSON.stringify(n):n,e);}function fa(e,t){for(let n=0;n<e.children.length;n++){const o=e.children[n];y(o)?t.push(o):ua(o,t);}}function da(e,t){const{push:n}=t;if(8===e.type)n("["),fa(e,t),n("]");else if(e.isStatic){n(Yl(e.content)?e.content:JSON.stringify(e.content),e);}else n(`[${e.content}]`,e);}const ha=na(/^(if|else|else-if)$/,((e,t,n)=>function(e,t,n,o){if(!("else"===t.name||t.exp&&t.exp.content.trim())){const o=t.exp?t.exp.loc:e.loc;n.onError(Gi(28,t.loc)),t.exp=Ll("true",!1,o);}if("if"===t.name){const r=ma(e,t),s={type:9,loc:e.loc,branches:[r]};if(n.replaceNode(s),o)return o(s,r,!0)}else {const r=n.parent.children;let s=r.indexOf(e);for(;s-- >=-1;){const i=r[s];if(i&&3===i.type)n.removeNode(i);else {if(!i||2!==i.type||i.content.trim().length){if(i&&9===i.type){"else-if"===t.name&&void 0===i.branches[i.branches.length-1].condition&&n.onError(Gi(30,e.loc)),n.removeNode();const r=ma(e,t);i.branches.push(r);const s=o&&o(i,r,!1);ta(r,n),s&&s(),n.currentNode=null;}else n.onError(Gi(30,e.loc));break}n.removeNode(i);}}}}(e,t,n,((e,t,o)=>{const r=n.parent.children;let s=r.indexOf(e),i=0;for(;s-- >=0;){const e=r[s];e&&9===e.type&&(i+=e.branches.length);}return ()=>{if(o)e.codegenNode=ga(t,i,n);else {const o=function(e){for(;;)if(19===e.type){if(19!==e.alternate.type)return e;e=e.alternate;}else 20===e.type&&(e=e.value);}(e.codegenNode);o.alternate=ga(t,i+e.branches.length-1,n);}}}))));function ma(e,t){const n=3===e.tagType;return {type:10,loc:e.loc,condition:"else"===t.name?void 0:t.exp,children:n&&!sc(e,"for")?e.children:[e],userKey:ic(e,"key"),isTemplateIf:n}}function ga(e,t,n){return e.condition?Hl(e.condition,va(e,t,n),Ul(n.helper(rl),['""',"true"])):va(e,t,n)}function va(e,t,n){const{helper:o}=n,r=Bl("key",Ll(`${t}`,!1,Fl,2)),{children:s}=e,i=s[0];if(1!==s.length||1!==i.type){if(1===s.length&&11===i.type){const e=i.codegenNode;return hc(e,r,n),e}{let t=64;return Ml(n,o(qi),Il([r]),s,t+"",void 0,void 0,!0,!1,!1,e.loc)}}{const e=i.codegenNode,t=14===(l=e).type&&l.callee===Pl?l.arguments[1].returns:l;return 13===t.type&&Kl(t,n),hc(t,r,n),e}var l;}const ya=na("for",((e,t,n)=>{const{helper:o,removeHelper:r}=n;return function(e,t,n,o){if(!t.exp)return void n.onError(Gi(31,t.loc));const r=xa(t.exp);if(!r)return void n.onError(Gi(32,t.loc));const{scopes:s}=n,{source:i,value:l,key:c,index:a}=r,u={type:11,loc:t.loc,source:i,valueAlias:l,keyAlias:c,objectIndexAlias:a,parseResult:r,children:uc(e)?e.children:[e]};n.replaceNode(u),s.vFor++;const p=o&&o(u);return ()=>{s.vFor--,p&&p();}}(e,t,n,(t=>{const s=Ul(o(fl),[t.source]),i=uc(e),l=sc(e,"memo"),c=ic(e,"key"),a=c&&(6===c.type?Ll(c.value.content,!0):c.exp),u=c?Bl("key",a):null,p=4===t.source.type&&t.source.constType>0,f=p?64:c?128:256;return t.codegenNode=Ml(n,o(qi),void 0,s,f+"",void 0,void 0,!0,!p,!1,e.loc),()=>{let c;const{children:f}=t,d=1!==f.length||1!==f[0].type,h=pc(e)?e:i&&1===e.children.length&&pc(e.children[0])?e.children[0]:null;if(h?(c=h.codegenNode,i&&u&&hc(c,u,n)):d?c=Ml(n,o(qi),u?Il([u]):void 0,e.children,"64",void 0,void 0,!0,void 0,!1):(c=f[0].codegenNode,i&&u&&hc(c,u,n),c.isBlock!==!p&&(c.isBlock?(r(Xi),r(zl(n.inSSR,c.isComponent))):r(Wl(n.inSSR,c.isComponent))),c.isBlock=!p,c.isBlock?(o(Xi),o(zl(n.inSSR,c.isComponent))):o(Wl(n.inSSR,c.isComponent))),l){const e=Dl(ka(t.parseResult,[Ll("_cached")]));e.body={type:21,body:[jl(["const _memo = (",l.exp,")"]),jl(["if (_cached",...a?[" && _cached.key === ",a]:[],` && ${n.helperString(Rl)}(_cached, _memo)) return _cached`]),jl(["const _item = ",c]),Ll("_item.memo = _memo"),Ll("return _item")],loc:Fl},s.arguments.push(e,Ll("_cache"),Ll(String(n.cached++)));}else s.arguments.push(Dl(ka(t.parseResult),c,!0));}}))}));const ba=/([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,_a=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,Sa=/^\(|\)$/g;function xa(e,t){const n=e.loc,o=e.content,r=o.match(ba);if(!r)return;const[,s,i]=r,l={source:Ca(n,i.trim(),o.indexOf(i,s.length)),value:void 0,key:void 0,index:void 0};let c=s.trim().replace(Sa,"").trim();const a=s.indexOf(c),u=c.match(_a);if(u){c=c.replace(_a,"").trim();const e=u[1].trim();let t;if(e&&(t=o.indexOf(e,a+c.length),l.key=Ca(n,e,t)),u[2]){const r=u[2].trim();r&&(l.index=Ca(n,r,o.indexOf(r,l.key?t+e.length:a+c.length)));}}return c&&(l.value=Ca(n,c,a)),l}function Ca(e,t,n){return Ll(t,!1,nc(e,n,t.length))}function ka({value:e,key:t,index:n},o=[]){return function(e){let t=e.length;for(;t--&&!e[t];);return e.slice(0,t+1).map(((e,t)=>e||Ll("_".repeat(t+1),!1)))}([e,t,n,...o])}const wa=Ll("undefined",!1),Ta=(e,t)=>{if(1===e.type&&(1===e.tagType||3===e.tagType)){const n=sc(e,"slot");if(n)return t.scopes.vSlot++,()=>{t.scopes.vSlot--;}}},Ea=(e,t,n,o)=>Dl(e,n,!1,!0,n.length?n[0].loc:o);function Na(e,t,n=Ea){t.helper(Nl);const{children:o,loc:r}=e,s=[],i=[];let l=t.scopes.vSlot>0||t.scopes.vFor>0;const c=sc(e,"slot",!0);if(c){const{arg:e,exp:t}=c;e&&!Gl(e)&&(l=!0),s.push(Bl(e||Ll("default",!0),n(t,void 0,o,r)));}let a=!1,u=!1;const p=[],f=new Set;let d=0;for(let g=0;g<o.length;g++){const e=o[g];let r;if(!uc(e)||!(r=sc(e,"slot",!0))){3!==e.type&&p.push(e);continue}if(c){t.onError(Gi(37,r.loc));break}a=!0;const{children:h,loc:m}=e,{arg:v=Ll("default",!0),exp:y,loc:b}=r;let _;Gl(v)?_=v?v.content:"default":l=!0;const S=sc(e,"for"),x=n(y,null==S?void 0:S.exp,h,m);let C,k;if(C=sc(e,"if"))l=!0,i.push(Hl(C.exp,Oa(v,x,d++),wa));else if(k=sc(e,/^else(-if)?$/,!0)){let e,n=g;for(;n--&&(e=o[n],3===e.type););if(e&&uc(e)&&sc(e,"if")){o.splice(g,1),g--;let e=i[i.length-1];for(;19===e.alternate.type;)e=e.alternate;e.alternate=k.exp?Hl(k.exp,Oa(v,x,d++),wa):Oa(v,x,d++);}else t.onError(Gi(30,k.loc));}else if(S){l=!0;const e=S.parseResult||xa(S.exp);e?i.push(Ul(t.helper(fl),[e.source,Dl(ka(e),Oa(v,x),!0)])):t.onError(Gi(32,S.loc));}else {if(_){if(f.has(_)){t.onError(Gi(38,b));continue}f.add(_),"default"===_&&(u=!0);}s.push(Bl(v,x));}}if(!c){const e=(e,t)=>Bl("default",n(e,void 0,t,r));a?p.length&&p.some((e=>Pa(e)))&&(u?t.onError(Gi(39,p[0].loc)):s.push(e(void 0,p))):s.push(e(void 0,o));}const h=l?2:$a(e.children)?3:1;let m=Il(s.concat(Bl("_",Ll(h+"",!1))),r);return i.length&&(m=Ul(t.helper(hl),[m,Vl(i)])),{slots:m,hasDynamicSlots:l}}function Oa(e,t,n){const o=[Bl("name",e),Bl("fn",t)];return null!=n&&o.push(Bl("key",Ll(String(n),!0))),Il(o)}function $a(e){for(let t=0;t<e.length;t++){const n=e[t];switch(n.type){case 1:if(2===n.tagType||$a(n.children))return !0;break;case 9:if($a(n.branches))return !0;break;case 10:case 11:if($a(n.children))return !0}}return !1}function Pa(e){return 2!==e.type&&12!==e.type||(2===e.type?!!e.content.trim():Pa(e.content))}const Ra=new WeakMap,Aa=(e,t)=>function(){if(1!==(e=t.currentNode).type||0!==e.tagType&&1!==e.tagType)return;const{tag:n,props:o}=e,r=1===e.tagType;let s=r?function(e,t,n=!1){let{tag:o}=e;const r=Ia(o),s=ic(e,"is");if(s)if(r){const e=6===s.type?s.value&&Ll(s.value.content,!0):s.exp;if(e)return Ul(t.helper(cl),[e])}else 6===s.type&&s.value.content.startsWith("vue:")&&(o=s.value.content.slice(4));const i=!r&&sc(e,"is");if(i&&i.exp)return Ul(t.helper(cl),[i.exp]);const l=Jl(o)||t.isBuiltInComponent(o);if(l)return n||t.helper(l),l;return t.helper(ll),t.components.add(o),gc(o,"component")}(e,t):`"${n}"`;const i=_(s)&&s.callee===cl;let l,c,a,u,p,f,d=0,h=i||s===Ji||s===Zi||!r&&("svg"===n||"foreignObject"===n);if(o.length>0){const n=Fa(e,t,void 0,r,i);l=n.props,d=n.patchFlag,p=n.dynamicPropNames;const o=n.directives;f=o&&o.length?Vl(o.map((e=>function(e,t){const n=[],o=Ra.get(e);o?n.push(t.helperString(o)):(t.helper(al),t.directives.add(e.name),n.push(gc(e.name,"directive")));const{loc:r}=e;e.exp&&n.push(e.exp);e.arg&&(e.exp||n.push("void 0"),n.push(e.arg));if(Object.keys(e.modifiers).length){e.arg||(e.exp||n.push("void 0"),n.push("void 0"));const t=Ll("true",!1,r);n.push(Il(e.modifiers.map((e=>Bl(e,t))),r));}return Vl(n,e.loc)}(e,t)))):void 0,n.shouldUseBlock&&(h=!0);}if(e.children.length>0){s===Yi&&(h=!0,d|=1024);if(r&&s!==Ji&&s!==Yi){const{slots:n,hasDynamicSlots:o}=Na(e,t);c=n,o&&(d|=1024);}else if(1===e.children.length&&s!==Ji){const n=e.children[0],o=n.type,r=5===o||8===o;r&&0===Gc(n,t)&&(d|=1),c=r||2===o?n:e.children;}else c=e.children;}0!==d&&(a=String(d),p&&p.length&&(u=function(e){let t="[";for(let n=0,o=e.length;n<o;n++)t+=JSON.stringify(e[n]),n<o-1&&(t+=", ");return t+"]"}(p))),e.codegenNode=Ml(t,s,l,c,a,u,f,!!h,!1,r,e.loc);};function Fa(e,t,n=e.props,o,r,s=!1){const{tag:i,loc:c,children:a}=e;let u=[];const p=[],f=[],d=a.length>0;let h=!1,m=0,g=!1,v=!1,y=!1,_=!1,S=!1,x=!1;const C=[],k=e=>{u.length&&(p.push(Il(Ma(u),c)),u=[]),e&&p.push(e);},w=({key:e,value:n})=>{if(Gl(e)){const s=e.content,i=l(s);if(!i||o&&!r||"onclick"===s.toLowerCase()||"onUpdate:modelValue"===s||E(s)||(_=!0),i&&E(s)&&(x=!0),20===n.type||(4===n.type||8===n.type)&&Gc(n,t)>0)return;"ref"===s?g=!0:"class"===s?v=!0:"style"===s?y=!0:"key"===s||C.includes(s)||C.push(s),!o||"class"!==s&&"style"!==s||C.includes(s)||C.push(s);}else S=!0;};for(let l=0;l<n.length;l++){const r=n[l];if(6===r.type){const{loc:e,name:n,value:o}=r;let s=!0;if("ref"===n&&(g=!0,t.scopes.vFor>0&&u.push(Bl(Ll("ref_for",!0),Ll("true")))),"is"===n&&(Ia(i)||o&&o.content.startsWith("vue:")))continue;u.push(Bl(Ll(n,!0,nc(e,0,n.length)),Ll(o?o.content:"",s,o?o.loc:e)));}else {const{name:n,arg:l,exp:a,loc:m}=r,g="bind"===n,v="on"===n;if("slot"===n){o||t.onError(Gi(40,m));continue}if("once"===n||"memo"===n)continue;if("is"===n||g&&lc(l,"is")&&Ia(i))continue;if(v&&s)continue;if((g&&lc(l,"key")||v&&d&&lc(l,"vue:before-update"))&&(h=!0),g&&lc(l,"ref")&&t.scopes.vFor>0&&u.push(Bl(Ll("ref_for",!0),Ll("true"))),!l&&(g||v)){S=!0,a?g?(k(),p.push(a)):k({type:14,loc:m,callee:t.helper(Sl),arguments:o?[a]:[a,"true"]}):t.onError(Gi(g?34:35,m));continue}const y=t.directiveTransforms[n];if(y){const{props:n,needRuntime:o}=y(r,e,t);!s&&n.forEach(w),v&&l&&!Gl(l)?k(Il(n,c)):u.push(...n),o&&(f.push(r),b(o)&&Ra.set(r,o));}else N(n)||(f.push(r),d&&(h=!0));}}let T;if(p.length?(k(),T=p.length>1?Ul(t.helper(gl),p,c):p[0]):u.length&&(T=Il(Ma(u),c)),S?m|=16:(v&&!o&&(m|=2),y&&!o&&(m|=4),C.length&&(m|=8),_&&(m|=32)),h||0!==m&&32!==m||!(g||x||f.length>0)||(m|=512),!t.inSSR&&T)switch(T.type){case 15:let e=-1,n=-1,o=!1;for(let t=0;t<T.properties.length;t++){const r=T.properties[t].key;Gl(r)?"class"===r.content?e=t:"style"===r.content&&(n=t):r.isHandlerKey||(o=!0);}const r=T.properties[e],s=T.properties[n];o?T=Ul(t.helper(bl),[T]):(r&&!Gl(r.value)&&(r.value=Ul(t.helper(vl),[r.value])),s&&(y||4===s.value.type&&"["===s.value.content.trim()[0]||17===s.value.type)&&(s.value=Ul(t.helper(yl),[s.value])));break;case 14:break;default:T=Ul(t.helper(bl),[Ul(t.helper(_l),[T])]);}return {props:T,directives:f,patchFlag:m,dynamicPropNames:C,shouldUseBlock:h}}function Ma(e){const t=new Map,n=[];for(let o=0;o<e.length;o++){const r=e[o];if(8===r.key.type||!r.key.isStatic){n.push(r);continue}const s=r.key.content,i=t.get(s);i?("style"===s||"class"===s||l(s))&&Va(i,r):(t.set(s,r),n.push(r));}return n}function Va(e,t){17===e.value.type?e.value.elements.push(t.value):e.value=Vl([e.value,t.value],e.loc);}function Ia(e){return "component"===e||"Component"===e}const Ba=(e,t)=>{if(pc(e)){const{children:n,loc:o}=e,{slotName:r,slotProps:s}=function(e,t){let n,o='"default"';const r=[];for(let s=0;s<e.props.length;s++){const t=e.props[s];6===t.type?t.value&&("name"===t.name?o=JSON.stringify(t.value.content):(t.name=P(t.name),r.push(t))):"bind"===t.name&&lc(t.arg,"name")?t.exp&&(o=t.exp):("bind"===t.name&&t.arg&&Gl(t.arg)&&(t.arg.content=P(t.arg.content)),r.push(t));}if(r.length>0){const{props:o,directives:s}=Fa(e,t,r,!1,!1);n=o,s.length&&t.onError(Gi(36,s[0].loc));}return {slotName:o,slotProps:n}}(e,t),i=[t.prefixIdentifiers?"_ctx.$slots":"$slots",r,"{}","undefined","true"];let l=2;s&&(i[2]=s,l=3),n.length&&(i[3]=Dl([],n,!1,!1,o),l=4),t.scopeId&&!t.slotted&&(l=5),i.splice(l),e.codegenNode=Ul(t.helper(dl),i,o);}};const La=/^\s*([\w$_]+|(async\s*)?\([^)]*?\))\s*(:[^=]+)?=>|^\s*(async\s+)?function(?:\s+[\w$]+)?\s*\(/,ja=(e,t,n,o)=>{const{loc:r,modifiers:s,arg:i}=e;let l;if(4===i.type)if(i.isStatic){let e=i.content;e.startsWith("vue:")&&(e=`vnode-${e.slice(4)}`);l=Ll(0!==t.tagType||e.startsWith("vnode")||!/[A-Z]/.test(e)?M(P(e)):`on:${e}`,!0,i.loc);}else l=jl([`${n.helperString(kl)}(`,i,")"]);else l=i,l.children.unshift(`${n.helperString(kl)}(`),l.children.push(")");let c=e.exp;c&&!c.content.trim()&&(c=void 0);let a=n.cacheHandlers&&!c&&!n.inVOnce;if(c){const e=tc(c.content),t=!(e||La.test(c.content)),n=c.content.includes(";");(t||a&&e)&&(c=jl([`${t?"$event":"(...args)"} => ${n?"{":"("}`,c,n?"}":")"]));}let u={props:[Bl(l,c||Ll("() => {}",!1,r))]};return o&&(u=o(u)),a&&(u.props[0].value=n.cache(u.props[0].value)),u.props.forEach((e=>e.key.isHandlerKey=!0)),u},Ua=(e,t,n)=>{const{exp:o,modifiers:r,loc:s}=e,i=e.arg;return 4!==i.type?(i.children.unshift("("),i.children.push(') || ""')):i.isStatic||(i.content=`${i.content} || ""`),r.includes("camel")&&(4===i.type?i.content=i.isStatic?P(i.content):`${n.helperString(xl)}(${i.content})`:(i.children.unshift(`${n.helperString(xl)}(`),i.children.push(")"))),n.inSSR||(r.includes("prop")&&Da(i,"."),r.includes("attr")&&Da(i,"^")),!o||4===o.type&&!o.content.trim()?{props:[Bl(i,Ll("",!0,s))]}:{props:[Bl(i,o)]}},Da=(e,t)=>{4===e.type?e.content=e.isStatic?t+e.content:`\`${t}\${${e.content}}\``:(e.children.unshift(`'${t}' + (`),e.children.push(")"));},Ha=(e,t)=>{if(0===e.type||1===e.type||11===e.type||10===e.type)return ()=>{const n=e.children;let o,r=!1;for(let e=0;e<n.length;e++){const t=n[e];if(cc(t)){r=!0;for(let r=e+1;r<n.length;r++){const s=n[r];if(!cc(s)){o=void 0;break}o||(o=n[e]=jl([t],t.loc)),o.children.push(" + ",s),n.splice(r,1),r--;}}}if(r&&(1!==n.length||0!==e.type&&(1!==e.type||0!==e.tagType||e.props.find((e=>7===e.type&&!t.directiveTransforms[e.name])))))for(let e=0;e<n.length;e++){const o=n[e];if(cc(o)||8===o.type){const r=[];2===o.type&&" "===o.content||r.push(o),t.ssr||0!==Gc(o,t)||r.push("1"),n[e]={type:12,content:o,loc:o.loc,codegenNode:Ul(t.helper(sl),r)};}}}},Wa=new WeakSet,za=(e,t)=>{if(1===e.type&&sc(e,"once",!0)){if(Wa.has(e)||t.inVOnce||t.inSSR)return;return Wa.add(e),t.inVOnce=!0,t.helper(wl),()=>{t.inVOnce=!1;const e=t.currentNode;e.codegenNode&&(e.codegenNode=t.cache(e.codegenNode,!0));}}},Ka=(e,t,n)=>{const{exp:o,arg:r}=e;if(!o)return n.onError(Gi(41,e.loc)),Ga();const s=o.loc.source,i=4===o.type?o.content:s,l=n.bindingMetadata[s];if("props"===l||"props-aliased"===l)return Ga();if(!i.trim()||!tc(i))return n.onError(Gi(42,o.loc)),Ga();const c=r||Ll("modelValue",!0),a=r?Gl(r)?`onUpdate:${P(r.content)}`:jl(['"onUpdate:" + ',r]):"onUpdate:modelValue";let u;u=jl([`${n.isTS?"($event: any)":"$event"} => ((`,o,") = $event)"]);const p=[Bl(c,e.exp),Bl(a,u)];if(e.modifiers.length&&1===t.tagType){const t=e.modifiers.map((e=>(Yl(e)?e:JSON.stringify(e))+": true")).join(", "),n=r?Gl(r)?`${r.content}Modifiers`:jl([r,' + "Modifiers"']):"modelModifiers";p.push(Bl(n,Ll(`{ ${t} }`,!1,e.loc,2)));}return Ga(p)};function Ga(e=[]){return {props:e}}const qa=new WeakSet,Ja=(e,t)=>{if(1===e.type){const n=sc(e,"memo");if(!n||qa.has(e))return;return qa.add(e),()=>{const o=e.codegenNode||t.currentNode.codegenNode;o&&13===o.type&&(1!==e.tagType&&Kl(o,t),e.codegenNode=Ul(t.helper(Pl),[n.exp,Dl(void 0,o),"_cache",String(t.cached++)]));}}};function Za(e,t={}){const n=t.onError||zi,o="module"===t.mode;!0===t.prefixIdentifiers?n(Gi(47)):o&&n(Gi(48));t.cacheHandlers&&n(Gi(49)),t.scopeId&&!o&&n(Gi(50));const r=y(e)?_c(e,t):e,[s,i]=[[za,ha,Ja,ya,Ba,Aa,Ta,Ha],{on:ja,bind:Ua,model:Ka}];return ea(r,a({},t,{prefixIdentifiers:false,nodeTransforms:[...s,...t.nodeTransforms||[]],directiveTransforms:a({},i,t.directiveTransforms||{})})),ia(r,a({},t,{prefixIdentifiers:false}))}const Ya=Symbol(""),Qa=Symbol(""),Xa=Symbol(""),eu=Symbol(""),tu=Symbol(""),nu=Symbol(""),ou=Symbol(""),ru=Symbol(""),su=Symbol(""),iu=Symbol("");var lu;let cu;lu={[Ya]:"vModelRadio",[Qa]:"vModelCheckbox",[Xa]:"vModelText",[eu]:"vModelSelect",[tu]:"vModelDynamic",[nu]:"withModifiers",[ou]:"withKeys",[ru]:"vShow",[su]:"Transition",[iu]:"TransitionGroup"},Object.getOwnPropertySymbols(lu).forEach((e=>{Al[e]=lu[e];}));const au=t("style,iframe,script,noscript",!0),uu={isVoidTag:Q,isNativeTag:e=>Z(e)||Y(e),isPreTag:e=>"pre"===e,decodeEntities:function(e,t=!1){return cu||(cu=document.createElement("div")),t?(cu.innerHTML=`<div foo="${e.replace(/"/g,"&quot;")}">`,cu.children[0].getAttribute("foo")):(cu.innerHTML=e,cu.textContent)},isBuiltInComponent:e=>ql(e,"Transition")?su:ql(e,"TransitionGroup")?iu:void 0,getNamespace(e,t){let n=t?t.ns:0;if(t&&2===n)if("annotation-xml"===t.tag){if("svg"===e)return 1;t.props.some((e=>6===e.type&&"encoding"===e.name&&null!=e.value&&("text/html"===e.value.content||"application/xhtml+xml"===e.value.content)))&&(n=0);}else /^m(?:[ions]|text)$/.test(t.tag)&&"mglyph"!==e&&"malignmark"!==e&&(n=0);else t&&1===n&&("foreignObject"!==t.tag&&"desc"!==t.tag&&"title"!==t.tag||(n=0));if(0===n){if("svg"===e)return 1;if("math"===e)return 2}return n},getTextMode({tag:e,ns:t}){if(0===t){if("textarea"===e||"title"===e)return 1;if(au(e))return 2}return 0}},pu=(e,t)=>{const n=q(e);return Ll(JSON.stringify(n),!1,t,3)};function fu(e,t){return Gi(e,t)}const du=t("passive,once,capture"),hu=t("stop,prevent,self,ctrl,shift,alt,meta,exact,middle"),mu=t("left,right"),gu=t("onkeyup,onkeydown,onkeypress",!0),vu=(e,t)=>Gl(e)&&"onclick"===e.content.toLowerCase()?Ll(t,!0):4!==e.type?jl(["(",e,`) === "onClick" ? "${t}" : (`,e,")"]):e,yu=(e,t)=>{1!==e.type||0!==e.tagType||"script"!==e.tag&&"style"!==e.tag||t.removeNode();},bu=[e=>{1===e.type&&e.props.forEach(((t,n)=>{6===t.type&&"style"===t.name&&t.value&&(e.props[n]={type:7,name:"bind",arg:Ll("style",!0,t.loc),exp:pu(t.value.content,t.loc),modifiers:[],loc:t.loc});}));}],_u={cloak:()=>({props:[]}),html:(e,t,n)=>{const{exp:o,loc:r}=e;return o||n.onError(fu(53,r)),t.children.length&&(n.onError(fu(54,r)),t.children.length=0),{props:[Bl(Ll("innerHTML",!0,r),o||Ll("",!0))]}},text:(e,t,n)=>{const{exp:o,loc:r}=e;return o||n.onError(fu(55,r)),t.children.length&&(n.onError(fu(56,r)),t.children.length=0),{props:[Bl(Ll("textContent",!0),o?Gc(o,n)>0?o:Ul(n.helperString(ml),[o],r):Ll("",!0))]}},model:(e,t,n)=>{const o=Ka(e,t,n);if(!o.props.length||1===t.tagType)return o;e.arg&&n.onError(fu(58,e.arg.loc));const{tag:r}=t,s=n.isCustomElement(r);if("input"===r||"textarea"===r||"select"===r||s){let i=Xa,l=!1;if("input"===r||s){const o=ic(t,"type");if(o){if(7===o.type)i=tu;else if(o.value)switch(o.value.content){case"radio":i=Ya;break;case"checkbox":i=Qa;break;case"file":l=!0,n.onError(fu(59,e.loc));}}else (function(e){return e.props.some((e=>!(7!==e.type||"bind"!==e.name||e.arg&&4===e.arg.type&&e.arg.isStatic)))})(t)&&(i=tu);}else "select"===r&&(i=eu);l||(o.needRuntime=n.helper(i));}else n.onError(fu(57,e.loc));return o.props=o.props.filter((e=>!(4===e.key.type&&"modelValue"===e.key.content))),o},on:(e,t,n)=>ja(e,t,n,(t=>{const{modifiers:o}=e;if(!o.length)return t;let{key:r,value:s}=t.props[0];const{keyModifiers:i,nonKeyModifiers:l,eventOptionModifiers:c}=((e,t,n,o)=>{const r=[],s=[],i=[];for(let l=0;l<t.length;l++){const n=t[l];du(n)?i.push(n):mu(n)?Gl(e)?gu(e.content)?r.push(n):s.push(n):(r.push(n),s.push(n)):hu(n)?s.push(n):r.push(n);}return {keyModifiers:r,nonKeyModifiers:s,eventOptionModifiers:i}})(r,o);if(l.includes("right")&&(r=vu(r,"onContextmenu")),l.includes("middle")&&(r=vu(r,"onMouseup")),l.length&&(s=Ul(n.helper(nu),[s,JSON.stringify(l)])),!i.length||Gl(r)&&!gu(r.content)||(s=Ul(n.helper(ou),[s,JSON.stringify(i)])),c.length){const e=c.map(F).join("");r=Gl(r)?Ll(`${r.content}${e}`,!0):jl(["(",r,`) + "${e}"`]);}return {props:[Bl(r,s)]}})),show:(e,t,n)=>{const{exp:o,loc:r}=e;return o||n.onError(fu(61,r)),{props:[],needRuntime:n.helper(ru)}}};const Su=Object.create(null);function xu(e,t){if(!y(e)){if(!e.nodeType)return r;e=e.innerHTML;}const n=e,o=Su[n];if(o)return o;if("#"===e[0]){const t=document.querySelector(e);e=t?t.innerHTML:"";}const s=a({hoistStatic:!0,onError:void 0,onWarn:r},t);s.isCustomElement||"undefined"==typeof customElements||(s.isCustomElement=e=>!!customElements.get(e));const{code:i}=function(e,t={}){return Za(e,a({},uu,t,{nodeTransforms:[yu,...bu,...t.nodeTransforms||[]],directiveTransforms:a({},_u,t.directiveTransforms||{}),transformHoist:null}))}(e,s),l=new Function(i)();return l._rc=!0,Su[n]=l}return ps(xu),e.BaseTransition=Wn,e.BaseTransitionPropsValidators=Hn,e.Comment=Nr,e.EffectScope=se,e.Fragment=Tr,e.KeepAlive=to,e.ReactiveEffect=ye,e.Static=Or,e.Suspense=wn,e.Teleport=kr,e.Text=Er,e.Transition=Es,e.TransitionGroup=mi,e.VueElement=li,e.assertNumber=function(e,t){},e.callWithAsyncErrorHandling=jt,e.callWithErrorHandling=Lt,e.camelize=P,e.capitalize=F,e.cloneVNode=Kr,e.compatUtils=null,e.compile=xu,e.computed=gs,e.createApp=(...e)=>{const t=Li().createApp(...e),{mount:n}=t;return t.mount=e=>{const o=Hi(e);if(!o)return;const r=t._component;v(r)||r.render||r.template||(r.template=o.innerHTML),o.innerHTML="";const s=n(o,!1,o instanceof SVGElement);return o instanceof Element&&(o.removeAttribute("v-cloak"),o.setAttribute("data-v-app","")),s},t},e.createBlock=Ir,e.createCommentVNode=function(e="",t=!1){return t?(Rr(),Ir(Nr,null,e)):Wr(Nr,null,e)},e.createElementBlock=function(e,t,n,o,r,s){return Vr(Hr(e,t,n,o,r,s,!0))},e.createElementVNode=Hr,e.createHydrationRenderer=mr,e.createPropsRestProxy=function(e,t){const n={};for(const o in e)t.includes(o)||Object.defineProperty(n,o,{enumerable:!0,get:()=>e[o]});return n},e.createRenderer=hr,e.createSSRApp=(...e)=>{const t=ji().createApp(...e),{mount:n}=t;return t.mount=e=>{const t=Hi(e);if(t)return n(t,!0,t instanceof SVGElement)},t},e.createSlots=function(e,t){for(let n=0;n<t.length;n++){const o=t[n];if(d(o))for(let t=0;t<o.length;t++)e[o[t].name]=o[t].fn;else o&&(e[o.name]=o.key?(...e)=>{const t=o.fn(...e);return t&&(t.key=o.key),t}:o.fn);}return e},e.createStaticVNode=function(e,t){const n=Wr(Or,null,e);return n.staticCount=t,n},e.createTextVNode=Gr,e.createVNode=Wr,e.customRef=function(e){return new Ft(e)},e.defineAsyncComponent=function(e){v(e)&&(e={loader:e});const{loader:t,loadingComponent:n,errorComponent:o,delay:r=200,timeout:s,suspensible:i=!0,onError:l}=e;let c,a=null,u=0;const p=()=>{let e;return a||(e=a=t().catch((e=>{if(e=e instanceof Error?e:new Error(String(e)),l)return new Promise(((t,n)=>{l(e,(()=>t((u++,a=null,p()))),(()=>n(e)),u+1);}));throw e})).then((t=>e!==a&&a?a:(t&&(t.__esModule||"Module"===t[Symbol.toStringTag])&&(t=t.default),c=t,t))))};return Yn({name:"AsyncComponentWrapper",__asyncLoader:p,get __asyncResolved(){return c},setup(){const e=ts;if(c)return ()=>Xn(c,e);const t=t=>{a=null,Ut(t,e,13,!o);};if(i&&e.suspense)return p().then((t=>()=>Xn(t,e))).catch((e=>(t(e),()=>o?Wr(o,{error:e}):null)));const l=Nt(!1),u=Nt(),f=Nt(!!r);return r&&setTimeout((()=>{f.value=!1;}),r),null!=s&&setTimeout((()=>{if(!l.value&&!u.value){const e=new Error(`Async component timed out after ${s}ms.`);t(e),u.value=e;}}),s),p().then((()=>{l.value=!0,e.parent&&eo(e.parent.vnode)&&Qt(e.parent.update);})).catch((e=>{t(e),u.value=e;})),()=>l.value&&c?Xn(c,e):u.value&&o?Wr(o,{error:u.value}):n&&!f.value?Wr(n):void 0}})},e.defineComponent=Yn,e.defineCustomElement=si,e.defineEmits=function(){return null},e.defineExpose=function(e){},e.defineModel=function(){},e.defineOptions=function(e){},e.defineProps=function(){return null},e.defineSSRCustomElement=e=>si(e,Di),e.defineSlots=function(){return null},e.effect=function(e,t){e.effect instanceof ye&&(e=e.effect.fn);const n=new ye(e);t&&(a(n,t),t.scope&&ie(n,t.scope)),t&&t.lazy||n.run();const o=n.run.bind(n);return o.effect=n,o},e.effectScope=function(e){return new se(e)},e.getCurrentInstance=ns,e.getCurrentScope=le,e.getTransitionRawChildren=Zn,e.guardReactiveProps=zr,e.h=vs,e.handleError=Ut,e.hasInjectionContext=function(){return !!(ts||pn||zo)},e.hydrate=Di,e.initCustomFormatter=function(){},e.initDirectivesForSSR=Wi,e.inject=Go,e.isMemoSame=bs,e.isProxy=_t,e.isReactive=vt,e.isReadonly=yt,e.isRef=Et,e.isRuntimeOnly=()=>!ls,e.isShallow=bt,e.isVNode=Br,e.markRaw=xt,e.mergeDefaults=function(e,t){const n=Oo(e);for(const o in t){if(o.startsWith("__skip"))continue;let e=n[o];e?d(e)||v(e)?e=n[o]={type:e,default:t[o]}:e.default=t[o]:null===e&&(e=n[o]={default:t[o]}),e&&t[`__skip_${o}`]&&(e.skipFactory=!0);}return n},e.mergeModels=function(e,t){return e&&t?d(e)&&d(t)?e.concat(t):a({},Oo(e),Oo(t)):e||t},e.mergeProps=Yr,e.nextTick=Yt,e.normalizeClass=J,e.normalizeProps=function(e){if(!e)return null;let{class:t,style:n}=e;return t&&!y(t)&&(e.class=J(t)),n&&(e.style=W(n)),e},e.normalizeStyle=W,e.onActivated=oo,e.onBeforeMount=po,e.onBeforeUnmount=go,e.onBeforeUpdate=ho,e.onDeactivated=ro,e.onErrorCaptured=So,e.onMounted=fo,e.onRenderTracked=_o,e.onRenderTriggered=bo,e.onScopeDispose=function(e){re&&re.cleanups.push(e);},e.onServerPrefetch=yo,e.onUnmounted=vo,e.onUpdated=mo,e.openBlock=Rr,e.popScopeId=function(){fn=null;},e.provide=Ko,e.proxyRefs=At,e.pushScopeId=function(e){fn=e;},e.queuePostFlushCb=en,e.reactive=dt,e.readonly=mt,e.ref=Nt,e.registerRuntimeCompiler=ps,e.render=Ui,e.renderList=function(e,t,n,o){let r;const s=n&&n[o];if(d(e)||y(e)){r=new Array(e.length);for(let n=0,o=e.length;n<o;n++)r[n]=t(e[n],n,void 0,s&&s[n]);}else if("number"==typeof e){r=new Array(e);for(let n=0;n<e;n++)r[n]=t(n+1,n,void 0,s&&s[n]);}else if(_(e))if(e[Symbol.iterator])r=Array.from(e,((e,n)=>t(e,n,void 0,s&&s[n])));else {const n=Object.keys(e);r=new Array(n.length);for(let o=0,i=n.length;o<i;o++){const i=n[o];r[o]=t(e[i],i,o,s&&s[o]);}}else r=[];return n&&(n[o]=r),r},e.renderSlot=function(e,t,n={},o,r){if(pn.isCE||pn.parent&&Qn(pn.parent)&&pn.parent.isCE)return "default"!==t&&(n.name=t),Wr("slot",n,o&&o());let s=e[t];s&&s._c&&(s._d=!1),Rr();const i=s&&xo(s(n)),l=Ir(Tr,{key:n.key||i&&i.key||`_${t}`},i||(o?o():[]),i&&1===e._?64:-2);return !r&&l.scopeId&&(l.slotScopeIds=[l.scopeId+"-s"]),s&&s._c&&(s._d=!0),l},e.resolveComponent=function(e,t){return xn(_n,e,!0,t)||e},e.resolveDirective=function(e){return xn("directives",e)},e.resolveDynamicComponent=function(e){return y(e)?xn(_n,e,!1)||e:e||Sn},e.resolveFilter=null,e.resolveTransitionHooks=Kn,e.setBlockTracking=Mr,e.setDevtoolsHook=function t(n,o){var r,s;if(e.devtools=n,e.devtools)e.devtools.enabled=!0,ln.forEach((({event:t,args:n})=>e.devtools.emit(t,...n))),ln=[];else if("undefined"!=typeof window&&window.HTMLElement&&!(null==(s=null==(r=window.navigator)?void 0:r.userAgent)?void 0:s.includes("jsdom"))){(o.__VUE_DEVTOOLS_HOOK_REPLAY__=o.__VUE_DEVTOOLS_HOOK_REPLAY__||[]).push((e=>{t(e,o);})),setTimeout((()=>{e.devtools||(o.__VUE_DEVTOOLS_HOOK_REPLAY__=null,ln=[]);}),3e3);}else ln=[];},e.setTransitionHooks=Jn,e.shallowReactive=ht,e.shallowReadonly=function(e){return gt(e,!0,je,ct,ft)},e.shallowRef=function(e){return Ot(e,!0)},e.ssrContextKey=ys,e.ssrUtils=null,e.stop=function(e){e.effect.stop();},e.toDisplayString=e=>y(e)?e:null==e?"":d(e)||_(e)&&(e.toString===x||!v(e.toString))?JSON.stringify(e,oe,2):String(e),e.toHandlerKey=M,e.toHandlers=function(e,t){const n={};for(const o in e)n[t&&/[A-Z]/.test(o)?`on:${o}`:M(o)]=e[o];return n},e.toRaw=St,e.toRef=function(e,t,n){return Et(e)?e:v(e)?new Vt(e):_(e)&&arguments.length>1?It(e,t,n):Nt(e)},e.toRefs=function(e){const t=d(e)?new Array(e.length):{};for(const n in e)t[n]=It(e,n);return t},e.toValue=function(e){return v(e)?e():Pt(e)},e.transformVNodeArgs=function(e){},e.triggerRef=function(e){Tt(e);},e.unref=Pt,e.useAttrs=function(){return No().attrs},e.useCssModule=function(e="$style"){return n},e.useCssVars=function(e){const t=ns();if(!t)return;const n=t.ut=(n=e(t.proxy))=>{Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach((e=>ai(e,n)));},o=()=>{const o=e(t.proxy);ci(t.subTree,o),n(o);};Pn(o),fo((()=>{const e=new MutationObserver(o);e.observe(t.subTree.el.parentNode,{childList:!0}),vo((()=>e.disconnect()));}));},e.useModel=function(e,t,n){const o=ns();if(n&&n.local){const n=Nt(e[t]);return An((()=>e[t]),(e=>n.value=e)),An(n,(n=>{n!==e[t]&&o.emit(`update:${t}`,n);})),n}return {__v_isRef:!0,get value(){return e[t]},set value(e){o.emit(`update:${t}`,e);}}},e.useSSRContext=()=>{},e.useSlots=function(){return No().slots},e.useTransitionState=Un,e.vModelCheckbox=ki,e.vModelDynamic=Pi,e.vModelRadio=Ti,e.vModelSelect=Ei,e.vModelText=Ci,e.vShow=Ws,e.version=_s,e.warn=function(e,...t){},e.watch=An,e.watchEffect=function(e,t){return Fn(e,null,t)},e.watchPostEffect=Pn,e.watchSyncEffect=function(e,t){return Fn(e,null,{flush:"sync"})},e.withAsyncContext=function(e){const t=ns();let n=e();return ss(),S(n)&&(n=n.catch((e=>{throw rs(t),e}))),[n,()=>rs(t)]},e.withCtx=hn,e.withDefaults=function(e,t){return null},e.withDirectives=function(e,t){const o=pn;if(null===o)return e;const r=hs(o)||o.proxy,s=e.dirs||(e.dirs=[]);for(let i=0;i<t.length;i++){let[e,o,l,c=n]=t[i];e&&(v(e)&&(e={mounted:e,updated:e}),e.deep&&In(o),s.push({dir:e,instance:r,value:o,oldValue:void 0,arg:l,modifiers:c}));}return e},e.withKeys=(e,t)=>n=>{if(!("key"in n))return;const o=A(n.key);return t.some((e=>e===o||Mi[e]===o))?e(n):void 0},e.withMemo=function(e,t,n,o){const r=n[o];if(r&&bs(r,e))return r;const s=t();return s.memo=e.slice(),n[o]=s},e.withModifiers=(e,t)=>(n,...o)=>{for(let e=0;e<t.length;e++){const o=Fi[t[e]];if(o&&o(n,t))return}return e(n,...o)},e.withScopeId=e=>hn,e}({});

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

  /*! instant.page v5.2.0 - (C) 2019-2023 Alexandre Dieulot - https://instant.page/license */
  (function() {
      let t, e, n, o, i, a = null, s = 65, c = new Set; const r = 1111; function d(t) { o = performance.now(); const e = t.target.closest("a"); m(e) && p(e.href, "high"); } function u(t) { if (performance.now() - o < r) return; if (!("closest" in t.target)) return; const e = t.target.closest("a"); m(e) && (e.addEventListener("mouseout", f, { passive: !0 }), i = setTimeout(() => { p(e.href, "high"), i = void 0; }, s)); } function l(t) { const e = t.target.closest("a"); m(e) && p(e.href, "high"); } function f(t) { t.relatedTarget && t.target.closest("a") == t.relatedTarget.closest("a") || i && (clearTimeout(i), i = void 0); } function h(t) { if (performance.now() - o < r) return; const e = t.target.closest("a"); if (t.which > 1 || t.metaKey || t.ctrlKey) return; if (!e) return; e.addEventListener("click", function (t) { 1337 != t.detail && t.preventDefault(); }, { capture: !0, passive: !1, once: !0 }); const n = new MouseEvent("click", { view: window, bubbles: !0, cancelable: !1, detail: 1337 }); e.dispatchEvent(n); } function m(o) { if (o && o.href && (!n || "instant" in o.dataset)) { if (o.origin != location.origin) { if (!(e || "instant" in o.dataset) || !a) return } if (["http:", "https:"].includes(o.protocol) && ("http:" != o.protocol || "https:" != location.protocol) && (t || !o.search || "instant" in o.dataset) && !(o.hash && o.pathname + o.search == location.pathname + location.search || "noInstant" in o.dataset)) return !0 } } function p(t, e = "auto") { if (c.has(t)) return; const n = document.createElement("link"); n.rel = "prefetch", n.href = t, n.fetchPriority = e, n.as = "document", document.head.appendChild(n), c.add(t); } !function () { if (!document.createElement("link").relList.supports("prefetch")) return; const o = "instantVaryAccept" in document.body.dataset || "Shopify" in window, i = navigator.userAgent.indexOf("Chrome/"); i > -1 && (a = parseInt(navigator.userAgent.substring(i + "Chrome/".length))); if (o && a && a < 110) return; const c = "instantMousedownShortcut" in document.body.dataset; t = "instantAllowQueryString" in document.body.dataset, e = "instantAllowExternalLinks" in document.body.dataset, n = "instantWhitelist" in document.body.dataset; const r = { capture: !0, passive: !0 }; let f = !1, v = !1, g = !1; if ("instantIntensity" in document.body.dataset) { const t = document.body.dataset.instantIntensity; if (t.startsWith("mousedown")) f = !0, "mousedown-only" == t && (v = !0); else if (t.startsWith("viewport")) { const e = navigator.connection && navigator.connection.saveData, n = navigator.connection && navigator.connection.effectiveType && navigator.connection.effectiveType.includes("2g"); e || n || ("viewport" == t ? document.documentElement.clientWidth * document.documentElement.clientHeight < 45e4 && (g = !0) : "viewport-all" == t && (g = !0)); } else { const e = parseInt(t); isNaN(e) || (s = e); } } v || document.addEventListener("touchstart", d, r); f ? c || document.addEventListener("mousedown", l, r) : document.addEventListener("mouseover", u, r); c && document.addEventListener("mousedown", h, r); if (g) { let t = window.requestIdleCallback; t || (t = (t => { t(); })), t(function () { const t = new IntersectionObserver(e => { e.forEach(e => { if (e.isIntersecting) { const n = e.target; t.unobserve(n), p(n.href); } }); }); document.querySelectorAll("a").forEach(e => { m(e) && t.observe(e); }); }, { timeout: 1500 }); } }();
  })();

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
  App$1.session = window.JSONStorage ? window.JSONStorage.select("app", "session") : null;
  App$1.storage = window.JSONStorage ? window.JSONStorage.select("app", "local") : null;
  App$1.memory = window.JSONStorage ? window.JSONStorage.select("app", "memory") : null;
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
