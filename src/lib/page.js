import config from '../config'
import set from 'lib/set'
import query from 'lib/query'
import { noop, getQueryString, isRouteIgnored } from '../helpers'

export default function page (...args) {
  if (typeof args[0] !== 'string' && 'currentRoute' in args[0]) {
    const { transformQueryString } = config.autoTracking
    const route = args[0].currentRoute
    const queryString = getQueryString(route.query)
    const path = route.path + (transformQueryString ? queryString : '')

    set('page', path)
    query('send', 'pageview', {
      page: path,
      title: route.name,
      location: window.location.href,
      ...(typeof args[1] === 'function') && { hitCallback: args[1] }
    })

    return
  }

  query('send', 'pageview', ...args)
}

export function trackRoute (proxy, router) {
  const { currentRoute } = router

  if (isRouteIgnored(currentRoute.name)) {
    return
  }

  page(proxy ? proxy(currentRoute) : router)
}

export function startAutoTracking () {
  const { router, autoTracking } = config

  if (!autoTracking.page || !router) {
    return
  }

  if (autoTracking.pageviewOnLoad) {
    trackRoute(autoTracking.pageviewTemplate, router)
  }

  config.router.afterEach(function () {
    setTimeout(function () {
      // https://github.com/MatteoGabriele/vue-analytics/issues/44
      trackRoute(autoTracking.pageviewTemplate, router)
    }, 0)
  })
}
