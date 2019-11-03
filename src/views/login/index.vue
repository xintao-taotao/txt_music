<template>
  <div class="div">
    <div class="div_content">
      <div class="div_right">
        <img src="../../images/div_right_img.png" />
      </div>
      <div class="div_left">
        <div class="login">
          <div class="login_ctn">
            <transition-group name="slide-phone" tag="ul">
              <div
                class="login_phone"
                v-show="loginstatus && registered == false && forget == false"
                key="1"
              >
                <h5>登录</h5>
                <p>请使用您本人的手机密码登录</p>
                <div class="login_from">
                  <div class="error_input">
                    <transition-group name="error">
                      <p class="error_fonts" v-show="phonestatus" key="4">请输入正确格式的手机号</p>
                    </transition-group>
                    <Tinput
                      v-model="userloginphone"
                      type="number"
                      @input="iptuserphone(userloginphone)"
                      placeholder="请输入您的手机号"
                    ></Tinput>
                  </div>
                  <p>
                    <Tinput v-model="loginphonepwd" type="password" placeholder="请输入您的密码"></Tinput>
                  </p>
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
            <transition-group name="slide-email" key="2" tag="ul">
              <div
                class="login_email"
                v-show="!loginstatus && registered == false && forget == false"
                key="2"
              >
                <h5>登录</h5>
                <p>请使用您本人的邮箱密码登录</p>
                <div class="login_from">
                  <div class="error_input">
                    <transition-group name="error">
                      <p class="error_fonts" v-show="emailstatus" key="5">请输入正确格式的邮箱</p>
                    </transition-group>
                    <Tinput
                      v-model="userloginemail"
                      type="text"
                      @input="iptuseremail(userloginemail)"
                      placeholder="请输入您的邮箱"
                    ></Tinput>
                  </div>
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
            <transition-group name="slide-registered" key="3" tag="ul">
              <div class="login_registered" v-show="registered || forget" key="3">
                <h5>{{registered ? '注册' : (forget ? '找回密码' : '注册')}}</h5>
                <p>{{registered ? '请使用手机号注册' : (forget ? '请输入您的手机号，以及验证码(暂不支持邮箱修改密码！)' : '请使用手机号注册')}}</p>
                <div class="login_from">
                  <Tinput v-model="username" type="text" placeholder="请输入您的昵称" v-if="!forget"></Tinput>
                  <div class="error_input">
                    <transition-group name="error">
                      <p class="error_fonts" v-show="zhuphonestatus" key="6">请输入正确格式的手机号</p>
                    </transition-group>
                    <Tinput
                      v-model="userphone"
                      type="number"
                      @input="zhuiptuserphone(userphone)"
                      placeholder="请输入您的手机号"
                      :code="true"
                    ></Tinput>
                  </div>
                  <Tinput
                    v-model="userpcode"
                    type="number"
                    placeholder="请输入手机验证码"
                    @input="phonecode()"
                  ></Tinput>
                  <Tinput
                    v-model="retrieveuserpwd"
                    type="password"
                    placeholder="请输入新的密码"
                    v-if="forget"
                  ></Tinput>
                  <Tinput
                    v-model="isretrieveuserpwd"
                    type="password"
                    placeholder="请再次输入新的密码"
                    v-if="forget"
                  ></Tinput>
                  <Tinput v-model="userpwd" type="password" placeholder="请输入您的密码" v-if="!forget"></Tinput>
                  <Tinput
                    v-model="isuserpwd"
                    type="password"
                    placeholder="请再次输入您的密码"
                    v-if="!forget"
                  ></Tinput>
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
import { isemail, setToken, goPageByPath } from "utils/utils";
import {
  phonelogin,
  loginstatus,
  userdata,
  emaillogin,
  isregistered,
  iscode,
  registerphone,
  retrevepassword
} from "api/user";
import { setTimeout, clearTimeout } from "timers";
import { isphone } from "utils/utils";
import Talert from "../Components/talert/index";
let messagetimeout;
export default {
  data() {
    return {
      userloginphone: "",
      loginphonepwd: "",
      userloginemail: "",
      loginemailpwd: "",
      userphone: "",
      userpwd: "",
      isuserpwd: "",
      username: "",
      userpcode: "",
      retrieveuserpwd: "",
      isretrieveuserpwd: "",
      forget: false,
      loginstatus: true,
      registered: false,
      phonestatus: false,
      emailstatus: false,
      zhuphonestatus: false,
      iscodestatus: false,
      temporarycount: 0
    };
  },
  mounted() {
    window.onresize = () => {
      let width = document.documentElement.clientWidth;
    };
  },
  methods: {
    checktab() {
      this.registered = false;
      this.forget = false;
      this.loginstatus = true;
    },
    phonecode() {
      if (this.registered) {
        /** 注册 */
        if (this.userpcode != "" && this.userphone != "") {
          if (this.userpcode.length >= 4) {
            iscode({
              phone: this.userphone,
              captcha: this.userpcode
            }).then(res => {
              if (res.code !== 200) {
                this.$Message.error("验证码错误！");
              } else {
                this.iscodestatus = true;
              }
            });
          }
        }
      } else {
        /** 找回密码 */
        if (this.userphone != "" && this.userpcode != "") {
          if (this.userpcode.length >= 4) {
            iscode({
              phone: this.userphone,
              captcha: this.userpcode
            }).then(res => {
              if (res.code !== 200) {
                this.$Message.error("验证码错误！");
              } else {
                this.iscodestatus = true;
              }
            });
          }
        }
      }
    },
    zhuiptuserphone(newVal) {
      if (!isphone(newVal)) {
        this.zhuphonestatus = true;
      } else {
        this.zhuphonestatus = false;
      }
      if (!this.forget) {
        if (newVal.length === 11) {
          isregistered(newVal).then(res => {
            if (res.data.code === 200) {
              if (res.data.exist === 1) {
                this.$Message.info("账号已经注册，请直接登录噢！");
                messagetimeout = setTimeout(() => {
                  this.userloginphone = newVal;
                  this.userphone = "";
                  this.userpwd = "";
                  this.registered = false;
                  this.forget = false;
                  this.loginstatus = true;
                  clearTimeout(messagetimeout);
                }, 2000);
              }
            }
          });
        }
      }
    },
    iptuserphone(newVal) {
      if (!isphone(newVal)) {
        this.phonestatus = true;
      } else {
        this.phonestatus = false;
      }
      if (newVal.length === 11) {
        isregistered(newVal).then(res => {
          if (res.data.code === 200) {
            if (res.data.exist != 1) {
              this.$Message.info("此号码未注册，请注册后再登录噢！");
              messagetimeout = setTimeout(() => {
                this.userphone = newVal;
                this.userloginphone = "";
                this.registered = true;
                clearTimeout(messagetimeout);
              }, 2000);
            }
          }
        });
      }
    },
    checkyou() {
      this.registered = false;
      this.forget = false;
      this.loginstatus = false;
    },
    emaillogin() {
      if (this.userloginemail != "" && this.loginemailpwd != "") {
        emaillogin(this.userloginemail, this.loginemailpwd).then(res => {
          if (res.data.code === 200) {
            let data = res.data;
            let binding = JSON.parse(data.account.id);
            setToken(binding);
            this.$Message.success("登录成功！");
            goPageByPath("/");
          } else {
            this.$Message.error();
            return;
          }
        });
      } else {
        this.$Message.error("请填写邮箱和密码！");
      }
    },
    login() {
      if (this.registered) {
        /** 注册 */
        if (this.username == "") {
          this.$Message.error("请输入您的昵称！");
          return;
        }
        if (this.userphone == "") {
          this.$Message.error("请输入您的手机号！");
          return;
        }
        if (this.userpcode == "") {
          this.$Message.error("请输入您的手机验证码！");
          return;
        }
        if (this.userpwd == "" || this.isuserpwd == "") {
          this.$Message.error("请输入您的密码！");
          return;
        }
        if (this.userpwd !== this.isuserpwd) {
          this.$Message.error("两次密码不一致，请检查！");
          return;
        }
        if (!this.iscodestatus) {
          this.$Message.error("手机验证码错误，请检查！");
          return;
        }
        registerphone({
          phone: this.userphone,
          password: this.userpwd,
          captcha: this.userpcode,
          nickname: this.username
        }).then(res => {
          if (res.data && res.data.code === 200) {
            let data = res.data;
            let binding = JSON.parse(data.account.id);
            setToken(binding);
            this.$Message.success("注册成功！");
            goPageByPath("/");
          } else if (res.code === 505) {
            this.$Message.error(res.message);
            return;
          }
        });
      } else {
        /** 找回密码 */
        if (this.userphone == "") {
          this.$Message.error("请输入手机号码！");
          return;
        }
        if (this.userpcode == "") {
          this.$Message.error("请输入手机验证码！");
          return;
        }
        if (this.retrieveuserpwd == "" || this.isretrieveuserpwd == "") {
          this.$Message.error("请输入您的新密码！");
          return;
        }
        if (this.retrieveuserpwd !== this.isretrieveuserpwd) {
          this.$Message.error("两次密码不一致！请检查！");
          return;
        }
        retrevepassword({
          phone: this.userphone,
          captcha: this.userpcode,
          password: this.retrieveuserpwd
        }).then(res => {
          if (res.data.code === 200) {
            this.$Message.success("修改密码成功！");
            this.userloginphone = this.userphone;
            this.registered = false;
            this.forget = false;
            this.loginstatus = true;
            this.userphone = "";
            this.userpcode = "";
            this.retrieveuserpwd = "";
            this.isretrieveuserpwd = "";
          }
        });
      }
    },
    phonelogin() {
      if (this.userloginphone != "" && this.loginphonepwd != "") {
        if (!isphone(this.userloginphone)) {
          this.$Message.error("请输入正确格式的手机号");
        } else {
          phonelogin(this.userloginphone, this.loginphonepwd).then(res => {
            if (res.code == 200) {
              let data = res.data;
              let binding = JSON.parse(data.account.id);
              setToken(binding);
              this.$Message.success("登录成功！");
              goPageByPath("/");
            } else {
              this.$Message.error(res.data.message);
              return;
            }
          });
        }
      } else {
        this.$Message.error("请输入手机号和密码！");
      }
    },
    iptuseremail(item) {
      if (item != "") {
        if (!isemail(item)) {
          this.emailstatus = true;
        } else {
          this.emailstatus = false;
        }
      }
    }
  }
};
</script>
<style lang='less' scoped>
@import url("./index.less");
</style>