<template>
  <div class="calcNumClass">
    <dv-decoration-7
      style="width: 190px; height: 30px; font-size: 24px; color: #86f2ff"
    >
      {{ info.info }}</dv-decoration-7
    >

    <CountTo
      :start-val="startVal"
      :end-val="endVal"
      :duration="2500"
      class="count-number"
      :useEasing="true"
      :suffix="suffix"
    ></CountTo>
  </div>
</template>
<script>
import CountTo from 'vue-count-to'
export default {
  name: 'calcNum',
  components: {
    CountTo,
  },

  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      startVal: 0,
      suffix:'',
      endVal: 1954221678,
    }
  },
  computed: {},
  watch: {
    info: {
      handler(e) {
        this.endVal = e.endVal
        this.suffix = e.suffix
      },
      deep: true,
      immediate: true,
    },
  },
  created() {},
  mounted() {
    setInterval(() => {
      this.startVal = this.endVal
      this.endVal += Math.floor(Math.random() * 30 + 10)
    }, 1000)
    // for (let i = 1; i < 21; i++) {
    //   this.config.data.push({
    //     name: '测试' + i,
    //     value: Math.floor(Math.random() * 30 + 10),
    //   })
    // }
  },
  beforeDestroy() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.calcNumClass {
  height: 100%;
  padding: 10px;
  text-align: center;
  color: #ff0;
  font-size: 40px;
}
</style>
