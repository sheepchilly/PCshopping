<template>
  <div id="box">
    <a :title="title">
        <!-- 通过v-bind="$attrs"把父元素传递过来的数据绑定在了el-button上，v-bind不能写成缩写形式：
            通过v-on="$listeners把父元素传递过来的自定义事件绑定在了el-button上，v-on不能写成缩写形式@" -->
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
    </a>
  </div>
</template>

<script>
export default {
    name:'',
    props:['title'],
    mounted() {
        //1.$attrs属于组件实例自身的一个属性，可以获取到父组件传递过来的props数据
        //对于子组件而言，父组件给的数据可以利用props接收，但是要注意：如果子组件通过props接收的属性，在$attrs属性当中是获取不到的
        console.log(this.$attrs);
        //2.$listeners，它是组件实例自身的一个属性，它可以获取到父组件给子组件传递自定义事件
        console.log(this.$listeners);
    },

}
</script>

<style>

</style>