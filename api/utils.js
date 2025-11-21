import request from '@/utils/request'

//文件上传接口
export const fileUpload = (params) => {
  return request({
    url: '/fileManage/fileUpload',
    method: 'post',
    contentType: 'multipart/form-data',
    processData: false,
    data: params,
  })
}
//文件上传 传文件给后台
export const changePhotoByFile = (params) => {
  return request({
    url: '/changePhotoByFile',
    method: 'post',
    contentType: 'multipart/form-data',
    processData: false,
    data: params,
  })
}
//文件上传 传base64
export const fileUploadBase64 = (params) => {
  return request({
    url: '/fileManage/fileUploadBase64',
    method: 'post',
    data: params,
  })
}
