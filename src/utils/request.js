import axios from 'axios'
import { Message } from 'element-ui'
// 拦截器
var instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true
})
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.data.code == 200 ) {
        return response.data;
    } else{ 
        Message.error(response.data.message);
        return Promise.reject("error");
    }
    
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
})
export default instance