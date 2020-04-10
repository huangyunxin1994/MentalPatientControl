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
                        :data="data" filterable class="Transfer" @change="handleChange">
                    </el-transfer>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click.native="handleClose">关闭</el-button>
                        <el-button @click.native="handleSubmit">保存</el-button>
                    </div>
                </el-dialog>
</template>
<script>
import {getPersonStatusQuery,updateElectronicFence} from '@/api/table'
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
            form:{}
            
        }
        
    },
    methods:{
        //显示新增界面
			handleShow(row) {
                    this.id = row.id
                    this.data=[]
                    this.value=[]
                    getPersonStatusQuery().then((res) => {
                        if(res.code=="0"){
                            let userList = res.data.data
                            console.log(userList)
                            let userArr = [];
                            for(let i = 0;i < userList.length; i++){
                                userArr.push({
                                    value: parseInt(userList[i].personnelStatus.id),
                                    desc: userList[i].personnelStatus.name
                                });
                            }
                            this.data=userArr
                            for(let i in row.userList){
                                this.value.push(row.userList[i].id)
                            }
                            
                            this.roleFormVisible = true;
                            
                        }else{

                        }
                        
                    
                    }).catch(function (error) {
                        console.log(error);
                    });
                
				
            },
            //添加删除成员角色
            handleChange(value, direction, movedKeys) {
                let arr = []
                let params={}
                params.fenceId=this.id;
                params.keUserId=value.join()
                console.log(params)
                
                
            },
            handleClose() {
                this.roleFormVisible=false
            },
            handleSubmit(){
                let params={}
                params.fenceId=this.id;
                params.keUserId=this.value.join()
                updateElectronicFence(params).then((res)=>{
                    if(res.code=="0"){
                        this.$message({
                        message: '保存成功',
                        type: 'success'
                        });
                        this.roleFormVisible=false
                        this.$emit("selectElec")
                    }else{
                        this.$message({
                        message: '保存失败',
                        type: 'error'
                        });
                    }
                }).catch(function (error) {
                    console.log(error);
                });
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