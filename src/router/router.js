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
        component: login,
        meta:{
            title:'登录页面'
        }
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
                component:chart,
                meta:{
                    title:'数据概览'
                }
            },
            // 用户列表路由
            {
                path:'userList',
                component:userList,
                meta:{
                    title:'用户列表'
                }
            },
            // 题库列表路由
            {
                path:'question',
                component:question,
                meta:{
                    title:'题库列表'
                }
            },
            // 企业列表路由
            {
                path:'business',
                component:business,
                meta:{
                    title:'企业列表'
                }
            },
            // 学科列表路由
            {
                path:'subject',
                component:subject,
                meta:{
                    title:'学科列表'
                }
            },
        ]
    },
    ],
    
})
router.beforeEach((to,form,next)=>{
    NProgress.start()
        next()
    
    
})
router.afterEach((to)=>{
    NProgress.done()
    document.title = to.meta.title 
})
export default router