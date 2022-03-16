import { node, player, moving } from '../state.js'
import { whisper, broadcast } from './msg.js'
import { random } from '../utils/crypto.js'

async function refresh () {
  for (const n in node) {
    if (node[n].status[0] == -1) continue
    n.status[3] --
    if (!node[n].status[3]) {
      player[node[n].status[0]].entropy += node[n].status[1]
      node[n].entropy -= node[n].status[1]
      node[n].status[0] = -1
    }
  }
  if (!moving.length) return
  if (Date.now() / 1000 > moving.peek()[3]) {
    const m = moving.dequeue()
    player[m[0]].agent[m[1]].position = m[2]
    whisper(moving[0], { name: m[1], position: m[2] })
  }
}

async function generate () {
  const map = {}
  map['-1.-1'] = 1
  for (const n in node) map[`${node[n].position[0]}.${node[n].position[1]}`] = 1
  for (const p in player) map[`${player[p].base[0]}.${player[p].base[1]}`] = 1
  let p = [-1, -1]
  while (map[`${p[0]}.${p[1]}`]) {
    p[0] = Math.floor(100 * Math.random())
    p[1] = Math.floor(100 * Math.random())
  }
  const id = random(8)
  node[id] = {
    type: Math.floor(Math.random() * 10),
    position: p,
    entropy: Math.floor(Math.random() * 100),
    status: [-1, 0, 0, 0]
  }
  broadcast({ id, info: node[id] })
}

export default async function () {
  setInterval(refresh, 1000)
  setInterval(generate, 10000)
}
