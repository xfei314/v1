import { n as name } from "./package-f758376c.js";
import { _ as _export_sfc, u as useSystem } from "./index-eb92dc16.js";
const Home_vue_vue_type_style_index_0_scoped_c8133409_lang = "";
await Promise.all([window.__OSL.import("xdp/ui/button"), window.__OSL.import("xdp/ui/message"), window.__OSL.import("xdp/ui/color-picker"), window.__OSL.import("vue")]);
const { Button } = window.__OSL.getModule("xdp/ui/button");
const { Message } = window.__OSL.getModule("xdp/ui/message");
const { ColorPicker } = window.__OSL.getModule("xdp/ui/color-picker");
const { unref: _unref, toDisplayString: _toDisplayString, createElementVNode: _createElementVNode, createTextVNode: _createTextVNode, resolveComponent: _resolveComponent, withCtx: _withCtx, createVNode: _createVNode, vModelText: _vModelText, withDirectives: _withDirectives, openBlock: _openBlock, createElementBlock: _createElementBlock, pushScopeId: _pushScopeId, popScopeId: _popScopeId } = window.__OSL.getModule("vue");
const _withScopeId = (n) => (_pushScopeId("data-v-c8133409"), n = n(), _popScopeId(), n);
const _hoisted_1 = { class: "home" };
const _hoisted_2 = { class: "box" };
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ _createElementVNode("h3", null, "1 动态修改主题色", -1));
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ _createElementVNode("pre", null, /* @__PURE__ */ _toDisplayString(`<input type="color" v-model="color" />`), -1));
const __default__ = {
  components: {
    XButton: Button,
    XColorPicker: ColorPicker
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "Home",
  setup(__props) {
    const { state } = useSystem();
    function onClick1() {
      Message.info("111");
    }
    return (_ctx, _cache) => {
      const _component_x_button = _resolveComponent("x-button");
      const _component_x_color_picker = _resolveComponent("x-color-picker");
      return _openBlock(), _createElementBlock("div", _hoisted_1, [
        _createElementVNode("h1", null, "home - appName: " + _toDisplayString(_unref(name)), 1),
        _createVNode(_component_x_button, null, {
          default: _withCtx(() => [
            _createTextVNode(" default btn ")
          ]),
          _: 1
        }),
        _createVNode(_component_x_button, {
          type: "primary",
          onClick: onClick1
        }, {
          default: _withCtx(() => [
            _createTextVNode(" 主题 ")
          ]),
          _: 1
        }),
        _createElementVNode("div", _hoisted_2, [
          _hoisted_3,
          _hoisted_4,
          _withDirectives(_createElementVNode("input", {
            type: "color",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _unref(state).primaryColor = $event)
          }, null, 512), [
            [_vModelText, _unref(state).primaryColor]
          ]),
          _createVNode(_component_x_color_picker, {
            modelValue: _unref(state).primaryColor,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _unref(state).primaryColor = $event)
          }, null, 8, ["modelValue"]),
          _createElementVNode("h4", null, _toDisplayString(_unref(state).primaryColor), 1)
        ])
      ]);
    };
  }
});
const Home = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c8133409"]]);
export {
  Home as default
};
