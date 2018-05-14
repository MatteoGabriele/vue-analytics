import bootstrap from './bootstrap'
import lib from './lib'
import config, { update } from './config'
import { onAnalyticsReady } from './helpers'
import ga from 'directives/ga'
import * as exception from 'lib/exception'
import analyticsMiddleware from './vuex-middleware'

export default function install (Vue, options = {}) {
  update({ ...options, $vue: Vue })

  if (typeof window !== 'undefined' && !window.ga) {
    window.ga = window.ga || function () {
      (window.ga.q = window.ga.q || []).push(arguments)
    }
    window.ga.l = Number(new Date())
  }

  Vue.directive('ga', ga)

  Vue.prototype.$ga = Vue.$ga = lib

  exception.autotracking(Vue)

  bootstrap()
}

export {
  onAnalyticsReady,
  analyticsMiddleware
}
