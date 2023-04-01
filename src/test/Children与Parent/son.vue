<template>
  <div style="background-color: #ccc;height: 50px;">
    <h3>儿子 有存款:{{ money }}</h3>
    <button @click="giveMoney(50)">给爸爸钱100</button> 
    </div>
</template>

<script>
import myMixin from '../Mymixin/myMixin.js'
export default {
    name:'',
    data(){
        return {
            money:3000
        }
    },
    methods:{
        giveMoney(money){
            this.money-=money
            //需要在子组件内部，获取到父组件，让父组件的数据加上50，
            //可以通过$parent属性获取到某一个组件父组件，可以操作父组件的数据与方法
            this.$parent.money2+=money
        }
    }
}
</script>

<style>

</style>