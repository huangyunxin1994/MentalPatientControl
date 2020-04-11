<template>
<!-- 新增 -->
    <el-dialog :title='title' :visible.sync="roleFormVisible" :before-close="handleClose" :close-on-click-modal="false" top="12vh" >
                        
                    <el-transfer
                        v-model="value"
                        :props="{
                        key: 'value',
                        label: 'desc'
                        }"
                        :titles="['可添加用户', '已添加用户']"
                        :button-texts="['删除', '添加']"
                        :data="data" filterable class="Transfer" @change="handleChange">
                    </el-transfer>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click.native="handleClose">关闭</el-button>
                    </div>
                </el-dialog>
</template>
<script>
import {findPresent,selectPresent,getUserData,relationKeyPersonnel,relationAdmin} from '@/api/table'
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
            type:"",
            name:"",
            title:""
        } 
    },
    methods:{
        //显示新增界面
			handleShow(row) {
                console.log(this.name)
                    this.id = row.id
                    this.data=[]
                    this.value=[]
                    if(this.name=="person"){
                        this.title="关联患者"
                        findPresent({organizaId:row.id}).then((res) => {
                        if(res.code=="0"){
                            let userList = res.data.data
                            console.log(userList)
                            let userArr = [];
                            for(let i = 0;i < userList.length; i++){
                                userArr.push({
                                    value: parseInt(userList[i].id),
                                    desc: userList[i].name
                                });
                            }
                            this.data=userArr
                            selectPresent({organizaId:row.id}).then((res) => {
                                if(res.code=="0"){
                                    let data = res.data.data
                                    console.log(data)
                                    let valueArr = [];
                                    for(let i = 0;i < data.length; i++){
                                        valueArr.push(parseInt(data[i].id));
                                    }
                                    this.value=valueArr
                                    this.roleFormVisible = true;
                                }else{

                                }
                            }).catch(function (error) {
                                console.log(error);
                            });
                            
                        }else{

                        }
                    
                        }).catch(function (error) {
                            console.log(error);
                        });
                    }else if(this.name=="user"){
                        this.title="关联管理"
                        getUserData().then((res) => {
                        if(res.code=="0"){
                            let userList = res.data.data
                            console.log(userList)
                            let userArr = [];
                            for(let i = 0;i < userList.length; i++){
                                userArr.push({
                                    value: parseInt(userList[i].userId),
                                    desc: userList[i].name
                                });
                            }
                            this.data=userArr
                            getUserData({organizationId:row.id}).then((res) => {
                                if(res.code=="0"){
                                    let data = res.data.data
                                    console.log(data)
                                    let valueArr = [];
                                    for(let i = 0;i < data.length; i++){
                                        valueArr.push(parseInt(data[i].userId));
                                    }
                                    this.value=valueArr
                                    this.roleFormVisible = true;
                                }else{

                                }
                            }).catch(function (error) {
                                console.log(error);
                            });
                            
                            
                            
                        }else{

                        }
                    
                        }).catch(function (error) {
                            console.log(error);
                        });
                    }
                    
                
				
            },
            //添加删除成员
            handleChange(value, direction, movedKeys) {
                let idArr=movedKeys.join();
                if(direction=="right"){
                    let params={}
                    params.organizaId=this.id;
                    params.keyUserId=idArr
                    params.type=1
                    if(this.name=="person"){
                        relationKeyPersonnel(params).then((res)=>{
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
                    }else if(this.name=="user"){
                        params.userId=idArr
                        relationAdmin(params).then((res)=>{
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
                    
                }else{
                    let params={}
                    params.organizaId=this.id;
                    params.keyUserId=idArr
                    params.type=2
                    if(this.name=="person"){
                        relationKeyPersonnel(params).then((res)=>{
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
                    }else if(this.name=="user"){
                        params.userId=idArr
                        relationAdmin(params).then((res)=>{
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
                }
                
            },
            handleClose() {
                this.roleFormVisible=false
                this.$emit("selectElec")
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