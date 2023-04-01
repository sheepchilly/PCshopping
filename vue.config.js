const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  //关闭sourceMap校验工具
  productionSourceMap:false,
  transpileDependencies: true,
  // eslint校验功能关闭
  lintOnSave: false,
  
  //代理跨域
  devServer:{
    //以下三行是让服务器每次一启动就自己跳转到localhost:8080
      host:'localhost',
      port:'8080',
      open:true,
    proxy:{
      '/api':{
        target:' http://gmall-h5-api.atguigu.cn', //数据来自于哪台服务器就写哪个ip地址
        // pathRewrite:{'^/api':''},
      }
    }
  }
})
