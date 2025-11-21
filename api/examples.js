import request from '@/utils/request'

/**
 * 请求案例
 * @param {*} params
 * @param {*} loadingMask
 * @param {*} loadingMaskText
 * @returns
 */
export const examples = (params, loadingMask, loadingMaskText) => {
  return request({
    url: '/examples',
    method: 'post',
    loadingMask,
    loadingMaskText,
    params,
  })
}
