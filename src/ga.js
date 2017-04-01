import { getListId, getName } from './utils'

export default function ga (method, ...args) {
  if (typeof window.ga === 'undefined') {
    return
  }

  const ids = getListId()

  ids.forEach(function (id) {
    const domain = getName(id)
    const name = ids.length > 1 ? `${domain}.${method}` : method

    window.ga(name, ...args)
  })
}
