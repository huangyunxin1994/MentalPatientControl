<template>
    <el-container class="activestate-container">
        <el-scrollbar style="width:100%;height:100%">
        <el-header>
            <div class="activestate-header">
              <div class="activestate-title">人员详情</div>
              <el-row :gutter="20">
                <el-col :span="6">姓名：{{personData.name}}</el-col>
                <el-col :span="6">联系电话：{{personData.phone}}</el-col>
                <el-col :span="6">网格管理员：{{personData.networkAdministrator}}&nbsp;{{personData.networkAdministratorP}}</el-col>
                <el-col :span="6">人员级别：{{personData.level | fiterData}}</el-col>
                <el-col :span="12">住址：{{personData.address}}</el-col>
                <el-col :span="6">责任医师：{{personData.responsiblePhysician}}&nbsp;{{personData.responsiblePhysicianP}}</el-col>

                <el-col :span="6">所属组织：{{personData.organizationName}}</el-col>
                <el-col :span="12">病情描述：</el-col>
                 <el-col :span="6">监护人：{{personData.guardian}}&nbsp;{{personData.guardianP}}</el-col>
                <el-col :span="6">是否限制外出：{{personData.restrictions | filterRestr}}</el-col>
                <!-- <el-col :span="8">是否限制外出：{{personData.personnelStatus}}</el-col> -->
            </el-row>
          </div>
          <div class="activestate-handle">

                <div class="active-handle">
                  <my-date @getData="setDateTime" :warnTableData="warnTableData"></my-date>
                  <el-button type="primary" class="sureBtn" @click="sureBtn">确定</el-button>
                </div>
                <el-badge :value="warnNum" class="item">
                <el-button type="danger" @click='showDialogWarn' :disabled="warnActive">处理预警</el-button>
                </el-badge>
          </div>
        </el-header>
          <el-main>
            <div class="activestate-chart">
                <div id="activerate" class="activestate-chart-item" :class="{'activestate-chart-item-alert':activerate==1}"/>
                <div id="activetime" class="activestate-chart-item" :class="{'activestate-chart-item-alert':activetime==1}"/>
            </div>
            <div class="activestate-chart">
                <div id="heartrate" class="activestate-chart-item" :class="{'activestate-chart-item-alert':heartrate==1}"/>
                <div id="bloodpress" class="activestate-chart-item" :class="{'activestate-chart-item-alert':bloodpress==1}"/>
            </div>
            <div class="activestate-chart">
                <div id="sleepquality" class="activestate-chart-item" :class="{'activestate-chart-item-alert':sleepquality==1}"/>
                <div id="inouthome" class="activestate-chart-item" :class="{'activestate-chart-item-alert':inouthome==1}"/>
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
import { getRole,getUser } from '@/utils/auth'
import { parseTime } from '@/utils/index.js'
import { getPerSe , getWarnListData,getPerWarnlData } from '@/api/table'
import dialogWarn from '@/components/dialog-warn/dialog'
export default {
  name: 'Activestate',
  components:{
      myDate,
      dialogWarn

  },
  filters: {
    fiterData: (value)=> {
        if (!value) return ''
        value = value.toString()
        return value == 1 ? '一级' : (value == 2 ? '二级' : (value == 3? '三级' :(value == 4 ? '四级' :(value == 5 ? '五级' :(value == 6 ? '六级' :(value == 7 ? '七级' :(value == 8 ? '八级' : value == 9 ? '九级' :' ')))))))
    },
    filterRestr: (value)=> {
        if (!value) return ''
        value = value.toString()
        return value == 1 ? '否' : value == 2 ? '是' : ""
    }
  },
  data(){
    return{
      value4:"",
      echartsData:{},
      dateTime:"",
      personData:{},
      dialoWarn:false,
      dialogTableVisible:false,
      warnTableData: [],
      warnActive: false,
      warnNum:0,
      time:[],
      bhTime:[],
      // time:["15:00","17:00","19:00","21:00","23:00","1:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"],
      activityFrequencyT:[],
      activityFrequencyA:[],
      activityTimeT:[],
      activityTimeA:[],
      minData:'',
      maxData:'',
      phoneList:[],
      activerate:"",
      activetime:"",
      heartrate:"",
      bloodpress:"",
      sleepquality:"",
      inouthome:"",
      alertConditions:"",
      home:[],sleep:[],frequency:[],activeTime:[],blood:[],heartRate:[]
    }
  },
    methods: {
      setDateTime(val){
        if(val)
          this.dateTime=val.getTime();
        else
          this.dateTime=""

      },
      sureBtn(){
        if(this.dateTime!=""){
          this.getEchartData()
          this.getData2()
          this.drawChart()
        }else{

        }

      },
      getData(){
         this.time=[]
         let now = new Date();
         // this.minData = new Date(curDate.getTime() - 24*60*60*1000);
         this.maxData = now;
         let len = 24;
         while (len--) {
           now = new Date(now - 1000 * 60 * 60);
           this.time.unshift(now.getHours() + 1);
         }
         for(let i in this.time){
           if(this.time[i]<10){
             this.time[i] = '0'+ this.time[i] + ':00'
           }else if(this.time[i] == 24){
             this.time[i] = '00:00'
           }else{
             this.time[i] = this.time[i] + ':00'
           }
         }
       },
       getData2(){
         this.time=[]
        let now = new Date(this.dateTime);
         // this.minData = new Date(curDate.getTime() - 24*60*60*1000);
         this.maxData = now;
         let len = 24;
         while (len--) {
           now = new Date(now - 1000 * 60 * 60);
           this.time.unshift(now.getHours());
         }
         for(let i in this.time){
           if(this.time[i]<10){
             this.time[i] = '0'+ this.time[i] + ':00'
           }else if(this.time[i] == 24){
             this.time[i] = '00:00'
           }else{
             this.time[i] = this.time[i] + ':00'
           }
         }
         console.log(this.time)
       },
       getEchartData(){
          let time=this.dateTime;
          let para ={}
          para.keyUserId  = this.personData.id
          if(time!=""){
             para.time = parseTime(time,'{y}-{m}-{d}')
          }
          getPerSe(para).then(res=>{
              if(res.code==0){
                  //预警条数
                  this.warnNum = res.data.alertNum
                  this.warnTableData = res.data.alert_list
                  let phoneList = res.data.phone_list
                  this.personData = res.data.keyUser
                  this.personData.networkAdministratorP = phoneList[0].NetworkAdministrator
                  this.personData.responsiblePhysicianP = phoneList[0].ResponsiblePhysician
                  this.personData.guardianP = phoneList[0].Guardian
                  //将预警信息传递过去
                  this.$refs.senda.getListData(this.warnTableData)
                  this.warnActive = false

                  //拿到警戒线信息
                  let aHome=[],aSleep=[],aFrequency=[],aActiveTime=[],aBlood=[],aHeartRate=[]
                  this.alertConditions = res.data.alertConditions
                  console.log(this.alertConditions)
                  this.alertConditions.forEach((item,index)=>{
                    if(item.alertId == '1'){
                      //是否在家预警线
                      aHome.push(item)
                    }else if(item.alertId == '2'){
                      //睡眠质量
                      aSleep.push(item)
                    }else if(item.alertId == '3'){
                      //活动频率
                      // aFrequencyItem[0] = item
                      // aFrequency.push(aFrequencyItem)
                      aFrequency.push(item)
                    }else if(item.alertId == '4'){
                      //活动时长
                      aActiveTime.push(item)
                    }else if(item.alertId == '5'){
                      //心率
                      aBlood.push(item)
                    }else{
                      //血压
                      aHeartRate.push(item)
                    }
                  })
                  //活动频率时间转化
                  for(let i in aFrequency){
                    let start = aFrequency[i].startTime.substring(0,3)
                    let startTime1 = start + "00"
                    aFrequency[i].startTime = startTime1

                    if(aFrequency[i].endTime.substring(4,5) != "00"){
                      let start = aFrequency[i].endTime.substring(0,2)
                      start = parseInt(start) + 1
                      if(start == 24){
                        start = 0
                        let endTime1 = "0" + start + ":00"
                        aFrequency[i].endTime = endTime1
                      }else if(start < 10){
                        let endTime1 = "0" + start + ":00"
                        aFrequency[i].endTime = endTime1
                      }else{
                        let endTime1 =  start + ":00"
                        aFrequency[i].endTime = endTime1
                      }
                    }
                  }
                  //活动时长时间转化
                  for(let i in aActiveTime){
                    let start = aActiveTime[i].startTime.substring(0,3)
                    let startTime1 = start + "00"
                    aActiveTime[i].startTime = startTime1

                    if(aActiveTime[i].endTime.substring(4,5) != "00"){
                      let start = aActiveTime[i].endTime.substring(0,2)
                      start = parseInt(start) + 1
                      if(start == 24){
                        start = 0
                        let endTime1 = "0" + start + ":00"
                        aActiveTime[i].endTime = endTime1
                      }else if(start < 10){
                        let endTime1 = "0" + start + ":00"
                        aActiveTime[i].endTime = endTime1
                      }else{
                        let endTime1 =  start + ":00"
                        aActiveTime[i].endTime = endTime1
                      }
                    }
                  }

                  let bFrequency = []
                  for(let i in aFrequency){
                    let arr =[]
                    // bFrequency[i][0] = aFrequency[i]
                    let para ={},para2={}
                    para.yAxis = aFrequency[i].achieveAlert
                    para.xAxis= aFrequency[i].startTime
                    para2.yAxis = aFrequency[i].achieveAlert
                    para2.xAxis= aFrequency[i].endTime
                    para2.silent=false
                    para2.lineStyle={               //警戒线的样式  ，虚实  颜色
                        type:"solid",
                        color:"#F56C6C",
                    },
                    arr.push(para)
                    arr.push(para2)
                    bFrequency.push(arr)
                  }
                  console.log(bFrequency)
                  let bActiveTime = []
                  for(let i in aActiveTime){
                    let arr =[]
                    // bFrequency[i][0] = aActiveTime[i]
                    let para ={},para2={}
                    para.yAxis = aActiveTime[i].achieveAlert
                    para.xAxis= aActiveTime[i].startTime
                    para2.yAxis = aActiveTime[i].achieveAlert
                    para2.xAxis= aActiveTime[i].endTime
                    para2.silent=false
                    para2.lineStyle={               //警戒线的样式  ，虚实  颜色
                        type:"solid",
                        color:"#F56C6C",
                    },
                    arr.push(para)
                    arr.push(para2)
                    bActiveTime.push(arr)
                  }
                  this.home = aHome
                  this.sleep = aSleep
                  this.frequency = bFrequency
                  this.activeTime = bActiveTime
                  this.blood = aBlood
                  this.heartRate = aHeartRate

                  let arr1=[],arr2=[],arr3=[],arr4=[],arr5=[],arr6=[],arr7=[]
                  if(res.data.frequency_today.length>0){
                    for(let i=0;i < this.time.length;i++){
                        let para=[],para2=[]
                        let arr = res.data.frequency_today.filter(item=>{
                          return item.hours+":00" ==this.time[i]
                        })
                        if(arr.length>0){
                          para.push(this.time[i])
                          para2.push(this.time[i])
                          para.push(arr[0].activityFrequency)
                          para2.push(arr[0].activityTime)
                          arr1.push(para)
                          arr2.push(para2)
                        }
                    }
                  }
                  if(res.data.frequency_lastday.length>0){
                    for(let i in this.time){
                        let para=[],para2=[]

                        let arr = res.data.frequency_lastday.filter(item=>{
                          return item.hours+":00" ==this.time[i]
                        })
                        if(arr.length>0){
                           para.push(this.time[i])
                           para2.push(this.time[i])
                           para.push(arr[0].activityFrequency)
                            para2.push(arr[0].activityTime)
                            arr3.push(para)
                            arr4.push(para2)
                        }

                    }
                  }
                  if(res.data.Blood_today.length>0){
                    for(let i in res.data.Blood_today){
                        let para=[],para2=[],para3=[]
                        this.bhTime.push(res.data.Blood_today[i].hours)
                        para.push(res.data.Blood_today[i].hours)
                        para.push(res.data.Blood_today[i].heartRate)
                        para2.push(res.data.Blood_today[i].hours)
                        para2.push(res.data.Blood_today[i].diastolicPressure)
                        para3.push(res.data.Blood_today[i].hours)
                        para3.push(res.data.Blood_today[i].systolicPressure)
                        arr5.push(para)
                        arr6.push(para2)
                        arr7.push(para3)
                    }
                  }
                  this.activityFrequencyT = arr1
                  this.activityTimeT = arr2
                  this.activityFrequencyA = arr3
                  this.activityTimeA = arr4
                  this.heartRateT = arr5
                  this.diastolicPressureT = arr6
                  this.systolicPressureT = arr7
                  this.drawChart()
              }else{
                this.warnActive = true
              }
          }).catch(err=>{

          })
      },

      getEchartData2(){
          let time=this.dateTime;
          if(time==""){
              time=new Date(new Date().toLocaleDateString()).getTime()
          }
          let data=[];
          for(let i = 0; i < 25; i ++){
              let para=[]
              para.push(time+i*3600*1000)
              para.push(Math.ceil(Math.round(Math.random()*10)))
              // para.push(Math.ceil(Math.round(Math.random()*100)))
              // para.push(Math.ceil(Math.round(Math.random())))
              data.push(para)
          }
          return data
      },
      getEchartData3(){
          let time=this.dateTime;
          if(time==""){
              time=new Date(new Date().toLocaleDateString()).getTime()
          }
          let data=[];
          for(let i = 0; i < 25; i ++){
              let para=[]
              para.push(time+i*3600*1000)
              para.push(Math.ceil(Math.round(Math.random())))
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
        console.log(224)
        let activerate = echarts.init(document.getElementById('activerate'));
        let activetime = echarts.init(document.getElementById('activetime'));
        let heartrate = echarts.init(document.getElementById('heartrate'));
        let bloodpress = echarts.init(document.getElementById('bloodpress'));
        let sleepquality = echarts.init(document.getElementById('sleepquality'));
        let inouthome = echarts.init(document.getElementById('inouthome'));
        let option1={
            title: {text: '活动频率'},
            tooltip:{trigger: 'axis',},
            legend: {
              orient: 'vertical',
              left: 'center',
              bottom:'bottom',
              data:['今日','平均'],
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              name:"单位:小时",
              interval:4,
              data: this.time
            },
            yAxis: {
                type: 'value',
                name:"单位:次",
            },
            series: [{
                name:"今日",
                data: this.activityFrequencyT,
                type: 'line',
                itemStyle: {     //此属性的颜色和下面areaStyle属性的颜色都设置成相同色即可实现
                    color: '#E6A23C',
                    borderColor: '#E6A23C',
                },
            },
              {
                name:"平均",
                data: this.activityFrequencyA,
                type: 'line',
                itemStyle: {     //此属性的颜色和下面areaStyle属性的颜色都设置成相同色即可实现
                    color: '#409EFF',
                    borderColor: '#409EFF',
                },
                markLine : {
                  symbol:"none",               //去掉警戒线最后面的箭头
                  lineStyle: {
                    normal:
                      {
                        type: 'solid' ,
                        color:"rgba(238, 99, 99)",
                        width:2,
                      }
                  },
                  data:this.frequency
                }
            }]
        }
        let option2={
            title: {text: '活动时长'},
            tooltip:{trigger: 'axis',},
            legend: {
              orient: 'vertical',
              left: 'center',
              bottom:'bottom',
              data:['今日','平均'],
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              name:"单位:小时",
              interval:4,
              data: this.time
            },
            yAxis: {
                type: 'value',
                name:"单位:分钟",
                x: 'center',
                splitLine: {
                  lineStyle: {
                    type: 'dashed'
                  }
                }
            },
            series: [{
                name:"今日",
                data: this.activityTimeT,
                type: 'line',
                itemStyle: {     //此属性的颜色和下面areaStyle属性的颜色都设置成相同色即可实现
                    color: '#E6A23C',
                    borderColor: '#E6A23C',
                }
            },
            {
                name:"平均",
                data: this.activityTimeA,
                type: 'line',
                itemStyle: {     //此属性的颜色和下面areaStyle属性的颜色都设置成相同色即可实现
                    color: '#409EFF',
                    borderColor: '#409EFF',
                },
                markLine : {
                  symbol:"none",
                  
                  lineStyle: {
                    normal:
                      {
                        type: 'solid' ,
                        color:"rgba(238, 99, 99)",
                        width:2,
                      }
                  },
                  data:this.activeTime
                }
            }]
        }
        let option3={
            title: {text: '心率'},
            tooltip:{trigger: 'axis',},
            legend: {
              orient: 'vertical',
              left: 'center',
              bottom:'bottom',
              data:['今日'],
            },
            xAxis: {
                 type: 'category',
              boundaryGap: false,
              name:"单位:小时",
              interval:4,
              data: this.bhTime
            },
            yAxis: {
                type: 'value',
                name:"单位:bpm",
            },
            series: [{
                name:"今日",
                data: this.heartRateT,
                type: 'line',
                itemStyle: {     //此属性的颜色和下面areaStyle属性的颜色都设置成相同色即可实现
                    color: '#E6A23C',
                    borderColor: '#E6A23C',
                },
                markLine : {
                  symbol:"none",               //去掉警戒线最后面的箭头
                  label:{
                      position:"end",         //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
                      formatter: "警戒线"
                  },
                  data : [{
                      silent:false,             //鼠标悬停事件  true没有，false有
                      lineStyle:{               //警戒线的样式  ，虚实  颜色
                          type:"solid",
                          color:"rgba(238, 99, 99)",
                          width:2,
                      },
                      name: '警戒线',
                      yAxis: 35
                  }]
                }
            }]
        }
        let option4={
            title: {text: '血压'},
            tooltip:{trigger: 'axis',},
            legend: {
              orient: 'vertical',
              left: 'center',
              bottom:'bottom',
              data:['高压','低压'],
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              name:"单位:小时",
              interval:4,
              data: this.bhTime
            },
            yAxis: {
                type: 'value',
                name:"单位:mmHg",
            },
            series: [{
                name:"高压",
                data: this.systolicPressureT,
                type: 'line',
                itemStyle: {     //此属性的颜色和下面areaStyle属性的颜色都设置成相同色即可实现
                    color: '#E6A23C',
                    borderColor: '#E6A23C',
                },
                markLine : {
                  symbol:"none",               //去掉警戒线最后面的箭头
                  label:{
                      position:"end",         //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
                      formatter: "警戒线"
                  },
                  data : [{
                      silent:false,             //鼠标悬停事件  true没有，false有
                      lineStyle:{               //警戒线的样式  ，虚实  颜色
                          type:"solid",
                          color:"rgba(238, 99, 99)",
                          width:2,
                      },
                      name: '警戒线',
                      yAxis: 35
                  }]
                }
            },
            {
                name:"低压",
                data: this.diastolicPressureT,
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
            legend: {
              orient: 'vertical',
              left: 'center',
              bottom:'bottom',
              data:['今日','平均'],
            },
            xAxis: {
                type: 'time',
                boundaryGap: false,
                name:"单位:小时",
                interval:2*3600*1000,
                // min:minData,
                // max:maxData,
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
                data: this.getEchartData2(),
                type: 'line',
                itemStyle: {     //此属性的颜色和下面areaStyle属性的颜色都设置成相同色即可实现
                    color: '#E6A23C',
                    borderColor: '#E6A23C',
                },
                markLine : {
                  symbol:"none",               //去掉警戒线最后面的箭头
                  label:{
                      position:"end",         //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
                      formatter: "警戒线"
                  },
                  data : [{
                      silent:false,             //鼠标悬停事件  true没有，false有
                      lineStyle:{               //警戒线的样式  ，虚实  颜色
                          type:"solid",
                          color:"rgba(238, 99, 99)"
                      },
                      name: '警戒线',
                      yAxis: 35
                  }]
                }
            },
            {
                name:"平均",
                data: this.getEchartData2(),
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
            legend: {
              orient: 'vertical',
              left: 'center',
              bottom:'bottom',
              data:['今日','平均'],
            },
            xAxis: {
                type: 'time',
                boundaryGap: false,
                name:"单位: 小时",
                interval:2*3600*1000,
                axisLabel : {
                    formatter: this.formatterFun
                    // formatter:this.getData
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
                data: this.getEchartData3(),
                step: 'start',
                type: 'line',
                itemStyle: {     //此属性的颜色和下面areaStyle属性的颜色都设置成相同色即可实现
                    color: '#E6A23C',
                    borderColor: '#E6A23C',
                }
            },
            {
                name:"平均",
                data: this.getEchartData3(),
                step: 'start',
                type: 'line',
                itemStyle: {     //此属性的颜色和下面areaStyle属性的颜色都设置成相同色即可实现
                    color: '#409EFF',
                    borderColor: '#409EFF',
                }
            }
            ],
            // visualMap: {
            //     show: false,
            //     dimension: 1,
            //     pieces: [],  //pieces的值由动态数据决定
            //     outOfRange: {
            //         color: 'red'
            //     }
            // }
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
        this.$refs.senda.getWarnListData1(this.personData)
      },
      getDialogData(data){
        if(data){
          this.dialogTableVisible = false
        }
      },
      getWarnList(){
        let role = JSON.parse(getRole())
        let user = JSON.parse(getUser());
        let param ={}
        param.roleId=role
        param.userId=user.userId
        param.organizaId=user.organizationId||""
        param.processingResult = this.value
        param.beginTime = this.beginTime
        param.endTime = this.endTime
        getPerWarnlData(param).then(res=>{
          if(res.code == 0){
            if(res.data.data == undefined){
              this.warnActive = true
            }else{
              let data =  res.data.data.filter(item=>{
                  return item.processingResult != 3
              })
              this.warnTableData = data
              this.warnActive = false
            }
          }
        }).catch(err=>{

        })
      }
    },
     mounted(){
        this.personData.id= this.$route.query.id //通过路由传参，将从人员状态出拿到的数据传递过来，保存在personDate
        this.getData()
        this.getEchartData()
        window.addEventListener('load', () => {
         let type = this.$route.query.type
          if(type==1)
           this.$router.push({ path: '/personstate' })
          else if(type==2)
           this.$router.push({ path: '/warningcenter' })
        })
        //
        // window.onbeforeunload = e => {      //刷新时弹出提示
        //   this.$router.push({ path: '/personstate' })
        //   return  ''
        // };
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
       &-item{
         width:50%;
         height:40vh;
         padding:20px;
         margin:20px;
         border-radius: 0.8vw;

         &-alert{
           background: rgb(254, 240, 240)
         }
       }
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
              font-size: 0.8vw;
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

      .active-handle{
        display: flex;

        .sureBtn{
          margin: 20px;
        }
      }
  }
}
</style>
