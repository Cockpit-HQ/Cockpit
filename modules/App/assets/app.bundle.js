(function () {
  'use strict';

  window.Vue=function(e){function t(e,t){const n=Object.create(null),o=e.split(",");for(let r=0;r<o.length;r++)n[o[r]]=!0;return t?e=>!!n[e.toLowerCase()]:e=>!!n[e]}const n=t("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt"),o=t("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");function r(e){return !!e||""===e}function s(e){if(N(e)){const t={};for(let n=0;n<e.length;n++){const o=e[n],r=F(o)?c(o):s(o);if(r)for(const e in r)t[e]=r[e];}return t}return F(e)||O(e)?e:void 0}const i=/;(?![^(]*\))/g,l=/:(.+)/;function c(e){const t={};return e.split(i).forEach((e=>{if(e){const n=e.split(l);n.length>1&&(t[n[0].trim()]=n[1].trim());}})),t}function a(e){let t="";if(F(e))t=e;else if(N(e))for(let n=0;n<e.length;n++){const o=a(e[n]);o&&(t+=o+" ");}else if(O(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const u=t("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot"),p=t("svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view"),f=t("area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr");function d(e,t){if(e===t)return !0;let n=R(e),o=R(t);if(n||o)return !(!n||!o)&&e.getTime()===t.getTime();if(n=N(e),o=N(t),n||o)return !(!n||!o)&&function(e,t){if(e.length!==t.length)return !1;let n=!0;for(let o=0;n&&o<e.length;o++)n=d(e[o],t[o]);return n}(e,t);if(n=O(e),o=O(t),n||o){if(!n||!o)return !1;if(Object.keys(e).length!==Object.keys(t).length)return !1;for(const n in e){const o=e.hasOwnProperty(n),r=t.hasOwnProperty(n);if(o&&!r||!o&&r||!d(e[n],t[n]))return !1}}return String(e)===String(t)}function h(e,t){return e.findIndex((e=>d(e,t)))}const m=(e,t)=>t&&t.__v_isRef?m(e,t.value):E(t)?{[`Map(${t.size})`]:[...t.entries()].reduce(((e,[t,n])=>(e[`${t} =>`]=n,e)),{})}:$(t)?{[`Set(${t.size})`]:[...t.values()]}:!O(t)||N(t)||B(t)?t:String(t),g={},v=[],y=()=>{},b=()=>!1,_=/^on[^a-z]/,S=e=>_.test(e),x=e=>e.startsWith("onUpdate:"),C=Object.assign,w=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1);},k=Object.prototype.hasOwnProperty,T=(e,t)=>k.call(e,t),N=Array.isArray,E=e=>"[object Map]"===V(e),$=e=>"[object Set]"===V(e),R=e=>e instanceof Date,A=e=>"function"==typeof e,F=e=>"string"==typeof e,M=e=>"symbol"==typeof e,O=e=>null!==e&&"object"==typeof e,P=e=>O(e)&&A(e.then)&&A(e.catch),I=Object.prototype.toString,V=e=>I.call(e),B=e=>"[object Object]"===V(e),L=e=>F(e)&&"NaN"!==e&&"-"!==e[0]&&""+parseInt(e,10)===e,j=t(",key,ref,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),U=e=>{const t=Object.create(null);return n=>t[n]||(t[n]=e(n))},H=/-(\w)/g,D=U((e=>e.replace(H,((e,t)=>t?t.toUpperCase():"")))),W=/\B([A-Z])/g,z=U((e=>e.replace(W,"-$1").toLowerCase())),K=U((e=>e.charAt(0).toUpperCase()+e.slice(1))),G=U((e=>e?`on${K(e)}`:"")),q=(e,t)=>!Object.is(e,t),J=(e,t)=>{for(let n=0;n<e.length;n++)e[n](t);},Z=(e,t,n)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:n});},Q=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let X;const Y=[];class ee{constructor(e=!1){this.active=!0,this.effects=[],this.cleanups=[],!e&&X&&(this.parent=X,this.index=(X.scopes||(X.scopes=[])).push(this)-1);}run(e){if(this.active)try{return this.on(),e()}finally{this.off();}}on(){this.active&&(Y.push(this),X=this);}off(){this.active&&(Y.pop(),X=Y[Y.length-1]);}stop(e){if(this.active){if(this.effects.forEach((e=>e.stop())),this.cleanups.forEach((e=>e())),this.scopes&&this.scopes.forEach((e=>e.stop(!0))),this.parent&&!e){const e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index);}this.active=!1;}}}function te(e,t){(t=t||X)&&t.active&&t.effects.push(e);}const ne=e=>{const t=new Set(e);return t.w=0,t.n=0,t},oe=e=>(e.w&le)>0,re=e=>(e.n&le)>0,se=new WeakMap;let ie=0,le=1;const ce=[];let ae;const ue=Symbol(""),pe=Symbol("");class fe{constructor(e,t=null,n){this.fn=e,this.scheduler=t,this.active=!0,this.deps=[],te(this,n);}run(){if(!this.active)return this.fn();if(!ce.includes(this))try{return ce.push(ae=this),me.push(he),he=!0,le=1<<++ie,ie<=30?(({deps:e})=>{if(e.length)for(let t=0;t<e.length;t++)e[t].w|=le;})(this):de(this),this.fn()}finally{ie<=30&&(e=>{const{deps:t}=e;if(t.length){let n=0;for(let o=0;o<t.length;o++){const r=t[o];oe(r)&&!re(r)?r.delete(e):t[n++]=r,r.w&=~le,r.n&=~le;}t.length=n;}})(this),le=1<<--ie,ve(),ce.pop();const e=ce.length;ae=e>0?ce[e-1]:void 0;}}stop(){this.active&&(de(this),this.onStop&&this.onStop(),this.active=!1);}}function de(e){const{deps:t}=e;if(t.length){for(let n=0;n<t.length;n++)t[n].delete(e);t.length=0;}}let he=!0;const me=[];function ge(){me.push(he),he=!1;}function ve(){const e=me.pop();he=void 0===e||e;}function ye(e,t,n){if(!be())return;let o=se.get(e);o||se.set(e,o=new Map);let r=o.get(n);r||o.set(n,r=ne()),_e(r);}function be(){return he&&void 0!==ae}function _e(e,t){let n=!1;ie<=30?re(e)||(e.n|=le,n=!oe(e)):n=!e.has(ae),n&&(e.add(ae),ae.deps.push(e));}function Se(e,t,n,o,r,s){const i=se.get(e);if(!i)return;let l=[];if("clear"===t)l=[...i.values()];else if("length"===n&&N(e))i.forEach(((e,t)=>{("length"===t||t>=o)&&l.push(e);}));else switch(void 0!==n&&l.push(i.get(n)),t){case"add":N(e)?L(n)&&l.push(i.get("length")):(l.push(i.get(ue)),E(e)&&l.push(i.get(pe)));break;case"delete":N(e)||(l.push(i.get(ue)),E(e)&&l.push(i.get(pe)));break;case"set":E(e)&&l.push(i.get(ue));}if(1===l.length)l[0]&&xe(l[0]);else {const e=[];for(const t of l)t&&e.push(...t);xe(ne(e));}}function xe(e,t){for(const n of N(e)?e:[...e])(n!==ae||n.allowRecurse)&&(n.scheduler?n.scheduler():n.run());}const Ce=t("__proto__,__v_isRef,__isVue"),we=new Set(Object.getOwnPropertyNames(Symbol).map((e=>Symbol[e])).filter(M)),ke=Ae(),Te=Ae(!1,!0),Ne=Ae(!0),Ee=Ae(!0,!0),$e=Re();function Re(){const e={};return ["includes","indexOf","lastIndexOf"].forEach((t=>{e[t]=function(...e){const n=bt(this);for(let t=0,r=this.length;t<r;t++)ye(n,0,t+"");const o=n[t](...e);return -1===o||!1===o?n[t](...e.map(bt)):o};})),["push","pop","shift","unshift","splice"].forEach((t=>{e[t]=function(...e){ge();const n=bt(this)[t].apply(this,e);return ve(),n};})),e}function Ae(e=!1,t=!1){return function(n,o,r){if("__v_isReactive"===o)return !e;if("__v_isReadonly"===o)return e;if("__v_raw"===o&&r===(e?t?ut:at:t?ct:lt).get(n))return n;const s=N(n);if(!e&&s&&T($e,o))return Reflect.get($e,o,r);const i=Reflect.get(n,o,r);if(M(o)?we.has(o):Ce(o))return i;if(e||ye(n,0,o),t)return i;if(wt(i)){return !s||!L(o)?i.value:i}return O(i)?e?ht(i):ft(i):i}}function Fe(e=!1){return function(t,n,o,r){let s=t[n];if(!e&&(o=bt(o),s=bt(s),!N(t)&&wt(s)&&!wt(o)))return s.value=o,!0;const i=N(t)&&L(n)?Number(n)<t.length:T(t,n),l=Reflect.set(t,n,o,r);return t===bt(r)&&(i?q(o,s)&&Se(t,"set",n,o):Se(t,"add",n,o)),l}}const Me={get:ke,set:Fe(),deleteProperty:function(e,t){const n=T(e,t),o=Reflect.deleteProperty(e,t);return o&&n&&Se(e,"delete",t,void 0),o},has:function(e,t){const n=Reflect.has(e,t);return M(t)&&we.has(t)||ye(e,0,t),n},ownKeys:function(e){return ye(e,0,N(e)?"length":ue),Reflect.ownKeys(e)}},Oe={get:Ne,set:(e,t)=>!0,deleteProperty:(e,t)=>!0},Pe=C({},Me,{get:Te,set:Fe(!0)}),Ie=C({},Oe,{get:Ee}),Ve=e=>O(e)?ft(e):e,Be=e=>O(e)?ht(e):e,Le=e=>e,je=e=>Reflect.getPrototypeOf(e);function Ue(e,t,n=!1,o=!1){const r=bt(e=e.__v_raw),s=bt(t);t!==s&&!n&&ye(r,0,t),!n&&ye(r,0,s);const{has:i}=je(r),l=o?Le:n?Be:Ve;return i.call(r,t)?l(e.get(t)):i.call(r,s)?l(e.get(s)):void(e!==r&&e.get(t))}function He(e,t=!1){const n=this.__v_raw,o=bt(n),r=bt(e);return e!==r&&!t&&ye(o,0,e),!t&&ye(o,0,r),e===r?n.has(e):n.has(e)||n.has(r)}function De(e,t=!1){return e=e.__v_raw,!t&&ye(bt(e),0,ue),Reflect.get(e,"size",e)}function We(e){e=bt(e);const t=bt(this);return je(t).has.call(t,e)||(t.add(e),Se(t,"add",e,e)),this}function ze(e,t){t=bt(t);const n=bt(this),{has:o,get:r}=je(n);let s=o.call(n,e);s||(e=bt(e),s=o.call(n,e));const i=r.call(n,e);return n.set(e,t),s?q(t,i)&&Se(n,"set",e,t):Se(n,"add",e,t),this}function Ke(e){const t=bt(this),{has:n,get:o}=je(t);let r=n.call(t,e);r||(e=bt(e),r=n.call(t,e)),o&&o.call(t,e);const s=t.delete(e);return r&&Se(t,"delete",e,void 0),s}function Ge(){const e=bt(this),t=0!==e.size,n=e.clear();return t&&Se(e,"clear",void 0,void 0),n}function qe(e,t){return function(n,o){const r=this,s=r.__v_raw,i=bt(s),l=t?Le:e?Be:Ve;return !e&&ye(i,0,ue),s.forEach(((e,t)=>n.call(o,l(e),l(t),r)))}}function Je(e,t,n){return function(...o){const r=this.__v_raw,s=bt(r),i=E(s),l="entries"===e||e===Symbol.iterator&&i,c="keys"===e&&i,a=r[e](...o),u=n?Le:t?Be:Ve;return !t&&ye(s,0,c?pe:ue),{next(){const{value:e,done:t}=a.next();return t?{value:e,done:t}:{value:l?[u(e[0]),u(e[1])]:u(e),done:t}},[Symbol.iterator](){return this}}}}function Ze(e){return function(...t){return "delete"!==e&&this}}function Qe(){const e={get(e){return Ue(this,e)},get size(){return De(this)},has:He,add:We,set:ze,delete:Ke,clear:Ge,forEach:qe(!1,!1)},t={get(e){return Ue(this,e,!1,!0)},get size(){return De(this)},has:He,add:We,set:ze,delete:Ke,clear:Ge,forEach:qe(!1,!0)},n={get(e){return Ue(this,e,!0)},get size(){return De(this,!0)},has(e){return He.call(this,e,!0)},add:Ze("add"),set:Ze("set"),delete:Ze("delete"),clear:Ze("clear"),forEach:qe(!0,!1)},o={get(e){return Ue(this,e,!0,!0)},get size(){return De(this,!0)},has(e){return He.call(this,e,!0)},add:Ze("add"),set:Ze("set"),delete:Ze("delete"),clear:Ze("clear"),forEach:qe(!0,!0)};return ["keys","values","entries",Symbol.iterator].forEach((r=>{e[r]=Je(r,!1,!1),n[r]=Je(r,!0,!1),t[r]=Je(r,!1,!0),o[r]=Je(r,!0,!0);})),[e,n,t,o]}const[Xe,Ye,et,tt]=Qe();function nt(e,t){const n=t?e?tt:et:e?Ye:Xe;return (t,o,r)=>"__v_isReactive"===o?!e:"__v_isReadonly"===o?e:"__v_raw"===o?t:Reflect.get(T(n,o)&&o in t?n:t,o,r)}const ot={get:nt(!1,!1)},rt={get:nt(!1,!0)},st={get:nt(!0,!1)},it={get:nt(!0,!0)},lt=new WeakMap,ct=new WeakMap,at=new WeakMap,ut=new WeakMap;function pt(e){return e.__v_skip||!Object.isExtensible(e)?0:function(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}((e=>V(e).slice(8,-1))(e))}function ft(e){return e&&e.__v_isReadonly?e:mt(e,!1,Me,ot,lt)}function dt(e){return mt(e,!1,Pe,rt,ct)}function ht(e){return mt(e,!0,Oe,st,at)}function mt(e,t,n,o,r){if(!O(e))return e;if(e.__v_raw&&(!t||!e.__v_isReactive))return e;const s=r.get(e);if(s)return s;const i=pt(e);if(0===i)return e;const l=new Proxy(e,2===i?o:n);return r.set(e,l),l}function gt(e){return vt(e)?gt(e.__v_raw):!(!e||!e.__v_isReactive)}function vt(e){return !(!e||!e.__v_isReadonly)}function yt(e){return gt(e)||vt(e)}function bt(e){const t=e&&e.__v_raw;return t?bt(t):e}function _t(e){return Z(e,"__v_skip",!0),e}function St(e){be()&&((e=bt(e)).dep||(e.dep=ne()),_e(e.dep));}function xt(e,t){(e=bt(e)).dep&&xe(e.dep);}const Ct=e=>O(e)?ft(e):e;function wt(e){return Boolean(e&&!0===e.__v_isRef)}function kt(e){return Nt(e,!1)}class Tt{constructor(e,t){this._shallow=t,this.dep=void 0,this.__v_isRef=!0,this._rawValue=t?e:bt(e),this._value=t?e:Ct(e);}get value(){return St(this),this._value}set value(e){e=this._shallow?e:bt(e),q(e,this._rawValue)&&(this._rawValue=e,this._value=this._shallow?e:Ct(e),xt(this));}}function Nt(e,t){return wt(e)?e:new Tt(e,t)}function Et(e){return wt(e)?e.value:e}const $t={get:(e,t,n)=>Et(Reflect.get(e,t,n)),set:(e,t,n,o)=>{const r=e[t];return wt(r)&&!wt(n)?(r.value=n,!0):Reflect.set(e,t,n,o)}};function Rt(e){return gt(e)?e:new Proxy(e,$t)}class At{constructor(e){this.dep=void 0,this.__v_isRef=!0;const{get:t,set:n}=e((()=>St(this)),(()=>xt(this)));this._get=t,this._set=n;}get value(){return this._get()}set value(e){this._set(e);}}class Ft{constructor(e,t){this._object=e,this._key=t,this.__v_isRef=!0;}get value(){return this._object[this._key]}set value(e){this._object[this._key]=e;}}function Mt(e,t){const n=e[t];return wt(n)?n:new Ft(e,t)}class Ot{constructor(e,t,n){this._setter=t,this.dep=void 0,this._dirty=!0,this.__v_isRef=!0,this.effect=new fe(e,(()=>{this._dirty||(this._dirty=!0,xt(this));})),this.__v_isReadonly=n;}get value(){const e=bt(this);return St(e),e._dirty&&(e._dirty=!1,e._value=e.effect.run()),e._value}set value(e){this._setter(e);}}function Pt(e,t){let n,o;A(e)?(n=e,o=y):(n=e.get,o=e.set);return new Ot(n,o,A(e)||!e.set)}function It(e,t,...n){const o=e.vnode.props||g;let r=n;const s=t.startsWith("update:"),i=s&&t.slice(7);if(i&&i in o){const e=`${"modelValue"===i?"model":i}Modifiers`,{number:t,trim:s}=o[e]||g;s?r=n.map((e=>e.trim())):t&&(r=n.map(Q));}let l,c=o[l=G(t)]||o[l=G(D(t))];!c&&s&&(c=o[l=G(z(t))]),c&&$r(c,e,6,r);const a=o[l+"Once"];if(a){if(e.emitted){if(e.emitted[l])return}else e.emitted={};e.emitted[l]=!0,$r(a,e,6,r);}}function Vt(e,t,n=!1){const o=t.emitsCache,r=o.get(e);if(void 0!==r)return r;const s=e.emits;let i={},l=!1;if(!A(e)){const o=e=>{const n=Vt(e,t,!0);n&&(l=!0,C(i,n));};!n&&t.mixins.length&&t.mixins.forEach(o),e.extends&&o(e.extends),e.mixins&&e.mixins.forEach(o);}return s||l?(N(s)?s.forEach((e=>i[e]=null)):C(i,s),o.set(e,i),i):(o.set(e,null),null)}function Bt(e,t){return !(!e||!S(t))&&(t=t.slice(2).replace(/Once$/,""),T(e,t[0].toLowerCase()+t.slice(1))||T(e,z(t))||T(e,t))}let Lt=null,jt=null;function Ut(e){const t=Lt;return Lt=e,jt=e&&e.type.__scopeId||null,t}function Ht(e,t=Lt,n){if(!t)return e;if(e._n)return e;const o=(...n)=>{o._d&&Lo(-1);const r=Ut(t),s=e(...n);return Ut(r),o._d&&Lo(1),s};return o._n=!0,o._c=!0,o._d=!0,o}function Dt(e){const{type:t,vnode:n,proxy:o,withProxy:r,props:s,propsOptions:[i],slots:l,attrs:c,emit:a,render:u,renderCache:p,data:f,setupState:d,ctx:h,inheritAttrs:m}=e;let g,v;const y=Ut(e);try{if(4&n.shapeFlag){const e=r||o;g=Xo(u.call(e,e,p,s,d,f,h)),v=c;}else {const e=t;0,g=Xo(e(s,e.length>1?{attrs:c,slots:l,emit:a}:null)),v=t.props?c:Wt(c);}}catch(_){Oo.length=0,Rr(_,e,1),g=qo(Fo);}let b=g;if(v&&!1!==m){const e=Object.keys(v),{shapeFlag:t}=b;e.length&&7&t&&(i&&e.some(x)&&(v=zt(v,i)),b=Zo(b,v));}return n.dirs&&(b.dirs=b.dirs?b.dirs.concat(n.dirs):n.dirs),n.transition&&(b.transition=n.transition),g=b,Ut(y),g}const Wt=e=>{let t;for(const n in e)("class"===n||"style"===n||S(n))&&((t||(t={}))[n]=e[n]);return t},zt=(e,t)=>{const n={};for(const o in e)x(o)&&o.slice(9)in t||(n[o]=e[o]);return n};function Kt(e,t,n){const o=Object.keys(t);if(o.length!==Object.keys(e).length)return !0;for(let r=0;r<o.length;r++){const s=o[r];if(t[s]!==e[s]&&!Bt(n,s))return !0}return !1}function Gt({vnode:e,parent:t},n){for(;t&&t.subTree===e;)(e=t.vnode).el=n,t=t.parent;}const qt={name:"Suspense",__isSuspense:!0,process(e,t,n,o,r,s,i,l,c,a){null==e?function(e,t,n,o,r,s,i,l,c){const{p:a,o:{createElement:u}}=c,p=u("div"),f=e.suspense=Zt(e,r,o,t,p,n,s,i,l,c);a(null,f.pendingBranch=e.ssContent,p,null,o,f,s,i),f.deps>0?(Jt(e,"onPending"),Jt(e,"onFallback"),a(null,e.ssFallback,t,n,o,null,s,i),Yt(f,e.ssFallback)):f.resolve();}(t,n,o,r,s,i,l,c,a):function(e,t,n,o,r,s,i,l,{p:c,um:a,o:{createElement:u}}){const p=t.suspense=e.suspense;p.vnode=t,t.el=e.el;const f=t.ssContent,d=t.ssFallback,{activeBranch:h,pendingBranch:m,isInFallback:g,isHydrating:v}=p;if(m)p.pendingBranch=f,Do(f,m)?(c(m,f,p.hiddenContainer,null,r,p,s,i,l),p.deps<=0?p.resolve():g&&(c(h,d,n,o,r,null,s,i,l),Yt(p,d))):(p.pendingId++,v?(p.isHydrating=!1,p.activeBranch=m):a(m,r,p),p.deps=0,p.effects.length=0,p.hiddenContainer=u("div"),g?(c(null,f,p.hiddenContainer,null,r,p,s,i,l),p.deps<=0?p.resolve():(c(h,d,n,o,r,null,s,i,l),Yt(p,d))):h&&Do(f,h)?(c(h,f,n,o,r,p,s,i,l),p.resolve(!0)):(c(null,f,p.hiddenContainer,null,r,p,s,i,l),p.deps<=0&&p.resolve()));else if(h&&Do(f,h))c(h,f,n,o,r,p,s,i,l),Yt(p,f);else if(Jt(t,"onPending"),p.pendingBranch=f,p.pendingId++,c(null,f,p.hiddenContainer,null,r,p,s,i,l),p.deps<=0)p.resolve();else {const{timeout:e,pendingId:t}=p;e>0?setTimeout((()=>{p.pendingId===t&&p.fallback(d);}),e):0===e&&p.fallback(d);}}(e,t,n,o,r,i,l,c,a);},hydrate:function(e,t,n,o,r,s,i,l,c){const a=t.suspense=Zt(t,o,n,e.parentNode,document.createElement("div"),null,r,s,i,l,!0),u=c(e,a.pendingBranch=t.ssContent,n,a,s,i);0===a.deps&&a.resolve();return u},create:Zt,normalize:function(e){const{shapeFlag:t,children:n}=e,o=32&t;e.ssContent=Qt(o?n.default:n),e.ssFallback=o?Qt(n.fallback):qo(Fo);}};function Jt(e,t){const n=e.props&&e.props[t];A(n)&&n();}function Zt(e,t,n,o,r,s,i,l,c,a,u=!1){const{p:p,m:f,um:d,n:h,o:{parentNode:m,remove:g}}=a,v=Q(e.props&&e.props.timeout),y={vnode:e,parent:t,parentComponent:n,isSVG:i,container:o,hiddenContainer:r,anchor:s,deps:0,pendingId:0,timeout:"number"==typeof v?v:-1,activeBranch:null,pendingBranch:null,isInFallback:!0,isHydrating:u,isUnmounted:!1,effects:[],resolve(e=!1){const{vnode:t,activeBranch:n,pendingBranch:o,pendingId:r,effects:s,parentComponent:i,container:l}=y;if(y.isHydrating)y.isHydrating=!1;else if(!e){const e=n&&o.transition&&"out-in"===o.transition.mode;e&&(n.transition.afterLeave=()=>{r===y.pendingId&&f(o,l,t,0);});let{anchor:t}=y;n&&(t=h(n),d(n,i,y,!0)),e||f(o,l,t,0);}Yt(y,o),y.pendingBranch=null,y.isInFallback=!1;let c=y.parent,a=!1;for(;c;){if(c.pendingBranch){c.effects.push(...s),a=!0;break}c=c.parent;}a||qr(s),y.effects=[],Jt(t,"onResolve");},fallback(e){if(!y.pendingBranch)return;const{vnode:t,activeBranch:n,parentComponent:o,container:r,isSVG:s}=y;Jt(t,"onFallback");const i=h(n),a=()=>{y.isInFallback&&(p(null,e,r,i,o,null,s,l,c),Yt(y,e));},u=e.transition&&"out-in"===e.transition.mode;u&&(n.transition.afterLeave=a),y.isInFallback=!0,d(n,o,null,!0),u||a();},move(e,t,n){y.activeBranch&&f(y.activeBranch,e,t,n),y.container=e;},next:()=>y.activeBranch&&h(y.activeBranch),registerDep(e,t){const n=!!y.pendingBranch;n&&y.deps++;const o=e.vnode.el;e.asyncDep.catch((t=>{Rr(t,e,0);})).then((r=>{if(e.isUnmounted||y.isUnmounted||y.pendingId!==e.suspenseId)return;e.asyncResolved=!0;const{vnode:s}=e;vr(e,r),o&&(s.el=o);const l=!o&&e.subTree.el;t(e,s,m(o||e.subTree.el),o?null:h(e.subTree),y,i,c),l&&g(l),Gt(e,s.el),n&&0==--y.deps&&y.resolve();}));},unmount(e,t){y.isUnmounted=!0,y.activeBranch&&d(y.activeBranch,n,e,t),y.pendingBranch&&d(y.pendingBranch,n,e,t);}};return y}function Qt(e){let t;if(A(e)){const n=Bo&&e._c;n&&(e._d=!1,Io()),e=e(),n&&(e._d=!0,t=Po,Vo());}if(N(e)){const t=function(e){let t;for(let n=0;n<e.length;n++){const o=e[n];if(!Ho(o))return;if(o.type!==Fo||"v-if"===o.children){if(t)return;t=o;}}return t}(e);e=t;}return e=Xo(e),t&&!e.dynamicChildren&&(e.dynamicChildren=t.filter((t=>t!==e))),e}function Xt(e,t){t&&t.pendingBranch?N(e)?t.effects.push(...e):t.effects.push(e):qr(e);}function Yt(e,t){e.activeBranch=t;const{vnode:n,parentComponent:o}=e,r=n.el=t.el;o&&o.subTree===n&&(o.vnode.el=r,Gt(o,r));}function en(e,t){if(ar){let n=ar.provides;const o=ar.parent&&ar.parent.provides;o===n&&(n=ar.provides=Object.create(o)),n[e]=t;}}function tn(e,t,n=!1){const o=ar||Lt;if(o){const r=null==o.parent?o.vnode.appContext&&o.vnode.appContext.provides:o.parent.provides;if(r&&e in r)return r[e];if(arguments.length>1)return n&&A(t)?t.call(o.proxy):t}}function nn(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return Nn((()=>{e.isMounted=!0;})),Rn((()=>{e.isUnmounting=!0;})),e}const on=[Function,Array],rn={name:"BaseTransition",props:{mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:on,onEnter:on,onAfterEnter:on,onEnterCancelled:on,onBeforeLeave:on,onLeave:on,onAfterLeave:on,onLeaveCancelled:on,onBeforeAppear:on,onAppear:on,onAfterAppear:on,onAppearCancelled:on},setup(e,{slots:t}){const n=ur(),o=nn();let r;return ()=>{const s=t.default&&pn(t.default(),!0);if(!s||!s.length)return;const i=bt(e),{mode:l}=i,c=s[0];if(o.isLeaving)return cn(c);const a=an(c);if(!a)return cn(c);const u=ln(a,i,o,n);un(a,u);const p=n.subTree,f=p&&an(p);let d=!1;const{getTransitionKey:h}=a.type;if(h){const e=h();void 0===r?r=e:e!==r&&(r=e,d=!0);}if(f&&f.type!==Fo&&(!Do(a,f)||d)){const e=ln(f,i,o,n);if(un(f,e),"out-in"===l)return o.isLeaving=!0,e.afterLeave=()=>{o.isLeaving=!1,n.update();},cn(c);"in-out"===l&&a.type!==Fo&&(e.delayLeave=(e,t,n)=>{sn(o,f)[String(f.key)]=f,e._leaveCb=()=>{t(),e._leaveCb=void 0,delete u.delayedLeave;},u.delayedLeave=n;});}return c}}};function sn(e,t){const{leavingVNodes:n}=e;let o=n.get(t.type);return o||(o=Object.create(null),n.set(t.type,o)),o}function ln(e,t,n,o){const{appear:r,mode:s,persisted:i=!1,onBeforeEnter:l,onEnter:c,onAfterEnter:a,onEnterCancelled:u,onBeforeLeave:p,onLeave:f,onAfterLeave:d,onLeaveCancelled:h,onBeforeAppear:m,onAppear:g,onAfterAppear:v,onAppearCancelled:y}=t,b=String(e.key),_=sn(n,e),S=(e,t)=>{e&&$r(e,o,9,t);},x={mode:s,persisted:i,beforeEnter(t){let o=l;if(!n.isMounted){if(!r)return;o=m||l;}t._leaveCb&&t._leaveCb(!0);const s=_[b];s&&Do(e,s)&&s.el._leaveCb&&s.el._leaveCb(),S(o,[t]);},enter(e){let t=c,o=a,s=u;if(!n.isMounted){if(!r)return;t=g||c,o=v||a,s=y||u;}let i=!1;const l=e._enterCb=t=>{i||(i=!0,S(t?s:o,[e]),x.delayedLeave&&x.delayedLeave(),e._enterCb=void 0);};t?(t(e,l),t.length<=1&&l()):l();},leave(t,o){const r=String(e.key);if(t._enterCb&&t._enterCb(!0),n.isUnmounting)return o();S(p,[t]);let s=!1;const i=t._leaveCb=n=>{s||(s=!0,o(),S(n?h:d,[t]),t._leaveCb=void 0,_[r]===e&&delete _[r]);};_[r]=e,f?(f(t,i),f.length<=1&&i()):i();},clone:e=>ln(e,t,n,o)};return x}function cn(e){if(mn(e))return (e=Zo(e)).children=null,e}function an(e){return mn(e)?e.children?e.children[0]:void 0:e}function un(e,t){6&e.shapeFlag&&e.component?un(e.component.subTree,t):128&e.shapeFlag?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t;}function pn(e,t=!1){let n=[],o=0;for(let r=0;r<e.length;r++){const s=e[r];s.type===Ro?(128&s.patchFlag&&o++,n=n.concat(pn(s.children,t))):(t||s.type!==Fo)&&n.push(s);}if(o>1)for(let r=0;r<n.length;r++)n[r].patchFlag=-2;return n}function fn(e){return A(e)?{setup:e,name:e.name}:e}const dn=e=>!!e.type.__asyncLoader;function hn(e,{vnode:{ref:t,props:n,children:o}}){const r=qo(e,n,o);return r.ref=t,r}const mn=e=>e.type.__isKeepAlive,gn={name:"KeepAlive",__isKeepAlive:!0,props:{include:[String,RegExp,Array],exclude:[String,RegExp,Array],max:[String,Number]},setup(e,{slots:t}){const n=ur(),o=n.ctx;if(!o.renderer)return t.default;const r=new Map,s=new Set;let i=null;const l=n.suspense,{renderer:{p:c,m:a,um:u,o:{createElement:p}}}=o,f=p("div");function d(e){xn(e),u(e,n,l);}function h(e){r.forEach(((t,n)=>{const o=Cr(t.type);!o||e&&e(o)||m(n);}));}function m(e){const t=r.get(e);i&&t.type===i.type?i&&xn(i):d(t),r.delete(e),s.delete(e);}o.activate=(e,t,n,o,r)=>{const s=e.component;a(e,t,n,0,l),c(s.vnode,e,t,n,s,l,o,e.slotScopeIds,r),ho((()=>{s.isDeactivated=!1,s.a&&J(s.a);const t=e.props&&e.props.onVnodeMounted;t&&bo(t,s.parent,e);}),l);},o.deactivate=e=>{const t=e.component;a(e,f,null,1,l),ho((()=>{t.da&&J(t.da);const n=e.props&&e.props.onVnodeUnmounted;n&&bo(n,t.parent,e),t.isDeactivated=!0;}),l);},ts((()=>[e.include,e.exclude]),(([e,t])=>{e&&h((t=>vn(e,t))),t&&h((e=>!vn(t,e)));}),{flush:"post",deep:!0});let g=null;const v=()=>{null!=g&&r.set(g,Cn(n.subTree));};return Nn(v),$n(v),Rn((()=>{r.forEach((e=>{const{subTree:t,suspense:o}=n,r=Cn(t);if(e.type!==r.type)d(e);else {xn(r);const e=r.component.da;e&&ho(e,o);}}));})),()=>{if(g=null,!t.default)return null;const n=t.default(),o=n[0];if(n.length>1)return i=null,n;if(!(Ho(o)&&(4&o.shapeFlag||128&o.shapeFlag)))return i=null,o;let l=Cn(o);const c=l.type,a=Cr(dn(l)?l.type.__asyncResolved||{}:c),{include:u,exclude:p,max:f}=e;if(u&&(!a||!vn(u,a))||p&&a&&vn(p,a))return i=l,o;const d=null==l.key?c:l.key,h=r.get(d);return l.el&&(l=Zo(l),128&o.shapeFlag&&(o.ssContent=l)),g=d,h?(l.el=h.el,l.component=h.component,l.transition&&un(l,l.transition),l.shapeFlag|=512,s.delete(d),s.add(d)):(s.add(d),f&&s.size>parseInt(f,10)&&m(s.values().next().value)),l.shapeFlag|=256,i=l,o}}};function vn(e,t){return N(e)?e.some((e=>vn(e,t))):F(e)?e.split(",").indexOf(t)>-1:!!e.test&&e.test(t)}function yn(e,t){_n(e,"a",t);}function bn(e,t){_n(e,"da",t);}function _n(e,t,n=ar){const o=e.__wdc||(e.__wdc=()=>{let t=n;for(;t;){if(t.isDeactivated)return;t=t.parent;}e();});if(wn(t,o,n),n){let e=n.parent;for(;e&&e.parent;)mn(e.parent.vnode)&&Sn(o,t,n,e),e=e.parent;}}function Sn(e,t,n,o){const r=wn(t,e,o,!0);An((()=>{w(o[t],r);}),n);}function xn(e){let t=e.shapeFlag;256&t&&(t-=256),512&t&&(t-=512),e.shapeFlag=t;}function Cn(e){return 128&e.shapeFlag?e.ssContent:e}function wn(e,t,n=ar,o=!1){if(n){const r=n[e]||(n[e]=[]),s=t.__weh||(t.__weh=(...o)=>{if(n.isUnmounted)return;ge(),pr(n);const r=$r(t,n,e,o);return fr(),ve(),r});return o?r.unshift(s):r.push(s),s}}const kn=e=>(t,n=ar)=>(!gr||"sp"===e)&&wn(e,t,n),Tn=kn("bm"),Nn=kn("m"),En=kn("bu"),$n=kn("u"),Rn=kn("bum"),An=kn("um"),Fn=kn("sp"),Mn=kn("rtg"),On=kn("rtc");function Pn(e,t=ar){wn("ec",e,t);}let In=!0;function Vn(e){const t=jn(e),n=e.proxy,o=e.ctx;In=!1,t.beforeCreate&&Bn(t.beforeCreate,e,"bc");const{data:r,computed:s,methods:i,watch:l,provide:c,inject:a,created:u,beforeMount:p,mounted:f,beforeUpdate:d,updated:h,activated:m,deactivated:g,beforeUnmount:v,unmounted:b,render:_,renderTracked:S,renderTriggered:x,errorCaptured:C,serverPrefetch:w,expose:k,inheritAttrs:T,components:E,directives:$}=t;if(a&&function(e,t,n=y,o=!1){N(e)&&(e=Wn(e));for(const r in e){const n=e[r];let s;s=O(n)?"default"in n?tn(n.from||r,n.default,!0):tn(n.from||r):tn(n),wt(s)&&o?Object.defineProperty(t,r,{enumerable:!0,configurable:!0,get:()=>s.value,set:e=>s.value=e}):t[r]=s;}}(a,o,null,e.appContext.config.unwrapInjectedRef),i)for(const y in i){const e=i[y];A(e)&&(o[y]=e.bind(n));}if(r){const t=r.call(n,n);O(t)&&(e.data=ft(t));}if(In=!0,s)for(const N in s){const e=s[N],t=Pt({get:A(e)?e.bind(n,n):A(e.get)?e.get.bind(n,n):y,set:!A(e)&&A(e.set)?e.set.bind(n):y});Object.defineProperty(o,N,{enumerable:!0,configurable:!0,get:()=>t.value,set:e=>t.value=e});}if(l)for(const y in l)Ln(l[y],o,n,y);if(c){const e=A(c)?c.call(n):c;Reflect.ownKeys(e).forEach((t=>{en(t,e[t]);}));}function R(e,t){N(t)?t.forEach((t=>e(t.bind(n)))):t&&e(t.bind(n));}if(u&&Bn(u,e,"c"),R(Tn,p),R(Nn,f),R(En,d),R($n,h),R(yn,m),R(bn,g),R(Pn,C),R(On,S),R(Mn,x),R(Rn,v),R(An,b),R(Fn,w),N(k))if(k.length){const t=e.exposed||(e.exposed={});k.forEach((e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t});}));}else e.exposed||(e.exposed={});_&&e.render===y&&(e.render=_),null!=T&&(e.inheritAttrs=T),E&&(e.components=E),$&&(e.directives=$);}function Bn(e,t,n){$r(N(e)?e.map((e=>e.bind(t.proxy))):e.bind(t.proxy),t,n);}function Ln(e,t,n,o){const r=o.includes(".")?rs(n,o):()=>n[o];if(F(e)){const n=t[e];A(n)&&ts(r,n);}else if(A(e))ts(r,e.bind(n));else if(O(e))if(N(e))e.forEach((e=>Ln(e,t,n,o)));else {const o=A(e.handler)?e.handler.bind(n):t[e.handler];A(o)&&ts(r,o,e);}}function jn(e){const t=e.type,{mixins:n,extends:o}=t,{mixins:r,optionsCache:s,config:{optionMergeStrategies:i}}=e.appContext,l=s.get(t);let c;return l?c=l:r.length||n||o?(c={},r.length&&r.forEach((e=>Un(c,e,i,!0))),Un(c,t,i)):c=t,s.set(t,c),c}function Un(e,t,n,o=!1){const{mixins:r,extends:s}=t;s&&Un(e,s,n,!0),r&&r.forEach((t=>Un(e,t,n,!0)));for(const i in t)if(o&&"expose"===i);else {const o=Hn[i]||n&&n[i];e[i]=o?o(e[i],t[i]):t[i];}return e}const Hn={data:Dn,props:Kn,emits:Kn,methods:Kn,computed:Kn,beforeCreate:zn,created:zn,beforeMount:zn,mounted:zn,beforeUpdate:zn,updated:zn,beforeDestroy:zn,beforeUnmount:zn,destroyed:zn,unmounted:zn,activated:zn,deactivated:zn,errorCaptured:zn,serverPrefetch:zn,components:Kn,directives:Kn,watch:function(e,t){if(!e)return t;if(!t)return e;const n=C(Object.create(null),e);for(const o in t)n[o]=zn(e[o],t[o]);return n},provide:Dn,inject:function(e,t){return Kn(Wn(e),Wn(t))}};function Dn(e,t){return t?e?function(){return C(A(e)?e.call(this,this):e,A(t)?t.call(this,this):t)}:t:e}function Wn(e){if(N(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function zn(e,t){return e?[...new Set([].concat(e,t))]:t}function Kn(e,t){return e?C(C(Object.create(null),e),t):t}function Gn(e,t,n,o){const[r,s]=e.propsOptions;let i,l=!1;if(t)for(let c in t){if(j(c))continue;const a=t[c];let u;r&&T(r,u=D(c))?s&&s.includes(u)?(i||(i={}))[u]=a:n[u]=a:Bt(e.emitsOptions,c)||a!==o[c]&&(o[c]=a,l=!0);}if(s){const t=bt(n),o=i||g;for(let i=0;i<s.length;i++){const l=s[i];n[l]=qn(r,t,l,o[l],e,!T(o,l));}}return l}function qn(e,t,n,o,r,s){const i=e[n];if(null!=i){const e=T(i,"default");if(e&&void 0===o){const e=i.default;if(i.type!==Function&&A(e)){const{propsDefaults:s}=r;n in s?o=s[n]:(pr(r),o=s[n]=e.call(null,t),fr());}else o=e;}i[0]&&(s&&!e?o=!1:!i[1]||""!==o&&o!==z(n)||(o=!0));}return o}function Jn(e,t,n=!1){const o=t.propsCache,r=o.get(e);if(r)return r;const s=e.props,i={},l=[];let c=!1;if(!A(e)){const o=e=>{c=!0;const[n,o]=Jn(e,t,!0);C(i,n),o&&l.push(...o);};!n&&t.mixins.length&&t.mixins.forEach(o),e.extends&&o(e.extends),e.mixins&&e.mixins.forEach(o);}if(!s&&!c)return o.set(e,v),v;if(N(s))for(let u=0;u<s.length;u++){const e=D(s[u]);Zn(e)&&(i[e]=g);}else if(s)for(const u in s){const e=D(u);if(Zn(e)){const t=s[u],n=i[e]=N(t)||A(t)?{type:t}:t;if(n){const t=Yn(Boolean,n.type),o=Yn(String,n.type);n[0]=t>-1,n[1]=o<0||t<o,(t>-1||T(n,"default"))&&l.push(e);}}}const a=[i,l];return o.set(e,a),a}function Zn(e){return "$"!==e[0]}function Qn(e){const t=e&&e.toString().match(/^\s*function (\w+)/);return t?t[1]:null===e?"null":""}function Xn(e,t){return Qn(e)===Qn(t)}function Yn(e,t){return N(t)?t.findIndex((t=>Xn(t,e))):A(t)&&Xn(t,e)?0:-1}const eo=e=>"_"===e[0]||"$stable"===e,to=e=>N(e)?e.map(Xo):[Xo(e)],no=(e,t,n)=>{const o=Ht(((...e)=>to(t(...e))),n);return o._c=!1,o},oo=(e,t,n)=>{const o=e._ctx;for(const r in e){if(eo(r))continue;const n=e[r];if(A(n))t[r]=no(0,n,o);else if(null!=n){const e=to(n);t[r]=()=>e;}}},ro=(e,t)=>{const n=to(t);e.slots.default=()=>n;};function so(e,t,n,o){const r=e.dirs,s=t&&t.dirs;for(let i=0;i<r.length;i++){const l=r[i];s&&(l.oldValue=s[i].value);let c=l.dir[o];c&&(ge(),$r(c,n,8,[e.el,l,e,t]),ve());}}function io(){return {app:null,config:{isNativeTag:b,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let lo=0;function co(e,t){return function(n,o=null){null==o||O(o)||(o=null);const r=io(),s=new Set;let i=!1;const l=r.app={_uid:lo++,_component:n,_props:o,_container:null,_context:r,_instance:null,version:us,get config(){return r.config},set config(e){},use:(e,...t)=>(s.has(e)||(e&&A(e.install)?(s.add(e),e.install(l,...t)):A(e)&&(s.add(e),e(l,...t))),l),mixin:e=>(r.mixins.includes(e)||r.mixins.push(e),l),component:(e,t)=>t?(r.components[e]=t,l):r.components[e],directive:(e,t)=>t?(r.directives[e]=t,l):r.directives[e],mount(s,c,a){if(!i){const u=qo(n,o);return u.appContext=r,c&&t?t(u,s):e(u,s,a),i=!0,l._container=s,s.__vue_app__=l,u.component.proxy}},unmount(){i&&(e(null,l._container),delete l._container.__vue_app__);},provide:(e,t)=>(r.provides[e]=t,l)};return l}}let ao=!1;const uo=e=>/svg/.test(e.namespaceURI)&&"foreignObject"!==e.tagName,po=e=>8===e.nodeType;function fo(e){const{mt:t,p:n,o:{patchProp:o,nextSibling:r,parentNode:s,remove:i,insert:l,createComment:c}}=e,a=(n,o,i,l,c,m=!1)=>{const g=po(n)&&"["===n.data,v=()=>d(n,o,i,l,c,g),{type:y,ref:b,shapeFlag:_}=o,S=n.nodeType;o.el=n;let x=null;switch(y){case Ao:3!==S?x=v():(n.data!==o.children&&(ao=!0,n.data=o.children),x=r(n));break;case Fo:x=8!==S||g?v():r(n);break;case Mo:if(1===S){x=n;const e=!o.children.length;for(let t=0;t<o.staticCount;t++)e&&(o.children+=x.outerHTML),t===o.staticCount-1&&(o.anchor=x),x=r(x);return x}x=v();break;case Ro:x=g?f(n,o,i,l,c,m):v();break;default:if(1&_)x=1!==S||o.type.toLowerCase()!==n.tagName.toLowerCase()?v():u(n,o,i,l,c,m);else if(6&_){o.slotScopeIds=c;const e=s(n);if(t(o,e,null,i,l,uo(e),m),x=g?h(n):r(n),dn(o)){let t;g?(t=qo(Ro),t.anchor=x?x.previousSibling:e.lastChild):t=3===n.nodeType?Qo(""):qo("div"),t.el=n,o.component.subTree=t;}}else 64&_?x=8!==S?v():o.type.hydrate(n,o,i,l,c,m,e,p):128&_&&(x=o.type.hydrate(n,o,i,l,uo(s(n)),c,m,e,a));}return null!=b&&yo(b,null,l,o),x},u=(e,t,n,r,s,l)=>{l=l||!!t.dynamicChildren;const{type:c,props:a,patchFlag:u,shapeFlag:f,dirs:d}=t,h="input"===c&&d||"option"===c;if(h||-1!==u){if(d&&so(t,null,n,"created"),a)if(h||!l||48&u)for(const t in a)(h&&t.endsWith("value")||S(t)&&!j(t))&&o(e,t,null,a[t]);else a.onClick&&o(e,"onClick",null,a.onClick);let c;if((c=a&&a.onVnodeBeforeMount)&&bo(c,n,t),d&&so(t,null,n,"beforeMount"),((c=a&&a.onVnodeMounted)||d)&&Xt((()=>{c&&bo(c,n,t),d&&so(t,null,n,"mounted");}),r),16&f&&(!a||!a.innerHTML&&!a.textContent)){let o=p(e.firstChild,t,e,n,r,s,l);for(;o;){ao=!0;const e=o;o=o.nextSibling,i(e);}}else 8&f&&e.textContent!==t.children&&(ao=!0,e.textContent=t.children);}return e.nextSibling},p=(e,t,o,r,s,i,l)=>{l=l||!!t.dynamicChildren;const c=t.children,u=c.length;for(let p=0;p<u;p++){const t=l?c[p]:c[p]=Xo(c[p]);if(e)e=a(e,t,r,s,i,l);else {if(t.type===Ao&&!t.children)continue;ao=!0,n(null,t,o,null,r,s,uo(o),i);}}return e},f=(e,t,n,o,i,a)=>{const{slotScopeIds:u}=t;u&&(i=i?i.concat(u):u);const f=s(e),d=p(r(e),t,f,n,o,i,a);return d&&po(d)&&"]"===d.data?r(t.anchor=d):(ao=!0,l(t.anchor=c("]"),f,d),d)},d=(e,t,o,l,c,a)=>{if(ao=!0,t.el=null,a){const t=h(e);for(;;){const n=r(e);if(!n||n===t)break;i(n);}}const u=r(e),p=s(e);return i(e),n(null,t,p,u,o,l,uo(p),c),u},h=e=>{let t=0;for(;e;)if((e=r(e))&&po(e)&&("["===e.data&&t++,"]"===e.data)){if(0===t)return r(e);t--;}return e};return [(e,t)=>{if(!t.hasChildNodes())return n(null,e,t),void Zr();ao=!1,a(t.firstChild,e,null,null,null),Zr(),ao&&console.error("Hydration completed but contains mismatches.");},a]}const ho=Xt;function mo(e){return vo(e)}function go(e){return vo(e,fo)}function vo(e,t){const{insert:n,remove:o,patchProp:r,createElement:s,createText:i,createComment:l,setText:c,setElementText:a,parentNode:u,nextSibling:p,setScopeId:f=y,cloneNode:d,insertStaticContent:h}=e,m=(e,t,n,o=null,r=null,s=null,i=!1,l=null,c=!!t.dynamicChildren)=>{if(e===t)return;e&&!Do(e,t)&&(o=X(e),W(e,r,s,!0),e=null),-2===t.patchFlag&&(c=!1,t.dynamicChildren=null);const{type:a,ref:u,shapeFlag:p}=t;switch(a){case Ao:b(e,t,n,o);break;case Fo:_(e,t,n,o);break;case Mo:null==e&&S(t,n,o,i);break;case Ro:A(e,t,n,o,r,s,i,l,c);break;default:1&p?x(e,t,n,o,r,s,i,l,c):6&p?F(e,t,n,o,r,s,i,l,c):(64&p||128&p)&&a.process(e,t,n,o,r,s,i,l,c,te);}null!=u&&r&&yo(u,e&&e.ref,s,t||e,!t);},b=(e,t,o,r)=>{if(null==e)n(t.el=i(t.children),o,r);else {const n=t.el=e.el;t.children!==e.children&&c(n,t.children);}},_=(e,t,o,r)=>{null==e?n(t.el=l(t.children||""),o,r):t.el=e.el;},S=(e,t,n,o)=>{[e.el,e.anchor]=h(e.children,t,n,o);},x=(e,t,n,o,r,s,i,l,c)=>{i=i||"svg"===t.type,null==e?w(t,n,o,r,s,i,l,c):E(e,t,r,s,i,l,c);},w=(e,t,o,i,l,c,u,p)=>{let f,h;const{type:m,props:g,shapeFlag:v,transition:y,patchFlag:b,dirs:_}=e;if(e.el&&void 0!==d&&-1===b)f=e.el=d(e.el);else {if(f=e.el=s(e.type,c,g&&g.is,g),8&v?a(f,e.children):16&v&&N(e.children,f,null,i,l,c&&"foreignObject"!==m,u,p),_&&so(e,null,i,"created"),g){for(const t in g)"value"===t||j(t)||r(f,t,null,g[t],c,e.children,i,l,Q);"value"in g&&r(f,"value",null,g.value),(h=g.onVnodeBeforeMount)&&bo(h,i,e);}k(f,e,e.scopeId,u,i);}_&&so(e,null,i,"beforeMount");const S=(!l||l&&!l.pendingBranch)&&y&&!y.persisted;S&&y.beforeEnter(f),n(f,t,o),((h=g&&g.onVnodeMounted)||S||_)&&ho((()=>{h&&bo(h,i,e),S&&y.enter(f),_&&so(e,null,i,"mounted");}),l);},k=(e,t,n,o,r)=>{if(n&&f(e,n),o)for(let s=0;s<o.length;s++)f(e,o[s]);if(r){if(t===r.subTree){const t=r.vnode;k(e,t,t.scopeId,t.slotScopeIds,r.parent);}}},N=(e,t,n,o,r,s,i,l,c=0)=>{for(let a=c;a<e.length;a++){const c=e[a]=l?Yo(e[a]):Xo(e[a]);m(null,c,t,n,o,r,s,i,l);}},E=(e,t,n,o,s,i,l)=>{const c=t.el=e.el;let{patchFlag:u,dynamicChildren:p,dirs:f}=t;u|=16&e.patchFlag;const d=e.props||g,h=t.props||g;let m;(m=h.onVnodeBeforeUpdate)&&bo(m,n,t,e),f&&so(t,e,n,"beforeUpdate");const v=s&&"foreignObject"!==t.type;if(p?$(e.dynamicChildren,p,c,n,o,v,i):l||B(e,t,c,null,n,o,v,i,!1),u>0){if(16&u)R(c,t,d,h,n,o,s);else if(2&u&&d.class!==h.class&&r(c,"class",null,h.class,s),4&u&&r(c,"style",d.style,h.style,s),8&u){const i=t.dynamicProps;for(let t=0;t<i.length;t++){const l=i[t],a=d[l],u=h[l];u===a&&"value"!==l||r(c,l,a,u,s,e.children,n,o,Q);}}1&u&&e.children!==t.children&&a(c,t.children);}else l||null!=p||R(c,t,d,h,n,o,s);((m=h.onVnodeUpdated)||f)&&ho((()=>{m&&bo(m,n,t,e),f&&so(t,e,n,"updated");}),o);},$=(e,t,n,o,r,s,i)=>{for(let l=0;l<t.length;l++){const c=e[l],a=t[l],p=c.el&&(c.type===Ro||!Do(c,a)||70&c.shapeFlag)?u(c.el):n;m(c,a,p,null,o,r,s,i,!0);}},R=(e,t,n,o,s,i,l)=>{if(n!==o){for(const c in o){if(j(c))continue;const a=o[c],u=n[c];a!==u&&"value"!==c&&r(e,c,u,a,l,t.children,s,i,Q);}if(n!==g)for(const c in n)j(c)||c in o||r(e,c,n[c],null,l,t.children,s,i,Q);"value"in o&&r(e,"value",n.value,o.value);}},A=(e,t,o,r,s,l,c,a,u)=>{const p=t.el=e?e.el:i(""),f=t.anchor=e?e.anchor:i("");let{patchFlag:d,dynamicChildren:h,slotScopeIds:m}=t;m&&(a=a?a.concat(m):m),null==e?(n(p,o,r),n(f,o,r),N(t.children,o,f,s,l,c,a,u)):d>0&&64&d&&h&&e.dynamicChildren?($(e.dynamicChildren,h,o,s,l,c,a),(null!=t.key||s&&t===s.subTree)&&_o(e,t,!0)):B(e,t,o,f,s,l,c,a,u);},F=(e,t,n,o,r,s,i,l,c)=>{t.slotScopeIds=l,null==e?512&t.shapeFlag?r.ctx.activate(t,n,o,i,c):M(t,n,o,r,s,i,c):O(e,t,c);},M=(e,t,n,o,r,s,i)=>{const l=e.component=function(e,t,n){const o=e.type,r=(t?t.appContext:e.appContext)||lr,s={uid:cr++,vnode:e,type:o,parent:t,appContext:r,root:null,next:null,subTree:null,update:null,scope:new ee(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(r.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Jn(o,r),emitsOptions:Vt(o,r),emit:null,emitted:null,propsDefaults:g,inheritAttrs:o.inheritAttrs,ctx:g,data:g,props:g,attrs:g,slots:g,refs:g,setupState:g,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};s.ctx={_:s},s.root=t?t.root:s,s.emit=It.bind(null,s),e.ce&&e.ce(s);return s}(e,o,r);if(mn(e)&&(l.ctx.renderer=te),function(e,t=!1){gr=t;const{props:n,children:o}=e.vnode,r=dr(e);(function(e,t,n,o=!1){const r={},s={};Z(s,Wo,1),e.propsDefaults=Object.create(null),Gn(e,t,r,s);for(const i in e.propsOptions[0])i in r||(r[i]=void 0);e.props=n?o?r:dt(r):e.type.props?r:s,e.attrs=s;})(e,n,r,t),((e,t)=>{if(32&e.vnode.shapeFlag){const n=t._;n?(e.slots=bt(t),Z(t,"_",n)):oo(t,e.slots={});}else e.slots={},t&&ro(e,t);Z(e.slots,Wo,1);})(e,o);r?function(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=_t(new Proxy(e.ctx,sr));const{setup:o}=n;if(o){const n=e.setupContext=o.length>1?_r(e):null;pr(e),ge();const r=Er(o,e,0,[e.props,n]);if(ve(),fr(),P(r)){if(r.then(fr,fr),t)return r.then((t=>{vr(e,t);})).catch((t=>{Rr(t,e,0);}));e.asyncDep=r;}else vr(e,r);}else br(e);}(e,t):void 0;gr=!1;}(l),l.asyncDep){if(r&&r.registerDep(l,I),!e.el){const e=l.subTree=qo(Fo);_(null,e,t,n);}}else I(l,e,t,n,r,s,i);},O=(e,t,n)=>{const o=t.component=e.component;if(function(e,t,n){const{props:o,children:r,component:s}=e,{props:i,children:l,patchFlag:c}=t,a=s.emitsOptions;if(t.dirs||t.transition)return !0;if(!(n&&c>=0))return !(!r&&!l||l&&l.$stable)||o!==i&&(o?!i||Kt(o,i,a):!!i);if(1024&c)return !0;if(16&c)return o?Kt(o,i,a):!!i;if(8&c){const e=t.dynamicProps;for(let t=0;t<e.length;t++){const n=e[t];if(i[n]!==o[n]&&!Bt(a,n))return !0}}return !1}(e,t,n)){if(o.asyncDep&&!o.asyncResolved)return void V(o,t,n);o.next=t,function(e){const t=Mr.indexOf(e);t>Or&&Mr.splice(t,1);}(o.update),o.update();}else t.component=e.component,t.el=e.el,o.vnode=t;},I=(e,t,n,o,r,s,i)=>{const l=new fe((()=>{if(e.isMounted){let t,{next:n,bu:o,u:c,parent:a,vnode:p}=e,f=n;l.allowRecurse=!1,n?(n.el=p.el,V(e,n,i)):n=p,o&&J(o),(t=n.props&&n.props.onVnodeBeforeUpdate)&&bo(t,a,n,p),l.allowRecurse=!0;const d=Dt(e),h=e.subTree;e.subTree=d,m(h,d,u(h.el),X(h),e,r,s),n.el=d.el,null===f&&Gt(e,d.el),c&&ho(c,r),(t=n.props&&n.props.onVnodeUpdated)&&ho((()=>bo(t,a,n,p)),r);}else {let i;const{el:c,props:a}=t,{bm:u,m:p,parent:f}=e,d=dn(t);if(l.allowRecurse=!1,u&&J(u),!d&&(i=a&&a.onVnodeBeforeMount)&&bo(i,f,t),l.allowRecurse=!0,c&&oe){const n=()=>{e.subTree=Dt(e),oe(c,e.subTree,e,r,null);};d?t.type.__asyncLoader().then((()=>!e.isUnmounted&&n())):n();}else {const i=e.subTree=Dt(e);m(null,i,n,o,e,r,s),t.el=i.el;}if(p&&ho(p,r),!d&&(i=a&&a.onVnodeMounted)){const e=t;ho((()=>bo(i,f,e)),r);}256&t.shapeFlag&&e.a&&ho(e.a,r),e.isMounted=!0,t=n=o=null;}}),(()=>zr(e.update)),e.scope),c=e.update=l.run.bind(l);c.id=e.uid,l.allowRecurse=c.allowRecurse=!0,c();},V=(e,t,n)=>{t.component=e;const o=e.vnode.props;e.vnode=t,e.next=null,function(e,t,n,o){const{props:r,attrs:s,vnode:{patchFlag:i}}=e,l=bt(r),[c]=e.propsOptions;let a=!1;if(!(o||i>0)||16&i){let o;Gn(e,t,r,s)&&(a=!0);for(const s in l)t&&(T(t,s)||(o=z(s))!==s&&T(t,o))||(c?!n||void 0===n[s]&&void 0===n[o]||(r[s]=qn(c,l,s,void 0,e,!0)):delete r[s]);if(s!==l)for(const e in s)t&&T(t,e)||(delete s[e],a=!0);}else if(8&i){const n=e.vnode.dynamicProps;for(let o=0;o<n.length;o++){let i=n[o];const u=t[i];if(c)if(T(s,i))u!==s[i]&&(s[i]=u,a=!0);else {const t=D(i);r[t]=qn(c,l,t,u,e,!1);}else u!==s[i]&&(s[i]=u,a=!0);}}a&&Se(e,"set","$attrs");}(e,t.props,o,n),((e,t,n)=>{const{vnode:o,slots:r}=e;let s=!0,i=g;if(32&o.shapeFlag){const e=t._;e?n&&1===e?s=!1:(C(r,t),n||1!==e||delete r._):(s=!t.$stable,oo(t,r)),i=t;}else t&&(ro(e,t),i={default:1});if(s)for(const l in r)eo(l)||l in i||delete r[l];})(e,t.children,n),ge(),Jr(void 0,e.update),ve();},B=(e,t,n,o,r,s,i,l,c=!1)=>{const u=e&&e.children,p=e?e.shapeFlag:0,f=t.children,{patchFlag:d,shapeFlag:h}=t;if(d>0){if(128&d)return void U(u,f,n,o,r,s,i,l,c);if(256&d)return void L(u,f,n,o,r,s,i,l,c)}8&h?(16&p&&Q(u,r,s),f!==u&&a(n,f)):16&p?16&h?U(u,f,n,o,r,s,i,l,c):Q(u,r,s,!0):(8&p&&a(n,""),16&h&&N(f,n,o,r,s,i,l,c));},L=(e,t,n,o,r,s,i,l,c)=>{const a=(e=e||v).length,u=(t=t||v).length,p=Math.min(a,u);let f;for(f=0;f<p;f++){const o=t[f]=c?Yo(t[f]):Xo(t[f]);m(e[f],o,n,null,r,s,i,l,c);}a>u?Q(e,r,s,!0,!1,p):N(t,n,o,r,s,i,l,c,p);},U=(e,t,n,o,r,s,i,l,c)=>{let a=0;const u=t.length;let p=e.length-1,f=u-1;for(;a<=p&&a<=f;){const o=e[a],u=t[a]=c?Yo(t[a]):Xo(t[a]);if(!Do(o,u))break;m(o,u,n,null,r,s,i,l,c),a++;}for(;a<=p&&a<=f;){const o=e[p],a=t[f]=c?Yo(t[f]):Xo(t[f]);if(!Do(o,a))break;m(o,a,n,null,r,s,i,l,c),p--,f--;}if(a>p){if(a<=f){const e=f+1,p=e<u?t[e].el:o;for(;a<=f;)m(null,t[a]=c?Yo(t[a]):Xo(t[a]),n,p,r,s,i,l,c),a++;}}else if(a>f)for(;a<=p;)W(e[a],r,s,!0),a++;else {const d=a,h=a,g=new Map;for(a=h;a<=f;a++){const e=t[a]=c?Yo(t[a]):Xo(t[a]);null!=e.key&&g.set(e.key,a);}let y,b=0;const _=f-h+1;let S=!1,x=0;const C=new Array(_);for(a=0;a<_;a++)C[a]=0;for(a=d;a<=p;a++){const o=e[a];if(b>=_){W(o,r,s,!0);continue}let u;if(null!=o.key)u=g.get(o.key);else for(y=h;y<=f;y++)if(0===C[y-h]&&Do(o,t[y])){u=y;break}void 0===u?W(o,r,s,!0):(C[u-h]=a+1,u>=x?x=u:S=!0,m(o,t[u],n,null,r,s,i,l,c),b++);}const w=S?function(e){const t=e.slice(),n=[0];let o,r,s,i,l;const c=e.length;for(o=0;o<c;o++){const c=e[o];if(0!==c){if(r=n[n.length-1],e[r]<c){t[o]=r,n.push(o);continue}for(s=0,i=n.length-1;s<i;)l=s+i>>1,e[n[l]]<c?s=l+1:i=l;c<e[n[s]]&&(s>0&&(t[o]=n[s-1]),n[s]=o);}}s=n.length,i=n[s-1];for(;s-- >0;)n[s]=i,i=t[i];return n}(C):v;for(y=w.length-1,a=_-1;a>=0;a--){const e=h+a,p=t[e],f=e+1<u?t[e+1].el:o;0===C[a]?m(null,p,n,f,r,s,i,l,c):S&&(y<0||a!==w[y]?H(p,n,f,2):y--);}}},H=(e,t,o,r,s=null)=>{const{el:i,type:l,transition:c,children:a,shapeFlag:u}=e;if(6&u)return void H(e.component.subTree,t,o,r);if(128&u)return void e.suspense.move(t,o,r);if(64&u)return void l.move(e,t,o,te);if(l===Ro){n(i,t,o);for(let e=0;e<a.length;e++)H(a[e],t,o,r);return void n(e.anchor,t,o)}if(l===Mo)return void(({el:e,anchor:t},o,r)=>{let s;for(;e&&e!==t;)s=p(e),n(e,o,r),e=s;n(t,o,r);})(e,t,o);if(2!==r&&1&u&&c)if(0===r)c.beforeEnter(i),n(i,t,o),ho((()=>c.enter(i)),s);else {const{leave:e,delayLeave:r,afterLeave:s}=c,l=()=>n(i,t,o),a=()=>{e(i,(()=>{l(),s&&s();}));};r?r(i,l,a):a();}else n(i,t,o);},W=(e,t,n,o=!1,r=!1)=>{const{type:s,props:i,ref:l,children:c,dynamicChildren:a,shapeFlag:u,patchFlag:p,dirs:f}=e;if(null!=l&&yo(l,null,n,e,!0),256&u)return void t.ctx.deactivate(e);const d=1&u&&f,h=!dn(e);let m;if(h&&(m=i&&i.onVnodeBeforeUnmount)&&bo(m,t,e),6&u)q(e.component,n,o);else {if(128&u)return void e.suspense.unmount(n,o);d&&so(e,null,t,"beforeUnmount"),64&u?e.type.remove(e,t,n,r,te,o):a&&(s!==Ro||p>0&&64&p)?Q(a,t,n,!1,!0):(s===Ro&&384&p||!r&&16&u)&&Q(c,t,n),o&&K(e);}(h&&(m=i&&i.onVnodeUnmounted)||d)&&ho((()=>{m&&bo(m,t,e),d&&so(e,null,t,"unmounted");}),n);},K=e=>{const{type:t,el:n,anchor:r,transition:s}=e;if(t===Ro)return void G(n,r);if(t===Mo)return void(({el:e,anchor:t})=>{let n;for(;e&&e!==t;)n=p(e),o(e),e=n;o(t);})(e);const i=()=>{o(n),s&&!s.persisted&&s.afterLeave&&s.afterLeave();};if(1&e.shapeFlag&&s&&!s.persisted){const{leave:t,delayLeave:o}=s,r=()=>t(n,i);o?o(e.el,i,r):r();}else i();},G=(e,t)=>{let n;for(;e!==t;)n=p(e),o(e),e=n;o(t);},q=(e,t,n)=>{const{bum:o,scope:r,update:s,subTree:i,um:l}=e;o&&J(o),r.stop(),s&&(s.active=!1,W(i,e,t,n)),l&&ho(l,t),ho((()=>{e.isUnmounted=!0;}),t),t&&t.pendingBranch&&!t.isUnmounted&&e.asyncDep&&!e.asyncResolved&&e.suspenseId===t.pendingId&&(t.deps--,0===t.deps&&t.resolve());},Q=(e,t,n,o=!1,r=!1,s=0)=>{for(let i=s;i<e.length;i++)W(e[i],t,n,o,r);},X=e=>6&e.shapeFlag?X(e.component.subTree):128&e.shapeFlag?e.suspense.next():p(e.anchor||e.el),Y=(e,t,n)=>{null==e?t._vnode&&W(t._vnode,null,null,!0):m(t._vnode||null,e,t,null,null,null,n),Zr(),t._vnode=e;},te={p:m,um:W,m:H,r:K,mt:M,mc:N,pc:B,pbc:$,n:X,o:e};let ne,oe;return t&&([ne,oe]=t(te)),{render:Y,hydrate:ne,createApp:co(Y,ne)}}function yo(e,t,n,o,r=!1){if(N(e))return void e.forEach(((e,s)=>yo(e,t&&(N(t)?t[s]:t),n,o,r)));if(dn(o)&&!r)return;const s=4&o.shapeFlag?Sr(o.component)||o.component.proxy:o.el,i=r?null:s,{i:l,r:c}=e,a=t&&t.r,u=l.refs===g?l.refs={}:l.refs,p=l.setupState;if(null!=a&&a!==c&&(F(a)?(u[a]=null,T(p,a)&&(p[a]=null)):wt(a)&&(a.value=null)),F(c)){const e=()=>{u[c]=i,T(p,c)&&(p[c]=i);};i?(e.id=-1,ho(e,n)):e();}else if(wt(c)){const e=()=>{c.value=i;};i?(e.id=-1,ho(e,n)):e();}else A(c)&&Er(c,l,12,[i,u]);}function bo(e,t,n,o=null){$r(e,t,7,[n,o]);}function _o(e,t,n=!1){const o=e.children,r=t.children;if(N(o)&&N(r))for(let s=0;s<o.length;s++){const e=o[s];let t=r[s];1&t.shapeFlag&&!t.dynamicChildren&&((t.patchFlag<=0||32===t.patchFlag)&&(t=r[s]=Yo(r[s]),t.el=e.el),n||_o(e,t));}}const So=e=>e&&(e.disabled||""===e.disabled),xo=e=>"undefined"!=typeof SVGElement&&e instanceof SVGElement,Co=(e,t)=>{const n=e&&e.to;if(F(n)){if(t){return t(n)}return null}return n};function wo(e,t,n,{o:{insert:o},m:r},s=2){0===s&&o(e.targetAnchor,t,n);const{el:i,anchor:l,shapeFlag:c,children:a,props:u}=e,p=2===s;if(p&&o(i,t,n),(!p||So(u))&&16&c)for(let f=0;f<a.length;f++)r(a[f],t,n,2);p&&o(l,t,n);}const ko={__isTeleport:!0,process(e,t,n,o,r,s,i,l,c,a){const{mc:u,pc:p,pbc:f,o:{insert:d,querySelector:h,createText:m}}=a,g=So(t.props);let{shapeFlag:v,children:y,dynamicChildren:b}=t;if(null==e){const e=t.el=m(""),a=t.anchor=m("");d(e,n,o),d(a,n,o);const p=t.target=Co(t.props,h),f=t.targetAnchor=m("");p&&(d(f,p),i=i||xo(p));const b=(e,t)=>{16&v&&u(y,e,t,r,s,i,l,c);};g?b(n,a):p&&b(p,f);}else {t.el=e.el;const o=t.anchor=e.anchor,u=t.target=e.target,d=t.targetAnchor=e.targetAnchor,m=So(e.props),v=m?n:u,y=m?o:d;if(i=i||xo(u),b?(f(e.dynamicChildren,b,v,r,s,i,l),_o(e,t,!0)):c||p(e,t,v,y,r,s,i,l,!1),g)m||wo(t,n,o,a,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){const e=t.target=Co(t.props,h);e&&wo(t,e,null,a,0);}else m&&wo(t,u,d,a,1);}},remove(e,t,n,o,{um:r,o:{remove:s}},i){const{shapeFlag:l,children:c,anchor:a,targetAnchor:u,target:p,props:f}=e;if(p&&s(u),(i||!So(f))&&(s(a),16&l))for(let d=0;d<c.length;d++){const e=c[d];r(e,t,n,!0,!!e.dynamicChildren);}},move:wo,hydrate:function(e,t,n,o,r,s,{o:{nextSibling:i,parentNode:l,querySelector:c}},a){const u=t.target=Co(t.props,c);if(u){const c=u._lpa||u.firstChild;16&t.shapeFlag&&(So(t.props)?(t.anchor=a(i(e),t,l(e),n,o,r,s),t.targetAnchor=c):(t.anchor=i(e),t.targetAnchor=a(c,t,u,n,o,r,s)),u._lpa=t.targetAnchor&&i(t.targetAnchor));}return t.anchor&&i(t.anchor)}},To="components";const No=Symbol();function Eo(e,t,n=!0,o=!1){const r=Lt||ar;if(r){const n=r.type;if(e===To){const e=Cr(n);if(e&&(e===t||e===D(t)||e===K(D(t))))return n}const s=$o(r[e]||n[e],t)||$o(r.appContext[e],t);return !s&&o?n:s}}function $o(e,t){return e&&(e[t]||e[D(t)]||e[K(D(t))])}const Ro=Symbol(void 0),Ao=Symbol(void 0),Fo=Symbol(void 0),Mo=Symbol(void 0),Oo=[];let Po=null;function Io(e=!1){Oo.push(Po=e?null:[]);}function Vo(){Oo.pop(),Po=Oo[Oo.length-1]||null;}let Bo=1;function Lo(e){Bo+=e;}function jo(e){return e.dynamicChildren=Bo>0?Po||v:null,Vo(),Bo>0&&Po&&Po.push(e),e}function Uo(e,t,n,o,r){return jo(qo(e,t,n,o,r,!0))}function Ho(e){return !!e&&!0===e.__v_isVNode}function Do(e,t){return e.type===t.type&&e.key===t.key}const Wo="__vInternal",zo=({key:e})=>null!=e?e:null,Ko=({ref:e})=>null!=e?F(e)||wt(e)||A(e)?{i:Lt,r:e}:e:null;function Go(e,t=null,n=null,o=0,r=null,s=(e===Ro?0:1),i=!1,l=!1){const c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&zo(t),ref:t&&Ko(t),scopeId:jt,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:o,dynamicProps:r,dynamicChildren:null,appContext:null};return l?(er(c,n),128&s&&e.normalize(c)):n&&(c.shapeFlag|=F(n)?8:16),Bo>0&&!i&&Po&&(c.patchFlag>0||6&s)&&32!==c.patchFlag&&Po.push(c),c}const qo=function(e,t=null,n=null,o=0,r=null,i=!1){e&&e!==No||(e=Fo);if(Ho(e)){const o=Zo(e,t,!0);return n&&er(o,n),o}l=e,A(l)&&"__vccOpts"in l&&(e=e.__vccOpts);var l;if(t){t=Jo(t);let{class:e,style:n}=t;e&&!F(e)&&(t.class=a(e)),O(n)&&(yt(n)&&!N(n)&&(n=C({},n)),t.style=s(n));}const c=F(e)?1:(e=>e.__isSuspense)(e)?128:(e=>e.__isTeleport)(e)?64:O(e)?4:A(e)?2:0;return Go(e,t,n,o,r,c,i,!0)};function Jo(e){return e?yt(e)||Wo in e?C({},e):e:null}function Zo(e,t,n=!1){const{props:o,ref:r,patchFlag:s,children:i}=e,l=t?tr(o||{},t):o;return {__v_isVNode:!0,__v_skip:!0,type:e.type,props:l,key:l&&zo(l),ref:t&&t.ref?n&&r?N(r)?r.concat(Ko(t)):[r,Ko(t)]:Ko(t):r,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:i,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Ro?-1===s?16:16|s:s,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Zo(e.ssContent),ssFallback:e.ssFallback&&Zo(e.ssFallback),el:e.el,anchor:e.anchor}}function Qo(e=" ",t=0){return qo(Ao,null,e,t)}function Xo(e){return null==e||"boolean"==typeof e?qo(Fo):N(e)?qo(Ro,null,e.slice()):"object"==typeof e?Yo(e):qo(Ao,null,String(e))}function Yo(e){return null===e.el||e.memo?e:Zo(e)}function er(e,t){let n=0;const{shapeFlag:o}=e;if(null==t)t=null;else if(N(t))n=16;else if("object"==typeof t){if(65&o){const n=t.default;return void(n&&(n._c&&(n._d=!1),er(e,n()),n._c&&(n._d=!0)))}{n=32;const o=t._;o||Wo in t?3===o&&Lt&&(1===Lt.slots._?t._=1:(t._=2,e.patchFlag|=1024)):t._ctx=Lt;}}else A(t)?(t={default:t,_ctx:Lt},n=32):(t=String(t),64&o?(n=16,t=[Qo(t)]):n=8);e.children=t,e.shapeFlag|=n;}function tr(...e){const t={};for(let n=0;n<e.length;n++){const o=e[n];for(const e in o)if("class"===e)t.class!==o.class&&(t.class=a([t.class,o.class]));else if("style"===e)t.style=s([t.style,o.style]);else if(S(e)){const n=t[e],r=o[e];n!==r&&(t[e]=n?[].concat(n,r):r);}else ""!==e&&(t[e]=o[e]);}return t}function nr(e){return e.some((e=>!Ho(e)||e.type!==Fo&&!(e.type===Ro&&!nr(e.children))))?e:null}const or=e=>e?dr(e)?Sr(e)||e.proxy:or(e.parent):null,rr=C(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>or(e.parent),$root:e=>or(e.root),$emit:e=>e.emit,$options:e=>jn(e),$forceUpdate:e=>()=>zr(e.update),$nextTick:e=>Wr.bind(e.proxy),$watch:e=>os.bind(e)}),sr={get({_:e},t){const{ctx:n,setupState:o,data:r,props:s,accessCache:i,type:l,appContext:c}=e;let a;if("$"!==t[0]){const l=i[t];if(void 0!==l)switch(l){case 0:return o[t];case 1:return r[t];case 3:return n[t];case 2:return s[t]}else {if(o!==g&&T(o,t))return i[t]=0,o[t];if(r!==g&&T(r,t))return i[t]=1,r[t];if((a=e.propsOptions[0])&&T(a,t))return i[t]=2,s[t];if(n!==g&&T(n,t))return i[t]=3,n[t];In&&(i[t]=4);}}const u=rr[t];let p,f;return u?("$attrs"===t&&ye(e,0,t),u(e)):(p=l.__cssModules)&&(p=p[t])?p:n!==g&&T(n,t)?(i[t]=3,n[t]):(f=c.config.globalProperties,T(f,t)?f[t]:void 0)},set({_:e},t,n){const{data:o,setupState:r,ctx:s}=e;if(r!==g&&T(r,t))r[t]=n;else if(o!==g&&T(o,t))o[t]=n;else if(T(e.props,t))return !1;return ("$"!==t[0]||!(t.slice(1)in e))&&(s[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:o,appContext:r,propsOptions:s}},i){let l;return void 0!==n[i]||e!==g&&T(e,i)||t!==g&&T(t,i)||(l=s[0])&&T(l,i)||T(o,i)||T(rr,i)||T(r.config.globalProperties,i)}},ir=C({},sr,{get(e,t){if(t!==Symbol.unscopables)return sr.get(e,t,e)},has:(e,t)=>"_"!==t[0]&&!n(t)}),lr=io();let cr=0;let ar=null;const ur=()=>ar||Lt,pr=e=>{ar=e,e.scope.on();},fr=()=>{ar&&ar.scope.off(),ar=null;};function dr(e){return 4&e.vnode.shapeFlag}let hr,mr,gr=!1;function vr(e,t,n){A(t)?e.render=t:O(t)&&(e.setupState=Rt(t)),br(e);}function yr(e){hr=e,mr=e=>{e.render._rc&&(e.withProxy=new Proxy(e.ctx,ir));};}function br(e,t,n){const o=e.type;if(!e.render){if(hr&&!o.render){const t=o.template;if(t){const{isCustomElement:n,compilerOptions:r}=e.appContext.config,{delimiters:s,compilerOptions:i}=o,l=C(C({isCustomElement:n,delimiters:s},r),i);o.render=hr(t,l);}}e.render=o.render||y,mr&&mr(e);}pr(e),ge(),Vn(e),ve(),fr();}function _r(e){const t=t=>{e.exposed=t||{};};let n;return {get attrs(){return n||(n=function(e){return new Proxy(e.attrs,{get:(t,n)=>(ye(e,0,"$attrs"),t[n])})}(e))},slots:e.slots,emit:e.emit,expose:t}}function Sr(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy(Rt(_t(e.exposed)),{get:(t,n)=>n in t?t[n]:n in rr?rr[n](e):void 0}))}const xr=/(?:^|[-_])(\w)/g;function Cr(e){return A(e)&&e.displayName||e.name}function wr(e,t,n=!1){let o=Cr(t);if(!o&&t.__file){const e=t.__file.match(/([^/\\]+)\.\w+$/);e&&(o=e[1]);}if(!o&&e&&e.parent){const n=e=>{for(const n in e)if(e[n]===t)return n};o=n(e.components||e.parent.type.components)||n(e.appContext.components);}return o?o.replace(xr,(e=>e.toUpperCase())).replace(/[-_]/g,""):n?"App":"Anonymous"}const kr=[];function Tr(e){const t=[],n=Object.keys(e);return n.slice(0,3).forEach((n=>{t.push(...Nr(n,e[n]));})),n.length>3&&t.push(" ..."),t}function Nr(e,t,n){return F(t)?(t=JSON.stringify(t),n?t:[`${e}=${t}`]):"number"==typeof t||"boolean"==typeof t||null==t?n?t:[`${e}=${t}`]:wt(t)?(t=Nr(e,bt(t.value),!0),n?t:[`${e}=Ref<`,t,">"]):A(t)?[`${e}=fn${t.name?`<${t.name}>`:""}`]:(t=bt(t),n?t:[`${e}=`,t])}function Er(e,t,n,o){let r;try{r=o?e(...o):e();}catch(s){Rr(s,t,n);}return r}function $r(e,t,n,o){if(A(e)){const r=Er(e,t,n,o);return r&&P(r)&&r.catch((e=>{Rr(e,t,n);})),r}const r=[];for(let s=0;s<e.length;s++)r.push($r(e[s],t,n,o));return r}function Rr(e,t,n,o=!0){if(t){let o=t.parent;const r=t.proxy,s=n;for(;o;){const t=o.ec;if(t)for(let n=0;n<t.length;n++)if(!1===t[n](e,r,s))return;o=o.parent;}const i=t.appContext.config.errorHandler;if(i)return void Er(i,null,10,[e,r,s])}!function(e,t,n,o=!0){console.error(e);}(e,0,0,o);}let Ar=!1,Fr=!1;const Mr=[];let Or=0;const Pr=[];let Ir=null,Vr=0;const Br=[];let Lr=null,jr=0;const Ur=Promise.resolve();let Hr=null,Dr=null;function Wr(e){const t=Hr||Ur;return e?t.then(this?e.bind(this):e):t}function zr(e){Mr.length&&Mr.includes(e,Ar&&e.allowRecurse?Or+1:Or)||e===Dr||(null==e.id?Mr.push(e):Mr.splice(function(e){let t=Or+1,n=Mr.length;for(;t<n;){const o=t+n>>>1;Qr(Mr[o])<e?t=o+1:n=o;}return t}(e.id),0,e),Kr());}function Kr(){Ar||Fr||(Fr=!0,Hr=Ur.then(Xr));}function Gr(e,t,n,o){N(e)?n.push(...e):t&&t.includes(e,e.allowRecurse?o+1:o)||n.push(e),Kr();}function qr(e){Gr(e,Lr,Br,jr);}function Jr(e,t=null){if(Pr.length){for(Dr=t,Ir=[...new Set(Pr)],Pr.length=0,Vr=0;Vr<Ir.length;Vr++)Ir[Vr]();Ir=null,Vr=0,Dr=null,Jr(e,t);}}function Zr(e){if(Br.length){const e=[...new Set(Br)];if(Br.length=0,Lr)return void Lr.push(...e);for(Lr=e,Lr.sort(((e,t)=>Qr(e)-Qr(t))),jr=0;jr<Lr.length;jr++)Lr[jr]();Lr=null,jr=0;}}const Qr=e=>null==e.id?1/0:e.id;function Xr(e){Fr=!1,Ar=!0,Jr(e),Mr.sort(((e,t)=>Qr(e)-Qr(t)));try{for(Or=0;Or<Mr.length;Or++){const e=Mr[Or];e&&!1!==e.active&&Er(e,null,14);}}finally{Or=0,Mr.length=0,Zr(),Ar=!1,Hr=null,(Mr.length||Pr.length||Br.length)&&Xr(e);}}function Yr(e,t){return ns(e,null,{flush:"post"})}const es={};function ts(e,t,n){return ns(e,t,n)}function ns(e,t,{immediate:n,deep:o,flush:r}=g){const s=ar;let i,l,c=!1,a=!1;if(wt(e)?(i=()=>e.value,c=!!e._shallow):gt(e)?(i=()=>e,o=!0):N(e)?(a=!0,c=e.some(gt),i=()=>e.map((e=>wt(e)?e.value:gt(e)?ss(e):A(e)?Er(e,s,2):void 0))):i=A(e)?t?()=>Er(e,s,2):()=>{if(!s||!s.isUnmounted)return l&&l(),$r(e,s,3,[u])}:y,t&&o){const e=i;i=()=>ss(e());}let u=e=>{l=h.onStop=()=>{Er(e,s,4);};},p=a?[]:es;const f=()=>{if(h.active)if(t){const e=h.run();(o||c||(a?e.some(((e,t)=>q(e,p[t]))):q(e,p)))&&(l&&l(),$r(t,s,3,[e,p===es?void 0:p,u]),p=e);}else h.run();};let d;f.allowRecurse=!!t,d="sync"===r?f:"post"===r?()=>ho(f,s&&s.suspense):()=>{!s||s.isMounted?function(e){Gr(e,Ir,Pr,Vr);}(f):f();};const h=new fe(i,d);return t?n?f():p=h.run():"post"===r?ho(h.run.bind(h),s&&s.suspense):h.run(),()=>{h.stop(),s&&s.scope&&w(s.scope.effects,h);}}function os(e,t,n){const o=this.proxy,r=F(e)?e.includes(".")?rs(o,e):()=>o[e]:e.bind(o,o);let s;A(t)?s=t:(s=t.handler,n=t);const i=ar;pr(this);const l=ns(r,s.bind(o),n);return i?pr(i):fr(),l}function rs(e,t){const n=t.split(".");return ()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}function ss(e,t=new Set){if(!O(e)||e.__v_skip)return e;if((t=t||new Set).has(e))return e;if(t.add(e),wt(e))ss(e.value,t);else if(N(e))for(let n=0;n<e.length;n++)ss(e[n],t);else if($(e)||E(e))e.forEach((e=>{ss(e,t);}));else if(B(e))for(const n in e)ss(e[n],t);return e}function is(){const e=ur();return e.setupContext||(e.setupContext=_r(e))}function ls(e,t,n){const o=arguments.length;return 2===o?O(t)&&!N(t)?Ho(t)?qo(e,null,[t]):qo(e,t):qo(e,null,t):(o>3?n=Array.prototype.slice.call(arguments,2):3===o&&Ho(n)&&(n=[n]),qo(e,t,n))}const cs=Symbol("");function as(e,t){const n=e.memo;if(n.length!=t.length)return !1;for(let o=0;o<n.length;o++)if(n[o]!==t[o])return !1;return Bo>0&&Po&&Po.push(e),!0}const us="3.2.12",ps="undefined"!=typeof document?document:null,fs=new Map,ds={insert:(e,t,n)=>{t.insertBefore(e,n||null);},remove:e=>{const t=e.parentNode;t&&t.removeChild(e);},createElement:(e,t,n,o)=>{const r=t?ps.createElementNS("http://www.w3.org/2000/svg",e):ps.createElement(e,n?{is:n}:void 0);return "select"===e&&o&&null!=o.multiple&&r.setAttribute("multiple",o.multiple),r},createText:e=>ps.createTextNode(e),createComment:e=>ps.createComment(e),setText:(e,t)=>{e.nodeValue=t;},setElementText:(e,t)=>{e.textContent=t;},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>ps.querySelector(e),setScopeId(e,t){e.setAttribute(t,"");},cloneNode(e){const t=e.cloneNode(!0);return "_value"in e&&(t._value=e._value),t},insertStaticContent(e,t,n,o){const r=n?n.previousSibling:t.lastChild;let s=fs.get(e);if(!s){const t=ps.createElement("template");if(t.innerHTML=o?`<svg>${e}</svg>`:e,s=t.content,o){const e=s.firstChild;for(;e.firstChild;)s.appendChild(e.firstChild);s.removeChild(e);}fs.set(e,s);}return t.insertBefore(s.cloneNode(!0),n),[r?r.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}};const hs=/\s*!important$/;function ms(e,t,n){if(N(n))n.forEach((n=>ms(e,t,n)));else if(t.startsWith("--"))e.setProperty(t,n);else {const o=function(e,t){const n=vs[t];if(n)return n;let o=D(t);if("filter"!==o&&o in e)return vs[t]=o;o=K(o);for(let r=0;r<gs.length;r++){const n=gs[r]+o;if(n in e)return vs[t]=n}return t}(e,t);hs.test(n)?e.setProperty(z(o),n.replace(hs,""),"important"):e[o]=n;}}const gs=["Webkit","Moz","ms"],vs={};const ys="http://www.w3.org/1999/xlink";let bs=Date.now,_s=!1;if("undefined"!=typeof window){bs()>document.createEvent("Event").timeStamp&&(bs=()=>performance.now());const e=navigator.userAgent.match(/firefox\/(\d+)/i);_s=!!(e&&Number(e[1])<=53);}let Ss=0;const xs=Promise.resolve(),Cs=()=>{Ss=0;};function ws(e,t,n,o){e.addEventListener(t,n,o);}function ks(e,t,n,o,r=null){const s=e._vei||(e._vei={}),i=s[t];if(o&&i)i.value=o;else {const[n,l]=function(e){let t;if(Ts.test(e)){let n;for(t={};n=e.match(Ts);)e=e.slice(0,e.length-n[0].length),t[n[0].toLowerCase()]=!0;}return [z(e.slice(2)),t]}(t);if(o){ws(e,n,s[t]=function(e,t){const n=e=>{const o=e.timeStamp||bs();(_s||o>=n.attached-1)&&$r(function(e,t){if(N(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0;},t.map((e=>t=>!t._stopped&&e(t)))}return t}(e,n.value),t,5,[e]);};return n.value=e,n.attached=(()=>Ss||(xs.then(Cs),Ss=bs()))(),n}(o,r),l);}else i&&(!function(e,t,n,o){e.removeEventListener(t,n,o);}(e,n,i,l),s[t]=void 0);}}const Ts=/(?:Once|Passive|Capture)$/;const Ns=/^on[a-z]/;function Es(e,t){const n=fn(e);class o extends Rs{constructor(e){super(n,e,t);}}return o.def=n,o}const $s="undefined"!=typeof HTMLElement?HTMLElement:class{};class Rs extends $s{constructor(e,t={},n){super(),this._def=e,this._props=t,this._instance=null,this._connected=!1,this._resolved=!1,this._numberProps=null,this.shadowRoot&&n?n(this._createVNode(),this.shadowRoot):this.attachShadow({mode:"open"});for(let o=0;o<this.attributes.length;o++)this._setAttr(this.attributes[o].name);new MutationObserver((e=>{for(const t of e)this._setAttr(t.attributeName);})).observe(this,{attributes:!0});}connectedCallback(){this._connected=!0,this._instance||(this._resolveDef(),this._update());}disconnectedCallback(){this._connected=!1,Wr((()=>{this._connected||(Ti(null,this.shadowRoot),this._instance=null);}));}_resolveDef(){if(this._resolved)return;const e=e=>{this._resolved=!0;const{props:t,styles:n}=e,o=!N(t),r=t?o?Object.keys(t):t:[];let s;if(o)for(const i in this._props){const e=t[i];(e===Number||e&&e.type===Number)&&(this._props[i]=Q(this._props[i]),(s||(s=Object.create(null)))[i]=!0);}s&&(this._numberProps=s,this._update());for(const i of Object.keys(this))"_"!==i[0]&&this._setProp(i,this[i]);for(const i of r.map(D))Object.defineProperty(this,i,{get(){return this._getProp(i)},set(e){this._setProp(i,e);}});this._applyStyles(n);},t=this._def.__asyncLoader;t?t().then(e):e(this._def);}_setAttr(e){let t=this.getAttribute(e);this._numberProps&&this._numberProps[e]&&(t=Q(t)),this._setProp(D(e),t,!1);}_getProp(e){return this._props[e]}_setProp(e,t,n=!0){t!==this._props[e]&&(this._props[e]=t,this._instance&&this._update(),n&&(!0===t?this.setAttribute(z(e),""):"string"==typeof t||"number"==typeof t?this.setAttribute(z(e),t+""):t||this.removeAttribute(z(e))));}_update(){Ti(this._createVNode(),this.shadowRoot);}_createVNode(){const e=qo(this._def,C({},this._props));return this._instance||(e.ce=e=>{this._instance=e,e.isCE=!0,e.emit=(e,...t)=>{this.dispatchEvent(new CustomEvent(e,{detail:t}));};let t=this;for(;t=t&&(t.parentNode||t.host);)if(t instanceof Rs){e.parent=t._instance;break}}),e}_applyStyles(e){e&&e.forEach((e=>{const t=document.createElement("style");t.textContent=e,this.shadowRoot.appendChild(t);}));}}function As(e,t){if(128&e.shapeFlag){const n=e.suspense;e=n.activeBranch,n.pendingBranch&&!n.isHydrating&&n.effects.push((()=>{As(n.activeBranch,t);}));}for(;e.component;)e=e.component.subTree;if(1&e.shapeFlag&&e.el)Fs(e.el,t);else if(e.type===Ro)e.children.forEach((e=>As(e,t)));else if(e.type===Mo){let{el:n,anchor:o}=e;for(;n&&(Fs(n,t),n!==o);)n=n.nextSibling;}}function Fs(e,t){if(1===e.nodeType){const n=e.style;for(const e in t)n.setProperty(`--${e}`,t[e]);}}const Ms="transition",Os="animation",Ps=(e,{slots:t})=>ls(rn,js(e),t);Ps.displayName="Transition";const Is={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},Vs=Ps.props=C({},rn.props,Is),Bs=(e,t=[])=>{N(e)?e.forEach((e=>e(...t))):e&&e(...t);},Ls=e=>!!e&&(N(e)?e.some((e=>e.length>1)):e.length>1);function js(e){const t={};for(const C in e)C in Is||(t[C]=e[C]);if(!1===e.css)return t;const{name:n="v",type:o,duration:r,enterFromClass:s=`${n}-enter-from`,enterActiveClass:i=`${n}-enter-active`,enterToClass:l=`${n}-enter-to`,appearFromClass:c=s,appearActiveClass:a=i,appearToClass:u=l,leaveFromClass:p=`${n}-leave-from`,leaveActiveClass:f=`${n}-leave-active`,leaveToClass:d=`${n}-leave-to`}=e,h=function(e){if(null==e)return null;if(O(e))return [Us(e.enter),Us(e.leave)];{const t=Us(e);return [t,t]}}(r),m=h&&h[0],g=h&&h[1],{onBeforeEnter:v,onEnter:y,onEnterCancelled:b,onLeave:_,onLeaveCancelled:S,onBeforeAppear:x=v,onAppear:w=y,onAppearCancelled:k=b}=t,T=(e,t,n)=>{Ds(e,t?u:l),Ds(e,t?a:i),n&&n();},N=(e,t)=>{Ds(e,d),Ds(e,f),t&&t();},E=e=>(t,n)=>{const r=e?w:y,i=()=>T(t,e,n);Bs(r,[t,i]),Ws((()=>{Ds(t,e?c:s),Hs(t,e?u:l),Ls(r)||Ks(t,o,m,i);}));};return C(t,{onBeforeEnter(e){Bs(v,[e]),Hs(e,s),Hs(e,i);},onBeforeAppear(e){Bs(x,[e]),Hs(e,c),Hs(e,a);},onEnter:E(!1),onAppear:E(!0),onLeave(e,t){const n=()=>N(e,t);Hs(e,p),Zs(),Hs(e,f),Ws((()=>{Ds(e,p),Hs(e,d),Ls(_)||Ks(e,o,g,n);})),Bs(_,[e,n]);},onEnterCancelled(e){T(e,!1),Bs(b,[e]);},onAppearCancelled(e){T(e,!0),Bs(k,[e]);},onLeaveCancelled(e){N(e),Bs(S,[e]);}})}function Us(e){return Q(e)}function Hs(e,t){t.split(/\s+/).forEach((t=>t&&e.classList.add(t))),(e._vtc||(e._vtc=new Set)).add(t);}function Ds(e,t){t.split(/\s+/).forEach((t=>t&&e.classList.remove(t)));const{_vtc:n}=e;n&&(n.delete(t),n.size||(e._vtc=void 0));}function Ws(e){requestAnimationFrame((()=>{requestAnimationFrame(e);}));}let zs=0;function Ks(e,t,n,o){const r=e._endId=++zs,s=()=>{r===e._endId&&o();};if(n)return setTimeout(s,n);const{type:i,timeout:l,propCount:c}=Gs(e,t);if(!i)return o();const a=i+"end";let u=0;const p=()=>{e.removeEventListener(a,f),s();},f=t=>{t.target===e&&++u>=c&&p();};setTimeout((()=>{u<c&&p();}),l+1),e.addEventListener(a,f);}function Gs(e,t){const n=window.getComputedStyle(e),o=e=>(n[e]||"").split(", "),r=o("transitionDelay"),s=o("transitionDuration"),i=qs(r,s),l=o("animationDelay"),c=o("animationDuration"),a=qs(l,c);let u=null,p=0,f=0;t===Ms?i>0&&(u=Ms,p=i,f=s.length):t===Os?a>0&&(u=Os,p=a,f=c.length):(p=Math.max(i,a),u=p>0?i>a?Ms:Os:null,f=u?u===Ms?s.length:c.length:0);return {type:u,timeout:p,propCount:f,hasTransform:u===Ms&&/\b(transform|all)(,|$)/.test(n.transitionProperty)}}function qs(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map(((t,n)=>Js(t)+Js(e[n]))))}function Js(e){return 1e3*Number(e.slice(0,-1).replace(",","."))}function Zs(){return document.body.offsetHeight}const Qs=new WeakMap,Xs=new WeakMap,Ys={name:"TransitionGroup",props:C({},Vs,{tag:String,moveClass:String}),setup(e,{slots:t}){const n=ur(),o=nn();let r,s;return $n((()=>{if(!r.length)return;const t=e.moveClass||`${e.name||"v"}-move`;if(!function(e,t,n){const o=e.cloneNode();e._vtc&&e._vtc.forEach((e=>{e.split(/\s+/).forEach((e=>e&&o.classList.remove(e)));}));n.split(/\s+/).forEach((e=>e&&o.classList.add(e))),o.style.display="none";const r=1===t.nodeType?t:t.parentNode;r.appendChild(o);const{hasTransform:s}=Gs(o);return r.removeChild(o),s}(r[0].el,n.vnode.el,t))return;r.forEach(ei),r.forEach(ti);const o=r.filter(ni);Zs(),o.forEach((e=>{const n=e.el,o=n.style;Hs(n,t),o.transform=o.webkitTransform=o.transitionDuration="";const r=n._moveCb=e=>{e&&e.target!==n||e&&!/transform$/.test(e.propertyName)||(n.removeEventListener("transitionend",r),n._moveCb=null,Ds(n,t));};n.addEventListener("transitionend",r);}));})),()=>{const i=bt(e),l=js(i);let c=i.tag||Ro;r=s,s=t.default?pn(t.default()):[];for(let e=0;e<s.length;e++){const t=s[e];null!=t.key&&un(t,ln(t,l,o,n));}if(r)for(let e=0;e<r.length;e++){const t=r[e];un(t,ln(t,l,o,n)),Qs.set(t,t.el.getBoundingClientRect());}return qo(c,null,s)}}};function ei(e){const t=e.el;t._moveCb&&t._moveCb(),t._enterCb&&t._enterCb();}function ti(e){Xs.set(e,e.el.getBoundingClientRect());}function ni(e){const t=Qs.get(e),n=Xs.get(e),o=t.left-n.left,r=t.top-n.top;if(o||r){const t=e.el.style;return t.transform=t.webkitTransform=`translate(${o}px,${r}px)`,t.transitionDuration="0s",e}}const oi=e=>{const t=e.props["onUpdate:modelValue"];return N(t)?e=>J(t,e):t};function ri(e){e.target.composing=!0;}function si(e){const t=e.target;t.composing&&(t.composing=!1,function(e,t){const n=document.createEvent("HTMLEvents");n.initEvent(t,!0,!0),e.dispatchEvent(n);}(t,"input"));}const ii={created(e,{modifiers:{lazy:t,trim:n,number:o}},r){e._assign=oi(r);const s=o||r.props&&"number"===r.props.type;ws(e,t?"change":"input",(t=>{if(t.target.composing)return;let o=e.value;n?o=o.trim():s&&(o=Q(o)),e._assign(o);})),n&&ws(e,"change",(()=>{e.value=e.value.trim();})),t||(ws(e,"compositionstart",ri),ws(e,"compositionend",si),ws(e,"change",si));},mounted(e,{value:t}){e.value=null==t?"":t;},beforeUpdate(e,{value:t,modifiers:{lazy:n,trim:o,number:r}},s){if(e._assign=oi(s),e.composing)return;if(document.activeElement===e){if(n)return;if(o&&e.value.trim()===t)return;if((r||"number"===e.type)&&Q(e.value)===t)return}const i=null==t?"":t;e.value!==i&&(e.value=i);}},li={deep:!0,created(e,t,n){e._assign=oi(n),ws(e,"change",(()=>{const t=e._modelValue,n=fi(e),o=e.checked,r=e._assign;if(N(t)){const e=h(t,n),s=-1!==e;if(o&&!s)r(t.concat(n));else if(!o&&s){const n=[...t];n.splice(e,1),r(n);}}else if($(t)){const e=new Set(t);o?e.add(n):e.delete(n),r(e);}else r(di(e,o));}));},mounted:ci,beforeUpdate(e,t,n){e._assign=oi(n),ci(e,t,n);}};function ci(e,{value:t,oldValue:n},o){e._modelValue=t,N(t)?e.checked=h(t,o.props.value)>-1:$(t)?e.checked=t.has(o.props.value):t!==n&&(e.checked=d(t,di(e,!0)));}const ai={created(e,{value:t},n){e.checked=d(t,n.props.value),e._assign=oi(n),ws(e,"change",(()=>{e._assign(fi(e));}));},beforeUpdate(e,{value:t,oldValue:n},o){e._assign=oi(o),t!==n&&(e.checked=d(t,o.props.value));}},ui={deep:!0,created(e,{value:t,modifiers:{number:n}},o){const r=$(t);ws(e,"change",(()=>{const t=Array.prototype.filter.call(e.options,(e=>e.selected)).map((e=>n?Q(fi(e)):fi(e)));e._assign(e.multiple?r?new Set(t):t:t[0]);})),e._assign=oi(o);},mounted(e,{value:t}){pi(e,t);},beforeUpdate(e,t,n){e._assign=oi(n);},updated(e,{value:t}){pi(e,t);}};function pi(e,t){const n=e.multiple;if(!n||N(t)||$(t)){for(let o=0,r=e.options.length;o<r;o++){const r=e.options[o],s=fi(r);if(n)r.selected=N(t)?h(t,s)>-1:t.has(s);else if(d(fi(r),t))return void(e.selectedIndex!==o&&(e.selectedIndex=o))}n||-1===e.selectedIndex||(e.selectedIndex=-1);}}function fi(e){return "_value"in e?e._value:e.value}function di(e,t){const n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}const hi={created(e,t,n){mi(e,t,n,null,"created");},mounted(e,t,n){mi(e,t,n,null,"mounted");},beforeUpdate(e,t,n,o){mi(e,t,n,o,"beforeUpdate");},updated(e,t,n,o){mi(e,t,n,o,"updated");}};function mi(e,t,n,o,r){let s;switch(e.tagName){case"SELECT":s=ui;break;case"TEXTAREA":s=ii;break;default:switch(n.props&&n.props.type){case"checkbox":s=li;break;case"radio":s=ai;break;default:s=ii;}}const i=s[r];i&&i(e,t,n,o);}const gi=["ctrl","shift","alt","meta"],vi={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&0!==e.button,middle:e=>"button"in e&&1!==e.button,right:e=>"button"in e&&2!==e.button,exact:(e,t)=>gi.some((n=>e[`${n}Key`]&&!t.includes(n)))},yi={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},bi={beforeMount(e,{value:t},{transition:n}){e._vod="none"===e.style.display?"":e.style.display,n&&t?n.beforeEnter(e):_i(e,t);},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e);},updated(e,{value:t,oldValue:n},{transition:o}){!t!=!n&&(o?t?(o.beforeEnter(e),_i(e,!0),o.enter(e)):o.leave(e,(()=>{_i(e,!1);})):_i(e,t));},beforeUnmount(e,{value:t}){_i(e,t);}};function _i(e,t){e.style.display=t?e._vod:"none";}const Si=C({patchProp:(e,t,n,s,i=!1,l,c,a,u)=>{"class"===t?function(e,t,n){const o=e._vtc;o&&(t=(t?[t,...o]:[...o]).join(" ")),null==t?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t;}(e,s,i):"style"===t?function(e,t,n){const o=e.style,r=o.display;if(n)if(F(n))t!==n&&(o.cssText=n);else {for(const e in n)ms(o,e,n[e]);if(t&&!F(t))for(const e in t)null==n[e]&&ms(o,e,"");}else e.removeAttribute("style");"_vod"in e&&(o.display=r);}(e,n,s):S(t)?x(t)||ks(e,t,0,s,c):("."===t[0]?(t=t.slice(1),1):"^"===t[0]?(t=t.slice(1),0):function(e,t,n,o){if(o)return "innerHTML"===t||"textContent"===t||!!(t in e&&Ns.test(t)&&A(n));if("spellcheck"===t||"draggable"===t)return !1;if("form"===t)return !1;if("list"===t&&"INPUT"===e.tagName)return !1;if("type"===t&&"TEXTAREA"===e.tagName)return !1;if(Ns.test(t)&&F(n))return !1;return t in e}(e,t,s,i))?function(e,t,n,o,s,i,l){if("innerHTML"===t||"textContent"===t)return o&&l(o,s,i),void(e[t]=null==n?"":n);if("value"===t&&"PROGRESS"!==e.tagName){e._value=n;const o=null==n?"":n;return e.value!==o&&(e.value=o),void(null==n&&e.removeAttribute(t))}if(""===n||null==n){const o=typeof e[t];if("boolean"===o)return void(e[t]=r(n));if(null==n&&"string"===o)return e[t]="",void e.removeAttribute(t);if("number"===o){try{e[t]=0;}catch(c){}return void e.removeAttribute(t)}}try{e[t]=n;}catch(a){}}(e,t,s,l,c,a,u):("true-value"===t?e._trueValue=s:"false-value"===t&&(e._falseValue=s),function(e,t,n,s,i){if(s&&t.startsWith("xlink:"))null==n?e.removeAttributeNS(ys,t.slice(6,t.length)):e.setAttributeNS(ys,t,n);else {const s=o(t);null==n||s&&!r(n)?e.removeAttribute(t):e.setAttribute(t,s?"":n);}}(e,t,s,i));}},ds);let xi,Ci=!1;function wi(){return xi||(xi=mo(Si))}function ki(){return xi=Ci?xi:go(Si),Ci=!0,xi}const Ti=(...e)=>{wi().render(...e);},Ni=(...e)=>{ki().hydrate(...e);};function Ei(e){if(F(e)){return document.querySelector(e)}return e}function $i(e){throw e}function Ri(e){}function Ai(e,t,n,o){const r=new SyntaxError(String(e));return r.code=e,r.loc=t,r}const Fi=Symbol(""),Mi=Symbol(""),Oi=Symbol(""),Pi=Symbol(""),Ii=Symbol(""),Vi=Symbol(""),Bi=Symbol(""),Li=Symbol(""),ji=Symbol(""),Ui=Symbol(""),Hi=Symbol(""),Di=Symbol(""),Wi=Symbol(""),zi=Symbol(""),Ki=Symbol(""),Gi=Symbol(""),qi=Symbol(""),Ji=Symbol(""),Zi=Symbol(""),Qi=Symbol(""),Xi=Symbol(""),Yi=Symbol(""),el=Symbol(""),tl=Symbol(""),nl=Symbol(""),ol=Symbol(""),rl=Symbol(""),sl=Symbol(""),il=Symbol(""),ll=Symbol(""),cl=Symbol(""),al=Symbol(""),ul=Symbol(""),pl=Symbol(""),fl=Symbol(""),dl=Symbol(""),hl=Symbol(""),ml=Symbol(""),gl=Symbol(""),vl={[Fi]:"Fragment",[Mi]:"Teleport",[Oi]:"Suspense",[Pi]:"KeepAlive",[Ii]:"BaseTransition",[Vi]:"openBlock",[Bi]:"createBlock",[Li]:"createElementBlock",[ji]:"createVNode",[Ui]:"createElementVNode",[Hi]:"createCommentVNode",[Di]:"createTextVNode",[Wi]:"createStaticVNode",[zi]:"resolveComponent",[Ki]:"resolveDynamicComponent",[Gi]:"resolveDirective",[qi]:"resolveFilter",[Ji]:"withDirectives",[Zi]:"renderList",[Qi]:"renderSlot",[Xi]:"createSlots",[Yi]:"toDisplayString",[el]:"mergeProps",[tl]:"normalizeClass",[nl]:"normalizeStyle",[ol]:"normalizeProps",[rl]:"guardReactiveProps",[sl]:"toHandlers",[il]:"camelize",[ll]:"capitalize",[cl]:"toHandlerKey",[al]:"setBlockTracking",[ul]:"pushScopeId",[pl]:"popScopeId",[fl]:"withCtx",[dl]:"unref",[hl]:"isRef",[ml]:"withMemo",[gl]:"isMemoSame"};const yl={source:"",start:{line:1,column:1,offset:0},end:{line:1,column:1,offset:0}};function bl(e,t,n,o,r,s,i,l=!1,c=!1,a=!1,u=yl){return e&&(l?(e.helper(Vi),e.helper(ql(e.inSSR,a))):e.helper(Gl(e.inSSR,a)),i&&e.helper(Ji)),{type:13,tag:t,props:n,children:o,patchFlag:r,dynamicProps:s,directives:i,isBlock:l,disableTracking:c,isComponent:a,loc:u}}function _l(e,t=yl){return {type:17,loc:t,elements:e}}function Sl(e,t=yl){return {type:15,loc:t,properties:e}}function xl(e,t){return {type:16,loc:yl,key:F(e)?Cl(e,!0):e,value:t}}function Cl(e,t=!1,n=yl,o=0){return {type:4,loc:n,content:e,isStatic:t,constType:t?3:o}}function wl(e,t=yl){return {type:8,loc:t,children:e}}function kl(e,t=[],n=yl){return {type:14,loc:n,callee:e,arguments:t}}function Tl(e,t,n=!1,o=!1,r=yl){return {type:18,params:e,returns:t,newline:n,isSlot:o,loc:r}}function Nl(e,t,n,o=!0){return {type:19,test:e,consequent:t,alternate:n,newline:o,loc:yl}}const El=e=>4===e.type&&e.isStatic,$l=(e,t)=>e===t||e===z(t);function Rl(e){return $l(e,"Teleport")?Mi:$l(e,"Suspense")?Oi:$l(e,"KeepAlive")?Pi:$l(e,"BaseTransition")?Ii:void 0}const Al=/^\d|[^\$\w]/,Fl=e=>!Al.test(e),Ml=/[A-Za-z_$\xA0-\uFFFF]/,Ol=/[\.\?\w$\xA0-\uFFFF]/,Pl=/\s+[.[]\s*|\s*[.[]\s+/g,Il=e=>{e=e.trim().replace(Pl,(e=>e.trim()));let t=0,n=[],o=0,r=0,s=null;for(let i=0;i<e.length;i++){const l=e.charAt(i);switch(t){case 0:if("["===l)n.push(t),t=1,o++;else if("("===l)n.push(t),t=2,r++;else if(!(0===i?Ml:Ol).test(l))return !1;break;case 1:"'"===l||'"'===l||"`"===l?(n.push(t),t=3,s=l):"["===l?o++:"]"===l&&(--o||(t=n.pop()));break;case 2:if("'"===l||'"'===l||"`"===l)n.push(t),t=3,s=l;else if("("===l)r++;else if(")"===l){if(i===e.length-1)return !1;--r||(t=n.pop());}break;case 3:l===s&&(t=n.pop(),s=null);}}return !o&&!r};function Vl(e,t,n){const o={source:e.source.substr(t,n),start:Bl(e.start,e.source,t),end:e.end};return null!=n&&(o.end=Bl(e.start,e.source,t+n)),o}function Bl(e,t,n=t.length){return Ll(C({},e),t,n)}function Ll(e,t,n=t.length){let o=0,r=-1;for(let s=0;s<n;s++)10===t.charCodeAt(s)&&(o++,r=s);return e.offset+=n,e.line+=o,e.column=-1===r?e.column+n:n-r,e}function jl(e,t,n=!1){for(let o=0;o<e.props.length;o++){const r=e.props[o];if(7===r.type&&(n||r.exp)&&(F(t)?r.name===t:t.test(r.name)))return r}}function Ul(e,t,n=!1,o=!1){for(let r=0;r<e.props.length;r++){const s=e.props[r];if(6===s.type){if(n)continue;if(s.name===t&&(s.value||o))return s}else if("bind"===s.name&&(s.exp||o)&&Hl(s.arg,t))return s}}function Hl(e,t){return !(!e||!El(e)||e.content!==t)}function Dl(e){return 5===e.type||2===e.type}function Wl(e){return 7===e.type&&"slot"===e.name}function zl(e){return 1===e.type&&3===e.tagType}function Kl(e){return 1===e.type&&2===e.tagType}function Gl(e,t){return e||t?ji:Ui}function ql(e,t){return e||t?Bi:Li}const Jl=new Set([ol,rl]);function Zl(e,t=[]){if(e&&!F(e)&&14===e.type){const n=e.callee;if(!F(n)&&Jl.has(n))return Zl(e.arguments[0],t.concat(e))}return [e,t]}function Ql(e,t,n){let o;let r,s=13===e.type?e.props:e.arguments[2],i=[];if(s&&!F(s)&&14===s.type){const e=Zl(s);s=e[0],i=e[1],r=i[i.length-1];}if(null==s||F(s))o=Sl([t]);else if(14===s.type){const e=s.arguments[0];F(e)||15!==e.type?s.callee===sl?o=kl(n.helper(el),[Sl([t]),s]):s.arguments.unshift(Sl([t])):e.properties.unshift(t),!o&&(o=s);}else if(15===s.type){let e=!1;if(4===t.key.type){const n=t.key.content;e=s.properties.some((e=>4===e.key.type&&e.key.content===n));}e||s.properties.unshift(t),o=s;}else o=kl(n.helper(el),[Sl([t]),s]),r&&r.callee===rl&&(r=i[i.length-2]);13===e.type?r?r.arguments[0]=o:e.props=o:r?r.arguments[0]=o:e.arguments[2]=o;}function Xl(e,t){return `_${t}_${e.replace(/[^\w]/g,((t,n)=>"-"===t?"_":e.charCodeAt(n).toString()))}`}function Yl(e,{helper:t,removeHelper:n,inSSR:o}){e.isBlock||(e.isBlock=!0,n(Gl(o,e.isComponent)),t(Vi),t(ql(o,e.isComponent)));}const ec=/&(gt|lt|amp|apos|quot);/g,tc={gt:">",lt:"<",amp:"&",apos:"'",quot:'"'},nc={delimiters:["{{","}}"],getNamespace:()=>0,getTextMode:()=>0,isVoidTag:b,isPreTag:b,isCustomElement:b,decodeEntities:e=>e.replace(ec,((e,t)=>tc[t])),onError:$i,onWarn:Ri,comments:!1};function oc(e,t={}){const n=function(e,t){const n=C({},nc);let o;for(o in t)n[o]=void 0===t[o]?nc[o]:t[o];return {options:n,column:1,line:1,offset:0,originalSource:e,source:e,inPre:!1,inVPre:!1,onWarn:n.onWarn}}(e,t),o=vc(n);return function(e,t=yl){return {type:0,children:e,helpers:[],components:[],directives:[],hoists:[],imports:[],cached:0,temps:0,codegenNode:void 0,loc:t}}(rc(n,0,[]),yc(n,o))}function rc(e,t,n){const o=bc(n),r=o?o.ns:0,s=[];for(;!wc(e,t,n);){const i=e.source;let l;if(0===t||1===t)if(!e.inVPre&&_c(i,e.options.delimiters[0]))l=hc(e,t);else if(0===t&&"<"===i[0])if(1===i.length);else if("!"===i[1])l=_c(i,"\x3c!--")?lc(e):_c(i,"<!DOCTYPE")?cc(e):_c(i,"<![CDATA[")&&0!==r?ic(e,n):cc(e);else if("/"===i[1])if(2===i.length);else {if(">"===i[2]){Sc(e,3);continue}if(/[a-z]/i.test(i[2])){pc(e,1,o);continue}l=cc(e);}else /[a-z]/i.test(i[1])?l=ac(e,n):"?"===i[1]&&(l=cc(e));if(l||(l=mc(e,t)),N(l))for(let e=0;e<l.length;e++)sc(s,l[e]);else sc(s,l);}let i=!1;if(2!==t&&1!==t){const t="preserve"!==e.options.whitespace;for(let n=0;n<s.length;n++){const o=s[n];if(e.inPre||2!==o.type)3!==o.type||e.options.comments||(i=!0,s[n]=null);else if(/[^\t\r\n\f ]/.test(o.content))t&&(o.content=o.content.replace(/[\t\r\n\f ]+/g," "));else {const e=s[n-1],r=s[n+1];!e||!r||t&&(3===e.type||3===r.type||1===e.type&&1===r.type&&/[\r\n]/.test(o.content))?(i=!0,s[n]=null):o.content=" ";}}if(e.inPre&&o&&e.options.isPreTag(o.tag)){const e=s[0];e&&2===e.type&&(e.content=e.content.replace(/^\r?\n/,""));}}return i?s.filter(Boolean):s}function sc(e,t){if(2===t.type){const n=bc(e);if(n&&2===n.type&&n.loc.end.offset===t.loc.start.offset)return n.content+=t.content,n.loc.end=t.loc.end,void(n.loc.source+=t.loc.source)}e.push(t);}function ic(e,t){Sc(e,9);const n=rc(e,3,t);return 0===e.source.length||Sc(e,3),n}function lc(e){const t=vc(e);let n;const o=/--(\!)?>/.exec(e.source);if(o){n=e.source.slice(4,o.index);const t=e.source.slice(0,o.index);let r=1,s=0;for(;-1!==(s=t.indexOf("\x3c!--",r));)Sc(e,s-r+1),r=s+1;Sc(e,o.index+o[0].length-r+1);}else n=e.source.slice(4),Sc(e,e.source.length);return {type:3,content:n,loc:yc(e,t)}}function cc(e){const t=vc(e),n="?"===e.source[1]?1:2;let o;const r=e.source.indexOf(">");return -1===r?(o=e.source.slice(n),Sc(e,e.source.length)):(o=e.source.slice(n,r),Sc(e,r+1)),{type:3,content:o,loc:yc(e,t)}}function ac(e,t){const n=e.inPre,o=e.inVPre,r=bc(t),s=pc(e,0,r),i=e.inPre&&!n,l=e.inVPre&&!o;if(s.isSelfClosing||e.options.isVoidTag(s.tag))return i&&(e.inPre=!1),l&&(e.inVPre=!1),s;t.push(s);const c=e.options.getTextMode(s,r),a=rc(e,c,t);if(t.pop(),s.children=a,kc(e.source,s.tag))pc(e,1,r);else if(0===e.source.length&&"script"===s.tag.toLowerCase()){const e=a[0];e&&_c(e.loc.source,"\x3c!--");}return s.loc=yc(e,s.loc.start),i&&(e.inPre=!1),l&&(e.inVPre=!1),s}const uc=t("if,else,else-if,for,slot");function pc(e,t,n){const o=vc(e),r=/^<\/?([a-z][^\t\r\n\f />]*)/i.exec(e.source),s=r[1],i=e.options.getNamespace(s,n);Sc(e,r[0].length),xc(e);const l=vc(e),c=e.source;e.options.isPreTag(s)&&(e.inPre=!0);let a=fc(e,t);0===t&&!e.inVPre&&a.some((e=>7===e.type&&"pre"===e.name))&&(e.inVPre=!0,C(e,l),e.source=c,a=fc(e,t).filter((e=>"v-pre"!==e.name)));let u=!1;if(0===e.source.length||(u=_c(e.source,"/>"),Sc(e,u?2:1)),1===t)return;let p=0;return e.inVPre||("slot"===s?p=2:"template"===s?a.some((e=>7===e.type&&uc(e.name)))&&(p=3):function(e,t,n){const o=n.options;if(o.isCustomElement(e))return !1;if("component"===e||/^[A-Z]/.test(e)||Rl(e)||o.isBuiltInComponent&&o.isBuiltInComponent(e)||o.isNativeTag&&!o.isNativeTag(e))return !0;for(let r=0;r<t.length;r++){const e=t[r];if(6===e.type){if("is"===e.name&&e.value&&e.value.content.startsWith("vue:"))return !0}else {if("is"===e.name)return !0;"bind"===e.name&&Hl(e.arg,"is");}}}(s,a,e)&&(p=1)),{type:1,ns:i,tag:s,tagType:p,props:a,isSelfClosing:u,children:[],loc:yc(e,o),codegenNode:void 0}}function fc(e,t){const n=[],o=new Set;for(;e.source.length>0&&!_c(e.source,">")&&!_c(e.source,"/>");){if(_c(e.source,"/")){Sc(e,1),xc(e);continue}const r=dc(e,o);6===r.type&&r.value&&"class"===r.name&&(r.value.content=r.value.content.replace(/\s+/g," ").trim()),0===t&&n.push(r),/^[^\t\r\n\f />]/.test(e.source),xc(e);}return n}function dc(e,t){const n=vc(e),o=/^[^\t\r\n\f />][^\t\r\n\f />=]*/.exec(e.source)[0];t.has(o),t.add(o);{const e=/["'<]/g;for(;e.exec(o););}let r;Sc(e,o.length),/^[\t\r\n\f ]*=/.test(e.source)&&(xc(e),Sc(e,1),xc(e),r=function(e){const t=vc(e);let n;const o=e.source[0],r='"'===o||"'"===o;if(r){Sc(e,1);const t=e.source.indexOf(o);-1===t?n=gc(e,e.source.length,4):(n=gc(e,t,4),Sc(e,1));}else {const t=/^[^\t\r\n\f >]+/.exec(e.source);if(!t)return;const o=/["'<=`]/g;for(;o.exec(t[0]););n=gc(e,t[0].length,4);}return {content:n,isQuoted:r,loc:yc(e,t)}}(e));const s=yc(e,n);if(!e.inVPre&&/^(v-[A-Za-z0-9-]|:|\.|@|#)/.test(o)){const t=/(?:^v-([a-z0-9-]+))?(?:(?::|^\.|^@|^#)(\[[^\]]+\]|[^\.]+))?(.+)?$/i.exec(o);let i,l=_c(o,"."),c=t[1]||(l||_c(o,":")?"bind":_c(o,"@")?"on":"slot");if(t[2]){const r="slot"===c,s=o.lastIndexOf(t[2]),l=yc(e,Cc(e,n,s),Cc(e,n,s+t[2].length+(r&&t[3]||"").length));let a=t[2],u=!0;a.startsWith("[")?(u=!1,a=a.endsWith("]")?a.substr(1,a.length-2):a.substr(1)):r&&(a+=t[3]||""),i={type:4,content:a,isStatic:u,constType:u?3:0,loc:l};}if(r&&r.isQuoted){const e=r.loc;e.start.offset++,e.start.column++,e.end=Bl(e.start,r.content),e.source=e.source.slice(1,-1);}const a=t[3]?t[3].substr(1).split("."):[];return l&&a.push("prop"),{type:7,name:c,exp:r&&{type:4,content:r.content,isStatic:!1,constType:0,loc:r.loc},arg:i,modifiers:a,loc:s}}return !e.inVPre&&_c(o,"v-"),{type:6,name:o,value:r&&{type:2,content:r.content,loc:r.loc},loc:s}}function hc(e,t){const[n,o]=e.options.delimiters,r=e.source.indexOf(o,n.length);if(-1===r)return;const s=vc(e);Sc(e,n.length);const i=vc(e),l=vc(e),c=r-n.length,a=e.source.slice(0,c),u=gc(e,c,t),p=u.trim(),f=u.indexOf(p);f>0&&Ll(i,a,f);return Ll(l,a,c-(u.length-p.length-f)),Sc(e,o.length),{type:5,content:{type:4,isStatic:!1,constType:0,content:p,loc:yc(e,i,l)},loc:yc(e,s)}}function mc(e,t){const n=3===t?["]]>"]:["<",e.options.delimiters[0]];let o=e.source.length;for(let s=0;s<n.length;s++){const t=e.source.indexOf(n[s],1);-1!==t&&o>t&&(o=t);}const r=vc(e);return {type:2,content:gc(e,o,t),loc:yc(e,r)}}function gc(e,t,n){const o=e.source.slice(0,t);return Sc(e,t),2===n||3===n||-1===o.indexOf("&")?o:e.options.decodeEntities(o,4===n)}function vc(e){const{column:t,line:n,offset:o}=e;return {column:t,line:n,offset:o}}function yc(e,t,n){return {start:t,end:n=n||vc(e),source:e.originalSource.slice(t.offset,n.offset)}}function bc(e){return e[e.length-1]}function _c(e,t){return e.startsWith(t)}function Sc(e,t){const{source:n}=e;Ll(e,n,t),e.source=n.slice(t);}function xc(e){const t=/^[\t\r\n\f ]+/.exec(e.source);t&&Sc(e,t[0].length);}function Cc(e,t,n){return Bl(t,e.originalSource.slice(t.offset,n),n)}function wc(e,t,n){const o=e.source;switch(t){case 0:if(_c(o,"</"))for(let e=n.length-1;e>=0;--e)if(kc(o,n[e].tag))return !0;break;case 1:case 2:{const e=bc(n);if(e&&kc(o,e.tag))return !0;break}case 3:if(_c(o,"]]>"))return !0}return !o}function kc(e,t){return _c(e,"</")&&e.substr(2,t.length).toLowerCase()===t.toLowerCase()&&/[\t\r\n\f />]/.test(e[2+t.length]||">")}function Tc(e,t){Ec(e,t,Nc(e,e.children[0]));}function Nc(e,t){const{children:n}=e;return 1===n.length&&1===t.type&&!Kl(t)}function Ec(e,t,n=!1){let o=!0;const{children:r}=e,s=r.length;let i=0;for(let l=0;l<r.length;l++){const e=r[l];if(1===e.type&&0===e.tagType){const r=n?0:$c(e,t);if(r>0){if(r<3&&(o=!1),r>=2){e.codegenNode.patchFlag="-1",e.codegenNode=t.hoist(e.codegenNode),i++;continue}}else {const n=e.codegenNode;if(13===n.type){const o=Oc(n);if((!o||512===o||1===o)&&Fc(e,t)>=2){const o=Mc(e);o&&(n.props=t.hoist(o));}n.dynamicProps&&(n.dynamicProps=t.hoist(n.dynamicProps));}}}else if(12===e.type){const n=$c(e.content,t);n>0&&(n<3&&(o=!1),n>=2&&(e.codegenNode=t.hoist(e.codegenNode),i++));}if(1===e.type){const n=1===e.tagType;n&&t.scopes.vSlot++,Ec(e,t),n&&t.scopes.vSlot--;}else if(11===e.type)Ec(e,t,1===e.children.length);else if(9===e.type)for(let n=0;n<e.branches.length;n++)Ec(e.branches[n],t,1===e.branches[n].children.length);}o&&i&&t.transformHoist&&t.transformHoist(r,t,e),i&&i===s&&1===e.type&&0===e.tagType&&e.codegenNode&&13===e.codegenNode.type&&N(e.codegenNode.children)&&(e.codegenNode.children=t.hoist(_l(e.codegenNode.children)));}function $c(e,t){const{constantCache:n}=t;switch(e.type){case 1:if(0!==e.tagType)return 0;const o=n.get(e);if(void 0!==o)return o;const r=e.codegenNode;if(13!==r.type)return 0;if(Oc(r))return n.set(e,0),0;{let o=3;const s=Fc(e,t);if(0===s)return n.set(e,0),0;s<o&&(o=s);for(let r=0;r<e.children.length;r++){const s=$c(e.children[r],t);if(0===s)return n.set(e,0),0;s<o&&(o=s);}if(o>1)for(let r=0;r<e.props.length;r++){const s=e.props[r];if(7===s.type&&"bind"===s.name&&s.exp){const r=$c(s.exp,t);if(0===r)return n.set(e,0),0;r<o&&(o=r);}}return r.isBlock&&(t.removeHelper(Vi),t.removeHelper(ql(t.inSSR,r.isComponent)),r.isBlock=!1,t.helper(Gl(t.inSSR,r.isComponent))),n.set(e,o),o}case 2:case 3:return 3;case 9:case 11:case 10:return 0;case 5:case 12:return $c(e.content,t);case 4:return e.constType;case 8:let s=3;for(let n=0;n<e.children.length;n++){const o=e.children[n];if(F(o)||M(o))continue;const r=$c(o,t);if(0===r)return 0;r<s&&(s=r);}return s;default:return 0}}const Rc=new Set([tl,nl,ol,rl]);function Ac(e,t){if(14===e.type&&!F(e.callee)&&Rc.has(e.callee)){const n=e.arguments[0];if(4===n.type)return $c(n,t);if(14===n.type)return Ac(n,t)}return 0}function Fc(e,t){let n=3;const o=Mc(e);if(o&&15===o.type){const{properties:e}=o;for(let o=0;o<e.length;o++){const{key:r,value:s}=e[o],i=$c(r,t);if(0===i)return i;let l;if(i<n&&(n=i),l=4===s.type?$c(s,t):14===s.type?Ac(s,t):0,0===l)return l;l<n&&(n=l);}}return n}function Mc(e){const t=e.codegenNode;if(13===t.type)return t.props}function Oc(e){const t=e.patchFlag;return t?parseInt(t,10):void 0}function Pc(e,{filename:t="",prefixIdentifiers:n=!1,hoistStatic:o=!1,cacheHandlers:r=!1,nodeTransforms:s=[],directiveTransforms:i={},transformHoist:l=null,isBuiltInComponent:c=y,isCustomElement:a=y,expressionPlugins:u=[],scopeId:p=null,slotted:f=!0,ssr:d=!1,inSSR:h=!1,ssrCssVars:m="",bindingMetadata:v=g,inline:b=!1,isTS:_=!1,onError:S=$i,onWarn:x=Ri,compatConfig:C}){const w=t.replace(/\?.*$/,"").match(/([^/\\]+)\.\w+$/),k={selfName:w&&K(D(w[1])),prefixIdentifiers:n,hoistStatic:o,cacheHandlers:r,nodeTransforms:s,directiveTransforms:i,transformHoist:l,isBuiltInComponent:c,isCustomElement:a,expressionPlugins:u,scopeId:p,slotted:f,ssr:d,inSSR:h,ssrCssVars:m,bindingMetadata:v,inline:b,isTS:_,onError:S,onWarn:x,compatConfig:C,root:e,helpers:new Map,components:new Set,directives:new Set,hoists:[],imports:[],constantCache:new Map,temps:0,cached:0,identifiers:Object.create(null),scopes:{vFor:0,vSlot:0,vPre:0,vOnce:0},parent:null,currentNode:e,childIndex:0,inVOnce:!1,helper(e){const t=k.helpers.get(e)||0;return k.helpers.set(e,t+1),e},removeHelper(e){const t=k.helpers.get(e);if(t){const n=t-1;n?k.helpers.set(e,n):k.helpers.delete(e);}},helperString:e=>`_${vl[k.helper(e)]}`,replaceNode(e){k.parent.children[k.childIndex]=k.currentNode=e;},removeNode(e){const t=e?k.parent.children.indexOf(e):k.currentNode?k.childIndex:-1;e&&e!==k.currentNode?k.childIndex>t&&(k.childIndex--,k.onNodeRemoved()):(k.currentNode=null,k.onNodeRemoved()),k.parent.children.splice(t,1);},onNodeRemoved:()=>{},addIdentifiers(e){},removeIdentifiers(e){},hoist(e){F(e)&&(e=Cl(e)),k.hoists.push(e);const t=Cl(`_hoisted_${k.hoists.length}`,!1,e.loc,2);return t.hoisted=e,t},cache:(e,t=!1)=>function(e,t,n=!1){return {type:20,index:e,value:t,isVNode:n,loc:yl}}(k.cached++,e,t)};return k}function Ic(e,t){const n=Pc(e,t);Vc(e,n),t.hoistStatic&&Tc(e,n),t.ssr||function(e,t){const{helper:n}=t,{children:o}=e;if(1===o.length){const n=o[0];if(Nc(e,n)&&n.codegenNode){const o=n.codegenNode;13===o.type&&Yl(o,t),e.codegenNode=o;}else e.codegenNode=n;}else if(o.length>1){let o=64;e.codegenNode=bl(t,n(Fi),void 0,e.children,o+"",void 0,void 0,!0,void 0,!1);}}(e,n),e.helpers=[...n.helpers.keys()],e.components=[...n.components],e.directives=[...n.directives],e.imports=n.imports,e.hoists=n.hoists,e.temps=n.temps,e.cached=n.cached;}function Vc(e,t){t.currentNode=e;const{nodeTransforms:n}=t,o=[];for(let s=0;s<n.length;s++){const r=n[s](e,t);if(r&&(N(r)?o.push(...r):o.push(r)),!t.currentNode)return;e=t.currentNode;}switch(e.type){case 3:t.ssr||t.helper(Hi);break;case 5:t.ssr||t.helper(Yi);break;case 9:for(let n=0;n<e.branches.length;n++)Vc(e.branches[n],t);break;case 10:case 11:case 1:case 0:!function(e,t){let n=0;const o=()=>{n--;};for(;n<e.children.length;n++){const r=e.children[n];F(r)||(t.parent=e,t.childIndex=n,t.onNodeRemoved=o,Vc(r,t));}}(e,t);}t.currentNode=e;let r=o.length;for(;r--;)o[r]();}function Bc(e,t){const n=F(e)?t=>t===e:t=>e.test(t);return (e,o)=>{if(1===e.type){const{props:r}=e;if(3===e.tagType&&r.some(Wl))return;const s=[];for(let i=0;i<r.length;i++){const l=r[i];if(7===l.type&&n(l.name)){r.splice(i,1),i--;const n=t(e,l,o);n&&s.push(n);}}return s}}}const Lc="/*#__PURE__*/";function jc(e,t={}){const n=function(e,{mode:t="function",prefixIdentifiers:n="module"===t,sourceMap:o=!1,filename:r="template.vue.html",scopeId:s=null,optimizeImports:i=!1,runtimeGlobalName:l="Vue",runtimeModuleName:c="vue",ssr:a=!1,isTS:u=!1,inSSR:p=!1}){const f={mode:t,prefixIdentifiers:n,sourceMap:o,filename:r,scopeId:s,optimizeImports:i,runtimeGlobalName:l,runtimeModuleName:c,ssr:a,isTS:u,inSSR:p,source:e.loc.source,code:"",column:1,line:1,offset:0,indentLevel:0,pure:!1,map:void 0,helper:e=>`_${vl[e]}`,push(e,t){f.code+=e;},indent(){d(++f.indentLevel);},deindent(e=!1){e?--f.indentLevel:d(--f.indentLevel);},newline(){d(f.indentLevel);}};function d(e){f.push("\n"+"  ".repeat(e));}return f}(e,t);t.onContextCreated&&t.onContextCreated(n);const{mode:o,push:r,prefixIdentifiers:s,indent:i,deindent:l,newline:c,ssr:a}=n,u=e.helpers.length>0,p=!s&&"module"!==o;!function(e,t){const{push:n,newline:o,runtimeGlobalName:r}=t,s=r,i=e=>`${vl[e]}: _${vl[e]}`;if(e.helpers.length>0&&(n(`const _Vue = ${s}\n`),e.hoists.length)){n(`const { ${[ji,Ui,Hi,Di,Wi].filter((t=>e.helpers.includes(t))).map(i).join(", ")} } = _Vue\n`);}(function(e,t){if(!e.length)return;t.pure=!0;const{push:n,newline:o}=t;o(),e.forEach(((e,r)=>{e&&(n(`const _hoisted_${r+1} = `),Wc(e,t),o());})),t.pure=!1;})(e.hoists,t),o(),n("return ");}(e,n);if(r(`function ${a?"ssrRender":"render"}(${(a?["_ctx","_push","_parent","_attrs"]:["_ctx","_cache"]).join(", ")}) {`),i(),p&&(r("with (_ctx) {"),i(),u&&(r(`const { ${e.helpers.map((e=>`${vl[e]}: _${vl[e]}`)).join(", ")} } = _Vue`),r("\n"),c())),e.components.length&&(Uc(e.components,"component",n),(e.directives.length||e.temps>0)&&c()),e.directives.length&&(Uc(e.directives,"directive",n),e.temps>0&&c()),e.temps>0){r("let ");for(let t=0;t<e.temps;t++)r(`${t>0?", ":""}_temp${t}`);}return (e.components.length||e.directives.length||e.temps)&&(r("\n"),c()),a||r("return "),e.codegenNode?Wc(e.codegenNode,n):r("null"),p&&(l(),r("}")),l(),r("}"),{ast:e,code:n.code,preamble:"",map:n.map?n.map.toJSON():void 0}}function Uc(e,t,{helper:n,push:o,newline:r,isTS:s}){const i=n("component"===t?zi:Gi);for(let l=0;l<e.length;l++){let n=e[l];const c=n.endsWith("__self");c&&(n=n.slice(0,-6)),o(`const ${Xl(n,t)} = ${i}(${JSON.stringify(n)}${c?", true":""})${s?"!":""}`),l<e.length-1&&r();}}function Hc(e,t){const n=e.length>3||!1;t.push("["),n&&t.indent(),Dc(e,t,n),n&&t.deindent(),t.push("]");}function Dc(e,t,n=!1,o=!0){const{push:r,newline:s}=t;for(let i=0;i<e.length;i++){const l=e[i];F(l)?r(l):N(l)?Hc(l,t):Wc(l,t),i<e.length-1&&(n?(o&&r(","),s()):o&&r(", "));}}function Wc(e,t){if(F(e))t.push(e);else if(M(e))t.push(t.helper(e));else switch(e.type){case 1:case 9:case 11:Wc(e.codegenNode,t);break;case 2:!function(e,t){t.push(JSON.stringify(e.content),e);}(e,t);break;case 4:zc(e,t);break;case 5:!function(e,t){const{push:n,helper:o,pure:r}=t;r&&n(Lc);n(`${o(Yi)}(`),Wc(e.content,t),n(")");}(e,t);break;case 12:Wc(e.codegenNode,t);break;case 8:Kc(e,t);break;case 3:!function(e,t){const{push:n,helper:o,pure:r}=t;r&&n(Lc);n(`${o(Hi)}(${JSON.stringify(e.content)})`,e);}(e,t);break;case 13:!function(e,t){const{push:n,helper:o,pure:r}=t,{tag:s,props:i,children:l,patchFlag:c,dynamicProps:a,directives:u,isBlock:p,disableTracking:f,isComponent:d}=e;u&&n(o(Ji)+"(");p&&n(`(${o(Vi)}(${f?"true":""}), `);r&&n(Lc);const h=p?ql(t.inSSR,d):Gl(t.inSSR,d);n(o(h)+"(",e),Dc(function(e){let t=e.length;for(;t--&&null==e[t];);return e.slice(0,t+1).map((e=>e||"null"))}([s,i,l,c,a]),t),n(")"),p&&n(")");u&&(n(", "),Wc(u,t),n(")"));}(e,t);break;case 14:!function(e,t){const{push:n,helper:o,pure:r}=t,s=F(e.callee)?e.callee:o(e.callee);r&&n(Lc);n(s+"(",e),Dc(e.arguments,t),n(")");}(e,t);break;case 15:!function(e,t){const{push:n,indent:o,deindent:r,newline:s}=t,{properties:i}=e;if(!i.length)return void n("{}",e);const l=i.length>1||!1;n(l?"{":"{ "),l&&o();for(let c=0;c<i.length;c++){const{key:e,value:o}=i[c];Gc(e,t),n(": "),Wc(o,t),c<i.length-1&&(n(","),s());}l&&r(),n(l?"}":" }");}(e,t);break;case 17:!function(e,t){Hc(e.elements,t);}(e,t);break;case 18:!function(e,t){const{push:n,indent:o,deindent:r}=t,{params:s,returns:i,body:l,newline:c,isSlot:a}=e;a&&n(`_${vl[fl]}(`);n("(",e),N(s)?Dc(s,t):s&&Wc(s,t);n(") => "),(c||l)&&(n("{"),o());i?(c&&n("return "),N(i)?Hc(i,t):Wc(i,t)):l&&Wc(l,t);(c||l)&&(r(),n("}"));a&&n(")");}(e,t);break;case 19:!function(e,t){const{test:n,consequent:o,alternate:r,newline:s}=e,{push:i,indent:l,deindent:c,newline:a}=t;if(4===n.type){const e=!Fl(n.content);e&&i("("),zc(n,t),e&&i(")");}else i("("),Wc(n,t),i(")");s&&l(),t.indentLevel++,s||i(" "),i("? "),Wc(o,t),t.indentLevel--,s&&a(),s||i(" "),i(": ");const u=19===r.type;u||t.indentLevel++;Wc(r,t),u||t.indentLevel--;s&&c(!0);}(e,t);break;case 20:!function(e,t){const{push:n,helper:o,indent:r,deindent:s,newline:i}=t;n(`_cache[${e.index}] || (`),e.isVNode&&(r(),n(`${o(al)}(-1),`),i());n(`_cache[${e.index}] = `),Wc(e.value,t),e.isVNode&&(n(","),i(),n(`${o(al)}(1),`),i(),n(`_cache[${e.index}]`),s());n(")");}(e,t);break;case 21:Dc(e.body,t,!0,!1);}}function zc(e,t){const{content:n,isStatic:o}=e;t.push(o?JSON.stringify(n):n,e);}function Kc(e,t){for(let n=0;n<e.children.length;n++){const o=e.children[n];F(o)?t.push(o):Wc(o,t);}}function Gc(e,t){const{push:n}=t;if(8===e.type)n("["),Kc(e,t),n("]");else if(e.isStatic){n(Fl(e.content)?e.content:JSON.stringify(e.content),e);}else n(`[${e.content}]`,e);}const qc=Bc(/^(if|else|else-if)$/,((e,t,n)=>function(e,t,n,o){if(!("else"===t.name||t.exp&&t.exp.content.trim())){t.exp=Cl("true",!1,t.exp?t.exp.loc:e.loc);}if("if"===t.name){const r=Jc(e,t),s={type:9,loc:e.loc,branches:[r]};if(n.replaceNode(s),o)return o(s,r,!0)}else {const r=n.parent.children;let s=r.indexOf(e);for(;s-- >=-1;){const i=r[s];if(!i||2!==i.type||i.content.trim().length){if(i&&9===i.type){n.removeNode();const r=Jc(e,t);i.branches.push(r);const s=o&&o(i,r,!1);Vc(r,n),s&&s(),n.currentNode=null;}break}n.removeNode(i);}}}(e,t,n,((e,t,o)=>{const r=n.parent.children;let s=r.indexOf(e),i=0;for(;s-- >=0;){const e=r[s];e&&9===e.type&&(i+=e.branches.length);}return ()=>{if(o)e.codegenNode=Zc(t,i,n);else {(function(e){for(;;)if(19===e.type){if(19!==e.alternate.type)return e;e=e.alternate;}else 20===e.type&&(e=e.value);}(e.codegenNode)).alternate=Zc(t,i+e.branches.length-1,n);}}}))));function Jc(e,t){return {type:10,loc:e.loc,condition:"else"===t.name?void 0:t.exp,children:3!==e.tagType||jl(e,"for")?[e]:e.children,userKey:Ul(e,"key")}}function Zc(e,t,n){return e.condition?Nl(e.condition,Qc(e,t,n),kl(n.helper(Hi),['""',"true"])):Qc(e,t,n)}function Qc(e,t,n){const{helper:o}=n,r=xl("key",Cl(`${t}`,!1,yl,2)),{children:s}=e,i=s[0];if(1!==s.length||1!==i.type){if(1===s.length&&11===i.type){const e=i.codegenNode;return Ql(e,r,n),e}{let t=64;return bl(n,o(Fi),Sl([r]),s,t+"",void 0,void 0,!0,!1,!1,e.loc)}}{const e=i.codegenNode,t=14===(l=e).type&&l.callee===ml?l.arguments[1].returns:l;return 13===t.type&&Yl(t,n),Ql(t,r,n),e}var l;}const Xc=Bc("for",((e,t,n)=>{const{helper:o,removeHelper:r}=n;return function(e,t,n,o){if(!t.exp)return;const r=na(t.exp);if(!r)return;const{scopes:s}=n,{source:i,value:l,key:c,index:a}=r,u={type:11,loc:t.loc,source:i,valueAlias:l,keyAlias:c,objectIndexAlias:a,parseResult:r,children:zl(e)?e.children:[e]};n.replaceNode(u),s.vFor++;const p=o&&o(u);return ()=>{s.vFor--,p&&p();}}(e,t,n,(t=>{const s=kl(o(Zi),[t.source]),i=jl(e,"memo"),l=Ul(e,"key"),c=l&&(6===l.type?Cl(l.value.content,!0):l.exp),a=l?xl("key",c):null,u=4===t.source.type&&t.source.constType>0,p=u?64:l?128:256;return t.codegenNode=bl(n,o(Fi),void 0,s,p+"",void 0,void 0,!0,!u,!1,e.loc),()=>{let l;const p=zl(e),{children:f}=t,d=1!==f.length||1!==f[0].type,h=Kl(e)?e:p&&1===e.children.length&&Kl(e.children[0])?e.children[0]:null;if(h?(l=h.codegenNode,p&&a&&Ql(l,a,n)):d?l=bl(n,o(Fi),a?Sl([a]):void 0,e.children,"64",void 0,void 0,!0,void 0,!1):(l=f[0].codegenNode,p&&a&&Ql(l,a,n),l.isBlock!==!u&&(l.isBlock?(r(Vi),r(ql(n.inSSR,l.isComponent))):r(Gl(n.inSSR,l.isComponent))),l.isBlock=!u,l.isBlock?(o(Vi),o(ql(n.inSSR,l.isComponent))):o(Gl(n.inSSR,l.isComponent))),i){const e=Tl(ra(t.parseResult,[Cl("_cached")]));e.body={type:21,body:[wl(["const _memo = (",i.exp,")"]),wl(["if (_cached",...c?[" && _cached.key === ",c]:[],` && ${n.helperString(gl)}(_cached, _memo)) return _cached`]),wl(["const _item = ",l]),Cl("_item.memo = _memo"),Cl("return _item")],loc:yl},s.arguments.push(e,Cl("_cache"),Cl(String(n.cached++)));}else s.arguments.push(Tl(ra(t.parseResult),l,!0));}}))}));const Yc=/([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,ea=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,ta=/^\(|\)$/g;function na(e,t){const n=e.loc,o=e.content,r=o.match(Yc);if(!r)return;const[,s,i]=r,l={source:oa(n,i.trim(),o.indexOf(i,s.length)),value:void 0,key:void 0,index:void 0};let c=s.trim().replace(ta,"").trim();const a=s.indexOf(c),u=c.match(ea);if(u){c=c.replace(ea,"").trim();const e=u[1].trim();let t;if(e&&(t=o.indexOf(e,a+c.length),l.key=oa(n,e,t)),u[2]){const r=u[2].trim();r&&(l.index=oa(n,r,o.indexOf(r,l.key?t+e.length:a+c.length)));}}return c&&(l.value=oa(n,c,a)),l}function oa(e,t,n){return Cl(t,!1,Vl(e,n,t.length))}function ra({value:e,key:t,index:n},o=[]){return function(e){let t=e.length;for(;t--&&!e[t];);return e.slice(0,t+1).map(((e,t)=>e||Cl("_".repeat(t+1),!1)))}([e,t,n,...o])}const sa=Cl("undefined",!1),ia=(e,t)=>{if(1===e.type&&(1===e.tagType||3===e.tagType)){const n=jl(e,"slot");if(n)return t.scopes.vSlot++,()=>{t.scopes.vSlot--;}}},la=(e,t,n)=>Tl(e,t,!1,!0,t.length?t[0].loc:n);function ca(e,t,n=la){t.helper(fl);const{children:o,loc:r}=e,s=[],i=[];let l=t.scopes.vSlot>0||t.scopes.vFor>0;const c=jl(e,"slot",!0);if(c){const{arg:e,exp:t}=c;e&&!El(e)&&(l=!0),s.push(xl(e||Cl("default",!0),n(t,o,r)));}let a=!1,u=!1;const p=[],f=new Set;for(let m=0;m<o.length;m++){const e=o[m];let r;if(!zl(e)||!(r=jl(e,"slot",!0))){3!==e.type&&p.push(e);continue}if(c)break;a=!0;const{children:d,loc:h}=e,{arg:g=Cl("default",!0),exp:v}=r;let y;El(g)?y=g?g.content:"default":l=!0;const b=n(v,d,h);let _,S,x;if(_=jl(e,"if"))l=!0,i.push(Nl(_.exp,aa(g,b),sa));else if(S=jl(e,/^else(-if)?$/,!0)){let e,t=m;for(;t--&&(e=o[t],3===e.type););if(e&&zl(e)&&jl(e,"if")){o.splice(m,1),m--;let e=i[i.length-1];for(;19===e.alternate.type;)e=e.alternate;e.alternate=S.exp?Nl(S.exp,aa(g,b),sa):aa(g,b);}}else if(x=jl(e,"for")){l=!0;const e=x.parseResult||na(x.exp);e&&i.push(kl(t.helper(Zi),[e.source,Tl(ra(e),aa(g,b),!0)]));}else {if(y){if(f.has(y))continue;f.add(y),"default"===y&&(u=!0);}s.push(xl(g,b));}}if(!c){const e=(e,t)=>xl("default",n(e,t,r));a?p.length&&p.some((e=>pa(e)))&&(u||s.push(e(void 0,p))):s.push(e(void 0,o));}const d=l?2:ua(e.children)?3:1;let h=Sl(s.concat(xl("_",Cl(d+"",!1))),r);return i.length&&(h=kl(t.helper(Xi),[h,_l(i)])),{slots:h,hasDynamicSlots:l}}function aa(e,t){return Sl([xl("name",e),xl("fn",t)])}function ua(e){for(let t=0;t<e.length;t++){const n=e[t];switch(n.type){case 1:if(2===n.tagType||ua(n.children))return !0;break;case 9:if(ua(n.branches))return !0;break;case 10:case 11:if(ua(n.children))return !0}}return !1}function pa(e){return 2!==e.type&&12!==e.type||(2===e.type?!!e.content.trim():pa(e.content))}const fa=new WeakMap,da=(e,t)=>function(){if(1!==(e=t.currentNode).type||0!==e.tagType&&1!==e.tagType)return;const{tag:n,props:o}=e,r=1===e.tagType;let s=r?function(e,t,n=!1){let{tag:o}=e;const r=va(o),s=Ul(e,"is");if(s)if(r){const e=6===s.type?s.value&&Cl(s.value.content,!0):s.exp;if(e)return kl(t.helper(Ki),[e])}else 6===s.type&&s.value.content.startsWith("vue:")&&(o=s.value.content.slice(4));const i=!r&&jl(e,"is");if(i&&i.exp)return kl(t.helper(Ki),[i.exp]);const l=Rl(o)||t.isBuiltInComponent(o);if(l)return n||t.helper(l),l;return t.helper(zi),t.components.add(o),Xl(o,"component")}(e,t):`"${n}"`;let i,l,c,a,u,p,f=0,d=O(s)&&s.callee===Ki||s===Mi||s===Oi||!r&&("svg"===n||"foreignObject"===n||Ul(e,"key",!0));if(o.length>0){const n=ha(e,t);i=n.props,f=n.patchFlag,u=n.dynamicPropNames;const o=n.directives;p=o&&o.length?_l(o.map((e=>function(e,t){const n=[],o=fa.get(e);o?n.push(t.helperString(o)):(t.helper(Gi),t.directives.add(e.name),n.push(Xl(e.name,"directive")));const{loc:r}=e;e.exp&&n.push(e.exp);e.arg&&(e.exp||n.push("void 0"),n.push(e.arg));if(Object.keys(e.modifiers).length){e.arg||(e.exp||n.push("void 0"),n.push("void 0"));const t=Cl("true",!1,r);n.push(Sl(e.modifiers.map((e=>xl(e,t))),r));}return _l(n,e.loc)}(e,t)))):void 0;}if(e.children.length>0){s===Pi&&(d=!0,f|=1024);if(r&&s!==Mi&&s!==Pi){const{slots:n,hasDynamicSlots:o}=ca(e,t);l=n,o&&(f|=1024);}else if(1===e.children.length&&s!==Mi){const n=e.children[0],o=n.type,r=5===o||8===o;r&&0===$c(n,t)&&(f|=1),l=r||2===o?n:e.children;}else l=e.children;}0!==f&&(c=String(f),u&&u.length&&(a=function(e){let t="[";for(let n=0,o=e.length;n<o;n++)t+=JSON.stringify(e[n]),n<o-1&&(t+=", ");return t+"]"}(u))),e.codegenNode=bl(t,s,i,l,c,a,p,!!d,!1,r,e.loc);};function ha(e,t,n=e.props,o=!1){const{tag:r,loc:s}=e,i=1===e.tagType;let l=[];const c=[],a=[];let u=0,p=!1,f=!1,d=!1,h=!1,m=!1,g=!1;const v=[],y=({key:e,value:n})=>{if(El(e)){const o=e.content,r=S(o);if(i||!r||"onclick"===o.toLowerCase()||"onUpdate:modelValue"===o||j(o)||(h=!0),r&&j(o)&&(g=!0),20===n.type||(4===n.type||8===n.type)&&$c(n,t)>0)return;"ref"===o?p=!0:"class"===o?f=!0:"style"===o?d=!0:"key"===o||v.includes(o)||v.push(o),!i||"class"!==o&&"style"!==o||v.includes(o)||v.push(o);}else m=!0;};for(let _=0;_<n.length;_++){const i=n[_];if(6===i.type){const{loc:e,name:t,value:n}=i;let o=Cl(n?n.content:"",!0,n?n.loc:e);if("ref"===t&&(p=!0),"is"===t&&(va(r)||n&&n.content.startsWith("vue:")))continue;l.push(xl(Cl(t,!0,Vl(e,0,t.length)),o));}else {const{name:n,arg:u,exp:p,loc:f}=i,d="bind"===n,h="on"===n;if("slot"===n)continue;if("once"===n||"memo"===n)continue;if("is"===n||d&&Hl(u,"is")&&va(r))continue;if(h&&o)continue;if(!u&&(d||h)){m=!0,p&&(l.length&&(c.push(Sl(ma(l),s)),l=[]),c.push(d?p:{type:14,loc:f,callee:t.helper(sl),arguments:[p]}));continue}const g=t.directiveTransforms[n];if(g){const{props:n,needRuntime:r}=g(i,e,t);!o&&n.forEach(y),l.push(...n),r&&(a.push(i),M(r)&&fa.set(i,r));}else a.push(i);}}let b;if(c.length?(l.length&&c.push(Sl(ma(l),s)),b=c.length>1?kl(t.helper(el),c,s):c[0]):l.length&&(b=Sl(ma(l),s)),m?u|=16:(f&&!i&&(u|=2),d&&!i&&(u|=4),v.length&&(u|=8),h&&(u|=32)),0!==u&&32!==u||!(p||g||a.length>0)||(u|=512),!t.inSSR&&b)switch(b.type){case 15:let e=-1,n=-1,o=!1;for(let t=0;t<b.properties.length;t++){const r=b.properties[t].key;El(r)?"class"===r.content?e=t:"style"===r.content&&(n=t):r.isHandlerKey||(o=!0);}const r=b.properties[e],s=b.properties[n];o?b=kl(t.helper(ol),[b]):(r&&!El(r.value)&&(r.value=kl(t.helper(tl),[r.value])),!s||El(s.value)||!d&&17!==s.value.type||(s.value=kl(t.helper(nl),[s.value])));break;case 14:break;default:b=kl(t.helper(ol),[kl(t.helper(rl),[b])]);}return {props:b,directives:a,patchFlag:u,dynamicPropNames:v}}function ma(e){const t=new Map,n=[];for(let o=0;o<e.length;o++){const r=e[o];if(8===r.key.type||!r.key.isStatic){n.push(r);continue}const s=r.key.content,i=t.get(s);i?("style"===s||"class"===s||s.startsWith("on"))&&ga(i,r):(t.set(s,r),n.push(r));}return n}function ga(e,t){17===e.value.type?e.value.elements.push(t.value):e.value=_l([e.value,t.value],e.loc);}function va(e){return e[0].toLowerCase()+e.slice(1)==="component"}const ya=(e,t)=>{if(Kl(e)){const{children:n,loc:o}=e,{slotName:r,slotProps:s}=function(e,t){let n,o='"default"';const r=[];for(let s=0;s<e.props.length;s++){const t=e.props[s];6===t.type?t.value&&("name"===t.name?o=JSON.stringify(t.value.content):(t.name=D(t.name),r.push(t))):"bind"===t.name&&Hl(t.arg,"name")?t.exp&&(o=t.exp):("bind"===t.name&&t.arg&&El(t.arg)&&(t.arg.content=D(t.arg.content)),r.push(t));}if(r.length>0){const{props:o,directives:s}=ha(e,t,r);n=o;}return {slotName:o,slotProps:n}}(e,t),i=[t.prefixIdentifiers?"_ctx.$slots":"$slots",r];s&&i.push(s),n.length&&(s||i.push("{}"),i.push(Tl([],n,!1,!1,o))),t.scopeId&&!t.slotted&&(s||i.push("{}"),n.length||i.push("undefined"),i.push("true")),e.codegenNode=kl(t.helper(Qi),i,o);}};const ba=/^\s*([\w$_]+|(async\s*)?\([^)]*?\))\s*=>|^\s*(async\s+)?function(?:\s+[\w$]+)?\s*\(/,_a=(e,t,n,o)=>{const{loc:r,modifiers:s,arg:i}=e;let l;if(4===i.type)if(i.isStatic){l=Cl(G(D(i.content)),!0,i.loc);}else l=wl([`${n.helperString(cl)}(`,i,")"]);else l=i,l.children.unshift(`${n.helperString(cl)}(`),l.children.push(")");let c=e.exp;c&&!c.content.trim()&&(c=void 0);let a=n.cacheHandlers&&!c&&!n.inVOnce;if(c){const e=Il(c.content),t=!(e||ba.test(c.content)),n=c.content.includes(";");(t||a&&e)&&(c=wl([`${t?"$event":"(...args)"} => ${n?"{":"("}`,c,n?"}":")"]));}let u={props:[xl(l,c||Cl("() => {}",!1,r))]};return o&&(u=o(u)),a&&(u.props[0].value=n.cache(u.props[0].value)),u.props.forEach((e=>e.key.isHandlerKey=!0)),u},Sa=(e,t,n)=>{const{exp:o,modifiers:r,loc:s}=e,i=e.arg;return 4!==i.type?(i.children.unshift("("),i.children.push(') || ""')):i.isStatic||(i.content=`${i.content} || ""`),r.includes("camel")&&(4===i.type?i.content=i.isStatic?D(i.content):`${n.helperString(il)}(${i.content})`:(i.children.unshift(`${n.helperString(il)}(`),i.children.push(")"))),n.inSSR||(r.includes("prop")&&xa(i,"."),r.includes("attr")&&xa(i,"^")),!o||4===o.type&&!o.content.trim()?{props:[xl(i,Cl("",!0,s))]}:{props:[xl(i,o)]}},xa=(e,t)=>{4===e.type?e.content=e.isStatic?t+e.content:`\`${t}\${${e.content}}\``:(e.children.unshift(`'${t}' + (`),e.children.push(")"));},Ca=(e,t)=>{if(0===e.type||1===e.type||11===e.type||10===e.type)return ()=>{const n=e.children;let o,r=!1;for(let e=0;e<n.length;e++){const t=n[e];if(Dl(t)){r=!0;for(let r=e+1;r<n.length;r++){const s=n[r];if(!Dl(s)){o=void 0;break}o||(o=n[e]={type:8,loc:t.loc,children:[t]}),o.children.push(" + ",s),n.splice(r,1),r--;}}}if(r&&(1!==n.length||0!==e.type&&(1!==e.type||0!==e.tagType||e.props.find((e=>7===e.type&&!t.directiveTransforms[e.name])))))for(let e=0;e<n.length;e++){const o=n[e];if(Dl(o)||8===o.type){const r=[];2===o.type&&" "===o.content||r.push(o),t.ssr||0!==$c(o,t)||r.push("1"),n[e]={type:12,content:o,loc:o.loc,codegenNode:kl(t.helper(Di),r)};}}}},wa=new WeakSet,ka=(e,t)=>{if(1===e.type&&jl(e,"once",!0)){if(wa.has(e)||t.inVOnce)return;return wa.add(e),t.inVOnce=!0,t.helper(al),()=>{t.inVOnce=!1;const e=t.currentNode;e.codegenNode&&(e.codegenNode=t.cache(e.codegenNode,!0));}}},Ta=(e,t,n)=>{const{exp:o,arg:r}=e;if(!o)return Na();const s=o.loc.source,i=4===o.type?o.content:s;if(!i.trim()||!Il(i))return Na();const l=r||Cl("modelValue",!0),c=r?El(r)?`onUpdate:${r.content}`:wl(['"onUpdate:" + ',r]):"onUpdate:modelValue";let a;a=wl([`${n.isTS?"($event: any)":"$event"} => (`,o," = $event)"]);const u=[xl(l,e.exp),xl(c,a)];if(e.modifiers.length&&1===t.tagType){const t=e.modifiers.map((e=>(Fl(e)?e:JSON.stringify(e))+": true")).join(", "),n=r?El(r)?`${r.content}Modifiers`:wl([r,' + "Modifiers"']):"modelModifiers";u.push(xl(n,Cl(`{ ${t} }`,!1,e.loc,2)));}return Na(u)};function Na(e=[]){return {props:e}}const Ea=new WeakSet,$a=(e,t)=>{if(1===e.type){const n=jl(e,"memo");if(!n||Ea.has(e))return;return Ea.add(e),()=>{const o=e.codegenNode||t.currentNode.codegenNode;o&&13===o.type&&(1!==e.tagType&&Yl(o,t),e.codegenNode=kl(t.helper(ml),[n.exp,Tl(void 0,o),"_cache",String(t.cached++)]));}}};function Ra(e,t={}){const n=t.onError||$i,o="module"===t.mode;!0===t.prefixIdentifiers?n(Ai(46)):o&&n(Ai(47));t.cacheHandlers&&n(Ai(48)),t.scopeId&&!o&&n(Ai(49));const r=F(e)?oc(e,t):e,[s,i]=[[ka,qc,$a,Xc,ya,da,ia,Ca],{on:_a,bind:Sa,model:Ta}];return Ic(r,C({},t,{prefixIdentifiers:false,nodeTransforms:[...s,...t.nodeTransforms||[]],directiveTransforms:C({},i,t.directiveTransforms||{})})),jc(r,C({},t,{prefixIdentifiers:false}))}const Aa=Symbol(""),Fa=Symbol(""),Ma=Symbol(""),Oa=Symbol(""),Pa=Symbol(""),Ia=Symbol(""),Va=Symbol(""),Ba=Symbol(""),La=Symbol(""),ja=Symbol("");var Ua;let Ha;Ua={[Aa]:"vModelRadio",[Fa]:"vModelCheckbox",[Ma]:"vModelText",[Oa]:"vModelSelect",[Pa]:"vModelDynamic",[Ia]:"withModifiers",[Va]:"withKeys",[Ba]:"vShow",[La]:"Transition",[ja]:"TransitionGroup"},Object.getOwnPropertySymbols(Ua).forEach((e=>{vl[e]=Ua[e];}));const Da=t("style,iframe,script,noscript",!0),Wa={isVoidTag:f,isNativeTag:e=>u(e)||p(e),isPreTag:e=>"pre"===e,decodeEntities:function(e,t=!1){return Ha||(Ha=document.createElement("div")),t?(Ha.innerHTML=`<div foo="${e.replace(/"/g,"&quot;")}">`,Ha.children[0].getAttribute("foo")):(Ha.innerHTML=e,Ha.textContent)},isBuiltInComponent:e=>$l(e,"Transition")?La:$l(e,"TransitionGroup")?ja:void 0,getNamespace(e,t){let n=t?t.ns:0;if(t&&2===n)if("annotation-xml"===t.tag){if("svg"===e)return 1;t.props.some((e=>6===e.type&&"encoding"===e.name&&null!=e.value&&("text/html"===e.value.content||"application/xhtml+xml"===e.value.content)))&&(n=0);}else /^m(?:[ions]|text)$/.test(t.tag)&&"mglyph"!==e&&"malignmark"!==e&&(n=0);else t&&1===n&&("foreignObject"!==t.tag&&"desc"!==t.tag&&"title"!==t.tag||(n=0));if(0===n){if("svg"===e)return 1;if("math"===e)return 2}return n},getTextMode({tag:e,ns:t}){if(0===t){if("textarea"===e||"title"===e)return 1;if(Da(e))return 2}return 0}},za=(e,t)=>{const n=c(e);return Cl(JSON.stringify(n),!1,t,3)};const Ka=t("passive,once,capture"),Ga=t("stop,prevent,self,ctrl,shift,alt,meta,exact,middle"),qa=t("left,right"),Ja=t("onkeyup,onkeydown,onkeypress",!0),Za=(e,t)=>El(e)&&"onclick"===e.content.toLowerCase()?Cl(t,!0):4!==e.type?wl(["(",e,`) === "onClick" ? "${t}" : (`,e,")"]):e,Qa=(e,t)=>{1!==e.type||0!==e.tagType||"script"!==e.tag&&"style"!==e.tag||t.removeNode();},Xa=[e=>{1===e.type&&e.props.forEach(((t,n)=>{6===t.type&&"style"===t.name&&t.value&&(e.props[n]={type:7,name:"bind",arg:Cl("style",!0,t.loc),exp:za(t.value.content,t.loc),modifiers:[],loc:t.loc});}));}],Ya={cloak:()=>({props:[]}),html:(e,t,n)=>{const{exp:o,loc:r}=e;return t.children.length&&(t.children.length=0),{props:[xl(Cl("innerHTML",!0,r),o||Cl("",!0))]}},text:(e,t,n)=>{const{exp:o,loc:r}=e;return t.children.length&&(t.children.length=0),{props:[xl(Cl("textContent",!0),o?kl(n.helperString(Yi),[o],r):Cl("",!0))]}},model:(e,t,n)=>{const o=Ta(e,t,n);if(!o.props.length||1===t.tagType)return o;const{tag:r}=t,s=n.isCustomElement(r);if("input"===r||"textarea"===r||"select"===r||s){let e=Ma,i=!1;if("input"===r||s){const n=Ul(t,"type");if(n){if(7===n.type)e=Pa;else if(n.value)switch(n.value.content){case"radio":e=Aa;break;case"checkbox":e=Fa;break;case"file":i=!0;}}else (function(e){return e.props.some((e=>!(7!==e.type||"bind"!==e.name||e.arg&&4===e.arg.type&&e.arg.isStatic)))})(t)&&(e=Pa);}else "select"===r&&(e=Oa);i||(o.needRuntime=n.helper(e));}return o.props=o.props.filter((e=>!(4===e.key.type&&"modelValue"===e.key.content))),o},on:(e,t,n)=>_a(e,0,n,(t=>{const{modifiers:o}=e;if(!o.length)return t;let{key:r,value:s}=t.props[0];const{keyModifiers:i,nonKeyModifiers:l,eventOptionModifiers:c}=((e,t,n,o)=>{const r=[],s=[],i=[];for(let l=0;l<t.length;l++){const n=t[l];Ka(n)?i.push(n):qa(n)?El(e)?Ja(e.content)?r.push(n):s.push(n):(r.push(n),s.push(n)):Ga(n)?s.push(n):r.push(n);}return {keyModifiers:r,nonKeyModifiers:s,eventOptionModifiers:i}})(r,o);if(l.includes("right")&&(r=Za(r,"onContextmenu")),l.includes("middle")&&(r=Za(r,"onMouseup")),l.length&&(s=kl(n.helper(Ia),[s,JSON.stringify(l)])),!i.length||El(r)&&!Ja(r.content)||(s=kl(n.helper(Va),[s,JSON.stringify(i)])),c.length){const e=c.map(K).join("");r=El(r)?Cl(`${r.content}${e}`,!0):wl(["(",r,`) + "${e}"`]);}return {props:[xl(r,s)]}})),show:(e,t,n)=>({props:[],needRuntime:n.helper(Ba)})};const eu=Object.create(null);function tu(e,t){if(!F(e)){if(!e.nodeType)return y;e=e.innerHTML;}const n=e,o=eu[n];if(o)return o;if("#"===e[0]){const t=document.querySelector(e);e=t?t.innerHTML:"";}const{code:r}=function(e,t={}){return Ra(e,C({},Wa,t,{nodeTransforms:[Qa,...Xa,...t.nodeTransforms||[]],directiveTransforms:C({},Ya,t.directiveTransforms||{}),transformHoist:null}))}(e,C({hoistStatic:!0,onError:void 0,onWarn:y},t)),s=new Function(r)();return s._rc=!0,eu[n]=s}return yr(tu),e.BaseTransition=rn,e.Comment=Fo,e.EffectScope=ee,e.Fragment=Ro,e.KeepAlive=gn,e.ReactiveEffect=fe,e.Static=Mo,e.Suspense=qt,e.Teleport=ko,e.Text=Ao,e.Transition=Ps,e.TransitionGroup=Ys,e.VueElement=Rs,e.callWithAsyncErrorHandling=$r,e.callWithErrorHandling=Er,e.camelize=D,e.capitalize=K,e.cloneVNode=Zo,e.compatUtils=null,e.compile=tu,e.computed=Pt,e.createApp=(...e)=>{const t=wi().createApp(...e),{mount:n}=t;return t.mount=e=>{const o=Ei(e);if(!o)return;const r=t._component;A(r)||r.render||r.template||(r.template=o.innerHTML),o.innerHTML="";const s=n(o,!1,o instanceof SVGElement);return o instanceof Element&&(o.removeAttribute("v-cloak"),o.setAttribute("data-v-app","")),s},t},e.createBlock=Uo,e.createCommentVNode=function(e="",t=!1){return t?(Io(),Uo(Fo,null,e)):qo(Fo,null,e)},e.createElementBlock=function(e,t,n,o,r,s){return jo(Go(e,t,n,o,r,s,!0))},e.createElementVNode=Go,e.createHydrationRenderer=go,e.createRenderer=mo,e.createSSRApp=(...e)=>{const t=ki().createApp(...e),{mount:n}=t;return t.mount=e=>{const t=Ei(e);if(t)return n(t,!0,t instanceof SVGElement)},t},e.createSlots=function(e,t){for(let n=0;n<t.length;n++){const o=t[n];if(N(o))for(let t=0;t<o.length;t++)e[o[t].name]=o[t].fn;else o&&(e[o.name]=o.fn);}return e},e.createStaticVNode=function(e,t){const n=qo(Mo,null,e);return n.staticCount=t,n},e.createTextVNode=Qo,e.createVNode=qo,e.customRef=function(e){return new At(e)},e.defineAsyncComponent=function(e){A(e)&&(e={loader:e});const{loader:t,loadingComponent:n,errorComponent:o,delay:r=200,timeout:s,suspensible:i=!0,onError:l}=e;let c,a=null,u=0;const p=()=>{let e;return a||(e=a=t().catch((e=>{if(e=e instanceof Error?e:new Error(String(e)),l)return new Promise(((t,n)=>{l(e,(()=>t((u++,a=null,p()))),(()=>n(e)),u+1);}));throw e})).then((t=>e!==a&&a?a:(t&&(t.__esModule||"Module"===t[Symbol.toStringTag])&&(t=t.default),c=t,t))))};return fn({name:"AsyncComponentWrapper",__asyncLoader:p,get __asyncResolved(){return c},setup(){const e=ar;if(c)return ()=>hn(c,e);const t=t=>{a=null,Rr(t,e,13,!o);};if(i&&e.suspense)return p().then((t=>()=>hn(t,e))).catch((e=>(t(e),()=>o?qo(o,{error:e}):null)));const l=kt(!1),u=kt(),f=kt(!!r);return r&&setTimeout((()=>{f.value=!1;}),r),null!=s&&setTimeout((()=>{if(!l.value&&!u.value){const e=new Error(`Async component timed out after ${s}ms.`);t(e),u.value=e;}}),s),p().then((()=>{l.value=!0,e.parent&&mn(e.parent.vnode)&&zr(e.parent.update);})).catch((e=>{t(e),u.value=e;})),()=>l.value&&c?hn(c,e):u.value&&o?qo(o,{error:u.value}):n&&!f.value?qo(n):void 0}})},e.defineComponent=fn,e.defineCustomElement=Es,e.defineEmits=function(){return null},e.defineExpose=function(e){},e.defineProps=function(){return null},e.defineSSRCustomElement=e=>Es(e,Ni),e.effect=function(e,t){e.effect&&(e=e.effect.fn);const n=new fe(e);t&&(C(n,t),t.scope&&te(n,t.scope)),t&&t.lazy||n.run();const o=n.run.bind(n);return o.effect=n,o},e.effectScope=function(e){return new ee(e)},e.getCurrentInstance=ur,e.getCurrentScope=function(){return X},e.getTransitionRawChildren=pn,e.guardReactiveProps=Jo,e.h=ls,e.handleError=Rr,e.hydrate=Ni,e.initCustomFormatter=function(){},e.inject=tn,e.isMemoSame=as,e.isProxy=yt,e.isReactive=gt,e.isReadonly=vt,e.isRef=wt,e.isRuntimeOnly=()=>!hr,e.isVNode=Ho,e.markRaw=_t,e.mergeDefaults=function(e,t){for(const n in t){const o=e[n];o?o.default=t[n]:null===o&&(e[n]={default:t[n]});}return e},e.mergeProps=tr,e.nextTick=Wr,e.normalizeClass=a,e.normalizeProps=function(e){if(!e)return null;let{class:t,style:n}=e;return t&&!F(t)&&(e.class=a(t)),n&&(e.style=s(n)),e},e.normalizeStyle=s,e.onActivated=yn,e.onBeforeMount=Tn,e.onBeforeUnmount=Rn,e.onBeforeUpdate=En,e.onDeactivated=bn,e.onErrorCaptured=Pn,e.onMounted=Nn,e.onRenderTracked=On,e.onRenderTriggered=Mn,e.onScopeDispose=function(e){X&&X.cleanups.push(e);},e.onServerPrefetch=Fn,e.onUnmounted=An,e.onUpdated=$n,e.openBlock=Io,e.popScopeId=function(){jt=null;},e.provide=en,e.proxyRefs=Rt,e.pushScopeId=function(e){jt=e;},e.queuePostFlushCb=qr,e.reactive=ft,e.readonly=ht,e.ref=kt,e.registerRuntimeCompiler=yr,e.render=Ti,e.renderList=function(e,t,n,o){let r;const s=n&&n[o];if(N(e)||F(e)){r=new Array(e.length);for(let n=0,o=e.length;n<o;n++)r[n]=t(e[n],n,void 0,s&&s[n]);}else if("number"==typeof e){r=new Array(e);for(let n=0;n<e;n++)r[n]=t(n+1,n,void 0,s&&s[n]);}else if(O(e))if(e[Symbol.iterator])r=Array.from(e,((e,n)=>t(e,n,void 0,s&&s[n])));else {const n=Object.keys(e);r=new Array(n.length);for(let o=0,i=n.length;o<i;o++){const i=n[o];r[o]=t(e[i],i,o,s&&s[o]);}}else r=[];return n&&(n[o]=r),r},e.renderSlot=function(e,t,n={},o,r){if(Lt.isCE)return qo("slot","default"===t?null:{name:t},o&&o());let s=e[t];s&&s._c&&(s._d=!1),Io();const i=s&&nr(s(n)),l=Uo(Ro,{key:n.key||`_${t}`},i||(o?o():[]),i&&1===e._?64:-2);return !r&&l.scopeId&&(l.slotScopeIds=[l.scopeId+"-s"]),s&&s._c&&(s._d=!0),l},e.resolveComponent=function(e,t){return Eo(To,e,!0,t)||e},e.resolveDirective=function(e){return Eo("directives",e)},e.resolveDynamicComponent=function(e){return F(e)?Eo(To,e,!1)||e:e||No},e.resolveFilter=null,e.resolveTransitionHooks=ln,e.setBlockTracking=Lo,e.setDevtoolsHook=function(t){e.devtools=t;},e.setTransitionHooks=un,e.shallowReactive=dt,e.shallowReadonly=function(e){return mt(e,!0,Ie,it,ut)},e.shallowRef=function(e){return Nt(e,!0)},e.ssrContextKey=cs,e.ssrUtils=null,e.stop=function(e){e.effect.stop();},e.toDisplayString=e=>null==e?"":N(e)||O(e)&&(e.toString===I||!A(e.toString))?JSON.stringify(e,m,2):String(e),e.toHandlerKey=G,e.toHandlers=function(e){const t={};for(const n in e)t[G(n)]=e[n];return t},e.toRaw=bt,e.toRef=Mt,e.toRefs=function(e){const t=N(e)?new Array(e.length):{};for(const n in e)t[n]=Mt(e,n);return t},e.transformVNodeArgs=function(e){},e.triggerRef=function(e){xt(e);},e.unref=Et,e.useAttrs=function(){return is().attrs},e.useCssModule=function(e="$style"){return g},e.useCssVars=function(e){const t=ur();if(!t)return;const n=()=>As(t.subTree,e(t.proxy));Yr(n),Nn((()=>{const e=new MutationObserver(n);e.observe(t.subTree.el.parentNode,{childList:!0}),An((()=>e.disconnect()));}));},e.useSSRContext=()=>{},e.useSlots=function(){return is().slots},e.useTransitionState=nn,e.vModelCheckbox=li,e.vModelDynamic=hi,e.vModelRadio=ai,e.vModelSelect=ui,e.vModelText=ii,e.vShow=bi,e.version=us,e.warn=function(e,...t){ge();const n=kr.length?kr[kr.length-1].component:null,o=n&&n.appContext.config.warnHandler,r=function(){let e=kr[kr.length-1];if(!e)return [];const t=[];for(;e;){const n=t[0];n&&n.vnode===e?n.recurseCount++:t.push({vnode:e,recurseCount:0});const o=e.component&&e.component.parent;e=o&&o.vnode;}return t}();if(o)Er(o,n,11,[e+t.join(""),n&&n.proxy,r.map((({vnode:e})=>`at <${wr(n,e.type)}>`)).join("\n"),r]);else {const n=[`[Vue warn]: ${e}`,...t];r.length&&n.push("\n",...function(e){const t=[];return e.forEach(((e,n)=>{t.push(...0===n?[]:["\n"],...function({vnode:e,recurseCount:t}){const n=t>0?`... (${t} recursive calls)`:"",o=` at <${wr(e.component,e.type,!!e.component&&null==e.component.parent)}`,r=">"+n;return e.props?[o,...Tr(e.props),r]:[o+r]}(e));})),t}(r)),console.warn(...n);}ve();},e.watch=ts,e.watchEffect=function(e,t){return ns(e,null,t)},e.watchPostEffect=Yr,e.watchSyncEffect=function(e,t){return ns(e,null,{flush:"sync"})},e.withAsyncContext=function(e){const t=ur();let n=e();return fr(),P(n)&&(n=n.catch((e=>{throw pr(t),e}))),[n,()=>pr(t)]},e.withCtx=Ht,e.withDefaults=function(e,t){return null},e.withDirectives=function(e,t){if(null===Lt)return e;const n=Lt.proxy,o=e.dirs||(e.dirs=[]);for(let r=0;r<t.length;r++){let[e,s,i,l=g]=t[r];A(e)&&(e={mounted:e,updated:e}),e.deep&&ss(s),o.push({dir:e,instance:n,value:s,oldValue:void 0,arg:i,modifiers:l});}return e},e.withKeys=(e,t)=>n=>{if(!("key"in n))return;const o=z(n.key);return t.some((e=>e===o||yi[e]===o))?e(n):void 0},e.withMemo=function(e,t,n,o){const r=n[o];if(r&&as(r,e))return r;const s=t();return s.memo=e.slice(),n[o]=s},e.withModifiers=(e,t)=>(n,...o)=>{for(let e=0;e<t.length;e++){const o=vi[t[e]];if(o&&o(n,t))return}return e(n,...o)},e.withScopeId=e=>Ht,Object.defineProperty(e,"__esModule",{value:!0}),e}({});

  /*!
    * vue-router v4.0.11
    * (c) 2021 Eduardo San Martin Morote
    * @license MIT
    */
  window.VueRouter=function(e,t){const n="function"==typeof Symbol&&"symbol"==typeof Symbol.toStringTag,r=e=>n?Symbol(e):"_vr_"+e,o=r("rvlm"),a=r("rvd"),c=r("r"),s=r("rl"),i=r("rvl"),l="undefined"!=typeof window;const u=Object.assign;function f(e,t){const n={};for(const r in t){const o=t[r];n[r]=Array.isArray(o)?o.map(e):e(o);}return n}const p=()=>{},h=/\/$/;function d(e,t,n="/"){let r,o={},a="",c="";const s=t.indexOf("?"),i=t.indexOf("#",s>-1?s:0);return s>-1&&(r=t.slice(0,s),a=t.slice(s+1,i>-1?i:t.length),o=e(a)),i>-1&&(r=r||t.slice(0,i),c=t.slice(i,t.length)),r=function(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/");let o,a,c=n.length-1;for(o=0;o<r.length;o++)if(a=r[o],1!==c&&"."!==a){if(".."!==a)break;c--;}return n.slice(0,c).join("/")+"/"+r.slice(o-(o===r.length?1:0)).join("/")}(null!=r?r:t,n),{fullPath:r+(a&&"?")+a+c,path:r,query:o,hash:c}}function m(e,t){return t&&e.toLowerCase().startsWith(t.toLowerCase())?e.slice(t.length)||"/":e}function g(e,t){return (e.aliasOf||e)===(t.aliasOf||t)}function v(e,t){if(Object.keys(e).length!==Object.keys(t).length)return !1;for(const n in e)if(!y(e[n],t[n]))return !1;return !0}function y(e,t){return Array.isArray(e)?b(e,t):Array.isArray(t)?b(t,e):e===t}function b(e,t){return Array.isArray(t)?e.length===t.length&&e.every(((e,n)=>e===t[n])):1===e.length&&e[0]===t}var w,E;!function(e){e.pop="pop",e.push="push";}(w||(w={})),function(e){e.back="back",e.forward="forward",e.unknown="";}(E||(E={}));function R(e){if(!e)if(l){const t=document.querySelector("base");e=(e=t&&t.getAttribute("href")||"/").replace(/^\w+:\/\/[^\/]+/,"");}else e="/";return "/"!==e[0]&&"#"!==e[0]&&(e="/"+e),e.replace(h,"")}const A=/^[^#]+#/;function k(e,t){return e.replace(A,"#")+t}const O=()=>({left:window.pageXOffset,top:window.pageYOffset});function P(e){let t;if("el"in e){const n=e.el,r="string"==typeof n&&n.startsWith("#"),o="string"==typeof n?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!o)return;t=function(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return {behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}(o,e);}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(null!=t.left?t.left:window.pageXOffset,null!=t.top?t.top:window.pageYOffset);}function j(e,t){return (history.state?history.state.position-t:-1)+e}const x=new Map;let C=()=>location.protocol+"//"+location.host;function $(e,t){const{pathname:n,search:r,hash:o}=t,a=e.indexOf("#");if(a>-1){let t=o.includes(e.slice(a))?e.slice(a).length:1,n=o.slice(t);return "/"!==n[0]&&(n="/"+n),m(n,"")}return m(n,e)+r+o}function S(e,t,n,r=!1,o=!1){return {back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:o?O():null}}function L(e){const t=function(e){const{history:t,location:n}=window,r={value:$(e,n)},o={value:t.state};function a(r,a,c){const s=e.indexOf("#"),i=s>-1?(n.host&&document.querySelector("base")?e:e.slice(s))+r:C()+e+r;try{t[c?"replaceState":"pushState"](a,"",i),o.value=a;}catch(e){console.error(e),n[c?"replace":"assign"](i);}}return o.value||a(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0),{location:r,state:o,push:function(e,n){const c=u({},o.value,t.state,{forward:e,scroll:O()});a(c.current,c,!0),a(e,u({},S(r.value,e,null),{position:c.position+1},n),!1),r.value=e;},replace:function(e,n){a(e,u({},t.state,S(o.value.back,e,o.value.forward,!0),n,{position:o.value.position}),!0),r.value=e;}}}(e=R(e)),n=function(e,t,n,r){let o=[],a=[],c=null;const s=({state:a})=>{const s=$(e,location),i=n.value,l=t.value;let u=0;if(a){if(n.value=s,t.value=a,c&&c===i)return void(c=null);u=l?a.position-l.position:0;}else r(s);o.forEach((e=>{e(n.value,i,{delta:u,type:w.pop,direction:u?u>0?E.forward:E.back:E.unknown});}));};function i(){const{history:e}=window;e.state&&e.replaceState(u({},e.state,{scroll:O()}),"");}return window.addEventListener("popstate",s),window.addEventListener("beforeunload",i),{pauseListeners:function(){c=n.value;},listen:function(e){o.push(e);const t=()=>{const t=o.indexOf(e);t>-1&&o.splice(t,1);};return a.push(t),t},destroy:function(){for(const e of a)e();a=[],window.removeEventListener("popstate",s),window.removeEventListener("beforeunload",i);}}}(e,t.state,t.location,t.replace);const r=u({location:"",base:e,go:function(e,t=!0){t||n.pauseListeners(),history.go(e);},createHref:k.bind(null,e)},t,n);return Object.defineProperty(r,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(r,"state",{enumerable:!0,get:()=>t.state.value}),r}function q(e){return "string"==typeof e||"symbol"==typeof e}const M={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},_=r("nf");var T;function B(e,t){return u(new Error,{type:e,[_]:!0},t)}function G(e,t){return e instanceof Error&&_ in e&&(null==t||!!(e.type&t))}e.NavigationFailureType=void 0,(T=e.NavigationFailureType||(e.NavigationFailureType={}))[T.aborted=4]="aborted",T[T.cancelled=8]="cancelled",T[T.duplicated=16]="duplicated";const F="[^/]+?",I={sensitive:!1,strict:!1,start:!0,end:!0},K=/[.+*?^${}()[\]/\\]/g;function U(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++;}return e.length<t.length?1===e.length&&80===e[0]?-1:1:e.length>t.length?1===t.length&&80===t[0]?1:-1:0}function V(e,t){let n=0;const r=e.score,o=t.score;for(;n<r.length&&n<o.length;){const e=U(r[n],o[n]);if(e)return e;n++;}return o.length-r.length}const H={type:0,value:""},W=/[a-zA-Z0-9_]/;function D(e,t,n){const r=function(e,t){const n=u({},I,t),r=[];let o=n.start?"^":"";const a=[];for(const t of e){const e=t.length?[]:[90];n.strict&&!t.length&&(o+="/");for(let r=0;r<t.length;r++){const c=t[r];let s=40+(n.sensitive?.25:0);if(0===c.type)r||(o+="/"),o+=c.value.replace(K,"\\$&"),s+=40;else if(1===c.type){const{value:e,repeatable:n,optional:i,regexp:l}=c;a.push({name:e,repeatable:n,optional:i});const u=l||F;if(u!==F){s+=10;try{new RegExp(`(${u})`);}catch(t){throw new Error(`Invalid custom RegExp for param "${e}" (${u}): `+t.message)}}let f=n?`((?:${u})(?:/(?:${u}))*)`:`(${u})`;r||(f=i&&t.length<2?`(?:/${f})`:"/"+f),i&&(f+="?"),o+=f,s+=20,i&&(s+=-8),n&&(s+=-20),".*"===u&&(s+=-50);}e.push(s);}r.push(e);}if(n.strict&&n.end){const e=r.length-1;r[e][r[e].length-1]+=.7000000000000001;}n.strict||(o+="/?"),n.end?o+="$":n.strict&&(o+="(?:/|$)");const c=new RegExp(o,n.sensitive?"":"i");return {re:c,score:r,keys:a,parse:function(e){const t=e.match(c),n={};if(!t)return null;for(let e=1;e<t.length;e++){const r=t[e]||"",o=a[e-1];n[o.name]=r&&o.repeatable?r.split("/"):r;}return n},stringify:function(t){let n="",r=!1;for(const o of e){r&&n.endsWith("/")||(n+="/"),r=!1;for(const e of o)if(0===e.type)n+=e.value;else if(1===e.type){const{value:a,repeatable:c,optional:s}=e,i=a in t?t[a]:"";if(Array.isArray(i)&&!c)throw new Error(`Provided param "${a}" is an array but it is not repeatable (* or + modifiers)`);const l=Array.isArray(i)?i.join("/"):i;if(!l){if(!s)throw new Error(`Missing required param "${a}"`);o.length<2&&(n.endsWith("/")?n=n.slice(0,-1):r=!0);}n+=l;}}return n}}}(function(e){if(!e)return [[]];if("/"===e)return [[H]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(e){throw new Error(`ERR (${n})/"${l}": ${e}`)}let n=0,r=n;const o=[];let a;function c(){a&&o.push(a),a=[];}let s,i=0,l="",u="";function f(){l&&(0===n?a.push({type:0,value:l}):1===n||2===n||3===n?(a.length>1&&("*"===s||"+"===s)&&t(`A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`),a.push({type:1,value:l,regexp:u,repeatable:"*"===s||"+"===s,optional:"*"===s||"?"===s})):t("Invalid state to consume buffer"),l="");}function p(){l+=s;}for(;i<e.length;)if(s=e[i++],"\\"!==s||2===n)switch(n){case 0:"/"===s?(l&&f(),c()):":"===s?(f(),n=1):p();break;case 4:p(),n=r;break;case 1:"("===s?n=2:W.test(s)?p():(f(),n=0,"*"!==s&&"?"!==s&&"+"!==s&&i--);break;case 2:")"===s?"\\"==u[u.length-1]?u=u.slice(0,-1)+s:n=3:u+=s;break;case 3:f(),n=0,"*"!==s&&"?"!==s&&"+"!==s&&i--,u="";break;default:t("Unknown state");}else r=n,n=4;return 2===n&&t(`Unfinished custom RegExp for param "${l}"`),f(),c(),o}(e.path),n),o=u(r,{record:e,parent:t,children:[],alias:[]});return t&&!o.record.aliasOf==!t.record.aliasOf&&t.children.push(o),o}function N(e,t){const n=[],r=new Map;function o(e,n,r){const s=!r,i=function(e){return {path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:z(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||{}:{default:e.component}}}(e);i.aliasOf=r&&r.record;const l=Y(t,e),f=[i];if("alias"in e){const t="string"==typeof e.alias?[e.alias]:e.alias;for(const e of t)f.push(u({},i,{components:r?r.record.components:i.components,path:e,aliasOf:r?r.record:i}));}let h,d;for(const t of f){const{path:u}=t;if(n&&"/"!==u[0]){const e=n.record.path,r="/"===e[e.length-1]?"":"/";t.path=n.record.path+(u&&r+u);}if(h=D(t,n,l),r?r.alias.push(h):(d=d||h,d!==h&&d.alias.push(h),s&&e.name&&!Q(h)&&a(e.name)),"children"in i){const e=i.children;for(let t=0;t<e.length;t++)o(e[t],h,r&&r.children[t]);}r=r||h,c(h);}return d?()=>{a(d);}:p}function a(e){if(q(e)){const t=r.get(e);t&&(r.delete(e),n.splice(n.indexOf(t),1),t.children.forEach(a),t.alias.forEach(a));}else {const t=n.indexOf(e);t>-1&&(n.splice(t,1),e.record.name&&r.delete(e.record.name),e.children.forEach(a),e.alias.forEach(a));}}function c(e){let t=0;for(;t<n.length&&V(e,n[t])>=0;)t++;n.splice(t,0,e),e.record.name&&!Q(e)&&r.set(e.record.name,e);}return t=Y({strict:!1,end:!0,sensitive:!1},t),e.forEach((e=>o(e))),{addRoute:o,resolve:function(e,t){let o,a,c,s={};if("name"in e&&e.name){if(o=r.get(e.name),!o)throw B(1,{location:e});c=o.record.name,s=u(function(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}(t.params,o.keys.filter((e=>!e.optional)).map((e=>e.name))),e.params),a=o.stringify(s);}else if("path"in e)a=e.path,o=n.find((e=>e.re.test(a))),o&&(s=o.parse(a),c=o.record.name);else {if(o=t.name?r.get(t.name):n.find((e=>e.re.test(t.path))),!o)throw B(1,{location:e,currentLocation:t});c=o.record.name,s=u({},t.params,e.params),a=o.stringify(s);}const i=[];let l=o;for(;l;)i.unshift(l.record),l=l.parent;return {name:c,path:a,params:s,matched:i,meta:X(i)}},removeRoute:a,getRoutes:function(){return n},getRecordMatcher:function(e){return r.get(e)}}}function z(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]="boolean"==typeof n?n:n[r];return t}function Q(e){for(;e;){if(e.record.aliasOf)return !0;e=e.parent;}return !1}function X(e){return e.reduce(((e,t)=>u(e,t.meta)),{})}function Y(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}const Z=/#/g,J=/&/g,ee=/\//g,te=/=/g,ne=/\?/g,re=/\+/g,oe=/%5B/g,ae=/%5D/g,ce=/%5E/g,se=/%60/g,ie=/%7B/g,le=/%7C/g,ue=/%7D/g,fe=/%20/g;function pe(e){return encodeURI(""+e).replace(le,"|").replace(oe,"[").replace(ae,"]")}function he(e){return pe(e).replace(re,"%2B").replace(fe,"+").replace(Z,"%23").replace(J,"%26").replace(se,"`").replace(ie,"{").replace(ue,"}").replace(ce,"^")}function de(e){return null==e?"":function(e){return pe(e).replace(Z,"%23").replace(ne,"%3F")}(e).replace(ee,"%2F")}function me(e){try{return decodeURIComponent(""+e)}catch(e){}return ""+e}function ge(e){const t={};if(""===e||"?"===e)return t;const n=("?"===e[0]?e.slice(1):e).split("&");for(let e=0;e<n.length;++e){const r=n[e].replace(re," "),o=r.indexOf("="),a=me(o<0?r:r.slice(0,o)),c=o<0?null:me(r.slice(o+1));if(a in t){let e=t[a];Array.isArray(e)||(e=t[a]=[e]),e.push(c);}else t[a]=c;}return t}function ve(e){let t="";for(let n in e){const r=e[n];if(n=he(n).replace(te,"%3D"),null==r){void 0!==r&&(t+=(t.length?"&":"")+n);continue}(Array.isArray(r)?r.map((e=>e&&he(e))):[r&&he(r)]).forEach((e=>{void 0!==e&&(t+=(t.length?"&":"")+n,null!=e&&(t+="="+e));}));}return t}function ye(e){const t={};for(const n in e){const r=e[n];void 0!==r&&(t[n]=Array.isArray(r)?r.map((e=>null==e?null:""+e)):null==r?r:""+r);}return t}function be(){let e=[];return {add:function(t){return e.push(t),()=>{const n=e.indexOf(t);n>-1&&e.splice(n,1);}},list:()=>e,reset:function(){e=[];}}}function we(e,n,r){const o=()=>{e[n].delete(r);};t.onUnmounted(o),t.onDeactivated(o),t.onActivated((()=>{e[n].add(r);})),e[n].add(r);}function Ee(e,t,n,r,o){const a=r&&(r.enterCallbacks[o]=r.enterCallbacks[o]||[]);return ()=>new Promise(((c,s)=>{const i=e=>{var i;!1===e?s(B(4,{from:n,to:t})):e instanceof Error?s(e):"string"==typeof(i=e)||i&&"object"==typeof i?s(B(2,{from:t,to:e})):(a&&r.enterCallbacks[o]===a&&"function"==typeof e&&a.push(e),c());},l=e.call(r&&r.instances[o],t,n,i);let u=Promise.resolve(l);e.length<3&&(u=u.then(i)),u.catch((e=>s(e)));}))}function Re(e,t,r,o){const a=[];for(const s of e)for(const e in s.components){let i=s.components[e];if("beforeRouteEnter"===t||s.instances[e])if("object"==typeof(c=i)||"displayName"in c||"props"in c||"__vccOpts"in c){const n=(i.__vccOpts||i)[t];n&&a.push(Ee(n,r,o,s,e));}else {let c=i();a.push((()=>c.then((a=>{if(!a)return Promise.reject(new Error(`Couldn't resolve component "${e}" at "${s.path}"`));const c=(i=a).__esModule||n&&"Module"===i[Symbol.toStringTag]?a.default:a;var i;s.components[e]=c;const l=(c.__vccOpts||c)[t];return l&&Ee(l,r,o,s,e)()}))));}}var c;return a}function Ae(e){const n=t.inject(c),r=t.inject(s),o=t.computed((()=>n.resolve(t.unref(e.to)))),a=t.computed((()=>{const{matched:e}=o.value,{length:t}=e,n=e[t-1],a=r.matched;if(!n||!a.length)return -1;const c=a.findIndex(g.bind(null,n));if(c>-1)return c;const s=Oe(e[t-2]);return t>1&&Oe(n)===s&&a[a.length-1].path!==s?a.findIndex(g.bind(null,e[t-2])):c})),i=t.computed((()=>a.value>-1&&function(e,t){for(const n in t){const r=t[n],o=e[n];if("string"==typeof r){if(r!==o)return !1}else if(!Array.isArray(o)||o.length!==r.length||r.some(((e,t)=>e!==o[t])))return !1}return !0}(r.params,o.value.params))),l=t.computed((()=>a.value>-1&&a.value===r.matched.length-1&&v(r.params,o.value.params)));return {route:o,href:t.computed((()=>o.value.href)),isActive:i,isExactActive:l,navigate:function(r={}){return function(e){if(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)return;if(e.defaultPrevented)return;if(void 0!==e.button&&0!==e.button)return;if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}e.preventDefault&&e.preventDefault();return !0}(r)?n[t.unref(e.replace)?"replace":"push"](t.unref(e.to)).catch(p):Promise.resolve()}}}const ke=t.defineComponent({name:"RouterLink",props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:Ae,setup(e,{slots:n}){const r=t.reactive(Ae(e)),{options:o}=t.inject(c),a=t.computed((()=>({[Pe(e.activeClass,o.linkActiveClass,"router-link-active")]:r.isActive,[Pe(e.exactActiveClass,o.linkExactActiveClass,"router-link-exact-active")]:r.isExactActive})));return ()=>{const o=n.default&&n.default(r);return e.custom?o:t.h("a",{"aria-current":r.isExactActive?e.ariaCurrentValue:null,href:r.href,onClick:r.navigate,class:a.value},o)}}});function Oe(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const Pe=(e,t,n)=>null!=e?e:null!=t?t:n;function je(e,t){if(!e)return null;const n=e(t);return 1===n.length?n[0]:n}const xe=t.defineComponent({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},setup(e,{attrs:n,slots:r}){const c=t.inject(i),s=t.computed((()=>e.route||c.value)),l=t.inject(a,0),f=t.computed((()=>s.value.matched[l]));t.provide(a,l+1),t.provide(o,f),t.provide(i,s);const p=t.ref();return t.watch((()=>[p.value,f.value,e.name]),(([e,t,n],[r,o,a])=>{t&&(t.instances[n]=e,o&&o!==t&&e&&e===r&&(t.leaveGuards.size||(t.leaveGuards=o.leaveGuards),t.updateGuards.size||(t.updateGuards=o.updateGuards))),!e||!t||o&&g(t,o)&&r||(t.enterCallbacks[n]||[]).forEach((t=>t(e)));}),{flush:"post"}),()=>{const o=s.value,a=f.value,c=a&&a.components[e.name],i=e.name;if(!c)return je(r.default,{Component:c,route:o});const l=a.props[e.name],h=l?!0===l?o.params:"function"==typeof l?l(o):l:null,d=t.h(c,u({},h,n,{onVnodeUnmounted:e=>{e.component.isUnmounted&&(a.instances[i]=null);},ref:p}));return je(r.default,{Component:d,route:o})||d}}});function Ce(e){return e.reduce(((e,t)=>e.then((()=>t()))),Promise.resolve())}return e.RouterLink=ke,e.RouterView=xe,e.START_LOCATION=M,e.createMemoryHistory=function(e=""){let t=[],n=[""],r=0;function o(e){r++,r===n.length||n.splice(r),n.push(e);}const a={location:"",state:{},base:e,createHref:k.bind(null,e),replace(e){n.splice(r--,1),o(e);},push(e,t){o(e);},listen:e=>(t.push(e),()=>{const n=t.indexOf(e);n>-1&&t.splice(n,1);}),destroy(){t=[],n=[""],r=0;},go(e,o=!0){const a=this.location,c=e<0?E.back:E.forward;r=Math.max(0,Math.min(r+e,n.length-1)),o&&function(e,n,{direction:r,delta:o}){const a={direction:r,delta:o,type:w.pop};for(const r of t)r(e,n,a);}(this.location,a,{direction:c,delta:e});}};return Object.defineProperty(a,"location",{enumerable:!0,get:()=>n[r]}),a},e.createRouter=function(e){const n=N(e.routes,e),r=e.parseQuery||ge,o=e.stringifyQuery||ve,a=e.history,h=be(),m=be(),y=be(),b=t.shallowRef(M);let E=M;l&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const R=f.bind(null,(e=>""+e)),A=f.bind(null,de),k=f.bind(null,me);function C(e,t){if(t=u({},t||b.value),"string"==typeof e){const o=d(r,e,t.path),c=n.resolve({path:o.path},t),s=a.createHref(o.fullPath);return u(o,c,{params:k(c.params),hash:me(o.hash),redirectedFrom:void 0,href:s})}let c;if("path"in e)c=u({},e,{path:d(r,e.path,t.path).path});else {const n=u({},e.params);for(const e in n)null==n[e]&&delete n[e];c=u({},e,{params:A(e.params)}),t.params=A(t.params);}const s=n.resolve(c,t),i=e.hash||"";s.params=R(k(s.params));const l=function(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}(o,u({},e,{hash:(f=i,pe(f).replace(ie,"{").replace(ue,"}").replace(ce,"^")),path:s.path}));var f;const p=a.createHref(l);return u({fullPath:l,hash:i,query:o===ve?ye(e.query):e.query||{}},s,{redirectedFrom:void 0,href:p})}function $(e){return "string"==typeof e?d(r,e,b.value.path):u({},e)}function S(e,t){if(E!==e)return B(8,{from:t,to:e})}function L(e){return T(e)}function _(e){const t=e.matched[e.matched.length-1];if(t&&t.redirect){const{redirect:n}=t;let r="function"==typeof n?n(e):n;return "string"==typeof r&&(r=r.includes("?")||r.includes("#")?r=$(r):{path:r},r.params={}),u({query:e.query,hash:e.hash,params:e.params},r)}}function T(e,t){const n=E=C(e),r=b.value,a=e.state,c=e.force,s=!0===e.replace,i=_(n);if(i)return T(u($(i),{state:a,force:c,replace:s}),t||n);const l=n;let f;return l.redirectedFrom=t,!c&&function(e,t,n){const r=t.matched.length-1,o=n.matched.length-1;return r>-1&&r===o&&g(t.matched[r],n.matched[o])&&v(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}(o,r,n)&&(f=B(16,{to:l,from:r}),Y(r,r,!0,!1)),(f?Promise.resolve(f):I(l,r)).catch((e=>G(e)?e:Q(e,l,r))).then((e=>{if(e){if(G(e,2))return T(u($(e.to),{state:a,force:c,replace:s}),t||l)}else e=U(l,r,!0,s,a);return K(l,r,e),e}))}function F(e,t){const n=S(e,t);return n?Promise.reject(n):Promise.resolve()}function I(e,t){let n;const[r,o,a]=function(e,t){const n=[],r=[],o=[],a=Math.max(t.matched.length,e.matched.length);for(let c=0;c<a;c++){const a=t.matched[c];a&&(e.matched.find((e=>g(e,a)))?r.push(a):n.push(a));const s=e.matched[c];s&&(t.matched.find((e=>g(e,s)))||o.push(s));}return [n,r,o]}(e,t);n=Re(r.reverse(),"beforeRouteLeave",e,t);for(const o of r)o.leaveGuards.forEach((r=>{n.push(Ee(r,e,t));}));const c=F.bind(null,e,t);return n.push(c),Ce(n).then((()=>{n=[];for(const r of h.list())n.push(Ee(r,e,t));return n.push(c),Ce(n)})).then((()=>{n=Re(o,"beforeRouteUpdate",e,t);for(const r of o)r.updateGuards.forEach((r=>{n.push(Ee(r,e,t));}));return n.push(c),Ce(n)})).then((()=>{n=[];for(const r of e.matched)if(r.beforeEnter&&!t.matched.includes(r))if(Array.isArray(r.beforeEnter))for(const o of r.beforeEnter)n.push(Ee(o,e,t));else n.push(Ee(r.beforeEnter,e,t));return n.push(c),Ce(n)})).then((()=>(e.matched.forEach((e=>e.enterCallbacks={})),n=Re(a,"beforeRouteEnter",e,t),n.push(c),Ce(n)))).then((()=>{n=[];for(const r of m.list())n.push(Ee(r,e,t));return n.push(c),Ce(n)})).catch((e=>G(e,8)?e:Promise.reject(e)))}function K(e,t,n){for(const r of y.list())r(e,t,n);}function U(e,t,n,r,o){const c=S(e,t);if(c)return c;const s=t===M,i=l?history.state:{};n&&(r||s?a.replace(e.fullPath,u({scroll:s&&i&&i.scroll},o)):a.push(e.fullPath,o)),b.value=e,Y(e,t,n,s),X();}let V;function H(){V=a.listen(((e,t,n)=>{const r=C(e),o=_(r);if(o)return void T(u(o,{replace:!0}),r).catch(p);E=r;const c=b.value;var s,i;l&&(s=j(c.fullPath,n.delta),i=O(),x.set(s,i)),I(r,c).catch((e=>G(e,12)?e:G(e,2)?(T(e.to,r).then((e=>{G(e,20)&&!n.delta&&n.type===w.pop&&a.go(-1,!1);})).catch(p),Promise.reject()):(n.delta&&a.go(-n.delta,!1),Q(e,r,c)))).then((e=>{(e=e||U(r,c,!1))&&(n.delta?a.go(-n.delta,!1):n.type===w.pop&&G(e,20)&&a.go(-1,!1)),K(r,c,e);})).catch(p);}));}let W,D=be(),z=be();function Q(e,t,n){X(e);const r=z.list();return r.length?r.forEach((r=>r(e,t,n))):console.error(e),Promise.reject(e)}function X(e){W||(W=!0,H(),D.list().forEach((([t,n])=>e?n(e):t())),D.reset());}function Y(n,r,o,a){const{scrollBehavior:c}=e;if(!l||!c)return Promise.resolve();const s=!o&&function(e){const t=x.get(e);return x.delete(e),t}(j(n.fullPath,0))||(a||!o)&&history.state&&history.state.scroll||null;return t.nextTick().then((()=>c(n,r,s))).then((e=>e&&P(e))).catch((e=>Q(e,n,r)))}const Z=e=>a.go(e);let J;const ee=new Set;return {currentRoute:b,addRoute:function(e,t){let r,o;return q(e)?(r=n.getRecordMatcher(e),o=t):o=e,n.addRoute(o,r)},removeRoute:function(e){const t=n.getRecordMatcher(e);t&&n.removeRoute(t);},hasRoute:function(e){return !!n.getRecordMatcher(e)},getRoutes:function(){return n.getRoutes().map((e=>e.record))},resolve:C,options:e,push:L,replace:function(e){return L(u($(e),{replace:!0}))},go:Z,back:()=>Z(-1),forward:()=>Z(1),beforeEach:h.add,beforeResolve:m.add,afterEach:y.add,onError:z.add,isReady:function(){return W&&b.value!==M?Promise.resolve():new Promise(((e,t)=>{D.add([e,t]);}))},install(e){e.component("RouterLink",ke),e.component("RouterView",xe),e.config.globalProperties.$router=this,Object.defineProperty(e.config.globalProperties,"$route",{enumerable:!0,get:()=>t.unref(b)}),l&&!J&&b.value===M&&(J=!0,L(a.location).catch((e=>{})));const n={};for(const e in M)n[e]=t.computed((()=>b.value[e]));e.provide(c,this),e.provide(s,t.reactive(n)),e.provide(i,b);const r=e.unmount;ee.add(e),e.unmount=function(){ee.delete(e),ee.size<1&&(E=M,V&&V(),b.value=M,J=!1,W=!1),r();};}}},e.createRouterMatcher=N,e.createWebHashHistory=function(e){return (e=location.host?e||location.pathname+location.search:"").includes("#")||(e+="#"),L(e)},e.createWebHistory=L,e.isNavigationFailure=G,e.matchedRouteKey=o,e.onBeforeRouteLeave=function(e){const n=t.inject(o,{}).value;n&&we(n,"leaveGuards",e);},e.onBeforeRouteUpdate=function(e){const n=t.inject(o,{}).value;n&&we(n,"updateGuards",e);},e.parseQuery=ge,e.routeLocationKey=s,e.routerKey=c,e.routerViewLocationKey=i,e.stringifyQuery=ve,e.useLink=Ae,e.useRoute=function(){return t.inject(s)},e.useRouter=function(){return t.inject(c)},e.viewDepthKey=a,Object.defineProperty(e,"__esModule",{value:!0}),e}({},Vue);

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

  customElements.define('kiss-dialog', class extends HTMLElement {

      connectedCallback() {

          on$1(this, 'click', '[kiss-dialog-close]', e => {
              e.preventDefault();
              this.close();
          });
      }

      show() {
          this.setAttribute('open', 'true');
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

          if (!url.trim()) {
              this.innerHTML = '';
              return;
          }

          if (width && height) {
              this.innerHTML = `<canvas width="${width}" height="${height}"></canvas>`;
          }

          fetch(url).then(response => response.text()).then(content => {

              content = content.trim();

              let attrs = {
                  width: this.getAttribute('width') || '',
                  height: this.getAttribute('height') || ''
              };

              if (!content.match(/^<svg/)) {
                  this.innerHTML = '';
                  return;
              }

              this.innerHTML = content;

              let svg = this.children[0];

              Object.keys(attrs).forEach(attr => attrs[attr] && svg.setAttribute(attr, attrs[attr]));
          }).catch(() => {
              this.innerHTML = '';
          });
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
      let ret = "";

      if (hrs > 0) {
          ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
      }

      ret += "" + mins + ":" + (secs < 10 ? "0" : "");
      ret += "" + secs;
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
      var inp = document.createElement('textarea');
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
      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
  };

  let truncate = function(text, length, clamp = '...') {
      let content = text || '';
      return content.length > length ? content.slice(0, length) + clamp : content;
  };

  let stripTags = function(input, allowed) {

      // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
      allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
      const tags = /<\/?([a-z0-9]*)\b[^>]*>?/gi;
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

  var utils = {
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
            <kiss-dialog id="dialog-${id}" size="${(options && options.size) || ''}" type="${dialogtype}">
                <kiss-content class="animated fadeInUp faster">
                    ${content}
                </kiss-content>
            </kiss-dialog>
        `);

          let dialog = document.getElementById(`dialog-${id}`);

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

          let dialog = this.dialog(/*html*/`
            <div class="kiss-margin">
                ${content}
            </div>
            <div class="kiss-margin-top kiss-flex kiss-flex-middle">
                <button type="button" class="kiss-button kiss-button-primary kiss-flex-1" kiss-dialog-close>${App.i18n.get('Ok')}</button>
            </div>
        `, options, 'alert');

          dialog.show();
      },

      confirm: function (text, onconfirm, oncancel, options) {

          let dialog = this.dialog(/*html*/`
            <div class="kiss-margin-bottom">
                ${text}
            </div>
            <div class="kiss-margin-top kiss-flex kiss-flex-middle kiss-button-group">
                <button type="button" class="kiss-button-cancel kiss-button kiss-flex-1">${App.i18n.get('Cancel')}</button>
                <button type="button" class="kiss-button-confirm kiss-button kiss-button-primary kiss-flex-1">${App.i18n.get('Ok')}</button>
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
                <div class="kiss-margin kiss-text-bold">${text}</div>
                <div class="kiss-margin-bottom">
                    <input class="kiss-width-1-1 kiss-input" type="text" required>
                </div>
                <div class="kiss-margin-top kiss-flex kiss-flex-middle kiss-button-group">
                    <button type="button" class="kiss-button-cancel kiss-button kiss-flex-1">${App.i18n.get('Cancel')}</button>
                    <button type="submit" class="kiss-button-confirm kiss-button kiss-button-primary kiss-flex-1">${App.i18n.get('Ok')}</button>
                </div>
            </form>
        `, options, 'confirm');

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

          var req = [],
              ress = Array.isArray(ress) ? ress : [ress];

          for (var i = 0, len = ress.length; i < len; i++) {

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

              var script = document.createElement('script');

              script.async = true;

              script.onload = function () {
                  resolve(url);
              };

              script.onerror = function () {
                  reject(url);
              };

              script.src = (url.match(/^(\/\/|http)/) ? url : App.base(url)) + '?v=' + App.version;

              document.getElementsByTagName('head')[0].appendChild(script);

          });
      },

      getCss: function (url) {

          return new Promise(function (resolve, reject) {

              var link = document.createElement('link');
              link.type = 'text/css';
              link.rel = 'stylesheet';
              link.href = (url.match(/^(\/\/|http)/) ? url : App.base(url)) + '?v=' + App.version;

              document.getElementsByTagName('head')[0].appendChild(link);

              var img = document.createElement('img');
              img.onerror = function () {
                  resolve(url);
              };
              img.src = link.href + '?v=' + App.version;
          });
      },

      getImage: function (url) {

          return new Promise(function (resolve, reject) {

              var img = document.createElement('img');

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
          setTimeout(() => offcanvas.show());

          return offcanvas;
      },

      modal(url, data, callbacks, options) {

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
        `, options || {});

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

                  if (typeof(def.components[name]) == 'string') {
                      def.components[name] = (function(url) {
                          return Vue.defineAsyncComponent(() => App.utils.import(url));
                      })(def.components[name]);
                  }
              });

              app = Vue.createApp(def);

              Object.keys(VueView.components).forEach(name => {

                  if (typeof(VueView.components[name]) == 'string') {
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
                      }
                  }
              });

              // view router
              if (def.$router && window.VueRouter) {

                  def.$router = Object.assign({
                      history: VueRouter.createWebHashHistory(),
                      routes: []
                  }, def.$router);

                  def.$router.routes.forEach(route => {

                      if (typeof(route.component) == 'string') {
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
          ],

              nameSplit = String(name).toUpperCase().split(' '),
              initials, charIndex, colourIndex, context, dataURI;


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
          if (oldvalue != newvalue)this.render();
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

  customElements.define('app-tabs', class extends HTMLElement {

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

          this.nav.classList.add('app-tabs-nav');
          this.prepend(this.nav);

          this.render();

          this.addEventListener('click', e => {
              if (!e.target.classList.contains('app-tabs-nav-link')) return;
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
                  item.innerHTML = `<a class="app-tabs-nav-link" index="${this.tabs.length}">${this.children[i].getAttribute('caption') || 'Tab'}</a>`;
                  this.nav.append(item);

                  this.tabs.push(this.children[i]);

                  this.children[i].setAttribute('active', 'false');
                  item.setAttribute('active', 'false');
              }
          }

          this.setIndex(this.activeIndex);
      }
  });

  // General
  VueView.component('vue-draggable', Vue.defineAsyncComponent(() => {
      return new Promise(resolve => {
          App.assets.require(['app:assets/vendor/Sortable.js']).then(() => {
              App.assets.require(['app:assets/vendor/vue/components/vue-draggable.js']).then(() => resolve(window.vuedraggable));
          });
      })
  }));

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
  VueView.component('field-text', 'app:assets/vue-components/field-text.js');
  VueView.component('field-time', 'app:assets/vue-components/field-time.js');
  VueView.component('field-wysiwyg', 'app:assets/vue-components/field-wysiwyg.js');

  let html = document.documentElement;
  let App$1 = {

      base_url: (html.getAttribute("data-base") || '').replace(/\/$/, ''),
      version: (html.getAttribute("data-version") || '0.0.1'),

      _events: {},
      _paths: {},

      base: function (url) {

          let path = url.match(/^(\w+)\:/);

          if (path && this._paths[path[1]]) {
              return url.replace(path[0], this._paths[path[1]]);
          }

          return this.base_url + url;
      },

      route: function (url) {
          return this.base_url + url;
      },

      reroute: function (url) {
          location.href = url.match(/^http/) ? url : this.route(url);
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

                  if (type == 'json') {
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

  window.App = App$1;

}());
