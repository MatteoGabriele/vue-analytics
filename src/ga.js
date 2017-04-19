import { getListId, generateMethodName } from './utils'

export default function ga (method, ...args) {
  if (typeof window.ga === 'undefined') {
    return
  }

  getListId().forEach(function (id) {
    window.ga(generateMethodName(method, id), ...args)
  })
}
