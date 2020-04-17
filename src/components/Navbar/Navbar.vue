<template>
<div class="app-wrapper">
  <div class="navbar">
    <!-- <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->

    <!-- <breadcrumb class="breadcrumb-container" /> -->
    <div class="left-menu">
      <div class="navbar-titles">
        <i class="navbar-icon el-icon-menu" @click="enterBulletin"></i> 
        <span class="navbar-title">&nbsp;特殊人群辅助管理系统</span>
      </div>
      <div class="navbar-div">
        <router-link to="/dashboard" tag="span" class="navbar-tab">
            首页
        </router-link>
        <router-link to="/personstate"  tag="span" class="navbar-tab" v-if="menuData.indexOf('8')!=-1">
            人员状态
        </router-link>
        <router-link to="/warningcenter" tag="span" class="navbar-tab" v-if="menuData.indexOf('9')!=-1">
            预警中心
        </router-link>
        <router-link to="/techniquetactics" tag="span" class="navbar-tab" v-if="menuData.indexOf('10')!=-1">
            技战法
        </router-link>
      </div>
    </div>
    <div class="right-menu">
      <el-tooltip class="item" effect="dark" content="去管理端" placement="bottom-start" v-if="menuData.indexOf('3')!=-1||menuData.indexOf('4')!=-1||menuData.indexOf('5')!=-1||menuData.indexOf('6')!=-1||menuData.indexOf('11')!=-1">
        <router-link tag="i" to="/manage" class="navbar-message el-icon-s-tools" v-if="menuData.indexOf('3')!=-1"></router-link> 
        <router-link tag="i" to="/manage/rolemanage" class="navbar-message el-icon-s-tools" v-else-if="menuData.indexOf('11')!=-1"></router-link> 
        <router-link tag="i" to="/manage/usermanage" class="navbar-message el-icon-s-tools" v-else-if="menuData.indexOf('4')!=-1"></router-link> 
        <router-link tag="i" to="/manage/equipmanage" class="navbar-message el-icon-s-tools" v-else-if="menuData.indexOf('5')!=-1"></router-link> 
        <router-link tag="i" to="/manage/keypersonmanage" class="navbar-message el-icon-s-tools" v-else-if="menuData.indexOf('6')!=-1"></router-link> 
      </el-tooltip>
      
      <el-badge :value="warnNum" class="item" v-if="warnNum>0">
        <router-link tag="i" to="/warningcenter" class="navbar-message el-icon-message-solid" ></router-link> 
      </el-badge>
      <router-link v-else tag="i" to="/warningcenter" class="navbar-message el-icon-message-solid" ></router-link> 
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <span v-text="name"  class="user-name"></span>
        </div>
        
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              回到首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
      
        <!-- <Navbar></Navbar> -->
       
    </div>
     <section class="app-main">
        <transition name="fade-transform" mode="out-in">
          <router-view />
        </transition>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { selectCount} from '@/api/table'
import { getMenuData } from "@/utils/auth"
export default {
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'warnNum',
      'name'
    ]),
    key() {
      return this.$route.path
    }
  },
  data(){
    return{
      menuData:[]
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    },
    enterBulletin(){
       this.$router.push({ path: '/bulletinboard' })
    },
    getMenu(){
      let arr = JSON.parse(getMenuData())
      for(let i in arr )
      this.menuData.push(arr[i].menuId)
      console.log(this.menuData)
    }
  },
  mounted(){
    this.getMenu()
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /*50 = navbar  */
  height: calc(100vh - 10vh);
  width: 100%;
  position: relative;
  top: 10vh;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss" scoped>
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
.navbar {
  height: 10vh;
  width: 100%;
  overflow: hidden;
  position: fixed;
  background: rgba(2, 125, 180, 0.988235294117647);
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  z-index: 1001;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;
    

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }
  .left-menu{
    width: 60%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 2vw;
    .navbar-titles{
      padding-left: 2vw;
      display: flex;
      align-items: center;
      .navbar-icon{
      font-size: 2vw;
      color: white;
      }
      .navbar-title{
      font-size: 1.8vw;
      font-weight: bold;
      color: #fff;
      }
    }
    
  .navbar-div{
    width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .navbar-tab{
      font-size: 1.2vw;
      font-weight: bold;
      color: #ccc;
      cursor: pointer;
    }
    .router-link-active{
    color: #fff;
  }
  }
  
  }
  
  .right-menu {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 2vw;
    &:focus {
      outline: none;
    }
    .navbar-message{
      font-size: 2vw;
      color: white;
      cursor: pointer;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 1vw;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 1vw;

      .avatar-wrapper {
        margin-top: 0.5vh;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .user-avatar {
          cursor: pointer;
          width: 2vw;
          height: 2vw;
          border-radius: 0.5vw;
        }
        .user-name{
          font-size: 0.9vw;
          color: white;
          font-weight: bold;
          margin-left: 0.5vw;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.mobile{
  .left-menu{
    padding-left: 10px;
    width: 80% !important;
    .navbar-title{
    display: none;
    }
    .navbar-div{
      width: 80% !important;
      .navbar-tab{
        font-size: 14px;
        
      }
    }

  }
  .right-menu{
    width: 100px !important;
    .user-avatar {
          width: 20px !important;
          height: 20px !important;
          border-radius: 2px !important;
     }
  }
  i{
    font-size: 20px !important;
  }
  
}
</style>
