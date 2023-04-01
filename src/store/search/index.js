//search模块的小仓库
import { reSearchInfo } from "@/api"
const state={
    //仓库初始状态
    searchList:{}
}
const mutations={
    GETSEARCHLIST(state,searchList){
        state.searchList=searchList
    }
}
const actions={
    //获取search模块的数据
    async getSearchList({commit},params={}){
        //当前reSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
        //params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
       let result = await reSearchInfo(params)
       if(result.code == 200){
        commit("GETSEARCHLIST",result.data)
       }
    }
}
//getters的作用：简化仓库中的数据而生（相当于computed）
const getters={
    //当前形参state是当前仓库中的state，并非大仓库中的state
    goodsList(state){
        //如果服务器的数据回来了，那就是一个数组。假如没有网络或者网络不给力，返回的就是undefined，所以用一个空数组
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList
    },
    attrsList(state){
        return state.searchList.attrsList
    }
}
export default{
    state,
    mutations,
    actions,
    getters
}