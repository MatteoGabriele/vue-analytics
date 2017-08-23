import config from '../config'
import exception from './exception'
import { isSSR } from '../utils'

export default function autoTrackException () {
  if (!config.autoTracking.exception || isSSR()) {
    return
  }

  // start auto tracking error exceptions
  window.onerror = error => exception(error.message || error)
}
