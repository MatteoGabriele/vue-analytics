import query from './query'
import config from '../config'

const exception = (error, fatal = false) => {
  query('send', 'exception', {
    exDescription: error,
    exFatal: fatal
  })
}

export const autotracking = Vue => {
  if (!config.autoTracking.exception) {
    return
  }

  // Handler errors outside Vue components
  window.addEventListener('error', error => {
    exception(error.message)
  })

  // Save the Vue.config.errorHandler if one already registered
  const oldErrorHandler = Vue.config.errorHandler

  // Handles errors inside component life
  Vue.config.errorHandler = (error, vm, info) => {
    exception(error.message)

    if (config.autoTracking.exceptionLogs) {
      console.error(error)
    }

    if (typeof oldErrorHandler === 'function') {
      oldErrorHandler.call(this, error, vm, info)
    }
  }
}

export default exception
