<!--  -->
<template>
  <div class="txt-model">
    <button class="type1" @click="showVuePopup(true)">vue transition</button>
    <!-- 方法二：通过vue的transition配合css3动画实现  -->
    <div class="txt-model-domContent">
      <div class="txt-model-mask" v-show="myValue" @click="showVuePopup(false)">
        <transition name="slide">
          <div class="txt-model-close" v-if="closable">
            
          </div>
          <div class="txt-model-content" v-show="myValue" :class="centered ? 'centered' : null">
            <div class="txt-model-header">

            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Model",
  props: {
    /** v-model */
    value: {
      type: Boolean,
      default: false
    },
    /** 是否垂直水平居中 */
    centered: {
      type: Boolean,
      default: false
    },
    /** 对话框标题 */
    title: {
      type: String,
      default: '对话框标题'
    },
    /** 是否显示对话框关闭按钮，ESC按键也随之关闭 */
    closable: {
      type: Boolean,
      default: true
    },
    /** 是否允许点击遮罩层关闭 */
    maskClosable: {
      type: Boolean,
      default: true
    },
    
  },
  data() {
    return {
      myValue: false
    };
  },
  methods: {
    showVuePopup(flag) {
      console.log(this.myValue);
      this.myValue = flag;
      console.log(this.myValue);
    }
  },
  watch: {
    value(newVal) {
      this.myValue = newVal;
    },
    myValue(newVal) {
      if (!newVal) {
        this.$emit("on-cancel");
      }
      this.$emit("input", newVal);
    }
  }
};
</script>
<style lang='less' scoped>
@import url('./index.less');
</style>