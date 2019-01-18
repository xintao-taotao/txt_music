<template>
  <div class="login" :style="style">
    <div class="login_content">
      <tinput icon="user" :width="150" type="text" class="user"></tinput>
      <tinput icon="pwd" :width="150" type="password" class="user"></tinput>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      height:document.documentElement.clientHeight + "px"
    };
  },
  computed:{
    style(){
      let style = {
        height:this.height
      };
      return style;
    }
  },
  created(){
    console.log(this.$store.getters.getcolor);
    window.addEventListener("resize", this.resizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeHandler);
  },
  methods:{
    resizeHandler(){
      this.height = document.documentElement.clientHeight + "px";
    }
  },
}

</script>
<style lang='less' scoped>
@import url('./login.less');
</style>