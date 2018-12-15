<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入内容(最多120字)" maxlength="120"></textarea>
    <mt-button type="primary" size="large">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, index) in comments" :key="index">
        <div class="cmt-title">
          第一楼{{ index + 1 }} 
          &nbsp;&nbsp; 用户：{{ item.user_name }} 
          &nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat}}
        </div>
        <div class="cmt-body">
          {{item.content=='undefined'?'暂无评论':item.content}}
        </div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="getMore">{{main}}</mt-button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        id: this.$route.params.id,
        page: 1,
        comments: [],
        main: '加载更多'
      }
    },
    created() {
      this.getComments()
    },
    methods: {
      getComments() {
        this.$http
          .get('api/getcomments/' + this.id + '?pageindex=' + this.page)
          .then(res => {
            if (res.body.status === 0) {
              this.comments = this.comments.concat(res.body.message)
              if(res.body.message.length<10){
                this.main = '暂无数据'
                return false
              } 
            }

          })
      },
      getMore(){
        this.page++;
        this.getComments()
      }
    },
    // props: ['id']
  }
</script>
<style lang="scss">
  .cmt-container {
    h3 {
      font-size: 18 px;
      font-weight: 400;
    }

    textarea {
      font-size: 16px;
      height: 80px;
      margin-bottom: 0;
    }

    .cmt-list {
      margin: 5px 0;

      .cmt-item {
        font-size: 13px;

        .cmt-title {
          line-height: 30px;
          background: #ccc;
        }

        .cmt-body {
          line-height: 30px;
          text-indent: 2em;
        }
      }
    }
  }
</style>