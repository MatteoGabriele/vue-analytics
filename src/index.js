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

  if (!config.id) {
    const url = 'https://github.com/MatteoGabriele/vue-analytics#usage'
    warn('Please enter a Google Analaytics tracking ID', url)
    return
  }

  loadScript(config.id).then(function (response) {
    if (response.error) {
      warn('Ops! Could\'t load the Google Analytics script')
      return
    }

    autoTracking(router)
  })
}

/**
 * Vue installer
 * @param  {Vue instance} Vue
 * @param  {Object} [options={}]
 */
const install = function (Vue, options = {}) {
  const { router } = options

  delete options.router
  updateConfig(options)

  init(router)

  Vue.$ga = { trackEvent, trackPage }
  Vue.prototype.$ga = { trackEvent, trackPage }
}

export default {
  install,
  loadScript,
  autoTracking
}
