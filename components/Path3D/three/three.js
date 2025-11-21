// 引入three框架
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// 创建文字
const createText = (text, color) => {
  let canvas = document.createElement('canvas')
  let context = canvas.getContext('2d')
  canvas.width = 30
  canvas.height = 30
  context.font = '18px bold 黑体'
  context.fillStyle = color
  context.textBaseline = 'top'
  context.fillText(text, 20, 10)

  var spriteMaterial = new THREE.SpriteMaterial({
    map: new THREE.CanvasTexture(canvas),
    sizeAttenuation: true,
  })
  var sprite = new THREE.Sprite(spriteMaterial)
  sprite.scale.set(38, 38, 1)
  return sprite
}

// 创建线
const createLine = (param) => {
  // 创建线
  let group = new THREE.Group()
  let box = new THREE.BoxGeometry(param.size.x, param.size.y, param.size.z)
  let cylinde = new THREE.CylinderGeometry(1, 5, 20, 20)
  let mesh = new THREE.Mesh(
    cylinde,
    new THREE.MeshLambertMaterial({ color: param.color })
  )
  let text = null
  // x 轴方向
  if (param.size.x !== 1) {
    cylinde.rotateX(Math.PI / 2)
    mesh.position.set(0, 0, param.size.x / 2)
    text = createText('X', '#' + param.color.toString(16))
    text.position.set(0, 0, param.size.x / 2 + 30)
  } else if (param.size.y !== 1) {
    cylinde.rotateY(Math.PI / 2)
    mesh.position.set(0, param.size.y / 2, 0)
    text = createText('Z', '#' + param.color.toString(16))
    text.position.set(0, param.size.y / 2 + 25, 0)
  } else {
    cylinde.rotateZ(-Math.PI / 2)
    mesh.position.set(param.size.z / 2, 0, 0)
    text = createText('Y', '#' + param.color.toString(16))
    text.position.set(param.size.z / 2 + 10, 0, 0)
  }
  // 增加锥型
  group.add(mesh)
  // 增加线
  group.add(
    new THREE.Mesh(box, new THREE.MeshLambertMaterial({ color: param.color }))
  )
  // 增加字
  group.add(text)
  return group
}

// 创建基线
const createBaseLine = (baseLineLen, color) => {
  // 创建组
  let group = new THREE.Group()
  group.add(
    createLine({
      size: {
        x: baseLineLen,
        y: 1,
        z: 1,
      },
      color: 0x19ffff,
    })
  )
  group.add(
    createLine({
      size: {
        x: 1,
        y: baseLineLen,
        z: 1,
      },
      color: 0x19ffff,
    })
  )
  group.add(
    createLine({
      size: {
        x: 1,
        y: 1,
        z: baseLineLen,
      },
      color: 0x19ffff,
    })
  )
  return group
}

// 增加光源
const AddLight = (handle) => {
  // 设置点光源
  let point = new THREE.PointLight(0xffffff)
  point.position.set(400, 200, 200) //点光源位置
  handle.scene.add(point)
  // 设置环境光
  let ambient = new THREE.AmbientLight(0x444444)
  handle.scene.add(ambient)
}

// 创建相机
const createCamera = (width, height, x, y, z, cameraSize) => {
  let k = width / height //窗口宽高比
  let s = cameraSize //三维场景显示范围控制系数，系数越大，显示的范围越大
  //创建相机对象
  let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
  camera.position.set(x, y, z) //设置相机位置
  return camera
}

const addRenderer = (handle, width, height, bgColor) => {
  handle.renderer = new THREE.WebGLRenderer({ antialias: true })
  handle.renderer.setSize(width, height) //设置渲染区域尺寸
  handle.renderer.setClearColor(bgColor, 1) //设置背景颜色
  //执行渲染操作   指定场景、相机作为参数
  handle.renderer.render(handle.scene, handle.camera)
}

/**
 * 初始化
 * @param {*} handle 操作的句柄，用户不需要操作
 * @param {*} width 组件宽度
 * @param {*} height 组件大小
 * @param {*} baseLineLen 基线长度
 * @param {*} dom 希望增加到那个元素下
 * @param {*} cameraSize 镜头初始位置，可理解为显示范围
 */
export const init = (handle, width, height, baseLineLen, dom, cameraSize) => {
  // 创建场景
  handle.scene = new THREE.Scene()
  // 增加基线
  handle.scene.add(createBaseLine(baseLineLen, 0xff0000))
  // 增加光源
  AddLight(handle)
  // 创建相机
  handle.camera = createCamera(width, height, 200, 200, 600, cameraSize)
  // 锁定相机设置相机方向(指向的场景对象)
  handle.camera.lookAt(handle.scene.position)
  // 增加渲染器
  addRenderer(handle, width, height, 0x002357)
  // 增加控制器
  handle.controls = new OrbitControls(handle.camera, handle.renderer.domElement)
  // 增添到DOM上
  dom.appendChild(handle.renderer.domElement)
  handle.pathList = []
  handle.targetMest = null
}

// 按照正常坐标系设置
const setPositon = (mesh, x, y, z) => {
  mesh.position.set(y, z, x)
}

// 创建轨迹点
const createPathPos = (x, y, z) => {
  let mesh = new THREE.Mesh(
    new THREE.SphereGeometry(2, 10, 10),
    new THREE.MeshLambertMaterial({ color: 0xe9f80f })
  )
  setPositon(mesh, x, y, z)
  return mesh
}

/* 创建目标 */
const createTarget = () => {
  let group = new THREE.Group()

  group.add(
    new THREE.Mesh(
      new THREE.BoxGeometry(1, 10, 1),
      new THREE.MeshLambertMaterial({ color: 0x0cffa4 })
    )
  )
  group.add(
    new THREE.Mesh(
      new THREE.BoxGeometry(10, 1, 1),
      new THREE.MeshLambertMaterial({ color: 0x0cffa4 })
    )
  )
  group.add(
    new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 10),
      new THREE.MeshLambertMaterial({ color: 0x0cffa4 })
    )
  )
  return group
}

/**
 * 增加一个轨迹点
 * @param {*} handle 句柄
 * @param {*} x 轨迹点x坐标
 * @param {*} y 轨迹点y坐标
 * @param {*} z 轨迹点z坐标
 */
export const addPath = (handle, x, y, z) => {
  if (handle.pathList.length === 0) {
    handle.targetMest = createTarget()
    setPositon(handle.targetMest, x, y, z)
    handle.pathList.push({ x, y, z })
    handle.scene.add(handle.targetMest)
  } else {
    // 设置新位置
    setPositon(handle.targetMest, x, y, z)
    let lastPos = handle.pathList[handle.pathList.length - 1]
    let mest = createPathPos(lastPos.x, lastPos.y, lastPos.z)
    lastPos.mest = mest
    handle.scene.add(mest)
    handle.pathList.push({ x, y, z, mest })

    // 这里的做法时保证页面上没有太多的点
    if (handle.pathList.length >= 200) {
      handle.scene.remove(handle.pathList[0].mest)
      handle.pathList.splice(0, 1)
    }
  }
}

/**
 * 重置镜头
 * @param {*} handle 操作句柄
 */
export const resetCamera = (handle) => {
  handle.controls.reset()
}
