import config, { updateConfig } from './config'
import trackPage from './track/page'
import trackEvent from './track/event'
import autoTracking from './track/autoTracking'
import set from './set'
import { loadScript, warn } from './utils'

/**
 * With default configurationsm it loads Google Analytics script and start autoTracking
 * @param  {VueRouter} router
 */
const init = function (router, callback) {
  if (config.manual) {
    return
  }

  if (!config.id) {
    const url = 'https://github.com/MatteoGabriele/vue-analytics#usage'
    warn('Please enter a Google Analaytics tracking ID', url)
    return
  }

  let options = {}

  if (config.userId) {
    options.userId = config.userId
  }

  loadScript(config.id, options).then(function (response) {
    if (response.error) {
      warn('Ops! Could\'t load the Google Analytics script')
      return
    }

    if (callback && typeof callback === 'function') {
      callback()
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

  init(router, options.onAnalyticsReady)

  const features = { trackEvent, trackPage, set }
  Vue.$ga = features
  Vue.prototype.$ga = features
}

export default {
  install,
  loadScript,
  autoTracking
}
