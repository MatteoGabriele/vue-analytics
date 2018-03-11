import config, { getId } from '../config'
import { getMethod } from '../helpers'

let i
let l = []

export default function query (method, ...args) {
  getId().forEach(function (id) {
    if (config.batch.enabled) {
      l.push({
        m: getMethod(method, id),
        a: args
      })
      
      if (!i) {
        i = setInterval(() => {
          if (!l.length) {
            clearInterval(i)
            i = null
          } else {
            l.splice(0, config.batch.amount).forEach(q => {
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
