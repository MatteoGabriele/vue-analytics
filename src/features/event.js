import ga from '../ga'

/**
 * Event tracking
 * @param  {String} category
 * @param  {String} action
 * @param  {String} [label='']
 * @param  {Number} [value=0]
 */
export default function events (category, action, label = '', value = 0) {
  ga('send', 'event', category, action, label, value)
}
