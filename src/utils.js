import config from './config'

/**
 * Whining helper
 * @param  {String} message
 */
export const warn = function (...message) {
  /* eslint-disable */
  console.warn(`[VueAnalytics] ${message.join(' ')}`)
  /* eslint-enable */
}

/**
 * Returns if a string exists in the array of routes
 * @param  {String} name
 * @return {Boolean}
 */
export const exists = function (name) {
  return !!(config.ignoreRoutes.length && config.ignoreRoutes.indexOf(name) !== -1)
}
