import Vue from "vue";
const install = function () {
  const Bus = new Vue({
    methods: {
      bind: function (event, callback) {
        //$on动态添加一个监听
        this.$on(event, callback)
      },
      unbind: function (event, callback) {
        //销毁一个监听
        this.$off(event, callback)
      },
      emit: function (event, ...args) {
        //动态触发bus的监听
        this.$emit(event, ...args)
      }
    }

  })

  console.log('new Bus');
  Vue.prototype.$Bus = Bus;
}
export default install;
