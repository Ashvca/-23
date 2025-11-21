import request from '@/utils/request'

//token验证

export const testToken = () => {
  return request({
    url: '/testToken',
    method: 'post',
  })
}
