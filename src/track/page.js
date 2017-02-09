/**
 * Page tracking
 * @param  {String} page
 * @param  {String} title
 * @param  {String} location
 */
export default function (page, title = '', location = '') {
  if (typeof window.ga === 'undefined') {
    return
  }

  window.ga('send', 'pageview', { page, title, location })
}
