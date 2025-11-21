<template>
  <v-chart ref="chart" :option="option" />
</template>

<script>
import VChart from 'vue-echarts'
import * as echarts from 'echarts'

export default {
  name: 'LineChart',
  components: {
    VChart,
  },

  data() {
    return {
      time: null,
      option: {
        // backgroundColor: '#105387',
        // title: {
        //   text: '当前课程报名情况',
        //   textStyle: {
        //     fontSize: 18,
        //     fontWeight: 'bolder',
        //     color: '#86f2ff',
        //   },
        // },
        grid: {
          top: '10%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        // toolbox: {
        //   show: true,
        //   x: 1000,
        //   feature: {
        //     mark: { show: true },
        //     dataView: { show: true, readOnly: false },
        //     magicType: { show: true, type: ['line', 'bar'] },
        //     saveAsImage: { show: true },
        //   },
        // },
        tooltip: {
          trigger: 'axis',
        },
        // dataZoom: [
        //   {
        //     show: true,
        //     realtime: true,
        //     height: 24,
        //     start: 0,
        //     bottom: 8,
        //     end: 20,
        //   },
        //   {
        //     type: 'inside',
        //     realtime: true,
        //     start: 0,
        //     end: 20,
        //   },
        // ],
        xAxis: {
          type: 'category',
          data: [],
          axisLine: {
            show: true,
            interval: 0,
            lineStyle: {
              color: '#fff',
            },
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#fff',
          },
          scale: true,
          splitLine: {
            show: true,
            lineStyle: {
              color: '#0e94f3',
              width: 1,
              type: 'solid',
            },
          },
        },
        series: [
          {
            barWidth: 20,
            itemStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#52d0ff',
                },
                {
                  offset: 1,
                  color: '#00a0e9',
                },
              ]),
            },
            data: [],
            type: 'line',
          },
          {
            barWidth: 20,
            itemStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'yellow',
                },
                {
                  offset: 1,
                  color: 'red',
                },
              ]),
            },
            data: [],
            type: 'line',
          },
        ],
      },
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.$refs.chart.resize()
    })
    let xAxisData = []
    let seriesData0 = []
    let seriesData1 = []
    this.time = setInterval(() => {
      xAxisData.push(this.$dayjs().format('HH:mm:ss'))
      seriesData0.push(Math.floor(Math.random() * 10 + 60))
      seriesData1.push(Math.floor(Math.random() * 10 + 60))
      if (xAxisData.length < 10) {
        this.option.xAxis.data = xAxisData
        this.option.series[0].data = seriesData0
        this.option.series[1].data = seriesData1
      } else {
        xAxisData.shift()
        seriesData0.shift()
        seriesData1.shift()
        this.option.xAxis.data = xAxisData
        this.option.series[0].data = seriesData0
        this.option.series[1].data = seriesData1
      }
    }, 1000)
    // window.addEventListener('touchStart', fn, {
    //   passive: false,
    // })
  },
  destroyed() {
    clearInterval(this.time)
  },
}
</script>
