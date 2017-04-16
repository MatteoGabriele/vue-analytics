import { merge } from './utils'

/**
 * Default configuration
 */
let config = {
  debug: {
    enabled: false,
    trace: false,
    sendHitTask: true
  },
  autoTracking: {
    exception: false,
    page: true
  },
  id: null,
  userId: null,
  ignoreRoutes: []
}

/**
 * Returns the new configuation object
 * @param  {Object} params
 * @return {Object}
 */
export function updateConfig (params) {
  return merge(config, params)
}

export default config
