import query from 'lib/query'
import config from '../config'

export default function exception (error, fatal = false) {
  query('send', 'exception', {
    exDescription: error,
    exFatal: fatal
  })
}

export function errorHandler (error, vm) {
  const { exception } = config.autoTracking
  const message = error.message || error

  exception && vm.$ga.exception(message, true)
}
