<template>
  <div class="cmt-container">
    <h3>发表评论：</h3>
    <hr>
    <textarea placeholder="请输入内容(最多120字)" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="setComments">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, index) in comments" :key="index">
        <div class="cmt-title">
          第一楼{{ index + 1 }}
          &nbsp;&nbsp; 用户：{{ item.user_name }}
          &nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat}}
        </div>
        <div class="cmt-body">
          {{item.content == 'undefined'|| item.content == ''?'没有填写评论':item.content}}
        </div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="getMore">{{main}}</mt-button>
  </div>
</template>
<script>
  import {
    Toast
  } from 'mint-ui'
  export default {
    data() {
      return {
        // id: this.$route.params.id,
        page: 1,
        comments: [],
        main: '加载更多',
        msg: ''
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
              if (res.body.message.length < 10) {
                this.main = '暂无评论'
                return false
              }
            }

          })
      },
      getMore() {
        this.page++;
        this.getComments()
      },
      setComments() {
        // 效验内容是否为空
        if (this.msg.trim().length === 0) {
          return Toast('内容不能为空')
        }
        /* 参数1、请求url地址
          参数2、提交给服务器的数据对象{}
          参数3、定义提交的时候表单总数据的格式{emulateJSON: true}
        */
        this.$http
          .post('api/postcomment/' + this.id, {
            content: this.msg
          })
          .then(res => {
            if (res.body.status === 0) {
              this.comments.unshift({
                add_time: new Date(),
                content: this.msg,
                user_name: '匿名用户'
              })
              this.msg = ''
            }
          })
      }
    },
    props: ['id']
  }
</script>
<style lang="scss">
  .cmt-container {
    h3 {
      font-size: 18 px;
      font-weight: 400;
      color: #f40;
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
          min-height: 30px;
        }
      }
    }
  }
</style>