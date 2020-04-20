<template>
    <el-container class="equipmanage-container">
        <div class="equipmanage-button">
          <!-- <el-button type="primary">模板下载</el-button> -->
          <el-button size="small" type="primary" @click="newData">新增设备</el-button>
          <!-- <el-button type="primary">批量导入</el-button> -->
          </div>
          <my-table :tableTitle="tableTitle" :tableData="tableData" ref="table" @changeData="changeData" @removeData="removeData"></my-table>
          <my-dialog :tableTitle="handleTitle" :formRule="formRule" ref="dialog" @insertData="insertData" @updateData="updateData"></my-dialog>
        
    </el-container>
</template>

<script>
import  myTable from '@/components/table/table'
import  myDialog from '@/components/dialog/dialog' 
import { getEquipData,insertEquipData,updateEquipData,removeEquipData } from '@/api/table'
import { getRole,getUser } from '@/utils/auth'
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
            { title : "编号", name : "code", minwidth : "120", type : "name" },
            { title : "设备状态", name : "equipment_state", width : "120", type : "input" },
            { title : "关联人员", name : "userName", width : "120", type : "input" },
            { title : "设备类型", name : "equipmentType", minwidth : "150", type : "equipselect" },
            { title : "温度", name : "temperature", minwidth : "150", type : "input" },
            { title : "电压", name : "voltage", minwidth : "150", type : "input" },
            { title : "操作",width : "150", type : "handle",button:[{name:"编辑",type:"edit"},{name:"删除",type:"remove"}] }
        ],
        handleTitle:[
            { title : "设备编号", name : "code", type : "input" },
            { title : "关联人员", name : "keyId", type : "userselect" },
            { title : "解绑", type : "button" },
            { title : "设备类型", name : "equipmentType", type : "equipselect" },
            
        ],
        tableData:[]
    }
  },
    methods: {
      getEquipList(){
        this.$refs.table.listLoading=true
        let role = JSON.parse(getRole())
        let user = JSON.parse(getUser());
        console.log(user)
        let param ={}
        param.roleId=role
        param.userId=user.userId
        param.organizationId=user.organizationId||""
        getEquipData(param).then(res=>{
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
      let para = {'submitType':"insert",equipmentType:1}
      this.$refs.dialog.form=para
      let arr = ["user"]
      this.$refs.dialog.handleShow(arr);
    },
    changeData(row){
      row.submitType="update"
      this.$refs.dialog.form=Object.assign({}, row)
      let arr = ["user"]
      this.$refs.dialog.handleShow(arr);
    },
    /* 新增数据 */
    insertData(para){
      para.type=para.equipmentType
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
      para.type=para.equipmentType
      console.log(para)
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
      console.log(para)
      var ids;
      if(Array.isArray(para))
        ids = para.map(item => item.id).toString();
      else
        ids = para.id
      let param = {equipmentId : ids}
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
        top:2vh;
        right: 10vh;
        z-index: 1;
        font-size: 0.7vw;
    }
  }
}
</style>
