import config, { updateConfig } from './config'
import trackPage from './track/page'
import trackEvent from './track/event'
import autoTracking from './track/autoTracking'
import { loadScript } from './utils'

/**
 * Vue installer
 * @param  {Vue instance} Vue
 * @param  {Object} [options={}]
 */
const install = function (Vue, options = {}) {
  updateConfig({
    autoTracking: options.autoTracking,
    debug: options.debug,
    id: options.id,
    ignoreRoutes: options.ignoreRoutes
  })

  Vue.$ga = { trackEvent, trackPage }
  Vue.prototype.$ga = { trackEvent, trackPage }

  if (config.autoTracking) {
    loadScript(config.id).then(function (response) {
      if (response.error) {
        return
      }

      autoTracking(options.router)
    })
  }
}

export default {
  install,
  loadScript,
  autoTracking
}
