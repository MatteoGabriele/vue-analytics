import ga from '../ga'

/**
 * Time tracking
 * @param  {String} category
 * @param  {String} variable
 * @param  {Number} value
 * @param  {String} [label='']
 */
export default function time (category, variable, value, label = '') {
  ga('send', 'timing', category, variable, value, label)
}
