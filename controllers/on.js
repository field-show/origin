import { data, hook } from '../state.js'

export default function (b, ws) {
  const k = b['#']
  if (!hook[k]) hook[k] = new Set()
  hook[k].add(ws.id)
  ws.json({ '#': k, ':': data[k] })
}