<template>
  <div class="radar">
    <!-- 绘制扇形 -->
    <slice
      v-if="!updateFlag"
      class="circle"
      :r="lineLength"
      :start-angle="location.angle"
      :set-angle="setAngle"
      color="rgba(3, 127, 184, 0.52)"
    />

    <slice
      v-if="!updateFlag"
      class="circle"
      :r="37"
      :start-angle="location.angle"
      :set-angle="setAngle"
      color="rgba(155, 224, 255, 0.5)"
    />
    <!-- 本车角度连接线 -->
    <div
      v-show="!updateFlag"
      class="line circle"
      :style="`transform: rotate(${location.angle + 180}deg) `"
    >
      <div :style="`height: ${lineLength}px;`"><div /></div>
    </div>
    <!-- 目标车角度连接线 -->
    <div
      v-show="!updateFlag"
      class="line circle"
      :style="`transform: rotate(${lineAngle + 180}deg) `"
    >
      <div :style="`height: ${lineLength}px;`">
        <div />
      </div>
    </div>
    <!-- 中心圆圈 -->
    <div class="circle">
      <!-- 本端车 -->
      <img
        class="location-car"
        src="../../../assets/components/car-location/car.png"
        :style="`transform: rotate(${location.angle}deg)`"
      />
      <!-- 远端车 -->
      <div
        v-for="(item, index) in remoteCardParam"
        v-show="item.show"
        :key="index"
        class="remote-car"
        :style="{
          top: item.pos.y + 'px',
          left: item.pos.x + 'px',
        }"
        @mouseenter="remoteInSelect(index)"
        @mouseleave="remoteOutSelect(index)"
      >
        <ul class="car-title" :style="computedTitleSyte(item.angle)">
          <li v-if="!updateFlag">
            夹角:<count-to
              style="color: #00ebd7"
              :start-val="0"
              :end-val="setAngle"
              :duration="500"
              :decimals="1"
            />°
          </li>
          <li>{{ item.title }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Slice from './Slice.vue'
import countTo from 'vue-count-to'

export default {
  name: 'Radar',
  components: {
    Slice,
    countTo,
  },
  props: {
    location: {
      type: Object,
      required: true,
    },
    remote: {
      type: Array,
      required: true,
    },
    carSelect: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      // 远端车辆参数
      remoteCardParam: [],
      // 更新标记
      updateFlag: true,
      // 线角度
      lineAngle: 0,
      // 线长
      lineLength: 0,
      // 设置角度
      setAngle: 0,
    }
  },
  watch: {
    remote: {
      handler() {
        if (this.updateFlag) {
          this.updateRemoteParam()
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // 更新远端参数
    updateRemoteParam() {
      // 进行数组深拷贝防止递归
      let params = this.remote.concat()
      // 按照距离进行排序
      let tmp = params.sort((a, b) => 0 - (a.dist - b.dist))
      this.remoteCardParam = []
      // 遍历车辆参数
      tmp.map((item, index) => {
        this.remoteCardParam.push({
          title: item.name, // 名称
          pos: this.computedPos(item.angle, 183 - index * 55), // 显示位置
          angle: item.angle,
          cardInfo: item, // 记录参数
          show: true,
        })
      })
    },
    // 通过角度计算点的位置
    computedPos(angle, radius) {
      let s = Math.sin((angle * Math.PI) / 180) * radius
      let l = Math.cos((angle * Math.PI) / 180) * radius
      // let result;
      // if (angle <= 0 || angle < 180) {
      //   result = {
      //     x: 183 + s,
      //     y: 183 - l,
      //   };
      // } else {
      //   result = {
      //     x: 183 + s,
      //     y: 183 - l,
      //   };
      // }
      return {
        x: 183 + s,
        y: 183 - l,
      }
    },
    // 计算标题样式
    computedTitleSyte(angle) {
      if (angle <= 0 || angle < 90) {
        return 'transform: translateY(-100%); left: 100%'
      } else if (angle <= 90 || angle < 180) {
        return 'top: 100%; left: 100%'
      } else if (angle <= 180 || angle < 270) {
        return 'top: 100%; transform: translateX(-100%)'
      } else {
        return 'transform: translate(-100%, -100%)'
      }
    },
    // 远端车进入选种
    remoteInSelect(nowIndex) {
      // 锁定更新方便操作
      this.updateFlag = false
      // 隐藏其他车辆
      this.remoteCardParam.map((item, index) => {
        if (index !== nowIndex) {
          item.show = false
        }
      })
      // 设置连线角度
      this.lineAngle = this.remoteCardParam[nowIndex].angle
      // 计算线长
      this.lineLength = 183 - nowIndex * 55
      // setAngle 是夹角
      if (this.lineAngle < this.location.angle) {
        this.setAngle = 360 - (this.location.angle - this.lineAngle)
      } else {
        this.setAngle = this.lineAngle - this.location.angle
      }
      this.$emit('remoteInfoShow', this.remoteCardParam[nowIndex].cardInfo)
    },
    // 离开选中
    remoteOutSelect() {
      this.updateFlag = true
      // 全部显示
      this.remoteCardParam.map((item) => (item.show = true))
      // 更新数据
      this.updateRemoteParam()
      this.$emit('remoteInfoShow', null)
    },
  },
}
</script>

<style lang="scss" scoped>
.radar {
  background-image: url('../../../assets/components/car-location/location-bg.png');
  width: 415px;
  height: 422px;
  position: absolute;
  top: 5px;
  left: 50%;
  margin-left: -207px;

  .circle {
    top: 40px;
    left: 17px;
    position: absolute;
    width: 366px;
    height: 366px;
  }

  .line {
    > div {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%);
      div {
        height: 100%;
        border: 1px solid #72d3ff;
        animation: line-zoom 0.25s linear;
      }
    }
  }

  // 动画帧
  @keyframes line-zoom {
    0% {
      height: 0px;
    }
    100% {
      height: 100%;
    }
  }

  .location-car {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -18px;
    margin-left: -10px;
  }
  .remote-car {
    width: 21px;
    height: 37px;
    background-image: url('../../../assets/components/car-location/car.png');
    position: absolute;
    transform: translate(-50%, -50%);
    cursor: pointer;
    .car-title {
      position: absolute;
      font-size: 12px;
      color: #9be0ff;
      li {
        white-space: nowrap;
      }
    }
  }
}
</style>
