import config from '../config'
import { exists } from '../utils'
import page from './page'
import set from './set'

function template (proxy, router) {
  return proxy ? proxy(router.currentRoute) : router
}

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

  if (!exists(currentRoute.name) && config.autoTracking.pageviewOnLoad) {
    set('page', currentRoute.path)
    page(template(pageviewProxyFn, router))
  }

  // Track all other pages
  router.afterEach(function ({ name, path }) {
    if (exists(name)) {
      return
    }

    set('page', path)
    page(template(pageviewProxyFn, router))
  })
}
