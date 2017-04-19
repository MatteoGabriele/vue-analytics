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

  const { currentRoute } = router
  const pageviewProxyFn = config.autoTracking.pageviewTemplate
  const pageviewTemplate = pageviewProxyFn ? pageviewProxyFn(currentRoute) : router

  if (!exists(currentRoute.name) && config.autoTracking.pageviewOnLoad) {
    set('page', currentRoute.path)
    page(pageviewTemplate)
  }

  // Track all other pages
  router.afterEach(function ({ path, name }) {
    if (exists(name)) {
      return
    }

    set('page', path)
    page(pageviewTemplate)
  })
}
