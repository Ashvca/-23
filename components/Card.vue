<template>
  <div class="card">
    <!--  头部 -->
    <span class="head">
      <!-- 显示logo -->
      <i class="iconfont icon-zhuangtai" />
      <span> {{ title }}</span>
    </span>
    <!-- 内容 -->
    <div class="body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    // 标题
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  display: inline-block;
  .head {
    color: #ffffff;
    font-size: 18px;
    border-bottom: 1px solid #82a3bd;
    padding: 0px 8px 4px 2px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    span {
      vertical-align: super;
    }
  }
  .body {
    margin-top: 10px;
    height: calc(100% - 50px);
  }
}
</style>
