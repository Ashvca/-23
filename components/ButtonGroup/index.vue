<template>
  <el-card
    class="theme-card header"
    :body-style="{
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: 'calc(100% - 61px)',
    }"
  >
    <div slot="header" class="card-header">{{ headerTitle }}</div>
    <el-button
      v-for="i in buttonNum"
      :key="i"
      class="theme-button"
      type="primary"
      size="medium"
      @click="clickBtn()"
      >{{ buttonName[i - 1] }}</el-button
    >
  </el-card>
</template>

<script>
export default {
  components: {},
  props: {
    //按钮点击事件名称
    buttonClickEventName: {
      type: String,
      default: '',
    },
    // 卡片标题
    headerTitle: {
      type: String,
      default: '',
    },
    // 按钮名称
    buttonName: {
      type: Array,
      default() {
        return ['开始', '关闭']
      },
    },
    // 按钮数量
    buttonNum: {
      type: Number,
      default: 2,
    },
  },
  methods: {
    //btnFlag=1 ? 开始 : 关闭
    clickBtn(btnFlag) {
      console.log('click')
      switch (this.buttonClickEventName) {
        case 1:
          //抗干扰天线复位指令
          this.$emit('antiJammingReset')
          break
        case 2:
          //模拟源开始控制指令
          this.$emit('simulatorStart', btnFlag)
          break
        case 3:
          //模拟源心跳输出控制指令
          this.$emit('startHeart', btnFlag)
          break
        case 4:
          //模拟源观测量输出控制指令
          this.$emit('startObservation', btnFlag)
          break
        case 5:
          //gnss载体运行轨迹输出控制指令
          this.$emit('startGnssCarrier', btnFlag)
          break
        //信号接收信息处理 页面 打开干扰检测软件 功能
        case 'dakaijianraoList':
          console.log('clickEventName: dakaijianraoList')
          this.$emit('dakaijianraoList', btnFlag)
          break
        //信号接收信息处理 页面 上报版本信息 功能
        case 'shangbaobanbenxinxiList':
          console.log('clickEventName: shangbaobanbenxinxiList')
          this.$emit('shangbaobanbenxinxiList', btnFlag)
          break
        //信号接收信息处理 页面 干扰检测频点设置 功能
        case 'ganraojianceList':
          console.log('clickEventName: ganraojianceList')
          this.$emit('ganraojianceList', btnFlag)
          break
        //信号接收信息处理 页面 开启检测任务 功能
        case 'kaiqijianceList':
          console.log('clickEventName: kaiqijianceList')
          this.$emit('kaiqijianceList', btnFlag)
          break
        //信号接收信息处理 页面 干扰告警门限设置指令 功能
        case 'ganraogaojingList':
          console.log('clickEventName: ganraogaojingList')
          this.$emit('ganraogaojingList', btnFlag)
          break
        //信号接收信息处理 页面 停止任务 功能
        case 'stopList':
          console.log('clickEventName: stopList')
          this.$emit('stopList', btnFlag)
          break
        //信号接收信息处理 页面 设置监测任务 功能
        case 'jiancerenwuList':
          console.log('clickEventName: jiancerenwuList')
          this.$emit('jiancerenwuList', btnFlag)
          break
        //信号接收信息处理 页面 设置单瓶测量任务 功能
        case 'danpinceliangList':
          console.log('clickEventName: danpinceliangList')
          this.$emit('danpinceliangList', btnFlag)
          break
      }
    },
  },
}
</script>
