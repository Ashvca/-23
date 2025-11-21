<template>
  <v-chart ref="chart" style="height: 100%; width: 100%" :option="option" />
</template>

<script>
import VChart from 'vue-echarts'
import * as echarts from 'echarts'
import 'echarts-gl'

export default {
  name: 'LineCharts3d',
  components: {
    VChart,
  },
  data() {
    return {
      routes: [],
      option: {
        backgroundColor: '#000',
        // backgroundColor: '#105387',
        // title: {
        //   text: '当前课程报名情况',
        //   textStyle: {
        //     fontSize: 18,
        //     fontWeight: 'bolder',
        //     color: '#86f2ff',
        //   },
        // },
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
        // tooltip: {
        //   trigger: 'axis',
        // },
        globe: {
          baseTexture: '/img/world.jpg',
          heightTexture: '/img/worldGrey.jpg',
          shading: 'lambert',
          light: {
            ambient: {
              intensity: 0.8,
            },
            main: {
              intensity: 1,
            },
          },
          viewControl: {
            autoRotate: false,
          },
        },
        series: [
          {
            type: 'lines3D',
            coordinateSystem: 'globe',
            //   blendMode: 'lighter',
            blendMode: 'source-over',
            effect: {
              show: true,
              trailWidth: 2,
              trailLength: 0.1,
              trailColor: '#86f2ff',
              trailOpacity: 1,
            },
            lineStyle: {
              width: 1,
              color: '#86f2ff',
              opacity: 0.1,
            },
            data: [],
          },
          {
            type: 'lines3D',
            coordinateSystem: 'globe',
            //   blendMode: 'lighter',
            blendMode: 'source-over',
            effect: {
              show: true,
              trailWidth: 2,
              trailLength: 0.1,
              trailColor: 'yellow',
              trailOpacity: 1,
            },
            lineStyle: {
              width: 1,
              color: 'yellow',
              opacity: 0.1,
            },
            data: [],
          },
        ],
      },
    }
  },
  mounted() {
    this.$.getJSON('/flights.json', (data) => {
      // 将读取到的json数据赋值给rows
      function getAirportCoord(idx) {
        return [data.airports[idx][3], data.airports[idx][4]]
      }
      this.routes = data.routes.map((airline) => {
        return [getAirportCoord(airline[1]), getAirportCoord(airline[2])]
      })
      let data0 = this.routes.slice(0, this.routes.length / 2)
      let data1 = this.routes.slice(this.routes.length / 2)
      this.option.series[0].data = data0
      this.option.series[1].data = data1
    })
    window.addEventListener('resize', () => {
      this.$refs.chart.resize()
    })
    // window.addEventListener('touchStart', fn, {
    //   passive: false,
    // })
  },
}
</script>
