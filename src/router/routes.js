//路由配置的信息

//引入路由组件
// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
//引入二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

/*
    路由懒加载：
    当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
    如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
*/

//对外暴露路由元信息
export default [
    {
        path:'/event',
        component:()=>import('@/test/Event.vue'),
        meta:{Show:true}
    },
        {
            path:'/center',
            component:()=>import('@/pages/Center'),
            meta:{Show:true},
            //二级路由组件
            children:[
                {
                    //二级路由不用带反斜杠（如果要写反斜杠就要写全）
                    path:'myorder',
                    component:()=>import('@/pages/Center/myOrder')
                },
                {
                    path:'grouporder',
                    component:()=>import('@/pages/Center/groupOrder')
                },{
                    path:'/center',
                    //路由重定向（只要一访问center就要重定向到myorder）
                    redirect:'/center/myorder'
                }
            ]  
        },
        {
            path:'/paysuccess',
            component:()=>import('@/pages/PaySuccess'),
            meta:{Show:true}  
        },
        {
            path:'/pay',
            component:()=>import('@/pages/Pay'),
            meta:{Show:true},
            //路由独享守卫
            beforeEnter:(to,from,next)=>{
                if(from.path=='/trade'){
                    next();
                }else{
                    next(false);
                }
            }
        },
        {
            path:'/trade',
            component:()=>import('@/pages/Trade'),
            meta:{Show:true},
            //路由独享守卫
            beforeEnter: (to, from, next) => {
                //去交易页面，必须是从购物车而来
                if(from.path=='/shopcart'){
                    next();
                }else{
                    //next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
                    next(false);
                }
            }
        },
        {
            path:'/shopcart',
            name:'shopcart',
            component:()=>import('@/pages/ShopCart'),
            meta:{Show:true}
        },
        {
            path:"/addcartsuccess",
            name:'addcartsuccess',
            component:()=>import('@/pages/AddCartSuccess'),
            //meta是显示底下的footer
            meta:{Show:true}
        },
        {
            path:'/detail/:skuid',
            component:()=>import('@/pages/Detail'),
            meta:{show:true}
        },
        {
            path:'/home',
            component:()=>import('@/pages/Home'),
            meta:{show:true}
        },
        {
            //这里占位了，用?号代表params可传可不传
            path:'/search/:keyword?',
            component:()=>import('@/pages/Search'),
            meta:{show:true},
            name:"search"
        },
        {
            path:'/login',
            component:()=>import('@/pages/Login'),
            meta:{show:false}
        },
        {
            path:'/register',
            component:()=>import('@/pages/Register'),
            meta:{show:false}
        },
        //重定向，在项目跑起来的时候，访问/,立马让他定向到首页
        {
            // 执行/根目录路由地址时,就跳转执行/home路由地址,进而把对应的组件给显示出来。
            path:'/',
            redirect:"/home"
        }
    ]