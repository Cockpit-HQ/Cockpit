(function () {
  'use strict';

  /**
  * vue v3.5.12
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/window.Vue=function(e){var t,n;let r,i,l,s,o,a,c,u,d,p,f,h,m;/*! #__NO_SIDE_EFFECTS__ */function g(e){let t=/* @__PURE__ */Object.create(null);for(let n of e.split(","))t[n]=1;return e=>e in t}let y={},b=[],_=()=>{},S=()=>!1,x=e=>111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&(e.charCodeAt(2)>122||97>e.charCodeAt(2)),C=e=>e.startsWith("onUpdate:"),k=Object.assign,T=(e,t)=>{let n=e.indexOf(t);n>-1&&e.splice(n,1);},N=Object.prototype.hasOwnProperty,w=(e,t)=>N.call(e,t),A=Array.isArray,E=e=>"[object Map]"===V(e),I=e=>"[object Set]"===V(e),R=e=>"[object Date]"===V(e),O=e=>"[object RegExp]"===V(e),P=e=>"function"==typeof e,M=e=>"string"==typeof e,L=e=>"symbol"==typeof e,$=e=>null!==e&&"object"==typeof e,D=e=>($(e)||P(e))&&P(e.then)&&P(e.catch),F=Object.prototype.toString,V=e=>F.call(e),B=e=>V(e).slice(8,-1),U=e=>"[object Object]"===V(e),j=e=>M(e)&&"NaN"!==e&&"-"!==e[0]&&""+parseInt(e,10)===e,H=/* @__PURE__ */g(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),q=/* @__PURE__ */g("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"),W=e=>{let t=/* @__PURE__ */Object.create(null);return n=>t[n]||(t[n]=e(n))},K=/-(\w)/g,z=W(e=>e.replace(K,(e,t)=>t?t.toUpperCase():"")),J=/\B([A-Z])/g,G=W(e=>e.replace(J,"-$1").toLowerCase()),X=W(e=>e.charAt(0).toUpperCase()+e.slice(1)),Q=W(e=>e?`on${X(e)}`:""),Z=(e,t)=>!Object.is(e,t),Y=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t);},ee=(e,t,n,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:n});},et=e=>{let t=parseFloat(e);return isNaN(t)?e:t},en=e=>{let t=M(e)?Number(e):NaN;return isNaN(t)?e:t},er=()=>r||(r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}),ei=/* @__PURE__ */g("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol");function el(e){if(A(e)){let t={};for(let n=0;n<e.length;n++){let r=e[n],i=M(r)?ec(r):el(r);if(i)for(let e in i)t[e]=i[e];}return t}if(M(e)||$(e))return e}let es=/;(?![^(]*\))/g,eo=/:([^]+)/,ea=/\/\*[^]*?\*\//g;function ec(e){let t={};return e.replace(ea,"").split(es).forEach(e=>{if(e){let n=e.split(eo);n.length>1&&(t[n[0].trim()]=n[1].trim());}}),t}function eu(e){let t="";if(M(e))t=e;else if(A(e))for(let n=0;n<e.length;n++){let r=eu(e[n]);r&&(t+=r+" ");}else if($(e))for(let n in e)e[n]&&(t+=n+" ");return t.trim()}let ed=/* @__PURE__ */g("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot"),ep=/* @__PURE__ */g("svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view"),ef=/* @__PURE__ */g("annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics"),eh=/* @__PURE__ */g("area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr"),em=/* @__PURE__ */g("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");function eg(e,t){if(e===t)return !0;let n=R(e),r=R(t);if(n||r)return !!n&&!!r&&e.getTime()===t.getTime();if(n=L(e),r=L(t),n||r)return e===t;if(n=A(e),r=A(t),n||r)return !!n&&!!r&&function(e,t){if(e.length!==t.length)return !1;let n=!0;for(let r=0;n&&r<e.length;r++)n=eg(e[r],t[r]);return n}(e,t);if(n=$(e),r=$(t),n||r){if(!n||!r||Object.keys(e).length!==Object.keys(t).length)return !1;for(let n in e){let r=e.hasOwnProperty(n),i=t.hasOwnProperty(n);if(r&&!i||!r&&i||!eg(e[n],t[n]))return !1}}return String(e)===String(t)}function ey(e,t){return e.findIndex(e=>eg(e,t))}let ev=e=>!!(e&&!0===e.__v_isRef),eb=e=>M(e)?e:null==e?"":A(e)||$(e)&&(e.toString===F||!P(e.toString))?ev(e)?eb(e.value):JSON.stringify(e,e_,2):String(e),e_=(e,t)=>ev(t)?e_(e,t.value):E(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[t,n],r)=>(e[eS(t,r)+" =>"]=n,e),{})}:I(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>eS(e))}:L(t)?eS(t):!$(t)||A(t)||U(t)?t:String(t),eS=(e,t="")=>{var n;return L(e)?`Symbol(${null!=(n=e.description)?n:t})`:e};class ex{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=i,!e&&i&&(this.index=(i.scopes||(i.scopes=[])).push(this)-1);}get active(){return this._active}pause(){if(this._active){let e,t;if(this._isPaused=!0,this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause();}}resume(){if(this._active&&this._isPaused){let e,t;if(this._isPaused=!1,this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume();}}run(e){if(this._active){let t=i;try{return i=this,e()}finally{i=t;}}}on(){i=this;}off(){i=this.parent;}stop(e){if(this._active){let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);if(!this.detached&&this.parent&&!e){let e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index);}this.parent=void 0,this._active=!1;}}}let eC=/* @__PURE__ */new WeakSet;class ek{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,i&&i.active&&i.effects.push(this);}pause(){this.flags|=64;}resume(){64&this.flags&&(this.flags&=-65,eC.has(this)&&(eC.delete(this),this.trigger()));}notify(){(!(2&this.flags)||32&this.flags)&&(8&this.flags||eN(this));}run(){if(!(1&this.flags))return this.fn();this.flags|=2,eD(this),eA(this);let e=l,t=eP;l=this,eP=!0;try{return this.fn()}finally{eE(this),l=e,eP=t,this.flags&=-3;}}stop(){if(1&this.flags){for(let e=this.deps;e;e=e.nextDep)eO(e);this.deps=this.depsTail=void 0,eD(this),this.onStop&&this.onStop(),this.flags&=-2;}}trigger(){64&this.flags?eC.add(this):this.scheduler?this.scheduler():this.runIfDirty();}runIfDirty(){eI(this)&&this.run();}get dirty(){return eI(this)}}let eT=0;function eN(e,t=!1){if(e.flags|=8,t){e.next=o,o=e;return}e.next=s,s=e;}function ew(){let e;if(!(--eT>0)){if(o){let e=o;for(o=void 0;e;){let t=e.next;e.next=void 0,e.flags&=-9,e=t;}}for(;s;){let t=s;for(s=void 0;t;){let n=t.next;if(t.next=void 0,t.flags&=-9,1&t.flags)try{t.trigger();}catch(t){e||(e=t);}t=n;}}if(e)throw e}}function eA(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t;}function eE(e){let t;let n=e.depsTail,r=n;for(;r;){let e=r.prevDep;-1===r.version?(r===n&&(n=e),eO(r),function(e){let{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0);}(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=e;}e.deps=t,e.depsTail=n;}function eI(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(eR(t.dep.computed)||t.dep.version!==t.version))return !0;return !!e._dirty}function eR(e){if(4&e.flags&&!(16&e.flags)||(e.flags&=-17,e.globalVersion===eF))return;e.globalVersion=eF;let t=e.dep;if(e.flags|=2,t.version>0&&!e.isSSR&&e.deps&&!eI(e)){e.flags&=-3;return}let n=l,r=eP;l=e,eP=!0;try{eA(e);let n=e.fn(e._value);(0===t.version||Z(n,e._value))&&(e._value=n,t.version++);}catch(e){throw t.version++,e}finally{l=n,eP=r,eE(e),e.flags&=-3;}}function eO(e,t=!1){let{dep:n,prevSub:r,nextSub:i}=e;if(r&&(r.nextSub=i,e.prevSub=void 0),i&&(i.prevSub=r,e.nextSub=void 0),n.subs===e&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let e=n.computed.deps;e;e=e.nextDep)eO(e,!0);}t||--n.sc||!n.map||n.map.delete(n.key);}let eP=!0,eM=[];function eL(){eM.push(eP),eP=!1;}function e$(){let e=eM.pop();eP=void 0===e||e;}function eD(e){let{cleanup:t}=e;if(e.cleanup=void 0,t){let e=l;l=void 0;try{t();}finally{l=e;}}}let eF=0;class eV{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0;}}class eB{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0;}track(e){if(!l||!eP||l===this.computed)return;let t=this.activeLink;if(void 0===t||t.sub!==l)t=this.activeLink=new eV(l,this),l.deps?(t.prevDep=l.depsTail,l.depsTail.nextDep=t,l.depsTail=t):l.deps=l.depsTail=t,function e(t){if(t.dep.sc++,4&t.sub.flags){let n=t.dep.computed;if(n&&!t.dep.subs){n.flags|=20;for(let t=n.deps;t;t=t.nextDep)e(t);}let r=t.dep.subs;r!==t&&(t.prevSub=r,r&&(r.nextSub=t)),t.dep.subs=t;}}(t);else if(-1===t.version&&(t.version=this.version,t.nextDep)){let e=t.nextDep;e.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=e),t.prevDep=l.depsTail,t.nextDep=void 0,l.depsTail.nextDep=t,l.depsTail=t,l.deps===t&&(l.deps=e);}return t}trigger(e){this.version++,eF++,this.notify(e);}notify(e){eT++;try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify();}finally{ew();}}}let eU=/* @__PURE__ */new WeakMap,ej=Symbol(""),eH=Symbol(""),eq=Symbol("");function eW(e,t,n){if(eP&&l){let t=eU.get(e);t||eU.set(e,t=/* @__PURE__ */new Map);let r=t.get(n);r||(t.set(n,r=new eB),r.map=t,r.key=n),r.track();}}function eK(e,t,n,r,i,l){let s=eU.get(e);if(!s){eF++;return}let o=e=>{e&&e.trigger();};if(eT++,"clear"===t)s.forEach(o);else {let i=A(e),l=i&&j(n);if(i&&"length"===n){let e=Number(r);s.forEach((t,n)=>{("length"===n||n===eq||!L(n)&&n>=e)&&o(t);});}else switch((void 0!==n||s.has(void 0))&&o(s.get(n)),l&&o(s.get(eq)),t){case"add":i?l&&o(s.get("length")):(o(s.get(ej)),E(e)&&o(s.get(eH)));break;case"delete":!i&&(o(s.get(ej)),E(e)&&o(s.get(eH)));break;case"set":E(e)&&o(s.get(ej));}}ew();}function ez(e){let t=tx(e);return t===e?t:(eW(t,"iterate",eq),t_(e)?t:t.map(tk))}function eJ(e){return eW(e=tx(e),"iterate",eq),e}let eG={__proto__:null,[Symbol.iterator](){return eX(this,Symbol.iterator,tk)},concat(...e){return ez(this).concat(...e.map(e=>A(e)?ez(e):e))},entries(){return eX(this,"entries",e=>(e[1]=tk(e[1]),e))},every(e,t){return eZ(this,"every",e,t,void 0,arguments)},filter(e,t){return eZ(this,"filter",e,t,e=>e.map(tk),arguments)},find(e,t){return eZ(this,"find",e,t,tk,arguments)},findIndex(e,t){return eZ(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return eZ(this,"findLast",e,t,tk,arguments)},findLastIndex(e,t){return eZ(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return eZ(this,"forEach",e,t,void 0,arguments)},includes(...e){return e0(this,"includes",e)},indexOf(...e){return e0(this,"indexOf",e)},join(e){return ez(this).join(e)},lastIndexOf(...e){return e0(this,"lastIndexOf",e)},map(e,t){return eZ(this,"map",e,t,void 0,arguments)},pop(){return e1(this,"pop")},push(...e){return e1(this,"push",e)},reduce(e,...t){return eY(this,"reduce",e,t)},reduceRight(e,...t){return eY(this,"reduceRight",e,t)},shift(){return e1(this,"shift")},some(e,t){return eZ(this,"some",e,t,void 0,arguments)},splice(...e){return e1(this,"splice",e)},toReversed(){return ez(this).toReversed()},toSorted(e){return ez(this).toSorted(e)},toSpliced(...e){return ez(this).toSpliced(...e)},unshift(...e){return e1(this,"unshift",e)},values(){return eX(this,"values",tk)}};function eX(e,t,n){let r=eJ(e),i=r[t]();return r===e||t_(e)||(i._next=i.next,i.next=()=>{let e=i._next();return e.value&&(e.value=n(e.value)),e}),i}let eQ=Array.prototype;function eZ(e,t,n,r,i,l){let s=eJ(e),o=s!==e&&!t_(e),a=s[t];if(a!==eQ[t]){let t=a.apply(e,l);return o?tk(t):t}let c=n;s!==e&&(o?c=function(t,r){return n.call(this,tk(t),r,e)}:n.length>2&&(c=function(t,r){return n.call(this,t,r,e)}));let u=a.call(s,c,r);return o&&i?i(u):u}function eY(e,t,n,r){let i=eJ(e),l=n;return i!==e&&(t_(e)?n.length>3&&(l=function(t,r,i){return n.call(this,t,r,i,e)}):l=function(t,r,i){return n.call(this,t,tk(r),i,e)}),i[t](l,...r)}function e0(e,t,n){let r=tx(e);eW(r,"iterate",eq);let i=r[t](...n);return (-1===i||!1===i)&&tS(n[0])?(n[0]=tx(n[0]),r[t](...n)):i}function e1(e,t,n=[]){eL(),eT++;let r=tx(e)[t].apply(e,n);return ew(),e$(),r}let e2=/* @__PURE__ */g("__proto__,__v_isRef,__isVue"),e6=new Set(/* @__PURE__ */Object.getOwnPropertyNames(Symbol).filter(e=>"arguments"!==e&&"caller"!==e).map(e=>Symbol[e]).filter(L));function e3(e){L(e)||(e=String(e));let t=tx(this);return eW(t,"has",e),t.hasOwnProperty(e)}class e4{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t;}get(e,t,n){let r=this._isReadonly,i=this._isShallow;if("__v_isReactive"===t)return !r;if("__v_isReadonly"===t)return r;if("__v_isShallow"===t)return i;if("__v_raw"===t)return n===(r?i?tf:tp:i?td:tu).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;let l=A(e);if(!r){let e;if(l&&(e=eG[t]))return e;if("hasOwnProperty"===t)return e3}let s=Reflect.get(e,t,tN(e)?e:n);return (L(t)?e6.has(t):e2(t))?s:(r||eW(e,"get",t),i)?s:tN(s)?l&&j(t)?s:s.value:$(s)?r?tg(s):th(s):s}}class e8 extends e4{constructor(e=!1){super(!1,e);}set(e,t,n,r){let i=e[t];if(!this._isShallow){let t=tb(i);if(t_(n)||tb(n)||(i=tx(i),n=tx(n)),!A(e)&&tN(i)&&!tN(n))return !t&&(i.value=n,!0)}let l=A(e)&&j(t)?Number(t)<e.length:w(e,t),s=Reflect.set(e,t,n,tN(e)?e:r);return e===tx(r)&&(l?Z(n,i)&&eK(e,"set",t,n):eK(e,"add",t,n)),s}deleteProperty(e,t){let n=w(e,t);e[t];let r=Reflect.deleteProperty(e,t);return r&&n&&eK(e,"delete",t,void 0),r}has(e,t){let n=Reflect.has(e,t);return L(t)&&e6.has(t)||eW(e,"has",t),n}ownKeys(e){return eW(e,"iterate",A(e)?"length":ej),Reflect.ownKeys(e)}}class e5 extends e4{constructor(e=!1){super(!0,e);}set(e,t){return !0}deleteProperty(e,t){return !0}}let e9=/* @__PURE__ */new e8,e7=/* @__PURE__ */new e5,te=/* @__PURE__ */new e8(!0),tt=/* @__PURE__ */new e5(!0),tn=e=>e,tr=e=>Reflect.getPrototypeOf(e);function ti(e){return function(...t){return "delete"!==e&&("clear"===e?void 0:this)}}function tl(e,t){let n=function(e,t){let n={get(n){let r=this.__v_raw,i=tx(r),l=tx(n);e||(Z(n,l)&&eW(i,"get",n),eW(i,"get",l));let{has:s}=tr(i),o=t?tn:e?tT:tk;return s.call(i,n)?o(r.get(n)):s.call(i,l)?o(r.get(l)):void(r!==i&&r.get(n))},get size(){let t=this.__v_raw;return e||eW(tx(t),"iterate",ej),Reflect.get(t,"size",t)},has(t){let n=this.__v_raw,r=tx(n),i=tx(t);return e||(Z(t,i)&&eW(r,"has",t),eW(r,"has",i)),t===i?n.has(t):n.has(t)||n.has(i)},forEach(n,r){let i=this,l=i.__v_raw,s=tx(l),o=t?tn:e?tT:tk;return e||eW(s,"iterate",ej),l.forEach((e,t)=>n.call(r,o(e),o(t),i))}};return k(n,e?{add:ti("add"),set:ti("set"),delete:ti("delete"),clear:ti("clear")}:{add(e){t||t_(e)||tb(e)||(e=tx(e));let n=tx(this);return tr(n).has.call(n,e)||(n.add(e),eK(n,"add",e,e)),this},set(e,n){t||t_(n)||tb(n)||(n=tx(n));let r=tx(this),{has:i,get:l}=tr(r),s=i.call(r,e);s||(e=tx(e),s=i.call(r,e));let o=l.call(r,e);return r.set(e,n),s?Z(n,o)&&eK(r,"set",e,n):eK(r,"add",e,n),this},delete(e){let t=tx(this),{has:n,get:r}=tr(t),i=n.call(t,e);i||(e=tx(e),i=n.call(t,e)),r&&r.call(t,e);let l=t.delete(e);return i&&eK(t,"delete",e,void 0),l},clear(){let e=tx(this),t=0!==e.size,n=e.clear();return t&&eK(e,"clear",void 0,void 0),n}}),["keys","values","entries",Symbol.iterator].forEach(r=>{n[r]=function(...n){let i=this.__v_raw,l=tx(i),s=E(l),o="entries"===r||r===Symbol.iterator&&s,a=i[r](...n),c=t?tn:e?tT:tk;return e||eW(l,"iterate","keys"===r&&s?eH:ej),{next(){let{value:e,done:t}=a.next();return t?{value:e,done:t}:{value:o?[c(e[0]),c(e[1])]:c(e),done:t}},[Symbol.iterator](){return this}}};}),n}(e,t);return (t,r,i)=>"__v_isReactive"===r?!e:"__v_isReadonly"===r?e:"__v_raw"===r?t:Reflect.get(w(n,r)&&r in t?n:t,r,i)}let ts={get:/* @__PURE__ */tl(!1,!1)},to={get:/* @__PURE__ */tl(!1,!0)},ta={get:/* @__PURE__ */tl(!0,!1)},tc={get:/* @__PURE__ */tl(!0,!0)},tu=/* @__PURE__ */new WeakMap,td=/* @__PURE__ */new WeakMap,tp=/* @__PURE__ */new WeakMap,tf=/* @__PURE__ */new WeakMap;function th(e){return tb(e)?e:ty(e,!1,e9,ts,tu)}function tm(e){return ty(e,!1,te,to,td)}function tg(e){return ty(e,!0,e7,ta,tp)}function ty(e,t,n,r,i){if(!$(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;let l=i.get(e);if(l)return l;let s=e.__v_skip||!Object.isExtensible(e)?0:function(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}(B(e));if(0===s)return e;let o=new Proxy(e,2===s?r:n);return i.set(e,o),o}function tv(e){return tb(e)?tv(e.__v_raw):!!(e&&e.__v_isReactive)}function tb(e){return !!(e&&e.__v_isReadonly)}function t_(e){return !!(e&&e.__v_isShallow)}function tS(e){return !!e&&!!e.__v_raw}function tx(e){let t=e&&e.__v_raw;return t?tx(t):e}function tC(e){return !w(e,"__v_skip")&&Object.isExtensible(e)&&ee(e,"__v_skip",!0),e}let tk=e=>$(e)?th(e):e,tT=e=>$(e)?tg(e):e;function tN(e){return !!e&&!0===e.__v_isRef}function tw(e){return tE(e,!1)}function tA(e){return tE(e,!0)}function tE(e,t){return tN(e)?e:new tI(e,t)}class tI{constructor(e,t){this.dep=new eB,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:tx(e),this._value=t?e:tk(e),this.__v_isShallow=t;}get value(){return this.dep.track(),this._value}set value(e){let t=this._rawValue,n=this.__v_isShallow||t_(e)||tb(e);Z(e=n?e:tx(e),t)&&(this._rawValue=e,this._value=n?e:tk(e),this.dep.trigger());}}function tR(e){return tN(e)?e.value:e}let tO={get:(e,t,n)=>"__v_raw"===t?e:tR(Reflect.get(e,t,n)),set:(e,t,n,r)=>{let i=e[t];return tN(i)&&!tN(n)?(i.value=n,!0):Reflect.set(e,t,n,r)}};function tP(e){return tv(e)?e:new Proxy(e,tO)}class tM{constructor(e){this.__v_isRef=!0,this._value=void 0;let t=this.dep=new eB,{get:n,set:r}=e(t.track.bind(t),t.trigger.bind(t));this._get=n,this._set=r;}get value(){return this._value=this._get()}set value(e){this._set(e);}}function tL(e){return new tM(e)}class t${constructor(e,t,n){this._object=e,this._key=t,this._defaultValue=n,this.__v_isRef=!0,this._value=void 0;}get value(){let e=this._object[this._key];return this._value=void 0===e?this._defaultValue:e}set value(e){this._object[this._key]=e;}get dep(){return function(e,t){let n=eU.get(e);return n&&n.get(t)}(tx(this._object),this._key)}}class tD{constructor(e){this._getter=e,this.__v_isRef=!0,this.__v_isReadonly=!0,this._value=void 0;}get value(){return this._value=this._getter()}}function tF(e,t,n){let r=e[t];return tN(r)?r:new t$(e,t,n)}class tV{constructor(e,t,n){this.fn=e,this.setter=t,this._value=void 0,this.dep=new eB(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=eF-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=n;}notify(){if(this.flags|=16,!(8&this.flags)&&l!==this)return eN(this,!0),!0}get value(){let e=this.dep.track();return eR(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e);}}let tB={},tU=/* @__PURE__ */new WeakMap;function tj(e,t=!1,n=h){if(n){let t=tU.get(n);t||tU.set(n,t=[]),t.push(e);}}function tH(e,t=1/0,n){if(t<=0||!$(e)||e.__v_skip||(n=n||/* @__PURE__ */new Set).has(e))return e;if(n.add(e),t--,tN(e))tH(e.value,t,n);else if(A(e))for(let r=0;r<e.length;r++)tH(e[r],t,n);else if(I(e)||E(e))e.forEach(e=>{tH(e,t,n);});else if(U(e)){for(let r in e)tH(e[r],t,n);for(let r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&tH(e[r],t,n);}return e}function tq(e,t,n,r){try{return r?e(...r):e()}catch(e){tK(e,t,n);}}function tW(e,t,n,r){if(P(e)){let i=tq(e,t,n,r);return i&&D(i)&&i.catch(e=>{tK(e,t,n);}),i}if(A(e)){let i=[];for(let l=0;l<e.length;l++)i.push(tW(e[l],t,n,r));return i}}function tK(e,t,n,r=!0){t&&t.vnode;let{errorHandler:i,throwUnhandledErrorInProduction:l}=t&&t.appContext.config||y;if(t){let r=t.parent,l=t.proxy,s=`https://vuejs.org/error-reference/#runtime-${n}`;for(;r;){let t=r.ec;if(t){for(let n=0;n<t.length;n++)if(!1===t[n](e,l,s))return}r=r.parent;}if(i){eL(),tq(i,null,10,[e,l,s]),e$();return}}!function(e,t,n,r=!0,i=!1){if(i)throw e;console.error(e);}(e,0,0,r,l);}let tz=[],tJ=-1,tG=[],tX=null,tQ=0,tZ=/* @__PURE__ */Promise.resolve(),tY=null;function t0(e){let t=tY||tZ;return e?t.then(this?e.bind(this):e):t}function t1(e){if(!(1&e.flags)){let t=t8(e),n=tz[tz.length-1];!n||!(2&e.flags)&&t>=t8(n)?tz.push(e):tz.splice(function(e){let t=tJ+1,n=tz.length;for(;t<n;){let r=t+n>>>1,i=tz[r],l=t8(i);l<e||l===e&&2&i.flags?t=r+1:n=r;}return t}(t),0,e),e.flags|=1,t2();}}function t2(){tY||(tY=tZ.then(function e(t){try{for(tJ=0;tJ<tz.length;tJ++){let e=tz[tJ];!e||8&e.flags||(4&e.flags&&(e.flags&=-2),tq(e,e.i,e.i?15:14),4&e.flags||(e.flags&=-2));}}finally{for(;tJ<tz.length;tJ++){let e=tz[tJ];e&&(e.flags&=-2);}tJ=-1,tz.length=0,t4(),tY=null,(tz.length||tG.length)&&e();}}));}function t6(e){A(e)?tG.push(...e):tX&&-1===e.id?tX.splice(tQ+1,0,e):1&e.flags||(tG.push(e),e.flags|=1),t2();}function t3(e,t,n=tJ+1){for(;n<tz.length;n++){let t=tz[n];if(t&&2&t.flags){if(e&&t.id!==e.uid)continue;tz.splice(n,1),n--,4&t.flags&&(t.flags&=-2),t(),4&t.flags||(t.flags&=-2);}}}function t4(e){if(tG.length){let e=[...new Set(tG)].sort((e,t)=>t8(e)-t8(t));if(tG.length=0,tX){tX.push(...e);return}for(tQ=0,tX=e;tQ<tX.length;tQ++){let e=tX[tQ];4&e.flags&&(e.flags&=-2),8&e.flags||e(),e.flags&=-2;}tX=null,tQ=0;}}let t8=e=>null==e.id?2&e.flags?-1:1/0:e.id,t5=null,t9=null;function t7(e){let t=t5;return t5=e,t9=e&&e.type.__scopeId||null,t}function ne(e,t=t5,n){if(!t||e._n)return e;let r=(...n)=>{let i;r._d&&im(-1);let l=t7(t);try{i=e(...n);}finally{t7(l),r._d&&im(1);}return i};return r._n=!0,r._c=!0,r._d=!0,r}function nt(e,t,n,r){let i=e.dirs,l=t&&t.dirs;for(let s=0;s<i.length;s++){let o=i[s];l&&(o.oldValue=l[s].value);let a=o.dir[r];a&&(eL(),tW(a,n,8,[e.el,o,e,t]),e$());}}let nn=Symbol("_vte"),nr=e=>e.__isTeleport,ni=e=>e&&(e.disabled||""===e.disabled),nl=e=>e&&(e.defer||""===e.defer),ns=e=>"undefined"!=typeof SVGElement&&e instanceof SVGElement,no=e=>"function"==typeof MathMLElement&&e instanceof MathMLElement,na=(e,t)=>{let n=e&&e.to;return M(n)?t?t(n):null:n};function nc(e,t,n,{o:{insert:r},m:i},l=2){0===l&&r(e.targetAnchor,t,n);let{el:s,anchor:o,shapeFlag:a,children:c,props:u}=e,d=2===l;if(d&&r(s,t,n),(!d||ni(u))&&16&a)for(let e=0;e<c.length;e++)i(c[e],t,n,2);d&&r(o,t,n);}function nu(e,t){let n=e.ctx;if(n&&n.ut){let r,i;for(t?(r=e.el,i=e.anchor):(r=e.targetStart,i=e.targetAnchor);r&&r!==i;)1===r.nodeType&&r.setAttribute("data-v-owner",n.uid),r=r.nextSibling;n.ut();}}function nd(e,t,n,r){let i=t.targetStart=n(""),l=t.targetAnchor=n("");return i[nn]=l,e&&(r(i,e),r(l,e)),l}let np=Symbol("_leaveCb"),nf=Symbol("_enterCb");function nh(){let e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:/* @__PURE__ */new Map};return nY(()=>{e.isMounted=!0;}),n2(()=>{e.isUnmounting=!0;}),e}let nm=[Function,Array],ng={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:nm,onEnter:nm,onAfterEnter:nm,onEnterCancelled:nm,onBeforeLeave:nm,onLeave:nm,onAfterLeave:nm,onLeaveCancelled:nm,onBeforeAppear:nm,onAppear:nm,onAfterAppear:nm,onAppearCancelled:nm},ny=e=>{let t=e.subTree;return t.component?ny(t.component):t};function nv(e){let t=e[0];if(e.length>1){for(let n of e)if(n.type!==io){t=n;break}}return t}let nb={name:"BaseTransition",props:ng,setup(e,{slots:t}){let n=iL(),r=nh();return ()=>{let i=t.default&&nT(t.default(),!0);if(!i||!i.length)return;let l=nv(i),s=tx(e),{mode:o}=s;if(r.isLeaving)return nx(l);let a=nC(l);if(!a)return nx(l);let c=nS(a,s,r,n,e=>c=e);a.type!==io&&nk(a,c);let u=n.subTree,d=u&&nC(u);if(d&&d.type!==io&&!ib(a,d)&&ny(n).type!==io){let e=nS(d,s,r,n);if(nk(d,e),"out-in"===o&&a.type!==io)return r.isLeaving=!0,e.afterLeave=()=>{r.isLeaving=!1,8&n.job.flags||n.update(),delete e.afterLeave;},nx(l);"in-out"===o&&a.type!==io&&(e.delayLeave=(e,t,n)=>{n_(r,d)[String(d.key)]=d,e[np]=()=>{t(),e[np]=void 0,delete c.delayedLeave;},c.delayedLeave=n;});}return l}}};function n_(e,t){let{leavingVNodes:n}=e,r=n.get(t.type);return r||(r=/* @__PURE__ */Object.create(null),n.set(t.type,r)),r}function nS(e,t,n,r,i){let{appear:l,mode:s,persisted:o=!1,onBeforeEnter:a,onEnter:c,onAfterEnter:u,onEnterCancelled:d,onBeforeLeave:p,onLeave:f,onAfterLeave:h,onLeaveCancelled:m,onBeforeAppear:g,onAppear:y,onAfterAppear:b,onAppearCancelled:_}=t,S=String(e.key),x=n_(n,e),C=(e,t)=>{e&&tW(e,r,9,t);},k=(e,t)=>{let n=t[1];C(e,t),A(e)?e.every(e=>e.length<=1)&&n():e.length<=1&&n();},T={mode:s,persisted:o,beforeEnter(t){let r=a;if(!n.isMounted){if(!l)return;r=g||a;}t[np]&&t[np](!0);let i=x[S];i&&ib(e,i)&&i.el[np]&&i.el[np](),C(r,[t]);},enter(e){let t=c,r=u,i=d;if(!n.isMounted){if(!l)return;t=y||c,r=b||u,i=_||d;}let s=!1,o=e[nf]=t=>{s||(s=!0,t?C(i,[e]):C(r,[e]),T.delayedLeave&&T.delayedLeave(),e[nf]=void 0);};t?k(t,[e,o]):o();},leave(t,r){let i=String(e.key);if(t[nf]&&t[nf](!0),n.isUnmounting)return r();C(p,[t]);let l=!1,s=t[np]=n=>{l||(l=!0,r(),n?C(m,[t]):C(h,[t]),t[np]=void 0,x[i]!==e||delete x[i]);};x[i]=e,f?k(f,[t,s]):s();},clone(e){let l=nS(e,t,n,r,i);return i&&i(l),l}};return T}function nx(e){if(nH(e))return (e=iT(e)).children=null,e}function nC(e){if(!nH(e))return nr(e.type)&&e.children?nv(e.children):e;let{shapeFlag:t,children:n}=e;if(n){if(16&t)return n[0];if(32&t&&P(n.default))return n.default()}}function nk(e,t){6&e.shapeFlag&&e.component?(e.transition=t,nk(e.component.subTree,t)):128&e.shapeFlag?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t;}function nT(e,t=!1,n){let r=[],i=0;for(let l=0;l<e.length;l++){let s=e[l],o=null==n?s.key:String(n)+String(null!=s.key?s.key:l);s.type===il?(128&s.patchFlag&&i++,r=r.concat(nT(s.children,t,o))):(t||s.type!==io)&&r.push(null!=o?iT(s,{key:o}):s);}if(i>1)for(let e=0;e<r.length;e++)r[e].patchFlag=-2;return r}/*! #__NO_SIDE_EFFECTS__ */function nN(e,t){return P(e)?k({name:e.name},t,{setup:e}):e}function nw(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0];}function nA(e,t,n,r,i=!1){if(A(e)){e.forEach((e,l)=>nA(e,t&&(A(t)?t[l]:t),n,r,i));return}if(nU(r)&&!i)return;let l=4&r.shapeFlag?iW(r.component):r.el,s=i?null:l,{i:o,r:a}=e,c=t&&t.r,u=o.refs===y?o.refs={}:o.refs,d=o.setupState,p=tx(d),f=d===y?()=>!1:e=>w(p,e);if(null!=c&&c!==a&&(M(c)?(u[c]=null,f(c)&&(d[c]=null)):tN(c)&&(c.value=null)),P(a))tq(a,o,12,[s,u]);else {let t=M(a),r=tN(a);if(t||r){let o=()=>{if(e.f){let n=t?f(a)?d[a]:u[a]:a.value;i?A(n)&&T(n,l):A(n)?n.includes(l)||n.push(l):t?(u[a]=[l],f(a)&&(d[a]=u[a])):(a.value=[l],e.k&&(u[e.k]=a.value));}else t?(u[a]=s,f(a)&&(d[a]=s)):r&&(a.value=s,e.k&&(u[e.k]=s));};s?(o.id=-1,rV(o,n)):o();}}}let nE=!1,nI=()=>{nE||(console.error("Hydration completed but contains mismatches."),nE=!0);},nR=e=>e.namespaceURI.includes("svg")&&"foreignObject"!==e.tagName,nO=e=>e.namespaceURI.includes("MathML"),nP=e=>{if(1===e.nodeType){if(nR(e))return "svg";if(nO(e))return "mathml"}},nM=e=>8===e.nodeType;function nL(e){let{mt:t,p:n,o:{patchProp:r,createText:i,nextSibling:l,parentNode:s,remove:o,insert:a,createComment:c}}=e,u=(n,r,o,c,b,_=!1)=>{_=_||!!r.dynamicChildren;let S=nM(n)&&"["===n.data,x=()=>h(n,r,o,c,b,S),{type:C,ref:k,shapeFlag:T,patchFlag:N}=r,w=n.nodeType;r.el=n,-2===N&&(_=!1,r.dynamicChildren=null);let A=null;switch(C){case is:3!==w?""===r.children?(a(r.el=i(""),s(n),n),A=n):A=x():(n.data!==r.children&&(nI(),n.data=r.children),A=l(n));break;case io:y(n)?(A=l(n),g(r.el=n.content.firstChild,n,o)):A=8!==w||S?x():l(n);break;case ia:if(S&&(w=(n=l(n)).nodeType),1===w||3===w){A=n;let e=!r.children.length;for(let t=0;t<r.staticCount;t++)e&&(r.children+=1===A.nodeType?A.outerHTML:A.data),t===r.staticCount-1&&(r.anchor=A),A=l(A);return S?l(A):A}x();break;case il:A=S?f(n,r,o,c,b,_):x();break;default:if(1&T)A=1===w&&r.type.toLowerCase()===n.tagName.toLowerCase()||y(n)?d(n,r,o,c,b,_):x();else if(6&T){r.slotScopeIds=b;let e=s(n);if(A=S?m(n):nM(n)&&"teleport start"===n.data?m(n,n.data,"teleport end"):l(n),t(r,e,null,o,c,nP(e),_),nU(r)){let t;S?(t=iC(il)).anchor=A?A.previousSibling:e.lastChild:t=3===n.nodeType?iN(""):iC("div"),t.el=n,r.component.subTree=t;}}else 64&T?A=8!==w?x():r.type.hydrate(n,r,o,c,b,_,e,p):128&T&&(A=r.type.hydrate(n,r,o,c,nP(s(n)),b,_,e,u));}return null!=k&&nA(k,null,c,r),A},d=(e,t,n,i,l,s)=>{s=s||!!t.dynamicChildren;let{type:a,props:c,patchFlag:u,shapeFlag:d,dirs:f,transition:h}=t,m="input"===a||"option"===a;if(m||-1!==u){let a;f&&nt(t,null,n,"created");let b=!1;if(y(e)){b=rq(null,h)&&n&&n.vnode.props&&n.vnode.props.appear;let r=e.content.firstChild;b&&h.beforeEnter(r),g(r,e,n),t.el=e=r;}if(16&d&&!(c&&(c.innerHTML||c.textContent))){let r=p(e.firstChild,t,e,n,i,l,s);for(;r;){nF(e,1)||nI();let t=r;r=r.nextSibling,o(t);}}else if(8&d){let n=t.children;"\n"===n[0]&&("PRE"===e.tagName||"TEXTAREA"===e.tagName)&&(n=n.slice(1)),e.textContent!==n&&(nF(e,0)||nI(),e.textContent=t.children);}if(c){if(m||!s||48&u){let t=e.tagName.includes("-");for(let i in c)(m&&(i.endsWith("value")||"indeterminate"===i)||x(i)&&!H(i)||"."===i[0]||t)&&r(e,i,null,c[i],void 0,n);}else if(c.onClick)r(e,"onClick",null,c.onClick,void 0,n);else if(4&u&&tv(c.style))for(let e in c.style)c.style[e];}(a=c&&c.onVnodeBeforeMount)&&iR(a,n,t),f&&nt(t,null,n,"beforeMount"),((a=c&&c.onVnodeMounted)||f||b)&&ir(()=>{a&&iR(a,n,t),b&&h.enter(e),f&&nt(t,null,n,"mounted");},i);}return e.nextSibling},p=(e,t,r,s,o,c,d)=>{d=d||!!t.dynamicChildren;let p=t.children,f=p.length;for(let t=0;t<f;t++){let h=d?p[t]:p[t]=iw(p[t]),m=h.type===is;e?(m&&!d&&t+1<f&&iw(p[t+1]).type===is&&(a(i(e.data.slice(h.children.length)),r,l(e)),e.data=h.children),e=u(e,h,s,o,c,d)):m&&!h.children?a(h.el=i(""),r):(nF(r,1)||nI(),n(null,h,r,null,s,o,nP(r),c));}return e},f=(e,t,n,r,i,o)=>{let{slotScopeIds:u}=t;u&&(i=i?i.concat(u):u);let d=s(e),f=p(l(e),t,d,n,r,i,o);return f&&nM(f)&&"]"===f.data?l(t.anchor=f):(nI(),a(t.anchor=c("]"),d,f),f)},h=(e,t,r,i,a,c)=>{if(nF(e.parentElement,1)||nI(),t.el=null,c){let t=m(e);for(;;){let n=l(e);if(n&&n!==t)o(n);else break}}let u=l(e),d=s(e);return o(e),n(null,t,d,u,r,i,nP(d),a),u},m=(e,t="[",n="]")=>{let r=0;for(;e;)if((e=l(e))&&nM(e)&&(e.data===t&&r++,e.data===n)){if(0===r)return l(e);r--;}return e},g=(e,t,n)=>{let r=t.parentNode;r&&r.replaceChild(e,t);let i=n;for(;i;)i.vnode.el===t&&(i.vnode.el=i.subTree.el=e),i=i.parent;},y=e=>1===e.nodeType&&"TEMPLATE"===e.tagName;return [(e,t)=>{if(!t.hasChildNodes()){n(null,e,t),t4(),t._vnode=e;return}u(t.firstChild,e,null,null,null),t4(),t._vnode=e;},u]}let n$="data-allow-mismatch",nD={0:"text",1:"children",2:"class",3:"style",4:"attribute"};function nF(e,t){if(0===t||1===t)for(;e&&!e.hasAttribute(n$);)e=e.parentElement;let n=e&&e.getAttribute(n$);if(null==n)return !1;if(""===n)return !0;{let e=n.split(",");return !!(0===t&&e.includes("children"))||n.split(",").includes(nD[t])}}let nV=er().requestIdleCallback||(e=>setTimeout(e,1)),nB=er().cancelIdleCallback||(e=>clearTimeout(e)),nU=e=>!!e.type.__asyncLoader;function nj(e,t){let{ref:n,props:r,children:i,ce:l}=t.vnode,s=iC(e,r,i);return s.ref=n,s.ce=l,delete t.vnode.ce,s}let nH=e=>e.type.__isKeepAlive;function nq(e,t){return A(e)?e.some(e=>nq(e,t)):M(e)?e.split(",").includes(t):!!O(e)&&(e.lastIndex=0,e.test(t))}function nW(e,t){nz(e,"a",t);}function nK(e,t){nz(e,"da",t);}function nz(e,t,n=iM){let r=e.__wdc||(e.__wdc=()=>{let t=n;for(;t;){if(t.isDeactivated)return;t=t.parent;}return e()});if(nX(t,r,n),n){let e=n.parent;for(;e&&e.parent;)nH(e.parent.vnode)&&function(e,t,n,r){let i=nX(t,e,r,!0);n6(()=>{T(r[t],i);},n);}(r,t,n,e),e=e.parent;}}function nJ(e){e.shapeFlag&=-257,e.shapeFlag&=-513;}function nG(e){return 128&e.shapeFlag?e.ssContent:e}function nX(e,t,n=iM,r=!1){if(n){let i=n[e]||(n[e]=[]),l=t.__weh||(t.__weh=(...r)=>{eL();let i=i$(n),l=tW(t,n,e,r);return i(),e$(),l});return r?i.unshift(l):i.push(l),l}}let nQ=e=>(t,n=iM)=>{iV&&"sp"!==e||nX(e,(...e)=>t(...e),n);},nZ=nQ("bm"),nY=nQ("m"),n0=nQ("bu"),n1=nQ("u"),n2=nQ("bum"),n6=nQ("um"),n3=nQ("sp"),n4=nQ("rtg"),n8=nQ("rtc");function n5(e,t=iM){nX("ec",e,t);}let n9="components",n7=Symbol.for("v-ndc");function re(e,t,n=!0,r=!1){let i=t5||iM;if(i){let n=i.type;if(e===n9){let e=iK(n,!1);if(e&&(e===t||e===z(t)||e===X(z(t))))return n}let l=rt(i[e]||n[e],t)||rt(i.appContext[e],t);return !l&&r?n:l}}function rt(e,t){return e&&(e[t]||e[z(t)]||e[X(z(t))])}let rn=e=>e?iF(e)?iW(e):rn(e.parent):null,rr=/* @__PURE__ */k(/* @__PURE__ */Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>rn(e.parent),$root:e=>rn(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>rd(e),$forceUpdate:e=>e.f||(e.f=()=>{t1(e.update);}),$nextTick:e=>e.n||(e.n=t0.bind(e.proxy)),$watch:e=>rQ.bind(e)}),ri=(e,t)=>e!==y&&!e.__isScriptSetup&&w(e,t),rl={get({_:e},t){let n,r,i;if("__v_skip"===t)return !0;let{ctx:l,setupState:s,data:o,props:a,accessCache:c,type:u,appContext:d}=e;if("$"!==t[0]){let r=c[t];if(void 0!==r)switch(r){case 1:return s[t];case 2:return o[t];case 4:return l[t];case 3:return a[t]}else {if(ri(s,t))return c[t]=1,s[t];if(o!==y&&w(o,t))return c[t]=2,o[t];if((n=e.propsOptions[0])&&w(n,t))return c[t]=3,a[t];if(l!==y&&w(l,t))return c[t]=4,l[t];rc&&(c[t]=0);}}let p=rr[t];return p?("$attrs"===t&&eW(e.attrs,"get",""),p(e)):(r=u.__cssModules)&&(r=r[t])?r:l!==y&&w(l,t)?(c[t]=4,l[t]):w(i=d.config.globalProperties,t)?i[t]:void 0},set({_:e},t,n){let{data:r,setupState:i,ctx:l}=e;return ri(i,t)?(i[t]=n,!0):r!==y&&w(r,t)?(r[t]=n,!0):!w(e.props,t)&&!("$"===t[0]&&t.slice(1) in e)&&(l[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:i,propsOptions:l}},s){let o;return !!n[s]||e!==y&&w(e,s)||ri(t,s)||(o=l[0])&&w(o,s)||w(r,s)||w(rr,s)||w(i.config.globalProperties,s)},defineProperty(e,t,n){return null!=n.get?e._.accessCache[t]=0:w(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}},rs=/* @__PURE__ */k({},rl,{get(e,t){if(t!==Symbol.unscopables)return rl.get(e,t,e)},has:(e,t)=>"_"!==t[0]&&!ei(t)});function ro(){let e=iL();return e.setupContext||(e.setupContext=iq(e))}function ra(e){return A(e)?e.reduce((e,t)=>(e[t]=null,e),{}):e}let rc=!0;function ru(e,t,n){tW(A(e)?e.map(e=>e.bind(t.proxy)):e.bind(t.proxy),t,n);}function rd(e){let t;let n=e.type,{mixins:r,extends:i}=n,{mixins:l,optionsCache:s,config:{optionMergeStrategies:o}}=e.appContext,a=s.get(n);return a?t=a:l.length||r||i?(t={},l.length&&l.forEach(e=>rp(t,e,o,!0)),rp(t,n,o)):t=n,$(n)&&s.set(n,t),t}function rp(e,t,n,r=!1){let{mixins:i,extends:l}=t;for(let s in l&&rp(e,l,n,!0),i&&i.forEach(t=>rp(e,t,n,!0)),t)if(r&&"expose"===s);else {let r=rf[s]||n&&n[s];e[s]=r?r(e[s],t[s]):t[s];}return e}let rf={data:rh,props:rv,emits:rv,methods:ry,computed:ry,beforeCreate:rg,created:rg,beforeMount:rg,mounted:rg,beforeUpdate:rg,updated:rg,beforeDestroy:rg,beforeUnmount:rg,destroyed:rg,unmounted:rg,activated:rg,deactivated:rg,errorCaptured:rg,serverPrefetch:rg,components:ry,directives:ry,watch:function(e,t){if(!e)return t;if(!t)return e;let n=k(/* @__PURE__ */Object.create(null),e);for(let r in t)n[r]=rg(e[r],t[r]);return n},provide:rh,inject:function(e,t){return ry(rm(e),rm(t))}};function rh(e,t){return t?e?function(){return k(P(e)?e.call(this,this):e,P(t)?t.call(this,this):t)}:t:e}function rm(e){if(A(e)){let t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function rg(e,t){return e?[...new Set([].concat(e,t))]:t}function ry(e,t){return e?k(/* @__PURE__ */Object.create(null),e,t):t}function rv(e,t){return e?A(e)&&A(t)?[.../* @__PURE__ */new Set([...e,...t])]:k(/* @__PURE__ */Object.create(null),ra(e),ra(null!=t?t:{})):t}function rb(){return {app:null,config:{isNativeTag:S,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:/* @__PURE__ */Object.create(null),optionsCache:/* @__PURE__ */new WeakMap,propsCache:/* @__PURE__ */new WeakMap,emitsCache:/* @__PURE__ */new WeakMap}}let r_=0,rS=null;function rx(e,t){if(iM){let n=iM.provides,r=iM.parent&&iM.parent.provides;r===n&&(n=iM.provides=Object.create(r)),n[e]=t;}}function rC(e,t,n=!1){let r=iM||t5;if(r||rS){let i=rS?rS._context.provides:r?null==r.parent?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(i&&e in i)return i[e];if(arguments.length>1)return n&&P(t)?t.call(r&&r.proxy):t}}let rk={},rT=()=>Object.create(rk),rN=e=>Object.getPrototypeOf(e)===rk;function rw(e,t,n,r){let i;let[l,s]=e.propsOptions,o=!1;if(t)for(let a in t){let c;if(H(a))continue;let u=t[a];l&&w(l,c=z(a))?s&&s.includes(c)?(i||(i={}))[c]=u:n[c]=u:r1(e.emitsOptions,a)||a in r&&u===r[a]||(r[a]=u,o=!0);}if(s){let t=tx(n),r=i||y;for(let i=0;i<s.length;i++){let o=s[i];n[o]=rA(l,t,o,r[o],e,!w(r,o));}}return o}function rA(e,t,n,r,i,l){let s=e[n];if(null!=s){let e=w(s,"default");if(e&&void 0===r){let e=s.default;if(s.type!==Function&&!s.skipFactory&&P(e)){let{propsDefaults:l}=i;if(n in l)r=l[n];else {let s=i$(i);r=l[n]=e.call(null,t),s();}}else r=e;i.ce&&i.ce._setProp(n,r);}s[0]&&(l&&!e?r=!1:s[1]&&(""===r||r===G(n))&&(r=!0));}return r}let rE=/* @__PURE__ */new WeakMap;function rI(e){return !("$"===e[0]||H(e))}let rR=e=>"_"===e[0]||"$stable"===e,rO=e=>A(e)?e.map(iw):[iw(e)],rP=(e,t,n)=>{if(t._n)return t;let r=ne((...e)=>rO(t(...e)),n);return r._c=!1,r},rM=(e,t,n)=>{let r=e._ctx;for(let n in e){if(rR(n))continue;let i=e[n];if(P(i))t[n]=rP(n,i,r);else if(null!=i){let e=rO(i);t[n]=()=>e;}}},rL=(e,t)=>{let n=rO(t);e.slots.default=()=>n;},r$=(e,t,n)=>{for(let r in t)(n||"_"!==r)&&(e[r]=t[r]);},rD=(e,t,n)=>{let r=e.slots=rT();if(32&e.vnode.shapeFlag){let e=t._;e?(r$(r,t,n),n&&ee(r,"_",e,!0)):rM(t,r);}else t&&rL(e,t);},rF=(e,t,n)=>{let{vnode:r,slots:i}=e,l=!0,s=y;if(32&r.shapeFlag){let e=t._;e?n&&1===e?l=!1:r$(i,t,n):(l=!t.$stable,rM(t,i)),s=t;}else t&&(rL(e,t),s={default:1});if(l)for(let e in i)rR(e)||null!=s[e]||delete i[e];},rV=ir;function rB(e){return rU(e,nL)}function rU(e,t){var n;let r,i;er().__VUE__=!0;let{insert:l,remove:s,patchProp:o,createElement:a,createText:u,createComment:d,setText:p,setElementText:f,parentNode:h,nextSibling:m,setScopeId:g=_,insertStaticContent:S}=e,x=(e,t,n,r=null,i=null,l=null,s,o=null,a=!!t.dynamicChildren)=>{if(e===t)return;e&&!ib(e,t)&&(r=eo(e),et(e,i,l,!0),e=null),-2===t.patchFlag&&(a=!1,t.dynamicChildren=null);let{type:c,ref:u,shapeFlag:d}=t;switch(c){case is:C(e,t,n,r);break;case io:T(e,t,n,r);break;case ia:null==e&&N(t,n,r,s);break;case il:U(e,t,n,r,i,l,s,o,a);break;default:1&d?R(e,t,n,r,i,l,s,o,a):6&d?j(e,t,n,r,i,l,s,o,a):64&d?c.process(e,t,n,r,i,l,s,o,a,eu):128&d&&c.process(e,t,n,r,i,l,s,o,a,eu);}null!=u&&i&&nA(u,e&&e.ref,l,t||e,!t);},C=(e,t,n,r)=>{if(null==e)l(t.el=u(t.children),n,r);else {let n=t.el=e.el;t.children!==e.children&&p(n,t.children);}},T=(e,t,n,r)=>{null==e?l(t.el=d(t.children||""),n,r):t.el=e.el;},N=(e,t,n,r)=>{[e.el,e.anchor]=S(e.children,t,n,r,e.el,e.anchor);},E=({el:e,anchor:t},n,r)=>{let i;for(;e&&e!==t;)i=m(e),l(e,n,r),e=i;l(t,n,r);},I=({el:e,anchor:t})=>{let n;for(;e&&e!==t;)n=m(e),s(e),e=n;s(t);},R=(e,t,n,r,i,l,s,o,a)=>{"svg"===t.type?s="svg":"math"===t.type&&(s="mathml"),null==e?O(t,n,r,i,l,s,o,a):F(e,t,i,l,s,o,a);},O=(e,t,n,r,i,s,c,u)=>{let d,p;let{props:h,shapeFlag:m,transition:g,dirs:y}=e;if(d=e.el=a(e.type,s,h&&h.is,h),8&m?f(d,e.children):16&m&&L(e.children,d,null,r,i,rj(e,s),c,u),y&&nt(e,null,r,"created"),M(d,e,e.scopeId,c,r),h){for(let e in h)"value"===e||H(e)||o(d,e,null,h[e],s,r);"value"in h&&o(d,"value",null,h.value,s),(p=h.onVnodeBeforeMount)&&iR(p,r,e);}y&&nt(e,null,r,"beforeMount");let b=rq(i,g);b&&g.beforeEnter(d),l(d,t,n),((p=h&&h.onVnodeMounted)||b||y)&&rV(()=>{p&&iR(p,r,e),b&&g.enter(d),y&&nt(e,null,r,"mounted");},i);},M=(e,t,n,r,i)=>{if(n&&g(e,n),r)for(let t=0;t<r.length;t++)g(e,r[t]);if(i){let n=i.subTree;if(t===n||r5(n.type)&&(n.ssContent===t||n.ssFallback===t)){let t=i.vnode;M(e,t,t.scopeId,t.slotScopeIds,i.parent);}}},L=(e,t,n,r,i,l,s,o,a=0)=>{for(let c=a;c<e.length;c++)x(null,e[c]=o?iA(e[c]):iw(e[c]),t,n,r,i,l,s,o);},F=(e,t,n,r,i,l,s)=>{let a;let c=t.el=e.el,{patchFlag:u,dynamicChildren:d,dirs:p}=t;u|=16&e.patchFlag;let h=e.props||y,m=t.props||y;if(n&&rH(n,!1),(a=m.onVnodeBeforeUpdate)&&iR(a,n,t,e),p&&nt(t,e,n,"beforeUpdate"),n&&rH(n,!0),(h.innerHTML&&null==m.innerHTML||h.textContent&&null==m.textContent)&&f(c,""),d?V(e.dynamicChildren,d,c,n,r,rj(t,i),l):s||X(e,t,c,null,n,r,rj(t,i),l,!1),u>0){if(16&u)B(c,h,m,n,i);else if(2&u&&h.class!==m.class&&o(c,"class",null,m.class,i),4&u&&o(c,"style",h.style,m.style,i),8&u){let e=t.dynamicProps;for(let t=0;t<e.length;t++){let r=e[t],l=h[r],s=m[r];(s!==l||"value"===r)&&o(c,r,l,s,i,n);}}1&u&&e.children!==t.children&&f(c,t.children);}else s||null!=d||B(c,h,m,n,i);((a=m.onVnodeUpdated)||p)&&rV(()=>{a&&iR(a,n,t,e),p&&nt(t,e,n,"updated");},r);},V=(e,t,n,r,i,l,s)=>{for(let o=0;o<t.length;o++){let a=e[o],c=t[o],u=a.el&&(a.type===il||!ib(a,c)||70&a.shapeFlag)?h(a.el):n;x(a,c,u,null,r,i,l,s,!0);}},B=(e,t,n,r,i)=>{if(t!==n){if(t!==y)for(let l in t)H(l)||l in n||o(e,l,t[l],null,i,r);for(let l in n){if(H(l))continue;let s=n[l],a=t[l];s!==a&&"value"!==l&&o(e,l,a,s,i,r);}"value"in n&&o(e,"value",t.value,n.value,i);}},U=(e,t,n,r,i,s,o,a,c)=>{let d=t.el=e?e.el:u(""),p=t.anchor=e?e.anchor:u(""),{patchFlag:f,dynamicChildren:h,slotScopeIds:m}=t;m&&(a=a?a.concat(m):m),null==e?(l(d,n,r),l(p,n,r),L(t.children||[],n,p,i,s,o,a,c)):f>0&&64&f&&h&&e.dynamicChildren?(V(e.dynamicChildren,h,n,i,s,o,a),(null!=t.key||i&&t===i.subTree)&&rW(e,t,!0)):X(e,t,n,p,i,s,o,a,c);},j=(e,t,n,r,i,l,s,o,a)=>{t.slotScopeIds=o,null==e?512&t.shapeFlag?i.ctx.activate(t,n,r,s,a):q(t,n,r,i,l,s,a):W(e,t,a);},q=(e,t,n,r,i,l,s)=>{let o=e.component=function(e,t,n){let r=e.type,i=(t?t.appContext:e.appContext)||iO,l={uid:iP++,vnode:e,type:r,parent:t,appContext:i,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new ex(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(i.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:function e(t,n,r=!1){let i=r?rE:n.propsCache,l=i.get(t);if(l)return l;let s=t.props,o={},a=[],c=!1;if(!P(t)){let i=t=>{c=!0;let[r,i]=e(t,n,!0);k(o,r),i&&a.push(...i);};!r&&n.mixins.length&&n.mixins.forEach(i),t.extends&&i(t.extends),t.mixins&&t.mixins.forEach(i);}if(!s&&!c)return $(t)&&i.set(t,b),b;if(A(s))for(let e=0;e<s.length;e++){let t=z(s[e]);rI(t)&&(o[t]=y);}else if(s)for(let e in s){let t=z(e);if(rI(t)){let n=s[e],r=o[t]=A(n)||P(n)?{type:n}:k({},n),i=r.type,l=!1,c=!0;if(A(i))for(let e=0;e<i.length;++e){let t=i[e],n=P(t)&&t.name;if("Boolean"===n){l=!0;break}"String"===n&&(c=!1);}else l=P(i)&&"Boolean"===i.name;r[0]=l,r[1]=c,(l||w(r,"default"))&&a.push(t);}}let u=[o,a];return $(t)&&i.set(t,u),u}(r,i),emitsOptions:function e(t,n,r=!1){let i=n.emitsCache,l=i.get(t);if(void 0!==l)return l;let s=t.emits,o={},a=!1;if(!P(t)){let i=t=>{let r=e(t,n,!0);r&&(a=!0,k(o,r));};!r&&n.mixins.length&&n.mixins.forEach(i),t.extends&&i(t.extends),t.mixins&&t.mixins.forEach(i);}return s||a?(A(s)?s.forEach(e=>o[e]=null):k(o,s),$(t)&&i.set(t,o),o):($(t)&&i.set(t,null),null)}(r,i),emit:null,emitted:null,propsDefaults:y,inheritAttrs:r.inheritAttrs,ctx:y,data:y,props:y,attrs:y,slots:y,refs:y,setupState:y,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return l.ctx={_:l},l.root=t?t.root:l,l.emit=r0.bind(null,l),e.ce&&e.ce(l),l}(e,r,i);nH(e)&&(o.ctx.renderer=eu),function(e,t=!1,n=!1){t&&c(t);let{props:r,children:i}=e.vnode,l=iF(e);(function(e,t,n,r=!1){let i={},l=rT();for(let n in e.propsDefaults=/* @__PURE__ */Object.create(null),rw(e,t,i,l),e.propsOptions[0])n in i||(i[n]=void 0);n?e.props=r?i:tm(i):e.type.props?e.props=i:e.props=l,e.attrs=l;})(e,r,l,t),rD(e,i,n),l&&function(e,t){let n=e.type;e.accessCache=/* @__PURE__ */Object.create(null),e.proxy=new Proxy(e.ctx,rl);let{setup:r}=n;if(r){eL();let n=e.setupContext=r.length>1?iq(e):null,i=i$(e),l=tq(r,e,0,[e.props,n]),s=D(l);if(e$(),i(),(s||e.sp)&&!nU(e)&&nw(e),s){if(l.then(iD,iD),t)return l.then(n=>{iB(e,n,t);}).catch(t=>{tK(t,e,0);});e.asyncDep=l;}else iB(e,l,t);}else ij(e,t);}(e,t),t&&c(!1);}(o,!1,s),o.asyncDep?(i&&i.registerDep(o,K,s),e.el||T(null,o.subTree=iC(io),t,n)):K(o,e,t,n,i,l,s);},W=(e,t,n)=>{let r=t.component=e.component;if(function(e,t,n){let{props:r,children:i,component:l}=e,{props:s,children:o,patchFlag:a}=t,c=l.emitsOptions;if(t.dirs||t.transition)return !0;if(!n||!(a>=0))return (!!i||!!o)&&(!o||!o.$stable)||r!==s&&(r?!s||r4(r,s,c):!!s);if(1024&a)return !0;if(16&a)return r?r4(r,s,c):!!s;if(8&a){let e=t.dynamicProps;for(let t=0;t<e.length;t++){let n=e[t];if(s[n]!==r[n]&&!r1(c,n))return !0}}return !1}(e,t,n)){if(r.asyncDep&&!r.asyncResolved){J(r,t,n);return}r.next=t,r.update();}else t.el=e.el,r.vnode=t;},K=(e,t,n,r,l,s,o)=>{let a=()=>{if(e.isMounted){let t,{next:n,bu:r,u:i,parent:c,vnode:u}=e;{let t=function e(t){let n=t.subTree.component;if(n)return n.asyncDep&&!n.asyncResolved?n:e(n)}(e);if(t){n&&(n.el=u.el,J(e,n,o)),t.asyncDep.then(()=>{e.isUnmounted||a();});return}}let d=n;rH(e,!1),n?(n.el=u.el,J(e,n,o)):n=u,r&&Y(r),(t=n.props&&n.props.onVnodeBeforeUpdate)&&iR(t,c,n,u),rH(e,!0);let p=r2(e),f=e.subTree;e.subTree=p,x(f,p,h(f.el),eo(f),e,l,s),n.el=p.el,null===d&&r8(e,p.el),i&&rV(i,l),(t=n.props&&n.props.onVnodeUpdated)&&rV(()=>iR(t,c,n,u),l);}else {let o;let{el:a,props:c}=t,{bm:u,m:d,parent:p,root:f,type:h}=e,m=nU(t);if(rH(e,!1),u&&Y(u),!m&&(o=c&&c.onVnodeBeforeMount)&&iR(o,p,t),rH(e,!0),a&&i){let t=()=>{e.subTree=r2(e),i(a,e.subTree,e,l,null);};m&&h.__asyncHydrate?h.__asyncHydrate(a,e,t):t();}else {f.ce&&f.ce._injectChildStyle(h);let i=e.subTree=r2(e);x(null,i,n,r,e,l,s),t.el=i.el;}if(d&&rV(d,l),!m&&(o=c&&c.onVnodeMounted)){let e=t;rV(()=>iR(o,p,e),l);}(256&t.shapeFlag||p&&nU(p.vnode)&&256&p.vnode.shapeFlag)&&e.a&&rV(e.a,l),e.isMounted=!0,t=n=r=null;}};e.scope.on();let c=e.effect=new ek(a);e.scope.off();let u=e.update=c.run.bind(c),d=e.job=c.runIfDirty.bind(c);d.i=e,d.id=e.uid,c.scheduler=()=>t1(d),rH(e,!0),u();},J=(e,t,n)=>{t.component=e;let r=e.vnode.props;e.vnode=t,e.next=null,function(e,t,n,r){let{props:i,attrs:l,vnode:{patchFlag:s}}=e,o=tx(i),[a]=e.propsOptions,c=!1;if((r||s>0)&&!(16&s)){if(8&s){let n=e.vnode.dynamicProps;for(let r=0;r<n.length;r++){let s=n[r];if(r1(e.emitsOptions,s))continue;let u=t[s];if(a){if(w(l,s))u!==l[s]&&(l[s]=u,c=!0);else {let t=z(s);i[t]=rA(a,o,t,u,e,!1);}}else u!==l[s]&&(l[s]=u,c=!0);}}}else {let r;for(let s in rw(e,t,i,l)&&(c=!0),o)t&&(w(t,s)||(r=G(s))!==s&&w(t,r))||(a?n&&(void 0!==n[s]||void 0!==n[r])&&(i[s]=rA(a,o,s,void 0,e,!0)):delete i[s]);if(l!==o)for(let e in l)t&&w(t,e)||(delete l[e],c=!0);}c&&eK(e.attrs,"set","");}(e,t.props,r,n),rF(e,t.children,n),eL(),t3(e),e$();},X=(e,t,n,r,i,l,s,o,a=!1)=>{let c=e&&e.children,u=e?e.shapeFlag:0,d=t.children,{patchFlag:p,shapeFlag:h}=t;if(p>0){if(128&p){Z(c,d,n,r,i,l,s,o,a);return}if(256&p){Q(c,d,n,r,i,l,s,o,a);return}}8&h?(16&u&&es(c,i,l),d!==c&&f(n,d)):16&u?16&h?Z(c,d,n,r,i,l,s,o,a):es(c,i,l,!0):(8&u&&f(n,""),16&h&&L(d,n,r,i,l,s,o,a));},Q=(e,t,n,r,i,l,s,o,a)=>{let c;e=e||b,t=t||b;let u=e.length,d=t.length,p=Math.min(u,d);for(c=0;c<p;c++){let r=t[c]=a?iA(t[c]):iw(t[c]);x(e[c],r,n,null,i,l,s,o,a);}u>d?es(e,i,l,!0,!1,p):L(t,n,r,i,l,s,o,a,p);},Z=(e,t,n,r,i,l,s,o,a)=>{let c=0,u=t.length,d=e.length-1,p=u-1;for(;c<=d&&c<=p;){let r=e[c],u=t[c]=a?iA(t[c]):iw(t[c]);if(ib(r,u))x(r,u,n,null,i,l,s,o,a);else break;c++;}for(;c<=d&&c<=p;){let r=e[d],c=t[p]=a?iA(t[p]):iw(t[p]);if(ib(r,c))x(r,c,n,null,i,l,s,o,a);else break;d--,p--;}if(c>d){if(c<=p){let e=p+1,d=e<u?t[e].el:r;for(;c<=p;)x(null,t[c]=a?iA(t[c]):iw(t[c]),n,d,i,l,s,o,a),c++;}}else if(c>p)for(;c<=d;)et(e[c],i,l,!0),c++;else {let f;let h=c,m=c,g=/* @__PURE__ */new Map;for(c=m;c<=p;c++){let e=t[c]=a?iA(t[c]):iw(t[c]);null!=e.key&&g.set(e.key,c);}let y=0,_=p-m+1,S=!1,C=0,k=Array(_);for(c=0;c<_;c++)k[c]=0;for(c=h;c<=d;c++){let r;let u=e[c];if(y>=_){et(u,i,l,!0);continue}if(null!=u.key)r=g.get(u.key);else for(f=m;f<=p;f++)if(0===k[f-m]&&ib(u,t[f])){r=f;break}void 0===r?et(u,i,l,!0):(k[r-m]=c+1,r>=C?C=r:S=!0,x(u,t[r],n,null,i,l,s,o,a),y++);}let T=S?function(e){let t,n,r,i,l;let s=e.slice(),o=[0],a=e.length;for(t=0;t<a;t++){let a=e[t];if(0!==a){if(e[n=o[o.length-1]]<a){s[t]=n,o.push(t);continue}for(r=0,i=o.length-1;r<i;)e[o[l=r+i>>1]]<a?r=l+1:i=l;a<e[o[r]]&&(r>0&&(s[t]=o[r-1]),o[r]=t);}}for(r=o.length,i=o[r-1];r-- >0;)o[r]=i,i=s[i];return o}(k):b;for(f=T.length-1,c=_-1;c>=0;c--){let e=m+c,d=t[e],p=e+1<u?t[e+1].el:r;0===k[c]?x(null,d,n,p,i,l,s,o,a):S&&(f<0||c!==T[f]?ee(d,n,p,2):f--);}}},ee=(e,t,n,r,i=null)=>{let{el:s,type:o,transition:a,children:c,shapeFlag:u}=e;if(6&u){ee(e.component.subTree,t,n,r);return}if(128&u){e.suspense.move(t,n,r);return}if(64&u){o.move(e,t,n,eu);return}if(o===il){l(s,t,n);for(let e=0;e<c.length;e++)ee(c[e],t,n,r);l(e.anchor,t,n);return}if(o===ia){E(e,t,n);return}if(2!==r&&1&u&&a){if(0===r)a.beforeEnter(s),l(s,t,n),rV(()=>a.enter(s),i);else {let{leave:e,delayLeave:r,afterLeave:i}=a,o=()=>l(s,t,n),c=()=>{e(s,()=>{o(),i&&i();});};r?r(s,o,c):c();}}else l(s,t,n);},et=(e,t,n,r=!1,i=!1)=>{let l;let{type:s,props:o,ref:a,children:c,dynamicChildren:u,shapeFlag:d,patchFlag:p,dirs:f,cacheIndex:h}=e;if(-2===p&&(i=!1),null!=a&&nA(a,null,n,e,!0),null!=h&&(t.renderCache[h]=void 0),256&d){t.ctx.deactivate(e);return}let m=1&d&&f,g=!nU(e);if(g&&(l=o&&o.onVnodeBeforeUnmount)&&iR(l,t,e),6&d)el(e.component,n,r);else {if(128&d){e.suspense.unmount(n,r);return}m&&nt(e,null,t,"beforeUnmount"),64&d?e.type.remove(e,t,n,eu,r):u&&!u.hasOnce&&(s!==il||p>0&&64&p)?es(u,t,n,!1,!0):(s===il&&384&p||!i&&16&d)&&es(c,t,n),r&&en(e);}(g&&(l=o&&o.onVnodeUnmounted)||m)&&rV(()=>{l&&iR(l,t,e),m&&nt(e,null,t,"unmounted");},n);},en=e=>{let{type:t,el:n,anchor:r,transition:i}=e;if(t===il){ei(n,r);return}if(t===ia){I(e);return}let l=()=>{s(n),i&&!i.persisted&&i.afterLeave&&i.afterLeave();};if(1&e.shapeFlag&&i&&!i.persisted){let{leave:t,delayLeave:r}=i,s=()=>t(n,l);r?r(e.el,l,s):s();}else l();},ei=(e,t)=>{let n;for(;e!==t;)n=m(e),s(e),e=n;s(t);},el=(e,t,n)=>{let{bum:r,scope:i,job:l,subTree:s,um:o,m:a,a:c}=e;rK(a),rK(c),r&&Y(r),i.stop(),l&&(l.flags|=8,et(s,e,t,n)),o&&rV(o,t),rV(()=>{e.isUnmounted=!0;},t),t&&t.pendingBranch&&!t.isUnmounted&&e.asyncDep&&!e.asyncResolved&&e.suspenseId===t.pendingId&&(t.deps--,0===t.deps&&t.resolve());},es=(e,t,n,r=!1,i=!1,l=0)=>{for(let s=l;s<e.length;s++)et(e[s],t,n,r,i);},eo=e=>{if(6&e.shapeFlag)return eo(e.component.subTree);if(128&e.shapeFlag)return e.suspense.next();let t=m(e.anchor||e.el),n=t&&t[nn];return n?m(n):t},ea=!1,ec=(e,t,n)=>{null==e?t._vnode&&et(t._vnode,null,null,!0):x(t._vnode||null,e,t,null,null,null,n),t._vnode=e,ea||(ea=!0,t3(),t4(),ea=!1);},eu={p:x,um:et,m:ee,r:en,mt:q,mc:L,pc:X,pbc:V,n:eo,o:e};return t&&([r,i]=t(eu)),{render:ec,hydrate:r,createApp:(n=r,function(e,t=null){P(e)||(e=k({},e)),null==t||$(t)||(t=null);let r=rb(),i=/* @__PURE__ */new WeakSet,l=[],s=!1,o=r.app={_uid:r_++,_component:e,_props:t,_container:null,_context:r,_instance:null,version:iX,get config(){return r.config},set config(v){},use:(e,...t)=>(i.has(e)||(e&&P(e.install)?(i.add(e),e.install(o,...t)):P(e)&&(i.add(e),e(o,...t))),o),mixin:e=>(r.mixins.includes(e)||r.mixins.push(e),o),component:(e,t)=>t?(r.components[e]=t,o):r.components[e],directive:(e,t)=>t?(r.directives[e]=t,o):r.directives[e],mount(i,l,a){if(!s){let c=o._ceVNode||iC(e,t);return c.appContext=r,!0===a?a="svg":!1===a&&(a=void 0),l&&n?n(c,i):ec(c,i,a),s=!0,o._container=i,i.__vue_app__=o,iW(c.component)}},onUnmount(e){l.push(e);},unmount(){s&&(tW(l,o._instance,16),ec(null,o._container),delete o._container.__vue_app__);},provide:(e,t)=>(r.provides[e]=t,o),runWithContext(e){let t=rS;rS=o;try{return e()}finally{rS=t;}}};return o})}}function rj({type:e,props:t},n){return "svg"===n&&"foreignObject"===e||"mathml"===n&&"annotation-xml"===e&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function rH({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5);}function rq(e,t){return (!e||e&&!e.pendingBranch)&&t&&!t.persisted}function rW(e,t,n=!1){let r=e.children,i=t.children;if(A(r)&&A(i))for(let e=0;e<r.length;e++){let t=r[e],l=i[e];!(1&l.shapeFlag)||l.dynamicChildren||((l.patchFlag<=0||32===l.patchFlag)&&((l=i[e]=iA(i[e])).el=t.el),n||-2===l.patchFlag||rW(t,l)),l.type===is&&(l.el=t.el);}}function rK(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8;}let rz=Symbol.for("v-scx");function rJ(e,t){return rX(e,null,{flush:"post"})}function rG(e,t){return rX(e,null,{flush:"sync"})}function rX(e,t,n=y){let{immediate:r,deep:l,flush:s,once:o}=n,a=k({},n),c=iM;a.call=(e,t,n)=>tW(e,c,t,n);let u=!1;return "post"===s?a.scheduler=e=>{rV(e,c&&c.suspense);}:"sync"!==s&&(u=!0,a.scheduler=(e,t)=>{t?e():t1(e);}),a.augmentJob=e=>{t&&(e.flags|=4),u&&(e.flags|=2,c&&(e.id=c.uid,e.i=c));},function(e,t,n=y){let r,l,s,o;let{immediate:a,deep:c,once:u,scheduler:d,augmentJob:p,call:f}=n,m=e=>c?e:t_(e)||!1===c||0===c?tH(e,1):tH(e),g=!1,b=!1;if(tN(e)?(l=()=>e.value,g=t_(e)):tv(e)?(l=()=>m(e),g=!0):A(e)?(b=!0,g=e.some(e=>tv(e)||t_(e)),l=()=>e.map(e=>tN(e)?e.value:tv(e)?m(e):P(e)?f?f(e,2):e():void 0)):l=P(e)?t?f?()=>f(e,2):e:()=>{if(s){eL();try{s();}finally{e$();}}let t=h;h=r;try{return f?f(e,3,[o]):e(o)}finally{h=t;}}:_,t&&c){let e=l,t=!0===c?1/0:c;l=()=>tH(e(),t);}let S=i,x=()=>{r.stop(),S&&T(S.effects,r);};if(u&&t){let e=t;t=(...t)=>{e(...t),x();};}let C=b?Array(e.length).fill(tB):tB,k=e=>{if(1&r.flags&&(r.dirty||e)){if(t){let e=r.run();if(c||g||(b?e.some((e,t)=>Z(e,C[t])):Z(e,C))){s&&s();let n=h;h=r;try{let n=[e,C===tB?void 0:b&&C[0]===tB?[]:C,o];f?f(t,3,n):t(...n),C=e;}finally{h=n;}}}else r.run();}};return p&&p(k),(r=new ek(l)).scheduler=d?()=>d(k,!1):k,o=e=>tj(e,!1,r),s=r.onStop=()=>{let e=tU.get(r);if(e){if(f)f(e,4);else for(let t of e)t();tU.delete(r);}},t?a?k(!0):C=r.run():d?d(k.bind(null,!0),!0):r.run(),x.pause=r.pause.bind(r),x.resume=r.resume.bind(r),x.stop=x,x}(e,t,a)}function rQ(e,t,n){let r;let i=this.proxy,l=M(e)?e.includes(".")?rZ(i,e):()=>i[e]:e.bind(i,i);P(t)?r=t:(r=t.handler,n=t);let s=i$(this),o=rX(l,r.bind(i),n);return s(),o}function rZ(e,t){let n=t.split(".");return ()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}let rY=(e,t)=>"modelValue"===t||"model-value"===t?e.modelModifiers:e[`${t}Modifiers`]||e[`${z(t)}Modifiers`]||e[`${G(t)}Modifiers`];function r0(e,t,...n){let r;if(e.isUnmounted)return;let i=e.vnode.props||y,l=n,s=t.startsWith("update:"),o=s&&rY(i,t.slice(7));o&&(o.trim&&(l=n.map(e=>M(e)?e.trim():e)),o.number&&(l=n.map(et)));let a=i[r=Q(t)]||i[r=Q(z(t))];!a&&s&&(a=i[r=Q(G(t))]),a&&tW(a,e,6,l);let c=i[r+"Once"];if(c){if(e.emitted){if(e.emitted[r])return}else e.emitted={};e.emitted[r]=!0,tW(c,e,6,l);}}function r1(e,t){return !!(e&&x(t))&&(w(e,(t=t.slice(2).replace(/Once$/,""))[0].toLowerCase()+t.slice(1))||w(e,G(t))||w(e,t))}function r2(e){let t,n;let{type:r,vnode:i,proxy:l,withProxy:s,propsOptions:[o],slots:a,attrs:c,emit:u,render:d,renderCache:p,props:f,data:h,setupState:m,ctx:g,inheritAttrs:y}=e,b=t7(e);try{if(4&i.shapeFlag){let e=s||l;t=iw(d.call(e,e,p,f,m,h,g)),n=c;}else t=iw(r.length>1?r(f,{attrs:c,slots:a,emit:u}):r(f,null)),n=r.props?c:r6(c);}catch(n){ic.length=0,tK(n,e,1),t=iC(io);}let _=t;if(n&&!1!==y){let e=Object.keys(n),{shapeFlag:t}=_;e.length&&7&t&&(o&&e.some(C)&&(n=r3(n,o)),_=iT(_,n,!1,!0));}return i.dirs&&((_=iT(_,null,!1,!0)).dirs=_.dirs?_.dirs.concat(i.dirs):i.dirs),i.transition&&nk(_,i.transition),t=_,t7(b),t}let r6=e=>{let t;for(let n in e)("class"===n||"style"===n||x(n))&&((t||(t={}))[n]=e[n]);return t},r3=(e,t)=>{let n={};for(let r in e)C(r)&&r.slice(9) in t||(n[r]=e[r]);return n};function r4(e,t,n){let r=Object.keys(t);if(r.length!==Object.keys(e).length)return !0;for(let i=0;i<r.length;i++){let l=r[i];if(t[l]!==e[l]&&!r1(n,l))return !0}return !1}function r8({vnode:e,parent:t},n){for(;t;){let r=t.subTree;if(r.suspense&&r.suspense.activeBranch===e&&(r.el=e.el),r===e)(e=t.vnode).el=n,t=t.parent;else break}}let r5=e=>e.__isSuspense,r9=0;function r7(e,t){let n=e.props&&e.props[t];P(n)&&n();}function ie(e,t,n,r,i,l,s,o,a,c,u=!1){let d;let{p:p,m:f,um:h,n:m,o:{parentNode:g,remove:y}}=c,b=function(e){let t=e.props&&e.props.suspensible;return null!=t&&!1!==t}(e);b&&t&&t.pendingBranch&&(d=t.pendingId,t.deps++);let _=e.props?en(e.props.timeout):void 0,S=l,x={vnode:e,parent:t,parentComponent:n,namespace:s,container:r,hiddenContainer:i,deps:0,pendingId:r9++,timeout:"number"==typeof _?_:-1,activeBranch:null,pendingBranch:null,isInFallback:!u,isHydrating:u,isUnmounted:!1,effects:[],resolve(e=!1,n=!1){let{vnode:r,activeBranch:i,pendingBranch:s,pendingId:o,effects:a,parentComponent:c,container:u}=x,p=!1;x.isHydrating?x.isHydrating=!1:e||((p=i&&s.transition&&"out-in"===s.transition.mode)&&(i.transition.afterLeave=()=>{o===x.pendingId&&(f(s,u,l===S?m(i):l,0),t6(a));}),i&&(g(i.el)===u&&(l=m(i)),h(i,c,x,!0)),p||f(s,u,l,0)),ii(x,s),x.pendingBranch=null,x.isInFallback=!1;let y=x.parent,_=!1;for(;y;){if(y.pendingBranch){y.effects.push(...a),_=!0;break}y=y.parent;}_||p||t6(a),x.effects=[],b&&t&&t.pendingBranch&&d===t.pendingId&&(t.deps--,0!==t.deps||n||t.resolve()),r7(r,"onResolve");},fallback(e){if(!x.pendingBranch)return;let{vnode:t,activeBranch:n,parentComponent:r,container:i,namespace:l}=x;r7(t,"onFallback");let s=m(n),c=()=>{x.isInFallback&&(p(null,e,i,s,r,null,l,o,a),ii(x,e));},u=e.transition&&"out-in"===e.transition.mode;u&&(n.transition.afterLeave=c),x.isInFallback=!0,h(n,r,null,!0),u||c();},move(e,t,n){x.activeBranch&&f(x.activeBranch,e,t,n),x.container=e;},next:()=>x.activeBranch&&m(x.activeBranch),registerDep(e,t,n){let r=!!x.pendingBranch;r&&x.deps++;let i=e.vnode.el;e.asyncDep.catch(t=>{tK(t,e,0);}).then(l=>{if(e.isUnmounted||x.isUnmounted||x.pendingId!==e.suspenseId)return;e.asyncResolved=!0;let{vnode:o}=e;iB(e,l,!1),i&&(o.el=i);let a=!i&&e.subTree.el;t(e,o,g(i||e.subTree.el),i?null:m(e.subTree),x,s,n),a&&y(a),r8(e,o.el),r&&0==--x.deps&&x.resolve();});},unmount(e,t){x.isUnmounted=!0,x.activeBranch&&h(x.activeBranch,n,e,t),x.pendingBranch&&h(x.pendingBranch,n,e,t);}};return x}function it(e){let t;if(P(e)){let n=ih&&e._c;n&&(e._d=!1,id()),e=e(),n&&(e._d=!0,t=iu,ip());}return A(e)&&(e=function(e,t=!0){let n;for(let t=0;t<e.length;t++){let r=e[t];if(!iv(r))return;if(r.type!==io||"v-if"===r.children){if(n)return;n=r;}}return n}(e)),e=iw(e),t&&!e.dynamicChildren&&(e.dynamicChildren=t.filter(t=>t!==e)),e}function ir(e,t){t&&t.pendingBranch?A(e)?t.effects.push(...e):t.effects.push(e):t6(e);}function ii(e,t){e.activeBranch=t;let{vnode:n,parentComponent:r}=e,i=t.el;for(;!i&&t.component;)i=(t=t.component.subTree).el;n.el=i,r&&r.subTree===n&&(r.vnode.el=i,r8(r,i));}let il=Symbol.for("v-fgt"),is=Symbol.for("v-txt"),io=Symbol.for("v-cmt"),ia=Symbol.for("v-stc"),ic=[],iu=null;function id(e=!1){ic.push(iu=e?null:[]);}function ip(){ic.pop(),iu=ic[ic.length-1]||null;}let ih=1;function im(e){ih+=e,e<0&&iu&&(iu.hasOnce=!0);}function ig(e){return e.dynamicChildren=ih>0?iu||b:null,ip(),ih>0&&iu&&iu.push(e),e}function iy(e,t,n,r,i){return ig(iC(e,t,n,r,i,!0))}function iv(e){return !!e&&!0===e.__v_isVNode}function ib(e,t){return e.type===t.type&&e.key===t.key}let i_=({key:e})=>null!=e?e:null,iS=({ref:e,ref_key:t,ref_for:n})=>("number"==typeof e&&(e=""+e),null!=e?M(e)||tN(e)||P(e)?{i:t5,r:e,k:t,f:!!n}:e:null);function ix(e,t=null,n=null,r=0,i=null,l=e===il?0:1,s=!1,o=!1){let a={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&i_(t),ref:t&&iS(t),scopeId:t9,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:l,patchFlag:r,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:t5};return o?(iE(a,n),128&l&&e.normalize(a)):n&&(a.shapeFlag|=M(n)?8:16),ih>0&&!s&&iu&&(a.patchFlag>0||6&l)&&32!==a.patchFlag&&iu.push(a),a}let iC=function(e,t=null,n=null,r=0,i=null,l=!1){var s;if(e&&e!==n7||(e=io),iv(e)){let r=iT(e,t,!0);return n&&iE(r,n),ih>0&&!l&&iu&&(6&r.shapeFlag?iu[iu.indexOf(e)]=r:iu.push(r)),r.patchFlag=-2,r}if(P(s=e)&&"__vccOpts"in s&&(e=e.__vccOpts),t){let{class:e,style:n}=t=ik(t);e&&!M(e)&&(t.class=eu(e)),$(n)&&(tS(n)&&!A(n)&&(n=k({},n)),t.style=el(n));}let o=M(e)?1:r5(e)?128:nr(e)?64:$(e)?4:P(e)?2:0;return ix(e,t,n,r,i,o,l,!0)};function ik(e){return e?tS(e)||rN(e)?k({},e):e:null}function iT(e,t,n=!1,r=!1){let{props:i,ref:l,patchFlag:s,children:o,transition:a}=e,c=t?iI(i||{},t):i,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:c,key:c&&i_(c),ref:t&&t.ref?n&&l?A(l)?l.concat(iS(t)):[l,iS(t)]:iS(t):l,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:o,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==il?-1===s?16:16|s:s,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:a,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&iT(e.ssContent),ssFallback:e.ssFallback&&iT(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return a&&r&&nk(u,a.clone(u)),u}function iN(e=" ",t=0){return iC(is,null,e,t)}function iw(e){return null==e||"boolean"==typeof e?iC(io):A(e)?iC(il,null,e.slice()):iv(e)?iA(e):iC(is,null,String(e))}function iA(e){return null===e.el&&-1!==e.patchFlag||e.memo?e:iT(e)}function iE(e,t){let n=0,{shapeFlag:r}=e;if(null==t)t=null;else if(A(t))n=16;else if("object"==typeof t){if(65&r){let n=t.default;n&&(n._c&&(n._d=!1),iE(e,n()),n._c&&(n._d=!0));return}{n=32;let r=t._;r||rN(t)?3===r&&t5&&(1===t5.slots._?t._=1:(t._=2,e.patchFlag|=1024)):t._ctx=t5;}}else P(t)?(t={default:t,_ctx:t5},n=32):(t=String(t),64&r?(n=16,t=[iN(t)]):n=8);e.children=t,e.shapeFlag|=n;}function iI(...e){let t={};for(let n=0;n<e.length;n++){let r=e[n];for(let e in r)if("class"===e)t.class!==r.class&&(t.class=eu([t.class,r.class]));else if("style"===e)t.style=el([t.style,r.style]);else if(x(e)){let n=t[e],i=r[e];i&&n!==i&&!(A(n)&&n.includes(i))&&(t[e]=n?[].concat(n,i):i);}else ""!==e&&(t[e]=r[e]);}return t}function iR(e,t,n,r=null){tW(e,t,7,[n,r]);}let iO=rb(),iP=0,iM=null,iL=()=>iM||t5;a=e=>{iM=e;},c=e=>{iV=e;};let i$=e=>{let t=iM;return a(e),e.scope.on(),()=>{e.scope.off(),a(t);}},iD=()=>{iM&&iM.scope.off(),a(null);};function iF(e){return 4&e.vnode.shapeFlag}let iV=!1;function iB(e,t,n){P(t)?e.render=t:$(t)&&(e.setupState=tP(t)),ij(e,n);}function iU(e){u=e,d=e=>{e.render._rc&&(e.withProxy=new Proxy(e.ctx,rs));};}function ij(e,t,n){let r=e.type;if(!e.render){if(!t&&u&&!r.render){let t=r.template||rd(e).template;if(t){let{isCustomElement:n,compilerOptions:i}=e.appContext.config,{delimiters:l,compilerOptions:s}=r,o=k(k({isCustomElement:n,delimiters:l},i),s);r.render=u(t,o);}}e.render=r.render||_,d&&d(e);}{let t=i$(e);eL();try{!function(e){let t=rd(e),n=e.proxy,r=e.ctx;rc=!1,t.beforeCreate&&ru(t.beforeCreate,e,"bc");let{data:i,computed:l,methods:s,watch:o,provide:a,inject:c,created:u,beforeMount:d,mounted:p,beforeUpdate:f,updated:h,activated:m,deactivated:g,beforeDestroy:y,beforeUnmount:b,destroyed:S,unmounted:x,render:C,renderTracked:k,renderTriggered:T,errorCaptured:N,serverPrefetch:w,expose:E,inheritAttrs:I,components:R,directives:O,filters:L}=t;if(c&&function(e,t,n=_){for(let n in A(e)&&(e=rm(e)),e){let r;let i=e[n];tN(r=$(i)?"default"in i?rC(i.from||n,i.default,!0):rC(i.from||n):rC(i))?Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:()=>r.value,set:e=>r.value=e}):t[n]=r;}}(c,r,null),s)for(let e in s){let t=s[e];P(t)&&(r[e]=t.bind(n));}if(i){let t=i.call(n,n);$(t)&&(e.data=th(t));}if(rc=!0,l)for(let e in l){let t=l[e],i=P(t)?t.bind(n,n):P(t.get)?t.get.bind(n,n):_,s=iz({get:i,set:!P(t)&&P(t.set)?t.set.bind(n):_});Object.defineProperty(r,e,{enumerable:!0,configurable:!0,get:()=>s.value,set:e=>s.value=e});}if(o)for(let e in o)!function e(t,n,r,i){let l=i.includes(".")?rZ(r,i):()=>r[i];if(M(t)){let e=n[t];P(e)&&rX(l,e,void 0);}else if(P(t)){var s;s=t.bind(r),rX(l,s,void 0);}else if($(t)){if(A(t))t.forEach(t=>e(t,n,r,i));else {let e=P(t.handler)?t.handler.bind(r):n[t.handler];P(e)&&rX(l,e,t);}}}(o[e],r,n,e);if(a){let e=P(a)?a.call(n):a;Reflect.ownKeys(e).forEach(t=>{rx(t,e[t]);});}function D(e,t){A(t)?t.forEach(t=>e(t.bind(n))):t&&e(t.bind(n));}if(u&&ru(u,e,"c"),D(nZ,d),D(nY,p),D(n0,f),D(n1,h),D(nW,m),D(nK,g),D(n5,N),D(n8,k),D(n4,T),D(n2,b),D(n6,x),D(n3,w),A(E)){if(E.length){let t=e.exposed||(e.exposed={});E.forEach(e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t});});}else e.exposed||(e.exposed={});}C&&e.render===_&&(e.render=C),null!=I&&(e.inheritAttrs=I),R&&(e.components=R),O&&(e.directives=O);}(e);}finally{e$(),t();}}}let iH={get:(e,t)=>(eW(e,"get",""),e[t])};function iq(e){return {attrs:new Proxy(e.attrs,iH),slots:e.slots,emit:e.emit,expose:t=>{e.exposed=t||{};}}}function iW(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(tP(tC(e.exposed)),{get:(t,n)=>n in t?t[n]:n in rr?rr[n](e):void 0,has:(e,t)=>t in e||t in rr})):e.proxy}function iK(e,t=!0){return P(e)?e.displayName||e.name:e.name||t&&e.__name}let iz=(e,t)=>(function(e,t,n=!1){let r,i;return P(e)?r=e:(r=e.get,i=e.set),new tV(r,i,n)})(e,0,iV);function iJ(e,t,n){let r=arguments.length;return 2!==r?(r>3?n=Array.prototype.slice.call(arguments,2):3===r&&iv(n)&&(n=[n]),iC(e,t,n)):!$(t)||A(t)?iC(e,null,t):iv(t)?iC(e,null,[t]):iC(e,t)}function iG(e,t){let n=e.memo;if(n.length!=t.length)return !1;for(let e=0;e<n.length;e++)if(Z(n[e],t[e]))return !1;return ih>0&&iu&&iu.push(e),!0}let iX="3.5.12",iQ="undefined"!=typeof window&&window.trustedTypes;if(iQ)try{m=/* @__PURE__ */iQ.createPolicy("vue",{createHTML:e=>e});}catch(e){}let iZ=m?e=>m.createHTML(e):e=>e,iY="undefined"!=typeof document?document:null,i0=iY&&/* @__PURE__ */iY.createElement("template"),i1="transition",i2="animation",i6=Symbol("_vtc"),i3={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},i4=/* @__PURE__ */k({},ng,i3),i8=((t=(e,{slots:t})=>iJ(nb,i7(e),t)).displayName="Transition",t.props=i4,t),i5=(e,t=[])=>{A(e)?e.forEach(e=>e(...t)):e&&e(...t);},i9=e=>!!e&&(A(e)?e.some(e=>e.length>1):e.length>1);function i7(e){let t={};for(let n in e)n in i3||(t[n]=e[n]);if(!1===e.css)return t;let{name:n="v",type:r,duration:i,enterFromClass:l=`${n}-enter-from`,enterActiveClass:s=`${n}-enter-active`,enterToClass:o=`${n}-enter-to`,appearFromClass:a=l,appearActiveClass:c=s,appearToClass:u=o,leaveFromClass:d=`${n}-leave-from`,leaveActiveClass:p=`${n}-leave-active`,leaveToClass:f=`${n}-leave-to`}=e,h=function(e){if(null==e)return null;if($(e))return [en(e.enter),en(e.leave)];{let t=en(e);return [t,t]}}(i),m=h&&h[0],g=h&&h[1],{onBeforeEnter:y,onEnter:b,onEnterCancelled:_,onLeave:S,onLeaveCancelled:x,onBeforeAppear:C=y,onAppear:T=b,onAppearCancelled:N=_}=t,w=(e,t,n)=>{lt(e,t?u:o),lt(e,t?c:s),n&&n();},A=(e,t)=>{e._isLeaving=!1,lt(e,d),lt(e,f),lt(e,p),t&&t();},E=e=>(t,n)=>{let i=e?T:b,s=()=>w(t,e,n);i5(i,[t,s]),ln(()=>{lt(t,e?a:l),le(t,e?u:o),i9(i)||li(t,r,m,s);});};return k(t,{onBeforeEnter(e){i5(y,[e]),le(e,l),le(e,s);},onBeforeAppear(e){i5(C,[e]),le(e,a),le(e,c);},onEnter:E(!1),onAppear:E(!0),onLeave(e,t){e._isLeaving=!0;let n=()=>A(e,t);le(e,d),le(e,p),la(),ln(()=>{e._isLeaving&&(lt(e,d),le(e,f),i9(S)||li(e,r,g,n));}),i5(S,[e,n]);},onEnterCancelled(e){w(e,!1),i5(_,[e]);},onAppearCancelled(e){w(e,!0),i5(N,[e]);},onLeaveCancelled(e){A(e),i5(x,[e]);}})}function le(e,t){t.split(/\s+/).forEach(t=>t&&e.classList.add(t)),(e[i6]||(e[i6]=/* @__PURE__ */new Set)).add(t);}function lt(e,t){t.split(/\s+/).forEach(t=>t&&e.classList.remove(t));let n=e[i6];n&&(n.delete(t),n.size||(e[i6]=void 0));}function ln(e){requestAnimationFrame(()=>{requestAnimationFrame(e);});}let lr=0;function li(e,t,n,r){let i=e._endId=++lr,l=()=>{i===e._endId&&r();};if(null!=n)return setTimeout(l,n);let{type:s,timeout:o,propCount:a}=ll(e,t);if(!s)return r();let c=s+"end",u=0,d=()=>{e.removeEventListener(c,p),l();},p=t=>{t.target===e&&++u>=a&&d();};setTimeout(()=>{u<a&&d();},o+1),e.addEventListener(c,p);}function ll(e,t){let n=window.getComputedStyle(e),r=e=>(n[e]||"").split(", "),i=r(`${i1}Delay`),l=r(`${i1}Duration`),s=ls(i,l),o=r(`${i2}Delay`),a=r(`${i2}Duration`),c=ls(o,a),u=null,d=0,p=0;t===i1?s>0&&(u=i1,d=s,p=l.length):t===i2?c>0&&(u=i2,d=c,p=a.length):p=(u=(d=Math.max(s,c))>0?s>c?i1:i2:null)?u===i1?l.length:a.length:0;let f=u===i1&&/\b(transform|all)(,|$)/.test(r(`${i1}Property`).toString());return {type:u,timeout:d,propCount:p,hasTransform:f}}function ls(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((t,n)=>lo(t)+lo(e[n])))}function lo(e){return "auto"===e?0:1e3*Number(e.slice(0,-1).replace(",","."))}function la(){return document.body.offsetHeight}let lc=Symbol("_vod"),lu=Symbol("_vsh");function ld(e,t){e.style.display=t?e[lc]:"none",e[lu]=!t;}let lp=Symbol("");function lf(e,t){if(1===e.nodeType){let n=e.style,r="";for(let e in t)n.setProperty(`--${e}`,t[e]),r+=`--${e}: ${t[e]};`;n[lp]=r;}}let lh=/(^|;)\s*display\s*:/,lm=/\s*!important$/;function lg(e,t,n){if(A(n))n.forEach(n=>lg(e,t,n));else if(null==n&&(n=""),t.startsWith("--"))e.setProperty(t,n);else {let r=function(e,t){let n=lv[t];if(n)return n;let r=z(t);if("filter"!==r&&r in e)return lv[t]=r;r=X(r);for(let n=0;n<ly.length;n++){let i=ly[n]+r;if(i in e)return lv[t]=i}return t}(e,t);lm.test(n)?e.setProperty(G(r),n.replace(lm,""),"important"):e[r]=n;}}let ly=["Webkit","Moz","ms"],lv={},lb="http://www.w3.org/1999/xlink";function l_(e,t,n,r,i,l=em(t)){r&&t.startsWith("xlink:")?null==n?e.removeAttributeNS(lb,t.slice(6,t.length)):e.setAttributeNS(lb,t,n):null==n||l&&!(n||""===n)?e.removeAttribute(t):e.setAttribute(t,l?"":L(n)?String(n):n);}function lS(e,t,n,r,i){if("innerHTML"===t||"textContent"===t){null!=n&&(e[t]="innerHTML"===t?iZ(n):n);return}let l=e.tagName;if("value"===t&&"PROGRESS"!==l&&!l.includes("-")){let r="OPTION"===l?e.getAttribute("value")||"":e.value,i=null==n?"checkbox"===e.type?"on":"":String(n);r===i&&"_value"in e||(e.value=i),null==n&&e.removeAttribute(t),e._value=n;return}let s=!1;if(""===n||null==n){let r=typeof e[t];if("boolean"===r){var o;n=!!(o=n)||""===o;}else null==n&&"string"===r?(n="",s=!0):"number"===r&&(n=0,s=!0);}try{e[t]=n;}catch(e){}s&&e.removeAttribute(i||t);}function lx(e,t,n,r){e.addEventListener(t,n,r);}let lC=Symbol("_vei"),lk=/(?:Once|Passive|Capture)$/,lT=0,lN=/* @__PURE__ */Promise.resolve(),lw=()=>lT||(lN.then(()=>lT=0),lT=Date.now()),lA=e=>111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&e.charCodeAt(2)>96&&123>e.charCodeAt(2),lE={};/*! #__NO_SIDE_EFFECTS__ */function lI(e,t,n){let r=nN(e,t);U(r)&&k(r,t);class i extends lO{constructor(e){super(r,e,n);}}return i.def=r,i}let lR="undefined"!=typeof HTMLElement?HTMLElement:class{};class lO extends lR{constructor(e,t={},n=l9){super(),this._def=e,this._props=t,this._createApp=n,this._isVueCE=!0,this._instance=null,this._app=null,this._nonce=this._def.nonce,this._connected=!1,this._resolved=!1,this._numberProps=null,this._styleChildren=/* @__PURE__ */new WeakSet,this._ob=null,this.shadowRoot&&n!==l9?this._root=this.shadowRoot:!1!==e.shadowRoot?(this.attachShadow({mode:"open"}),this._root=this.shadowRoot):this._root=this,this._def.__asyncLoader||this._resolveProps(this._def);}connectedCallback(){if(!this.isConnected)return;this.shadowRoot||this._parseSlots(),this._connected=!0;let e=this;for(;e=e&&(e.parentNode||e.host);)if(e instanceof lO){this._parent=e;break}this._instance||(this._resolved?(this._setParent(),this._update()):e&&e._pendingResolve?this._pendingResolve=e._pendingResolve.then(()=>{this._pendingResolve=void 0,this._resolveDef();}):this._resolveDef());}_setParent(e=this._parent){e&&(this._instance.parent=e._instance,this._instance.provides=e._instance.provides);}disconnectedCallback(){this._connected=!1,t0(()=>{this._connected||(this._ob&&(this._ob.disconnect(),this._ob=null),this._app&&this._app.unmount(),this._instance&&(this._instance.ce=void 0),this._app=this._instance=null);});}_resolveDef(){if(this._pendingResolve)return;for(let e=0;e<this.attributes.length;e++)this._setAttr(this.attributes[e].name);this._ob=new MutationObserver(e=>{for(let t of e)this._setAttr(t.attributeName);}),this._ob.observe(this,{attributes:!0});let e=(e,t=!1)=>{let n;this._resolved=!0,this._pendingResolve=void 0;let{props:r,styles:i}=e;if(r&&!A(r))for(let e in r){let t=r[e];(t===Number||t&&t.type===Number)&&(e in this._props&&(this._props[e]=en(this._props[e])),(n||(n=/* @__PURE__ */Object.create(null)))[z(e)]=!0);}this._numberProps=n,t&&this._resolveProps(e),this.shadowRoot&&this._applyStyles(i),this._mount(e);},t=this._def.__asyncLoader;t?this._pendingResolve=t().then(t=>e(this._def=t,!0)):e(this._def);}_mount(e){this._app=this._createApp(e),e.configureApp&&e.configureApp(this._app),this._app._ceVNode=this._createVNode(),this._app.mount(this._root);let t=this._instance&&this._instance.exposed;if(t)for(let e in t)w(this,e)||Object.defineProperty(this,e,{get:()=>tR(t[e])});}_resolveProps(e){let{props:t}=e,n=A(t)?t:Object.keys(t||{});for(let e of Object.keys(this))"_"!==e[0]&&n.includes(e)&&this._setProp(e,this[e]);for(let e of n.map(z))Object.defineProperty(this,e,{get(){return this._getProp(e)},set(t){this._setProp(e,t,!0,!0);}});}_setAttr(e){if(e.startsWith("data-v-"))return;let t=this.hasAttribute(e),n=t?this.getAttribute(e):lE,r=z(e);t&&this._numberProps&&this._numberProps[r]&&(n=en(n)),this._setProp(r,n,!1,!0);}_getProp(e){return this._props[e]}_setProp(e,t,n=!0,r=!1){t!==this._props[e]&&(t===lE?delete this._props[e]:(this._props[e]=t,"key"===e&&this._app&&(this._app._ceVNode.key=t)),r&&this._instance&&this._update(),n&&(!0===t?this.setAttribute(G(e),""):"string"==typeof t||"number"==typeof t?this.setAttribute(G(e),t+""):t||this.removeAttribute(G(e))));}_update(){l5(this._createVNode(),this._root);}_createVNode(){let e={};this.shadowRoot||(e.onVnodeMounted=e.onVnodeUpdated=this._renderSlots.bind(this));let t=iC(this._def,k(e,this._props));return this._instance||(t.ce=e=>{this._instance=e,e.ce=this,e.isCE=!0;let t=(e,t)=>{this.dispatchEvent(new CustomEvent(e,U(t[0])?k({detail:t},t[0]):{detail:t}));};e.emit=(e,...n)=>{t(e,n),G(e)!==e&&t(G(e),n);},this._setParent();}),t}_applyStyles(e,t){if(!e)return;if(t){if(t===this._def||this._styleChildren.has(t))return;this._styleChildren.add(t);}let n=this._nonce;for(let t=e.length-1;t>=0;t--){let r=document.createElement("style");n&&r.setAttribute("nonce",n),r.textContent=e[t],this.shadowRoot.prepend(r);}}_parseSlots(){let e;let t=this._slots={};for(;e=this.firstChild;){let n=1===e.nodeType&&e.getAttribute("slot")||"default";(t[n]||(t[n]=[])).push(e),this.removeChild(e);}}_renderSlots(){let e=(this._teleportTarget||this).querySelectorAll("slot"),t=this._instance.type.__scopeId;for(let n=0;n<e.length;n++){let r=e[n],i=r.getAttribute("name")||"default",l=this._slots[i],s=r.parentNode;if(l)for(let e of l){if(t&&1===e.nodeType){let n;let r=t+"-s",i=document.createTreeWalker(e,1);for(e.setAttribute(r,"");n=i.nextNode();)n.setAttribute(r,"");}s.insertBefore(e,r);}else for(;r.firstChild;)s.insertBefore(r.firstChild,r);s.removeChild(r);}}_injectChildStyle(e){this._applyStyles(e.styles,e);}_removeChildStyle(e){}}function lP(e){let t=iL();return t&&t.ce||null}let lM=/* @__PURE__ */new WeakMap,lL=/* @__PURE__ */new WeakMap,l$=Symbol("_moveCb"),lD=Symbol("_enterCb"),lF=(n={name:"TransitionGroup",props:/* @__PURE__ */k({},i4,{tag:String,moveClass:String}),setup(e,{slots:t}){let n,r;let i=iL(),l=nh();return n1(()=>{if(!n.length)return;let t=e.moveClass||`${e.name||"v"}-move`;if(!function(e,t,n){let r=e.cloneNode(),i=e[i6];i&&i.forEach(e=>{e.split(/\s+/).forEach(e=>e&&r.classList.remove(e));}),n.split(/\s+/).forEach(e=>e&&r.classList.add(e)),r.style.display="none";let l=1===t.nodeType?t:t.parentNode;l.appendChild(r);let{hasTransform:s}=ll(r);return l.removeChild(r),s}(n[0].el,i.vnode.el,t))return;n.forEach(lV),n.forEach(lB);let r=n.filter(lU);la(),r.forEach(e=>{let n=e.el,r=n.style;le(n,t),r.transform=r.webkitTransform=r.transitionDuration="";let i=n[l$]=e=>{(!e||e.target===n)&&(!e||/transform$/.test(e.propertyName))&&(n.removeEventListener("transitionend",i),n[l$]=null,lt(n,t));};n.addEventListener("transitionend",i);});}),()=>{let s=tx(e),o=i7(s),a=s.tag||il;if(n=[],r)for(let e=0;e<r.length;e++){let t=r[e];t.el&&t.el instanceof Element&&(n.push(t),nk(t,nS(t,o,l,i)),lM.set(t,t.el.getBoundingClientRect()));}r=t.default?nT(t.default()):[];for(let e=0;e<r.length;e++){let t=r[e];null!=t.key&&nk(t,nS(t,o,l,i));}return iC(a,null,r)}}},delete n.props.mode,n);function lV(e){let t=e.el;t[l$]&&t[l$](),t[lD]&&t[lD]();}function lB(e){lL.set(e,e.el.getBoundingClientRect());}function lU(e){let t=lM.get(e),n=lL.get(e),r=t.left-n.left,i=t.top-n.top;if(r||i){let t=e.el.style;return t.transform=t.webkitTransform=`translate(${r}px,${i}px)`,t.transitionDuration="0s",e}}let lj=e=>{let t=e.props["onUpdate:modelValue"]||!1;return A(t)?e=>Y(t,e):t};function lH(e){e.target.composing=!0;}function lq(e){let t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")));}let lW=Symbol("_assign"),lK={created(e,{modifiers:{lazy:t,trim:n,number:r}},i){e[lW]=lj(i);let l=r||i.props&&"number"===i.props.type;lx(e,t?"change":"input",t=>{if(t.target.composing)return;let r=e.value;n&&(r=r.trim()),l&&(r=et(r)),e[lW](r);}),n&&lx(e,"change",()=>{e.value=e.value.trim();}),t||(lx(e,"compositionstart",lH),lx(e,"compositionend",lq),lx(e,"change",lq));},mounted(e,{value:t}){e.value=null==t?"":t;},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:r,trim:i,number:l}},s){if(e[lW]=lj(s),e.composing)return;let o=(l||"number"===e.type)&&!/^0\d/.test(e.value)?et(e.value):e.value,a=null==t?"":t;o===a||document.activeElement===e&&"range"!==e.type&&(r&&t===n||i&&e.value.trim()===a)||(e.value=a);}},lz={deep:!0,created(e,t,n){e[lW]=lj(n),lx(e,"change",()=>{let t=e._modelValue,n=lZ(e),r=e.checked,i=e[lW];if(A(t)){let e=ey(t,n),l=-1!==e;if(r&&!l)i(t.concat(n));else if(!r&&l){let n=[...t];n.splice(e,1),i(n);}}else if(I(t)){let e=new Set(t);r?e.add(n):e.delete(n),i(e);}else i(lY(e,r));});},mounted:lJ,beforeUpdate(e,t,n){e[lW]=lj(n),lJ(e,t,n);}};function lJ(e,{value:t,oldValue:n},r){let i;if(e._modelValue=t,A(t))i=ey(t,r.props.value)>-1;else if(I(t))i=t.has(r.props.value);else {if(t===n)return;i=eg(t,lY(e,!0));}e.checked!==i&&(e.checked=i);}let lG={created(e,{value:t},n){e.checked=eg(t,n.props.value),e[lW]=lj(n),lx(e,"change",()=>{e[lW](lZ(e));});},beforeUpdate(e,{value:t,oldValue:n},r){e[lW]=lj(r),t!==n&&(e.checked=eg(t,r.props.value));}},lX={deep:!0,created(e,{value:t,modifiers:{number:n}},r){let i=I(t);lx(e,"change",()=>{let t=Array.prototype.filter.call(e.options,e=>e.selected).map(e=>n?et(lZ(e)):lZ(e));e[lW](e.multiple?i?new Set(t):t:t[0]),e._assigning=!0,t0(()=>{e._assigning=!1;});}),e[lW]=lj(r);},mounted(e,{value:t}){lQ(e,t);},beforeUpdate(e,t,n){e[lW]=lj(n);},updated(e,{value:t}){e._assigning||lQ(e,t);}};function lQ(e,t){let n=e.multiple,r=A(t);if(!n||r||I(t)){for(let i=0,l=e.options.length;i<l;i++){let l=e.options[i],s=lZ(l);if(n){if(r){let e=typeof s;"string"===e||"number"===e?l.selected=t.some(e=>String(e)===String(s)):l.selected=ey(t,s)>-1;}else l.selected=t.has(s);}else if(eg(lZ(l),t)){e.selectedIndex!==i&&(e.selectedIndex=i);return}}n||-1===e.selectedIndex||(e.selectedIndex=-1);}}function lZ(e){return "_value"in e?e._value:e.value}function lY(e,t){let n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}function l0(e,t,n,r,i){let l=function(e,t){switch(e){case"SELECT":return lX;case"TEXTAREA":return lK;default:switch(t){case"checkbox":return lz;case"radio":return lG;default:return lK}}}(e.tagName,n.props&&n.props.type)[i];l&&l(e,t,n,r);}let l1=["ctrl","shift","alt","meta"],l2={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&0!==e.button,middle:e=>"button"in e&&1!==e.button,right:e=>"button"in e&&2!==e.button,exact:(e,t)=>l1.some(n=>e[`${n}Key`]&&!t.includes(n))},l6={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},l3=/* @__PURE__ */k({patchProp:(e,t,n,r,i,l)=>{let s="svg"===i;"class"===t?function(e,t,n){let r=e[i6];r&&(t=(t?[t,...r]:[...r]).join(" ")),null==t?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t;}(e,r,s):"style"===t?function(e,t,n){let r=e.style,i=M(n),l=!1;if(n&&!i){if(t){if(M(t))for(let e of t.split(";")){let t=e.slice(0,e.indexOf(":")).trim();null==n[t]&&lg(r,t,"");}else for(let e in t)null==n[e]&&lg(r,e,"");}for(let e in n)"display"===e&&(l=!0),lg(r,e,n[e]);}else if(i){if(t!==n){let e=r[lp];e&&(n+=";"+e),r.cssText=n,l=lh.test(n);}}else t&&e.removeAttribute("style");lc in e&&(e[lc]=l?r.display:"",e[lu]&&(r.display="none"));}(e,n,r):x(t)?C(t)||function(e,t,n,r,i=null){let l=e[lC]||(e[lC]={}),s=l[t];if(r&&s)s.value=r;else {let[n,o]=function(e){let t;if(lk.test(e)){let n;for(t={};n=e.match(lk);)e=e.slice(0,e.length-n[0].length),t[n[0].toLowerCase()]=!0;}return [":"===e[2]?e.slice(3):G(e.slice(2)),t]}(t);r?lx(e,n,l[t]=function(e,t){let n=e=>{if(e._vts){if(e._vts<=n.attached)return}else e._vts=Date.now();tW(function(e,t){if(!A(t))return t;{let n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0;},t.map(e=>t=>!t._stopped&&e&&e(t))}}(e,n.value),t,5,[e]);};return n.value=e,n.attached=lw(),n}(r,i),o):s&&(!function(e,t,n,r){e.removeEventListener(t,n,r);}(e,n,s,o),l[t]=void 0);}}(e,t,0,r,l):("."===t[0]?(t=t.slice(1),0):"^"===t[0]?(t=t.slice(1),1):!function(e,t,n,r){if(r)return !!("innerHTML"===t||"textContent"===t||t in e&&lA(t)&&P(n));if("spellcheck"===t||"draggable"===t||"translate"===t||"form"===t||"list"===t&&"INPUT"===e.tagName||"type"===t&&"TEXTAREA"===e.tagName)return !1;if("width"===t||"height"===t){let t=e.tagName;if("IMG"===t||"VIDEO"===t||"CANVAS"===t||"SOURCE"===t)return !1}return !(lA(t)&&M(n))&&t in e}(e,t,r,s))?e._isVueCE&&(/[A-Z]/.test(t)||!M(r))?lS(e,z(t),r,l,t):("true-value"===t?e._trueValue=r:"false-value"===t&&(e._falseValue=r),l_(e,t,r,s)):(lS(e,t,r),e.tagName.includes("-")||"value"!==t&&"checked"!==t&&"selected"!==t||l_(e,t,r,s,l,"value"!==t));}},{insert:(e,t,n)=>{t.insertBefore(e,n||null);},remove:e=>{let t=e.parentNode;t&&t.removeChild(e);},createElement:(e,t,n,r)=>{let i="svg"===t?iY.createElementNS("http://www.w3.org/2000/svg",e):"mathml"===t?iY.createElementNS("http://www.w3.org/1998/Math/MathML",e):n?iY.createElement(e,{is:n}):iY.createElement(e);return "select"===e&&r&&null!=r.multiple&&i.setAttribute("multiple",r.multiple),i},createText:e=>iY.createTextNode(e),createComment:e=>iY.createComment(e),setText:(e,t)=>{e.nodeValue=t;},setElementText:(e,t)=>{e.textContent=t;},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>iY.querySelector(e),setScopeId(e,t){e.setAttribute(t,"");},insertStaticContent(e,t,n,r,i,l){let s=n?n.previousSibling:t.lastChild;if(i&&(i===l||i.nextSibling))for(;t.insertBefore(i.cloneNode(!0),n),i!==l&&(i=i.nextSibling););else {i0.innerHTML=iZ("svg"===r?`<svg>${e}</svg>`:"mathml"===r?`<math>${e}</math>`:e);let i=i0.content;if("svg"===r||"mathml"===r){let e=i.firstChild;for(;e.firstChild;)i.appendChild(e.firstChild);i.removeChild(e);}t.insertBefore(i,n);}return [s?s.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}}),l4=!1;function l8(){return p=l4?p:rB(l3),l4=!0,p}let l5=(...e)=>{(p||(p=rU(l3))).render(...e);},l9=(...e)=>{let t=(p||(p=rU(l3))).createApp(...e),{mount:n}=t;return t.mount=e=>{let r=st(e);if(!r)return;let i=t._component;P(i)||i.render||i.template||(i.template=r.innerHTML),1===r.nodeType&&(r.textContent="");let l=n(r,!1,se(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),l},t},l7=(...e)=>{let t=l8().createApp(...e),{mount:n}=t;return t.mount=e=>{let t=st(e);if(t)return n(t,!0,se(t))},t};function se(e){return e instanceof SVGElement?"svg":"function"==typeof MathMLElement&&e instanceof MathMLElement?"mathml":void 0}function st(e){return M(e)?document.querySelector(e):e}let sn=Symbol(""),sr=Symbol(""),si=Symbol(""),sl=Symbol(""),ss=Symbol(""),so=Symbol(""),sa=Symbol(""),sc=Symbol(""),su=Symbol(""),sd=Symbol(""),sp=Symbol(""),sf=Symbol(""),sh=Symbol(""),sm=Symbol(""),sg=Symbol(""),sy=Symbol(""),sv=Symbol(""),sb=Symbol(""),s_=Symbol(""),sS=Symbol(""),sx=Symbol(""),sC=Symbol(""),sk=Symbol(""),sT=Symbol(""),sN=Symbol(""),sw=Symbol(""),sA=Symbol(""),sE=Symbol(""),sI=Symbol(""),sR=Symbol(""),sO=Symbol(""),sP=Symbol(""),sM=Symbol(""),sL=Symbol(""),s$=Symbol(""),sD=Symbol(""),sF=Symbol(""),sV=Symbol(""),sB=Symbol(""),sU={[sn]:"Fragment",[sr]:"Teleport",[si]:"Suspense",[sl]:"KeepAlive",[ss]:"BaseTransition",[so]:"openBlock",[sa]:"createBlock",[sc]:"createElementBlock",[su]:"createVNode",[sd]:"createElementVNode",[sp]:"createCommentVNode",[sf]:"createTextVNode",[sh]:"createStaticVNode",[sm]:"resolveComponent",[sg]:"resolveDynamicComponent",[sy]:"resolveDirective",[sv]:"resolveFilter",[sb]:"withDirectives",[s_]:"renderList",[sS]:"renderSlot",[sx]:"createSlots",[sC]:"toDisplayString",[sk]:"mergeProps",[sT]:"normalizeClass",[sN]:"normalizeStyle",[sw]:"normalizeProps",[sA]:"guardReactiveProps",[sE]:"toHandlers",[sI]:"camelize",[sR]:"capitalize",[sO]:"toHandlerKey",[sP]:"setBlockTracking",[sM]:"pushScopeId",[sL]:"popScopeId",[s$]:"withCtx",[sD]:"unref",[sF]:"isRef",[sV]:"withMemo",[sB]:"isMemoSame"},sj={start:{line:1,column:1,offset:0},end:{line:1,column:1,offset:0},source:""};function sH(e,t,n,r,i,l,s,o=!1,a=!1,c=!1,u=sj){return e&&(o?(e.helper(so),e.helper(e.inSSR||c?sa:sc)):e.helper(e.inSSR||c?su:sd),s&&e.helper(sb)),{type:13,tag:t,props:n,children:r,patchFlag:i,dynamicProps:l,directives:s,isBlock:o,disableTracking:a,isComponent:c,loc:u}}function sq(e,t=sj){return {type:17,loc:t,elements:e}}function sW(e,t=sj){return {type:15,loc:t,properties:e}}function sK(e,t){return {type:16,loc:sj,key:M(e)?sz(e,!0):e,value:t}}function sz(e,t=!1,n=sj,r=0){return {type:4,loc:n,content:e,isStatic:t,constType:t?3:r}}function sJ(e,t=sj){return {type:8,loc:t,children:e}}function sG(e,t=[],n=sj){return {type:14,loc:n,callee:e,arguments:t}}function sX(e,t,n=!1,r=!1,i=sj){return {type:18,params:e,returns:t,newline:n,isSlot:r,loc:i}}function sQ(e,t,n,r=!0){return {type:19,test:e,consequent:t,alternate:n,newline:r,loc:sj}}function sZ(e,{helper:t,removeHelper:n,inSSR:r}){if(!e.isBlock){var i,l;e.isBlock=!0,n((i=e.isComponent,r||i?su:sd)),t(so),t((l=e.isComponent,r||l?sa:sc));}}let sY=new Uint8Array([123,123]),s0=new Uint8Array([125,125]);function s1(e){return e>=97&&e<=122||e>=65&&e<=90}function s2(e){return 32===e||10===e||9===e||12===e||13===e}function s6(e){return 47===e||62===e||s2(e)}function s3(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}let s4={Cdata:new Uint8Array([67,68,65,84,65,91]),CdataEnd:new Uint8Array([93,93,62]),CommentEnd:new Uint8Array([45,45,62]),ScriptEnd:new Uint8Array([60,47,115,99,114,105,112,116]),StyleEnd:new Uint8Array([60,47,115,116,121,108,101]),TitleEnd:new Uint8Array([60,47,116,105,116,108,101]),TextareaEnd:new Uint8Array([60,47,116,101,120,116,97,114,101,97])};function s8(e){throw e}function s5(e){}function /*@__PURE__*/s9(e,t,n,r){let i=SyntaxError(String(`https://vuejs.org/error-reference/#compiler-${e}`));return i.code=e,i.loc=t,i}let s7=e=>4===e.type&&e.isStatic;function oe(e){switch(e){case"Teleport":case"teleport":return sr;case"Suspense":case"suspense":return si;case"KeepAlive":case"keep-alive":return sl;case"BaseTransition":case"base-transition":return ss}}let ot=/^\d|[^\$\w\xA0-\uFFFF]/,on=e=>!ot.test(e),or=/[A-Za-z_$\xA0-\uFFFF]/,oi=/[\.\?\w$\xA0-\uFFFF]/,ol=/\s+[.[]\s*|\s*[.[]\s+/g,os=e=>4===e.type?e.content:e.loc.source,oo=e=>{let t=os(e).trim().replace(ol,e=>e.trim()),n=0,r=[],i=0,l=0,s=null;for(let e=0;e<t.length;e++){let o=t.charAt(e);switch(n){case 0:if("["===o)r.push(n),n=1,i++;else if("("===o)r.push(n),n=2,l++;else if(!(0===e?or:oi).test(o))return !1;break;case 1:"'"===o||'"'===o||"`"===o?(r.push(n),n=3,s=o):"["===o?i++:"]"!==o||--i||(n=r.pop());break;case 2:if("'"===o||'"'===o||"`"===o)r.push(n),n=3,s=o;else if("("===o)l++;else if(")"===o){if(e===t.length-1)return !1;--l||(n=r.pop());}break;case 3:o===s&&(n=r.pop(),s=null);}}return !i&&!l},oa=/^\s*(async\s*)?(\([^)]*?\)|[\w$_]+)\s*(:[^=]+)?=>|^\s*(async\s+)?function(?:\s+[\w$]+)?\s*\(/,oc=e=>oa.test(os(e));function ou(e,t,n=!1){for(let r=0;r<e.props.length;r++){let i=e.props[r];if(7===i.type&&(n||i.exp)&&(M(t)?i.name===t:t.test(i.name)))return i}}function od(e,t,n=!1,r=!1){for(let i=0;i<e.props.length;i++){let l=e.props[i];if(6===l.type){if(n)continue;if(l.name===t&&(l.value||r))return l}else if("bind"===l.name&&(l.exp||r)&&op(l.arg,t))return l}}function op(e,t){return !!(e&&s7(e)&&e.content===t)}function of(e){return 5===e.type||2===e.type}function oh(e){return 7===e.type&&"slot"===e.name}function om(e){return 1===e.type&&3===e.tagType}function og(e){return 1===e.type&&2===e.tagType}let oy=/* @__PURE__ */new Set([sw,sA]);function ov(e,t,n){let r,i;let l=13===e.type?e.props:e.arguments[2],s=[];if(l&&!M(l)&&14===l.type){let e=function e(t,n=[]){if(t&&!M(t)&&14===t.type){let r=t.callee;if(!M(r)&&oy.has(r))return e(t.arguments[0],n.concat(t))}return [t,n]}(l);l=e[0],i=(s=e[1])[s.length-1];}if(null==l||M(l))r=sW([t]);else if(14===l.type){let e=l.arguments[0];M(e)||15!==e.type?l.callee===sE?r=sG(n.helper(sk),[sW([t]),l]):l.arguments.unshift(sW([t])):ob(t,e)||e.properties.unshift(t),r||(r=l);}else 15===l.type?(ob(t,l)||l.properties.unshift(t),r=l):(r=sG(n.helper(sk),[sW([t]),l]),i&&i.callee===sA&&(i=s[s.length-2]));13===e.type?i?i.arguments[0]=r:e.props=r:i?i.arguments[0]=r:e.arguments[2]=r;}function ob(e,t){let n=!1;if(4===e.key.type){let r=e.key.content;n=t.properties.some(e=>4===e.key.type&&e.key.content===r);}return n}function o_(e,t){return `_${t}_${e.replace(/[^\w]/g,(t,n)=>"-"===t?"_":e.charCodeAt(n).toString())}`}let oS=/([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/,ox={parseMode:"base",ns:0,delimiters:["{{","}}"],getNamespace:()=>0,isVoidTag:S,isPreTag:S,isIgnoreNewlineTag:S,isCustomElement:S,onError:s8,onWarn:s5,comments:!1,prefixIdentifiers:!1},oC=ox,ok=null,oT="",oN=null,ow=null,oA="",oE=-1,oI=-1,oR=0,oO=!1,oP=null,oM=[],oL=new class{constructor(e,t){this.stack=e,this.cbs=t,this.state=1,this.buffer="",this.sectionStart=0,this.index=0,this.entityStart=0,this.baseState=1,this.inRCDATA=!1,this.inXML=!1,this.inVPre=!1,this.newlines=[],this.mode=0,this.delimiterOpen=sY,this.delimiterClose=s0,this.delimiterIndex=-1,this.currentSequence=void 0,this.sequenceIndex=0;}get inSFCRoot(){return 2===this.mode&&0===this.stack.length}reset(){this.state=1,this.mode=0,this.buffer="",this.sectionStart=0,this.index=0,this.baseState=1,this.inRCDATA=!1,this.currentSequence=void 0,this.newlines.length=0,this.delimiterOpen=sY,this.delimiterClose=s0;}getPos(e){let t=1,n=e+1;for(let r=this.newlines.length-1;r>=0;r--){let i=this.newlines[r];if(e>i){t=r+2,n=e-i;break}}return {column:n,line:t,offset:e}}peek(){return this.buffer.charCodeAt(this.index+1)}stateText(e){60===e?(this.index>this.sectionStart&&this.cbs.ontext(this.sectionStart,this.index),this.state=5,this.sectionStart=this.index):this.inVPre||e!==this.delimiterOpen[0]||(this.state=2,this.delimiterIndex=0,this.stateInterpolationOpen(e));}stateInterpolationOpen(e){if(e===this.delimiterOpen[this.delimiterIndex]){if(this.delimiterIndex===this.delimiterOpen.length-1){let e=this.index+1-this.delimiterOpen.length;e>this.sectionStart&&this.cbs.ontext(this.sectionStart,e),this.state=3,this.sectionStart=e;}else this.delimiterIndex++;}else this.inRCDATA?(this.state=32,this.stateInRCDATA(e)):(this.state=1,this.stateText(e));}stateInterpolation(e){e===this.delimiterClose[0]&&(this.state=4,this.delimiterIndex=0,this.stateInterpolationClose(e));}stateInterpolationClose(e){e===this.delimiterClose[this.delimiterIndex]?this.delimiterIndex===this.delimiterClose.length-1?(this.cbs.oninterpolation(this.sectionStart,this.index+1),this.inRCDATA?this.state=32:this.state=1,this.sectionStart=this.index+1):this.delimiterIndex++:(this.state=3,this.stateInterpolation(e));}stateSpecialStartSequence(e){let t=this.sequenceIndex===this.currentSequence.length;if(t?s6(e):(32|e)===this.currentSequence[this.sequenceIndex]){if(!t){this.sequenceIndex++;return}}else this.inRCDATA=!1;this.sequenceIndex=0,this.state=6,this.stateInTagName(e);}stateInRCDATA(e){if(this.sequenceIndex===this.currentSequence.length){if(62===e||s2(e)){let t=this.index-this.currentSequence.length;if(this.sectionStart<t){let e=this.index;this.index=t,this.cbs.ontext(this.sectionStart,t),this.index=e;}this.sectionStart=t+2,this.stateInClosingTagName(e),this.inRCDATA=!1;return}this.sequenceIndex=0;}(32|e)===this.currentSequence[this.sequenceIndex]?this.sequenceIndex+=1:0===this.sequenceIndex?this.currentSequence!==s4.TitleEnd&&(this.currentSequence!==s4.TextareaEnd||this.inSFCRoot)?this.fastForwardTo(60)&&(this.sequenceIndex=1):this.inVPre||e!==this.delimiterOpen[0]||(this.state=2,this.delimiterIndex=0,this.stateInterpolationOpen(e)):this.sequenceIndex=Number(60===e);}stateCDATASequence(e){e===s4.Cdata[this.sequenceIndex]?++this.sequenceIndex===s4.Cdata.length&&(this.state=28,this.currentSequence=s4.CdataEnd,this.sequenceIndex=0,this.sectionStart=this.index+1):(this.sequenceIndex=0,this.state=23,this.stateInDeclaration(e));}fastForwardTo(e){for(;++this.index<this.buffer.length;){let t=this.buffer.charCodeAt(this.index);if(10===t&&this.newlines.push(this.index),t===e)return !0}return this.index=this.buffer.length-1,!1}stateInCommentLike(e){e===this.currentSequence[this.sequenceIndex]?++this.sequenceIndex===this.currentSequence.length&&(this.currentSequence===s4.CdataEnd?this.cbs.oncdata(this.sectionStart,this.index-2):this.cbs.oncomment(this.sectionStart,this.index-2),this.sequenceIndex=0,this.sectionStart=this.index+1,this.state=1):0===this.sequenceIndex?this.fastForwardTo(this.currentSequence[0])&&(this.sequenceIndex=1):e!==this.currentSequence[this.sequenceIndex-1]&&(this.sequenceIndex=0);}startSpecial(e,t){this.enterRCDATA(e,t),this.state=31;}enterRCDATA(e,t){this.inRCDATA=!0,this.currentSequence=e,this.sequenceIndex=t;}stateBeforeTagName(e){33===e?(this.state=22,this.sectionStart=this.index+1):63===e?(this.state=24,this.sectionStart=this.index+1):s1(e)?(this.sectionStart=this.index,0===this.mode?this.state=6:this.inSFCRoot?this.state=34:this.inXML?this.state=6:116===e?this.state=30:this.state=115===e?29:6):47===e?this.state=8:(this.state=1,this.stateText(e));}stateInTagName(e){s6(e)&&this.handleTagName(e);}stateInSFCRootTagName(e){if(s6(e)){let t=this.buffer.slice(this.sectionStart,this.index);"template"!==t&&this.enterRCDATA(s3("</"+t),0),this.handleTagName(e);}}handleTagName(e){this.cbs.onopentagname(this.sectionStart,this.index),this.sectionStart=-1,this.state=11,this.stateBeforeAttrName(e);}stateBeforeClosingTagName(e){s2(e)||(62===e?(this.state=1,this.sectionStart=this.index+1):(this.state=s1(e)?9:27,this.sectionStart=this.index));}stateInClosingTagName(e){(62===e||s2(e))&&(this.cbs.onclosetag(this.sectionStart,this.index),this.sectionStart=-1,this.state=10,this.stateAfterClosingTagName(e));}stateAfterClosingTagName(e){62===e&&(this.state=1,this.sectionStart=this.index+1);}stateBeforeAttrName(e){62===e?(this.cbs.onopentagend(this.index),this.inRCDATA?this.state=32:this.state=1,this.sectionStart=this.index+1):47===e?this.state=7:60===e&&47===this.peek()?(this.cbs.onopentagend(this.index),this.state=5,this.sectionStart=this.index):s2(e)||this.handleAttrStart(e);}handleAttrStart(e){118===e&&45===this.peek()?(this.state=13,this.sectionStart=this.index):46===e||58===e||64===e||35===e?(this.cbs.ondirname(this.index,this.index+1),this.state=14,this.sectionStart=this.index+1):(this.state=12,this.sectionStart=this.index);}stateInSelfClosingTag(e){62===e?(this.cbs.onselfclosingtag(this.index),this.state=1,this.sectionStart=this.index+1,this.inRCDATA=!1):s2(e)||(this.state=11,this.stateBeforeAttrName(e));}stateInAttrName(e){(61===e||s6(e))&&(this.cbs.onattribname(this.sectionStart,this.index),this.handleAttrNameEnd(e));}stateInDirName(e){61===e||s6(e)?(this.cbs.ondirname(this.sectionStart,this.index),this.handleAttrNameEnd(e)):58===e?(this.cbs.ondirname(this.sectionStart,this.index),this.state=14,this.sectionStart=this.index+1):46===e&&(this.cbs.ondirname(this.sectionStart,this.index),this.state=16,this.sectionStart=this.index+1);}stateInDirArg(e){61===e||s6(e)?(this.cbs.ondirarg(this.sectionStart,this.index),this.handleAttrNameEnd(e)):91===e?this.state=15:46===e&&(this.cbs.ondirarg(this.sectionStart,this.index),this.state=16,this.sectionStart=this.index+1);}stateInDynamicDirArg(e){93===e?this.state=14:(61===e||s6(e))&&(this.cbs.ondirarg(this.sectionStart,this.index+1),this.handleAttrNameEnd(e));}stateInDirModifier(e){61===e||s6(e)?(this.cbs.ondirmodifier(this.sectionStart,this.index),this.handleAttrNameEnd(e)):46===e&&(this.cbs.ondirmodifier(this.sectionStart,this.index),this.sectionStart=this.index+1);}handleAttrNameEnd(e){this.sectionStart=this.index,this.state=17,this.cbs.onattribnameend(this.index),this.stateAfterAttrName(e);}stateAfterAttrName(e){61===e?this.state=18:47===e||62===e?(this.cbs.onattribend(0,this.sectionStart),this.sectionStart=-1,this.state=11,this.stateBeforeAttrName(e)):s2(e)||(this.cbs.onattribend(0,this.sectionStart),this.handleAttrStart(e));}stateBeforeAttrValue(e){34===e?(this.state=19,this.sectionStart=this.index+1):39===e?(this.state=20,this.sectionStart=this.index+1):s2(e)||(this.sectionStart=this.index,this.state=21,this.stateInAttrValueNoQuotes(e));}handleInAttrValue(e,t){(e===t||this.fastForwardTo(t))&&(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(34===t?3:2,this.index+1),this.state=11);}stateInAttrValueDoubleQuotes(e){this.handleInAttrValue(e,34);}stateInAttrValueSingleQuotes(e){this.handleInAttrValue(e,39);}stateInAttrValueNoQuotes(e){s2(e)||62===e?(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(1,this.index),this.state=11,this.stateBeforeAttrName(e)):(39===e||60===e||61===e||96===e)&&this.cbs.onerr(18,this.index);}stateBeforeDeclaration(e){91===e?(this.state=26,this.sequenceIndex=0):this.state=45===e?25:23;}stateInDeclaration(e){(62===e||this.fastForwardTo(62))&&(this.state=1,this.sectionStart=this.index+1);}stateInProcessingInstruction(e){(62===e||this.fastForwardTo(62))&&(this.cbs.onprocessinginstruction(this.sectionStart,this.index),this.state=1,this.sectionStart=this.index+1);}stateBeforeComment(e){45===e?(this.state=28,this.currentSequence=s4.CommentEnd,this.sequenceIndex=2,this.sectionStart=this.index+1):this.state=23;}stateInSpecialComment(e){(62===e||this.fastForwardTo(62))&&(this.cbs.oncomment(this.sectionStart,this.index),this.state=1,this.sectionStart=this.index+1);}stateBeforeSpecialS(e){e===s4.ScriptEnd[3]?this.startSpecial(s4.ScriptEnd,4):e===s4.StyleEnd[3]?this.startSpecial(s4.StyleEnd,4):(this.state=6,this.stateInTagName(e));}stateBeforeSpecialT(e){e===s4.TitleEnd[3]?this.startSpecial(s4.TitleEnd,4):e===s4.TextareaEnd[3]?this.startSpecial(s4.TextareaEnd,4):(this.state=6,this.stateInTagName(e));}startEntity(){}stateInEntity(){}parse(e){for(this.buffer=e;this.index<this.buffer.length;){let e=this.buffer.charCodeAt(this.index);switch(10===e&&this.newlines.push(this.index),this.state){case 1:this.stateText(e);break;case 2:this.stateInterpolationOpen(e);break;case 3:this.stateInterpolation(e);break;case 4:this.stateInterpolationClose(e);break;case 31:this.stateSpecialStartSequence(e);break;case 32:this.stateInRCDATA(e);break;case 26:this.stateCDATASequence(e);break;case 19:this.stateInAttrValueDoubleQuotes(e);break;case 12:this.stateInAttrName(e);break;case 13:this.stateInDirName(e);break;case 14:this.stateInDirArg(e);break;case 15:this.stateInDynamicDirArg(e);break;case 16:this.stateInDirModifier(e);break;case 28:this.stateInCommentLike(e);break;case 27:this.stateInSpecialComment(e);break;case 11:this.stateBeforeAttrName(e);break;case 6:this.stateInTagName(e);break;case 34:this.stateInSFCRootTagName(e);break;case 9:this.stateInClosingTagName(e);break;case 5:this.stateBeforeTagName(e);break;case 17:this.stateAfterAttrName(e);break;case 20:this.stateInAttrValueSingleQuotes(e);break;case 18:this.stateBeforeAttrValue(e);break;case 8:this.stateBeforeClosingTagName(e);break;case 10:this.stateAfterClosingTagName(e);break;case 29:this.stateBeforeSpecialS(e);break;case 30:this.stateBeforeSpecialT(e);break;case 21:this.stateInAttrValueNoQuotes(e);break;case 7:this.stateInSelfClosingTag(e);break;case 23:this.stateInDeclaration(e);break;case 22:this.stateBeforeDeclaration(e);break;case 25:this.stateBeforeComment(e);break;case 24:this.stateInProcessingInstruction(e);break;case 33:this.stateInEntity();}this.index++;}this.cleanup(),this.finish();}cleanup(){this.sectionStart!==this.index&&(1===this.state||32===this.state&&0===this.sequenceIndex?(this.cbs.ontext(this.sectionStart,this.index),this.sectionStart=this.index):(19===this.state||20===this.state||21===this.state)&&(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=this.index));}finish(){this.handleTrailingData(),this.cbs.onend();}handleTrailingData(){let e=this.buffer.length;this.sectionStart>=e||(28===this.state?this.currentSequence===s4.CdataEnd?this.cbs.oncdata(this.sectionStart,e):this.cbs.oncomment(this.sectionStart,e):6===this.state||11===this.state||18===this.state||17===this.state||12===this.state||13===this.state||14===this.state||15===this.state||16===this.state||20===this.state||19===this.state||21===this.state||9===this.state||this.cbs.ontext(this.sectionStart,e));}emitCodePoint(e,t){}}(oM,{onerr:oQ,ontext(e,t){oB(oF(e,t),e,t);},ontextentity(e,t,n){oB(e,t,n);},oninterpolation(e,t){if(oO)return oB(oF(e,t),e,t);let n=e+oL.delimiterOpen.length,r=t-oL.delimiterClose.length;for(;s2(oT.charCodeAt(n));)n++;for(;s2(oT.charCodeAt(r-1));)r--;let i=oF(n,r);i.includes("&")&&(i=oC.decodeEntities(i,!1)),oz({type:5,content:oX(i,!1,oJ(n,r)),loc:oJ(e,t)});},onopentagname(e,t){let n=oF(e,t);oN={type:1,tag:n,ns:oC.getNamespace(n,oM[0],oC.ns),tagType:0,props:[],children:[],loc:oJ(e-1,t),codegenNode:void 0};},onopentagend(e){oV(e);},onclosetag(e,t){let n=oF(e,t);if(!oC.isVoidTag(n)){for(let e=0;e<oM.length;e++)if(oM[e].tag.toLowerCase()===n.toLowerCase()){e>0&&/* @__PURE__ *//*@__PURE__*/oM[0].loc.start.offset;for(let n=0;n<=e;n++)oU(oM.shift(),t,n<e);break}}},onselfclosingtag(e){let t=oN.tag;oN.isSelfClosing=!0,oV(e),oM[0]&&oM[0].tag===t&&oU(oM.shift(),e);},onattribname(e,t){ow={type:6,name:oF(e,t),nameLoc:oJ(e,t),value:void 0,loc:oJ(e)};},ondirname(e,t){let n=oF(e,t),r="."===n||":"===n?"bind":"@"===n?"on":"#"===n?"slot":n.slice(2);if(oO||""===r)ow={type:6,name:n,nameLoc:oJ(e,t),value:void 0,loc:oJ(e)};else if(ow={type:7,name:r,rawName:n,exp:void 0,arg:void 0,modifiers:"."===n?[sz("prop")]:[],loc:oJ(e)},"pre"===r){oO=oL.inVPre=!0,oP=oN;let e=oN.props;for(let t=0;t<e.length;t++)7===e[t].type&&(e[t]=function(e){let t={type:6,name:e.rawName,nameLoc:oJ(e.loc.start.offset,e.loc.start.offset+e.rawName.length),value:void 0,loc:e.loc};if(e.exp){let n=e.exp.loc;n.end.offset<e.loc.end.offset&&(n.start.offset--,n.start.column--,n.end.offset++,n.end.column++),t.value={type:2,content:e.exp.content,loc:n};}return t}(e[t]));}},ondirarg(e,t){if(e===t)return;let n=oF(e,t);if(oO)ow.name+=n,oG(ow.nameLoc,t);else {let r="["!==n[0];ow.arg=oX(r?n:n.slice(1,-1),r,oJ(e,t),r?3:0);}},ondirmodifier(e,t){let n=oF(e,t);if(oO)ow.name+="."+n,oG(ow.nameLoc,t);else if("slot"===ow.name){let e=ow.arg;e&&(e.content+="."+n,oG(e.loc,t));}else {let r=sz(n,!0,oJ(e,t));ow.modifiers.push(r);}},onattribdata(e,t){oA+=oF(e,t),oE<0&&(oE=e),oI=t;},onattribentity(e,t,n){oA+=e,oE<0&&(oE=t),oI=n;},onattribnameend(e){let t=oF(ow.loc.start.offset,e);7===ow.type&&(ow.rawName=t),oN.props.some(e=>(7===e.type?e.rawName:e.name)===t);},onattribend(e,t){oN&&ow&&(oG(ow.loc,t),0!==e&&(oA.includes("&")&&(oA=oC.decodeEntities(oA,!0)),6===ow.type?("class"===ow.name&&(oA=oK(oA).trim()),ow.value={type:2,content:oA,loc:1===e?oJ(oE,oI):oJ(oE-1,oI+1)},oL.inSFCRoot&&"template"===oN.tag&&"lang"===ow.name&&oA&&"html"!==oA&&oL.enterRCDATA(s3("</template"),0)):(ow.exp=oX(oA,!1,oJ(oE,oI),0,0),"for"===ow.name&&(ow.forParseResult=function(e){let t=e.loc,n=e.content,r=n.match(oS);if(!r)return;let[,i,l]=r,s=(e,n,r=!1)=>{let i=t.start.offset+n,l=i+e.length;return oX(e,!1,oJ(i,l),0,r?1:0)},o={source:s(l.trim(),n.indexOf(l,i.length)),value:void 0,key:void 0,index:void 0,finalized:!1},a=i.trim().replace(oD,"").trim(),c=i.indexOf(a),u=a.match(o$);if(u){let e;a=a.replace(o$,"").trim();let t=u[1].trim();if(t&&(e=n.indexOf(t,c+a.length),o.key=s(t,e,!0)),u[2]){let r=u[2].trim();r&&(o.index=s(r,n.indexOf(r,o.key?e+t.length:c+a.length),!0));}}return a&&(o.value=s(a,c,!0)),o}(ow.exp)))),(7!==ow.type||"pre"!==ow.name)&&oN.props.push(ow)),oA="",oE=oI=-1;},oncomment(e,t){oC.comments&&oz({type:3,content:oF(e,t),loc:oJ(e-4,t+3)});},onend(){let e=oT.length;for(let t=0;t<oM.length;t++)oU(oM[t],e-1),/* @__PURE__ *//*@__PURE__*/oM[t].loc.start.offset;},oncdata(e,t){0!==oM[0].ns&&oB(oF(e,t),e,t);},onprocessinginstruction(e){(oM[0]?oM[0].ns:oC.ns)===0&&oQ(21,e-1);}}),o$=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,oD=/^\(|\)$/g;function oF(e,t){return oT.slice(e,t)}function oV(e){oL.inSFCRoot&&(oN.innerLoc=oJ(e+1,e+1)),oz(oN);let{tag:t,ns:n}=oN;0===n&&oC.isPreTag(t)&&oR++,oC.isVoidTag(t)?oU(oN,e):(oM.unshift(oN),(1===n||2===n)&&(oL.inXML=!0)),oN=null;}function oB(e,t,n){{let t=oM[0]&&oM[0].tag;"script"!==t&&"style"!==t&&e.includes("&")&&(e=oC.decodeEntities(e,!1));}let r=oM[0]||ok,i=r.children[r.children.length-1];i&&2===i.type?(i.content+=e,oG(i.loc,n)):r.children.push({type:2,content:e,loc:oJ(t,n)});}function oU(e,t,n=!1){n?oG(e.loc,oj(t,60)):oG(e.loc,function(e,t){let n=e;for(;62!==oT.charCodeAt(n)&&n<oT.length-1;)n++;return n}(t)+1),oL.inSFCRoot&&(e.children.length?e.innerLoc.end=k({},e.children[e.children.length-1].loc.end):e.innerLoc.end=k({},e.innerLoc.start),e.innerLoc.source=oF(e.innerLoc.start.offset,e.innerLoc.end.offset));let{tag:r,ns:i,children:l}=e;if(!oO&&("slot"===r?e.tagType=2:function({tag:e,props:t}){if("template"===e){for(let e=0;e<t.length;e++)if(7===t[e].type&&oH.has(t[e].name))return !0}return !1}(e)?e.tagType=3:function({tag:e,props:t}){var n;if(oC.isCustomElement(e))return !1;if("component"===e||(n=e.charCodeAt(0))>64&&n<91||oe(e)||oC.isBuiltInComponent&&oC.isBuiltInComponent(e)||oC.isNativeTag&&!oC.isNativeTag(e))return !0;for(let e=0;e<t.length;e++){let n=t[e];if(6===n.type&&"is"===n.name&&n.value&&n.value.content.startsWith("vue:"))return !0}return !1}(e)&&(e.tagType=1)),oL.inRCDATA||(e.children=oW(l)),0===i&&oC.isIgnoreNewlineTag(r)){let e=l[0];e&&2===e.type&&(e.content=e.content.replace(/^\r?\n/,""));}0===i&&oC.isPreTag(r)&&oR--,oP===e&&(oO=oL.inVPre=!1,oP=null),oL.inXML&&(oM[0]?oM[0].ns:oC.ns)===0&&(oL.inXML=!1);}function oj(e,t){let n=e;for(;oT.charCodeAt(n)!==t&&n>=0;)n--;return n}let oH=/* @__PURE__ */new Set(["if","else","else-if","for","slot"]),oq=/\r\n/g;function oW(e,t){let n="preserve"!==oC.whitespace,r=!1;for(let t=0;t<e.length;t++){let i=e[t];if(2===i.type){if(oR)i.content=i.content.replace(oq,"\n");else if(function(e){for(let t=0;t<e.length;t++)if(!s2(e.charCodeAt(t)))return !1;return !0}(i.content)){let l=e[t-1]&&e[t-1].type,s=e[t+1]&&e[t+1].type;!l||!s||n&&(3===l&&(3===s||1===s)||1===l&&(3===s||1===s&&function(e){for(let t=0;t<e.length;t++){let n=e.charCodeAt(t);if(10===n||13===n)return !0}return !1}(i.content)))?(r=!0,e[t]=null):i.content=" ";}else n&&(i.content=oK(i.content));}}return r?e.filter(Boolean):e}function oK(e){let t="",n=!1;for(let r=0;r<e.length;r++)s2(e.charCodeAt(r))?n||(t+=" ",n=!0):(t+=e[r],n=!1);return t}function oz(e){(oM[0]||ok).children.push(e);}function oJ(e,t){return {start:oL.getPos(e),end:null==t?t:oL.getPos(t),source:null==t?t:oF(e,t)}}function oG(e,t){e.end=oL.getPos(t),e.source=oF(e.start.offset,t);}function oX(e,t=!1,n,r=0,i=0){return sz(e,t,n,r)}function /*@__PURE__*/oQ(e,t,n){oC.onError(/* @__PURE__ *//*@__PURE__*/s9(e,oJ(t,t)));}function oZ(e,t){let{children:n}=e;return 1===n.length&&1===t.type&&!og(t)}function oY(e,t){let{constantCache:n}=t;switch(e.type){case 1:if(0!==e.tagType)return 0;let r=n.get(e);if(void 0!==r)return r;let i=e.codegenNode;if(13!==i.type||i.isBlock&&"svg"!==e.tag&&"foreignObject"!==e.tag&&"math"!==e.tag)return 0;if(void 0!==i.patchFlag)return n.set(e,0),0;{let r=3,c=o1(e,t);if(0===c)return n.set(e,0),0;c<r&&(r=c);for(let i=0;i<e.children.length;i++){let l=oY(e.children[i],t);if(0===l)return n.set(e,0),0;l<r&&(r=l);}if(r>1)for(let i=0;i<e.props.length;i++){let l=e.props[i];if(7===l.type&&"bind"===l.name&&l.exp){let i=oY(l.exp,t);if(0===i)return n.set(e,0),0;i<r&&(r=i);}}if(i.isBlock){var l,s,o,a;for(let t=0;t<e.props.length;t++)if(7===e.props[t].type)return n.set(e,0),0;t.removeHelper(so),t.removeHelper((l=t.inSSR,s=i.isComponent,l||s?sa:sc)),i.isBlock=!1,t.helper((o=t.inSSR,a=i.isComponent,o||a?su:sd));}return n.set(e,r),r}case 2:case 3:return 3;case 9:case 11:case 10:default:return 0;case 5:case 12:return oY(e.content,t);case 4:return e.constType;case 8:let c=3;for(let n=0;n<e.children.length;n++){let r=e.children[n];if(M(r)||L(r))continue;let i=oY(r,t);if(0===i)return 0;i<c&&(c=i);}return c;case 20:return 2}}let o0=/* @__PURE__ */new Set([sT,sN,sw,sA]);function o1(e,t){let n=3,r=o2(e);if(r&&15===r.type){let{properties:e}=r;for(let r=0;r<e.length;r++){let i;let{key:l,value:s}=e[r],o=oY(l,t);if(0===o)return o;if(o<n&&(n=o),0===(i=4===s.type?oY(s,t):14===s.type?function e(t,n){if(14===t.type&&!M(t.callee)&&o0.has(t.callee)){let r=t.arguments[0];if(4===r.type)return oY(r,n);if(14===r.type)return e(r,n)}return 0}(s,t):0))return i;i<n&&(n=i);}}return n}function o2(e){let t=e.codegenNode;if(13===t.type)return t.props}function o6(e,t){t.currentNode=e;let{nodeTransforms:n}=t,r=[];for(let i=0;i<n.length;i++){let l=n[i](e,t);if(l&&(A(l)?r.push(...l):r.push(l)),!t.currentNode)return;e=t.currentNode;}switch(e.type){case 3:t.ssr||t.helper(sp);break;case 5:t.ssr||t.helper(sC);break;case 9:for(let n=0;n<e.branches.length;n++)o6(e.branches[n],t);break;case 10:case 11:case 1:case 0:!function(e,t){let n=0,r=()=>{n--;};for(;n<e.children.length;n++){let i=e.children[n];M(i)||(t.grandParent=t.parent,t.parent=e,t.childIndex=n,t.onNodeRemoved=r,o6(i,t));}}(e,t);}t.currentNode=e;let i=r.length;for(;i--;)r[i]();}function o3(e,t){let n=M(e)?t=>t===e:t=>e.test(t);return (e,r)=>{if(1===e.type){let{props:i}=e;if(3===e.tagType&&i.some(oh))return;let l=[];for(let s=0;s<i.length;s++){let o=i[s];if(7===o.type&&n(o.name)){i.splice(s,1),s--;let n=t(e,o,r);n&&l.push(n);}}return l}}}let o4="/*@__PURE__*/",o8=e=>`${sU[e]}: _${sU[e]}`;function o5(e,t,{helper:n,push:r,newline:i,isTS:l}){let s=n("component"===t?sm:sy);for(let n=0;n<e.length;n++){let o=e[n],a=o.endsWith("__self");a&&(o=o.slice(0,-6)),r(`const ${o_(o,t)} = ${s}(${JSON.stringify(o)}${a?", true":""})${l?"!":""}`),n<e.length-1&&i();}}function o9(e,t){let n=e.length>3;t.push("["),n&&t.indent(),o7(e,t,n),n&&t.deindent(),t.push("]");}function o7(e,t,n=!1,r=!0){let{push:i,newline:l}=t;for(let s=0;s<e.length;s++){let o=e[s];M(o)?i(o,-3):A(o)?o9(o,t):ae(o,t),s<e.length-1&&(n?(r&&i(","),l()):r&&i(", "));}}function ae(e,t){if(M(e)){t.push(e,-3);return}if(L(e)){t.push(t.helper(e));return}switch(e.type){case 1:case 9:case 11:case 12:ae(e.codegenNode,t);break;case 2:!function(e,t){t.push(JSON.stringify(e.content),-3,e);}(e,t);break;case 4:at(e,t);break;case 5:!function(e,t){let{push:n,helper:r,pure:i}=t;i&&n(o4),n(`${r(sC)}(`),ae(e.content,t),n(")");}(e,t);break;case 8:an(e,t);break;case 3:!function(e,t){let{push:n,helper:r,pure:i}=t;i&&n(o4),n(`${r(sp)}(${JSON.stringify(e.content)})`,-3,e);}(e,t);break;case 13:!function(e,t){let n;let{push:r,helper:i,pure:l}=t,{tag:s,props:o,children:a,patchFlag:c,dynamicProps:u,directives:d,isBlock:p,disableTracking:f,isComponent:h}=e;c&&(n=String(c)),d&&r(i(sb)+"("),p&&r(`(${i(so)}(${f?"true":""}), `),l&&r(o4),r(i(p?t.inSSR||h?sa:sc:t.inSSR||h?su:sd)+"(",-2,e),o7(function(e){let t=e.length;for(;t--&&null==e[t];);return e.slice(0,t+1).map(e=>e||"null")}([s,o,a,n,u]),t),r(")"),p&&r(")"),d&&(r(", "),ae(d,t),r(")"));}(e,t);break;case 14:!function(e,t){let{push:n,helper:r,pure:i}=t,l=M(e.callee)?e.callee:r(e.callee);i&&n(o4),n(l+"(",-2,e),o7(e.arguments,t),n(")");}(e,t);break;case 15:!function(e,t){let{push:n,indent:r,deindent:i,newline:l}=t,{properties:s}=e;if(!s.length){n("{}",-2,e);return}let o=s.length>1;n(o?"{":"{ "),o&&r();for(let e=0;e<s.length;e++){let{key:r,value:i}=s[e];!function(e,t){let{push:n}=t;8===e.type?(n("["),an(e,t),n("]")):e.isStatic?n(on(e.content)?e.content:JSON.stringify(e.content),-2,e):n(`[${e.content}]`,-3,e);}(r,t),n(": "),ae(i,t),e<s.length-1&&(n(","),l());}o&&i(),n(o?"}":" }");}(e,t);break;case 17:o9(e.elements,t);break;case 18:!function(e,t){let{push:n,indent:r,deindent:i}=t,{params:l,returns:s,body:o,newline:a,isSlot:c}=e;c&&n(`_${sU[s$]}(`),n("(",-2,e),A(l)?o7(l,t):l&&ae(l,t),n(") => "),(a||o)&&(n("{"),r()),s?(a&&n("return "),A(s)?o9(s,t):ae(s,t)):o&&ae(o,t),(a||o)&&(i(),n("}")),c&&n(")");}(e,t);break;case 19:!function(e,t){let{test:n,consequent:r,alternate:i,newline:l}=e,{push:s,indent:o,deindent:a,newline:c}=t;if(4===n.type){let e=!on(n.content);e&&s("("),at(n,t),e&&s(")");}else s("("),ae(n,t),s(")");l&&o(),t.indentLevel++,l||s(" "),s("? "),ae(r,t),t.indentLevel--,l&&c(),l||s(" "),s(": ");let u=19===i.type;!u&&t.indentLevel++,ae(i,t),!u&&t.indentLevel--,l&&a(!0);}(e,t);break;case 20:!function(e,t){let{push:n,helper:r,indent:i,deindent:l,newline:s}=t,{needPauseTracking:o,needArraySpread:a}=e;a&&n("[...("),n(`_cache[${e.index}] || (`),o&&(i(),n(`${r(sP)}(-1),`),s(),n("(")),n(`_cache[${e.index}] = `),ae(e.value,t),o&&(n(`).cacheIndex = ${e.index},`),s(),n(`${r(sP)}(1),`),s(),n(`_cache[${e.index}]`),l()),n(")"),a&&n(")]");}(e,t);break;case 21:o7(e.body,t,!0,!1);}}function at(e,t){let{content:n,isStatic:r}=e;t.push(r?JSON.stringify(n):n,-3,e);}function an(e,t){for(let n=0;n<e.children.length;n++){let r=e.children[n];M(r)?t.push(r,-3):ae(r,t);}}let ar=o3(/^(if|else|else-if)$/,(e,t,n)=>(function(e,t,n,r){if("else"!==t.name&&(!t.exp||!t.exp.content.trim())){let r=t.exp?t.exp.loc:e.loc;n.onError(/* @__PURE__ *//*@__PURE__*/s9(28,t.loc)),t.exp=sz("true",!1,r);}if("if"===t.name){var i;let l=ai(e,t),s={type:9,loc:oJ((i=e.loc).start.offset,i.end.offset),branches:[l]};if(n.replaceNode(s),r)return r(s,l,!0)}else {let i=n.parent.children,l=i.indexOf(e);for(;l-- >=-1;){let s=i[l];if(s&&3===s.type||s&&2===s.type&&!s.content.trim().length){n.removeNode(s);continue}if(s&&9===s.type){"else-if"===t.name&&void 0===s.branches[s.branches.length-1].condition&&n.onError(/* @__PURE__ *//*@__PURE__*/s9(30,e.loc)),n.removeNode();let i=ai(e,t);s.branches.push(i);let l=r&&r(s,i,!1);o6(i,n),l&&l(),n.currentNode=null;}else n.onError(/* @__PURE__ *//*@__PURE__*/s9(30,e.loc));break}}})(e,t,n,(e,t,r)=>{let i=n.parent.children,l=i.indexOf(e),s=0;for(;l-- >=0;){let e=i[l];e&&9===e.type&&(s+=e.branches.length);}return ()=>{r?e.codegenNode=al(t,s,n):function(e){for(;;)if(19===e.type){if(19!==e.alternate.type)return e;e=e.alternate;}else 20===e.type&&(e=e.value);}(e.codegenNode).alternate=al(t,s+e.branches.length-1,n);}}));function ai(e,t){let n=3===e.tagType;return {type:10,loc:e.loc,condition:"else"===t.name?void 0:t.exp,children:n&&!ou(e,"for")?e.children:[e],userKey:od(e,"key"),isTemplateIf:n}}function al(e,t,n){return e.condition?sQ(e.condition,as(e,t,n),sG(n.helper(sp),['""',"true"])):as(e,t,n)}function as(e,t,n){let{helper:r}=n,i=sK("key",sz(`${t}`,!1,sj,2)),{children:l}=e,s=l[0];if(1!==l.length||1!==s.type){if(1!==l.length||11!==s.type)return sH(n,r(sn),sW([i]),l,64,void 0,void 0,!0,!1,!1,e.loc);{let e=s.codegenNode;return ov(e,i,n),e}}{let e=s.codegenNode,t=14===e.type&&e.callee===sV?e.arguments[1].returns:e;return 13===t.type&&sZ(t,n),ov(t,i,n),e}}let ao=(e,t,n)=>{let{modifiers:r,loc:i}=e,l=e.arg,{exp:s}=e;if(s&&4===s.type&&!s.content.trim()&&(s=void 0),!s){if(4!==l.type||!l.isStatic)return n.onError(s9(52,l.loc)),{props:[sK(l,sz("",!0,i))]};aa(e),s=e.exp;}return 4!==l.type?(l.children.unshift("("),l.children.push(') || ""')):l.isStatic||(l.content=`${l.content} || ""`),r.some(e=>"camel"===e.content)&&(4===l.type?l.isStatic?l.content=z(l.content):l.content=`${n.helperString(sI)}(${l.content})`:(l.children.unshift(`${n.helperString(sI)}(`),l.children.push(")"))),!n.inSSR&&(r.some(e=>"prop"===e.content)&&ac(l,"."),r.some(e=>"attr"===e.content)&&ac(l,"^")),{props:[sK(l,s)]}},aa=(e,t)=>{let n=e.arg,r=z(n.content);e.exp=sz(r,!1,n.loc);},ac=(e,t)=>{4===e.type?e.isStatic?e.content=t+e.content:e.content=`\`${t}\${${e.content}}\``:(e.children.unshift(`'${t}' + (`),e.children.push(")"));},au=o3("for",(e,t,n)=>{let{helper:r,removeHelper:i}=n;return function(e,t,n,r){if(!t.exp){n.onError(/* @__PURE__ *//*@__PURE__*/s9(31,t.loc));return}let i=t.forParseResult;if(!i){n.onError(/* @__PURE__ *//*@__PURE__*/s9(32,t.loc));return}ad(i);let{addIdentifiers:l,removeIdentifiers:s,scopes:o}=n,{source:a,value:c,key:u,index:d}=i,p={type:11,loc:t.loc,source:a,valueAlias:c,keyAlias:u,objectIndexAlias:d,parseResult:i,children:om(e)?e.children:[e]};n.replaceNode(p),o.vFor++;let f=r&&r(p);return ()=>{o.vFor--,f&&f();}}(e,t,n,t=>{let l=sG(r(s_),[t.source]),s=om(e),o=ou(e,"memo"),a=od(e,"key",!1,!0);a&&7===a.type&&!a.exp&&aa(a);let c=a&&(6===a.type?a.value?sz(a.value.content,!0):void 0:a.exp),u=a&&c?sK("key",c):null,d=4===t.source.type&&t.source.constType>0,p=d?64:a?128:256;return t.codegenNode=sH(n,r(sn),void 0,l,p,void 0,void 0,!0,!d,!1,e.loc),()=>{let a;let{children:p}=t,f=1!==p.length||1!==p[0].type,h=og(e)?e:s&&1===e.children.length&&og(e.children[0])?e.children[0]:null;if(h)a=h.codegenNode,s&&u&&ov(a,u,n);else if(f)a=sH(n,r(sn),u?sW([u]):void 0,e.children,64,void 0,void 0,!0,void 0,!1);else {var m,g,y,b,_,S,x,C;a=p[0].codegenNode,s&&u&&ov(a,u,n),!d!==a.isBlock&&(a.isBlock?(i(so),i((m=n.inSSR,g=a.isComponent,m||g?sa:sc))):i((y=n.inSSR,b=a.isComponent,y||b?su:sd))),(a.isBlock=!d,a.isBlock)?(r(so),r((_=n.inSSR,S=a.isComponent,_||S?sa:sc))):r((x=n.inSSR,C=a.isComponent,x||C?su:sd));}if(o){let e=sX(ap(t.parseResult,[sz("_cached")]));e.body={type:21,body:[sJ(["const _memo = (",o.exp,")"]),sJ(["if (_cached",...c?[" && _cached.key === ",c]:[],` && ${n.helperString(sB)}(_cached, _memo)) return _cached`]),sJ(["const _item = ",a]),sz("_item.memo = _memo"),sz("return _item")],loc:sj},l.arguments.push(e,sz("_cache"),sz(String(n.cached.length))),n.cached.push(null);}else l.arguments.push(sX(ap(t.parseResult),a,!0));}})});function ad(e,t){e.finalized||(e.finalized=!0);}function ap({value:e,key:t,index:n},r=[]){return function(e){let t=e.length;for(;t--&&!e[t];);return e.slice(0,t+1).map((e,t)=>e||sz("_".repeat(t+1),!1))}([e,t,n,...r])}let af=sz("undefined",!1),ah=(e,t)=>{if(1===e.type&&(1===e.tagType||3===e.tagType)){let n=ou(e,"slot");if(n)return n.exp,t.scopes.vSlot++,()=>{t.scopes.vSlot--;}}},am=(e,t,n,r)=>sX(e,n,!1,!0,n.length?n[0].loc:r);function ag(e,t,n){let r=[sK("name",e),sK("fn",t)];return null!=n&&r.push(sK("key",sz(String(n),!0))),sW(r)}let ay=/* @__PURE__ */new WeakMap,av=(e,t)=>function(){let n,r,i,l,s;if(!(1===(e=t.currentNode).type&&(0===e.tagType||1===e.tagType)))return;let{tag:o,props:a}=e,c=1===e.tagType,u=c?function(e,t,n=!1){let{tag:r}=e,i=aS(r),l=od(e,"is",!1,!0);if(l){if(i){let e;if(6===l.type?e=l.value&&sz(l.value.content,!0):(e=l.exp)||(e=sz("is",!1,l.arg.loc)),e)return sG(t.helper(sg),[e])}else 6===l.type&&l.value.content.startsWith("vue:")&&(r=l.value.content.slice(4));}let s=oe(r)||t.isBuiltInComponent(r);return s?(n||t.helper(s),s):(t.helper(sm),t.components.add(r),o_(r,"component"))}(e,t):`"${o}"`,d=$(u)&&u.callee===sg,p=0,f=d||u===sr||u===si||!c&&("svg"===o||"foreignObject"===o||"math"===o);if(a.length>0){let r=ab(e,t,void 0,c,d);n=r.props,p=r.patchFlag,l=r.dynamicPropNames;let i=r.directives;s=i&&i.length?sq(i.map(e=>(function(e,t){let n=[],r=ay.get(e);r?n.push(t.helperString(r)):(t.helper(sy),t.directives.add(e.name),n.push(o_(e.name,"directive")));let{loc:i}=e;if(e.exp&&n.push(e.exp),e.arg&&(e.exp||n.push("void 0"),n.push(e.arg)),Object.keys(e.modifiers).length){e.arg||(e.exp||n.push("void 0"),n.push("void 0"));let t=sz("true",!1,i);n.push(sW(e.modifiers.map(e=>sK(e,t)),i));}return sq(n,e.loc)})(e,t))):void 0,r.shouldUseBlock&&(f=!0);}if(e.children.length>0){if(u===sl&&(f=!0,p|=1024),c&&u!==sr&&u!==sl){let{slots:n,hasDynamicSlots:i}=function(e,t,n=am){t.helper(s$);let{children:r,loc:i}=e,l=[],s=[],o=t.scopes.vSlot>0||t.scopes.vFor>0,a=ou(e,"slot",!0);if(a){let{arg:e,exp:t}=a;e&&!s7(e)&&(o=!0),l.push(sK(e||sz("default",!0),n(t,void 0,r,i)));}let c=!1,u=!1,d=[],p=/* @__PURE__ */new Set,f=0;for(let e=0;e<r.length;e++){let i,h,m,g;let y=r[e];if(!om(y)||!(i=ou(y,"slot",!0))){3!==y.type&&d.push(y);continue}if(a){t.onError(/* @__PURE__ *//*@__PURE__*/s9(37,i.loc));break}c=!0;let{children:b,loc:_}=y,{arg:S=sz("default",!0),exp:x,loc:C}=i;s7(S)?h=S?S.content:"default":o=!0;let k=ou(y,"for"),T=n(x,k,b,_);if(m=ou(y,"if"))o=!0,s.push(sQ(m.exp,ag(S,T,f++),af));else if(g=ou(y,/^else(-if)?$/,!0)){let n,i=e;for(;i--&&3===(n=r[i]).type;);if(n&&om(n)&&ou(n,/^(else-)?if$/)){let e=s[s.length-1];for(;19===e.alternate.type;)e=e.alternate;e.alternate=g.exp?sQ(g.exp,ag(S,T,f++),af):ag(S,T,f++);}else t.onError(/* @__PURE__ *//*@__PURE__*/s9(30,g.loc));}else if(k){o=!0;let e=k.forParseResult;e?(ad(e),s.push(sG(t.helper(s_),[e.source,sX(ap(e),ag(S,T),!0)]))):t.onError(s9(32,k.loc));}else {if(h){if(p.has(h)){t.onError(s9(38,C));continue}p.add(h),"default"===h&&(u=!0);}l.push(sK(S,T));}}if(!a){let e=(e,t)=>sK("default",n(e,void 0,t,i));c?d.length&&d.some(e=>(function e(t){return 2!==t.type&&12!==t.type||(2===t.type?!!t.content.trim():e(t.content))})(e))&&(u?t.onError(s9(39,d[0].loc)):l.push(e(void 0,d))):l.push(e(void 0,r));}let h=o?2:!function e(t){for(let n=0;n<t.length;n++){let r=t[n];switch(r.type){case 1:if(2===r.tagType||e(r.children))return !0;break;case 9:if(e(r.branches))return !0;break;case 10:case 11:if(e(r.children))return !0}}return !1}(e.children)?1:3,m=sW(l.concat(sK("_",sz(h+"",!1))),i);return s.length&&(m=sG(t.helper(sx),[m,sq(s)])),{slots:m,hasDynamicSlots:o}}(e,t);r=n,i&&(p|=1024);}else if(1===e.children.length&&u!==sr){let n=e.children[0],i=n.type,l=5===i||8===i;l&&0===oY(n,t)&&(p|=1),r=l||2===i?n:e.children;}else r=e.children;}l&&l.length&&(i=function(e){let t="[";for(let n=0,r=e.length;n<r;n++)t+=JSON.stringify(e[n]),n<r-1&&(t+=", ");return t+"]"}(l)),e.codegenNode=sH(t,u,n,r,0===p?void 0:p,i,s,!!f,!1,c,e.loc);};function ab(e,t,n=e.props,r,i,l=!1){let s;let{tag:o,loc:a,children:c}=e,u=[],d=[],p=[],f=c.length>0,h=!1,m=0,g=!1,y=!1,b=!1,_=!1,S=!1,C=!1,k=[],T=e=>{u.length&&(d.push(sW(a_(u),a)),u=[]),e&&d.push(e);},N=()=>{t.scopes.vFor>0&&u.push(sK(sz("ref_for",!0),sz("true")));},w=({key:e,value:n})=>{if(s7(e)){let l=e.content,s=x(l);s&&(!r||i)&&"onclick"!==l.toLowerCase()&&"onUpdate:modelValue"!==l&&!H(l)&&(_=!0),s&&H(l)&&(C=!0),s&&14===n.type&&(n=n.arguments[0]),20===n.type||(4===n.type||8===n.type)&&oY(n,t)>0||("ref"===l?g=!0:"class"===l?y=!0:"style"===l?b=!0:"key"===l||k.includes(l)||k.push(l),r&&("class"===l||"style"===l)&&!k.includes(l)&&k.push(l));}else S=!0;};for(let i=0;i<n.length;i++){let s=n[i];if(6===s.type){let{loc:e,name:t,nameLoc:n,value:r}=s;if("ref"===t&&(g=!0,N()),"is"===t&&(aS(o)||r&&r.content.startsWith("vue:")))continue;u.push(sK(sz(t,!0,n),sz(r?r.content:"",!0,r?r.loc:e)));}else {let{name:n,arg:i,exp:c,loc:g,modifiers:y}=s,b="bind"===n,_="on"===n;if("slot"===n){r||t.onError(/* @__PURE__ *//*@__PURE__*/s9(40,g));continue}if("once"===n||"memo"===n||"is"===n||b&&op(i,"is")&&aS(o)||_&&l)continue;if((b&&op(i,"key")||_&&f&&op(i,"vue:before-update"))&&(h=!0),b&&op(i,"ref")&&N(),!i&&(b||_)){S=!0,c?b?(N(),T(),d.push(c)):T({type:14,loc:g,callee:t.helper(sE),arguments:r?[c]:[c,"true"]}):t.onError(s9(b?34:35,g));continue}b&&y.some(e=>"prop"===e.content)&&(m|=32);let x=t.directiveTransforms[n];if(x){let{props:n,needRuntime:r}=x(s,e,t);l||n.forEach(w),_&&i&&!s7(i)?T(sW(n,a)):u.push(...n),r&&(p.push(s),L(r)&&ay.set(s,r));}else !q(n)&&(p.push(s),f&&(h=!0));}}if(d.length?(T(),s=d.length>1?sG(t.helper(sk),d,a):d[0]):u.length&&(s=sW(a_(u),a)),S?m|=16:(y&&!r&&(m|=2),b&&!r&&(m|=4),k.length&&(m|=8),_&&(m|=32)),!h&&(0===m||32===m)&&(g||C||p.length>0)&&(m|=512),!t.inSSR&&s)switch(s.type){case 15:let A=-1,E=-1,I=!1;for(let e=0;e<s.properties.length;e++){let t=s.properties[e].key;s7(t)?"class"===t.content?A=e:"style"===t.content&&(E=e):t.isHandlerKey||(I=!0);}let R=s.properties[A],O=s.properties[E];I?s=sG(t.helper(sw),[s]):(R&&!s7(R.value)&&(R.value=sG(t.helper(sT),[R.value])),O&&(b||4===O.value.type&&"["===O.value.content.trim()[0]||17===O.value.type)&&(O.value=sG(t.helper(sN),[O.value])));break;case 14:break;default:s=sG(t.helper(sw),[sG(t.helper(sA),[s])]);}return {props:s,directives:p,patchFlag:m,dynamicPropNames:k,shouldUseBlock:h}}function a_(e){let t=/* @__PURE__ */new Map,n=[];for(let r=0;r<e.length;r++){let i=e[r];if(8===i.key.type||!i.key.isStatic){n.push(i);continue}let l=i.key.content,s=t.get(l);s?("style"===l||"class"===l||x(l))&&(17===s.value.type?s.value.elements.push(i.value):s.value=sq([s.value,i.value],s.loc)):(t.set(l,i),n.push(i));}return n}function aS(e){return "component"===e||"Component"===e}let ax=(e,t)=>{if(og(e)){let{children:n,loc:r}=e,{slotName:i,slotProps:l}=function(e,t){let n,r='"default"',i=[];for(let t=0;t<e.props.length;t++){let n=e.props[t];if(6===n.type)n.value&&("name"===n.name?r=JSON.stringify(n.value.content):(n.name=z(n.name),i.push(n)));else if("bind"===n.name&&op(n.arg,"name")){if(n.exp)r=n.exp;else if(n.arg&&4===n.arg.type){let e=z(n.arg.content);r=n.exp=sz(e,!1,n.arg.loc);}}else "bind"===n.name&&n.arg&&s7(n.arg)&&(n.arg.content=z(n.arg.content)),i.push(n);}if(i.length>0){let{props:r,directives:l}=ab(e,t,i,!1,!1);n=r,l.length&&t.onError(s9(36,l[0].loc));}return {slotName:r,slotProps:n}}(e,t),s=[t.prefixIdentifiers?"_ctx.$slots":"$slots",i,"{}","undefined","true"],o=2;l&&(s[2]=l,o=3),n.length&&(s[3]=sX([],n,!1,!1,r),o=4),t.scopeId&&!t.slotted&&(o=5),s.splice(o),e.codegenNode=sG(t.helper(sS),s,r);}},aC=(e,t,n,r)=>{let i;let{loc:l,modifiers:s,arg:o}=e;if(e.exp||s.length,4===o.type){if(o.isStatic){let e=o.content;e.startsWith("vue:")&&(e=`vnode-${e.slice(4)}`),i=sz(0!==t.tagType||e.startsWith("vnode")||!/[A-Z]/.test(e)?Q(z(e)):`on:${e}`,!0,o.loc);}else i=sJ([`${n.helperString(sO)}(`,o,")"]);}else (i=o).children.unshift(`${n.helperString(sO)}(`),i.children.push(")");let a=e.exp;a&&!a.content.trim()&&(a=void 0);let c=n.cacheHandlers&&!a&&!n.inVOnce;if(a){let e=oo(a),t=!(e||oc(a)),n=a.content.includes(";");(t||c&&e)&&(a=sJ([`${t?"$event":"(...args)"} => ${n?"{":"("}`,a,n?"}":")"]));}let u={props:[sK(i,a||sz("() => {}",!1,l))]};return r&&(u=r(u)),c&&(u.props[0].value=n.cache(u.props[0].value)),u.props.forEach(e=>e.key.isHandlerKey=!0),u},ak=(e,t)=>{if(0===e.type||1===e.type||11===e.type||10===e.type)return ()=>{let n;let r=e.children,i=!1;for(let e=0;e<r.length;e++){let t=r[e];if(of(t)){i=!0;for(let i=e+1;i<r.length;i++){let l=r[i];if(of(l))n||(n=r[e]=sJ([t],t.loc)),n.children.push(" + ",l),r.splice(i,1),i--;else {n=void 0;break}}}}if(i&&(1!==r.length||0!==e.type&&(1!==e.type||0!==e.tagType||e.props.find(e=>7===e.type&&!t.directiveTransforms[e.name]))))for(let e=0;e<r.length;e++){let n=r[e];if(of(n)||8===n.type){let i=[];(2!==n.type||" "!==n.content)&&i.push(n),t.ssr||0!==oY(n,t)||i.push("1"),r[e]={type:12,content:n,loc:n.loc,codegenNode:sG(t.helper(sf),i)};}}}},aT=/* @__PURE__ */new WeakSet,aN=(e,t)=>{if(1===e.type&&ou(e,"once",!0)&&!aT.has(e)&&!t.inVOnce&&!t.inSSR)return aT.add(e),t.inVOnce=!0,t.helper(sP),()=>{t.inVOnce=!1;let e=t.currentNode;e.codegenNode&&(e.codegenNode=t.cache(e.codegenNode,!0));}},aw=(e,t,n)=>{let r;let{exp:i,arg:l}=e;if(!i)return n.onError(/* @__PURE__ *//*@__PURE__*/s9(41,e.loc)),aA();let s=i.loc.source.trim(),o=4===i.type?i.content:s,a=n.bindingMetadata[s];if("props"===a||"props-aliased"===a)return /* @__PURE__ */i.loc,aA();if(!o.trim()||!oo(i))return n.onError(/* @__PURE__ *//*@__PURE__*/s9(42,i.loc)),aA();let c=l||sz("modelValue",!0),u=l?s7(l)?`onUpdate:${z(l.content)}`:sJ(['"onUpdate:" + ',l]):"onUpdate:modelValue",d=n.isTS?"($event: any)":"$event";r=sJ([`${d} => ((`,i,") = $event)"]);let p=[sK(c,e.exp),sK(u,r)];if(e.modifiers.length&&1===t.tagType){let t=e.modifiers.map(e=>e.content).map(e=>(on(e)?e:JSON.stringify(e))+": true").join(", "),n=l?s7(l)?`${l.content}Modifiers`:sJ([l,' + "Modifiers"']):"modelModifiers";p.push(sK(n,sz(`{ ${t} }`,!1,e.loc,2)));}return aA(p)};function aA(e=[]){return {props:e}}let aE=/* @__PURE__ */new WeakSet,aI=(e,t)=>{if(1===e.type){let n=ou(e,"memo");if(!(!n||aE.has(e)))return aE.add(e),()=>{let r=e.codegenNode||t.currentNode.codegenNode;r&&13===r.type&&(1!==e.tagType&&sZ(r,t),e.codegenNode=sG(t.helper(sV),[n.exp,sX(void 0,r),"_cache",String(t.cached.length)]),t.cached.push(null));}}},aR=Symbol(""),aO=Symbol(""),aP=Symbol(""),aM=Symbol(""),aL=Symbol(""),a$=Symbol(""),aD=Symbol(""),aF=Symbol(""),aV=Symbol(""),aB=Symbol("");!function(e){Object.getOwnPropertySymbols(e).forEach(t=>{sU[t]=e[t];});}({[aR]:"vModelRadio",[aO]:"vModelCheckbox",[aP]:"vModelText",[aM]:"vModelSelect",[aL]:"vModelDynamic",[a$]:"withModifiers",[aD]:"withKeys",[aF]:"vShow",[aV]:"Transition",[aB]:"TransitionGroup"});let aU={parseMode:"html",isVoidTag:eh,isNativeTag:e=>ed(e)||ep(e)||ef(e),isPreTag:e=>"pre"===e,isIgnoreNewlineTag:e=>"pre"===e||"textarea"===e,decodeEntities:function(e,t=!1){return (f||(f=document.createElement("div")),t)?(f.innerHTML=`<div foo="${e.replace(/"/g,"&quot;")}">`,f.children[0].getAttribute("foo")):(f.innerHTML=e,f.textContent)},isBuiltInComponent:e=>"Transition"===e||"transition"===e?aV:"TransitionGroup"===e||"transition-group"===e?aB:void 0,getNamespace(e,t,n){let r=t?t.ns:n;if(t&&2===r){if("annotation-xml"===t.tag){if("svg"===e)return 1;t.props.some(e=>6===e.type&&"encoding"===e.name&&null!=e.value&&("text/html"===e.value.content||"application/xhtml+xml"===e.value.content))&&(r=0);}else /^m(?:[ions]|text)$/.test(t.tag)&&"mglyph"!==e&&"malignmark"!==e&&(r=0);}else t&&1===r&&("foreignObject"===t.tag||"desc"===t.tag||"title"===t.tag)&&(r=0);if(0===r){if("svg"===e)return 1;if("math"===e)return 2}return r}},aj=(e,t)=>sz(JSON.stringify(ec(e)),!1,t,3),aH=/* @__PURE__ */g("passive,once,capture"),aq=/* @__PURE__ */g("stop,prevent,self,ctrl,shift,alt,meta,exact,middle"),aW=/* @__PURE__ */g("left,right"),aK=/* @__PURE__ */g("onkeyup,onkeydown,onkeypress"),az=(e,t,n,r)=>{let i=[],l=[],s=[];for(let n=0;n<t.length;n++){let r=t[n].content;aH(r)?s.push(r):aW(r)?s7(e)?aK(e.content.toLowerCase())?i.push(r):l.push(r):(i.push(r),l.push(r)):aq(r)?l.push(r):i.push(r);}return {keyModifiers:i,nonKeyModifiers:l,eventOptionModifiers:s}},aJ=(e,t)=>s7(e)&&"onclick"===e.content.toLowerCase()?sz(t,!0):4!==e.type?sJ(["(",e,`) === "onClick" ? "${t}" : (`,e,")"]):e,aG=(e,t)=>{1===e.type&&0===e.tagType&&("script"===e.tag||"style"===e.tag)&&t.removeNode();},aX=[e=>{1===e.type&&e.props.forEach((t,n)=>{6===t.type&&"style"===t.name&&t.value&&(e.props[n]={type:7,name:"bind",arg:sz("style",!0,t.loc),exp:aj(t.value.content,t.loc),modifiers:[],loc:t.loc});});}],aQ={cloak:()=>({props:[]}),html:(e,t,n)=>{let{exp:r,loc:i}=e;return r||n.onError(s9(53,i)),t.children.length&&(n.onError(s9(54,i)),t.children.length=0),{props:[sK(sz("innerHTML",!0,i),r||sz("",!0))]}},text:(e,t,n)=>{let{exp:r,loc:i}=e;return r||n.onError(s9(55,i)),t.children.length&&(n.onError(s9(56,i)),t.children.length=0),{props:[sK(sz("textContent",!0),r?oY(r,n)>0?r:sG(n.helperString(sC),[r],i):sz("",!0))]}},model:(e,t,n)=>{let r=aw(e,t,n);if(!r.props.length||1===t.tagType)return r;e.arg&&n.onError(s9(58,e.arg.loc));let{tag:i}=t,l=n.isCustomElement(i);if("input"===i||"textarea"===i||"select"===i||l){let s=aP,o=!1;if("input"===i||l){let r=od(t,"type");if(r){if(7===r.type)s=aL;else if(r.value)switch(r.value.content){case"radio":s=aR;break;case"checkbox":s=aO;break;case"file":o=!0,n.onError(s9(59,e.loc));}}else t.props.some(e=>7===e.type&&"bind"===e.name&&(!e.arg||4!==e.arg.type||!e.arg.isStatic))&&(s=aL);}else "select"===i&&(s=aM);o||(r.needRuntime=n.helper(s));}else n.onError(s9(57,e.loc));return r.props=r.props.filter(e=>!(4===e.key.type&&"modelValue"===e.key.content)),r},on:(e,t,n)=>aC(e,t,n,t=>{let{modifiers:r}=e;if(!r.length)return t;let{key:i,value:l}=t.props[0],{keyModifiers:s,nonKeyModifiers:o,eventOptionModifiers:a}=az(i,r,n,e.loc);if(o.includes("right")&&(i=aJ(i,"onContextmenu")),o.includes("middle")&&(i=aJ(i,"onMouseup")),o.length&&(l=sG(n.helper(a$),[l,JSON.stringify(o)])),s.length&&(!s7(i)||aK(i.content.toLowerCase()))&&(l=sG(n.helper(aD),[l,JSON.stringify(s)])),a.length){let e=a.map(X).join("");i=s7(i)?sz(`${i.content}${e}`,!0):sJ(["(",i,`) + "${e}"`]);}return {props:[sK(i,l)]}}),show:(e,t,n)=>{let{exp:r,loc:i}=e;return !r&&n.onError(s9(61,i)),{props:[],needRuntime:n.helper(aF)}}},aZ=/* @__PURE__ */Object.create(null);function aY(e,t){if(!M(e)){if(!e.nodeType)return _;e=e.innerHTML;}let n=e+JSON.stringify(t,(e,t)=>"function"==typeof t?t.toString():t),r=aZ[n];if(r)return r;if("#"===e[0]){let t=document.querySelector(e);e=t?t.innerHTML:"";}let i=k({hoistStatic:!0,onError:void 0,onWarn:_},t);i.isCustomElement||"undefined"==typeof customElements||(i.isCustomElement=e=>!!customElements.get(e));let{code:l}=function(e,t={}){return function(e,t={}){let n=t.onError||s8,r="module"===t.mode;!0===t.prefixIdentifiers?n(/* @__PURE__ *//*@__PURE__*/s9(47)):r&&n(/* @__PURE__ *//*@__PURE__*/s9(48)),t.cacheHandlers&&n(/* @__PURE__ *//*@__PURE__*/s9(49)),t.scopeId&&!r&&n(/* @__PURE__ *//*@__PURE__*/s9(50));let i=k({},t,{prefixIdentifiers:!1}),l=M(e)?function(e,t){if(oL.reset(),oN=null,ow=null,oA="",oE=-1,oI=-1,oM.length=0,oT=e,oC=k({},ox),t){let e;for(e in t)null!=t[e]&&(oC[e]=t[e]);}oL.mode="html"===oC.parseMode?1:"sfc"===oC.parseMode?2:0,oL.inXML=1===oC.ns||2===oC.ns;let n=t&&t.delimiters;n&&(oL.delimiterOpen=s3(n[0]),oL.delimiterClose=s3(n[1]));let r=ok=function(e,t=""){return {type:0,source:t,children:e,helpers:/* @__PURE__ */new Set,components:[],directives:[],hoists:[],imports:[],cached:[],temps:0,codegenNode:void 0,loc:sj}}([],e);return oL.parse(oT),r.loc=oJ(0,e.length),r.children=oW(r.children),ok=null,r}(e,i):e,[s,o]=[[aN,ar,aI,au,ax,av,ah,ak],{on:aC,bind:ao,model:aw}];return !function(e,t){let n=function(e,{filename:t="",prefixIdentifiers:n=!1,hoistStatic:r=!1,hmr:i=!1,cacheHandlers:l=!1,nodeTransforms:s=[],directiveTransforms:o={},transformHoist:a=null,isBuiltInComponent:c=_,isCustomElement:u=_,expressionPlugins:d=[],scopeId:p=null,slotted:f=!0,ssr:h=!1,inSSR:m=!1,ssrCssVars:g="",bindingMetadata:b=y,inline:S=!1,isTS:x=!1,onError:C=s8,onWarn:k=s5,compatConfig:T}){let N=t.replace(/\?.*$/,"").match(/([^/\\]+)\.\w+$/),w={filename:t,selfName:N&&X(z(N[1])),prefixIdentifiers:n,hoistStatic:r,hmr:i,cacheHandlers:l,nodeTransforms:s,directiveTransforms:o,transformHoist:a,isBuiltInComponent:c,isCustomElement:u,expressionPlugins:d,scopeId:p,slotted:f,ssr:h,inSSR:m,ssrCssVars:g,bindingMetadata:b,inline:S,isTS:x,onError:C,onWarn:k,compatConfig:T,root:e,helpers:/* @__PURE__ */new Map,components:/* @__PURE__ */new Set,directives:/* @__PURE__ */new Set,hoists:[],imports:[],cached:[],constantCache:/* @__PURE__ */new WeakMap,temps:0,identifiers:/* @__PURE__ */Object.create(null),scopes:{vFor:0,vSlot:0,vPre:0,vOnce:0},parent:null,grandParent:null,currentNode:e,childIndex:0,inVOnce:!1,helper(e){let t=w.helpers.get(e)||0;return w.helpers.set(e,t+1),e},removeHelper(e){let t=w.helpers.get(e);if(t){let n=t-1;n?w.helpers.set(e,n):w.helpers.delete(e);}},helperString:e=>`_${sU[w.helper(e)]}`,replaceNode(e){w.parent.children[w.childIndex]=w.currentNode=e;},removeNode(e){let t=w.parent.children,n=e?t.indexOf(e):w.currentNode?w.childIndex:-1;e&&e!==w.currentNode?w.childIndex>n&&(w.childIndex--,w.onNodeRemoved()):(w.currentNode=null,w.onNodeRemoved()),w.parent.children.splice(n,1);},onNodeRemoved:_,addIdentifiers(e){},removeIdentifiers(e){},hoist(e){M(e)&&(e=sz(e)),w.hoists.push(e);let t=sz(`_hoisted_${w.hoists.length}`,!1,e.loc,2);return t.hoisted=e,t},cache(e,t=!1){let n=function(e,t,n=!1){return {type:20,index:e,value:t,needPauseTracking:n,needArraySpread:!1,loc:sj}}(w.cached.length,e,t);return w.cached.push(n),n}};return w}(e,t);o6(e,n),t.hoistStatic&&function e(t,n,r,i=!1,l=!1){let{children:s}=t,o=[];for(let n=0;n<s.length;n++){let a=s[n];if(1===a.type&&0===a.tagType){let e=i?0:oY(a,r);if(e>0){if(e>=2){a.codegenNode.patchFlag=-1,o.push(a);continue}}else {let e=a.codegenNode;if(13===e.type){let t=e.patchFlag;if((void 0===t||512===t||1===t)&&o1(a,r)>=2){let t=o2(a);t&&(e.props=r.hoist(t));}e.dynamicProps&&(e.dynamicProps=r.hoist(e.dynamicProps));}}}else if(12===a.type&&(i?0:oY(a,r))>=2){o.push(a);continue}if(1===a.type){let n=1===a.tagType;n&&r.scopes.vSlot++,e(a,t,r,!1,l),n&&r.scopes.vSlot--;}else if(11===a.type)e(a,t,r,1===a.children.length,!0);else if(9===a.type)for(let n=0;n<a.branches.length;n++)e(a.branches[n],t,r,1===a.branches[n].children.length,l);}let a=!1;if(o.length===s.length&&1===t.type){if(0===t.tagType&&t.codegenNode&&13===t.codegenNode.type&&A(t.codegenNode.children))t.codegenNode.children=c(sq(t.codegenNode.children)),a=!0;else if(1===t.tagType&&t.codegenNode&&13===t.codegenNode.type&&t.codegenNode.children&&!A(t.codegenNode.children)&&15===t.codegenNode.children.type){let e=u(t.codegenNode,"default");e&&(e.returns=c(sq(e.returns)),a=!0);}else if(3===t.tagType&&n&&1===n.type&&1===n.tagType&&n.codegenNode&&13===n.codegenNode.type&&n.codegenNode.children&&!A(n.codegenNode.children)&&15===n.codegenNode.children.type){let e=ou(t,"slot",!0),r=e&&e.arg&&u(n.codegenNode,e.arg);r&&(r.returns=c(sq(r.returns)),a=!0);}}if(!a)for(let e of o)e.codegenNode=r.cache(e.codegenNode);function c(e){let t=r.cache(e);return l&&r.hmr&&(t.needArraySpread=!0),t}function u(e,t){if(e.children&&!A(e.children)&&15===e.children.type){let n=e.children.properties.find(e=>e.key===t||e.key.content===t);return n&&n.value}}o.length&&r.transformHoist&&r.transformHoist(s,r,t);}(e,void 0,n,oZ(e,e.children[0])),t.ssr||function(e,t){let{helper:n}=t,{children:r}=e;if(1===r.length){let n=r[0];if(oZ(e,n)&&n.codegenNode){let r=n.codegenNode;13===r.type&&sZ(r,t),e.codegenNode=r;}else e.codegenNode=n;}else r.length>1&&(e.codegenNode=sH(t,n(sn),void 0,e.children,64,void 0,void 0,!0,void 0,!1));}(e,n),e.helpers=/* @__PURE__ */new Set([...n.helpers.keys()]),e.components=[...n.components],e.directives=[...n.directives],e.imports=n.imports,e.hoists=n.hoists,e.temps=n.temps,e.cached=n.cached,e.transformed=!0;}(l,k({},i,{nodeTransforms:[...s,...t.nodeTransforms||[]],directiveTransforms:k({},o,t.directiveTransforms||{})})),function(e,t={}){let n=function(e,{mode:t="function",prefixIdentifiers:n="module"===t,sourceMap:r=!1,filename:i="template.vue.html",scopeId:l=null,optimizeImports:s=!1,runtimeGlobalName:o="Vue",runtimeModuleName:a="vue",ssrRuntimeModuleName:c="vue/server-renderer",ssr:u=!1,isTS:d=!1,inSSR:p=!1}){let f={mode:t,prefixIdentifiers:n,sourceMap:r,filename:i,scopeId:l,optimizeImports:s,runtimeGlobalName:o,runtimeModuleName:a,ssrRuntimeModuleName:c,ssr:u,isTS:d,inSSR:p,source:e.source,code:"",column:1,line:1,offset:0,indentLevel:0,pure:!1,map:void 0,helper:e=>`_${sU[e]}`,push(e,t=-2,n){f.code+=e;},indent(){h(++f.indentLevel);},deindent(e=!1){e?--f.indentLevel:h(--f.indentLevel);},newline(){h(f.indentLevel);}};function h(e){f.push("\n"+"  ".repeat(e),0);}return f}(e,t);t.onContextCreated&&t.onContextCreated(n);let{mode:r,push:i,prefixIdentifiers:l,indent:s,deindent:o,newline:a,scopeId:c,ssr:u}=n,d=Array.from(e.helpers),p=d.length>0,f=!l&&"module"!==r;(function(e,t){let{ssr:n,prefixIdentifiers:r,push:i,newline:l,runtimeModuleName:s,runtimeGlobalName:o,ssrRuntimeModuleName:a}=t,c=Array.from(e.helpers);if(c.length>0&&(i(`const _Vue = ${o}
`,-1),e.hoists.length)){let e=[su,sd,sp,sf,sh].filter(e=>c.includes(e)).map(o8).join(", ");i(`const { ${e} } = _Vue
`,-1);}(function(e,t){if(!e.length)return;t.pure=!0;let{push:n,newline:r}=t;r();for(let i=0;i<e.length;i++){let l=e[i];l&&(n(`const _hoisted_${i+1} = `),ae(l,t),r());}t.pure=!1;})(e.hoists,t),l(),i("return ");})(e,n);let h=(u?["_ctx","_push","_parent","_attrs"]:["_ctx","_cache"]).join(", ");if(i(`function ${u?"ssrRender":"render"}(${h}) {`),s(),f&&(i("with (_ctx) {"),s(),p&&(i(`const { ${d.map(o8).join(", ")} } = _Vue
`,-1),a())),e.components.length&&(o5(e.components,"component",n),(e.directives.length||e.temps>0)&&a()),e.directives.length&&(o5(e.directives,"directive",n),e.temps>0&&a()),e.temps>0){i("let ");for(let t=0;t<e.temps;t++)i(`${t>0?", ":""}_temp${t}`);}return (e.components.length||e.directives.length||e.temps)&&(i(`
`,0),a()),u||i("return "),e.codegenNode?ae(e.codegenNode,n):i("null"),f&&(o(),i("}")),o(),i("}"),{ast:e,code:n.code,preamble:"",map:n.map?n.map.toJSON():void 0}}(l,i)}(e,k({},aU,t,{nodeTransforms:[aG,...aX,...t.nodeTransforms||[]],directiveTransforms:k({},aQ,t.directiveTransforms||{}),transformHoist:null}))}(e,i),s=Function(l)();return s._rc=!0,aZ[n]=s}return iU(aY),e.BaseTransition=nb,e.BaseTransitionPropsValidators=ng,e.Comment=io,e.DeprecationTypes=null,e.EffectScope=ex,e.ErrorCodes={SETUP_FUNCTION:0,0:"SETUP_FUNCTION",RENDER_FUNCTION:1,1:"RENDER_FUNCTION",NATIVE_EVENT_HANDLER:5,5:"NATIVE_EVENT_HANDLER",COMPONENT_EVENT_HANDLER:6,6:"COMPONENT_EVENT_HANDLER",VNODE_HOOK:7,7:"VNODE_HOOK",DIRECTIVE_HOOK:8,8:"DIRECTIVE_HOOK",TRANSITION_HOOK:9,9:"TRANSITION_HOOK",APP_ERROR_HANDLER:10,10:"APP_ERROR_HANDLER",APP_WARN_HANDLER:11,11:"APP_WARN_HANDLER",FUNCTION_REF:12,12:"FUNCTION_REF",ASYNC_COMPONENT_LOADER:13,13:"ASYNC_COMPONENT_LOADER",SCHEDULER:14,14:"SCHEDULER",COMPONENT_UPDATE:15,15:"COMPONENT_UPDATE",APP_UNMOUNT_CLEANUP:16,16:"APP_UNMOUNT_CLEANUP"},e.ErrorTypeStrings=null,e.Fragment=il,e.KeepAlive={name:"KeepAlive",__isKeepAlive:!0,props:{include:[String,RegExp,Array],exclude:[String,RegExp,Array],max:[String,Number]},setup(e,{slots:t}){let n=iL(),r=n.ctx,i=/* @__PURE__ */new Map,l=/* @__PURE__ */new Set,s=null,o=n.suspense,{renderer:{p:a,m:c,um:u,o:{createElement:d}}}=r,p=d("div");function f(e){nJ(e),u(e,n,o,!0);}function h(e){i.forEach((t,n)=>{let r=iK(t.type);r&&!e(r)&&m(n);});}function m(e){let t=i.get(e);!t||s&&ib(t,s)?s&&nJ(s):f(t),i.delete(e),l.delete(e);}r.activate=(e,t,n,r,i)=>{let l=e.component;c(e,t,n,0,o),a(l.vnode,e,t,n,l,o,r,e.slotScopeIds,i),rV(()=>{l.isDeactivated=!1,l.a&&Y(l.a);let t=e.props&&e.props.onVnodeMounted;t&&iR(t,l.parent,e);},o);},r.deactivate=e=>{let t=e.component;rK(t.m),rK(t.a),c(e,p,null,1,o),rV(()=>{t.da&&Y(t.da);let n=e.props&&e.props.onVnodeUnmounted;n&&iR(n,t.parent,e),t.isDeactivated=!0;},o);},rX(()=>[e.include,e.exclude],([e,t])=>{e&&h(t=>nq(e,t)),t&&h(e=>!nq(t,e));},{flush:"post",deep:!0});let g=null,y=()=>{null!=g&&(r5(n.subTree.type)?rV(()=>{i.set(g,nG(n.subTree));},n.subTree.suspense):i.set(g,nG(n.subTree)));};return nY(y),n1(y),n2(()=>{i.forEach(e=>{let{subTree:t,suspense:r}=n,i=nG(t);if(e.type===i.type&&e.key===i.key){nJ(i);let e=i.component.da;e&&rV(e,r);return}f(e);});}),()=>{if(g=null,!t.default)return s=null;let n=t.default(),r=n[0];if(n.length>1)return s=null,n;if(!iv(r)||!(4&r.shapeFlag)&&!(128&r.shapeFlag))return s=null,r;let o=nG(r);if(o.type===io)return s=null,o;let a=o.type,c=iK(nU(o)?o.type.__asyncResolved||{}:a),{include:u,exclude:d,max:p}=e;if(u&&(!c||!nq(u,c))||d&&c&&nq(d,c))return o.shapeFlag&=-257,s=o,r;let f=null==o.key?a:o.key,h=i.get(f);return o.el&&(o=iT(o),128&r.shapeFlag&&(r.ssContent=o)),g=f,h?(o.el=h.el,o.component=h.component,o.transition&&nk(o,o.transition),o.shapeFlag|=512,l.delete(f),l.add(f)):(l.add(f),p&&l.size>parseInt(p,10)&&m(l.values().next().value)),o.shapeFlag|=256,s=o,r5(r.type)?r:o}}},e.ReactiveEffect=ek,e.Static=ia,e.Suspense={name:"Suspense",__isSuspense:!0,process(e,t,n,r,i,l,s,o,a,c){if(null==e)(function(e,t,n,r,i,l,s,o,a){let{p:c,o:{createElement:u}}=a,d=u("div"),p=e.suspense=ie(e,i,r,t,d,n,l,s,o,a);c(null,p.pendingBranch=e.ssContent,d,null,r,p,l,s),p.deps>0?(r7(e,"onPending"),r7(e,"onFallback"),c(null,e.ssFallback,t,n,r,null,l,s),ii(p,e.ssFallback)):p.resolve(!1,!0);})(t,n,r,i,l,s,o,a,c);else {if(l&&l.deps>0&&!e.suspense.isInFallback){t.suspense=e.suspense,t.suspense.vnode=t,t.el=e.el;return}(function(e,t,n,r,i,l,s,o,{p:a,um:c,o:{createElement:u}}){let d=t.suspense=e.suspense;d.vnode=t,t.el=e.el;let p=t.ssContent,f=t.ssFallback,{activeBranch:h,pendingBranch:m,isInFallback:g,isHydrating:y}=d;if(m)d.pendingBranch=p,ib(p,m)?(a(m,p,d.hiddenContainer,null,i,d,l,s,o),d.deps<=0?d.resolve():g&&!y&&(a(h,f,n,r,i,null,l,s,o),ii(d,f))):(d.pendingId=r9++,y?(d.isHydrating=!1,d.activeBranch=m):c(m,i,d),d.deps=0,d.effects.length=0,d.hiddenContainer=u("div"),g?(a(null,p,d.hiddenContainer,null,i,d,l,s,o),d.deps<=0?d.resolve():(a(h,f,n,r,i,null,l,s,o),ii(d,f))):h&&ib(p,h)?(a(h,p,n,r,i,d,l,s,o),d.resolve(!0)):(a(null,p,d.hiddenContainer,null,i,d,l,s,o),d.deps<=0&&d.resolve()));else if(h&&ib(p,h))a(h,p,n,r,i,d,l,s,o),ii(d,p);else if(r7(t,"onPending"),d.pendingBranch=p,512&p.shapeFlag?d.pendingId=p.component.suspenseId:d.pendingId=r9++,a(null,p,d.hiddenContainer,null,i,d,l,s,o),d.deps<=0)d.resolve();else {let{timeout:e,pendingId:t}=d;e>0?setTimeout(()=>{d.pendingId===t&&d.fallback(f);},e):0===e&&d.fallback(f);}})(e,t,n,r,i,s,o,a,c);}},hydrate:function(e,t,n,r,i,l,s,o,a){let c=t.suspense=ie(t,r,n,e.parentNode,document.createElement("div"),null,i,l,s,o,!0),u=a(e,c.pendingBranch=t.ssContent,n,c,l,s);return 0===c.deps&&c.resolve(!1,!0),u},normalize:function(e){let{shapeFlag:t,children:n}=e,r=32&t;e.ssContent=it(r?n.default:n),e.ssFallback=r?it(n.fallback):iC(io);}},e.Teleport={name:"Teleport",__isTeleport:!0,process(e,t,n,r,i,l,s,o,a,c){let{mc:u,pc:d,pbc:p,o:{insert:f,querySelector:h,createText:m,createComment:g}}=c,y=ni(t.props),{shapeFlag:b,children:_,dynamicChildren:S}=t;if(null==e){let e=t.el=m(""),c=t.anchor=m("");f(e,n,r),f(c,n,r);let d=(e,t)=>{16&b&&(i&&i.isCE&&(i.ce._teleportTarget=e),u(_,e,t,i,l,s,o,a));},p=()=>{let e=t.target=na(t.props,h),n=nd(e,t,m,f);e&&("svg"!==s&&ns(e)?s="svg":"mathml"!==s&&no(e)&&(s="mathml"),y||(d(e,n),nu(t,!1)));};y&&(d(n,c),nu(t,!0)),nl(t.props)?rV(p,l):p();}else {t.el=e.el,t.targetStart=e.targetStart;let r=t.anchor=e.anchor,u=t.target=e.target,f=t.targetAnchor=e.targetAnchor,m=ni(e.props),g=m?n:u;if("svg"===s||ns(u)?s="svg":("mathml"===s||no(u))&&(s="mathml"),S?(p(e.dynamicChildren,S,g,i,l,s,o),rW(e,t,!0)):a||d(e,t,g,m?r:f,i,l,s,o,!1),y)m?t.props&&e.props&&t.props.to!==e.props.to&&(t.props.to=e.props.to):nc(t,n,r,c,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){let e=t.target=na(t.props,h);e&&nc(t,e,null,c,0);}else m&&nc(t,u,f,c,1);nu(t,y);}},remove(e,t,n,{um:r,o:{remove:i}},l){let{shapeFlag:s,children:o,anchor:a,targetStart:c,targetAnchor:u,target:d,props:p}=e;if(d&&(i(c),i(u)),l&&i(a),16&s){let e=l||!ni(p);for(let i=0;i<o.length;i++){let l=o[i];r(l,t,n,e,!!l.dynamicChildren);}}},move:nc,hydrate:function(e,t,n,r,i,l,{o:{nextSibling:s,parentNode:o,querySelector:a,insert:c,createText:u}},d){let p=t.target=na(t.props,a);if(p){let a=ni(t.props),f=p._lpa||p.firstChild;if(16&t.shapeFlag){if(a)t.anchor=d(s(e),t,o(e),n,r,i,l),t.targetStart=f,t.targetAnchor=f&&s(f);else {t.anchor=s(e);let o=f;for(;o;){if(o&&8===o.nodeType){if("teleport start anchor"===o.data)t.targetStart=o;else if("teleport anchor"===o.data){t.targetAnchor=o,p._lpa=t.targetAnchor&&s(t.targetAnchor);break}}o=s(o);}t.targetAnchor||nd(p,t,u,c),d(f&&s(f),t,p,n,r,i,l);}}nu(t,a);}return t.anchor&&s(t.anchor)}},e.Text=is,e.TrackOpTypes={GET:"get",HAS:"has",ITERATE:"iterate"},e.Transition=i8,e.TransitionGroup=lF,e.TriggerOpTypes={SET:"set",ADD:"add",DELETE:"delete",CLEAR:"clear"},e.VueElement=lO,e.assertNumber=function(e,t){},e.callWithAsyncErrorHandling=tW,e.callWithErrorHandling=tq,e.camelize=z,e.capitalize=X,e.cloneVNode=iT,e.compatUtils=null,e.compile=aY,e.computed=iz,e.createApp=l9,e.createBlock=iy,e.createCommentVNode=function(e="",t=!1){return t?(id(),iy(io,null,e)):iC(io,null,e)},e.createElementBlock=function(e,t,n,r,i,l){return ig(ix(e,t,n,r,i,l,!0))},e.createElementVNode=ix,e.createHydrationRenderer=rB,e.createPropsRestProxy=function(e,t){let n={};for(let r in e)t.includes(r)||Object.defineProperty(n,r,{enumerable:!0,get:()=>e[r]});return n},e.createRenderer=function(e){return rU(e)},e.createSSRApp=l7,e.createSlots=function(e,t){for(let n=0;n<t.length;n++){let r=t[n];if(A(r))for(let t=0;t<r.length;t++)e[r[t].name]=r[t].fn;else r&&(e[r.name]=r.key?(...e)=>{let t=r.fn(...e);return t&&(t.key=r.key),t}:r.fn);}return e},e.createStaticVNode=function(e,t){let n=iC(ia,null,e);return n.staticCount=t,n},e.createTextVNode=iN,e.createVNode=iC,e.customRef=tL,e.defineAsyncComponent=/*! #__NO_SIDE_EFFECTS__ */function(e){let t;P(e)&&(e={loader:e});let{loader:n,loadingComponent:r,errorComponent:i,delay:l=200,hydrate:s,timeout:o,suspensible:a=!0,onError:c}=e,u=null,d=0,p=()=>(d++,u=null,f()),f=()=>{let e;return u||(e=u=n().catch(e=>{if(e=e instanceof Error?e:Error(String(e)),c)return new Promise((t,n)=>{c(e,()=>t(p()),()=>n(e),d+1);});throw e}).then(n=>e!==u&&u?u:(n&&(n.__esModule||"Module"===n[Symbol.toStringTag])&&(n=n.default),t=n,n)))};return nN({name:"AsyncComponentWrapper",__asyncLoader:f,__asyncHydrate(e,n,r){let i=s?()=>{let t=s(r,t=>(function(e,t){if(nM(e)&&"["===e.data){let n=1,r=e.nextSibling;for(;r;){if(1===r.nodeType){if(!1===t(r))break}else if(nM(r)){if("]"===r.data){if(0==--n)break}else "["===r.data&&n++;}r=r.nextSibling;}}else t(e);})(e,t));t&&(n.bum||(n.bum=[])).push(t);}:r;t?i():f().then(()=>!n.isUnmounted&&i());},get __asyncResolved(){return t},setup(){let e=iM;if(nw(e),t)return ()=>nj(t,e);let n=t=>{u=null,tK(t,e,13,!i);};if(a&&e.suspense)return f().then(t=>()=>nj(t,e)).catch(e=>(n(e),()=>i?iC(i,{error:e}):null));let s=tw(!1),c=tw(),d=tw(!!l);return l&&setTimeout(()=>{d.value=!1;},l),null!=o&&setTimeout(()=>{if(!s.value&&!c.value){let e=Error(`Async component timed out after ${o}ms.`);n(e),c.value=e;}},o),f().then(()=>{s.value=!0,e.parent&&nH(e.parent.vnode)&&e.parent.update();}).catch(e=>{n(e),c.value=e;}),()=>s.value&&t?nj(t,e):c.value&&i?iC(i,{error:c.value}):r&&!d.value?iC(r):void 0}})},e.defineComponent=nN,e.defineCustomElement=lI,e.defineEmits=function(){return null},e.defineExpose=function(e){},e.defineModel=function(){},e.defineOptions=function(e){},e.defineProps=function(){return null},e.defineSSRCustomElement=(e,t)=>/* @__PURE__ */lI(e,t,l7),e.defineSlots=function(){return null},e.devtools=void 0,e.effect=function(e,t){e.effect instanceof ek&&(e=e.effect.fn);let n=new ek(e);t&&k(n,t);try{n.run();}catch(e){throw n.stop(),e}let r=n.run.bind(n);return r.effect=n,r},e.effectScope=function(e){return new ex(e)},e.getCurrentInstance=iL,e.getCurrentScope=function(){return i},e.getCurrentWatcher=function(){return h},e.getTransitionRawChildren=nT,e.guardReactiveProps=ik,e.h=iJ,e.handleError=tK,e.hasInjectionContext=function(){return !!(iM||t5||rS)},e.hydrate=(...e)=>{l8().hydrate(...e);},e.hydrateOnIdle=(e=1e4)=>t=>{let n=nV(t,{timeout:e});return ()=>nB(n)},e.hydrateOnInteraction=(e=[])=>(t,n)=>{M(e)&&(e=[e]);let r=!1,i=e=>{r||(r=!0,l(),t(),e.target.dispatchEvent(new e.constructor(e.type,e)));},l=()=>{n(t=>{for(let n of e)t.removeEventListener(n,i);});};return n(t=>{for(let n of e)t.addEventListener(n,i,{once:!0});}),l},e.hydrateOnMediaQuery=e=>t=>{if(e){let n=matchMedia(e);if(!n.matches)return n.addEventListener("change",t,{once:!0}),()=>n.removeEventListener("change",t);t();}},e.hydrateOnVisible=e=>(t,n)=>{let r=new IntersectionObserver(e=>{for(let n of e)if(n.isIntersecting){r.disconnect(),t();break}},e);return n(e=>{if(e instanceof Element){if(function(e){let{top:t,left:n,bottom:r,right:i}=e.getBoundingClientRect(),{innerHeight:l,innerWidth:s}=window;return (t>0&&t<l||r>0&&r<l)&&(n>0&&n<s||i>0&&i<s)}(e))return t(),r.disconnect(),!1;r.observe(e);}}),()=>r.disconnect()},e.initCustomFormatter=function(){},e.initDirectivesForSSR=_,e.inject=rC,e.isMemoSame=iG,e.isProxy=tS,e.isReactive=tv,e.isReadonly=tb,e.isRef=tN,e.isRuntimeOnly=()=>!u,e.isShallow=t_,e.isVNode=iv,e.markRaw=tC,e.mergeDefaults=function(e,t){let n=ra(e);for(let e in t){if(e.startsWith("__skip"))continue;let r=n[e];r?A(r)||P(r)?r=n[e]={type:r,default:t[e]}:r.default=t[e]:null===r&&(r=n[e]={default:t[e]}),r&&t[`__skip_${e}`]&&(r.skipFactory=!0);}return n},e.mergeModels=function(e,t){return e&&t?A(e)&&A(t)?e.concat(t):k({},ra(e),ra(t)):e||t},e.mergeProps=iI,e.nextTick=t0,e.normalizeClass=eu,e.normalizeProps=function(e){if(!e)return null;let{class:t,style:n}=e;return t&&!M(t)&&(e.class=eu(t)),n&&(e.style=el(n)),e},e.normalizeStyle=el,e.onActivated=nW,e.onBeforeMount=nZ,e.onBeforeUnmount=n2,e.onBeforeUpdate=n0,e.onDeactivated=nK,e.onErrorCaptured=n5,e.onMounted=nY,e.onRenderTracked=n8,e.onRenderTriggered=n4,e.onScopeDispose=function(e,t=!1){i&&i.cleanups.push(e);},e.onServerPrefetch=n3,e.onUnmounted=n6,e.onUpdated=n1,e.onWatcherCleanup=tj,e.openBlock=id,e.popScopeId=function(){t9=null;},e.provide=rx,e.proxyRefs=tP,e.pushScopeId=function(e){t9=e;},e.queuePostFlushCb=t6,e.reactive=th,e.readonly=tg,e.ref=tw,e.registerRuntimeCompiler=iU,e.render=l5,e.renderList=function(e,t,n,r){let i;let l=n&&n[r],s=A(e);if(s||M(e)){let n=s&&tv(e),r=!1;n&&(r=!t_(e),e=eJ(e)),i=Array(e.length);for(let n=0,s=e.length;n<s;n++)i[n]=t(r?tk(e[n]):e[n],n,void 0,l&&l[n]);}else if("number"==typeof e){i=Array(e);for(let n=0;n<e;n++)i[n]=t(n+1,n,void 0,l&&l[n]);}else if($(e)){if(e[Symbol.iterator])i=Array.from(e,(e,n)=>t(e,n,void 0,l&&l[n]));else {let n=Object.keys(e);i=Array(n.length);for(let r=0,s=n.length;r<s;r++){let s=n[r];i[r]=t(e[s],s,r,l&&l[r]);}}}else i=[];return n&&(n[r]=i),i},e.renderSlot=function(e,t,n={},r,i){if(t5.ce||t5.parent&&nU(t5.parent)&&t5.parent.ce)return "default"!==t&&(n.name=t),id(),iy(il,null,[iC("slot",n,r&&r())],64);let l=e[t];l&&l._c&&(l._d=!1),id();let s=l&&function e(t){return t.some(t=>!iv(t)||!!(t.type!==io&&(t.type!==il||e(t.children))))?t:null}(l(n)),o=n.key||s&&s.key,a=iy(il,{key:(o&&!L(o)?o:`_${t}`)+(!s&&r?"_fb":"")},s||(r?r():[]),s&&1===e._?64:-2);return !i&&a.scopeId&&(a.slotScopeIds=[a.scopeId+"-s"]),l&&l._c&&(l._d=!0),a},e.resolveComponent=function(e,t){return re(n9,e,!0,t)||e},e.resolveDirective=function(e){return re("directives",e)},e.resolveDynamicComponent=function(e){return M(e)?re(n9,e,!1)||e:e||n7},e.resolveFilter=null,e.resolveTransitionHooks=nS,e.setBlockTracking=im,e.setDevtoolsHook=_,e.setTransitionHooks=nk,e.shallowReactive=tm,e.shallowReadonly=function(e){return ty(e,!0,tt,tc,tf)},e.shallowRef=tA,e.ssrContextKey=rz,e.ssrUtils=null,e.stop=function(e){e.effect.stop();},e.toDisplayString=eb,e.toHandlerKey=Q,e.toHandlers=function(e,t){let n={};for(let r in e)n[t&&/[A-Z]/.test(r)?`on:${r}`:Q(r)]=e[r];return n},e.toRaw=tx,e.toRef=function(e,t,n){return tN(e)?e:P(e)?new tD(e):$(e)&&arguments.length>1?tF(e,t,n):tw(e)},e.toRefs=function(e){let t=A(e)?Array(e.length):{};for(let n in e)t[n]=tF(e,n);return t},e.toValue=function(e){return P(e)?e():tR(e)},e.transformVNodeArgs=function(e){},e.triggerRef=function(e){e.dep&&e.dep.trigger();},e.unref=tR,e.useAttrs=function(){return ro().attrs},e.useCssModule=function(e="$style"){return y},e.useCssVars=function(e){let t=iL();if(!t)return;let n=t.ut=(n=e(t.proxy))=>{Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach(e=>lf(e,n));},r=()=>{let r=e(t.proxy);t.ce?lf(t.ce,r):function e(t,n){if(128&t.shapeFlag){let r=t.suspense;t=r.activeBranch,r.pendingBranch&&!r.isHydrating&&r.effects.push(()=>{e(r.activeBranch,n);});}for(;t.component;)t=t.component.subTree;if(1&t.shapeFlag&&t.el)lf(t.el,n);else if(t.type===il)t.children.forEach(t=>e(t,n));else if(t.type===ia){let{el:e,anchor:r}=t;for(;e&&(lf(e,n),e!==r);)e=e.nextSibling;}}(t.subTree,r),n(r);};nZ(()=>{rJ(r);}),nY(()=>{let e=new MutationObserver(r);e.observe(t.subTree.el.parentNode,{childList:!0}),n6(()=>e.disconnect());});},e.useHost=lP,e.useId=function(){let e=iL();return e?(e.appContext.config.idPrefix||"v")+"-"+e.ids[0]+e.ids[1]++:""},e.useModel=function(e,t,n=y){let r=iL(),i=z(t),l=G(t),s=rY(e,i),o=tL((s,o)=>{let a,c;let u=y;return rG(()=>{let t=e[i];Z(a,t)&&(a=t,o());}),{get:()=>(s(),n.get?n.get(a):a),set(e){let s=n.set?n.set(e):e;if(!Z(s,a)&&!(u!==y&&Z(e,u)))return;let d=r.vnode.props;d&&(t in d||i in d||l in d)&&(`onUpdate:${t}` in d||`onUpdate:${i}` in d||`onUpdate:${l}` in d)||(a=e,o()),r.emit(`update:${t}`,s),Z(e,s)&&Z(e,u)&&!Z(s,c)&&o(),u=e,c=s;}}});return o[Symbol.iterator]=()=>{let e=0;return {next:()=>e<2?{value:e++?s||y:o,done:!1}:{done:!0}}},o},e.useSSRContext=()=>{},e.useShadowRoot=function(){let e=lP();return e&&e.shadowRoot},e.useSlots=function(){return ro().slots},e.useTemplateRef=function(e){let t=iL(),n=tA(null);return t&&Object.defineProperty(t.refs===y?t.refs={}:t.refs,e,{enumerable:!0,get:()=>n.value,set:e=>n.value=e}),n},e.useTransitionState=nh,e.vModelCheckbox=lz,e.vModelDynamic={created(e,t,n){l0(e,t,n,null,"created");},mounted(e,t,n){l0(e,t,n,null,"mounted");},beforeUpdate(e,t,n,r){l0(e,t,n,r,"beforeUpdate");},updated(e,t,n,r){l0(e,t,n,r,"updated");}},e.vModelRadio=lG,e.vModelSelect=lX,e.vModelText=lK,e.vShow={beforeMount(e,{value:t},{transition:n}){e[lc]="none"===e.style.display?"":e.style.display,n&&t?n.beforeEnter(e):ld(e,t);},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e);},updated(e,{value:t,oldValue:n},{transition:r}){!t!=!n&&(r?t?(r.beforeEnter(e),ld(e,!0),r.enter(e)):r.leave(e,()=>{ld(e,!1);}):ld(e,t));},beforeUnmount(e,{value:t}){ld(e,t);}},e.version=iX,e.warn=_,e.watch=function(e,t,n){return rX(e,t,n)},e.watchEffect=function(e,t){return rX(e,null,t)},e.watchPostEffect=rJ,e.watchSyncEffect=rG,e.withAsyncContext=function(e){let t=iL(),n=e();return iD(),D(n)&&(n=n.catch(e=>{throw i$(t),e})),[n,()=>i$(t)]},e.withCtx=ne,e.withDefaults=function(e,t){return null},e.withDirectives=function(e,t){if(null===t5)return e;let n=iW(t5),r=e.dirs||(e.dirs=[]);for(let e=0;e<t.length;e++){let[i,l,s,o=y]=t[e];i&&(P(i)&&(i={mounted:i,updated:i}),i.deep&&tH(l),r.push({dir:i,instance:n,value:l,oldValue:void 0,arg:s,modifiers:o}));}return e},e.withKeys=(e,t)=>{let n=e._withKeys||(e._withKeys={}),r=t.join(".");return n[r]||(n[r]=n=>{if(!("key"in n))return;let r=G(n.key);if(t.some(e=>e===r||l6[e]===r))return e(n)})},e.withMemo=function(e,t,n,r){let i=n[r];if(i&&iG(i,e))return i;let l=t();return l.memo=e.slice(),l.cacheIndex=r,n[r]=l},e.withModifiers=(e,t)=>{let n=e._withMods||(e._withMods={}),r=t.join(".");return n[r]||(n[r]=(n,...r)=>{for(let e=0;e<t.length;e++){let r=l2[t[e]];if(r&&r(n,t))return}return e(n,...r)})},e.withScopeId=e=>ne,e}({});

  /*!
    * vue-router v4.4.5
    * (c) 2024 Eduardo San Martin Morote
    * @license MIT
    */
  window.VueRouter=function(e,t){const n="undefined"!=typeof document;function r(e){return "object"==typeof e||"displayName"in e||"props"in e||"__vccOpts"in e}function o(e){return e.__esModule||"Module"===e[Symbol.toStringTag]||e.default&&r(e.default)}const c=Object.assign;function a(e,t){const n={};for(const r in t){const o=t[r];n[r]=i(o)?o.map(e):e(o);}return n}const s=()=>{},i=Array.isArray,l=/#/g,u=/&/g,f=/\//g,p=/=/g,h=/\?/g,d=/\+/g,m=/%5B/g,g=/%5D/g,v=/%5E/g,y=/%60/g,b=/%7B/g,w=/%7C/g,E=/%7D/g,R=/%20/g;function k(e){return encodeURI(""+e).replace(w,"|").replace(m,"[").replace(g,"]")}function O(e){return k(e).replace(d,"%2B").replace(R,"+").replace(l,"%23").replace(u,"%26").replace(y,"`").replace(b,"{").replace(E,"}").replace(v,"^")}function j(e){return null==e?"":function(e){return k(e).replace(l,"%23").replace(h,"%3F")}(e).replace(f,"%2F")}function P(e){try{return decodeURIComponent(""+e)}catch(e){}return ""+e}const C=/\/$/,x=e=>e.replace(C,"");function $(e,t,n="/"){let r,o={},c="",a="";const s=t.indexOf("#");let i=t.indexOf("?");return s<i&&s>=0&&(i=-1),i>-1&&(r=t.slice(0,i),c=t.slice(i+1,s>-1?s:t.length),o=e(c)),s>-1&&(r=r||t.slice(0,s),a=t.slice(s,t.length)),r=function(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/"),o=r[r.length-1];".."!==o&&"."!==o||r.push("");let c,a,s=n.length-1;for(c=0;c<r.length;c++)if(a=r[c],"."!==a){if(".."!==a)break;s>1&&s--;}return n.slice(0,s).join("/")+"/"+r.slice(c).join("/")}(null!=r?r:t,n),{fullPath:r+(c&&"?")+c+a,path:r,query:o,hash:P(a)}}function S(e,t){return t&&e.toLowerCase().startsWith(t.toLowerCase())?e.slice(t.length)||"/":e}function A(e,t){return (e.aliasOf||e)===(t.aliasOf||t)}function L(e,t){if(Object.keys(e).length!==Object.keys(t).length)return !1;for(const n in e)if(!M(e[n],t[n]))return !1;return !0}function M(e,t){return i(e)?q(e,t):i(t)?q(t,e):e===t}function q(e,t){return i(t)?e.length===t.length&&e.every(((e,n)=>e===t[n])):1===e.length&&e[0]===t}const B={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};var T,G;!function(e){e.pop="pop",e.push="push";}(T||(T={})),function(e){e.back="back",e.forward="forward",e.unknown="";}(G||(G={}));function _(e){if(!e)if(n){const t=document.querySelector("base");e=(e=t&&t.getAttribute("href")||"/").replace(/^\w+:\/\/[^\/]+/,"");}else e="/";return "/"!==e[0]&&"#"!==e[0]&&(e="/"+e),x(e)}const F=/^[^#]+#/;function I(e,t){return e.replace(F,"#")+t}const W=()=>({left:window.scrollX,top:window.scrollY});function D(e){let t;if("el"in e){const n=e.el,r="string"==typeof n&&n.startsWith("#"),o="string"==typeof n?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!o)return;t=function(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return {behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}(o,e);}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(null!=t.left?t.left:window.scrollX,null!=t.top?t.top:window.scrollY);}function K(e,t){return (history.state?history.state.position-t:-1)+e}const U=new Map;let V=()=>location.protocol+"//"+location.host;function H(e,t){const{pathname:n,search:r,hash:o}=t,c=e.indexOf("#");if(c>-1){let t=o.includes(e.slice(c))?e.slice(c).length:1,n=o.slice(t);return "/"!==n[0]&&(n="/"+n),S(n,"")}return S(n,e)+r+o}function N(e,t,n,r=!1,o=!1){return {back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:o?W():null}}function z(e){const t=function(e){const{history:t,location:n}=window,r={value:H(e,n)},o={value:t.state};function a(r,c,a){const s=e.indexOf("#"),i=s>-1?(n.host&&document.querySelector("base")?e:e.slice(s))+r:V()+e+r;try{t[a?"replaceState":"pushState"](c,"",i),o.value=c;}catch(e){console.error(e),n[a?"replace":"assign"](i);}}return o.value||a(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0),{location:r,state:o,push:function(e,n){const s=c({},o.value,t.state,{forward:e,scroll:W()});a(s.current,s,!0),a(e,c({},N(r.value,e,null),{position:s.position+1},n),!1),r.value=e;},replace:function(e,n){a(e,c({},t.state,N(o.value.back,e,o.value.forward,!0),n,{position:o.value.position}),!0),r.value=e;}}}(e=_(e)),n=function(e,t,n,r){let o=[],a=[],s=null;const i=({state:c})=>{const a=H(e,location),i=n.value,l=t.value;let u=0;if(c){if(n.value=a,t.value=c,s&&s===i)return void(s=null);u=l?c.position-l.position:0;}else r(a);o.forEach((e=>{e(n.value,i,{delta:u,type:T.pop,direction:u?u>0?G.forward:G.back:G.unknown});}));};function l(){const{history:e}=window;e.state&&e.replaceState(c({},e.state,{scroll:W()}),"");}return window.addEventListener("popstate",i),window.addEventListener("beforeunload",l,{passive:!0}),{pauseListeners:function(){s=n.value;},listen:function(e){o.push(e);const t=()=>{const t=o.indexOf(e);t>-1&&o.splice(t,1);};return a.push(t),t},destroy:function(){for(const e of a)e();a=[],window.removeEventListener("popstate",i),window.removeEventListener("beforeunload",l);}}}(e,t.state,t.location,t.replace);const r=c({location:"",base:e,go:function(e,t=!0){t||n.pauseListeners(),history.go(e);},createHref:I.bind(null,e)},t,n);return Object.defineProperty(r,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(r,"state",{enumerable:!0,get:()=>t.state.value}),r}function Q(e){return "string"==typeof e||"symbol"==typeof e}const X=Symbol("");var Y;function Z(e,t){return c(new Error,{type:e,[X]:!0},t)}function J(e,t){return e instanceof Error&&X in e&&(null==t||!!(e.type&t))}e.NavigationFailureType=void 0,(Y=e.NavigationFailureType||(e.NavigationFailureType={}))[Y.aborted=4]="aborted",Y[Y.cancelled=8]="cancelled",Y[Y.duplicated=16]="duplicated";const ee="[^/]+?",te={sensitive:!1,strict:!1,start:!0,end:!0},ne=/[.+*?^${}()[\]/\\]/g;function re(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++;}return e.length<t.length?1===e.length&&80===e[0]?-1:1:e.length>t.length?1===t.length&&80===t[0]?1:-1:0}function oe(e,t){let n=0;const r=e.score,o=t.score;for(;n<r.length&&n<o.length;){const e=re(r[n],o[n]);if(e)return e;n++;}if(1===Math.abs(o.length-r.length)){if(ce(r))return 1;if(ce(o))return -1}return o.length-r.length}function ce(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const ae={type:0,value:""},se=/[a-zA-Z0-9_]/;function ie(e,t,n){const r=function(e,t){const n=c({},te,t),r=[];let o=n.start?"^":"";const a=[];for(const t of e){const e=t.length?[]:[90];n.strict&&!t.length&&(o+="/");for(let r=0;r<t.length;r++){const c=t[r];let s=40+(n.sensitive?.25:0);if(0===c.type)r||(o+="/"),o+=c.value.replace(ne,"\\$&"),s+=40;else if(1===c.type){const{value:e,repeatable:n,optional:i,regexp:l}=c;a.push({name:e,repeatable:n,optional:i});const u=l||ee;if(u!==ee){s+=10;try{new RegExp(`(${u})`);}catch(t){throw new Error(`Invalid custom RegExp for param "${e}" (${u}): `+t.message)}}let f=n?`((?:${u})(?:/(?:${u}))*)`:`(${u})`;r||(f=i&&t.length<2?`(?:/${f})`:"/"+f),i&&(f+="?"),o+=f,s+=20,i&&(s+=-8),n&&(s+=-20),".*"===u&&(s+=-50);}e.push(s);}r.push(e);}if(n.strict&&n.end){const e=r.length-1;r[e][r[e].length-1]+=.7000000000000001;}n.strict||(o+="/?"),n.end?o+="$":n.strict&&(o+="(?:/|$)");const s=new RegExp(o,n.sensitive?"":"i");return {re:s,score:r,keys:a,parse:function(e){const t=e.match(s),n={};if(!t)return null;for(let e=1;e<t.length;e++){const r=t[e]||"",o=a[e-1];n[o.name]=r&&o.repeatable?r.split("/"):r;}return n},stringify:function(t){let n="",r=!1;for(const o of e){r&&n.endsWith("/")||(n+="/"),r=!1;for(const e of o)if(0===e.type)n+=e.value;else if(1===e.type){const{value:c,repeatable:a,optional:s}=e,l=c in t?t[c]:"";if(i(l)&&!a)throw new Error(`Provided param "${c}" is an array but it is not repeatable (* or + modifiers)`);const u=i(l)?l.join("/"):l;if(!u){if(!s)throw new Error(`Missing required param "${c}"`);o.length<2&&(n.endsWith("/")?n=n.slice(0,-1):r=!0);}n+=u;}}return n||"/"}}}(function(e){if(!e)return [[]];if("/"===e)return [[ae]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(e){throw new Error(`ERR (${n})/"${l}": ${e}`)}let n=0,r=n;const o=[];let c;function a(){c&&o.push(c),c=[];}let s,i=0,l="",u="";function f(){l&&(0===n?c.push({type:0,value:l}):1===n||2===n||3===n?(c.length>1&&("*"===s||"+"===s)&&t(`A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`),c.push({type:1,value:l,regexp:u,repeatable:"*"===s||"+"===s,optional:"*"===s||"?"===s})):t("Invalid state to consume buffer"),l="");}function p(){l+=s;}for(;i<e.length;)if(s=e[i++],"\\"!==s||2===n)switch(n){case 0:"/"===s?(l&&f(),a()):":"===s?(f(),n=1):p();break;case 4:p(),n=r;break;case 1:"("===s?n=2:se.test(s)?p():(f(),n=0,"*"!==s&&"?"!==s&&"+"!==s&&i--);break;case 2:")"===s?"\\"==u[u.length-1]?u=u.slice(0,-1)+s:n=3:u+=s;break;case 3:f(),n=0,"*"!==s&&"?"!==s&&"+"!==s&&i--,u="";break;default:t("Unknown state");}else r=n,n=4;return 2===n&&t(`Unfinished custom RegExp for param "${l}"`),f(),a(),o}(e.path),n),o=c(r,{record:e,parent:t,children:[],alias:[]});return t&&!o.record.aliasOf==!t.record.aliasOf&&t.children.push(o),o}function le(e,t){const n=[],r=new Map;function o(e,n,r){const l=!r,u=fe(e);u.aliasOf=r&&r.record;const f=me(t,e),p=[u];if("alias"in e){const t="string"==typeof e.alias?[e.alias]:e.alias;for(const e of t)p.push(fe(c({},u,{components:r?r.record.components:u.components,path:e,aliasOf:r?r.record:u})));}let h,d;for(const t of p){const{path:c}=t;if(n&&"/"!==c[0]){const e=n.record.path;t.path=n.record.path+(c&&("/"===e[e.length-1]?"":"/")+c);}if(h=ie(t,n,f),r?r.alias.push(h):(d=d||h,d!==h&&d.alias.push(h),l&&e.name&&!he(h)&&a(e.name)),ge(h)&&i(h),u.children){const e=u.children;for(let t=0;t<e.length;t++)o(e[t],h,r&&r.children[t]);}r=r||h;}return d?()=>{a(d);}:s}function a(e){if(Q(e)){const t=r.get(e);t&&(r.delete(e),n.splice(n.indexOf(t),1),t.children.forEach(a),t.alias.forEach(a));}else {const t=n.indexOf(e);t>-1&&(n.splice(t,1),e.record.name&&r.delete(e.record.name),e.children.forEach(a),e.alias.forEach(a));}}function i(e){const t=function(e,t){let n=0,r=t.length;for(;n!==r;){const o=n+r>>1;oe(e,t[o])<0?r=o:n=o+1;}const o=function(e){let t=e;for(;t=t.parent;)if(ge(t)&&0===oe(e,t))return t;return}(e);o&&(r=t.lastIndexOf(o,r-1));return r}(e,n);n.splice(t,0,e),e.record.name&&!he(e)&&r.set(e.record.name,e);}return t=me({strict:!1,end:!0,sensitive:!1},t),e.forEach((e=>o(e))),{addRoute:o,resolve:function(e,t){let o,a,s,i={};if("name"in e&&e.name){if(o=r.get(e.name),!o)throw Z(1,{location:e});s=o.record.name,i=c(ue(t.params,o.keys.filter((e=>!e.optional)).concat(o.parent?o.parent.keys.filter((e=>e.optional)):[]).map((e=>e.name))),e.params&&ue(e.params,o.keys.map((e=>e.name)))),a=o.stringify(i);}else if(null!=e.path)a=e.path,o=n.find((e=>e.re.test(a))),o&&(i=o.parse(a),s=o.record.name);else {if(o=t.name?r.get(t.name):n.find((e=>e.re.test(t.path))),!o)throw Z(1,{location:e,currentLocation:t});s=o.record.name,i=c({},t.params,e.params),a=o.stringify(i);}const l=[];let u=o;for(;u;)l.unshift(u.record),u=u.parent;return {name:s,path:a,params:i,matched:l,meta:de(l)}},removeRoute:a,clearRoutes:function(){n.length=0,r.clear();},getRoutes:function(){return n},getRecordMatcher:function(e){return r.get(e)}}}function ue(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function fe(e){const t={path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:e.aliasOf,beforeEnter:e.beforeEnter,props:pe(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}};return Object.defineProperty(t,"mods",{value:{}}),t}function pe(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]="object"==typeof n?n[r]:n;return t}function he(e){for(;e;){if(e.record.aliasOf)return !0;e=e.parent;}return !1}function de(e){return e.reduce(((e,t)=>c(e,t.meta)),{})}function me(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}function ge({record:e}){return !!(e.name||e.components&&Object.keys(e.components).length||e.redirect)}function ve(e){const t={};if(""===e||"?"===e)return t;const n=("?"===e[0]?e.slice(1):e).split("&");for(let e=0;e<n.length;++e){const r=n[e].replace(d," "),o=r.indexOf("="),c=P(o<0?r:r.slice(0,o)),a=o<0?null:P(r.slice(o+1));if(c in t){let e=t[c];i(e)||(e=t[c]=[e]),e.push(a);}else t[c]=a;}return t}function ye(e){let t="";for(let n in e){const r=e[n];if(n=O(n).replace(p,"%3D"),null==r){void 0!==r&&(t+=(t.length?"&":"")+n);continue}(i(r)?r.map((e=>e&&O(e))):[r&&O(r)]).forEach((e=>{void 0!==e&&(t+=(t.length?"&":"")+n,null!=e&&(t+="="+e));}));}return t}function be(e){const t={};for(const n in e){const r=e[n];void 0!==r&&(t[n]=i(r)?r.map((e=>null==e?null:""+e)):null==r?r:""+r);}return t}const we=Symbol(""),Ee=Symbol(""),Re=Symbol(""),ke=Symbol(""),Oe=Symbol("");function je(){let e=[];return {add:function(t){return e.push(t),()=>{const n=e.indexOf(t);n>-1&&e.splice(n,1);}},list:()=>e.slice(),reset:function(){e=[];}}}function Pe(e,n,r){const o=()=>{e[n].delete(r);};t.onUnmounted(o),t.onDeactivated(o),t.onActivated((()=>{e[n].add(r);})),e[n].add(r);}function Ce(e,t,n,r,o,c=(e=>e())){const a=r&&(r.enterCallbacks[o]=r.enterCallbacks[o]||[]);return ()=>new Promise(((s,i)=>{const l=e=>{var c;!1===e?i(Z(4,{from:n,to:t})):e instanceof Error?i(e):"string"==typeof(c=e)||c&&"object"==typeof c?i(Z(2,{from:t,to:e})):(a&&r.enterCallbacks[o]===a&&"function"==typeof e&&a.push(e),s());},u=c((()=>e.call(r&&r.instances[o],t,n,l)));let f=Promise.resolve(u);e.length<3&&(f=f.then(l)),f.catch((e=>i(e)));}))}function xe(e,t,n,c,a=(e=>e())){const s=[];for(const i of e)for(const e in i.components){let l=i.components[e];if("beforeRouteEnter"===t||i.instances[e])if(r(l)){const r=(l.__vccOpts||l)[t];r&&s.push(Ce(r,n,c,i,e,a));}else {let r=l();s.push((()=>r.then((r=>{if(!r)throw new Error(`Couldn't resolve component "${e}" at "${i.path}"`);const s=o(r)?r.default:r;i.mods[e]=r,i.components[e]=s;const l=(s.__vccOpts||s)[t];return l&&Ce(l,n,c,i,e,a)()}))));}}return s}function $e(e){const n=t.inject(Re),r=t.inject(ke),o=t.computed((()=>{const r=t.unref(e.to);return n.resolve(r)})),c=t.computed((()=>{const{matched:e}=o.value,{length:t}=e,n=e[t-1],c=r.matched;if(!n||!c.length)return -1;const a=c.findIndex(A.bind(null,n));if(a>-1)return a;const s=Ae(e[t-2]);return t>1&&Ae(n)===s&&c[c.length-1].path!==s?c.findIndex(A.bind(null,e[t-2])):a})),a=t.computed((()=>c.value>-1&&function(e,t){for(const n in t){const r=t[n],o=e[n];if("string"==typeof r){if(r!==o)return !1}else if(!i(o)||o.length!==r.length||r.some(((e,t)=>e!==o[t])))return !1}return !0}(r.params,o.value.params))),l=t.computed((()=>c.value>-1&&c.value===r.matched.length-1&&L(r.params,o.value.params)));return {route:o,href:t.computed((()=>o.value.href)),isActive:a,isExactActive:l,navigate:function(r={}){return function(e){if(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)return;if(e.defaultPrevented)return;if(void 0!==e.button&&0!==e.button)return;if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}e.preventDefault&&e.preventDefault();return !0}(r)?n[t.unref(e.replace)?"replace":"push"](t.unref(e.to)).catch(s):Promise.resolve()}}}const Se=t.defineComponent({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:$e,setup(e,{slots:n}){const r=t.reactive($e(e)),{options:o}=t.inject(Re),c=t.computed((()=>({[Le(e.activeClass,o.linkActiveClass,"router-link-active")]:r.isActive,[Le(e.exactActiveClass,o.linkExactActiveClass,"router-link-exact-active")]:r.isExactActive})));return ()=>{const o=n.default&&n.default(r);return e.custom?o:t.h("a",{"aria-current":r.isExactActive?e.ariaCurrentValue:null,href:r.href,onClick:r.navigate,class:c.value},o)}}});function Ae(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const Le=(e,t,n)=>null!=e?e:null!=t?t:n;function Me(e,t){if(!e)return null;const n=e(t);return 1===n.length?n[0]:n}const qe=t.defineComponent({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:n,slots:r}){const o=t.inject(Oe),a=t.computed((()=>e.route||o.value)),s=t.inject(Ee,0),i=t.computed((()=>{let e=t.unref(s);const{matched:n}=a.value;let r;for(;(r=n[e])&&!r.components;)e++;return e})),l=t.computed((()=>a.value.matched[i.value]));t.provide(Ee,t.computed((()=>i.value+1))),t.provide(we,l),t.provide(Oe,a);const u=t.ref();return t.watch((()=>[u.value,l.value,e.name]),(([e,t,n],[r,o,c])=>{t&&(t.instances[n]=e,o&&o!==t&&e&&e===r&&(t.leaveGuards.size||(t.leaveGuards=o.leaveGuards),t.updateGuards.size||(t.updateGuards=o.updateGuards))),!e||!t||o&&A(t,o)&&r||(t.enterCallbacks[n]||[]).forEach((t=>t(e)));}),{flush:"post"}),()=>{const o=a.value,s=e.name,i=l.value,f=i&&i.components[s];if(!f)return Me(r.default,{Component:f,route:o});const p=i.props[s],h=p?!0===p?o.params:"function"==typeof p?p(o):p:null,d=t.h(f,c({},h,n,{onVnodeUnmounted:e=>{e.component.isUnmounted&&(i.instances[s]=null);},ref:u}));return Me(r.default,{Component:d,route:o})||d}}});return e.RouterLink=Se,e.RouterView=qe,e.START_LOCATION=B,e.createMemoryHistory=function(e=""){let t=[],n=[""],r=0;function o(e){r++,r!==n.length&&n.splice(r),n.push(e);}const c={location:"",state:{},base:e=_(e),createHref:I.bind(null,e),replace(e){n.splice(r--,1),o(e);},push(e,t){o(e);},listen:e=>(t.push(e),()=>{const n=t.indexOf(e);n>-1&&t.splice(n,1);}),destroy(){t=[],n=[""],r=0;},go(e,o=!0){const c=this.location,a=e<0?G.back:G.forward;r=Math.max(0,Math.min(r+e,n.length-1)),o&&function(e,n,{direction:r,delta:o}){const c={direction:r,delta:o,type:T.pop};for(const r of t)r(e,n,c);}(this.location,c,{direction:a,delta:e});}};return Object.defineProperty(c,"location",{enumerable:!0,get:()=>n[r]}),c},e.createRouter=function(e){const r=le(e.routes,e),o=e.parseQuery||ve,l=e.stringifyQuery||ye,u=e.history,f=je(),p=je(),h=je(),d=t.shallowRef(B);let m=B;n&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const g=a.bind(null,(e=>""+e)),y=a.bind(null,j),w=a.bind(null,P);function R(e,t){if(t=c({},t||d.value),"string"==typeof e){const n=$(o,e,t.path),a=r.resolve({path:n.path},t),s=u.createHref(n.fullPath);return c(n,a,{params:w(a.params),hash:P(n.hash),redirectedFrom:void 0,href:s})}let n;if(null!=e.path)n=c({},e,{path:$(o,e.path,t.path).path});else {const r=c({},e.params);for(const e in r)null==r[e]&&delete r[e];n=c({},e,{params:y(r)}),t.params=y(t.params);}const a=r.resolve(n,t),s=e.hash||"";a.params=g(w(a.params));const i=function(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}(l,c({},e,{hash:(f=s,k(f).replace(b,"{").replace(E,"}").replace(v,"^")),path:a.path}));var f;const p=u.createHref(i);return c({fullPath:i,hash:s,query:l===ye?be(e.query):e.query||{}},a,{redirectedFrom:void 0,href:p})}function O(e){return "string"==typeof e?$(o,e,d.value.path):c({},e)}function C(e,t){if(m!==e)return Z(8,{from:t,to:e})}function x(e){return M(e)}function S(e){const t=e.matched[e.matched.length-1];if(t&&t.redirect){const{redirect:n}=t;let r="function"==typeof n?n(e):n;return "string"==typeof r&&(r=r.includes("?")||r.includes("#")?r=O(r):{path:r},r.params={}),c({query:e.query,hash:e.hash,params:null!=r.path?{}:e.params},r)}}function M(e,t){const n=m=R(e),r=d.value,o=e.state,a=e.force,s=!0===e.replace,i=S(n);if(i)return M(c(O(i),{state:"object"==typeof i?c({},o,i.state):o,force:a,replace:s}),t||n);const u=n;let f;return u.redirectedFrom=t,!a&&function(e,t,n){const r=t.matched.length-1,o=n.matched.length-1;return r>-1&&r===o&&A(t.matched[r],n.matched[o])&&L(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}(l,r,n)&&(f=Z(16,{to:u,from:r}),te(r,r,!0,!1)),(f?Promise.resolve(f):_(u,r)).catch((e=>J(e)?J(e,2)?e:ee(e):Y(e,u,r))).then((e=>{if(e){if(J(e,2))return M(c({replace:s},O(e.to),{state:"object"==typeof e.to?c({},o,e.to.state):o,force:a}),t||u)}else e=I(u,r,!0,s,o);return F(u,r,e),e}))}function q(e,t){const n=C(e,t);return n?Promise.reject(n):Promise.resolve()}function G(e){const t=oe.values().next().value;return t&&"function"==typeof t.runWithContext?t.runWithContext(e):e()}function _(e,t){let n;const[r,o,c]=function(e,t){const n=[],r=[],o=[],c=Math.max(t.matched.length,e.matched.length);for(let a=0;a<c;a++){const c=t.matched[a];c&&(e.matched.find((e=>A(e,c)))?r.push(c):n.push(c));const s=e.matched[a];s&&(t.matched.find((e=>A(e,s)))||o.push(s));}return [n,r,o]}(e,t);n=xe(r.reverse(),"beforeRouteLeave",e,t);for(const o of r)o.leaveGuards.forEach((r=>{n.push(Ce(r,e,t));}));const a=q.bind(null,e,t);return n.push(a),ae(n).then((()=>{n=[];for(const r of f.list())n.push(Ce(r,e,t));return n.push(a),ae(n)})).then((()=>{n=xe(o,"beforeRouteUpdate",e,t);for(const r of o)r.updateGuards.forEach((r=>{n.push(Ce(r,e,t));}));return n.push(a),ae(n)})).then((()=>{n=[];for(const r of c)if(r.beforeEnter)if(i(r.beforeEnter))for(const o of r.beforeEnter)n.push(Ce(o,e,t));else n.push(Ce(r.beforeEnter,e,t));return n.push(a),ae(n)})).then((()=>(e.matched.forEach((e=>e.enterCallbacks={})),n=xe(c,"beforeRouteEnter",e,t,G),n.push(a),ae(n)))).then((()=>{n=[];for(const r of p.list())n.push(Ce(r,e,t));return n.push(a),ae(n)})).catch((e=>J(e,8)?e:Promise.reject(e)))}function F(e,t,n){h.list().forEach((r=>G((()=>r(e,t,n)))));}function I(e,t,r,o,a){const s=C(e,t);if(s)return s;const i=t===B,l=n?history.state:{};r&&(o||i?u.replace(e.fullPath,c({scroll:i&&l&&l.scroll},a)):u.push(e.fullPath,a)),d.value=e,te(e,t,r,i),ee();}let V;function H(){V||(V=u.listen(((e,t,r)=>{if(!ce.listening)return;const o=R(e),a=S(o);if(a)return void M(c(a,{replace:!0}),o).catch(s);m=o;const i=d.value;var l,f;n&&(l=K(i.fullPath,r.delta),f=W(),U.set(l,f)),_(o,i).catch((e=>J(e,12)?e:J(e,2)?(M(e.to,o).then((e=>{J(e,20)&&!r.delta&&r.type===T.pop&&u.go(-1,!1);})).catch(s),Promise.reject()):(r.delta&&u.go(-r.delta,!1),Y(e,o,i)))).then((e=>{(e=e||I(o,i,!1))&&(r.delta&&!J(e,8)?u.go(-r.delta,!1):r.type===T.pop&&J(e,20)&&u.go(-1,!1)),F(o,i,e);})).catch(s);})));}let N,z=je(),X=je();function Y(e,t,n){ee(e);const r=X.list();return r.length?r.forEach((r=>r(e,t,n))):console.error(e),Promise.reject(e)}function ee(e){return N||(N=!e,H(),z.list().forEach((([t,n])=>e?n(e):t())),z.reset()),e}function te(r,o,c,a){const{scrollBehavior:s}=e;if(!n||!s)return Promise.resolve();const i=!c&&function(e){const t=U.get(e);return U.delete(e),t}(K(r.fullPath,0))||(a||!c)&&history.state&&history.state.scroll||null;return t.nextTick().then((()=>s(r,o,i))).then((e=>e&&D(e))).catch((e=>Y(e,r,o)))}const ne=e=>u.go(e);let re;const oe=new Set,ce={currentRoute:d,listening:!0,addRoute:function(e,t){let n,o;return Q(e)?(n=r.getRecordMatcher(e),o=t):o=e,r.addRoute(o,n)},removeRoute:function(e){const t=r.getRecordMatcher(e);t&&r.removeRoute(t);},clearRoutes:r.clearRoutes,hasRoute:function(e){return !!r.getRecordMatcher(e)},getRoutes:function(){return r.getRoutes().map((e=>e.record))},resolve:R,options:e,push:x,replace:function(e){return x(c(O(e),{replace:!0}))},go:ne,back:()=>ne(-1),forward:()=>ne(1),beforeEach:f.add,beforeResolve:p.add,afterEach:h.add,onError:X.add,isReady:function(){return N&&d.value!==B?Promise.resolve():new Promise(((e,t)=>{z.add([e,t]);}))},install(e){e.component("RouterLink",Se),e.component("RouterView",qe),e.config.globalProperties.$router=this,Object.defineProperty(e.config.globalProperties,"$route",{enumerable:!0,get:()=>t.unref(d)}),n&&!re&&d.value===B&&(re=!0,x(u.location).catch((e=>{})));const r={};for(const e in B)Object.defineProperty(r,e,{get:()=>d.value[e],enumerable:!0});e.provide(Re,this),e.provide(ke,t.shallowReactive(r)),e.provide(Oe,d);const o=e.unmount;oe.add(e),e.unmount=function(){oe.delete(e),oe.size<1&&(m=B,V&&V(),V=null,d.value=B,re=!1,N=!1),o();};}};function ae(e){return e.reduce(((e,t)=>e.then((()=>G(t)))),Promise.resolve())}return ce},e.createRouterMatcher=le,e.createWebHashHistory=function(e){return (e=location.host?e||location.pathname+location.search:"").includes("#")||(e+="#"),z(e)},e.createWebHistory=z,e.isNavigationFailure=J,e.loadRouteLocation=function(e){return e.matched.every((e=>e.redirect))?Promise.reject(new Error("Cannot load a route that redirects.")):Promise.all(e.matched.map((e=>e.components&&Promise.all(Object.keys(e.components).reduce(((t,n)=>{const r=e.components[n];return "function"!=typeof r||"displayName"in r||t.push(r().then((t=>{if(!t)return Promise.reject(new Error(`Couldn't resolve component "${n}" at "${e.path}". Ensure you passed a function that returns a promise.`));const r=o(t)?t.default:t;e.mods[n]=t,e.components[n]=r;}))),t}),[]))))).then((()=>e))},e.matchedRouteKey=we,e.onBeforeRouteLeave=function(e){const n=t.inject(we,{}).value;n&&Pe(n,"leaveGuards",e);},e.onBeforeRouteUpdate=function(e){const n=t.inject(we,{}).value;n&&Pe(n,"updateGuards",e);},e.parseQuery=ve,e.routeLocationKey=ke,e.routerKey=Re,e.routerViewLocationKey=Oe,e.stringifyQuery=ye,e.useLink=$e,e.useRoute=function(e){return t.inject(ke)},e.useRouter=function(){return t.inject(Re)},e.viewDepthKey=Ee,e}({},Vue);

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

                      $routeUrl(url) {
                          return App.route(url);
                      },

                      $baseUrl(url) {
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

  on$1(document.documentElement, 'keyup', function (e) {

      if (!['Esc', 'Escape'].includes(e.key)) {
          return;
      }

      let elements = document.querySelectorAll('kiss-dropdown[open="true"]');

      for (let i = 0; i < elements.length; i++) {
          elements[i].close();
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

  function setHighestZindex(element, max = 19998) {

      let highestZindex = parseInt(getComputedStyle(element).zIndex) || 0,
          offsetParent = element.offsetParent || document.body,
          zIndex;

      Array.from(offsetParent.children).forEach((node) => {
          zIndex = parseInt(getComputedStyle(node).zIndex) || 0;

          if (max > 0 && zIndex > max) {
              return;
          }

          if (zIndex > highestZindex) highestZindex = zIndex;
      });

      if (max > 0 && highestZindex >= max) {
          highestZindex = max;
      }

      element.style.zIndex = highestZindex + 1;
  }


  var utils$1 = {
      debounce,
      isInViewport,
      isElementOnTop,
      setHighestZindex,
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

          if (this.getAttribute('open') === 'true') {
              this.show();
          }
      }

      show() {

          setHighestZindex(this);
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

          if (this.getAttribute('open') === 'true') {
              setHighestZindex(this);
          }
      }

      show() {
          setHighestZindex(this);
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

      static get observedAttributes() {
          return ['open'];
      }

      attributeChangedCallback(name, oldValue, newValue) {

          if (name == 'open') {
              if (newValue === 'true') {
                  setHighestZindex(this);
              } else {
                  this.style.zIndex = '';
              }
          }
      }

      connectedCallback() {

          on$1(this, 'click', e => {

              if (e.target.matches('[kiss-popout-close]') || e.target.closest('[kiss-popout-close]')) {
                  return this.close();
              }

              if (this.getAttribute('modal') !== 'true') {
                  this.close();
              }
          });

          if (this.getAttribute('open') === 'true') {
              setHighestZindex(this);
          }
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

          setTimeout(() => {

              const focusElement = this.querySelector('[autofocus]') || this.querySelector('a[href]:not([target="_blank"]),button:not([disabled])');

              if (focusElement) {
                  focusElement.focus();
              }

          }, 100);

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

  class Toast {
      constructor() {
          this.container = null;
      }

      getContainer() {

          let container = document.querySelector('.kiss-toast-container');

          if (!container) {
              container = document.createElement('div');
              container.classList.add('kiss-toast-container');
              document.body.appendChild(container);
          }

          return container;
      }

      show(message, options = {}) {

          const {
              type = 'info',
              timeout = 2500,
              info = '',
          } = options;

          const container = this.getContainer();
          const toast = document.createElement('div');
          const contentDiv = document.createElement('div');
          const messageElement = document.createElement('div');

          toast.classList.add('kiss-toast');
          toast.setAttribute('type', type);

          contentDiv.classList.add('kiss-toast-content');

          messageElement.classList.add('kiss-toast-message');
          messageElement.textContent = message;
          contentDiv.appendChild(messageElement);

          if (info) {
              const infoElement = document.createElement('div');
              infoElement.classList.add('kiss-toast-info');
              infoElement.textContent = info;
              contentDiv.appendChild(infoElement);
          }

          const release = () => {
              toast.removeAttribute('show');
              setTimeout(() => {
                  container.removeChild(toast);
              }, 300);
          };

          toast.appendChild(contentDiv);
          container.insertBefore(toast, container.firstChild);

          // Trigger reflow to enable transition
          toast.offsetHeight;
          toast.setAttribute('show', 'true');

          toast.addEventListener('click', () => release());

          if (timeout) {
              const startReleaseTimer = () => {
                  toast.rtidle = setTimeout(() => {
                      release();
                  }, timeout);
              };

              startReleaseTimer();
              toast.addEventListener('mouseenter', () => clearTimeout(toast.rtidle));
              toast.addEventListener('mouseleave', () => startReleaseTimer());
          }
      }
  }

  Toast.notify = function (message, options = {}) {
      new Toast().show(message, options);
  };

  window.KissToast = Toast;

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

                  case 'left':
                      top = (rect.top + rect.height / 2) - this.offsetHeight / 2;
                      left = rect.left - this.offsetWidth - offset;
                      break;

                  case 'right':
                      top = (rect.top + rect.height / 2) - this.offsetHeight / 2;
                      left = rect.right + offset;
                      break;

                  case 'bottom':
                      top = rect.bottom + offset;
                      left = rect.left;
                      break;

                  case 'bottom-right':
                      top = rect.bottom + offset;
                      left = rect.right - this.offsetWidth;
                      break;

                  case 'top':
                      top = rect.top - this.offsetHeight - offset;
                      left = rect.left;
                      break;

                  case 'top-right':
                      top = rect.top - this.offsetHeight - offset;
                      left = rect.right - this.offsetWidth;
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

          let $this = this;

          this.name = name;
          this.adapter = adapter;

          this.load();

          // cleanup expires data
          (function () {

              let time = (new Date()).getTime();

              for (let key in $this.data.__ex) {
                  if ($this.data.__ex[key] < time) {
                      delete $this.data[key];
                      delete $this.data.__ex[key];
                  }
              }

          })();
      }

      Store.prototype.load = function () {

          try {
              this.data = this.adapter.load(this.name);
          } catch (e) {
              this.data = {};
          }

          if (!this.data.__ex) {
              this.data.__ex = {}; // expires data container
          }
      };

      Store.prototype.store = function () {
          try {
              this.adapter.store(this.name, this.data);
          } catch (e) { }
      };

      Store.prototype.toString = function () {
          return JSON.stringify(this.data);
      };

      Store.prototype.flushdb = function () {

          let $this = this;

          this.data = {};
          this.data.__ex = {};

          setTimeout(function () {
              $this.store();
          }, 0); // async saving!?

          return true;
      };

      Store.prototype.get = function (key, def, reload) {

          if (reload) {
              this.load();
          }

          try {

              if (!this.data) {
                  return def;
              }

              if (this.data.__ex && this.data.__ex[key] && this.data.__ex[key] < (new Date()).getTime()) {
                  delete this.data[key];
                  delete this.data.__ex[key];
              }

              return this.data[key] !== undefined ? this.data[key] : def;

          } catch (e) {
              return def;
          }
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

          let keys = arguments,
              key = null,
              removed = 0;

          for (let i = 0; i < keys.length; i++) {

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

          let current = String(this.get(key, "")),
              newone = current + value;

          this.set(key, newone);

          return newone.length;
      };

      Store.prototype.incr = function (key, by) {

          by = by || 1;

          let current = Number(this.get(key, 0)),
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
          let list = this.get(key, []),
              ret = list.unshift(value);

          this.set(key, list);
          return ret;
      };

      Store.prototype.rpush = function (key, value) {
          let list = this.get(key, []),
              ret = list.push(value);

          this.set(key, list);
          return ret;
      };

      Store.prototype.lset = function (key, index, value) {
          let list = this.get(key, []);

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
          let list = this.get(key, []);

          if (index < 0) {
              index = list.length - Math.abs(index);
          }

          return list[index] ? list[index] : null;
      };

      /* Hash methods */

      Store.prototype.hset = function (key, field, value) {
          let set = this.get(key, {});

          set[field] = value;
          this.set(key, set);
      };

      Store.prototype.hget = function (key, field, def) {
          let set = this.get(key, {});

          return set[field] !== undefined ? set[field] : def;
      };

      Store.prototype.hgetall = function (key) {
          return this.get(key, {});
      };

      Store.prototype.hexists = function (key, field) {
          let set = this.get(key, {});

          return (set[field] !== undefined);
      };

      Store.prototype.hkeys = function (key) {
          let set = this.get(key, {}),
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
          let set = this.get(key, {}),
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

          let set = this.get(key, {}),
              field = null,
              removed = 0;

          for (let i = 1; i < arguments.length; i++) {

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
          let current = Number(this.hget(key, field, 0)),
              newone = current + by;

          this.hset(key, field, newone);

          return newone;
      };

      Store.prototype.hmget = function (key) {
          let set = this.get(key, {}),
              field = null,
              values = [];

          for (let i = 1; i < arguments.length; i++) {
              field = arguments[i];
              values.push(set[field] !== undefined ? set[field] : null);
          }

          return values;
      };

      Store.prototype.hmset = function (key) {
          let set = this.get(key, {}),
              field = null,
              value = null;

          for (let i = 1; i < arguments.length; i++) {
              field = arguments[i];
              value = arguments[(i + 1)] ? arguments[(i + 1)] : null;
              set[field] = value;
              i = i + 1;
          }

          this.set(key, set);
      };

      let JSONStorage = {

          select: function (name, adapter) {
              return (new Store(name, typeof (adapter) == 'object' ? adapter : (this.adapters[adapter] || this.adapters['memory'])));
          },

          adapters: {

              memory: (function () {
                  let dbs = {};

                  return {
                      load: function (name) {
                          let data = dbs[name] || {};
                          data.__ex = data.__ex || {};
                          return data;
                      },
                      store: function (name, data) {
                          dbs[name] = data;
                      }
                  }
              })(),

              local: {
                  load: function (name) {

                      let data = {};

                      try {
                          data = global.localStorage[`jsonstorage.${name}`] ? JSON.parse(global.localStorage[`jsonstorage.${name}`]) : {};
                      } catch (e) {}

                      data.__ex = data.__ex || {};
                      return data;
                  },
                  store: function (name, data) {
                      global.localStorage[`jsonstorage.${name}`] = JSON.stringify(data);
                  }
              },

              session: {
                  load: function (name) {

                      let data = {};

                      try {
                          data = global.sessionStorage[`jsonstorage.${name}`] ? JSON.parse(global.sessionStorage[`jsonstorage.${name}`]) : {};
                      } catch (e) {}

                      data.__ex = data.__ex || {};
                      return data;
                  },
                  store: function (name, data) {
                      global.sessionStorage[`jsonstorage.${name}`] = JSON.stringify(data);
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

  var ui = {

      notify(message, type, timeout) {

          if (timeout !== false && !timeout) {
              timeout = 2500;
          }

          KissToast.notify(message,{
              type,
              timeout
          });
      },

      block(info='', context = 'ui-block') {

          document.body.insertAdjacentHTML('beforeend', `
            <app-loader-cover class="${context}" label="${info}"></app-loader-cover>
        `);
      },

      unblock(context = 'ui-block') {
          document.querySelectorAll(`.${context}`).forEach(node => node.parentNode.removeChild(node));
      },

      offcanvas(content, options) {

          let id = `offcanvas-${uuid++}`,
              size = '';

          options = options || {};

          switch (options.size) {
              case 'medium':
                  size = 'kiss-width-1-2@m kiss-width-1-3@xl';
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


      dialog(content, options, dialogtype) {

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

      alert(content, options) {

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

      confirm(text, onconfirm, oncancel, options) {

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

      prompt(text, value = '', clb, options) {

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

      popout(content, options) {

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

  customElements.define('app-textcomplete', class extends HTMLElement {

      constructor() {
          super();
          this.itemList = [];
          this.triggerChar = '@';
          this.isAutocompleteActive = false;
      }

      static get observedAttributes() {
          return ['items', 'trigger'];
      }

      connectedCallback() {
          this.input = this.querySelector('input, textarea');

          if (!this.input) {
              this.input = document.createElement('input');
              this.input.type = 'text';
              this.input.placeholder = 'Enter text...';
              this.appendChild(this.input);
          }

          this.autocompleteList = document.createElement('div');
          this.autocompleteList.className = 'app-textcomplete-autocomplete-list';

          this.input.addEventListener('input', this.handleInput.bind(this));
          this.input.addEventListener('keydown', this.handleKeyDown.bind(this));
          document.addEventListener('click', this.handleClickOutside.bind(this));

          this.updateItems();
          this.updateTrigger();
      }

      attributeChangedCallback(name, oldValue, newValue) {
          if (name === 'items') {
              this.updateItems();
          } else if (name === 'trigger') {
              this.updateTrigger();
          }
      }

      updateItems() {
          const itemsAttr = this.getAttribute('items');
          this.itemList = itemsAttr ? itemsAttr.split(',').map(s => s.trim()) : [];
      }

      updateTrigger() {
          const triggerAttr = this.getAttribute('trigger');
          this.triggerChar = triggerAttr ? triggerAttr : '@';
      }

      handleInput(e) {
          const cursorPosition = e.target.selectionStart;
          const inputValue = e.target.value;
          const lastTriggerIndex = inputValue.lastIndexOf(this.triggerChar, cursorPosition);

          if (lastTriggerIndex !== -1 && lastTriggerIndex === cursorPosition - 1) {
              this.showItems(this.itemList);
          } else if (lastTriggerIndex !== -1) {
              const currentWord = inputValue.slice(lastTriggerIndex + 1, cursorPosition);
              const filteredItems = this.itemList.filter(item =>
                  item.toLowerCase().startsWith(currentWord.toLowerCase())
              );
              this.showItems(filteredItems);
          } else {
              this.hideItems();
          }
      }

      showItems(items) {

          this.autocompleteList.innerHTML = '';

          if (items.length === 0) {
              this.hideItems();
              return;
          }

          // Append autocomplete list to body
          document.body.appendChild(this.autocompleteList);

          const rect = this.input.getBoundingClientRect();

          Object.assign(this.autocompleteList.style, {
              top: `${rect.bottom + window.scrollY}px`,
              left: `${rect.left + window.scrollX}px`,
              width: `${rect.width}px`,
          });

          items.forEach(item => {
              const div = document.createElement('div');
              div.textContent = item;
              div.className = 'autocomplete-item';
              div.addEventListener('click', () => this.selectItem(item));
              this.autocompleteList.appendChild(div);
          });

          this.autocompleteList.style.display = 'block';
          this.isAutocompleteActive = true;
          this.setAttribute('active', 'true');
      }

      hideItems() {
          this.autocompleteList.style.display = 'none';
          this.isAutocompleteActive = false;
          this.setAttribute('active', '');

          if (this.autocompleteList.parentNode) {
              this.autocompleteList.parentNode.removeChild(this.autocompleteList);
          }
      }

      selectItem(item) {
          const cursorPosition = this.input.selectionStart;
          const inputValue = this.input.value;
          const lastTriggerIndex = inputValue.lastIndexOf(this.triggerChar, cursorPosition);

          const newValue = inputValue.slice(0, lastTriggerIndex) + item + inputValue.slice(cursorPosition);
          this.input.value = newValue;
          this.input.focus();
          const newCursorPosition = lastTriggerIndex + item.length;
          this.input.setSelectionRange(newCursorPosition, newCursorPosition);
          this.hideItems();
      }

      handleKeyDown(e) {
          if (!this.isAutocompleteActive) return;

          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
              e.preventDefault();
              const items = this.autocompleteList.getElementsByClassName('autocomplete-item');
              if (items.length === 0) return;

              const activeItem = this.autocompleteList.querySelector('.autocomplete-item.active');
              let nextItem;

              if (!activeItem) {
                  nextItem = e.key === 'ArrowDown' ? items[0] : items[items.length - 1];
              } else {
                  activeItem.classList.remove('active');
                  const currentIndex = Array.from(items).indexOf(activeItem);
                  const nextIndex = e.key === 'ArrowDown'
                      ? (currentIndex + 1) % items.length
                      : (currentIndex - 1 + items.length) % items.length;
                  nextItem = items[nextIndex];
              }

              nextItem.classList.add('active');
              nextItem.scrollIntoView({ block: 'nearest' });
          } else if (e.key === 'Enter') {
              const activeItem = this.autocompleteList.querySelector('.autocomplete-item.active');
              if (activeItem) {
                  e.preventDefault();
                  e.stopImmediatePropagation();
                  this.selectItem(activeItem.textContent);
              }
          } else if (e.key === ' ' || e.key === 'Escape') {
              this.cancelAutocomplete();
          }
      }

      cancelAutocomplete() {
          this.hideItems();
          // Remove any partial input after the trigger character
          const cursorPosition = this.input.selectionStart;
          const inputValue = this.input.value;
          const lastTriggerIndex = inputValue.lastIndexOf(this.triggerChar, cursorPosition);
          if (lastTriggerIndex !== -1) {
              this.input.value = inputValue.slice(0, lastTriggerIndex + 1);
              this.input.setSelectionRange(lastTriggerIndex + 1, lastTriggerIndex + 1);
          }
      }

      handleClickOutside(e) {
          if (!this.contains(e.target)) {
              this.hideItems();
          }
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
