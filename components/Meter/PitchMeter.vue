<template>
  <!-- 俯仰表 绑定value 即可改变数据 -->
  <div class="pitch-meter">
    <span class="name">俯&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;仰</span>
    <!-- 数值 -->
    <span class="value">
      &nbsp;
      <count-to
        :start-val="0"
        :end-val="value"
        :duration="500"
        :decimals="2"
      />°
    </span>
    <img src="../../assets/components/meter/pitch-p.png" />
    <div class="bg">
      <div
        class="mov"
        :style="`transform: translateY(${-504 + 16 * (value / 5)}px);`"
      >
        <ul class="scales-text scales-left">
          <li v-for="(item, index) in scales" :key="index">
            <template v-if="item % 10 === 0">
              {{ item }}
            </template>
            <span
              class="line"
              :style="{ width: item % 10 === 0 ? '4px' : '2px' }"
            />
          </li>
        </ul>
        <ul class="scales-text scales-right">
          <li v-for="(item, index) in scales" :key="index">
            <template v-if="item % 10 === 0">
              {{ item }}
            </template>
            <span
              class="line"
              :style="{ width: item % 10 === 0 ? '4px' : '2px' }"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
export default {
  components: {
    countTo,
  },
  props: {
    // 显示数值
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      scales: [],
    }
  },
  mounted() {
    // 初始化刻度数据
    for (let i = 180; i >= 0; i -= 5) {
      this.scales.push(i)
    }

    for (let i = -5; i >= -180; i -= 5) {
      this.scales.push(i)
    }
  },
}
</script>

<style lang="scss" scoped>
.pitch-meter {
  position: relative;
  width: 212px;
  height: 212px;
  background-image: url('../../assets/components/meter/pitch-meter-bg.png');
  .name {
    position: absolute;
    top: 64px;
    width: 212px;
    text-align: center;
    color: #19ffff;
    font-size: 16px;
  }
  .value {
    position: absolute;
    top: 134px;
    width: 212px;
    text-align: center;
    color: #19ffff;
    font-size: 16px;
  }
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .bg {
    position: absolute;
    top: 25px;
    left: 25px;
    width: 162px;
    height: 162px;
    border-radius: 81px;
    overflow: hidden;
  }

  .scales-text {
    display: inline-block;
    color: #19ffff;
    font-size: 10px;
    li {
      height: 16px;
      width: 42px;

      .line {
        margin-top: 8px;
        height: 1px;
        width: 4px;
        background-color: #00e0ff;
      }
    }
  }

  .scales-left {
    float: left;
    margin-left: -3px;
    text-align: right;
    border-right: 2px solid #00e0ff;
    .line {
      float: right;
      margin-left: 4px;
    }
  }

  .scales-right {
    float: right;
    margin-right: -3px;
    text-align: left;
    border-left: 2px solid #00e0ff;
    .line {
      float: left;
      margin-right: 4px;
    }
  }

  .mov {
    transition-duration: 0.5s;
    transition-timing-function: ease-in-out;
  }
}
</style>
