import config from '../config'
import exception from './exception'

export default function exceptionAutoTracking () {
  if (!config.exception.auto) {
    return
  }

  // start auto tracking error exceptions
  window.onerror = error => exception(error.message || error)
}
