<template>
<!-- 新增 -->
    <el-dialog title='关联用户' :visible.sync="roleFormVisible" :before-close="handleClose" :close-on-click-modal="false" top="12vh" >

                    <el-transfer
                        v-model="value"
                        :props="{
                        key: 'value',
                        label: 'desc'
                        }"
                        :titles="['可添加用户', '已添加用户']"
                        :button-texts="['删除', '添加']"
                        :data="data" filterable class="Transfer">
                    </el-transfer>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click.native="handleClose">取消</el-button>
                        <el-button type="primary" @click.native="submitData">完成</el-button>
                    </div>
                </el-dialog>
</template>
<script>
import {getUserData,getQueryUserRole,addUserRole,deleteUserRole} from '@/api/table'
import { getRole } from '@/utils/auth'
export default {
    props:{
        tableTitle:Array,
        userData:Array,
        userValue:Array
    },
    data(){
        return {
            roleFormVisible:false,
            roleLoading: false,
            roleName:"",
            roleId:"",
            //角色权限界面数据
            data: [],
            value: [],
            form:{}

        }

    },
    methods:{
        //显示新增界面
			handleShow(row) {
        console.log("*************************************")
        console.log(row)
          if(this.userData.length==0&&this.userValue.length==0){

              this.data=[]
              this.value=[]
              this.roleId=row.id
              getUserData().then((res) => {
                  if(res.code=="0"){
                      let userList = res.data.data
                      let userArr = [];
                      for(let i = 0;i < userList.length; i++){
                          userArr.push({
                              value: parseInt(userList[i].userId),
                              desc: userList[i].name
                          });
                      }
                      this.data=userArr
                      if(this.form.submitType=="update"){
                          let params={}
                          params.roleId=this.roleId;
                          params.type = 1
                          getQueryUserRole(params).then((res) => {
                              if(res.code=="0"){
                                  let valueList = res.data.data
                                  let valueArr = [];
                                  for(let i = 0;i < valueList.length; i++){
                                      let user_id = parseInt(valueList[i].user_id)
                                      valueArr.push(user_id);
                                  }
                                  this.value=valueArr
                                  this.roleFormVisible = true;
                                  this.$emit("initData",this.data,this.value)
                              }
                          })
                      }else{
                          this.value=[]
                          this.roleFormVisible = true;
                          this.$emit("initData",this.data,this.value)
                      }

                  }else{

                  }


              }).catch(function (error) {
                  console.log(error);
              });
          }else{
             this.data=this.userData
             this.value=this.userValue
             this.roleFormVisible = true;
          }


      },
      handleClose() {
          this.roleFormVisible=false
          //this.$emit("returnPre2",this.data,this.value)
      },
      submitData(){
          this.roleFormVisible=false
          this.$emit("submitData",this.value)
      },
      handleShow1(row){
        this.roleFormVisible=true
      }

    }
}
</script>
<style lang="scss" scoped>
.el-dialog{
    width: 35vw !important;
}
</style>
<style lang="scss">

.el-transfer-panel{
    width: 20vw;
    height:50vh;
}
 .el-transfer-panel__list.is-filterable{
        height: 40vh;
 }
 .el-transfer__buttons{
     display: flex;
     flex-direction: column;
     justify-content: space-between;
     align-items: center;

     .el-button{
         margin: 0;
         margin-bottom: 1vh;
         width: 100px;

     }
 }
 .Transfer{
     display: flex;
     justify-content: space-between;
     align-items: center
 }
</style>
