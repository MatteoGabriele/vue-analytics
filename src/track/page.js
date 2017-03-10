import { getName } from '../utils'
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

  [].concat(config.id).forEach(function (id) {
    window.ga(`${getName(id)}.send`, 'pageview', { page, title, location })
  })
}
