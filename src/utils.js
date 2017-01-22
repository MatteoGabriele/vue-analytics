import config from './config'

/**
 * Whining helper
 * @param  {String} message
 */
export const warn = function (message) {
  /* eslint-disable */
  console.warn(`[VueAnalytics] ${message}`)
  /* eslint-enable */
}

/**
 * Google Analytics script loader
 * it auto adds Google Analytics script without needs to modify the HTML page.
 * @param  {String} id Google Analytics ID
 * @return {Promise}
 */
export const loadScript = function (id) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    const prior = document.getElementsByTagName('script')[0]

    script.async = 1
    prior.parentNode.insertBefore(script, prior)

    script.onload = script.onreadystatechange = function (_, isAbort) {
      if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
        script.onload = script.onreadystatechange = null
        script = undefined

        if (isAbort) {
          reject({ error: true })
          return
        }

        window.ga('create', id, 'auto')

        resolve({ success: true, id })
      }
    }

    script.src = '//www.google-analytics.com/analytics.js'
  })
}

/**
 * Returns if a string exists in the array of routes
 * @param  {String} name
 * @return {Boolean}
 */
export const exists = function (name) {
  return !!(config.ignoreRoutes.length && config.ignoreRoutes.indexOf(name) !== -1)
}
