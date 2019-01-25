<template>
  <div>
    <song-list :column="column" :data="data" :loading='loading'></song-list>
  </div>
</template>

<script>
import {getrecommend} from 'api/songlist'
export default {
  name:'home',
  data () {
    return {
      column:[
        {
          key: 'eventName',
          title: 'asdasd'
        }, {
          key: 'pama',
          title: 'asdasd'
        }
      ],
      loading:true,
      data:[]
    };
  },
  created(){
    getrecommend().then(({data,status})=>{
      if(status==200){
        data.list.forEach(item=>{
          this.data.push({
            eventName:item.description,
            pama:item.name
          })
        })
        this.loading=false;
      }
    })
  }
}

</script>
<style lang='less' scoped>
</style>