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
    <div class="KGR_head">
      <div style="display: flex; margin-left: 20px">
        <span style="width: 112px">模块号：</span>
        <FloatInput
          v-model="formData.moduleId"
          :max="8"
          :min="1"
          :maxlength="1"
          :value="formData.moduleId"
          style="width: 100px"
          class="theme-input"
        ></FloatInput>
      </div>
      <div style="display: flex; padding-left: 80px">
        <span>文件总包数：</span>
        <FloatInput
          v-model="formData.fileTotalPackage"
          :max="8"
          :min="1"
          :maxlength="1"
          :value="formData.fileTotalPackage"
          style="width: 100px"
          class="theme-input"
        ></FloatInput>
      </div>
    </div>
    <div style="display: flex; margin-top: 20px; margin-left: 20px">
      <span style="padding-top: 4px; width: 112px">文件总字节数：</span>
      <FloatInput
        v-model="formData.fileTotalByte"
        :max="8"
        :min="1"
        :maxlength="1"
        :value="formData.fileTotalByte"
        style="width: 100px"
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
          moduleId: '', //模块号
          fileTotalPackage: '', //文件总包数
          fileTotalByte: '', //文件总字节数
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
      orderName: '抗干扰算法加载文件头',
    }
  },
  methods: {
    submit() {
      let formData = {
        orderName: this.orderName,
        facilityValue: this.formData.facilityValue,
        moduleId: this.formData.moduleId,
        fileTotalPackage: this.formData.fileTotalPackage,
        fileTotalByte: this.formData.fileTotalByte,
      }

      console.log('loadHead组件表单提交')
      console.log('loadHead组件表单提交 formData:')
      console.log(formData)
      console.log('loadHead组件表单提交 formIndex:')
      console.log(this.formIndex)
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
::v-deep .input-error-tip[data-v-bc133c04] {
  height: 0vh !important;
}
.KGR_head {
  display: flex;
  margin-top: 10px;
  span {
    padding-top: 4px;
  }
}
</style>
