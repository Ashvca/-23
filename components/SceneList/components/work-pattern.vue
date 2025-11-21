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
    <div class="center">
      <span style="color: #9be0ff">工作模式：</span>
      <el-select
        v-model="formData.workValue"
        class="theme-input"
        popper-class="theme-popper"
        style="width: 150px"
      >
        <el-option
          v-for="item in pattern"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
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
          facilityValue: '', //设备
          workValue: '', //工作模式
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
      orderName: '抗干扰工作模式切换',
      pattern: [
        {
          value: '00',
          label: '四阵元',
        },
        {
          value: '11',
          label: '七阵元',
        },
      ],
    }
  },
  methods: {
    submit() {
      let formData = {
        orderName: this.orderName,
        facilityValue: this.formData.facilityValue,
        workValue: this.formData.workValue,
      }
      console.log('workPattern组件表单提交')
      console.log('workPattern组件表单提交 formData:')
      console.log(formData)
      console.log('workPattern组件表单提交 formIndex:')
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
::v-deep .input-error-tip {
  height: 0vh !important;
}
.theme-button {
  width: 120px;
  height: 40px;
  position: relative;
  top: 25px;
  left: 195px;
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.KGR_head {
  display: flex;
  margin-top: 10px;
  span {
    padding-top: 4px;
  }
}
</style>
