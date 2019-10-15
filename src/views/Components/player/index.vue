<template>
  <div class="player" :class="variablebackground" v-if="playerstatus">
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
        <img src="../../../images/big_prev.png" @click="prevsongers" />
      </div>
      <div class="play-pause" :title="playstate ? '暂停' : '播放'">
        <img src="../../../images/big_play.png" v-if="playstate" @click="musicpause" />
        <img src="../../../images/big_pause.png" v-else @click="musicplayer" />
      </div>
      <div class="player-next" title="下一首">
        <img src="../../../images/big_next.png" @click="songswitch" />
      </div>
    </div>
    <!-- 歌曲歌词 -->
    <div class="songer-lyrics">
      <scroll ref="scroll" :scrollX="true" :mouseWheel="true">
        <div class="songer-lyrics-ctn">
          <p
            :class="songertimecurrent === key ? 'songer-lyrics-current' : null"
            ref="lyricLine"
            v-for="(item, key, index) in songerlyriclist"
            :key="index"
          >{{item}}</p>
        </div>
      </scroll>
    </div>
    <!-- 歌曲进度条 -->
    <div class="player-ctn">
      <div class="player-elapsed-time">{{songschedule}}</div>
      <div class="progress-bar-wrapper">
        <div class="progress-bar" ref="progressBar" @click="progressClick">
          <div class="bar-inner">
            <div class="progress" ref="progress"></div>
            <div
              class="progress-btn-wrapper"
              ref="progressBtn"
              @touchstart.prevent="progressTouchStart"
              @touchmove.prevent="progressTouchMove"
              @touchend="progressTouchEnd"
            >
              <div class="progress-btn"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="player-play-time">{{songcount}}</div>
    </div>
    <div class="player-operating">
      <volume @position="position"></volume>
      <img src="../../../images/playlist_cycle.png" v-if="playermode === 0" @click="switchmode(1)" />
      <img
        src="../../../images/player_random.png"
        v-else-if="playermode === 1"
        @click="switchmode(2)"
      />
      <img
        src="../../../images/player_single_cycle.png"
        v-else-if="playermode === 2"
        @click="switchmode(0)"
      />
      <playerlist ref="playerlist"></playerlist>
    </div>
    <audio
      :src="songinfo.musicurl"
      ref="audio"
      @canplay="audioready"
      @timeupdate="timeupdate"
      v-show="false"
      @ended="songswitch"
    ></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { singerstatus, singerurl, singerlyric, songerdetails } from "api/songs";
