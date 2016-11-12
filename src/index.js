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
const event = (category, action, label = '', value = 0) => {
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
const page = (page, title = '', location = '') => {
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
 * Vue installer
 * @param  {Vue instance} Vue
 * @param  {Object} [options={}]
 */
const install = (Vue, options = {}) => {
  const { router, debug, excludeRoutes } = options

  config.excludes = excludeRoutes || config.excludes
  config.debug = !!debug

  /**
   * Naming conventions
   * Using "track" for semantic purposes
   * Using "ga", as an alias, for a more familiar feeling
   */
  Vue.track = Vue.ga = { event, page }

  // compatibility
  Vue.$track = { event, page }

  Vue.prototype.$track = Vue.prototype.$ga = { event, page }

  if (router) {
    const { excludes } = config

    router.afterEach(({ path, name }) => {
      if (excludes.length && excludes.indexOf(name) !== -1) {
        return
      }

      Vue.track.page(path, name, window.location.href)
    })
  }
}

export default { install }
