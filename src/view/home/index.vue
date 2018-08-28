<template>
  <div class="home_content">

  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  created(){
    util.vue = this;
    util.title(
      this.$t("projectName") +
        "-" +
        this.$t('')
    );
  }
}

</script>
<style lang='less' scoped>
</style>