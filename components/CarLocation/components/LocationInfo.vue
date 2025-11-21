<template>
  <ul class="location-info">
    <li>{{ info.latitude }}</li>
    <li>{{ info.longitude }}</li>
    <li>{{ info.height }}</li>
    <li>角度 {{ info.angle }}°</li>
  </ul>
</template>

<script>
export default {
  name: 'LocationInfo',
  props: {
    // 信息
    info: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.location-info {
  color: #ffffff;
  font-size: 12px;
  li {
    margin-top: 8px;
  }
}
</style>
