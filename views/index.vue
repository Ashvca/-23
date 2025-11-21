<template>
  <div class="homeClass">
    <div class="staticClass">
      <LineCharts3d />
    </div>
    <div class="moveClass">
      <grid-layout
        :layout.sync="layout"
        :col-num="10"
        :row-height="64"
        :is-draggable="true"
        :is-resizable="false"
        :is-mirrored="false"
        :vertical-compact="false"
        :responsive="false"
        :autoSize="true"
        :margin="[10, 10]"
        :use-css-transforms="true"
      >
        <grid-item
          v-for="item in layout"
          :static="item.static"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :maxH="item.maxH"
          :minH="item.minH"
          :key="item.i"
          @move="moveEvent"
          style="pointer-events: auto"
        >
          <component :is="item.components" :info="item.propsInfo"></component>
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script>
import { GridLayout, GridItem } from 'vue-grid-layout'
import LineCharts3d from '@/views/examples/echarts/lineCharts3d.vue'
import BarCharts from '@/views/examples/echarts/barCharts.vue'
import RadarCharts from '@/views/examples/echarts/radarCharts.vue'
import LineCharts from '@/views/examples/echarts/lineCharts.vue'
import DemoTable from '@/views/examples/demo/table.vue'
import DemoTableState from '@/views/examples/demo/tableState.vue'
import DemoTableInfo from '@/views/examples/demo/tableInfo.vue'
import DemoCalcNum from '@/views/examples/demo/calcNum.vue'
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: 'AboutView',
  //import引入的组件需要注入到对象中才能使用
  components: {
    GridLayout,
    GridItem,
    LineCharts3d,
    BarCharts,
    LineCharts,
    DemoTable,
    RadarCharts,
    DemoTableState,
    DemoCalcNum,
    DemoTableInfo,
  },
  data() {
    return {
      map: [],
      layout: [
        {
          x: 0,
          y: 0,
          w: 2,
          h: 4,
          i: '0',
          maxH: 10,
          minH: 2,
          static: false,
          name: 'BarCharts',
          components: '',
        },
        // {
        //   x: 2,
        //   y: 0,
        //   w: 6,
        //   h: 10,
        //   i: '1',
        //   maxH: 10,
        //   minH: 2,
        //   static: true,
        //   components: 'lineCharts3d',
        // },
        {
          x: 8,
          y: 0,
          w: 2,
          h: 4,
          i: '2',
          maxH: 10,
          minH: 2,
          static: false,
          name: 'LineCharts',
          components: '',
        },
        {
          x: 0,
          y: 4,
          w: 2,
          h: 4,
          i: '3',
          maxH: 10,
          minH: 2,
          static: false,
          name: 'RadarCharts',
          components: '',
        },
        {
          x: 8,
          y: 4,
          w: 2,
          h: 4,
          i: '4',
          maxH: 10,
          minH: 2,
          static: false,
          name: 'DemoTable',
          components: '',
        },
        {
          x: 0,
          y: 8,
          w: 2,
          h: 4,
          i: '5',
          maxH: 10,
          minH: 2,
          static: false,
          name: 'DemoTableState',
          components: '',
        },
        {
          x: 2,
          y: 10,
          w: 3,
          h: 2,
          i: '6',
          maxH: 10,
          minH: 2,
          static: false,
          propsInfo: { info: '信息同步统计', endVal: 1954221678, suffix: '次' },
          name: 'DemoCalcNum',
          components: '',
        },
        {
          x: 5,
          y: 10,
          w: 3,
          h: 2,
          i: '7',
          maxH: 10,
          minH: 2,
          static: false,
          propsInfo: { info: '存储数据总量', endVal: 3719421678, suffix: '条' },
          name: 'DemoCalcNum',
          components: '',
        },
        {
          x: 8,
          y: 8,
          w: 2,
          h: 4,
          i: '8',
          maxH: 10,
          minH: 2,
          static: false,
          name: 'DemoTableInfo',
          components: '',
        },
      ],
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    moveEvent(i, x, y) {
      //   1 根据移动位置，循环数据源当前位置是否有元素,不包含自己的位置
      const finditem = this.map.filter((item) => {
        return (
          item.x === x && item.y === y && item.i != i && item.static == false
        )
      })[0]
      if (!finditem) return
      this.changePosition(
        this.layout.find((item) => item.i === i),
        finditem
      )
    },
    // 交换位置：
    changePosition(item1, item2) {
      // 定义中间变量交换
      const temp = this._.cloneDeep(item1)
      //   注意：修改的是影响显示的实际数组 layout
      this.layout.forEach((item) => {
        // 找到 item1,将 item1 的信息换成item2
        if (item.i === item1.i) {
          item.x = item2.x
          item.y = item2.y
        }
        if (item.i === item2.i) {
          item.x = temp.x
          item.y = temp.y
        }
      })
      // 实现交换后，及时同步 数据映射
      this.map = this._.cloneDeep(this.layout)
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.map = JSON.parse(JSON.stringify(this.layout))
    setTimeout(() => {
      for (let i = 0; i < this.layout.length; i++) {
        this.layout[i].components = this.layout[i].name
      }
    }, 1000)
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入公共css类 */
.vue-grid-item {
  border: solid #86f2ff 1px;
  box-shadow: 0 0 15px 3px #86f2ff inset;
  border-radius: 7px;
  background-color: #00000066;
}
.homeClass {
  height: 100%;
  .staticClass {
    position: relative;
    height: 100%;
  }
  .moveClass {
    position: absolute;
    height: 90%;
    width: 100%;
    pointer-events: none;
    top: 10%;
    overflow: auto;
  }
}
</style>
