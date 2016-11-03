import { log } from './utils'

/**
 * Configuration
 * @type {Boolean}
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

  const context = `${category}/${action}/${label}`

  if (typeof value !== 'number') {
    log(`Event ${context}, needs an integer as 'value'.`, 'error', config.debug)
    return
  }

  log(`Tracking event ${context}`, 'normal', config.debug)
  window.ga('send', 'event', category, action, label, value)
}

/**
 * Page tracking
 * @param  {String} page
 * @param  {String} title
 * @param  {String} location
 */
const page = (page, title, location) => {
  if (typeof window.ga === 'undefined') {
    return
  }

  log(`Tracking pageview ${page}`, 'normal', config.debug)
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

  Vue['$track'] = { event, page }

  if (router) {
    const { excludes } = config

    router.afterEach(({ path, name }) => {
      if (excludes.length && excludes.indexOf(name) !== -1) {
        return
      }

      Vue.$track.page(path)
    })
  }
}

export default { install }
