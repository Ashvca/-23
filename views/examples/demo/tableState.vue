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
        header: ['序号', '城市', '传输状态'],
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
      this.config.data.push([i, '城市' + i, '正常'])
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
