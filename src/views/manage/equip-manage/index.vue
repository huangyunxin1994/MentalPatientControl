<template>
    <el-container class="equipmanage-container">
        <div class="equipmanage-button">
          <el-button type="primary">模板下载</el-button>
          <el-button type="primary">新增设备</el-button>
          <el-button type="primary">批量导入</el-button>
          </div>
          <my-table :tableTitle="tableTitle"></my-table>
        
    </el-container>
</template>

<script>
import  myTable from '@/components/table/table'

export default {
  name: 'Equipmanage',
  components:{
    myTable,
  },
  data(){
    return{
        tableTitle:[
            { title : "设备编号", name : "name", minwidth : "120", type : "name" },
            { title : "设备名称", name : "startTime", minwidth : "150", type : "date" },
            { title : "设备类型", name : "endTime", minwidth : "150", type : "date" },
            { title : "关联人员", name : "duration", width : "120", type : "input" },
            { title : "操作",width : "150", type : "handle",button:[{name:"编辑",type:"edit"},{name:"删除",type:"remove"}] }
        ],
    }
  },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
.equipmanage {
  &-container {
    width: 100%;
    height: 100%;
    position: relative;
    .equipmanage-button{
        position: absolute;
        top:20px;
        right: 100px;
        z-index: 111;
    }
  }
}
</style>
