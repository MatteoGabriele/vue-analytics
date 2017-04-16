import ga from '../ga'
import { warn } from '../utils'

function getDataFromRouter (router, args) {
  if (!router) {
    warn('Is not possible to track the current route without VueRouter installed')
    return
  }

  let params = {
    page: router.currentRoute.path,
    title: router.currentRoute.name,
    location: window.location.href
  }

  if (typeof args[1] === 'function') {
    params.hitCallback = args[1]
  }

  return params
}

/**
 * Page tracking
 * @param  {any} args
 * @example
 * $ga.page('/home')
 *
 * $ga.page(this.$router, {
 *  hitCallback () { //done }
 * })
 *
 * $ga.page({
 *  page: '/home',
 *  title: 'home page',
 *  location: window.location.href,
 *  hitCallback () { // done }
 * })
 */
export default function page (...args) {
  const value = args[0]

  if (value.constructor.name === 'VueRouter') {
    ga('send', 'pageview', getDataFromRouter(value, args))
    return
  }

  ga('send', 'pageview', ...args)
}
