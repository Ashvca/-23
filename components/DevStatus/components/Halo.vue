<template>
  <div
    class="halo"
    :style="{ width: radius + 20 + 'px', height: radius + 20 + 'px' }"
  >
    <div
      v-for="(item, index) in halos"
      :key="index"
      :style="{
        width: radius + 'px',
        height: radius + 'px',
        borderRadius: radius / 2 + 'px',
        borderColor: color,
        animationDelay: item + 's',
      }"
    />
  </div>
</template>

<script>
export default {
  name: 'Halo',
  props: {
    // 光圈颜色
    color: {
      type: String,
      default: '#9ad50d',
    },
    // 光圈的直径
    radius: {
      type: Number,
      default: 380,
    },
  },
  data() {
    return {
      halos: [0.0, 0.4, 0.8, 1.2, 1.6, 2.0],
    }
  },
}
</script>

<style lang="scss" scoped>
.halo {
  position: relative;
  div {
    position: absolute;
    top: 10px;
    left: 10px;
    border-width: 1px;
    border-style: solid;
    animation: zoom 2s 0.2s linear infinite normal;
    opacity: 0;
  }

  // 动画帧
  @keyframes zoom {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
}
</style>
