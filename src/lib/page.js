import config from '../config'
import set from 'lib/set'
import query from 'lib/query'
import {
  noop,
  getQueryString,
  isRouteIgnored,
  getRouteAnalytics,
  isRoute,
  isRouter,
  getBasePath,
  hasProps
} from '../helpers'

export default function page (...args) {
  let route

  if (isRouter(args[0])) {
    route = args[0].currentRoute
  }

  if (isRoute(args[0])) {
    route = args[0]
  }

  if (route) {
    const {
      router,
      autoTracking: {
        transformQueryString,
        prependBase
      }
    } = config

    const queryString = getQueryString(route.query)
    const base = router && router.options.base
    const needsBase = prependBase && base

    let path = route.path + (transformQueryString ? queryString : '')
    path = needsBase ? getBasePath(base, path) : path

    set('page', path)
    query('send', 'pageview')
  } else {
    query('send', 'pageview', ...args)
  }
}

export function trackRoute (route) {
  if (isRouteIgnored(route)) {
    return
  }

  const { autoTracking } = config
  const { meta: { analytics = {} } } = route
  const proxy = analytics.pageviewTemplate || autoTracking.pageviewTemplate

  page(proxy ? proxy(route) : route)
}

export function autoTracking () {
  const { router, autoTracking } = config

  if (!autoTracking.page || !router) {
    return
  }

  if (autoTracking.pageviewOnLoad) {
    trackRoute(router.currentRoute)
  }

  config.router.afterEach(function (to, from) {
    const { skipSamePath, shouldRouterUpdate } = autoTracking

    // Default behaviour of the router when the `skipSamePath` is turned on.
    // Skip router change when current and previous route have the same path
    // https://github.com/MatteoGabriele/vue-analytics/issues/73
    if (skipSamePath && to.path === from.path) {
      return
    }

    // Adds a custom way to define when the router should track
    if (typeof shouldRouterUpdate === 'function' && !shouldRouterUpdate(to, from)) {
      return
    }

    // Add a 0 timeout so that the browser doesn't register the previous route
    // https://github.com/MatteoGabriele/vue-analytics/issues/44
    setTimeout(function () {
      trackRoute(router.currentRoute)
    }, 0)
  })
}
