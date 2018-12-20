 <template>
  <div class="mui-numbox" data-numbox-min='1'>
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="numbox"/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>
<script>
  import mui from '../../lib/mui/js/mui.min.js'
  export default {
    mounted() {
      mui('.mui-numbox').numbox()
    },
    methods: {
      countChanged(){
        // this.$emit('getcount',parseInt(this.$refs.numbox.value))
        let data = {
          id: this.goodsid,
          count: parseInt(this.$refs.numbox.value)
        }
        this.$store.commit('updatedinfo',data)
      }
    },
    props:['initcount','goodsid'],
    // watch: {
    //   max: function(newval, oldval){
    //     mui('.mui-numbox').numbox().setOption('max', newval)
    //   }
    // }
  }
</script>
<style lang="scss">

</style>