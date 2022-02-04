import { data, hook, conn } from '../state.js'

export default function (b) {
  const k = b['#'], v = b[':']
  data[k] = v
  if (!hook[k]) return
  // send msg
  for (const wid of hook[k]) {
    if (!conn[wid]) hook[k].delete(wid)
    else conn[wid].json({ '#': k, ':': v })
  }
}