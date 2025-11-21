<template>
  <div class="tableClass">
    <dv-scroll-ranking-board
      :config="config"
      style="width: 100%; height: 100%"
    />
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
        data: [],
      },
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    for (let i = 1; i < 21; i++) {
      this.config.data.push({
        name: '测试' + i,
        value: Math.floor(Math.random() * 30 + 10),
      })
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
::v-deep .dv-scroll-ranking-board .ranking-info .rank {
  color: #2ab9f4;
}
::v-deep .dv-scroll-ranking-board .ranking-column .inside-column {
  background-color: #2ab9f4;
}
::v-deep .dv-scroll-ranking-board .ranking-column .shine {
  position: absolute;
  left: 0%;
  top: 0px;
  height: 5px;
  width: 50px;
  transform: translateX(-100%);
  background: radial-gradient(#ffffff 5%, transparent 80%);
  -webkit-animation: shine 3s ease-in-out infinite alternate;
  animation: shine 3s ease-in-out infinite alternate;
}
</style>
