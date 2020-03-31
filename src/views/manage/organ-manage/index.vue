<template>
    <el-container class="organmanage-container">
      <my-tree></my-tree>
      
      <div class="organmanage-table">
          <el-button type="primary">添加组织</el-button>
          <my-table :tableTitle="tableTitle"></my-table>
      </div>
        
    </el-container>
</template>

<script>
import  myTable from '@/components/table/table'
import  myTree from '@/components/tree/tree'
export default {
    name: 'Organmanage',
    components:{
        myTable,
        myTree
    },
    data(){
        return{
            tableTitle:[
            { title : "组织名称", name : "name", minwidth : "120", type : "name" },
            { title : "描述", name : "duration", minwidth : "120", type : "input" },
            { title : "关联管理员", name : "startTime", width : "150", type : "button" },
            { title : "关联用户", name : "endTime", width : "150", type : "button" },
            { title : "操作",width : "150", type : "handle",button:[{name:"编辑",type:"edit"},{name:"删除",type:"remove"}] }
            ],
        }
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
.organmanage {
  &-container {
    width: 100%;
    height: 100%;
    position: relative;
  }
  &-table{
    width: 85%;
    height: 100%;
    padding: 1%;
   .el-button{
        position: absolute;
        top:40px;
        right: 100px;
        z-index: 111;
    }
  }
}
</style>
