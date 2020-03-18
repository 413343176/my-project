import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  // vuex 的数据流。后（qian）端通过 action处理数据，
  //然后通过mutation 把处理后的数据放入数据库（state）中，
  //谁要用就通过getter从数据库（state）中取。
  //数据项 必输项
  state: {},
  //获取数据 
  //getters 是一个纯函数，接收参数 state，返回你想取的值，获取时可以做对应处理
  getters: {},
  //修改数据时，中间处理的操作
  actions: {},
  //修改数据 必输项
  mutations: {},
})

export default store;
