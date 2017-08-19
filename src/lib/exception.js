import query from 'lib/query'

export function startAutoTracking () {
  if (!config.autoTracking.exception) {
    return
  }

  window.onerror = function (error) {
    exception(error.message || error)
  }
}

export default function exception (error, fatal = false) {
  query('send', 'exception', {
    exDescription: error,
    exFatal: fatal
  })
}
