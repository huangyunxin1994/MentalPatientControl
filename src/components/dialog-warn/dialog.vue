<template>
  <div>
    <el-dialog title="警告列表" :visible.sync="dialogTableVisible" center :append-to-body='true' :lock-scroll="false" width="50vw">
      <div class="warnList">
        <el-table
            :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            stripe
            border
            height="50vh"
            style="width: 100%">
            <el-table-column
              prop="alertType"
              label="预警类型"
              width="180"
              :formatter="ifendcase1">
            </el-table-column>
            <el-table-column
              prop="processingResult"
              label="预警状态"
              width="130"
              :formatter="ifendcase">
            </el-table-column>
            <el-table-column
              prop="alertTime"
              label="预警时间">
            </el-table-column>
            <el-table-column
              label= '操作'
              width="100">
              <template slot-scope='scope'>
                <el-button type="danger" size="mini" @click="compile(scope.$index, scope.row)">{{isCompile}}</el-button>
              </template>
            </el-table-column>
        </el-table>
        <div class="fenye">
          <div></div>
          <div class="block">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableData.length">
            </el-pagination>
          </div>
        </div>

        <el-row class="cancelSwrap">
          <div class="cancel">
            <!-- <el-button type="primary" @change.native="cancel">取消</el-button> -->
            <el-button type="primary" @click="cancel" class="cancelBtn">取消</el-button>
          </div>
        </el-row>
      </div>
      <dialog-warn-handle ref='showHandle'></dialog-warn-handle>
    </el-dialog>
  </div>
</template>

<script>
  import {getWarnListData , updateKeyPnlData} from '@/api/table'
  import dialogWarnHandle from '@/components/dialog-person/dialog-warn-handle/dialog'

  export default{
    props:['message'],
    components:{
      dialogWarnHandle
    },
    data() {
      return {
        dialogTableVisible:false,
        warnData:[],//初始化后台传过来的数据
        tableData: [],
        data:false,
        isCompile:'编辑',
        currentPage:1, //初始页
        pagesize:10,
      }
    },
    methods:{
      //预警状态处理
      ifendcase(val){
        let num = val.processingResult
        if(num == '1'){
          return '处理中'
        }else if(num == '2'){
          return '未处理'
        }else if(num == '3'){
          return '已处理'
        }else{
          return '忽略'
        }
      },
      //预警类型处理
      ifendcase1(val){
        let num = val.alertType
        if(num == '1'){
          return '活动频率异常'
        }else if(num == '2'){
          return '活动时间异常'
        }else if(num == '3'){
          return '心率异常'
        }else if(num == '4'){
          return '血压异常'
        }
        // else if(num == '5'){
        //   return '睡眠质量异常'
        // }else if(num == '6'){
        //   return '居家/离家异常'
        // }
        else if(num == '7'){
          return '电子围栏触发'
        }else if(num == '8'){
          return '限制外出预警'
        }
      },
      cancel(){
        // this.$emit('dialog','1')
        this.dialogTableVisible = false
      },
      getWarnListData1(res){
        this.dialogTableVisible=true
      },
      getListData(val){
        this.tableData = val
        if(this.tableData.length == 0){
          console.log(this.tableData.length)
        }
      },
      compile(index, row){
        // console.log(this.tableData[index])
        this.$refs.showHandle.getDandleShow(this.tableData[index])
      },
      handleSizeChange(val) {
        this.pagesize = val;
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
      }
    },
    created() {
      // getWarnListData()
    },
    mounted(){
      console.log(this.warnData)
    }
  }

</script>

<style scoped="scoped">
  .cancelSwrap{
    width: 100%;
  }
  .warnList{
    /* position: relative; */
  }
  .fenye{
    padding: 30px;
    display: flex;
    justify-content:space-between;
  }
  .block{
    /* position: absolute; */
    /* right: 0; */
    /* margin-right: 0px; */
  }
  .cancel{
    width: 140px;
    margin: 20px auto 0px;
  }
</style>
