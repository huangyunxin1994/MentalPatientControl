<template>
  <div id="app">
    <transition name="fade-transform" mode="out-in">
        <router-view />
      </transition>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar/Navbar'
import ResizeMixin from '@/utils/mixin/ResizeHandler'
export default {
  name: 'App',
  components:{
    Navbar
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>
<style scoped>
.app-main {
  /*50 = navbar  */
  height: calc(100vh - 100px);
  width: 100%;
  position: relative;
  top: 100px;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>