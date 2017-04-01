import ga from '../ga'

/**
 * Page tracking
 * @param  {String} page
 * @param  {String} title
 * @param  {String} location
 */
export default function page (page, title = '', location = '') {
  ga('send', 'pageview', { page, title, location })
}
