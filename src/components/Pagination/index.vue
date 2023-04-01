<template>
    <div class="pagination">
      <!-- 上 -->
        <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
        <button v-if="startNumAndendNum.start>1" @click="$emit('getPageNo',1)">1</button>
        <button v-if="startNumAndendNum.start>2">...</button> 
      <!-- 中间部分 -->
        <button 
        v-for="(page,index) in startNumAndendNum.end" :key="index" 
        v-if="page>=startNumAndendNum.start" 
        @click="$emit('getPageNo',page)"
        :class="{active:pageNo==page}"
        >
        {{ page }}
      </button>
      <!-- 下 -->
        <button v-if="startNumAndendNum.end<totalPage-1">...</button> 
        <button 
        v-if="startNumAndendNum.end<totalPage" 
        @click="$emit('getPageNo',totalPage)"
        :class="{active:pageNo==totalpage}"
        >
        {{ totalPage }}
      </button>
        <button
        @click="$emit('getPageNo',pageNo+1)"
        :disabled="pageNo==totalPage">下一页</button> 
        <button style="margin-left:30px">共 {{ total }} 条</button>
    </div>
  </template>

<script>
export default {
    name:'Pagination',
    //props:接收父组件传过来的数据
    props:['pageNo','pageSize','total','continues'],
    methods:{
      //计算出总共有多少页
      totalPage(){
        // Math.ceil向上取整
        return Math.ceil(this.total/this.pageSize)
      },
    },
    computed:{
      //计算出连续的页码的起始数字与结束数字(连续页码数字:至少5条)
      startNumAndendNum(){
        const {continues,pageNo,totalPage} = this
        //先定义两个变量存储起始数字与结束数字
        let start=0,end=0
        //连续页码数字为5（也就是至少5页数），如果出现不正常现象就是页码数少于5
        if(continues>totalPage){
          //不正常现象
          start=1
          end=totalPage
        }else{
          //正常现象
          start=pageNo-parseInt(continues/2)
          end=pageNo+parseInt(continues/2)
          //把出现不正常的现象(start数字出现0/负数)纠正
          if(start<1){
            start=1
            end=continues
          }
          //把出现不正常的现象(end数字大于总页码数)纠正
          if(end>totalPage){
            end = totalPage
            start = totalPage-continues+1
          }
        }
        return {start,end}
      }    
    }
}
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active{
  background: skyblue;
}
</style>