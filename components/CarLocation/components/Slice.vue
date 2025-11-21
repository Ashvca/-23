<template>
  <canvas ref="canSlice" class="slice" />
</template>

<script>
export default {
  name: 'Slice',
  props: {
    color: {
      type: String,
      required: true,
    },
    r: {
      type: Number,
      required: true,
    },
    startAngle: {
      type: Number,
      required: true,
    },
    setAngle: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      context: null,
      anlge: 0,
      diff: 0,
    }
  },
  mounted() {
    this.startAngle
    this.setAngle
    this.anlge = this.startAngle
    // 每帧动画前进几度
    this.diff = 10

    // 初始化
    this.init()
    // 延迟等线画完
    setTimeout(() => {
      this.draw()
      window.requestAnimationFrame(this.draw)
    }, 250)
  },
  // 方法
  methods: {
    // 初始化
    init() {
      // 缩放比例为了抗锯齿
      const scale = 4
      // 获取canvas
      const canvas = this.$refs.canSlice
      canvas.width = 366 * scale
      canvas.height = 366 * scale
      // 设置宽高
      this.context = canvas.getContext('2d')
      this.context.scale(scale, scale)
    },
    // 绘扇形
    drawSlice(s, e) {
      // 清除
      this.context.clearRect(0, 0, 366, 366)
      this.context.save()
      this.context.beginPath()
      this.context.arc(
        183,
        183,
        this.r,
        Math.PI * ((s / 360) * 2),
        Math.PI * ((e / 360) * 2),
        false
      )
      this.context.lineTo(183, 183)
      this.context.closePath()
      this.context.fillStyle = this.color
      this.context.fill()
      this.context.restore()
    },
    // 画
    draw() {
      this.drawSlice(this.startAngle, this.anlge)
      if (this.anlge < this.setAngle + this.startAngle) {
        if (this.anlge + this.diff < this.setAngle + this.startAngle) {
          this.anlge += this.diff
        } else {
          this.anlge = this.setAngle + this.startAngle
        }
        window.requestAnimationFrame(this.draw)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.slice {
  transform: rotate(-90deg);
}
</style>
