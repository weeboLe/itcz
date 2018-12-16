<template>
  <div>
    <div id="slider" class="mui-slider">
      <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a class="mui-control-item mui-active" @click="getimglist(0)">
            全部
          </a>
          <a class="mui-control-item" v-for="(item, index) in list" :key="index" @click="getimglist(item.id)">
            {{ item.title }}
          </a>
        </div>
      </div>
    </div>
    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link v-for="item in imglist" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <p class="info-body">{{ item.zhaiyao }}</p>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
  import mui from '../../../node_modules/mui/js/mui.min.js'
  export default {
    data() {
      return {
        list: [],
        imglist: []
      }
    },
    methods: {
      getTopList() {
        this
          .$http.get('api/getimgcategory')
          .then(res => {
            if (res.body.status === 0) {
              this.list = res.body.message
            }
          })
      },
      getimglist(id) {
        this.$http.get('api/getimages/' + id).then(res => {
          this.imglist = res.body.message
        })
      }
    },
    created() {
      this.getTopList()
      this.getimglist(0)
    },
    mounted() {
      mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //减速系数 ，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      })
    }
  }
</script>
<style lang="scss">
  * {
    touch-action: pan-y;
    margin: 0;
    padding: 0;
  }

  .mui-segmented-control.mui-segmented-control-inverted .mui-control-item.mui-active {
    color: #f40;
  }

  .photo-list {
    margin: 0;
    padding: 10px;
    padding-bottom: 0;
    list-style: none;

    li {
      background-color: #ccc;
      text-align: center;
      margin-bottom: 10px;
      box-shadow: 0 0 9px #999;
      position: relative;
    }

    img {
      width: 100%;
      vertical-align: middle;
    }

    img[lazy=loading] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    .info {
      color: #fff;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 104px;
      overflow: hidden;
      padding: 5px;
      .info-title {
        font-size: 14px;
      }

      .info-body {
        font-size: 13px;
        color: #fff;
      }
    }
  }
</style>