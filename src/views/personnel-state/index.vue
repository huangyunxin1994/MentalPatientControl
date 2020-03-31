<template>
    <el-container class="personneldetails-container">
      <my-tree></my-tree>
      <div class="personneldetails-table">
          <my-table :tableTitle="tableTitle"></my-table>
      </div>
        
    </el-container>
</template>

<script>
import  myTable from '@/components/table/table'
import  myTree from '@/components/tree/tree'

export default {
  name: 'Personneldetails',
  components:{
    myTable,
    myTree
  },
  data(){
    return{
       tableTitle:[
            { title : "姓名", name : "name", width : "120", type : "link" },
            { title : "关联设备", name : "endTime", minwidth : "150", type : "equip"},
            { title : "状态", name : "duration", width : "120", type : "input" },
            { title : "人员级别", name : "reason", minwidth : "150", type : "input" },
            { title : "住址", name : "approvalResult", width : "120", type : "input" },
            { title : "监护人", name : "unsuccessfulReasons", minwidth : "150", type : "input" },
            { title : "网络管理员", name : "reason", minwidth : "150", type : "input" },
            { title : "责任医师", name : "approvalResult", width : "120", type : "input" },
            { title : "所属组织", name : "unsuccessfulReasons", minwidth : "150", type : "input" },
            { title : "联系电话", name : "approvalResult", width : "120", type : "input" },
            { title : "身份证号", name : "unsuccessfulReasons", minwidth : "150", type : "input" }
        ],
    }
  },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
.personneldetails {
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
