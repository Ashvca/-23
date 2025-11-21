<template>
  <div id="app">
    <full-screen v-if="$settings.layout.autoResize.enabled">
      <router-view />
    </full-screen>
    <router-view v-else />
  </div>
</template>

<script>
import FullScreen from '@/components/FullScreen/'
import { testToken } from '@/api/token'

export default {
  name: 'App',
  components: {
    FullScreen,
  },
  created() {
    //界面不可选择拉取选择文字
    document.onselectstart = (e) => {
      return false
    }
    //刷新验证token
    // testToken()
    //   .then((e) => {
    //     // console.log(e)
    //   })
    //   .catch((e) => {
    //     // console.log(e)
    //   })
    //界面刷新前，将vuex数据保存至sessionStorage中，使用sessionStorage的原因是关闭界面后会删除数据，localStorage会一直保存直到清除缓存
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
    //如果sessionStorage中有数据，重新赋值给vuex，并删除sessionStorage中的数据
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem('store'))
        )
      )
      sessionStorage.removeItem('store')
    }
  },
  methods: {},
}
</script>
