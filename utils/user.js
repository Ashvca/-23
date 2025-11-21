import Cookies from 'js-cookie'
import settings from '@/settings.js'

const userInfoKey = 'zcjUserInfo'

// 获取用户信息
export function getUserInfo() {
  const data = Cookies.get(userInfoKey)
  if (data) {
    const array = data.split('/')
    return {
      username: array[0],
      roleId: array[1],
      token: array[2],
      img: array[3],
    }
  } else {
    return {
      username: '',
      roleId: '',
      token: '',
    }
  }
}

// 设置用户信息
export function setUserInfo(username, roleId, save, token) {
  if (save) {
    // 登录有效期
    return Cookies.set(userInfoKey, `${username}/${roleId}/${token}`, {
      expires: settings.login.loginExpires,
    })
  } else {
    // 浏览器退出则失效
    return Cookies.set(userInfoKey, `${username}/${roleId}/${token}`)
  }
}

// 删除权限
export function removeUserInfo() {
  return Cookies.remove(userInfoKey)
}
