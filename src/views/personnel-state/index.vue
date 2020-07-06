<template>
    <el-container class="personneldetails-container">
      <my-tree @getThisOrgan="getThisOrgan"></my-tree>
      <div class="personneldetails-table">
          <my-table :tableTitle="tableTitle" :tableData="tableData" @changeRouter="changeRouter"></my-table>
      </div>
      <!-- <dialog-warn-handle ref="sendData"></dialog-warn-handle> -->
    </el-container>
</template>

<script>
import  myTable from '@/components/table/table'
import  myTree from '@/components/tree/tree'
import { getPersonStatusQuery } from '@/api/table'
import { getUser,getRole } from "@/utils/auth"
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
            { title : "状态", name : "thisState", width : "120", type : "input" },
            { title : "人员级别", name : "level", minwidth : "150", type : "input" },
            { title : "住址", name : "address", minwidth : "500", type : "input" },
            { title : "监护人", name : "guardian", minwidth : "150", type : "tooltip" },
            { title : "网格管理员", name : "wgList", minwidth : "150", type : "wglist" },
            { title : "责任医师", name : "zrList", minwidth : "150", type : "zrlist" },
            { title : "所属组织", name : "organizationName", minwidth : "150", type : "input" },
            { title : "联系电话", name : "phone", width : "120", type : "input" },
            { title : "身份证号", name : "idCard", minwidth : "150", type : "input" }
        ],
        tableData:[],
        currentPage:1,
        pageSize:20
    }
  },
  methods: {
    getPersonStatusQuery(){
      let user = JSON.parse(getUser())
      console.log(user)
      let organizationId = user.organizationId;
      let userid = user.userId;
      let role = JSON.parse(getRole())
      let currentPage = currentPage||this.currentPage
      let pageSize = this.pageSize
      let para ={roleId:role,userId:userid,currentPage:currentPage,pageSize:pageSize}
      getPersonStatusQuery(para).then((res)=>{
        if(res.code==0){
          console.log(res)
          console.log(res.data.data)
          var obj=[];
          for(let i in res.data.data){
            if(res.data.data[i].personnelStatus.warning==2){
              res.data.data[i].personnelStatus.thisState = 3
            }else{
              res.data.data[i].personnelStatus.thisState = res.data.data[i].personnelStatus.personnelStatus
            }
            res.data.data[i].personnelStatus.wgList=res.data.data[i].wgList
            res.data.data[i].personnelStatus.zrList=res.data.data[i].zrList
            res.data.data[i].personnelStatus.jhList=res.data.data[i].jhList
            res.data.data[i].personnelStatus.eqlist=res.data.data[i].eqlist
            obj.push(res.data.data[i].personnelStatus)
          }
          console.log(obj)
          this.tableData=obj
        }

      }).catch((err)=>{

      })
    },
    getThisOrgan(data){
     let user = JSON.parse(getUser())
      console.log(user)
      let organizationId = data.id;
      let userid = user.userId;
      let role = JSON.parse(getRole())
      let para ={organizationId:organizationId,roleId:role,userId:userid}
      getPersonStatusQuery(para).then((res)=>{
        if(res.code==0){
           console.log(res)
          console.log(res.data.data)
          var obj=[];
          for(let i in res.data.data){
            if(res.data.data[i].personnelStatus.warning==2){
              res.data.data[i].personnelStatus.thisState = 3
            }else{
              res.data.data[i].personnelStatus.thisState = res.data.data[i].personnelStatus.personnelStatus
            }
            res.data.data[i].personnelStatus.eqlist=res.data.data[i].eqlist
            obj.push(res.data.data[i].personnelStatus)
          }
          console.log(obj)
          this.tableData=obj
        }

      }).catch((err)=>{

      })
    },
    changeRouter(val){
      this.$router.push(
      {
          path: '/persondetails' ,
          query: {
            id: val.keyUserid,
            type:'1'
          }
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
