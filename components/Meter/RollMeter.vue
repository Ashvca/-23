<template>
  <!-- 横滚表 绑定value 即可改变数据 -->
  <div class="roll-meter">
    <span class="name">横&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;滚</span>
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
    <div class="pointer" :style="`transform: rotate(${value}deg);`">
      <img class="p" src="../../assets/components/meter/roll-meter-p.png" />
      <img
        class="main-p"
        src="../../assets/components/meter/roll-meter-p-main.png"
      />
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
}
</script>

<style lang="scss" scoped>
.roll-meter {
  position: relative;
  width: 212px;
  height: 212px;
  background-image: url('../../assets/components/meter/roll-meter-bg.png');
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
  .pointer {
    position: relative;
    width: 212px;
    height: 212px;
    transition-duration: 0.5s;
    transition-timing-function: ease-in-out;
    .p {
      position: absolute;
      left: 50%;
      top: 31px;
      transform: translateX(-50%);
    }
    .main-p {
      position: absolute;
      top: 96px;
      left: 39px;
    }
  }
}
</style>
