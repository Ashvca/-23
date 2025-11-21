// 在这里输出全局配置参数
//console.log(window.BaseConfig)
// if (window.BaseConfig == null || window.BaseConfig == undefined) {
//   this.$router.push('/home')
// }
const baseConfig = window.BaseConfig
const baseURL = baseConfig.ipAndPort

// const subsystem = ''

/**
 * http 请求路径
 */
const serverPath = 'http://' + baseURL
/**
 * ws 请求路径
 */
const wsPath = 'ws://' + baseURL + '/'

const uploadImgUrl = serverPath + '/file/uploadImg'
const downloadFileUrl = serverPath + '/file/download/'

export default {
  serverPath,
  wsPath,
  uploadImgUrl,
  downloadFileUrl,
}
