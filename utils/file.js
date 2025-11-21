export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    let fileInfo = {
      fileName: '',
      fileBase64: '',
    }
    //将文件转成DataURL格式  也就是base64编码
    reader.readAsDataURL(file)
    //开始转
    reader.onload = () => {
      fileInfo.fileBase64 = reader.result
    }
    //转 失败
    reader.onerror = (error) => {
      reject(error)
    }
    //转 结束
    reader.onloadend = () => {
      fileInfo.fileName = file.name
      resolve(fileInfo)
    }
  })
}

export function base64ToBlob(b64, contentType) {
  let size = 512
  return new Promise((resolve, reject) => {
    let byteCharacters = atob(b64)
    let byteArrays = []
    for (let index = 0; index < byteCharacters.length; index += size) {
      let slice = byteCharacters.slice(index, (index += size))
      let byteNumbers = []
      for (let i = 0; i < slice.length; i++) {
        byteNumbers.push(slice.charCodeAt(i))
      }
      byteArrays.push(new Uint8Array(byteNumbers))
    }
    let result = new Blob(byteArrays, { type: contentType })
    result = Object.assign(result, {
      preview: URL.createObjectURL(result),
      name: `img.png`,
    })
    //转 结束
    resolve(result)
  })
}
