import config from '../config'

/**
 * Event tracking
 * @param  {String} category
 * @param  {String} action
 * @param  {String} [label='']
 * @param  {Number} [value=0]
 */
export default function (category, action, label = '', value = 0) {
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
