<template>
    <el-container class="plansetting-container">
        <el-header>
      <breadcrumb></breadcrumb>
      </el-header>

          <div style="width:20%;padding-top:1vh;padding-left:20px">
                  <el-input v-model="inputVal" @input="filterData"></el-input>
            </div>
            <div style="width:20%;padding-top:1vh;padding-left:20px">
                  <el-button type="primary" @click="handleInsert">添加预案</el-button>
            </div>
            <el-main>
          <el-scrollbar style="height:100%;">

          <div class="planset" v-for="(item,index) in filterArr" :key="index">
            <el-scrollbar style="height:100%;">
            <div class="planset-content">
              <div class="planset-name">
                <span class="planset-label">预案名称:</span>
                <span>{{item.name}}</span>
              </div>
            </div>
            <div  v-for="(ite,index) in item.alertConditions" :key="index">
              <div class="planset-content" v-if="ite.alertId=='1'">
                <span class="planset-span"><span class="planset-label">预警类型:</span><span class="planset-item">{{ite.alertId | capitalize}}</span></span>
                <span class="planset-date"><span class="planset-label">时间段:</span><span class="planset-item">{{ite.startTime}}<span>至</span>{{ite.endTime}}</span></span>
                <span class="planset-span"><span class="planset-label">行为:</span><span class="planset-item">{{ite.averageAlert}}</span></span>
                <span class="planset-span"><span class="planset-label">大于等于:</span><span class="planset-item">{{ite.achieveAlert}}小时</span></span>
              </div>
              <div class="planset-content" v-else-if="ite.alertId=='2'">
                <span class="planset-span"><span class="planset-label">预警类型:</span><span class="planset-item">{{ite.alertId | capitalize}}</span></span>
                <span class="planset-date"><span class="planset-label">时间段:</span><span class="planset-item">{{ite.startTime}}<span>至</span>{{ite.endTime}}</span></span>
                <span class="planset-span"><span class="planset-label">活动次数:</span><span class="planset-item">{{ite.achieveAlert}} 次</span></span>
              </div>

              <div class="planset-content" v-else-if="ite.alertId=='3'">
                <span class="planset-span"><span class="planset-label">预警类型:</span><span class="planset-item">{{ite.alertId | capitalize}}</span></span>
                <span class="planset-date"><span class="planset-label">时间段:</span><span class="planset-item">{{ite.startTime}}<span>至</span>{{ite.endTime}}</span></span>
                <span class="planset-span"><span class="planset-label">频率大于等于:</span><span class="planset-item">{{ite.achieveAlert}} 次</span></span>
              </div>
              <div class="planset-content" v-else-if="ite.alertId=='4'">
                <span class="planset-span"><span class="planset-label">预警类型:</span><span class="planset-item">{{ite.alertId | capitalize}}</span></span>
                <span class="planset-date"><span class="planset-label">时间段:</span><span class="planset-item">{{ite.startTime}}<span>至</span>{{ite.endTime}}</span></span>
                <span class="planset-span"><span class="planset-label">时长大于等于:</span><span class="planset-item">{{ite.achieveAlert}} 分</span></span>
              </div>
              <div class="planset-content" v-else-if="ite.alertId=='5'">
                <span class="planset-span"><span class="planset-label">预警类型:</span><span class="planset-item">{{ite.alertId | capitalize}}</span></span>
                <span class="planset-date"><span class="planset-label">时间段:</span><span class="planset-item">{{ite.startTime}}<span>至</span>{{ite.endTime}}</span></span>
                <span class="planset-span"><span class="planset-label">值:</span><span class="planset-item">{{ite.averageAlert}}</span></span>
                <span class="planset-span"><span class="planset-item">{{ite.achieveAlert}}</span><span class="planset-label">次/每分</span></span>
              </div>
              <div class="planset-content" v-else-if="ite.alertId=='6'">
                <span class="planset-span"><span class="planset-label">预警类型:</span><span class="planset-item">{{ite.alertId | capitalize}}</span></span>
                <span class="planset-date"><span class="planset-label">时间段:</span><span class="planset-item">{{ite.startTime}}<span>至</span>{{ite.endTime}}</span></span>
                <span class="planset-span"><span class="planset-label">值:</span><span class="planset-item">{{ite.averageAlert}}</span></span>
              </div>

            </div>
            <div class="planset-icon">

                <el-button type="danger" icon="el-icon-delete" size="mini"  @click="handleRemove(index)">删除</el-button>
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(index)">编辑</el-button>
                <el-button type="info" icon="el-icon-user" size="mini"  @click="setUser(index)">关联患者</el-button>
              </div>

            </el-scrollbar>
          </div>

          </el-scrollbar>
          <my-dialog ref="dialog" :submitType="submitType" @getPlanQueryData="getPlanQueryData"></my-dialog>
          <my-transfer ref="transfer" @selectElec="getPlanQueryData"></my-transfer>
          <!-- @insertData="insertData" @updateData="updateData" -->
      </el-main>


    </el-container>
