<template>
  <div>
    <mip-img :src="require('./static/mip-logo.png')"></mip-img>
    {{ name }}
  </div>
</template>

<style lang="less" scoped>
@import './mix.less';
mip-img {
  font-size: 12px;
  div {
    border: 1px solid #fff;
  }
}
</style>

<script>
// import './index.js'
export default {
  data () {
    return {
      name: 'test-vue'
    }
  }
}
</script>
