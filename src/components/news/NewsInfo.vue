<template>
  <div>
    <h2 class="title">新闻列表</h2>


  </div>
</template>
<script>
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
        this.$http.get('api/getnew/' + this.id).then(result=>{
          console.log(result)
        })
      }
    }
  }
</script>
<style>

</style>