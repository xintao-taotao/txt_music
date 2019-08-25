<template>
  <div class="scroll-alphabet">
    <scroll>
      <ul>
        <li v-for="(item,index) in data" :key="index" @click="songername(item)">{{item}}</li>
      </ul>
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
      ]
    };
  },
  components: {
    scroll
  },
  methods: {
    songername(item) {
      this.$emit("songername", item);
    }
  }
};
</script>
<style lang='less' scoped>
@import url("./index.less");
</style>