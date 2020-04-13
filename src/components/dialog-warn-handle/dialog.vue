<template>
  <div>
    <el-dialog title="处理预警" :visible.sync="dialogHandleVisible" center :append-to-body='true' :lock-scroll="false" width="30%">
    <div class="warnList">
       <el-row class="btnClass">
         <el-button type="" :class="{'handleBtn':true,'btnActive':btnNum===1}" @click="ignore">忽略</el-button>
       </el-row>
       <el-row class="btnClass">
         <el-button type="" :class="{'handleBtn':true,'btnActive':btnNum===2}" @click="startHandle">开始处理</el-button>
       </el-row>
       <el-row class="btnClass">
         <el-button type="" :class="{'handleBtn':true,'btnActive':btnNum===3}" @click="writeResult">填写处理结果</el-button>
       </el-row>

      <el-row class="cancelSwrap">
        <div class="cancel">
          <button @click="cancel" class="cancelBtn">取消</button>
          <button @click="cancel" class="sureBtn">确定</button>
        </div>
      </el-row>
    </div>
    </el-dialog>
    <dialog-warn-handle-result ref = 'showResult'></dialog-warn-handle-result>
  </div>
</template>

<script>
  import { getPerSe , getWarnListData , changeWarnData } from '@/api/table'
  import dialogWarnHandleResult from '@/components/dialog-warn-handle-result/dialog'

  export default{
    props:['message'],
    components:{
      dialogWarnHandleResult
    },
    data() {
      return {
        dialogHandleVisible:false,
        data:false,
        btnNum:3,
        changeData:''
      }
    },
    methods:{
      cancel(){
        // this.$emit('dialog','1')
        this.dialogHandleVisible = false
      },
      getDandleShow(val){
        console.log('-------------'+val+'-----------------------')
        this.changeData = val
        console.log(this.changeData.id)
        this.dialogHandleVisible = true
      },
      //点击忽略按钮
      ignore(){
        this.btnNum = 1
        this.changeData.processingResult = 4
        changeWarnData({
          id:this.changeData.id,
          processingResult:this.changeData.processingResult
        }).then(res =>{
          console.log('忽略成功')
          console.log(res)
        })
      },
      //点击开始处理按钮
      startHandle(){
        this.btnNum = 2
        this.changeData.processingResult = 1
        changeWarnData({
          id:this.changeData.id,
          processingResult:this.changeData.processingResult
        }).then(res =>{
          console.log('开始处理成功')
          console.log(res)
        })
      },
      //点击填写处理结果按钮
      writeResult(){
        this.btnNum = 3
        this.$refs.showResult.getDandleResultShow(this.changeData)
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
  .btnClass{
    width: 120px;
    margin: 20px auto;
  }
  .handleBtn{
    width: 126px !important;
  }
  .cancelSwrap{
    width: 100%;
  }
  /* 点击按钮时,当前的按钮变色 */
  .btnActive{
    background-color: rgba(0, 153, 255, 1);
    color: white;
  }
  .cancel{
    display: flex;
    justify-content: space-around;
    width: 340px;
    margin: 20px auto 0px;
  }
  .sureBtn{
    width: 110px;
    height: 40px;
    border: 1px solid rgb(204, 204, 204);
    color: rgb(153, 153, 153);
    border-radius: 3px;
    background-color: white;
  }
  .cancelBtn{
    background: rgba(0, 153, 255, 1);
    color: white;
    width: 110px;
    height: 40px;
    border-radius: 3px;
    border: 1px solid transparent;
    outline: none;
  }
</style>
