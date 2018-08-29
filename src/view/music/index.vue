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
      <Header style="background-color:#fff;">
        <div class="music_search">
          <Icon type="ios-arrow-dropleft" @click="back(1)" title="返回歌手列表" size="32"/>
          <Input v-model="music_search" placeholder="请输入您要搜索的音乐 / 专辑 / 歌手 / 歌单 / 用户" style="width: 68%;float:left;"/>
          <Button type="primary" shape="circle" icon="ios-search" style="width:20%;float:left;margin-left:2%;" @click="on_search(music_search)">搜索</Button>
          <Icon type="md-close-circle" @click="title_show=!title_show" style="cursor:pointer;float:right;" size="32" title="关闭搜索列表" />
        </div>
      </Header>
      <Content>
        <ul class="geshou_list" v-show="geshou_danye">
          <li v-for="item in geshou" :key="item.id" @click="on_search(item.id)">
            <img :src="item.url" :alt="item.name">
            {{item.name}}
          </li>
        </ul>
        <div class="on_list" v-show="onlist">
          <ul>
            <li v-for="item in search_data" :key="item.id" onselectstart ='return false'>
              <div @dblclick="on_diange(item.id)" style="cursor:pointer;" :class="jishiqi==item.id?'on_zhengzaibf':''">
                <div class="li_left_margin">{{item.name}}</div>
                <div class="li_content_bigmargin">{{item.singer}}</div>
              </div>
            </li>
          </ul>
        </div>
        <div v-show="geshou_axinxi">
          <div class="xinxi_title">
            
          </div>
          <ul>
            <li></li>
          </ul>
        </div>
        <Spin fix v-show="geshou_on"></Spin>
        <!-- <ul>
          <li v-for="item in music_list" :key="item.id" @dblclick="diange(item.id)">
            <img :src="item.album_img" :alt="item.album">
            <span>
              {{item.name}}
            </span>
            <div class="right_xinxi">
              {{item.geshou}}
            </div>
          </li>
        </ul> -->
        <aplayer autoplay="autoplay" :music="music_object" :showLrc="true" v-if="jiuxu" @ended="music_end" style=""/>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import util from '../../mutu/mutu.js'
import axios from 'axios'
import aplayer from 'vue-aplayer'
aplayer.disableVersionBadge = true
export default {
  components: {
    aplayer
  },
  data () {
    return {
      music_width:0,
      music_search:'',
      geshou_on:false,
      geshou_danye:true,
      title_show:true,
      userid:0,
      onlist:false,
      jishiqi:1,
      jiuxu:false,
      deLogin:false,
      music_list:[],
      geshou:[],
      music_id:0,
      music_object:{
        title:'',
        artist:'',
        src:'',
        pic:'',
        lrc:''
      },
      formInline: {
        user: '',
        password: ''
      },
      search_data:[],
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
      useravatarurl:'',
      page_index:30,
      geshou_axinxi:false,
      geshou_xinxi:{
        name:'',
        url:'',
        miaoshu:'',
      }
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
    axios.get('http://localhost:3000/top/artists?offset=0&limit=50')
    .then(rep=>{
      const data=rep.data;
      for(var a=0;a<data.artists.length;a++){
        this.geshou.push({
          id:data.artists[a].id,
          name:data.artists[a].name,
          url:data.artists[a].img1v1Url
        })
      }
    })
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
          this.on_diange(this.search_data[0].id);
          this.jiuxu=true;
          return;
        }
      })
      this.jishiqi=0;
      this.jishiqi=this.jishiqi+parseInt(item)
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
    },
    on_search(type){
      this.geshou_danye=false;
      this.geshou_on=true;
      this.onlist=false;
<<<<<<< HEAD
      axios.get('http://localhost:3000/search?keywords='+this.music_search+'?limit='+this.page_index)
      .then(rep=>{
        var data=rep.data.result.songs;
        console.log(rep.data);
        this.search_data=[];
        for(var i=0;i<data.length;i++){
          this.search_data.push({
            name:data[i].name,
            id:data[i].id,
            singer:data[i].artists.length==1?data[i].artists[0].name:data[i].artists[0].name+"-"+data[i].artists[1].name
          });
        }
        this.onlist=true;
      })
=======
      if(typeof type=='number'){
        axios.get('http://localhost:3000/artists?id='+type)
        .then(rep=>{
          var data=rep.data;
          this.geshou_xinxi.name="";
          this.geshou_xinxi.url="";
          this.geshou_xinxi.miaoshu="";
          this.geshou_xinxi.name=data.artist.name;
          this.geshou_xinxi.url=data.artist.img1v1Url;
          this.geshou_xinxi.miaoshu=data.artist.briefDesc;
          this.search_data=[];
          data.hotSongs.forEach(item=>{
            this.search_data.push({
              name:item.name,
              id:item.id,
              singer:item.ar.length==1?item.ar[0].name:item.ar[0].name+"-"+item.ar[1].name
            });
            this.onlist=true;
          })
          this.geshou_on=false;
          this.geshou_axinxi=true;
        })
      }else{
        this.onlist=false;
        axios.get('http://localhost:3000/search?keywords='+type+'?limit='+this.page_index)
        .then(rep=>{
          var data=rep.data.result.songs;
          this.search_data=[];
          for(var i=0;i<data.length;i++){
            this.search_data.push({
              name:data[i].name,
              id:data[i].id,
              singer:data[i].artists.length==1?data[i].artists[0].name:data[i].artists[0].name+"-"+data[i].artists[1].name
            });
          }
          this.geshou_on=false;
          this.onlist=true;
        })
      }
>>>>>>> 914c1ec07764beb43ba4f3ecd1804e5aeddc03e2
    },
    on_diange(item){
      this.jiuxu=false;
      this.music_id=item;
      axios.get('http://localhost:3000/music/url?id='+item+'')
      .then(rep=>{
        var data=rep.data;
        if(data.data[0].url!=null&&data.data[0].url!=""&&data.data[0].url!=undefined){
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
          return;
        }
      })
      this.jishiqi=0;
      this.jishiqi=parseInt(item)
    },
    music_end(){
      for(var a=1;a<this.search_data.length;a++){
        if(this.search_data[a].id==this.music_id){
          if(a+1<this.search_data.length){
            this.on_diange(this.search_data[a+1].id)
            return;
          }else{
            this.on_diange(this.search_data[0].id)
            return;
          }
        }
      }
    },
    diange(item){
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
          this.diange(this.music_list[0].id);
          this.jiuxu=true;
          return;
        }
      })
      this.jishiqi=0;
      this.jishiqi=this.jishiqi+parseInt(item)
    },
    music_end(){
      for(var a=1;a<this.music_list.length;a++){
        if(this.music_list[a].id==this.music_id){
          if(a+1<this.music_list.length){
            this.diange(this.music_list[a+1].id)
            return;
          }else{
            this.diange(this.music_list[0].id)
            return;
          }
        }
      }
    },
    back(type){
      if(type==1){
        this.onlist=false;
        this.geshou_danye=true;
      }
    }
  }
}

</script>
<style lang='less' scoped>
@import url('./index.less');
</style>