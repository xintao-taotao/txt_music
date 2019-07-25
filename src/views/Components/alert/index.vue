<template>
  <div class="toast" v-if="show">
    <div class="box">
      <div class="title">{{title}}</div>
      <div class="content">{{content}}</div>
      <div class="btn" @click="callback()">{{btn}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      show: true
    };
  }
};
</script>

<style scoped>
.toast {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  font-size: 14px;
}
.box {
  height: 130px;
  width: 240px;
  border: 1px solid #ccc;
  border-radius: 4px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.title,
.content {
  line-height: 30px;
  padding: 0 10px;
}
.title {
  color: #666;
  border-bottom: 1px solid #ccc;
}
.btn {
  display: inline-block;
  padding: 4px 10px;
  color: gray;
  border: 1px solid #ccc;
  border-radius: 2px;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%);
  cursor: pointer;
}
</style>