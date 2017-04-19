import ga from '../ga'

/**
 * Time tracking
 * @param  {any} args
 */
export default function time (...args) {
  ga('send', 'timing', ...args)
}
