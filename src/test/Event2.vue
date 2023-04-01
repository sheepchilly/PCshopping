<template>
    <div class="box2">
      <button @click="$emit('click','自定义事件click')">点我1</button>
      <button @click="$emit('xxx','自定义事件xxx')">点我2</button>
    </div>
  </template>
  
  <script>
  export default {
      name:'Event2'
  }
  </script>
  
  <style>
    .box2{
        width: 100%;
        height: 100px;
        background-color: skyblue;
    }
  </style>