import set from 'lib/set'
import query from 'lib/query'
import config, { getId } from './config'
import { getTracker } from './helpers'

export default function createTrackers () {
  const ids = getId()

  if (config.debug.enabled) {
    window.ga_debug = {
      trace: config.debug.trace
    }
  }

  ids.forEach(function (domain) {
    const name = getTracker(domain)
    const customIdConfig = config.customIdFields[domain] || {}
    const options = ids.length > 1 ? { ...config.fields, ...customIdConfig, name } : config.fields

    window.ga('create', (domain.id || domain), 'auto', options)
  })

  config.beforeFirstHit()

  const { ecommerce } = config

  if (ecommerce.enabled) {
    const plugin = ecommerce.enhanced ? 'ec' : 'ecommerce'

    if (ecommerce.options) {
      query('require', plugin, ecommerce.options)
    } else {
      query('require', plugin)
    }
  }

  if (config.linkers.length > 0) {
    query('require', 'linker')
    query('linker:autoLink', config.linkers)
  }

  if (!config.debug.sendHitTask) {
    set('sendHitTask', null)
  }
}
