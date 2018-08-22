<template>
  <Layout class="music" :style="{height:music_width}">
    <Sider hide-trigger class="music_left">
      <div class="xinxi" v-if="deLogin" :style="{backgroundImage: 'url(' + userbackgroundurl + ')'}">
        <img :src="useravatarurl" :alt="username" style="width:60px;" class="user_title_img">
        <Button type="primary" @click="clearlocal(1)" class="tuichu">退出</Button>
        <h5>{{username}}</h5>
      </div>
      <div class="deLogin" v-else>
        <Form :model="formInline" :rules="ruleInline">
          <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="手机号">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="密码">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem style="text-align:center;">
            <Button type="primary" @click="handleSubmit">登录</Button>
          </FormItem>
        </Form>
      </div>
    </Sider>
    <Layout>
      <Header>Header</Header>
      <Content>Content</Content>
    </Layout>
  </Layout>
</template>

<script>
import util from '../../mutu/mutu.js'
import axios from 'axios'
import Aplayer from 'vue-aplayer'
Aplayer.disableVersionBadge = true
export default {
  data () {
    return {
      music_width:0,
      userid:0,
      deLogin:false,
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [
          { required: true, message: '请填写您的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写您的密码', trigger: 'blur' }
        ]
      },
      username:'',
      userbackgroundurl:'',
      useravatarurl:''
    };
  },
  created(){
    this.music_width = `${document.documentElement.clientHeight}px`;
    util.vue = this;
    util.title(this.$t("projectName") + "-" + this.$t("music_page"));
    if(this.userid!=0||localStorage.getItem('userid')!=null){
      axios.get('http://localhost:3000/user/detail?uid='+localStorage.getItem('userid')+'')
      .then(rep=>{
        this.deLogin=true;
        this.user_onxinxi(rep.data)
      })
    }
    let that=this;
    setTimeout(function(){
      that.clearlocal();
    },10800000);
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.music_width = `${document.documentElement.clientHeight}px`;
        that.music_width = window.music_width;
      })();
    };
  },
  watch: {
    music_width(val) {
      if (!this.timer) {
        this.music_width = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          that.timer = false;
        }, 400);
      }
    }
  },
  methods:{
    handleSubmit(){
      axios.get('http://localhost:3000/login/cellphone?phone='+this.formInline.user+'&password='+this.formInline.password+'')
      .then(rep=>{
        let data=rep.data
        this.deLogin=true;
        this.userid=data.account.id;
        localStorage.setItem('userid',this.userid);
        axios.get('http://localhost:3000/user/detail?uid='+this.userid+'')
        .then(rep=>{
          var data=rep.data;
          this.user_onxinxi(data)
        })
      })
    },
    clearlocal(item){
      if(item==1){
        localStorage.removeItem('userid');
        this.deLogin=false;
        util.success("退出成功！请重新登录！");
        return
      }else if(document.hidden==true&&(document.visibilityState=='hidden'||document.visibilityState=='prerender')){
        util.error("您的登录状态已过期，请重新登录！");
        localStorage.removeItem('userid');
        this.deLogin=false;
        return;
      }
    },
    user_onxinxi(data){
      this.username=data.profile.nickname;
      this.useravatarurl=data.profile.avatarUrl;
      this.userbackgroundurl=data.profile.backgroundUrl;
    }
  }
}

</script>
<style lang='less' scoped>
@import url('./index.less');
</style>