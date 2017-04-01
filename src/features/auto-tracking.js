import config from '../config'
import { warn, exists } from '../utils'
import trackPage from './page'

/**
 * Enable route autoTracking page
 * @param  {VueRouter} router
 */
export default function autoTracking (router) {
  if (config.manual && !router && config.autoTracking) {
    const url = 'https://github.com/MatteoGabriele/vue-analytics#auto-tracking'
    warn('auto-tracking doesn\'t work without a router instance.', url)
    return
  }

  if (!config.autoTracking || !router) {
    return
  }

  // Track the first page when the user lands on it
  const route = router.currentRoute

  if (!exists(route.name)) {
    trackPage(route.path, route.name, window.location.href)
  }

  // Track all other pages
  router.afterEach(function ({ path, name }) {
    if (exists(name)) {
      return
    }

    trackPage(path, name, window.location.href)
  })
}
