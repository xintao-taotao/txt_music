<template>
  <div>
    <div class="input" v-if="icon=='user'">
      <span class="icon iconfont icon_style">&#xe623;</span>
      <input :type="type" v-model="value" :placeholder="placeholder" :style="getInputStyle">
    </div>
    <div class="input" v-else-if="icon=='pwd'">
      <span class="icon iconfont icon_style">&#xe603;</span>
      <input :type="type" v-model="value" :placeholder="placeholder" :style="getInputStyle">
    </div>
  </div>
</template>

<script>
export default {
  name:'Tinput',
  props:{
    width:{
      type: Number,
      default: 140
    },
    type:{
      type: String,
      default:'text'
    },
    placeholder:{
      type: String,
      default:''
    },
    icon:{
      type: String,
      default: ''
    }
  },
  data () {
    return {
      value:'',
      input:'input'
    };
  },
  computed:{
    getInputStyle(){
      let style = {
        width: this.width == 0 ? '100%' : this.width + 'px',
        padding: '0px 10px'
      };
      return style;
    }
  }
}

</script>
<style lang='less' scoped>
@import url('./components.less');
</style>