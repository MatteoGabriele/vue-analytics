import bootstrap from './bootstrap'
import * as config from './config'
import { onAnalyticsReady } from './helpers'

export default function install (Vue, options = {}) {
  Vue.prototype.$ga = Vue.$ga = [
    'event',
    'exception',
    'page',
    'query',
    'require',
    'set',
    'social',
    'time',
    'untracked'
  ].reduce((features, feature) => {
    return {
      ...features,
      [feature]: require(`./lib/${feature}`).default
    }
  }, {})

  config.update(options)

  bootstrap()
}

export { onAnalyticsReady }
