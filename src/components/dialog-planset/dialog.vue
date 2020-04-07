<template>
<!-- 新增 -->
    <el-dialog title="新增" :visible.sync="formVisible" :before-close="handleClose" :close-on-click-modal="false" top="5vh" width="70vw"> 
            <div class="plantset-title" style="margin-bottom:4vh">
                <label>预案名称</label>
                <el-input placeholder="请输入" v-model="form.name" style="width:20vw"> </el-input>
                <el-button type="success" icon="el-icon-plus" circle size="mini" class="plantset-iconb" @click="addPlanSet"></el-button>
            </div>
            <el-scrollbar style="height:50vh">
            <div  v-for="(ite,index) in form.opt" :key="index" class="plantset-content"> 
              <div  class="plantset-title" v-if="ite.optName=='是否睡眠'">
                <label>预警类型</label>
                <el-select v-model="form.opt[index].optName" filterable placeholder="请选择">
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
                    v-model="form.opt[index].startTime"
                    :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                    }">
                </el-time-select>
                <el-time-select
                    placeholder="结束时间"
                    v-model="form.opt[index].endTime"
                    :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                    }">
                </el-time-select>
                
                <label>行为</label>
                <el-select v-model="form.opt[index].type" filterable placeholder="请选择">
                    <el-option
                    v-for="item in typeOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                 <label>大于</label>
                 <el-input-number v-model="form.opt[index].time" :precision="1" :max="999"></el-input-number>
                 <label>小时</label>
                 <el-button type="danger" icon="el-icon-delete" circle size="mini" class="plantset-iconb" @click="removePlan(index)"></el-button>
              </div>
              <div class="plantset-title" v-else-if="ite.optName=='睡眠质量'">
                 <label>预警类型</label>
                  <el-select v-model="form.opt[index].optName" filterable placeholder="请选择">
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
                    v-model="form.opt[index].startTime"
                    :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                    }">
                </el-time-select>
                <el-time-select
                    placeholder="结束时间"
                    v-model="form.opt[index].endTime"
                    :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                    }">
                </el-time-select>
                <label>活动次数</label>
                <el-input-number v-model="form.opt[index].stimes" :max="999"></el-input-number>
                <label>次</label>
                <el-button type="danger" icon="el-icon-delete" circle size="mini" class="plantset-iconb" @click="removePlan(index)"></el-button>
              </div>
                
              <div  class="plantset-title" v-else-if="ite.optName=='活动频率'">
                <label>预警类型</label>
                 <el-select v-model="form.opt[index].optName" filterable placeholder="请选择">
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
                    v-model="form.opt[index].startTime"
                    :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                    }">
                </el-time-select>
                <el-time-select
                    placeholder="结束时间"
                    v-model="form.opt[index].endTime"
                    :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                    }">
                </el-time-select>
               <label>频率大于</label>
                <el-input-number v-model="form.opt[index].astimes" :max="999"></el-input-number>
               <label>次</label>
               <el-button type="danger" icon="el-icon-delete" circle size="mini" class="plantset-iconb" @click="removePlan(index)"></el-button>
              </div>
              <div class="plantset-title" v-else-if="ite.optName=='活动时长'">
                <label>预警类型</label>
                 <el-select v-model="form.opt[index].optName" filterable placeholder="请选择">
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
                    v-model="form.opt[index].startTime"
                    :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                    }">
                </el-time-select>
                <el-time-select
                    placeholder="结束时间"
                    v-model="form.opt[index].endTime"
                    :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                    }">
                </el-time-select>
                <label>时长大于</label>
                <el-input-number v-model="form.opt[index].atimes" :max="999"></el-input-number>
                <label>分</label>
                <el-button type="danger" icon="el-icon-delete" circle size="mini" class="plantset-iconb" @click="removePlan(index)"></el-button>
              </div>
              <div class="plantset-title" v-else-if="ite.optName=='心率'">
                <label>预警类型</label>
                 <el-select v-model="form.opt[index].optName" filterable placeholder="请选择">
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
                    v-model="form.opt[index].startTime"
                    :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                    }">
                </el-time-select>
                <el-time-select
                    placeholder="结束时间"
                    v-model="form.opt[index].endTime"
                    :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                    }">
                </el-time-select>
                <label>值</label>
                <el-select v-model="form.opt[index].hval" filterable placeholder="请选择">
                    <el-option
                    v-for="item in planOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-input-number v-model="form.opt[index].htimes" :max="999"></el-input-number>
                <label>次/每分</label>
                <el-button type="danger" icon="el-icon-delete" circle size="mini" class="plantset-iconb" @click="removePlan(index)"></el-button>
              </div>
              <div class="plantset-title"   v-else-if="ite.optName=='血压'">
                <label>预警类型</label>
                 <el-select v-model="form.opt[index].optName" filterable placeholder="请选择">
                    <el-option
                    v-for="item in bOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <label>时间段</label>
                <el-time-select
                    placeholder="起始时间"
                    v-model="form.opt[index].startTime"
                    :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                    }">
                </el-time-select>
                <el-time-select
                    placeholder="结束时间"
                    v-model="form.opt[index].endTime"
                    :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                    }">
                </el-time-select>
                <label>值</label>
                 <el-select v-model="form.opt[index].bval" filterable placeholder="请选择">
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
export default {
    props:{
        tableTitle:Array,
        formRule:Object
    },
    data(){
        return {
            formVisible:false,
            loading: false,
            title:"",
            form:{
                name:"",
                opt:[
                ]
            },
            temp:[
                {optName:"是否睡眠",startTime:"",endTime:"",type:"",time:""},
                {optName:"睡眠质量",startTime:"",endTime:"",times:""},
                {optName:"活动频率",startTime:"",endTime:"",times:""},
                {optName:"活动时长",startTime:"",endTime:"",times:""},
                {optName:"心率",startTime:"",endTime:"",val:"",times:""},
                {optName:"心率",startTime:"",endTime:"",val:"",times:""},
                {optName:"血压",startTime:"",endTime:"",val:""},
                {optName:"血压",startTime:"",endTime:"",val:""},
            ],
            startTime:"",
            endTime:"",
            planOptions: [{
                value: '是否睡眠',
                label: '是否睡眠'
                }, {
                value: '睡眠质量',
                label: '睡眠质量'
                }, {
                value: '活动频率',
                label: '活动频率'
                }, {
                value: '活动时长',
                label: '活动时长'
                }, {
                value: '心率',
                label: '心率'
                }, {
                value: '血压',
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
                value: '大于',
                label: '大于'
                }, {
                value: '小于',
                label: '小于'
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
            value: ''
            
        }
    },
    methods:{
        //显示新增界面
			handleShow() {
                this.formVisible = true;	
			},
            //新增
			addSubmit() {
                
            },
            addPlanSet(){
                let para = JSON.parse(JSON.stringify(this.temp[0]))
                this.form.opt.push(para)
                console.log(this.form)
            },
            handleClose() {
                this.options=[]
                this.formVisible=false
                this.loading=false
            },
            removePlan(index){
                this.$confirm('确认删除该记录吗?', '提示', {
					    type: 'warning'
                }).then(() => {
                this.listLoading = true;
                //NProgress.start();
                 this.form.opt.splice(index,1)
                
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