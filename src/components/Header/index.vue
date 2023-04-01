<template>
    <div>
        <!-- 头部 -->
        <header class="header">
            <!-- 头部的第一行 -->
            <div class="top">
                <div class="container">
                    <div class="loginList">
                        <p>无名购欢迎您！</p>
                        <!-- 没有用户名：未登录 -->
                        <p v-if="!userName">
                            <span>请</span>
                            <router-link to="/login">登录</router-link>
                            <router-link to="/register"  class="register">免费注册</router-link>
                        </p>
                        <!-- 登陆了 -->
                        <p v-else>
                            <a>{{ userName }}</a>
                            <a class="register" @click="logout">退出登录</a>
                        </p>
                    </div>
                    <div class="typeList">
                        <!-- <a href="###">我的订单</a> -->
                        <router-link to="/center/myorder">我的订单</router-link>
                        <router-link to="/shopcart">我的购物车</router-link>
                        <a href="###">我的用户信息</a>
                        <a href="###">无名购会员</a>
                        <a href="###">企业采购</a>
                        <a href="###">关注无名购</a>
                        <a href="###">合作招商</a>
                        <a href="###">商家后台</a>
                    </div>
                </div>
            </div>
            <!--头部第二行 搜索区域-->
            <div class="bottom">
                <h1 class="logoArea">
                    <router-link class="logo" title="Dy的购物网站" to="/home">
                        <!-- <img src="./images/logo.png" alt=""> -->
                        <img src="../../assets/images/logo2.png" style="width: 60px;height: 56px;">
                        <span class="logoTitle">无名购</span>
                    </router-link>
                </h1>
                <div class="searchArea">
                    <form action="###" class="searchForm">
                        <input 
                        type="text" 
                        id="autocomplete" 
                        class="input-error input-xxlarge"
                        v-model="keyword"
                        />
                        <button 
                        class="sui-btn btn-xlarge btn-danger" 
                        type="button" 
                        @click="goSeach">搜索</button>
                    </form>
                </div>
            </div>
        </header>
    </div>
  </template>
  
  <script>
  export default {
      name:'Header',
      data(){
        return{
            keyword:""
        }
      },
      methods:{
        //搜索按钮的回调函数：需要向search路由进行跳转
        goSeach(){
        //(1)想要导航到不同的URL，使用router.push()方法，这个方法会向history栈添加一个新纪录
        //(2)当点击 <router-link> 时，这个方法会在内部调用，即点击 <router-link :to="..."> 等同于调用 router.push(...)        
        
        //路由传递参数:
        //  1)字符串形式
        // this.$router.push('/search/'+this.keyword+'?k='+this.keyword.toUpperCase())
        
        //  2)模板字符串
        // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
        
        //  3)对象字符串
        //(这里的push方法重写了，在router.index.js中)
        if(this.$route.query){
            let location = {
            name:"search",
            params:{keyword:this.keyword || undefined}
            }
            location.query = this.$route.query
            this.$router.push(location)
         }   
        },
        //退出登录
        async logout(){
            try {
                //如果退出成功
                await this.$store.dispatch('userLogout')
                //路由跳转到首页
                this.$router.push('/home')
            } catch (error) {
                
            }
        }
      },
      mounted(){
        //通过全局事件总线清除关键字
        this.$bus.$on("clear",()=>{
            this.keyword = ""
        })
      },
      computed:{
        //用户名信息
        userName(){
            return this.$store.state.user.userinfo.name
        }
      }
  }
  </script>
  
  <style scoped lang="less">
    .header {
        &>.top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

                        &+a {
                            border-left: 1px solid #b3aeae;
                        }
                    }

                }

            }
        }

        &>.bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;
                .logo {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    text-decoration: none;
                    img {
                        width: 175px;
                        margin: 25px 5px 25px 45px;
                    }
                    .logoTitle{
                        color: #e1251b;
                        font-size: 30px;
                        font-weight: bold;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }
  </style>