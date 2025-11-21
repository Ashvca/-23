import request from '@/utils/request'

/**
 * 登录请求
 * @param {*} params username, password 用户名和密码
 * @returns
 */
export const login = (params) => {
  return request({
    url: '/login',
    method: 'post',
    data: params,
  })
}

// 修改密码
export const changePwd = (params) => {
  return request({
    url: '/changePwd',
    method: 'post',
    data: params,
  })
}
