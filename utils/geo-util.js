import { propagate, twoline2satrec, gstime, eciToGeodetic } from 'satellite.js'
const degPerRad = 180 / 3.141592653589793
/**
 * 根据tle获取模拟经纬高数据
 * @returns
 */
export function mockTleData(tleText, cnt) {
  const line = tleText.split(/[\n]/)
  const satrec = twoline2satrec(line[0].trim(), line[1].trim())
  const secondLineStr = line[1].split(/\s+/)
  const T = 1440 / Number(secondLineStr[7].substr(0, 10))
  const slices = cnt || 50
  const allData = new Array(slices)
  const date13 = Date.parse('2022-03-16 09:53')
  const date14 = Date.parse('2022-03-17 09:53')
  const ddate = (date14 - date13) / slices
  const totalTime = (ddate * slices) / 60000
  const str =
    '运行时间为' +
    totalTime +
    '分钟，轨道周期为' +
    T +
    '分钟，共计' +
    totalTime / T +
    '个周期！'
  console.log(str)
  for (var i = 0; i < slices; ++i) {
    var dt = Date(date13 + i * ddate)
    const x = {}
    const positionAndVelocity = propagate(satrec, new Date(date13 + i * ddate))
    const positionEci = positionAndVelocity.position
    const gmst = gstime(new Date(date13 + i * ddate))
    const positionGd = eciToGeodetic(positionEci, gmst)
    const longitude = positionGd.longitude * degPerRad
    const latitude = positionGd.latitude * degPerRad
    const height = positionGd.height
    x.longitude = longitude
    x.latitude = latitude
    x.height = height / (6378.1 / 15)
    allData[i] = x
  }
  return allData
}
/**
 * 将经纬度转换为秒表示
 * @param {经纬度} val
 * @returns
 */
export function coordinate2Degree(input) {
  let val = input
  if (typeof input === 'number') {
    val = input.toString()
  }
  let duVal = 0
  let fenVal = 0
  let miaoVal = 0
  let fractionVal = 0
  const pos = val.indexOf('.')
  if (pos != -1) {
    duVal = parseFloat(val.substring(0, pos))
    fractionVal = parseFloat(val.substring(pos)) * 60
    let tempF = fractionVal.toString()
    const posF = tempF.indexOf('.')
    if (posF != -1) {
      fenVal = parseFloat(tempF.substring(0, posF))
      miaoVal = parseFloat(tempF.substring(posF)) * 60
    }
  } else {
    duVal = parseFloat(val)
  }
  return (
    (Math.abs(duVal * 3600) + fenVal * 60 + miaoVal) *
    (parseFloat(input) < 0 ? -1 : 1)
  )
}
/**
 *
 * @param {经纬度} val
 * @param {最大的度数} maxDegree
 * @param {像素长度} length
 * @returns
 */
export function degree2Pixel(val, maxDegree, length) {
  const degree = coordinate2Degree(val)
  const total = maxDegree * 3600
  return (Math.abs(degree) / total) * length
}
