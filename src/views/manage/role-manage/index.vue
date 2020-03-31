<template>
    <el-container class="rolemanage-container">
          <el-button type="primary" @click.native="newData">新增角色</el-button>
          <my-table :tableTitle="tableTitle" :tableData="tableData" ref="table" @changeData="changeData" @removeData="removeData" @bRemoveData="bRemoveData"></my-table>
          <my-dialog :tableTitle="handleTitle" :formRule="formRule" ref="dialog" @insertData="insertData" @updateData="updateData"></my-dialog>
        
    </el-container>
</template>

<script>
import  myTable from '@/components/table/table'
import  myDialog from '@/components/dialog/dialog' 
import { getRoleData,insertRoleData,updateRoleData,removeRoleData,bRemoveRoleData } from '@/api/table'
export default {
  name: 'Rolemanage',
  components:{
    myTable,
    myDialog
  },
  data(){
    return{
          formRule:{
            name: [{ required: true, message: '请输入角色', trigger: 'blur' }]
          },
         tableTitle:[
            { title : "角色名称", name : "name", minwidth : "120", type : "input" },
            { title : "状态", name : "state", minwidth : "120", type : "radio" },
            { title : "描述", name : "remakes", minwidth : "120", type : "input" },
            { title : "操作",width : "150", type : "handle",button:[{name:"编辑",type:"edit"},{name:"删除",type:"remove"}] }
            ],
         handleTitle:[
            { title : "角色名称", name : "name", type : "input" },
            { title : "状态", name : "state", type : "radio" },
            { title : "描述", name : "remakes", type : "input" },
         ],
         tableData:[]
    }
  },
  methods: {
    getRoleList(){
      this.$refs.table.listLoading=true
      getRoleData().then(res=>{
        console.log(res)
        if(res.code==0){
          this.tableData=res.data.data
          console.log(this.tableData)
          this.$refs.table.listLoading=false
        }

      }).catch(error => {
        console.log(error)
      })
    },
    newData(){
      let para = {'submitType':"insert"}
      this.$refs.dialog.form=para
      this.$refs.dialog.handleShow();
    },
    changeData(row){
      row.submitType="update"
      this.$refs.dialog.form=Object.assign({}, row)
      this.$refs.dialog.handleShow();
    },
    /* 新增数据 */
    insertData(para){
      insertRoleData(para).then(res=>{
        this.$refs.dialog.loading = false;
        this.$refs.dialog.form={};
        this.$refs.dialog.formVisible = false;
        if(res.code==0){
          this.$message({
            message: '新增成功',
            type: 'success'
          });
          this.getRoleList();
        }else{
          this.$message({
            message: '新增失败',
            type: 'danger'
          });
        }
      })
    },
    /* 修改数据 */
    updateData(para){
      updateRoleData(para).then(res=>{
        this.$refs.dialog.loading = false;
        this.$refs.dialog.form={};
        this.$refs.dialog.formVisible = false;
        if(res.code==0){
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.getRoleList();
        }else{
          this.$message({
            message: '修改失败',
            type: 'danger'
          });
        }
      })
    },
    /* 删除数据 */
    removeData(para){
      removeRoleData(para).then(res=>{
        this.$refs.table.listLoading=false
        if(res.code==0){
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getRoleList();
        }else{
          this.$message({
            message: '删除失败',
            type: 'danger'
          });
        }
      })
    },
    /* 批量删除数据 */
    bRemoveData(para){
      var ids = para.map(item => item.id).toString();
      let param = {id : ids}
      bRemoveRoleData(param).then(res=>{
        this.$refs.table.listLoading=false
        if(res.code==0){
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getRoleList();
        }else{
          this.$message({
            message: '删除失败',
            type: 'danger'
          });
        }
      })
    },
  },
  mounted(){
    this.getRoleList()
  }
}
</script>
<style lang="scss" scoped>
.rolemanage {
  &-container {
    width: 100%;
    height: 100%;
    position: relative;
    .el-button{
        position: absolute;
        top:20px;
        right: 100px;
        z-index: 111;
    }
  }
}
</style>
