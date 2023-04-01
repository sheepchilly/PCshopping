//登录与注册模块
import {reqGetCode,reqUserRegister,reqUserLogin,reqUserToken,reqLogout} from '@/api'
import {setToken,getToken,removeToken} from '@/utils/token'
const state={
    code:"",
    token:getToken(),
    userinfo:{}
}
const mutations={
    GETCODE(state,code){
        state.code=code
    },
    USERLOGIN(state,token){
        state.token=token
    },
    GETUSERINFO(state,userinfo){
        state.userinfo=userinfo
    },
    CLEAR(state){
        //把仓库中相关用户信息清空
        state.token='';
        state.userinfo={};
        //本地存储清空
        removeToken();
    }
}
const actions={
    //获取验证码
    async getCode({commit},phone){
        //获取验证码的接口把验证码返回了，但是正常情况是后台把验证码发到用户手机上
        let result = await reqGetCode(phone)
        if(result.code==200){
            commit("GETCODE",result.data)
            return 'OK'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //用户注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user)
        if(result.code==200){
            return "ok"
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //登录[token]
    async userLogin({commit},data){
        let result = await reqUserLogin(data)
        //服务器下发token，用户唯一标识(uuid)
        if(result.code==200){
            //用户已经登录成功且获取到token
            commit("USERLOGIN",result.data.token)
            //持久化存储token(本地存储)--解决vuex刷新后用户信息消失的问题
            setToken(result.data.token)
            return 'OK'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserToken()
        if(result.code==200){
            //提交用户信息
            commit("GETUSERINFO",result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //退出登录
    async userLogout({commit}){
        //只是向服务器发起一次请求，清除token
        let result = await reqLogout()
        //action不能操作state，要提交mutations去修改state
        if(result.code==200){
            commit("CLEAR")
            return 'OK'
        }else{
            return Promise.reject(new Error('fail'))
        }
    }
}
const getters={}
export default{
    state,
    mutations,
    actions,
    getters
}