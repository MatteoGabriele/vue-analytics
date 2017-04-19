import config from '../config'
import { exists } from '../utils'
import page from './page'
import set from './set'

/**
 * Enable route autoTracking page
 * @param  {VueRouter} router
 */
export default function autoTrackPage (router) {
  if (!config.autoTracking.page || !router) {
    return
  }

  // Track the first page when the user lands on it
  const { currentRoute } = router
  if (!exists(currentRoute.name) && config.autoTracking.pageviewOnLoad) {
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
