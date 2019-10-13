<template>
  <div class="video">
    <video
      src="http://vodkgeyttp8.vod.126.net/cloudmusic/MjQ3NDQ3MjUw/89a6a279dc2acfcd068b45ce72b1f560/533e4183a709699d566180ed0cd9abe9.mp4?wsSecret=07abed063c182a3b79db120805dd65c4&wsTime=1570904264"
      @canplay="canplaystatus ? canplay() : null"
      ref="video"
    ></video>
  </div>
</template>

<script>
export default {
  props: {
    /** 传入视频的宽度 */
    width: {
      type: Number
    },
    /** 传入视频的高度 */
    height: {
      type: Number
    },
    /** 视频准备就绪之后是否直接播放 */
    canplaystatus: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  methods: {
    /** 视频准备完毕之后 */
    canplay() {
      console.log("准备完毕");
      var progress = parseInt(
        (this.$refs.video.currentTime / this.$refs.video.duration) * 100
      );
      var totleTime = this.getDetailtime(this.$refs.video.duration);
      var crtTime = this.getDetailtime(this.$refs.video.currentTime);
      var buffered = this.$refs.video.buffered.end(0);
      for (var i = 0; i < this.$refs.video.buffered.length; i++) {
        if (this.$refs.video.currentTime < this.$refs.video.buffered.end(i)) {
          buffered = this.$refs.video.buffered.end(i);
          break;
        }
      }
      var buff_pro = parseInt((buffered / this.$refs.video.duration) * 100);
      console.log(buff_pro);
    },
    getDetailtime(time) {
      time = Math.ceil(time);
      var timeStr = "";
      var hour = Math.floor(time / 3600);
      var minute = Math.floor((time - hour * 3600) / 60);
      var second = time % 60;
      if (hour < 10) {
        timeStr += "0" + hour + ":";
      } else {
        timeStr += hour + ":";
      }
      if (minute < 10) {
        timeStr += "0" + minute + ":";
      } else {
        timeStr += minute + ":";
      }
      if (second < 10) {
        timeStr += "0" + second;
      } else {
        timeStr += second;
      }
      return timeStr;
    }
  }
};
</script>
<style lang='less' scoped>
@import url("./index.less");
</style>