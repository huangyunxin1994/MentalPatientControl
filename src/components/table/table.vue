<template>
<section style="width: 100%;height:100%;padding:2vh;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
    <div style="margin-bottom:2vh;width:20vw">
       <el-input v-model="inputValue" placeholder="请输入内容"></el-input>
    </div>
    <el-table :data="tableData" border stripe highlight-current-row v-loading="listLoading" height="calc(100% - 100px)">
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column v-for="(item,index) in tableTitle" :key="index" :prop="item.name" :label="item.title" :width="item.width" :min-width="item.minwidth" :sortable="item.type!='button'&&item.type!='handle'?true:false">
            <template slot-scope="scope">
                <el-link type="primary" v-if="item.type=='link'" @click="userDetails(scope.$index, scope.row)" v-html="arrFormatter(scope.row[item.name],item.name)"></el-link>
                <!-- <el-link :type="scope.row[item.name] == 1 ? 'success' : value == 0 ? 'primary' : ''" v-else-if="item.type=='button'" @click="changeNoticeSates(scope.$index, scope.row)" v-html="arrFormatter(scope.row[item.name],item.name)"></el-link> -->
                <div v-else-if="item.type=='handle'">
                    <el-tooltip v-for="(item,index) in item.button" :key="index" :content="item.name" placement="top">
                       <el-button v-if="item.type=='edit'&&scope.row['processingResult']!=3" type="primary" icon="el-icon-edit" size="small" circle @click="handleEdit(scope.$index, scope.row)"></el-button>
                       <el-button v-else-if="item.type=='remove'" type="danger" icon="el-icon-delete" size="small" circle @click="handleRemove(scope.$index, scope.row)"></el-button>
                       <el-button v-else-if="item.type=='search'&&scope.row['processingResult']==3" type="info" icon="el-icon-search" size="small" circle @click="handleSearch(scope.$index, scope.row)"></el-button>
                       <el-button v-else-if="item.type=='relevance'&&scope.row['processingResult']!=3" type="info" icon="el-icon-setting" size="small" circle @click="handleRelevance(scope.$index, scope.row)"></el-button>
                       <el-button v-else-if="item.type=='post'" type="warning" icon="el-icon-s-promotion" size="small" circle @click="handlePosition(scope.$index, scope.row)"></el-button>
                    </el-tooltip>
                </div>
                <div v-else-if="item.type=='tooltip'">
                      <el-popover
                        placement="top"
                        width="200"
                        trigger="click"
                        :content="phoneNumber!='undefined'&&phoneNumber.length>0 ? '联系电话:'+phoneNumber:'联系电话:无'"
                        @show="loadData(scope.row,item.name)">
                        <el-link type="primary" slot="reference" :formatter="formatSex" v-html="arrFormatter(scope.row[item.name],item.name)"></el-link>
                      </el-popover>
                </div>
                <div v-else-if="item.type=='wglist'">
                      <el-popover v-for="(ite,index) in scope.row[item.name]" :key="index" placement="top" width="200" trigger="click" :content="ite.phone!='undefined'&&ite.phone.length>0 ? '联系电话:'+ite.phone:'联系电话:无'">
                        <el-link type="primary"  :formatter="formatSex"  slot="reference" >{{ite.name+'&nbsp;&nbsp;&nbsp;'}}</el-link>
                      </el-popover>
                </div>
                <div v-else-if="item.type=='jhlist'">
                      <el-popover v-for="(ite,index) in scope.row[item.name]" :key="index" placement="top" width="200" trigger="click" :content="ite.phone!='undefined'&&ite.phone.length>0 ? '联系电话:'+ite.phone:'联系电话:无'">
                        <el-link type="primary"  :formatter="formatSex"  slot="reference" >{{ite.name+'&nbsp;&nbsp;&nbsp;'}}</el-link>
                      </el-popover>
                </div>
                <div v-else-if="item.type=='zrlist'">
                      <el-popover v-for="(ite,index) in scope.row[item.name]" :key="index" placement="top" width="200" trigger="click" :content="ite.phone!='undefined'&&ite.phone.length>0 ? '联系电话:'+ite.phone:'联系电话:无'">
                        <el-link type="primary"  :formatter="formatSex"  slot="reference" >{{ite.name+'&nbsp;&nbsp;&nbsp;'}}</el-link>
                      </el-popover>
                </div>
                <el-button v-else-if="item.type=='button'"  icon="el-icon-setting" type="info" size="small" circle @click="handleSetting(scope.$index, scope.row,item.name)"></el-button>
                <el-button v-else-if="item.type=='buttonRole'&&scope.row['roleId']>1"  icon="el-icon-setting" type="info" size="small" circle @click="handleSetting(scope.$index, scope.row,item.name)"></el-button>

                <div v-else-if="item.type=='equip'">
                  <span v-for="(ite,index) in scope.row[item.name]" :key="index" v-html="arrFormatter(ite.type,item.name)"></span>
                </div>
                <p v-else :formatter="formatSex" v-html="arrFormatter(scope.row[item.name],item.name)"></p>
            </template>
        </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
      <el-pagination background layout="prev, pager, next, jumper" @current-change="handleCurrentChange" :page-size="20" :total="tableLength!=''? tableLength:0" style="float:right;">
      </el-pagination>
    </el-col>
