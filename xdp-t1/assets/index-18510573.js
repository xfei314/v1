import{n as s}from"./index-bd206cee.js";await Promise.all([window.__OSL.import("xdp/ui/button"),window.__OSL.import("xdp/ui/grid"),window.__OSL.import("xdp/ui/input"),window.__OSL.import("xdp/ui/date-picker"),window.__OSL.import("xdp/ui/pagination"),window.__OSL.import("xdp/ui/color-picker"),window.__OSL.import("vue")]);const{Button:V}=window.__OSL.getModule("xdp/ui/button"),{Col:L}=window.__OSL.getModule("xdp/ui/grid"),{Row:S}=window.__OSL.getModule("xdp/ui/grid"),{Input:f}=window.__OSL.getModule("xdp/ui/input"),{DatePicker:C}=window.__OSL.getModule("xdp/ui/date-picker"),{Pagination:b}=window.__OSL.getModule("xdp/ui/pagination"),{ColorPicker:M}=window.__OSL.getModule("xdp/ui/color-picker"),{ref:u}=window.__OSL.getModule("vue"),{createTextVNode:m,resolveComponent:n,unref:w,withCtx:l,createVNode:e,openBlock:P,createElementBlock:X}=window.__OSL.getModule("vue"),B={class:"about-index"},$={components:{XButton:V,XRow:S,XCol:L,XColorPicker:M,XInput:f,XDatePicker:C,XPagination:b}},j=Object.assign($,{__name:"index",setup(N){const d=u(""),a=u(1),p=u(""),_=u(null);return(r,o)=>{const c=n("x-button"),x=n("x-color-picker"),i=n("x-col"),g=n("x-input"),k=n("x-date-picker"),v=n("x-row"),O=n("x-pagination");return P(),X("div",B,[e(c,{onClick:o[0]||(o[0]=t=>r.$router.push({path:`/${w(s)}/home`}))},{default:l(()=>[m("goto home")]),_:1}),e(c,{onClick:o[1]||(o[1]=t=>r.$router.push({path:`/${w(s)}/about/echarts`}))},{default:l(()=>[m("goto about-echarts")]),_:1}),e(v,{gutter:10},{default:l(()=>[e(i,{span:6},{default:l(()=>[e(x,{modelValue:d.value,"onUpdate:modelValue":o[2]||(o[2]=t=>d.value=t)},null,8,["modelValue"])]),_:1}),e(i,{span:6},{default:l(()=>[e(g,{modelValue:p.value,"onUpdate:modelValue":o[3]||(o[3]=t=>p.value=t)},null,8,["modelValue"])]),_:1}),e(i,{span:6},{default:l(()=>[e(k,{modelValue:_.value,"onUpdate:modelValue":o[4]||(o[4]=t=>_.value=t)},null,8,["modelValue"])]),_:1})]),_:1}),e(O,{modelValue:a.value,"onUpdate:modelValue":o[5]||(o[5]=t=>a.value=t),total:36,"show-jumper":"","max-page-btn":5},null,8,["modelValue"])])}}});export{j as default};
