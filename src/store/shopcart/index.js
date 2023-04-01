import {reqCartList,reqDeleteCartById,reqUpdateCheckedByid} from '@/api'
const state={
    cartList:[]
}
const mutations={
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
}
const actions={
    //获取购物车列表的数据
    async getCartList({commit}){
        let result = await reqCartList()
        if(result.code==200){
            commit("GETCARTLIST",result.data)
        }
    },
    //删除购物车某一个产品
    async deleteCartListBySkuId({commit},skuId){
        let result = await reqDeleteCartById(skuId)
        if(result.code==200){
            return 'OK'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //修改购物车某一个产品选中的状态
    async updateCheckedByid({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedByid(skuId,isChecked)
        if(result.code==200){
            return 'OK'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //删除全部勾选的产品
    deleteAllcheckedCart({dispatch,getters}){
        /*context小仓库：里面包含commit[提交mutations修改state] getters[计算属性] dispatch[派发action] state[当前仓库数据]*/
        //获取购物车中全部的产品（是一个数组）
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item=>{
           let promise = item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId):'';
           //将每一次返回的Promise添加到数组当中
           PromiseAll.push(promise)
        })
        /* promise.all([p1,p2,p3]) 每一个p都是一个promise,如果有一个 失败就全部失败 */
        return Promise.all(PromiseAll)
    },
    //修改全部产品的状态
    updatedAllCartIsChecked({dispatch,state},isChecked){
        let PromiseAll=[]
        state.cartList[0].cartInfoList.forEach(item=>{
            let promise = dispatch('updateCheckedByid',{skuId:item.skuId,isChecked})
            PromiseAll.push(promise)
        })
        //最终返回的结果
        return Promise.all(PromiseAll)
    }
}
const getters={
    cartList(state){
        //如果捞不到至少返回一个空对象
        return state.cartList[0]||{}
    },
}
export default{
    state,
    mutations,
    actions,
    getters
}