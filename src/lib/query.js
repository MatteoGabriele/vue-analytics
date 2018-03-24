import config, { getId } from '../config'
import { getMethod } from '../helpers'

let intr
let coll = []

export default function query (method, ...args) {
  getId().forEach(function (id) {
    if (config.batch.enabled) {
      coll.push({
        m: getMethod(method, id),
        a: args
      })
      
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
