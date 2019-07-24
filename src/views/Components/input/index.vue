<template>
  <div class="input">
    <input
      :type="type"
      v-bind:value="myValue"
      :class="clas()"
      :style="style()"
      v-on:input="myValue = $event.target.value"
      :placeholder="placeholder"
      :disabled="disabled"
    />
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "text"
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
    }
  },
  data() {
    return {
      myValue: "",
      time: null
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
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.timer = null;
          this.$emit("input", newVal);
        }, 200);
      }
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