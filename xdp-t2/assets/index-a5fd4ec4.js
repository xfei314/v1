const c="xdp-t2",E="modulepreload",x=function(t,o){return new URL(t,o).href},m={},s=function(o,r,i){if(!r||r.length===0)return o();const p=document.getElementsByTagName("link");return Promise.all(r.map(e=>{if(e=x(e,i),e in m)return;m[e]=!0;const n=e.endsWith(".css"),v=n?'[rel="stylesheet"]':"";if(!!i)for(let l=p.length-1;l>=0;l--){const u=p[l];if(u.href===e&&(!n||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${v}`))return;const a=document.createElement("link");if(a.rel=n?"stylesheet":E,n||(a.as="script",a.crossOrigin=""),a.href=e,document.head.appendChild(a),n)return new Promise((l,u)=>{a.addEventListener("load",l),a.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>o()).catch(e=>{const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=e,window.dispatchEvent(n),!n.defaultPrevented)throw e})},w=[{path:"/xdp-t2/about",name:"xdp-t2.About",component:()=>s(()=>import("./About-613e0914.js"),["./About-613e0914.js","./About-0f4d6838.css"],import.meta.url),children:[{path:"/xdp-t2/about/echarts",name:"xdp-t2.About.echarts",component:()=>s(()=>import("./echarts-39ad245e.js"),["./echarts-39ad245e.js","./debounce-cfb0e9ed.js","./echarts-9f71bb28.css"],import.meta.url)},{path:"/xdp-t2/about/index",name:"xdp-t2.About.index",component:()=>s(()=>import("./index-517c19f7.js"),[],import.meta.url)}],redirect:"/xdp-t2/about/index"},{path:"/xdp-t2/echart",name:"xdp-t2.Echart",component:()=>s(()=>import("./Echart-1e480dc5.js"),["./Echart-1e480dc5.js","./debounce-cfb0e9ed.js","./echarts-9f71bb28.css"],import.meta.url)},{path:"/xdp-t2/home",name:"xdp-t2.Home",component:()=>s(()=>import("./Home-ca319d27.js"),["./Home-ca319d27.js","./Home-8f3c2858.css"],import.meta.url)}];await Promise.all([window.__OSL.import("vue")]);const{unref:A,resolveComponent:L,openBlock:R,createBlock:P}=window.__OSL.getModule("vue"),k={__name:"App",setup(t){return(o,r)=>{const i=L("router-view");return R(),P(i,{"data-tip":A(c)},null,8,["data-tip"])}}},d=Object.assign({"./locale/en_US.js":()=>s(()=>import("./en_US-7703b89e.js"),[],import.meta.url),"./locale/zh_CN.js":()=>s(()=>import("./zh_CN-df2a6da3.js"),[],import.meta.url)});function f(t){t!=="en_US"&&(t="zh_CN");const o=`/${t}.js`;let r=null;for(const i in d)i.endsWith(o)&&(r=d[i]);return r?r():(console.error(`app load lang error :${t} is not find !`),f("en_US"))}const y=async t=>(await f(t)).default;let _=`/${c}/home`;const h=[{name:c,component:k,children:w},{path:`/${c}`,redirect:_},{path:`/${c}/`,redirect:_}];async function b(){return console.log("initApp curRoutes",h),{appName:c,defaultUrl:_,i18n:y,routes:h}}export{b as default,c as n};
