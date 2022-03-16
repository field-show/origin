import { WebSocketServer, WebSocket } from 'ws'
const ws = new WebSocket('ws://localhost:8000')


const msg = {
  '_': 'born',
  ':': { txt: 'test' }
}

ws.onopen = function(e){
  console.log('success')
  ws.send(JSON.stringify(msg))
}
ws.onclose = e => {
  console.log('close')
}
ws.onerror = () => {
  console.log('error')
}
ws.onmessage = e => {
  let message = 'message:' + e.data + ''
  console.log(message)
}