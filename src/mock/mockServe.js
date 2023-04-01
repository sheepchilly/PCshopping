//引入mock.js模块
import Mock from 'mockjs'
//把Json数据格式引入
//在webpack中默认对外暴露的有：JSON数据、图片
import banner from './banner.json'
import floor from './floor.json'

//mock数据:第一个数据是请求地址，第二个数据是请求数据
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})
