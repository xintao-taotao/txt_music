<template>
  <div class="input">
    <input :type="text">
  </div>
</template>

<script>
export default {
  props:{
    type: {
      type: String,
      default: 'text'
    }
  },
  data () {
    return {
    };
  },
}

</script>
<style lang='less' scoped>
</style>