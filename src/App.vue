<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    if (localStorage.getItem("warning") != "true") {
      this.$Notice.warning({
        title: "<div style='color:red'>本网站不得用于任何盈利行为</div>",
        desc:
          "本网站所有数据均由GitHub网站的<a href='https://github.com/Binaryify/NeteaseCloudMusicApi'>https://github.com/Binaryify/NeteaseCloudMusicApi</a>项目中的node项目数据，不允许将本网站用于任何盈利，如有非法行为，均与本项目作者无关！本项目只用于学习交流！",
        duration: 0,
        onClose: () => {
          localStorage.setItem("warning", true);
        }
      });
    }
    if (localStorage.getItem("data") != "true") {
      this.$Notice.warning({
        title: "网站数据延迟警告",
        desc:
          "本网站所有数据均有10分钟的延迟，如果发现网站数据没有更新，请耐心等待！",
        duration: 0,
        onClose: () => {
          localStorage.setItem("data", true);
        }
      });
    }
  }
};
</script>

<style lang="less">
#app {
  height: 100%;
  max-width: 1920px;
  margin: auto;
}
</style>
