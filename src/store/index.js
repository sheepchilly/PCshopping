import Vue from 'vue'
import Vuex from 'vuex'

//使用vuex
Vue.use(Vuex);

//引入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from'./trade'

//对外暴露store类的一个实例
export default new Vuex.Store({
    //实现vuex仓库模块开发存储数据modules
    //（即每个模块拥有自己的state、mutations、action、getter，甚至是嵌套子模块）
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }

});