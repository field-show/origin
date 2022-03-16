import priorityQueue from 'js-priority-queue'

export const conn = {} // ws connections

export const hook = {}

export const player = {}

export const node = {}

const cmp = (a, b) => a[3] - b[3]
export const moving = new priorityQueue({ comparator: cmp })
