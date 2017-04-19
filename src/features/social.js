import ga from '../ga'

/**
 * Social interactions
 * @param  {any} args
 */
export default function social (...args) {
  ga('send', 'social', ...args)
}
