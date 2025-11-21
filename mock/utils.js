export const parseQueryString = (url) => {
  let arr = url.split('?')
  let params = arr[1].split('&')
  let result = {}
  params.map((item) => {
    let arrParams = item.split('=')
    result[arrParams[0]] = arrParams[1]
  })
  return result
}
