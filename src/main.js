//  入口文件
import Vue from 'vue'
//  导入App根组件
import App from './App.vue'
//  导入路由的包
import VueRouter from 'vue-router'
//  导入 vue-resource
import VueResource from 'vue-resource'
//  导入mint-ui
import MintUi from 'mint-ui'
//  导入mint-ui的css
import 'mint-ui/lib/style.css'
//  引入自己的router 路由模块
import router from './router'
//  导入 MUI 的样式
import '../node_modules/mui/css/mui.min.css'
//  导入 MUI 的扩展字体
import './lib/mui/css/icons-extra.css'
//  导入vue-preview
import VuePreview from 'vue-preview'
//  安装mint-ui
Vue.use(MintUi)
//  安装路由
Vue.use(VueRouter)
//  安装 vue-resource
Vue.use(VueResource)
//  安装Vue-Preview
Vue.use(VuePreview)
//  设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
//  设置全局的日期过滤器
Vue.filter('dateFormat', function (dataStr) {
  const year = new Date(dataStr),
    yy = year.getFullYear(),
    month = (year.getMonth() + 1).toString().padStart(2, 0),
    dd = (year.getDay() + 1).toString().padStart(2, 0),
    hh = year.getHours().toString().padStart(2, 0),
    mm = year.getMinutes().toString().padStart(2, 0),
    ss = year.getSeconds().toString().padStart(2, 0)
  return `${yy}-${month}-${dd} ${hh}:${mm}:${ss}`
})

var vm = new Vue({
  el: '#app',
  render: h => h(App),
  router // 挂载到实例对象
})