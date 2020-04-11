<template>
    <el-container class="personwarn-container">
      
          <my-table :tableTitle="tableTitle"></my-table>
        
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
            { title : "预警类型", name : "endTime", minwidth : "150", type : "equip"},
            { title : "所属组织", name : "duration", width : "120", type : "input" },
            { title : "预警时间", name : "reason", minwidth : "150", type : "input" },
            { title : "监护人", name : "approvalResult", width : "120", type : "input" },
            { title : "网络管理员", name : "reason", minwidth : "150", type : "input" },
            { title : "责任医师", name : "approvalResult", width : "120", type : "input" },
            { title : "处理结果", name : "unsuccessfulReasons", minwidth : "150", type : "input" },
            { title : "处理时间", name : "approvalResult", width : "120", type : "input" },
            { title : "处理人", name : "unsuccessfulReasons", minwidth : "150", type : "input" },
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
