import ga from '../ga'
import config from '../config'
import { warn } from '../utils'

/**
 * Returns a querystring from an object
 * @param  {Object} query
 * @return {String}
 */
function getQueryString (query) {
  const queryString = Object.keys(query).reduce(function (queryString, param, index, collection) {
    queryString += `${param}=${query[param]}`

    if (index < (collection.length - 1)) {
      queryString += '&'
    }

    return queryString
  }, '?')

  return queryString === '?' ? '' : queryString
}

/**
 * Returns pageview data from VueRouter instance
 * @param  {VueRouter} router
 * @param  {any} args
 * @return {Object}
 */
function getDataFromRouter (router, args) {
  if (!router) {
    warn('Is not possible to track the current route without VueRouter installed')
    return
  }

  const route = router.currentRoute

  let params = {
    page: route.path + getQueryString(route.query),
    title: route.name,
    location: window.location.href
  }

  if (config.hitCallback) {
    params.hitCallback = config.hitCallback
  }

  if (typeof args[1] === 'function') {
    params.hitCallback = args[1]
  }

  return params
}

/**
 * Page tracking
 * @param  {any} args
 */
export default function page (...args) {
  const value = args[0]

  if (value && value.constructor.name === 'VueRouter') {
    ga('send', 'pageview', getDataFromRouter(value, args))
    return
  }

  // If there is no first argument, convert it
  //   to an empty object.
  if (!value) {
    args[0] = {}
  }

  // If the page is just a string, convert it
  //   to an object.
  else if (value.constructor.name === 'String') {
    args[0] = { page: value }
  }

  // Add the hitCallback if one is not specified
  //   explicitly.
  if (config.hitCallback && !args[0].hitCallback) {
    args[0].hitCallback = config.hitCallback
  }

  ga('send', 'pageview', ...args)
}
