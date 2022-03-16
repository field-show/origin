import { docking, attack, move, agent, born } from './world.js'
import { whisper } from './msg.js'

const model = { docking, attack, move, agent, born }

export default async function (m, ws) {
  m = JSON.parse(m)
  const wid = ws.id
  const opt = model[m['_']]
  const res = await opt(wid, m[':'])
  whisper(wid, res)
}