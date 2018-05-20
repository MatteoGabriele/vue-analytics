import config from '../config'
import set from 'lib/set'
import screenview from 'lib/screenview'
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

  if (args.length && isRouter(args[0])) {
    route = args[0].currentRoute
  }

  if (args.length && isRoute(args[0])) {
    route = args[0]
  }

  if (route) {
    trackRoute(route)
  } else {
    // We can call with `page('/my/path')`
    let page = typeof args[0] === 'object' ? args[0].page : args[0]
    set('page', page)
    query('send', 'pageview', ...args)
  }
}

export function trackRoute (route) {
  if (isRouteIgnored(route.name)) {
    return
  }

  const { autoTracking } = config
  const { meta: { analytics = {} } } = route
  const proxy = analytics.pageviewTemplate || autoTracking.pageviewTemplate

  if (autoTracking.screenview && !route.name) {
    throw new Error(
      '[vue-analytics] Route name is mandatory when using screenview.'
    )
  }

  if (autoTracking.screenview) {
    screenview(route.name)
    return
  }

  if (proxy) {
    page(proxy(route))
  } else {
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
    
    page(path)
  }
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

    // Fire tracking after the nextTick or it will still register the previous route
    // https://github.com/MatteoGabriele/vue-analytics/issues/44
    config.$vue.nextTick().then(() => {
      trackRoute(router.currentRoute)
    })
  })
}
