import config, { getId } from '../config'
import { getMethod } from '../helpers'

let intr
let coll = []

export default function query (method, ...args) {
  if (typeof window === 'undefined') {
    return
  }

  getId().forEach(function (id) {
    const t = {
      m: getMethod(method, id),
      a: args
    }

    if(!window.ga) {
      config.untracked.push(t)
      return
    }

    if (config.batch.enabled) {
      coll.push(t)

      if (!intr) {
        intr = setInterval(() => {
          if (!coll.length) {
            clearInterval(intr)
            intr = null
          } else {
            coll.splice(0, config.batch.amount).forEach(q => {
              window.ga(q.m, ...q.a)
            })
          }
        }, config.batch.delay)
      }
    } else {
      window.ga(getMethod(method, id), ...args)
    }
  })
}
