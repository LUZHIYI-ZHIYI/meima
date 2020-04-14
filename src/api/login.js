import instance from '@/utils/request.js'
// 登录axios封装请求
function toLogin(data) {
    return instance({
        url: '/login',
        method: "post",
        data,
    })
}
export {toLogin}