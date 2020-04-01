<template>
    <el-container class="dashboard-container">
      <mymap class="dashboard-map" ref="map" :pointsArr="pointsArr" :electricFenceArr="electricFenceArr"></mymap>
      <my-tree class="dashboard-tree"></my-tree>
      <div class="dashboard-button">
        <el-button type="primary" @click="showThisMark('0')">在家人员数<br/><br/>{{inHomeNum}}</el-button>
        <el-button type="primary" @click="showThisMark('1')">离家人员数<br/><br/>{{outHomeNum}}</el-button>
        <el-button type="primary" @click="showThisMark('2')">今日预警数<br/><br/>{{warningNum}}</el-button>
        <el-button type="primary" @click="showThisCircle(showflag)">电子围栏数<br/><br/>{{electricFenceArr.length}}</el-button>
      </div>
      <div class="dashboard-message">
        <div class="box-card">
          <div class="dashboard-message-title">
                <i class="el-icon-s-opportunity"></i><span>最新预警信息</span>
          </div>
          <el-scrollbar class="dashboard-scrollbar" v-if="dashboardContext.length!=0">
            <div v-for="(item,index) in dashboardContext" :key="index" class="dashboard-context">
              <span>{{item.date}}</span>
              <span>预警类型：{{item.type}}</span>
              <span>预警地址：{{item.addr}}</span>
              <span>预警人名字：{{item.name}}</span>
              <div class="dashboard-context-handle">
                 <el-button type="danger" size="mini" @click="getLocation(item.pointX,item.pointY)">定位</el-button>
                 <el-button type="danger" size="mini" @click="getDetails(item.id)" plain>详情</el-button>
              </div>
            </div>
          </el-scrollbar>
          <div class="dashboard-nomessage" v-else>
              暂无预警信息
          </div>
        </div>
      </div>
    </el-container>
</template>

<script>
import  mymap  from '@/components/map/map'
import  myTree from '@/components/tree/tree'
export default {
  name: 'Dashboard',
  components:{
    mymap,
    myTree,
    
  },
  computed:{
    inHomeNum(){
      var inHomeArr = this.pointsArr.filter((item) => {
            return item.state === 0
      })
      return inHomeArr.length
    },
    outHomeNum(){
      var outHomeArr = this.pointsArr.filter((item) => {
            return item.state === 1
      })
      return outHomeArr.length
    },
    warningNum(){
      var warningArr = this.pointsArr.filter((item) => {
            return item.state === 2
      })
      return warningArr.length
    }
    
  },
  data(){
    return{
      showflag:true,
      dashboardContext:[
        {date:"2020-02-20 01:30:00",type:"xx",addr:"xx省xx市xx区",name:"孙七",id:"1",pointX:116.332453,pointY:39.989007},
        {date:"2020-02-20 01:30:00",type:"xx",addr:"xx省xx市xx区",name:"宋八",id:"2",pointX:116.324045,pointY:39.987984}
      ],
      pointsArr:[
          {pointX:116.316967,pointY:39.990748,state:0,name:"张三",phone:"13845684561"},
          {pointX:116.323938,pointY:39.989919,state:0,name:"李四",phone:"13845684561"},
          {pointX:116.328896,pointY:39.988039,state:1,name:"王五",phone:"13845684561"},
          {pointX:116.321135,pointY:39.987072,state:1,name:"赵六",phone:"13845684561"},
          {pointX:116.332453,pointY:39.989007,state:2,name:"孙七",phone:"13845684561"},
          {pointX:116.324045,pointY:39.987984,state:2,name:"宋八",phone:"13845684561"}
      ],
      electricFenceArr:[
          {pointX:116.316967,pointY:39.990748},
          {pointX:116.323938,pointY:39.989919},
          {pointX:116.328896,pointY:39.988039},
      ]
    }
  },
    methods: {
      getLocation(x,y){
        this.$refs.map.movePosBypoint(x,y)
      },
      getDetails(id){
         this.$router.push({name: 'Warningcenter'})
      },
      showThisMark(val){
        this.$refs.map.showMarkerOver(val)
      },
      showThisCircle(val){
        this.$refs.map.showCircleOver(val)
        this.showflag=!this.showflag
      }

    }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    width: 100%;
    height: 100%;
    position: relative;
  }
  &-map{
    position: absolute;
    top: 0;
    left: 0;
  }
  &-button{
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    height: 68px;
    z-index: 1;
    .el-button{
       font-size: 0.8vw;
    }
  }
  &-tree{
    position: absolute;
    top: 0;
    left: 0;
  }
  &-message{
    position: absolute;
    bottom: 0;
    right: 0;
    width: 15%;
    height: 85%;
    margin: 1%;
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    .box-card{
      height: 100%;
      background: #fff;
      padding: 20px 10px;
      border-radius: 5px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
    }
    &-title{
      font-size: 1.2vw;
      font-weight: bold;
      margin-bottom: 1em;
      color: #F56C6C;
    }
  }
  &-scrollbar{
    height: 90%;
    .dashboard-context{
      width: calc(100% - 10px);
      height: 200px;
      background: rgba(242, 242, 242, 1);
      border-radius: 10px;
      margin: 10px 0;
      padding: 10px;
      display: flex;
      flex-direction:column;
      justify-content: space-between;
      font-size: 0.7vw;
      font-weight: bold;
      &-handle{
        text-align: center;
        .el-button{
          font-size: 0.7vw;
        }
      }

    }
  }
  &-nomessage{
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
    color:#909399
  }
}
</style>
