import { node, player, moving } from '../state.js'
import { whisper, broadcast } from './msg.js'

export async function docking (id, opt) {
  const agent = player[id][opt.name]
  const n = node[opt.node]
  if (agent.position == n.position && n.status[0] == -1) {
    n.status = [id, opt.docking, agent.type, realtime]
    broadcast(id, opt.node, opt.docking)
  } else return 'fail'
  return 'success'
}

export async function attack (id, opt) {
  const agent = player[id].agent[opt.name]
  const n = node[opt.node]
  if (agent.position == n.position && n.status[0] != -1) {
    let res = false
    if (node.status[2] == n.type) {
      player[n.status[0]].entropy += n.status[1]
      node.entropy -= n.status[1]
      delete player[id].agent[opt.name]
      res = true
    }
    else {
      player[id].entropy += n.status[1] - realtime
      n.entropy -= n.status[1] - realtime
    }
    broadcast(id, n.status[0], res)
    n.status[0] = -1
  } else return 'fail'
  node[opt.node] = n
  return 'success'
}

export async function move (id, opt) {
  const agent = player[id].agent[opt.name]
  const realtime = Math.floor(Date.now()) / 1000 + Math.abs(opt.position[0] - agent.position[0]) + Math.abs(opt.position[1] - agent.position[1])
  moving.queue([id, opt.name, opt.position, realtime])
}

export async function agent (id, opt) {
  if (player[id].entropy < 10) return 'fail'
  player[id].entropy -= 10
  player[id].agent[opt.name] = { position: player[id].base, type: opt.type, entropy: 0 }
  whisper(id, player[id].agent[opt.name])
  return 'success'
}

export async function born (id, opt = {}) {
  const map = {}
  map['-1.-1'] = 1
  for (const p in player) map[`${player[id].base[0]}.${player[id].base[1]}`] = 1
  for (const n in node) map[`${node[n].position[0]}.${node[n].position[1]}`] = 1
  let base = [-1, -1]
  while (map[`${base[0]}.${base[1]}`]) {
    base[0] = Math.floor(Math.random() * 100)
    base[1] = Math.floor(Math.random() * 100)
  }
  player[id] = { base, entropy: 100 }
  whisper(id, player[id])
}
