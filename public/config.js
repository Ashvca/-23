/**
 * 子系统
 */
var sysKey = 'ZCJ'
/**
 * 基础配置信息
 */
const systemList = {
  ZCJ: {
    id: 3,
    name: '赵晨吉测试项目',
    ip: 'localhost',
    port: 8081,
  },
}

var BaseConfig = {}
BaseConfig.sysNo = sysKey
BaseConfig.subsystem = systemList[sysKey]

BaseConfig.ipAndPort = BaseConfig.subsystem.ip + ':' + BaseConfig.subsystem.port

BaseConfig.baseUrl = 'http://' + BaseConfig.ipAndPort

BaseConfig.wsUrl = 'ws://' + BaseConfig.subsystem.ip
