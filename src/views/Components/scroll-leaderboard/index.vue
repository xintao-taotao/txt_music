<template>
  <div class="scroll-leaderboard">
    <scroll :scrollX="true" :mouseWheel="true">
      <div class="scroll-leaderboard-div" ref="scroll">
        <ul>
          <li v-for="(item,index) in listdata" :key="index" @click="dataemit(item)" ref="list" :class="activevalue === item.value ? 'activeclass' : 'classnav'">
            <i>{{item.label}}</i>
          </li>
        </ul>
      </div>
    </scroll>
  </div>
</template>

<script>
import scroll from '../scroll/index'
export default {
  data () {
    return {
      listdata: [
        {
          label: '云音乐新歌榜',
          value: 0
        },{
          label: '云音乐热歌榜',
          value: 1
        },{
          label: '网易原创歌曲榜',
          value: 2
        },{
          label: '云音乐飙升榜',
          value: 3
        },{
          label: '云音乐电音榜',
          value: 4
        },{
          label: 'UK排行榜周榜',
          value: 5
        },{
          label: '美国Billboard周榜',
          value: 6
        },{
          label: 'KTV嗨榜',
          value: 7
        },{
          label: 'iTunes榜',
          value: 8
        },{
          label: 'Hit FM Top榜',
          value: 9
        },{
          label: '日本Oricon周榜',
          value: 10
        },{
          label: '韩国Melon排行榜周榜',
          value: 11
        },{
          label: '韩国Mnet排行榜周榜',
          value: 12
        },{
          label: '韩国Melon原声周榜',
          value: 13
        },{
          label: '中国TOP排行榜(港台榜)',
          value: 14
        },{
          label: '中国TOP排行榜(内地榜)',
          value: 15
        },{
          label: '香港电台中文歌曲龙虎榜',
          value: 16
        },{
          label: '华语金曲榜',
          value: 17
        },{
          label: '中国嘻哈榜',
          value: 18
        },{
          label: '法国 NRJ EuroHot 30周榜',
          value: 19
        },{
          label: '台湾Hito排行榜',
          value: 20
        },{
          label: 'Beatport全球电子舞曲榜',
          value: 21
        },{
          label: '云音乐ACG音乐榜',
          value: 22
        },{
          label: '云音乐说唱榜',
          value: 23
        },{
          label: '云音乐古典音乐榜',
          value: 24
        },{
          label: '云音乐电音榜',
          value: 25
        },{
          label: '抖音排行榜',
          value: 26
        },{
          label: '新声榜',
          value: 27
        },{
          label: '云音乐韩语榜',
          value: 28
        },{
          label: '英国Q杂志中文版周榜',
          value: 29
        },{
          label: '电竞音乐榜',
          value: 30
        },{
          label: '云音乐欧美热歌榜',
          value: 31
        },{
          label: '云音乐欧美新歌榜',
          value: 32
        },{
          label: '说唱TOP榜',
          value: 33
        }
      ],
      activevalue: 0
    };
  },
  components:{
    scroll
  },
  methods:{
    /** 处理点击列表的事件 */
    dataemit(item){
      this.activevalue = item.value === this.activevalue ? 0 : item.value;
      /** 将数据返回到父级组件 */
      this.$emit('dataemit',item);
    },
    /** 初始化选项滚动宽度 */
    initlistwidth(){
      let width = 0;
      this.$refs.list.forEach((item,index)=>{
        width = width + item.scrollWidth + 77;
      })
      this.$refs.scroll.style.width = width + 'px';
    }
  },
  created(){
    /** 初始化选项滚动宽度 */
    this.$nextTick(() => {
      this.initlistwidth();
    });
  }
}

</script>
<style lang='less' scoped>
@import url('./index.less');
</style>