import crypto from 'crypto'

let cot = 0

export const serial = () => (cot++).toString(36)

export const random = (l = 32) => crypto.randomBytes(l).toString('base64')