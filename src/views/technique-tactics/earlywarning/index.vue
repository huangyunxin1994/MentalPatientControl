<template>
    <el-container class="earlywarning-container">
      <my-tree></my-tree>
      <div class="earlywarning-table">
          <my-table :tableTitle="tableTitle" :tableData="tableData"  @changeData="changeData"></my-table>
      </div>
      <dialog-relation ref='sendData' @sendState='getSendData'></dialog-relation>
    </el-container>
</template>

<script>
import  myTable from '@/components/table/table'
import  myTree from '@/components/tree/tree'
import  dialogRelation from '@/components/dialog-relation/dialog'
import {getPersonStatusQuery , getKeyPnlData ,relationReservePlanList} from '@/api/table'
export default {
  name: 'Earlywarning',
  components:{
    myTable,
    myTree,
    dialogRelation
  },
  data(){
    return{
      tableTitle:[
            { title : "姓名", name : "name", width : "120", type : "input" },
            { title : "人员级别", name : "level", minwidth : "150", type : "input"},
            { title : "所属组织", name : "organizationName", width : "120", type : "input" },
            { title : "地址", name : "address", minwidth : "150", type : "input" },
            { title : "关联预案", name : "planName", width : "120", type : "input" },
            { title : "操作",width : "150", type : "handle",button:[{name:"关联预案",type:"edit"}] }
        ],
      tableData:[]
    }
  },
    methods: {
      getKeyPnlList(){
        getPersonStatusQuery().then((res)=>{
        if(res.code==0){
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
      },
      //获取到预警关联列表
      getKeyPnlDataList(){
        relationReservePlanList().then((res)=>{
          if(res.code == 0){
            var obj=[]
            this.tableData = res.data.data
          }
        }).catch((err)=>{

        })
      },
      changeData(val){
        console.log(val)
        this.$refs.sendData.getDandleResultShow(val)
      },
      getSendData(val){
        this.getKeyPnlDataList()
      }
    },
    mounted(){
      this.getKeyPnlList()
      this.getKeyPnlDataList()
    }
}
</script>
<style lang="scss" scoped>
.earlywarning {
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
