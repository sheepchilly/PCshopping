import { reCategoryList, reGetBannerList,reFloorList } from "@/api";

//home模块的小仓库
//state:仓库存储数据的地方
const state={
    //state中数据默认初始值别瞎写，服务器返回对象，服务器返回数组。[根据接口的返回值初始化]
    categoryList:[],
    //轮播图的数据
    bannerList:[],
    //floor的数据
    floorList:[]
};
//mutations:修改state的唯一手段
const mutations={
    CATEGOORYLIST(state,categoryList){
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList;
    }
};
//action:处理action,可以书写自己的业务逻辑，也可以处理异步
const actions={
    //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    // async声明一个异步函数，然后再用await等待异步结果
    //{commit}->这里参数传递过来的是上下文对象context，上下文context里有一个commit方法，正常写是接收context，然后context.commit()
    async categoryList({commit}){
        let result =await reCategoryList();
        if(result.code==200){
            commit("CATEGOORYLIST",result.data);
        }
    },
    //获取首页轮播图的数据
    async getBannerList({commit}){
       let result = await reGetBannerList()
       if(result.code==200){
        commit('GETBANNERLIST',result.data)
       }
    },
    //获取首页floor的数据
    async getFloorList({commit}){
        let result = await reFloorList()
        if(result.code==200){
         commit('GETFLOORLIST',result.data)
        }
     }
};
//getters:（vuex的计算属性）,用于简化仓库，让组件获取仓库的数据更加方便
const getters={};
export default{
    state,
    mutations,
    actions,
    getters
}