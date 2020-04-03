<template>
    <el-container class="plansetting-container">
        <el-header>
      <breadcrumb></breadcrumb>
      </el-header>
      
          <div style="width:20%;padding-top:1vh;padding-left:20px">
                  <el-input ></el-input>
            </div>
            <div style="width:20%;padding-top:1vh;padding-left:20px">
                  <el-button type="primary">添加预案</el-button>
            </div>
            <el-main>
          <el-scrollbar style="height:100%;">
              
          <div class="planset" v-for="(item,index) in arr" :key="index">
            
            <div class="planset-content">
              <div class="planset-name">
                <span class="planset-label">预案名称:</span>
                <span>{{item.name}}</span>
              </div>
            </div>
            <div  v-for="(ite,index) in item.opt" :key="index"> 
              <div class="planset-content" v-if="ite.optName=='是否睡眠'">
                <span class="planset-span"><span class="planset-label">预警类型:</span>{{ite.optName}}</span>
                <span class="planset-date"><span class="planset-label">时间段:</span>{{ite.startTime}}至{{ite.endTime}}</span>
                <span class="planset-span"><span class="planset-label">行为:</span>{{ite.type}}</span>
                <span class="planset-span"><span class="planset-label">大于:</span>{{ite.time}}小时</span>
              </div>
              <div class="planset-content" v-else-if="ite.optName=='睡眠质量'">
                <span class="planset-span"><span class="planset-label">预警类型:</span>{{ite.optName}}</span>
                <span class="planset-date"><span class="planset-label">时间段:</span>{{ite.startTime}}至{{ite.endTime}}</span>
                <span class="planset-span"><span class="planset-label">活动次数:</span>{{ite.times}} 次</span>
              </div>
                
              <div class="planset-content" v-else-if="ite.optName=='活动频率'">
                <span class="planset-span"><span class="planset-label">预警类型:</span>{{ite.optName}}</span>
                <span class="planset-date"><span class="planset-label">时间段:</span>{{ite.startTime}}至{{ite.endTime}}</span>
                <span class="planset-span"><span class="planset-label">频率大于:</span>{{ite.times}} 次</span>
              </div>
              <div class="planset-content" v-else-if="ite.optName=='活动时长'">
                <span class="planset-span"><span class="planset-label">预警类型:</span>{{ite.optName}}</span>
                <span class="planset-date"><span class="planset-label">时间段:</span>{{ite.startTime}}至{{ite.endTime}}</span>
                <span class="planset-span"><span class="planset-label">时长大于:</span>{{ite.times}} 分</span>
              </div>
              <div class="planset-content" v-else-if="ite.optName=='心率'">
                <span class="planset-span"><span class="planset-label">预警类型:</span>{{ite.optName}}</span>
                <span class="planset-date"><span class="planset-label">时间段:</span>{{ite.startTime}}至{{ite.endTime}}</span>
                <span class="planset-span"><span class="planset-label">值:</span>{{ite.val}}</span>
                <span class="planset-span">{{ite.times}}<span class="planset-label">次/每分</span></span>
              </div>
              <div class="planset-content" v-else-if="ite.optName=='血压'">
                <span class="planset-span"><span class="planset-label">预警类型:</span>{{ite.optName}}</span>
                <span class="planset-date"><span class="planset-label">时间段:</span>{{ite.startTime}}至{{ite.endTime}}</span>
                <span class="planset-span"><span class="planset-label">值:</span>{{ite.val}}</span>
              </div>
              
            </div>
            <div class="planset-icon">
                <el-button type="warning" icon="el-icon-edit" size="mini"  @click="handleRemove(index)">删除</el-button>
                <el-button type="primary" icon="el-icon-delete" size="mini" @click="handleEdit(index)">编辑</el-button>
                
              </div>
            

          </div>
            
          </el-scrollbar>
          <my-dialog ref="dialog" ></my-dialog>
          <!-- @insertData="insertData" @updateData="updateData" -->
      </el-main>
      

    </el-container>
