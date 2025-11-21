<template>
  <div class="tableClass">
    <dv-scroll-board :config="config" style="width: 100%; height: 100%" />
  </div>
</template>
<script>
export default {
  name: 'Table',
  components: {},
  props: {},
  data() {
    return {
      config: {
        header: ['序号', '城市', '降雨量(㎜)'],
        data: [],
        align: ['center', 'center', 'center'],
        headerBGC: '#86f2ff4d',
        oddRowBGC: '',
        evenRowBGC: '',
      },
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    for (let i = 1; i < 21; i++) {
      this.config.data.push([i, '城市' + i, (Math.random() * 10).toFixed(3)])
    }
  },
  beforeDestroy() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.tableClass {
  height: 100%;
  padding: 10px;
}
</style>
