<template>
  <div class="div">
    <div class="div_content">
      <div class="div_right">
        <img src="../../images/div_right_img.png" />
      </div>
      <div class="div_left">
        <div class="login">
          <div class="login_ctn">
            <transition-group name="slide-phone">
              <div
                class="login_phone"
                v-show="loginstatus && registered == false && forget == false"
                key="1"
              >
                <h5>登录</h5>
                <p>请使用您本人的手机密码登录</p>
                <div class="login_from">
                  <Tinput
                    v-model="userloginphone"
                    type="number"
                    @input="iptuserphone(userloginphone)"
                    placeholder="请输入您的手机号"
                  ></Tinput>
                  <Tinput v-model="loginphonepwd" type="password" placeholder="请输入您的密码"></Tinput>
                  <div class="login_a">
                    <button @click="loginstatus = false">邮箱登录</button>
                    <a @click="forget = true">忘记密码？</a>
                  </div>
                  <button class="login_btn" @click="phonelogin()">登录</button>
                  <p class="no_login">
                    <a @click="registered = true">没有账号？去注册</a>
                  </p>
                </div>
              </div>
            </transition-group>
            <transition-group name="slide-email" key="2">
              <div
                class="login_email"
                v-show="!loginstatus && registered == false && forget == false"
                key="2"
              >
                <h5>登录</h5>
                <p>请使用您本人的邮箱密码登录</p>
                <div class="login_from">
                  <Tinput
                    v-model="userloginemail"
                    type="text"
                    @input="iptuseremail(userloginemail)"
                    placeholder="请输入您的邮箱"
                  ></Tinput>
                  <Tinput v-model="loginemailpwd" type="password" placeholder="请输入您的密码"></Tinput>
                  <div class="login_a">
                    <button @click="loginstatus = true">手机号登录</button>
                    <a @click="forget = true">忘记密码？</a>
                  </div>
                  <button class="login_btn" @click="emaillogin()">登录</button>
                  <p class="no_login">
                    <a @click="registered = true">没有账号？去注册</a>
                  </p>
                </div>
              </div>
            </transition-group>
            <transition-group name="slide-registered" key="3">
              <div class="login_registered" v-show="registered || forget" key="3">
                <h5>{{registered ? '注册' : (forget ? '找回密码' : '注册')}}</h5>
                <p>{{registered ? '请使用手机号注册' : (forget ? '请输入您的手机号，以及验证码(暂不支持邮箱修改密码！)' : '请使用手机号注册')}}</p>
                <div class="login_from">
                  <Tinput
                    v-model="userphone"
                    type="number"
                    @input="iptuserphone(userphone)"
                    placeholder="请输入您的手机号"
                  ></Tinput>
                  <Tinput v-model="userpwd" type="password" placeholder="请输入您的密码"></Tinput>
                  <div class="login_a">
                    <button @click="checktab()">手机号登录</button>
                    <button @click="checkyou()">邮箱登录</button>
                  </div>
                  <button class="login_btn" @click="login()">{{registered ? '注册' : '找回密码'}}</button>
                  <p class="no_login">
                    <a @click="checktab()">已有账号？去登陆</a>
                  </p>
                </div>
              </div>
            </transition-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isphone, isemail, setToken } from "utils/utils";
import { phonelogin, loginstatus, userdata, emaillogin } from "api/user";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      userloginphone: "",
      loginphonepwd: "",
      userloginemail: "",
      loginemailpwd: "",
      userphone: "",
      userpwd: "",
      forget: false,
      loginstatus: true,
      registered: false
    };
  },
  methods: {
    iptuserphone(values) {
      if (!isphone(values)) {
        // 弹出请输入正确格式的手机号的提示
        console.log("弹出请输入正确格式的手机号的提示");
      }
    },
    checktab() {
      this.registered = false;
      this.forget = false;
      this.loginstatus = true;
    },
    checkyou() {
      this.registered = false;
      this.forget = false;
      this.loginstatus = false;
    },
    emaillogin() {
      if (this.userloginemail) {
        emaillogin(this.userloginemail, this.loginemailpwd).then(res => {
          console.log(res);
        });
      } else {
        console.log("请填写邮箱");
      }
    },
    login() {
      phonelogin("18974661429", "xintao792883583").then(res => {
        console.log(res);
        console.log(document.cookie);
      });
      setTimeout(() => {
        loginstatus().then(res => {
          console.log(res);
        });
      }, 5000);
    },
    phonelogin() {
      if (this.userloginphone) {
        phonelogin(this.userloginphone, this.loginphonepwd).then(res => {
          let data = res.data;
          let binding = JSON.parse(data.bindings[1].tokenJsonStr);
          console.log(binding);
          setToken(binding.access_token);
          setTimeout(() => {
            userdata().then(res => {
              console.log(res);
            });
          }, 3000);
        });
      } else {
        console.log("请填写手机号");
      }
    },
    iptuseremail(item) {
      if (item) {
        // 弹出请填写邮箱的提示
        console.log("弹出请填写邮箱的提示");
        if (!isemail(item)) {
          // 弹出请输入正确格式的邮箱的提示
          console.log("弹出请输入正确格式的邮箱的提示");
        }
      }
    }
  }
};
</script>
<style lang='less' scoped>
@import url("./index.less");
</style>