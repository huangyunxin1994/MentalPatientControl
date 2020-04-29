<template>
    <el-container class="rolemanage-container">
          <!-- <el-button size="small" type="primary" @click.native="newData">新增角色</el-button> -->
          <my-table :tableTitle="tableTitle" :tableData="tableData" ref="table" @changeData="changeData" @removeData="removeData" @bRemoveData="bRemoveData" @relevancePerson="relevancePerson"></my-table>
          <my-dialog1 :tableTitle="handleTitle" :formRule="formRule" ref="dialog1" @insertData="insertData" @updateData="updateData" @handleClosed="handleClosed"></my-dialog1>
          <my-dialog2 :powerData="powerData" ref="dialog2" @insertData="insertData" @updateData="updateData" @returnPre="returnPre"></my-dialog2>
          <my-dialog3 :userValue="userValue" ref="dialog3" :userData="userData"  @insertData="insertData" @updateData="updateData" @returnPre2="returnPre2" @initData="initData" @submitData="submitData"></my-dialog3>
    </el-container>
</template>

<script>
import  myTable from '@/components/table/table'
import  myDialog1 from '@/components/dialog-role/dialog'
import  myDialog2 from '@/components/dialog-setpower/dialog'
import  myDialog3 from '@/components/dialog-setuser/dialog'

