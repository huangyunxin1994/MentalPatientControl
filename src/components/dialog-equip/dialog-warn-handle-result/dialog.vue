<template>
  <el-dialog title="填写处理结果" :visible.sync="dialogHandleResult" center :append-to-body='true' :lock-scroll="false" width="30%">
  <div class="warnList">
    <div class="warnResultLeft">
      <p>处理结果</p>
    </div>
    <div class="warnResultRight">
      <el-input
        type="textarea"
        placeholder="请输入内容"
        :autosize="{ minRows: 6, maxRows: 4}"
        v-model="textarea">
      </el-input>
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
  import { changeEquipData } from '@/api/table'
  import store from "@/store"
  export default{
    props:['message'],
    data() {
      return {
        dialogHandleResult:false,
        changeDataResult:'',
        textarea: ''
      }
    },
    methods:{
      cancel(){
        // this.$emit('dialog','1')
        this.dialogHandleResult = false
      },
      sureBtn(){
        console.log(this.textarea)
        if(this.textarea!=""){
            this.$confirm('确认提交处理结果吗？', '提示', {}).then(() => {
            this.changeDataResult.processingResult = 3
            changeEquipData({
              id:this.changeDataResult.id,
              //处理记录
              handleRecord:this.textarea,
              processingResult:this.changeDataResult.processingResult
            }).then(res =>{
              if(res.code==0){
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                console.log('处理结果填写成功')
                this.dialogHandleResult = false
                this.$emit("cancel")
                store.dispatch('user/getWarnNum')
                console.log(res)
              }else{
                this.$message({
                  message: '提交时出现错误',
                  type: 'error'
                });
              }
            
            }).catch(err=>{
              this.$message({
                  message: '提交时出现错误',
                  type: 'error'
                });
            })
          })
        }else{
          this.$message({
            message: '请填写处理结果',
            type: 'error'
          });
        }
        
      },
      getDandleResultShow(val){
        // this.changeData = val
        this.dialogHandleResult = true
        this.changeDataResult = val
        console.log(this.changeDataResult)
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
    width: 15vw;
  }
  .warnResultRight{
    width: 85vw;
  }



  .cancelSwrap{
    width: 100%;
  }
  .cancel{
    display: flex;
    justify-content: space-around;
    width: 340px;
    margin: 20px auto 0px;
  }
  .sureBtn{
    background: rgba(0, 153, 255, 1);
    color: white;
    width: 110px;
    height: 40px;
    border-radius: 3px;
    border: 1px solid transparent;
    outline: none;
  }
  .cancelBtn{
    width: 110px;
    height: 40px;
    border: 1px solid rgb(204, 204, 204);
    color: rgb(153, 153, 153);
    border-radius: 3px;
    background-color: white;
  }
</style>
