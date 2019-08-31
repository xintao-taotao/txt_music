<template>
  <div class="scroll-alphabet">
    <scroll ref="scroll">
      <div class="scroll-div" ref="scrolldiv">
        <ul>
          <li v-for="(item,index) in data" :key="index" @click="songername(item)">{{item}}</li>
        </ul>
      </div>
    </scroll>
  </div>
</template>

<script>
import scroll from "../scroll/index";
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
      screenHeight: ""
    };
  },
  components: {
    scroll
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
      this.$emit("songername", item);
    },
    windowsize() {
      this.screenWidth = window.screen.width;
      this.screenHeight = window.screen.height;
      if (this.screenHeight < this.$refs.scrolldiv.clientHeight - 400) {
        this.$refs.scroll.$el.style.height = this.screenHeight + "px";
      }
    }
  },
  created(){
    this.windowsize();
  }
};
</script>
<style lang='less' scoped>
@import url("./index.less");
</style>