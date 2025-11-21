<template>
  <!-- 航向表 绑定value 即可改变数据 -->
  <div class="course-meter">
    <span class="name">航&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向</span>
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
    <div class="pointer" :style="`transform: rotate(${value}deg)`" />
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
.course-meter {
  position: relative;
  width: 212px;
  height: 212px;
  background-image: url('../../assets/components/meter/course-meter-bg.png');
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
    position: absolute;
    top: 39px;
    left: 39px;
    width: 134px;
    height: 134px;
    background: url('../../assets/components/meter/course.png') no-repeat center
      top;
    transition-duration: 0.5s;
    transition-timing-function: ease-in-out;
  }
}
</style>
