import ga from '../ga'

/**
 * Event tracking
 * @param  {any} args
 */
export default function event (...args) {
  ga('send', 'event', ...args)
}
