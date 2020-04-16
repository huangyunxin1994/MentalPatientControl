<template>
<!-- 新增 -->
    <el-dialog :title="title" :visible.sync="formVisible" :before-close="handleClose" :close-on-click-modal="false" top="5vh" width="30vw">
                        
                    
                    <div v-for="(item,index) in powerData" :label="index" :key="index">
                        <span>{{item.name}}</span>
                        <div v-for="(ite,index) in item.children" :label="index" :key="index" class="power-item">
                             <el-checkbox :true-label='1' :false-label='0' v-model="ite.all"  @change="checkedList(ite)">{{ite.name}}</el-checkbox>
                             <div>
                             <el-checkbox :true-label='1' :false-label='0' v-model="ite.query" v-if="ite.menuId==9||ite.menuId==10" @change="checkedListForAll(ite)" >查询</el-checkbox>
                             <el-checkbox :true-label='1' :false-label='0' v-model="ite.operation" v-if="ite.menuId==9||ite.menuId==10" @change="checkedListForAll(ite)">操作</el-checkbox>
                             </div>
                        </div>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click.native="handleClose">上一步</el-button>
                        <el-button type="primary" @click.native="addSubmit" :loading="loading">下一步</el-button>
                    </div>
                </el-dialog>
</template>
<script>
export default {
    
    props:{
        powerData:Array
    },
    data(){
        return {
            formVisible:false,
            loading: false,
            options: [],
            //新增界面数据
            form: {},
            title:"",
            
        }
    },
    methods:{
        //显示新增界面
			handleShow() {
                this.title="角色权限配置"
                this.formVisible = true;	
			},
            //新增
			addSubmit() {
                //NProgress.start();
                let para = Object.assign({}, this.form);
                console.log(this.powerData)
                para.step=1
                if(para.submitType=="insert"){
                    this.$emit("insertData",para)
                }else if(para.submitType=="update"){
                    this.$emit("updateData",para)
                }else{
                    this.$message.warning("参数不明确");
                }
               
            },
            handleClose() {
                this.formVisible=false
                let para = Object.assign({}, this.form);
                //console.log(this.powerData)
                para.step=1
                this.$emit("returnPre",para)
            },
            checkedList(row){
                if(row.all==0){
                    row.query=0;
                    row.operation=0
                }else{
                    row.query=1;
                    row.operation=1
                }
                
            },
            checkedListForAll(row){
                if(row.query==1||row.operation==1){
                    row.all=1
                }else{
                    row.all=0
                }
            },
              
    }
}
</script>
<style lang="scss" scoped>
.power-item{
    margin-left: 3vw;
    display: flex;
    justify-content: space-between;
}
</style>