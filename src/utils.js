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

/**
 * Merges two objects
 * @param  {Object} obj
 * @param  {Object} src
 * @return {Object}
 */
export const merge = function (obj, src) {
  Object.keys(src).forEach(function (key) {
    if (obj[key] && typeof obj[key] === 'object') {
      merge(obj[key], src[key])
      return
    }

    obj[key] = src[key]
  })

  return obj
}

export function getName (value) {
  return value.replace(/-/gi, '')
}

export function getListId () {
  return [].concat(config.id)
}

export function generateMethodName (method, id) {
  const domain = getName(id)
  return getListId().length > 1 ? `${domain}.${method}` : method
}
