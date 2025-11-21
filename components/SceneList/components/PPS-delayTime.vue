<template>
  <div class="instruct">
    <div class="select_1" style="padding-top: 20px">
      <span>选择设备：</span>
      <el-select
        v-model="facility_value"
        style="width: 315px"
        class="theme-input"
        popper-class="theme-popper"
        placeholder="请选择设备"
      >
        <el-option label="区域一" value="01"></el-option>
        <el-option label="区域二" value="02"></el-option>
      </el-select>
    </div>
    <div>
      <p
        style="
          margin-left: 50px;
          font-weight: bold;
          color: #9be0ff;
          margin-bottom: 15px;
        "
      >
        指令参数设置
      </p>
    </div>
    <div>
      <el-button
        class="theme-button"
        type="primary"
        style="background-color: #1b6faf"
        >确定</el-button
      >
    </div>
  </div>
</template>
<script>
import FloatInput from '@/components/FloatInput.vue'
export default {
  components: {
    // FloatInput,
  },
  data() {
    return {
      facility_value: '',
    }
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
.instruct {
  height: 500px;
  margin-left: 15px;
  background-color: rgba(8, 51, 85, 0.3);
}
.select_1 {
  // display: flex;
  // justify-content: center;
  margin-left: 60px;
  span {
    margin-right: 10px;
    color: #9be0ff;
  }
}
.select_2 {
  margin-left: 60px;
  span {
    margin-right: 4px;
    color: #9be0ff;
  }
}
.theme-button {
  width: 120px;
  height: 40px;
  position: relative;
  top: 25px;
  left: 195px;
}
</style>
