<template>
  <div class="home">
    <div class="content">
      <leftnav></leftnav>
      <router-view class="view" />
    </div>
    <player></player>
  </div>
</template>

<script>
import leftnav from "../nav/index";
import player from "../Components/player";
export default {
  data() {
    return {};
  },
  components: {
    leftnav,
    player
  }
};
</script>
<style lang='less' scoped>
@import url('./index.less');
</style>