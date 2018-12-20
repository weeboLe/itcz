<template>
  <div class="goods-list">
    <router-link class="goods-item" v-for="(item, index) in products" :key="index"
    :to="'/home/goodsinfo/'+item.id">
      <img :src="item.img_url" alt="">
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
     </router-link>
    <mt-button type="danger" size="large" @click="getMorelist">加载更多</mt-button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        products: [],
        page: 1
      }
    },
    created() {
      this.getproducts()
    },
    methods: {
      getproducts() {
        this.$http.get("api/getgoods?pageindex=" + this.page)
        .then(res => { 
          if (res.body.status === 0) {
            this.products = this.products.concat(res.body.message)
          }
        });
      },
      getMorelist(){
        this.page++
        this.getproducts()
      }
    }
  }
</script>
<style lang="scss">
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;

    .goods-item {
      width: 49%;
      border: 1px solid #ccc;
      box-shadow: 0 0 8px #ccc;
      margin: 4px 0;
      padding: 2px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 294px;

      img {
        width: 100%;
      }

      .title {
        font-size: 14px;
      }

      .info {
        background: #eee;

        p {
          margin: 0;
          padding: 5px;
        }

        .price {

          .now {
            color: red;
            font-weight: 400;
            font-size: 16px;
          }

          .old {
            text-decoration: line-through;
            color: #999;
            font-size: 14px;
            margin-left: 10px;
          }
        }

        .sell {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
        }
      }
    }
  }
</style>