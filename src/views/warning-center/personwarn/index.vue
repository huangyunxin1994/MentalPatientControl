<template>
    <el-container class="personwarn-container">
      
          <my-table :tableTitle="tableTitle" :tableData="tableData"></my-table>
        
    </el-container>
</template>

<script>
import  myTable  from '@/components/table/table'
import { getPerWarnlData } from "@/api/table"
export default {
  name: 'Personwarn',
  components:{
    myTable
  },
  data(){
    return{
      tableTitle:[
            { title : "姓名", name : "keyUserid", width : "120", type : "link" },
            { title : "预警类型", name : "alertType", minwidth : "150", type : "input"},
            { title : "所属组织", name : "organizationId", width : "120", type : "input" },
            { title : "预警时间", name : "alertTime", minwidth : "150", type : "input" },
            { title : "监护人", name : "guardianId", width : "120", type : "input" },
            { title : "网格管理员", name : "networkAdministratorId", minwidth : "150", type : "input" },
            { title : "责任医师", name : "responsiblePhysicianId", width : "120", type : "input" },
            { title : "处理结果", name : "processingResult", minwidth : "150", type : "input" },
            { title : "处理时间", name : "handleTime", width : "120", type : "input" },
            { title : "处理人", name : "handleUsername", minwidth : "150", type : "input" },
            { title : "操作",width : "150", type : "handle",button:[{name:"处理",type:"edit"}] }
        ],
        tableData:[]
    }
  },
  methods: {
    getPerWarnlData(){
      getPerWarnlData().then(res=>{
        if(res.code==0){
          this.tableData= res.data.data
        }
      }).catch(err=>{

      })
    }
  },
  mounted(){
    this.getPerWarnlData()
  }
}
</script>
<style lang="scss" scoped>
.personwarn {
  &-container {
    width: 100%;
    height: 100%;
    position: relative;
  }
}
</style>
