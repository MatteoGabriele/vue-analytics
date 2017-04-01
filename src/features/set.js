import { warn, getName } from '../utils'
import config from '../config'

export default function set (...data) {
  if (typeof window.ga === 'undefined') {
    return
  }

  if (!data.length) {
    return
  }

  if (typeof data[0] === 'object' && data[0].constructor === Object) {
    // Use the ga.set with an object literal
    window.ga('set', data[0])

    return
  }

  if (data.length < 2 || (typeof data[0] !== 'string' && typeof data[1] !== 'string')) {
    warn('$ga.set needs a field name and a field value, or you can pass an object literal')
    return
  }

  // Use ga.set with field name and field value
  [].concat(config.id).forEach(function (id) {
    window.ga(`${getName(id)}.set`, data[0], data[1])
  })
}
