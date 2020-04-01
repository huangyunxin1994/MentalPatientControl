<template>
    <el-container class="equipmanage-container">
        <div class="equipmanage-button">
          <el-button type="primary">模板下载</el-button>
          <el-button type="primary">新增设备</el-button>
          <el-button type="primary">批量导入</el-button>
          </div>
          <my-table :tableTitle="tableTitle" :tableData="tableData" ref="table" @changeData="changeData" @removeData="removeData"></my-table>
          <my-dialog :tableTitle="handleTitle" :formRule="formRule" ref="dialog" @insertData="insertData" @updateData="updateData"></my-dialog>
        
    </el-container>
</template>

<script>
import  myTable from '@/components/table/table'
import  myDialog from '@/components/dialog/dialog' 
import { getEquipData,insertEquipData,updateEquipData,removeEquipData } from '@/api/table'
export default {
  name: 'Equipmanage',
  components:{
    myTable,
    myDialog
  },
  data(){
    return{
        formRule:{
            
        },
        tableTitle:[
            { title : "设备编号", name : "code", minwidth : "120", type : "name" },
            { title : "设备名称", name : "name", minwidth : "150", type : "date" },
            { title : "设备类型", name : "type", minwidth : "150", type : "date" },
            { title : "关联人员", name : "userName", width : "120", type : "input" },
            { title : "操作",width : "150", type : "handle",button:[{name:"编辑",type:"edit"},{name:"删除",type:"remove"}] }
        ],
        handleTitle:[],
        tableData:[]
    }
  },
    methods: {
      getEquipList(){
        this.$refs.table.listLoading=true
        getEquipData().then(res=>{
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
      insertEquipData(para).then(res=>{
        this.$refs.dialog.loading = false;
        this.$refs.dialog.form={};
        this.$refs.dialog.formVisible = false;
        if(res.code==0){
          this.$message({
            message: '新增成功',
            type: 'success'
          });
          this.getEquipList();
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
      updateEquipData(para).then(res=>{
        this.$refs.dialog.loading = false;
        this.$refs.dialog.form={};
        this.$refs.dialog.formVisible = false;
        if(res.code==0){
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.getEquipList();
        }else{
          this.$message({
            message: '修改失败',
            type: 'danger'
          });
        }
      })
    },
    /* 批量删除数据 */
    removeData(para){
      var ids = para.map(item => item.id).toString();
      let param = {id : ids}
      removeEquipData(param).then(res=>{
        this.$refs.table.listLoading=false
        if(res.code==0){
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getEquipList();
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
      this.getEquipList()
    }
}
</script>
<style lang="scss" scoped>
.equipmanage {
  &-container {
    width: 100%;
    height: 100%;
    position: relative;
    .equipmanage-button{
        position: absolute;
        top:20px;
        right: 100px;
        z-index: 111;
    }
  }
}
</style>
