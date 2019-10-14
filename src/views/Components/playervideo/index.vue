<template>
  <div class="video">
    <div class="video-content">
      <video
        :src="videoscr"
        @canplay="canplaystatus ? canplay() : null"
        @timeupdate="timeupdate"
        ref="video"
        controls="controls"
      ></video>
      <div :style="{width: videobuffered}"></div>
    </div>
    <img :src="videocoverimage" alt />
  </div>
</template>

<script>
import { mvdetail, mvurl } from "api/video";
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
    return {
      /** 视频标题 */
      title: "",
      /** 视频描述 */
      description: "",
      /** 视频创作者 */
      videoauthior: [],
      /** 视频播放状态 */
      videoplayerstatus: false,
      /** 视频当前播放时间 */
      videoplayercurrenttime: 0,
      /** 视频总时长 */
      videoplayercounttime: 0,
      /** 视频音量大小 */
      videovolume: 1,
      /** 视频封面 */
      videocoverimage: "",
      /** 视频分辨率 */
      videoresolution: [],
      /** 视频发布时间 */
      videotime: "",
      /** 视频详情 */
      videodetail: "",
      /** 当前视频的相关视频 */
      videorelated: [],
      /** 视频分享次数 */
      videoshareCount: 0,
      /** 视频收藏数 */
      videosubCount: 0,
      /** 视频点赞数 */
      videolikeCount: 0,
      /** 视频id */
      videoid: 0,
      /** 视频评论数 */
      videocommentCount: 0,
      /** 视频地址 */
      videoscr: "",
      /** 视频缓冲条的宽度 */
      videobuffered: ''
    };
  },
  methods: {
    /** 初始化播放器 */
    initplayervideo() {
      if (!this.$route.query.mv) {
        return;
      }
      let id = this.videoid | this.$route.query.mv;
      /** 获取视频详情数据 */
      mvdetail(id).then(res => {
        if (res.data.code === 200) {
          let data = res.data.data;
          this.title = data.name;
          this.description = data.desc;
          this.videoplayercounttime = data.duration;
          this.videotime = data.publishTime;
          this.videoshareCount = data.shareCount;
          this.videosubCount = data.subCount;
          this.videolikeCount = data.likeCount;
          this.videoid = data.id;
          this.videocommentCount = data.commentCount;
          this.videoauthior = data.artistName;
          this.videoresolution = data.brs;
          this.videocoverimage = data.cover;
          /** 请求视频播放地址 */
          this.initvideourl();
        } else {
          this.$Message.error("数据异常！");
          this.$router.go(-1);
          return;
        }
      });
    },
    /** 视频当前播放进度 */
    timeupdate() {
      /** 获取缓冲条的宽度 */
      let width = (100 * this.$refs.video.buffered.end(0)) / this.$refs.video.duration;
      this.videobuffered = width + 'px';
    },
    /** 请求视频播放地址 */
    initvideourl() {
      mvurl(this.videoid).then(res => {
        if (res.data.code === 200) {
          let data = res.data.data;
          this.videoscr = data.url;
        }
      });
    },
    /** 视频准备完成之后 */
    canplay() {
      console.log("视频准备完成");
    }
  },
  created() {
    /** 初始化播放器 */
    this.initplayervideo();
  }
};
</script>
<style lang='less' scoped>
@import url("./index.less");
</style>