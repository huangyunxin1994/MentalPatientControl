<template>
    <el-container class="tenchnique-container">
                <el-row>
                  <el-col :span="3" class="tenchnique-container-nav">
                    <el-scrollbar style="height:100%;background-color: rgb(244, 244, 245)">
                    <el-menu
                      default-active="1"
                      class="el-menu-vertical-demo"
                      @open="handleOpen"
                      @close="handleClose"
                      background-color="#e6e6e6">
                        <router-link to="/techniquetactics/electricfence">
                          <el-menu-item index="1"  class="tenchnique-level1">
                              电子围栏管理
                              </el-menu-item>
                          </router-link>
                      
                      <el-submenu index="2">
                        <template slot="title">
                          <span slot="title" class="tenchnique-level1">预警管理</span>
                        </template>
                        <router-link to="/techniquetactics/plansetting">
                          <el-menu-item index="2-1">
                              预案设置
                          </el-menu-item>
                         </router-link>
                         <router-link to="/techniquetactics/earlywarning">
                          <el-menu-item index="2-2">
                            <span slot="title">预警关联</span>
                          </el-menu-item>
                         </router-link>
                      </el-submenu>
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
export default {
  name: 'techniquetactics',
  data(){
    return{
    }
  },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>
<style>
  .el-scrollbar__wrap{
      overflow-x:hidden !important;
    }
</style>
<style lang="scss" scoped>
.tenchnique {
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
