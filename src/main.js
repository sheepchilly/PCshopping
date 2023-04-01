import Vue from 'vue'
import App from './App.vue'
//三级联动组件 -- 全局组件
import TypeNav from '@/components/TypeNav'
//注册轮播图组件 --全局组件
import Carousel from '@/components/Carousel'
//分页器 --全局组件
import pagination from '@/components/Pagination'
//引入elementUI组件库
import {Button,MessageBox} from 'element-ui'

//第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carousel.name,Carousel)
Vue.component(pagination.name,pagination)
//注册全局组件
Vue.component(Button.name,Button)
//ElementUI注册组件的时候，还有一种写法：挂载原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入路由
import router from '@/router'
//引入仓库
import store from '@/store'

//引入mockServe.js(引用了就不需要在js文件里暴露了，相当于在这里执行了一次js文件)
import '@/mock/mockServe'
//引入swiper（轮播图插件）样式
import 'swiper/css/swiper.css'

//统一接收api文件夹里面全部的请求函数(统一引入)
import * as API from '@/api';
//图片可以对外暴露
import atm from '@/assets/images/1.gif';

//引入插件
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload),{
  //懒加载默认的图片：
  loading:atm
}

//引入自定义插件
import myPlugins from '@/plugins/myPlugins'
Vue.use(myPlugins,{
  name:'upper'
})

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  //全局事件总线$bus
  beforeCreate(){
    Vue.prototype.$bus = this //this就是vm就是vue实例
    Vue.prototype.$API = API; //所有接口挂载到vue的原型链身上
  },
  //注册路由
  router,
  //注册仓库,组件实例的身上会多一个属性==>$store
  store
}).$mount('#app')
