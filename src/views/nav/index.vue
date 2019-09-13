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
          <span @click="jumpmenu('/singerlist')">歌手列表</span>
        </li>
        <li
          class="recommend-list"
          :class="navactive === 2 ? 'active active-recommend-list' : null"
          title="推荐歌单"
        >
          <i></i>
          <span @click="jumpmenu()">推荐歌单</span>
        </li>
        <li
          class="hot-topic"
          :class="navactive === 3 ? 'active active-hot-topic' : null"
          title="热门话题"
        >
          <i></i>
          <span @click="jumpmenu()">热门话题</span>
        </li>
        <li
          class="watch-mv"
          :class="navactive === 4 ? 'active active-watch-mv' : null"
          title="观看MV"
        >
          <i></i>
          <span @click="jumpmenu()">观看MV</span>
        </li>
        <li
          class="playlist"
          :class="navactive === 5 ? 'active active-playlist' : null"
          title="播放列表"
        >
          <i></i>
          <span @click="jumpmenu()">播放列表</span>
        </li>
      </ul>
    </div>
    <div class="nav-item">
      <div class="nav-item-title">发现音乐</div>
      <ul>
        <li
          class="fine-list"
          :class="navactive === 6 ? 'active active-fine-list' : null"
          title="精品歌单"
        >
          <i></i>
          <span @click="jumpmenu()">精品歌单</span>
        </li>
        <li
          class="private-fm"
          :class="navactive === 7 ? 'active active-private-fm' : null"
          title="私人FM"
        >
          <i></i>
          <span @click="jumpmenu()">私人FM</span>
        </li>
        <li
          class="latest-album"
          :class="navactive === 8 ? 'active active-latest-album' : null"
          title="最新专辑"
        >
          <i></i>
          <span @click="jumpmenu()">最新专辑</span>
        </li>
        <li
          class="exclusive-list"
          :class="navactive === 9 ? 'active active-exclusive-list' : null"
          title="独家放送"
        >
          <i></i>
          <span @click="jumpmenu()">独家放送</span>
        </li>
        <li
          class="recommend-program"
          :class="navactive === 10 ? 'active active-recommend-program' : null"
          title="推荐节目"
        >
          <i></i>
          <span @click="jumpmenu()">推荐节目</span>
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
        <img src="../../images/user-info-detail.png" alt="查看详情">
      </div>
    </div>
  </div>
</template>

<script>
import { goPageByPath, getToken } from "utils/utils";
import { userinfo } from "api/user";
export default {
  data() {
    return {
      navactive: 1,
      avatarUrl: '',
      nickname: '',
    };
  },
  methods: {
    jumpmenu(url) {
      if (url) {
        goPageByPath(url);
      } else {
        this.$Message.error("此功能暂未开放！");
      }
    },
    selectuserinfo() {
      userinfo(getToken()).then((res)=>{
        if(res.data.code === 200){
          let data = res.data;
          this.avatarUrl = data.profile.avatarUrl;
          this.nickname = data.profile.nickname;
        }
      })
    }
  },
  created() {
    this.selectuserinfo();
  }
};
</script>
<style lang='less' scoped>
@import url("./index.less");
</style>