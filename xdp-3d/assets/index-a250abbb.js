const c="xdp-3d",E="modulepreload",w=function(t,o){return new URL(t,o).href},d={},a=function(o,r,i){if(!r||r.length===0)return o();const p=document.getElementsByTagName("link");return Promise.all(r.map(e=>{if(e=w(e,i),e in d)return;d[e]=!0;const n=e.endsWith(".css"),v=n?'[rel="stylesheet"]':"";if(!!i)for(let l=p.length-1;l>=0;l--){const _=p[l];if(_.href===e&&(!n||_.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${v}`))return;const s=document.createElement("link");if(s.rel=n?"stylesheet":E,n||(s.as="script",s.crossOrigin=""),s.href=e,document.head.appendChild(s),n)return new Promise((l,_)=>{s.addEventListener("load",l),s.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>o()).catch(e=>{const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=e,window.dispatchEvent(n),!n.defaultPrevented)throw e})},x=[{path:"/xdp-3d/about",component:()=>a(()=>import("./About-bff629e5.js"),["./About-bff629e5.js","./About-0f4d6838.css"],import.meta.url),children:[{path:"/xdp-3d/about/echarts",name:"xdp-3d.About.echarts",component:()=>a(()=>import("./echarts-6e793fae.js"),["./echarts-6e793fae.js","./echarts-9f71bb28.css"],import.meta.url)},{path:"/xdp-3d/about",name:"xdp-3d.About.index",component:()=>a(()=>import("./index-71f21942.js"),[],import.meta.url)}]},{path:"/xdp-3d/cesium",name:"xdp-3d.Cesium",component:()=>a(()=>import("./Cesium-c8e71f8a.js"),["./Cesium-c8e71f8a.js","./Cesium-d5524a39.css"],import.meta.url)},{path:"/xdp-3d/home",name:"xdp-3d.Home",component:()=>a(()=>import("./Home-9e656fd6.js"),["./Home-9e656fd6.js","./Home-8f3c2858.css"],import.meta.url)}];await Promise.all([window.__OSL.import("vue")]);const{unref:L,resolveComponent:R,openBlock:A,createBlock:P}=window.__OSL.getModule("vue"),k={__name:"App",setup(t){return(o,r)=>{const i=R("router-view");return A(),P(i,{"data-tip":L(c)},null,8,["data-tip"])}}},m=Object.assign({"./locale/en_US.js":()=>a(()=>import("./en_US-7703b89e.js"),[],import.meta.url),"./locale/zh_CN.js":()=>a(()=>import("./zh_CN-df2a6da3.js"),[],import.meta.url)});function f(t){t!=="en_US"&&(t="zh_CN");const o=`/${t}.js`;let r=null;for(const i in m)i.endsWith(o)&&(r=m[i]);return r?r():(console.error(`app load lang error :${t} is not find !`),f("en_US"))}const y=async t=>(await f(t)).default;let u=`/${c}/home`;const h=[{name:c,component:k,children:x},{path:`/${c}`,redirect:u},{path:`/${c}/`,redirect:u}];async function g(){return console.log("initApp curRoutes",h),{appName:c,defaultUrl:u,i18n:y,routes:h}}export{a as _,g as default,c as n};
