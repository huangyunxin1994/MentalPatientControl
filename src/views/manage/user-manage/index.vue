<template>
    <el-container class="usermanage-container">
      <my-tree></my-tree>
      <div class="usermanage-table">
          <el-button type="primary" @click.native="newData">新增用户</el-button>
          <my-table :tableTitle="tableTitle" :tableData="tableData" ref="table" @changeData="changeData" @removeData="removeData" @bRemoveData="bRemoveData"></my-table>
          <my-dialog :tableTitle="handleTitle" :formRule="formRule" ref="dialog" @insertData="insertData" @updateData="updateData"></my-dialog>
      </div>
        
    </el-container>
</template>

<script>
import  myTable from '@/components/table/table'
import  myTree from '@/components/tree/tree'
import  myDialog from '@/components/dialog/dialog' 
import { getUserData,insertUserData,updateUserData,removeUserData,bRemoveUserData } from '@/api/table'
export default {
  name: 'Usermanage',
  components:{
    myTable,
    myTree,
    myDialog
  },
  data(){
    return{
         formRule:{
            account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
            organizationName:[{ required: true, message: '请选择组织', trigger: 'blur' }]
          },
         tableTitle:[
            { title : "姓名", name : "name", width : "120", type : "name" },
            { title : "联系电话", name : "phone", minwidth : "150", type : "number" },
            { title : "账号", name : "account", width : "120", type : "input" },
            { title : "是否启用", name : "status", minwidth : "150", type : "radio" },
            { title : "是否复用", name : "multiplexMark", width : "120", type : "radio" },
            { title : "所属组织", name : "organizationName", minwidth : "150", type : "input" },
            { title : "操作",width : "150", type : "handle",button:[{name:"编辑",type:"edit"},{name:"删除",type:"remove"}] }
          ],
         handleTitle:[],
         
        tableData:[]
    }
  },
  methods: {
    getUserList(){
      this.$refs.table.listLoading=true
      getUserData().then(res=>{
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
      this.handleTitle=[
              { title : "账号", name : "account", type : "input" },
              { title : "密码", name : "password", type : "input" },
              { title : "姓名", name : "name", type : "input" },
              { title : "所属组织", name : "organizationName", type : "input" },
              { title : "联系电话", name : "phone", type : "number" },
              { title : "是否复用", name : "multiplexMark", type : "radio" }
      ]
      let para = {'submitType':"insert"}
      this.$refs.dialog.form=para
      this.$refs.dialog.handleShow();
    },
    changeData(row){
      this.handleTitle=[
              { title : "姓名", name : "name", type : "input" },
              { title : "所属组织", name : "organizationName", type : "input" },
              { title : "联系电话", name : "phone", type : "number" },
              { title : "是否复用", name : "multiplexMark", type : "radio" }
      ]
      row.submitType="update"
      this.$refs.dialog.form=Object.assign({}, row)
      this.$refs.dialog.handleShow();
    },
    /* 新增数据 */
    insertData(para){
      insertUserData(para).then(res=>{
        this.$refs.dialog.loading = false;
        this.$refs.dialog.form={};
        this.$refs.dialog.formVisible = false;
        if(res.code==0){
          this.$message({
            message: '新增成功',
            type: 'success'
          });
          this.getUserList();
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
      updateUserData(para).then(res=>{
        this.$refs.dialog.loading = false;
        this.$refs.dialog.form={};
        this.$refs.dialog.formVisible = false;
        if(res.code==0){
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.getUserList();
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
      removeUserData(para).then(res=>{
        this.$refs.table.listLoading=false
        if(res.code==0){
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getUserList();
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
      var ids = para.map(item => item.userId).toString();
      let param = {ids : ids}
      bRemoveUserData(param).then(res=>{
        this.$refs.table.listLoading=false
        if(res.code==0){
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getUserList();
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
    this.getUserList()
  }
}
</script>
<style lang="scss" scoped>
.usermanage {
  &-container {
    width: 100%;
    height: 100%;
    position: relative;
  }
  &-table{
    width: 85%;
    height: 100%;
    padding: 1%;
    .el-button{
        position: absolute;
        top:40px;
        right: 100px;
        z-index: 111;
    }
    
  }
}
</style>
