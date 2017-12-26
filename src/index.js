import bootstrap from './bootstrap'
import config, { update } from './config'
import { onAnalyticsReady } from './helpers'

// Directives
import ga from 'directives/ga'

// Features
import event from 'lib/event'
import exception, { setupErrorHandler } from 'lib/exception'
import page from 'lib/page'
import query from 'lib/query'
import require from 'lib/require'
import set from 'lib/set'
import social from 'lib/social'
import time from 'lib/time'
import untracked from 'lib/untracked'
import ecommerce from 'lib/ecommerce'

export default function install (Vue, options = {}) {
  update(options)

  Vue.directive('ga', ga)

  Vue.prototype.$ga = Vue.$ga = {
    event,
    exception,
    page,
    query,
    require,
    set,
    social,
    time,
    untracked,
    ecommerce,
    commands: config.commands
  }

  setupErrorHandler(Vue)

  bootstrap()
}

export { 
  onAnalyticsReady 
}
