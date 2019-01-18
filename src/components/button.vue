<template>
  <button class="button" :style="string" @click="click">{{title}}</button>
</template>

<script>
export default {
  name:'Tbutton',
  props:{
    long:{
      type: Boolean,
      default:false
    },
    title:{
      type: String,
      default: ''
    },
    color:{
      type: String,
      default: ''
    }
  },
  data () {
    return {
    };
  },
  computed:{
    string(){
      let style = {};
      if(this.long){
        style['width']='100%';
      }
      if(this.color){
        style['backgroundColor']=this.color;
      }else{
        style['backgroundColor']=this.$store.getters.getcolor;
      }
      style['padding']='8px';
      return style;
    }
  },
  methods:{
    click(){
      this.$emit('isclick')
    }
  }
}

</script>
<style lang='less' scoped>
@import url('./components.less');
</style>