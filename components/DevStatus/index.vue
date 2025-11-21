<template>
  <div class="dev-status">
    <div class="content">
      <div :style="{ width: width + 'px', height: height + 'px' }" class="box">
        <!-- 画连线 -->
        <canvas ref="canvas" />
        <!-- 光圈 -->
        <halo v-show="showHalo" :color="haloColor" />
        <!-- 车辆图 -->
        <img class="car-img" :src="centerImg" />
        <!-- 循环左侧 -->
        <status
          v-for="(item, index) in leftPos"
          :key="index"
          :x="item.x"
          :y="item.y"
          :title="showData.left[index].title"
          :icon="showData.left[index].icon"
          :status="showData.left[index].status"
          :color="color"
          :status-text="statusText"
        />
        <!-- 循环右侧 -->
        <status
          v-for="(item, index) in rightPos"
          :key="index + '1'"
          :x="item.x"
          :y="item.y"
          :title="showData.right[index].title"
          :icon="showData.right[index].icon"
          :status="showData.right[index].status"
          :color="color"
          :status-text="statusText"
          :is-right="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Status from './components/Status.vue'
import { canvasMixin } from './components/CanvasMixin.js'
import Halo from './components/Halo.vue'

export default {
  name: 'DevStatus',
  components: { Status, Halo },
  mixins: [canvasMixin],
  props: {
    // 显示区域宽度
    width: {
      type: Number,
      default: 946,
    },
    // 显示区域高度
    height: {
      type: Number,
      default: 356,
    },
    // 半径控制文字显示位置
    radius: {
      type: Number,
      default: 220,
    },
    // 清空半径隐藏连线
    clearRadius: {
      type: Number,
      default: 220 * 0.73,
    },
    // 颜色
    color: {
      type: Object,
      default() {
        return {
          normal: '#24cd1a', // 正常
          warn: '#d8c411', // 告警
          fault: '#fe533e', // 故障
          offline: '#999999', // 离线
          line: '#ffffff', // 线
        }
      },
    },
    // 状态文字
    statusText: {
      type: Object,
      default() {
        return {
          normal: '正常',
          warn: '告警',
          fault: '故障',
          offline: '离线',
        }
      },
    },
    // 是否显示光圈
    showHalo: {
      type: Boolean,
      default: true,
    },
    // 光圈颜色
    haloColor: {
      type: String,
      default: '#9ad50d',
    },
    // 中心图片
    centerImg: {
      type: String,
      default: require('@/assets/components/dev-status/car.png'),
    },
    // 背景图片
    bgImg: {
      type: String,
      default: require('@/assets/components/dev-status/bg.png'),
    },
    // 显示数据
    showData: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .box {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .car-img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 3;
    }

    canvas {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
