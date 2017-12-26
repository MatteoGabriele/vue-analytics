import bootstrap from './bootstrap'
import lib from './lib'
import { errorHandler } from 'lib/exception'
import config, { update } from './config'
import { onAnalyticsReady } from './helpers'
import ga from 'directives/ga'

export default function install (Vue, options = {}) {
  update(options)

  Vue.directive('ga', ga)

  Vue.prototype.$ga = Vue.$ga = lib

  if (!Vue.config.errorHandler) {
    Vue.config.errorHandler = errorHandler
  }

  bootstrap()
}

export {
  onAnalyticsReady
}
