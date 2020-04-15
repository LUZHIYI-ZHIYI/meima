import instance from '@/utils/request.js'
// 个人主页登录axios封装请求
function getUserPage(params) {
    return instance({
        url: '/info',
        method: "get",
        params,
    })
}
function exitLoing() {
    return instance({
        url: '/logout',
        method: "get",
    })
}
export {getUserPage,exitLoing}