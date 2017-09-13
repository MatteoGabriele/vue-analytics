import config, { getId } from './config'

export function noop () {}

export function merge (obj, src) {
  Object.keys(src).forEach(function (key) {
    if (obj[key] && typeof obj[key] === 'object') {
      merge(obj[key], src[key])
      return
    }
    obj[key] = src[key]
  })

  return obj
}

export function getTracker (trackerId) {
  return trackerId.replace(/-/gi, '')
}

export function onAnalyticsReady () {
  return new Promise((resolve, reject) => {
    const poll = setInterval(() => {
      if (typeof window === 'undefined' || !window.ga) {
        return
      }

      resolve()
      clearInterval(poll)
    }, 10)
  })
}

export function getMethod (name, trackerId) {
  if (getId().length > 1) {
    const domain = getTracker(trackerId)
    return `${domain}.${name}`
  }

  return name
}

export function getQueryString (queryMap) {
  const queryString = Object.keys(queryMap)
    .reduce((string, key, index, keys) => {
      const isLastKey = index === (keys.length - 1)
      string += `${key}=${queryMap[key]}${isLastKey ? '' : '&'}`
      return string
    }, '')

  return queryString !== '' ? `?${queryString}` : ''
}

export function isRouteIgnored (name) {
  return config.ignoreRoutes.indexOf(name) !== -1
}
