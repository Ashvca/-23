<template>
  <!-- 3D轨迹展示 -->
  <div class="path-3d">
    <div ref="path" class="path"></div>
    <el-button
      size="mini"
      type="primary"
      class="theme-button"
      @click="handleReset"
      >重置相机</el-button
    >
  </div>
</template>

<script>
import { init, addPath, resetCamera } from './three/three'
export default {
  name: 'Path3D',
  props: {
    // 基线长度
    baseLine: {
      type: Number,
      default: 600,
    },
    // 相机位置
    cameraPostion: {
      type: Number,
      default: 350,
    },
  },
  data() {
    return {
      handle: {},
    }
  },
  // 初始化
  mounted() {
    const width = this.$refs.path.offsetWidth
    const height = this.$refs.path.offsetHeight
    init(
      this.handle,
      width,
      height,
      this.baseLine,
      this.$refs.path,
      this.cameraPostion
    )
    // 渲染
    this.render()

    window.addEventListener(
      'resize',
      () => {
        const width = this.$refs.path.offsetWidth
        const height = this.$refs.path.offsetHeight
        this.handle.camera.aspect = width / height
        this.handle.camera.updateProjectionMatrix()
        this.handle.renderer.setSize(width, height)
      },
      false
    )
  },
  // 方法
  methods: {
    // 渲染
    render() {
      this.handle.renderer.render(this.handle.scene, this.handle.camera)
      requestAnimationFrame(this.render)
    },
    handleReset() {
      resetCamera(this.handle)
    },
    // 可调用方法增路径点
    addPath(x, y, z) {
      addPath(this.handle, x, y, z)
    },
  },
}
</script>

<style lang="scss" scoped>
.path-3d {
  position: relative;
  .path {
    width: 100%;
    height: 100%;
  }
  .el-button {
    position: absolute;
    top: 4px;
    left: 4px;
  }
}
</style>
