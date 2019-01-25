<template>
  <div class="login" :style="style">
    <transition name="list">
      <div class="login_content" v-if="status=='phone'">
        <div class="login_headers">手机号登录</div>
        <el-input v-model="userphone" placeholder="请输入您的手机号" type="text" class="user"></el-input>
        <el-input v-model="userpwd" placeholder="请输入您的密码" type="password" class="user"></el-input>
        <div class="placeholder_fonts">
          <a href="">注册账号</a>
          <div style="cursor:pointer;" @click="status='email'">邮箱登录</div>
          <a href="">找回密码</a>
        </div>
        <tbutton long title="登录" @isclick="login('phone')"></tbutton>
      </div>
    </transition>
    <transition name="list">
      <div class="login_content" v-if="status=='email'">
        <div class="login_headers">邮箱登录</div>
        <el-input v-model="useremail" placeholder="请输入您的邮箱" type="text" class="user"></el-input>
        <el-input v-model="userpwd" placeholder="请输入您的密码" type="password" class="user"></el-input>
        <div class="placeholder_fonts">
          <a href="">注册账号</a>
          <div style="cursor:pointer;" @click="status='phone'">手机登录</div>
          <a href="">找回密码</a>
        </div>
        <tbutton long title="登录" @isclick="login('email')"></tbutton>
      </div>
    </transition>
  </div>
</template>

<script>
import {login_phone, login_email} from 'api/login'
import {goPageByPath} from '../public/util'
export default {
  data () {
    return {
      height:document.documentElement.clientHeight + "px",
      status:'phone',
      userpwd:'',
      userphone:'',
      useremail:''
    };
  },
  computed:{
    style(){
      let style = {
        height:this.height
      };
      return style;
    }
  },
  created(){
    console.log(this.$store.getters.getcolor);
    window.addEventListener("resize", this.resizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeHandler);
  },
  methods:{
    resizeHandler(){
      this.height = document.documentElement.clientHeight + "px";
    },
    login(type){
      if(type=='phone'){
        if(this.userphone=='' || this.userpwd==''){
          this.$alert('请填写手机号或者密码！', '警告', {
            confirmButtonText: '确定'
          });
        }else{
          login_phone(this.userphone,this.userpwd).then(({data,status})=>{
            if(status===200){
              localStorage.setItem('cookie',data.account.id);
              this.userpwd='';
              this.userphone='';
              goPageByPath('/home');
            }
          })
        }
      }else if(type=='email'){
        if(!this.useremail || !this.userpwd){
          this.$alert('请填写邮箱或者密码！', '警告', {
            confirmButtonText: '确定'
          });
        }else{
          login_email().then(({data,status})=>{
            if(status===200){
              localStorage.setItem('cookie',data.account.id);
              this.userpwd='';
              this.useremail='';
              goPageByPath('/home');
            }
          })
        }
      }
    }
  },
}

</script>
<style lang='less' scoped>
@import url('./login.less');
</style>