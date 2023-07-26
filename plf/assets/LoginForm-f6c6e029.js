await Promise.all([window.__OSL.import("xdp/ui/button"),window.__OSL.import("xdp/ui/message"),window.__OSL.import("xdp/ui/form"),window.__OSL.import("xdp/ui/input"),window.__OSL.import("vue")]);const{Button:g}=window.__OSL.getModule("xdp/ui/button");window.__OSL.getModule("xdp/ui/message");const{FormItem:f}=window.__OSL.getModule("xdp/ui/form"),{Form:x}=window.__OSL.getModule("xdp/ui/form"),{InputPassword:L}=window.__OSL.getModule("xdp/ui/input"),{Input:S}=window.__OSL.getModule("xdp/ui/input"),{reactive:O}=window.__OSL.getModule("vue"),{resolveComponent:n,createVNode:o,withCtx:d,createTextVNode:r,createElementVNode:b,openBlock:V,createBlock:v}=window.__OSL.getModule("vue"),M={class:"btn"},h={components:{XForm:x,XFormItem:f,XInput:S,XInputPassword:L,XButton:g}},F=Object.assign(h,{__name:"LoginForm",props:{loading:Boolean},emits:["close","submit"],setup(B,{emit:_}){const a={account:[{required:!0,message:"账户名必填"},{minLength:2,message:"至少需要两个字"}],password:[{required:!0,message:"密码必填",trigger:["change","input"]},{minLength:5,message:"至少需要5字符",trigger:["change","input"]}]},t=O({account:"admin",password:"666666"}),m=({values:s,errors:e})=>{console.log("values:",s,`
errors:`,e),!e&&_("submit",s)};return(s,e)=>{const p=n("x-input"),i=n("x-form-item"),c=n("x-input-password"),l=n("x-button"),w=n("x-form");return V(),v(w,{class:"login-form",rules:a,model:t,"label-width":0,ref:"formRef",onSubmit:m},{default:d(()=>[o(i,{field:"account"},{default:d(()=>[o(p,{modelValue:t.account,"onUpdate:modelValue":e[0]||(e[0]=u=>t.account=u),"allow-clear":"",placeholder:"请输入账户名"},null,8,["modelValue"])]),_:1}),o(i,{field:"password"},{default:d(()=>[o(c,{modelValue:t.password,"onUpdate:modelValue":e[1]||(e[1]=u=>t.password=u),"allow-clear":"",placeholder:"请输入密码"},null,8,["modelValue"])]),_:1}),b("div",M,[o(l,{type:"primary","html-type":"submit"},{default:d(()=>[r("登录")]),_:1}),o(l,{onClick:e[2]||(e[2]=u=>s.$refs.formRef.resetFields())},{default:d(()=>[r("清除")]),_:1})])]),_:1},8,["model"])}}});export{F as default};
