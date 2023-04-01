<template>
  <div>
    <!-- 商品分类导航 -->
    <div class="type-nav">
            <div class="container">
                <!-- leaveIndex是事件委派==>把子元素的事件交给父元素去处理 -->
                <div @mouseleave="leaveIndex" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <!-- 过渡动画transition -->
                <transition name="sort">
                    <!-- 三级联动 -->
                    <div class="sort" v-show="show">
                    <!-- goSearch利用编程式导航+事件委派实现路由的跳转与传递参数 -->
                    <div class="all-sort-list2" @click="goSearch">
                        <!-- 一级分类 -->
                        <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex===index}">
                            <h3 @mouseenter="changeIndex(index)">
                                <!-- <router-link to="/search">{{ c1.categoryName }}</router-link> -->
                                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                            </h3>
                            <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                                <!-- 二级分类 -->
                                <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <!-- <router-link to="/search">{{ c2.categoryName }}</router-link> -->
                                            <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                                        </dt>
                                        <dd>
                                            <!-- 三级分类 -->
                                            <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                <!-- <router-link to="/search">{{ c3.categoryName }}</router-link> -->
                                                <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>                       
                    </div>
                </div>
                </transition>
            </div>
            <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
        </div>
        </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
//引入防抖和节流API lodash（全部引入）===> import _ from 'lodash'
//但是最好的引入方式是：按需加载
import throttle from 'lodash/throttle'
export default {
    name:'TypeNav',
    data(){
        return{
            currentIndex:-1,
            show:true
        }
    },
    //组件挂载完毕：可以向服务器发请求
    mounted(){
        //当组件挂载完毕，让show属性变成false
        if(this.$route.path!='/home'){
            this.show=false
        }
    },
    computed:{
        ...mapState({
            //右侧需要的是一个函数，当使用这个计算属性的时候，计算函数会立刻执行一次
            //注入一个参数state，其实即为大仓库中的数据
            categoryList:state=>state.home.categoryList
        })
    },
    methods:{
        //鼠标进入，修改响应式数据currentIndex属性
        //throttle的回调函数别用箭头函数，可能出现上下文this
        changeIndex:throttle(function(index){
            this.currentIndex=index;
        },50),
        //一级分类鼠标移出的事件回调,（去掉高亮）
        //当鼠标离开的时候，让商品进行分类与隐藏
        leaveIndex(){
            //判断是search组件的时候才执行
            this.currentIndex=-1
            if(this.$route.path!='/home'){
            this.show=false
            }
        },
        //路由跳转的方法（编程式）
        goSearch(event){
            //编程式导航+事件委派会出现的问题：浏览器不知道你点击的是不是A标签（也不知道你点击的一级二级三级A标签）
            //解决办法：给a标签绑定data-categoryName自定义属性，然后获取到带有自定义属性的a节点,节点有一个dataset属性，可以获取节点的自定义属性与属性值
            
            let element = event.target
            let {categoryname,category1id,category2id,category3id} = element.dataset
            if(categoryname){
                //1.管理路由参数：
                let location = {name:'search'}
                let query={categoryName:categoryname}
                //一级、二级、三级分类的a标签
                if(category1id){
                    query.category1Id=category1id
                }else if(category2id){
                    query.category2Id=category2id
                }else{
                    query.category3Id=category3id
                }
                //判断：如果路由跳转的时候，带有params参数，捎带着传递过去
                if(this.$route.params){
                    location.params = this.$route.params
                    //2.整理完参数
                    location.query = query;
                    //3.路由跳转
                    this.$router.push(location)
                }
            }
        },
        //当鼠标移入的时候，让商品分类列表进行展示
        enterShow(){
            if(this.$route.path!='/home'){
                this.show=true
            }
        },
    }
}
</script>

<style scoped lang="less">
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 48px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;
                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 28px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;
                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        &:hover {
                            .item-list {
                                display: block;
                            }
                        }
                    }
                    .cur{
                        background: skyblue;
                    }
                }
            }
            //过渡动画的样式
            //1.过渡动画开始状态：xx-enter
            .sort-enter{
                height: 0px;
            }
            //2.过渡动画的结束状态
            .sort-enter-to{
                height: 461px;
            }
            //3.定义动画时间、速率
            .sort-enter-active{
            overflow: hidden;
                transition:all .5s linear;
            }
        }
    }
</style>