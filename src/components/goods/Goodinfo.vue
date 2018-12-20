<template>
  <div class="goodsinfo-container">
    <!-- 购物车小球 -->
    <transition @before-enter="beforEenter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <!-- 商品轮播区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <piclist :lunbotuLIst="picimg" :isfull="false"></piclist>
        </div>
      </div>
    </div>
    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsinfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:<del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;&nbsp;销售:<span class="my-price">￥{{
              goodsinfo.sell_price }}</span>
          </p>
          <p>购买数量：<boxnumber @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></boxnumber>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addtoshopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsinfo.goods_no }} </p>
          <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
          <p>上架时间：{{ goodsinfo.add_time | dateFormat }} </p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>

  </div>
</template>
<script>
  import piclist from '../common/swipe'
  import boxnumber from '../common/number.vue'
  export default {
    data() {
      return {
        id: this.$route.params.id,
        picimg: [], //轮播图数据
        goodsinfo: {}, // 商品信息
        ballFlag: false, // 小球的表示符
        selectCount: 1 //默认商品数量
      }
    },
    created() {
      this.getlunbotu()
      this.getgoodinfo()
      // test
    },
    methods: {
      // 获取页面轮播图
      getlunbotu() {
        this.$http.get('api/getthumimages/' + this.id).then(res => {
          if (res.body.status === 0) {
            this.picimg = res.body.message
          }
        })
      },
      // 获取商品的额信息
      getgoodinfo() {
        this.$http.get('api/goods/getinfo/' + this.id)
          .then(res => {
            if (res.body.status === 0) {
              this.goodsinfo = res.body.message[0]
            }
          })
      },
      // 跳转到商品详情页面
      goDesc(id) {
        this.$router.push({
          name: 'goodinfo',
          params: {
            id
          }
        })
      },
      // 跳转到商品评价页面 
      goComment(id) {
        this.$router.push({
          name: 'goodcomment',
          params: {
            id
          }
        })
      },
      // 添加到购物车
      addtoshopCar() {
        this.ballFlag = !this.ballFlag
        //{id: 商品的id, count: 购买的数量, price: 商品的单价, selected: 是否选中}
        let datacar = {
          id: this.id,
          count: this.selectCount,
          price: this.goodsinfo.sell_price,
          selected: true
        }
        this.$store.commit('addTocar',datacar)
      },
      //  小球动画
      beforEenter(el) {
        el.style.transform = 'translate(0, 0)'
      },
      enter(el, done) {
        el.offsetWidth
        const ballposition = this.$refs.ball.getBoundingClientRect()
        const badgepostion = document.getElementById('badge').getBoundingClientRect()
        const x = badgepostion.left - ballposition.left
        const y = badgepostion.top - ballposition.top
        el.style.transform = `translate(${x}px, ${y}px)`
        el.style.transition = 'all .5s ease'
        done()
      },
      afterEnter(el) {
        this.ballFlag = !this.ballFlag
      },
      getSelectedCount(count) {
        this.selectCount = count
      }
    },
    components: {
      piclist,
      boxnumber
    }
  }
</script>
<style lang="scss">
  .goodsinfo-container {
    background: #eee;
    overflow: hidden;

    .my-price {
      color: red;
      font-size: 16px;
    }

    .mui-card-footer {
      display: block;

      button {
        margin: 15px 0;
      }
    }

    .ball {
      position: absolute;
      width: 15px;
      height: 15px;
      top: 408px;
      left: 145px;
      background: red;
      border-radius: 50%;
      z-index: 99;
    }

  }
</style>