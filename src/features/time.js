import config from '../config'
import { getName } from '../utils'

/**
 * Time tracking
 * @param  {String} category
 * @param  {String} variable
 * @param  {Number} value
 * @param  {String} [label='']
 */
export default function time (category, variable, value, label = '') {
  if (typeof window.ga === 'undefined') {
    return
  }

  [].concat(config.id).forEach(function (id) {
    window.ga(`${getName(id)}.send`, 'timing', category, variable, value, label)
  })
}
