<template>
  <div :id="moveDiv">
    <el-card class="theme-moveCard">
      <div :id="move" slot="header" class="move">
        <div>样例</div>
        <i class="el-icon-close" @click="changeActive"></i>
      </div>
      <div>
        <el-button class="theme-button" @click="changeActive">退出</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import { addMoveDiv } from '@/utils/move'
export default {
  name: 'MoveDiv',
  components: {},
  props: {
    moveDiv: {
      type: String,
      default: '',
    },
    move: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    addMoveDiv(this.moveDiv, this.move)
  },
  beforeDestroy() {},
  methods: {
    changeActive() {
      this.$emit('fun')
    },
  },
}
</script>

<style lang="scss" scoped></style>
