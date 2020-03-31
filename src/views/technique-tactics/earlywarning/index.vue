<template>
    <el-container class="earlywarning-container">
      <my-tree></my-tree>
      <div class="earlywarning-table">
          <my-table :tableTitle="tableTitle"></my-table>
      </div>
        
    </el-container>
</template>

<script>
import  myTable from '@/components/table/table'
import  myTree from '@/components/tree/tree'

export default {
  name: 'Earlywarning',
  components:{
    myTable,
    myTree
  },
  data(){
    return{
      tableTitle:[
            { title : "姓名", name : "name", width : "120", type : "name" },
            { title : "人员级别", name : "endTime", minwidth : "150", type : "equip"},
            { title : "所属组织", name : "duration", width : "120", type : "input" },
            { title : "地址", name : "reason", minwidth : "150", type : "input" },
            { title : "关联预案", name : "approvalResult", width : "120", type : "input" },
            { title : "操作",width : "150", type : "handle",button:[{name:"关联预案",type:"edit"}] }
        ],
    }
  },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
.earlywarning {
  &-container {
    width: 100%;
    height: 100%;
    position: relative;
  }
  &-table{
    width: 85%;
    height: 100%;
    padding: 1%;
    
  }
}
</style>
