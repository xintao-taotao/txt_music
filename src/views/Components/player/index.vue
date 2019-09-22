<template>
  <div class="player" :class="variablebackground">
    <!-- 歌曲信息 -->
    <div class="song-info-songer-info">
      <div class="songer-avatar">
        <img v-lazy="songinfo.picUrl" :alt="songinfo.name" />
      </div>
      <div class="song-info">
        <h5 id="songer-name">{{songinfo.name}}</h5>
        <div id="singer-names" v-if="songinfo.songer && songinfo.songer.length > 0">
          <span v-for="(item,index) in songinfo.songer" :key="index">{{item.name}}</span>
        </div>
      </div>
    </div>
    <!-- 操作div -->
    <div class="player-operating">
      <div class="player-prev" title="上一首">
        <img src="../../../images/big_prev.png" />
      </div>
      <div class="play-pause" :title="playstate ? '暂停' : '播放'">
        <img src="../../../images/big_play.png" v-if="playstate" @click="musicpause" />
        <img src="../../../images/big_pause.png" v-else @click="musicplayer" />
      </div>
      <div class="player-next" title="下一首">
        <img src="../../../images/big_next.png" />
      </div>
    </div>
    <!-- 歌曲歌词 -->
    <div class="songer-lyrics">
      <scroll ref="scroll" v-if="songerlyric && songerlyric.lines">
        <div class="songer-lyrics-ctn">
          {{playingLyric}}
          <p
            :class="currentLineNum === index ? 'songer-lyrics-current' : null"
            ref="lyricLine"
            v-for="(line,index) in songerlyric.lines"
            :key="index"
          >{{line.txt}}</p>
        </div>
      </scroll>
    </div>
    <!-- 歌曲进度条 -->
    <div class="player-ctn">
      <div class="player-elapsed-time"></div>
      <div class="player-progress-bar">
        <div class="player-progress-border"></div>
        <div class="player-progress-ball"></div>
      </div>
      <div class="player-play-time">{{songschedule}}</div>
    </div>
    <audio
      :src="songinfo.musicurl"
      ref="audio"
      @canplay="audioready"
      @timeupdate="timeupdate"
      v-show="false"
    ></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { singerstatus, singerurl, singerlyric } from "api/songs";
import { scrollAnimation } from "utils/utils";
import Lyric from "lyric-parser";
import scroll from "../scroll/index";
export default {
  data() {
    return {
      backgroundcolor: ["#596B9F", "#3F4F56", "#60ABC3", "#9A525D", "#302C57"],
      variablebackground: "play-bgcolor",
      songerlyric: null,
      currentLineNum: 0,
      playingLyric: ""
    };
  },
  components: {
    scroll
  },
  computed: {
    ...mapGetters(["songinfo", "currentsongId", "playstate", "songschedule"])
  },
  methods: {
    ...mapMutations({
      /** 修改当前歌曲信息 */
      setsonginfo: "SET_SONGINFO",
      /** 修改当前歌曲是否正在播放 */
      setplatstate: "SET_PLAYSTATE",
      /** 修改当前歌曲播放进度 */
      setsongschedule: "SET_SONGSCHEDULE"
    }),
    /** 初始化播放器背景色 */
    initplayerbackgroundcolor() {
      let count = Math.ceil(Math.random() * this.backgroundcolor.length);
      if (count === 0) {
        this.initplayerbackgroundcolor();
      } else {
        this.variablebackground = this.variablebackground + count;
      }
    },
    /** 开启播放歌曲 */
    initplayer() {
      /** 如果音乐不可用，则不执行下方代码 */
      let singstatus = false;
      singerstatus(this.currentsongId).then(res => {
        if (res.data.success === true) {
          if (res.data.message !== "ok") {
            singstatus = true;
            this.$Message.error("亲爱的,此歌曲暂无版权噢！");
            return;
          }
        }
      });
      /** 如果音乐可用 */
      if (!singstatus) {
        /** 获取歌曲播放地址 */
        singerurl(this.currentsongId).then(res => {
          if (res.data.code === 200) {
            let data = res.data.data[0];
            let item = {};
            item["flag"] = data.flag;
            item["musicurl"] = data.url;
            item["name"] = this.songinfo.name;
            item["picUrl"] = this.songinfo.picUrl;
            item["songer"] = this.songinfo.songer;
            this.setsonginfo(item);
            /** css动画滚动歌名 */
            scrollAnimation("#songer-name", 6);
            /** css动画滚动歌手 */
            scrollAnimation("#singer-names", 4);
          }
        });
      }
      /** 开始播放歌曲 */
      this.musicplayer();
    },
    /** 开始播放歌曲 */
    musicplayer() {
      if (this.songinfo.musicurl && this.songinfo.musicurl !== "") {
        this.setplatstate(true);
        this.$refs.audio.play();
      }
    },
    /** 暂停播放歌曲 */
    musicpause() {
      this.setplatstate(false);
      this.$refs.audio.pause();
    },
    /** 缓存歌曲信息等 */
    cacheinfo() {},
    /** 音频文件准备就绪 */
    audioready() {
      this.musicplayer();
    },
    /** 当前播放位置 */
    timeupdate(e) {
      this.setsongschedule(e.target.currentTime);
    },
    /** 获取歌词 */
    singerlyric() {
      console.log('asd');
      singerlyric(this.currentsongId).then(res => {
        if (res.data.code === 200) {
          let data = res.data.lrc;
          this.songerlyric = new Lyric(data.lyric, this.handleLyric);
          this.songerlyric.play();
        }
      });
    },
    /** handleLyric回调函数 */
    handleLyric({ lineNum, txt }) {
      console.log(lineNum,txt);
      if (!this.$refs.lyricLine) {
          return
        }
        this.currentLineNum = lineNum
        if (lineNum > 5) {
          let lineEl = this.$refs.lyricLine[lineNum - 5]
          this.$refs.scroll.scrollToElement(lineEl, 1000)
        } else {
          this.$refs.scroll.scrollTo(0, 0, 1000)
        }
        this.playingLyric = txt
    }
  },
  created() {
    /** 初始化播放器背景色（随机） */
    this.initplayerbackgroundcolor();
  },
  watch: {
    /** 监听歌曲id */
    currentsongId() {
      /** 开始播放当前歌曲 */
      this.initplayer();
      /** 获取歌曲歌词 */
      this.singerlyric();
      /** 储存歌曲信息到缓存 */
      this.cacheinfo();
    }
  }
};
</script>
<style lang='less' scoped>
@import url("./index.less");
</style>