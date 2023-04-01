<template>
  <div>
    <li v-for="(item,index) in todos" :key="index">
        <!-- 子组件决定不了自己的结构，所以要使用作用域插槽 -->
        <slot :todo="item" :$index="index"></slot>
    </li>
  </div>
</template>

<script>
export default {
    name:'',
    props:{
        todos:Array
    }
}
</script>

<style>

</style>