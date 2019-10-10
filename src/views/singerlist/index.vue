<template>
  <div class="singerlist">
    <div class="header" ref="header">
      <div class="header-left">
        <i>最受欢迎的</i>
        <p>艺术家</p>
      </div>
      <div class="header-right">
        <transition name="search">
          <div class="search">
            <div class="search_input" v-show="searchinput">
              <Tinput v-model="search" placeholder="请输入您要搜索的内容" type="text"></Tinput>
            </div>
            <button @click="searchbtn()" class="search_btn"></button>
          </div>
        </transition>
        <transition name="searchfont">
          <p v-show="searchfont">亲！不输入内容搜索不了哦！</p>
        </transition>
      </div>
    </div>
    <div class="content">
      <scrollAlphabet @songername="songername"></scrollAlphabet>
      <scroll :scrollX="true" :mouseWheel="true">
        <ul class="hotlist" ref="hotlist">
          <li
            v-for="(item,index) in hotsongerlist"
            :key="index"
            ref="songerli"
            @click="selectsonger(item)"
            @mousedown="(e)=>{onsinger(e,index)}"
            @mouseup="(e)=>{upsinger(e,index)}"
            @mouseleave="(e)=>{upsinger(e,index)}"
          >
            <img v-lazy="item.picUrl" @load="inithotlist"/>
            <div class="songer-info">
              <p>{{item.name}}</p>
              <p v-for="(its,idx) in item.alias" :key="idx">{{its}}</p>
            </div>
          </li>
        </ul>
      </scroll>
      <scroll :data="songerlist">
        <div class="songer_div">
          <div>
            <ul class="songerlist_ul">
              <li v-for="(item,index) in songerlist" :key="index">
                <img v-lazy="item.picUrl" />
                <p>{{item.name}}</p>
              </li>
            </ul>
          </div>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import { songerlist, hotsonger } from "api/songs";
import scrollAlphabet from "../Components/scroll-alphabet";
import scroll from "../Components/scroll/index";
import { goPageByPath } from "utils/utils";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      /** 搜索框的值 */
      search: "",
      /** 搜索框的展示状态 */
      searchinput: false,
      /** 搜索框提示文字的显示状态 */
      searchfont: false,
      /** 歌手列表数据 */
      songerlist: [],
      /** 最受欢迎的歌手数据列表 */
      hotsongerlist: [],
      /** 用户选择的分类歌手字母数据 */
      useractiveletter: '',
      /** 分类歌手数据分页 */
      useractiveindex: 0,
      /** 分类歌手每一页数据量 */
      useractivepagecount: 30
    };
  },
  methods: {
    searchbtn() {
      if (this.searchinput == true) {
        /** 处理搜索事件 */
        if (!this.search) {
          this.searchfont = true;
        } else {
          /** 搜索代码 */
        }
      } else {
        this.searchinput = true;
      }
    },
    onsinger(e,index){
      this.$refs.hotlist.children[index].className = 'singer-on-active';
    },
    upsinger(e,index){
      this.$refs.hotlist.children[index].className = '';
    },
    selectdata() {
      hotsonger(0, 10).then(res => {
        if(res.data.code === 200){
          let data = res.data.artists;
          if(data.length > 0){
            data.forEach((item,index)=>{
              /** 存储歌手昵称 */
              let alias = [];
              if(item.alias && item.alias.length > 0){
                item.alias.forEach((als,index)=>{
                  if(als){
                    alias.push(als);
                  }
                })
              }
              this.hotsongerlist.push({
                accountId: item.accountId,
                albumSize: item.albumSize,
                alias: alias,
                briefDesc: item.briefDesc,
                followed: item.followed,
                id: item.id,
                img1v1Id: item.img1v1Id,
                img1v1Id_str: item.img1v1Id_str,
                img1v1Url: item.img1v1Url,
                musicSize: item.musicSize,
                name: item.name,
                picId: item.picId,
                picId_str: item.picId_str,
                picUrl: item.picUrl,
                topicPerson: item.topicPerson,
                trans: item.trans
              })
            }) 
          }
        }
      });
      songerlist(1001,this.useractiveletter).then(res => {
        if (res.data.code === 200) {
          let data = res.data.artists;
          if (data.length > 0) {
            data.forEach(item => {
              this.songerlist.push({
                accountId: item.accountId,
                albumSize: item.albumSize,
                alias: item.alias,
                briefDesc: item.briefDesc,
                followed: item.followed,
                id: item.id,
                img1v1Id: item.img1v1Id,
                img1v1Id_str: item.img1v1Id_str,
                img1v1Url: item.img1v1Url,
                musicSize: item.musicSize,
                name: item.name,
                picId: item.picId,
                picId_str: item.picId_str,
                picUrl: item.picUrl,
                topicPerson: item.topicPerson,
                trans: item.trans
              });
            });
          }
        }
      });
    },
    selectsonger(item){
      goPageByPath('/singer-details',{songerid: item.id})
    },
    songername(item) {
      this.useractiveletter = item;
      console.log(this.useractiveletter);
    },
    inithotlist() {
      this.$nextTick(() => {
        setTimeout(() => {
          let width;
          if (this.$refs.songerli && this.$refs.songerli.length > 0) {
            width = 0;
            this.$refs.songerli.forEach((item, index) => {
              if(index + 1 === this.$refs.songerli.length){
                width = width + item.scrollWidth;
              }else{
                width = width + item.scrollWidth + 45;
              }
            });
          }
          this.$refs.hotlist.style.width = width + "px";
        }, 60);
      });
    }
  },
  created() {
    this.selectdata();
    this.$nextTick(() => {
      this.inithotlist();
    });
  },
  components: {
    scrollAlphabet,
    scroll
  }
};
</script>
<style lang='less' scoped>
@import url("./index.less");
</style>