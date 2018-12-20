<template>
  <mt-swipe :auto="4000">
    <mt-swipe-item v-for="(item, index) in lunbotuLIst" :key="index">
      <img :src="item.img || item.src" alt="" :class="{'src': isfull}">
    </mt-swipe-item>
  </mt-swipe>
</template>
<script>
  export default {
    props: ['lunbotuLIst', 'isfull']
  }
</script>
<style lang="scss">
  .mint-swipe {
    height: 200px;

    .mint-swipe-item {
      background: #fff;
      text-align: center;

      img {
        height: 100%;
        width: auto;
      }

      .src {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>