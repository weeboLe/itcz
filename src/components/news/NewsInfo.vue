<template>
  <div class="newsinfo-container">
    <h2 class="title">{{list.title}}</h2>
    <p class="subtitle">
      <span>发表时间：{{ list.add_time | dateFormat }}</span>
      <span>点击：{{ list.click }} </span>
    </p>
    <hr>
    <div class="content" v-html="list.content">
    </div>
    <coment-box :id="this.id"></coment-box>
  </div>
</template>
<script>
  import comment from '../subcomponent/comment'
  export default {
    data() {
      return {
        id: this.$route.params.id,
        list: {}
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.$http.get('api/getnew/' + this.id).then(result => {
          this.list = result.body.message[0]
        })
      }
    },
    components: {
      'coment-box': comment
    }
  }
</script>
<style lang="scss">
  .newsinfo-container {
    padding: 0 4px;

    .title {
      font-size: 16px;
      text-align: center;
    }

    .subtitle {
      font-size: 13px;
      color: chocolate;
      display: flex;
      justify-content: space-between;
    }

    .content {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>