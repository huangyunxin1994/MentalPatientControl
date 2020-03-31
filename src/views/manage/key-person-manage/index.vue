<template>
    <el-container class="keypersonmanage-container">
      <my-tree></my-tree>
      <div class="keypersonmanage-table">
          <div class="keypersonmanage-button">
          <el-button type="primary">新增人员</el-button>
          <el-button type="primary">批量导入</el-button>
          </div>
          <my-table :tableTitle="tableTitle"></my-table>
      </div>
        
    </el-container>
</template>

<script>
import  myTable from '@/components/table/table'
import  myTree from '@/components/tree/tree'

export default {
  name: 'Keypersonmanage',
  components:{
    myTable,
    myTree
  },
  data(){
    return{
        tableTitle:[
            { title : "姓名", name : "name", width : "120", type : "name" },
            { title : "病情描述", name : "startTime", minwidth : "150", type : "date" },
            { title : "联系电话", name : "endTime", minwidth : "150", type : "date" },
            { title : "住址", name : "duration", width : "120", type : "input" },
            { title : "所属组织", name : "reason", minwidth : "150", type : "input" },
            { title : "监护人", name : "approvalResult", width : "120", type : "input" },
            { title : "网络管理员", name : "unsuccessfulReasons", minwidth : "150", type : "input" },
            { title : "责任医师", name : "reason", minwidth : "150", type : "input" },
            { title : "关联设备", name : "approvalResult", width : "120", type : "input" },
            { title : "操作",width : "150", type : "handle",button:[{name:"编辑",type:"edit"},{name:"删除",type:"remove"}] }
        ],
    }
  },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
.keypersonmanage {
  &-container {
    width: 100%;
    height: 100%;
    position: relative;
  }
  &-table{
    width: 85%;
    height: 100%;
    padding: 1%;
    .keypersonmanage-button{
        position: absolute;
        top:40px;
        right: 100px;
        z-index: 111;
    }
    
  }
}
</style>
