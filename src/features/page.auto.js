import config from '../config'
import { exists } from '../utils'
import page from './page'
import set from './set'

function trackRoute (proxy, router) {
  const { currentRoute } = router
  const template = proxy ? proxy(router.currentRoute) : router

  if (exists(currentRoute.name)) {
    return
  }

  set('page', currentRoute.path)
  page(template, router)
}

/**
 * Enable route autoTracking page
 * @param  {VueRouter} router
 */
export default function autoTrackPage (router) {
  if (!config.autoTracking.page || !router) {
    return
  }

  const pageviewProxyFn = config.autoTracking.pageviewTemplate

  if (config.autoTracking.pageviewOnLoad) {
    trackRoute(pageviewProxyFn, router)
  }

  // Track all other pages
  router.afterEach(() => trackRoute(pageviewProxyFn, router))
}
