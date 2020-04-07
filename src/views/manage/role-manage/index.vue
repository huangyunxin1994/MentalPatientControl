<template>
    <el-container class="rolemanage-container">
          <el-button size="small" type="primary" @click.native="newData">新增角色</el-button>
          <my-table :tableTitle="tableTitle" :tableData="tableData" ref="table" @changeData="changeData" @removeData="removeData" @bRemoveData="bRemoveData"></my-table>
          <my-dialog1 :tableTitle="handleTitle" :formRule="formRule" ref="dialog1" @insertData="insertData" @updateData="updateData"></my-dialog1>
          <my-dialog2 :powerData="powerData" ref="dialog2" @insertData="insertData" @updateData="updateData"></my-dialog2>
          <my-dialog3 ref="dialog3" @insertData="insertData" @updateData="updateData"></my-dialog3>
    </el-container>
</template>

<script>
import  myTable from '@/components/table/table'
import  myDialog1 from '@/components/dialog-role/dialog' 
import  myDialog2 from '@/components/dialog-setpower/dialog' 
import  myDialog3 from '@/components/dialog-setuser/dialog' 
import { getRoleData,insertRoleData,updateRoleData,removeRoleData,bRemoveRoleData,getAllMenu } from '@/api/table'
import { getRole } from '@/utils/auth'
function filterArray(data) {
    data.forEach(function (item) {
    delete item.children;
    });
    var map = {};
    data.forEach(function (item) {
    map[item.menuId] = item;
    });
    var val = [];
    data.forEach(function (item) {
        var parent = map[item.parentId];
        if (parent) {
            (parent.children || ( parent.children = [] )).push(item);
        } else {
            val.push(item);
        }
    });
    return val;
}
export default {
  name: 'Rolemanage',
  components:{
    myTable,
    myDialog1,
    myDialog2,
    myDialog3
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
         tableData:[],
         roleData:[],
         userData:[],
         powerData:[]
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
      this.$refs.dialog1.form=para
      this.$refs.dialog1.handleShow();
    },
    changeData(row){
      row.submitType="update"
      this.$refs.dialog1.form=Object.assign({}, row)
      this.$refs.dialog1.handleShow();
    },
    /* 新增数据 */
    insertData(para){
      if(para.step==0){
        this.roleData.push(para)
        let roleid = getRole();
        console.log(roleid)
        getAllMenu({roleId:roleid}).then(res=>{
          if(res.code==0){
            let arr = res.data.data;
            console.log(arr)
            for(let i in arr){
              arr[i].query=0
              arr[i].operation=0
              arr[i].all=0
            }
            this.powerData=filterArray(arr)
            console.log(111)
            console.log( this.powerData)
            let para = {'submitType':"insert"}
            this.$refs.dialog2.form=para
            this.$refs.dialog1.formVisible = false;
            this.$refs.dialog2.handleShow();
          }else{
            this.$message({
              message: '查询失败',
              type: 'danger'
            });
          }
        })
      }else if(para.step==1){
        let para = {'submitType':"insert"}
        this.$refs.dialog3.form=para
        this.$refs.dialog2.formVisible = false;
        this.$refs.dialog3.handleShow();
      }
      
    },
    /* 修改数据 */
    updateData(para){
      updateRoleData(para).then(res=>{
        this.$refs.dialog1.loading = false;
        this.$refs.dialog1.form={};
        this.$refs.dialog1.formVisible = false;
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
        top:2vh;
        right: 10vh;
        z-index: 1;
        font-size: 0.7vw;
    }
  }
}
</style>
