import merge from 'lodash.merge'

/**
 * Default configuration
 */
let config = {
  debug: false,
  autoTracking: true,
  id: 'UA-XXX-X',
  ignoreRoutes: []
}

/**
 * Returns the new configuation object
 * @param  {Object} params
 * @return {Object}
 */
export const updateConfig = function (params) {
  return merge(config, params)
}

export default config
