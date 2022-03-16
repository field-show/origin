import { conn } from '../state.js'

export async function broadcast (m) {
  try {
    for (const wid in conn) {
      conn[wid].json(m)
    }
  } catch (e) { console.log(e) }
}

export async function whisper (wid, m) {
  try {
    conn[wid].json(m)
  } catch (e) { console.log(e) }
}