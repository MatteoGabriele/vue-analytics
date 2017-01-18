/**
 * Configuration
 * @type {Object}
 */
let config = {
  debug: false,
  excludes: []
}

/**
 * Event tracking
 * @param  {String} category
 * @param  {String} action
 * @param  {String} [label='']
 * @param  {Number} [value=0]
 */
const event = function (category, action, label = '', value = 0) {
  if (typeof window.ga === 'undefined') {
    return
  }

  if (config.debug) {
    /* eslint-disable */
    console.groupCollapsed(`[VueAnalytics] Track event category "${category}"`)
    console.log(`category: ${category}`)
    console.log(`action: ${action}`)
    console.log(`label: ${label}`)
    console.log(`value: ${value}`)
    console.groupEnd()
    /* eslint-enable */
  }

  window.ga('send', 'event', category, action, label, value)
}

/**
 * Page tracking
 * @param  {String} page
 * @param  {String} title
 * @param  {String} location
 */
const page = function (page, title = '', location = '') {
  if (typeof window.ga === 'undefined') {
    return
  }

  if (config.debug) {
    /* eslint-disable */
    console.groupCollapsed(`[VueAnalytics] Track page "${page}"`)
    console.log(`page: ${page}`)
    console.log(`title: ${title}`)
    console.log(`location: ${location}`)
    console.groupEnd()
    /* eslint-enable */
  }

  window.ga('send', 'pageview', { page, title, location })
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

const isTrackable = (name) => {
  return !(config.excludes.length && config.excludes.indexOf(name) !== -1)
}

/**
 * Vue installer
 * @param  {Vue instance} Vue
 * @param  {Object} [options={}]
 */
const install = function (Vue, options = {}) {
  const { router, debug, excludeRoutes } = options

  config.excludes = excludeRoutes || config.excludes
  config.debug = !!debug

  /**
   * Naming conventions
   * Using "track" for semantic purposes
   * Using "ga", as an alias, for a more familiar feeling
   */
  Vue.track = Vue.ga = { event, page }
  Vue.prototype.$track = Vue.prototype.$ga = { event, page }

  // I don't like timeouts but apparently the currentRoute is not fully available yet
  // so need to wait the famous 0 second.
  // @todo: find a better way
  setTimeout(() => {
    const route = router.currentRoute

    if (!isTrackable(route.name)) {
      return
    }

    Vue.track.page(route.path, route.name, window.location.href)
  }, 0)

  if (router) {
    router.afterEach(({ path, name }) => {
      if (!isTrackable(name)) {
        return
      }

      Vue.track.page(path, name, window.location.href)
    })
  }
}

export default { install }
