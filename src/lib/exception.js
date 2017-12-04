import query from 'lib/query'
import config from '../config'

export default function exception (error, fatal = false) {
  query('send', 'exception', {
    exDescription: error,
    exFatal: fatal
  })
}

export function setupErrorHandler(Vue) {
  if (config.autoTracking.exception) {
    const originalErrorHandler = Vue.config.errorHandler
    Vue.config.errorHandler = function (error, vm, info) {
      vm.$ga.exception(error.message || error, true)
      if (typeof originalErrorHandler === 'function') {
        originalErrorHandler.call(this, error, vm, info)
      }
    }
  }
}

export function autotracking () {
  if (!config.autoTracking.exception) {
    return
  }

  window.addEventListener('error', function (error) {
    exception(error.message || error)
  })
}
