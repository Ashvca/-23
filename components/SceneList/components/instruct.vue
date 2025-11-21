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
    <div class="select_1">
      <span>定位模式：</span>
      <el-select
        style="width: 315px"
        v-model="location_value1"
        class="theme-input"
        popper-class="theme-popper"
        placeholder="请选择"
      >
        <el-option label="单频定位" value="03"></el-option>
        <el-option label="双频定位" value="04"></el-option>
      </el-select>
    </div>
    <div class="select_2">
      <span>定位模式1：</span>
      <el-select
        style="width: 315px"
        v-model="location_value2"
        class="theme-input"
        popper-class="theme-popper"
        placeholder="请选择"
      >
        <el-option label="单频定位" value="05"></el-option>
        <el-option label="双频定位" value="06"></el-option>
      </el-select>
    </div>
    <div class="select_2">
      <span>定位模式2：</span>
      <el-select
        style="width: 315px"
        v-model="location_value3"
        class="theme-input"
        popper-class="theme-popper"
        placeholder="请选择"
      >
        <el-option label="单频定位" value="07"></el-option>
        <el-option label="双频定位" value="08"></el-option>
      </el-select>
    </div>
    <div class="select_2">
      <span>定位模式3：</span>
      <el-select
        style="width: 315px"
        v-model="location_value4"
        class="theme-input"
        popper-class="theme-popper"
        placeholder="请选择"
      >
        <el-option label="单频定位" value="09"></el-option>
        <el-option label="双频定位" value="10"></el-option>
      </el-select>
    </div>
    <div class="select_2">
      <span style="padding-right: 8px">增强指示：</span>
      <el-select
        style="width: 315px"
        v-model="enhance_value"
        class="theme-input"
        popper-class="theme-popper"
        placeholder="请选择"
      >
        <el-option label="单频定位" value="11"></el-option>
        <el-option label="双频定位" value="12"></el-option>
      </el-select>
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
export default {
  data() {
    return {
      facility_value: '',
      location_value1: '',
      location_value2: '',
      location_value3: '',
      location_value4: '',
      enhance_value: '',
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
  padding-top: 25px;
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
  top: 75px;
  left: 195px;
}
</style>
