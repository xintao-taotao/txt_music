<template>
  <transition name="fade">
    <div class="loading" v-show="show">
      <div class="loading-content typing_loader"></div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang='less' scoped>
@import url("./index.less");
</style>