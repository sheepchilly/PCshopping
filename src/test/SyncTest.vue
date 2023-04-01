<template>
  <div id="box" style="background-color: #ccc;height:50px">
    <span>小明每次花100元</span>
    <!-- 这个money是把props里的money取出来计算，然后把这个值作为自定义事件的参数传给父组件 -->
    <button @click="$emit('update:money',money-100)">花钱</button>
    爸爸还剩下{{ money }}元
  </div>
</template>

<script>
export default {
    name:'',
    props:['money']
}
</script>

<style>

</style>