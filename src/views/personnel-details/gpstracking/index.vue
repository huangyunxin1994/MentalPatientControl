<template>
    <el-container class="gpstracking-container">
        <el-scrollbar style="width:100%;height:100%">
        <el-header>
            <div class="gpstracking-header">
              <div class="gpstracking-title">人员详情</div>
              <el-row :gutter="20">
                <el-col :span="8">姓名：张三</el-col>
                <el-col :span="8">联系电话：150xxxxxxx</el-col>
                <el-col :span="8">网格管理员：赵枫</el-col>
                <el-col :span="8">人员级别：二级</el-col>
                <el-col :span="8">住址：xxx省xxx市</el-col>
                <el-col :span="8">责任医师：钱塘</el-col>
                <el-col :span="8">病情描述：活动频率异常，情绪不稳定</el-col>
                <el-col :span="8">监护人：李四</el-col>
                <el-col :span="8">所属组织：南宁市青秀分局</el-col>
            </el-row>
          </div>
          <div class="gpstracking-handle">
               <div class="block">
                    <span class="demonstration">轨迹查询</span>
                    <el-date-picker
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                </div>
          </div>
        </el-header>
         
          <el-main>
              <div  class="gpstracking-map">
                   <my-map></my-map>
              </div>
           电子围栏预警记录:
            <my-table></my-table>
        </el-main> 
         </el-scrollbar>
      <el-row>
         
      </el-row>
    </el-container>
</template>

<script>
import myMap from "@/components/map/map"
import myTable from "@/components/table/table"
import myDate from "@/components/date/date"
export default {
  name: 'Gpstracking',
  components:{
      myDate,
      myTable,
      myMap
  },
  data(){
    return{
      value4:"",
      echartsData:{},
      dateTime:""
    }
  },
    methods: {
      
    },
    mounted(){

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
              font-size: 15px;
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
  }
  &-map{
      height: 500px;
      padding-bottom: 20px;
  }
  
}
</style>
