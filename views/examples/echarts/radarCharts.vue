<template>
  <v-chart ref="chart" :option="option" />
</template>

<script>
import VChart from 'vue-echarts'
import * as echarts from 'echarts'

export default {
  name: 'RadarChart',
  components: {
    VChart,
  },

  data() {
    return {
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
          trigger: 'item',
        },

        visualMap: {
          top: 'middle',
          right: 10,
          color: ['red', 'yellow'],
          calculable: true,
        },
        radar: {
          indicator: [
            { text: 'test1', max: 400 },
            { text: 'test2', max: 400 },
            { text: 'test3', max: 400 },
            { text: 'test4', max: 400 },
            { text: 'test5', max: 400 },
          ],
        },
        series: [],
      },
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.$refs.chart.resize()
    })

    let seriesData = []
    for (let i = 0; i <= 28; i++) {
      seriesData.push({
        type: 'radar',
        symbol: 'none',
        lineStyle: {
          width: 1,
        },
        emphasis: {
          areaStyle: {
            color: 'rgba(0,250,0,0.3)',
          },
        },
        data: [
          {
            value: [
              (40 - i) * 10,
              (38 - i) * 4 + 60,
              i * 5 + 10,
              i * 9,
              (i * i) / 2,
            ],
            name: i + 2000 + '',
          },
        ],
      })
    }
    this.option.series = seriesData

    // window.addEventListener('touchStart', fn, {
    //   passive: false,
    // })
  },
  destroyed() {},
}
</script>
