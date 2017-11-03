import query from 'lib/query'
import config from '../config'

export default function exception (error, fatal = false) {
  query('send', 'exception', {
    exDescription: error,
    exFatal: fatal
  })
}

export function autotracking () {
  if (!config.autoTracking.exception) {
    return
  }

  window.addEventListener('error', function (error) {
    exception(error.message || error)
  })
}
