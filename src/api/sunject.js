import instance from '@/utils/request.js'
// 登录axios封装请求
function getSunjectData(params) {
    return instance({
        url: '/subject/list',
        method: "get",
        params,
    })
}
// 改变状态:禁用还是其余
function setSubjectStatus(data) {
    return instance({
        url: '/subject/status',
        method: "post",
        data,
    })
}
function delSubjectData(data) {
    return instance({
        url: '/subject/remove',
        method: "post",
        data,
    })
}
function addSubjectData(data) {
    return instance({
        url: '/subject/add',
        method: "post",
        data,
    })
}
function editSubjectData(data) {
    return instance({
        url: '/subject/edit',
        method: "post",
        data,
    })
}

export {getSunjectData,setSubjectStatus,delSubjectData,addSubjectData,editSubjectData}