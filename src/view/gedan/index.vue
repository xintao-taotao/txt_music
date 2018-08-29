<template>
  <div class="gedan">
    <ul>
      <li v-for="item in geshoulist" :key="item.id" @click="geshou(item.id)">
        <span>
          <img :src="item.img" :alt="item.name">
        </span>
        <p>{{item.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import util from '../../mutu/mutu.js'
import axios from 'axios'
export default {
  data () {
    return {
      geshoulist:[]
    };
  },
  created(){
    axios.get('http://localhost:3000/toplist/artist')
    .then(rep=>{
      var data=rep.data.list.artists;
      data.forEach(item=>{
        this.geshoulist.push({
          id:item.id,
          img:item.img1v1Url,
          name:item.name
        })
      })
      console.log(this.geshoulist);
    })
  },
  methods:{
    geshou(id){
      // axios.get('http://localhost:3000/artists?id='+id+'')
      // .then(rep=>{
      //   var data=rep.data;
      //   console.log(data);
      // })
      this.$router.push({
        path: '/geshou',
        query:{
          id:id
        }
      })
    }
  }
}

</script>
<style lang='less' scoped>
</style>