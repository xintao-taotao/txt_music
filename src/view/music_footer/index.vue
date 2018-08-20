<template>
  <div class="music_footer" :style="{width:music_width}">
    <div class="music_icon_left">
      <p></p>
    </div>
    <div style="margin:auto;width:1300px;height:100%;" v-if="state">
      <div class="music_content">
        <div class="musci_title_img">
          <img :src="img_title" :alt="img_alt" width="70px">
        </div>
        <div class="music_jindu">
          <aplayer autoplay="autoplay" :music="music_object" :showLrc="true" v-if="jiuxu" @ended="music_end"/>
          <Spin fix v-show="!jiuxu">
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>加载中...</div>
          </Spin>
        </div>
        <div class="music_gongneng"></div>
      </div>
      <div class="icon_music_list">
        <div class="music_list">
          <div class="music_body">
            <div class="music_title">
              <div class="music_show" v-show="title_show">
                <p>歌曲列表</p>
                <p @click="title_show=!title_show"><img src="../../assets/images/index_02.png" width="20px;" style="vertical-align:middle;cursor:pointer;"></p>
              </div>
              <div class="music_search" v-show="!title_show">
                <Input v-model="music_search" placeholder="请输入您要搜索的音乐 / 专辑 / 歌手 / 歌单 / 用户" style="width: 75%;float:left;"/>
                <Button type="primary" shape="circle" icon="ios-search" style="width:20%;float:right;" @click="on_search">搜索</Button>
              </div>
            </div>
            <ul v-show="title_show">
              <li v-for="item in music_data" :key="item.id" onselectstart ='return false'>
                <div @dblclick="on_diange(item.id)" style="cursor:pointer;" :class="jishiqi==item.id?'on_zhengzaibf':''">
                  <div class="li_left_margin">{{item.name}}</div>
                  <div class="li_content_bigmargin">{{item.singer}}</div>
                </div>
              </li>
            </ul>
            <ul class="search_list" v-show="!title_show">
              <li v-for="item in search_data" :key="item.id" onselectstart ='return false'>
                <div @dblclick="on_diange(item.id)" style="cursor:pointer;" :class="jishiqi==item.id?'on_zhengzaibf':''">
                  <div class="li_left_margin">{{item.name}}</div>
                  <div class="li_content_bigmargin">{{item.singer}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="we" v-show="!state">
      <Button type="primary" @click="deLogin">登录</Button>
      <Button type="primary" @click="zhuangtai">刷新登录状态</Button>
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
import Aplayer from 'vue-aplayer'
export default {
  components: {
    Aplayer
  },
  data() {
    return {
      music_width:0,
      jiuxu:false,
      userid:0,
      formLeft:{
        username:'',
        userpassword:''
      },
      title_show:true,
      music_search:'',
      music_list:[],
      music_object:{
        title:'',
        artist:'',
        src:'',
        pic:'',
        lrc:''
      },
      music_url:'',
      page_index:30,
      music_id:0,
      music_data:[],
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
      },
      search_data:[]
    };
  },
  created(){
    this.music_width=`${document.body.clientWidth}px`;
    if(this.userid!=0||localStorage.getItem('userid')!=null){
      axios.get('http://localhost:3000/user/playlist?uid='+localStorage.getItem('userid')+'')
      .then(rep=>{
        this.state=true;
      })
      axios.get('http://localhost:3000/personalized/newsong')
      .then(rep=>{
        var data=rep.data.result;
        for(var i=0;i<data.length;i++){
          this.music_data.push({
            name:data[i].name,
            id:data[i].id,
            singer:data[i].song.artists.length==1?data[i].song.artists[0].name:data[i].song.artists[0].name+"-"+data[i].song.artists[1].name
          })
          if(i==0){
            this.on_diange(this.music_data[0].id)
          }
        }
      })
    }
    let that=this;
    setTimeout(function(){
      that.clearlocal();
    },10800000);
  },
  methods:{
    if_time(){
      
    },
    fankui(type){
      this.lang_time=0;
      this.dangqian_time=0;
      this.lang_time=type.duration;
      this.dangqian_time=type.currentTime;
    },
    on_diange(item){
      this.jiuxu=false;
      this.music_id=item;
      axios.get('http://localhost:3000/music/url?id='+item+'')
      .then(rep=>{
        var data=rep.data;
        if(data.data[0].url!=""&&data.data[0].url!=null&&data.data[0].url!=undefined){
          this.music_object.src=data.data[0].url;
          axios.get('http://localhost:3000/song/detail?ids='+item+'')
          .then(rep=>{
            var data=rep.data.songs;
            this.music_object.artist=data[0].ar.length==1?this.music_object.artist=data[0].ar[0].name:data[0].ar[0].name+"-"+data[0].ar[1].name
            this.music_object.title=data[0].name;
            this.music_object.pic=data[0].al.picUrl;
            axios.get('http://localhost:3000/lyric?id='+item+'')
            .then(rep=>{
              var data=rep.data;
              this.music_object.lrc="";
              this.music_object.lrc=data.lrc.lyric;
              this.jiuxu=true;
            })
          })
        }else{
          util.error("对不起！您点播的歌曲暂无权限和资料，请换歌！");
          this.on_diange(this.music_data[0].id);
          this.jiuxu=true;
          return;
        }
      })
      this.jishiqi=0;
      this.jishiqi=this.jishiqi+parseInt(item)
    },
    deLogin(){
      axios.get('http://localhost:3000/login/cellphone?phone='+this.formLeft.username+'&password='+this.formLeft.userpassword+'')
      .then(rep=>{
        let data=rep.data
        this.state=true;
        this.userid=data.account.id;
        localStorage.setItem('userid',this.userid);
        axios.get('http://localhost:3000/user/playlist?uid='+this.userid+'')
        .then(rep=>{
          this.zhuangtai();
        })
      })
    },
    zhuangtai(){
      if(localStorage.getItem('userid')!=""){
        axios.get('http://localhost:3000/login/refresh')
        .then(rep=>{
          console.log(rep.data);
        })
      }
    },
    //清除登录状态
    clearlocal(item){
      if(item==1){
        localStorage.removeItem('userid');
        this.state=false;
        util.success("退出成功！请重新登录！");
        return
      }else if(document.hidden==true&&(document.visibilityState=='hidden'||document.visibilityState=='prerender')){
        util.error("您的登录状态已过期，请重新登录！");
        localStorage.removeItem('userid');
        this.state=false;
        return;
      }
    },
    on_search(){
      // .splice(1,1)
      axios.get('http://localhost:3000/search?keywords='+this.music_search+'?limit='+this.page_index)
      .then(rep=>{
        var data=rep.data.result.songs;
        console.log(data);
        this.search_data=[];
        for(var i=0;i<data.length;i++){
          this.search_data.push({
            name:data[i].name,
            id:data[i].id,
            singer:data[i].artists.length==1?data[i].artists[0].name:data[i].artists[0].name+"-"+data[i].artists[1].name
          });
        }
        console.log(this.search_data);
      })
    },
    music_end(){
      for(var a=1;a<this.music_data.length;a++){
        if(this.music_data[a].id==this.music_id){
          if(a+1<this.music_data.length){
            this.on_diange(this.music_data[a+1].id)
            return;
          }else{
            this.on_diange(this.music_data[0].id)
            return;
          }
        }
      }
    }
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