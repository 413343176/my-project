// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/components/tabRouter/App'
import TodoList from './TodoList'
import Bus from "./javascript/Bus.js"
import axios from "axios"

Vue.use(Bus);
Vue.config.productionTip = false
const instance = axios.create({});
Vue.prototype.$axios = instance

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import VueCropper from 'vue-cropper';
Vue.use(VueCropper);

import router from './router/index';
import store from './store/index'




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App,
  },
  template: '<App/>'
})
