<template>
  <div class="instruct">
    <div class="select_1" style="padding-top: 20px">
      <span>选择设备：</span>
      <el-select
        v-model="formData.receiver"
        style="width: 315px"
        class="theme-input"
        popper-class="theme-popper"
        placeholder="请选择设备"
      >
        <el-option label="设备A" value="01"></el-option>
        <el-option label="设备B" value="02"></el-option>
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
    <div class="select_2">
      <span>采样频点：</span>
      <el-select
        v-model="formData.sampling"
        style="width: 315px"
        class="theme-input"
        popper-class="theme-popper"
        placeholder="请选择"
        @change="changeType"
      >
        <el-option label="GPSL1/GPSL2" value="01"></el-option>
        <el-option label="GLONASS G1/GLONASS G2" value="02"></el-option>
        <el-option label="IRNSSL5" value="03"></el-option>
      </el-select>
    </div>
    <div class="rf_input">
      <div
        style="
          color: #9be0ff;
          width: 120px;
          padding-left: 20px;
          padding-top: 8px;
        "
      >
        数字中频频率
      </div>
      <div class="num_input">
        <div style="display: flex; margin-right: 25px">
          <span style="margin-right: 10px; margin-top: 5px">
            {{ spanVal1 }}
          </span>
          <FloatInput
            v-model="formData.midBandFrequency1"
            :max="604799.999"
            :min="0"
            :maxlength="10"
            :decimal="2"
            :value="formData.midBandFrequency1"
            :suffix="'Hz'"
            style="width: 100px"
            class="theme-input"
          ></FloatInput>
        </div>
        <div v-show="show" style="display: flex">
          <span style="margin-right: 10px; margin-top: 5px">
            {{ spanVal2 }}
          </span>
          <FloatInput
            v-model="formData.midBandFrequency2"
            :max="604799.999"
            :min="0"
            :maxlength="10"
            :decimal="2"
            :value="formData.midBandFrequency2"
            :suffix="'Hz'"
            style="width: 100px"
            class="theme-input"
          ></FloatInput>
        </div>
      </div>
    </div>
    <!-- 采样通道 -->
    <div class="channel">
      <div
        v-for="(item, index) in formData.sapmlingOpenWay"
        :key="item.number"
        class="item"
      >
        <div>{{ channelName + (index + 1) }}</div>
        <div>
          <el-select
            v-model="item.state"
            class="theme-input"
            popper-class="theme-popper"
            placeholder="请选择"
          >
            <el-option
              v-for="item1 in channelOption"
              :key="item1.value"
              :label="item1.label"
              :value="item1.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
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
          receiver: '', //设备
          sampling: '', //采样频点
          midBandFrequency1: '', //频率1
          midBandFrequency2: '', //频率2
          /**
           * 通道号状态
           *
           * @param number  通道号索引
           * @param state 通道号状态 0：开启 1：关闭
           */
          sapmlingOpenWay: [
            { number: 1, state: '0' },
            { number: 2, state: '0' },
            { number: 3, state: '0' },
            { number: 4, state: '0' },
            { number: 5, state: '0' },
            { number: 6, state: '0' },
            { number: 7, state: '0' },
            { number: 8, state: '0' },
            { number: 9, state: '0' },
            { number: 10, state: '0' },
            { number: 11, state: '0' },
            { number: 12, state: '0' },
            { number: 13, state: '0' },
            { number: 14, state: '0' },
            { number: 15, state: '0' },
            { number: 16, state: '0' },
            { number: 17, state: '0' },
            { number: 18, state: '0' },
            { number: 19, state: '0' },
            { number: 20, state: '0' },
            { number: 21, state: '0' },
            { number: 22, state: '0' },
            { number: 23, state: '0' },
            { number: 24, state: '0' },
          ],
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
      // 命令集名称
      orderName: '射频采样控制指令',
      spanVal1: 'L1频点频率',
      spanVal2: 'L2频点频率',
      show: true,
      channelName: '通道号',
      channelOption: [
        {
          value: '0',
          label: '开启',
        },
        {
          value: '1',
          label: '关闭',
        },
      ],
    }
  },
  methods: {
    changeType: function () {
      let val = this.formData.sampling
      if (val == '01') {
        this.spanVal1 = 'L1频点频率'
        this.spanVal2 = 'L2频点频率'
        this.show = true
      }
      if (val == '02') {
        this.spanVal1 = 'G1频点频率'
        this.spanVal2 = 'G2频点频率'
        this.show = true
      }
      if (val == '03') {
        this.spanVal1 = 'L5频点频率'
        this.show = false
      }
    },
    // 提交表单
    submit() {
      let command = {
        sampling: this.formData.sampling,
        midBandFrequency1: this.formData.midBandFrequency1,
        midBandFrequency2: this.formData.midBandFrequency2,
        sapmlingOpenWay: JSON.parse(
          JSON.stringify(this.formData.sapmlingOpenWay)
        ),
      }
      let formData = {
        orderName: this.orderName,
        receiver: this.formData.receiver,
        sampling: this.formData.sampling,
        midBandFrequency1: this.formData.midBandFrequency1,
        midBandFrequency2: this.formData.midBandFrequency2,
        sapmlingOpenWay: JSON.parse(
          JSON.stringify(this.formData.sapmlingOpenWay)
        ),
      }
      console.log('rf组件表单提交')
      console.log('rf组件表单提交 formData:')
      console.log(formData)
      console.log('rf组件表单提交 formIndex:')
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
  // justify-formData: center;
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
.rf_input {
  color: #9be0ff;
  .num_input {
    height: 30px;
    margin-left: 30px;
    display: flex;
    justify-formdata: center;
    align-items: center;
  }
}
::v-deep .input-error-tip {
  height: 0vh !important;
}
.aisle > td {
  border: 1px solid #0e94f3;
  padding: 0px;
  text-align: center;
  box-shadow: inset 0px 0px 5px 1px rgba(#17bffd, 0.5);
}
.channel {
  padding-top: 10px;
  display: flex;
  flex-wrap: wrap;
  .item {
    width: calc(100% / 6);
  }
}
</style>
