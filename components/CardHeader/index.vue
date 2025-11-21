<template>
  <div id="header" class="card-header">
    <div>{{ headerTitle }}</div>
    <el-select
      v-if="headerRightPart == 'select'"
      v-model="terminalId"
      class="theme-input"
      popper-class="theme-popper"
      placeholder="请选择"
      @change="getTerminalId"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-button
      v-if="headerRightPart == 'button'"
      type="primary"
      class="theme-button"
      size="mini"
      @click="submitButton"
      >{{ buttonName }}</el-button
    >
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    type: {
      type: Number,
      default: 0,
    },
    num: {
      type: Number,
      default: 0,
    },
    headerTitle: {
      type: String,
      default: '',
    },
    headerRightPart: {
      type: String,
      default: 'select',
    },
    // 卡片头部右边部分为button时的名称
    buttonName: {
      type: String,
      default: '发送',
    },
  },
  data() {
    return {
      terminalId: 1,
      options: [],
    }
  },
  created() {
    //渲染设备下拉框
    this.setOption()
  },
  methods: {
    //下拉框选择事件
    getTerminalId() {
      this.$emit('getTerminalId', this.terminalId)
    },
    //渲染设备下拉框
    setOption() {
      let type = this.type
      //导航信号模拟源
      if (type == 1) {
        for (let i = 0; i < 3; i++) {
          let txt = '导航信号模拟源'
          let option = { value: i + 1, label: txt + (i + 1) }
          this.options.push(option)
        }
      }
    },
    //按钮点击事件
    submitButton() {
      var flag = this.num
      switch (flag) {
        case 2:
          //抗干扰天线-工作模式切换
          this.$emit('workChange')
          break
        case 3:
          //抗干扰天线-ip设置
          this.$emit('setIpFunc')
          break
        case 4:
          //抗干扰天线-抗干扰算法加载文件头
          this.$emit('setAntiJammingHead')
          break
        case 5:
          //抗干扰天线-抗干扰算法加载数据包
          this.$emit('setAntiJammingData')
          break
        case 6:
          //抗干扰天线-复位指令
          this.$emit('reset', this.terminalId)
          break
        case 7:
          this.$emit('issue')
          break
      }
    },
  },
}
</script>
<style>
#header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
}
</style>
