<template>
    <div style="background-color: #ccc;height: 50px;">
      <h3>女儿 有存款:{{ money }}</h3>
      <button @click="giveMoney(50)">给爸爸钱50</button> 
      </div>
  </template>
  
  <script>
  import myMixin from '@/test/Mymixin/myMixin.js'
  export default {
      name:'',
      mixin:[myMixin],
      data(){
          return {
              money:5000
          }
      },
      methods:{
        giveMoney(money){
            this.money-=money;
            this.$parent.money2+=money
        }
      }
  }
  </script>
  
  <style>
  
  </style>