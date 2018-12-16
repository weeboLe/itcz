<template>
  <div class="photoinfo-container">
    <h3>{{ photoinfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间：{{ photoinfo.add_time | dateFormat }}</span>
      <span>点击：{{ photoinfo.click }}次</span>
    </p>
    <hr>
    <!-- 缩略图 -->
    <vue-preview :slides="listimg" @close="handleClose"></vue-preview>

    <div class="content" v-html="photoinfo.content"></div>
    <!-- 品论组件 -->
    <commont :id="id"></commont>
  </div>
</template>
<script>
  import commont from '../subcomponent/comment'
  export default {
    data() {
      return {
        id: this.$route.params.id,
        photoinfo: {},
        listimg: []
      }
    },
    created() {
      this.getimginfo()
      this.getThumbs()
    },
    methods: {
      getimginfo() {
        this.$http.get('api/getimageInfo/' + this.id)
          .then((res) => {
            if (res.body.status === 0) {
              this.photoinfo = res.body.message[0]
            }
          })
      },
      getThumbs() {
        this.$http.get('api/getthumimages/' + this.id)
          .then(res => {
            console.log(res.body)
            if (res.body.status === 0) {
              res.body.message.forEach(item => {
                item.w = 600
                item.h = 400
                item.msrc = item.src
              })
            }
            this.listimg = res.body.message
          })
      },
      handleClose() {
        console.log('close event')
      }
    },
    components: {
      commont
    }
  }
</script>
<style lang="scss">
  .photoinfo-container {
    padding: 5px;

    h3 {
      font-size: 16px;
    }

    .subtitle {
      display: flex;
      justify-content: space-between;
    }

    .content {
      font-size: 14px;
      line-height: 30px;

      strong {
        font-size: 16px;
      }
    }
    .my-gallery {
      display: flex;
      flex-wrap: wrap;

      figure {
        padding: 0;
        width: 100px;
        height: 200px;
        margin: 10px;
        box-shadow: 0 0 8px #999;
        display: flex;
        a {
          flex: 1;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }

  }
</style>