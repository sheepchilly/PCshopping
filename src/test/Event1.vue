<template>
  <div class="box1">
    你好啊！
    <h2>input包装组件</h2>
    <!-- :peiqi是动态的属性
      @input是给原生的DOM绑定原生的DOM事件 -->
    <input type="text" :peiqi="peiqi" @input="$emit('input',$event.target.value)">
  </div>
</template>

<script>
export default {
    name:'Event1',
    props:['peiqi']
}
</script>

<style>
.box1{
        width: 200px;
        height: 100px;
        background-color: pink;
    }
</style>