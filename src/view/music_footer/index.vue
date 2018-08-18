<template>
  <div class="music_footer" :style="{width:music_width}">
    <div class="music_icon_left">
      <p></p>
    </div>
    <div style="margin:auto;width:1300px;height:100%;">
      <div class="music_content">
        {{$t('projectName')}}
      </div>
      <div class="icon_music_list">
        <div class="music_list">
          <div class="music_body">
            <ul>
              <li v-for="item in music_list" :key="item.id">{{item.name+"   歌唱者："+item.singer}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from '../../mutu/mutu.js'
import axios from 'axios'
export default {
  data() {
    return {
      music_width:0,
      music_list:[]
    };
  },
  created(){
    this.music_width=`${document.body.clientWidth}px`;
    axios.get('/static/data.json')
    .then(rep => {
      this.music_list=rep.data.music.all;
    })
  },
  mounted(){
    
  }
};
</script>
<style lang='less' scoped>
@import './index.less';
@import '../public/public.less';
</style>