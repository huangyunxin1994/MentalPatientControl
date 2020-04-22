<template>
<!-- 新增 -->
    <el-dialog :title="title" :visible.sync="formVisible" :before-close="handleClose" :close-on-click-modal="false" top="5vh" width="70vw"> 
            <div class="plantset-title" style="margin-bottom:4vh">
                <label>预案名称</label>
                <el-input placeholder="请输入" v-model="form.name" style="width:20vw"> </el-input>
                <el-button type="success" icon="el-icon-plus" circle size="mini" class="plantset-iconb" @click="addPlanSet"></el-button>
            </div>
            <el-scrollbar style="height:50vh">
            <div  v-for="(ite,index) in form.alertConditions" :key="index" class="plantset-content"> 
              <div  class="plantset-title" v-if="ite.alertId==1">
                <label>预警类型</label>
                <el-select v-model="form.alertConditions[index].alertId" filterable placeholder="请选择" @change="changeval(index)">
                    <el-option
                        v-for="item in planOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <label>时间段</label>
                <el-time-select
                    placeholder="起始时间"
                    v-model="form.alertConditions[index].startTime"
                    :picker-options="{
                    start: setStart,
                    step: setStep,
                    end: setEnd
                    }">
                </el-time-select>
                <el-time-select
                    placeholder="结束时间"
                    v-model="form.alertConditions[index].endTime"
                    :picker-options="{
                    start: setStart,
                    step: setStep,
                    end: setEnd
                    }">
                </el-time-select>
                
                <label>行为</label>
                <el-select v-model="form.alertConditions[index].averageAlert" filterable placeholder="请选择">
                    <el-option
                    v-for="item in typeOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                 <label>大于等于</label>
                 <el-input-number v-model="form.alertConditions[index].achieveAlert" :precision="1" :max="999"></el-input-number>
                 <label>小时</label>
                 <el-button type="danger" icon="el-icon-delete" circle size="mini" class="plantset-iconb" @click="removePlan(index)"></el-button>
              </div>
              <div class="plantset-title" v-else-if="ite.alertId==2">
                 <label>预警类型</label>
                  <el-select v-model="form.alertConditions[index].alertId" filterable placeholder="请选择" @change="changeval(index)">
                    <el-option
                    v-for="item in planOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <label>时间段</label>
                <el-time-select
                    placeholder="起始时间"
                    v-model="form.alertConditions[index].startTime"
                    :picker-options="{
                    start: setStart,
                    step: setStep,
                    end: setEnd
                    }">
                </el-time-select>
                <el-time-select
                    placeholder="结束时间"
                    v-model="form.alertConditions[index].endTime"
                    :picker-options="{
                    start: setStart,
                    step: setStep,
                    end: setEnd
                    }">
                </el-time-select>
                <label>活动次数</label>
                <el-input-number v-model="form.alertConditions[index].achieveAlert" :max="999"></el-input-number>
                <label>次</label>
                <el-button type="danger" icon="el-icon-delete" circle size="mini" class="plantset-iconb" @click="removePlan(index)"></el-button>
              </div>
                
              <div  class="plantset-title" v-else-if="ite.alertId==3">
                <label>预警类型</label>
                 <el-select v-model="form.alertConditions[index].alertId" filterable placeholder="请选择" @change="changeval(index)">
                    <el-option
                    v-for="item in planOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <label>时间段</label>
                <el-time-select
                    placeholder="起始时间"
                    v-model="form.alertConditions[index].startTime"
                    :picker-options="{
                    start: setStart,
                    step: setStep,
                    end: setEnd
                    }">
                </el-time-select>
                <el-time-select
                    placeholder="结束时间"
                    v-model="form.alertConditions[index].endTime"
                    :picker-options="{
                    start: setStart,
                    step: setStep,
                    end: setEnd
                    }">
                </el-time-select>
               <label>频率大于等于</label>
                <el-input-number v-model="form.alertConditions[index].achieveAlert" :max="999"></el-input-number>
               <label>次</label>
               <el-button type="danger" icon="el-icon-delete" circle size="mini" class="plantset-iconb" @click="removePlan(index)"></el-button>
              </div>
              <div class="plantset-title" v-else-if="ite.alertId==4">
                <label>预警类型</label>
                 <el-select v-model="form.alertConditions[index].alertId" filterable placeholder="请选择" @change="changeval(index)">
                    <el-option
                    v-for="item in planOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <label>时间段</label>
                <el-time-select
                    placeholder="起始时间"
                    v-model="form.alertConditions[index].startTime"
                    :picker-options="{
                    start: setStart,
                    step: setStep,
                    end: setEnd
                    }">
                </el-time-select>
                <el-time-select
                    placeholder="结束时间"
                    v-model="form.alertConditions[index].endTime"
                    :picker-options="{
                    start: setStart,
                    step: setStep,
                    end: setEnd
                    }">
                </el-time-select>
                <label>时长大于等于</label>
                <el-input-number v-model="form.alertConditions[index].achieveAlert" :max="999"></el-input-number>
                <label>分</label>
                <el-button type="danger" icon="el-icon-delete" circle size="mini" class="plantset-iconb" @click="removePlan(index)"></el-button>
              </div>
              <div class="plantset-title" v-else-if="ite.alertId==5">
                <label>预警类型</label>
                 <el-select v-model="form.alertConditions[index].alertId" filterable placeholder="请选择" @change="changeval(index)">
                    <el-option
                    v-for="item in planOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <label>时间段</label>
                <el-time-select
                    placeholder="起始时间"
                    v-model="form.alertConditions[index].startTime"
                    :picker-options="{
                   start: setStart,
                    step: setStep,
                    end: setEnd
                    }">
                </el-time-select>
                <el-time-select
                    placeholder="结束时间"
                    v-model="form.alertConditions[index].endTime"
                    :picker-options="{
                    start: setStart,
                    step: setStep,
                    end: setEnd
                    }">
                </el-time-select>
                <label>值</label>
                <el-select v-model="form.alertConditions[index].averageAlert" filterable placeholder="请选择">
                    <el-option
                    v-for="item in hOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-input-number v-model="form.alertConditions[index].achieveAlert" :max="999"></el-input-number>
                <label>次/每分</label>
                <el-button type="danger" icon="el-icon-delete" circle size="mini" class="plantset-iconb" @click="removePlan(index)"></el-button>
              </div>
              <div class="plantset-title"   v-else-if="ite.alertId==6">
                <label>预警类型</label>
                 <el-select v-model="form.alertConditions[index].alertId" filterable placeholder="请选择" @change="changeval(index)">
                    <el-option
                    v-for="item in planOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <label>时间段</label>
                <el-time-select
                    placeholder="起始时间"
                    v-model="form.alertConditions[index].startTime"
                    :picker-options="{
                    start: setStart,
                    step: setStep,
                    end: setEnd
                    }">
                </el-time-select>
                <el-time-select
                    placeholder="结束时间"
                    v-model="form.alertConditions[index].endTime"
                    :picker-options="{
                    start: setStart,
                    step: setStep,
                    end: setEnd
                    }">
                </el-time-select>
                <label>值</label>
                 <el-select v-model="form.alertConditions[index].averageAlert" filterable placeholder="请选择">
                    <el-option
                    v-for="item in bOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="danger" icon="el-icon-delete" circle size="mini" class="plantset-iconb" @click="removePlan(index)"></el-button>
              </div>
              
            </div>
            </el-scrollbar>
        <div slot="footer" class="dialog-footer">
            <el-button @click.native="handleClose">取消</el-button>
            <el-button type="primary" @click.native="addSubmit" :loading="loading">提交</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { parseTime } from '@/utils/index.js'
