<template>
  <div class="scroll-songertype">
    <scroll :scrollX="true" :mouseWheel="true">
      <div class="scroll-songertype-div" ref="scroll">
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
          label: '入驻歌手',
          value: 5001
        },{
          label: '华语男歌手',
          value: 1001
        },{
          label: '华语女歌手',
          value: 1002
        },{
          label: '华语组合/乐队',
          value: 1003
        },{
          label: '欧美男歌手',
          value: 2001
        },{
          label: '欧美女歌手',
          value: 2002
        },{
          label: '欧美组合/乐队',
          value: 2003
        },{
          label: '日本男歌手',
          value: 6001
        },{
          label: '日本女歌手',
          value: 6002
        },{
          label: '日本组合/乐队',
          value: 6003
        },{
          label: '韩国男歌手',
          value: 7001
        },{
          label: '韩国女歌手',
          value: 7002
        },{
          label: '韩国组合/乐队',
          value: 7003
        },{
          label: '其他男歌手',
          value: 4001
        },{
          label: '其他女歌手',
          value: 4002
        },{
          label: '其他组合/乐队',
          value: 4003
        }
      ],
      activevalue: 5001
    };
  },
  components:{
    scroll
  },
  methods:{
    /** 处理点击列表的事件 */
    dataemit(item){
      this.activevalue = item.value;
      /** 将数据返回到父级组件 */
      this.$emit('dataemit',item);
    },
    /** 初始化选项滚动宽度 */
    initlistwidth(){
      let width = 0;
      this.$refs.list.forEach((item,index)=>{
        width = width + item.scrollWidth + 57;
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