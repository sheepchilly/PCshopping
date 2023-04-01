//自定义指令是用来操作DOM的
//Vue插件暴露一个对象
let myPlugins={}
myPlugins.install = function(Vue,options){ //这个options就是你传递的配置对象
    //Vue.prototype.$bus:任何组件都可以使用
    //Vue.directive
    //Vue.component
    //Vue.filter......
    Vue.directive(options.name,(element,params)=>{
        element.innerHTML = params.value.toUpperCase();
        console.log(params);
    });

}

export default myPlugins;