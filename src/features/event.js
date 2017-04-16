import ga from '../ga'

/**
 * Event tracking
 * @param  {any} args
 * @example
 * $ga.event('category', 'action', 'label', 'value')
 *
 * $ga.event({
 *  eventCategory: 'lorem ipsum',
 *  eventAction: 'dolor',
 *  eventLabel: 'sit',
 *  eventValue: 1
 * })
 */
export default function event (...args) {
  ga('send', 'event', ...args)
}
