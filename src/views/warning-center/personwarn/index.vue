<template>
    <el-container class="personwarn-container">
          <my-table :tableTitle="tableTitle" :tableData="tableData" @changeData="changeData"></my-table>
        <div class="personwarn-container-handle">
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
          
          <my-table :tableTitle="tableTitle" :tableData="tableData" @changeData="changeData" ref="table"></my-table>
          <dialog-warn-handle ref="sendData" @sendState='getSendData'></dialog-warn-handle>
    </el-container>
</template>

<script>
import  myTable  from '@/components/table/table'
import  dialogWarnHandle from '@/components/dialog-person/dialog-warn-handle/dialog'
import { getPerWarnlData } from "@/api/table"
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
            { title : "预警时间", name : "alertTime", minwidth : "150", type : "input" },
            { title : "监护人", name : "guardian", width : "120", type : "input" },
            { title : "网格管理员", name : "networkAdministrator", minwidth : "150", type : "input" },
            { title : "责任医师", name : "responsiblePhysician", width : "120", type : "input" },
            { title : "处理结果", name : "processingResult", minwidth : "150", type : "input" },
            { title : "处理时间", name : "handleTime", width : "120", type : "input" },
            { title : "处理人", name : "handleUsername", minwidth : "150", type : "input" },
            { title : "操作",width : "150", type : "handle",button:[{name:"处理",type:"edit"}] }
        ],
        tableData:[],
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
      console.log(user)
      let param ={}
      param.roleId=role
      param.userId=user.userId
      param.organizaId=user.organizationId||""
      param.processingResult = this.value
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
    changeData(val){
      this.$refs.sendData.getDandleShow(val)
    },
    getSendData(val){
      this.getPerWarnlData()
    },
    changeResult(val){
      this.value=val;
      this.getPerWarnlData()

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
      
      this.getPerWarnlData()
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
  }
}
</style>
