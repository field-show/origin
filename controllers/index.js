import put from './put.js'
import once from './once.js'
import on from './on.js'

const opts = { put, once, on }

export default async function (m, ws) {
  try {
    m = JSON.parse(m)
    if (opts[m._]) opts[m._](m, ws)
  } catch (e) { console.log(e) }
}