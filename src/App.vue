<template>
  <div class="app-container">
    <mt-header fixed title="Vue个人项目">
      <span slot="left" @click="goback" v-show="flag">
        <mt-button icon="back">back</mt-button>
      </span>
    </mt-header>
    <transition name="app">
      <router-view></router-view>
    </transition>
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item1" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item1" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item1" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{$store.getters.getgoodsmont.count}}</span></span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item1" to="/search">
        <span class="mui-icon  mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        flag: false
      }
    },
    created() {
     this.flag =  this.$route.path === '/home' ? this.flag : !this.flag
    },
    methods: {
      goback() {
        this.$router.go(-1)
      }
    },
    watch: {
      '$route.path': function (r) {
        if (r == '/home') {
          this.flag = false
        } else {
          this.flag = true
        }


      }
    },
  }
</script>
<style>
  * {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
  }

  body {
    background-color: #fff !important;
  }

  .app-container {
    padding-top: 40px;
    padding-bottom: 50px;
    overflow-x: hidden;
  }

  .mint-header.is-fixed {
    z-index: 99;
    background: #f40 !important;
  }
  .app-enter {
    opacity: 0;
    transform: translateX(100%);
    position: absolute;
  }

  .app-leave-to {
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
  }

  .app-enter-active {
    transition: all .3s ease;
  }

  .app-leave-active {
    transition: all .2s ease;
  }

  .mui-bar-tab .mui-tab-item1 {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #ccc;
  }

  .mui-bar-tab .mui-tab-item1 .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .mui-bar-tab .mui-tab-item1 .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .mui-bar-tab .mui-tab-item1.mui-active {
    color: #f40;
  }
</style>