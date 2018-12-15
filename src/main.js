//  入口文件
import Vue from 'vue'
// 
import App from './App.vue'
//  导入路由的包
import VueRouter from 'vue-router'
//  安装路由
Vue.use(VueRouter)
// 导入mint-ui
import MintUi from 'mint-ui'
Vue.use(MintUi)
//  导入 MUI 的样式
import './lib/mui/css/mui.min.css'
import 'mint-ui/lib/style.css'
//  引入自己的router 路由模块
import router from './router'
//  导入 vue-resource
import VueResource from 'vue-resource'
// 定义全局的过滤器
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

//  安装 vue-resource
Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';

import './lib/mui/css/icons-extra.css'

var vm = new Vue({
  el: '#app',
  render: h => h(App),
  router // 挂载到实例对象
})