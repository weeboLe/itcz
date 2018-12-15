<template>
  <div class="">
      <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="(item, index) in list" :key="index">
        <router-link :to="'/home/info/'+ item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
           <h2>{{ item.title }}</h2>
            <p class='mui-ellipsis'>
              <span>发表时间：{{ item.add_time  | dateFormat }}</span>
              <span>点击：{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
  export default {
    data() {
      return {
        list: []
      }
    },
    created() {
      this.gitlist()
    },
    methods: {
      gitlist() {
        this.$http.get('api/getnewslist').then(result => {
          if (result.body.status === 0) {
            this.list = result.body.message
          } else {
            Toast('获取新闻列表失败')
          }
        })
      }
    }
  }
</script>
<style lang="scss">
.mui-table-view {
  li {
    h2 {
      font-size: 14px;
      font-weight: 400;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: #226aff;
      display: flex;
      justify-content: space-between;
    }
  }
}

</style>