var _JUPYTERLAB;(()=>{"use strict";var e,r,t,n,a,o,i,l,u,f,d,s,p,c,h,b,m,v,y,g,w,j,S={510:(e,r,t)=>{var n={"./index":()=>Promise.all([t.e(33),t.e(568)]).then((()=>()=>t(568))),"./extension":()=>Promise.all([t.e(33),t.e(568)]).then((()=>()=>t(568))),"./style":()=>t.e(747).then((()=>()=>t(747)))},a=(e,r)=>(t.R=r,r=t.o(n,e)?n[e]():Promise.resolve().then((()=>{throw new Error('Module "'+e+'" does not exist in container.')})),t.R=void 0,r),o=(e,r)=>{if(t.S){var n="default",a=t.S[n];if(a&&a!==e)throw new Error("Container initialization failed as it has already been initialized with a different share scope");return t.S[n]=e,t.I(n,r)}};t.d(r,{get:()=>a,init:()=>o})}},P={};function k(e){var r=P[e];if(void 0!==r)return r.exports;var t=P[e]={id:e,exports:{}};return S[e](t,t.exports,k),t.exports}k.m=S,k.c=P,k.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return k.d(r,{a:r}),r},k.d=(e,r)=>{for(var t in r)k.o(r,t)&&!k.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},k.f={},k.e=e=>Promise.all(Object.keys(k.f).reduce(((r,t)=>(k.f[t](e,r),r)),[])),k.u=e=>e+"."+{33:"93b7ce4fb39a95e5c4e7",568:"9b1d0788e8cf75baac0e",624:"906c8c55901302b471ad",747:"7a87cf8473f689e3eff7",948:"884778afa392a8e978ea"}[e]+".js?v="+{33:"93b7ce4fb39a95e5c4e7",568:"9b1d0788e8cf75baac0e",624:"906c8c55901302b471ad",747:"7a87cf8473f689e3eff7",948:"884778afa392a8e978ea"}[e],k.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),k.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),e={},r="amperityfrontend:",k.l=(t,n,a,o)=>{if(e[t])e[t].push(n);else{var i,l;if(void 0!==a)for(var u=document.getElementsByTagName("script"),f=0;f<u.length;f++){var d=u[f];if(d.getAttribute("src")==t||d.getAttribute("data-webpack")==r+a){i=d;break}}i||(l=!0,(i=document.createElement("script")).charset="utf-8",i.timeout=120,k.nc&&i.setAttribute("nonce",k.nc),i.setAttribute("data-webpack",r+a),i.src=t),e[t]=[n];var s=(r,n)=>{i.onerror=i.onload=null,clearTimeout(p);var a=e[t];if(delete e[t],i.parentNode&&i.parentNode.removeChild(i),a&&a.forEach((e=>e(n))),r)return r(n)},p=setTimeout(s.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=s.bind(null,i.onerror),i.onload=s.bind(null,i.onload),l&&document.head.appendChild(i)}},k.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{k.S={};var e={},r={};k.I=(t,n)=>{n||(n=[]);var a=r[t];if(a||(a=r[t]={}),!(n.indexOf(a)>=0)){if(n.push(a),e[t])return e[t];k.o(k.S,t)||(k.S[t]={});var o=k.S[t],i="amperityfrontend",l=(e,r,t,n)=>{var a=o[e]=o[e]||{},l=a[r];(!l||!l.loaded&&(!n!=!l.eager?n:i>l.from))&&(a[r]={get:t,from:i,eager:!!n})},u=[];return"default"===t&&(l("@retrolab/application","0.3.21",(()=>Promise.all([k.e(948),k.e(624),k.e(33)]).then((()=>()=>k(948))))),l("amperityfrontend","0.1.10",(()=>Promise.all([k.e(33),k.e(568)]).then((()=>()=>k(568)))))),e[t]=u.length?Promise.all(u).then((()=>e[t]=1)):1}}})(),(()=>{var e;k.g.importScripts&&(e=k.g.location+"");var r=k.g.document;if(!e&&r&&(r.currentScript&&(e=r.currentScript.src),!e)){var t=r.getElementsByTagName("script");t.length&&(e=t[t.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),k.p=e})(),t=e=>{var r=e=>e.split(".").map((e=>+e==e?+e:e)),t=/^([^-+]+)?(?:-([^+]+))?(?:\+(.+))?$/.exec(e),n=t[1]?r(t[1]):[];return t[2]&&(n.length++,n.push.apply(n,r(t[2]))),t[3]&&(n.push([]),n.push.apply(n,r(t[3]))),n},n=(e,r)=>{e=t(e),r=t(r);for(var n=0;;){if(n>=e.length)return n<r.length&&"u"!=(typeof r[n])[0];var a=e[n],o=(typeof a)[0];if(n>=r.length)return"u"==o;var i=r[n],l=(typeof i)[0];if(o!=l)return"o"==o&&"n"==l||"s"==l||"u"==o;if("o"!=o&&"u"!=o&&a!=i)return a<i;n++}},a=e=>{var r=e[0],t="";if(1===e.length)return"*";if(r+.5){t+=0==r?">=":-1==r?"<":1==r?"^":2==r?"~":r>0?"=":"!=";for(var n=1,o=1;o<e.length;o++)n--,t+="u"==(typeof(l=e[o]))[0]?"-":(n>0?".":"")+(n=2,l);return t}var i=[];for(o=1;o<e.length;o++){var l=e[o];i.push(0===l?"not("+u()+")":1===l?"("+u()+" || "+u()+")":2===l?i.pop()+" "+i.pop():a(l))}return u();function u(){return i.pop().replace(/^\((.+)\)$/,"$1")}},o=(e,r)=>{if(0 in e){r=t(r);var n=e[0],a=n<0;a&&(n=-n-1);for(var i=0,l=1,u=!0;;l++,i++){var f,d,s=l<e.length?(typeof e[l])[0]:"";if(i>=r.length||"o"==(d=(typeof(f=r[i]))[0]))return!u||("u"==s?l>n&&!a:""==s!=a);if("u"==d){if(!u||"u"!=s)return!1}else if(u)if(s==d)if(l<=n){if(f!=e[l])return!1}else{if(a?f>e[l]:f<e[l])return!1;f!=e[l]&&(u=!1)}else if("s"!=s&&"n"!=s){if(a||l<=n)return!1;u=!1,l--}else{if(l<=n||d<s!=a)return!1;u=!1}else"s"!=s&&"n"!=s&&(u=!1,l--)}}var p=[],c=p.pop.bind(p);for(i=1;i<e.length;i++){var h=e[i];p.push(1==h?c()|c():2==h?c()&c():h?o(h,r):!c())}return!!c()},i=(e,r)=>{var t=k.S[e];if(!t||!k.o(t,r))throw new Error("Shared module "+r+" doesn't exist in shared scope "+e);return t},l=(e,r)=>{var t=e[r];return(r=Object.keys(t).reduce(((e,r)=>!e||n(e,r)?r:e),0))&&t[r]},u=(e,r)=>{var t=e[r];return Object.keys(t).reduce(((e,r)=>!e||!t[e].loaded&&n(e,r)?r:e),0)},f=(e,r,t,n)=>"Unsatisfied version "+t+" from "+(t&&e[r][t].from)+" of shared singleton module "+r+" (required "+a(n)+")",d=(e,r,t,n)=>{var a=u(e,t);return o(n,a)||"undefined"!=typeof console&&console.warn&&console.warn(f(e,t,a,n)),h(e[t][a])},s=(e,r,t)=>{var a=e[r];return(r=Object.keys(a).reduce(((e,r)=>!o(t,r)||e&&!n(e,r)?e:r),0))&&a[r]},p=(e,r,t,n)=>{var o=e[t];return"No satisfying version ("+a(n)+") of shared module "+t+" found in shared scope "+r+".\nAvailable versions: "+Object.keys(o).map((e=>e+" from "+o[e].from)).join(", ")},c=(e,r,t,n)=>{"undefined"!=typeof console&&console.warn&&console.warn(p(e,r,t,n))},h=e=>(e.loaded=1,e.get()),m=(b=e=>function(r,t,n,a){var o=k.I(r);return o&&o.then?o.then(e.bind(e,r,k.S[r],t,n,a)):e(r,k.S[r],t,n,a)})(((e,r,t,n)=>(i(e,t),h(s(r,t,n)||c(r,e,t,n)||l(r,t))))),v=b(((e,r,t,n)=>(i(e,t),d(r,0,t,n)))),y=b(((e,r,t,n,a)=>{var o=r&&k.o(r,t)&&s(r,t,n);return o?h(o):a()})),g={},w={33:()=>v("default","@jupyterlab/apputils",[1,3,6,3]),123:()=>v("default","@jupyterlab/notebook",[1,3,6,3]),135:()=>m("default","@jupyterlab/outputarea",[1,3,6,3]),834:()=>y("default","@retrolab/application",[2,0,3,21],(()=>Promise.all([k.e(948),k.e(624)]).then((()=>()=>k(948))))),986:()=>v("default","@jupyterlab/docmanager",[1,3,6,3]),86:()=>v("default","@jupyterlab/rendermime",[1,3,6,3]),142:()=>v("default","@jupyterlab/coreutils",[1,5,6,3]),169:()=>v("default","@jupyterlab/translation",[1,3,6,3]),502:()=>v("default","@jupyterlab/ui-components",[1,3,6,3]),526:()=>v("default","@lumino/coreutils",[1,1,11,0]),658:()=>v("default","@lumino/properties",[1,1,8,0]),687:()=>v("default","@jupyterlab/application",[1,3,6,3]),720:()=>v("default","@lumino/messaging",[1,1,10,0]),819:()=>m("default","@jupyterlab/docregistry",[1,3,6,3]),832:()=>v("default","@lumino/widgets",[1,1,37,2]),840:()=>v("default","@lumino/signaling",[1,1,10,0]),918:()=>v("default","@lumino/algorithm",[1,1,9,0]),923:()=>v("default","@lumino/disposable",[1,1,10,0])},j={33:[33],568:[123,135,834,986],624:[86,142,169,502,526,658,687,720,819,832,840,918,923]},k.f.consumes=(e,r)=>{k.o(j,e)&&j[e].forEach((e=>{if(k.o(g,e))return r.push(g[e]);var t=r=>{g[e]=0,k.m[e]=t=>{delete k.c[e],t.exports=r()}},n=r=>{delete g[e],k.m[e]=t=>{throw delete k.c[e],r}};try{var a=w[e]();a.then?r.push(g[e]=a.then(t).catch(n)):t(a)}catch(e){n(e)}}))},(()=>{var e={469:0};k.f.j=(r,t)=>{var n=k.o(e,r)?e[r]:void 0;if(0!==n)if(n)t.push(n[2]);else if(/^(33|624)$/.test(r))e[r]=0;else{var a=new Promise(((t,a)=>n=e[r]=[t,a]));t.push(n[2]=a);var o=k.p+k.u(r),i=new Error;k.l(o,(t=>{if(k.o(e,r)&&(0!==(n=e[r])&&(e[r]=void 0),n)){var a=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;i.message="Loading chunk "+r+" failed.\n("+a+": "+o+")",i.name="ChunkLoadError",i.type=a,i.request=o,n[1](i)}}),"chunk-"+r,r)}};var r=(r,t)=>{var n,a,[o,i,l]=t,u=0;if(o.some((r=>0!==e[r]))){for(n in i)k.o(i,n)&&(k.m[n]=i[n]);l&&l(k)}for(r&&r(t);u<o.length;u++)a=o[u],k.o(e,a)&&e[a]&&e[a][0](),e[a]=0},t=self.webpackChunkamperityfrontend=self.webpackChunkamperityfrontend||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})(),k.nc=void 0;var E=k(510);(_JUPYTERLAB=void 0===_JUPYTERLAB?{}:_JUPYTERLAB).amperityfrontend=E})();