</template>
<script>
import breadcrumb from "@/components/Breadcrumb/index"
import myDialog from '@/components/dialog-planset/dialog'
import myTransfer from '@/components/dialog-planset/dialog-user'
import { getPlanQueryData,deleteReservePlan } from '@/api/table'
  export default {
    name: 'Plansetting',
    filters: {
      capitalize: function (value) {
         console.log(value)
        if (!value) return ''
        value = value.toString()

       if(value==="1") return '是否睡眠'
       else if(value==="2") return '睡眠质量'
       else if(value==="3") return '活动频率'
       else if(value==="4") return '活动时长'
       else if(value==="5") return '心率'
       else if(value==="6") return '血压'
       else return value
      }
    },
    components:{
        breadcrumb,
        myDialog,
        myTransfer
    },
    data() {
      return {
        arr:[],
        submitType:"",
        inputVal:"",
        filterArr:[]
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleInsert(){
        this.submitType="insert"
        this.$refs.dialog.handleShow("insert");
      },
      handleEdit(i){
        this.submitType="update"
        let para = Object.assign({}, this.arr[i])
        this.$refs.dialog.form=JSON.parse(JSON.stringify(para))
        this.$refs.dialog.handleShow("update");
      },
      handleRemove(i){
        this.$confirm('确认删除该记录吗?', '提示', {
				    type: 'warning'
        }).then(() => {
          let id = this.arr[i].id
          deleteReservePlan({id:id}).then(res=>{
            if(res.code==0){
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.getPlanQueryData()
            }else{
              this.$message({
                message: '删除失败',
                type: 'error'
              });
            }
          }).catch(err=>{

          })
        }).catch(err=>{

        })

      },
      setUser(i){
        console.log(i)
        let row = this.arr[i]
        this.$refs.transfer.handleShow(row)
      },
      getPlanQueryData(){
        getPlanQueryData().then((res)=>{
          if(res.code==0){
            console.log(res.data.data)
            let data = res.data.data;
            let arr = [];
            for(let i in data){
              let para = data[i].ReservePlan
              para.userList = data[i].userList
              para.alertConditions = data[i].AlertConditionList
              arr.push(para)

            }
            this.arr = arr
            this.filterArr = arr
            console.log(arr)
          }
        }).catch((err)=>{

        })
      },
      filterData(val){
        let arr = this.arr.filter(item=>{
          if (!val) return true;
          return item.name.indexOf(val) !== -1;
        })
        this.filterArr=arr
      }
    },
    mounted(){
      this.getPlanQueryData()
    }

  }
</script>

<style lang="scss" scoped>
.plansetting {
  &-container {
    width: 100%;
    height: 100%;
    .planset{
      width: 100%;
      padding: 1vw;
      margin: 2vh 0;;
      border:1px solid #dcdfe6;
      border-radius: 0.5vw;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      font-size: 0.8vw;
      
      &-icon{
        display: flex;
        flex-direction: row-reverse;
        .el-button{
          margin-left: 1vw;
          width: 100px;
        }
      }
      &-label{
        font-weight:bold ;
        color: #606266;
        display: inline-block;
        margin-right: 0.7vw;
      }
      &-name{
        font-size: 1vw;
      }
      &-content{
        width: 100%;
        padding: 1vh;
        display: flex;
          justify-content: left;
          align-items: center;
      }
      &-span{
        display: inline-block;
        width: 15vw;
        min-width: 180px;
        margin-right: 5vw;
         display: flex;
          justify-content: space-between;
          align-items: center;
        .planset-label{
          min-width: 90px;
        }
        .planset-item{
          display: inline-block;
          padding: 0.7vw;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 8vw;
          min-width: 100px;
           display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      &-date{
        display: inline-block;
         width: 15vw;
         min-width: 170px;
         margin-right: 5vw;
          display: flex;
          justify-content: space-between;
          align-items: center;

         .planset-item{
         // display: inline-block;
          padding: 0.7vw;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 10vw;
          min-width: 100px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }
}
</style>
