<template>
<section style="width: 100%;height:100%;padding:20px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
    <el-row :gutter="22" style="margin-bottom:20px;">
        <el-col :span="6">
            <el-input v-model="inputValue" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="2">
            <el-select v-model="value" filterable placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="2">
            <el-select v-model="value" filterable placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-col>
    </el-row>
    <el-table :data="tables" border stripe highlight-current-row v-loading="listLoading" @selection-change="selsChange" height="calc(100% - 100px)">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column v-for="(item,index) in tableTitle" :key="index" :prop="item.name" :label="item.title" :width="item.width" :min-width="item.minwidth" sortable>
            <template slot-scope="scope">
                <el-link type="primary" v-if="item.type=='link'" @click="userDetails(scope.$index, scope.row)" v-html="arrFormatter(scope.row[item.name],item.name)"></el-link>
                <!-- <el-link :type="scope.row[item.name] == 1 ? 'success' : value == 0 ? 'primary' : ''" v-else-if="item.type=='button'" @click="changeNoticeSates(scope.$index, scope.row)" v-html="arrFormatter(scope.row[item.name],item.name)"></el-link> -->
                <div v-else-if="item.type=='handle'">
                    <el-tooltip v-for="(item,index) in item.button" :key="index" :content="item.name" placement="top">
                      <el-button v-if="item.type=='edit'" type="primary" icon="el-icon-edit" size="small" circle  @click="handleEdit(scope.$index, scope.row)"></el-button>
                       <el-button v-else-if="item.type=='remove'" type="danger" icon="el-icon-delete" size="small" circle @click="handleRemove(scope.$index, scope.row)"></el-button>
                    </el-tooltip>
                </div>
                <el-button v-else-if="item.type=='button'" type="primary"  @click="handleEdit(scope.$index, scope.row)">选择人员</el-button>
                <p v-else :formatter="formatSex" v-html="arrFormatter(scope.row[item.name],item.name)"></p>
            </template>
        </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination background layout="prev, pager, next, jumper" @current-change="handleCurrentChange" :page-size="20" :total="0" style="float:right;">
      </el-pagination>
    </el-col>
</section>
  
</template>

<script>
  export default {
    props:{
        tableTitle:Array,
        tableData:Array
    },
    data() {
      return {
        listLoading:false,
        inputValue:"",
        sels:[],
        total: 0,
        page: 1,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
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
        selsChange: function (sels) {
          console.log(sels)
				  this.sels = sels;
        },
        arrFormatter (value,name) {
            if(name=='sex')
             return value == 1 ? '男' : value == 0 ? '女' : '';
            else if(name=='multiplexMark')
             return value == 1 ? '是' : value == 0 ? '否' : '';
            else if(name=='status')
             return value == 1 ? '<span style="color:#409EFF;font-weight:bold">启用</span>' : value == 2 ? '<span style="color:#E6A23C;font-weight:bold">停用</span>' : '';
            else if(name=='state')
             return value == 1 ? '<span style="color:#409EFF;font-weight:bold">启用</span>' : value == 0 ? '<span style="color:#E6A23C;font-weight:bold">停用</span>' : '';
            else if(name == 'ifRelease')
             return value == 1 ? '已发布' : value == 0 ? '发布' : '';
            else
             return value;
        },
        handleCurrentChange(val){
            console.log(val)
        },
        userDetails(index,row){
          this.$router.push({ path: '/persondetails' })
        },
        //编辑
        handleEdit(index,row){
          console.log(row)
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
        //批量删除
        batchRemove() {
            var ids = this.sels.map(item => item.id).toString();
            this.$confirm('确认删除选中记录吗？', '提示', {
              type: 'warning'
            }).then(() => {
              this.listLoading = true;
              //NProgress.start();
              let para = this.sels;
              console.log(para)
              this.$emit('bRemoveData',para)
              
            }).catch(() => {

            });
        },
    },
    computed:{
      tables:function(){
        var search=this.inputValue;
        console.log(search)
        if(search){
          return  this.tableData.filter(function(dataNews){
            return Object.keys(dataNews).some(function(key){
              return String(dataNews[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
        console.log(this.tableData)
        return this.tableData
      }
    }
  }
</script>
