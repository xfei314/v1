const AppMenu_vue_vue_type_style_index_0_lang = "";
await Promise.all([window.__OSL.import("vue")]);
const { createElementVNode: _createElementVNode, renderList: _renderList, Fragment: _Fragment, openBlock: _openBlock, createElementBlock: _createElementBlock, toDisplayString: _toDisplayString } = window.__OSL.getModule("vue");
const { reactive } = window.__OSL.getModule("vue");
const _hoisted_1 = /* @__PURE__ */ _createElementVNode("div", { class: "aside" }, [
  /* @__PURE__ */ _createElementVNode("div", { class: "common-apps" }, "常用应用"),
  /* @__PURE__ */ _createElementVNode("div", { class: "favorites-menu" }, "收藏菜单")
], -1);
const _hoisted_2 = { class: "content" };
const _hoisted_3 = /* @__PURE__ */ _createElementVNode("div", { class: "header" }, null, -1);
const _hoisted_4 = { class: "app-list" };
const _hoisted_5 = { class: "title" };
const _sfc_main = {
  __name: "AppMenu",
  setup(__props) {
    const data = reactive({
      appList: [
        {
          name: "f1",
          title: "分类1",
          apps: [
            { name: "xt1", title: "子产品1", href: "" },
            { name: "xt2", title: "子产品2", href: "" },
            { name: "xt3", title: "子产品3", href: "" }
          ]
        },
        {
          name: "f2",
          title: "分类2",
          apps: [
            { name: "xt21", title: "子产品21", href: "" },
            { name: "xt22", title: "子产品22", href: "" },
            { name: "xt23", title: "子产品23", href: "" }
          ]
        }
      ]
    });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock(_Fragment, null, [
        _hoisted_1,
        _createElementVNode("div", _hoisted_2, [
          _hoisted_3,
          _createElementVNode("div", _hoisted_4, [
            (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(data.appList, (item) => {
              return _openBlock(), _createElementBlock("div", {
                key: item.name,
                class: "app-item"
              }, [
                _createElementVNode("div", _hoisted_5, _toDisplayString(item.title), 1),
                (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(item.apps, (appItem) => {
                  return _openBlock(), _createElementBlock("div", {
                    key: appItem.name
                  }, _toDisplayString(appItem.title), 1);
                }), 128))
              ]);
            }), 128))
          ])
        ])
      ], 64);
    };
  }
};
export {
  _sfc_main as default
};
