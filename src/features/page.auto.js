import config from '../config'
import { warn, exists } from '../utils'
import trackPage from './page'
import set from './set'

/**
 * Enable route autoTracking page
 * @param  {VueRouter} router
 */
export default function pageAutoTracking (router) {
  if (config.manual && !router && config.autoTracking) {
    const url = 'https://github.com/MatteoGabriele/vue-analytics#auto-tracking'
    warn('page auto-tracking doesn\'t work without a router instance.', url)
    return
  }

  if (!config.autoTracking || !router) {
    return
  }

  // Track the first page when the user lands on it
  if (!exists(router.currentRoute.name)) {
    trackPage(router)
  }

  // Track all other pages
  router.afterEach(function ({ name, path }) {
    if (exists(name)) {
      return
    }

    set('page', path)
    trackPage(router)
  })
}
