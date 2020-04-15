<template>
    <el-container class="keypersonmanage-container">
      <my-tree></my-tree>
      <div class="keypersonmanage-table">
          <div class="keypersonmanage-button">
          <el-button size="small" type="primary" @click="newData">新增人员</el-button>
          </div>
          <my-table :tableTitle="tableTitle" :tableData="tableData" ref="table" @changeData="changeData" @removeData="removeData"></my-table>
          <my-dialog :tableTitle="handleTitle" :formRule="formRule" ref="dialog" @insertData="insertData" @updateData="updateData"></my-dialog>
      </div>
        
    </el-container>
</template>

<script>
import  myTable from '@/components/table/table'
import  myTree from '@/components/tree/tree'
import  myDialog from '@/components/dialog/dialog' 
import { getKeyPnlData,insertKeyPnlData,updateKeyPnlData,removeKeyPnlData } from '@/api/table'
export default {
  name: 'Keypersonmanage',
  components:{
    myTable,
    myTree,
    myDialog
  },
  data(){
    return{
        formRule:{
            
        },
        tableTitle:[
            { title : "姓名", name : "name", width : "120", type : "name" },
            { title : "病情描述", name : "level", minwidth : "150", type : "date" },
            { title : "联系电话", name : "phone", minwidth : "150", type : "date" },
            { title : "住址", name : "address", width : "120", type : "input" },
            { title : "所属组织", name : "organizationName", minwidth : "150", type : "input" },
            { title : "监护人", name : "guardian", width : "120", type : "input" },
            { title : "网络管理员", name : "networkAdministrator", minwidth : "150", type : "input" },
            { title : "责任医师", name : "responsiblePhysician", minwidth : "150", type : "input" },
            { title : "关联设备", name : "equipmentid", width : "120", type : "input" },
            { title : "操作",width : "150", type : "handle",button:[{name:"编辑",type:"edit"},{name:"删除",type:"remove"}] }
        ],
        handleTitle:[
            { title : "姓名", name : "name", type : "input" },
            { title : "病情描述", name : "level", type : "input" },
            { title : "联系电话", name : "phone", type : "number" },
            { title : "住址", name : "address", type : "input" },
            { title : "所属组织", name : "organizationId", type : "cascader" },
            { title : "监护人", name : "guardianId", type : "personselect" },
            { title : "网格管理员", name : "networkAdministratorId", type : "personselect" },
            { title : "责任医师", name : "responsiblePhysicianId", type : "personselect" },
            { title : "关联设备", name : "equipmentid", type : "equipselects" },
        ],
        tableData:[]
    }
  },
    methods: {
      getKeyPnlList(){
          this.$refs.table.listLoading=true
          getKeyPnlData().then(res=>{
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
        let arr = ["organ","person","equip"]
        this.$refs.dialog.handleShow(arr);
      },
      changeData(row){
        row.submitType="update"
        this.$refs.dialog.form=Object.assign({}, row)
        let arr = ["organ","person","equip"]
        this.$refs.dialog.handleShow(arr);
      },
      /* 新增数据 */
      insertData(para){
        insertKeyPnlData(para).then(res=>{
          this.$refs.dialog.loading = false;
          this.$refs.dialog.form={};
          this.$refs.dialog.formVisible = false;
          if(res.code==0){
            this.$message({
              message: '新增成功',
              type: 'success'
            });
            this.getKeyPnlList();
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
        updateKeyPnlData(para).then(res=>{
          this.$refs.dialog.loading = false;
          this.$refs.dialog.form={};
          this.$refs.dialog.formVisible = false;
          if(res.code==0){
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.getKeyPnlList();
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
        let param = {id : para.id}
        removeKeyPnlData(param).then(res=>{
          this.$refs.table.listLoading=false
          if(res.code==0){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getKeyPnlList();
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
      this.getKeyPnlList()
    }
    
}
</script>
<style lang="scss" scoped>
.keypersonmanage {
  &-container {
    width: 100%;
    height: 100%;
    position: relative;
  }
  &-table{
    width: 85%;
    height: 100%;
    padding: 1%;
    .keypersonmanage-button{
        position: absolute;
        top:4vh;
        right: 10vh;
        z-index: 1;
        font-size: 0.7vw;
    }
    
  }
}
</style>
