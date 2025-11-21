/*
 * 实现路由跳转的管理功能,进行拦截，如果你以后想
 * 关于路由的其他功能，就在这个文件修改吧
 */
import router from './router'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css'
import store from '@/store'
import settings from '@/settings.js'
import { getUserInfo } from '@/utils/user'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 权限检测
const roleCheck = (node) => {
  // 检测是否使用权限管理
  if (settings.role.enabled === false) {
    return true
  }
  if (settings.role.enabledRouter === false) {
    return true
  }
  // 没设置权限直接过
  if (node.meta.roles === undefined) {
    return true
  }
  // return node.meta.roles.find((index) => index === store.getters.roleId)
  return node.meta.roles.find((index) => index == getUserInfo().roleId)
}

// 有验证的路由守卫
const verifyBeforeEach = (to, from, next) => {
  // 启动进度条
  NProgress.start()
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${settings.title}-${to.meta.title}`
  } else {
    document.title = settings.title
  }
  // 获取角色ID
  const roleId = getUserInfo().roleId
  console.log('角色ID' + roleId)
  if (roleId) {
    // 角色ID存在就不需要跳转到登录了，直接到home
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // 权限检测
      if (roleCheck(to)) {
        next()
      } else {
        next({ path: '/' })
      }
    }
  } else {
    if (to.path === '/login') {
      next() // 这里防止递归
    } else {
      // 记录之后要跳转的地方
      next(`/login?redirect=${to.path}`)
      // next()
      NProgress.done()
    }
  }
}

const defaultBeforEach = (to, from, next) => {
  NProgress.start()
  if (to.meta.title) {
    document.title = `${settings.title}-${to.meta.title}`
  } else {
    document.title = settings.title
  }
  // 没有login不需要跳转
  if (to.path === '/login') {
    next({ path: '/' })
  }
  next()
}

router.beforeEach(settings.login.enabled ? verifyBeforeEach : defaultBeforEach)

router.afterEach(() => {
  // 跳转结束关闭进度条
  NProgress.done()
})
