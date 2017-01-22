import config from '../config'

/**
 * Page tracking
 * @param  {String} page
 * @param  {String} title
 * @param  {String} location
 */
export default function (page, title = '', location = '') {
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
