/**
 * 可拉伸缩放功能
 * ps(postscript):
 * clientX当前点击时距浏览器左侧的长度；
 * clientY为当前点击时距浏览器顶部的长度
 * offsetX为当前点击时距组件左侧的长度
 * offsetY为当前点击时距组件顶部的长度
 * offsetLeft为当前点击所在的组件距浏览器左侧的长度
 * offsetTop为当前点击所在的组件距浏览器顶部的长度
 * @author赵晨吉
 */
let cursor //鼠标样式
let moveDivState = false //拖动组件移动的状态      true可拖动，false不可拖动
let zoomDivState = false //缩放组件的状态          true可缩放，false不可缩放
let zoomDivName = '' //缩放组件的名称              ∵缩放组件时，鼠标挪至另一个缩放组件上时会卡顿。   ∴特定此变量用来判断
let clientX = 0 //用来记录组件单击时的clientX位置
let clientY = 0 //用来记录组件单击时的clientY位置
let offsetX = 0 //用来记录组件单击时的offsetX位置   ∵直接用offsetX会有组件之间的冲突，∴用clientX减去该组件的offsetLeft
let offsetY = 0 //用来记录组件单击时的offsetY位置   ∵直接用offsetY会有组件之间的冲突，∴用clientY减去该组件的offsetTop
let minHeight = 120 //缩放的最小高度
let minWidth = 200 //缩放的最小宽度
let globalDir = '' //∵ ↑ ↓ ← → ↖ ↗ ↙ ↘ 八个方向时根据鼠标移动来做判断的，缩放时移动过快会产生冲突。 ∴点击时赋值变量，松开时清除此变量，用来锁定一个方向
const breadth = 5 //用来判定鼠标变为移动状态的距离，可以粗略理解为padding为breadth像素，在此组件边缘往内breadth像素的区域，鼠标会变为可移动状态，再经过点击后便可开始移动。

// import { borderColor } from '../styles/dark-green/index.scss' //如果拖动组件时不喜欢透明度变化，可以解开本行，本行为拖动组件时的边框颜色

// 此方法传参为两个id属性，value1为父元素，用来做缩放处理，value2为子元素，用来做拖动处理
export function addMoveDiv(value1, value2) {
  // 获取两个元素
  let moveDiv = document.getElementById(value1)
  let move = document.getElementById(value2)
  // 设置父元素样式
  setStyle(moveDiv)
  // 鼠标点击子元素时，获取信息：可拖动状态，其余不做表述
  move.onmousedown = (e) => {
    document.body.style.cursor = 'move'
    globalDir = 'move'
    moveDivState = true
    offsetX = e.clientX - moveDiv.offsetLeft
    offsetY = e.clientY - moveDiv.offsetTop
  }
  // ∵下文中做了多个弹窗组件互不影响的判断，导致无法注册全部事件。   ∴特地在此注册一次鼠标在子元素上的样式
  move.style.cursor = 'move'
  // 鼠标在父元素移动
  moveDiv.onmousemove = (e) => {
    //在breadth的范围中，该表鼠标样式，返回值用作计算缩放尺寸
    var dir = getDir(moveDiv, e)
    //为防止多个组件之间冲突，特在此加判断。
    if (zoomDivName !== moveDiv.id) {
      return
    }
    document.onmousemove = (e) => {
      //可拖动状态
      if (moveDivState) {
        // 拖动时的透明度设定
        moveDiv.style.opacity = 0.7
        // 拖动时的边框设定
        // moveDiv.style.border = '3px solid ' + borderColor
        moveDiv.style.left = e.clientX - offsetX + 'px'
        moveDiv.style.top = e.clientY - offsetY + 'px'
      } //可缩放状态
      else if (zoomDivState) {
        //右
        if (dir.indexOf('e') !== -1) {
          if (minWidth <= moveDiv.offsetWidth + (e.clientX - clientX)) {
            moveDiv.style.width =
              Math.max(minWidth, moveDiv.offsetWidth + (e.clientX - clientX)) +
              'px'
            clientX = e.clientX
          }
        }
        //左
        if (dir.indexOf('w') !== -1) {
          if (minWidth <= moveDiv.offsetWidth + (clientX - e.clientX)) {
            moveDiv.style.width =
              Math.max(minWidth, moveDiv.offsetWidth + (clientX - e.clientX)) +
              'px'
            clientX = e.clientX
            moveDiv.style.left = clientX + 'px'
          }
        }
        //下
        if (dir.indexOf('s') !== -1) {
          if (minHeight <= moveDiv.offsetHeight + (e.clientY - clientY)) {
            moveDiv.style.height =
              Math.max(
                minHeight,
                moveDiv.offsetHeight + (e.clientY - clientY)
              ) + 'px'
            clientY = e.clientY
          }
        }
        //上
        if (dir.indexOf('n') !== -1) {
          if (minHeight <= moveDiv.offsetHeight + (clientY - e.clientY)) {
            moveDiv.style.height =
              Math.max(
                minHeight,
                moveDiv.offsetHeight + (clientY - e.clientY)
              ) + 'px'
            clientY = e.clientY
            moveDiv.style.top = clientY + 'px'
          }
        }
      }
    }
    document.onmouseup = (e) => {
      if (moveDivState) {
        moveDivState = false
        //透明度
        moveDiv.style.opacity = 1
        //边框
        //moveDiv.style.border = null
      }
      if (zoomDivState) {
        zoomDivState = false
      }
      document.body.style.cursor = ''
      globalDir = ''
      zoomDivName = ''
      document.onmousemove = null
      document.onmouseup = null
    }
  }
}
//动态设定父元素的样式，各属性不做解释。为了方便更改弹窗中子元素的排列，我未将子元素的样式设定放在这里
function setStyle(moveDiv) {
  moveDiv.style.position = 'absolute'
  moveDiv.style.width = '40%'
  moveDiv.style.zIndex = 10
}
function getDir(moveDiv, e) {
  // 点击父元素，globalDir赋值成功至鼠标松开之前，不再走下方代码
  if (globalDir !== '') {
    return globalDir
  }
  // if (moveDiv.setCapture) {
  //   moveDiv.setCapture()
  // }
  e = e || window.event
  //该元素的高与宽
  var offsetHeight = moveDiv.offsetHeight
  var offsetWidth = moveDiv.offsetWidth
  var x = e.clientX - moveDiv.offsetLeft
  var y = e.clientY - moveDiv.offsetTop
  var dir = ''
  if (y < breadth) {
    dir += 'n' //上
  } else if (y > offsetHeight - breadth) {
    dir += 's' //下
  }
  if (x < breadth) {
    dir += 'w' //左
  } else if (x > offsetWidth - breadth) {
    dir += 'e' //右
  }
  if (dir !== '') {
    cursor = dir + '-resize'
  } else {
    cursor = 'default'
  }
  // 父元素点击，判断是是否在边缘
  moveDiv.onmousedown = (e) => {
    zoomDivName = moveDiv.id
    clientX = e.clientX
    clientY = e.clientY
    if (dir !== '') {
      document.body.style.cursor = cursor
      zoomDivState = true
      globalDir = dir
      document.cursor
    }
  }
  moveDiv.style.cursor = cursor
  return dir
}
