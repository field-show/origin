import put from './put.js'
import once from './once.js'
import on from './on.js'

const opts = { put, once, on }

export default async function (m, ws) {
  try {
    m = JSON.parse(m) // [rid, opt, payload]
    const rid = m[0], opt = m[1], payload = m[2]
    let res
    if (opts[opt]) res = await opts[opt](payload, ws)
    ws.json({ ack: rid, res })
  } catch (e) { console.log(e) }
}