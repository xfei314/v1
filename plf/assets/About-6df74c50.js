import { n as name } from "./package-f758376c.js";
import { _ as _export_sfc } from "./index-eb92dc16.js";
const About_vue_vue_type_style_index_0_scoped_310eefa1_lang = "";
await Promise.all([window.__OSL.import("vue")]);
const { ref } = window.__OSL.getModule("vue");
const { unref: _unref, toDisplayString: _toDisplayString, createElementVNode: _createElementVNode, vModelText: _vModelText, withDirectives: _withDirectives, createTextVNode: _createTextVNode, createStaticVNode: _createStaticVNode, openBlock: _openBlock, createElementBlock: _createElementBlock, pushScopeId: _pushScopeId, popScopeId: _popScopeId } = window.__OSL.getModule("vue");
const _withScopeId = (n) => (_pushScopeId("data-v-310eefa1"), n = n(), _popScopeId(), n);
const _hoisted_1 = { class: "about" };
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ _createElementVNode("h2", null, "h5 原生标签", -1));
const _hoisted_3 = { class: "box" };
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ _createElementVNode("h3", null, "1 点击选择颜色", -1));
const _hoisted_5 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ _createElementVNode("pre", null, /* @__PURE__ */ _toDisplayString(`<input type="color" v-model="color" />`), -1));
const _hoisted_6 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ _createElementVNode("h3", null, "1.2 日期", -1));
const _hoisted_7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ _createElementVNode("pre", null, /* @__PURE__ */ _toDisplayString(`<input type="date" v-model="date" />`), -1));
const _hoisted_8 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ _createElementVNode("h3", null, "1.3 range 范围选择", -1));
const _hoisted_9 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ _createElementVNode("pre", null, /* @__PURE__ */ _toDisplayString(`<input type="range" v-model="range" />`), -1));
const _hoisted_10 = /* @__PURE__ */ _createStaticVNode('<div class="box" data-v-310eefa1><h3 data-v-310eefa1>2 使用 &lt;meter&gt; 标签测量给定范围内的数据。</h3><pre data-v-310eefa1>&lt;p&gt;指定最大10 占用2&lt;/p&gt;</pre><pre data-v-310eefa1>&lt;meter value=&quot;0.7&quot;&gt;70%&lt;/meter&gt;</pre><pre data-v-310eefa1>&lt;p&gt;直接占用总长70%&lt;/p&gt;</pre><pre data-v-310eefa1>&lt;meter value=&quot;2&quot; min=&quot;0&quot; max=&quot;10&quot;&gt;2/10&lt;/meter&gt;</pre><p data-v-310eefa1>指定最大10 占用2</p><meter value="0" min="-10" max="10" data-v-310eefa1></meter><p data-v-310eefa1>直接占用总长70%</p><meter value="0.7" data-v-310eefa1></meter></div><div class="box" data-v-310eefa1><h3 data-v-310eefa1>3 使用 &lt;progress&gt; 进度条</h3><pre data-v-310eefa1>&lt;progress value=&quot;22&quot; max=&quot;100&quot;&gt;&lt;/progress&gt;</pre><progress value="22" max="100" data-v-310eefa1></progress></div><div class="box" data-v-310eefa1><h3 data-v-310eefa1>4 使用 &lt;mark&gt;mark文本&lt;/mark&gt; 标签定义带有记号的文本 </h3> 普通文本 <mark data-v-310eefa1>mark文本</mark></div><div class="box" data-v-310eefa1></div>', 4);
const _sfc_main = {
  __name: "About",
  setup(__props) {
    const color = ref("");
    const date = ref(null);
    const range = ref(null);
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("div", _hoisted_1, [
        _createElementVNode("h1", null, "about - appName: " + _toDisplayString(_unref(name)), 1),
        _hoisted_2,
        _createElementVNode("div", _hoisted_3, [
          _hoisted_4,
          _hoisted_5,
          _withDirectives(_createElementVNode("input", {
            type: "color",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => color.value = $event)
          }, null, 512), [
            [_vModelText, color.value]
          ]),
          _createElementVNode("h4", null, _toDisplayString(color.value), 1),
          _hoisted_6,
          _hoisted_7,
          _withDirectives(_createElementVNode("input", {
            type: "date",
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => date.value = $event)
          }, null, 512), [
            [_vModelText, date.value]
          ]),
          _createElementVNode("h4", null, _toDisplayString(date.value), 1),
          _hoisted_8,
          _hoisted_9,
          _withDirectives(_createElementVNode("input", {
            type: "range",
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => range.value = $event)
          }, null, 512), [
            [_vModelText, range.value]
          ]),
          _createElementVNode("h4", null, _toDisplayString(range.value), 1)
        ]),
        _hoisted_10
      ]);
    };
  }
};
const About = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-310eefa1"]]);
export {
  About as default
};
