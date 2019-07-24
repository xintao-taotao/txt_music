<template>
  <div class="div">
    <div class="div_content">
      <div class="div_left">
        <div class="login">
          <h5>登录</h5>
          <p></p>
          <div class="login_ctn">
            <Tinput v-model="userphone" type='number' @input="iptverification()"></Tinput>
          </div>
        </div>
        <div class="registered"></div>
      </div>
      <div class="div_right"></div>
    </div>
  </div>
</template>

<script>
import { isphone } from "utils/utils";
export default {
  data() {
    return {
      userphone: ""
    };
  },
  methods: {
    iptverification() {
      if (!this.userphone) {
        // 弹出请填写手机号的提示
        console.log('弹出请填写手机号的提示');
        if (!isphone(this.userphone)) {
          // 弹出请输入正确格式的手机号的提示
          console.log('弹出请输入正确格式的手机号的提示');
        }
      }
    }
  }
};
</script>
<style lang='less' scoped>
@import url("./index.less");
</style>