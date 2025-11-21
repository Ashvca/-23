<template>
  <div class="status" :style="{ color: color[status], left: posX, top: posY }">
    <div
      class="title"
      :style="{
        float: isRight ? 'right' : 'left',
        justifyContent: isRight ? 'left' : 'right',
      }"
    >
      <span>{{ title }}</span>
    </div>
    <span
      class="icon"
      :style="{
        float: isRight ? 'right' : 'left',
        backgroundColor: color[status],
      }"
    >
      <img :src="icon" />
    </span>
    <span class="text" :style="{ float: isRight ? 'right' : 'left' }">{{
      statusText[status]
    }}</span>
  </div>
</template>

<script>
export default {
  name: 'Status',
  props: {
    // 标题
    title: {
      type: String,
      required: true,
    },
    // 图标
    icon: {
      type: String,
      required: true,
    },
    // 状态
    status: {
      type: String,
      required: true,
      validator(value) {
        if (
          value !== 'normal' &&
          value != 'warn' &&
          value !== 'fault' &&
          value != 'offline'
        ) {
          return false
        }
        return true
      },
    },
    color: {
      type: Object,
      required: true,
    },
    statusText: {
      type: Object,
      required: true,
    },
    // 是否为左边
    isRight: {
      type: Boolean,
      default: false,
    },
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
  },
  computed: {
    posX() {
      return this.isRight
        ? parseInt(this.x) + 'px'
        : parseInt(this.x) - 254 + 'px'
    },
    posY() {
      return parseInt(this.y) - 38 + 'px'
    },
  },
}
</script>

<style lang="scss" scoped>
.status {
  position: absolute;
  z-index: 4;
  span {
    text-align: center;
    word-break: normal;
  }
  .title {
    width: 160px;
    height: 48px;
    display: flex;
    align-items: center;
  }
  .text {
    width: 40px;
    height: 48px;
    line-height: 48px;
  }
  .icon {
    margin-top: 6px;
    margin-left: 10px;
    margin-right: 10px;
    width: 36px;
    height: 36px;
    border-radius: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
