import config from '../config'
import { warn, exists } from '../utils'
import trackPage from './page'

/**
 * Enable route autoTracking page
 * @param  {VueRouter} router
 */
export default function (router) {
  if (!router && config.autoTracking) {
    warn('You need to pass the VueRouter instance in the plugin options')
    return
  }

  if (!router && !config.autoTracking) {
    warn('You need to pass the VueRouter instance to the autoTracking method or turn on auto mode')
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
