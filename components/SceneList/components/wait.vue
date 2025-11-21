<template>
  <div class="instruct">
    <div class="center">
      <span>等待时间：</span>
      <FloatInput
        v-model="formData.waitValue"
        :max="6047999"
        :min="0"
        :maxlength="10"
        :decimal="2"
        :value="formData.waitValue"
        :suffix="'s'"
        style="width: 200px"
        class="theme-input"
      ></FloatInput>
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
import FloatInput from '@/components/FloatInput.vue'
export default {
  components: {
    FloatInput,
  },
  props: {
    //表单数据初始化
    formData: {
      type: Object,
      default: () => {
        return {
          facilityValue: '', //选择设备
          waitValue: '', //等待时间
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
      orderName: '等待指令',
    }
  },
  methods: {
    submit() {
      let formData = {
        logicFlag: true,
        orderName: this.orderName + '等待时间',
        waitValue: this.formData.waitValue, //等待时间
      }
      // console.log('wait组件表单提交')
      // console.log('wait组件表单提交 formData:')
      // console.log(formData)
      // console.log('wait组件表单提交 formIndex:')
      // console.log(this.formIndex)
      // 调用父组件保存方法
      this.$emit('submit', { ...formData }, this.formIndex)
    },
  },
}
</script>
<style lang="scss" scoped>
* {
  color: #9be0ff;
}
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
  justify-content: center;
  padding-top: 30px;
}
</style>
