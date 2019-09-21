import query from 'lib/query'
import config, { getTrackerName } from '../config'

const exception = (error, fatal = false) => {
  const trackerName = getTrackerName()
  const command = trackerName ? `${trackerName}.send` : 'send'

  query(command, 'exception', {
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
      console.error(`[vue-analytics] Error in ${info}: ${error.message}`)
      console.error(error)
    }

    if (typeof oldErrorHandler === 'function') {
      oldErrorHandler.call(this, error, vm, info)
    }
  }
}

export default exception
