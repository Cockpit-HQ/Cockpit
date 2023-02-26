(function () {
  'use strict';

  window.Vue=function(e){function t(e,t){const n=Object.create(null),o=e.split(",");for(let r=0;r<o.length;r++)n[o[r]]=!0;return t?e=>!!n[e.toLowerCase()]:e=>!!n[e]}const n=t("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt");function o(e){if(E(e)){const t={};for(let n=0;n<e.length;n++){const r=e[n],s=R(r)?l(r):o(r);if(s)for(const e in s)t[e]=s[e];}return t}return R(e)||M(e)?e:void 0}const r=/;(?![^(]*\))/g,s=/:([^]+)/,i=/\/\*.*?\*\//gs;function l(e){const t={};return e.replace(i,"").split(r).forEach((e=>{if(e){const n=e.split(s);n.length>1&&(t[n[0].trim()]=n[1].trim());}})),t}function c(e){let t="";if(R(e))t=e;else if(E(e))for(let n=0;n<e.length;n++){const o=c(e[n]);o&&(t+=o+" ");}else if(M(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const a=t("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot"),u=t("svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view"),p=t("area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr"),f=t("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");function d(e){return !!e||""===e}function h(e,t){if(e===t)return !0;let n=F(e),o=F(t);if(n||o)return !(!n||!o)&&e.getTime()===t.getTime();if(n=$(e),o=$(t),n||o)return e===t;if(n=E(e),o=E(t),n||o)return !(!n||!o)&&function(e,t){if(e.length!==t.length)return !1;let n=!0;for(let o=0;n&&o<e.length;o++)n=h(e[o],t[o]);return n}(e,t);if(n=M(e),o=M(t),n||o){if(!n||!o)return !1;if(Object.keys(e).length!==Object.keys(t).length)return !1;for(const n in e){const o=e.hasOwnProperty(n),r=t.hasOwnProperty(n);if(o&&!r||!o&&r||!h(e[n],t[n]))return !1}}return String(e)===String(t)}function m(e,t){return e.findIndex((e=>h(e,t)))}const g=(e,t)=>t&&t.__v_isRef?g(e,t.value):O(t)?{[`Map(${t.size})`]:[...t.entries()].reduce(((e,[t,n])=>(e[`${t} =>`]=n,e)),{})}:A(t)?{[`Set(${t.size})`]:[...t.values()]}:!M(t)||E(t)||L(t)?t:String(t),v={},y=[],_=()=>{},b=()=>!1,S=/^on[^a-z]/,x=e=>S.test(e),C=e=>e.startsWith("onUpdate:"),k=Object.assign,w=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1);},T=Object.prototype.hasOwnProperty,N=(e,t)=>T.call(e,t),E=Array.isArray,O=e=>"[object Map]"===B(e),A=e=>"[object Set]"===B(e),F=e=>"[object Date]"===B(e),P=e=>"function"==typeof e,R=e=>"string"==typeof e,$=e=>"symbol"==typeof e,M=e=>null!==e&&"object"==typeof e,V=e=>M(e)&&P(e.then)&&P(e.catch),I=Object.prototype.toString,B=e=>I.call(e),L=e=>"[object Object]"===B(e),j=e=>R(e)&&"NaN"!==e&&"-"!==e[0]&&""+parseInt(e,10)===e,U=t(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),D=t("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"),H=e=>{const t=Object.create(null);return n=>t[n]||(t[n]=e(n))},W=/-(\w)/g,z=H((e=>e.replace(W,((e,t)=>t?t.toUpperCase():"")))),K=/\B([A-Z])/g,G=H((e=>e.replace(K,"-$1").toLowerCase())),q=H((e=>e.charAt(0).toUpperCase()+e.slice(1))),J=H((e=>e?`on${q(e)}`:"")),Z=(e,t)=>!Object.is(e,t),Y=(e,t)=>{for(let n=0;n<e.length;n++)e[n](t);},Q=(e,t,n)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:n});},X=e=>{const t=parseFloat(e);return isNaN(t)?e:t},ee=e=>{const t=R(e)?Number(e):NaN;return isNaN(t)?e:t};let te;let ne;class oe{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this.parent=ne,!e&&ne&&(this.index=(ne.scopes||(ne.scopes=[])).push(this)-1);}get active(){return this._active}run(e){if(this._active){const t=ne;try{return ne=this,e()}finally{ne=t;}}}on(){ne=this;}off(){ne=this.parent;}stop(e){if(this._active){let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);if(!this.detached&&this.parent&&!e){const e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index);}this.parent=void 0,this._active=!1;}}}function re(e,t=ne){t&&t.active&&t.effects.push(e);}function se(){return ne}const ie=e=>{const t=new Set(e);return t.w=0,t.n=0,t},le=e=>(e.w&pe)>0,ce=e=>(e.n&pe)>0,ae=new WeakMap;let ue=0,pe=1;let fe;const de=Symbol(""),he=Symbol("");class me{constructor(e,t=null,n){this.fn=e,this.scheduler=t,this.active=!0,this.deps=[],this.parent=void 0,re(this,n);}run(){if(!this.active)return this.fn();let e=fe,t=ve;for(;e;){if(e===this)return;e=e.parent;}try{return this.parent=fe,fe=this,ve=!0,pe=1<<++ue,ue<=30?(({deps:e})=>{if(e.length)for(let t=0;t<e.length;t++)e[t].w|=pe;})(this):ge(this),this.fn()}finally{ue<=30&&(e=>{const{deps:t}=e;if(t.length){let n=0;for(let o=0;o<t.length;o++){const r=t[o];le(r)&&!ce(r)?r.delete(e):t[n++]=r,r.w&=~pe,r.n&=~pe;}t.length=n;}})(this),pe=1<<--ue,fe=this.parent,ve=t,this.parent=void 0,this.deferStop&&this.stop();}}stop(){fe===this?this.deferStop=!0:this.active&&(ge(this),this.onStop&&this.onStop(),this.active=!1);}}function ge(e){const{deps:t}=e;if(t.length){for(let n=0;n<t.length;n++)t[n].delete(e);t.length=0;}}let ve=!0;const ye=[];function _e(){ye.push(ve),ve=!1;}function be(){const e=ye.pop();ve=void 0===e||e;}function Se(e,t,n){if(ve&&fe){let t=ae.get(e);t||ae.set(e,t=new Map);let o=t.get(n);o||t.set(n,o=ie()),xe(o);}}function xe(e,t){let n=!1;ue<=30?ce(e)||(e.n|=pe,n=!le(e)):n=!e.has(fe),n&&(e.add(fe),fe.deps.push(e));}function Ce(e,t,n,o,r,s){const i=ae.get(e);if(!i)return;let l=[];if("clear"===t)l=[...i.values()];else if("length"===n&&E(e)){const e=Number(o);i.forEach(((t,n)=>{("length"===n||n>=e)&&l.push(t);}));}else switch(void 0!==n&&l.push(i.get(n)),t){case"add":E(e)?j(n)&&l.push(i.get("length")):(l.push(i.get(de)),O(e)&&l.push(i.get(he)));break;case"delete":E(e)||(l.push(i.get(de)),O(e)&&l.push(i.get(he)));break;case"set":O(e)&&l.push(i.get(de));}if(1===l.length)l[0]&&ke(l[0]);else {const e=[];for(const t of l)t&&e.push(...t);ke(ie(e));}}function ke(e,t){const n=E(e)?e:[...e];for(const o of n)o.computed&&we(o);for(const o of n)o.computed||we(o);}function we(e,t){(e!==fe||e.allowRecurse)&&(e.scheduler?e.scheduler():e.run());}const Te=t("__proto__,__v_isRef,__isVue"),Ne=new Set(Object.getOwnPropertyNames(Symbol).filter((e=>"arguments"!==e&&"caller"!==e)).map((e=>Symbol[e])).filter($)),Ee=Me(),Oe=Me(!1,!0),Ae=Me(!0),Fe=Me(!0,!0),Pe=Re();function Re(){const e={};return ["includes","indexOf","lastIndexOf"].forEach((t=>{e[t]=function(...e){const n=xt(this);for(let t=0,r=this.length;t<r;t++)Se(n,0,t+"");const o=n[t](...e);return -1===o||!1===o?n[t](...e.map(xt)):o};})),["push","pop","shift","unshift","splice"].forEach((t=>{e[t]=function(...e){_e();const n=xt(this)[t].apply(this,e);return be(),n};})),e}function $e(e){const t=xt(this);return Se(t,0,e),t.hasOwnProperty(e)}function Me(e=!1,t=!1){return function(n,o,r){if("__v_isReactive"===o)return !e;if("__v_isReadonly"===o)return e;if("__v_isShallow"===o)return t;if("__v_raw"===o&&r===(e?t?ft:pt:t?ut:at).get(n))return n;const s=E(n);if(!e){if(s&&N(Pe,o))return Reflect.get(Pe,o,r);if("hasOwnProperty"===o)return $e}const i=Reflect.get(n,o,r);return ($(o)?Ne.has(o):Te(o))?i:(e||Se(n,0,o),t?i:Et(i)?s&&j(o)?i:i.value:M(i)?e?gt(i):ht(i):i)}}function Ve(e=!1){return function(t,n,o,r){let s=t[n];if(_t(s)&&Et(s)&&!Et(o))return !1;if(!e&&(bt(o)||_t(o)||(s=xt(s),o=xt(o)),!E(t)&&Et(s)&&!Et(o)))return s.value=o,!0;const i=E(t)&&j(n)?Number(n)<t.length:N(t,n),l=Reflect.set(t,n,o,r);return t===xt(r)&&(i?Z(o,s)&&Ce(t,"set",n,o):Ce(t,"add",n,o)),l}}const Ie={get:Ee,set:Ve(),deleteProperty:function(e,t){const n=N(e,t),o=Reflect.deleteProperty(e,t);return o&&n&&Ce(e,"delete",t,void 0),o},has:function(e,t){const n=Reflect.has(e,t);return $(t)&&Ne.has(t)||Se(e,0,t),n},ownKeys:function(e){return Se(e,0,E(e)?"length":de),Reflect.ownKeys(e)}},Be={get:Ae,set:(e,t)=>!0,deleteProperty:(e,t)=>!0},Le=k({},Ie,{get:Oe,set:Ve(!0)}),je=k({},Be,{get:Fe}),Ue=e=>e,De=e=>Reflect.getPrototypeOf(e);function He(e,t,n=!1,o=!1){const r=xt(e=e.__v_raw),s=xt(t);n||(t!==s&&Se(r,0,t),Se(r,0,s));const{has:i}=De(r),l=o?Ue:n?wt:kt;return i.call(r,t)?l(e.get(t)):i.call(r,s)?l(e.get(s)):void(e!==r&&e.get(t))}function We(e,t=!1){const n=this.__v_raw,o=xt(n),r=xt(e);return t||(e!==r&&Se(o,0,e),Se(o,0,r)),e===r?n.has(e):n.has(e)||n.has(r)}function ze(e,t=!1){return e=e.__v_raw,!t&&Se(xt(e),0,de),Reflect.get(e,"size",e)}function Ke(e){e=xt(e);const t=xt(this);return De(t).has.call(t,e)||(t.add(e),Ce(t,"add",e,e)),this}function Ge(e,t){t=xt(t);const n=xt(this),{has:o,get:r}=De(n);let s=o.call(n,e);s||(e=xt(e),s=o.call(n,e));const i=r.call(n,e);return n.set(e,t),s?Z(t,i)&&Ce(n,"set",e,t):Ce(n,"add",e,t),this}function qe(e){const t=xt(this),{has:n,get:o}=De(t);let r=n.call(t,e);r||(e=xt(e),r=n.call(t,e)),o&&o.call(t,e);const s=t.delete(e);return r&&Ce(t,"delete",e,void 0),s}function Je(){const e=xt(this),t=0!==e.size,n=e.clear();return t&&Ce(e,"clear",void 0,void 0),n}function Ze(e,t){return function(n,o){const r=this,s=r.__v_raw,i=xt(s),l=t?Ue:e?wt:kt;return !e&&Se(i,0,de),s.forEach(((e,t)=>n.call(o,l(e),l(t),r)))}}function Ye(e,t,n){return function(...o){const r=this.__v_raw,s=xt(r),i=O(s),l="entries"===e||e===Symbol.iterator&&i,c="keys"===e&&i,a=r[e](...o),u=n?Ue:t?wt:kt;return !t&&Se(s,0,c?he:de),{next(){const{value:e,done:t}=a.next();return t?{value:e,done:t}:{value:l?[u(e[0]),u(e[1])]:u(e),done:t}},[Symbol.iterator](){return this}}}}function Qe(e){return function(...t){return "delete"!==e&&this}}function Xe(){const e={get(e){return He(this,e)},get size(){return ze(this)},has:We,add:Ke,set:Ge,delete:qe,clear:Je,forEach:Ze(!1,!1)},t={get(e){return He(this,e,!1,!0)},get size(){return ze(this)},has:We,add:Ke,set:Ge,delete:qe,clear:Je,forEach:Ze(!1,!0)},n={get(e){return He(this,e,!0)},get size(){return ze(this,!0)},has(e){return We.call(this,e,!0)},add:Qe("add"),set:Qe("set"),delete:Qe("delete"),clear:Qe("clear"),forEach:Ze(!0,!1)},o={get(e){return He(this,e,!0,!0)},get size(){return ze(this,!0)},has(e){return We.call(this,e,!0)},add:Qe("add"),set:Qe("set"),delete:Qe("delete"),clear:Qe("clear"),forEach:Ze(!0,!0)};return ["keys","values","entries",Symbol.iterator].forEach((r=>{e[r]=Ye(r,!1,!1),n[r]=Ye(r,!0,!1),t[r]=Ye(r,!1,!0),o[r]=Ye(r,!0,!0);})),[e,n,t,o]}const[et,tt,nt,ot]=Xe();function rt(e,t){const n=t?e?ot:nt:e?tt:et;return (t,o,r)=>"__v_isReactive"===o?!e:"__v_isReadonly"===o?e:"__v_raw"===o?t:Reflect.get(N(n,o)&&o in t?n:t,o,r)}const st={get:rt(!1,!1)},it={get:rt(!1,!0)},lt={get:rt(!0,!1)},ct={get:rt(!0,!0)},at=new WeakMap,ut=new WeakMap,pt=new WeakMap,ft=new WeakMap;function dt(e){return e.__v_skip||!Object.isExtensible(e)?0:function(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}((e=>B(e).slice(8,-1))(e))}function ht(e){return _t(e)?e:vt(e,!1,Ie,st,at)}function mt(e){return vt(e,!1,Le,it,ut)}function gt(e){return vt(e,!0,Be,lt,pt)}function vt(e,t,n,o,r){if(!M(e))return e;if(e.__v_raw&&(!t||!e.__v_isReactive))return e;const s=r.get(e);if(s)return s;const i=dt(e);if(0===i)return e;const l=new Proxy(e,2===i?o:n);return r.set(e,l),l}function yt(e){return _t(e)?yt(e.__v_raw):!(!e||!e.__v_isReactive)}function _t(e){return !(!e||!e.__v_isReadonly)}function bt(e){return !(!e||!e.__v_isShallow)}function St(e){return yt(e)||_t(e)}function xt(e){const t=e&&e.__v_raw;return t?xt(t):e}function Ct(e){return Q(e,"__v_skip",!0),e}const kt=e=>M(e)?ht(e):e,wt=e=>M(e)?gt(e):e;function Tt(e){ve&&fe&&xe((e=xt(e)).dep||(e.dep=ie()));}function Nt(e,t){const n=(e=xt(e)).dep;n&&ke(n);}function Et(e){return !(!e||!0!==e.__v_isRef)}function Ot(e){return At(e,!1)}function At(e,t){return Et(e)?e:new Ft(e,t)}class Ft{constructor(e,t){this.__v_isShallow=t,this.dep=void 0,this.__v_isRef=!0,this._rawValue=t?e:xt(e),this._value=t?e:kt(e);}get value(){return Tt(this),this._value}set value(e){const t=this.__v_isShallow||bt(e)||_t(e);e=t?e:xt(e),Z(e,this._rawValue)&&(this._rawValue=e,this._value=t?e:kt(e),Nt(this));}}function Pt(e){return Et(e)?e.value:e}const Rt={get:(e,t,n)=>Pt(Reflect.get(e,t,n)),set:(e,t,n,o)=>{const r=e[t];return Et(r)&&!Et(n)?(r.value=n,!0):Reflect.set(e,t,n,o)}};function $t(e){return yt(e)?e:new Proxy(e,Rt)}class Mt{constructor(e){this.dep=void 0,this.__v_isRef=!0;const{get:t,set:n}=e((()=>Tt(this)),(()=>Nt(this)));this._get=t,this._set=n;}get value(){return this._get()}set value(e){this._set(e);}}class Vt{constructor(e,t,n){this._object=e,this._key=t,this._defaultValue=n,this.__v_isRef=!0;}get value(){const e=this._object[this._key];return void 0===e?this._defaultValue:e}set value(e){this._object[this._key]=e;}get dep(){return function(e,t){var n;return null===(n=ae.get(e))||void 0===n?void 0:n.get(t)}(xt(this._object),this._key)}}function It(e,t,n){const o=e[t];return Et(o)?o:new Vt(e,t,n)}var Bt;class Lt{constructor(e,t,n,o){this._setter=t,this.dep=void 0,this.__v_isRef=!0,this[Bt]=!1,this._dirty=!0,this.effect=new me(e,(()=>{this._dirty||(this._dirty=!0,Nt(this));})),this.effect.computed=this,this.effect.active=this._cacheable=!o,this.__v_isReadonly=n;}get value(){const e=xt(this);return Tt(e),!e._dirty&&e._cacheable||(e._dirty=!1,e._value=e.effect.run()),e._value}set value(e){this._setter(e);}}function jt(e,t,n,o){let r;try{r=o?e(...o):e();}catch(s){Dt(s,t,n);}return r}function Ut(e,t,n,o){if(P(e)){const r=jt(e,t,n,o);return r&&V(r)&&r.catch((e=>{Dt(e,t,n);})),r}const r=[];for(let s=0;s<e.length;s++)r.push(Ut(e[s],t,n,o));return r}function Dt(e,t,n,o=!0){if(t){let o=t.parent;const r=t.proxy,s=n;for(;o;){const t=o.ec;if(t)for(let n=0;n<t.length;n++)if(!1===t[n](e,r,s))return;o=o.parent;}const i=t.appContext.config.errorHandler;if(i)return void jt(i,null,10,[e,r,s])}!function(e,t,n,o=!0){console.error(e);}(e,0,0,o);}Bt="__v_isReadonly";let Ht=!1,Wt=!1;const zt=[];let Kt=0;const Gt=[];let qt=null,Jt=0;const Zt=Promise.resolve();let Yt=null;function Qt(e){const t=Yt||Zt;return e?t.then(this?e.bind(this):e):t}function Xt(e){zt.length&&zt.includes(e,Ht&&e.allowRecurse?Kt+1:Kt)||(null==e.id?zt.push(e):zt.splice(function(e){let t=Kt+1,n=zt.length;for(;t<n;){const o=t+n>>>1;rn(zt[o])<e?t=o+1:n=o;}return t}(e.id),0,e),en());}function en(){Ht||Wt||(Wt=!0,Yt=Zt.then(ln));}function tn(e){E(e)?Gt.push(...e):qt&&qt.includes(e,e.allowRecurse?Jt+1:Jt)||Gt.push(e),en();}function nn(e,t=(Ht?Kt+1:0)){for(;t<zt.length;t++){const e=zt[t];e&&e.pre&&(zt.splice(t,1),t--,e());}}function on(e){if(Gt.length){const e=[...new Set(Gt)];if(Gt.length=0,qt)return void qt.push(...e);for(qt=e,qt.sort(((e,t)=>rn(e)-rn(t))),Jt=0;Jt<qt.length;Jt++)qt[Jt]();qt=null,Jt=0;}}const rn=e=>null==e.id?1/0:e.id,sn=(e,t)=>{const n=rn(e)-rn(t);if(0===n){if(e.pre&&!t.pre)return -1;if(t.pre&&!e.pre)return 1}return n};function ln(e){Wt=!1,Ht=!0,zt.sort(sn);try{for(Kt=0;Kt<zt.length;Kt++){const e=zt[Kt];e&&!1!==e.active&&jt(e,null,14);}}finally{Kt=0,zt.length=0,on(),Ht=!1,Yt=null,(zt.length||Gt.length)&&ln();}}e.devtools=void 0;let cn=[];function an(e,t,...n){if(e.isUnmounted)return;const o=e.vnode.props||v;let r=n;const s=t.startsWith("update:"),i=s&&t.slice(7);if(i&&i in o){const e=`${"modelValue"===i?"model":i}Modifiers`,{number:t,trim:s}=o[e]||v;s&&(r=n.map((e=>R(e)?e.trim():e))),t&&(r=n.map(X));}let l,c=o[l=J(t)]||o[l=J(z(t))];!c&&s&&(c=o[l=J(G(t))]),c&&Ut(c,e,6,r);const a=o[l+"Once"];if(a){if(e.emitted){if(e.emitted[l])return}else e.emitted={};e.emitted[l]=!0,Ut(a,e,6,r);}}function un(e,t,n=!1){const o=t.emitsCache,r=o.get(e);if(void 0!==r)return r;const s=e.emits;let i={},l=!1;if(!P(e)){const o=e=>{const n=un(e,t,!0);n&&(l=!0,k(i,n));};!n&&t.mixins.length&&t.mixins.forEach(o),e.extends&&o(e.extends),e.mixins&&e.mixins.forEach(o);}return s||l?(E(s)?s.forEach((e=>i[e]=null)):k(i,s),M(e)&&o.set(e,i),i):(M(e)&&o.set(e,null),null)}function pn(e,t){return !(!e||!x(t))&&(t=t.slice(2).replace(/Once$/,""),N(e,t[0].toLowerCase()+t.slice(1))||N(e,G(t))||N(e,t))}let fn=null,dn=null;function hn(e){const t=fn;return fn=e,dn=e&&e.type.__scopeId||null,t}function mn(e,t=fn,n){if(!t)return e;if(e._n)return e;const o=(...n)=>{o._d&&Tr(-1);const r=hn(t);let s;try{s=e(...n);}finally{hn(r),o._d&&Tr(1);}return s};return o._n=!0,o._c=!0,o._d=!0,o}function gn(e){const{type:t,vnode:n,proxy:o,withProxy:r,props:s,propsOptions:[i],slots:l,attrs:c,emit:a,render:u,renderCache:p,data:f,setupState:d,ctx:h,inheritAttrs:m}=e;let g,v;const y=hn(e);try{if(4&n.shapeFlag){const e=r||o;g=Lr(u.call(e,e,p,s,d,f,h)),v=c;}else {const e=t;0,g=Lr(e(s,e.length>1?{attrs:c,slots:l,emit:a}:null)),v=t.props?c:vn(c);}}catch(b){Sr.length=0,Dt(b,e,1),g=Mr(_r);}let _=g;if(v&&!1!==m){const e=Object.keys(v),{shapeFlag:t}=_;e.length&&7&t&&(i&&e.some(C)&&(v=yn(v,i)),_=Ir(_,v));}return n.dirs&&(_=Ir(_),_.dirs=_.dirs?_.dirs.concat(n.dirs):n.dirs),n.transition&&(_.transition=n.transition),g=_,hn(y),g}const vn=e=>{let t;for(const n in e)("class"===n||"style"===n||x(n))&&((t||(t={}))[n]=e[n]);return t},yn=(e,t)=>{const n={};for(const o in e)C(o)&&o.slice(9)in t||(n[o]=e[o]);return n};function _n(e,t,n){const o=Object.keys(t);if(o.length!==Object.keys(e).length)return !0;for(let r=0;r<o.length;r++){const s=o[r];if(t[s]!==e[s]&&!pn(n,s))return !0}return !1}function bn({vnode:e,parent:t},n){for(;t&&t.subTree===e;)(e=t.vnode).el=n,t=t.parent;}const Sn=e=>e.__isSuspense,xn={name:"Suspense",__isSuspense:!0,process(e,t,n,o,r,s,i,l,c,a){null==e?function(e,t,n,o,r,s,i,l,c){const{p:a,o:{createElement:u}}=c,p=u("div"),f=e.suspense=kn(e,r,o,t,p,n,s,i,l,c);a(null,f.pendingBranch=e.ssContent,p,null,o,f,s,i),f.deps>0?(Cn(e,"onPending"),Cn(e,"onFallback"),a(null,e.ssFallback,t,n,o,null,s,i),Nn(f,e.ssFallback)):f.resolve();}(t,n,o,r,s,i,l,c,a):function(e,t,n,o,r,s,i,l,{p:c,um:a,o:{createElement:u}}){const p=t.suspense=e.suspense;p.vnode=t,t.el=e.el;const f=t.ssContent,d=t.ssFallback,{activeBranch:h,pendingBranch:m,isInFallback:g,isHydrating:v}=p;if(m)p.pendingBranch=f,Ar(f,m)?(c(m,f,p.hiddenContainer,null,r,p,s,i,l),p.deps<=0?p.resolve():g&&(c(h,d,n,o,r,null,s,i,l),Nn(p,d))):(p.pendingId++,v?(p.isHydrating=!1,p.activeBranch=m):a(m,r,p),p.deps=0,p.effects.length=0,p.hiddenContainer=u("div"),g?(c(null,f,p.hiddenContainer,null,r,p,s,i,l),p.deps<=0?p.resolve():(c(h,d,n,o,r,null,s,i,l),Nn(p,d))):h&&Ar(f,h)?(c(h,f,n,o,r,p,s,i,l),p.resolve(!0)):(c(null,f,p.hiddenContainer,null,r,p,s,i,l),p.deps<=0&&p.resolve()));else if(h&&Ar(f,h))c(h,f,n,o,r,p,s,i,l),Nn(p,f);else if(Cn(t,"onPending"),p.pendingBranch=f,p.pendingId++,c(null,f,p.hiddenContainer,null,r,p,s,i,l),p.deps<=0)p.resolve();else {const{timeout:e,pendingId:t}=p;e>0?setTimeout((()=>{p.pendingId===t&&p.fallback(d);}),e):0===e&&p.fallback(d);}}(e,t,n,o,r,i,l,c,a);},hydrate:function(e,t,n,o,r,s,i,l,c){const a=t.suspense=kn(t,o,n,e.parentNode,document.createElement("div"),null,r,s,i,l,!0),u=c(e,a.pendingBranch=t.ssContent,n,a,s,i);0===a.deps&&a.resolve();return u},create:kn,normalize:function(e){const{shapeFlag:t,children:n}=e,o=32&t;e.ssContent=wn(o?n.default:n),e.ssFallback=o?wn(n.fallback):Mr(_r);}};function Cn(e,t){const n=e.props&&e.props[t];P(n)&&n();}function kn(e,t,n,o,r,s,i,l,c,a,u=!1){const{p:p,m:f,um:d,n:h,o:{parentNode:m,remove:g}}=a,v=e.props?ee(e.props.timeout):void 0,y={vnode:e,parent:t,parentComponent:n,isSVG:i,container:o,hiddenContainer:r,anchor:s,deps:0,pendingId:0,timeout:"number"==typeof v?v:-1,activeBranch:null,pendingBranch:null,isInFallback:!0,isHydrating:u,isUnmounted:!1,effects:[],resolve(e=!1){const{vnode:t,activeBranch:n,pendingBranch:o,pendingId:r,effects:s,parentComponent:i,container:l}=y;if(y.isHydrating)y.isHydrating=!1;else if(!e){const e=n&&o.transition&&"out-in"===o.transition.mode;e&&(n.transition.afterLeave=()=>{r===y.pendingId&&f(o,l,t,0);});let{anchor:t}=y;n&&(t=h(n),d(n,i,y,!0)),e||f(o,l,t,0);}Nn(y,o),y.pendingBranch=null,y.isInFallback=!1;let c=y.parent,a=!1;for(;c;){if(c.pendingBranch){c.effects.push(...s),a=!0;break}c=c.parent;}a||tn(s),y.effects=[],Cn(t,"onResolve");},fallback(e){if(!y.pendingBranch)return;const{vnode:t,activeBranch:n,parentComponent:o,container:r,isSVG:s}=y;Cn(t,"onFallback");const i=h(n),a=()=>{y.isInFallback&&(p(null,e,r,i,o,null,s,l,c),Nn(y,e));},u=e.transition&&"out-in"===e.transition.mode;u&&(n.transition.afterLeave=a),y.isInFallback=!0,d(n,o,null,!0),u||a();},move(e,t,n){y.activeBranch&&f(y.activeBranch,e,t,n),y.container=e;},next:()=>y.activeBranch&&h(y.activeBranch),registerDep(e,t){const n=!!y.pendingBranch;n&&y.deps++;const o=e.vnode.el;e.asyncDep.catch((t=>{Dt(t,e,0);})).then((r=>{if(e.isUnmounted||y.isUnmounted||y.pendingId!==e.suspenseId)return;e.asyncResolved=!0;const{vnode:s}=e;es(e,r,!1),o&&(s.el=o);const l=!o&&e.subTree.el;t(e,s,m(o||e.subTree.el),o?null:h(e.subTree),y,i,c),l&&g(l),bn(e,s.el),n&&0==--y.deps&&y.resolve();}));},unmount(e,t){y.isUnmounted=!0,y.activeBranch&&d(y.activeBranch,n,e,t),y.pendingBranch&&d(y.pendingBranch,n,e,t);}};return y}function wn(e){let t;if(P(e)){const n=wr&&e._c;n&&(e._d=!1,Cr()),e=e(),n&&(e._d=!0,t=xr,kr());}if(E(e)){const t=function(e){let t;for(let n=0;n<e.length;n++){const o=e[n];if(!Or(o))return;if(o.type!==_r||"v-if"===o.children){if(t)return;t=o;}}return t}(e);e=t;}return e=Lr(e),t&&!e.dynamicChildren&&(e.dynamicChildren=t.filter((t=>t!==e))),e}function Tn(e,t){t&&t.pendingBranch?E(e)?t.effects.push(...e):t.effects.push(e):tn(e);}function Nn(e,t){e.activeBranch=t;const{vnode:n,parentComponent:o}=e,r=n.el=t.el;o&&o.subTree===n&&(o.vnode.el=r,bn(o,r));}function En(e,t){if(Kr){let n=Kr.provides;const o=Kr.parent&&Kr.parent.provides;o===n&&(n=Kr.provides=Object.create(o)),n[e]=t;}}function On(e,t,n=!1){const o=Kr||fn;if(o){const r=null==o.parent?o.vnode.appContext&&o.vnode.appContext.provides:o.parent.provides;if(r&&e in r)return r[e];if(arguments.length>1)return n&&P(t)?t.call(o.proxy):t}}function An(e,t){return Rn(e,null,{flush:"post"})}const Fn={};function Pn(e,t,n){return Rn(e,t,n)}function Rn(e,t,{immediate:n,deep:o,flush:r}=v){const s=se()===(null==Kr?void 0:Kr.scope)?Kr:null;let i,l,c=!1,a=!1;if(Et(e)?(i=()=>e.value,c=bt(e)):yt(e)?(i=()=>e,o=!0):E(e)?(a=!0,c=e.some((e=>yt(e)||bt(e))),i=()=>e.map((e=>Et(e)?e.value:yt(e)?Vn(e):P(e)?jt(e,s,2):void 0))):i=P(e)?t?()=>jt(e,s,2):()=>{if(!s||!s.isUnmounted)return l&&l(),Ut(e,s,3,[u])}:_,t&&o){const e=i;i=()=>Vn(e());}let u=e=>{l=h.onStop=()=>{jt(e,s,4);};},p=a?new Array(e.length).fill(Fn):Fn;const f=()=>{if(h.active)if(t){const e=h.run();(o||c||(a?e.some(((e,t)=>Z(e,p[t]))):Z(e,p)))&&(l&&l(),Ut(t,s,3,[e,p===Fn?void 0:a&&p[0]===Fn?[]:p,u]),p=e);}else h.run();};let d;f.allowRecurse=!!t,"sync"===r?d=f:"post"===r?d=()=>sr(f,s&&s.suspense):(f.pre=!0,s&&(f.id=s.uid),d=()=>Xt(f));const h=new me(i,d);t?n?f():p=h.run():"post"===r?sr(h.run.bind(h),s&&s.suspense):h.run();return ()=>{h.stop(),s&&s.scope&&w(s.scope.effects,h);}}function $n(e,t,n){const o=this.proxy,r=R(e)?e.includes(".")?Mn(o,e):()=>o[e]:e.bind(o,o);let s;P(t)?s=t:(s=t.handler,n=t);const i=Kr;qr(this);const l=Rn(r,s.bind(o),n);return i?qr(i):Jr(),l}function Mn(e,t){const n=t.split(".");return ()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}function Vn(e,t){if(!M(e)||e.__v_skip)return e;if((t=t||new Set).has(e))return e;if(t.add(e),Et(e))Vn(e.value,t);else if(E(e))for(let n=0;n<e.length;n++)Vn(e[n],t);else if(A(e)||O(e))e.forEach((e=>{Vn(e,t);}));else if(L(e))for(const n in e)Vn(e[n],t);return e}function In(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return lo((()=>{e.isMounted=!0;})),uo((()=>{e.isUnmounting=!0;})),e}const Bn=[Function,Array],Ln={name:"BaseTransition",props:{mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:Bn,onEnter:Bn,onAfterEnter:Bn,onEnterCancelled:Bn,onBeforeLeave:Bn,onLeave:Bn,onAfterLeave:Bn,onLeaveCancelled:Bn,onBeforeAppear:Bn,onAppear:Bn,onAfterAppear:Bn,onAppearCancelled:Bn},setup(e,{slots:t}){const n=Gr(),o=In();let r;return ()=>{const s=t.default&&zn(t.default(),!0);if(!s||!s.length)return;let i=s[0];if(s.length>1)for(const e of s)if(e.type!==_r){i=e;break}const l=xt(e),{mode:c}=l;if(o.isLeaving)return Dn(i);const a=Hn(i);if(!a)return Dn(i);const u=Un(a,l,o,n);Wn(a,u);const p=n.subTree,f=p&&Hn(p);let d=!1;const{getTransitionKey:h}=a.type;if(h){const e=h();void 0===r?r=e:e!==r&&(r=e,d=!0);}if(f&&f.type!==_r&&(!Ar(a,f)||d)){const e=Un(f,l,o,n);if(Wn(f,e),"out-in"===c)return o.isLeaving=!0,e.afterLeave=()=>{o.isLeaving=!1,!1!==n.update.active&&n.update();},Dn(i);"in-out"===c&&a.type!==_r&&(e.delayLeave=(e,t,n)=>{jn(o,f)[String(f.key)]=f,e._leaveCb=()=>{t(),e._leaveCb=void 0,delete u.delayedLeave;},u.delayedLeave=n;});}return i}}};function jn(e,t){const{leavingVNodes:n}=e;let o=n.get(t.type);return o||(o=Object.create(null),n.set(t.type,o)),o}function Un(e,t,n,o){const{appear:r,mode:s,persisted:i=!1,onBeforeEnter:l,onEnter:c,onAfterEnter:a,onEnterCancelled:u,onBeforeLeave:p,onLeave:f,onAfterLeave:d,onLeaveCancelled:h,onBeforeAppear:m,onAppear:g,onAfterAppear:v,onAppearCancelled:y}=t,_=String(e.key),b=jn(n,e),S=(e,t)=>{e&&Ut(e,o,9,t);},x=(e,t)=>{const n=t[1];S(e,t),E(e)?e.every((e=>e.length<=1))&&n():e.length<=1&&n();},C={mode:s,persisted:i,beforeEnter(t){let o=l;if(!n.isMounted){if(!r)return;o=m||l;}t._leaveCb&&t._leaveCb(!0);const s=b[_];s&&Ar(e,s)&&s.el._leaveCb&&s.el._leaveCb(),S(o,[t]);},enter(e){let t=c,o=a,s=u;if(!n.isMounted){if(!r)return;t=g||c,o=v||a,s=y||u;}let i=!1;const l=e._enterCb=t=>{i||(i=!0,S(t?s:o,[e]),C.delayedLeave&&C.delayedLeave(),e._enterCb=void 0);};t?x(t,[e,l]):l();},leave(t,o){const r=String(e.key);if(t._enterCb&&t._enterCb(!0),n.isUnmounting)return o();S(p,[t]);let s=!1;const i=t._leaveCb=n=>{s||(s=!0,o(),S(n?h:d,[t]),t._leaveCb=void 0,b[r]===e&&delete b[r]);};b[r]=e,f?x(f,[t,i]):i();},clone:e=>Un(e,t,n,o)};return C}function Dn(e){if(Jn(e))return (e=Ir(e)).children=null,e}function Hn(e){return Jn(e)?e.children?e.children[0]:void 0:e}function Wn(e,t){6&e.shapeFlag&&e.component?Wn(e.component.subTree,t):128&e.shapeFlag?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t;}function zn(e,t=!1,n){let o=[],r=0;for(let s=0;s<e.length;s++){let i=e[s];const l=null==n?i.key:String(n)+String(null!=i.key?i.key:s);i.type===vr?(128&i.patchFlag&&r++,o=o.concat(zn(i.children,t,l))):(t||i.type!==_r)&&o.push(null!=l?Ir(i,{key:l}):i);}if(r>1)for(let s=0;s<o.length;s++)o[s].patchFlag=-2;return o}function Kn(e){return P(e)?{setup:e,name:e.name}:e}const Gn=e=>!!e.type.__asyncLoader;function qn(e,t){const{ref:n,props:o,children:r,ce:s}=t.vnode,i=Mr(e,o,r);return i.ref=n,i.ce=s,delete t.vnode.ce,i}const Jn=e=>e.type.__isKeepAlive,Zn={name:"KeepAlive",__isKeepAlive:!0,props:{include:[String,RegExp,Array],exclude:[String,RegExp,Array],max:[String,Number]},setup(e,{slots:t}){const n=Gr(),o=n.ctx,r=new Map,s=new Set;let i=null;const l=n.suspense,{renderer:{p:c,m:a,um:u,o:{createElement:p}}}=o,f=p("div");function d(e){no(e),u(e,n,l,!0);}function h(e){r.forEach(((t,n)=>{const o=ss(t.type);!o||e&&e(o)||m(n);}));}function m(e){const t=r.get(e);i&&Ar(t,i)?i&&no(i):d(t),r.delete(e),s.delete(e);}o.activate=(e,t,n,o,r)=>{const s=e.component;a(e,t,n,0,l),c(s.vnode,e,t,n,s,l,o,e.slotScopeIds,r),sr((()=>{s.isDeactivated=!1,s.a&&Y(s.a);const t=e.props&&e.props.onVnodeMounted;t&&Hr(t,s.parent,e);}),l);},o.deactivate=e=>{const t=e.component;a(e,f,null,1,l),sr((()=>{t.da&&Y(t.da);const n=e.props&&e.props.onVnodeUnmounted;n&&Hr(n,t.parent,e),t.isDeactivated=!0;}),l);},Pn((()=>[e.include,e.exclude]),(([e,t])=>{e&&h((t=>Yn(e,t))),t&&h((e=>!Yn(t,e)));}),{flush:"post",deep:!0});let g=null;const v=()=>{null!=g&&r.set(g,oo(n.subTree));};return lo(v),ao(v),uo((()=>{r.forEach((e=>{const{subTree:t,suspense:o}=n,r=oo(t);if(e.type!==r.type||e.key!==r.key)d(e);else {no(r);const e=r.component.da;e&&sr(e,o);}}));})),()=>{if(g=null,!t.default)return null;const n=t.default(),o=n[0];if(n.length>1)return i=null,n;if(!(Or(o)&&(4&o.shapeFlag||128&o.shapeFlag)))return i=null,o;let l=oo(o);const c=l.type,a=ss(Gn(l)?l.type.__asyncResolved||{}:c),{include:u,exclude:p,max:f}=e;if(u&&(!a||!Yn(u,a))||p&&a&&Yn(p,a))return i=l,o;const d=null==l.key?c:l.key,h=r.get(d);return l.el&&(l=Ir(l),128&o.shapeFlag&&(o.ssContent=l)),g=d,h?(l.el=h.el,l.component=h.component,l.transition&&Wn(l,l.transition),l.shapeFlag|=512,s.delete(d),s.add(d)):(s.add(d),f&&s.size>parseInt(f,10)&&m(s.values().next().value)),l.shapeFlag|=256,i=l,Sn(o.type)?o:l}}};function Yn(e,t){return E(e)?e.some((e=>Yn(e,t))):R(e)?e.split(",").includes(t):"[object RegExp]"===B(e)&&e.test(t)}function Qn(e,t){eo(e,"a",t);}function Xn(e,t){eo(e,"da",t);}function eo(e,t,n=Kr){const o=e.__wdc||(e.__wdc=()=>{let t=n;for(;t;){if(t.isDeactivated)return;t=t.parent;}return e()});if(ro(t,o,n),n){let e=n.parent;for(;e&&e.parent;)Jn(e.parent.vnode)&&to(o,t,n,e),e=e.parent;}}function to(e,t,n,o){const r=ro(t,e,o,!0);po((()=>{w(o[t],r);}),n);}function no(e){e.shapeFlag&=-257,e.shapeFlag&=-513;}function oo(e){return 128&e.shapeFlag?e.ssContent:e}function ro(e,t,n=Kr,o=!1){if(n){const r=n[e]||(n[e]=[]),s=t.__weh||(t.__weh=(...o)=>{if(n.isUnmounted)return;_e(),qr(n);const r=Ut(t,n,e,o);return Jr(),be(),r});return o?r.unshift(s):r.push(s),s}}const so=e=>(t,n=Kr)=>(!Xr||"sp"===e)&&ro(e,((...e)=>t(...e)),n),io=so("bm"),lo=so("m"),co=so("bu"),ao=so("u"),uo=so("bum"),po=so("um"),fo=so("sp"),ho=so("rtg"),mo=so("rtc");function go(e,t=Kr){ro("ec",e,t);}function vo(e,t,n,o){const r=e.dirs,s=t&&t.dirs;for(let i=0;i<r.length;i++){const l=r[i];s&&(l.oldValue=s[i].value);let c=l.dir[o];c&&(_e(),Ut(c,n,8,[e.el,l,e,t]),be());}}const yo="components";const _o=Symbol();function bo(e,t,n=!0,o=!1){const r=fn||Kr;if(r){const n=r.type;if(e===yo){const e=ss(n,!1);if(e&&(e===t||e===z(t)||e===q(z(t))))return n}const s=So(r[e]||n[e],t)||So(r.appContext[e],t);return !s&&o?n:s}}function So(e,t){return e&&(e[t]||e[z(t)]||e[q(z(t))])}function xo(e){return e.some((e=>!Or(e)||e.type!==_r&&!(e.type===vr&&!xo(e.children))))?e:null}const Co=e=>e?Zr(e)?rs(e)||e.proxy:Co(e.parent):null,ko=k(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Co(e.parent),$root:e=>Co(e.root),$emit:e=>e.emit,$options:e=>Po(e),$forceUpdate:e=>e.f||(e.f=()=>Xt(e.update)),$nextTick:e=>e.n||(e.n=Qt.bind(e.proxy)),$watch:e=>$n.bind(e)}),wo=(e,t)=>e!==v&&!e.__isScriptSetup&&N(e,t),To={get({_:e},t){const{ctx:n,setupState:o,data:r,props:s,accessCache:i,type:l,appContext:c}=e;let a;if("$"!==t[0]){const l=i[t];if(void 0!==l)switch(l){case 1:return o[t];case 2:return r[t];case 4:return n[t];case 3:return s[t]}else {if(wo(o,t))return i[t]=1,o[t];if(r!==v&&N(r,t))return i[t]=2,r[t];if((a=e.propsOptions[0])&&N(a,t))return i[t]=3,s[t];if(n!==v&&N(n,t))return i[t]=4,n[t];Eo&&(i[t]=0);}}const u=ko[t];let p,f;return u?("$attrs"===t&&Se(e,0,t),u(e)):(p=l.__cssModules)&&(p=p[t])?p:n!==v&&N(n,t)?(i[t]=4,n[t]):(f=c.config.globalProperties,N(f,t)?f[t]:void 0)},set({_:e},t,n){const{data:o,setupState:r,ctx:s}=e;return wo(r,t)?(r[t]=n,!0):o!==v&&N(o,t)?(o[t]=n,!0):!N(e.props,t)&&(("$"!==t[0]||!(t.slice(1)in e))&&(s[t]=n,!0))},has({_:{data:e,setupState:t,accessCache:n,ctx:o,appContext:r,propsOptions:s}},i){let l;return !!n[i]||e!==v&&N(e,i)||wo(t,i)||(l=s[0])&&N(l,i)||N(o,i)||N(ko,i)||N(r.config.globalProperties,i)},defineProperty(e,t,n){return null!=n.get?e._.accessCache[t]=0:N(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}},No=k({},To,{get(e,t){if(t!==Symbol.unscopables)return To.get(e,t,e)},has:(e,t)=>"_"!==t[0]&&!n(t)});let Eo=!0;function Oo(e){const t=Po(e),n=e.proxy,o=e.ctx;Eo=!1,t.beforeCreate&&Ao(t.beforeCreate,e,"bc");const{data:r,computed:s,methods:i,watch:l,provide:c,inject:a,created:u,beforeMount:p,mounted:f,beforeUpdate:d,updated:h,activated:m,deactivated:g,beforeUnmount:v,unmounted:y,render:b,renderTracked:S,renderTriggered:x,errorCaptured:C,serverPrefetch:k,expose:w,inheritAttrs:T,components:N,directives:O}=t;if(a&&function(e,t,n=_,o=!1){E(e)&&(e=Vo(e));for(const r in e){const n=e[r];let s;s=M(n)?"default"in n?On(n.from||r,n.default,!0):On(n.from||r):On(n),Et(s)&&o?Object.defineProperty(t,r,{enumerable:!0,configurable:!0,get:()=>s.value,set:e=>s.value=e}):t[r]=s;}}(a,o,null,e.appContext.config.unwrapInjectedRef),i)for(const _ in i){const e=i[_];P(e)&&(o[_]=e.bind(n));}if(r){const t=r.call(n,n);M(t)&&(e.data=ht(t));}if(Eo=!0,s)for(const E in s){const e=s[E],t=P(e)?e.bind(n,n):P(e.get)?e.get.bind(n,n):_,r=!P(e)&&P(e.set)?e.set.bind(n):_,i=is({get:t,set:r});Object.defineProperty(o,E,{enumerable:!0,configurable:!0,get:()=>i.value,set:e=>i.value=e});}if(l)for(const _ in l)Fo(l[_],o,n,_);if(c){const e=P(c)?c.call(n):c;Reflect.ownKeys(e).forEach((t=>{En(t,e[t]);}));}function A(e,t){E(t)?t.forEach((t=>e(t.bind(n)))):t&&e(t.bind(n));}if(u&&Ao(u,e,"c"),A(io,p),A(lo,f),A(co,d),A(ao,h),A(Qn,m),A(Xn,g),A(go,C),A(mo,S),A(ho,x),A(uo,v),A(po,y),A(fo,k),E(w))if(w.length){const t=e.exposed||(e.exposed={});w.forEach((e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t});}));}else e.exposed||(e.exposed={});b&&e.render===_&&(e.render=b),null!=T&&(e.inheritAttrs=T),N&&(e.components=N),O&&(e.directives=O);}function Ao(e,t,n){Ut(E(e)?e.map((e=>e.bind(t.proxy))):e.bind(t.proxy),t,n);}function Fo(e,t,n,o){const r=o.includes(".")?Mn(n,o):()=>n[o];if(R(e)){const n=t[e];P(n)&&Pn(r,n);}else if(P(e))Pn(r,e.bind(n));else if(M(e))if(E(e))e.forEach((e=>Fo(e,t,n,o)));else {const o=P(e.handler)?e.handler.bind(n):t[e.handler];P(o)&&Pn(r,o,e);}}function Po(e){const t=e.type,{mixins:n,extends:o}=t,{mixins:r,optionsCache:s,config:{optionMergeStrategies:i}}=e.appContext,l=s.get(t);let c;return l?c=l:r.length||n||o?(c={},r.length&&r.forEach((e=>Ro(c,e,i,!0))),Ro(c,t,i)):c=t,M(t)&&s.set(t,c),c}function Ro(e,t,n,o=!1){const{mixins:r,extends:s}=t;s&&Ro(e,s,n,!0),r&&r.forEach((t=>Ro(e,t,n,!0)));for(const i in t)if(o&&"expose"===i);else {const o=$o[i]||n&&n[i];e[i]=o?o(e[i],t[i]):t[i];}return e}const $o={data:Mo,props:Bo,emits:Bo,methods:Bo,computed:Bo,beforeCreate:Io,created:Io,beforeMount:Io,mounted:Io,beforeUpdate:Io,updated:Io,beforeDestroy:Io,beforeUnmount:Io,destroyed:Io,unmounted:Io,activated:Io,deactivated:Io,errorCaptured:Io,serverPrefetch:Io,components:Bo,directives:Bo,watch:function(e,t){if(!e)return t;if(!t)return e;const n=k(Object.create(null),e);for(const o in t)n[o]=Io(e[o],t[o]);return n},provide:Mo,inject:function(e,t){return Bo(Vo(e),Vo(t))}};function Mo(e,t){return t?e?function(){return k(P(e)?e.call(this,this):e,P(t)?t.call(this,this):t)}:t:e}function Vo(e){if(E(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function Io(e,t){return e?[...new Set([].concat(e,t))]:t}function Bo(e,t){return e?k(k(Object.create(null),e),t):t}function Lo(e,t,n,o){const[r,s]=e.propsOptions;let i,l=!1;if(t)for(let c in t){if(U(c))continue;const a=t[c];let u;r&&N(r,u=z(c))?s&&s.includes(u)?(i||(i={}))[u]=a:n[u]=a:pn(e.emitsOptions,c)||c in o&&a===o[c]||(o[c]=a,l=!0);}if(s){const t=xt(n),o=i||v;for(let i=0;i<s.length;i++){const l=s[i];n[l]=jo(r,t,l,o[l],e,!N(o,l));}}return l}function jo(e,t,n,o,r,s){const i=e[n];if(null!=i){const e=N(i,"default");if(e&&void 0===o){const e=i.default;if(i.type!==Function&&P(e)){const{propsDefaults:s}=r;n in s?o=s[n]:(qr(r),o=s[n]=e.call(null,t),Jr());}else o=e;}i[0]&&(s&&!e?o=!1:!i[1]||""!==o&&o!==G(n)||(o=!0));}return o}function Uo(e,t,n=!1){const o=t.propsCache,r=o.get(e);if(r)return r;const s=e.props,i={},l=[];let c=!1;if(!P(e)){const o=e=>{c=!0;const[n,o]=Uo(e,t,!0);k(i,n),o&&l.push(...o);};!n&&t.mixins.length&&t.mixins.forEach(o),e.extends&&o(e.extends),e.mixins&&e.mixins.forEach(o);}if(!s&&!c)return M(e)&&o.set(e,y),y;if(E(s))for(let u=0;u<s.length;u++){const e=z(s[u]);Do(e)&&(i[e]=v);}else if(s)for(const u in s){const e=z(u);if(Do(e)){const t=s[u],n=i[e]=E(t)||P(t)?{type:t}:Object.assign({},t);if(n){const t=zo(Boolean,n.type),o=zo(String,n.type);n[0]=t>-1,n[1]=o<0||t<o,(t>-1||N(n,"default"))&&l.push(e);}}}const a=[i,l];return M(e)&&o.set(e,a),a}function Do(e){return "$"!==e[0]}function Ho(e){const t=e&&e.toString().match(/^\s*(function|class) (\w+)/);return t?t[2]:null===e?"null":""}function Wo(e,t){return Ho(e)===Ho(t)}function zo(e,t){return E(t)?t.findIndex((t=>Wo(t,e))):P(t)&&Wo(t,e)?0:-1}const Ko=e=>"_"===e[0]||"$stable"===e,Go=e=>E(e)?e.map(Lr):[Lr(e)],qo=(e,t,n)=>{if(t._n)return t;const o=mn(((...e)=>Go(t(...e))),n);return o._c=!1,o},Jo=(e,t,n)=>{const o=e._ctx;for(const r in e){if(Ko(r))continue;const n=e[r];if(P(n))t[r]=qo(0,n,o);else if(null!=n){const e=Go(n);t[r]=()=>e;}}},Zo=(e,t)=>{const n=Go(t);e.slots.default=()=>n;};function Yo(){return {app:null,config:{isNativeTag:b,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Qo=0;function Xo(e,t){return function(n,o=null){P(n)||(n=Object.assign({},n)),null==o||M(o)||(o=null);const r=Yo(),s=new Set;let i=!1;const l=r.app={_uid:Qo++,_component:n,_props:o,_container:null,_context:r,_instance:null,version:ps,get config(){return r.config},set config(e){},use:(e,...t)=>(s.has(e)||(e&&P(e.install)?(s.add(e),e.install(l,...t)):P(e)&&(s.add(e),e(l,...t))),l),mixin:e=>(r.mixins.includes(e)||r.mixins.push(e),l),component:(e,t)=>t?(r.components[e]=t,l):r.components[e],directive:(e,t)=>t?(r.directives[e]=t,l):r.directives[e],mount(s,c,a){if(!i){const u=Mr(n,o);return u.appContext=r,c&&t?t(u,s):e(u,s,a),i=!0,l._container=s,s.__vue_app__=l,rs(u.component)||u.component.proxy}},unmount(){i&&(e(null,l._container),delete l._container.__vue_app__);},provide:(e,t)=>(r.provides[e]=t,l)};return l}}function er(e,t,n,o,r=!1){if(E(e))return void e.forEach(((e,s)=>er(e,t&&(E(t)?t[s]:t),n,o,r)));if(Gn(o)&&!r)return;const s=4&o.shapeFlag?rs(o.component)||o.component.proxy:o.el,i=r?null:s,{i:l,r:c}=e,a=t&&t.r,u=l.refs===v?l.refs={}:l.refs,p=l.setupState;if(null!=a&&a!==c&&(R(a)?(u[a]=null,N(p,a)&&(p[a]=null)):Et(a)&&(a.value=null)),P(c))jt(c,l,12,[i,u]);else {const t=R(c),o=Et(c);if(t||o){const l=()=>{if(e.f){const n=t?N(p,c)?p[c]:u[c]:c.value;r?E(n)&&w(n,s):E(n)?n.includes(s)||n.push(s):t?(u[c]=[s],N(p,c)&&(p[c]=u[c])):(c.value=[s],e.k&&(u[e.k]=c.value));}else t?(u[c]=i,N(p,c)&&(p[c]=i)):o&&(c.value=i,e.k&&(u[e.k]=i));};i?(l.id=-1,sr(l,n)):l();}}}let tr=!1;const nr=e=>/svg/.test(e.namespaceURI)&&"foreignObject"!==e.tagName,or=e=>8===e.nodeType;function rr(e){const{mt:t,p:n,o:{patchProp:o,createText:r,nextSibling:s,parentNode:i,remove:l,insert:c,createComment:a}}=e,u=(n,o,l,a,g,v=!1)=>{const y=or(n)&&"["===n.data,_=()=>h(n,o,l,a,g,y),{type:b,ref:S,shapeFlag:x,patchFlag:C}=o;let k=n.nodeType;o.el=n,-2===C&&(v=!1,o.dynamicChildren=null);let w=null;switch(b){case yr:3!==k?""===o.children?(c(o.el=r(""),i(n),n),w=n):w=_():(n.data!==o.children&&(tr=!0,n.data=o.children),w=s(n));break;case _r:w=8!==k||y?_():s(n);break;case br:if(y&&(k=(n=s(n)).nodeType),1===k||3===k){w=n;const e=!o.children.length;for(let t=0;t<o.staticCount;t++)e&&(o.children+=1===w.nodeType?w.outerHTML:w.data),t===o.staticCount-1&&(o.anchor=w),w=s(w);return y?s(w):w}_();break;case vr:w=y?d(n,o,l,a,g,v):_();break;default:if(1&x)w=1!==k||o.type.toLowerCase()!==n.tagName.toLowerCase()?_():p(n,o,l,a,g,v);else if(6&x){o.slotScopeIds=g;const e=i(n);if(t(o,e,null,l,a,nr(e),v),w=y?m(n):s(n),w&&or(w)&&"teleport end"===w.data&&(w=s(w)),Gn(o)){let t;y?(t=Mr(vr),t.anchor=w?w.previousSibling:e.lastChild):t=3===n.nodeType?Br(""):Mr("div"),t.el=n,o.component.subTree=t;}}else 64&x?w=8!==k?_():o.type.hydrate(n,o,l,a,g,v,e,f):128&x&&(w=o.type.hydrate(n,o,l,a,nr(i(n)),g,v,e,u));}return null!=S&&er(S,null,a,o),w},p=(e,t,n,r,s,i)=>{i=i||!!t.dynamicChildren;const{type:c,props:a,patchFlag:u,shapeFlag:p,dirs:d}=t,h="input"===c&&d||"option"===c;if(h||-1!==u){if(d&&vo(t,null,n,"created"),a)if(h||!i||48&u)for(const t in a)(h&&t.endsWith("value")||x(t)&&!U(t))&&o(e,t,null,a[t],!1,void 0,n);else a.onClick&&o(e,"onClick",null,a.onClick,!1,void 0,n);let c;if((c=a&&a.onVnodeBeforeMount)&&Hr(c,n,t),d&&vo(t,null,n,"beforeMount"),((c=a&&a.onVnodeMounted)||d)&&Tn((()=>{c&&Hr(c,n,t),d&&vo(t,null,n,"mounted");}),r),16&p&&(!a||!a.innerHTML&&!a.textContent)){let o=f(e.firstChild,t,e,n,r,s,i);for(;o;){tr=!0;const e=o;o=o.nextSibling,l(e);}}else 8&p&&e.textContent!==t.children&&(tr=!0,e.textContent=t.children);}return e.nextSibling},f=(e,t,o,r,s,i,l)=>{l=l||!!t.dynamicChildren;const c=t.children,a=c.length;for(let p=0;p<a;p++){const t=l?c[p]:c[p]=Lr(c[p]);if(e)e=u(e,t,r,s,i,l);else {if(t.type===yr&&!t.children)continue;tr=!0,n(null,t,o,null,r,s,nr(o),i);}}return e},d=(e,t,n,o,r,l)=>{const{slotScopeIds:u}=t;u&&(r=r?r.concat(u):u);const p=i(e),d=f(s(e),t,p,n,o,r,l);return d&&or(d)&&"]"===d.data?s(t.anchor=d):(tr=!0,c(t.anchor=a("]"),p,d),d)},h=(e,t,o,r,c,a)=>{if(tr=!0,t.el=null,a){const t=m(e);for(;;){const n=s(e);if(!n||n===t)break;l(n);}}const u=s(e),p=i(e);return l(e),n(null,t,p,u,o,r,nr(p),c),u},m=e=>{let t=0;for(;e;)if((e=s(e))&&or(e)&&("["===e.data&&t++,"]"===e.data)){if(0===t)return s(e);t--;}return e};return [(e,t)=>{if(!t.hasChildNodes())return n(null,e,t),on(),void(t._vnode=e);tr=!1,u(t.firstChild,e,null,null,null),on(),t._vnode=e,tr&&console.error("Hydration completed but contains mismatches.");},u]}const sr=Tn;function ir(e){return cr(e)}function lr(e){return cr(e,rr)}function cr(e,t){(te||(te="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{})).__VUE__=!0;const{insert:n,remove:o,patchProp:r,createElement:s,createText:i,createComment:l,setText:c,setElementText:a,parentNode:u,nextSibling:p,setScopeId:f=_,insertStaticContent:d}=e,h=(e,t,n,o=null,r=null,s=null,i=!1,l=null,c=!!t.dynamicChildren)=>{if(e===t)return;e&&!Ar(e,t)&&(o=J(e),D(e,r,s,!0),e=null),-2===t.patchFlag&&(c=!1,t.dynamicChildren=null);const{type:a,ref:u,shapeFlag:p}=t;switch(a){case yr:m(e,t,n,o);break;case _r:g(e,t,n,o);break;case br:null==e&&b(t,n,o,i);break;case vr:A(e,t,n,o,r,s,i,l,c);break;default:1&p?S(e,t,n,o,r,s,i,l,c):6&p?F(e,t,n,o,r,s,i,l,c):(64&p||128&p)&&a.process(e,t,n,o,r,s,i,l,c,X);}null!=u&&r&&er(u,e&&e.ref,s,t||e,!t);},m=(e,t,o,r)=>{if(null==e)n(t.el=i(t.children),o,r);else {const n=t.el=e.el;t.children!==e.children&&c(n,t.children);}},g=(e,t,o,r)=>{null==e?n(t.el=l(t.children||""),o,r):t.el=e.el;},b=(e,t,n,o)=>{[e.el,e.anchor]=d(e.children,t,n,o,e.el,e.anchor);},S=(e,t,n,o,r,s,i,l,c)=>{i=i||"svg"===t.type,null==e?x(t,n,o,r,s,i,l,c):T(e,t,r,s,i,l,c);},x=(e,t,o,i,l,c,u,p)=>{let f,d;const{type:h,props:m,shapeFlag:g,transition:v,dirs:y}=e;if(f=e.el=s(e.type,c,m&&m.is,m),8&g?a(f,e.children):16&g&&w(e.children,f,null,i,l,c&&"foreignObject"!==h,u,p),y&&vo(e,null,i,"created"),C(f,e,e.scopeId,u,i),m){for(const t in m)"value"===t||U(t)||r(f,t,null,m[t],c,e.children,i,l,q);"value"in m&&r(f,"value",null,m.value),(d=m.onVnodeBeforeMount)&&Hr(d,i,e);}y&&vo(e,null,i,"beforeMount");const _=(!l||l&&!l.pendingBranch)&&v&&!v.persisted;_&&v.beforeEnter(f),n(f,t,o),((d=m&&m.onVnodeMounted)||_||y)&&sr((()=>{d&&Hr(d,i,e),_&&v.enter(f),y&&vo(e,null,i,"mounted");}),l);},C=(e,t,n,o,r)=>{if(n&&f(e,n),o)for(let s=0;s<o.length;s++)f(e,o[s]);if(r){if(t===r.subTree){const t=r.vnode;C(e,t,t.scopeId,t.slotScopeIds,r.parent);}}},w=(e,t,n,o,r,s,i,l,c=0)=>{for(let a=c;a<e.length;a++){const c=e[a]=l?jr(e[a]):Lr(e[a]);h(null,c,t,n,o,r,s,i,l);}},T=(e,t,n,o,s,i,l)=>{const c=t.el=e.el;let{patchFlag:u,dynamicChildren:p,dirs:f}=t;u|=16&e.patchFlag;const d=e.props||v,h=t.props||v;let m;n&&ar(n,!1),(m=h.onVnodeBeforeUpdate)&&Hr(m,n,t,e),f&&vo(t,e,n,"beforeUpdate"),n&&ar(n,!0);const g=s&&"foreignObject"!==t.type;if(p?E(e.dynamicChildren,p,c,n,o,g,i):l||I(e,t,c,null,n,o,g,i,!1),u>0){if(16&u)O(c,t,d,h,n,o,s);else if(2&u&&d.class!==h.class&&r(c,"class",null,h.class,s),4&u&&r(c,"style",d.style,h.style,s),8&u){const i=t.dynamicProps;for(let t=0;t<i.length;t++){const l=i[t],a=d[l],u=h[l];u===a&&"value"!==l||r(c,l,a,u,s,e.children,n,o,q);}}1&u&&e.children!==t.children&&a(c,t.children);}else l||null!=p||O(c,t,d,h,n,o,s);((m=h.onVnodeUpdated)||f)&&sr((()=>{m&&Hr(m,n,t,e),f&&vo(t,e,n,"updated");}),o);},E=(e,t,n,o,r,s,i)=>{for(let l=0;l<t.length;l++){const c=e[l],a=t[l],p=c.el&&(c.type===vr||!Ar(c,a)||70&c.shapeFlag)?u(c.el):n;h(c,a,p,null,o,r,s,i,!0);}},O=(e,t,n,o,s,i,l)=>{if(n!==o){if(n!==v)for(const c in n)U(c)||c in o||r(e,c,n[c],null,l,t.children,s,i,q);for(const c in o){if(U(c))continue;const a=o[c],u=n[c];a!==u&&"value"!==c&&r(e,c,u,a,l,t.children,s,i,q);}"value"in o&&r(e,"value",n.value,o.value);}},A=(e,t,o,r,s,l,c,a,u)=>{const p=t.el=e?e.el:i(""),f=t.anchor=e?e.anchor:i("");let{patchFlag:d,dynamicChildren:h,slotScopeIds:m}=t;m&&(a=a?a.concat(m):m),null==e?(n(p,o,r),n(f,o,r),w(t.children,o,f,s,l,c,a,u)):d>0&&64&d&&h&&e.dynamicChildren?(E(e.dynamicChildren,h,o,s,l,c,a),(null!=t.key||s&&t===s.subTree)&&ur(e,t,!0)):I(e,t,o,f,s,l,c,a,u);},F=(e,t,n,o,r,s,i,l,c)=>{t.slotScopeIds=l,null==e?512&t.shapeFlag?r.ctx.activate(t,n,o,i,c):P(t,n,o,r,s,i,c):R(e,t,c);},P=(e,t,n,o,r,s,i)=>{const l=e.component=function(e,t,n){const o=e.type,r=(t?t.appContext:e.appContext)||Wr,s={uid:zr++,vnode:e,type:o,parent:t,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,scope:new oe(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(r.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Uo(o,r),emitsOptions:un(o,r),emit:null,emitted:null,propsDefaults:v,inheritAttrs:o.inheritAttrs,ctx:v,data:v,props:v,attrs:v,slots:v,refs:v,setupState:v,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};s.ctx={_:s},s.root=t?t.root:s,s.emit=an.bind(null,s),e.ce&&e.ce(s);return s}(e,o,r);if(Jn(e)&&(l.ctx.renderer=X),function(e,t=!1){Xr=t;const{props:n,children:o}=e.vnode,r=Zr(e);(function(e,t,n,o=!1){const r={},s={};Q(s,Fr,1),e.propsDefaults=Object.create(null),Lo(e,t,r,s);for(const i in e.propsOptions[0])i in r||(r[i]=void 0);e.props=n?o?r:mt(r):e.type.props?r:s,e.attrs=s;})(e,n,r,t),((e,t)=>{if(32&e.vnode.shapeFlag){const n=t._;n?(e.slots=xt(t),Q(t,"_",n)):Jo(t,e.slots={});}else e.slots={},t&&Zo(e,t);Q(e.slots,Fr,1);})(e,o);r?function(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=Ct(new Proxy(e.ctx,To));const{setup:o}=n;if(o){const n=e.setupContext=o.length>1?os(e):null;qr(e),_e();const r=jt(o,e,0,[e.props,n]);if(be(),Jr(),V(r)){if(r.then(Jr,Jr),t)return r.then((n=>{es(e,n,t);})).catch((t=>{Dt(t,e,0);}));e.asyncDep=r;}else es(e,r,t);}else ns(e,t);}(e,t):void 0;Xr=!1;}(l),l.asyncDep){if(r&&r.registerDep(l,$),!e.el){const e=l.subTree=Mr(_r);g(null,e,t,n);}}else $(l,e,t,n,r,s,i);},R=(e,t,n)=>{const o=t.component=e.component;if(function(e,t,n){const{props:o,children:r,component:s}=e,{props:i,children:l,patchFlag:c}=t,a=s.emitsOptions;if(t.dirs||t.transition)return !0;if(!(n&&c>=0))return !(!r&&!l||l&&l.$stable)||o!==i&&(o?!i||_n(o,i,a):!!i);if(1024&c)return !0;if(16&c)return o?_n(o,i,a):!!i;if(8&c){const e=t.dynamicProps;for(let t=0;t<e.length;t++){const n=e[t];if(i[n]!==o[n]&&!pn(a,n))return !0}}return !1}(e,t,n)){if(o.asyncDep&&!o.asyncResolved)return void M(o,t,n);o.next=t,function(e){const t=zt.indexOf(e);t>Kt&&zt.splice(t,1);}(o.update),o.update();}else t.el=e.el,o.vnode=t;},$=(e,t,n,o,r,s,i)=>{const l=e.effect=new me((()=>{if(e.isMounted){let t,{next:n,bu:o,u:l,parent:c,vnode:a}=e,p=n;ar(e,!1),n?(n.el=a.el,M(e,n,i)):n=a,o&&Y(o),(t=n.props&&n.props.onVnodeBeforeUpdate)&&Hr(t,c,n,a),ar(e,!0);const f=gn(e),d=e.subTree;e.subTree=f,h(d,f,u(d.el),J(d),e,r,s),n.el=f.el,null===p&&bn(e,f.el),l&&sr(l,r),(t=n.props&&n.props.onVnodeUpdated)&&sr((()=>Hr(t,c,n,a)),r);}else {let i;const{el:l,props:c}=t,{bm:a,m:u,parent:p}=e,f=Gn(t);if(ar(e,!1),a&&Y(a),!f&&(i=c&&c.onVnodeBeforeMount)&&Hr(i,p,t),ar(e,!0),l&&ne){const n=()=>{e.subTree=gn(e),ne(l,e.subTree,e,r,null);};f?t.type.__asyncLoader().then((()=>!e.isUnmounted&&n())):n();}else {const i=e.subTree=gn(e);h(null,i,n,o,e,r,s),t.el=i.el;}if(u&&sr(u,r),!f&&(i=c&&c.onVnodeMounted)){const e=t;sr((()=>Hr(i,p,e)),r);}(256&t.shapeFlag||p&&Gn(p.vnode)&&256&p.vnode.shapeFlag)&&e.a&&sr(e.a,r),e.isMounted=!0,t=n=o=null;}}),(()=>Xt(c)),e.scope),c=e.update=()=>l.run();c.id=e.uid,ar(e,!0),c();},M=(e,t,n)=>{t.component=e;const o=e.vnode.props;e.vnode=t,e.next=null,function(e,t,n,o){const{props:r,attrs:s,vnode:{patchFlag:i}}=e,l=xt(r),[c]=e.propsOptions;let a=!1;if(!(o||i>0)||16&i){let o;Lo(e,t,r,s)&&(a=!0);for(const s in l)t&&(N(t,s)||(o=G(s))!==s&&N(t,o))||(c?!n||void 0===n[s]&&void 0===n[o]||(r[s]=jo(c,l,s,void 0,e,!0)):delete r[s]);if(s!==l)for(const e in s)t&&N(t,e)||(delete s[e],a=!0);}else if(8&i){const n=e.vnode.dynamicProps;for(let o=0;o<n.length;o++){let i=n[o];if(pn(e.emitsOptions,i))continue;const u=t[i];if(c)if(N(s,i))u!==s[i]&&(s[i]=u,a=!0);else {const t=z(i);r[t]=jo(c,l,t,u,e,!1);}else u!==s[i]&&(s[i]=u,a=!0);}}a&&Ce(e,"set","$attrs");}(e,t.props,o,n),((e,t,n)=>{const{vnode:o,slots:r}=e;let s=!0,i=v;if(32&o.shapeFlag){const e=t._;e?n&&1===e?s=!1:(k(r,t),n||1!==e||delete r._):(s=!t.$stable,Jo(t,r)),i=t;}else t&&(Zo(e,t),i={default:1});if(s)for(const l in r)Ko(l)||l in i||delete r[l];})(e,t.children,n),_e(),nn(),be();},I=(e,t,n,o,r,s,i,l,c=!1)=>{const u=e&&e.children,p=e?e.shapeFlag:0,f=t.children,{patchFlag:d,shapeFlag:h}=t;if(d>0){if(128&d)return void L(u,f,n,o,r,s,i,l,c);if(256&d)return void B(u,f,n,o,r,s,i,l,c)}8&h?(16&p&&q(u,r,s),f!==u&&a(n,f)):16&p?16&h?L(u,f,n,o,r,s,i,l,c):q(u,r,s,!0):(8&p&&a(n,""),16&h&&w(f,n,o,r,s,i,l,c));},B=(e,t,n,o,r,s,i,l,c)=>{const a=(e=e||y).length,u=(t=t||y).length,p=Math.min(a,u);let f;for(f=0;f<p;f++){const o=t[f]=c?jr(t[f]):Lr(t[f]);h(e[f],o,n,null,r,s,i,l,c);}a>u?q(e,r,s,!0,!1,p):w(t,n,o,r,s,i,l,c,p);},L=(e,t,n,o,r,s,i,l,c)=>{let a=0;const u=t.length;let p=e.length-1,f=u-1;for(;a<=p&&a<=f;){const o=e[a],u=t[a]=c?jr(t[a]):Lr(t[a]);if(!Ar(o,u))break;h(o,u,n,null,r,s,i,l,c),a++;}for(;a<=p&&a<=f;){const o=e[p],a=t[f]=c?jr(t[f]):Lr(t[f]);if(!Ar(o,a))break;h(o,a,n,null,r,s,i,l,c),p--,f--;}if(a>p){if(a<=f){const e=f+1,p=e<u?t[e].el:o;for(;a<=f;)h(null,t[a]=c?jr(t[a]):Lr(t[a]),n,p,r,s,i,l,c),a++;}}else if(a>f)for(;a<=p;)D(e[a],r,s,!0),a++;else {const d=a,m=a,g=new Map;for(a=m;a<=f;a++){const e=t[a]=c?jr(t[a]):Lr(t[a]);null!=e.key&&g.set(e.key,a);}let v,_=0;const b=f-m+1;let S=!1,x=0;const C=new Array(b);for(a=0;a<b;a++)C[a]=0;for(a=d;a<=p;a++){const o=e[a];if(_>=b){D(o,r,s,!0);continue}let u;if(null!=o.key)u=g.get(o.key);else for(v=m;v<=f;v++)if(0===C[v-m]&&Ar(o,t[v])){u=v;break}void 0===u?D(o,r,s,!0):(C[u-m]=a+1,u>=x?x=u:S=!0,h(o,t[u],n,null,r,s,i,l,c),_++);}const k=S?function(e){const t=e.slice(),n=[0];let o,r,s,i,l;const c=e.length;for(o=0;o<c;o++){const c=e[o];if(0!==c){if(r=n[n.length-1],e[r]<c){t[o]=r,n.push(o);continue}for(s=0,i=n.length-1;s<i;)l=s+i>>1,e[n[l]]<c?s=l+1:i=l;c<e[n[s]]&&(s>0&&(t[o]=n[s-1]),n[s]=o);}}s=n.length,i=n[s-1];for(;s-- >0;)n[s]=i,i=t[i];return n}(C):y;for(v=k.length-1,a=b-1;a>=0;a--){const e=m+a,p=t[e],f=e+1<u?t[e+1].el:o;0===C[a]?h(null,p,n,f,r,s,i,l,c):S&&(v<0||a!==k[v]?j(p,n,f,2):v--);}}},j=(e,t,o,r,s=null)=>{const{el:i,type:l,transition:c,children:a,shapeFlag:u}=e;if(6&u)return void j(e.component.subTree,t,o,r);if(128&u)return void e.suspense.move(t,o,r);if(64&u)return void l.move(e,t,o,X);if(l===vr){n(i,t,o);for(let e=0;e<a.length;e++)j(a[e],t,o,r);return void n(e.anchor,t,o)}if(l===br)return void(({el:e,anchor:t},o,r)=>{let s;for(;e&&e!==t;)s=p(e),n(e,o,r),e=s;n(t,o,r);})(e,t,o);if(2!==r&&1&u&&c)if(0===r)c.beforeEnter(i),n(i,t,o),sr((()=>c.enter(i)),s);else {const{leave:e,delayLeave:r,afterLeave:s}=c,l=()=>n(i,t,o),a=()=>{e(i,(()=>{l(),s&&s();}));};r?r(i,l,a):a();}else n(i,t,o);},D=(e,t,n,o=!1,r=!1)=>{const{type:s,props:i,ref:l,children:c,dynamicChildren:a,shapeFlag:u,patchFlag:p,dirs:f}=e;if(null!=l&&er(l,null,n,e,!0),256&u)return void t.ctx.deactivate(e);const d=1&u&&f,h=!Gn(e);let m;if(h&&(m=i&&i.onVnodeBeforeUnmount)&&Hr(m,t,e),6&u)K(e.component,n,o);else {if(128&u)return void e.suspense.unmount(n,o);d&&vo(e,null,t,"beforeUnmount"),64&u?e.type.remove(e,t,n,r,X,o):a&&(s!==vr||p>0&&64&p)?q(a,t,n,!1,!0):(s===vr&&384&p||!r&&16&u)&&q(c,t,n),o&&H(e);}(h&&(m=i&&i.onVnodeUnmounted)||d)&&sr((()=>{m&&Hr(m,t,e),d&&vo(e,null,t,"unmounted");}),n);},H=e=>{const{type:t,el:n,anchor:r,transition:s}=e;if(t===vr)return void W(n,r);if(t===br)return void(({el:e,anchor:t})=>{let n;for(;e&&e!==t;)n=p(e),o(e),e=n;o(t);})(e);const i=()=>{o(n),s&&!s.persisted&&s.afterLeave&&s.afterLeave();};if(1&e.shapeFlag&&s&&!s.persisted){const{leave:t,delayLeave:o}=s,r=()=>t(n,i);o?o(e.el,i,r):r();}else i();},W=(e,t)=>{let n;for(;e!==t;)n=p(e),o(e),e=n;o(t);},K=(e,t,n)=>{const{bum:o,scope:r,update:s,subTree:i,um:l}=e;o&&Y(o),r.stop(),s&&(s.active=!1,D(i,e,t,n)),l&&sr(l,t),sr((()=>{e.isUnmounted=!0;}),t),t&&t.pendingBranch&&!t.isUnmounted&&e.asyncDep&&!e.asyncResolved&&e.suspenseId===t.pendingId&&(t.deps--,0===t.deps&&t.resolve());},q=(e,t,n,o=!1,r=!1,s=0)=>{for(let i=s;i<e.length;i++)D(e[i],t,n,o,r);},J=e=>6&e.shapeFlag?J(e.component.subTree):128&e.shapeFlag?e.suspense.next():p(e.anchor||e.el),Z=(e,t,n)=>{null==e?t._vnode&&D(t._vnode,null,null,!0):h(t._vnode||null,e,t,null,null,null,n),nn(),on(),t._vnode=e;},X={p:h,um:D,m:j,r:H,mt:P,mc:w,pc:I,pbc:E,n:J,o:e};let ee,ne;return t&&([ee,ne]=t(X)),{render:Z,hydrate:ee,createApp:Xo(Z,ee)}}function ar({effect:e,update:t},n){e.allowRecurse=t.allowRecurse=n;}function ur(e,t,n=!1){const o=e.children,r=t.children;if(E(o)&&E(r))for(let s=0;s<o.length;s++){const e=o[s];let t=r[s];1&t.shapeFlag&&!t.dynamicChildren&&((t.patchFlag<=0||32===t.patchFlag)&&(t=r[s]=jr(r[s]),t.el=e.el),n||ur(e,t)),t.type===yr&&(t.el=e.el);}}const pr=e=>e&&(e.disabled||""===e.disabled),fr=e=>"undefined"!=typeof SVGElement&&e instanceof SVGElement,dr=(e,t)=>{const n=e&&e.to;if(R(n)){if(t){return t(n)}return null}return n};function hr(e,t,n,{o:{insert:o},m:r},s=2){0===s&&o(e.targetAnchor,t,n);const{el:i,anchor:l,shapeFlag:c,children:a,props:u}=e,p=2===s;if(p&&o(i,t,n),(!p||pr(u))&&16&c)for(let f=0;f<a.length;f++)r(a[f],t,n,2);p&&o(l,t,n);}const mr={__isTeleport:!0,process(e,t,n,o,r,s,i,l,c,a){const{mc:u,pc:p,pbc:f,o:{insert:d,querySelector:h,createText:m}}=a,g=pr(t.props);let{shapeFlag:v,children:y,dynamicChildren:_}=t;if(null==e){const e=t.el=m(""),a=t.anchor=m("");d(e,n,o),d(a,n,o);const p=t.target=dr(t.props,h),f=t.targetAnchor=m("");p&&(d(f,p),i=i||fr(p));const _=(e,t)=>{16&v&&u(y,e,t,r,s,i,l,c);};g?_(n,a):p&&_(p,f);}else {t.el=e.el;const o=t.anchor=e.anchor,u=t.target=e.target,d=t.targetAnchor=e.targetAnchor,m=pr(e.props),v=m?n:u,y=m?o:d;if(i=i||fr(u),_?(f(e.dynamicChildren,_,v,r,s,i,l),ur(e,t,!0)):c||p(e,t,v,y,r,s,i,l,!1),g)m||hr(t,n,o,a,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){const e=t.target=dr(t.props,h);e&&hr(t,e,null,a,0);}else m&&hr(t,u,d,a,1);}gr(t);},remove(e,t,n,o,{um:r,o:{remove:s}},i){const{shapeFlag:l,children:c,anchor:a,targetAnchor:u,target:p,props:f}=e;if(p&&s(u),(i||!pr(f))&&(s(a),16&l))for(let d=0;d<c.length;d++){const e=c[d];r(e,t,n,!0,!!e.dynamicChildren);}},move:hr,hydrate:function(e,t,n,o,r,s,{o:{nextSibling:i,parentNode:l,querySelector:c}},a){const u=t.target=dr(t.props,c);if(u){const c=u._lpa||u.firstChild;if(16&t.shapeFlag)if(pr(t.props))t.anchor=a(i(e),t,l(e),n,o,r,s),t.targetAnchor=c;else {t.anchor=i(e);let l=c;for(;l;)if(l=i(l),l&&8===l.nodeType&&"teleport anchor"===l.data){t.targetAnchor=l,u._lpa=t.targetAnchor&&i(t.targetAnchor);break}a(c,t,u,n,o,r,s);}gr(t);}return t.anchor&&i(t.anchor)}};function gr(e){const t=e.ctx;if(t&&t.ut){let n=e.children[0].el;for(;n!==e.targetAnchor;)1===n.nodeType&&n.setAttribute("data-v-owner",t.uid),n=n.nextSibling;t.ut();}}const vr=Symbol(void 0),yr=Symbol(void 0),_r=Symbol(void 0),br=Symbol(void 0),Sr=[];let xr=null;function Cr(e=!1){Sr.push(xr=e?null:[]);}function kr(){Sr.pop(),xr=Sr[Sr.length-1]||null;}let wr=1;function Tr(e){wr+=e;}function Nr(e){return e.dynamicChildren=wr>0?xr||y:null,kr(),wr>0&&xr&&xr.push(e),e}function Er(e,t,n,o,r){return Nr(Mr(e,t,n,o,r,!0))}function Or(e){return !!e&&!0===e.__v_isVNode}function Ar(e,t){return e.type===t.type&&e.key===t.key}const Fr="__vInternal",Pr=({key:e})=>null!=e?e:null,Rr=({ref:e,ref_key:t,ref_for:n})=>null!=e?R(e)||Et(e)||P(e)?{i:fn,r:e,k:t,f:!!n}:e:null;function $r(e,t=null,n=null,o=0,r=null,s=(e===vr?0:1),i=!1,l=!1){const c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Pr(t),ref:t&&Rr(t),scopeId:dn,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:o,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:fn};return l?(Ur(c,n),128&s&&e.normalize(c)):n&&(c.shapeFlag|=R(n)?8:16),wr>0&&!i&&xr&&(c.patchFlag>0||6&s)&&32!==c.patchFlag&&xr.push(c),c}const Mr=function(e,t=null,n=null,r=0,s=null,i=!1){e&&e!==_o||(e=_r);if(Or(e)){const o=Ir(e,t,!0);return n&&Ur(o,n),wr>0&&!i&&xr&&(6&o.shapeFlag?xr[xr.indexOf(e)]=o:xr.push(o)),o.patchFlag|=-2,o}l=e,P(l)&&"__vccOpts"in l&&(e=e.__vccOpts);var l;if(t){t=Vr(t);let{class:e,style:n}=t;e&&!R(e)&&(t.class=c(e)),M(n)&&(St(n)&&!E(n)&&(n=k({},n)),t.style=o(n));}const a=R(e)?1:Sn(e)?128:(e=>e.__isTeleport)(e)?64:M(e)?4:P(e)?2:0;return $r(e,t,n,r,s,a,i,!0)};function Vr(e){return e?St(e)||Fr in e?k({},e):e:null}function Ir(e,t,n=!1){const{props:o,ref:r,patchFlag:s,children:i}=e,l=t?Dr(o||{},t):o;return {__v_isVNode:!0,__v_skip:!0,type:e.type,props:l,key:l&&Pr(l),ref:t&&t.ref?n&&r?E(r)?r.concat(Rr(t)):[r,Rr(t)]:Rr(t):r,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:i,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==vr?-1===s?16:16|s:s,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Ir(e.ssContent),ssFallback:e.ssFallback&&Ir(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce}}function Br(e=" ",t=0){return Mr(yr,null,e,t)}function Lr(e){return null==e||"boolean"==typeof e?Mr(_r):E(e)?Mr(vr,null,e.slice()):"object"==typeof e?jr(e):Mr(yr,null,String(e))}function jr(e){return null===e.el&&-1!==e.patchFlag||e.memo?e:Ir(e)}function Ur(e,t){let n=0;const{shapeFlag:o}=e;if(null==t)t=null;else if(E(t))n=16;else if("object"==typeof t){if(65&o){const n=t.default;return void(n&&(n._c&&(n._d=!1),Ur(e,n()),n._c&&(n._d=!0)))}{n=32;const o=t._;o||Fr in t?3===o&&fn&&(1===fn.slots._?t._=1:(t._=2,e.patchFlag|=1024)):t._ctx=fn;}}else P(t)?(t={default:t,_ctx:fn},n=32):(t=String(t),64&o?(n=16,t=[Br(t)]):n=8);e.children=t,e.shapeFlag|=n;}function Dr(...e){const t={};for(let n=0;n<e.length;n++){const r=e[n];for(const e in r)if("class"===e)t.class!==r.class&&(t.class=c([t.class,r.class]));else if("style"===e)t.style=o([t.style,r.style]);else if(x(e)){const n=t[e],o=r[e];!o||n===o||E(n)&&n.includes(o)||(t[e]=n?[].concat(n,o):o);}else ""!==e&&(t[e]=r[e]);}return t}function Hr(e,t,n,o=null){Ut(e,t,7,[n,o]);}const Wr=Yo();let zr=0;let Kr=null;const Gr=()=>Kr||fn,qr=e=>{Kr=e,e.scope.on();},Jr=()=>{Kr&&Kr.scope.off(),Kr=null;};function Zr(e){return 4&e.vnode.shapeFlag}let Yr,Qr,Xr=!1;function es(e,t,n){P(t)?e.render=t:M(t)&&(e.setupState=$t(t)),ns(e,n);}function ts(e){Yr=e,Qr=e=>{e.render._rc&&(e.withProxy=new Proxy(e.ctx,No));};}function ns(e,t,n){const o=e.type;if(!e.render){if(!t&&Yr&&!o.render){const t=o.template||Po(e).template;if(t){const{isCustomElement:n,compilerOptions:r}=e.appContext.config,{delimiters:s,compilerOptions:i}=o,l=k(k({isCustomElement:n,delimiters:s},r),i);o.render=Yr(t,l);}}e.render=o.render||_,Qr&&Qr(e);}qr(e),_e(),Oo(e),be(),Jr();}function os(e){const t=t=>{e.exposed=t||{};};let n;return {get attrs(){return n||(n=function(e){return new Proxy(e.attrs,{get:(t,n)=>(Se(e,0,"$attrs"),t[n])})}(e))},slots:e.slots,emit:e.emit,expose:t}}function rs(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy($t(Ct(e.exposed)),{get:(t,n)=>n in t?t[n]:n in ko?ko[n](e):void 0,has:(e,t)=>t in e||t in ko}))}function ss(e,t=!0){return P(e)?e.displayName||e.name:e.name||t&&e.__name}const is=(e,t)=>function(e,t,n=!1){let o,r;const s=P(e);return s?(o=e,r=_):(o=e.get,r=e.set),new Lt(o,r,s||!r,n)}(e,0,Xr);function ls(){const e=Gr();return e.setupContext||(e.setupContext=os(e))}function cs(e,t,n){const o=arguments.length;return 2===o?M(t)&&!E(t)?Or(t)?Mr(e,null,[t]):Mr(e,t):Mr(e,null,t):(o>3?n=Array.prototype.slice.call(arguments,2):3===o&&Or(n)&&(n=[n]),Mr(e,t,n))}const as=Symbol("");function us(e,t){const n=e.memo;if(n.length!=t.length)return !1;for(let o=0;o<n.length;o++)if(Z(n[o],t[o]))return !1;return wr>0&&xr&&xr.push(e),!0}const ps="3.2.47",fs="undefined"!=typeof document?document:null,ds=fs&&fs.createElement("template"),hs={insert:(e,t,n)=>{t.insertBefore(e,n||null);},remove:e=>{const t=e.parentNode;t&&t.removeChild(e);},createElement:(e,t,n,o)=>{const r=t?fs.createElementNS("http://www.w3.org/2000/svg",e):fs.createElement(e,n?{is:n}:void 0);return "select"===e&&o&&null!=o.multiple&&r.setAttribute("multiple",o.multiple),r},createText:e=>fs.createTextNode(e),createComment:e=>fs.createComment(e),setText:(e,t)=>{e.nodeValue=t;},setElementText:(e,t)=>{e.textContent=t;},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>fs.querySelector(e),setScopeId(e,t){e.setAttribute(t,"");},insertStaticContent(e,t,n,o,r,s){const i=n?n.previousSibling:t.lastChild;if(r&&(r===s||r.nextSibling))for(;t.insertBefore(r.cloneNode(!0),n),r!==s&&(r=r.nextSibling););else {ds.innerHTML=o?`<svg>${e}</svg>`:e;const r=ds.content;if(o){const e=r.firstChild;for(;e.firstChild;)r.appendChild(e.firstChild);r.removeChild(e);}t.insertBefore(r,n);}return [i?i.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}};const ms=/\s*!important$/;function gs(e,t,n){if(E(n))n.forEach((n=>gs(e,t,n)));else if(null==n&&(n=""),t.startsWith("--"))e.setProperty(t,n);else {const o=function(e,t){const n=ys[t];if(n)return n;let o=z(t);if("filter"!==o&&o in e)return ys[t]=o;o=q(o);for(let r=0;r<vs.length;r++){const n=vs[r]+o;if(n in e)return ys[t]=n}return t}(e,t);ms.test(n)?e.setProperty(G(o),n.replace(ms,""),"important"):e[o]=n;}}const vs=["Webkit","Moz","ms"],ys={};const _s="http://www.w3.org/1999/xlink";function bs(e,t,n,o){e.addEventListener(t,n,o);}function Ss(e,t,n,o,r=null){const s=e._vei||(e._vei={}),i=s[t];if(o&&i)i.value=o;else {const[n,l]=function(e){let t;if(xs.test(e)){let n;for(t={};n=e.match(xs);)e=e.slice(0,e.length-n[0].length),t[n[0].toLowerCase()]=!0;}return [":"===e[2]?e.slice(3):G(e.slice(2)),t]}(t);if(o){const i=s[t]=function(e,t){const n=e=>{if(e._vts){if(e._vts<=n.attached)return}else e._vts=Date.now();Ut(function(e,t){if(E(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0;},t.map((e=>t=>!t._stopped&&e&&e(t)))}return t}(e,n.value),t,5,[e]);};return n.value=e,n.attached=(()=>Cs||(ks.then((()=>Cs=0)),Cs=Date.now()))(),n}(o,r);bs(e,n,i,l);}else i&&(!function(e,t,n,o){e.removeEventListener(t,n,o);}(e,n,i,l),s[t]=void 0);}}const xs=/(?:Once|Passive|Capture)$/;let Cs=0;const ks=Promise.resolve();const ws=/^on[a-z]/;function Ts(e,t){const n=Kn(e);class o extends Es{constructor(e){super(n,e,t);}}return o.def=n,o}const Ns="undefined"!=typeof HTMLElement?HTMLElement:class{};class Es extends Ns{constructor(e,t={},n){super(),this._def=e,this._props=t,this._instance=null,this._connected=!1,this._resolved=!1,this._numberProps=null,this.shadowRoot&&n?n(this._createVNode(),this.shadowRoot):(this.attachShadow({mode:"open"}),this._def.__asyncLoader||this._resolveProps(this._def));}connectedCallback(){this._connected=!0,this._instance||(this._resolved?this._update():this._resolveDef());}disconnectedCallback(){this._connected=!1,Qt((()=>{this._connected||(wi(null,this.shadowRoot),this._instance=null);}));}_resolveDef(){this._resolved=!0;for(let n=0;n<this.attributes.length;n++)this._setAttr(this.attributes[n].name);new MutationObserver((e=>{for(const t of e)this._setAttr(t.attributeName);})).observe(this,{attributes:!0});const e=(e,t=!1)=>{const{props:n,styles:o}=e;let r;if(n&&!E(n))for(const s in n){const e=n[s];(e===Number||e&&e.type===Number)&&(s in this._props&&(this._props[s]=ee(this._props[s])),(r||(r=Object.create(null)))[z(s)]=!0);}this._numberProps=r,t&&this._resolveProps(e),this._applyStyles(o),this._update();},t=this._def.__asyncLoader;t?t().then((t=>e(t,!0))):e(this._def);}_resolveProps(e){const{props:t}=e,n=E(t)?t:Object.keys(t||{});for(const o of Object.keys(this))"_"!==o[0]&&n.includes(o)&&this._setProp(o,this[o],!0,!1);for(const o of n.map(z))Object.defineProperty(this,o,{get(){return this._getProp(o)},set(e){this._setProp(o,e);}});}_setAttr(e){let t=this.getAttribute(e);const n=z(e);this._numberProps&&this._numberProps[n]&&(t=ee(t)),this._setProp(n,t,!1);}_getProp(e){return this._props[e]}_setProp(e,t,n=!0,o=!0){t!==this._props[e]&&(this._props[e]=t,o&&this._instance&&this._update(),n&&(!0===t?this.setAttribute(G(e),""):"string"==typeof t||"number"==typeof t?this.setAttribute(G(e),t+""):t||this.removeAttribute(G(e))));}_update(){wi(this._createVNode(),this.shadowRoot);}_createVNode(){const e=Mr(this._def,k({},this._props));return this._instance||(e.ce=e=>{this._instance=e,e.isCE=!0;const t=(e,t)=>{this.dispatchEvent(new CustomEvent(e,{detail:t}));};e.emit=(e,...n)=>{t(e,n),G(e)!==e&&t(G(e),n);};let n=this;for(;n=n&&(n.parentNode||n.host);)if(n instanceof Es){e.parent=n._instance,e.provides=n._instance.provides;break}}),e}_applyStyles(e){e&&e.forEach((e=>{const t=document.createElement("style");t.textContent=e,this.shadowRoot.appendChild(t);}));}}function Os(e,t){if(128&e.shapeFlag){const n=e.suspense;e=n.activeBranch,n.pendingBranch&&!n.isHydrating&&n.effects.push((()=>{Os(n.activeBranch,t);}));}for(;e.component;)e=e.component.subTree;if(1&e.shapeFlag&&e.el)As(e.el,t);else if(e.type===vr)e.children.forEach((e=>Os(e,t)));else if(e.type===br){let{el:n,anchor:o}=e;for(;n&&(As(n,t),n!==o);)n=n.nextSibling;}}function As(e,t){if(1===e.nodeType){const n=e.style;for(const e in t)n.setProperty(`--${e}`,t[e]);}}const Fs="transition",Ps="animation",Rs=(e,{slots:t})=>cs(Ln,Bs(e),t);Rs.displayName="Transition";const $s={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},Ms=Rs.props=k({},Ln.props,$s),Vs=(e,t=[])=>{E(e)?e.forEach((e=>e(...t))):e&&e(...t);},Is=e=>!!e&&(E(e)?e.some((e=>e.length>1)):e.length>1);function Bs(e){const t={};for(const k in e)k in $s||(t[k]=e[k]);if(!1===e.css)return t;const{name:n="v",type:o,duration:r,enterFromClass:s=`${n}-enter-from`,enterActiveClass:i=`${n}-enter-active`,enterToClass:l=`${n}-enter-to`,appearFromClass:c=s,appearActiveClass:a=i,appearToClass:u=l,leaveFromClass:p=`${n}-leave-from`,leaveActiveClass:f=`${n}-leave-active`,leaveToClass:d=`${n}-leave-to`}=e,h=function(e){if(null==e)return null;if(M(e))return [Ls(e.enter),Ls(e.leave)];{const t=Ls(e);return [t,t]}}(r),m=h&&h[0],g=h&&h[1],{onBeforeEnter:v,onEnter:y,onEnterCancelled:_,onLeave:b,onLeaveCancelled:S,onBeforeAppear:x=v,onAppear:C=y,onAppearCancelled:w=_}=t,T=(e,t,n)=>{Us(e,t?u:l),Us(e,t?a:i),n&&n();},N=(e,t)=>{e._isLeaving=!1,Us(e,p),Us(e,d),Us(e,f),t&&t();},E=e=>(t,n)=>{const r=e?C:y,i=()=>T(t,e,n);Vs(r,[t,i]),Ds((()=>{Us(t,e?c:s),js(t,e?u:l),Is(r)||Ws(t,o,m,i);}));};return k(t,{onBeforeEnter(e){Vs(v,[e]),js(e,s),js(e,i);},onBeforeAppear(e){Vs(x,[e]),js(e,c),js(e,a);},onEnter:E(!1),onAppear:E(!0),onLeave(e,t){e._isLeaving=!0;const n=()=>N(e,t);js(e,p),qs(),js(e,f),Ds((()=>{e._isLeaving&&(Us(e,p),js(e,d),Is(b)||Ws(e,o,g,n));})),Vs(b,[e,n]);},onEnterCancelled(e){T(e,!1),Vs(_,[e]);},onAppearCancelled(e){T(e,!0),Vs(w,[e]);},onLeaveCancelled(e){N(e),Vs(S,[e]);}})}function Ls(e){return ee(e)}function js(e,t){t.split(/\s+/).forEach((t=>t&&e.classList.add(t))),(e._vtc||(e._vtc=new Set)).add(t);}function Us(e,t){t.split(/\s+/).forEach((t=>t&&e.classList.remove(t)));const{_vtc:n}=e;n&&(n.delete(t),n.size||(e._vtc=void 0));}function Ds(e){requestAnimationFrame((()=>{requestAnimationFrame(e);}));}let Hs=0;function Ws(e,t,n,o){const r=e._endId=++Hs,s=()=>{r===e._endId&&o();};if(n)return setTimeout(s,n);const{type:i,timeout:l,propCount:c}=zs(e,t);if(!i)return o();const a=i+"end";let u=0;const p=()=>{e.removeEventListener(a,f),s();},f=t=>{t.target===e&&++u>=c&&p();};setTimeout((()=>{u<c&&p();}),l+1),e.addEventListener(a,f);}function zs(e,t){const n=window.getComputedStyle(e),o=e=>(n[e]||"").split(", "),r=o("transitionDelay"),s=o("transitionDuration"),i=Ks(r,s),l=o("animationDelay"),c=o("animationDuration"),a=Ks(l,c);let u=null,p=0,f=0;t===Fs?i>0&&(u=Fs,p=i,f=s.length):t===Ps?a>0&&(u=Ps,p=a,f=c.length):(p=Math.max(i,a),u=p>0?i>a?Fs:Ps:null,f=u?u===Fs?s.length:c.length:0);return {type:u,timeout:p,propCount:f,hasTransform:u===Fs&&/\b(transform|all)(,|$)/.test(o("transitionProperty").toString())}}function Ks(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map(((t,n)=>Gs(t)+Gs(e[n]))))}function Gs(e){return 1e3*Number(e.slice(0,-1).replace(",","."))}function qs(){return document.body.offsetHeight}const Js=new WeakMap,Zs=new WeakMap,Ys={name:"TransitionGroup",props:k({},Ms,{tag:String,moveClass:String}),setup(e,{slots:t}){const n=Gr(),o=In();let r,s;return ao((()=>{if(!r.length)return;const t=e.moveClass||`${e.name||"v"}-move`;if(!function(e,t,n){const o=e.cloneNode();e._vtc&&e._vtc.forEach((e=>{e.split(/\s+/).forEach((e=>e&&o.classList.remove(e)));}));n.split(/\s+/).forEach((e=>e&&o.classList.add(e))),o.style.display="none";const r=1===t.nodeType?t:t.parentNode;r.appendChild(o);const{hasTransform:s}=zs(o);return r.removeChild(o),s}(r[0].el,n.vnode.el,t))return;r.forEach(Xs),r.forEach(ei);const o=r.filter(ti);qs(),o.forEach((e=>{const n=e.el,o=n.style;js(n,t),o.transform=o.webkitTransform=o.transitionDuration="";const r=n._moveCb=e=>{e&&e.target!==n||e&&!/transform$/.test(e.propertyName)||(n.removeEventListener("transitionend",r),n._moveCb=null,Us(n,t));};n.addEventListener("transitionend",r);}));})),()=>{const i=xt(e),l=Bs(i);let c=i.tag||vr;r=s,s=t.default?zn(t.default()):[];for(let e=0;e<s.length;e++){const t=s[e];null!=t.key&&Wn(t,Un(t,l,o,n));}if(r)for(let e=0;e<r.length;e++){const t=r[e];Wn(t,Un(t,l,o,n)),Js.set(t,t.el.getBoundingClientRect());}return Mr(c,null,s)}}},Qs=Ys;function Xs(e){const t=e.el;t._moveCb&&t._moveCb(),t._enterCb&&t._enterCb();}function ei(e){Zs.set(e,e.el.getBoundingClientRect());}function ti(e){const t=Js.get(e),n=Zs.get(e),o=t.left-n.left,r=t.top-n.top;if(o||r){const t=e.el.style;return t.transform=t.webkitTransform=`translate(${o}px,${r}px)`,t.transitionDuration="0s",e}}const ni=e=>{const t=e.props["onUpdate:modelValue"]||!1;return E(t)?e=>Y(t,e):t};function oi(e){e.target.composing=!0;}function ri(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")));}const si={created(e,{modifiers:{lazy:t,trim:n,number:o}},r){e._assign=ni(r);const s=o||r.props&&"number"===r.props.type;bs(e,t?"change":"input",(t=>{if(t.target.composing)return;let o=e.value;n&&(o=o.trim()),s&&(o=X(o)),e._assign(o);})),n&&bs(e,"change",(()=>{e.value=e.value.trim();})),t||(bs(e,"compositionstart",oi),bs(e,"compositionend",ri),bs(e,"change",ri));},mounted(e,{value:t}){e.value=null==t?"":t;},beforeUpdate(e,{value:t,modifiers:{lazy:n,trim:o,number:r}},s){if(e._assign=ni(s),e.composing)return;if(document.activeElement===e&&"range"!==e.type){if(n)return;if(o&&e.value.trim()===t)return;if((r||"number"===e.type)&&X(e.value)===t)return}const i=null==t?"":t;e.value!==i&&(e.value=i);}},ii={deep:!0,created(e,t,n){e._assign=ni(n),bs(e,"change",(()=>{const t=e._modelValue,n=pi(e),o=e.checked,r=e._assign;if(E(t)){const e=m(t,n),s=-1!==e;if(o&&!s)r(t.concat(n));else if(!o&&s){const n=[...t];n.splice(e,1),r(n);}}else if(A(t)){const e=new Set(t);o?e.add(n):e.delete(n),r(e);}else r(fi(e,o));}));},mounted:li,beforeUpdate(e,t,n){e._assign=ni(n),li(e,t,n);}};function li(e,{value:t,oldValue:n},o){e._modelValue=t,E(t)?e.checked=m(t,o.props.value)>-1:A(t)?e.checked=t.has(o.props.value):t!==n&&(e.checked=h(t,fi(e,!0)));}const ci={created(e,{value:t},n){e.checked=h(t,n.props.value),e._assign=ni(n),bs(e,"change",(()=>{e._assign(pi(e));}));},beforeUpdate(e,{value:t,oldValue:n},o){e._assign=ni(o),t!==n&&(e.checked=h(t,o.props.value));}},ai={deep:!0,created(e,{value:t,modifiers:{number:n}},o){const r=A(t);bs(e,"change",(()=>{const t=Array.prototype.filter.call(e.options,(e=>e.selected)).map((e=>n?X(pi(e)):pi(e)));e._assign(e.multiple?r?new Set(t):t:t[0]);})),e._assign=ni(o);},mounted(e,{value:t}){ui(e,t);},beforeUpdate(e,t,n){e._assign=ni(n);},updated(e,{value:t}){ui(e,t);}};function ui(e,t){const n=e.multiple;if(!n||E(t)||A(t)){for(let o=0,r=e.options.length;o<r;o++){const r=e.options[o],s=pi(r);if(n)r.selected=E(t)?m(t,s)>-1:t.has(s);else if(h(pi(r),t))return void(e.selectedIndex!==o&&(e.selectedIndex=o))}n||-1===e.selectedIndex||(e.selectedIndex=-1);}}function pi(e){return "_value"in e?e._value:e.value}function fi(e,t){const n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}const di={created(e,t,n){hi(e,t,n,null,"created");},mounted(e,t,n){hi(e,t,n,null,"mounted");},beforeUpdate(e,t,n,o){hi(e,t,n,o,"beforeUpdate");},updated(e,t,n,o){hi(e,t,n,o,"updated");}};function hi(e,t,n,o,r){const s=function(e,t){switch(e){case"SELECT":return ai;case"TEXTAREA":return si;default:switch(t){case"checkbox":return ii;case"radio":return ci;default:return si}}}(e.tagName,n.props&&n.props.type)[r];s&&s(e,t,n,o);}const mi=["ctrl","shift","alt","meta"],gi={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&0!==e.button,middle:e=>"button"in e&&1!==e.button,right:e=>"button"in e&&2!==e.button,exact:(e,t)=>mi.some((n=>e[`${n}Key`]&&!t.includes(n)))},vi={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},yi={beforeMount(e,{value:t},{transition:n}){e._vod="none"===e.style.display?"":e.style.display,n&&t?n.beforeEnter(e):_i(e,t);},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e);},updated(e,{value:t,oldValue:n},{transition:o}){!t!=!n&&(o?t?(o.beforeEnter(e),_i(e,!0),o.enter(e)):o.leave(e,(()=>{_i(e,!1);})):_i(e,t));},beforeUnmount(e,{value:t}){_i(e,t);}};function _i(e,t){e.style.display=t?e._vod:"none";}const bi=k({patchProp:(e,t,n,o,r=!1,s,i,l,c)=>{"class"===t?function(e,t,n){const o=e._vtc;o&&(t=(t?[t,...o]:[...o]).join(" ")),null==t?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t;}(e,o,r):"style"===t?function(e,t,n){const o=e.style,r=R(n);if(n&&!r){if(t&&!R(t))for(const e in t)null==n[e]&&gs(o,e,"");for(const e in n)gs(o,e,n[e]);}else {const s=o.display;r?t!==n&&(o.cssText=n):t&&e.removeAttribute("style"),"_vod"in e&&(o.display=s);}}(e,n,o):x(t)?C(t)||Ss(e,t,0,o,i):("."===t[0]?(t=t.slice(1),1):"^"===t[0]?(t=t.slice(1),0):function(e,t,n,o){if(o)return "innerHTML"===t||"textContent"===t||!!(t in e&&ws.test(t)&&P(n));if("spellcheck"===t||"draggable"===t||"translate"===t)return !1;if("form"===t)return !1;if("list"===t&&"INPUT"===e.tagName)return !1;if("type"===t&&"TEXTAREA"===e.tagName)return !1;if(ws.test(t)&&R(n))return !1;return t in e}(e,t,o,r))?function(e,t,n,o,r,s,i){if("innerHTML"===t||"textContent"===t)return o&&i(o,r,s),void(e[t]=null==n?"":n);if("value"===t&&"PROGRESS"!==e.tagName&&!e.tagName.includes("-")){e._value=n;const o=null==n?"":n;return e.value===o&&"OPTION"!==e.tagName||(e.value=o),void(null==n&&e.removeAttribute(t))}let l=!1;if(""===n||null==n){const o=typeof e[t];"boolean"===o?n=d(n):null==n&&"string"===o?(n="",l=!0):"number"===o&&(n=0,l=!0);}try{e[t]=n;}catch(c){}l&&e.removeAttribute(t);}(e,t,o,s,i,l,c):("true-value"===t?e._trueValue=o:"false-value"===t&&(e._falseValue=o),function(e,t,n,o,r){if(o&&t.startsWith("xlink:"))null==n?e.removeAttributeNS(_s,t.slice(6,t.length)):e.setAttributeNS(_s,t,n);else {const o=f(t);null==n||o&&!d(n)?e.removeAttribute(t):e.setAttribute(t,o?"":n);}}(e,t,o,r));}},hs);let Si,xi=!1;function Ci(){return Si||(Si=ir(bi))}function ki(){return Si=xi?Si:lr(bi),xi=!0,Si}const wi=(...e)=>{Ci().render(...e);},Ti=(...e)=>{ki().hydrate(...e);};function Ni(e){if(R(e)){return document.querySelector(e)}return e}const Ei=_;function Oi(e){throw e}function Ai(e){}function Fi(e,t,n,o){const r=new SyntaxError(String(e));return r.code=e,r.loc=t,r}const Pi=Symbol(""),Ri=Symbol(""),$i=Symbol(""),Mi=Symbol(""),Vi=Symbol(""),Ii=Symbol(""),Bi=Symbol(""),Li=Symbol(""),ji=Symbol(""),Ui=Symbol(""),Di=Symbol(""),Hi=Symbol(""),Wi=Symbol(""),zi=Symbol(""),Ki=Symbol(""),Gi=Symbol(""),qi=Symbol(""),Ji=Symbol(""),Zi=Symbol(""),Yi=Symbol(""),Qi=Symbol(""),Xi=Symbol(""),el=Symbol(""),tl=Symbol(""),nl=Symbol(""),ol=Symbol(""),rl=Symbol(""),sl=Symbol(""),il=Symbol(""),ll=Symbol(""),cl=Symbol(""),al=Symbol(""),ul=Symbol(""),pl=Symbol(""),fl=Symbol(""),dl=Symbol(""),hl=Symbol(""),ml=Symbol(""),gl=Symbol(""),vl={[Pi]:"Fragment",[Ri]:"Teleport",[$i]:"Suspense",[Mi]:"KeepAlive",[Vi]:"BaseTransition",[Ii]:"openBlock",[Bi]:"createBlock",[Li]:"createElementBlock",[ji]:"createVNode",[Ui]:"createElementVNode",[Di]:"createCommentVNode",[Hi]:"createTextVNode",[Wi]:"createStaticVNode",[zi]:"resolveComponent",[Ki]:"resolveDynamicComponent",[Gi]:"resolveDirective",[qi]:"resolveFilter",[Ji]:"withDirectives",[Zi]:"renderList",[Yi]:"renderSlot",[Qi]:"createSlots",[Xi]:"toDisplayString",[el]:"mergeProps",[tl]:"normalizeClass",[nl]:"normalizeStyle",[ol]:"normalizeProps",[rl]:"guardReactiveProps",[sl]:"toHandlers",[il]:"camelize",[ll]:"capitalize",[cl]:"toHandlerKey",[al]:"setBlockTracking",[ul]:"pushScopeId",[pl]:"popScopeId",[fl]:"withCtx",[dl]:"unref",[hl]:"isRef",[ml]:"withMemo",[gl]:"isMemoSame"};const yl={source:"",start:{line:1,column:1,offset:0},end:{line:1,column:1,offset:0}};function _l(e,t,n,o,r,s,i,l=!1,c=!1,a=!1,u=yl){return e&&(l?(e.helper(Ii),e.helper(ql(e.inSSR,a))):e.helper(Gl(e.inSSR,a)),i&&e.helper(Ji)),{type:13,tag:t,props:n,children:o,patchFlag:r,dynamicProps:s,directives:i,isBlock:l,disableTracking:c,isComponent:a,loc:u}}function bl(e,t=yl){return {type:17,loc:t,elements:e}}function Sl(e,t=yl){return {type:15,loc:t,properties:e}}function xl(e,t){return {type:16,loc:yl,key:R(e)?Cl(e,!0):e,value:t}}function Cl(e,t=!1,n=yl,o=0){return {type:4,loc:n,content:e,isStatic:t,constType:t?3:o}}function kl(e,t=yl){return {type:8,loc:t,children:e}}function wl(e,t=[],n=yl){return {type:14,loc:n,callee:e,arguments:t}}function Tl(e,t,n=!1,o=!1,r=yl){return {type:18,params:e,returns:t,newline:n,isSlot:o,loc:r}}function Nl(e,t,n,o=!0){return {type:19,test:e,consequent:t,alternate:n,newline:o,loc:yl}}const El=e=>4===e.type&&e.isStatic,Ol=(e,t)=>e===t||e===G(t);function Al(e){return Ol(e,"Teleport")?Ri:Ol(e,"Suspense")?$i:Ol(e,"KeepAlive")?Mi:Ol(e,"BaseTransition")?Vi:void 0}const Fl=/^\d|[^\$\w]/,Pl=e=>!Fl.test(e),Rl=/[A-Za-z_$\xA0-\uFFFF]/,$l=/[\.\?\w$\xA0-\uFFFF]/,Ml=/\s+[.[]\s*|\s*[.[]\s+/g,Vl=e=>{e=e.trim().replace(Ml,(e=>e.trim()));let t=0,n=[],o=0,r=0,s=null;for(let i=0;i<e.length;i++){const l=e.charAt(i);switch(t){case 0:if("["===l)n.push(t),t=1,o++;else if("("===l)n.push(t),t=2,r++;else if(!(0===i?Rl:$l).test(l))return !1;break;case 1:"'"===l||'"'===l||"`"===l?(n.push(t),t=3,s=l):"["===l?o++:"]"===l&&(--o||(t=n.pop()));break;case 2:if("'"===l||'"'===l||"`"===l)n.push(t),t=3,s=l;else if("("===l)r++;else if(")"===l){if(i===e.length-1)return !1;--r||(t=n.pop());}break;case 3:l===s&&(t=n.pop(),s=null);}}return !o&&!r};function Il(e,t,n){const o={source:e.source.slice(t,t+n),start:Bl(e.start,e.source,t),end:e.end};return null!=n&&(o.end=Bl(e.start,e.source,t+n)),o}function Bl(e,t,n=t.length){return Ll(k({},e),t,n)}function Ll(e,t,n=t.length){let o=0,r=-1;for(let s=0;s<n;s++)10===t.charCodeAt(s)&&(o++,r=s);return e.offset+=n,e.line+=o,e.column=-1===r?e.column+n:n-r,e}function jl(e,t,n=!1){for(let o=0;o<e.props.length;o++){const r=e.props[o];if(7===r.type&&(n||r.exp)&&(R(t)?r.name===t:t.test(r.name)))return r}}function Ul(e,t,n=!1,o=!1){for(let r=0;r<e.props.length;r++){const s=e.props[r];if(6===s.type){if(n)continue;if(s.name===t&&(s.value||o))return s}else if("bind"===s.name&&(s.exp||o)&&Dl(s.arg,t))return s}}function Dl(e,t){return !(!e||!El(e)||e.content!==t)}function Hl(e){return 5===e.type||2===e.type}function Wl(e){return 7===e.type&&"slot"===e.name}function zl(e){return 1===e.type&&3===e.tagType}function Kl(e){return 1===e.type&&2===e.tagType}function Gl(e,t){return e||t?ji:Ui}function ql(e,t){return e||t?Bi:Li}const Jl=new Set([ol,rl]);function Zl(e,t=[]){if(e&&!R(e)&&14===e.type){const n=e.callee;if(!R(n)&&Jl.has(n))return Zl(e.arguments[0],t.concat(e))}return [e,t]}function Yl(e,t,n){let o,r,s=13===e.type?e.props:e.arguments[2],i=[];if(s&&!R(s)&&14===s.type){const e=Zl(s);s=e[0],i=e[1],r=i[i.length-1];}if(null==s||R(s))o=Sl([t]);else if(14===s.type){const e=s.arguments[0];R(e)||15!==e.type?s.callee===sl?o=wl(n.helper(el),[Sl([t]),s]):s.arguments.unshift(Sl([t])):Ql(t,e)||e.properties.unshift(t),!o&&(o=s);}else 15===s.type?(Ql(t,s)||s.properties.unshift(t),o=s):(o=wl(n.helper(el),[Sl([t]),s]),r&&r.callee===rl&&(r=i[i.length-2]));13===e.type?r?r.arguments[0]=o:e.props=o:r?r.arguments[0]=o:e.arguments[2]=o;}function Ql(e,t){let n=!1;if(4===e.key.type){const o=e.key.content;n=t.properties.some((e=>4===e.key.type&&e.key.content===o));}return n}function Xl(e,t){return `_${t}_${e.replace(/[^\w]/g,((t,n)=>"-"===t?"_":e.charCodeAt(n).toString()))}`}function ec(e,{helper:t,removeHelper:n,inSSR:o}){e.isBlock||(e.isBlock=!0,n(Gl(o,e.isComponent)),t(Ii),t(ql(o,e.isComponent)));}const tc=/&(gt|lt|amp|apos|quot);/g,nc={gt:">",lt:"<",amp:"&",apos:"'",quot:'"'},oc={delimiters:["{{","}}"],getNamespace:()=>0,getTextMode:()=>0,isVoidTag:b,isPreTag:b,isCustomElement:b,decodeEntities:e=>e.replace(tc,((e,t)=>nc[t])),onError:Oi,onWarn:Ai,comments:!1};function rc(e,t={}){const n=function(e,t){const n=k({},oc);let o;for(o in t)n[o]=void 0===t[o]?oc[o]:t[o];return {options:n,column:1,line:1,offset:0,originalSource:e,source:e,inPre:!1,inVPre:!1,onWarn:n.onWarn}}(e,t),o=yc(n);return function(e,t=yl){return {type:0,children:e,helpers:new Set,components:[],directives:[],hoists:[],imports:[],cached:0,temps:0,codegenNode:void 0,loc:t}}(sc(n,0,[]),_c(n,o))}function sc(e,t,n){const o=bc(n),r=o?o.ns:0,s=[];for(;!wc(e,t,n);){const i=e.source;let l;if(0===t||1===t)if(!e.inVPre&&Sc(i,e.options.delimiters[0]))l=mc(e,t);else if(0===t&&"<"===i[0])if(1===i.length);else if("!"===i[1])l=Sc(i,"\x3c!--")?cc(e):Sc(i,"<!DOCTYPE")?ac(e):Sc(i,"<![CDATA[")&&0!==r?lc(e,n):ac(e);else if("/"===i[1])if(2===i.length);else {if(">"===i[2]){xc(e,3);continue}if(/[a-z]/i.test(i[2])){fc(e,1,o);continue}l=ac(e);}else /[a-z]/i.test(i[1])?l=uc(e,n):"?"===i[1]&&(l=ac(e));if(l||(l=gc(e,t)),E(l))for(let e=0;e<l.length;e++)ic(s,l[e]);else ic(s,l);}let i=!1;if(2!==t&&1!==t){const t="preserve"!==e.options.whitespace;for(let n=0;n<s.length;n++){const o=s[n];if(2===o.type)if(e.inPre)o.content=o.content.replace(/\r\n/g,"\n");else if(/[^\t\r\n\f ]/.test(o.content))t&&(o.content=o.content.replace(/[\t\r\n\f ]+/g," "));else {const e=s[n-1],r=s[n+1];!e||!r||t&&(3===e.type&&3===r.type||3===e.type&&1===r.type||1===e.type&&3===r.type||1===e.type&&1===r.type&&/[\r\n]/.test(o.content))?(i=!0,s[n]=null):o.content=" ";}else 3!==o.type||e.options.comments||(i=!0,s[n]=null);}if(e.inPre&&o&&e.options.isPreTag(o.tag)){const e=s[0];e&&2===e.type&&(e.content=e.content.replace(/^\r?\n/,""));}}return i?s.filter(Boolean):s}function ic(e,t){if(2===t.type){const n=bc(e);if(n&&2===n.type&&n.loc.end.offset===t.loc.start.offset)return n.content+=t.content,n.loc.end=t.loc.end,void(n.loc.source+=t.loc.source)}e.push(t);}function lc(e,t){xc(e,9);const n=sc(e,3,t);return 0===e.source.length||xc(e,3),n}function cc(e){const t=yc(e);let n;const o=/--(\!)?>/.exec(e.source);if(o){n=e.source.slice(4,o.index);const t=e.source.slice(0,o.index);let r=1,s=0;for(;-1!==(s=t.indexOf("\x3c!--",r));)xc(e,s-r+1),r=s+1;xc(e,o.index+o[0].length-r+1);}else n=e.source.slice(4),xc(e,e.source.length);return {type:3,content:n,loc:_c(e,t)}}function ac(e){const t=yc(e),n="?"===e.source[1]?1:2;let o;const r=e.source.indexOf(">");return -1===r?(o=e.source.slice(n),xc(e,e.source.length)):(o=e.source.slice(n,r),xc(e,r+1)),{type:3,content:o,loc:_c(e,t)}}function uc(e,t){const n=e.inPre,o=e.inVPre,r=bc(t),s=fc(e,0,r),i=e.inPre&&!n,l=e.inVPre&&!o;if(s.isSelfClosing||e.options.isVoidTag(s.tag))return i&&(e.inPre=!1),l&&(e.inVPre=!1),s;t.push(s);const c=e.options.getTextMode(s,r),a=sc(e,c,t);if(t.pop(),s.children=a,Tc(e.source,s.tag))fc(e,1,r);else if(0===e.source.length&&"script"===s.tag.toLowerCase()){const e=a[0];e&&Sc(e.loc.source,"\x3c!--");}return s.loc=_c(e,s.loc.start),i&&(e.inPre=!1),l&&(e.inVPre=!1),s}const pc=t("if,else,else-if,for,slot");function fc(e,t,n){const o=yc(e),r=/^<\/?([a-z][^\t\r\n\f />]*)/i.exec(e.source),s=r[1],i=e.options.getNamespace(s,n);xc(e,r[0].length),Cc(e);const l=yc(e),c=e.source;e.options.isPreTag(s)&&(e.inPre=!0);let a=dc(e,t);0===t&&!e.inVPre&&a.some((e=>7===e.type&&"pre"===e.name))&&(e.inVPre=!0,k(e,l),e.source=c,a=dc(e,t).filter((e=>"v-pre"!==e.name)));let u=!1;if(0===e.source.length||(u=Sc(e.source,"/>"),xc(e,u?2:1)),1===t)return;let p=0;return e.inVPre||("slot"===s?p=2:"template"===s?a.some((e=>7===e.type&&pc(e.name)))&&(p=3):function(e,t,n){const o=n.options;if(o.isCustomElement(e))return !1;if("component"===e||/^[A-Z]/.test(e)||Al(e)||o.isBuiltInComponent&&o.isBuiltInComponent(e)||o.isNativeTag&&!o.isNativeTag(e))return !0;for(let r=0;r<t.length;r++){const e=t[r];if(6===e.type){if("is"===e.name&&e.value&&e.value.content.startsWith("vue:"))return !0}else {if("is"===e.name)return !0;"bind"===e.name&&Dl(e.arg,"is");}}}(s,a,e)&&(p=1)),{type:1,ns:i,tag:s,tagType:p,props:a,isSelfClosing:u,children:[],loc:_c(e,o),codegenNode:void 0}}function dc(e,t){const n=[],o=new Set;for(;e.source.length>0&&!Sc(e.source,">")&&!Sc(e.source,"/>");){if(Sc(e.source,"/")){xc(e,1),Cc(e);continue}const r=hc(e,o);6===r.type&&r.value&&"class"===r.name&&(r.value.content=r.value.content.replace(/\s+/g," ").trim()),0===t&&n.push(r),/^[^\t\r\n\f />]/.test(e.source),Cc(e);}return n}function hc(e,t){const n=yc(e),o=/^[^\t\r\n\f />][^\t\r\n\f />=]*/.exec(e.source)[0];t.has(o),t.add(o);{const e=/["'<]/g;for(;e.exec(o););}let r;xc(e,o.length),/^[\t\r\n\f ]*=/.test(e.source)&&(Cc(e),xc(e,1),Cc(e),r=function(e){const t=yc(e);let n;const o=e.source[0],r='"'===o||"'"===o;if(r){xc(e,1);const t=e.source.indexOf(o);-1===t?n=vc(e,e.source.length,4):(n=vc(e,t,4),xc(e,1));}else {const t=/^[^\t\r\n\f >]+/.exec(e.source);if(!t)return;const o=/["'<=`]/g;for(;o.exec(t[0]););n=vc(e,t[0].length,4);}return {content:n,isQuoted:r,loc:_c(e,t)}}(e));const s=_c(e,n);if(!e.inVPre&&/^(v-[A-Za-z0-9-]|:|\.|@|#)/.test(o)){const t=/(?:^v-([a-z0-9-]+))?(?:(?::|^\.|^@|^#)(\[[^\]]+\]|[^\.]+))?(.+)?$/i.exec(o);let i,l=Sc(o,"."),c=t[1]||(l||Sc(o,":")?"bind":Sc(o,"@")?"on":"slot");if(t[2]){const r="slot"===c,s=o.lastIndexOf(t[2]),l=_c(e,kc(e,n,s),kc(e,n,s+t[2].length+(r&&t[3]||"").length));let a=t[2],u=!0;a.startsWith("[")?(u=!1,a=a.endsWith("]")?a.slice(1,a.length-1):a.slice(1)):r&&(a+=t[3]||""),i={type:4,content:a,isStatic:u,constType:u?3:0,loc:l};}if(r&&r.isQuoted){const e=r.loc;e.start.offset++,e.start.column++,e.end=Bl(e.start,r.content),e.source=e.source.slice(1,-1);}const a=t[3]?t[3].slice(1).split("."):[];return l&&a.push("prop"),{type:7,name:c,exp:r&&{type:4,content:r.content,isStatic:!1,constType:0,loc:r.loc},arg:i,modifiers:a,loc:s}}return !e.inVPre&&Sc(o,"v-"),{type:6,name:o,value:r&&{type:2,content:r.content,loc:r.loc},loc:s}}function mc(e,t){const[n,o]=e.options.delimiters,r=e.source.indexOf(o,n.length);if(-1===r)return;const s=yc(e);xc(e,n.length);const i=yc(e),l=yc(e),c=r-n.length,a=e.source.slice(0,c),u=vc(e,c,t),p=u.trim(),f=u.indexOf(p);f>0&&Ll(i,a,f);return Ll(l,a,c-(u.length-p.length-f)),xc(e,o.length),{type:5,content:{type:4,isStatic:!1,constType:0,content:p,loc:_c(e,i,l)},loc:_c(e,s)}}function gc(e,t){const n=3===t?["]]>"]:["<",e.options.delimiters[0]];let o=e.source.length;for(let s=0;s<n.length;s++){const t=e.source.indexOf(n[s],1);-1!==t&&o>t&&(o=t);}const r=yc(e);return {type:2,content:vc(e,o,t),loc:_c(e,r)}}function vc(e,t,n){const o=e.source.slice(0,t);return xc(e,t),2!==n&&3!==n&&o.includes("&")?e.options.decodeEntities(o,4===n):o}function yc(e){const{column:t,line:n,offset:o}=e;return {column:t,line:n,offset:o}}function _c(e,t,n){return {start:t,end:n=n||yc(e),source:e.originalSource.slice(t.offset,n.offset)}}function bc(e){return e[e.length-1]}function Sc(e,t){return e.startsWith(t)}function xc(e,t){const{source:n}=e;Ll(e,n,t),e.source=n.slice(t);}function Cc(e){const t=/^[\t\r\n\f ]+/.exec(e.source);t&&xc(e,t[0].length);}function kc(e,t,n){return Bl(t,e.originalSource.slice(t.offset,n),n)}function wc(e,t,n){const o=e.source;switch(t){case 0:if(Sc(o,"</"))for(let e=n.length-1;e>=0;--e)if(Tc(o,n[e].tag))return !0;break;case 1:case 2:{const e=bc(n);if(e&&Tc(o,e.tag))return !0;break}case 3:if(Sc(o,"]]>"))return !0}return !o}function Tc(e,t){return Sc(e,"</")&&e.slice(2,2+t.length).toLowerCase()===t.toLowerCase()&&/[\t\r\n\f />]/.test(e[2+t.length]||">")}function Nc(e,t){Oc(e,t,Ec(e,e.children[0]));}function Ec(e,t){const{children:n}=e;return 1===n.length&&1===t.type&&!Kl(t)}function Oc(e,t,n=!1){const{children:o}=e,r=o.length;let s=0;for(let i=0;i<o.length;i++){const e=o[i];if(1===e.type&&0===e.tagType){const o=n?0:Ac(e,t);if(o>0){if(o>=2){e.codegenNode.patchFlag="-1",e.codegenNode=t.hoist(e.codegenNode),s++;continue}}else {const n=e.codegenNode;if(13===n.type){const o=Mc(n);if((!o||512===o||1===o)&&Rc(e,t)>=2){const o=$c(e);o&&(n.props=t.hoist(o));}n.dynamicProps&&(n.dynamicProps=t.hoist(n.dynamicProps));}}}if(1===e.type){const n=1===e.tagType;n&&t.scopes.vSlot++,Oc(e,t),n&&t.scopes.vSlot--;}else if(11===e.type)Oc(e,t,1===e.children.length);else if(9===e.type)for(let n=0;n<e.branches.length;n++)Oc(e.branches[n],t,1===e.branches[n].children.length);}s&&t.transformHoist&&t.transformHoist(o,t,e),s&&s===r&&1===e.type&&0===e.tagType&&e.codegenNode&&13===e.codegenNode.type&&E(e.codegenNode.children)&&(e.codegenNode.children=t.hoist(bl(e.codegenNode.children)));}function Ac(e,t){const{constantCache:n}=t;switch(e.type){case 1:if(0!==e.tagType)return 0;const o=n.get(e);if(void 0!==o)return o;const r=e.codegenNode;if(13!==r.type)return 0;if(r.isBlock&&"svg"!==e.tag&&"foreignObject"!==e.tag)return 0;if(Mc(r))return n.set(e,0),0;{let o=3;const s=Rc(e,t);if(0===s)return n.set(e,0),0;s<o&&(o=s);for(let r=0;r<e.children.length;r++){const s=Ac(e.children[r],t);if(0===s)return n.set(e,0),0;s<o&&(o=s);}if(o>1)for(let r=0;r<e.props.length;r++){const s=e.props[r];if(7===s.type&&"bind"===s.name&&s.exp){const r=Ac(s.exp,t);if(0===r)return n.set(e,0),0;r<o&&(o=r);}}if(r.isBlock){for(let t=0;t<e.props.length;t++){if(7===e.props[t].type)return n.set(e,0),0}t.removeHelper(Ii),t.removeHelper(ql(t.inSSR,r.isComponent)),r.isBlock=!1,t.helper(Gl(t.inSSR,r.isComponent));}return n.set(e,o),o}case 2:case 3:return 3;case 9:case 11:case 10:default:return 0;case 5:case 12:return Ac(e.content,t);case 4:return e.constType;case 8:let s=3;for(let n=0;n<e.children.length;n++){const o=e.children[n];if(R(o)||$(o))continue;const r=Ac(o,t);if(0===r)return 0;r<s&&(s=r);}return s}}const Fc=new Set([tl,nl,ol,rl]);function Pc(e,t){if(14===e.type&&!R(e.callee)&&Fc.has(e.callee)){const n=e.arguments[0];if(4===n.type)return Ac(n,t);if(14===n.type)return Pc(n,t)}return 0}function Rc(e,t){let n=3;const o=$c(e);if(o&&15===o.type){const{properties:e}=o;for(let o=0;o<e.length;o++){const{key:r,value:s}=e[o],i=Ac(r,t);if(0===i)return i;let l;if(i<n&&(n=i),l=4===s.type?Ac(s,t):14===s.type?Pc(s,t):0,0===l)return l;l<n&&(n=l);}}return n}function $c(e){const t=e.codegenNode;if(13===t.type)return t.props}function Mc(e){const t=e.patchFlag;return t?parseInt(t,10):void 0}function Vc(e,{filename:t="",prefixIdentifiers:n=!1,hoistStatic:o=!1,cacheHandlers:r=!1,nodeTransforms:s=[],directiveTransforms:i={},transformHoist:l=null,isBuiltInComponent:c=_,isCustomElement:a=_,expressionPlugins:u=[],scopeId:p=null,slotted:f=!0,ssr:d=!1,inSSR:h=!1,ssrCssVars:m="",bindingMetadata:g=v,inline:y=!1,isTS:b=!1,onError:S=Oi,onWarn:x=Ai,compatConfig:C}){const k=t.replace(/\?.*$/,"").match(/([^/\\]+)\.\w+$/),w={selfName:k&&q(z(k[1])),prefixIdentifiers:n,hoistStatic:o,cacheHandlers:r,nodeTransforms:s,directiveTransforms:i,transformHoist:l,isBuiltInComponent:c,isCustomElement:a,expressionPlugins:u,scopeId:p,slotted:f,ssr:d,inSSR:h,ssrCssVars:m,bindingMetadata:g,inline:y,isTS:b,onError:S,onWarn:x,compatConfig:C,root:e,helpers:new Map,components:new Set,directives:new Set,hoists:[],imports:[],constantCache:new Map,temps:0,cached:0,identifiers:Object.create(null),scopes:{vFor:0,vSlot:0,vPre:0,vOnce:0},parent:null,currentNode:e,childIndex:0,inVOnce:!1,helper(e){const t=w.helpers.get(e)||0;return w.helpers.set(e,t+1),e},removeHelper(e){const t=w.helpers.get(e);if(t){const n=t-1;n?w.helpers.set(e,n):w.helpers.delete(e);}},helperString:e=>`_${vl[w.helper(e)]}`,replaceNode(e){w.parent.children[w.childIndex]=w.currentNode=e;},removeNode(e){const t=e?w.parent.children.indexOf(e):w.currentNode?w.childIndex:-1;e&&e!==w.currentNode?w.childIndex>t&&(w.childIndex--,w.onNodeRemoved()):(w.currentNode=null,w.onNodeRemoved()),w.parent.children.splice(t,1);},onNodeRemoved:()=>{},addIdentifiers(e){},removeIdentifiers(e){},hoist(e){R(e)&&(e=Cl(e)),w.hoists.push(e);const t=Cl(`_hoisted_${w.hoists.length}`,!1,e.loc,2);return t.hoisted=e,t},cache:(e,t=!1)=>function(e,t,n=!1){return {type:20,index:e,value:t,isVNode:n,loc:yl}}(w.cached++,e,t)};return w}function Ic(e,t){const n=Vc(e,t);Bc(e,n),t.hoistStatic&&Nc(e,n),t.ssr||function(e,t){const{helper:n}=t,{children:o}=e;if(1===o.length){const n=o[0];if(Ec(e,n)&&n.codegenNode){const o=n.codegenNode;13===o.type&&ec(o,t),e.codegenNode=o;}else e.codegenNode=n;}else if(o.length>1){let o=64;e.codegenNode=_l(t,n(Pi),void 0,e.children,o+"",void 0,void 0,!0,void 0,!1);}}(e,n),e.helpers=new Set([...n.helpers.keys()]),e.components=[...n.components],e.directives=[...n.directives],e.imports=n.imports,e.hoists=n.hoists,e.temps=n.temps,e.cached=n.cached;}function Bc(e,t){t.currentNode=e;const{nodeTransforms:n}=t,o=[];for(let s=0;s<n.length;s++){const r=n[s](e,t);if(r&&(E(r)?o.push(...r):o.push(r)),!t.currentNode)return;e=t.currentNode;}switch(e.type){case 3:t.ssr||t.helper(Di);break;case 5:t.ssr||t.helper(Xi);break;case 9:for(let n=0;n<e.branches.length;n++)Bc(e.branches[n],t);break;case 10:case 11:case 1:case 0:!function(e,t){let n=0;const o=()=>{n--;};for(;n<e.children.length;n++){const r=e.children[n];R(r)||(t.parent=e,t.childIndex=n,t.onNodeRemoved=o,Bc(r,t));}}(e,t);}t.currentNode=e;let r=o.length;for(;r--;)o[r]();}function Lc(e,t){const n=R(e)?t=>t===e:t=>e.test(t);return (e,o)=>{if(1===e.type){const{props:r}=e;if(3===e.tagType&&r.some(Wl))return;const s=[];for(let i=0;i<r.length;i++){const l=r[i];if(7===l.type&&n(l.name)){r.splice(i,1),i--;const n=t(e,l,o);n&&s.push(n);}}return s}}}const jc="/*#__PURE__*/",Uc=e=>`${vl[e]}: _${vl[e]}`;function Dc(e,{mode:t="function",prefixIdentifiers:n="module"===t,sourceMap:o=!1,filename:r="template.vue.html",scopeId:s=null,optimizeImports:i=!1,runtimeGlobalName:l="Vue",runtimeModuleName:c="vue",ssrRuntimeModuleName:a="vue/server-renderer",ssr:u=!1,isTS:p=!1,inSSR:f=!1}){const d={mode:t,prefixIdentifiers:n,sourceMap:o,filename:r,scopeId:s,optimizeImports:i,runtimeGlobalName:l,runtimeModuleName:c,ssrRuntimeModuleName:a,ssr:u,isTS:p,inSSR:f,source:e.loc.source,code:"",column:1,line:1,offset:0,indentLevel:0,pure:!1,map:void 0,helper:e=>`_${vl[e]}`,push(e,t){d.code+=e;},indent(){h(++d.indentLevel);},deindent(e=!1){e?--d.indentLevel:h(--d.indentLevel);},newline(){h(d.indentLevel);}};function h(e){d.push("\n"+"  ".repeat(e));}return d}function Hc(e,t={}){const n=Dc(e,t);t.onContextCreated&&t.onContextCreated(n);const{mode:o,push:r,prefixIdentifiers:s,indent:i,deindent:l,newline:c,ssr:a}=n,u=Array.from(e.helpers),p=u.length>0,f=!s&&"module"!==o,d=n;!function(e,t){const{push:n,newline:o,runtimeGlobalName:r}=t,s=r,i=Array.from(e.helpers);if(i.length>0&&(n(`const _Vue = ${s}\n`),e.hoists.length)){n(`const { ${[ji,Ui,Di,Hi,Wi].filter((e=>i.includes(e))).map(Uc).join(", ")} } = _Vue\n`);}(function(e,t){if(!e.length)return;t.pure=!0;const{push:n,newline:o}=t;o();for(let r=0;r<e.length;r++){const s=e[r];s&&(n(`const _hoisted_${r+1} = `),Gc(s,t),o());}t.pure=!1;})(e.hoists,t),o(),n("return ");}(e,d);if(r(`function ${a?"ssrRender":"render"}(${(a?["_ctx","_push","_parent","_attrs"]:["_ctx","_cache"]).join(", ")}) {`),i(),f&&(r("with (_ctx) {"),i(),p&&(r(`const { ${u.map(Uc).join(", ")} } = _Vue`),r("\n"),c())),e.components.length&&(Wc(e.components,"component",n),(e.directives.length||e.temps>0)&&c()),e.directives.length&&(Wc(e.directives,"directive",n),e.temps>0&&c()),e.temps>0){r("let ");for(let t=0;t<e.temps;t++)r(`${t>0?", ":""}_temp${t}`);}return (e.components.length||e.directives.length||e.temps)&&(r("\n"),c()),a||r("return "),e.codegenNode?Gc(e.codegenNode,n):r("null"),f&&(l(),r("}")),l(),r("}"),{ast:e,code:n.code,preamble:"",map:n.map?n.map.toJSON():void 0}}function Wc(e,t,{helper:n,push:o,newline:r,isTS:s}){const i=n("component"===t?zi:Gi);for(let l=0;l<e.length;l++){let n=e[l];const c=n.endsWith("__self");c&&(n=n.slice(0,-6)),o(`const ${Xl(n,t)} = ${i}(${JSON.stringify(n)}${c?", true":""})${s?"!":""}`),l<e.length-1&&r();}}function zc(e,t){const n=e.length>3||!1;t.push("["),n&&t.indent(),Kc(e,t,n),n&&t.deindent(),t.push("]");}function Kc(e,t,n=!1,o=!0){const{push:r,newline:s}=t;for(let i=0;i<e.length;i++){const l=e[i];R(l)?r(l):E(l)?zc(l,t):Gc(l,t),i<e.length-1&&(n?(o&&r(","),s()):o&&r(", "));}}function Gc(e,t){if(R(e))t.push(e);else if($(e))t.push(t.helper(e));else switch(e.type){case 1:case 9:case 11:case 12:Gc(e.codegenNode,t);break;case 2:!function(e,t){t.push(JSON.stringify(e.content),e);}(e,t);break;case 4:qc(e,t);break;case 5:!function(e,t){const{push:n,helper:o,pure:r}=t;r&&n(jc);n(`${o(Xi)}(`),Gc(e.content,t),n(")");}(e,t);break;case 8:Jc(e,t);break;case 3:!function(e,t){const{push:n,helper:o,pure:r}=t;r&&n(jc);n(`${o(Di)}(${JSON.stringify(e.content)})`,e);}(e,t);break;case 13:!function(e,t){const{push:n,helper:o,pure:r}=t,{tag:s,props:i,children:l,patchFlag:c,dynamicProps:a,directives:u,isBlock:p,disableTracking:f,isComponent:d}=e;u&&n(o(Ji)+"(");p&&n(`(${o(Ii)}(${f?"true":""}), `);r&&n(jc);const h=p?ql(t.inSSR,d):Gl(t.inSSR,d);n(o(h)+"(",e),Kc(function(e){let t=e.length;for(;t--&&null==e[t];);return e.slice(0,t+1).map((e=>e||"null"))}([s,i,l,c,a]),t),n(")"),p&&n(")");u&&(n(", "),Gc(u,t),n(")"));}(e,t);break;case 14:!function(e,t){const{push:n,helper:o,pure:r}=t,s=R(e.callee)?e.callee:o(e.callee);r&&n(jc);n(s+"(",e),Kc(e.arguments,t),n(")");}(e,t);break;case 15:!function(e,t){const{push:n,indent:o,deindent:r,newline:s}=t,{properties:i}=e;if(!i.length)return void n("{}",e);const l=i.length>1||!1;n(l?"{":"{ "),l&&o();for(let c=0;c<i.length;c++){const{key:e,value:o}=i[c];Zc(e,t),n(": "),Gc(o,t),c<i.length-1&&(n(","),s());}l&&r(),n(l?"}":" }");}(e,t);break;case 17:!function(e,t){zc(e.elements,t);}(e,t);break;case 18:!function(e,t){const{push:n,indent:o,deindent:r}=t,{params:s,returns:i,body:l,newline:c,isSlot:a}=e;a&&n(`_${vl[fl]}(`);n("(",e),E(s)?Kc(s,t):s&&Gc(s,t);n(") => "),(c||l)&&(n("{"),o());i?(c&&n("return "),E(i)?zc(i,t):Gc(i,t)):l&&Gc(l,t);(c||l)&&(r(),n("}"));a&&n(")");}(e,t);break;case 19:!function(e,t){const{test:n,consequent:o,alternate:r,newline:s}=e,{push:i,indent:l,deindent:c,newline:a}=t;if(4===n.type){const e=!Pl(n.content);e&&i("("),qc(n,t),e&&i(")");}else i("("),Gc(n,t),i(")");s&&l(),t.indentLevel++,s||i(" "),i("? "),Gc(o,t),t.indentLevel--,s&&a(),s||i(" "),i(": ");const u=19===r.type;u||t.indentLevel++;Gc(r,t),u||t.indentLevel--;s&&c(!0);}(e,t);break;case 20:!function(e,t){const{push:n,helper:o,indent:r,deindent:s,newline:i}=t;n(`_cache[${e.index}] || (`),e.isVNode&&(r(),n(`${o(al)}(-1),`),i());n(`_cache[${e.index}] = `),Gc(e.value,t),e.isVNode&&(n(","),i(),n(`${o(al)}(1),`),i(),n(`_cache[${e.index}]`),s());n(")");}(e,t);break;case 21:Kc(e.body,t,!0,!1);}}function qc(e,t){const{content:n,isStatic:o}=e;t.push(o?JSON.stringify(n):n,e);}function Jc(e,t){for(let n=0;n<e.children.length;n++){const o=e.children[n];R(o)?t.push(o):Gc(o,t);}}function Zc(e,t){const{push:n}=t;if(8===e.type)n("["),Jc(e,t),n("]");else if(e.isStatic){n(Pl(e.content)?e.content:JSON.stringify(e.content),e);}else n(`[${e.content}]`,e);}const Yc=Lc(/^(if|else|else-if)$/,((e,t,n)=>function(e,t,n,o){if(!("else"===t.name||t.exp&&t.exp.content.trim())){t.exp=Cl("true",!1,t.exp?t.exp.loc:e.loc);}if("if"===t.name){const r=Qc(e,t),s={type:9,loc:e.loc,branches:[r]};if(n.replaceNode(s),o)return o(s,r,!0)}else {const r=n.parent.children;let s=r.indexOf(e);for(;s-- >=-1;){const i=r[s];if(i&&3===i.type)n.removeNode(i);else {if(!i||2!==i.type||i.content.trim().length){if(i&&9===i.type){n.removeNode();const r=Qc(e,t);i.branches.push(r);const s=o&&o(i,r,!1);Bc(r,n),s&&s(),n.currentNode=null;}break}n.removeNode(i);}}}}(e,t,n,((e,t,o)=>{const r=n.parent.children;let s=r.indexOf(e),i=0;for(;s-- >=0;){const e=r[s];e&&9===e.type&&(i+=e.branches.length);}return ()=>{if(o)e.codegenNode=Xc(t,i,n);else {const o=function(e){for(;;)if(19===e.type){if(19!==e.alternate.type)return e;e=e.alternate;}else 20===e.type&&(e=e.value);}(e.codegenNode);o.alternate=Xc(t,i+e.branches.length-1,n);}}}))));function Qc(e,t){const n=3===e.tagType;return {type:10,loc:e.loc,condition:"else"===t.name?void 0:t.exp,children:n&&!jl(e,"for")?e.children:[e],userKey:Ul(e,"key"),isTemplateIf:n}}function Xc(e,t,n){return e.condition?Nl(e.condition,ea(e,t,n),wl(n.helper(Di),['""',"true"])):ea(e,t,n)}function ea(e,t,n){const{helper:o}=n,r=xl("key",Cl(`${t}`,!1,yl,2)),{children:s}=e,i=s[0];if(1!==s.length||1!==i.type){if(1===s.length&&11===i.type){const e=i.codegenNode;return Yl(e,r,n),e}{let t=64;return _l(n,o(Pi),Sl([r]),s,t+"",void 0,void 0,!0,!1,!1,e.loc)}}{const e=i.codegenNode,t=14===(l=e).type&&l.callee===ml?l.arguments[1].returns:l;return 13===t.type&&ec(t,n),Yl(t,r,n),e}var l;}const ta=Lc("for",((e,t,n)=>{const{helper:o,removeHelper:r}=n;return function(e,t,n,o){if(!t.exp)return;const r=sa(t.exp);if(!r)return;const{scopes:s}=n,{source:i,value:l,key:c,index:a}=r,u={type:11,loc:t.loc,source:i,valueAlias:l,keyAlias:c,objectIndexAlias:a,parseResult:r,children:zl(e)?e.children:[e]};n.replaceNode(u),s.vFor++;const p=o&&o(u);return ()=>{s.vFor--,p&&p();}}(e,t,n,(t=>{const s=wl(o(Zi),[t.source]),i=zl(e),l=jl(e,"memo"),c=Ul(e,"key"),a=c&&(6===c.type?Cl(c.value.content,!0):c.exp),u=c?xl("key",a):null,p=4===t.source.type&&t.source.constType>0,f=p?64:c?128:256;return t.codegenNode=_l(n,o(Pi),void 0,s,f+"",void 0,void 0,!0,!p,!1,e.loc),()=>{let c;const{children:f}=t,d=1!==f.length||1!==f[0].type,h=Kl(e)?e:i&&1===e.children.length&&Kl(e.children[0])?e.children[0]:null;if(h?(c=h.codegenNode,i&&u&&Yl(c,u,n)):d?c=_l(n,o(Pi),u?Sl([u]):void 0,e.children,"64",void 0,void 0,!0,void 0,!1):(c=f[0].codegenNode,i&&u&&Yl(c,u,n),c.isBlock!==!p&&(c.isBlock?(r(Ii),r(ql(n.inSSR,c.isComponent))):r(Gl(n.inSSR,c.isComponent))),c.isBlock=!p,c.isBlock?(o(Ii),o(ql(n.inSSR,c.isComponent))):o(Gl(n.inSSR,c.isComponent))),l){const e=Tl(la(t.parseResult,[Cl("_cached")]));e.body={type:21,body:[kl(["const _memo = (",l.exp,")"]),kl(["if (_cached",...a?[" && _cached.key === ",a]:[],` && ${n.helperString(gl)}(_cached, _memo)) return _cached`]),kl(["const _item = ",c]),Cl("_item.memo = _memo"),Cl("return _item")],loc:yl},s.arguments.push(e,Cl("_cache"),Cl(String(n.cached++)));}else s.arguments.push(Tl(la(t.parseResult),c,!0));}}))}));const na=/([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,oa=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,ra=/^\(|\)$/g;function sa(e,t){const n=e.loc,o=e.content,r=o.match(na);if(!r)return;const[,s,i]=r,l={source:ia(n,i.trim(),o.indexOf(i,s.length)),value:void 0,key:void 0,index:void 0};let c=s.trim().replace(ra,"").trim();const a=s.indexOf(c),u=c.match(oa);if(u){c=c.replace(oa,"").trim();const e=u[1].trim();let t;if(e&&(t=o.indexOf(e,a+c.length),l.key=ia(n,e,t)),u[2]){const r=u[2].trim();r&&(l.index=ia(n,r,o.indexOf(r,l.key?t+e.length:a+c.length)));}}return c&&(l.value=ia(n,c,a)),l}function ia(e,t,n){return Cl(t,!1,Il(e,n,t.length))}function la({value:e,key:t,index:n},o=[]){return function(e){let t=e.length;for(;t--&&!e[t];);return e.slice(0,t+1).map(((e,t)=>e||Cl("_".repeat(t+1),!1)))}([e,t,n,...o])}const ca=Cl("undefined",!1),aa=(e,t)=>{if(1===e.type&&(1===e.tagType||3===e.tagType)){const n=jl(e,"slot");if(n)return t.scopes.vSlot++,()=>{t.scopes.vSlot--;}}},ua=(e,t,n)=>Tl(e,t,!1,!0,t.length?t[0].loc:n);function pa(e,t,n=ua){t.helper(fl);const{children:o,loc:r}=e,s=[],i=[];let l=t.scopes.vSlot>0||t.scopes.vFor>0;const c=jl(e,"slot",!0);if(c){const{arg:e,exp:t}=c;e&&!El(e)&&(l=!0),s.push(xl(e||Cl("default",!0),n(t,o,r)));}let a=!1,u=!1;const p=[],f=new Set;let d=0;for(let g=0;g<o.length;g++){const e=o[g];let r;if(!zl(e)||!(r=jl(e,"slot",!0))){3!==e.type&&p.push(e);continue}if(c)break;a=!0;const{children:h,loc:m}=e,{arg:v=Cl("default",!0),exp:y}=r;let _;El(v)?_=v?v.content:"default":l=!0;const b=n(y,h,m);let S,x,C;if(S=jl(e,"if"))l=!0,i.push(Nl(S.exp,fa(v,b,d++),ca));else if(x=jl(e,/^else(-if)?$/,!0)){let e,t=g;for(;t--&&(e=o[t],3===e.type););if(e&&zl(e)&&jl(e,"if")){o.splice(g,1),g--;let e=i[i.length-1];for(;19===e.alternate.type;)e=e.alternate;e.alternate=x.exp?Nl(x.exp,fa(v,b,d++),ca):fa(v,b,d++);}}else if(C=jl(e,"for")){l=!0;const e=C.parseResult||sa(C.exp);e&&i.push(wl(t.helper(Zi),[e.source,Tl(la(e),fa(v,b),!0)]));}else {if(_){if(f.has(_))continue;f.add(_),"default"===_&&(u=!0);}s.push(xl(v,b));}}if(!c){const e=(e,t)=>xl("default",n(e,t,r));a?p.length&&p.some((e=>ha(e)))&&(u||s.push(e(void 0,p))):s.push(e(void 0,o));}const h=l?2:da(e.children)?3:1;let m=Sl(s.concat(xl("_",Cl(h+"",!1))),r);return i.length&&(m=wl(t.helper(Qi),[m,bl(i)])),{slots:m,hasDynamicSlots:l}}function fa(e,t,n){const o=[xl("name",e),xl("fn",t)];return null!=n&&o.push(xl("key",Cl(String(n),!0))),Sl(o)}function da(e){for(let t=0;t<e.length;t++){const n=e[t];switch(n.type){case 1:if(2===n.tagType||da(n.children))return !0;break;case 9:if(da(n.branches))return !0;break;case 10:case 11:if(da(n.children))return !0}}return !1}function ha(e){return 2!==e.type&&12!==e.type||(2===e.type?!!e.content.trim():ha(e.content))}const ma=new WeakMap,ga=(e,t)=>function(){if(1!==(e=t.currentNode).type||0!==e.tagType&&1!==e.tagType)return;const{tag:n,props:o}=e,r=1===e.tagType;let s=r?function(e,t,n=!1){let{tag:o}=e;const r=ba(o),s=Ul(e,"is");if(s)if(r){const e=6===s.type?s.value&&Cl(s.value.content,!0):s.exp;if(e)return wl(t.helper(Ki),[e])}else 6===s.type&&s.value.content.startsWith("vue:")&&(o=s.value.content.slice(4));const i=!r&&jl(e,"is");if(i&&i.exp)return wl(t.helper(Ki),[i.exp]);const l=Al(o)||t.isBuiltInComponent(o);if(l)return n||t.helper(l),l;return t.helper(zi),t.components.add(o),Xl(o,"component")}(e,t):`"${n}"`;const i=M(s)&&s.callee===Ki;let l,c,a,u,p,f,d=0,h=i||s===Ri||s===$i||!r&&("svg"===n||"foreignObject"===n);if(o.length>0){const n=va(e,t,void 0,r,i);l=n.props,d=n.patchFlag,p=n.dynamicPropNames;const o=n.directives;f=o&&o.length?bl(o.map((e=>function(e,t){const n=[],o=ma.get(e);o?n.push(t.helperString(o)):(t.helper(Gi),t.directives.add(e.name),n.push(Xl(e.name,"directive")));const{loc:r}=e;e.exp&&n.push(e.exp);e.arg&&(e.exp||n.push("void 0"),n.push(e.arg));if(Object.keys(e.modifiers).length){e.arg||(e.exp||n.push("void 0"),n.push("void 0"));const t=Cl("true",!1,r);n.push(Sl(e.modifiers.map((e=>xl(e,t))),r));}return bl(n,e.loc)}(e,t)))):void 0,n.shouldUseBlock&&(h=!0);}if(e.children.length>0){s===Mi&&(h=!0,d|=1024);if(r&&s!==Ri&&s!==Mi){const{slots:n,hasDynamicSlots:o}=pa(e,t);c=n,o&&(d|=1024);}else if(1===e.children.length&&s!==Ri){const n=e.children[0],o=n.type,r=5===o||8===o;r&&0===Ac(n,t)&&(d|=1),c=r||2===o?n:e.children;}else c=e.children;}0!==d&&(a=String(d),p&&p.length&&(u=function(e){let t="[";for(let n=0,o=e.length;n<o;n++)t+=JSON.stringify(e[n]),n<o-1&&(t+=", ");return t+"]"}(p))),e.codegenNode=_l(t,s,l,c,a,u,f,!!h,!1,r,e.loc);};function va(e,t,n=e.props,o,r,s=!1){const{tag:i,loc:l,children:c}=e;let a=[];const u=[],p=[],f=c.length>0;let d=!1,h=0,m=!1,g=!1,v=!1,y=!1,_=!1,b=!1;const S=[],C=e=>{a.length&&(u.push(Sl(ya(a),l)),a=[]),e&&u.push(e);},k=({key:e,value:n})=>{if(El(e)){const s=e.content,i=x(s);if(!i||o&&!r||"onclick"===s.toLowerCase()||"onUpdate:modelValue"===s||U(s)||(y=!0),i&&U(s)&&(b=!0),20===n.type||(4===n.type||8===n.type)&&Ac(n,t)>0)return;"ref"===s?m=!0:"class"===s?g=!0:"style"===s?v=!0:"key"===s||S.includes(s)||S.push(s),!o||"class"!==s&&"style"!==s||S.includes(s)||S.push(s);}else _=!0;};for(let x=0;x<n.length;x++){const r=n[x];if(6===r.type){const{loc:e,name:n,value:o}=r;let s=!0;if("ref"===n&&(m=!0,t.scopes.vFor>0&&a.push(xl(Cl("ref_for",!0),Cl("true")))),"is"===n&&(ba(i)||o&&o.content.startsWith("vue:")))continue;a.push(xl(Cl(n,!0,Il(e,0,n.length)),Cl(o?o.content:"",s,o?o.loc:e)));}else {const{name:n,arg:c,exp:h,loc:m}=r,g="bind"===n,v="on"===n;if("slot"===n)continue;if("once"===n||"memo"===n)continue;if("is"===n||g&&Dl(c,"is")&&ba(i))continue;if(v&&s)continue;if((g&&Dl(c,"key")||v&&f&&Dl(c,"vue:before-update"))&&(d=!0),g&&Dl(c,"ref")&&t.scopes.vFor>0&&a.push(xl(Cl("ref_for",!0),Cl("true"))),!c&&(g||v)){_=!0,h&&(g?(C(),u.push(h)):C({type:14,loc:m,callee:t.helper(sl),arguments:o?[h]:[h,"true"]}));continue}const y=t.directiveTransforms[n];if(y){const{props:n,needRuntime:o}=y(r,e,t);!s&&n.forEach(k),v&&c&&!El(c)?C(Sl(n,l)):a.push(...n),o&&(p.push(r),$(o)&&ma.set(r,o));}else D(n)||(p.push(r),f&&(d=!0));}}let w;if(u.length?(C(),w=u.length>1?wl(t.helper(el),u,l):u[0]):a.length&&(w=Sl(ya(a),l)),_?h|=16:(g&&!o&&(h|=2),v&&!o&&(h|=4),S.length&&(h|=8),y&&(h|=32)),d||0!==h&&32!==h||!(m||b||p.length>0)||(h|=512),!t.inSSR&&w)switch(w.type){case 15:let e=-1,n=-1,o=!1;for(let t=0;t<w.properties.length;t++){const r=w.properties[t].key;El(r)?"class"===r.content?e=t:"style"===r.content&&(n=t):r.isHandlerKey||(o=!0);}const r=w.properties[e],s=w.properties[n];o?w=wl(t.helper(ol),[w]):(r&&!El(r.value)&&(r.value=wl(t.helper(tl),[r.value])),s&&(v||4===s.value.type&&"["===s.value.content.trim()[0]||17===s.value.type)&&(s.value=wl(t.helper(nl),[s.value])));break;case 14:break;default:w=wl(t.helper(ol),[wl(t.helper(rl),[w])]);}return {props:w,directives:p,patchFlag:h,dynamicPropNames:S,shouldUseBlock:d}}function ya(e){const t=new Map,n=[];for(let o=0;o<e.length;o++){const r=e[o];if(8===r.key.type||!r.key.isStatic){n.push(r);continue}const s=r.key.content,i=t.get(s);i?("style"===s||"class"===s||x(s))&&_a(i,r):(t.set(s,r),n.push(r));}return n}function _a(e,t){17===e.value.type?e.value.elements.push(t.value):e.value=bl([e.value,t.value],e.loc);}function ba(e){return "component"===e||"Component"===e}const Sa=(e,t)=>{if(Kl(e)){const{children:n,loc:o}=e,{slotName:r,slotProps:s}=function(e,t){let n,o='"default"';const r=[];for(let s=0;s<e.props.length;s++){const t=e.props[s];6===t.type?t.value&&("name"===t.name?o=JSON.stringify(t.value.content):(t.name=z(t.name),r.push(t))):"bind"===t.name&&Dl(t.arg,"name")?t.exp&&(o=t.exp):("bind"===t.name&&t.arg&&El(t.arg)&&(t.arg.content=z(t.arg.content)),r.push(t));}if(r.length>0){const{props:o,directives:s}=va(e,t,r,!1,!1);n=o;}return {slotName:o,slotProps:n}}(e,t),i=[t.prefixIdentifiers?"_ctx.$slots":"$slots",r,"{}","undefined","true"];let l=2;s&&(i[2]=s,l=3),n.length&&(i[3]=Tl([],n,!1,!1,o),l=4),t.scopeId&&!t.slotted&&(l=5),i.splice(l),e.codegenNode=wl(t.helper(Yi),i,o);}};const xa=/^\s*([\w$_]+|(async\s*)?\([^)]*?\))\s*(:[^=]+)?=>|^\s*(async\s+)?function(?:\s+[\w$]+)?\s*\(/,Ca=(e,t,n,o)=>{const{loc:r,modifiers:s,arg:i}=e;let l;if(4===i.type)if(i.isStatic){let e=i.content;e.startsWith("vue:")&&(e=`vnode-${e.slice(4)}`);l=Cl(0!==t.tagType||e.startsWith("vnode")||!/[A-Z]/.test(e)?J(z(e)):`on:${e}`,!0,i.loc);}else l=kl([`${n.helperString(cl)}(`,i,")"]);else l=i,l.children.unshift(`${n.helperString(cl)}(`),l.children.push(")");let c=e.exp;c&&!c.content.trim()&&(c=void 0);let a=n.cacheHandlers&&!c&&!n.inVOnce;if(c){const e=Vl(c.content),t=!(e||xa.test(c.content)),n=c.content.includes(";");(t||a&&e)&&(c=kl([`${t?"$event":"(...args)"} => ${n?"{":"("}`,c,n?"}":")"]));}let u={props:[xl(l,c||Cl("() => {}",!1,r))]};return o&&(u=o(u)),a&&(u.props[0].value=n.cache(u.props[0].value)),u.props.forEach((e=>e.key.isHandlerKey=!0)),u},ka=(e,t,n)=>{const{exp:o,modifiers:r,loc:s}=e,i=e.arg;return 4!==i.type?(i.children.unshift("("),i.children.push(') || ""')):i.isStatic||(i.content=`${i.content} || ""`),r.includes("camel")&&(4===i.type?i.content=i.isStatic?z(i.content):`${n.helperString(il)}(${i.content})`:(i.children.unshift(`${n.helperString(il)}(`),i.children.push(")"))),n.inSSR||(r.includes("prop")&&wa(i,"."),r.includes("attr")&&wa(i,"^")),!o||4===o.type&&!o.content.trim()?{props:[xl(i,Cl("",!0,s))]}:{props:[xl(i,o)]}},wa=(e,t)=>{4===e.type?e.content=e.isStatic?t+e.content:`\`${t}\${${e.content}}\``:(e.children.unshift(`'${t}' + (`),e.children.push(")"));},Ta=(e,t)=>{if(0===e.type||1===e.type||11===e.type||10===e.type)return ()=>{const n=e.children;let o,r=!1;for(let e=0;e<n.length;e++){const t=n[e];if(Hl(t)){r=!0;for(let r=e+1;r<n.length;r++){const s=n[r];if(!Hl(s)){o=void 0;break}o||(o=n[e]=kl([t],t.loc)),o.children.push(" + ",s),n.splice(r,1),r--;}}}if(r&&(1!==n.length||0!==e.type&&(1!==e.type||0!==e.tagType||e.props.find((e=>7===e.type&&!t.directiveTransforms[e.name])))))for(let e=0;e<n.length;e++){const o=n[e];if(Hl(o)||8===o.type){const r=[];2===o.type&&" "===o.content||r.push(o),t.ssr||0!==Ac(o,t)||r.push("1"),n[e]={type:12,content:o,loc:o.loc,codegenNode:wl(t.helper(Hi),r)};}}}},Na=new WeakSet,Ea=(e,t)=>{if(1===e.type&&jl(e,"once",!0)){if(Na.has(e)||t.inVOnce)return;return Na.add(e),t.inVOnce=!0,t.helper(al),()=>{t.inVOnce=!1;const e=t.currentNode;e.codegenNode&&(e.codegenNode=t.cache(e.codegenNode,!0));}}},Oa=(e,t,n)=>{const{exp:o,arg:r}=e;if(!o)return Aa();const s=o.loc.source,i=4===o.type?o.content:s,l=n.bindingMetadata[s];if("props"===l||"props-aliased"===l)return Aa();if(!i.trim()||!Vl(i))return Aa();const c=r||Cl("modelValue",!0),a=r?El(r)?`onUpdate:${z(r.content)}`:kl(['"onUpdate:" + ',r]):"onUpdate:modelValue";let u;u=kl([`${n.isTS?"($event: any)":"$event"} => ((`,o,") = $event)"]);const p=[xl(c,e.exp),xl(a,u)];if(e.modifiers.length&&1===t.tagType){const t=e.modifiers.map((e=>(Pl(e)?e:JSON.stringify(e))+": true")).join(", "),n=r?El(r)?`${r.content}Modifiers`:kl([r,' + "Modifiers"']):"modelModifiers";p.push(xl(n,Cl(`{ ${t} }`,!1,e.loc,2)));}return Aa(p)};function Aa(e=[]){return {props:e}}const Fa=new WeakSet,Pa=(e,t)=>{if(1===e.type){const n=jl(e,"memo");if(!n||Fa.has(e))return;return Fa.add(e),()=>{const o=e.codegenNode||t.currentNode.codegenNode;o&&13===o.type&&(1!==e.tagType&&ec(o,t),e.codegenNode=wl(t.helper(ml),[n.exp,Tl(void 0,o),"_cache",String(t.cached++)]));}}};function Ra(e,t={}){const n=t.onError||Oi,o="module"===t.mode;!0===t.prefixIdentifiers?n(Fi(47)):o&&n(Fi(48));t.cacheHandlers&&n(Fi(49)),t.scopeId&&!o&&n(Fi(50));const r=R(e)?rc(e,t):e,[s,i]=[[Ea,Yc,Pa,ta,Sa,ga,aa,Ta],{on:Ca,bind:ka,model:Oa}];return Ic(r,k({},t,{prefixIdentifiers:false,nodeTransforms:[...s,...t.nodeTransforms||[]],directiveTransforms:k({},i,t.directiveTransforms||{})})),Hc(r,k({},t,{prefixIdentifiers:false}))}const $a=Symbol(""),Ma=Symbol(""),Va=Symbol(""),Ia=Symbol(""),Ba=Symbol(""),La=Symbol(""),ja=Symbol(""),Ua=Symbol(""),Da=Symbol(""),Ha=Symbol("");var Wa;let za;Wa={[$a]:"vModelRadio",[Ma]:"vModelCheckbox",[Va]:"vModelText",[Ia]:"vModelSelect",[Ba]:"vModelDynamic",[La]:"withModifiers",[ja]:"withKeys",[Ua]:"vShow",[Da]:"Transition",[Ha]:"TransitionGroup"},Object.getOwnPropertySymbols(Wa).forEach((e=>{vl[e]=Wa[e];}));const Ka=t("style,iframe,script,noscript",!0),Ga={isVoidTag:p,isNativeTag:e=>a(e)||u(e),isPreTag:e=>"pre"===e,decodeEntities:function(e,t=!1){return za||(za=document.createElement("div")),t?(za.innerHTML=`<div foo="${e.replace(/"/g,"&quot;")}">`,za.children[0].getAttribute("foo")):(za.innerHTML=e,za.textContent)},isBuiltInComponent:e=>Ol(e,"Transition")?Da:Ol(e,"TransitionGroup")?Ha:void 0,getNamespace(e,t){let n=t?t.ns:0;if(t&&2===n)if("annotation-xml"===t.tag){if("svg"===e)return 1;t.props.some((e=>6===e.type&&"encoding"===e.name&&null!=e.value&&("text/html"===e.value.content||"application/xhtml+xml"===e.value.content)))&&(n=0);}else /^m(?:[ions]|text)$/.test(t.tag)&&"mglyph"!==e&&"malignmark"!==e&&(n=0);else t&&1===n&&("foreignObject"!==t.tag&&"desc"!==t.tag&&"title"!==t.tag||(n=0));if(0===n){if("svg"===e)return 1;if("math"===e)return 2}return n},getTextMode({tag:e,ns:t}){if(0===t){if("textarea"===e||"title"===e)return 1;if(Ka(e))return 2}return 0}},qa=(e,t)=>{const n=l(e);return Cl(JSON.stringify(n),!1,t,3)};const Ja=t("passive,once,capture"),Za=t("stop,prevent,self,ctrl,shift,alt,meta,exact,middle"),Ya=t("left,right"),Qa=t("onkeyup,onkeydown,onkeypress",!0),Xa=(e,t)=>El(e)&&"onclick"===e.content.toLowerCase()?Cl(t,!0):4!==e.type?kl(["(",e,`) === "onClick" ? "${t}" : (`,e,")"]):e,eu=(e,t)=>{1!==e.type||0!==e.tagType||"script"!==e.tag&&"style"!==e.tag||t.removeNode();},tu=[e=>{1===e.type&&e.props.forEach(((t,n)=>{6===t.type&&"style"===t.name&&t.value&&(e.props[n]={type:7,name:"bind",arg:Cl("style",!0,t.loc),exp:qa(t.value.content,t.loc),modifiers:[],loc:t.loc});}));}],nu={cloak:()=>({props:[]}),html:(e,t,n)=>{const{exp:o,loc:r}=e;return t.children.length&&(t.children.length=0),{props:[xl(Cl("innerHTML",!0,r),o||Cl("",!0))]}},text:(e,t,n)=>{const{exp:o,loc:r}=e;return t.children.length&&(t.children.length=0),{props:[xl(Cl("textContent",!0),o?Ac(o,n)>0?o:wl(n.helperString(Xi),[o],r):Cl("",!0))]}},model:(e,t,n)=>{const o=Oa(e,t,n);if(!o.props.length||1===t.tagType)return o;const{tag:r}=t,s=n.isCustomElement(r);if("input"===r||"textarea"===r||"select"===r||s){let e=Va,i=!1;if("input"===r||s){const n=Ul(t,"type");if(n){if(7===n.type)e=Ba;else if(n.value)switch(n.value.content){case"radio":e=$a;break;case"checkbox":e=Ma;break;case"file":i=!0;}}else (function(e){return e.props.some((e=>!(7!==e.type||"bind"!==e.name||e.arg&&4===e.arg.type&&e.arg.isStatic)))})(t)&&(e=Ba);}else "select"===r&&(e=Ia);i||(o.needRuntime=n.helper(e));}return o.props=o.props.filter((e=>!(4===e.key.type&&"modelValue"===e.key.content))),o},on:(e,t,n)=>Ca(e,t,n,(t=>{const{modifiers:o}=e;if(!o.length)return t;let{key:r,value:s}=t.props[0];const{keyModifiers:i,nonKeyModifiers:l,eventOptionModifiers:c}=((e,t,n,o)=>{const r=[],s=[],i=[];for(let l=0;l<t.length;l++){const n=t[l];Ja(n)?i.push(n):Ya(n)?El(e)?Qa(e.content)?r.push(n):s.push(n):(r.push(n),s.push(n)):Za(n)?s.push(n):r.push(n);}return {keyModifiers:r,nonKeyModifiers:s,eventOptionModifiers:i}})(r,o);if(l.includes("right")&&(r=Xa(r,"onContextmenu")),l.includes("middle")&&(r=Xa(r,"onMouseup")),l.length&&(s=wl(n.helper(La),[s,JSON.stringify(l)])),!i.length||El(r)&&!Qa(r.content)||(s=wl(n.helper(ja),[s,JSON.stringify(i)])),c.length){const e=c.map(q).join("");r=El(r)?Cl(`${r.content}${e}`,!0):kl(["(",r,`) + "${e}"`]);}return {props:[xl(r,s)]}})),show:(e,t,n)=>({props:[],needRuntime:n.helper(Ua)})};const ou=Object.create(null);function ru(e,t){if(!R(e)){if(!e.nodeType)return _;e=e.innerHTML;}const n=e,o=ou[n];if(o)return o;if("#"===e[0]){const t=document.querySelector(e);e=t?t.innerHTML:"";}const r=k({hoistStatic:!0,onError:void 0,onWarn:_},t);r.isCustomElement||"undefined"==typeof customElements||(r.isCustomElement=e=>!!customElements.get(e));const{code:s}=function(e,t={}){return Ra(e,k({},Ga,t,{nodeTransforms:[eu,...tu,...t.nodeTransforms||[]],directiveTransforms:k({},nu,t.directiveTransforms||{}),transformHoist:null}))}(e,r),i=new Function(s)();return i._rc=!0,ou[n]=i}return ts(ru),e.BaseTransition=Ln,e.Comment=_r,e.EffectScope=oe,e.Fragment=vr,e.KeepAlive=Zn,e.ReactiveEffect=me,e.Static=br,e.Suspense=xn,e.Teleport=mr,e.Text=yr,e.Transition=Rs,e.TransitionGroup=Qs,e.VueElement=Es,e.assertNumber=function(e,t){},e.callWithAsyncErrorHandling=Ut,e.callWithErrorHandling=jt,e.camelize=z,e.capitalize=q,e.cloneVNode=Ir,e.compatUtils=null,e.compile=ru,e.computed=is,e.createApp=(...e)=>{const t=Ci().createApp(...e),{mount:n}=t;return t.mount=e=>{const o=Ni(e);if(!o)return;const r=t._component;P(r)||r.render||r.template||(r.template=o.innerHTML),o.innerHTML="";const s=n(o,!1,o instanceof SVGElement);return o instanceof Element&&(o.removeAttribute("v-cloak"),o.setAttribute("data-v-app","")),s},t},e.createBlock=Er,e.createCommentVNode=function(e="",t=!1){return t?(Cr(),Er(_r,null,e)):Mr(_r,null,e)},e.createElementBlock=function(e,t,n,o,r,s){return Nr($r(e,t,n,o,r,s,!0))},e.createElementVNode=$r,e.createHydrationRenderer=lr,e.createPropsRestProxy=function(e,t){const n={};for(const o in e)t.includes(o)||Object.defineProperty(n,o,{enumerable:!0,get:()=>e[o]});return n},e.createRenderer=ir,e.createSSRApp=(...e)=>{const t=ki().createApp(...e),{mount:n}=t;return t.mount=e=>{const t=Ni(e);if(t)return n(t,!0,t instanceof SVGElement)},t},e.createSlots=function(e,t){for(let n=0;n<t.length;n++){const o=t[n];if(E(o))for(let t=0;t<o.length;t++)e[o[t].name]=o[t].fn;else o&&(e[o.name]=o.key?(...e)=>{const t=o.fn(...e);return t&&(t.key=o.key),t}:o.fn);}return e},e.createStaticVNode=function(e,t){const n=Mr(br,null,e);return n.staticCount=t,n},e.createTextVNode=Br,e.createVNode=Mr,e.customRef=function(e){return new Mt(e)},e.defineAsyncComponent=function(e){P(e)&&(e={loader:e});const{loader:t,loadingComponent:n,errorComponent:o,delay:r=200,timeout:s,suspensible:i=!0,onError:l}=e;let c,a=null,u=0;const p=()=>{let e;return a||(e=a=t().catch((e=>{if(e=e instanceof Error?e:new Error(String(e)),l)return new Promise(((t,n)=>{l(e,(()=>t((u++,a=null,p()))),(()=>n(e)),u+1);}));throw e})).then((t=>e!==a&&a?a:(t&&(t.__esModule||"Module"===t[Symbol.toStringTag])&&(t=t.default),c=t,t))))};return Kn({name:"AsyncComponentWrapper",__asyncLoader:p,get __asyncResolved(){return c},setup(){const e=Kr;if(c)return ()=>qn(c,e);const t=t=>{a=null,Dt(t,e,13,!o);};if(i&&e.suspense)return p().then((t=>()=>qn(t,e))).catch((e=>(t(e),()=>o?Mr(o,{error:e}):null)));const l=Ot(!1),u=Ot(),f=Ot(!!r);return r&&setTimeout((()=>{f.value=!1;}),r),null!=s&&setTimeout((()=>{if(!l.value&&!u.value){const e=new Error(`Async component timed out after ${s}ms.`);t(e),u.value=e;}}),s),p().then((()=>{l.value=!0,e.parent&&Jn(e.parent.vnode)&&Xt(e.parent.update);})).catch((e=>{t(e),u.value=e;})),()=>l.value&&c?qn(c,e):u.value&&o?Mr(o,{error:u.value}):n&&!f.value?Mr(n):void 0}})},e.defineComponent=Kn,e.defineCustomElement=Ts,e.defineEmits=function(){return null},e.defineExpose=function(e){},e.defineProps=function(){return null},e.defineSSRCustomElement=e=>Ts(e,Ti),e.effect=function(e,t){e.effect&&(e=e.effect.fn);const n=new me(e);t&&(k(n,t),t.scope&&re(n,t.scope)),t&&t.lazy||n.run();const o=n.run.bind(n);return o.effect=n,o},e.effectScope=function(e){return new oe(e)},e.getCurrentInstance=Gr,e.getCurrentScope=se,e.getTransitionRawChildren=zn,e.guardReactiveProps=Vr,e.h=cs,e.handleError=Dt,e.hydrate=Ti,e.initCustomFormatter=function(){},e.initDirectivesForSSR=Ei,e.inject=On,e.isMemoSame=us,e.isProxy=St,e.isReactive=yt,e.isReadonly=_t,e.isRef=Et,e.isRuntimeOnly=()=>!Yr,e.isShallow=bt,e.isVNode=Or,e.markRaw=Ct,e.mergeDefaults=function(e,t){const n=E(e)?e.reduce(((e,t)=>(e[t]={},e)),{}):e;for(const o in t){const e=n[o];e?E(e)||P(e)?n[o]={type:e,default:t[o]}:e.default=t[o]:null===e&&(n[o]={default:t[o]});}return n},e.mergeProps=Dr,e.nextTick=Qt,e.normalizeClass=c,e.normalizeProps=function(e){if(!e)return null;let{class:t,style:n}=e;return t&&!R(t)&&(e.class=c(t)),n&&(e.style=o(n)),e},e.normalizeStyle=o,e.onActivated=Qn,e.onBeforeMount=io,e.onBeforeUnmount=uo,e.onBeforeUpdate=co,e.onDeactivated=Xn,e.onErrorCaptured=go,e.onMounted=lo,e.onRenderTracked=mo,e.onRenderTriggered=ho,e.onScopeDispose=function(e){ne&&ne.cleanups.push(e);},e.onServerPrefetch=fo,e.onUnmounted=po,e.onUpdated=ao,e.openBlock=Cr,e.popScopeId=function(){dn=null;},e.provide=En,e.proxyRefs=$t,e.pushScopeId=function(e){dn=e;},e.queuePostFlushCb=tn,e.reactive=ht,e.readonly=gt,e.ref=Ot,e.registerRuntimeCompiler=ts,e.render=wi,e.renderList=function(e,t,n,o){let r;const s=n&&n[o];if(E(e)||R(e)){r=new Array(e.length);for(let n=0,o=e.length;n<o;n++)r[n]=t(e[n],n,void 0,s&&s[n]);}else if("number"==typeof e){r=new Array(e);for(let n=0;n<e;n++)r[n]=t(n+1,n,void 0,s&&s[n]);}else if(M(e))if(e[Symbol.iterator])r=Array.from(e,((e,n)=>t(e,n,void 0,s&&s[n])));else {const n=Object.keys(e);r=new Array(n.length);for(let o=0,i=n.length;o<i;o++){const i=n[o];r[o]=t(e[i],i,o,s&&s[o]);}}else r=[];return n&&(n[o]=r),r},e.renderSlot=function(e,t,n={},o,r){if(fn.isCE||fn.parent&&Gn(fn.parent)&&fn.parent.isCE)return "default"!==t&&(n.name=t),Mr("slot",n,o&&o());let s=e[t];s&&s._c&&(s._d=!1),Cr();const i=s&&xo(s(n)),l=Er(vr,{key:n.key||i&&i.key||`_${t}`},i||(o?o():[]),i&&1===e._?64:-2);return !r&&l.scopeId&&(l.slotScopeIds=[l.scopeId+"-s"]),s&&s._c&&(s._d=!0),l},e.resolveComponent=function(e,t){return bo(yo,e,!0,t)||e},e.resolveDirective=function(e){return bo("directives",e)},e.resolveDynamicComponent=function(e){return R(e)?bo(yo,e,!1)||e:e||_o},e.resolveFilter=null,e.resolveTransitionHooks=Un,e.setBlockTracking=Tr,e.setDevtoolsHook=function t(n,o){var r,s;if(e.devtools=n,e.devtools)e.devtools.enabled=!0,cn.forEach((({event:t,args:n})=>e.devtools.emit(t,...n))),cn=[];else if("undefined"!=typeof window&&window.HTMLElement&&!(null===(s=null===(r=window.navigator)||void 0===r?void 0:r.userAgent)||void 0===s?void 0:s.includes("jsdom"))){(o.__VUE_DEVTOOLS_HOOK_REPLAY__=o.__VUE_DEVTOOLS_HOOK_REPLAY__||[]).push((e=>{t(e,o);})),setTimeout((()=>{e.devtools||(o.__VUE_DEVTOOLS_HOOK_REPLAY__=null,cn=[]);}),3e3);}else cn=[];},e.setTransitionHooks=Wn,e.shallowReactive=mt,e.shallowReadonly=function(e){return vt(e,!0,je,ct,ft)},e.shallowRef=function(e){return At(e,!0)},e.ssrContextKey=as,e.ssrUtils=null,e.stop=function(e){e.effect.stop();},e.toDisplayString=e=>R(e)?e:null==e?"":E(e)||M(e)&&(e.toString===I||!P(e.toString))?JSON.stringify(e,g,2):String(e),e.toHandlerKey=J,e.toHandlers=function(e,t){const n={};for(const o in e)n[t&&/[A-Z]/.test(o)?`on:${o}`:J(o)]=e[o];return n},e.toRaw=xt,e.toRef=It,e.toRefs=function(e){const t=E(e)?new Array(e.length):{};for(const n in e)t[n]=It(e,n);return t},e.transformVNodeArgs=function(e){},e.triggerRef=function(e){Nt(e);},e.unref=Pt,e.useAttrs=function(){return ls().attrs},e.useCssModule=function(e="$style"){return v},e.useCssVars=function(e){const t=Gr();if(!t)return;const n=t.ut=(n=e(t.proxy))=>{Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach((e=>As(e,n)));},o=()=>{const o=e(t.proxy);Os(t.subTree,o),n(o);};An(o),lo((()=>{const e=new MutationObserver(o);e.observe(t.subTree.el.parentNode,{childList:!0}),po((()=>e.disconnect()));}));},e.useSSRContext=()=>{},e.useSlots=function(){return ls().slots},e.useTransitionState=In,e.vModelCheckbox=ii,e.vModelDynamic=di,e.vModelRadio=ci,e.vModelSelect=ai,e.vModelText=si,e.vShow=yi,e.version=ps,e.warn=function(e,...t){},e.watch=Pn,e.watchEffect=function(e,t){return Rn(e,null,t)},e.watchPostEffect=An,e.watchSyncEffect=function(e,t){return Rn(e,null,{flush:"sync"})},e.withAsyncContext=function(e){const t=Gr();let n=e();return Jr(),V(n)&&(n=n.catch((e=>{throw qr(t),e}))),[n,()=>qr(t)]},e.withCtx=mn,e.withDefaults=function(e,t){return null},e.withDirectives=function(e,t){const n=fn;if(null===n)return e;const o=rs(n)||n.proxy,r=e.dirs||(e.dirs=[]);for(let s=0;s<t.length;s++){let[e,n,i,l=v]=t[s];e&&(P(e)&&(e={mounted:e,updated:e}),e.deep&&Vn(n),r.push({dir:e,instance:o,value:n,oldValue:void 0,arg:i,modifiers:l}));}return e},e.withKeys=(e,t)=>n=>{if(!("key"in n))return;const o=G(n.key);return t.some((e=>e===o||vi[e]===o))?e(n):void 0},e.withMemo=function(e,t,n,o){const r=n[o];if(r&&us(r,e))return r;const s=t();return s.memo=e.slice(),n[o]=s},e.withModifiers=(e,t)=>(n,...o)=>{for(let e=0;e<t.length;e++){const o=gi[t[e]];if(o&&o(n,t))return}return e(n,...o)},e.withScopeId=e=>mn,Object.defineProperty(e,"__esModule",{value:!0}),e}({});

  /*!
    * vue-router v4.1.6
    * (c) 2022 Eduardo San Martin Morote
    * @license MIT
    */
  window.VueRouter=function(e,t){const n="undefined"!=typeof window;function r(e){return e.__esModule||"Module"===e[Symbol.toStringTag]}const o=Object.assign;function a(e,t){const n={};for(const r in t){const o=t[r];n[r]=s(o)?o.map(e):e(o);}return n}const c=()=>{},s=Array.isArray,i=/\/$/;function l(e,t,n="/"){let r,o={},a="",c="";const s=t.indexOf("#");let i=t.indexOf("?");return s<i&&s>=0&&(i=-1),i>-1&&(r=t.slice(0,i),a=t.slice(i+1,s>-1?s:t.length),o=e(a)),s>-1&&(r=r||t.slice(0,s),c=t.slice(s,t.length)),r=function(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/");let o,a,c=n.length-1;for(o=0;o<r.length;o++)if(a=r[o],"."!==a){if(".."!==a)break;c>1&&c--;}return n.slice(0,c).join("/")+"/"+r.slice(o-(o===r.length?1:0)).join("/")}(null!=r?r:t,n),{fullPath:r+(a&&"?")+a+c,path:r,query:o,hash:c}}function u(e,t){return t&&e.toLowerCase().startsWith(t.toLowerCase())?e.slice(t.length)||"/":e}function f(e,t){return (e.aliasOf||e)===(t.aliasOf||t)}function p(e,t){if(Object.keys(e).length!==Object.keys(t).length)return !1;for(const n in e)if(!h(e[n],t[n]))return !1;return !0}function h(e,t){return s(e)?d(e,t):s(t)?d(t,e):e===t}function d(e,t){return s(t)?e.length===t.length&&e.every(((e,n)=>e===t[n])):1===e.length&&e[0]===t}var m,g;!function(e){e.pop="pop",e.push="push";}(m||(m={})),function(e){e.back="back",e.forward="forward",e.unknown="";}(g||(g={}));function v(e){if(!e)if(n){const t=document.querySelector("base");e=(e=t&&t.getAttribute("href")||"/").replace(/^\w+:\/\/[^\/]+/,"");}else e="/";return "/"!==e[0]&&"#"!==e[0]&&(e="/"+e),e.replace(i,"")}const y=/^[^#]+#/;function b(e,t){return e.replace(y,"#")+t}const w=()=>({left:window.pageXOffset,top:window.pageYOffset});function E(e){let t;if("el"in e){const n=e.el,r="string"==typeof n&&n.startsWith("#"),o="string"==typeof n?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!o)return;t=function(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return {behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}(o,e);}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(null!=t.left?t.left:window.pageXOffset,null!=t.top?t.top:window.pageYOffset);}function R(e,t){return (history.state?history.state.position-t:-1)+e}const O=new Map;let k=()=>location.protocol+"//"+location.host;function j(e,t){const{pathname:n,search:r,hash:o}=t,a=e.indexOf("#");if(a>-1){let t=o.includes(e.slice(a))?e.slice(a).length:1,n=o.slice(t);return "/"!==n[0]&&(n="/"+n),u(n,"")}return u(n,e)+r+o}function P(e,t,n,r=!1,o=!1){return {back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:o?w():null}}function C(e){const t=function(e){const{history:t,location:n}=window,r={value:j(e,n)},a={value:t.state};function c(r,o,c){const s=e.indexOf("#"),i=s>-1?(n.host&&document.querySelector("base")?e:e.slice(s))+r:k()+e+r;try{t[c?"replaceState":"pushState"](o,"",i),a.value=o;}catch(e){console.error(e),n[c?"replace":"assign"](i);}}return a.value||c(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0),{location:r,state:a,push:function(e,n){const s=o({},a.value,t.state,{forward:e,scroll:w()});c(s.current,s,!0),c(e,o({},P(r.value,e,null),{position:s.position+1},n),!1),r.value=e;},replace:function(e,n){c(e,o({},t.state,P(a.value.back,e,a.value.forward,!0),n,{position:a.value.position}),!0),r.value=e;}}}(e=v(e)),n=function(e,t,n,r){let a=[],c=[],s=null;const i=({state:o})=>{const c=j(e,location),i=n.value,l=t.value;let u=0;if(o){if(n.value=c,t.value=o,s&&s===i)return void(s=null);u=l?o.position-l.position:0;}else r(c);a.forEach((e=>{e(n.value,i,{delta:u,type:m.pop,direction:u?u>0?g.forward:g.back:g.unknown});}));};function l(){const{history:e}=window;e.state&&e.replaceState(o({},e.state,{scroll:w()}),"");}return window.addEventListener("popstate",i),window.addEventListener("beforeunload",l),{pauseListeners:function(){s=n.value;},listen:function(e){a.push(e);const t=()=>{const t=a.indexOf(e);t>-1&&a.splice(t,1);};return c.push(t),t},destroy:function(){for(const e of c)e();c=[],window.removeEventListener("popstate",i),window.removeEventListener("beforeunload",l);}}}(e,t.state,t.location,t.replace);const r=o({location:"",base:e,go:function(e,t=!0){t||n.pauseListeners(),history.go(e);},createHref:b.bind(null,e)},t,n);return Object.defineProperty(r,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(r,"state",{enumerable:!0,get:()=>t.state.value}),r}function x(e){return "string"==typeof e||"symbol"==typeof e}const $={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},S=Symbol("");var A;function L(e,t){return o(new Error,{type:e,[S]:!0},t)}function M(e,t){return e instanceof Error&&S in e&&(null==t||!!(e.type&t))}e.NavigationFailureType=void 0,(A=e.NavigationFailureType||(e.NavigationFailureType={}))[A.aborted=4]="aborted",A[A.cancelled=8]="cancelled",A[A.duplicated=16]="duplicated";const q="[^/]+?",B={sensitive:!1,strict:!1,start:!0,end:!0},T=/[.+*?^${}()[\]/\\]/g;function _(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++;}return e.length<t.length?1===e.length&&80===e[0]?-1:1:e.length>t.length?1===t.length&&80===t[0]?1:-1:0}function G(e,t){let n=0;const r=e.score,o=t.score;for(;n<r.length&&n<o.length;){const e=_(r[n],o[n]);if(e)return e;n++;}if(1===Math.abs(o.length-r.length)){if(F(r))return 1;if(F(o))return -1}return o.length-r.length}function F(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const D={type:0,value:""},I=/[a-zA-Z0-9_]/;function K(e,t,n){const r=function(e,t){const n=o({},B,t),r=[];let a=n.start?"^":"";const c=[];for(const t of e){const e=t.length?[]:[90];n.strict&&!t.length&&(a+="/");for(let r=0;r<t.length;r++){const o=t[r];let s=40+(n.sensitive?.25:0);if(0===o.type)r||(a+="/"),a+=o.value.replace(T,"\\$&"),s+=40;else if(1===o.type){const{value:e,repeatable:n,optional:i,regexp:l}=o;c.push({name:e,repeatable:n,optional:i});const u=l||q;if(u!==q){s+=10;try{new RegExp(`(${u})`);}catch(t){throw new Error(`Invalid custom RegExp for param "${e}" (${u}): `+t.message)}}let f=n?`((?:${u})(?:/(?:${u}))*)`:`(${u})`;r||(f=i&&t.length<2?`(?:/${f})`:"/"+f),i&&(f+="?"),a+=f,s+=20,i&&(s+=-8),n&&(s+=-20),".*"===u&&(s+=-50);}e.push(s);}r.push(e);}if(n.strict&&n.end){const e=r.length-1;r[e][r[e].length-1]+=.7000000000000001;}n.strict||(a+="/?"),n.end?a+="$":n.strict&&(a+="(?:/|$)");const i=new RegExp(a,n.sensitive?"":"i");return {re:i,score:r,keys:c,parse:function(e){const t=e.match(i),n={};if(!t)return null;for(let e=1;e<t.length;e++){const r=t[e]||"",o=c[e-1];n[o.name]=r&&o.repeatable?r.split("/"):r;}return n},stringify:function(t){let n="",r=!1;for(const o of e){r&&n.endsWith("/")||(n+="/"),r=!1;for(const e of o)if(0===e.type)n+=e.value;else if(1===e.type){const{value:a,repeatable:c,optional:i}=e,l=a in t?t[a]:"";if(s(l)&&!c)throw new Error(`Provided param "${a}" is an array but it is not repeatable (* or + modifiers)`);const u=s(l)?l.join("/"):l;if(!u){if(!i)throw new Error(`Missing required param "${a}"`);o.length<2&&(n.endsWith("/")?n=n.slice(0,-1):r=!0);}n+=u;}}return n||"/"}}}(function(e){if(!e)return [[]];if("/"===e)return [[D]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(e){throw new Error(`ERR (${n})/"${l}": ${e}`)}let n=0,r=n;const o=[];let a;function c(){a&&o.push(a),a=[];}let s,i=0,l="",u="";function f(){l&&(0===n?a.push({type:0,value:l}):1===n||2===n||3===n?(a.length>1&&("*"===s||"+"===s)&&t(`A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`),a.push({type:1,value:l,regexp:u,repeatable:"*"===s||"+"===s,optional:"*"===s||"?"===s})):t("Invalid state to consume buffer"),l="");}function p(){l+=s;}for(;i<e.length;)if(s=e[i++],"\\"!==s||2===n)switch(n){case 0:"/"===s?(l&&f(),c()):":"===s?(f(),n=1):p();break;case 4:p(),n=r;break;case 1:"("===s?n=2:I.test(s)?p():(f(),n=0,"*"!==s&&"?"!==s&&"+"!==s&&i--);break;case 2:")"===s?"\\"==u[u.length-1]?u=u.slice(0,-1)+s:n=3:u+=s;break;case 3:f(),n=0,"*"!==s&&"?"!==s&&"+"!==s&&i--,u="";break;default:t("Unknown state");}else r=n,n=4;return 2===n&&t(`Unfinished custom RegExp for param "${l}"`),f(),c(),o}(e.path),n),a=o(r,{record:e,parent:t,children:[],alias:[]});return t&&!a.record.aliasOf==!t.record.aliasOf&&t.children.push(a),a}function U(e,t){const n=[],r=new Map;function a(e,n,r){const l=!r,u=function(e){return {path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:H(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}}}(e);u.aliasOf=r&&r.record;const f=z(t,e),p=[u];if("alias"in e){const t="string"==typeof e.alias?[e.alias]:e.alias;for(const e of t)p.push(o({},u,{components:r?r.record.components:u.components,path:e,aliasOf:r?r.record:u}));}let h,d;for(const t of p){const{path:o}=t;if(n&&"/"!==o[0]){const e=n.record.path,r="/"===e[e.length-1]?"":"/";t.path=n.record.path+(o&&r+o);}if(h=K(t,n,f),r?r.alias.push(h):(d=d||h,d!==h&&d.alias.push(h),l&&e.name&&!W(h)&&s(e.name)),u.children){const e=u.children;for(let t=0;t<e.length;t++)a(e[t],h,r&&r.children[t]);}r=r||h,(h.record.components&&Object.keys(h.record.components).length||h.record.name||h.record.redirect)&&i(h);}return d?()=>{s(d);}:c}function s(e){if(x(e)){const t=r.get(e);t&&(r.delete(e),n.splice(n.indexOf(t),1),t.children.forEach(s),t.alias.forEach(s));}else {const t=n.indexOf(e);t>-1&&(n.splice(t,1),e.record.name&&r.delete(e.record.name),e.children.forEach(s),e.alias.forEach(s));}}function i(e){let t=0;for(;t<n.length&&G(e,n[t])>=0&&(e.record.path!==n[t].record.path||!Q(e,n[t]));)t++;n.splice(t,0,e),e.record.name&&!W(e)&&r.set(e.record.name,e);}return t=z({strict:!1,end:!0,sensitive:!1},t),e.forEach((e=>a(e))),{addRoute:a,resolve:function(e,t){let a,c,s,i={};if("name"in e&&e.name){if(a=r.get(e.name),!a)throw L(1,{location:e});s=a.record.name,i=o(V(t.params,a.keys.filter((e=>!e.optional)).map((e=>e.name))),e.params&&V(e.params,a.keys.map((e=>e.name)))),c=a.stringify(i);}else if("path"in e)c=e.path,a=n.find((e=>e.re.test(c))),a&&(i=a.parse(c),s=a.record.name);else {if(a=t.name?r.get(t.name):n.find((e=>e.re.test(t.path))),!a)throw L(1,{location:e,currentLocation:t});s=a.record.name,i=o({},t.params,e.params),c=a.stringify(i);}const l=[];let u=a;for(;u;)l.unshift(u.record),u=u.parent;return {name:s,path:c,params:i,matched:l,meta:N(l)}},removeRoute:s,getRoutes:function(){return n},getRecordMatcher:function(e){return r.get(e)}}}function V(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function H(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]="boolean"==typeof n?n:n[r];return t}function W(e){for(;e;){if(e.record.aliasOf)return !0;e=e.parent;}return !1}function N(e){return e.reduce(((e,t)=>o(e,t.meta)),{})}function z(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}function Q(e,t){return t.children.some((t=>t===e||Q(e,t)))}const X=/#/g,Y=/&/g,Z=/\//g,J=/=/g,ee=/\?/g,te=/\+/g,ne=/%5B/g,re=/%5D/g,oe=/%5E/g,ae=/%60/g,ce=/%7B/g,se=/%7C/g,ie=/%7D/g,le=/%20/g;function ue(e){return encodeURI(""+e).replace(se,"|").replace(ne,"[").replace(re,"]")}function fe(e){return ue(e).replace(te,"%2B").replace(le,"+").replace(X,"%23").replace(Y,"%26").replace(ae,"`").replace(ce,"{").replace(ie,"}").replace(oe,"^")}function pe(e){return null==e?"":function(e){return ue(e).replace(X,"%23").replace(ee,"%3F")}(e).replace(Z,"%2F")}function he(e){try{return decodeURIComponent(""+e)}catch(e){}return ""+e}function de(e){const t={};if(""===e||"?"===e)return t;const n=("?"===e[0]?e.slice(1):e).split("&");for(let e=0;e<n.length;++e){const r=n[e].replace(te," "),o=r.indexOf("="),a=he(o<0?r:r.slice(0,o)),c=o<0?null:he(r.slice(o+1));if(a in t){let e=t[a];s(e)||(e=t[a]=[e]),e.push(c);}else t[a]=c;}return t}function me(e){let t="";for(let n in e){const r=e[n];if(n=fe(n).replace(J,"%3D"),null==r){void 0!==r&&(t+=(t.length?"&":"")+n);continue}(s(r)?r.map((e=>e&&fe(e))):[r&&fe(r)]).forEach((e=>{void 0!==e&&(t+=(t.length?"&":"")+n,null!=e&&(t+="="+e));}));}return t}function ge(e){const t={};for(const n in e){const r=e[n];void 0!==r&&(t[n]=s(r)?r.map((e=>null==e?null:""+e)):null==r?r:""+r);}return t}const ve=Symbol(""),ye=Symbol(""),be=Symbol(""),we=Symbol(""),Ee=Symbol("");function Re(){let e=[];return {add:function(t){return e.push(t),()=>{const n=e.indexOf(t);n>-1&&e.splice(n,1);}},list:()=>e,reset:function(){e=[];}}}function Oe(e,n,r){const o=()=>{e[n].delete(r);};t.onUnmounted(o),t.onDeactivated(o),t.onActivated((()=>{e[n].add(r);})),e[n].add(r);}function ke(e,t,n,r,o){const a=r&&(r.enterCallbacks[o]=r.enterCallbacks[o]||[]);return ()=>new Promise(((c,s)=>{const i=e=>{var i;!1===e?s(L(4,{from:n,to:t})):e instanceof Error?s(e):"string"==typeof(i=e)||i&&"object"==typeof i?s(L(2,{from:t,to:e})):(a&&r.enterCallbacks[o]===a&&"function"==typeof e&&a.push(e),c());},l=e.call(r&&r.instances[o],t,n,i);let u=Promise.resolve(l);e.length<3&&(u=u.then(i)),u.catch((e=>s(e)));}))}function je(e,t,n,o){const a=[];for(const s of e)for(const e in s.components){let i=s.components[e];if("beforeRouteEnter"===t||s.instances[e])if("object"==typeof(c=i)||"displayName"in c||"props"in c||"__vccOpts"in c){const r=(i.__vccOpts||i)[t];r&&a.push(ke(r,n,o,s,e));}else {let c=i();a.push((()=>c.then((a=>{if(!a)return Promise.reject(new Error(`Couldn't resolve component "${e}" at "${s.path}"`));const c=r(a)?a.default:a;s.components[e]=c;const i=(c.__vccOpts||c)[t];return i&&ke(i,n,o,s,e)()}))));}}var c;return a}function Pe(e){const n=t.inject(be),r=t.inject(we),o=t.computed((()=>n.resolve(t.unref(e.to)))),a=t.computed((()=>{const{matched:e}=o.value,{length:t}=e,n=e[t-1],a=r.matched;if(!n||!a.length)return -1;const c=a.findIndex(f.bind(null,n));if(c>-1)return c;const s=xe(e[t-2]);return t>1&&xe(n)===s&&a[a.length-1].path!==s?a.findIndex(f.bind(null,e[t-2])):c})),i=t.computed((()=>a.value>-1&&function(e,t){for(const n in t){const r=t[n],o=e[n];if("string"==typeof r){if(r!==o)return !1}else if(!s(o)||o.length!==r.length||r.some(((e,t)=>e!==o[t])))return !1}return !0}(r.params,o.value.params))),l=t.computed((()=>a.value>-1&&a.value===r.matched.length-1&&p(r.params,o.value.params)));return {route:o,href:t.computed((()=>o.value.href)),isActive:i,isExactActive:l,navigate:function(r={}){return function(e){if(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)return;if(e.defaultPrevented)return;if(void 0!==e.button&&0!==e.button)return;if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}e.preventDefault&&e.preventDefault();return !0}(r)?n[t.unref(e.replace)?"replace":"push"](t.unref(e.to)).catch(c):Promise.resolve()}}}const Ce=t.defineComponent({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:Pe,setup(e,{slots:n}){const r=t.reactive(Pe(e)),{options:o}=t.inject(be),a=t.computed((()=>({[$e(e.activeClass,o.linkActiveClass,"router-link-active")]:r.isActive,[$e(e.exactActiveClass,o.linkExactActiveClass,"router-link-exact-active")]:r.isExactActive})));return ()=>{const o=n.default&&n.default(r);return e.custom?o:t.h("a",{"aria-current":r.isExactActive?e.ariaCurrentValue:null,href:r.href,onClick:r.navigate,class:a.value},o)}}});function xe(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const $e=(e,t,n)=>null!=e?e:null!=t?t:n;function Se(e,t){if(!e)return null;const n=e(t);return 1===n.length?n[0]:n}const Ae=t.defineComponent({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:n,slots:r}){const a=t.inject(Ee),c=t.computed((()=>e.route||a.value)),s=t.inject(ye,0),i=t.computed((()=>{let e=t.unref(s);const{matched:n}=c.value;let r;for(;(r=n[e])&&!r.components;)e++;return e})),l=t.computed((()=>c.value.matched[i.value]));t.provide(ye,t.computed((()=>i.value+1))),t.provide(ve,l),t.provide(Ee,c);const u=t.ref();return t.watch((()=>[u.value,l.value,e.name]),(([e,t,n],[r,o,a])=>{t&&(t.instances[n]=e,o&&o!==t&&e&&e===r&&(t.leaveGuards.size||(t.leaveGuards=o.leaveGuards),t.updateGuards.size||(t.updateGuards=o.updateGuards))),!e||!t||o&&f(t,o)&&r||(t.enterCallbacks[n]||[]).forEach((t=>t(e)));}),{flush:"post"}),()=>{const a=c.value,s=e.name,i=l.value,f=i&&i.components[s];if(!f)return Se(r.default,{Component:f,route:a});const p=i.props[s],h=p?!0===p?a.params:"function"==typeof p?p(a):p:null,d=t.h(f,o({},h,n,{onVnodeUnmounted:e=>{e.component.isUnmounted&&(i.instances[s]=null);},ref:u}));return Se(r.default,{Component:d,route:a})||d}}});function Le(e){return e.reduce(((e,t)=>e.then((()=>t()))),Promise.resolve())}return e.RouterLink=Ce,e.RouterView=Ae,e.START_LOCATION=$,e.createMemoryHistory=function(e=""){let t=[],n=[""],r=0;function o(e){r++,r===n.length||n.splice(r),n.push(e);}const a={location:"",state:{},base:e=v(e),createHref:b.bind(null,e),replace(e){n.splice(r--,1),o(e);},push(e,t){o(e);},listen:e=>(t.push(e),()=>{const n=t.indexOf(e);n>-1&&t.splice(n,1);}),destroy(){t=[],n=[""],r=0;},go(e,o=!0){const a=this.location,c=e<0?g.back:g.forward;r=Math.max(0,Math.min(r+e,n.length-1)),o&&function(e,n,{direction:r,delta:o}){const a={direction:r,delta:o,type:m.pop};for(const r of t)r(e,n,a);}(this.location,a,{direction:c,delta:e});}};return Object.defineProperty(a,"location",{enumerable:!0,get:()=>n[r]}),a},e.createRouter=function(e){const r=U(e.routes,e),i=e.parseQuery||de,u=e.stringifyQuery||me,h=e.history,d=Re(),g=Re(),v=Re(),y=t.shallowRef($);let b=$;n&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const k=a.bind(null,(e=>""+e)),j=a.bind(null,pe),P=a.bind(null,he);function C(e,t){if(t=o({},t||y.value),"string"==typeof e){const n=l(i,e,t.path),a=r.resolve({path:n.path},t),c=h.createHref(n.fullPath);return o(n,a,{params:P(a.params),hash:he(n.hash),redirectedFrom:void 0,href:c})}let n;if("path"in e)n=o({},e,{path:l(i,e.path,t.path).path});else {const r=o({},e.params);for(const e in r)null==r[e]&&delete r[e];n=o({},e,{params:j(e.params)}),t.params=j(t.params);}const a=r.resolve(n,t),c=e.hash||"";a.params=k(P(a.params));const s=function(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}(u,o({},e,{hash:(f=c,ue(f).replace(ce,"{").replace(ie,"}").replace(oe,"^")),path:a.path}));var f;const p=h.createHref(s);return o({fullPath:s,hash:c,query:u===me?ge(e.query):e.query||{}},a,{redirectedFrom:void 0,href:p})}function S(e){return "string"==typeof e?l(i,e,y.value.path):o({},e)}function A(e,t){if(b!==e)return L(8,{from:t,to:e})}function q(e){return T(e)}function B(e){const t=e.matched[e.matched.length-1];if(t&&t.redirect){const{redirect:n}=t;let r="function"==typeof n?n(e):n;return "string"==typeof r&&(r=r.includes("?")||r.includes("#")?r=S(r):{path:r},r.params={}),o({query:e.query,hash:e.hash,params:"path"in r?{}:e.params},r)}}function T(e,t){const n=b=C(e),r=y.value,a=e.state,c=e.force,s=!0===e.replace,i=B(n);if(i)return T(o(S(i),{state:"object"==typeof i?o({},a,i.state):a,force:c,replace:s}),t||n);const l=n;let h;return l.redirectedFrom=t,!c&&function(e,t,n){const r=t.matched.length-1,o=n.matched.length-1;return r>-1&&r===o&&f(t.matched[r],n.matched[o])&&p(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}(u,r,n)&&(h=L(16,{to:l,from:r}),Q(r,r,!0,!1)),(h?Promise.resolve(h):G(l,r)).catch((e=>M(e)?M(e,2)?e:z(e):N(e,l,r))).then((e=>{if(e){if(M(e,2))return T(o({replace:s},S(e.to),{state:"object"==typeof e.to?o({},a,e.to.state):a,force:c}),t||l)}else e=D(l,r,!0,s,a);return F(l,r,e),e}))}function _(e,t){const n=A(e,t);return n?Promise.reject(n):Promise.resolve()}function G(e,t){let n;const[r,o,a]=function(e,t){const n=[],r=[],o=[],a=Math.max(t.matched.length,e.matched.length);for(let c=0;c<a;c++){const a=t.matched[c];a&&(e.matched.find((e=>f(e,a)))?r.push(a):n.push(a));const s=e.matched[c];s&&(t.matched.find((e=>f(e,s)))||o.push(s));}return [n,r,o]}(e,t);n=je(r.reverse(),"beforeRouteLeave",e,t);for(const o of r)o.leaveGuards.forEach((r=>{n.push(ke(r,e,t));}));const c=_.bind(null,e,t);return n.push(c),Le(n).then((()=>{n=[];for(const r of d.list())n.push(ke(r,e,t));return n.push(c),Le(n)})).then((()=>{n=je(o,"beforeRouteUpdate",e,t);for(const r of o)r.updateGuards.forEach((r=>{n.push(ke(r,e,t));}));return n.push(c),Le(n)})).then((()=>{n=[];for(const r of e.matched)if(r.beforeEnter&&!t.matched.includes(r))if(s(r.beforeEnter))for(const o of r.beforeEnter)n.push(ke(o,e,t));else n.push(ke(r.beforeEnter,e,t));return n.push(c),Le(n)})).then((()=>(e.matched.forEach((e=>e.enterCallbacks={})),n=je(a,"beforeRouteEnter",e,t),n.push(c),Le(n)))).then((()=>{n=[];for(const r of g.list())n.push(ke(r,e,t));return n.push(c),Le(n)})).catch((e=>M(e,8)?e:Promise.reject(e)))}function F(e,t,n){for(const r of v.list())r(e,t,n);}function D(e,t,r,a,c){const s=A(e,t);if(s)return s;const i=t===$,l=n?history.state:{};r&&(a||i?h.replace(e.fullPath,o({scroll:i&&l&&l.scroll},c)):h.push(e.fullPath,c)),y.value=e,Q(e,t,r,i),z();}let I;function K(){I||(I=h.listen(((e,t,r)=>{if(!J.listening)return;const a=C(e),s=B(a);if(s)return void T(o(s,{replace:!0}),a).catch(c);b=a;const i=y.value;var l,u;n&&(l=R(i.fullPath,r.delta),u=w(),O.set(l,u)),G(a,i).catch((e=>M(e,12)?e:M(e,2)?(T(e.to,a).then((e=>{M(e,20)&&!r.delta&&r.type===m.pop&&h.go(-1,!1);})).catch(c),Promise.reject()):(r.delta&&h.go(-r.delta,!1),N(e,a,i)))).then((e=>{(e=e||D(a,i,!1))&&(r.delta&&!M(e,8)?h.go(-r.delta,!1):r.type===m.pop&&M(e,20)&&h.go(-1,!1)),F(a,i,e);})).catch(c);})));}let V,H=Re(),W=Re();function N(e,t,n){z(e);const r=W.list();return r.length?r.forEach((r=>r(e,t,n))):console.error(e),Promise.reject(e)}function z(e){return V||(V=!e,K(),H.list().forEach((([t,n])=>e?n(e):t())),H.reset()),e}function Q(r,o,a,c){const{scrollBehavior:s}=e;if(!n||!s)return Promise.resolve();const i=!a&&function(e){const t=O.get(e);return O.delete(e),t}(R(r.fullPath,0))||(c||!a)&&history.state&&history.state.scroll||null;return t.nextTick().then((()=>s(r,o,i))).then((e=>e&&E(e))).catch((e=>N(e,r,o)))}const X=e=>h.go(e);let Y;const Z=new Set,J={currentRoute:y,listening:!0,addRoute:function(e,t){let n,o;return x(e)?(n=r.getRecordMatcher(e),o=t):o=e,r.addRoute(o,n)},removeRoute:function(e){const t=r.getRecordMatcher(e);t&&r.removeRoute(t);},hasRoute:function(e){return !!r.getRecordMatcher(e)},getRoutes:function(){return r.getRoutes().map((e=>e.record))},resolve:C,options:e,push:q,replace:function(e){return q(o(S(e),{replace:!0}))},go:X,back:()=>X(-1),forward:()=>X(1),beforeEach:d.add,beforeResolve:g.add,afterEach:v.add,onError:W.add,isReady:function(){return V&&y.value!==$?Promise.resolve():new Promise(((e,t)=>{H.add([e,t]);}))},install(e){e.component("RouterLink",Ce),e.component("RouterView",Ae),e.config.globalProperties.$router=this,Object.defineProperty(e.config.globalProperties,"$route",{enumerable:!0,get:()=>t.unref(y)}),n&&!Y&&y.value===$&&(Y=!0,q(h.location).catch((e=>{})));const r={};for(const e in $)r[e]=t.computed((()=>y.value[e]));e.provide(be,this),e.provide(we,t.reactive(r)),e.provide(Ee,y);const o=e.unmount;Z.add(e),e.unmount=function(){Z.delete(e),Z.size<1&&(b=$,I&&I(),I=null,y.value=$,Y=!1,V=!1),o();};}};return J},e.createRouterMatcher=U,e.createWebHashHistory=function(e){return (e=location.host?e||location.pathname+location.search:"").includes("#")||(e+="#"),C(e)},e.createWebHistory=C,e.isNavigationFailure=M,e.loadRouteLocation=function(e){return e.matched.every((e=>e.redirect))?Promise.reject(new Error("Cannot load a route that redirects.")):Promise.all(e.matched.map((e=>e.components&&Promise.all(Object.keys(e.components).reduce(((t,n)=>{const o=e.components[n];return "function"!=typeof o||"displayName"in o||t.push(o().then((t=>{if(!t)return Promise.reject(new Error(`Couldn't resolve component "${n}" at "${e.path}". Ensure you passed a function that returns a promise.`));const o=r(t)?t.default:t;e.components[n]=o;}))),t}),[]))))).then((()=>e))},e.matchedRouteKey=ve,e.onBeforeRouteLeave=function(e){const n=t.inject(ve,{}).value;n&&Oe(n,"leaveGuards",e);},e.onBeforeRouteUpdate=function(e){const n=t.inject(ve,{}).value;n&&Oe(n,"updateGuards",e);},e.parseQuery=de,e.routeLocationKey=we,e.routerKey=be,e.routerViewLocationKey=Ee,e.stringifyQuery=me,e.useLink=Pe,e.useRoute=function(){return t.inject(we)},e.useRouter=function(){return t.inject(be)},e.viewDepthKey=ye,Object.defineProperty(e,"__esModule",{value:!0}),e}({},Vue);

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
              return;
          }

          this.isAnimating = true;

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

  on$1(document.documentElement, 'keyup', function (e) {

      if (!['Esc', 'Escape'].includes(e.key)) {
          return;
      }

      let last = null;

      document.querySelectorAll('kiss-dialog[open="true"][esc="true"]').forEach(dialog => {
          last = dialog;
      });

      if (last) last.close();
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

              const focusElement = this.querySelector('[autofocus]') || this.querySelector('a[href],button');

              if (focusElement) {
                  focusElement.focus();
              }

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

  on$1(document.documentElement, 'click', '[kiss-popoutmenu]', function (e) {

      e.preventDefault();

      let menu = document.querySelector(this.getAttribute('kiss-popoutmenu') || this.getAttribute('href'));

      if (menu && menu.show) {

          let position = this.getAttribute('kiss-popoutmenu-pos');

          menu.show(position ? this : null, position);
      }
  });

  customElements.define('kiss-popoutmenu', class extends HTMLElement {

      connectedCallback() {

          on$1(this, 'click', e => {

              if (e.target.matches('[kiss-popoutmenu-close]') || e.target.closest('[kiss-popoutmenu-close]')) {
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
                  case "right":
                      left = rect.right - content.offsetWidth;
                      break;

                  case "center":
                      left = (rect.right - ele.offsetWidth/2) - content.offsetWidth / 2;
                      break;

                  case "left":
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

          }

          this.setAttribute('open', 'true');
      }

      close() {
          this.removeAttribute('open');
          trigger(this, 'popoutmenuclose');
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
      return on$1(this, event, selector, handler)
  };

  HTMLElement.prototype.onMutation = function(cb) {
      return onMutation(cb, this)
  };

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

  let uuid = function() {
      return crypto.randomUUID();
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
      on,
      toKebabCase,
      uuid,
      truncate,
      stripTags
  };

  var ui$1 = {

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

          let id = Math.random().toString(36).substring(2) + Date.now().toString(36),
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

          let id = Math.random().toString(36).substring(2) + Date.now().toString(36);

          document.body.insertAdjacentHTML('beforeend', `
            <kiss-dialog id="dialog-${id}" size="${(options && options.size) || ''}" type="${dialogtype}" esc="${(options && options.escape) ? 'true':'false'}">
                <kiss-content class="animated fadeInUp faster">
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
          let dialog = this.dialog(/*html*/`
            <form>
                <div class="kiss-margin kiss-dialog-prompt-message">${text}</div>
                <div class="kiss-margin-bottom">
                    <input class="kiss-width-1-1 kiss-input" type="text" required>
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

  var ui = {

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
          dialog.show();

          return dialog;
      }
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

                      $request(url, data) {
                          return App.request(url, data);
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

      VueView.ui = ui;

      window.VueView = VueView;

  })();

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

      let containers = document.querySelectorAll('app-fieldcontainer');

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

          this.addEventListener('click', e => this.setAttribute('active','true'));
          this.addEventListener('focusin', e => this.setAttribute('active','true'));
      }

      disconnectedCallback() {

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
  VueView.component('fields-manager', 'system:assets/vue-components/fields-manager.js');
  VueView.component('fields-renderer', 'system:assets/vue-components/fields-renderer.js');
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
              'app:assets/vendor/tabulator/tabulator.js',
              'app:assets/css/vendor/tabulator.css'
          ]).then(() => {
              App.utils.import('app:assets/vendor/tabulator/tabulator-vue.js').then((m) => resolve(m));
          });
      })
  }));

  VueView.component('revisions-widget', 'system:assets/vue-components/revisions/widget.js');

  // Fields
  VueView.component('field-boolean', 'app:assets/vue-components/field-boolean.js');
  VueView.component('field-code', 'app:assets/vue-components/field-code.js');
  VueView.component('field-color', 'app:assets/vue-components/field-color.js');
  VueView.component('field-date', 'app:assets/vue-components/field-date.js');
  VueView.component('field-datetime', 'app:assets/vue-components/field-datetime.js');
  VueView.component('field-nav', 'app:assets/vue-components/field-nav.js');
  VueView.component('field-number', 'app:assets/vue-components/field-number.js');
  VueView.component('field-object', 'app:assets/vue-components/field-object.js');
  VueView.component('field-select', 'app:assets/vue-components/field-select.js');
  VueView.component('field-set', 'app:assets/vue-components/field-set.js');
  VueView.component('field-table', 'app:assets/vue-components/field-table.js');
  VueView.component('field-tags', 'app:assets/vue-components/field-tags.js');
  VueView.component('field-text', 'app:assets/vue-components/field-text.js');
  VueView.component('field-time', 'app:assets/vue-components/field-time.js');
  VueView.component('field-wysiwyg', 'app:assets/vue-components/field-wysiwyg.js');

  let html = document.documentElement;
  let baseUrl = (html.getAttribute('data-base') || '').replace(/\/$/, '');
  let routeUrl = (html.getAttribute('data-route') || '').replace(/\/$/, '');

  let App$1 = {

      base_url: baseUrl,
      route_url: routeUrl,
      version: (html.getAttribute("data-version") || '0.0.1'),

      _events: {},
      _paths: {},

      base: function (url) {

          let path = url.match(/^(.*?)\:/);

          if (path && this._paths[path[1]]) {
              return url.replace(path[0], this._paths[path[1]]);
          }

          return this.base_url + url;
      },

      route: function (url) {
          return this.route_url + url;
      },

      reroute: function (url) {
          location.href = /^http/.test(url) ? url : this.route(url);
      },

      request: function (url, data, type) {

          url = this.route(url);
          type = type || 'json';

          return new Promise(function (fulfill, reject) {

              let xhr = new XMLHttpRequest();

              xhr.open('post', url, true);
              xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

              url += (url.indexOf('?') !== -1 ? '&' : '?') + 'nc=' + Math.random().toString(36).substr(2);

              if (data) {

                  if (typeof (data) === 'object' && data instanceof HTMLFormElement) {
                      data = new FormData(data);
                  } else if (typeof (data) === 'object' && data instanceof FormData) ; else if (typeof (data) === 'object') {

                      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
                      data = JSON.stringify(data || {});
                  }
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

                  if (this.status == 200) {
                      fulfill(resdata, xhr);
                  } else {
                      reject(resdata, xhr);
                  }
              };

              // send the collected data as JSON
              xhr.send(data);
          });
      },

      on: function (name, fn) {
          if (!this._events[name]) this._events[name] = [];
          this._events[name].push(fn);
      },

      off: function (name, fn) {
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

      trigger: function (name, params) {

          if (!this._events[name]) return;

          let event = { name, params };

          for (let i = 0; i < this._events[name].length; i++) {
              this._events[name][i].apply(App$1, [event]);
          }
      },

      deferred: function () {

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
  App$1.ui = ui$1;
  App$1.utils = utils;

  // custom utils
  App$1.utils.import = function(uri) {
      return import(App$1.base(uri)+'?v='+App$1.version);
  };

  App$1.utils.$interpolate = function (str, data) {

      data = Object.assign({}, App$1.utils.$interpolate.fns, data);

      return utils.interpolate(str, data);
  };

  App$1.utils.$interpolate.fns = {};

  window.App = App$1;

}());
