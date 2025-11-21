import Mock from 'mockjs'
import { parseQueryString } from './utils'

export default [
  {
    url: process.env.VUE_APP_BASE_API + '/examples',
    type: 'post',
    response: (config) => {
      let resData = parseQueryString(config.url)
      let type = resData.type
      if (type === 'success') {
        return {
          code: 200,
          message: '成功',
          data: {
            text: '请求成功信息',
          },
        }
      } else {
        return {
          code: 500,
          message: '模拟请求失败信息',
        }
      }
    },
  },
]
