<template>
<!-- 新增 -->
    <el-dialog title="新增" :visible.sync="formVisible" :before-close="handleClose" :close-on-click-modal="false" top="5vh"> 
     
            
           <el-scrollbar style="height:50vh">

           
            <div class="plantset-title">
                <label style="width:100px">预案名称</label><el-input placeholder="请输入员名称" v-model="form.name"> </el-input>
            </div>
            <div  v-for="(ite,index) in form.opt" :key="index" class="plantset-content"> 
              <div  class="plantset-title" v-if="ite.optName=='是否睡眠'">
                <label style="width:100px">预警类型</label><el-input placeholder="请输入员名称" v-model="form.opt[index].optName"> </el-input>
                <label style="width:100px">时间段</label>
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
                
                <label style="width:100px">行为</label><el-input placeholder="请输入员名称" v-model="form.opt[index].type"></el-input>
                 <label style="width:100px">大于</label><el-input placeholder="请输入员名称" v-model="form.opt[index].time"></el-input>小时
              </div>
              <div class="plantset-title" v-else-if="ite.optName=='睡眠质量'">
                 <label style="width:100px">预警类型</label><el-input placeholder="请输入员名称" v-model="form.opt[index].optName"> </el-input>
                <label style="width:100px">时间段</label>
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
                <label style="width:100px">活动次数</label> <el-input placeholder="请输入员名称" v-model="form.opt[index].times"></el-input>次
              </div>
                
              <div  class="plantset-title" v-else-if="ite.optName=='活动频率'">
                <label style="width:100px">预警类型</label><el-input placeholder="请输入员名称" v-model="form.opt[index].optName"> </el-input>
                <label style="width:100px">时间段</label>
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
               <label style="width:100px">频率大于</label><el-input placeholder="请输入员名称" v-model="form.opt[index].times"></el-input> 次
              </div>
              <div class="plantset-title" v-else-if="ite.optName=='活动时长'">
                <label style="width:100px">预警类型</label><el-input placeholder="请输入员名称" v-model="form.opt[index].optName"> </el-input>
                <label style="width:100px">时间段</label>
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
                <label style="width:100px">时长大于</label><el-input placeholder="请输入员名称" v-model="form.opt[index].times"></el-input>分
              </div>
              <div class="plantset-title" v-else-if="ite.optName=='心率'">
                <label style="width:100px">预警类型</label><el-input placeholder="请输入员名称" v-model="form.opt[index].optName"> </el-input>
                <label style="width:100px">时间段</label>
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
                <label style="width:100px">值</label><el-input placeholder="请输入员名称" v-model="form.opt[index].val"> </el-input>
                <el-input placeholder="请输入员名称" v-model="form.opt[index].times"></el-input><label style="width:100px">次/每分</label>
              </div>
              <div class="plantset-title"   v-else-if="ite.optName=='血压'">
                <label style="width:100px">预警类型</label><el-input placeholder="请输入员名称" v-model="form.opt[index].optName"> </el-input>
                <label style="width:100px">时间段</label>
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
                <label style="width:100px">值</label><el-input placeholder="请输入员名称" v-model="form.opt[index].val"> </el-input>
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
            form:{},
            startTime:"",
            endTime:""
            
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
            handleClose() {
                this.options=[]
                this.formVisible=false
                this.loading=false
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
    }
}
</style>