import instance from '@/utils/request.js'
// 获取短信验证码axios
function getPhoneCode(data) {
    return instance({
        url: '/sendsms',
        method: "post",
        data,
    })
}


// 注册axios
function register(data) {
    return instance({
        url: '/register',
        method: "post",
        data,
    })
}
export { getPhoneCode,register }
