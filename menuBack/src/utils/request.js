import axios from "axios";

//设置默认路由
axios.defaults.baseURL = 'http://localhost:4000';
//设置响应拦截器
axios.interceptors.response.use((resp) => {
    return resp.data
});
//设置访问拦截器
axios.interceptors.request.use((req) => {
    //拿会话存储的user数据验证登录没有 我设置的名称是user可以更改的
    let user = sessionStorage.getItem('user');
    user = JSON.parse(user);
    //如果存在就在请求头上添加token 
    if (user) {
        req.headers.Authorization = `${user.token}`
    };
    return req;
})
//暴露好封装好的request post方法
export default {
    post(url, data) {
        return axios({
            url: url,
            method: 'POST',
            data: data
        })
    },
    get(url, params) {
        return axios({
            url: url,
            method: 'GET',
            params: params
        })
    }
}