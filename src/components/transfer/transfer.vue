<template>
<!-- 新增 -->
    <el-dialog :title='Name' :visible.sync="FormVisible" center :close-on-click-modal="false" top="12vh" width="40vw">
                        
                    <el-transfer
                        v-model="value"
                        :props="{
                        key: 'value',
                        label: 'desc'
                        }"
                        :titles="['可添加', '已添加']"
                        :button-texts="['删除', '添加']"
                        :data="data" filterable @change="handleChange" class="Transfer">
                    </el-transfer>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click.native="FormVisible = false">关闭</el-button>
                    </div>
                </el-dialog>
</template>
<script>

export default {
    props:{
        tableTitle:Array
    },
    data(){
        return {
            FormVisible:false,
            Loading: false,
            Name:"",
            id:"",
            //角色权限界面数据
            data: [],
            value: []
            
        }
        
    },
    methods:{
        //显示界面
			handleShow(row) {
                this.data=[]
                this.value=[]
                this.Name = row.name
                this.id = row.id
                this.FormVisible=true
            },
            //添加删除成员角色
            handleChange(value, direction, movedKeys) {
                
                if(direction=="right"){
                   
                }else{
                   
                }
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