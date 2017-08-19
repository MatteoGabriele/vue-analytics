import { getId, update } from '../config'
import { getMethod } from '../helpers'

const untraked = []

export default function query (method, ...args) {
  getId().forEach(function (id) {
    if (typeof window.ga === 'undefined') {
      untraked.push({
        method: getMethod(method, id),
        arguments: [...args]
      })
      return
    }

    update({ __untracked: untraked })

    window.ga(getMethod(method, id), ...args)
  })
}
