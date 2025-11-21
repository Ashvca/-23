<template>
  <span class="location-date"> {{ label }}：{{ localTime }} </span>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'LocationDate',
  props: {
    label: {
      type: String,
      default: '本地时间',
    },
  },
  data() {
    return {
      localTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    }
  },
  mounted() {
    //启动定时器刷新本地时间
    setInterval(() => {
      this.localTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    }, 1000)
  },
}
</script>
