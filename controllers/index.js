import { data, hook, conn } from '../state.js'

const opts = {}

opts.on = (b, ws) => { // add listener
  const k = b['#']
  if (!hook[k]) hook[k] = new Set()
  hook[k].add(ws.id)
  ws.json({ '#': k, ':': data[k] })
}

opts.get = (b, ws) => { // get once
  ws.json({ '#': b['#'], ':': data[b['#']] })
}

opts.put = b => { // update data
  const k = b['#'], v = b[':']
  if (data[k] === v) return
  data[k] = v
  if (!hook[k]) return
  // send msg
  for (const wid of hook[k]) {
    if (!conn[wid]) hook[k].delete(wid)
    else conn[wid].json({ '#': k, ':': v })
  }
}

export default async function (m, ws) {
  try {
    m = JSON.parse(m)
    if (opts[m._]) opts[m._](m, ws)
  } catch (e) { console.log(e) }
}