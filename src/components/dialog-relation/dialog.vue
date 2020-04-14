<template>
  <el-dialog title="关联预案" :visible.sync="dialogHandleResult" center :append-to-body='true' :lock-scroll="false" width="30%">
  <div class="warnList">
    <div class="warnResultLeft">
      <p>选择预案</p>
    </div>
    <div class="warnResultRight">
      <el-select v-model="value" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
    </div>
  </div>
  <el-row class="cancelSwrap">
    <div class="cancel">
      <button @click="cancel" class="cancelBtn">取消</button>
      <button @click="sureBtn" class="sureBtn">确定</button>
    </div>
  </el-row>
  </el-dialog>
</template>

<script>
  import {relationReservePlan} from '@/api/table'

  export default{
    data() {
      return {
        dialogHandleResult:false,
        changeDataResult:'',
        textarea: '',
        options: [{
          value: 0,
          label: '重度预案'
        }, {
          value: 1,
          label: '轻度预案'
        }],
        value: ''
      }
    },
    methods:{
      cancel(){
        // this.$emit('dialog','1')
        this.dialogHandleResult = false
      },
      sureBtn(){
        this.dialogHandleResult = false
        this.relationReservePlan()
        console.log(this.value)
      },
      getDandleResultShow(val){
        // this.changeData = val
        this.dialogHandleResult = true
        this.changeDataResult = val
        console.log(this.changeDataResult)
      },
      relationReservePlan(){
        relationReservePlan({
          keyUserId:this.changeDataResult.id,
          planId:this.value,
          type:1
        }).then((res)=>{
          this.$message({
            message: '关联预案成功',
            type: 'success'
          });
          this.$emit('sendState',1)
        }).catch((err)=>{
          this.$message.error('关联预案失败');
        })
      }
    },
    created() {
      // getWarnListData()
    },
    mounted(){
      // console.log(this.warnData)
    }
  }

</script>

<style scoped="scoped">
  .warnList{
    display: flex;
    justify-content: space-around;
  }

  .warnResultLeft{
    width: 25vw;
    text-align: center;
    padding: 0px 10px;
  }
  .warnResultRight{
    width: 75vw;
  }



  .cancelSwrap{
    width: 100%;
  }
  .cancel{
    display: flex;
    justify-content: space-around;
    margin: 20px auto 0px;
  }
  .sureBtn{
    background: rgba(0, 153, 255, 1);
    color: white;
    width: 200px;
    height: 40px;
    border-radius: 3px;
    border: 1px solid transparent;
    outline: none;
  }
  .cancelBtn{
    width: 200px;
    height: 40px;
    border: 1px solid rgb(204, 204, 204);
    color: rgb(153, 153, 153);
    border-radius: 3px;
    background-color: white;
  }
</style>
