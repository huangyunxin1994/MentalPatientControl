<template>
    <el-container class="Equipwarn-container">
      
          <my-table :tableTitle="tableTitle" :tableData="tableData"></my-table>
        
    </el-container>
</template>

<script>
import  myTable  from '@/components/table/table'
import { getEquWarnlData } from "@/api/table"
export default {
  name: 'Equipwarn',
  components:{
    myTable
  },
  data(){
    return{
      tableTitle:[
            { title : "报警类型", name : "alertType", width : "120", type : "name" },
            { title : "设备名", name : "equipmentName", minwidth : "150", type : "input"},
            { title : "设备号", name : "equipmentCode", width : "120", type : "input" },
            { title : "设备类型", name : "equipmentType", minwidth : "150", type : "input" },
            { title : "关联人员", name : "keyName", width : "120", type : "input" },
            { title : "报警时间", name : "alertTime", minwidth : "150", type : "input" },
            { title : "处理完成时间", name : "approvalResult", width : "150", type : "input" },
            { title : "处理结果", name : "processingResult", minwidth : "150", type : "input" },
            { title : "处理记录", name : "approvalResult", width : "120", type : "input" },
            { title : "处理人", name : "unsuccessfulReasons", minwidth : "150", type : "input" },
            { title : "操作",width : "150", type : "handle",button:[{name:"处理",type:"edit"},{name:"删除",type:"remove"}] }
        ],
      tableData:[]
    }
  },
  methods: {
    getEquWarnlData(){
      getEquWarnlData().then(res=>{
        if(res.code==0){
          this.tableData= res.data.data
        }
      }).catch(err=>{

      })
    }
  },
  mounted(){
    this.getEquWarnlData()
  }
}
</script>
<style lang="scss" scoped>
.Equipwarn {
  &-container {
    width: 100%;
    height: 100%;
    position: relative;
  }
}
</style>
