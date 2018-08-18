<template>
  <div class="page">
    <div class="music_footer" :style="{width:music_width}">
      <div class="music_icon_left">
        <p></p>
      </div>
      <div class="music_content">
        {{$t('projectName')}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      music_width:0
    };
  },
  created(){
    this.music_width=`${document.body.clientWidth}px`;
  }
}

</script>
<style lang='less' scoped>
@import './index.less';
@import '../public/public.less';
</style>