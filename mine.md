# 1.路由

## 1.安装vue-router

npm i vue-router --save

## 2.路由组件与非路由组件的区别

1.路由组件一般放置在pages|views文件夹中，非路由组件一般放置在componments文件夹中

2.路由组件一般需要在router文件夹中进行注册（使用的即为组件的名字），非路由组件在使用的时候，一般都是以标签的形式使用

3.注册完路由，不管是路由组件、还是非路由组件，身上都有$router和$route

​	$router：一般是获取路由的信息 [路径、query、params等]

​	$route：一般进行编程式导航进行路由跳转 [push、replace]

## 3.路由跳转

1.两种形式：

- 声明式导航router-link：可以进行路由的跳转（必须要有to属性）
- 编程式导航push/replace：可以进行路由的跳转（可以书写自己的业务）

2.编程式导航：声明式导航能做的，编程式导航都能做。但是编程式导航除了可以进行路由跳转，还可以做一些别的逻辑。（登录后跳转）

## 4.路由元信息

1.在路由中定义meta字段，就是路由的元信息（用户自己配置的），可以控制该路由是否显示与隐藏

2. <Footer v-show="$route.meta.show"></Footer> =>通过$route.meta.show可以控制该Footer组件在什么时候显示与隐藏（在Home、Search显示，在登录、注册的时候隐藏）

## 5.路由传参有几种方式？

1. params参数：属于路径当中的一部分，需要注意，在配置路由的时候，需要占位
2. query参数：不属于路径当中的一部分，类似于ajax中的queryString /home?k=v$val=v，不需要占位

```js
//路由传递参数:
//  1)字符串形式
this.$router.push('/search/'+this.keyword+'?k='+this.keyword.toUpperCase())

//  2)模板字符串
this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)

//  3)对象字符串
if(this.$route.query){
    let location = {
        name:"search",
        params:{keyword:this.keyword || undefined}
    }
    location.query = this.$route.query
    	this.$router.push(location)
 }   
```

## 6.路由传参相关面试题

**Q：路由传递参数（对象写法）path是否可以结合params参数一起使用？**

A：路由跳转传参的时候，对象的写法可以是name、path形式，但是需要注意的是，path这种写法不能与params参数一起使用。

**Q：如何指定params参数可传可不传？**

A：如果路由要求传递params参数（配置路由的时候params参数已经占位），但是你就不传递params参数，会发现一件事情，URL路径会出现问题。

eg. http://localhost:8080/#/?k=123 <=出问题的情况

 	http://localhost:8080/#/search?k=123 <=正常情况

**解决：**在配置路由的时候，如果要用params占位，就在后面加上一个?号，代表可传可不传 => path:"/search/:keyword?"



**Q：params参数可以传递也可以不传递，但是如果传递时空串，如何解决？**

A：使用undefined解决：params参数可以传递或不传递的情况（空的字符串）

this.$router.push({name:'search',params:{keyword:''||undefined}})



**Q：路由组件能不能传递props数据？**

A：可以的，（三种写法）

1. 布尔类型 => 在路由属性里加上 props:true,（这样就可以把params参数作为路由身上的属性），然后在路由对应的组件里用props:['params占位符的名字']来接收（注意：只能传递params参数）

2. 对象写法 => 也是在路由属性里加上 props:{a:1,b:2}，额外的给路由组件添加一些参数，路由组件可以在props里接收

3. 函数写法 => 可以把params参数、query参数，通过props传递给路由组件

   ```js
   props:(route)=>{
   	return {keyword:$route.params.keyword,k:$route.query.k};
   }
   ```

这样子写就不用使用 {{$route.params.keyword}}了，可以直接写{{keyword}}，{{$route.params.k}}和{{k}}同理

## 7.push方法重写

**问题：**编程式路由跳转到当前路由（参数不变），多次执行会抛出NavigationDuplicated的警告错误

**解决：**1.因为目前vue-router@3.5.3的push方法有缺陷（连续跳转会飘红），

​				所以要重写push和replace方法（给方法加上成功和失败的回调）

```js
在router文件夹下的index中：
//先把VueRouter原型对象的push保存一份
let originPush=VueRouter.prototype.push;
let originReplace=VueRouter.prototype.replace;
```

2.重写push|replace

