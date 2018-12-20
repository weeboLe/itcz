<template>
  <div class="container">
    <h3>{{descinfo.title}}</h3>
    <hr>
    <div v-html="descinfo.content">
      
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        id: this.$route.params.id,
        descinfo: {}
      }
    },
    mounted() {
      this.getdesc()
    },
    methods: {
      getdesc() {
        this.$http.get('api/goods/getdesc/' + this.id)
          .then(res => {
          if(res.body.status===0){
            this.descinfo = res.body.message[0]
          }

          })
      }
    }
  }
</script>
<style lang="scss">
.container{
  padding: 4px;
  h3{
    font-size: 16px;
    color: #226aff;
    line-height: 30px;
    text-align: center;
  }
  img{
    width: 100%;
  }
}
</style>