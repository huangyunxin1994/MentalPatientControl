<template>
    <el-container class="keypersonmanage-container">
      <my-tree @getThisOrgan="getThisOrgan"></my-tree>
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
import { getRole,getUser } from '@/utils/auth'
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
            organizationId:[{ required: true, message: '请选择组织', trigger: 'blur' }],
            guardianId:[{ required: true, message: '请选择监护人', trigger: 'blur' }],
            name:[{ required: true, message: '请输入姓名', trigger: 'blur' }],
        },
        tableTitle:[
            { title : "姓名", name : "name", width : "120", type : "name" },
            { title : "病情描述", name : "level", minwidth : "150", type : "date" },
            { title : "联系电话", name : "phone", minwidth : "150", type : "date" },
            { title : "住址", name : "address", minwidth : "300", type : "input" },
            { title : "所属组织", name : "organizationName", minwidth : "150", type : "input" },
            { title : "监护人", name : "jhlist", width : "120", type : "jhlist" },
            { title : "网络管理员", name : "wglist", minwidth : "150", type : "wglist" },
            { title : "责任医师", name : "zrlist", minwidth : "150", type : "zrlist" },
            { title : "关联设备", name : "eqlist", minwidth : "150", type : "equip"},
            { title : "操作",width : "150", type : "handle",button:[{name:"编辑",type:"edit"},{name:"删除",type:"remove"}] }
        ],
        handleTitle:[
            { title : "姓名", name : "name", type : "input" },
            { title : "病情描述", name : "level", type : "input" },
            { title : "联系电话", name : "phone", type : "number" },
            { title : "住址", name : "address", type : "input" },
            { title : "所属组织", name : "organizationId", type : "cascader" },
            { title : "监护人", name : "jhlist", type : "personselect" }
            // { title : "网格管理员", name : "networkAdministratorId", type : "personselect" },
            // { title : "责任医师", name : "responsiblePhysicianId", type : "personselect" }
        ],
        tableData:[]
    }
  },
    methods: {
      getKeyPnlList(){
        let role = JSON.parse(getRole())
        let user = JSON.parse(getUser());
        console.log(user)
        let param ={}
        param.roleId=role
        param.userId=user.userId
        param.organizationId=user.organizationId||""
          this.$refs.table.listLoading=true
          getKeyPnlData(param).then(res=>{
            console.log(res)
            if(res.code==0){
              let personlist = res.data.data
              let equiplist = res.data.equipment
              let userList = res.data.userList
              personlist.forEach((i)=>{
                console.log(i)
                console.log(equiplist)
                let arr = equiplist.filter((item)=>{
                  return item.key_id==i.id
                })
                let jhlist = userList.filter((item)=>{
                  return item.keyId==i.id&&item.roleId==4
                })
                 let wglist = userList.filter((item)=>{
                  return item.keyId==i.id&&item.roleId==2
                })
                let zrlist = userList.filter((item)=>{
                  return item.keyId==i.id&&item.roleId==3
                })
                i.eqlist=arr
                i.jhlist=jhlist
                i.wglist=wglist
                i.zrlist=zrlist
              })
              console.log(personlist)
              this.tableData = personlist
              this.$refs.table.listLoading=false
            }

        }).catch(error => {
          console.log(error)
        })
      },
      getThisOrgan(data){
        let role = JSON.parse(getRole())
        let user = JSON.parse(getUser());
        console.log(user)
        let param ={}
        param.roleId=role
        param.userId=user.userId
        param.organizationId=user.organizationId||""
        param.orId=data.id
          this.$refs.table.listLoading=true
          getKeyPnlData(param).then(res=>{
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
        let para = {'submitType':"insert",mappos:1}
        this.$refs.dialog.form=para
        let arr = ["organ","person","equip"]
        this.$refs.dialog.handleShow(arr);
      },
      changeData(row){
        row.submitType="update"
        row.mappos = 1
        console.log(row)
        this.$refs.dialog.form=Object.assign({}, row)
        let arr = ["organ","person","equip"]
        this.$refs.dialog.handleShow(arr);
      },
      /* 新增数据 */
      insertData(para){
        para.personnelStatus=1
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
              type: 'error'
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
              type: 'error'
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
              type: 'error'
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
