import { getListId, generateMethodName } from './utils'
import { isSSR } from './utils'

export default function ga (method, ...args) {
  if (isSSR() || typeof window.ga === 'undefined') {
    return
  }

  getListId().forEach(function (id) {
    window.ga(generateMethodName(method, id), ...args)
  })
}
