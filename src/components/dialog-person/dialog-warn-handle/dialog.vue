<template>
  <div @changeData = "getWarnData">
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

    </div>
    </el-dialog>
    <dialog-warn-handle-result ref = 'showResult' @cancel="cancel"></dialog-warn-handle-result>
  </div>
</template>

<script>
  import { getPerSe , getWarnListData , changeWarnData } from '@/api/table'
  import store from "@/store"
  import dialogWarnHandleResult from '@/components/dialog-person/dialog-warn-handle-result/dialog'
  import { parseTime } from '@/utils/index.js'
  import {getUser} from '@/utils/auth'

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
        changeData:'',
        operationer:''
      }
    },
    methods:{
      cancel(){
        // this.$emit('dialog','1')
        this.dialogHandleVisible = false
        this.$emit('sendState',this.changeData.keyUserid)
      },
      getDandleShow(val){
        this.changeData = val
        console.log(this.changeData.id)
        this.dialogHandleVisible = true
        let bb = getUser()
        console.log(typeof(bb))
        bb = JSON.parse(bb)
        this.operationer = bb.name
      },
      //点击忽略按钮
      ignore(){
        this.$confirm('确认忽略该预警吗？', '提示', {}).then(() => {
          this.btnNum = 1
          this.changeData.processingResult = 4
          let nowData = parseTime(new Date())
          changeWarnData({
            id:this.changeData.id,
            processingResult:this.changeData.processingResult,
            handleUsername:this.operationer,
            handleTime:nowData
          }).then(res =>{
            if(res.code==0){
              this.$message({
                message: '忽略成功',
                type: 'success'
              });
              this.cancel()
              store.dispatch('user/getWarnNum')
            }else{
              this.$message({
                message: '忽略时出现错误',
                type: 'error'
              });
            }
          }).catch(err=>{
            this.$message({
                message: '忽略时出现异常',
                type: 'error'
              });
          })
        })
      },
      //点击开始处理按钮
      startHandle(){
        this.$confirm('确认开始处理该预警吗？', '提示', {}).then(() => {
          this.btnNum = 2
          this.changeData.processingResult = 1
          let nowData = parseTime(new Date())
          changeWarnData({
            id:this.changeData.id,
            processingResult:this.changeData.processingResult,
            handleUsername:this.operationer,
            handleTime:nowData
          }).then(res =>{
            if(res.code==0){
              this.$message({
                message: '开始处理成功',
                type: 'success'
              });
              this.cancel()
              store.dispatch('user/getWarnNum')
            }else{
              this.$message({
                message: '开始处理时出现错误',
                type: 'error'
              });
            }
          }).catch(res=>{
             this.$message({
                message: '开始处理时出现异常',
                type: 'error'
              });
          })
        })
      },
      //点击填写处理结果按钮
      writeResult(){
        this.btnNum = 3
        this.$refs.showResult.getDandleResultShow(this.changeData)
      },
      getWarnData(val){
        this.dialogHandleVisible = true
      }
    },
    created() {
      // getWarnListData()
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
</style>
