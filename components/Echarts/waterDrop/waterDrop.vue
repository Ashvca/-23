<template>
  <div class="back">
    <div class="titleClass1">
      {{ sys.computerName }}
    </div>
    <div class="titleClass2">
      {{ sys.businessName }}
    </div>
    <div class="titleClass3">
      {{ 'IP：' + sys.computerIp }}
    </div>
    <div class="out"></div>
    <div class="in"></div>
    <v-chart ref="chart" :option="option" />
  </div>
</template>

<script>
import VChart from 'vue-echarts'
import 'echarts-liquidfill'
import * as echarts from 'echarts'
export default {
  name: 'BarChart',
  components: {
    VChart,
  },
  props: {
    sys: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      timing: [],
      num: 0.9,
      option: {
        // backgroundColor: '#0F224C', //背景色
        title: [
          {
            text: 'cpu占用率',
            x: 'center',
            y: '70%',
            textStyle: {
              fontSize: 14,
              color: '#000',
            },
          },
        ],
        // tooltip: {
        //   trigger: 'item',
        //   formatter: '{a} <br/>{b} : {c} ({d}%)',
        // },
        series: [
          {
            type: 'liquidFill', //水位图
            radius: '65%', //显示比例
            center: ['50%', '50%'], //中心点
            amplitude: 30, //水波振幅
            data: [0], // data个数代表波浪数
            color: [
              {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#446bf5',
                  },
                  {
                    offset: 1,
                    color: '#f90000',
                  },
                ],
                globalCoord: false,
              },
            ], //波浪颜色
            backgroundStyle: {
              borderWidth: 3, //外边框
              borderColor: '#86f2ff', //边框颜色
              color: '#e2c5e4', //边框内部填充部分颜色
            },
            label: {
              //标签设置
              // position: ['50%', '45%'],
              // formatter: '50%', //显示文本,
              // textStyle: {
              //     fontSize: '52px', //文本字号,
              //     color: '#fff',
              // },
              normal: {
                textStyle: {
                  fontSize: 64,
                  fontWeight: 'bold',
                  color: '#000',
                },
              },
            },
            outline: {
              // show: false,
              borderDistance: 0,
              itemStyle: {
                borderWidth: 2,
                borderColor: '#112165',
              },
            },
          },
        ],
      },
    }
  },
  watch: {
    sys: {
      handler(e) {
        console.log(e)
        this.option.series[0].data = [e.used * 0.01]
      },
      immediate: true,
      deep: true,
    },
  },

  mounted() {
    // var time1 = setInterval(() => {
    //   this.draw()
    // }, 50)
    // this.timing.push(time1)
    window.addEventListener('resize', () => {
      this.$refs.chart.resize()
    })
  },
  methods: {
    // draw() {
    //   angle = angle + 1
    //   this.$refs.chart.setOption(this.option, true)
    //   //window.requestAnimationFrame(draw);
    // },
  },
  // beforeDestroy() {
  //   this.timing.forEach((e) => {
  //     clearInterval(e)
  //   })
  // },
}
</script>
<style lang="scss" scoped>
.back {
  height: 100%;
  position: relative;
  color: #86f3ffab;
  .out {
    width: 350px;
    height: 350px;
    background-image: url('../../../assets/components/waterDrop/out.png');
    background-size: 100%, 100%;
    background-repeat: no-repeat;
    left: 24px;
    top: 24px;
    transform: rotate(-180deg);
    position: absolute;
    animation: outAnimation 3s ease infinite;
  }
  .in {
    width: 300px;
    height: 300px;
    background-image: url('../../../assets/components/waterDrop/in.png');
    background-size: 100%, 100%;
    background-repeat: no-repeat;
    left: 49px;
    top: 49px;
    transform: rotate(360deg);
    position: absolute;
    animation: outAnimation 3s linear infinite;
  }
  @keyframes outAnimation {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360);
    }
  }
  .titleClass1 {
    position: absolute;
    top: 5px;
    left: 5px;
  }
  .titleClass2 {
    position: absolute;
    top: 5px;
    right: 5px;
  }
  .titleClass3 {
    position: absolute;
    right: 5px;
    bottom: 5px;
  }
}
</style>
