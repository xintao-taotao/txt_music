<template>
  <div class="home">
    <leftnav></leftnav>
    <router-view class="view"/>
  </div>
</template>

<script>
import leftnav from "../nav/index";
export default {
  data() {
    return {};
  },
  components: {
    leftnav
  }
};
</script>
<style lang='less' scoped>
.home {
  height: 100%;
  display: flex;
}
.view{
  padding: 45px 9.54%;
  box-sizing: border-box;
  width: 82.43%;
}
</style>