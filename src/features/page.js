import ga from '../ga'
import { warn } from '../utils'

function isRouter (value) {
  return value.constructor.name === 'VueRouter'
}

function getDataFromRouter (router) {
  if (!router) {
    warn('Is not possible to track the current route without VueRouter installed')
    return
  }

  return {
    page: router.currentRoute.path,
    title: router.currentRoute.name,
    location: window.location.href
  }
}

/**
 * Page tracking
 * @param  {any} args
 * @example
 * $ga.trackPage({
 *  page: '/home',
 *  title: 'home page',
 *  location: window.location.href,
 *  hitCallback () { },
 *  hitCallbackFail () { }
 * })
 */
export default function page (...args) {
  const value = args[0]

  if (isRouter(value)) {
    ga('send', 'pageview', getDataFromRouter(value))
    return
  }

  ga('send', 'pageview', ...args)
}
