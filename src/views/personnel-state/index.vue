<template>
    <el-container class="personneldetails-container">
      <my-tree></my-tree>
      <div class="personneldetails-table">
          <my-table :tableTitle="tableTitle" :tableData="tableData"></my-table>
      </div>
      <!-- <dialog-warn-handle ref="sendData"></dialog-warn-handle> -->
    </el-container>
</template>

<script>
import  myTable from '@/components/table/table'
import  myTree from '@/components/tree/tree'

import { getPersonStatusQuery } from '@/api/table'

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
            { title : "关联设备", name : "eqlist", minwidth : "150", type : "equip"},
            { title : "状态", name : "personnelStatus", width : "120", type : "input" },
            { title : "人员级别", name : "level", minwidth : "150", type : "input" },
            { title : "住址", name : "address", minwidth : "500", type : "input" },
            { title : "监护人", name : "guardian", minwidth : "150", type : "input" },
            { title : "网络管理员", name : "networkAdministrator", minwidth : "150", type : "input" },
            { title : "责任医师", name : "responsiblePhysician", width : "120", type : "input" },
            { title : "所属组织", name : "organizationName", minwidth : "150", type : "input" },
            { title : "联系电话", name : "phone", width : "120", type : "input" },
            { title : "身份证号", name : "idCard", minwidth : "150", type : "input" }
        ],
        tableData:[]
    }
  },
  methods: {
    getPersonStatusQuery(){
      getPersonStatusQuery().then((res)=>{
        if(res.code==0){
           console.log(res)
          console.log(res.data.data)
          var obj=[];
          for(let i in res.data.data){
            res.data.data[i].personnelStatus.eqlist=res.data.data[i].eqlist
            obj.push(res.data.data[i].personnelStatus)
          }
          console.log(obj)
          this.tableData=obj
        }

      }).catch((err)=>{

      })
    }
  },
  mounted(){
    this.getPersonStatusQuery()
    //this.$refs.sendData.getDandleShow(row)
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
