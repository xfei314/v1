const LoginForm_vue_vue_type_style_index_0_lang = "";
await Promise.all([window.__OSL.import("xdp/ui/button"), window.__OSL.import("xdp/ui/message"), window.__OSL.import("xdp/ui/form"), window.__OSL.import("xdp/ui/input"), window.__OSL.import("vue")]);
const { Button } = window.__OSL.getModule("xdp/ui/button");
window.__OSL.getModule("xdp/ui/message");
const { FormItem } = window.__OSL.getModule("xdp/ui/form");
const { Form } = window.__OSL.getModule("xdp/ui/form");
const { InputPassword } = window.__OSL.getModule("xdp/ui/input");
const { Input } = window.__OSL.getModule("xdp/ui/input");
const { reactive } = window.__OSL.getModule("vue");
const { resolveComponent: _resolveComponent, createVNode: _createVNode, withCtx: _withCtx, createTextVNode: _createTextVNode, createElementVNode: _createElementVNode, openBlock: _openBlock, createBlock: _createBlock } = window.__OSL.getModule("vue");
const _hoisted_1 = { class: "btn" };
const __default__ = {
  components: {
    XForm: Form,
    XFormItem: FormItem,
    XInput: Input,
    XInputPassword: InputPassword,
    XButton: Button
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "LoginForm",
  props: {
    loading: Boolean
  },
  emits: ["close", "submit"],
  setup(__props, { emit }) {
    const rules = {
      account: [
        { required: true, message: "账户名必填" },
        {
          minLength: 2,
          message: "至少需要两个字"
        }
      ],
      password: [
        { required: true, message: "密码必填", trigger: ["change", "input"] },
        {
          minLength: 5,
          message: "至少需要5字符",
          trigger: ["change", "input"]
        }
      ]
    };
    const formData = reactive({
      account: "admin",
      password: "666666"
    });
    const handleSubmit = ({ values, errors }) => {
      console.log("values:", values, "\nerrors:", errors);
      if (errors) {
        return;
      }
      emit("submit", values);
    };
    return (_ctx, _cache) => {
      const _component_x_input = _resolveComponent("x-input");
      const _component_x_form_item = _resolveComponent("x-form-item");
      const _component_x_input_password = _resolveComponent("x-input-password");
      const _component_x_button = _resolveComponent("x-button");
      const _component_x_form = _resolveComponent("x-form");
      return _openBlock(), _createBlock(_component_x_form, {
        class: "login-form",
        rules,
        model: formData,
        "label-width": 0,
        ref: "formRef",
        onSubmit: handleSubmit
      }, {
        default: _withCtx(() => [
          _createVNode(_component_x_form_item, { field: "account" }, {
            default: _withCtx(() => [
              _createVNode(_component_x_input, {
                modelValue: formData.account,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => formData.account = $event),
                "allow-clear": "",
                placeholder: "请输入账户名"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          _createVNode(_component_x_form_item, { field: "password" }, {
            default: _withCtx(() => [
              _createVNode(_component_x_input_password, {
                modelValue: formData.password,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => formData.password = $event),
                "allow-clear": "",
                placeholder: "请输入密码"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          _createElementVNode("div", _hoisted_1, [
            _createVNode(_component_x_button, {
              type: "primary",
              "html-type": "submit"
            }, {
              default: _withCtx(() => [
                _createTextVNode("登录")
              ]),
              _: 1
            }),
            _createVNode(_component_x_button, {
              onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$refs.formRef.resetFields())
            }, {
              default: _withCtx(() => [
                _createTextVNode("清除")
              ]),
              _: 1
            })
          ])
        ]),
        _: 1
      }, 8, ["model"]);
    };
  }
});
export {
  _sfc_main as default
};
