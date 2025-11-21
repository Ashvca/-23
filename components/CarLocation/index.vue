<template>
  <div class="car-location">
    <location-info :info="location" />
    <!-- 中间雷达图 -->
    <radar
      :location="location"
      :remote="remote"
      :car-select="carSelect"
      @remoteInfoShow="(data) => (remoteInfoShow = data)"
    />
    <!-- 远端信息 -->
    <remote-info v-if="remoteInfoShow !== null" :info="remoteInfoShow" />
  </div>
</template>

<script>
import { LocationInfo, Radar, RemoteInfo } from './components'

export default {
  name: 'CarLocation',
  components: { LocationInfo, Radar, RemoteInfo },
  props: {
    location: {
      type: Object,
      required: true,
    },
    remote: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      carSelect: -1,
      remoteInfoShow: null,
    }
  },
}
</script>

<style lang="scss" scoped>
.car-location {
  min-width: 544px;
  min-height: 464px;
  position: relative;
  .remote-info {
    position: absolute;
    top: 0px;
    right: 0px;
  }
}
</style>
