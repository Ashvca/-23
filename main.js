import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import dayjs from 'dayjs';
import '../mock'

import _ from 'lodash' //引入解决数据处理问题
import 'default-passive-events' // 解决浏览器警告问题
import '@/styles/index.scss' // 全局缺省样式
import '~theme/index.scss' // 引用主题样式
import '@/assets/font/iconfont.css' // 引入字体
import '@/permission' // 路由跳转许可功能
import dataV from '@jiaminghi/data-view'
import settings from '@/settings' // 全局变量
import roleDirective from '@/utils/role-directive.js' //引入角色指令
import $ from 'jquery'

Vue.prototype.$_ = _
// 显示生产模式的消息。
Vue.config.productionTip = false
// 使用elementui 插件
Vue.use(Element, { size: 'mini' })
// settings注册全局组件
Vue.prototype.$settings = settings
Vue.prototype.$dayjs = dayjs
Vue.prototype.$ = $
// 事件总线
Vue.prototype.$eventBus = new Vue()

Vue.use(dataV)
// 测试
const { init } = require('../mock')
init()

// 增加角色指令
Vue.directive('roles', roleDirective)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
