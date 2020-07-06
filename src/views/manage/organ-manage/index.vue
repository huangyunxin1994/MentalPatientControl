<template>
    <el-container class="organmanage-container">
      <my-tree @getThisOrgan="getThisOrgan" ref="tree"></my-tree>

      <div class="organmanage-table">
        <div class="organmanage-parent">
          <el-button size="small" type="primary" plain  @click="handlesetPos()">地图初始经纬度</el-button>
        </div>

          <el-button class="organmanage-table-button" type="primary" size="small" @click="newData">添加组织</el-button>
          <my-table :tableTitle="tableTitle" :tableData="tableData" ref="table" @changeData="changeData" @removeData="removeData" @bRemoveData="bRemoveData" @settingData="settingData"></my-table>
          <my-dialog :tableTitle="handleTitle" :formRule="formRule" ref="dialog" @insertData="insertData" @updateData="updateData"></my-dialog>
          <my-transfer ref="transfer"></my-transfer>
          <dialog-map ref="dialogmap"></dialog-map>
      </div>

    </el-container>
</template>

<script>
import  myTable from '@/components/table/table'
import  myTree from '@/components/tree/tree'
import  myDialog from '@/components/dialog/dialog'
import  myTransfer from '@/components/dialog-organ/dialog-user'
import  dialogMap  from '@/components/dialog-organ/dialog-map'
import { getChildOrganData,insertOrganData,updateOrganData,removeOrganData } from '@/api/table'
export default {
    name: 'Organmanage',
    components:{
        myTable,
        myTree,
        myDialog,
        myTransfer,
        dialogMap
    },
    data(){
        return{
            organData:{},
            formRule:{
              name: [{ required: true, message: '请输入组织名称', trigger: 'blur' }],
              parentId: [{ required: true, message: '请选择上级组织', trigger: 'blur' }]
            },
            tableTitle:[
            { title : "组织名称", name : "name", minwidth : "120", type : "name" },
            { title : "描述", name : "organization", minwidth : "120", type : "input" },
            { title : "关联管理用户", name : "user", width : "120", type : "button" },
            { title : "关联重点人员", name : "person", width : "120", type : "button" },
            { title : "操作",width : "100", type : "handle",button:[{name:"编辑",type:"edit"},{name:"删除",type:"remove"}] }
            ],
            handleTitle:[
              { title : "组织名称", name : "name", type : "input" },
              { title : "上级组织", name : "parentId", type : "cascader" },
              { title : "描述", name : "organization", type : "input" }
            ],
            organId:"",
            tableData:[],
            currentPage:1,
            pageSize:20,
        }
    },
    methods: {
      handleEdit(){
        let row = this.organData
        row.submitType="update"
        this.$refs.dialog.form=Object.assign({}, row)
        this.$refs.dialog.handleShow();
      },
      handlesetPos(){
        this.$refs.dialogmap.handleShow()
      },
      getThisOrgan(data,currentPage){
        this.organId= data.id
        if(data.children)
        delete data.children
        this.organData=data
        this.$refs.table.listLoading=true
        let param = {}
        param.currentPage = currentPage||this.currentPage
        param.pageSize = this.pageSize
        param.id = data.id
        getChildOrganData(param).then(res=>{
          if(res.code==0){
            this.tableData=res.data.data
            this.$refs.table.listLoading=false
          }

        }).catch(error => {
          console.log(error)
        })

      },
      newData(){
        console.log(this.organId)
        let para = {'submitType':"insert",parentId:this.organId}
        this.$refs.dialog.form=para
        let arr = ["organ"]
        this.$refs.dialog.handleShow(arr);
      },
      changeData(row){
        console.log(row)
        row.submitType="update"
        if(row.id==1)
        this.handleTitle=[
              { title : "组织名称", name : "name", type : "input" },
              { title : "描述", name : "organization", type : "input" }
        ]
        else
        this.handleTitle=[
              { title : "组织名称", name : "name", type : "input" },
              { title : "上级组织", name : "parentId", type : "cascader" },
              { title : "描述", name : "organization", type : "input" }
            ]
        this.$refs.dialog.form=Object.assign({}, row)
        let arr = ["organ"]
        this.$refs.dialog.handleShow(arr);
      },
      removeData(row){
        let para ={}
        para.id = row.id
          removeOrganData(para).then(res=>{
            if(res.code==0){
              this.$message({
              message: '删除成功',
              type: 'success'
              });
              this.$refs.table.listLoading=false
              this.$refs.tree.getOrganData()
            }else{
              this.$message({
              message: '删除失败',
              type: 'error'
              });
              this.$refs.table.listLoading=false
            }
          })
      },
      bRemoveData(row){

      },
      settingData(para,name){
        console.log(name)
        this.$refs.transfer.name=name;
         this.$refs.transfer.handleShow(para);
      },
      insertData(para){
        insertOrganData(para).then(res=>{
          if(res.code==0){
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.$refs.tree.getOrganData()
            this.$refs.dialog.loading = false;
            this.$refs.dialog.formVisible = false;
          }else{
            this.$message({
              message: '添加失败',
              type: 'error'
            });
            this.$refs.dialog.loading = false;
          }
        }).catch(res=>{
           this.$message({
              message: '添加失败',
              type: 'error'
            });
            this.$refs.dialog.loading = false;
        })

      },
      updateData(para){
        updateOrganData(para).then(res=>{
          if(res.code==0){
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.$refs.tree.getOrganData()
            this.$refs.dialog.loading = false;
            this.$refs.dialog.formVisible = false;
          }else{
            this.$message({
              message: '修改失败',
              type: 'error'
            });
            this.$refs.dialog.loading = false;
          }
        }).catch(res=>{
           this.$message({
              message: '修改失败',
              type: 'error'
            });
            this.$refs.dialog.loading = false;
        })
      }
    }
}
</script>
<style lang="scss" scoped>
.organmanage {
  &-container {
    width: 100%;
    height: 100%;
    position: relative;
  }
  &-table{
    width: 85%;
    height: 100%;
    padding: 1%;
   .organmanage-parent{
      position: absolute;
      top:4vh;
      right: 25vh;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1vw;
      z-index: 1;
      font-weight: bold;
      .el-button{
        margin-left: 1vw;
        font-size: 0.7vw;
      }
   }
   &-button{
        position: absolute;
        top:4vh;
        right: 10vh;
        z-index: 1;
        font-size: 0.7vw;
    }
  }
}
</style>