import {
  scrollAnimation,
  Lyric,
  format,
  prefixStyle,
  playerrandom
} from "utils/utils";
import scroll from "../scroll/index";
import volume from "../volume/index";
import playerlist from "../playerlist/index";
import { clearInterval } from "timers";
const transform = prefixStyle("transform");
const progressBtnWidth = 16;
export default {
  data() {
    return {
      /** 播放器背景色 */
      backgroundcolor: ["#596B9F", "#3F4F56", "#60ABC3", "#9A525D", "#302C57"],
      /** 播放器class名 */
      variablebackground: "play-bgcolor",
      /** 当前歌词文本 */
      playingLyric: "",
      /** 歌词对象 */
      songerlyric: null,
      /** 当前歌曲歌词列表 */
      songerlyriclist: [],
      /** 当前歌词播放的时间 */
      songertimecurrent: 0,
      /** 上一首歌id列表 */
      prevsongerlist: [],
      /** 列表循环播放列表 */
      songernormallist: [],
      /** 当前歌曲是否可以播放(配合记录上一首歌) */
      activestatus: false
    };
  },
  components: {
    scroll,
    volume,
    playerlist
  },
  computed: {
    ...mapGetters([
      "songinfo",
      "currentsongId",
      "playstate",
      "songschedule",
      "songcount",
      "playermode",
      "playerlist",
      "playervolume",
      "playerstatus"
    ])
  },
  methods: {
    ...mapMutations({
      /** 修改当前歌曲信息 */
      setsonginfo: "SET_SONGINFO",
      /** 修改当前歌曲是否正在播放 */
      setplatstate: "SET_PLAYSTATE",
      /** 修改当前歌曲播放进度 */
      setsongschedule: "SET_SONGSCHEDULE",
      /** 修改当前歌曲id */
      setcurrentsongId: "SET_CURRENTSONGID",
      /** 修改当前歌曲总长度 */
      setsongcount: "SET_SONGCOUNT",
      /** 修改当前播放器播放模式 */
      setplayermode: "SET_PLAYERMODE",
      /** 修改当前播放器音量 */
      setplayervolume: "SET_PLAYERVOLUME",
      /** 修改当前播放器播放列表 */
      setplayerlist: "SET_PLAYERLIST",
      /** 修改播放器显示状态 */
      setplayerstatus: "SET_PLAYERSTATUS"
    }),
    /** 用户手动切换模式点击事件 */
    switchmode(item) {
      this.setplayermode(item);
      if (item === 0) {
        this.setplayerlist(this.songernormallist);
      } else if (item === 1) {
        this.setplayerlist(playerrandom(this.playerlist));
      }
      this.$Message.success(
        item === 0
          ? "已切换列表循环播放"
          : item === 1
          ? "已切换随机播放"
          : "已切换单曲循环播放"
      );
    },
    /** 调节播放器音量 */
    position(count) {
      this.$refs.audio.volume = count;
      /** 修改当前播放器音量 */
      this.setplayervolume(count);
      /** 缓存播放器音量 */
      localStorage.setItem("playervolume", this.playervolume);
    },
    /** 上一首歌 */
    prevsongers() {
      if (this.prevsongerlist.length >= 2) {
        this.setcurrentsongId(
          this.prevsongerlist[this.prevsongerlist.length - 1]
        );
        songerdetails(
          this.prevsongerlist.length
            ? this.prevsongerlist[this.prevsongerlist.length - 1]
            : this.prevsongerlist
        ).then(res => {
          if (res.data.code === 200) {
            this.prevsongerlist = this.prevsongerlist.slice(
              0,
              this.prevsongerlist.length - 1
            );
            let data = res.data.songs[0];
            let item = {};
            item["name"] = data.name;
            item["picUrl"] = data.al.picUrl;
            item["songer"] = data.ar;
            this.setsonginfo(item);
          }
        });
      } else {
        this.$Message.info("已经是第一首歌了哦！");
      }
    },
    /** 切歌 */
    songswitch() {
      if (this.playerlist.length > 0) {
        /** 如果是列表循环播放模式 */
        if (this.playermode === 0) {
          let indexs = 0;
          let data = {};
          this.playerlist.forEach((item, index) => {
            if (this.currentsongId === item.id) {
              /** 防止是最后一首歌曲 */
              if (index + 1 === this.playerlist.length) {
                data["flag"] = this.playerlist[0].flag;
                data["name"] = this.playerlist[0].name;
                data["picUrl"] = this.playerlist[0].picUrl;
                data["songer"] = this.playerlist[0].ar;
                indexs = 0;
              } else {
                data["flag"] = this.playerlist[index + 1].flag;
                data["name"] = this.playerlist[index + 1].name;
                data["picUrl"] = this.playerlist[index + 1].picUrl;
                data["songer"] = this.playerlist[index + 1].ar;
                indexs = index + 1;
              }
            }
          });
          data["musicurl"] = "";
          this.setsonginfo(data);
          /** 如果id存在，则已经点播过一首歌，则push上一首歌的id给变量 */
          if (this.currentsongId && !this.activestatus) {
            this.prevsongerlist.push(this.currentsongId);
          }
          this.setcurrentsongId(this.playerlist[indexs].id);
          /** 如果是随机播放模式 */
        } else if (this.playermode === 1) {
          let data = {};
          let indexs = 0;
          this.playerlist.forEach((item, index) => {
            if (this.currentsongId === item.id) {
              /** 防止是最后一首歌曲 */
              if (index + 1 === this.playerlist.length) {
                this.setcurrentsongId(null);
                this.setplayerlist([]);
              } else {
                indexs = indexs + index + 1;
                data["flag"] = this.playerlist[index + 1].flag;
                data["name"] = this.playerlist[index + 1].name;
                data["picUrl"] = this.playerlist[index + 1].picUrl;
                data["songer"] = this.playerlist[index + 1].ar;
              }
            }
          });
          data["musicurl"] = "";
          this.setsonginfo(data);
          /** 如果id存在，则已经点播过一首歌，则赋值上一首歌的id给变量 */
          if (this.currentsongId && !this.activestatus) {
            this.prevsongerlist.push(this.currentsongId);
          }
          /** 传入当前播放列表的长度 */
          this.setcurrentsongId(this.playerlist[indexs].id);
          /** 如果是单曲循环模式 */
        } else if (this.playermode === 2) {
          this.$refs.audio.currentTime = 0;
        }
      }
    },
    /** 初始化播放器背景色 */
    initplayerbackgroundcolor() {
      let count = Math.ceil(Math.random() * this.backgroundcolor.length);
      if (count === 0) {
        this.initplayerbackgroundcolor();
      } else {
        this.variablebackground = this.variablebackground + count;
      }
    },
    /** 处理进度条点击事件 */
    progressClick(e) {
      const rect = this.$refs.progressBar.getBoundingClientRect();
      const offsetWidth = e.pageX - rect.left;
      this._offset(offsetWidth);
      const currentTime = this.$refs.audio.duration * this._getPercent();
      this.$refs.audio.currentTime = currentTime;
    },
    _triggerPercent() {
      const currentTime = this.$refs.audio.duration * this._getPercent();
      this.setsongschedule(
        format((this.$refs.audio.currentTime = currentTime))
      );
      this.$refs.audio.currentTime = currentTime;
    },
    /** 返回通用参数 */
    _getPercent() {
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
      return this.$refs.progress.clientWidth / barWidth;
    },
    /** 处理小球位移的距离宽度 */
    _offset(offsetWidth) {
      this.$refs.progress.style.width = `${
        offsetWidth > 0 ? offsetWidth : 0
      }px`;
      this.$refs.progressBtn.style[transform] = `translate3d(${
        offsetWidth > 0 ? offsetWidth : 0
      }px,0,0)`;
    },
    /** 开启播放歌曲 */
    initplayer() {
      /** 如果音乐不可用，则不执行下方代码 */
      let singstatus = false;
      this.activestatus = false;
      singerstatus(this.currentsongId).then(res => {
        if (res.data.success === true) {
          if (res.data.message !== "ok") {
            singstatus = true;
            this.$Message.error("亲爱的,此歌曲暂无版权噢！");
            this.activestatus = true;
            this.songswitch();
            return;
          }
        } else {
          singstatus = true;
          this.$Message.error("亲爱的,此歌曲暂无版权噢！");
          this.activestatus = true;
          this.songswitch();
          return;
        }
      });
      /** 如果音乐可用 */
      if (!singstatus) {
        /** 获取歌曲播放地址 */
        singerurl(this.currentsongId).then(res => {
          if (res.data.code === 200) {
            let data = res.data.data[0];
            if (data.url) {
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
            } else {
              this.$Message.error("亲爱的,此歌曲暂无版权噢！");
              this.activestatus = true;
              this.songswitch();
              return;
            }
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
        let volumestatus = false;
        let pause = setTimeout(() => {
          volumestatus = true;
        }, 1000);
        let volume = this.$refs.audio.volume;
        let pausevolume = setInterval(() => {
          if (volumestatus) {
            clearTimeout(pause);
            clearInterval(pausevolume);
          } else {
            volume = volume + 0.1;
            this.$refs.audio.volume = volume >= volume === 1 ? 1 : volume;
          }
        }, 100);
        this.$refs.audio.play();
        this.setsongcount(format(this.$refs.audio.duration));
      }
    },
    /** 暂停播放歌曲 */
    musicpause() {
      this.setplatstate(false);
      let volumestatus = false;
      let pause = setTimeout(() => {
        this.$refs.audio.pause();
        volumestatus = true;
      }, 1000);
      let volume = this.$refs.audio.volume;
      let pausevolume = setInterval(() => {
        if (volumestatus) {
          clearTimeout(pause);
          clearInterval(pausevolume);
        } else {
          volume = volume - 0.1;
          this.$refs.audio.volume = volume === 0 ? 0 : volume;
        }
      }, 100);
    },
    /** 缓存歌曲信息等 */
    cacheinfo() {
      /** 缓存播放器显示状态 */
      localStorage.setItem("playerstate", true);
      /** 缓存歌曲信息 */
      localStorage.setItem("songinfo", JSON.stringify(this.songinfo));
      /** 缓存播放状态 */
      localStorage.setItem("playstate", this.playstate);
      /** 缓存播放模式 */
      localStorage.setItem("playermode", this.playermode);
      /** 缓存播放器音量 */
      localStorage.setItem("playervolume", this.playervolume);
    },
    /** 音频文件准备就绪 */
    audioready() {
      this.musicplayer();
    },
    /** 当前播放位置 */
    timeupdate(e) {
      if (this.songerlyric) {
        this.playingLyric = this.songerlyric.getCurPlayLyric(
          this.$refs.audio.currentTime
        ).value;
        this.songertimecurrent = this.songerlyric.getCurPlayLyric(
          this.$refs.audio.currentTime
        ).key;
        this.setsongschedule(format(this.$refs.audio.currentTime));
      }
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
      const offsetWidth =
        (e.target.currentTime / this.$refs.audio.duration) * barWidth;
      this._offset(offsetWidth);
      /** 缓存当前播放时间 */
      localStorage.setItem("currentTime", this.$refs.audio.currentTime);
    },
    /** 获取歌词 */
    singerlyric() {
      singerlyric(this.currentsongId).then(res => {
        if (res.data.code === 200) {
          let data = res.data;
          this.songerlyric = new Lyric(data);
          /** 初始化歌词列表 */
          this.initlyriclist();
        }
      });
    },
    /** 初始化歌词列表 */
    initlyriclist() {
      this.songerlyriclist = this.songerlyric.finalLrcMap;
    },
    /** 手指触摸屏幕时触发 */
    progressTouchStart(e) {
      this.touch.initiated = true;
      this.touch.startX = e.touches[0].pageX;
      this.touch.left = this.$refs.progress.clientWidth;
    },
    /** 当手指从屏幕上离开时触发 */
    progressTouchEnd() {
      this.touch.initiated = false;
      this._triggerPercent();
    },
    /** 手指在进度条上滑动时触发 */
    progressTouchMove(e) {
      if (!this.touch.initiated) {
        return;
      }
      const deltaX = e.touches[0].pageX - this.touch.startX;
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
      const offsetWidth = Math.min(
        this.$refs.progressBar.clientWidth - progressBtnWidth,
        Math.max(0, this.touch.left + deltaX)
      );
      this._offset(offsetWidth);
      this.setsongschedule(
        format(this.$refs.audio.duration * this._getPercent())
      );
      this.$refs.audio.currentTime =
        this.$refs.audio.duration * this._getPercent();
    }
  },
  created() {
    /** 初始化touch对象 */
    this.touch = {};
    /** 初始化播放器背景色（随机） */
    this.initplayerbackgroundcolor();
  },
  watch: {
    /** 监听歌曲id */
    currentsongId(news, old) {
      /** 如果id存在，则已经点播过一首歌，则赋值上一首歌的id给变量 */
      if (old && old != this.currentsongId && !this.activestatus) {
        this.prevsongerlist.push(old);
      }
      /** 修改播放器显示状态 */
      if (news) {
        this.setplayerstatus(true);
      }
      /** 开始播放当前歌曲 */
      this.initplayer();
      /** 获取歌曲歌词 */
      this.singerlyric();
      /** 储存歌曲信息到缓存 */
      this.cacheinfo();
    },
    songertimecurrent(news, old) {
      let index = 0;
      for (let i in this.songerlyriclist) {
        index = index + 1;
        if (i === news) {
          this.$refs.scroll.scrollToElement(
            this.$refs.lyricLine[index - 1],
            200,
            true,
            true
          );
        }
      }
    },
    playerlist(news, old) {
      if (news.length > 0) {
        /** 记录列表循环播放 */
        let date = [];
        for (let i = 0; i < this.playerlist.length; i++) {
          date.push(this.playerlist[i]);
        }
        this.songernormallist = date;
      }
    }
  }
};
</script>
<style lang='less' scoped>
@import url("./index.less");
</style>