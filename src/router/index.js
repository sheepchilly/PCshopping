//配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

//使用插件
Vue.use(VueRouter);

//引入store
import store from '@/store'

// 重写push和replace
// 先把VueRouter原型对象的push保存一份
let originPush=VueRouter.prototype.push;
let originReplace=VueRouter.prototype.replace;

//重写push|replace

//call和apply的区别
        //  相同点：都可以调用函数一次，篡改函数的上下文一次
        //  不同点:call与apply:call传递参数可以用逗号隔开，apply方法执行，传递数组

//第一个参数：告诉原来push方法，你往哪里跳转(传递哪些参数)
VueRouter.prototype.push=function(location,resolve,reject){
    if(resolve && reject){
        //this指向的是vue实例，等于调用的是原来的push方法
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace=function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}

//配置路由
let router = new VueRouter({
    //配置路由
    routes,
    //滚动行为
    scrollBehavior(to,from,savePosition){
        //返回的这个y=0，代表的滚动条在上方
        return {y:0}
    }
})

//全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to,from,next)=>{
    //to:可以在path中获取到你要跳转到哪个路由的信息
    //from：可以获取到你从哪来的路由信息
    //next:放行函数==>  next()直接调用就是全放行 ===>next('/login')放行到指定的路由当中
    //1.为了测试全都放行
    next();
    //2.用户登陆了才会有token，未登录一定没有token
    let token = store.state.user.token
    //用户的信息
    let name=store.state.user.userinfo.name
    //3.用户已经登陆了
    if(token){
        //已经登陆了还想去login,next自动跳转到/home
        if(to.path=='/login'){
            next('/home')
        }else{
            //登录，但是去的不是login(可能去的是home|search|detail|shopcart)
            //如果用户名已有
            if(name){
                //放行
                next();
            }else{
                //没有用户信息（一刷新），派发action让仓库存储用户信息再跳转
               try{
                    //向仓库派发actions获取用户信息成功
                    await store.dispatch('getUserInfo')
                    //放行
                    next()
               }catch(error){
                    //token失效了,获取不到用户信息==>清除所有用户信息，回到首页，需要重新登录
                    await store.dispatch('userLogout')
                    next('/login')
               }
            }
        }
    }else{
        //未登录:不能去交易相关，不能去支付相关[pay|paysuccess]，不能去个人中心
        //1.未登录去上面这些路由---需跳转到/login
        let toPath = to.path;
        if(toPath.indexOf('/trade')!==-1 || toPath.indexOf('/pay')!==-1 || toPath.indexOf('/center')!==-1){
            //把未登录的时候向去而没有去成的信息，存储于地址栏中[路由]
            next('/login?redirect='+toPath)
        }
        next()
    }
})

export default router;