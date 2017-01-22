import config, { updateConfig } from './config'
import trackPage from './track/page'
import trackEvent from './track/event'
import autoTracking from './track/autoTracking'
import { loadScript, warn } from './utils'

/**
 * With default configurationsm it loads Google Analytics script and start autoTracking
 * @param  {VueRouter} router
 */
const init = function (router) {
  if (config.manual) {
    return
  }

  loadScript(config.id).then(function (response) {
    if (response.error) {
      warn('Ops! Could\'t load the Google Analytics script')
      return
    }

    if (config.autoTracking) {
      autoTracking(router)
    }
  })
}

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
    manual: options.manual,
    ignoreRoutes: options.ignoreRoutes
  })

  Vue.$ga = { trackEvent, trackPage }
  Vue.prototype.$ga = { trackEvent, trackPage }

  init(options.router)
}

export default {
  install,
  loadScript,
  autoTracking
}
