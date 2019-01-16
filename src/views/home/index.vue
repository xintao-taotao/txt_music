<template>
  <div>
    <song-list></song-list>
  </div>
</template>

<script>
import {getrecommend} from '../../api/songlist'
export default {
  name:'home',
  data () {
    return {
    };
  },
  created(){
    getrecommend().then(({code,data,status})=>{
      console.log(data);
      console.log(code);
      console.log(status);
    })
  }
}

</script>
<style lang='less' scoped>
</style>