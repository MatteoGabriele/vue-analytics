import { getId } from '../config'
import { getMethod } from '../helpers'

export default function query (method, ...args) {
  if (typeof window.ga === 'undefined') {
    return
  }

  getId().forEach(function (id) {
    window.ga(getMethod(method, id), ...args)
  })
}
