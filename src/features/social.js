import ga from '../ga'

/**
 * Social interactions
 * @param  {any} args
 * $ga.social('Facebook', 'like', http://myownpersonaldomain.com)
 *
 * $ga.social({
 *  socialNetwork: 'Facebook',
 *  socialAction: 'like',
 *  socialTarget: 'http://myownpersonaldomain.com'
 * })
 */
export default function social (...args) {
  ga('send', 'social', ...args)
}
