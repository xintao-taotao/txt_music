<template>
  <div class="_alert" v-show="visible">
    <div class="wind-alert">
      <div class="wind-alert-bg"></div>
      <div class="wind-alert-dialog animate-scale">
        <div class="wind-alert-title">{{title}}</div>
        <div class="wind-alert-content">{{content}}</div>
        <div class="wind-alert-btn">
          <div v-if="type == 'prompt'">
            <button v-for="(item,index) in btn" :key="index" :class="index == 0 ? 'info' : 'error'" @click="btns(index)">{{item}}{{index}}</button>
          </div>
          <button v-else class="info_btn">{{btn}}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "rule_alert",
  data() {
    return {
      title: "提示",
      content: "",
      btn: "确定",
      visible: false,
      type: ''
    };
  },
  methods: {
    close() {
      this.visible = false;
      this._promise && this._promise.resolve();
    },
    btns(index){
      this.$emit(index == 0 ? 'ok' : 'cancel');
    }
  },
  watch: {
    $route() {
      this.close();
    }
  }
};
</script>
<style>
@import url('./index.less');
</style>