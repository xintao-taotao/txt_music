<template>
  <div class="music" :style="{height:music_height}">
    <Layout>
      <Sider hide-trigger>Sider</Sider>
      <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      music_height:`${document.documentElement.clientHeight}px`,
    };
  }
}

</script>
<style lang='less' scoped>
</style>