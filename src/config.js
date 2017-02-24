import { warn } from './utils'

/**
 * Default configuration
 */
let config = {
  debug: {
    enabled: false,
    trace: false,
    sendHitTask: true
  },
  autoTracking: true,
  id: null,
  userId: null,
  manual: false,
  ignoreRoutes: []
}

/**
 * Merges two objects
 * @param  {Object} obj
 * @param  {Object} src
 * @return {Object}
 */
const merge = function (obj, src) {
  Object.keys(src).forEach(function (key) {
    if (obj[key] && typeof obj[key] === 'object') {
      merge(obj[key], src[key])
      return
    }

    obj[key] = src[key]
  })

  return obj
}

/**
 * Returns the new configuation object
 * @param  {Object} params
 * @return {Object}
 */
export const updateConfig = function (params) {
  // Until v3.0.0 check for `debug` old setup
  if (typeof params.debug === 'boolean') {
    const url = 'https://github.com/MatteoGabriele/vue-analytics#debug'
    warn('Please use the new debug setup', url)
  }

  return merge(config, params)
}

export default config
