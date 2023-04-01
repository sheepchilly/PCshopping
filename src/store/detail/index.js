import { reqGoodsInfo,reqAddOrUpdateShopCart } from "@/api";
//封装游客身份模块uuid--->生成一个随机字符串（一旦生成不能再变）
import {getUUID} from '@/utils/uuid_token'
const state={
    goodInfo:{},
    //游客的临时身份
    uuid_token:getUUID()
}
const mutations={
    GETGOODINFO(state,goodInfo){
        state.goodInfo=goodInfo;
    },
}
const actions={
    //获取产品信息的action
    async getGoodInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId)
        if(result.code==200){
            commit('GETGOODINFO',result.data)
        }
    },
    //将产品添加到购物车中
    //这个{commit}的意思是解构(路由method发来的数据)后再捞数据
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        //加入购物车返回的结果
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        console.log(result);
    }
}
const getters={
    //路径导航简化的数据
    categoryView(state){
        //state.goodInfo初始状态空对象，空对象的categoryView属性值undefined
        //当前计算出的categoryView属性值至少是一个空对象，假的报错就不会有了
        return state.goodInfo.categoryView||{}
    },
    //简化产品信息的数据
    skuInfo(state){
        return state.goodInfo.skuInfo||{}
    },
    //产品售卖属性的简化
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[]
    }
}
export default{
    state,
    actions,
    mutations,
    getters
}