<template>
  <!-- 星空图 -->
  <div class="satellite-map">
    <div class="bg-out" />
    <!-- 扫描背景图 -->
    <div v-if="showScann" v-show="infoCardShow === false" class="bg-in" />
    <!-- 遮罩 -->
    <div v-show="infoCardShow" class="box mask" />
    <!-- 点线区域 -->
    <div class="box">
      <!-- 做个选择是图标还是默认的小点 -->
      <template v-for="(item, index) in values">
        <div
          v-if="item.iconClass === undefined"
          :key="index"
          class="point"
          :style="{
            top: calculateY(item.distance, item.angle),
            left: calculateX(item.distance, item.angle),
            borderRadius: '5px',
            opacity: infoCardShow ? 0.4 : 1,
            width: '10px',
            height: '10px',
            backgroundColor: item.color ? item.color : '#0cffa4',
          }"
          @mouseenter="inSelect(item)"
          @mouseleave="outSelect(item)"
        >
          <span
            v-if="item.title"
            :style="{ color: item.color ? item.color : '#0cffa4' }"
            >{{ item.title }}</span
          >
        </div>
        <i
          v-else
          :key="index"
          :class="item.iconClass"
          class="point"
          :style="{
            top: calculateY(item.distance, item.angle),
            left: calculateX(item.distance, item.angle),
            opacity: infoCardShow ? 0.4 : 1,
            width: '24px',
            height: '24px',
            fontSize: '22px',
            color: item.color ? item.color : '#0cffa4',
          }"
          @mouseenter="inSelect(item)"
          @mouseleave="outSelect(item)"
        >
          <span
            v-if="item.title"
            :style="{ color: item.color ? item.color : '#0cffa4' }"
            >{{ item.title }}</span
          >
        </i>
      </template>
      <!-- 显示信息板 -->
      <div
        v-show="infoCardShow"
        class="info-card"
        :style="{ top: infoCardPoint.y + 'px', left: infoCardPoint.x + 'px' }"
      >
        <span />
        <ul>
          <li style="text-align: center">{{ infoCardData.name }}</li>
          <li v-for="(item, index) in infoCardData.labels" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SatelliteMap',
  props: {
    // 数据格式
    // {
    //   info: {
    //     name: '测试卫星4',
    //     labels: ['经度: xxxx.xxx.xx', '维度: xxx.xx.xx'],
    //   },
    //   title: '1'
    //   iconClass: 'iconfont icon-weixing', // 图标名称,不写为点
    //   color: '#0cffa4', // 图标颜色默认为#0cffa4
    //   distance: 0.3,
    //   angle: 145,
    // }
    values: {
      type: Array,
      required: true,
    },
    showScann: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 中心点坐标
      centerPoint: {
        x: 160,
        y: 160,
      },
      // 信息面板显示位置
      infoCardPoint: {
        x: 0,
        y: 0,
      },
      // 是否显示信息面板
      infoCardShow: false,
      // 信息面板显示内容
      infoCardData: {
        name: '名称',
        labels: ['测试1', '测试2'],
      },
    }
  },
  methods: {
    calculateX(distance, angle) {
      let result = this.computedPos(distance, angle)
      return result.x + 'px'
    },
    calculateY(distance, angle) {
      // 计算出Y轴距离
      let result = this.computedPos(distance, angle)
      return result.y + 'px'
    },
    // 通过角度计算点的位置
    computedPos(distance, angle) {
      let radius = distance * 135
      let s = Math.sin((angle * Math.PI) / 180) * radius
      let l = Math.cos((angle * Math.PI) / 180) * radius
      return {
        x: this.centerPoint.x + s,
        y: this.centerPoint.y - l,
      }
    },
    inSelect(item) {
      let result = this.computedPos(item.distance, item.angle)
      // 设置位置
      this.infoCardPoint = {
        x: result.x,
        y: result.y + 15,
      }
      // 设置信息
      this.infoCardData = item.info
      this.infoCardShow = true
    },
    outSelect(item) {
      this.infoCardShow = false
    },
  },
}
</script>

<style lang="scss" scoped>
.satellite-map {
  width: 394px;
  height: 385px;
  background-image: url('../../assets/components/satellite-map/satellite-map-bg.png');
  position: relative;
  .bg-out {
    position: absolute;
    top: 33px;
    left: 40px;
    width: 320px;
    height: 320px;
    background-image: url('../../assets/components/satellite-map/satellite-map-out-bg.png');
    animation: in-rotate 180s linear infinite;
  }
  .bg-in {
    position: absolute;
    top: 57px;
    left: 64px;
    width: 270px;
    height: 270px;
    background-image: url('../../assets/components/satellite-map/satellite-map-in-bg.png');
    animation: out-rotate 3s linear infinite;
  }
  @keyframes in-rotate {
    100% {
      transform: rotate(-360deg);
    }
  }
  @keyframes out-rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  .box {
    position: absolute;
    top: 33px;
    left: 40px;
    width: 320px;
    height: 320px;

    .point {
      position: absolute;
      transform: translate(-50%, -50%);
      span {
        white-space: nowrap; /*强制span不换行*/
        display: inline-block; /*将span当做块级元素对待*/
        position: absolute;
        top: -18px;
        font-size: 14px;
      }
    }
    .point:hover {
      opacity: 1 !important;
    }
  }
  .mask {
    border-radius: 160px;
    background-color: rgba(0, 70, 103, 0.7);
  }
  .info-card {
    position: absolute;
    transform: translateX(-50%);
    ul {
      color: #0cffa4;
      font-size: 12px;
      background-color: rgba(0, 70, 103);
      border: 1px solid rgba(12, 255, 164, 0.6);
      padding: 6px 10px;
      li {
        height: 20px;
        line-height: 20px;
        white-space: nowrap;
      }
    }
    // 实现小三角
    span {
      position: absolute;
      display: inline-block;
      top: -5px;
      left: calc(50% - 5px);
      height: 10px;
      width: 10px;
      background-color: rgba(0, 70, 103);
      border-left: 1px solid rgba(12, 255, 164, 0.6);
      border-top: 1px solid rgba(12, 255, 164, 0.6);
      transform: rotate(45deg);
    }
  }
}
</style>
