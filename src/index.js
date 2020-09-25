import _bootstrap from './bootstrap'
import lib from './lib'
import { update } from './config'
import * as helpers from './helpers'
import ga from './directives/ga'
import { autotracking as expectionAutotracking } from './lib/exception'
import vuexMiddleware from './vuex-middleware'

export default function install (Vue, options = {}) {
  options = update({ ...options, $vue: Vue })

  Vue.directive('ga', ga)
  Vue.prototype.$ga = Vue.$ga = lib

  expectionAutotracking(Vue)

  if (!options.bootstrap)   {
    return
  }

  _bootstrap()
}

// Vuex middleware
export const analyticsMiddleware = vuexMiddleware

// Helpers
export const onAnalyticsReady = helpers.onAnalyticsReady
export const hasScript = helpers.hasScript

// Event library
export const event = lib.event
export const ecommerce = lib.ecommerce
export const set = lib.set
export const page = lib.page
export const query = lib.query
export const screenview = lib.screenview
export const time = lib.time
export const require = lib.require
export const exception = lib.exception
export const social = lib.social
export const bootstrap = _bootstrap
