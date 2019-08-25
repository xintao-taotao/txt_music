<template>
  <div class="scroll" ref="myscroll">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    dblclick: {
      type: Boolean | Object,
      default: true
    },
    freeScroll: {
      type: Boolean,
      default: false
    },
    bounce: {
      type: Boolean,
      default: false
    },
    bounceTime: {
      type: Number,
      default: 800
    }
  },
  data() {
    return {};
  },
  mounted() {
    setTimeout(() => {
      this.initscroll();
    }, 20);
  },
  methods: {
    initscroll() {
      if (!this.$refs.myscroll) {
        return;
      }
      this.scroll = new BScroll(this.$refs.myscroll, {
        probeType: this.probeType,
        click: this.click,
        dblclick: this.dblclick,
        freeScroll: this.freeScroll,
        bounce: this.bounce,
        bounceTime: this.bounceTime
      });
    },
    enable() {
      this.scroll && this.scroll.enable();
    },
    disable() {
      this.scroll && this.scroll.disable();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.initscroll();
      }, 20);
    }
  }
};
</script>
<style lang='less' scoped>
@import url("./index.less");
</style>