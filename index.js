import { WebSocketServer, WebSocket } from 'ws'
import { serial } from './utils/crypto.js'
import { conn } from './state.js'
import handler from './controllers/index.js'

const wss = new WebSocketServer({ port: 8000 }, () => {
  console.log('field/origin listens on 8000')
})

wss.on('connection', ws => {
  ws.id = serial()
  ws.json = d => ws.send(JSON.stringify(d))
  conn[ws.id] = ws
  ws.on('close', () => { delete conn[ws.id] })
  ws.on('message', m => handler(m, ws))
})
