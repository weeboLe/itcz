<template>
  <div class="shopcar-containeer">
    <!-- 购物车商品 -->
    <div class="mui-card goods-list" v-for="(item, index) in goodlist" :key="index">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <mt-switch v-model="$store.getters.getselected[item.id]" @change="selectedChanged(item.id, $store.getters.getselected[item.id])"></mt-switch>
          <img :src="item.thumb_path">
          <div class="info">
            <h2>{{item.title}}</h2>
            <p>
              <span class="price">￥{{item.sell_price}}</span>
              <shopcarnum style="height: 30px;" :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></shopcarnum>
              <a href="#" @click="delgoods(item.id, index)">删除</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 结算区域 -->
    <div class="mui-card jiesuan">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="left">
            <p>总计(不含运费)</p>
            <p>已购商品 <span class="count"> {{$store.getters.getgoodsmont.count}} </span> 件, 总价 ￥ <span class="prc"> {{ $store.getters.getgoodsmont.amount }} </span> </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
          
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import shopcarnum from '../common/shopcarnum.vue'
  export default {
    data() {
      return {
        goodlist: []
      }
    },
    created() {
      this.getList()
    },
    mounted() {},
    methods: {
      getList() {
        var idArr = [] // 用来存放商品中的id
        this.$store.state.car.forEach(item => idArr.push(item.id))
        if (idArr.length <= 0) {
          return
        }
        this.$http.get('api/goods/getshopcarlist/' + idArr.join(','))
          .then(res => {
            if (res.body.status === 0) {
              this.goodlist = res.body.message
            }
          })
      },
      delgoods(id, index) {
        this.goodlist.splice(index, 1)
        this.$store.commit('deldata', id)
      },
      selectedChanged(id, selected){

        this.$store.commit('selectedChange',{id,selected})
        
      }
    },
    components: {
      shopcarnum,
    }
  }
</script>
<style lang="scss">
  .shopcar-containeer {
    background: #eee;
    overflow: hidden;

    .goods-list {
      display: flex;

      .mui-card-content {
        width: 100%;
      }

      .mui-card-content-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      img {
        width: 60px;
        height: 60px;
      }

      h2 {
        font-size: 13px;
      }

      .info {
        display: flex;
        flex-direction: column;

        .price {
          color: red;
        }

        p {
          display: flex;
          align-items: center;
        }
      }
    }

    .jiesuan {
      .mui-card-content-inner {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
          span {
            color: red;
            font-size: 16px;
          }
        }
      }
    }
  }
</style>