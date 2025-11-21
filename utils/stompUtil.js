import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'

const url = 'ws://10.1.10.201:9090/'
var _onReadyHandler = []
var stompClient
var isReady = false

if (WebSocket) {
  const socket = new WebSocket(url + 'ws/websocket')
  stompClient = Stomp.over(socket)
} else {
  const socket = new SockJS(url + 'ws')
  stompClient = Stomp.over(socket)
}
// disable debug log

stompClient.connect('user', 'password', (frame) => {
  isReady = true
  if (_onReadyHandler !== undefined) {
    _onReadyHandler.forEach((it) => {
      it(stompClient)
    })
  }
})

export function onReady(onReadyHandler) {
  if (isReady) {
    onReadyHandler(stompClient)
  } else {
    _onReadyHandler.push(onReadyHandler)
  }
}
export default onReady
