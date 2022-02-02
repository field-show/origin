import { data } from '../state.js'

export default function (payload) {
  const k = payload['#']
  return data[k] && JSON.parse(data[k])
}