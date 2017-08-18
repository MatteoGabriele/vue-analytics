import bootstrap from './bootstrap'
import * as config from './config'
import { onAnalyticsReady } from './utils'

export default function install (Vue, options = {}) {
  const libContext = require.context('./lib', true, /\.js/)

  Vue.prototype.$ga = Vue.$ga = libContext.keys()
    .reduce((paths, path) => {
      const name = path.replace(/\.js/, '').replace('./', '')
      return Object.assign(paths, {
        [name]: libContext(path).default
      })
    }, {})

  config.update(options)

  bootstrap()
}

export { onAnalyticsReady }
