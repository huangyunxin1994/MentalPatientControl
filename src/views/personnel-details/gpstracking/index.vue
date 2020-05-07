<template>
    <el-container class="gpstracking-container">
        <!-- <el-scrollbar style="width:100%;height:100%"> -->
        <el-header>
            <!-- <div class="gpstracking-header">
              <div class="gpstracking-title">人员详情</div>
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
            </el-row>
          </div> -->
          <div class="gpstracking-handle">
               <div class="block">
                    <span class="demonstration">轨迹查询</span>
                    <el-date-picker
                      v-model="value2"
                      type="datetimerange"
                      :picker-options="pickerOptions"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      align="right" @change="changeDate">
                    </el-date-picker>
                </div>
                 <el-button type="primary" @click="getPersonAlert">定位人员</el-button>
          </div>
        </el-header>
         
          <el-main class="gpstracking-content">
              <div  class="gpstracking-map">
                   <my-map ref="map" :locusPorint="locusPorint" :enterElecArr="enterElecArr" :personPoint="personPoint" :warnPoint="warnPoint"></my-map>
              </div>
              <div class="gpstracking-map">
                
                <my-table :tableTitle="tableTitle" :tableData="tableData" @positionWarn="positionWarn" @changeData="changeData"  @alertmessage="alertmessage" ></my-table>
              </div>
           
        </el-main> 
         <!-- </el-scrollbar> -->
      <dialog-warn-handle ref="sendData" @sendState='getSendData'></dialog-warn-handle>
    </el-container>
</template>

<script>
import myMap from "@/components/map/map"
import myTable from "@/components/table/table"
import myDate from "@/components/date/date"
import  dialogWarnHandle from '@/components/dialog-person/dialog-warn-handle/dialog'
import { getPersonAlert,getPersonCoordinate,selectElectronicFenceQuery,locationTracking,getElectronicFence,getPerSe,getByPrimaryKey,updateKeyPnlData } from "@/api/table"
import { parseTime} from '@/utils/index'
export default {
  name: 'Gpstracking',
  components:{
      myDate,
      myTable,
      myMap,
      dialogWarnHandle
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
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
      },
      value2: '',
      value4:"",
      echartsData:{},
      dateTime:"",
      personData:{},
      beginTime:"",
      endTime:"",
      locusPorint:[],
      warnPoint:{},
      personPoint:{},
      enterElecArr:[],
      tableTitle:[
            { title : "预警围栏", name : "fenceName", minwidth : "120", type : "input" },
            { title : "预警时间", name : "alertTime", minwidth : "150", type : "input" },
            { title : "处理时间", name : "handleTime", minwidth : "150", type : "input" },
            { title : "处理结果", name : "processingResult", width : "120", type : "input" },
            { title : "操作",width : "150", type : "handle",button:[{name:"处理预警",type:"edit"},{name:"查看处理记录",type:"search"},{name:"预警定位",type:"post"}] }
        ],
      tableData:[]
    }
  },
    methods: {
      async getPersonCoordinate(){
        let para ={}
        console.log(this.personData)
        para.keyUserId= this.personData.id
        para.startTime=this.beginTime
        para.endTime=this.endTime
        await getPersonCoordinate(para).then(res=>{
          if(res.code==0){
            console.log(res)
            this.locusPorint=res.data.data
            
          }
        })
        await this.$refs.map.getmap()
        if(this.locusPorint.length>0)
        await this.$refs.map.movePosBypoint(this.locusPorint[0].longitude,this.locusPorint[0].latitude)
      },
    getSendData(val){
      console.log(val)
      getByPrimaryKey({id:val,processingResult:"2"}).then(res=>{
        if(res.code==0){
           console.log("getByPrimaryKey")
          console.log(res)
          if(res.data.data.length==0){
            updateKeyPnlData({id:val,warning:1}).then(res=>{
              if(res.code==0){
                
              }
            }).catch(err=>{

            })
          }
        }
      })
      this.getPersonAlert()
    },
    alertmessage(val){
      console.log(val)
      this.$alert(`<div style='display: flex;justify-content: space-between;align-items: center;'>
                      <div><strong>处理时间：</strong>${val.handleTime}</div>
                      <div><strong>处理人：</strong>${val.handleUsername}</div></div>
                   <p><strong>处理记录：</strong></p><textarea style='width:100%;min-height:200px;padding:10px;border:1px solid #d7dae2;border-radius: 4px' disabled>${val.handleRecord}</textarea>`, '处理记录', {
          dangerouslyUseHTMLString: true
        });
    },
    changeData(val){
      this.$refs.sendData.getDandleShow(val)
    },
     getPerSe(){
       let para ={}
        para.keyUserId= this.personData.id
       getPerSe(para).then(res=>{
              if(res.code==0){
                  let phoneList = res.data.phone_list
                  this.personData = res.data.keyUser
                  this.personData.networkAdministratorP = phoneList[0].NetworkAdministrator
                  this.personData.responsiblePhysicianP = phoneList[0].ResponsiblePhysician
                  this.personData.guardianP = phoneList[0].Guardian
                 
              }
          }).catch(err=>{

          })
     },
     async getPersonAlert(){
       this.locusPorint=[]
            this.enterElecArr=[]
            this.warnPoint={}
        let id = this.personData.id
       await getPersonAlert({keyUserid:id}).then(res=>{
          if(res.code==0){
            this.tableData=res.data.data
          }
        })
        await locationTracking({keyUserid:id}).then(res=>{
          if(res.code==0){
             console.log(res)
            let coordinate = res.data.coordinate
            let fanceList = res.data.Fance_list
            // console.log(data)
            // let arr1=[]
            // for(let i in data){
            //   let o = data[i].electronicFence;
            //   o.userList = data[i].userList
            //   arr1.push(o)
            // }
            // console.log(arr1)
            this.personPoint = coordinate
            this.enterElecArr=fanceList;
            this.$refs.map.circleShow=true
          }
        }).catch(err=>{

        })
        await this.$refs.map.getmap()
      },
      changeDate(val){
        console.log(val)
        if(val==null){
          this.beginTime = ""
          this.endTime = ""
        }else{
          this.beginTime = parseTime(val[0])
          this.endTime = parseTime(val[1])
        }
        this.getPersonCoordinate()
      },
      positionWarn(val){
        console.log(val)
        getElectronicFence({id:val.fenceId}).then(res=>{
          if(res.code==0){
            console.log(res)
            this.locusPorint=[]
            this.enterElecArr=[]
            this.personPoint={}
              this.warnPoint = val
              this.enterElecArr.push(res.data.coordinate);
              this.$refs.map.circleShow=true
              this.$refs.map.getmap()
          }
        }).catch(err=>{

        })
      }
    },
    mounted(){
      this.personData.id=this.$route.query.id
      this.getPerSe()
      this.getPersonAlert()
      
      window.addEventListener('load', () => {
          let type = this.$route.query.type
          if(type==1)
           this.$router.push({ path: '/personstate' })
          else if(type==2)
           this.$router.push({ path: '/warningcenter' })
        })
    }
}
</script>
<style lang="scss" scoped>
.gpstracking {
  &-container {
    width: 100%;
    height: 100%;
    .el-header{
        height: auto !important;
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
     width: 50%;
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .el-date-editor{
       width: 80%;
      }
  }
  &-content{
    height: calc(100% - 120px);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &-map{
    width: 50%;
      height: 100%;
      padding-bottom: 20px;
      
  }
  
}
</style>
