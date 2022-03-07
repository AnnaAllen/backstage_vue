import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false

// 全局注册自定义指令, 当图片加载中时展示灰色底
Vue.directive('imgUrl', function(el, binding) {
  el.style.backgroundColor = '#999'
  let img = new Image()
  img.src = binding.value
  img.onload = function() {
    el.style.backgroundColor = '',
    el.src = binding.value
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
