<template>
  <transition name="alert">
    <div class="_alert" v-show="visible">
      <div class="wind-alert">
        <div class="wind-alert-bg"></div>
        <div class="wind-alert-dialog animate-scale">
          <div class="wind-alert-title">{{title}}</div>
          <div class="wind-alert-content">{{text}}</div>
          <div class="wind-alert-btn">
            <div v-if="type === 'medal'">
              <button
                v-for="(item,index) in btn"
                :key="index"
                :class="index == 0 ? 'info' : 'error'"
                @click="btns(index)"
              >{{item}}{{index}}</button>
            </div>
            <button v-else-if="type === 'info' " class="info_btn" @click="close()">{{btn}}</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { stringify } from "querystring";
import { setTimeout } from "timers";
export default {
  name: "rule_alert",
  props: {
    text: {
      type: String
    },
    title: {
      type: String,
      default: "标题"
    },
    type: {
      type: String,
      default: "info"
    },
    btn: {
      type: String,
      default: "确定"
    }
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    close() {
        this.visible = false;
    },
    btns(index) {
      this.$emit(index == 0 ? "ok" : "cancel");
      this.visible();
    },
    show() {
      this.exitcss = {};
      this.visible = true;
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
@import url("./index.less");
</style>