import { deleteRelationReservePlan,addReservePlan,insertPlan,insertAlertCondition,updatePlan,updateReservePlanAndCondition } from "@/api/table"
export default {
    props:{
        tableTitle:Array,
        formRule:Object,
        
    },
    data(){
        return {
            title:"",
            formVisible:false,
            loading: false,
            title:"",
            form:{
                name:"",
                alertConditions:[]
            },
            setStart:"00:00",
            setEnd:"23:45",
            setStep:"00:15",
            temp:[
                {alertId:1,startTime:"",endTime:"",averageAlert:"",achieveAlert:""},
                {alertId:2,startTime:"",endTime:"",averageAlert:"",achieveAlert:""},
                {alertId:3,startTime:"",endTime:"",averageAlert:"",achieveAlert:""},
                {alertId:4,startTime:"",endTime:"",averageAlert:"",achieveAlert:""},
                {alertId:5,startTime:"",endTime:"",averageAlert:"",achieveAlert:""},
                {alertId:6,startTime:"",endTime:"",averageAlert:"",achieveAlert:""},
            ],
            startTime:"",
            endTime:"",
            planOptions: [{
                value: 1,
                label: '是否睡眠'
                }, {
                value: 2,
                label: '睡眠质量'
                }, {
                value: 3,
                label: '活动频率'
                }, {
                value: 4,
                label: '活动时长'
                }, {
                value: 5,
                label: '心率'
                }, {
                value: 6,
                label: '血压'
                }
            ],
            typeOption:[
                {
                value: '在床',
                label: '在床'
                }, {
                value: '离床',
                label: '离床'
                }
            ],
            hOption:[
                {
                value: '大于等于',
                label: '大于等于'
                }, {
                value: '小于等于',
                label: '小于等于'
                }
            ],
            bOption:[
                {
                value: '高血压',
                label: '高血压'
                }, {
                value: '低血压',
                label: '低血压'
                }
            ],
            value: '',
            submitType:""
            
        }
    },
    methods:{
        //显示新增界面
            changeval(index){
                this.form.alertConditions[index].averageAlert=""
                this.form.alertConditions[index].achieveAlert=""
            },
			handleShow(submitType) {
                console.log(submitType)
                if(submitType=="update")
                    this.title="修改"
                else
                    this.title="新增"
                this.submitType=submitType
                this.formVisible = true;	
			},
            //新增
			addSubmit() {
                if(this.submitType=="update"){
                    let para = JSON.parse( JSON.stringify(this.form))
                    let param = {}
                    param.id = para.id
                    param.name = para.name
                    console.log(param)
                    updatePlan(param).then(res=>{
                        if(res.code==0){
                            let arr=para.alertConditions
                            updateReservePlanAndCondition(arr).then(res=>{
                                console.log(res)
                                if(res.code==0){
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    });
                                    this.formVisible = false;	
                                    this.$emit("getPlanQueryData")
                                }else{
                                    this.$message({
                                        message: '修改预案条件失败',
                                        type: 'error'
                                    });
                                }
                            }).catch(err=>{
                                this.$message({
                                    message: '修改预案条件失败',
                                    type: 'error'
                                });
                            })
                        }else{
                            this.$message({
                                message: '修改预案失败',
                                type: 'error'
                            });
                        }
                    }).catch(err=>{
                        this.$message({
                            message: '修改预案失败',
                            type: 'error'
                        });
                    })
                }else if(this.submitType=="insert"){
                    let para = JSON.parse( JSON.stringify(this.form))
                    let param = {}
                    param.name = para.name
                    param.createTime  = parseTime(new Date())
                    console.log(param)
                    insertPlan(param).then(res=>{
                        if(res.code==0){
                            let id = res.data.id
                            let arr = []
                            arr=para.alertConditions
                            for(let i in arr ){
                                arr[i].planId = id
                            }
                            addReservePlan(arr).then(res=>{
                                console.log(res)
                                if(res.code==0){
                                    this.$message({
                                        message: '新增成功',
                                        type: 'success'
                                    });
                                    this.formVisible = false;	
                                    this.$emit("getPlanQueryData")
                                }else{
                                    this.$message({
                                        message: '新增预案条件失败',
                                        type: 'error'
                                    });
                                }
                            }).catch(err=>{
                                this.$message({
                                    message: '新增预案条件失败',
                                    type: 'error'
                                });
                            })
                        }else{
                            this.$message({
                                message: '新增预案失败',
                                type: 'error'
                            });
                        }
                    }).catch(err=>{
                        this.$message({
                            message: '新增预案失败',
                            type: 'error'
                        });
                    })
                    
                }else{
                    this.$message({
                        message: '参数不明确',
                        type: 'error'
                     });
                }
            },
            addPlanSet(){
                console.log(this.temp)
                let para = JSON.parse(JSON.stringify(this.temp[0]))
                if(this.submitType=="update"){
                    para.planId = this.form.id
                    insertAlertCondition(para).then(res=>{
                        if(res.code==0){
                            para.id = res.data.id
                            this.form.alertConditions.push(para)
                            console.log(this.form)
                        }
                    })
                }else{
                    this.form.alertConditions.push(para)
                    console.log(this.form)
                }
                
                
            },
            handleClose() {
                this.options=[]
                this.formVisible=false
                this.form={
                    name:"",
                    alertConditions:[]
                },
                this.loading=false	
                this.$emit("getPlanQueryData")
            },
            removePlan(index){
                this.$confirm('确认删除该记录吗?', '提示', {
				    type: 'warning'
                }).then(() => {
                    
                    if(this.submitType=="update"){
                        let para = {cid:this.form.alertConditions[index].id}
                        deleteRelationReservePlan(para).then(res=>{
                            if(res.code==0){
                                 this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
                                this.form.alertConditions.splice(index,1)
                            }else{
                                this.$message({
                                    message: '删除失败',
                                    type: 'error'
                                });
                            }
                        })
                    }else{
                        this.$message({
                                    message: '删除成功',
                                    type: 'success'
                         });
                         this.form.alertConditions.splice(index,1)
                    }
                   
                }).catch(() => {

                });
               
            }
              
    }
}
</script>
<style lang="scss" scoped>
.plantset{
    &-title{
        width: 100%;
        margin: 1vh 0;
    }
    &-content{
        .el-input{
            width: 10%;
        }
        .el-input-number{
            width: 15%;
        }
        .el-select{
            width: 10%;
        }
    }
    &-iconb{
        float: right;
        margin-right: 2vw;
    }
}
</style>