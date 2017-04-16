import config from '../config'
import { warn, exists } from '../utils'
import page from './page'
import set from './set'

/**
 * Enable route autoTracking page
 * @param  {VueRouter} router
 */
export default function autoTrackPage (router) {
  if (config.manual && !router && config.autoTracking) {
    const url = 'https://github.com/MatteoGabriele/vue-analytics#auto-tracking'
    warn('page auto-tracking doesn\'t work without a router instance.', url)
    return
  }

  if (!config.autoTracking || !router) {
    return
  }

  // Track the first page when the user lands on it
  const { currentRoute } = router
  if (!exists(currentRoute.name)) {
    set('page', currentRoute.path)
    page(router)
  }

  // Track all other pages
  router.afterEach(function ({ path, name }) {
    if (exists(name)) {
      return
    }

    set('page', path)
    page(router)
  })
}
