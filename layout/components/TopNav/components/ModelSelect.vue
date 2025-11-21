<template>
  <ul class="model-select">
    <li>
      <el-select
        v-model="testModel"
        style="width: 160px; margin-right: 10px"
        class="theme-input"
        popper-class="theme-popper"
      >
        <el-option label="有线模拟试验" value="wired"> </el-option>
        <el-option label="无线模拟试验" value="unwired"> </el-option>
      </el-select>
    </li>
    <li>
      <el-select
        v-model="ctrlModel"
        style="width: 100px"
        class="theme-input"
        popper-class="theme-popper"
      >
        <el-option label="本控" value="local"> </el-option>
        <el-option label="远控" value="remate"> </el-option>
      </el-select>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ModelSelect',
  data() {
    return {
      testModel: 'wired', // 试验模式
      ctrlModel: 'local', // 控制模式
    }
  },
}
</script>

<style lang="scss">
.model-select {
  li {
    float: left;
  }
}
</style>
