<template>
    <el-container class="personwarn-container">
          <my-table :tableTitle="tableTitle" :tableData="tableData" @changeData="changeData"></my-table>
          <dialog-warn-handle ref="sendData" @sendState='getSendData'></dialog-warn-handle>
    </el-container>
</template>

<script>
import  myTable  from '@/components/table/table'
import  dialogWarnHandle from '@/components/dialog-warn-handle/dialog'
import { getPerWarnlData } from "@/api/table"
import { getRole,getUser } from '@/utils/auth'
export default {
  name: 'Personwarn',
  components:{
    myTable,
    dialogWarnHandle
  },
  data(){
    return{
      tableTitle:[
            { title : "姓名", name : "name", width : "120", type : "link" },
            { title : "预警类型", name : "alertType", minwidth : "150", type : "input"},
            { title : "所属组织", name : "organizationName", width : "120", type : "input" },
            { title : "预警时间", name : "alertTime", minwidth : "150", type : "input" },
            { title : "监护人", name : "guardian", width : "120", type : "input" },
            { title : "网格管理员", name : "networkAdministrator", minwidth : "150", type : "input" },
            { title : "责任医师", name : "responsiblePhysician", width : "120", type : "input" },
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
      let role = JSON.parse(getRole())
      let user = JSON.parse(getUser());
      console.log(user)
      let param ={}
      param.roleId=role
      param.userId=user.userId
      param.organizaId=user.organizationId||""
      getPerWarnlData(param).then(res=>{
        if(res.code==0){
          console.log(res)
          this.tableData= res.data.data
        }
      }).catch(err=>{

      })
    },
    changeData(val){
      this.$refs.sendData.getDandleShow(val)
    },
    getSendData(val){
      this.getPerWarnlData()
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
