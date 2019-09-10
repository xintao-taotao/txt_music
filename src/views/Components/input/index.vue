<template>
  <div :class="disabled || zudisabled ? 'disabled input' : 'input'">
    <input
      :type="type"
      v-bind:value="myValue"
      :class="code ? 'codeipt' : null"
      :style="style()"
      v-on:input="myValue = $event.target.value"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :disabled="disabled || zudisabled"
    />
    <div
      v-if="code"
      class="code"
      @click="codeftn()"
      title="点击发送验证码"
    >{{codecount === 0 ? codetxt : codecount}}</div>
  </div>
</template>

<script>
import { phonecode } from "api/user";
export default {
  props: {
    type: {
      type: String,
      default: "text"
    },
    maxlength: {
      type: String
    },
    value: {
      type: String
    },
    placeholder: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    clearval: {
      type: Boolean
    },
    width: {
      type: String
    },
    height: {
      type: String
    },
    code: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      myValue: "",
      time: null,
      codetxt: "发送验证码",
      codecount: 0,
      codetime: null,
      zudisabled: false
    };
  },
  methods: {
    style() {
      if (this.width || this.height) {
        let style = {};
        style["width"] = this.width / 12 + "rem";
        style["height"] = this.height / 12 + "rem";
        return style;
      }
    },
    codeftn() {
      if (this.zudisabled || !this.myValue) {
        return;
      }
      this.zudisabled = true;
      phonecode(this.myValue).then(res => {
        this.codecount = 60;
        this.codetime = setInterval(() => {
          if (this.codecount === 0) {
            clearInterval(this.codetime);
            this.zudisabled = false;
          } else {
            this.codecount = this.codecount - 1;
          }
        }, 1000);
        if (res.code === 200) {
          this.$Notice.open({
            title: "手机验证码发送成功",
            desc: "请注意查收" + this.myValue + "手机号的验证码噢！"
          });
        } else if (res.code === 400) {
          this.$Message.error(res.message);
        }
      });
    },
    clas() {
      if (this.disabled) {
        return "disabled";
      }
    }
  },
  watch: {
    value(newVal) {
      this.myValue = newVal;
    },
    myValue(newVal) {
      this.$emit("input", newVal);
    },
    disabled(newval) {
      if (newVal) {
        this.clas();
      }
    }
  }
};
</script>
<style lang='less' scoped>
@import url("./index.less");
</style>