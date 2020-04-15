<template>
  <div id="app">
    <transition name="fade-transform" mode="out-in">
        <router-view />
      </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
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