/**
 * 针对ajax进行二次封装
 * 一、实现基本的默认参数配置
 * 二、封装loadingMask 遮罩操作
 */
import axios from 'axios'
import { Loading, Message, MessageBox } from 'element-ui'
import serverPath from './serverPath'
import { getUserInfo, removeUserInfo } from './user'
import store from '@/store'
import router from '@/router'

// 创建服务
const service = axios.create({
  baseURL: serverPath.serverPath, // url = base url + request url
  timeout: 5000, // 请求超时时间
  method: 'post',
})
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    if (config.loadingMask) {
      config.loading = Loading.service({
        target: config.loadingMask,
        background: 'rgba(12, 69, 184, 0.8)',
        spinner: 'el-icon-loading',
        text:
          config.loadingMaskText != undefined
            ? config.loadingMaskText
            : '加载中...',
      })
    }
    config.headers['token'] = getUserInfo().token ? getUserInfo().token : ''
    config.headers['username'] = getUserInfo().username
      ? getUserInfo().username
      : ''
    // 关闭
    if (config.loading) {
      config.loading.close()
    }
    return config
  },
  (error) => {
    // 发生错误了进行关闭
    if (config.loading) {
      config.loading.close()
    }
    return Promise.reject(error)
  }
)

// 应答拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code === 200 || res.code === 0) {
      return res
    } else if (res.code === 99) {
      Message({
        message: res.msg || '错误',
        type: 'error',
        duration: 5 * 1000,
        customClass: 'theme-message',
      })
      router.push('/').catch((err) => err)
    } else {
      Message({
        message: res.msg || '错误',
        type: 'error',
        duration: 5 * 1000,
        customClass: 'theme-message',
      })
      // return Promise.reject(new Error(res.message || 'Error'))
    }
  },
  (error) => {
    if (error.response && error.response.data && error.response.data.message) {
      Message({
        message: error.response.data.message,
        type: 'error',
        duration: 5 * 1000,
      })
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000,
      })
    }
    return Promise.reject(error)
  }
)
export default service
