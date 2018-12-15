<template>
  <div>
    <h2>新闻列表</h2>
  </div>
</template>
<script>
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
            console.log(result)
          } else {

          }
        })
      }
    }
  }
</script>
<style lang="">

</style>