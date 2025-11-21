export const canvasMixin = {
  // 数据
  data() {
    return {
      // canvas 画布
      context: null,
      // 左侧的点
      leftPos: [],
      // 右侧的点
      rightPos: [],
      // 中心点
      centerPost: { x: this.width / 2, y: this.height / 2 },
      // 扇形范围
      range: 80,
    }
  },
  // 初始化
  mounted() {
    // 初始化
    this.init()
    // 计算点
    this.calculateLeftPos()
    this.calculateRightPos()
    // 画连线
    this.drawPosLine(this.leftPos)
    this.drawPosLine(this.rightPos)
    // 画横线
    this.leftPos.map((item) => {
      this.drawLine(item.x, item.y, item.x - 16 * 2.5, item.y)
    })
    this.rightPos.map((item) => {
      this.drawLine(item.x, item.y, item.x + 16 * 2.5, item.y)
    })
    // 删除线
    this.clearArcFun(
      this.centerPost.x,
      this.centerPost.y,
      this.clearRadius,
      this.context
    )
  },
  // 方法
  methods: {
    // 初始化
    init() {
      // 缩放比例为了抗锯齿
      const scale = 4
      // 获取canvas
      const canvas = this.$refs.canvas
      canvas.width = this.width * scale
      canvas.height = this.height * scale
      // 设置宽高
      this.context = canvas.getContext('2d')
      this.context.scale(scale, scale)
    },
    // 划线
    drawLine(sx, sy, ex, ey) {
      // 画主线
      this.context.beginPath()
      this.context.strokeStyle = this.color.line
      this.context.moveTo(sx, sy)
      this.context.lineTo(ex, ey)
      this.context.lineWidth = 1
      // 阴影
      this.context.shadowColor = 'rgba(0,0,0, 0.81)'
      this.context.shadowOffsetY = 20
      this.context.shadowBlur = 20
      this.context.stroke()
    },
    // 画圆测试用
    drawArc() {
      this.context.beginPath()
      this.context.strokeStyle = '#ff0000'
      this.context.arc(
        this.centerPost.x,
        this.centerPost.y,
        this.radius,
        0,
        2 * Math.PI
      )
      this.context.stroke()
    },
    // 清空原
    clearArcFun(x, y, r, cxt) {
      //(x,y)为要清除的圆的圆心，r为半径，cxt为context
      var stepClear = 1 //别忘记这一步
      clearArc(x, y, r)
      function clearArc(x, y, radius) {
        var calcWidth = radius - stepClear
        var calcHeight = Math.sqrt(radius * radius - calcWidth * calcWidth)

        var posX = x - calcWidth
        var posY = y - calcHeight

        var widthX = 2 * calcWidth
        var heightY = 2 * calcHeight

        if (stepClear <= radius) {
          cxt.clearRect(posX, posY, widthX, heightY)
          stepClear += 1
          clearArc(x, y, radius)
        }
      }
    },
    // 计算左侧的点
    calculateLeftPos() {
      const count = this.showData.left.length
      let angles = []
      switch (count) {
        case 0:
          angles = []
        case 1:
          angles.push(270)
          break
        case 2:
          angles.push(360 - (90 - this.range / 2))
          angles.push(angles[0] - this.range)
          break
        default:
          const temp = this.range / (count - 1)
          angles = this.showData.left.map((__, index) => {
            return 360 - (90 - this.range / 2) - temp * index
          })
          break
      }
      this.leftPos = angles.map((value) => {
        // 平角是固定值
        if (value === 270) {
          return {
            x: this.centerPost.x - this.radius,
            y: this.centerPost.y,
          }
        } else if (value > 270) {
          // 上半区
          let a = 360 - value
          let s = Math.sin((a * Math.PI) / 180) * this.radius
          let l = Math.cos((a * Math.PI) / 180) * this.radius
          return {
            x: this.centerPost.x - s,
            y: this.centerPost.y - l,
          }
        } else {
          // 下半区
          let a = value - 180
          let s = Math.sin((a * Math.PI) / 180) * this.radius
          let l = Math.cos((a * Math.PI) / 180) * this.radius
          return {
            x: this.centerPost.x - s,
            y: this.centerPost.y + l,
          }
        }
      })
    },
    // 计算左侧的点
    calculateRightPos() {
      const count = this.showData.right.length
      let angles = []
      switch (count) {
        case 0:
          angles = []
        case 1:
          angles.push(90)
          break
        case 2:
          angles.push(90 - this.range / 2)
          angles.push(angles[0] + this.range)
          break
        default:
          const temp = this.range / (count - 1)
          angles = this.showData.right.map((__, index) => {
            return 90 - this.range / 2 + temp * index
          })
          break
      }
      this.rightPos = angles.map((value) => {
        // 平角是固定值
        if (value === 90) {
          return {
            x: this.centerPost.x + this.radius,
            y: this.centerPost.y,
          }
        } else if (value > 90) {
          // 上半区
          let a = 360 - value
          let s = Math.sin((a * Math.PI) / 180) * this.radius
          let l = Math.cos((a * Math.PI) / 180) * this.radius
          // x 还是-因为边换了
          return {
            x: this.centerPost.x - s,
            y: this.centerPost.y - l,
          }
        } else {
          // 下半区
          let a = value - 180
          let s = Math.sin((a * Math.PI) / 180) * this.radius
          let l = Math.cos((a * Math.PI) / 180) * this.radius
          return {
            x: this.centerPost.x - s,
            y: this.centerPost.y + l,
          }
        }
      })
    },
    drawPosLine(pos) {
      let centerIndex = parseInt(pos.length / 2)
      for (let i = 0; i < pos.length; i++) {
        // 头尾中间 三种情况,与原型相连
        if (
          i === 0 ||
          i === pos.length - 1 ||
          (pos.length % 2 !== 0 && i === centerIndex)
        ) {
          this.drawLine(
            pos[i].x,
            pos[i].y,
            this.centerPost.x,
            this.centerPost.y
          )
        } else {
          let xOffset = pos[0].x - pos[1].x
          let yOffSet = pos[1].y - pos[0].y
          if (i < centerIndex) {
            this.drawLine(
              pos[i].x,
              pos[i].y,
              this.centerPost.x - xOffset * i,
              this.centerPost.y + yOffSet * i
            )
          } else {
            this.drawLine(
              pos[i].x,
              pos[i].y,
              this.centerPost.x - xOffset * (pos.length - i - 1),
              this.centerPost.y - yOffSet * (pos.length - i - 1)
            )
          }
        }
      }
    },
  },
}
