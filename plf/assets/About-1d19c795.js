import{_}from"./index-6fca0100.js";await Promise.all([window.__OSL.import("vue")]);const{ref:n}=window.__OSL.getModule("vue"),{createElementVNode:t,toDisplayString:o,vModelText:p,withDirectives:v,createTextVNode:M,createStaticVNode:i,openBlock:c,createElementBlock:m,pushScopeId:g,popScopeId:f}=window.__OSL.getModule("vue"),e=d=>(g("data-v-52f53a22"),d=d(),f(),d),h={class:"about"},x=e(()=>t("h1",null,"about ",-1)),q=e(()=>t("h2",null,"h5 原生标签",-1)),S={class:"box"},b=e(()=>t("h3",null,"1 点击选择颜色",-1)),k=e(()=>t("pre",null,o('<input type="color" v-model="color" />'),-1)),w=e(()=>t("h3",null,"1.2 日期",-1)),y=e(()=>t("pre",null,o('<input type="date" v-model="date" />'),-1)),V=e(()=>t("h3",null,"1.3 range 范围选择",-1)),I=e(()=>t("pre",null,o('<input type="range" v-model="range" />'),-1)),N=i('<div class="box" data-v-52f53a22><h3 data-v-52f53a22>2 使用 &lt;meter&gt; 标签测量给定范围内的数据。</h3><pre data-v-52f53a22>&lt;p&gt;指定最大10 占用2&lt;/p&gt;</pre><pre data-v-52f53a22>&lt;meter value=&quot;0.7&quot;&gt;70%&lt;/meter&gt;</pre><pre data-v-52f53a22>&lt;p&gt;直接占用总长70%&lt;/p&gt;</pre><pre data-v-52f53a22>&lt;meter value=&quot;2&quot; min=&quot;0&quot; max=&quot;10&quot;&gt;2/10&lt;/meter&gt;</pre><p data-v-52f53a22>指定最大10 占用2</p><meter value="0" min="-10" max="10" data-v-52f53a22></meter><p data-v-52f53a22>直接占用总长70%</p><meter value="0.7" data-v-52f53a22></meter></div><div class="box" data-v-52f53a22><h3 data-v-52f53a22>3 使用 &lt;progress&gt; 进度条</h3><pre data-v-52f53a22>&lt;progress value=&quot;22&quot; max=&quot;100&quot;&gt;&lt;/progress&gt;</pre><progress value="22" max="100" data-v-52f53a22></progress></div><div class="box" data-v-52f53a22><h3 data-v-52f53a22>4 使用 &lt;mark&gt;mark文本&lt;/mark&gt; 标签定义带有记号的文本 </h3> 普通文本 <mark data-v-52f53a22>mark文本</mark></div><div class="box" data-v-52f53a22></div>',4),B={__name:"About",setup(d){const r=n(""),u=n(null),s=n(null);return(D,a)=>(c(),m("div",h,[x,q,t("div",S,[b,k,v(t("input",{type:"color","onUpdate:modelValue":a[0]||(a[0]=l=>r.value=l)},null,512),[[p,r.value]]),t("h4",null,o(r.value),1),w,y,v(t("input",{type:"date","onUpdate:modelValue":a[1]||(a[1]=l=>u.value=l)},null,512),[[p,u.value]]),t("h4",null,o(u.value),1),V,I,v(t("input",{type:"range","onUpdate:modelValue":a[2]||(a[2]=l=>s.value=l)},null,512),[[p,s.value]]),t("h4",null,o(s.value),1)]),N]))}},T=_(B,[["__scopeId","data-v-52f53a22"]]);export{T as default};
