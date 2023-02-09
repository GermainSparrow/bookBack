import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//导入 element ui
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//导入apis 并挂载到原型链上
import apis from './utils/apis'
Vue.prototype.$apis = apis
//使用ElementUi
Vue.use(ElementUi);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
