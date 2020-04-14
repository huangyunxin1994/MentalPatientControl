<template>
    <el-container class="activestate-container">
        <el-scrollbar style="width:100%;height:100%">
        <el-header>
            <div class="activestate-header">
              <div class="activestate-title">人员详情</div>
              <el-row :gutter="20">
                <el-col :span="8">姓名：{{personData.name}}</el-col>
                <el-col :span="8">联系电话：{{personData.phone}}</el-col>
                <el-col :span="8">网格管理员：赵枫</el-col>
                <el-col :span="8">人员级别：二级</el-col>
                <el-col :span="8">住址：xxx省xxx市</el-col>
                <el-col :span="8">责任医师：钱塘</el-col>
                <el-col :span="8">病情描述：活动频率异常，情绪不稳定</el-col>
                <el-col :span="8">监护人：李四</el-col>
                <el-col :span="8">所属组织：{{personData.organizationName}}</el-col>
            </el-row>
          </div>
          <div class="activestate-handle">
                <my-date @getData="setDateTime"></my-date>
                <el-badge :value="warnNum" class="item">
                <el-button type="danger" @click='showDialogWarn' :disabled="warnActive">处理预警</el-button>
                </el-badge>
          </div>
        </el-header>
          <el-main>
            <div class="activestate-chart">
                <div id="activerate" style="width:50%; height:40vh;background:#fff;padding:20px;"/>
                <div id="activetime" style="width:50%; height:40vh;background:#fff;padding:20px;"/>
            </div>
            <div class="activestate-chart">
                <div id="heartrate" style="width:50%; height:40vh;background:#fff;padding:20px;"/>
                <div id="bloodpress" style="width:50%; height:40vh;background:#fff;padding:20px;"/>
            </div>
            <div class="activestate-chart">
                <div id="sleepquality" style="width:50%; height:40vh;background:#fff;padding:20px;"/>
                <div id="inouthome" style="width:50%; height:40vh;background:#fff;padding:20px;"/>
            </div>
        </el-main>
         </el-scrollbar>
      <el-row>

      </el-row>
       <dialog-warn @dialog="getDialogData" ref="senda" :message="warnTableData" ></dialog-warn>
    </el-container>
</template>

