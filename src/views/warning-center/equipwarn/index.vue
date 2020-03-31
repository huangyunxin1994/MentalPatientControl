<template>
    <el-container class="Equipwarn-container">
      
          <my-table :tableTitle="tableTitle"></my-table>
        
    </el-container>
</template>

<script>
import  myTable  from '@/components/table/table'
export default {
  name: 'Equipwarn',
  components:{
    myTable
  },
  data(){
    return{
      tableTitle:[
            { title : "报警类型", name : "name", width : "120", type : "name" },
            { title : "设备名", name : "endTime", minwidth : "150", type : "equip"},
            { title : "设备号", name : "duration", width : "120", type : "input" },
            { title : "设备类型", name : "reason", minwidth : "150", type : "input" },
            { title : "关联人员", name : "approvalResult", width : "120", type : "input" },
            { title : "报警时间", name : "reason", minwidth : "150", type : "input" },
            { title : "处理完成时间", name : "approvalResult", width : "150", type : "input" },
            { title : "处理结果", name : "unsuccessfulReasons", minwidth : "150", type : "input" },
            { title : "处理记录", name : "approvalResult", width : "120", type : "input" },
            { title : "处理人", name : "unsuccessfulReasons", minwidth : "150", type : "input" },
            { title : "操作",width : "150", type : "handle",button:[{name:"处理",type:"edit"},{name:"删除",type:"remove"}] }
        ],
    }
  },
    methods: {
     
    }
}
</script>
<style lang="scss" scoped>
.Equipwarn {
  &-container {
    width: 100%;
    height: 100%;
    position: relative;
  }
}
</style>
