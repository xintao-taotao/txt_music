<template>
  <div class="music_footer" :style="{width:music_width}">
    <div class="music_icon_left">
      <p></p>
    </div>
    <div style="margin:auto;width:1300px;height:100%;" v-show="state">
      <div class="music_content">
        <audio id="audio" controls="controls" :src="music_url" autoplay v-show="false"></audio>
        <div class="musci_title_img">
          <img :src="img_title" :alt="img_alt" width="70px">
        </div>
        <div class="music_jindu">
          <div class="music_jindu_title">
            <Icon type="md-skip-backward" @click="on_click_music(2)" title="上一首" style="cursor:pointer;" size="24"/>
            <Icon type="ios-square" v-if="music_state" size="24" style="cursor:pointer;" @click="on_bofang(1)" title="暂停"/>
            <Icon type="md-play" v-else  size="24" style="cursor:pointer;" @click="on_bofang(2)" title="播放"/>
            <Icon type="md-skip-forward" @click="on_click_music(1)" title="下一首" style="cursor:pointer;" size="24"/>
          </div>
          <div class="music_jindu_footer">
            总时长：{{this.lang_time}}      当前时间：{{this.dangqian_time}}
          </div>
        </div>
        <div class="music_gongneng">

        </div>
        
      </div>
      <div class="icon_music_list">
        <div class="music_list">
          <div class="music_body">
            <ul>
              <li v-for="item in music_list" :key="item.id">
                <div @dblclick="on_diange(item)" style="cursor:pointer;" :class="jishiqi==item.id?'on_zhengzaibf':''">
                  <div class="li_left_margin">{{item.name}}</div>
                  <div class="li_content_bigmargin">{{item.singer}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="we">
      <Button type="primary" @click="deLogin">登录</Button>
      监测您未登录，请登录您的网易云账号，以便获取您的歌单，播放歌曲
      <Form :model="formLeft" :label-width="80" :rules="ruleInline">
        <FormItem label="账号：" prop="username">
          <Input v-model="formLeft.username" placeholder="请填写账号" style="width: 300px" />
        </FormItem>
        <FormItem label="密码：" prop="userpassword">
          <Input v-model="formLeft.userpassword" type="password" placeholder="请填写密码" clearable style="width: 300px" />
        </FormItem>
      </Form>
      
    </div>
  </div>
</template>

<script>
import util from '../../mutu/mutu.js'
import axios from 'axios'
export default {
  data() {
    return {
      music_width:0,
      userid:0,
      formLeft:{
        username:'',
        userpassword:''
      },
      music_list:[],
      music_url:'',
      jishiqi:1,
      img_title:'',
      img_alt:'',
      music_state:true,
      lang_time:"加载中...",
      dangqian_time:"加载中...",
      state:false,
      ruleInline:{
        username: [
          { required: true, message: '请填写账号', trigger: 'blur' }
        ],
        userpassword: [
          { required: true, message: '请填写密码', trigger: 'blur' }
        ]
      }
    };
  },
  created(){
    this.music_width=`${document.body.clientWidth}px`;
    axios.get('http://localhost:3000/lyric?id=347230')
    .then(rep => {
      console.log(rep.data);
      // this.music_list=rep.data.music.all;
      // this.jishiqi= Math.floor(Math.random()*(1 - 356) + 356);
      // this.music_url=this.music_list[this.jishiqi].url;
      // this.img_alt=this.music_list[this.jishiqi].type;
      // this.img_title=this.music_list[this.jishiqi].img_url;
    })
    
    axios.get('http://localhost:3000/user/playlist?uid='+this.userid+'')
    .then(rep=>{
      console.log(rep.data);
    })
  },
  methods:{
    on_click_music(type){
      if(type==1){
        if(this.music_list.length<this.jishiqi){
          util.error("最后一首！");
          return;
        }else{
          this.jishiqi++
          this.music_url=this.music_list[this.jishiqi].url;
          this.img_alt=this.music_list[this.jishiqi].type;
          this.img_title=this.music_list[this.jishiqi].img_url;
          this.if_time();
        }
      }else{
        if(this.jishiqi==0){
          util.error("第一首！");
          return;
        }else{
          this.jishiqi--
          this.music_url=this.music_list[this.jishiqi].url;
          this.img_alt=this.music_list[this.jishiqi].type;
          this.img_title=this.music_list[this.jishiqi].img_url;
          this.if_time();
        }
      }
    },
    on_bofang(item){
      var audio=document.getElementById('audio');
      if(item==1){
        this.music_state=false;
        var t = setInterval(function(){

        },600);
        audio.pause();
      }else if(item==2){
        this.music_state=true;
        audio.play();
      }
    },
    time_kaishi(){
      var audio=document.getElementById('audio');
      this.lang_time=audio.duration;
      this.dangqian_time=audio.currentTime;
    },
    if_time(){
      var audio=document.getElementById('audio');
      if(audio.readyState==4){
        this.time_kaishi();
      }
    },
    fankui(type){
      this.lang_time=0;
      this.dangqian_time=0;
      this.lang_time=type.duration;
      this.dangqian_time=type.currentTime;
    },
    on_diange(item){
      this.music_url=item.url;
      this.img_alt=item.type;
      this.img_title=item.img_url;
      this.jishiqi=0;
      this.jishiqi=this.jishiqi+parseInt(item.id)
    },
    deLogin(){
      axios.get('http://localhost:3000/login/cellphone?phone='+this.formLeft.username+'&password='+this.formLeft.userpassword+'')
      .then(rep=>{
        let data=rep.data
        console.log(data);
        this.state=true;
        this.userid=data.account.id;
        console.log(this.userid);
        axios.get('http://localhost:3000/user/playlist?uid='+this.userid+'')
        .then(rep=>{
          console.log(rep.data);
        })
      })
    }
  },
  mounted(){  
    var audio=document.getElementById('audio');
    audio.onplay = function(){}
  },
  watch:{
    lang_time: function (newQuestion, oldQuestion) {
      this.lang_time=newQuestion;
    },
    jishiqi: function (newQuestion, oldQuestion) {
      this.jishiqi=newQuestion;
    }
  }
};
</script>
<style lang='less' scoped>
@import './index.less';
</style>