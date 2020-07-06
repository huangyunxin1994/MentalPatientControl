<template>
    <el-container class="Equipwarn-container">
        <div class="Equipwarn-container-handle">
          <label for="" class="Equipwarn-container-handle-label">预警类型</label>
          <el-select v-model="valueW" filterable placeholder="请选择" @change="changeResultW">
            <el-option
              v-for="item in optionsW"
              :key="item.value"
              :label="item.label"
              :value="item.value" style="width:10vw">
            </el-option>
          </el-select>
          <label for="" class="Equipwarn-container-handle-label">处理结果</label>
          <el-select v-model="value" filterable placeholder="请选择" @change="changeResult">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value" style="width:10vw">
            </el-option>
          </el-select>
          <label for="" class="Equipwarn-container-handle-label">预警日期范围</label>
          <el-date-picker
            v-model="value2"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right" style="width:20vw"
            @change="changeDate"
            >
          </el-date-picker>
        </div>
          <my-table :tableTitle="tableTitle" :tableData="tableData" @changeData="changeData" @alertmessage="alertmessage" ref="table"></my-table>
        <dialog-warn-handle ref="sendData" @sendState='getSendData'></dialog-warn-handle>
    </el-container>
</template>

<script>
import  myTable  from '@/components/table/table'
import  dialogWarnHandle from '@/components/dialog-equip/dialog-warn-handle/dialog'
import { getRole,getUser } from '@/utils/auth'
import { getEquWarnlData } from "@/api/table"
import { parseTime} from '@/utils/index'
export default {
  name: 'Equipwarn',
  components:{
    myTable,
    dialogWarnHandle
  },
  data(){
    return{
      tableTitle:[
            { title : "报警类型", name : "equipAlertType", width : "120", type : "input" },
            { title : "设备号", name : "equipmentCode", minwidth : "180", type : "input" },
            { title : "设备类型", name : "equipmentType", width : "120", type : "input" },
            { title : "关联人员", name : "keyName", width : "120", type : "input" },
            { title : "报警时间", name : "alertTime", minwidth : "180", type : "input" },
            { title : "处理完成时间", name : "handleTime", minwidth : "150", type : "input" },
            { title : "处理结果", name : "processingResult", width : "120", type : "input" },
            { title : "处理人", name : "handleUsername", width : "120", type : "input" },
            { title : "操作",width : "150", type : "handle",button:[{name:"处理",type:"edit"},{name:"查看处理记录",type:"search"}] }
        ],
      tableData:[],
      optionsW: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '2',
          label: '低电'
        }, {
          value: '3',
          label: '脱落报警'
        }, {
          value: '4',
          label: '佩戴提醒'
        },
        {
          value: '5',
          label: '剪断报警'
        }, {
          value: '6',
          label: '跌倒报警'
        }, {
          value: '7',
          label: '温度过高'
        }, {
          value: '8',
          label: '烟雾浓度过高'
        },
        {
          value: '9',
          label: '离线'
        }
      ],
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
        endTime:"",
        currentPage:1,
        pageSize:20,
    }
  },
  methods: {
    getEquWarnlData(currentPage){
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
      param.currentPage = currentPage||this.currentPage
      param.pageSize = this.pageSize
      this.$refs.table.listLoading = true
      getEquWarnlData(param).then(res=>{
        if(res.code==0){
          for(let i in res.data.data){
          res.data.data[i].equipAlertType = res.data.data[i].alertType
          }
          this.tableData= res.data.data
          this.$refs.table.listLoading = false
          this.$refs.table.tableLength = res.data.count
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
      console.log(val)
      this.$refs.sendData.getDandleShow(val)
    },
    getSendData(val){
      this.getEquWarnlData()
    },
    changeResult(val){
      this.value=val;
      this.getEquWarnlData()
    },
    changeResultW(val){
      this.valueW=val;
      this.getEquWarnlData()
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
      this.getEquWarnlData()
    }
  },
  mounted(){
    this.getEquWarnlData()
  }
}
</script>
<style lang="scss" scoped>
.Equipwarn {
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
      .el-select{
        width: 10vw;
      }
      .el-date-picker{
        width: 10vw;
      }
    }
  }
  &-handleRecord{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
