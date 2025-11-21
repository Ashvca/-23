<template>
  <div class="layout-container">
    <top-nav class="topNavClass" />
    <app-main
      :style="{
        width: topMenu
          ? '100%'
          : 'calc(100% - ${$settings.layout.leftMenuWidth}px)',
      }"
    />
  </div>
</template>

<script>
import { TopNav, NavMenu, AppMain } from './components'
import { MenuMode } from '@/settings.js'

export default {
  name: 'Layout',
  components: {
    TopNav,
    NavMenu,
    AppMain,
  },
  data() {
    return {
      topMenu: this.$settings.layout.menuMode === MenuMode.Top ? true : false,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~theme/index.scss';
.layout-container {
  height: 100%;
  background-color: #000;
  /* background: $bgColor; */
  .app-main {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .topNavClass {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #00000066;
    z-index: 1;
  }
}
</style>
