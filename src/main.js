import Vue from 'vue'
import App from './App.vue'
// 进度条插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 路由
import router from './router/router.js'
// 共有信息存储导入
import store from '@/store/index.js'
// 路由的使用

Vue.use(ElementUI);
Vue.config.productionTip = false




new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
