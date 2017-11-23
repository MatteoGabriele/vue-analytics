import bootstrap from './bootstrap'
import { update } from './config'
import { onAnalyticsReady } from './helpers'
import event from 'lib/event'
import exception from 'lib/exception'
import page from 'lib/page'
import query from 'lib/query'
import require from 'lib/require'
import set from 'lib/set'
import social from 'lib/social'
import time from 'lib/time'
import untracked from 'lib/untracked'
import ecommerce from 'lib/ecommerce'

export default function install (Vue, options = {}) {
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
    ecommerce
  }

  update(options)
  bootstrap()
}

export { onAnalyticsReady }
