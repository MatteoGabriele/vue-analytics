import ga from '../ga'

/**
 * Social interactions
 * @param  {Object} args
 * $ga.social({
 *  socialNetwork: 'Facebook',
 *  socialAction: 'like',
 *  socialTarget: 'http://myownpersonaldomain.com'
 * })
 */
export default function social (...args) {
  ga('send', 'social', ...args)
}
