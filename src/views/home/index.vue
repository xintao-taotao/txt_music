<template>
  <div class="home">
    <div class="content" :style="{'height': currentsongId ? null : 'inherit'}">
      <leftnav></leftnav>
      <router-view class="view" />
    </div>
    <player></player>
  </div>
</template>

<script>
import leftnav from "../nav/index";
import player from "../Components/player";
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    leftnav,
    player
  },
  computed: {
    ...mapGetters(["currentsongId"])
  }
};
</script>
<style lang='less' scoped>
@import url("./index.less");
</style>