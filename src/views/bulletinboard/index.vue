<template>
  <el-container class="login-container">
    <el-header class="bulletin-header" height="100">
      <span>&nbsp;</span>
      <span class="bulletin-title">特殊人群辅助管理系统</span>
      <el-button @click="enterSys" type="primary">进入系统</el-button>
    </el-header>
    
    <el-main>
      <el-row :gutter="20">
        
        <el-col :span="6">
          <div id="chartKeyPerson" style="width:100%;height:33%;background:#fff;padding:20px;"></div>
          <br/>
          <div id="chartManPerson" style="width:100%;height:33%;background:#fff;padding:20px;"></div>
          <br/>
          <div id="warnMess" style="width:100%;height:33%;background:#fff;padding:20px;">
            <div class="warnMess-title">预警信息</div>
            <el-scrollbar style="width:100%;height:95%;">
              <div class="warnMess-content" v-for="(i,index) in warnData" :key="index" style="white-space:nowrap">
                <i class="el-icon-warning warnMess-content-icon"></i>&nbsp;&nbsp;[{{i.alertTime}}]&nbsp;&nbsp; 人员预警：{{i.name}}  
              </div>
            </el-scrollbar>
          </div>
        </el-col>
       
        <el-col :span="12">
            <div style="width:100%;height:100%">
              <mymap ref="map" :bulletArr="bulletArr"></mymap>
            </div>
        </el-col>
        <el-col :span="6">
          <div id="chartPersonWarn" style="width:100%;height:33%;background:#fff;padding:20px;"></div>
          <br/>
          <div id="chartWarnDone" style="width:100%;height:33%;background:#fff;padding:20px;"></div>
          <br/>
          <div id="chartEquip" style="width:100%;height:33%;background:#fff;padding:20px;"></div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import echarts from 'echarts'
