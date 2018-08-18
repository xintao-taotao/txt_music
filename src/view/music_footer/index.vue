<template>
  <div class="music_footer" :style="{width:music_width}">
    <div class="music_icon_left">
      <p></p>
    </div>
    <div class="music_content">
      {{$t('projectName')}}
    </div>
  </div>
</template>

<script>
import util from '../../mutu/mutu.js'
export default {
  data() {
    return {
      music_width:0
    };
  },
  created(){
    this.music_width=`${document.body.clientWidth}px`;
    util.ajax
    .get("/api/flink")
    .then(rep => {
      console.log(rep);
    });
  }
};
</script>
<style lang='less' scoped>
@import './index.less';
</style>