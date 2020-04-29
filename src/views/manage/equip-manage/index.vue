<template>
    <el-container class="equipmanage-container">
        <div class="equipmanage-container-handle">
          <label for="" class="equipmanage-container-handle-label">设备状态</label>
          <el-select v-model="valueW" filterable placeholder="请选择" @change="changeResultW">
            <el-option
              v-for="item in optionsW"
              :key="item.value"
              :label="item.label"
              :value="item.value" style="width:10vw">
            </el-option>
          </el-select>
          <label for="" class="equipmanage-container-handle-label">设备类型</label>
          <el-select v-model="value" filterable placeholder="请选择" @change="changeResult">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value" style="width:10vw">
            </el-option>
          </el-select>
           
        </div>
        <el-button size="small" type="primary" @click="newData">新增设备</el-button>
          <!-- <el-button type="primary">模板下载</el-button> -->
         
          <!-- <el-button type="primary">批量导入</el-button> -->
          <my-table :tableTitle="tableTitle" :tableData="tableData" ref="table" @changeData="changeData" @removeData="removeData"></my-table>
          <my-dialog :tableTitle="handleTitle" :formRule="formRule" ref="dialog" @insertData="insertData" @updateData="updateData" @untying="untying"></my-dialog>
        
    </el-container>
</template>

<script>
import  myTable from '@/components/table/table'
import  myDialog from '@/components/dialog/dialog' 
import { getEquipData,insertEquipData,updateEquipData,removeEquipData,untying } from '@/api/table'
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
        optionsW: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '正常'
        }, {
          value: '2',
          label: '离线'
        }, {
          value: '3',
          label: '预警'
        }
      ],
      options: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '活动监测器'
        }, {
          value: '2',
          label: '睡眠监测器'
        }, {
          value: '3',
          label: '智能手表'
        }],
        value:"",
        valueW:"",
        tableTitle:[
            { title : "编号", name : "code", minwidth : "120", type : "name" },
            { title : "设备状态", name : "equipmentState", width : "120", type : "input" },
            { title : "关联人员", name : "userName", width : "120", type : "input" },
            { title : "设备类型", name : "equipmentType", minwidth : "150", type : "equipselect" },
            { title : "温度", name : "temperature", minwidth : "150", type : "input" },
            { title : "电压", name : "voltage", minwidth : "150", type : "input" },
            { title : "操作",width : "150", type : "handle",button:[{name:"编辑",type:"edit"},{name:"删除",type:"remove"}] }
        ],
        handleTitle:[
            { title : "设备编号", name : "code", type : "input" },
            { title : "关联人员", name : "keyId", type : "userselect" },
            { title : "", type : "equipbutton" },
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
        param.equipmentState = this.valueW
        param.type = this.value
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
      console.log(row)
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
    //解绑设备
    untying(para){
      untying({equipmentId:para.equipmentId}).then(res=>{
        this.$refs.dialog.loading = false;
        this.$refs.dialog.form={};
        this.$refs.dialog.formVisible = false;
        if(res.code==0){
          this.$message({
            message: '解绑成功',
            type: 'success'
          });
          this.getEquipList();
        }else{
          this.$message({
            message: '解绑失败',
            type: 'danger'
          });
        }
      }).catch(err=>{

      })

    },
    changeResult(val){
      this.value=val;
      this.getEquipList()
    },
    changeResultW(val){
      this.valueW=val;
      this.getEquipList()
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
    &-handle{
      position: absolute;
      top: 2vh;
      left: 25vw;
      &-label{
        font-size: 0.7vw;
        color: #606266;
      }
      .el-select{
        width: 10vw;
      }
      
    }
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
