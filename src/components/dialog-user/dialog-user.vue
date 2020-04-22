<template>
<!-- 新增 -->
    <el-dialog title='关联重点人员' :visible.sync="roleFormVisible" :before-close="handleClose" :close-on-click-modal="false" top="12vh" >
                        
                    <el-transfer
                        v-model="value"
                        :props="{
                        key: 'value',
                        label: 'desc'
                        }"
                        :titles="['可添加重点人员', '已添加重点人员']"
                        :button-texts="['移除', '添加']"
                        :data="data" filterable class="Transfer" @change="handleChange">
                    </el-transfer>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click.native="handleClose">关闭</el-button>
                    </div>
                </el-dialog>
</template>
<script>
import {getPersonStatusQuery,relationKyeUser,getReservePlan,getThisUser} from '@/api/table'
import { getRole } from '@/utils/auth'
export default {
    data(){
        return {
            roleFormVisible:false,
            roleLoading: false,
            roleName:"",
            id:"",
            //角色权限界面数据
            data: [],
            value: [],
            form:{},
            idArr:"",
            type:""
            
        }
        
    },
    methods:{
        //显示新增界面
			handleShow(row) {
                console.log(row)
                    this.id = row.userId
                    this.data=[]
                    this.value=[]
                    getPersonStatusQuery().then((res) => {
                        if(res.code=="0"){
                            let userList = res.data.data
                            console.log(userList)
                            let userArr = [];
                            for(let i = 0;i < userList.length; i++){
                                userArr.push({
                                    value: parseInt(userList[i].personnelStatus.keyUserid),
                                    desc: userList[i].personnelStatus.name
                                });
                            }
                            this.data=userArr
                            getThisUser({userId:row.userId}).then((res) => {
                                 if(res.code=="0"){
                                    let userList = res.data.KeyPersonnel_list
                                     let userArr = [];
                                    for(let i = 0;i < userList.length; i++){
                                        userArr.push(parseInt(userList[i].id));
                                    } 
                                    this.value = userArr
                                    console.log(this.value)
                                    this.roleFormVisible = true;
                                 }
                             })
                             
                            
                        }else{

                        }
                        
                    
                    }).catch(function (error) {
                        console.log(error);
                    });
                
				
            },
            //添加删除成员
            handleChange(value, direction, movedKeys) {
                let idArr=movedKeys.join();
                if(direction=="right"){
                    let params={}
                    params.UserId=this.id;
                    params.keyUserId=idArr
                    params.type=1
                    relationKyeUser(params).then((res)=>{
                    if(res.code=="0"){
                        this.$message({
                        message: '添加成功',
                        type: 'success'
                        });
                    }else{
                        this.$message({
                        message: '添加失败',
                        type: 'error'
                        });
                    }
                    }).catch(function (error) {
                        console.log(error);
                    });
                }else{
                    let params={}
                    params.UserId=this.id;
                    params.keyUserId=idArr
                    params.type=2
                    relationKyeUser(params).then((res)=>{
                    if(res.code=="0"){
                        this.$message({
                        message: '移除成功',
                        type: 'success'
                        });
                    }else{
                        this.$message({
                        message: '移除失败',
                        type: 'error'
                        });
                    }
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
                
            },
            handleClose() {
                this.roleFormVisible=false
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