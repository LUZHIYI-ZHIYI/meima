// 导入vue
import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../view/login/login.vue'
Vue.use(VueRouter)

// 路由
let router = new VueRouter({
    routes: [{
        path: '/',
        component: login
    }
    ]
})
export default router