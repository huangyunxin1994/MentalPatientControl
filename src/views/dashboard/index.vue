<template>
    <el-container class="dashboard-container">
      <mymap class="dashboard-map" ref="map" :pointsArr="pointsArr" :enterElecArr="enterElecArr"></mymap>
      <my-tree showPerson='true' class="dashboard-tree" @getThisOrgan="getThisOrgan" @getPersonData="getPersonData"></my-tree>
      <div class="dashboard-button">
        <el-button type="primary" @click="showThisMark1('0')">在家人员数<br/><br/>{{inHomeNum}}</el-button>
        <el-button type="primary" @click="showThisMark2('1')">离家人员数<br/><br/>{{outHomeNum}}</el-button>
        <el-button type="primary" @click="showThisMark3('2')">预警人员数<br/><br/>{{warningNum}}</el-button>
        <el-button type="primary" @click="showThisCircle(showflag)">电子围栏数<br/><br/>{{enterElecArr.length}}</el-button>
      </div>
      <div class="dashboard-message">
        <div class="box-card">
          <div class="dashboard-message-title">
                <i class="el-icon-s-opportunity"></i><span>最新预警信息</span>
          </div>
          <el-scrollbar class="dashboard-scrollbar" v-if="dashboardContext.length!=0">
            <div v-for="(item,index) in dashboardContext" :key="index" class="dashboard-context">
              <span>{{item.alertTime}}</span>
              <span>预警类型：{{item.alertType | filterData}}</span>
              <span>预警人地址：{{item.address}}</span>
              <span>预警人名字：{{item.name}}</span>
              <div class="dashboard-context-handle">
                 <el-button type="danger" size="mini" @click="getLocation(item.keyLongitude,item.keyLatitude)">定位</el-button>
                 <el-button type="danger" size="mini" @click="getDetails(item)" plain>详情</el-button>
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
import store from '@/store'
import { getPerWarnlData,selectElectronicFenceQuery,getOrganData } from "@/api/table"
import { getRole,getUser } from '@/utils/auth'
export default {
  name: 'Dashboard',
  components:{
    mymap,
    myTree,

  },
  filters: {
    filterData: (value)=> {
        if (!value) return ''
        value = value.toString()
        return value == 1 ? '活动频率异常' : (value == 2 ? '活动时间异常' : (value == 3? '心率异常' :(value == 4 ? '血压异常' :(value == 5 ? '睡眠质量异常' :(value == 6 ? '居家/离家异常' :(value == 7 ? '电子围栏触发' :(value == 8 ? '限制外出预警' :' ')))))))
    }
  },
  computed:{
    inHomeNum(){
      var inHomeArr = this.pointsArr.filter((item) => {
            return item.personnelStatus === "1"&&item.warning != 2
      })
      return inHomeArr.length
    },
    outHomeNum(){
      var outHomeArr = this.pointsArr.filter((item) => {
            return item.personnelStatus === "2"&&item.warning != 2
      })
      return outHomeArr.length
    },
    warningNum(){
      var warningArr = this.pointsArr.filter((item) => {
            return item.warning == 2
      })
      return warningArr.length
    }

  },
  data(){
    return{
      showflag:true,
      dashboardContext:[],
      pointsArr:[],
      enterElecArr:[],
      showall1:false,
    }
  },
    methods: {
      getLocation(x,y){
        this.$refs.map.movePosBypoint(x,y)
      },
      getDetails(id){
         // console.log("*****************************")
         // console.log(id)
         this.$router.push({
           // path: 'Warningcenter',
           path:'/persondetails',
           query:{
             id:id.keyUserid
             // row:id
           },
         })
      },
      showThisMark1(val){
        this.$refs.map.showMarkerOver(val,this.showall1)
        this.showall1=!this.showall1
        this.showall2=false
        this.showall3=false
      },
      showThisMark2(val){
        this.$refs.map.showMarkerOver(val,this.showall2)
        this.showall2=!this.showall2
        this.showall1=false
        this.showall3=false
      },
      showThisMark3(val){
        this.$refs.map.showMarkerOver(val,this.showall3)
        this.showall3=!this.showall3
        this.showall1=false
        this.showall2=false

      },
      showThisCircle(val){
        this.$refs.map.showCircleOver(val)
        this.showflag=!this.showflag
      },
      getThisOrgan(data){
        if(data.className=="person"){
          this.$refs.map.movePosBypoint(data.keyLongitude,data.keyLatitude)
        }else{
          let role = JSON.parse(getRole())
          let user = JSON.parse(getUser());
          console.log(user)
          let param ={}
          param.roleId=role
          param.userId=user.userId
          param.organizaId=data.id
          getOrganData(param).then(res=>{
            if(res.code==0){
               this.pointsArr=res.data.user;
               console.log("pointsArr")
               console.log(this.pointsArr)
               this.$refs.map.getmap();
            }
          })
        }
      },
      getPersonData(val){

        this.pointsArr=val
        console.log("pointsArr")
               console.log(this.pointsArr)
      },
      async getPerWarnlData(){
        let role = JSON.parse(getRole())
        let user = JSON.parse(getUser());
        let param ={}
        param.roleId=role
        param.userId=user.userId
        param.organizaId=user.organizationId||""
        param.processingResult = 2
        await getPerWarnlData(param).then(res=>{
          if(res.code==0){
            this.dashboardContext=res.data.data
          }
        }).catch(err=>{

        })
      },
      async selectElectronicFence(){
        await selectElectronicFenceQuery().then(res=>{
          if(res.code==0){
            let data = res.data.data
            let arr1=[]
            for(let i in data){
              let o = data[i].electronicFence;
              o.userList = data[i].userList
              arr1.push(o)
            }
            this.enterElecArr=arr1;
          }
        }).catch(err=>{

        })
      }
    },
    async mounted(){
      await this.getPerWarnlData();
      await this.selectElectronicFence()
      await this.$refs.map.getmap();
      await store.dispatch('user/getWarnNum')
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
    min-width: 180px;
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
    font-size: 1.5vw;
    color:#909399
  }
}
</style>
