// 导入vue
import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../view/login/login.vue'
import layout from '@/view/home/layout.vue'
import chart from '@/view/home/chart/chart.vue'
import userList from '@/view/home/userList/userList.vue'
import question from '@/view/home/question/question.vue'
import business from '@/view/home/business/business.vue'
import subject from '@/view/home/subject/subject.vue'

// 导入进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.use(VueRouter)

// 路由
let router = new VueRouter({
    routes: [{
        path: '/',
        component: login
    },
    // 跳转个人主页
    {
        path: '/home',
        redirect:'/home/subject',
        component: layout,
        children:[
            // 数据概览路由
            {
                path:'chart',
                component:chart
            },
            // 用户列表路由
            {
                path:'userList',
                component:userList
            },
            // 题库列表路由
            {
                path:'question',
                component:question
            },
            // 企业列表路由
            {
                path:'business',
                component:business
            },
            // 学科列表路由
            {
                path:'subject',
                component:subject
            },
        ]
    },
    ],
    
})
router.beforeEach((to,form,next)=>{
    NProgress.start()
        next()
    
    
})
router.afterEach(()=>{
    NProgress.done()
})
export default router