</template>
<script>
import breadcrumb from "@/components/Breadcrumb/index"
import myDialog from '@/components/dialog-planset/dialog' 
  export default {
    name: 'Plansetting',
    components:{
        breadcrumb,
        myDialog
    },
    data() {
      return {
        arr:[
              {name:"重度患者",
                opt:[
                    {optName:"是否睡眠",startTime:"23:00:00",endTime:"07:00:00",type:"离床",time:"0.5"},
                    {optName:"睡眠质量",startTime:"01:00:00",endTime:"05:00:00",times:"50"},
                    {optName:"活动频率",startTime:"01:00:00",endTime:"05:00:00",times:"50"},
                    {optName:"活动时长",startTime:"01:00:00",endTime:"05:00:00",times:"50"},
                    {optName:"心率",startTime:"07:00:00",endTime:"21:00:00",val:"大于",times:"120"},
                    {optName:"心率",startTime:"07:00:00",endTime:"21:00:00",val:"小于",times:"60"},
                    {optName:"血压",startTime:"07:00:00",endTime:"21:00:00",val:"高血压"},
                    {optName:"血压",startTime:"07:00:00",endTime:"21:00:00",val:"低血压"},
                ]
              },
              
              {name:"轻度患者",
                opt:[
                    {optName:"是否睡眠",startTime:"23:00:00",endTime:"07:00:00",type:"离床",time:"0.5"},
                    {optName:"睡眠质量",startTime:"01:00:00",endTime:"05:00:00",times:"50"},
                    {optName:"活动频率",startTime:"01:00:00",endTime:"05:00:00",times:"50"},
                    {optName:"活动时长",startTime:"01:00:00",endTime:"05:00:00",times:"50"},
                    {optName:"心率",startTime:"07:00:00",endTime:"21:00:00",val:"大于",times:"120"},
                    {optName:"心率",startTime:"07:00:00",endTime:"21:00:00",val:"小于",times:"60"},
                    {optName:"血压",startTime:"07:00:00",endTime:"21:00:00",val:"高血压"},
                    {optName:"血压",startTime:"07:00:00",endTime:"21:00:00",val:"低血压"},
                ]
              },
              
              {name:"预案1",
                opt:[
                    {optName:"是否睡眠",startTime:"23:00:00",endTime:"07:00:00",type:"离床",time:"0.5"},
                    {optName:"心率",startTime:"07:00:00",endTime:"21:00:00",val:"大于",times:"120"},
                    {optName:"心率",startTime:"07:00:00",endTime:"21:00:00",val:"小于",times:"60"},
                    {optName:"血压",startTime:"07:00:00",endTime:"21:00:00",val:"高血压"},
                    {optName:"血压",startTime:"07:00:00",endTime:"21:00:00",val:"低血压"},
                ]
              }
            ]

      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleEdit(i){
        let para = this.arr[i]
        this.$refs.dialog.form=Object.assign({}, para)
        this.$refs.dialog.handleShow();
      },
      handleRemove(i){

      }
    }
  }
</script>

<style lang="scss" scoped>
.plansetting {
  &-container {
    width: 100%;
    height: 100%;
    .planset{
      width: 100%;
      padding: 1vw;
      margin: 2vh 0;;
      border:1px solid #dcdfe6;
      border-radius: 0.5vw;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      font-size: 0.8vw;
      &-icon{
        display: flex;
        flex-direction: row-reverse;
        .el-button{
          margin-left: 1vw;
          width: 100px;
        }
      }
      &-label{
        font-weight:bold ;
        color: #606266;
      }
      &-name{
        font-size: 1vw;
      }
      &-content{
        width: 90%;
        padding: 1vh;
      }
      &-span{
        display: inline-block;
        width: 10vw;
        min-width: 100px;
      }
      &-date{
        display: inline-block;
         width: 12vw;
         min-width: 150px;
      }
    }
  }
}
</style>
