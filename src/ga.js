import { getId } from './config'
import { getMethod } from './utils'

export default function ga (method, ...args) {
  if (typeof window.ga === 'undefined') {
    return
  }

  getId().forEach(function (id) {
    window.ga(getMethod(method, id), ...args)
  })
}
