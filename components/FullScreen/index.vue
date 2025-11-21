<template>
  <div id="full-screen-container" :ref="ref">
    <template v-if="ready">
      <slot></slot>
    </template>
  </div>
</template>

<script>
import autoResize from '@/mixin/autoResize.js'

export default {
  name: 'FullScreenContainer',
  mixins: [autoResize],
  data() {
    return {
      ref: 'full-screen-container',
      allWidth: 0,
      allHeight: 0,
      scale: 0,
      root: '',
      ready: false,
    }
  },
  methods: {
    afterAutoResizeMixinInit() {
      const { initConfig, setAppScale } = this
      initConfig()
      setAppScale()
      this.ready = true
    },
    initConfig() {
      const { dom } = this
      // const { width, height } = this.$settings.layout.autoResize
      const width =
        this.$settings.layout.autoResize.width -
        (window.outerWidth - window.innerWidth)
      const height =
        this.$settings.layout.autoResize.height -
        (window.outerHeight - window.innerHeight)

      this.allWidth = width
      this.allHeight = height
      dom.style.width = `${width}px`
      dom.style.height = `${height}px`
    },
    setAppScale() {
      const { allWidth, allHeight, dom } = this
      // console.log(this)
      const currentWidth = document.body.clientWidth
      const currentHeight = document.body.clientHeight
      dom.style.transform = `scale(${currentWidth / allWidth}, ${
        currentHeight / allHeight
      })`
      // dom.style.transform = `scale( 1 , 1 )`
      // console.log(currentWidth / allWidth, currentWidth / allWidth)
      // console.log(currentHeight, allHeight, currentHeight / allHeight)
    },
    onResize() {
      const { setAppScale } = this
      setAppScale()
    },
  },
}
</script>

<style lang="scss">
#full-screen-container {
  position: fixed;
  top: 0px;
  left: 0px;
  overflow: hidden;
  transform-origin: left top;
  z-index: 999;
}
</style>
