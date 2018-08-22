<template>
  <Layout class="music" :style="{height:music_width}">
    <Sider hide-trigger>Sider</Sider>
    <Layout>
      <Header>Header</Header>
      <Content>Content</Content>
    </Layout>
  </Layout>
</template>

<script>
export default {
  data () {
    return {
      music_width:0
    };
  },
  created(){
    this.music_width = `${document.documentElement.clientHeight}px`;
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.music_width = `${document.documentElement.clientHeight}px`;
        that.music_width = window.music_width;
      })();
    };
  },
  watch: {
    music_width(val) {
      if (!this.timer) {
        this.music_width = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          that.timer = false;
        }, 400);
      }
    }
  },
}

</script>
<style lang='less' scoped>
</style>