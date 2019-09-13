<template>
  <div class="player" :class="variablebackground">
    <div class="song-info-songer-info">
      <div class="songer-avatar">
        <img v-lazy alt="名字" />
      </div>
      <div class="song-info">
        <h5>歌曲名字</h5>
        <span>歌手名字</span>
      </div>
    </div>
    <div class="player-operating">
      <div class="player-prev" title="下一首">
        <img src="../../../images/big_prev.png" />
      </div>
      <div class="play-pause" title="下一首">
        <img src="../../../images/big_play.png" />
      </div>
      <div class="player-next" title="下一首">
        <img src="../../../images/big_next.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backgroundcolor: ["#596B9F", "#3F4F56", "#60ABC3", "#9A525D", "#302C57"],
      variablebackground: "play-bgcolor"
    };
  },
  methods: {
    initplayerbackgroundcolor() {
      let count = Math.ceil(Math.random() * this.backgroundcolor.length);
      if (count === 0) {
        this.initplayerbackgroundcolor();
      } else {
        this.variablebackground = this.variablebackground + count;
      }
    }
  },
  created() {
    /** 初始化播放器背景色（随机） */
    this.initplayerbackgroundcolor();
  }
};
</script>
<style lang='less' scoped>
@import url("./index.less");
</style>