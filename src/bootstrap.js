import collectors from './collectors'
import { autoTracking } from 'lib/page'
import noga from './no-ga'
import set from 'lib/set'
import query from 'lib/query'
import log from './log'
import config, { update, getId } from './config'
import * as helpers from './helpers'

export default () => {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return
  }

  const isInstalled = [
    config.disableScriptLoader,
    helpers.hasScript()
  ].some(Boolean)

  const queue = [
    helpers.promisify(config.disabled)
  ]

  if (isInstalled) {
    window.ga(tracker => {
      queue.push(helpers.promisify(tracker))
    })
  } else {
    const file = config.debug.enabled ? 'analytics_debug' : 'analytics'
    const resource = config.customResourceURL || `https://www.google-analytics.com/${file}.js`

    helpers.loadScript(resource)
    queue.push(helpers.promisify(config.id))
  }

  return Promise.all(queue).then(response => {
    const [disabled, id] = response

    if (id == null) {
      log('Missing the "id" parameter. Add at least one tracking domain ID')
      return
    }

    update({
      isInstalled,
      disabled,
      id
    })

    noga(disabled)

    if (config.debug.enabled) {
      window.ga_debug = {
        trace: config.debug.trace
      }
    }

    if (!isInstalled) {
      getId().forEach(t => {
        const name = helpers.getTracker(t)
        const customIdConfig = config.customIdFields[t] || {}
        const options = Object.assign({}, config.fields, customIdConfig, { name })

        query('create', t, 'auto', options)
      })
    }

    config.beforeFirstHit()

    if (!config.debug.sendHitTask) {
      set('sendHitTask', null)
    }

    if (config.ecommerce.enabled) {
      const plugin = config.ecommerce.enhanced ? 'ec' : 'ecommerce'

      if (config.ecommerce.options) {
        query('require', plugin, config.ecommerce.options)
      } else {
        query('require', plugin)
      }
    }

    if (config.linkers.length > 0) {
      query('require', 'linker')
      query('linker:autoLink', config.linkers)
    }

    collectors()

    autoTracking()

    config.ready()
  }).catch(error => {
    log(error.message)
  })
}