<script>
import echarts from 'echarts'
import myDate from "@/components/date/date"
import { parseTime } from '@/utils/index.js'
import { getPerSe , getWarnListData } from '@/api/table'
import dialogWarn from '@/components/dialog-warn/dialog'
export default {
  name: 'Activestate',
  components:{
      myDate,
      dialogWarn

  },
  data(){
    return{
      value4:"",
      echartsData:{},
      dateTime:"",
      personData:{},
      dialoWarn:false,
      dialogTableVisible:false,
      warnTableData: 'aaa',
      warnActive: false,
      warnNum:0
    }
  },
    methods: {
      setDateTime(val){
          this.dateTime=val.getTime();
          this.drawChart()
      },
      getEchartData(){
          let time=this.dateTime;
          if(time==""){
              time=new Date(new Date().toLocaleDateString()).getTime()
          }
          getPerSe
          let data=[];
          for(let i = 0; i < 25; i ++){
              let para=[]
              para.push(time+i*3600*1000)
              para.push(Math.ceil(Math.random()*100))
              // para.push(Math.ceil(Math.round(Math.random()*100)))
              // para.push(Math.ceil(Math.round(Math.random())))
              data.push(para)
          }
          return data
      },
      formatterFun(e){
        var d=new Date(e);
        var getHour = d.getHours()<10?"0"+d.getHours():d.getHours()

        var getMinute = d.getMinutes()<10?"0"+d.getMinutes():d.getMinutes()
        return getHour+":"+getMinute

      },
      drawChart() {
                let activerate = echarts.init(document.getElementById('activerate'));
                let activetime = echarts.init(document.getElementById('activetime'));
                let heartrate = echarts.init(document.getElementById('heartrate'));
                let bloodpress = echarts.init(document.getElementById('bloodpress'));
                let sleepquality = echarts.init(document.getElementById('sleepquality'));
                let inouthome = echarts.init(document.getElementById('inouthome'));
                let option1={
                    title: {text: '活动频率'},
                    tooltip:{trigger: 'axis',},
                    legend: {data:['今日','平均']},
                    xAxis: {
                      type: 'time',
                      boundaryGap: false,
                      name:"单位:小时",
                      interval:4*3600*1000,
                        axisLabel : {
                            formatter: this.formatterFun
                        }
                    },
                    yAxis: {
                        type: 'value',
                        name:"单位:次",
                        min: 0,
                        max: 100,
                        splitNumber: 5
                    },
                    series: [{
                        name:"今日",
                        data: this.getEchartData(),
                        type: 'line',
                        itemStyle: {     //此属性的颜色和下面areaStyle属性的颜色都设置成相同色即可实现
                            color: '#E6A23C',
                            borderColor: '#E6A23C',
                        }
                    },
                    {
                        name:"平均",
                        data: this.getEchartData(),
                        type: 'line',
                        itemStyle: {     //此属性的颜色和下面areaStyle属性的颜色都设置成相同色即可实现
                            color: '#409EFF',
                            borderColor: '#409EFF',
                        }
                    }
                    ]
                }
                let option2={
                    title: {text: '活动次数'},
                    tooltip:{trigger: 'axis',},
                    legend: {data:['今日','平均']},
                    xAxis: {type: 'time',boundaryGap: false,name:"单位:小时",interval:4*3600*1000,
                        axisLabel : {
                            formatter: this.formatterFun
                        }
                    },
                    yAxis: {
                        type: 'value',
                        name:"单位:分钟",
                        x: 'center',
                        splitLine: {
                          lineStyle: {
                            type: 'dashed'
                          }
                        },
                        min:84,
                        max:104,
                        splitNumber: 4
                    },
                    series: [{
                        name:"今日",
                        data: this.getEchartData(),
                        type: 'line',
                        itemStyle: {     //此属性的颜色和下面areaStyle属性的颜色都设置成相同色即可实现
                            color: '#E6A23C',
                            borderColor: '#E6A23C',
                        }
                    },
                    {
                        name:"平均",
                        data: this.getEchartData(),
                        type: 'line',
                        itemStyle: {     //此属性的颜色和下面areaStyle属性的颜色都设置成相同色即可实现
                            color: '#409EFF',
                            borderColor: '#409EFF',
                        }
                    }
                    ]
                }
                let option3={
                    title: {text: '心率'},
                    tooltip:{trigger: 'axis',},
                    backgroundColor:'#fadfe2',
                    xAxis: {
                        type: 'time',
                        boundaryGap: false,
                        name:"单位:小时",
                        interval:2*3600*1000,
                        axisLabel : {
                            formatter: this.formatterFun
                        }
                    },
                    yAxis: {
                        type: 'value',
                        name:"单位:bpm",
                        min:60,
                        max:90,
                        splitNumber: 7
                    },
                    series: [{
                        name:"今日",
                        data: this.getEchartData(),
                        type: 'line',
                        itemStyle: {     //此属性的颜色和下面areaStyle属性的颜色都设置成相同色即可实现
                            color: '#E6A23C',
                            borderColor: '#E6A23C',
                        }
                    }
                    ]
                }
                let option4={
                    title: {text: '血压'},
                    tooltip:{trigger: 'axis',},
                    legend: {data:['高压','低压']},
                    xAxis: {
                        type: 'time',
                        boundaryGap: false,
                        name:"单位:小时",
                        interval:2*3600*1000,
                        axisLabel : {
                            formatter: this.formatterFun
                        }
                    },
                    yAxis: {
                        type: 'value',
                        name:"单位:mmHg",
                        min:60,
                        max:130,
                        splitNumber: 10
                    },
                    series: [{
                        name:"高压",
                        data: this.getEchartData(),
                        type: 'line',
                        itemStyle: {     //此属性的颜色和下面areaStyle属性的颜色都设置成相同色即可实现
                            color: '#E6A23C',
                            borderColor: '#E6A23C',
                        }
                    },
                    {
                        name:"低压",
                        data: this.getEchartData(),
                        type: 'line',
                        itemStyle: {     //此属性的颜色和下面areaStyle属性的颜色都设置成相同色即可实现
                            color: '#409EFF',
                            borderColor: '#409EFF',
                        }
                    }
                    ]
                }
                let option5={
                    title: {text: '睡眠质量'},
                    tooltip:{trigger: 'axis',},
                    legend: {data:['今日','平均']},
                    xAxis: {
                        type: 'time',
                        boundaryGap: false,
                        name:"单位:小时",
                        interval:2*3600*1000,
                        axisLabel : {
                            formatter: this.formatterFun
                        }
                    },
                    yAxis: {
                        type: 'value',
                        name:"单位:次",
                        min:0,
                        max:10,
                        splitNumber: 10,
                        axisLabel: {
                          formatter: function(value,index){
                      		var value;
                      		if (value == 1) {
                      			value = '睡觉';
                      		}else if(value != 1){
                      			value = value;
                      		}
                      		return value
                      	}
                      },
                    },
                    series: [{
                        name:"今日",
                        data: this.getEchartData(),
                        type: 'line',
                        itemStyle: {     //此属性的颜色和下面areaStyle属性的颜色都设置成相同色即可实现
                            color: '#E6A23C',
                            borderColor: '#E6A23C',
                        }
                    },
                    {
                        name:"平均",
                        data: this.getEchartData(),
                        type: 'line',
                        itemStyle: {     //此属性的颜色和下面areaStyle属性的颜色都设置成相同色即可实现
                            color: '#409EFF',
                            borderColor: '#409EFF',
                        }
                    }
                    ]
                }
                let option6={
                    title: {text: '在家/离家情况'},
                    tooltip:{trigger: 'axis',},
                    legend: {data:['今日','平均']},
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'time',
                        boundaryGap: false,
                        name:"单位: 小时",
                        interval:2*3600*1000,
                        axisLabel : {
                            formatter: this.formatterFun
                        }
                    },
                    yAxis: {
                        type: 'value',
                        name:"单位: 在家/离家",
                        min:0,
                        max:1,
                        splitNumber: 5,
                        axisLabel:{
                          formatter: function (value) {
                            var texts = [];
                            if(value==1){
                              texts.push('离家');
                            }
                            else if (value <1 && value >0) {
                              texts.push(' ');
                            }
                            else if(value== 0){
                              texts.push('在家');
                            }
                              return texts;
                            }
                        }
                    },
                    series: [{
                        name:"今日",
                        data: this.getEchartData(),
                        step: 'start',
                        type: 'line',
                        itemStyle: {     //此属性的颜色和下面areaStyle属性的颜色都设置成相同色即可实现
                            color: '#E6A23C',
                            borderColor: '#E6A23C',
                        }
                    },
                    {
                        name:"平均",
                        data: this.getEchartData(),
                        step: 'start',
                        type: 'line',
                        itemStyle: {     //此属性的颜色和下面areaStyle属性的颜色都设置成相同色即可实现
                            color: '#409EFF',
                            borderColor: '#409EFF',
                        }
                    }
                    ]
                }

                activerate.setOption(option1);
                activetime.setOption(option2);
                heartrate.setOption(option3);
                bloodpress.setOption(option4);
                sleepquality.setOption(option5);
                inouthome.setOption(option6)
                window.onresize =function(){
                    activerate.resize()
                    activetime.resize()
                    heartrate.resize()
                    bloodpress.resize()
                    sleepquality.resize()
                    inouthome.resize()
                }
            },

      showDialogWarn() {
        console.log(this.dialoWarn)
        //this.dialogTableVisible = true
        console.log(this.personData.name)
        this.$refs.senda.getWarnListData1(this.personData)
      },
      getDialogData(data){
        if(data){
          this.dialogTableVisible = false
        }
      },
      getWarnList(){
        getWarnListData({keyUserid:this.personData.keyUserid}).then(res =>{
          console.log(res.data.data)
          if(res.code == 0){

            if(res.data.data == undefined){
              this.warnActive = true
            }else{
              let data =  res.data.data.filter(item=>{
                  return item.processingResult != 3
              })
              this.warnTableData = data
              this.warnNum = data.length
              this.warnActive = false
            }
            this.$refs.senda.getListData(this.warnTableData)
          }
        })
      }
    },
    mounted(){
        this.drawChart();
        this.getEchartData()
        this.personData=this.$route.query.row
        console.log(this.personData)
        this.getWarnList()
    }
}
</script>
<style lang="scss" scoped>
.activestate {
  &-container {
    width: 100%;
    height: 100%;
    .el-header{
        height: auto !important;
    }
   .activestate-chart{
       display: flex;
       justify-content: space-between;
   }
  }
  &-header{
      width: 100%;
      border: 1px solid #eee;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
      .el-row{
          padding: 20px 40px;
          .el-col{
              margin: 10px 0;
              color:#606266;
              font-size: 15px;
          }
      }
  }
  &-title{
      padding: 10px;
      text-align: center;
      background: #ddd;
      font-weight: bold;;
      color: #303133;

  }
  &-handle{
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
  }

}
</style>