import  mymap  from '@/components/map/map'
import {equipmentStatistics,keyPersonnelEarly,keyPersonnelStatistics,selectWlCount,userRoleStatistics,getPerWarnlData,getOrganData,selectEw } from "@/api/table"
import { getRole,getUser } from '@/utils/auth'
export default {
  name: 'Login',
  components:{
    mymap
  },
  data() {
    return {
      loading: false,
      redirect: undefined,
      ManPersonData:[
        {value: 0, name: '民警'},
        {value: 0, name: '网格员'},
        {value: 0, name: '医师'},
        {value: 0, name: '监护人'},
      ],
      KeyPersonData:[
        { value: "", name: '重度患者' },
        { value: "", name: '中度患者' },
        { value: "", name: '轻度患者' }
      ],
      equipWatch:[],
      equipSleep:[],
      equipActive:[],
      alert1:[],alert2:[],alert3:[],alert4:[],alert5:[],alert6:[],alert7:[],
      warnData:[],
      warnDoneData:[],
      warnDoneDataA:[],
      bulletArr:[]

    }
  },
  mounted(){
    this.getDrawData()
    this.getOrganData()
    
  },
  methods: {
    enterSys(){
      this.$router.push({ path: '/' })
    },
    async getOrganData(){
       let user = JSON.parse(getUser()) 
        console.log(user)
        let organizaId = user.organizationId;
        let userid = user.userId;
        let role = JSON.parse(getRole()) 
        let para ={organizaId:organizaId,roleId:role,userId:userid}
      await getOrganData(para).then(res=>{
        if(res.code==0){
            this.bulletArr=res.data.user;
            this.$refs.map.getmap();
        }
      })
      await this.$refs.map.getmap();
    },
    async getDrawData(){
      await this.keyPersonnelStatistics()
      await this.keyPersonnelEarly()
      await this.userRoleStatistics()
      await this.selectEw()
      await this.getPerWarnlData()
      await this.equipmentStatistics()
      await this.drawChart();
    },
    async keyPersonnelStatistics(){
      await keyPersonnelStatistics().then(res=>{
        if(res.code==0){
          let data = res.data.data
          console.log(data)
          this.KeyPersonData[0].value = data.severe
          this.KeyPersonData[1].value = data.moderate
          this.KeyPersonData[2].value = data.light
        }
        
      })
    },
    async userRoleStatistics(){
      await userRoleStatistics().then(res=>{
        if(res.code==0){
          let data = res.data.data
          for( let i in data){
            if(data[i].roleId == 1){
              this.ManPersonData[0].value = data[i].count//民警
            }else if(data[i].roleId == 2){
              this.ManPersonData[1].value = data[i].count//网格员
            }else if(data[i].roleId == 3){
              this.ManPersonData[2].value = data[i].count//医生
            }else if(data[i].roleId == 4){
              this.ManPersonData[3].value = data[i].count//监护人
            }
          }
         
        }
        
      })
    },
    async selectEw(){
      await selectEw().then(res=>{
        if(res.code==0){
          let arr1 =[],arr2=[]
           console.log('预警处理')
          console.log(res.data.list)
          for(let i in res.data.list){
            let data = this.formaterData(res.data.list[i])
            arr1.push(data)
          }
          for(let i in res.data.listAll){
            let data =  this.formaterData(res.data.listAll[i])
            arr2.push(data)
          }
          this.warnDoneData=arr1
          this.warnDoneDataA=arr2
        }
      })
    },
     formaterData(data){
      let para =[]
      switch(data.months){
        case '01' : 
          para.push("一月");
          para.push(data.count);
          break;
        case '02' : 
          para.push("二月");
          para.push(data.count);
          break
        case '03' : 
          para.push("三月");
          para.push(data.count);
          break
        case '04' : 
          para.push("四月");
          para.push(data.count);
          break
        case '05' : 
          para.push("五月");
          para.push(data.count);
          break
        case '06' : 
          para.push("六月");
          para.push(data.count);
          break
        case '07' : 
          para.push("七月");
          para.push(data.count);
          break
        case '08' : 
          para.push("八月");
          para.push(data.count);
          break
        case '09' : 
          para.push("九月");
          para.push(data.count);
          break
        case '10' : 
          para.push("十月");
          para.push(data.count);
          break
        case '11' : 
          para.push("十一月");
          para.push(data.count);
          break
        case '12' : 
          para.push("十二月");
          para.push(data.count);
          break
      }
      console.log(para)
      return para
    },
    async keyPersonnelEarly(){
      await keyPersonnelEarly().then(res=>{
        if(res.code==0){
          let data = res.data.data
          let para ={}
          let arr1=[],arr2=[],arr3=[],arr4=[],arr5=[],arr6=[],arr7=[]
          console.log(data)
          for(let i in data){
            if(data[i].alert_type==1){
              arr1.push(data[i].processed)
              arr1.push(data[i].untreated)
            }else if(data[i].alert_type==2){
              arr2.push(data[i].processed)
              arr2.push(data[i].untreated)
            }else if(data[i].alert_type==3){
              arr3.push(data[i].processed)
              arr3.push(data[i].untreated)
            }else if(data[i].alert_type==4){
              arr4.push(data[i].processed)
              arr4.push(data[i].untreated)
            }else if(data[i].alert_type==5){
              arr5.push(data[i].processed)
              arr5.push(data[i].untreated)
            }else if(data[i].alert_type==6){
              arr6.push(data[i].processed)
              arr6.push(data[i].untreated)
            }else if(data[i].alert_type==7){
              arr7.push(data[i].processed)
              arr7.push(data[i].untreated)
            }
            this.alert1=arr1
            this.alert2=arr2
            this.alert3=arr3
            this.alert4=arr4
            this.alert5=arr5
            this.alert6=arr6
            this.alert7=arr7
          }
          
        }
        
      })
    },
    async getPerWarnlData(){
      let role = JSON.parse(getRole()) 
      let user = JSON.parse(getUser());
      console.log(user)
      let param ={}
      param.roleId=role
      param.userId=user.userId
      param.organizaId=user.organizationId||""
      await getPerWarnlData(param).then(res=>{
        if(res.code==0){
          console.log(res)
          let data = res.data.data.filter(item=>{
            return item.processingResult==2
          })
          this.warnData=data
        }
      }).catch(err=>{

      })
    },
    async equipmentStatistics(){
      await equipmentStatistics().then(res=>{
        if(res.code==0){
          let data = res.data.data
          let para ={}
          let arr1=[],arr2=[],arr3=[]
          for(let i in data){
            if(data[i].type==1){
              arr1.push(data[i].count1)
              arr1.push(data[i].count2)
              arr1.push(data[i].count3)
            }else if(data[i].type==2){
              arr2.push(data[i].count1)
              arr2.push(data[i].count2)
              arr2.push(data[i].count3)
            }else if(data[i].type==3){
              arr3.push(data[i].count1)
              arr3.push(data[i].count2)
              arr3.push(data[i].count3)
            }
            
          }
          this.equipActive = arr1
          this.equipSleep = arr2
          this.equipWatch = arr3
          
        }
        
      })
    },
    
    drawChart() {
                let chartKeyPerson = echarts.init(document.getElementById('chartKeyPerson'));
                let chartManPerson = echarts.init(document.getElementById('chartManPerson'));
                let chartPersonWarn = echarts.init(document.getElementById('chartPersonWarn'));
                let chartWarnDone = echarts.init(document.getElementById('chartWarnDone'));
                let chartEquip = echarts.init(document.getElementById('chartEquip'));
                chartKeyPerson.setOption({
                   title: {
                        text: '重点人员统计',
                        textStyle: {
                            fontSize: '16',
                            fontWeight:'bold'
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        left: "center",
                        bottom: 0,
                        data: this.KeyPersonData,
                        formatter: (name)=>{
                            var target;
                            for (var i = 0, l = this.KeyPersonData.length; i < l; i++) {
                              if (this.KeyPersonData[i].name == name) {
                                  target = this.KeyPersonData[i].value;
                              }
                            }
                            var arr = [
                                '{a|'+name+'}',
                                '{b|'+target+'(人)}',
                                
                            ]
                            return arr.join('\n')
                        },
                        textStyle:{
                            rich:{
                                a:{
                                    fontSize:12,
                                    verticalAlign:'top',
                                    padding:[10,0,10,0]
                                },
                                b:{
                                    fontSize:12,
                                    padding:[0,0,0,0],
                                    lineHeight:0
                                }
                            }
                        }
                    },
                    series: [
                        {
                            name: '患者等级',
                            type: 'pie',
                            radius: '45%',
                            center: ['50%', '40%'],
                            data: this.KeyPersonData,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
                chartManPerson.setOption({
                  title: {
                        text: '管理人员统计',
                        textStyle: {
                            fontSize: 16,
                            fontWeight:'bold'
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)'
                    },
                    legend: {
                        orient: 'horizontal',
                        bottom: 0,
                        data: this.ManPersonData,
                        formatter: (name)=>{
                            var target;
                            for (var i = 0, l = this.ManPersonData.length; i < l; i++) {
                              if (this.ManPersonData[i].name == name) {
                                  target = this.ManPersonData[i].value;
                              }
                            }
                            var arr = [
                                '{a|'+name+'}',
                                '{b|'+target+'(人)}',
                                
                            ]
                            return arr.join('\n')
                        },
                        textStyle:{
                            rich:{
                                a:{
                                    fontSize:10,
                                    verticalAlign:'top',
                                    padding:[10,0,10,0]
                                },
                                b:{
                                    fontSize:10,
                                    padding:[0,0,0,0],
                                    lineHeight:0
                                }
                            }
                        }
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['50%', '40%'],
                            avoidLabelOverlap: false,
                            label: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data:this.ManPersonData
                        }
                    ]
                });
                chartPersonWarn.setOption({
                   title: {
                        text: '重点人员预警统计',
                        textStyle: {
                            fontSize: 16,
                            fontWeight:'bold'
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                      bottom:0,
                        data: ['未处理','已处理' ]
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '20%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                    },
                    yAxis: {
                        type: 'category',
                        data: ['电子围栏触发','血压异常','心率异常','活动时间异常','活动频率异常']
                    },
                    series: [
                      
                       
                        {
                            name: '未处理',
                            type: 'bar',
                            data: [this.alert7[1], this.alert4[1], this.alert3[1], this.alert2[1],this.alert1[1]]
                        },
                         {
                            name: '已处理',
                            type: 'bar',
                            data: [this.alert7[0], this.alert4[0], this.alert3[0], this.alert2[0],this.alert1[0]]
                        },
                    ]
                });
                chartWarnDone.setOption({
                   title: {
                        text: '预警处理情况',
                        textStyle: {
                            fontSize: 16,
                            fontWeight:'bold'
                        }
                    },
                    legend: {
                          bottom:0,
                          data: ['预警总数','处理数']
                        },
                     xAxis: {
                        type: 'category',
                        data: ['一月', '二月', '三月', '四月', '五月', '六月','七月', '八月', '九月', '十月', '十一月', '十二月']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        name:"预警总数",
                        data: this.warnDoneDataA,
                        type: 'line'
                    },
                    {
                        name:"处理数",
                        data: this.warnDoneData,
                        type: 'line'
                    }]
                });
                chartEquip.setOption({
                        title: {
                            text: '设备管理统计',
                            textStyle: {
                              fontSize: 16,
                              fontWeight:'bold'
                            }
                        },
                        tooltip: {
                          trigger: 'axis',
                          axisPointer: {
                              type: 'shadow'
                          }
                        },
                        legend: {
                          bottom:0,
                            data: ["预警数",'在线数','离线数',]
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '15%',
                            containLabel: true
                        },
                        xAxis: {
                            interval: 1,
                            type: 'value',
                        },
                        yAxis: {
                          
                            type: 'category',
                            data: ['智能手表','睡眠监测器','活动监测器']
                        },
                        series: [
                            {
                                name: '预警数',
                                type: 'bar',
                                data: [this.equipWatch[2],this.equipSleep[2],this.equipActive[2]]
                            },
                            
                            {
                                name: '离线数',
                                type: 'bar',
                                data: [this.equipWatch[1],this.equipSleep[1],this.equipActive[1]]
                            },
                            
                            {
                                name: '在线数',
                                type: 'bar',
                                data: [this.equipWatch[0],this.equipSleep[0],this.equipActive[0]]
                            },
                        ]
                });
                window.onresize =function(){
                  chartKeyPerson.resize() 
                  chartManPerson.resize()
                  chartPersonWarn.resize()
                  chartWarnDone.resize()
                  chartEquip.resize()
                  
                } 
            }
  }
}
</script>



<style lang="scss" scoped>
$bg:rgba(85, 85, 85, 0.933333333333333);
$dark_gray:#889aa4;
$light_gray:rgba(51, 51, 51, 1);
.el-header {
    background-color: $bg;
    color: #B3C0D1;
    padding:20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .bulletin-title{
      font-size: 1.5em;
      font-weight: bold;
      color: #fff;
    }
  }
.login-container {
  height: 100%;
  width: 100%;
  background-color: $light_gray;
  

  .el-main {
    height: calc(100% - 100px);
   
    .el-row {
    height: 100%;
      .el-col {
      height: 100%;
      .warnMess-title{
        font-size: 16px;
        font-weight: bold;
        margin-bottom:10px
      }
      .warnMess-content{
        white-space: nowrap;
        margin: 5px;
        font-size: 0.8vw;
        display: flex;
        justify-content: left;
        align-items: center;
        &-icon{
          color:#FFBE00;
          font-size: 1.5vw;
        }
      }
      }
     
    }
    .unusual-box{
      width: 100%;
      height: 250px;
      padding:20px;
      background: #fff;
      .unusual-census{
      display:flex;
      justify-content: space-between;
      align-items: center;
      &-item{
       width: 45%;
        padding:10px 0;
          border:1px solid #909399;
          border-radius: 4px;
          display:flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
      }
    }
    }
    
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
