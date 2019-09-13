<template>
  <div class="singer-details">
    <div class="singer-header">
      <div class="singer-back">
        <img src="../../images/Buttons-Random@2x.png" />
      </div>
      <div class="singer-header-ctn">
        <div class="singer-info">
          <div class="singer-avatar">
            <img v-lazy="singeravatar" />
          </div>
          <div class="singer-name">
            <h5>{{singername}}</h5>
            <span>{{singeralias}}</span>
          </div>
        </div>
        <div class="singer-btn-list">
          <img src="../../images/random-btn.png">
          <img src="../../images/play-btn.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { singerdetails } from "api/songs";
export default {
  data() {
    return {
      singerid: 0,
      singeravatar: null,
      singername: '',
      singeralias: []
    };
  },
  methods: {
    selectsingdetails() {
      this.singerid = this.$route.query.songerid;
      singerdetails(this.singerid).then(res => {
        if(res.data.code === 200){
          let data = res.data;
          this.singeravatar = data.artist.img1v1Url;
          this.singername = data.artist.name;
          this.singeralias = data.artist.alias;
        }
      });
    }
  },
  created() {
    if (this.$route.query.songerid) {
      /** 查询歌手 */
      this.selectsingdetails();
    }
  }
};
</script>
<style lang='less' scoped>
@import url("./index.less");
</style>