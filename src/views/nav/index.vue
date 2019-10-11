<template>
  <div class="nav">
    <div class="nav-item">
      <div class="nav-item-title">在线音乐</div>
      <ul>
        <li
          class="songerlist"
          :class="navactive === 1 ? 'active active-songerlist' : null"
          title="歌手列表"
        >
          <i>
            <img src="../../images/big_usericon_gray.png" alt="歌手列表" v-if="navactive !== 1" />
            <img src="../../images/big_usericon.png" alt="歌手列表" v-if="navactive === 1" />
          </i>
          <span @click="jumpmenu('/singerlist',1)">歌手列表</span>
        </li>
        <li
          class="recommend-list"
          :class="navactive === 2 ? 'active active-recommend-list' : null"
          title="推荐歌单"
        >
          <i></i>
          <span @click="jumpmenu('/personalized',2)">推荐歌单</span>
        </li>
        <li
          class="hot-topic"
          :class="navactive === 3 ? 'active active-hot-topic' : null"
          title="热门话题"
        >
          <i>
            <img src="../../images/hot_topic.png" alt="热门话题" v-if="navactive !== 3" />
            <img src="../../images/hot_topic_active.png" alt="热门话题" v-if="navactive === 3" />
          </i>
          <span @click="jumpmenu()">热门话题</span>
        </li>
        <li
          class="watch-mv"
          :class="navactive === 4 ? 'active active-watch-mv' : null"
          title="观看MV"
        >
          <i>
            <img src="../../images/watch_mv.png" alt="观看MV" v-if="navactive !== 4" />
            <img src="../../images/watch_mv_active.png" alt="观看MV" v-if="navactive === 4" />
          </i>
          <span @click="jumpmenu()">观看MV</span>
        </li>
        <li class="playlist" :class="navactive === 5 ? 'active active-playlist' : null" title="排行榜">
          <i>
            <img src="../../images/leaderboard_nav.png" alt="排行榜" v-if="navactive !== 5" />
            <img src="../../images/leaderboard_nav_active.png" alt="排行榜" v-if="navactive === 5" />
          </i>
          <span @click="jumpmenu('')">排行榜</span>
        </li>
      </ul>
    </div>
    <div class="nav-item">
      <div class="nav-item-title">发现音乐</div>
      <ul>
        <li
          class="private-fm"
          :class="navactive === 6 ? 'active active-private-fm' : null"
          title="私人FM"
        >
          <i>
            <img src="../../images/private_fm.png" alt="私人FM" v-if="navactive !== 6" />
            <img src="../../images/private_fm_active.png" alt="私人FM" v-if="navactive === 6" />
          </i>
          <span @click="jumpmenu()">私人FM</span>
        </li>
        <li
          class="latest-album"
          :class="navactive === 7 ? 'active active-latest-album' : null"
          title="最新专辑"
        >
          <i>
            <img src="../../images/latest_album.png" alt="最新专辑" v-if="navactive !== 7" />
            <img src="../../images/latest_album_active.png" alt="最新专辑" v-if="navactive === 7" />
          </i>
          <span @click="jumpmenu()">最新专辑</span>
        </li>
        <li
          class="exclusive-list"
          :class="navactive === 8 ? 'active active-exclusive-list' : null"
          title="独家放送"
        >
          <i>
            <img src="../../images/exclusive_nav.png" alt="独家放送" v-if="navactive !== 8" />
            <img src="../../images/exclusive_nav_active.png" alt="独家放送" v-if="navactive === 8" />
          </i>
          <span @click="jumpmenu()">独家放送</span>
        </li>
        <li
          class="recommend-program"
          :class="navactive === 9 ? 'active active-recommend-program' : null"
          title="推荐电台"
        >
          <i>
            <img src="../../images/radio_nav.png" alt="推荐电台" v-if="navactive !== 9" />
            <img src="../../images/radio_nav_active.png" alt="推荐电台" v-if="navactive === 9" />
          </i>
          <span @click="jumpmenu()">推荐电台</span>
        </li>
      </ul>
    </div>
    <div class="user-info">
      <div class="avatar">
        <img v-lazy="avatarUrl" />
      </div>
      <div class="user-name">
        <p>{{nickname}}</p>
      </div>
      <div class="user-info-detail">
        <img src="../../images/user-info-detail.png" alt="查看详情" />
      </div>
      <Icon type="md-close" size="22" class="close" @click="exitlogin" title="退出登录"/>
    </div>
  </div>
</template>

<script>
import { goPageByPath, getToken, removeToken } from "utils/utils";
import { userinfo } from "api/user";
export default {
  data() {
    return {
      navactive: 1,
      avatarUrl: "",
      nickname: ""
    };
  },
  methods: {
    jumpmenu(url, index) {
      if (url) {
        goPageByPath(url);
        this.navactive = index;
      } else {
        this.$Message.error("此功能暂未开放！");
      }
    },
    selectuserinfo() {
      userinfo(getToken()).then(res => {
        if (res.data.code === 200) {
          let data = res.data;
          this.avatarUrl = data.profile.avatarUrl;
          this.nickname = data.profile.nickname;
        }
      });
    },
    /** 退出登录事件 */
    exitlogin(){
      removeToken();
      this.$Message.success('退出成功！欢迎再次使用本系统！');
      goPageByPath('/login');
    },
    /** 初始化选中事件处理 */
    initactivenav() {
      switch (this.$route.path) {
        case "/singer-details":
        case "/singerlist":
          this.navactive = 1;
          break;
        case "/personalized":
          this.navactive = 2;
          break;
      }
    }
  },
  created() {
    this.selectuserinfo();
    /** 初始化选中事件处理 */
    this.initactivenav();
  },
  watch: {
    /** 监听路由--初始化选中事件处理 */
    $route(to, from) {
      this.initactivenav();
    }
  }
};
</script>
<style lang='less' scoped>
@import url("./index.less");
</style>