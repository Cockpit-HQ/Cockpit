(function () {
  'use strict';

  /**
  * vue v3.5.11
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/window.Vue=function(e){var t,n;let r,i,l,s,o,a,c,u,d,h,f,p,m;/*! #__NO_SIDE_EFFECTS__ */function g(e){let t=/* @__PURE__ */Object.create(null);for(let n of e.split(","))t[n]=1;return e=>e in t}let y={},b=[],_=()=>{},S=()=>!1,x=e=>111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&(e.charCodeAt(2)>122||97>e.charCodeAt(2)),C=e=>e.startsWith("onUpdate:"),k=Object.assign,T=(e,t)=>{let n=e.indexOf(t);n>-1&&e.splice(n,1);},N=Object.prototype.hasOwnProperty,w=(e,t)=>N.call(e,t),A=Array.isArray,E=e=>"[object Map]"===V(e),I=e=>"[object Set]"===V(e),R=e=>"[object Date]"===V(e),O=e=>"[object RegExp]"===V(e),P=e=>"function"==typeof e,M=e=>"string"==typeof e,L=e=>"symbol"==typeof e,$=e=>null!==e&&"object"==typeof e,D=e=>($(e)||P(e))&&P(e.then)&&P(e.catch),F=Object.prototype.toString,V=e=>F.call(e),B=e=>V(e).slice(8,-1),U=e=>"[object Object]"===V(e),j=e=>M(e)&&"NaN"!==e&&"-"!==e[0]&&""+parseInt(e,10)===e,H=/* @__PURE__ */g(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),q=/* @__PURE__ */g("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"),W=e=>{let t=/* @__PURE__ */Object.create(null);return n=>t[n]||(t[n]=e(n))},K=/-(\w)/g,z=W(e=>e.replace(K,(e,t)=>t?t.toUpperCase():"")),J=/\B([A-Z])/g,G=W(e=>e.replace(J,"-$1").toLowerCase()),X=W(e=>e.charAt(0).toUpperCase()+e.slice(1)),Q=W(e=>e?`on${X(e)}`:""),Z=(e,t)=>!Object.is(e,t),Y=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t);},ee=(e,t,n,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:n});},et=e=>{let t=parseFloat(e);return isNaN(t)?e:t},en=e=>{let t=M(e)?Number(e):NaN;return isNaN(t)?e:t},er=()=>r||(r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}),ei=/* @__PURE__ */g("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol");function el(e){if(A(e)){let t={};for(let n=0;n<e.length;n++){let r=e[n],i=M(r)?ec(r):el(r);if(i)for(let e in i)t[e]=i[e];}return t}if(M(e)||$(e))return e}let es=/;(?![^(]*\))/g,eo=/:([^]+)/,ea=/\/\*[^]*?\*\//g;function ec(e){let t={};return e.replace(ea,"").split(es).forEach(e=>{if(e){let n=e.split(eo);n.length>1&&(t[n[0].trim()]=n[1].trim());}}),t}function eu(e){let t="";if(M(e))t=e;else if(A(e))for(let n=0;n<e.length;n++){let r=eu(e[n]);r&&(t+=r+" ");}else if($(e))for(let n in e)e[n]&&(t+=n+" ");return t.trim()}let ed=/* @__PURE__ */g("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot"),eh=/* @__PURE__ */g("svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view"),ef=/* @__PURE__ */g("annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics"),ep=/* @__PURE__ */g("area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr"),em=/* @__PURE__ */g("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");function eg(e,t){if(e===t)return !0;let n=R(e),r=R(t);if(n||r)return !!n&&!!r&&e.getTime()===t.getTime();if(n=L(e),r=L(t),n||r)return e===t;if(n=A(e),r=A(t),n||r)return !!n&&!!r&&function(e,t){if(e.length!==t.length)return !1;let n=!0;for(let r=0;n&&r<e.length;r++)n=eg(e[r],t[r]);return n}(e,t);if(n=$(e),r=$(t),n||r){if(!n||!r||Object.keys(e).length!==Object.keys(t).length)return !1;for(let n in e){let r=e.hasOwnProperty(n),i=t.hasOwnProperty(n);if(r&&!i||!r&&i||!eg(e[n],t[n]))return !1}}return String(e)===String(t)}function ey(e,t){return e.findIndex(e=>eg(e,t))}let ev=e=>!!(e&&!0===e.__v_isRef),eb=e=>M(e)?e:null==e?"":A(e)||$(e)&&(e.toString===F||!P(e.toString))?ev(e)?eb(e.value):JSON.stringify(e,e_,2):String(e),e_=(e,t)=>ev(t)?e_(e,t.value):E(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[t,n],r)=>(e[eS(t,r)+" =>"]=n,e),{})}:I(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>eS(e))}:L(t)?eS(t):!$(t)||A(t)||U(t)?t:String(t),eS=(e,t="")=>{var n;return L(e)?`Symbol(${null!=(n=e.description)?n:t})`:e};class ex{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=i,!e&&i&&(this.index=(i.scopes||(i.scopes=[])).push(this)-1);}get active(){return this._active}pause(){if(this._active){let e,t;if(this._isPaused=!0,this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause();}}resume(){if(this._active&&this._isPaused){let e,t;if(this._isPaused=!1,this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume();}}run(e){if(this._active){let t=i;try{return i=this,e()}finally{i=t;}}}on(){i=this;}off(){i=this.parent;}stop(e){if(this._active){let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);if(!this.detached&&this.parent&&!e){let e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index);}this.parent=void 0,this._active=!1;}}}let eC=/* @__PURE__ */new WeakSet;class ek{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,i&&i.active&&i.effects.push(this);}pause(){this.flags|=64;}resume(){64&this.flags&&(this.flags&=-65,eC.has(this)&&(eC.delete(this),this.trigger()));}notify(){(!(2&this.flags)||32&this.flags)&&(8&this.flags||eN(this));}run(){if(!(1&this.flags))return this.fn();this.flags|=2,eD(this),eA(this);let e=l,t=eP;l=this,eP=!0;try{return this.fn()}finally{eE(this),l=e,eP=t,this.flags&=-3;}}stop(){if(1&this.flags){for(let e=this.deps;e;e=e.nextDep)eO(e);this.deps=this.depsTail=void 0,eD(this),this.onStop&&this.onStop(),this.flags&=-2;}}trigger(){64&this.flags?eC.add(this):this.scheduler?this.scheduler():this.runIfDirty();}runIfDirty(){eI(this)&&this.run();}get dirty(){return eI(this)}}let eT=0;function eN(e,t=!1){if(e.flags|=8,t){e.next=o,o=e;return}e.next=s,s=e;}function ew(){let e;if(!(--eT>0)){if(o){let e=o;for(o=void 0;e;){let t=e.next;e.next=void 0,e.flags&=-9,e=t;}}for(;s;){let t=s;for(s=void 0;t;){let n=t.next;if(t.next=void 0,t.flags&=-9,1&t.flags)try{t.trigger();}catch(t){e||(e=t);}t=n;}}if(e)throw e}}function eA(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t;}function eE(e){let t;let n=e.depsTail,r=n;for(;r;){let e=r.prevDep;-1===r.version?(r===n&&(n=e),eO(r),function(e){let{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0);}(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=e;}e.deps=t,e.depsTail=n;}function eI(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(eR(t.dep.computed)||t.dep.version!==t.version))return !0;return !!e._dirty}function eR(e){if(4&e.flags&&!(16&e.flags)||(e.flags&=-17,e.globalVersion===eF))return;e.globalVersion=eF;let t=e.dep;if(e.flags|=2,t.version>0&&!e.isSSR&&e.deps&&!eI(e)){e.flags&=-3;return}let n=l,r=eP;l=e,eP=!0;try{eA(e);let n=e.fn(e._value);(0===t.version||Z(n,e._value))&&(e._value=n,t.version++);}catch(e){throw t.version++,e}finally{l=n,eP=r,eE(e),e.flags&=-3;}}function eO(e,t=!1){let{dep:n,prevSub:r,nextSub:i}=e;if(r&&(r.nextSub=i,e.prevSub=void 0),i&&(i.prevSub=r,e.nextSub=void 0),n.subs===e&&(n.subs=r),!n.subs&&n.computed){n.computed.flags&=-5;for(let e=n.computed.deps;e;e=e.nextDep)eO(e,!0);}t||--n.sc||!n.map||n.map.delete(n.key);}let eP=!0,eM=[];function eL(){eM.push(eP),eP=!1;}function e$(){let e=eM.pop();eP=void 0===e||e;}function eD(e){let{cleanup:t}=e;if(e.cleanup=void 0,t){let e=l;l=void 0;try{t();}finally{l=e;}}}let eF=0;class eV{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0;}}class eB{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0;}track(e){if(!l||!eP||l===this.computed)return;let t=this.activeLink;if(void 0===t||t.sub!==l)t=this.activeLink=new eV(l,this),l.deps?(t.prevDep=l.depsTail,l.depsTail.nextDep=t,l.depsTail=t):l.deps=l.depsTail=t,function e(t){if(t.dep.sc++,4&t.sub.flags){let n=t.dep.computed;if(n&&!t.dep.subs){n.flags|=20;for(let t=n.deps;t;t=t.nextDep)e(t);}let r=t.dep.subs;r!==t&&(t.prevSub=r,r&&(r.nextSub=t)),t.dep.subs=t;}}(t);else if(-1===t.version&&(t.version=this.version,t.nextDep)){let e=t.nextDep;e.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=e),t.prevDep=l.depsTail,t.nextDep=void 0,l.depsTail.nextDep=t,l.depsTail=t,l.deps===t&&(l.deps=e);}return t}trigger(e){this.version++,eF++,this.notify(e);}notify(e){eT++;try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify();}finally{ew();}}}let eU=/* @__PURE__ */new WeakMap,ej=Symbol(""),eH=Symbol(""),eq=Symbol("");function eW(e,t,n){if(eP&&l){let t=eU.get(e);t||eU.set(e,t=/* @__PURE__ */new Map);let r=t.get(n);r||(t.set(n,r=new eB),r.map=t,r.key=n),r.track();}}function eK(e,t,n,r,i,l){let s=eU.get(e);if(!s){eF++;return}let o=e=>{e&&e.trigger();};if(eT++,"clear"===t)s.forEach(o);else {let i=A(e),l=i&&j(n);if(i&&"length"===n){let e=Number(r);s.forEach((t,n)=>{("length"===n||n===eq||!L(n)&&n>=e)&&o(t);});}else switch(void 0!==n&&o(s.get(n)),l&&o(s.get(eq)),t){case"add":i?l&&o(s.get("length")):(o(s.get(ej)),E(e)&&o(s.get(eH)));break;case"delete":!i&&(o(s.get(ej)),E(e)&&o(s.get(eH)));break;case"set":E(e)&&o(s.get(ej));}}ew();}function ez(e){let t=tL(e);return t===e?t:(eW(t,"iterate",eq),tP(e)?t:t.map(tD))}function eJ(e){return eW(e=tL(e),"iterate",eq),e}let eG={__proto__:null,[Symbol.iterator](){return eX(this,Symbol.iterator,tD)},concat(...e){return ez(this).concat(...e.map(e=>A(e)?ez(e):e))},entries(){return eX(this,"entries",e=>(e[1]=tD(e[1]),e))},every(e,t){return eZ(this,"every",e,t,void 0,arguments)},filter(e,t){return eZ(this,"filter",e,t,e=>e.map(tD),arguments)},find(e,t){return eZ(this,"find",e,t,tD,arguments)},findIndex(e,t){return eZ(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return eZ(this,"findLast",e,t,tD,arguments)},findLastIndex(e,t){return eZ(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return eZ(this,"forEach",e,t,void 0,arguments)},includes(...e){return e0(this,"includes",e)},indexOf(...e){return e0(this,"indexOf",e)},join(e){return ez(this).join(e)},lastIndexOf(...e){return e0(this,"lastIndexOf",e)},map(e,t){return eZ(this,"map",e,t,void 0,arguments)},pop(){return e1(this,"pop")},push(...e){return e1(this,"push",e)},reduce(e,...t){return eY(this,"reduce",e,t)},reduceRight(e,...t){return eY(this,"reduceRight",e,t)},shift(){return e1(this,"shift")},some(e,t){return eZ(this,"some",e,t,void 0,arguments)},splice(...e){return e1(this,"splice",e)},toReversed(){return ez(this).toReversed()},toSorted(e){return ez(this).toSorted(e)},toSpliced(...e){return ez(this).toSpliced(...e)},unshift(...e){return e1(this,"unshift",e)},values(){return eX(this,"values",tD)}};function eX(e,t,n){let r=eJ(e),i=r[t]();return r===e||tP(e)||(i._next=i.next,i.next=()=>{let e=i._next();return e.value&&(e.value=n(e.value)),e}),i}let eQ=Array.prototype;function eZ(e,t,n,r,i,l){let s=eJ(e),o=s!==e&&!tP(e),a=s[t];if(a!==eQ[t]){let t=a.apply(e,l);return o?tD(t):t}let c=n;s!==e&&(o?c=function(t,r){return n.call(this,tD(t),r,e)}:n.length>2&&(c=function(t,r){return n.call(this,t,r,e)}));let u=a.call(s,c,r);return o&&i?i(u):u}function eY(e,t,n,r){let i=eJ(e),l=n;return i!==e&&(tP(e)?n.length>3&&(l=function(t,r,i){return n.call(this,t,r,i,e)}):l=function(t,r,i){return n.call(this,t,tD(r),i,e)}),i[t](l,...r)}function e0(e,t,n){let r=tL(e);eW(r,"iterate",eq);let i=r[t](...n);return (-1===i||!1===i)&&tM(n[0])?(n[0]=tL(n[0]),r[t](...n)):i}function e1(e,t,n=[]){eL(),eT++;let r=tL(e)[t].apply(e,n);return ew(),e$(),r}let e2=/* @__PURE__ */g("__proto__,__v_isRef,__isVue"),e6=new Set(/* @__PURE__ */Object.getOwnPropertyNames(Symbol).filter(e=>"arguments"!==e&&"caller"!==e).map(e=>Symbol[e]).filter(L));function e3(e){L(e)||(e=String(e));let t=tL(this);return eW(t,"has",e),t.hasOwnProperty(e)}class e4{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t;}get(e,t,n){let r=this._isReadonly,i=this._isShallow;if("__v_isReactive"===t)return !r;if("__v_isReadonly"===t)return r;if("__v_isShallow"===t)return i;if("__v_raw"===t)return n===(r?i?tN:tT:i?tk:tC).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;let l=A(e);if(!r){let e;if(l&&(e=eG[t]))return e;if("hasOwnProperty"===t)return e3}let s=Reflect.get(e,t,tV(e)?e:n);return (L(t)?e6.has(t):e2(t))?s:(r||eW(e,"get",t),i)?s:tV(s)?l&&j(t)?s:s.value:$(s)?r?tE(s):tw(s):s}}class e8 extends e4{constructor(e=!1){super(!1,e);}set(e,t,n,r){let i=e[t];if(!this._isShallow){let t=tO(i);if(tP(n)||tO(n)||(i=tL(i),n=tL(n)),!A(e)&&tV(i)&&!tV(n))return !t&&(i.value=n,!0)}let l=A(e)&&j(t)?Number(t)<e.length:w(e,t),s=Reflect.set(e,t,n,tV(e)?e:r);return e===tL(r)&&(l?Z(n,i)&&eK(e,"set",t,n):eK(e,"add",t,n)),s}deleteProperty(e,t){let n=w(e,t);e[t];let r=Reflect.deleteProperty(e,t);return r&&n&&eK(e,"delete",t,void 0),r}has(e,t){let n=Reflect.has(e,t);return L(t)&&e6.has(t)||eW(e,"has",t),n}ownKeys(e){return eW(e,"iterate",A(e)?"length":ej),Reflect.ownKeys(e)}}class e5 extends e4{constructor(e=!1){super(!0,e);}set(e,t){return !0}deleteProperty(e,t){return !0}}let e9=/* @__PURE__ */new e8,e7=/* @__PURE__ */new e5,te=/* @__PURE__ */new e8(!0),tt=/* @__PURE__ */new e5(!0),tn=e=>e,tr=e=>Reflect.getPrototypeOf(e);function ti(e,t,n=!1,r=!1){let i=tL(e=e.__v_raw),l=tL(t);n||(Z(t,l)&&eW(i,"get",t),eW(i,"get",l));let{has:s}=tr(i),o=r?tn:n?tF:tD;return s.call(i,t)?o(e.get(t)):s.call(i,l)?o(e.get(l)):void(e!==i&&e.get(t))}function tl(e,t=!1){let n=this.__v_raw,r=tL(n),i=tL(e);return t||(Z(e,i)&&eW(r,"has",e),eW(r,"has",i)),e===i?n.has(e):n.has(e)||n.has(i)}function ts(e,t=!1){return e=e.__v_raw,t||eW(tL(e),"iterate",ej),Reflect.get(e,"size",e)}function to(e,t=!1){t||tP(e)||tO(e)||(e=tL(e));let n=tL(this);return tr(n).has.call(n,e)||(n.add(e),eK(n,"add",e,e)),this}function ta(e,t,n=!1){n||tP(t)||tO(t)||(t=tL(t));let r=tL(this),{has:i,get:l}=tr(r),s=i.call(r,e);s||(e=tL(e),s=i.call(r,e));let o=l.call(r,e);return r.set(e,t),s?Z(t,o)&&eK(r,"set",e,t):eK(r,"add",e,t),this}function tc(e){let t=tL(this),{has:n,get:r}=tr(t),i=n.call(t,e);i||(e=tL(e),i=n.call(t,e)),r&&r.call(t,e);let l=t.delete(e);return i&&eK(t,"delete",e,void 0),l}function tu(){let e=tL(this),t=0!==e.size,n=e.clear();return t&&eK(e,"clear",void 0,void 0),n}function td(e,t){return function(n,r){let i=this,l=i.__v_raw,s=tL(l),o=t?tn:e?tF:tD;return e||eW(s,"iterate",ej),l.forEach((e,t)=>n.call(r,o(e),o(t),i))}}function th(e,t,n){return function(...r){let i=this.__v_raw,l=tL(i),s=E(l),o="entries"===e||e===Symbol.iterator&&s,a=i[e](...r),c=n?tn:t?tF:tD;return t||eW(l,"iterate","keys"===e&&s?eH:ej),{next(){let{value:e,done:t}=a.next();return t?{value:e,done:t}:{value:o?[c(e[0]),c(e[1])]:c(e),done:t}},[Symbol.iterator](){return this}}}}function tf(e){return function(...t){return "delete"!==e&&("clear"===e?void 0:this)}}let[tp,tm,tg,ty]=/* @__PURE__ */function(){let e={get(e){return ti(this,e)},get size(){return ts(this)},has:tl,add:to,set:ta,delete:tc,clear:tu,forEach:td(!1,!1)},t={get(e){return ti(this,e,!1,!0)},get size(){return ts(this)},has:tl,add(e){return to.call(this,e,!0)},set(e,t){return ta.call(this,e,t,!0)},delete:tc,clear:tu,forEach:td(!1,!0)},n={get(e){return ti(this,e,!0)},get size(){return ts(this,!0)},has(e){return tl.call(this,e,!0)},add:tf("add"),set:tf("set"),delete:tf("delete"),clear:tf("clear"),forEach:td(!0,!1)},r={get(e){return ti(this,e,!0,!0)},get size(){return ts(this,!0)},has(e){return tl.call(this,e,!0)},add:tf("add"),set:tf("set"),delete:tf("delete"),clear:tf("clear"),forEach:td(!0,!0)};return ["keys","values","entries",Symbol.iterator].forEach(i=>{e[i]=th(i,!1,!1),n[i]=th(i,!0,!1),t[i]=th(i,!1,!0),r[i]=th(i,!0,!0);}),[e,n,t,r]}();function tv(e,t){let n=t?e?ty:tg:e?tm:tp;return (t,r,i)=>"__v_isReactive"===r?!e:"__v_isReadonly"===r?e:"__v_raw"===r?t:Reflect.get(w(n,r)&&r in t?n:t,r,i)}let tb={get:/* @__PURE__ */tv(!1,!1)},t_={get:/* @__PURE__ */tv(!1,!0)},tS={get:/* @__PURE__ */tv(!0,!1)},tx={get:/* @__PURE__ */tv(!0,!0)},tC=/* @__PURE__ */new WeakMap,tk=/* @__PURE__ */new WeakMap,tT=/* @__PURE__ */new WeakMap,tN=/* @__PURE__ */new WeakMap;function tw(e){return tO(e)?e:tI(e,!1,e9,tb,tC)}function tA(e){return tI(e,!1,te,t_,tk)}function tE(e){return tI(e,!0,e7,tS,tT)}function tI(e,t,n,r,i){if(!$(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;let l=i.get(e);if(l)return l;let s=e.__v_skip||!Object.isExtensible(e)?0:function(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}(B(e));if(0===s)return e;let o=new Proxy(e,2===s?r:n);return i.set(e,o),o}function tR(e){return tO(e)?tR(e.__v_raw):!!(e&&e.__v_isReactive)}function tO(e){return !!(e&&e.__v_isReadonly)}function tP(e){return !!(e&&e.__v_isShallow)}function tM(e){return !!e&&!!e.__v_raw}function tL(e){let t=e&&e.__v_raw;return t?tL(t):e}function t$(e){return !w(e,"__v_skip")&&Object.isExtensible(e)&&ee(e,"__v_skip",!0),e}let tD=e=>$(e)?tw(e):e,tF=e=>$(e)?tE(e):e;function tV(e){return !!e&&!0===e.__v_isRef}function tB(e){return tj(e,!1)}function tU(e){return tj(e,!0)}function tj(e,t){return tV(e)?e:new tH(e,t)}class tH{constructor(e,t){this.dep=new eB,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:tL(e),this._value=t?e:tD(e),this.__v_isShallow=t;}get value(){return this.dep.track(),this._value}set value(e){let t=this._rawValue,n=this.__v_isShallow||tP(e)||tO(e);Z(e=n?e:tL(e),t)&&(this._rawValue=e,this._value=n?e:tD(e),this.dep.trigger());}}function tq(e){return tV(e)?e.value:e}let tW={get:(e,t,n)=>"__v_raw"===t?e:tq(Reflect.get(e,t,n)),set:(e,t,n,r)=>{let i=e[t];return tV(i)&&!tV(n)?(i.value=n,!0):Reflect.set(e,t,n,r)}};function tK(e){return tR(e)?e:new Proxy(e,tW)}class tz{constructor(e){this.__v_isRef=!0,this._value=void 0;let t=this.dep=new eB,{get:n,set:r}=e(t.track.bind(t),t.trigger.bind(t));this._get=n,this._set=r;}get value(){return this._value=this._get()}set value(e){this._set(e);}}function tJ(e){return new tz(e)}class tG{constructor(e,t,n){this._object=e,this._key=t,this._defaultValue=n,this.__v_isRef=!0,this._value=void 0;}get value(){let e=this._object[this._key];return this._value=void 0===e?this._defaultValue:e}set value(e){this._object[this._key]=e;}get dep(){return function(e,t){let n=eU.get(e);return n&&n.get(t)}(tL(this._object),this._key)}}class tX{constructor(e){this._getter=e,this.__v_isRef=!0,this.__v_isReadonly=!0,this._value=void 0;}get value(){return this._value=this._getter()}}function tQ(e,t,n){let r=e[t];return tV(r)?r:new tG(e,t,n)}class tZ{constructor(e,t,n){this.fn=e,this.setter=t,this._value=void 0,this.dep=new eB(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=eF-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=n;}notify(){if(this.flags|=16,!(8&this.flags)&&l!==this)return eN(this,!0),!0}get value(){let e=this.dep.track();return eR(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e);}}let tY={},t0=/* @__PURE__ */new WeakMap;function t1(e,t=!1,n=p){if(n){let t=t0.get(n);t||t0.set(n,t=[]),t.push(e);}}function t2(e,t=1/0,n){if(t<=0||!$(e)||e.__v_skip||(n=n||/* @__PURE__ */new Set).has(e))return e;if(n.add(e),t--,tV(e))t2(e.value,t,n);else if(A(e))for(let r=0;r<e.length;r++)t2(e[r],t,n);else if(I(e)||E(e))e.forEach(e=>{t2(e,t,n);});else if(U(e)){for(let r in e)t2(e[r],t,n);for(let r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&t2(e[r],t,n);}return e}function t6(e,t,n,r){try{return r?e(...r):e()}catch(e){t4(e,t,n);}}function t3(e,t,n,r){if(P(e)){let i=t6(e,t,n,r);return i&&D(i)&&i.catch(e=>{t4(e,t,n);}),i}if(A(e)){let i=[];for(let l=0;l<e.length;l++)i.push(t3(e[l],t,n,r));return i}}function t4(e,t,n,r=!0){t&&t.vnode;let{errorHandler:i,throwUnhandledErrorInProduction:l}=t&&t.appContext.config||y;if(t){let r=t.parent,l=t.proxy,s=`https://vuejs.org/error-reference/#runtime-${n}`;for(;r;){let t=r.ec;if(t){for(let n=0;n<t.length;n++)if(!1===t[n](e,l,s))return}r=r.parent;}if(i){eL(),t6(i,null,10,[e,l,s]),e$();return}}!function(e,t,n,r=!0,i=!1){if(i)throw e;console.error(e);}(e,0,0,r,l);}let t8=[],t5=-1,t9=[],t7=null,ne=0,nt=/* @__PURE__ */Promise.resolve(),nn=null;function nr(e){let t=nn||nt;return e?t.then(this?e.bind(this):e):t}function ni(e){if(!(1&e.flags)){let t=nc(e),n=t8[t8.length-1];!n||!(2&e.flags)&&t>=nc(n)?t8.push(e):t8.splice(function(e){let t=t5+1,n=t8.length;for(;t<n;){let r=t+n>>>1,i=t8[r],l=nc(i);l<e||l===e&&2&i.flags?t=r+1:n=r;}return t}(t),0,e),e.flags|=1,nl();}}function nl(){nn||(nn=nt.then(function e(t){try{for(t5=0;t5<t8.length;t5++){let e=t8[t5];!e||8&e.flags||(4&e.flags&&(e.flags&=-2),t6(e,e.i,e.i?15:14),4&e.flags||(e.flags&=-2));}}finally{for(;t5<t8.length;t5++){let e=t8[t5];e&&(e.flags&=-2);}t5=-1,t8.length=0,na(),nn=null,(t8.length||t9.length)&&e();}}));}function ns(e){A(e)?t9.push(...e):t7&&-1===e.id?t7.splice(ne+1,0,e):1&e.flags||(t9.push(e),e.flags|=1),nl();}function no(e,t,n=t5+1){for(;n<t8.length;n++){let t=t8[n];if(t&&2&t.flags){if(e&&t.id!==e.uid)continue;t8.splice(n,1),n--,4&t.flags&&(t.flags&=-2),t(),4&t.flags||(t.flags&=-2);}}}function na(e){if(t9.length){let e=[...new Set(t9)].sort((e,t)=>nc(e)-nc(t));if(t9.length=0,t7){t7.push(...e);return}for(ne=0,t7=e;ne<t7.length;ne++){let e=t7[ne];4&e.flags&&(e.flags&=-2),8&e.flags||e(),e.flags&=-2;}t7=null,ne=0;}}let nc=e=>null==e.id?2&e.flags?-1:1/0:e.id,nu=null,nd=null;function nh(e){let t=nu;return nu=e,nd=e&&e.type.__scopeId||null,t}function nf(e,t=nu,n){if(!t||e._n)return e;let r=(...n)=>{let i;r._d&&iN(-1);let l=nh(t);try{i=e(...n);}finally{nh(l),r._d&&iN(1);}return i};return r._n=!0,r._c=!0,r._d=!0,r}function np(e,t,n,r){let i=e.dirs,l=t&&t.dirs;for(let s=0;s<i.length;s++){let o=i[s];l&&(o.oldValue=l[s].value);let a=o.dir[r];a&&(eL(),t3(a,n,8,[e.el,o,e,t]),e$());}}let nm=Symbol("_vte"),ng=e=>e.__isTeleport,ny=e=>e&&(e.disabled||""===e.disabled),nv=e=>e&&(e.defer||""===e.defer),nb=e=>"undefined"!=typeof SVGElement&&e instanceof SVGElement,n_=e=>"function"==typeof MathMLElement&&e instanceof MathMLElement,nS=(e,t)=>{let n=e&&e.to;return M(n)?t?t(n):null:n};function nx(e,t,n,{o:{insert:r},m:i},l=2){0===l&&r(e.targetAnchor,t,n);let{el:s,anchor:o,shapeFlag:a,children:c,props:u}=e,d=2===l;if(d&&r(s,t,n),(!d||ny(u))&&16&a)for(let e=0;e<c.length;e++)i(c[e],t,n,2);d&&r(o,t,n);}function nC(e){let t=e.ctx;if(t&&t.ut){let n=e.targetStart;for(;n&&n!==e.targetAnchor;)1===n.nodeType&&n.setAttribute("data-v-owner",t.uid),n=n.nextSibling;t.ut();}}function nk(e,t,n,r){let i=t.targetStart=n(""),l=t.targetAnchor=n("");return i[nm]=l,e&&(r(i,e),r(l,e)),l}let nT=Symbol("_leaveCb"),nN=Symbol("_enterCb");function nw(){let e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:/* @__PURE__ */new Map};return re(()=>{e.isMounted=!0;}),rr(()=>{e.isUnmounting=!0;}),e}let nA=[Function,Array],nE={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:nA,onEnter:nA,onAfterEnter:nA,onEnterCancelled:nA,onBeforeLeave:nA,onLeave:nA,onAfterLeave:nA,onLeaveCancelled:nA,onBeforeAppear:nA,onAppear:nA,onAfterAppear:nA,onAppearCancelled:nA},nI=e=>{let t=e.subTree;return t.component?nI(t.component):t};function nR(e){let t=e[0];if(e.length>1){for(let n of e)if(n.type!==ib){t=n;break}}return t}let nO={name:"BaseTransition",props:nE,setup(e,{slots:t}){let n=iK(),r=nw();return ()=>{let i=t.default&&nF(t.default(),!0);if(!i||!i.length)return;let l=nR(i),s=tL(e),{mode:o}=s;if(r.isLeaving)return nL(l);let a=n$(l);if(!a)return nL(l);let c=nM(a,s,r,n,e=>c=e);a.type!==ib&&nD(a,c);let u=n.subTree,d=u&&n$(u);if(d&&d.type!==ib&&!iI(a,d)&&nI(n).type!==ib){let e=nM(d,s,r,n);if(nD(d,e),"out-in"===o&&a.type!==ib)return r.isLeaving=!0,e.afterLeave=()=>{r.isLeaving=!1,8&n.job.flags||n.update(),delete e.afterLeave;},nL(l);"in-out"===o&&a.type!==ib&&(e.delayLeave=(e,t,n)=>{nP(r,d)[String(d.key)]=d,e[nT]=()=>{t(),e[nT]=void 0,delete c.delayedLeave;},c.delayedLeave=n;});}return l}}};function nP(e,t){let{leavingVNodes:n}=e,r=n.get(t.type);return r||(r=/* @__PURE__ */Object.create(null),n.set(t.type,r)),r}function nM(e,t,n,r,i){let{appear:l,mode:s,persisted:o=!1,onBeforeEnter:a,onEnter:c,onAfterEnter:u,onEnterCancelled:d,onBeforeLeave:h,onLeave:f,onAfterLeave:p,onLeaveCancelled:m,onBeforeAppear:g,onAppear:y,onAfterAppear:b,onAppearCancelled:_}=t,S=String(e.key),x=nP(n,e),C=(e,t)=>{e&&t3(e,r,9,t);},k=(e,t)=>{let n=t[1];C(e,t),A(e)?e.every(e=>e.length<=1)&&n():e.length<=1&&n();},T={mode:s,persisted:o,beforeEnter(t){let r=a;if(!n.isMounted){if(!l)return;r=g||a;}t[nT]&&t[nT](!0);let i=x[S];i&&iI(e,i)&&i.el[nT]&&i.el[nT](),C(r,[t]);},enter(e){let t=c,r=u,i=d;if(!n.isMounted){if(!l)return;t=y||c,r=b||u,i=_||d;}let s=!1,o=e[nN]=t=>{s||(s=!0,t?C(i,[e]):C(r,[e]),T.delayedLeave&&T.delayedLeave(),e[nN]=void 0);};t?k(t,[e,o]):o();},leave(t,r){let i=String(e.key);if(t[nN]&&t[nN](!0),n.isUnmounting)return r();C(h,[t]);let l=!1,s=t[nT]=n=>{l||(l=!0,r(),n?C(m,[t]):C(p,[t]),t[nT]=void 0,x[i]!==e||delete x[i]);};x[i]=e,f?k(f,[t,s]):s();},clone(e){let l=nM(e,t,n,r,i);return i&&i(l),l}};return T}function nL(e){if(n0(e))return (e=i$(e)).children=null,e}function n$(e){if(!n0(e))return ng(e.type)&&e.children?nR(e.children):e;let{shapeFlag:t,children:n}=e;if(n){if(16&t)return n[0];if(32&t&&P(n.default))return n.default()}}function nD(e,t){6&e.shapeFlag&&e.component?(e.transition=t,nD(e.component.subTree,t)):128&e.shapeFlag?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t;}function nF(e,t=!1,n){let r=[],i=0;for(let l=0;l<e.length;l++){let s=e[l],o=null==n?s.key:String(n)+String(null!=s.key?s.key:l);s.type===iy?(128&s.patchFlag&&i++,r=r.concat(nF(s.children,t,o))):(t||s.type!==ib)&&r.push(null!=o?i$(s,{key:o}):s);}if(i>1)for(let e=0;e<r.length;e++)r[e].patchFlag=-2;return r}/*! #__NO_SIDE_EFFECTS__ */function nV(e,t){return P(e)?k({name:e.name},t,{setup:e}):e}function nB(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0];}function nU(e,t,n,r,i=!1){if(A(e)){e.forEach((e,l)=>nU(e,t&&(A(t)?t[l]:t),n,r,i));return}if(nZ(r)&&!i)return;let l=4&r.shapeFlag?i2(r.component):r.el,s=i?null:l,{i:o,r:a}=e,c=t&&t.r,u=o.refs===y?o.refs={}:o.refs,d=o.setupState,h=tL(d),f=d===y?()=>!1:e=>w(h,e);if(null!=c&&c!==a&&(M(c)?(u[c]=null,f(c)&&(d[c]=null)):tV(c)&&(c.value=null)),P(a))t6(a,o,12,[s,u]);else {let t=M(a),r=tV(a);if(t||r){let o=()=>{if(e.f){let n=t?f(a)?d[a]:u[a]:a.value;i?A(n)&&T(n,l):A(n)?n.includes(l)||n.push(l):t?(u[a]=[l],f(a)&&(d[a]=u[a])):(a.value=[l],e.k&&(u[e.k]=a.value));}else t?(u[a]=s,f(a)&&(d[a]=s)):r&&(a.value=s,e.k&&(u[e.k]=s));};s?(o.id=-1,rX(o,n)):o();}}}let nj=!1,nH=()=>{nj||(console.error("Hydration completed but contains mismatches."),nj=!0);},nq=e=>e.namespaceURI.includes("svg")&&"foreignObject"!==e.tagName,nW=e=>e.namespaceURI.includes("MathML"),nK=e=>{if(1===e.nodeType){if(nq(e))return "svg";if(nW(e))return "mathml"}},nz=e=>8===e.nodeType;function nJ(e){let{mt:t,p:n,o:{patchProp:r,createText:i,nextSibling:l,parentNode:s,remove:o,insert:a,createComment:c}}=e,u=(n,r,o,c,b,_=!1)=>{_=_||!!r.dynamicChildren;let S=nz(n)&&"["===n.data,x=()=>p(n,r,o,c,b,S),{type:C,ref:k,shapeFlag:T,patchFlag:N}=r,w=n.nodeType;r.el=n,-2===N&&(_=!1,r.dynamicChildren=null);let A=null;switch(C){case iv:3!==w?""===r.children?(a(r.el=i(""),s(n),n),A=n):A=x():(n.data!==r.children&&(nH(),n.data=r.children),A=l(n));break;case ib:y(n)?(A=l(n),g(r.el=n.content.firstChild,n,o)):A=8!==w||S?x():l(n);break;case i_:if(S&&(w=(n=l(n)).nodeType),1===w||3===w){A=n;let e=!r.children.length;for(let t=0;t<r.staticCount;t++)e&&(r.children+=1===A.nodeType?A.outerHTML:A.data),t===r.staticCount-1&&(r.anchor=A),A=l(A);return S?l(A):A}x();break;case iy:A=S?f(n,r,o,c,b,_):x();break;default:if(1&T)A=1===w&&r.type.toLowerCase()===n.tagName.toLowerCase()||y(n)?d(n,r,o,c,b,_):x();else if(6&T){r.slotScopeIds=b;let e=s(n);if(A=S?m(n):nz(n)&&"teleport start"===n.data?m(n,n.data,"teleport end"):l(n),t(r,e,null,o,c,nK(e),_),nZ(r)){let t;S?(t=iM(iy)).anchor=A?A.previousSibling:e.lastChild:t=3===n.nodeType?iD(""):iM("div"),t.el=n,r.component.subTree=t;}}else 64&T?A=8!==w?x():r.type.hydrate(n,r,o,c,b,_,e,h):128&T&&(A=r.type.hydrate(n,r,o,c,nK(s(n)),b,_,e,u));}return null!=k&&nU(k,null,c,r),A},d=(e,t,n,i,l,s)=>{s=s||!!t.dynamicChildren;let{type:a,props:c,patchFlag:u,shapeFlag:d,dirs:f,transition:p}=t,m="input"===a||"option"===a;if(m||-1!==u){let a;f&&np(t,null,n,"created");let b=!1;if(y(e)){b=r1(i,p)&&n&&n.vnode.props&&n.vnode.props.appear;let r=e.content.firstChild;b&&p.beforeEnter(r),g(r,e,n),t.el=e=r;}if(16&d&&!(c&&(c.innerHTML||c.textContent))){let r=h(e.firstChild,t,e,n,i,l,s);for(;r;){nQ(e,1)||nH();let t=r;r=r.nextSibling,o(t);}}else if(8&d){let n=t.children;"\n"===n[0]&&("PRE"===e.tagName||"TEXTAREA"===e.tagName)&&(n=n.slice(1)),e.textContent!==n&&(nQ(e,0)||nH(),e.textContent=t.children);}if(c){if(m||!s||48&u){let t=e.tagName.includes("-");for(let i in c)(m&&(i.endsWith("value")||"indeterminate"===i)||x(i)&&!H(i)||"."===i[0]||t)&&r(e,i,null,c[i],void 0,n);}else if(c.onClick)r(e,"onClick",null,c.onClick,void 0,n);else if(4&u&&tR(c.style))for(let e in c.style)c.style[e];}(a=c&&c.onVnodeBeforeMount)&&ij(a,n,t),f&&np(t,null,n,"beforeMount"),((a=c&&c.onVnodeMounted)||f||b)&&im(()=>{a&&ij(a,n,t),b&&p.enter(e),f&&np(t,null,n,"mounted");},i);}return e.nextSibling},h=(e,t,r,s,o,c,d)=>{d=d||!!t.dynamicChildren;let h=t.children,f=h.length;for(let t=0;t<f;t++){let p=d?h[t]:h[t]=iF(h[t]),m=p.type===iv;e?(m&&!d&&t+1<f&&iF(h[t+1]).type===iv&&(a(i(e.data.slice(p.children.length)),r,l(e)),e.data=p.children),e=u(e,p,s,o,c,d)):m&&!p.children?a(p.el=i(""),r):(nQ(r,1)||nH(),n(null,p,r,null,s,o,nK(r),c));}return e},f=(e,t,n,r,i,o)=>{let{slotScopeIds:u}=t;u&&(i=i?i.concat(u):u);let d=s(e),f=h(l(e),t,d,n,r,i,o);return f&&nz(f)&&"]"===f.data?l(t.anchor=f):(nH(),a(t.anchor=c("]"),d,f),f)},p=(e,t,r,i,a,c)=>{if(nQ(e.parentElement,1)||nH(),t.el=null,c){let t=m(e);for(;;){let n=l(e);if(n&&n!==t)o(n);else break}}let u=l(e),d=s(e);return o(e),n(null,t,d,u,r,i,nK(d),a),u},m=(e,t="[",n="]")=>{let r=0;for(;e;)if((e=l(e))&&nz(e)&&(e.data===t&&r++,e.data===n)){if(0===r)return l(e);r--;}return e},g=(e,t,n)=>{let r=t.parentNode;r&&r.replaceChild(e,t);let i=n;for(;i;)i.vnode.el===t&&(i.vnode.el=i.subTree.el=e),i=i.parent;},y=e=>1===e.nodeType&&"TEMPLATE"===e.tagName;return [(e,t)=>{if(!t.hasChildNodes()){n(null,e,t),na(),t._vnode=e;return}u(t.firstChild,e,null,null,null),na(),t._vnode=e;},u]}let nG="data-allow-mismatch",nX={0:"text",1:"children",2:"class",3:"style",4:"attribute"};function nQ(e,t){if(0===t||1===t)for(;e&&!e.hasAttribute(nG);)e=e.parentElement;let n=e&&e.getAttribute(nG);if(null==n)return !1;if(""===n)return !0;{let e=n.split(",");return !!(0===t&&e.includes("children"))||n.split(",").includes(nX[t])}}let nZ=e=>!!e.type.__asyncLoader;function nY(e,t){let{ref:n,props:r,children:i,ce:l}=t.vnode,s=iM(e,r,i);return s.ref=n,s.ce=l,delete t.vnode.ce,s}let n0=e=>e.type.__isKeepAlive;function n1(e,t){return A(e)?e.some(e=>n1(e,t)):M(e)?e.split(",").includes(t):!!O(e)&&(e.lastIndex=0,e.test(t))}function n2(e,t){n3(e,"a",t);}function n6(e,t){n3(e,"da",t);}function n3(e,t,n=iW){let r=e.__wdc||(e.__wdc=()=>{let t=n;for(;t;){if(t.isDeactivated)return;t=t.parent;}return e()});if(n5(t,r,n),n){let e=n.parent;for(;e&&e.parent;)n0(e.parent.vnode)&&function(e,t,n,r){let i=n5(t,e,r,!0);ri(()=>{T(r[t],i);},n);}(r,t,n,e),e=e.parent;}}function n4(e){e.shapeFlag&=-257,e.shapeFlag&=-513;}function n8(e){return 128&e.shapeFlag?e.ssContent:e}function n5(e,t,n=iW,r=!1){if(n){let i=n[e]||(n[e]=[]),l=t.__weh||(t.__weh=(...r)=>{eL();let i=iz(n),l=t3(t,n,e,r);return i(),e$(),l});return r?i.unshift(l):i.push(l),l}}let n9=e=>(t,n=iW)=>{iX&&"sp"!==e||n5(e,(...e)=>t(...e),n);},n7=n9("bm"),re=n9("m"),rt=n9("bu"),rn=n9("u"),rr=n9("bum"),ri=n9("um"),rl=n9("sp"),rs=n9("rtg"),ro=n9("rtc");function ra(e,t=iW){n5("ec",e,t);}let rc="components",ru=Symbol.for("v-ndc");function rd(e,t,n=!0,r=!1){let i=nu||iW;if(i){let n=i.type;if(e===rc){let e=i6(n,!1);if(e&&(e===t||e===z(t)||e===X(z(t))))return n}let l=rh(i[e]||n[e],t)||rh(i.appContext[e],t);return !l&&r?n:l}}function rh(e,t){return e&&(e[t]||e[z(t)]||e[X(z(t))])}let rf=e=>e?iG(e)?i2(e):rf(e.parent):null,rp=/* @__PURE__ */k(/* @__PURE__ */Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>rf(e.parent),$root:e=>rf(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>rx(e),$forceUpdate:e=>e.f||(e.f=()=>{ni(e.update);}),$nextTick:e=>e.n||(e.n=nr.bind(e.proxy)),$watch:e=>r9.bind(e)}),rm=(e,t)=>e!==y&&!e.__isScriptSetup&&w(e,t),rg={get({_:e},t){let n,r,i;if("__v_skip"===t)return !0;let{ctx:l,setupState:s,data:o,props:a,accessCache:c,type:u,appContext:d}=e;if("$"!==t[0]){let r=c[t];if(void 0!==r)switch(r){case 1:return s[t];case 2:return o[t];case 4:return l[t];case 3:return a[t]}else {if(rm(s,t))return c[t]=1,s[t];if(o!==y&&w(o,t))return c[t]=2,o[t];if((n=e.propsOptions[0])&&w(n,t))return c[t]=3,a[t];if(l!==y&&w(l,t))return c[t]=4,l[t];r_&&(c[t]=0);}}let h=rp[t];return h?("$attrs"===t&&eW(e.attrs,"get",""),h(e)):(r=u.__cssModules)&&(r=r[t])?r:l!==y&&w(l,t)?(c[t]=4,l[t]):w(i=d.config.globalProperties,t)?i[t]:void 0},set({_:e},t,n){let{data:r,setupState:i,ctx:l}=e;return rm(i,t)?(i[t]=n,!0):r!==y&&w(r,t)?(r[t]=n,!0):!w(e.props,t)&&!("$"===t[0]&&t.slice(1) in e)&&(l[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:i,propsOptions:l}},s){let o;return !!n[s]||e!==y&&w(e,s)||rm(t,s)||(o=l[0])&&w(o,s)||w(r,s)||w(rp,s)||w(i.config.globalProperties,s)},defineProperty(e,t,n){return null!=n.get?e._.accessCache[t]=0:w(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}},ry=/* @__PURE__ */k({},rg,{get(e,t){if(t!==Symbol.unscopables)return rg.get(e,t,e)},has:(e,t)=>"_"!==t[0]&&!ei(t)});function rv(){let e=iK();return e.setupContext||(e.setupContext=i1(e))}function rb(e){return A(e)?e.reduce((e,t)=>(e[t]=null,e),{}):e}let r_=!0;function rS(e,t,n){t3(A(e)?e.map(e=>e.bind(t.proxy)):e.bind(t.proxy),t,n);}function rx(e){let t;let n=e.type,{mixins:r,extends:i}=n,{mixins:l,optionsCache:s,config:{optionMergeStrategies:o}}=e.appContext,a=s.get(n);return a?t=a:l.length||r||i?(t={},l.length&&l.forEach(e=>rC(t,e,o,!0)),rC(t,n,o)):t=n,$(n)&&s.set(n,t),t}function rC(e,t,n,r=!1){let{mixins:i,extends:l}=t;for(let s in l&&rC(e,l,n,!0),i&&i.forEach(t=>rC(e,t,n,!0)),t)if(r&&"expose"===s);else {let r=rk[s]||n&&n[s];e[s]=r?r(e[s],t[s]):t[s];}return e}let rk={data:rT,props:rE,emits:rE,methods:rA,computed:rA,beforeCreate:rw,created:rw,beforeMount:rw,mounted:rw,beforeUpdate:rw,updated:rw,beforeDestroy:rw,beforeUnmount:rw,destroyed:rw,unmounted:rw,activated:rw,deactivated:rw,errorCaptured:rw,serverPrefetch:rw,components:rA,directives:rA,watch:function(e,t){if(!e)return t;if(!t)return e;let n=k(/* @__PURE__ */Object.create(null),e);for(let r in t)n[r]=rw(e[r],t[r]);return n},provide:rT,inject:function(e,t){return rA(rN(e),rN(t))}};function rT(e,t){return t?e?function(){return k(P(e)?e.call(this,this):e,P(t)?t.call(this,this):t)}:t:e}function rN(e){if(A(e)){let t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function rw(e,t){return e?[...new Set([].concat(e,t))]:t}function rA(e,t){return e?k(/* @__PURE__ */Object.create(null),e,t):t}function rE(e,t){return e?A(e)&&A(t)?[.../* @__PURE__ */new Set([...e,...t])]:k(/* @__PURE__ */Object.create(null),rb(e),rb(null!=t?t:{})):t}function rI(){return {app:null,config:{isNativeTag:S,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:/* @__PURE__ */Object.create(null),optionsCache:/* @__PURE__ */new WeakMap,propsCache:/* @__PURE__ */new WeakMap,emitsCache:/* @__PURE__ */new WeakMap}}let rR=0,rO=null;function rP(e,t){if(iW){let n=iW.provides,r=iW.parent&&iW.parent.provides;r===n&&(n=iW.provides=Object.create(r)),n[e]=t;}}function rM(e,t,n=!1){let r=iW||nu;if(r||rO){let i=rO?rO._context.provides:r?null==r.parent?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(i&&e in i)return i[e];if(arguments.length>1)return n&&P(t)?t.call(r&&r.proxy):t}}let rL={},r$=()=>Object.create(rL),rD=e=>Object.getPrototypeOf(e)===rL;function rF(e,t,n,r){let i;let[l,s]=e.propsOptions,o=!1;if(t)for(let a in t){let c;if(H(a))continue;let u=t[a];l&&w(l,c=z(a))?s&&s.includes(c)?(i||(i={}))[c]=u:n[c]=u:ir(e.emitsOptions,a)||a in r&&u===r[a]||(r[a]=u,o=!0);}if(s){let t=tL(n),r=i||y;for(let i=0;i<s.length;i++){let o=s[i];n[o]=rV(l,t,o,r[o],e,!w(r,o));}}return o}function rV(e,t,n,r,i,l){let s=e[n];if(null!=s){let e=w(s,"default");if(e&&void 0===r){let e=s.default;if(s.type!==Function&&!s.skipFactory&&P(e)){let{propsDefaults:l}=i;if(n in l)r=l[n];else {let s=iz(i);r=l[n]=e.call(null,t),s();}}else r=e;i.ce&&i.ce._setProp(n,r);}s[0]&&(l&&!e?r=!1:s[1]&&(""===r||r===G(n))&&(r=!0));}return r}let rB=/* @__PURE__ */new WeakMap;function rU(e){return !("$"===e[0]||H(e))}let rj=e=>"_"===e[0]||"$stable"===e,rH=e=>A(e)?e.map(iF):[iF(e)],rq=(e,t,n)=>{if(t._n)return t;let r=nf((...e)=>rH(t(...e)),n);return r._c=!1,r},rW=(e,t,n)=>{let r=e._ctx;for(let n in e){if(rj(n))continue;let i=e[n];if(P(i))t[n]=rq(n,i,r);else if(null!=i){let e=rH(i);t[n]=()=>e;}}},rK=(e,t)=>{let n=rH(t);e.slots.default=()=>n;},rz=(e,t,n)=>{for(let r in t)(n||"_"!==r)&&(e[r]=t[r]);},rJ=(e,t,n)=>{let r=e.slots=r$();if(32&e.vnode.shapeFlag){let e=t._;e?(rz(r,t,n),n&&ee(r,"_",e,!0)):rW(t,r);}else t&&rK(e,t);},rG=(e,t,n)=>{let{vnode:r,slots:i}=e,l=!0,s=y;if(32&r.shapeFlag){let e=t._;e?n&&1===e?l=!1:rz(i,t,n):(l=!t.$stable,rW(t,i)),s=t;}else t&&(rK(e,t),s={default:1});if(l)for(let e in i)rj(e)||null!=s[e]||delete i[e];},rX=im;function rQ(e){return rZ(e,nJ)}function rZ(e,t){var n;let r,i;er().__VUE__=!0;let{insert:l,remove:s,patchProp:o,createElement:a,createText:u,createComment:d,setText:h,setElementText:f,parentNode:p,nextSibling:m,setScopeId:g=_,insertStaticContent:S}=e,x=(e,t,n,r=null,i=null,l=null,s,o=null,a=!!t.dynamicChildren)=>{if(e===t)return;e&&!iI(e,t)&&(r=eo(e),et(e,i,l,!0),e=null),-2===t.patchFlag&&(a=!1,t.dynamicChildren=null);let{type:c,ref:u,shapeFlag:d}=t;switch(c){case iv:C(e,t,n,r);break;case ib:T(e,t,n,r);break;case i_:null==e&&N(t,n,r,s);break;case iy:U(e,t,n,r,i,l,s,o,a);break;default:1&d?R(e,t,n,r,i,l,s,o,a):6&d?j(e,t,n,r,i,l,s,o,a):64&d?c.process(e,t,n,r,i,l,s,o,a,eu):128&d&&c.process(e,t,n,r,i,l,s,o,a,eu);}null!=u&&i&&nU(u,e&&e.ref,l,t||e,!t);},C=(e,t,n,r)=>{if(null==e)l(t.el=u(t.children),n,r);else {let n=t.el=e.el;t.children!==e.children&&h(n,t.children);}},T=(e,t,n,r)=>{null==e?l(t.el=d(t.children||""),n,r):t.el=e.el;},N=(e,t,n,r)=>{[e.el,e.anchor]=S(e.children,t,n,r,e.el,e.anchor);},E=({el:e,anchor:t},n,r)=>{let i;for(;e&&e!==t;)i=m(e),l(e,n,r),e=i;l(t,n,r);},I=({el:e,anchor:t})=>{let n;for(;e&&e!==t;)n=m(e),s(e),e=n;s(t);},R=(e,t,n,r,i,l,s,o,a)=>{"svg"===t.type?s="svg":"math"===t.type&&(s="mathml"),null==e?O(t,n,r,i,l,s,o,a):F(e,t,i,l,s,o,a);},O=(e,t,n,r,i,s,c,u)=>{let d,h;let{props:p,shapeFlag:m,transition:g,dirs:y}=e;if(d=e.el=a(e.type,s,p&&p.is,p),8&m?f(d,e.children):16&m&&L(e.children,d,null,r,i,rY(e,s),c,u),y&&np(e,null,r,"created"),M(d,e,e.scopeId,c,r),p){for(let e in p)"value"===e||H(e)||o(d,e,null,p[e],s,r);"value"in p&&o(d,"value",null,p.value,s),(h=p.onVnodeBeforeMount)&&ij(h,r,e);}y&&np(e,null,r,"beforeMount");let b=r1(i,g);b&&g.beforeEnter(d),l(d,t,n),((h=p&&p.onVnodeMounted)||b||y)&&rX(()=>{h&&ij(h,r,e),b&&g.enter(d),y&&np(e,null,r,"mounted");},i);},M=(e,t,n,r,i)=>{if(n&&g(e,n),r)for(let t=0;t<r.length;t++)g(e,r[t]);if(i){let n=i.subTree;if(t===n||ic(n.type)&&(n.ssContent===t||n.ssFallback===t)){let t=i.vnode;M(e,t,t.scopeId,t.slotScopeIds,i.parent);}}},L=(e,t,n,r,i,l,s,o,a=0)=>{for(let c=a;c<e.length;c++)x(null,e[c]=o?iV(e[c]):iF(e[c]),t,n,r,i,l,s,o);},F=(e,t,n,r,i,l,s)=>{let a;let c=t.el=e.el,{patchFlag:u,dynamicChildren:d,dirs:h}=t;u|=16&e.patchFlag;let p=e.props||y,m=t.props||y;if(n&&r0(n,!1),(a=m.onVnodeBeforeUpdate)&&ij(a,n,t,e),h&&np(t,e,n,"beforeUpdate"),n&&r0(n,!0),(p.innerHTML&&null==m.innerHTML||p.textContent&&null==m.textContent)&&f(c,""),d?V(e.dynamicChildren,d,c,n,r,rY(t,i),l):s||X(e,t,c,null,n,r,rY(t,i),l,!1),u>0){if(16&u)B(c,p,m,n,i);else if(2&u&&p.class!==m.class&&o(c,"class",null,m.class,i),4&u&&o(c,"style",p.style,m.style,i),8&u){let e=t.dynamicProps;for(let t=0;t<e.length;t++){let r=e[t],l=p[r],s=m[r];(s!==l||"value"===r)&&o(c,r,l,s,i,n);}}1&u&&e.children!==t.children&&f(c,t.children);}else s||null!=d||B(c,p,m,n,i);((a=m.onVnodeUpdated)||h)&&rX(()=>{a&&ij(a,n,t,e),h&&np(t,e,n,"updated");},r);},V=(e,t,n,r,i,l,s)=>{for(let o=0;o<t.length;o++){let a=e[o],c=t[o],u=a.el&&(a.type===iy||!iI(a,c)||70&a.shapeFlag)?p(a.el):n;x(a,c,u,null,r,i,l,s,!0);}},B=(e,t,n,r,i)=>{if(t!==n){if(t!==y)for(let l in t)H(l)||l in n||o(e,l,t[l],null,i,r);for(let l in n){if(H(l))continue;let s=n[l],a=t[l];s!==a&&"value"!==l&&o(e,l,a,s,i,r);}"value"in n&&o(e,"value",t.value,n.value,i);}},U=(e,t,n,r,i,s,o,a,c)=>{let d=t.el=e?e.el:u(""),h=t.anchor=e?e.anchor:u(""),{patchFlag:f,dynamicChildren:p,slotScopeIds:m}=t;m&&(a=a?a.concat(m):m),null==e?(l(d,n,r),l(h,n,r),L(t.children||[],n,h,i,s,o,a,c)):f>0&&64&f&&p&&e.dynamicChildren?(V(e.dynamicChildren,p,n,i,s,o,a),(null!=t.key||i&&t===i.subTree)&&r2(e,t,!0)):X(e,t,n,h,i,s,o,a,c);},j=(e,t,n,r,i,l,s,o,a)=>{t.slotScopeIds=o,null==e?512&t.shapeFlag?i.ctx.activate(t,n,r,s,a):q(t,n,r,i,l,s,a):W(e,t,a);},q=(e,t,n,r,i,l,s)=>{let o=e.component=function(e,t,n){let r=e.type,i=(t?t.appContext:e.appContext)||iH,l={uid:iq++,vnode:e,type:r,parent:t,appContext:i,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new ex(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(i.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:function e(t,n,r=!1){let i=r?rB:n.propsCache,l=i.get(t);if(l)return l;let s=t.props,o={},a=[],c=!1;if(!P(t)){let i=t=>{c=!0;let[r,i]=e(t,n,!0);k(o,r),i&&a.push(...i);};!r&&n.mixins.length&&n.mixins.forEach(i),t.extends&&i(t.extends),t.mixins&&t.mixins.forEach(i);}if(!s&&!c)return $(t)&&i.set(t,b),b;if(A(s))for(let e=0;e<s.length;e++){let t=z(s[e]);rU(t)&&(o[t]=y);}else if(s)for(let e in s){let t=z(e);if(rU(t)){let n=s[e],r=o[t]=A(n)||P(n)?{type:n}:k({},n),i=r.type,l=!1,c=!0;if(A(i))for(let e=0;e<i.length;++e){let t=i[e],n=P(t)&&t.name;if("Boolean"===n){l=!0;break}"String"===n&&(c=!1);}else l=P(i)&&"Boolean"===i.name;r[0]=l,r[1]=c,(l||w(r,"default"))&&a.push(t);}}let u=[o,a];return $(t)&&i.set(t,u),u}(r,i),emitsOptions:function e(t,n,r=!1){let i=n.emitsCache,l=i.get(t);if(void 0!==l)return l;let s=t.emits,o={},a=!1;if(!P(t)){let i=t=>{let r=e(t,n,!0);r&&(a=!0,k(o,r));};!r&&n.mixins.length&&n.mixins.forEach(i),t.extends&&i(t.extends),t.mixins&&t.mixins.forEach(i);}return s||a?(A(s)?s.forEach(e=>o[e]=null):k(o,s),$(t)&&i.set(t,o),o):($(t)&&i.set(t,null),null)}(r,i),emit:null,emitted:null,propsDefaults:y,inheritAttrs:r.inheritAttrs,ctx:y,data:y,props:y,attrs:y,slots:y,refs:y,setupState:y,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return l.ctx={_:l},l.root=t?t.root:l,l.emit=it.bind(null,l),e.ce&&e.ce(l),l}(e,r,i);n0(e)&&(o.ctx.renderer=eu),function(e,t=!1,n=!1){t&&c(t);let{props:r,children:i}=e.vnode,l=iG(e);(function(e,t,n,r=!1){let i={},l=r$();for(let n in e.propsDefaults=/* @__PURE__ */Object.create(null),rF(e,t,i,l),e.propsOptions[0])n in i||(i[n]=void 0);n?e.props=r?i:tA(i):e.type.props?e.props=i:e.props=l,e.attrs=l;})(e,r,l,t),rJ(e,i,n),l&&function(e,t){let n=e.type;e.accessCache=/* @__PURE__ */Object.create(null),e.proxy=new Proxy(e.ctx,rg);let{setup:r}=n;if(r){let n=e.setupContext=r.length>1?i1(e):null,i=iz(e);eL();let l=t6(r,e,0,[e.props,n]);if(e$(),i(),D(l)){if(nZ(e)||nB(e),l.then(iJ,iJ),t)return l.then(n=>{iQ(e,n,t);}).catch(t=>{t4(t,e,0);});e.asyncDep=l;}else iQ(e,l,t);}else iY(e,t);}(e,t),t&&c(!1);}(o,!1,s),o.asyncDep?(i&&i.registerDep(o,K,s),e.el||T(null,o.subTree=iM(ib),t,n)):K(o,e,t,n,i,l,s);},W=(e,t,n)=>{let r=t.component=e.component;if(function(e,t,n){let{props:r,children:i,component:l}=e,{props:s,children:o,patchFlag:a}=t,c=l.emitsOptions;if(t.dirs||t.transition)return !0;if(!n||!(a>=0))return (!!i||!!o)&&(!o||!o.$stable)||r!==s&&(r?!s||io(r,s,c):!!s);if(1024&a)return !0;if(16&a)return r?io(r,s,c):!!s;if(8&a){let e=t.dynamicProps;for(let t=0;t<e.length;t++){let n=e[t];if(s[n]!==r[n]&&!ir(c,n))return !0}}return !1}(e,t,n)){if(r.asyncDep&&!r.asyncResolved){J(r,t,n);return}r.next=t,r.update();}else t.el=e.el,r.vnode=t;},K=(e,t,n,r,l,s,o)=>{let a=()=>{if(e.isMounted){let t,{next:n,bu:r,u:i,parent:c,vnode:u}=e;{let t=function e(t){let n=t.subTree.component;if(n)return n.asyncDep&&!n.asyncResolved?n:e(n)}(e);if(t){n&&(n.el=u.el,J(e,n,o)),t.asyncDep.then(()=>{e.isUnmounted||a();});return}}let d=n;r0(e,!1),n?(n.el=u.el,J(e,n,o)):n=u,r&&Y(r),(t=n.props&&n.props.onVnodeBeforeUpdate)&&ij(t,c,n,u),r0(e,!0);let h=ii(e),f=e.subTree;e.subTree=h,x(f,h,p(f.el),eo(f),e,l,s),n.el=h.el,null===d&&ia(e,h.el),i&&rX(i,l),(t=n.props&&n.props.onVnodeUpdated)&&rX(()=>ij(t,c,n,u),l);}else {let o;let{el:a,props:c}=t,{bm:u,m:d,parent:h,root:f,type:p}=e,m=nZ(t);if(r0(e,!1),u&&Y(u),!m&&(o=c&&c.onVnodeBeforeMount)&&ij(o,h,t),r0(e,!0),a&&i){let t=()=>{e.subTree=ii(e),i(a,e.subTree,e,l,null);};m&&p.__asyncHydrate?p.__asyncHydrate(a,e,t):t();}else {f.ce&&f.ce._injectChildStyle(p);let i=e.subTree=ii(e);x(null,i,n,r,e,l,s),t.el=i.el;}if(d&&rX(d,l),!m&&(o=c&&c.onVnodeMounted)){let e=t;rX(()=>ij(o,h,e),l);}(256&t.shapeFlag||h&&nZ(h.vnode)&&256&h.vnode.shapeFlag)&&e.a&&rX(e.a,l),e.isMounted=!0,t=n=r=null;}};e.scope.on();let c=e.effect=new ek(a);e.scope.off();let u=e.update=c.run.bind(c),d=e.job=c.runIfDirty.bind(c);d.i=e,d.id=e.uid,c.scheduler=()=>ni(d),r0(e,!0),u();},J=(e,t,n)=>{t.component=e;let r=e.vnode.props;e.vnode=t,e.next=null,function(e,t,n,r){let{props:i,attrs:l,vnode:{patchFlag:s}}=e,o=tL(i),[a]=e.propsOptions,c=!1;if((r||s>0)&&!(16&s)){if(8&s){let n=e.vnode.dynamicProps;for(let r=0;r<n.length;r++){let s=n[r];if(ir(e.emitsOptions,s))continue;let u=t[s];if(a){if(w(l,s))u!==l[s]&&(l[s]=u,c=!0);else {let t=z(s);i[t]=rV(a,o,t,u,e,!1);}}else u!==l[s]&&(l[s]=u,c=!0);}}}else {let r;for(let s in rF(e,t,i,l)&&(c=!0),o)t&&(w(t,s)||(r=G(s))!==s&&w(t,r))||(a?n&&(void 0!==n[s]||void 0!==n[r])&&(i[s]=rV(a,o,s,void 0,e,!0)):delete i[s]);if(l!==o)for(let e in l)t&&w(t,e)||(delete l[e],c=!0);}c&&eK(e.attrs,"set","");}(e,t.props,r,n),rG(e,t.children,n),eL(),no(e),e$();},X=(e,t,n,r,i,l,s,o,a=!1)=>{let c=e&&e.children,u=e?e.shapeFlag:0,d=t.children,{patchFlag:h,shapeFlag:p}=t;if(h>0){if(128&h){Z(c,d,n,r,i,l,s,o,a);return}if(256&h){Q(c,d,n,r,i,l,s,o,a);return}}8&p?(16&u&&es(c,i,l),d!==c&&f(n,d)):16&u?16&p?Z(c,d,n,r,i,l,s,o,a):es(c,i,l,!0):(8&u&&f(n,""),16&p&&L(d,n,r,i,l,s,o,a));},Q=(e,t,n,r,i,l,s,o,a)=>{let c;e=e||b,t=t||b;let u=e.length,d=t.length,h=Math.min(u,d);for(c=0;c<h;c++){let r=t[c]=a?iV(t[c]):iF(t[c]);x(e[c],r,n,null,i,l,s,o,a);}u>d?es(e,i,l,!0,!1,h):L(t,n,r,i,l,s,o,a,h);},Z=(e,t,n,r,i,l,s,o,a)=>{let c=0,u=t.length,d=e.length-1,h=u-1;for(;c<=d&&c<=h;){let r=e[c],u=t[c]=a?iV(t[c]):iF(t[c]);if(iI(r,u))x(r,u,n,null,i,l,s,o,a);else break;c++;}for(;c<=d&&c<=h;){let r=e[d],c=t[h]=a?iV(t[h]):iF(t[h]);if(iI(r,c))x(r,c,n,null,i,l,s,o,a);else break;d--,h--;}if(c>d){if(c<=h){let e=h+1,d=e<u?t[e].el:r;for(;c<=h;)x(null,t[c]=a?iV(t[c]):iF(t[c]),n,d,i,l,s,o,a),c++;}}else if(c>h)for(;c<=d;)et(e[c],i,l,!0),c++;else {let f;let p=c,m=c,g=/* @__PURE__ */new Map;for(c=m;c<=h;c++){let e=t[c]=a?iV(t[c]):iF(t[c]);null!=e.key&&g.set(e.key,c);}let y=0,_=h-m+1,S=!1,C=0,k=Array(_);for(c=0;c<_;c++)k[c]=0;for(c=p;c<=d;c++){let r;let u=e[c];if(y>=_){et(u,i,l,!0);continue}if(null!=u.key)r=g.get(u.key);else for(f=m;f<=h;f++)if(0===k[f-m]&&iI(u,t[f])){r=f;break}void 0===r?et(u,i,l,!0):(k[r-m]=c+1,r>=C?C=r:S=!0,x(u,t[r],n,null,i,l,s,o,a),y++);}let T=S?function(e){let t,n,r,i,l;let s=e.slice(),o=[0],a=e.length;for(t=0;t<a;t++){let a=e[t];if(0!==a){if(e[n=o[o.length-1]]<a){s[t]=n,o.push(t);continue}for(r=0,i=o.length-1;r<i;)e[o[l=r+i>>1]]<a?r=l+1:i=l;a<e[o[r]]&&(r>0&&(s[t]=o[r-1]),o[r]=t);}}for(r=o.length,i=o[r-1];r-- >0;)o[r]=i,i=s[i];return o}(k):b;for(f=T.length-1,c=_-1;c>=0;c--){let e=m+c,d=t[e],h=e+1<u?t[e+1].el:r;0===k[c]?x(null,d,n,h,i,l,s,o,a):S&&(f<0||c!==T[f]?ee(d,n,h,2):f--);}}},ee=(e,t,n,r,i=null)=>{let{el:s,type:o,transition:a,children:c,shapeFlag:u}=e;if(6&u){ee(e.component.subTree,t,n,r);return}if(128&u){e.suspense.move(t,n,r);return}if(64&u){o.move(e,t,n,eu);return}if(o===iy){l(s,t,n);for(let e=0;e<c.length;e++)ee(c[e],t,n,r);l(e.anchor,t,n);return}if(o===i_){E(e,t,n);return}if(2!==r&&1&u&&a){if(0===r)a.beforeEnter(s),l(s,t,n),rX(()=>a.enter(s),i);else {let{leave:e,delayLeave:r,afterLeave:i}=a,o=()=>l(s,t,n),c=()=>{e(s,()=>{o(),i&&i();});};r?r(s,o,c):c();}}else l(s,t,n);},et=(e,t,n,r=!1,i=!1)=>{let l;let{type:s,props:o,ref:a,children:c,dynamicChildren:u,shapeFlag:d,patchFlag:h,dirs:f,cacheIndex:p}=e;if(-2===h&&(i=!1),null!=a&&nU(a,null,n,e,!0),null!=p&&(t.renderCache[p]=void 0),256&d){t.ctx.deactivate(e);return}let m=1&d&&f,g=!nZ(e);if(g&&(l=o&&o.onVnodeBeforeUnmount)&&ij(l,t,e),6&d)el(e.component,n,r);else {if(128&d){e.suspense.unmount(n,r);return}m&&np(e,null,t,"beforeUnmount"),64&d?e.type.remove(e,t,n,eu,r):u&&!u.hasOnce&&(s!==iy||h>0&&64&h)?es(u,t,n,!1,!0):(s===iy&&384&h||!i&&16&d)&&es(c,t,n),r&&en(e);}(g&&(l=o&&o.onVnodeUnmounted)||m)&&rX(()=>{l&&ij(l,t,e),m&&np(e,null,t,"unmounted");},n);},en=e=>{let{type:t,el:n,anchor:r,transition:i}=e;if(t===iy){ei(n,r);return}if(t===i_){I(e);return}let l=()=>{s(n),i&&!i.persisted&&i.afterLeave&&i.afterLeave();};if(1&e.shapeFlag&&i&&!i.persisted){let{leave:t,delayLeave:r}=i,s=()=>t(n,l);r?r(e.el,l,s):s();}else l();},ei=(e,t)=>{let n;for(;e!==t;)n=m(e),s(e),e=n;s(t);},el=(e,t,n)=>{let{bum:r,scope:i,job:l,subTree:s,um:o,m:a,a:c}=e;r6(a),r6(c),r&&Y(r),i.stop(),l&&(l.flags|=8,et(s,e,t,n)),o&&rX(o,t),rX(()=>{e.isUnmounted=!0;},t),t&&t.pendingBranch&&!t.isUnmounted&&e.asyncDep&&!e.asyncResolved&&e.suspenseId===t.pendingId&&(t.deps--,0===t.deps&&t.resolve());},es=(e,t,n,r=!1,i=!1,l=0)=>{for(let s=l;s<e.length;s++)et(e[s],t,n,r,i);},eo=e=>{if(6&e.shapeFlag)return eo(e.component.subTree);if(128&e.shapeFlag)return e.suspense.next();let t=m(e.anchor||e.el),n=t&&t[nm];return n?m(n):t},ea=!1,ec=(e,t,n)=>{null==e?t._vnode&&et(t._vnode,null,null,!0):x(t._vnode||null,e,t,null,null,null,n),t._vnode=e,ea||(ea=!0,no(),na(),ea=!1);},eu={p:x,um:et,m:ee,r:en,mt:q,mc:L,pc:X,pbc:V,n:eo,o:e};return t&&([r,i]=t(eu)),{render:ec,hydrate:r,createApp:(n=r,function(e,t=null){P(e)||(e=k({},e)),null==t||$(t)||(t=null);let r=rI(),i=/* @__PURE__ */new WeakSet,l=[],s=!1,o=r.app={_uid:rR++,_component:e,_props:t,_container:null,_context:r,_instance:null,version:i5,get config(){return r.config},set config(v){},use:(e,...t)=>(i.has(e)||(e&&P(e.install)?(i.add(e),e.install(o,...t)):P(e)&&(i.add(e),e(o,...t))),o),mixin:e=>(r.mixins.includes(e)||r.mixins.push(e),o),component:(e,t)=>t?(r.components[e]=t,o):r.components[e],directive:(e,t)=>t?(r.directives[e]=t,o):r.directives[e],mount(i,l,a){if(!s){let c=o._ceVNode||iM(e,t);return c.appContext=r,!0===a?a="svg":!1===a&&(a=void 0),l&&n?n(c,i):ec(c,i,a),s=!0,o._container=i,i.__vue_app__=o,i2(c.component)}},onUnmount(e){l.push(e);},unmount(){s&&(t3(l,o._instance,16),ec(null,o._container),delete o._container.__vue_app__);},provide:(e,t)=>(r.provides[e]=t,o),runWithContext(e){let t=rO;rO=o;try{return e()}finally{rO=t;}}};return o})}}function rY({type:e,props:t},n){return "svg"===n&&"foreignObject"===e||"mathml"===n&&"annotation-xml"===e&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function r0({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5);}function r1(e,t){return (!e||e&&!e.pendingBranch)&&t&&!t.persisted}function r2(e,t,n=!1){let r=e.children,i=t.children;if(A(r)&&A(i))for(let e=0;e<r.length;e++){let t=r[e],l=i[e];!(1&l.shapeFlag)||l.dynamicChildren||((l.patchFlag<=0||32===l.patchFlag)&&((l=i[e]=iV(i[e])).el=t.el),n||-2===l.patchFlag||r2(t,l)),l.type===iv&&(l.el=t.el);}}function r6(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8;}let r3=Symbol.for("v-scx");function r4(e,t){return r5(e,null,{flush:"post"})}function r8(e,t){return r5(e,null,{flush:"sync"})}function r5(e,t,n=y){let{immediate:r,deep:l,flush:s,once:o}=n,a=k({},n),c=iW;a.call=(e,t,n)=>t3(e,c,t,n);let u=!1;return "post"===s?a.scheduler=e=>{rX(e,c&&c.suspense);}:"sync"!==s&&(u=!0,a.scheduler=(e,t)=>{t?e():ni(e);}),a.augmentJob=e=>{t&&(e.flags|=4),u&&(e.flags|=2,c&&(e.id=c.uid,e.i=c));},function(e,t,n=y){let r,l,s,o;let{immediate:a,deep:c,once:u,scheduler:d,augmentJob:h,call:f}=n,m=e=>c?e:tP(e)||!1===c||0===c?t2(e,1):t2(e),g=!1,b=!1;if(tV(e)?(l=()=>e.value,g=tP(e)):tR(e)?(l=()=>m(e),g=!0):A(e)?(b=!0,g=e.some(e=>tR(e)||tP(e)),l=()=>e.map(e=>tV(e)?e.value:tR(e)?m(e):P(e)?f?f(e,2):e():void 0)):l=P(e)?t?f?()=>f(e,2):e:()=>{if(s){eL();try{s();}finally{e$();}}let t=p;p=r;try{return f?f(e,3,[o]):e(o)}finally{p=t;}}:_,t&&c){let e=l,t=!0===c?1/0:c;l=()=>t2(e(),t);}let S=i,x=()=>{r.stop(),S&&T(S.effects,r);};if(u&&t){let e=t;t=(...t)=>{e(...t),x();};}let C=b?Array(e.length).fill(tY):tY,k=e=>{if(1&r.flags&&(r.dirty||e)){if(t){let e=r.run();if(c||g||(b?e.some((e,t)=>Z(e,C[t])):Z(e,C))){s&&s();let n=p;p=r;try{let n=[e,C===tY?void 0:b&&C[0]===tY?[]:C,o];f?f(t,3,n):t(...n),C=e;}finally{p=n;}}}else r.run();}};return h&&h(k),(r=new ek(l)).scheduler=d?()=>d(k,!1):k,o=e=>t1(e,!1,r),s=r.onStop=()=>{let e=t0.get(r);if(e){if(f)f(e,4);else for(let t of e)t();t0.delete(r);}},t?a?k(!0):C=r.run():d?d(k.bind(null,!0),!0):r.run(),x.pause=r.pause.bind(r),x.resume=r.resume.bind(r),x.stop=x,x}(e,t,a)}function r9(e,t,n){let r;let i=this.proxy,l=M(e)?e.includes(".")?r7(i,e):()=>i[e]:e.bind(i,i);P(t)?r=t:(r=t.handler,n=t);let s=iz(this),o=r5(l,r.bind(i),n);return s(),o}function r7(e,t){let n=t.split(".");return ()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}let ie=(e,t)=>"modelValue"===t||"model-value"===t?e.modelModifiers:e[`${t}Modifiers`]||e[`${z(t)}Modifiers`]||e[`${G(t)}Modifiers`];function it(e,t,...n){let r;if(e.isUnmounted)return;let i=e.vnode.props||y,l=n,s=t.startsWith("update:"),o=s&&ie(i,t.slice(7));o&&(o.trim&&(l=n.map(e=>M(e)?e.trim():e)),o.number&&(l=n.map(et)));let a=i[r=Q(t)]||i[r=Q(z(t))];!a&&s&&(a=i[r=Q(G(t))]),a&&t3(a,e,6,l);let c=i[r+"Once"];if(c){if(e.emitted){if(e.emitted[r])return}else e.emitted={};e.emitted[r]=!0,t3(c,e,6,l);}}function ir(e,t){return !!(e&&x(t))&&(w(e,(t=t.slice(2).replace(/Once$/,""))[0].toLowerCase()+t.slice(1))||w(e,G(t))||w(e,t))}function ii(e){let t,n;let{type:r,vnode:i,proxy:l,withProxy:s,propsOptions:[o],slots:a,attrs:c,emit:u,render:d,renderCache:h,props:f,data:p,setupState:m,ctx:g,inheritAttrs:y}=e,b=nh(e);try{if(4&i.shapeFlag){let e=s||l;t=iF(d.call(e,e,h,f,m,p,g)),n=c;}else t=iF(r.length>1?r(f,{attrs:c,slots:a,emit:u}):r(f,null)),n=r.props?c:il(c);}catch(n){iS.length=0,t4(n,e,1),t=iM(ib);}let _=t;if(n&&!1!==y){let e=Object.keys(n),{shapeFlag:t}=_;e.length&&7&t&&(o&&e.some(C)&&(n=is(n,o)),_=i$(_,n,!1,!0));}return i.dirs&&((_=i$(_,null,!1,!0)).dirs=_.dirs?_.dirs.concat(i.dirs):i.dirs),i.transition&&nD(_,i.transition),t=_,nh(b),t}let il=e=>{let t;for(let n in e)("class"===n||"style"===n||x(n))&&((t||(t={}))[n]=e[n]);return t},is=(e,t)=>{let n={};for(let r in e)C(r)&&r.slice(9) in t||(n[r]=e[r]);return n};function io(e,t,n){let r=Object.keys(t);if(r.length!==Object.keys(e).length)return !0;for(let i=0;i<r.length;i++){let l=r[i];if(t[l]!==e[l]&&!ir(n,l))return !0}return !1}function ia({vnode:e,parent:t},n){for(;t;){let r=t.subTree;if(r.suspense&&r.suspense.activeBranch===e&&(r.el=e.el),r===e)(e=t.vnode).el=n,t=t.parent;else break}}let ic=e=>e.__isSuspense,iu=0;function id(e,t){let n=e.props&&e.props[t];P(n)&&n();}function ih(e,t,n,r,i,l,s,o,a,c,u=!1){let d;let{p:h,m:f,um:p,n:m,o:{parentNode:g,remove:y}}=c,b=function(e){let t=e.props&&e.props.suspensible;return null!=t&&!1!==t}(e);b&&t&&t.pendingBranch&&(d=t.pendingId,t.deps++);let _=e.props?en(e.props.timeout):void 0,S=l,x={vnode:e,parent:t,parentComponent:n,namespace:s,container:r,hiddenContainer:i,deps:0,pendingId:iu++,timeout:"number"==typeof _?_:-1,activeBranch:null,pendingBranch:null,isInFallback:!u,isHydrating:u,isUnmounted:!1,effects:[],resolve(e=!1,n=!1){let{vnode:r,activeBranch:i,pendingBranch:s,pendingId:o,effects:a,parentComponent:c,container:u}=x,h=!1;x.isHydrating?x.isHydrating=!1:e||((h=i&&s.transition&&"out-in"===s.transition.mode)&&(i.transition.afterLeave=()=>{o===x.pendingId&&(f(s,u,l===S?m(i):l,0),ns(a));}),i&&(g(i.el)===u&&(l=m(i)),p(i,c,x,!0)),h||f(s,u,l,0)),ig(x,s),x.pendingBranch=null,x.isInFallback=!1;let y=x.parent,_=!1;for(;y;){if(y.pendingBranch){y.effects.push(...a),_=!0;break}y=y.parent;}_||h||ns(a),x.effects=[],b&&t&&t.pendingBranch&&d===t.pendingId&&(t.deps--,0!==t.deps||n||t.resolve()),id(r,"onResolve");},fallback(e){if(!x.pendingBranch)return;let{vnode:t,activeBranch:n,parentComponent:r,container:i,namespace:l}=x;id(t,"onFallback");let s=m(n),c=()=>{x.isInFallback&&(h(null,e,i,s,r,null,l,o,a),ig(x,e));},u=e.transition&&"out-in"===e.transition.mode;u&&(n.transition.afterLeave=c),x.isInFallback=!0,p(n,r,null,!0),u||c();},move(e,t,n){x.activeBranch&&f(x.activeBranch,e,t,n),x.container=e;},next:()=>x.activeBranch&&m(x.activeBranch),registerDep(e,t,n){let r=!!x.pendingBranch;r&&x.deps++;let i=e.vnode.el;e.asyncDep.catch(t=>{t4(t,e,0);}).then(l=>{if(e.isUnmounted||x.isUnmounted||x.pendingId!==e.suspenseId)return;e.asyncResolved=!0;let{vnode:o}=e;iQ(e,l,!1),i&&(o.el=i);let a=!i&&e.subTree.el;t(e,o,g(i||e.subTree.el),i?null:m(e.subTree),x,s,n),a&&y(a),ia(e,o.el),r&&0==--x.deps&&x.resolve();});},unmount(e,t){x.isUnmounted=!0,x.activeBranch&&p(x.activeBranch,n,e,t),x.pendingBranch&&p(x.pendingBranch,n,e,t);}};return x}function ip(e){let t;if(P(e)){let n=iT&&e._c;n&&(e._d=!1,iC()),e=e(),n&&(e._d=!0,t=ix,ik());}return A(e)&&(e=function(e,t=!0){let n;for(let t=0;t<e.length;t++){let r=e[t];if(!iE(r))return;if(r.type!==ib||"v-if"===r.children){if(n)return;n=r;}}return n}(e)),e=iF(e),t&&!e.dynamicChildren&&(e.dynamicChildren=t.filter(t=>t!==e)),e}function im(e,t){t&&t.pendingBranch?A(e)?t.effects.push(...e):t.effects.push(e):ns(e);}function ig(e,t){e.activeBranch=t;let{vnode:n,parentComponent:r}=e,i=t.el;for(;!i&&t.component;)i=(t=t.component.subTree).el;n.el=i,r&&r.subTree===n&&(r.vnode.el=i,ia(r,i));}let iy=Symbol.for("v-fgt"),iv=Symbol.for("v-txt"),ib=Symbol.for("v-cmt"),i_=Symbol.for("v-stc"),iS=[],ix=null;function iC(e=!1){iS.push(ix=e?null:[]);}function ik(){iS.pop(),ix=iS[iS.length-1]||null;}let iT=1;function iN(e){iT+=e,e<0&&ix&&(ix.hasOnce=!0);}function iw(e){return e.dynamicChildren=iT>0?ix||b:null,ik(),iT>0&&ix&&ix.push(e),e}function iA(e,t,n,r,i){return iw(iM(e,t,n,r,i,!0))}function iE(e){return !!e&&!0===e.__v_isVNode}function iI(e,t){return e.type===t.type&&e.key===t.key}let iR=({key:e})=>null!=e?e:null,iO=({ref:e,ref_key:t,ref_for:n})=>("number"==typeof e&&(e=""+e),null!=e?M(e)||tV(e)||P(e)?{i:nu,r:e,k:t,f:!!n}:e:null);function iP(e,t=null,n=null,r=0,i=null,l=e===iy?0:1,s=!1,o=!1){let a={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&iR(t),ref:t&&iO(t),scopeId:nd,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:l,patchFlag:r,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:nu};return o?(iB(a,n),128&l&&e.normalize(a)):n&&(a.shapeFlag|=M(n)?8:16),iT>0&&!s&&ix&&(a.patchFlag>0||6&l)&&32!==a.patchFlag&&ix.push(a),a}let iM=function(e,t=null,n=null,r=0,i=null,l=!1){var s;if(e&&e!==ru||(e=ib),iE(e)){let r=i$(e,t,!0);return n&&iB(r,n),iT>0&&!l&&ix&&(6&r.shapeFlag?ix[ix.indexOf(e)]=r:ix.push(r)),r.patchFlag=-2,r}if(P(s=e)&&"__vccOpts"in s&&(e=e.__vccOpts),t){let{class:e,style:n}=t=iL(t);e&&!M(e)&&(t.class=eu(e)),$(n)&&(tM(n)&&!A(n)&&(n=k({},n)),t.style=el(n));}let o=M(e)?1:ic(e)?128:ng(e)?64:$(e)?4:P(e)?2:0;return iP(e,t,n,r,i,o,l,!0)};function iL(e){return e?tM(e)||rD(e)?k({},e):e:null}function i$(e,t,n=!1,r=!1){let{props:i,ref:l,patchFlag:s,children:o,transition:a}=e,c=t?iU(i||{},t):i,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:c,key:c&&iR(c),ref:t&&t.ref?n&&l?A(l)?l.concat(iO(t)):[l,iO(t)]:iO(t):l,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:o,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==iy?-1===s?16:16|s:s,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:a,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&i$(e.ssContent),ssFallback:e.ssFallback&&i$(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return a&&r&&nD(u,a.clone(u)),u}function iD(e=" ",t=0){return iM(iv,null,e,t)}function iF(e){return null==e||"boolean"==typeof e?iM(ib):A(e)?iM(iy,null,e.slice()):iE(e)?iV(e):iM(iv,null,String(e))}function iV(e){return null===e.el&&-1!==e.patchFlag||e.memo?e:i$(e)}function iB(e,t){let n=0,{shapeFlag:r}=e;if(null==t)t=null;else if(A(t))n=16;else if("object"==typeof t){if(65&r){let n=t.default;n&&(n._c&&(n._d=!1),iB(e,n()),n._c&&(n._d=!0));return}{n=32;let r=t._;r||rD(t)?3===r&&nu&&(1===nu.slots._?t._=1:(t._=2,e.patchFlag|=1024)):t._ctx=nu;}}else P(t)?(t={default:t,_ctx:nu},n=32):(t=String(t),64&r?(n=16,t=[iD(t)]):n=8);e.children=t,e.shapeFlag|=n;}function iU(...e){let t={};for(let n=0;n<e.length;n++){let r=e[n];for(let e in r)if("class"===e)t.class!==r.class&&(t.class=eu([t.class,r.class]));else if("style"===e)t.style=el([t.style,r.style]);else if(x(e)){let n=t[e],i=r[e];i&&n!==i&&!(A(n)&&n.includes(i))&&(t[e]=n?[].concat(n,i):i);}else ""!==e&&(t[e]=r[e]);}return t}function ij(e,t,n,r=null){t3(e,t,7,[n,r]);}let iH=rI(),iq=0,iW=null,iK=()=>iW||nu;a=e=>{iW=e;},c=e=>{iX=e;};let iz=e=>{let t=iW;return a(e),e.scope.on(),()=>{e.scope.off(),a(t);}},iJ=()=>{iW&&iW.scope.off(),a(null);};function iG(e){return 4&e.vnode.shapeFlag}let iX=!1;function iQ(e,t,n){P(t)?e.render=t:$(t)&&(e.setupState=tK(t)),iY(e,n);}function iZ(e){u=e,d=e=>{e.render._rc&&(e.withProxy=new Proxy(e.ctx,ry));};}function iY(e,t,n){let r=e.type;if(!e.render){if(!t&&u&&!r.render){let t=r.template||rx(e).template;if(t){let{isCustomElement:n,compilerOptions:i}=e.appContext.config,{delimiters:l,compilerOptions:s}=r,o=k(k({isCustomElement:n,delimiters:l},i),s);r.render=u(t,o);}}e.render=r.render||_,d&&d(e);}{let t=iz(e);eL();try{!function(e){let t=rx(e),n=e.proxy,r=e.ctx;r_=!1,t.beforeCreate&&rS(t.beforeCreate,e,"bc");let{data:i,computed:l,methods:s,watch:o,provide:a,inject:c,created:u,beforeMount:d,mounted:h,beforeUpdate:f,updated:p,activated:m,deactivated:g,beforeDestroy:y,beforeUnmount:b,destroyed:S,unmounted:x,render:C,renderTracked:k,renderTriggered:T,errorCaptured:N,serverPrefetch:w,expose:E,inheritAttrs:I,components:R,directives:O,filters:L}=t;if(c&&function(e,t,n=_){for(let n in A(e)&&(e=rN(e)),e){let r;let i=e[n];tV(r=$(i)?"default"in i?rM(i.from||n,i.default,!0):rM(i.from||n):rM(i))?Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:()=>r.value,set:e=>r.value=e}):t[n]=r;}}(c,r,null),s)for(let e in s){let t=s[e];P(t)&&(r[e]=t.bind(n));}if(i){let t=i.call(n,n);$(t)&&(e.data=tw(t));}if(r_=!0,l)for(let e in l){let t=l[e],i=P(t)?t.bind(n,n):P(t.get)?t.get.bind(n,n):_,s=i3({get:i,set:!P(t)&&P(t.set)?t.set.bind(n):_});Object.defineProperty(r,e,{enumerable:!0,configurable:!0,get:()=>s.value,set:e=>s.value=e});}if(o)for(let e in o)!function e(t,n,r,i){let l=i.includes(".")?r7(r,i):()=>r[i];if(M(t)){let e=n[t];P(e)&&r5(l,e,void 0);}else if(P(t)){var s;s=t.bind(r),r5(l,s,void 0);}else if($(t)){if(A(t))t.forEach(t=>e(t,n,r,i));else {let e=P(t.handler)?t.handler.bind(r):n[t.handler];P(e)&&r5(l,e,t);}}}(o[e],r,n,e);if(a){let e=P(a)?a.call(n):a;Reflect.ownKeys(e).forEach(t=>{rP(t,e[t]);});}function D(e,t){A(t)?t.forEach(t=>e(t.bind(n))):t&&e(t.bind(n));}if(u&&rS(u,e,"c"),D(n7,d),D(re,h),D(rt,f),D(rn,p),D(n2,m),D(n6,g),D(ra,N),D(ro,k),D(rs,T),D(rr,b),D(ri,x),D(rl,w),A(E)){if(E.length){let t=e.exposed||(e.exposed={});E.forEach(e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t});});}else e.exposed||(e.exposed={});}C&&e.render===_&&(e.render=C),null!=I&&(e.inheritAttrs=I),R&&(e.components=R),O&&(e.directives=O);}(e);}finally{e$(),t();}}}let i0={get:(e,t)=>(eW(e,"get",""),e[t])};function i1(e){return {attrs:new Proxy(e.attrs,i0),slots:e.slots,emit:e.emit,expose:t=>{e.exposed=t||{};}}}function i2(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(tK(t$(e.exposed)),{get:(t,n)=>n in t?t[n]:n in rp?rp[n](e):void 0,has:(e,t)=>t in e||t in rp})):e.proxy}function i6(e,t=!0){return P(e)?e.displayName||e.name:e.name||t&&e.__name}let i3=(e,t)=>(function(e,t,n=!1){let r,i;return P(e)?r=e:(r=e.get,i=e.set),new tZ(r,i,n)})(e,0,iX);function i4(e,t,n){let r=arguments.length;return 2!==r?(r>3?n=Array.prototype.slice.call(arguments,2):3===r&&iE(n)&&(n=[n]),iM(e,t,n)):!$(t)||A(t)?iM(e,null,t):iE(t)?iM(e,null,[t]):iM(e,t)}function i8(e,t){let n=e.memo;if(n.length!=t.length)return !1;for(let e=0;e<n.length;e++)if(Z(n[e],t[e]))return !1;return iT>0&&ix&&ix.push(e),!0}let i5="3.5.11",i9="undefined"!=typeof window&&window.trustedTypes;if(i9)try{m=/* @__PURE__ */i9.createPolicy("vue",{createHTML:e=>e});}catch(e){}let i7=m?e=>m.createHTML(e):e=>e,le="undefined"!=typeof document?document:null,lt=le&&/* @__PURE__ */le.createElement("template"),ln="transition",lr="animation",li=Symbol("_vtc"),ll={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},ls=/* @__PURE__ */k({},nE,ll),lo=((t=(e,{slots:t})=>i4(nO,lu(e),t)).displayName="Transition",t.props=ls,t),la=(e,t=[])=>{A(e)?e.forEach(e=>e(...t)):e&&e(...t);},lc=e=>!!e&&(A(e)?e.some(e=>e.length>1):e.length>1);function lu(e){let t={};for(let n in e)n in ll||(t[n]=e[n]);if(!1===e.css)return t;let{name:n="v",type:r,duration:i,enterFromClass:l=`${n}-enter-from`,enterActiveClass:s=`${n}-enter-active`,enterToClass:o=`${n}-enter-to`,appearFromClass:a=l,appearActiveClass:c=s,appearToClass:u=o,leaveFromClass:d=`${n}-leave-from`,leaveActiveClass:h=`${n}-leave-active`,leaveToClass:f=`${n}-leave-to`}=e,p=function(e){if(null==e)return null;if($(e))return [en(e.enter),en(e.leave)];{let t=en(e);return [t,t]}}(i),m=p&&p[0],g=p&&p[1],{onBeforeEnter:y,onEnter:b,onEnterCancelled:_,onLeave:S,onLeaveCancelled:x,onBeforeAppear:C=y,onAppear:T=b,onAppearCancelled:N=_}=t,w=(e,t,n)=>{lh(e,t?u:o),lh(e,t?c:s),n&&n();},A=(e,t)=>{e._isLeaving=!1,lh(e,d),lh(e,f),lh(e,h),t&&t();},E=e=>(t,n)=>{let i=e?T:b,s=()=>w(t,e,n);la(i,[t,s]),lf(()=>{lh(t,e?a:l),ld(t,e?u:o),lc(i)||lm(t,r,m,s);});};return k(t,{onBeforeEnter(e){la(y,[e]),ld(e,l),ld(e,s);},onBeforeAppear(e){la(C,[e]),ld(e,a),ld(e,c);},onEnter:E(!1),onAppear:E(!0),onLeave(e,t){e._isLeaving=!0;let n=()=>A(e,t);ld(e,d),ld(e,h),lb(),lf(()=>{e._isLeaving&&(lh(e,d),ld(e,f),lc(S)||lm(e,r,g,n));}),la(S,[e,n]);},onEnterCancelled(e){w(e,!1),la(_,[e]);},onAppearCancelled(e){w(e,!0),la(N,[e]);},onLeaveCancelled(e){A(e),la(x,[e]);}})}function ld(e,t){t.split(/\s+/).forEach(t=>t&&e.classList.add(t)),(e[li]||(e[li]=/* @__PURE__ */new Set)).add(t);}function lh(e,t){t.split(/\s+/).forEach(t=>t&&e.classList.remove(t));let n=e[li];n&&(n.delete(t),n.size||(e[li]=void 0));}function lf(e){requestAnimationFrame(()=>{requestAnimationFrame(e);});}let lp=0;function lm(e,t,n,r){let i=e._endId=++lp,l=()=>{i===e._endId&&r();};if(null!=n)return setTimeout(l,n);let{type:s,timeout:o,propCount:a}=lg(e,t);if(!s)return r();let c=s+"end",u=0,d=()=>{e.removeEventListener(c,h),l();},h=t=>{t.target===e&&++u>=a&&d();};setTimeout(()=>{u<a&&d();},o+1),e.addEventListener(c,h);}function lg(e,t){let n=window.getComputedStyle(e),r=e=>(n[e]||"").split(", "),i=r(`${ln}Delay`),l=r(`${ln}Duration`),s=ly(i,l),o=r(`${lr}Delay`),a=r(`${lr}Duration`),c=ly(o,a),u=null,d=0,h=0;t===ln?s>0&&(u=ln,d=s,h=l.length):t===lr?c>0&&(u=lr,d=c,h=a.length):h=(u=(d=Math.max(s,c))>0?s>c?ln:lr:null)?u===ln?l.length:a.length:0;let f=u===ln&&/\b(transform|all)(,|$)/.test(r(`${ln}Property`).toString());return {type:u,timeout:d,propCount:h,hasTransform:f}}function ly(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((t,n)=>lv(t)+lv(e[n])))}function lv(e){return "auto"===e?0:1e3*Number(e.slice(0,-1).replace(",","."))}function lb(){return document.body.offsetHeight}let l_=Symbol("_vod"),lS=Symbol("_vsh");function lx(e,t){e.style.display=t?e[l_]:"none",e[lS]=!t;}let lC=Symbol("");function lk(e,t){if(1===e.nodeType){let n=e.style,r="";for(let e in t)n.setProperty(`--${e}`,t[e]),r+=`--${e}: ${t[e]};`;n[lC]=r;}}let lT=/(^|;)\s*display\s*:/,lN=/\s*!important$/;function lw(e,t,n){if(A(n))n.forEach(n=>lw(e,t,n));else if(null==n&&(n=""),t.startsWith("--"))e.setProperty(t,n);else {let r=function(e,t){let n=lE[t];if(n)return n;let r=z(t);if("filter"!==r&&r in e)return lE[t]=r;r=X(r);for(let n=0;n<lA.length;n++){let i=lA[n]+r;if(i in e)return lE[t]=i}return t}(e,t);lN.test(n)?e.setProperty(G(r),n.replace(lN,""),"important"):e[r]=n;}}let lA=["Webkit","Moz","ms"],lE={},lI="http://www.w3.org/1999/xlink";function lR(e,t,n,r,i,l=em(t)){r&&t.startsWith("xlink:")?null==n?e.removeAttributeNS(lI,t.slice(6,t.length)):e.setAttributeNS(lI,t,n):null==n||l&&!(n||""===n)?e.removeAttribute(t):e.setAttribute(t,l?"":L(n)?String(n):n);}function lO(e,t,n,r){if("innerHTML"===t||"textContent"===t){null!=n&&(e[t]="innerHTML"===t?i7(n):n);return}let i=e.tagName;if("value"===t&&"PROGRESS"!==i&&!i.includes("-")){let r="OPTION"===i?e.getAttribute("value")||"":e.value,l=null==n?"checkbox"===e.type?"on":"":String(n);r===l&&"_value"in e||(e.value=l),null==n&&e.removeAttribute(t),e._value=n;return}let l=!1;if(""===n||null==n){let r=typeof e[t];if("boolean"===r){var s;n=!!(s=n)||""===s;}else null==n&&"string"===r?(n="",l=!0):"number"===r&&(n=0,l=!0);}try{e[t]=n;}catch(e){}l&&e.removeAttribute(t);}function lP(e,t,n,r){e.addEventListener(t,n,r);}let lM=Symbol("_vei"),lL=/(?:Once|Passive|Capture)$/,l$=0,lD=/* @__PURE__ */Promise.resolve(),lF=()=>l$||(lD.then(()=>l$=0),l$=Date.now()),lV=e=>111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&e.charCodeAt(2)>96&&123>e.charCodeAt(2),lB={};/*! #__NO_SIDE_EFFECTS__ */function lU(e,t,n){let r=nV(e,t);U(r)&&k(r,t);class i extends lH{constructor(e){super(r,e,n);}}return i.def=r,i}let lj="undefined"!=typeof HTMLElement?HTMLElement:class{};class lH extends lj{constructor(e,t={},n=sc){super(),this._def=e,this._props=t,this._createApp=n,this._isVueCE=!0,this._instance=null,this._app=null,this._nonce=this._def.nonce,this._connected=!1,this._resolved=!1,this._numberProps=null,this._styleChildren=/* @__PURE__ */new WeakSet,this._ob=null,this.shadowRoot&&n!==sc?this._root=this.shadowRoot:!1!==e.shadowRoot?(this.attachShadow({mode:"open"}),this._root=this.shadowRoot):this._root=this,this._def.__asyncLoader||this._resolveProps(this._def);}connectedCallback(){if(!this.isConnected)return;this.shadowRoot||this._parseSlots(),this._connected=!0;let e=this;for(;e=e&&(e.parentNode||e.host);)if(e instanceof lH){this._parent=e;break}this._instance||(this._resolved?(this._setParent(),this._update()):e&&e._pendingResolve?this._pendingResolve=e._pendingResolve.then(()=>{this._pendingResolve=void 0,this._resolveDef();}):this._resolveDef());}_setParent(e=this._parent){e&&(this._instance.parent=e._instance,this._instance.provides=e._instance.provides);}disconnectedCallback(){this._connected=!1,nr(()=>{this._connected||(this._ob&&(this._ob.disconnect(),this._ob=null),this._app&&this._app.unmount(),this._instance&&(this._instance.ce=void 0),this._app=this._instance=null);});}_resolveDef(){if(this._pendingResolve)return;for(let e=0;e<this.attributes.length;e++)this._setAttr(this.attributes[e].name);this._ob=new MutationObserver(e=>{for(let t of e)this._setAttr(t.attributeName);}),this._ob.observe(this,{attributes:!0});let e=(e,t=!1)=>{let n;this._resolved=!0,this._pendingResolve=void 0;let{props:r,styles:i}=e;if(r&&!A(r))for(let e in r){let t=r[e];(t===Number||t&&t.type===Number)&&(e in this._props&&(this._props[e]=en(this._props[e])),(n||(n=/* @__PURE__ */Object.create(null)))[z(e)]=!0);}this._numberProps=n,t&&this._resolveProps(e),this.shadowRoot&&this._applyStyles(i),this._mount(e);},t=this._def.__asyncLoader;t?this._pendingResolve=t().then(t=>e(this._def=t,!0)):e(this._def);}_mount(e){this._app=this._createApp(e),e.configureApp&&e.configureApp(this._app),this._app._ceVNode=this._createVNode(),this._app.mount(this._root);let t=this._instance&&this._instance.exposed;if(t)for(let e in t)w(this,e)||Object.defineProperty(this,e,{get:()=>tq(t[e])});}_resolveProps(e){let{props:t}=e,n=A(t)?t:Object.keys(t||{});for(let e of Object.keys(this))"_"!==e[0]&&n.includes(e)&&this._setProp(e,this[e]);for(let e of n.map(z))Object.defineProperty(this,e,{get(){return this._getProp(e)},set(t){this._setProp(e,t,!0,!0);}});}_setAttr(e){if(e.startsWith("data-v-"))return;let t=this.hasAttribute(e),n=t?this.getAttribute(e):lB,r=z(e);t&&this._numberProps&&this._numberProps[r]&&(n=en(n)),this._setProp(r,n,!1,!0);}_getProp(e){return this._props[e]}_setProp(e,t,n=!0,r=!1){t!==this._props[e]&&(t===lB?delete this._props[e]:(this._props[e]=t,"key"===e&&this._app&&(this._app._ceVNode.key=t)),r&&this._instance&&this._update(),n&&(!0===t?this.setAttribute(G(e),""):"string"==typeof t||"number"==typeof t?this.setAttribute(G(e),t+""):t||this.removeAttribute(G(e))));}_update(){sa(this._createVNode(),this._root);}_createVNode(){let e={};this.shadowRoot||(e.onVnodeMounted=e.onVnodeUpdated=this._renderSlots.bind(this));let t=iM(this._def,k(e,this._props));return this._instance||(t.ce=e=>{this._instance=e,e.ce=this,e.isCE=!0;let t=(e,t)=>{this.dispatchEvent(new CustomEvent(e,U(t[0])?k({detail:t},t[0]):{detail:t}));};e.emit=(e,...n)=>{t(e,n),G(e)!==e&&t(G(e),n);},this._setParent();}),t}_applyStyles(e,t){if(!e)return;if(t){if(t===this._def||this._styleChildren.has(t))return;this._styleChildren.add(t);}let n=this._nonce;for(let t=e.length-1;t>=0;t--){let r=document.createElement("style");n&&r.setAttribute("nonce",n),r.textContent=e[t],this.shadowRoot.prepend(r);}}_parseSlots(){let e;let t=this._slots={};for(;e=this.firstChild;){let n=1===e.nodeType&&e.getAttribute("slot")||"default";(t[n]||(t[n]=[])).push(e),this.removeChild(e);}}_renderSlots(){let e=(this._teleportTarget||this).querySelectorAll("slot"),t=this._instance.type.__scopeId;for(let n=0;n<e.length;n++){let r=e[n],i=r.getAttribute("name")||"default",l=this._slots[i],s=r.parentNode;if(l)for(let e of l){if(t&&1===e.nodeType){let n;let r=t+"-s",i=document.createTreeWalker(e,1);for(e.setAttribute(r,"");n=i.nextNode();)n.setAttribute(r,"");}s.insertBefore(e,r);}else for(;r.firstChild;)s.insertBefore(r.firstChild,r);s.removeChild(r);}}_injectChildStyle(e){this._applyStyles(e.styles,e);}_removeChildStyle(e){}}function lq(e){let t=iK();return t&&t.ce||null}let lW=/* @__PURE__ */new WeakMap,lK=/* @__PURE__ */new WeakMap,lz=Symbol("_moveCb"),lJ=Symbol("_enterCb"),lG=(n={name:"TransitionGroup",props:/* @__PURE__ */k({},ls,{tag:String,moveClass:String}),setup(e,{slots:t}){let n,r;let i=iK(),l=nw();return rn(()=>{if(!n.length)return;let t=e.moveClass||`${e.name||"v"}-move`;if(!function(e,t,n){let r=e.cloneNode(),i=e[li];i&&i.forEach(e=>{e.split(/\s+/).forEach(e=>e&&r.classList.remove(e));}),n.split(/\s+/).forEach(e=>e&&r.classList.add(e)),r.style.display="none";let l=1===t.nodeType?t:t.parentNode;l.appendChild(r);let{hasTransform:s}=lg(r);return l.removeChild(r),s}(n[0].el,i.vnode.el,t))return;n.forEach(lX),n.forEach(lQ);let r=n.filter(lZ);lb(),r.forEach(e=>{let n=e.el,r=n.style;ld(n,t),r.transform=r.webkitTransform=r.transitionDuration="";let i=n[lz]=e=>{(!e||e.target===n)&&(!e||/transform$/.test(e.propertyName))&&(n.removeEventListener("transitionend",i),n[lz]=null,lh(n,t));};n.addEventListener("transitionend",i);});}),()=>{let s=tL(e),o=lu(s),a=s.tag||iy;if(n=[],r)for(let e=0;e<r.length;e++){let t=r[e];t.el&&t.el instanceof Element&&(n.push(t),nD(t,nM(t,o,l,i)),lW.set(t,t.el.getBoundingClientRect()));}r=t.default?nF(t.default()):[];for(let e=0;e<r.length;e++){let t=r[e];null!=t.key&&nD(t,nM(t,o,l,i));}return iM(a,null,r)}}},delete n.props.mode,n);function lX(e){let t=e.el;t[lz]&&t[lz](),t[lJ]&&t[lJ]();}function lQ(e){lK.set(e,e.el.getBoundingClientRect());}function lZ(e){let t=lW.get(e),n=lK.get(e),r=t.left-n.left,i=t.top-n.top;if(r||i){let t=e.el.style;return t.transform=t.webkitTransform=`translate(${r}px,${i}px)`,t.transitionDuration="0s",e}}let lY=e=>{let t=e.props["onUpdate:modelValue"]||!1;return A(t)?e=>Y(t,e):t};function l0(e){e.target.composing=!0;}function l1(e){let t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")));}let l2=Symbol("_assign"),l6={created(e,{modifiers:{lazy:t,trim:n,number:r}},i){e[l2]=lY(i);let l=r||i.props&&"number"===i.props.type;lP(e,t?"change":"input",t=>{if(t.target.composing)return;let r=e.value;n&&(r=r.trim()),l&&(r=et(r)),e[l2](r);}),n&&lP(e,"change",()=>{e.value=e.value.trim();}),t||(lP(e,"compositionstart",l0),lP(e,"compositionend",l1),lP(e,"change",l1));},mounted(e,{value:t}){e.value=null==t?"":t;},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:r,trim:i,number:l}},s){if(e[l2]=lY(s),e.composing)return;let o=(l||"number"===e.type)&&!/^0\d/.test(e.value)?et(e.value):e.value,a=null==t?"":t;o===a||document.activeElement===e&&"range"!==e.type&&(r&&t===n||i&&e.value.trim()===a)||(e.value=a);}},l3={deep:!0,created(e,t,n){e[l2]=lY(n),lP(e,"change",()=>{let t=e._modelValue,n=l7(e),r=e.checked,i=e[l2];if(A(t)){let e=ey(t,n),l=-1!==e;if(r&&!l)i(t.concat(n));else if(!r&&l){let n=[...t];n.splice(e,1),i(n);}}else if(I(t)){let e=new Set(t);r?e.add(n):e.delete(n),i(e);}else i(se(e,r));});},mounted:l4,beforeUpdate(e,t,n){e[l2]=lY(n),l4(e,t,n);}};function l4(e,{value:t},n){let r;e._modelValue=t,r=A(t)?ey(t,n.props.value)>-1:I(t)?t.has(n.props.value):eg(t,se(e,!0)),e.checked!==r&&(e.checked=r);}let l8={created(e,{value:t},n){e.checked=eg(t,n.props.value),e[l2]=lY(n),lP(e,"change",()=>{e[l2](l7(e));});},beforeUpdate(e,{value:t,oldValue:n},r){e[l2]=lY(r),t!==n&&(e.checked=eg(t,r.props.value));}},l5={deep:!0,created(e,{value:t,modifiers:{number:n}},r){let i=I(t);lP(e,"change",()=>{let t=Array.prototype.filter.call(e.options,e=>e.selected).map(e=>n?et(l7(e)):l7(e));e[l2](e.multiple?i?new Set(t):t:t[0]),e._assigning=!0,nr(()=>{e._assigning=!1;});}),e[l2]=lY(r);},mounted(e,{value:t}){l9(e,t);},beforeUpdate(e,t,n){e[l2]=lY(n);},updated(e,{value:t}){e._assigning||l9(e,t);}};function l9(e,t){let n=e.multiple,r=A(t);if(!n||r||I(t)){for(let i=0,l=e.options.length;i<l;i++){let l=e.options[i],s=l7(l);if(n){if(r){let e=typeof s;"string"===e||"number"===e?l.selected=t.some(e=>String(e)===String(s)):l.selected=ey(t,s)>-1;}else l.selected=t.has(s);}else if(eg(l7(l),t)){e.selectedIndex!==i&&(e.selectedIndex=i);return}}n||-1===e.selectedIndex||(e.selectedIndex=-1);}}function l7(e){return "_value"in e?e._value:e.value}function se(e,t){let n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}function st(e,t,n,r,i){let l=function(e,t){switch(e){case"SELECT":return l5;case"TEXTAREA":return l6;default:switch(t){case"checkbox":return l3;case"radio":return l8;default:return l6}}}(e.tagName,n.props&&n.props.type)[i];l&&l(e,t,n,r);}let sn=["ctrl","shift","alt","meta"],sr={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&0!==e.button,middle:e=>"button"in e&&1!==e.button,right:e=>"button"in e&&2!==e.button,exact:(e,t)=>sn.some(n=>e[`${n}Key`]&&!t.includes(n))},si={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},sl=/* @__PURE__ */k({patchProp:(e,t,n,r,i,l)=>{let s="svg"===i;"class"===t?function(e,t,n){let r=e[li];r&&(t=(t?[t,...r]:[...r]).join(" ")),null==t?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t;}(e,r,s):"style"===t?function(e,t,n){let r=e.style,i=M(n),l=!1;if(n&&!i){if(t){if(M(t))for(let e of t.split(";")){let t=e.slice(0,e.indexOf(":")).trim();null==n[t]&&lw(r,t,"");}else for(let e in t)null==n[e]&&lw(r,e,"");}for(let e in n)"display"===e&&(l=!0),lw(r,e,n[e]);}else if(i){if(t!==n){let e=r[lC];e&&(n+=";"+e),r.cssText=n,l=lT.test(n);}}else t&&e.removeAttribute("style");l_ in e&&(e[l_]=l?r.display:"",e[lS]&&(r.display="none"));}(e,n,r):x(t)?C(t)||function(e,t,n,r,i=null){let l=e[lM]||(e[lM]={}),s=l[t];if(r&&s)s.value=r;else {let[n,o]=function(e){let t;if(lL.test(e)){let n;for(t={};n=e.match(lL);)e=e.slice(0,e.length-n[0].length),t[n[0].toLowerCase()]=!0;}return [":"===e[2]?e.slice(3):G(e.slice(2)),t]}(t);r?lP(e,n,l[t]=function(e,t){let n=e=>{if(e._vts){if(e._vts<=n.attached)return}else e._vts=Date.now();t3(function(e,t){if(!A(t))return t;{let n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0;},t.map(e=>t=>!t._stopped&&e&&e(t))}}(e,n.value),t,5,[e]);};return n.value=e,n.attached=lF(),n}(r,i),o):s&&(!function(e,t,n,r){e.removeEventListener(t,n,r);}(e,n,s,o),l[t]=void 0);}}(e,t,0,r,l):("."===t[0]?(t=t.slice(1),0):"^"===t[0]?(t=t.slice(1),1):!function(e,t,n,r){if(r)return !!("innerHTML"===t||"textContent"===t||t in e&&lV(t)&&P(n));if("spellcheck"===t||"draggable"===t||"translate"===t||"form"===t||"list"===t&&"INPUT"===e.tagName||"type"===t&&"TEXTAREA"===e.tagName)return !1;if("width"===t||"height"===t){let t=e.tagName;if("IMG"===t||"VIDEO"===t||"CANVAS"===t||"SOURCE"===t)return !1}return !(lV(t)&&M(n))&&t in e}(e,t,r,s))?e._isVueCE&&(/[A-Z]/.test(t)||!M(r))?lO(e,z(t),r):("true-value"===t?e._trueValue=r:"false-value"===t&&(e._falseValue=r),lR(e,t,r,s)):(lO(e,t,r),e.tagName.includes("-")||"value"!==t&&"checked"!==t&&"selected"!==t||lR(e,t,r,s,l,"value"!==t));}},{insert:(e,t,n)=>{t.insertBefore(e,n||null);},remove:e=>{let t=e.parentNode;t&&t.removeChild(e);},createElement:(e,t,n,r)=>{let i="svg"===t?le.createElementNS("http://www.w3.org/2000/svg",e):"mathml"===t?le.createElementNS("http://www.w3.org/1998/Math/MathML",e):n?le.createElement(e,{is:n}):le.createElement(e);return "select"===e&&r&&null!=r.multiple&&i.setAttribute("multiple",r.multiple),i},createText:e=>le.createTextNode(e),createComment:e=>le.createComment(e),setText:(e,t)=>{e.nodeValue=t;},setElementText:(e,t)=>{e.textContent=t;},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>le.querySelector(e),setScopeId(e,t){e.setAttribute(t,"");},insertStaticContent(e,t,n,r,i,l){let s=n?n.previousSibling:t.lastChild;if(i&&(i===l||i.nextSibling))for(;t.insertBefore(i.cloneNode(!0),n),i!==l&&(i=i.nextSibling););else {lt.innerHTML=i7("svg"===r?`<svg>${e}</svg>`:"mathml"===r?`<math>${e}</math>`:e);let i=lt.content;if("svg"===r||"mathml"===r){let e=i.firstChild;for(;e.firstChild;)i.appendChild(e.firstChild);i.removeChild(e);}t.insertBefore(i,n);}return [s?s.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}}),ss=!1;function so(){return h=ss?h:rQ(sl),ss=!0,h}let sa=(...e)=>{(h||(h=rZ(sl))).render(...e);},sc=(...e)=>{let t=(h||(h=rZ(sl))).createApp(...e),{mount:n}=t;return t.mount=e=>{let r=sh(e);if(!r)return;let i=t._component;P(i)||i.render||i.template||(i.template=r.innerHTML),1===r.nodeType&&(r.textContent="");let l=n(r,!1,sd(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),l},t},su=(...e)=>{let t=so().createApp(...e),{mount:n}=t;return t.mount=e=>{let t=sh(e);if(t)return n(t,!0,sd(t))},t};function sd(e){return e instanceof SVGElement?"svg":"function"==typeof MathMLElement&&e instanceof MathMLElement?"mathml":void 0}function sh(e){return M(e)?document.querySelector(e):e}let sf=Symbol(""),sp=Symbol(""),sm=Symbol(""),sg=Symbol(""),sy=Symbol(""),sv=Symbol(""),sb=Symbol(""),s_=Symbol(""),sS=Symbol(""),sx=Symbol(""),sC=Symbol(""),sk=Symbol(""),sT=Symbol(""),sN=Symbol(""),sw=Symbol(""),sA=Symbol(""),sE=Symbol(""),sI=Symbol(""),sR=Symbol(""),sO=Symbol(""),sP=Symbol(""),sM=Symbol(""),sL=Symbol(""),s$=Symbol(""),sD=Symbol(""),sF=Symbol(""),sV=Symbol(""),sB=Symbol(""),sU=Symbol(""),sj=Symbol(""),sH=Symbol(""),sq=Symbol(""),sW=Symbol(""),sK=Symbol(""),sz=Symbol(""),sJ=Symbol(""),sG=Symbol(""),sX=Symbol(""),sQ=Symbol(""),sZ={[sf]:"Fragment",[sp]:"Teleport",[sm]:"Suspense",[sg]:"KeepAlive",[sy]:"BaseTransition",[sv]:"openBlock",[sb]:"createBlock",[s_]:"createElementBlock",[sS]:"createVNode",[sx]:"createElementVNode",[sC]:"createCommentVNode",[sk]:"createTextVNode",[sT]:"createStaticVNode",[sN]:"resolveComponent",[sw]:"resolveDynamicComponent",[sA]:"resolveDirective",[sE]:"resolveFilter",[sI]:"withDirectives",[sR]:"renderList",[sO]:"renderSlot",[sP]:"createSlots",[sM]:"toDisplayString",[sL]:"mergeProps",[s$]:"normalizeClass",[sD]:"normalizeStyle",[sF]:"normalizeProps",[sV]:"guardReactiveProps",[sB]:"toHandlers",[sU]:"camelize",[sj]:"capitalize",[sH]:"toHandlerKey",[sq]:"setBlockTracking",[sW]:"pushScopeId",[sK]:"popScopeId",[sz]:"withCtx",[sJ]:"unref",[sG]:"isRef",[sX]:"withMemo",[sQ]:"isMemoSame"},sY={start:{line:1,column:1,offset:0},end:{line:1,column:1,offset:0},source:""};function s0(e,t,n,r,i,l,s,o=!1,a=!1,c=!1,u=sY){return e&&(o?(e.helper(sv),e.helper(e.inSSR||c?sb:s_)):e.helper(e.inSSR||c?sS:sx),s&&e.helper(sI)),{type:13,tag:t,props:n,children:r,patchFlag:i,dynamicProps:l,directives:s,isBlock:o,disableTracking:a,isComponent:c,loc:u}}function s1(e,t=sY){return {type:17,loc:t,elements:e}}function s2(e,t=sY){return {type:15,loc:t,properties:e}}function s6(e,t){return {type:16,loc:sY,key:M(e)?s3(e,!0):e,value:t}}function s3(e,t=!1,n=sY,r=0){return {type:4,loc:n,content:e,isStatic:t,constType:t?3:r}}function s4(e,t=sY){return {type:8,loc:t,children:e}}function s8(e,t=[],n=sY){return {type:14,loc:n,callee:e,arguments:t}}function s5(e,t,n=!1,r=!1,i=sY){return {type:18,params:e,returns:t,newline:n,isSlot:r,loc:i}}function s9(e,t,n,r=!0){return {type:19,test:e,consequent:t,alternate:n,newline:r,loc:sY}}function s7(e,{helper:t,removeHelper:n,inSSR:r}){if(!e.isBlock){var i,l;e.isBlock=!0,n((i=e.isComponent,r||i?sS:sx)),t(sv),t((l=e.isComponent,r||l?sb:s_));}}let oe=new Uint8Array([123,123]),ot=new Uint8Array([125,125]);function on(e){return e>=97&&e<=122||e>=65&&e<=90}function or(e){return 32===e||10===e||9===e||12===e||13===e}function oi(e){return 47===e||62===e||or(e)}function ol(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}let os={Cdata:new Uint8Array([67,68,65,84,65,91]),CdataEnd:new Uint8Array([93,93,62]),CommentEnd:new Uint8Array([45,45,62]),ScriptEnd:new Uint8Array([60,47,115,99,114,105,112,116]),StyleEnd:new Uint8Array([60,47,115,116,121,108,101]),TitleEnd:new Uint8Array([60,47,116,105,116,108,101]),TextareaEnd:new Uint8Array([60,47,116,101,120,116,97,114,101,97])};function oo(e){throw e}function oa(e){}function /*@__PURE__*/oc(e,t,n,r){let i=SyntaxError(String(`https://vuejs.org/error-reference/#compiler-${e}`));return i.code=e,i.loc=t,i}let ou=e=>4===e.type&&e.isStatic;function od(e){switch(e){case"Teleport":case"teleport":return sp;case"Suspense":case"suspense":return sm;case"KeepAlive":case"keep-alive":return sg;case"BaseTransition":case"base-transition":return sy}}let oh=/^\d|[^\$\w\xA0-\uFFFF]/,of=e=>!oh.test(e),op=/[A-Za-z_$\xA0-\uFFFF]/,om=/[\.\?\w$\xA0-\uFFFF]/,og=/\s+[.[]\s*|\s*[.[]\s+/g,oy=e=>4===e.type?e.content:e.loc.source,ov=e=>{let t=oy(e).trim().replace(og,e=>e.trim()),n=0,r=[],i=0,l=0,s=null;for(let e=0;e<t.length;e++){let o=t.charAt(e);switch(n){case 0:if("["===o)r.push(n),n=1,i++;else if("("===o)r.push(n),n=2,l++;else if(!(0===e?op:om).test(o))return !1;break;case 1:"'"===o||'"'===o||"`"===o?(r.push(n),n=3,s=o):"["===o?i++:"]"!==o||--i||(n=r.pop());break;case 2:if("'"===o||'"'===o||"`"===o)r.push(n),n=3,s=o;else if("("===o)l++;else if(")"===o){if(e===t.length-1)return !1;--l||(n=r.pop());}break;case 3:o===s&&(n=r.pop(),s=null);}}return !i&&!l},ob=/^\s*(async\s*)?(\([^)]*?\)|[\w$_]+)\s*(:[^=]+)?=>|^\s*(async\s+)?function(?:\s+[\w$]+)?\s*\(/,o_=e=>ob.test(oy(e));function oS(e,t,n=!1){for(let r=0;r<e.props.length;r++){let i=e.props[r];if(7===i.type&&(n||i.exp)&&(M(t)?i.name===t:t.test(i.name)))return i}}function ox(e,t,n=!1,r=!1){for(let i=0;i<e.props.length;i++){let l=e.props[i];if(6===l.type){if(n)continue;if(l.name===t&&(l.value||r))return l}else if("bind"===l.name&&(l.exp||r)&&oC(l.arg,t))return l}}function oC(e,t){return !!(e&&ou(e)&&e.content===t)}function ok(e){return 5===e.type||2===e.type}function oT(e){return 7===e.type&&"slot"===e.name}function oN(e){return 1===e.type&&3===e.tagType}function ow(e){return 1===e.type&&2===e.tagType}let oA=/* @__PURE__ */new Set([sF,sV]);function oE(e,t,n){let r,i;let l=13===e.type?e.props:e.arguments[2],s=[];if(l&&!M(l)&&14===l.type){let e=function e(t,n=[]){if(t&&!M(t)&&14===t.type){let r=t.callee;if(!M(r)&&oA.has(r))return e(t.arguments[0],n.concat(t))}return [t,n]}(l);l=e[0],i=(s=e[1])[s.length-1];}if(null==l||M(l))r=s2([t]);else if(14===l.type){let e=l.arguments[0];M(e)||15!==e.type?l.callee===sB?r=s8(n.helper(sL),[s2([t]),l]):l.arguments.unshift(s2([t])):oI(t,e)||e.properties.unshift(t),r||(r=l);}else 15===l.type?(oI(t,l)||l.properties.unshift(t),r=l):(r=s8(n.helper(sL),[s2([t]),l]),i&&i.callee===sV&&(i=s[s.length-2]));13===e.type?i?i.arguments[0]=r:e.props=r:i?i.arguments[0]=r:e.arguments[2]=r;}function oI(e,t){let n=!1;if(4===e.key.type){let r=e.key.content;n=t.properties.some(e=>4===e.key.type&&e.key.content===r);}return n}function oR(e,t){return `_${t}_${e.replace(/[^\w]/g,(t,n)=>"-"===t?"_":e.charCodeAt(n).toString())}`}let oO=/([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/,oP={parseMode:"base",ns:0,delimiters:["{{","}}"],getNamespace:()=>0,isVoidTag:S,isPreTag:S,isIgnoreNewlineTag:S,isCustomElement:S,onError:oo,onWarn:oa,comments:!1,prefixIdentifiers:!1},oM=oP,oL=null,o$="",oD=null,oF=null,oV="",oB=-1,oU=-1,oj=0,oH=!1,oq=null,oW=[],oK=new class{constructor(e,t){this.stack=e,this.cbs=t,this.state=1,this.buffer="",this.sectionStart=0,this.index=0,this.entityStart=0,this.baseState=1,this.inRCDATA=!1,this.inXML=!1,this.inVPre=!1,this.newlines=[],this.mode=0,this.delimiterOpen=oe,this.delimiterClose=ot,this.delimiterIndex=-1,this.currentSequence=void 0,this.sequenceIndex=0;}get inSFCRoot(){return 2===this.mode&&0===this.stack.length}reset(){this.state=1,this.mode=0,this.buffer="",this.sectionStart=0,this.index=0,this.baseState=1,this.inRCDATA=!1,this.currentSequence=void 0,this.newlines.length=0,this.delimiterOpen=oe,this.delimiterClose=ot;}getPos(e){let t=1,n=e+1;for(let r=this.newlines.length-1;r>=0;r--){let i=this.newlines[r];if(e>i){t=r+2,n=e-i;break}}return {column:n,line:t,offset:e}}peek(){return this.buffer.charCodeAt(this.index+1)}stateText(e){60===e?(this.index>this.sectionStart&&this.cbs.ontext(this.sectionStart,this.index),this.state=5,this.sectionStart=this.index):this.inVPre||e!==this.delimiterOpen[0]||(this.state=2,this.delimiterIndex=0,this.stateInterpolationOpen(e));}stateInterpolationOpen(e){if(e===this.delimiterOpen[this.delimiterIndex]){if(this.delimiterIndex===this.delimiterOpen.length-1){let e=this.index+1-this.delimiterOpen.length;e>this.sectionStart&&this.cbs.ontext(this.sectionStart,e),this.state=3,this.sectionStart=e;}else this.delimiterIndex++;}else this.inRCDATA?(this.state=32,this.stateInRCDATA(e)):(this.state=1,this.stateText(e));}stateInterpolation(e){e===this.delimiterClose[0]&&(this.state=4,this.delimiterIndex=0,this.stateInterpolationClose(e));}stateInterpolationClose(e){e===this.delimiterClose[this.delimiterIndex]?this.delimiterIndex===this.delimiterClose.length-1?(this.cbs.oninterpolation(this.sectionStart,this.index+1),this.inRCDATA?this.state=32:this.state=1,this.sectionStart=this.index+1):this.delimiterIndex++:(this.state=3,this.stateInterpolation(e));}stateSpecialStartSequence(e){let t=this.sequenceIndex===this.currentSequence.length;if(t?oi(e):(32|e)===this.currentSequence[this.sequenceIndex]){if(!t){this.sequenceIndex++;return}}else this.inRCDATA=!1;this.sequenceIndex=0,this.state=6,this.stateInTagName(e);}stateInRCDATA(e){if(this.sequenceIndex===this.currentSequence.length){if(62===e||or(e)){let t=this.index-this.currentSequence.length;if(this.sectionStart<t){let e=this.index;this.index=t,this.cbs.ontext(this.sectionStart,t),this.index=e;}this.sectionStart=t+2,this.stateInClosingTagName(e),this.inRCDATA=!1;return}this.sequenceIndex=0;}(32|e)===this.currentSequence[this.sequenceIndex]?this.sequenceIndex+=1:0===this.sequenceIndex?this.currentSequence!==os.TitleEnd&&(this.currentSequence!==os.TextareaEnd||this.inSFCRoot)?this.fastForwardTo(60)&&(this.sequenceIndex=1):this.inVPre||e!==this.delimiterOpen[0]||(this.state=2,this.delimiterIndex=0,this.stateInterpolationOpen(e)):this.sequenceIndex=Number(60===e);}stateCDATASequence(e){e===os.Cdata[this.sequenceIndex]?++this.sequenceIndex===os.Cdata.length&&(this.state=28,this.currentSequence=os.CdataEnd,this.sequenceIndex=0,this.sectionStart=this.index+1):(this.sequenceIndex=0,this.state=23,this.stateInDeclaration(e));}fastForwardTo(e){for(;++this.index<this.buffer.length;){let t=this.buffer.charCodeAt(this.index);if(10===t&&this.newlines.push(this.index),t===e)return !0}return this.index=this.buffer.length-1,!1}stateInCommentLike(e){e===this.currentSequence[this.sequenceIndex]?++this.sequenceIndex===this.currentSequence.length&&(this.currentSequence===os.CdataEnd?this.cbs.oncdata(this.sectionStart,this.index-2):this.cbs.oncomment(this.sectionStart,this.index-2),this.sequenceIndex=0,this.sectionStart=this.index+1,this.state=1):0===this.sequenceIndex?this.fastForwardTo(this.currentSequence[0])&&(this.sequenceIndex=1):e!==this.currentSequence[this.sequenceIndex-1]&&(this.sequenceIndex=0);}startSpecial(e,t){this.enterRCDATA(e,t),this.state=31;}enterRCDATA(e,t){this.inRCDATA=!0,this.currentSequence=e,this.sequenceIndex=t;}stateBeforeTagName(e){33===e?(this.state=22,this.sectionStart=this.index+1):63===e?(this.state=24,this.sectionStart=this.index+1):on(e)?(this.sectionStart=this.index,0===this.mode?this.state=6:this.inSFCRoot?this.state=34:this.inXML?this.state=6:116===e?this.state=30:this.state=115===e?29:6):47===e?this.state=8:(this.state=1,this.stateText(e));}stateInTagName(e){oi(e)&&this.handleTagName(e);}stateInSFCRootTagName(e){if(oi(e)){let t=this.buffer.slice(this.sectionStart,this.index);"template"!==t&&this.enterRCDATA(ol("</"+t),0),this.handleTagName(e);}}handleTagName(e){this.cbs.onopentagname(this.sectionStart,this.index),this.sectionStart=-1,this.state=11,this.stateBeforeAttrName(e);}stateBeforeClosingTagName(e){or(e)||(62===e?(this.state=1,this.sectionStart=this.index+1):(this.state=on(e)?9:27,this.sectionStart=this.index));}stateInClosingTagName(e){(62===e||or(e))&&(this.cbs.onclosetag(this.sectionStart,this.index),this.sectionStart=-1,this.state=10,this.stateAfterClosingTagName(e));}stateAfterClosingTagName(e){62===e&&(this.state=1,this.sectionStart=this.index+1);}stateBeforeAttrName(e){62===e?(this.cbs.onopentagend(this.index),this.inRCDATA?this.state=32:this.state=1,this.sectionStart=this.index+1):47===e?this.state=7:60===e&&47===this.peek()?(this.cbs.onopentagend(this.index),this.state=5,this.sectionStart=this.index):or(e)||this.handleAttrStart(e);}handleAttrStart(e){118===e&&45===this.peek()?(this.state=13,this.sectionStart=this.index):46===e||58===e||64===e||35===e?(this.cbs.ondirname(this.index,this.index+1),this.state=14,this.sectionStart=this.index+1):(this.state=12,this.sectionStart=this.index);}stateInSelfClosingTag(e){62===e?(this.cbs.onselfclosingtag(this.index),this.state=1,this.sectionStart=this.index+1,this.inRCDATA=!1):or(e)||(this.state=11,this.stateBeforeAttrName(e));}stateInAttrName(e){(61===e||oi(e))&&(this.cbs.onattribname(this.sectionStart,this.index),this.handleAttrNameEnd(e));}stateInDirName(e){61===e||oi(e)?(this.cbs.ondirname(this.sectionStart,this.index),this.handleAttrNameEnd(e)):58===e?(this.cbs.ondirname(this.sectionStart,this.index),this.state=14,this.sectionStart=this.index+1):46===e&&(this.cbs.ondirname(this.sectionStart,this.index),this.state=16,this.sectionStart=this.index+1);}stateInDirArg(e){61===e||oi(e)?(this.cbs.ondirarg(this.sectionStart,this.index),this.handleAttrNameEnd(e)):91===e?this.state=15:46===e&&(this.cbs.ondirarg(this.sectionStart,this.index),this.state=16,this.sectionStart=this.index+1);}stateInDynamicDirArg(e){93===e?this.state=14:(61===e||oi(e))&&(this.cbs.ondirarg(this.sectionStart,this.index+1),this.handleAttrNameEnd(e));}stateInDirModifier(e){61===e||oi(e)?(this.cbs.ondirmodifier(this.sectionStart,this.index),this.handleAttrNameEnd(e)):46===e&&(this.cbs.ondirmodifier(this.sectionStart,this.index),this.sectionStart=this.index+1);}handleAttrNameEnd(e){this.sectionStart=this.index,this.state=17,this.cbs.onattribnameend(this.index),this.stateAfterAttrName(e);}stateAfterAttrName(e){61===e?this.state=18:47===e||62===e?(this.cbs.onattribend(0,this.sectionStart),this.sectionStart=-1,this.state=11,this.stateBeforeAttrName(e)):or(e)||(this.cbs.onattribend(0,this.sectionStart),this.handleAttrStart(e));}stateBeforeAttrValue(e){34===e?(this.state=19,this.sectionStart=this.index+1):39===e?(this.state=20,this.sectionStart=this.index+1):or(e)||(this.sectionStart=this.index,this.state=21,this.stateInAttrValueNoQuotes(e));}handleInAttrValue(e,t){(e===t||this.fastForwardTo(t))&&(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(34===t?3:2,this.index+1),this.state=11);}stateInAttrValueDoubleQuotes(e){this.handleInAttrValue(e,34);}stateInAttrValueSingleQuotes(e){this.handleInAttrValue(e,39);}stateInAttrValueNoQuotes(e){or(e)||62===e?(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(1,this.index),this.state=11,this.stateBeforeAttrName(e)):(39===e||60===e||61===e||96===e)&&this.cbs.onerr(18,this.index);}stateBeforeDeclaration(e){91===e?(this.state=26,this.sequenceIndex=0):this.state=45===e?25:23;}stateInDeclaration(e){(62===e||this.fastForwardTo(62))&&(this.state=1,this.sectionStart=this.index+1);}stateInProcessingInstruction(e){(62===e||this.fastForwardTo(62))&&(this.cbs.onprocessinginstruction(this.sectionStart,this.index),this.state=1,this.sectionStart=this.index+1);}stateBeforeComment(e){45===e?(this.state=28,this.currentSequence=os.CommentEnd,this.sequenceIndex=2,this.sectionStart=this.index+1):this.state=23;}stateInSpecialComment(e){(62===e||this.fastForwardTo(62))&&(this.cbs.oncomment(this.sectionStart,this.index),this.state=1,this.sectionStart=this.index+1);}stateBeforeSpecialS(e){e===os.ScriptEnd[3]?this.startSpecial(os.ScriptEnd,4):e===os.StyleEnd[3]?this.startSpecial(os.StyleEnd,4):(this.state=6,this.stateInTagName(e));}stateBeforeSpecialT(e){e===os.TitleEnd[3]?this.startSpecial(os.TitleEnd,4):e===os.TextareaEnd[3]?this.startSpecial(os.TextareaEnd,4):(this.state=6,this.stateInTagName(e));}startEntity(){}stateInEntity(){}parse(e){for(this.buffer=e;this.index<this.buffer.length;){let e=this.buffer.charCodeAt(this.index);switch(10===e&&this.newlines.push(this.index),this.state){case 1:this.stateText(e);break;case 2:this.stateInterpolationOpen(e);break;case 3:this.stateInterpolation(e);break;case 4:this.stateInterpolationClose(e);break;case 31:this.stateSpecialStartSequence(e);break;case 32:this.stateInRCDATA(e);break;case 26:this.stateCDATASequence(e);break;case 19:this.stateInAttrValueDoubleQuotes(e);break;case 12:this.stateInAttrName(e);break;case 13:this.stateInDirName(e);break;case 14:this.stateInDirArg(e);break;case 15:this.stateInDynamicDirArg(e);break;case 16:this.stateInDirModifier(e);break;case 28:this.stateInCommentLike(e);break;case 27:this.stateInSpecialComment(e);break;case 11:this.stateBeforeAttrName(e);break;case 6:this.stateInTagName(e);break;case 34:this.stateInSFCRootTagName(e);break;case 9:this.stateInClosingTagName(e);break;case 5:this.stateBeforeTagName(e);break;case 17:this.stateAfterAttrName(e);break;case 20:this.stateInAttrValueSingleQuotes(e);break;case 18:this.stateBeforeAttrValue(e);break;case 8:this.stateBeforeClosingTagName(e);break;case 10:this.stateAfterClosingTagName(e);break;case 29:this.stateBeforeSpecialS(e);break;case 30:this.stateBeforeSpecialT(e);break;case 21:this.stateInAttrValueNoQuotes(e);break;case 7:this.stateInSelfClosingTag(e);break;case 23:this.stateInDeclaration(e);break;case 22:this.stateBeforeDeclaration(e);break;case 25:this.stateBeforeComment(e);break;case 24:this.stateInProcessingInstruction(e);break;case 33:this.stateInEntity();}this.index++;}this.cleanup(),this.finish();}cleanup(){this.sectionStart!==this.index&&(1===this.state||32===this.state&&0===this.sequenceIndex?(this.cbs.ontext(this.sectionStart,this.index),this.sectionStart=this.index):(19===this.state||20===this.state||21===this.state)&&(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=this.index));}finish(){this.handleTrailingData(),this.cbs.onend();}handleTrailingData(){let e=this.buffer.length;this.sectionStart>=e||(28===this.state?this.currentSequence===os.CdataEnd?this.cbs.oncdata(this.sectionStart,e):this.cbs.oncomment(this.sectionStart,e):6===this.state||11===this.state||18===this.state||17===this.state||12===this.state||13===this.state||14===this.state||15===this.state||16===this.state||20===this.state||19===this.state||21===this.state||9===this.state||this.cbs.ontext(this.sectionStart,e));}emitCodePoint(e,t){}}(oW,{onerr:o9,ontext(e,t){oQ(oG(e,t),e,t);},ontextentity(e,t,n){oQ(e,t,n);},oninterpolation(e,t){if(oH)return oQ(oG(e,t),e,t);let n=e+oK.delimiterOpen.length,r=t-oK.delimiterClose.length;for(;or(o$.charCodeAt(n));)n++;for(;or(o$.charCodeAt(r-1));)r--;let i=oG(n,r);i.includes("&")&&(i=oM.decodeEntities(i,!1)),o3({type:5,content:o5(i,!1,o4(n,r)),loc:o4(e,t)});},onopentagname(e,t){let n=oG(e,t);oD={type:1,tag:n,ns:oM.getNamespace(n,oW[0],oM.ns),tagType:0,props:[],children:[],loc:o4(e-1,t),codegenNode:void 0};},onopentagend(e){oX(e);},onclosetag(e,t){let n=oG(e,t);if(!oM.isVoidTag(n)){for(let e=0;e<oW.length;e++)if(oW[e].tag.toLowerCase()===n.toLowerCase()){e>0&&/* @__PURE__ *//*@__PURE__*/oW[0].loc.start.offset;for(let n=0;n<=e;n++)oZ(oW.shift(),t,n<e);break}}},onselfclosingtag(e){let t=oD.tag;oD.isSelfClosing=!0,oX(e),oW[0]&&oW[0].tag===t&&oZ(oW.shift(),e);},onattribname(e,t){oF={type:6,name:oG(e,t),nameLoc:o4(e,t),value:void 0,loc:o4(e)};},ondirname(e,t){let n=oG(e,t),r="."===n||":"===n?"bind":"@"===n?"on":"#"===n?"slot":n.slice(2);if(oH||""===r)oF={type:6,name:n,nameLoc:o4(e,t),value:void 0,loc:o4(e)};else if(oF={type:7,name:r,rawName:n,exp:void 0,arg:void 0,modifiers:"."===n?[s3("prop")]:[],loc:o4(e)},"pre"===r){oH=oK.inVPre=!0,oq=oD;let e=oD.props;for(let t=0;t<e.length;t++)7===e[t].type&&(e[t]=function(e){let t={type:6,name:e.rawName,nameLoc:o4(e.loc.start.offset,e.loc.start.offset+e.rawName.length),value:void 0,loc:e.loc};if(e.exp){let n=e.exp.loc;n.end.offset<e.loc.end.offset&&(n.start.offset--,n.start.column--,n.end.offset++,n.end.column++),t.value={type:2,content:e.exp.content,loc:n};}return t}(e[t]));}},ondirarg(e,t){if(e===t)return;let n=oG(e,t);if(oH)oF.name+=n,o8(oF.nameLoc,t);else {let r="["!==n[0];oF.arg=o5(r?n:n.slice(1,-1),r,o4(e,t),r?3:0);}},ondirmodifier(e,t){let n=oG(e,t);if(oH)oF.name+="."+n,o8(oF.nameLoc,t);else if("slot"===oF.name){let e=oF.arg;e&&(e.content+="."+n,o8(e.loc,t));}else {let r=s3(n,!0,o4(e,t));oF.modifiers.push(r);}},onattribdata(e,t){oV+=oG(e,t),oB<0&&(oB=e),oU=t;},onattribentity(e,t,n){oV+=e,oB<0&&(oB=t),oU=n;},onattribnameend(e){let t=oG(oF.loc.start.offset,e);7===oF.type&&(oF.rawName=t),oD.props.some(e=>(7===e.type?e.rawName:e.name)===t);},onattribend(e,t){oD&&oF&&(o8(oF.loc,t),0!==e&&(oV.includes("&")&&(oV=oM.decodeEntities(oV,!0)),6===oF.type?("class"===oF.name&&(oV=o6(oV).trim()),oF.value={type:2,content:oV,loc:1===e?o4(oB,oU):o4(oB-1,oU+1)},oK.inSFCRoot&&"template"===oD.tag&&"lang"===oF.name&&oV&&"html"!==oV&&oK.enterRCDATA(ol("</template"),0)):(oF.exp=o5(oV,!1,o4(oB,oU),0,0),"for"===oF.name&&(oF.forParseResult=function(e){let t=e.loc,n=e.content,r=n.match(oO);if(!r)return;let[,i,l]=r,s=(e,n,r=!1)=>{let i=t.start.offset+n,l=i+e.length;return o5(e,!1,o4(i,l),0,r?1:0)},o={source:s(l.trim(),n.indexOf(l,i.length)),value:void 0,key:void 0,index:void 0,finalized:!1},a=i.trim().replace(oJ,"").trim(),c=i.indexOf(a),u=a.match(oz);if(u){let e;a=a.replace(oz,"").trim();let t=u[1].trim();if(t&&(e=n.indexOf(t,c+a.length),o.key=s(t,e,!0)),u[2]){let r=u[2].trim();r&&(o.index=s(r,n.indexOf(r,o.key?e+t.length:c+a.length),!0));}}return a&&(o.value=s(a,c,!0)),o}(oF.exp)))),(7!==oF.type||"pre"!==oF.name)&&oD.props.push(oF)),oV="",oB=oU=-1;},oncomment(e,t){oM.comments&&o3({type:3,content:oG(e,t),loc:o4(e-4,t+3)});},onend(){let e=o$.length;for(let t=0;t<oW.length;t++)oZ(oW[t],e-1),/* @__PURE__ *//*@__PURE__*/oW[t].loc.start.offset;},oncdata(e,t){0!==oW[0].ns&&oQ(oG(e,t),e,t);},onprocessinginstruction(e){(oW[0]?oW[0].ns:oM.ns)===0&&o9(21,e-1);}}),oz=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,oJ=/^\(|\)$/g;function oG(e,t){return o$.slice(e,t)}function oX(e){oK.inSFCRoot&&(oD.innerLoc=o4(e+1,e+1)),o3(oD);let{tag:t,ns:n}=oD;0===n&&oM.isPreTag(t)&&oj++,oM.isVoidTag(t)?oZ(oD,e):(oW.unshift(oD),(1===n||2===n)&&(oK.inXML=!0)),oD=null;}function oQ(e,t,n){{let t=oW[0]&&oW[0].tag;"script"!==t&&"style"!==t&&e.includes("&")&&(e=oM.decodeEntities(e,!1));}let r=oW[0]||oL,i=r.children[r.children.length-1];i&&2===i.type?(i.content+=e,o8(i.loc,n)):r.children.push({type:2,content:e,loc:o4(t,n)});}function oZ(e,t,n=!1){n?o8(e.loc,oY(t,60)):o8(e.loc,function(e,t){let n=e;for(;62!==o$.charCodeAt(n)&&n<o$.length-1;)n++;return n}(t)+1),oK.inSFCRoot&&(e.children.length?e.innerLoc.end=k({},e.children[e.children.length-1].loc.end):e.innerLoc.end=k({},e.innerLoc.start),e.innerLoc.source=oG(e.innerLoc.start.offset,e.innerLoc.end.offset));let{tag:r,ns:i,children:l}=e;if(!oH&&("slot"===r?e.tagType=2:function({tag:e,props:t}){if("template"===e){for(let e=0;e<t.length;e++)if(7===t[e].type&&o0.has(t[e].name))return !0}return !1}(e)?e.tagType=3:function({tag:e,props:t}){var n;if(oM.isCustomElement(e))return !1;if("component"===e||(n=e.charCodeAt(0))>64&&n<91||od(e)||oM.isBuiltInComponent&&oM.isBuiltInComponent(e)||oM.isNativeTag&&!oM.isNativeTag(e))return !0;for(let e=0;e<t.length;e++){let n=t[e];if(6===n.type&&"is"===n.name&&n.value&&n.value.content.startsWith("vue:"))return !0}return !1}(e)&&(e.tagType=1)),oK.inRCDATA||(e.children=o2(l)),0===i&&oM.isIgnoreNewlineTag(r)){let e=l[0];e&&2===e.type&&(e.content=e.content.replace(/^\r?\n/,""));}0===i&&oM.isPreTag(r)&&oj--,oq===e&&(oH=oK.inVPre=!1,oq=null),oK.inXML&&(oW[0]?oW[0].ns:oM.ns)===0&&(oK.inXML=!1);}function oY(e,t){let n=e;for(;o$.charCodeAt(n)!==t&&n>=0;)n--;return n}let o0=/* @__PURE__ */new Set(["if","else","else-if","for","slot"]),o1=/\r\n/g;function o2(e,t){let n="preserve"!==oM.whitespace,r=!1;for(let t=0;t<e.length;t++){let i=e[t];if(2===i.type){if(oj)i.content=i.content.replace(o1,"\n");else if(function(e){for(let t=0;t<e.length;t++)if(!or(e.charCodeAt(t)))return !1;return !0}(i.content)){let l=e[t-1]&&e[t-1].type,s=e[t+1]&&e[t+1].type;!l||!s||n&&(3===l&&(3===s||1===s)||1===l&&(3===s||1===s&&function(e){for(let t=0;t<e.length;t++){let n=e.charCodeAt(t);if(10===n||13===n)return !0}return !1}(i.content)))?(r=!0,e[t]=null):i.content=" ";}else n&&(i.content=o6(i.content));}}return r?e.filter(Boolean):e}function o6(e){let t="",n=!1;for(let r=0;r<e.length;r++)or(e.charCodeAt(r))?n||(t+=" ",n=!0):(t+=e[r],n=!1);return t}function o3(e){(oW[0]||oL).children.push(e);}function o4(e,t){return {start:oK.getPos(e),end:null==t?t:oK.getPos(t),source:null==t?t:oG(e,t)}}function o8(e,t){e.end=oK.getPos(t),e.source=oG(e.start.offset,t);}function o5(e,t=!1,n,r=0,i=0){return s3(e,t,n,r)}function /*@__PURE__*/o9(e,t,n){oM.onError(/* @__PURE__ *//*@__PURE__*/oc(e,o4(t,t)));}function o7(e,t){let{children:n}=e;return 1===n.length&&1===t.type&&!ow(t)}function ae(e,t){let{constantCache:n}=t;switch(e.type){case 1:if(0!==e.tagType)return 0;let r=n.get(e);if(void 0!==r)return r;let i=e.codegenNode;if(13!==i.type||i.isBlock&&"svg"!==e.tag&&"foreignObject"!==e.tag&&"math"!==e.tag)return 0;if(void 0!==i.patchFlag)return n.set(e,0),0;{let r=3,c=an(e,t);if(0===c)return n.set(e,0),0;c<r&&(r=c);for(let i=0;i<e.children.length;i++){let l=ae(e.children[i],t);if(0===l)return n.set(e,0),0;l<r&&(r=l);}if(r>1)for(let i=0;i<e.props.length;i++){let l=e.props[i];if(7===l.type&&"bind"===l.name&&l.exp){let i=ae(l.exp,t);if(0===i)return n.set(e,0),0;i<r&&(r=i);}}if(i.isBlock){var l,s,o,a;for(let t=0;t<e.props.length;t++)if(7===e.props[t].type)return n.set(e,0),0;t.removeHelper(sv),t.removeHelper((l=t.inSSR,s=i.isComponent,l||s?sb:s_)),i.isBlock=!1,t.helper((o=t.inSSR,a=i.isComponent,o||a?sS:sx));}return n.set(e,r),r}case 2:case 3:return 3;case 9:case 11:case 10:default:return 0;case 5:case 12:return ae(e.content,t);case 4:return e.constType;case 8:let c=3;for(let n=0;n<e.children.length;n++){let r=e.children[n];if(M(r)||L(r))continue;let i=ae(r,t);if(0===i)return 0;i<c&&(c=i);}return c;case 20:return 2}}let at=/* @__PURE__ */new Set([s$,sD,sF,sV]);function an(e,t){let n=3,r=ar(e);if(r&&15===r.type){let{properties:e}=r;for(let r=0;r<e.length;r++){let i;let{key:l,value:s}=e[r],o=ae(l,t);if(0===o)return o;if(o<n&&(n=o),0===(i=4===s.type?ae(s,t):14===s.type?function e(t,n){if(14===t.type&&!M(t.callee)&&at.has(t.callee)){let r=t.arguments[0];if(4===r.type)return ae(r,n);if(14===r.type)return e(r,n)}return 0}(s,t):0))return i;i<n&&(n=i);}}return n}function ar(e){let t=e.codegenNode;if(13===t.type)return t.props}function ai(e,t){t.currentNode=e;let{nodeTransforms:n}=t,r=[];for(let i=0;i<n.length;i++){let l=n[i](e,t);if(l&&(A(l)?r.push(...l):r.push(l)),!t.currentNode)return;e=t.currentNode;}switch(e.type){case 3:t.ssr||t.helper(sC);break;case 5:t.ssr||t.helper(sM);break;case 9:for(let n=0;n<e.branches.length;n++)ai(e.branches[n],t);break;case 10:case 11:case 1:case 0:!function(e,t){let n=0,r=()=>{n--;};for(;n<e.children.length;n++){let i=e.children[n];M(i)||(t.grandParent=t.parent,t.parent=e,t.childIndex=n,t.onNodeRemoved=r,ai(i,t));}}(e,t);}t.currentNode=e;let i=r.length;for(;i--;)r[i]();}function al(e,t){let n=M(e)?t=>t===e:t=>e.test(t);return (e,r)=>{if(1===e.type){let{props:i}=e;if(3===e.tagType&&i.some(oT))return;let l=[];for(let s=0;s<i.length;s++){let o=i[s];if(7===o.type&&n(o.name)){i.splice(s,1),s--;let n=t(e,o,r);n&&l.push(n);}}return l}}}let as="/*@__PURE__*/",ao=e=>`${sZ[e]}: _${sZ[e]}`;function aa(e,t,{helper:n,push:r,newline:i,isTS:l}){let s=n("component"===t?sN:sA);for(let n=0;n<e.length;n++){let o=e[n],a=o.endsWith("__self");a&&(o=o.slice(0,-6)),r(`const ${oR(o,t)} = ${s}(${JSON.stringify(o)}${a?", true":""})${l?"!":""}`),n<e.length-1&&i();}}function ac(e,t){let n=e.length>3;t.push("["),n&&t.indent(),au(e,t,n),n&&t.deindent(),t.push("]");}function au(e,t,n=!1,r=!0){let{push:i,newline:l}=t;for(let s=0;s<e.length;s++){let o=e[s];M(o)?i(o,-3):A(o)?ac(o,t):ad(o,t),s<e.length-1&&(n?(r&&i(","),l()):r&&i(", "));}}function ad(e,t){if(M(e)){t.push(e,-3);return}if(L(e)){t.push(t.helper(e));return}switch(e.type){case 1:case 9:case 11:case 12:ad(e.codegenNode,t);break;case 2:!function(e,t){t.push(JSON.stringify(e.content),-3,e);}(e,t);break;case 4:ah(e,t);break;case 5:!function(e,t){let{push:n,helper:r,pure:i}=t;i&&n(as),n(`${r(sM)}(`),ad(e.content,t),n(")");}(e,t);break;case 8:af(e,t);break;case 3:!function(e,t){let{push:n,helper:r,pure:i}=t;i&&n(as),n(`${r(sC)}(${JSON.stringify(e.content)})`,-3,e);}(e,t);break;case 13:!function(e,t){let n;let{push:r,helper:i,pure:l}=t,{tag:s,props:o,children:a,patchFlag:c,dynamicProps:u,directives:d,isBlock:h,disableTracking:f,isComponent:p}=e;c&&(n=String(c)),d&&r(i(sI)+"("),h&&r(`(${i(sv)}(${f?"true":""}), `),l&&r(as),r(i(h?t.inSSR||p?sb:s_:t.inSSR||p?sS:sx)+"(",-2,e),au(function(e){let t=e.length;for(;t--&&null==e[t];);return e.slice(0,t+1).map(e=>e||"null")}([s,o,a,n,u]),t),r(")"),h&&r(")"),d&&(r(", "),ad(d,t),r(")"));}(e,t);break;case 14:!function(e,t){let{push:n,helper:r,pure:i}=t,l=M(e.callee)?e.callee:r(e.callee);i&&n(as),n(l+"(",-2,e),au(e.arguments,t),n(")");}(e,t);break;case 15:!function(e,t){let{push:n,indent:r,deindent:i,newline:l}=t,{properties:s}=e;if(!s.length){n("{}",-2,e);return}let o=s.length>1;n(o?"{":"{ "),o&&r();for(let e=0;e<s.length;e++){let{key:r,value:i}=s[e];!function(e,t){let{push:n}=t;8===e.type?(n("["),af(e,t),n("]")):e.isStatic?n(of(e.content)?e.content:JSON.stringify(e.content),-2,e):n(`[${e.content}]`,-3,e);}(r,t),n(": "),ad(i,t),e<s.length-1&&(n(","),l());}o&&i(),n(o?"}":" }");}(e,t);break;case 17:ac(e.elements,t);break;case 18:!function(e,t){let{push:n,indent:r,deindent:i}=t,{params:l,returns:s,body:o,newline:a,isSlot:c}=e;c&&n(`_${sZ[sz]}(`),n("(",-2,e),A(l)?au(l,t):l&&ad(l,t),n(") => "),(a||o)&&(n("{"),r()),s?(a&&n("return "),A(s)?ac(s,t):ad(s,t)):o&&ad(o,t),(a||o)&&(i(),n("}")),c&&n(")");}(e,t);break;case 19:!function(e,t){let{test:n,consequent:r,alternate:i,newline:l}=e,{push:s,indent:o,deindent:a,newline:c}=t;if(4===n.type){let e=!of(n.content);e&&s("("),ah(n,t),e&&s(")");}else s("("),ad(n,t),s(")");l&&o(),t.indentLevel++,l||s(" "),s("? "),ad(r,t),t.indentLevel--,l&&c(),l||s(" "),s(": ");let u=19===i.type;!u&&t.indentLevel++,ad(i,t),!u&&t.indentLevel--,l&&a(!0);}(e,t);break;case 20:!function(e,t){let{push:n,helper:r,indent:i,deindent:l,newline:s}=t,{needPauseTracking:o,needArraySpread:a}=e;a&&n("[...("),n(`_cache[${e.index}] || (`),o&&(i(),n(`${r(sq)}(-1),`),s(),n("(")),n(`_cache[${e.index}] = `),ad(e.value,t),o&&(n(`).cacheIndex = ${e.index},`),s(),n(`${r(sq)}(1),`),s(),n(`_cache[${e.index}]`),l()),n(")"),a&&n(")]");}(e,t);break;case 21:au(e.body,t,!0,!1);}}function ah(e,t){let{content:n,isStatic:r}=e;t.push(r?JSON.stringify(n):n,-3,e);}function af(e,t){for(let n=0;n<e.children.length;n++){let r=e.children[n];M(r)?t.push(r,-3):ad(r,t);}}let ap=al(/^(if|else|else-if)$/,(e,t,n)=>(function(e,t,n,r){if("else"!==t.name&&(!t.exp||!t.exp.content.trim())){let r=t.exp?t.exp.loc:e.loc;n.onError(/* @__PURE__ *//*@__PURE__*/oc(28,t.loc)),t.exp=s3("true",!1,r);}if("if"===t.name){let i=am(e,t),l={type:9,loc:e.loc,branches:[i]};if(n.replaceNode(l),r)return r(l,i,!0)}else {let i=n.parent.children,l=i.indexOf(e);for(;l-- >=-1;){let s=i[l];if(s&&3===s.type||s&&2===s.type&&!s.content.trim().length){n.removeNode(s);continue}if(s&&9===s.type){"else-if"===t.name&&void 0===s.branches[s.branches.length-1].condition&&n.onError(/* @__PURE__ *//*@__PURE__*/oc(30,e.loc)),n.removeNode();let i=am(e,t);s.branches.push(i);let l=r&&r(s,i,!1);ai(i,n),l&&l(),n.currentNode=null;}else n.onError(/* @__PURE__ *//*@__PURE__*/oc(30,e.loc));break}}})(e,t,n,(e,t,r)=>{let i=n.parent.children,l=i.indexOf(e),s=0;for(;l-- >=0;){let e=i[l];e&&9===e.type&&(s+=e.branches.length);}return ()=>{r?e.codegenNode=ag(t,s,n):function(e){for(;;)if(19===e.type){if(19!==e.alternate.type)return e;e=e.alternate;}else 20===e.type&&(e=e.value);}(e.codegenNode).alternate=ag(t,s+e.branches.length-1,n);}}));function am(e,t){let n=3===e.tagType;return {type:10,loc:e.loc,condition:"else"===t.name?void 0:t.exp,children:n&&!oS(e,"for")?e.children:[e],userKey:ox(e,"key"),isTemplateIf:n}}function ag(e,t,n){return e.condition?s9(e.condition,ay(e,t,n),s8(n.helper(sC),['""',"true"])):ay(e,t,n)}function ay(e,t,n){let{helper:r}=n,i=s6("key",s3(`${t}`,!1,sY,2)),{children:l}=e,s=l[0];if(1!==l.length||1!==s.type){if(1!==l.length||11!==s.type)return s0(n,r(sf),s2([i]),l,64,void 0,void 0,!0,!1,!1,e.loc);{let e=s.codegenNode;return oE(e,i,n),e}}{let e=s.codegenNode,t=14===e.type&&e.callee===sX?e.arguments[1].returns:e;return 13===t.type&&s7(t,n),oE(t,i,n),e}}let av=(e,t,n)=>{let{modifiers:r,loc:i}=e,l=e.arg,{exp:s}=e;if(s&&4===s.type&&!s.content.trim()&&(s=void 0),!s){if(4!==l.type||!l.isStatic)return n.onError(oc(52,l.loc)),{props:[s6(l,s3("",!0,i))]};ab(e),s=e.exp;}return 4!==l.type?(l.children.unshift("("),l.children.push(') || ""')):l.isStatic||(l.content=`${l.content} || ""`),r.some(e=>"camel"===e.content)&&(4===l.type?l.isStatic?l.content=z(l.content):l.content=`${n.helperString(sU)}(${l.content})`:(l.children.unshift(`${n.helperString(sU)}(`),l.children.push(")"))),!n.inSSR&&(r.some(e=>"prop"===e.content)&&a_(l,"."),r.some(e=>"attr"===e.content)&&a_(l,"^")),{props:[s6(l,s)]}},ab=(e,t)=>{let n=e.arg,r=z(n.content);e.exp=s3(r,!1,n.loc);},a_=(e,t)=>{4===e.type?e.isStatic?e.content=t+e.content:e.content=`\`${t}\${${e.content}}\``:(e.children.unshift(`'${t}' + (`),e.children.push(")"));},aS=al("for",(e,t,n)=>{let{helper:r,removeHelper:i}=n;return function(e,t,n,r){if(!t.exp){n.onError(/* @__PURE__ *//*@__PURE__*/oc(31,t.loc));return}let i=t.forParseResult;if(!i){n.onError(/* @__PURE__ *//*@__PURE__*/oc(32,t.loc));return}ax(i);let{addIdentifiers:l,removeIdentifiers:s,scopes:o}=n,{source:a,value:c,key:u,index:d}=i,h={type:11,loc:t.loc,source:a,valueAlias:c,keyAlias:u,objectIndexAlias:d,parseResult:i,children:oN(e)?e.children:[e]};n.replaceNode(h),o.vFor++;let f=r&&r(h);return ()=>{o.vFor--,f&&f();}}(e,t,n,t=>{let l=s8(r(sR),[t.source]),s=oN(e),o=oS(e,"memo"),a=ox(e,"key",!1,!0);a&&7===a.type&&!a.exp&&ab(a);let c=a&&(6===a.type?a.value?s3(a.value.content,!0):void 0:a.exp),u=a&&c?s6("key",c):null,d=4===t.source.type&&t.source.constType>0,h=d?64:a?128:256;return t.codegenNode=s0(n,r(sf),void 0,l,h,void 0,void 0,!0,!d,!1,e.loc),()=>{let a;let{children:h}=t,f=1!==h.length||1!==h[0].type,p=ow(e)?e:s&&1===e.children.length&&ow(e.children[0])?e.children[0]:null;if(p)a=p.codegenNode,s&&u&&oE(a,u,n);else if(f)a=s0(n,r(sf),u?s2([u]):void 0,e.children,64,void 0,void 0,!0,void 0,!1);else {var m,g,y,b,_,S,x,C;a=h[0].codegenNode,s&&u&&oE(a,u,n),!d!==a.isBlock&&(a.isBlock?(i(sv),i((m=n.inSSR,g=a.isComponent,m||g?sb:s_))):i((y=n.inSSR,b=a.isComponent,y||b?sS:sx))),(a.isBlock=!d,a.isBlock)?(r(sv),r((_=n.inSSR,S=a.isComponent,_||S?sb:s_))):r((x=n.inSSR,C=a.isComponent,x||C?sS:sx));}if(o){let e=s5(aC(t.parseResult,[s3("_cached")]));e.body={type:21,body:[s4(["const _memo = (",o.exp,")"]),s4(["if (_cached",...c?[" && _cached.key === ",c]:[],` && ${n.helperString(sQ)}(_cached, _memo)) return _cached`]),s4(["const _item = ",a]),s3("_item.memo = _memo"),s3("return _item")],loc:sY},l.arguments.push(e,s3("_cache"),s3(String(n.cached.length))),n.cached.push(null);}else l.arguments.push(s5(aC(t.parseResult),a,!0));}})});function ax(e,t){e.finalized||(e.finalized=!0);}function aC({value:e,key:t,index:n},r=[]){return function(e){let t=e.length;for(;t--&&!e[t];);return e.slice(0,t+1).map((e,t)=>e||s3("_".repeat(t+1),!1))}([e,t,n,...r])}let ak=s3("undefined",!1),aT=(e,t)=>{if(1===e.type&&(1===e.tagType||3===e.tagType)){let n=oS(e,"slot");if(n)return n.exp,t.scopes.vSlot++,()=>{t.scopes.vSlot--;}}},aN=(e,t,n,r)=>s5(e,n,!1,!0,n.length?n[0].loc:r);function aw(e,t,n){let r=[s6("name",e),s6("fn",t)];return null!=n&&r.push(s6("key",s3(String(n),!0))),s2(r)}let aA=/* @__PURE__ */new WeakMap,aE=(e,t)=>function(){let n,r,i,l,s;if(!(1===(e=t.currentNode).type&&(0===e.tagType||1===e.tagType)))return;let{tag:o,props:a}=e,c=1===e.tagType,u=c?function(e,t,n=!1){let{tag:r}=e,i=aO(r),l=ox(e,"is",!1,!0);if(l){if(i){let e;if(6===l.type?e=l.value&&s3(l.value.content,!0):(e=l.exp)||(e=s3("is",!1,l.arg.loc)),e)return s8(t.helper(sw),[e])}else 6===l.type&&l.value.content.startsWith("vue:")&&(r=l.value.content.slice(4));}let s=od(r)||t.isBuiltInComponent(r);return s?(n||t.helper(s),s):(t.helper(sN),t.components.add(r),oR(r,"component"))}(e,t):`"${o}"`,d=$(u)&&u.callee===sw,h=0,f=d||u===sp||u===sm||!c&&("svg"===o||"foreignObject"===o||"math"===o);if(a.length>0){let r=aI(e,t,void 0,c,d);n=r.props,h=r.patchFlag,l=r.dynamicPropNames;let i=r.directives;s=i&&i.length?s1(i.map(e=>(function(e,t){let n=[],r=aA.get(e);r?n.push(t.helperString(r)):(t.helper(sA),t.directives.add(e.name),n.push(oR(e.name,"directive")));let{loc:i}=e;if(e.exp&&n.push(e.exp),e.arg&&(e.exp||n.push("void 0"),n.push(e.arg)),Object.keys(e.modifiers).length){e.arg||(e.exp||n.push("void 0"),n.push("void 0"));let t=s3("true",!1,i);n.push(s2(e.modifiers.map(e=>s6(e,t)),i));}return s1(n,e.loc)})(e,t))):void 0,r.shouldUseBlock&&(f=!0);}if(e.children.length>0){if(u===sg&&(f=!0,h|=1024),c&&u!==sp&&u!==sg){let{slots:n,hasDynamicSlots:i}=function(e,t,n=aN){t.helper(sz);let{children:r,loc:i}=e,l=[],s=[],o=t.scopes.vSlot>0||t.scopes.vFor>0,a=oS(e,"slot",!0);if(a){let{arg:e,exp:t}=a;e&&!ou(e)&&(o=!0),l.push(s6(e||s3("default",!0),n(t,void 0,r,i)));}let c=!1,u=!1,d=[],h=/* @__PURE__ */new Set,f=0;for(let e=0;e<r.length;e++){let i,p,m,g;let y=r[e];if(!oN(y)||!(i=oS(y,"slot",!0))){3!==y.type&&d.push(y);continue}if(a){t.onError(/* @__PURE__ *//*@__PURE__*/oc(37,i.loc));break}c=!0;let{children:b,loc:_}=y,{arg:S=s3("default",!0),exp:x,loc:C}=i;ou(S)?p=S?S.content:"default":o=!0;let k=oS(y,"for"),T=n(x,k,b,_);if(m=oS(y,"if"))o=!0,s.push(s9(m.exp,aw(S,T,f++),ak));else if(g=oS(y,/^else(-if)?$/,!0)){let n,i=e;for(;i--&&3===(n=r[i]).type;);if(n&&oN(n)&&oS(n,/^(else-)?if$/)){let e=s[s.length-1];for(;19===e.alternate.type;)e=e.alternate;e.alternate=g.exp?s9(g.exp,aw(S,T,f++),ak):aw(S,T,f++);}else t.onError(/* @__PURE__ *//*@__PURE__*/oc(30,g.loc));}else if(k){o=!0;let e=k.forParseResult;e?(ax(e),s.push(s8(t.helper(sR),[e.source,s5(aC(e),aw(S,T),!0)]))):t.onError(oc(32,k.loc));}else {if(p){if(h.has(p)){t.onError(oc(38,C));continue}h.add(p),"default"===p&&(u=!0);}l.push(s6(S,T));}}if(!a){let e=(e,t)=>s6("default",n(e,void 0,t,i));c?d.length&&d.some(e=>(function e(t){return 2!==t.type&&12!==t.type||(2===t.type?!!t.content.trim():e(t.content))})(e))&&(u?t.onError(oc(39,d[0].loc)):l.push(e(void 0,d))):l.push(e(void 0,r));}let p=o?2:!function e(t){for(let n=0;n<t.length;n++){let r=t[n];switch(r.type){case 1:if(2===r.tagType||e(r.children))return !0;break;case 9:if(e(r.branches))return !0;break;case 10:case 11:if(e(r.children))return !0}}return !1}(e.children)?1:3,m=s2(l.concat(s6("_",s3(p+"",!1))),i);return s.length&&(m=s8(t.helper(sP),[m,s1(s)])),{slots:m,hasDynamicSlots:o}}(e,t);r=n,i&&(h|=1024);}else if(1===e.children.length&&u!==sp){let n=e.children[0],i=n.type,l=5===i||8===i;l&&0===ae(n,t)&&(h|=1),r=l||2===i?n:e.children;}else r=e.children;}l&&l.length&&(i=function(e){let t="[";for(let n=0,r=e.length;n<r;n++)t+=JSON.stringify(e[n]),n<r-1&&(t+=", ");return t+"]"}(l)),e.codegenNode=s0(t,u,n,r,0===h?void 0:h,i,s,!!f,!1,c,e.loc);};function aI(e,t,n=e.props,r,i,l=!1){let s;let{tag:o,loc:a,children:c}=e,u=[],d=[],h=[],f=c.length>0,p=!1,m=0,g=!1,y=!1,b=!1,_=!1,S=!1,C=!1,k=[],T=e=>{u.length&&(d.push(s2(aR(u),a)),u=[]),e&&d.push(e);},N=()=>{t.scopes.vFor>0&&u.push(s6(s3("ref_for",!0),s3("true")));},w=({key:e,value:n})=>{if(ou(e)){let l=e.content,s=x(l);s&&(!r||i)&&"onclick"!==l.toLowerCase()&&"onUpdate:modelValue"!==l&&!H(l)&&(_=!0),s&&H(l)&&(C=!0),s&&14===n.type&&(n=n.arguments[0]),20===n.type||(4===n.type||8===n.type)&&ae(n,t)>0||("ref"===l?g=!0:"class"===l?y=!0:"style"===l?b=!0:"key"===l||k.includes(l)||k.push(l),r&&("class"===l||"style"===l)&&!k.includes(l)&&k.push(l));}else S=!0;};for(let i=0;i<n.length;i++){let s=n[i];if(6===s.type){let{loc:e,name:t,nameLoc:n,value:r}=s;if("ref"===t&&(g=!0,N()),"is"===t&&(aO(o)||r&&r.content.startsWith("vue:")))continue;u.push(s6(s3(t,!0,n),s3(r?r.content:"",!0,r?r.loc:e)));}else {let{name:n,arg:i,exp:c,loc:g,modifiers:y}=s,b="bind"===n,_="on"===n;if("slot"===n){r||t.onError(/* @__PURE__ *//*@__PURE__*/oc(40,g));continue}if("once"===n||"memo"===n||"is"===n||b&&oC(i,"is")&&aO(o)||_&&l)continue;if((b&&oC(i,"key")||_&&f&&oC(i,"vue:before-update"))&&(p=!0),b&&oC(i,"ref")&&N(),!i&&(b||_)){S=!0,c?b?(N(),T(),d.push(c)):T({type:14,loc:g,callee:t.helper(sB),arguments:r?[c]:[c,"true"]}):t.onError(oc(b?34:35,g));continue}b&&y.some(e=>"prop"===e.content)&&(m|=32);let x=t.directiveTransforms[n];if(x){let{props:n,needRuntime:r}=x(s,e,t);l||n.forEach(w),_&&i&&!ou(i)?T(s2(n,a)):u.push(...n),r&&(h.push(s),L(r)&&aA.set(s,r));}else !q(n)&&(h.push(s),f&&(p=!0));}}if(d.length?(T(),s=d.length>1?s8(t.helper(sL),d,a):d[0]):u.length&&(s=s2(aR(u),a)),S?m|=16:(y&&!r&&(m|=2),b&&!r&&(m|=4),k.length&&(m|=8),_&&(m|=32)),!p&&(0===m||32===m)&&(g||C||h.length>0)&&(m|=512),!t.inSSR&&s)switch(s.type){case 15:let A=-1,E=-1,I=!1;for(let e=0;e<s.properties.length;e++){let t=s.properties[e].key;ou(t)?"class"===t.content?A=e:"style"===t.content&&(E=e):t.isHandlerKey||(I=!0);}let R=s.properties[A],O=s.properties[E];I?s=s8(t.helper(sF),[s]):(R&&!ou(R.value)&&(R.value=s8(t.helper(s$),[R.value])),O&&(b||4===O.value.type&&"["===O.value.content.trim()[0]||17===O.value.type)&&(O.value=s8(t.helper(sD),[O.value])));break;case 14:break;default:s=s8(t.helper(sF),[s8(t.helper(sV),[s])]);}return {props:s,directives:h,patchFlag:m,dynamicPropNames:k,shouldUseBlock:p}}function aR(e){let t=/* @__PURE__ */new Map,n=[];for(let r=0;r<e.length;r++){let i=e[r];if(8===i.key.type||!i.key.isStatic){n.push(i);continue}let l=i.key.content,s=t.get(l);s?("style"===l||"class"===l||x(l))&&(17===s.value.type?s.value.elements.push(i.value):s.value=s1([s.value,i.value],s.loc)):(t.set(l,i),n.push(i));}return n}function aO(e){return "component"===e||"Component"===e}let aP=(e,t)=>{if(ow(e)){let{children:n,loc:r}=e,{slotName:i,slotProps:l}=function(e,t){let n,r='"default"',i=[];for(let t=0;t<e.props.length;t++){let n=e.props[t];if(6===n.type)n.value&&("name"===n.name?r=JSON.stringify(n.value.content):(n.name=z(n.name),i.push(n)));else if("bind"===n.name&&oC(n.arg,"name")){if(n.exp)r=n.exp;else if(n.arg&&4===n.arg.type){let e=z(n.arg.content);r=n.exp=s3(e,!1,n.arg.loc);}}else "bind"===n.name&&n.arg&&ou(n.arg)&&(n.arg.content=z(n.arg.content)),i.push(n);}if(i.length>0){let{props:r,directives:l}=aI(e,t,i,!1,!1);n=r,l.length&&t.onError(oc(36,l[0].loc));}return {slotName:r,slotProps:n}}(e,t),s=[t.prefixIdentifiers?"_ctx.$slots":"$slots",i,"{}","undefined","true"],o=2;l&&(s[2]=l,o=3),n.length&&(s[3]=s5([],n,!1,!1,r),o=4),t.scopeId&&!t.slotted&&(o=5),s.splice(o),e.codegenNode=s8(t.helper(sO),s,r);}},aM=(e,t,n,r)=>{let i;let{loc:l,modifiers:s,arg:o}=e;if(e.exp||s.length,4===o.type){if(o.isStatic){let e=o.content;e.startsWith("vue:")&&(e=`vnode-${e.slice(4)}`),i=s3(0!==t.tagType||e.startsWith("vnode")||!/[A-Z]/.test(e)?Q(z(e)):`on:${e}`,!0,o.loc);}else i=s4([`${n.helperString(sH)}(`,o,")"]);}else (i=o).children.unshift(`${n.helperString(sH)}(`),i.children.push(")");let a=e.exp;a&&!a.content.trim()&&(a=void 0);let c=n.cacheHandlers&&!a&&!n.inVOnce;if(a){let e=ov(a),t=!(e||o_(a)),n=a.content.includes(";");(t||c&&e)&&(a=s4([`${t?"$event":"(...args)"} => ${n?"{":"("}`,a,n?"}":")"]));}let u={props:[s6(i,a||s3("() => {}",!1,l))]};return r&&(u=r(u)),c&&(u.props[0].value=n.cache(u.props[0].value)),u.props.forEach(e=>e.key.isHandlerKey=!0),u},aL=(e,t)=>{if(0===e.type||1===e.type||11===e.type||10===e.type)return ()=>{let n;let r=e.children,i=!1;for(let e=0;e<r.length;e++){let t=r[e];if(ok(t)){i=!0;for(let i=e+1;i<r.length;i++){let l=r[i];if(ok(l))n||(n=r[e]=s4([t],t.loc)),n.children.push(" + ",l),r.splice(i,1),i--;else {n=void 0;break}}}}if(i&&(1!==r.length||0!==e.type&&(1!==e.type||0!==e.tagType||e.props.find(e=>7===e.type&&!t.directiveTransforms[e.name]))))for(let e=0;e<r.length;e++){let n=r[e];if(ok(n)||8===n.type){let i=[];(2!==n.type||" "!==n.content)&&i.push(n),t.ssr||0!==ae(n,t)||i.push("1"),r[e]={type:12,content:n,loc:n.loc,codegenNode:s8(t.helper(sk),i)};}}}},a$=/* @__PURE__ */new WeakSet,aD=(e,t)=>{if(1===e.type&&oS(e,"once",!0)&&!a$.has(e)&&!t.inVOnce&&!t.inSSR)return a$.add(e),t.inVOnce=!0,t.helper(sq),()=>{t.inVOnce=!1;let e=t.currentNode;e.codegenNode&&(e.codegenNode=t.cache(e.codegenNode,!0));}},aF=(e,t,n)=>{let r;let{exp:i,arg:l}=e;if(!i)return n.onError(/* @__PURE__ *//*@__PURE__*/oc(41,e.loc)),aV();let s=i.loc.source.trim(),o=4===i.type?i.content:s,a=n.bindingMetadata[s];if("props"===a||"props-aliased"===a)return /* @__PURE__ */i.loc,aV();if(!o.trim()||!ov(i))return n.onError(/* @__PURE__ *//*@__PURE__*/oc(42,i.loc)),aV();let c=l||s3("modelValue",!0),u=l?ou(l)?`onUpdate:${z(l.content)}`:s4(['"onUpdate:" + ',l]):"onUpdate:modelValue",d=n.isTS?"($event: any)":"$event";r=s4([`${d} => ((`,i,") = $event)"]);let h=[s6(c,e.exp),s6(u,r)];if(e.modifiers.length&&1===t.tagType){let t=e.modifiers.map(e=>e.content).map(e=>(of(e)?e:JSON.stringify(e))+": true").join(", "),n=l?ou(l)?`${l.content}Modifiers`:s4([l,' + "Modifiers"']):"modelModifiers";h.push(s6(n,s3(`{ ${t} }`,!1,e.loc,2)));}return aV(h)};function aV(e=[]){return {props:e}}let aB=/* @__PURE__ */new WeakSet,aU=(e,t)=>{if(1===e.type){let n=oS(e,"memo");if(!(!n||aB.has(e)))return aB.add(e),()=>{let r=e.codegenNode||t.currentNode.codegenNode;r&&13===r.type&&(1!==e.tagType&&s7(r,t),e.codegenNode=s8(t.helper(sX),[n.exp,s5(void 0,r),"_cache",String(t.cached.length)]),t.cached.push(null));}}},aj=Symbol(""),aH=Symbol(""),aq=Symbol(""),aW=Symbol(""),aK=Symbol(""),az=Symbol(""),aJ=Symbol(""),aG=Symbol(""),aX=Symbol(""),aQ=Symbol("");!function(e){Object.getOwnPropertySymbols(e).forEach(t=>{sZ[t]=e[t];});}({[aj]:"vModelRadio",[aH]:"vModelCheckbox",[aq]:"vModelText",[aW]:"vModelSelect",[aK]:"vModelDynamic",[az]:"withModifiers",[aJ]:"withKeys",[aG]:"vShow",[aX]:"Transition",[aQ]:"TransitionGroup"});let aZ={parseMode:"html",isVoidTag:ep,isNativeTag:e=>ed(e)||eh(e)||ef(e),isPreTag:e=>"pre"===e,isIgnoreNewlineTag:e=>"pre"===e||"textarea"===e,decodeEntities:function(e,t=!1){return (f||(f=document.createElement("div")),t)?(f.innerHTML=`<div foo="${e.replace(/"/g,"&quot;")}">`,f.children[0].getAttribute("foo")):(f.innerHTML=e,f.textContent)},isBuiltInComponent:e=>"Transition"===e||"transition"===e?aX:"TransitionGroup"===e||"transition-group"===e?aQ:void 0,getNamespace(e,t,n){let r=t?t.ns:n;if(t&&2===r){if("annotation-xml"===t.tag){if("svg"===e)return 1;t.props.some(e=>6===e.type&&"encoding"===e.name&&null!=e.value&&("text/html"===e.value.content||"application/xhtml+xml"===e.value.content))&&(r=0);}else /^m(?:[ions]|text)$/.test(t.tag)&&"mglyph"!==e&&"malignmark"!==e&&(r=0);}else t&&1===r&&("foreignObject"===t.tag||"desc"===t.tag||"title"===t.tag)&&(r=0);if(0===r){if("svg"===e)return 1;if("math"===e)return 2}return r}},aY=(e,t)=>s3(JSON.stringify(ec(e)),!1,t,3),a0=/* @__PURE__ */g("passive,once,capture"),a1=/* @__PURE__ */g("stop,prevent,self,ctrl,shift,alt,meta,exact,middle"),a2=/* @__PURE__ */g("left,right"),a6=/* @__PURE__ */g("onkeyup,onkeydown,onkeypress"),a3=(e,t,n,r)=>{let i=[],l=[],s=[];for(let n=0;n<t.length;n++){let r=t[n].content;a0(r)?s.push(r):a2(r)?ou(e)?a6(e.content.toLowerCase())?i.push(r):l.push(r):(i.push(r),l.push(r)):a1(r)?l.push(r):i.push(r);}return {keyModifiers:i,nonKeyModifiers:l,eventOptionModifiers:s}},a4=(e,t)=>ou(e)&&"onclick"===e.content.toLowerCase()?s3(t,!0):4!==e.type?s4(["(",e,`) === "onClick" ? "${t}" : (`,e,")"]):e,a8=(e,t)=>{1===e.type&&0===e.tagType&&("script"===e.tag||"style"===e.tag)&&t.removeNode();},a5=[e=>{1===e.type&&e.props.forEach((t,n)=>{6===t.type&&"style"===t.name&&t.value&&(e.props[n]={type:7,name:"bind",arg:s3("style",!0,t.loc),exp:aY(t.value.content,t.loc),modifiers:[],loc:t.loc});});}],a9={cloak:()=>({props:[]}),html:(e,t,n)=>{let{exp:r,loc:i}=e;return r||n.onError(oc(53,i)),t.children.length&&(n.onError(oc(54,i)),t.children.length=0),{props:[s6(s3("innerHTML",!0,i),r||s3("",!0))]}},text:(e,t,n)=>{let{exp:r,loc:i}=e;return r||n.onError(oc(55,i)),t.children.length&&(n.onError(oc(56,i)),t.children.length=0),{props:[s6(s3("textContent",!0),r?ae(r,n)>0?r:s8(n.helperString(sM),[r],i):s3("",!0))]}},model:(e,t,n)=>{let r=aF(e,t,n);if(!r.props.length||1===t.tagType)return r;e.arg&&n.onError(oc(58,e.arg.loc));let{tag:i}=t,l=n.isCustomElement(i);if("input"===i||"textarea"===i||"select"===i||l){let s=aq,o=!1;if("input"===i||l){let r=ox(t,"type");if(r){if(7===r.type)s=aK;else if(r.value)switch(r.value.content){case"radio":s=aj;break;case"checkbox":s=aH;break;case"file":o=!0,n.onError(oc(59,e.loc));}}else t.props.some(e=>7===e.type&&"bind"===e.name&&(!e.arg||4!==e.arg.type||!e.arg.isStatic))&&(s=aK);}else "select"===i&&(s=aW);o||(r.needRuntime=n.helper(s));}else n.onError(oc(57,e.loc));return r.props=r.props.filter(e=>!(4===e.key.type&&"modelValue"===e.key.content)),r},on:(e,t,n)=>aM(e,t,n,t=>{let{modifiers:r}=e;if(!r.length)return t;let{key:i,value:l}=t.props[0],{keyModifiers:s,nonKeyModifiers:o,eventOptionModifiers:a}=a3(i,r,n,e.loc);if(o.includes("right")&&(i=a4(i,"onContextmenu")),o.includes("middle")&&(i=a4(i,"onMouseup")),o.length&&(l=s8(n.helper(az),[l,JSON.stringify(o)])),s.length&&(!ou(i)||a6(i.content.toLowerCase()))&&(l=s8(n.helper(aJ),[l,JSON.stringify(s)])),a.length){let e=a.map(X).join("");i=ou(i)?s3(`${i.content}${e}`,!0):s4(["(",i,`) + "${e}"`]);}return {props:[s6(i,l)]}}),show:(e,t,n)=>{let{exp:r,loc:i}=e;return !r&&n.onError(oc(61,i)),{props:[],needRuntime:n.helper(aG)}}},a7=/* @__PURE__ */Object.create(null);function ce(e,t){if(!M(e)){if(!e.nodeType)return _;e=e.innerHTML;}let n=e+JSON.stringify(t,(e,t)=>"function"==typeof t?t.toString():t),r=a7[n];if(r)return r;if("#"===e[0]){let t=document.querySelector(e);e=t?t.innerHTML:"";}let i=k({hoistStatic:!0,onError:void 0,onWarn:_},t);i.isCustomElement||"undefined"==typeof customElements||(i.isCustomElement=e=>!!customElements.get(e));let{code:l}=function(e,t={}){return function(e,t={}){let n=t.onError||oo,r="module"===t.mode;!0===t.prefixIdentifiers?n(/* @__PURE__ *//*@__PURE__*/oc(47)):r&&n(/* @__PURE__ *//*@__PURE__*/oc(48)),t.cacheHandlers&&n(/* @__PURE__ *//*@__PURE__*/oc(49)),t.scopeId&&!r&&n(/* @__PURE__ *//*@__PURE__*/oc(50));let i=k({},t,{prefixIdentifiers:!1}),l=M(e)?function(e,t){if(oK.reset(),oD=null,oF=null,oV="",oB=-1,oU=-1,oW.length=0,o$=e,oM=k({},oP),t){let e;for(e in t)null!=t[e]&&(oM[e]=t[e]);}oK.mode="html"===oM.parseMode?1:"sfc"===oM.parseMode?2:0,oK.inXML=1===oM.ns||2===oM.ns;let n=t&&t.delimiters;n&&(oK.delimiterOpen=ol(n[0]),oK.delimiterClose=ol(n[1]));let r=oL=function(e,t=""){return {type:0,source:t,children:e,helpers:/* @__PURE__ */new Set,components:[],directives:[],hoists:[],imports:[],cached:[],temps:0,codegenNode:void 0,loc:sY}}([],e);return oK.parse(o$),r.loc=o4(0,e.length),r.children=o2(r.children),oL=null,r}(e,i):e,[s,o]=[[aD,ap,aU,aS,aP,aE,aT,aL],{on:aM,bind:av,model:aF}];return !function(e,t){let n=function(e,{filename:t="",prefixIdentifiers:n=!1,hoistStatic:r=!1,hmr:i=!1,cacheHandlers:l=!1,nodeTransforms:s=[],directiveTransforms:o={},transformHoist:a=null,isBuiltInComponent:c=_,isCustomElement:u=_,expressionPlugins:d=[],scopeId:h=null,slotted:f=!0,ssr:p=!1,inSSR:m=!1,ssrCssVars:g="",bindingMetadata:b=y,inline:S=!1,isTS:x=!1,onError:C=oo,onWarn:k=oa,compatConfig:T}){let N=t.replace(/\?.*$/,"").match(/([^/\\]+)\.\w+$/),w={filename:t,selfName:N&&X(z(N[1])),prefixIdentifiers:n,hoistStatic:r,hmr:i,cacheHandlers:l,nodeTransforms:s,directiveTransforms:o,transformHoist:a,isBuiltInComponent:c,isCustomElement:u,expressionPlugins:d,scopeId:h,slotted:f,ssr:p,inSSR:m,ssrCssVars:g,bindingMetadata:b,inline:S,isTS:x,onError:C,onWarn:k,compatConfig:T,root:e,helpers:/* @__PURE__ */new Map,components:/* @__PURE__ */new Set,directives:/* @__PURE__ */new Set,hoists:[],imports:[],cached:[],constantCache:/* @__PURE__ */new WeakMap,temps:0,identifiers:/* @__PURE__ */Object.create(null),scopes:{vFor:0,vSlot:0,vPre:0,vOnce:0},parent:null,grandParent:null,currentNode:e,childIndex:0,inVOnce:!1,helper(e){let t=w.helpers.get(e)||0;return w.helpers.set(e,t+1),e},removeHelper(e){let t=w.helpers.get(e);if(t){let n=t-1;n?w.helpers.set(e,n):w.helpers.delete(e);}},helperString:e=>`_${sZ[w.helper(e)]}`,replaceNode(e){w.parent.children[w.childIndex]=w.currentNode=e;},removeNode(e){let t=w.parent.children,n=e?t.indexOf(e):w.currentNode?w.childIndex:-1;e&&e!==w.currentNode?w.childIndex>n&&(w.childIndex--,w.onNodeRemoved()):(w.currentNode=null,w.onNodeRemoved()),w.parent.children.splice(n,1);},onNodeRemoved:_,addIdentifiers(e){},removeIdentifiers(e){},hoist(e){M(e)&&(e=s3(e)),w.hoists.push(e);let t=s3(`_hoisted_${w.hoists.length}`,!1,e.loc,2);return t.hoisted=e,t},cache(e,t=!1){let n=function(e,t,n=!1){return {type:20,index:e,value:t,needPauseTracking:n,needArraySpread:!1,loc:sY}}(w.cached.length,e,t);return w.cached.push(n),n}};return w}(e,t);ai(e,n),t.hoistStatic&&function e(t,n,r,i=!1,l=!1){let{children:s}=t,o=[];for(let n=0;n<s.length;n++){let a=s[n];if(1===a.type&&0===a.tagType){let e=i?0:ae(a,r);if(e>0){if(e>=2){a.codegenNode.patchFlag=-1,o.push(a);continue}}else {let e=a.codegenNode;if(13===e.type){let t=e.patchFlag;if((void 0===t||512===t||1===t)&&an(a,r)>=2){let t=ar(a);t&&(e.props=r.hoist(t));}e.dynamicProps&&(e.dynamicProps=r.hoist(e.dynamicProps));}}}else if(12===a.type&&(i?0:ae(a,r))>=2){o.push(a);continue}if(1===a.type){let n=1===a.tagType;n&&r.scopes.vSlot++,e(a,t,r,!1,l),n&&r.scopes.vSlot--;}else if(11===a.type)e(a,t,r,1===a.children.length,!0);else if(9===a.type)for(let n=0;n<a.branches.length;n++)e(a.branches[n],t,r,1===a.branches[n].children.length,l);}let a=!1;if(o.length===s.length&&1===t.type){if(0===t.tagType&&t.codegenNode&&13===t.codegenNode.type&&A(t.codegenNode.children))t.codegenNode.children=c(s1(t.codegenNode.children)),a=!0;else if(1===t.tagType&&t.codegenNode&&13===t.codegenNode.type&&t.codegenNode.children&&!A(t.codegenNode.children)&&15===t.codegenNode.children.type){let e=u(t.codegenNode,"default");e&&(e.returns=c(s1(e.returns)),a=!0);}else if(3===t.tagType&&n&&1===n.type&&1===n.tagType&&n.codegenNode&&13===n.codegenNode.type&&n.codegenNode.children&&!A(n.codegenNode.children)&&15===n.codegenNode.children.type){let e=oS(t,"slot",!0),r=e&&e.arg&&u(n.codegenNode,e.arg);r&&(r.returns=c(s1(r.returns)),a=!0);}}if(!a)for(let e of o)e.codegenNode=r.cache(e.codegenNode);function c(e){let t=r.cache(e);return l&&r.hmr&&(t.needArraySpread=!0),t}function u(e,t){if(e.children&&!A(e.children)&&15===e.children.type){let n=e.children.properties.find(e=>e.key===t||e.key.content===t);return n&&n.value}}o.length&&r.transformHoist&&r.transformHoist(s,r,t);}(e,void 0,n,o7(e,e.children[0])),t.ssr||function(e,t){let{helper:n}=t,{children:r}=e;if(1===r.length){let n=r[0];if(o7(e,n)&&n.codegenNode){let r=n.codegenNode;13===r.type&&s7(r,t),e.codegenNode=r;}else e.codegenNode=n;}else r.length>1&&(e.codegenNode=s0(t,n(sf),void 0,e.children,64,void 0,void 0,!0,void 0,!1));}(e,n),e.helpers=/* @__PURE__ */new Set([...n.helpers.keys()]),e.components=[...n.components],e.directives=[...n.directives],e.imports=n.imports,e.hoists=n.hoists,e.temps=n.temps,e.cached=n.cached,e.transformed=!0;}(l,k({},i,{nodeTransforms:[...s,...t.nodeTransforms||[]],directiveTransforms:k({},o,t.directiveTransforms||{})})),function(e,t={}){let n=function(e,{mode:t="function",prefixIdentifiers:n="module"===t,sourceMap:r=!1,filename:i="template.vue.html",scopeId:l=null,optimizeImports:s=!1,runtimeGlobalName:o="Vue",runtimeModuleName:a="vue",ssrRuntimeModuleName:c="vue/server-renderer",ssr:u=!1,isTS:d=!1,inSSR:h=!1}){let f={mode:t,prefixIdentifiers:n,sourceMap:r,filename:i,scopeId:l,optimizeImports:s,runtimeGlobalName:o,runtimeModuleName:a,ssrRuntimeModuleName:c,ssr:u,isTS:d,inSSR:h,source:e.source,code:"",column:1,line:1,offset:0,indentLevel:0,pure:!1,map:void 0,helper:e=>`_${sZ[e]}`,push(e,t=-2,n){f.code+=e;},indent(){p(++f.indentLevel);},deindent(e=!1){e?--f.indentLevel:p(--f.indentLevel);},newline(){p(f.indentLevel);}};function p(e){f.push("\n"+"  ".repeat(e),0);}return f}(e,t);t.onContextCreated&&t.onContextCreated(n);let{mode:r,push:i,prefixIdentifiers:l,indent:s,deindent:o,newline:a,scopeId:c,ssr:u}=n,d=Array.from(e.helpers),h=d.length>0,f=!l&&"module"!==r;(function(e,t){let{ssr:n,prefixIdentifiers:r,push:i,newline:l,runtimeModuleName:s,runtimeGlobalName:o,ssrRuntimeModuleName:a}=t,c=Array.from(e.helpers);if(c.length>0&&(i(`const _Vue = ${o}
`,-1),e.hoists.length)){let e=[sS,sx,sC,sk,sT].filter(e=>c.includes(e)).map(ao).join(", ");i(`const { ${e} } = _Vue
`,-1);}(function(e,t){if(!e.length)return;t.pure=!0;let{push:n,newline:r}=t;r();for(let i=0;i<e.length;i++){let l=e[i];l&&(n(`const _hoisted_${i+1} = `),ad(l,t),r());}t.pure=!1;})(e.hoists,t),l(),i("return ");})(e,n);let p=(u?["_ctx","_push","_parent","_attrs"]:["_ctx","_cache"]).join(", ");if(i(`function ${u?"ssrRender":"render"}(${p}) {`),s(),f&&(i("with (_ctx) {"),s(),h&&(i(`const { ${d.map(ao).join(", ")} } = _Vue
`,-1),a())),e.components.length&&(aa(e.components,"component",n),(e.directives.length||e.temps>0)&&a()),e.directives.length&&(aa(e.directives,"directive",n),e.temps>0&&a()),e.temps>0){i("let ");for(let t=0;t<e.temps;t++)i(`${t>0?", ":""}_temp${t}`);}return (e.components.length||e.directives.length||e.temps)&&(i(`
`,0),a()),u||i("return "),e.codegenNode?ad(e.codegenNode,n):i("null"),f&&(o(),i("}")),o(),i("}"),{ast:e,code:n.code,preamble:"",map:n.map?n.map.toJSON():void 0}}(l,i)}(e,k({},aZ,t,{nodeTransforms:[a8,...a5,...t.nodeTransforms||[]],directiveTransforms:k({},a9,t.directiveTransforms||{}),transformHoist:null}))}(e,i),s=Function(l)();return s._rc=!0,a7[n]=s}return iZ(ce),e.BaseTransition=nO,e.BaseTransitionPropsValidators=nE,e.Comment=ib,e.DeprecationTypes=null,e.EffectScope=ex,e.ErrorCodes={SETUP_FUNCTION:0,0:"SETUP_FUNCTION",RENDER_FUNCTION:1,1:"RENDER_FUNCTION",NATIVE_EVENT_HANDLER:5,5:"NATIVE_EVENT_HANDLER",COMPONENT_EVENT_HANDLER:6,6:"COMPONENT_EVENT_HANDLER",VNODE_HOOK:7,7:"VNODE_HOOK",DIRECTIVE_HOOK:8,8:"DIRECTIVE_HOOK",TRANSITION_HOOK:9,9:"TRANSITION_HOOK",APP_ERROR_HANDLER:10,10:"APP_ERROR_HANDLER",APP_WARN_HANDLER:11,11:"APP_WARN_HANDLER",FUNCTION_REF:12,12:"FUNCTION_REF",ASYNC_COMPONENT_LOADER:13,13:"ASYNC_COMPONENT_LOADER",SCHEDULER:14,14:"SCHEDULER",COMPONENT_UPDATE:15,15:"COMPONENT_UPDATE",APP_UNMOUNT_CLEANUP:16,16:"APP_UNMOUNT_CLEANUP"},e.ErrorTypeStrings=null,e.Fragment=iy,e.KeepAlive={name:"KeepAlive",__isKeepAlive:!0,props:{include:[String,RegExp,Array],exclude:[String,RegExp,Array],max:[String,Number]},setup(e,{slots:t}){let n=iK(),r=n.ctx,i=/* @__PURE__ */new Map,l=/* @__PURE__ */new Set,s=null,o=n.suspense,{renderer:{p:a,m:c,um:u,o:{createElement:d}}}=r,h=d("div");function f(e){n4(e),u(e,n,o,!0);}function p(e){i.forEach((t,n)=>{let r=i6(t.type);r&&!e(r)&&m(n);});}function m(e){let t=i.get(e);!t||s&&iI(t,s)?s&&n4(s):f(t),i.delete(e),l.delete(e);}r.activate=(e,t,n,r,i)=>{let l=e.component;c(e,t,n,0,o),a(l.vnode,e,t,n,l,o,r,e.slotScopeIds,i),rX(()=>{l.isDeactivated=!1,l.a&&Y(l.a);let t=e.props&&e.props.onVnodeMounted;t&&ij(t,l.parent,e);},o);},r.deactivate=e=>{let t=e.component;r6(t.m),r6(t.a),c(e,h,null,1,o),rX(()=>{t.da&&Y(t.da);let n=e.props&&e.props.onVnodeUnmounted;n&&ij(n,t.parent,e),t.isDeactivated=!0;},o);},r5(()=>[e.include,e.exclude],([e,t])=>{e&&p(t=>n1(e,t)),t&&p(e=>!n1(t,e));},{flush:"post",deep:!0});let g=null,y=()=>{null!=g&&(ic(n.subTree.type)?rX(()=>{i.set(g,n8(n.subTree));},n.subTree.suspense):i.set(g,n8(n.subTree)));};return re(y),rn(y),rr(()=>{i.forEach(e=>{let{subTree:t,suspense:r}=n,i=n8(t);if(e.type===i.type&&e.key===i.key){n4(i);let e=i.component.da;e&&rX(e,r);return}f(e);});}),()=>{if(g=null,!t.default)return s=null;let n=t.default(),r=n[0];if(n.length>1)return s=null,n;if(!iE(r)||!(4&r.shapeFlag)&&!(128&r.shapeFlag))return s=null,r;let o=n8(r);if(o.type===ib)return s=null,o;let a=o.type,c=i6(nZ(o)?o.type.__asyncResolved||{}:a),{include:u,exclude:d,max:h}=e;if(u&&(!c||!n1(u,c))||d&&c&&n1(d,c))return o.shapeFlag&=-257,s=o,r;let f=null==o.key?a:o.key,p=i.get(f);return o.el&&(o=i$(o),128&r.shapeFlag&&(r.ssContent=o)),g=f,p?(o.el=p.el,o.component=p.component,o.transition&&nD(o,o.transition),o.shapeFlag|=512,l.delete(f),l.add(f)):(l.add(f),h&&l.size>parseInt(h,10)&&m(l.values().next().value)),o.shapeFlag|=256,s=o,ic(r.type)?r:o}}},e.ReactiveEffect=ek,e.Static=i_,e.Suspense={name:"Suspense",__isSuspense:!0,process(e,t,n,r,i,l,s,o,a,c){if(null==e)(function(e,t,n,r,i,l,s,o,a){let{p:c,o:{createElement:u}}=a,d=u("div"),h=e.suspense=ih(e,i,r,t,d,n,l,s,o,a);c(null,h.pendingBranch=e.ssContent,d,null,r,h,l,s),h.deps>0?(id(e,"onPending"),id(e,"onFallback"),c(null,e.ssFallback,t,n,r,null,l,s),ig(h,e.ssFallback)):h.resolve(!1,!0);})(t,n,r,i,l,s,o,a,c);else {if(l&&l.deps>0&&!e.suspense.isInFallback){t.suspense=e.suspense,t.suspense.vnode=t,t.el=e.el;return}(function(e,t,n,r,i,l,s,o,{p:a,um:c,o:{createElement:u}}){let d=t.suspense=e.suspense;d.vnode=t,t.el=e.el;let h=t.ssContent,f=t.ssFallback,{activeBranch:p,pendingBranch:m,isInFallback:g,isHydrating:y}=d;if(m)d.pendingBranch=h,iI(h,m)?(a(m,h,d.hiddenContainer,null,i,d,l,s,o),d.deps<=0?d.resolve():g&&!y&&(a(p,f,n,r,i,null,l,s,o),ig(d,f))):(d.pendingId=iu++,y?(d.isHydrating=!1,d.activeBranch=m):c(m,i,d),d.deps=0,d.effects.length=0,d.hiddenContainer=u("div"),g?(a(null,h,d.hiddenContainer,null,i,d,l,s,o),d.deps<=0?d.resolve():(a(p,f,n,r,i,null,l,s,o),ig(d,f))):p&&iI(h,p)?(a(p,h,n,r,i,d,l,s,o),d.resolve(!0)):(a(null,h,d.hiddenContainer,null,i,d,l,s,o),d.deps<=0&&d.resolve()));else if(p&&iI(h,p))a(p,h,n,r,i,d,l,s,o),ig(d,h);else if(id(t,"onPending"),d.pendingBranch=h,512&h.shapeFlag?d.pendingId=h.component.suspenseId:d.pendingId=iu++,a(null,h,d.hiddenContainer,null,i,d,l,s,o),d.deps<=0)d.resolve();else {let{timeout:e,pendingId:t}=d;e>0?setTimeout(()=>{d.pendingId===t&&d.fallback(f);},e):0===e&&d.fallback(f);}})(e,t,n,r,i,s,o,a,c);}},hydrate:function(e,t,n,r,i,l,s,o,a){let c=t.suspense=ih(t,r,n,e.parentNode,document.createElement("div"),null,i,l,s,o,!0),u=a(e,c.pendingBranch=t.ssContent,n,c,l,s);return 0===c.deps&&c.resolve(!1,!0),u},normalize:function(e){let{shapeFlag:t,children:n}=e,r=32&t;e.ssContent=ip(r?n.default:n),e.ssFallback=r?ip(n.fallback):iM(ib);}},e.Teleport={name:"Teleport",__isTeleport:!0,process(e,t,n,r,i,l,s,o,a,c){let{mc:u,pc:d,pbc:h,o:{insert:f,querySelector:p,createText:m,createComment:g}}=c,y=ny(t.props),{shapeFlag:b,children:_,dynamicChildren:S}=t;if(null==e){let e=t.el=m(""),c=t.anchor=m("");f(e,n,r),f(c,n,r);let d=(e,t)=>{16&b&&(i&&i.isCE&&(i.ce._teleportTarget=e),u(_,e,t,i,l,s,o,a));},h=()=>{let e=t.target=nS(t.props,p),n=nk(e,t,m,f);e&&("svg"!==s&&nb(e)?s="svg":"mathml"!==s&&n_(e)&&(s="mathml"),y||(d(e,n),nC(t)));};y&&(d(n,c),nC(t)),nv(t.props)?rX(h,l):h();}else {t.el=e.el,t.targetStart=e.targetStart;let r=t.anchor=e.anchor,u=t.target=e.target,f=t.targetAnchor=e.targetAnchor,m=ny(e.props),g=m?n:u;if("svg"===s||nb(u)?s="svg":("mathml"===s||n_(u))&&(s="mathml"),S?(h(e.dynamicChildren,S,g,i,l,s,o),r2(e,t,!0)):a||d(e,t,g,m?r:f,i,l,s,o,!1),y)m?t.props&&e.props&&t.props.to!==e.props.to&&(t.props.to=e.props.to):nx(t,n,r,c,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){let e=t.target=nS(t.props,p);e&&nx(t,e,null,c,0);}else m&&nx(t,u,f,c,1);nC(t);}},remove(e,t,n,{um:r,o:{remove:i}},l){let{shapeFlag:s,children:o,anchor:a,targetStart:c,targetAnchor:u,target:d,props:h}=e;if(d&&(i(c),i(u)),l&&i(a),16&s){let e=l||!ny(h);for(let i=0;i<o.length;i++){let l=o[i];r(l,t,n,e,!!l.dynamicChildren);}}},move:nx,hydrate:function(e,t,n,r,i,l,{o:{nextSibling:s,parentNode:o,querySelector:a,insert:c,createText:u}},d){let h=t.target=nS(t.props,a);if(h){let a=h._lpa||h.firstChild;if(16&t.shapeFlag){if(ny(t.props))t.anchor=d(s(e),t,o(e),n,r,i,l),t.targetStart=a,t.targetAnchor=a&&s(a);else {t.anchor=s(e);let o=a;for(;o;){if(o&&8===o.nodeType){if("teleport start anchor"===o.data)t.targetStart=o;else if("teleport anchor"===o.data){t.targetAnchor=o,h._lpa=t.targetAnchor&&s(t.targetAnchor);break}}o=s(o);}t.targetAnchor||nk(h,t,u,c),d(a&&s(a),t,h,n,r,i,l);}}nC(t);}return t.anchor&&s(t.anchor)}},e.Text=iv,e.TrackOpTypes={GET:"get",HAS:"has",ITERATE:"iterate"},e.Transition=lo,e.TransitionGroup=lG,e.TriggerOpTypes={SET:"set",ADD:"add",DELETE:"delete",CLEAR:"clear"},e.VueElement=lH,e.assertNumber=function(e,t){},e.callWithAsyncErrorHandling=t3,e.callWithErrorHandling=t6,e.camelize=z,e.capitalize=X,e.cloneVNode=i$,e.compatUtils=null,e.compile=ce,e.computed=i3,e.createApp=sc,e.createBlock=iA,e.createCommentVNode=function(e="",t=!1){return t?(iC(),iA(ib,null,e)):iM(ib,null,e)},e.createElementBlock=function(e,t,n,r,i,l){return iw(iP(e,t,n,r,i,l,!0))},e.createElementVNode=iP,e.createHydrationRenderer=rQ,e.createPropsRestProxy=function(e,t){let n={};for(let r in e)t.includes(r)||Object.defineProperty(n,r,{enumerable:!0,get:()=>e[r]});return n},e.createRenderer=function(e){return rZ(e)},e.createSSRApp=su,e.createSlots=function(e,t){for(let n=0;n<t.length;n++){let r=t[n];if(A(r))for(let t=0;t<r.length;t++)e[r[t].name]=r[t].fn;else r&&(e[r.name]=r.key?(...e)=>{let t=r.fn(...e);return t&&(t.key=r.key),t}:r.fn);}return e},e.createStaticVNode=function(e,t){let n=iM(i_,null,e);return n.staticCount=t,n},e.createTextVNode=iD,e.createVNode=iM,e.customRef=tJ,e.defineAsyncComponent=/*! #__NO_SIDE_EFFECTS__ */function(e){let t;P(e)&&(e={loader:e});let{loader:n,loadingComponent:r,errorComponent:i,delay:l=200,hydrate:s,timeout:o,suspensible:a=!0,onError:c}=e,u=null,d=0,h=()=>(d++,u=null,f()),f=()=>{let e;return u||(e=u=n().catch(e=>{if(e=e instanceof Error?e:Error(String(e)),c)return new Promise((t,n)=>{c(e,()=>t(h()),()=>n(e),d+1);});throw e}).then(n=>e!==u&&u?u:(n&&(n.__esModule||"Module"===n[Symbol.toStringTag])&&(n=n.default),t=n,n)))};return nV({name:"AsyncComponentWrapper",__asyncLoader:f,__asyncHydrate(e,n,r){let i=s?()=>{let t=s(r,t=>(function(e,t){if(nz(e)&&"["===e.data){let n=1,r=e.nextSibling;for(;r;){if(1===r.nodeType){if(!1===t(r))break}else if(nz(r)){if("]"===r.data){if(0==--n)break}else "["===r.data&&n++;}r=r.nextSibling;}}else t(e);})(e,t));t&&(n.bum||(n.bum=[])).push(t);}:r;t?i():f().then(()=>!n.isUnmounted&&i());},get __asyncResolved(){return t},setup(){let e=iW;if(nB(e),t)return ()=>nY(t,e);let n=t=>{u=null,t4(t,e,13,!i);};if(a&&e.suspense)return f().then(t=>()=>nY(t,e)).catch(e=>(n(e),()=>i?iM(i,{error:e}):null));let s=tB(!1),c=tB(),d=tB(!!l);return l&&setTimeout(()=>{d.value=!1;},l),null!=o&&setTimeout(()=>{if(!s.value&&!c.value){let e=Error(`Async component timed out after ${o}ms.`);n(e),c.value=e;}},o),f().then(()=>{s.value=!0,e.parent&&n0(e.parent.vnode)&&e.parent.update();}).catch(e=>{n(e),c.value=e;}),()=>s.value&&t?nY(t,e):c.value&&i?iM(i,{error:c.value}):r&&!d.value?iM(r):void 0}})},e.defineComponent=nV,e.defineCustomElement=lU,e.defineEmits=function(){return null},e.defineExpose=function(e){},e.defineModel=function(){},e.defineOptions=function(e){},e.defineProps=function(){return null},e.defineSSRCustomElement=(e,t)=>/* @__PURE__ */lU(e,t,su),e.defineSlots=function(){return null},e.devtools=void 0,e.effect=function(e,t){e.effect instanceof ek&&(e=e.effect.fn);let n=new ek(e);t&&k(n,t);try{n.run();}catch(e){throw n.stop(),e}let r=n.run.bind(n);return r.effect=n,r},e.effectScope=function(e){return new ex(e)},e.getCurrentInstance=iK,e.getCurrentScope=function(){return i},e.getCurrentWatcher=function(){return p},e.getTransitionRawChildren=nF,e.guardReactiveProps=iL,e.h=i4,e.handleError=t4,e.hasInjectionContext=function(){return !!(iW||nu||rO)},e.hydrate=(...e)=>{so().hydrate(...e);},e.hydrateOnIdle=(e=1e4)=>t=>{let n=requestIdleCallback(t,{timeout:e});return ()=>cancelIdleCallback(n)},e.hydrateOnInteraction=(e=[])=>(t,n)=>{M(e)&&(e=[e]);let r=!1,i=e=>{r||(r=!0,l(),t(),e.target.dispatchEvent(new e.constructor(e.type,e)));},l=()=>{n(t=>{for(let n of e)t.removeEventListener(n,i);});};return n(t=>{for(let n of e)t.addEventListener(n,i,{once:!0});}),l},e.hydrateOnMediaQuery=e=>t=>{if(e){let n=matchMedia(e);if(!n.matches)return n.addEventListener("change",t,{once:!0}),()=>n.removeEventListener("change",t);t();}},e.hydrateOnVisible=e=>(t,n)=>{let r=new IntersectionObserver(e=>{for(let n of e)if(n.isIntersecting){r.disconnect(),t();break}},e);return n(e=>{if(e instanceof Element){if(function(e){let{top:t,left:n,bottom:r,right:i}=e.getBoundingClientRect(),{innerHeight:l,innerWidth:s}=window;return (t>0&&t<l||r>0&&r<l)&&(n>0&&n<s||i>0&&i<s)}(e))return t(),r.disconnect(),!1;r.observe(e);}}),()=>r.disconnect()},e.initCustomFormatter=function(){},e.initDirectivesForSSR=_,e.inject=rM,e.isMemoSame=i8,e.isProxy=tM,e.isReactive=tR,e.isReadonly=tO,e.isRef=tV,e.isRuntimeOnly=()=>!u,e.isShallow=tP,e.isVNode=iE,e.markRaw=t$,e.mergeDefaults=function(e,t){let n=rb(e);for(let e in t){if(e.startsWith("__skip"))continue;let r=n[e];r?A(r)||P(r)?r=n[e]={type:r,default:t[e]}:r.default=t[e]:null===r&&(r=n[e]={default:t[e]}),r&&t[`__skip_${e}`]&&(r.skipFactory=!0);}return n},e.mergeModels=function(e,t){return e&&t?A(e)&&A(t)?e.concat(t):k({},rb(e),rb(t)):e||t},e.mergeProps=iU,e.nextTick=nr,e.normalizeClass=eu,e.normalizeProps=function(e){if(!e)return null;let{class:t,style:n}=e;return t&&!M(t)&&(e.class=eu(t)),n&&(e.style=el(n)),e},e.normalizeStyle=el,e.onActivated=n2,e.onBeforeMount=n7,e.onBeforeUnmount=rr,e.onBeforeUpdate=rt,e.onDeactivated=n6,e.onErrorCaptured=ra,e.onMounted=re,e.onRenderTracked=ro,e.onRenderTriggered=rs,e.onScopeDispose=function(e,t=!1){i&&i.cleanups.push(e);},e.onServerPrefetch=rl,e.onUnmounted=ri,e.onUpdated=rn,e.onWatcherCleanup=t1,e.openBlock=iC,e.popScopeId=function(){nd=null;},e.provide=rP,e.proxyRefs=tK,e.pushScopeId=function(e){nd=e;},e.queuePostFlushCb=ns,e.reactive=tw,e.readonly=tE,e.ref=tB,e.registerRuntimeCompiler=iZ,e.render=sa,e.renderList=function(e,t,n,r){let i;let l=n&&n[r],s=A(e);if(s||M(e)){let n=s&&tR(e),r=!1;n&&(r=!tP(e),e=eJ(e)),i=Array(e.length);for(let n=0,s=e.length;n<s;n++)i[n]=t(r?tD(e[n]):e[n],n,void 0,l&&l[n]);}else if("number"==typeof e){i=Array(e);for(let n=0;n<e;n++)i[n]=t(n+1,n,void 0,l&&l[n]);}else if($(e)){if(e[Symbol.iterator])i=Array.from(e,(e,n)=>t(e,n,void 0,l&&l[n]));else {let n=Object.keys(e);i=Array(n.length);for(let r=0,s=n.length;r<s;r++){let s=n[r];i[r]=t(e[s],s,r,l&&l[r]);}}}else i=[];return n&&(n[r]=i),i},e.renderSlot=function(e,t,n={},r,i){if(nu.ce||nu.parent&&nZ(nu.parent)&&nu.parent.ce)return "default"!==t&&(n.name=t),iC(),iA(iy,null,[iM("slot",n,r&&r())],64);let l=e[t];l&&l._c&&(l._d=!1),iC();let s=l&&function e(t){return t.some(t=>!iE(t)||!!(t.type!==ib&&(t.type!==iy||e(t.children))))?t:null}(l(n)),o=iA(iy,{key:(n.key||s&&s.key||`_${t}`)+(!s&&r?"_fb":"")},s||(r?r():[]),s&&1===e._?64:-2);return !i&&o.scopeId&&(o.slotScopeIds=[o.scopeId+"-s"]),l&&l._c&&(l._d=!0),o},e.resolveComponent=function(e,t){return rd(rc,e,!0,t)||e},e.resolveDirective=function(e){return rd("directives",e)},e.resolveDynamicComponent=function(e){return M(e)?rd(rc,e,!1)||e:e||ru},e.resolveFilter=null,e.resolveTransitionHooks=nM,e.setBlockTracking=iN,e.setDevtoolsHook=_,e.setTransitionHooks=nD,e.shallowReactive=tA,e.shallowReadonly=function(e){return tI(e,!0,tt,tx,tN)},e.shallowRef=tU,e.ssrContextKey=r3,e.ssrUtils=null,e.stop=function(e){e.effect.stop();},e.toDisplayString=eb,e.toHandlerKey=Q,e.toHandlers=function(e,t){let n={};for(let r in e)n[t&&/[A-Z]/.test(r)?`on:${r}`:Q(r)]=e[r];return n},e.toRaw=tL,e.toRef=function(e,t,n){return tV(e)?e:P(e)?new tX(e):$(e)&&arguments.length>1?tQ(e,t,n):tB(e)},e.toRefs=function(e){let t=A(e)?Array(e.length):{};for(let n in e)t[n]=tQ(e,n);return t},e.toValue=function(e){return P(e)?e():tq(e)},e.transformVNodeArgs=function(e){},e.triggerRef=function(e){e.dep&&e.dep.trigger();},e.unref=tq,e.useAttrs=function(){return rv().attrs},e.useCssModule=function(e="$style"){return y},e.useCssVars=function(e){let t=iK();if(!t)return;let n=t.ut=(n=e(t.proxy))=>{Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach(e=>lk(e,n));},r=()=>{let r=e(t.proxy);t.ce?lk(t.ce,r):function e(t,n){if(128&t.shapeFlag){let r=t.suspense;t=r.activeBranch,r.pendingBranch&&!r.isHydrating&&r.effects.push(()=>{e(r.activeBranch,n);});}for(;t.component;)t=t.component.subTree;if(1&t.shapeFlag&&t.el)lk(t.el,n);else if(t.type===iy)t.children.forEach(t=>e(t,n));else if(t.type===i_){let{el:e,anchor:r}=t;for(;e&&(lk(e,n),e!==r);)e=e.nextSibling;}}(t.subTree,r),n(r);};n7(()=>{r4(r);}),re(()=>{let e=new MutationObserver(r);e.observe(t.subTree.el.parentNode,{childList:!0}),ri(()=>e.disconnect());});},e.useHost=lq,e.useId=function(){let e=iK();return e?(e.appContext.config.idPrefix||"v")+"-"+e.ids[0]+e.ids[1]++:""},e.useModel=function(e,t,n=y){let r=iK(),i=z(t),l=G(t),s=ie(e,t),o=tJ((s,o)=>{let a,c;let u=y;return r8(()=>{let n=e[t];Z(a,n)&&(a=n,o());}),{get:()=>(s(),n.get?n.get(a):a),set(e){let s=n.set?n.set(e):e;if(!Z(s,a)&&!(u!==y&&Z(e,u)))return;let d=r.vnode.props;d&&(t in d||i in d||l in d)&&(`onUpdate:${t}` in d||`onUpdate:${i}` in d||`onUpdate:${l}` in d)||(a=e,o()),r.emit(`update:${t}`,s),Z(e,s)&&Z(e,u)&&!Z(s,c)&&o(),u=e,c=s;}}});return o[Symbol.iterator]=()=>{let e=0;return {next:()=>e<2?{value:e++?s||y:o,done:!1}:{done:!0}}},o},e.useSSRContext=()=>{},e.useShadowRoot=function(){let e=lq();return e&&e.shadowRoot},e.useSlots=function(){return rv().slots},e.useTemplateRef=function(e){let t=iK(),n=tU(null);return t&&Object.defineProperty(t.refs===y?t.refs={}:t.refs,e,{enumerable:!0,get:()=>n.value,set:e=>n.value=e}),n},e.useTransitionState=nw,e.vModelCheckbox=l3,e.vModelDynamic={created(e,t,n){st(e,t,n,null,"created");},mounted(e,t,n){st(e,t,n,null,"mounted");},beforeUpdate(e,t,n,r){st(e,t,n,r,"beforeUpdate");},updated(e,t,n,r){st(e,t,n,r,"updated");}},e.vModelRadio=l8,e.vModelSelect=l5,e.vModelText=l6,e.vShow={beforeMount(e,{value:t},{transition:n}){e[l_]="none"===e.style.display?"":e.style.display,n&&t?n.beforeEnter(e):lx(e,t);},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e);},updated(e,{value:t,oldValue:n},{transition:r}){!t!=!n&&(r?t?(r.beforeEnter(e),lx(e,!0),r.enter(e)):r.leave(e,()=>{lx(e,!1);}):lx(e,t));},beforeUnmount(e,{value:t}){lx(e,t);}},e.version=i5,e.warn=_,e.watch=function(e,t,n){return r5(e,t,n)},e.watchEffect=function(e,t){return r5(e,null,t)},e.watchPostEffect=r4,e.watchSyncEffect=r8,e.withAsyncContext=function(e){let t=iK(),n=e();return iJ(),D(n)&&(n=n.catch(e=>{throw iz(t),e})),[n,()=>iz(t)]},e.withCtx=nf,e.withDefaults=function(e,t){return null},e.withDirectives=function(e,t){if(null===nu)return e;let n=i2(nu),r=e.dirs||(e.dirs=[]);for(let e=0;e<t.length;e++){let[i,l,s,o=y]=t[e];i&&(P(i)&&(i={mounted:i,updated:i}),i.deep&&t2(l),r.push({dir:i,instance:n,value:l,oldValue:void 0,arg:s,modifiers:o}));}return e},e.withKeys=(e,t)=>{let n=e._withKeys||(e._withKeys={}),r=t.join(".");return n[r]||(n[r]=n=>{if(!("key"in n))return;let r=G(n.key);if(t.some(e=>e===r||si[e]===r))return e(n)})},e.withMemo=function(e,t,n,r){let i=n[r];if(i&&i8(i,e))return i;let l=t();return l.memo=e.slice(),l.cacheIndex=r,n[r]=l},e.withModifiers=(e,t)=>{let n=e._withMods||(e._withMods={}),r=t.join(".");return n[r]||(n[r]=(n,...r)=>{for(let e=0;e<t.length;e++){let r=sr[t[e]];if(r&&r(n,t))return}return e(n,...r)})},e.withScopeId=e=>nf,e}({});

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
