<template>
  <div class="personalized">
    <div class="singer-header" ref="header">
      <div class="singer-back" @click="back()">
        <img src="../../images/Buttons-Random@2x.png" />
      </div>
      <div class="singer-header-ctn">
        <div class="singer-info">
          <div class="singer-name">
            <h5>{{textpersonalizedcondition ? textpersonalizedcondition : '排行榜'}}</h5>
          </div>
        </div>
        <div class="singer-btn-list">
          <img src="../../images/random-btn.png" @click="randomplayer" />
          <img src="../../images/play-btn.png" @click="playerall" />
        </div>
      </div>
    </div>
    <scroll-leaderboard @dataemit="dataemit"></scroll-leaderboard>
    <div class="personalized-ctn-div">
      <div class="presonalized-header">
        <div class="presonalized-left">
          <img v-lazy="leaderboarddata.coverImgUrl" />
        </div>
        <div class="presonalized-right">
          <h5>{{leaderboarddata.name}}</h5>
          <p>更新时间：{{leaderboarddata.updateTime}}</p>
          <div class="operation-list">
            <!-- 收藏按钮--开始 -->
            <div
              class="operation-collection"
              :class="this.leaderboarddata.subscribed ? 'subscribed' : 'noSubscribed'"
              :title="this.leaderboarddata.subscribed ? '取消收藏' : `收藏${this.leaderboarddata.name}`"
            >
              <div class="operation-collection-content">
                <img src="../../images/icon-subscribed.png" v-if="this.leaderboarddata.subscribed" />
                <img src="../../images/icon-noSubscribed.png" v-else />
                {{leaderboarddata.subscribedCount}}
              </div>
            </div>
            <!-- 收藏按钮--结束 -->
            <!-- 分享按钮--开始 -->
            <div class="operation-shareIt" title="分享">
              <div class="operation-shareIt-content">
                <img src="../../images/icon-shareIt.png" />
                {{leaderboarddata.shareCount}}
              </div>
            </div>
            <!-- 分享按钮--结束 -->
            <!-- 评论按钮--开始 -->
            <div class="operation-comment" title="发表评论">
              <div class="operation-comment-content">
                <img src="../../images/icon-comment.png" />
                {{leaderboarddata.commentCount}}
              </div>
            </div>
            <!-- 评论按钮--结束 -->
          </div>
          <p>{{leaderboarddata.description}}</p>
        </div>
      </div>
      <scroll ref="scroll" :mouseWheel="true" class="personalized-ctn">
        <ul ref="personalizedul">
          <li v-for="(item,$index) in leaderboarddata.tracks" :key="$index" ref="personalized">
            <div class="personalized-index">{{$index + 1}}.</div>
            <div class="personalized-img">
              <img v-lazy="item.al.picUrl" @load="initheight" />
            </div>
            <div class="personalized-name">{{item.name}}</div>
            <div class="personalized-songDuration">{{songtimeconversion(item.dt)}}</div>
            <div class="personalized-songer" v-html="songer(item.ar)"></div>
            <div class="personalized-operation">
              <i class="personalized-operation-subscribed" :title="`收藏${item.name}`">
                <img src="../../images/icon-subscribedBig.png" />
              </i>
              <i class="personalized-operation-shareIt" title="分享">
                <img src="../../images/icon-shareItBig.png" />
              </i>
              <i class="personalized-operation-download">
                <a ref="download" :title="`下载${item.name}`">
                  <img src="../../images/icon-downloadSmall.png" />
                </a>
              </i>
              <i class="personalized-operation-like">
                <img src="../../images/icon-small_link.png" />
              </i>
              <i class="personalized-operation-mv" v-if="item.mv" :title="`观看${item.name}mv`">
                <img src="../../images/icon-mvBig.png" />
              </i>
            </div>
          </li>
        </ul>
      </scroll>
    </div>
  </div>
</template>