```js
在router文件夹下的index中：
//第一个参数：告诉原来push方法，你往哪里跳转(传递哪些参数)
VueRouter.prototype.push=function(location,resolve,reject){
    //如果你传了成功resolve和失败reject的回调
    if(resolve && reject){
        //就调用原来的push方法
        originPush.call(this,location,resolve,reject)
    }else{
        //可能是resolve或者reject其中之一没有
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
```



# 2.axios的二次封装

## 1.封装axios

1.为什么需要进行二次封装axios？

也就是给axios添加上**请求拦截器**和**响应拦截器**

- 请求拦截器：在发请求之前可以处理一些业务
- 响应拦截器：当服务器数据返回以后，可以处理一些事情

```js
import axios from 'axios';
const requests = axios.create({
    //基础路径，发请求的时候，路径当中会出现api
    baseURL:'/api',
    //请求超时的时间5秒(五秒之内没有响应就失败了)
    timeout:5000,
});
```

**2.请求拦截器**：回调函数config（配置对象），对象里面包含有一个属性：**headers请求头**

```js
requests.interceptors.request.use((config)=>{
	return config;
})
```

**3.响应拦截器**：

```js
requests.interceptors.response.use((res)=>{
    return res.data;
}),(error)=>{
    //响应失败的回调函数 -> 终止Promise.reject链
    return Promise.reject(new Error('false'));
});
```

## 2.nprogress进度条

**需求：**当项目当中出现了发请求，进度条会往前走，当数据返回回来后，进度条会消失。

1.npm i --save nprogress

2.在**请求和响应拦截器**中使用

```js
//引入进度条
import nprogress from 'nprogress';
//引入进度条样式
import "nprogress/nprogress.css"

//在请求拦截器里
nprogress.start();
//在响应拦截器里
nprogress.done();
```



# 3.跨域问题

1.什么是跨域：协议、域名、端口号不同

```js
http://localhost:8080/#/home  --前端项目本地服务器
http://gmall-h5-api.atguigu.cn --后台服务器
```

2.Jsonp、cors、代理服务器 解决跨域

```js
//代理服务器解决跨域 --服务器与服务器之间没有跨域问题
  devServer:{
    //以下三行是让服务器每次一启动就自己跳转到localhost:8080
      host:'localhost',
      port:'8080',
      open:true,
    proxy:{
      '/api':{
        target:' http://gmall-h5-api.atguigu.cn', //数据来自于哪台服务器就写哪个ip地址
        // pathRewrite:{'^/api':''}, //路径重写，这里不需要重写，因为需要的接口都自带/api
      }
    }
  }
```



# 4.Vuex

npm i --save vuex@3

1.仓库需要对外暴露store =>export default new Vue.Store({})

2.然后在main.js中注册

```js
//引入仓库
import store from '@/store'
//注册仓库,组件实例的身上会多一个属性==>$store
 store
```

3.数据过多用modules拆分成小模块存储数据，然后在store的index.js中import引入小仓库，再对外暴露modules



# 5.Home首页

## 1.三级联动TypeNav

1.在main.js中注册成全局组件

```js
import TypeNav from '@/components/TypeNav'
//第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav);
```

2.在Home中使用

```js
<!-- 三级联动的全局组件:三级联动已经注册为全局组件，因此不需要再import引入 -->
<TypeNav />
```

3.categoryList的数据

```js
//在TypeNav中：computed计算出来仓库里的state
computed:{
        ...mapState({
            //右侧需要的是一个函数，当使用这个计算属性的时候，计算函数会立刻执行一次
            //注入一个参数state，其实即为大仓库中的数据
            categoryList:state=>state.home.categoryList
        })
    },
        
//在store的home下的index.js中    
//{commit}->这里参数传递过来的是上下文对象context，上下文context里有一个commit方法，正常写是接收context，然后context.commit()
async categoryList({commit}){
        let result =await reCategoryList();
        if(result.code==200){
            commit("CATEGOORYLIST",result.data);
        }
    },
```

4.三级分类的展示用v-for遍历出来即可

5.鼠标移入给一级列表添加背景颜色

1. 直接在样式里添加:hover{background:skyblue;}
2. 通过js完成 -> 鼠标移上哪个index就给哪个index添加背景颜色

## 2.轮播图



















