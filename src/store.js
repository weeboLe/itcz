
import Vue from 'vue'
//  导入vuex
import Vuex from 'vuex'
//  安装vuex
Vue.use(Vuex)
//  注册vuex
const store = new Vuex.Store({
  state: {
    car: JSON.parse(localStorage.getItem('car') || '[]') //用来保存购物车和商品参数
    // 参数的样式{id: 商品的id, count: 购买的数量, price: 商品的单价, selected: 是否选中}
  },
  mutations: {
    // 商品添加
    addTocar(state, datacar) {
      let flag = false
      state.car.some(item => {
        if (item.id == datacar.id) {
          item.count += datacar.count
          item.selected = datacar.selected
          flag = true
          return
        }
      })
      if (!flag) {
        state.car.push(datacar)
      }
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    // 购物车更新数量逻辑

    updatedinfo(state, data) {
      state.car.forEach(item => {
        if (item.id == data.id) {
          item.count = data.count
          return
        }
      })
      // 更新数据
      localStorage.setItem('car', JSON.stringify(state.car))

    },
    // 根据传过来的id删除 对应的数据
    deldata(state, id) {
      state.car.forEach((item, index) => {
        if (item.id == id) {
          state.car.splice(index, 1)
          return
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    // 改变商品选中状态
    selectedChange(state, data) {
      state.car.forEach(item => {
        if (parseInt(item.id) === parseInt(data.id)) {
          item.selected = data.selected
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {
    // 商品页面的添加到购物车数量
    getAllcount(state) {
      let c = 0
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    // 将商品的id 为键count为值返回给调用者
    getGoodsCount(state) {
      let count = {}
      state.car.forEach(item => {
        count[item.id] = item.count
      })
      return count
    },
    getselected(state) {
      let c = {}
      state.car.forEach(item => {
        c[item.id] = item.selected
      })
      return c
    },
    getgoodsmont(state) {
      let c = {
        count: 0, //总量
        amount: 0 //总价
      }
      state.car.forEach(item => {
        if (item.selected) {
          c.count += parseInt(item.count)
          c.amount = c.count * parseInt(item.price)
        }
      })
      return c
    }

  }
})
export default store