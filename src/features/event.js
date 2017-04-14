import ga from '../ga'

/**
 * Event tracking
 * @param  {any} args
 * @example
 * Arguments as single parameters
 * $ga.trackEvent('category', 'action', 'label', 'value')
 *
 * Arguments as object
 * $ga.trackEvent({
 *  eventCategory: 'lorem ipsum',
 *  eventAction: 'dolor',
 *  eventLabel: 'sit',
 *  eventValue: 1
 * })
 */
export default function events (...args) {
  ga('send', 'event', ...args)
}