<script>
import {
  goPageByPath,
  timeconversionymdhms,
  scrollAnimation
} from "utils/utils";
import { mapMutations, mapGetters } from "vuex";
import scroll from "../Components/scroll/index";
import { leaderboard, allleaderboard } from "api/songs";
import scrollLeaderboard from "../Components/scroll-leaderboard/index";
export default {
  data() {
    return {
      /** 用户选择的分类名字 */
      singername: "",
      /** 歌曲列表 */
      singerlist: [],
      /** 排行榜数组 */
      leaderboarddata: [],
      /** 用户选择数据 */
      personalizedcondition: 0,
      /** 用户选择数据文字 */
      textpersonalizedcondition: "云音乐新歌榜"
    };
  },
  computed: {
    ...mapGetters(["playerlist"])
  },
  methods: {
    ...mapMutations({
      /** 修改当前歌曲信息 */
      setsonginfo: "SET_SONGINFO",
      /** 修改当前歌曲id */
      setcurrentsongId: "SET_CURRENTSONGID",
      /** 修改当前播放器播放列表 */
      setplayerlist: "SET_PLAYERLIST",
      /** 修改当前播放器播放模式 */
      setplayermode: "SET_PLAYERMODE"
    }),
    /** 处理歌曲时长 */
    songtimeconversion(count) {
      let minutes = parseInt((count % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = (count % (1000 * 60)) / 1000;
      seconds = ~~seconds;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      let data = minutes + ":" + seconds;
      return data;
    },
    /** 处理歌手 */
    songer(data) {
      if (data.length > 1) {
        let songerdata = "";
        data.forEach((item, index) => {
          if (index > 0) {
            songerdata = songerdata + "&nbsp;&nbsp;&nbsp;&nbsp;" + item.name;
          } else {
            songerdata = songerdata + item.name;
          }
        });
        return songerdata;
      } else {
        return data[0].name;
      }
    },
    /** 用户手动触发条件回调 */
    dataemit(data) {
      this.personalizedcondition =
        data.value === this.personalizedcondition ? null : data.value;
      this.textpersonalizedcondition =
        data.label === this.textpersonalizedcondition
          ? "云音乐新歌榜"
          : data.label;
      this.initdata();
    },
    /** 图片加载完成之后重新计算滚动高度 */
    initheight() {
      this.$refs.scroll.refresh();
    },
    /** 返回页面 */
    back() {
      goPageByPath("/singerlist");
    },
    /** 处理随机播放按钮事件 */
    randomplayer() {
      return;
      /** 深拷贝当前歌曲列表--开始 */
      let date = [];
      for (let i = 0; i < this.singerlist.length; i++) {
        date.push(this.singerlist[i]);
      }
      /** 深拷贝当前歌曲列表--结束 */
      this.setplayermode(1);
      this.setplayerlist(playerrandom(date));
      /** 传入当前播放列表的长度 */
      this.setcurrentsongId(this.playerlist[0].id);
      if (this.playerlist.length > 0) {
        let data = {};
        this.playerlist.forEach((item, index) => {
          if (this.currentsongId === item.id) {
            data["flag"] = this.playerlist[0].flag;
            data["name"] = this.playerlist[0].name;
            data["picUrl"] = this.playerlist[0].picUrl;
            data["songer"] = this.playerlist[0].ar;
          }
        });
        data["musicurl"] = "";
        this.setsonginfo(data);
      }
    },
    /** 处理播放按钮事件 */
    playerall() {
      return;
      this.setplayermode(0);
      /** 深拷贝当前歌曲列表--开始 */
      let date = [];
      for (let i = 0; i < this.singerlist.length; i++) {
        date.push(this.singerlist[i]);
      }
      /** 深拷贝当前歌曲列表--结束 */
      this.setplayerlist(date);
      let data = {};
      data["flag"] = this.singerlist[0].flag;
      data["name"] = this.singerlist[0].name;
      data["picUrl"] = this.singerlist[0].picUrl;
      data["musicurl"] = "";
      let songer = [];
      if (
        this.singerlist[0].ar &&
        this.singerlist[0].ar.length &&
        this.singerlist[0].ar.length > 0
      ) {
        this.singerlist[0].ar.forEach((item, index) => {
          songer.push(item);
        });
      }
      data["songer"] = songer;
      this.setsonginfo(data);
      if (this.singerlist[0].id !== this.currentsongId) {
        this.setcurrentsongId(this.singerlist[0].id);
      }
    },
    /** 初始化获取数据 */
    initdata() {
      leaderboard(this.personalizedcondition).then(res => {
        if (res.data.code === 200) {
          let data = res.data.playlist;
          let updateTime = data.updateTime;
          updateTime = timeconversionymdhms(updateTime);
          this.leaderboarddata = data;
          this.leaderboarddata.updateTime = updateTime;
        }
      });
    }
  },
  components: {
    scroll,
    scrollLeaderboard
  },
  created() {
    /** 初始化获取数据 */
    this.initdata();
  }
};
</script>
<style lang='less' scoped>
@import url("./index.less");
</style>