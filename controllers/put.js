import { data, hook, conn } from '../state.js'

export default function (payload) {
  const k = payload['#'], v = payload[':']
  data[k] = JSON.stringify(v)
  if (!hook[k]) return
  // send msg
  for (const wid of hook[k]) {
    if (!conn[wid]) hook[k].delete(wid)
    else conn[wid].json({ '#': k, ':': v })
  }
}