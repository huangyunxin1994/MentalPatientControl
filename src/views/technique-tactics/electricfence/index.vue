<template>
    <el-container class="electricfence-container">
      <el-row>
         <el-col :span="6" class="electricfence-tree">
            <el-input placeholder="请输入内容" suffix-icon="el-icon-search"></el-input>
            <el-divider></el-divider>
            <el-collapse :accordion="true" @change="collapseChange">
            <el-collapse-item name="1">
                <template slot="title">
                    <div class="electricfence-collapse">
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;进入预警围栏</span>
                    </div>
                </template>
                <div v-for="(item,index) in enterElecArr" :key="index" class="electricfence-collapse-item" :class="{'collapse-item-select':enterShowIndex == index}" @click="enterShowIndex = index">
                    <el-link :underline="false">{{item.name}}</el-link>
                    <div>
                        <el-button type="primary" icon="el-icon-s-custom" circle size="mini"></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle size="mini"></el-button>
                    </div>
                </div>
            </el-collapse-item>
            <el-collapse-item name="2">
                <template slot="title">
                    <div class="electricfence-collapse">
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;外出预警围栏</span>
                    </div>
                </template>
                <div v-for="(item,index) in leaveElecArr" :key="index" class="electricfence-collapse-item" :class="{'collapse-item-select':leaveShowIndex == index}" @click="leaveShowIndex = index">
                    <el-link :underline="false">{{item.name}}</el-link>
                    <div>
                        <el-button type="primary" icon="el-icon-s-custom" circle size="mini"></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle size="mini"></el-button>
                    </div>
                </div>
            </el-collapse-item>
            
            </el-collapse>
        </el-col>
        <el-col :span="18" class="electricfence-map">
            <mymap></mymap>
            <div class="electricfence-map-button">
                <el-button type="primary">添加进入预警围栏</el-button>
                <el-button type="primary">添加外出预警围栏</el-button>
            </div>
        </el-col>
      </el-row>
    </el-container>
</template>

<script>
import  mymap  from '@/components/map/map'
export default {
  name: 'Electricfence',
  components:{
    mymap
  },
  data(){
    return{
      enterElecArr:[
        {name:"月弯路小学围栏",id:"1"},
        {name:"凤翔路小学围栏",id:"2"},
        {name:"邕武路小学围栏",id:"3"}
      ],
      leaveElecArr:[
        {name:"月弯路小学围栏",id:"1"},
        {name:"凤翔路小学围栏",id:"2"},
        {name:"邕武路小学围栏",id:"3"}
      ],
      enterShowIndex:-1,
      leaveShowIndex:-1,
    }
  },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      getLocation(id){
        console.log(id)
      },
      getDetails(id){
         console.log(id)
      },
      collapseChange(activeNames){
          console.log(activeNames)
          this.enterShowIndex=-1
          this.leaveShowIndex=-1
      }
    }
}
</script>
<style lang="scss" scoped>
.electricfence {
  &-container {
    width: 100%;
    height: 100%;
    position: relative;
    .el-row {
    width: 100%;
    height: 100% ;
    overflow: hidden;
      .el-col {
      height: 100%;
      overflow: hidden;
      
      }
      .electricfence-tree{
        background-color: rgb(233, 233, 235);
        padding: 1%;
        
        .el-input{
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
        }
        .el-collapse{
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
        }
        .collapse-item-select{
            border-left:5px solid #409EFF;
            padding: 10px 10px 10px 45px ;
            .el-link{
                color: #409eff;
            }
        }
      }
      .electricfence-map{
          position: relative;
          &-button{
              position: absolute;
              right: 5%;
              top: 5%;
          }
      }
    }
  }
  &-collapse{
      width: 100%;
      padding: 0 20px;
      font-size: 15px;
      font-weight: bold;
      span{
          border-left: 5px solid #409EFF;
      }
      &-item{
         width: 100%;
         padding: 10px 10px 10px 50px ; 
         display: flex;
         justify-content: space-between;
         align-items: center;
         cursor: pointer;
      } 
  }
  
}
</style>
