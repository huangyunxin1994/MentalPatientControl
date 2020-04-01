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
        <router-link to="/manage/organmanage" tag="span" class="navbar-tab">
            组织管理
        </router-link>
        <router-link to="/manage/rolemanage"  tag="span" class="navbar-tab">
            角色管理
        </router-link>
        <router-link to="/manage/usermanage" tag="span" class="navbar-tab">
            用户管理
        </router-link>
        <router-link to="/manage/equipmanage" tag="span" class="navbar-tab">
            设备管理
        </router-link>
        <router-link to="/manage/keypersonmanage" tag="span" class="navbar-tab">
            重点人员管理
        </router-link>
      </div>
    </div>
    <div class="right-menu">
      <el-tooltip class="item" effect="dark" content="去操作端" placement="bottom-start">
        <router-link tag="i" to="/" class="navbar-message el-icon-s-tools" ></router-link> 
      </el-tooltip>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          
        </div>
        
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
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

export default {
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ]),
    key() {
      return this.$route.path
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
    }
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
    width: 10%;
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

        .user-avatar {
          cursor: pointer;
          width: 2vw;
          height: 2vw;
          border-radius: 0.5vw;
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
