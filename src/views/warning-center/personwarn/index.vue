<template>
    <el-container class="personwarn-container">
        <div class="personwarn-container-handle">
          <label for="" class="personwarn-container-handle-label">预警类型</label>
          <el-select v-model="valueW" filterable placeholder="请选择" @change="changeResultW">
            <el-option
              v-for="item in optionsW"
              :key="item.value"
              :label="item.label"
              :value="item.value" style="width:10vw">
            </el-option>
          </el-select>
          <label for="" class="personwarn-container-handle-label">处理结果</label>
          <el-select v-model="value" filterable placeholder="请选择" @change="changeResult">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value" style="width:10vw">
            </el-option>
          </el-select>
          <label for="" class="personwarn-container-handle-label">预警日期范围</label>
          <el-date-picker
            v-model="value2"
            type="daterange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right" style="width:20vw"
            @change="changeDate"
            >
          </el-date-picker>
        </div>

          <my-table :tableTitle="tableTitle" :tableData="tableData" @changeData="changeData" @alertmessage="alertmessage" @changeRouter="changeRouter" ref="table"></my-table>
          <dialog-warn-handle ref="sendData" @sendState='getSendData'></dialog-warn-handle>
    </el-container>
</template>

<script>
import  myTable  from '@/components/table/table'
import  dialogWarnHandle from '@/components/dialog-person/dialog-warn-handle/dialog'
import { getPerWarnlData,getByPrimaryKey,updateKeyPnlData } from "@/api/table"
import { getRole,getUser } from '@/utils/auth'
import { parseTime} from '@/utils/index'
export default {
  name: 'Personwarn',
  components:{
    myTable,
    dialogWarnHandle
  },
  data(){
    return{
      tableTitle:[
            { title : "姓名", name : "name", width : "120", type : "link" },
            { title : "预警类型", name : "alertType", minwidth : "150", type : "input"},
            { title : "所属组织", name : "organizationName", width : "120", type : "input" },
            { title : "预警时间", name : "alertTime", minwidth : "180", type : "input" },
            { title : "监护人", name : "guardian", width : "120", type : "tooltip" },
            { title : "触发值", name : "triggeres", minwidth : "120", type : "input" },
            { title : "实际值", name : "actual", width : "120", type : "input" },
            { title : "处理结果", name : "processingResult", minwidth : "150", type : "input" },
            { title : "处理时间", name : "handleTime", minwidth : "180", type : "input" },
            { title : "处理人", name : "handleUsername", minwidth : "150", type : "input" },
            { title : "操作",width : "150", type : "handle",button:[{name:"处理",type:"edit"},{name:"查看处理记录",type:"search"}] }
        ],
        tableData:[],
        optionsW: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '活动频率异常'
        }, {
          value: '2',
          label: '活动时间异常'
        }, {
          value: '3',
          label: '心率异常'
        }, {
          value: '4',
          label: '血压异常'
        },
        {
          value: '5',
          label: '睡眠质量异常'
        }, {
          value: '6',
          label: '居家/离家异常'
        }, {
          value: '7',
          label: '电子围栏触发'
        }, {
          value: '8',
          label: '限制外出预警'
        }, {
          value: '9',
          label: 'SOS'
        }],
        options: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '处理中'
        }, {
          value: '2',
          label: '未处理'
        }, {
          value: '3',
          label: '已处理'
        }, {
          value: '4',
          label: '忽略'
        }],
        value: '2',
        valueW: '',
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
        beginTime:"",
        endTime:""

    }
  },
  methods: {
    getPerWarnlData(){
      let role = JSON.parse(getRole())
      let user = JSON.parse(getUser());
      let param ={}
      param.roleId=role
      param.userId=user.userId
      param.organizaId=user.organizationId||""
      param.processingResult = this.value
      param.alertType = this.valueW
      param.beginTime = this.beginTime
      param.endTime = this.endTime
      this.$refs.table.listLoading = true
      getPerWarnlData(param).then(res=>{
        if(res.code==0){
          console.log(res)
          this.tableData= res.data.data
          this.$refs.table.listLoading = false
        }
      }).catch(err=>{

      })
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
      this.getPerWarnlData()
    },
    changeResult(val){
      this.value=val;
      this.getPerWarnlData()

    },
    changeResultW(val){
      this.valueW=val;
      this.getPerWarnlData()
    },
    changeDate(val){
      console.log(val)
      if(val==null){
        this.beginTime = ""
        this.endTime = ""
      }else{
        this.beginTime = parseTime(val[0],`{y}-{m}-{d}`)+" 00:00:00"
        this.endTime = parseTime(val[1],`{y}-{m}-{d}`)+" 23:59:59"
      }

      this.getPerWarnlData()
    },
    changeRouter(val){
      this.$router.push(
      {
          path: '/persondetails' ,
          query: {
            id: val.keyUserid,
            type:'2'
          }
      })
    }
  },
  mounted(){
    this.getPerWarnlData()
  }
}
</script>
<style lang="scss" scoped>
.personwarn {
  &-container {
    width: 100%;
    height: 100%;
    position: relative;
    &-handle{
      position: absolute;
      top: 2vh;
      left: 25vw;
      &-label{
        font-size: 0.7vw;
        color: #606266;
      }
      
    }
    .el-select{
        width: 10vw;
      }
      .el-date-editor{
         width: 10vw;
      }
  }
}
</style>
