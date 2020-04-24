<template>
    <el-container class="electricfence-container">
      <el-row>
         <el-col :span="6" class="electricfence-tree">
            <el-input placeholder="请输入内容" suffix-icon="el-icon-search" v-model="inputVal" @input="filterData"></el-input>
            <el-divider></el-divider>
            <el-collapse v-model="activeNames" :accordion="true" @change="collapseChange">
            <el-collapse-item name="1" >
                <template slot="title">
                    <div class="electricfence-collapse">
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;电子围栏</span>
                    </div>
                </template>
                 <el-scrollbar id="elec-main" class="electricfence-scrollbar">
                <div :id="'elec-'+index" v-for="(item,index) in filterArr" :key="index" class="electricfence-collapse-item" :class="{'collapse-item-select':enterShowIndex == index}" @click="enterShow(index)">
                    <el-link :underline="false">{{item.name}}</el-link>
                    <div class="electricfence-collapse-item-button">
                        <el-button type="info" icon="el-icon-s-custom" circle size="mini" @click.stop="setUserIn(index)"></el-button>
                        <el-button type="primary" icon="el-icon-edit" circle size="mini" @click.stop="editElec(index)"></el-button>
                    </div>
                </div>
                 </el-scrollbar>
            </el-collapse-item>
            
            </el-collapse>
        </el-col>
        <el-col :span="18" class="electricfence-map">
            <mymap @getElec="getElec" ref="map"></mymap>
            <div class="electricfence-map-button">
                <el-button type="danger" @click="openElecAddMap()">添加电子围栏</el-button>
            </div>
        </el-col>
      </el-row>
      <dialog-map ref="dialogmap" @selectElec="selectElec"></dialog-map>
      <dialog-map-e ref="dialogmape" @selectElec="selectElec"></dialog-map-e>
      <my-transfer ref="transfer" @selectElec="selectElec"></my-transfer>
    </el-container>
    
</template>

<script>
import  mymap  from '@/components/map-elec/map'
import  dialogMap  from '@/components/dialog-elec/dialog-map'
import  dialogMapE  from '@/components/dialog-elec/dialog-map-edit'
import  myTransfer from '@/components/dialog-elec/dialog-user'
import { deleteElectronicFence,selectElectronicFenceQuery} from  "@/api/table"
export default {
  name: 'Electricfence',
  components:{
    mymap,
    dialogMap,
    dialogMapE,
    myTransfer
  },
  data(){
    return{
      inputVal:"",
      activeNames:"1",
      enterElecArr:[],
      leaveElecArr:[],
      enterShowIndex:-1,
      leaveShowIndex:-1,
      type:"",
      electricFenceArr:[],
      filterArr:[]
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
      },
      openElecAddMap(){
        this.$refs.dialogmap.handleShow()
      },
      enterShow(i){
        this.enterShowIndex=i
        this.$refs.map.movePosBypoint(this.filterArr[i].longitude,this.filterArr[i].latitude)   
      },
      setUserIn(i){
        console.log(i)
        let row = this.filterArr[i]
        this.$refs.transfer.handleShow(row)
      },
      editElec(i){
        let id = this.filterArr[i].id
        let para = JSON.parse(JSON.stringify(this.filterArr[i]))
        this.$refs.dialogmape.form = para
        this.$refs.dialogmape.handleShow()
        // this.$confirm('确认删除吗？', '提示', {}).then(() => {
        //     deleteElectronicFence({id:id}).then((res)=>{
        //         if(res.code==0){
        //             this.$message({
        //                 message: '删除成功',
        //                 type: 'success'
        //             });
        //             this.selectElec()
        //         }else{
        //             this.$message({
        //                 message: '删除成功',
        //                 type: 'error'
        //             });
        //         }
        //     }).catch(err=>{
        //         this.$message({
        //             message: '删除成功',
        //             type: 'error'
        //         });
        //     })
        // }); 
      },
      selectElec(){
        selectElectronicFenceQuery().then(res=>{
          if(res.code==0){
            console.log(res)
            let data = res.data.data
            console.log(data)
            let arr1=[]
            for(let i in data){
              let o = data[i].electronicFence;
              o.userList = data[i].userList
              arr1.push(o)
            }
            console.log(arr1)
            this.enterElecArr=arr1;
            this.filterArr=arr1
            this.$refs.map.getmap(arr1);
            
          }
        }).catch(res=>{

        })
      },
      getElec(i){
        this.enterShowIndex=i
        let selector = "#elec-"+i
        this.inputVal=""
        this.filterArr=JSON.parse(JSON.stringify(this.enterElecArr))
        setTimeout(()=>{
          this.$el.querySelector(selector).scrollIntoView()
        },0)
        
      },
      filterData(val){
        let arr = this.enterElecArr.filter(item=>{
          if (!val) return true;
          return item.name.indexOf(val) !== -1;
        })
        this.filterArr=arr
      }
    },
    mounted(){
      this.selectElec()
    }
}
</script>
<style lang="scss" >
.el-collapse-item__wrap{
       height: calc(100% - 48px);  
       .el-collapse-item__content{
         height: 100%;
         padding-bottom: 0;
       }         
}
</style>
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
           height: calc(99% - 88px) ;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            .el-collapse-item{
               height: 100%;
               
              .electricfence-scrollbar{
              height: 100%;
            }
            }
            
        }
        .collapse-item-select{
            border-left:5px solid #409EFF;
            padding: 10px 10px 10px 45px ;
            .el-link{
                color: #409eff;
                
            }
        }
        .electricfence-collapse-item{
          .el-link{
                font-size: 0.7vw;
                white-space : nowrap
            }
          &-button{
            min-width: 73px;
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
      font-size: 0.8vw;
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