import { getRoleData,insertRoleData,updateRoleData,removeRoleData,bRemoveRoleData,getAllMenu,addUserRole,deleteUserRole,addRoleRelationMenu} from '@/api/table'
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
function jsonToArray(nodes) {
      var r=[];
      if (Array.isArray(nodes)) {
        for (var i=0, l=nodes.length; i<l; i++) {

          r.push(nodes[i]); // 取每项数据放入一个新数组
          if (nodes[i]["children"]&&nodes[i]["children"].length>0)
            // 若存在children则递归调用，把数据拼接到新数组中，并且删除该children
            r = r.concat(jsonToArray(nodes[i]["children"]));
            delete nodes[i]["children"]
        }
      }
      return r;
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
            name: [{ required: true, message: '请输入角色', trigger: 'blur' }],
            state: [{ required: true, message: '请选择状态', trigger: 'blur' }]
          },
         tableTitle:[
            { title : "角色名称", name : "name", minwidth : "120", type : "input" },
            { title : "状态", name : "state", minwidth : "120", type : "radio" },
            { title : "描述", name : "remakes", minwidth : "120", type : "input" },
            { title : "操作",width : "150", type : "handle",button:[{name:"编辑",type:"edit"},{name:"关联",type:"relevance"}] }
            ],
         handleTitle:[
            { title : "角色名称", name : "name", type : "input" },
            { title : "状态", name : "state", type : "radio" },
            { title : "描述", name : "remakes", type : "input" },
         ],
         tableData:[],
         roleData:{},
         userData:[],
         userValue:[],
         powerData:[],
         sValue:[],
         roleid:''
    }
  },
  methods: {
    getRoleList(){
      this.$refs.table.listLoading=true
      getRoleData().then(res=>{
        //console.log(res)
        if(res.code==0){
          this.tableData=res.data.data
          //console.log(this.tableData)
          this.$refs.table.listLoading=false
        }

      }).catch(error => {
        //console.log(error)
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
    //关联人员
    relevancePerson(row){
      this.$refs.dialog3.handleShow(row)
    },
    /* 新增数据 */
    insertData(para){
      if(para.step==0){
        this.roleData=para
        let roleid = getRole();
        //console.log(roleid)
        if(this.powerData.length==0){
          getAllMenu({roleId:roleid}).then(res=>{
          if(res.code==0){
            let arr = res.data.data;
            //console.log(arr)
            for(let i in arr){
              arr[i].query=0
              arr[i].operation=0
              arr[i].all=0
            }
            this.powerData=filterArray(arr)
            this.powerData.reverse()
            //console.log(111)
            let para = {'submitType':"insert"}
            this.$refs.dialog2.form=para
            this.$refs.dialog1.formVisible = false;
            this.$refs.dialog2.handleShow();
          }else{
            this.$message({
              message: '查询失败',
              type: 'error'
            });
          }
          })
        }else{
           let para = {'submitType':"insert"}
            this.$refs.dialog2.form=para
            this.$refs.dialog1.formVisible = false;
            this.$refs.dialog2.handleShow();
        }

      }else if(para.step==1){
        // let para = {'submitType':"insert"}
        // this.$refs.dialog3.form=para
        this.$refs.dialog2.formVisible = false;
       // this.$refs.dialog3.handleShow();
        this.insertRoleData("11")
      }

    },
    /* 修改数据 */
    updateData(para){
      if(para.step==0){
        this.roleData=para
        this.roleid = para.id;
        //console.log(roleid)
        if(this.powerData.length==0){
          getAllMenu({roleId:this.roleid}).then(res=>{
          if(res.code==0){
            let arr = res.data.data;
            //console.log(arr)
            for(let i in arr){
              if(arr[i].query==1||arr[i].operation==1)
                arr[i].all=1
              else
                arr[i].all=0
            }
            this.powerData=filterArray(arr)
            this.powerData.reverse()
            //console.log(111)
            //console.log( this.powerData)
            let para = {'submitType':"update"}
            this.$refs.dialog2.form=para
            this.$refs.dialog1.formVisible = false;
            this.$refs.dialog2.handleShow();
          }else{
            this.$message({
              message: '查询失败',
              type: 'error'
            });
          }
          })
        }else{
           let para = {'submitType':"update"}
            this.$refs.dialog2.form=para
            this.$refs.dialog1.formVisible = false;
            this.$refs.dialog2.handleShow();
        }

      }else if(para.step==1){
        // let para = {'submitType':"update",'roleId':this.roleid}
        // this.$refs.dialog3.form=para
        this.$refs.dialog2.formVisible = false;
        //this.$refs.dialog3.handleShow();
        this.updateRoleData("11")
      }

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
            type: 'error'
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
            type: 'error'
          });
        }
      })
    },
    handleClosed(){
      this.roleData={};
      this.userData=[];
      this.userValue=[];
      this.sValue=[];
      this.powerData=[];
      this.roleid=""
    },
    /* 上一步 */
    returnPre(para){
      //console.log(this.roleData)
      this.$refs.dialog1.form=this.roleData
      this.$refs.dialog1.handleShow();
    },
    returnPre2(data,value){
      this.userData=data;
      this.userValue=value;
      let para = {'submitType':"insert"}
      this.$refs.dialog2.form=para
      this.$refs.dialog2.handleShow();
    },
    initData(data,value){
      this.userData=data;
      this.userValue=value;
      this.sValue=value;
    },
    submitData(value){
      //console.log(this.roleData)
      if(this.roleData.submitType=="insert"){
         this.insertRoleData(value)
      }else{
        this.updateRoleData(value)
      }
    },
    updateRoleData(value){
      updateRoleData(this.roleData).then(res=>{
        //console.log(res)
        if(res.code==0){
          //console.log(274)
          let dataArr = JSON.parse(JSON.stringify(this.powerData))
          let arr = jsonToArray(dataArr)
           //console.log(arr)
          let roleid = arr[0].roleId
          let para = []
          for(let i in arr){
              let params = {}
              params.roleId=arr[i].roleId
              params.meunId=arr[i].menuId
              params.query=arr[i].query;
              params.operation=arr[i].operation
              para.push(params)
          }
          this.addRoleRelationMenu(value,para,roleid)
        }else{
          this.$message({
              message: '修改角色失败',
              type: 'error'
            });
          this.handleClosed()
        }
      })
    },
    insertRoleData(value){
      insertRoleData(this.roleData).then((res)=>{
        if(res.code==0){
          let roleid = res.data.id
          //console.log(roleid)
          let dataArr = JSON.parse(JSON.stringify(this.powerData))
          //console.log(dataArr)
          let arr = jsonToArray(dataArr)
          //console.log("245")
          //console.log(arr)
          for(let i in arr)
          arr[i].roleId = roleid
          //console.log(arr)

          let para = []
          for(let i in arr){
              let params = {}
              params.roleId=arr[i].roleId
              params.meunId=arr[i].menuId
              params.query=arr[i].query;
              params.operation=arr[i].operation
              para.push(params)
          }
          this.addRoleRelationMenu(value,para,roleid)
        }else{
          this.$message({
              message: '新增角色失败',
              type: 'error'
            });
          this.handleClosed()
        }
      }).catch((err)=>{
        this.$message({
              message: '新增角色失败',
              type: 'error'
            });
          this.handleClosed()
      })
    },
    addRoleRelationMenu(value,arr,roleid){
      addRoleRelationMenu(arr).then((res)=>{
        if(res.code==0){
          //this.settingUser(value,roleid)
          this.$message({
              message: '保存成功',
              type: 'success'
            });
            this.handleClosed()
            this.getRoleList();
        }else{
          this.$message({
              message: '配置角色权限失败',
              type: 'error'
            });
          this.handleClosed()
        }
      }).catch((err)=>{
        this.$message({
              message: '配置角色权限失败',
              type: 'error'
        });
        this.handleClosed()
      })
    },
    settingUser(value,roleid){
      if(this.sValue.length>value.length){
        let arr = this.getArrDifference(this.sValue,value)
        //console.log(arr)
        let params={}
        params.roleId=roleid;
        params.type=1;
        params.userId=arr.join()
        deleteUserRole(params).then((res)=>{
          if(res.code==0){
            this.$message({
              message: '保存成功',
              type: 'success'
            });
            this.handleClosed()
            this.getRoleList();
          }else{
            this.$message({
              message: '配置角色用户失败',
              type: 'error'
            });
             this.handleClosed()
          }
        }).catch((err)=>{
          this.$message({
              message: '配置角色用户失败',
              type: 'error'
            });
             this.handleClosed()
        })
      }else if(this.sValue.length<value.length){
        let arr = this.getArrDifference(this.sValue,value)
        //console.log(arr)
        let params={}
        params.roleId=roleid;
        params.type=1;
        params.userId=arr.join()
        addUserRole(params).then((res)=>{
          if(res.code==0){
            this.$message({
              message: '保存成功',
              type: 'success'
            });
            this.handleClosed()
            this.getRoleList();
          }else{
            this.$message({
              message: '配置角色用户失败',
              type: 'error'
            });
             this.handleClosed()
          }
        }).catch((err)=>{
          this.$message({
              message: '配置角色用户失败',
              type: 'error'
            });
             this.handleClosed()
        })
      }else{
        this.$message({
              message: '保存成功',
              type: 'success'
            });
            this.handleClosed()
            this.getRoleList();
        }
    },
    getArrDifference(arr1, arr2) {
        return arr1.concat(arr2).filter(function(v, i, arr) {
            return arr.indexOf(v) === arr.lastIndexOf(v);
        });
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
