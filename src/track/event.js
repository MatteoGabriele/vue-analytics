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

  window.ga('send', 'event', category, action, label, value)
}
