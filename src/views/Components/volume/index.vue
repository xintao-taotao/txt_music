<template>
  <div class="volume" @click.stop="modifystatus">
    <div class="volume-circular-ctn" v-show="volume">
      <div>
        <div class="volume-circular-bgcolor"></div>
        <div class="volume-circular" @mousedown.stop="scroll">
          <i>{{positionX}}</i>
        </div>
        <div class="volume-circular-height"></div>
      </div>
    </div>
    <div class="volume-img">
      <img src="../../../images/big_maximum_volume.png" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      /** 位移位置 */
      positionX: 100,
      /** 操作状态 */
      status: false,
      /** 音量调节是否显示 */
      volume: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      /** 监听addEventListene事件 */
      document.addEventListener("click", this.closevolume);
    });
  },
  methods: {
    /** 修改volume状态 */
    modifystatus() {
      this.volume = true;
    },
    /** 监听addEventListene事件 */
    closevolume() {
      if (!this.status) {
        this.volume = false;
      }
    },
    /** 滚动调节音量大小事件 */
    scroll(e) {
      let div = e.target;
      let disY = e.clientY - div.offsetTop;
      this.status = true;
      document.onmousemove = e => {
        let top = e.clientY - disY;
        /** 如果位移的位置超过了父级元素，则不位移 */
        if (top < 0 || top > 100) {
          return;
        }
        this.positionX = top;
        /** 位移 */
        div.style.top = top + "px";
        let count;
        if (this.positionX.toString().length === 3) {
          count = 1;
        } else if (this.positionX.toString().length === 2) {
          count = `0.${this.positionX}`;
        } else if (this.positionX.toString().length === 1) {
          count = `0.0${this.positionX}`;
        }
        count = parseFloat(count);
        this.$emit("position", count);
      };
      document.onmouseup = e => {
        document.onmousemove = null;
        document.onmouseup = null;
        this.status = false;
      };
    }
  }
};
</script>

<style>
@import url("./index.less");
</style>