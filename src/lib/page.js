import config from '../config'
import set from 'lib/set'
import query from 'lib/query'
import { 
  noop, 
  getQueryString, 
  isRouteIgnored,
  getRouteAnalytics,
  isRoute,
  isRouter
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
    const { transformQueryString } = config.autoTracking
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

export function trackRoute (route) {
  if (isRouteIgnored(route)) {
    return
  }
  
  const { autoTracking } = config
  const { meta: { analytics = {} } } = route
  const proxy = analytics.pageviewTemplate || autoTracking.pageviewTemplate
  
  page(proxy ? proxy(route) : route)
}

export function autotracking () {
  const { router, autoTracking } = config

  if (!autoTracking.page || !router) {
    return
  }

  if (autoTracking.pageviewOnLoad) {
    trackRoute(router.currentRoute)
  }

  config.router.afterEach(function () {
    // https://github.com/MatteoGabriele/vue-analytics/issues/44
    setTimeout(function () {
      trackRoute(router.currentRoute)
    }, 0)
  })
}
