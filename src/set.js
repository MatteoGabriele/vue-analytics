import { warn } from './utils'

export default function (...data) {
  if (typeof window.ga === 'undefined') {
    return
  }

  if (!data.length) {
    return
  }

  if (typeof data[0] === 'object' && data[0].constructor === Object) {
    /* eslint-disable */
    console.groupCollapsed(`[VueAnalytics] Set`)

    const params = data[0]
    for (let key in params) {
      console.log(`${key}: ${params[key]}`)
    }

    console.groupEnd()
    /* eslint-enable */

    // Use the ga.set with an object literal
    window.ga('set', params)

    return
  }

  if (data.length < 2 || (typeof data[0] !== 'string' && typeof data[1] !== 'string')) {
    warn('$ga.set needs a field name and a field value, or you can pass an object literal')
    return
  }

  /* eslint-disable */
  console.groupCollapsed(`[VueAnalytics] Set`)
  console.log(`Field name: ${data[0]}`)
  console.log(`Field value: ${data[1]}`)
  console.groupEnd()
  /* eslint-enable */

  // Use ga.set with field name and field value
  window.ga('set', data[0], data[1])
}
