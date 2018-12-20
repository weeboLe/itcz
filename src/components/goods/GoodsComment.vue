<template>
  <div>
    <comment :id="this.id"></comment>
  </div>
</template>
<script>
import comment from '../subcomponent/comment'
export default {
  data(){
    return {
      id: this.$route.params.id
    }
  },
  components:{
    comment
  }
}
  
</script>
<style lang="">
  
</style>