import { data } from '../state.js'

export default function (b, ws) {
  const k = b['#']
  ws.json({ '#': k, ':': data[k] })
}