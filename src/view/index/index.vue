<template>
  <div class="page">
    <musicfooter></musicfooter>
    <a href='javascript:void(0)' @click='changeLang("zh-CN")'>中文</a> | <a href='javascript:void(0)' @click='changeLang("en-US")'>English</a>
  </div>
</template>

<script>
import musicfooter from '../music_footer/index'
import util from '../../mutu/mutu.js'
export default {
  components: {
    musicfooter
  },
  data () {
    return {
      
    };
  },
  created(){
    
  },
  methods:{
    changeLang(lang) {
      this.$store.commit("switchLang", lang);
      util.title(
        this.$t("projectName") +
          "-" +
          this.$t(this.breadItems[this.breadItems.length - 1].name)
      );
    }
  }
}

</script>
<style lang='less' scoped>
@import './index.less';
@import '../public/public.less';
</style>