# 综合保障系统前端
## 功能描述
1. 顶部状态栏 
1. 创建试验项目 
1. 导航信号模拟 
1. 导航信号模拟设备 
1. 抗干扰天线 
1. 抗干扰天线-1 
1. 实时任务-2 
1. 首页 

## 操作方法

- 程序启动：npm install
- 程序运行：npm run serve
- 程序编译：npm run bulid
- 代码全部格式化：npm run lint

## 技术栈

- Vue2.6
- Vuex
- vue-router
- element-ui

## 格式化

工程采用 eslint + prettier，eslint 进行格式检测，prettier 进行代码格式化，
使用时，请确保 vetur prettier Eslint 三个插件是否正确安装，如果正确安装，则
选择 prettier 进行格式化，可以通过右键‘使用...格式化文档’进行设置.

## vuex自动生成
采用plop进行模板生成，需要在终端键入yarn|npm run plop，根据提示进行输入即可，创建的store相关的文件在src/store/modules下，项目的store无需引入，项目初始对所有的store按照modules目录自动引入
###1 使用 this.$store.state.{命名空间}.{属性}
###2 action使用 
this.$store.dispatch('{{命名空间}}/{{action名称}}')

## 组件介绍

### 设备状态 DevStatus 组件

- 功能：实现车辆和车辆状态的显示
- 组件参数：

```// 显示区域宽度
    width: {
      type: Number,
      default: 946,
    },
    // 显示区域高度
    height: {
      type: Number,
      default: 356,
    },
    // 半径控制文字显示位置
    radius: {
      type: Number,
      default: 220,
    },
    // 清空半径隐藏连线
    clearRadius: {
      type: Number,
      default: 220 * 0.6,
    },
    // 颜色
    color: {
      type: Object,
      default() {
        return {
          normal: '#24cd1a', // 正常
          warn: '#d8c411', // 告警
          fault: '#fe533e', // 故障
          offline: '#999999', // 离线
          line: '#ffffff', // 线
        };
      },
    },
    // 状态文字
    statusText: {
      type: Object,
      default() {
        return {
          normal: '正常',
          warn: '告警',
          fault: '故障',
          offline: '离线',
        };
      },
    },
    // 是否显示光圈
    showHalo: {
      type: Boolean,
      default: true,
    },
    haloColor: {
      type: String,
      default: '#9ad50d',
    },
    // 车辆图片
    carImg: {
      type: String,
      default: require('@/assets/device/car.png'),
    },
    // 背景图片
    bgImg: {
      type: String,
      default: require('@/assets/device/bg.png'),
    },
    // 显示数据
    showData: {
      type: Object,
      required: true,
    },
```

- 显示数据格式

```
{
  title: '一号多模复合航信号模拟器-单行/合路',  // 标题
  icon: require('@/assets/device/1.png'), // 图标
  status: 'normal', // 状态 normal 正常、fault 故障、warn 警告、offline 离线
}
```

### 车辆位置组件 CarLocation 组件

- 功能：实现本地车辆位置和远端车辆位置显示
- 注意：远端车辆最好不要超过 3 辆，所有的角度都是以正东为 0° 顺时针旋转的，dist 距离参数为数字型number单位km angle单位度也是数字型的
- 组件参数：

```
locationData: {
  latitude: '北纬 39°54′27″',
  longitude: '东经 116°23′17″',
  height: '高度 800M',
  angle: 45, // 北为0 顺时针角度
},
carData: [
  {
    name: '车辆一',
    latitude: '北纬 39°54′27″',
    longitude: '东经 116°23′17″',
    height: '高度 800M',
    dist: 10.2, // 距离单位为公里
    angle: 180, // 北为0 顺时针角度
  },
  {
    name: '车辆三',
    latitude: '北纬 39°54′27″',
    longitude: '东经 116°23′17″',
    height: '高度 800M',
    dist: 20.2, // 距离单位为公里
    angle: 359, // 北为0 顺时针角度
  },
  {
    name: '车辆二',
    latitude: '北纬 39°54′27″',
    longitude: '东经 116°23′17″',
    height: '高度 800M',
    dist: 20.1, // 距离单位为公里
    angle: 15, // 北为0 顺时针角度
  },
],
```

### SatelliteMap 星空图组件
- 功能：实现星空图
- 注意：不要修改星空图的宽高，因为包含运算修改宽高后影响显示效果。
- 组件参数：
```
       {
          info: {
            name: '测试卫星1', // 卫星名称
            labels: ['经度: xxxx.xxx.xx', '维度: xxx.xx.xx'], // 信息这是一个字符串数组样式会自动调整
          },
          distance: 1, // 距离时百分比0~1,需要根据真实数据换算
          angle: 0,  // 卫星角度，顺时针0~360度
        },
```

### PitchMeter RollMeter CourseMeter 航空表盘组件
- 功能：实现航向、俯仰、横滚表盘
- 注意：不要修改表盘大小
- 数据接口：向组件内传入value值即可

### Path3D 轨迹三维图组件
- 功能：在XYZ三位空间展示轨迹
- 注意：不要随意修改参数，新建工程或者移植时需要按照three.js 模块，看package.json文件
- 所有的三位功能是在three.js 这个文件中实现的，其中暴露出来了三个方法，如果修改参数或者特殊需求联系公司，不要自行修改。
- 方法一： 对三维组件进行初始化
```
/**
 * 初始化
 * @param {*} handle 操作的句柄，用户不需要操作
 * @param {*} width 组件宽度
 * @param {*} height 组件大小
 * @param {*} baseLineLen 基线长度
 * @param {*} dom 希望增加到那个元素下
 * @param {*} cameraSize 镜头初始位置，可理解为显示范围
 */
export const init = (handle, width, height, baseLineLen, dom, cameraSize) => {}
```
- 方法二：增加一个轨迹点,注意如果超过200个轨迹点最先设置的轨迹点会移除
```
/**
 * 增加一个轨迹点
 * @param {*} handle 句柄
 * @param {*} x 轨迹点x坐标
 * @param {*} y 轨迹点y坐标
 * @param {*} z 轨迹点z坐标
 */
export const addPath = (handle, x, y, z) => {}
```
- 方法三：重置镜头
```
/**
 * 重置镜头
 * @param {*} handle 操作句柄
 */
export const resetCamera = (handle) => {}
```
