<template>
  <div class="scroll-alphabet">
    <scroll ref="scroll" :mouseWheel="true" class="scroll-divs" title="鼠标上下拖动" :class="playerstatus ? 'minhegiht' : ''">
      <div class="scroll-div" ref="scrolldiv">
        <ul>
          <li v-for="(item,index) in data" :key="index" @click="songername(item)" :class="activevalue === item ? 'activeclass' : 'classnav'">{{item}}</li>
        </ul>
      </div>
    </scroll>
  </div>
</template>

<script>
import scroll from "../scroll/index";
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      data: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "J",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ],
      screenWidth: "",
      screenHeight: "",
      /** 当前用户选择的字母数据 */
      activevalue: ''
    };
  },
  components: {
    scroll
  },
  computed: {
    ...mapGetters([
      "playerstatus"
    ])
  },
  mounted() {
    this.screenWidth = window.screen.width;
    this.screenHeight = window.screen.height;
    let that = this;
    window.onresize = function() {
      that.windowsize();
    };
  },
  methods: {
    songername(item) {
      this.activevalue = item;
      this.$emit("songername", item);
    },
    windowsize() {
      if (this.$refs.scrolldiv) {
        this.screenWidth = window.screen.width;
        this.screenHeight = window.screen.height;
        if (this.screenHeight < this.$refs.scrolldiv.clientHeight - 400) {
          this.$refs.scroll.$el.style.height = this.screenHeight + "px";
        }
      }
    }
  },
  created() {
    this.windowsize();
  }
};
</script>
<style lang='less' scoped>
@import url("./index.less");
</style>