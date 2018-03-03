import bootstrap from './bootstrap'
import lib from './lib'
import config, { update } from './config'
import { onAnalyticsReady } from './helpers'
import ga from 'directives/ga'
import { autotracking } from 'lib/exception'
import analyticsMiddleware from './vuex/analyticsMiddleware'

export default function install (Vue, options = {}) {
  update(options)

  Vue.directive('ga', ga)

  Vue.prototype.$ga = Vue.$ga = lib

  autotracking(Vue)

  bootstrap()
}

export {
  onAnalyticsReady,
  analyticsMiddleware
}
