//对于axios进行二次封装
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress';
//在当前模块中引入store
import store from '@/store'
//nprogress的start:进度条开始 done:进度条结束
//引入进度条样式
import "nprogress/nprogress.css"

//1.利用axios对象的方法create,去创建一个axios案例
//2.requests就是axios，只不过稍微配置一下
const requests = axios.create({
    //配置对象
    //基础路径，发请求的时候，路径当中会出现api
    baseURL:'/api',
    //请求超时的时间5秒
    timeout:5000,
});
//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    if(store.state.detail.uuid_token){
        //请求头添加一个字段：临时请求头的id
        config.headers.userTempId = store.state.detail.uuid_token
    }
    //config:配置对象，对象里面有一个属性很重要，header请求头

    //判断是否需要携带token给服务器
    if(store.state.user.token){
        config.headers.token=store.state.user.token
    }

    //进度条开始动
    nprogress.start();
    return config;
});

//响应拦截器
requests.interceptors.response.use((res)=>{
    //成功的回调函数：服务器响应的数据回来以后，响应拦截器可以检测到，可以做一些事情
    //进度条结束
    nprogress.done();
    return res.data;
},(error)=>{
    //响应失败的回调函数
    return Promise.reject(new Error('false'));
});

//向外暴露axios
export default requests;