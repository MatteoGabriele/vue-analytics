import { updateConfig } from './config'
import loadScript from './loadScript'
import trackPage from './track/page'
import trackEvent from './track/event'
import trackTime from './track/time'
import autoTracking from './track/autoTracking'
import set from './set'
import init from './init'

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

  const features = { trackEvent, trackPage, trackTime, set }
  
  Vue.prototype.$ga = Vue.$ga = features
}

export default {
  install,
  loadScript,
  autoTracking
}
