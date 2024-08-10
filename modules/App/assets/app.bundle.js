(function () {
    'use strict';

    /**
    * vue v3.4.37
    * (c) 2018-present Yuxi (Evan) You and Vue contributors
    * @license MIT
    **/
    window.Vue=function(e){let t,n,r,i,l,s,o,a,c;/*! #__NO_SIDE_EFFECTS__ */function u(e,t){let n=new Set(e.split(","));return t?e=>n.has(e.toLowerCase()):e=>n.has(e)}let d={},p=[],h=()=>{},f=()=>!1,m=e=>111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&(e.charCodeAt(2)>122||97>e.charCodeAt(2)),g=e=>e.startsWith("onUpdate:"),y=Object.assign,b=(e,t)=>{let n=e.indexOf(t);n>-1&&e.splice(n,1);},_=Object.prototype.hasOwnProperty,S=(e,t)=>_.call(e,t),x=Array.isArray,C=e=>"[object Map]"===L(e),k=e=>"[object Set]"===L(e),T=e=>"[object Date]"===L(e),w=e=>"[object RegExp]"===L(e),E=e=>"function"==typeof e,A=e=>"string"==typeof e,N=e=>"symbol"==typeof e,I=e=>null!==e&&"object"==typeof e,R=e=>(I(e)||E(e))&&E(e.then)&&E(e.catch),O=Object.prototype.toString,L=e=>O.call(e),M=e=>L(e).slice(8,-1),$=e=>"[object Object]"===L(e),P=e=>A(e)&&"NaN"!==e&&"-"!==e[0]&&""+parseInt(e,10)===e,F=u(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),D=u("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"),V=e=>{let t=Object.create(null);return n=>t[n]||(t[n]=e(n))},B=/-(\w)/g,U=V(e=>e.replace(B,(e,t)=>t?t.toUpperCase():"")),j=/\B([A-Z])/g,H=V(e=>e.replace(j,"-$1").toLowerCase()),q=V(e=>e.charAt(0).toUpperCase()+e.slice(1)),W=V(e=>e?`on${q(e)}`:""),K=(e,t)=>!Object.is(e,t),z=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t);},G=(e,t,n,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:n});},J=e=>{let t=parseFloat(e);return isNaN(t)?e:t},X=e=>{let t=A(e)?Number(e):NaN;return isNaN(t)?e:t},Q=()=>t||(t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}),Z=u("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error");function Y(e){if(x(e)){let t={};for(let n=0;n<e.length;n++){let r=e[n],i=A(r)?er(r):Y(r);if(i)for(let e in i)t[e]=i[e];}return t}if(A(e)||I(e))return e}let ee=/;(?![^(]*\))/g,et=/:([^]+)/,en=/\/\*[^]*?\*\//g;function er(e){let t={};return e.replace(en,"").split(ee).forEach(e=>{if(e){let n=e.split(et);n.length>1&&(t[n[0].trim()]=n[1].trim());}}),t}function ei(e){let t="";if(A(e))t=e;else if(x(e))for(let n=0;n<e.length;n++){let r=ei(e[n]);r&&(t+=r+" ");}else if(I(e))for(let n in e)e[n]&&(t+=n+" ");return t.trim()}let el=u("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot"),es=u("svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view"),eo=u("annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics"),ea=u("area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr"),ec=u("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");function eu(e,t){if(e===t)return !0;let n=T(e),r=T(t);if(n||r)return !!n&&!!r&&e.getTime()===t.getTime();if(n=N(e),r=N(t),n||r)return e===t;if(n=x(e),r=x(t),n||r)return !!n&&!!r&&function(e,t){if(e.length!==t.length)return !1;let n=!0;for(let r=0;n&&r<e.length;r++)n=eu(e[r],t[r]);return n}(e,t);if(n=I(e),r=I(t),n||r){if(!n||!r||Object.keys(e).length!==Object.keys(t).length)return !1;for(let n in e){let r=e.hasOwnProperty(n),i=t.hasOwnProperty(n);if(r&&!i||!r&&i||!eu(e[n],t[n]))return !1}}return String(e)===String(t)}function ed(e,t){return e.findIndex(e=>eu(e,t))}let ep=e=>!!(e&&!0===e.__v_isRef),eh=e=>A(e)?e:null==e?"":x(e)||I(e)&&(e.toString===O||!E(e.toString))?ep(e)?eh(e.value):JSON.stringify(e,ef,2):String(e),ef=(e,t)=>ep(t)?ef(e,t.value):C(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[t,n],r)=>(e[em(t,r)+" =>"]=n,e),{})}:k(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>em(e))}:N(t)?em(t):!I(t)||x(t)||$(t)?t:String(t),em=(e,t="")=>{var n;return N(e)?`Symbol(${null!=(n=e.description)?n:t})`:e};class eg{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this.parent=n,!e&&n&&(this.index=(n.scopes||(n.scopes=[])).push(this)-1);}get active(){return this._active}run(e){if(this._active){let t=n;try{return n=this,e()}finally{n=t;}}}on(){n=this;}off(){n=this.parent;}stop(e){if(this._active){let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);if(!this.detached&&this.parent&&!e){let e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index);}this.parent=void 0,this._active=!1;}}}function ey(e,t=n){t&&t.active&&t.effects.push(e);}class ev{constructor(e,t,n,r){this.fn=e,this.trigger=t,this.scheduler=n,this.active=!0,this.deps=[],this._dirtyLevel=4,this._trackId=0,this._runnings=0,this._shouldSchedule=!1,this._depsLength=0,ey(this,r);}get dirty(){if(2===this._dirtyLevel||3===this._dirtyLevel){this._dirtyLevel=1,eT();for(let e=0;e<this._depsLength;e++){let t=this.deps[e];if(t.computed&&(t.computed.value,this._dirtyLevel>=4))break}1===this._dirtyLevel&&(this._dirtyLevel=0),ew();}return this._dirtyLevel>=4}set dirty(e){this._dirtyLevel=e?4:0;}run(){if(this._dirtyLevel=0,!this.active)return this.fn();let e=ex,t=r;try{return ex=!0,r=this,this._runnings++,eb(this),this.fn()}finally{e_(this),this._runnings--,r=t,ex=e;}}stop(){this.active&&(eb(this),e_(this),this.onStop&&this.onStop(),this.active=!1);}}function eb(e){e._trackId++,e._depsLength=0;}function e_(e){if(e.deps.length>e._depsLength){for(let t=e._depsLength;t<e.deps.length;t++)eS(e.deps[t],e);e.deps.length=e._depsLength;}}function eS(e,t){let n=e.get(t);void 0!==n&&t._trackId!==n&&(e.delete(t),0===e.size&&e.cleanup());}let ex=!0,eC=0,ek=[];function eT(){ek.push(ex),ex=!1;}function ew(){let e=ek.pop();ex=void 0===e||e;}function eE(){for(eC--;!eC&&eN.length;)eN.shift()();}function eA(e,t,n){if(t.get(e)!==e._trackId){t.set(e,e._trackId);let n=e.deps[e._depsLength];n!==t?(n&&eS(n,e),e.deps[e._depsLength++]=t):e._depsLength++;}}let eN=[];function eI(e,t,n){for(let n of(eC++,e.keys())){let r;n._dirtyLevel<t&&(null!=r?r:r=e.get(n)===n._trackId)&&(n._shouldSchedule||(n._shouldSchedule=0===n._dirtyLevel),n._dirtyLevel=t),n._shouldSchedule&&(null!=r?r:r=e.get(n)===n._trackId)&&(n.trigger(),(!n._runnings||n.allowRecurse)&&2!==n._dirtyLevel&&(n._shouldSchedule=!1,n.scheduler&&eN.push(n.scheduler)));}eE();}let eR=(e,t)=>{let n=new Map;return n.cleanup=e,n.computed=t,n},eO=new WeakMap,eL=Symbol(""),eM=Symbol("");function e$(e,t,n){if(ex&&r){let t=eO.get(e);t||eO.set(e,t=new Map);let i=t.get(n);i||t.set(n,i=eR(()=>t.delete(n))),eA(r,i);}}function eP(e,t,n,r,i,l){let s=eO.get(e);if(!s)return;let o=[];if("clear"===t)o=[...s.values()];else if("length"===n&&x(e)){let e=Number(r);s.forEach((t,n)=>{("length"===n||!N(n)&&n>=e)&&o.push(t);});}else switch(void 0!==n&&o.push(s.get(n)),t){case"add":x(e)?P(n)&&o.push(s.get("length")):(o.push(s.get(eL)),C(e)&&o.push(s.get(eM)));break;case"delete":!x(e)&&(o.push(s.get(eL)),C(e)&&o.push(s.get(eM)));break;case"set":C(e)&&o.push(s.get(eL));}for(let e of(eC++,o))e&&eI(e,4);eE();}let eF=u("__proto__,__v_isRef,__isVue"),eD=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>"arguments"!==e&&"caller"!==e).map(e=>Symbol[e]).filter(N)),eV=function(){let e={};return ["includes","indexOf","lastIndexOf"].forEach(t=>{e[t]=function(...e){let n=ty(this);for(let e=0,t=this.length;e<t;e++)e$(n,"get",e+"");let r=n[t](...e);return -1===r||!1===r?n[t](...e.map(ty)):r};}),["push","pop","shift","unshift","splice"].forEach(t=>{e[t]=function(...e){eT(),eC++;let n=ty(this)[t].apply(this,e);return eE(),ew(),n};}),e}();function eB(e){N(e)||(e=String(e));let t=ty(this);return e$(t,"has",e),t.hasOwnProperty(e)}class eU{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t;}get(e,t,n){let r=this._isReadonly,i=this._isShallow;if("__v_isReactive"===t)return !r;if("__v_isReadonly"===t)return r;if("__v_isShallow"===t)return i;if("__v_raw"===t)return n===(r?i?ta:to:i?ts:tl).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;let l=x(e);if(!r){if(l&&S(eV,t))return Reflect.get(eV,t,n);if("hasOwnProperty"===t)return eB}let s=Reflect.get(e,t,n);return (N(t)?eD.has(t):eF(t))?s:(r||e$(e,"get",t),i)?s:tk(s)?l&&P(t)?s:s.value:I(s)?r?td(s):tc(s):s}}class ej extends eU{constructor(e=!1){super(!1,e);}set(e,t,n,r){let i=e[t];if(!this._isShallow){let t=tf(i);if(tm(n)||tf(n)||(i=ty(i),n=ty(n)),!x(e)&&tk(i)&&!tk(n))return !t&&(i.value=n,!0)}let l=x(e)&&P(t)?Number(t)<e.length:S(e,t),s=Reflect.set(e,t,n,r);return e===ty(r)&&(l?K(n,i)&&eP(e,"set",t,n):eP(e,"add",t,n)),s}deleteProperty(e,t){let n=S(e,t);e[t];let r=Reflect.deleteProperty(e,t);return r&&n&&eP(e,"delete",t,void 0),r}has(e,t){let n=Reflect.has(e,t);return N(t)&&eD.has(t)||e$(e,"has",t),n}ownKeys(e){return e$(e,"iterate",x(e)?"length":eL),Reflect.ownKeys(e)}}class eH extends eU{constructor(e=!1){super(!0,e);}set(e,t){return !0}deleteProperty(e,t){return !0}}let eq=new ej,eW=new eH,eK=new ej(!0),ez=new eH(!0),eG=e=>e,eJ=e=>Reflect.getPrototypeOf(e);function eX(e,t,n=!1,r=!1){let i=ty(e=e.__v_raw),l=ty(t);n||(K(t,l)&&e$(i,"get",t),e$(i,"get",l));let{has:s}=eJ(i),o=r?eG:n?t_:tb;return s.call(i,t)?o(e.get(t)):s.call(i,l)?o(e.get(l)):void(e!==i&&e.get(t))}function eQ(e,t=!1){let n=this.__v_raw,r=ty(n),i=ty(e);return t||(K(e,i)&&e$(r,"has",e),e$(r,"has",i)),e===i?n.has(e):n.has(e)||n.has(i)}function eZ(e,t=!1){return e=e.__v_raw,t||e$(ty(e),"iterate",eL),Reflect.get(e,"size",e)}function eY(e,t=!1){t||tm(e)||tf(e)||(e=ty(e));let n=ty(this);return eJ(n).has.call(n,e)||(n.add(e),eP(n,"add",e,e)),this}function e0(e,t,n=!1){n||tm(t)||tf(t)||(t=ty(t));let r=ty(this),{has:i,get:l}=eJ(r),s=i.call(r,e);s||(e=ty(e),s=i.call(r,e));let o=l.call(r,e);return r.set(e,t),s?K(t,o)&&eP(r,"set",e,t):eP(r,"add",e,t),this}function e1(e){let t=ty(this),{has:n,get:r}=eJ(t),i=n.call(t,e);i||(e=ty(e),i=n.call(t,e)),r&&r.call(t,e);let l=t.delete(e);return i&&eP(t,"delete",e,void 0),l}function e2(){let e=ty(this),t=0!==e.size,n=e.clear();return t&&eP(e,"clear",void 0,void 0),n}function e3(e,t){return function(n,r){let i=this,l=i.__v_raw,s=ty(l),o=t?eG:e?t_:tb;return e||e$(s,"iterate",eL),l.forEach((e,t)=>n.call(r,o(e),o(t),i))}}function e6(e,t,n){return function(...r){let i=this.__v_raw,l=ty(i),s=C(l),o="entries"===e||e===Symbol.iterator&&s,a=i[e](...r),c=n?eG:t?t_:tb;return t||e$(l,"iterate","keys"===e&&s?eM:eL),{next(){let{value:e,done:t}=a.next();return t?{value:e,done:t}:{value:o?[c(e[0]),c(e[1])]:c(e),done:t}},[Symbol.iterator](){return this}}}}function e4(e){return function(...t){return "delete"!==e&&("clear"===e?void 0:this)}}let[e8,e5,e9,e7]=function(){let e={get(e){return eX(this,e)},get size(){return eZ(this)},has:eQ,add:eY,set:e0,delete:e1,clear:e2,forEach:e3(!1,!1)},t={get(e){return eX(this,e,!1,!0)},get size(){return eZ(this)},has:eQ,add(e){return eY.call(this,e,!0)},set(e,t){return e0.call(this,e,t,!0)},delete:e1,clear:e2,forEach:e3(!1,!0)},n={get(e){return eX(this,e,!0)},get size(){return eZ(this,!0)},has(e){return eQ.call(this,e,!0)},add:e4("add"),set:e4("set"),delete:e4("delete"),clear:e4("clear"),forEach:e3(!0,!1)},r={get(e){return eX(this,e,!0,!0)},get size(){return eZ(this,!0)},has(e){return eQ.call(this,e,!0)},add:e4("add"),set:e4("set"),delete:e4("delete"),clear:e4("clear"),forEach:e3(!0,!0)};return ["keys","values","entries",Symbol.iterator].forEach(i=>{e[i]=e6(i,!1,!1),n[i]=e6(i,!0,!1),t[i]=e6(i,!1,!0),r[i]=e6(i,!0,!0);}),[e,n,t,r]}();function te(e,t){let n=t?e?e7:e9:e?e5:e8;return (t,r,i)=>"__v_isReactive"===r?!e:"__v_isReadonly"===r?e:"__v_raw"===r?t:Reflect.get(S(n,r)&&r in t?n:t,r,i)}let tt={get:te(!1,!1)},tn={get:te(!1,!0)},tr={get:te(!0,!1)},ti={get:te(!0,!0)},tl=new WeakMap,ts=new WeakMap,to=new WeakMap,ta=new WeakMap;function tc(e){return tf(e)?e:tp(e,!1,eq,tt,tl)}function tu(e){return tp(e,!1,eK,tn,ts)}function td(e){return tp(e,!0,eW,tr,to)}function tp(e,t,n,r,i){if(!I(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;let l=i.get(e);if(l)return l;let s=e.__v_skip||!Object.isExtensible(e)?0:function(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}(M(e));if(0===s)return e;let o=new Proxy(e,2===s?r:n);return i.set(e,o),o}function th(e){return tf(e)?th(e.__v_raw):!!(e&&e.__v_isReactive)}function tf(e){return !!(e&&e.__v_isReadonly)}function tm(e){return !!(e&&e.__v_isShallow)}function tg(e){return !!e&&!!e.__v_raw}function ty(e){let t=e&&e.__v_raw;return t?ty(t):e}function tv(e){return Object.isExtensible(e)&&G(e,"__v_skip",!0),e}let tb=e=>I(e)?tc(e):e,t_=e=>I(e)?td(e):e;class tS{constructor(e,t,n,r){this.getter=e,this._setter=t,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this.effect=new ev(()=>e(this._value),()=>tC(this,2===this.effect._dirtyLevel?2:3)),this.effect.computed=this,this.effect.active=this._cacheable=!r,this.__v_isReadonly=n;}get value(){let e=ty(this);return (!e._cacheable||e.effect.dirty)&&K(e._value,e._value=e.effect.run())&&tC(e,4),tx(e),e.effect._dirtyLevel>=2&&tC(e,2),e._value}set value(e){this._setter(e);}get _dirty(){return this.effect.dirty}set _dirty(e){this.effect.dirty=e;}}function tx(e){var t;ex&&r&&(e=ty(e),eA(r,null!=(t=e.dep)?t:e.dep=eR(()=>e.dep=void 0,e instanceof tS?e:void 0)));}function tC(e,t=4,n,r){let i=(e=ty(e)).dep;i&&eI(i,t);}function tk(e){return !!(e&&!0===e.__v_isRef)}function tT(e){return tw(e,!1)}function tw(e,t){return tk(e)?e:new tE(e,t)}class tE{constructor(e,t){this.__v_isShallow=t,this.dep=void 0,this.__v_isRef=!0,this._rawValue=t?e:ty(e),this._value=t?e:tb(e);}get value(){return tx(this),this._value}set value(e){let t=this.__v_isShallow||tm(e)||tf(e);K(e=t?e:ty(e),this._rawValue)&&(this._rawValue,this._rawValue=e,this._value=t?e:tb(e),tC(this,4));}}function tA(e){return tk(e)?e.value:e}let tN={get:(e,t,n)=>tA(Reflect.get(e,t,n)),set:(e,t,n,r)=>{let i=e[t];return tk(i)&&!tk(n)?(i.value=n,!0):Reflect.set(e,t,n,r)}};function tI(e){return th(e)?e:new Proxy(e,tN)}class tR{constructor(e){this.dep=void 0,this.__v_isRef=!0;let{get:t,set:n}=e(()=>tx(this),()=>tC(this));this._get=t,this._set=n;}get value(){return this._get()}set value(e){this._set(e);}}function tO(e){return new tR(e)}class tL{constructor(e,t,n){this._object=e,this._key=t,this._defaultValue=n,this.__v_isRef=!0;}get value(){let e=this._object[this._key];return void 0===e?this._defaultValue:e}set value(e){this._object[this._key]=e;}get dep(){return function(e,t){let n=eO.get(e);return n&&n.get(t)}(ty(this._object),this._key)}}class tM{constructor(e){this._getter=e,this.__v_isRef=!0,this.__v_isReadonly=!0;}get value(){return this._getter()}}function t$(e,t,n){let r=e[t];return tk(r)?r:new tL(e,t,n)}function tP(e,t,n,r){try{return r?e(...r):e()}catch(e){tD(e,t,n);}}function tF(e,t,n,r){if(E(e)){let i=tP(e,t,n,r);return i&&R(i)&&i.catch(e=>{tD(e,t,n);}),i}if(x(e)){let i=[];for(let l=0;l<e.length;l++)i.push(tF(e[l],t,n,r));return i}}function tD(e,t,n,r=!0){if(t&&t.vnode,t){let r=t.parent,i=t.proxy,l=`https://vuejs.org/error-reference/#runtime-${n}`;for(;r;){let t=r.ec;if(t){for(let n=0;n<t.length;n++)if(!1===t[n](e,i,l))return}r=r.parent;}let s=t.appContext.config.errorHandler;if(s){eT(),tP(s,null,10,[e,i,l]),ew();return}}!function(e,t,n,r=!0){console.error(e);}(e,0,0,r);}let tV=!1,tB=!1,tU=[],tj=0,tH=[],tq=null,tW=0,tK=Promise.resolve(),tz=null;function tG(e){let t=tz||tK;return e?t.then(this?e.bind(this):e):t}function tJ(e){tU.length&&tU.includes(e,tV&&e.allowRecurse?tj+1:tj)||(null==e.id?tU.push(e):tU.splice(function(e){let t=tj+1,n=tU.length;for(;t<n;){let r=t+n>>>1,i=tU[r],l=t0(i);l<e||l===e&&i.pre?t=r+1:n=r;}return t}(e.id),0,e),tX());}function tX(){tV||tB||(tB=!0,tz=tK.then(function e(t){tB=!1,tV=!0,tU.sort(t1);try{for(tj=0;tj<tU.length;tj++){let e=tU[tj];e&&!1!==e.active&&tP(e,e.i,e.i?15:14);}}finally{tj=0,tU.length=0,tY(),tV=!1,tz=null,(tU.length||tH.length)&&e();}}));}function tQ(e){x(e)?tH.push(...e):tq&&tq.includes(e,e.allowRecurse?tW+1:tW)||tH.push(e),tX();}function tZ(e,t,n=tV?tj+1:0){for(;n<tU.length;n++){let t=tU[n];if(t&&t.pre){if(e&&t.id!==e.uid)continue;tU.splice(n,1),n--,t();}}}function tY(e){if(tH.length){let e=[...new Set(tH)].sort((e,t)=>t0(e)-t0(t));if(tH.length=0,tq){tq.push(...e);return}for(tW=0,tq=e;tW<tq.length;tW++){let e=tq[tW];!1!==e.active&&e();}tq=null,tW=0;}}let t0=e=>null==e.id?1/0:e.id,t1=(e,t)=>{let n=t0(e)-t0(t);if(0===n){if(e.pre&&!t.pre)return -1;if(t.pre&&!e.pre)return 1}return n},t2=null,t3=null;function t6(e){let t=t2;return t2=e,t3=e&&e.type.__scopeId||null,t}function t4(e,t=t2,n){if(!t||e._n)return e;let r=(...n)=>{let i;r._d&&ir(-1);let l=t6(t);try{i=e(...n);}finally{t6(l),r._d&&ir(1);}return i};return r._n=!0,r._c=!0,r._d=!0,r}function t8(e,t,n,r){let i=e.dirs,l=t&&t.dirs;for(let s=0;s<i.length;s++){let o=i[s];l&&(o.oldValue=l[s].value);let a=o.dir[r];a&&(eT(),tF(a,n,8,[e.el,o,e,t]),ew());}}let t5=Symbol("_leaveCb"),t9=Symbol("_enterCb");function t7(){let e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return nC(()=>{e.isMounted=!0;}),nw(()=>{e.isUnmounting=!0;}),e}let ne=[Function,Array],nt={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:ne,onEnter:ne,onAfterEnter:ne,onEnterCancelled:ne,onBeforeLeave:ne,onLeave:ne,onAfterLeave:ne,onLeaveCancelled:ne,onBeforeAppear:ne,onAppear:ne,onAfterAppear:ne,onAppearCancelled:ne},nn=e=>{let t=e.subTree;return t.component?nn(t.component):t},nr={name:"BaseTransition",props:nt,setup(e,{slots:t}){let n=ik(),r=t7();return ()=>{let i=t.default&&nc(t.default(),!0);if(!i||!i.length)return;let l=i[0];if(i.length>1){for(let e of i)if(e.type!==r4){l=e;break}}let s=ty(e),{mode:o}=s;if(r.isLeaving)return ns(l);let a=no(l);if(!a)return ns(l);let c=nl(a,s,r,n,e=>c=e);na(a,c);let u=n.subTree,d=u&&no(u);if(d&&d.type!==r4&&!io(a,d)&&nn(n).type!==r4){let e=nl(d,s,r,n);if(na(d,e),"out-in"===o&&a.type!==r4)return r.isLeaving=!0,e.afterLeave=()=>{r.isLeaving=!1,!1!==n.update.active&&(n.effect.dirty=!0,n.update());},ns(l);"in-out"===o&&a.type!==r4&&(e.delayLeave=(e,t,n)=>{ni(r,d)[String(d.key)]=d,e[t5]=()=>{t(),e[t5]=void 0,delete c.delayedLeave;},c.delayedLeave=n;});}return l}}};function ni(e,t){let{leavingVNodes:n}=e,r=n.get(t.type);return r||(r=Object.create(null),n.set(t.type,r)),r}function nl(e,t,n,r,i){let{appear:l,mode:s,persisted:o=!1,onBeforeEnter:a,onEnter:c,onAfterEnter:u,onEnterCancelled:d,onBeforeLeave:p,onLeave:h,onAfterLeave:f,onLeaveCancelled:m,onBeforeAppear:g,onAppear:y,onAfterAppear:b,onAppearCancelled:_}=t,S=String(e.key),C=ni(n,e),k=(e,t)=>{e&&tF(e,r,9,t);},T=(e,t)=>{let n=t[1];k(e,t),x(e)?e.every(e=>e.length<=1)&&n():e.length<=1&&n();},w={mode:s,persisted:o,beforeEnter(t){let r=a;if(!n.isMounted){if(!l)return;r=g||a;}t[t5]&&t[t5](!0);let i=C[S];i&&io(e,i)&&i.el[t5]&&i.el[t5](),k(r,[t]);},enter(e){let t=c,r=u,i=d;if(!n.isMounted){if(!l)return;t=y||c,r=b||u,i=_||d;}let s=!1,o=e[t9]=t=>{s||(s=!0,t?k(i,[e]):k(r,[e]),w.delayedLeave&&w.delayedLeave(),e[t9]=void 0);};t?T(t,[e,o]):o();},leave(t,r){let i=String(e.key);if(t[t9]&&t[t9](!0),n.isUnmounting)return r();k(p,[t]);let l=!1,s=t[t5]=n=>{l||(l=!0,r(),n?k(m,[t]):k(f,[t]),t[t5]=void 0,C[i]!==e||delete C[i]);};C[i]=e,h?T(h,[t,s]):s();},clone(e){let l=nl(e,t,n,r,i);return i&&i(l),l}};return w}function ns(e){if(nh(e))return (e=ih(e)).children=null,e}function no(e){if(!nh(e))return e;let{shapeFlag:t,children:n}=e;if(n){if(16&t)return n[0];if(32&t&&E(n.default))return n.default()}}function na(e,t){6&e.shapeFlag&&e.component?na(e.component.subTree,t):128&e.shapeFlag?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t;}function nc(e,t=!1,n){let r=[],i=0;for(let l=0;l<e.length;l++){let s=e[l],o=null==n?s.key:String(n)+String(null!=s.key?s.key:l);s.type===r3?(128&s.patchFlag&&i++,r=r.concat(nc(s.children,t,o))):(t||s.type!==r4)&&r.push(null!=o?ih(s,{key:o}):s);}if(i>1)for(let e=0;e<r.length;e++)r[e].patchFlag=-2;return r}/*! #__NO_SIDE_EFFECTS__ */function nu(e,t){return E(e)?y({name:e.name},t,{setup:e}):e}let nd=e=>!!e.type.__asyncLoader;function np(e,t){let{ref:n,props:r,children:i,ce:l}=t.vnode,s=id(e,r,i);return s.ref=n,s.ce=l,delete t.vnode.ce,s}let nh=e=>e.type.__isKeepAlive;function nf(e,t){return x(e)?e.some(e=>nf(e,t)):A(e)?e.split(",").includes(t):!!w(e)&&e.test(t)}function nm(e,t){ny(e,"a",t);}function ng(e,t){ny(e,"da",t);}function ny(e,t,n=iC){let r=e.__wdc||(e.__wdc=()=>{let t=n;for(;t;){if(t.isDeactivated)return;t=t.parent;}return e()});if(n_(t,r,n),n){let e=n.parent;for(;e&&e.parent;)nh(e.parent.vnode)&&function(e,t,n,r){let i=n_(t,e,r,!0);nE(()=>{b(r[t],i);},n);}(r,t,n,e),e=e.parent;}}function nv(e){e.shapeFlag&=-257,e.shapeFlag&=-513;}function nb(e){return 128&e.shapeFlag?e.ssContent:e}function n_(e,t,n=iC,r=!1){if(n){let i=n[e]||(n[e]=[]),l=t.__weh||(t.__weh=(...r)=>{eT();let i=iT(n),l=tF(t,n,e,r);return i(),ew(),l});return r?i.unshift(l):i.push(l),l}}let nS=e=>(t,n=iC)=>{iA&&"sp"!==e||n_(e,(...e)=>t(...e),n);},nx=nS("bm"),nC=nS("m"),nk=nS("bu"),nT=nS("u"),nw=nS("bum"),nE=nS("um"),nA=nS("sp"),nN=nS("rtg"),nI=nS("rtc");function nR(e,t=iC){n_("ec",e,t);}let nO="components",nL=Symbol.for("v-ndc");function nM(e,t,n=!0,r=!1){let i=t2||iC;if(i){let n=i.type;if(e===nO){let e=i$(n,!1);if(e&&(e===t||e===U(t)||e===q(U(t))))return n}let l=n$(i[e]||n[e],t)||n$(i.appContext[e],t);return !l&&r?n:l}}function n$(e,t){return e&&(e[t]||e[U(t)]||e[q(U(t))])}let nP=e=>e?iE(e)?iM(e):nP(e.parent):null,nF=y(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>nP(e.parent),$root:e=>nP(e.root),$emit:e=>e.emit,$options:e=>nW(e),$forceUpdate:e=>e.f||(e.f=()=>{e.effect.dirty=!0,tJ(e.update);}),$nextTick:e=>e.n||(e.n=tG.bind(e.proxy)),$watch:e=>rV.bind(e)}),nD=(e,t)=>e!==d&&!e.__isScriptSetup&&S(e,t),nV={get({_:e},t){let n,r,i;if("__v_skip"===t)return !0;let{ctx:l,setupState:s,data:o,props:a,accessCache:c,type:u,appContext:p}=e;if("$"!==t[0]){let r=c[t];if(void 0!==r)switch(r){case 1:return s[t];case 2:return o[t];case 4:return l[t];case 3:return a[t]}else {if(nD(s,t))return c[t]=1,s[t];if(o!==d&&S(o,t))return c[t]=2,o[t];if((n=e.propsOptions[0])&&S(n,t))return c[t]=3,a[t];if(l!==d&&S(l,t))return c[t]=4,l[t];nH&&(c[t]=0);}}let h=nF[t];return h?("$attrs"===t&&e$(e.attrs,"get",""),h(e)):(r=u.__cssModules)&&(r=r[t])?r:l!==d&&S(l,t)?(c[t]=4,l[t]):S(i=p.config.globalProperties,t)?i[t]:void 0},set({_:e},t,n){let{data:r,setupState:i,ctx:l}=e;return nD(i,t)?(i[t]=n,!0):r!==d&&S(r,t)?(r[t]=n,!0):!S(e.props,t)&&!("$"===t[0]&&t.slice(1) in e)&&(l[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:i,propsOptions:l}},s){let o;return !!n[s]||e!==d&&S(e,s)||nD(t,s)||(o=l[0])&&S(o,s)||S(r,s)||S(nF,s)||S(i.config.globalProperties,s)},defineProperty(e,t,n){return null!=n.get?e._.accessCache[t]=0:S(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}},nB=y({},nV,{get(e,t){if(t!==Symbol.unscopables)return nV.get(e,t,e)},has:(e,t)=>"_"!==t[0]&&!Z(t)});function nU(){let e=ik();return e.setupContext||(e.setupContext=iL(e))}function nj(e){return x(e)?e.reduce((e,t)=>(e[t]=null,e),{}):e}let nH=!0;function nq(e,t,n){tF(x(e)?e.map(e=>e.bind(t.proxy)):e.bind(t.proxy),t,n);}function nW(e){let t;let n=e.type,{mixins:r,extends:i}=n,{mixins:l,optionsCache:s,config:{optionMergeStrategies:o}}=e.appContext,a=s.get(n);return a?t=a:l.length||r||i?(t={},l.length&&l.forEach(e=>nK(t,e,o,!0)),nK(t,n,o)):t=n,I(n)&&s.set(n,t),t}function nK(e,t,n,r=!1){let{mixins:i,extends:l}=t;for(let s in l&&nK(e,l,n,!0),i&&i.forEach(t=>nK(e,t,n,!0)),t)if(r&&"expose"===s);else {let r=nz[s]||n&&n[s];e[s]=r?r(e[s],t[s]):t[s];}return e}let nz={data:nG,props:nZ,emits:nZ,methods:nQ,computed:nQ,beforeCreate:nX,created:nX,beforeMount:nX,mounted:nX,beforeUpdate:nX,updated:nX,beforeDestroy:nX,beforeUnmount:nX,destroyed:nX,unmounted:nX,activated:nX,deactivated:nX,errorCaptured:nX,serverPrefetch:nX,components:nQ,directives:nQ,watch:function(e,t){if(!e)return t;if(!t)return e;let n=y(Object.create(null),e);for(let r in t)n[r]=nX(e[r],t[r]);return n},provide:nG,inject:function(e,t){return nQ(nJ(e),nJ(t))}};function nG(e,t){return t?e?function(){return y(E(e)?e.call(this,this):e,E(t)?t.call(this,this):t)}:t:e}function nJ(e){if(x(e)){let t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function nX(e,t){return e?[...new Set([].concat(e,t))]:t}function nQ(e,t){return e?y(Object.create(null),e,t):t}function nZ(e,t){return e?x(e)&&x(t)?[...new Set([...e,...t])]:y(Object.create(null),nj(e),nj(null!=t?t:{})):t}function nY(){return {app:null,config:{isNativeTag:f,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let n0=0,n1=null;function n2(e,t){if(iC){let n=iC.provides,r=iC.parent&&iC.parent.provides;r===n&&(n=iC.provides=Object.create(r)),n[e]=t;}}function n3(e,t,n=!1){let r=iC||t2;if(r||n1){let i=n1?n1._context.provides:r?null==r.parent?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(i&&e in i)return i[e];if(arguments.length>1)return n&&E(t)?t.call(r&&r.proxy):t}}let n6={},n4=()=>Object.create(n6),n8=e=>Object.getPrototypeOf(e)===n6;function n5(e,t,n,r){let i;let[l,s]=e.propsOptions,o=!1;if(t)for(let a in t){let c;if(F(a))continue;let u=t[a];l&&S(l,c=U(a))?s&&s.includes(c)?(i||(i={}))[c]=u:n[c]=u:rq(e.emitsOptions,a)||a in r&&u===r[a]||(r[a]=u,o=!0);}if(s){let t=ty(n),r=i||d;for(let i=0;i<s.length;i++){let o=s[i];n[o]=n9(l,t,o,r[o],e,!S(r,o));}}return o}function n9(e,t,n,r,i,l){let s=e[n];if(null!=s){let e=S(s,"default");if(e&&void 0===r){let e=s.default;if(s.type!==Function&&!s.skipFactory&&E(e)){let{propsDefaults:l}=i;if(n in l)r=l[n];else {let s=iT(i);r=l[n]=e.call(null,t),s();}}else r=e;}s[0]&&(l&&!e?r=!1:s[1]&&(""===r||r===H(n))&&(r=!0));}return r}let n7=new WeakMap;function re(e){return !("$"===e[0]||F(e))}let rt=e=>"_"===e[0]||"$stable"===e,rn=e=>x(e)?e.map(ig):[ig(e)],rr=(e,t,n)=>{if(t._n)return t;let r=t4((...e)=>rn(t(...e)),n);return r._c=!1,r},ri=(e,t,n)=>{let r=e._ctx;for(let n in e){if(rt(n))continue;let i=e[n];if(E(i))t[n]=rr(n,i,r);else if(null!=i){let e=rn(i);t[n]=()=>e;}}},rl=(e,t)=>{let n=rn(t);e.slots.default=()=>n;},rs=(e,t,n)=>{for(let r in t)(n||"_"!==r)&&(e[r]=t[r]);},ro=(e,t,n)=>{let r=e.slots=n4();if(32&e.vnode.shapeFlag){let e=t._;e?(rs(r,t,n),n&&G(r,"_",e,!0)):ri(t,r);}else t&&rl(e,t);},ra=(e,t,n)=>{let{vnode:r,slots:i}=e,l=!0,s=d;if(32&r.shapeFlag){let e=t._;e?n&&1===e?l=!1:rs(i,t,n):(l=!t.$stable,ri(t,i)),s=t;}else t&&(rl(e,t),s={default:1});if(l)for(let e in i)rt(e)||null!=s[e]||delete i[e];};function rc(e,t,n,r,i=!1){if(x(e)){e.forEach((e,l)=>rc(e,t&&(x(t)?t[l]:t),n,r,i));return}if(nd(r)&&!i)return;let l=4&r.shapeFlag?iM(r.component):r.el,s=i?null:l,{i:o,r:a}=e,c=t&&t.r,u=o.refs===d?o.refs={}:o.refs,p=o.setupState;if(null!=c&&c!==a&&(A(c)?(u[c]=null,S(p,c)&&(p[c]=null)):tk(c)&&(c.value=null)),E(a))tP(a,o,12,[s,u]);else {let t=A(a),r=tk(a);if(t||r){let o=()=>{if(e.f){let n=t?S(p,a)?p[a]:u[a]:a.value;i?x(n)&&b(n,l):x(n)?n.includes(l)||n.push(l):t?(u[a]=[l],S(p,a)&&(p[a]=u[a])):(a.value=[l],e.k&&(u[e.k]=a.value));}else t?(u[a]=s,S(p,a)&&(p[a]=s)):r&&(a.value=s,e.k&&(u[e.k]=s));};s?(o.id=-1,rw(o,n)):o();}}}let ru=Symbol("_vte"),rd=e=>e.__isTeleport,rp=e=>e&&(e.disabled||""===e.disabled),rh=e=>"undefined"!=typeof SVGElement&&e instanceof SVGElement,rf=e=>"function"==typeof MathMLElement&&e instanceof MathMLElement,rm=(e,t)=>{let n=e&&e.to;return A(n)?t?t(n):null:n};function rg(e,t,n,{o:{insert:r},m:i},l=2){0===l&&r(e.targetAnchor,t,n);let{el:s,anchor:o,shapeFlag:a,children:c,props:u}=e,d=2===l;if(d&&r(s,t,n),(!d||rp(u))&&16&a)for(let e=0;e<c.length;e++)i(c[e],t,n,2);d&&r(o,t,n);}function ry(e){let t=e.ctx;if(t&&t.ut){let n=e.children[0].el;for(;n&&n!==e.targetAnchor;)1===n.nodeType&&n.setAttribute("data-v-owner",t.uid),n=n.nextSibling;t.ut();}}function rv(e,t,n,r){let i=t.targetStart=n(""),l=t.targetAnchor=n("");return i[ru]=l,e&&(r(i,e),r(l,e)),l}let rb=!1,r_=()=>{rb||(console.error("Hydration completed but contains mismatches."),rb=!0);},rS=e=>e.namespaceURI.includes("svg")&&"foreignObject"!==e.tagName,rx=e=>e.namespaceURI.includes("MathML"),rC=e=>rS(e)?"svg":rx(e)?"mathml":void 0,rk=e=>8===e.nodeType;function rT(e){let{mt:t,p:n,o:{patchProp:r,createText:i,nextSibling:l,parentNode:s,remove:o,insert:a,createComment:c}}=e,u=(n,r,o,c,m,_=!1)=>{_=_||!!r.dynamicChildren;let S=rk(n)&&"["===n.data,x=()=>f(n,r,o,c,m,S),{type:C,ref:k,shapeFlag:T,patchFlag:w}=r,E=n.nodeType;r.el=n,-2===w&&(_=!1,r.dynamicChildren=null);let A=null;switch(C){case r6:3!==E?""===r.children?(a(r.el=i(""),s(n),n),A=n):A=x():(n.data!==r.children&&(r_(),n.data=r.children),A=l(n));break;case r4:b(n)?(A=l(n),y(r.el=n.content.firstChild,n,o)):A=8!==E||S?x():l(n);break;case r8:if(S&&(E=(n=l(n)).nodeType),1===E||3===E){A=n;let e=!r.children.length;for(let t=0;t<r.staticCount;t++)e&&(r.children+=1===A.nodeType?A.outerHTML:A.data),t===r.staticCount-1&&(r.anchor=A),A=l(A);return S?l(A):A}x();break;case r3:A=S?h(n,r,o,c,m,_):x();break;default:if(1&T)A=1===E&&r.type.toLowerCase()===n.tagName.toLowerCase()||b(n)?d(n,r,o,c,m,_):x();else if(6&T){r.slotScopeIds=m;let e=s(n);if(A=S?g(n):rk(n)&&"teleport start"===n.data?g(n,n.data,"teleport end"):l(n),t(r,e,null,o,c,rC(e),_),nd(r)){let t;S?(t=id(r3)).anchor=A?A.previousSibling:e.lastChild:t=3===n.nodeType?im(""):id("div"),t.el=n,r.component.subTree=t;}}else 64&T?A=8!==E?x():r.type.hydrate(n,r,o,c,m,_,e,p):128&T&&(A=r.type.hydrate(n,r,o,c,rC(s(n)),m,_,e,u));}return null!=k&&rc(k,null,c,r),A},d=(e,t,n,i,l,s)=>{s=s||!!t.dynamicChildren;let{type:a,props:c,patchFlag:u,shapeFlag:d,dirs:h,transition:f}=t,g="input"===a||"option"===a;if(g||-1!==u){let a;h&&t8(t,null,n,"created");let _=!1;if(b(e)){_=rR(i,f)&&n&&n.vnode.props&&n.vnode.props.appear;let r=e.content.firstChild;_&&f.beforeEnter(r),y(r,e,n),t.el=e=r;}if(16&d&&!(c&&(c.innerHTML||c.textContent))){let r=p(e.firstChild,t,e,n,i,l,s);for(;r;){r_();let e=r;r=r.nextSibling,o(e);}}else 8&d&&e.textContent!==t.children&&(r_(),e.textContent=t.children);if(c){if(g||!s||48&u){let t=e.tagName.includes("-");for(let i in c)(g&&(i.endsWith("value")||"indeterminate"===i)||m(i)&&!F(i)||"."===i[0]||t)&&r(e,i,null,c[i],void 0,n);}else if(c.onClick)r(e,"onClick",null,c.onClick,void 0,n);else if(4&u&&th(c.style))for(let e in c.style)c.style[e];}(a=c&&c.onVnodeBeforeMount)&&i_(a,n,t),h&&t8(t,null,n,"beforeMount"),((a=c&&c.onVnodeMounted)||h||_)&&r1(()=>{a&&i_(a,n,t),_&&f.enter(e),h&&t8(t,null,n,"mounted");},i);}return e.nextSibling},p=(e,t,r,s,o,c,d)=>{d=d||!!t.dynamicChildren;let p=t.children,h=p.length;for(let t=0;t<h;t++){let h=d?p[t]:p[t]=ig(p[t]),f=h.type===r6;if(e){if(f&&!d){let n=p[t+1];n&&(n=ig(n)).type===r6&&(a(i(e.data.slice(h.children.length)),r,l(e)),e.data=h.children);}e=u(e,h,s,o,c,d);}else f&&!h.children?a(h.el=i(""),r):(r_(),n(null,h,r,null,s,o,rC(r),c));}return e},h=(e,t,n,r,i,o)=>{let{slotScopeIds:u}=t;u&&(i=i?i.concat(u):u);let d=s(e),h=p(l(e),t,d,n,r,i,o);return h&&rk(h)&&"]"===h.data?l(t.anchor=h):(r_(),a(t.anchor=c("]"),d,h),h)},f=(e,t,r,i,a,c)=>{if(r_(),t.el=null,c){let t=g(e);for(;;){let n=l(e);if(n&&n!==t)o(n);else break}}let u=l(e),d=s(e);return o(e),n(null,t,d,u,r,i,rC(d),a),u},g=(e,t="[",n="]")=>{let r=0;for(;e;)if((e=l(e))&&rk(e)&&(e.data===t&&r++,e.data===n)){if(0===r)return l(e);r--;}return e},y=(e,t,n)=>{let r=t.parentNode;r&&r.replaceChild(e,t);let i=n;for(;i;)i.vnode.el===t&&(i.vnode.el=i.subTree.el=e),i=i.parent;},b=e=>1===e.nodeType&&"template"===e.tagName.toLowerCase();return [(e,t)=>{if(!t.hasChildNodes()){n(null,e,t),tY(),t._vnode=e;return}u(t.firstChild,e,null,null,null),tY(),t._vnode=e;},u]}let rw=r1;function rE(e){return rA(e,rT)}function rA(e,t){var n;let r,i;Q().__VUE__=!0;let{insert:s,remove:o,patchProp:a,createElement:c,createText:u,createComment:f,setText:m,setElementText:g,parentNode:b,nextSibling:_,setScopeId:C=h,insertStaticContent:k}=e,T=(e,t,n,r=null,i=null,l=null,s,o=null,a=!!t.dynamicChildren)=>{if(e===t)return;e&&!io(e,t)&&(r=eo(e),en(e,i,l,!0),e=null),-2===t.patchFlag&&(a=!1,t.dynamicChildren=null);let{type:c,ref:u,shapeFlag:d}=t;switch(c){case r6:w(e,t,n,r);break;case r4:A(e,t,n,r);break;case r8:null==e&&N(t,n,r,s);break;case r3:q(e,t,n,r,i,l,s,o,a);break;default:1&d?M(e,t,n,r,i,l,s,o,a):6&d?W(e,t,n,r,i,l,s,o,a):64&d?c.process(e,t,n,r,i,l,s,o,a,eu):128&d&&c.process(e,t,n,r,i,l,s,o,a,eu);}null!=u&&i&&rc(u,e&&e.ref,l,t||e,!t);},w=(e,t,n,r)=>{if(null==e)s(t.el=u(t.children),n,r);else {let n=t.el=e.el;t.children!==e.children&&m(n,t.children);}},A=(e,t,n,r)=>{null==e?s(t.el=f(t.children||""),n,r):t.el=e.el;},N=(e,t,n,r)=>{[e.el,e.anchor]=k(e.children,t,n,r,e.el,e.anchor);},O=({el:e,anchor:t},n,r)=>{let i;for(;e&&e!==t;)i=_(e),s(e,n,r),e=i;s(t,n,r);},L=({el:e,anchor:t})=>{let n;for(;e&&e!==t;)n=_(e),o(e),e=n;o(t);},M=(e,t,n,r,i,l,s,o,a)=>{"svg"===t.type?s="svg":"math"===t.type&&(s="mathml"),null==e?$(t,n,r,i,l,s,o,a):V(e,t,i,l,s,o,a);},$=(e,t,n,r,i,l,o,u)=>{let d,p;let{props:h,shapeFlag:f,transition:m,dirs:y}=e;if(d=e.el=c(e.type,l,h&&h.is,h),8&f?g(d,e.children):16&f&&D(e.children,d,null,r,i,rN(e,l),o,u),y&&t8(e,null,r,"created"),P(d,e,e.scopeId,o,r),h){for(let e in h)"value"===e||F(e)||a(d,e,null,h[e],l,r);"value"in h&&a(d,"value",null,h.value,l),(p=h.onVnodeBeforeMount)&&i_(p,r,e);}y&&t8(e,null,r,"beforeMount");let b=rR(i,m);b&&m.beforeEnter(d),s(d,t,n),((p=h&&h.onVnodeMounted)||b||y)&&rw(()=>{p&&i_(p,r,e),b&&m.enter(d),y&&t8(e,null,r,"mounted");},i);},P=(e,t,n,r,i)=>{if(n&&C(e,n),r)for(let t=0;t<r.length;t++)C(e,r[t]);if(i&&t===i.subTree){let t=i.vnode;P(e,t,t.scopeId,t.slotScopeIds,i.parent);}},D=(e,t,n,r,i,l,s,o,a=0)=>{for(let c=a;c<e.length;c++)T(null,e[c]=o?iy(e[c]):ig(e[c]),t,n,r,i,l,s,o);},V=(e,t,n,r,i,l,s)=>{let o;let c=t.el=e.el,{patchFlag:u,dynamicChildren:p,dirs:h}=t;u|=16&e.patchFlag;let f=e.props||d,m=t.props||d;if(n&&rI(n,!1),(o=m.onVnodeBeforeUpdate)&&i_(o,n,t,e),h&&t8(t,e,n,"beforeUpdate"),n&&rI(n,!0),(f.innerHTML&&null==m.innerHTML||f.textContent&&null==m.textContent)&&g(c,""),p?B(e.dynamicChildren,p,c,n,r,rN(t,i),l):s||Z(e,t,c,null,n,r,rN(t,i),l,!1),u>0){if(16&u)j(c,f,m,n,i);else if(2&u&&f.class!==m.class&&a(c,"class",null,m.class,i),4&u&&a(c,"style",f.style,m.style,i),8&u){let e=t.dynamicProps;for(let t=0;t<e.length;t++){let r=e[t],l=f[r],s=m[r];(s!==l||"value"===r)&&a(c,r,l,s,i,n);}}1&u&&e.children!==t.children&&g(c,t.children);}else s||null!=p||j(c,f,m,n,i);((o=m.onVnodeUpdated)||h)&&rw(()=>{o&&i_(o,n,t,e),h&&t8(t,e,n,"updated");},r);},B=(e,t,n,r,i,l,s)=>{for(let o=0;o<t.length;o++){let a=e[o],c=t[o],u=a.el&&(a.type===r3||!io(a,c)||70&a.shapeFlag)?b(a.el):n;T(a,c,u,null,r,i,l,s,!0);}},j=(e,t,n,r,i)=>{if(t!==n){if(t!==d)for(let l in t)F(l)||l in n||a(e,l,t[l],null,i,r);for(let l in n){if(F(l))continue;let s=n[l],o=t[l];s!==o&&"value"!==l&&a(e,l,o,s,i,r);}"value"in n&&a(e,"value",t.value,n.value,i);}},q=(e,t,n,r,i,l,o,a,c)=>{let d=t.el=e?e.el:u(""),p=t.anchor=e?e.anchor:u(""),{patchFlag:h,dynamicChildren:f,slotScopeIds:m}=t;m&&(a=a?a.concat(m):m),null==e?(s(d,n,r),s(p,n,r),D(t.children||[],n,p,i,l,o,a,c)):h>0&&64&h&&f&&e.dynamicChildren?(B(e.dynamicChildren,f,n,i,l,o,a),(null!=t.key||i&&t===i.subTree)&&rO(e,t,!0)):Z(e,t,n,p,i,l,o,a,c);},W=(e,t,n,r,i,l,s,o,a)=>{t.slotScopeIds=o,null==e?512&t.shapeFlag?i.ctx.activate(t,n,r,s,a):K(t,n,r,i,l,s,a):G(e,t,a);},K=(e,t,n,r,i,s,o)=>{let a=e.component=function(e,t,n){let r=e.type,i=(t?t.appContext:e.appContext)||iS,l={uid:ix++,vnode:e,type:r,parent:t,appContext:i,root:null,next:null,subTree:null,effect:null,update:null,scope:new eg(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(i.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:function e(t,n,r=!1){let i=r?n7:n.propsCache,l=i.get(t);if(l)return l;let s=t.props,o={},a=[],c=!1;if(!E(t)){let i=t=>{c=!0;let[r,i]=e(t,n,!0);y(o,r),i&&a.push(...i);};!r&&n.mixins.length&&n.mixins.forEach(i),t.extends&&i(t.extends),t.mixins&&t.mixins.forEach(i);}if(!s&&!c)return I(t)&&i.set(t,p),p;if(x(s))for(let e=0;e<s.length;e++){let t=U(s[e]);re(t)&&(o[t]=d);}else if(s)for(let e in s){let t=U(e);if(re(t)){let n=s[e],r=o[t]=x(n)||E(n)?{type:n}:y({},n),i=r.type,l=!1,c=!0;if(x(i))for(let e=0;e<i.length;++e){let t=i[e],n=E(t)&&t.name;if("Boolean"===n){l=!0;break}"String"===n&&(c=!1);}else l=E(i)&&"Boolean"===i.name;r[0]=l,r[1]=c,(l||S(r,"default"))&&a.push(t);}}let u=[o,a];return I(t)&&i.set(t,u),u}(r,i),emitsOptions:function e(t,n,r=!1){let i=n.emitsCache,l=i.get(t);if(void 0!==l)return l;let s=t.emits,o={},a=!1;if(!E(t)){let i=t=>{let r=e(t,n,!0);r&&(a=!0,y(o,r));};!r&&n.mixins.length&&n.mixins.forEach(i),t.extends&&i(t.extends),t.mixins&&t.mixins.forEach(i);}return s||a?(x(s)?s.forEach(e=>o[e]=null):y(o,s),I(t)&&i.set(t,o),o):(I(t)&&i.set(t,null),null)}(r,i),emit:null,emitted:null,propsDefaults:d,inheritAttrs:r.inheritAttrs,ctx:d,data:d,props:d,attrs:d,slots:d,refs:d,setupState:d,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return l.ctx={_:l},l.root=t?t.root:l,l.emit=rH.bind(null,l),e.ce&&e.ce(l),l}(e,r,i);nh(e)&&(a.ctx.renderer=eu),function(e,t=!1,n=!1){t&&l(t);let{props:r,children:i}=e.vnode,s=iE(e);(function(e,t,n,r=!1){let i={},l=n4();for(let n in e.propsDefaults=Object.create(null),n5(e,t,i,l),e.propsOptions[0])n in i||(i[n]=void 0);n?e.props=r?i:tu(i):e.type.props?e.props=i:e.props=l,e.attrs=l;})(e,r,s,t),ro(e,i,n),s&&function(e,t){let n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,nV);let{setup:r}=n;if(r){let n=e.setupContext=r.length>1?iL(e):null,i=iT(e);eT();let l=tP(r,e,0,[e.props,n]);if(ew(),i(),R(l)){if(l.then(iw,iw),t)return l.then(n=>{iN(e,n,t);}).catch(t=>{tD(t,e,0);});e.asyncDep=l;}else iN(e,l,t);}else iR(e,t);}(e,t),t&&l(!1);}(a,!1,o),a.asyncDep?(i&&i.registerDep(a,J,o),e.el||A(null,a.subTree=id(r4),t,n)):J(a,e,t,n,i,s,o);},G=(e,t,n)=>{let r=t.component=e.component;if(function(e,t,n){let{props:r,children:i,component:l}=e,{props:s,children:o,patchFlag:a}=t,c=l.emitsOptions;if(t.dirs||t.transition)return !0;if(!n||!(a>=0))return (!!i||!!o)&&(!o||!o.$stable)||r!==s&&(r?!s||rG(r,s,c):!!s);if(1024&a)return !0;if(16&a)return r?rG(r,s,c):!!s;if(8&a){let e=t.dynamicProps;for(let t=0;t<e.length;t++){let n=e[t];if(s[n]!==r[n]&&!rq(c,n))return !0}}return !1}(e,t,n)){if(r.asyncDep&&!r.asyncResolved){X(r,t,n);return}r.next=t,function(e){let t=tU.indexOf(e);t>tj&&tU.splice(t,1);}(r.update),r.effect.dirty=!0,r.update();}else t.el=e.el,r.vnode=t;},J=(e,t,n,r,l,s,o)=>{let a=()=>{if(e.isMounted){let t,{next:n,bu:r,u:i,parent:c,vnode:u}=e;{let t=function e(t){let n=t.subTree.component;if(n)return n.asyncDep&&!n.asyncResolved?n:e(n)}(e);if(t){n&&(n.el=u.el,X(e,n,o)),t.asyncDep.then(()=>{e.isUnmounted||a();});return}}let d=n;rI(e,!1),n?(n.el=u.el,X(e,n,o)):n=u,r&&z(r),(t=n.props&&n.props.onVnodeBeforeUpdate)&&i_(t,c,n,u),rI(e,!0);let p=rW(e),h=e.subTree;e.subTree=p,T(h,p,b(h.el),eo(h),e,l,s),n.el=p.el,null===d&&rJ(e,p.el),i&&rw(i,l),(t=n.props&&n.props.onVnodeUpdated)&&rw(()=>i_(t,c,n,u),l);}else {let o;let{el:a,props:c}=t,{bm:u,m:d,parent:p}=e,h=nd(t);if(rI(e,!1),u&&z(u),!h&&(o=c&&c.onVnodeBeforeMount)&&i_(o,p,t),rI(e,!0),a&&i){let n=()=>{e.subTree=rW(e),i(a,e.subTree,e,l,null);};h?t.type.__asyncLoader().then(()=>!e.isUnmounted&&n()):n();}else {let i=e.subTree=rW(e);T(null,i,n,r,e,l,s),t.el=i.el;}if(d&&rw(d,l),!h&&(o=c&&c.onVnodeMounted)){let e=t;rw(()=>i_(o,p,e),l);}(256&t.shapeFlag||p&&nd(p.vnode)&&256&p.vnode.shapeFlag)&&e.a&&rw(e.a,l),e.isMounted=!0,t=n=r=null;}},c=e.effect=new ev(a,h,()=>tJ(u),e.scope),u=e.update=()=>{c.dirty&&c.run();};u.i=e,u.id=e.uid,rI(e,!0),u();},X=(e,t,n)=>{t.component=e;let r=e.vnode.props;e.vnode=t,e.next=null,function(e,t,n,r){let{props:i,attrs:l,vnode:{patchFlag:s}}=e,o=ty(i),[a]=e.propsOptions,c=!1;if((r||s>0)&&!(16&s)){if(8&s){let n=e.vnode.dynamicProps;for(let r=0;r<n.length;r++){let s=n[r];if(rq(e.emitsOptions,s))continue;let u=t[s];if(a){if(S(l,s))u!==l[s]&&(l[s]=u,c=!0);else {let t=U(s);i[t]=n9(a,o,t,u,e,!1);}}else u!==l[s]&&(l[s]=u,c=!0);}}}else {let r;for(let s in n5(e,t,i,l)&&(c=!0),o)t&&(S(t,s)||(r=H(s))!==s&&S(t,r))||(a?n&&(void 0!==n[s]||void 0!==n[r])&&(i[s]=n9(a,o,s,void 0,e,!0)):delete i[s]);if(l!==o)for(let e in l)t&&S(t,e)||(delete l[e],c=!0);}c&&eP(e.attrs,"set","");}(e,t.props,r,n),ra(e,t.children,n),eT(),tZ(e),ew();},Z=(e,t,n,r,i,l,s,o,a=!1)=>{let c=e&&e.children,u=e?e.shapeFlag:0,d=t.children,{patchFlag:p,shapeFlag:h}=t;if(p>0){if(128&p){ee(c,d,n,r,i,l,s,o,a);return}if(256&p){Y(c,d,n,r,i,l,s,o,a);return}}8&h?(16&u&&es(c,i,l),d!==c&&g(n,d)):16&u?16&h?ee(c,d,n,r,i,l,s,o,a):es(c,i,l,!0):(8&u&&g(n,""),16&h&&D(d,n,r,i,l,s,o,a));},Y=(e,t,n,r,i,l,s,o,a)=>{let c;e=e||p,t=t||p;let u=e.length,d=t.length,h=Math.min(u,d);for(c=0;c<h;c++){let r=t[c]=a?iy(t[c]):ig(t[c]);T(e[c],r,n,null,i,l,s,o,a);}u>d?es(e,i,l,!0,!1,h):D(t,n,r,i,l,s,o,a,h);},ee=(e,t,n,r,i,l,s,o,a)=>{let c=0,u=t.length,d=e.length-1,h=u-1;for(;c<=d&&c<=h;){let r=e[c],u=t[c]=a?iy(t[c]):ig(t[c]);if(io(r,u))T(r,u,n,null,i,l,s,o,a);else break;c++;}for(;c<=d&&c<=h;){let r=e[d],c=t[h]=a?iy(t[h]):ig(t[h]);if(io(r,c))T(r,c,n,null,i,l,s,o,a);else break;d--,h--;}if(c>d){if(c<=h){let e=h+1,d=e<u?t[e].el:r;for(;c<=h;)T(null,t[c]=a?iy(t[c]):ig(t[c]),n,d,i,l,s,o,a),c++;}}else if(c>h)for(;c<=d;)en(e[c],i,l,!0),c++;else {let f;let m=c,g=c,y=new Map;for(c=g;c<=h;c++){let e=t[c]=a?iy(t[c]):ig(t[c]);null!=e.key&&y.set(e.key,c);}let b=0,_=h-g+1,S=!1,x=0,C=Array(_);for(c=0;c<_;c++)C[c]=0;for(c=m;c<=d;c++){let r;let u=e[c];if(b>=_){en(u,i,l,!0);continue}if(null!=u.key)r=y.get(u.key);else for(f=g;f<=h;f++)if(0===C[f-g]&&io(u,t[f])){r=f;break}void 0===r?en(u,i,l,!0):(C[r-g]=c+1,r>=x?x=r:S=!0,T(u,t[r],n,null,i,l,s,o,a),b++);}let k=S?function(e){let t,n,r,i,l;let s=e.slice(),o=[0],a=e.length;for(t=0;t<a;t++){let a=e[t];if(0!==a){if(e[n=o[o.length-1]]<a){s[t]=n,o.push(t);continue}for(r=0,i=o.length-1;r<i;)e[o[l=r+i>>1]]<a?r=l+1:i=l;a<e[o[r]]&&(r>0&&(s[t]=o[r-1]),o[r]=t);}}for(r=o.length,i=o[r-1];r-- >0;)o[r]=i,i=s[i];return o}(C):p;for(f=k.length-1,c=_-1;c>=0;c--){let e=g+c,d=t[e],p=e+1<u?t[e+1].el:r;0===C[c]?T(null,d,n,p,i,l,s,o,a):S&&(f<0||c!==k[f]?et(d,n,p,2):f--);}}},et=(e,t,n,r,i=null)=>{let{el:l,type:o,transition:a,children:c,shapeFlag:u}=e;if(6&u){et(e.component.subTree,t,n,r);return}if(128&u){e.suspense.move(t,n,r);return}if(64&u){o.move(e,t,n,eu);return}if(o===r3){s(l,t,n);for(let e=0;e<c.length;e++)et(c[e],t,n,r);s(e.anchor,t,n);return}if(o===r8){O(e,t,n);return}if(2!==r&&1&u&&a){if(0===r)a.beforeEnter(l),s(l,t,n),rw(()=>a.enter(l),i);else {let{leave:e,delayLeave:r,afterLeave:i}=a,o=()=>s(l,t,n),c=()=>{e(l,()=>{o(),i&&i();});};r?r(l,o,c):c();}}else s(l,t,n);},en=(e,t,n,r=!1,i=!1)=>{let l;let{type:s,props:o,ref:a,children:c,dynamicChildren:u,shapeFlag:d,patchFlag:p,dirs:h,cacheIndex:f}=e;if(-2===p&&(i=!1),null!=a&&rc(a,null,n,e,!0),null!=f&&(t.renderCache[f]=void 0),256&d){t.ctx.deactivate(e);return}let m=1&d&&h,g=!nd(e);if(g&&(l=o&&o.onVnodeBeforeUnmount)&&i_(l,t,e),6&d)el(e.component,n,r);else {if(128&d){e.suspense.unmount(n,r);return}m&&t8(e,null,t,"beforeUnmount"),64&d?e.type.remove(e,t,n,eu,r):u&&!u.hasOnce&&(s!==r3||p>0&&64&p)?es(u,t,n,!1,!0):(s===r3&&384&p||!i&&16&d)&&es(c,t,n),r&&er(e);}(g&&(l=o&&o.onVnodeUnmounted)||m)&&rw(()=>{l&&i_(l,t,e),m&&t8(e,null,t,"unmounted");},n);},er=e=>{let{type:t,el:n,anchor:r,transition:i}=e;if(t===r3){ei(n,r);return}if(t===r8){L(e);return}let l=()=>{o(n),i&&!i.persisted&&i.afterLeave&&i.afterLeave();};if(1&e.shapeFlag&&i&&!i.persisted){let{leave:t,delayLeave:r}=i,s=()=>t(n,l);r?r(e.el,l,s):s();}else l();},ei=(e,t)=>{let n;for(;e!==t;)n=_(e),o(e),e=n;o(t);},el=(e,t,n)=>{let{bum:r,scope:i,update:l,subTree:s,um:o,m:a,a:c}=e;rL(a),rL(c),r&&z(r),i.stop(),l&&(l.active=!1,en(s,e,t,n)),o&&rw(o,t),rw(()=>{e.isUnmounted=!0;},t),t&&t.pendingBranch&&!t.isUnmounted&&e.asyncDep&&!e.asyncResolved&&e.suspenseId===t.pendingId&&(t.deps--,0===t.deps&&t.resolve());},es=(e,t,n,r=!1,i=!1,l=0)=>{for(let s=l;s<e.length;s++)en(e[s],t,n,r,i);},eo=e=>{if(6&e.shapeFlag)return eo(e.component.subTree);if(128&e.shapeFlag)return e.suspense.next();let t=_(e.anchor||e.el),n=t&&t[ru];return n?_(n):t},ea=!1,ec=(e,t,n)=>{null==e?t._vnode&&en(t._vnode,null,null,!0):T(t._vnode||null,e,t,null,null,null,n),t._vnode=e,ea||(ea=!0,tZ(),tY(),ea=!1);},eu={p:T,um:en,m:et,r:er,mt:K,mc:D,pc:Z,pbc:B,n:eo,o:e};return t&&([r,i]=t(eu)),{render:ec,hydrate:r,createApp:(n=r,function(e,t=null){E(e)||(e=y({},e)),null==t||I(t)||(t=null);let r=nY(),i=new WeakSet,l=!1,s=r.app={_uid:n0++,_component:e,_props:t,_container:null,_context:r,_instance:null,version:iV,get config(){return r.config},set config(v){},use:(e,...t)=>(i.has(e)||(e&&E(e.install)?(i.add(e),e.install(s,...t)):E(e)&&(i.add(e),e(s,...t))),s),mixin:e=>(r.mixins.includes(e)||r.mixins.push(e),s),component:(e,t)=>t?(r.components[e]=t,s):r.components[e],directive:(e,t)=>t?(r.directives[e]=t,s):r.directives[e],mount(i,o,a){if(!l){let c=id(e,t);return c.appContext=r,!0===a?a="svg":!1===a&&(a=void 0),o&&n?n(c,i):ec(c,i,a),l=!0,s._container=i,i.__vue_app__=s,iM(c.component)}},unmount(){l&&(ec(null,s._container),delete s._container.__vue_app__);},provide:(e,t)=>(r.provides[e]=t,s),runWithContext(e){let t=n1;n1=s;try{return e()}finally{n1=t;}}};return s})}}function rN({type:e,props:t},n){return "svg"===n&&"foreignObject"===e||"mathml"===n&&"annotation-xml"===e&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function rI({effect:e,update:t},n){e.allowRecurse=t.allowRecurse=n;}function rR(e,t){return (!e||e&&!e.pendingBranch)&&t&&!t.persisted}function rO(e,t,n=!1){let r=e.children,i=t.children;if(x(r)&&x(i))for(let e=0;e<r.length;e++){let t=r[e],l=i[e];!(1&l.shapeFlag)||l.dynamicChildren||((l.patchFlag<=0||32===l.patchFlag)&&((l=i[e]=iy(i[e])).el=t.el),n||-2===l.patchFlag||rO(t,l)),l.type===r6&&(l.el=t.el);}}function rL(e){if(e)for(let t=0;t<e.length;t++)e[t].active=!1;}let rM=Symbol.for("v-scx");function r$(e,t){return rD(e,null,{flush:"post"})}function rP(e,t){return rD(e,null,{flush:"sync"})}let rF={};function rD(e,t,{immediate:r,deep:i,flush:l,once:s,onTrack:o,onTrigger:a}=d){let c,u,p;if(t&&s){let e=t;t=(...t)=>{e(...t),w();};}let f=iC,m=e=>!0===i?e:rU(e,!1===i?1:void 0),g=!1,y=!1;if(tk(e)?(c=()=>e.value,g=tm(e)):th(e)?(c=()=>m(e),g=!0):x(e)?(y=!0,g=e.some(e=>th(e)||tm(e)),c=()=>e.map(e=>tk(e)?e.value:th(e)?m(e):E(e)?tP(e,f,2):void 0)):c=E(e)?t?()=>tP(e,f,2):()=>(u&&u(),tF(e,f,3,[_])):h,t&&i){let e=c;c=()=>rU(e());}let _=e=>{u=k.onStop=()=>{tP(e,f,4),u=k.onStop=void 0;};},S=y?Array(e.length).fill(rF):rF,C=()=>{if(k.active&&k.dirty){if(t){let e=k.run();(i||g||(y?e.some((e,t)=>K(e,S[t])):K(e,S)))&&(u&&u(),tF(t,f,3,[e,S===rF?void 0:y&&S[0]===rF?[]:S,_]),S=e);}else k.run();}};C.allowRecurse=!!t,"sync"===l?p=C:"post"===l?p=()=>rw(C,f&&f.suspense):(C.pre=!0,f&&(C.id=f.uid),p=()=>tJ(C));let k=new ev(c,h,p),T=n,w=()=>{k.stop(),T&&b(T.effects,k);};return t?r?C():S=k.run():"post"===l?rw(k.run.bind(k),f&&f.suspense):k.run(),w}function rV(e,t,n){let r;let i=this.proxy,l=A(e)?e.includes(".")?rB(i,e):()=>i[e]:e.bind(i,i);E(t)?r=t:(r=t.handler,n=t);let s=iT(this),o=rD(l,r.bind(i),n);return s(),o}function rB(e,t){let n=t.split(".");return ()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}function rU(e,t=1/0,n){if(t<=0||!I(e)||e.__v_skip||(n=n||new Set).has(e))return e;if(n.add(e),t--,tk(e))rU(e.value,t,n);else if(x(e))for(let r=0;r<e.length;r++)rU(e[r],t,n);else if(k(e)||C(e))e.forEach(e=>{rU(e,t,n);});else if($(e)){for(let r in e)rU(e[r],t,n);for(let r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&rU(e[r],t,n);}return e}let rj=(e,t)=>"modelValue"===t||"model-value"===t?e.modelModifiers:e[`${t}Modifiers`]||e[`${U(t)}Modifiers`]||e[`${H(t)}Modifiers`];function rH(e,t,...n){let r;if(e.isUnmounted)return;let i=e.vnode.props||d,l=n,s=t.startsWith("update:"),o=s&&rj(i,t.slice(7));o&&(o.trim&&(l=n.map(e=>A(e)?e.trim():e)),o.number&&(l=n.map(J)));let a=i[r=W(t)]||i[r=W(U(t))];!a&&s&&(a=i[r=W(H(t))]),a&&tF(a,e,6,l);let c=i[r+"Once"];if(c){if(e.emitted){if(e.emitted[r])return}else e.emitted={};e.emitted[r]=!0,tF(c,e,6,l);}}function rq(e,t){return !!(e&&m(t))&&(S(e,(t=t.slice(2).replace(/Once$/,""))[0].toLowerCase()+t.slice(1))||S(e,H(t))||S(e,t))}function rW(e){let t,n;let{type:r,vnode:i,proxy:l,withProxy:s,propsOptions:[o],slots:a,attrs:c,emit:u,render:d,renderCache:p,props:h,data:f,setupState:m,ctx:y,inheritAttrs:b}=e,_=t6(e);try{if(4&i.shapeFlag){let e=s||l;t=ig(d.call(e,e,p,h,m,f,y)),n=c;}else t=ig(r.length>1?r(h,{attrs:c,slots:a,emit:u}):r(h,null)),n=r.props?c:rK(c);}catch(n){r5.length=0,tD(n,e,1),t=id(r4);}let S=t;if(n&&!1!==b){let e=Object.keys(n),{shapeFlag:t}=S;e.length&&7&t&&(o&&e.some(g)&&(n=rz(n,o)),S=ih(S,n,!1,!0));}return i.dirs&&((S=ih(S,null,!1,!0)).dirs=S.dirs?S.dirs.concat(i.dirs):i.dirs),i.transition&&(S.transition=i.transition),t=S,t6(_),t}let rK=e=>{let t;for(let n in e)("class"===n||"style"===n||m(n))&&((t||(t={}))[n]=e[n]);return t},rz=(e,t)=>{let n={};for(let r in e)g(r)&&r.slice(9) in t||(n[r]=e[r]);return n};function rG(e,t,n){let r=Object.keys(t);if(r.length!==Object.keys(e).length)return !0;for(let i=0;i<r.length;i++){let l=r[i];if(t[l]!==e[l]&&!rq(n,l))return !0}return !1}function rJ({vnode:e,parent:t},n){for(;t;){let r=t.subTree;if(r.suspense&&r.suspense.activeBranch===e&&(r.el=e.el),r===e)(e=t.vnode).el=n,t=t.parent;else break}}let rX=e=>e.__isSuspense,rQ=0;function rZ(e,t){let n=e.props&&e.props[t];E(n)&&n();}function rY(e,t,n,r,i,l,s,o,a,c,u=!1){let d;let{p:p,m:h,um:f,n:m,o:{parentNode:g,remove:y}}=c,b=function(e){let t=e.props&&e.props.suspensible;return null!=t&&!1!==t}(e);b&&t&&t.pendingBranch&&(d=t.pendingId,t.deps++);let _=e.props?X(e.props.timeout):void 0,S=l,x={vnode:e,parent:t,parentComponent:n,namespace:s,container:r,hiddenContainer:i,deps:0,pendingId:rQ++,timeout:"number"==typeof _?_:-1,activeBranch:null,pendingBranch:null,isInFallback:!u,isHydrating:u,isUnmounted:!1,effects:[],resolve(e=!1,n=!1){let{vnode:r,activeBranch:i,pendingBranch:s,pendingId:o,effects:a,parentComponent:c,container:u}=x,p=!1;x.isHydrating?x.isHydrating=!1:e||((p=i&&s.transition&&"out-in"===s.transition.mode)&&(i.transition.afterLeave=()=>{o===x.pendingId&&(h(s,u,l===S?m(i):l,0),tQ(a));}),i&&(g(i.el)!==x.hiddenContainer&&(l=m(i)),f(i,c,x,!0)),p||h(s,u,l,0)),r2(x,s),x.pendingBranch=null,x.isInFallback=!1;let y=x.parent,_=!1;for(;y;){if(y.pendingBranch){y.effects.push(...a),_=!0;break}y=y.parent;}_||p||tQ(a),x.effects=[],b&&t&&t.pendingBranch&&d===t.pendingId&&(t.deps--,0!==t.deps||n||t.resolve()),rZ(r,"onResolve");},fallback(e){if(!x.pendingBranch)return;let{vnode:t,activeBranch:n,parentComponent:r,container:i,namespace:l}=x;rZ(t,"onFallback");let s=m(n),c=()=>{x.isInFallback&&(p(null,e,i,s,r,null,l,o,a),r2(x,e));},u=e.transition&&"out-in"===e.transition.mode;u&&(n.transition.afterLeave=c),x.isInFallback=!0,f(n,r,null,!0),u||c();},move(e,t,n){x.activeBranch&&h(x.activeBranch,e,t,n),x.container=e;},next:()=>x.activeBranch&&m(x.activeBranch),registerDep(e,t,n){let r=!!x.pendingBranch;r&&x.deps++;let i=e.vnode.el;e.asyncDep.catch(t=>{tD(t,e,0);}).then(l=>{if(e.isUnmounted||x.isUnmounted||x.pendingId!==e.suspenseId)return;e.asyncResolved=!0;let{vnode:o}=e;iN(e,l,!1),i&&(o.el=i);let a=!i&&e.subTree.el;t(e,o,g(i||e.subTree.el),i?null:m(e.subTree),x,s,n),a&&y(a),rJ(e,o.el),r&&0==--x.deps&&x.resolve();});},unmount(e,t){x.isUnmounted=!0,x.activeBranch&&f(x.activeBranch,n,e,t),x.pendingBranch&&f(x.pendingBranch,n,e,t);}};return x}function r0(e){let t;if(E(e)){let n=it&&e._c;n&&(e._d=!1,r7()),e=e(),n&&(e._d=!0,t=r9,ie());}return x(e)&&(e=function(e,t=!0){let n;for(let t=0;t<e.length;t++){let r=e[t];if(!is(r))return;if(r.type!==r4||"v-if"===r.children){if(n)return;n=r;}}return n}(e)),e=ig(e),t&&!e.dynamicChildren&&(e.dynamicChildren=t.filter(t=>t!==e)),e}function r1(e,t){t&&t.pendingBranch?x(e)?t.effects.push(...e):t.effects.push(e):tQ(e);}function r2(e,t){e.activeBranch=t;let{vnode:n,parentComponent:r}=e,i=t.el;for(;!i&&t.component;)i=(t=t.component.subTree).el;n.el=i,r&&r.subTree===n&&(r.vnode.el=i,rJ(r,i));}let r3=Symbol.for("v-fgt"),r6=Symbol.for("v-txt"),r4=Symbol.for("v-cmt"),r8=Symbol.for("v-stc"),r5=[],r9=null;function r7(e=!1){r5.push(r9=e?null:[]);}function ie(){r5.pop(),r9=r5[r5.length-1]||null;}let it=1;function ir(e){it+=e,e<0&&r9&&(r9.hasOnce=!0);}function ii(e){return e.dynamicChildren=it>0?r9||p:null,ie(),it>0&&r9&&r9.push(e),e}function il(e,t,n,r,i){return ii(id(e,t,n,r,i,!0))}function is(e){return !!e&&!0===e.__v_isVNode}function io(e,t){return e.type===t.type&&e.key===t.key}let ia=({key:e})=>null!=e?e:null,ic=({ref:e,ref_key:t,ref_for:n})=>("number"==typeof e&&(e=""+e),null!=e?A(e)||tk(e)||E(e)?{i:t2,r:e,k:t,f:!!n}:e:null);function iu(e,t=null,n=null,r=0,i=null,l=e===r3?0:1,s=!1,o=!1){let a={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&ia(t),ref:t&&ic(t),scopeId:t3,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:l,patchFlag:r,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:t2};return o?(iv(a,n),128&l&&e.normalize(a)):n&&(a.shapeFlag|=A(n)?8:16),it>0&&!s&&r9&&(a.patchFlag>0||6&l)&&32!==a.patchFlag&&r9.push(a),a}let id=function(e,t=null,n=null,r=0,i=null,l=!1){var s;if(e&&e!==nL||(e=r4),is(e)){let r=ih(e,t,!0);return n&&iv(r,n),it>0&&!l&&r9&&(6&r.shapeFlag?r9[r9.indexOf(e)]=r:r9.push(r)),r.patchFlag=-2,r}if(E(s=e)&&"__vccOpts"in s&&(e=e.__vccOpts),t){let{class:e,style:n}=t=ip(t);e&&!A(e)&&(t.class=ei(e)),I(n)&&(tg(n)&&!x(n)&&(n=y({},n)),t.style=Y(n));}let o=A(e)?1:rX(e)?128:rd(e)?64:I(e)?4:E(e)?2:0;return iu(e,t,n,r,i,o,l,!0)};function ip(e){return e?tg(e)||n8(e)?y({},e):e:null}function ih(e,t,n=!1,r=!1){let{props:i,ref:l,patchFlag:s,children:o,transition:a}=e,c=t?ib(i||{},t):i,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:c,key:c&&ia(c),ref:t&&t.ref?n&&l?x(l)?l.concat(ic(t)):[l,ic(t)]:ic(t):l,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:o,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==r3?-1===s?16:16|s:s,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:a,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&ih(e.ssContent),ssFallback:e.ssFallback&&ih(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return a&&r&&na(u,a.clone(u)),u}function im(e=" ",t=0){return id(r6,null,e,t)}function ig(e){return null==e||"boolean"==typeof e?id(r4):x(e)?id(r3,null,e.slice()):"object"==typeof e?iy(e):id(r6,null,String(e))}function iy(e){return null===e.el&&-1!==e.patchFlag||e.memo?e:ih(e)}function iv(e,t){let n=0,{shapeFlag:r}=e;if(null==t)t=null;else if(x(t))n=16;else if("object"==typeof t){if(65&r){let n=t.default;n&&(n._c&&(n._d=!1),iv(e,n()),n._c&&(n._d=!0));return}{n=32;let r=t._;r||n8(t)?3===r&&t2&&(1===t2.slots._?t._=1:(t._=2,e.patchFlag|=1024)):t._ctx=t2;}}else E(t)?(t={default:t,_ctx:t2},n=32):(t=String(t),64&r?(n=16,t=[im(t)]):n=8);e.children=t,e.shapeFlag|=n;}function ib(...e){let t={};for(let n=0;n<e.length;n++){let r=e[n];for(let e in r)if("class"===e)t.class!==r.class&&(t.class=ei([t.class,r.class]));else if("style"===e)t.style=Y([t.style,r.style]);else if(m(e)){let n=t[e],i=r[e];i&&n!==i&&!(x(n)&&n.includes(i))&&(t[e]=n?[].concat(n,i):i);}else ""!==e&&(t[e]=r[e]);}return t}function i_(e,t,n,r=null){tF(e,t,7,[n,r]);}let iS=nY(),ix=0,iC=null,ik=()=>iC||t2;i=e=>{iC=e;},l=e=>{iA=e;};let iT=e=>{let t=iC;return i(e),e.scope.on(),()=>{e.scope.off(),i(t);}},iw=()=>{iC&&iC.scope.off(),i(null);};function iE(e){return 4&e.vnode.shapeFlag}let iA=!1;function iN(e,t,n){E(t)?e.render=t:I(t)&&(e.setupState=tI(t)),iR(e,n);}function iI(e){s=e,o=e=>{e.render._rc&&(e.withProxy=new Proxy(e.ctx,nB));};}function iR(e,t,n){let r=e.type;if(!e.render){if(!t&&s&&!r.render){let t=r.template||nW(e).template;if(t){let{isCustomElement:n,compilerOptions:i}=e.appContext.config,{delimiters:l,compilerOptions:o}=r,a=y(y({isCustomElement:n,delimiters:l},i),o);r.render=s(t,a);}}e.render=r.render||h,o&&o(e);}{let t=iT(e);eT();try{!function(e){let t=nW(e),n=e.proxy,r=e.ctx;nH=!1,t.beforeCreate&&nq(t.beforeCreate,e,"bc");let{data:i,computed:l,methods:s,watch:o,provide:a,inject:c,created:u,beforeMount:d,mounted:p,beforeUpdate:f,updated:m,activated:g,deactivated:y,beforeDestroy:b,beforeUnmount:_,destroyed:S,unmounted:C,render:k,renderTracked:T,renderTriggered:w,errorCaptured:N,serverPrefetch:R,expose:O,inheritAttrs:L,components:M,directives:$,filters:P}=t;if(c&&function(e,t,n=h){for(let n in x(e)&&(e=nJ(e)),e){let r;let i=e[n];tk(r=I(i)?"default"in i?n3(i.from||n,i.default,!0):n3(i.from||n):n3(i))?Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:()=>r.value,set:e=>r.value=e}):t[n]=r;}}(c,r,null),s)for(let e in s){let t=s[e];E(t)&&(r[e]=t.bind(n));}if(i){let t=i.call(n,n);I(t)&&(e.data=tc(t));}if(nH=!0,l)for(let e in l){let t=l[e],i=E(t)?t.bind(n,n):E(t.get)?t.get.bind(n,n):h,s=iP({get:i,set:!E(t)&&E(t.set)?t.set.bind(n):h});Object.defineProperty(r,e,{enumerable:!0,configurable:!0,get:()=>s.value,set:e=>s.value=e});}if(o)for(let e in o)!function e(t,n,r,i){let l=i.includes(".")?rB(r,i):()=>r[i];if(A(t)){let e=n[t];E(e)&&rD(l,e,void 0);}else if(E(t)){var s;s=t.bind(r),rD(l,s,void 0);}else if(I(t)){if(x(t))t.forEach(t=>e(t,n,r,i));else {let e=E(t.handler)?t.handler.bind(r):n[t.handler];E(e)&&rD(l,e,t);}}}(o[e],r,n,e);if(a){let e=E(a)?a.call(n):a;Reflect.ownKeys(e).forEach(t=>{n2(t,e[t]);});}function F(e,t){x(t)?t.forEach(t=>e(t.bind(n))):t&&e(t.bind(n));}if(u&&nq(u,e,"c"),F(nx,d),F(nC,p),F(nk,f),F(nT,m),F(nm,g),F(ng,y),F(nR,N),F(nI,T),F(nN,w),F(nw,_),F(nE,C),F(nA,R),x(O)){if(O.length){let t=e.exposed||(e.exposed={});O.forEach(e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t});});}else e.exposed||(e.exposed={});}k&&e.render===h&&(e.render=k),null!=L&&(e.inheritAttrs=L),M&&(e.components=M),$&&(e.directives=$);}(e);}finally{ew(),t();}}}let iO={get:(e,t)=>(e$(e,"get",""),e[t])};function iL(e){return {attrs:new Proxy(e.attrs,iO),slots:e.slots,emit:e.emit,expose:t=>{e.exposed=t||{};}}}function iM(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(tI(tv(e.exposed)),{get:(t,n)=>n in t?t[n]:n in nF?nF[n](e):void 0,has:(e,t)=>t in e||t in nF})):e.proxy}function i$(e,t=!0){return E(e)?e.displayName||e.name:e.name||t&&e.__name}let iP=(e,t)=>(function(e,t,n=!1){let r,i;let l=E(e);return l?(r=e,i=h):(r=e.get,i=e.set),new tS(r,i,l||!i,n)})(e,0,iA);function iF(e,t,n){let r=arguments.length;return 2!==r?(r>3?n=Array.prototype.slice.call(arguments,2):3===r&&is(n)&&(n=[n]),id(e,t,n)):!I(t)||x(t)?id(e,null,t):is(t)?id(e,null,[t]):id(e,t)}function iD(e,t){let n=e.memo;if(n.length!=t.length)return !1;for(let e=0;e<n.length;e++)if(K(n[e],t[e]))return !1;return it>0&&r9&&r9.push(e),!0}let iV="3.4.37",iB="undefined"!=typeof document?document:null,iU=iB&&iB.createElement("template"),ij="transition",iH="animation",iq=Symbol("_vtc"),iW=(e,{slots:t})=>iF(nr,iX(e),t);iW.displayName="Transition";let iK={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},iz=iW.props=y({},nt,iK),iG=(e,t=[])=>{x(e)?e.forEach(e=>e(...t)):e&&e(...t);},iJ=e=>!!e&&(x(e)?e.some(e=>e.length>1):e.length>1);function iX(e){let t={};for(let n in e)n in iK||(t[n]=e[n]);if(!1===e.css)return t;let{name:n="v",type:r,duration:i,enterFromClass:l=`${n}-enter-from`,enterActiveClass:s=`${n}-enter-active`,enterToClass:o=`${n}-enter-to`,appearFromClass:a=l,appearActiveClass:c=s,appearToClass:u=o,leaveFromClass:d=`${n}-leave-from`,leaveActiveClass:p=`${n}-leave-active`,leaveToClass:h=`${n}-leave-to`}=e,f=function(e){if(null==e)return null;if(I(e))return [X(e.enter),X(e.leave)];{let t=X(e);return [t,t]}}(i),m=f&&f[0],g=f&&f[1],{onBeforeEnter:b,onEnter:_,onEnterCancelled:S,onLeave:x,onLeaveCancelled:C,onBeforeAppear:k=b,onAppear:T=_,onAppearCancelled:w=S}=t,E=(e,t,n)=>{iZ(e,t?u:o),iZ(e,t?c:s),n&&n();},A=(e,t)=>{e._isLeaving=!1,iZ(e,d),iZ(e,h),iZ(e,p),t&&t();},N=e=>(t,n)=>{let i=e?T:_,s=()=>E(t,e,n);iG(i,[t,s]),iY(()=>{iZ(t,e?a:l),iQ(t,e?u:o),iJ(i)||i1(t,r,m,s);});};return y(t,{onBeforeEnter(e){iG(b,[e]),iQ(e,l),iQ(e,s);},onBeforeAppear(e){iG(k,[e]),iQ(e,a),iQ(e,c);},onEnter:N(!1),onAppear:N(!0),onLeave(e,t){e._isLeaving=!0;let n=()=>A(e,t);iQ(e,d),iQ(e,p),i4(),iY(()=>{e._isLeaving&&(iZ(e,d),iQ(e,h),iJ(x)||i1(e,r,g,n));}),iG(x,[e,n]);},onEnterCancelled(e){E(e,!1),iG(S,[e]);},onAppearCancelled(e){E(e,!0),iG(w,[e]);},onLeaveCancelled(e){A(e),iG(C,[e]);}})}function iQ(e,t){t.split(/\s+/).forEach(t=>t&&e.classList.add(t)),(e[iq]||(e[iq]=new Set)).add(t);}function iZ(e,t){t.split(/\s+/).forEach(t=>t&&e.classList.remove(t));let n=e[iq];n&&(n.delete(t),n.size||(e[iq]=void 0));}function iY(e){requestAnimationFrame(()=>{requestAnimationFrame(e);});}let i0=0;function i1(e,t,n,r){let i=e._endId=++i0,l=()=>{i===e._endId&&r();};if(n)return setTimeout(l,n);let{type:s,timeout:o,propCount:a}=i2(e,t);if(!s)return r();let c=s+"end",u=0,d=()=>{e.removeEventListener(c,p),l();},p=t=>{t.target===e&&++u>=a&&d();};setTimeout(()=>{u<a&&d();},o+1),e.addEventListener(c,p);}function i2(e,t){let n=window.getComputedStyle(e),r=e=>(n[e]||"").split(", "),i=r(`${ij}Delay`),l=r(`${ij}Duration`),s=i3(i,l),o=r(`${iH}Delay`),a=r(`${iH}Duration`),c=i3(o,a),u=null,d=0,p=0;t===ij?s>0&&(u=ij,d=s,p=l.length):t===iH?c>0&&(u=iH,d=c,p=a.length):p=(u=(d=Math.max(s,c))>0?s>c?ij:iH:null)?u===ij?l.length:a.length:0;let h=u===ij&&/\b(transform|all)(,|$)/.test(r(`${ij}Property`).toString());return {type:u,timeout:d,propCount:p,hasTransform:h}}function i3(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((t,n)=>i6(t)+i6(e[n])))}function i6(e){return "auto"===e?0:1e3*Number(e.slice(0,-1).replace(",","."))}function i4(){return document.body.offsetHeight}let i8=Symbol("_vod"),i5=Symbol("_vsh");function i9(e,t){e.style.display=t?e[i8]:"none",e[i5]=!t;}let i7=Symbol("");function le(e,t){if(1===e.nodeType){let n=e.style,r="";for(let e in t)n.setProperty(`--${e}`,t[e]),r+=`--${e}: ${t[e]};`;n[i7]=r;}}let lt=/(^|;)\s*display\s*:/,ln=/\s*!important$/;function lr(e,t,n){if(x(n))n.forEach(n=>lr(e,t,n));else if(null==n&&(n=""),t.startsWith("--"))e.setProperty(t,n);else {let r=function(e,t){let n=ll[t];if(n)return n;let r=U(t);if("filter"!==r&&r in e)return ll[t]=r;r=q(r);for(let n=0;n<li.length;n++){let i=li[n]+r;if(i in e)return ll[t]=i}return t}(e,t);ln.test(n)?e.setProperty(H(r),n.replace(ln,""),"important"):e[r]=n;}}let li=["Webkit","Moz","ms"],ll={},ls="http://www.w3.org/1999/xlink";function lo(e,t,n,r,i,l=ec(t)){r&&t.startsWith("xlink:")?null==n?e.removeAttributeNS(ls,t.slice(6,t.length)):e.setAttributeNS(ls,t,n):null==n||l&&!(n||""===n)?e.removeAttribute(t):e.setAttribute(t,l?"":N(n)?String(n):n);}function la(e,t,n,r){e.addEventListener(t,n,r);}let lc=Symbol("_vei"),lu=/(?:Once|Passive|Capture)$/,ld=0,lp=Promise.resolve(),lh=()=>ld||(lp.then(()=>ld=0),ld=Date.now()),lf=e=>111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&e.charCodeAt(2)>96&&123>e.charCodeAt(2);/*! #__NO_SIDE_EFFECTS__ */function lm(e,t,n){let r=nu(e,t);class i extends ly{constructor(e){super(r,e,n);}}return i.def=r,i}let lg="undefined"!=typeof HTMLElement?HTMLElement:class{};class ly extends lg{constructor(e,t={},n){super(),this._def=e,this._props=t,this._instance=null,this._connected=!1,this._resolved=!1,this._numberProps=null,this._ob=null,this.shadowRoot&&n?n(this._createVNode(),this.shadowRoot):(this.attachShadow({mode:"open"}),this._def.__asyncLoader||this._resolveProps(this._def));}connectedCallback(){this._connected=!0,this._instance||(this._resolved?this._update():this._resolveDef());}disconnectedCallback(){this._connected=!1,tG(()=>{this._connected||(this._ob&&(this._ob.disconnect(),this._ob=null),lW(null,this.shadowRoot),this._instance=null);});}_resolveDef(){this._resolved=!0;for(let e=0;e<this.attributes.length;e++)this._setAttr(this.attributes[e].name);this._ob=new MutationObserver(e=>{for(let t of e)this._setAttr(t.attributeName);}),this._ob.observe(this,{attributes:!0});let e=(e,t=!1)=>{let n;let{props:r,styles:i}=e;if(r&&!x(r))for(let e in r){let t=r[e];(t===Number||t&&t.type===Number)&&(e in this._props&&(this._props[e]=X(this._props[e])),(n||(n=Object.create(null)))[U(e)]=!0);}this._numberProps=n,t&&this._resolveProps(e),this._applyStyles(i),this._update();},t=this._def.__asyncLoader;t?t().then(t=>e(t,!0)):e(this._def);}_resolveProps(e){let{props:t}=e,n=x(t)?t:Object.keys(t||{});for(let e of Object.keys(this))"_"!==e[0]&&n.includes(e)&&this._setProp(e,this[e],!0,!1);for(let e of n.map(U))Object.defineProperty(this,e,{get(){return this._getProp(e)},set(t){this._setProp(e,t);}});}_setAttr(e){let t=this.hasAttribute(e)?this.getAttribute(e):void 0,n=U(e);this._numberProps&&this._numberProps[n]&&(t=X(t)),this._setProp(n,t,!1);}_getProp(e){return this._props[e]}_setProp(e,t,n=!0,r=!0){t!==this._props[e]&&(this._props[e]=t,r&&this._instance&&this._update(),n&&(!0===t?this.setAttribute(H(e),""):"string"==typeof t||"number"==typeof t?this.setAttribute(H(e),t+""):t||this.removeAttribute(H(e))));}_update(){lW(this._createVNode(),this.shadowRoot);}_createVNode(){let e=id(this._def,y({},this._props));return this._instance||(e.ce=e=>{this._instance=e,e.isCE=!0;let t=(e,t)=>{this.dispatchEvent(new CustomEvent(e,{detail:t}));};e.emit=(e,...n)=>{t(e,n),H(e)!==e&&t(H(e),n);};let n=this;for(;n=n&&(n.parentNode||n.host);)if(n instanceof ly){e.parent=n._instance,e.provides=n._instance.provides;break}}),e}_applyStyles(e){e&&e.forEach(e=>{let t=document.createElement("style");t.textContent=e,this.shadowRoot.appendChild(t);});}}let lv=new WeakMap,lb=new WeakMap,l_=Symbol("_moveCb"),lS=Symbol("_enterCb"),lx={name:"TransitionGroup",props:y({},iz,{tag:String,moveClass:String}),setup(e,{slots:t}){let n,r;let i=ik(),l=t7();return nT(()=>{if(!n.length)return;let t=e.moveClass||`${e.name||"v"}-move`;if(!function(e,t,n){let r=e.cloneNode(),i=e[iq];i&&i.forEach(e=>{e.split(/\s+/).forEach(e=>e&&r.classList.remove(e));}),n.split(/\s+/).forEach(e=>e&&r.classList.add(e)),r.style.display="none";let l=1===t.nodeType?t:t.parentNode;l.appendChild(r);let{hasTransform:s}=i2(r);return l.removeChild(r),s}(n[0].el,i.vnode.el,t))return;n.forEach(lC),n.forEach(lk);let r=n.filter(lT);i4(),r.forEach(e=>{let n=e.el,r=n.style;iQ(n,t),r.transform=r.webkitTransform=r.transitionDuration="";let i=n[l_]=e=>{(!e||e.target===n)&&(!e||/transform$/.test(e.propertyName))&&(n.removeEventListener("transitionend",i),n[l_]=null,iZ(n,t));};n.addEventListener("transitionend",i);});}),()=>{let s=ty(e),o=iX(s),a=s.tag||r3;if(n=[],r)for(let e=0;e<r.length;e++){let t=r[e];t.el&&t.el instanceof Element&&(n.push(t),na(t,nl(t,o,l,i)),lv.set(t,t.el.getBoundingClientRect()));}r=t.default?nc(t.default()):[];for(let e=0;e<r.length;e++){let t=r[e];null!=t.key&&na(t,nl(t,o,l,i));}return id(a,null,r)}}};function lC(e){let t=e.el;t[l_]&&t[l_](),t[lS]&&t[lS]();}function lk(e){lb.set(e,e.el.getBoundingClientRect());}function lT(e){let t=lv.get(e),n=lb.get(e),r=t.left-n.left,i=t.top-n.top;if(r||i){let t=e.el.style;return t.transform=t.webkitTransform=`translate(${r}px,${i}px)`,t.transitionDuration="0s",e}}let lw=e=>{let t=e.props["onUpdate:modelValue"]||!1;return x(t)?e=>z(t,e):t};function lE(e){e.target.composing=!0;}function lA(e){let t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")));}let lN=Symbol("_assign"),lI={created(e,{modifiers:{lazy:t,trim:n,number:r}},i){e[lN]=lw(i);let l=r||i.props&&"number"===i.props.type;la(e,t?"change":"input",t=>{if(t.target.composing)return;let r=e.value;n&&(r=r.trim()),l&&(r=J(r)),e[lN](r);}),n&&la(e,"change",()=>{e.value=e.value.trim();}),t||(la(e,"compositionstart",lE),la(e,"compositionend",lA),la(e,"change",lA));},mounted(e,{value:t}){e.value=null==t?"":t;},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:r,trim:i,number:l}},s){if(e[lN]=lw(s),e.composing)return;let o=(l||"number"===e.type)&&!/^0\d/.test(e.value)?J(e.value):e.value,a=null==t?"":t;o===a||document.activeElement===e&&"range"!==e.type&&(r&&t===n||i&&e.value.trim()===a)||(e.value=a);}},lR={deep:!0,created(e,t,n){e[lN]=lw(n),la(e,"change",()=>{let t=e._modelValue,n=lP(e),r=e.checked,i=e[lN];if(x(t)){let e=ed(t,n),l=-1!==e;if(r&&!l)i(t.concat(n));else if(!r&&l){let n=[...t];n.splice(e,1),i(n);}}else if(k(t)){let e=new Set(t);r?e.add(n):e.delete(n),i(e);}else i(lF(e,r));});},mounted:lO,beforeUpdate(e,t,n){e[lN]=lw(n),lO(e,t,n);}};function lO(e,{value:t,oldValue:n},r){e._modelValue=t,x(t)?e.checked=ed(t,r.props.value)>-1:k(t)?e.checked=t.has(r.props.value):t!==n&&(e.checked=eu(t,lF(e,!0)));}let lL={created(e,{value:t},n){e.checked=eu(t,n.props.value),e[lN]=lw(n),la(e,"change",()=>{e[lN](lP(e));});},beforeUpdate(e,{value:t,oldValue:n},r){e[lN]=lw(r),t!==n&&(e.checked=eu(t,r.props.value));}},lM={deep:!0,created(e,{value:t,modifiers:{number:n}},r){let i=k(t);la(e,"change",()=>{let t=Array.prototype.filter.call(e.options,e=>e.selected).map(e=>n?J(lP(e)):lP(e));e[lN](e.multiple?i?new Set(t):t:t[0]),e._assigning=!0,tG(()=>{e._assigning=!1;});}),e[lN]=lw(r);},mounted(e,{value:t}){l$(e,t);},beforeUpdate(e,t,n){e[lN]=lw(n);},updated(e,{value:t}){e._assigning||l$(e,t);}};function l$(e,t,n){let r=e.multiple,i=x(t);if(!r||i||k(t)){for(let n=0,l=e.options.length;n<l;n++){let l=e.options[n],s=lP(l);if(r){if(i){let e=typeof s;"string"===e||"number"===e?l.selected=t.some(e=>String(e)===String(s)):l.selected=ed(t,s)>-1;}else l.selected=t.has(s);}else if(eu(lP(l),t)){e.selectedIndex!==n&&(e.selectedIndex=n);return}}r||-1===e.selectedIndex||(e.selectedIndex=-1);}}function lP(e){return "_value"in e?e._value:e.value}function lF(e,t){let n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}function lD(e,t,n,r,i){let l=function(e,t){switch(e){case"SELECT":return lM;case"TEXTAREA":return lI;default:switch(t){case"checkbox":return lR;case"radio":return lL;default:return lI}}}(e.tagName,n.props&&n.props.type)[i];l&&l(e,t,n,r);}let lV=["ctrl","shift","alt","meta"],lB={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&0!==e.button,middle:e=>"button"in e&&1!==e.button,right:e=>"button"in e&&2!==e.button,exact:(e,t)=>lV.some(n=>e[`${n}Key`]&&!t.includes(n))},lU={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},lj=y({patchProp:(e,t,n,r,i,l)=>{let s="svg"===i;"class"===t?function(e,t,n){let r=e[iq];r&&(t=(t?[t,...r]:[...r]).join(" ")),null==t?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t;}(e,r,s):"style"===t?function(e,t,n){let r=e.style,i=A(n),l=!1;if(n&&!i){if(t){if(A(t))for(let e of t.split(";")){let t=e.slice(0,e.indexOf(":")).trim();null==n[t]&&lr(r,t,"");}else for(let e in t)null==n[e]&&lr(r,e,"");}for(let e in n)"display"===e&&(l=!0),lr(r,e,n[e]);}else if(i){if(t!==n){let e=r[i7];e&&(n+=";"+e),r.cssText=n,l=lt.test(n);}}else t&&e.removeAttribute("style");i8 in e&&(e[i8]=l?r.display:"",e[i5]&&(r.display="none"));}(e,n,r):m(t)?g(t)||function(e,t,n,r,i=null){let l=e[lc]||(e[lc]={}),s=l[t];if(r&&s)s.value=r;else {let[n,o]=function(e){let t;if(lu.test(e)){let n;for(t={};n=e.match(lu);)e=e.slice(0,e.length-n[0].length),t[n[0].toLowerCase()]=!0;}return [":"===e[2]?e.slice(3):H(e.slice(2)),t]}(t);r?la(e,n,l[t]=function(e,t){let n=e=>{if(e._vts){if(e._vts<=n.attached)return}else e._vts=Date.now();tF(function(e,t){if(!x(t))return t;{let n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0;},t.map(e=>t=>!t._stopped&&e&&e(t))}}(e,n.value),t,5,[e]);};return n.value=e,n.attached=lh(),n}(r,i),o):s&&(!function(e,t,n,r){e.removeEventListener(t,n,r);}(e,n,s,o),l[t]=void 0);}}(e,t,0,r,l):("."===t[0]?(t=t.slice(1),0):"^"===t[0]?(t=t.slice(1),1):!function(e,t,n,r){if(r)return !!("innerHTML"===t||"textContent"===t||t in e&&lf(t)&&E(n));if("spellcheck"===t||"draggable"===t||"translate"===t||"form"===t||"list"===t&&"INPUT"===e.tagName||"type"===t&&"TEXTAREA"===e.tagName)return !1;if("width"===t||"height"===t){let t=e.tagName;if("IMG"===t||"VIDEO"===t||"CANVAS"===t||"SOURCE"===t)return !1}return !(lf(t)&&A(n))&&t in e}(e,t,r,s))?("true-value"===t?e._trueValue=r:"false-value"===t&&(e._falseValue=r),lo(e,t,r,s)):(!function(e,t,n,r){if("innerHTML"===t||"textContent"===t){if(null==n)return;e[t]=n;return}let i=e.tagName;if("value"===t&&"PROGRESS"!==i&&!i.includes("-")){let r="OPTION"===i?e.getAttribute("value")||"":e.value,l=null==n?"":String(n);r===l&&"_value"in e||(e.value=l),null==n&&e.removeAttribute(t),e._value=n;return}let l=!1;if(""===n||null==n){let r=typeof e[t];if("boolean"===r){var s;n=!!(s=n)||""===s;}else null==n&&"string"===r?(n="",l=!0):"number"===r&&(n=0,l=!0);}try{e[t]=n;}catch(e){}l&&e.removeAttribute(t);}(e,t,r),e.tagName.includes("-")||"value"!==t&&"checked"!==t&&"selected"!==t||lo(e,t,r,s,l,"value"!==t));}},{insert:(e,t,n)=>{t.insertBefore(e,n||null);},remove:e=>{let t=e.parentNode;t&&t.removeChild(e);},createElement:(e,t,n,r)=>{let i="svg"===t?iB.createElementNS("http://www.w3.org/2000/svg",e):"mathml"===t?iB.createElementNS("http://www.w3.org/1998/Math/MathML",e):n?iB.createElement(e,{is:n}):iB.createElement(e);return "select"===e&&r&&null!=r.multiple&&i.setAttribute("multiple",r.multiple),i},createText:e=>iB.createTextNode(e),createComment:e=>iB.createComment(e),setText:(e,t)=>{e.nodeValue=t;},setElementText:(e,t)=>{e.textContent=t;},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>iB.querySelector(e),setScopeId(e,t){e.setAttribute(t,"");},insertStaticContent(e,t,n,r,i,l){let s=n?n.previousSibling:t.lastChild;if(i&&(i===l||i.nextSibling))for(;t.insertBefore(i.cloneNode(!0),n),i!==l&&(i=i.nextSibling););else {iU.innerHTML="svg"===r?`<svg>${e}</svg>`:"mathml"===r?`<math>${e}</math>`:e;let i=iU.content;if("svg"===r||"mathml"===r){let e=i.firstChild;for(;e.firstChild;)i.appendChild(e.firstChild);i.removeChild(e);}t.insertBefore(i,n);}return [s?s.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}}),lH=!1;function lq(){return a=lH?a:rE(lj),lH=!0,a}let lW=(...e)=>{(a||(a=rA(lj))).render(...e);},lK=(...e)=>{lq().hydrate(...e);};function lz(e){return e instanceof SVGElement?"svg":"function"==typeof MathMLElement&&e instanceof MathMLElement?"mathml":void 0}function lG(e){return A(e)?document.querySelector(e):e}let lJ=Symbol(""),lX=Symbol(""),lQ=Symbol(""),lZ=Symbol(""),lY=Symbol(""),l0=Symbol(""),l1=Symbol(""),l2=Symbol(""),l3=Symbol(""),l6=Symbol(""),l4=Symbol(""),l8=Symbol(""),l5=Symbol(""),l9=Symbol(""),l7=Symbol(""),se=Symbol(""),st=Symbol(""),sn=Symbol(""),sr=Symbol(""),si=Symbol(""),sl=Symbol(""),ss=Symbol(""),so=Symbol(""),sa=Symbol(""),sc=Symbol(""),su=Symbol(""),sd=Symbol(""),sp=Symbol(""),sh=Symbol(""),sf=Symbol(""),sm=Symbol(""),sg=Symbol(""),sy=Symbol(""),sv=Symbol(""),sb=Symbol(""),s_=Symbol(""),sS=Symbol(""),sx=Symbol(""),sC=Symbol(""),sk={[lJ]:"Fragment",[lX]:"Teleport",[lQ]:"Suspense",[lZ]:"KeepAlive",[lY]:"BaseTransition",[l0]:"openBlock",[l1]:"createBlock",[l2]:"createElementBlock",[l3]:"createVNode",[l6]:"createElementVNode",[l4]:"createCommentVNode",[l8]:"createTextVNode",[l5]:"createStaticVNode",[l9]:"resolveComponent",[l7]:"resolveDynamicComponent",[se]:"resolveDirective",[st]:"resolveFilter",[sn]:"withDirectives",[sr]:"renderList",[si]:"renderSlot",[sl]:"createSlots",[ss]:"toDisplayString",[so]:"mergeProps",[sa]:"normalizeClass",[sc]:"normalizeStyle",[su]:"normalizeProps",[sd]:"guardReactiveProps",[sp]:"toHandlers",[sh]:"camelize",[sf]:"capitalize",[sm]:"toHandlerKey",[sg]:"setBlockTracking",[sy]:"pushScopeId",[sv]:"popScopeId",[sb]:"withCtx",[s_]:"unref",[sS]:"isRef",[sx]:"withMemo",[sC]:"isMemoSame"},sT={start:{line:1,column:1,offset:0},end:{line:1,column:1,offset:0},source:""};function sw(e,t,n,r,i,l,s,o=!1,a=!1,c=!1,u=sT){return e&&(o?(e.helper(l0),e.helper(e.inSSR||c?l1:l2)):e.helper(e.inSSR||c?l3:l6),s&&e.helper(sn)),{type:13,tag:t,props:n,children:r,patchFlag:i,dynamicProps:l,directives:s,isBlock:o,disableTracking:a,isComponent:c,loc:u}}function sE(e,t=sT){return {type:17,loc:t,elements:e}}function sA(e,t=sT){return {type:15,loc:t,properties:e}}function sN(e,t){return {type:16,loc:sT,key:A(e)?sI(e,!0):e,value:t}}function sI(e,t=!1,n=sT,r=0){return {type:4,loc:n,content:e,isStatic:t,constType:t?3:r}}function sR(e,t=sT){return {type:8,loc:t,children:e}}function sO(e,t=[],n=sT){return {type:14,loc:n,callee:e,arguments:t}}function sL(e,t,n=!1,r=!1,i=sT){return {type:18,params:e,returns:t,newline:n,isSlot:r,loc:i}}function sM(e,t,n,r=!0){return {type:19,test:e,consequent:t,alternate:n,newline:r,loc:sT}}function s$(e,{helper:t,removeHelper:n,inSSR:r}){if(!e.isBlock){var i,l;e.isBlock=!0,n((i=e.isComponent,r||i?l3:l6)),t(l0),t((l=e.isComponent,r||l?l1:l2));}}let sP=new Uint8Array([123,123]),sF=new Uint8Array([125,125]);function sD(e){return e>=97&&e<=122||e>=65&&e<=90}function sV(e){return 32===e||10===e||9===e||12===e||13===e}function sB(e){return 47===e||62===e||sV(e)}function sU(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}let sj={Cdata:new Uint8Array([67,68,65,84,65,91]),CdataEnd:new Uint8Array([93,93,62]),CommentEnd:new Uint8Array([45,45,62]),ScriptEnd:new Uint8Array([60,47,115,99,114,105,112,116]),StyleEnd:new Uint8Array([60,47,115,116,121,108,101]),TitleEnd:new Uint8Array([60,47,116,105,116,108,101]),TextareaEnd:new Uint8Array([60,47,116,101,120,116,97,114,101,97])};function sH(e){throw e}function sq(e){}function sW(e,t,n,r){let i=SyntaxError(String(`https://vuejs.org/error-reference/#compiler-${e}`));return i.code=e,i.loc=t,i}let sK=e=>4===e.type&&e.isStatic;function sz(e){switch(e){case"Teleport":case"teleport":return lX;case"Suspense":case"suspense":return lQ;case"KeepAlive":case"keep-alive":return lZ;case"BaseTransition":case"base-transition":return lY}}let sG=/^\d|[^\$\w\xA0-\uFFFF]/,sJ=e=>!sG.test(e),sX=/[A-Za-z_$\xA0-\uFFFF]/,sQ=/[\.\?\w$\xA0-\uFFFF]/,sZ=/\s+[.[]\s*|\s*[.[]\s+/g,sY=e=>{e=e.trim().replace(sZ,e=>e.trim());let t=0,n=[],r=0,i=0,l=null;for(let s=0;s<e.length;s++){let o=e.charAt(s);switch(t){case 0:if("["===o)n.push(t),t=1,r++;else if("("===o)n.push(t),t=2,i++;else if(!(0===s?sX:sQ).test(o))return !1;break;case 1:"'"===o||'"'===o||"`"===o?(n.push(t),t=3,l=o):"["===o?r++:"]"!==o||--r||(t=n.pop());break;case 2:if("'"===o||'"'===o||"`"===o)n.push(t),t=3,l=o;else if("("===o)i++;else if(")"===o){if(s===e.length-1)return !1;--i||(t=n.pop());}break;case 3:o===l&&(t=n.pop(),l=null);}}return !r&&!i};function s0(e,t,n=!1){for(let r=0;r<e.props.length;r++){let i=e.props[r];if(7===i.type&&(n||i.exp)&&(A(t)?i.name===t:t.test(i.name)))return i}}function s1(e,t,n=!1,r=!1){for(let i=0;i<e.props.length;i++){let l=e.props[i];if(6===l.type){if(n)continue;if(l.name===t&&(l.value||r))return l}else if("bind"===l.name&&(l.exp||r)&&s2(l.arg,t))return l}}function s2(e,t){return !!(e&&sK(e)&&e.content===t)}function s3(e){return 5===e.type||2===e.type}function s6(e){return 7===e.type&&"slot"===e.name}function s4(e){return 1===e.type&&3===e.tagType}function s8(e){return 1===e.type&&2===e.tagType}let s5=new Set([su,sd]);function s9(e,t,n){let r,i;let l=13===e.type?e.props:e.arguments[2],s=[];if(l&&!A(l)&&14===l.type){let e=function e(t,n=[]){if(t&&!A(t)&&14===t.type){let r=t.callee;if(!A(r)&&s5.has(r))return e(t.arguments[0],n.concat(t))}return [t,n]}(l);l=e[0],i=(s=e[1])[s.length-1];}if(null==l||A(l))r=sA([t]);else if(14===l.type){let e=l.arguments[0];A(e)||15!==e.type?l.callee===sp?r=sO(n.helper(so),[sA([t]),l]):l.arguments.unshift(sA([t])):s7(t,e)||e.properties.unshift(t),r||(r=l);}else 15===l.type?(s7(t,l)||l.properties.unshift(t),r=l):(r=sO(n.helper(so),[sA([t]),l]),i&&i.callee===sd&&(i=s[s.length-2]));13===e.type?i?i.arguments[0]=r:e.props=r:i?i.arguments[0]=r:e.arguments[2]=r;}function s7(e,t){let n=!1;if(4===e.key.type){let r=e.key.content;n=t.properties.some(e=>4===e.key.type&&e.key.content===r);}return n}function oe(e,t){return `_${t}_${e.replace(/[^\w]/g,(t,n)=>"-"===t?"_":e.charCodeAt(n).toString())}`}let ot=/([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/,on={parseMode:"base",ns:0,delimiters:["{{","}}"],getNamespace:()=>0,isVoidTag:f,isPreTag:f,isCustomElement:f,onError:sH,onWarn:sq,comments:!1,prefixIdentifiers:!1},or=on,oi=null,ol="",os=null,oo=null,oa="",oc=-1,ou=-1,od=0,op=!1,oh=null,of=[],om=new class{constructor(e,t){this.stack=e,this.cbs=t,this.state=1,this.buffer="",this.sectionStart=0,this.index=0,this.entityStart=0,this.baseState=1,this.inRCDATA=!1,this.inXML=!1,this.inVPre=!1,this.newlines=[],this.mode=0,this.delimiterOpen=sP,this.delimiterClose=sF,this.delimiterIndex=-1,this.currentSequence=void 0,this.sequenceIndex=0;}get inSFCRoot(){return 2===this.mode&&0===this.stack.length}reset(){this.state=1,this.mode=0,this.buffer="",this.sectionStart=0,this.index=0,this.baseState=1,this.inRCDATA=!1,this.currentSequence=void 0,this.newlines.length=0,this.delimiterOpen=sP,this.delimiterClose=sF;}getPos(e){let t=1,n=e+1;for(let r=this.newlines.length-1;r>=0;r--){let i=this.newlines[r];if(e>i){t=r+2,n=e-i;break}}return {column:n,line:t,offset:e}}peek(){return this.buffer.charCodeAt(this.index+1)}stateText(e){60===e?(this.index>this.sectionStart&&this.cbs.ontext(this.sectionStart,this.index),this.state=5,this.sectionStart=this.index):this.inVPre||e!==this.delimiterOpen[0]||(this.state=2,this.delimiterIndex=0,this.stateInterpolationOpen(e));}stateInterpolationOpen(e){if(e===this.delimiterOpen[this.delimiterIndex]){if(this.delimiterIndex===this.delimiterOpen.length-1){let e=this.index+1-this.delimiterOpen.length;e>this.sectionStart&&this.cbs.ontext(this.sectionStart,e),this.state=3,this.sectionStart=e;}else this.delimiterIndex++;}else this.inRCDATA?(this.state=32,this.stateInRCDATA(e)):(this.state=1,this.stateText(e));}stateInterpolation(e){e===this.delimiterClose[0]&&(this.state=4,this.delimiterIndex=0,this.stateInterpolationClose(e));}stateInterpolationClose(e){e===this.delimiterClose[this.delimiterIndex]?this.delimiterIndex===this.delimiterClose.length-1?(this.cbs.oninterpolation(this.sectionStart,this.index+1),this.inRCDATA?this.state=32:this.state=1,this.sectionStart=this.index+1):this.delimiterIndex++:(this.state=3,this.stateInterpolation(e));}stateSpecialStartSequence(e){let t=this.sequenceIndex===this.currentSequence.length;if(t?sB(e):(32|e)===this.currentSequence[this.sequenceIndex]){if(!t){this.sequenceIndex++;return}}else this.inRCDATA=!1;this.sequenceIndex=0,this.state=6,this.stateInTagName(e);}stateInRCDATA(e){if(this.sequenceIndex===this.currentSequence.length){if(62===e||sV(e)){let t=this.index-this.currentSequence.length;if(this.sectionStart<t){let e=this.index;this.index=t,this.cbs.ontext(this.sectionStart,t),this.index=e;}this.sectionStart=t+2,this.stateInClosingTagName(e),this.inRCDATA=!1;return}this.sequenceIndex=0;}(32|e)===this.currentSequence[this.sequenceIndex]?this.sequenceIndex+=1:0===this.sequenceIndex?this.currentSequence!==sj.TitleEnd&&(this.currentSequence!==sj.TextareaEnd||this.inSFCRoot)?this.fastForwardTo(60)&&(this.sequenceIndex=1):e===this.delimiterOpen[0]&&(this.state=2,this.delimiterIndex=0,this.stateInterpolationOpen(e)):this.sequenceIndex=Number(60===e);}stateCDATASequence(e){e===sj.Cdata[this.sequenceIndex]?++this.sequenceIndex===sj.Cdata.length&&(this.state=28,this.currentSequence=sj.CdataEnd,this.sequenceIndex=0,this.sectionStart=this.index+1):(this.sequenceIndex=0,this.state=23,this.stateInDeclaration(e));}fastForwardTo(e){for(;++this.index<this.buffer.length;){let t=this.buffer.charCodeAt(this.index);if(10===t&&this.newlines.push(this.index),t===e)return !0}return this.index=this.buffer.length-1,!1}stateInCommentLike(e){e===this.currentSequence[this.sequenceIndex]?++this.sequenceIndex===this.currentSequence.length&&(this.currentSequence===sj.CdataEnd?this.cbs.oncdata(this.sectionStart,this.index-2):this.cbs.oncomment(this.sectionStart,this.index-2),this.sequenceIndex=0,this.sectionStart=this.index+1,this.state=1):0===this.sequenceIndex?this.fastForwardTo(this.currentSequence[0])&&(this.sequenceIndex=1):e!==this.currentSequence[this.sequenceIndex-1]&&(this.sequenceIndex=0);}startSpecial(e,t){this.enterRCDATA(e,t),this.state=31;}enterRCDATA(e,t){this.inRCDATA=!0,this.currentSequence=e,this.sequenceIndex=t;}stateBeforeTagName(e){33===e?(this.state=22,this.sectionStart=this.index+1):63===e?(this.state=24,this.sectionStart=this.index+1):sD(e)?(this.sectionStart=this.index,0===this.mode?this.state=6:this.inSFCRoot?this.state=34:this.inXML?this.state=6:116===e?this.state=30:this.state=115===e?29:6):47===e?this.state=8:(this.state=1,this.stateText(e));}stateInTagName(e){sB(e)&&this.handleTagName(e);}stateInSFCRootTagName(e){if(sB(e)){let t=this.buffer.slice(this.sectionStart,this.index);"template"!==t&&this.enterRCDATA(sU("</"+t),0),this.handleTagName(e);}}handleTagName(e){this.cbs.onopentagname(this.sectionStart,this.index),this.sectionStart=-1,this.state=11,this.stateBeforeAttrName(e);}stateBeforeClosingTagName(e){sV(e)||(62===e?(this.state=1,this.sectionStart=this.index+1):(this.state=sD(e)?9:27,this.sectionStart=this.index));}stateInClosingTagName(e){(62===e||sV(e))&&(this.cbs.onclosetag(this.sectionStart,this.index),this.sectionStart=-1,this.state=10,this.stateAfterClosingTagName(e));}stateAfterClosingTagName(e){62===e&&(this.state=1,this.sectionStart=this.index+1);}stateBeforeAttrName(e){62===e?(this.cbs.onopentagend(this.index),this.inRCDATA?this.state=32:this.state=1,this.sectionStart=this.index+1):47===e?this.state=7:60===e&&47===this.peek()?(this.cbs.onopentagend(this.index),this.state=5,this.sectionStart=this.index):sV(e)||this.handleAttrStart(e);}handleAttrStart(e){118===e&&45===this.peek()?(this.state=13,this.sectionStart=this.index):46===e||58===e||64===e||35===e?(this.cbs.ondirname(this.index,this.index+1),this.state=14,this.sectionStart=this.index+1):(this.state=12,this.sectionStart=this.index);}stateInSelfClosingTag(e){62===e?(this.cbs.onselfclosingtag(this.index),this.state=1,this.sectionStart=this.index+1,this.inRCDATA=!1):sV(e)||(this.state=11,this.stateBeforeAttrName(e));}stateInAttrName(e){(61===e||sB(e))&&(this.cbs.onattribname(this.sectionStart,this.index),this.handleAttrNameEnd(e));}stateInDirName(e){61===e||sB(e)?(this.cbs.ondirname(this.sectionStart,this.index),this.handleAttrNameEnd(e)):58===e?(this.cbs.ondirname(this.sectionStart,this.index),this.state=14,this.sectionStart=this.index+1):46===e&&(this.cbs.ondirname(this.sectionStart,this.index),this.state=16,this.sectionStart=this.index+1);}stateInDirArg(e){61===e||sB(e)?(this.cbs.ondirarg(this.sectionStart,this.index),this.handleAttrNameEnd(e)):91===e?this.state=15:46===e&&(this.cbs.ondirarg(this.sectionStart,this.index),this.state=16,this.sectionStart=this.index+1);}stateInDynamicDirArg(e){93===e?this.state=14:(61===e||sB(e))&&(this.cbs.ondirarg(this.sectionStart,this.index+1),this.handleAttrNameEnd(e));}stateInDirModifier(e){61===e||sB(e)?(this.cbs.ondirmodifier(this.sectionStart,this.index),this.handleAttrNameEnd(e)):46===e&&(this.cbs.ondirmodifier(this.sectionStart,this.index),this.sectionStart=this.index+1);}handleAttrNameEnd(e){this.sectionStart=this.index,this.state=17,this.cbs.onattribnameend(this.index),this.stateAfterAttrName(e);}stateAfterAttrName(e){61===e?this.state=18:47===e||62===e?(this.cbs.onattribend(0,this.sectionStart),this.sectionStart=-1,this.state=11,this.stateBeforeAttrName(e)):sV(e)||(this.cbs.onattribend(0,this.sectionStart),this.handleAttrStart(e));}stateBeforeAttrValue(e){34===e?(this.state=19,this.sectionStart=this.index+1):39===e?(this.state=20,this.sectionStart=this.index+1):sV(e)||(this.sectionStart=this.index,this.state=21,this.stateInAttrValueNoQuotes(e));}handleInAttrValue(e,t){(e===t||this.fastForwardTo(t))&&(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(34===t?3:2,this.index+1),this.state=11);}stateInAttrValueDoubleQuotes(e){this.handleInAttrValue(e,34);}stateInAttrValueSingleQuotes(e){this.handleInAttrValue(e,39);}stateInAttrValueNoQuotes(e){sV(e)||62===e?(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(1,this.index),this.state=11,this.stateBeforeAttrName(e)):(39===e||60===e||61===e||96===e)&&this.cbs.onerr(18,this.index);}stateBeforeDeclaration(e){91===e?(this.state=26,this.sequenceIndex=0):this.state=45===e?25:23;}stateInDeclaration(e){(62===e||this.fastForwardTo(62))&&(this.state=1,this.sectionStart=this.index+1);}stateInProcessingInstruction(e){(62===e||this.fastForwardTo(62))&&(this.cbs.onprocessinginstruction(this.sectionStart,this.index),this.state=1,this.sectionStart=this.index+1);}stateBeforeComment(e){45===e?(this.state=28,this.currentSequence=sj.CommentEnd,this.sequenceIndex=2,this.sectionStart=this.index+1):this.state=23;}stateInSpecialComment(e){(62===e||this.fastForwardTo(62))&&(this.cbs.oncomment(this.sectionStart,this.index),this.state=1,this.sectionStart=this.index+1);}stateBeforeSpecialS(e){e===sj.ScriptEnd[3]?this.startSpecial(sj.ScriptEnd,4):e===sj.StyleEnd[3]?this.startSpecial(sj.StyleEnd,4):(this.state=6,this.stateInTagName(e));}stateBeforeSpecialT(e){e===sj.TitleEnd[3]?this.startSpecial(sj.TitleEnd,4):e===sj.TextareaEnd[3]?this.startSpecial(sj.TextareaEnd,4):(this.state=6,this.stateInTagName(e));}startEntity(){}stateInEntity(){}parse(e){for(this.buffer=e;this.index<this.buffer.length;){let e=this.buffer.charCodeAt(this.index);switch(10===e&&this.newlines.push(this.index),this.state){case 1:this.stateText(e);break;case 2:this.stateInterpolationOpen(e);break;case 3:this.stateInterpolation(e);break;case 4:this.stateInterpolationClose(e);break;case 31:this.stateSpecialStartSequence(e);break;case 32:this.stateInRCDATA(e);break;case 26:this.stateCDATASequence(e);break;case 19:this.stateInAttrValueDoubleQuotes(e);break;case 12:this.stateInAttrName(e);break;case 13:this.stateInDirName(e);break;case 14:this.stateInDirArg(e);break;case 15:this.stateInDynamicDirArg(e);break;case 16:this.stateInDirModifier(e);break;case 28:this.stateInCommentLike(e);break;case 27:this.stateInSpecialComment(e);break;case 11:this.stateBeforeAttrName(e);break;case 6:this.stateInTagName(e);break;case 34:this.stateInSFCRootTagName(e);break;case 9:this.stateInClosingTagName(e);break;case 5:this.stateBeforeTagName(e);break;case 17:this.stateAfterAttrName(e);break;case 20:this.stateInAttrValueSingleQuotes(e);break;case 18:this.stateBeforeAttrValue(e);break;case 8:this.stateBeforeClosingTagName(e);break;case 10:this.stateAfterClosingTagName(e);break;case 29:this.stateBeforeSpecialS(e);break;case 30:this.stateBeforeSpecialT(e);break;case 21:this.stateInAttrValueNoQuotes(e);break;case 7:this.stateInSelfClosingTag(e);break;case 23:this.stateInDeclaration(e);break;case 22:this.stateBeforeDeclaration(e);break;case 25:this.stateBeforeComment(e);break;case 24:this.stateInProcessingInstruction(e);break;case 33:this.stateInEntity();}this.index++;}this.cleanup(),this.finish();}cleanup(){this.sectionStart!==this.index&&(1===this.state||32===this.state&&0===this.sequenceIndex?(this.cbs.ontext(this.sectionStart,this.index),this.sectionStart=this.index):(19===this.state||20===this.state||21===this.state)&&(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=this.index));}finish(){this.handleTrailingData(),this.cbs.onend();}handleTrailingData(){let e=this.buffer.length;this.sectionStart>=e||(28===this.state?this.currentSequence===sj.CdataEnd?this.cbs.oncdata(this.sectionStart,e):this.cbs.oncomment(this.sectionStart,e):6===this.state||11===this.state||18===this.state||17===this.state||12===this.state||13===this.state||14===this.state||15===this.state||16===this.state||20===this.state||19===this.state||21===this.state||9===this.state||this.cbs.ontext(this.sectionStart,e));}emitCodePoint(e,t){}}(of,{onerr:oR,ontext(e,t){o_(ov(e,t),e,t);},ontextentity(e,t,n){o_(e,t,n);},oninterpolation(e,t){if(op)return o_(ov(e,t),e,t);let n=e+om.delimiterOpen.length,r=t-om.delimiterClose.length;for(;sV(ol.charCodeAt(n));)n++;for(;sV(ol.charCodeAt(r-1));)r--;let i=ov(n,r);i.includes("&")&&(i=or.decodeEntities(i,!1)),oE({type:5,content:oI(i,!1,oA(n,r)),loc:oA(e,t)});},onopentagname(e,t){let n=ov(e,t);os={type:1,tag:n,ns:or.getNamespace(n,of[0],or.ns),tagType:0,props:[],children:[],loc:oA(e-1,t),codegenNode:void 0};},onopentagend(e){ob(e);},onclosetag(e,t){let n=ov(e,t);if(!or.isVoidTag(n)){let r=!1;for(let e=0;e<of.length;e++)if(of[e].tag.toLowerCase()===n.toLowerCase()){r=!0,e>0&&of[0].loc.start.offset;for(let n=0;n<=e;n++)oS(of.shift(),t,n<e);break}r||ox(e,60);}},onselfclosingtag(e){let t=os.tag;os.isSelfClosing=!0,ob(e),of[0]&&of[0].tag===t&&oS(of.shift(),e);},onattribname(e,t){oo={type:6,name:ov(e,t),nameLoc:oA(e,t),value:void 0,loc:oA(e)};},ondirname(e,t){let n=ov(e,t),r="."===n||":"===n?"bind":"@"===n?"on":"#"===n?"slot":n.slice(2);if(op||""===r)oo={type:6,name:n,nameLoc:oA(e,t),value:void 0,loc:oA(e)};else if(oo={type:7,name:r,rawName:n,exp:void 0,arg:void 0,modifiers:"."===n?["prop"]:[],loc:oA(e)},"pre"===r){op=om.inVPre=!0,oh=os;let e=os.props;for(let t=0;t<e.length;t++)7===e[t].type&&(e[t]=function(e){let t={type:6,name:e.rawName,nameLoc:oA(e.loc.start.offset,e.loc.start.offset+e.rawName.length),value:void 0,loc:e.loc};if(e.exp){let n=e.exp.loc;n.end.offset<e.loc.end.offset&&(n.start.offset--,n.start.column--,n.end.offset++,n.end.column++),t.value={type:2,content:e.exp.content,loc:n};}return t}(e[t]));}},ondirarg(e,t){if(e===t)return;let n=ov(e,t);if(op)oo.name+=n,oN(oo.nameLoc,t);else {let r="["!==n[0];oo.arg=oI(r?n:n.slice(1,-1),r,oA(e,t),r?3:0);}},ondirmodifier(e,t){let n=ov(e,t);if(op)oo.name+="."+n,oN(oo.nameLoc,t);else if("slot"===oo.name){let e=oo.arg;e&&(e.content+="."+n,oN(e.loc,t));}else oo.modifiers.push(n);},onattribdata(e,t){oa+=ov(e,t),oc<0&&(oc=e),ou=t;},onattribentity(e,t,n){oa+=e,oc<0&&(oc=t),ou=n;},onattribnameend(e){let t=ov(oo.loc.start.offset,e);7===oo.type&&(oo.rawName=t),os.props.some(e=>(7===e.type?e.rawName:e.name)===t);},onattribend(e,t){os&&oo&&(oN(oo.loc,t),0!==e&&(oa.includes("&")&&(oa=or.decodeEntities(oa,!0)),6===oo.type?("class"===oo.name&&(oa=ow(oa).trim()),oo.value={type:2,content:oa,loc:1===e?oA(oc,ou):oA(oc-1,ou+1)},om.inSFCRoot&&"template"===os.tag&&"lang"===oo.name&&oa&&"html"!==oa&&om.enterRCDATA(sU("</template"),0)):(oo.exp=oI(oa,!1,oA(oc,ou),0,0),"for"===oo.name&&(oo.forParseResult=function(e){let t=e.loc,n=e.content,r=n.match(ot);if(!r)return;let[,i,l]=r,s=(e,n,r=!1)=>{let i=t.start.offset+n,l=i+e.length;return oI(e,!1,oA(i,l),0,r?1:0)},o={source:s(l.trim(),n.indexOf(l,i.length)),value:void 0,key:void 0,index:void 0,finalized:!1},a=i.trim().replace(oy,"").trim(),c=i.indexOf(a),u=a.match(og);if(u){let e;a=a.replace(og,"").trim();let t=u[1].trim();if(t&&(e=n.indexOf(t,c+a.length),o.key=s(t,e,!0)),u[2]){let r=u[2].trim();r&&(o.index=s(r,n.indexOf(r,o.key?e+t.length:c+a.length),!0));}}return a&&(o.value=s(a,c,!0)),o}(oo.exp)))),(7!==oo.type||"pre"!==oo.name)&&os.props.push(oo)),oa="",oc=ou=-1;},oncomment(e,t){or.comments&&oE({type:3,content:ov(e,t),loc:oA(e-4,t+3)});},onend(){let e=ol.length;for(let t=0;t<of.length;t++)oS(of[t],e-1),of[t].loc.start.offset;},oncdata(e,t){0!==of[0].ns&&o_(ov(e,t),e,t);},onprocessinginstruction(e){(of[0]?of[0].ns:or.ns)===0&&oR(21,e-1);}}),og=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,oy=/^\(|\)$/g;function ov(e,t){return ol.slice(e,t)}function ob(e){om.inSFCRoot&&(os.innerLoc=oA(e+1,e+1)),oE(os);let{tag:t,ns:n}=os;0===n&&or.isPreTag(t)&&od++,or.isVoidTag(t)?oS(os,e):(of.unshift(os),(1===n||2===n)&&(om.inXML=!0)),os=null;}function o_(e,t,n){{let t=of[0]&&of[0].tag;"script"!==t&&"style"!==t&&e.includes("&")&&(e=or.decodeEntities(e,!1));}let r=of[0]||oi,i=r.children[r.children.length-1];i&&2===i.type?(i.content+=e,oN(i.loc,n)):r.children.push({type:2,content:e,loc:oA(t,n)});}function oS(e,t,n=!1){n?oN(e.loc,ox(t,60)):oN(e.loc,function(e,t){let n=e;for(;62!==ol.charCodeAt(n)&&n<ol.length-1;)n++;return n}(t)+1),om.inSFCRoot&&(e.children.length?e.innerLoc.end=y({},e.children[e.children.length-1].loc.end):e.innerLoc.end=y({},e.innerLoc.start),e.innerLoc.source=ov(e.innerLoc.start.offset,e.innerLoc.end.offset));let{tag:r,ns:i}=e;!op&&("slot"===r?e.tagType=2:function({tag:e,props:t}){if("template"===e){for(let e=0;e<t.length;e++)if(7===t[e].type&&oC.has(t[e].name))return !0}return !1}(e)?e.tagType=3:function({tag:e,props:t}){var n;if(or.isCustomElement(e))return !1;if("component"===e||(n=e.charCodeAt(0))>64&&n<91||sz(e)||or.isBuiltInComponent&&or.isBuiltInComponent(e)||or.isNativeTag&&!or.isNativeTag(e))return !0;for(let e=0;e<t.length;e++){let n=t[e];if(6===n.type&&"is"===n.name&&n.value&&n.value.content.startsWith("vue:"))return !0}return !1}(e)&&(e.tagType=1)),om.inRCDATA||(e.children=oT(e.children,e.tag)),0===i&&or.isPreTag(r)&&od--,oh===e&&(op=om.inVPre=!1,oh=null),om.inXML&&(of[0]?of[0].ns:or.ns)===0&&(om.inXML=!1);}function ox(e,t){let n=e;for(;ol.charCodeAt(n)!==t&&n>=0;)n--;return n}let oC=new Set(["if","else","else-if","for","slot"]),ok=/\r\n/g;function oT(e,t){let n="preserve"!==or.whitespace,r=!1;for(let t=0;t<e.length;t++){let i=e[t];if(2===i.type){if(od)i.content=i.content.replace(ok,"\n");else if(function(e){for(let t=0;t<e.length;t++)if(!sV(e.charCodeAt(t)))return !1;return !0}(i.content)){let l=e[t-1]&&e[t-1].type,s=e[t+1]&&e[t+1].type;!l||!s||n&&(3===l&&(3===s||1===s)||1===l&&(3===s||1===s&&function(e){for(let t=0;t<e.length;t++){let n=e.charCodeAt(t);if(10===n||13===n)return !0}return !1}(i.content)))?(r=!0,e[t]=null):i.content=" ";}else n&&(i.content=ow(i.content));}}if(od&&t&&or.isPreTag(t)){let t=e[0];t&&2===t.type&&(t.content=t.content.replace(/^\r?\n/,""));}return r?e.filter(Boolean):e}function ow(e){let t="",n=!1;for(let r=0;r<e.length;r++)sV(e.charCodeAt(r))?n||(t+=" ",n=!0):(t+=e[r],n=!1);return t}function oE(e){(of[0]||oi).children.push(e);}function oA(e,t){return {start:om.getPos(e),end:null==t?t:om.getPos(t),source:null==t?t:ov(e,t)}}function oN(e,t){e.end=om.getPos(t),e.source=ov(e.start.offset,t);}function oI(e,t=!1,n,r=0,i=0){return sI(e,t,n,r)}function oR(e,t,n){or.onError(sW(e,oA(t,t)));}function oO(e,t){let{children:n}=e;return 1===n.length&&1===t.type&&!s8(t)}function oL(e,t){let{constantCache:n}=t;switch(e.type){case 1:if(0!==e.tagType)return 0;let r=n.get(e);if(void 0!==r)return r;let i=e.codegenNode;if(13!==i.type||i.isBlock&&"svg"!==e.tag&&"foreignObject"!==e.tag&&"math"!==e.tag)return 0;if(void 0!==i.patchFlag)return n.set(e,0),0;{let r=3,c=o$(e,t);if(0===c)return n.set(e,0),0;c<r&&(r=c);for(let i=0;i<e.children.length;i++){let l=oL(e.children[i],t);if(0===l)return n.set(e,0),0;l<r&&(r=l);}if(r>1)for(let i=0;i<e.props.length;i++){let l=e.props[i];if(7===l.type&&"bind"===l.name&&l.exp){let i=oL(l.exp,t);if(0===i)return n.set(e,0),0;i<r&&(r=i);}}if(i.isBlock){var l,s,o,a;for(let t=0;t<e.props.length;t++)if(7===e.props[t].type)return n.set(e,0),0;t.removeHelper(l0),t.removeHelper((l=t.inSSR,s=i.isComponent,l||s?l1:l2)),i.isBlock=!1,t.helper((o=t.inSSR,a=i.isComponent,o||a?l3:l6));}return n.set(e,r),r}case 2:case 3:return 3;case 9:case 11:case 10:default:return 0;case 5:case 12:return oL(e.content,t);case 4:return e.constType;case 8:let c=3;for(let n=0;n<e.children.length;n++){let r=e.children[n];if(A(r)||N(r))continue;let i=oL(r,t);if(0===i)return 0;i<c&&(c=i);}return c}}let oM=new Set([sa,sc,su,sd]);function o$(e,t){let n=3,r=oP(e);if(r&&15===r.type){let{properties:e}=r;for(let r=0;r<e.length;r++){let i;let{key:l,value:s}=e[r],o=oL(l,t);if(0===o)return o;if(o<n&&(n=o),0===(i=4===s.type?oL(s,t):14===s.type?function e(t,n){if(14===t.type&&!A(t.callee)&&oM.has(t.callee)){let r=t.arguments[0];if(4===r.type)return oL(r,n);if(14===r.type)return e(r,n)}return 0}(s,t):0))return i;i<n&&(n=i);}}return n}function oP(e){let t=e.codegenNode;if(13===t.type)return t.props}function oF(e,t){t.currentNode=e;let{nodeTransforms:n}=t,r=[];for(let i=0;i<n.length;i++){let l=n[i](e,t);if(l&&(x(l)?r.push(...l):r.push(l)),!t.currentNode)return;e=t.currentNode;}switch(e.type){case 3:t.ssr||t.helper(l4);break;case 5:t.ssr||t.helper(ss);break;case 9:for(let n=0;n<e.branches.length;n++)oF(e.branches[n],t);break;case 10:case 11:case 1:case 0:!function(e,t){let n=0,r=()=>{n--;};for(;n<e.children.length;n++){let i=e.children[n];A(i)||(t.grandParent=t.parent,t.parent=e,t.childIndex=n,t.onNodeRemoved=r,oF(i,t));}}(e,t);}t.currentNode=e;let i=r.length;for(;i--;)r[i]();}function oD(e,t){let n=A(e)?t=>t===e:t=>e.test(t);return (e,r)=>{if(1===e.type){let{props:i}=e;if(3===e.tagType&&i.some(s6))return;let l=[];for(let s=0;s<i.length;s++){let o=i[s];if(7===o.type&&n(o.name)){i.splice(s,1),s--;let n=t(e,o,r);n&&l.push(n);}}return l}}}let oV="/*#__PURE__*/",oB=e=>`${sk[e]}: _${sk[e]}`;function oU(e,t,{helper:n,push:r,newline:i,isTS:l}){let s=n("component"===t?l9:se);for(let n=0;n<e.length;n++){let o=e[n],a=o.endsWith("__self");a&&(o=o.slice(0,-6)),r(`const ${oe(o,t)} = ${s}(${JSON.stringify(o)}${a?", true":""})${l?"!":""}`),n<e.length-1&&i();}}function oj(e,t){let n=e.length>3;t.push("["),n&&t.indent(),oH(e,t,n),n&&t.deindent(),t.push("]");}function oH(e,t,n=!1,r=!0){let{push:i,newline:l}=t;for(let s=0;s<e.length;s++){let o=e[s];A(o)?i(o,-3):x(o)?oj(o,t):oq(o,t),s<e.length-1&&(n?(r&&i(","),l()):r&&i(", "));}}function oq(e,t){if(A(e)){t.push(e,-3);return}if(N(e)){t.push(t.helper(e));return}switch(e.type){case 1:case 9:case 11:case 12:oq(e.codegenNode,t);break;case 2:!function(e,t){t.push(JSON.stringify(e.content),-3,e);}(e,t);break;case 4:oW(e,t);break;case 5:!function(e,t){let{push:n,helper:r,pure:i}=t;i&&n(oV),n(`${r(ss)}(`),oq(e.content,t),n(")");}(e,t);break;case 8:oK(e,t);break;case 3:!function(e,t){let{push:n,helper:r,pure:i}=t;i&&n(oV),n(`${r(l4)}(${JSON.stringify(e.content)})`,-3,e);}(e,t);break;case 13:!function(e,t){let n;let{push:r,helper:i,pure:l}=t,{tag:s,props:o,children:a,patchFlag:c,dynamicProps:u,directives:d,isBlock:p,disableTracking:h,isComponent:f}=e;c&&(n=String(c)),d&&r(i(sn)+"("),p&&r(`(${i(l0)}(${h?"true":""}), `),l&&r(oV),r(i(p?t.inSSR||f?l1:l2:t.inSSR||f?l3:l6)+"(",-2,e),oH(function(e){let t=e.length;for(;t--&&null==e[t];);return e.slice(0,t+1).map(e=>e||"null")}([s,o,a,n,u]),t),r(")"),p&&r(")"),d&&(r(", "),oq(d,t),r(")"));}(e,t);break;case 14:!function(e,t){let{push:n,helper:r,pure:i}=t,l=A(e.callee)?e.callee:r(e.callee);i&&n(oV),n(l+"(",-2,e),oH(e.arguments,t),n(")");}(e,t);break;case 15:!function(e,t){let{push:n,indent:r,deindent:i,newline:l}=t,{properties:s}=e;if(!s.length){n("{}",-2,e);return}let o=s.length>1;n(o?"{":"{ "),o&&r();for(let e=0;e<s.length;e++){let{key:r,value:i}=s[e];!function(e,t){let{push:n}=t;8===e.type?(n("["),oK(e,t),n("]")):e.isStatic?n(sJ(e.content)?e.content:JSON.stringify(e.content),-2,e):n(`[${e.content}]`,-3,e);}(r,t),n(": "),oq(i,t),e<s.length-1&&(n(","),l());}o&&i(),n(o?"}":" }");}(e,t);break;case 17:oj(e.elements,t);break;case 18:!function(e,t){let{push:n,indent:r,deindent:i}=t,{params:l,returns:s,body:o,newline:a,isSlot:c}=e;c&&n(`_${sk[sb]}(`),n("(",-2,e),x(l)?oH(l,t):l&&oq(l,t),n(") => "),(a||o)&&(n("{"),r()),s?(a&&n("return "),x(s)?oj(s,t):oq(s,t)):o&&oq(o,t),(a||o)&&(i(),n("}")),c&&n(")");}(e,t);break;case 19:!function(e,t){let{test:n,consequent:r,alternate:i,newline:l}=e,{push:s,indent:o,deindent:a,newline:c}=t;if(4===n.type){let e=!sJ(n.content);e&&s("("),oW(n,t),e&&s(")");}else s("("),oq(n,t),s(")");l&&o(),t.indentLevel++,l||s(" "),s("? "),oq(r,t),t.indentLevel--,l&&c(),l||s(" "),s(": ");let u=19===i.type;!u&&t.indentLevel++,oq(i,t),!u&&t.indentLevel--,l&&a(!0);}(e,t);break;case 20:!function(e,t){let{push:n,helper:r,indent:i,deindent:l,newline:s}=t;n(`_cache[${e.index}] || (`),e.isVOnce&&(i(),n(`${r(sg)}(-1),`),s(),n("(")),n(`_cache[${e.index}] = `),oq(e.value,t),e.isVOnce&&(n(`).cacheIndex = ${e.index},`),s(),n(`${r(sg)}(1),`),s(),n(`_cache[${e.index}]`),l()),n(")");}(e,t);break;case 21:oH(e.body,t,!0,!1);}}function oW(e,t){let{content:n,isStatic:r}=e;t.push(r?JSON.stringify(n):n,-3,e);}function oK(e,t){for(let n=0;n<e.children.length;n++){let r=e.children[n];A(r)?t.push(r,-3):oq(r,t);}}let oz=oD(/^(if|else|else-if)$/,(e,t,n)=>(function(e,t,n,r){if("else"!==t.name&&(!t.exp||!t.exp.content.trim())){let r=t.exp?t.exp.loc:e.loc;n.onError(sW(28,t.loc)),t.exp=sI("true",!1,r);}if("if"===t.name){let i=oG(e,t),l={type:9,loc:e.loc,branches:[i]};if(n.replaceNode(l),r)return r(l,i,!0)}else {let i=n.parent.children,l=i.indexOf(e);for(;l-- >=-1;){let s=i[l];if(s&&3===s.type||s&&2===s.type&&!s.content.trim().length){n.removeNode(s);continue}if(s&&9===s.type){"else-if"===t.name&&void 0===s.branches[s.branches.length-1].condition&&n.onError(sW(30,e.loc)),n.removeNode();let i=oG(e,t);s.branches.push(i);let l=r&&r(s,i,!1);oF(i,n),l&&l(),n.currentNode=null;}else n.onError(sW(30,e.loc));break}}})(e,t,n,(e,t,r)=>{let i=n.parent.children,l=i.indexOf(e),s=0;for(;l-- >=0;){let e=i[l];e&&9===e.type&&(s+=e.branches.length);}return ()=>{r?e.codegenNode=oJ(t,s,n):function(e){for(;;)if(19===e.type){if(19!==e.alternate.type)return e;e=e.alternate;}else 20===e.type&&(e=e.value);}(e.codegenNode).alternate=oJ(t,s+e.branches.length-1,n);}}));function oG(e,t){let n=3===e.tagType;return {type:10,loc:e.loc,condition:"else"===t.name?void 0:t.exp,children:n&&!s0(e,"for")?e.children:[e],userKey:s1(e,"key"),isTemplateIf:n}}function oJ(e,t,n){return e.condition?sM(e.condition,oX(e,t,n),sO(n.helper(l4),['""',"true"])):oX(e,t,n)}function oX(e,t,n){let{helper:r}=n,i=sN("key",sI(`${t}`,!1,sT,2)),{children:l}=e,s=l[0];if(1!==l.length||1!==s.type){if(1!==l.length||11!==s.type)return sw(n,r(lJ),sA([i]),l,64,void 0,void 0,!0,!1,!1,e.loc);{let e=s.codegenNode;return s9(e,i,n),e}}{let e=s.codegenNode,t=14===e.type&&e.callee===sx?e.arguments[1].returns:e;return 13===t.type&&s$(t,n),s9(t,i,n),e}}let oQ=(e,t,n)=>{let{modifiers:r,loc:i}=e,l=e.arg,{exp:s}=e;if(s&&4===s.type&&!s.content.trim()&&(s=void 0),!s){if(4!==l.type||!l.isStatic)return n.onError(sW(52,l.loc)),{props:[sN(l,sI("",!0,i))]};oZ(e),s=e.exp;}return 4!==l.type?(l.children.unshift("("),l.children.push(') || ""')):l.isStatic||(l.content=`${l.content} || ""`),r.includes("camel")&&(4===l.type?l.isStatic?l.content=U(l.content):l.content=`${n.helperString(sh)}(${l.content})`:(l.children.unshift(`${n.helperString(sh)}(`),l.children.push(")"))),!n.inSSR&&(r.includes("prop")&&oY(l,"."),r.includes("attr")&&oY(l,"^")),{props:[sN(l,s)]}},oZ=(e,t)=>{let n=e.arg,r=U(n.content);e.exp=sI(r,!1,n.loc);},oY=(e,t)=>{4===e.type?e.isStatic?e.content=t+e.content:e.content=`\`${t}\${${e.content}}\``:(e.children.unshift(`'${t}' + (`),e.children.push(")"));},o0=oD("for",(e,t,n)=>{let{helper:r,removeHelper:i}=n;return function(e,t,n,r){if(!t.exp){n.onError(sW(31,t.loc));return}let i=t.forParseResult;if(!i){n.onError(sW(32,t.loc));return}o1(i);let{addIdentifiers:l,removeIdentifiers:s,scopes:o}=n,{source:a,value:c,key:u,index:d}=i,p={type:11,loc:t.loc,source:a,valueAlias:c,keyAlias:u,objectIndexAlias:d,parseResult:i,children:s4(e)?e.children:[e]};n.replaceNode(p),o.vFor++;let h=r&&r(p);return ()=>{o.vFor--,h&&h();}}(e,t,n,t=>{let l=sO(r(sr),[t.source]),s=s4(e),o=s0(e,"memo"),a=s1(e,"key",!1,!0);a&&7===a.type&&!a.exp&&oZ(a);let c=a&&(6===a.type?a.value?sI(a.value.content,!0):void 0:a.exp),u=a&&c?sN("key",c):null,d=4===t.source.type&&t.source.constType>0,p=d?64:a?128:256;return t.codegenNode=sw(n,r(lJ),void 0,l,p,void 0,void 0,!0,!d,!1,e.loc),()=>{let a;let{children:p}=t,h=1!==p.length||1!==p[0].type,f=s8(e)?e:s&&1===e.children.length&&s8(e.children[0])?e.children[0]:null;if(f)a=f.codegenNode,s&&u&&s9(a,u,n);else if(h)a=sw(n,r(lJ),u?sA([u]):void 0,e.children,64,void 0,void 0,!0,void 0,!1);else {var m,g,y,b,_,S,x,C;a=p[0].codegenNode,s&&u&&s9(a,u,n),!d!==a.isBlock&&(a.isBlock?(i(l0),i((m=n.inSSR,g=a.isComponent,m||g?l1:l2))):i((y=n.inSSR,b=a.isComponent,y||b?l3:l6))),(a.isBlock=!d,a.isBlock)?(r(l0),r((_=n.inSSR,S=a.isComponent,_||S?l1:l2))):r((x=n.inSSR,C=a.isComponent,x||C?l3:l6));}if(o){let e=sL(o2(t.parseResult,[sI("_cached")]));e.body={type:21,body:[sR(["const _memo = (",o.exp,")"]),sR(["if (_cached",...c?[" && _cached.key === ",c]:[],` && ${n.helperString(sC)}(_cached, _memo)) return _cached`]),sR(["const _item = ",a]),sI("_item.memo = _memo"),sI("return _item")],loc:sT},l.arguments.push(e,sI("_cache"),sI(String(n.cached++)));}else l.arguments.push(sL(o2(t.parseResult),a,!0));}})});function o1(e,t){e.finalized||(e.finalized=!0);}function o2({value:e,key:t,index:n},r=[]){return function(e){let t=e.length;for(;t--&&!e[t];);return e.slice(0,t+1).map((e,t)=>e||sI("_".repeat(t+1),!1))}([e,t,n,...r])}let o3=sI("undefined",!1),o6=(e,t)=>{if(1===e.type&&(1===e.tagType||3===e.tagType)){let n=s0(e,"slot");if(n)return n.exp,t.scopes.vSlot++,()=>{t.scopes.vSlot--;}}},o4=(e,t,n,r)=>sL(e,n,!1,!0,n.length?n[0].loc:r);function o8(e,t,n){let r=[sN("name",e),sN("fn",t)];return null!=n&&r.push(sN("key",sI(String(n),!0))),sA(r)}let o5=new WeakMap,o9=(e,t)=>function(){let n,r,i,l,s;if(!(1===(e=t.currentNode).type&&(0===e.tagType||1===e.tagType)))return;let{tag:o,props:a}=e,c=1===e.tagType,u=c?function(e,t,n=!1){let{tag:r}=e,i=at(r),l=s1(e,"is",!1,!0);if(l){if(i){let e;if(6===l.type?e=l.value&&sI(l.value.content,!0):(e=l.exp)||(e=sI("is",!1,l.arg.loc)),e)return sO(t.helper(l7),[e])}else 6===l.type&&l.value.content.startsWith("vue:")&&(r=l.value.content.slice(4));}let s=sz(r)||t.isBuiltInComponent(r);return s?(n||t.helper(s),s):(t.helper(l9),t.components.add(r),oe(r,"component"))}(e,t):`"${o}"`,d=I(u)&&u.callee===l7,p=0,h=d||u===lX||u===lQ||!c&&("svg"===o||"foreignObject"===o||"math"===o);if(a.length>0){let r=o7(e,t,void 0,c,d);n=r.props,p=r.patchFlag,l=r.dynamicPropNames;let i=r.directives;s=i&&i.length?sE(i.map(e=>(function(e,t){let n=[],r=o5.get(e);r?n.push(t.helperString(r)):(t.helper(se),t.directives.add(e.name),n.push(oe(e.name,"directive")));let{loc:i}=e;if(e.exp&&n.push(e.exp),e.arg&&(e.exp||n.push("void 0"),n.push(e.arg)),Object.keys(e.modifiers).length){e.arg||(e.exp||n.push("void 0"),n.push("void 0"));let t=sI("true",!1,i);n.push(sA(e.modifiers.map(e=>sN(e,t)),i));}return sE(n,e.loc)})(e,t))):void 0,r.shouldUseBlock&&(h=!0);}if(e.children.length>0){if(u===lZ&&(h=!0,p|=1024),c&&u!==lX&&u!==lZ){let{slots:n,hasDynamicSlots:i}=function(e,t,n=o4){t.helper(sb);let{children:r,loc:i}=e,l=[],s=[],o=t.scopes.vSlot>0||t.scopes.vFor>0,a=s0(e,"slot",!0);if(a){let{arg:e,exp:t}=a;e&&!sK(e)&&(o=!0),l.push(sN(e||sI("default",!0),n(t,void 0,r,i)));}let c=!1,u=!1,d=[],p=new Set,h=0;for(let e=0;e<r.length;e++){let i,f,m,g;let y=r[e];if(!s4(y)||!(i=s0(y,"slot",!0))){3!==y.type&&d.push(y);continue}if(a){t.onError(sW(37,i.loc));break}c=!0;let{children:b,loc:_}=y,{arg:S=sI("default",!0),exp:x,loc:C}=i;sK(S)?f=S?S.content:"default":o=!0;let k=s0(y,"for"),T=n(x,k,b,_);if(m=s0(y,"if"))o=!0,s.push(sM(m.exp,o8(S,T,h++),o3));else if(g=s0(y,/^else(-if)?$/,!0)){let n,i=e;for(;i--&&3===(n=r[i]).type;);if(n&&s4(n)&&s0(n,/^(else-)?if$/)){let e=s[s.length-1];for(;19===e.alternate.type;)e=e.alternate;e.alternate=g.exp?sM(g.exp,o8(S,T,h++),o3):o8(S,T,h++);}else t.onError(sW(30,g.loc));}else if(k){o=!0;let e=k.forParseResult;e?(o1(e),s.push(sO(t.helper(sr),[e.source,sL(o2(e),o8(S,T),!0)]))):t.onError(sW(32,k.loc));}else {if(f){if(p.has(f)){t.onError(sW(38,C));continue}p.add(f),"default"===f&&(u=!0);}l.push(sN(S,T));}}if(!a){let e=(e,t)=>sN("default",n(e,void 0,t,i));c?d.length&&d.some(e=>(function e(t){return 2!==t.type&&12!==t.type||(2===t.type?!!t.content.trim():e(t.content))})(e))&&(u?t.onError(sW(39,d[0].loc)):l.push(e(void 0,d))):l.push(e(void 0,r));}let f=o?2:!function e(t){for(let n=0;n<t.length;n++){let r=t[n];switch(r.type){case 1:if(2===r.tagType||e(r.children))return !0;break;case 9:if(e(r.branches))return !0;break;case 10:case 11:if(e(r.children))return !0}}return !1}(e.children)?1:3,m=sA(l.concat(sN("_",sI(f+"",!1))),i);return s.length&&(m=sO(t.helper(sl),[m,sE(s)])),{slots:m,hasDynamicSlots:o}}(e,t);r=n,i&&(p|=1024);}else if(1===e.children.length&&u!==lX){let n=e.children[0],i=n.type,l=5===i||8===i;l&&0===oL(n,t)&&(p|=1),r=l||2===i?n:e.children;}else r=e.children;}l&&l.length&&(i=function(e){let t="[";for(let n=0,r=e.length;n<r;n++)t+=JSON.stringify(e[n]),n<r-1&&(t+=", ");return t+"]"}(l)),e.codegenNode=sw(t,u,n,r,0===p?void 0:p,i,s,!!h,!1,c,e.loc);};function o7(e,t,n=e.props,r,i,l=!1){let s;let{tag:o,loc:a,children:c}=e,u=[],d=[],p=[],h=c.length>0,f=!1,g=0,y=!1,b=!1,_=!1,S=!1,x=!1,C=!1,k=[],T=e=>{u.length&&(d.push(sA(ae(u),a)),u=[]),e&&d.push(e);},w=()=>{t.scopes.vFor>0&&u.push(sN(sI("ref_for",!0),sI("true")));},E=({key:e,value:n})=>{if(sK(e)){let l=e.content,s=m(l);s&&(!r||i)&&"onclick"!==l.toLowerCase()&&"onUpdate:modelValue"!==l&&!F(l)&&(S=!0),s&&F(l)&&(C=!0),s&&14===n.type&&(n=n.arguments[0]),20===n.type||(4===n.type||8===n.type)&&oL(n,t)>0||("ref"===l?y=!0:"class"===l?b=!0:"style"===l?_=!0:"key"===l||k.includes(l)||k.push(l),r&&("class"===l||"style"===l)&&!k.includes(l)&&k.push(l));}else x=!0;};for(let i=0;i<n.length;i++){let s=n[i];if(6===s.type){let{loc:e,name:t,nameLoc:n,value:r}=s;if("ref"===t&&(y=!0,w()),"is"===t&&(at(o)||r&&r.content.startsWith("vue:")))continue;u.push(sN(sI(t,!0,n),sI(r?r.content:"",!0,r?r.loc:e)));}else {let{name:n,arg:i,exp:c,loc:m,modifiers:y}=s,b="bind"===n,_="on"===n;if("slot"===n){r||t.onError(sW(40,m));continue}if("once"===n||"memo"===n||"is"===n||b&&s2(i,"is")&&at(o)||_&&l)continue;if((b&&s2(i,"key")||_&&h&&s2(i,"vue:before-update"))&&(f=!0),b&&s2(i,"ref")&&w(),!i&&(b||_)){x=!0,c?b?(w(),T(),d.push(c)):T({type:14,loc:m,callee:t.helper(sp),arguments:r?[c]:[c,"true"]}):t.onError(sW(b?34:35,m));continue}b&&y.includes("prop")&&(g|=32);let S=t.directiveTransforms[n];if(S){let{props:n,needRuntime:r}=S(s,e,t);l||n.forEach(E),_&&i&&!sK(i)?T(sA(n,a)):u.push(...n),r&&(p.push(s),N(r)&&o5.set(s,r));}else !D(n)&&(p.push(s),h&&(f=!0));}}if(d.length?(T(),s=d.length>1?sO(t.helper(so),d,a):d[0]):u.length&&(s=sA(ae(u),a)),x?g|=16:(b&&!r&&(g|=2),_&&!r&&(g|=4),k.length&&(g|=8),S&&(g|=32)),!f&&(0===g||32===g)&&(y||C||p.length>0)&&(g|=512),!t.inSSR&&s)switch(s.type){case 15:let A=-1,I=-1,R=!1;for(let e=0;e<s.properties.length;e++){let t=s.properties[e].key;sK(t)?"class"===t.content?A=e:"style"===t.content&&(I=e):t.isHandlerKey||(R=!0);}let O=s.properties[A],L=s.properties[I];R?s=sO(t.helper(su),[s]):(O&&!sK(O.value)&&(O.value=sO(t.helper(sa),[O.value])),L&&(_||4===L.value.type&&"["===L.value.content.trim()[0]||17===L.value.type)&&(L.value=sO(t.helper(sc),[L.value])));break;case 14:break;default:s=sO(t.helper(su),[sO(t.helper(sd),[s])]);}return {props:s,directives:p,patchFlag:g,dynamicPropNames:k,shouldUseBlock:f}}function ae(e){let t=new Map,n=[];for(let r=0;r<e.length;r++){let i=e[r];if(8===i.key.type||!i.key.isStatic){n.push(i);continue}let l=i.key.content,s=t.get(l);s?("style"===l||"class"===l||m(l))&&(17===s.value.type?s.value.elements.push(i.value):s.value=sE([s.value,i.value],s.loc)):(t.set(l,i),n.push(i));}return n}function at(e){return "component"===e||"Component"===e}let an=(e,t)=>{if(s8(e)){let{children:n,loc:r}=e,{slotName:i,slotProps:l}=function(e,t){let n,r='"default"',i=[];for(let t=0;t<e.props.length;t++){let n=e.props[t];if(6===n.type)n.value&&("name"===n.name?r=JSON.stringify(n.value.content):(n.name=U(n.name),i.push(n)));else if("bind"===n.name&&s2(n.arg,"name")){if(n.exp)r=n.exp;else if(n.arg&&4===n.arg.type){let e=U(n.arg.content);r=n.exp=sI(e,!1,n.arg.loc);}}else "bind"===n.name&&n.arg&&sK(n.arg)&&(n.arg.content=U(n.arg.content)),i.push(n);}if(i.length>0){let{props:r,directives:l}=o7(e,t,i,!1,!1);n=r,l.length&&t.onError(sW(36,l[0].loc));}return {slotName:r,slotProps:n}}(e,t),s=[t.prefixIdentifiers?"_ctx.$slots":"$slots",i,"{}","undefined","true"],o=2;l&&(s[2]=l,o=3),n.length&&(s[3]=sL([],n,!1,!1,r),o=4),t.scopeId&&!t.slotted&&(o=5),s.splice(o),e.codegenNode=sO(t.helper(si),s,r);}},ar=/^\s*(async\s*)?(\([^)]*?\)|[\w$_]+)\s*(:[^=]+)?=>|^\s*(async\s+)?function(?:\s+[\w$]+)?\s*\(/,ai=(e,t,n,r)=>{let i;let{loc:l,modifiers:s,arg:o}=e;if(e.exp||s.length,4===o.type){if(o.isStatic){let e=o.content;e.startsWith("vue:")&&(e=`vnode-${e.slice(4)}`),i=sI(0!==t.tagType||e.startsWith("vnode")||!/[A-Z]/.test(e)?W(U(e)):`on:${e}`,!0,o.loc);}else i=sR([`${n.helperString(sm)}(`,o,")"]);}else (i=o).children.unshift(`${n.helperString(sm)}(`),i.children.push(")");let a=e.exp;a&&!a.content.trim()&&(a=void 0);let c=n.cacheHandlers&&!a&&!n.inVOnce;if(a){let e=sY(a.content),t=!(e||ar.test(a.content)),n=a.content.includes(";");(t||c&&e)&&(a=sR([`${t?"$event":"(...args)"} => ${n?"{":"("}`,a,n?"}":")"]));}let u={props:[sN(i,a||sI("() => {}",!1,l))]};return r&&(u=r(u)),c&&(u.props[0].value=n.cache(u.props[0].value)),u.props.forEach(e=>e.key.isHandlerKey=!0),u},al=(e,t)=>{if(0===e.type||1===e.type||11===e.type||10===e.type)return ()=>{let n;let r=e.children,i=!1;for(let e=0;e<r.length;e++){let t=r[e];if(s3(t)){i=!0;for(let i=e+1;i<r.length;i++){let l=r[i];if(s3(l))n||(n=r[e]=sR([t],t.loc)),n.children.push(" + ",l),r.splice(i,1),i--;else {n=void 0;break}}}}if(i&&(1!==r.length||0!==e.type&&(1!==e.type||0!==e.tagType||e.props.find(e=>7===e.type&&!t.directiveTransforms[e.name]))))for(let e=0;e<r.length;e++){let n=r[e];if(s3(n)||8===n.type){let i=[];(2!==n.type||" "!==n.content)&&i.push(n),t.ssr||0!==oL(n,t)||i.push("1"),r[e]={type:12,content:n,loc:n.loc,codegenNode:sO(t.helper(l8),i)};}}}},as=new WeakSet,ao=(e,t)=>{if(1===e.type&&s0(e,"once",!0)&&!as.has(e)&&!t.inVOnce&&!t.inSSR)return as.add(e),t.inVOnce=!0,t.helper(sg),()=>{t.inVOnce=!1;let e=t.currentNode;e.codegenNode&&(e.codegenNode=t.cache(e.codegenNode,!0));}},aa=(e,t,n)=>{let r;let{exp:i,arg:l}=e;if(!i)return n.onError(sW(41,e.loc)),ac();let s=i.loc.source,o=4===i.type?i.content:s,a=n.bindingMetadata[s];if("props"===a||"props-aliased"===a)return i.loc,ac();if(!o.trim()||!sY(o))return n.onError(sW(42,i.loc)),ac();let c=l||sI("modelValue",!0),u=l?sK(l)?`onUpdate:${U(l.content)}`:sR(['"onUpdate:" + ',l]):"onUpdate:modelValue",d=n.isTS?"($event: any)":"$event";r=sR([`${d} => ((`,i,") = $event)"]);let p=[sN(c,e.exp),sN(u,r)];if(e.modifiers.length&&1===t.tagType){let t=e.modifiers.map(e=>(sJ(e)?e:JSON.stringify(e))+": true").join(", "),n=l?sK(l)?`${l.content}Modifiers`:sR([l,' + "Modifiers"']):"modelModifiers";p.push(sN(n,sI(`{ ${t} }`,!1,e.loc,2)));}return ac(p)};function ac(e=[]){return {props:e}}let au=new WeakSet,ad=(e,t)=>{if(1===e.type){let n=s0(e,"memo");if(!(!n||au.has(e)))return au.add(e),()=>{let r=e.codegenNode||t.currentNode.codegenNode;r&&13===r.type&&(1!==e.tagType&&s$(r,t),e.codegenNode=sO(t.helper(sx),[n.exp,sL(void 0,r),"_cache",String(t.cached++)]));}}},ap=Symbol(""),ah=Symbol(""),af=Symbol(""),am=Symbol(""),ag=Symbol(""),ay=Symbol(""),av=Symbol(""),ab=Symbol(""),a_=Symbol(""),aS=Symbol("");!function(e){Object.getOwnPropertySymbols(e).forEach(t=>{sk[t]=e[t];});}({[ap]:"vModelRadio",[ah]:"vModelCheckbox",[af]:"vModelText",[am]:"vModelSelect",[ag]:"vModelDynamic",[ay]:"withModifiers",[av]:"withKeys",[ab]:"vShow",[a_]:"Transition",[aS]:"TransitionGroup"});let ax={parseMode:"html",isVoidTag:ea,isNativeTag:e=>el(e)||es(e)||eo(e),isPreTag:e=>"pre"===e,decodeEntities:function(e,t=!1){return (c||(c=document.createElement("div")),t)?(c.innerHTML=`<div foo="${e.replace(/"/g,"&quot;")}">`,c.children[0].getAttribute("foo")):(c.innerHTML=e,c.textContent)},isBuiltInComponent:e=>"Transition"===e||"transition"===e?a_:"TransitionGroup"===e||"transition-group"===e?aS:void 0,getNamespace(e,t,n){let r=t?t.ns:n;if(t&&2===r){if("annotation-xml"===t.tag){if("svg"===e)return 1;t.props.some(e=>6===e.type&&"encoding"===e.name&&null!=e.value&&("text/html"===e.value.content||"application/xhtml+xml"===e.value.content))&&(r=0);}else /^m(?:[ions]|text)$/.test(t.tag)&&"mglyph"!==e&&"malignmark"!==e&&(r=0);}else t&&1===r&&("foreignObject"===t.tag||"desc"===t.tag||"title"===t.tag)&&(r=0);if(0===r){if("svg"===e)return 1;if("math"===e)return 2}return r}},aC=(e,t)=>sI(JSON.stringify(er(e)),!1,t,3),ak=u("passive,once,capture"),aT=u("stop,prevent,self,ctrl,shift,alt,meta,exact,middle"),aw=u("left,right"),aE=u("onkeyup,onkeydown,onkeypress",!0),aA=(e,t,n,r)=>{let i=[],l=[],s=[];for(let n=0;n<t.length;n++){let r=t[n];ak(r)?s.push(r):aw(r)?sK(e)?aE(e.content)?i.push(r):l.push(r):(i.push(r),l.push(r)):aT(r)?l.push(r):i.push(r);}return {keyModifiers:i,nonKeyModifiers:l,eventOptionModifiers:s}},aN=(e,t)=>sK(e)&&"onclick"===e.content.toLowerCase()?sI(t,!0):4!==e.type?sR(["(",e,`) === "onClick" ? "${t}" : (`,e,")"]):e,aI=(e,t)=>{1===e.type&&0===e.tagType&&("script"===e.tag||"style"===e.tag)&&t.removeNode();},aR=[e=>{1===e.type&&e.props.forEach((t,n)=>{6===t.type&&"style"===t.name&&t.value&&(e.props[n]={type:7,name:"bind",arg:sI("style",!0,t.loc),exp:aC(t.value.content,t.loc),modifiers:[],loc:t.loc});});}],aO={cloak:()=>({props:[]}),html:(e,t,n)=>{let{exp:r,loc:i}=e;return r||n.onError(sW(53,i)),t.children.length&&(n.onError(sW(54,i)),t.children.length=0),{props:[sN(sI("innerHTML",!0,i),r||sI("",!0))]}},text:(e,t,n)=>{let{exp:r,loc:i}=e;return r||n.onError(sW(55,i)),t.children.length&&(n.onError(sW(56,i)),t.children.length=0),{props:[sN(sI("textContent",!0),r?oL(r,n)>0?r:sO(n.helperString(ss),[r],i):sI("",!0))]}},model:(e,t,n)=>{let r=aa(e,t,n);if(!r.props.length||1===t.tagType)return r;e.arg&&n.onError(sW(58,e.arg.loc));let{tag:i}=t,l=n.isCustomElement(i);if("input"===i||"textarea"===i||"select"===i||l){let s=af,o=!1;if("input"===i||l){let r=s1(t,"type");if(r){if(7===r.type)s=ag;else if(r.value)switch(r.value.content){case"radio":s=ap;break;case"checkbox":s=ah;break;case"file":o=!0,n.onError(sW(59,e.loc));}}else t.props.some(e=>7===e.type&&"bind"===e.name&&(!e.arg||4!==e.arg.type||!e.arg.isStatic))&&(s=ag);}else "select"===i&&(s=am);o||(r.needRuntime=n.helper(s));}else n.onError(sW(57,e.loc));return r.props=r.props.filter(e=>!(4===e.key.type&&"modelValue"===e.key.content)),r},on:(e,t,n)=>ai(e,t,n,t=>{let{modifiers:r}=e;if(!r.length)return t;let{key:i,value:l}=t.props[0],{keyModifiers:s,nonKeyModifiers:o,eventOptionModifiers:a}=aA(i,r,n,e.loc);if(o.includes("right")&&(i=aN(i,"onContextmenu")),o.includes("middle")&&(i=aN(i,"onMouseup")),o.length&&(l=sO(n.helper(ay),[l,JSON.stringify(o)])),s.length&&(!sK(i)||aE(i.content))&&(l=sO(n.helper(av),[l,JSON.stringify(s)])),a.length){let e=a.map(q).join("");i=sK(i)?sI(`${i.content}${e}`,!0):sR(["(",i,`) + "${e}"`]);}return {props:[sN(i,l)]}}),show:(e,t,n)=>{let{exp:r,loc:i}=e;return !r&&n.onError(sW(61,i)),{props:[],needRuntime:n.helper(ab)}}},aL=new WeakMap;function aM(e,t){let n;if(!A(e)){if(!e.nodeType)return h;e=e.innerHTML;}let r=e,i=((n=aL.get(null!=t?t:d))||(n=Object.create(null),aL.set(null!=t?t:d,n)),n),l=i[r];if(l)return l;if("#"===e[0]){let t=document.querySelector(e);e=t?t.innerHTML:"";}let s=y({hoistStatic:!0,onError:void 0,onWarn:h},t);s.isCustomElement||"undefined"==typeof customElements||(s.isCustomElement=e=>!!customElements.get(e));let{code:o}=function(e,t={}){return function(e,t={}){let n=t.onError||sH,r="module"===t.mode;!0===t.prefixIdentifiers?n(sW(47)):r&&n(sW(48)),t.cacheHandlers&&n(sW(49)),t.scopeId&&!r&&n(sW(50));let i=y({},t,{prefixIdentifiers:!1}),l=A(e)?function(e,t){if(om.reset(),os=null,oo=null,oa="",oc=-1,ou=-1,of.length=0,ol=e,or=y({},on),t){let e;for(e in t)null!=t[e]&&(or[e]=t[e]);}om.mode="html"===or.parseMode?1:"sfc"===or.parseMode?2:0,om.inXML=1===or.ns||2===or.ns;let n=t&&t.delimiters;n&&(om.delimiterOpen=sU(n[0]),om.delimiterClose=sU(n[1]));let r=oi=function(e,t=""){return {type:0,source:t,children:e,helpers:new Set,components:[],directives:[],hoists:[],imports:[],cached:0,temps:0,codegenNode:void 0,loc:sT}}([],e);return om.parse(ol),r.loc=oA(0,e.length),r.children=oT(r.children),oi=null,r}(e,i):e,[s,o]=[[ao,oz,ad,o0,an,o9,o6,al],{on:ai,bind:oQ,model:aa}];return !function(e,t){let n=function(e,{filename:t="",prefixIdentifiers:n=!1,hoistStatic:r=!1,hmr:i=!1,cacheHandlers:l=!1,nodeTransforms:s=[],directiveTransforms:o={},transformHoist:a=null,isBuiltInComponent:c=h,isCustomElement:u=h,expressionPlugins:p=[],scopeId:f=null,slotted:m=!0,ssr:g=!1,inSSR:y=!1,ssrCssVars:b="",bindingMetadata:_=d,inline:S=!1,isTS:x=!1,onError:C=sH,onWarn:k=sq,compatConfig:T}){let w=t.replace(/\?.*$/,"").match(/([^/\\]+)\.\w+$/),E={filename:t,selfName:w&&q(U(w[1])),prefixIdentifiers:n,hoistStatic:r,hmr:i,cacheHandlers:l,nodeTransforms:s,directiveTransforms:o,transformHoist:a,isBuiltInComponent:c,isCustomElement:u,expressionPlugins:p,scopeId:f,slotted:m,ssr:g,inSSR:y,ssrCssVars:b,bindingMetadata:_,inline:S,isTS:x,onError:C,onWarn:k,compatConfig:T,root:e,helpers:new Map,components:new Set,directives:new Set,hoists:[],imports:[],constantCache:new WeakMap,temps:0,cached:0,identifiers:Object.create(null),scopes:{vFor:0,vSlot:0,vPre:0,vOnce:0},parent:null,grandParent:null,currentNode:e,childIndex:0,inVOnce:!1,helper(e){let t=E.helpers.get(e)||0;return E.helpers.set(e,t+1),e},removeHelper(e){let t=E.helpers.get(e);if(t){let n=t-1;n?E.helpers.set(e,n):E.helpers.delete(e);}},helperString:e=>`_${sk[E.helper(e)]}`,replaceNode(e){E.parent.children[E.childIndex]=E.currentNode=e;},removeNode(e){let t=E.parent.children,n=e?t.indexOf(e):E.currentNode?E.childIndex:-1;e&&e!==E.currentNode?E.childIndex>n&&(E.childIndex--,E.onNodeRemoved()):(E.currentNode=null,E.onNodeRemoved()),E.parent.children.splice(n,1);},onNodeRemoved:h,addIdentifiers(e){},removeIdentifiers(e){},hoist(e){A(e)&&(e=sI(e)),E.hoists.push(e);let t=sI(`_hoisted_${E.hoists.length}`,!1,e.loc,2);return t.hoisted=e,t},cache:(e,t=!1)=>(function(e,t,n=!1){return {type:20,index:e,value:t,isVOnce:n,loc:sT}})(E.cached++,e,t)};return E}(e,t);oF(e,n),t.hoistStatic&&function e(t,n,r=!1){let{children:i}=t,l=i.length,s=0;for(let t=0;t<i.length;t++){let l=i[t];if(1===l.type&&0===l.tagType){let e=r?0:oL(l,n);if(e>0){if(e>=2){l.codegenNode.patchFlag=-1,l.codegenNode=n.hoist(l.codegenNode),s++;continue}}else {let e=l.codegenNode;if(13===e.type){let t=e.patchFlag;if((void 0===t||512===t||1===t)&&o$(l,n)>=2){let t=oP(l);t&&(e.props=n.hoist(t));}e.dynamicProps&&(e.dynamicProps=n.hoist(e.dynamicProps));}}}if(1===l.type){let t=1===l.tagType;t&&n.scopes.vSlot++,e(l,n),t&&n.scopes.vSlot--;}else if(11===l.type)e(l,n,1===l.children.length);else if(9===l.type)for(let t=0;t<l.branches.length;t++)e(l.branches[t],n,1===l.branches[t].children.length);}if(s&&n.transformHoist&&n.transformHoist(i,n,t),s&&s===l&&1===t.type&&0===t.tagType&&t.codegenNode&&13===t.codegenNode.type&&x(t.codegenNode.children)){let e=n.hoist(sE(t.codegenNode.children));n.hmr&&(e.content=`[...${e.content}]`),t.codegenNode.children=e;}}(e,n,oO(e,e.children[0])),t.ssr||function(e,t){let{helper:n}=t,{children:r}=e;if(1===r.length){let n=r[0];if(oO(e,n)&&n.codegenNode){let r=n.codegenNode;13===r.type&&s$(r,t),e.codegenNode=r;}else e.codegenNode=n;}else r.length>1&&(e.codegenNode=sw(t,n(lJ),void 0,e.children,64,void 0,void 0,!0,void 0,!1));}(e,n),e.helpers=new Set([...n.helpers.keys()]),e.components=[...n.components],e.directives=[...n.directives],e.imports=n.imports,e.hoists=n.hoists,e.temps=n.temps,e.cached=n.cached,e.transformed=!0;}(l,y({},i,{nodeTransforms:[...s,...t.nodeTransforms||[]],directiveTransforms:y({},o,t.directiveTransforms||{})})),function(e,t={}){let n=function(e,{mode:t="function",prefixIdentifiers:n="module"===t,sourceMap:r=!1,filename:i="template.vue.html",scopeId:l=null,optimizeImports:s=!1,runtimeGlobalName:o="Vue",runtimeModuleName:a="vue",ssrRuntimeModuleName:c="vue/server-renderer",ssr:u=!1,isTS:d=!1,inSSR:p=!1}){let h={mode:t,prefixIdentifiers:n,sourceMap:r,filename:i,scopeId:l,optimizeImports:s,runtimeGlobalName:o,runtimeModuleName:a,ssrRuntimeModuleName:c,ssr:u,isTS:d,inSSR:p,source:e.source,code:"",column:1,line:1,offset:0,indentLevel:0,pure:!1,map:void 0,helper:e=>`_${sk[e]}`,push(e,t=-2,n){h.code+=e;},indent(){f(++h.indentLevel);},deindent(e=!1){e?--h.indentLevel:f(--h.indentLevel);},newline(){f(h.indentLevel);}};function f(e){h.push("\n"+"  ".repeat(e),0);}return h}(e,t);t.onContextCreated&&t.onContextCreated(n);let{mode:r,push:i,prefixIdentifiers:l,indent:s,deindent:o,newline:a,scopeId:c,ssr:u}=n,d=Array.from(e.helpers),p=d.length>0,h=!l&&"module"!==r;(function(e,t){let{ssr:n,prefixIdentifiers:r,push:i,newline:l,runtimeModuleName:s,runtimeGlobalName:o,ssrRuntimeModuleName:a}=t,c=Array.from(e.helpers);if(c.length>0&&(i(`const _Vue = ${o}
    `,-1),e.hoists.length)){let e=[l3,l6,l4,l8,l5].filter(e=>c.includes(e)).map(oB).join(", ");i(`const { ${e} } = _Vue
    `,-1);}(function(e,t){if(!e.length)return;t.pure=!0;let{push:n,newline:r,helper:i,scopeId:l,mode:s}=t;r();for(let i=0;i<e.length;i++){let l=e[i];l&&(n(`const _hoisted_${i+1} = `),oq(l,t),r());}t.pure=!1;})(e.hoists,t),l(),i("return ");})(e,n);let f=(u?["_ctx","_push","_parent","_attrs"]:["_ctx","_cache"]).join(", ");if(i(`function ${u?"ssrRender":"render"}(${f}) {`),s(),h&&(i("with (_ctx) {"),s(),p&&(i(`const { ${d.map(oB).join(", ")} } = _Vue
    `,-1),a())),e.components.length&&(oU(e.components,"component",n),(e.directives.length||e.temps>0)&&a()),e.directives.length&&(oU(e.directives,"directive",n),e.temps>0&&a()),e.temps>0){i("let ");for(let t=0;t<e.temps;t++)i(`${t>0?", ":""}_temp${t}`);}return (e.components.length||e.directives.length||e.temps)&&(i(`
    `,0),a()),u||i("return "),e.codegenNode?oq(e.codegenNode,n):i("null"),h&&(o(),i("}")),o(),i("}"),{ast:e,code:n.code,preamble:"",map:n.map?n.map.toJSON():void 0}}(l,i)}(e,y({},ax,t,{nodeTransforms:[aI,...aR,...t.nodeTransforms||[]],directiveTransforms:y({},aO,t.directiveTransforms||{}),transformHoist:null}))}(e,s),a=Function(o)();return a._rc=!0,i[r]=a}return iI(aM),e.BaseTransition=nr,e.BaseTransitionPropsValidators=nt,e.Comment=r4,e.DeprecationTypes=null,e.EffectScope=eg,e.ErrorCodes={SETUP_FUNCTION:0,0:"SETUP_FUNCTION",RENDER_FUNCTION:1,1:"RENDER_FUNCTION",WATCH_GETTER:2,2:"WATCH_GETTER",WATCH_CALLBACK:3,3:"WATCH_CALLBACK",WATCH_CLEANUP:4,4:"WATCH_CLEANUP",NATIVE_EVENT_HANDLER:5,5:"NATIVE_EVENT_HANDLER",COMPONENT_EVENT_HANDLER:6,6:"COMPONENT_EVENT_HANDLER",VNODE_HOOK:7,7:"VNODE_HOOK",DIRECTIVE_HOOK:8,8:"DIRECTIVE_HOOK",TRANSITION_HOOK:9,9:"TRANSITION_HOOK",APP_ERROR_HANDLER:10,10:"APP_ERROR_HANDLER",APP_WARN_HANDLER:11,11:"APP_WARN_HANDLER",FUNCTION_REF:12,12:"FUNCTION_REF",ASYNC_COMPONENT_LOADER:13,13:"ASYNC_COMPONENT_LOADER",SCHEDULER:14,14:"SCHEDULER",COMPONENT_UPDATE:15,15:"COMPONENT_UPDATE"},e.ErrorTypeStrings=null,e.Fragment=r3,e.KeepAlive={name:"KeepAlive",__isKeepAlive:!0,props:{include:[String,RegExp,Array],exclude:[String,RegExp,Array],max:[String,Number]},setup(e,{slots:t}){let n=ik(),r=n.ctx,i=new Map,l=new Set,s=null,o=n.suspense,{renderer:{p:a,m:c,um:u,o:{createElement:d}}}=r,p=d("div");function h(e){nv(e),u(e,n,o,!0);}function f(e){i.forEach((t,n)=>{let r=i$(t.type);!r||e&&e(r)||m(n);});}function m(e){let t=i.get(e);!t||s&&io(t,s)?s&&nv(s):h(t),i.delete(e),l.delete(e);}r.activate=(e,t,n,r,i)=>{let l=e.component;c(e,t,n,0,o),a(l.vnode,e,t,n,l,o,r,e.slotScopeIds,i),rw(()=>{l.isDeactivated=!1,l.a&&z(l.a);let t=e.props&&e.props.onVnodeMounted;t&&i_(t,l.parent,e);},o);},r.deactivate=e=>{let t=e.component;rL(t.m),rL(t.a),c(e,p,null,1,o),rw(()=>{t.da&&z(t.da);let n=e.props&&e.props.onVnodeUnmounted;n&&i_(n,t.parent,e),t.isDeactivated=!0;},o);},rD(()=>[e.include,e.exclude],([e,t])=>{e&&f(t=>nf(e,t)),t&&f(e=>!nf(t,e));},{flush:"post",deep:!0});let g=null,y=()=>{null!=g&&(rX(n.subTree.type)?rw(()=>{i.set(g,nb(n.subTree));},n.subTree.suspense):i.set(g,nb(n.subTree)));};return nC(y),nT(y),nw(()=>{i.forEach(e=>{let{subTree:t,suspense:r}=n,i=nb(t);if(e.type===i.type&&e.key===i.key){nv(i);let e=i.component.da;e&&rw(e,r);return}h(e);});}),()=>{if(g=null,!t.default)return null;let n=t.default(),r=n[0];if(n.length>1)return s=null,n;if(!is(r)||!(4&r.shapeFlag)&&!(128&r.shapeFlag))return s=null,r;let o=nb(r);if(o.type===r4)return s=null,o;let a=o.type,c=i$(nd(o)?o.type.__asyncResolved||{}:a),{include:u,exclude:d,max:p}=e;if(u&&(!c||!nf(u,c))||d&&c&&nf(d,c))return s=o,r;let h=null==o.key?a:o.key,f=i.get(h);return o.el&&(o=ih(o),128&r.shapeFlag&&(r.ssContent=o)),g=h,f?(o.el=f.el,o.component=f.component,o.transition&&na(o,o.transition),o.shapeFlag|=512,l.delete(h),l.add(h)):(l.add(h),p&&l.size>parseInt(p,10)&&m(l.values().next().value)),o.shapeFlag|=256,s=o,rX(r.type)?r:o}}},e.ReactiveEffect=ev,e.Static=r8,e.Suspense={name:"Suspense",__isSuspense:!0,process(e,t,n,r,i,l,s,o,a,c){if(null==e)(function(e,t,n,r,i,l,s,o,a){let{p:c,o:{createElement:u}}=a,d=u("div"),p=e.suspense=rY(e,i,r,t,d,n,l,s,o,a);c(null,p.pendingBranch=e.ssContent,d,null,r,p,l,s),p.deps>0?(rZ(e,"onPending"),rZ(e,"onFallback"),c(null,e.ssFallback,t,n,r,null,l,s),r2(p,e.ssFallback)):p.resolve(!1,!0);})(t,n,r,i,l,s,o,a,c);else {if(l&&l.deps>0&&!e.suspense.isInFallback){t.suspense=e.suspense,t.suspense.vnode=t,t.el=e.el;return}(function(e,t,n,r,i,l,s,o,{p:a,um:c,o:{createElement:u}}){let d=t.suspense=e.suspense;d.vnode=t,t.el=e.el;let p=t.ssContent,h=t.ssFallback,{activeBranch:f,pendingBranch:m,isInFallback:g,isHydrating:y}=d;if(m)d.pendingBranch=p,io(p,m)?(a(m,p,d.hiddenContainer,null,i,d,l,s,o),d.deps<=0?d.resolve():g&&!y&&(a(f,h,n,r,i,null,l,s,o),r2(d,h))):(d.pendingId=rQ++,y?(d.isHydrating=!1,d.activeBranch=m):c(m,i,d),d.deps=0,d.effects.length=0,d.hiddenContainer=u("div"),g?(a(null,p,d.hiddenContainer,null,i,d,l,s,o),d.deps<=0?d.resolve():(a(f,h,n,r,i,null,l,s,o),r2(d,h))):f&&io(p,f)?(a(f,p,n,r,i,d,l,s,o),d.resolve(!0)):(a(null,p,d.hiddenContainer,null,i,d,l,s,o),d.deps<=0&&d.resolve()));else if(f&&io(p,f))a(f,p,n,r,i,d,l,s,o),r2(d,p);else if(rZ(t,"onPending"),d.pendingBranch=p,512&p.shapeFlag?d.pendingId=p.component.suspenseId:d.pendingId=rQ++,a(null,p,d.hiddenContainer,null,i,d,l,s,o),d.deps<=0)d.resolve();else {let{timeout:e,pendingId:t}=d;e>0?setTimeout(()=>{d.pendingId===t&&d.fallback(h);},e):0===e&&d.fallback(h);}})(e,t,n,r,i,s,o,a,c);}},hydrate:function(e,t,n,r,i,l,s,o,a){let c=t.suspense=rY(t,r,n,e.parentNode,document.createElement("div"),null,i,l,s,o,!0),u=a(e,c.pendingBranch=t.ssContent,n,c,l,s);return 0===c.deps&&c.resolve(!1,!0),u},normalize:function(e){let{shapeFlag:t,children:n}=e,r=32&t;e.ssContent=r0(r?n.default:n),e.ssFallback=r?r0(n.fallback):id(r4);}},e.Teleport={name:"Teleport",__isTeleport:!0,process(e,t,n,r,i,l,s,o,a,c){let{mc:u,pc:d,pbc:p,o:{insert:h,querySelector:f,createText:m,createComment:g}}=c,y=rp(t.props),{shapeFlag:b,children:_,dynamicChildren:S}=t;if(null==e){let e=t.el=m(""),c=t.anchor=m("");h(e,n,r),h(c,n,r);let d=t.target=rm(t.props,f),p=rv(d,t,m,h);d&&("svg"===s||rh(d)?s="svg":("mathml"===s||rf(d))&&(s="mathml"));let g=(e,t)=>{16&b&&u(_,e,t,i,l,s,o,a);};y?g(n,c):d&&g(d,p);}else {t.el=e.el,t.targetStart=e.targetStart;let r=t.anchor=e.anchor,u=t.target=e.target,h=t.targetAnchor=e.targetAnchor,m=rp(e.props),g=m?n:u;if("svg"===s||rh(u)?s="svg":("mathml"===s||rf(u))&&(s="mathml"),S?(p(e.dynamicChildren,S,g,i,l,s,o),rO(e,t,!0)):a||d(e,t,g,m?r:h,i,l,s,o,!1),y)m?t.props&&e.props&&t.props.to!==e.props.to&&(t.props.to=e.props.to):rg(t,n,r,c,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){let e=t.target=rm(t.props,f);e&&rg(t,e,null,c,0);}else m&&rg(t,u,h,c,1);}ry(t);},remove(e,t,n,{um:r,o:{remove:i}},l){let{shapeFlag:s,children:o,anchor:a,targetStart:c,targetAnchor:u,target:d,props:p}=e;if(d&&(i(c),i(u)),l&&i(a),16&s){let e=l||!rp(p);for(let i=0;i<o.length;i++){let l=o[i];r(l,t,n,e,!!l.dynamicChildren);}}},move:rg,hydrate:function(e,t,n,r,i,l,{o:{nextSibling:s,parentNode:o,querySelector:a,insert:c,createText:u}},d){let p=t.target=rm(t.props,a);if(p){let a=p._lpa||p.firstChild;if(16&t.shapeFlag){if(rp(t.props))t.anchor=d(s(e),t,o(e),n,r,i,l),t.targetStart=a,t.targetAnchor=a&&s(a);else {t.anchor=s(e);let o=a;for(;o;){if(o&&8===o.nodeType){if("teleport start anchor"===o.data)t.targetStart=o;else if("teleport anchor"===o.data){t.targetAnchor=o,p._lpa=t.targetAnchor&&s(t.targetAnchor);break}}o=s(o);}t.targetAnchor||rv(p,t,u,c),d(a&&s(a),t,p,n,r,i,l);}}ry(t);}return t.anchor&&s(t.anchor)}},e.Text=r6,e.TrackOpTypes={GET:"get",HAS:"has",ITERATE:"iterate"},e.Transition=iW,e.TransitionGroup=lx,e.TriggerOpTypes={SET:"set",ADD:"add",DELETE:"delete",CLEAR:"clear"},e.VueElement=ly,e.assertNumber=function(e,t){},e.callWithAsyncErrorHandling=tF,e.callWithErrorHandling=tP,e.camelize=U,e.capitalize=q,e.cloneVNode=ih,e.compatUtils=null,e.compile=aM,e.computed=iP,e.createApp=(...e)=>{let t=(a||(a=rA(lj))).createApp(...e),{mount:n}=t;return t.mount=e=>{let r=lG(e);if(!r)return;let i=t._component;E(i)||i.render||i.template||(i.template=r.innerHTML),r.innerHTML="";let l=n(r,!1,lz(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),l},t},e.createBlock=il,e.createCommentVNode=function(e="",t=!1){return t?(r7(),il(r4,null,e)):id(r4,null,e)},e.createElementBlock=function(e,t,n,r,i,l){return ii(iu(e,t,n,r,i,l,!0))},e.createElementVNode=iu,e.createHydrationRenderer=rE,e.createPropsRestProxy=function(e,t){let n={};for(let r in e)t.includes(r)||Object.defineProperty(n,r,{enumerable:!0,get:()=>e[r]});return n},e.createRenderer=function(e){return rA(e)},e.createSSRApp=(...e)=>{let t=lq().createApp(...e),{mount:n}=t;return t.mount=e=>{let t=lG(e);if(t)return n(t,!0,lz(t))},t},e.createSlots=function(e,t){for(let n=0;n<t.length;n++){let r=t[n];if(x(r))for(let t=0;t<r.length;t++)e[r[t].name]=r[t].fn;else r&&(e[r.name]=r.key?(...e)=>{let t=r.fn(...e);return t&&(t.key=r.key),t}:r.fn);}return e},e.createStaticVNode=function(e,t){let n=id(r8,null,e);return n.staticCount=t,n},e.createTextVNode=im,e.createVNode=id,e.customRef=tO,e.defineAsyncComponent=/*! #__NO_SIDE_EFFECTS__ */function(e){let t;E(e)&&(e={loader:e});let{loader:n,loadingComponent:r,errorComponent:i,delay:l=200,timeout:s,suspensible:o=!0,onError:a}=e,c=null,u=0,d=()=>(u++,c=null,p()),p=()=>{let e;return c||(e=c=n().catch(e=>{if(e=e instanceof Error?e:Error(String(e)),a)return new Promise((t,n)=>{a(e,()=>t(d()),()=>n(e),u+1);});throw e}).then(n=>e!==c&&c?c:(n&&(n.__esModule||"Module"===n[Symbol.toStringTag])&&(n=n.default),t=n,n)))};return nu({name:"AsyncComponentWrapper",__asyncLoader:p,get __asyncResolved(){return t},setup(){let e=iC;if(t)return ()=>np(t,e);let n=t=>{c=null,tD(t,e,13,!i);};if(o&&e.suspense)return p().then(t=>()=>np(t,e)).catch(e=>(n(e),()=>i?id(i,{error:e}):null));let a=tT(!1),u=tT(),d=tT(!!l);return l&&setTimeout(()=>{d.value=!1;},l),null!=s&&setTimeout(()=>{if(!a.value&&!u.value){let e=Error(`Async component timed out after ${s}ms.`);n(e),u.value=e;}},s),p().then(()=>{a.value=!0,e.parent&&nh(e.parent.vnode)&&(e.parent.effect.dirty=!0,tJ(e.parent.update));}).catch(e=>{n(e),u.value=e;}),()=>a.value&&t?np(t,e):u.value&&i?id(i,{error:u.value}):r&&!d.value?id(r):void 0}})},e.defineComponent=nu,e.defineCustomElement=lm,e.defineEmits=function(){return null},e.defineExpose=function(e){},e.defineModel=function(){},e.defineOptions=function(e){},e.defineProps=function(){return null},e.defineSSRCustomElement=(e,t)=>lm(e,t,lK),e.defineSlots=function(){return null},e.devtools=void 0,e.effect=function(e,t){e.effect instanceof ev&&(e=e.effect.fn);let n=new ev(e,h,()=>{n.dirty&&n.run();});t&&(y(n,t),t.scope&&ey(n,t.scope)),t&&t.lazy||n.run();let r=n.run.bind(n);return r.effect=n,r},e.effectScope=function(e){return new eg(e)},e.getCurrentInstance=ik,e.getCurrentScope=function(){return n},e.getTransitionRawChildren=nc,e.guardReactiveProps=ip,e.h=iF,e.handleError=tD,e.hasInjectionContext=function(){return !!(iC||t2||n1)},e.hydrate=lK,e.initCustomFormatter=function(){},e.initDirectivesForSSR=h,e.inject=n3,e.isMemoSame=iD,e.isProxy=tg,e.isReactive=th,e.isReadonly=tf,e.isRef=tk,e.isRuntimeOnly=()=>!s,e.isShallow=tm,e.isVNode=is,e.markRaw=tv,e.mergeDefaults=function(e,t){let n=nj(e);for(let e in t){if(e.startsWith("__skip"))continue;let r=n[e];r?x(r)||E(r)?r=n[e]={type:r,default:t[e]}:r.default=t[e]:null===r&&(r=n[e]={default:t[e]}),r&&t[`__skip_${e}`]&&(r.skipFactory=!0);}return n},e.mergeModels=function(e,t){return e&&t?x(e)&&x(t)?e.concat(t):y({},nj(e),nj(t)):e||t},e.mergeProps=ib,e.nextTick=tG,e.normalizeClass=ei,e.normalizeProps=function(e){if(!e)return null;let{class:t,style:n}=e;return t&&!A(t)&&(e.class=ei(t)),n&&(e.style=Y(n)),e},e.normalizeStyle=Y,e.onActivated=nm,e.onBeforeMount=nx,e.onBeforeUnmount=nw,e.onBeforeUpdate=nk,e.onDeactivated=ng,e.onErrorCaptured=nR,e.onMounted=nC,e.onRenderTracked=nI,e.onRenderTriggered=nN,e.onScopeDispose=function(e){n&&n.cleanups.push(e);},e.onServerPrefetch=nA,e.onUnmounted=nE,e.onUpdated=nT,e.openBlock=r7,e.popScopeId=function(){t3=null;},e.provide=n2,e.proxyRefs=tI,e.pushScopeId=function(e){t3=e;},e.queuePostFlushCb=tQ,e.reactive=tc,e.readonly=td,e.ref=tT,e.registerRuntimeCompiler=iI,e.render=lW,e.renderList=function(e,t,n,r){let i;let l=n&&n[r];if(x(e)||A(e)){i=Array(e.length);for(let n=0,r=e.length;n<r;n++)i[n]=t(e[n],n,void 0,l&&l[n]);}else if("number"==typeof e){i=Array(e);for(let n=0;n<e;n++)i[n]=t(n+1,n,void 0,l&&l[n]);}else if(I(e)){if(e[Symbol.iterator])i=Array.from(e,(e,n)=>t(e,n,void 0,l&&l[n]));else {let n=Object.keys(e);i=Array(n.length);for(let r=0,s=n.length;r<s;r++){let s=n[r];i[r]=t(e[s],s,r,l&&l[r]);}}}else i=[];return n&&(n[r]=i),i},e.renderSlot=function(e,t,n={},r,i){if(t2.isCE||t2.parent&&nd(t2.parent)&&t2.parent.isCE)return "default"!==t&&(n.name=t),id("slot",n,r&&r());let l=e[t];l&&l._c&&(l._d=!1),r7();let s=l&&function e(t){return t.some(t=>!is(t)||!!(t.type!==r4&&(t.type!==r3||e(t.children))))?t:null}(l(n)),o=il(r3,{key:(n.key||s&&s.key||`_${t}`)+(!s&&r?"_fb":"")},s||(r?r():[]),s&&1===e._?64:-2);return !i&&o.scopeId&&(o.slotScopeIds=[o.scopeId+"-s"]),l&&l._c&&(l._d=!0),o},e.resolveComponent=function(e,t){return nM(nO,e,!0,t)||e},e.resolveDirective=function(e){return nM("directives",e)},e.resolveDynamicComponent=function(e){return A(e)?nM(nO,e,!1)||e:e||nL},e.resolveFilter=null,e.resolveTransitionHooks=nl,e.setBlockTracking=ir,e.setDevtoolsHook=h,e.setTransitionHooks=na,e.shallowReactive=tu,e.shallowReadonly=function(e){return tp(e,!0,ez,ti,ta)},e.shallowRef=function(e){return tw(e,!0)},e.ssrContextKey=rM,e.ssrUtils=null,e.stop=function(e){e.effect.stop();},e.toDisplayString=eh,e.toHandlerKey=W,e.toHandlers=function(e,t){let n={};for(let r in e)n[t&&/[A-Z]/.test(r)?`on:${r}`:W(r)]=e[r];return n},e.toRaw=ty,e.toRef=function(e,t,n){return tk(e)?e:E(e)?new tM(e):I(e)&&arguments.length>1?t$(e,t,n):tT(e)},e.toRefs=function(e){let t=x(e)?Array(e.length):{};for(let n in e)t[n]=t$(e,n);return t},e.toValue=function(e){return E(e)?e():tA(e)},e.transformVNodeArgs=function(e){},e.triggerRef=function(e){tC(e,4);},e.unref=tA,e.useAttrs=function(){return nU().attrs},e.useCssModule=function(e="$style"){return d},e.useCssVars=function(e){let t=ik();if(!t)return;let n=t.ut=(n=e(t.proxy))=>{Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach(e=>le(e,n));},r=()=>{let r=e(t.proxy);(function e(t,n){if(128&t.shapeFlag){let r=t.suspense;t=r.activeBranch,r.pendingBranch&&!r.isHydrating&&r.effects.push(()=>{e(r.activeBranch,n);});}for(;t.component;)t=t.component.subTree;if(1&t.shapeFlag&&t.el)le(t.el,n);else if(t.type===r3)t.children.forEach(t=>e(t,n));else if(t.type===r8){let{el:e,anchor:r}=t;for(;e&&(le(e,n),e!==r);)e=e.nextSibling;}})(t.subTree,r),n(r);};nx(()=>{r$(r);}),nC(()=>{let e=new MutationObserver(r);e.observe(t.subTree.el.parentNode,{childList:!0}),nE(()=>e.disconnect());});},e.useModel=function(e,t,n=d){let r=ik(),i=U(t),l=H(t),s=rj(e,t),o=tO((s,o)=>{let a,c;let u=d;return rP(()=>{let n=e[t];K(a,n)&&(a=n,o());}),{get:()=>(s(),n.get?n.get(a):a),set(e){let s=n.set?n.set(e):e;if(!K(s,a)&&!(u!==d&&K(e,u)))return;let p=r.vnode.props;p&&(t in p||i in p||l in p)&&(`onUpdate:${t}` in p||`onUpdate:${i}` in p||`onUpdate:${l}` in p)||(a=e,o()),r.emit(`update:${t}`,s),K(e,s)&&K(e,u)&&!K(s,c)&&o(),u=e,c=s;}}});return o[Symbol.iterator]=()=>{let e=0;return {next:()=>e<2?{value:e++?s||d:o,done:!1}:{done:!0}}},o},e.useSSRContext=()=>{},e.useSlots=function(){return nU().slots},e.useTransitionState=t7,e.vModelCheckbox=lR,e.vModelDynamic={created(e,t,n){lD(e,t,n,null,"created");},mounted(e,t,n){lD(e,t,n,null,"mounted");},beforeUpdate(e,t,n,r){lD(e,t,n,r,"beforeUpdate");},updated(e,t,n,r){lD(e,t,n,r,"updated");}},e.vModelRadio=lL,e.vModelSelect=lM,e.vModelText=lI,e.vShow={beforeMount(e,{value:t},{transition:n}){e[i8]="none"===e.style.display?"":e.style.display,n&&t?n.beforeEnter(e):i9(e,t);},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e);},updated(e,{value:t,oldValue:n},{transition:r}){!t!=!n&&(r?t?(r.beforeEnter(e),i9(e,!0),r.enter(e)):r.leave(e,()=>{i9(e,!1);}):i9(e,t));},beforeUnmount(e,{value:t}){i9(e,t);}},e.version=iV,e.warn=h,e.watch=function(e,t,n){return rD(e,t,n)},e.watchEffect=function(e,t){return rD(e,null,t)},e.watchPostEffect=r$,e.watchSyncEffect=rP,e.withAsyncContext=function(e){let t=ik(),n=e();return iw(),R(n)&&(n=n.catch(e=>{throw iT(t),e})),[n,()=>iT(t)]},e.withCtx=t4,e.withDefaults=function(e,t){return null},e.withDirectives=function(e,t){if(null===t2)return e;let n=iM(t2),r=e.dirs||(e.dirs=[]);for(let e=0;e<t.length;e++){let[i,l,s,o=d]=t[e];i&&(E(i)&&(i={mounted:i,updated:i}),i.deep&&rU(l),r.push({dir:i,instance:n,value:l,oldValue:void 0,arg:s,modifiers:o}));}return e},e.withKeys=(e,t)=>{let n=e._withKeys||(e._withKeys={}),r=t.join(".");return n[r]||(n[r]=n=>{if(!("key"in n))return;let r=H(n.key);if(t.some(e=>e===r||lU[e]===r))return e(n)})},e.withMemo=function(e,t,n,r){let i=n[r];if(i&&iD(i,e))return i;let l=t();return l.memo=e.slice(),l.cacheIndex=r,n[r]=l},e.withModifiers=(e,t)=>{let n=e._withMods||(e._withMods={}),r=t.join(".");return n[r]||(n[r]=(n,...r)=>{for(let e=0;e<t.length;e++){let r=lB[t[e]];if(r&&r(n,t))return}return e(n,...r)})},e.withScopeId=e=>t4,e}({});

    /*!
      * vue-router v4.4.3
      * (c) 2024 Eduardo San Martin Morote
      * @license MIT
      */
    window.VueRouter=function(e,t){const n="undefined"!=typeof document;function r(e){return e.__esModule||"Module"===e[Symbol.toStringTag]}const o=Object.assign;function c(e,t){const n={};for(const r in t){const o=t[r];n[r]=s(o)?o.map(e):e(o);}return n}const a=()=>{},s=Array.isArray,i=/#/g,l=/&/g,u=/\//g,f=/=/g,p=/\?/g,h=/\+/g,d=/%5B/g,m=/%5D/g,g=/%5E/g,v=/%60/g,y=/%7B/g,b=/%7C/g,w=/%7D/g,E=/%20/g;function R(e){return encodeURI(""+e).replace(b,"|").replace(d,"[").replace(m,"]")}function k(e){return R(e).replace(h,"%2B").replace(E,"+").replace(i,"%23").replace(l,"%26").replace(v,"`").replace(y,"{").replace(w,"}").replace(g,"^")}function O(e){return null==e?"":function(e){return R(e).replace(i,"%23").replace(p,"%3F")}(e).replace(u,"%2F")}function j(e){try{return decodeURIComponent(""+e)}catch(e){}return ""+e}const P=/\/$/,C=e=>e.replace(P,"");function x(e,t,n="/"){let r,o={},c="",a="";const s=t.indexOf("#");let i=t.indexOf("?");return s<i&&s>=0&&(i=-1),i>-1&&(r=t.slice(0,i),c=t.slice(i+1,s>-1?s:t.length),o=e(c)),s>-1&&(r=r||t.slice(0,s),a=t.slice(s,t.length)),r=function(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/"),o=r[r.length-1];".."!==o&&"."!==o||r.push("");let c,a,s=n.length-1;for(c=0;c<r.length;c++)if(a=r[c],"."!==a){if(".."!==a)break;s>1&&s--;}return n.slice(0,s).join("/")+"/"+r.slice(c).join("/")}(null!=r?r:t,n),{fullPath:r+(c&&"?")+c+a,path:r,query:o,hash:j(a)}}function $(e,t){return t&&e.toLowerCase().startsWith(t.toLowerCase())?e.slice(t.length)||"/":e}function S(e,t){return (e.aliasOf||e)===(t.aliasOf||t)}function A(e,t){if(Object.keys(e).length!==Object.keys(t).length)return !1;for(const n in e)if(!L(e[n],t[n]))return !1;return !0}function L(e,t){return s(e)?M(e,t):s(t)?M(t,e):e===t}function M(e,t){return s(t)?e.length===t.length&&e.every(((e,n)=>e===t[n])):1===e.length&&e[0]===t}const q={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};var B,T;!function(e){e.pop="pop",e.push="push";}(B||(B={})),function(e){e.back="back",e.forward="forward",e.unknown="";}(T||(T={}));function G(e){if(!e)if(n){const t=document.querySelector("base");e=(e=t&&t.getAttribute("href")||"/").replace(/^\w+:\/\/[^\/]+/,"");}else e="/";return "/"!==e[0]&&"#"!==e[0]&&(e="/"+e),C(e)}const _=/^[^#]+#/;function F(e,t){return e.replace(_,"#")+t}const I=()=>({left:window.scrollX,top:window.scrollY});function W(e){let t;if("el"in e){const n=e.el,r="string"==typeof n&&n.startsWith("#"),o="string"==typeof n?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!o)return;t=function(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return {behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}(o,e);}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(null!=t.left?t.left:window.scrollX,null!=t.top?t.top:window.scrollY);}function D(e,t){return (history.state?history.state.position-t:-1)+e}const K=new Map;let U=()=>location.protocol+"//"+location.host;function V(e,t){const{pathname:n,search:r,hash:o}=t,c=e.indexOf("#");if(c>-1){let t=o.includes(e.slice(c))?e.slice(c).length:1,n=o.slice(t);return "/"!==n[0]&&(n="/"+n),$(n,"")}return $(n,e)+r+o}function H(e,t,n,r=!1,o=!1){return {back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:o?I():null}}function N(e){const t=function(e){const{history:t,location:n}=window,r={value:V(e,n)},c={value:t.state};function a(r,o,a){const s=e.indexOf("#"),i=s>-1?(n.host&&document.querySelector("base")?e:e.slice(s))+r:U()+e+r;try{t[a?"replaceState":"pushState"](o,"",i),c.value=o;}catch(e){console.error(e),n[a?"replace":"assign"](i);}}return c.value||a(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0),{location:r,state:c,push:function(e,n){const s=o({},c.value,t.state,{forward:e,scroll:I()});a(s.current,s,!0),a(e,o({},H(r.value,e,null),{position:s.position+1},n),!1),r.value=e;},replace:function(e,n){a(e,o({},t.state,H(c.value.back,e,c.value.forward,!0),n,{position:c.value.position}),!0),r.value=e;}}}(e=G(e)),n=function(e,t,n,r){let c=[],a=[],s=null;const i=({state:o})=>{const a=V(e,location),i=n.value,l=t.value;let u=0;if(o){if(n.value=a,t.value=o,s&&s===i)return void(s=null);u=l?o.position-l.position:0;}else r(a);c.forEach((e=>{e(n.value,i,{delta:u,type:B.pop,direction:u?u>0?T.forward:T.back:T.unknown});}));};function l(){const{history:e}=window;e.state&&e.replaceState(o({},e.state,{scroll:I()}),"");}return window.addEventListener("popstate",i),window.addEventListener("beforeunload",l,{passive:!0}),{pauseListeners:function(){s=n.value;},listen:function(e){c.push(e);const t=()=>{const t=c.indexOf(e);t>-1&&c.splice(t,1);};return a.push(t),t},destroy:function(){for(const e of a)e();a=[],window.removeEventListener("popstate",i),window.removeEventListener("beforeunload",l);}}}(e,t.state,t.location,t.replace);const r=o({location:"",base:e,go:function(e,t=!0){t||n.pauseListeners(),history.go(e);},createHref:F.bind(null,e)},t,n);return Object.defineProperty(r,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(r,"state",{enumerable:!0,get:()=>t.state.value}),r}function z(e){return "string"==typeof e||"symbol"==typeof e}const Q=Symbol("");var X;function Y(e,t){return o(new Error,{type:e,[Q]:!0},t)}function Z(e,t){return e instanceof Error&&Q in e&&(null==t||!!(e.type&t))}e.NavigationFailureType=void 0,(X=e.NavigationFailureType||(e.NavigationFailureType={}))[X.aborted=4]="aborted",X[X.cancelled=8]="cancelled",X[X.duplicated=16]="duplicated";const J="[^/]+?",ee={sensitive:!1,strict:!1,start:!0,end:!0},te=/[.+*?^${}()[\]/\\]/g;function ne(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++;}return e.length<t.length?1===e.length&&80===e[0]?-1:1:e.length>t.length?1===t.length&&80===t[0]?1:-1:0}function re(e,t){let n=0;const r=e.score,o=t.score;for(;n<r.length&&n<o.length;){const e=ne(r[n],o[n]);if(e)return e;n++;}if(1===Math.abs(o.length-r.length)){if(oe(r))return 1;if(oe(o))return -1}return o.length-r.length}function oe(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const ce={type:0,value:""},ae=/[a-zA-Z0-9_]/;function se(e,t,n){const r=function(e,t){const n=o({},ee,t),r=[];let c=n.start?"^":"";const a=[];for(const t of e){const e=t.length?[]:[90];n.strict&&!t.length&&(c+="/");for(let r=0;r<t.length;r++){const o=t[r];let s=40+(n.sensitive?.25:0);if(0===o.type)r||(c+="/"),c+=o.value.replace(te,"\\$&"),s+=40;else if(1===o.type){const{value:e,repeatable:n,optional:i,regexp:l}=o;a.push({name:e,repeatable:n,optional:i});const u=l||J;if(u!==J){s+=10;try{new RegExp(`(${u})`);}catch(t){throw new Error(`Invalid custom RegExp for param "${e}" (${u}): `+t.message)}}let f=n?`((?:${u})(?:/(?:${u}))*)`:`(${u})`;r||(f=i&&t.length<2?`(?:/${f})`:"/"+f),i&&(f+="?"),c+=f,s+=20,i&&(s+=-8),n&&(s+=-20),".*"===u&&(s+=-50);}e.push(s);}r.push(e);}if(n.strict&&n.end){const e=r.length-1;r[e][r[e].length-1]+=.7000000000000001;}n.strict||(c+="/?"),n.end?c+="$":n.strict&&(c+="(?:/|$)");const i=new RegExp(c,n.sensitive?"":"i");return {re:i,score:r,keys:a,parse:function(e){const t=e.match(i),n={};if(!t)return null;for(let e=1;e<t.length;e++){const r=t[e]||"",o=a[e-1];n[o.name]=r&&o.repeatable?r.split("/"):r;}return n},stringify:function(t){let n="",r=!1;for(const o of e){r&&n.endsWith("/")||(n+="/"),r=!1;for(const e of o)if(0===e.type)n+=e.value;else if(1===e.type){const{value:c,repeatable:a,optional:i}=e,l=c in t?t[c]:"";if(s(l)&&!a)throw new Error(`Provided param "${c}" is an array but it is not repeatable (* or + modifiers)`);const u=s(l)?l.join("/"):l;if(!u){if(!i)throw new Error(`Missing required param "${c}"`);o.length<2&&(n.endsWith("/")?n=n.slice(0,-1):r=!0);}n+=u;}}return n||"/"}}}(function(e){if(!e)return [[]];if("/"===e)return [[ce]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(e){throw new Error(`ERR (${n})/"${l}": ${e}`)}let n=0,r=n;const o=[];let c;function a(){c&&o.push(c),c=[];}let s,i=0,l="",u="";function f(){l&&(0===n?c.push({type:0,value:l}):1===n||2===n||3===n?(c.length>1&&("*"===s||"+"===s)&&t(`A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`),c.push({type:1,value:l,regexp:u,repeatable:"*"===s||"+"===s,optional:"*"===s||"?"===s})):t("Invalid state to consume buffer"),l="");}function p(){l+=s;}for(;i<e.length;)if(s=e[i++],"\\"!==s||2===n)switch(n){case 0:"/"===s?(l&&f(),a()):":"===s?(f(),n=1):p();break;case 4:p(),n=r;break;case 1:"("===s?n=2:ae.test(s)?p():(f(),n=0,"*"!==s&&"?"!==s&&"+"!==s&&i--);break;case 2:")"===s?"\\"==u[u.length-1]?u=u.slice(0,-1)+s:n=3:u+=s;break;case 3:f(),n=0,"*"!==s&&"?"!==s&&"+"!==s&&i--,u="";break;default:t("Unknown state");}else r=n,n=4;return 2===n&&t(`Unfinished custom RegExp for param "${l}"`),f(),a(),o}(e.path),n),c=o(r,{record:e,parent:t,children:[],alias:[]});return t&&!c.record.aliasOf==!t.record.aliasOf&&t.children.push(c),c}function ie(e,t){const n=[],r=new Map;function c(e,n,r){const l=!r,u=function(e){return {path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:ue(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}}}(e);u.aliasOf=r&&r.record;const f=he(t,e),p=[u];if("alias"in e){const t="string"==typeof e.alias?[e.alias]:e.alias;for(const e of t)p.push(o({},u,{components:r?r.record.components:u.components,path:e,aliasOf:r?r.record:u}));}let h,d;for(const t of p){const{path:o}=t;if(n&&"/"!==o[0]){const e=n.record.path;t.path=n.record.path+(o&&("/"===e[e.length-1]?"":"/")+o);}if(h=se(t,n,f),r?r.alias.push(h):(d=d||h,d!==h&&d.alias.push(h),l&&e.name&&!fe(h)&&s(e.name)),de(h)&&i(h),u.children){const e=u.children;for(let t=0;t<e.length;t++)c(e[t],h,r&&r.children[t]);}r=r||h;}return d?()=>{s(d);}:a}function s(e){if(z(e)){const t=r.get(e);t&&(r.delete(e),n.splice(n.indexOf(t),1),t.children.forEach(s),t.alias.forEach(s));}else {const t=n.indexOf(e);t>-1&&(n.splice(t,1),e.record.name&&r.delete(e.record.name),e.children.forEach(s),e.alias.forEach(s));}}function i(e){const t=function(e,t){let n=0,r=t.length;for(;n!==r;){const o=n+r>>1;re(e,t[o])<0?r=o:n=o+1;}const o=function(e){let t=e;for(;t=t.parent;)if(de(t)&&0===re(e,t))return t;return}(e);o&&(r=t.lastIndexOf(o,r-1));return r}(e,n);n.splice(t,0,e),e.record.name&&!fe(e)&&r.set(e.record.name,e);}return t=he({strict:!1,end:!0,sensitive:!1},t),e.forEach((e=>c(e))),{addRoute:c,resolve:function(e,t){let c,a,s,i={};if("name"in e&&e.name){if(c=r.get(e.name),!c)throw Y(1,{location:e});s=c.record.name,i=o(le(t.params,c.keys.filter((e=>!e.optional)).concat(c.parent?c.parent.keys.filter((e=>e.optional)):[]).map((e=>e.name))),e.params&&le(e.params,c.keys.map((e=>e.name)))),a=c.stringify(i);}else if(null!=e.path)a=e.path,c=n.find((e=>e.re.test(a))),c&&(i=c.parse(a),s=c.record.name);else {if(c=t.name?r.get(t.name):n.find((e=>e.re.test(t.path))),!c)throw Y(1,{location:e,currentLocation:t});s=c.record.name,i=o({},t.params,e.params),a=c.stringify(i);}const l=[];let u=c;for(;u;)l.unshift(u.record),u=u.parent;return {name:s,path:a,params:i,matched:l,meta:pe(l)}},removeRoute:s,clearRoutes:function(){n.length=0,r.clear();},getRoutes:function(){return n},getRecordMatcher:function(e){return r.get(e)}}}function le(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function ue(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]="object"==typeof n?n[r]:n;return t}function fe(e){for(;e;){if(e.record.aliasOf)return !0;e=e.parent;}return !1}function pe(e){return e.reduce(((e,t)=>o(e,t.meta)),{})}function he(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}function de({record:e}){return !!(e.name||e.components&&Object.keys(e.components).length||e.redirect)}function me(e){const t={};if(""===e||"?"===e)return t;const n=("?"===e[0]?e.slice(1):e).split("&");for(let e=0;e<n.length;++e){const r=n[e].replace(h," "),o=r.indexOf("="),c=j(o<0?r:r.slice(0,o)),a=o<0?null:j(r.slice(o+1));if(c in t){let e=t[c];s(e)||(e=t[c]=[e]),e.push(a);}else t[c]=a;}return t}function ge(e){let t="";for(let n in e){const r=e[n];if(n=k(n).replace(f,"%3D"),null==r){void 0!==r&&(t+=(t.length?"&":"")+n);continue}(s(r)?r.map((e=>e&&k(e))):[r&&k(r)]).forEach((e=>{void 0!==e&&(t+=(t.length?"&":"")+n,null!=e&&(t+="="+e));}));}return t}function ve(e){const t={};for(const n in e){const r=e[n];void 0!==r&&(t[n]=s(r)?r.map((e=>null==e?null:""+e)):null==r?r:""+r);}return t}const ye=Symbol(""),be=Symbol(""),we=Symbol(""),Ee=Symbol(""),Re=Symbol("");function ke(){let e=[];return {add:function(t){return e.push(t),()=>{const n=e.indexOf(t);n>-1&&e.splice(n,1);}},list:()=>e.slice(),reset:function(){e=[];}}}function Oe(e,n,r){const o=()=>{e[n].delete(r);};t.onUnmounted(o),t.onDeactivated(o),t.onActivated((()=>{e[n].add(r);})),e[n].add(r);}function je(e,t,n,r,o,c=(e=>e())){const a=r&&(r.enterCallbacks[o]=r.enterCallbacks[o]||[]);return ()=>new Promise(((s,i)=>{const l=e=>{var c;!1===e?i(Y(4,{from:n,to:t})):e instanceof Error?i(e):"string"==typeof(c=e)||c&&"object"==typeof c?i(Y(2,{from:t,to:e})):(a&&r.enterCallbacks[o]===a&&"function"==typeof e&&a.push(e),s());},u=c((()=>e.call(r&&r.instances[o],t,n,l)));let f=Promise.resolve(u);e.length<3&&(f=f.then(l)),f.catch((e=>i(e)));}))}function Pe(e,t,n,o,c=(e=>e())){const a=[];for(const i of e)for(const e in i.components){let l=i.components[e];if("beforeRouteEnter"===t||i.instances[e])if("object"==typeof(s=l)||"displayName"in s||"props"in s||"__vccOpts"in s){const r=(l.__vccOpts||l)[t];r&&a.push(je(r,n,o,i,e,c));}else {let s=l();a.push((()=>s.then((a=>{if(!a)return Promise.reject(new Error(`Couldn't resolve component "${e}" at "${i.path}"`));const s=r(a)?a.default:a;i.components[e]=s;const l=(s.__vccOpts||s)[t];return l&&je(l,n,o,i,e,c)()}))));}}var s;return a}function Ce(e){const n=t.inject(we),r=t.inject(Ee),o=t.computed((()=>{const r=t.unref(e.to);return n.resolve(r)})),c=t.computed((()=>{const{matched:e}=o.value,{length:t}=e,n=e[t-1],c=r.matched;if(!n||!c.length)return -1;const a=c.findIndex(S.bind(null,n));if(a>-1)return a;const s=$e(e[t-2]);return t>1&&$e(n)===s&&c[c.length-1].path!==s?c.findIndex(S.bind(null,e[t-2])):a})),i=t.computed((()=>c.value>-1&&function(e,t){for(const n in t){const r=t[n],o=e[n];if("string"==typeof r){if(r!==o)return !1}else if(!s(o)||o.length!==r.length||r.some(((e,t)=>e!==o[t])))return !1}return !0}(r.params,o.value.params))),l=t.computed((()=>c.value>-1&&c.value===r.matched.length-1&&A(r.params,o.value.params)));return {route:o,href:t.computed((()=>o.value.href)),isActive:i,isExactActive:l,navigate:function(r={}){return function(e){if(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)return;if(e.defaultPrevented)return;if(void 0!==e.button&&0!==e.button)return;if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}e.preventDefault&&e.preventDefault();return !0}(r)?n[t.unref(e.replace)?"replace":"push"](t.unref(e.to)).catch(a):Promise.resolve()}}}const xe=t.defineComponent({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:Ce,setup(e,{slots:n}){const r=t.reactive(Ce(e)),{options:o}=t.inject(we),c=t.computed((()=>({[Se(e.activeClass,o.linkActiveClass,"router-link-active")]:r.isActive,[Se(e.exactActiveClass,o.linkExactActiveClass,"router-link-exact-active")]:r.isExactActive})));return ()=>{const o=n.default&&n.default(r);return e.custom?o:t.h("a",{"aria-current":r.isExactActive?e.ariaCurrentValue:null,href:r.href,onClick:r.navigate,class:c.value},o)}}});function $e(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const Se=(e,t,n)=>null!=e?e:null!=t?t:n;function Ae(e,t){if(!e)return null;const n=e(t);return 1===n.length?n[0]:n}const Le=t.defineComponent({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:n,slots:r}){const c=t.inject(Re),a=t.computed((()=>e.route||c.value)),s=t.inject(be,0),i=t.computed((()=>{let e=t.unref(s);const{matched:n}=a.value;let r;for(;(r=n[e])&&!r.components;)e++;return e})),l=t.computed((()=>a.value.matched[i.value]));t.provide(be,t.computed((()=>i.value+1))),t.provide(ye,l),t.provide(Re,a);const u=t.ref();return t.watch((()=>[u.value,l.value,e.name]),(([e,t,n],[r,o,c])=>{t&&(t.instances[n]=e,o&&o!==t&&e&&e===r&&(t.leaveGuards.size||(t.leaveGuards=o.leaveGuards),t.updateGuards.size||(t.updateGuards=o.updateGuards))),!e||!t||o&&S(t,o)&&r||(t.enterCallbacks[n]||[]).forEach((t=>t(e)));}),{flush:"post"}),()=>{const c=a.value,s=e.name,i=l.value,f=i&&i.components[s];if(!f)return Ae(r.default,{Component:f,route:c});const p=i.props[s],h=p?!0===p?c.params:"function"==typeof p?p(c):p:null,d=t.h(f,o({},h,n,{onVnodeUnmounted:e=>{e.component.isUnmounted&&(i.instances[s]=null);},ref:u}));return Ae(r.default,{Component:d,route:c})||d}}});return e.RouterLink=xe,e.RouterView=Le,e.START_LOCATION=q,e.createMemoryHistory=function(e=""){let t=[],n=[""],r=0;function o(e){r++,r!==n.length&&n.splice(r),n.push(e);}const c={location:"",state:{},base:e=G(e),createHref:F.bind(null,e),replace(e){n.splice(r--,1),o(e);},push(e,t){o(e);},listen:e=>(t.push(e),()=>{const n=t.indexOf(e);n>-1&&t.splice(n,1);}),destroy(){t=[],n=[""],r=0;},go(e,o=!0){const c=this.location,a=e<0?T.back:T.forward;r=Math.max(0,Math.min(r+e,n.length-1)),o&&function(e,n,{direction:r,delta:o}){const c={direction:r,delta:o,type:B.pop};for(const r of t)r(e,n,c);}(this.location,c,{direction:a,delta:e});}};return Object.defineProperty(c,"location",{enumerable:!0,get:()=>n[r]}),c},e.createRouter=function(e){const r=ie(e.routes,e),i=e.parseQuery||me,l=e.stringifyQuery||ge,u=e.history,f=ke(),p=ke(),h=ke(),d=t.shallowRef(q);let m=q;n&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const v=c.bind(null,(e=>""+e)),b=c.bind(null,O),E=c.bind(null,j);function k(e,t){if(t=o({},t||d.value),"string"==typeof e){const n=x(i,e,t.path),c=r.resolve({path:n.path},t),a=u.createHref(n.fullPath);return o(n,c,{params:E(c.params),hash:j(n.hash),redirectedFrom:void 0,href:a})}let n;if(null!=e.path)n=o({},e,{path:x(i,e.path,t.path).path});else {const r=o({},e.params);for(const e in r)null==r[e]&&delete r[e];n=o({},e,{params:b(r)}),t.params=b(t.params);}const c=r.resolve(n,t),a=e.hash||"";c.params=v(E(c.params));const s=function(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}(l,o({},e,{hash:(f=a,R(f).replace(y,"{").replace(w,"}").replace(g,"^")),path:c.path}));var f;const p=u.createHref(s);return o({fullPath:s,hash:a,query:l===ge?ve(e.query):e.query||{}},c,{redirectedFrom:void 0,href:p})}function P(e){return "string"==typeof e?x(i,e,d.value.path):o({},e)}function C(e,t){if(m!==e)return Y(8,{from:t,to:e})}function $(e){return M(e)}function L(e){const t=e.matched[e.matched.length-1];if(t&&t.redirect){const{redirect:n}=t;let r="function"==typeof n?n(e):n;return "string"==typeof r&&(r=r.includes("?")||r.includes("#")?r=P(r):{path:r},r.params={}),o({query:e.query,hash:e.hash,params:null!=r.path?{}:e.params},r)}}function M(e,t){const n=m=k(e),r=d.value,c=e.state,a=e.force,s=!0===e.replace,i=L(n);if(i)return M(o(P(i),{state:"object"==typeof i?o({},c,i.state):c,force:a,replace:s}),t||n);const u=n;let f;return u.redirectedFrom=t,!a&&function(e,t,n){const r=t.matched.length-1,o=n.matched.length-1;return r>-1&&r===o&&S(t.matched[r],n.matched[o])&&A(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}(l,r,n)&&(f=Y(16,{to:u,from:r}),te(r,r,!0,!1)),(f?Promise.resolve(f):_(u,r)).catch((e=>Z(e)?Z(e,2)?e:ee(e):J(e,u,r))).then((e=>{if(e){if(Z(e,2))return M(o({replace:s},P(e.to),{state:"object"==typeof e.to?o({},c,e.to.state):c,force:a}),t||u)}else e=U(u,r,!0,s,c);return F(u,r,e),e}))}function T(e,t){const n=C(e,t);return n?Promise.reject(n):Promise.resolve()}function G(e){const t=oe.values().next().value;return t&&"function"==typeof t.runWithContext?t.runWithContext(e):e()}function _(e,t){let n;const[r,o,c]=function(e,t){const n=[],r=[],o=[],c=Math.max(t.matched.length,e.matched.length);for(let a=0;a<c;a++){const c=t.matched[a];c&&(e.matched.find((e=>S(e,c)))?r.push(c):n.push(c));const s=e.matched[a];s&&(t.matched.find((e=>S(e,s)))||o.push(s));}return [n,r,o]}(e,t);n=Pe(r.reverse(),"beforeRouteLeave",e,t);for(const o of r)o.leaveGuards.forEach((r=>{n.push(je(r,e,t));}));const a=T.bind(null,e,t);return n.push(a),ae(n).then((()=>{n=[];for(const r of f.list())n.push(je(r,e,t));return n.push(a),ae(n)})).then((()=>{n=Pe(o,"beforeRouteUpdate",e,t);for(const r of o)r.updateGuards.forEach((r=>{n.push(je(r,e,t));}));return n.push(a),ae(n)})).then((()=>{n=[];for(const r of c)if(r.beforeEnter)if(s(r.beforeEnter))for(const o of r.beforeEnter)n.push(je(o,e,t));else n.push(je(r.beforeEnter,e,t));return n.push(a),ae(n)})).then((()=>(e.matched.forEach((e=>e.enterCallbacks={})),n=Pe(c,"beforeRouteEnter",e,t,G),n.push(a),ae(n)))).then((()=>{n=[];for(const r of p.list())n.push(je(r,e,t));return n.push(a),ae(n)})).catch((e=>Z(e,8)?e:Promise.reject(e)))}function F(e,t,n){h.list().forEach((r=>G((()=>r(e,t,n)))));}function U(e,t,r,c,a){const s=C(e,t);if(s)return s;const i=t===q,l=n?history.state:{};r&&(c||i?u.replace(e.fullPath,o({scroll:i&&l&&l.scroll},a)):u.push(e.fullPath,a)),d.value=e,te(e,t,r,i),ee();}let V;function H(){V||(V=u.listen(((e,t,r)=>{if(!ce.listening)return;const c=k(e),s=L(c);if(s)return void M(o(s,{replace:!0}),c).catch(a);m=c;const i=d.value;var l,f;n&&(l=D(i.fullPath,r.delta),f=I(),K.set(l,f)),_(c,i).catch((e=>Z(e,12)?e:Z(e,2)?(M(e.to,c).then((e=>{Z(e,20)&&!r.delta&&r.type===B.pop&&u.go(-1,!1);})).catch(a),Promise.reject()):(r.delta&&u.go(-r.delta,!1),J(e,c,i)))).then((e=>{(e=e||U(c,i,!1))&&(r.delta&&!Z(e,8)?u.go(-r.delta,!1):r.type===B.pop&&Z(e,20)&&u.go(-1,!1)),F(c,i,e);})).catch(a);})));}let N,Q=ke(),X=ke();function J(e,t,n){ee(e);const r=X.list();return r.length?r.forEach((r=>r(e,t,n))):console.error(e),Promise.reject(e)}function ee(e){return N||(N=!e,H(),Q.list().forEach((([t,n])=>e?n(e):t())),Q.reset()),e}function te(r,o,c,a){const{scrollBehavior:s}=e;if(!n||!s)return Promise.resolve();const i=!c&&function(e){const t=K.get(e);return K.delete(e),t}(D(r.fullPath,0))||(a||!c)&&history.state&&history.state.scroll||null;return t.nextTick().then((()=>s(r,o,i))).then((e=>e&&W(e))).catch((e=>J(e,r,o)))}const ne=e=>u.go(e);let re;const oe=new Set,ce={currentRoute:d,listening:!0,addRoute:function(e,t){let n,o;return z(e)?(n=r.getRecordMatcher(e),o=t):o=e,r.addRoute(o,n)},removeRoute:function(e){const t=r.getRecordMatcher(e);t&&r.removeRoute(t);},clearRoutes:r.clearRoutes,hasRoute:function(e){return !!r.getRecordMatcher(e)},getRoutes:function(){return r.getRoutes().map((e=>e.record))},resolve:k,options:e,push:$,replace:function(e){return $(o(P(e),{replace:!0}))},go:ne,back:()=>ne(-1),forward:()=>ne(1),beforeEach:f.add,beforeResolve:p.add,afterEach:h.add,onError:X.add,isReady:function(){return N&&d.value!==q?Promise.resolve():new Promise(((e,t)=>{Q.add([e,t]);}))},install(e){e.component("RouterLink",xe),e.component("RouterView",Le),e.config.globalProperties.$router=this,Object.defineProperty(e.config.globalProperties,"$route",{enumerable:!0,get:()=>t.unref(d)}),n&&!re&&d.value===q&&(re=!0,$(u.location).catch((e=>{})));const r={};for(const e in q)Object.defineProperty(r,e,{get:()=>d.value[e],enumerable:!0});e.provide(we,this),e.provide(Ee,t.shallowReactive(r)),e.provide(Re,d);const o=e.unmount;oe.add(e),e.unmount=function(){oe.delete(e),oe.size<1&&(m=q,V&&V(),V=null,d.value=q,re=!1,N=!1),o();};}};function ae(e){return e.reduce(((e,t)=>e.then((()=>G(t)))),Promise.resolve())}return ce},e.createRouterMatcher=ie,e.createWebHashHistory=function(e){return (e=location.host?e||location.pathname+location.search:"").includes("#")||(e+="#"),N(e)},e.createWebHistory=N,e.isNavigationFailure=Z,e.loadRouteLocation=function(e){return e.matched.every((e=>e.redirect))?Promise.reject(new Error("Cannot load a route that redirects.")):Promise.all(e.matched.map((e=>e.components&&Promise.all(Object.keys(e.components).reduce(((t,n)=>{const o=e.components[n];return "function"!=typeof o||"displayName"in o||t.push(o().then((t=>{if(!t)return Promise.reject(new Error(`Couldn't resolve component "${n}" at "${e.path}". Ensure you passed a function that returns a promise.`));const o=r(t)?t.default:t;e.components[n]=o;}))),t}),[]))))).then((()=>e))},e.matchedRouteKey=ye,e.onBeforeRouteLeave=function(e){const n=t.inject(ye,{}).value;n&&Oe(n,"leaveGuards",e);},e.onBeforeRouteUpdate=function(e){const n=t.inject(ye,{}).value;n&&Oe(n,"updateGuards",e);},e.parseQuery=me,e.routeLocationKey=Ee,e.routerKey=we,e.routerViewLocationKey=Re,e.stringifyQuery=ge,e.useLink=Ce,e.useRoute=function(e){return t.inject(Ee)},e.useRouter=function(){return t.inject(we)},e.viewDepthKey=be,e}({},Vue);

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

            setHighestZindex(this);
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

            let $this = this;

            this.name = name;
            this.adapter = adapter;
            this.data = adapter.load(name);

            if (!this.data.__ex) {
                this.data.__ex = {}; // expires data container
            }

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
            } catch (e) { }
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

        Store.prototype.get = function (key, def) {

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

        notify(message, status, timeout) {

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
