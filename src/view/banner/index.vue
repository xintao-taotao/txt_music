<template>
  <div class="banner">
    <Carousel autoplay v-model="banner_index" loop :autoplay-speed="autoplaySpeed" arrow="hover">
      <CarouselItem v-for="item in img_data" :key="item.id">
        <img :src="item.url" :alt="item.alt" :title="item.title" width="100%" height="680px">
      </CarouselItem>
    </Carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      banner_index:0,
      img_data:[
        {
          url:require('../../assets/images/banner2.jpg'),
          id:1,
          title:'banner',
          alt:'banner'
        },{
          url:require('../../assets/images/banner1.jpg'),
          id:2,
          title:'banner',
          alt:'banner'
        }
      ],
      autoplaySpeed: 3000,
    };
  }
}

</script>
<style lang='less' scoped>
@import url('./index.less');
</style>