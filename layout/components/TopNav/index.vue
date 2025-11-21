<template>
  <el-row class="topNavClass">
    <el-col :span="6" class="flexClass"> {{ sysTime }} </el-col>
    <el-col :span="12">
      <h1 class="title">{{ $settings.title }}</h1>
      <!-- <div class="title">
        {{ $settings.title }}
      </div> -->
      <dv-decoration-5
        :color="['#43ffc4', '#43ffc4']"
        :dur="5"
        class="headLineClass"
      />
    </el-col>
    <el-col :span="6" class="flexClass"> {{ currentTime }} </el-col>
  </el-row>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
// import ModelSelect from './components/ModelSelect.vue'
// import LocationDate from './components/LocationDate.vue'

export default {
  name: 'TopNav',

  data() {
    return {
      info: '',
      time: null,
      currentTime: '',
      sysTime: '',
    }
  },
  computed: {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.time = setInterval(() => {
        this.currentTime =
          '北京时间：' + this.$dayjs().format('YYYY-MM-DD HH:mm:ss')
        this.sysTime =
          '系统时间：' +
          this.$dayjs().add(8, 'hour').format('YYYY-MM-DD HH:mm:ss')
      }, 1000)
    },
  },
  destroyed() {
    clearInterval(this.time)
  },
}
</script>

<style lang="scss" scoped>
@import '~theme/index.scss';
.topNavClass {
  color: #43ffc4;
  height: 10%;
  .el-col {
    height: 100%;
  }
  .headLineClass {
    width: 50%;
    height: 60%;
    position: absolute;
    /* padding-top: 34px; */
    bottom: 0;
  }
  .title {
    /* text-align: center; */
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
  }
  .flexClass {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
  }
}
</style>
