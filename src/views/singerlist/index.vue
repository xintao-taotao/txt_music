<template>
  <div class="singerlist">
    <div class="header">
      <div class="header-left">
        <i>最受欢迎的</i>
        <p>艺术家</p>
      </div>
      <scroll :scrollX="true" style="width:400px;overflow-x: auto;">
        <div>
          <ul style="white-space: nowrap;display: inline-block;">
            <li v-for="(item,index) in hotsongerlist" :key="index" style="display: inline-block;width: 100px;height: 80px;margin-left: 10px;background-color: lightcoral;">
              <img v-lazy="item.picUrl" width="100"/>
              <p>{{item.name}}</p>
            </li>
          </ul>
        </div>
      </scroll>
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
import {} from "utils/utils";
export default {
  data() {
    return {
      search: "",
      searchinput: false,
      searchfont: false,
      songerlist: [],
      hotsongerlist: []
    };
  },
  methods: {
    searchbtn() {
      if (this.searchinput == true) {
        //处理搜索事件
        if (!this.search) {
          this.searchfont = true;
        } else {
          //搜索代码
        }
      } else {
        this.searchinput = true;
      }
    },
    selectdata() {
      hotsonger(0, 10).then(res => {
        console.log(res);
        this.hotsongerlist = res.data.artists;
      });
      // songerlist().then(res => {
      //   if (res.data.code === 200) {
      //     let data = res.data.artists;
      //     if (data.length > 0) {
      //       data.forEach(item => {
      //         this.songerlist.push({
      //           accountId: item.accountId,
      //           albumSize: item.albumSize,
      //           alias: item.alias,
      //           briefDesc: item.briefDesc,
      //           followed: item.followed,
      //           id: item.id,
      //           img1v1Id: item.img1v1Id,
      //           img1v1Id_str: item.img1v1Id_str,
      //           img1v1Url: item.img1v1Url,
      //           musicSize: item.musicSize,
      //           name: item.name,
      //           picId: item.picId,
      //           picId_str: item.picId_str,
      //           picUrl: item.picUrl,
      //           topicPerson: item.topicPerson,
      //           trans: item.trans
      //         });
      //       });
      //     }
      //   }
      // });
    },
    songername(item) {}
  },
  created() {
    this.selectdata();
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