<template>
  <div class="goods-list">
    <div class="goods-item" v-for="(item, index) in products" :key="index">
      <img :src="item.img_url" alt="">
      <h1 class="title">小米（Mi）小米Note 16G双网通版</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥899</span>
          <span class="old">￥999</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩60件</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        products: [],
      }
    },
    created() {
      this.getimg()
    },
    methods: {
      getimg() {
        this.$http.get("api/getimages/0").then(res => {
          if (res.body.status === 0) {
            res.body.message.forEach((item, index) => {
              this.products.push({
                img_url: item.img_url
              })
            });
          }
        });
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