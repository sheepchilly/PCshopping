<template>
  <div>
    <!-- h1是自定义插件 -->
    <!-- <h1 v-upper.erha="msg"></h1> -->
    <Header></Header>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <!-- 在Home、Search显示的，在登陆、注册隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>

</template>

<script>
import  Header from './components/Header'
import Footer from './components/Footer'
export default {
  name:'',
  data(){
    return{
      msg:'Loveyou'
    }
  },
  components:{
    Header,
    Footer
  },
  mounted(){
    //通过vuex发请求，获取数据，存储于仓库中
    //派发一个action 获取商品分类的二级列表
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>

</style>
