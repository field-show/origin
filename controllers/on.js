import { data, hook } from '../state.js'

export default function (payload, ws) {
  const k = payload['#']
  if (!hook[k]) hook[k] = new Set()
  hook[k].add(ws.id)
  return data[k] && JSON.parse(data[k])
}