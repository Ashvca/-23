import Layout from '@/layout'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//redirect是重定向,可以理解为访问该网址时,指向重定向的界面
const examples = []

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: () => import('@/views/index.vue'),
        meta: {
          title: '首页',
        },
      },
    ],

  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    meta: {
      title: '登录',
    },
  },
  // 错误页面
  {
    path: '*',
    redirect: '/error',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/error',
        component: () => import('@/views/error/index'),
        hidden: true,
        meta: {
          title: '错误',
        },
      },
    ],
  },
  // 案例在开发时删除
  ...examples,
]

export default new VueRouter({
  mode: 'history',
  routes,
})
