<template>
  <div id="box">
    <!-- 111111111111111111111111111111111 -->
    <h1>EventTest组件</h1>
    <!-- 原生Dom绑定系统事件 -->
    <button @click="ck">点我</button>
    <!-- 组件:Event1组件非原生DOM节点，而绑定的click事件并非原生DOM事件，而是自定义事件，所以要加.native
        @click.native可以把自定义事件变成原生Dom事件 -->
    <Event1 @click.native="handler1"/>

    <!-- 给原生的DOM绑定自定义事件没有任何意义，因为没有办法触发$emit函数 -->
    <button @xxx="handler2">原生DOM绑定自定义事件</button>
    <!-- 组件标签绑定两个自定义事件，叫@click和@xxx，共用一个回调函数 -->
    <Event2 @click="handler3" @xxx="handler3"/>

    <!-- 22222222222222222222222222222222 -->
    <h2>深入v-model</h2>
    <input type="text" v-model="msg">
    <span>{{ msg }}</span>
    <hr />
    <h2>v-model的实现原理</h2>
    <!-- oninput是原生DOM事件，它经常结合表单元素一起使用，当表单元素文本内容发生变化时触发
        Vue2:可以通过value与input事件实现v-model功能 -->
    <input type="text" :value="msg" @input="msg=$event.target.value">
    <span>{{ msg }}</span>
    <!-- 深入学习v-model：实现父子组件数据同步（实现父子组件通信） -->
    <hr/>
    <!-- :peiqi是什么？是props，父子组件通信
        @input到底是什么？并非原生的DOM的input事件，而是自定义事件 -->
    <Event1 :peiqi="msg" @input="msg=$event"/>
    <Event1 v-model="msg" />

    <!-- 333333333333333333333333333333 -->
    <hr/>
    小明的爸爸现在有{{ money }}元
    <h2>不使用sync修饰符</h2>
    <!-- 
        :money 父组件给子组件传递props
        @update:money 给子组件绑定的自定义事件 只不过名字叫做update:money
        目前现在这种操作，其实和v-model很相似，可以实现父子组件数据同步
     -->
    <syncTest :money="money" @update:money="money=$event"/>
    <h2>使用sync修饰符</h2>
    <!-- 
        :money.sync:
        第一，父组件给子组件传递了一个props叫money
        第二，给当前子组件绑定了一个自定义事件，而且事件名称为update:money==>update+当前属性的名字money
     -->
    <syncTest2 :money.sync="money" @update:money="money=$event"/>

    <!-- 4444444444444444444($attr与$listener) -->
    <h2>自定义带Hover提示的按钮</h2>
    <!-- 当用户在使用我们封装的按钮的时候，需要向HintButton组件传递相应的参数===> <el-button进行二次封装> -->
    <HintButton type="primary" icon="el-icon-plus" size="mini" title="提示按钮" @click="handler4">添加</HintButton>

    <!-- 55555555555555555555555($children和$parent) -->
    <hr>
    <h2>爸爸存款有:{{ money2 }}元</h2>
     <button @click="jieQian(100)">找小明借钱100</button>
     <button @click="jieMoney(50)">找小红借钱50</button>
     <button @click="alljieQian(200)">找所有孩子借钱200</button>
     <br>
     <!-- ref获取节点(组件标签)，可以log打印this.$refs.xm得到子组件身上的vm实例 -->
     <!-- 在Vue组件当中可以通过ref获取子组件，就可以进行操作子组件数据和方法 -->
     <Son ref="xm"/>
     <Daughter ref="xh"/>

     <!-- 66666666666666666插槽 -->
    <hr>
     <h2>效果一：显示TODO列表时，已完成的TODO为绿色</h2>
     <!-- 子组来源于父组件 -->
     <List :todos="todos">
        <!-- :todo="数据"，这里的todo即未回传的变量，在slot-scope中接收 -->
        <template slot-scope="todo">
            <span :style="{color:todo.todo.isComplete?'green':'red'}">{{ todo.todo.text }}</span>
        </template>
        <!-- 子组件决定不了它的结构与外观,父组件在template里决定的 -->
    </List>
     <hr>
     <h2>效果二：显示TODO列表时，带序号，TODO的颜色为蓝绿搭配</h2>
     <List1 :todos="todos">
        <template slot-scope="{todo,$index}">
            <span :style="{color:todo.isComplete?'yellow':'skyblue'}">{{$index}}----{{ todo.text }}</span>
        </template>
    </List1>
  </div>
</template>

<script>
import Event1 from './Event1.vue'
import Event2 from './Event2.vue'
import syncTest from './SyncTest.vue'
import syncTest2 from './SyncTest2.vue'
import HintButton from './HintButton'
import Son from './Children与Parent/son.vue'
import Daughter from './Children与Parent/daughter.vue'
import List from './TODO'
import List1 from './TODO/list.vue'
export default {
    name:'EventTest',
    data(){
        return {
            msg:'',
            money:10000,
            money2:10000,
            todos:[
                {id:1,text:'AAA',isComplete:false},
                {id:2,text:'BBB',isComplete:true},
                {id:3,text:'CCC',isComplete:false},
                {id:4,text:'DDD',isComplete:false},


            ]
        }
    },
    components:{
        Event1,
        Event2,
        syncTest,
        syncTest2,
        HintButton,
        Son,
        Daughter,
        List,
        List1
    },
    methods:{
        ck(){
            console.log('hello world');
        },
        handler1(){
            console.log('我是Event1的事件回调');
        },
        handler2(){
            console.log('我是原生DOM绑定自定义事件');
        },
        handler3(params){
            console.log('Event3的自定义事件',params);
        },
        handler4(){
            console.log('6666')
        },
        jieQian(money){ //向儿子小明借钱
            //父组件的钱加上儿子的，同时儿子组件的存款应该减
            this.money2+=money
            // console.log(this.$refs.xm);
            //ref可以获取到真实的DOM节点，也可以获取子组件标签(操作子组件的数据与方法)
            this.$refs.xm.money-=money
        },
        jieMoney(money){
            this.money2+=money
            this.$refs.xh.money-=money
        },
        alljieQian(money){
            this.money2+=2*money
            //组件实例自身拥有一个属性$children,可以获取到当前组件当中的全部子组件
            this.$children.forEach(item=>{
                item.money-=200
            })
            //切记！！别这样书写：如果子组件过多，第零项可能不是小明
            // this.$children[0].money-=200;
        }
    }
}
</script>

<style>
#box{
    margin-left: 50px;
}
</style>