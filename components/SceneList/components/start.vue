<template>
  <div class="instruct">
    <div class="select_1" style="padding-top: 20px">
      <span>选择设备：</span>
      <el-select
        style="width: 315px"
        v-model="formData.facilityValue"
        class="theme-input"
        popper-class="theme-popper"
        placeholder="请选择设备"
      >
        <el-option label="区域一" value="01"></el-option>
        <el-option label="区域二" value="02"></el-option>
      </el-select>
    </div>
    <div>
      <el-button
        class="theme-button"
        type="primary"
        style="background-color: #1b6faf"
        @click="submit"
        >{{ formState ? '确定' : '修改' }}</el-button
      >
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    //表单数据初始化
    formData: {
      type: Object,
      default: () => {
        return {
          facilityValue: '', //选择设备
        }
      },
    },
    // 表单数据在cmdList中的索引初始化
    formIndex: {
      type: Number,
      default: 0,
    },
    // 表单编辑状态 Boolean true 新增 false 修改
    formState: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      orderName: '导航模拟器启动',
      start: '',
    }
  },
  methods: {
    submit() {
      let formData = {
        orderName: this.orderName,
        facilityValue: this.formData.facilityValue, //选择设备
        start: this.start,
      }
      console.log('loadState组件表单提交')
      console.log('loadState组件表单提交 formData:')
      console.log(formData)
      console.log('loadState组件表单提交 formIndex:')
      console.log(this.formIndex)
      // 调用父组件保存方法
      this.$emit('submit', { ...formData }, this.formIndex)
    },
  },
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
  top: 230px;
  left: 195px;
}
.center {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
