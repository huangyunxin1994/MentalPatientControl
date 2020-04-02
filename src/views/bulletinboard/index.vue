<template>
  <el-container class="login-container">
    <el-header class="bulletin-header" height="100">
      <span>&nbsp;</span>
      <span class="bulletin-title">精神病患者管控数据分析平台</span>
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
              <div class="warnMess-content" v-for="i in 15" :key="i" style="white-space:nowrap">
                <i class="el-icon-warning warnMess-content-icon"></i>&nbsp;&nbsp;[2020-3-3 20:20:20]&nbsp;&nbsp; 轻度人员预警：张三  
              </div>
            </el-scrollbar>
          </div>
        </el-col>
       
        <el-col :span="12">
            <div style="width:100%;height:100%">
              <mymap></mymap>
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
        {value: 335, name: '监护人'},
        {value: 310, name: '医师'},
        {value: 234, name: '网格员'}
      ],
      KeyPersonData:[
        { value: 335, name: '重度患者' },
        { value: 310, name: '中度患者' },
        { value: 234, name: '轻度患者' }
      ]
    }
  },
  mounted(){
    this.drawChart();
  },
  methods: {
    enterSys(){
      this.$router.push({ path: '/' })
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
                            fontSize: 16,
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
                            name: '访问来源',
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
                        data: ['已处理', '未处理']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '20%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        data: ['电子围栏触发','在家/离家异常','睡眠质量异常','血压异常','心率异常','活动时间异常','活动频率异常']
                    },
                    series: [
                      
                        {
                            name: '已处理',
                            type: 'bar',
                            data: [10, 20, 10, 50, 10, 21,15]
                        },
                        {
                            name: '未处理',
                            type: 'bar',
                            data: [1, 2, 1, 5, 2, 3,1]
                        }
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
                        data: ['十一月', '十二月', '一月', '二月', '三月', '四月']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        name:"预警总数",
                        data: [10, 8, 12, 15, 6, 7],
                        type: 'line'
                    },
                    {
                        name:"处理数",
                        data: [5, 8, 10, 10, 5, 7],
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
                            data: ['在线数','离线数',"预警数"]
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '15%',
                            containLabel: true
                        },
                        xAxis: {
                            
                            type: 'value',
                            boundaryGap: [0, 0.01]
                        },
                        yAxis: {
                          
                            type: 'category',
                            data: ['智能手表','睡眠监测器','活动监测器']
                        },
                        series: [
                          
                            {
                                name: '在线数',
                                type: 'bar',
                                data: [10, 20, 10, 50, 10, 21,15]
                            },
                            {
                                name: '离线数',
                                type: 'bar',
                                data: [1, 2, 1, 5, 2, 3,1]
                            },
                            {
                                name: '预警数',
                                type: 'bar',
                                data: [1, 2, 1, 5, 2, 3,1]
                            }
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
