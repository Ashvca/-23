import Mock from 'mockjs'
import { parseQueryString } from './utils'

let password = ''
export default [
  {
    url: process.env.VUE_APP_BASE_API + '/login',
    type: 'post',
    response: (config) => {
      let resData = parseQueryString(config.url)
      password = resData.password
      return {
        code: 200,
        message: '成功',
        data: {
          roleId: resData.username === 'admin' ? 'admin' : 'user',
        },
      }
    },
  },
  {
    url: process.env.VUE_APP_BASE_API + '/changePwd',
    type: 'post',
    response: (config) => {
      let resData = parseQueryString(config.url)
      if (resData.oldPwd === password) {
        password = resData.newPwd
        return {
          code: 200,
          message: '成功',
        }
      } else {
        return {
          code: 400,
          message: '旧密码输入错误',
        }
      }
    },
  },
]
