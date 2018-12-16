import VueRouter from 'vue-router'
// 导入对应的路由组件
import Home from './components/tabbar/HomeContainer.vue'
import Member from './components/tabbar/MemberContainer.vue'
import Shopcar from './components/tabbar/ShopcarContainer.vue'
import Search from './components/tabbar/SearchContainer.vue'
import list from './components/news/NewsListvue.vue'
import info from './components/news/NewsInfo.vue'
import photos from './components/photos/Photos.vue'
import photoinfo from './components/photos/photoinfo.vue'
// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', component: Home},
    {path: '/member', component: Member},
    {path: '/shopcar', component: Shopcar},
    {path: '/search', component: Search},
    {path: '/home/list', component: list},
    {path: '/home/info/:id', component: info},
    {path: '/home/photos', component: photos},
    {path: '/home/photoinfo/:id', component: photoinfo}

    
    
  ],
  linkActiveClass: 'mui-active'
})

// 把路由对象暴露出去
export default router