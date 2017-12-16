import config, { getId } from '../config'
import { getMethod } from '../helpers'

export default function query (method, ...args) {
  getId().forEach(function (id) {
    if (typeof window.ga === 'undefined' || typeof id !== 'string') {
      config.untracked.push({
        method: getMethod(method, id),
        arguments: [...args]
      })
      return
    }

    window.ga(getMethod(method, id), ...args)
  })
}
