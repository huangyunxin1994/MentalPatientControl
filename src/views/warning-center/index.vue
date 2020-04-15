<template>
    <el-container class="warningcenter-container">
                <el-row>
                  <el-col :span="3">
                    <el-scrollbar style="height:100%;background-color: rgb(244, 244, 245)">
                    <el-menu
                      default-active="1"
                      class="el-menu-vertical-demo"
                      @open="handleOpen"
                      @close="handleClose"
                      background-color="#e6e6e6">

                        <router-link to="/warningcenter/personwarn">

                          <el-menu-item index="1"  class="warningcenter-level1">
                            <el-badge :value="pCount" class="item" v-if="pCount>0">
                              人员预警
                              </el-badge>
                              <span v-else class="item">
                                人员预警
                              </span>
                              </el-menu-item>

                          </router-link>


                        <router-link to="/warningcenter/equipwarn">

                          <el-menu-item index="2"  class="warningcenter-level1">
                            <el-badge :value="eCount" class="item" v-if="eCount>0">
                              设备预警
                              </el-badge>
                              <span v-else class="item">
                                设备预警
                              </span>
                          </el-menu-item>

                         </router-link>

                    </el-menu>
                    </el-scrollbar>
                  </el-col>
                  <el-col :span="21">
                    <transition name="fade-transform" mode="out-in">
                        <router-view></router-view>
                    </transition>
                    </el-col>
                </el-row>
    </el-container>
</template>

<script>
import { selectCount } from "@/api/table"
export default {
  name: 'techniquetactics',
  data(){
    return{
      pCount:0,
      eCount:0
    }
  },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      selectCount(){
        selectCount().then(res=>{
          this.eCount=res.data.eCount
          this.pCount=res.data.pCount
        })
      }
    },
    mounted(){
      this.selectCount()
    }
}
</script>
<style lang="scss">
.warningcenter-level1{
  .el-badge__content--undefined{
      top:15px;
      right: 0;
    }
}
</style>
<style lang="scss" scoped>
.warningcenter {
  &-container{
    width: 100%;
    height: 100%;
    .el-row {
    width: 100%;
    height: 100% ;
    overflow: hidden;
      .el-col {
      height: 100%;
      overflow: hidden;
      }
    }
  }
  &-level1{
    font-size: 0.9vw;
    font-weight: bold;
  }
}
</style>
