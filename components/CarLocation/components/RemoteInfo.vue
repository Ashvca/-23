<template>
  <transition name="fade" mode="out-in">
    <ul class="remote-info">
      <li>{{ info.latitude }}</li>
      <li>{{ info.longitude }}</li>
      <li>{{ info.height }}</li>
      <li>角度 {{ info.angle }}°</li>
      <li>距离 {{ info.dist }}KM</li>
    </ul>
  </transition>
</template>

<script>
export default {
  name: 'RemoteInfo',
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
.remote-info {
  background-color: rgba(10, 57, 94, 0.8);
  border-radius: 4px;
  color: #00ebd7;
  font-size: 12px;
  line-height: 18px;
  padding: 4px 10px;
}
</style>
