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
            <img v-lazy="item.picUrl" @load="inithotlist" />
            <div class="songer-info">
              <p>{{item.name}}</p>
              <span v-for="(its,idx) in item.alias" :key="idx">{{its}}</span>
            </div>
          </li>
        </ul>
      </scroll>
      <div class="header fuheader">
        <div class="header-left fuheader-left">
          <i>歌手列表</i>
          <p>{{useractivefontdata ? (useractiveletter ? useractivefontdata + ' - ' + useractiveletter : useractivefontdata) : useractiveletter ? useractiveletter : null}}</p>
        </div>
        <scroll-songertype @dataemit="dataemit"></scroll-songertype>
      </div>
      <div class="songer_div" :class="playerstatus ? 'minheight' : null">
        <scroll :mouseWheel="true" ref="songerdiv">
          <ul class="songerlist_ul">
            <li v-for="(item,index) in songerlist" :key="index" @click="selectsonger(item)">
              <img v-lazy="item.picUrl" />
              <div class="songer-info fusonger-info">
                <div>
                  <p>{{item.name}}</p>
                  <p class="fusonger-info-p">
                    <span v-for="(its,idx) in item.alias" :key="idx">{{its}}</span>
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </scroll>
      </div>
    </div>
  </div>
</template>

<script>
import { songerlist, hotsonger } from "api/songs";
import scrollAlphabet from "../Components/scroll-alphabet";
import scroll from "../Components/scroll/index";
import { goPageByPath, scrollAnimation } from "utils/utils";
import { setTimeout } from "timers";
import scrollSongertype from "../Components/scroll-songertype/index";
import { mapGetters } from "vuex";
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
      useractiveletter: "",
      /** 用户选择的文字分类数据 */
      useractivefont: "5001",
      /** 用户选择的文字分类文字数据 */
      useractivefontdata: "入驻歌手",
      /** 分类歌手数据分页 */
      useractiveindex: 0,
      /** 分类歌手每一页数据量 */
      useractivepagecount: 30
    };
  },
  computed: {
    ...mapGetters(["playerstatus"])
  },
  methods: {
    /** 搜索按钮点击事件 */
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
    /** 当用户鼠标按下的时候增加类名 */
    onsinger(e, index) {
      this.$refs.hotlist.children[index].className = "singer-on-active";
    },
    /** 当用户鼠标松开的时候清空类名 */
    upsinger(e, index) {
      this.$refs.hotlist.children[index].className = "";
    },
    /** 记录用户点击的文字数据 */
    dataemit(data) {
      this.useractivefont =
        data.value === this.useractivefont ? 5001 : data.value;
      this.useractivefontdata =
        data.label === this.useractivefontdata ? null : data.label;
      /** 查询分类歌手数据 */
      this.selectclassificationsonger();
    },
    /** 查询分类歌手数据 */
    selectclassificationsonger() {
      songerlist(
        this.useractivefont,
        this.useractivepagecount,
        this.useractiveindex,
        this.useractiveletter
      ).then(res => {
        if (res.data.code === 200) {
          let data = res.data.artists;
          if (data.length > 0) {
            this.songerlist = [];
            this.$refs.songerdiv.scrollTo(0, 0);
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
            scrollAnimation('fusonger-info-p');
          }
        }
      });
    },
    /** 查询最受欢迎的歌手数据 */
    selectdata() {
      hotsonger(0, 10).then(res => {
        if (res.data.code === 200) {
          let data = res.data.artists;
          if (data.length > 0) {
            data.forEach((item, index) => {
              /** 存储歌手昵称 */
              let alias = [];
              if (item.alias && item.alias.length > 0) {
                item.alias.forEach((als, index) => {
                  if (als) {
                    alias.push(als);
                  }
                });
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
              });
            });
          }
        }
      });
    },
    /** 跳转到歌手详情页 */
    selectsonger(item) {
      goPageByPath("/singer-details", { songerid: item.id });
    },
    /** 记录用户点击的字母数据 */
    songername(item) {
      this.useractiveletter = item === this.useractiveletter ? null : item;
      /** 查询分类歌手数据 */
      this.selectclassificationsonger();
    },
    /** 初始化最受欢迎歌手宽度 */
    inithotlist() {
      this.$nextTick(() => {
        setTimeout(() => {
          let width;
          if (this.$refs.songerli && this.$refs.songerli.length > 0) {
            width = 0;
            this.$refs.songerli.forEach((item, index) => {
              if (index + 1 === this.$refs.songerli.length) {
                width = width + item.scrollWidth;
              } else {
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
    /** 查询最受欢迎的歌手数据 */
    this.selectdata();
    this.$nextTick(() => {
      /** 初始化最受欢迎歌手宽度 */
      this.inithotlist();
    });
    /** 查询分类歌手数据 */
    this.selectclassificationsonger();
  },
  components: {
    scrollAlphabet,
    scroll,
    scrollSongertype
  }
};
</script>
<style lang='less' scoped>
@import url("./index.less");
</style>