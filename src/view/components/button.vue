<template>
  <div class="TButton" v-bind:style="{backgroundImage: 'url(' + icon + ')', width: size+'px'}">
    {{title}}
  </div>
</template>

<script>
export default {
  name: 'TButton',
  props: {
    size: {
      type: Number,
      default: 16
    },
    title: {
      default: '确定',
      type: String
    },
    icon :{
      default: '',
      type: String
    }
  },
  data () {
    return {
    };
  },
  created(){
    if(this.size!=16&&this.size!=24&&this.size!=32){
      throw new Error("参数只能是16、24、32中的一个！");
    }
  }
}

</script>
<style lang='less' scoped>
@import url('./components.less');
</style>