</section>

</template>

<script>
import { getThisUser } from "@/api/table"
import "@/assets/icon/iconfont.css"
  export default {
    props:{
        tableTitle:Array,
        tableData:Array
    },
    data() {
      return {
        listLoading:false,
        tableLength:'',
        inputValue:"",
        sels:[],
        total: 0,
        page: 1,
        value: '',
        phoneNumber:""
      }
    },
    methods:{
        //性别显示转换
        formatSex: function (row, column) {
                  console.log(column.property)
                  if(column.property=="sex")
                  return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '';
                  else
                  return row[column.property]
        },
        // selsChange: function (sels) {
        //   console.log(sels)
				//   this.sels = sels;
        // },
        arrFormatter (value,name) {
             if(name=='sex')
             return value == 1 ? '男' : value == 0 ? '女' : '';
            else if(name=='multiplexMark')
             return value == 1 ? '是' : value == 0 ? '否' : '';
            else if(name=='status')
             return value == 1 ? '<span style="color:#409EFF;font-weight:bold">启用</span>' : value == 2 ? '<span style="color:#E6A23C;font-weight:bold">停用</span>' : '';
            else if(name=='state')
             return value == 1 ? '<span style="color:#409EFF;font-weight:bold">启用</span>' : value == 0 ? '<span style="color:#E6A23C;font-weight:bold">停用</span>' : '';
            else if(name=='eqlist')
             return value == 1 ? '<i class="iconyangan"></i>' : (value == 2 ? '<i class="iconchuang"></i>' : (value == 3 ? '<i class="iconshoubiao" />':''));
            //  return '<i class="iconyangan"></i>';
            else if(name == 'ifRelease')
             return value == 1 ? '已发布' : value == 0 ? '发布' : '';
            else if(name == 'type')
             return value == 1 ? '进入' : value == 2 ? '外出' : '';
            else if(name == 'processingResult')
             return value == 1 ? '<span style="color:#E6A23C;font-weight:bold">处理中</span>' : (value == 2 ? '<span style="color:#F56C6C;font-weight:bold">未处理</span>' : (value == 3? '<span style="color:#67C23A;font-weight:bold">已处理</span>' : value == 4? '<span style="color:#909399;font-weight:bold">已忽略</span>':""));
            else if(name == 'equipmentType')
             return value == 1 ? '活动监测器' : (value == 2 ? '睡眠监测器' : value == 3? '智能手表' :"");
            else if(name == 'level')
             return value == 1 ? '一级' : (value == 2 ? '二级' : (value == 3? '三级' :(value == 4 ? '四级' :(value == 5 ? '五级' :(value == 6 ? '六级' :(value == 7 ? '七级' :(value == 8 ? '八级' : value == 9 ? '九级' :' ')))))))
            else if(name == 'equipAlertType')
             return value == 2 ? '低电' : (value == 3? '脱落报警' :(value == 4 ? '佩戴提醒' :(value == 5 ? '剪断报警' :(value == 6 ? '跌倒报警' :(value == 7 ? '温度过高' :(value == 8 ? '烟雾浓度过高' :(value == 9 ? '离线' :"正常")))))))
            else if(name == 'alertType')
             return value == 1 ? '活动频率异常' : (value == 2 ? '活动时间异常' : (value == 3? '心率异常' :(value == 4 ? '血压异常' :(value == 7 ? '电子围栏触发' :(value == 8 ? '限制外出预警' :(value == 9 ? 'SOS' :' '))))))
            else if(name == 'thisState')
             return value == 1 ? '<span style="color:#67C23A;font-weight:bold">在家</span>' : (value == 2 ? '<span style="color:#E6A23C;font-weight:bold">离家</span>' : value == 3? '<span style="color:#F56C6C;font-weight:bold">预警</span>' :"");
            else if(name == 'equipmentState'){
             return value == 1 ? '<span style="color:#67C23A;font-weight:bold">在线</span>' : (value == 2 ? '<span style="color:#E6A23C;font-weight:bold">离线</span>' : value == 3? '<span style="color:#F56C6C;font-weight:bold">预警</span>' :"");

            }
            else
             return value;

        },
        handleCurrentChange(val){
           this.page = val;
           this.$emit('getPerWarnlData',val)
        },
        userDetails(index,row){
          this.$emit('changeRouter',row)
          // this.$router.push(
          //   {
          //     path: '/persondetails' ,
          //     query: {
          //       row: row
          //     }
          // })
        },
        //配置
        handleSetting(index,row,name){
        console.log(name)
          this.$emit('settingData',row,name)
        },
        //编辑
        handleEdit(index,row){
          // console.log(row)
          this.$emit('changeData',row)
        },
        //删除
        handleRemove(index,row){
          	this.$confirm('确认删除该记录吗?', '提示', {
					    type: 'warning'
            }).then(() => {
              this.listLoading = true;
              //NProgress.start();
              this.$emit('removeData',row)

            }).catch(() => {

            });
        },
        //查看
        handleSearch(index,row){
          console.log(row)
          this.$emit('alertmessage',row)
        },
        //关联
        handleRelevance(index,row){
          this.$emit('relevancePerson',row)
        },
        //定位
        handlePosition(index,row){
          this.$emit('positionWarn',row)
        },
        //查询单个用户获得电话号码
        loadData(row,name){
         let para ={};
          para.userId=row.guardianId
          getThisUser(para).then(res=>{
            if(res.code==0){
              console.log(res)
              if(res.data.user.phone)
              this.phoneNumber=res.data.user.phone
              else
              this.phoneNumber=''
            }
          }).catch(err=>{

          })
         // phoneNumber
        },
        //批量删除
        // batchRemove() {
        //     var ids = this.sels.map(item => item.id).toString();
        //     this.$confirm('确认删除选中记录吗？', '提示', {
        //       type: 'warning'
        //     }).then(() => {
        //       this.listLoading = true;
        //       //NProgress.start();
        //       let para = this.sels;
        //       console.log(para)
        //       this.$emit('bRemoveData',para)

        //     }).catch(() => {

        //     });
        // },
    },
    computed:{
      tables:function(){
        var search=this.inputValue;
        if(search){
          let arr = []
          this.tableTitle.forEach(e => {
              if(e.name)
              arr.push(e.name)
          });
          return  this.tableData.filter(function(dataNews){
            return Object.keys(dataNews).some(function(key){
              return String(dataNews[key]).toLowerCase().indexOf(search) > -1 && String(arr).indexOf(key)>-1
            })
          })
        }
        return this.tableData
      }
    }
  }
</script>
