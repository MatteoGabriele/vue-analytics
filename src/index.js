import { updateConfig } from './config'
import features from './features/index'
import init from './init'
import { generateMethodName } from './utils'

/**
 * Vue installer
 * @param  {Vue instance} Vue
 * @param  {Object} [options={}]
 */
function install (Vue, options = {}) {
  const { router } = options

  delete options.router
  updateConfig(options)

  init(router, options.onReady)

  Vue.prototype.$ga = Vue.$ga = features
}

export default { install, generateMethodName }
