<template>
  <div>
    <!-- <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item, index) in lunbotuLIst" :key="index">
        <img :src="item.img" alt="">
      </mt-swipe-item>
    </mt-swipe> -->
    <swiper :lunbotuLIst="lunbotuLIst" :isfull="true">

    </swiper>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/list">
          <img src="../../images/menu1(1).png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photos">
          <img src="../../images/menu6.png" alt="">
          <div class="mui-media-body">图片共享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="../../images/menu2.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/">
          <img src="../../images/menu3.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/">
          <img src="../../images/menu4.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/">
          <img src="../../images/menu5.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import swiper from '../common/swipe'
  export default {
    data() {
      return {
        lunbotuLIst: []
      }
    },
    created() {
      this.getLunbotu()
    },
    methods: {
      getLunbotu() {
        this.$http.get('api/getlunbo')
          .then(result => {
            if (result.body.status === 0) {
             this.lunbotuLIst = result.body.message
            } else {

            }
          })
      }
    },
    components:{
      swiper
    }
  }
</script>
<style lang="scss" scoped>
  .mint-swipe {
    height: 200px;

    .mint-swipe-item {
      &:nth-child(1) {
        background-color: red;
      }

      &:nth-child(2) {
        background-color: skyblue;
      }

      &:nth-child(3) {
        background-color: hotpink;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  h1 {
    text-align: center;
  }

  .mui-grid-view.mui-grid-9 {
    border: 0;
    background-color: #fff;

    .mui-table-view-cell {
      border: 0;
        width: calc(100%/3);
      img {
        width: 65%;
        height: 60px;
      }

      .mui-media-body {
        font-size: 14px;
      }
    }
  }
</style>